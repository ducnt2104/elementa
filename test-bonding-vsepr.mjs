// test-bonding-vsepr.mjs
// Automated Verification Suite for Chemical Bonding Engine & VSEPR Molecular Geometry
// Calibrated to Vietnam GDPT 2018 Chemistry Grade 10 & IUPAC Standards

import assert from 'assert';
import {
  CANONICAL_BONDING_DATABASE,
  BondingEngine
} from './src/domain/bondingEngine.ts';

console.log('============================================================');
console.log('   ELEMENTA: CHEMICAL BONDING & VSEPR GEOMETRY AUDIT       ');
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

// 1. Catalog Completeness & VSEPR Integrity
console.log('--- 1. Canonical Curriculum Database (14 Flagship Models) ---');

it('Contains exactly 14 canonical models in database', () => {
  assert.strictEqual(CANONICAL_BONDING_DATABASE.length, 14);
});

it('All models have valid VSEPR data attached', () => {
  for (const model of CANONICAL_BONDING_DATABASE) {
    assert(model.vsepr, `Model ${model.id} is missing vsepr metadata`);
    assert(model.vsepr.shape, `Model ${model.id} has no shape`);
    assert(model.vsepr.bondAngle, `Model ${model.id} has no bondAngle`);
    assert(model.vsepr.stericNumber > 0, `Model ${model.id} stericNumber <= 0`);
    assert(model.vsepr.centralAtomSymbol, `Model ${model.id} has no centralAtomSymbol`);
  }
});

// 2. Specific VSEPR Geometry Verification (GDPT 2018)
console.log('\n--- 2. GDPT 2018 Core VSEPR Geometries & Bond Orders ---');

it('Water (H2O): Bent geometry with 104.5° angle and sp³ hybridization', () => {
  const h2o = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_h2o');
  assert(h2o);
  assert.strictEqual(h2o.vsepr.shape, 'BENT');
  assert.strictEqual(h2o.vsepr.bondAngle, '104.5°');
  assert.strictEqual(h2o.vsepr.hybridization, 'sp³');
  assert.strictEqual(h2o.vsepr.stericNumber, 4);
  assert.strictEqual(h2o.vsepr.lonePairsOnCentral, 2);
  assert.strictEqual(h2o.vsepr.dipoleMomentNet, 'Phân cực (> 0 D)');
});

it('Carbon Dioxide (CO2): Linear 180° with sp hybridization and net 0 D dipole', () => {
  const co2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_co2');
  assert(co2);
  assert.strictEqual(co2.vsepr.shape, 'LINEAR');
  assert.strictEqual(co2.vsepr.bondAngle, '180°');
  assert.strictEqual(co2.vsepr.hybridization, 'sp');
  assert.strictEqual(co2.vsepr.stericNumber, 2);
  assert.strictEqual(co2.vsepr.lonePairsOnCentral, 0);
  assert.strictEqual(co2.vsepr.dipoleMomentNet, '0 D (Không cực)');
});

it('Boron Trifluoride (BF3): Trigonal Planar 120° with sp² hybridization and incomplete octet', () => {
  const bf3 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_bf3');
  assert(bf3);
  assert.strictEqual(bf3.vsepr.shape, 'TRIGONAL_PLANAR');
  assert.strictEqual(bf3.vsepr.bondAngle, '120°');
  assert.strictEqual(bf3.vsepr.hybridization, 'sp²');
  assert.strictEqual(bf3.vsepr.stericNumber, 3);
  assert.strictEqual(bf3.vsepr.lonePairsOnCentral, 0);
  assert.strictEqual(bf3.vsepr.dipoleMomentNet, '0 D (Không cực)');
});

it('Ammonia (NH3): Trigonal Pyramidal 107° with sp³ hybridization and 1 lone pair', () => {
  const nh3 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_nh3');
  assert(nh3);
  assert.strictEqual(nh3.vsepr.shape, 'TRIGONAL_PYRAMIDAL');
  assert.strictEqual(nh3.vsepr.bondAngle, '107°');
  assert.strictEqual(nh3.vsepr.hybridization, 'sp³');
  assert.strictEqual(nh3.vsepr.stericNumber, 4);
  assert.strictEqual(nh3.vsepr.lonePairsOnCentral, 1);
  assert.strictEqual(nh3.vsepr.dipoleMomentNet, 'Phân cực (> 0 D)');
});

