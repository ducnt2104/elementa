# ELEMENTA — KẾ HOẠCH TRIỂN KHAI TOÀN DIỆN (PROJECT PLAN)
**Chế độ:** Autonomous Engineering Until Verified Acceptance (/goal)  
**Tác giả:** Antigravity Autonomous Engineering Team  
**Cập nhật lần cuối:** 2026-10-20  

---

## 1. MỤC TIÊU VÀ NGUYÊN TẮC THỰC THI

1. **Không dừng ở demo:** Mọi tính năng đều phải có mã nguồn chạy thật, có giao diện tương tác và có test tự động kiểm chứng.
2. **Khoa học chuẩn xác tuyệt đối:** 118 nguyên tố, $\ge 300$ chất hóa học, $\ge 300$ phương trình phản ứng được kiểm chứng bảo toàn khối lượng và điện tích, đối chiếu với danh pháp IUPAC và GDPT 2018.
3. **Đồ họa 2.5D nguyên bản:** Không sử dụng hình ảnh tạm hay placeholder, xây dựng hệ thống đồ họa 2.5D, particle engine, shader/vfx, SVG vector crests độc bản cho từng nguyên tố và tướng.
4. **Đấu trường MOBA 12 tướng:** Mở rộng từ 8 tướng lên 12 tướng hoàn chỉnh, cân bằng chỉ số, AI bot 3 cấp độ (Novice, Standard, Challenger), phân tích dữ liệu trận đấu.
5. **Đấu bài chiến thuật có bản sắc riêng:** Luật đấu thẻ bài riêng biệt dựa trên bản chất hóa học (nguyên tố, hợp chất, xúc tác, môi trường, chuỗi phản ứng).
6. **Tuân thủ Cổng nghiệm thu (Gates A-F):** Chỉ xác nhận hoàn thành khi đã vượt qua toàn bộ 6 cổng nghiệm thu.

---

## 2. MA TRẬN PHÂN CHIA GIAI ĐOẠN VÀ CÔNG VIỆC CỤ THỂ

### Giai đoạn 0: Khảo sát Hiện trạng & Thiết lập Baseline (COMPLETED)
- [x] **T0.1:** Rà soát toàn bộ cấu trúc dự án, mã nguồn, build pipeline, dependency.
- [x] **T0.2:** Chạy toàn bộ 217 test hiện có, xác nhận trạng thái 100% Pass.
- [x] **T0.3:** Lập tài liệu `docs/BASELINE_AUDIT.md`.

---

### Giai đoạn 1: Đặc Tả Kỹ Thuật & Tài Liệu Nền Tảng (IN PROGRESS)
- [x] **T1.1:** Lập `docs/PROJECT_PLAN.md` (Kế hoạch hành động chi tiết).
- [ ] **T1.2:** Lập `docs/REQUIREMENTS.md` (Ma trận yêu cầu kỹ thuật & chức năng).
- [ ] **T1.3:** Lập `docs/ART_BIBLE.md` (Định hướng mỹ thuật, ánh sáng 2.5D, bảng màu, animation).
- [ ] **T1.4:** Lập `docs/CARD_BATTLE_RULES.md` (Đặc tả chi tiết luật đấu bài hóa học).
- [ ] **T1.5:** Lập `docs/CHEMISTRY_DATA_POLICY.md` (Quy chuẩn thu thập, thẩm định dữ liệu hóa học).
- [ ] **T1.6:** Lập `docs/QA_STRATEGY.md` (Chiến lược kiểm thử đa tầng).
- [ ] **T1.7:** Lập `docs/IMPLEMENTATION_STATUS.md` (Sổ theo dõi trạng thái công việc thời gian thực).

---

### Giai đoạn 2: Hoàn Thiện Dữ Liệu Hóa Học Cốt Lõi (Chemistry Core Expansion)
- [ ] **T2.1: Hoàn thiện dữ liệu chuẩn xác cho đủ 118 nguyên tố:**
  - Thay thế toàn bộ mã sinh placeholder (`E${z}`) bằng bộ dữ liệu thực tế gồm tên IUPAC, tên tiếng Việt GDPT 2018, số hiệu nguyên tử, khối lượng nguyên tử, cấu hình electron, độ âm điện Pauling, năng lượng ion hóa $I_1$, trạng thái vật chất, số oxi hóa, ứng dụng thực tế và facts khoa học đã thẩm định.
  - Tệp chỉnh sửa: `src/data/elementsData.ts`.
