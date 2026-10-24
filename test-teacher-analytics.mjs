// test-teacher-analytics.mjs
// Suite 36: Educator Analytics Domain Service, Pedagogical Gain Statistics, Misconception Heatmaps & Export Verification

import { EducatorAnalyticsService, INITIAL_SIMULATED_STUDENTS } from './src/domain/educatorAnalytics.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 36: EDUCATOR ANALYTICS & PEDAGOGICAL GAIN AUDIT   ');
console.log('======================================================================\n');

// --- 1. Initial Student Cohort Data Integrity ---
console.log('--- 1. Initial Student Cohort Data Integrity ---');
{
  assert(Array.isArray(INITIAL_SIMULATED_STUDENTS), 'Initial student cohort is a valid array');
  assert(INITIAL_SIMULATED_STUDENTS.length === 7, `Initial simulated classroom contains exactly 7 student profiles (got ${INITIAL_SIMULATED_STUDENTS.length})`);

  for (const s of INITIAL_SIMULATED_STUDENTS) {
    assert(typeof s.id === 'string' && s.id.length > 0, `Student ${s.name} has valid string id (${s.id})`);
    assert(s.preTestScore >= 0 && s.preTestScore <= 100, `Student ${s.name} pre-test score (${s.preTestScore}) in [0, 100]`);
    assert(s.postTestScore >= 0 && s.postTestScore <= 100, `Student ${s.name} post-test score (${s.postTestScore}) in [0, 100]`);
    assert(s.delayedPostTestScore >= 0 && s.delayedPostTestScore <= 100, `Student ${s.name} delayed score (${s.delayedPostTestScore}) in [0, 100]`);
    assert(s.postTestScore > s.preTestScore, `Student ${s.name} demonstrated positive pedagogical growth (post > pre)`);
    assert(typeof s.commonTrapFaced === 'string' && s.commonTrapFaced.length > 0, `Student ${s.name} has tracked chemical trap`);
  }
}

// --- 2. Grade-Level Filtering Audit ---
console.log('\n--- 2. Grade-Level Filtering Audit ---');
{
  const allStudents = EducatorAnalyticsService.filterStudents(INITIAL_SIMULATED_STUDENTS, 'ALL');
  assert(allStudents.length === 7, "Grade filter 'ALL' returns all 7 students");

  const khtn8Students = EducatorAnalyticsService.filterStudents(INITIAL_SIMULATED_STUDENTS, 'KHTN_8');
  assert(khtn8Students.length === 2, "Grade filter 'KHTN_8' returns exactly 2 students");
  assert(khtn8Students.every(s => s.grade === 'KHTN_8'), "All filtered students have grade 'KHTN_8'");

  const khtn9Students = EducatorAnalyticsService.filterStudents(INITIAL_SIMULATED_STUDENTS, 'KHTN_9');
  assert(khtn9Students.length === 1, "Grade filter 'KHTN_9' returns exactly 1 student");
  assert(khtn9Students[0].name === 'Lê Hoàng Cường', "Grade filter 'KHTN_9' matches student Lê Hoàng Cường");

  const hoa10Students = EducatorAnalyticsService.filterStudents(INITIAL_SIMULATED_STUDENTS, 'HOA_10');
  assert(hoa10Students.length === 2, "Grade filter 'HOA_10' returns exactly 2 students");
  assert(hoa10Students.every(s => s.grade === 'HOA_10'), "All filtered students have grade 'HOA_10'");

  const hoa1112Students = EducatorAnalyticsService.filterStudents(INITIAL_SIMULATED_STUDENTS, 'HOA_11_12');
  assert(hoa1112Students.length === 2, "Grade filter 'HOA_11_12' returns exactly 2 students");
  assert(hoa1112Students.every(s => s.grade === 'HOA_11_12'), "All filtered students have grade 'HOA_11_12'");
}

