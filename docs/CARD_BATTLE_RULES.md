# ELEMENTA — LUẬT ĐẤU BÀI CHIẾN THUẬT NGUYÊN TỐ & PHẢN ỨNG HÓA HỌC (CARD BATTLE RULES)
**Tài liệu:** Đặc Tả Luật Chơi Chính Thức  
**Cơ chế:** Phản Ứng Hóa Học Tất Định (Deterministic Chemical State Machine - DCSM)  
**Tiêu chuẩn:** GDPT 2018 • Bản Sắc Hóa Học Độc Lập  

---

## 1. TỔNG QUAN & BẢN SẮC TRẬN ĐẤU

ELEMENTA Card Battle là một trò chơi đấu thẻ bài chiến thuật theo lượt lấy cảm hứng từ chiều sâu của dòng game thẻ bài kinh điển (quản lý tài nguyên, combo, chuỗi phản ứng, lật kèo) nhưng sở hữu hệ thống luật độc bản bắt nguồn từ khoa học hóa học:
- Các lá bài đại diện cho **Nguyên tố hóa học**, **Hợp chất**, **Tác nhân môi trường**, và **Chất xúc tác**.
- Sát thương và bùa lợi không sinh ra từ phép thuật trừu tượng mà được kích hoạt thông qua **Phản ứng hóa học thực tế** giữa các chất trên sân theo định luật bảo toàn khối lượng và điện tích.

---

## 2. CẤU TRÚC BỘ BÀI (DECK BUILDING RULES)

1. **Kích thước Bộ bài:** Đúng **10 lá bài** (Tactical Deck Size) cho mỗi người chơi.
2. **Quy tắc phân bổ thẻ trong bộ bài:**
   - Tối thiểu 5 lá **Thẻ Nguyên Tố** (Element Cards).
   - Tối đa 3 lá **Thẻ Môi Trường** (Environmental Cards).
   - Tối đa 2 lá **Thẻ Hợp Chất / Xúc Tác** (Compound / Catalyst Cards).
3. **Giới hạn bản sao:** Mỗi lá bài nguyên tố độc nhất (theo số hiệu Z) chỉ được có tối đa **1 bản sao** trong bộ bài để thúc đẩy tư duy phối hợp đa nguyên tố.

---

## 3. CÁC VÙNG TRÊN BÀN ĐẤU (BATTLEFIELD ZONES)

Mỗi người chơi quản lý 5 phân vùng chiến thuật:
1. **Khu vực Rút bài (Deck Zone):** Chứa các lá bài còn lại trong bộ bài, úp mặt.
2. **Vùng Tay bài (Hand Zone):** Giới hạn tối đa **5 lá bài** trên tay. Lá bài rút thêm khi tay đã đủ 5 lá sẽ tự động chuyển xuống Nghĩa địa (Graveyard).
3. **Vùng Sân Nguyên Tố (Element Board Zone):** Tối đa **3 vị trí** để triển khai nguyên tố cùng một lúc.
4. **Vùng Môi Trường & Xúc Tác (Field Environment Zone):** Tối đa **2 vị trí** kích hoạt điều kiện (ví dụ: Nước $H_2O$, Nhiệt độ $t^\circ$, Acid loãng, Base kiềm, Khí $O_2$).
5. **Khu vực Mộ Bài / Sản Phẩm Đã Phản Ứng (Reaction Graveyard):** Chứa các lá bài đã tham gia phản ứng hoặc bị tiêu hủy.

---

## 4. HỆ THỐNG NĂNG LƯỢNG (MANA & REACTION ENERGY)

1. **Khởi đầu:** Mỗi người chơi bắt đầu trận đấu với **2 Mana**.
2. **Tăng trưởng năng lượng:** Ở đầu mỗi lượt mới, Mana tối đa tăng thêm 1 điểm cho đến mức trần **5 Mana**.
3. **Hồi phục:** Toàn bộ Mana được làm đầy lại ở đầu lượt của người chơi đó.
4. **Chi phí triển khai:**
   - Thẻ Nguyên tố: Chi phí từ 1 đến 4 Mana (tùy thuộc vào chu kì và năng lượng liên kết).
   - Thẻ Môi trường: Cố định 1 Mana.
   - Thẻ Xúc tác / Phản ứng nhanh: Từ 1 đến 2 Mana.

---

## 5. TRÌNH TỰ VÀ CÁC GIAI ĐOẠN TRONG MỘT LƯỢT (TURN PHASES)

Mỗi lượt diễn ra tuần tự qua 5 giai đoạn:

```
[1. Draw Phase] -> [2. Standby Phase] -> [3. Main Phase] -> [4. Reaction Phase] -> [5. End Phase]
```

