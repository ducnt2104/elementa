# ELEMENTA — TRẬN CHIẾN NGUYÊN TỐ
## TACTICAL CHEMISTRY TRADING CARD GAME & REAL-TIME MOBA ARENA
### Academic Chemistry • Yu-Gi-Oh! Strategic Duels • 12 Elemental Champions • 60 FPS Canvas MOBA

> **Chương trình GDPT 2018 — Môn Khoa Học Tự Nhiên & Hóa Học THCS / THPT**  
> **Cơ sở dữ liệu Hóa Lý Chuẩn: IUPAC / CIAAW & NIST Atomic Spectra**  
> **Kiến trúc: Web / Progressive Web App (PWA) • 100% Offline Core • Zero Pay-to-Win • Engine 60 FPS**

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

**ELEMENTA** là trò chơi đấu thẻ bài chiến thuật và MOBA thời gian thực tích hợp hệ sinh thái học tập hóa học toàn diện, được thiết kế theo chuẩn chất lượng cao:

1. **Đấu Thẻ Bài Chiến Thuật Đỉnh Cao (Tactical Card Duel):**
   - Lấy cảm hứng từ các nguyên lý cốt lõi của *Yu-Gi-Oh!*: 5 ô quái thú, 5 ô phép/bẫy, 1 ô môi trường địa bàn, 1 ô Extra Deck (Hợp Chất & Quái Thú Liên Kết Link).
   - Máy trạng thái 6 pha lượt đấu (`DRAW` \(\rightarrow\) `STANDBY` \(\rightarrow\) `MAIN 1` \(\rightarrow\) `BATTLE` \(\rightarrow\) `MAIN 2` \(\rightarrow\) `END`) với đồng hồ đếm ngược 60 giây mỗi lượt.
   - Chuỗi phản ứng (Reaction Chain Stack) giải quyết theo cơ chế LIFO (Last-In First-Out) cho Phép Kích Hoạt Nhanh (Quick-Play Spells Speed 2) và Thẻ Bẫy.
   - Cơ chế Triệu Hồi Hiến Tế (Tribute Summon) theo tổng số sao \(\ge 7\), Triệu Hồi Tổng Hợp Hợp Chất (Compound Synthesis), và Quái Thú Liên Kết Hóa Trị (Valence Link-1 đến Link-4).
   - Động cơ Rút Bài Chiến Thuật Đa Chi Phí: Trả 1,000 LP rút 2 bài, Hiến Tế quái thú rút 2 bài, Trục Xuất 2 quái thú từ Mộ Bài rút 2 bài.
   - Phân định triệt để giữa **Nghĩa Địa (Graveyard)** (tái sinh qua phản ứng khử) và **Vùng Loại Bỏ (Banished Zone)** ("Chết Hơn Chết" / tiêu biến nhiệt động học).

2. **Hệ Thống Quản Lý 9 Ô Bộ Bài (9-Slot Deck Governance):**
   - 9 ô lưu trữ bộ bài độc lập, lưu trữ bền vững trong `localStorage`.
   - Ba bộ bài mẫu chuẩn thi đấu: *Quân Đoàn Nitơ & Haber-Bosch*, *Lò Rèn Lưu Huỳnh & H₂SO₄*, và *Bão Lửa Kiềm & Halogen*.
   - Luật thi đấu TCG nghiêm ngặt: Bộ bài chính từ 30 đến 60 thẻ, Extra Deck tối đa 15 thẻ, giới hạn tối đa 3 bản sao cho mỗi thẻ bài.

3. **Phúc Lợi Khởi Đầu & Cửa Hàng Gacha (Starter Welfare & Shop):**
   - Tân thủ được mở ngay **10 Gói Bài Miễn Phí (50 thẻ bài, 0 token)** để khởi tạo bộ bài cá nhân.
   - Tự động quy đổi thẻ trùng lặp thành Mảnh Nguyên Tố (Element Shards) để chế tác thẻ bài mới trong Xưởng Thí Nghiệm.
   - Giao diện xem trước thông tin thẻ bài một chạm (Single-Click Inspection) ở cấp Root Overlay, loại bỏ 100% hiện tượng chớp giật (Anti-Flicker).

