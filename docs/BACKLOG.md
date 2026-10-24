# ELEMENTA — DANH MỤC CÔNG VIỆC PHÁT TRIỂN (PRODUCT BACKLOG)
## Chế độ: Autonomous Long-Running Engineering
**Cập nhật lần cuối:** 2026-10-20  
**Mục tiêu:** Nâng cao chất lượng thực chất, liên tục phát triển, kiểm thử, sửa lỗi và hoàn thiện sản phẩm theo 5 trụ cột: Gameplay MOBA, Hệ thống Hóa học, SVG & Thiết kế, AI & Sư phạm, Chất lượng Phần mềm.

---

### TRỤ CỘT A: MOBA GAMEPLAY
- [x] **A1. Đấu trường thời gian thực 60 FPS:** Canvas 2D engine, fixed 60Hz delta time, vòng lặp mô phỏng. *(Hoàn thành)*
- [x] **A2. Bản đồ 3 đường Thung Lũng Liên Kết:** Kích thước 2400x2400, 12 trụ tháp, 2 căn cứ Elemental Core. *(Hoàn thành)*
- [x] **A3. Đợt lính & AI đối thủ cơ bản:** Minions ra mỗi 25s, bot đi đường, farm lính, combo, rút lui khi thấp máu. *(Hoàn thành)*
- [x] **A4. 8 Tướng nguyên tố nguyên bản:** Na, Fe, Cl, Cu, Al, O, H, Ba với 4 chiêu + nội tại. *(Hoàn thành)*
- [x] **A5. Hệ thống va chạm địa hình & Pathfinding quanh vật cản (Obstacle Collision):** Ngăn tướng và lính đi xuyên tường/đá/máy móc trong rừng, trượt mượt mà dọc theo vách tường, xử lý va chạm AABB sâu. *(Hoàn thành)*
- [x] **A6. Sương mù chiến tranh (Fog of War) & Tầm nhìn bụi rậm:** Ẩn tướng địch, lính địch và quái rừng ngoài tầm nhìn 650 đơn vị hoặc đang nấp trong bụi rậm; cập nhật tầm nhìn chính xác trên cả Canvas và Minimap; trụ tháp có True Sight 350 đơn vị. *(Hoàn thành)*
- [x] **A7. Cơ chế quái rừng Aggro & Boss Giám Hộ Xúc Tác:** Quái rừng phản công khi bị đánh, tự hồi phục khi leashing quá 420 đơn vị; Boss có chiêu quét xung lực và ban bùa lợi CATALYST_BUFF (+30% AP, giảm hồi chiêu) toàn đội; Thằn Lằn Axit gây DoT $Cl^-$; Người Đá Tinh Thể gây làm chậm và trao khiên $BaSO_4$. *(Hoàn thành)*
- [x] **A8. Tinh chỉnh cảm giác điều khiển (Combat Feedback & Screen Shake):** Hiệu ứng rung lắc camera khi nổ lớn (screen shake trauma), âm thanh procedural Web Audio synthesizer (tiếng nổ sub-bass rền tỏa nhiệt, chuông băng thu nhiệt, tiếng gầm quái rừng, tiếng lên cấp, tiếng biến về), vệt đạn projectile theo vận tốc và gợn sóng nước sông H₂O. Lệnh Tấn Công (Right-click Attack Command) tự động tiếp cận mục tiêu. *(Hoàn thành)*

---

