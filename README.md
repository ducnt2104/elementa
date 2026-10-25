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

## 6. QUY TRÌNH TRIỂN KHAI PRODUCTION 0 ĐỒNG: GITHUB + CLOUDFLARE PAGES + FIREBASE SPARK

ELEMENTA được cấu hình vận hành với ngân sách mặc định **0 đồng**, tận dụng tối đa gói miễn phí của **GitHub**, **Cloudflare Pages** và **Firebase Spark**:

```
┌─────────────────┐       git push main       ┌────────────────────────┐
│  Local Dev Env  │ ────────────────────────> │  GitHub Repository     │
│  (Vite + React) │                           │  (ducnt2104/elementa)  │
└─────────────────┘                           └───────────┬────────────┘
                                                          │ Auto-Deploy
                                                          ▼
┌─────────────────────────────────┐           ┌────────────────────────┐
│  Google Cloud / Firebase Spark  │           │  Cloudflare Pages Free │
│  - Firebase Authentication      │ <───────> │  - Free Global CDN     │
│  - Cloud Firestore Database     │           │  - Zero Cost Bandwidth │
│  - Strict Security Rules v2     │           │  - Native SPA Router   │
└─────────────────────────────────┘           └────────────────────────┘
```

### 6.1. Quản lý mã nguồn trên GitHub
- **Repository:** `https://github.com/ducnt2104/elementa.git`
- **Branch triển khai:** `main`
- **Quy tắc an toàn (Zero Secret Leaks):**
  - Mọi tệp `.env`, `.env.local`, credential, key, private token và file database cục bộ (`*.db`, `*.db-wal`) đều được chặn tuyệt đối qua `.gitignore`.
  - Mọi thay đổi đều được kiểm tra nghiêm ngặt qua test suite trước khi commit và push.

### 6.2. Thiết lập cơ sở dữ liệu Firebase Spark (100% Free - Không Billing)
1. **Firebase Project:** `elementa-tactical-chemistry` (Gói Spark miễn phí vĩnh viễn, không cần thẻ tín dụng).
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

### 6.3. Triển khai Cloudflare Pages Free (Zero-Cost Deployment)
Dự án đã được trang bị đầy đủ cấu hình tối ưu cho Cloudflare Pages:
- [`wrangler.toml`](./wrangler.toml): Khai báo `pages_build_output_dir = "dist"`.
- [`public/_redirects`](./public/_redirects): Điều hướng toàn bộ route SPA `/* -> /index.html` với HTTP 200, loại bỏ lỗi 404 khi tải lại trang.
- [`public/_headers`](./public/_headers): Cấu hình bảo mật HTTP Security Headers và Content Security Policy (CSP).

**Các bước kết nối trên Cloudflare Dashboard (Chỉ cần làm 1 lần):**
1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/) (Tài khoản Free).
2. Vào mục **Workers & Pages** \(\rightarrow\) **Create application** \(\rightarrow\) chọn tab **Pages** \(\rightarrow\) **Connect to Git**.
3. Chọn kho mã nguồn: **`ducnt2104/elementa`**.
4. Cấu hình thông số Build:
   - **Framework preset:** `Vite` (hoặc `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Production branch:** `main`
5. Nhấn **Save and Deploy**. Cloudflare Pages sẽ tự động build và cấp phát URL miễn phí `https://elementa.pages.dev` (hoặc tên miền thay thế theo project name).
6. Từ nay, mỗi khi `git push origin main`, Cloudflare Pages sẽ tự động kích hoạt build và deploy phiên bản mới hoàn toàn miễn phí.

### 6.4. Biến môi trường cần thiết (Environment Variables):

| Tên biến | Giá trị mẫu | Mô tả |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Chế độ runtime tối ưu hóa hiệu năng |
| `VITE_APP_TITLE` | `ELEMENTA — Trận Chiến Nguyên Tố` | Tiêu đề ứng dụng |
| `VITE_API_BASE_URL` | `""` (chuỗi rỗng) | Chạy static SPA không phụ thuộc server riêng |
| `VITE_FIREBASE_PROJECT_ID` | `elementa-tactical-chemistry` | Định danh dự án Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `elementa-tactical-chemistry.firebaseapp.com` | Tên miền xác thực Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET`| `elementa-tactical-chemistry.appspot.com` | Kho lưu trữ Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `10485762026` | Cloud Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | `1:10485762026:web:7f8d9e0a1b2c3d4e5f` | Định danh ứng dụng web Firebase |
| `VITE_USE_FIREBASE_EMULATOR` | `false` | Tắt chế độ giả lập cục bộ khi chạy production |

---

## 7. HẠ TẦNG & TÊN MIỀN TRUY CẬP MIỄN PHÍ

- **Cloudflare Pages Production URL:** `https://elementa-tactical-chemistry.pages.dev` (hoặc subdomain do Cloudflare Pages cấp).
- **GitHub Pages Mirror:** `https://ducnt2104.github.io/elementa/` (triển khai tự động qua `.github/workflows/deploy.yml`).
- **Netlify CDN Edge (Mirror):** `https://resonant-shortbread-5179a3.netlify.app/` (đã có cấu hình `netlify.toml`).

---

## 8. BẢN QUYỀN & MÃ NGUỒN MỞ
Dự án được xây dựng phục vụ giáo dục, đổi mới phương pháp giảng dạy Khoa Học Tự Nhiên & Hóa Học tại Việt Nam theo chương trình GDPT 2018. Toàn bộ mã nguồn phát hành dưới giấy phép MIT.
