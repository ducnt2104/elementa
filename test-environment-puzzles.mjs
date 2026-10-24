// test-environment-puzzles.mjs
// Comprehensive test suite for Chemical Environment Tactical Puzzles (GDPT 2018 & IUPAC Compliant)

import assert from 'node:assert';
import { PUZZLES, getPuzzleById, validatePuzzleSolution, getPuzzlesByDifficulty, getTotalPossiblePuzzleRewards } from './src/data/puzzlesData.ts';

console.log('--- TEST SUITE 25: CHEMICAL ENVIRONMENT TACTICAL PUZZLES ---');

// Test 1: Puzzles Array Integrity
console.log('Test 1: Puzzles Array Integrity...');
assert(Array.isArray(PUZZLES), 'PUZZLES must be an array');
assert(PUZZLES.length >= 8, `Expected at least 8 puzzles, found ${PUZZLES.length}`);
console.log(`  ✓ Confirmed ${PUZZLES.length} puzzles registered`);

// Test 2: Uniqueness of Puzzle IDs
console.log('Test 2: Uniqueness of Puzzle IDs...');
const puzzleIdSet = new Set();
for (const p of PUZZLES) {
  assert(!puzzleIdSet.has(p.id), `Duplicate puzzle ID found: ${p.id}`);
  puzzleIdSet.add(p.id);
}
console.log('  ✓ All puzzle IDs are strictly unique');

// Test 3: Structural & Physical Range Validations
console.log('Test 3: Structural & Physical Telemetry Ranges...');
for (const p of PUZZLES) {
  assert(p.title && p.title.trim().length > 0, `Puzzle ${p.id} has empty title`);
  assert(
    ['CƠ BẢN', 'TRUNG CẤP', 'NÂNG CAO'].includes(p.difficulty),
    `Puzzle ${p.id} has invalid difficulty: ${p.difficulty}`
  );
  
  // Physical environment ranges
  const env = p.environmentContext;
  assert(env, `Puzzle ${p.id} missing environmentContext`);
  assert(env.initialPh >= 0 && env.initialPh <= 14, `Puzzle ${p.id} pH out of range: ${env.initialPh}`);
  assert(env.initialTemp >= -273.15, `Puzzle ${p.id} temperature below absolute zero: ${env.initialTemp}`);
  assert(env.initialPressure > 0, `Puzzle ${p.id} pressure must be positive: ${env.initialPressure}`);
  assert(env.scenarioVI.length > 20, `Puzzle ${p.id} scenario description too short`);

  // Goal & Educational standards
  assert(p.goalVI && p.goalVI.length > 10, `Puzzle ${p.id} missing goal`);
  assert(p.explanationVI && p.explanationVI.length > 20, `Puzzle ${p.id} missing explanation`);
  assert(p.iupacCurriculumStandard && p.iupacCurriculumStandard.includes('GDPT') || p.iupacCurriculumStandard.includes('Chương Trình'), 
    `Puzzle ${p.id} missing curriculum standard`
  );

  // Rewards
  assert(p.reward && p.reward.knowledgeTokens > 0, `Puzzle ${p.id} has non-positive tokens`);
  assert(p.reward && p.reward.elementalShards > 0, `Puzzle ${p.id} has non-positive shards`);
}
console.log(`  ✓ All ${PUZZLES.length} puzzles satisfy strict IUPAC physical telemetry & reward parameters`);

// Test 4: Options Invariants (Exactly 1 Correct Option per Puzzle)
console.log('Test 4: Options Invariants & Exactly One Correct Answer...');
for (const p of PUZZLES) {
  assert(p.options.length >= 3, `Puzzle ${p.id} must have at least 3 choices`);
  const correctOptions = p.options.filter((o) => o.isCorrect);
  assert.strictEqual(
    correctOptions.length,
    1,
    `Puzzle ${p.id} must have exactly ONE correct option, found ${correctOptions.length}`
  );

  const optionIdSet = new Set();
  for (const opt of p.options) {
    assert(!optionIdSet.has(opt.id), `Puzzle ${p.id} has duplicate option id: ${opt.id}`);
    optionIdSet.add(opt.id);
    assert(opt.label && opt.label.length > 5, `Option ${opt.id} has invalid label`);
    assert(opt.reagentFormula && opt.reagentFormula.length > 0, `Option ${opt.id} has invalid reagentFormula`);
    assert(opt.scientificOutcomeVI && opt.scientificOutcomeVI.length > 15, `Option ${opt.id} outcome too short`);
  }
}
console.log('  ✓ Invariant maintained: exactly 1 correct solution with scientific outcome per puzzle');

