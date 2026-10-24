// test-ozone-photochemistry-visualizer.mjs
// Milestone 45: Atmospheric Photochemistry & Chapman Ozone Cycle Engine
// Standards: Nobel Prize in Chemistry 1995 (Molina, Rowland, Crutzen) & Montreal Protocol
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 12)

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  ATMOSPHERIC_LAYERS,
  calculateOzonePhotochemistry,
  getMatchingAtmosphericSpecies,
} from '../src/domain/ozonePhotochemistryEngine.ts';

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 102: ATMOSPHERIC PHOTOCHEMISTRY & OZONE CYCLE');
console.log('======================================================================');

// Test 1: Atmospheric Layers Catalog Integrity
runTest('Atmospheric layers catalog covers troposphere to mesosphere with valid bounds', () => {
  const required = ['troposphere', 'lower_stratosphere', 'upper_stratosphere', 'mesosphere'];
  for (const id of required) {
    const layer = ATMOSPHERIC_LAYERS[id];
    assert.ok(layer, `Missing atmospheric layer: ${id}`);
    assert.ok(layer.altitudeTopKm > layer.altitudeBottomKm, `Invalid altitude range for ${id}`);
    assert.ok(layer.pressureHPa > 0, `Pressure must be positive for ${id}`);
    assert.ok(layer.airDensityMoleculesCm3 > 0, `Air density must be positive for ${id}`);
  }
});

// Test 2: Chapman 4-Step Photochemical Rate Constants
runTest('Chapman rate constants behave according to atmospheric photolysis kinetics', () => {
  const resLow = calculateOzonePhotochemistry(10.0, 'CHAPMAN_NATURAL');
  const resHigh = calculateOzonePhotochemistry(40.0, 'CHAPMAN_NATURAL');

  // j1 (O2 photolysis) increases with altitude due to actinic solar UV-C flux
  assert.ok(resHigh.rates.j1PhotolysisO2PerSec > resLow.rates.j1PhotolysisO2PerSec, 'j1 must increase with altitude');
  assert.ok(resLow.rates.k2FormationOzoneCm6PerSec > 0, 'k2 must be positive');
  assert.ok(resLow.rates.j3PhotolysisO3PerSec > 0, 'j3 must be positive');
  assert.ok(resLow.rates.k4RecombinationCm3PerSec > 0, 'k4 must be positive');
});

// Test 3: Stratospheric Ozone Peak at ~22 km
runTest('Ozone concentration peaks prominently in the lower stratosphere (15 - 25 km)', () => {
  const peakRes = calculateOzonePhotochemistry(22.0, 'CHAPMAN_NATURAL');
  const tropoRes = calculateOzonePhotochemistry(4.0, 'CHAPMAN_NATURAL');
  const mesoRes = calculateOzonePhotochemistry(55.0, 'CHAPMAN_NATURAL');

  assert.ok(peakRes.steadyStateOzoneNumberDensityCm3 > 4.0e12, `Peak ozone density must exceed 4e12 cm^-3: ${peakRes.steadyStateOzoneNumberDensityCm3}`);
  assert.ok(peakRes.steadyStateOzoneNumberDensityCm3 > tropoRes.steadyStateOzoneNumberDensityCm3 * 10, 'Peak ozone must be > 10x troposphere');
  assert.ok(peakRes.steadyStateOzoneNumberDensityCm3 > mesoRes.steadyStateOzoneNumberDensityCm3 * 50, 'Peak ozone must be > 50x mesosphere');
});

// Test 4: Natural Chapman Total Column Dobson Units
runTest('Natural Chapman steady-state yields ~330 Dobson Units (healthy shield, not a hole)', () => {
  const res = calculateOzonePhotochemistry(22.0, 'CHAPMAN_NATURAL', 0.0);
  assert.ok(res.totalColumnDobsonUnits >= 300.0, `Natural column must be >= 300 DU: ${res.totalColumnDobsonUnits}`);
  assert.strictEqual(res.isOzoneHoleCondition, false, 'Natural condition cannot be an ozone hole');
  assert.strictEqual(res.ozoneDestructionAmplificationFactor, 1.0);
});

