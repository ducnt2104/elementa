# ELEMENTA — Art Direction & Visual Design Bible
**Project:** ELEMENTA — Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** ART-BIBLE-v2.0  
**Generated Date:** 2026-10-21  

---

## 1. Visual Philosophy: "Scientific Cyberpunk Alchemy"
ELEMENTA combines the clinical precision of modern laboratory instrumentation with the vivid, atmospheric aesthetics of cyberpunk neon and classical alchemy.

The visual language communicates that chemistry is not dry text on paper, but energetic, high-stakes elemental combat.

---

## 2. Color Palette & Elemental Design Tokens

| Elemental Affinity | Primary Token | Gradient Hex | Aesthetic Inspiration |
| :--- | :--- | :--- | :--- |
| **PYRO (Hỏa / Kiềm)** | Bright Amber / Crimson | `#ff5722` \(\rightarrow\) `#b71c1c` | Sodium water explosion, Bunsen flame |
| **AQUA (Thủy / Axit)** | Deep Cerulean / Cyan | `#00bcd4` \(\rightarrow\) `#0d47a1` | Aqueous copper sulfate solution, liquid nitrogen |
| **AERO (Phong / Khí)** | Viridian / Neon Lime | `#00e676` \(\rightarrow\) `#1b5e20` | Chlorine gas, atmospheric ozone |
| **ELECTRO (Lôi / Kim)** | High-Voltage Violet | `#e040fb` \(\rightarrow\) `#4a148c` | Potassium purple flame, plasma discharge |
| **TERRA (Địa / Khoáng)** | Gilded Ochre / Slate | `#ffc107` \(\rightarrow\) `#ff6f00` | Crystalline pyrite, barium precipitates |
| **NOBLE VOID (Hư Không)** | Ethereal Iridescent Platinum | `#e0f7fa` \(\rightarrow\) `#37474f` | Noble gas discharge tubes, diamond lattice |

---

## 3. Vertical Rectangular Card Standard (5:7 Aspect Ratio)
All playable cards adhere strictly to the 5:7 vertical aspect ratio:
- **Header:** Level / Link Rating stars, Elemental Attribute icon, and Card Name.
- **Card Art Frame:** Central visual depicting the element in action or the balanced synthesis event.
- **Lore & Stats Box:**
  - Standard IUPAC badges (Atomic number \(Z\), standard mass, Pauling electronegativity).
  - Balanced pedagogical equation formatted with subscript typography (\(2Na + 2H_2O \rightarrow 2NaOH + H_2\)).
  - Card effect text with keywords highlighted in gold.
  - ATK and DEF values prominently positioned at the bottom corners.

---

## 4. Anti-Flicker & UI Stability Engineering
1. **Zero-Transform Card Inspection Popover:** Replaced relative scale transitions (`hover:scale-105`) that triggered DOM layout recalculation with subtle CSS border-color shifts.
2. **Root-Level Fixed Overlays:** Full card inspection renders inside a dedicated portal drawer attached to the document root, ensuring that hover events in the scrollable card list never trigger jitter ("chớp tắt").
3. **Hardware Acceleration:** All canvas drawing routines and backdrop blurs utilize `transform: translateZ(0)` and `will-change: transform` to maintain 60 FPS on Retina displays.