- [ ] **T2.2: Xây dựng Kho Dữ Liệu Chất Hóa Học ($\ge 300$ chất):**
  - Tạo tệp `src/data/substancesData.ts` chứa $\ge 300$ chất bao gồm: Đơn chất kim loại & phi kim, oxide base, oxide acid, acid vô cơ & hữu cơ, base kiềm & không tan, muối (muối trung hòa, muối acid, phức chất), hydrocarbon (alkane, alkene, alkyne, arene), alcohol, aldehyde, ketone, carboxylic acid, ester, carbohydrate, amino acid.
  - Mỗi chất có ID, tên IUPAC, tên thông dụng, công thức phân tử, khối lượng mol, phân loại, trạng thái ở 25°C 1 bar, tính chất đặc trưng và nguồn tham khảo.
- [ ] **T2.3: Mở rộng Kho Phương Trình Phản Ứng Hóa Học ($\ge 300$ phản ứng):**
  - Mở rộng `src/data/reactionsData.ts` lên $\ge 300$ phản ứng có mã ID chuẩn, phương trình phân tử cân bằng, phương trình ion rút gọn (nếu có), điều kiện phản ứng ($t^\circ$, xt, $p$), phân loại (hóa hợp, phân hủy, thế, trao đổi, oxi hóa - khử, hữu cơ, bẫy nhận thức), hiện tượng quan sát và nguồn đối chiếu GDPT 2018 / IUPAC.
- [ ] **T2.4: Bộ kiểm thử tính toàn vẹn khoa học tự động:**
  - Tạo `test-chemistry-data.mjs` kiểm tra tự động:
    - Đủ 118 nguyên tố duy nhất, không trùng ID, không placeholder rỗng.
    - $\ge 300$ chất trong catalog có công thức hợp lệ theo Stack Parser.
    - $\ge 300$ phản ứng đều bảo toàn nguyên tử 100% giữa hai vế và bảo toàn điện tích ion.

---

### Giai đoạn 3: Đấu Trường MOBA 2.5D — Đội Hình 12 Tướng & AI Nâng Cấp
- [ ] **T3.1: Thiết kế và tích hợp 4 Tướng Mới (Nâng tổng số lên 12 Tướng):**
  - **Tướng 9: Carbon (C) — Nhà Giả Kim Hóa Hữu Cơ (Mage/Control):**
    - Q: Bẫy Kim Cương Cực Cứng (Covalent Diamond Net) - Trói chân đối thủ.
    - W: Giáp Chống Đạn Nanotube (Tensile Shield) - Hấp thụ sát thương.
    - E: Nhiệt Phân Hydrocarbon (Pyrolysis Blast) - Sát thương phép diện rộng.
    - R: Thù Hình Kim Cương (Allotropic Transcendence) - Chuyển hóa thù hình cường hóa toàn bộ kỹ năng.
  - **Tướng 10: Sulfur (S) — Sát Thủ Hoàng Trầm Hỏa Ngục (Assassin/DoT):**
    - Q: Hơi Ngạt Lưu Huỳnh $SO_2$ (Suffocating Vapor) - Giảm kháng phép & làm chậm.
    - W: Ăn Mòn Hóa Than $H_2SO_4$ (Dehydration Corrosion) - DoT ăn mòn cực mạnh.
    - E: Phân Tách Đa Tinh Thể $S_8$ (Orthorhombic Flash) - Lướt xuyên mục tiêu.
    - R: Bão Lửa Oleum Tam Khí (Oleum Apocalypse) - Kích nổ diện rộng.
  - **Tướng 11: Calcium (Ca) — Vệ Binh Vôi Sống & Nhũ Đá (Tank/Initiator):**
    - Q: Tôi Vôi Bùng Nổ $CaO + H_2O$ (Slaking Smash) - Nổ nhiệt làm choáng.
    - W: Khiên Vỏ Sò Đá Vôi $CaCO_3$ (Limestone Bastion) - Miễn nhiễm sát thương tiếp theo và phản đòn.
    - E: Hóa Cứng Thạch Cao $CaSO_4\cdot 2H_2O$ (Gypsum Fortification) - Tăng giáp và làm chậm kẻ địch xung quanh.
    - R: Pháo Đài Nhũ Đá Karst (Stalactite Cataclysm) - Hất tung và tạo địa hình cản đường.
  - **Tướng 12: Nitrogen (N) — Xạ Thủ Khí Trơ & Đạn Nổ (Marksman/Sniper):**
    - Q: Đạn Nitơ Lỏng $-196^\circ\text{C}$ (Liquid Nitrogen Frost) - Bắn xuyên làm chậm mục tiêu.
    - W: Liên Kết Ba Bền Vững $N\equiv N$ (Triple-Bond Barrier) - Không thể bị chọn làm mục tiêu trong 1.5s.
    - E: Phản Ứng Đẩy Khí Haber-Bosch (Haber Propulsion) - Giật lùi về sau và xả khí $NH_3$ làm mù.
    - R: Đại Bác Thuốc Súng Nitrate (Explosive Nitrate Salvo) - Đại pháo tầm cực xa gây sát thương vật lý/phép hỗn hợp.
  - Tệp chỉnh sửa: `src/game/data/heroesData.ts`.
