// test-curriculum-diagnostic.mjs
// Comprehensive test suite for GDPT 2018 Chemistry Diagnostic Assessment & CA-SRS Seeding Engine (Suite 42)

import assert from 'node:assert';
import { DIAGNOSTIC_QUESTION_BANK } from '../src/data/curriculumDiagnosticData.ts';
import { CurriculumDiagnosticService } from '../src/domain/curriculumDiagnostic.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 42: GDPT 2018 CURRICULUM DIAGNOSTIC & CA-SRS     ');
console.log('======================================================================\n');

// ---------------------------------------------------------------------------
// 1. Question Bank Integrity & Scientific Accuracy
// ---------------------------------------------------------------------------
console.log('--- 1. Diagnostic Question Bank Integrity & GDPT 2018 Standards ---');

assert(Array.isArray(DIAGNOSTIC_QUESTION_BANK), 'DIAGNOSTIC_QUESTION_BANK must be an array');
assert(DIAGNOSTIC_QUESTION_BANK.length >= 16, `Must have at least 16 diagnostic questions (got ${DIAGNOSTIC_QUESTION_BANK.length})`);

const gradesPresent = new Set(DIAGNOSTIC_QUESTION_BANK.map(q => q.grade));
assert(gradesPresent.has('KHTN_8'), 'Must include Grade 8 (KHTN 8) questions');
assert(gradesPresent.has('KHTN_9'), 'Must include Grade 9 (KHTN 9) questions');
assert(gradesPresent.has('HOA_10'), 'Must include Grade 10 (Hóa học 10) questions');
assert(gradesPresent.has('HOA_11_12'), 'Must include Grade 11-12 (Hóa học 11-12) questions');
console.log(`  ✓ PASS: Question bank covers all 4 curriculum tiers across ${DIAGNOSTIC_QUESTION_BANK.length} items`);

// Validate individual question schema
const seenIds = new Set();
for (const q of DIAGNOSTIC_QUESTION_BANK) {
  assert(!seenIds.has(q.id), `Question ID must be unique: duplicate ${q.id}`);
  seenIds.add(q.id);

  assert(q.question.length > 15, `Question text for ${q.id} must be descriptive`);
  assert(q.explanationVI.length > 20, `Pedagogical explanation for ${q.id} must be comprehensive`);
  assert(q.pedagogicalTipVI.length > 5, `Pedagogical tip for ${q.id} must be provided`);
  assert(q.options.length === 4, `Question ${q.id} must have exactly 4 multiple choice options`);
  
  // Options must be unique
  const uniqueOptions = new Set(q.options);
  assert(uniqueOptions.size === 4, `Options for ${q.id} must all be distinct`);

  // Correct answer must strictly exist in options
  assert(q.options.includes(q.correctAnswer), `Correct answer for ${q.id} must be one of the 4 options`);

  // Bloom cognitive level must be 1, 2, or 3
  assert([1, 2, 3].includes(q.errorLevel), `Error level for ${q.id} must be 1, 2, or 3 (got ${q.errorLevel})`);
  assert(typeof q.targetSymbolOrReaction === 'string' && q.targetSymbolOrReaction.length > 0, `Target symbol/reaction required for ${q.id}`);
}
console.log('  ✓ PASS: All questions pass strict validation: unique options, verified correct answers, Bloom taxonomy tags');

// ---------------------------------------------------------------------------
// 2. Adaptive Session Generation & Filtering
// ---------------------------------------------------------------------------
console.log('\n--- 2. Adaptive Diagnostic Session Generation ---');

// General session
const generalSession = CurriculumDiagnosticService.generateDiagnosticSession('ALL', 6);
assert(generalSession.length === 6, `General session should generate 6 questions (got ${generalSession.length})`);
const generalIds = new Set(generalSession.map(q => q.id));
assert(generalIds.size === 6, 'Generated session must not contain duplicate questions');
console.log('  ✓ PASS: Generated balanced general session of 6 unique diagnostic questions');

// Grade-specific filtering
const grade8Session = CurriculumDiagnosticService.generateDiagnosticSession('KHTN_8', 4);
assert(grade8Session.length === 4, `Grade 8 session should generate 4 questions (got ${grade8Session.length})`);
for (const q of grade8Session) {
  assert(q.grade === 'KHTN_8', `Filtered question must be KHTN_8 (got ${q.grade})`);
}
console.log('  ✓ PASS: Grade-specific filtering (KHTN_8) successfully isolated target questions');

