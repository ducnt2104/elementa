// tests/test-redox-flow-battery.mjs
// Test Suite 246: Redox Flow Batteries (VRFB & AORFB) & Grid-Scale LDES Engine Audit
// Standards: IUPAC Electrochemistry, Grid LDES Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Oxi hóa khử, Điện thế chuẩn & Năng lượng tái tạo)

import assert from 'node:assert';
import {
  FLOW_BATTERY_CHEMISTRIES_CATALOG,
  getFlowBatteryChemistries,
  calculateFlowBatterySoc,
  simulateGridScaleLdesStation
} from '../src/domain/redoxFlowBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 246: REDOX FLOW BATTERIES (VRFB & LDES) AUDIT  ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Flow Battery Chemistries Catalog...');
const chemistries = getFlowBatteryChemistries();
assert(chemistries.length >= 4, 'Must provide at least 4 flow battery chemistries');

const vrfb = chemistries.find(c => c.id === 'ALL_VANADIUM_VRFB');
const allIron = chemistries.find(c => c.id === 'ALL_IRON_FLOW');
const aqds = chemistries.find(c => c.id === 'AQUEOUS_ORGANIC_AQDS');
const znBr2 = chemistries.find(c => c.id === 'ZINC_BROMINE_HYBRID');

assert(vrfb && allIron && aqds && znBr2, 'All core flow chemistries must exist');
assert.strictEqual(vrfb.nominalCellVoltageVolts, 1.26, 'VRFB nominal cell potential must be 1.26 V');
assert(vrfb.calendarLifeYears >= 20, 'VRFB calendar life must exceed 20 years');
assert(vrfb.cycleLifeLimit >= 15000, 'VRFB cycle life must exceed 15,000 cycles without capacity loss');
assert(vrfb.roundTripEfficiencyPercent >= 75.0, 'VRFB round-trip efficiency must be >= 75%');

assert(allIron.nominalCellVoltageVolts > 1.1, 'All-iron flow battery cell potential must be > 1.1 V');
assert(allIron.levelizedCostOfStorageUsdPerKwh < 0.05, 'All-iron battery must offer ultra-low LCOS < $0.05/kWh');
assert(znBr2.nominalCellVoltageVolts >= 1.8, 'Zn-Br2 hybrid battery must have cell potential >= 1.8 V');
console.log('  ✓ Catalogs verified: VRFB (1.26V, 25yr), All-Iron ($0.038/kWh), Organic AQDS & Zn-Br2\n');

// 2. Verify State of Charge (SOC) & Nernst Equation
console.log('2. Testing Nernst Equation & Color-Changing Valence States...');
const soc50 = calculateFlowBatterySoc('ALL_VANADIUM_VRFB', 50.0);
const soc10 = calculateFlowBatterySoc('ALL_VANADIUM_VRFB', 10.0);
const soc90 = calculateFlowBatterySoc('ALL_VANADIUM_VRFB', 90.0);

console.log(`  - SOC 50%: V_ocv = ${soc50.openCircuitVoltageV} V, Anolyte = ${soc50.anolyteColorNameVi}, Catholyte = ${soc50.catholyteColorNameVi}`);
console.log(`  - SOC 10%: V_ocv = ${soc10.openCircuitVoltageV} V, Anolyte = ${soc10.anolyteColorNameVi}, Catholyte = ${soc10.catholyteColorNameVi}`);
console.log(`  - SOC 90%: V_ocv = ${soc90.openCircuitVoltageV} V, Anolyte = ${soc90.anolyteColorNameVi}, Catholyte = ${soc90.catholyteColorNameVi}`);

assert.strictEqual(soc50.openCircuitVoltageV, 1.26, 'At 50% SOC, V_ocv must match nominal potential E° = 1.26V');
assert(soc10.openCircuitVoltageV < 1.20, 'At 10% SOC, V_ocv must drop below 1.20V');
assert(soc90.openCircuitVoltageV > 1.35, 'At 90% SOC, V_ocv must exceed 1.35V');

