// server/src/auth/authService.ts
// Secure Authentication & Session Management Service
// Uses Node.js crypto for PBKDF2 salt hashing and cryptographically secure tokens

import * as crypto from 'crypto';
import { DatabaseManager } from '../db/database';

export interface UserSession {
  token: string;
  userId: string;
  username: string;
  displayName: string;
  isGuest: boolean;
  expiresAt: string;
}

export interface PlayerProfileDTO {
  userId: string;
  username: string;
  displayName: string;
  level: number;
  xp: number;
  knowledgeTokens: number;
  elementalShards: number;
  battlesPlayed: number;
  battlesWon: number;
  reactionsTriggered: number;
  tutorialCompleted: boolean;
  isGuest: boolean;
}

export class AuthService {
  private dbManager: DatabaseManager;

  constructor(dbManager?: DatabaseManager) {
    this.dbManager = dbManager || DatabaseManager.getInstance();
  }

  private hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  private generateToken(): string {
    return 'elt_' + crypto.randomBytes(32).toString('hex');
  }

  /**
   * Create a temporary guest session for instant play
   */
  public createGuestSession(): UserSession {
    const userId = 'guest_' + crypto.randomBytes(8).toString('hex');
    const username = 'Guest_' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
    const token = this.generateToken();

    this.dbManager.transaction(() => {
      // 1. Insert into users
      this.dbManager.db.prepare(`
        INSERT INTO users (id, username, email, is_guest, created_at, updated_at)
        VALUES (?, ?, NULL, 1, ?, ?)
      `).run(userId, username, now, now);

      // 2. Insert into user_profiles
      this.dbManager.db.prepare(`
        INSERT INTO user_profiles (user_id, display_name, level, xp, knowledge_tokens, elemental_shards, tutorial_completed)
        VALUES (?, ?, 1, 0, 800, 150, 0)
      `).run(userId, username);

      // 3. Insert into wallets
      this.dbManager.db.prepare(`
        INSERT INTO wallets (user_id, tokens, shards, updated_at)
        VALUES (?, 800, 150, ?)
      `).run(userId, now);

      // 4. Insert into sessions
      this.dbManager.db.prepare(`
        INSERT INTO sessions (token, user_id, created_at, expires_at)
        VALUES (?, ?, ?, ?)
      `).run(token, userId, now, expiresAt);
    });

    return {
      token,
      userId,
      username,
      displayName: username,
      isGuest: true,
      expiresAt
    };
  }

  /**
   * Register a permanent user account
   */
  public register(username: string, email: string, password: string): UserSession {
    const existing = this.dbManager.db.prepare(`
      SELECT id FROM users WHERE username = ? OR email = ?
    `).get(username, email);

    if (existing) {
      throw new Error('Tên người dùng hoặc email đã được sử dụng');
    }

    const userId = 'usr_' + crypto.randomBytes(12).toString('hex');
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(password, salt);
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
    const token = this.generateToken();

    this.dbManager.transaction(() => {
      this.dbManager.db.prepare(`
        INSERT INTO users (id, username, email, password_hash, salt, is_guest, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 0, ?, ?)
      `).run(userId, username, email, passwordHash, salt, now, now);

      this.dbManager.db.prepare(`
        INSERT INTO user_profiles (user_id, display_name, level, xp, knowledge_tokens, elemental_shards, tutorial_completed)
        VALUES (?, ?, 1, 0, 1000, 200, 0)
      `).run(userId, username);

      this.dbManager.db.prepare(`
        INSERT INTO wallets (user_id, tokens, shards, updated_at)
        VALUES (?, 1000, 200, ?)
      `).run(userId, now);

      this.dbManager.db.prepare(`
        INSERT INTO sessions (token, user_id, created_at, expires_at)
        VALUES (?, ?, ?, ?)
      `).run(token, userId, now, expiresAt);
    });

    return {
      token,
      userId,
      username,
      displayName: username,
      isGuest: false,
      expiresAt
    };
  }

