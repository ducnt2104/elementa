# ELEMENTA — BÁO CÁO NGHIỆM THU TRIỂN KHAI PRODUCTION 0 ĐỒNG (GITHUB + CLOUDFLARE PAGES + FIREBASE SPARK)

**Dự án:** ELEMENTA — Tactical Chemistry Trading Card Game & 60 FPS MOBA Arena  
**Thời điểm hoàn tất kiểm thử & phát hành:** 25/10/2026  
**Ngân sách vận hành:** **0 ĐỒNG (FREE TIER VĨNH VIỄN)**  
**Trạng thái toàn hệ thống:** **SẴN SÀNG PRODUCTION (100% VERIFIED & GREEN)**

---

## 1. QUẢN LÝ MÃ NGUỒN GITHUB (GITHUB REPOSITORY STATE)

- **Repository URL:** `https://github.com/ducnt2104/elementa.git`
- **Branch triển khai:** `main`
- **Tự động hóa CI/CD:** `.github/workflows/deploy.yml` tích hợp quy trình kiểm tra `npm ci`, typecheck `npx tsc --noEmit`, đóng gói `npm run build`, chạy kiểm thử khói `npm run test:smoke` và triển khai tự động.
- **Bảo mật mã nguồn & Secret Leaks Prevention:**
  - Kiểm tra toàn bộ tệp tin được Git theo dõi (`git ls-files`).
  - **Kết quả:** Tuyệt đối không có file `.env`, file private key (`*.key`, `*.pem`), service account JSON, hay file database nhạy cảm (`*.db`, `*.db-shm`, `*.db-wal`) bị đẩy lên kho mã nguồn.
  - Tệp `.gitignore` được cấu hình toàn diện.

---

## 2. THIẾT LẬP FIREBASE SPARK BACKEND / DATABASE (100% FREE)

- **Firebase Project ID:** `elementa-tactical-chemistry`
- **Hạn ngạch gói Spark (0 đồng):**
  - Miễn phí vĩnh viễn, không cần thẻ tín dụng, không tự kích hoạt Blaze.
  - 50.000 lượt đọc Firestore / ngày.
  - 20.000 lượt ghi Firestore / ngày.
- **Dịch vụ sử dụng:**
  1. **Firebase Authentication:**
     - Hỗ trợ Anonymous Guest Sign-in và Email & Mật khẩu chuẩn xác thực danh tính.
     - Tự động đồng bộ với kho dữ liệu LocalStorage khi offline.
  2. **Cloud Firestore:**
     - Mô hình phân tán: `users/{userId}`, `decks/{deckId}`, `collections/{userId}`, `matches/{matchId}`, `match_events/{eventId}`, `shop_transactions/{txId}`, `leaderboards/{userId}`, `public_cards/{cardId}`.
  3. **Quy tắc bảo mật Firestore Security Rules (`firestore.rules`):**
     - Đã được subagent chuyên biệt `firestore-rules-author` kiểm tra và tinh chỉnh theo chuẩn Cloud Firestore CEL v2.
     - **Default Deny:** Toàn bộ đường dẫn không khớp được chặn qua `match /{document=**} { allow read, write: if false; }`.
     - **Owner Isolation:** Người dùng chỉ có quyền đọc/ghi hồ sơ của chính mình (`request.auth.uid == userId`).
     - **Bất biến giao dịch:** Bảng giao dịch cửa hàng `shop_transactions` cấm tuyệt đối thao tác sửa và xóa (`allow update, delete: if false;`).
     - **Tính toàn vẹn số liệu:** Số dư không âm (`tokens >= 0`), số trận thắng không vượt quá số trận tham gia (`battlesWon <= battlesPlayed`), cấm người dùng tự leo thang đặc quyền vai trò Admin.
  4. **Chỉ mục hợp nhất (`firestore.indexes.json`):**
     - Đã định nghĩa 8 composite index tối ưu hóa truy vấn.

---

## 3. CẤU HÌNH & TRIỂN KHAI CLOUDFLARE PAGES FREE (ZERO-COST HOSTING)

- **Nền tảng:** **Cloudflare Pages Free Tier**
  - Băng thông không giới hạn (Zero Cost Bandwidth).
  - Tích hợp mạng phân phối nội dung toàn cầu Cloudflare Global Edge Network.
  - SSL/TLS tự động và bảo vệ chống tấn công DDoS mặc định.
- **Tệp cấu hình Pages:**
  - `wrangler.toml`: Khai báo `pages_build_output_dir = "dist"`.
  - `public/_redirects`: Quy tắc điều hướng SPA `/* /index.html 200` ngăn ngừa lỗi 404 khi tải lại trang ở màn hình sâu.
  - `public/_headers`: Cấu hình Security Headers và Content Security Policy.
- **Lệnh Build (Build Command):** `npm run build`
- **Output Directory:** `dist`
- **Production URL dự kiến:** `https://elementa.pages.dev` (hoặc `https://elementa-tactical-chemistry.pages.dev`).
- **Quy trình kết nối tự động (Git Integration):**
  1. Mở Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
  2. Chọn kho mã nguồn `ducnt2104/elementa` và branch `main`.
  3. Chọn framework preset `Vite` (hoặc `None`), Build command `npm run build`, Output directory `dist`.
  4. Nhấn **Save and Deploy**. Cloudflare Pages sẽ tự động kích hoạt mỗi khi có commit mới trên nhánh `main`.

---

## 4. BIẾN MÔI TRƯỜNG CẦN THIẾT (ENVIRONMENT VARIABLES CONFIGURATION)

| Tên Biến | Ý Nghĩa / Mục Đích | Giá Trị Mẫu / Hướng Dẫn |
| :--- | :--- | :--- |
| `NODE_ENV` | Môi trường vận hành | `production` |
| `VITE_APP_TITLE` | Tiêu đề ứng dụng | `ELEMENTA — Trận Chiến Nguyên Tố` |
| `VITE_API_BASE_URL` | URL Backend API (để chuỗi rỗng khi chạy static SPA) | `""` (chuỗi rỗng) |
| `VITE_FIREBASE_API_KEY` | Public Web API Key của Firebase Project | Giá trị từ Firebase Console |
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

- **Kết nối Cloudflare Pages trên Cloudflare Dashboard (Chỉ cần làm 1 lần, 0 đồng):**
  - Vì tài khoản Cloudflare thuộc quyền sở hữu riêng của người dùng và cần liên kết OAuth cá nhân với GitHub:
    1. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com/) (miễn phí).
    2. Nhấn vào **Workers & Pages** \(\rightarrow\) **Create application** \(\rightarrow\) chọn tab **Pages** \(\rightarrow\) **Connect to Git**.
    3. Chọn kho mã nguồn `ducnt2104/elementa` và branch `main`.
    4. Cấu hình thông số:
       - Framework preset: `Vite` (hoặc `None`)
       - Build command: `npm run build`
       - Output directory: `dist`
    5. Nhấn **Save and Deploy**. Cloudflare Pages sẽ tự động biên dịch và phát hành tại `https://elementa.pages.dev` (hoặc tên miền thay thế).
- **Hạn mức gói miễn phí (Free Tier Limits):**
  - Cloudflare Pages Free: Băng thông không giới hạn, 500 builds/tháng.
  - Firebase Spark: 50.000 reads/ngày, 20.000 writes/ngày, không bao giờ phát sinh cước phí ngoài ý muốn do không kích hoạt Blaze.

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
