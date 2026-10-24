---
name: elementa-rendering-performance
description: Performance profiling, Canvas 2D / WebGL optimization, viewport culling, object pooling, and multi-tier quality profiles for ELEMENTA MOBA.
---

# ELEMENTA Rendering Performance & Optimization

## 1. Frame-Rate Budget & Latency Targets
- **Target Frame Rate:** Stable 60 FPS (16.6ms per frame budget) across desktop, tablet, and mid-tier mobile.
- **Garbage Collection Optimization:** 0 allocations per frame inside `render()` and `update()`.
- **Canvas State Churn:** Minimize redundant `ctx.save()` / `ctx.restore()` and context switches.

## 2. Essential Optimization Patterns
1. **Viewport Culling:**
   - Units (minions, heroes, monsters, projectiles, obstacles) whose bounding radius is completely outside the screen viewport (padded by 80px) are culled before issuing drawing commands.
2. **Offscreen Canvas Caching:**
   - Static map geometry (grid, background, paths, river base) is pre-drawn into an offscreen canvas and blitted with a single `drawImage` call.
3. **Adaptive Quality Profiles:**
   - **HIGH:** Full particle budget (300 particles), dynamic screen shake, soft shadows, water ripples, detailed signature auras.
   - **BALANCED:** Standard particle budget (150 particles), restrained screen shake, crisp outlines.
   - **PERFORMANCE:** Capped particle budget (50 particles), disabled ambient ripples, simplified unit tokens.
   - **REDUCED MOTION:** Zero screen shake, static status indicators, no flashing effects.
