// tests/test-quantum-dots.mjs
// Test Suite 228: Quantum Dots, Brus Equation & QLED Nanotechnology Engine
// Conforming to Nobel Prize in Chemistry 2023 & Vietnam GDPT 2018 Standards

import assert from 'assert';
import {
  QUANTUM_DOT_CATALOG,
  calculateBrusBandgap,
  CORE_SHELL_PROFILES
} from '../src/domain/quantumDotsEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 228: QUANTUM DOTS & CONFINEMENT ENGINE        ');
console.log('======================================================================\n');

// 1. Quantum Dot Materials Catalog & EU RoHS Compliance
{
  assert(Object.keys(QUANTUM_DOT_CATALOG).length >= 4, 'Must include at least 4 canonical quantum dot materials');

  const cdse = QUANTUM_DOT_CATALOG.CDSE;
  const inp = QUANTUM_DOT_CATALOG.INP;
  const perovskite = QUANTUM_DOT_CATALOG.CSPBBR3;
  const cdots = QUANTUM_DOT_CATALOG.CARBON_DOTS;

  assert(cdse && !cdse.rohsCompliant, 'CdSe contains Cadmium (not RoHS compliant)');
  assert(inp && inp.rohsCompliant, 'InP/ZnS must be RoHS compliant for commercial QLED TV');
  assert(cdots && cdots.chemicalFormula === 'C-dots', 'Carbon dots must be present');
  assert(perovskite && perovskite.bulkBandgapEv > 2.0, 'CsPbBr3 must have bulk bandgap > 2.0 eV');

  console.log('  ✓ Quantum dot materials catalog verified (CdSe, InP/ZnS, CsPbBr3, Carbon Dots)');
}

// 2. Brus Equation Quantum Confinement (Size-Tunable Colors)
{
  // Small CdSe QD: Radius = 1.5 nm (Diameter = 3.0 nm)
  const smallCdSe = calculateBrusBandgap('CDSE', 1.5);
  // Medium CdSe QD: Radius = 2.5 nm (Diameter = 5.0 nm)
  const mediumCdSe = calculateBrusBandgap('CDSE', 2.5);
  // Large CdSe QD: Radius = 4.0 nm (Diameter = 8.0 nm)
  const largeCdSe = calculateBrusBandgap('CDSE', 4.0);

  // Verification of quantum confinement: smaller size -> higher bandgap Eg
  assert(smallCdSe.effectiveBandgapEv > mediumCdSe.effectiveBandgapEv, 'Bandgap must increase as size decreases');
  assert(mediumCdSe.effectiveBandgapEv > largeCdSe.effectiveBandgapEv, 'Bandgap must increase as size decreases');

  // Verification of wavelength blueshift: smaller size -> shorter emission wavelength lambda
  assert(smallCdSe.emissionWavelengthNm < mediumCdSe.emissionWavelengthNm, 'Wavelength must blueshift with smaller size');
  assert(mediumCdSe.emissionWavelengthNm < largeCdSe.emissionWavelengthNm, 'Wavelength must blueshift with smaller size');

  // Confinement energy scaling: ~ 1/R^2
  assert(smallCdSe.confinementEnergyEv > largeCdSe.confinementEnergyEv * 5, 'Confinement energy must scale strongly with 1/R^2');

  // Regimes
  assert.strictEqual(smallCdSe.confinementRegime, 'STRONG_CONFINEMENT', 'R=1.5nm must be in Strong Confinement (R < a_B)');

  console.log(`  ✓ Brus equation size-tunable emission confirmed for CdSe:
      - R = 1.5 nm: Eg = ${smallCdSe.effectiveBandgapEv} eV, λ = ${smallCdSe.emissionWavelengthNm} nm (${smallCdSe.colorNameVi})
      - R = 2.5 nm: Eg = ${mediumCdSe.effectiveBandgapEv} eV, λ = ${mediumCdSe.emissionWavelengthNm} nm (${mediumCdSe.colorNameVi})
      - R = 4.0 nm: Eg = ${largeCdSe.effectiveBandgapEv} eV, λ = ${largeCdSe.emissionWavelengthNm} nm (${largeCdSe.colorNameVi})`);
}

// 3. Commercial Eco-Friendly InP QLED TV Verification
{
  const blueInp = calculateBrusBandgap('INP', 1.8);
  const greenInp = calculateBrusBandgap('INP', 2.4);
  const redInp = calculateBrusBandgap('INP', 3.8);

  assert(blueInp.emissionWavelengthNm < 500, 'Small InP must emit in blue/cyan');
  assert(redInp.emissionWavelengthNm > 600, 'Large InP must emit in red');
  assert(greenInp.plqyPercent > 70, 'Commercial QLED must exhibit high PLQY > 70%');

  console.log(`  ✓ Eco-Friendly InP QLED display RGB pixels verified: Blue ${blueInp.emissionWavelengthNm} nm, Green ${greenInp.emissionWavelengthNm} nm, Red ${redInp.emissionWavelengthNm} nm`);
}

// 4. Core-Shell Heterostructures & Type-I Band Alignment
{
  assert(CORE_SHELL_PROFILES.length >= 3, 'Must include Type-I and Type-II core-shell profiles');

  const type1 = CORE_SHELL_PROFILES.find(p => p.alignmentType === 'TYPE_I');
  const type2 = CORE_SHELL_PROFILES.find(p => p.alignmentType === 'TYPE_II');

  assert(type1 && type1.passivationEfficiencyPercent > 85, 'Type-I core-shell passivation must exceed 85%');
  assert(type2 && type2.explanationVi.includes('Type-II'), 'Type-II profile must explain charge separation');

  console.log('  ✓ Core-Shell band alignment validated (Type-I CdSe/ZnS passivation vs Type-II CdTe/CdSe exciton lifetime extension)');
}

console.log('\n======================================================================');
console.log('   ALL 4 TESTS IN SUITE 228 PASSED WITH DISTINCTION!                 ');
console.log('======================================================================\n');
