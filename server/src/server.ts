// server/src/server.ts
// Production-Ready Native HTTP Server for ELEMENTA Online Platform
// Implements REST APIs, Authentication, SQLite Persistence, Authoritative Economy, Quests, CA-SRS, and Real-Time Multiplayer Rooms

import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseManager } from './db/database';
import { AuthService } from './auth/authService';
import { EconomyService } from './economy/economyService';
import { QuestService } from './quests/questService';
import { EventService } from './events/eventService';
import { RoomManager, MultiplayerRoomState } from './multiplayer/roomManager';
import { PLAYABLE_CARDS, getPlayableCardById } from '../../src/data/playableCardsData';
import * as crypto from 'crypto';

export interface ServerInstance {
  server: Server;
  port: number;
  close: () => Promise<void>;
}

export class ElementaServer {
  private dbManager: DatabaseManager;
  private authService: AuthService;
  private economyService: EconomyService;
  private questService: QuestService;
  private eventService: EventService;
  private roomManager: RoomManager;

  // Real-time Server-Sent Events (SSE) connections for multiplayer rooms
  private roomSubscribers = new Map<string, Set<ServerResponse>>();

  constructor(dbManager?: DatabaseManager) {
    this.dbManager = dbManager || DatabaseManager.getInstance();
    this.authService = new AuthService(this.dbManager);
    this.economyService = new EconomyService(this.dbManager);
    this.questService = new QuestService(this.dbManager);
    this.eventService = new EventService();
    this.roomManager = new RoomManager(this.dbManager);
  }

  public getServices() {
    return {
      dbManager: this.dbManager,
      authService: this.authService,
      economyService: this.economyService,
      questService: this.questService,
      eventService: this.eventService,
      roomManager: this.roomManager
    };
  }

  // --- Helper Methods ---

  private setCorsHeaders(res: ServerResponse): void {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Idempotency-Key');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  private sendJson(res: ServerResponse, statusCode: number, data: any): void {
    this.setCorsHeaders(res);
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
  }

  private sendError(res: ServerResponse, statusCode: number, message: string): void {
    this.sendJson(res, statusCode, { success: false, error: message });
  }

