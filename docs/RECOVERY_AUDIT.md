# BÁO CÁO KHẢO SÁT & KIỂM TOÁN PHỤC HỒI HỆ THỐNG (RECOVERY AUDIT)
**Dự án:** ELEMENTA — Tactical Chemistry & 2.5D MOBA Arena  
**Thời điểm kiểm toán:** 21/10/2026 (Recovery & Completion Directive)  
**Tác giả:** Technical Director & Lead Game Systems Architect  

---

## 1. HIỆN TRẠNG TOÀN DIỆN CỦA DỰ ÁN

| Hạng Mục | Trạng Thái Trước Khảo Sát | Vấn Đề Gốc Rễ Phát Hiện | Hành Động Phục Hồi & Nâng Cấp | Bằng Chứng Nghiệm Thu |
| :--- | :--- | :--- | :--- | :--- |
| **1. Khởi động & Build** | Hoạt động (`dist/` build được) | Build tĩnh đạt chuẩn nhưng cần duy trì 0 TypeScript errors khi mở rộng tính năng | Tiếp tục giám sát type checking với `tsc` và Vite | `npm run build` thành công 100% |
| **2. Điều Khiển & Trải Nghiệm MOBA** | Khó chơi, thiếu trực quan đối với người mới | 1. Chưa có phím `A` (Attack-Move).<br>2. Chưa có vòng phạm vi đánh thường.<br>3. Thiếu bảng hướng dẫn phím tắt nhanh (HUD Quick-Guide Overlay).<br>4. Chưa có tùy chọn Quick Cast (Smart Cast) vs Indicator Cast.<br>5. Bấm chuột phải chưa có hiệu ứng click-marker tỏa sáng xác nhận vị trí di chuyển (Move Ping Decal). | 1. Thêm phím `A` (Attack-Move) hiển thị vòng tầm đánh và tự động tấn công kẻ địch gần nhất.<br>2. Thêm hiệu ứng Move Ping Decal (vòng tròn xanh lá tỏa sáng khi chuột phải).<br>3. Thêm bảng phím tắt trợ giúp nhanh (phím `H` hoặc icon Trợ Giúp).<br>4. Thêm chế độ Quick Cast vs Cast có Decal. | Kiểm thử thực tế input mouse/keyboard, kiểm tra thao tác người chơi hoàn thành trận |
| **3. Cảm Giác Đấu Trường MOBA (Combat Feel & Juice)** | Chưa giống LoL/AoV, va chạm thiếu uy lực | 1. Thanh máu phẳng, không có vạch chia 100 HP.<br>2. Chưa có vạch báo Last-hit kết liễu lính (ngưỡng vàng khi máu $\le$ sát thương đòn đánh).<br>3. Thiếu hiệu ứng chớp trắng mục tiêu khi trúng đòn (`flashTime`).<br>4. Thiếu tia lửa va chạm (Hit sparks).<br>5. Chưa có Banner thông báo hạ gục (First Blood, Double Kill, v.v.).<br>6. Camera cố định thiếu độ mượt và phản hồi rung chấn. | 1. Triển khai thanh máu phân khúc 100 HP chuẩn MOBA quốc tế cho Tướng, Lính, Trụ và Quái rừng.<br>2. Thêm Last-Hit Highlight Bar màu vàng kim cho lính máu thấp.<br>3. Thêm `flashTime` (0.08s) chớp sáng đơn vị khi nhận sát thương.<br>4. Tích hợp VFX Hit Spark cho từng đòn đánh và kỹ năng.<br>5. Thêm hệ thống Kill Banner & Phát thanh viên trận đấu (Announcer).<br>6. Camera lerp mượt mà bám theo tướng. | Chạy mô phỏng trận đấu 60 FPS, kiểm tra trực quan thanh máu có vạch chia và hiệu ứng hit |
| **4. Đồ Họa 2.5D & Môi Trường** | 2D Canvas nhìn còn phẳng | 1. Đường đi chưa có khối viền 2.5D và hoa văn năng lượng rực rỡ.<br>2. Sông nước chưa có sóng khúc xạ ánh sáng (water caustics dynamic).<br>3. Bụi cỏ là khối phẳng, thiếu chiều sâu cây lá.<br>4. Trụ và Nhà chính thiếu hiệu ứng quay 3D và hào quang tinh thể.<br>5. Decal định hướng kỹ năng chưa có vạch mũi tên chuyển động. | 1. Render đường đá có viền gờ 3D bevel và rãnh năng lượng nhấp nháy.<br>2. Thêm shader caustics đa tầng cho sông $\text{H}_2\text{O}$.<br>3. Thêm phân lớp lá bụi cỏ với bóng đổ tiếp xúc (ambient occlusion).<br>4. Nâng cấp Trụ với tinh thể thạch anh bay lơ lửng và tia phóng điện ma thuật.<br>5. Decal kỹ năng (Line, Circle, Cone) có vạch mũi tên chevron chuyển động hướng về chuột. | Báo cáo kiểm tra đồ họa `docs/ART_RECOVERY_PLAN.md` và kiểm tra runtime |
| **5. Bảng Tuần Hoàn & Codex** | Bảng 18 cột đã có dữ liệu cơ bản nhưng còn thiếu tiện ích tra cứu sâu | 1. Thiếu số La Mã cho các nhóm (IA, IIA, IIIB...).<br>2. Chưa hỗ trợ điều hướng bàn phím (Arrow keys).<br>3. Thiếu liên kết ngược trực tiếp từ ô nguyên tố tới các hợp chất chứa nguyên tố đó.<br>4. Chế độ so sánh 2 nguyên tố chưa có biểu đồ trực quan radar/bar tương phản. | 1. Thêm số La Mã cho toàn bộ 18 nhóm.<br>2. Tích hợp bộ lọc hợp chất tự động khi nhấn vào nguyên tố.<br>3. Bổ sung biểu đồ trực quan so sánh $\Delta\chi$, $I_1$, bán kính và ATK/DEF.<br>4. Hỗ trợ phím mũi tên duyệt nhanh 118 nguyên tố. | 37 tests kiểm tra dữ liệu + kiểm thử tương tác UI |
| **6. Đấu Thẻ Bài (Card Battle)** | Đã có core engine nhưng giao diện thẻ bài cần nâng cấp chất lượng cao | 1. Thẻ bài trên tay còn dạng phẳng, thiếu hiệu ứng 3D tilt và viền kim loại sáng.<br>2. Buồng phản ứng trung tâm chưa có animation hút thẻ bài vào phản ứng.<br>3. Hiệu ứng bẫy nhận thức cần hiển thị rõ cảnh báo sư phạm tức thì. | 1. Thêm hiệu ứng 3D perspective tilt cho thẻ bài khi rê chuột.<br>2. Tạo animation hút thẻ vào buồng phản ứng khi bấm Kích Hoạt Phản Ứng.<br>3. Hiển thị thông báo bẫy nhận thức với âm thanh cảnh báo và trừ 50% mana rõ ràng. | 36/36 tests đấu thẻ bài pass + kiểm tra UI trực quan |
| **7. Save/Load & Tiến Trình** | Cần kiểm chứng độ bền vững | Local storage cần kiểm tra không bị lỗi cấu trúc dữ liệu cũ | Tích hợp schema versioning và fallback an toàn | Thử nghiệm đóng mở trình duyệt và xóa cache |

