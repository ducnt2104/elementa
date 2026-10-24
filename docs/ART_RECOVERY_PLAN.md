# KẾ HOẠCH NÂNG CẤP ĐỒ HỌA & THẨM MỸ 2.5D (ART RECOVERY PLAN)
**Dự án:** ELEMENTA — Tactical Chemistry & 2.5D MOBA Arena  
**Thời điểm:** 21/10/2026  
**Chuyên gia:** Lead Technical Artist & 2.5D Rendering Engineer  

---

## 1. MỤC TIÊU NÂNG CẤP MỸ THUẬT

Chuyển đổi hoàn toàn giao diện và chiến trường từ dạng 2D phẳng thành một **Đấu trường Chiến thuật Khoa học Kỳ ảo 2.5D sống động (Living Sci-Fi Crucible)** với:
1. Chiều sâu không gian đa tầng (Multi-layer spatial depth).
2. Phản hồi đòn đánh và va chạm rõ ràng (Punchy hit impacts & visual juice).
3. Thanh máu chuẩn mực MOBA quốc tế (Segmented health bars with 100 HP ticks & last-hit indicators).
4. Đường truyền kỹ năng trực quan (Animated telegraph decals).
5. Môi trường giàu chi tiết (Volumetric foliage, water caustics, floating quartz crystal turrets).

---

## 2. KIẾN TRÚC RENDER 2.5D CANVAS ĐA PHÂN LỚP

```
[Layer 0: Celestial Rift Floor] — Hexagonal obsidian micro-tiles & energy grid
   ↓
[Layer 1: Road & Terrain Flagstones] — 3D-beveled stone curbs, blue/red energy conduits
   ↓
[Layer 2: Water Channel] — Dynamic multi-frequency sine wave caustics & ripple reflections
   ↓
[Layer 3: Ground Decals] — Move ping rings, telegraph aim decals, chemical reaction circles
   ↓
[Layer 4: Units & Entities] — Minions, neutral monsters, heroes with directional shadows & auras
   ↓
[Layer 5: Foliage & Bushes] — Multi-leaf volumetric clusters with ambient occlusion contact shadows
   ↓
[Layer 6: Structural Objectives] — Turrets with floating bobbing quartz emitters, Core astrolabes
   ↓
[Layer 7: Projectiles & VFX Particles] — Glowing cores, motion blur tails, explosion shockwaves
   ↓
[Layer 8: Tactical Health Bars] — 100-HP notches, shield overlays, level badges, CC labels
   ↓
[Layer 9: Floating Combat Text] — Bouncy damage numbers, chemical reaction banners
   ↓
[Layer 10: Screen Space FX] — Fog of War shroud, Kill announcement banners, HUD overlays
```

---

## 3. QUY CHUẨN THANH MÁU CHUẨN MOBA QUỐC TẾ (SEGMENTED HEALTH BARS)

### 3.1. Phân chia vạch 100 HP (Notches)
- Mỗi 100 HP máu tối đa được phân cách bằng một đường kẻ dọc màu đen/xám mỏng (`lineWidth = 1`).
- Mỗi 1,000 HP máu tối đa được phân cách bằng một vạch dày hơn màu đen đậm để người chơi nhận diện nhanh lượng máu của Tanker.
- Màu sắc:
  - Đồng minh / Người chơi: `#10b981` (Xanh ngọc lục bảo).
  - Kẻ địch: `#ef4444` (Đỏ cảnh báo).
  - Quái rừng / Trung lập: `#f59e0b` (Vàng hổ phách).
  - Khiên hộ mệnh (Shield Overlay): Dải màu xám bạc ánh kim `#e2e8f0` phủ đè lên phía trước thanh máu.

### 3.2. Chỉ báo Last-Hit Kết liễu Lính (Minion Last-Hit Indicator)
- Khi lượng máu hiện tại của lính nhỏ hơn hoặc bằng sát thương đòn đánh của tướng người chơi (`minion.hp <= playerHero.attackDamage`), thanh máu của lính lập tức phát sáng viền vàng kim `#fef08a` và chuyển màu rực rỡ, báo hiệu cho người chơi tung đòn đánh thường để ăn tiền thưởng vàng và kinh nghiệm.

### 3.3. Huy hiệu Cấp độ Tướng (Hero Level Badge)
- Đặt tại góc trái của thanh máu với hình tròn viền kim loại, nền `#0f172a`, hiển thị con số cấp độ hiện tại (1 - 18) màu vàng sáng.

---

## 4. BỘ HIỆU ỨNG CHIÊU THỨC & DECAL ĐỊNH HƯỚNG (TELEGRAPH DECALS)

1. **Skillshot Line Decal (Đường Thẳng):**
   - Vệt năng lượng phát sáng kéo dài từ chân tướng tới tọa độ chuột.
   - Vạch mũi tên hình chevron (`>>>`) di chuyển liên tục dọc theo vệt đường ngắm, mô tả chính xác hướng bay và bề rộng va chạm của đường đạn.
2. **Skillshot AoE Decal (Vùng Tròn):**
   - Vòng tròn bán kính tác động với đường viền xoay phát sáng và lớp phủ mờ bên trong (`fillOpacity = 0.2`).
   - Tâm ngắm crosshair ở chính giữa hiển thị điểm ngắm chính xác.
3. **Attack Range Decal (Vòng Tầm Đánh Phím A):**
   - Khi bấm phím `A`, hiển thị vòng tròn tầm đánh thường của tướng màu xanh lam ngọc `#00f0ff` viền nét đứt nhẹ, giúp người chơi căn khoảng cách thả diều (kiting) hoàn hảo.

---

## 5. PHẢN HỒI VA CHẠM (HIT IMPACTS & JUICE)

- **Chớp trắng mục tiêu (`flashTime`):** Khi một đơn vị nhận sát thương, toàn bộ thân hình của đơn vị đó chớp sáng trắng trong 0.08 giây (`globalCompositeOperation = 'lighter'`), mang lại cảm giác đòn đánh cắm sâu và có lực.
- **Tia lửa hạt (Hit Sparks):** Phát ra từ 6-12 tia lửa hạt văng ra theo hướng ngược lại với đòn tấn công khi trúng đích.
- **Rung màn hình (Screen Shake):** Kích hoạt rung chấn từ 4 đến 12px tùy theo mức độ sát thương của chiêu cuối hoặc phản ứng nổ hóa học.
