// test-orbital-engine.mjs
// Automated Verification Suite for Quantum Orbital Engine, Aufbau Principle, Hund's Rule & IUPAC Anomalies
// Calibrated to Vietnam GDPT 2018 Chemistry Grade 10 & IUPAC Standards

import assert from 'assert';
import {
  computeElectronStructure,
  computeIonElectronStructure,
  computeMagneticProperty,
  toSuperscript,
  getShellElectrons
} from '../src/domain/orbitalEngine.ts';
import { ALL_ELEMENTS } from '../src/data/elementsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: QUANTUM ORBITAL & ELECTRON CONFIG AUDIT       ');
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

// 1. Aufbau Principle & Madelung Rule
console.log('--- 1. Aufbau Principle & Madelung (n + l) Order ---');

it('Hydrogen (Z=1): 1s¹ with 1 unpaired electron', () => {
  const h = computeElectronStructure(1, 'H');
  assert.strictEqual(h.fullConfigString, '1s¹');
  assert.strictEqual(h.totalUnpairedElectrons, 1);
  assert.strictEqual(h.valenceElectrons, 1);
  assert.strictEqual(h.elementClass, 'NONMETAL');
});

it('Helium (Z=2): 1s² with 0 unpaired electrons (Duet noble gas)', () => {
  const he = computeElectronStructure(2, 'He');
  assert.strictEqual(he.fullConfigString, '1s²');
  assert.strictEqual(he.totalUnpairedElectrons, 0);
  assert.strictEqual(he.elementClass, 'NOBLE_GAS');
});

it('Carbon (Z=6): 1s² 2s² 2p² with 2 unpaired electrons (Hund Rule in 2p)', () => {
  const c = computeElectronStructure(6, 'C');
  assert.strictEqual(c.fullConfigString, '1s² 2s² 2p²');
  assert.strictEqual(c.nobleGasConfigString, '[He] 2s² 2p²');
  assert.strictEqual(c.totalUnpairedElectrons, 2);
  assert.strictEqual(c.valenceElectrons, 4);
});

it('Nitrogen (Z=7): 1s² 2s² 2p³ with 3 unpaired electrons (Half-filled 2p subshell)', () => {
  const n = computeElectronStructure(7, 'N');
  assert.strictEqual(n.fullConfigString, '1s² 2s² 2p³');
  assert.strictEqual(n.nobleGasConfigString, '[He] 2s² 2p³');
  assert.strictEqual(n.totalUnpairedElectrons, 3);
  assert.strictEqual(n.valenceElectrons, 5);
});

it('Neon (Z=10): [He] 2s² 2p⁶ with 0 unpaired electrons (Octet noble gas)', () => {
  const ne = computeElectronStructure(10, 'Ne');
  assert.strictEqual(ne.fullConfigString, '1s² 2s² 2p⁶');
  assert.strictEqual(ne.totalUnpairedElectrons, 0);
  assert.strictEqual(ne.elementClass, 'NOBLE_GAS');
});

it('Sodium (Z=11): [Ne] 3s¹ with 1 valence electron and alkali metal tendency', () => {
  const na = computeElectronStructure(11, 'Na');
  assert.strictEqual(na.nobleGasConfigString, '[Ne] 3s¹');
  assert.strictEqual(na.valenceElectrons, 1);
  assert.strictEqual(na.elementClass, 'METAL');
  assert(na.chemicalTendencyVI.includes('nhường 1 electron'));
});

// 2. Transition Metal Half-Filled & Fully-Filled Anomalies
console.log('\n--- 2. Transition Metal Stability Anomalies (Cr, Cu, Mo, Ag, Au) ---');

it('Chromium (Z=24): [Ar] 3d⁵ 4s¹ anomaly (half-filled d stability) with 6 unpaired electrons', () => {
  const cr = computeElectronStructure(24, 'Cr');
  assert.strictEqual(cr.nobleGasConfigString, '[Ar] 3d⁵ 4s¹');
  assert.strictEqual(cr.totalUnpairedElectrons, 6); // 5 in 3d + 1 in 4s
  assert.strictEqual(cr.valenceElectrons, 6);
});

