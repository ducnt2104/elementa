# ELEMENTA — MA TRẬN TRUY VẾT YÊU CẦU & KIỂM KÊ KỸ THUẬT (REQUIREMENTS AUDIT MATRIX)
**Mã Chiến Dịch:** `ELEMENTA-16H-REBUILD-V1`  
**Thời gian bắt đầu:** 2026-10-23T18:02:00+07:00  
**Chế độ điều phối:** `universal-skill-orchestrator` (`MAXIMUM_COVERAGE`)  
**Mục tiêu:** Kiểm kê thực tế, sửa lỗi tận gốc, không dừng sau kế hoạch, vận hành chu kỳ liên tục.

---

## 1. Bảng Kiểm Kê Hiện Trạng & Phân Loại Yêu Cầu

| Mã Yêu Cầu | Hạng Mục & Nội Dung | Trạng Thái Trước Kiểm Tra | Trạng Thái Sau Kiểm Tra | Vị Trí Mã Nguồn Thực Tế | Phương Pháp Kiểm Thử |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **REQ-01** | **Khởi đầu 50 thẻ bài ngẫu nhiên**: Người chơi mới chỉ nhận đúng 50 thẻ, không mở khóa toàn bộ catalog. Lưu vào Player Collection. |  **LỖI** (Đang cấp 3 bản sao của toàn bộ 7.300+ thẻ) |  **HOÀN THÀNH** | `src/storage/localStore.ts`, `TacticalDeckBuilderTab.tsx` | Unit test: `test-starter-pack-50-cards.mjs` (88 tests passed) |
| **REQ-02** | **Khởi đầu đúng 1.000 Token**: Tiền tệ mở khóa độc lập với Mana, Vàng MOBA, XP. Không cấp trùng khi F5. |  **LỖI** (Đang hardcode 500 Token) |  **HOÀN THÀNH** | `src/storage/localStore.ts`, `src/domain/types.ts` | Khởi tạo profile & atomic transaction log `tx_init_starter_pack` |
| **REQ-03** | **Phúc lợi tân thủ & Cửa hàng mở khóa**: Hiển thị gói quà tân thủ, nhiệm vụ hướng dẫn, tiêu Token mở pack. |  **THIẾU** (Chưa có hub phúc lợi tân thủ tập trung) |  **HOÀN THÀNH** | `src/components/shop/BoosterShopTab.tsx` | 10 Free Booster Packs Welfare Banner & Roll Animation |
| **REQ-04** | **Bẫy tự động kích hoạt (Auto Trap Triggers)**: Khi điều kiện xảy ra (tấn công, triệu hồi, phép), game tự phát hiện và kích hoạt bẫy. |  **LỖI** (Người chơi phải tự bấm nút kích hoạt bẫy thủ công) |  **HOÀN THÀNH** | `src/domain/duelEngine.ts` | Test: `test-auto-trap-triggers.mjs` (17 tests passed) |
| **REQ-05** | **Đồng hồ lượt 60 giây (Turn Timer)**: Đếm ngược 60s cho mỗi lượt người chơi trong TCG, tự động chuyển lượt khi timeout. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `src/components/duel/TacticalDuelArenaTab.tsx` | Test đếm ngược & timeout |
| **REQ-06** | **Nút Tái Đấu & Menu Chế Độ Chơi**: Reset sạch state trận cũ, xáo bài, dọn timer, hỗ trợ 6 chế độ chơi. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `src/App.tsx`, `HeroSelectModal.tsx`, `TacticalDuelArenaTab.tsx` | Test rematch 5 lần liên tiếp |
| **REQ-07** | **Đại tu giao diện & Không giật nháy**: Loại bỏ nhấp nháy, chuẩn hóa font tiếng Việt `Be Vietnam Pro`, Card Detail Drawer đầy đủ. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `index.html`, `tailwind.config.js`, `CardScientificInspector.tsx` | Vite build & profiler check |
| **REQ-08** | **Cân bằng MOBA thời gian thực**: 12 tướng IUPAC, 850 HP cơ bản, 750g vàng, giảm sát thương sốc 15%, combat sâu sắc. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `heroesData.ts`, `mobaEngine.ts`, `HeroSelectModal.tsx` | Monte Carlo 66/66 duels (<95% winrate) |
| **REQ-09** | **DCSM & Guardrails Khoa Học GDPT 2018**: Bảo toàn nguyên tố, năng lượng, phản xạ bẫy nhận thức Table 7 & 11. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `redoxEngine.ts`, `dcsmEngine.ts`, `aiGuardrails.ts` | 41/41 Engine tests, 30/30 Guardrail tests |
| **REQ-10** | **Lưu trữ bền vững & Khôi phục**: Dữ liệu Collection, Decks, Tokens không bị mất sau khi refresh hoặc restart. |  **ĐẠT** |  **ĐÃ XÁC MINH** | `src/storage/localStore.ts` | Storage regression test |
| **REQ-11** | **Bóc tách Hai Trụ Cột TCG & MOBA**: Home Hub có 2 cổng vào riêng, TCG Menu 10 mục, MOBA Menu 8 mục, phân tách hoàn toàn. |  **LỖI** (Giao diện bị lẫn lộn giữa TCG và MOBA) |  **HOÀN THÀNH** | `MainMenuTab.tsx`, `TcgMainMenu.tsx`, `MobaMainMenu.tsx` | Test: `test-two-pillars-tcg-moba.mjs` (Section 1-4) |
| **REQ-12** | **Ranked vs AI 60-Card Bot Deck**: Bot tự sinh ngẫu nhiên 60 lá Main + 15 lá Extra từ 7.330+ catalog, không sửa Collection người chơi. |  **LỖI** (Bot dùng deck cố định từ kho bài người chơi) |  **HOÀN THÀNH** | `src/domain/duelEngine.ts` | Test: `test-ranked-ai-max-deck.mjs` (13/13 passed) |
| **REQ-13** | **Shop Nguyên Tố MOBA Tách Rời**: Mua mở khóa tướng với 500 Knowledge Tokens, hoàn toàn tách biệt khỏi thẻ bài TCG. |  **THIẾU** (Chưa có shop tướng MOBA độc lập) |  **HOÀN THÀNH** | `MobaHeroShopModal.tsx`, `src/App.tsx` | Test: `test-two-pillars-tcg-moba.mjs` (Section 6) |
| **REQ-14** | **Phân tách Card Library vs Player Collection**: Kho bài sở hữu 50 lá, thư viện 7.330 lá, deck builder cấm dùng thẻ chưa sở hữu. |  **LỖI** (Hiển thị mập mờ giữa thẻ sở hữu và thư viện) |  **HOÀN THÀNH** | `TacticalCollectionTab.tsx`, `deckManagement.ts` | Test: `test-two-pillars-tcg-moba.mjs` (Section 7) |
| **REQ-15** | **Gỡ bỏ Badge Rác & Khẩu Hiệu Hàn Lâm**: Xóa bỏ các khẩu hiệu tiếp thị "DCSM < 2ms", "Zero P2W", "5 ẢI BOSS", v.v. |  **LỖI** (Giao diện chứa nhiều badge gây rối thị giác) |  **HOÀN THÀNH** | `MainMenuTab.tsx`, `Navbar.tsx` | Test: `test-two-pillars-tcg-moba.mjs` (Section 1) |
| **REQ-16** | **Hệ thống Xếp Hạng Độc Lập**: MMR và bậc hạng bot của TCG và MOBA lưu trữ độc lập trong hồ sơ người chơi. |  **THIẾU** (Chưa kết nối xếp hạng bot sau trận) |  **HOÀN THÀNH** | `src/App.tsx`, `rankedSystem.ts` | Test: `test-two-pillars-tcg-moba.mjs` (Section 8) |

---

## 2. Kế Hoạch Thực Thi Theo Giai Đoạn (16H Phased Execution)
- **Giai đoạn 1 (Giờ 0–2):** Triển khai REQ-01, REQ-02, REQ-03 (50 lá khởi đầu, 1.000 Token, Phúc lợi tân thủ, khóa catalog chưa sở hữu).
- **Giai đoạn 2 (Giờ 2–5):** Triển khai REQ-04 (Event-Driven Automatic Trap Trigger Engine trong `duelEngine.ts`).
- **Giai đoạn 3 (Giờ 5–8):** Tối ưu hóa UI/UX TCG, Card Detail, Deck Builder nhiều bộ bài chỉ dùng thẻ sở hữu.
- **Giai đoạn 4 (Giờ 8–11):** Rà soát MOBA 12 tướng, minimap, combat log và tích hợp hóa học thời gian thực.
- **Giai đoạn 5 (Giờ 11–14):** Viết bộ kiểm thử toàn diện, kiểm thử biên, kiểm thử tải và ngăn chặn hồi quy.
- **Giai đoạn 6 (Giờ 14–16):** Quality Gate, Build production, tạo hướng dẫn chạy và tài liệu bàn giao.
