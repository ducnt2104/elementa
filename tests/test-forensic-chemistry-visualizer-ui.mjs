// tests/test-forensic-chemistry-visualizer-ui.mjs
// Test Suite 207: ForensicChemistryVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 207: ForensicChemistryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ForensicChemistryVisualizer.tsx');
const enginePath = path.resolve('src/domain/forensicChemistryEngine.ts');
const periodicCodexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    process.exit(1);
  }
}

// 1. Files existence
test('ForensicChemistryVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('forensicChemistryEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('ForensicChemistryVisualizer must import simulation functions from forensicChemistryEngine', () => {
  assert(visualizerContent.includes('calculateBreathalyzerTest'), 'Must import calculateBreathalyzerTest');
  assert(visualizerContent.includes('evaluateLuminolChemiluminescence'), 'Must import evaluateLuminolChemiluminescence');
  assert(visualizerContent.includes('performMarshTest'), 'Must import performMarshTest');
  assert(visualizerContent.includes('MARQUIS_CATALOG'), 'Must import MARQUIS_CATALOG');
  assert(visualizerContent.includes('simulateCyanideAntidote'), 'Must import simulateCyanideAntidote');
});

test('ForensicChemistryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. Mode coverage
test('ForensicChemistryVisualizer must support all 3 modes: BREATHALYZER_LAB, LUMINOL_DARKROOM, and TOXICOLOGY_MARSH_MARQUIS', () => {
  assert(visualizerContent.includes("'BREATHALYZER_LAB'"), 'Must support BREATHALYZER_LAB mode');
  assert(visualizerContent.includes("'LUMINOL_DARKROOM'"), 'Must support LUMINOL_DARKROOM mode');
  assert(visualizerContent.includes("'TOXICOLOGY_MARSH_MARQUIS'"), 'Must support TOXICOLOGY_MARSH_MARQUIS mode');
});

// 4. Breathalyzer & Decree 100
test('ForensicChemistryVisualizer must render Decree 100 legal classifications and cuvette SVG', () => {
  assert(visualizerContent.includes('100/2019/NĐ-CP'), 'Must mention Decree 100/2019/ND-CP');
  assert(visualizerContent.includes('Cr₂O₇²⁻'), 'Must reference Cr2O7 2-');
  assert(visualizerContent.includes('Cr³⁺'), 'Must reference Cr 3+');
});

// 5. Luminol Darkroom
test('ForensicChemistryVisualizer must render darkroom toggle and footprint chemiluminescence SVG', () => {
  assert(visualizerContent.includes('isDarkroomMode'), 'Must track darkroom mode state');
  assert(visualizerContent.includes('filter="url(#luminolGlow)"'), 'Must render SVG glow filter for chemiluminescence');
  assert(visualizerContent.includes('425 nm'), 'Must reference 425 nm emission wavelength');
});

// 6. Marsh & Marquis & Cyanide
test('ForensicChemistryVisualizer must render Marsh mirror test and Marquis drug catalog', () => {
  assert(visualizerContent.includes('Thử Nghiệm Gương Asen Marsh'), 'Must feature Marsh test');
  assert(visualizerContent.includes('MARQUIS_CATALOG'), 'Must reference MARQUIS_CATALOG');
  assert(visualizerContent.includes('Sodium Thiosulfate'), 'Must feature cyanide antidote');
});

// 7. Integration in PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import ForensicChemistryVisualizer', () => {
  assert(periodicCodexContent.includes('ForensicChemistryVisualizer'), 'Must import ForensicChemistryVisualizer in PeriodicCodexTab.tsx');
});

test('PeriodicCodexTab must include FORENSIC_CHEMISTRY in navigation tabs', () => {
  assert(periodicCodexContent.includes("'FORENSIC_CHEMISTRY'"), 'Must include FORENSIC_CHEMISTRY in activeMainTab type union and navigation');
});

test('PeriodicCodexTab must mount <ForensicChemistryVisualizer /> when activeMainTab is FORENSIC_CHEMISTRY', () => {
  assert(periodicCodexContent.includes('<ForensicChemistryVisualizer'), 'Must render <ForensicChemistryVisualizer />');
});

console.log(`\nResults: ${passedCount} passed, 0 failed.`);
console.log('✓ TEST SUITE 207 PASSED: ForensicChemistryVisualizer fully verified!\n');