- [ ] **T3.2: Bộ Huy Hiệu SVG Vector & Biểu Tượng Chiêu Thức cho 4 Tướng Mới:**
  - Bổ sung huy hiệu cấu trúc electron cho C, S, Ca, N vào `src/assets/svg/ElementalCrests.tsx`.
  - Bổ sung biểu tượng chiêu thức vào `src/assets/svg/SkillGlyphs.tsx`.
- [ ] **T3.3: Nâng cấp AI Đối Thủ cho cả 12 Tướng:**
  - Cập nhật bộ chọn combo, tính toán thời điểm tung chiêu và ngưỡng máu rút lui cho cả 12 tướng trong `src/game/ai/mobaBotAi.ts`.
  - Đảm bảo 3 mức độ khó (Novice, Standard, Challenger) có sự khác biệt rõ nét về khả năng né chiêu định hướng và hỗ trợ đồng đội.
- [ ] **T3.4: Bảng Tổng Kết Sau Trận Đấu MOBA (Post-Match Debrief Screen):**
  - Mở rộng `src/components/moba/MobaDebriefModal.tsx` hiển thị chi tiết: KDA, tổng sát thương gây ra, sát thương gánh chịu, số phản ứng hóa học kích hoạt trong trận, vàng/phút, biểu đồ so sánh hai đội.

---

### Giai đoạn 4: Hoàn Thiện Chế Độ Đấu Thẻ Bài Chiến Thuật (Strategic Card Battle)
- [ ] **T4.1: Mở rộng Hệ Thống Thẻ Bài (Card Database Expansion):**
  - Bổ sung thẻ Hợp Chất (Compound Cards) như $NaCl, H_2SO_4, CaCO_3, Fe_2O_3, NaOH, HCl, Al_2O_3$.
  - Bổ sung thẻ Xúc Tác & Phản Ứng Nhanh (Catalyst & Quick-Play Reaction Cards) như $MnO_2, Pt, V_2O_5$, Enzim.
- [ ] **T4.2: Nâng cấp Động Cơ Trận Đấu Thẻ Bài (Card Battle Engine):**
  - Cập nhật `src/domain/battleEngine.ts`:
    - Quản lý các vùng sân đấu: Vùng Nguyên Tố (Element Zone - tối đa 3 thẻ), Vùng Hợp Chất (Compound Zone), Vùng Môi Trường (Environment Field), Mộ Thẻ (Graveyard).
    - Cơ chế phản ứng theo chuỗi (Reaction Chaining & Resolution).
    - Điều kiện thắng thua rõ ràng (HP về 0 hoặc hết bài trong bộ bài).
- [ ] **T4.3: Giao Diện Bàn Đấu Thẻ Bài Nâng Cấp:**
  - Tối ưu `src/components/BattleArenaTab.tsx` với bố cục bàn đấu sci-fi 2.5D, hiệu ứng lật thẻ, kéo thả triển khai thẻ, vạch năng lượng mana và nhật ký chiến đấu thời gian thực.
- [ ] **T4.4: Bộ kiểm thử Đấu Thẻ Bài Tự Động:**
  - Tạo `test-card-battle.mjs` kiểm tra quy trình rút bài, triển khai thẻ, chi phí mana, chuỗi phản ứng, AI tự động chơi và điều kiện thắng thua.