const grade10Session = CurriculumDiagnosticService.generateDiagnosticSession('HOA_10', 4);
assert(grade10Session.length === 4, `Grade 10 session should generate 4 questions (got ${grade10Session.length})`);
for (const q of grade10Session) {
  assert(q.grade === 'HOA_10', `Filtered question must be HOA_10 (got ${q.grade})`);
}
console.log('  ✓ PASS: Grade-specific filtering (HOA_10) successfully isolated target questions');

// Bound capping when requesting more than pool size
const excessSession = CurriculumDiagnosticService.generateDiagnosticSession('KHTN_9', 999);
const khtn9Count = DIAGNOSTIC_QUESTION_BANK.filter(q => q.grade === 'KHTN_9').length;
assert(excessSession.length === khtn9Count, `Excess session should clamp to available pool size (${khtn9Count})`);
console.log('  ✓ PASS: Session generator safely clamps to maximum available pool size without error');

// ---------------------------------------------------------------------------
// 3. Evaluation Engine & Scoring
// ---------------------------------------------------------------------------
console.log('\n--- 3. Evaluation Engine & Scoring Calculations ---');

// Test Case A: Perfect 100% Score
const testQuestions = DIAGNOSTIC_QUESTION_BANK.slice(0, 6);
const perfectAnswers = {};
testQuestions.forEach(q => { perfectAnswers[q.id] = q.correctAnswer; });

const perfectResult = CurriculumDiagnosticService.evaluateDiagnosticSession(perfectAnswers, testQuestions);
assert(perfectResult.score === 100, `Perfect answers must yield score 100% (got ${perfectResult.score})`);
assert(perfectResult.correctCount === 6, 'Perfect answers must have 6 correct');
assert(perfectResult.missedQuestions.length === 0, 'No questions should be missed on perfect score');
assert(perfectResult.generatedSrsItems.length === 0, 'No SRS cards need to be generated on 100% score');
assert(perfectResult.competencyTitleVI.includes('Xuất Sắc'), 'Competency title must recognize excellence');
assert(perfectResult.earnedXp >= 140, 'XP earned should reward 100% accuracy');
console.log('  ✓ PASS: Perfect score scenario evaluated accurately with zero missed questions');

// Test Case B: 50% Score (3 correct, 3 wrong)
const partialAnswers = {};
testQuestions.forEach((q, idx) => {
  if (idx < 3) {
    partialAnswers[q.id] = q.correctAnswer; // 3 correct
  } else {
    // Pick an incorrect option
    const wrongOpt = q.options.find(opt => opt !== q.correctAnswer);
    partialAnswers[q.id] = wrongOpt;
  }
});

const partialResult = CurriculumDiagnosticService.evaluateDiagnosticSession(partialAnswers, testQuestions);
assert(partialResult.score === 50, `3 of 6 correct must yield score 50% (got ${partialResult.score})`);
assert(partialResult.correctCount === 3, 'Correct count must be 3');
assert(partialResult.missedQuestions.length === 3, 'Missed count must be 3');
assert(partialResult.generatedSrsItems.length === 3, 'Must synthesize 3 CA-SRS flashcards for missed questions');
console.log('  ✓ PASS: Partial score scenario correctly identified 3 knowledge gaps and synthesized 3 flashcards');

// Test Case C: Zero 0% Score (All wrong)
const zeroAnswers = {};
testQuestions.forEach(q => {
  const wrongOpt = q.options.find(opt => opt !== q.correctAnswer);
  zeroAnswers[q.id] = wrongOpt;
});

const zeroResult = CurriculumDiagnosticService.evaluateDiagnosticSession(zeroAnswers, testQuestions);
assert(zeroResult.score === 0, `All wrong must yield score 0% (got ${zeroResult.score})`);
assert(zeroResult.correctCount === 0, 'Correct count must be 0');
assert(zeroResult.missedQuestions.length === 6, 'All 6 questions must be marked as missed');
assert(zeroResult.generatedSrsItems.length === 6, 'Must generate 6 SRS flashcards');
assert(zeroResult.competencyTitleVI.includes('Khởi Động'), 'Competency title must offer encouraging remedial guidance');
console.log('  ✓ PASS: Zero score scenario safely handled with full 6-card remedial synthesis');

// ---------------------------------------------------------------------------
// 4. CA-SRS Seeding & Flashcard Generation Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 4. CA-SRS Seeding Invariants ---');

