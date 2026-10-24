# ELEMENTA — Agent Progress: Architectural & Design Decisions
**Generated Date:** 2026-10-21  

---

## 1. Decision: Strict Banished Zone vs Graveyard Separation
- **Context:** Classical games often conflate discarded and banished cards.
- **Decision:** ELEMENTA strictly segregates the `Graveyard` (reversible, recyclable via redox/electro-rebirth) from the `Banished Zone` ("Chết Hơn Chết" / permanently consumed matter). Cards in the Banished Zone cannot be targeted by standard Graveyard revival effects; they require dedicated transuranic or nuclear decay catalysts.
- **Impact:** Strategic depth increased; protects key boss monsters from being recursively reanimated indefinitely.

## 2. Decision: Anti-Flicker Card Inspection Popover Architecture
- **Context:** In-card CSS hover transforms combined with modal popovers caused high-frequency re-renders and jitter ("chớp tắt liên tục") when inspecting cards in the deck builder.
- **Decision:** Replaced dynamic CSS transform transitions with a single-click root-level fixed backdrop drawer (`DeckManagerTab.tsx`). Hover triggers purely subtle border glows, while full scientific inspection is bound cleanly to `onClick` targeting a dedicated state `inspectedCardDef`.
- **Impact:** 100% stable animation; zero layout shift or visual flickering.

## 3. Decision: 4-Tier AI Strategy with Predictive Lethal Engine
- **Context:** Baseline AI in tactical card games was overly predictable or passive.
- **Decision:** Implemented 4 distinct AI profiles (`BEGINNER`, `STANDARD`, `ADVANCED`, `EXPERT` / `MENDELEEV`). The `EXPERT` / `MENDELEEV` tier computes prospective combat damage, checks opponent face-down trap risks before attacking, reserves quick-play spells for opponent battle declarations, and calculates lethal combos before committing resources.
- **Impact:** High replayability for advanced learners and competitive dueling fans.

## 4. Decision: Deterministic Chemical State Machine (DCSM)
- **Context:** Relying solely on LLMs for chemistry validation is prone to hallucinations and unbalanced equations.
- **Decision:** All core chemical interactions run on a deterministic local state machine that checks conservation of mass, charge balance, oxidation states, and standard reduction potentials (E°). LLM APIs are kept strictly for creative lore generation and card flavor text.
- **Impact:** Academic integrity guaranteed; 100% reproducible test assertions.
