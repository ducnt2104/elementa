// test-crystallography-visualizer.mjs
// Test Suite 84: Crystallography, Unit Cells & Solid-State Chemistry
// Conforming to Vietnam GDPT 2018 (Hóa 10 Chương 3: Liên kết hóa học & Tinh thể) & IUPAC Standards

import assert from 'assert';
import {
  CRYSTAL_SYSTEMS,
  CURRICULUM_CRYSTAL_PRESETS,
  calculateCrystalDensity,
  calculateLatticeConstantFromRadius,
  calculateAtomicRadiusFromLatticeConstant,
  calculateAtomicPackingFactor,
  calculateBraggDiffraction,
  getMatchingCrystalPreset
} from './src/domain/crystallographyEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 Starting Test Suite 84: Crystallography, Unit Cells & Solid-State Chemistry...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. 7 Crystal Systems Catalog Integrity
runTest('1. CRYSTAL_SYSTEMS catalog: contains all 7 crystal systems with geometric axes and angles', () => {
  const systemKeys = Object.keys(CRYSTAL_SYSTEMS);
  assert.strictEqual(systemKeys.length, 7);
  assert(systemKeys.includes('CUBIC'));
  assert(systemKeys.includes('TETRAGONAL'));
  assert(systemKeys.includes('ORTHORHOMBIC'));
  assert(systemKeys.includes('HEXAGONAL'));
  assert(systemKeys.includes('RHOMBOHEDRAL'));
  assert(systemKeys.includes('MONOCLINIC'));
  assert(systemKeys.includes('TRICLINIC'));

  // Cubic must have a=b=c and alpha=beta=gamma=90°
  const cubic = CRYSTAL_SYSTEMS.CUBIC;
  assert.strictEqual(cubic.axesRelationVI, 'a = b = c');
  assert.strictEqual(cubic.anglesRelationVI, 'α = β = γ = 90°');
});

// 2. 14 Bravais Lattices Summation
runTest('2. 14 Bravais Lattices: sum of lattice types across 7 systems is exactly 14', () => {
  let totalBravais = 0;
  for (const sys of Object.values(CRYSTAL_SYSTEMS)) {
    totalBravais += sys.bravaisLatticeTypesVI.length;
  }
  // Cubic (3) + Tetragonal (2) + Orthorhombic (4) + Hexagonal (1) + Rhombohedral (1) + Monoclinic (2) + Triclinic (1) = 14
  assert.strictEqual(totalBravais, 14);
});

// 3. Curriculum Benchmark Presets Integrity
runTest('3. CURRICULUM_CRYSTAL_PRESETS catalog: contains 8 key curriculum solids', () => {
  const presetKeys = Object.keys(CURRICULUM_CRYSTAL_PRESETS);
  assert.strictEqual(presetKeys.length, 8);
  assert(presetKeys.includes('copper_fcc'));
  assert(presetKeys.includes('iron_alpha_bcc'));
  assert(presetKeys.includes('polonium_alpha_sc'));
  assert(presetKeys.includes('carbon_diamond'));
  assert(presetKeys.includes('sodium_chloride_rocksalt'));
  assert(presetKeys.includes('cesium_chloride'));
  assert(presetKeys.includes('zinc_blende'));
  assert(presetKeys.includes('calcium_fluorite'));
});

// 4. Cubic Lattice Atom Counts (Z)
runTest('4. Number of atoms/units per cell (Z): SC=1, BCC=2, FCC=4, Diamond=8', () => {
  assert.strictEqual(CURRICULUM_CRYSTAL_PRESETS.polonium_alpha_sc.atomsOrFormulaUnitsPerCell, 1);
  assert.strictEqual(CURRICULUM_CRYSTAL_PRESETS.iron_alpha_bcc.atomsOrFormulaUnitsPerCell, 2);
  assert.strictEqual(CURRICULUM_CRYSTAL_PRESETS.copper_fcc.atomsOrFormulaUnitsPerCell, 4);
  assert.strictEqual(CURRICULUM_CRYSTAL_PRESETS.carbon_diamond.atomsOrFormulaUnitsPerCell, 8);
});

// 5. Atomic Packing Factor (APF) & Kepler Limit
runTest('5. calculateAtomicPackingFactor: verifies SC ~52.36%, BCC ~68.02%, FCC ~74.05%, Diamond ~34.01%', () => {
  const sc = calculateAtomicPackingFactor('SIMPLE_CUBIC');
  assert.strictEqual(sc.apfPercent, 52.36);
  assert.strictEqual(sc.voidSpacePercent, 47.64);

  const bcc = calculateAtomicPackingFactor('BODY_CENTERED_CUBIC');
  assert.strictEqual(bcc.apfPercent, 68.02);

  const fcc = calculateAtomicPackingFactor('FACE_CENTERED_CUBIC');
  assert.strictEqual(fcc.apfPercent, 74.05); // Kepler close packing maximum

  const diamond = calculateAtomicPackingFactor('DIAMOND_CUBIC');
  assert.strictEqual(diamond.apfPercent, 34.01);
});

