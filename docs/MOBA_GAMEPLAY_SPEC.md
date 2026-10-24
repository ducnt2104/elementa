# ELEMENTA — TÀI LIỆU ĐẶC TẢ CHIẾN THUẬT MOBA (MOBA GAMEPLAY SPECIFICATION)
## Bản nâng cấp: MOBA Arena Edition / Chemistry-First / Real-Time 2D Engine

---

### 1. TỔNG QUAN HỆ THỐNG MOBA ARENA
**ELEMENTA — Trận Chiến Nguyên Tố** là một trò chơi chiến thuật thời gian thực (MOBA 2D) kết hợp hệ sinh thái học tập hóa học toàn diện, được thiết kế theo chuẩn GDPT 2018 (KHTN 7–9 và Hóa học 10) cùng chuẩn danh pháp và dữ liệu thực nghiệm IUPAC / CIAAW.

- **Thể loại:** MOBA Chiến thuật thời gian thực (Real-time Tactical MOBA Arena).
- **Góc nhìn:** Top-Down 2D Isometric Perspective với camera lerp mượt mà theo nhân vật.
- **Tốc độ khung hình:** 60 FPS cố định (Fixed Delta Time 60 Hz physics step).
- **Hạ tầng:** 100% Local-First Web Game (Offline PWA), không phụ thuộc server mạng, không lag, zero pay-to-win.

---

### 2. BẢN ĐỒ CHIẾN THUẬT: THUNG LŨNG LIÊN KẾT (THE PERIODIC RIFT)
Bản đồ chuẩn kích thước **2400 × 2400 đơn vị toạ độ ảo**:
1. **Hai Căn Cứ Đối Kháng (Elemental Cores):**
   - **Blue Core (Đội Xanh - Căn cứ người chơi):** Toạ độ `(260, 2140)`, Máu 3500 HP, Khiên năng lượng 1000 Shield.
   - **Red Core (Đội Đỏ - Căn cứ AI đối thủ):** Toạ độ `(2140, 260)`, Máu 3500 HP, Khiên năng lượng 1000 Shield.
2. **Ba Tuyến Đường Chiến Đấu (3 Lanes):**
   - **Đường Trên (Top Lane):** Tuyến đường dài phòng thủ biên giới, bảo vệ mỏ bauxit và cánh rừng phía Bắc.
   - **Đường Giữa (Mid Lane):** Đường chéo ngắn nhất cắt thẳng qua Sông Ion, diễn ra các pha giao tranh tổng ác liệt nhất.
   - **Đường Dưới (Bot Lane):** Tuyến đường rộng ven sông phía Nam, thích hợp cho cặp đôi Xạ thủ Đồng (Cu) và Đỡ đòn Bari (Ba).
3. **Sông Ion H₂O (The Ionic Solvent River):**
   - Dải sông nước chảy chéo qua trung tâm bản đồ `(1200, 1200)` với bề rộng 220 đơn vị.
   - **Tương tác hóa học đặc biệt:** Khi đứng trong sông hoặc dùng kỹ năng trên sông, môi trường nước H₂O tự động kích hoạt phản ứng bùng nổ kiềm của Natri (`2Na + 2H₂O → 2NaOH + H₂↑`), tăng 25% tốc độ chạy của Hiđro (`H₂`), hoặc tạo kết tủa đồng.
4. **Hệ Thống Trụ Tháp Nguyên Tố (12 Turrets):**
   - 6 Trụ Đội Xanh và 6 Trụ Đội Đỏ chia đều cho 3 đường (Trụ Ngoài Outer và Trụ Trong Inner).
   - Máu trụ: 1800 HP (Trụ Ngoài), 2100 HP (Trụ Trong), Giáp 40-50.
   - **Cơ chế nhắm mục tiêu (Target Prioritization):** Ưu tiên bắn lính trước; nếu tướng địch tấn công tướng đồng minh trong tầm bắn của trụ (320 đơn vị), trụ ngay lập tức khóa tia laser và bắn phát đạn năng lượng tăng tiến sát thương (Turret Dive Punishment).