### TRỤ CỘT B: TOÀN BỘ HỆ THỐNG HÓA HỌC
- [x] **B1. Cơ sở dữ liệu 118 nguyên tố + 28 nguyên tố cốt lõi IUPAC:** Đủ $\chi, I_1, Z$, cấu hình electron, trạng thái chuẩn. *(Hoàn thành)*
- [x] **B2. Phân biệt ElementCard và ChemicalSpecies:** Cấu tử cụ thể $Ag(s), Ag^+(aq), AgCl(s)\downarrow$. *(Hoàn thành)*
- [x] **B3. Stack Parser cân bằng phương trình & bảo toàn:** Cân bằng nguyên tử và điện tích ion. *(Hoàn thành)*
- [x] **B4. Cẩm Nang Toàn Tập Phản Ứng Hóa Học (Phần I - VI):** Tra cứu phương trình vô cơ & hữu cơ trọng tâm. *(Hoàn thành)*
- [x] **B5. Bộ máy Tính Toán Hóa Học & Cân Bằng Hóa Lượng (Chemical Calculator & Stoichiometry Engine):**
  - Tính số mol $n = m/M$, thể tích khí theo chuẩn GDPT 2018 ($V = n \times 24.79\text{ L}$ ở 25°C, 1 bar) và chuẩn cũ ($22.4\text{ L}$).
  - Nồng độ mol $C_M$, nồng độ phần trăm $C\%$, độ tan $S$, bài toán pha loãng dung dịch.
  - Giải bài toán phản ứng có chất giới hạn và chất dư kèm lời giải từng bước có kiểm tra thứ nguyên đơn vị. *(Hoàn thành)*
- [x] **B6. Công cụ Cân Bằng Oxi Hóa - Khử & Phản Ứng Nửa Cặp (Redox Half-Reactions Engine):**
  - Tự động gán số oxi hóa dựa trên quy tắc hóa học chuẩn.
  - Phân tích chất khử (chất nhường e), chất oxi hóa (chất thu e).
  - Viết và hiển thị 2 bán phản ứng oxi hóa và khử rõ ràng cho học sinh lớp 10. *(Hoàn thành)*
- [x] **B7. Mở rộng Thư viện Động học & Nhiệt Hóa học (Chemical Kinetics & Thermochemistry):**
  - Tính biến thiên enthalpy chuẩn $\Delta_r H^0_{298} = \sum \nu_p \Delta_f H^0_{298}(\text{sp}) - \sum \nu_r \Delta_f H^0_{298}(\text{cđg})$ từ cơ sở dữ liệu 19 chất.
  - Phân loại phản ứng tỏa nhiệt (Exothermic, buff tốc độ di chuyển) vs thu nhiệt (Endothermic, hiệu ứng làm chậm).
  - Quy tắc kinh nghiệm Van 't Hoff cho tốc độ phản ứng theo nhiệt độ ($v_{T_2} / v_{T_1} = \gamma^{\frac{\Delta T}{10}}$) và gia tốc xúc tác Arrhenius. *(Hoàn thành)*
- [x] **B8. Động cơ Cấu trúc Lượng tử Orbital & Quy tắc Hund (Quantum Orbital Engine):**
  - Cấu hình electron theo nguyên lý vững bền Aufbau/Klechkowski, xử lý ngoại lệ cấu hình $d^5$ ($Cr$) và $d^{10}$ ($Cu, Ag, Au$).
  - Thuật toán điền ô lượng tử orbital ($\uparrow\downarrow$) tuân thủ Quy tắc Hund và Nguyên lý loại trừ Pauli.
  - Xác định số e hóa trị, số e độc thân, phân loại kim loại/phi kim/khí hiếm và dự đoán xu hướng cho 118 nguyên tố. *(Hoàn thành)*
- [x] **B9. Động cơ Phân Loại Liên Kết Hóa Học & Hiệu Độ Âm Điện Pauling (BondingEngine):**
  - Phân loại liên kết Ion ($\Delta\chi \ge 1.7$), Cộng hóa trị có cực ($0.4 \le \Delta\chi < 1.7$), Cộng hóa trị không cực ($\Delta\chi < 0.4$) cho 10 chất kinh điển ($NaCl, MgO, H_2, O_2, N_2, HCl, H_2O, CO_2, NH_3, CH_4$).
  - Xác định cặp electron liên kết, cặp electron tự do, bậc liên kết (đơn, đôi, ba) và dạng hình học không gian phân tử. *(Hoàn thành)*

---

