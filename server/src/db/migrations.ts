// server/src/db/migrations.ts
// Database Schema & Migrations for ELEMENTA Online-First Architecture
// Supports persistent storage with SQLite (via Node.js DatabaseSync)

export const SCHEMA_V1 = `
-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT,
  salt TEXT,
  is_guest INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  knowledge_tokens INTEGER DEFAULT 500,
  elemental_shards INTEGER DEFAULT 100,
  battles_played INTEGER DEFAULT 0,
  battles_won INTEGER DEFAULT 0,
  reactions_triggered INTEGER DEFAULT 0,
  tutorial_completed INTEGER DEFAULT 0,
  settings_json TEXT
);

-- 3. Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

-- 4. User Card Collections Table
CREATE TABLE IF NOT EXISTS user_collections (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  acquired_at TEXT NOT NULL,
  UNIQUE(user_id, card_id)
);

-- 5. User Decks Table
CREATE TABLE IF NOT EXISTS user_decks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_active INTEGER DEFAULT 0,
  main_deck_json TEXT NOT NULL,
  extra_deck_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- 6. Wallets & Currency Ledger
CREATE TABLE IF NOT EXISTS wallets (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  tokens INTEGER DEFAULT 500,
  shards INTEGER DEFAULT 100,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS currency_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  token_delta INTEGER DEFAULT 0,
  shard_delta INTEGER DEFAULT 0,
  item_id TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TEXT NOT NULL
);

-- 7. Quests Catalog & User Quest Progress
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_count INTEGER NOT NULL,
  reward_xp INTEGER NOT NULL,
  reward_tokens INTEGER NOT NULL,
  reward_shards INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_quest_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quest_id TEXT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  current_count INTEGER DEFAULT 0,
  is_completed INTEGER DEFAULT 0,
  is_claimed INTEGER DEFAULT 0,
  last_updated TEXT NOT NULL,
  UNIQUE(user_id, quest_id)
);

-- 8. CA-SRS (Spaced Repetition) Reviews Table
CREATE TABLE IF NOT EXISTS srs_reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  error_type TEXT NOT NULL,
  error_level INTEGER NOT NULL,
  repetitions INTEGER DEFAULT 0,
  stability REAL DEFAULT 1.0,
  next_review_date TEXT NOT NULL,
  last_review_date TEXT NOT NULL,
  UNIQUE(user_id, topic_id)
);

-- 9. Multiplayer Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  host_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  guest_id TEXT REFERENCES users(id),
  mode TEXT NOT NULL,
  status TEXT NOT NULL,
  host_ready INTEGER DEFAULT 0,
  guest_ready INTEGER DEFAULT 0,
  match_state_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- 10. Match History Table
CREATE TABLE IF NOT EXISTS match_history (
  id TEXT PRIMARY KEY,
  mode TEXT NOT NULL,
  player_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  opponent_name TEXT NOT NULL,
  outcome TEXT NOT NULL,
  turns_played INTEGER DEFAULT 1,
  player_final_lp INTEGER DEFAULT 0,
  opponent_final_lp INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  tokens_earned INTEGER DEFAULT 0,
  debrief_json TEXT,
  created_at TEXT NOT NULL
);

-- Indexes for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_user ON user_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_decks_user ON user_decks(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON currency_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_quest_progress_user ON user_quest_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_srs_user ON srs_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
`;

export const INITIAL_QUESTS = [
  // Tutorial Quests
  {
    id: 'quest_tut_01',
    category: 'TUTORIAL',
    title: 'Khám Phá Sảnh Chính',
    description: 'Lần đầu đăng nhập và hoàn thành Spotlight Tour hướng dẫn tân thủ.',
    target_count: 1,
    reward_xp: 150,
    reward_tokens: 200,
    reward_shards: 50
  },
  {
    id: 'quest_tut_02',
    category: 'TUTORIAL',
    title: 'Bước Chân Đầu Tiên Vào Đấu Trường',
    description: 'Tham gia 1 trận Đấu Bài TCG hoặc 1 trận Đấu Trường MOBA.',
    target_count: 1,
    reward_xp: 200,
    reward_tokens: 250,
    reward_shards: 60
  },
  {
    id: 'quest_tut_03',
    category: 'TUTORIAL',
    title: 'Nhà Giả Kim Khởi Nghiệp',
    description: 'Tạo hoặc chỉnh sửa 1 bộ bài tại mục Xây Dựng Deck.',
    target_count: 1,
    reward_xp: 180,
    reward_tokens: 200,
    reward_shards: 50
  },
  // Daily Quests
  {
    id: 'quest_daily_01',
    category: 'DAILY',
    title: 'Vinh Quang Trận Chiến Hằng Ngày',
    description: 'Tham gia 2 trận đấu TCG hoặc MOBA bất kỳ.',
    target_count: 2,
    reward_xp: 250,
    reward_tokens: 350,
    reward_shards: 80
  },
  {
    id: 'quest_daily_02',
    category: 'DAILY',
    title: 'Kích Hoạt Chuỗi Phản Ứng Combo',
    description: 'Kích hoạt thành công ít nhất 3 phản ứng hóa học (ví dụ: Na+H2O, Fe+O2).',
    target_count: 3,
    reward_xp: 300,
    reward_tokens: 400,
    reward_shards: 100
  },
  {
    id: 'quest_daily_03',
    category: 'DAILY',
    title: 'Chăm Chỉ Ôn Tập CA-SRS',
    description: 'Hoàn thành 1 bài ôn tập ngắt quãng từ nhật ký lỗi thực chiến.',
    target_count: 1,
    reward_xp: 200,
    reward_tokens: 300,
    reward_shards: 70
  },
  // Weekly Quests
  {
    id: 'quest_weekly_01',
    category: 'WEEKLY',
    title: 'Bậc Thầy Chiến Thuật Tuần',
    description: 'Chiến thắng 5 trận đấu TCG hoặc MOBA trong tuần.',
    target_count: 5,
    reward_xp: 800,
    reward_tokens: 1200,
    reward_shards: 300
  },
  // Curriculum GDPT 2018 Quests
  {
    id: 'quest_curr_01',
    category: 'CURRICULUM',
    title: 'Khảo Sát Kim Loại Kiềm & Kiềm Thổ (KHTN 7-8)',
    description: 'Sử dụng thẻ Natri (Na) hoặc Magie (Mg) trong trận đấu.',
    target_count: 1,
    reward_xp: 250,
    reward_tokens: 300,
    reward_shards: 60
  },
  {
    id: 'quest_curr_02',
    category: 'CURRICULUM',
    title: 'Hóa Giải Bẫy Nhận Thức Kim Loại (KHTN 9)',
    description: 'Tránh mắc lỗi ghép Cu với dung dịch HCl loãng trong trận đấu.',
    target_count: 1,
    reward_xp: 300,
    reward_tokens: 400,
    reward_shards: 80
  }
];