// 6. Lattice Parameter (a) from Atomic Radius (r)
runTest('6. calculateLatticeConstantFromRadius: computes a from r for all 4 cubic systems', () => {
  const r = 100; // pm
  const scA = calculateLatticeConstantFromRadius(r, 'SIMPLE_CUBIC');
  assert.strictEqual(scA.latticeEdgeA_pm, 200);

  const bccA = calculateLatticeConstantFromRadius(r, 'BODY_CENTERED_CUBIC');
  assert(Math.abs(bccA.latticeEdgeA_pm - (400 / Math.sqrt(3))) < 0.1);

  const fccA = calculateLatticeConstantFromRadius(r, 'FACE_CENTERED_CUBIC');
  assert(Math.abs(fccA.latticeEdgeA_pm - (400 / Math.sqrt(2))) < 0.1);

  const diamondA = calculateLatticeConstantFromRadius(r, 'DIAMOND_CUBIC');
  assert(Math.abs(diamondA.latticeEdgeA_pm - (800 / Math.sqrt(3))) < 0.1);
});

// 7. Atomic Radius (r) from Lattice Parameter (a)
runTest('7. calculateAtomicRadiusFromLatticeConstant: computes r from a for all 4 cubic systems', () => {
  const a = 400; // pm
  const scR = calculateAtomicRadiusFromLatticeConstant(a, 'SIMPLE_CUBIC');
  assert.strictEqual(scR.radiusPm, 200);

  const bccR = calculateAtomicRadiusFromLatticeConstant(a, 'BODY_CENTERED_CUBIC');
  assert(Math.abs(bccR.radiusPm - (400 * Math.sqrt(3) / 4)) < 0.1);

  const fccR = calculateAtomicRadiusFromLatticeConstant(a, 'FACE_CENTERED_CUBIC');
  assert(Math.abs(fccR.radiusPm - (400 * Math.sqrt(2) / 4)) < 0.1);

  const diamondR = calculateAtomicRadiusFromLatticeConstant(a, 'DIAMOND_CUBIC');
  assert(Math.abs(diamondR.radiusPm - (400 * Math.sqrt(3) / 8)) < 0.1);
});

// 8. Theoretical Crystal Density Calculator
runTest('8. calculateCrystalDensity: verifies theoretical densities for Cu, Fe, and NaCl', () => {
  // Copper FCC: M = 63.546, Z = 4, a = 361.5 pm -> density ~ 8.94 g/cm3
  const cuDensity = calculateCrystalDensity(63.546, 4, 361.5);
  assert(Math.abs(cuDensity.densityGcm3 - 8.94) < 0.05);

  // Iron BCC: M = 55.845, Z = 2, a = 286.6 pm -> density ~ 7.87 g/cm3
  const feDensity = calculateCrystalDensity(55.845, 2, 286.6);
  assert(Math.abs(feDensity.densityGcm3 - 7.87) < 0.05);

  // NaCl Rocksalt: M = 58.44, Z = 4, a = 564.0 pm -> density ~ 2.165 g/cm3
  const naclDensity = calculateCrystalDensity(58.44, 4, 564.0);
  assert(Math.abs(naclDensity.densityGcm3 - 2.165) < 0.05);
});

// 9. Pauling Radius Ratio Rules for Ionic Crystals
runTest('9. Pauling radius ratio rules: validates octahedral NaCl (0.564) and cubic CsCl (0.923)', () => {
  const nacl = CURRICULUM_CRYSTAL_PRESETS.sodium_chloride_rocksalt;
  const naclRatio = nacl.cationRadiusPm / nacl.anionRadiusPm; // 102 / 181 = 0.5635
  assert(naclRatio >= 0.414 && naclRatio < 0.732, 'NaCl must fall in octahedral range [0.414, 0.732)');
  assert.strictEqual(nacl.coordinationNumber, '6 : 6');

  const cscl = CURRICULUM_CRYSTAL_PRESETS.cesium_chloride;
  const csclRatio = cscl.cationRadiusPm / cscl.anionRadiusPm; // 167 / 181 = 0.9226
  assert(csclRatio >= 0.732 && csclRatio < 1.0, 'CsCl must fall in cubic range [0.732, 1.0)');
  assert.strictEqual(cscl.coordinationNumber, '8 : 8');

  const zns = CURRICULUM_CRYSTAL_PRESETS.zinc_blende;
  const znsRatio = zns.cationRadiusPm / zns.anionRadiusPm; // 74 / 184 = 0.402
  assert(znsRatio >= 0.225 && znsRatio < 0.414, 'ZnS must fall in tetrahedral range [0.225, 0.414)');
  assert.strictEqual(zns.coordinationNumber, '4 : 4');
});

