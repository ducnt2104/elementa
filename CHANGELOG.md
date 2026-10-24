# CHANGELOG — ELEMENTA AUTONOMOUS NIGHT-SHIFT PROTOCOL

All notable engineering upgrades, chemical engine calibrations, bug fixes, and pedagogical features developed during the continuous autonomous engineering protocol are documented in this file.

---

## [2.45.0-PROD] — Extra Link (Khóa Cổng Extra Link) & Delocalized Pi-Resonance Invariants (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23)
*Timestamp: 2026-10-23T01:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Extra Link Topology & Lockout Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Master Rule 2020 Extra Link Mechanics & Official Rulebook v10 tr. 4-5, 22-23*:
    - **Dual Extra Monster Zone (EMZ) Mapping**:
      - `getLinkedZones(duelistId, slotIndex, isEmz)` accurately models both EMZ 1 (above Column 1) and EMZ 2 (above Column 3 from Player's POV / Opponent Slot 1).
      - Cross-divider link arrow collineation: Link Monster in Player MMZ Slot 3 with `TOP` arrow links to EMZ 2 (`(opponent, -1, true)`), and Link Monster in EMZ 2 with `TOP` arrow links to Player MMZ Slot 3.
    - **`isExtraLinkActive(duelistId)` State Machine**:
      - Evaluates whether `duelistId` has created an unbroken chain of pairwise Co-Linked monsters from their primary EMZ to the opposite EMZ through their own Main Monster Zones.
      - Uses graph BFS traversal with strict controller candidate constraints ensuring players cannot claim an Extra Link using an opponent's monsters.
    - **`isMonsterInExtraLink(duelistId, slotIndex, isEmz)` Membership Resolver**:
      - Determines whether a specific monster on the field is a node along an active Extra Link chain.
    - **Opponent EMZ Lockout Invariant**:
      - When an Extra Link is active, the opponent is strictly prohibited from summoning any monster into ANY Extra Monster Zone (`linkSummon`, `synchroSummon`, and `xyzSummon` reject with explicit Master Rule 2020 Extra Link citation).
- **GDPT 2018 Chemistry Conjugated Pi-Electron Delocalization Resonance Engine (`src/domain/duelEngine.ts`)**:
  - In organic and materials chemistry (GDPT 2018 Lớp 11 & 12), an unbroken chain of alternating/linked covalent bonds forms a delocalized conjugated $\pi$-system (analogous to Polyacetylene, Benzene $C_6H_6$, and Graphene):
    - **+500 ATK Resonance Boost**:
      - `getEffectiveMonsterAtk` grants $+500$ ATK to all Link Monsters forming the Extra Link chain.
    - **Covalent Lattice Stability (Effect Destruction Immunity)**:
      - `isMonsterProtectedFromCardEffects` grants complete immunity to card effect destruction for all monsters participating in the active Extra Link.
    - **Dynamic Chain Integrity**:
      - If any intermediate Link Monster in the chain is removed (e.g. destroyed or tributed), the Extra Link immediately de-activates, and the resonance ATK boost is seamlessly revoked.
- **Audit Suite Milestones**:
  - Suite 46 (`test-yugioh-master-rules.mjs`): **46 Groups — 1,357 / 1,357 PASSED (100%)** (+28 new assertions in Group 46).
  - Full Regression (`npm test`): **All 47 test suites passing with 3,467 assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.11s with 0 errors.

---

## [2.44.0-PROD] — Link Arrow Collineation & Co-Linked Topology (Master Rule 2020)
*Timestamp: 2026-10-23T01:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Link Arrow Collineation & Co-Linked Topology Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Master Rule 2020 Link Summoning Rules & Official Rulebook v10 tr. 4-5, 22-23*:
    - **Extra Monster Zone (EMZ) Link Summoning**:
      - Enhanced `linkSummon` with `useEmz: boolean = false` and `targetSlotIndex?: number` parameters.
      - Enables direct Link Summoning into `extraMonsterZone`, marking `isExtraMonsterZone = true` and `properlySummoned = true`.
    - **`getLinkedZones(duelistId, slotIndex, isEmz)` Link Arrow Mapper**:
      - Maps all 8 directional Link Arrows (`TOP`, `BOTTOM`, `LEFT`, `RIGHT`, `TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT`) across battlefield coordinates.
      - Accurately models EMZ column positioning (above MMZ Slot 1 / Column 1), projecting `BOTTOM` to MMZ Slot 1, `BOTTOM_LEFT` to Slot 0, `BOTTOM_RIGHT` to Slot 2, and `TOP` across to opponent's field.
      - Accurately models MMZ slot coordinates, projecting `LEFT` to Slot $i-1$, `RIGHT` to Slot $i+1$, and `TOP` to EMZ or opponent's column.
    - **`isZonePointedByLinkArrow` Zone Validator**:
      - Scans battlefield for active Link arrows pointing to friendly or opposing zones.
    - **`isCoLinked` (Mutual Link - Liên Kết Đôi)**:
      - Validates mutual link topology: returns `true` if and only if Monster A's Link arrow points to Monster B's zone AND Monster B's Link arrow points to Monster A's zone.
    - **Link Monster 0 DEF Defense Prohibition**:
      - Enforces Master Rule invariant: Link monsters have 0 DEF and cannot be put in Defense position (`changeMonsterPosition` strictly rejects).
- **Audit Suite Milestones**:
  - Suite 46 (`test-yugioh-master-rules.mjs`): **45 Groups — 1,329 / 1,329 PASSED (100%)**.
  - Full Regression (`npm test`): **All 47 test suites passing with 3,438 assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.30s with 0 errors.

---

## [2.43.0-PROD] — Xyz Rank vs Level Invariants & Ultracentrifugal Gravity Bind Mechanics (Rulebook v10 tr. 25, 48-49, 54)
*Timestamp: 2026-10-23T00:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Xyz Rank vs Level Invariant Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 25 ("Xyz Monsters have Ranks instead of Levels")* & *Master Rule 2020 Link Summoning Rules*:
    - **`getMonsterLevel(card)` Type-Discriminated Resolver**:
      - Evaluates whether the card is an Xyz Monster (`cardType === 'XYZ_MONSTER'` or has `xyzRank`) or Link Monster (`cardType === 'LINK_MONSTER'` or has `linkRating`).
      - Strictly returns `undefined` for Xyz Monsters and Link Monsters (they have NO Level; it is not Level 0, but no Level at all!).
      - Robust against `PlayableCardDef` (where `def` represents monster Defense stat as a number) vs `CardInstance` (where `def` represents the definition object).
      - Returns exact numerical Level for Element, Compound/Fusion, Ritual, Synchro, and Pendulum monsters.
    - **Master Rule Reagent Restrictions**:
      - `synchroSummon`: Rejects Tuner or Non-Tuner if it is an Xyz or Link monster with explicit Master Rule citation.
      - `xyzSummon`: Rejects overlay material if it is an Xyz or Link monster with explicit Master Rule citation.
      - `ritualSummon`: Rejects tribute material if it is an Xyz or Link monster with explicit Master Rule citation.
- **Ultracentrifugal Sedimentation Gravity Bind Engine (`src/domain/duelEngine.ts`, `src/data/playableCardsData.ts`)**:
  - Implemented `isGravityBindActive()`: Scans battlefield for active face-up Continuous Trap `card_trap_centrifugal_sedimentation_gravity_bind`.
  - Integrated Level 4+ attack lock into `declareAttack` and `resolveDamageStep`:
    - Monsters with Level $\ge 4$ (e.g. Iron Level 4) are strictly prohibited from declaring an attack.
    - Monsters with Level $< 4$ (e.g. Platinum Tuner Level 3) attack normally.
    - **Rulebook v10 tr. 25 Invariant**: Xyz Monsters (e.g. Hexammine Cobalt(III) Rank 4) and Link Monsters have NO Level, and therefore are **100% immune** to the Level 4+ attack lock and declare attacks freely!
  - Registered `card_trap_centrifugal_sedimentation_gravity_bind` (*Bẫy Ly Tâm Lắng Cặn — Rào Cản Phân Tử Gravity Bind*):
    - Type: `CONTINUOUS_TRAP`, Attribute: `AQUA`, Cost: 2 Mana, Speed: 2, Optional 500 LP maintenance cost.
    - Scientific Lore: Analytical ultracentrifugation (Svedberg equation $s = \frac{v}{\omega^2 r} = \frac{M(1 - \bar{v}\rho)}{N_A f}$): Extreme centrifugal acceleration separates large macromolecular colloids (Level $\ge 4$) into a dense sediment barrier at the bottom of the optical cell. Multi-nuclear coordination complexes and nano networks (Xyz/Link) operate under Brownian diffusion and are completely exempt from macroscopic sediment limits.
- **Audit Suite Milestones**:
  - Suite 46 (`test-yugioh-master-rules.mjs`): **44 Groups — 1,309 / 1,309 PASSED (100%)**.
  - Full Regression (`npm test`): **All 47 test suites passing with 3,418 assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.34s with 0 errors.

---

## [2.42.0-PROD] — Final Master Release Audit & Comprehensive System Invariant Integrity Seal
*Timestamp: 2026-10-23T00:30:00+07:00 | Status: Production Ready, Certified & Fully Sealed*

### Added & Enhanced
- **Final Master Release Audit & Integrity Seal (`docs/gameplay/RELEASE_INTEGRITY_DOSSIER.md`)**:
  - Published canonical release integrity dossier verifying the complete 10-hour autonomous game development and gameplay reconstruction campaign:
    - **Master Rule Traceability Matrix**: 100% mathematical mapping to *Yu-Gi-Oh! Official Rulebook Version 10* and *Master Rule 2020/2021 Update* (10 Summoning Mechanics, 5-Substep Damage Step, Fast Effect Box A..E, SEGOC 4-Tier chain ordering, PSCT conjunctions, decoupled battle vs effect destruction, battle damage under battle destruction immunity invariant, Skill Drain vs detachment activation costs, and 5-column field matrix).
    - **Vietnam GDPT 2018 / IUPAC Chemistry Calibration**: Certified all 118 elements, VSEPR geometries, Arrhenius kinetics, Galvanic electrochemistry with standard reduction potentials, passivation nanometer oxide layer, and Meissner superconductivity diamagnetism.
    - **47-Suite Regression Census**: Complete census certifying all 47 test suites and **3,392 / 3,392 assertions passing (100%, 0 failures)**.
    - **Production Bundle Certification**: Clean Vite build (`tsc && vite build`) in 6.26 seconds with optimal code splitting.
- **Audit Suite Milestones**:
  - Full Regression (`npm test`): **All 47 test suites passing with 3,392 assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.26s with 0 errors.

---

## [2.41.0-PROD] — 16-Player Championship Bracket & 5-Persona Round-Robin Concurrency
*Timestamp: 2026-10-23T00:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **16-Player Single-Elimination Championship Bracket Simulation (`test-tournament-sim.mjs` - Group 6)**:
  - Grounded in canonical single-elimination tournament architecture with seeded pairings ($1 \text{ vs } 16, 8 \text{ vs } 9, 4 \text{ vs } 13, 5 \text{ vs } 12, 2 \text{ vs } 15, 7 \text{ vs } 10, 3 \text{ vs } 14, 6 \text{ vs } 11$):
  - Advanced bracket through 4 elimination tiers using `TournamentEngine.advanceRound`: Round of 16 (8 matches) $\rightarrow$ Quarterfinals (4 matches) $\rightarrow$ Semifinals (2 matches) $\rightarrow$ Grand Finals (1 match).
  - Validated mathematical tournament invariants: exactly 15 matches played total, exactly 15 competitors eliminated, and exactly 1 undefeated Champion crowned with $\ge 4$ consecutive match victories.
- **5-Persona Multi-Duel Round-Robin Concurrency (`test-tournament-sim.mjs` - Group 6)**:
  - Headless continuous combat simulation across all 5 canonical chemist personas: Dmitri Mendeleev, Marie Curie, Antoine Lavoisier, AI Alpha, and AI Beta.
  - 10 pairwise persona matchups $\times$ 5 automated duels per matchup = 50 complete duels executed sequentially.
  - Validated game state stability: normal summons, phase transitions (`MAIN_PHASE_1` $\rightarrow$ `BATTLE_PHASE` $\rightarrow$ `MAIN_PHASE_2` $\rightarrow$ `END_PHASE`), battle declarations, combat damage calculation, LP bounds, and terminal outcome resolution.
  - 100% finite state validation: zero NaN/null values, zero desynchronizations, zero memory leaks, and 0 uncaught exceptions across all 50 duels.
- **Audit Suite Milestones**:
  - Suite 7 (`test-tournament-sim.mjs`): **Expanded to 15 / 15 PASSED (100%)**.
  - Full Regression (`npm test`): **All 47 test suites passing with 3,347+ assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.26s with 0 errors.

---

## [2.40.0-PROD] — Grand Synthesis & Comprehensive Master Rule / GDPT 2018 System Audit
*Timestamp: 2026-10-23T00:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Grand Synthesis & Canonical Architectural Documentation (`docs/gameplay/GRAND_SYNTHESIS_REPORT.md`)**:
  - Published comprehensive master report summarizing the full 10-hour autonomous gameplay reconstruction campaign grounded in *Yu-Gi-Oh! Official Rulebook v10*, *Master Rule 2020/2021*, and *Vietnam GDPT 2018 / IUPAC*:
    - **10 Summoning Mechanics Synthesis**: Normal Summon/Set (max 1/turn), Flip Summon, Tribute Summon (1-2 tributes), Compound Synthesis / Fusion, Synchro Summon (Tuner + Non-Tuner level equations), Xyz Summon (Overlay materials & detachment ignition), Pendulum Summon (Dual scales 1..8 & Face-up Extra Deck routing), Ritual Summon (Level sum tributes), Link Summon (Link ratings & arrow collimation), and Special Summoning invariants.
    - **Battlefield & Coordinate Matrix Architecture**: 2 Extra Monster Zones (EMZ), 5 Main Monster Zones, 5 Spell/Trap Zones with Pendulum Zones (Slots 0 and 4), Independent Field Zones, Graveyard, Banished Zone (Face-up & Face-down), and 5-Column Grid.
    - **Combat & Timing State Machines**: 5-Substep Damage Step, Piercing Battle Damage vs Reflection, 0 ATK non-destruction rule, Battle Step Replay, Fast Effect Timing Box A..E with priority passing, Chain Stack LIFO with mid-chain termination, SEGOC 4-Tier ordering, and PSCT 4 conjunctions.
    - **Control & Board Governance**: 15-Card Side Deck, Deck Tutor & Mandatory Shuffle, Temporary Control Transfer with Field Full Overflow Destruction, Monster Tokens, and Maintenance Costs with voluntary abandonment.
    - **Decoupled Protection & Nullification**: Decoupled Battle vs Effect Destruction, Battle Damage under battle protection invariant, Global Skill Drain vs Activation costs, and Blanket stat modulation.
- **Master Gap Matrix Resolution Verification (`docs/gameplay/GAMEPLAY_IMPLEMENTATION_GAP.md`)**:
  - Confirmed all 15 implementation gaps (GAP-01 to GAP-15 across P0, P1, P2, P3, P4) are 100% IMPLEMENTED, VERIFIED, and CLOSED.
- **Audit Suite Milestones**:
  - Suite 46 (`test-yugioh-master-rules.mjs`): **43 Groups — 1,283 / 1,283 PASSED (100%)**.
  - Full Regression (`npm test`): **All 47 test suites passing with 3,345+ assertions (0 failures)**.
  - Production Build (`npm run build`): Clean Vite bundle compiled in 6.61s with 0 errors.

---

## [2.39.0-PROD] — Continuous vs Lingering Protection Invariants & Blanket Stat Modulation (Rulebook v10 tr. 30-31, 40-43, 54)
*Timestamp: 2026-10-22T23:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Continuous vs Lingering Protection Architecture (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 30-31, 40-43 ("Battle vs Effect Destruction Separation & Battle Damage Invariant")* & *tr. 54 ("Continuous vs Lingering Protections")*:
    - **Effect vs Battle Destruction Decoupling**:
      - Added `cannotBeDestroyedByBattle?: boolean` to `PlayableCardDef` and `CardInstance`.
      - Added `cannotBeDestroyedByBattle?: boolean`, `cannotBeDestroyedByCardEffects?: boolean`, `battleDestructionImmunityUntilTurn?: number`, and `effectDestructionImmunityUntilTurn?: number` to `MonsterZoneSlot`.
      - Implemented `isMonsterProtectedFromCardEffects(duelistId, slotIndex, isEmz?)`: evaluates innate monster protection (negated under Skill Drain), direct slot protection, continuous active Spells/Traps on controller's field (immune to Skill Drain), and lingering turn effects.
      - Implemented `isMonsterProtectedFromBattle(duelistId, slotIndex, isEmz?)`: evaluates innate monster battle protection, slot protection, lingering shields, and element survival shields.
    - **Battle Damage Calculation Invariant Under Battle Destruction Immunity (Rulebook v10 tr. 40-41)**:
      - In `resolveDamageStep`: When a monster with battle destruction immunity is involved in battle with a higher-ATK monster, destruction is prevented (`targetDestroyed = false`), BUT battle damage is STILL calculated and deducted from the controller's LP (`BATTLE_DESTRUCTION_PREVENTED` event emitted).
    - **Destruction Immunity Integration Across Engine Systems**:
      - Overhauled `destroyMonster`: verifies `isMonsterProtectedFromCardEffects` for effect destruction and `isMonsterProtectedFromBattle` for battle destruction before sending cards to the Graveyard.
      - Overhauled `destroyColumnCards`: verifies effect protection before destroying monsters in the laser column.
    - **Temporary Lingering Protection Granting & End Phase Expiration Engine (Rulebook v10 tr. 30-31, 54)**:
      - Implemented `grantBattleProtection(duelistId, slotIndex, duration, reason)` and `grantEffectProtection(duelistId, slotIndex, duration, reason)`.
      - Implemented `resolveEndPhaseProtections()` hooked into `resolveEndPhase()`: automatically expires temporary turn protections and resets once-per-turn shields (`passivationShieldUsed`, `inertShieldUsed`).
- **Blanket Stat Modulation & Dynamic Stacking Engine (`src/domain/duelEngine.ts`)**:
  - Implemented `getEffectiveMonsterAtk(duelistId, slotIndex, isEmz?)` and `getEffectiveMonsterDef(duelistId, slotIndex, isEmz?)`:
    - Evaluates Base ATK/DEF + Equip card modifiers + Lingering/temporary modifiers (`tempAtkBoost`, `tempDefBoost`) + Continuous Spell/Trap static modifiers (Tokamak Plasma +400, Diamond Lattice +400, Passivation Film +300, Endothermic Chamber -600) + Field Environment static buffs (+400 Octahedral Complex).
    - Respects Master Rule stacking rules: Spell/Trap/Field stat buffs remain 100% active and un-negated even when Skill Drain is on the field.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_passivation_oxide_film` (*Màng Oxit Thụ Động Hóa — Lớp Bảo Vệ Bất Hoại*):
    - Type: `CONTINUOUS_SPELL`, Attribute: `TERRA`, Cost: 2 Mana.
    - Effect: Continuous protection for face-up Terra / Metal monsters against card effect destruction, plus static +300 DEF buff.
    - Scientific Lore: Passivation phenomenon in GDPT 2018 Chemistry Grade 12: Metals Al, Fe, Cr form an ultra-thin (few nanometers), dense, chemically inert oxide film ($\text{Al}_2\text{O}_3, \text{Cr}_2\text{O}_3, \text{Fe}_3\text{O}_4$) when exposed to strong cold oxidizing acids ($\text{HNO}_3, \text{H}_2\text{SO}_4$), shielding the bulk metal from chemical attack.
    - Balanced Stoichiometric Equation: $4\text{Al} + 3\text{O}_2 \rightarrow 2\text{Al}_2\text{O}_3$ ($\Delta H^\circ = -1675.7\text{ kJ/mol}$).
  - Registered `card_spell_superconducting_meissner_shield` (*Lá Chắn Nghịch Từ Meissner Siêu Dẫn*):
    - Type: `QUICK_PLAY_SPELL`, Attribute: `ELECTRO`, Cost: 2 Mana, Speed 2.
    - Effect: Target 1 face-up monster; until End Phase, it cannot be destroyed by battle OR card effects (battle damage still calculated normally).
    - Scientific Lore: Meissner Effect in physics and physical chemistry: Complete expulsion of magnetic flux ($B = \mu_0(H + M) = 0$) from a superconductor when cooled below its critical temperature $T_c$, creating perfect diamagnetic levitation and deflecting external physical and chemical shocks.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 43: Continuous vs Lingering Protection Invariants & Blanket Stat Modulation (35 new assertions).
  - Suite 46 expanded from 1,248 to **1,283 / 1,283 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,345+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 6.61s with 0 errors.

---

## [2.38.0-PROD] — Continuous & Lingering Monster Effect Nullification Invariants (Skill Drain / Effect Negation vs Activation - Rulebook v10 tr. 48-49, 54)
*Timestamp: 2026-10-22T23:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Continuous & Lingering Monster Effect Nullification Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 48-49 ("Negating Effects vs Negating Activation")* & *tr. 54 ("Lingering vs Continuous Negation")*:
    - **Global Board Nullification (Skill Drain Invariant)**:
      - Implemented `isGlobalMonsterEffectNegationActive()` detecting active, face-up Continuous Traps with `TRAP_ABSOLUTE_ZERO_FREEZE`.
      - Suppresses the effects of all face-up monsters on both players' battlefields while remaining on the field.
    - **Activation Cost vs Effect Negation Invariant (Rulebook v10 tr. 48-49)**:
      - Monsters whose effects are negated on field CAN still declare effect activations and pay mandatory activation costs.
      - Integrated into `detachXyzMaterial`: Xyz materials detach cleanly and route to the Graveyard (cost successfully paid!), but the effect boost (+800 ATK or +1000 DEF shield) is suppressed. Emits `EFFECT_NEGATED` event telemetry with Master Rule citation.
    - **Battle & Game Mechanics Immunity Under Skill Drain (Rulebook v10 tr. 48-49)**:
      - Monsters with negated effects retain full battle rights: attack declarations, battle damage calculations, and battle position changes function without restriction.
    - **FLIP Effect Negation Invariant**:
      - Integrated negation verification into `checkFlipEffect`: face-down monsters flipped under Skill Drain have their FLIP effects suppressed without drawing cards. Emits `EFFECT_NEGATED`.
    - **Targeted Monster Negation & End Phase Expiration Engine (Rulebook v10 tr. 54)**:
      - Added `isEffectNegated?: boolean` and `effectsNegatedUntilTurn?: number` to `MonsterZoneSlot`.
      - Implemented `negateMonsterEffects(duelistId, slotIndex, duration, reason)` for surgical, targeted negation.
      - Implemented `resolveEndPhaseNegations()` hooked directly into `resolveEndPhase()`: automatically restores monster effects when temporary turn-based negation expires.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_trap_absolute_zero_freeze` (*Độ Không Tuyệt Đối — Khóa Hiệu Ứng Siêu Dẫn*):
    - Type: `CONTINUOUS_TRAP`, Attribute: `AQUA`, Cost: 3 Mana, `maintenanceCost: { lp: 500, isOptional: true }`.
    - Effect: Third Law of Thermodynamics 0 Kelvin superconducting state: Negates the effects of ALL face-up monsters on the battlefield (Skill Drain). Monsters can still attack, change position, and pay activation costs.
    - Scientific Lore: At $T = 0\text{ K} = -273.15^\circ\text{C}$, thermal entropy disappears ($\lim_{T \rightarrow 0}\Delta S = 0$), phonon vibrations cease, Cooper electron pairs condense into resistance-free superconductivity, and chemical reaction rate constants drop to zero ($k = A \cdot e^{-E_a/(RT)} \rightarrow 0$).
  - Registered `card_spell_flash_precipitation_nullifier` (*Thuốc Thử Kết Tủa Nhanh — Vô Hiệu Hóa Mục Tiêu*):
    - Type: `QUICK_PLAY_SPELL`, Attribute: `TERRA`, Cost: 2 Mana, Speed 2.
    - Effect: Selective precipitation surface passivation: Negates the effects of 1 target monster on the field until the End Phase.
    - Scientific Lore: $\text{Ba}^{2+}(aq) + \text{SO}_4^{2-}(aq) \rightarrow \text{BaSO}_4(s)\downarrow$ ($K_{sp} = 1.1 \times 10^{-10}$). Rapid insoluble barium sulfate precipitation coats active surface sites, inactivating catalytic and reaction centers.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 42: Continuous & Lingering Nullification Invariants (42 new assertions).
  - Suite 46 expanded from 1,206 to **1,248 / 1,248 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,310+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 6.14s with 0 errors.

---

## [2.37.0-PROD] — Battlefield Column Placement, Adjacency Mechanics & Beer-Lambert Laser Optics (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23)
*Timestamp: 2026-10-22T23:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Master Rule Column Placement & Adjacency Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Master Rule 2020 & Rulebook v10 tr. 4-5, 22-23 ("Battlefield Columns & Card Placement")*:
    - **5-Column Battlefield Grid Coordinate Mapping**:
      - Defined `BattlefieldColumnIndex` (0 to 4), `ColumnCardRef`, and `BattlefieldColumnSummary`.
      - Implemented `getColumnForSlot(duelistId, zoneType, slotIndex)`:
        - Player slots 0 to 4 map 1:1 to Columns 0 to 4.
        - Opponent slots 0 to 4 map symmetrically to Columns 4 to 0 ($4 - \text{slotIndex}$).
        - Extra Monster Zones (EMZ 1 & 2) accurately map to Column 1 and Column 3.
      - Implemented `getOpposingSlotIndex(slotIndex)`: returns opposing slot across the field ($4 - \text{slotIndex}$).
    - **Adjacency Mathematics & Column Queries**:
      - `getAdjacentColumns(col)` calculates immediate horizontal neighbors ($|col_A - col_B| = 1$).
      - `getCardsInColumn(col)` returns complete cross-field column census including both players' Monster and Spell/Trap zones.
      - `getAllColumnsSummary()` returns global 5-column battlefield matrix.
      - `getCardColumn(cardUid)` resolves real-time column position for any card on field.
      - `areCardsInSameColumn(cardA, cardB)` and `areCardsInAdjacentColumns(cardA, cardB)` provide precise geometric proximity tests.
    - **Targeted Column Placement & Set Spell/Trap Precision**:
      - Upgraded `setSpellTrap(duelistId, handCardUid, preferredSlotIndex?)` enabling strategic placement of cards into specific tactical columns.
      - Upgraded `activateSpellFromHand` to respect `preferredSlot` for continuous spells without conflicting with monster target validation.
    - **Straight-Column Laser Destruction & Beer-Lambert Absorbance Damage**:
      - Implemented `destroyColumnCards(columnIndex, reason)`: cleanly destroys all cards in a designated vertical column across both fields and routes cards to their original owners' Graveyards. Emits `COLUMN_CARDS_DESTROYED`.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_spectrophotometer_laser_collimator` (*Tia Laser Quang Phổ Đo Thẳng Cột*):
    - Type: `NORMAL_SPELL`, Attribute: `ELECTRO`, Cost: 3 Mana.
    - Effect: Straight-line photon beam collimation: Destroys ALL cards in selected column (0 to 4). Calculates Beer-Lambert Law absorbance ($A = -\log_{10}(T) = \varepsilon \cdot l \cdot c$) and inflicts 500 damage per destroyed card to opponent.
    - Scientific Lore: $A = \varepsilon \cdot l \cdot c$. Collimated monochromatic photon beam passing through cuvette excites and ionizes molecules in a straight optical path.
  - Registered `card_spell_diamond_crystal_lattice` (*Mạng Tinh Thể Kim Cương Định Hướng Cột*):
    - Type: `CONTINUOUS_SPELL`, Attribute: `TERRA`, Cost: 2 Mana.
    - Effect: Continuous diamond lattice resonance: Any friendly monster with an allied monster in an adjacent column ($|col_A - col_B| = 1$) gains +400 ATK and +400 DEF.
    - Scientific Lore: Carbon $sp^3$ tetrahedral network (bond angle $109.5^\circ$, Mohs hardness 10), dispersing kinetic energy and reinforcing adjacent structural columns.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 41: Column Placement & Adjacency Targeting Mechanics (88 new assertions).
  - Suite 46 expanded from 1,118 to **1,206 / 1,206 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,268+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 6.41s with 0 errors.

---

## [2.36.0-PROD] — Control of Cards, Temporary Control Transfer & Field Full Overflow Invariants (Rulebook v10 tr. 47 & 55)
*Timestamp: 2026-10-22T23:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Control of Cards & Temporary Control Transfer Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 47 ("Control of Cards")* & *tr. 55 ("Monster Return Invariants")*:
    - **Original Owner vs Controller Tracking**: Added `originalOwnerId?: string` to `CardInstance`. All card instantiations track original ownership immutably.
    - **Temporary Control Transfer State**: Defined `TemporaryControlTransferRecord` tracking `cardUid`, `originalOwnerId`, `currentControllerId`, `originalSlotIndex`, `transferredAtTurn`, `duration`, `canAttack`, `canTribute`, `preservedPosition`, and `reason`.
    - **Open Monster Zone Verification**: `takeControlOfMonster` rejects takeover with Rulebook v10 tr. 47 citation if controller's 5 Monster Zones are completely full.
    - **State & Attachment Preservation**: Monster battle position (`FACE_UP_ATTACK`, `FACE_UP_DEFENSE`, `FACE_DOWN_DEFENSE`), Xyz overlay materials (`xyzMaterials`), equipped cards (`equippedCards`), and attack counters remain preserved across the transfer.
    - **Attack & Tribute Restrictions (Rulebook v10 tr. 47)**:
      - Attack declarations blocked when `canAttack: false`.
      - Normal Tribute, Ritual Tribute, and Extra Deck sacrifices blocked when `canTribute: false`.
    - **Automatic End Phase Return & Field Full Overflow Destruction (Rulebook v10 tr. 55)**:
      - `resolveEndPhaseControlReturns()` hooked into `resolveEndPhase()`.
      - If original owner has open monster zone: returns cleanly to owner's field (`MONSTER_CONTROL_RETURNED`).
      - If original owner has 0 open zones (5/5 occupied): monster is destroyed by game mechanics and routed directly to original owner's Graveyard (`MONSTER_DESTROYED_BY_OVERFLOW_ON_RETURN`), without damaging LP or leaving the card stranded.
    - **Owner Graveyard & Banished Routing (Rulebook v10 tr. 47 & 55)**:
      - `sendCardToGraveyard` and `banishCardFromField` route destroyed or banished cards strictly to `card.originalOwnerId`'s zones, never controller's zones.
      - Pendulum monsters on field route to original owner's face-up Extra Deck.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_chelation_capture_edta` (*Phối Tử Chelate Hóa EDTA — Chiếm Quyền Kiểm Soát*):
    - Type: `NORMAL_SPELL`, Attribute: `AQUA`, Cost: 3 Mana.
    - Effect: Hexadentate chelation complex formation: $[\text{M(EDTA)}]^{n-4}$. Takes control of 1 opponent metal or electrolyte monster until the End Phase. Target monster cannot attack or be tributed while controlled.
    - Scientific Lore: Ethylenediaminetetraacetic acid ($\text{H}_4\text{EDTA}$) acts as a hexadentate ligand coordinating metal cations ($\text{Ca}^{2+}, \text{Fe}^{3+}, \text{Cu}^{2+}$) via 2 amine nitrogen atoms and 4 carboxylate oxygen atoms, sequestering them completely.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 40: Control of Cards, Temporary Control Transfer & Field Full Overflow Invariants (61 new assertions).
  - Suite 46 expanded to **1,118 / 1,118 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,180+ assertions (0 failures)**.

---

## [2.35.0-PROD] — Continuous Spell & Trap Maintenance Costs, Voluntary Abandonment & Field Zone Collapses (Rulebook v10 tr. 28-29, 32)
*Timestamp: 2026-10-22T22:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Continuous Maintenance & Voluntary Abandonment Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 28-29 ("Continuous Spells/Traps")* & *tr. 32 ("Maintenance Costs")*:
    - **Maintenance Cost Type System**: Expanded `maintenanceCost?: { lp?: number; mana?: number; isOptional?: boolean }` on `PlayableCardDef` and `CardInstance`.
    - **Dual LP + Mana Maintenance Resource Deduction**: Standby Phase (`resolveStandbyEffects`) automatically deducts both LP and Mana costs when resources are sufficient, firing `MAINTENANCE_COST_PAID` event telemetry.
    - **Resource Starvation Destruction Cascades**: If duelist has insufficient LP or Mana, the continuous card immediately collapses, routes to the Graveyard (`CARD_DESTROYED_BY_MAINTENANCE_FAILURE`), and does NOT deduct negative resources.
    - **Voluntary Maintenance Abandonment (`isOptional: true` - Rulebook v10 tr. 32)**:
      - Implemented `relinquishMaintenance(duelistId, target: number | 'FIELD')` helper allowing controllers to voluntarily cease maintenance on active cards.
      - Upon Standby Phase, cards marked with `voluntaryMaintenanceCeased = true` self-destruct cleanly (`CARD_VOLUNTARILY_ABANDONED`) and route to the Graveyard without deducting LP or Mana.
    - **Field Zone Maintenance & Destruction Governance**:
      - Integrated full maintenance cost verification and voluntary abandonment support directly into the Field Zone (`FIELD_VOLUNTARILY_ABANDONED` and `FIELD_DESTROYED_BY_MAINTENANCE_FAILURE`).
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_endothermic_refrigeration_chamber` (*Buồng Làm Lạnh Thu Nhiệt Liên Tục*):
    - Subtype: `CONTINUOUS_SPELL`, Attribute: `AQUA`, Cost: 2 Mana, `maintenanceCost: { mana: 1, isOptional: true }`.
    - Effect: Continuous endothermic cooling: Reduces all opponent Pyro monsters' ATK by -600. Requires 1 Mana per Standby Phase; controller may voluntarily cease maintenance to destroy it.
    - Scientific Lore: $\text{Ba(OH)}_2\cdot 8\text{H}_2\text{O}(s) + 2\text{NH}_4\text{SCN}(s) \rightarrow \text{Ba(SCN)}_2(aq) + 2\text{NH}_3(g) + 10\text{H}_2\text{O}(l)$ ($\Delta H^\circ > 0$, endothermic enthalpy freezing moisture).
  - Registered `card_trap_continuous_anodic_protection` (*Màng Thụ Động Hóa Anot Liên Tục*):
    - Subtype: `CONTINUOUS_TRAP`, Attribute: `ELECTRO`, Cost: 2 Mana, Speed 2, `maintenanceCost: { lp: 600, isOptional: true }`.
    - Effect: Impressed current anodic protection: All friendly Terra/metallic monsters gain immunity against card effect destruction. Requires 600 LP per Standby Phase; controller may voluntarily cease maintenance.
    - Scientific Lore: $\text{Fe} \rightarrow \text{Fe}^{3+} + 3e^-$; $2\text{Fe}^{3+} + 3\text{H}_2\text{O} \rightarrow \text{Fe}_2\text{O}_3(s) + 6\text{H}^+$ (Oxide passivation layer).
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 39: Continuous Spell & Trap Maintenance Costs, Voluntary Abandonment & Field Zone Collapses (36 new assertions).
  - Suite 46 expanded to **1,057 / 1,057 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,119+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 7.08s with 0 errors.

---

## [2.34.0-PROD] — Damage Step Effect Restrictions & Only Effects that Modify ATK/DEF / Counter Traps Activation Invariants (Rulebook v10 tr. 43)
*Timestamp: 2026-10-22T22:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Damage Step Activation Restriction Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 43 ("Damage Step Effect Restrictions")*:
    - **Damage Step Substep Progression**: Added `currentDamageStepSubstep: 0 | 1 | 2 | 3 | 4 | 5` and public getters/setters in `DuelEngine`.
      - Mốc 1 (Substep 1): Start of Damage Step.
      - Mốc 2 (Substep 2): Before Damage Calculation (Flip face-down defense monsters).
      - Mốc 3 (Substep 3): During Damage Calculation.
      - Mốc 4 (Substep 4): After Damage Calculation (Inflict battle damage & trigger FLIP effects).
      - Mốc 5 (Substep 5): End of Damage Step (Send destroyed monsters to GY).
      - Mốc 0: Neutral / Outside of Damage Step.
    - **Activation Filter (`canActivateInDamageStep(card, currentSubstep)`)**:
      - **Counter Traps (Spell Speed 3)**: Allowed throughout ALL substeps (1 through 5) of the Damage Step.
      - **Mandatory Trigger Effects**: Allowed (FLIP effects, mandatory battle destruction triggers).
      - **Explicit Damage Step Cards**: Non-ATK/DEF cards specifying activation in the Damage Step (e.g. `activationWindow: 'ON_BATTLE_DESTROYED'` or `'DAMAGE_STEP'`).
      - **Fast Effects Modifying ATK/DEF (`modifiesAtkDef: true`)**: Permitted ONLY in Substep 1 and Substep 2 (Before Damage Calculation). Strictly BLOCKED in Substeps 3, 4, 5 (During/After Damage Calculation, End of Damage Step) with explicit citation to Rulebook v10 tr. 43.
      - **Normal Spells (Spell Speed 1)**: STRICTLY PROHIBITED in the Damage Step under all circumstances.
      - **Regular Traps & Non-ATK/DEF Fast Effects**: Strictly prohibited unless specifically permitted.
    - **Activation Gatekeeping**: Integrated `currentDamageStepSubstep` checks directly into `pushChain`, `activateSpellFromHand`, and `activateSpellTrapFromField`.
    - **Automatic Combat State Cleanup**: Combat resolution (`resolveDamageStep`) updates `currentDamageStepSubstep` sequentially from 1 to 5 and guarantees reset to 0 upon completion.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_trap_galvanic_counter_shock` (*Bẫy Xung Điện Điện Hóa Galvanic*):
    - Subtype: `COUNTER_TRAP`, Speed 3, Attribute: `ELECTRO`, Cost: 2 Mana.
    - Effect: Permitted across all substeps 1-5 of the Damage Step (Rulebook v10 tr. 43). Negates opponent card/effect activation on chain, and Daniell galvanic cell potential ($E^\circ_{\text{pin}} = +1.10\text{ V}$) delivers 600 LP direct damage to opponent.
    - Scientific Lore: $\text{Zn}(s) + \text{Cu}^{2+}(aq) \rightarrow \text{Zn}^{2+}(aq) + \text{Cu}(s)$ ($E^\circ = +1.10\text{ V}$).
  - Registered `card_spell_crystallization_barrier` (*Màng Chắn Kết Tinh Đột Biến*):
    - Subtype: `QUICK_PLAY_SPELL`, Speed 2, Attribute: `TERRA`, Cost: 2 Mana, `modifiesAtkDef: true`, `activationWindow: 'DAMAGE_STEP'`.
    - Effect: Permitted in Damage Step Substeps 1-2 (Before Damage Calculation). Exothermic supersaturated crystallization fortifies target defense monster with immediate +1000 DEF.
    - Scientific Lore: $\text{CH}_3\text{COONa}(aq) \rightarrow \text{CH}_3\text{COONa}\cdot 3\text{H}_2\text{O}(s)$ (Exothermic spontaneous crystallization).
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 38: Damage Step Effect Restrictions & ATK/DEF Modifiers vs Counter Traps Invariants (59 new assertions).
  - Suite 46 expanded to **1,021 / 1,021 PASSED (100%)** — officially exceeding 1,000 Master Rule verification assertions!
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,083+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 7.59s with 0 errors.

---

## [2.33.0-PROD] — Multi-Target Spell/Trap Card Resolution & Partial Target Disappearance Invariants (Rulebook v10 tr. 48-49 & 54)
*Timestamp: 2026-10-22T22:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Multi-Target Activation & Resolution Validation Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 48-49 ("Targeting")* & *tr. 54 ("Both / All Targets")*:
    - **Target Reference Model (`ChainTargetRef`)**: Added `targetRefs?: ChainTargetRef[]`, `targetSlotIndices?: number[]`, and `requiresAllTargets?: boolean` to `ChainItem` and `PlayableCardDef`.
    - **Activation-Time Target Locking**: Targets are locked at activation in `pushChain`. Auto-derives target references dynamically if slot indices are passed, accurately tracking card instance UIDs and battlefield zones.
    - **Resolution-Time Target Verification (`validateChainTargets`)**:
      - Checks whether each targeted monster/card is still present and valid in its designated zone/slot.
      - **"Resolve As Much As Possible" Invariant (Standard Yu-Gi-Oh! Rule - Rulebook v10 tr. 48-49)**: If 1 of $N$ targets leaves the field or becomes invalid, but other target(s) remain, the effect still applies to all remaining valid targets (`CHAIN_TARGET_PARTIAL_APPLIED`).
      - **Strict "Both / All Targets" Invariant (`requiresAllTargets: true` - Rulebook v10 tr. 48-49 & 54)**: If a card specifies "both" or requires all targets for chemical conjugation, the loss of even 1 target causes the entire effect to resolve without effect (`EFFECT_RESOLVED_WITHOUT_EFFECT` with reason `MISSING_REQUIRED_ALL_TARGETS`). Neither target is affected, and the card is cleanly sent to the Graveyard.
      - **Total Target Disappearance**: When ALL designated targets leave the field prior to chain link resolution, the card fizzles completely (`EFFECT_RESOLVED_WITHOUT_EFFECT` with reason `ALL_TARGETS_DISAPPEARED`), and the card is routed to the Graveyard.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_dual_electrolysis` (*Điện Phân Lưỡng Cực Catot - Anot*):
    - Subtype: `REACTION_SPELL`, `NORMAL_SPELL`, Attribute: `ELECTRO`, Cost: 2 Mana, `targetCount: 2`, `requiresAllTargets: false`.
    - Effect: Targets 2 monsters on the field. Each suffers electrochemical ionic dissolution: -600 ATK; if ATK $\le 600$, the monster dissolves and is destroyed (`MONSTER_DESTROYED_BY_EFFECT` with reason `ELECTROLYSIS_DISSOLUTION`). If 1 target leaves the field, the other target is still affected.
    - Pedagogical Equation: $2\text{NaCl} + 2\text{H}_2\text{O} \xrightarrow{\text{đpdd màng ngăn}} 2\text{NaOH} + \text{Cl}_2\uparrow (\text{Anot}) + \text{H}_2\uparrow (\text{Catot})$.
  - Registered `card_spell_redox_coupling` (*Ghép Đôi Phản Ứng Oxy Hóa - Khử*):
    - Subtype: `REACTION_SPELL`, `QUICK_PLAY_SPELL`, Attribute: `PYRO`, Cost: 3 Mana, Speed 2, `targetCount: 2`, `requiresAllTargets: true`.
    - Effect: Targets exactly 2 face-up monsters (1 allied and 1 opponent). Electron transfer: Allied monster receives +600 ATK, and exothermic reaction heat inflicts 800 LP damage to opponent. If either target disappears before resolution, electron transfer collapses and the effect resolves without effect!
    - Pedagogical Equation: $\text{Fe} + \text{Cu}^{2+} \rightarrow \text{Fe}^{2+} + \text{Cu}$ ($\Delta H^\circ < 0$, Law of Electron Conservation).
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 37: Multi-Target Spell/Trap Card Resolution & Partial Target Disappearance Invariants (34 new assertions).
  - Suite 46 expanded to **962 / 962 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 3,024+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 8.42s with 0 errors.

---

## [2.32.0-PROD] — Hand Size Limit, Maintenance Costs & Turn Player Standby Phase Chemical Depletion Invariants (Rulebook v10 tr. 32-35)
*Timestamp: 2026-10-22T22:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Standby Phase Maintenance Costs & Automated Field Collapse (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 32 ("Standby Phase: Maintenance Costs")*:
    - **Maintenance Cost Verification**: Cards with continuous maintenance costs (e.g. LP payments, mana costs) require controller payment during each controller's Standby Phase.
    - **Automated Destruction upon Inability/Failure to Pay**: If the duelist's LP is strictly less than the maintenance cost requirement, the maintenance fails (`CARD_DESTROYED_BY_MAINTENANCE_FAILURE`), 0 LP is deducted, and the card collapses and is sent to the Graveyard.
    - **Resource Deduction upon Valid Payment**: When LP is sufficient, the maintenance cost is deducted (`MAINTENANCE_COST_PAID`), and the card's continuous benefit remains fully active.
- **Nuclear Chemistry Radioactive Half-Life Decay & Standby Depletion Engine**:
  - Grounded in Vietnam GDPT 2018 Nuclear Chemistry ($N(t) = N_0 \cdot 2^{-t/T_{1/2}}$) and Master Rule countdown triggers:
    - Added `decayCounters?: number` to `PlayableCardDef` and `CardInstance`.
    - Implemented automatic decay counter decrementing in `resolveStandbyEffects`: each Standby Phase of controller, removes 1 half-life counter, emits an $\alpha$-particle ($^4_2\text{He}^{2+}$) dealing 400 radiation burn damage to opponent (`RADIOACTIVE_ALPHA_DECAY`).
    - When all half-life counters reach 0, the nucleus fully decays into stable Lead-206 ($^{206}\text{Pb}$) and is cleanly routed to the Graveyard (`MONSTER_DECAY_COMPLETED`).
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_plasma_containment` (*Giam Cầm Plasma Từ Trường Tokamak*):
    - Subtype: `REACTION_SPELL`, `CONTINUOUS_SPELL`, Attribute: `ELECTRO`, Cost: 3 Mana.
    - Maintenance Cost: 500 LP per Standby Phase.
    - Field Benefit: While maintained, all allied Electro and Pyro monsters gain +400 ATK. If controller cannot pay 500 LP, the confinement collapses and the card is destroyed.
    - Pedagogical Equation: $^2\text{H} + ^3\text{H} \rightarrow ^4\text{He} + \text{n} + 17.6\text{ MeV}$ (Nuclear fusion Lorentz magnetic confinement).
  - Registered `card_elem_88_ra` (*Radium — Phân Rã Phóng Xạ Alpha*):
    - Type: `ELEMENT_MONSTER`, Level 4, ATK: 1600, DEF: 1200, Attribute: `ELECTRO`.
    - Initial Half-Life Decay Counters: 3.
    - In Standby Phase: Removes 1 counter, deals 400 radiation damage to opponent. When 0 counters remain, fully decays and transits to GY.
    - Pedagogical Equation: $^{226}_{88}\text{Ra} \rightarrow ^{222}_{86}\text{Rn} + ^4_2\text{He}^{2+}$.
- **End Phase Hand Size Limit Discard Invariants (Rulebook v10 tr. 31 & 35)**:
  - Overhauled `discardCardFromHand` to route cards via `sendCardToGraveyard` and record `'CARD_DISCARDED'` and `'SENT_TO_GRAVEYARD'` with `reason: 'HAND_SIZE_LIMIT'`.
  - Verified hand excess calculation, single and multi-card discard down to exactly 6 cards, and opponent hand immunity during player turn.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 36: Hand Size Limit, Maintenance Costs & Turn Player Standby Phase Chemical Depletion Invariants (42 new assertions).
  - Suite 46 expanded to **928 / 928 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,990+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 6.21s with 0 errors.

---

## [2.31.0-PROD] — Battle Damage Calculation, Replay & Substep 4 Direct Attack Modulation Invariants (Rulebook v10 tr. 40-43)
*Timestamp: 2026-10-22T21:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Damage Step 5-Substep Chronological Resolution Flow (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 40-43 ("Damage Step")* & *tr. 50 ("0 ATK Monsters")*:
    - **Substep 1: Start of Damage Step (`Mốc 1: Bắt Đầu Damage Step`)**: Initial engagement; trigger window opens for effects that specifically activate at the start of the Damage Step.
    - **Substep 2: Before Damage Calculation (`Mốc 2: Trước Tính Toán`)**: Face-down defense position monsters are flipped face-up into Face-Up Defense position; FLIP effects do NOT activate yet (their activation condition is met, but resolution waits for Substep 4).
    - **Substep 3: During Damage Calculation (`Mốc 3: Tính Sát Thương`)**: ATK vs ATK or ATK vs DEF values are calculated. Only effects that specifically modify ATK/DEF (or counter traps) can activate. Monsters are strictly marked for destruction without being sent to Graveyard prematurely.
    - **Substep 4: After Damage Calculation (`Mốc 4: Sau Tính Toán`)**: Battle damage is inflicted to the losing duelist's LP. FLIP effects activate and resolve. Continuous destruction-prevention shields (e.g. Aluminum Passivation, Helium Inert Octet) trigger and prevent destruction before Graveyard transit.
    - **Substep 5: End of Damage Step (`Mốc 5: Kết Thúc Damage Step`)**: Monsters marked as destroyed by battle are finally sent to the Graveyard (or vanished if Tokens, or face-up Extra Deck if Pendulums). Floating triggers ("When this card is destroyed by battle and sent to GY") fire in SEGOC order.
- **Battle Damage Calculation & Invariant Matrix**:
  - **Attack vs Attack**:
    - Greater ATK destroys lower ATK monster; difference is deducted from defender's LP.
    - Suicide Attack (Lower ATK attacks higher ATK): attacking monster is destroyed; difference is deducted from attacker's LP.
    - Equal ATK (> 0): both monsters are destroyed; exactly 0 battle damage dealt.
    - Equal 0 ATK (Rulebook v10 tr. 50 invariant): neither monster is destroyed by battle; exactly 0 battle damage dealt.
  - **Attack vs Defense**:
    - ATK > DEF (Normal): defender is destroyed; exactly 0 battle damage dealt to LP.
    - ATK > DEF (Piercing - `piercingDamage`, `EQUIP_PIERCING_DRILL`, `COMP_HCL_DISSOLVE`): defender is destroyed; difference is deducted from defender's LP as piercing damage.
    - ATK < DEF (Reflection): neither monster is destroyed; difference is deducted from attacker's LP as reflection damage.
    - ATK == DEF: neither monster is destroyed; 0 damage dealt.
  - **Direct Attack Modulation**:
    - Opponent controls 0 monsters: full ATK dealt as direct battle damage.
    - Opponent controls monsters: direct attack strictly rejected unless overridden by specific elemental ability.
    - Fluorine (`card_elem_9_f`, `ELEM_F_MAX_OX`): bypasses defense line and attacks directly when opponent controls only Defense position monsters.
- **Battle Step Replay Mechanics (`src/domain/duelEngine.ts`, Rulebook v10 tr. 40-41)**:
  - When an attack is declared in the Battle Step, if the number of opponent's monsters changes before entering the Damage Step, a Replay is triggered (`replayTriggered = true`).
  - Attacking player has 3 tactical decisions:
    1. `'RETARGET'`: choose a new valid target from `eligibleTargetSlots`.
    2. `'DIRECT'`: execute direct attack if all opponent monsters were cleared.
    3. `'CANCEL'`: safely abort the attack without entering Damage Step or taking damage; attacker's attack right for the turn is consumed (`hasAttackedThisTurn = true`).
  - AI Autonomous Replay Solver (`aiResolveBattleReplay`): tactically prioritizes Direct Attack > High-value monster destruction > Safe cancellation (tactical retreat to prevent kamikaze death).
- **Game Event History Telemetry**:
  - `recordGameEvent` records `'BATTLE_DAMAGE_DEALT'` with exact damage dealt, recipient duelist, and card UID.
  - `recordGameEvent` records `'MONSTER_DESTROYED_BY_BATTLE'` and `'MONSTER_SENT_TO_GRAVEYARD'` with `'BATTLE_DESTRUCTION'`.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 35: Battle Damage Calculation & Replay/Substep 4 Direct Attack Modulation Invariants (68 new assertions).
  - Suite 46 expanded to **886 / 886 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,950+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle compiled in 6.84s with 0 errors.

---

## [2.30.0-PROD] — Token Monster Mechanics & Field Space/Fusion/Xyz/Link Restriction Invariants (Rulebook v10 tr. 48-49)
*Timestamp: 2026-10-22T21:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Monster Token Engine & Invariant Governance (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 48-49 ("Monster Tokens")* & *tr. 51 ("Xyz Monsters")*:
    - **Token Creation (`summonToken`)**: Special Summons a Monster Token to an available Main Monster Zone in Face-Up Attack or Face-Up Defense position.
    - **Face-Down Position Prohibition**: Tokens CANNOT exist in Face-Down Defense position; attempting to summon or set a token face-down is strictly rejected (`[Quy Tắc Monster Token - Rulebook v10 tr. 48]`).
    - **Field Space Bounds Invariant**: Tokens require an open Main Monster Zone; attempting to summon when all 5 zones are full (5/5) is strictly blocked.
    - **Token Disappearance Invariant**: Whenever a Monster Token leaves the field for ANY reason (destroyed by battle/effect, tributed, banished, or sent to Graveyard), it **disappears completely from the duel** and NEVER enters the Graveyard, Hand, Deck, or Banished Zone.
    - **Xyz Material Prohibition Invariant**: Monster Tokens **CANNOT be used as Xyz Material** under any circumstances (Rulebook v10 tr. 48 & 51). Any attempt to overlay a Token for an Xyz Summon is rejected with canonical citation.
    - **Tribute, Synchro & Fusion Compatibility**: Tokens CAN be used as Tribute for Tribute Summons, as non-Tuner Synchro Material, or as Fusion/Synthesis reactants, disappearing immediately without polluting the Graveyard.
  - **DuelEngine State & Routing Interceptors**:
    - Overhauled `sendCardToGraveyard` to intercept `card.isToken === true` or `card.def.cardType === 'TOKEN_MONSTER'`, bypassing Graveyard insertion.
    - Overhauled `banishMonster` and `banishCardFromField` to intercept Token banishment, preventing entry into `duelist.banished`.
    - Overhauled `xyzSummon` to inspect all overlay candidates and strictly reject Monster Tokens.
    - Overhauled `normalSummon` and `compoundSynthesisSummon` to route materials via `sendCardToGraveyard`, preserving Token vanishing invariants.
- **Photolysis Radical Generator Playable Card (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_photolysis_radicals` (*Quang Phân Sinh Gốc Tự Do* - Ultraviolet Photolytic Radical Generator):
    - Subtype: `REACTION_SPELL`, `NORMAL_SPELL`, Attribute: `AERO`, Cost: 2 Mana.
    - Pedagogical Chemistry: Homolytic cleavage of peroxide or halogen bonds under UV irradiation ($\text{H}_2\text{O}_2 + h\nu \rightarrow 2\cdot\text{OH}$ / $\text{Cl}_2 + h\nu \rightarrow 2\cdot\text{Cl}$).
    - Effect: Special Summons 2 "Monster Token Gốc Tự Do Hydroxyl ·OH" (Level 1, AERO, 500 ATK / 500 DEF) onto open field zones (Rulebook v10 tr. 48-49).
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 34: Token Monster Mechanics & Field Space/Fusion/Xyz/Link Restriction Invariants (40 new assertions).
  - Verified Photolysis Radical Generator card definition, Token summoning and attributes, Face-down defense prohibition, 5/5 full field space rejection, Token disappearance upon effect destruction (0 GY cards), Token disappearance upon banishment (0 banished cards), Token valid Tribute for Tribute Summon, Xyz Material prohibition rejection, and Photolysis Spell dual token generation on field.
  - Suite 46 expanded to **818 / 818 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,890+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle in 8.43s with 0 errors.

---

## [2.29.0-PROD] — Missing the Timing ("When... you can..." vs "If... you can...") & Simultaneous Trigger Resolution Invariants (Rulebook v10 tr. 52-53)
*Timestamp: 2026-10-22T21:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Missing the Timing State Machine & Event Tracking Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 52-53 ("Missing the Timing")*:
    - **Mandatory Trigger Effects (`'MANDATORY'`)**: *"When [X] happens: do [Y]"* or *"If [X] happens: do [Y]"* without the conjunction *"you can"*. These effects NEVER miss the timing and must activate in the very next chain via SEGOC.
    - **Optional "If" Trigger Effects (`'OPTIONAL_IF'`)**: *"If [X] happens: You can do [Y]"*. These effects NEVER miss the timing even if something else occurred after the condition was met.
    - **Optional "When" Trigger Effects (`'OPTIONAL_WHEN'`)**: *"When [X] happens: You can do [Y]"*. Can ONLY be activated if the trigger event was the **very last thing that happened** in the duel (`isLastGameEvent`). If followed by a Tribute Summon or a subsequent Chain Link resolution, the effect MISSES THE TIMING.
  - **DuelEngine State Fields & Methods**:
    - Added `lastGameEvent: GameEventRecord | null = null`.
    - Added `gameEventHistory: GameEventRecord[] = []`.
    - Implemented `recordGameEvent(eventType, card?, duelistId?, payload?, chainIndex?): GameEventRecord`.
    - Implemented `getLastGameEvent(): GameEventRecord | null`.
    - Implemented `isLastGameEvent(eventType: string, cardUid?: string): boolean`.
    - Implemented `canActivateTriggerEffect(card, timingType, requiredEventType, targetCardUid?)`: returns `{ canActivate: boolean; missedTiming: boolean; reason: string }` with canonical Rulebook v10 citations.
  - **Granular Action & Chain Event Recording**:
    - Integrated event tracking into `normalSummon` (distinguishing `'TRIBUTED'` and `'SENT_TO_GRAVEYARD'` from subsequent `'TRIBUTE_SUMMON_COMPLETED'` and `'NORMAL_SUMMON_COMPLETED'`).
    - Integrated event tracking into `destroyMonster` (`'MONSTER_DESTROYED'` & `'SENT_TO_GRAVEYARD'`).
    - Integrated event tracking into `sendMonsterToGraveyard` and `tributeMonster`.
    - Integrated event tracking into `resolveChain` (`'CHAIN_LINK_RESOLVED'`), ensuring Chain Link 2 destructions followed by Chain Link 1 resolutions correctly trigger Missing the Timing for optional "When" triggers.
- **Pedagogical Chemical Playable Cards (`src/data/playableCardsData.ts`)**:
  - Registered `card_elem_12_mg_spark` (*Magiê — Tia Sáng Rực Rỡ*):
    - Subtype: `ELEMENT_MONSTER`, Attribute: `PYRO`, Level: 3, ATK: 1200 / DEF: 1000.
    - Timing: `OPTIONAL_WHEN` (*"Khi lá bài này được gửi vào Mộ Bài: Bạn có thể rút 1 lá bài..."*).
    - Pedagogical Chemistry: Rapid combustion flash ($2\text{Mg} + \text{O}_2 \rightarrow 2\text{MgO}$, $\Delta H^\circ = -1203\text{ kJ/mol}$) that fades instantly if not timed correctly.
  - Registered `card_elem_13_al_amphoteric` (*Nhôm — Mạng Tinh Thể Lưỡng Tính*):
    - Subtype: `ELEMENT_MONSTER`, Attribute: `TERRA`, Level: 4, ATK: 1400 / DEF: 1800.
    - Timing: `OPTIONAL_IF` (*"Nếu lá bài này được gửi vào Mộ Bài: Bạn có thể hồi phục 800 LP..."*).
    - Pedagogical Chemistry: Stable $\text{Al}_2\text{O}_3$ passivated amphoteric mesh reacting in both acid and base without missing triggers.
  - Registered `card_elem_17_cl_fumes` (*Khí Clo — Khói Độc Bốc Hơi*):
    - Subtype: `ELEMENT_MONSTER`, Attribute: `AERO`, Level: 3, ATK: 1100 / DEF: 900.
    - Timing: `MANDATORY` (*"Khi lá bài này được gửi vào Mộ Bài: Trừ 600 LP đối thủ"*).
    - Pedagogical Chemistry: Pungent halogen oxidant ($\text{Cl}_2 + \text{H}_2\text{O} \rightleftharpoons \text{HCl} + \text{HClO}$), automatically triggering toxic damage through SEGOC.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 33: Missing the Timing ("When... you can..." vs "If... you can...") & Simultaneous Trigger Invariants (44 new assertions).
  - Verified Magnesium, Aluminium, and Chlorine trigger classifications, direct send-to-GY activation, Tribute Summon Missing the Timing rejection for Mg vs immunity for Al and Cl, resolving chain CL2 vs CL1 timing evaluation, and SEGOC 3-tier simultaneous resolution ordering (Turn Player Mandatory -> Opponent Mandatory -> Turn Player Optional).
  - Suite 46 expanded to **778 / 778 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,850+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle in 6.79s with 0 errors.

---

## [2.28.0-PROD] — Fast Effect Timing State Machine & Priority Passing Protocol (Rulebook v10 tr. 44-47)
*Timestamp: 2026-10-22T21:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Fast Effect Timing Chart State Machine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 44-47 ("Fast Effect Timing")*:
    - **Box A (Open Game State)**: Turn player holds priority. Both players may not activate Fast Effects until an action is declared or priority is passed.
    - **Box B (Trigger Check)**: Trigger effects are checked after any action that does not start a chain (e.g., Normal Summon, changing battle position).
    - **Box C (Turn Player Fast Effect Priority)**: Turn player gets the first opportunity to activate a Fast Effect (Spell Speed 2+).
    - **Box D (Opponent Fast Effect Priority)**: If turn player passes priority in Box C, opponent gets opportunity to activate a Fast Effect.
    - **Box E (Chain Active / Resolution)**: Triggered whenever a card/effect is activated into `chainStack`. Consecutive priority passes between both players automatically triggers LIFO chain resolution.
  - **DuelEngine State Fields & Methods**:
    - Added `fastEffectTimingBox: FastEffectTimingBox = 'BOX_A_OPEN_GAME_STATE'`.
    - Added `priorityPlayerId: string = 'player'`.
    - Added `consecutivePriorityPasses: number = 0`.
    - Implemented `getFastEffectTimingBox(): FastEffectTimingBox`.
    - Implemented `getPriorityPlayerId(): string`.
    - Implemented `setFastEffectTimingBox(box: FastEffectTimingBox): void`.
    - Implemented `triggerFastEffectWindow(actionDescription: string)`: transitions Box A -> Box B/C with turn player priority.
    - Implemented `passPriority(duelistId: string)`: validates current priority holder, handles Box C -> Box D transitions, Box D -> Box A reset, and Box E automatic chain resolution upon 2 consecutive priority passes.
    - Implemented `getEligibleFastEffects(duelistId: string)`: returns valid Fast Effects (Spell Speed 2 or 3) from field Spell/Trap zones or hand (Quick-Play spells for turn player), enforcing strict Spell Speed hierarchy against the top of the chain stack.
  - **Spell Speed Chaining & LIFO Resolution Invariants**:
    - Enforced that Spell Speed 1 cards cannot chain to existing chains (`chainStack.length > 0 && spellSpeed === 1`).
    - Enforced that lower Spell Speed cards cannot respond to higher Spell Speed cards (`spellSpeed < topItem.spellSpeed`).
    - When a chain link is added, `fastEffectTimingBox` transitions to `BOX_E_CHAIN_RESOLUTION`, `consecutivePriorityPasses` resets to 0, and `priorityPlayerId` passes to the opposing duelist.
    - When two consecutive passes occur in Box E, chain automatically resolves in LIFO order and resets to `BOX_A_OPEN_GAME_STATE`.
- **Le Chatelier Dynamic Equilibrium Counter Trap (`src/data/playableCardsData.ts`, `src/domain/duelEngine.ts`)**:
  - Registered `card_trap_le_chatelier_counter` (*Bẫy Phản Kháng: Chuyển Dịch Cân Bằng Le Chatelier*):
    - Subtype: `COUNTER_TRAP`, Spell Speed 3.
    - Pedagogical lore: Principle of Le Chatelier on dynamic chemical equilibria ($A + B \rightleftharpoons C + D$).
    - Effect: Negates the activation of the preceding chain link and shuffles that card back into its owner's Deck (`isReturnedToDeck = true`, removed from field and GY).
- **Tactical Duel Arena UI Integration (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Added real-time Fast Effect Timing Box status badge in the header:
    - `Box A: Open State` (Slate), `Box C: Player Fast` (Indigo), `Box D: AI Fast` (Indigo), `Box E: Chuỗi LIFO` (Amber animated pulse).
  - Added interactive `Nhường Ưu Tiên` (Pass Priority) button (`FastForward` icon, amber pulse) when the player holds priority in a Fast Effect window or active chain stack.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 32: Fast Effect Timing State Machine & Priority Passing Protocol (52 new assertions).
  - Verified Le Chatelier Counter Trap properties (SS3), Box A initial priority, trigger window (Box B/C), out-of-turn pass rejection, Box C -> Box D passing, Box D -> Box A reset, Chain creation (Box E), Spell Speed 1 & 2 chaining restrictions, Counter Trap SS3 response, consecutive priority passes automatic LIFO resolution, Le Chatelier negation and deck-shuffle mechanics, and `getEligibleFastEffects` filtering.
  - Suite 46 expanded to **734 / 734 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,800+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle in 6.21s with 0 errors.

---

## [2.27.0-PROD] — Monster Position Changes & Cannot Attack First Turn When Set/Summoned Invariants (Rulebook v10 tr. 24, 38)
*Timestamp: 2026-10-22T20:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Monster Battle Position Change Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 24 ("Changing Battle Positions")* & *tr. 38 ("Battle Phase")*:
    - *"You can change the Battle Position of a monster you control during your Main Phase 1 or 2."*
    - *"However, you cannot change its position if: 1) It was Normal Summoned, Set, or Special Summoned during this turn. 2) It already declared an attack during this turn. 3) You already changed its Battle Position manually during this turn."*
    - *"Changing to Face-Up Attack Position from Face-Down Defense Position is called a Flip Summon."*
    - *"You cannot change a monster from Face-Up Defense to Face-Down Defense manually."*
    - *"The player who goes first cannot attack during their very first turn (Turn 1 No Attack Rule)."*
  - **Comprehensive Invariant Checks in `changeMonsterPosition`**:
    - Turn Player Guard: Blocks changing monster positions during opponent's turn (`duelistId !== this.activePlayerId`).
    - Phase Guard: Restricts position changes exclusively to `MAIN_PHASE_1` or `MAIN_PHASE_2`.
    - Same-Turn Summon/Set Guard: Rejects position change if `slot.turnSummoned === this.currentTurn`.
    - Post-Attack Guard: Rejects position change in Main Phase 2 if `slot.hasAttackedThisTurn === true`.
    - Single Change per Turn Limit: Blocks secondary manual position changes (`slot.hasChangedPositionThisTurn === true`).
    - Position Lock Guard: Enforces `slot.positionLockedUntilTurn` restrictions from centrifugal/sedimentation spells.
    - Link Monster Invariant: Enforces that Link Monsters cannot change to Defense Position (Master Rule 2020).
    - Extra Monster Zone (EMZ) Support: Added `isEmz: boolean = false` parameter allowing non-Link monsters in EMZ to switch battle positions.
    - Face-Down Defense Canonical Delegation: If a monster in `FACE_DOWN_DEFENSE` is chosen for position change, automatically delegates to `flipSummon`, triggering canonical FLIP effects and logging `[TRIỆU HỒI LẬT (FLIP SUMMON)]`.
  - **Turn 1 No Attack Rule Enforcement (`src/domain/duelEngine.ts`)**:
    - Added `enforceTurnOneNoAttack: boolean` and `setEnforceTurnOneNoAttack(enabled)`.
    - In `declareAttack`: Rejects attack declarations on Turn 1 when rule is enforced (`[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38]`).
    - In `advancePhase`: When Turn 1 player advances from `MAIN_PHASE_1`, automatically skips `BATTLE_PHASE` and transitions directly to `END_PHASE`.
- **Centrifugal Sedimentation Partition Tactical Card (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_centrifuge_crystallization` (*Ly Tâm Kết Tinh Phân Lớp* - Centrifugal Sedimentation Partition):
    - Balanced physics equation: $F_c = m \cdot \omega^2 \cdot r \rightarrow \text{Kết tủa lắng đáy (Thế Phòng Thủ)}$.
    - Effect: Shifts all opponent monsters in Attack Position to Face-Up Defense Position and locks their positions for 2 turns (`positionLockedUntilTurn`).
- **Tactical Duel Arena UI Integration (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Updated monster slot buttons with dynamic contextual styling and icons:
    - `⚡ Lật Mặt` (Amber) for Face-Down Defense monsters (invoking Flip Summon).
    - `🛡️ Thủ` (Blue) for Face-Up Attack monsters (switching to Defense).
    - `⚔️ Công` (Rose) for Face-Up Defense monsters (switching to Attack).
  - Integrated EMZ 1 position switching button with defense angle rendering on `ChemicalCardView`.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 31: Monster Position Changes & Cannot Attack First Turn When Set/Summoned Invariants (47 new assertions).
  - Verified Centrifugal Sedimentation card, Turn 1 No Attack rejection & Battle Phase skip, Turn 2 normal attack, same-turn summon restriction, opponent turn restriction, Battle Phase restriction, post-attack Main 2 restriction, single change per turn limit, Link monster DEF immunity, EMZ position change, Flip Summon delegation, and Centrifugal position locking.
  - Suite 46 expanded to **682 / 682 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,750+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle with 0 TypeScript compilation errors in 7.28s.

---

## [2.26.0-PROD] — Turn Counter Mechanics & Multi-Turn Lingering Effects Duration Clamping (Rulebook v10 tr. 30-31, 54)
*Timestamp: 2026-10-22T20:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Turn Counter Mechanics & Multi-Turn Lingering Effects Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 30-31 ("End Phase")* and *tr. 54 ("Counting Turns")*:
    - *"Some cards have effects that last for a certain number of turns (e.g. Swords of Revealing Light). You count the turn you activated the card as the first turn. At the end of each of your opponent's turns, 1 turn has passed. When the specified number of turns has ended, the effect expires."*
    - *"During the End Phase, any effects that last 'until the end of the turn' expire, and stat modifications that last 'until the end of this turn' wear off."*
  - **Data Structure & State Integration (`src/domain/cardGameTypes.ts`)**:
    - Created `LingeringTurnEffect` interface with `id`, `sourceCardUid`, `sourceCardName`, `targetPlayerId`, `effectType` (`'LOCK_TRAPS' | 'FREEZE_MANA' | 'DAMAGE_IMMUNITY' | 'ATTACK_PROHIBITION' | 'STAT_MODIFIER'`), `durationTurns`, `turnActivated`, `expiresAt`, `description`, and `payload`.
    - Added `lingeringEffects?: LingeringTurnEffect[];` to `DuelistState`.
  - **Lingering Effect Management API (`src/domain/duelEngine.ts`)**:
    - `addLingeringEffect(targetPlayerId, effectData)`: Registers new lingering effect with unique ID (`lingering_...`).
    - `getLingeringEffects(duelistId)`: Retrieves all active lingering effects for UI telemetry and condition checks.
    - `hasLingeringEffect(duelistId, effectType)`: Constant-time predicate checking active effects of a given type with `durationTurns > 0`.
    - `removeLingeringEffect(duelistId, effectId)`: Surgical cleanup of canceled or manually dispelled lingering effects.
    - `processEndPhaseLingeringEffects(endingTurnPlayerId)`: Decrements multi-turn counters at appropriate turn boundaries (e.g. at the end of the affected player's turn), clamps durations, emits official logs, and purges expired effects.
  - **Combat & Attack Declaration Clamping (`src/domain/duelEngine.ts`)**:
    - In `declareAttack`: Integrated `this.hasLingeringEffect(this.activePlayerId, 'ATTACK_PROHIBITION')` check, strictly blocking attack declarations when prohibited, returning clear Rulebook v10 tr. 54 block messages without consuming the monster's attack opportunity.
  - **End Phase Stat Boost Wipe (`src/domain/duelEngine.ts`)**:
    - In `resolveEndPhase`: Enforced automatic reset of `tempAtkBoost = 0` and `tempDefBoost = 0` for all monsters on BOTH players' monster zones at the End Phase (Rulebook v10 tr. 31), preventing temporary boosts from spilling over into subsequent turns.
- **Noble Gas Dispersion Tactical Card (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_noble_containment_grid` (*Lưới Khí Trơ Phong Tỏa* - Noble Gas Containment Grid):
    - Balanced equation: $\text{Xe} + \text{Rn} \text{ [Cấu hình bão hòa } ns^2np^6\text{]} \rightarrow \text{Màng đệm trơ va chạm}$.
    - Effect: Deploys a noble gas electron cushion, preventing the opponent from declaring attacks for 2 turns (Rulebook v10 tr. 54). Decrements at the end of each opponent's turn.
- **Tactical Duel Arena UI Telemetry (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Integrated real-time lingering effect badges with countdown turn indicators (`⏳ [Card Name]: [N] lượt`) in both Player and Opponent board headers.
  - Interactive tooltip displays full effect description and pedagogical context.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 30: Turn Counter Mechanics & Multi-Turn Lingering Effects Duration Clamping (41 new assertions).
  - Verified card registration, activation into `lingeringEffects`, attack prohibition enforcement, End Phase stat boost expiration on both players, multi-turn countdown decrement across alternating End Phases, and manual effect removal.
  - Suite 46 expanded to **635 / 635 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,700+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle with 0 TypeScript compilation errors in 6.24s.

---

## [2.25.0-PROD] — Card Banishing Dynamics & Face-Down vs Face-Up Banishment Invariants (Rulebook v10 tr. 55 & Master Rule 2021 Update)
*Timestamp: 2026-10-22T20:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Card Banishing Dynamics & Face-Down Invariant Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 55 ("Banish / Remove from Play")*:
    - *"Cards that are banished are kept separate from the Graveyard."*
    - *"Cards are usually banished face-up, but cards can also be banished face-down."*
    - *"Face-down banished cards cannot be viewed by the opponent, and their effects cannot be activated or used. They are treated as cards with no card properties (no name, type, attribute, ATK/DEF, level/rank)."*
    - *"Only effects that refer to 'banished cards' without specifying any characteristics (e.g. 'shuffle all your banished cards into the Deck') can interact with face-down banished cards."*
  - **Multi-Zone Banishing API with `faceDown` Flag**:
    - `banishCardFromField(duelistId, zone, slotIndex, faceDown?: boolean)`: Supports Monster, Spell/Trap, and Field zones with explicit face-up/face-down state setting and distinct official logs.
    - `banishCardFromGraveyard(duelistId, cardUid, faceDown?: boolean)`: Transits cards from Graveyard to Banished Zone with face-down support.
    - `banishCardFromHand(duelistId, cardUid, faceDown?: boolean)`: Direct hand banishment.
    - `banishTopCardsFromDeck(duelistId, count, faceDown?: boolean)`: High-efficiency milling banishment (Pot of Desires chemistry adaptation).
  - **Property-Specific Targeting Guards & Filtering**:
    - Implemented `filterBanishedCards(duelistId, filter)`: Strictly excludes face-down banished cards from attribute, cardType, level, or name filters (enforcing the canonical rule that face-down banished cards have no public properties). Generic requests (or `allowFaceDown: true`) return all cards.
    - Implemented `canTargetBanishedCard(card, requiresPropertyCheck)`: Rejects property-specific targeting on face-down cards.
    - Implemented `retrieveFromBanished(duelistId, cardUid, destination, requiresPropertyCheck)`: Strictly rejects property-specific retrieval of face-down banished cards (`[Vi Phạm Master Rule - Rulebook v10 tr. 55]`), while permitting generic returns (e.g. shuffling back into Deck) and resetting `isFaceDown = false` upon leaving the Banished Zone.
- **New Supercritical Fluid Chemistry Card (`src/data/playableCardsData.ts`)**:
  - Registered `card_spell_supercritical_extraction` (*Chiết Xuất Siêu Tới Hạn CO₂* - Supercritical CO₂ Fluid Extraction):
    - Balanced equation: $\text{CO}_2(sc) \text{ [P > 73.8 bar, T > 31.1}^\circ\text{C]} + \text{Chất tan} \rightarrow \text{Dịch chiết tinh khiết} + \text{CO}_2(g) \text{ tái sinh}$.
    - Effect: Banish the top 3 cards of your Deck face-down (Rulebook v10 tr. 55); draw 2 cards! High-stakes tactical card advantage engine.
- **Tactical UI Banished Inspection & Privacy Security (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - In `graveModal` (Vùng Bị Loại):
    - Opponent's face-down banished cards are strictly obscured: rendered with card back sleeve, title `??? (Úp Mặt)`, badge `🔒 BẢO MẬT (R.55)`, and inspection blocked to enforce opponent privacy.
    - Player's own face-down banished cards are labeled with an Amber `🔒 ÚP MẶT` badge and detailed guidance panel explaining the lack of public properties.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 29: Card Banishing Dynamics & Face-Down vs Face-Up Banishment Invariants (55 new assertions).
  - Verified Supercritical CO₂ extraction, face-up/down field banish, hand & graveyard banish, deck banish & draw, property-specific targeting exclusion, and retrieval mechanics.
  - Suite 46 expanded to **594 / 594 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,660+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle with 0 TypeScript compilation errors in 6.45s.

---

## [2.24.0-PROD] — Dual Field Spell Independent Ownership & Mechanics Replacement Routing (Rulebook v10 tr. 28 & Master Rule 2021 Update)
*Timestamp: 2026-10-22T19:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Dual Field Spell Independent Ownership Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 28 ("Field Spell Cards")* and *Master Rule 2021 Update*:
    - *"Each player can have 1 active Field Spell Card on their side of the field."*
    - *"If you want to play a new Field Spell Card while you already control one, you can send the previous Field Spell Card to the Graveyard and play the new one. (This is not considered destroying the card.)"*
    - *"You can also Set a Field Spell Card face-down in your Field Zone. It will have no effect until you activate it."*
  - **Independent Field Zones**:
    - Under Master Rule 2021, Player and Opponent control separate `fieldZone` slots (`player.fieldZone` and `opponent.fieldZone`).
    - Both duelists can simultaneously control active Field Spells on their respective sides without replacing or nullifying each other.
    - Activating a Field Spell only impacts the activator's Field Zone; opponent's Field Zone remains 100% intact.
  - **Mechanics Replacement vs Card Destruction Invariant**:
    - Replacing an existing Field Spell routes the old card to the Graveyard by *game mechanics*, NOT by card effect destruction.
    - Emits official system log: `[Thay Thế Địa Bàn - Rulebook v10 tr. 28] ...`
    - Cards with "When this card is destroyed" effects DO NOT trigger upon Field Spell replacement.
  - **Face-Down Field Spell (Set) & Activation from Field**:
    - Setting a Field Spell (`setSpellTrap`) places the card directly into `duelist.fieldZone` face-down (`isFaceDown: true`), freeing all 5 Spell/Trap zones.
    - Implemented `activateFieldSpellFromField(duelistId)`: flips and activates a Set face-down Field Spell from the Field Zone during Main Phase 1 or 2, checking mana cost and logging `[Kích Hoạt Địa Bàn Từ Sân - Rulebook v10 tr. 28]`.
    - Face-down Field Spells apply NO passive effects during Standby Phase or passive checks (`!duelist.fieldZone.isFaceDown`).
  - **Continuous/Field Fizzle Rule (Rulebook v10 tr. 28-29)**:
    - Updated `resolveChain`: Field Spells, Continuous Spells/Traps, and Equip Spells MUST remain face-up on the field at resolution (`isContinuousCardFaceUpOnField`).
    - If a Field Spell is destroyed or removed from the Field Zone while pending on the chain stack, its effect fizzles.
  - **Field Zone Card Removal API**:
    - Added `destroyFieldZoneCard(duelistId)`: destroys active/set Field Spell by card effect and routes to Graveyard with official log `[TIÊU DIỆT ĐỊA BÀN - Rulebook v10 tr. 28]`.
    - Updated `banishCardFromField(duelistId, 'FIELD_ZONE')`: banishes Field Spell directly to Banished Zone citing Rulebook v10 tr. 28 & 55.
- **Tactical Duel Arena Field Zone HUD (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Integrated dedicated Field Zone HUD telemetry widgets into both Player and Opponent board headers:
    - Opponent Field Zone badge displays `🌐 ĐỊA BÀN: [Tên bài]` or `🌐 ĐỊA BÀN ĐỐI THỦ: [ÚP]` or `🌐 Field Zone: Trống`.
    - Player Field Zone badge displays real-time status with card name, attribute, and face-down indicator.
    - Interactive "⚡ Lật Kích Hoạt" action button rendered for Set face-down Field Spells during turn player's Main Phase 1/2.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 28: Dual Field Spell Independent Ownership & Mechanics Replacement Routing (56 new assertions).
  - Verified Field Zone separation from 5 S/T zones, face-down setting, standby phase silence, activation from field, coexistence of dual field spells, game mechanics replacement to Graveyard, fizzle on removal, and effect destruction/banishment.
  - Suite 46 expanded to **539 / 539 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,610+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean Vite bundle with 0 TypeScript compilation errors in 6.55s.

---

## [2.23.0-PROD] — End Phase Hand Size Limit Discard Governance & AI Discard Optimization (Rulebook v10 tr. 31 & 35)
*Timestamp: 2026-10-22T19:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **End Phase Hand Size Limit Discard Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 31 & 35 ("End Phase / Discarding Cards")*:
    - *"If you have more than 6 cards in your hand at the end of your turn, you must select and discard cards to the Graveyard until you have only 6 cards remaining."*
  - Implemented `getHandSizeLimitExcess(duelistId)` and `isHandSizeLimitExceeded(duelistId)`.
  - Implemented `discardCardFromHand(duelistId, cardUid)` and `discardMultipleCardsFromHand(duelistId, cardUids)`:
    - Safely transfers chosen cards from hand to Graveyard.
    - Emits official system logs citing Rulebook v10 tr. 31 with real-time remaining hand counts.
  - Updated `advancePhase(chosenDiscardUids?: string[])` and `resolveEndPhase(duelistId, chosenDiscardUids?: string[])`:
    - Turn player discards chosen cards upon transitioning into End Phase.
    - Non-turn player is completely exempt (their hand is untouched during opponent's End Phase).
    - Fallback loop guarantees invariant: no player ever ends turn with > 6 cards.
- **AI Strategic Discard Evaluation Engine (`aiSelectHandDiscardCards`, `src/domain/duelEngine.ts`)**:
  - Built intelligent heuristic evaluator for AI hand discard prioritization:
    - High discard preference (+50 to +20): Duplicate copies of cards already in hand (+50), redundant field spells when field already active (+40), high-level deadweight monsters (Level 7+) lacking field tribute fodder (+35), heavy mana cost cards (+20).
    - Strict preservation penalties (-40 to -20): Tuner monsters (-40), Level 1-4 starter monsters (-30), draw spells (-25), Counter Traps (-20).
    - Automatically invoked during AI End Phase transitions to preserve vital combo starters and discard deadweight.
- **Tactical UI Interactive Discard Modal (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Intercepts player turn advancement when ending turn with > 6 cards in Main Phase 2.
  - Built interactive Hand Size Limit Modal featuring:
    - Real-time hand count badges ("Số lượng: N / 6 lá | Cần bỏ: X lá").
    - Selectable hand card grid with checkmark badges (`✓ BỎ`), dimmed opacity, and ATK/DEF / Mana metadata.
    - "Tự Động Chọn (Auto-Select)" button powered by `aiSelectHandDiscardCards('player')`.
    - "Quay Lại Main 2" tactical button allowing the player to return to Main Phase 2 to set spells/traps instead of discarding.
    - Exact-count locked "Xác Nhận Chuyển Xuống Mộ Bài" action button.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 27: End Phase Hand Size Limit Discard Governance & AI Discard Optimization (42 new assertions).
  - Verified excess calculation, single card discard, batch discard, chosen discard End Phase execution, opponent hand immunity invariant, AI discard scoring & preservation rules, and end-to-end AI turn discard resolution.
  - Suite 46 expanded to **483 / 483 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,560+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean in 6.57s.

---

## [2.22.0-PROD] — Match Tiebreaker, Simultaneous LP Zero & Sequential Chain Damage Governance (Rulebook v10 tr. 33 & tr. 50)
*Timestamp: 2026-10-22T19:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Sequential Chain Damage & Mid-Chain Termination Engine (`src/domain/duelEngine.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 50 ("End of a Duel / Resolving a Chain")*:
    - *"If a player's Life Points reach 0 during the resolution of a Chain, the Duel ends immediately. Any remaining cards on the Chain do not resolve."*
  - Integrated `this.checkWinConditions()` immediately after each chain link's effect execution within `resolveChain()`.
  - If `outcome !== 'IN_PROGRESS'`, the duel terminates instantly: remaining chain links in `this.chainStack` are safely flushed, mid-chain termination is officially logged with Rulebook v10 tr. 50 citation, and further effect execution halts.
  - Verified invariant: Chain Link 2 finishes off player/opponent before Chain Link 1 can execute, preventing invalid double damage or false ties.
- **Simultaneous Damage & Tiebreaker Rule (`SPELL_MUTUAL_DETONATION`, `src/domain/duelEngine.ts`, `src/data/playableCardsData.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 33 ("Draw")*:
    - *"If both players' Life Points drop to 0 simultaneously, the Duel is a DRAW."*
  - Added `card_spell_nitroglycerin_detonation` (Sóng Nổ Nitroglycerin Siêu Tới Hạn / Supercritical Nitroglycerin Detonation Wave):
    - IUPAC stoichiometric reaction: $4\text{C}_3\text{H}_5(\text{NO}_3)_3(l) \rightarrow 12\text{CO}_2(g) + 10\text{H}_2\text{O}(g) + 6\text{N}_2(g) + \text{O}_2(g)$ ($\Delta H^\circ$ extremely negative, expansion ratio 10,000x, detonation velocity 7,700 m/s).
    - Deals simultaneous 1500 LP damage to both players.
    - When both LPs drop to $\le 0$, `checkWinConditions()` assigns exact `outcome = 'DRAW'` and logs `[KẾT QUẢ HÒA TRẬN - Rulebook v10 tr. 33]`.
- **Tactical UI Match Debrief DRAW Presentation (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Built dedicated Amber/Orange/Purple "HÒA TRẬN! (DOUBLE KNOCKOUT)" badge and debrief card citing Rulebook v10 tr. 33.
  - Added balanced draw rewards: +120 XP, +50 Knowledge Tokens, +25 Elemental Shards.
  - Integrated sound trigger: `sound.playChemicalDetonation(true)` on draw result.
- **Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 26: Match Tiebreaker, Simultaneous LP Zero & Sequential Chain Damage Governance (41 new assertions).
  - Verified Nitroglycerin card metadata, simultaneous LP 0 -> exact DRAW, single LP 0 victory differentiation, sequential mid-chain termination (CL2 lethal prevents CL1 resolution), and equal ATK combat standoff rules (ATK > 0 mutual destruction 0 damage; 0 ATK no destruction).
  - Suite 46 expanded to **441 / 441 PASSED (100%)**.
  - Full workspace regression (`npm test`): **All 47 suites passing with 2,520+ assertions (0 failures)**.
  - Production build (`npm run build`): Clean in 6.55s.

---

## [2.21.0-PROD] — Duelist Concession / Surrender Protocol & AI Sportsmanship Yield Engine (Rulebook v10 tr. 33)
*Timestamp: 2026-10-22T19:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Duelist Concession & Surrender Engine (`src/domain/duelEngine.ts`)**:
  - Implemented complete surrender mechanics grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 33 ("Surrendering a Duel")*:
    - *"A player may surrender a Duel at any time. When a player surrenders, their opponent immediately wins the Duel."*
  - Added `surrenderDuel(surrenderingDuelistId, reason)` method:
    - Safely terminates in-progress matches with immediate victory transition (`OPPONENT_VICTORY` if player surrenders; `PLAYER_VICTORY` if opponent surrenders).
    - Flushes active chain stacks and clears active replay states to ensure 0 state corruption.
    - Strictly rejects surrender attempts once a match has already concluded (`outcome !== 'IN_PROGRESS'`).
    - Emits official system logs citing Rulebook v10 tr. 33.
- **Autonomous AI Concession & Sportsmanship Yield Engine (`aiCheckSurrenderCondition`, `src/domain/duelEngine.ts`)**:
  - Built intelligent heuristic evaluator for opponent AI sportsmanship concession:
    - Triggers only on `currentTurn >= 4` (guards against premature forfeits).
    - Requires AI to have $\le 1000$ LP, 0 monsters on field, 0 Spell/Trap cards on field, and $\le 1$ card in hand.
    - Requires Player to assemble an overwhelming lethal board with combined field $\text{ATK} \ge 5000$.
    - Integrated at the beginning of `runAiTurn()`: AI gracefully yields to insurmountable odds before making futile moves, logging official concession.
- **Scientist Persona Surrender Dialogue Engine (`src/domain/characterQuips.ts`)**:
  - Extended `QuipTriggerEvent` with `'SURRENDER'` and authored authentic pedagogical defeat quips for all 5 chemist personas:
    - **Mendeleev**: Concedes with honor citing the periodic law's inevitable thermodynamic outcome.
    - **Marie Curie**: Acknowledges insurmountable radiation energy exceeding thermodynamic containment.
    - **Antoine Lavoisier**: Cites the conservation of force and mass in yielding to the opponent's superior system.
    - **Alpha**: Sportsmanlike learning surrender seeking to study the opponent's chemical synergies.
    - **Beta**: Concession based on statistical reversal probability approaching 0.00%.
- **Tactical UI Surrender Workflow (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Added red-accented `[🚩 Đầu Hàng]` button in the top battlefield Header Bar during active duels.
  - Built interactive Surrender Confirmation Modal with Rulebook v10 tr. 33 pedagogical rules citation and dual choices ("Tiếp Tục Thi Đấu" vs "Đồng Ý Đầu Hàng").
  - Synchronized defeat acoustic fanfare (`sound.playCrystalShatter()`) and Match Debrief transition.
- **Automated Verification & Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 25: Duelist Concession / Surrender Protocol & AI Sportsmanship Yield Engine (47 new assertions).
  - Verified player surrender, post-match rejection, opponent surrender, mid-chain safety flushing, 4 subcases of autonomous AI concession heuristics, and full dialogue database integrity across all 5 personas.
  - Suite 46 expanded to **400 / 400 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,480+ assertions (0 failures)**.
  - Production build clean in 7.24s (`npm run build`).

---

## [2.20.0-PROD] — Quick-Play Spell Hand vs Field Activation Rules & Battle Phase Quick Activation Governance (Rulebook v10 tr. 29 & 43)
*Timestamp: 2026-10-22T18:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Quick-Play Spell Hand vs Field Activation Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Implemented complete Quick-Play Spell rules grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 29 ("Quick-Play Spell Cards")* and *tr. 43 ("Damage Step")*.
  - Added turn & phase governance in `activateSpellFromHand`:
    - **Turn Player Hand Activation**: Quick-Play Spells can be activated from hand during ANY Phase of the turn player's turn (`MAIN_PHASE_1`, `BATTLE_PHASE`, `MAIN_PHASE_2`, etc.) at Spell Speed 2.
    - **Opponent Turn Hand Prohibition (Rulebook v10 tr. 29)**: Strictly blocks activating Quick-Play Spells from hand during opponent's turn, returning a diagnostic error message instructing the duelist to Set it beforehand.
    - **Normal Spell Restriction**: Re-enforced that Normal Spells from hand can only be activated during own turn Main Phase 1 or 2 (rejected in Battle Phase and during opponent turn).
  - Enforced **Same-Turn Set Prohibition Invariant (Rulebook v10 tr. 29)** in `activateSpellTrapFromField`:
    - When a Quick-Play Spell is Set face-down (`setSpellTrap`), records `turnSet: this.currentTurn`.
    - If activated from field during the same turn it was Set (`slot.turnSet >= this.currentTurn`), strictly rejects activation with clear Rulebook v10 tr. 29 explanation.
    - On any subsequent turn (`slot.turnSet < this.currentTurn`), Set Quick-Play Spells can be freely activated from field at Spell Speed 2 during either player's turn and during the Battle Phase.
- **Damage Step Activation Governance (`canActivateInDamageStep`, Rulebook v10 tr. 43)**:
  - Added `canActivateInDamageStep(card, currentSubstep)` to `DuelEngine`:
    - **Counter Traps (Spell Speed 3)**: Allowed throughout the Damage Step (Substeps 1 through 5).
    - **ATK/DEF Modifiers**: Allowed in Substep 1 (Start of Damage Step) and Substep 2 (Before Damage Calculation). Blocked in Substep 3+ (during and after damage calculation).
    - **Normal Spells & Non-Modifier Cards**: Strictly blocked throughout the Damage Step.
- **Defender Quick-Play Spell Combat Reaction (`checkDefenderTrapReaction`)**:
  - Defender with a Set Quick-Play Spell from a prior turn can react to attack declaration:
    - `SPELL_NEUTRALIZE`: Neutralizes the incoming attack, restores 700 LP, aborts combat, and routes the card to the Graveyard.
    - `SPELL_QUICK_ATK_SURGE`: Boosts defender monster ATK by +800, allowing combat damage calculation to proceed with enhanced stats.
- **Card Arsenal Upgrades (`src/data/playableCardsData.ts`)**:
  - Added `card_spell_thermite_surge` (Flash Thermite Combustion Surge, `SPELL_QUICK_ATK_SURGE`): Quick-Play Spell that grants +800 ATK to designated monster (IUPAC: $2Al(s) + Fe_2O_3(s) \rightarrow Al_2O_3(s) + 2Fe(l)$, $\Delta H^\circ = -851.5\text{ kJ/mol}$).
- **Duel UI Visualization (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Added dedicated amber pulsating `[Kích Hoạt Tốc Độ (⚡ SS2)]` button for Quick-Play Spells in hand.
  - Added `⏳ Úp Lượt Này` badge in S/T zone for Traps and Quick-Play Spells set on the current turn.
  - Added `[⚡ Phép Tốc Độ]` badge when face-up in Player and Opponent S/T zones.
- **Automated Verification & Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 24: Quick-Play Spell Hand vs Field Activation Rules & Battle Phase Quick Activation Governance (43 new assertions).
  - Verified own-turn hand activation, Battle Phase hand activation, opponent turn hand rejection, normal spell battle phase rejection, same-turn set lock rejection, subsequent turn field activation, damage step substep 1-3 modulation, and defender neutralization attack reaction.
  - Suite 46 expanded to **353 / 353 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,440+ assertions (0 failures)**.
  - Production build clean in 6.79s (`npm run build`).

---

## [2.19.0-PROD] — Continuous Spell/Trap Field Placement & Removal Negation Invariants (Rulebook v10 tr. 29)
*Timestamp: 2026-10-22T18:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Continuous Spell/Trap Field Placement Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Implemented complete Continuous Spell/Trap placement and resolution rules grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 29 ("Continuous Spell & Trap Cards")*.
  - Added `'CONTINUOUS_SPELL'` to `SpellTrapSubtype` type definition.
  - Added `wasOnField?: boolean` to `ChainItem` to track whether a card was face-up on the field when chained.
  - Added `destroySpellTrap(duelistId, slotIndex, cause)` method: handles destruction of face-up/set Spell/Trap cards, checks effect destruction immunity, cleans up equip card attachments, and routes cards to the Graveyard.
  - Added `isContinuousCardFaceUpOnField(duelistId, card)`: checks if a Continuous Spell, Continuous Trap, Field Spell, or Equip Spell remains face-up in the duelist's active `spellTrapZones`.
  - Updated `activateSpellFromHand`: requires an open S/T slot for `CONTINUOUS_SPELL`, validates zone capacity, and places the card face-up in the S/T zone upon activation.
  - Updated `activateSpellTrapFromField`: preserves `CONTINUOUS_SPELL`, `CONTINUOUS_TRAP`, and Equip Spells face-up on the field instead of routing them to the Graveyard upon activation.
  - Implemented Chain Resolution Removal Fizzle Invariant in `resolveChain`:
    - Unlike Normal Spell/Trap cards which resolve their effect even if removed from the field during chain, Continuous Spells and Continuous Traps (`isContinuous && item.wasOnField`) MUST remain face-up on the field at the exact moment of chain resolution.
    - If a Continuous card was destroyed or removed before its chain link resolves, logs `[Quy Tắc Thẻ Duy Trì - Rulebook v10 tr. 29]` and skips effect execution (fizzles).
    - Negation of activation (`negateActivation: true`) cleanly sends the negated Continuous card directly to the Graveyard.
- **Continuous Passive Effects & Standby Phase Engine Integration (`src/domain/duelEngine.ts`)**:
  - Updated `resolveStandbyEffects`: face-up Continuous Spells/Traps trigger standby phase benefits:
    - `SPELL_PLATINUM_MATRIX`: Continuous catalytic matrix generates +1 Mana and deals 200 reaction damage during Standby Phase.
    - `SPELL_FUEL_CELL_PERMA`: Continuous fuel cell recovers +400 LP every turn during Standby Phase.
  - Updated `checkDefenderTrapReaction`: face-up `TRAP_NOBLE_MEMBRANE_CONT` continuously reduces the attacking monster's ATK by 500 without aborting combat, allowing combat damage calculation to proceed with reduced stats.
- **Card Arsenal Upgrades (`src/data/playableCardsData.ts`)**:
  - Upgraded `card_spell_platinum_catalyst` (Platinum Catalyst Matrix) to `CONTINUOUS_SPELL`.
  - Upgraded `card_spell_hydrogen_fuel_cell` (PEM Hydrogen Fuel Cell Stack) to `CONTINUOUS_SPELL`.
  - Introduced `card_trap_noble_membrane` (Noble Gas Octet Inertia Field — IUPAC: Noble Gas Valence Octet Shielding): Continuous Trap that continuously attenuates attacking monsters by 500 ATK.
- **Duel UI Visualization (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Added glowing badges on active S/T zones: `[∞ Phép Duy Trì]` in cyan/teal and `[∞ Bẫy Duy Trì]` in fuchsia/pink.
  - Replaced redundant "Kích Hoạt" button with the status badge once a continuous card is face-up on the field.
- **Automated Verification & Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 23: Continuous Spell/Trap Field Placement & Removal Negation Invariants (34 new assertions).
  - Verified continuous spell placement, capacity rejection, continuous trap set and activation, standby phase recurring triggers, chain removal destruction fizzle, normal spell resolution immunity, combat continuous debuff, and negated activation graveyard routing.
  - Suite 46 expanded to **310 / 310 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,400+ assertions (0 failures)**.
  - Production build clean in 7.11s (`npm run build`).

---

## [2.18.0-PROD] — Piercing Battle Damage & Defense Combat Governance (Rulebook v10 tr. 42-43)
*Timestamp: 2026-10-22T18:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Piercing Battle Damage & Defense Combat Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Implemented complete Piercing Battle Damage mechanics grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 42-43 ("Damage Step & Battle Damage")*.
  - Added `piercingDamage?: boolean` to `PlayableCardDef` and `hasPiercingDamage?: boolean` to `MonsterZoneSlot`.
  - Added `isPiercingDamage?: boolean`, `piercingDamageDealt?: number`, and `reflectionDamageDealt?: number` to `AttackDeclarationResult`.
  - Implemented 4-tier battle damage governance in `resolveDamageStep`:
    - **Piercing vs Defense (ATK > DEF)**: When an attacking monster with piercing damage attacks a Defense Position monster, destroys the defender AND inflicts the difference `(Attacker ATK - Defender DEF)` directly to the defending duelist's Life Points.
    - **Normal vs Defense (ATK > DEF)**: Destroys the defender monster while dealing strictly 0 battle damage to the defender's LP.
    - **Defense Reflection (ATK < DEF)**: When attacking a Defense Position monster with higher DEF, neither monster is destroyed, and the attacking duelist suffers reflection battle damage equal to `(Defender DEF - Attacker ATK)`.
    - **Equi-Stat Standoff (ATK == DEF)**: Neither monster is destroyed and zero battle damage is dealt to either player.
  - Integrated dynamic equip attachment and detachment lifecycle:
    - `attachEquipCard`: Transfers `hasPiercingDamage = true` to host monster slot when equipped with piercing equipment (`card_equip_supercritical_drill`).
    - `cleanSlotEquipCards`: Safely re-evaluates and resets slot piercing damage when equipment leaves the field, preserving inherent card traits.
- **Equip Arsenal & Chemical Card Upgrades (`src/data/playableCardsData.ts`)**:
  - Upgraded `card_comp_hcl` (Hydrochloric Acid): Enabled `piercingDamage: true` simulating aggressive proton dissociation and corrosive dissolution through defensive layers.
  - Introduced `card_equip_supercritical_drill` (Supercritical Fluid Piercing Drill — IUPAC: Supercritical Fluid Phase Transition): Equip Spell that grants +400 ATK and imbues the host monster with Piercing Battle Damage.
- **Combat Visual Feedback & Holographic Badge Overlay (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Updated floating combat VFX to dynamically render `⚡ XUYÊN GIÁP: -N LP!` in glowing amber/gold upon piercing damage resolution.
  - Rendered `🛡️ PHẢN KÍCH PHÒNG THỦ: -N LP!` in fortified slate/azure upon defense reflection damage.
  - Linked damage substep acoustic progression and step 3 text detailing exact `ATK - DEF` formula.
- **Automated Verification & Master Rule Audit Suite Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 22: Piercing Battle Damage & Defense Combat Governance (48 new assertions).
  - Verified normal vs defense 0 damage invariant, inherent HCl piercing, 0-DEF defender full damage, face-down flip substep 2 + piercing, higher DEF reflection damage, equal ATK/DEF standoff, equip card drill piercing transfer, and equip cleanup reset.
  - Suite 46 expanded to **276 / 276 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,400+ assertions (0 failures)**.
  - Production build clean in 6.13s (`npm run build`).

---

## [2.17.0-PROD] — Battle Step Replay Mechanics & Target Change Governance (Rulebook v10 tr. 40)
*Timestamp: 2026-10-22T18:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Battle Step Replay Engine & Tactical Choice Machine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Implemented complete Battle Step Replay state machine grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 40 ("Declaring an Attack: Replays")*.
  - Added `BattleReplayState` interface: tracks `isActive`, `attackerSlotIndex`, `attackerCardUid`, `attackerCardName`, `attackerAtk`, `initialDefenderCount`, `currentDefenderCount`, `eligibleTargetSlots`, `canDirectAttack`, and `triggerReason`.
  - Added engine methods:
    - `initiateBattleReplay(attackerSlotIndex, initialDefenderCount, originalTarget)`: registers replay state, logs Master Rule announcement, and awaits tactical decision.
    - `triggerBattleReplayCheck(attackerSlotIndex, initialDefenderCount, originalTarget)`: public evaluator for card effects altering defender monsters during Battle Step.
    - `executeBattleReplay(decision: 'RETARGET' | 'DIRECT' | 'CANCEL', newTargetSlotIndex?)`:
      - **RETARGET**: Redirects attack towards another valid enemy monster slot without consuming a second attack right; resolves into Damage Step.
      - **DIRECT**: Switches attack declaration to Direct Attack when opponent field is cleared of monsters (or under Fluorine electronegativity bypass rule).
      - **CANCEL**: Safe retreat mechanism — monster cancels attack safely without entering Damage Step, dealing or receiving zero battle damage, while marking `hasAttackedThisTurn = true` per Rulebook v10 tr. 40.
    - `aiResolveBattleReplay()`: Autonomous AI tournament solver; intelligently evaluates Direct Attack > Destroy Weaker Defender > Tactical Retreat (avoids suicidal attacks against high ATK/DEF monsters).
    - `cancelBattleReplay()`: Safe programmatic cancellation helper.
  - Refactored `declareAttack`:
    - Validates direct attack eligibility upfront without consuming attack rights on illegal attempts.
    - Dynamically evaluates board changes after Battle Step trap reactions. If defender monster count changes or targeted monster leaves field before Damage Step, triggers Battle Replay rather than continuing into Damage Step.
    - Extracted `resolveDamageStep` helper for pure 5-substep Damage Step calculation and post-combat shields.
- **Interactive Battle Replay Arena HUD Banner (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Rendered glowing amber Battle Replay Banner directly in duel arena when `activeReplay` is active.
  - Displays attacker name, ATK stat, rulebook citation (`Rulebook v10 tr. 40`), and dynamic trigger reason.
  - Action buttons:
    - `[💥 Tấn Công Trực Tiếp!]` (dynamically available when opponent board cleared or Fluorine bypass).
    - `[🎯 Đánh (Tên Quái Thú)]` buttons for every eligible enemy monster slot.
    - `[🛡️ Hủy Đòn Tấn Công (An Toàn)]` to abort attack safely with 0 damage.
  - Direct battlefield click-to-target: Opponent monster slots pulse in bright amber (`ring-2 ring-amber-300 shadow-xl shadow-amber-500/50`) during Replays, allowing 1-click retargeting directly on the arena grid.
- **Automated Verification & Test Expansion (`test-yugioh-master-rules.mjs`, `test-duel-engine.mjs`)**:
  - Added Group 21: Master Rule Battle Step Replay Mechanics & Tactical Choice Governance (37 new tests).
  - Verified Replay triggering upon opponent monster count alteration during Battle Step.
  - Verified RETARGET decision with accurate battle damage and graveyard routing.
  - Verified DIRECT attack transition when opponent monsters are cleared.
  - Verified CANCEL tactical retreat (zero damage to either player, attacker preserved, attack right consumed).
  - Verified AI autonomous replay resolution (direct attack priority and tactical retreat against stronger enemies).
  - Verified error rejection on invalid targets or illegal direct attacks during replays.
  - Suite 46 expanded to **228 / 228 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,400+ assertions (0 failures)**.
  - Production build clean in 6.04s (`npm run build`).

---

## [2.16.0-PROD] — Equip Spell Cards, Catalyst Active Site Binding & Automatic Destruction Cascades
*Timestamp: 2026-10-22T17:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Equip Spell Cards & Catalyst Active Site Binding Engine (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Implemented full Master Rule Equip Spell & Catalyst attachment mechanics grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 28 ("Equip Spell Cards")* and IUPAC heterogeneous catalysis / enzyme active site theories.
  - Extended `MonsterZoneSlot` with `equippedCards?: CardInstance[]`.
  - Extended `SpellTrapZoneSlot` with `equippedToMonsterUid?: string`.
  - Added `attachEquipCard(duelistId, equipCardUid, targetMonsterUid, sourceSlotIndex)`:
    - Validates target monster across own or opponent's field.
    - Occupies Spell & Trap zone face-up and binds directly to host monster.
    - Modulates monster attributes (e.g. Bunsen Burner +600 ATK & PYRO attribute; Iron Mesh +400 ATK).
  - Implemented **Automatic Destruction Cascade Invariant** (`cleanSlotEquipCards`):
    - When an equipped monster leaves the field (via battle destruction, effect destruction, Tribute, Banishment, or returning to Extra Deck), all attached Equip cards are automatically destroyed and routed to the Graveyard!
    - When host monster is banished, Equip Cards are sent to the Graveyard (NOT banished) per Rulebook v10 tr. 28.
    - Handled **Missing Target Fizzle**: If target monster leaves the field before Equip Spell resolution, the spell cannot equip and is immediately sent to the Graveyard without effect.
- **Battlefield HUD Catalyst Badge Visualization (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Rendered pulsing purple catalytic indicator badge `[⚡ XÚC TÁC (N)]` directly on both Player and Opponent monster zone slots when equipped with one or more catalysts/equip spells.
  - Interactive tooltip reveals exact equipped card names.
- **Automated Verification & Test Expansion (`test-yugioh-master-rules.mjs`, `test-duel-chains-deep.mjs`)**:
  - Added Group 20: Equip Spell Cards & Catalyst Active Site Binding Mechanics (26 new tests).
  - Verified single and multi-equip cumulative stat buffs and S/T zone tracking.
  - Verified automatic destruction cascade across monster effect destruction, tribute, and banishment.
  - Verified missing target fizzle handling in Suite 4 (`test-duel-chains-deep.mjs`).
  - Suite 46 expanded to **191 / 191 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,350+ assertions (0 failures)**.
  - Production build clean in 6.18s (`npm run build`).

---

## [2.15.0-PROD] — In-Duel Deck Tutor, Chemical Search Engine & Mandatory Deck Shuffle Invariants
*Timestamp: 2026-10-22T17:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **In-Duel Deck Tutor & Chemical Search Modal (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Implemented full in-duel Deck Tutor & Search Modal grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 33 ("Search your Deck")* and IUPAC chemical extraction methods.
  - Header Bar button: `[🔍 Chiết Tách (N)]` displaying dynamic remaining deck size and launching modal.
  - Multi-Dimensional Filter Pills: `Tất Cả`, `Quái Tố`, `Hợp Chất`, `Phép Phản Ứng`, `Bẫy Chiến Thuật` with live match counts.
  - Real-Time Search Bar: query by Vietnamese name, English name, chemical formula (e.g. `Na`, `HCl`, `H2O`, `Pt`), level, or effect text.
  - Destination Selector:
    - `[📥 Đưa Vào Tay]` (Default extraction to hand).
    - `[⚡ Triệu Hồi Lên Sân]` (Direct Special Summon from deck to monster/spell zone).
    - `[⚰️ Gửi Vào Mộ Bài]` (Selective chemical milling to Graveyard).
  - Split-View Card Inspection & Execution: displays card formula badge, Tuner/Scale badges, ATK/DEF, effect text, and IUPAC scientific lore with single-click confirmation button.
- **Engine Core Deck Search & Tutor Primitives (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Defined `DeckSearchFilter` and `DeckTutorResult` in `src/domain/cardGameTypes.ts`.
  - Added `getSearchableDeckCards(duelistId, filter)` supporting category, chemical formula, Tuner, Pendulum, level, and text query filtering.
  - Added `tutorCardFromDeck(duelistId, cardUid, destination, sourceReason)`:
    - Removes card from main deck.
    - Routes to destination (hand, graveyard, or available monster/spell zone).
    - **Enforces Master Rule mandatory deck shuffle** (`this.shuffle(duelist.deck)`) per Rulebook v10 tr. 33.
    - Records public revelation game log verifying card identity and shuffle execution.
  - Added `shuffleDeck(duelistId)` public shuffle primitive.
  - Added `aiPerformAutonomousDeckTutor(reason)`: AI evaluates board state and autonomously searches needed combo pieces (Tuner for Synchro, complementary Scale for Pendulum, or high-ATK boss monsters).
- **Automated Verification & Test Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 19: In-Duel Deck Search, Tutor & Deck Shuffling Mechanics (25 new tests).
  - Verified empty and filtered deck queries across categories, formulas, Tuner, and Pendulum.
  - Verified tutor execution to Hand, Graveyard, and Field with exact deck and destination count delta.
  - Verified public revelation game log and mandatory deck shuffle execution.
  - Verified rejection of invalid card UIDs with zero deck disruption.
  - Verified opponent AI autonomous deck search intelligence prioritizing Tuner Platinum for Synchro swarming.
  - Suite 46 expanded to **165 / 165 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,325+ assertions (0 failures)**.
  - Production build clean in 6.07s (`npm run build`).

---

## [2.14.0-PROD] — Duel Room LP Calibration (8,000 Master Rule vs 4,000 Speed Duel), Turn Timers & Environmental Hazard Invariants
*Timestamp: 2026-10-22T17:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Duel Room Calibration & Configuration Modal (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Implemented complete "Thiết Lập Trận Đấu" (Match Configuration) Modal accessible via `[⚙ Phòng Đấu]` button in the Duel Arena Header Bar.
  - Life Point Calibration:
    - Master Rule Standard: **8,000 LP** (deep strategic tactical battles adhering strictly to *Yu-Gi-Oh! Official Rulebook v10*).
    - Speed Duel / Lớp Học Nhanh: **4,000 LP** (fast classroom demonstrations, condensed pedagogical testing).
  - Turn Timer Settings: selectable turn limits (**30s, 60s, 90s, or Vô hạn / Không giới hạn**) for competitive pressure or relaxed classroom analysis.
  - Environmental Hazard Presets:
    - `Mặc Định SATP (pH 7.0, 25°C, 1.0 atm)`
    - `Khí Quyển Mưa Axit (pH 2.8, 25°C)`
    - `Lò Áp Suất Cao Haber-Bosch (pH 7.0, 450°C, 200 atm)`
    - `Môi Trường Kiềm Đặc (pH 13.0, 60°C)`
  - Tactical Restart Button: applies new settings and re-initializes engine with selected parameters immediately.
- **Engine Core Life Point & Environment Parameterization (`src/domain/duelEngine.ts`)**:
  - Added `initialLp: number = 8000` argument to `DuelEngine` constructor and `createInitialDuelistState()`.
  - Sets both `lp` and `maxLp` to `initialLp` with dynamic opening match log recording starting LP (`8,000 LP` or `4,000 LP`).
  - Enhanced `setEnvironment(partial, sourceName)` to record `environmentCardName = sourceName` alongside chemical reaction logs.
- **Automated Verification & Test Expansion (`test-yugioh-master-rules.mjs`)**:
  - Added Group 18: Duel Room Life Point Calibration & AI Persona Match Invariants (18 new tests).
  - Verified 8,000 LP vs 4,000 LP initialization and log recording.
  - Verified healing saturation caps rigorously at maxLp.
  - Verified AI persona name mappings across all 4 difficulty tiers (`Alpha`, `Beta`, `Gamma`, `Dmitri Mendeleev`).
  - Verified environmental hazard presets modulate pH, temperature, and pressure correctly.
  - Suite 46 expanded to **140 / 140 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,300+ assertions (0 failures)**.
  - Production build clean in 6.01s (`npm run build`).

---

## [2.13.0-PROD] — Visual Chain Link Stack & LIFO Resolution Overlay HUD
*Timestamp: 2026-10-22T17:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Visual Chain Link Stack Overlay HUD (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Implemented real-time visual chain resolution HUD grounded in *Yu-Gi-Oh! Official Rulebook v10 tr. 42-45 ("The Chain: Spell Speed & Resolving Effects")*.
  - Floating high-contrast card panel (`fixed top-20 right-4 z-40`) rendered during and following chain formations:
    - Chain Link header with total link count badge, LIFO direction indicator (`Link N ➔ Link 1`), and collapsible button.
    - Reverse LIFO stack: displays highest Chain Link at top with pulsing highlight ring (`Thực thi trước`).
    - Detailed link cards: Chain Link index, Spell Speed badge (`SS1` in Cyan, `SS2` in Amber, `SS3` Counter Trap in Red), Activator (`Bản Thân` in Cyan, `Đối Thủ` in Amber), chemical formula badge, effect description, and status indicator (`✓ Thực Thi LIFO` or `✕ Vô Hiệu Hóa`).
  - Added Header Bar quick-toggle button: `[⚡ Chuỗi (N)]` allowing players to review the chain sequence at any time.
- **Engine Chain Snapshot Telemetry (`src/domain/duelEngine.ts`, `src/domain/cardGameTypes.ts`)**:
  - Defined `ResolvedChainItem` and `ResolvedChainSummary` in `src/domain/cardGameTypes.ts`.
  - Added `public lastResolvedChain: ResolvedChainSummary | null = null;` to `DuelEngine`.
  - In `resolveChain()`: captures complete pre-resolution snapshot before popping items in LIFO order, recording activator names, chemical formulas, spell speeds, descriptions, and negation states.
- **Automated Verification & Test Expansion (`test-duel-chains-deep.mjs`)**:
  - Expanded Suite 4 with snapshot assertions in Group 12 verifying negation recording in `lastResolvedChain`.
  - Added Group 13: Visual Chain Link Stack & Chemical Reaction Telemetry verifying 3-link counter chain LIFO order, Spell Speeds 1-3, and player/opponent attribution.
  - Suite 4 expanded to **27 / 27 PASSED (100%)**.
  - TypeScript validation: 0 errors (`npx tsc --noEmit`).
  - Production build clean in 6.15s (`npm run build`).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,280+ assertions (0 failures)**.

---

## [2.12.0-PROD] — Graveyard & Banished Zone Advanced Inspection Dossier & Chemical Reclamation
*Timestamp: 2026-10-22T16:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **High-Craft 4-Zone Tactical Graveyard & Banished Dossier (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Implemented 4-zone quick-switch header pills allowing seamless switching between `Mộ Bạn` (Player Graveyard), `Loại Bạn` (Player Banished), `Mộ Đ.Thủ` (Opponent Graveyard), and `Loại Đ.Thủ` (Opponent Banished) with live card counts without closing the modal.
  - Added thematic visual styling: Zinc/Slate borders and dark gradient for Graveyard; Fuchsia/Purple glowing borders and galaxy backdrop for Banished zone.
  - Added pedagogical context banners explaining scientific and Master Rule distinctions: Graveyard (tro tàn hóa học & ion tự do, có thể tái sinh/tổng hợp) vs Banished (phân hủy photon tuyệt đối).
  - Multi-Dimensional Real-Time Search: searches by Vietnamese name, English name (`name_en`), chemical formula (`chemicalFormula`), and effect text.
  - Category Filter Pills: `Tất cả`, `Quái` (Elemental Monsters), `Hợp chất` (Compound Monsters), `Extra` (Synchro/Xyz/Link), `Phép` (Reaction Spells/Catalysts/Field), `Bẫy` (Traps).
  - Split-View Inspection Dossier: clicking any card renders full card stats, rarity, level/rank/link, ATK/DEF, effect text, and scientific lore.
  - Embedded 1-Click Atomic Bohr/Orbital Toggle: reveals the interactive `<CardScientificInspector />` with concentric electron shells, valence electrons, and balanced chemical equations directly inside the modal.
- **Automated Verification & Test Expansion (`test-yugioh-master-rules.mjs`)**:
  - Expanded Suite 46 with Group 17: Graveyard & Banished Zone Transparency & Chemical Reclamation Invariants (17 new tests).
  - Verified transparent accessibility of both players' GY and Banished zones per Rulebook v10 tr. 5.
  - Verified type categorization filters for Monsters, Compounds, Extra Deck, Spells, and Traps.
  - Verified multi-attribute search by formula (`H2O`), English name (`esterification`), and effect keywords.
  - Verified Banished zone mutual exclusivity and Properly Special Summoned First revival eligibility.
  - Suite 46 expanded from 104 to **121 / 121 PASSED (100%)**.
  - TypeScript validation: 0 errors (`npx tsc --noEmit`).
  - Production build clean in 6.22s (`npm run build`).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,279+ assertions (0 failures)**.

---

## [2.11.0-PROD] — Multi-Deck Code Serialization & Versioned Import/Export with Side Deck Integrity
*Timestamp: 2026-10-22T16:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Version 2 Deck Code Serialization Engine (`src/domain/deckManagement.ts`)**:
  - Upgraded canonical portable deck string format to Version 2 (`v: 2`).
  - Serializes `mainDeck`, `extraDeck`, and `sideDeck` (`side: slot.sideDeck || []`) into Base64-encoded URL-safe payloads prefixed with `ELM-DECK-`.
  - Implemented deterministic 32-bit FNV-1a checksum across name, main, extra, and side arrays to prevent corruption or tampering.
  - Backwards Compatibility: `importDeckFromString` supports both legacy `v: 1` payloads (auto-defaulting `sideDeck: []`) and modern `v: 2` payloads.
  - Checksum validation rejects altered card lists or tampered payloads with clear Vietnamese error diagnostics.
  - Rejection guards for non-`ELM-DECK-` prefixes and malformed non-Base64 input.
  - Upgraded `duplicateSlot` to duplicate `sideDeck` arrays and `resetSlot` to initialize `sideDeck: []`.
- **Deck Builder Export/Import Modals (`src/components/deck/TacticalDeckBuilderTab.tsx`)**:
  - Added "Xuất Mã" (Export Code) and "Nhập Mã" (Import Code) buttons in the Deck Builder Header Bar.
  - Built interactive Export Modal: provides the complete serialized code in a selectable textarea with 1-click clipboard copy (`handleCopyExportCode`) and animated check icon feedback.
  - Built interactive Import Modal: provides input textarea, real-time format validation, error banners, and loads imported decks into the currently active slot.
- **Automated Verification & Test Expansion (`test-deck-management.mjs`)**:
  - Expanded Suite 16 with Section 13 (7 comprehensive tests):
    1. Export slot with Side Deck to string format with `ELM-DECK-` prefix.
    2. Payload schema verification (`v === 2`, `side` array present, valid numeric checksum).
    3. Import v2 code into empty target slot and verify full restoration of Main, Extra, and Side Decks.
    4. Backwards compatibility: verify legacy v1 code imports cleanly and defaults `sideDeck: []`.
    5. Tamper detection: verify payload modification triggers checksum mismatch rejection.
    6. Invalid prefix rejection (missing `ELM-DECK-`).
    7. Malformed Base64 string rejection.
  - Suite 16 expanded from 63 to **85 / 85 PASSED (100%)**.
  - TypeScript validation: 0 errors (`npx tsc --noEmit`).
  - Production build clean in 5.99s (`npm run build`).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,262+ assertions (0 failures)**.

---

## [2.10.0-PROD] — Master Rule 15-Card Side Deck Integration in Tactical Deck Builder
*Timestamp: 2026-10-22T16:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Side Deck UI & Deck Builder Governance (`src/components/deck/TacticalDeckBuilderTab.tsx`)**:
  - Fully integrated the 15-card Side Deck (`sideDeckCardIds`) into the tactical 9-slot deck builder alongside Main Deck (30-60) and Extra Deck (0-15).
  - Added dedicated Side Deck Zone in Left Column: displays side cards using `ChemicalCardView`, hover-to-delete, and quick-swap capabilities.
  - Added Target Deck Section Toggle (`Main / Extra` vs `Side Deck`) in catalog toolbar to easily direct where card additions go.
  - Multi-Deck Action Buttons on every catalog card: `+ Deck` (adds to Main or Extra deck based on summoning type) and `+ Side` (adds to Side Deck).
  - Synchronized `handleSwapWithSideDeck` enabling instant 1-to-1 card swapping directly inside the deck builder interface with real-time feedback.
  - Integrated Side Deck into slot persistence (`handleSaveDeck`), battle default assignment (`handleSetDefault`), slot resetting, and duplication.
  - Header Bar status counters now display `Side: X / 15` alongside Main and Extra Deck bounds.
  - Expanded catalog type filter pills to include all Master Rule summoning mechanics: `SYNCHRO`, `XYZ`, `PENDULUM`, and `RITUAL`.
- **System Types Compliance (`src/domain/types.ts`)**:
  - Updated `DuelDeckConfig` to include `sideDeck?: string[];` matching `DeckSlot` and Master Rule specifications.
- **Verification & Testing**:
  - Suite 16 (`test-deck-management.mjs`): 63 / 63 passed (100%).
  - Suite 46 (`test-yugioh-master-rules.mjs`): 104 / 104 passed (100%).
  - Clean TypeScript verification (`npx tsc --noEmit` code 0).
  - Production bundle build verified (`npm run build` in 6.21s, 0 errors).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,240+ assertions (0 failures)**.

---

## [2.9.0-PROD] — Tactical Collection Gallery & Compendium Scientific Inspector Overhaul
*Timestamp: 2026-10-22T16:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Dual-Mode Scientific Inspector (`src/components/collection/TacticalCollectionTab.tsx`)**:
  - Integrated inspector switcher between `QUICK` (Quick Card Preview & Lore) and `SCIENTIFIC` (Deep Atomic Bohr-Rutherford & Reaction Mechanisms).
  - Embedded `<CardScientificInspector card={selectedCard} />` featuring the Bohr-Rutherford SVG atomic shell visualizer, concentric orbital rings, equidistant electrons, valence electrons, paramagnetic/diamagnetic tendencies, and balanced stoichiometric equations.
  - Added quick-action banner: "🔬 KÍNH HIỂN VI NGUYÊN TỬ (BOHR & ORBITAL)" for 1-click inspection from quick preview mode.
- **Multi-Dimensional Search Algorithm (`TacticalCollectionTab.tsx`)**:
  - Enriched search queries across card names (Vietnamese & English), chemical formulas (`H2O`, `NaCl`, `Fe`), IUPAC names, effect codes, effect text, and scientific lore.
  - Added atomic number queries: direct integer (e.g. `26` finds Iron Fe), prefix queries (`z=11`, `z:8`, `z26`).
  - Added mechanic keyword searches: `tuner`, `synchro`, `xyz`, `pendulum`, `scale`, `ritual`, `link`, `trap`, `spell`.
- **Comprehensive Filtering & Sorting**:
  - Expanded summoning type filter pills: `ALL`, `MONSTER` (Nguyên tố), `COMPOUND` (Hợp chất), `SYNCHRO` (Đồng bộ), `XYZ` (Xyz), `PENDULUM` (Dao động), `LINK` (Liên kết), `RITUAL` (Nghi thức), `SPELL` (Phép), `TRAP` (Bẫy).
  - Expanded chemical attribute filter pills across all 7 attributes: `ALL`, `PYRO`, `AQUA`, `TERRA`, `AERO`, `ELECTRO`, `ACID_DARK`, `NOBLE_VOID`.
  - Added `LEVEL` sorting option sorting cards by `Level / Rank / Link Rating`.
- **Automated Verification & Test Expansion**:
  - Expanded Suite 27 (`test-cards-effects-completion.mjs`): Added Test 21 (multi-dimensional queries: Z-numbers, formulas, mechanic keywords) and Test 22 (all 7 attributes and level/rank sorting). Suite 27 expanded from 20 to **22 / 22 PASSED (100%)**.
  - Production build clean in 6.47s (`npm run build`).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,240+ assertions (0 failures)**.

---

## [2.8.0-PROD] — Master Rule 15-Card Side Deck Engineering & Autonomous AI Matchup Adaptation
*Timestamp: 2026-10-22T15:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Master Rule 15-Card Side Deck System (`src/domain/deckManagement.ts`, `src/domain/cardGameTypes.ts`)**:
  - Grounded strictly in *Yu-Gi-Oh! Official Rulebook v10 tr. 6*: defined `MAX_SIDE_DECK_CARDS = 15;`.
  - Added `sideDeck?: string[];` to `DeckSlot` and `sideDeck?: CardInstance[];` to `DuelistState`.
  - Extended `DeckValidationResult` with `sideCount: number`.
  - Overhauled `DeckManagementService.validateDeck(main, extra, side)`:
    - Enforces max 15 cards in Side Deck.
    - Strictly enforces the global 3-copy limit across Main Deck, Extra Deck, and Side Deck combined.
  - Implemented `DeckManagementService.swapCardsWithSideDeck(slotIndex, origCardId, sideCardId, targetDeckType)`:
    - Guarantees 1-to-1 card substitution preserving exact Main Deck and Side Deck sizes.
    - Validates target deck type (`MAIN` or `EXTRA`) and re-checks strict 3-copy and capacity invariants before persisting.
  - Initialized strategic Side Decks across all 4 starter pre-built archetypes (`NITRO_LEGION`, `SULFUR_FORGE`, `ALKALI_HALOGEN`, `ORGANIC_SYNTHESIS`).
- **Live In-Match Tactical Swapping & Autonomous AI Adaptation (`src/domain/duelEngine.ts`)**:
  - Implemented `swapSideDeckCard(duelistId, originalCardUid, sideCardUid)` supporting live card substitutions between duels in Best-of-3 matches.
  - Implemented `aiPerformSideDeckAdaptation(observedOpponentCardIds)`:
    - Autonomous AI evaluates opponent's elemental tendencies.
    - Counters Water/Alkali with neutralization spells and passivation oxide shields (`Fe₂O₃`).
    - Counters Aggro/Burn with high-defense insoluble barriers (`BaSO₄`) and catalytic life draw.
    - Counters Acid/Toxic environments with alkaline buffers (`NaOH`) to restore neutral pH.
- **Automated Verification & Test Suite Expansion**:
  - Suite 16 (`test-deck-management.mjs`): Added Section 12 testing Side Deck capacity bounds, combined 4-copy global rejections, and 1-to-1 swap size preservation. Suite 16 expanded from 49 to **63 / 63 PASSED (100%)**.
  - Suite 46 (`test-yugioh-master-rules.mjs`): Added Group 16 testing Live DuelEngine side-deck swaps and AI autonomous dynamic adaptation against elemental matchups. Suite 46 expanded from 90 to **104 / 104 PASSED (100%)**.
  - Full regression test run (`npm test`): **All 47 suites passing with 2,238+ assertions (0 failures)**.
  - Production bundle build verified (`npm run build` in 6.16s, 0 errors).

---

## [2.7.0-PROD] — Chemical Reaction Sandbox Combinatorial Matrix & Kinetics Profile Expansion
*Timestamp: 2026-10-22T15:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Chemical Kinetics & Thermodynamic Database (`src/domain/thermochemistryEngine.ts`)**:
  - Added Standard Enthalpies of Formation ($\Delta_f H^\circ_{298}$) for: $\text{Ba(OH)}_2(aq)$ (-1000.2 kJ/mol), $\text{FeCl}_3(s)$ (-399.5 kJ/mol), $\text{Cu(NO}_3)_2(aq)$ (-302.9 kJ/mol), $\text{AgNO}_3(aq)$ (-124.4 kJ/mol), $\text{Ag}(s)$ (0 kJ/mol), and $\text{Na[Al(OH)}_4](aq)$ (-1499.7 kJ/mol).
  - Expanded `REACTION_KINETICS_PROFILES` with 6 authentic Vietnam GDPT 2018 reactions:
    - `Al+NaOH`: Amphoteric dissolution with $E_a = 45\text{ kJ/mol}$.
    - `Ba+H2O`: Vigorous alkaline hydration with $E_a = 15\text{ kJ/mol}$.
    - `O2+SO2`: Sulfuric contact process with $V_2O_5$ catalyst reducing $E_a$ from 190 to $60\text{ kJ/mol}$.
    - `AgNO3+Cu`: Silver arbor crystal displacement ($E^\circ_{cell} = +0.46\text{ V}$, $E_a = 32\text{ kJ/mol}$).
    - `Cl2+Fe`: Thermal chlorination with $E_a = 85\text{ kJ/mol}$ ($t \ge 100^\circ\text{C}$).
    - `Cl2+H2`: Photochemical explosion with light/heat activation reducing effective $E_a$ to $20\text{ kJ/mol}$.
- **Reaction Sandbox Interactive Tab Upgrade (`src/components/sandbox/ReactionSandboxTab.tsx`)**:
  - Added catalyst selector choices for $V_2O_5$ (Vanadi(V) oxit) and `LIGHT` (Ánh sáng quang hóa $h\nu$).
  - Integrated full thermodynamic, pedagogical, and Le Chatelier simulation for the 6 new reaction pathways in `evaluateReaction`:
    - $2Al(s) + 2NaOH(aq) + 6H_2O(l) \rightarrow 2Na[Al(OH)_4](aq) + 3H_2\uparrow$ ($\Delta H = -830.4\text{ kJ}$).
    - $Ba(s) + 2H_2O(l) \rightarrow Ba(OH)_2(aq) + H_2\uparrow$ ($\Delta H = -428.6\text{ kJ}$).
    - $2SO_2(g) + O_2(g) \rightleftharpoons 2SO_3(g)$ ($\Delta H = -197.8\text{ kJ}$, gated by $V_2O_5$ or $T \ge 400^\circ\text{C}$).
    - $Cu(s) + 2AgNO_3(aq) \rightarrow Cu(NO_3)_2(aq) + 2Ag\downarrow$ ($\Delta H = -147.2\text{ kJ}$).
    - $2Fe(s) + 3Cl_2(g) \rightarrow 2FeCl_3(s)$ ($\Delta H = -799.0\text{ kJ}$, gated by $T \ge 100^\circ\text{C}$).
    - $H_2(g) + Cl_2(g) \rightarrow 2HCl(g)$ ($\Delta H = -184.6\text{ kJ}$, gated by LIGHT or $T \ge 50^\circ\text{C}$).
- **Automated Verification & Test Suite Expansion**:
  - Suite 20 (`test-reaction-sandbox.mjs`): Added Group 14 testing all 6 combinatorial reaction pathways, thermodynamic enthalpies, Le Chatelier shifts, and Arrhenius catalytic speedups ($> 10^8$ for $V_2O_5$). Expanded from 29 to **35 / 35 PASSED (100%)**.
  - Suite 28 (`test-kinetics-arrhenius.mjs`): All 14 kinetics profiles verified (100%).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,210+ assertions (0 failures)**.
  - Production bundle build verified (`npm run build` in 6.15s, 0 errors).

---

## [2.6.0-PROD] — MOBA End-to-End Match Simulation & Telemetry Stress Matrix
*Timestamp: 2026-10-22T15:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **End-to-End Match Simulation & Telemetry Stress Harness (`test-moba-sim.mjs`, Suite 3)**:
  - Added Section 7 verifying Objective destruction conditions, status transitions (`VICTORY` upon Red Core destruction, `DEFEAT` upon Blue Core destruction).
  - Validated Match Debrief schema serialization across all dimensions: kills, deaths, assists, CS, damage dealt, turrets destroyed, team scores, and outcome indicators.
  - Verified pedagogical reward economics: exact 350 XP for Victory, 150 XP for Defeat, and Knowledge Tokens dynamically derived from chemical reactions triggered ($2 \times 15 + 50 = 80$).
  - Verified in-game Shop inventory & stat modulation: purchasing `item_bauxite_boots` (Al₂O₃·2H₂O) deducts 850g and increases armor by +15.
  - Suite 3 expanded from 43 to **60 / 60 PASSED (100% SUCCESS)**.
- **Verification & Build**:
  - Full regression test run (`npm test`): **All 47 suites passing with 2,204+ assertions (0 failures)**.
  - Production bundle build verified (`npm run build` in 6.27s, 0 errors).

---

## [2.5.0-PROD] — Mobile Touch Engineering, Virtual Joystick & High-DPI Precision
*Timestamp: 2026-10-22T15:00:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Mobile Virtual Joystick Engine (`src/game/controls/virtualJoystick.ts`)**:
  - `computeJoystickInput`: Polar directional unit vectors with customizable deadzones (default 10-12px) to suppress input drift, clamped to max radius with linear intensity scaling.
  - `computePinchZoom`: 2-finger multi-touch scaling bounded between 0.6x and 1.8x.
  - `extractPrimaryTouch`: Isolates primary finger touch from secondary touches.
  - `isTouchConsumedByHUD`: Intercepts touch events over HUD elements (minimap, skill buttons, shop).
- **Responsive On-Screen Virtual Joystick (`src/components/moba/MobaArenaTab.tsx`)**:
  - Glassmorphic neon-cyan base ring (`w-28 h-28 sm:w-32 sm:h-32`) with 4 cardinal directional ticks (▲, ▼, ◄, ►).
  - Center thumb nub with active scaling and directional translation.
  - Direct continuous velocity update to `engine.playerHero.targetMovePos` with deadstop upon release.
  - Multi-touch pinch-to-zoom on Canvas with smooth scaling and bounding guards.
- **Test Suite Expansions & Regressions**:
  - Suite 32 (`test-canvas-touch-resolution.mjs`): Added Section 12 testing fractional DPR displays (1.25x-3.0x), continuous joystick movement, and concurrent multi-touch (24/24 passed).
  - Suite 13 (`test-duel-engine.mjs`): Fixed turn-cycle assertion when AI concludes duel with victory/defeat (129/129 passed).
  - Full regression test run (`npm test`): **All 47 suites passing with 2,187+ assertions (0 failures)**.
  - Production bundle build verified (`npm run build` in 6.27s, 0 errors).

---

## [2.4.0-PROD] — MOBA Real-Time Elemental Reaction VFX Decals & Telegraph Shader Calibration
*Timestamp: 2026-10-22T14:45:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **MOBA Canvas 2D Chemical Reaction Visuals (`src/game/rendering/mobaRenderer.ts`)**:
  - **Dynamic Concentric Reaction Shockwaves**: Radiating expanding wave pulses with phase-shifted harmonic cycles and distance-dependent alpha decay (`(1 - phase) * 0.5`) across all active AoE zones.
  - **Ambient Perimeter Bubbling Particles**: Dynamic micro-sparks and boiling vapor particles along chemical pool rims for non-PERFORMANCE graphics tiers, visualising volatile chemical reactions.
  - **Reaction Pill Badges**: High-contrast dark obsidian container (`rgba(15, 23, 42, 0.88)`), border in reaction theme color, active duration progress bar, bold Vietnamese reaction title (`chemicalEffectType`), and IUPAC chemical equation (`equationVI`) in crisp cyan monospace for instant legibility over complex battlefield terrain.
- **Skillshot Telegraph Decal Upgrade (`src/game/rendering/mobaRenderer.ts`)**:
  - **CONE Decal**: Animated forward-sweeping curved wavefront arcs radiating outward from the hero origin to maximum skillshot range, dual guideline dividers at quarter-spread angles, central aiming vector, and dashed maximum range ring.
- **Test Suite Expansion (`test-graphics-perf.mjs`, Suite 6)**:
  - Added Group 6: AoE Chemical Reaction Zones & Aim Decal Canvas Pipeline (5 new assertions).
  - Verified viewport culling for out-of-screen AoE pools.
  - Verified in-viewport concentric reaction waves and chemical equation badge rendering.
  - Verified CONE skillshot sweeping wavefronts and guidance rays.
  - Verified LINE and AOE geometric constraints.
  - Verified strict 60 FPS Canvas draw-call budget under clustered 8-pool teamfight load (< 250 calls).
  - Suite 6 now **19 / 19 PASSED** (up from 14/14).
- **Verification & Build**:
  - Full regression test run (`npm test`): **All 47 suites passing with 2,182+ assertions (0 failures)**.
  - Production bundle build verified (`npm run build` in 6.29s, 0 errors).

---

## [2.3.0-PROD] — Campaign Story Master Rule Chapters 6 & 7 Expansion
*Timestamp: 2026-10-22T14:30:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Campaign Story Chapters 6 & 7 Expansion (`src/components/campaign/CampaignStoryTab.tsx`)**:
  - **Chapter 6: Tháp Phối Trí Bát Diện Marie Curie** (`stage_6_coordination_spire`): Boss Marie Curie wielding Octahedral Ligand Field hazard ($\Delta_\circ = 23,000\text{ cm}^{-1}$), +400 ATK/DEF for Xyz/Complexes, and bonus Overlay Unit attachment upon summoning. Reward: `card_field_octahedral_complex`.
  - **Chapter 7: Khe Nứt Dao Động Đẳng Điện Dmitri Mendeleev** (`stage_7_zwitterion_rift`): Boss Dmitri Mendeleev at isoelectric pH 5.97, Amino Acid Zwitterion Pendulum Scales 1..8 mass-swarming, and Buckyball C₆₀ Fullerene Boss ritual summon. Reward: `card_field_zwitterion_gate`.
- **New Field Environment Cards (`src/data/playableCardsData.ts`)**:
  - `card_field_octahedral_complex`: Địa Bàn: Lưới Phối Tử Bát Diện Werner (ULTRA_RARE, Electro, +400 ATK/DEF to Xyz/Complexes, attached Overlay Unit bonus).
  - `card_field_zwitterion_gate`: Địa Bàn: Cổng Dao Động Đẳng Điện pI (SECRET_RARE, Terra, expands Pendulum Scale range by 1 on both ends, draws 1 card on successful Pendulum Summon).
- **Test Suite Expansion (`test-campaign-boss.mjs`, Suite 18)**:
  - Expanded Suite 18 to 18 assertions verifying all 7 campaign stages, 8 field environment cards, progressive linear unlocking through Stage 7, and monotonic Boss AI difficulty scaling.
  - Verified full 47-suite regression (`npm test` 47/47 passed, 2,177+ assertions).
  - Production build clean (`npm run build` in 6.32s).

---

## [2.2.0-PROD] — Master Rule Procedural Audio Engine, Pedagogical Quip Balloon & 6-Archetype Parity
*Timestamp: 2026-10-22T14:15:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Interactive Procedural Audio Procedures (`src/audio/soundEngine.ts`)**:
  - `playSynchroSummonFanfare()`: Resonant tri-tone fanfare for catalytic synchro summons.
  - `playXyzSummonGalaxy()`: Low-frequency gravitational singularity sweep with frequency drop.
  - `playPendulumSwarmChord()`: Harmonious celestial chord for zwitterion amino acid swarming.
  - `playRitualAltarChant()`: Sacred crystallization altar chant for fullerene boss descent.
  - `playLinkSummonNetwork()`: Digital circuit sawtooth arpeggio for molecular link summoning.
  - `playDamageStepSubstep(1..5)`: Distinct acoustic feedback across all 5 Damage Step micro-substeps.
  - `playCharacterPersonaChime(persona)`: Signature thematic chimes for Mendeleev, Curie, Lavoisier, Alpha, and Beta.
- **Pedagogical Character Dialogue & Quip Balloon Architecture (`src/domain/characterQuips.ts`, `src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Authentic bilingual chemistry dialogue bank for 5 duelist personas covering match start, 6 summoning mechanics, Haber-Bosch/Thermite triggers, low LP, direct attack, and match outcomes.
  - Floating speech balloon UI with animated entrance, persona avatar badges, bilingual VI/EN quotes, and GDPT 2018 scientific principles.
  - Unified attack execution between drag-and-drop targeting and click declaration, with real-time 5-substep audio dispatch.
- **6-Archetype Tournament Parity Audit (`test-archetype-tournament-sim.mjs`, Suite 31)**:
  - Added Section 10 testing all 6 chemical archetypes (Nitro Legion, Sulfur Forge, Alkali Halogen, Organic Synthesis, Noble Inert Defense, Catalytic Synthesis).
  - Executed 15 pairwise round-robin matches verifying finite LP, zero exceptions, and balanced win rate parity.
- **Verification & Test Suite Expansion (`test-master-rule-audio-quips.mjs`, Suite 47)**:
  - Added Suite 47 covering Web Audio procedures, character persona dialogue, and 50 concurrent dispatch cycles (34 / 34 assertions PASSED, 100% success).
  - Full 47-suite regression verified with 2,175+ passing assertions across all systems.
  - Production build clean (`npm run build` in 6.22s).

---

## [2.1.0-PROD] — Master Rule AI Decision Intelligence & Scientific Bohr-Rutherford Visualizer
*Timestamp: 2026-10-22T13:55:00+07:00 | Status: Production Ready & Fully Verified*

### Added & Enhanced
- **Autonomous Master Rule AI Decision Intelligence (`src/domain/duelEngine.ts`)**:
  - `aiPlayPendulumStrategy`: AI analyzes hand cards for Pendulum Scales, activates Left (low scale) and Right (high scale) zones, and executes swarming Pendulum Summons across hand and face-up Extra Deck.
  - `aiPlayNormalSummonStrategy`: Intelligently prioritizes Tuner monsters (`card_elem_78_pt_tuner`) or same-Level monsters to unlock Extra Deck Synchro / Xyz plays, while maintaining tactical defense positions for high DEF noble gases and inert shields.
  - `aiPlayExtraDeckStrategy`: Autonomously executes Synchro Summons (matching Tuner Pt + Non-Tuner Fe = Level 7 Catalytic Converter), Xyz Summons (matching 2x Level 4 into Hexammine Cobalt or 2x Level 5 into Ferrocene), Xyz Detach effects (Cobalt damage shield, Ferrocene +800 ATK boost), Compound/Fusion synthesis, and Link Summons.
  - `aiPlayRitualStrategy`: Autonomously tributes field monsters with star sum $\ge 8$ to summon Buckyball C₆₀ Fullerene Boss.
  - Tactical Link Defense: Rejects sacrificing high-DEF defensive walls (DEF $\ge 1500$, Noble Void, Inert Shield) as Link-1 fodder.
  - Added Master Rule cards into Mendeleev & Expert AI decks: Platinum Tuner, Glycine Scale 1, Glutamic Acid Scale 8, Crystallization Ritual Spell, and Buckyball C₆₀ Ritual Monster.
- **Card Scientific Inspector Architecture (`src/components/duel/CardScientificInspector.tsx`)**:
  - Interactive Bohr-Rutherford SVG atomic shell diagram with concentric orbit rings, equidistant electron particles, and central nucleus telemetry.
  - Vietnam GDPT 2018 electron configurations: noble gas notation, valence electrons, paramagnetic / diamagnetic magnetic moment $\mu$, and chemical reactivity tendencies.
  - Master Rule Mechanics Dossiers: Synchro Tuner/Non-Tuner equations, Xyz Rank & Overlay Units attached tracker, Pendulum dual meters, Link 8-direction compass, and Ritual tribute requirements.
  - Balanced IUPAC chemical equations with thermodynamic reaction enthalpies ($\Delta H^\circ$).
- **Verification & Test Suite Expansion (`test-yugioh-master-rules.mjs`, Suite 46)**:
  - Added Group 15: AI Master Rule Autonomous Extra Deck & Pendulum Decision Intelligence (90 / 90 assertions PASSED, 100% success).
  - Full 46-suite regression verified with 2,130+ passing assertions.
  - Production build verified (`npm run build` in 6.25s).

---

## [2.0.0-PROD] — Shift Protocol `ELEMENTA-GAMEPLAY-RECONSTRUCTION-10H`
*Start: 2026-10-22T12:47:52+07:00 | Target: 2026-10-22T22:47:52+07:00 (10 Hours Continuous)*
*Status: In Progress — Full Yu-Gi-Oh! Official Rulebook v10 & Master Rule 2020/2021 TCG Systems Reconstructed & Verified*

### Added & Reconstructed
- **Canonical Yu-Gi-Oh! Master Rule v10 & 2020/2021 Core Architecture (`src/domain/cardGameTypes.ts`, `src/domain/duelEngine.ts`, `test-yugioh-master-rules.mjs`, Suite 46: 74/74 assertions PASSED)**:
  - **10 Summoning Mechanics Fully Integrated**:
    1. *Normal Summon / Normal Set*: Level 1-4 free, Level 5-6 1 tribute, Level 7+ 2 tributes. Normal Set places monster in `FACE_DOWN_DEFENSE`.
    2. *Flip Summon*: Cannot Flip Summon on the turn Set; flips to `FACE_UP_ATTACK` and triggers FLIP effects.
    3. *Tribute Summon*: Sends tribute monsters to Graveyard.
    4. *Special Summon*: General summon category.
    5. *Compound Synthesis (Fusion)*: Combines stoichiometric elemental cards into chemical compounds.
    6. *Ritual Summon*: Uses Ritual Spells (e.g. Crystallization Ritual `card_spell_crystallization_ritual`) to tribute field/hand monsters totaling $\ge$ Ritual Monster Level, summoning Buckyball C₆₀ Fullerene (`card_ritual_fullerene`).
    7. *Synchro Summon*: Combines exactly 1 Tuner (Platinum `card_elem_78_pt_tuner` Level 3) + 1+ Non-Tuners (Sodium Level 3, etc.) whose exact level sum equals Synchro Monster Level (Synchro Catalytic Converter Level 7 `card_synchro_catalytic_converter`).
    8. *Xyz Summon & Overlay/Detach*: Overlays 2+ monsters of matching Level as attached `xyzMaterials` beneath Rank 4 Hexammine Cobalt(III) `card_xyz_hexammine_cobalt` or Rank 5 Ferrocene `card_xyz_ferrocene`. Detach sends attached material to Graveyard without triggering field-exit leaves.
    9. *Pendulum Scales & Summon*: Placing Zwitterion Amino Acid Pendulum monsters (Glycine Scale 1, Glutamic Acid Scale 8) into Spell/Trap slots 0 and 4 activates Left & Right Scales. Pendulum Summon executes simultaneous mass-summon of eligible monsters from hand & face-up Extra Deck strictly between the two Scales (1 < Level < 8). Field Pendulum monsters destroyed are redirected face-up to Extra Deck.
    10. *Link Summon*: Uses Link materials on field to summon Link monsters to Extra Monster Zone.
  - **Master Rule Competitive Mechanics**:
    - *Properly Special Summoned First Rule*: Extra Deck and Ritual monsters sent directly to Graveyard/Banished without proper initial summon are strictly prohibited from being revived.
    - *Damage Step 5 Substeps*: Micro-segmented into (1) Start of Damage Step, (2) Before Damage Calc (flips face-down defense monsters), (3) Perform Damage Calc (calculates damage & marks destruction), (4) After Damage Calc (triggers FLIP effects), (5) End of Damage Step (sends destroyed monsters to Graveyard).
    - *0 ATK Battle Invariant*: Attack between two 0 ATK monsters in Attack Position deals 0 damage and destroys neither monster (Rulebook v10 tr. 50).
    - *Battle Step Replay*: Automatically flags Replay when the defending field monster count changes before entering Damage Step.
    - *SEGOC 4-Tier Trigger Ordering*: Simultaneous trigger effects form chains automatically in 4 strict ranks: (1) Turn Player Mandatory $\to$ (2) Opponent Mandatory $\to$ (3) Turn Player Optional $\to$ (4) Opponent Optional.
    - *PSCT 4 Conjunction Resolver*: Models strict sequential vs simultaneous resolution for `then`, `and if you do`, `also`, and `and`.
    - *End Phase Hand Size Limit*: Automatically enforces discarding excess cards down to exactly 6 at End Phase.
- **Battlefield HUD & Game Mat Overhaul (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - Rendered central Extra Monster Zones (EMZ 1 and EMZ 2) between player and opponent boards.
  - Added Pendulum Scale telemetry badges on Slots 0 and 4 of both boards.
  - Added real-time Pendulum Summon trigger button with active Scale telemetry.
  - Overhauled SynthesisModal with 6 dedicated summoning tabs: `FUSION`, `SYNCHRO`, `XYZ`, `LINK`, `PENDULUM`, `RITUAL`.
  - Added multi-colored elemental light burst Cut-In overlays for all summoning types.
  - Verified 100% clean TypeScript compile (`npx tsc --noEmit`) and Vite production bundle (`npm run build` in 6.26s).

---

## [1.0.0-PROD] — Shift Protocol `ELEMENTA-NIGHT-SHIFT-10H`
*Start: 2026-10-21T23:04:03+07:00 | Completed: 2026-10-22T09:05:39+07:00 | Elapsed: 10h 01m 36s (10.03 Hours)*
*Status: Goal Complete (10-Hour Non-Termination Gate Exceeded)*

### Added
- **Bohr Model Balmer Emission Series & Quantum Energy Hierarchy (`test-flame-test.mjs`, Suite 19: 22/22, +1 assertion)**:
  - Verified Hydrogen Balmer visible series emission wavelengths ($H_\alpha 656.3\text{ nm}, H_\beta 486.1\text{ nm}, H_\gamma 434.0\text{ nm}, H_\delta 410.2\text{ nm}$) obeying the Rydberg quantum transition energy hierarchy ($E = hc / \lambda$, with $E(H_\delta) > E(H_\gamma) > E(H_\beta) > E(H_\alpha)$).
- **Asymmetric Acid-Base Titrations & Error Boundary Defense (`src/domain/chemicalCalculator.ts`, `test-titration-curve.mjs`, Suite 43: 46/46, +5 assertions)**:
  - Verified asymmetric concentration titrations ($0.2\text{ M } HCl$ vs $0.05\text{ M } NaOH \to V_{eq} = 100.0\text{ mL}$, $pH_{eq} = 7.00$; $0.05\text{ M } CH_3COOH$ vs $0.1\text{ M } NaOH \to V_{eq} = 10.0\text{ mL}$, half-equivalence $pH = 4.76$).
  - Implemented parameter validation error boundary guards against non-positive acid/base molarity and volumes.
- **Quantum Orbital Isoelectronic Series & Transition Metal Ionization (`src/domain/orbitalEngine.ts`, `test-orbital-engine.mjs`, Suite 24: 29/29, +3 assertions)**:
  - Verified 2-electron ($H^-, Li^+, Be^{2+} \to [He] 1s^2$) and 36-electron ($Br^-, Rb^+, Sr^{2+}, Y^{3+}, Zr^{4+} \to [Kr] 3d^{10} 4s^2 4p^6$) isoelectronic series with diamagnetic ground states.
  - Verified transition metal cation ionization and spin-only magnetic moments for $Mn^{2+}$ ($[Ar] 3d^5, \mu = 5.92\text{ BM}$) and $Cr^{3+}$ ($[Ar] 3d^3, \mu = 3.87\text{ BM}$).
- **Custom High-Level Monster Tribute Summon & Zone Invariants (`src/domain/duelEngine.ts`, `test-custom-cards-integration.mjs`, Suite 23: 18/18, +2 tests)**:
  - Verified Level 7 custom high-power monster card tribute summon requirement (requires $\ge 2$ tributes with combined stars $\ge 7$; 0 tributes rejected with descriptive error; valid tributes send fodder to Graveyard and place custom titan in monster zone).
  - Verified custom card Graveyard routing and Banished Zone transfer preserving full custom card definition, rarity, and effectCode without corruption.
- **Equation Balancer Edge-Case Hardening & Coordination Adduct Parsing (`src/domain/equationBalancer.ts`, `test-chemistry-fuzz.mjs`, Suite 5: 19/19, +3 tests, +15 assertions)**:
  - Resolved parsing edge case where single trailing `+` or `-` on polyatomic oxyanions (`MnO4-`, `NO3-`, `NH4+`, `ClO4-`, `HCO3-`) was inadvertently consuming the formula's terminal subscript digit as a multi-unit charge magnitude (e.g. `MnO4-` erroneously parsed as `MnO` with charge `-4`).
  - Implemented 6-tier charge resolver in `parseSpeciesCharge` and hardened `parseFormulaAtoms` to preserve terminal atom subscripts on polyatomic ions.
  - Added Group 8 to Suite 5 verifying transition metal coordination complexes (`[Ag(NH3)2]+`, `[Fe(CN)6]4-`, `[Fe(CN)6]³⁻`, `[Cu(H2O)6]2+`) and oxyanions (`MnO4-`, `Cr2O7^2-`, `S2O3^2-`).
  - Added Group 9 to Suite 5 verifying full atom/charge conservation for flagship redox equations ($5Fe^{2+} + MnO_4^- + 8H^+ \to 5Fe^{3+} + Mn^{2+} + 4H_2O$ and $Cr_2O_7^{2-} + 6Fe^{2+} + 14H^+ \to 2Cr^{3+} + 6Fe^{3+} + 7H_2O$) and complete combustion across the alkane homologous series ($CH_4, C_2H_6, C_3H_8, C_4H_{10}$).
- **Spell Speed Priority, Counter Trap Cascades & Direct Attack Verification (`src/domain/duelEngine.ts`, `test-cards-effects-completion.mjs`, Suite 27: 20/20, +2 tests)**:
  - Verified Yu-Gi-Oh! / ELEMENTA TCG Spell Speed rules: Normal Spells (Spell Speed 1) cannot chain to an existing link; Quick-Play Spells (Spell Speed 2) cannot respond to Counter Traps (Spell Speed 3); Counter Traps (Spell Speed 3) can respond to Counter Traps with full LIFO chain resolution.
  - Verified Direct Attack mechanics: defending monsters block direct attacks, Fluorine (`ELEM_F_MAX_OX`) absolute electronegativity override penetrates through defense-position monsters, and single-turn attack lockouts prevent duplicate attacks.
- **Concentration Cell Simulation Engine (Pin Nồng Độ) (`src/domain/electrochemistryEngine.ts`, `test-electrochemistry-galvanic.mjs`, Suite 44: 23/23, +3 assertions)**:
  - Implemented `simulateConcentrationCell(params)` modeling spontaneous concentration gradient cells ($E^\circ = 0.00\text{ V}$, $E = \frac{0.0592}{n}\log\frac{C_{conc}}{C_{dilute}}$).
  - Validated Silver concentration cell ($Ag | Ag^+(0.01\text{ M}) || Ag^+(1.0\text{ M}) | Ag \implies E = +0.1183\text{ V}$).
  - Validated Copper concentration cell ($Cu | Cu^{2+}(0.001\text{ M}) || Cu^{2+}(0.1\text{ M}) | Cu \implies E = +0.0592\text{ V}$).
  - Verified error handling on invalid concentration inputs ($C_{dilute} \ge C_{conc}$ and non-positive concentrations).
- **VSEPR Molecular Polarity & Dipole Moment Cancellation (`src/domain/bondingEngine.ts`, `test-bonding-vsepr.mjs`, Suite 22: 25/25, +2 assertions)**:
  - Implemented `predictMolecularPolarity(shape, ligands, lonePairs)` predicting net molecular dipole vector cancellation vs asymmetry under Vietnam GDPT 2018 Chemistry Grade 10 standards.
  - Verified non-polar molecules with identical ligands ($CO_2, BF_3, CH_4, CCl_4, SF_6 \to \vec{\mu}_{net} = \vec{0}, 0\text{ D}$).
  - Verified polar molecules with lone pairs or asymmetric ligands ($H_2O, SO_2, NH_3, CH_3Cl, HCN \to \vec{\mu}_{net} \neq \vec{0}, > 0\text{ D}$).
- **Quantum Orbital Ion Engine, Isoelectronic Series & Transition Metal Ionization (`src/domain/orbitalEngine.ts`, `test-orbital-engine.mjs`, Suite 24: 26/26, +4 assertions)**:
  - Implemented `computeIonElectronStructure(z, symbol, charge)`:
    - Adheres strictly to the transition metal ionization rule where outer $4s$ electrons are removed prior to inner $3d$ electrons ($Fe^{2+} \to [Ar] 3d^6, Fe^{3+} \to [Ar] 3d^5, Cu^+ \to [Ar] 3d^{10}, Cu^{2+} \to [Ar] 3d^9, Zn^{2+} \to [Ar] 3d^{10}$).
    - Calculates spin-only magnetic moments ($\mu = \sqrt{n(n+2)}\text{ BM}$) and classifies paramagnetic vs diamagnetic ground states.
    - Verified 10-electron ($O^{2-}, F^-, Ne, Na^+, Mg^{2+}, Al^{3+}$) and 18-electron ($Cl^-, K^+, Ca^{2+}, Sc^{3+}, Ti^{4+}$) isoelectronic series against noble gas configurations.
- **Booster Pack Economy, Crafting Ratios & Pity Protection Invariants (`src/components/shop/BoosterShopTab.tsx`, `test-booster-pack-economy.mjs`, Suite 37: 8 sections, +60 assertions)**:
  - Exported `CRAFTING_COST_PER_RARITY` and `calculateCraftingRefundRatio` guaranteeing a uniform 4:1 craft-to-disenchant ratio standard across all card rarities.
  - Enhanced `rollBoosterPack` with dynamic pity tracking, guaranteeing an Ultra Rare or Secret Rare in slot 4 at pity counter $\ge 9$.
  - Verified 100 pack dynamic opening simulation with zero droughts exceeding 9 packs and instant counter reset upon rolling high rarity cards.
- **Teacher Analytics, Cohen's d Effect Size & At-Risk Student Triage (`src/domain/educatorAnalytics.ts`, `test-teacher-analytics.mjs`, Suite 36: 142/142, +15 assertions)**:
  - Implemented `calculateEffectSize` computing Cohen's $d = (\bar{X}_{post} - \bar{X}_{pre}) / s_{pooled}$ verifying transformative educational gain ($d = 6.55 \ge 1.2$, Very Large effect size).
  - Implemented `identifyStudentsAtRisk` to triage students requiring pedagogical intervention and generate automated remedial actions.
- **Duel Chains Deep, Trap Interruption & Field Graveyard Routing (`src/domain/duelEngine.ts`, `test-duel-chains-deep.mjs`, Suite 4: 26/26, +3 tests)**:
  - Added Battle Phase Noble Gas Shield attack declaration trap interruption terminating Battle Phase to `MAIN_PHASE_2`.
  - Implemented Field Environment Replacement Graveyard routing ensuring previous active field spell moves to Graveyard upon resolution of a new field card.
  - Added Counter Trap multi-negation cascade LIFO resolution verification.
- **VSEPR Molecular Geometry Engine & Repulsion Angle Contractions (`src/domain/bondingEngine.ts`, `test-bonding-vsepr.mjs`, Suite 22: 23/23, +2 assertions)**:
  - Added lone pair repulsion angle contractions verification: $\theta(CH_4) = 109.5^\circ > \theta(NH_3) = 107.0^\circ > \theta(H_2O) = 104.5^\circ$.
  - Implemented `predictVseprGeometry` algorithmic geometry, hybridization, and bond angle deduction across steric numbers 2 to 6 ($sp, sp^2, sp^3, sp^3d, sp^3d^2$).
- **Ranked Season-End Soft Reset & Demotion Protection Buffer (`src/domain/rankedSystem.ts`, `test-ranked-system.mjs`, Suite 15: 60/60, +22 assertions)**:
  - Implemented `resetSeason(newSeasonId: string)` with soft MMR reset formula $MMR_{new} = 1000 + \lfloor (MMR_{old} - 1000) \times 0.5 \rfloor$ for accounts at $\ge 1000$ MMR.
  - Added seasonal reward distribution (XP, elemental shards, booster packs) matching tier promotion reward configs.
  - Implemented 3-match Demotion Protection Shield granted on tier promotion (`tierUp === true`) that absorbs losses down to tier floor before permitting tier demotions.
- **Deck Export/Import Serialization & Checksum Integrity (`src/domain/deckManagement.ts`, `test-deck-management.mjs`, Suite 16: 49/49, +17 assertions)**:
  - Implemented `exportDeckToString` generating URL-safe Base64 serialized payloads with `ELM-DECK-` prefix standard and deterministic FNV-1a checksums.
  - Implemented `importDeckFromString` with format validation, checksum tamper defense, and schema verification.
  - Added `removeCardsFromSlot` and `addCardsToSlot` supporting bulk card operations with capacity (60 main / 15 extra) and 3-copy limit enforcement.
- **Custom Crafted Cards & AI Synthesis Pipeline (`test-custom-cards-integration.mjs`, Suite 23: 16/16, +3 assertions)**:
  - Fixed 3-copy restriction assertion in `test-custom-cards-integration.mjs` aligned with `DeckManagementService.validateDeck`.
  - Verified school safety keywords (chemical weapons/nerve agents strictly rejected), adversarial prompt injection defense (clamping power to <= 120 and cooldown >= 8s), and unphysical reaction penalties (Noble Gas combustion, Cu + dilute HCl).
- **Redox Balancing & Standard Reduction Potentials Engine (`src/domain/redoxEngine.ts`, `test-redox-engine.mjs`, Suite 26: 24/24, +4 sections)**:
  - Added flagship disproportionation reactions ($Cl_2 + 2NaOH \to NaCl + NaClO + H_2O$ and $3Cl_2 + 6KOH \xrightarrow{100^\circ\text{C}} 5KCl + KClO_3 + 3H_2O$).
  - Added Claus process comproportionation reaction ($2H_2S + SO_2 \to 3S\downarrow + 2H_2O$).
  - Implemented `STANDARD_REDUCTION_POTENTIALS` with 18 IUPAC standard reduction couples ($F_2/2F^- = +2.87\text{ V}$ down to $K^+/K = -2.93\text{ V}$) and SHE reference ($0.00\text{ V}$).
  - Implemented `calculateStandardCellEmf` computing Daniell cell ($+1.10\text{ V}$), Fe-Cu cell ($+0.78\text{ V}$), and spontaneous vs non-spontaneous thermodynamic criteria.
- **Analytical Titration Curve Engine (`src/domain/chemicalCalculator.ts`, `test-titration-curve.mjs`, Suite 43: 41/41, +4 sections)**:
  - Added buffer capacity plateau vs equivalence jump slope minimization (steep jump slope 7.88 pH/mL exceeds buffer slope 0.08 pH/mL by > 100x).
  - Added Formic acid ($HCOOH$, $pK_a = 3.75$) conjugate base hydrolysis validation: $pH_{eq}(HCOOH) = 8.22 < pH_{eq}(CH_3COOH) = 8.73$.
  - Added 3-step pedagogical explanation validation and concentration jump interval expansion ($1.0\text{ M}$ vs $0.01\text{ M}$).
- **Electrochemistry & Galvanic/Electrolysis Engine (`test-electrochemistry-galvanic.mjs`, Suite 44: 20/20, +4 assertions)**:
  - Added thermodynamic equilibrium constant verification ($K > 10^{35}$ for Daniell cell).
  - Added Le Chatelier concentration effects and Nernst equation modulation ($Q = 0.05 \implies E > E^\circ$, $Q = 20 \implies E < E^\circ$).
  - Added circuit electron flow (anode to cathode) and salt bridge ion migration (cations to cathode, anions to anode) telemetry invariants.
  - Added 5-step curriculum derivation verification.
- **Tactical Card Effects & Strategic Draw Engine (`test-cards-effects-completion.mjs`, Suite 27: 18/18, +6 tests)**:
  - Added `SPELL_FUEL_CELL_PERMA` (permanent +1 maxMana expansion, +400 LP heal).
  - Added `SPELL_MANA_BURN` (burns 2 opponent mana, inflicts 800 direct LP damage).
  - Added `SPELL_GRAVEYARD_REBORN` (revives metallic Fe monster from Graveyard to empty field slot).
  - Added `FIELD_HABER_CHAMBER` (establishes 200 atm, 450°C, and injects Fe catalyst).
  - Added `TRAP_NOBLE_SHIELD` (terminates Battle Phase instantly to MAIN_PHASE_2).
  - Added Strategic Draw Systems: `tributeToDraw` (sacrifices monster to draw 2 cards) and `lifePointDraw` (spends 1000 LP to draw 2 cards, low LP guard).
- **Chemical Environment Tactical Puzzles (`test-environment-puzzles.mjs`, Suite 25: 16/16, +3 tests)**:
  - Added GDPT 2018 high school curriculum mapping verification.
  - Added physical reality boundaries across thermodynamics, pH, and pressure.
  - Added commutative reward accumulation invariants (order-independent currency delivery).
- **Multi-Archetype Tournament Simulation (`test-archetype-tournament-sim.mjs`, Suite 31: 37/37, +8 assertions)**:
  - Added Section 8: Low-level monster ratio ($\ge 60\%$) across all 4 archetypes preventing brick hands.
  - Added Section 9: Dual-sided mirror match parity resolving cleanly without NaN or exceptions.
- **Canvas Touch Resolution & Mobile Controls (`test-canvas-touch-resolution.mjs`, Suite 32: 21/21, +6 assertions)**:
  - Added Section 9: Virtual joystick deadzone (< 12px) and polar deflection intensity math.
  - Added Section 10: Multi-touch pinch-to-zoom distance clamping ([0.5, 2.0] bounds).
  - Added Section 11: HUD interaction occlusion & input consumption guard preventing accidental ground moves.
- **Campaign Story & Boss Battles (`test-campaign-boss.mjs`, Suite 18: 16/16, +3 assertions)**:
  - Added Section 6: Boss Field Spell override/clash dynamics (Player Alkaline Spring overrides Boss Acid Rain).
  - Added Section 7: Progressive stage gating (Stages 1 through 5) and Campaign Master trophy.
  - Added Section 8: Monotonic Boss AI difficulty hierarchy.
- **Periodic Trends & IUPAC Ground Truth (`test-periodic-trends-visualizer.mjs`, Suite 45: 26/26, +7 assertions)**:
  - Added Section 9: Standard state aggregate partitions at 298.15 K (exactly 11 gases, 3 liquids, 104 solids).
  - Added Section 10: Oxidation state extremes ($F = -1$, $Mn = +7$, $Os = +8$, Group 1 = +1, Group 2 = +2).
  - Added Section 11: Global first ionization energy extremes (Helium max $2372.3\text{ kJ/mol}$, Caesium min $375.7\text{ kJ/mol}$) and Group 18 monotonic column decrease.
- **Flame Test Spectroscopy (`test-flame-test.mjs`, Suite 19: 21/21, +3 assertions)**:
  - Added Section 4: Planck-Einstein photon energy relations ($E = hc/\lambda$, Magnesium UV emission > 4.0 eV).
  - Added Section 5: Pyrotechnic fireworks coloration chemistry applications.
- **Reaction Sandbox & Stoichiometric Yield (`test-reaction-sandbox.mjs`, Suite 20: 29/29, +3 assertions)**:
  - Added Section 11: Haber-Bosch limiting reactant ($N_2$) and exact remaining inventory ($4 H_2, 0 N_2$).
  - Added Section 12: Sub-stoichiometric missing reactant diagnostic reporting.
  - Added Section 13: Missing environmental condition diagnostic reporting.
- **TCG LIFO Chain Resolution & Negation Cascade (`test-duel-chains-deep.mjs`, Suite 4: 23/23, +6 tests)**:
  - Added Group 7: Triple-Link Negation Cascade (Player Link 1 Exo Burst Speed 1 $\to$ Opponent Link 2 Cognitive Cu+HCl Counter Trap Speed 3 $\to$ Player Link 3 Cognitive Cu+HCl Counter Trap Speed 3). LIFO resolution: Link 3 negates Link 2 and inflicts 1000 LP; Link 2 is skipped; Link 1 resolves unhindered dealing 450 LP damage to opponent. Total damage: 1450 LP to opponent, 0 LP to player.
  - Added Group 8: Missing Target / Fizzle Resolution & Boundary Safety (resolves gracefully without throwing when target monster is removed prior to chain resolution, out-of-bounds slot indices [-1, 99] handled safely).
  - Added Group 9: Spell/Trap Activation Timing & Mana Cost Constraints (strictly forbids activating traps the same turn they are set face-down, verifies subsequent turn activation succeeds, verifies insufficient mana rejection).
- **Tactical Card Battle & Chemistry Combos (`test-card-battle.mjs`, Suite 12: 83/83, +33 assertions)**:
  - Added Section 9: Shield Saturation & Pure HP Penetration Dynamics (verifies partial shield absorption and full shield depletion with exact direct HP penetration).
  - Added Section 10: Multi-Turn Battle Endurance Simulation (5 consecutive turn cycles verifying `turn` progression to 6, mana capping at `maxMana` = 5, hand sizing limits, and log telemetry).
  - Added Section 11: Pedagogical Reaction Rules & Chemistry Completeness (verifies `defaultReactionEngine.rules` against GDPT 2018 benchmark reactions: `R01_NA`, `R01_K`, `R02_RUST`, `R03_FE_CL2`, `R03_NEUTRALIZE`, `R04_AGCL`, `R04_BASO4` with valid equations, base power, and pedagogical explanations).
- **TCG Duel Engine & Battle Positions (`test-duel-engine.mjs`, Suite 13: 129/129, +24 assertions)**:
  - Added Section 22: Monster Battle Position Switching Invariants (cannot switch position on the turn summoned, cannot switch outside Main Phase, switches between `FACE_UP_ATTACK` and `FACE_UP_DEFENSE`, cannot switch twice on the same turn, Link Monsters strictly prohibited from Defense position).
  - Added Section 23: Direct Attack Field Protection Invariant (direct attack strictly rejected while opponent controls monsters, succeeds once opponent field is cleared, dealing exact direct damage).
  - Added Section 24: Marathon Duel Multi-Turn Cycles & Telemetry (sustained 8-cycle duel simulation to Turn 10+, generating 95+ detailed logs with full schema validation).
- **Chemical Bonding & VSEPR Geometry (`test-bonding-vsepr.mjs`, Suite 22: 21/21, +3 assertions)**:
  - Added Section 6: Lewis Representation & Octet Integrity (verifies electron pair counts, valency, shared/lone pairs across canonical models).
  - Added Section 7: Hybridization & Geometry Cross-Validation (steric numbers 2, 3, 4 strictly dictate sp, sp², sp³ hybridization).
  - Added Section 8: Gameplay Buff Pedagogical Alignment (maps ionic crystals to `DEF_SHIELD`, $N_2$ to `TENACITY`, $H_2$ to `COOLDOWN_HASTE`, $O_2$ to `BURST_ATTACK`).
- **Chemical Environment Thermodynamics & Multi-Hazard Combat Stacking (`test-environment-engine.mjs`, Suite 14: 47/47, +12 assertions)**:
  - Added Section 7: Buffer Exhaustion & Acid Breakthrough Dynamics (absorbs 75% shock until capacity = 0, then undergoes complete unbuffered acid breakthrough).
  - Added Section 8: Amphoteric Zinc Dual pH Extremes Invariant (Zinc gains +300 ATK, -200 DEF in strong acid; Zinc gains +400 ATK in strong alkali via $[Zn(OH)_4]^{2-}$ zincate complexation).
  - Added Section 9: Multi-Hazard Supercritical Environment Stacking (validates additive combination of high pressure >5 atm (+250 ATK), high temperature >500 K (+350 ATK), and multiple catalysts (+300 ATK) in supercritical Haber conditions).
- **Ranked Ladder Governance & Progression Invariants (`test-ranked-system.mjs`, Suite 15: 38/38, +19 assertions)**:
  - Added Section 6: Bronze Tier Defeat Protection (zero MMR penalty on defeat in Bronze tier, preserving 600 MMR floor).
  - Added Section 7: Swift Victory & Triple Tactical Bonus Scaling (+5 for $\ge 6000$ LP, +5 for $\le 6$ turns, +5 for $\ge 2$ reactions -> +45 MMR delta).
  - Added Section 8: Match History Size Capping (strictly limited to 20 records max with latest match unshifted to index 0).
  - Added Section 9: Division Progression Invariants across Silver Tier (1050 -> IV, 1150 -> III, 1300 -> II, 1450 -> I).
  - Added Section 10: Win Streak & Longest Streak Persistence (resets current streak to 0 on defeat while strictly preserving longest win streak).
  - Added Section 11: Tier Up Promotion Detection (crossing 1500 MMR flags `tierUp: true` and promotes profile to GOLD).
- **Deck Management Engine Governance & Validation Diagnostics (`test-deck-management.mjs`, Suite 16: 32/32, +10 assertions)**:
  - Added Section 4: Out-of-Bounds Slot Safety & Boundary Defense (safe non-throwing execution on negative or oversized slot indices).
  - Added Section 5: Active Deck Fallback Resolution Cascade (gracefully falls back to first valid deck if default slot is cleared).
  - Added Section 6: Tactical Warning Diagnostics (generates pedagogical warnings when monsters < 10 or monsters > 25).
  - Added Section 7: Favorite Flag & Slot Metadata Customization (updates `isFavorite`, custom cover card ID, and title).
- **Deck Synergy & Combo Engine Expansion (`src/domain/deckManagement.ts`, `test-deck-synergy.mjs`, Suite 9: 18/18, +7 assertions)**:
  - Added Acid-Base Neutralization combo detection (`card_comp_hcl` + `card_elem_11_na` or `card_spell_neutralization`).
  - Added Contact Process $SO_2 + O_2 \to SO_3 \to H_2SO_4$ sulfuric acid cascade detection.
  - Added Tollens Silver Mirror ($C_6H_{12}O_6$ / `card_spell_tollens_mirror`) glucose detection.
  - Added Hydrogen Sulfide $Fe + H_2S \to FeS\downarrow$ black corrosion detection.
  - Added Extra Deck $\ge 2$ cards $+5$ synergy score bonus invariant.
  - Added qualitative pedagogical recommendations prompting missing metal reductants and oxidants/acids.
- **Starter Welfare 10-Pack & Deck Governance (`test-starter-welfare-and-deck.mjs`, Suite 17: 37/37, +23 assertions)**:
  - Verified rarity-tiered duplicate shard compensation table: COMMON (15), RARE (40), SUPER_RARE (100), ULTRA_RARE (250), SECRET_RARE (600).
  - Verified deck inspector pedagogical completeness across all 4 card types (Warrior, Compound, Spell, Trap).
  - Verified starter welfare anti-double-claim guardrail (0 vs 500 tokens).
  - Verified deck validation boundaries (empty deck rejection, >60 main deck cards limit, >3 copies Carbon rejection).
- **Native Audio Synthesizer & Mobile Reaction Haptics (`test-sound-resilience.mjs`, Suite 29: 18/18, +7 assertions across 8 test groups)**:
  - Verified all 10 laboratory audio methods (effervescence gentle/vigorous, crystal shatter, Bunsen burner hiss, pouring aqueous/viscous, clouding, pipette suction, stirrer slow/fast).
  - Verified mobile semantic reaction haptic feedback with exact pulse arrays: Combustion `[40, 30, 80]`, Precipitation `[15, 20, 25, 20, 35]`, Acid-Base `[25, 40, 25]`, Effervescence `[10, 15, 10, 15, 10, 15, 20]`, Synthesis `[30, 50, 70]`, Critical `[60, 40, 100, 50, 120]`, and fallback `[35, 25, 35]`.
  - Verified rapid multi-fire concurrency (100 concurrent audio/haptic calls without memory leaks).
- **Multi-Archetype Tournament Simulation & Opening Hand Hypergeometric Consistency (`test-archetype-tournament-sim.mjs`, Suite 31: 29/29, +4 assertions)**:
  - Added Section 7: Opening Hand Playability Entropy simulating 100 5-card opening hands for each of the 4 archetypes (Nitro Legion, Sulfur Forge, Alkali Halogen, Organic Synthesis), guaranteeing $\ge 85\%$ of opening hands contain playable low-level summonable monsters ($\le 5$ stars).
- **Multi-Step Analytical Back-Titration & Yield Engine (`src/domain/chemicalCalculator.ts`, `test-advanced-stoichiometry.mjs`, Suite 39: 44/44, +19 assertions)**:
  - Implemented `calculateBackTitration` with micro-mole precision (6 decimal places):
    - Validated limestone $CaCO_3$ purity assay ($1.25\text{ g}$ sample, $50\text{ mL } 0.50\text{ M HCl}$, back-titrated with $25.0\text{ mL } 0.20\text{ M NaOH}$ -> exactly $80.07\%$ purity).
    - Validated Aspirin tablet active ingredient acetylsalicylic acid ($C_9H_8O_4$) assay ($0.50\text{ g}$ tablet, saponified with $30\text{ mL } 0.20\text{ M NaOH}$, back-titrated with $15.0\text{ mL } 0.10\text{ M HCl}$ -> exactly $81.07\%$ purity).
    - Added safety error handling rejecting impossible back-titrations where calculated excess reagent exceeds initial reagent added.
  - Implemented `calculateReactionYield`:
    - High-yield synthetic rating ($92.0\%$ -> "Tuyệt vời").
    - Equilibrium esterification rating ($65.0\%$ -> "Trung bình").
    - Impure / hydrated over-yield warning ($105.0\%$ -> "Cảnh báo").
    - Rejection of non-positive theoretical mass values.
  - Added Limiting & Excess Reactant Stoichiometry section verifying Haber-Bosch ammonia synthesis with $2.0\text{ mol } N_2$ and $5.0\text{ mol } H_2$.
- **Tutorial Lab Curriculum, Distractor Remediation & Tactical Constants Alignment (`test-tutorial-onboarding.mjs`, Suite 35: 46/46, +30 assertions)**:
  - Implemented State Machine Step Navigation & History Tracking with `viewedSteps` set and completion percentage calculations ($17\% \to 100\%$) and boundary safety.
  - Added comprehensive distractor misconception remediation explanations for all 3 quiz items:
    - Question 1 (Rusting): Clarifies why dry oxygen alone or high temperature alone cannot form hydrated brown rust.
    - Question 2 (Copper trap): Demonstrates standard reduction potential $E^\circ = +0.34\text{ V} > 0\text{ V}$ and why oxidizing acids are required.
    - Question 3 (TCG Stack): Explains LIFO stack vs FIFO queue and why simultaneous trigger bursts cause race conditions.
  - Calibrated tactical constants to match combat engine: Turret True Sight (350), Bush reveal (110), Hydrogen vision (820), Jungle leash reset (420), Boss Catalyst buff (+30% AP).
- **Tactical Card Effects Completion (`test-cards-effects-completion.mjs`, Suite 27: 12/12, +5 tests)**:
  - Added Test 8: `SPELL_EXO_BURST` (deals 900 LP damage with Pyro monster on field, else 450 LP).
  - Added Test 9: `SPELL_AQUA_REGIA_BANISH` (selects highest DEF opponent monster and banishes it).
  - Added Test 10: `SPELL_RADIOACTIVE_BANISH` (nuclear alpha decay banishment to banished zone).
  - Added Test 11: `SPELL_CHROMATOGRAPHY_DRAW` (draws 2 + 1 bonus card on Aero/Gas separation).
  - Added Test 12: `SPELL_AAS_SEARCH` (AAS atomic absorption spectroscopy searches metal monster from deck directly into hand).
- **Analytical Flame Test Spectroscopy & Pyrotechnic Standards (`src/components/visualizations/FlameTestVisualizer.tsx`, `test-flame-test.mjs`, Suite 19: 18/18, +6 assertions)**:
  - Added dedicated assertions for Boron ($B$, Apple Green, #39FF14, 546 nm $BO_2$ radical), Magnesium ($Mg$, Blinding White Light, #FFFFFF, 285.2 nm UV + 3100 K continuous), and Iron ($Fe$, Golden Sparks, #F4A460, 371.9 nm multi-line emission).
  - Enforced Cobalt Glass Filter Exclusivity: Potassium ($K$) strictly requires cobalt glass to block sodium D-line flare, while all other 11 elements do not require cobalt glass.
  - Verified strict 7-character `#RRGGBB` hex codes, secondary accents, and `rgba()` glow values across all 12 elements.
- **Redox Half-Reaction Stoichiometry & Element-Based Retrieval Engine (`src/domain/redoxEngine.ts`, `test-redox-engine.mjs`, Suite 26: 24/24, +12 assertions)**:
  - Implemented `getRedoxReactionsByElement(elementSymbol)` and `getFlagshipRedoxCount()`.
  - Added complete oxidation state checks for the remaining 4 benchmark reactions: `Na_H2O` ($Na^0 \to Na^{+1}$, $H^{+1} \to H^0$), `Al_Fe2O3` (Thermite: $Al^0 \to Al^{+3}$, $Fe^{+3} \to Fe^0$), `MnO2_HCl` ($Mn^{+4} \to Mn^{+2}$, $Cl^{-1} \to Cl^0$), and `Fe_CuSO4` ($Fe^0 \to Fe^{+2}$, $Cu^{+2} \to Cu^0$).
  - Verified Net Electron Conservation Law: $n_{\text{donated}} = n_{\text{accepted}}$ holds across all 12 reactions.
- **Regression, Multi-Cycle Stress & Storage Recovery Expansion (`test-regression-stress.mjs`, Suite 8: 9/9 sections, +4 sections)**:
  - Added Section 5: Corrupted Storage Auto-Healing & Schema Resilience (gracefully heals broken JSON in `elementa_profile_v1` and auto-populates missing nested decks/collections from defaults).
  - Added Section 6: Deck Slot Boundary & Default Slot Preservation Invariants (resets slot 5 to clean state without affecting active default slot; boundary safety on out-of-bounds slot operations).
  - Added Section 7: Extreme Physical Chemistry Boundaries & Float Stability (Van 't Hoff rate ratios at extreme $\Delta T$, catalyst kinetics with zero $\Delta E_a$ and extreme astronomical activation drop).
  - Added Section 8: Rapid Duel Recursive Lifecycle & Graveyard/Banished Zone Integrity (continuous destruction, GY incrementation, and banished zone transfer).
- **Deep Tribute Summoning Invariants & TCG Deck-Out Victory/Defeat (`test-tribute-endurance-deep.mjs`, Suite 33: 15/15, +5 assertions)**:
  - Added Section 4: Level 5 Direct Summon vs Level 6+ Tribute Threshold (validates that Level 5 Fluorine summons directly with Mana, whereas Level 6 Potassium strictly enforces the >5 stars tribute rule).
  - Added Section 5: Tribute to Graveyard Lifecycle & Slot Nullification (verifies that tributed monsters are routed strictly to graveyard with preserved stats, freeing original monster field slots).
  - Added Section 6: Official TCG Deck-Out Victory / Defeat Resolution (immediate defeat when attempting to draw from a 0-card main deck, awarding instant victory to opponent).
- **CA-SRS Spaced Repetition Mastery & Leech Invariance (`src/domain/spacedRepetition.ts`, `src/domain/types.ts`, `test-srs-adaptive.mjs`, Suite 21: 13/13, +5 assertions)**:
  - Added `lapses?: number;` and `isLeech?: boolean;` tracking to `SrsItem` in `src/domain/types.ts`.
  - Implemented `LEECH_THRESHOLD = 4`: items with $\ge 4$ recall lapses are automatically flagged as leeches representing chronic misconceptions requiring remediation.
  - Implemented Leech Rehabilitation Protocol: achieving 3 consecutive correct recalls rehabilitates the item and clears the leech flag.
  - Implemented fine-grained SuperMemo SM-2 quality grading (0: total blackout with lapse, 3: pass with serious effort, 5: perfect recall with +0.1 EF).
  - Implemented half-academic-year interval growth clamping at `MAX_INTERVAL_DAYS = 180` to preserve periodic curriculum recall.
  - Added cohort analytics and forecast functions: `getSrsStatistics`, `getLeechItems`, `getItemsByCognitiveLevel`, `getDueForecast`.
- **3-Layer AI Safety Guardrails & Adversarial Prompt Injection Defense (`src/domain/aiGuardrails.ts`, `test-custom-cards-integration.mjs`, Suite 23: 13/13, +8 assertions)**:
  - Layer 1 Safety Expansion: Sandboxed and filtered hazardous chemical weapons, improvised explosives, and nerve agent keywords (`'chế tạo bom'`, `'vũ khí hóa học'`, `'thuốc nổ tự chế'`, `'chất độc thần kinh'`).
  - Added `isPromptInjectionAttempt` pattern detector identifying adversarial attempts ("ignore previous instructions", "override system prompt", "bỏ qua mọi quy tắc", "gán chỉ số vô hạn").
  - Layer 3 Deterministic Hard-Capping: Verified that adversarial prompt injections attempting stat overflow are defused without crashing, strictly bounding base power to $[10, 120]$ and cooldown to $\ge 8$s.
  - Verified scientific invariance rejection on unphysical noble gas combustion (He burning, 15/100 score), invalid $Cu + \text{dilute } HCl$ trap (20/100 score), and inert gold acid oxidation attempt (25/100 score).
  - Verified batch custom card lifecycle registration, retrieval, and clean restoration without base card corruption.
- **Chemical Environment Tactical Puzzles Expansion (`src/data/puzzlesData.ts`, `test-environment-puzzles.mjs`, Suite 25: 10/10, +3 assertions)**:
  - Added Puzzle 6: Fischer Esterification Equilibrium & Water Scavenging ($CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$, $H_2SO_4$ dehydrating catalyst under Le Chatelier principle).
  - Added Puzzle 7: Marine Sacrificial Anode Cathodic Protection ($Zn/Mg$ sacrificial block vs $Fe$ steel ship hull in seawater via standard reduction potentials $E^\circ$).
  - Added Puzzle 8: Flue Gas Desulfurization FGD Clean Gypsum Synthesis ($SO_2 + CaCO_3 + O_2 + H_2O \to CaSO_4 \cdot 2H_2O$ clean gypsum creation in green metallurgy).
  - Added difficulty partition filtering (`getPuzzlesByDifficulty`) and economic token/shard reward aggregation (`getTotalPossiblePuzzleRewards`).
- **Multi-Element Reaction Field Combos Engine (`src/domain/duelEngine.ts`, `test-element-combat-combos.mjs`, Suite 34: 40/40, +22 assertions)**:
  - Added Combo 5: `HABER_BOSCH_AMMONIA` ($N_2 + 3H_2 \rightleftharpoons 2NH_3$, +150 ATK to all allied monsters, +200 LP).
  - Added Combo 6: `HYDROCARBON_COMBUSTION` ($C + H + O \to CO_2 + H_2O$, 450 LP burn to opponent, +1 Mana).
  - Added Combo 7: `GALVANIC_EMF_VOLTAGE` ($Fe + Cu^{2+} \to Fe^{2+} + Cu$, draws 1 extra card, +150 DEF to all allied monsters).
  - Added Combo 8: `ORGANIC_FISCHER_ESTERIFICATION` ($CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$, +600 LP, +200 ATK to organic/aqua/acid monsters).
  - Verified simultaneous multi-combo triggers ($C + H + O$ triggering both `HYDROCARBON_COMBUSTION` and `WATER_SYNTHESIS` for +2 Mana and 450 burn).
- **MOBA Chemical Reactions Crowd Control & DoT Status Cascade (`src/game/engine/mobaEngine.ts`, `test-moba-teamfight-cascade.mjs`, Suite 30: 39/39, +19 assertions)**:
  - Connected chemical reaction triggers in `applyDirectDamage` directly to status effects:
    - Combustion reactions (`GROUP_E_COMBUSTION`) apply `BURN_OXIDATION` DoT.
    - Precipitation reactions (`GROUP_D_PRECIPITATION_DISPLACEMENT`) apply `SLOW` (35% speed debuff).
    - Acid-Base reactions (`GROUP_C_ACID_BASE`) apply `ACID_CORROSION` DoT.
    - Water reactions (`GROUP_A_WATER`) apply `SLOW` (40% shockwave surge).
  - Verified 0.5s DoT tick decay logic reducing hero HP over time.
- **Extra Deck Organic Ester Synthesis & Link-3 Bastion Summon (`test-extra-deck-cutin-synthesis.mjs`, Suite 41: 36/36, +15 assertions)**:
  - Added Section 9: Advanced Organic Fischer Ester Synthesis (`card_comp_ch3cooc2h5` from `CH3COOH` and `C2H5OH` hybrid hand/field synthesis) with reactant validation and GY movement.
  - Added Section 10: Link-3 Nitrogen Bastion Summon & Triple Link Arrow Invariants (`card_link_3_nitrogen` with Link Rating 3, link arrows `TOP`, `BOTTOM_LEFT`, `BOTTOM_RIGHT`, and Defense position immunity).
- **GDPT 2018 Educator Analytics Tier & Hake Normalized Gain Expansion (`src/domain/educatorAnalytics.ts`, `src/components/TeacherDashboardTab.tsx`, `test-teacher-analytics.mjs`, Suite 36: 127/127, +75 assertions)**:
  - Added `HOA_11_12` (Grade 11 & 12) tier across `GradeLevel`, `GradeFilter`, simulated student cohort (st_06, st_07), and UI dashboard filters.
  - Implemented Hake's normalized learning gain: $g = \frac{\bar{x}_{\text{post}} - \bar{x}_{\text{pre}}}{100 - \bar{x}_{\text{pre}}} = 0.77$ (High Gain Tier $g \ge 0.70$).
  - Added GDPT 2018 misconception traps (Fischer esterification dehydrating catalyst $H_2SO_4$, Javel bleach $NaClO$ formation in undivided diaphragm electrolysis).
  - Expanded Suite 36 to 127 assertions verifying 7 student profiles, 4 grade filters, Hake gain, CSV (8 lines) & JSON exports, and cohort dynamic mutation.
- **Quantum Orbital Magnetism & Spin-Only Moment Engine (`src/domain/orbitalEngine.ts`, `src/components/visualizations/OrbitalBoxDiagram.tsx`, `test-orbital-engine.mjs`, Suite 24: 19/19, +4 assertions)**:
  - Implemented `computeMagneticProperty(unpairedCount)` calculating paramagnetic vs diamagnetic character and the spin-only magnetic moment: $\mu_{\text{spin}} = \sqrt{n(n+2)}\text{ BM}$.
  - Verified diamagnetism ($\mu = 0.00\text{ BM}$) for all noble gases ($He, Ne, Ar, Kr, Xe, Rn$) and full-subshell metals ($Mg, Ca, Zn$).
  - Verified paramagnetism for $H$ ($1.73\text{ BM}$), $C$ ($2.83\text{ BM}$), $N$ ($3.87\text{ BM}$), $O$ ($2.83\text{ BM}$), $Fe$ ($4.90\text{ BM}$), and $Mn$ ($5.92\text{ BM}$).
  - Verified maximum Period 4 spin-only magnetic moment for Chromium ($Cr, Z=24$, $\mu = 6.93\text{ BM}$) due to $3d^5 4s^1$ half-filled subshell stability anomaly.
  - Added Magnetic Character & Spin-Only Moment bar with visual badge and pedagogical description to `OrbitalBoxDiagram.tsx`.
- **GDPT 2018 Recommended Curriculum Tier Placement (`src/domain/curriculumDiagnostic.ts`, `src/components/DailySrsTab.tsx`, `test-curriculum-diagnostic.mjs`, Suite 42: 37/37, +5 assertions)**:
  - Implemented `CurriculumDiagnosticService.recommendStartingTier` calibrating starting placement (KHTN 8, KHTN 9, Hóa 10, Hóa 11-12, or Master) based on grade-level sub-tier scores with pedagogical explanations.
  - Added dynamic Recommended Tier Badge to `DailySrsTab.tsx` diagnostic results view.
  - Verified 5 student proficiency profiles and placement calibration in Suite 42.
- **VSEPR Molecular Geometry & Diatomic Invariants (`src/domain/bondingEngine.ts`, `test-bonding-vsepr.mjs`, Suite 22: 18/18, +3 assertions)**:
  - Diatomic bonding orders ($H_2$ single bond $1\sigma$, $O_2$ double bond $1\sigma + 1\pi$, $N_2$ triple bond $1\sigma + 2\pi$ with $945\text{ kJ/mol}$, $HCl$ polar single bond $\Delta\chi = 0.96$).
  - Verified `BondingEngine.isIonicBondFeasible` across metal-nonmetal pairs and inert noble gas rejection.
  - Gameplay modifier combat buff invariants across all 14 models.
- **Campaign Story Boss Battles & Environmental Hazard Verification (`test-campaign-boss.mjs`, Suite 18: 13/13, +7 assertions)**:
  - Added Stage 3 (Glacies — Nữ Hoàng Băng Vĩnh Cửu) cryogenic environment initialization ($T = 240.0\text{ K}$, $-33.15^\circ\text{C}$).
  - Verified all 5 chapter environmental hazard combat modifiers under `ChemicalEnvironmentEngine`:
    - Stage 1 (Acid Rain, $pH = 2.8$): active metals (Fe, Na, Zn) gain $+300\text{ ATK}$, lose $-200\text{ DEF}$; Acid Dark gains $+250\text{ ATK}$.
    - Stage 2 (Volcano Thermite, $T = 900.0\text{ K}$): Pyro gains $+350\text{ ATK}$; Aqua suffers $-250\text{ DEF}$ vaporization.
    - Stage 3 (Cryogenic Freezing, $T = 240.0\text{ K}$): Aqua gains $+400\text{ DEF}$ ice crystal shield; Pyro suffers $-300\text{ ATK}$ freeze debuff.
    - Stage 4 (Haber Chamber, $P = 200.0\text{ atm}$, Fe catalyst): Aero gains $+250\text{ ATK}$ from gas compression density; Fe catalyst lowers $E_a$ ($+150\text{ ATK}$); Le Chatelier gaseous equilibrium shift for $N_2 + 3H_2 \rightleftharpoons 2NH_3$ ($\Delta n = -2$) shifts FORWARD with $+45\%$ yield multiplier ($1.45\times$).
    - Stage 5 (Buffer Sanctuary, $pH = 7.4$, BICARBONATE_PHYSIO buffer): Henderson-Hasselbalch buffer capacity absorbs $75\%$ of severe acidic ($\Delta pH = -2.0 \to -0.5$) and alkaline ($\Delta pH = +1.6 \to +0.4$) perturbations.
  - Verified all 6 Field Spell Environment cards in `PLAYABLE_CARDS` (`card_field_acid_rain`, `card_field_volcanic_vent`, `card_field_cryogenic_lab`, `card_field_haber_chamber`, `card_field_buffer_solution`, `card_field_alkaline_spring`).
- **Procedural Chemical Laboratory Audio & Semantic Mobile Haptics (`src/audio/soundEngine.ts`, `test-laboratory-audio.mjs`, Suite 40: 40/40, +7 assertions)**:
  - Implemented `triggerReactionHaptic(reactionType)` with specialized mobile haptic vibration pulse sequences:
    - `COMBUSTION`: heavy double pulse `[40, 30, 80]`
    - `PRECIPITATION`: crystal nucleation triplet `[15, 20, 25, 20, 35]`
    - `ACID_BASE`: smooth neutralization quench `[25, 40, 25]`
    - `EFFERVESCENCE`: multi-burst bubble flutter `[10, 15, 10, 15, 10, 15, 20]`
    - `SYNTHESIS`: ascending double thud `[30, 50, 70]`
    - `CRITICAL`: emergency hazard heavy rumble `[60, 40, 100, 50, 120]`
    - Default fallback `[35, 25, 35]`
  - Verified safe headless / SSR execution without window/navigator.
- **GDPT 2018 Chemical Bond Energy ($E_b$) Calculations & Catalog Expansion (`src/domain/thermochemistryEngine.ts`, `src/components/chemistry/ChemicalCalculatorModal.tsx`, `test-kinetics-arrhenius.mjs`, `test-chemistry-calculator.mjs`)**:
  - Expanded `BOND_ENERGIES` database with IUPAC & Vietnam GDPT 2018 standard bond energies: `C-O` (358 kJ), `C=O_carbonyl` (745 kJ), `O-O` (146 kJ), `Br-Br` (193 kJ), `H-Br` (366 kJ), `I-I` (151 kJ), `H-I` (298 kJ), `C-Cl` (328 kJ), `C-Br` (276 kJ), `C-I` (240 kJ), `S-H` (339 kJ), `S=O` (521 kJ).
  - Created `CURRICULUM_BOND_ENTHALPY_REACTIONS` with 8 predefined textbook reactions:
    - Hydrogen chlorination: $H_2 + Cl_2 \to 2HCl$ ($\Delta_r H^\circ = -185.0\text{ kJ}$).
    - Haber-Bosch ammonia synthesis: $N_2 + 3H_2 \to 2NH_3$ ($\Delta_r H^\circ = -93.0\text{ kJ}$).
    - Methane complete combustion: $CH_4 + 2O_2 \to CO_2 + 2H_2O(g)$ ($\Delta_r H^\circ = -818.0\text{ kJ}$).
    - Ethane combustion: $2C_2H_6 + 7O_2 \to 4CO_2 + 6H_2O(g)$ ($\Delta_r H^\circ = -2860.0\text{ kJ}$, -1430.0 kJ/mol).
    - Propane combustion (LPG gas): $C_3H_8 + 5O_2 \to 3CO_2 + 4H_2O(g)$ ($\Delta_r H^\circ = -2042.0\text{ kJ}$).
    - Ethene catalytic hydrogenation: $C_2H_4 + H_2 \to C_2H_6$ ($\Delta_r H^\circ = -123.0\text{ kJ}$).
    - Hydrogen combustion (water vapor): $2H_2 + O_2 \to 2H_2O(g)$ ($\Delta_r H^\circ = -498.0\text{ kJ}$).
    - Hydrogen bromination: $H_2 + Br_2 \to 2HBr$ ($\Delta_r H^\circ = -103.0\text{ kJ}$).
  - Integrated dual calculation method selector in `ChemicalCalculatorModal.tsx`:
    - Method 1: Theo Nhiệt Tạo Thành Chuẩn ($\Delta_f H^\circ_{298}$).
    - Method 2: Theo Năng Lượng Liên Kết ($E_b$ - GDPT 2018) with interactive bond decomposition breakdown, reactant/product bond sums, and pedagogical explanations.
  - Expanded Suite 28 (`test-kinetics-arrhenius.mjs`) to 27/27 assertions (+7 assertions).
  - Expanded Suite 10 (`test-chemistry-calculator.mjs`) to 84/84 assertions (+4 assertions).
- **Canvas 2D Touch & Multi-Resolution Aim Decal Math (`test-canvas-touch-resolution.mjs`)**:
  - Added Section 6, 7, and 8 to Suite 32 (+5 assertions, now **15 / 15**, 100% pass) verifying skill aim vector angle computation ($\theta = \text{atan2}(dy, dx)$) with range clamping, touch client bounding rect offset normalizations, out-of-bounds touch clamping, degenerate $0\times 0$ canvas protection, and primary touch finger isolation from multi-touch/pinch gestures.
- **Extra Deck Synthesis & Laboratory Synthesizer Audio Enhancements (`test-laboratory-audio.mjs`, `test-extra-deck-cutin-synthesis.mjs`)**:
  - Implemented `playPipetteSuction()` ($180\text{ Hz} \to 480\text{ Hz}$ rising fluid column draw + $850\text{ Hz}$ droplet meniscus pinch) and `playMagneticStirrer(speed)` ($140\text{ Hz}$ fast / $90\text{ Hz}$ slow triangle vortex resonance) with full Web Audio node graph connection checks and SSR safety (Suite 40: 33/33 assertions, +9 assertions).
  - Implemented multi-reactant hybrid (1 Field + 2 Hand) synthesis of $H_2O$ with `COMP_H2O_HEAL` (+800 LP), $AgCl$ freeze trigger stun, Thermite meltdown ($Al + Fe_2O_3$) clearing set/defense cards with 600 direct burn, Link rating arithmetic (Link-2 + 1 + 1 = 4), and Defense position immunity on Link monsters (Suite 41: 20/20 assertions, +4 assertions).
- **Elemental Monster Registry Expansion (`src/data/playableCardsData.ts`)**:
  - Registered Silver Element Monster `card_elem_47_ag` (Silver — Bạc, Z=47, Level 5, ATK 1900, DEF 2100) and added it to `MENDELEEV_AI_POOL` to enable silver compound synthesis pathways ($AgCl$, $AgNO_3$).
- **16-Player Single-Elimination Tournament Bracket Engine (`src/domain/tournamentEngine.ts`, `test-tournament-sim.mjs`)**:
  - Implemented `TournamentEngine` featuring 16 canonical IUPAC chemist personas (Mendeleev, Lavoisier, Curie, Dalton, Bohr, Rutherford, Lewis, Arrhenius, Gibbs, Le Chatelier, Nernst, Faraday, Avogadro, Boyle, Pauling, Moseley).
  - Modeled 15-match single-elimination tournament bracket progression (8 R16 $\to$ 4 QF $\to$ 2 SF $\to$ 1 GF) with canonical seeding pairings (1 vs 16, 8 vs 9, 4 vs 13, 5 vs 12, 2 vs 15, 7 vs 10, 3 vs 14, 6 vs 11).
  - Implemented FIDE-compliant zero-sum Elo rating evolution: $E_A = 1/(1+10^{(R_B-R_A)/400})$, strict complementary symmetry ($E_A + E_B = 1.000$), provisional matches K=32 vs established K=16 scaling, and rating floor at 100 MMR.
  - Implemented tie-breaker resolving equal LP by field monster total ATK to eliminate infinite stall loops.
  - Expanded Suite 7 (`test-tournament-sim.mjs`) to 13/13 assertions (+6 assertions).
- **Reaction Sandbox & Organic Stoichiometric Pathways (`src/domain/reactionEngine.ts`, `src/data/reactionsData.ts`, `test-reaction-sandbox.mjs`)**:
  - Added full molecular inventory recipes for organic chemistry under Vietnam GDPT 2018 (Grade 11 & 12):
    - Fischer esterification: $CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$ (`RX_ORG_001`).
    - Tristearin saponification with $NaOH$: $(C_{17}H_{35}COO)_3C_3H_5 + 3NaOH \to 3C_{17}H_{35}COONa + C_3H_5(OH)_3$ (`RX_ORG_003`).
    - Ethyl acetate alkaline saponification: $CH_3COOC_2H_5 + NaOH \to CH_3COONa + C_2H_5OH$ (`RX_ORG_002`).
    - Monosaccharide glucose anaerobic fermentation: $C_6H_{12}O_6 \to 2C_2H_5OH + 2CO_2$ (`RX_ORG_004`).
    - Catalytic alcohol dehydration to ethene: $C_2H_5OH \to C_2H_4 + H_2O$ (`RX_ORG_005`).
    - Tollens silver mirror reduction: $C_6H_{12}O_6 + 2AgNO_3 + 3NH_3 + H_2O \to C_6H_{15}NO_7 + 2Ag\downarrow + 2NH_4NO_3$ (`RX_ORG_006`).
  - Fixed industrial Haber-Bosch synthesis required condition from placeholder `MOISTURE_H2O` to authentic `HIGH_TEMP` ($t^\circ$).
  - Enhanced formula key normalization across all Unicode subscript digits ($₀-₉$) and complex parenthesized formulas.
  - Expanded Suite 20 (`test-reaction-sandbox.mjs`) to 26/26 assertions (+16 assertions).
- **GDPT 2018 Grade 10 Chemical Bond Enthalpy Engine (`src/domain/thermochemistryEngine.ts`, `test-kinetics-arrhenius.mjs`)**:
  - Implemented `calculateEnthalpyFromBondEnergies` using standard textbook bond energies ($E_b$): $\Delta_r H^\circ_{298} = \sum E_b(\text{reactants}) - \sum E_b(\text{products})$.
  - Validated hydrogen chlorination: $H_2 + Cl_2 \to 2HCl$ gives $\Delta_r H^\circ_{298} = -185.0\text{ kJ}$ (exothermic).
  - Validated Haber-Bosch ammonia synthesis: $N_2 + 3H_2 \to 2NH_3$ gives $\Delta_r H^\circ_{298} = -93.0\text{ kJ}$ (exothermic).
  - Expanded Suite 28 (`test-kinetics-arrhenius.mjs`) to 26/26 assertions (+11 assertions).
- **Acid-Base Titration & Analytical Indicator Calibration (`src/domain/chemicalCalculator.ts`, `test-titration-curve.mjs`)**:
  - Implemented weak base by strong acid titration mode (`BASE_BY_ACID`, $NH_3 + HCl$) with $pK_b = 4.75$ and ammonium salt hydrolysis $NH_4^+ + H_2O \rightleftharpoons NH_3 + H_3O^+$.
  - Calibrated exact initial alkaline pH (11.13), buffer half-equivalence ($pH = 14 - pK_b = 9.25$), acidic equivalence point ($pH_{eq} \approx 5.28$), and post-equivalence excess strong acid drop.
  - Added analytical indicators: `Methyl Đỏ (Methyl Red)` (pH 4.4 – 6.2, suitable for $NH_3+HCl$), `Bromothymol Xanh (Bromothymol Blue)` (pH 6.0 – 7.6, suitable for $HCl+NaOH$), and verified strict rejection of `Phenolphthalein` for weak base titration.
  - Expanded Suite 43 to 37/37 assertions (+21 assertions) verifying monotonic decrease ($d(pH)/dV \le 0$) and indicator selectivity.
- **Periodic Trends, 3d-Series & Halogen Oxidizing Hierarchy (`test-periodic-trends-visualizer.mjs`)**:
  - Validated all 3 historical Mendeleev natural isotopic inversions: $Ar$ ($39.95$) > $K$ ($39.10$), $Co$ ($58.93$) > $Ni$ ($58.69$), and $Te$ ($127.60$) > $I$ ($126.90$).
  - Added Section 7 verifying Period 4 transition metal series ($Sc \to Zn$, exactly 10 elements), $Cr$ ($3d^5 4s^1$) and $Cu$ ($3d^{10} 4s^1$) subshell promotional anomalies, and $Zn$ ($3d^{10} 4s^2$) ionization energy bump over $Cu$.
  - Added Section 8 verifying halogen oxidizing power monotonic hierarchy ($F=100 > Cl=70 > Br=63 > I=54 \ge 50$) and noble gas reducing power suppression ($ATK_{red} \le 15$).
  - Expanded Suite 45 to 19/19 assertions (+7 assertions).
- **Canvas 2D Viewport Culling & Multi-tier Graphics Scaling (`src/game/rendering/mobaRenderer.ts`, `src/game/rendering/particleEngine.ts`, `test-graphics-perf.mjs`)**:
  - Implemented `computeViewportBounds`, `isCircleInViewport`, and `isRectInViewport` exports with world-space axis-aligned culling padded by 80px.
  - Applied fast viewport culling across all entity draw passes: bushes, 3D-shaded obstacles, turrets, monsters, minions, heroes, projectiles, chemical AoE zones, and floating combat text.
  - Enhanced `ParticleEngine.draw` to accept viewport bounding box, skipping offscreen particle path rendering.
  - Enhanced PERFORMANCE profile to bypass expensive `ctx.shadowBlur` filters and canvas glow passes for maximum 60 FPS mobile/low-end stability.
  - Expanded `test-graphics-perf.mjs` (+7 assertions, now 14/14) verifying mathematical bounding box scaling under zoom (0.5x, 1.0x, 2.0x), entity culling predicates, 1000-cycle sustained 60Hz bursts with zero pool reallocation invariant, dynamic quality budget transitions, and instant reset recycling.
- **TCG Turn Timer Auto-Pass & Forfeiture Resilience (`src/domain/duelEngine.ts`, `test-duel-engine.mjs`)**:
  - Implemented `autoPassTurn(duelistId)`, `consecutiveTimeouts: Record<string, number>`, and `handleTurnTimeout(duelistId, maxConsecutiveTimeouts)`.
  - Active player 60s timeout automatically transitions phase to END_PHASE and yields turn to opponent.
  - Two consecutive timeouts trigger automatic forfeit via `surrender(duelistId)` declaring opponent victory.
  - Legitimate card actions immediately reset timeout counter to 0 (`resetTimeoutCounter`).
  - Expanded `test-duel-engine.mjs` (+15 assertions, now 105/105) verifying timeout transitions, consecutive timeout forfeit, and counter resets.
- **Electrochemistry & Faraday Engine Expansion (`test-electrochemistry-galvanic.mjs`)**:
  - Added Zinc-Silver Oxide button cell ($E^\circ = 1.56\text{ V}$, $\Delta G^\circ = -301.0\text{ kJ/mol}$).
  - Added Iron-Copper galvanic pipe corrosion ($E^\circ = 0.78\text{ V}$, $\Delta G^\circ = -150.5\text{ kJ/mol}$).
  - Added aqueous $AgNO_3$ electroplating with $HNO_3$ acidification.
  - Added aqueous $NaCl$ without diaphragm producing $NaClO$ Javel bleach with alkaline pH increase.
  - Expanded Suite 44 to 16/16 assertions (+4 assertions).
- **GDPT 2018 Curriculum Diagnostic Assessment Question Bank Expansion (`src/data/curriculumDiagnosticData.ts`, `test-curriculum-diagnostic.mjs`)**:
  - Expanded diagnostic question bank from 16 to 24 standardized multiple-choice assessment items (exactly 6 items per curriculum tier across KHTN 8, KHTN 9, Hóa 10, Hóa 11-12).
  - Added new flagship curriculum topics: physical vs chemical change, percentage of mass calculations in $CaCO_3$, single metal replacement ($Fe + CuSO_4$), hydrocarbon combustion stoichiometry ($CH_4 + 2O_2$), hydrogen bonding anomalous water properties, halogen displacement ($Cl_2 + 2NaBr$), nitrogen oxidation state hierarchy ($-3 \to +5$), and Biuret peptide testing requirements.
  - Added Section 6 to Suite 42 (now 32 assertions, +11 assertions) verifying that all 4 curriculum tiers strictly maintain full Bloom taxonomy coverage (Level 1, 2, 3 in every tier) and remedial CA-SRS flashcard synthesis with embedded pedagogical guidance tips.
- **Unified Save State Backup & Migration Architecture (`src/storage/localStore.ts`, `src/components/SettingsModal.tsx`)**:
  - Defined `GameSaveBundle` schema v2 with timestamping, schema tagging, profile, settings, custom skills, 9 deck slots, and ranked MMR progression.
  - Implemented `GameStorage.exportSaveBundle()` and `GameStorage.importSaveBundle()` with strict JSON parsing validation, future version rejection (version > 2), backward-compatible legacy v1 migration, and atomic error rollback.
  - Wired into `SettingsModal.tsx` replacing fragmented manual localStorage manipulation.
  - Expanded `test-regression-stress.mjs` (+1 assertion, 5/5) verifying schema invariants and error boundaries.
- **Monte Carlo 5v5 Teamfight Simulation & Hero Role Parity (`test-moba-sim.mjs`)**:
  - Added Section 6 to Suite 3 (now 43/43 assertions, +8 assertions).
  - Validated 5v5 team draft role coverage across all 6 core MOBA roles (Tank, Fighter, Mage, Marksman, Assassin, Support).
  - Executed 240-step autonomous 30Hz combat simulation verifying finite non-NaN coordinates, global kill/death conservation, symmetric gold accumulation, and multi-match roster rotation exercising all 12 elemental champions with 0 crashes.
- **MOBA Bot Tactical AI Heuristics (`test-moba.mjs`)**:
  - Added Section 10 to Suite 2 (139/139 assertions) validating low-HP defensive retreat (<28% HP), Challenger Assassin priority target acquisition (dives backline squishies over front tanks), and minion last-hitting optimization (<1.5x AD).
- **VSEPR Geometries & Bond Visualizer (`BondingVisualizerModal.tsx`, `test-bonding-vsepr.mjs`)**:
  - Added SVG geometries and data models for $SO_2$ (Bent 119°), $C_2H_4$ (Planar 120°), and $C_2H_2$ (Linear 180°).
- **High-School Redox Curriculum Expansion (`test-redox-engine.mjs`)**:
  - Added Daniell cell redox displacement ($Zn + CuSO_4$) and ethanol breathalyzer oxidation ($Cr_2O_7^{2-}$).
- **Environmental Shifts & Le Chatelier (`test-environment-engine.mjs`)**:
  - Added Contact process forward shift ($2SO_2 + O_2 \rightleftharpoons 2SO_3$) and $CaCO_3$ calcination reverse shift under pressure.
- **Analytical Flame Test Catalog (`test-flame-test.mjs`)**:
  - Added Rubidium ($Rb$ 780 nm) and Caesium ($Cs$ 455 nm) emission spectra.
- **AI Opponent Custom Deck Architecture (`src/domain/duelEngine.ts`)**:
  - Added optional `opponentCustomDeck?: { mainDeck: string[]; extraDeck?: string[]; name?: string }` parameter to `DuelEngine` constructor.
  - Enables symmetric archetype-vs-archetype AI duels, opening hand initialization, and Extra Deck synthesis support for custom opponents with zero breaking changes to existing signatures.
- **Suite 31 Multi-Archetype Tournament Parity Simulation Expansion (`test-archetype-tournament-sim.mjs`)**:
  - Added Section 6: Automated 6-Pairing Monte Carlo Tournament Parity Audit (now 25/25 assertions, +7 assertions).
  - Validated pairwise matchups among all 4 canonical starter archetypes (Nitro Legion, Sulfur Forge, Alkali Halogen, Organic Synthesis) verifying 16-turn battle completion, non-NaN LP, valid LIFO chain resolutions, and zero crashes.
- **Reaction Sandbox High-School Curriculum Expansion (`src/components/sandbox/ReactionSandboxTab.tsx`, `test-reaction-sandbox.mjs`)**:
  - Added `Zn`, `CuSO4`, and `NaCl` with 4 new curriculum reactions: Daniell galvanic cell displacement ($Zn + CuSO_4 \to ZnSO_4 + Cu$, $E^\circ_{cell} = +1.10\text{ V}$), laboratory $H_2$ preparation ($Zn + 2HCl \to ZnCl_2 + H_2$), halide precipitation test ($AgNO_3 + NaCl \to AgCl\downarrow + NaNO_3$), and iron displacement of copper ($Fe + CuSO_4 \to FeSO_4 + Cu$).
- **AI Tactical Battle Position Intelligence (`src/domain/duelEngine.ts`, `test-duel-engine.mjs`)**:
  - Adept, Expert, and Mendeleev AI duelists now intelligently summon high-DEF or Inert Shield monsters in `FACE_UP_DEFENSE` instead of attack mode, and optimize existing board monster positions dynamically (Suite 13 expanded to 90/90 assertions).
- **Suite 40 Laboratory Procedural Audio Synthesizer (`src/audio/soundEngine.ts`)**:
  - `playEffervescence(intensity)`: High-frequency Poisson pulse stream simulating gas bubbling ($CO_2, H_2$) in aqueous solutions.
  - `playCrystalShatter()`: High-frequency triple harmonic chimes (2150 Hz, 3240 Hz, 4850 Hz) for crystal lattice cleavages.
  - `playBunsenBurnerHiss(durationSec)`: Continuous aerodynamic nozzle noise + low-frequency combustion rumble.
  - `playVolumetricPouring(viscosity)`: Pitch-rising sine and triangle acoustic profiles for decanting liquids.
  - `playPrecipitationClouding()`: Binaural 4 Hz acoustic beat pattern (330 Hz & 334 Hz) for colloidal precipitation.
  - `triggerHaptic(type)`: Safe mobile vibration dispatch with graceful SSR fallbacks.
- **Suite 41 Extra Deck Compound Synthesis & Link Summon Cut-In Overlay (`src/components/duel/TacticalDuelArenaTab.tsx`)**:
  - High-impact animated cut-in overlay displaying radial elemental light bursts, card frame glowing pulse, link rating badges, and pedagogical chemical reaction equations.
  - Fixed optional chaining on `slot?.card?.def?.chemicalFormula` in `src/domain/duelEngine.ts` preventing runtime errors during material verification.
- **Suite 42 GDPT 2018 Diagnostic Assessment & CA-SRS Remedial Seeding (`src/domain/curriculumDiagnostic.ts`, `src/data/curriculumDiagnosticData.ts`)**:
  - 16 verified curriculum diagnostic questions spanning KHTN 8 (conservation of mass, acid-base-salt), KHTN 9 (organic basics, metals), Hóa 10 (electron configuration, periodic trends, bonding), and Hóa 11-12 (equilibrium, kinetics, redox).
  - Diagnostic Placement Test modal integrated into `DailySrsTab.tsx` with instant seeding of remedial flashcards into the SuperMemo CA-SRS queue.
- **Suite 43 Analytical Acid-Base Titration Curve & Indicator Engine (`src/domain/chemicalCalculator.ts`, `src/components/chemistry/ChemicalCalculatorModal.tsx`)**:
  - `calculateTitrationCurve`: Supports strong acid ($HCl$) and weak acid ($CH_3COOH$) titration curves with Henderson-Hasselbalch buffer zone, half-equivalence point ($pH = pK_a$), basic salt hydrolysis ($pH_{eq} \approx 8.72$), and dynamic steep inflection range.
  - Intelligent indicator recommendation: Phenolphthalein vs Methyl Orange with rigorous scientific justification.
  - Interactive "Chuẩn Độ Axit - Bazơ" Tab and Solution Dilution panel in `ChemicalCalculatorModal.tsx`.
- **Suite 44 Standard Reduction Potentials, Galvanic Cells & Faraday Electrolysis Engine (`src/domain/electrochemistryEngine.ts`, `src/components/chemistry/ChemicalCalculatorModal.tsx`)**:
  - Standard Reduction Potential series across 27 couples ($F_2 \to Li$) strictly calibrated vs SHE.
  - Galvanic Cell Simulation (`simulateGalvanicCell`): Calculates standard EMF $E^\circ_{cell} = E^\circ_{cathode} - E^\circ_{anode}$, Nernst non-standard cell potential $E_{cell}$, Gibbs free energy $\Delta G^\circ$, equilibrium constant $K$, cathode (+) reduction vs anode (-) oxidation, and salt bridge ion migration.
  - Faraday Electrolysis Engine (`calculateElectrolysis`): Predicts cathode and anode products, deposited mass ($m = \frac{A \cdot I \cdot t}{n \cdot F}$), liberated gas volume ($V = \frac{I \cdot t}{n \cdot F} \times 24.79\text{ L}$ under GDPT 2018), and solution pH trend across aqueous and molten salt scenarios.
  - Interactive Tab 7 "Pin Điện & Điện Phân" in `ChemicalCalculatorModal.tsx`.
- **Suite 45 Periodic Trends & IUPAC Subshell Anomalies (`src/components/visualizations/PeriodicTrendChart.tsx`, `test-periodic-trends-visualizer.mjs`)**:
  - Full periodic trend visualization overhaul featuring dynamic scope filtering (Period 2, Period 3, Core MVP 28, All 118) and 4 metrics ($I_1$, $\chi$, $M$, $ATK_{red}$).
  - Scientific visual highlights and pedagogical notes for subshell stability anomalies ($Be > B$ and $N > O$ in Period 2; $Mg > Al$ and $P > S$ in Period 3).
  - Validated strict electronegativity monotonicity across Period 2 and 3 ending in Halogens (F: 3.98, Cl: 3.16), and heavy noble gas compound electronegativity ($Kr, Xe, Rn$).
  - Validated Argon vs Potassium natural isotopic weight inversion ($Ar > K$).
- **Quantum Orbital Shell Calculation in `AtomDiagram.tsx` (`src/domain/orbitalEngine.ts`, `src/components/visualizations/AtomDiagram.tsx`)**:
  - Replaced hardcoded Bohr shell capacity heuristics with `getShellElectrons(z, symbol)` computed directly from quantum Aufbau and Madelung configurations for all 118 elements.
  - Supported transition metal and noble metal half-filled and fully-filled $d$-subshell stability anomalies ($Cr, Cu, Nb, Mo, Ru, Rh, Pd, Ag, Pt, Au$).
- **Comprehensive Test Evidence Matrix (`TEST_EVIDENCE.md`)**: Full index of all 45 test suites and 1,181+ assertions.

### Changed
- **Modular Bundle Splitting (`vite.config.ts`)**:
  - Split client bundle into dedicated chunks: `moba-arena` (238.95 kB), `duel-arena` (178.60 kB), `chemistry-compendium-data` (481.39 kB), `vendor-react` (142.93 kB), `vendor-icons` (38.38 kB).
  - Reduced main `index.js` chunk from 1,103.81 kB down to 686.92 kB (158.74 kB gzipped), completely eliminating all Rollup bundle size warnings.
- **Mobile-Native Platform Optimization (`index.html`, `src/index.css`, `tailwind.config.js`)**:
  - Added `viewport-fit=cover`, `theme-color`, `apple-mobile-web-app-status-bar-style`.
  - Added safe area padding utilities (`safe-pt`, `safe-pb`, `safe-pl`, `safe-pr`) and set root container to `min-h-[100dvh]`.
  - Prevented 300ms tap delay via `touch-action: manipulation`.
  - Disabled annoying iOS Safari auto-zoom on inputs by ensuring input text font size is 16px minimum on touch devices (`@media (pointer: coarse)`).
  - Eliminated translucent tap highlight flash via `-webkit-tap-highlight-color: transparent`.
  - Enabled `future: { hoverOnlyWhenSupported: true }` in Tailwind to eliminate sticky hover states on mobile touchscreens.
  - Wrapped duel arena boards in responsive horizontal-scroll views (`min-w-[520px]`) preventing squished cards or clipped buttons on small screens.
- **Deck Management & Inspector**: Single-click card inspection, separated [+ Thêm] and [Chi tiết] buttons, root-level modal preventing 60 FPS CSS transform hover flicker.
- **Welfare Economy**: 10 Free Booster Pack claim banner (50 cards) with 100% token discount and automatic shard conversion for duplicates beyond 3 copies.
- **Build Optimization**: Vite chunk splitting for `vendor-react`, `vendor-icons`, and `chemistry-compendium-data`, ensuring fast startup and optimal mobile caching.

### Fixed
- **Safe Zone Allocation in Link Summoning**: Ensured freed monster zones are correctly reoccupied by newly summoned Link monsters without leaving orphaned references.
- **Weak Acid Hydrolysis Equivalence**: Corrected equivalence pH formula using $K_b = K_w / K_a$ to guarantee scientifically accurate $pH \approx 8.72$ at 25°C.
