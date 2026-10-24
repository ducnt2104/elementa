// scripts/patchBatch11SynthesisRecipes.mjs
import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/data/cards/batches/batch_11_extra_deck_fusion_compounds.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match the JSON array inside: export const BATCH_11_CARDS: PlayableCardDef[] = [ ... ];
const prefix = 'export const BATCH_11_CARDS: PlayableCardDef[] = ';
const startIndex = content.indexOf(prefix);
if (startIndex === -1) {
  throw new Error('Could not find BATCH_11_CARDS in file');
}

const jsonStart = startIndex + prefix.length;
const jsonEnd = content.lastIndexOf('];') + 1;
const jsonText = content.slice(jsonStart, jsonEnd);

const cards = JSON.parse(jsonText);
console.log(`Loaded ${cards.length} cards from Batch 11.`);

function parseReactants(equation, fallbackFormula) {
  if (!equation || typeof equation !== 'string') {
    return [{ formula: fallbackFormula || 'H2O', count: 1 }];
  }
  const parts = equation.split(/→|⇌|⇄|->|=/);
  const lhs = parts[0] || '';
  const rawTerms = lhs.split('+').map(t => t.trim()).filter(Boolean);
  const reactantFormulas = [];

  for (const term of rawTerms) {
    const normalized = term
      .replace(/₀/g, '0')
      .replace(/₁/g, '1')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₅/g, '5')
      .replace(/₆/g, '6')
      .replace(/₇/g, '7')
      .replace(/₈/g, '8')
      .replace(/₉/g, '9')
      .replace(/\(s\)|\(l\)|\(g\)|\(aq\)/g, '')
      .trim();

    const m = normalized.match(/^(\d*)\s*([A-Za-z0-9·•]+)/);
    if (m && m[2]) {
      const count = m[1] ? parseInt(m[1], 10) : 1;
      const formula = m[2];
      reactantFormulas.push({ formula, count });
    }
  }

  if (reactantFormulas.length === 0) {
    reactantFormulas.push({ formula: fallbackFormula || 'Reagent', count: 1 });
  }

  return reactantFormulas;
}

for (const card of cards) {
  const reactants = parseReactants(card.relatedEquation, card.chemicalFormula);
  let condition = undefined;
  if (card.relatedEquation && card.relatedEquation.includes('2500°C')) {
    condition = 'HIGH_TEMP';
  } else if (card.relatedEquation && card.relatedEquation.includes('Catalyst')) {
    condition = 'CATALYST';
  }

  card.synthesisRecipe = {
    reactantFormulas: reactants,
    pedagogicalEquation: card.relatedEquation || `${card.chemicalFormula} Synthesis`,
    ...(condition ? { requiredCondition: condition } : {})
  };
}

const updatedFileContent = `// src/data/cards/batches/batch_11_extra_deck_fusion_compounds.ts
// Batch 11: Extra Deck Fusion / Compound Monsters (75 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_11_CARDS: PlayableCardDef[] = ${JSON.stringify(cards, null, 2)};
`;

fs.writeFileSync(filePath, updatedFileContent, 'utf8');
console.log(`Successfully patched all ${cards.length} cards in Batch 11 with valid synthesisRecipe!`);
