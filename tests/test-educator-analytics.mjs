// test-educator-analytics.mjs
// Verification of Section VI.1 Teacher Analytics Dashboard, Misconceptions, Hake Gain & Lesson Adjustment Plan

import {
  EducatorAnalyticsService,
  INITIAL_SIMULATED_STUDENTS
} from '../src/domain/educatorAnalytics.ts';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('=== TEST SUITE: TEACHER ANALYTICS & SECTION VI.1 PEDAGOGICAL GAIN ===\n');

// 1. Initial simulated student cohort integrity
console.log('--- 1. Simulated Cohort Integrity ---');
assert(INITIAL_SIMULATED_STUDENTS.length === 7, `Initial cohort has 7 students across GDPT 2018 grades (got ${INITIAL_SIMULATED_STUDENTS.length})`);
assert(INITIAL_SIMULATED_STUDENTS.every(s => s.preTestScore > 0 && s.postTestScore > s.preTestScore), 'All students show positive score gain from pre to post test');

// 2. Class Analytics Calculations
console.log('\n--- 2. Class Analytics & Hake Normalized Gain ---');
const analytics = EducatorAnalyticsService.calculateClassAnalytics(INITIAL_SIMULATED_STUDENTS);
assert(analytics.totalStudents === 7, 'Total students count calculated correctly');
assert(analytics.averagePreTest > 0 && analytics.averagePostTest > analytics.averagePreTest, 'Average post-test score exceeds pre-test');
assert(analytics.hakeNormalizedGain > 0.6, `Hake normalized gain indicates high cognitive gain: g = ${analytics.hakeNormalizedGain}`);
assert(analytics.cohensD > 1.0, `Cohen's d indicates large effect size: d = ${analytics.cohensD} (${analytics.effectSizeInterpretation})`);
assert(analytics.retentionPercent >= 90, `14-day Delayed Post-Test retention exceeds 90%: ${analytics.retentionPercent}%`);

// 3. Misconceptions Heatmap Aggregation
console.log('\n--- 3. Misconceptions Heatmap Aggregation (Top Traps) ---');
assert(analytics.misconceptionHeatmap.length > 0, 'Heatmap contains aggregated chemical traps');
const cuTrap = analytics.misconceptionHeatmap.find(m => m.trapName.includes('Cu + HCl'));
assert(cuTrap !== undefined, 'Heatmap captures Cu + dilute HCl metal activity misconception');
assert(cuTrap.chemicalContext.includes('Cu²⁺/Cu'), 'Trap references reduction potential context');

// 4. Students at Risk Identification
console.log('\n--- 4. At-Risk Student Pedagogical Intervention ---');
const atRisk = EducatorAnalyticsService.identifyStudentsAtRisk(INITIAL_SIMULATED_STUDENTS);
assert(Array.isArray(atRisk), 'At-risk identification returns list of intervention flags');
if (atRisk.length > 0) {
  assert(atRisk[0].suggestedIntervention.length > 10, 'Specific remedial intervention provided');
}

// 5. Lesson Adjustment Plan Generation (Section VI.1)
console.log('\n--- 5. Lesson Adjustment Plan (Section VI.1) ---');
const plan = EducatorAnalyticsService.generateLessonAdjustmentPlan(INITIAL_SIMULATED_STUDENTS, 'ALL');
assert(plan.topMisconceptions.length > 0, `Plan identifies top misconceptions (${plan.topMisconceptions.length} items)`);
assert(plan.recommendedLessonAdjustments.length >= 3, 'Plan contains at least 3 actionable curriculum adjustments');
const mdReport = EducatorAnalyticsService.generateLessonAdjustmentPlanMarkdown(plan);
assert(mdReport.includes('KẾ HOẠCH ĐIỀU CHỈNH BÀI GIẢNG SƯ PHẠM'), 'Markdown export contains proper header');
assert(mdReport.includes('MISCONCEPTION HEATMAP'), 'Markdown export includes heatmap');

// 6. Live Student Extraction from PlayerProfile
console.log('\n--- 6. Live Student Profile Extraction ---');
const dummyProfile = {
  name: 'Trần Minh Quân',
  level: 12,
  xp: 1540,
  knowledgeTokens: 850,
  unlockedElementZ: [1, 2, 6, 7, 8, 11, 17, 26, 29],
  activeDeck: ['Na', 'Cl', 'Fe', 'Cu'],
  savedDecks: [],
  srsItems: [{ title: 'Cu + HCl loãng', targetId: 'Cu' }],
  errorHistory: [{
    timestamp: new Date().toISOString(),
    mistakeType: 'Cu + HCl loãng',
    description: 'Nhầm lẫn đồng tác dụng axit clohidric',
    resolved: false
  }],
  tutorialCompleted: true,
  stats: { battlesPlayed: 18, battlesWon: 12, srsReviewsCompleted: 35 }
};
const liveStudent = EducatorAnalyticsService.extractLiveStudentAnalytics(dummyProfile);
assert(liveStudent.id === 'st_current_live', 'Live student ID tagged st_current_live');
assert(liveStudent.matchesPlayed === 30, `Matches aggregated correctly (got ${liveStudent.matchesPlayed})`);
assert(liveStudent.reactionsMastered === 9, `Reactions mastered reflects 9 unlocked elements (got ${liveStudent.reactionsMastered})`);
assert(liveStudent.commonTrapFaced.includes('Cu + HCl'), 'Error history common trap extracted correctly');

// 6.1 Leech trap detection in Live Student Profile
const leechProfile = {
  ...dummyProfile,
  srsItems: [
    { title: 'Bẫy Kim Loại Quý: Au + O2', targetId: 'Au', lapses: 4, isLeech: true }
  ],
  errorHistory: []
};
const leechStudent = EducatorAnalyticsService.extractLiveStudentAnalytics(leechProfile);
assert(leechStudent.commonTrapFaced.includes('Au + O2'), 'Chronic leech misconception identified as primary trap');
assert(leechStudent.delayedPostTestScore < leechStudent.postTestScore * 0.85, 'Chronic leech drops delayed retention below 85% to trigger intervention');
const leechRiskFlags = EducatorAnalyticsService.identifyStudentsAtRisk([leechStudent]);
assert(leechRiskFlags.length === 1, 'Chronic leech student flagged for intervention');
assert(leechRiskFlags[0].suggestedIntervention.includes('Au + O2'), 'Intervention plan specifies targeted remedial topic');

// 7. CSV & JSON Export Integrity
console.log('\n--- 7. Data Export Format Integrity ---');
const csv = EducatorAnalyticsService.generateCsvContent(INITIAL_SIMULATED_STUDENTS);
assert(csv.includes('ID,Họ và Tên,Lớp'), 'CSV headers formatted properly');
assert(csv.includes('Nguyễn Văn An'), 'CSV includes student records');

const json = EducatorAnalyticsService.generateJsonExport(INITIAL_SIMULATED_STUDENTS);
assert(json.standard === 'GDPT 2018', 'JSON metadata references GDPT 2018');
assert(json.classAnalytics.totalStudents === 7, 'JSON embeds class analytics summary');

console.log(`\n========================================`);
console.log(`TOTAL PASSED: ${passCount}`);
console.log(`TOTAL FAILED: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL SECTION VI.1 TEACHER ANALYTICS TESTS PASSED 100%!');
}
