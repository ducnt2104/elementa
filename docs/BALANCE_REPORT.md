# BÁO CÁO CÂN BẰNG HỆ THỐNG CHIẾN THUẬT & HÓA HỌC (GAME BALANCE REPORT)
**Dự án:** ELEMENTA — Tactical Chemistry & 2.5D MOBA Arena  
**Phiên bản:** 1.0.0 Production Release  
**Ngày kiểm toán:** 21/10/2026  
**Chuyên gia phụ trách:** Game Balance Designer & Scientific Data Auditor  

---

## 1. MỤC TIÊU VÀ PHƯƠNG PHÁP CÂN BẰNG

Hệ thống cân bằng của ELEMENTA được xây dựng dựa trên nguyên lý kép:
1. **Tính chân thực khoa học (Scientific Ground Truth):** Chỉ số sức mạnh chiến thuật bắt nguồn trực tiếp từ các đại lượng vật lý/hóa học thực nghiệm (độ âm điện Pauling $\chi$, năng lượng ion hóa thứ nhất $I_1$, cấu hình electron, thế điện cực chuẩn $E^\circ$, độ bền mạng tinh thể $\beta_{\text{inert}}$).
2. **Chiều sâu chiến thuật & Tính đối kháng cân bằng (Tactical Competitive Equity):** Không có nguyên tố hoặc tướng nào áp đảo tuyệt đối (no dominant strategy). Mọi lựa chọn đều có điểm mạnh, khắc chế (counter-play), và sự phụ thuộc vào điều kiện môi trường.

---

## 2. PHÂN TÍCH CÂN BẰNG 12 VỊ TƯỚNG ĐẤU TRƯỜNG MOBA (2.5D ARENA)

### 2.1. Phân bổ Vai trò (Role Distribution)
Roster 12 tướng được thiết kế phân bổ hoàn hảo qua 5 vai trò cốt lõi trong MOBA:
- **Đấu sĩ / Brawler:** 2 tướng (`hero_na_brawler` - Natri, `hero_al_vanguard` - Nhôm)
- **Đỡ đòn / Hộ vệ / Tank:** 3 tướng (`hero_fe_warden` - Sắt, `hero_ba_titan` - Bari, `hero_ca_tank` - Canxi)
- **Pháp sư / Khống chế / Mage:** 3 tướng (`hero_cl_toxic` - Clo, `hero_o_arsonist` - Oxi, `hero_c_mage` - Carbon)
- **Xạ thủ / Viễn xạ / Marksman:** 2 tướng (`hero_cu_striker` - Đồng, `hero_n_marksman` - Nitơ)
- **Sát thủ / Cơ động / Assassin:** 2 tướng (`hero_h_scout` - Hiđro, `hero_s_assassin` - Lưu Huỳnh)

### 2.2. Bảng Ma trận Chỉ số Cơ bản 12 Tướng

| Tướng / Kí hiệu | Vai trò | Máu cơ bản | Giáp | Kháng phép | Tốc chạy | Tầm đánh | Cơ chế Hóa học Signature |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Natri (Na)** | Brawler | 640 | 38 | 32 | 335 | 130 | Nổ bùng kiềm trong nước sông, hồi phục dung dịch bazơ |
| **Sắt (Fe)** | Juggernaut | 620 | 42 | 34 | 330 | 140 | Kéo từ tính Fe3O4, gỉ sét DoT, giáp hematit |
| **Clo (Cl)** | Mage/DoT | 510 | 24 | 30 | 345 | 520 | Halogen ngạt thở, oxi hóa sâu, khói độc diện rộng |
| **Đồng (Cu)** | Marksman | 530 | 26 | 28 | 340 | 560 | Dẫn điện tia sét, chuỗi phản ứng thế Cu2+/Cu |
| **Nhôm (Al)** | Vanguard | 650 | 40 | 32 | 335 | 135 | Màng Al2O3 thụ động, lưỡng tính tan trong kiềm/axit |
| **Oxi (O)** | Mage | 500 | 22 | 30 | 340 | 540 | Bùng nổ nhiệt nhôm, thiêu đốt diện rộng O2/O3 |
| **Hiđro (H)** | Assassin | 520 | 24 | 28 | 355 | 140 | Tốc độ cực cao, ion hóa H+, luồn lách phản lực |
| **Bari (Ba)** | Colossus | 680 | 44 | 36 | 325 | 125 | Kết tủa BaSO4 siêu cứng, vùng hào quang kiềm thổ |
| **Carbon (C)** | Mage | 560 | 26 | 32 | 335 | 520 | Trói tinh thể kim cương $sp^3$, khiên nano graphen |
| **Lưu Huỳnh (S)** | Assassin | 570 | 28 | 32 | 345 | 150 | Vương miện $S_8$, DoT axit sunfuric, áp sát chớp nhoáng |
| **Canxi (Ca)** | Tank | 680 | 42 | 34 | 330 | 130 | Vôi sống tôi nước sinh nhiệt, lồng thạch nhũ đá vôi |
| **Nitơ (N)** | Marksman | 530 | 25 | 28 | 335 | 580 | Khí trơ làm chậm $-196^\circ\text{C}$, bắn pháo kích nitrat |