it('Iron (Z=26): [Ar] 3d⁶ 4s² with 4 unpaired electrons in 3d', () => {
  const fe = computeElectronStructure(26, 'Fe');
  assert.strictEqual(fe.nobleGasConfigString, '[Ar] 3d⁶ 4s²');
  assert.strictEqual(fe.totalUnpairedElectrons, 4);
  assert.strictEqual(fe.valenceElectrons, 8); // 2 in 4s + 6 in 3d
});

it('Copper (Z=29): [Ar] 3d¹⁰ 4s¹ anomaly (fully-filled d stability) with 1 unpaired electron', () => {
  const cu = computeElectronStructure(29, 'Cu');
  assert.strictEqual(cu.nobleGasConfigString, '[Ar] 3d¹⁰ 4s¹');
  assert.strictEqual(cu.totalUnpairedElectrons, 1);
  assert.strictEqual(cu.valenceElectrons, 1); // 4s1 (3d is completely filled)
});

it('Palladium (Z=46): [Kr] 4d¹⁰ 5s⁰ anomaly with 0 unpaired electrons', () => {
  const pd = computeElectronStructure(46, 'Pd');
  assert.strictEqual(pd.nobleGasConfigString, '[Kr] 4d¹⁰');
  assert.strictEqual(pd.totalUnpairedElectrons, 0);
});

it('Gold (Z=79): [Xe] 4f¹⁴ 5d¹⁰ 6s¹ anomaly with 1 unpaired electron', () => {
  const au = computeElectronStructure(79, 'Au');
  assert.strictEqual(au.nobleGasConfigString, '[Xe] 4f¹⁴ 5d¹⁰ 6s¹');
  assert.strictEqual(au.totalUnpairedElectrons, 1);
  assert.strictEqual(au.valenceElectrons, 1);
});

// 3. Complete 118 Elements Conservation & Structural Audit
console.log('\n--- 3. 118 Elements Total Electron Conservation Audit ---');

it('All 118 periodic elements conserve total electrons equal to atomic number Z', () => {
  assert.strictEqual(ALL_ELEMENTS.length, 118);

  for (const elem of ALL_ELEMENTS) {
    const struct = computeElectronStructure(elem.z, elem.symbol);
    const sumElectrons = struct.subshells.reduce((acc, s) => acc + s.electronCount, 0);
    assert.strictEqual(
      sumElectrons,
      elem.z,
      `Electron count mismatch for ${elem.symbol} (Z=${elem.z}): got ${sumElectrons}`
    );
    assert(struct.fullConfigString.length > 0);
    assert(
      struct.valenceElectrons >= 1 && struct.valenceElectrons <= 18,
      `Invalid valence electrons for ${elem.symbol} (Z=${elem.z}): ${struct.valenceElectrons}`
    );
  }
});

it('Superscript helper correctly maps digits', () => {
  assert.strictEqual(toSuperscript(14), '¹⁴');
  assert.strictEqual(toSuperscript(10), '¹⁰');
  assert.strictEqual(toSuperscript(5), '⁵');
});

// 4. Principal Quantum Shell (K, L, M, N, O, P, Q) Distribution Audit
console.log('\n--- 4. Principal Quantum Shell Distribution Engine Audit ---');

