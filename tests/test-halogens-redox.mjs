// tests/test-halogens-redox.mjs
/**
 * ELEMENTA — Test Suite 194: Halogens (Group VIIA) & Hydrogen Halides Domain Engine
 * Conforms to GDPT 2018 Chemistry Grade 10 (Chủ đề 7: Nhóm Halogen) & IUPAC Standards
 */

import assert from 'assert';
import {
  HALOGEN_ELEMENTS_CATALOG,
  simulateHalogenDisplacement,
  HYDROGEN_HALIDES_CATALOG,
  simulateBleachingProduct,
  simulateStarchIodineTest
} from '../src/domain/halogensRedoxEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 194: HALOGENS (GROUP VIIA) DOMAIN ENGINE');
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

// 1. Halogen Elements & Periodic Trends
test('Catalog contains all 4 major halogens (F, Cl, Br, I)', () => {
  assert.strictEqual(HALOGEN_ELEMENTS_CATALOG.length, 4);
});

test('Electronegativity decreases down group VIIA: F > Cl > Br > I', () => {
  const f = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'F');
  const cl = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'Cl');
  const br = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'Br');
  const i = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'I');

  assert.ok(f.electronegativityPauling > cl.electronegativityPauling);
  assert.ok(cl.electronegativityPauling > br.electronegativityPauling);
  assert.ok(br.electronegativityPauling > i.electronegativityPauling);
  assert.strictEqual(f.electronegativityPauling, 3.98);
});

test('Standard reduction potential E° follows oxidizing power: F2 > Cl2 > Br2 > I2', () => {
  const f = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'F');
  const cl = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'Cl');
  const br = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'Br');
  const i = HALOGEN_ELEMENTS_CATALOG.find(h => h.symbol === 'I');

  assert.ok(f.standardReductionPotentialE0V > cl.standardReductionPotentialE0V);
  assert.ok(cl.standardReductionPotentialE0V > br.standardReductionPotentialE0V);
  assert.ok(br.standardReductionPotentialE0V > i.standardReductionPotentialE0V);
  assert.strictEqual(f.standardReductionPotentialE0V, 2.87);
});

// 2. Halogen Displacement in Solution
test('Chlorine displaces bromide from NaBr solution yielding Br2', () => {
  const res = simulateHalogenDisplacement('Cl2', 'NaBr');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.chemicalEquation.includes('Cl2 + 2NaBr -> 2NaCl + Br2'));
  assert.ok(res.organicExtractionColorVi.includes('ĐỎ NÂU'));
});

test('Chlorine displaces iodide from NaI solution yielding I2 (violet organic layer)', () => {
  const res = simulateHalogenDisplacement('Cl2', 'NaI');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.organicExtractionColorVi.includes('TÍM'));
});

test('Bromine displaces iodide from NaI solution', () => {
  const res = simulateHalogenDisplacement('Br2', 'NaI');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.chemicalEquation.includes('Br2 + 2NaI -> 2NaBr + I2'));
});

test('Bromine cannot displace chloride from NaCl solution', () => {
  const res = simulateHalogenDisplacement('Br2', 'NaCl');
  assert.strictEqual(res.reactionOccurs, false);
});

test('Iodine cannot displace bromide from NaBr solution', () => {
  const res = simulateHalogenDisplacement('I2', 'NaBr');
  assert.strictEqual(res.reactionOccurs, false);
});

test('Fluorine cannot be used in aqueous solution because it decomposes water violently', () => {
  const res = simulateHalogenDisplacement('F2', 'NaCl');
  assert.ok(res.chemicalEquation.includes('2F2 + 2H2O -> 4HF + O2'));
  assert.ok(res.explanationVi.includes('QUY TẮC BẤT DI BẤT DỊCH'));
});

// 3. Hydrogen Halides & Hydrohalic Acids
test('Acid strength in water increases down the group: HF (weak) < HCl < HBr < HI (strongest)', () => {
  const hf = HYDROGEN_HALIDES_CATALOG['HF'];
  const hcl = HYDROGEN_HALIDES_CATALOG['HCl'];
  const hbr = HYDROGEN_HALIDES_CATALOG['HBr'];
  const hi = HYDROGEN_HALIDES_CATALOG['HI'];

  assert.strictEqual(hf.pKaInWater, 3.17);
  assert.ok(hf.pKaInWater > 0); // weak acid
  assert.ok(hcl.pKaInWater < 0); // strong acid
  assert.ok(hi.pKaInWater < hbr.pKaInWater); // HI is strongest
});

test('Reducing power increases down the group: HBr reduces H2SO4 to SO2, HI reduces to H2S', () => {
  const hcl = HYDROGEN_HALIDES_CATALOG['HCl'];
  const hbr = HYDROGEN_HALIDES_CATALOG['HBr'];
  const hi = HYDROGEN_HALIDES_CATALOG['HI'];

  assert.strictEqual(hcl.reactionWithConcH2SO4.occurs, false);
  assert.strictEqual(hbr.reactionWithConcH2SO4.occurs, true);
  assert.ok(hbr.reactionWithConcH2SO4.redoxEquation.includes('SO2'));
  assert.strictEqual(hi.reactionWithConcH2SO4.occurs, true);
  assert.ok(hi.reactionWithConcH2SO4.redoxEquation.includes('H2S'));
});

test('Hydrofluoric acid (HF) uniquely dissolves glass via SiO2 etching', () => {
  const hf = HYDROGEN_HALIDES_CATALOG['HF'];
  assert.ok(hf.specialReactionsVi.includes('SiO2 + 4HF -> SiF4'));
  assert.ok(hf.specialReactionsVi.includes('Polyethylene (PE)'));
});

// 4. Javel Water & Bleaching Powder (CaOCl2)
test('Javel water synthesis reaction and hypochlorite active bleaching species verified', () => {
  const javel = simulateBleachingProduct('JAVEL_WATER');
  assert.ok(javel.chemicalEquation.includes('Cl2 + 2NaOH -> NaCl + NaClO + H2O'));
  assert.ok(javel.activeSpeciesVi.includes('ClO-'));
  assert.ok(javel.bleachingMechanismVi.includes('HClO'));
});

test('Bleaching powder is a mixed salt of calcium with Cl- and ClO- ions', () => {
  const powder = simulateBleachingProduct('BLEACHING_POWDER_CAOCl2');
  assert.ok(powder.chemicalEquation.includes('CaOCl2'));
  assert.ok(powder.activeSpeciesVi.includes('muối hỗn tạp') || powder.activeSpeciesVi.includes('Muối hỗn tạp'));
});

// 5. Starch-Iodine Diagnostic Test
test('Starch-iodine test produces deep blue-purple color at room temperature', () => {
  const testRoom = simulateStarchIodineTest(true, 25);
  assert.strictEqual(testRoom.isPositive, true);
  assert.ok(testRoom.colorVi.includes('Xanh tím'));
  assert.ok(testRoom.explanationVi.includes('amylose'));
});

test('Starch-iodine complex decolorizes upon heating above 70°C', () => {
  const testHot = simulateStarchIodineTest(true, 80);
  assert.ok(testHot.colorVi.includes('Mất màu xanh'));
  assert.ok(testHot.explanationVi.includes('dãn nở'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / 16 TESTS PASSED`);
console.log(' TEST SUITE 194 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
