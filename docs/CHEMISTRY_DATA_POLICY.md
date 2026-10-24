# ELEMENTA — CHÍNH SÁCH VÀ QUY CHUẨN DỮ LIỆU HÓA HỌC (CHEMISTRY DATA POLICY)
**Tiêu chuẩn:** IUPAC Periodic Table of the Elements • GDPT 2018 (KHTN 7-9 & Hóa Học 10-12)  
**Mục tiêu:** Đảm bảo 100% tính xác thực khoa học, truy xuất nguồn gốc và bảo toàn định luật tự nhiên  

---

## 1. NGUYÊN TẮC CỐT LÕI VỀ TÍNH CHÂN THỰC KHOA HỌC

1. **Tuyệt đối không bịa đặt dữ liệu (Zero Data Fabrication):** Mọi nguyên tố, chất hóa học và phương trình phản ứng phải được trích xuất từ các tài liệu khoa học chính thống (IUPAC Blue Book, Gold Book, Sách giáo khoa Hóa học chuẩn GDPT 2018, CRC Handbook of Chemistry and Physics).
2. **Minh bạch trạng thái dữ liệu:**
   - Dữ liệu đo đạc thực nghiệm (Experimental Data): Ghi rõ giá trị cụ thể.
   - Dữ liệu dự đoán trên lý thuyết (Predicted / Computational): Nêu rõ là giá trị tính toán lý thuyết (đặc biệt đối với các nguyên tố siêu nặng $Z=104 \rightarrow 118$).
   - Dữ liệu chưa xác định (Unmeasured / Unknown): Ghi rõ `null` hoặc `Chưa xác định`, tuyệt đối không điền bừa số 0 hoặc số ngẫu nhiên.
3. **Phân định ranh giới giữa Thực tế Khoa học và Hư cấu Gameplay:**
   - Các chỉ số game như $\text{ATK}_{\text{ox}}, \text{ATK}_{\text{red}}, \text{DEF}_{\text{stab}}$, Mana cost là ánh xạ toán học phục vụ gameplay.
   - Thông tin khoa học (Độ âm điện $\chi$, Năng lượng ion hóa thứ nhất $I_1$, Số oxi hóa, Khối lượng nguyên tử, Bán kính nguyên tử) phải giữ nguyên giá trị IUPAC thực nghiệm.

---

## 2. QUY CHUẨN BẢNG TUẦN HOÀN 118 NGUYÊN TỐ

Mỗi nguyên tố từ Hydro ($Z=1$) đến Oganesson ($Z=118$) phải đáp ứng đầy đủ cấu trúc bản ghi:
- **Số hiệu nguyên tử (Z):** Số nguyên dương duy nhất từ 1 đến 118.
- **Ký hiệu hóa học (Symbol):** Chuẩn quốc tế viết hoa chữ cái đầu (ví dụ: $H, He, Li, ..., Og$).
- **Tên IUPAC:** Danh pháp tiếng Anh chính thức của IUPAC (ví dụ: Hydrogen, Sodium, Potassium, Oganesson).
- **Tên Tiếng Việt:** Danh pháp theo chương trình GDPT 2018 (sử dụng phiên âm và tên quốc tế hóa theo quy định mới, đồng thời hỗ trợ tên truyền thống: ví dụ: Sodium / Natri, Potassium / Kali, Iron / Sắt).
- **Khối lượng nguyên tử chuẩn ($A_r$):** Giá trị theo bảng IUPAC 2021 (với các nguyên tố phóng xạ siêu nặng, sử dụng số khối của đồng vị bền nhất đặt trong dấu ngoặc vuông).
- **Cấu hình electron:** Biểu diễn từ khí hiếm gần nhất theo nguyên lý Aufbau (ví dụ: $[Ne] 3s^1$ cho Na, ngoại lệ $[Ar] 3d^5 4s^1$ cho Cr, $[Ar] 3d^{10} 4s^1$ cho Cu).
- **Độ âm điện Pauling ($\chi$):** Thang Pauling từ 0.7 (Fr) đến 3.98 (F). Khí hiếm chưa đo được để giá trị `null`.
- **Năng lượng ion hóa thứ nhất ($I_1$):** Đơn vị $kJ/mol$.
- **Trạng thái chuẩn ở điều kiện tham chiếu (25°C, 1 bar):** Khí (GAS), Lỏng (LIQUID - chỉ có Br và Hg), Rắn (SOLID).
- **Số oxi hóa đặc trưng:** Mảng các số oxi hóa phổ biến trong hợp chất.
- **Ứng dụng thực tế & Facts đã kiểm chứng:** Tối thiểu 1 ứng dụng công nghệ đời sống và 2 sự thật khoa học đặc sắc.