  /**
   * Log in an existing user
   */
  public login(usernameOrEmail: string, password: string): UserSession {
    const user = this.dbManager.db.prepare(`
      SELECT u.id, u.username, u.password_hash, u.salt, u.is_guest, p.display_name
      FROM users u
      JOIN user_profiles p ON u.id = p.user_id
      WHERE u.username = ? OR u.email = ?
    `).get(usernameOrEmail, usernameOrEmail) as any;

    if (!user || user.is_guest || !user.password_hash || !user.salt) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác');
    }

    const computedHash = this.hashPassword(password, user.salt);
    if (computedHash !== user.password_hash) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác');
    }

    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
    const token = this.generateToken();

    this.dbManager.db.prepare(`
      INSERT INTO sessions (token, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(token, user.id, now, expiresAt);

    return {
      token,
      userId: user.id,
      username: user.username,
      displayName: user.display_name,
      isGuest: false,
      expiresAt
    };
  }

  /**
   * Upgrade a guest account into a permanent account preserving all progress
   */
  public upgradeGuest(guestToken: string, username: string, email: string, password: string): UserSession {
    const session = this.validateSession(guestToken);
    if (!session || !session.isGuest) {
      throw new Error('Phiên khách không hợp lệ hoặc đã là tài khoản chính thức');
    }

    const existing = this.dbManager.db.prepare(`
      SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?
    `).get(username, email, session.userId);

    if (existing) {
      throw new Error('Tên người dùng hoặc email đã tồn tại');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(password, salt);
    const now = new Date().toISOString();

    this.dbManager.transaction(() => {
      this.dbManager.db.prepare(`
        UPDATE users
        SET username = ?, email = ?, password_hash = ?, salt = ?, is_guest = 0, updated_at = ?
        WHERE id = ?
      `).run(username, email, passwordHash, salt, now, session.userId);

      this.dbManager.db.prepare(`
        UPDATE user_profiles
        SET display_name = ?
        WHERE user_id = ?
      `).run(username, session.userId);
    });

    return {
      ...session,
      username,
      displayName: username,
      isGuest: false
    };
  }

  /**
   * Validate session token from HTTP Authorization header
   */
  public validateSession(token: string): UserSession | null {
    if (!token) return null;
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

    const row = this.dbManager.db.prepare(`
      SELECT s.token, s.user_id, s.expires_at, u.username, u.is_guest, p.display_name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      JOIN user_profiles p ON u.id = p.user_id
      WHERE s.token = ?
    `).get(cleanToken) as any;

    if (!row) return null;

    if (new Date(row.expires_at).getTime() < Date.now()) {
      // Session expired, remove it
      this.dbManager.db.prepare('DELETE FROM sessions WHERE token = ?').run(cleanToken);
      return null;
    }

    return {
      token: row.token,
      userId: row.user_id,
      username: row.username,
      displayName: row.display_name,
      isGuest: Boolean(row.is_guest),
      expiresAt: row.expires_at
    };
  }

  /**
   * Fetch full player profile DTO
   */
  public getProfile(userId: string): PlayerProfileDTO | null {
    const row = this.dbManager.db.prepare(`
      SELECT u.id, u.username, u.is_guest,
             p.display_name, p.level, p.xp, p.knowledge_tokens, p.elemental_shards,
             p.battles_played, p.battles_won, p.reactions_triggered, p.tutorial_completed
      FROM users u
      JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = ?
    `).get(userId) as any;

    if (!row) return null;

    return {
      userId: row.id,
      username: row.username,
      displayName: row.display_name,
      level: row.level,
      xp: row.xp,
      knowledgeTokens: row.knowledge_tokens,
      elementalShards: row.elemental_shards,
      battlesPlayed: row.battles_played,
      battlesWon: row.battles_won,
      reactionsTriggered: row.reactions_triggered,
      tutorialCompleted: Boolean(row.tutorial_completed),
      isGuest: Boolean(row.is_guest)
    };
  }
}
