# ELEMENTA — KHẢO SÁT HIỆN TRẠNG TOÀN DIỆN (BASELINE AUDIT)
**Thời điểm lập:** 2026-10-20  
**Người thực hiện:** Antigravity Autonomous Engineering Team  
**Tiêu chuẩn đối chiếu:** Chỉ thị Master Directive & Tiêu chuẩn GDPT 2018 / IUPAC

---

## 1. TỔNG QUAN HẠ TẦNG VÀ CÔNG NGHỆ HIỆN TẠI

| Thành phần | Công nghệ / Thư viện | Phiên bản | Đánh giá hiện trạng |
| :--- | :--- | :--- | :--- |
| **Framework UI** | React | 18.3.1 | Hoạt động tốt, render component phân cấp rõ ràng |
| **Build Tool** | Vite | 6.4.4 | Build thành công, thời gian build ~21.5s, 1626 modules |
| **Type Checker** | TypeScript | 5.7.2 | Cấu hình nghiêm ngặt (`strict: true`), 0 lỗi Type error |
| **Styling & Design** | Tailwind CSS | 3.4.17 | Bảng màu tối Cyberpunk/Sci-Fi (`obsidian`, `cyan-ion`, `coral-reaction`) |
| **Iconography** | Lucide-React & Custom SVG | 0.469.0 | Icon tiêu chuẩn + Huy hiệu nguyên tố SVG độc bản |
| **Audio Engine** | Web Audio API (Synthesizer) | Native Web API | Tổng hợp âm thanh procedural, không phụ thuộc file mp3 ngoài |
| **Persistent Storage**| LocalStorage / JSON | Native Web API | Lưu trữ hồ sơ người chơi, tiến trình SRS, kỹ năng tùy chỉnh, cấu hình |
| **Offline Support** | PWA Service Worker & Manifest| Custom | Hỗ trợ chạy 100% offline, lưu cache tài nguyên tĩnh |

---

## 2. KẾT QUẢ KIỂM THỬ BAN ĐẦU (BASELINE TESTS)

Trước khi thực hiện bất kỳ chỉnh sửa nào, hệ thống kiểm thử tự động đã được thực thi toàn diện:

```
> elementa-tactical-chemistry@1.0.0 test
> npx tsx test-engine.mjs && npx tsx test-moba.mjs && npx tsx test-chemistry-calculator.mjs
```

### Chi tiết các bộ test:
1. **`test-engine.mjs` (41/41 PASS):**
   - Ánh xạ chỉ số game từ dữ liệu hóa học (Table 3): $\chi \rightarrow \text{ATK}_{\text{ox}}$, $I_1 \rightarrow \text{ATK}_{\text{red}}$, $\beta_{\text{inert}} \rightarrow \text{DEF}_{\text{stab}}$.
   - Phân giải cấu tử hóa học (`ChemicalSpecies`): trạng thái rắn, dung dịch, kết tủa.
   - Bộ phân tích cú pháp ngăn xếp (Stack Parser) phân tích công thức lồng ngoặc phức tạp ($Al_2(SO_4)_3$, $Ca(OH)_2$).
   - Động cơ trạng thái hóa học tất định (DCSM) với 5 kịch bản thành công và 3 bẫy nhận thức.
   - Thuật toán CA-SRS phân tầng trọng số lỗi 1.00, 0.85, 0.70.
   - 3 tầng bảo vệ AI Guardrails và Local IUPAC RAG.

2. **`test-moba.mjs` (114/114 PASS):**
   - Đội hình 8 tướng nguyên tố: Natri, Sắt, Clo, Đồng, Nhôm, Oxi, Hiđro, Bari.
   - Hệ thống đạn đạo, va chạm AABB, tầm nhìn Fog of War, trụ tháp, lính 3 đường.
   - AI bot đi đường, né trụ, combo kỹ năng, rút lui khi thấp máu.
   - Quái rừng aggro, cơ chế leashing, bùa lợi Catalyst Guardian.

3. **`test-chemistry-calculator.mjs` (62/62 PASS):**
   - Khối lượng mol $M$, chuyển đổi $n = m/M$, thể tích khí tiêu chuẩn GDPT 2018 ($24.79\text{ L}$) và cổ điển ($22.4\text{ L}$).
   - Nồng độ $C_M, C\%$, bài toán chất hạn chế/chất dư.
   - Phản ứng oxi hóa - khử, gán số oxi hóa, bán phản ứng nhường/thu electron.
   - Nhiệt hóa học ($\Delta_r H^0_{298}$) và động hóa học Van 't Hoff.
   - Cấu trúc lượng tử orbital electron, ngoại lệ bán bão hòa $d^5$ ($Cr$) và bão hòa $d^{10}$ ($Cu$).
   - Động cơ liên kết hóa học Pauling ($\Delta\chi$).

**Tổng số test ban đầu:** 217 tests, 100% Pass, 0 Fail.

---

