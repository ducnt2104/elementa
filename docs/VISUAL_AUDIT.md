# ELEMENTA — BÁO CÁO KIỂM TOÁN THỊ GIÁC (VISUAL AUDIT)
## Chiến Dịch: Extreme Visual Overhaul
**Ngày kiểm toán:** 2026-10-20  
**Đối tượng:** Đấu trường MOBA Canvas 2D, Giao diện HUD, Nhân vật, Công trình, Quái rừng và Hệ thống VFX

---

### 1. Đánh Giá Hiện Trạng Kiến Trúc Đồ Họa

| Thành Phần Thị Giác | Hiện Trạng Trong Code | Điểm Yếu & Khuyết Điểm Cần Khắc Phục | Mức Độ Ưu Tiên |
| :--- | :--- | :--- | :---: |
| **Bản Đồ & Địa Hình** (`periodicRiftMap.ts`, `mobaRenderer.ts`) | Nền phẳng màu đen obsidian `#080d1a` với lưới vuông xám `#0f1c34`, lòng sông hình đa giác xanh phẳng, đường lính nét stroke đơn giản. | Thiếu chiều sâu, không có chất liệu gạch đá (cobblestone/flagstones), không có phân chia địa chất theo 4 góc phần tư sinh thái hóa học (Acid, Alkaline, Foundry, Crystal). | **P0** |
| **Sông Nước & Bờ Kênh** | Đa giác bán trong suốt tô màu `#06b6d4` với 4 đường sóng sin mảnh. | Nước nhìn phẳng và sơ sài, thiếu hiệu ứng khúc xạ ánh sáng (water caustics), thiếu bờ kè chuyển tiếp giữa đất và nước. | **P1** |
| **Bụi Cỏ & Thảm Thực Vật** | Hình chữ nhật bo góc viền xanh lá `#10b981` với chữ '🌿 Bụi Ẩn'. | Giống khối hộp UI hơn là bụi rậm tự nhiên. Cần vẽ các cụm lá cỏ đa lớp, có đổ bóng tiếp xúc và bóng đổ mềm. | **P1** |
| **Vật Cản & Tường Đá** | Các khối hộp chữ nhật tô màu `#1e293b` với stroke đơn giản. | Trông như các khối lập trình thô. Cần tạo khối đá khoáng sản 3D (Isometric / Top-down Shaded Boulders) với vân tinh thể phát sáng. | **P1** |
| **Trụ Tháp & Căn Cứ Core** | Vòng tròn đồng tâm đơn giản vẽ bằng `ctx.arc()` với bóng mờ `shadowBlur`. | Thiếu tính hoành tráng của công trình MOBA. Cần thiết kế cấu trúc tháp hình lục giác năng lượng cao, có con quay hồi chuyển (orbital gyroscopic rings), lõi pha lê phát sáng, và hiệu ứng nạp năng lượng laser. | **P0** |
| **Lính (Minions)** | Các vòng tròn nhỏ đồng màu đội xanh/đỏ (`arc` bán kính 12-16px). | 3 loại lính (Melee, Ranged, Siege) nhìn giống hệt nhau ngoại trừ bán kính. Cần có hình dáng silhouette rõ rệt: Lính khiên cận chiến, Lính phép phóng cầu xúc tác, và Xe pháo tự hành hạng nặng. | **P0** |
| **Quái Rừng & Boss** | Vòng tròn màu xanh/vàng với tên gọi dạng text. | Thiếu tính sinh động của sinh vật giả kim. Thằn lằn axit $Cl^-$ cần có vảy gai và khói độc; Người đá tinh thể $BaSO_4$ cần các khối tinh thể góc cạnh; Boss Giám Hộ Xúc Tác cần có cánh năng lượng và lõi bạch kim rực lửa. | **P1** |
| **Tướng (Champions)** | Vòng tròn nhân vật có chữ viết tắt và các vòng quay nhỏ (Aura). | Chưa thể hiện được vóc dáng, hướng quay mặt (facing direction), vũ khí và phong cách chiến đấu của từng vị tướng nguyên tố. | **P0** |
| **Hiệu Ứng Chiến Đấu (VFX)** | Các tia đạn `arc()` đơn lẻ và vệt đứt nét; vòng shockwave đơn giản. | Thiếu hệ thống hạt (Particle System) có pooling; thiếu vệt sáng tốc độ (speed-oriented streak trails), hiệu ứng chớp sáng va chạm (impact sparks), và quầng nổ phản ứng hóa học bùng cháy. | **P0** |
| **Tầm Nhắm Chiêu (Telegraphs)** | Decal đơn sắc đỏ/xanh. | Thiếu các vòng cung/nón năng lượng sắc nét hiển thị rõ biên giới vùng sát thương có hoa văn công nghệ cao. | **P1** |

---

### 2. Kế Hoạch Đột Phá Đồ Họa Cốt Lõi
1. **Renderer Upgrade:** Tiếp tục tối ưu Canvas 2D Engine với kỹ thuật **Offscreen Canvas Caching** cho địa hình tĩnh và **Batch Object Pooling** cho hệ thống hạt động.
2. **Terrain & Biomes:** Tạo các bề mặt chất liệu đa lớp (flagstone tiles, rune energy channels, caustic water, volumetric brush).
3. **Unit Art & Directional Facing:** Vẽ các thực thể tướng, lính và quái rừng có hướng nhìn, biểu tượng vũ khí đặc trưng, và chuyển động nhịp nhàng (idle hover & attack recoil).
4. **Cinematic VFX:** Xây dựng `ParticleEngine` chuyên dụng với hiệu ứng hạt plasma, tia lửa điện, khói độc halogen, và sóng xung kích bùng nổ phản ứng nhiệt hóa học.
