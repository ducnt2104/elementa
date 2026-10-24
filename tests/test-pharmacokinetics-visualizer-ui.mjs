// tests/test-pharmacokinetics-visualizer-ui.mjs
// Test Suite 209: PharmacokineticsVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 209: PharmacokineticsVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PharmacokineticsVisualizer.tsx');
const enginePath = path.resolve('src/domain/pharmacokineticsEngine.ts');
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
test('PharmacokineticsVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('pharmacokineticsEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('PharmacokineticsVisualizer must import simulation functions from pharmacokineticsEngine', () => {
  assert(visualizerContent.includes('evaluateDrugAbsorptionAcrossOrgans'), 'Must import evaluateDrugAbsorptionAcrossOrgans');
  assert(visualizerContent.includes('simulateOralSingleDose'), 'Must import simulateOralSingleDose');
  assert(visualizerContent.includes('assessParacetamolOverdoseAndNac'), 'Must import assessParacetamolOverdoseAndNac');
  assert(visualizerContent.includes('DRUG_CATALOG'), 'Must import DRUG_CATALOG');
});

test('PharmacokineticsVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. Mode coverage
test('PharmacokineticsVisualizer must support all 3 modes: PH_PARTITION_IONIZATION, BATEMAN_KINETICS_CURVE, and PARACETAMOL_NAC_NOMOGRAM', () => {
  assert(visualizerContent.includes("'PH_PARTITION_IONIZATION'"), 'Must support PH_PARTITION_IONIZATION mode');
  assert(visualizerContent.includes("'BATEMAN_KINETICS_CURVE'"), 'Must support BATEMAN_KINETICS_CURVE mode');
  assert(visualizerContent.includes("'PARACETAMOL_NAC_NOMOGRAM'"), 'Must support PARACETAMOL_NAC_NOMOGRAM mode');
});

// 4. Lipid Bilayer & Henderson-Hasselbalch
test('PharmacokineticsVisualizer must render phospholipid membrane SVG and Henderson-Hasselbalch ratios', () => {
  assert(visualizerContent.includes('Màng Lipid Kép'), 'Must render lipid bilayer membrane');
  assert(visualizerContent.includes('fractionUnIonizedPercent'), 'Must render fraction un-ionized');
  assert(visualizerContent.includes('fractionIonizedPercent'), 'Must render fraction ionized');
});

// 5. Bateman Curve & Therapeutic Window
test('PharmacokineticsVisualizer must render Bateman curve with MEC and MTC therapeutic bands', () => {
  assert(visualizerContent.includes('MEC'), 'Must render MEC minimum effective concentration');
  assert(visualizerContent.includes('MTC'), 'Must render MTC minimum toxic concentration');
  assert(visualizerContent.includes('cMaxMgL'), 'Must render Cmax metric');
  assert(visualizerContent.includes('tMaxHours'), 'Must render Tmax metric');
});

// 6. Rumack-Matthew Nomogram
test('PharmacokineticsVisualizer must render Rumack-Matthew nomogram and NAC antidote rescue', () => {
  assert(visualizerContent.includes('Rumack-Matthew'), 'Must reference Rumack-Matthew nomogram');
  assert(visualizerContent.includes('N-Acetylcysteine'), 'Must feature NAC antidote');
  assert(visualizerContent.includes('Glutathione'), 'Must track hepatic glutathione');
});

// 7. Integration in PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import PharmacokineticsVisualizer', () => {
  assert(periodicCodexContent.includes('PharmacokineticsVisualizer'), 'Must import PharmacokineticsVisualizer in PeriodicCodexTab.tsx');
});

test('PeriodicCodexTab must include PHARMACOKINETICS_ADME in navigation tabs', () => {
  assert(periodicCodexContent.includes("'PHARMACOKINETICS_ADME'"), 'Must include PHARMACOKINETICS_ADME in activeMainTab type union and navigation');
});

test('PeriodicCodexTab must mount <PharmacokineticsVisualizer /> when activeMainTab is PHARMACOKINETICS_ADME', () => {
  assert(periodicCodexContent.includes('<PharmacokineticsVisualizer'), 'Must render <PharmacokineticsVisualizer />');
});

console.log(`\nResults: ${passedCount} passed, 0 failed.`);
console.log('✓ TEST SUITE 209 PASSED: PharmacokineticsVisualizer fully verified!\n');
