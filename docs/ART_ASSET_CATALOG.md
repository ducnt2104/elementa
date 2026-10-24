# ELEMENTA — DANH MỤC TÀI SẢN MỸ THUẬT & ÂM THANH (ART ASSET CATALOG)
## Bản nâng cấp: Original SVG Art / Procedural Audio / Scientific Visualization

---

### 1. NGUYÊN TẮC THIẾT KẾ & BẢN QUYỀN
- **Độc quyền & Nguyên bản (Original Identity):** Toàn bộ đồ họa, biểu tượng, logo, bản đồ, tướng, công trình và hiệu ứng chiến đấu của ELEMENTA đều được vẽ bằng mã nguồn Vector SVG và Canvas 2D nguyên bản.
- **Không sao chép thương mại:** Không sử dụng hình ảnh, logo, tên chiêu thức hay âm thanh độc quyền từ Liên Quân Mobile, Liên Minh Huyền Thoại (LoL) hay bất kỳ tựa game thương mại nào.
- **Phong cách thị giác (Art Direction):** **SCI-FI CHEMICAL TACTICAL ARENA** — Sự hòa quyện giữa không gian phòng thí nghiệm tương lai, các mạng tinh thể kim loại, đường dẫn electron huỳnh quang và đấu trường chiến thuật không gian sâu.

---

### 2. DANH MỤC BIỂU TƯỢNG VÀ ĐỒ HỌA VECTOR SVG NGUYÊN BẢN
1. **Hệ Thống Nhận Diện Thương Hiệu (Brand Identity):**
   - `Logo ELEMENTA`: Chữ "E" cách điệu trên nền gradient đa sắc Ion Cyan và San hô phản ứng (Coral Reaction).
   - `Favicon & App Icon`: Tinh thể lục giác biểu trưng cho cấu trúc phân tử bền vững.
2. **Sơ Đồ Khoa Học Sư Phạm (Scientific Visualizations):**
   - `AtomDiagram.tsx`: Bộ hiển thị hạt nhân (Proton, Neutron) và các lớp vỏ electron orbital động (K, L, M, N) theo mô hình Bohr - Rutherford có điều chỉnh sư phạm GDPT 2018.
   - `ReactionChamberSVG.tsx`: Buồng phản ứng hóa học trung tâm với các ống nghiệm thủy tinh, lõi plasma và hiệu ứng phát sáng enthalpy khi phản ứng thành công.
   - `PrecipitationDiagram.tsx`: Mô phỏng quá trình tạo mầm vi tinh thể và lắng đọng kết tủa (BaSO₄, AgCl, Cu(OH)₂).
   - `CorrosionDiagram.tsx`: Mô phỏng các giai đoạn ăn mòn điện hóa và hình thành lớp gỉ sắt 3 lớp (Fe → Fe(OH)₂ → Fe₂O₃·xH₂O).
   - `PeriodicTrendChart.tsx`: Đồ thị xu hướng tuần hoàn tương tác (Độ âm điện Pauling χ, Năng lượng ion hóa I₁, Bán kính nguyên tử pm).
3. **Đồ Họa Chiến Trường MOBA (Battlefield Canvas Elements):**
   - `Địa hình Thung Lũng Liên Kết`: Nền đá phiến obsidian, dải sông ion H₂O màu ngọc bích phát sáng, thảm cỏ ẩn nấp màu xanh lục bảo (Emerald Brush).
   - `Trụ Tháp Nguyên Tố (Turrets)`: Khối đế hợp kim đa giác, tháp tinh thể xoay tròn và tia laser năng lượng dẫn đường.
   - `Căn Cứ Nhà Chính (Elemental Cores)`: Tinh thể năng lượng nguyên tố khổng lồ lơ lửng giữa các vòng quỹ đạo đồng tâm phát xung lực bảo vệ.
   - `Hình Chiếu Tướng (Champion Avatars)`: Quả cầu năng lượng nguyên tử mang ký hiệu nguyên tố và hào quang màu sắc đặc trưng của từng nguyên tố (Na: vàng hổ phách; Fe: xám sắt đá phiến; Cl: vàng lục chanh; Cu: đồng đỏ cam; Al: bạc sáng; O: đỏ lửa; H: xanh da trời; Ba: xanh lục ngọc).

---

### 3. ĐẶC TẢ HỆ THỐNG ÂM THANH NGUYÊN BẢN (PROCEDURAL SOUND ENGINE)
Tất cả hiệu ứng âm thanh trong ELEMENTA được **tổng hợp thuật toán thời gian thực (Real-time Procedural Audio Synthesis)** bằng Web Audio API bản địa, không dùng file MP3 bên ngoài, đảm bảo 0 latency và hoạt động 100% offline:
1. `playUiClick()`: Sóng sine tần số cao 600 Hz → 1200 Hz tạo tiếng click giao diện trong trẻo.
2. `playCardSelect()`: Sóng triangle tần số 440 Hz → 880 Hz phản hồi chọn thẻ bài.
3. `playSpellCast()`: Sóng sine quét tần số từ 400 Hz lên 950 Hz mô phỏng phóng xung lực nguyên tố.
4. `playTurretShot()`: Sóng sawtooth xung lực 800 Hz giảm nhanh về 200 Hz tạo tiếng bắn laser năng lượng.
5. `playExplosion()`: Kết hợp xung âm siêu trầm 150 Hz → 30 Hz (sawtooth) cùng bộ lọc tiếng ồn trắng (White Noise Lowpass) tạo tiếng nổ bùng nổ nhiệt enthalpy rền vang.
6. `playReactionSuccess()`: Chuỗi hợp âm điều hòa 523.25 Hz (C5) → 1046.50 Hz (C6) báo hiệu phản ứng hóa học thành công.
7. `playErrorFizzle()`: Sóng vuông 180 Hz giảm về 110 Hz mô phỏng phản ứng xịt, bế tắc hoặc chạm bẫy nhận thức.
8. `playVictory()`: Hợp âm rực rỡ 4 nốt (C - E - G - C) tôn vinh chiến thắng vinh quang.