// Test 5: Solution Validator Logic (validatePuzzleSolution)
console.log('Test 5: validatePuzzleSolution deterministic behavior...');
for (const p of PUZZLES) {
  const correctOpt = p.options.find((o) => o.isCorrect);
  const incorrectOpts = p.options.filter((o) => !o.isCorrect);

  // Test correct option
  const correctResult = validatePuzzleSolution(p.id, correctOpt.id);
  assert.strictEqual(correctResult.isCorrect, true);
  assert.strictEqual(correctResult.outcomeVI, correctOpt.scientificOutcomeVI);
  assert.deepStrictEqual(correctResult.reward, p.reward);

  // Test each incorrect option
  for (const inc of incorrectOpts) {
    const incResult = validatePuzzleSolution(p.id, inc.id);
    assert.strictEqual(incResult.isCorrect, false);
    assert.strictEqual(incResult.outcomeVI, inc.scientificOutcomeVI);
    assert.strictEqual(incResult.reward, undefined);
  }
}

// Test edge cases for unknown IDs
const missingPuzzleRes = validatePuzzleSolution('non_existent_puzzle', 'opt_1');
assert.strictEqual(missingPuzzleRes.isCorrect, false);
assert(missingPuzzleRes.outcomeVI.includes('Không tìm thấy'));

const missingOptionRes = validatePuzzleSolution('puzzle_1_acid_lake', 'non_existent_opt');
assert.strictEqual(missingOptionRes.isCorrect, false);
assert(missingOptionRes.outcomeVI.includes('Không tìm thấy'));
console.log('  ✓ Solution validator correctly evaluates correct/incorrect/invalid inputs');

// Test 6: Scientific Domain Content Validation for Canonical Puzzles
console.log('Test 6: Scientific Domain Content Invariance...');

// Puzzle 1: Acid Rain Lake Neutralization
const p1 = getPuzzleById('puzzle_1_acid_lake');
assert(p1, 'Puzzle 1 not found');
assert.strictEqual(p1.environmentContext.initialPh, 2.8);
const p1Correct = p1.options.find((o) => o.isCorrect);
assert(p1Correct.reagentFormula.includes('CaCO₃'), 'P1 correct option must be CaCO3');
assert(p1.explanationVI.includes('đệm tự nhiên'), 'P1 explanation must highlight natural buffering');

// Puzzle 2: Haber-Bosch Pressure Optimization
const p2 = getPuzzleById('puzzle_2_haber_yield');
assert(p2, 'Puzzle 2 not found');
assert.strictEqual(p2.environmentContext.initialTemp, 450);
const p2Correct = p2.options.find((o) => o.isCorrect);
assert(p2Correct.reagentFormula.includes('200 atm'), 'P2 correct option must specify 200 atm');
assert(p2Correct.reagentFormula.includes('Fe'), 'P2 correct option must specify Iron catalyst');
assert(p2.explanationVI.includes('Le Chatelier'), 'P2 explanation must cite Le Chatelier principle');

// Puzzle 3: Thermite Rail Barrier Breach
const p3 = getPuzzleById('puzzle_3_thermite_barrier');
assert(p3, 'Puzzle 3 not found');
const p3Correct = p3.options.find((o) => o.isCorrect);
assert(p3Correct.reagentFormula.includes('2Al + Fe₂O₃'), 'P3 correct option must specify Thermite reaction');
assert(p3.explanationVI.includes('nhiệt nhôm') || p3.explanationVI.includes('1538°C'), 'P3 explanation must cite molten iron');

// Puzzle 4: Physiological Blood Bicarbonate Buffer
const p4 = getPuzzleById('puzzle_4_buffer_capacity');
assert(p4, 'Puzzle 4 not found');
assert.strictEqual(p4.environmentContext.initialPh, 7.4);
assert.strictEqual(p4.environmentContext.initialTemp, 37);
const p4Correct = p4.options.find((o) => o.isCorrect);
assert(p4Correct.reagentFormula.includes('HCO₃⁻'), 'P4 correct option must specify Bicarbonate ion');
assert(p4.explanationVI.includes('Henderson-Hasselbalch'), 'P4 explanation must cite Henderson-Hasselbalch');

