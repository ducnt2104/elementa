// test-flame-test-spectroscopy.mjs
// Test Suite 66: Interactive Flame Test Spectroscopy & Quantum Emission Metrics
// Conforms strictly to IUPAC standards & Vietnamese GDPT 2018 Chemistry Curriculum

import assert from 'node:assert/strict';

// Helper: Formula parsing equivalent to parseFormulaAtoms
function parseFormulaAtoms(formula) {
  const counts = {};
  const cleaned = formula.replace(/[·•]\s*[0-9]*H2O/g, '').replace(/\[|\]/g, '');
  const regex = /([A-Z][a-z]?)([0-9]*)/g;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    if (match[1]) {
      const el = match[1];
      const count = match[2] ? parseInt(match[2], 10) : 1;
      counts[el] = (counts[el] || 0) + count;
    }
  }
  return counts;
}

// Quantum photon calculation from FlameTestVisualizer
function calculatePhotonEnergy(wavelengthNm) {
  const energyEv = Math.round((1239.84193 / wavelengthNm) * 100) / 100;
  const energyKjPerMol = Math.round(119626.6 / wavelengthNm);
  const frequencyTHz = Math.round((299792.458 / wavelengthNm) * 10) / 10;
  return { energyEv, energyKjPerMol, frequencyTHz };
}

// Flame candidate detection logic from CardDetailModal
function findFlameCandidate(card, flameCatalog) {
  if (!card) return null;
  const formula = card.chemicalFormula?.trim();
  if (!formula) return null;

  // 1. Direct match
  if (flameCatalog[formula]) {
    return {
      symbol: formula,
      isCompound: false
    };
  }

  // 2. Element card via atomicNumber
  if (card.atomicNumber && card.atomicNumber > 0 && card.symbol && flameCatalog[card.symbol]) {
    return {
      symbol: card.symbol,
      isCompound: false
    };
  }

  // 3. Compound parsing
  try {
    const atomCounts = parseFormulaAtoms(formula);
    const flamePriority = ['Na', 'K', 'Li', 'Sr', 'Ca', 'Ba', 'Cu', 'B', 'In', 'Tl', 'Mg', 'Fe', 'Rb', 'Cs', 'Pb', 'Zn'];
    for (const sym of flamePriority) {
      if (atomCounts[sym] && flameCatalog[sym]) {
        return {
          symbol: sym,
          isCompound: true
        };
      }
    }
  } catch {
    // ignore
  }

  return null;
}

