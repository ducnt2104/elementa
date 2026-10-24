# ELEMENTA — MA TRẬN YÊU CẦU KỸ THUẬT VÀ NGHIỆP VỤ (REQUIREMENTS TRACEABILITY MATRIX)
**Phiên bản:** 2.0.0-RELEASE  
**Tiêu chuẩn:** GDPT 2018 • IUPAC Blue/Gold Book • Modern 2.5D Web Gaming  

---

## 1. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS - REQ-F)

| Mã Yêu Cầu | Tên Yêu Cầu | Mô Tả Chi Tiết | Module Phụ Trách | Test Tự Động Kiểm Chứng | Cổng Nghiệm Thu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-F01** | Bảng Tuần Hoàn Đủ 118 Nguyên Tố | Cung cấp đầy đủ 118 nguyên tố hóa học từ H (Z=1) đến Og (Z=118) với thông số IUPAC thực tế, không dùng placeholder rỗng. | `src/data/elementsData.ts`, `src/components/PeriodicCodexTab.tsx` | `test-chemistry-data.mjs` (TC-ELEM-118) | **Gate B** |
| **REQ-F02** | Bảng Tuần Hoàn 18 Cột Chuẩn | Hiển thị bảng tuần hoàn theo layout chuẩn 18 cột (nhóm IA - VIIIA), 7 chu kì, dải họ Lantan và Actini độc lập phía dưới. | `src/components/PeriodicCodexTab.tsx` | Kiểm tra render layout & vị trí nhóm/chu kì | **Gate B, E** |
| **REQ-F03** | Danh Mục Chất Hóa Học $\ge 300$ Chất | Kho dữ liệu chứa tối thiểu 300 chất được phân loại (đơn chất, oxide, acid, base, muối, hydrocarbon, dẫn xuất hữu cơ) có khối lượng mol và trạng thái. | `src/data/substancesData.ts` | `test-chemistry-data.mjs` (TC-SUB-300) | **Gate B** |
| **REQ-F04** | Kho Phản Ứng Hóa Học $\ge 300$ Phương Trình | Kho dữ liệu chứa tối thiểu 300 phản ứng hóa học có nguồn trích dẫn, kiểm chứng bảo toàn nguyên tử và điện tích 100%. | `src/data/reactionsData.ts` | `test-chemistry-data.mjs` (TC-RX-300) | **Gate B** |
| **REQ-F05** | Bộ Cân Bằng Phương Trình Bằng Thuật Toán | Parser phân tích công thức lồng ngoặc và thuật toán đại số cân bằng phương trình hóa học, giải thích từng bước. | `src/domain/equationBalancer.ts`, `src/components/chemistry/ChemicalCalculatorModal.tsx` | `test-engine.mjs`, `test-chemistry-calculator.mjs` | **Gate B** |
| **REQ-F06** | Đấu Trường MOBA 12 Tướng Nguyên Tố | Tối thiểu 12 tướng có thể điều khiển với đầy đủ 4 kỹ năng chủ động + nội tại, chỉ số cân bằng, âm thanh và huy hiệu SVG riêng biệt. | `src/game/data/heroesData.ts`, `src/game/engine/mobaEngine.ts` | `test-moba.mjs` (TC-HERO-12) | **Gate C** |
| **REQ-F07** | Bản Đồ MOBA 3 Đường Thung Lũng Liên Kết | Bản đồ 2400x2400 với 12 trụ tháp, 2 căn cứ Elemental Core, lính 3 lớp ra mỗi 25s, quái rừng aggro, Boss Giám Hộ Xúc Tác. | `src/game/maps/periodicRiftMap.ts`, `src/game/rendering/mobaRenderer.ts` | `test-moba.mjs` (TC-MAP-SIM) | **Gate C** |
| **REQ-F08** | AI Bot MOBA 3 Cấp Độ Khó | AI bot có 3 cấp độ (Novice, Standard, Challenger) với hành vi ra quyết định thông minh: farm lính, combo kỹ năng, né đạn, rút lui an toàn. | `src/game/ai/mobaBotAi.ts` | `test-moba.mjs` (TC-BOT-AI) | **Gate C** |
| **REQ-F09** | Đấu Thẻ Bài Chiến Thuật (Card Battle) | Chế độ đấu bài theo lượt hoàn chỉnh: rút bài, triển khai nguyên tố/hợp chất, kích hoạt phản ứng hóa học, quản lý mana, chuỗi hiệu ứng. | `src/domain/battleEngine.ts`, `src/components/BattleArenaTab.tsx` | `test-card-battle.mjs` (TC-CARD-FLOW) | **Gate D** |
| **REQ-F10** | Trình Chỉnh Sửa Bộ Bài (Deck Builder) | Tạo và lưu trữ bộ bài 10 thẻ hợp lệ, phân tích hiệp đồng phản ứng (Synergy Analyzer) và kiểm tra tính hợp lệ trước trận đấu. | `src/components/DeckBuilderTab.tsx` | `test-engine.mjs` | **Gate D** |
| **REQ-F11** | Ôn Tập Ngắt Quãng CA-SRS & Bảng Giáo Viên | Thuật toán ôn tập thích ứng phân tầng theo 3 cấp độ lỗi nhận thức (Nhận biết, Thông hiểu, Vận dụng) và bảng phân tích bản đồ nhiệt lỗi cho giáo viên. | `src/domain/spacedRepetition.ts`, `src/components/DailySrsTab.tsx`, `src/components/TeacherDashboardTab.tsx` | `test-engine.mjs` (TC-SRS-INTERVALS) | **Gate F** |
| **REQ-F12** | Lưu Trữ Tiến Trình & Hoạt Động Offline | Lưu trạng thái người chơi, bộ bài, điểm kinh nghiệm và hỗ trợ PWA Service Worker chạy 100% offline không cần internet. | `src/storage/localStore.ts`, `public/sw.js` | Kiểm tra tải lại trang bảo toàn dữ liệu | **Gate A, F** |