4. **Đấu Trường MOBA Thời Gian Thực (60 FPS Canvas Arena):**
   - 12 tướng nguyên tố nguyên bản (Na, Fe, Cl, Cu, Al, O, H, Ba, C, S, Ca, He) thuộc 4 nhóm vai trò (Đấu Sĩ, Đỡ Đòn, Pháp Sư, Xạ Thủ).
   - Đấu trường 3 đường (Top, Mid, Bot) với sông nước \(H_2O\), bụi cỏ ẩn nấp, 12 trụ tháp phòng thủ bắn mục tiêu ưu tiên, lính sinh theo đợt mỗi 25 giây và Boss trung lập Xúc Tác Bạch Kim Pt.
   - Tương tác phản ứng hóa học trực tiếp trong combat: Natri bùng nổ khi chạm sông nước, Clo ăn mòn giáp, Sắt đổi trạng thái Oxi hóa Fe²⁺/Fe³⁺, Vàng Au miễn nhiễm hiệu ứng trơ hoàn toàn.

5. **Đối Thủ AI 4 Cấp Độ Thông Minh (4-Tier Opponent AI):**
   - Chế độ Đấu Thẻ Bài: `BEGINNER`, `STANDARD`, `ADVANCED`, `EXPERT` / `MENDELEEV` (tính toán thế cờ kết liễu Lethal, dự đoán bẫy úp, giữ phép nhanh phản đòn).
   - Chế độ MOBA: `NOVICE`, `STANDARD`, `ADVANCED`, `CHALLENGER` (thả diều Kiting, ngắm bắn dự đoán vector di chuyển của mục tiêu, phối hợp giao tranh).

6. **Môi Trường Hóa Học Biến Đổi (Chemical Environment Engine):**
   - Tích hợp nguyên lý chuyển dịch cân bằng Le Chatelier: nhiệt độ (\(T\)), áp suất (\(P\)), và \(pH\) môi trường buff/debuff chỉ số ATK/DEF trong thời gian thực.

---

## 2. HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY (QUICKSTART)

### Yêu cầu hệ thống:
- **Node.js**: \(\ge 18.0.0\) (Khuyên dùng Node v20 hoặc v22+)
- **Hệ điều hành**: Windows, macOS hoặc Linux

### Các lệnh thực thi:
```bash
# 1. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi chạy máy chủ phát triển (Development Server)
npm run dev

# 3. Chạy toàn bộ 148 bộ kiểm thử tự động (148 Suites, 100% Pass)
npm run test:all

# Chạy riêng kiểm thử bảo mật Firestore Security Rules
node tests/test-firebase-security-rules.mjs

# Chạy riêng kiểm thử Backend Database & Multiplayer
npx tsx tests/test-backend-database-multiplayer.mjs

# 4. Kiểm tra TypeScript và đóng gói bản phát hành Production
npm run build

# 5. Xem trước bản đóng gói Production
npm run preview
```

---

## 3. TÓM TẮT 10 BỘ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITES)

```
============================================================
 TOTAL TEST SUITES: 10 | TOTAL PASSING ASSERTIONS: 425 | FAILURES: 0
============================================================
```