it('Methane (CH4): Tetrahedral 109.5° with sp³ hybridization and 0 D net dipole', () => {
  const ch4 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_ch4');
  assert(ch4);
  assert.strictEqual(ch4.vsepr.shape, 'TETRAHEDRAL');
  assert.strictEqual(ch4.vsepr.bondAngle, '109.5°');
  assert.strictEqual(ch4.vsepr.hybridization, 'sp³');
  assert.strictEqual(ch4.vsepr.stericNumber, 4);
  assert.strictEqual(ch4.vsepr.lonePairsOnCentral, 0);
  assert.strictEqual(ch4.vsepr.dipoleMomentNet, '0 D (Không cực)');
});

it('Ionic Salts (NaCl & MgO): Crystal Lattice with electrostatic bonding', () => {
  const nacl = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_nacl');
  const mgo = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_mgo');
  assert(nacl && mgo);
  assert.strictEqual(nacl.vsepr.shape, 'CRYSTAL_LATTICE');
  assert.strictEqual(mgo.vsepr.shape, 'CRYSTAL_LATTICE');
  assert.strictEqual(nacl.bondType, 'IONIC');
  assert.strictEqual(mgo.bondType, 'IONIC');
});

it('Sulfur Dioxide (SO2): Bent 119° with sp² hybridization and polar dipole', () => {
  const so2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_so2');
  assert(so2);
  assert.strictEqual(so2.vsepr.shape, 'BENT');
  assert.strictEqual(so2.vsepr.bondAngle, '119°');
  assert.strictEqual(so2.vsepr.hybridization, 'sp²');
  assert.strictEqual(so2.vsepr.stericNumber, 3);
  assert.strictEqual(so2.vsepr.lonePairsOnCentral, 1);
  assert.strictEqual(so2.vsepr.dipoleMomentNet, 'Phân cực (> 0 D)');
  assert.strictEqual(so2.bondType, 'POLAR_COVALENT');
});

it('Ethylene (C2H4): Planar 120° with sp² hybridization, 1σ + 1π double bond and net 0 D dipole', () => {
  const c2h4 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_c2h4');
  assert(c2h4);
  assert.strictEqual(c2h4.vsepr.shape, 'TRIGONAL_PLANAR');
  assert.strictEqual(c2h4.vsepr.bondAngle, '120°');
  assert.strictEqual(c2h4.vsepr.hybridization, 'sp²');
  assert.strictEqual(c2h4.vsepr.stericNumber, 3);
  assert.strictEqual(c2h4.vsepr.lonePairsOnCentral, 0);
  assert.strictEqual(c2h4.vsepr.dipoleMomentNet, '0 D (Không cực)');
  assert.strictEqual(c2h4.bondType, 'NONPOLAR_COVALENT');
});

it('Acetylene (C2H2): Linear 180° with sp hybridization, 1σ + 2π triple bond and net 0 D dipole', () => {
  const c2h2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_c2h2');
  assert(c2h2);
  assert.strictEqual(c2h2.vsepr.shape, 'LINEAR');
  assert.strictEqual(c2h2.vsepr.bondAngle, '180°');
  assert.strictEqual(c2h2.vsepr.hybridization, 'sp');
  assert.strictEqual(c2h2.vsepr.stericNumber, 2);
  assert.strictEqual(c2h2.vsepr.lonePairsOnCentral, 0);
  assert.strictEqual(c2h2.vsepr.dipoleMomentNet, '0 D (Không cực)');
  assert.strictEqual(c2h2.bondType, 'NONPOLAR_COVALENT');
});

