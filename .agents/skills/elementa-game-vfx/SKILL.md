---
name: elementa-game-vfx
description: High-performance particle engine, combat impact VFX, ability telegraph decals, chemical reaction explosions, and projectile shaders for ELEMENTA MOBA.
---

# ELEMENTA Game VFX & Particle Engineering

## 1. Core VFX Architecture
All visual effects in ELEMENTA must strictly observe:
1. **Decoupled Simulation:** Visual effects are purely visual representations of deterministic gameplay events resolved in `mobaEngine.ts`. VFX never alter damage, physics, or reaction outcomes.
2. **Layered Construction Pipeline:**
   - **Phase 1: Telegraph / Anticipation (0.1 - 0.4s):** Ground decals, channeling particles, charging sound.
   - **Phase 2: Cast & Projectile (Flight):** Directional projectile with velocity-aligned trail particles and light crown.
   - **Phase 3: Impact Burst (0.2 - 0.5s):** Dynamic radial shockwave ring, flash bloom, and secondary debris.
   - **Phase 4: Chemical Reaction Detonation (Optional):** If a valid chemical reaction triggers (e.g. $2Na + 2H_2O$), spawn an elemental reaction explosion with formula text, screen shake trauma, and residual smoke.
   - **Phase 5: Cleanup & Return to Pool:** Particles expire deterministically and are recycled.

## 2. Particle Object Pooling
To prevent Garbage Collector (GC) stalls in 60 FPS combat:
- Maintain a pre-allocated pool of 300 `Particle` objects.
- Never instantiate `new Object()` inside the 60 Hz animation loop.
- Use simple particle structs: `{ x, y, vx, vy, size, startSize, color, alpha, life, maxLife, decayRate, blendMode }`.

## 3. Ability Telegraph Decals
- **Linear Skillshot Decal:** Tapered line indicator pointing from hero toward mouse coordinates, with glowing border and width matching projectile radius.
- **Circular AoE Decal:** Expanding shockwave circumference with filled semi-transparent zone indicating damage boundary.
- **Conic Decal:** Sector projection for cone attacks with angle sweep.
