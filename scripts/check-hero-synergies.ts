// scripts/check-hero-synergies.ts
import { defaultReactionEngine } from '../src/domain/reactionEngine';

const heroes = ['Na', 'Fe', 'Cl', 'Cu', 'Al', 'O', 'H', 'Ba', 'C', 'S', 'Ca', 'N'];
console.log('=== VERIFYING HERO COMBINATIONS UNDER MOBA COMBAT CONDITIONS (OXYGEN_GAS + HIGH_TEMP) ===');

let directMatches = 0;
let totalPairs = 0;

for (let i = 0; i < heroes.length; i++) {
  for (let j = i + 1; j < heroes.length; j++) {
    const h1 = heroes[i];
    const h2 = heroes[j];
    totalPairs++;

    // MOBA combat condition
    const res = defaultReactionEngine.evaluateCombination([h1, h2], ['OXYGEN_GAS', 'HIGH_TEMP']);
    if (res.matchedRule) {
      const r = res.matchedRule;
      const bothReactants = r.reactants.includes(h1) && r.reactants.includes(h2);
      if (bothReactants) {
        directMatches++;
        console.log(`[BINARY SYNERGY] [${h1} + ${h2}] -> ${r.name_vi} | ${r.equation}`);
      } else {
        console.log(`[SOLO/FALLBACK] [${h1} + ${h2}] -> ${r.name_vi} (${r.equation})`);
      }
    } else {
      console.log(`[NO REACTION] [${h1} + ${h2}]`);
    }
  }
}

console.log(`\nBinary hero combination matches: ${directMatches} / ${totalPairs}`);