it('Diatomic Molecules (H2, O2, N2, HCl): Shared pairs, bond orders, and polarity hierarchy', () => {
  // H2: single bond, 1 pair
  const h2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_h2');
  assert(h2);
  assert.strictEqual(h2.bondOrder, 1);
  assert.strictEqual(h2.sharedPairsCount, 1);
  assert.strictEqual(h2.deltaChi, 0.00);
  assert.strictEqual(h2.bondType, 'NONPOLAR_COVALENT');

  // O2: double bond (1 sigma + 1 pi), 2 pairs
  const o2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_o2');
  assert(o2);
  assert.strictEqual(o2.bondOrder, 2);
  assert.strictEqual(o2.sharedPairsCount, 2);
  assert.strictEqual(o2.deltaChi, 0.00);
  assert.strictEqual(o2.lonePairsCount, 4);

  // N2: triple bond (1 sigma + 2 pi), 3 pairs, highly inert
  const n2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_n2');
  assert(n2);
  assert.strictEqual(n2.bondOrder, 3);
  assert.strictEqual(n2.sharedPairsCount, 3);
  assert.strictEqual(n2.deltaChi, 0.00);
  assert.ok(n2.descriptionVI.includes('945 kJ/mol'));

  // HCl: single polar bond, 1 pair shifted towards Cl
  const hcl = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_hcl');
  assert(hcl);
  assert.strictEqual(hcl.bondOrder, 1);
  assert.strictEqual(hcl.sharedPairsCount, 1);
  assert.strictEqual(hcl.deltaChi, 0.96);
  assert.strictEqual(hcl.bondType, 'POLAR_COVALENT');
  assert.strictEqual(hcl.vsepr.dipoleMomentNet, 'Phân cực (> 0 D)');
});

// 3. Pauling Electronegativity Difference Classification
console.log('\n--- 3. Pauling Electronegativity Difference Classification ---');

it('Delta Chi < 0.4 correctly classifies as Nonpolar Covalent', () => {
  const res = BondingEngine.classifyBondByDeltaChi(2.20, 2.20); // H-H (0.00)
  assert.strictEqual(res.bondType, 'NONPOLAR_COVALENT');
  assert.strictEqual(res.deltaChi, 0.00);

  const resCH = BondingEngine.classifyBondByDeltaChi(2.55, 2.20); // C-H (0.35)
  assert.strictEqual(resCH.bondType, 'NONPOLAR_COVALENT');
  assert.strictEqual(resCH.deltaChi, 0.35);
});

it('0.4 <= Delta Chi < 1.7 correctly classifies as Polar Covalent', () => {
  const resHCl = BondingEngine.classifyBondByDeltaChi(3.16, 2.20); // H-Cl (0.96)
  assert.strictEqual(resHCl.bondType, 'POLAR_COVALENT');
  assert.strictEqual(resHCl.deltaChi, 0.96);

  const resH2O = BondingEngine.classifyBondByDeltaChi(3.44, 2.20); // O-H (1.24)
  assert.strictEqual(resH2O.bondType, 'POLAR_COVALENT');
  assert.strictEqual(resH2O.deltaChi, 1.24);
});

it('Delta Chi >= 1.7 correctly classifies as Ionic Bond', () => {
  const resNaCl = BondingEngine.classifyBondByDeltaChi(3.16, 0.93); // Na-Cl (2.23)
  assert.strictEqual(resNaCl.bondType, 'IONIC');
  assert.strictEqual(resNaCl.deltaChi, 2.23);

  const resMgO = BondingEngine.classifyBondByDeltaChi(3.44, 1.31); // Mg-O (2.13)
  assert.strictEqual(resMgO.bondType, 'IONIC');
  assert.strictEqual(resMgO.deltaChi, 2.13);
});

