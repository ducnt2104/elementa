# ELEMENTA — Game Design Document (GDD)
**Project:** ELEMENTA — Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** GDD-v2.0  
**Generated Date:** 2026-10-21  

---

## 1. High Concept & Core Pillars

### 1.1. Core Identity
ELEMENTA merges the deep strategic card combat inspired by *Yu-Gi-Oh!* with real-time chemical reaction dynamics and an elemental MOBA battlefield. Players do not just cast magic; they command the fundamental laws of nature, balancing redox reactions, managing thermodynamic enthalpy, shifting chemical equilibria, and synthesizing molecular compounds.

### 1.2. The Three Pillars
1. **Academic Authenticity Without Friction:** Every equation, valence state, and reaction condition is scientifically accurate, yet seamless and rewarding in gameplay.
2. **Deep Strategic Duels:** Tactical resource governance, multi-cost draws (Life Point, Tribute, Graveyard Banish), quick-play spell chains, and strict 9-slot deck customizability.
3. **Dynamic Chemical Battlefields:** From top-down MOBA lanes with elemental minion waves to turn-based duels where environmental \(pH\), temperature, and pressure drastically reshape card stats.

---

## 2. Core Game Modes

### 2.1. Tactical Duel Arena (Turn-Based TCG)
- **Turn Phases:** Draw Phase \(\rightarrow\) Standby Phase \(\rightarrow\) Main Phase 1 \(\rightarrow\) Battle Phase \(\rightarrow\) Main Phase 2 \(\rightarrow\) End Phase.
- **Turn Timer:** Default 60 seconds per turn to maintain rapid, engaging decision-making.
- **Field Layout:**
  - 5 Monster Zones.
  - 5 Spell & Trap Zones.
  - 1 Field Environment Zone.
  - 1 Extra Deck Zone (Compounds & Link Monsters).
  - 1 Graveyard (GY) Zone.
  - 1 Banished ("Consumed Matter") Zone.
- **Victory Condition:** Reduce opponent's Life Points (starting at 8,000) to 0, or deplete their main deck.

### 2.2. Elemental MOBA Arena (Real-Time Tactical Combat)
- **Battlefield:** 3 Lanes (Top, Mid, Bot), defensive towers, minion spawners, and core reactors.
- **Champion Roster:** 12 elemental champions across Tank, Mage, Marksman, and Fighter classes:
  - *Sodium (Na):* Explosive burst initiator; high damage on water contact.
  - *Chlorine (Cl):* Toxic corrosive mage; persistent area-of-effect damage.
  - *Iron (Fe):* Multivalent paladin tank; swaps between Fe²⁺ defensive armor and Fe³⁺ aggressive stance.
  - *Copper (Cu):* High-speed electro-marksman.
  - *Aluminum (Al):* Passivated frontline fighter.
  - *Oxygen (O) & Hydrogen (H):* Synergy duos creating rapid water heals and steam explosions.
- **AI Tiers:** Novice, Standard, Advanced, Challenger.

### 2.3. The Laboratory (Crafting Workshop & Gacha Shop)
- **Crafting Workshop:** Experiment with element combinations. Discover valid chemical compounds to forge new playable cards.
- **Thematic Booster Shop:** Alkali-Halogen Core, Nitro Legion, Sulfur Forge, and Noble Gas Aegis.
- **Starter Welfare:** Free 10-Pack booster pull granting 50 cards at 0 token cost to kickstart deck customization.

---

## 3. Player Progression & Economy
- **Ranked Ladder:** 6 competitive tiers (Bronze, Silver, Gold, Platinum, Diamond, Grand Master) with dynamic MMR adjustments and win-streak bonuses.
- **Curriculum Quests:** Daily, weekly, and educational quests (e.g., "Achieve Haber-Bosch Equilibrium", "Deploy 3 Redox Reactions") granting XP, Tokens, and Element Shards.
- **Deck Manager:** 9 persistent deck slots with full import/export, duplication, reset, and validation against the 3-copy limit and 30-60 card boundaries.
