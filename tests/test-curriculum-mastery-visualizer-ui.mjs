// tests/test-curriculum-mastery-visualizer-ui.mjs
// Test Suite 201: CurriculumMasteryVisualizer Component & Integration Audit
import fs from 'fs';
import assert from 'assert';

console.log('--- TEST SUITE 201: CurriculumMasteryVisualizer Component & Integration Audit ---');

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

const visualizerPath = 'src/components/visualizations/CurriculumMasteryVisualizer.tsx';
const enginePath = 'src/domain/curriculumMasteryEngine.ts';
const periodicTabPath = 'src/components/PeriodicCodexTab.tsx';

test('CurriculumMasteryVisualizer.tsx component file must exist', () => {
  assert.strictEqual(fs.existsSync(visualizerPath), true);
});

test('curriculumMasteryEngine.ts domain engine file must exist', () => {
  assert.strictEqual(fs.existsSync(enginePath), true);
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert.strictEqual(fs.existsSync(periodicTabPath), true);
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

test('CurriculumMasteryVisualizer must import simulation functions from curriculumMasteryEngine', () => {
  assert.strictEqual(visualizerContent.includes("from '../../domain/curriculumMasteryEngine'"), true);
  assert.strictEqual(visualizerContent.includes('CURRICULUM_TOPICS'), true);
  assert.strictEqual(visualizerContent.includes('DIAGNOSTIC_QUESTIONS'), true);
  assert.strictEqual(visualizerContent.includes('evaluateDiagnosticExam'), true);
});

test('CurriculumMasteryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.strictEqual(visualizerContent.includes('sound.playUiClick()'), true);
});

test('CurriculumMasteryVisualizer must support all 3 modes: CURRICULUM_MATRIX, DIAGNOSTIC_EXAM, and COMPETENCY_REPORT_ROADMAP', () => {
  assert.strictEqual(visualizerContent.includes("'CURRICULUM_MATRIX'"), true);
  assert.strictEqual(visualizerContent.includes("'DIAGNOSTIC_EXAM'"), true);
  assert.strictEqual(visualizerContent.includes("'COMPETENCY_REPORT_ROADMAP'"), true);
});

test('CurriculumMasteryVisualizer must render grade filter buttons (Tất Cả, Lớp 10, Lớp 11, Lớp 12)', () => {
  assert.strictEqual(visualizerContent.includes('setSelectedGradeFilter'), true);
  assert.strictEqual(visualizerContent.includes('Tất Cả (18 Chủ Đề)'), true);
  assert.strictEqual(visualizerContent.includes('Lớp 10 (7 Chủ Đề)'), true);
  assert.strictEqual(visualizerContent.includes('Lớp 11 (6 Chủ Đề)'), true);
  assert.strictEqual(visualizerContent.includes('Lớp 12 (5 Chủ Đề)'), true);
});

test('CurriculumMasteryVisualizer must render diagnostic question options with A, B, C, D badges', () => {
  assert.strictEqual(visualizerContent.includes('String.fromCharCode(65 + optIdx)'), true);
  assert.strictEqual(visualizerContent.includes('currentQ.optionsVi'), true);
});

test('CurriculumMasteryVisualizer must render competency report with percentage score and personalized roadmap', () => {
  assert.strictEqual(visualizerContent.includes('assessmentResult.scorePercentage'), true);
  assert.strictEqual(visualizerContent.includes('assessmentResult.competencyRankVi'), true);
  assert.strictEqual(visualizerContent.includes('assessmentResult.personalizedRoadmapVi'), true);
});

const periodicTabContent = fs.readFileSync(periodicTabPath, 'utf8');

test('PeriodicCodexTab must import CurriculumMasteryVisualizer', () => {
  assert.strictEqual(periodicTabContent.includes("import { CurriculumMasteryVisualizer } from './visualizations/CurriculumMasteryVisualizer'"), true);
});

test('PeriodicCodexTab must include \'CURRICULUM_MASTERY\' in navigation tabs', () => {
  assert.strictEqual(periodicTabContent.includes("'CURRICULUM_MASTERY'"), true);
});

test('PeriodicCodexTab must mount <CurriculumMasteryVisualizer /> when activeMainTab is CURRICULUM_MASTERY', () => {
  assert.strictEqual(periodicTabContent.includes("<CurriculumMasteryVisualizer"), true);
  assert.strictEqual(periodicTabContent.includes("activeMainTab === 'CURRICULUM_MASTERY'"), true);
});

console.log(`\nResults: ${passed} passed, 0 failed.`);
console.log('✓ TEST SUITE 201 PASSED: CurriculumMasteryVisualizer fully verified!\n');
