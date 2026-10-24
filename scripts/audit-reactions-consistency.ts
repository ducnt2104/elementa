// scripts/audit-reactions-consistency.ts
import { REACTION_RULES_DATABASE } from '../src/data/reactionsData';
import { parseFormulaAtoms } from '../src/domain/equationBalancer';

console.log('=== AUDITING 318 REACTIONS FOR REACTANT INTEGRITY ===');

interface Inconsistency {
  id: string;
  name_vi: string;
  equation: string;
  reactants: string[];
  expectedReactants: string[];
  issue: string;
}

const inconsistencies: Inconsistency[] = [];

for (const rule of REACTION_RULES_DATABASE) {
  if (rule.isTrap) continue; // Traps might have custom checks

  // Extract reactants from equation before -> or ⇌
  const eq = rule.equation.replace(/⇌|⇄|<->|<=>/g, '->');
  const [leftSide] = eq.split(/->|→/);
  if (!leftSide) continue;

  // Find all elements appearing on the left side
  const elementRegex = /\b([A-Z][a-z]?)\b/g;
  const leftElements = new Set<string>();
  
  // Clean states like (s), (l), (g), (aq)
  const cleanLeft = leftSide.replace(/\([a-z0-9]+\)/g, '');
  let match;
  while ((match = elementRegex.exec(cleanLeft)) !== null) {
    const sym = match[1];
    if (sym && sym !== 'O' && sym !== 'H') { // ignore O and H if they come from H2O/O2 conditions
      leftElements.add(sym);
    }
  }

  // Check if any reactant in rule.reactants is NOT on the left side
  for (const r of rule.reactants) {
    if (!leftSide.includes(r)) {
      inconsistencies.push({
        id: rule.id,
        name_vi: rule.name_vi,
        equation: rule.equation,
        reactants: rule.reactants,
        expectedReactants: Array.from(leftElements),
        issue: `Reactant '${r}' not found on reactant side of equation!`
      });
    }
  }
}

console.log(`Found ${inconsistencies.length} reactant inconsistencies!`);
inconsistencies.forEach((inc, idx) => {
  console.log(`[${idx + 1}] ${inc.id} (${inc.name_vi}): ${inc.issue}`);
  console.log(`    Equation: ${inc.equation}`);
  console.log(`    Current reactants: [${inc.reactants.join(', ')}]`);
  console.log(`    Expected elements: [${inc.expectedReactants.join(', ')}]`);
});
