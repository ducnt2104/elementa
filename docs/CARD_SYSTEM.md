# ELEMENTA — Card System & Tactical TCG Rules Specification
**Project:** ELEMENTA — Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** CARD-SYSTEM-v2.0  
**Generated Date:** 2026-10-21  

---

## 1. Card Classification & Archetypes

### 1.1. Card Types
1. **Element Monster (`ELEMENT_MONSTER`):** Standard elemental combatants representing single elements (e.g. \(Na, Cl, Fe, Cu, Au\)). Levels 1 to 4 require Normal Summon; Levels 5+ require Tributes.
2. **Compound Monster (`COMPOUND_MONSTER`):** Synthesized boss monsters residing in the Extra Deck or Main Deck, summoned via stoichiometric combination of reactants (e.g. \(H_2O, NaCl, Fe_2O_3, HNO_3, H_2SO_4\)).
3. **Link Monster (`LINK_MONSTER`):** Valence-bond monsters residing in the Extra Deck. Link Rating (1-4) corresponds to covalent bond multiplicity. Link monsters have no DEF stat and cannot be shifted to Defense position.
4. **Reaction Spell (`REACTION_SPELL`):** Fast or continuous chemical interventions:
   - *Normal Spell (Speed 1):* Can only be activated during your Main Phase.
   - *Quick-Play Spell (Speed 2):* Can be activated in response to an action or during the opponent's turn.
5. **Trap Card (`TRAP`):** Tactical reactions placed face-down on the field:
   - Must be set for at least 1 turn before activation.
   - Triggered automatically on specific battle conditions (e.g. attack declaration, direct damage).
6. **Field Environment (`FIELD_ENVIRONMENT`):** Persistent battle arena cards modifying environmental \(pH\), temperature, and pressure.

---

## 2. Duel Turn Phase Structure & Timer

Every turn has a strict 60-second limit and follows the Yu-Gi-Oh! 6-phase turn machine:
1. **Draw Phase:** Current player draws 1 card from Main Deck (bypassed on Turn 1 for the first player).
2. **Standby Phase:** Recurring environmental effects (e.g. Acid Rain damage, Cryogenic mana freeze) resolve.
3. **Main Phase 1:**
   - Normal Summon / Set 1 monster (subject to tribute rules).
   - Activate Spells or set Traps.
   - Perform Compound Synthesis or Link Summons.
   - Change monster battle positions (Attack \(\leftrightarrow\) Defense).
4. **Battle Phase:**
   - Declare attacks (Monster-to-Monster or Direct Attack if opponent's field is clear).
   - Damage step calculations with ATK vs ATK / ATK vs DEF.
5. **Main Phase 2:**
   - Set additional spells/traps, perform remaining special summons.
6. **End Phase:** Turn passes to opponent; temporary attack boosts expire.

---

## 3. Advanced Mechanics

### 3.1. Custom Tribute Star-Sum Rule
To summon high-level boss monsters (e.g. Level 7 *Ostwald Emperor — HNO₃*):
- The player must sacrifice monsters whose star levels sum to **\(\ge 7\)**.
- **Strict Limitation:** No single sacrifice may have a star level \(\ge 7\). You cannot sacrifice a Level 7 monster to summon another Level 7 monster.

### 3.2. Last-In First-Out (LIFO) Chain Stack
When a player activates a card or effect, an opponent can chain a Quick-Play Spell (Speed 2) or Trap (Speed 2). The chain resolves backwards (last activated resolves first), allowing tactical counter-plays (e.g. neutralizing an acid blast before it deals damage).

### 3.3. Multi-Cost Strategic Draw Engine
- **Life Point Draw:** Pay 1,000 LP to draw 2 cards (Mana cost 0).
- **Tribute Draw:** Sacrifice 1 monster from field to graveyard to draw 2 cards.
- **Graveyard Consume Draw:** Banish 2 monsters from graveyard to draw 2 cards.

### 3.4. Strict Banished Zone vs Graveyard Separation
- Graveyard (GY): Recyclable via redox reactions.
- Banished Zone: Permanently dissipated matter ("Chết Hơn Chết"). Reviving cards from the graveyard can never target banished cards.
