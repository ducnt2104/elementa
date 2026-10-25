/**
 * ELEMENTA - TEST SUITE 280: PHOTOCATALYTIC ARTIFICIAL PHOTOSYNTHESIS AUDIT
 *
 * Verifies:
 * 1. Photocatalyst Catalog & Bandgap Engineering (SrTiO3:Rh, BiVO4, g-C3N4, Ta3N5, TiO2)
 * 2. Nernstian Water Splitting Thermodynamics at pH 0, 7, and 14
 * 3. Z-Scheme Biomimicry & Band Alignment Feasibility
 * 4. Solar-to-Hydrogen (STH) Solar Farm Production Metrics
 * 5. Apparent Quantum Yield (AQY) & Light Intensity Formulas
 * 6. Multi-Architecture Technology Comparison Matrix
 */

import assert from 'assert';
import {
  PHOTOCATALYST_CATALOG,
  Z_SCHEME_CATALOG,
  Z_SCHEME_RELAYS,
  calculateWaterSplittingThermodynamics,
  evaluateBandAlignmentFeasibility,
  calculateSolarHydrogenProduction,
  calculateApparentQuantumYield,
  HYDROGEN_PRODUCTION_TECH_COMPARISON
} from '../src/domain/photocatalyticArtificialPhotosynthesisEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 280: ARTIFICIAL PHOTOSYNTHESIS & Z-SCHEME AUDIT');
console.log('======================================================================\n');

// 1. Check Photocatalyst Catalog & Bandgaps
console.log('1. Checking Photocatalyst Materials Catalog & Bandgap Engineering...');
const srTio3 = PHOTOCATALYST_CATALOG['SRTIO3_RH'];
assert(srTio3, 'SrTiO3:Rh must exist');
assert.strictEqual(srTio3.conductionBandMinV, -0.85, 'SrTiO3:Rh CB must be -0.85 V vs NHE');
assert.strictEqual(srTio3.semiconductorClass, 'HYDROGEN_EVOLUTION_HEP', 'SrTiO3:Rh must be HEP');

const biVo4 = PHOTOCATALYST_CATALOG['BISMUTH_VANADATE_BIVO4'];
assert(biVo4, 'BiVO4 must exist');
assert.strictEqual(biVo4.valenceBandMaxV, 2.42, 'BiVO4 VB must be +2.42 V vs NHE');
assert.strictEqual(biVo4.semiconductorClass, 'OXYGEN_EVOLUTION_OEP', 'BiVO4 must be OEP');

const gC3N4 = PHOTOCATALYST_CATALOG['GRAPHITIC_CARBON_NITRIDE_G_C3N4'];
assert(gC3N4, 'g-C3N4 must exist');
assert(gC3N4.conductionBandMinV < -1.0, 'g-C3N4 must have highly negative CB (-1.13 V)');

const ta3N5 = PHOTOCATALYST_CATALOG['TANTALUM_NITRIDE_TA3N5'];
assert(ta3N5, 'Ta3N5 must exist');
assert.strictEqual(ta3N5.absorptionEdgeNm, 596, 'Ta3N5 absorption edge must extend to 596 nm');

console.log(`  - SrTiO3:Rh CB = ${srTio3.conductionBandMinV} V, Eg = ${srTio3.bandgapEv} eV`);
console.log(`  - BiVO4 VB = ${biVo4.valenceBandMaxV} V, Eg = ${biVo4.bandgapEv} eV`);
console.log(`  - g-C3N4 CB = ${gC3N4.conductionBandMinV} V (metal-free polymer)`);
console.log(`  - Ta3N5 Absorption Edge = ${ta3N5.absorptionEdgeNm} nm (broad visible)`);
console.log('  ✓ Photocatalyst catalog and band structure verified\n');

