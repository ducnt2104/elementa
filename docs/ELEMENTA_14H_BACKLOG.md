# ELEMENTA: KẾ HOẠCH HÀNH ĐỘNG CHIẾN DỊCH 14 GIỜ (14-HOUR ENGINEERING BACKLOG)
**Mã chiến dịch:** `ELEMENTA-AUTONOMOUS-14H-V4`  
**Ngày cập nhật:** 2026-10-23  
**Dự án:** ELEMENTA — Trận Chiến Nguyên Tố (Tactical Chemistry TCG + MOBA + Educational Platform)  
**Tiêu chuẩn khoa học:** IUPAC / CIAAW / PubChem / GDPT 2018 (Thông tư 32/2018/TT-BGDĐT)  
**Chế độ thực thi:** Solo Routine / Autonomous Continuous Execution Loop

---

## 1. DANH SÁCH NHIỆM VỤ THEO THỨ TỰ ƯU TIÊN

### [P0] TÍNH TOÀN VẸN HỆ THỐNG & SỰ CỐ QUAN TRỌNG
- [x] **TSK-P0-01**: Kiểm tra TypeScript compilation `npx tsc --noEmit` & Production Build `npm run build`.
- [x] **TSK-P0-02**: Chạy toàn bộ 8 test suites hiện có (1.617 tests passed).
- [x] **TSK-P0-03**: Xác thực đường truyền API client khi backend offline (Graceful degradation sang local SQLite/LocalStorage) và khi online (Auto-sync & SSE rooms).

### [P1] TÍNH NĂNG CỐT LÕI THEO HỒ SƠ THUYẾT MINH
- [x] **TSK-P1-01**: **Chế độ Giám Khảo 1-Click (Judge Quick-Access Mode)**:
  - Bổ sung nút "Trải nghiệm Nhanh cho Giám khảo / Học sinh" tại Navbar & MainMenuTab theo Phụ lục 4 Bước 5 của hồ sơ.
  - Cấp tài khoản Giám khảo đặc quyền: Mở khóa full 7.330 thẻ, 118 nguyên tố, 10.000 Tokens, 5.000 Shards, cấp 50, kiểm tra tức thì mọi cơ chế mà không cần cày cuốc.
- [x] **TSK-P1-02**: **Bộ Phân Tích Tỉ Lệ Vàng Deck 10 Ô (Golden Ratio Deck Analyzer)**:
  - Hiện thực hóa Mục II.2.1.c trong hồ sơ: Đánh giá tỉ lệ bộ bài 10 ô (4 Tấn công : 3 Môi trường/Xúc tác : 3 Phòng thủ/Hóa giải).
  - Cảnh báo trực quan nếu bộ bài thiếu thẻ kích hoạt môi trường ($H_2O, O_2, t^\circ$) cho các chuỗi combo.
- [x] **TSK-P1-03**: **Hoàn thiện Xưởng Sáng Tạo AI Guardrails 3 Lớp (RAG + JSON Schema)**:
  - Khớp nối chính xác với Bảng 5 & Bảng 7 của hồ sơ:
    - Layer 1: Cách ly `<student_submission>` & lọc an toàn học đường.
    - Layer 2: Đối chiếu RAG cục bộ với dữ liệu chuẩn IUPAC, từ chối He đốt cháy, Cu + HCl loãng, Na nổ trong nước.
    - Layer 3: JSON Schema Hard-Cap (Sát thương $\le 120$, Hồi chiêu $\ge 8s$, 4 Archetypes chuẩn).
    - Bộ nhớ đệm SHA-256 Hash Caching chống tốn token API.
- [x] **TSK-P1-04**: **Bảng Điều Khiển Giáo Viên (Teacher Analytics Dashboard)**:
  - Hiện thực hóa Mục VI.1 của hồ sơ: Thống kê thời gian thực Top 5 phương trình phản ứng và nguyên tố học sinh nhầm lẫn nhiều nhất từ Error Log của CA-SRS.
  - Tích hợp tính chỉ số Hake Normalized Gain ($g = 0.77$) và Cohen's $d = 6.55$.
  - Xuất báo cáo sư phạm đề xuất điều chỉnh bài giảng trên lớp (Markdown, CSV, JSON).

### [P2] MỞ RỘNG GAMEPLAY & CHIỀU SÂU CHIẾN THUẬT
- [x] **TSK-P2-01**: Tích hợp chuỗi phản ứng DCSM vào Kỹ năng MOBA (Na phóng nước nổ, Cl ăn mòn, Cu/Au kháng acid loãng $E^\circ > 0$).
- [x] **TSK-P2-02**: Tối ưu hóa hiệu năng render danh sách 7.330 thẻ bài (Virtualization/Windowing & configurable cards-per-page) để tốc độ cuộn đạt 60 FPS mượt mà trên mobile.
- [x] **TSK-P2-03**: Bổ sung bộ bài mẫu chuẩn thi đấu GDPT 2018 (Lớp 8 KHTN, Lớp 9 KHTN, Lớp 10 Hóa học).

### [P3] TRẢI NGHIỆM ĐIỀU KHIỂN MOBA TRÊN THIẾT BỊ DI ĐỘNG & HIỆU ỨNG CHIẾN ĐẤU
- [ ] **TSK-P3-01**: **Tối ưu hóa Điều Khiển Mobile Virtual Joystick & Touch Arena cho MOBA**:
  - Hỗ trợ cảm ứng đa điểm Pointer Events mượt mà trên iOS Safari và Android Chrome.
  - Cải tiến Virtual Joystick với deadzone clamping và touch indicators.
  - Bổ sung nút kỹ năng cảm ứng màn hình với vòng hồi chiêu trực quan.
- [ ] **TSK-P3-02**: **Hiệu Ứng Hạt Hóa Học (Chemical Reaction Particles & Combat Juice)**:
  - Thêm hệ thống hạt tia lửa khi nổ Natri/Nước, bọt khí hydro $H_2\uparrow$, và khói rỉ sét vàng nâu $Fe_2O_3$ trong MOBA Canvas.
  - Floating Reaction Badge hiển thị công thức hóa học vừa kích hoạt ngay trên chiến trường.

---

## 2. KẾ HOẠCH KIỂM THỬ LIÊN TỤC
Mỗi tác vụ sau khi triển khai phải vượt qua:
1. `npx tsc --noEmit` (0 lỗi type).
2. Script kiểm thử đơn vị & tích hợp tương ứng.
3. `npm test` (11 Test Suites, 1.850+ tests passed).
4. `npm run build` (Biên dịch production bundle sạch).