## 3. KHOẢNG TRỐNG KỸ THUẬT VÀ PHẠM VI CẦN NÂNG CẤP (GAP ANALYSIS)

Đối chiếu với các yêu cầu bắt buộc trong Chỉ thị Master Directive:

### A. Dữ liệu Hóa học (Chemistry Completeness - Gate B)
1. **Bảng tuần hoàn 118 nguyên tố:**
   - *Hiện trạng:* Các nguyên tố $Z=1 \rightarrow 20$ và một số nguyên tố chọn lọc ($Z=26, 29, 30, 35, 47, 53, 56, 74, 78, 79, 80, 82, 92$) có dữ liệu chuẩn. Các nguyên tố còn lại (đặc biệt là họ Lantan, Actini và siêu nặng $Z=104 \rightarrow 118$) đang dùng hàm sinh placeholder tổng quát (`symbol: E${z}`, `name_iupac: Element-${z}`).
   - *Hành động khắc phục:* Xây dựng bộ từ điển dữ liệu chuẩn xác thực tế cho TOÀN BỘ 118 nguyên tố từ Hydro ($Z=1$) đến Oganesson ($Z=118$) với tên IUPAC, tên tiếng Việt chuẩn GDPT 2018, số hiệu, khối lượng nguyên tử, cấu hình electron, độ âm điện Pauling, năng lượng ion hóa $I_1$, trạng thái vật chất, số oxi hóa, ứng dụng thực tế và dữ kiện khoa học được kiểm chứng.

2. **Kho Dữ Liệu Chất Hóa Học (Substance Catalog - Mục tiêu $\ge 300$ chất):**
   - *Hiện trạng:* Chưa có danh mục chất hóa học độc lập hoàn chỉnh; các chất mới chỉ nằm rải rác trong `speciesResolver.ts` (~30 chất) và `thermochemistryEngine.ts` (19 chất).
   - *Hành động khắc phục:* Xây dựng kho dữ liệu `src/data/substancesData.ts` gồm $\ge 300$ hợp chất, đơn chất, oxide, acid, base, muối, hydrocarbon, dẫn xuất hữu cơ cơ bản theo chuẩn IUPAC và chương trình GDPT 2018.

3. **Kho Phương Trình Phản Ứng (Reaction Catalog - Mục tiêu $\ge 300$ phương trình):**
   - *Hiện trạng:* `src/data/reactionsData.ts` hiện mới có 15 phản ứng (thuộc 5 nhóm A-E và bẫy nhận thức).
   - *Hành động khắc phục:* Mở rộng kho phương trình lên $\ge 300$ phản ứng bao phủ các loại phản ứng hóa hợp, phân hủy, thế, trao đổi, trung hòa, oxi hóa - khử, hữu cơ, nhiệt phân, có nguồn trích dẫn và kiểm chứng bảo toàn nguyên tử/điện tích.

4. **Bảng Tuần Hoàn Tương Tác 18 Cột Chuẩn Hiện Đại:**
   - *Hiện trạng:* Giao diện `PeriodicCodexTab.tsx` hiển thị dạng lưới card responsive thông thường (10 cột), không phải cấu trúc 18 cột kinh điển của bảng tuần hoàn với hàng riêng cho Lantan và Actini.
   - *Hành động khắc phục:* Bổ sung chế độ xem "Bảng Tuần Hoàn 18 Cột Tiêu Chuẩn" (Standard 18-Column Periodic Table Layout) với tọa độ chu kì 1-7, nhóm IA-VIIIA, khối s, p, d, f, dải Lantan & Actini phía dưới, hỗ trợ zoom/pan và so sánh trực quan giữa 2 nguyên tố bất kỳ.

---

### B. Đấu Trường MOBA 2.5D (Arena Playable - Gate C)
1. **Đội hình Tướng (Champions Roster):**
   - *Hiện trạng:* Hiện có 8 tướng (Na, Fe, Cl, Cu, Al, O, H, Ba).
   - *Yêu cầu:* Tối thiểu 12 tướng có thể chơi được.
   - *Hành động khắc phục:* Bổ sung 4 tướng nguyên tố mới đầy đủ 4 kỹ năng + nội tại + facts + huy hiệu SVG + hiệu ứng combat:
     - **Carbon (C - Nhà Giả Kim Hóa Hữu Cơ & Khung Nanotube):** Pháp sư điều khiển cấu trúc cộng hóa trị, bẫy kim cương, khiên nanotube và sóng nhiệt pyrolysis.
     - **Sulfur (S - Sát Thủ Hoàng Trầm & Axit Sunfuric):** Sát thủ DoT ăn mòn háo nước, hơi ngạt $SO_2$, phân tách đa tinh thể $S_8$.
     - **Calcium (Ca - Vệ Binh Vôi Sống & Nhũ Đá Karst):** Đỡ đòn mở giao tranh, nổ nhiệt tôi vôi $CaO + H_2O$, giáp đá vôi $CaCO_3$, địa chấn thạch nhũ.
     - **Nitrogen (N - Xạ Thủ Khí Trơ & Đạn Nổ Thuốc Súng):** Xạ thủ bắn tỉa, đạn nitơ lỏng $-196^\circ\text{C}$, khiên liên kết ba $N\equiv N$, đại pháo thuốc súng nitrate.

