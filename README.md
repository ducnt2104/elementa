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

# 3. Chạy toàn bộ 10 bộ kiểm thử tự động (425 Assertions, 100% Pass)
npm test

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

## 6. HẠ TẦNG & TRIỂN KHAI TRỰC TUYẾN MIỄN PHÍ (DYNAMIC DEPLOYMENT)

- **Trực tiếp trên Netlify Global CDN (Miễn phí):**
  - **Địa chỉ truy cập chính thức:** `https://resonant-shortbread-5179a3.netlify.app/`
  - **Mật khẩu bảo vệ bản phát hành (Drop Gate):** `My-Drop-Site`
- **Dự phòng trên Cloudflare Workers:**
  - `https://elementa-tactical-chemistry.equal-bangle.workers.dev`
- **Hạn ngạch miễn phí (Free Tier Limits):**
  - Firebase Spark Plan: 50,000 lượt đọc / 20,000 lượt ghi mỗi ngày (hoàn toàn đủ cho hàng ngàn trận đấu đồng thời).
  - Netlify / Cloudflare: Băng thông 100GB/tháng, SSL TLS 1.3 tự động, độ trễ toàn cầu < 50ms.

---

## 7. BẢN QUYỀN & MÃ NGUỒN MỞ
Dự án được xây dựng phục vụ giáo dục, đổi mới phương pháp giảng dạy Khoa Học Tự Nhiên & Hóa Học tại Việt Nam theo chương trình GDPT 2018. Toàn bộ mã nguồn phát hành dưới giấy phép MIT.