it('isIonicBondFeasible verifies metal-nonmetal pairs and rejects noble gases', () => {
  const na = { symbol: 'Na', category: 'ALKALI_METAL', chi: 0.93 };
  const cl = { symbol: 'Cl', category: 'HALOGEN', chi: 3.16 };
  assert.strictEqual(BondingEngine.isIonicBondFeasible(na, cl), true);

  const mg = { symbol: 'Mg', category: 'ALKALINE_EARTH_METAL', chi: 1.31 };
  const o = { symbol: 'O', category: 'NONMETAL', chi: 3.44 };
  assert.strictEqual(BondingEngine.isIonicBondFeasible(mg, o), true);

  const c = { symbol: 'C', category: 'NONMETAL', chi: 2.55 };
  const h = { symbol: 'H', category: 'NONMETAL', chi: 2.20 };
  assert.strictEqual(BondingEngine.isIonicBondFeasible(c, h), false);

  const he = { symbol: 'He', category: 'NOBLE_GAS', chi: null };
  assert.strictEqual(BondingEngine.isIonicBondFeasible(he, o), false);
});

// 4. Gameplay Modifiers Invariants
console.log('\n--- 4. Gameplay Modifier Invariants Across All Models ---');

it('All 14 bonding models specify valid combat buff mechanics', () => {
  const validStats = ['DEF_SHIELD', 'TENACITY', 'COOLDOWN_HASTE', 'BURST_ATTACK'];
  for (const model of CANONICAL_BONDING_DATABASE) {
    const mod = model.gameplayModifier;
    assert.ok(mod, `Model ${model.id} missing gameplayModifier`);
    assert.ok(mod.buffNameVI && mod.buffNameVI.length > 2, `Model ${model.id} missing buffNameVI`);
    assert.ok(mod.descriptionVI && mod.descriptionVI.length > 5, `Model ${model.id} missing descriptionVI`);
    assert.ok(validStats.includes(mod.statType), `Model ${model.id} invalid statType ${mod.statType}`);
    assert.ok(mod.magnitude > 0, `Model ${model.id} magnitude <= 0`);
  }
});

// 5. Formula Normalization and Lookup
console.log('\n--- 5. Formula Normalization & Lookup ---');

it('Lookup handles subscripts: H₂O -> H2O, BF₃ -> BF3, NH₃ -> NH3, SO₂ -> SO2, C₂H₄ -> C2H4, C₂H₂ -> C2H2, H₂, O₂, N₂', () => {
  const h2o = BondingEngine.getBondingModel('H₂O');
  assert(h2o);
  assert.strictEqual(h2o.id, 'bond_h2o');

  const bf3 = BondingEngine.getBondingModel('BF₃');
  assert(bf3);
  assert.strictEqual(bf3.id, 'bond_bf3');

  const nh3 = BondingEngine.getBondingModel('NH3');
  assert(nh3);
  assert.strictEqual(nh3.id, 'bond_nh3');

  const so2 = BondingEngine.getBondingModel('SO₂');
  assert(so2);
  assert.strictEqual(so2.id, 'bond_so2');

  const c2h4 = BondingEngine.getBondingModel('C₂H₄');
  assert(c2h4);
  assert.strictEqual(c2h4.id, 'bond_c2h4');

  const c2h2 = BondingEngine.getBondingModel('C₂H₂');
  assert(c2h2);
  assert.strictEqual(c2h2.id, 'bond_c2h2');

  const h2 = BondingEngine.getBondingModel('H₂');
  assert(h2);
  assert.strictEqual(h2.id, 'bond_h2');

  const o2 = BondingEngine.getBondingModel('O₂');
  assert(o2);
  assert.strictEqual(o2.id, 'bond_o2');

  const n2 = BondingEngine.getBondingModel('N₂');
  assert(n2);
  assert.strictEqual(n2.id, 'bond_n2');
});

// 6. Lewis Representation & Octet Integrity
console.log('\n--- 6. Lewis Representation & Octet Integrity ---');