  private async readJsonBody<T = any>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 5 * 1024 * 1024) {
          // 5MB limit
          req.destroy(new Error('Payload too large'));
          reject(new Error('Payload too large'));
        }
      });
      req.on('end', () => {
        if (!body.trim()) {
          resolve({} as T);
          return;
        }
        try {
          resolve(JSON.parse(body) as T);
        } catch (err: any) {
          reject(new Error('Invalid JSON format: ' + err.message));
        }
      });
      req.on('error', err => reject(err));
    });
  }

  private authenticate(req: IncomingMessage) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    return this.authService.validateSession(authHeader);
  }

  // Notify real-time SSE listeners about room update
  private broadcastRoomUpdate(code: string, room: MultiplayerRoomState | null): void {
    const subscribers = this.roomSubscribers.get(code);
    if (!subscribers || subscribers.size === 0) return;

    const data = JSON.stringify({
      type: 'ROOM_UPDATE',
      room,
      timestamp: new Date().toISOString()
    });

    for (const res of subscribers) {
      res.write(`data: ${data}\n\n`);
    }
  }

  // --- Request Dispatcher ---

  public handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    this.setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    try {
      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      const pathname = url.pathname;
      const method = req.method?.toUpperCase();

      // 1. Health & Server Info
      if (pathname === '/api/health' && method === 'GET') {
        const stats = this.dbManager.getStats();
        this.sendJson(res, 200, {
          status: 'ok',
          service: 'ELEMENTA-API',
          version: '2.0.0',
          totalCards: PLAYABLE_CARDS.length,
          dbStats: stats,
          serverTime: new Date().toISOString()
        });
        return;
      }

      // 2. Authentication Endpoints
      if (pathname === '/api/auth/guest' && method === 'POST') {
        const session = this.authService.createGuestSession();
        const profile = this.authService.getProfile(session.userId);
        this.sendJson(res, 201, { success: true, session, profile });
        return;
      }

      if (pathname === '/api/auth/register' && method === 'POST') {
        const body = await this.readJsonBody(req);
        if (!body.username || !body.email || !body.password) {
          this.sendError(res, 400, 'Tên người dùng, email và mật khẩu là bắt buộc');
          return;
        }
        const session = this.authService.register(body.username, body.email, body.password);
        const profile = this.authService.getProfile(session.userId);
        this.sendJson(res, 201, { success: true, session, profile });
        return;
      }

      if (pathname === '/api/auth/login' && method === 'POST') {
        const body = await this.readJsonBody(req);
        if (!body.usernameOrEmail || !body.password) {
          this.sendError(res, 400, 'Tên đăng nhập và mật khẩu là bắt buộc');
          return;
        }
        const session = this.authService.login(body.usernameOrEmail, body.password);
        const profile = this.authService.getProfile(session.userId);
        this.sendJson(res, 200, { success: true, session, profile });
        return;
      }

      if (pathname === '/api/auth/upgrade' && method === 'POST') {
        const body = await this.readJsonBody(req);
        if (!body.guestToken || !body.username || !body.email || !body.password) {
          this.sendError(res, 400, 'Thiếu thông tin nâng cấp tài khoản');
          return;
        }
        const session = this.authService.upgradeGuest(body.guestToken, body.username, body.email, body.password);
        const profile = this.authService.getProfile(session.userId);
        this.sendJson(res, 200, { success: true, session, profile });
        return;
      }

      if (pathname === '/api/auth/me' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn');
          return;
        }
        const profile = this.authService.getProfile(session.userId);
        const wallet = this.economyService.getWallet(session.userId);
        this.sendJson(res, 200, { success: true, session, profile, wallet });
        return;
      }

      // 3. Profile & Progression Endpoints
      if (pathname === '/api/profile' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const profile = this.authService.getProfile(session.userId);
        const wallet = this.economyService.getWallet(session.userId);
        this.sendJson(res, 200, { success: true, profile, wallet });
        return;
      }

      if (pathname === '/api/profile/sync' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        const xpDelta = Math.max(0, Number(body.xpDelta) || 0);
        const battlesWonDelta = Math.max(0, Number(body.battlesWonDelta) || 0);
        const reactionsDelta = Math.max(0, Number(body.reactionsDelta) || 0);

        this.dbManager.db.prepare(`
          UPDATE user_profiles
          SET xp = xp + ?, battles_played = battles_played + 1, battles_won = battles_won + ?, reactions_triggered = reactions_triggered + ?
          WHERE user_id = ?
        `).run(xpDelta, battlesWonDelta, reactionsDelta, session.userId);

        const profile = this.authService.getProfile(session.userId);
        this.sendJson(res, 200, { success: true, profile });
        return;
      }

      // 4. Card Catalog Endpoints
      if (pathname === '/api/cards' && method === 'GET') {
        const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
        const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50', 10)));
        const q = (url.searchParams.get('q') || '').toLowerCase().trim();
        const typeFilter = url.searchParams.get('type');
        const attrFilter = url.searchParams.get('attribute');
        const rarityFilter = url.searchParams.get('rarity');

        let filtered = PLAYABLE_CARDS;

        if (q) {
          filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q) ||
            (c.chemicalFormula && c.chemicalFormula.toLowerCase().includes(q)) ||
            (c.iupacName && c.iupacName.toLowerCase().includes(q)) ||
            (c.name_en && c.name_en.toLowerCase().includes(q))
          );
        }

        if (typeFilter) {
          filtered = filtered.filter(c => c.cardType === typeFilter);
        }

        if (attrFilter) {
          filtered = filtered.filter(c => c.attribute === attrFilter);
        }

        if (rarityFilter) {
          filtered = filtered.filter(c => c.rarity === rarityFilter);
        }

        const total = filtered.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const pagedCards = filtered.slice(startIndex, startIndex + limit);

        this.sendJson(res, 200, {
          success: true,
          total,
          page,
          limit,
          totalPages,
          cards: pagedCards
        });
        return;
      }

      if (pathname.startsWith('/api/cards/') && method === 'GET') {
        const cardId = pathname.replace('/api/cards/', '').trim();
        const card = getPlayableCardById(cardId);
        if (!card) {
          this.sendError(res, 404, `Không tìm thấy thẻ bài với ID: ${cardId}`);
          return;
        }
        this.sendJson(res, 200, { success: true, card });
        return;
      }

      // 5. Economy & Shop Endpoints
      if (pathname === '/api/shop/catalog' && method === 'GET') {
        const catalog = this.economyService.getCatalog();
        this.sendJson(res, 200, { success: true, catalog });
        return;
      }

      if (pathname === '/api/shop/purchase' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Vui lòng đăng nhập để mua hàng');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.itemId || !body.currency) {
          this.sendError(res, 400, 'Mã vật phẩm và loại tiền tệ là bắt buộc');
          return;
        }
        const idempotencyKey = (req.headers['x-idempotency-key'] as string) || body.idempotencyKey;
        const result = this.economyService.purchaseItem(
          session.userId,
          body.itemId,
          body.currency,
          idempotencyKey
        );
        this.sendJson(res, 200, result);
        return;
      }

      if (pathname === '/api/wallet' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const wallet = this.economyService.getWallet(session.userId);
        this.sendJson(res, 200, { success: true, wallet });
        return;
      }

      // 6. Quests & CA-SRS Endpoints
      if (pathname === '/api/quests' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const quests = this.questService.getUserQuests(session.userId);
        this.sendJson(res, 200, { success: true, quests });
        return;
      }

      if (pathname === '/api/quests/claim' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.questId) {
          this.sendError(res, 400, 'Thiếu mã nhiệm vụ cần nhận thưởng');
          return;
        }
        const reward = this.questService.claimQuestReward(session.userId, body.questId);
        const wallet = this.economyService.getWallet(session.userId);
        this.sendJson(res, 200, { success: true, reward, wallet });
        return;
      }

      if (pathname === '/api/quests/progress' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.questId) {
          this.sendError(res, 400, 'Thiếu mã nhiệm vụ');
          return;
        }
        const amount = Number(body.amount) || 1;
        this.questService.incrementProgress(session.userId, body.questId, amount);
        this.sendJson(res, 200, { success: true, message: 'Đã cập nhật tiến độ nhiệm vụ' });
        return;
      }

      if (pathname === '/api/srs/due' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const items = this.questService.getDueSrsReviews(session.userId);
        this.sendJson(res, 200, { success: true, dueReviews: items });
        return;
      }

      if (pathname === '/api/srs/error' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.topicId || !body.errorType) {
          this.sendError(res, 400, 'Thiếu chủ đề hoặc loại sai sót');
          return;
        }
        this.questService.recordMatchError(session.userId, body.topicId, body.errorType, body.errorLevel || 1);
        this.sendJson(res, 200, { success: true, message: 'Đã ghi nhận sai sót vào hệ thống ôn tập ngắt quãng CA-SRS' });
        return;
      }

      if (pathname === '/api/srs/review' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.topicId) {
          this.sendError(res, 400, 'Thiếu mã chủ đề ôn tập');
          return;
        }
        const result = this.questService.processReviewSuccess(session.userId, body.topicId);
        this.sendJson(res, 200, { success: true, ...result });
        return;
      }

      // 7. Events & Golden Hours
      if (pathname === '/api/events/golden-hours' && method === 'GET') {
        const status = this.eventService.getGoldenHourStatus();
        this.sendJson(res, 200, { success: true, goldenHours: status });
        return;
      }

      if (pathname === '/api/events' && method === 'GET') {
        const events = this.eventService.getActiveEvents();
        this.sendJson(res, 200, { success: true, events });
        return;
      }

      // 8. User Decks & Collections
      if (pathname === '/api/collection' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const rows = this.dbManager.db.prepare(`
          SELECT card_id, count, acquired_at FROM user_collections WHERE user_id = ?
        `).all(session.userId) as any[];
        this.sendJson(res, 200, { success: true, collection: rows });
        return;
      }

      if (pathname === '/api/decks' && method === 'GET') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const rows = this.dbManager.db.prepare(`
          SELECT id, name, is_active, main_deck_json, extra_deck_json, updated_at
          FROM user_decks WHERE user_id = ?
        `).all(session.userId) as any[];

        const decks = rows.map(r => ({
          id: r.id,
          name: r.name,
          isActive: Boolean(r.is_active),
          mainDeck: JSON.parse(r.main_deck_json),
          extraDeck: JSON.parse(r.extra_deck_json),
          updatedAt: r.updated_at
        }));
        this.sendJson(res, 200, { success: true, decks });
        return;
      }

      if (pathname === '/api/decks' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const body = await this.readJsonBody(req);
        const deckId = body.deckId || 'deck_' + crypto.randomBytes(8).toString('hex');
        const deckName = body.name || 'Bộ Bài Tùy Chỉnh';
        const mainCards = Array.isArray(body.mainDeck) ? body.mainDeck : [];
        const extraCards = Array.isArray(body.extraDeck) ? body.extraDeck : [];
        const now = new Date().toISOString();

        this.dbManager.db.prepare(`
          INSERT INTO user_decks (id, user_id, name, is_active, main_deck_json, extra_deck_json, updated_at)
          VALUES (?, ?, ?, 1, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            main_deck_json = excluded.main_deck_json,
            extra_deck_json = excluded.extra_deck_json,
            updated_at = excluded.updated_at
        `).run(deckId, session.userId, deckName, JSON.stringify(mainCards), JSON.stringify(extraCards), now);

        this.sendJson(res, 200, { success: true, deckId, message: 'Đã lưu bộ bài thành công' });
        return;
      }

      // 9. Multiplayer Rooms & Real-Time Sync
      if (pathname === '/api/rooms/create' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Vui lòng đăng nhập để tạo phòng thi đấu');
          return;
        }
        const body = await this.readJsonBody(req);
        const mode = body.mode === 'MOBA' ? 'MOBA' : 'TCG';
        const room = this.roomManager.createRoom(
          { userId: session.userId, username: session.username, displayName: session.displayName },
          mode
        );
        this.sendJson(res, 201, { success: true, room });
        return;
      }

      if (pathname === '/api/rooms/join' && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Vui lòng đăng nhập để tham gia phòng');
          return;
        }
        const body = await this.readJsonBody(req);
        if (!body.code) {
          this.sendError(res, 400, 'Thiếu mã phòng thi đấu (code)');
          return;
        }
        const room = this.roomManager.joinRoom(
          body.code,
          { userId: session.userId, username: session.username, displayName: session.displayName }
        );
        this.broadcastRoomUpdate(room.code, room);
        this.sendJson(res, 200, { success: true, room });
        return;
      }

      // Real-Time SSE Stream for room events: /api/rooms/:code/events
      const sseMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)\/events$/);
      if (sseMatch && method === 'GET') {
        const code = sseMatch[1].toUpperCase();
        const room = this.roomManager.getRoom(code);
        if (!room) {
          this.sendError(res, 404, 'Phòng thi đấu không tồn tại');
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*'
        });

        if (!this.roomSubscribers.has(code)) {
          this.roomSubscribers.set(code, new Set());
        }
        const subSet = this.roomSubscribers.get(code)!;
        subSet.add(res);

        // Send initial room snapshot
        res.write(`data: ${JSON.stringify({ type: 'CONNECTED', room })}\n\n`);

        req.on('close', () => {
          subSet.delete(res);
          if (subSet.size === 0) {
            this.roomSubscribers.delete(code);
          }
        });
        return;
      }

      // Room State Polling: /api/rooms/:code
      const roomGetMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)$/);
      if (roomGetMatch && method === 'GET') {
        const code = roomGetMatch[1].toUpperCase();
        const room = this.roomManager.getRoom(code);
        if (!room) {
          this.sendError(res, 404, 'Phòng thi đấu không tồn tại');
          return;
        }
        this.sendJson(res, 200, { success: true, room });
        return;
      }

      // Room Ready Toggle: /api/rooms/:code/ready
      const roomReadyMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)\/ready$/);
      if (roomReadyMatch && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const code = roomReadyMatch[1].toUpperCase();
        const body = await this.readJsonBody(req);
        const isReady = body.isReady !== undefined ? Boolean(body.isReady) : true;
        const room = this.roomManager.setReady(code, session.userId, isReady, body.deckId);
        this.broadcastRoomUpdate(code, room);
        this.sendJson(res, 200, { success: true, room });
        return;
      }

      // Room Start: /api/rooms/:code/start
      const roomStartMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)\/start$/);
      if (roomStartMatch && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const code = roomStartMatch[1].toUpperCase();
        const room = this.roomManager.startMatch(code, session.userId);
        this.broadcastRoomUpdate(code, room);
        this.sendJson(res, 200, { success: true, room });
        return;
      }

      // Room Action: /api/rooms/:code/action
      const roomActionMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)\/action$/);
      if (roomActionMatch && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const code = roomActionMatch[1].toUpperCase();
        const body = await this.readJsonBody(req);
        if (!body.actionType) {
          this.sendError(res, 400, 'Thiếu loại hành động (actionType)');
          return;
        }
        const room = this.roomManager.dispatchAction(code, session.userId, body.actionType, body.payload || {});
        this.broadcastRoomUpdate(code, room);
        this.sendJson(res, 200, { success: true, room });
        return;
      }

      // Room Leave: /api/rooms/:code/leave
      const roomLeaveMatch = pathname.match(/^\/api\/rooms\/([A-Za-z0-9_-]+)\/leave$/);
      if (roomLeaveMatch && method === 'POST') {
        const session = this.authenticate(req);
        if (!session) {
          this.sendError(res, 401, 'Yêu cầu xác thực tài khoản');
          return;
        }
        const code = roomLeaveMatch[1].toUpperCase();
        const ok = this.roomManager.leaveRoom(code, session.userId);
        const updatedRoom = this.roomManager.getRoom(code);
        this.broadcastRoomUpdate(code, updatedRoom);
        this.sendJson(res, 200, { success: ok, room: updatedRoom });
        return;
      }

      // If this is an API route that didn't match any handler, return 404
      if (pathname.startsWith('/api')) {
        this.sendError(res, 404, `API route [${method} ${pathname}] không tồn tại`);
        return;
      }

      // Serve static files from dist/ directory with SPA fallback
      this.serveStaticOrFallback(req, res, pathname);
    } catch (err: any) {
      this.sendError(res, 500, err.message || 'Lỗi xử lý yêu cầu phía máy chủ');
    }
  };

  /**
   * Safe static file server with MIME type lookup and SPA routing fallback
   */
  private serveStaticOrFallback(req: IncomingMessage, res: ServerResponse, pathname: string): void {
    const distDir = path.resolve(process.cwd(), 'dist');
    const mimeTypes: Record<string, string> = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.mjs': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.wasm': 'application/wasm',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.webp': 'image/webp'
    };

    // Only handle GET and HEAD requests for static content
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET, HEAD');
      res.end('Method Not Allowed');
      return;
    }

    let relativePath = pathname;
    if (relativePath === '/' || relativePath === '') {
      relativePath = '/index.html';
    }

    let filePath = path.normalize(path.join(distDir, relativePath));

    // Security check: Directory traversal prevention
    if (!filePath.startsWith(distDir)) {
      res.statusCode = 403;
      res.end('Access Denied');
      return;
    }

    // Check if target file exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      
      this.setCorsHeaders(res);
      res.setHeader('Content-Type', contentType);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');

      if (filePath.includes(path.join('dist', 'assets'))) {
        // Immutable cache for fingerprinted assets
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        // Light caching / revalidation for index.html
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }

      res.statusCode = 200;
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      return;
    }

    // SPA Fallback: If not an asset request (e.g. navigation route), serve index.html
    const fallbackIndex = path.join(distDir, 'index.html');
    if (fs.existsSync(fallbackIndex)) {
      this.setCorsHeaders(res);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.statusCode = 200;
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      fs.createReadStream(fallbackIndex).pipe(res);
      return;
    }

    // Neither file nor dist/index.html found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found: dist/ build directory not found. Please run "npm run build".');
  }

  /**
   * Listen on a specified port
   */
  public listen(port: number = 3001, host: string = '0.0.0.0'): Promise<ServerInstance> {
    return new Promise((resolve, reject) => {
      const server = createServer(this.handleRequest);

      server.on('error', (err) => reject(err));

      server.listen(port, host, () => {
        const address = server.address();
        const actualPort = typeof address === 'object' && address ? address.port : port;
        resolve({
          server,
          port: actualPort,
          close: () =>
            new Promise<void>((resClose, rejClose) => {
              server.close((err) => (err ? rejClose(err) : resClose()));
            })
        });
      });
    });
  }
}

// Standalone execution entry point
if (process.argv[1] && (process.argv[1].endsWith('server.ts') || process.argv[1].endsWith('server.js'))) {
  const port = parseInt(process.env.PORT || '3001', 10);
  const server = new ElementaServer();
  server.listen(port, '0.0.0.0').then(inst => {
    console.log(`[ELEMENTA SERVER] Running at http://0.0.0.0:${inst.port}`);
    console.log(`[ELEMENTA SERVER] SQLite engine, SSE multiplayer & static web hosting active.`);
  }).catch(err => {
    console.error('[ELEMENTA SERVER] Startup error:', err);
    process.exit(1);
  });
}
