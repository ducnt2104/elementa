// scripts/find-incomplete-sys-reactants.ts
import { REACTION_RULES_DATABASE } from '../src/data/reactionsData';

console.log('=== FINDING SINGLE-REACTANT RULES THAT INVOLVE 2 ELEMENTS ===');

const found: any[] = [];
for (const rule of REACTION_RULES_DATABASE) {
  if (rule.reactants.length === 1) {
    const eq = rule.equation.replace(/⇌|⇄|<->|<=>/g, '->');
    const [left] = eq.split(/->|→/);
    if (!left) continue;
    
    // Check if left side contains '+' indicating two reactants
    if (left.includes('+')) {
      found.push({
        id: rule.id,
        name: rule.name_vi,
        reactants: rule.reactants,
        equation: rule.equation
      });
    }
  }
}

console.log(`Found ${found.length} rules with 1 reactant but equation has '+':`);
found.forEach((f, idx) => {
  console.log(`[${idx + 1}] ${f.id} (${f.name}): current=[${f.reactants.join(', ')}] | eq: ${f.equation}`);
});
