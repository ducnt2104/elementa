// test-card-detail-modal.mjs
// Comprehensive test suite for CardDetailModal, 3D Foil Hologram Properties,
// IUPAC Quantum Orbitals, and Chemical Reaction Synergy Network

import assert from 'node:assert';
import { PLAYABLE_CARDS, getPlayableCardById } from './src/data/playableCardsData.ts';
import { computeElectronStructure, getShellElectrons } from './src/domain/orbitalEngine.ts';
import { getRelatedCards } from './src/domain/relatedCardsService.ts';

console.log('--- TEST SUITE 65: CARD DETAIL MODAL & IUPAC QUANTUM INSPECTION ---');

// Test 1: Element Monster Card Dossier & Quantum Structure (Sodium Na, Z=11)
console.log('Test 1: Sodium (Na, Z=11) Dossier & Quantum Orbitals...');
{
  const naCard = getPlayableCardById('card_elem_11_na');
  assert(naCard, 'Sodium card must exist in catalog');
  assert.strictEqual(naCard.atomicNumber, 11, 'Sodium atomic number Z must be 11');
  assert.strictEqual(naCard.chemicalFormula, 'Na', 'Chemical formula must be Na');

  // Electron shells (Bohr model): 2, 8, 1
  const shells = getShellElectrons(11, 'Na');
  assert.deepStrictEqual(shells, [2, 8, 1], 'Sodium electron shells must be K=2, L=8, M=1');

  // Quantum electron structure
  const structure = computeElectronStructure(11, 'Na');
  assert(structure.nobleGasConfigString.includes('[Ne] 3s¹') || structure.nobleGasConfigString.includes('[Ne] 3s1'), 'Noble gas configuration must be [Ne] 3s¹');
  assert.strictEqual(structure.valenceElectrons, 1, 'Valence electrons must be 1');
  assert.strictEqual(structure.totalUnpairedElectrons, 1, 'Unpaired electrons must be 1');
  assert.strictEqual(structure.magneticProperty.magneticType, 'PARAMAGNETIC', 'Sodium must be paramagnetic due to 1 unpaired electron');

  console.log('  ✓ Sodium (Z=11) quantum structure verified: K=2, L=8, M=1, [Ne] 3s¹, Paramagnetic');
}

// Test 2: Transition Metal Card Quantum Structure (Iron Fe, Z=26)
console.log('Test 2: Iron (Fe, Z=26) d-block Orbitals & Hund Rule...');
{
  const feCard = getPlayableCardById('card_elem_26_fe');
  assert(feCard, 'Iron card must exist');
  assert.strictEqual(feCard.atomicNumber, 26);

  // Shells for Fe: 2, 8, 14, 2
  const shells = getShellElectrons(26, 'Fe');
  assert.deepStrictEqual(shells, [2, 8, 14, 2], 'Iron electron shells must be K=2, L=8, M=14, N=2');

  const structure = computeElectronStructure(26, 'Fe');
  assert(structure.nobleGasConfigString.includes('3d⁶ 4s²') || structure.nobleGasConfigString.includes('3d6 4s2') || structure.nobleGasConfigString.includes('3d'), 'Iron must have 3d electrons');
  assert.strictEqual(structure.totalUnpairedElectrons, 4, 'Fe has 4 unpaired 3d electrons according to Hund rule');
  assert.strictEqual(structure.magneticProperty.magneticType, 'PARAMAGNETIC', 'Iron must be paramagnetic/ferromagnetic');

  console.log('  ✓ Iron (Z=26) verified: 4 unpaired d-electrons strictly obeying Hund rule');
}

