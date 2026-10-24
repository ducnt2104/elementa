// tests/test-lithium-sulfur-battery.mjs
// Test Suite 250: Lithium-Sulfur (Li-S) Batteries & 2D MXene Separator Engine Audit
// Standards: IUPAC Electrochemistry, High-Energy Density Targets (> 500 Wh/kg) & Vietnam GDPT 2018 (Hóa 10 & 12: Đơn chất S8 & Pin năng lượng cao)

import assert from 'node:assert';
import {
  LIS_MULTISTEP_PATHWAY,
  LIS_BARRIER_STRATEGIES_CATALOG,
  getLiSBarrierStrategies,
  generateLiSDischargeCurve,
  simulateLiSCellPerformance
} from '../src/domain/lithiumSulfurBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 250: LITHIUM-SULFUR (Li-S) BATTERIES AUDIT     ');
console.log('======================================================================\n');

// 1. Verify Catalogs & Multistep Pathway Integrity
console.log('1. Checking Li-S Multistep Redox Pathway & Barrier Strategies...');
const strategies = getLiSBarrierStrategies();
assert(strategies.length >= 4, 'Must provide at least 4 barrier separator strategies');

const celgard = strategies.find(s => s.id === 'CONVENTIONAL_CELGARD');
const mxene = strategies.find(s => s.id === 'MXENE_TI3C2_INTERLAYER');
const mof = strategies.find(s => s.id === 'POLAR_MOF_SEPARATOR');
const solidState = strategies.find(s => s.id === 'ALL_SOLID_STATE_LIS');

assert(celgard && mxene && mof && solidState, 'All core barrier strategies must exist');
assert(LIS_MULTISTEP_PATHWAY.length === 5, 'Must accurately model all 5 stoichiometric reduction steps');

const finalStep = LIS_MULTISTEP_PATHWAY[4];
assert.strictEqual(finalStep.specificCapacityDeliveredMahG, 1675.0, 'Sulfur theoretical specific capacity must be exactly 1675 mAh/g');
console.log(`  ✓ Theoretical Sulfur Capacity: ${finalStep.specificCapacityDeliveredMahG} mAh/g verified`);

assert(mxene.cellEnergyDensityWhKg >= 500.0, '2D MXene Ti3C2 interlayer must enable cell energy density >= 500 Wh/kg');
assert(mxene.polysulfideShuttleCurrentReductionPercent >= 90.0, '2D MXene must reduce shuttle current by >= 90%');
console.log('  ✓ Catalogs verified: Celgard, 2D MXene (>500 Wh/kg), MOF ZIF-8, All-Solid-State Li-S\n');

// 2. Verify Two-Plateau Discharge Voltage Profile
console.log('2. Testing Two-Plateau Discharge Profile (Solid-to-Liquid vs Liquid-to-Solid)...');
const curve = generateLiSDischargeCurve();
assert(curve.length >= 30, 'Discharge curve must have at least 30 sampling data points');

const startPt = curve[0];
const highPlateauPt = curve[5];
const lowPlateauPt = curve[20];
const endPt = curve[curve.length - 1];

console.log(`  - Discharge Start (0% DOD): V_cell = ${startPt.cellVoltageV} V, Species = ${startPt.dominantPolysulfideSpeciesVi}`);
console.log(`  - High Plateau (DOD ${highPlateauPt.depthOfDischargePercent}%): V_cell = ${highPlateauPt.cellVoltageV} V, Species = ${highPlateauPt.dominantPolysulfideSpeciesVi}, Phase = ${highPlateauPt.reactionPhaseVi}`);
console.log(`  - Low Plateau (DOD ${lowPlateauPt.depthOfDischargePercent}%): V_cell = ${lowPlateauPt.cellVoltageV} V, Species = ${lowPlateauPt.dominantPolysulfideSpeciesVi}, Phase = ${lowPlateauPt.reactionPhaseVi}`);
console.log(`  - Discharge End (100% DOD): V_cell = ${endPt.cellVoltageV} V, Cap = ${endPt.deliveredCapacityMahG} mAh/g, Species = ${endPt.dominantPolysulfideSpeciesVi}`);

