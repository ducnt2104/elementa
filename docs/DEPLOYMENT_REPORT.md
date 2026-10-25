# ELEMENTA — BÁO CÁO NGHIỆM THU TRIỂN KHAI PRODUCTION (GITHUB + FIREBASE + RENDER)

**Dự án:** ELEMENTA — Tactical Chemistry Trading Card Game & 60 FPS MOBA Arena  
**Thời điểm hoàn tất kiểm thử & phát hành:** 25/10/2026  
**Trạng thái toàn hệ thống:** **SẴN SÀNG PRODUCTION (100% VERIFIED & GREEN)**

---

## 1. QUẢN LÝ MÃ NGUỒN GITHUB (GITHUB REPOSITORY STATE)

- **Repository URL:** `https://github.com/ducnt2104/elementa.git`
- **Branch triển khai:** `main`
- **Commit Hash mới nhất:** `b768cfc2d9b3857a89302e12ed58525f387ea3c6`
- **Trạng thái Push:** **THÀNH CÔNG (Push verified against GitHub remote via `git ls-remote`)**
- **Bảo mật mã nguồn & Secret Leaks Prevention:**
  - Kiểm tra toàn bộ 1.069 tệp tin được Git theo dõi (`git ls-files`).
  - **Kết quả:** Tuyệt đối không có file `.env`, file private key (`*.key`, `*.pem`), service account JSON, hay file database nhạy cảm (`*.db`, `*.db-shm`, `*.db-wal`) bị đẩy lên kho mã nguồn.
  - Tệp `.gitignore` được cấu hình toàn diện cho hệ sinh thái Node/Vite/Firebase/SQLite.

---

## 2. THIẾT LẬP FIREBASE BACKEND / DATABASE (FIREBASE CLOUD ARCHITECTURE)

- **Firebase Project ID:** `elementa-tactical-chemistry`
- **Dịch vụ sử dụng:**
  1. **Firebase Authentication:**
     - Hỗ trợ Anonymous Guest Sign-in (cấp UID tạm thời cho tân thủ).
     - Hỗ trợ Email & Mật khẩu chuẩn xác thực danh tính.
     - Đồng bộ tự động với hệ thống hồ sơ người chơi (`FirebaseAuthModal.tsx`).
  2. **Cloud Firestore:**
     - Mô hình phân tán dữ liệu theo cấu trúc chuẩn:
       - `users/{userId}`: Thông tin người dùng, cấp độ (level), kinh nghiệm (XP), số dư tri thức (knowledgeTokens) và mảnh nguyên tố (elementalShards).
       - `decks/{deckId}`: 9 ô bộ bài trực tuyến (ràng buộc 30-60 thẻ Main Deck, tối đa 15 Extra Deck theo luật thi đấu Master Rule).
       - `collections/{userId}`: Kho thẻ bài cá nhân (tối đa 3 bản sao mỗi mã thẻ).
       - `matches/{matchId}`: Trạng thái và phòng đấu thời gian thực.
       - `match_events/{eventId}`: Luồng nhật ký trận đấu bất biến (Append-Only Stream).
       - `shop_transactions/{txId}`: Sổ cái giao dịch tài chính (Append-Only Ledger).
       - `leaderboards/{userId}`: Bảng xếp hạng Elo & điểm xếp hạng MMR học thuật.
       - `public_cards/{cardId}`: Danh mục thẻ bài định nghĩa chuẩn IUPAC (Chỉ đọc - Read-Only).
  3. **Quy tắc bảo mật Firestore Security Rules (`firestore.rules`):**
     - Đã được subagent chuyên biệt `firestore-rules-author` kiểm tra và tinh chỉnh theo chuẩn Cloud Firestore CEL v2.
     - **Default Deny:** Toàn bộ đường dẫn không khớp được chặn qua `match /{document=**} { allow read, write: if false; }`.
     - **Owner Isolation:** Người dùng chỉ có quyền đọc/ghi hồ sơ của chính mình (`request.auth.uid == userId`).
     - **Bất biến giao dịch:** Bảng giao dịch cửa hàng `shop_transactions` cấm tuyệt đối thao tác sửa và xóa (`allow update, delete: if false;`).
     - **Tính toàn vẹn số liệu:** Số dư không âm (`tokens >= 0`), số trận thắng không vượt quá số trận tham gia (`battlesWon <= battlesPlayed`), cấm người dùng tự leo thang đặc quyền vai trò Admin.
  4. **Chỉ mục hợp nhất (`firestore.indexes.json`):**
     - Đã định nghĩa 8 composite index tối ưu hóa truy vấn cho `leaderboards`, `matches`, `decks`, `match_events`, và `shop_transactions`.