2. **Đồ họa 2.5D và Cảm giác Chiến đấu:**
   - *Hiện trạng:* Đã có bóng đổ tiếp xúc, đạn đạo theo vector, nước sông H2O gợn sóng, sương mù chiến tranh và quái rừng.
   - *Hành động khắc phục:* Tăng cường hiệu ứng ánh sáng thể tích 2.5D (isometric depth lighting), hiệu ứng độ cao địa hình, vòng tròn phạm vi kỹ năng hiển thị rõ nét, âm thanh synthesizer cho các tướng mới, bảng phân tích số liệu sau trận (Post-match Stats) chi tiết.

3. **Hệ thống AI Đối Thủ 3 Cấp Độ:**
   - *Hiện trạng:* Đã có cấu trúc Novice, Standard, Challenger.
   - *Hành động khắc phục:* Hoàn thiện logic AI cho cả 12 vị tướng, mở rộng hành vi né kỹ năng (Skillshot Dodging Heuristic) và phối hợp dồn sát thương nguyên tố theo cấp độ khó.

---

### C. Đấu Thẻ Bài Chiến Thuật (Card Battle - Gate D)
1. **Quy Tắc và Động Cơ Đấu Bài (Card Battle Engine):**
   - *Hiện trạng:* `BattleArenaTab.tsx` và `battleEngine.ts` có cơ chế tung nguyên tố + điều kiện môi trường để tạo combo bùng nổ, nhưng chưa có tài liệu luật chính thức `docs/CARD_BATTLE_RULES.md`, thiếu thẻ Hợp chất (Compound Cards) và Thẻ Xúc tác/Phản ứng nhanh.
   - *Hành động khắc phục:*
     - Soạn thảo tài liệu đặc tả luật `docs/CARD_BATTLE_RULES.md`.
     - Bổ sung nhóm Thẻ Hợp Chất (Compound Cards) và Thẻ Phản Ứng/Chiến Thuật.
     - Nâng cấp giao diện bàn đấu thẻ bài theo chuẩn bài đấu chiến thuật (Khu vực Rút bài, Khu vực Sân đấu, Khu vực Môi trường, Khu vực Mộ bài/Nghĩa địa), thanh hiển thị chuỗi phản ứng liên hoàn và âm thanh lật bài/kích hoạt.

---

### D. Hệ Thống Tài Liệu Kỹ Thuật (Documentation Completeness)
Các tài liệu cần tạo hoặc hoàn thiện:
- `docs/BASELINE_AUDIT.md` (Tài liệu này)
- `docs/PROJECT_PLAN.md` (Kế hoạch hành động theo giai đoạn)
- `docs/REQUIREMENTS.md` (Ma trận yêu cầu kỹ thuật và nghiệp vụ)
- `docs/ARCHITECTURE.md` (Cập nhật kiến trúc tổng thể sau khi mở rộng)
- `docs/ART_BIBLE.md` (Cẩm nang định hướng nghệ thuật, 2.5D, bảng màu, SVG)
- `docs/CARD_BATTLE_RULES.md` (Quy chuẩn luật đấu bài chiến thuật hóa học)
- `docs/CHEMISTRY_DATA_POLICY.md` (Chính sách chuẩn hóa dữ liệu khoa học GDPT 2018 & IUPAC)
- `docs/QA_STRATEGY.md` (Chiến lược kiểm thử tự động, tích hợp và kiểm thử giao diện)
- `docs/IMPLEMENTATION_STATUS.md` (Bảng theo dõi trạng thái nhiệm vụ thời gian thực)
- `docs/BALANCE_REPORT.md` (Báo cáo cân bằng tướng và cân bằng thẻ bài)
- `docs/PERFORMANCE_REPORT.md` (Báo cáo hiệu năng khung hình 60 FPS)
- `docs/QA_REPORT.md` (Báo cáo tổng kết chất lượng và kiểm thử)
- `docs/RELEASE_NOTES.md` (Ghi chú phát hành phiên bản hoàn thiện)

---

## 4. KẾT LUẬN BASELINE

Hệ sinh thái mã nguồn của ELEMENTA có nền móng kiến trúc vững chắc, toàn bộ test suite ban đầu chạy trơn tru không lỗi, TypeScript build sạch sẽ. Kế hoạch tiếp theo sẽ tập trung vào việc mở rộng dữ liệu chiều sâu (118 nguyên tố, $\ge 300$ chất, $\ge 300$ phản ứng), nâng số lượng tướng lên 12, hoàn thiện chế độ đấu bài chiến thuật, cải tạo giao diện bảng tuần hoàn 18 cột và hoàn tất các cổng nghiệm thu Gate A - Gate F.