### Giai đoạn 1: Rút Bài (Draw Phase)
- Người chơi rút 1 lá bài từ Deck Zone lên Hand Zone. (Ở lượt 1, người đi trước được rút 4 lá bài khởi đầu).

### Giai đoạn 2: Chuẩn Bị & Hiệu Ứng Duy Trì (Standby Phase)
- Làm đầy Mana hiện tại đến mức tối đa của lượt đó.
- Kích hoạt các hiệu ứng sát thương theo thời gian (DoT) đang tồn tại (như Ăn mòn Gỉ sắt $Fe_2O_3\cdot xH_2O$, Axit ăn mòn $H_2SO_4$).

### Giai đoạn 3: Triển Khai Chính (Main Phase)
Người chơi có thể thực hiện các hành động sau trong giới hạn Mana:
- Đặt Thẻ Nguyên Tố từ tay xuống Vùng Sân Nguyên Tố (tối đa 3 nguyên tố).
- Đặt Thẻ Môi Trường từ tay xuống Vùng Môi Trường.
- Thu hồi một nguyên tố chưa phản ứng về tay (hoàn trả 50% Mana đã tiêu hao).

### Giai đoạn 4: Kích Hoạt Phản Ứng (Reaction & Combat Phase)
- Người chơi nhấn lệnh **"Kích Hoạt Phản Ứng" (Trigger Reaction)**.
- Động cơ DCSM kiểm tra tổ hợp các nguyên tố trên sân và các điều kiện môi trường đang hoạt động:
  - **Trường hợp 1 (Hóa học Hợp Lệ):** Khớp với một phương trình phản ứng trong từ điển khoa học.
    - Thi triển hiệu ứng tương ứng (Sát thương bùng nổ, Hồi phục khiên, Gây DoT, Đóng băng làm chậm).
    - Các nguyên tố và điều kiện tham gia phản ứng chuyển xuống Mộ Bài.
  - **Trường hợp 2 (Bẫy Nhận Thức / Phản Ứng Bất Khả Thi):** Ví dụ kết hợp Kim loại đứng sau Hydro với Acid loãng ($Cu + HCl$), hoặc đốt Khí hiếm ($He + O_2$).
    - Bị phạt mất **50% Mana hiện tại**.
    - Nguyên tố không tạo ra sát thương, ghi nhận lỗi vào hệ thống CA-SRS để ôn tập.
  - **Trường hợp 3 (Thiếu Điều Kiện / Chưa Đủ Chất):** Báo lỗi thiếu chất phản ứng hoặc thiếu điều kiện môi trường ($t^\circ$, nước), không mất phạt nặng nhưng không tạo ra phản ứng.

### Giai đoạn 5: Kết Thúc Lượt (End Phase)
- Chuyển quyền điều khiển sang đối thủ (hoặc AI bot).

---

## 6. ĐIỀU KIỆN THẮNG, THUA VÀ HÒA (WIN / LOSS CONDITIONS)

1. **Chiến Thắng Tuyệt Đối (Victory):**
   - Giảm điểm sinh lực (HP) của đối thủ từ 300 điểm ban đầu về **0 điểm**.
2. **Thua Cuộc Do Hết Bài (Deck Out Defeat):**
   - Đến giai đoạn Draw Phase nhưng không còn bài trong Deck Zone để rút.
3. **Thua Cuộc Do Đầu Hàng (Surrender):**
   - Người chơi chủ động nhận thất bại.
4. **Hòa Trận (Draw):**
   - Cả hai người chơi cùng lúc về 0 HP sau một phản ứng nổ dây chuyền tỏa nhiệt cực lớn.

---

## 7. CÂN BẰNG CHIẾN THUẬT & CHỐNG COMBO VÔ HẠN

1. **Giới hạn 1 Combo / Lượt:** Mỗi người chơi chỉ được kích hoạt phản ứng 1 lần trong giai đoạn Reaction Phase để ngăn chặn việc dồn sát thương một lượt (One-Turn Kill - OTK).
2. **Khắc Chế Khí Hiếm & Kim Loại Trơ:**
   - Vàng (Au) và Khí hiếm (He, Ne, Ar) có chỉ số Phòng Ngự Bền Vững ($\text{DEF}_{\text{stab}}$) cực cao (96-98 điểm), tạo thành lá chắn hấp thụ sát thương cực mạnh, nhưng không thể dùng để tấn công trực diện.
3. **Hiệu Ứng Bán Phản Ứng Trao Đổi Electron:**
   - Chất khử mạnh (Natri, Kali, Nhôm) gây sát thương tức thời lớn nhưng tiêu tốn nhiều Mana.
   - Chất oxi hóa mạnh (Clo, Oxi) tạo ra hiệu ứng ăn mòn kéo dài nhiều lượt.
