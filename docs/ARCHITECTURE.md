# ELEMENTA: Comprehensive System Architecture Specification
**Document Code:** ARCH-SPEC-v3.0  
**Generated Date:** 2026-10-21  
**Project:** ELEMENTA — Tactical Chemistry Trading Card Game & Interactive Learning Platform  

---

## 1. Modular Layered Architecture Overview

The ELEMENTA architecture is organized into four strictly segregated operational layers:

```mermaid
flowchart TD
    subgraph UI_Layer ["Layer 1: Presentation & User Experience (React 18 + Vite)"]
        UI_Lobby[Lobby & Dashboard]
        UI_Duel[Tactical Duel Arena 60s TCG]
        UI_Moba[Elemental MOBA Canvas 60 FPS]
        UI_Deck[9-Slot Deck Manager & Root Popover]
        UI_Shop[Shop & Free 10-Pack Welfare]
        UI_Lab[Reaction Lab & Crafting Workshop]
        UI_Codex[Codex 118 & Periodic Table]
    end

    subgraph Simulation_Layer ["Layer 2: Combat & Simulation Engines"]
        DuelEngine[Tactical Duel Engine: Yu-Gi-Oh! Phases & LIFO Chain Stack]
        MobaEngine[MOBA Real-Time Physics, Kinematics & Collision]
        EnvEngine[Chemical Environment: pH, Temp, Press, Le Chatelier Shifts]
    end

    subgraph AI_Layer ["Layer 3: 4-Tier Artificial Intelligence & Governance"]
        CardAI[Card Battle AI: Beginner / Standard / Advanced / Expert]
        MobaAI[MOBA Bot AI: Novice / Standard / Advanced / Challenger]
        DeckGov[Deck Governance: 9 Slots, 3-Copy Limit, 30-60 Cards]
        RankedGov[Ranked Ladder Engine: 6 Tiers & Quest Tracker]
    end

    subgraph Scientific_Layer ["Layer 4: Deterministic Chemistry Core & Data Source of Truth"]
        DCSM[Deterministic Chemical State Machine: O(1) Validation]
        EqParser[Stack Parser: Conservation of Mass & Charge Balance]
        IUPAC_RAG[118 Elements IUPAC Database & Reaction Library]
        LocalStorage[Persistent State: Profiles, Decks, Collection, Shards]
    end

    UI_Layer --> Simulation_Layer
    Simulation_Layer --> AI_Layer
    AI_Layer --> Scientific_Layer
```

---

## 2. Component Hierarchy & Data Flow

### 2.1. Presentation Layer (`src/components/`)
- `TacticalDuelArenaTab.tsx`: 5-slot monster zones, 5-slot spell/trap zones, interactive graveyard/banished drawer, 60s turn timer, battle animations, and chain stack preview.
- `DeckManagerTab.tsx`: 9 strategic deck slots selector, vertical card grid, search/filter panel, and **root-level fixed inspection drawer** that guarantees 0% transform jitter.
- `ShopGachaTab.tsx`: Displays 4 thematic booster boxes, pack opening animations, shard conversion counters, and the **Free 10-Pack Starter Welfare Banner**.
- `MobaArenaTab.tsx`: High-resolution HTML5 Canvas 2D renderer with DPR scaling, minimap overlay, HUD skill cooldown counters, and elemental reaction telemetry.
- `CurriculumQuestsTab.tsx`: 6-tier MMR progress bar, daily/weekly quests, and chemical reaction milestone trackers.

### 2.2. Domain Layer (`src/domain/`)
- `duelEngine.ts`: Full turn phase machine (`DRAW` \(\rightarrow\) `STANDBY` \(\rightarrow\) `MAIN_PHASE_1` \(\rightarrow\) `BATTLE_PHASE` \(\rightarrow\) `MAIN_PHASE_2` \(\rightarrow\) `END_PHASE`), LIFO chain stack resolution, tribute star-sum validator, and graveyard/banished segregation.
- `cardGameTypes.ts`: Strict TypeScript interfaces for `CardInstance`, `PlayableCardDef`, `DuelistState`, `ChainItem`, and `ChemicalEnvironmentState`.
- `opponentAi.ts`: Card battle decision tree evaluating lethal lines, quick-play response windows, and defensive buffs across 4 difficulty tiers.
- `chemicalEnvironment.ts`: Computes environmental combat modifiers based on Le Chatelier's principle:
  - \(pH < 5.0\): Acidic bonus to Pyro / corrodes metal defense.
  - \(pH > 8.5\): Alkaline precipitation bonus to Terra / buffs amphoteric Al and Zn.
  - \(T > 500\text{ K}\): Endothermic shift / Pyro ATK boost.
  - \(T < 273\text{ K}\): Cryogenic freeze / Aqua DEF boost & opponent mana lock.
- `deckGovernanceService.ts`: Manages 9 persistent deck slots, deep clones, and validates against the 3-copy limit and 30-60 card boundaries.

---

## 3. Storage & State Persistence Architecture
State is maintained in client-side `localStorage` with versioned migrations:
- `elementa_deck_slots`: 9 strategic deck configurations.
- `elementa_active_deck_index`: Default deck pointer for ranked matches.
- `elementa_card_collection`: Unlocked card inventory, copy quantities, and craft shards.
- `elementa_student_profile`: MMR, Ranked tier, win-loss record, tokens, and `hasClaimedFree10Pack` flag.
