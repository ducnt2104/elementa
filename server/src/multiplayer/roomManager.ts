// server/src/multiplayer/roomManager.ts
// Multiplayer Room Lifecycle & Authoritative Match State Manager
// Supports room creation, code joining, deck validation, action sync & reconnection

import * as crypto from 'crypto';
import { DatabaseManager } from '../db/database';

export interface RoomParticipant {
  userId: string;
  username: string;
  displayName: string;
  isReady: boolean;
  deckId?: string;
  isHost: boolean;
}

export interface MultiplayerRoomState {
  code: string;
  mode: 'TCG' | 'MOBA';
  status: 'WAITING' | 'READY' | 'IN_PROGRESS' | 'FINISHED';
  host: RoomParticipant;
  guest: RoomParticipant | null;
  matchState?: any;
  actionSequence: number;
  lastActionAt: string;
  createdAt: string;
}

export class RoomManager {
  private dbManager: DatabaseManager;
  private activeRooms = new Map<string, MultiplayerRoomState>();

  constructor(dbManager?: DatabaseManager) {
    this.dbManager = dbManager || DatabaseManager.getInstance();
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'E-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Create a new multiplayer room
   */
  public createRoom(
    hostUser: { userId: string; username: string; displayName: string },
    mode: 'TCG' | 'MOBA' = 'TCG'
  ): MultiplayerRoomState {
    let code = this.generateRoomCode();
    while (this.activeRooms.has(code)) {
      code = this.generateRoomCode();
    }

    const now = new Date().toISOString();
    const room: MultiplayerRoomState = {
      code,
      mode,
      status: 'WAITING',
      host: {
        userId: hostUser.userId,
        username: hostUser.username,
        displayName: hostUser.displayName,
        isReady: false,
        isHost: true
      },
      guest: null,
      actionSequence: 0,
      lastActionAt: now,
      createdAt: now
    };

    this.activeRooms.set(code, room);

    // Save to persistent database
    this.dbManager.db.prepare(`
      INSERT INTO rooms (code, host_id, mode, status, host_ready, guest_ready, created_at, updated_at)
      VALUES (?, ?, ?, 'WAITING', 0, 0, ?, ?)
    `).run(code, hostUser.userId, mode, now, now);

    return room;
  }

  /**
   * Join an existing room with code
   */
  public joinRoom(
    code: string,
    guestUser: { userId: string; username: string; displayName: string }
  ): MultiplayerRoomState {
    const cleanCode = code.toUpperCase().trim();
    const room = this.activeRooms.get(cleanCode);

    if (!room) {
      throw new Error(`Phòng thi đấu mã [${cleanCode}] không tồn tại`);
    }

    if (room.status !== 'WAITING') {
      throw new Error(`Phòng [${cleanCode}] hiện đang trong trạng thái ${room.status}, không thể tham gia`);
    }

    if (room.host.userId === guestUser.userId) {
      // Re-joining as host
      return room;
    }

    if (room.guest && room.guest.userId !== guestUser.userId) {
      throw new Error(`Phòng [${cleanCode}] đã đủ 2 người chơi`);
    }

    const now = new Date().toISOString();
    room.guest = {
      userId: guestUser.userId,
      username: guestUser.username,
      displayName: guestUser.displayName,
      isReady: false,
      isHost: false
    };
    room.lastActionAt = now;

    // Update in DB
    this.dbManager.db.prepare(`
      UPDATE rooms SET guest_id = ?, updated_at = ? WHERE code = ?
    `).run(guestUser.userId, now, cleanCode);

    return room;
  }

  /**
   * Toggle player ready status
   */
  public setReady(code: string, userId: string, isReady: boolean, deckId?: string): MultiplayerRoomState {
    const room = this.activeRooms.get(code);
    if (!room) throw new Error('Phòng không tồn tại');

    if (room.host.userId === userId) {
      room.host.isReady = isReady;
      if (deckId) room.host.deckId = deckId;
    } else if (room.guest && room.guest.userId === userId) {
      room.guest.isReady = isReady;
      if (deckId) room.guest.deckId = deckId;
    } else {
      throw new Error('Người chơi không thuộc phòng này');
    }

    if (room.host.isReady && room.guest?.isReady) {
      room.status = 'READY';
    } else {
      room.status = 'WAITING';
    }

    const now = new Date().toISOString();
    room.lastActionAt = now;

    this.dbManager.db.prepare(`
      UPDATE rooms SET host_ready = ?, guest_ready = ?, status = ?, updated_at = ? WHERE code = ?
    `).run(room.host.isReady ? 1 : 0, room.guest?.isReady ? 1 : 0, room.status, now, code);

    return room;
  }

  /**
   * Start the match when both players are ready
   */
  public startMatch(code: string, hostUserId: string): MultiplayerRoomState {
    const room = this.activeRooms.get(code);
    if (!room) throw new Error('Phòng không tồn tại');

    if (room.host.userId !== hostUserId) {
      throw new Error('Chỉ chủ phòng mới có quyền bắt đầu trận đấu');
    }

    if (!room.guest) {
      throw new Error('Cần ít nhất 2 người chơi để bắt đầu trận đấu trực tuyến');
    }

    if (!room.host.isReady || !room.guest.isReady) {
      throw new Error('Cả hai người chơi phải sẵn sàng mới có thể bắt đầu trận đấu');
    }

    const now = new Date().toISOString();
    room.status = 'IN_PROGRESS';
    room.matchState = {
      turn: 1,
      activePlayerId: room.host.userId,
      phase: 'MAIN_PHASE_1',
      hostLp: 8000,
      guestLp: 8000,
      startedAt: now
    };
    room.lastActionAt = now;

    this.dbManager.db.prepare(`
      UPDATE rooms SET status = 'IN_PROGRESS', match_state_json = ?, updated_at = ? WHERE code = ?
    `).run(JSON.stringify(room.matchState), now, code);

    return room;
  }

  /**
   * Dispatch authoritative match action
   */
  public dispatchAction(code: string, userId: string, actionType: string, payload: any): MultiplayerRoomState {
    const room = this.activeRooms.get(code);
    if (!room) throw new Error('Phòng không tồn tại');
    if (room.status !== 'IN_PROGRESS') throw new Error('Trận đấu chưa bắt đầu hoặc đã kết thúc');

    room.actionSequence++;
    const now = new Date().toISOString();
    room.lastActionAt = now;

    // Apply action mutations
    if (actionType === 'END_TURN') {
      room.matchState.turn++;
      room.matchState.activePlayerId =
        room.matchState.activePlayerId === room.host.userId ? room.guest!.userId : room.host.userId;
    } else if (actionType === 'ATTACK') {
      const damage = payload.damage || 500;
      if (userId === room.host.userId) {
        room.matchState.guestLp = Math.max(0, room.matchState.guestLp - damage);
      } else {
        room.matchState.hostLp = Math.max(0, room.matchState.hostLp - damage);
      }

      // Check win condition
      if (room.matchState.hostLp === 0 || room.matchState.guestLp === 0) {
        room.status = 'FINISHED';
      }
    }

    this.dbManager.db.prepare(`
      UPDATE rooms SET match_state_json = ?, status = ?, updated_at = ? WHERE code = ?
    `).run(JSON.stringify(room.matchState), room.status, now, code);

    return room;
  }

  /**
   * Get room by code
   */
  public getRoom(code: string): MultiplayerRoomState | null {
    const cleanCode = code.toUpperCase().trim();
    return this.activeRooms.get(cleanCode) || null;
  }

  /**
   * Leave room
   */
  public leaveRoom(code: string, userId: string): boolean {
    const cleanCode = code.toUpperCase().trim();
    const room = this.activeRooms.get(cleanCode);
    if (!room) return false;

    if (room.host.userId === userId) {
      // Host leaves -> disband room
      this.activeRooms.delete(cleanCode);
      this.dbManager.db.prepare('DELETE FROM rooms WHERE code = ?').run(cleanCode);
      return true;
    } else if (room.guest && room.guest.userId === userId) {
      room.guest = null;
      room.status = 'WAITING';
      this.dbManager.db.prepare(`
        UPDATE rooms SET guest_id = NULL, status = 'WAITING' WHERE code = ?
      `).run(cleanCode);
      return true;
    }
    return false;
  }
}