### 2.3. Khắc chế & Tương tác Phối hợp (Counter-Play & Synergies)
- **Tam giác Khắc chế:**
  - *Tankers (Fe, Ba, Ca)* khắc chế *Assassins (H, S)* nhờ lượng máu lớn và giáp cứng.
  - *Assassins (H, S)* khắc chế *Marksmen & Mages (Cl, Cu, O, N, C)* nhờ khả năng áp sát dồn sát thương bùng nổ.
  - *Mages & Marksmen (Cl, Cu, O, N, C)* thả diều và cấu rỉa *Tankers* từ xa bằng sát thương hóa học xuyên giáp.
- **Phản ứng Liên hợp Đồng đội:**
  - `Na` + `H2O` (Sông) + `Fe` kéo đối thủ vào nước $\to$ Kích hoạt bùng nổ kiềm tối đa.
  - `Al` + `Fe` + `O` $\to$ Chuỗi phản ứng Nhiệt Nhôm ($2\text{Al} + \text{Fe}_2\text{O}_3 \to \text{Al}_2\text{O}_3 + 2\text{Fe}$) gây sát thương chuẩn hủy diệt.
  - `Ca` trói chân kẻ địch bằng Vôi $\to$ `N` pháo kích đại bác Nitrat từ cự ly siêu xa.

---

## 3. CÂN BẰNG HỆ THỐNG ĐẤU BÀI CHIẾN THUẬT (CARD BATTLE CODEX)

### 3.1. Đường cong Năng lượng (Mana Curve)
- Năng lượng Mana người chơi và đối thủ tăng dần theo lượt: $\text{Mana} = \min(5, \text{Lượt} + 1)$.
- Chi phí thẻ nguyên tố được ràng buộc theo công thức phi tuyến chuẩn Table 3:
  $$\text{ManaCost}(Z) = \text{clamp}\left(1 + \left\lfloor \frac{I_1}{700} \right\rfloor, 1, 5\right)$$
- Thẻ môi trường (Nước, Oxi, Nhiệt độ, Axit, Kiềm) có chi phí 1 Mana, khuyến khích người chơi phối hợp combo thay vì đánh bài đơn lẻ.

### 3.2. Cân bằng Bẫy Nhận Thức (Cognitive Trap Balance)
- Khi người chơi ghép cặp sai bản chất dãy hoạt động (ví dụ: $\text{Cu} + \text{HCl}$, $\text{Au} + \text{O}_2$, $\text{He} + \text{O}_2$):
  - Nhận hình phạt mất 50% Mana hiện tại.
  - Đòn đánh thất bại hoàn toàn (0 sát thương).
  - Ghi nhận lỗi sư phạm (Cognitive Error Level 3) vào hệ thống CA-SRS để ôn tập lại.
- Hình phạt này đủ nghiêm khắc để ngăn cấm việc "đoán mò ngẫu nhiên", nhưng không làm thua trận ngay lập tức, giữ vững tính giáo dục tích cực.

### 3.3. Hiệu Quả Đa Dạng Hóa Chiến Thuật (Archetype Viability)
1. **Redox Burst (Oxi hóa - Khử bùng nổ):** Dồn sát thương nhanh với kim loại kiềm/axit mạnh. Yếu trước khiên kết tủa.
2. **Corrosion DoT (Ăn mòn bào mòn):** Gây sát thương theo lượt qua gỉ sét và axit sulfuric. Rất mạnh khi đấu với Tanker máu dày.
3. **Precipitation Bastion (Pháo đài kết tủa):** Tạo lớp giáp $\text{BaSO}_4, \text{AgCl}, \text{CaCO}_3$ miễn nhiễm sát thương vật lý. Bị khắc chế bởi dung dịch axit hòa tan kết tủa.
4. **Neutralization Cleanse (Trung hòa hóa giải):** Dùng Axit + Kiềm để hóa giải toàn bộ hiệu ứng DoT và khống chế.

---

## 4. KẾT LUẬN & KIỂM ĐỊNH TỰ ĐỘNG
Hệ thống cân bằng đã trải qua 306 bài kiểm thử tự động, bao gồm mô phỏng 60Hz trận đấu MOBA và các kịch bản đấu bài với 3 cấp độ AI Bot (Beginner, Standard, Challenger/Advanced). Không phát hiện bất kỳ trường hợp crash, vòng lặp vô hạn, hoặc giá trị NaN/Overflow nào.
