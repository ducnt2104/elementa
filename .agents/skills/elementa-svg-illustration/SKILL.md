---
name: elementa-svg-illustration
description: Standards for creating original scalable vector graphics (SVG), atomic diagrams, molecular orbitals, ability icons, HUD meters, and character portraits in ELEMENTA.
---

# ELEMENTA SVG Illustration & Iconography Standards

## 1. Vector Production Standards
- **Precise ViewBox & Aspect Ratio:** Always declare explicit, normalized `viewBox` (e.g. `0 0 100 100` or `-50 -50 100 100` for radial icons).
- **Zero Monolithic Bloat:** Group vector paths logically (`<g id="...">`), reuse definitions with `<defs>`, and avoid redundant embedded raster assets.
- **Controlled Filter Usage:** Limit `feGaussianBlur` and `feDropShadow` to key highlights. Heavy filters in complex SVGs create CPU rendering bottlenecks on mobile devices.
- **Semantic CSS Variables & Tokens:** Wire stroke and fill colors to Tailwind / ELEMENTA design tokens (`cyan-ion`, `coral-reaction`, `copper`, `obsidian`).

## 2. Chemical Iconography Taxonomy
- **Ability Icons (64x64):**
  - Q/W/E/R icons must combine a distinct elemental geometric glyph + dynamic motion swoosh + energy border.
- **Status Effect Badges (24x24):**
  - Shield, haste, slow, burn, corrosion, catalyst, stun badges with high-contrast silhouettes.
- **Scientific Models:**
  - Bohr-Sommerfeld electron shells with rotating orbits.
  - Quantum orbital boxes with Pauli spin arrows ($\uparrow\downarrow$).
  - Chemical bonding models with electron transfer arcs and molecular geometry indicators.