1. **`test-engine.mjs` (41 tests):** Đánh giá toán học hóa lý IUPAC (\(ATK_{ox}, ATK_{red}, DEF_{stab}\)), bảo toàn nguyên tử & điện tích, DCSM State Machine, bẫy nhận thức Cu + HCl, và 3 lớp AI Guardrails.
2. **`test-moba.mjs` (45 tests):** 12 tướng MOBA, vòng lặp vật lý 60 FPS, đường đi của lính, logic trụ phòng thủ, AI Bot 4 cấp độ.
3. **`test-chemistry-calculator.mjs` (30 tests):** Khối lượng mol hợp chất, chuyển đổi mol-khối lượng, pha loãng dung dịch, hiệu suất phản ứng.
4. **`test-chemistry-data.mjs` (60 tests):** Tính toàn vẹn của Bảng tuần hoàn 118 nguyên tố, cấu hình electron, số oxi hóa, phân nhóm.
5. **`test-card-battle.mjs` (75 tests):** 5 ô quái thú/phép, mana đóng băng, triệu hồi hợp chất \(H_2O\), tính toán sát thương trực tiếp, AI 4 cấp.
6. **`test-duel-engine.mjs` (87 tests):** Cỗ máy 6 pha Yu-Gi-Oh!, luật hiến tế tổng sao \(\ge 7\), ngăn xếp LIFO chuỗi phản ứng, 3 dạng rút bài đa chi phí, phân lập Mộ Bài và Banished Zone, 4 bộ bài Archetype AI.
7. **`test-environment-engine.mjs` (33 tests):** Đo lường biến thiên \(pH\), nhiệt độ, áp suất, dịch chuyển Le Chatelier và cộng hưởng sát thương.
8. **`test-ranked-system.mjs` (19 tests):** 6 bậc xếp hạng (Đồng đến Đại Sư), tính điểm MMR, chuỗi thắng, hệ thống nhiệm vụ giáo dục.
9. **`test-deck-management.mjs` (21 tests):** 9 ô bộ bài, giới hạn 3 bản sao, min 30/max 60 bài chính, sao chép và thiết lập mặc định.
10. **`test-starter-welfare-and-deck.mjs` (14 tests):** Mở 10 pack miễn phí (50 thẻ, 0 token), cờ nhận phúc lợi, xem thẻ một chạm chống chớp tắt.

---

## 4. BẢNG PHÍM TẮT TRÊN ĐẤU TRƯỜNG MOBA

| Phím / Thao Tác | Chức Năng Trên Đấu Trường MOBA |
| :--- | :--- |
| **Chuột Phải (hoặc WASD)** | Di chuyển tướng tới vị trí chỉ định (tự động tìm đường tránh vật cản). |
| **Chuột Trái** | Chọn mục tiêu (Tướng, Lính, Trụ, Quái rừng) hoặc xác nhận bắn kỹ năng định hướng. |
| **Phím Q / W / E / R** | Kích hoạt 4 kỹ năng nguyên tố (hiển thị decal tầm bắn và vùng nhắm AoE). |
| **Phím D** | Phép bổ trợ: **Tốc Biến (Flash)** — Dịch chuyển tức thời 250 đơn vị. |
| **Phím F** | Phép bổ trợ: **Hồi Phục (Heal)** — Hồi 25% máu tối đa và tăng tốc độ chạy. |
| **Phím B** | **Biến Về (Recall)** — Vận sức 4 giây để hồi hương về căn cứ. |
| **Phím P** | Mở Cửa Hàng Trang Bị Hóa Học. |
| **Phím Space (Phím Cách)** | Đưa camera tức thời về trung tâm nhân vật. |
| **Phím Tab** | Bật/tắt Bảng Điểm Trận Đấu (Scoreboard: KDA, CS, Trang bị). |
| **Phím Esc** | Tạm dừng trận đấu / Cài đặt hệ thống. |

---

## 5. KIẾN TRÚC FIREBASE CLOUD & BẢO MẬT (FIREBASE ARCHITECTURE & SECURITY)

ELEMENTA tích hợp trực tiếp với hệ sinh thái Firebase (Google Cloud Platform) theo nguyên tắc **Zero-Trust, Strict Owner Isolation & Offline-First**:

### 5.1. Mô hình dữ liệu Cloud Firestore:
- `users/{userId}`: Hồ sơ học sinh / người chơi (level, XP, tokens, shards, thành tựu, vai trò).
- `decks/{deckId}`: Quản lý 9 ô bộ bài trực tuyến (giới hạn nghiêm ngặt 30-60 lá bài chính, tối đa 15 Extra Deck).
- `collections/{userId}`: Kho thẻ bài sở hữu cá nhân (tối đa 3 bản sao mỗi loại thẻ).
- `matches/{matchId}`: Trạng thái và nhật ký trận đấu nhiều người chơi (P2P / Room-based).
- `match_events/{eventId}`: Luồng sự kiện trận đấu bất biến (Append-Only Audit Stream).
- `public_cards/{cardId}`: Danh mục 7.330 lá bài chuẩn quốc gia & IUPAC (Chỉ đọc - Read-Only).
- `leaderboards/{userId}`: Bảng xếp hạng học thuật & MMR Elo trực tuyến.

### 5.2. Quy tắc bảo mật Cloud Firestore (`firestore.rules`):
- Toàn bộ cơ sở dữ liệu tuân thủ **Default Deny**: Mọi truy vấn không thỏa mãn điều kiện tường minh đều bị từ chối truy cập.
- Chống gian lận kinh tế: `knowledgeTokens` và `elementalShards` không bao giờ được âm; `battlesWon <= battlesPlayed`.
- Chống leo thang đặc quyền (Privilege Escalation Defense): Người dùng không thể tự nâng cấp vai trò thành Admin hoặc can thiệp dữ liệu tài khoản khác (`isOwner(userId)`).

### 5.3. Khởi chạy Firebase Local Emulator Suite:
```bash
# Khởi động bộ giả lập Firebase cục bộ (Auth: 9099, Firestore: 8080, Hosting: 5000, UI: 4000)
npx firebase-tools emulators:start
```

---

## 6. QUY TRÌNH TRIỂN KHAI PRODUCTION: GITHUB + FIREBASE + RENDER

ELEMENTA được thiết kế theo kiến trúc Fullstack hiện đại, vận hành linh hoạt và hoàn toàn tự động thông qua chu trình CI/CD tích hợp giữa **GitHub**, **Firebase** và **Render**:

```
┌─────────────────┐       git push main       ┌────────────────────────┐
│  Local Dev Env  │ ────────────────────────> │  GitHub Repository     │
│  (Vite + Node)  │                           │  (ducnt2104/elementa)  │
└─────────────────┘                           └───────────┬────────────┘
                                                          │ Auto-Deploy
                                                          ▼
┌─────────────────────────────────┐           ┌────────────────────────┐
│  Google Cloud / Firebase        │           │  Render Web Service    │
│  - Firebase Authentication      │ <───────> │  - Node.js Auth Engine │
│  - Cloud Firestore Database     │           │  - Native SQLite WAL   │
│  - Strict Security Rules v2     │           │  - Dynamic SPA Hosting │
└─────────────────────────────────┘           └────────────────────────┘
```

### 6.1. Quản lý mã nguồn trên GitHub
- **Repository:** `https://github.com/ducnt2104/elementa.git`
- **Branch triển khai:** `main`
- **Quy tắc an toàn (Zero Secret Leaks):**
  - Mọi tệp `.env`, `.env.local`, credential, key, private token và file database cục bộ (`*.db`, `*.db-wal`) đều được chặn tuyệt đối qua `.gitignore`.
  - Mọi thay đổi đều được kiểm tra nghiêm ngặt qua test suite trước khi commit và push.

### 6.2. Thiết lập cơ sở dữ liệu Firebase Cloud
1. **Firebase Project:** `elementa-tactical-chemistry`
2. **Kích hoạt Authentication:** Hỗ trợ Anonymous Guest Sign-in và Email/Password Auth.
3. **Triển khai Firestore Rules & Indexes:**
   ```bash
   # Triển khai Rules bảo mật
   npx firebase-tools deploy --only firestore:rules --project elementa-tactical-chemistry

   # Triển khai Composite Indexes
   npx firebase-tools deploy --only firestore:indexes --project elementa-tactical-chemistry
   ```
4. **Nguyên tắc bảo vệ dữ liệu:**
   - **Default Deny:** Toàn bộ truy vấn không khớp đều bị chặn.
   - **Owner Isolation:** Mỗi người dùng chỉ đọc/ghi hồ sơ của chính mình (`request.auth.uid == userId`).
   - **Bất biến số dư & giao dịch:** Số dư token/shard không âm, bảng giao dịch `shop_transactions` là append-only không thể sửa hoặc xóa.