it('Lewis representations and electron pair counts conform to chemical valency', () => {
  for (const model of CANONICAL_BONDING_DATABASE) {
    assert(model.lewisRepresentation, `Model ${model.id} missing lewisRepresentation`);
    assert(typeof model.sharedPairsCount === 'number', `Model ${model.id} sharedPairsCount not a number`);
    assert(typeof model.lonePairsCount === 'number', `Model ${model.id} lonePairsCount not a number`);
    assert(model.sharedPairsCount >= 1 || model.bondType === 'IONIC', `Model ${model.id} covalent bond must have >= 1 shared pair`);
  }

  // Water: 2 shared pairs, 2 lone pairs = 4 electron pairs total
  const h2o = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_h2o');
  assert.strictEqual(h2o.sharedPairsCount, 2);
  assert.strictEqual(h2o.lonePairsCount, 2);

  // Methane: 4 shared pairs, 0 lone pairs
  const ch4 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_ch4');
  assert.strictEqual(ch4.sharedPairsCount, 4);
  assert.strictEqual(ch4.lonePairsCount, 0);

  // Ammonia: 3 shared pairs, 1 lone pair
  const nh3 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_nh3');
  assert.strictEqual(nh3.sharedPairsCount, 3);
  assert.strictEqual(nh3.lonePairsCount, 1);
});

// 7. Hybridization & Geometry Cross-Validation
console.log('\n--- 7. Hybridization & Geometry Cross-Validation ---');

it('Steric number perfectly dictates molecular hybridization across all covalent models', () => {
  for (const model of CANONICAL_BONDING_DATABASE) {
    if (model.bondType === 'IONIC') continue;
    const { stericNumber, hybridization, shape } = model.vsepr;

    if (stericNumber === 2) {
      assert.strictEqual(hybridization, 'sp', `${model.id} with stericNumber 2 must have sp hybridization`);
      assert.strictEqual(shape, 'LINEAR', `${model.id} with stericNumber 2 must have LINEAR shape`);
    } else if (stericNumber === 3) {
      assert(hybridization === 'sp²' || hybridization === 'sp2', `${model.id} with stericNumber 3 must have sp² hybridization (got ${hybridization})`);
      assert(['TRIGONAL_PLANAR', 'BENT', 'LINEAR'].includes(shape), `${model.id} shape must be valid for steric 3 (got ${shape})`);
    } else if (stericNumber === 4) {
      assert(hybridization === 'sp³' || hybridization === 'sp3', `${model.id} with stericNumber 4 must have sp³ hybridization (got ${hybridization})`);
      assert(['TETRAHEDRAL', 'TRIGONAL_PYRAMIDAL', 'BENT', 'LINEAR'].includes(shape), `${model.id} shape must be valid for steric 4 (got ${shape})`);
    }
  }
});

// 8. Gameplay Buff Categorization Calibration
console.log('\n--- 8. Gameplay Buff Pedagogical Alignment ---');

it('Bond types logically map to tactical MOBA combat perks', () => {
  const nacl = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_nacl');
  assert.strictEqual(nacl.gameplayModifier.statType, 'DEF_SHIELD', 'Ionic crystal NaCl provides defense shield');

  const mgo = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_mgo');
  assert.strictEqual(mgo.gameplayModifier.statType, 'DEF_SHIELD', 'Ionic crystal MgO provides defense shield');

  const n2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_n2');
  assert.strictEqual(n2.gameplayModifier.statType, 'TENACITY', 'Triple bond N2 (945 kJ/mol) provides tenacity resistance');

  const h2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_h2');
  assert.strictEqual(h2.gameplayModifier.statType, 'COOLDOWN_HASTE', 'Lightweight H2 provides cooldown haste');

  const o2 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_o2');
  assert.strictEqual(o2.gameplayModifier.statType, 'BURST_ATTACK', 'Oxidizer O2 provides burst attack damage');
});

// 9. VSEPR Lone Pair Repulsion Hierarchy & Angle Contractions
console.log('\n--- 9. VSEPR Lone Pair Repulsion Hierarchy & Angle Contractions ---');