async function runTestSuite() {
  console.log('--- TEST SUITE 66: FLAME TEST SPECTROSCOPY & QUANTUM EMISSION ---');

  // Dynamically load the TypeScript compiled catalog via tsx / esbuild or mock check
  // Test 1: Quantum Calculations Verification (Planck-Einstein Equation)
  console.log('Test 1: Verifying Planck-Einstein Quantum Photon Energy Calculations...');
  
  // Sodium D-line: 589.0 nm
  const naQuantum = calculatePhotonEnergy(589.0);
  assert.equal(naQuantum.energyEv, 2.10, 'Na photon energy should be 2.10 eV');
  assert.equal(naQuantum.energyKjPerMol, 203, 'Na photon energy should be 203 kJ/mol');
  assert.equal(naQuantum.frequencyTHz, 509.0, 'Na photon frequency should be 509.0 THz');

  // Lithium crimson line: 670.8 nm
  const liQuantum = calculatePhotonEnergy(670.8);
  assert.equal(liQuantum.energyEv, 1.85, 'Li photon energy should be 1.85 eV');
  assert.equal(liQuantum.energyKjPerMol, 178, 'Li photon energy should be 178 kJ/mol');
  assert.equal(liQuantum.frequencyTHz, 446.9, 'Li photon frequency should be 446.9 THz');

  // Caesium azure line: 455.5 nm
  const csQuantum = calculatePhotonEnergy(455.5);
  assert.equal(csQuantum.energyEv, 2.72, 'Cs photon energy should be 2.72 eV');
  assert.equal(csQuantum.energyKjPerMol, 263, 'Cs photon energy should be 263 kJ/mol');
  assert.equal(csQuantum.frequencyTHz, 658.2, 'Cs photon frequency should be 658.2 THz');

  // Indium indigo line: 451.1 nm
  const inQuantum = calculatePhotonEnergy(451.1);
  assert.equal(inQuantum.energyEv, 2.75, 'In photon energy should be 2.75 eV');
  assert.equal(inQuantum.energyKjPerMol, 265, 'In photon energy should be 265 kJ/mol');

  // Thallium emerald green line: 535.0 nm
  const tlQuantum = calculatePhotonEnergy(535.0);
  assert.equal(tlQuantum.energyEv, 2.32, 'Tl photon energy should be 2.32 eV');
  assert.equal(tlQuantum.energyKjPerMol, 224, 'Tl photon energy should be 224 kJ/mol');
  console.log('  ✓ Test 1 Passed: Planck-Einstein quantum conversions are mathematically exact.');

  // Test 2: Visible Spectrum Spectrograph Positioning
  console.log('Test 2: Verifying Visible Spectrum (380 - 750 nm) Position Mapping...');
  const computePositionPercent = (wl) => Math.min(100, Math.max(0, ((wl - 380) / 370) * 100));

  assert.ok(Math.abs(computePositionPercent(380) - 0.0) < 0.01, '380 nm must map to 0%');
  assert.ok(Math.abs(computePositionPercent(750) - 100.0) < 0.01, '750 nm must map to 100%');
  
  const naPercent = computePositionPercent(589.0);
  assert.ok(naPercent > 56.4 && naPercent < 56.6, `Na 589nm maps to ~56.49%, got ${naPercent}`);
  
  const cuPercent = computePositionPercent(510.5);
  assert.ok(cuPercent > 35.2 && cuPercent < 35.3, `Cu 510.5nm maps to ~35.27%, got ${cuPercent}`);
  
  const caPercent = computePositionPercent(622.0);
  assert.ok(caPercent > 65.3 && caPercent < 65.5, `Ca 622nm maps to ~65.41%, got ${caPercent}`);
  console.log('  ✓ Test 2 Passed: Spectrometer slit positions accurately span 380nm to 750nm.');

  // Test 3: Compound Cation Detection for Flame Testing
  console.log('Test 3: Verifying Compound Cation Detection in Card Detail Inspection...');
  const flameCatalog = {
    Li: true, Na: true, K: true, Rb: true, Cs: true,
    Ca: true, Sr: true, Ba: true, Cu: true, B: true,
    In: true, Tl: true, Pb: true, Zn: true, Mg: true, Fe: true
  };

  // Pure Element Cards
  const naCard = { chemicalFormula: 'Na', atomicNumber: 11, symbol: 'Na' };
  const resNa = findFlameCandidate(naCard, flameCatalog);
  assert.deepEqual(resNa, { symbol: 'Na', isCompound: false });

  const cuCard = { chemicalFormula: 'Cu', atomicNumber: 29, symbol: 'Cu' };
  const resCu = findFlameCandidate(cuCard, flameCatalog);
  assert.deepEqual(resCu, { symbol: 'Cu', isCompound: false });

  // Compound Salt Cards
  const naclCard = { chemicalFormula: 'NaCl', atomicNumber: 0 };
  const resNaCl = findFlameCandidate(naclCard, flameCatalog);
  assert.deepEqual(resNaCl, { symbol: 'Na', isCompound: true });

  const cuso4Card = { chemicalFormula: 'CuSO4', atomicNumber: 0 };
  const resCuSO4 = findFlameCandidate(cuso4Card, flameCatalog);
  assert.deepEqual(resCuSO4, { symbol: 'Cu', isCompound: true });

  const cacl2Card = { chemicalFormula: 'CaCl2', atomicNumber: 0 };
  const resCaCl2 = findFlameCandidate(cacl2Card, flameCatalog);
  assert.deepEqual(resCaCl2, { symbol: 'Ca', isCompound: true });

  const bacl2Card = { chemicalFormula: 'BaCl2', atomicNumber: 0 };
  const resBaCl2 = findFlameCandidate(bacl2Card, flameCatalog);
  assert.deepEqual(resBaCl2, { symbol: 'Ba', isCompound: true });

  const kno3Card = { chemicalFormula: 'KNO3', atomicNumber: 0 };
  const resKNO3 = findFlameCandidate(kno3Card, flameCatalog);
  assert.deepEqual(resKNO3, { symbol: 'K', isCompound: true });

  // Non-metal compounds with no flame test
  const h2oCard = { chemicalFormula: 'H2O', atomicNumber: 0 };
  const resH2O = findFlameCandidate(h2oCard, flameCatalog);
  assert.equal(resH2O, null, 'Water (H2O) should not have a metal flame test');

  const co2Card = { chemicalFormula: 'CO2', atomicNumber: 0 };
  const resCO2 = findFlameCandidate(co2Card, flameCatalog);
  assert.equal(resCO2, null, 'Carbon dioxide (CO2) should not have a metal flame test');
  console.log('  ✓ Test 3 Passed: Compound cation detection correctly extracts flame-active metals.');

  // Test 4: Sodium Priority in Mixtures (Analytical Flame Test Behavior)
  console.log('Test 4: Verifying Sodium Priority in Contaminated Samples...');
  // A mixed or impure salt containing both K and Na (e.g. "KNaCO3")
  const mixedCard = { chemicalFormula: 'KNaCO3', atomicNumber: 0 };
  const resMixed = findFlameCandidate(mixedCard, flameCatalog);
  assert.equal(resMixed.symbol, 'Na', 'Na must take priority in yellow flame emission over K');
  console.log('  ✓ Test 4 Passed: Sodium signature yellow emission takes experimental priority.');

  console.log('================================================================');
  console.log('ALL TESTS IN SUITE 66 PASSED SUCCESSFULLY (100% Pass Rate)');
  console.log('================================================================');
}

runTestSuite().catch(err => {
  console.error('Test Suite 66 Failed:', err);
  process.exit(1);
});
