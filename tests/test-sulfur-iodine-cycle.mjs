// tests/test-sulfur-iodine-cycle.mjs
// Test Suite 372: Sulfur-Iodine (S-I) Thermochemical Water-Splitting Engine Verification

import assert from 'assert';
import {
  SI_HEAT_SOURCES,
  calculateSulfurIodineCyclePerformance
} from '../src/domain/sulfurIodineCycleEngine.ts';

console.log('🧪 Running Test Suite 372: Sulfur-Iodine (S-I) Thermochemical Water-Splitting Cycle Engine...');

// 1. Heat Source Catalog
console.log('  1. Verifying S-I Primary Heat Source Catalog...');
assert(SI_HEAT_SOURCES.CONCENTRATED_SOLAR_TOWER, 'Concentrated Solar Tower must exist');
assert(SI_HEAT_SOURCES.HTGR_NUCLEAR_REACTOR, 'HTGR Nuclear Reactor must exist');
assert(SI_HEAT_SOURCES.FUSION_MOLTEN_SALT_HEAT, 'Fusion Molten Salt heat source must exist');

const htgr = SI_HEAT_SOURCES.HTGR_NUCLEAR_REACTOR;
assert(htgr.peakOperatingTempC >= 900.0, 'HTGR peak operating temperature must be >= 900°C');
console.log('  ✓ Heat source catalog verified.');

// 2. Closed-Loop 3-Step Reaction Thermodynamics
console.log('  2. Verifying 3-Step Reaction Temperatures & Conditions...');
const perf = calculateSulfurIodineCyclePerformance('CONCENTRATED_SOLAR_TOWER', 100.0, 900.0, 0.88);
console.log(`  ✓ 100 MWth Solar S-I Cycle: Peak Temp = ${perf.peakHeatSourceTempC}°C`);
console.log(`    Bunsen Reaction = ${perf.bunsenReactionTempC}°C, H2SO4 Decomp = ${perf.sulfuricDecompTempC}°C, HI Decomp = ${perf.hiDecompTempC}°C`);
console.log(`    Thermal-to-H2 Efficiency = ${perf.thermalEfficiencyPercent.toFixed(1)}%`);

assert.strictEqual(perf.bunsenReactionTempC, 120.0, 'Bunsen reaction temperature must be 120°C');
assert.strictEqual(perf.sulfuricDecompTempC, 900.0, 'Sulfuric acid decomposition temperature must be 900°C');
assert.strictEqual(perf.hiDecompTempC, 450.0, 'HI decomposition temperature must be 450°C');
assert(perf.thermalEfficiencyPercent >= 45.0 && perf.thermalEfficiencyPercent <= 53.0,
  `S-I thermal efficiency (${perf.thermalEfficiencyPercent}%) must be in 45 - 53% range`);
console.log('  ✓ 3-step thermochemical cycle operating points verified.');

// 3. Gigawatt-Scale Green Hydrogen Production & Economics
console.log('  3. Verifying Hydrogen Output & LCOH Economics...');
console.log(`  ✓ Hourly H2 = ${perf.hourlyHydrogenProductionKg.toFixed(1)} kg/h, Daily H2 = ${perf.dailyHydrogenProductionTons.toFixed(2)} tons/day`);
console.log(`    LCOH = $${perf.levelizedCostOfHydrogenUSDPerKg.toFixed(2)}/kg, Avoided CO2 = ${perf.annualAvoidedCO2Tons.toFixed(0)} tons/yr`);

assert(perf.hourlyHydrogenProductionKg >= 1000.0 && perf.hourlyHydrogenProductionKg <= 1600.0,
  `Hourly H2 (${perf.hourlyHydrogenProductionKg} kg/h) must be 1000 - 1600 kg/h for 100 MWth`);
assert(perf.levelizedCostOfHydrogenUSDPerKg >= 2.00 && perf.levelizedCostOfHydrogenUSDPerKg <= 3.00,
  `LCOH ($${perf.levelizedCostOfHydrogenUSDPerKg}/kg) must be $2.00 - $3.00/kg`);
assert(perf.annualAvoidedCO2Tons > 30000.0, 'Annual avoided CO2 must be > 30,000 tons/yr');
assert(perf.corrosionResistantAlloyMaterial.includes('Silicon Carbide'), 'Must specify SiC corrosion-resistant material');
console.log('  ✓ Large-scale hydrogen output, LCOH, and ceramic material specs confirmed.');

console.log('🎉 Test Suite 372 Passed (3/3 assertion groups clean)!');
