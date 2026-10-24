# ELEMENTA Ultimate Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ELEMENTA into a production-grade Chemistry Trading Card Game with high-fidelity vertical cards (5:7 ratio), complete Spell & Trap field activations, molecule-count reaction engine, custom >5-star tribute summoning, separated Graveyard and Banished zones, Nitro & Sulfur archetypes, ranked system, and comprehensive audio-visual feedback.

**Architecture:** Maintain a clean separation between the deterministic Duel Engine (`src/domain/duelEngine.ts`), Reaction Stoichiometry Engine (`src/domain/reactionEngine.ts`, `src/domain/chemicalCalculator.ts`), Card Database (`src/data/playableCardsData.ts`), and React Presentation Layer (`src/components/cards/ChemicalCardView.tsx`, `src/components/duel/TacticalDuelArenaTab.tsx`, `src/components/collection/`, `src/components/deck/`). Combat animations and VFX run as purely visual responses to deterministic state changes.

**Tech Stack:** React 18, TypeScript 5.7, Tailwind CSS 3.4, Lucide React, Web Audio API (`soundEngine.ts`), Vite 6.

**Spec:** Directives from `/goal` prompt — Visual Overhaul, Card System Redesign, Chemistry Engine, Strategic Gameplay, Educational Content and Production-Quality Completion.

## Global Constraints
- **Preserve Data Integrity:** No breaking existing tests in `test-engine.mjs`, `test-moba.mjs`, `test-chemistry-calculator.mjs`, `test-chemistry-data.mjs`, `test-card-battle.mjs`, `test-duel-engine.mjs`, `test-environment-engine.mjs`.
- **Vertical Aspect Ratio:** Standard cards must render with 5:7 aspect ratio (e.g., 140x196, 160x224, 200x280) and never be distorted into 1:1 squares.
- **Tribute Summoning Rule:** Monsters of Level 6+ (>5 stars) strictly require tributing one or more monsters on field with strictly lower individual stars, whose combined stars sum >= target monster's level.
- **Stoichiometric Reaction Engine:** Players do not type coefficients; the system checks molecule unit counts, verifies atomic conservation and environmental parameters, and computes outputs.
- **Separate Graveyard and Banished Zones:** Graveyard (Nghĩa địa) and Banished Zone (Khu vực Loại bỏ / "Chết hơn chết") are independent data structures with distinct retrieval rules.
- **Zero TypeScript Errors:** `npm run build` (`tsc && vite build`) must pass without errors.

## Review Focus
1. Spell/Trap activation from field: Set cards in the Spell/Trap zone must be clickable/activatable during appropriate phases and respond to trigger conditions.
2. Tribute calculation edge cases: Monsters with 6, 7, 8 stars require sacrifices with `< target.level` and `sum >= target.level`.
3. Separate Banished vs GY recovery: Cards banished by Redox or Acid corrosion cannot be targeted by graveyard revival spells like Cathodic Electro-Rebirth.
4. Nitro & Sulfur archetype synergy: Haber-Bosch synthesis, Ostwald nitric acid, Contact process sulfuric acid must have complete recipes, cards, and reaction mechanics.
5. Mobile / Desktop responsive layout: Arena layout maintains card readability without text clipping or overlapping controls.

---

### Task 1: Visual Design Tokens, Card Frame Standards & 5:7 Vertical Proportions

**Files:**
- Modify: `src/components/cards/ChemicalCardView.tsx`
- Modify: `src/assets/svg/CardIllustrations.tsx`
- Modify: `src/index.css`
- Test: `test-card-battle.mjs`

- [ ] **Step 1:** Update `ChemicalCardView.tsx` size configurations to enforce exact 5:7 vertical proportions (`xs`: 80x112px, `sm`: 115x161px, `md`: 150x210px, `lg`: 190x266px, `detail`: 280x392px).
- [ ] **Step 2:** Redesign the card hierarchy in `ChemicalCardView.tsx` into 7 distinct visual zones:
  - Header (Name, Element Attribute Emblem, Type Glyph)
  - Level Stars / Link Rating Badge with glowing valence markers
  - Central Illustration Frame with SVG artwork & formula watermark
  - Combat Stats (ATK / DEF / LINK) with chemical affinity badges
  - Effect Text Box with balanced chemical equation banner
  - Stoichiometry & Environmental Condition Tags
  - Card ID, Archetype & Rarity holographic stamp
