// tests/test-methane-pyrolysis-molten-metal.mjs
// ============================================================================
// TEST SUITE 384: THERMOCHEMICAL METHANE PYROLYSIS IN MOLTEN METALS AUDIT
// Auditing IUPAC Thermodynamics, Bubble Kinetics, Stokes Buoyancy,
// Turquoise Hydrogen Economics, and Coproduct Solid Carbon Yields
// ============================================================================

import assert from 'assert';
import {
  MethanePyrolysisMoltenMetalEngine,
  MOLTEN_ALLOYS,
  CARBON_MARKET_GRADES,
  ENTHALPY_METHANE_PYROLYSIS_KJ_MOL,
  MOLAR_MASS_CH4,
  MOLAR_MASS_H2,
  MOLAR_MASS_C
} from '../src/domain/methanePyrolysisMoltenMetalEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 384: METHANE PYROLYSIS IN MOLTEN METALS AUDIT');
console.log('======================================================================\n');

// 1. Audit IUPAC Thermodynamics & Mass Balance
console.log('1. Auditing IUPAC Reaction Stoichiometry & Enthalpy...');
console.log(`   -> Enthalpy of reaction: ${ENTHALPY_METHANE_PYROLYSIS_KJ_MOL} kJ/mol CH4`);
assert.strictEqual(ENTHALPY_METHANE_PYROLYSIS_KJ_MOL, 74.85, 'Reaction enthalpy must match IUPAC standard');

const massBalanceCheck = MOLAR_MASS_CH4 - (MOLAR_MASS_C + 2 * MOLAR_MASS_H2);
assert.ok(Math.abs(massBalanceCheck) < 0.0001, 'Molar mass balance must strictly close (CH4 -> C + 2H2)');
console.log('   -> IUPAC stoichiometry and mass balance verified.');

// 2. Audit Bubble Residence Time & Conversion Kinetics
console.log('\n2. Auditing Bubble Hydrodynamics & Arrhenius Cracking Conversion...');
const niBiAlloy = MOLTEN_ALLOYS.find(a => a.id === 'Ni-Bi');
assert.ok(niBiAlloy, 'Ni-Bi alloy must be present');

const kinetics = MethanePyrolysisMoltenMetalEngine.calculateConversion(niBiAlloy, 2.5, 1.0, 2.0);
console.log(`   -> Column Height: 2.5m | Bubble Diameter: ${kinetics.bubbleDiameterMm} mm`);
console.log(`   -> Residence Time: ${kinetics.residenceTimeSeconds} s | Rate Constant: ${kinetics.rateConstantS1} s⁻¹`);
console.log(`   -> Single-pass Conversion: ${kinetics.conversionPercent}%`);

assert.ok(kinetics.residenceTimeSeconds >= 1.0 && kinetics.residenceTimeSeconds <= 4.0,
  `Bubble residence time should be 1.0 - 4.0s (got ${kinetics.residenceTimeSeconds}s)`);
assert.ok(kinetics.conversionPercent >= 85.0 && kinetics.conversionPercent <= 99.5,
  `Methane single-pass conversion must be 85 - 99.5% (got ${kinetics.conversionPercent}%)`);
console.log('   -> Molten metal bubble cracking kinetics verified.');

// 3. Audit Stokes Buoyancy Floatation Velocity of Carbon
console.log('\n3. Auditing Solid Carbon Stokes Buoyancy Floatation...');
const buoyancyVelocitySingle = MethanePyrolysisMoltenMetalEngine.calculateCarbonBuoyancyVelocity(50, niBiAlloy.densityKgM3, niBiAlloy.viscosityPaS);
const buoyancyVelocityCluster = MethanePyrolysisMoltenMetalEngine.calculateCarbonBuoyancyVelocity(150, niBiAlloy.densityKgM3, niBiAlloy.viscosityPaS);
console.log(`   -> Carbon 50µm primary grain upward velocity in molten Bi: ${buoyancyVelocitySingle} cm/s`);
console.log(`   -> Carbon 150µm sintered floc upward velocity in molten Bi: ${buoyancyVelocityCluster} cm/s`);

assert.ok(buoyancyVelocitySingle >= 0.4 && buoyancyVelocitySingle <= 1.2,
  `50µm single carbon grain floatation velocity should be 0.4 - 1.2 cm/s (got ${buoyancyVelocitySingle} cm/s)`);
