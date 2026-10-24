---
name: elementa-moba-environment-art
description: Procedures for rendering top-down 2D/2.5D MOBA battlefield environments, multi-layered terrain, water caustics, volumetric foliage, atmospheric lighting, and obstacle depth in ELEMENTA.
---

# ELEMENTA MOBA Environment Art Engineering

## 1. Map Layout & Biome Architecture
The **Periodic Rift (2400x2400 map)** is divided into four distinct geological quadrants:
1. **Blue Radiant Bastion (Góc Tây Nam - Căn Cứ Lam):** Polished obsidian flagstones, cyan energy conduits, pristine crystalline masonry.
2. **Red Crucible Core (Góc Đông Bắc - Căn Cứ Hỏa):** Thermite-scorched basalt plates, crimson magma channels, forged industrial metal joints.
3. **Thung Lũng Sông Ion H₂O (Trung Tâm Chéo):** Diagonally cutting river channel with dynamic wave interference, water caustics, and chemical solvent properties.
4. **Jungle Quadrants (Rừng Nguyên Sinh Hóa Tinh):**
   - *North Jungle (Acid Marshes):* Corrosive green pools, lichen-covered boulders, Acid Lizard habitat.
   - *South Jungle (Crystal Quarry):* Heavy barite crystal formations, mineral veins, Crystal Golem habitat.
   - *River Pits (Baron / Dragon pits equivalent):* Catalyst Guardian boss platform with hexagonal catalytic runic seals.

## 2. Terrain Rendering Techniques (Canvas 2D / WebGL)
- **Offscreen Canvas Caching:** Static terrain (base tiles, road outlines, stone flagstones) must be pre-rendered into an offscreen buffer at high resolution and blitted (`drawImage`) to eliminate thousands of primitive draw calls per frame.
- **Dynamic Water Caustics:** Animated multi-sine wave interference with opacity layers (`rgba(6, 182, 212, 0.15)` to `0.35`) simulating light refraction on river shallows.
- **Foliage & Volumetric Brush:** Instead of flat green rectangles, brushes are rendered with overlapping leaf clusters, ambient occlusion drop shadows, and subtle swaying wind displacement.
- **Obstacle Shading:** Boulders and pillars rendered with top-down 3D bevels, ambient occlusion base contact shadows, and glowing crystal core veins.

## 3. Visual Navigation & Pathfinding Clarity
- Ground markings must clearly indicate passable vs impassable zones.
- Lane center guides feature pulsing energy dashes directed from base toward the enemy core.
- Turret True Sight and attack boundaries must be clearly visible via subtle ground projection rings without cluttering the screen.
