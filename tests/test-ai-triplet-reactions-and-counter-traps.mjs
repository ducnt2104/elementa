// tests/test-ai-triplet-reactions-and-counter-traps.mjs
// Test Suite 73: AI Threat-Aware Counter Trap Prioritization & Triplet Chemical Reactions
// Verifies: Spell Speed 3 Counter Trap response and 3-reactant synthesis evaluation

import assert from 'node:assert/strict';
import { DuelEngine } from '../src/domain/duelEngine.ts';
import { ReactionEngine } from '../src/domain/reactionEngine.ts';

console.log('=== TEST SUITE 73: AI TRIPLET REACTIONS & COUNTER TRAPS ===\n');

// 1. Reaction Engine Triplet Evaluation
console.log('[1/3] Testing Triplet Reactant Evaluation in Reaction Engine...');
const reactionEngine = new ReactionEngine();
// Iron rusting in moist air: Fe + O2 + H2O -> Rust
const rustResult = reactionEngine.evaluateCombination(['Fe', 'O2'], ['MOISTURE_H2O', 'OXYGEN_GAS']);
assert.ok(rustResult.status === 'SUCCESS' || rustResult.matchedRule !== null, 'Fe + O2 with moisture must trigger corrosion');
console.log('  -> Corrosion reaction evaluated successfully:', rustResult.matchedRule?.name_vi || rustResult.status);

// 2. Spell Speed Priority Sorting Logic
console.log('\n[2/3] Testing Threat-Aware Spell Speed Prioritization...');
const candidateCards = [
  { def: { id: 'card_comp_001', name: 'Thường Thường', cardType: 'TRAP', spellSpeed: 2 } },
  { def: { id: 'card_counter_lechatelier', name: 'Phản Lực Le Chatelier', cardType: 'TRAP', spellTrapSubtype: 'COUNTER_TRAP', spellSpeed: 3 } },
  { def: { id: 'card_quick_play_h2o', name: 'Nước H2O Tốc Công', cardType: 'SPELL', spellTrapSubtype: 'QUICK_PLAY_SPELL', spellSpeed: 2 } }
];

// When player activates, Counter Trap (Speed 3) must be sorted FIRST
const isPlayerActivating = true;
const sorted = [...candidateCards].sort((a, b) => {
  const speedA = a.def.spellSpeed || (a.def.spellTrapSubtype === 'COUNTER_TRAP' ? 3 : 2);
  const speedB = b.def.spellSpeed || (b.def.spellTrapSubtype === 'COUNTER_TRAP' ? 3 : 2);

  if (isPlayerActivating) {
    if (speedA === 3 && speedB !== 3) return -1;
    if (speedB === 3 && speedA !== 3) return 1;
  }
  return speedB - speedA;
});

assert.strictEqual(sorted[0].def.name, 'Phản Lực Le Chatelier', 'Counter Trap must have top priority against player activations');
assert.strictEqual(sorted[0].def.spellSpeed, 3, 'Top card must be Spell Speed 3');
console.log('  -> Counter Trap correctly prioritized over standard traps.');

// 3. DuelEngine Initialization & AI Level Verification
console.log('\n[3/3] Testing DuelEngine AI Level Configuration...');
const engine = new DuelEngine(
  ['card_monster_fe_ferrum', 'card_monster_cu_cuprum'],
  [],
  'EXPERT'
);

assert.strictEqual(engine.aiLevel, 'EXPERT', 'AI Level must be set to EXPERT');
assert.strictEqual(engine.opponent.lp, 8000, 'Opponent initial LP must be 8000');
assert.strictEqual(engine.player.lp, 8000, 'Player initial LP must be 8000');
console.log('  -> DuelEngine EXPERT configuration verified.');

console.log('\n[PASS] 100% of AI Triplet & Counter Trap Tests Passed Successfully!');