---

## 3. TIÊU CHUẨN KHO CHẤT HÓA HỌC ($\ge 300$ CHẤT)

Catalog chất hóa học phải bao phủ các nhóm hợp chất cơ bản và nâng cao:
1. **Đơn chất:** Khí đơn nguyên tử, phân tử lưỡng nguyên tử ($H_2, N_2, O_2, F_2, Cl_2, Br_2, I_2$), kim loại và phi kim thể rắn.
2. **Oxide:** Oxide base ($Na_2O, CaO, BaO, Fe_2O_3, CuO$), oxide acid ($CO_2, SO_2, SO_3, P_2O_5, NO_2$), oxide lưỡng tính ($Al_2O_3, ZnO$), oxide trung tính ($CO, NO$).
3. **Acid:** Acid mạnh vô cơ ($HCl, H_2SO_4, HNO_3, HBr, HI, HClO_4$), acid yếu ($H_2S, H_2CO_3, H_2SO_3, HF, H_3PO_4, CH_3COOH$).
4. **Base:** Base kiềm mạnh tan ($NaOH, KOH, Ba(OH)_2, Ca(OH)_2$), base không tan ($Fe(OH)_2, Fe(OH)_3, Cu(OH)_2, Al(OH)_3$).
5. **Muối:** Muối chloride, sulfate, nitrate, carbonate, phosphate, sulfide, silicate.
6. **Hợp chất Hữu cơ GDPT 2018:**
   - Hydrocarbon: Methane, Ethane, Propane, Butane, Ethylene, Acetylene, Benzene, Toluene.
   - Dẫn xuất: Methanol, Ethanol, Glycerol, Formaldehyde, Acetaldehyde, Acetone, Acetic acid, Ethyl acetate.
   - Hợp chất thiên nhiên: Glucose, Fructose, Sucrose, Tinh bột, Cellulose, Glycine, Alanine.

---

## 4. TIÊU CHUẨN KHO PHƯƠNG TRÌNH PHẢN ỨNG ($\ge 300$ PHẢN ỨNG)

1. **Bảo toàn Nguyên tử Tuyệt Đối (Law of Conservation of Mass):**
   - Tổng số nguyên tử của từng nguyên tố ở vế trái (chất phản ứng) phải bằng chính xác tổng số nguyên tử của nguyên tố đó ở vế phải (sản phẩm):
     $$\sum_{\text{reactants}} \nu_i \cdot N_{i, k} = \sum_{\text{products}} \nu_j \cdot N_{j, k} \quad \forall k \in \text{Elements}$$
2. **Bảo toàn Điện Tích (Conservation of Charge):**
   - Đối với các phương trình ion thu gọn, tổng đại số điện tích ở vế trái phải bằng vế phải.
3. **Tính Khả Thi Nhiệt Động Học & Bẫy Nhận Thức:**
   - Không đưa vào phương trình phản ứng không xảy ra trên thực tế trừ khi được đánh dấu rõ ràng là `isTrap: true` (Bẫy nhận thức phục vụ giáo dục, ví dụ: $Cu + HCl \rightarrow$ Không phản ứng).
4. **Điều Kiện Kèm Theo:**
   - Mọi phương trình cần nhiệt độ cao ($t^\circ$), chất xúc tác (xt: $Pt, Ni, MnO_2, V_2O_5$) hoặc ánh sáng ($as$) đều phải ghi nhận tường minh trong trường `requiredConditions`.