it('Steric 4 series strictly obeys LP repulsion hierarchy: θ(CH4) > θ(NH3) > θ(H2O)', () => {
  const ch4 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_ch4');
  const nh3 = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_nh3');
  const h2o = CANONICAL_BONDING_DATABASE.find(b => b.id === 'bond_h2o');

  const angleCH4 = parseFloat(ch4.vsepr.bondAngle);
  const angleNH3 = parseFloat(nh3.vsepr.bondAngle);
  const angleH2O = parseFloat(h2o.vsepr.bondAngle);

  assert.strictEqual(angleCH4, 109.5, 'CH4 bond angle is 109.5°');
  assert.strictEqual(angleNH3, 107.0, 'NH3 bond angle is 107.0°');
  assert.strictEqual(angleH2O, 104.5, 'H2O bond angle is 104.5°');

  assert(angleCH4 > angleNH3, 'CH4 (0 lone pairs) has larger bond angle than NH3 (1 lone pair)');
  assert(angleNH3 > angleH2O, 'NH3 (1 lone pair) has larger bond angle than H2O (2 lone pairs)');
});

// 10. Algorithmic VSEPR Geometry Prediction Function
console.log('\n--- 10. Algorithmic VSEPR Geometry Prediction Function ---');

it('predictVseprGeometry accurately deduces geometry, hybridization and bond angles across steric numbers 2 to 6', () => {
  // Steric 2
  const sn2 = BondingEngine.predictVseprGeometry(2, 0);
  assert.strictEqual(sn2.shape, 'LINEAR');
  assert.strictEqual(sn2.hybridization, 'sp');
  assert.strictEqual(sn2.bondAngle, '180°');

  // Steric 3, 0 LP
  const sn3_0 = BondingEngine.predictVseprGeometry(3, 0);
  assert.strictEqual(sn3_0.shape, 'TRIGONAL_PLANAR');
  assert.strictEqual(sn3_0.hybridization, 'sp²');
  assert.strictEqual(sn3_0.bondAngle, '120°');

  // Steric 3, 1 LP (Bent)
  const sn3_1 = BondingEngine.predictVseprGeometry(3, 1);
  assert.strictEqual(sn3_1.shape, 'BENT');
  assert.strictEqual(sn3_1.hybridization, 'sp²');

  // Steric 4, 0 LP (Tetrahedral)
  const sn4_0 = BondingEngine.predictVseprGeometry(4, 0);
  assert.strictEqual(sn4_0.shape, 'TETRAHEDRAL');
  assert.strictEqual(sn4_0.hybridization, 'sp³');
  assert.strictEqual(sn4_0.bondAngle, '109.5°');

  // Steric 4, 1 LP (Trigonal Pyramidal)
  const sn4_1 = BondingEngine.predictVseprGeometry(4, 1);
  assert.strictEqual(sn4_1.shape, 'TRIGONAL_PYRAMIDAL');
  assert.strictEqual(sn4_1.hybridization, 'sp³');
  assert.strictEqual(sn4_1.bondAngle, '107°');

  // Steric 4, 2 LP (Bent)
  const sn4_2 = BondingEngine.predictVseprGeometry(4, 2);
  assert.strictEqual(sn4_2.shape, 'BENT');
  assert.strictEqual(sn4_2.hybridization, 'sp³');
  assert.strictEqual(sn4_2.bondAngle, '104.5°');

  // Steric 5 (Expanded octet, Trigonal Bipyramidal)
  const sn5 = BondingEngine.predictVseprGeometry(5, 0);
  assert.strictEqual(sn5.shape, 'TRIGONAL_BIPYRAMIDAL');
  assert.strictEqual(sn5.hybridization, 'sp³d');
  assert(sn5.bondAngle.includes('90°') && sn5.bondAngle.includes('120°'));

  // Steric 6 (Expanded octet, Octahedral)
  const sn6 = BondingEngine.predictVseprGeometry(6, 0);
  assert.strictEqual(sn6.shape, 'OCTAHEDRAL');
  assert.strictEqual(sn6.hybridization, 'sp³d²');
  assert.strictEqual(sn6.bondAngle, '90°');
});

// 11. Net Molecular Polarity & Dipole Vector Cancellation (GDPT 2018 Grade 10)
console.log('\n--- 11. Net Molecular Polarity & Dipole Vector Cancellation ---');

