# ELEMENTA TCG Card Effects, Special Summons & Reaction Engine Audit

**Standard:** GDPT 2018 (Vietnam Ministry of Education & Training) & IUPAC Gold Book  
**Engine:** Deterministic Chemical State Machine (DCSM) + ReactionEngine  
**Status:** 100% Verified & Fully Implemented

---

## 1. Summon Mechanics Separation Audit

| Summon Mechanism | Method Name | Rulebook Constraint | Engine Enforcement |
| :--- | :--- | :--- | :--- |
| **Normal Summon** | `normalSummon(...)` | Exactly 1 per turn during Main Phase 1 or 2 | Decrements `normalSummonsRemaining` from 1 to 0; subsequent calls in the same turn are strictly rejected. |
| **Special Summon (Hand)** | `specialSummonFromHand(...)` | Unlimited (per effects / activation costs) | Does NOT check or consume `normalSummonsRemaining`. Can be performed after normal summon is spent. |
| **Special Summon (Graveyard)** | `specialSummonFromGraveyard(...)` | Monster must have been properly summoned first if it has special requirements (`wasProperlySummoned`) | Enforces revival eligibility; moves card from graveyard to empty monster zone; triggers `ON_SUMMON` hooks. |
| **Special Summon (Deck)** | `specialSummonFromDeck(...)` | Recruitment / Tutor summon directly to field | Removes target card from deck, places into monster zone, and executes Fisher-Yates deck shuffle automatically. |
| **Search (Deck to Hand)** | `searchDeckToHand(...)` | Card extraction / Tutor retrieval | Removes target card from deck to hand, triggers shuffle, verifies deck conservation. |
| **Mill (Deck to GY)** | `millDeckToGraveyard(...)` | Deck depletion / Grave setup | Moves top $N$ cards directly from deck to graveyard with combat log records. |

---

## 2. Battlefield Chemical Reaction Verification

The interactive reaction engine evaluates active on-field and in-hand elements using IUPAC balanced stoichiometry under dynamic environmental conditions:

$$\text{Reactants} \xrightarrow[\text{Solvent, } \text{pH}]{\text{Temperature, Catalysts}} \text{Products} + \Delta H$$

### Evaluated Reaction Test Cases:
1. **Alkali Metal Exothermic Hydrolysis ($2\text{Na} + 2\text{H}_2\text{O}$):**
   - **Environment:** `solvent: 'WATER'` ($\text{MOISTURE\_H2O}$ condition).
   - **Reaction:** $2\text{Na}(\text{s}) + 2\text{H}_2\text{O}(\text{l}) \to 2\text{NaOH}(\text{aq}) + \text{H}_2(\text{g})\uparrow$.
   - **Combat Result:** Direct LP damage dealt ($850\text{ LP}$), combat logs recorded, opponent LP decremented.
2. **Cognitive Trap Prevention ($\text{Cu} + \text{HCl}(\text{aq})$):**
   - **Misconception:** Metal + Acid produces Salt + Hydrogen.
   - **Scientific Reality:** Copper is less active than Hydrogen ($E^\circ(\text{Cu}^{2+}/\text{Cu}) = +0.34\text{ V} > 0.00\text{ V}$).
   - **Engine Status:** `TRAP_TRIGGERED`. Zero damage dealt, pedagogical error explanation emitted, mana penalty applied to player.
3. **Acid-Base Neutralization ($\text{HCl} + \text{NaOH}$):**
   - **Reaction:** $\text{HCl}(\text{aq}) + \text{NaOH}(\text{aq}) \to \text{NaCl}(\text{aq}) + \text{H}_2\text{O}(\text{l})$.
   - **Condition:** $\text{ACID\_DILUTE} + \text{BASE\_ALKALINE}$.

---

## 3. Elemental Shards Progression Economy

- **Decoupled Currencies:**
  - **Knowledge Tokens:** Earned via games & quests $\to$ used for Booster Packs.
  - **Elemental Shards:** Earned via duplicate disenchanting (>3 copies) $\to$ used for targeted crafting.
- **Rarity Ratios:**

| Rarity | Craft Cost | Recycle Yield | Disenchant Rate |
| :--- | :---: | :---: | :---: |
| Common | 60 | 15 | 25% |
| Rare | 160 | 40 | 25% |
| Super Rare | 400 | 100 | 25% |
| Ultra Rare | 1,000 | 250 | 25% |
| Secret Rare | 2,400 | 600 | 25% |

- **Transaction Audit:** All shard operations generate an atomic transaction entry in `profile.auditTransactions` with types `CARD_CRAFT` or `CARD_RECYCLE`.