// 2. Testing Nernstian Water Splitting Thermodynamics
console.log('2. Testing Nernstian Water Splitting Potentials at varying pH...');
const thermoPh0 = calculateWaterSplittingThermodynamics(0);
assert.strictEqual(thermoPh0.herPotentialVVsNHE, 0.00, 'HER potential at pH 0 must be 0.00 V');
assert.strictEqual(thermoPh0.oerPotentialVVsNHE, 1.229, 'OER potential at pH 0 must be 1.229 V');

const thermoPh7 = calculateWaterSplittingThermodynamics(7);
assert(Math.abs(thermoPh7.herPotentialVVsNHE - (-0.414)) < 0.01, 'HER potential at pH 7 must be ~ -0.414 V');
assert(Math.abs(thermoPh7.oerPotentialVVsNHE - 0.815) < 0.01, 'OER potential at pH 7 must be ~ +0.815 V');
const deltaE7 = thermoPh7.oerPotentialVVsNHE - thermoPh7.herPotentialVVsNHE;
assert(Math.abs(deltaE7 - 1.229) < 0.01, 'Cell potential difference must remain 1.229 V');

const thermoPh14 = calculateWaterSplittingThermodynamics(14);
assert(Math.abs(thermoPh14.herPotentialVVsNHE - (-0.828)) < 0.01, 'HER potential at pH 14 must be ~ -0.828 V');
assert(Math.abs(thermoPh14.oerPotentialVVsNHE - 0.401) < 0.01, 'OER potential at pH 14 must be ~ +0.401 V');

console.log(`  - pH 0:  HER = ${thermoPh0.herPotentialVVsNHE} V, OER = ${thermoPh0.oerPotentialVVsNHE} V, ΔE = ${thermoPh0.oerPotentialVVsNHE - thermoPh0.herPotentialVVsNHE} V`);
console.log(`  - pH 7:  HER = ${thermoPh7.herPotentialVVsNHE} V, OER = ${thermoPh7.oerPotentialVVsNHE} V, ΔE = ${deltaE7.toFixed(3)} V`);
console.log(`  - pH 14: HER = ${thermoPh14.herPotentialVVsNHE} V, OER = ${thermoPh14.oerPotentialVVsNHE} V`);
console.log('  ✓ Nernstian thermodynamic shifting confirmed\n');

// 3. Testing Z-Scheme Band Alignment Feasibility
console.log('3. Testing Z-Scheme Band Alignment Feasibility...');
const domenAlignment = evaluateBandAlignmentFeasibility('SRTIO3_RH', 'BISMUTH_VANADATE_BIVO4', 7.0);
assert.strictEqual(domenAlignment.isFeasible, true, 'Domen sheet (SrTiO3:Rh + BiVO4) must be feasible at pH 7');
assert(domenAlignment.herDrivingForceV > 0.4, 'HER driving force must be > 0.4 V');
assert(domenAlignment.oerDrivingForceV > 1.0, 'OER driving force must be > 1.0 V');

console.log(`  - Domen Sheet Feasibility: ${domenAlignment.isFeasible}`);
console.log(`  - HER Overpotential Driving Force: +${domenAlignment.herDrivingForceV} V`);
console.log(`  - OER Overpotential Driving Force: +${domenAlignment.oerDrivingForceV} V`);
console.log(`  - Assessment: ${domenAlignment.assessment}`);
console.log('  ✓ Z-Scheme band alignment feasibility confirmed\n');

// 4. Testing Solar-to-Hydrogen (STH) Solar Farm Production
console.log('4. Testing Solar-to-Hydrogen (STH) Production Metrics...');
// 100 m² panel array, 1.2% STH, 1000 W/m², 5.5 sun hours/day
const farmYield = calculateSolarHydrogenProduction(100, 1.20, 1000, 5.5);
assert(farmYield.hydrogenRateGramsPerHour > 30, 'H2 production rate must be > 30 g/h');
assert(farmYield.hydrogenDailyKg > 0.15, 'Daily H2 must be > 0.15 kg/day');
assert(farmYield.cleanWaterConsumedLitersPerDay > 1.5, 'Water consumption must be > 1.5 L/day');
assert(farmYield.equivalentCleanFuelKmPerDay > 15, 'Clean FCEV range must be > 15 km/day');
assert(farmYield.fossilCo2AvoidedKgPerDay > 1.5, 'CO2 avoided must be > 1.5 kg/day');

