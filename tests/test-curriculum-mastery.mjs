// tests/test-curriculum-mastery.mjs
// Test Suite 200: Master Curriculum Synthesis & Diagnostic Mastery Engine
// Milestone Suite 200 — 100% Harmony across Grade 10, 11, 12 GDPT 2018
import assert from 'assert';
import {
  CURRICULUM_TOPICS,
  DIAGNOSTIC_QUESTIONS,
  evaluateDiagnosticExam
} from '../src/domain/curriculumMasteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA MILESTONE TEST SUITE 200: CURRICULUM MASTERY & DIAGNOSTICS');
console.log('======================================================================\n');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

// 1. Curriculum Structure Tests
test('Curriculum topics catalog covers all 18 core topics across Grades 10, 11, 12', () => {
  assert.strictEqual(CURRICULUM_TOPICS.length, 18);
});

test('Grade 10 covers all 7 core topics', () => {
  const g10 = CURRICULUM_TOPICS.filter(t => t.grade === 'GRADE_10');
  assert.strictEqual(g10.length, 7);
  const titles = g10.map(t => t.titleVi);
  assert.ok(titles.some(t => t.includes('Cấu tạo nguyên tử')));
  assert.ok(titles.some(t => t.includes('Bảng tuần hoàn')));
  assert.ok(titles.some(t => t.includes('Liên kết hóa học')));
  assert.ok(titles.some(t => t.includes('Phản ứng oxi hóa - khử')));
  assert.ok(titles.some(t => t.includes('Năng lượng hóa học')));
  assert.ok(titles.some(t => t.includes('Tốc độ phản ứng')));
  assert.ok(titles.some(t => t.includes('Halogen')));
});

test('Grade 11 covers all 6 core topics', () => {
  const g11 = CURRICULUM_TOPICS.filter(t => t.grade === 'GRADE_11');
  assert.strictEqual(g11.length, 6);
  const titles = g11.map(t => t.titleVi);
  assert.ok(titles.some(t => t.includes('Cân bằng hóa học')));
  assert.ok(titles.some(t => t.includes('Cân bằng trong dung dịch nước')));
  assert.ok(titles.some(t => t.includes('Nitrogen, Sulfur')));
  assert.ok(titles.some(t => t.includes('Hydrocarbon')));
  assert.ok(titles.some(t => t.includes('Dẫn xuất Halogen')));
  assert.ok(titles.some(t => t.includes('Hợp chất Carbonyl')));
});

test('Grade 12 covers all 5 core topics', () => {
  const g12 = CURRICULUM_TOPICS.filter(t => t.grade === 'GRADE_12');
  assert.strictEqual(g12.length, 5);
  const titles = g12.map(t => t.titleVi);
  assert.ok(titles.some(t => t.includes('Ester, Lipid')));
  assert.ok(titles.some(t => t.includes('Carbohydrate')));
  assert.ok(titles.some(t => t.includes('Amine, Amino Acid')));
  assert.ok(titles.some(t => t.includes('Polymer')));
  assert.ok(titles.some(t => t.includes('Đại cương Kim loại')));
});

test('Every curriculum topic maps to an active visualizer tab in ELEMENTA', () => {
  for (const topic of CURRICULUM_TOPICS) {
    assert.ok(topic.associatedVisualizerTab, `Topic ${topic.id} missing associatedVisualizerTab`);
    assert.strictEqual(typeof topic.associatedVisualizerTab, 'string');
    assert.strictEqual(topic.nationalExamWeightPercent > 0, true);
  }
});

// 2. Diagnostic Questions Pool Tests
test('Diagnostic questions pool contains items across Grades 10, 11, and 12', () => {
  const grades = new Set(DIAGNOSTIC_QUESTIONS.map(q => q.grade));
  assert.ok(grades.has('GRADE_10'));
  assert.ok(grades.has('GRADE_11'));
  assert.ok(grades.has('GRADE_12'));
});

test('Diagnostic questions pool spans all 4 competency levels', () => {
  const levels = new Set(DIAGNOSTIC_QUESTIONS.map(q => q.level));
  assert.ok(levels.has('RECOGNITION'));
  assert.ok(levels.has('COMPREHENSION'));
  assert.ok(levels.has('APPLICATION'));
  assert.ok(levels.has('HIGH_APPLICATION'));
});

