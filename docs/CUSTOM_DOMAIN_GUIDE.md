# HƯỚNG DẪN CẤU HÌNH TÊN MIỀN TÙY CHỈNH (CUSTOM DOMAIN) CHO ELEMENTA

> **Dự án:** ELEMENTA — Trận Chiến Nguyên Tố (Tactical Chemistry TCG & MOBA)  
> **Nền tảng Hosting:** Netlify / Firebase Hosting / Cloudflare Pages  
> **Địa chỉ triển khai hiện tại:** `https://resonant-shortbread-5179a3.netlify.app/`  
> **Mã nguồn GitHub:** `https://github.com/ducnt2104/elementa`

---

## 1. TỔNG QUAN VỀ TÊN MIỀN CHO ELEMENTA

Khi bạn sở hữu tên miền riêng (ví dụ: `elementa.game`, `elementa.edu.vn`, `elementa.vn`, `elementa.io` hoặc subdomain `play.elementa.com`), bạn có thể trỏ tên miền về hạ tầng hosting miễn phí của ELEMENTA mà không mất thêm bất kỳ chi phí duy trì máy chủ nào.

---

## 2. HƯỚNG DẪN CẤU HÌNH TRÊN NETLIFY (KHUYẾN NGHỊ)

Dự án ELEMENTA hiện đang chạy trực tiếp trên Netlify với tự động kích hoạt HTTPS (Let's Encrypt) và CDN toàn cầu.

### Bước 2.1: Thêm Tên Miền Trong Bảng Điều Khiển Netlify
1. Truy cập [Netlify Dashboard](https://app.netlify.com/).
2. Chọn trang web: **`resonant-shortbread-5179a3`**.
3. Đi tới mục **Site configuration** → **Domain management** → **Custom domains**.
4. Nhấp vào nút **Add a domain**.
5. Nhập tên miền của bạn (ví dụ: `elementa.game` hoặc `play.elementa.game`) và nhấp **Verify** / **Add domain**.

### Bước 2.2: Cấu Hình Bản Ghi DNS Tại Nhà Cung Cấp Tên Miền
Đăng nhập vào trang quản trị DNS của nhà cung cấp tên miền của bạn (Namecheap, Cloudflare, GoDaddy, Pavietnam, Matbao, v.v.) và thêm các bản ghi sau:

#### Trường Hợp A: Cấu hình Tên Miền Gốc (Apex Domain, ví dụ: `elementa.game`)
| Loại Bản Ghi (Type) | Tên Máy Chủ (Host / Name) | Giá Trị (Target / Value) | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` | Auto / 3600 |
| **CNAME** | `www` | `resonant-shortbread-5179a3.netlify.app.` | Auto / 3600 |

#### Trường Hợp B: Cấu hình Tên Miền Phụ (Subdomain, ví dụ: `play.elementa.game`)
| Loại Bản Ghi (Type) | Tên Máy Chủ (Host / Name) | Giá Trị (Target / Value) | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `play` | `resonant-shortbread-5179a3.netlify.app.` | Auto / 3600 |

### Bước 2.3: Kích Hoạt Chứng Chỉ Bảo Mật SSL/TLS (HTTPS) Miễn Phí
- Sau khi DNS lan truyền (thường từ 2 đến 15 phút), Netlify sẽ tự động cấp chứng chỉ SSL miễn phí từ **Let's Encrypt**.
- Nếu trạng thái hiển thị *Waiting on DNS propagation*, hãy nhấp vào nút **Verify DNS configuration** để ép làm mới.

---

## 3. HƯỚNG DẪN CẤU HÌNH TRÊN FIREBASE HOSTING

Nếu bạn chọn kết nối tên miền trực tiếp vào Firebase Hosting song song:

### Bước 3.1: Thêm Domain Trong Firebase Console
1. Truy cập [Firebase Console](https://console.firebase.google.com/).
2. Chọn project Firebase của ELEMENTA.
3. Điều hướng tới menu **Hosting** → Nhấp nút **Add Custom Domain** (Thêm miền tùy chỉnh).
4. Nhập tên miền mong muốn (ví dụ: `elementa.web.app` hoặc `tcg.elementa.vn`).

### Bước 3.2: Xác Minh Quyền Sở Hữu (TXT Record)
Firebase sẽ yêu cầu tạo một bản ghi xác minh:
| Loại Bản Ghi | Host / Name | Giá Trị (Value) |
| :--- | :--- | :--- |
| **TXT** | `@` | `hosted-domain-verify=firebase-xxxxxx` |

### Bước 3.3: Trỏ Bản Ghi A Record Đến Firebase IP
Sau khi xác minh xong, thêm 2 bản ghi `A` do Firebase cung cấp:
| Loại Bản Ghi | Host / Name | Giá Trị IP (IP Addresses) |
| :--- | :--- | :--- |
| **A** | `@` | `199.36.158.100` |
| **A** | `@` | `199.36.158.100` |

---

## 4. BẢO VỆ & TỐI ƯU HÓA QUA CLOUDFLARE (TÙY CHỌN CAO CẤP)

Để đạt hiệu năng tải game và chống tấn công DDoS tốt nhất:
1. Đặt Nameservers của domain về Cloudflare.
2. Bật chế độ **Proxied** (Đám mây màu cam) cho bản ghi CNAME trỏ về `resonant-shortbread-5179a3.netlify.app`.
3. Bật **SSL/TLS Encryption Mode**: chọn **Full (strict)**.
4. Thêm Page Rule:
   - URL: `*yourdomain.com/assets/*`
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **1 month** (giúp tài nguyên hình ảnh thẻ bài và âm thanh tải tức thì cho người chơi).

---

## 5. KIỂM TRA ĐIỀU HƯỚNG SPA ROUTING (SINGLE PAGE APPLICATION)

Tất cả các tệp cấu hình cần thiết đã được biên dịch sẵn trong dự án:
- `public/_redirects`: `/*    /index.html   200`
- `netlify.toml`: Cấu hình CSP, HSTS và quy tắc định tuyến SPA.
- Khi người chơi truy cập các đường dẫn trực tiếp (ví dụ `https://elementa.game/duel` hoặc reload trang), ứng dụng không bao giờ bị lỗi `404 Not Found`.

---

## 6. DANH SÁCH KIỂM TRA SAU KHI CẤU HÌNH (CHECKLIST)
- [ ] Truy cập `https://<domain-cua-ban>/` tải được Sảnh Chính ELEMENTA.
- [ ] Ổ khóa màu xanh (HTTPS / SSL Valid) hiển thị trên thanh địa chỉ trình duyệt.
- [ ] Chế độ Đấu Bài TCG, Đấu Trường MOBA và Bảng Tuần Hoàn hoạt động 60FPS mượt mà.
- [ ] Đăng nhập tài khoản Firebase và đồng bộ dữ liệu Cloud Firestore thành công.
