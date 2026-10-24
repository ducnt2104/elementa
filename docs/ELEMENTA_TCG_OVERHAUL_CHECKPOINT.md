# ELEMENTA TCG Overhaul & Chemistry Gameplay Integration Checkpoint

**Date:** October 2026  
**Status:** COMPLETE & 100% VERIFIED  
**Engine & Standards Compliance:** IUPAC 2024, GDPT 2018 KHTN / Hóa học THCS & THPT, DCSM Reaction Engine, Deterministic TCG Mechanics

---

## 1. Executive Summary

The **ELEMENTA Tactical Trading Card Game (TCG)** has undergone a comprehensive, ground-up overhaul to elevate it from a simulated card game into a rigorous, pedagogically verified chemistry tactical card game. All shallow or boilerplate interfaces have been replaced with dynamic, data-driven systems:

1. **Navigation & Hub Architecture:** Reorganized `Navbar.tsx` into 3 core gateways (`Sảnh Chính`, `Đấu Bài TCG`, `Đấu Trường MOBA`) and 2 global chemical instruments (`Bảng Tuần Hoàn`, `Xưởng AI`). All engine diagnostic logs have been relocated to the application footer.
2. **Dedicated TCG Main Hub (`TcgMainMenu.tsx`):** A dual-pillar central staging area featuring `ĐẤU CHIẾN DỊCH — CAMPAIGN PvE` and `ĐẤU BÀI — BATTLE ARENA`, accompanied by a docked operations bar (`Bộ Sưu Tập & Deck`, `Cửa Hàng & Chế Tạo`, `Lịch Sử Đấu & Sổ Cái`, `Bảng Xếp Hạng`).
3. **Data-Driven Dynamic Related Cards (`CardScientificInspector.tsx`):** Eliminated hardcoded placeholder lists in favor of `relatedCardsService.ts`, dynamically synthesizing reactant requirements, reaction products, catalysts, environmental conditions, chemical counters, and tactical synergies directly from `REACTION_RULES_DATABASE` (310+ IUPAC equations).
4. **Interactive Battlefield Reaction Engine:** Wired interactive card combinations into `DuelEngine` and `TacticalDuelArenaTab.tsx` via `ReactionPreviewModal.tsx`. Players can select on-field and in-hand elements to trigger balanced stoichiometry under live environmental parameters (temperature, pH, solvent, catalysts), with rigorous cognitive trap rejection (e.g., $\text{Cu} + \text{HCl}(\text{aq}) \to \text{NO REACTION}$).
5. **Summon Mechanics Separation:** Decoupled Normal Summon limits (1 per turn) from Special Summons (`specialSummonFromHand`, `specialSummonFromGraveyard`, `specialSummonFromDeck`, `searchDeckToHand`), with resurrection checks enforcing proper prior summons.
6. **Elemental Shards Economy:** Established a dedicated crafting and recycling economy strictly decoupled from Knowledge Tokens. Standardized crafting costs and duplicate recycling yields across all 5 rarity tiers with atomic balance verification and audit transaction logging.
7. **Booster Shop Transparent Odds & Card Pools:** Implemented `PackDetailModal.tsx` showing exact drop rates (Slots 1-3 Common with foil rolls, Slot 4 Guaranteed Foil, Slot 5 Wild Card, 10-pack Pity mechanics) and live card pool galleries.
8. **Unified History Center (`TcgHistoryModal.tsx`):** Integrated 4 comprehensive audit tabs: Match Replays, Chemical Reaction Logs, Transaction Ledger, and Collection Progress.
9. **Content Cleanliness:** Sanitized all raw external rulebook citations across all modals and tooltips into native ELEMENTA tactical terminology.

---

## 2. Technical Architecture & Component Roster