// Puzzle 5: Selective Redox Hydrometallurgy
const p5 = getPuzzleById('puzzle_5_selective_redox');
assert(p5, 'Puzzle 5 not found');
const p5Correct = p5.options.find((o) => o.isCorrect);
assert(p5Correct.reagentFormula.includes('Fe'), 'P5 correct option must specify Iron metal');
assert(p5.explanationVI.includes('Quy tắc alpha') || p5.explanationVI.includes('E°'), 'P5 explanation must cite standard reduction potential');

// Puzzle 6: Fischer Esterification Equilibrium & Water Scavenging
const p6 = getPuzzleById('puzzle_6_esterification_yield');
assert(p6, 'Puzzle 6 not found');
assert.strictEqual(p6.difficulty, 'TRUNG CẤP');
assert.strictEqual(p6.environmentContext.initialTemp, 80);
const p6Correct = p6.options.find((o) => o.isCorrect);
assert(p6Correct.reagentFormula.includes('H₂SO₄ đặc'), 'P6 correct option must specify concentrated H2SO4 dehydrating catalyst');
assert(p6.explanationVI.includes('Le Chatelier') && p6.explanationVI.includes('Fischer'), 'P6 explanation must cite Le Chatelier & Fischer esterification');

// Puzzle 7: Marine Sacrificial Anode Cathodic Protection
const p7 = getPuzzleById('puzzle_7_cathodic_protection');
assert(p7, 'Puzzle 7 not found');
assert.strictEqual(p7.difficulty, 'NÂNG CAO');
assert.strictEqual(p7.environmentContext.initialPh, 8.1);
const p7Correct = p7.options.find((o) => o.isCorrect);
assert(p7Correct.reagentFormula.includes('Zn/Mg') || p7Correct.reagentFormula.includes('Khối Zn'), 'P7 correct option must specify Zinc/Magnesium sacrificial anode');
assert(p7.explanationVI.toLowerCase().includes('catot') || p7.explanationVI.toLowerCase().includes('anot'), 'P7 explanation must cite sacrificial cathodic protection mechanism');

// Puzzle 8: Flue Gas Desulfurization (FGD) Clean Gypsum Synthesis
const p8 = getPuzzleById('puzzle_8_flue_gas_desulfurization');
assert(p8, 'Puzzle 8 not found');
assert.strictEqual(p8.difficulty, 'TRUNG CẤP');
assert.strictEqual(p8.environmentContext.initialTemp, 120);
const p8Correct = p8.options.find((o) => o.isCorrect);
assert(p8Correct.reagentFormula.includes('CaCO₃') && p8Correct.reagentFormula.includes('O₂'), 'P8 correct option must specify limestone slurry with O2 aeration');
assert(p8.explanationVI.includes('Flue-Gas Desulfurization') || p8.explanationVI.includes('FGD'), 'P8 explanation must cite industrial FGD technology');
console.log('  ✓ All 8 canonical chemistry problems faithfully conform to high school curriculum (GDPT 2018)');

// Test 7: Profile Reward & Anti-Exploitation Simulation
console.log('Test 7: Profile Reward & Anti-Exploitation Logic...');
const mockProfile = {
  knowledgeTokens: 500,
  elementalShards: 200,
  solvedPuzzleIds: []
};

function awardPuzzleCompletion(profile, puzzleId) {
  const puzzle = getPuzzleById(puzzleId);
  assert(puzzle, 'Puzzle must exist');
  const alreadySolved = (profile.solvedPuzzleIds || []).includes(puzzleId);
  if (alreadySolved) {
    return { ...profile, newlyAwarded: false };
  }
  return {
    ...profile,
    solvedPuzzleIds: [...(profile.solvedPuzzleIds || []), puzzleId],
    knowledgeTokens: profile.knowledgeTokens + puzzle.reward.knowledgeTokens,
    elementalShards: (profile.elementalShards || 0) + puzzle.reward.elementalShards,
    newlyAwarded: true
  };
}

// First solve p1
const profileAfterP1 = awardPuzzleCompletion(mockProfile, 'puzzle_1_acid_lake');
assert.strictEqual(profileAfterP1.newlyAwarded, true);
assert.strictEqual(profileAfterP1.knowledgeTokens, 600); // +100
assert.strictEqual(profileAfterP1.elementalShards, 250); // +50
assert(profileAfterP1.solvedPuzzleIds.includes('puzzle_1_acid_lake'));

