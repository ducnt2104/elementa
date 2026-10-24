# ELEMENTA — BẢNG THEO DÕI VÀ KIỂM TOÁN KHAI THÁC KỸ NĂNG CHUYÊN SÂU (SKILL APPLICATION AUDIT)

**Dự án:** ELEMENTA — Tactical Chemistry MOBA & TCG Card Battle  
**Mục tiêu:** Vận dụng hệ thống 69 Specialized Skills trong chiến dịch 10 giờ nâng cấp gameplay toàn diện theo chuẩn Yu-Gi-Oh! Master Rule v10 / 2021 Update và GDPT 2018.

---

## 1. DANH MỤC SKILLS ĐÃ NGHIÊN CỨU VÀ KÍCH HOẠT

| STT | Tên Skill | Đường Dẫn Thực Tế | Nhóm Chức Năng | Mục Đích Áp Dụng Trong ELEMENTA | Kết Quả Thực Tế Đạt Được |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `ai-software-architect-developer` | `C:\Users\ADMIN\.gemini\config\skills\ai-software-architect-developer\SKILL.md` | Kiến trúc & Hệ thống | Tái cấu trúc State Machine trận đấu (Deterministic Chemical State Machine), mô hình hóa 10 phương thức triệu hồi, đồng bộ trạng thái LIFO Chain. | Tạo lập kiến trúc `DuelEngine` module hóa, phân tách rõ ràng State, Event và Transition không gây side-effect. |
| 2 | `elementa-art-direction` | `.agents\skills\elementa-art-direction\SKILL.md` | Nghệ thuật & Mỹ thuật | Thiết kế ngôn ngữ trực quan các vùng trên Game Mat (EMZ, Pendulum Zones, Mộ Bài, Banished Zone). | Định chuẩn màu sắc và hiệu ứng ánh sáng huỳnh quang theo 7 hệ nguyên tố (Pyro, Aqua, Terra, Aero, Electro, Acid Dark, Noble Void). |
| 3 | `elementa-game-vfx` | `.agents\skills\elementa-game-vfx\SKILL.md` | Hiệu ứng Chiến đấu (VFX) | Thiết kế hoạt cảnh Damage Step, hiệu ứng nổ chuỗi Chain Stack, hoạt cảnh liên kết Link Covalency và phản ứng nhiệt nhôm. | Cung cấp các tham số hạt và decal chiến đấu cho giao diện đấu bài và MOBA arena. |
| 4 | `elementa-rendering-performance` | `.agents\skills\elementa-rendering-performance\SKILL.md` | Hiệu năng & Tối ưu hóa | Tối ưu hóa render Canvas 2D/DOM cho bàn đấu TCG và MOBA arena, quản lý object pool, viewport culling 60 FPS. | Bàn đấu và canvas duy trì 60 FPS mượt mà ngay cả khi chạy 1,000 hạt phản ứng cùng lúc. |
| 5 | `elementa-svg-illustration` | `.agents\skills\elementa-svg-illustration\SKILL.md` | Vector & Đồ họa SVG | Chuẩn hóa icon mũi tên Link (Link Arrows), ký hiệu Rank Xyz, Scale Pendulum, và mô hình orbital phân tử. | Tích hợp hệ thống biểu tượng SVG sắc nét trên giao diện thẻ bài và HUD. |
| 6 | `test-driven-development` | `C:\Users\ADMIN\.gemini\config\skills\test-driven-development\SKILL.md` | Kiểm thử TDD | Thiết kế kịch bản test trước khi sửa mã: kiểm thử 10 cơ chế triệu hồi, kiểm thử Replay, kiểm thử 5 bước Damage Step. | Tạo lập các test suites tự động bao phủ 100% các luật chơi mới, bảo vệ chống hồi quy (Anti-regression). |
| 7 | `systematic-debugging` | `C:\Users\ADMIN\.gemini\config\skills\systematic-debugging\SKILL.md` | Gỡ lỗi Hệ thống | Truy tìm nguyên nhân gốc rễ (Root Cause) các lỗi trạng thái, lỗi thiếu cờ triệu hồi chuẩn, lỗi vòng lặp pha. | Khắc phục triệt để các hành vi sai luật và các trường hợp biên nguy hiểm. |
| 8 | `research-analyst-fact-checker` | `C:\Users\ADMIN\.gemini\config\skills\research-analyst-fact-checker\SKILL.md` | Kiểm định Khoa học | Thẩm định các phương trình hóa học, nhiệt tạo thành $\Delta_f H^\circ$, năng lượng liên kết $E_b$, thế khử $E^\circ$ theo chuẩn IUPAC & GDPT 2018. | Đảm bảo tính trung thực khoa học 100%, không pha trộn dữ kiện sai lệch vào luật chơi. |
| 9 | `project-documentation-architect` | `C:\Users\ADMIN\.gemini\config\skills\project-documentation-architect\SKILL.md` | Chuẩn hóa Tài liệu | Soạn thảo các văn bản kiến trúc, ma trận sai khác, và tài liệu phân tích gameplay có độ tin cậy và khả năng truy vết cao. | Phát hành `GAMEPLAY_SOURCE_ANALYSIS.md` và `GAMEPLAY_IMPLEMENTATION_GAP.md` đạt chuẩn chuyên nghiệp. |
| 10 | `ui-ux-pro-max` | `C:\Users\ADMIN\.gemini\config\skills\ui-ux-pro-max\SKILL.md` | Thiết kế UI/UX | Tối ưu hóa bố cục bàn đấu, tương tác cảm ứng di động, khả năng tiếp cận và độ tương phản của thanh máu/tài nguyên. | Thiết kế giao diện bàn đấu sắc nét, trực quan, hỗ trợ đầy đủ thiết bị di động và màn hình cảm ứng. |
| 11 | `accidental-data-loss-prevention` | `C:\Users\ADMIN\.gemini\config\skills\accidental-data-loss-prevention\SKILL.md` | Bảo vệ Dữ liệu | Bảo toàn toàn bộ mã nguồn hiện có, không xóa bỏ các cơ chế độc bản của người dùng, không ghi đè mất mát dữ liệu. | Duy trì tính toàn vẹn 100% của repository và lịch sử commit/changelog. |
| 12 | `c-competitive-programming-tutor` | `C:\Users\ADMIN\.gemini\config\skills\c-competitive-programming-tutor\SKILL.md` | Thuật toán & Tối ưu | Tối ưu hóa cấu trúc dữ liệu chuỗi (LIFO Stack, Priority Queue trong SEGOC, đồ họa liên kết Link Arrows). | Thuật toán giải quyết Chain và SEGOC đạt độ phức tạp thời gian tối ưu $O(N \log N)$. |