console.log(`  - Array Area: ${farmYield.panelAreaM2} m² at 1.20% STH`);
console.log(`  - H2 Rate: ${farmYield.hydrogenRateMolPerHour} mol/h (${farmYield.hydrogenRateGramsPerHour} g/h)`);
console.log(`  - Daily Production: ${farmYield.hydrogenDailyKg} kg H2/day + ${farmYield.oxygenDailyKg} kg O2/day`);
console.log(`  - Pure Water Consumed: ${farmYield.cleanWaterConsumedLitersPerDay} Liters/day`);
console.log(`  - FCEV Driving Range Equivalent: ${farmYield.equivalentCleanFuelKmPerDay} km/day`);
console.log(`  - Fossil CO2 Emissions Avoided: ${farmYield.fossilCo2AvoidedKgPerDay} kg CO2/day`);
console.log('  ✓ Solar-to-Hydrogen calculations verified\n');

// 5. Testing Apparent Quantum Yield (AQY) Calculation
console.log('5. Testing Apparent Quantum Yield (AQY)...');
// 420 nm, 150 umol H2/h, 50 mW incident light
const aqyResult = calculateApparentQuantumYield(420, 150, 50);
assert(aqyResult.aqyPct > 0 && aqyResult.aqyPct <= 100, 'AQY must be between 0 and 100%');
console.log(`  - Monochromatic Wavelength: 420 nm, Incident Power: 50 mW`);
console.log(`  - Evolved H2 Rate: 150 umol/h`);
console.log(`  - Apparent Quantum Yield (AQY): ${aqyResult.aqyPct}%`);
console.log(`  - Explanation: ${aqyResult.explanation}`);
console.log('  ✓ Apparent Quantum Yield equations validated\n');

// 6. Checking Technology Comparison Matrix
console.log('6. Checking Hydrogen Production Architectures Comparison...');
assert.strictEqual(HYDROGEN_PRODUCTION_TECH_COMPARISON.length, 3, 'Must compare 3 architectures');

const particulate = HYDROGEN_PRODUCTION_TECH_COMPARISON.find(t => t.category === 'PARTICULATE_PHOTOCATALYSIS');
assert(particulate, 'Particulate Photocatalysis must exist');
assert.strictEqual(particulate.capitalCostUsdPerM2, 12.0, 'Particulate CAPEX should be ~ $12/m²');
assert.strictEqual(particulate.externalBiasRequired, false, 'Particulate requires zero external bias');

const pvElectrolyzer = HYDROGEN_PRODUCTION_TECH_COMPARISON.find(t => t.category === 'PV_ELECTROLYZER');
assert(pvElectrolyzer, 'PV + Electrolyzer must exist');
assert(pvElectrolyzer.capitalCostUsdPerM2 > 300, 'PV + Electrolyzer CAPEX should be > $300/m²');

console.log(`  - Particulate Z-Scheme: CAPEX = $${particulate.capitalCostUsdPerM2}/m², External Bias = ${particulate.externalBiasRequired}`);
console.log(`  - PV + Electrolyzer:    CAPEX = $${pvElectrolyzer.capitalCostUsdPerM2}/m², External Bias = ${pvElectrolyzer.externalBiasRequired}`);
console.log('  ✓ Multi-technology comparison verified\n');

console.log('======================================================================');
console.log('   TEST SUITE 280: ALL ARTIFICIAL PHOTOSYNTHESIS CHECKS PASSED!');
console.log('======================================================================');