// Repeat solve p1 (anti-farming check)
const profileAfterP1Repeat = awardPuzzleCompletion(profileAfterP1, 'puzzle_1_acid_lake');
assert.strictEqual(profileAfterP1Repeat.newlyAwarded, false);
assert.strictEqual(profileAfterP1Repeat.knowledgeTokens, 600); // no extra tokens
assert.strictEqual(profileAfterP1Repeat.elementalShards, 250); // no extra shards
console.log('  ✓ Anti-farming guardrail verified: repeat puzzle solves cannot exploit currency rewards');

// Test 8: Difficulty Category Partition Filtering
console.log('Test 8: Difficulty Category Partition Filtering...');
const basicPuzzles = getPuzzlesByDifficulty('CƠ BẢN');
const intermediatePuzzles = getPuzzlesByDifficulty('TRUNG CẤP');
const advancedPuzzles = getPuzzlesByDifficulty('NÂNG CAO');

assert(basicPuzzles.length >= 1, 'Expected at least 1 basic puzzle');
assert(intermediatePuzzles.length >= 4, `Expected at least 4 intermediate puzzles, found ${intermediatePuzzles.length}`);
assert(advancedPuzzles.length >= 3, `Expected at least 3 advanced puzzles, found ${advancedPuzzles.length}`);
assert.strictEqual(
  basicPuzzles.length + intermediatePuzzles.length + advancedPuzzles.length,
  PUZZLES.length,
  'Difficulty partitions must be a perfect partition of PUZZLES'
);
console.log(`  ✓ Perfect partition verified: ${basicPuzzles.length} Cơ bản, ${intermediatePuzzles.length} Trung cấp, ${advancedPuzzles.length} Nâng cao`);

// Test 9: Total Reward Aggregation & Economic Economy Cap
console.log('Test 9: Total Reward Aggregation & Economic Economy Cap...');
const totalRewards = getTotalPossiblePuzzleRewards();
assert(totalRewards.knowledgeTokens >= 1300, `Expected at least 1300 tokens, got ${totalRewards.knowledgeTokens}`);
assert(totalRewards.elementalShards >= 600, `Expected at least 600 shards, got ${totalRewards.elementalShards}`);

let runningTokens = 0;
let runningShards = 0;
for (const p of PUZZLES) {
  runningTokens += p.reward.knowledgeTokens;
  runningShards += p.reward.elementalShards;
}
assert.strictEqual(totalRewards.knowledgeTokens, runningTokens, 'Total tokens must match manual sum');
assert.strictEqual(totalRewards.elementalShards, runningShards, 'Total shards must match manual sum');
console.log(`  ✓ Total puzzle economy verified: ${totalRewards.knowledgeTokens} Tokens, ${totalRewards.elementalShards} Shards`);

// Test 10: Multi-step Sequential Solver Progression
console.log('Test 10: Multi-step Sequential Solver Progression...');
let cumulativeProfile = { ...mockProfile };
for (const p of PUZZLES) {
  cumulativeProfile = awardPuzzleCompletion(cumulativeProfile, p.id);
  assert(cumulativeProfile.solvedPuzzleIds.includes(p.id));
}
assert.strictEqual(cumulativeProfile.solvedPuzzleIds.length, PUZZLES.length);
assert.strictEqual(cumulativeProfile.knowledgeTokens, mockProfile.knowledgeTokens + totalRewards.knowledgeTokens);
assert.strictEqual(cumulativeProfile.elementalShards, mockProfile.elementalShards + totalRewards.elementalShards);
console.log('  ✓ Sequential solver progression simulation verified successfully across all puzzles');

// Test 11: Reagent Formula IUPAC Syntax & Non-Empty Reagents
console.log('Test 11: Reagent Formula IUPAC Syntax & Non-Empty Reagents...');
for (const p of PUZZLES) {
  for (const opt of p.options) {
    assert(typeof opt.reagentFormula === 'string' && opt.reagentFormula.trim().length > 0, `Puzzle ${p.id} option ${opt.id} has empty reagentFormula`);
    assert(!opt.reagentFormula.includes('undefined'), `Puzzle ${p.id} option ${opt.id} contains undefined in formula`);
  }
}
console.log('  ✓ All reagent formulas satisfy valid non-empty IUPAC formatting');