// 10. Bragg XRD Diffraction Law (n*lambda = 2*d*sin(theta))
runTest('10. calculateBraggDiffraction: computes interplanar distance d and 2*theta peak angle', () => {
  // Cu FCC: a = 361.5 pm, Cu K-alpha lambda = 154.06 pm
  // For (1 1 1) plane: d = 361.5 / sqrt(1^2 + 1^2 + 1^2) = 361.5 / sqrt(3) = 208.71 pm
  // sin(theta) = 154.06 / (2 * 208.71) = 0.36908 -> theta = 21.66° -> 2*theta = 43.31°
  const bragg = calculateBraggDiffraction(154.06, 1, 1, 1, 361.5, 1);
  assert(Math.abs(bragg.interplanarDistancePm - 208.71) < 0.1);
  assert(Math.abs(bragg.thetaDegrees - 21.66) < 0.1);
  assert(Math.abs(bragg.twoThetaDegrees - 43.31) < 0.2);
  assert.strictEqual(bragg.isDiffractionPossible, true);

  // Impossible diffraction when lambda > 2d
  const impossible = calculateBraggDiffraction(500, 1, 1, 1, 361.5, 1);
  assert.strictEqual(impossible.isDiffractionPossible, false);
});

// 11. Card and Chemical Formula Matcher
runTest('11. getMatchingCrystalPreset: accurately matches metallic and ionic chemical formulas', () => {
  const cu = getMatchingCrystalPreset('Cu');
  assert(cu !== null);
  assert.strictEqual(cu.id, 'copper_fcc');

  const fe = getMatchingCrystalPreset('Fe');
  assert(fe !== null);
  assert.strictEqual(fe.id, 'iron_alpha_bcc');

  const nacl = getMatchingCrystalPreset('NaCl');
  assert(nacl !== null);
  assert.strictEqual(nacl.id, 'sodium_chloride_rocksalt');

  const diamond = getMatchingCrystalPreset('Diamond');
  assert(diamond !== null);
  assert.strictEqual(diamond.id, 'carbon_diamond');

  const unknown = getMatchingCrystalPreset('XYZ_UNKNOWN_ELEMENT');
  assert.strictEqual(unknown, null);
});

// 12. Procedural Audio Synthesis Methods
runTest('12. SoundEngine: playCrystalResonanceDing and playLatticeCleavageSnap execute without error', () => {
  assert.doesNotThrow(() => {
    sound.playCrystalResonanceDing();
    sound.playLatticeCleavageSnap();
  });
});

// 13. Mathematical Error Guards & Boundary Conditions
runTest('13. Boundary conditions: zero/negative parameters throw descriptive exceptions', () => {
  assert.throws(() => {
    calculateCrystalDensity(0, 4, 360);
  }, /Các thông số khối lượng mol, số nguyên tử và hằng số mạng phải lớn hơn 0/);

  assert.throws(() => {
    calculateLatticeConstantFromRadius(-50, 'SIMPLE_CUBIC');
  }, /Bán kính nguyên tử phải lớn hơn 0/);

  assert.throws(() => {
    calculateBraggDiffraction(154, 0, 0, 0, 360);
  }, /Chỉ số Miller \(hkl\) không thể đồng thời bằng 0/);
});

// 14. Unit Cell Volume Conversions
runTest('14. Unit Cell Volume conversion: 1 pm^3 equals exactly 1e-30 cm^3', () => {
  const edgePm = 400; // pm
  const res = calculateCrystalDensity(100, 4, edgePm);
  const expectedVolCm3 = Math.pow(edgePm * 1e-10, 3);
  assert(Math.abs(res.unitCellVolumeCm3 - expectedVolCm3) < 1e-35);
});

// 15. Diamond Open Tetrahedral Sp3 Lattice Special Properties
runTest('15. Diamond covalent lattice: verifies 8 atoms/cell, CN=4 and extreme Mohs hardness 10', () => {
  const diamond = CURRICULUM_CRYSTAL_PRESETS.carbon_diamond;
  assert.strictEqual(diamond.mohsHardness, 10.0);
  assert.strictEqual(diamond.coordinationNumber, 4);
  assert.strictEqual(diamond.atomsOrFormulaUnitsPerCell, 8);
  assert(diamond.cleavagePlanesVI.includes('{111}'));
});

console.log(`\n🎉 Test Suite 84 Completed Successfully: ${passedTests} / 15 tests passed (100% Pass)!\n`);
