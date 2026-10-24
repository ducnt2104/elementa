// test-flame-test.mjs
// Automated Verification Suite for ELEMENTA Flame Test Spectroscopy (Thử Màu Ngọn Lửa)
// Conforming strictly to Vietnam GDPT 2018 Chemistry Standards (Grade 10 & 12)

import assert from 'assert';
import { FLAME_TEST_CATALOG } from './src/components/visualizations/FlameTestVisualizer.tsx';
import { ALL_ELEMENTS } from './src/data/elementsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: FLAME TEST SPECTROSCOPY SCIENTIFIC AUDIT      ');
console.log('============================================================\n');

let passedAssertions = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedAssertions++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Core Elements Coverage
console.log('--- 1. Flagship Alkali & Alkaline Earth Flame Colors (GDPT 2018) ---');

const REQUIRED_SYMBOLS = ['Li', 'Na', 'K', 'Rb', 'Cs', 'Ca', 'Sr', 'Ba', 'Cu', 'B', 'Mg', 'Fe'];

it('Catalog contains all 12 flagship analytical chemistry flame test elements', () => {
  for (const sym of REQUIRED_SYMBOLS) {
    assert.ok(FLAME_TEST_CATALOG[sym] !== undefined, `Missing flame test data for ${sym}`);
    assert.strictEqual(FLAME_TEST_CATALOG[sym].hasFlameColor, true);
  }
});

it('Lithium (Li) has Crimson Red flame (~670 nm)', () => {
  const li = FLAME_TEST_CATALOG['Li'];
  assert.ok(li.colorNameVI.includes('Đỏ thẫm'));
  assert.strictEqual(li.colorHex, '#E0115F');
  assert.ok(li.wavelengthNm.includes('670.8'));
});

it('Sodium (Na) has Bright Golden Yellow flame and double D-lines (589 nm)', () => {
  const na = FLAME_TEST_CATALOG['Na'];
  assert.ok(na.colorNameVI.includes('Vàng chói'));
  assert.strictEqual(na.colorHex, '#FFD700');
  assert.ok(na.wavelengthNm.includes('589.0'));
  assert.ok(na.spectralLineDescVI.includes('D-lines') || na.spectralLineDescVI.includes('Vạch D'));
});

it('Potassium (K) has Lilac flame and strictly requires Cobalt Glass filter', () => {
  const k = FLAME_TEST_CATALOG['K'];
  assert.ok(k.colorNameVI.includes('Tím hoa cà'));
  assert.strictEqual(k.requiresCobaltGlass, true, 'Potassium flame test must flag cobalt glass requirement');
  assert.ok(k.wavelengthNm.includes('766.5'));
});

it('Rubidium (Rb) has Reddish-Violet flame (~780 nm)', () => {
  const rb = FLAME_TEST_CATALOG['Rb'];
  assert.ok(rb.colorNameVI.includes('Đỏ tím'));
  assert.strictEqual(rb.colorHex, '#C71585');
  assert.ok(rb.wavelengthNm.includes('780.0'));
});

it('Caesium (Cs) has Azure Sky Blue flame (~455 nm)', () => {
  const cs = FLAME_TEST_CATALOG['Cs'];
  assert.ok(cs.colorNameVI.includes('Xanh lam'));
  assert.strictEqual(cs.colorHex, '#00BFFF');
  assert.ok(cs.wavelengthNm.includes('455.5'));
});

it('Calcium (Ca) has Brick Red flame (~622 nm)', () => {
  const ca = FLAME_TEST_CATALOG['Ca'];
  assert.ok(ca.colorNameVI.includes('Đỏ gạch') || ca.colorNameVI.includes('Đỏ da cam'));
  assert.strictEqual(ca.colorHex, '#FF4500');
});

it('Strontium (Sr) has Scarlet Crimson Red flame (~650 nm)', () => {
  const sr = FLAME_TEST_CATALOG['Sr'];
  assert.ok(sr.colorNameVI.includes('Đỏ son'));
  assert.strictEqual(sr.colorHex, '#DC143C');
});

it('Barium (Ba) has Apple Green flame (~524 nm)', () => {
  const ba = FLAME_TEST_CATALOG['Ba'];
  assert.ok(ba.colorNameVI.includes('Lục nõn chuối') || ba.colorNameVI.includes('Vàng lục'));
  assert.strictEqual(ba.colorHex, '#7FFF00');
});

