// test-coordination-complex-visualizer.mjs
// Test Suite 76: Coordination Complex, Ligand Exchange & Crystal Field Theory Verification
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 4: Phức chất) & IUPAC Standards

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  CURRICULUM_LIGANDS,
  CURRICULUM_COORDINATION_COMPLEXES,
  CoordinationComplexEngine
} from '../src/domain/coordinationComplexEngine.ts';

console.log('======================================================================');
console.log('   TEST SUITE 76: COORDINATION COMPLEX & CRYSTAL FIELD THEORY');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}`);
    console.error(`         ${err.stack || err.message}`);
    failCount++;
  }
}

// ============================================================================
// 1. DOMAIN SPECIFICATION & CURRICULUM PRESETS INTEGRITY
// ============================================================================
console.log('--- 1. LIGANDS & COORDINATION COMPLEXES (GDPT 2018 STANDARDS) ---');

it('defines all core curriculum ligands with proper denticity and donor atoms', () => {
  const ligands = Object.values(CURRICULUM_LIGANDS);
  assert.ok(ligands.length >= 7);
  assert.strictEqual(CURRICULUM_LIGANDS.H2O.denticity, 1);
  assert.strictEqual(CURRICULUM_LIGANDS.NH3.denticity, 1);
  assert.strictEqual(CURRICULUM_LIGANDS.Cl_MINUS.charge, -1);
  assert.strictEqual(CURRICULUM_LIGANDS.EN.denticity, 2); // Bidentate chelate
  assert.strictEqual(CURRICULUM_LIGANDS.EDTA4_MINUS.denticity, 6); // Hexadentate
});

it('spectrochemical series orders ligands from weak to strong field', () => {
  assert.ok(CURRICULUM_LIGANDS.Cl_MINUS.spectrochemicalRank < CURRICULUM_LIGANDS.H2O.spectrochemicalRank);
  assert.ok(CURRICULUM_LIGANDS.H2O.spectrochemicalRank < CURRICULUM_LIGANDS.NH3.spectrochemicalRank);
  assert.ok(CURRICULUM_LIGANDS.NH3.spectrochemicalRank < CURRICULUM_LIGANDS.EN.spectrochemicalRank);
  assert.ok(CURRICULUM_LIGANDS.EN.spectrochemicalRank < CURRICULUM_LIGANDS.CN_MINUS.spectrochemicalRank);
});

it('defines 6 core curricular coordination complexes spanning all 4 geometries', () => {
  assert.strictEqual(CURRICULUM_COORDINATION_COMPLEXES.length, 6);
  const geometries = new Set(CURRICULUM_COORDINATION_COMPLEXES.map(c => c.geometry));
  assert.ok(geometries.has('OCTAHEDRAL'));
  assert.ok(geometries.has('TETRAHEDRAL'));
  assert.ok(geometries.has('SQUARE_PLANAR'));
  assert.ok(geometries.has('LINEAR'));
});

it('Tetraamminecopper(II) complex conforms to GDPT 2018 Lớp 12 specifications', () => {
  const cu = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_cu_nh3');
  assert.ok(cu);
  assert.strictEqual(cu.formula, '[Cu(NH3)4(H2O)2]2+');
  assert.strictEqual(cu.centralCationSymbol, 'Cu²⁺');
  assert.strictEqual(cu.coordinationNumber, 6);
  assert.strictEqual(cu.geometry, 'OCTAHEDRAL');
  assert.strictEqual(cu.dElectronCount, 9);
  assert.strictEqual(cu.solutionColorName_vi, 'Xanh lam thẫm (Da trời đậm)');
  assert.strictEqual(cu.precursorColorName_vi, 'Xanh lam nhạt');
  assert.ok(cu.logStabilityConstantBeta > 12.0); // beta_4 = 10^13.3
});

it('Tetrachloridocobaltate(II) complex models thermochromic tetrahedral equilibrium', () => {
  const co = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_co_cl');
  assert.ok(co);
  assert.strictEqual(co.formula, '[CoCl4]2-');
  assert.strictEqual(co.geometry, 'TETRAHEDRAL');
  assert.strictEqual(co.coordinationNumber, 4);
  assert.strictEqual(co.netCharge, -2);
  assert.strictEqual(co.solutionColorName_vi, 'Xanh chàm (Deep Cobalt Blue)');
  assert.strictEqual(co.precursorColorName_vi, 'Hồng phấn (Pink)');
});

it('Diamminesilver(I) complex models Tollens aldehyde mirror reagent', () => {
  const ag = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_ag_nh3');
  assert.ok(ag);
  assert.strictEqual(ag.formula, '[Ag(NH3)2]+');
  assert.strictEqual(ag.geometry, 'LINEAR');
  assert.strictEqual(ag.coordinationNumber, 2);
  assert.strictEqual(ag.dElectronCount, 10); // Full d10
  assert.ok(ag.pedagogicalRationaleVI.includes('Tollens'));
});

it('Cisplatin complex models square planar anticancer chemotherapy coordination geometry', () => {
  const pt = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_pt_cisplatin');
  assert.ok(pt);
  assert.strictEqual(pt.geometry, 'SQUARE_PLANAR');
  assert.strictEqual(pt.coordinationNumber, 4);
  assert.strictEqual(pt.netCharge, 0); // Neutral complex
  assert.ok(pt.pedagogicalRationaleVI.includes('cis-[Pt(NH3)2Cl2]'));
});

// ============================================================================
// 2. LIGAND EXCHANGE SIMULATION DYNAMICS
// ============================================================================
console.log('\n--- 2. LIGAND EXCHANGE SIMULATION DYNAMICS ---');

it('zero added ligand results in 0% complex formation and precursor color', () => {
  const result = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_cu_nh3',
    addedLigandConcentrationM: 0.0,
    temperatureCelsius: 25,
    excessLigand: false
  });
  assert.strictEqual(result.formationFractionPct, 0);
  assert.strictEqual(result.currentColorHex, result.complex.precursorColorHex);
  assert.strictEqual(result.observedColorNameVI, result.complex.precursorColorName_vi);
  assert.strictEqual(result.dominantSpeciesFormula, result.complex.precursorFormula);
});

it('high ligand concentration drives formation fraction to >95%', () => {
  const result = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_cu_nh3',
    addedLigandConcentrationM: 4.0,
    temperatureCelsius: 25,
    excessLigand: true
  });
  assert.ok(result.formationFractionPct >= 95, `Expected >= 95%, got ${result.formationFractionPct}%`);
  assert.strictEqual(result.currentColorHex, result.complex.solutionColorHex);
  assert.strictEqual(result.dominantSpeciesFormula, result.complex.formula);
});

it('dissolves precipitates when excess ligand is added', () => {
  const resCu = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_cu_nh3',
    addedLigandConcentrationM: 2.5,
    temperatureCelsius: 25,
    excessLigand: true
  });
  assert.strictEqual(resCu.isPrecipitateDissolved, true);

  const resAg = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_ag_nh3',
    addedLigandConcentrationM: 2.0,
    temperatureCelsius: 25,
    excessLigand: true
  });
  assert.strictEqual(resAg.isPrecipitateDissolved, true);
});

// ============================================================================
// 3. CRYSTAL FIELD THEORY (CFT) & ABSORPTION SPECTROSCOPY
// ============================================================================
console.log('\n--- 3. CRYSTAL FIELD THEORY (CFT) & SPECTROSCOPY ---');

it('calculates crystal field splitting Delta consistent with spectrochemical series', () => {
  const cu = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_cu_nh3');
  const co = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_co_cl');
  // Octahedral ammine has higher Delta than tetrahedral chlorido
  assert.ok(cu.crystalFieldSplitting_kJ > co.crystalFieldSplitting_kJ, 'Expected Delta_o(NH3) > Delta_t(Cl-)');
});

it('correctly associates absorbed wavelength with complementary visible color', () => {
  const cu = CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_cu_nh3');
  // Absorbs ~610 nm (orange-red) -> complementary royal deep blue
  assert.ok(cu.absorbedWavelength_nm >= 590 && cu.absorbedWavelength_nm <= 650);
  assert.ok(cu.complementaryColorName_vi.includes('Đỏ cam'));
});

// ============================================================================
// 4. GAMEPLAY TACTICAL BONUSES
// ============================================================================
console.log('\n--- 4. TACTICAL GAMEPLAY EFFECTS ---');

it('awards proper tactical tags and balanced shield amounts', () => {
  const resCu = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_cu_nh3',
    addedLigandConcentrationM: 3.0,
    temperatureCelsius: 25,
    excessLigand: true
  });
  assert.strictEqual(resCu.tacticalBonus.tacticalTag, 'COORDINATION_WARD');
  assert.ok(resCu.tacticalBonus.shieldAmount >= 300);
  assert.ok(resCu.tacticalBonus.tenacityBoostPct >= 20);

  const resCis = CoordinationComplexEngine.simulateLigandExchange({
    complexId: 'complex_pt_cisplatin',
    addedLigandConcentrationM: 2.0,
    temperatureCelsius: 25,
    excessLigand: true
  });
  assert.strictEqual(resCis.tacticalBonus.tacticalTag, 'CHELATE_LOCK');
});

// ============================================================================
// 5. COMPONENT SOURCE CODE INTEGRATION AUDIT
// ============================================================================
console.log('\n--- 5. UI VISUALIZER & APP INTEGRATION INTEGRITY ---');

it('CoordinationComplexVisualizer.tsx exists and contains essential SVG apparatus and geometry', () => {
  const compPath = path.resolve('src/components/visualizations/CoordinationComplexVisualizer.tsx');
  assert.ok(fs.existsSync(compPath));
  const code = fs.readFileSync(compPath, 'utf8');
  assert.ok(code.includes('coordination-complex-visualizer'));
  assert.ok(code.includes('OCTAHEDRAL'));
  assert.ok(code.includes('TETRAHEDRAL'));
  assert.ok(code.includes('SQUARE_PLANAR'));
  assert.ok(code.includes('LINEAR'));
  assert.ok(code.includes('CRYSTAL_FIELD'));
  assert.ok(code.includes('SIMULATION'));
  assert.ok(code.includes('PEDAGOGY'));
  assert.ok(code.includes('TACTICAL'));
});

it('PeriodicCodexTab.tsx includes Coordination Complex tab and component import', () => {
  const tabPath = path.resolve('src/components/PeriodicCodexTab.tsx');
  assert.ok(fs.existsSync(tabPath));
  const code = fs.readFileSync(tabPath, 'utf8');
  assert.ok(code.includes('CoordinationComplexVisualizer'));
  assert.ok(code.includes('COORDINATION_COMPLEX'));
  assert.ok(code.includes('Phức Chất & CFT'));
});

it('CardDetailModal.tsx contains Coordination Complex detection and modal launcher', () => {
  const modalPath = path.resolve('src/components/cards/CardDetailModal.tsx');
  assert.ok(fs.existsSync(modalPath));
  const code = fs.readFileSync(modalPath, 'utf8');
  assert.ok(code.includes('CoordinationComplexVisualizer'));
  assert.ok(code.includes('matchingComplex'));
  assert.ok(code.includes('showComplexModal'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${passCount + failCount} TESTS PASSED`);
if (failCount > 0) {
  console.error(` ❌ ${failCount} TESTS FAILED`);
  process.exit(1);
} else {
  console.log(' 100% SUCCESS — COORDINATION COMPLEX & CFT VALIDATED!');
  console.log('======================================================================\n');
}