for (const srsItem of partialResult.generatedSrsItems) {
  assert(srsItem.id.startsWith('srs_'), `SRS Item ID must start with srs_ (got ${srsItem.id})`);
  assert(srsItem.intervalDays === 1, 'Newly generated remedial item must start with base interval 1 day');
  assert(srsItem.easeFactor === 2.5, 'Newly generated remedial item must start with default Ease Factor 2.5');
  assert(srsItem.repetitionCount === 0, 'Repetition count must start at 0');
  assert(srsItem.consecutiveSuccesses === 0, 'Consecutive successes must start at 0');
  assert([1, 2, 3].includes(srsItem.errorLevel), 'Error level must be preserved from source question');
  
  // Date must be due today or in the past so student can review immediately
  const dueDate = new Date(srsItem.dueDate);
  const now = new Date();
  assert(dueDate <= now, 'Remedial flashcard must be due immediately for reinforcement');
}
console.log('  ✓ PASS: CA-SRS flashcards initialized with correct SuperMemo SM-2 baselines and immediate due date');

// ---------------------------------------------------------------------------
// 5. Grade & Cognitive Breakdown Consistency
// ---------------------------------------------------------------------------
console.log('\n--- 5. Statistical Breakdown Consistency ---');

let totalGradeQuestions = 0;
for (const grade of ['KHTN_8', 'KHTN_9', 'HOA_10', 'HOA_11_12']) {
  const stats = partialResult.gradeBreakdown[grade];
  assert(stats !== undefined, `Breakdown must include ${grade}`);
  assert(stats.percentage >= 0 && stats.percentage <= 100, 'Percentage must be in [0, 100]');
  totalGradeQuestions += stats.total;
}
assert(totalGradeQuestions === testQuestions.length, `Sum of grade questions (${totalGradeQuestions}) must equal total test questions (${testQuestions.length})`);

let totalCognitiveQuestions = 0;
for (const lvl of [1, 2, 3]) {
  const stats = partialResult.cognitiveBreakdown[lvl];
  assert(stats !== undefined, `Breakdown must include cognitive level ${lvl}`);
  assert(stats.percentage >= 0 && stats.percentage <= 100, 'Cognitive percentage must be in [0, 100]');
  totalCognitiveQuestions += stats.total;
}
assert(totalCognitiveQuestions === testQuestions.length, `Sum of cognitive questions (${totalCognitiveQuestions}) must equal total test questions (${testQuestions.length})`);
console.log('  ✓ PASS: Mathematical consistency verified: grade and cognitive breakdowns sum strictly to test length');

// ---------------------------------------------------------------------------
// 6. GDPT 2018 Balanced Curriculum Tiers & Remedial Seeding
// ---------------------------------------------------------------------------
console.log('\n--- 6. GDPT 2018 Balanced Curriculum Tiers & Remedial Seeding ---');

const expectedTiers = ['KHTN_8', 'KHTN_9', 'HOA_10', 'HOA_11_12'];
for (const tier of expectedTiers) {
  const tierQuestions = DIAGNOSTIC_QUESTION_BANK.filter(q => q.grade === tier);
  assert(tierQuestions.length === 6, `Tier ${tier} must contain exactly 6 questions (got ${tierQuestions.length})`);

  // Must contain Level 1, 2, and 3
  const levels = new Set(tierQuestions.map(q => q.errorLevel));
  assert(levels.has(1), `Tier ${tier} must contain Level 1 (Nhận biết) questions`);
  assert(levels.has(2), `Tier ${tier} must contain Level 2 (Thông hiểu) questions`);
  assert(levels.has(3), `Tier ${tier} must contain Level 3 (Vận dụng) questions`);
}
console.log('  ✓ PASS: All 4 curriculum tiers strictly maintain 6 questions and full Bloom taxonomy (Level 1, 2, 3) coverage');

// Test remedial synthesis for newly added 8 questions
const newQuestionIds = [
  'diag_khtn8_05', 'diag_khtn8_06',
  'diag_khtn9_05', 'diag_khtn9_06',
  'diag_hoa10_05', 'diag_hoa10_06',
  'diag_hoa11_03', 'diag_hoa12_03'
];
const newQuestions = DIAGNOSTIC_QUESTION_BANK.filter(q => newQuestionIds.includes(q.id));
assert(newQuestions.length === 8, 'Found all 8 newly expanded flagship curriculum questions');

// Simulate student answering all 8 wrong
const wrongAnswers = {};
newQuestions.forEach(q => {
  wrongAnswers[q.id] = 'INCORRECT_DISTRACTOR';
});

const evalNewResult = CurriculumDiagnosticService.evaluateDiagnosticSession(wrongAnswers, newQuestions);
assert(evalNewResult.score === 0, 'Score is 0 for 8 wrong answers');
assert(evalNewResult.missedQuestions.length === 8, 'All 8 questions identified as knowledge gaps');
assert(evalNewResult.generatedSrsItems.length === 8, 'Synthesized 8 targeted remedial CA-SRS flashcards');