// --- 3. Pedagogical Gain & Retention Calculations ---
console.log('\n--- 3. Pedagogical Gain & Retention Calculations ---');
{
  const summary = EducatorAnalyticsService.calculateClassAnalytics(INITIAL_SIMULATED_STUDENTS);

  assert(summary.totalStudents === 7, 'Total students count in summary is 7');
  assert(summary.averagePreTest === 54.6, `Pre-test score correctly averages to 54.6 (got ${summary.averagePreTest})`);
  assert(summary.averagePostTest === 89.7, `Post-test score correctly averages to 89.7 (got ${summary.averagePostTest})`);
  assert(summary.averageDelayedPostTest === 87.0, `Delayed post-test score correctly averages to 87.0 (got ${summary.averageDelayedPostTest})`);
  assert(summary.averageScoreGain === 35.1, `Average score growth correctly calculates to +35.1 points (got ${summary.averageScoreGain})`);
  assert(summary.retentionPercent === 97.0, `Long-term 14-day retention rate is 97.0% (got ${summary.retentionPercent}%)`);
  assert(summary.hakeNormalizedGain === 0.77, `Hake normalized learning gain is 0.77 (High Gain Tier g >= 0.70) (got ${summary.hakeNormalizedGain})`);

  // Edge case: Empty student array
  const emptySummary = EducatorAnalyticsService.calculateClassAnalytics([]);
  assert(emptySummary.totalStudents === 0, 'Empty student set returns totalStudents = 0');
  assert(emptySummary.averageScoreGain === 0, 'Empty student set returns averageScoreGain = 0 without NaN error');
  assert(emptySummary.retentionPercent === 0, 'Empty student set returns retentionPercent = 0 without division-by-zero crash');
  assert(emptySummary.hakeNormalizedGain === 0, 'Empty student set returns hakeNormalizedGain = 0 without crash');
  assert(emptySummary.misconceptionHeatmap.length === 0, 'Empty student set returns empty misconception heatmap');
}

// --- 4. Misconception Heatmap Aggregation & GDPT 2018 Advice ---
console.log('\n--- 4. Misconception Heatmap Aggregation & GDPT 2018 Advice ---');
{
  const summary = EducatorAnalyticsService.calculateClassAnalytics(INITIAL_SIMULATED_STUDENTS);
  const heatmap = summary.misconceptionHeatmap;

  assert(Array.isArray(heatmap) && heatmap.length === 7, `Misconception heatmap identified 7 unique traps (got ${heatmap.length})`);

  for (const item of heatmap) {
    assert(item.affectedCount >= 1, `Misconception '${item.trapName}' tracks affected students >= 1`);
    assert(item.totalStudents === 7, `Misconception '${item.trapName}' correctly references totalStudents = 7`);
    assert(item.errorPercentage === 14, `Single student trap calculates to exactly 14% error rate (got ${item.errorPercentage}%)`);
    assert(typeof item.chemicalContext === 'string' && item.chemicalContext.length > 10, `Trap '${item.trapName}' has informative chemical context`);
    assert(typeof item.pedagogicalAdvice === 'string' && item.pedagogicalAdvice.length > 15, `Trap '${item.trapName}' has actionable pedagogical advice`);
  }

  // Verify specific known trap advice
  const cuTrap = heatmap.find(h => h.trapName === 'Cu + HCl loãng');
  assert(cuTrap !== undefined, "Heatmap includes 'Cu + HCl loãng' trap");
  assert(cuTrap.chemicalContext.includes('E° Cu²⁺/Cu'), "Cu trap references electrochemical potential (E° Cu²⁺/Cu = +0.34V)");

  const rustTrap = heatmap.find(h => h.trapName === 'Thiếu độ ẩm khi gỉ sắt');
  assert(rustTrap !== undefined, "Heatmap includes 'Thiếu độ ẩm khi gỉ sắt' trap");
  assert(rustTrap.pedagogicalAdvice.includes('nước làm chất điện ly'), "Iron rust trap advice explains requirement of water as electrolyte");

  const esterTrap = heatmap.find(h => h.trapName.includes('este hóa Fischer'));
  assert(esterTrap !== undefined, "Heatmap includes 'este hóa Fischer' trap");
  assert(esterTrap.chemicalContext.includes('Le Chatelier'), "Ester trap references Le Chatelier principle");

  const javelTrap = heatmap.find(h => h.trapName.includes('nước Javel'));
  assert(javelTrap !== undefined, "Heatmap includes Javel bleach trap");
  assert(javelTrap.pedagogicalAdvice.includes('Javel'), "Javel trap advice explains bleach formation without diaphragm");
}

