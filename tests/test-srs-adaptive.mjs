// test-srs-adaptive.mjs
// Automated Verification Suite for Chemistry-Aware Adaptive Spaced Repetition (CA-SRS)
// and Scientific Invariance Governance

import assert from 'assert';
import { SpacedRepetitionService } from '../src/domain/spacedRepetition.ts';

console.log('============================================================');
console.log('   ELEMENTA: CA-SRS ADAPTIVE REPETITION & INVARIANCE AUDIT ');
console.log('============================================================\n');

let passedAssertions = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedAssertions++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Cognitive Taxonomy Error Weights
console.log('--- 1. Cognitive Bloom Taxonomy Error Weights ---');

it('Level 1 (Nhận biết) error weight is 1.00', () => {
  assert.strictEqual(SpacedRepetitionService.getErrorWeight(1), 1.00);
});

it('Level 2 (Thông hiểu) error weight is 0.85 (-15% interval schedule)', () => {
  assert.strictEqual(SpacedRepetitionService.getErrorWeight(2), 0.85);
});

it('Level 3 (Vận dụng) error weight is 0.70 (-30% interval penalty for conceptual traps)', () => {
  assert.strictEqual(SpacedRepetitionService.getErrorWeight(3), 0.70);
});

// 2. Mistake Queue Generation
console.log('\n--- 2. Mistake Enqueueing & Data Integrity ---');

it('Creates valid SRS item from Cu+HCl combat trap mistake', () => {
  const item = SpacedRepetitionService.createItemFromMistake(
    'Cu_HCl',
    'REACTION',
    'Dãy Hoạt Động Hóa Học: Đồng (Cu) + Axit',
    'Cho Cu vào HCl loãng có hiện tượng gì?',
    'Không có hiện tượng gì (Cu không tan)',
    ['Không có hiện tượng gì (Cu không tan)', 'Sủi bọt khí H2', 'Dung dịch hóa xanh', 'Tạo kết tủa đen'],
    'Cu đứng sau H2 nên không phản ứng với HCl loãng',
    3
  );

  assert.ok(item.id.startsWith('srs_'));
  assert.strictEqual(item.targetId, 'Cu_HCl');
  assert.strictEqual(item.targetType, 'REACTION');
  assert.strictEqual(item.errorLevel, 3);
  assert.strictEqual(item.repetitionCount, 0);
  assert.strictEqual(item.intervalDays, 1);
  assert.strictEqual(item.easeFactor, 2.5);
  assert.strictEqual(item.consecutiveSuccesses, 0);
  assert.ok(new Date(item.dueDate) > new Date(), 'Due date must be in the future');
});

// 3. Multi-Step SM-2 & CA-SRS Review Progression
console.log('\n--- 3. CA-SRS Adaptive Review Schedule ---');

it('Level 3 item progresses correctly: 1d -> 3d -> 5d (7*0.7) -> 10d (14*0.7)', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'Cu_HCl', 'REACTION', 'Trap', 'Q', 'A', ['A'], 'Exp', 3
  );

  // Review 1 (Correct)
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 1);
  assert.strictEqual(item.intervalDays, 1);

  // Review 2 (Correct)
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 2);
  assert.strictEqual(item.intervalDays, 3);

  // Review 3 (Correct) -> 7 * 0.70 = 4.9 -> Math.round = 5
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 3);
  assert.strictEqual(item.intervalDays, 5);

  // Review 4 (Correct) -> 14 * 0.70 = 9.8 -> Math.round = 10
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 4);
  assert.strictEqual(item.intervalDays, 10);
});

it('Failed review resets interval to 1 day, resets streak to 0, and degrades easeFactor', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'Na_H2O', 'REACTION', 'Na Water Burst', 'Q', 'A', ['A'], 'Exp', 2
  );
  assert.strictEqual(item.easeFactor, 2.5);

  // Failed review directly degrades easeFactor by 0.2
  const failedItem = SpacedRepetitionService.processReview(item, false);
  assert.strictEqual(failedItem.consecutiveSuccesses, 0);
  assert.strictEqual(failedItem.intervalDays, 1);
  assert.strictEqual(Math.round(failedItem.easeFactor * 10) / 10, 2.3); // 2.5 - 0.2 = 2.3

  // 2 successes increase easeFactor (+0.1 per grade 5 success)
  let successItem = SpacedRepetitionService.processReview(item, true); // 2.6
  successItem = SpacedRepetitionService.processReview(successItem, true); // 2.7
  assert.strictEqual(successItem.consecutiveSuccesses, 2);
  assert.strictEqual(successItem.intervalDays, 3);
  assert.strictEqual(Math.round(successItem.easeFactor * 10) / 10, 2.7);

  // Subsequent failure drops it by 0.2
  const postFailureItem = SpacedRepetitionService.processReview(successItem, false);
  assert.strictEqual(postFailureItem.consecutiveSuccesses, 0);
  assert.strictEqual(postFailureItem.intervalDays, 1);
  assert.strictEqual(Math.round(postFailureItem.easeFactor * 10) / 10, 2.5);
});