5. **Khu Vực Rừng & Quái Trung Lập (Jungle Camps):**
   - **Giám Hộ Xúc Tác Bạch Kim Pt (Catalyst Guardian):** Boss trung lập ở hang phía Bắc `(880, 880)`. Máu 4200 HP. Khi bị hạ gục, ban cho toàn đội buff "Xúc Tác Phản Ứng Pt": Giảm 20% hồi chiêu, tăng 25% tốc đánh và tăng sát thương phản ứng hóa học trong 60 giây.
   - **Thằn Lằn Axit Clo (Acid Lizard):** Quái rừng `(650, 1250)`, thưởng 90 vàng và hồi năng lượng.
   - **Người Đá Tinh Thể Bari BaSO₄ (Crystal Golem):** Quái rừng `(1750, 1150)`, thưởng 100 vàng và tăng giáp.

---

### 3. ĐỢT LÍNH NGUYÊN TỐ (MINION WAVES)
- Lính xuất hiện theo đợt mỗi **25 giây** từ hai nhà chính trên cả 3 đường:
  - **Lính Cận Chiến (Melee Minions):** 480 HP, 22 AD, giáp cao, đi tiên phong chắn đòn.
  - **Lính Pháp Sư Bắn Xa (Caster Minions):** 310 HP, 32 AD, bắn cầu ion tầm xa 280 đơn vị.
  - **Xe Đại Pháo (Siege Cannon Minions):** 850 HP, 55 AD, xuất hiện mỗi 3 đợt lính, chuyên công phá công trình.
- Tiêu diệt lính (Last-Hit) thưởng từ **16 đến 50 Vàng** và điểm kinh nghiệm tăng cấp.

---

### 4. 8 TƯỚNG NGUYÊN TỐ NGUYÊN BẢN (ORIGINAL CHAMPIONS ROSTER)
| Tên Tướng | Ký Hiệu | Nhóm Tuần Hoàn | Vai Trò MOBA | Đặc Trưng Hóa Học & Bộ Chiêu Thức |
| :--- | :---: | :---: | :---: | :--- |
| **Natri — Hiệp Sĩ Kiềm Tác** | Na | Nhóm IA | Tank / Fighter | Bùng nổ kiềm tỏa nhiệt ΔH = -368 kJ/mol khi gặp nước; Q: Thủy Kích; W: Xút NaOH; E: Lao Đột Kích; R: Đại Bùng Nổ Enthalpy. |
| **Sắt — Giám Ngục Kim Loại** | Fe | Nhóm VIIIB | Fighter / Juggernaut | Đa hóa trị +2/+3; hút nam châm từ tính Fe₃O₄; Q: Thiết Trảo (chém chí mạng với Clo); W: Khiên Gỉ Sét; E: Kéo Từ Tính; R: Bão Nhiệt Nhôm 2500°C. |
| **Clo — Thích Khách Halogen** | Cl | Nhóm VIIA | Mage / Assassin | Ái lực electron cực lớn; Q: Mây Khí Độc Cl₂; W: Súng Axit HCl ăn mòn giáp; E: Lướt Nước Gia-ven NaClO thanh tẩy; R: Bão Oxi Hóa Halogen. |
| **Đồng — Xạ Thủ Dẫn Điện** | Cu | Nhóm IB | Marksman (ADC) | Dẫn điện lập phương tâm diện (fcc); đòn đánh nảy tia lửa; Q: Tiễn Đồng Đỏ tầm xa; W: Bẫy Cu(OH)₂ trói chân; E: Lướt Bật Lùi; R: Hỏa Tiễn Lửa Xanh Lam Cu²⁺. |
| **Nhôm — Tiên Phong Lưỡng Tính** | Al | Nhóm IIIA | Tank / Engager | Màng oxit thụ động Al₂O₃ bền vững; chuyển đổi dạng acid/base lưỡng tính; Q: Quyền Năng Lưỡng Tính; W: Tường Bauxit; E: Đột Kích Khử Oxi; R: Dung Nham Nhiệt Nhôm. |
| **Oxi — Pháp Sư Thiêu Đốt** | O | Nhóm VIA | Artillery Mage | Độ âm điện 3.44 duy trì sự cháy; Q: Hỏa Cầu O₂ kích nổ thiêu đốt; W: Vòng Ozon O₃ câm lặng; E: Sóng Đẩy Nhiệt; R: Bão Lửa Tỏa Nhiệt Siêu Cấp. |
| **Hiđro — Trinh Sát Khí Nhẹ** | H | Nhóm IA | Speed Support / Marksman | Khối lượng nhẹ nhất M = 1.008 g/mol; tốc độ chạy nhanh nhất; Q: Đạn Phân Tử H₂; W: Sương Proton H⁺ hồi máu; E: Phản Lực Vượt Địa Hình; R: Vụ Nổ Nước 2:1. |
| **Bari — Pháo Đài Kết Tủa** | Ba | Nhóm IIA | Heavy Vanguard Tank | Kết tủa BaSO₄ tích số tan cực nhỏ Ksp = 1.1×10⁻¹⁰ bất hoại trong axit; Q: Bari Nện Đất; W: Vách Tường BaSO₄; E: Pháo Hoa Lục Quang choáng; R: Pháo Đài Kết Tủa Tuyệt Đối. |