---

## 2. NGUYÊN NHÂN GỐC RỄ (ROOT CAUSE ANALYSIS)

1. **Thiếu cảm giác MOBA (Lack of Combat Feel):** Trước đây hệ thống tập trung hoàn thiện logic mô phỏng (tính toán sát thương, va chạm, hồi sinh, sương mù chiến tranh), nhưng chưa đầu tư đủ các yếu tố "Game Juice" (thanh máu chia vạch 100 HP, Last-hit indicator, chớp trắng khi trúng đòn, hit sparks, và kill banner). Người chơi MOBA chuyên nghiệp dựa rất nhiều vào các tín hiệu thị giác này để ra quyết định chiến thuật.
2. **Khó khăn trong điều khiển (Control Clunkiness):** Người chơi quen với phím `A` (Attack-Move) và phản hồi vị trí click chuột phải. Khi thiếu vạch tầm đánh và thiếu dấu ping di chuyển dưới đất, người chơi cảm giác nhân vật không nghe lệnh.
3. **Độ sâu 2.5D chưa khai thác hết sức mạnh Canvas 2D:** Mặc dù sử dụng Canvas 2D, các kỹ thuật như offscreen multi-layer rendering, dynamic water caustics, volumetric foliage, và procedural energy conduits có thể tạo ra chiều sâu không gian tương đương các tựa game 2.5D thương mại.

---

## 3. LỘ TRÌNH KHẮC PHỤC THEO THỨ TỰ PHỤ THUỘC (EXECUTION PLAN)

- **Bước 1:** Nâng cấp Input & Điều khiển MOBA (`MobaArenaTab.tsx`): Thêm phím `A` (Attack-Move), vòng tầm đánh, Move Ping Decal chuột phải, Quick Cast toggle, và HUD Controls Guide Overlay.
- **Bước 2:** Nâng cấp Renderer 2.5D & Combat Feel (`mobaRenderer.ts`):
  - Thanh máu phân đoạn 100 HP + vạch Last-hit lính + thanh khiên overlay + huy hiệu cấp độ.
  - Hiệu ứng chớp trắng `flashTime` khi trúng đòn + Particle Hit Sparks.
  - Decal ngắm chiêu (Skillshot Line, AoE Circle, Cone) với mũi tên năng lượng chuyển động.
  - Nâng cấp đồ họa môi trường: Viền gờ đường đá 3D, sóng nước sông $\text{H}_2\text{O}$ caustics, bụi cỏ đa lớp có bóng đổ, Trụ và Nhà chính có tinh thể quay 3D.
- **Bước 3:** Nâng cấp Bảng tuần hoàn 18 cột & Codex (`PeriodicCodexTab.tsx`): Nhãn La Mã 18 nhóm, liên kết ngược hợp chất, biểu đồ so sánh nguyên tố.
- **Bước 4:** Nâng cấp Card Battle UI & Animation (`BattleArenaTab.tsx`): Thẻ bài 3D tilt, buồng phản ứng hút thẻ bài, cảnh báo bẫy nhận thức rực rỡ.
- **Bước 5:** Chạy toàn bộ test suite, cập nhật tài liệu kiểm định và đóng gói build.