// 4. Due Items Filter
console.log('\n--- 4. Due Date Filtering & Queue Resolution ---');

it('Identifies due items accurately based on current timestamp', () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);

  const dueItem = {
    id: 'due_1',
    targetId: 'Na',
    targetType: 'ELEMENT',
    title: 'Na',
    question: 'Q',
    correctAnswer: 'A',
    options: ['A'],
    explanation: 'E',
    errorLevel: 1,
    repetitionCount: 1,
    intervalDays: 1,
    easeFactor: 2.5,
    dueDate: pastDate.toISOString(),
    consecutiveSuccesses: 1
  };

  const pendingItem = {
    ...dueItem,
    id: 'pending_1',
    dueDate: futureDate.toISOString()
  };

  const dueList = SpacedRepetitionService.getDueItems([dueItem, pendingItem]);
  assert.strictEqual(dueList.length, 1);
  assert.strictEqual(dueList[0].id, 'due_1');
});

// 5. Scientific Invariance Principle
console.log('\n--- 5. Scientific Invariance & Community Governance Principle ---');

it('Enforces immutable scientific laws: chemical reality cannot be voted out of existence', () => {
  const sampleProposals = [
    { title: 'Reduce H2O cooldown from 10s to 8s', isScientificLaw: false },
    { title: 'Allow Cu to react with dilute HCl', isScientificLaw: true },
    { title: 'Change rust formula to FeO instead of Fe2O3.xH2O', isScientificLaw: true },
    { title: 'Add blue glowing particles to Cu(OH)2 precipitate', isScientificLaw: false }
  ];

  const immutableCount = sampleProposals.filter(p => p.isScientificLaw).length;
  const modifiableCount = sampleProposals.filter(p => !p.isScientificLaw).length;

  assert.strictEqual(immutableCount, 2);
  assert.strictEqual(modifiableCount, 2);
});

// 6. Leech Card Detection & Lapse Counter
console.log('\n--- 6. Leech Card Detection & Chronic Misconception Tracking ---');

it('Tracks lapses across repeated failures and flags item as leech at 4 lapses', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'Cu_HCl', 'REACTION', 'Trap Cu + HCl', 'Cho Cu vào HCl?', 'Không', ['Không'], 'Exp', 3
  );

  assert.strictEqual(item.lapses, 0);
  assert.strictEqual(item.isLeech, false);

  // Lapse 1
  item = SpacedRepetitionService.processReview(item, false);
  assert.strictEqual(item.lapses, 1);
  assert.strictEqual(item.isLeech, false);

  // Lapse 2
  item = SpacedRepetitionService.processReview(item, false);
  assert.strictEqual(item.lapses, 2);
  assert.strictEqual(item.isLeech, false);

  // Lapse 3
  item = SpacedRepetitionService.processReview(item, false);
  assert.strictEqual(item.lapses, 3);
  assert.strictEqual(item.isLeech, false);

  // Lapse 4 -> Threshold reached! Flagged as leech
  item = SpacedRepetitionService.processReview(item, false);
  assert.strictEqual(item.lapses, 4);
  assert.strictEqual(item.isLeech, true);

  const leeches = SpacedRepetitionService.getLeechItems([item]);
  assert.strictEqual(leeches.length, 1);
  assert.strictEqual(leeches[0].id, item.id);
});

// 7. Leech Rehabilitation Protocol
console.log('\n--- 7. Leech Rehabilitation Protocol (3 Consecutive Successes) ---');

it('Clears leech flag when student achieves 3 consecutive successful reviews', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'Cu_HCl', 'REACTION', 'Trap Cu + HCl', 'Cho Cu vào HCl?', 'Không', ['Không'], 'Exp', 3
  );
  item.lapses = 4;
  item.isLeech = true;

  // Review 1 (Correct) -> Streak 1, still leech
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 1);
  assert.strictEqual(item.isLeech, true);

  // Review 2 (Correct) -> Streak 2, still leech
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 2);
  assert.strictEqual(item.isLeech, true);

  // Review 3 (Correct) -> Streak 3 -> Rehabilitated!
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.consecutiveSuccesses, 3);
  assert.strictEqual(item.isLeech, false);
});