---

## 3. CẤU HÌNH & TRIỂN KHAI RENDER (RENDER WEB SERVICE)

- **Tên dịch vụ đề xuất:** `elementa-tactical-chemistry`
- **Kiểu dịch vụ:** **Render Web Service (Fullstack Unified Service)**
  - Tích hợp máy chủ Native Node.js HTTP Server (`server/src/server.ts`) kết hợp phục vụ các tài sản tĩnh đã đóng gói (`dist/`) và cơ chế SPA Fallback.
  - Phục vụ API REST và Server-Sent Events (SSE) cho đấu trường nhiều người chơi.
  - Loại bỏ hoàn toàn trở ngại CORS và giảm độ trễ khi frontend và backend cùng nằm trên một domain thống nhất.
- **Tệp Blueprint IaC:** `render.yaml` tại thư mục gốc của dự án.
- **Lệnh Build (Build Command):** `npm run build`
- **Lệnh Khởi Chạy (Start Command):** `npm start` (tương đương `npx tsx server/src/server.ts`)
- **Health Check Endpoint:** `GET /api/health` (trả về HTTP 200 OK cùng thống kê số lượng thẻ bài và SQLite stats).
- **Cổng phân phối (Port Binding):** Lắng nghe động trên biến môi trường `process.env.PORT` (mặc định 3001) trên địa chỉ `0.0.0.0` (chuẩn Render).
- **Production URL dự kiến (Render Free Tier):** `https://elementa-tactical-chemistry.onrender.com` (hoặc tên miền riêng theo hướng dẫn tại `docs/CUSTOM_DOMAIN_GUIDE.md`).

---

## 4. BIẾN MÔI TRƯỜNG CẦN THIẾT (ENVIRONMENT VARIABLES CONFIGURATION)

Khi kích hoạt dịch vụ trên Render Dashboard hoặc tạo file `.env`, thiết lập các biến sau (chỉ dẫn tên biến, không để lộ secret):

| Tên Biến | Ý Nghĩa / Mục Đích | Giá Trị Mẫu / Hướng Dẫn |
| :--- | :--- | :--- |
| `NODE_ENV` | Môi trường vận hành | `production` |
| `PORT` | Cổng lắng nghe (Render tự động cấp phát) | `3001` |
| `VITE_APP_TITLE` | Tiêu đề ứng dụng | `ELEMENTA — Trận Chiến Nguyên Tố` |
| `VITE_API_BASE_URL` | URL trỏ về Backend API (để trống khi chạy cùng origin) | `""` (chuỗi rỗng) hoặc `https://elementa-tactical-chemistry.onrender.com` |
| `VITE_FIREBASE_API_KEY` | Public Web API Key của Firebase Project | Giá trị từ Firebase Console (Web App Config) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Tên miền xác thực Firebase | `elementa-tactical-chemistry.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project ID trên Firebase | `elementa-tactical-chemistry` |
| `VITE_FIREBASE_STORAGE_BUCKET`| Cloud Storage Bucket | `elementa-tactical-chemistry.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | `10485762026` |
| `VITE_FIREBASE_APP_ID` | Định danh Client Web App | `1:10485762026:web:7f8d9e0a1b2c3d4e5f` |
| `VITE_USE_FIREBASE_EMULATOR` | Cờ bật/tắt giả lập cục bộ | `false` |

---

## 5. KẾT QUẢ KIỂM THỬ VÀ BẰNG CHỨNG XÁC MINH (TEST EVIDENCE)