### TRỤ CỘT C: SVG VÀ THIẾT KẾ
- [x] **C1. Biểu đồ Bohr Orbital SVG động:** Lớp vỏ electron quay quanh hạt nhân. *(Hoàn thành)*
- [x] **C2. Buồng phản ứng Sci-Fi SVG trung tâm:** Ống nghiệm và hiệu ứng plasma năng lượng. *(Hoàn thành)*
- [x] **C3. Sơ đồ quá trình ăn mòn & kết tủa SVG:** Minh họa cấu trúc lớp gỉ ngậm nước và lắng cặn ion. *(Hoàn thành)*
- [x] **C4. Bộ SVG Avatar & Vũ Khí Đặc Trưng cho 8 Tướng:** Hiệu ứng quỹ đạo nguyên tố đặc trưng (Tia lửa Na, 4 kiếm từ tính Fe, khói halogen Cl, vòng dẫn điện Cu, khiên oxit lục giác Al, cầu lửa tam giác O, luồng phản lực H, vòng tinh thể Ba). *(Hoàn thành)*
- [x] **C5. Cải tiến Đồ Họa Bản Đồ MOBA:** Ranh giới làn đường phát sáng, gợn sóng nước sông ion, vệt đạn projectile định hướng theo vector vận tốc. *(Hoàn thành)*
- [x] **C6. Sơ đồ Ô Lượng Tử Orbital SVG/HTML (OrbitalBoxDiagram):** Trực quan hóa từng orbital $s, p, d, f$ với mũi tên spin $\uparrow\downarrow$, viền phát sáng lớp hóa trị, tích hợp trong Periodic Codex. *(Hoàn thành)*
- [x] **C7. Phòng Thí Nghiệm Liên Kết Hóa Học SVG Động (BondingVisualizerModal):** Hoạt ảnh chuyển dịch electron ion, xen phủ đám mây orbital cộng hóa trị, thang đo gauge độ âm điện Pauling thời gian thực và bùa lợi chiến thuật MOBA. *(Hoàn thành)*

---

### TRỤ CỘT D: AI, HỌC TẬP VÀ LƯU TRỮ
- [x] **D1. 3 Lớp AI Guardrails:** Sandbox phân tách, Local IUPAC RAG, JSON hard stat caps. *(Hoàn thành)*
- [x] **D2. Thuật toán Ôn tập Ngắt quãng thích ứng (CA-SRS):** Chu kỳ 1–3–7–14 ngày phân tầng theo 3 cấp độ lỗi nhận thức. *(Hoàn thành)*
- [x] **D3. Bảng điều khiển giáo viên (Teacher Dashboard):** Bản đồ nhiệt hiểu lầm, so sánh Pre/Post test, xuất CSV & JSON. *(Hoàn thành)*
- [x] **D4. Tích hợp Máy Tính Hóa Học vào giao diện học tập:** Nút tra cứu nhanh trên Navbar và tích hợp liên thông với hệ thống phản ứng. *(Hoàn thành)*
- [x] **D5. Progressive Web App (PWA) Manifest & Service Worker Cache:** Đóng gói PWA offline hoàn chỉnh với dynamic runtime cache đảm bảo hoạt động 100% offline không cần internet. *(Hoàn thành)*
- [x] **D6. Chế độ Hướng dẫn Tân thủ & Buồng Thử nghiệm (Tutorial Lab):** 5 bước hướng dẫn (Controls, MOBA Rules, Fog of War, Reactions, Thermochemistry & Catalyst) và 6 phản ứng thực nghiệm. *(Hoàn thành)*

---

### TRỤ CỘT E: CHẤT LƯỢNG PHẦN MỀM & TESTING
- [x] **E1. Scientific & IUPAC Test Suite (`test-engine.mjs`):** 41/41 test pass. *(Hoàn thành)*
- [x] **E2. MOBA Simulation & Reaction Combat Test Suite (`test-moba.mjs`):** 114/114 test pass. *(Hoàn thành)*
- [x] **E3. Chemical Calculator & Stoichiometry Test Suite (`test-chemistry-calculator.mjs`):** 62/62 test pass (bao gồm cả Nhiệt hóa học, Động cơ Ô lượng tử Orbital và Động cơ Liên kết Hóa học). *(Hoàn thành)*
- [x] **E4. Production Build Validation:** 1622 modules compiled cleanly với 0 lỗi TypeScript, dist bundle tối ưu. *(Hoàn thành)*