- [ ] **Step 3:** Add 3-tier inspection support: Mini thumbnail on board, Detailed preview on hover/select, Full Modal/Drawer with deep IUPAC educational lore.
- [ ] **Step 4:** Add new SVG illustrations in `src/assets/svg/CardIllustrations.tsx` for Nitrogen, Sulfur, Ammonia, Sulfuric Acid, Nitric Acid, and Link monsters.
- [ ] **Step 5:** Run `npx tsx test-card-battle.mjs` to ensure card rendering definitions remain compatible.

---

### Task 2: Expanded Tactical Card Catalog — Nitro & Sulfur Archetypes, Link Cards & Traps

**Files:**
- Modify: `src/data/playableCardsData.ts`
- Modify: `src/domain/cardGameTypes.ts`
- Test: `test-chemistry-data.mjs`

- [ ] **Step 1:** Expand `CardType` and `PlayableCardDef` in `src/domain/cardGameTypes.ts` with archetype tags (`NITRO_LEGION`, `SULFUR_FORGE`, `HALOGEN_SWARM`, etc.) and Link arrow orientations.
- [ ] **Step 2:** Add Nitro Archetype cards to `playableCardsData.ts`:
  - `card_elem_7_n`: Nitơ Cơ Bản (Z=7, ATK 1400, DEF 1200)
  - `card_comp_nh3_spire`: Tháp Amoniac Haber-Bosch (Level 6 Compound Monster, ATK 2200, DEF 2000)
  - `card_comp_hno3_acid`: Hoàng Đế Axit Nitric Ostwald (Level 7 Boss, ATK 2700, DEF 2100)
  - `card_link_nitrogen_triple`: Tiên Phong Liên Kết Ba N≡N (Link-3 Monster, ATK 2500)
  - `card_spell_haber_synthesis`: Phép Môi Trường Buồng Tổng Hợp Haber-Bosch
  - `card_trap_ammonium_smoke`: Bẫy Phun Khói Trắng NH₄Cl
- [ ] **Step 3:** Add Sulfur Archetype cards to `playableCardsData.ts`:
  - `card_elem_16_s_crown`: Vương Miện Lưu Huỳnh S₈ (Level 5 Monster, ATK 1900, DEF 1800)
  - `card_comp_so2_gas`: Bạo Chúa Khí Khử SO₂ (Level 4 Monster, ATK 1600, DEF 1300)
  - `card_comp_h2so4_oleum`: Thần Hút Nước H₂SO₄ Đặc Nóng (Level 8 Titan, ATK 3000, DEF 2600)
  - `card_link_disulfide_bridge`: Liên Kết Cầu Disulfide S–S (Link-2 Monster, ATK 1800)
  - `card_spell_contact_process`: Phép Xúc Tác Tháp Tiếp Xúc V₂O₅
  - `card_spell_charring_dehydration`: Phép Than Hóa Đường C₁₂H₂₂O₁₁ (Đẩy bài vào Banished Zone)
  - `card_trap_h2s_rotten_shield`: Bẫy Khí Trứng Thối H₂S (Hóa đen kim loại chì Pb)
- [ ] **Step 4:** Add Strategic Draw & Support Spells/Traps:
  - `card_spell_tribute_extraction`: Rút 2 lá bài bằng cách hiến tế 1 quái thú trên sân
  - `card_spell_catalytic_life_draw`: Trả 1000 LP để rút 2 lá bài
  - `card_spell_grave_filtration`: Trục xuất 2 quái thú từ Nghĩa Địa để rút 1 lá bài
- [ ] **Step 5:** Verify card catalog integrity and run `npx tsx test-chemistry-data.mjs`.

---

### Task 3: Core Duel Engine Overhaul — Spell & Trap Activation from Field, Event Engine & Chain Stack

**Files:**
- Modify: `src/domain/duelEngine.ts`
- Modify: `src/components/duel/TacticalDuelArenaTab.tsx`
- Test: `test-duel-engine.mjs`

- [ ] **Step 1:** Implement `activateSpellTrapFromField(duelistId, slotIndex, targetSlotIndex)` in `src/domain/duelEngine.ts`:
  - Validate slot is occupied and check conditions (Quick-Play can activate any time; Normal Spells in Main Phase; Traps can activate from the turn after being set).
  - Deduct costs (if any), flip face-up, and push to chain stack.
- [ ] **Step 2:** Implement Comprehensive Event Engine with subscription hooks:
  - Events: `ON_TURN_START`, `ON_SUMMON`, `ON_ATTACK_DECLARE`, `ON_BATTLE_DAMAGE`, `ON_MONSTER_DESTROYED`, `ON_SPELL_ACTIVATED`, `ON_CARD_SENT_TO_GRAVE`, `ON_CARD_BANISHED`, `ON_REACTION_TRIGGERED`.