---

### Giai đoạn 5: Chemistry Codex & Bảng Tuần Hoàn 18 Cột Chuẩn
- [ ] **T5.1: Bảng Tuần Hoàn 18 Cột Chuẩn Quốc Tế:**
  - Cập nhật `src/components/PeriodicCodexTab.tsx` hỗ trợ chế độ xem Bảng Tuần Hoàn 18 Cột (Standard 18-Column Layout):
    - Chu kì 1 đến 7 nằm đúng hàng ngang.
    - Nhóm 1 (IA) đến Nhóm 18 (VIIIA) nằm đúng cột dọc.
    - Dãy Lantan ($Z=57 \rightarrow 71$) và dãy Actini ($Z=89 \rightarrow 103$) đặt trang trọng ở hai hàng độc lập phía dưới.
    - Màu sắc hiển thị chuẩn hóa theo 10 phân nhóm IUPAC.
- [ ] **T5.2: Công Cụ So Sánh Nguyên Tố Song Song (Element Comparison Modal):**
  - Cho phép người học chọn 2 nguyên tố bất kỳ để so sánh đối chiếu trực tiếp: $\Delta\chi$, $I_1$, bán kính nguyên tử, nhiệt độ nóng chảy/sôi, cấu hình orbital và xu hướng phản ứng.
- [ ] **T5.3: Danh Mục Tra Cứu Hóa Chất (Substance Explorer View):**
  - Tích hợp giao diện tra cứu $\ge 300$ chất hóa học với bộ lọc theo loại (Acid, Base, Oxide, Muối, Hữu cơ) và tính năng tính nhanh khối lượng phân tử.
- [ ] **T5.4: Tra Cứu Phản Ứng Toàn Diện (Expanded Reaction Compendium):**
  - Nâng cấp `src/components/ReactionCompendiumModal.tsx` để tra cứu toàn bộ $\ge 300$ phản ứng theo chất tham gia, sản phẩm hoặc loại phản ứng.

---

### Giai đoạn 6: Nghệ Thuật, Đồ Họa 2.5D & Tối Ưu Hiệu Năng
- [ ] **T6.1: Cải tiến Hiệu Ứng Ánh Sáng 2.5D & Vật Liệu Map:**
  - Tinh chỉnh gradient chiều sâu và đổ bóng contact shadow trong `src/game/rendering/mobaRenderer.ts`.
  - Bổ sung hiệu ứng rung màn hình có thể cấu hình theo mức độ chất lượng (Ultra / Balanced / Performance / Reduced Motion).
- [ ] **T6.2: Kiểm tra Tối ưu 60 FPS & Bộ Nhớ (Zero GC Loop):**
  - Duy trì ngân sách hạt tĩnh, culling màn hình (viewport culling) và tái sử dụng bộ đệm địa hình (offscreen canvas).

---

### Giai đoạn 7: Đóng Gói, Kiểm Thử Toàn Hệ Thống & Báo Cáo Nghiệm Thu
- [ ] **T7.1: Chạy toàn bộ các bộ kiểm thử tự động:**
  - Chạy `npm test` gồm tất cả các test suite hiện tại và mới: `test-engine.mjs`, `test-moba.mjs`, `test-chemistry-calculator.mjs`, `test-chemistry-data.mjs`, `test-card-battle.mjs`.
- [ ] **T7.2: Kiểm tra Build Production:**
  - Chạy `npm run build` xác nhận 0 lỗi TypeScript, dist bundle hoàn chỉnh.
- [ ] **T7.3: Lập đầy đủ các báo cáo kỹ thuật theo yêu cầu:**
  - `docs/BALANCE_REPORT.md`
  - `docs/PERFORMANCE_REPORT.md`
  - `docs/QA_REPORT.md`
  - `docs/RELEASE_NOTES.md`
  - Cập nhật `docs/IMPLEMENTATION_STATUS.md` sang trạng thái nghiệm thu.

---

## 3. LỊCH TRÌNH THỰC HIỆN TỰ ĐỘNG
Các giai đoạn sẽ được triển khai tuần tự, liên tục không ngừng nghỉ theo đúng chỉ thị Autonomous Master Directive.