it('Symmetric molecules with identical ligands cancel dipole vectors to 0 D (Non-polar)', () => {
  // CO2: Linear, 2 identical Oxygen ligands, 0 lone pairs -> Non-polar
  const co2 = BondingEngine.predictMolecularPolarity('LINEAR', [{ symbol: 'O', count: 2 }], 0);
  assert.strictEqual(co2.isPolar, false);
  assert.strictEqual(co2.dipoleMomentNet, '0 D (Không cực)');
  assert(co2.explanationVI.includes('triệt tiêu'));

  // BF3: Trigonal planar, 3 identical Fluorine ligands, 0 lone pairs -> Non-polar
  const bf3 = BondingEngine.predictMolecularPolarity('TRIGONAL_PLANAR', [{ symbol: 'F', count: 3 }], 0);
  assert.strictEqual(bf3.isPolar, false);
  assert.strictEqual(bf3.dipoleMomentNet, '0 D (Không cực)');

  // CH4 & CCl4: Tetrahedral, 4 identical ligands, 0 lone pairs -> Non-polar
  const ch4 = BondingEngine.predictMolecularPolarity('TETRAHEDRAL', [{ symbol: 'H', count: 4 }], 0);
  assert.strictEqual(ch4.isPolar, false);
  assert.strictEqual(ch4.dipoleMomentNet, '0 D (Không cực)');

  const ccl4 = BondingEngine.predictMolecularPolarity('TETRAHEDRAL', [{ symbol: 'Cl', count: 4 }], 0);
  assert.strictEqual(ccl4.isPolar, false);
  assert.strictEqual(ccl4.dipoleMomentNet, '0 D (Không cực)');

  // SF6: Octahedral, 6 identical ligands, 0 lone pairs -> Non-polar
  const sf6 = BondingEngine.predictMolecularPolarity('OCTAHEDRAL', [{ symbol: 'F', count: 6 }], 0);
  assert.strictEqual(sf6.isPolar, false);
  assert.strictEqual(sf6.dipoleMomentNet, '0 D (Không cực)');
});

it('Asymmetric molecules with lone pairs or disparate ligands preserve net dipole moment (Polar)', () => {
  // H2O: Bent, 2 H ligands, 2 lone pairs -> Polar (> 0 D)
  const h2o = BondingEngine.predictMolecularPolarity('BENT', [{ symbol: 'H', count: 2 }], 2);
  assert.strictEqual(h2o.isPolar, true);
  assert.strictEqual(h2o.dipoleMomentNet, 'Phân cực (> 0 D)');

  // SO2: Bent, 2 O ligands, 1 lone pair -> Polar (> 0 D)
  const so2 = BondingEngine.predictMolecularPolarity('BENT', [{ symbol: 'O', count: 2 }], 1);
  assert.strictEqual(so2.isPolar, true);
  assert.strictEqual(so2.dipoleMomentNet, 'Phân cực (> 0 D)');

  // NH3: Trigonal Pyramidal, 3 H ligands, 1 lone pair -> Polar (> 0 D)
  const nh3 = BondingEngine.predictMolecularPolarity('TRIGONAL_PYRAMIDAL', [{ symbol: 'H', count: 3 }], 1);
  assert.strictEqual(nh3.isPolar, true);
  assert.strictEqual(nh3.dipoleMomentNet, 'Phân cực (> 0 D)');

  // CH3Cl: Tetrahedral, but disparate ligands (3 H + 1 Cl) -> Polar (> 0 D)
  const ch3cl = BondingEngine.predictMolecularPolarity('TETRAHEDRAL', [{ symbol: 'H', count: 3 }, { symbol: 'Cl', count: 1 }], 0);
  assert.strictEqual(ch3cl.isPolar, true);
  assert.strictEqual(ch3cl.dipoleMomentNet, 'Phân cực (> 0 D)');

  // HCN: Linear, but disparate ligands (1 H + 1 N) -> Polar (> 0 D)
  const hcn = BondingEngine.predictMolecularPolarity('LINEAR', [{ symbol: 'H', count: 1 }, { symbol: 'N', count: 1 }], 0);
  assert.strictEqual(hcn.isPolar, true);
  assert.strictEqual(hcn.dipoleMomentNet, 'Phân cực (> 0 D)');
});

console.log('============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