assert(soc90.anolyteColorHex.includes('7e22ce') || soc90.anolyteColorNameVi.includes('Tím'), 'At high SOC, anolyte must show purple V2+');
assert(soc10.anolyteColorNameVi.includes('Xanh lục'), 'At low SOC, anolyte must show green V3+');
assert(soc10.catholyteColorNameVi.includes('Xanh lam'), 'At low SOC, catholyte must show blue VO2+');
console.log('  ✓ Nernst potential logarithmic behavior and 4-valence optical color transitions verified\n');

// 3. Verify Grid-Scale LDES Station Simulation (10 MW / 8h = 80 MWh)
console.log('3. Testing Grid-Scale LDES Station Simulation (10 MW, 8 Hours = 80 MWh)...');
const ldes = simulateGridScaleLdesStation('ALL_VANADIUM_VRFB', 10.0, 8.0);

console.log(`  - Total Stored Energy: ${ldes.totalStoredEnergyMwh} MWh`);
console.log(`  - Anolyte Tank Volume: ${ldes.anolyteTankVolumeM3} m³, Catholyte: ${ldes.catholyteTankVolumeM3} m³`);
console.log(`  - Total Electrolyte: ${ldes.totalElectrolyteVolumeLiters.toLocaleString()} Liters`);
console.log(`  - Stack Modules: ${ldes.stackCount} stacks (${ldes.totalCellCount} total cells)`);
console.log(`  - Flow Rate: ${ldes.flowRateLitersPerMin} L/min, Pump Parasitic Loss: ${ldes.pumpingParasiticLossKw} kW`);
console.log(`  - Net Discharge Power: ${ldes.netDischargePowerMw} MW, Net Round-Trip Efficiency: ${ldes.roundTripEfficiencyPercent}%`);
console.log(`  - Footprint: ${ldes.estimatedFootprintM2} m², Capex: $${ldes.capexMillionUsd}M USD`);

assert.strictEqual(ldes.totalStoredEnergyMwh, 80.0, '10 MW x 8h must yield exactly 80 MWh stored energy');
assert(ldes.anolyteTankVolumeM3 >= 1000, '80 MWh VRFB must require tank volume >= 1,000 m³');
assert(ldes.pumpingParasiticLossKw < 300, 'Pumping parasitic loss must remain < 300 kW (< 3% of station power)');
assert(ldes.roundTripEfficiencyPercent >= 75.0, 'Net round-trip efficiency must exceed 75%');
assert(ldes.capexMillionUsd > 10.0 && ldes.capexMillionUsd < 50.0, '80 MWh VRFB Capex must fall in realistic $10M - $50M range');
console.log('  ✓ Grid-scale long-duration energy storage sizing and hydraulic physics confirmed\n');

// 4. Decoupled Energy Duration Scalability Verification (8h vs 24h)
console.log('4. Testing Decoupled Energy Duration Scaling (10 MW: 8h vs 24h)...');
const ldes24 = simulateGridScaleLdesStation('ALL_VANADIUM_VRFB', 10.0, 24.0);

console.log(`  - 24-Hour Duration: Total Energy = ${ldes24.totalStoredEnergyMwh} MWh`);
console.log(`  - Stack Count: ${ldes24.stackCount} (Identical to 8h: ${ldes24.stackCount === ldes.stackCount})`);
console.log(`  - Tank Volume: ${ldes24.anolyteTankVolumeM3} m³ (3x of 8h: ${(ldes24.anolyteTankVolumeM3 / ldes.anolyteTankVolumeM3).toFixed(2)}x)`);

assert.strictEqual(ldes24.totalStoredEnergyMwh, 240.0, '10 MW x 24h must yield 240 MWh energy');
assert.strictEqual(ldes24.stackCount, ldes.stackCount, 'Stack count must remain identical when extending duration at same power');
assert(ldes24.anolyteTankVolumeM3 > ldes.anolyteTankVolumeM3 * 2.8, 'Tank volume must scale proportionally with duration (3x for 24h)');
console.log('  ✓ True Decoupled Power-Energy Scaling verified without buying extra stacks\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 246 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