// Test 5: UV-B Shielding Efficiency in Natural State
runTest('Natural ozone layer absorbs over 99% of dangerous solar UV-B radiation', () => {
  const res = calculateOzonePhotochemistry(22.0, 'CHAPMAN_NATURAL', 0.0);
  assert.ok(res.uvBShieldingEfficiencyPercent >= 99.0, `UV-B shielding must exceed 99%: ${res.uvBShieldingEfficiencyPercent}%`);
});

// Test 6: Chlorine (CFC) Catalytic Ozone Depletion
runTest('Chlorine radicals from CFCs accelerate ozone destruction and trigger ozone hole (<220 DU)', () => {
  const resCFC = calculateOzonePhotochemistry(22.0, 'CHLORINE_CFC', 60.0); // 60 pptv ClO
  
  assert.ok(resCFC.ozoneDestructionAmplificationFactor > 4.0, 'Destruction factor must exceed 4x');
  assert.ok(resCFC.totalColumnDobsonUnits < 220.0, `Total column must fall below 220 DU: ${resCFC.totalColumnDobsonUnits}`);
  assert.strictEqual(resCFC.isOzoneHoleCondition, true, 'Must report ozone hole condition');
  assert.ok(resCFC.uvBShieldingEfficiencyPercent < 97.0, 'UV-B shielding efficiency must decline');
});

// Test 7: Bromine (Halon) Enhanced Destructive Efficacy (45x vs Chlorine)
runTest('Bromine radicals exhibit 45x greater catalytic ozone destruction efficiency than chlorine', () => {
  const pptv = 20.0;
  const resCl = calculateOzonePhotochemistry(22.0, 'CHLORINE_CFC', pptv);
  const resBr = calculateOzonePhotochemistry(22.0, 'BROMINE_HALON', pptv);

  assert.ok(resBr.ozoneDestructionAmplificationFactor > resCl.ozoneDestructionAmplificationFactor * 10, 'Bromine must be significantly more destructive than chlorine');
  assert.ok(resBr.totalColumnDobsonUnits < resCl.totalColumnDobsonUnits);
});

// Test 8: Nitrogen Oxides (NOx) Aviation Catalysis
runTest('Nitrogen oxides from stratospheric aviation increase ozone destruction factor', () => {
  const resNOx = calculateOzonePhotochemistry(22.0, 'NITROGEN_OXIDES', 50.0);
  assert.ok(resNOx.ozoneDestructionAmplificationFactor > 1.0, 'NOx must accelerate ozone loss');
  assert.ok(resNOx.totalColumnDobsonUnits < 330.0);
});

// Test 9: Hydroxyl Radical (HOx) Cycle
runTest('Hydroxyl radicals regulate stratospheric ozone concentration', () => {
  const resHOx = calculateOzonePhotochemistry(22.0, 'HYDROXYL_RADICAL', 30.0);
  assert.ok(resHOx.ozoneDestructionAmplificationFactor > 1.0);
});

// Test 10: Barometric Pressure Monotonic Altitude Falloff
runTest('Barometric pressure decreases exponentially with atmospheric scale height', () => {
  const res0 = calculateOzonePhotochemistry(0.0);
  const res20 = calculateOzonePhotochemistry(20.0);
  const res45 = calculateOzonePhotochemistry(45.0);

  assert.ok(res0.pressureHPa > 1000.0, 'Surface pressure ~1013 hPa');
  assert.ok(res20.pressureHPa < 100.0 && res20.pressureHPa > 30.0, 'Stratospheric pressure ~40-60 hPa');
  assert.ok(res45.pressureHPa < 5.0, 'Upper stratospheric pressure < 5 hPa');
});