it('Copper (Cu) has Emerald Blue-Green flame (CuCl 510-520 nm)', () => {
  const cu = FLAME_TEST_CATALOG['Cu'];
  assert.ok(cu.colorNameVI.includes('Xanh lục bảo') || cu.colorNameVI.includes('lam ngọc'));
  assert.strictEqual(cu.colorHex, '#00FA9A');
});

it('Boron (B) has Bright Apple Green flame from BO2 radical (~546 nm)', () => {
  const b = FLAME_TEST_CATALOG['B'];
  assert.ok(b.colorNameVI.includes('Xanh lục tươi'));
  assert.strictEqual(b.colorHex, '#39FF14');
  assert.ok(b.spectralLineDescVI.includes('BO₂'));
});

it('Magnesium (Mg) has Blinding White Light from 3100K incandescent emission', () => {
  const mg = FLAME_TEST_CATALOG['Mg'];
  assert.ok(mg.colorNameVI.includes('Trắng chói'));
  assert.strictEqual(mg.colorHex, '#FFFFFF');
  assert.ok(mg.wavelengthNm.includes('285.2 nm'));
});

it('Iron (Fe) has Golden Sparks with multi-line atomic emission', () => {
  const fe = FLAME_TEST_CATALOG['Fe'];
  assert.ok(fe.colorNameVI.includes('Tia lửa vàng kim'));
  assert.strictEqual(fe.colorHex, '#F4A460');
  assert.ok(fe.wavelengthNm.includes('371.9 nm'));
});

// 2. Cross-referencing Elements Catalog
console.log('\n--- 2. Element Catalog Cross-Referencing ---');

it('All symbols in FLAME_TEST_CATALOG exist in ALL_ELEMENTS database', () => {
  const elementSymbols = new Set(ALL_ELEMENTS.map(e => e.symbol));
  for (const sym of Object.keys(FLAME_TEST_CATALOG)) {
    assert.ok(elementSymbols.has(sym), `Symbol ${sym} in flame catalog must exist in ALL_ELEMENTS`);
  }
});

it('Noble gases and nonmetals return undefined flame data safely without exceptions', () => {
  assert.strictEqual(FLAME_TEST_CATALOG['He'], undefined);
  assert.strictEqual(FLAME_TEST_CATALOG['Ne'], undefined);
  assert.strictEqual(FLAME_TEST_CATALOG['Ar'], undefined);
  assert.strictEqual(FLAME_TEST_CATALOG['C'], undefined);
});

// 3. Optical Filter & Hex Standards
console.log('\n--- 3. Cobalt Glass Filter Exclusivity & Hex Code Standards ---');

it('Cobalt glass filter is required exclusively for Potassium (K) to filter sodium D-line flare', () => {
  assert.strictEqual(FLAME_TEST_CATALOG['K'].requiresCobaltGlass, true);
  for (const sym of REQUIRED_SYMBOLS) {
    if (sym !== 'K') {
      assert.notStrictEqual(FLAME_TEST_CATALOG[sym].requiresCobaltGlass, true, `${sym} must not require cobalt glass`);
    }
  }
});

it('All 12 elements have valid 7-character #RRGGBB hex colors, secondary accents, and glow rgba', () => {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  for (const sym of REQUIRED_SYMBOLS) {
    const data = FLAME_TEST_CATALOG[sym];
    assert.ok(hexRegex.test(data.colorHex), `colorHex for ${sym} (${data.colorHex}) must be valid 7-char hex`);
    if (data.secondaryHex) {
      assert.ok(hexRegex.test(data.secondaryHex), `secondaryHex for ${sym} (${data.secondaryHex}) must be valid 7-char hex`);
    }
    assert.ok(data.glowHex.startsWith('rgba('), `glowHex for ${sym} must be rgba string`);
  }
});

it('All 12 elements have non-empty spectral explanations and experimental notes', () => {
  for (const sym of REQUIRED_SYMBOLS) {
    const data = FLAME_TEST_CATALOG[sym];
    assert.ok(data.spectralLineDescVI && data.spectralLineDescVI.length > 15, `Spectral line desc missing for ${sym}`);
    assert.ok(data.experimentalNoteVI && data.experimentalNoteVI.length > 20, `Experimental note missing for ${sym}`);
  }
});