// Verify that pedagogical tips are embedded into flashcards
const tipsEmbedded = evalNewResult.generatedSrsItems.every(item => {
  const matchingQ = newQuestions.find(q => q.question === item.question);
  return matchingQ && item.explanation.includes(matchingQ.pedagogicalTipVI);
});
assert(tipsEmbedded, 'All remedial flashcards embed bespoke pedagogical guidance tips');
console.log('  ✓ PASS: Remedial flashcard synthesis faithfully embeds Bloom cognitive weights and pedagogical guidance');

// ---------------------------------------------------------------------------
// 7. GDPT 2018 Recommended Curriculum Starting Tier Calibration
// ---------------------------------------------------------------------------
console.log('\n--- 7. GDPT 2018 Recommended Curriculum Starting Tier ---');

// Case 1: Student weak in KHTN 8 (< 70%)
const weakGrade8Result = {
  score: 40,
  gradeBreakdown: {
    KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 6, correct: 2, percentage: 33 },
    KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 6, correct: 3, percentage: 50 },
    HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 6, correct: 2, percentage: 33 },
    HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 6, correct: 2, percentage: 33 }
  }
};
const rec1 = CurriculumDiagnosticService.recommendStartingTier(weakGrade8Result);
assert.strictEqual(rec1.recommendedGrade, 'KHTN_8', 'Should recommend KHTN_8 when grade 8 foundation < 70%');
assert.ok(rec1.reasoningVI.includes('KHTN 8'), 'Reasoning should mention KHTN 8 foundations');

// Case 2: Student passed KHTN 8 (100%) but weak in KHTN 9 (33%)
const weakGrade9Result = {
  score: 65,
  gradeBreakdown: {
    KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 6, correct: 6, percentage: 100 },
    KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 6, correct: 2, percentage: 33 },
    HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 6, correct: 4, percentage: 67 },
    HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 6, correct: 3, percentage: 50 }
  }
};
const rec2 = CurriculumDiagnosticService.recommendStartingTier(weakGrade9Result);
assert.strictEqual(rec2.recommendedGrade, 'KHTN_9', 'Should recommend KHTN_9 when grade 8 is solid but grade 9 is weak');

// Case 3: Student mastered Middle School (KHTN 8 & 9 >= 80%) but weak in Grade 10 (50%)
const weakGrade10Result = {
  score: 75,
  gradeBreakdown: {
    KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 6, correct: 6, percentage: 100 },
    KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 6, correct: 5, percentage: 83 },
    HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 6, correct: 3, percentage: 50 },
    HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 6, correct: 2, percentage: 33 }
  }
};
const rec3 = CurriculumDiagnosticService.recommendStartingTier(weakGrade10Result);
assert.strictEqual(rec3.recommendedGrade, 'HOA_10', 'Should recommend HOA_10 when high school foundations need reinforcement');

// Case 4: Student mastered KHTN 8, KHTN 9, and HOA 10, ready for Grade 11-12
const readyGrade11Result = {
  score: 82,
  gradeBreakdown: {
    KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 6, correct: 6, percentage: 100 },
    KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 6, correct: 6, percentage: 100 },
    HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 6, correct: 5, percentage: 83 },
    HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 6, correct: 3, percentage: 50 }
  }
};
const rec4 = CurriculumDiagnosticService.recommendStartingTier(readyGrade11Result);
assert.strictEqual(rec4.recommendedGrade, 'HOA_11_12', 'Should recommend HOA_11_12 when grades 8-10 are mastered');

// Case 5: Master Student (>= 80% on all 4 tiers)
const masterResult = {
  score: 95,
  gradeBreakdown: {
    KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 6, correct: 6, percentage: 100 },
    KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 6, correct: 6, percentage: 100 },
    HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 6, correct: 6, percentage: 100 },
    HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 6, correct: 5, percentage: 83 }
  }
};
const rec5 = CurriculumDiagnosticService.recommendStartingTier(masterResult);
assert.strictEqual(rec5.recommendedGrade, 'HOA_11_12');
assert.ok(rec5.titleVI.includes('Bậc Thầy Hóa Học'), 'Master student should receive Master title');
console.log('  ✓ PASS: Curriculum tier placement recommendations validated across all 5 student proficiency profiles');

console.log('\n======================================================================');
console.log('   ✓ SUITE 42: ALL CURRICULUM DIAGNOSTIC ASSERTIONS PASSED!          ');
console.log('======================================================================\n');
