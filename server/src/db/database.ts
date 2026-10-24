// server/src/db/database.ts
// Native High-Performance SQLite Database Adapter using Node.js DatabaseSync
// Zero external native dependencies, supports persistent file or in-memory DB

import { DatabaseSync } from 'node:sqlite';
import * as path from 'path';
import * as fs from 'fs';
import { SCHEMA_V1, INITIAL_QUESTS } from './migrations';

export class DatabaseManager {
  private static instance: DatabaseManager | null = null;
  public db: DatabaseSync;

  private constructor(dbPath?: string) {
    const targetPath = dbPath || process.env.DATABASE_PATH || path.resolve(process.cwd(), 'elementa.db');
    if (targetPath !== ':memory:') {
      const dir = path.dirname(targetPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(targetPath);
    this.runMigrations();
  }

  public static getInstance(dbPath?: string): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager(dbPath);
    }
    return DatabaseManager.instance;
  }

  public static createInMemory(): DatabaseManager {
    return new DatabaseManager(':memory:');
  }

  private runMigrations(): void {
    // Enable WAL mode & foreign keys for concurrency & safety
    try {
      this.db.exec('PRAGMA journal_mode = WAL;');
      this.db.exec('PRAGMA foreign_keys = ON;');
    } catch {
      // WAL may not be applicable for in-memory DB
    }

    // Execute schema tables and indexes
    this.db.exec(SCHEMA_V1);

    // Seed initial quests if empty
    const questCountRow = this.db.prepare('SELECT COUNT(*) as cnt FROM quests').get() as { cnt: number };
    if (questCountRow.cnt === 0) {
      const insertQuest = this.db.prepare(`
        INSERT INTO quests (id, category, title, description, target_count, reward_xp, reward_tokens, reward_shards)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const q of INITIAL_QUESTS) {
        insertQuest.run(q.id, q.category, q.title, q.description, q.target_count, q.reward_xp, q.reward_tokens, q.reward_shards);
      }
    }
  }

  /**
   * Helper to execute a function inside an immediate SQL transaction
   */
  public transaction<T>(callback: () => T): T {
    this.db.exec('BEGIN IMMEDIATE;');
    try {
      const result = callback();
      this.db.exec('COMMIT;');
      return result;
    } catch (err) {
      this.db.exec('ROLLBACK;');
      throw err;
    }
  }

  /**
   * Diagnostic statistics for health reporting
   */
  public getStats() {
    const userCount = (this.db.prepare('SELECT COUNT(*) as cnt FROM users').get() as any)?.cnt || 0;
    const roomCount = (this.db.prepare('SELECT COUNT(*) as cnt FROM rooms').get() as any)?.cnt || 0;
    const questCount = (this.db.prepare('SELECT COUNT(*) as cnt FROM quests').get() as any)?.cnt || 0;
    return {
      userCount,
      roomCount,
      questCount,
      walMode: true
    };
  }
}