### 6.3. Triển khai Web Động trên Render
ELEMENTA cung cấp tệp cấu hình hạ tầng dạng mã nguồn `render.yaml` (Render Blueprint IaC) chuẩn hóa:

1. **Kết nối Render với GitHub:**
   - Đăng nhập vào [Render Dashboard](https://dashboard.render.com/).
   - Chọn **New +** \(\rightarrow\) **Blueprint** hoặc **Web Service**, kết nối tới repository `ducnt2104/elementa`.
2. **Cấu hình dịch vụ (Service Specification):**
   - **Service Name:** `elementa-tactical-chemistry`
   - **Environment:** `Node` (Node.js 22+)
   - **Branch:** `main`
   - **Region:** `Singapore` (hoặc vùng gần nhất)
   - **Build Command:** `npm run build` (Biên dịch TypeScript và đóng gói Vite)
   - **Start Command:** `npm start` (Khởi chạy máy chủ Native HTTP tích hợp static SPA)
   - **Health Check Path:** `/api/health`
3. **Biến môi trường cần thiết trên Render (Environment Variables):**

| Tên biến | Giá trị mẫu | Mô tả |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Chế độ runtime tối ưu hóa hiệu năng |
| `PORT` | `3001` (Render tự cấp phát động) | Cổng lắng nghe máy chủ HTTP |
| `VITE_APP_TITLE` | `ELEMENTA — Trận Chiến Nguyên Tố` | Tiêu đề ứng dụng |
| `VITE_FIREBASE_PROJECT_ID` | `elementa-tactical-chemistry` | Định danh dự án Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `elementa-tactical-chemistry.firebaseapp.com` | Tên miền xác thực Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET`| `elementa-tactical-chemistry.appspot.com` | Kho lưu trữ Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `10485762026` | Cloud Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | `1:10485762026:web:7f8d9e0a1b2c3d4e5f` | Định danh ứng dụng web Firebase |
| `VITE_USE_FIREBASE_EMULATOR` | `false` | Tắt chế độ giả lập cục bộ khi chạy production |

### 6.4. Hướng dẫn cập nhật phiên bản (Continuous Deployment Workflow)
Mỗi khi có cập nhật tính năng hoặc dữ liệu hóa học mới:
```bash
# 1. Chạy kiểm thử tự động
npm test

# 2. Kiểm tra đóng gói production
npm run build

# 3. Commit thay đổi với thông điệp rõ ràng
git add .
git commit -m "feat(chemistry): add new reaction catalysts and balance tweaks"

# 4. Push lên GitHub (Render sẽ tự động kích hoạt webhook Build & Deploy)
git push origin main
```

---

## 7. HẠ TẦNG & TÊN MIỀN TRUY CẬP (DOMAINS & ACCESS)

- **Render Production URL:** Do Render tự động cấp phát khi kích hoạt dịch vụ (VD: `https://elementa-tactical-chemistry.onrender.com`).
- **Netlify CDN Edge (Mirror):** `https://resonant-shortbread-5179a3.netlify.app/`
- **Cloudflare Workers (Edge API):** `https://elementa-tactical-chemistry.equal-bangle.workers.dev`
- **Hỗ trợ tên miền riêng (Custom Domain):** Hướng dẫn chi tiết tại `docs/CUSTOM_DOMAIN_GUIDE.md` (hỗ trợ trỏ bản ghi CNAME / A record về Render và kích hoạt SSL tự động Let's Encrypt).

---

## 8. BẢN QUYỀN & MÃ NGUỒN MỞ
Dự án được xây dựng phục vụ giáo dục, đổi mới phương pháp giảng dạy Khoa Học Tự Nhiên & Hóa Học tại Việt Nam theo chương trình GDPT 2018. Toàn bộ mã nguồn phát hành dưới giấy phép MIT.