| Module / Component | Path | Responsibility |
| :--- | :--- | :--- |
| **Related Cards Engine** | `src/domain/relatedCardsService.ts` | Dynamic graph traversal of 310+ reactions to compute reactants, products, conditions, counters, synergies. |
| **Scientific Inspector** | `src/components/duel/CardScientificInspector.tsx` | Comprehensive Bohr/Orbital inspector with interactive related card pill filters and crafting shortcuts. |
| **Shards Economy** | `src/domain/shardsEconomy.ts` | Atomic crafting costs, duplicate recycling, collection management, and transaction ledger. |
| **Crafting Modal** | `src/components/shop/CardCraftingModal.tsx` | Dedicated crafting station and 1-click duplicate disenchanting chamber. |
| **Pack Detail Modal** | `src/components/shop/PackDetailModal.tsx` | Transparent odds breakdown and previewable card pools for all thematic boxes. |
| **Booster Shop Tab** | `src/components/shop/BoosterShopTab.tsx` | Integrated craft station and odds inspection for 4 thematic boxes. |
| **Reaction Preview Modal** | `src/components/duel/ReactionPreviewModal.tsx` | Interactive modal to evaluate and trigger battlefield chemical reactions under active conditions. |
| **Tactical Duel Arena** | `src/components/duel/TacticalDuelArenaTab.tsx` | Battlefield reaction button, clean rules, sanitized modals, Bohr inspection integration. |
| **Duel Engine** | `src/domain/duelEngine.ts` | DCSM integration, special summon methods, battlefield reaction evaluation with damage and trap penalties. |
| **TCG Main Hub** | `src/components/tcg/TcgMainMenu.tsx` | 2-pillar hero gateways with dock navigation for sub-features. |
| **Global Navigation** | `src/components/Navbar.tsx` | 3 gateways + 2 tools with footer relocation of engine status. |
| **History Center** | `src/components/tcg/TcgHistoryModal.tsx` | 4-tab unified history: matches, reactions, economy ledger, collection progress. |

---

## 3. Economy Matrix: Elemental Shards & Knowledge Tokens

| Card Rarity | Crafting Cost (Shards) | Recycling Yield (Shards) | Refund Ratio |
| :--- | :---: | :---: | :---: |
| **COMMON** | 60 | 15 | 25.0% |
| **RARE** | 160 | 40 | 25.0% |
| **SUPER RARE** | 400 | 100 | 25.0% |
| **ULTRA RARE** | 1,000 | 250 | 25.0% |
| **SECRET RARE** | 2,400 | 600 | 25.0% |

- **Knowledge Tokens:** Earned via matches, quests, and campaign victories; used exclusively for purchasing Booster Packs and entering Arena tournaments.
- **Elemental Shards:** Earned by disenchanting duplicate cards (>3 copies) and special shard rewards; used exclusively for targeted single-card crafting in the Crafting Station.

---

## 4. Verification & Automated Test Suites

### Suite 38: `test-tcg-overhaul-complete.mjs`
- **Pillar 1:** Data-driven related cards discovery verified for Sodium ($\text{Na}$), Hydrochloric Acid ($\text{HCl}$), and Water ($\text{H}_2\text{O}$).
- **Pillar 2:** Special Summon mechanics verified (Normal summon consumes turn allowance; hand, GY, deck special summons bypass normal summon limits without consuming them).
- **Pillar 3:** Battlefield Reaction Engine verified ($2\text{Na} + 2\text{H}_2\text{O} \to 2\text{NaOH} + \text{H}_2\uparrow$ deals 850 direct LP damage; cognitive trap $\text{Cu} + \text{HCl}(\text{aq})$ triggers `TRAP_TRIGGERED` penalty and displays electrochemical series reasoning).
- **Pillar 4:** Elemental Shards economy verified (crafting cost deduction, collection update, transaction ledger, duplicate detection and batch recycling).
- **Pillar 5:** Thematic Booster boxes verified (4 thematic boxes, 8 sub-packs, all featured cards exist in catalog).

**Status:** 100% Pass across all 5 verification pillars.