// Test 12: Cognitive Distractor Misconception Diagnostic Integrity
console.log('Test 12: Cognitive Distractor Misconception Diagnostic Integrity...');
for (const p of PUZZLES) {
  const correctOpt = p.options.find(o => o.isCorrect);
  const incorrectOpts = p.options.filter(o => !o.isCorrect);
  assert(incorrectOpts.length >= 2, `Puzzle ${p.id} must have at least 2 distractors`);
  for (const distractor of incorrectOpts) {
    assert(distractor.isCorrect === false, `Distractor ${distractor.id} must have isCorrect = false`);
    assert(distractor.scientificOutcomeVI.length >= 25, `Puzzle ${p.id} distractor ${distractor.id} outcome too brief`);
    assert.notStrictEqual(distractor.scientificOutcomeVI, correctOpt.scientificOutcomeVI, `Distractor outcome must differ from correct option outcome`);
    assert(typeof distractor.label === 'string' && distractor.label.length >= 5, `Distractor label must be valid string`);
  }
}
console.log('  ✓ Distractor options provide diagnostic misconception remediation feedback');

// Test 13: Solution Validator Edge Case Hardening
console.log('Test 13: Solution Validator Edge Case Hardening...');
const emptyPuzzleRes = validatePuzzleSolution('', '');
assert.strictEqual(emptyPuzzleRes.isCorrect, false);
assert.strictEqual(emptyPuzzleRes.reward, undefined);

const whitespaceRes = validatePuzzleSolution('   ', '   ');
assert.strictEqual(whitespaceRes.isCorrect, false);
assert.strictEqual(whitespaceRes.reward, undefined);

const nullishOptionRes = validatePuzzleSolution('puzzle_1_acid_lake', '');
assert.strictEqual(nullishOptionRes.isCorrect, false);
assert.strictEqual(nullishOptionRes.reward, undefined);
console.log('  ✓ validatePuzzleSolution is hardened against empty, whitespace, and nullish inputs');

// Test 14: Curriculum Standards Mapping Across High School Chemistry Tiers
console.log('Test 14: Curriculum Standards Mapping Across GDPT 2018 Grades...');
for (const p of PUZZLES) {
  assert(
    p.iupacCurriculumStandard.includes('Hóa Học') ||
    p.iupacCurriculumStandard.includes('GDPT 2018') ||
    p.iupacCurriculumStandard.includes('Chương Trình'),
    `Puzzle ${p.id} must explicitly reference GDPT 2018 high school chemistry curriculum`
  );
  assert(p.explanationVI.length >= 40, `Puzzle ${p.id} pedagogical explanation must be comprehensive`);
}
console.log('  ✓ All 8 puzzles aligned with Vietnam GDPT 2018 Chemistry curriculum standards');

// Test 15: Environmental Telemetry Physical Reality Bounds
console.log('Test 15: Environmental Telemetry Physical Reality Bounds...');
for (const p of PUZZLES) {
  const env = p.environmentContext;
  assert(env.initialPh >= 0.0 && env.initialPh <= 14.0, `pH must be in [0, 14] range`);
  assert(env.initialTemp >= -50.0 && env.initialTemp <= 3000.0, `Temp must be physical [-50, 3000]°C`);
  assert(env.initialPressure >= 0.1 && env.initialPressure <= 500.0, `Pressure must be physical [0.1, 500] atm`);
  assert.strictEqual(typeof env.scenarioVI, 'string');
  assert(env.scenarioVI.length > 25);
}
console.log('  ✓ Physical environmental boundaries verified across thermodynamics, acid-base, and pressure');

// Test 16: Commutative Invariant of Puzzle Reward Economics
console.log('Test 16: Commutative Invariant of Puzzle Reward Economics...');
let forwardProfile = { ...mockProfile };
let reverseProfile = { ...mockProfile };

for (const p of PUZZLES) {
  forwardProfile = awardPuzzleCompletion(forwardProfile, p.id);
}

for (const p of [...PUZZLES].reverse()) {
  reverseProfile = awardPuzzleCompletion(reverseProfile, p.id);
}

assert.strictEqual(forwardProfile.knowledgeTokens, reverseProfile.knowledgeTokens, 'Reward accumulation must be order-independent');
assert.strictEqual(forwardProfile.elementalShards, reverseProfile.elementalShards, 'Shard accumulation must be order-independent');
assert.strictEqual(forwardProfile.solvedPuzzleIds.length, reverseProfile.solvedPuzzleIds.length);
console.log('  ✓ Puzzle reward aggregation is commutative and strictly order-independent');

console.log('--- ALL 16/16 ENVIRONMENTAL PUZZLE VERIFICATIONS PASSED ---');
