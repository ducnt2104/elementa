# ELEMENTA: Comprehensive 2,200+ Tactical Chemical Card Database & Effect Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand ELEMENTA's card catalog from 129 cards to 2,300+ unique, scientifically grounded, tactically balanced, fully playable cards adhering to Yu-Gi-Oh! Master Rule & GDPT 2018 chemistry standards, backed by a structured machine-readable effect engine, batch validation manifests, and high-performance paginated UI.

**Architecture:**
- **Modular Batch Catalog**: Store card definitions in typed batch files (`src/data/cards/batches/batch_*.ts`) aggregated through `src/data/cards/index.ts` and unified with `src/data/playableCardsData.ts`.
- **JSON Schema & Typed Validator**: Strong runtime schema validation in `src/data/cards/schemas/cardSchema.ts` checking required fields, stat boundaries, valid attributes, balanced chemical formulas/equations, and machine-readable effect definitions.
- **Structured Effect Engine**: Machine-readable `StructuredEffectDefinition` with verified opcodes (`DRAW_CARD`, `SEARCH_CARD`, `MODIFY_STATS`, `DESTROY_CARD`, `NEGATE_EFFECT`, `BURN_DAMAGE`, `HEAL_LP`, `SUMMON_TOKEN`, `BANISH_CARD`, `APPLY_STATUS`, `RETURN_TO_HAND`, `BOUNCE_TO_DECK`, `SWAP_ATK_DEF`, `RECOVER_RESOURCE`) integrated into `src/domain/duelEngine.ts`.
- **Batch Manifest Tracking**: `src/data/cards/manifest.json` tracks 24 batch manifests with timestamps, card counts, category hashes, and validation status.
- **High-Performance Paginated UI**: Windowed pagination (40 cards/page) in `TacticalCollectionTab.tsx` and `TacticalDeckBuilderTab.tsx` with archetype dropdown filters, preventing DOM lag with 2,300+ cards.
- **Verification Engine**: Automated test suite `test-card-catalog-mega-2200.mjs` verifying all 10 integrity groups, 0 duplicate IDs, 0 duplicate names, and preserving all 47 existing test suites (3,467 assertions).

**Tech Stack:** TypeScript, React, Tailwind CSS, Vite, Node.js / tsx, IUPAC Chemical Nomenclature.

---

## Global Constraints

- **Minimum Valid Cards**: Exactly $\ge 2,200$ unique, non-trivial, fully playable cards (target: 2,329 cards).
- **Target Category Distribution**:
  - Main Deck Monsters: $\ge 1,000$ cards (Batches 01–10)
  - Extra Deck Monsters: $\ge 300$ cards (Batches 11–14: Fusion, Synchro, Xyz, Link)
  - Spells: $\ge 500$ cards (Batches 15–20: Normal, Continuous, Equip, Field, Quick-Play, Ritual)
  - Traps: $\ge 400$ cards (Batches 21–24: Normal, Continuous, Counter, Passivation/Titration)
- **Zero Duplicate Invariant**: 0 duplicate card IDs, 0 duplicate card names (case-insensitive trimmed).
- **Scientific Fact vs Lore Separation**: All chemistry equations must be stoichiometrically atom & charge balanced. No fictional stats presented as verified science.
- **Performance Budget**: Collection gallery and deck builder search/filter must complete in $<20\text{ ms}$ with 2,300+ cards using windowed pagination.
- **Zero Regression**: All 47 existing test suites (3,467 assertions) and production build (`tsc && vite build`) must remain 100% passing.

---

## Review Focus

1. **Memory & Bundle Size**: Splitting 2,200 card definitions into clean TypeScript modular chunks so Vite compiles efficiently without tree-shaking deadlocks.
2. **DOM Performance**: Transitioning collection and deck builder catalog grids from flat mapping to clean pagination (40 cards per page) with quick jump.
3. **Structured Effect Safety**: Ensuring structured operations validate all target scopes and prevent runtime crashes or infinite recursive chains.
4. **Starter Collection Scalability**: Updating `localStore.ts` starter collection loading to gracefully handle 2,300 cards without LocalStorage quota overflow.
5. **Booster Pack Economy Compatibility**: Ensuring all 2,300 cards are properly indexed for booster box pulls and duplicate shard recycling.

---

## Implementation Tasks

### Task 1: Card Schema & Structured Effect Engine Definitions
- [ ] Create `src/data/cards/schemas/cardSchema.ts` with TypeScript types and validation routines (`validateCardDef`).
- [ ] Extend `src/domain/cardGameTypes.ts` with `StructuredEffectDefinition`, `EffectOperation`, and opcode types.
- [ ] Implement `src/domain/structuredEffectResolver.ts` providing deterministic execution of all 14 opcodes.
- [ ] Connect structured effect execution to `src/domain/duelEngine.ts` chain resolution.
- [ ] Write unit tests in `test-structured-effect-engine.mjs` verifying opcode dispatch.

### Task 2: Batch Generation Scaffolding & Manifest System
- [ ] Create `src/data/cards/manifest.json` tracking all 24 planned batches.
- [ ] Build automated generator & deduplication script `scripts/generate-card-catalog.ts`.
- [ ] Create catalog aggregator `src/data/cards/index.ts` exporting all cards dynamically.