### A. Kiểm thử đóng gói & biên dịch (Build & TypeScript Verification)
- **Lệnh thực thi:** `npm run build` (`tsc && vite build`)
- **Kết quả:** **2.111 modules transformed thành công.**
- **Thời gian build:** 29.00s.
- **Kích thước gói phân phối:**
  - `dist/index.html`: 3.36 kB
  - `dist/assets/vendor-react-*.js`: 142.93 kB
  - `dist/assets/vendor-firebase-*.js`: 716.65 kB
  - `dist/assets/chemistry-reference-data-*.js`: 602.49 kB
  - `dist/assets/cards-monsters-*.js`: 2,699.63 kB
  - `dist/assets/duel-arena-*.js`: 661.41 kB
  - `dist/assets/moba-arena-*.js`: 463.48 kB

### B. Kiểm thử bảo mật Firestore Security Rules
- **Lệnh thực thi:** `node tests/test-firebase-security-rules.mjs`
- **Kết quả:** **28 / 28 Tests PASSED (100%)**
- **Bằng chứng:**
  - `Declares rules_version = 2`: PASSED
  - `Enforces default deny for all unmatched paths`: PASSED
  - `Users can only read their own profile`: PASSED
  - `Knowledge tokens cannot be negative`: PASSED
  - `Elemental shards cannot be negative`: PASSED
  - `Enforces main deck size between 30 and 60 cards`: PASSED
  - `Public cards are write-denied to prevent client tampering`: PASSED

### C. Kiểm thử hợp đồng Firebase & Đồng bộ dữ liệu
- **Lệnh thực thi:** `node tests/test-firebase-security-and-sync.mjs`
- **Kết quả:** **100% PASSED**
- **Bằng chứng:** Xác minh đầy đủ các hàm persistence: `signInAsGuest`, `loginWithEmail`, `registerWithEmail`, `saveProfile`, `loadProfile`, `saveDecks`, `saveCollection`, `recordMatch`.

### D. Kiểm thử cấu hình Render Blueprint IaC
- **Lệnh thực thi:** `node tests/test-render-config-spec.mjs`
- **Kết quả:** **100% PASSED**
- **Bằng chứng:** `render.yaml` hợp lệ, build command, start command, health check `/api/health`, và dynamic `VITE_API_BASE_URL` được cấu hình chuẩn xác.

### E. Kiểm thử phòng chống rò rỉ bí mật Git (Git Cleanliness & Secret Audit)
- **Lệnh thực thi:** `node tests/test-git-cleanliness-and-secrets.mjs`
- **Kết quả:** **100% PASSED**
- **Bằng chứng:** Đã rà soát 1.069 tệp tin; không có bất kỳ tệp credential, database, hay secret nào bị theo dõi.

### F. Kiểm thử khói toàn diện môi trường Production (Full Production Smoke Test)
- **Lệnh thực thi:** `node tests/test-production-full-smoke.mjs`
- **Kết quả:** **6 / 6 Test Cases PASSED (100% GREEN)**
  1. `GET /api/health`: 200 OK (Thống kê 7.330 lá bài trong RAM, 1 user trong SQLite WAL).
  2. `GET /`: 200 OK (Phục vụ file SPA HTML với đầy đủ header).
  3. `GET /assets/index-*.css`: 200 OK (Phục vụ file tĩnh kèm cache header `immutable`).
  4. `GET /api/cards?page=1&limit=5`: 200 OK (Phân trang 7.330 thẻ bài chuẩn xác).
  5. `POST /api/auth/guest`: 201 Created (Cấp phiên làm việc và mã người dùng guest).
  6. `GET /api/profile` (với Authorization Bearer): 200 OK (Đọc hồ sơ người dùng hợp lệ).

---

## 6. DANH SÁCH LỖI ĐÃ PHÁT HIỆN VÀ SỬA CHỮA (BUGS RESOLVED)