---

### 5. KINH TẾ VẬT PHẨM HÓA HỌC (IN-GAME CHEMICAL ITEM SHOP)
Người chơi tích lũy vàng từ lính và điểm hạ gục để mua sắm tối đa 6 trang bị chế tác từ vật liệu hóa học đích thực:
- **Giày Bauxit Siêu Bền (850g):** Quặng Al₂O₃·2H₂O tăng tốc độ và kháng làm chậm.
- **Hài Khí Hiếm Tinh Khiết (950g):** Khí Heli/Neon siêu nhẹ tăng tốc chạy trên sông.
- **Bình Dung Dịch Điện Phân (1400g):** Cung cấp ion Na⁺ và Cl⁻ hồi phục năng lượng liên tục.
- **Màng Oxit Thụ Động Al₂O₃ (1900g):** Chống chịu sát thương vật lý và xạ thủ.
- **Găng Tay Kiềm Hóa Na⁺ (2100g):** Đòn đánh thiêu đốt xà phòng hóa làm mềm giáp đối phương.
- **Lõi Xúc Tác Bạch Kim Pt (2400g):** Hạ năng lượng hoạt hóa Ea, giảm 20% thời gian hồi chiêu.
- **Giáp Gỉ Sét Từ Tính Fe₃O₄ (2400g):** Phản lại sát thương ăn mòn cho kẻ địch tấn công.
- **Cung Tinh Thể Đồng Đỏ (2500g):** Đòn đánh nảy điện tích sang nhiều mục tiêu.
- **Khiên Kết Tủa Bari BaSO₄ (2700g):** Tạo khiên kết tủa tự động khi máu xuống thấp.
- **Thanh Kiếm Nhiệt Nhôm Siêu Nhiệt (2800g):** Bỏ qua giáp và gây sát thương chuẩn lên công trình.
- **Vương Trượng Ozon O₃ (3000g):** Gây sát thương phép theo % máu tối đa.

---

### 6. CƠ CHẾ ĐIỀU KHIỂN & GIAO DIỆN NGƯỜI CHƠI
- **Di chuyển:** Chuột Phải hoặc phím WASD (có pathfinding quanh tường và vật cản).
- **Chọn mục tiêu:** Click Chuột Trái vào Tướng, Lính, Trụ hoặc Quái rừng.
- **Kỹ năng:** Q, W, E, R (hiển thị vòng decal nhắm mục tiêu định hướng hoặc vùng tròn AoE).
- **Phép bổ trợ:** D (Tốc Biến - Flash dịch chuyển tức thời 250 đơn vị); F (Hồi Phục - Heal hồi 25% máu và tăng tốc).
- **Biến về căn cứ:** B (Truyền tải 4 giây để hồi đầy máu và năng lượng tại bể hồi sinh).
- **Camera:** Space đưa camera về trung tâm tướng; cuộn chuột để phóng to/thu nhỏ.
- **Minimap:** Góc dưới bên phải hiển thị toàn diện thế trận thời gian thực; có thể click minimap để di chuyển nhanh.
- **Cửa hàng:** Nhấn phím P hoặc click nút Vàng để mở kho trang bị.
- **Bảng điểm:** Nhấn phím Tab để xem KDA, chỉ số lính và trang bị của 10 vị tướng.