assert.ok(buoyancyVelocityCluster >= 4.0 && buoyancyVelocityCluster <= 9.0,
  `150µm sintered carbon cluster floatation velocity should be 4.0 - 9.0 cm/s (got ${buoyancyVelocityCluster} cm/s)`);
console.log('   -> Anti-coking self-skimming floatation physics verified.');

// 4. Audit Industrial Turquoise Hydrogen Plant Simulation
console.log('\n4. Auditing 1,000 Nm³/h Methane Pyrolysis Plant Sizing...');
const plant = MethanePyrolysisMoltenMetalEngine.simulatePyrolysisPlant({
  methaneFeedRateNm3H: 1000,
  reactorPressureBar: 2.0,
  liquidColumnHeightM: 2.5,
  orificeDiameterMm: 1.0,
  selectedAlloyId: 'Ni-Bi',
  externalHeatSource: 'Electric_Induction',
  carbonProductType: 'Conductive_Carbon_Black'
}, 0.30, 0.04);

console.log(`   -> Hydrogen Production: ${plant.hydrogenProductionKgH} kg/h (${plant.hydrogenProductionNm3H} Nm³/h)`);
console.log(`   -> Solid Carbon Yield: ${plant.solidCarbonYieldKgH} kg/h`);
console.log(`   -> Specific Electricity: ${plant.specificElectricityKwhPerKgH2} kWh/kg H2`);
console.log(`   -> Electricity Savings vs Water Electrolysis: ${plant.electricitySavingsVsWaterElectrolysisPercent}%`);
console.log(`   -> Direct CO2 Emissions: ${plant.co2DirectEmissionKgPerKgH2} kg CO2/kg H2 (Zero direct CO2)`);
console.log(`   -> Carbon Revenue: $${plant.carbonRevenueDollarHour}/hour`);
console.log(`   -> Gross LCOH (before carbon credit): $${plant.grossLcohDollarKg}/kg H2`);
console.log(`   -> Net LCOH (after carbon coproduct credit): $${plant.netLcohDollarKg}/kg H2`);
console.log(`   -> Avoided SMR CO2 Emissions: ${plant.avoidedCo2EmissionsTonsYear} tons CO2/year`);

// Verify stoichiometric 3:1 Carbon to Hydrogen mass ratio
const cToH2Ratio = plant.solidCarbonYieldKgH / plant.hydrogenProductionKgH;
assert.ok(Math.abs(cToH2Ratio - 2.978) < 0.05, `C to H2 ratio must be ~2.98 (got ${cToH2Ratio.toFixed(3)})`);

// Verify electricity savings (> 80% vs PEM 52 kWh/kg)
assert.ok(plant.specificElectricityKwhPerKgH2 >= 6.0 && plant.specificElectricityKwhPerKgH2 <= 11.0,
  `Specific electricity must be 6 - 11 kWh/kg H2 (got ${plant.specificElectricityKwhPerKgH2})`);
assert.ok(plant.electricitySavingsVsWaterElectrolysisPercent >= 75,
  `Electricity savings vs water electrolysis must be > 75% (got ${plant.electricitySavingsVsWaterElectrolysisPercent}%)`);

// Verify Gross LCOH and Net LCOH competitiveness
assert.ok(plant.grossLcohDollarKg >= 2.00 && plant.grossLcohDollarKg <= 3.50,
  `Gross LCOH must be $2.00 - $3.50/kg H2 (got $${plant.grossLcohDollarKg})`);
assert.ok(plant.netLcohDollarKg < 1.00,
  `Net LCOH with carbon credit can be negative or highly lucrative < $1.00/kg H2 (got $${plant.netLcohDollarKg})`);

// Verify zero direct CO2
assert.strictEqual(plant.co2DirectEmissionKgPerKgH2, 0.00, 'Direct CO2 emissions must be exactly 0.00 kg/kg H2');

// 5. Audit Carbon Market Grades
console.log('\n5. Auditing Carbon Nanotube & Graphite Coproduct Catalog...');
assert.strictEqual(CARBON_MARKET_GRADES.length, 3, 'Must support 3 carbon market grades');
const mwcnt = CARBON_MARKET_GRADES.find(c => c.gradeId === 'Carbon_Nanotubes_MWCNT');
assert.ok(mwcnt, 'Must include MWCNT grade');
assert.strictEqual(mwcnt.marketPriceDollarKg, 8.50, 'MWCNT market price should be $8.50/kg');

console.log('\n======================================================================');
console.log('   SUITE 384: ALL ASSERTIONS PASSED WITH ZERO REGRESSIONS!');
console.log('======================================================================\n');