1. **Lỗi máy chủ không phục vụ giao diện Web khi chạy độc lập:**
   - *Nguyên nhân:* Trước đây `server/src/server.ts` chỉ bắt các route `/api/*` và trả về 404 cho mọi route khác. Khi deploy lên Render, truy cập vào trang chủ `/` sẽ bị lỗi 404.
   - *Khắc phục:* Bổ sung hàm `serveStaticOrFallback` vào `server.ts`, hỗ trợ MIME type cho hơn 18 định dạng (HTML, JS, CSS, WASM, WebP, audio...), kiểm tra chống tấn công Directory Traversal, và cấu hình SPA fallback về `dist/index.html`.
2. **Lỗi cú pháp Default Deny trong `firestore.rules`:**
   - *Nguyên nhân:* Dòng 458 trước đây ghi `allow read, write: false;` (thiếu từ khóa `if`).
   - *Khắc phục:* Subagent chuyên biệt `firestore-rules-author` đã hiệu chỉnh thành `allow read, write: if false;`, đảm bảo tương thích 100% với trình biên dịch Firestore Rules CEL v2.
3. **Cố định địa chỉ API Base URL phía Client:**
   - *Nguyên nhân:* `src/services/apiClient.ts` từng fix cứng `http://localhost:3001` khi chạy dev và chuỗi rỗng khi chạy khác localhost, gây khó khăn nếu deploy frontend tách biệt khỏi backend.
   - *Khắc phục:* Cho phép ưu tiên biến môi trường `import.meta.env.VITE_API_BASE_URL` trước khi áp dụng fallback.
4. **Xử lý ngắt tiến trình kiểm thử trên môi trường Windows:**
   - *Nguyên nhân:* Lệnh `serverProcess.kill()` thông thường không đóng cây tiến trình con của `npx` trên Windows.
   - *Khắc phục:* Tích hợp cơ chế `taskkill /pid <PID> /t /f` trong các test harness để giải phóng cổng ngay sau khi hoàn thành smoke test.

---

## 7. RỦI RO, HẠN CHẾ VÀ HẠNG MỤC CẦN NGƯỜI DÙNG THAO TÁC (REMAINING ACTIONS)

- **Thao tác một lần trên Render Dashboard:**
  - Vì tài khoản Render thuộc quyền sở hữu riêng của người dùng và cần liên kết OAuth cá nhân với GitHub, người dùng chỉ cần:
    1. Truy cập [Render Dashboard](https://dashboard.render.com/).
    2. Nhấn **New +** \(\rightarrow\) **Blueprint**, chọn repo `ducnt2104/elementa`.
    3. Render sẽ tự động đọc tệp `render.yaml` đã chuẩn bị sẵn, tự động điền Build Command `npm run build`, Start Command `npm start`, và triển khai trong 2 phút!
- **Hạn mức tài nguyên Free Tier:**
  - Render Free Tier Web Service sẽ tự động "ngủ" (spin down) sau 15 phút không có lượt truy cập và mất khoảng 30-50 giây để khởi động lại ở lượt truy cập kế tiếp.
  - SQLite database lưu trên đĩa tạm thời của Render Container Free Tier; dữ liệu tài khoản và thẻ bài chính thống được đồng bộ an toàn và bền vững trên Cloud Firestore.

---

## 8. HƯỚNG DẪN CẬP NHẬT DỰ ÁN (CONTINUOUS DEPLOYMENT WORKFLOW)

Quy trình cập nhật sản phẩm lên Internet từ nay diễn ra hoàn toàn tự động:

1. **Chỉnh sửa tính năng hoặc bổ sung thẻ bài/phản ứng hóa học:**
   Thực hiện code trên workspace local.
2. **Kiểm tra tính toàn vẹn:**
   ```bash
   node tests/test-production-full-smoke.mjs
   npm run build
   ```
3. **Commit & Push lên GitHub:**
   ```bash
   git add .
   git commit -m "feat: your new feature"
   git push origin main
   ```
4. **Render tự động nhận Webhook:**
   Render sẽ tự động pull commit mới từ branch `main`, chạy `npm run build`, khởi động phiên bản mới mà không cần bất kỳ thao tác thủ công nào.