---

## 2. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS - REQ-NF)

| Mã Yêu Cầu | Tên Yêu Cầu | Tiêu Chuẩn Kỹ Thuật | Phương Thức Đo Lường | Cổng Nghiệm Thu |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-NF01** | Hiệu Năng 60 FPS Ổn Định | Duy trì 60 FPS (16.6ms/khung hình) trên canvas chiến đấu MOBA và animation. | `mobaRenderer.ts` frame timer & Performance Profile | **Gate E** |
| **REQ-NF02** | Không Rác Bộ Nhớ (Zero GC Allocation) | Sử dụng Object Pooling cho hệ thống hạt (350 hạt tĩnh) và đạn đạo, không `new` đối tượng trong vòng lặp 60Hz. | `particleEngine.ts` pool auditing | **Gate E** |
| **REQ-NF03** | Đồ Họa 2.5D Chiều Sâu & Ánh Sáng | Render bóng tiếp xúc (ambient occlusion), gradient chiều cao, vệt đạn định hướng, sóng nước caustics. | Visual inspection & `mobaRenderer.ts` | **Gate E** |
| **REQ-NF04** | An Toàn Dữ Liệu Khoa Học | Dữ liệu hóa học đối chiếu với IUPAC, GDPT 2018; phân định rõ giữa dữ kiện thực nghiệm và hư cấu hóa gameplay. | `CHEMISTRY_DATA_POLICY.md` | **Gate B** |
| **REQ-NF05** | Kiểm Thử Hóa Tự Động 100% Pass | Tất cả các bộ kiểm thử unit, integration, và catalog đều phải pass 100%, không che lỗi, không bỏ qua test. | `npm test` exit code 0 | **Gate F** |
| **REQ-NF06** | Khả Năng Tương Thích & Phản Hồi | Giao diện tương thích từ mobile (360px) đến desktop 4K, hỗ trợ tùy chọn Giảm Chuyển Động (Reduced Motion). | Responsive CSS & Settings profile | **Gate E** |