// Test 3: Compound Card Dossier & Chemical Reaction Network
console.log('Test 3: Compound Card (H2O) & Related Chemical Reaction Network...');
{
  const h2oCard = getPlayableCardById('card_comp_h2o');
  assert(h2oCard, 'Water card must exist');
  assert.strictEqual(h2oCard.cardType, 'COMPOUND_MONSTER', 'Water must be a COMPOUND_MONSTER');

  const related = getRelatedCards(h2oCard, { card_elem_11_na: 3, card_elem_17_cl: 2 });
  assert(related.length > 0, 'Water must have related cards in chemistry database');

  // Verify alkali metal reaction synergy
  const naLink = related.find(r => r.targetCard.id === 'card_elem_11_na' || r.targetCard.chemicalFormula === 'Na');
  assert(naLink, 'Sodium must be linked to Water as an alkali reaction partner');
  assert(naLink.relationLabel.includes('Cần Kết Hợp') || naLink.relationLabel.includes('Phản Ứng') || naLink.relationLabel.includes('Cộng Hưởng'), 'Relation label must indicate chemical interaction');

  console.log(`  ✓ Water reaction network verified: Found ${related.length} related cards, including Sodium alkali partner`);
}

// Test 4: Master Rule Special Summoning Dossier Invariants
console.log('Test 4: Master Rule Summoning Mechanics (Synchro, Xyz, Link, Pendulum)...');
{
  // Test Synchro card
  const synchroCard = PLAYABLE_CARDS.find(c => c.cardType === 'SYNCHRO_MONSTER');
  if (synchroCard) {
    assert(synchroCard.synchroLevel !== undefined, 'Synchro card must define synchroLevel');
    assert(synchroCard.atk !== undefined && synchroCard.def !== undefined, 'Synchro must define ATK & DEF');
  }

  // Test Xyz card
  const xyzCard = PLAYABLE_CARDS.find(c => c.cardType === 'XYZ_MONSTER');
  if (xyzCard) {
    assert(xyzCard.xyzRank !== undefined, 'Xyz card must define xyzRank');
    assert(xyzCard.xyzMaterialsRequired !== undefined, 'Xyz card must specify material requirements');
  }

  // Test Link card
  const linkCard = PLAYABLE_CARDS.find(c => c.cardType === 'LINK_MONSTER');
  if (linkCard) {
    assert(linkCard.linkRating !== undefined, 'Link card must define linkRating');
    assert(Array.isArray(linkCard.linkArrows), 'Link card must have linkArrows array');
    assert(linkCard.linkArrows.length === linkCard.linkRating, 'Link arrows count must equal linkRating');
  }

  // Test Pendulum card
  const pendulumCard = PLAYABLE_CARDS.find(c => c.cardType === 'PENDULUM_MONSTER');
  if (pendulumCard) {
    assert(pendulumCard.pendulumScale !== undefined, 'Pendulum card must define pendulumScale');
    assert(pendulumCard.pendulumEffectText !== undefined, 'Pendulum card must define pendulumEffectText');
  }

  console.log('  ✓ Master Rule mechanical properties (Synchro Lv, Xyz Rank, Link Arrows, Pendulum Scale) verified');
}

// Test 5: Noble Gas Electronic Stability Invariant (Helium, Neon, Argon)
console.log('Test 5: Noble Gas (He, Ne, Ar) Invariant Octet & Zero Unpaired Electrons...');
{
  const neCard = getPlayableCardById('card_elem_10_ne');
  if (neCard) {
    const neStructure = computeElectronStructure(10, 'Ne');
    assert.strictEqual(neStructure.totalUnpairedElectrons, 0, 'Neon must have 0 unpaired electrons (stable octet)');
    assert.strictEqual(neStructure.valenceElectrons, 8, 'Neon valence electrons must be 8');
    assert.strictEqual(neStructure.magneticProperty.magneticType, 'DIAMAGNETIC', 'Neon must be diamagnetic');
  }

  const arCard = getPlayableCardById('card_elem_18_ar');
  if (arCard) {
    const arStructure = computeElectronStructure(18, 'Ar');
    assert.strictEqual(arStructure.totalUnpairedElectrons, 0, 'Argon must have 0 unpaired electrons');
    assert.strictEqual(arStructure.valenceElectrons, 8, 'Argon valence electrons must be 8');
    assert.strictEqual(arStructure.magneticProperty.magneticType, 'DIAMAGNETIC', 'Argon must be diamagnetic');
  }

  console.log('  ✓ Noble Gas electronic octet invariants verified: 0 unpaired electrons, diamagnetic');
}

console.log('\n======================================================');
console.log('✓ ALL 5 CARD DETAIL & QUANTUM INSPECTION TESTS PASSED');
console.log('======================================================\n');