- [ ] **Step 3:** Extend `checkDefenderTrapReaction` to scan all active traps and quick-play spells in the Spell/Trap zones, with trigger matching for attacks, summons, and card destruction.
- [ ] **Step 4:** Add UI controls in `TacticalDuelArenaTab.tsx` allowing players to click set cards in their Spell/Trap zone, inspect them, and press "Kích Hoạt (Activate)" or trigger quick reactions.
- [ ] **Step 5:** Write unit tests for field-activated spells & traps in `test-duel-engine.mjs` and run them.

---

### Task 4: Custom Tribute Summoning Engine (>5 Stars Star-Sum Rule) & Multi-Cost Draw Mechanics

**Files:**
- Modify: `src/domain/duelEngine.ts`
- Modify: `src/components/duel/TacticalDuelArenaTab.tsx`
- Test: `test-duel-engine.mjs`

- [ ] **Step 1:** Rewrite `normalSummon` tribute logic in `src/domain/duelEngine.ts`:
  - Levels 1-5: 0 tributes required (normal summon).
  - Levels 6+: Strict rule:
    * All sacrificed monsters must have strictly fewer stars than target (`sacrificedMonster.level < target.level`).
    * The sum of stars of all selected sacrifices must be `>= target.level`.
    * Validate that no single sacrifice has `>= target.level`.
- [ ] **Step 2:** Implement multi-cost draw methods in `DuelEngine`:
  - `tributeToDraw(duelistId, monsterSlotIndex, cardsToDraw)`
  - `lifePointDraw(duelistId, lpCost, cardsToDraw)`
  - `graveyardConsumeDraw(duelistId, graveCardUids, cardsToDraw)`
  - Include anti-loop hard once-per-turn (HOPT) caps.
- [ ] **Step 3:** Add UI modal / selector in `TacticalDuelArenaTab.tsx` when summoning a Level 6+ monster: displays available monsters, calculates current star sum, and enables summon once condition is satisfied.
- [ ] **Step 4:** Add automated tests in `test-duel-engine.mjs` covering valid and invalid tribute combinations and multi-cost draws.

---

### Task 5: Graveyard & Banished Zone Disconnection & Dedicated Recovery Mechanics

**Files:**
- Modify: `src/domain/duelEngine.ts`
- Modify: `src/components/duel/TacticalDuelArenaTab.tsx`
- Test: `test-duel-engine.mjs`

- [ ] **Step 1:** Audit and reinforce strict segregation between `graveyard: CardInstance[]` and `banishedZone: CardInstance[]` in `DuelistState`.
- [ ] **Step 2:** Implement distinct mechanics for both zones:
  - `banishCardFromField(duelistId, slotType, slotIndex)`
  - `banishCardFromGraveyard(duelistId, cardUid)`
  - `reviveFromGraveyard(duelistId, cardUid, targetSlotIndex)`
  - `summonFromBanished(duelistId, cardUid, targetSlotIndex)`
  - `returnBanishedToDeckOrHand(duelistId, cardUid, destination)`
- [ ] **Step 3:** Add dedicated UI inspection modal for both Graveyard and Banished Zone in `TacticalDuelArenaTab.tsx` with distinct visual themes (Graveyard = Deep Obsidian/Tomb; Banished Zone = Void Purple/Disintegration).
- [ ] **Step 4:** Ensure revive cards cannot target banished cards and vice-versa. Verify with tests in `test-duel-engine.mjs`.

---

### Task 6: Molecule-Count Stoichiometric Reaction Engine (Zero-Manual-Coefficients)

**Files:**
- Modify: `src/domain/reactionEngine.ts`
- Modify: `src/domain/chemicalCalculator.ts`
- Modify: `src/components/sandbox/ReactionSandboxTab.tsx`
- Modify: `src/components/chemistry/ChemicalCalculatorModal.tsx`
- Test: `test-chemistry-calculator.mjs`

- [ ] **Step 1:** Extend `ReactionEngine` with `evaluateMolecularInventory`:
  - Takes `{ [formulaOrSymbol: string]: number }` representing player's molecule unit counts.
  - Compares against balanced reaction recipes in `REACTION_RULES_DATABASE`.
  - Calculates exact limiting reactant, theoretical yield, and excess remaining units without asking the player to enter mathematical coefficients.