### Task 3: Generate Main Deck Monsters (1,000 Cards across Batches 01–10)
- [ ] Batch 01: 100 Alkali & Alkaline Earth Monsters (`batch_01_monsters_main_alkali_earth.ts`).
- [ ] Batch 02: 100 Transition Metal Monsters (`batch_02_monsters_main_transition_metals.ts`).
- [ ] Batch 03: 100 Halogen & Chalcogen Monsters (`batch_03_monsters_main_halogens_chalcogens.ts`).
- [ ] Batch 04: 100 Noble Gas & Pnictogen Monsters (`batch_04_monsters_main_noble_pnictogens.ts`).
- [ ] Batch 05: 100 Organic & Hydrocarbon Monsters (`batch_05_monsters_main_organic_hydrocarbons.ts`).
- [ ] Batch 06: 100 Biomolecule & Polymer Monsters (`batch_06_monsters_main_biomolecules_polymers.ts`).
- [ ] Batch 07: 100 Acid, Base & Salt Monsters (`batch_07_monsters_main_acids_bases_salts.ts`).
- [ ] Batch 08: 100 Catalyst & Allotrope Monsters (`batch_08_monsters_main_catalysts_allotropes.ts`).
- [ ] Batch 09: 100 Scientific Pioneer Entities (`batch_09_monsters_main_scientific_entities.ts`).
- [ ] Batch 10: 100 Elemental Guardian Monsters (`batch_10_monsters_main_elemental_guardians.ts`).

### Task 4: Generate Extra Deck Monsters (300 Cards across Batches 11–14)
- [ ] Batch 11: 75 Fusion / Compound Synthesis Monsters (`batch_11_extra_deck_fusion_compounds.ts`).
- [ ] Batch 12: 75 Synchro Resonance Catalysis Monsters (`batch_12_extra_deck_synchro_catalysis.ts`).
- [ ] Batch 13: 75 Xyz Multi-nuclear Coordination Monsters (`batch_13_extra_deck_xyz_coordination.ts`).
- [ ] Batch 14: 75 Link Covalent Valence Monsters (`batch_14_extra_deck_link_valences.ts`).

### Task 5: Generate Spells (500 Cards across Batches 15–20)
- [ ] Batch 15: 100 Normal Chemical Reaction Spells (`batch_15_spells_normal_reactions.ts`).
- [ ] Batch 16: 80 Continuous Chemical Kinetics Spells (`batch_16_spells_continuous_kinetics.ts`).
- [ ] Batch 17: 80 Equip Catalyst Spells (`batch_17_spells_equip_catalysts.ts`).
- [ ] Batch 18: 80 Field Environment Spells (`batch_18_spells_field_environments.ts`).
- [ ] Batch 19: 100 Quick-Play Le Chatelier Equilibrium Spells (`batch_19_spells_quickplay_lechatelier.ts`).
- [ ] Batch 20: 60 Ritual Crystallization Spells (`batch_20_spells_ritual_crystallization.ts`).

### Task 6: Generate Traps (400 Cards across Batches 21–24)
- [ ] Batch 21: 120 Normal Countermeasure Traps (`batch_21_traps_normal_countermeasures.ts`).
- [ ] Batch 22: 100 Continuous Passivation & Corrosion Traps (`batch_22_traps_continuous_corrosion.ts`).
- [ ] Batch 23: 100 Counter Chemical Equilibrium Traps (`batch_23_traps_counter_equilibrium.ts`).
- [ ] Batch 24: 80 Titration & Precipitation Precision Traps (`batch_24_traps_titration_passivation.ts`).

### Task 7: Integrate Mega Catalog into Card Data & Local Storage
- [ ] Update `src/data/playableCardsData.ts` to re-export the unified catalog (`PLAYABLE_CARDS` contains both core + 24 batches = 2,329 cards).
- [ ] Optimize `src/storage/localStore.ts` starter collection initialization with memory-efficient indexing.
- [ ] Update `src/domain/deckManagement.ts` deck synergy calculation for all 36 archetypes.

### Task 8: UI/UX Pagination & High-Performance Virtualization
- [ ] Upgrade `src/components/collection/TacticalCollectionTab.tsx` with 40-cards/page pagination, archetype filter, and quick page switcher.
- [ ] Upgrade `src/components/deck/TacticalDeckBuilderTab.tsx` with 36-cards/page catalog pagination and archetype selector.
- [ ] Ensure instant $<15\text{ ms}$ search responses and zero DOM thrashing.

### Task 9: Comprehensive Automated Test Suite (Suite 48)
- [ ] Create `test-card-catalog-mega-2200.mjs` verifying all 10 validation groups.
- [ ] Run full regression suite (`npm test`): all 48 test suites passing.
- [ ] Verify clean TypeScript check and Vite production build (`npm run build`).

### Task 10: Final Documentation & Synthesis Dossier
- [ ] Create `docs/CARD_DATABASE.md` detailing the schema, 36 archetypes, batch manifest, and contribution guide.
- [ ] Document final metrics and export comprehensive completion report.