// --- 5. Data Export Serialization (CSV & JSON) ---
console.log('\n--- 5. Data Export Serialization (CSV & JSON) ---');
{
  // CSV Export
  const csv = EducatorAnalyticsService.generateCsvContent(INITIAL_SIMULATED_STUDENTS);
  assert(typeof csv === 'string', 'CSV content is a string');
  assert(csv.startsWith('ID,Họ và Tên,Lớp,Trận Đã Đấu,Phản Ứng Đạt,Điểm Pre-Test,Điểm Post-Test,Điểm Delayed Post-Test,Hiểu Lầm Hay Gặp'), 'CSV header contains all standard columns');

  const lines = csv.trim().split('\n');
  assert(lines.length === 8, `CSV export contains exactly 8 lines (1 header + 7 students) (got ${lines.length})`);
  assert(lines[1].includes('"st_01"'), 'First student row matches st_01');
  assert(lines[1].includes('"Nguyễn Văn An"'), 'Student name properly enclosed in quotes');
  assert(lines[1].includes('45,82,78'), 'Numeric test scores formatted without quotation');

  // JSON Export
  const jsonExport = EducatorAnalyticsService.generateJsonExport(INITIAL_SIMULATED_STUDENTS, '2026-10-22T02:45:00.000Z');
  assert(typeof jsonExport === 'object' && jsonExport !== null, 'JSON export returns valid object');
  assert(jsonExport.exportedAt === '2026-10-22T02:45:00.000Z', 'JSON export preserves provided timestamp');
  assert(jsonExport.standard === 'GDPT 2018', "JSON export declares 'GDPT 2018' standard compliance");
  assert(jsonExport.dataSource === 'SIMULATED_EDUCATIONAL_DATA', "JSON export declares 'SIMULATED_EDUCATIONAL_DATA' transparency tag");
  assert(jsonExport.classAnalytics.averageScoreGain === 35.1, 'JSON export embeds correct class analytics');
  assert(Array.isArray(jsonExport.students) && jsonExport.students.length === 7, 'JSON export embeds full student records');

  // JSON stringification roundtrip test
  const serialized = JSON.stringify(jsonExport);
  const parsed = JSON.parse(serialized);
  assert(parsed.classAnalytics.totalStudents === 7, 'JSON serializes and parses without loss');
}

// --- 6. Dynamic Cohort Mutation & High-Volume Recalculation ---
console.log('\n--- 6. Dynamic Cohort Mutation & High-Volume Recalculation ---');
{
  const expandedCohort = [
    ...INITIAL_SIMULATED_STUDENTS,
    {
      id: 'st_08',
      name: 'Đặng Quốc Hưng',
      grade: 'KHTN_8',
      matchesPlayed: 25,
      reactionsMastered: 30,
      preTestScore: 70,
      postTestScore: 100,
      delayedPostTestScore: 98,
      commonTrapFaced: 'Cu + HCl loãng' // Repeat trap
    }
  ];

  const expandedSummary = EducatorAnalyticsService.calculateClassAnalytics(expandedCohort);
  assert(expandedSummary.totalStudents === 8, 'Expanded cohort has 8 students');
  // New avg pre: (382 + 70) / 8 = 452 / 8 = 56.5
  assert(expandedSummary.averagePreTest === 56.5, `Updated pre-test average is 56.5 (got ${expandedSummary.averagePreTest})`);

  // Cu trap count should now be 2 out of 8 students (25%)
  const topTrap = expandedSummary.misconceptionHeatmap[0];
  assert(topTrap.trapName === 'Cu + HCl loãng', "Top trap correctly identified as 'Cu + HCl loãng' with 2 occurrences");
  assert(topTrap.affectedCount === 2, "Cu trap affectedCount is 2");
  assert(topTrap.errorPercentage === 25, `Cu trap error percentage is 25% (got ${topTrap.errorPercentage}%)`);
}