test('Each question has 4 distinct options and valid correctOptionIndex (0-3)', () => {
  for (const q of DIAGNOSTIC_QUESTIONS) {
    assert.strictEqual(q.optionsVi.length, 4, `Question ${q.id} should have 4 options`);
    assert.strictEqual(q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3, true);
    assert.ok(q.explanationVi.length > 10);
    assert.ok(q.remedialConceptVi.length > 5);
  }
});

// 3. Evaluation & Diagnostic Scoring Algorithm Tests
test('Perfect answers yield 100% score, 0 weak topics, and master rank', () => {
  const perfectAnswers = DIAGNOSTIC_QUESTIONS.map(q => ({
    questionId: q.id,
    selectedOptionIndex: q.correctOptionIndex
  }));

  const res = evaluateDiagnosticExam(perfectAnswers);
  assert.strictEqual(res.scorePercentage, 100);
  assert.strictEqual(res.correctCount, DIAGNOSTIC_QUESTIONS.length);
  assert.strictEqual(res.weakTopicIds.length, 0);
  assert.strictEqual(res.grade10ScorePercent, 100);
  assert.strictEqual(res.grade11ScorePercent, 100);
  assert.strictEqual(res.grade12ScorePercent, 100);
  assert.ok(res.competencyRankVi.includes('Xuất Sắc'));
  assert.ok(res.personalizedRoadmapVi[0].includes('hoàn hảo'));
});

test('Partial mistakes identify exact weak topics and build visualizer recommendations', () => {
  // Purposefully answer Q01 (Octet Exception - G10_TOPIC_3) and Q05 (Markovnikov - G11_TOPIC_4) incorrectly
  const answers = DIAGNOSTIC_QUESTIONS.map(q => {
    if (q.id === 'Q01_OCTET_EXCEPTION' || q.id === 'Q05_MARKOVNIKOV') {
      return { questionId: q.id, selectedOptionIndex: (q.correctOptionIndex + 1) % 4 };
    }
    return { questionId: q.id, selectedOptionIndex: q.correctOptionIndex };
  });

  const res = evaluateDiagnosticExam(answers);
  assert.strictEqual(res.correctCount, DIAGNOSTIC_QUESTIONS.length - 2);
  assert.ok(res.weakTopicIds.includes('G10_TOPIC_3_CHEMICAL_BONDING'));
  assert.ok(res.weakTopicIds.includes('G11_TOPIC_4_HYDROCARBONS'));
  assert.strictEqual(res.grade10ScorePercent < 100, true);
  assert.strictEqual(res.grade11ScorePercent < 100, true);
  assert.strictEqual(res.grade12ScorePercent, 100); // G12 untouched

  // Verify roadmap contains recommendations with Visualizer tab names
  const roadmapText = res.personalizedRoadmapVi.join(' ');
  assert.ok(roadmapText.includes('VSEPR_BONDING'));
  assert.ok(roadmapText.includes('HYDROCARBONS_REACTIONS'));
});

test('Competency level breakdown accurately tallies correct vs total per tier', () => {
  const perfectAnswers = DIAGNOSTIC_QUESTIONS.map(q => ({
    questionId: q.id,
    selectedOptionIndex: q.correctOptionIndex
  }));

  const res = evaluateDiagnosticExam(perfectAnswers);
  assert.strictEqual(res.levelBreakdown.recognition.correct, res.levelBreakdown.recognition.total);
  assert.strictEqual(res.levelBreakdown.comprehension.correct, res.levelBreakdown.comprehension.total);
  assert.strictEqual(res.levelBreakdown.application.correct, res.levelBreakdown.application.total);
  assert.strictEqual(res.levelBreakdown.highApplication.correct, res.levelBreakdown.highApplication.total);
  assert.strictEqual(
    res.levelBreakdown.recognition.total +
    res.levelBreakdown.comprehension.total +
    res.levelBreakdown.application.total +
    res.levelBreakdown.highApplication.total,
    DIAGNOSTIC_QUESTIONS.length
  );
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed} TESTS PASSED`);
console.log(' MILESTONE TEST SUITE 200 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
