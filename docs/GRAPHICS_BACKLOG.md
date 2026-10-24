# ELEMENTA — DANH MỤC NHIỆM VỤ ĐẠI TU ĐỒ HỌA (GRAPHICS BACKLOG)
## Chiến Dịch: Extreme Visual Overhaul
**Trạng thái:** COMPLETED AUTONOMOUS OVERHAUL (100% Verified)

---

### CÁC MỨC ĐỘ ƯU TIÊN (PRIORITY TIERS)

#### [P0 — NHIỆM VỤ NỀN TẢNG CẤP BÁCH]
- [x] **GB-01: Hệ Thống Hạt Hiệu Suất Cao (High-Performance Particle Engine & Object Pool):**
  - Xây dựng lớp `ParticleEngine` với mảng tĩnh 350 hạt được tái sử dụng hoàn toàn (Zero GC allocation).
  - Hỗ trợ các kiểu hạt: `SPARK`, `SHARD`, `VAPOR`, `FLAME`, `BUBBLE`, `CRYSTAL`, `SHOCKWAVE`.
  - Hỗ trợ co giãn theo vận tốc, điều chỉnh ngân sách hạt tự động theo cấu hình (Ultra: 350, Balanced: 200, Performance: 80).
  - *Đã hoàn thành trong:* `src/game/rendering/particleEngine.ts`, `src/game/rendering/mobaRenderer.ts`.

- [x] **GB-02: Nâng Cấp Tạo Hình Đơn Vị Chiến Đấu (Unit Sprites & Directional Silhouette):**
  - **Lính (Minions):** Phân biệt rõ ràng 3 lớp:
    - *Melee Minion:* Cỗ máy hình cầu bọc giáp titan mang khiên năng lượng hình cánh cung.
    - *Caster Minion:* Cỗ máy bay đệm từ trường lơ lửng với 2 cánh năng lượng phóng đạn ion.
    - *Siege Minion:* Cỗ máy chiến đấu 4 chân hạng nặng mang đại pháo gia tốc hạt.
  - **Trụ Tháp (Turrets):** Tháp hình lục giác công nghệ cao với con quay hồi chuyển vũ trụ xoay tròn (`setLineDash`), lõi thạch anh lơ lửng phát xạ tia laser khóa mục tiêu, gạch đá đổ vỡ khi bị phá hủy.
  - **Căn Cứ (Elemental Cores):** Khối tinh thể đại nguyên tố bát diện khổng lồ lơ lửng trên bệ đá rune phát quang đa tầng.
  - *Đã hoàn thành trong:* `src/game/rendering/mobaRenderer.ts`.

- [x] **GB-03: Đại Tu Bản Đồ Địa Hình & Biome Đa Tầng (Rich Arena Terrain & Caustic Waters):**
  - Bổ sung hoa văn lát đá năng lượng lục giác và đường lát đá kiên cố viền hoa cương cho các làn đường chính Top/Mid/Bot.
  - Sông Ion $H_2O$: Render mặt nước sóng gợn sin đa tầng khúc xạ ánh sáng (water caustics) với nhãn danh pháp dung môi.
  - Bụi rậm che tầm nhìn (Brush): Khóm lá cây sinh học giả kim phát quang với hiệu ứng lay động theo gió và bóng đổ mềm.
  - Tường đá & Vật cản: Khối đá 3D isometric nhiều mặt cắt có đổ bóng tiếp xúc (ambient drop shadow) và vân tinh thể phát sáng.
  - *Đã hoàn thành trong:* `src/game/rendering/mobaRenderer.ts`, `src/game/maps/periodicRiftMap.ts`.