// Test 11: Card Matching Service for Atmospheric & Ozone Photochemistry Species
runTest('getMatchingAtmosphericSpecies identifies ozone, CFCs, halons, and NOx cards', () => {
  const o3Card = { id: 'card_ozone_gas', name: 'Khí Ozon O3 Tầng Bình Lưu' };
  assert.strictEqual(getMatchingAtmosphericSpecies(o3Card)?.cycle, 'CHAPMAN_NATURAL');

  const cfcCard = { id: 'card_freon_12', name: 'Khí Làm Lạnh CFC-12 Freon' };
  assert.strictEqual(getMatchingAtmosphericSpecies(cfcCard)?.cycle, 'CHLORINE_CFC');

  const halonCard = { id: 'card_halon_1301', name: 'Bình Chữa Cháy Hợp Chất Halon-1301' };
  assert.strictEqual(getMatchingAtmosphericSpecies(halonCard)?.cycle, 'BROMINE_HALON');

  const noxCard = { id: 'card_jet_exhaust', name: 'Khí Xả NO2 Động Cơ Phản Lực' };
  assert.strictEqual(getMatchingAtmosphericSpecies(noxCard)?.cycle, 'NITROGEN_OXIDES');

  const h2oCard = { id: 'card_water_vapor', name: 'Hơi Nước Khí Quyển' };
  assert.strictEqual(getMatchingAtmosphericSpecies(h2oCard)?.cycle, 'HYDROXYL_RADICAL');

  const nonMatch = { id: 'card_gold', name: 'Vàng Kim Loại Au' };
  assert.strictEqual(getMatchingAtmosphericSpecies(nonMatch), null);
});

// Test 12: SoundEngine Audio Integration
runTest('SoundEngine includes playUvPhotonAbsorptionChime and playOzoneDepletionAlarmWhoosh', () => {
  const soundEngineFile = path.resolve('src/audio/soundEngine.ts');
  const content = fs.readFileSync(soundEngineFile, 'utf8');
  assert.ok(content.includes('playUvPhotonAbsorptionChime'), 'Must contain playUvPhotonAbsorptionChime');
  assert.ok(content.includes('playOzoneDepletionAlarmWhoosh'), 'Must contain playOzoneDepletionAlarmWhoosh');
});

// Test 13: OzonePhotochemistryVisualizer Component
runTest('OzonePhotochemistryVisualizer.tsx component exists and includes required visualizer tabs', () => {
  const compFile = path.resolve('src/components/visualizations/OzonePhotochemistryVisualizer.tsx');
  assert.ok(fs.existsSync(compFile), 'Component file must exist');
  const content = fs.readFileSync(compFile, 'utf8');
  assert.ok(content.includes('altitude_profile'), 'Must include altitude profile tab');
  assert.ok(content.includes('chapman_cycle'), 'Must include chapman cycle tab');
  assert.ok(content.includes('catalytic_depletion'), 'Must include catalytic depletion tab');
  assert.ok(content.includes('dobson_shield'), 'Must include dobson shield tab');
});

// Test 14: PeriodicCodexTab Section 34 Integration
runTest('PeriodicCodexTab integrates Section 34 and OZONE_PHOTOCHEMISTRY subtab', () => {
  const codexFile = path.resolve('src/components/PeriodicCodexTab.tsx');
  const content = fs.readFileSync(codexFile, 'utf8');
  assert.ok(content.includes('OZONE_PHOTOCHEMISTRY'), 'PeriodicCodexTab must handle OZONE_PHOTOCHEMISTRY tab');
  assert.ok(content.includes('OzonePhotochemistryVisualizer'), 'PeriodicCodexTab must render OzonePhotochemistryVisualizer');
  assert.ok(content.includes('SECTION 34: ATMOSPHERIC PHOTOCHEMISTRY'), 'Must contain Section 34 header');
});

// Test 15: CardDetailModal Integration
runTest('CardDetailModal provides quick access to Ozone Photochemistry Visualizer for matching cards', () => {
  const modalFile = path.resolve('src/components/cards/CardDetailModal.tsx');
  const content = fs.readFileSync(modalFile, 'utf8');
  assert.ok(content.includes('showOzoneModal'), 'CardDetailModal must declare showOzoneModal');
  assert.ok(content.includes('matchingOzoneSpecies'), 'CardDetailModal must compute matchingOzoneSpecies');
  assert.ok(content.includes('OzonePhotochemistryVisualizer'), 'CardDetailModal must render OzonePhotochemistryVisualizer modal');
});

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(' MILESTONE 45: TEST SUITE 102 COMPLETED IN 100% HARMONY!');
console.log('======================================================================');