it('Calculates correct Bohr-Sommerfeld shell distribution for representative and anomaly elements', () => {
  // Hydrogen (Z=1) -> [1]
  assert.deepStrictEqual(getShellElectrons(1, 'H'), [1]);
  // Helium (Z=2) -> [2]
  assert.deepStrictEqual(getShellElectrons(2, 'He'), [2]);
  // Carbon (Z=6) -> [2, 4]
  assert.deepStrictEqual(getShellElectrons(6, 'C'), [2, 4]);
  // Neon (Z=10) -> [2, 8]
  assert.deepStrictEqual(getShellElectrons(10, 'Ne'), [2, 8]);
  // Sodium (Z=11) -> [2, 8, 1]
  assert.deepStrictEqual(getShellElectrons(11, 'Na'), [2, 8, 1]);
  // Chlorine (Z=17) -> [2, 8, 7]
  assert.deepStrictEqual(getShellElectrons(17, 'Cl'), [2, 8, 7]);
  // Argon (Z=18) -> [2, 8, 8]
  assert.deepStrictEqual(getShellElectrons(18, 'Ar'), [2, 8, 8]);
  // Calcium (Z=20) -> [2, 8, 8, 2]
  assert.deepStrictEqual(getShellElectrons(20, 'Ca'), [2, 8, 8, 2]);
  // Chromium (Z=24) -> [2, 8, 13, 1]
  assert.deepStrictEqual(getShellElectrons(24, 'Cr'), [2, 8, 13, 1]);
  // Iron (Z=26) -> [2, 8, 14, 2]
  assert.deepStrictEqual(getShellElectrons(26, 'Fe'), [2, 8, 14, 2]);
  // Copper (Z=29) -> [2, 8, 18, 1]
  assert.deepStrictEqual(getShellElectrons(29, 'Cu'), [2, 8, 18, 1]);
  // Zinc (Z=30) -> [2, 8, 18, 2]
  assert.deepStrictEqual(getShellElectrons(30, 'Zn'), [2, 8, 18, 2]);
  // Bromine (Z=35) -> [2, 8, 18, 7]
  assert.deepStrictEqual(getShellElectrons(35, 'Br'), [2, 8, 18, 7]);
  // Silver (Z=47) -> [2, 8, 18, 18, 1]
  assert.deepStrictEqual(getShellElectrons(47, 'Ag'), [2, 8, 18, 18, 1]);
  // Gold (Z=79) -> [2, 8, 18, 32, 18, 1]
  assert.deepStrictEqual(getShellElectrons(79, 'Au'), [2, 8, 18, 32, 18, 1]);
  // Oganesson (Z=118) -> [2, 8, 18, 32, 32, 18, 8]
  assert.deepStrictEqual(getShellElectrons(118, 'Og'), [2, 8, 18, 32, 32, 18, 8]);
});

it('All 118 elements conserve total shell electrons equal to atomic number Z', () => {
  for (const elem of ALL_ELEMENTS) {
    const shells = getShellElectrons(elem.z, elem.symbol);
    const sum = shells.reduce((a, b) => a + b, 0);
    assert.strictEqual(sum, elem.z, `Shell sum mismatch for ${elem.symbol} (Z=${elem.z}): ${sum} !== ${elem.z}`);
    assert(shells.length >= 1 && shells.length <= 7, `Invalid shell count for ${elem.symbol}: ${shells.length}`);
  }
});

// 5. Atomic Magnetic Character & Spin-Only Moment (Bohr Magnetons) Audit
console.log('\n--- 5. Atomic Magnetic Character & Spin-Only Moment Audit ---');