assert(highPlateauPt.cellVoltageV >= 2.15 && highPlateauPt.cellVoltageV <= 2.45, 'High plateau must operate between 2.15V and 2.45V');
assert(lowPlateauPt.cellVoltageV >= 1.90 && lowPlateauPt.cellVoltageV < 2.15, 'Low plateau must operate between 1.90V and 2.15V');
assert.strictEqual(highPlateauPt.reactionPhaseVi, 'SOLID_TO_LIQUID', 'High plateau must represent Solid S8 to Liquid Li2Sx conversion');
assert.strictEqual(lowPlateauPt.reactionPhaseVi, 'LIQUID_TO_SOLID_PRECIPITATION', 'Low plateau must represent Liquid Li2S4 to Solid Li2S precipitation');
assert.strictEqual(endPt.deliveredCapacityMahG, 1675.0, 'Full discharge must deliver 1675 mAh/g theoretical capacity');
console.log('  ✓ Two-plateau phase transition mechanics validated\n');

// 3. Verify Polysulfide Shuttle Suppression & Cell Sizing
console.log('3. Testing MXene Interlayer vs Conventional Celgard Cell Performance...');
const celgardSim = simulateLiSCellPerformance('CONVENTIONAL_CELGARD', 2.5);
const mxeneSim = simulateLiSCellPerformance('MXENE_TI3C2_INTERLAYER', 2.5);

console.log(`  - Celgard (2.5g S): Energy = ${celgardSim.cellEnergyDensityWhKg} Wh/kg, Shuttle Reduction = ${celgardSim.strategy.polysulfideShuttleCurrentReductionPercent}%, Cycle Fade = ${celgardSim.cycleFadeRatePerCyclePercent}%/cycle`);
console.log(`    Predicted Cycles to 80%: ${celgardSim.predictedCyclesTo80Percent} cycles, Verdict: ${celgardSim.verdictVi}`);

console.log(`  - 2D MXene (2.5g S): Energy = ${mxeneSim.cellEnergyDensityWhKg} Wh/kg, Shuttle Reduction = ${mxeneSim.strategy.polysulfideShuttleCurrentReductionPercent}%, Cycle Fade = ${mxeneSim.cycleFadeRatePerCyclePercent}%/cycle`);
console.log(`    Predicted Cycles to 80%: ${mxeneSim.predictedCyclesTo80Percent} cycles, Verdict: ${mxeneSim.verdictVi}`);

assert(celgardSim.predictedCyclesTo80Percent < 150, 'Conventional Celgard must degrade rapidly in < 150 cycles due to severe shuttle effect');
assert(mxeneSim.predictedCyclesTo80Percent >= 400, '2D MXene interlayer must extend lifespan to >= 400 cycles');
assert(mxeneSim.nominalCellCapacityAh >= 2.5, '2.5g sulfur cell with MXene must deliver nominal capacity >= 2.5 Ah');
assert(mxeneSim.cellEnergyDensityWhKg >= 500.0, 'MXene cell must reach >= 500 Wh/kg aviation milestone');
console.log('  ✓ Polysulfide shuttle suppression and 500 Wh/kg threshold verified\n');

// 4. Verify All-Solid-State Zero Dissolution Milestone
console.log('4. Testing All-Solid-State Li-S Zero-Dissolution Breakthrough...');
const solidSim = simulateLiSCellPerformance('ALL_SOLID_STATE_LIS', 2.5);
console.log(`  - Solid-State Li-S: Energy = ${solidSim.cellEnergyDensityWhKg} Wh/kg, Shuttle Reduction = ${solidSim.strategy.polysulfideShuttleCurrentReductionPercent}%, Life = ${solidSim.predictedCyclesTo80Percent} cycles`);

assert(solidSim.strategy.polysulfideShuttleCurrentReductionPercent >= 99.0, 'Solid-state electrolyte must eliminate > 99% of shuttle effect');
assert(solidSim.cellEnergyDensityWhKg >= 550.0, 'All-solid-state Li-S must achieve record energy density >= 550 Wh/kg');
console.log('  ✓ All-solid-state zero-dissolution mechanics validated\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 250 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