// 4. Quantum Spectroscopy & Planck-Einstein Relation (E = hc / lambda)
console.log('\n--- 4. Quantum Spectroscopy & Planck-Einstein Relation ---');

it('Shorter emission wavelengths strictly produce higher quantum photon energies (E = hc / λ)', () => {
  function calculatePhotonEnergyEv(lambdaNm) {
    return 1239.84 / lambdaNm;
  }

  const eCs = calculatePhotonEnergyEv(455.5); // Blue photon
  const eNa = calculatePhotonEnergyEv(589.0); // Golden yellow photon
  const eLi = calculatePhotonEnergyEv(670.8); // Crimson red photon
  const eK  = calculatePhotonEnergyEv(766.5); // Deep red/violet component

  assert.ok(eCs > eNa, `Blue photon (${eCs.toFixed(2)} eV) must be higher energy than Yellow (${eNa.toFixed(2)} eV)`);
  assert.ok(eNa > eLi, `Yellow photon (${eNa.toFixed(2)} eV) must be higher energy than Red (${eLi.toFixed(2)} eV)`);
  assert.ok(eLi > eK,  `Red photon (${eLi.toFixed(2)} eV) must be higher energy than Far-Red (${eK.toFixed(2)} eV)`);
});

it('Magnesium ultraviolet band (285.2 nm) has highest quantum energy among emission markers (> 4.0 eV)', () => {
  const eMg = 1239.84 / 285.2;
  assert.ok(eMg > 4.0, `Mg UV emission must exceed 4.0 eV (got ${eMg.toFixed(2)} eV)`);
  assert.ok(eMg < 4.5);
});

// 5. Pyrotechnic Chemistry & Environmental Applications
console.log('\n--- 5. Pyrotechnic Chemistry & Fireworks Applications ---');

it('Alkali and alkaline earth metals catalog contains practical pyrotechnic fireworks roles', () => {
  const sr = FLAME_TEST_CATALOG['Sr'];
  const ba = FLAME_TEST_CATALOG['Ba'];
  const cu = FLAME_TEST_CATALOG['Cu'];
  const fe = FLAME_TEST_CATALOG['Fe'];

  assert.ok(sr.experimentalNoteVI.includes('pháo hoa') || sr.spectralLineDescVI.includes('pháo'), 'Sr must mention pyrotechnic use');
  assert.ok(ba.experimentalNoteVI.includes('pháo hoa') || ba.spectralLineDescVI.includes('pháo'), 'Ba must mention fireworks role');
  assert.ok(cu.colorNameVI.includes('Xanh lục') || cu.experimentalNoteVI.includes('xanh'), 'Cu must describe blue-green coloration');
  assert.ok(fe.colorNameVI.includes('Tia lửa') || fe.spectralLineDescVI.includes('tia lửa'), 'Fe must describe sparkler effect');
});

// 6. Bohr Model Balmer Visible Series & Quantum Leap Energy Hierarchy
console.log('\n--- 6. Bohr Model Balmer Emission Series & Quantum Energy Hierarchy ---');

it('Hydrogen Balmer series emissions strictly follow Rydberg quantum transition energy hierarchy', () => {
  const balmerSeries = [
    { name: 'H-alpha', n_upper: 3, n_lower: 2, lambdaNm: 656.3, color: 'Red' },
    { name: 'H-beta',  n_upper: 4, n_lower: 2, lambdaNm: 486.1, color: 'Cyan' },
    { name: 'H-gamma', n_upper: 5, n_lower: 2, lambdaNm: 434.0, color: 'Blue-Violet' },
    { name: 'H-delta', n_upper: 6, n_lower: 2, lambdaNm: 410.2, color: 'Violet' }
  ];

  for (let i = 0; i < balmerSeries.length - 1; i++) {
    const lowerJump = balmerSeries[i];
    const higherJump = balmerSeries[i + 1];

    const energyLower = 1239.84 / lowerJump.lambdaNm;
    const energyHigher = 1239.84 / higherJump.lambdaNm;

    // Higher delta n transition must emit shorter wavelength and higher photon energy
    assert.ok(higherJump.lambdaNm < lowerJump.lambdaNm, `Higher transition ${higherJump.name} must have shorter wavelength`);
    assert.ok(energyHigher > energyLower, `Higher transition ${higherJump.name} must yield higher photon energy`);
  }
});

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
