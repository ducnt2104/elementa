# ELEMENTA — Automated QA & Testing Architecture
**Project:** ELEMENTA — Tactical Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** QA-TESTING-v2.0  
**Generated Date:** 2026-10-21  

---

## 1. Test Philosophy & Zero-Defect Policy
ELEMENTA employs automated end-to-end unit and integration testing. No feature or balancing change is accepted into the main codebase without an accompanying deterministic test suite executed through `npx tsx`.

The test runner evaluates both mathematical correctness (IUPAC formulas, equation balancing) and gameplay rules (LIFO chains, tribute mechanics, AI decision paths).

---

## 2. Test Suites Overview (10 Automated Suites)

```
============================================================
 TOTAL TEST SUITES: 10 | TOTAL PASSING ASSERTIONS: 425 | FAILURES: 0
============================================================
```

### Suite 1: Scientific Chemistry Engine (`test-engine.mjs`)
- **Assertions:** 41 passed
- **Coverage:**
  - Continuous mathematical mapping functions (\(ATK_{ox}, ATK_{red}, DEF_{stab}\)).
  - Chemical species representation and precipitation flags (\(Ag(s), Ag^+(aq), AgCl(s)\)).
  - Equation parser and atom conservation with nested parentheses (\(Ca(OH)_2, Al_2(SO_4)_3\)).
  - Deterministic Chemical State Machine (DCSM) reaction demos.
  - Cognitive traps (e.g. \(Cu + HCl\) dilute rejection).
  - 3-Layer AI guardrails and Prompt injection bounds.

### Suite 2: MOBA Arena & Combat Integration (`test-moba.mjs`)
- **Assertions:** 45 passed
- **Coverage:**
  - 12 elemental champions stats and roles.
  - Fixed-timestep physics simulation loop (60 FPS).
  - Minion spawning and pathfinding across 3 lanes.
  - Defensive turret priority targeting and laser lock.
  - 4-Tier Bot AI behavior (`NOVICE`, `STANDARD`, `ADVANCED`, `CHALLENGER`).
  - Elemental river reactions (Sodium water burst, Cryogenic freeze).

### Suite 3: Chemistry Calculator Engine (`test-chemistry-calculator.mjs`)
- **Assertions:** 30 passed
- **Coverage:**
  - Molar mass calculation across complex salts and hydrates.
  - Mass-to-mole conversions.
  - Solution concentration & dilution equations (\(C_1V_1 = C_2V_2\)).
  - Stoichiometric yield estimation and limiting reagent detection.

### Suite 4: Chemistry Data Integrity (`test-chemistry-data.mjs`)
- **Assertions:** 60 passed
- **Coverage:**
  - Verification of all 118 elements in `chemicalData.ts`.
  - Non-null symbols, positive atomic masses, valid electron configurations.
  - Electronegativity boundaries and group classifications.

### Suite 5: Card Battle Core Engine (`test-card-battle.mjs`)
- **Assertions:** 75 passed
- **Coverage:**
  - 5 Monster Zones and 5 Spell/Trap Zones.
  - Mana manipulation, freezing, and restoration.
  - 4-Tier Card AI decision paths (`BEGINNER`, `STANDARD`, `ADVANCED`, `EXPERT`).
  - Compound synthesis summoning (\(2H + O \rightarrow H_2O\)).
  - Battle phase calculations, direct attacks, and lethal win conditions.

### Suite 6: Tactical Duel Engine (`test-duel-engine.mjs`)
- **Assertions:** 87 passed
- **Coverage:**
  - Yu-Gi-Oh! 6-phase turn machine with 60-second timer.
  - Tribute star-sum validation (\(\ge 7\) stars, each sacrifice \(< 7\)).
  - LIFO chain stack resolution for Quick-Play Spells.
  - Multi-Cost Strategic Draws (LP Draw, Tribute Draw, Graveyard Banish Draw).
  - Strict Banished Zone vs Graveyard segregation.
  - 4-Tier duelist archetypes (Novice Alpha, Adept Beta, Expert Gamma, Mendeleev).

### Suite 7: Chemical Environment Engine (`test-environment-engine.mjs`)
- **Assertions:** 33 passed
- **Coverage:**
  - Dynamic tracking of \(pH\), temperature (\(T\)), and pressure (\(P\)).
  - Le Chatelier equilibrium shifts under temperature/pressure extremes.
  - Environmental combat modifiers (Acidic +300 ATK Pyro bonus, Alkaline Terra buff).
  - DuelEngine integration and live damage calculation adjustments.

### Suite 8: Ranked Ladder & Curriculum Quests (`test-ranked-system.mjs`)
- **Assertions:** 19 passed
- **Coverage:**
  - 6 competitive tiers (Bronze to Grand Master).
  - MMR rating calculations with win streak bonuses.
  - Quest engine tracking reactions, wins, and Haber-Bosch milestones.
  - Reward claim protection against double-claim exploits.

### Suite 9: 9-Slot Deck Governance (`test-deck-management.mjs`)
- **Assertions:** 21 passed
- **Coverage:**
  - 9 persistent strategic deck slots.
  - Deck validation rules (min 30, max 60 main deck; max 15 extra deck).
  - Strict Yu-Gi-Oh! 3-copy rule enforcement.
  - Pre-built archetype slots (Nitro Legion, Sulfur Forge, Alkali-Halogen).
  - Duplicate, reset, and default slot assignment.

### Suite 10: Starter Welfare & Deck Inspection (`test-starter-welfare-and-deck.mjs`)
- **Assertions:** 14 passed
- **Coverage:**
  - Free 10-pack booster pull granting 50 cards for 0 tokens.
  - `hasClaimedFree10Pack` state persistence.
  - Single-click card inspection popover without DOM transform jitter.
  - Duplicate shard conversion mechanics.

---

## 3. How to Run Tests
Execute the entire test suite locally:
```bash
npm test
```
To run production TypeScript compilation and bundling:
```bash
npm run build
```