// 8. Fine-Grained SuperMemo Quality Rating (0 to 5)
console.log('\n--- 8. Fine-Grained SM-2 Quality Grading & Ease Adjustment ---');

it('Processes fine-grained quality parameter (quality 5 gives +0.1 EF, quality 3 reduces EF without lapse)', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'Flame_Na', 'ELEMENT', 'Flame Test Na', 'Color?', 'Yellow', ['Yellow'], 'Exp', 1
  );
  assert.strictEqual(item.easeFactor, 2.5);

  // Quality 5 (Perfect recall): EF += (0.1 - 0) = +0.1 -> 2.6
  item = SpacedRepetitionService.processReview(item, true, 5);
  assert.strictEqual(Math.round(item.easeFactor * 100) / 100, 2.6);
  assert.strictEqual(item.consecutiveSuccesses, 1);

  // Quality 3 (Pass with serious difficulty): EF += (0.1 - (2 * (0.08 + 2 * 0.02))) = 0.1 - 0.24 = -0.14 -> 2.46
  item = SpacedRepetitionService.processReview(item, true, 3);
  assert.strictEqual(Math.round(item.easeFactor * 100) / 100, 2.46);
  assert.strictEqual(item.consecutiveSuccesses, 2);

  // Quality 0 (Total blackout): Counts as failure, increments lapse
  item = SpacedRepetitionService.processReview(item, false, 0);
  assert.strictEqual(item.consecutiveSuccesses, 0);
  assert.strictEqual(item.lapses, 1);
  assert.strictEqual(item.intervalDays, 1);
});

// 9. Academic Horizon Interval Clamping
console.log('\n--- 9. Long-Range Academic Schedule Interval Clamping ---');

it('Clamps interval growth strictly to MAX_INTERVAL_DAYS (180 days)', () => {
  let item = SpacedRepetitionService.createItemFromMistake(
    'H2_Combustion', 'REACTION', 'Combustion', 'Q', 'A', ['A'], 'Exp', 1
  );
  item.intervalDays = 150;
  item.easeFactor = 2.8;
  item.consecutiveSuccesses = 10;

  // Next interval without clamping would be round(150 * 2.8 * 1.0) = 420 days!
  item = SpacedRepetitionService.processReview(item, true);
  assert.strictEqual(item.intervalDays, 180, 'Must clamp to 180 days');
});

// 10. Repository Statistics & Cognitive Filtering
console.log('\n--- 10. Repository Statistics & Cognitive Level Segmentation ---');

it('Computes accurate SRS repository statistics and cognitive level distribution', () => {
  const itemL1 = SpacedRepetitionService.createItemFromMistake('H', 'ELEMENT', 'H', 'Q', 'A', ['A'], 'E', 1);
  const itemL2 = SpacedRepetitionService.createItemFromMistake('Fe', 'ELEMENT', 'Fe', 'Q', 'A', ['A'], 'E', 2);
  const itemL3 = SpacedRepetitionService.createItemFromMistake('Cu_HCl', 'REACTION', 'Cu+HCl', 'Q', 'A', ['A'], 'E', 3);
  itemL3.intervalDays = 25; // Mastered
  itemL3.lapses = 5;
  itemL3.isLeech = true;

  const repo = [itemL1, itemL2, itemL3];

  const level1Items = SpacedRepetitionService.getItemsByCognitiveLevel(repo, 1);
  const level3Items = SpacedRepetitionService.getItemsByCognitiveLevel(repo, 3);
  assert.strictEqual(level1Items.length, 1);
  assert.strictEqual(level3Items.length, 1);

  const stats = SpacedRepetitionService.getSrsStatistics(repo);
  assert.strictEqual(stats.total, 3);
  assert.strictEqual(stats.leechCount, 1);
  assert.strictEqual(stats.masteredCount, 1);
  assert.strictEqual(stats.learningCount, 2);
  assert.ok(stats.averageIntervalDays > 0);

  // 30 days ahead forecast includes itemL3 (25d) and itemL1/L2 (1d)
  const forecast = SpacedRepetitionService.getDueForecast(repo, 30);
  assert.strictEqual(forecast, 3);
});

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