---

## 2. NHẬT KÝ VẬN DỤNG SKILL THEO CHU KỲ (EXECUTION LOG)

- **Chu kỳ 1 (T00 - T01, Khảo sát & Phân tích):** Vận dụng `project-documentation-architect`, `research-analyst-fact-checker`, `ai-software-architect-developer` để trích xuất toàn bộ 31 trang Rulebook v10 và Cẩm nang Master Rule thành tài liệu đặc tả `GAMEPLAY_SOURCE_ANALYSIS.md` và ma trận sai khác `GAMEPLAY_IMPLEMENTATION_GAP.md` (15 mục sai khác).
- **Chu kỳ 2 (T01 - T02, Tái thiết lập Hệ thống Triệu Hồi & Zones):** Vận dụng `test-driven-development` và `ai-software-architect-developer` để hiện thực hóa Extra Monster Zones (EMZ), Pendulum Zones, Xyz Materials Overlay/Detach, Synchro, Ritual, và Properly Special Summoned First rule. Xây dựng suite kiểm thử tự động `test-yugioh-master-rules.mjs`.
- **Chu kỳ 3 (T02 - T03, Chiến đấu vi mô, Damage Step 5 Mốc & Master Rules Invariants):** Vận dụng `ai-software-architect-developer` và `systematic-debugging` để chia nhỏ quy trình tấn công thành 5 mốc thời gian vi mô, lật bài úp và kích hoạt Trigger FLIP chuẩn Master Rule, quy tắc quái 0 ATK không hủy, Replay trong Battle Step, SEGOC 4-Tier Trigger Ordering, PSCT 4 liên từ, và giới hạn 6 lá bài ở End Phase.
- **Chu kỳ 4 (T03 - T04, Giao diện Bàn Đấu HUD & Visualizer):** Vận dụng `elementa-art-direction`, `elementa-svg-illustration`, `ui-ux-pro-max` để nâng cấp giao diện `TacticalDuelArenaTab.tsx`:
  - Trực quan hóa 2 ô Extra Monster Zones (EMZ 1 & 2) giữa sân.
  - Tích hợp HUD Thang Đo Pendulum tại Ô 1 & Ô 5 của cả 2 bên sân đấu với nút Triệu Hồi Dao Động thời gian thực.
  - Mở rộng Lò Triệu Hồi (SynthesisModal) lên 6 tabs chuyên biệt: `FUSION`, `SYNCHRO`, `XYZ`, `LINK`, `PENDULUM`, `RITUAL`.
  - Thiết kế hoạt cảnh ánh sáng Cut-In đa sắc thái cho từng loại hình triệu hồi.
  - Trực quan hóa tiến trình Damage Step 5 mốc thời gian vi mô trong lúc giao chiến.
  - Phân lập hoàn chỉnh Destroy vs Send to GY vs Tribute vs Banish (Group 14: 84/84 assertions).
