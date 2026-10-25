// tests/test-seawater-uranium-extraction.mjs
// ============================================================================
// TEST SUITE 388: SEAWATER URANIUM EXTRACTION & ELECTROCHEMICAL ELUTION AUDIT
// Auditing IUPAC Marine Radiochemistry, Uranyl Chelation Kinetics,
// Offshore Adsorbent Array Sizing, and Zero-Mining Nuclear Sustainability
// ============================================================================

import assert from 'assert';
import {
  SeawaterUraniumExtractionEngine,
  ADSORBENT_CATALOG,
  TERRESTRIAL_VS_MARINE_COMPARISON,
  SEAWATER_URANIUM_CONCENTRATION_PPB,
  GLOBAL_OCEAN_URANIUM_TONS,
  ENERGY_DENSITY_U_NATURAL_MWH_KG
} from '../src/domain/seawaterUraniumExtractionEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 388: SEAWATER URANIUM EXTRACTION AUDIT');
console.log('======================================================================\n');

// 1. Audit IUPAC Marine Radiochemistry Constants
console.log('1. Auditing Oceanic Uranium Inventory & Physical Constants...');
console.log(`   -> Seawater Uranium Concentration: ${SEAWATER_URANIUM_CONCENTRATION_PPB} ppb (µg/L)`);
console.log(`   -> Total Oceanic Uranium Reserve: ${GLOBAL_OCEAN_URANIUM_TONS / 1e9} Billion Tons`);
console.log(`   -> Nuclear Energy Density: ${ENERGY_DENSITY_U_NATURAL_MWH_KG} kWh / kg U`);

assert.strictEqual(SEAWATER_URANIUM_CONCENTRATION_PPB, 3.30, 'Dissolved uranyl tricarbonate must be 3.3 ppb');
assert.strictEqual(GLOBAL_OCEAN_URANIUM_TONS, 4.5e9, 'Global ocean inventory must be 4.5 billion tons U');
assert.strictEqual(ENERGY_DENSITY_U_NATURAL_MWH_KG, 60000, 'Energy density must be 60,000 kWh/kg U');
console.log('   -> Marine radiochemistry constants strictly verified.');

// 2. Audit Adsorbent Kinetics & Uranyl Chelation
console.log('\n2. Auditing Pseudo-Second-Order Uranyl Chelation Kinetics...');
const standardFiber = ADSORBENT_CATALOG.find(a => a.id === 'Braided_Amidoxime_PE');
assert.ok(standardFiber, 'Braided amidoxime fiber must exist');

const kinetics = SeawaterUraniumExtractionEngine.calculateAdsorptionUptake(standardFiber, 42, 0.50, 22.0);
console.log(`   -> Immersion: 42 days | Seawater Temp: 22°C | Flow: 0.50 m/s`);
console.log(`   -> Uptake: ${kinetics.uptakeMgUG} mg U / g adsorbent (${kinetics.effectiveCapacityKgUPerTonFiber} kg U / ton fiber)`);
console.log(`   -> Fraction of Equilibrium: ${(kinetics.fractionOfEquilibrium * 100).toFixed(1)}%`);

assert.ok(kinetics.uptakeMgUG >= 6.0 && kinetics.uptakeMgUG <= 11.0,
  `42-day uptake should be 6.0 - 11.0 mg/g (got ${kinetics.uptakeMgUG} mg/g)`);
assert.ok(kinetics.fractionOfEquilibrium >= 0.60 && kinetics.fractionOfEquilibrium <= 0.85,
  `Fraction of equilibrium should be 60 - 85% (got ${kinetics.fractionOfEquilibrium})`);
console.log('   -> Uranyl chelation kinetics and equilibrium verified.');

// 3. Audit 500-Ton Offshore Marine Farm Simulation
console.log('\n3. Auditing 500-Ton Offshore Adsorbent Array Campaign...');
const farm = SeawaterUraniumExtractionEngine.simulateCampaign({
  adsorbentBraidsTotalTons: 500,
  oceanCurrentVelocityMS: 0.50,
  seawaterTemperatureC: 22.0,
  immersionDurationDays: 42,
  selectedAdsorbentId: 'Braided_Amidoxime_PE',
  desorptionPulseVoltageV: -0.65
});

console.log(`   -> Uranium Harvest per Cycle: ${farm.uraniumHarvestedPerCycleKg} kg U / cycle`);
console.log(`   -> Annual Uranium Harvest: ${farm.annualUraniumHarvestTons} tons U / year`);
console.log(`   -> Equivalent Seawater Processed: ${farm.seawaterFilteredEquivalentKm3} km³ ocean volume`);
console.log(`   -> Electrochemical Elution Recovery: ${farm.elutionRecoveryPercent}%`);
console.log(`   -> Yellowcake Equivalent: ${farm.yellowcakeProductKgYear} kg/year`);
console.log(`   -> Nuclear Power Generation: ${farm.nuclearElectricityPotentialTWhYear} TWh / year`);
console.log(`   -> Production Cost: $${farm.productionCostDollarPerKgU} / kg U`);
console.log(`   -> Avoided Mine Tailings: ${farm.avoidedMiningTailingsTonsYear} tons / year`);

assert.ok(farm.uraniumHarvestedPerCycleKg >= 3000 && farm.uraniumHarvestedPerCycleKg <= 5000,
  `Harvest per cycle should be 3,000 - 5,000 kg U (got ${farm.uraniumHarvestedPerCycleKg} kg)`);
assert.ok(farm.annualUraniumHarvestTons >= 20.0 && farm.annualUraniumHarvestTons <= 40.0,
  `Annual harvest should be 20 - 40 tons U/year (got ${farm.annualUraniumHarvestTons} tons)`);
assert.strictEqual(farm.elutionRecoveryPercent, 97.5, 'Electrochemical elution recovery must be 97.5%');
assert.ok(farm.nuclearElectricityPotentialTWhYear >= 1.0 && farm.nuclearElectricityPotentialTWhYear <= 3.0,
  `Nuclear electricity should be 1.0 - 3.0 TWh/year (got ${farm.nuclearElectricityPotentialTWhYear} TWh)`);
assert.ok(farm.productionCostDollarPerKgU >= 160 && farm.productionCostDollarPerKgU <= 260,
  `Production cost must be $160 - $260/kg U (got $${farm.productionCostDollarPerKgU})`);

// 4. Audit Terrestrial vs Marine Mining Benchmark
console.log('\n4. Auditing Terrestrial vs Marine Mining Footprint...');
assert.strictEqual(TERRESTRIAL_VS_MARINE_COMPARISON.length, 2, 'Must benchmark marine vs terrestrial mining');
const marine = TERRESTRIAL_VS_MARINE_COMPARISON.find(b => b.source === 'Seawater_Extraction');
const terrestrial = TERRESTRIAL_VS_MARINE_COMPARISON.find(b => b.source === 'Conventional_Terrestrial_Mines');
assert.ok(marine && terrestrial, 'Must have both marine and terrestrial sources');
assert.strictEqual(marine.tailingsWasteTonsPerKgU, 0, 'Marine uranium extraction must produce 0 tailings');
assert.strictEqual(terrestrial.tailingsWasteTonsPerKgU, 1800, 'Terrestrial mining generates 1,800 tons tailings per kg U');

console.log('\n======================================================================');
console.log('   SUITE 388: ALL ASSERTIONS PASSED WITH ZERO REGRESSIONS!');
console.log('======================================================================\n');