#### [P1 — HIỆU ỨNG CHIẾN ĐẤU & CHIÊU THỨC CHUYÊN SÂU]
- [x] **GB-04: Thư Viện VFX Chiêu Thức & Quầng Nổ Phản Ứng Hóa Học (Chemical Reaction Detonation VFX):**
  - Kích hoạt quầng nổ hạt và sóng chấn động khi xảy ra phản ứng hóa học (`latestReactionAlert`).
  - Vạch nhắm chiêu thức công nghệ cao (Skillshot Aim Decals) theo đường thẳng hoặc bán kính diện rộng với màu chủ đề nguyên tố.
  - *Đã hoàn thành trong:* `src/game/rendering/mobaRenderer.ts`, `src/game/rendering/particleEngine.ts`.

- [x] **GB-05: Nâng Cấp Tạo Hình Quái Rừng & Boss Giám Hộ Xúc Tác:**
  - *Thằn Lằn Axit (Acid Lizard):* Bò sát gai góc có vảy axit clo $Cl^-$, đuôi cử động và lỗ thông hơi khói xanh ăn mòn.
  - *Người Đá Tinh Thể (Crystal Golem):* Khổng lồ đá barite $BaSO_4$ góc cạnh màu ngọc lục bảo với vai nhọn tinh thể.
  - *Boss Giám Hộ Xúc Tác (Catalyst Guardian):* Thể sống nhân tạo cổ xưa với 4 cánh năng lượng bạch kim (Pt) lấp lánh và đòn quét xung kích.
  - *Đã hoàn thành trong:* `src/game/rendering/mobaRenderer.ts`.

#### [P2 — GIAO DIỆN CHIẾN TRƯỜNG & BIỂU TƯỢNG SVG]
- [x] **GB-06: Nâng Cấp Giao Diện HUD Đấu Trường & Bộ Vector Huy Hiệu SVG:**
  - `ElementalCrests.tsx`: Bộ 8 huy hiệu vector độc bản cho 8 tướng (Na, Fe, Cl, Cu, Al, O, H, Ba) phản ánh chính xác cấu trúc lớp vỏ electron Bohr và IUPAC GDPT 2018.
  - `SkillGlyphs.tsx`: Bộ biểu tượng chiêu thức vector hóa học (Thủy Kích, Khiên Xút NaOH, Gỉ Sét, Khí Độc Cl₂, Nhiệt Nhôm, Phóng Điện Cu, Tốc Biến, Hồi Phục, Biến Về).
  - `TargetFrame.tsx`: Khung soi mục tiêu thời gian thực hiển thị tên, HP, giáp, sát thương, công thức phân tử và điểm yếu hóa học.
  - Nâng cấp nút chiêu thức: Quét hồi chiêu vòng tròn SVG (`strokeDasharray`/`strokeDashoffset`), phím tắt công nghệ cao, thanh trạng thái bùa lợi hóa học.
  - Nâng cấp màn hình Draft chọn tướng (`HeroSelectModal.tsx`) với huy hiệu `ElementalCrest`.
  - *Đã hoàn thành trong:* `src/assets/svg/ElementalCrests.tsx`, `src/assets/svg/SkillGlyphs.tsx`, `src/components/moba/TargetFrame.tsx`, `src/components/moba/MobaArenaTab.tsx`, `src/components/moba/HeroSelectModal.tsx`.

#### [P3 — TỐI ƯU HÓA HIỆU SUẤT & HỒ SƠ CHẤT LƯỢNG]
- [x] **GB-07: Bộ Nhớ Đệm Địa Hình & Viewport Culling & Hồ Sơ Chất Lượng:**
  - Tạo canvas đệm `terrainCacheCanvas` (2400x2400) vẽ sẵn hoa văn mặt sân và đường đi một lần duy nhất lúc khởi động.
  - Kiểm tra giới hạn màn hình trước khi gọi hàm vẽ đơn vị (`viewportCulling`).
  - Tích hợp 4 mức thiết lập chất lượng (`ULTRA`, `BALANCED`, `PERFORMANCE`, `reducedMotion`) trong Cài Đặt và nút chuyển nhanh trên HUD.
  - *Đã hoàn thành trong:* `src/game/rendering/mobaRenderer.ts`, `src/storage/localStore.ts`, `src/components/SettingsModal.tsx`, `src/components/moba/MobaArenaTab.tsx`.