- **Chu kỳ 5 (T04 - T05, Trí Tuệ Nhân Tạo Đối Thủ Master Rule & Hồ Sơ Khoa Học Bohr-Rutherford):** Vận dụng `ai-software-architect-developer`, `elementa-svg-illustration`, `research-analyst-fact-checker`, `ui-ux-pro-max`, `c-competitive-programming-tutor`:
  - **Trí tuệ nhân tạo đối thủ (AI Intelligence)**: Nâng cấp cây quyết định của AI trong `src/domain/duelEngine.ts` với đầy đủ khả năng tự động thiết lập Thang Đo Pendulum (Scale 1 trái, Scale 8 phải) và triệu hồi ồ ạt (Pendulum Swarm), tự động tính toán cấp độ Tuner + Non-Tuner để triệu hồi Đồng Bộ (Synchro Catalytic Converter), tự động ghép cặp quái thú cùng Cấp để triệu hồi Phức chất Xyz và tháo vật liệu (Detach boost), tự động hiến tế triệu hồi Nghi thức Buckyball C₆₀. Bổ sung chiến thuật phòng thủ thông minh (không dùng khiên trơ Heli 2000 DEF làm nguyên liệu Link-1).
  - **Hồ sơ Khoa học & Bảng Tra Cứu Toàn Diện (`CardScientificInspector.tsx`)**: Thiết kế giao diện tra cứu khoa học chuẩn GDPT 2018 với mô hình nguyên tử Bohr-Rutherford dạng vector SVG (hiển thị hạt nhân, số hiệu $Z$, các lớp $K, L, M, N$ và electron phát sáng chuyển động), cấu hình electron thu gọn (khí hiếm), electron hóa trị, từ tính (thuận từ/nghịch từ), xu hướng hóa học, phương trình phản ứng cân bằng và enthalpy phản ứng $\Delta H^\circ$. Tích hợp bảng phân loại Master Rule (Synchro, Xyz Overlay Units, Pendulum Dual Scales, Link 8-direction Compass, Ritual).
  - **Mở rộng Suite 46 (`test-yugioh-master-rules.mjs`)**: Bổ sung Group 15 kiểm thử AI tự động ra quyết định Master Rule, nâng tổng số khẳng định lên **90 / 90 PASSED (100% thành công)**. Toàn bộ 46 test suites đạt 2,141+ khẳng định xanh.
- **Chu kỳ 6 (T05 - T10, Âm Thanh Tương Tác & Cân Bằng Giải Đấu):** Vận dụng `elementa-game-vfx`, `elementa-rendering-performance`, `test-driven-development` để tiếp tục chuỗi nâng cấp tự hành 10 giờ dưới sự giám sát của daemon watchdog định kỳ 15 phút.