- [ ] **Step 2:** Add environmental feasibility validation (requires active pH range, temperature threshold, catalyst presence where required).
- [ ] **Step 3:** Update `ReactionSandboxTab.tsx` and in-duel reaction synthesis UI to show dynamic count counters (`[+] [-]`), missing units breakdown, and expected product card outputs.
- [ ] **Step 4:** Run and verify tests in `test-chemistry-calculator.mjs`.

---

### Task 7: Tactical Battlefield Arena UI Overhaul (Vertical Cards, Field Decals, Link Lines & Impact VFX)

**Files:**
- Modify: `src/components/duel/TacticalDuelArenaTab.tsx`
- Modify: `src/components/duel/ChemicalEnvironmentHud.tsx`
- Modify: `src/audio/soundEngine.ts`
- Modify: `src/index.css`

- [ ] **Step 1:** Upgrade the 5x2 field layout in `TacticalDuelArenaTab.tsx`:
  - Render cards with exact 5:7 vertical proportions without stretching or overflowing.
  - Implement elemental glow borders and animated card placement.
  - Add dynamic Link lines SVG overlay connecting Link monsters to co-linked zones.
- [ ] **Step 2:** Implement comprehensive Combat VFX:
  - Attack animation with projectile trajectories and screen shake.
  - Hit shockwave decals with floating damage numbers.
  - Elemental impact particles (fire sparks, electric arcs, crystal dust, water splashes).
  - Synthesis / Link summon fusion portal animation.
- [ ] **Step 3:** Upgrade `ChemicalEnvironmentHud.tsx` with real-time dynamic background shaders / particle effects reflecting pH, temperature, and atmospheric pressure.
- [ ] **Step 4:** Enhance Web Audio effects in `soundEngine.ts` for summon, spell activation, trap trigger, attack impact, and victory fanfare.

---

### Task 8: Ranked Ladder, Seasonal Progression, Quests & Achievement System

**Files:**
- Create/Modify: `src/domain/rankedSystem.ts`
- Modify: `src/domain/types.ts`
- Modify: `src/storage/localStore.ts`
- Modify: `src/components/MainMenuTab.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1:** Build `src/domain/rankedSystem.ts` with MMR calculations, 6 Tier ranks (Đồng, Bạc, Vàng, Bạch Kim, Kim Cương, Bậc Thầy Nguyên Tố), rank promotion series, and match history.
- [ ] **Step 2:** Create comprehensive Quest & Achievement engine:
  - Daily & Weekly Curriculum Quests (e.g. "Thực hiện 3 phản ứng Haber-Bosch", "Triệu hồi quái thú 7 sao bằng hiến tế hợp lệ", "Kích hoạt bẫy nhận thức").
  - Progression rewards (Knowledge Tokens, Booster Packs, Foil Card unlocks).
- [ ] **Step 3:** Integrate Ranked Ladder and Quests into `MainMenuTab.tsx` and user profile storage.
- [ ] **Step 4:** Write automated unit tests for ranking calculations and quest progression.

---

### Task 9: AI Opponent Strategic Upgrade

**Files:**
- Modify: `src/domain/duelEngine.ts`
- Test: `test-duel-engine.mjs`

- [ ] **Step 1:** Upgrade AI logic in `executeOpponentTurn`:
  - Smart Tribute Summoning: AI calculates star sums to sacrifice weaker utility monsters for Level 6+ titans.
  - Pre-emptive & Reactive Trap/Spell usage: AI sets traps and activates field spells during optimal timing.
  - Environment awareness: AI casts environmental buffs matching its primary element.
  - Link Summoning & Compound Synthesis: AI identifies valid materials on field/hand and summons boss monsters.
- [ ] **Step 2:** Ensure AI adheres strictly to the same rules as players with zero cheating or resource duplication.
- [ ] **Step 3:** Test AI matches across EASY, ADEPT, and MASTER levels in `test-duel-engine.mjs`.

---

### Task 10: Complete Verification, Quality Review & Production Build

**Files:**
- Run all test scripts (`npm test`)
- Run typecheck and bundle build (`npm run build`)
- Inspect UI and finalize documentation

- [ ] **Step 1:** Run all 7 existing test suites plus newly written test assertions.
- [ ] **Step 2:** Run `npm run build` (`tsc && vite build`) and fix any TypeScript or bundle warnings.
- [ ] **Step 3:** Perform end-to-end simulation of a complete duel with Nitro, Sulfur, Link summons, tribute summoning, trap triggers, and reaction synthesis.
- [ ] **Step 4:** Prepare comprehensive report with verification evidence and gameplay guide.