it('Spin-only magnetic moment formula μ = sqrt(n*(n+2)) accurately computes for n = 0 to 6', () => {
  assert.strictEqual(computeMagneticProperty(0).magneticType, 'DIAMAGNETIC');
  assert.strictEqual(computeMagneticProperty(0).magneticMomentBohrMagneton, 0.0);

  // n = 1: sqrt(3) ~ 1.73
  const p1 = computeMagneticProperty(1);
  assert.strictEqual(p1.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(p1.magneticMomentBohrMagneton, 1.73);

  // n = 2: sqrt(8) ~ 2.83
  const p2 = computeMagneticProperty(2);
  assert.strictEqual(p2.magneticMomentBohrMagneton, 2.83);

  // n = 3: sqrt(15) ~ 3.87
  const p3 = computeMagneticProperty(3);
  assert.strictEqual(p3.magneticMomentBohrMagneton, 3.87);

  // n = 4: sqrt(24) ~ 4.90
  const p4 = computeMagneticProperty(4);
  assert.strictEqual(p4.magneticMomentBohrMagneton, 4.90);

  // n = 5: sqrt(35) ~ 5.92
  const p5 = computeMagneticProperty(5);
  assert.strictEqual(p5.magneticMomentBohrMagneton, 5.92);

  // n = 6: sqrt(48) ~ 6.93
  const p6 = computeMagneticProperty(6);
  assert.strictEqual(p6.magneticMomentBohrMagneton, 6.93);
});

it('Noble gases (He, Ne, Ar, Kr, Xe, Rn) and full-subshell metals (Mg, Ca, Zn) are strictly diamagnetic', () => {
  const diamagneticElements = [
    { z: 2, s: 'He' },
    { z: 10, s: 'Ne' },
    { z: 12, s: 'Mg' },
    { z: 18, s: 'Ar' },
    { z: 20, s: 'Ca' },
    { z: 30, s: 'Zn' },
    { z: 36, s: 'Kr' },
    { z: 54, s: 'Xe' },
    { z: 86, s: 'Rn' }
  ];

  for (const elem of diamagneticElements) {
    const struct = computeElectronStructure(elem.z, elem.s);
    assert.strictEqual(struct.totalUnpairedElectrons, 0, `${elem.s} must have 0 unpaired electrons`);
    assert.strictEqual(struct.magneticProperty.magneticType, 'DIAMAGNETIC', `${elem.s} must be diamagnetic`);
    assert.strictEqual(struct.magneticProperty.magneticMomentBohrMagneton, 0.0);
  }
});

it('Chromium (Z=24) exhibits maximum spin-only magnetic moment in Period 4 (μ = 6.93 BM)', () => {
  const cr = computeElectronStructure(24, 'Cr');
  assert.strictEqual(cr.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(cr.magneticProperty.unpairedCount, 6);
  assert.strictEqual(cr.magneticProperty.magneticMomentBohrMagneton, 6.93);

  // Iron (Z=26) has 4 unpaired electrons (μ = 4.90 BM)
  const fe = computeElectronStructure(26, 'Fe');
  assert.strictEqual(fe.magneticProperty.unpairedCount, 4);
  assert.strictEqual(fe.magneticProperty.magneticMomentBohrMagneton, 4.90);
});

it('Nitrogen (Z=7) and Oxygen (Z=8) correctly identify paramagnetic ground states', () => {
  const n = computeElectronStructure(7, 'N');
  assert.strictEqual(n.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(n.magneticProperty.unpairedCount, 3);
  assert.strictEqual(n.magneticProperty.magneticMomentBohrMagneton, 3.87);

  const o = computeElectronStructure(8, 'O');
  assert.strictEqual(o.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(o.magneticProperty.unpairedCount, 2);
  assert.strictEqual(o.magneticProperty.magneticMomentBohrMagneton, 2.83);
});

// 6. Hund's Rule Box-by-Box Orbital Spin Invariants
console.log('\n--- 6. Hund\'s Rule Box-by-Box Orbital Spin Invariants ---');

it('Hund\'s rule distributes parallel spins (+1/2) in separate degenerate boxes before pairing', () => {
  // Nitrogen 2p³: 3 boxes, all spinUp = true, all spinDown = false
  const n = computeElectronStructure(7, 'N');
  const n2p = n.subshells.find(s => s.subshell === '2p');
  assert(n2p, 'Nitrogen must have 2p subshell');
  assert.strictEqual(n2p.boxes.length, 3, '2p subshell has 3 orbital boxes');
  assert.strictEqual(n2p.boxes[0].spinUp, true);
  assert.strictEqual(n2p.boxes[0].spinDown, false);
  assert.strictEqual(n2p.boxes[1].spinUp, true);
  assert.strictEqual(n2p.boxes[1].spinDown, false);
  assert.strictEqual(n2p.boxes[2].spinUp, true);
  assert.strictEqual(n2p.boxes[2].spinDown, false);

  // Oxygen 2p⁴: 3 boxes, 1 paired (spinUp + spinDown), 2 unpaired (spinUp only)
  const o = computeElectronStructure(8, 'O');
  const o2p = o.subshells.find(s => s.subshell === '2p');
  assert(o2p, 'Oxygen must have 2p subshell');
  assert.strictEqual(o2p.boxes[0].spinUp, true);
  assert.strictEqual(o2p.boxes[0].spinDown, true, 'First 2p box is paired');
  assert.strictEqual(o2p.boxes[1].spinUp, true);
  assert.strictEqual(o2p.boxes[1].spinDown, false, 'Second 2p box is unpaired');
  assert.strictEqual(o2p.boxes[2].spinUp, true);
  assert.strictEqual(o2p.boxes[2].spinDown, false, 'Third 2p box is unpaired');

  // Chromium 3d⁵: 5 boxes in 3d, all 5 have spinUp = true, spinDown = false
  const cr = computeElectronStructure(24, 'Cr');
  const cr3d = cr.subshells.find(s => s.subshell === '3d');
  assert(cr3d, 'Chromium must have 3d subshell');
  assert.strictEqual(cr3d.boxes.length, 5, '3d subshell has 5 orbital boxes');
  for (let b = 0; b < 5; b++) {
    assert.strictEqual(cr3d.boxes[b].spinUp, true, `Chromium 3d box ${b} must have spinUp`);
    assert.strictEqual(cr3d.boxes[b].spinDown, false, `Chromium 3d box ${b} must NOT have spinDown`);
  }
});

// 7. Valence Shell Principal Quantum Number (n = 1 to 7)
console.log('\n--- 7. Valence Shell Principal Quantum Number Across 7 Periods ---');

it('Valence shell principal quantum number n strictly matches elemental period', () => {
  const periodProbes = [
    { z: 1, s: 'H', expectedN: 1 },
    { z: 6, s: 'C', expectedN: 2 },
    { z: 11, s: 'Na', expectedN: 3 },
    { z: 26, s: 'Fe', expectedN: 4 },
    { z: 47, s: 'Ag', expectedN: 5 }, // Ag has 5s¹
    { z: 79, s: 'Au', expectedN: 6 }, // Au has 6s¹
    { z: 118, s: 'Og', expectedN: 7 } // Og has 7s² 7p⁶
  ];

  for (const probe of periodProbes) {
    const struct = computeElectronStructure(probe.z, probe.s);
    assert.strictEqual(struct.valenceShellPrincipalN, probe.expectedN, `${probe.s} (Z=${probe.z}) valenceShellPrincipalN must be ${probe.expectedN}`);
  }

  // Special Anomaly: Palladium (Z=46, [Kr] 4d¹⁰ 5s⁰) has empty 5s subshell, so occupied max N is 4
  const pd = computeElectronStructure(46, 'Pd');
  assert.strictEqual(pd.valenceShellPrincipalN, 4, 'Palladium [Kr] 4d¹⁰ 5s⁰ has occupied max N = 4');
});

// 8. Chemical Tendency & Element Classification Invariants
console.log('\n--- 8. Chemical Tendency & Element Classification Invariants ---');

it('Correctly classifies metals, nonmetals, noble gases, and metalloids with pedagogical rationale', () => {
  // Noble gas
  const ne = computeElectronStructure(10, 'Ne');
  assert.strictEqual(ne.elementClass, 'NOBLE_GAS');
  assert(ne.chemicalTendencyVI.includes('Octet/Duet') && ne.chemicalTendencyVI.includes('bền vững'));

  // Metalloid (Silicon)
  const si = computeElectronStructure(14, 'Si');
  assert.strictEqual(si.elementClass, 'METALLOID');
  assert(si.chemicalTendencyVI.includes('bán kim'));

  // Metal (Sodium)
  const na = computeElectronStructure(11, 'Na');
  assert.strictEqual(na.elementClass, 'METAL');
  assert(na.chemicalTendencyVI.includes('nhường 1 electron') && na.chemicalTendencyVI.includes('tính khử'));

  // Nonmetal (Chlorine)
  const cl = computeElectronStructure(17, 'Cl');
  assert.strictEqual(cl.elementClass, 'NONMETAL');
  assert(cl.chemicalTendencyVI.includes('nhận thêm 1 electron') && cl.chemicalTendencyVI.includes('tính oxi hóa'));
});

// 9. Isoelectronic Species & Noble Gas Equivalence Audit
console.log('\n--- 9. Isoelectronic Species & Noble Gas Equivalence Audit ---');

it('Correctly models 10-electron isoelectronic series (O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺) to Neon configuration', () => {
  const isoelectronic10 = [
    { z: 8, symbol: 'O', charge: -2, notation: 'O²⁻' },
    { z: 9, symbol: 'F', charge: -1, notation: 'F⁻' },
    { z: 10, symbol: 'Ne', charge: 0, notation: 'Ne' },
    { z: 11, symbol: 'Na', charge: 1, notation: 'Na⁺' },
    { z: 12, symbol: 'Mg', charge: 2, notation: 'Mg²⁺' },
    { z: 13, symbol: 'Al', charge: 3, notation: 'Al³⁺' }
  ];

  for (const item of isoelectronic10) {
    const ion = computeIonElectronStructure(item.z, item.symbol, item.charge);
    assert.strictEqual(ion.totalElectrons, 10, `${item.symbol} ion must have exactly 10 electrons`);
    assert.strictEqual(ion.ionNotation, item.notation, `Ion notation mismatch: got ${ion.ionNotation}, expected ${item.notation}`);
    assert.strictEqual(ion.isIsoelectronicWithNobleGas, true, `${item.symbol} ion must be isoelectronic with noble gas`);
    assert.strictEqual(ion.nobleGasEquivalent, 'Ne', `${item.symbol} ion must be isoelectronic with Neon`);
    assert.strictEqual(ion.totalUnpairedElectrons, 0, `${item.symbol} ion must have 0 unpaired electrons`);
    assert.strictEqual(ion.magneticProperty.magneticType, 'DIAMAGNETIC');
    assert.strictEqual(ion.magneticProperty.magneticMomentBohrMagneton, 0.0);
    assert.strictEqual(ion.configString, '1s² 2s² 2p⁶');
  }
});

it('Correctly identifies 18-electron isoelectronic species (Cl⁻, K⁺, Ca²⁺, Sc³⁺, Ti⁴⁺) to Argon configuration', () => {
  const isoelectronic18 = [
    { z: 17, symbol: 'Cl', charge: -1, notation: 'Cl⁻' },
    { z: 19, symbol: 'K', charge: 1, notation: 'K⁺' },
    { z: 20, symbol: 'Ca', charge: 2, notation: 'Ca²⁺' },
    { z: 21, symbol: 'Sc', charge: 3, notation: 'Sc³⁺' },
    { z: 22, symbol: 'Ti', charge: 4, notation: 'Ti⁴⁺' }
  ];

  for (const item of isoelectronic18) {
    const ion = computeIonElectronStructure(item.z, item.symbol, item.charge);
    assert.strictEqual(ion.totalElectrons, 18, `${item.symbol} ion must have 18 electrons`);
    assert.strictEqual(ion.isIsoelectronicWithNobleGas, true);
    assert.strictEqual(ion.nobleGasEquivalent, 'Ar');
    assert.strictEqual(ion.totalUnpairedElectrons, 0);
    assert.strictEqual(ion.magneticProperty.magneticType, 'DIAMAGNETIC');
    assert.strictEqual(ion.configString, '1s² 2s² 2p⁶ 3s² 3p⁶');
  }
});

// 10. Transition Metal Ionization Rules (4s stripped before 3d) & Magnetic Character
console.log('\n--- 10. Transition Metal Ionization Order & Magnetic Moment Invariants ---');

it('Iron (Z=26, [Ar] 3d⁶ 4s²) strips 4s electrons first in Fe²⁺ and Fe³⁺ cations', () => {
  // Fe²⁺: charge = +2 -> loses 4s² -> [Ar] 3d⁶
  const fe2 = computeIonElectronStructure(26, 'Fe', 2);
  assert.strictEqual(fe2.charge, 2);
  assert.strictEqual(fe2.ionNotation, 'Fe²⁺');
  assert.strictEqual(fe2.totalElectrons, 24);
  assert.strictEqual(fe2.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶');
  assert.strictEqual(fe2.totalUnpairedElectrons, 4, 'Fe²⁺ (3d⁶) has 4 unpaired electrons in 3d');
  assert.strictEqual(fe2.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(fe2.magneticProperty.magneticMomentBohrMagneton, 4.90);

  // Fe³⁺: charge = +3 -> loses 4s² then 1 from 3d -> [Ar] 3d⁵ (half-filled stability)
  const fe3 = computeIonElectronStructure(26, 'Fe', 3);
  assert.strictEqual(fe3.charge, 3);
  assert.strictEqual(fe3.ionNotation, 'Fe³⁺');
  assert.strictEqual(fe3.totalElectrons, 23);
  assert.strictEqual(fe3.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵');
  assert.strictEqual(fe3.totalUnpairedElectrons, 5, 'Fe³⁺ (3d⁵) has 5 unpaired electrons');
  assert.strictEqual(fe3.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(fe3.magneticProperty.magneticMomentBohrMagneton, 5.92);
});

it('Copper (Z=29) and Zinc (Z=30) cation ionization and magnetic character', () => {
  // Cu⁺ (Z=29, loses 4s¹) -> [Ar] 3d¹⁰ (0 unpaired, diamagnetic)
  const cu1 = computeIonElectronStructure(29, 'Cu', 1);
  assert.strictEqual(cu1.ionNotation, 'Cu⁺');
  assert.strictEqual(cu1.totalElectrons, 28);
  assert.strictEqual(cu1.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰');
  assert.strictEqual(cu1.totalUnpairedElectrons, 0);
  assert.strictEqual(cu1.magneticProperty.magneticType, 'DIAMAGNETIC');
  assert.strictEqual(cu1.magneticProperty.magneticMomentBohrMagneton, 0.0);

  // Cu²⁺ (Z=29, loses 4s¹ then 1 from 3d) -> [Ar] 3d⁹ (1 unpaired, paramagnetic)
  const cu2 = computeIonElectronStructure(29, 'Cu', 2);
  assert.strictEqual(cu2.ionNotation, 'Cu²⁺');
  assert.strictEqual(cu2.totalElectrons, 27);
  assert.strictEqual(cu2.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁹');
  assert.strictEqual(cu2.totalUnpairedElectrons, 1);
  assert.strictEqual(cu2.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(cu2.magneticProperty.magneticMomentBohrMagneton, 1.73);

  // Zn²⁺ (Z=30, loses 4s²) -> [Ar] 3d¹⁰ (0 unpaired, diamagnetic)
  const zn2 = computeIonElectronStructure(30, 'Zn', 2);
  assert.strictEqual(zn2.ionNotation, 'Zn²⁺');
  assert.strictEqual(zn2.totalElectrons, 28);
  assert.strictEqual(zn2.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰');
  assert.strictEqual(zn2.totalUnpairedElectrons, 0);
  assert.strictEqual(zn2.magneticProperty.magneticType, 'DIAMAGNETIC');
  assert.strictEqual(zn2.magneticProperty.magneticMomentBohrMagneton, 0.0);
});

// 11. Additional 2e- and 36e- Isoelectronic Series Invariants
console.log('\n--- 11. 2-Electron (Helium) and 36-Electron (Krypton) Isoelectronic Series ---');

it('Correctly identifies 2-electron isoelectronic species (H⁻, Li⁺, Be²⁺) to Helium duet configuration', () => {
  const isoelectronic2 = [
    { z: 1, symbol: 'H', charge: -1, notation: 'H⁻' },
    { z: 3, symbol: 'Li', charge: 1, notation: 'Li⁺' },
    { z: 4, symbol: 'Be', charge: 2, notation: 'Be²⁺' }
  ];

  for (const item of isoelectronic2) {
    const ion = computeIonElectronStructure(item.z, item.symbol, item.charge);
    assert.strictEqual(ion.totalElectrons, 2, `${item.symbol} ion must have 2 electrons`);
    assert.strictEqual(ion.isIsoelectronicWithNobleGas, true);
    assert.strictEqual(ion.nobleGasEquivalent, 'He');
    assert.strictEqual(ion.totalUnpairedElectrons, 0);
    assert.strictEqual(ion.magneticProperty.magneticType, 'DIAMAGNETIC');
    assert.strictEqual(ion.configString, '1s²');
  }
});

it('Correctly identifies 36-electron isoelectronic species (Br⁻, Rb⁺, Sr²⁺, Y³⁺, Zr⁴⁺) to Krypton octet configuration', () => {
  const isoelectronic36 = [
    { z: 35, symbol: 'Br', charge: -1, notation: 'Br⁻' },
    { z: 37, symbol: 'Rb', charge: 1, notation: 'Rb⁺' },
    { z: 38, symbol: 'Sr', charge: 2, notation: 'Sr²⁺' },
    { z: 39, symbol: 'Y', charge: 3, notation: 'Y³⁺' },
    { z: 40, symbol: 'Zr', charge: 4, notation: 'Zr⁴⁺' }
  ];

  for (const item of isoelectronic36) {
    const ion = computeIonElectronStructure(item.z, item.symbol, item.charge);
    assert.strictEqual(ion.totalElectrons, 36, `${item.symbol} ion must have 36 electrons`);
    assert.strictEqual(ion.isIsoelectronicWithNobleGas, true);
    assert.strictEqual(ion.nobleGasEquivalent, 'Kr');
    assert.strictEqual(ion.totalUnpairedElectrons, 0);
    assert.strictEqual(ion.magneticProperty.magneticType, 'DIAMAGNETIC');
    assert.strictEqual(ion.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶');
  }
});

// 12. Manganese (Mn²⁺) and Chromium (Cr³⁺) Cation Ionization & Magnetic Moments
console.log('\n--- 12. Manganese (Mn²⁺) and Chromium (Cr³⁺) Cation Ionization ---');

it('Manganese (Z=25) and Chromium (Z=24) cation ionization and spin-only magnetic moments', () => {
  // Mn²⁺: Z=25 ([Ar] 3d⁵ 4s²), loses 4s² -> [Ar] 3d⁵ (5 unpaired electrons in 3d, μ = 5.92 BM)
  const mn2 = computeIonElectronStructure(25, 'Mn', 2);
  assert.strictEqual(mn2.ionNotation, 'Mn²⁺');
  assert.strictEqual(mn2.totalElectrons, 23);
  assert.strictEqual(mn2.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵');
  assert.strictEqual(mn2.totalUnpairedElectrons, 5);
  assert.strictEqual(mn2.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(mn2.magneticProperty.magneticMomentBohrMagneton, 5.92);

  // Cr³⁺: Z=24 ([Ar] 3d⁵ 4s¹), loses 4s¹ then two 3d -> [Ar] 3d³ (3 unpaired electrons in 3d, μ = 3.87 BM)
  const cr3 = computeIonElectronStructure(24, 'Cr', 3);
  assert.strictEqual(cr3.ionNotation, 'Cr³⁺');
  assert.strictEqual(cr3.totalElectrons, 21);
  assert.strictEqual(cr3.configString, '1s² 2s² 2p⁶ 3s² 3p⁶ 3d³');
  assert.strictEqual(cr3.totalUnpairedElectrons, 3);
  assert.strictEqual(cr3.magneticProperty.magneticType, 'PARAMAGNETIC');
  assert.strictEqual(cr3.magneticProperty.magneticMomentBohrMagneton, 3.87);
});

console.log('============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