// --- 7. Cohen's d Effect Size & Statistical Educational Impact ---
console.log('\n--- 7. Cohen\'s d Effect Size & Statistical Educational Impact ---');
{
  const effect = EducatorAnalyticsService.calculateEffectSize(INITIAL_SIMULATED_STUDENTS);
  assert(effect.d > 5.0, `Cohen's d effect size indicates massive educational growth (got d = ${effect.d})`);
  assert(effect.interpretation === 'Very Large', `Cohen's d interpretation classified as 'Very Large' (got ${effect.interpretation})`);

  // Class summary integration check
  const summary = EducatorAnalyticsService.calculateClassAnalytics(INITIAL_SIMULATED_STUDENTS);
  assert(summary.cohensD === effect.d, `Class summary embeds exact Cohen's d value (${summary.cohensD})`);
  assert(summary.effectSizeInterpretation === 'Very Large', 'Class summary embeds correct effect size interpretation');

  // Boundary condition tests
  const emptyEffect = EducatorAnalyticsService.calculateEffectSize([]);
  assert(emptyEffect.d === 0 && emptyEffect.interpretation === 'Trivial', 'Empty student array yields d = 0 and Trivial');

  const singleEffect = EducatorAnalyticsService.calculateEffectSize([INITIAL_SIMULATED_STUDENTS[0]]);
  assert(singleEffect.d === 0 && singleEffect.interpretation === 'Trivial', 'Single student array yields d = 0 (n < 2)');
}

// --- 8. Student At-Risk Triage & Pedagogical Remediation Invariants ---
console.log('\n--- 8. Student At-Risk Triage & Remediation Invariants ---');
{
  const atRiskFlags = EducatorAnalyticsService.identifyStudentsAtRisk(INITIAL_SIMULATED_STUDENTS);
  assert(Array.isArray(atRiskFlags), 'identifyStudentsAtRisk returns an array');

  // Student st_01 (pre 45, post 82, delayed 78): flagged for pre < 50 and post < 85
  const st01Flag = atRiskFlags.find(f => f.studentId === 'st_01');
  assert(st01Flag !== undefined, 'Student st_01 correctly flagged for pedagogical follow-up');
  assert(st01Flag.riskLevel === 'MEDIUM', `st_01 risk level is MEDIUM (got ${st01Flag.riskLevel})`);
  assert(st01Flag.reasons.some(r => r.includes('đầu vào yếu')), 'Identifies weak baseline as contributing factor');
  assert(st01Flag.suggestedIntervention.includes('Sandbox'), 'Proposes Sandbox practice scenario');

  // High achieving student (st_06: pre 62, post 95, delayed 92) should NOT be flagged
  const st06Flag = atRiskFlags.find(f => f.studentId === 'st_06');
  assert(st06Flag === undefined, 'High performing student st_06 is not flagged at risk');

  // Test struggling student with severe retention decline
  const strugglingCohort = [
    ...INITIAL_SIMULATED_STUDENTS,
    {
      id: 'st_critical',
      name: 'Vũ Quốc Khang',
      grade: 'KHTN_8',
      matchesPlayed: 8,
      reactionsMastered: 6,
      preTestScore: 40,
      postTestScore: 68, // Low post test (< 70)
      delayedPostTestScore: 50, // 50/68 = 73.5% retention (< 85%)
      commonTrapFaced: 'Cu + HCl loãng'
    }
  ];

  const criticalFlags = EducatorAnalyticsService.identifyStudentsAtRisk(strugglingCohort);
  const criticalStudent = criticalFlags.find(f => f.studentId === 'st_critical');
  assert(criticalStudent !== undefined, 'Critical student correctly identified');
  assert(criticalStudent.riskLevel === 'HIGH', 'Student classified as HIGH risk level');
  assert(criticalStudent.reasons.length >= 2, `Identified multiple risk factors (got ${criticalStudent.reasons.length})`);
  assert(criticalStudent.suggestedIntervention.includes('kèm 1-1'), 'Recommends 1-on-1 tutoring and CA-SRS flashcard schedule');
}

console.log('\n======================================================================');
console.log('   ✓ SUITE 36: ALL EDUCATOR ANALYTICS ASSERTIONS PASSED!              ');
console.log('======================================================================\n');
