# ELEMENTA — CHỈ SỐ HIỆU NĂNG BAN ĐẦU (PERFORMANCE BASELINE)
**Hệ điều hành / Môi trường:** Windows Node.js + Vite Dev Server (Port 3000)  
**Trình biên dịch:** TypeScript 5.7.2 + Vite 6.4.4  
**Quy mô mã nguồn:** 1622 modules transformed

---

### 1. Chỉ Số Khởi Điểm
- **Thời gian Build Production:** ~4.0s - 5.2s (`tsc && vite build`).
- **Dung lượng Bundle Gzip:**
  - `dist/index.html`: 1.25 kB (gzip: 0.71 kB)
  - `dist/assets/index.css`: 48.95 kB (gzip: 8.55 kB)
  - `dist/assets/index.js`: 635.00 kB (gzip: 172.54 kB)
- **Tốc độ khung hình mục tiêu:** 60 FPS (Chu kỳ mô phỏng cố định 16.6ms / tick).
- **Bộ kiểm thử tự động:** 217/217 test pass (100% tỷ lệ vượt qua trên 3 bộ runner).
- **Trạng thái Dev Server:** HTTP 200 OK phản hồi ngay lập tức dưới 15ms.

---

### 2. Nguy Cơ Nghẽn Hiệu Năng Cần Kiểm Soát Khi Đại Tu Đồ Họa
1. **Canvas Path Churn:** Vẽ lại các đường kẻ lưới bản đồ 2400x2400 và các đường lính mỗi frame làm tiêu tốn CPU rendering.
   - *Giải pháp:* Cache địa hình vào canvas phụ `terrainCanvas` bằng `OffscreenCanvas` hoặc canvas ẩn, vẽ lại chỉ khi zoom/kích thước thay đổi.
2. **Garbage Collection Stalls:** Khởi tạo object `{ x, y, vx, vy }` mỗi lần sinh hạt nổ hoặc đường đạn sẽ gây rác bộ nhớ (GC spike) dẫn đến tụt frame (micro-stuttering).
   - *Giải pháp:* Pre-allocated Object Pool (mảng cố định 300 phần tử hạt tái sử dụng).
3. **Viewport Culling:** Vẽ các đơn vị lính và hiệu ứng nằm ngoài vùng nhìn của camera.
   - *Giải pháp:* Kiểm tra tọa độ trước khi vẽ (`x >= camX - halfW && x <= camX + halfW ...`).
4. **Bóng Đổ Canvas `shadowBlur`:** Sử dụng `shadowBlur` quá nhiều trên hàng trăm thực thể cùng lúc gây quá tải GPU rasterizer.
   - *Giải pháp:* Thay thế `shadowBlur` trên các đối tượng nhỏ bằng các vòng tròn bán trong suốt (radial glow rings) và chỉ dùng `shadowBlur` cho các công trình lớn (Trụ/Core/Boss).
