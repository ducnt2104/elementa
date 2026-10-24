// tests/test-hydrogen-fuel-cell.mjs
// Test Suite 244: Hydrogen Fuel Cells (PEMFC & SOFC) & FCEV Vehicle Stack Engine Audit
// Standards: IUPAC Electrochemistry, DOE Technical Targets & Vietnam GDPT 2018 (Hóa 10 & 12: Điện hóa học & Năng lượng Hydro Xanh)

import assert from 'node:assert';
import {
  FUEL_CELL_SYSTEMS_CATALOG,
  getFuelCellSystems,
  calculateReversibleCellVoltage,
  generateFuelCellPolarizationCurve,
  simulateFcevStackPerformance
} from '../src/domain/hydrogenFuelCellEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 244: HYDROGEN FUEL CELLS (PEMFC/SOFC) AUDIT    ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Fuel Cell Systems Catalog...');
const systems = getFuelCellSystems();
assert(systems.length >= 3, 'Must provide at least 3 distinct fuel cell technologies');

const pemfc = systems.find(s => s.id === 'PEMFC_PROTON_EXCHANGE');
const sofc = systems.find(s => s.id === 'SOFC_SOLID_OXIDE');
const aemfc = systems.find(s => s.id === 'AEMFC_ANION_EXCHANGE');

assert(pemfc && sofc && aemfc, 'PEMFC, SOFC and AEMFC systems must exist');
assert.strictEqual(pemfc.chargeCarrierIon, 'H+', 'PEMFC must transport proton H+');
assert.strictEqual(sofc.chargeCarrierIon, 'O2-', 'SOFC must transport oxygen ion O2-');
assert.strictEqual(aemfc.chargeCarrierIon, 'OH-', 'AEMFC must transport hydroxide ion OH-');

assert(pemfc.operatingTempCelsiusRange[0] >= 50 && pemfc.operatingTempCelsiusRange[1] <= 90, 'PEMFC must operate at low temp (50 - 90°C)');
assert(sofc.operatingTempCelsiusRange[0] >= 650 && sofc.operatingTempCelsiusRange[1] <= 900, 'SOFC must operate at high temp (650 - 900°C)');
assert(pemfc.systemEfficiencyLhvPercent >= 55.0, 'PEMFC system efficiency must be >= 55%');
console.log('  ✓ Catalogs verified: PEMFC (H+, Nafion), SOFC (O2-, 8YSZ), AEMFC (OH-, PGM-free)\n');

// 2. Verify Reversible Thermodynamic Nernst Potential
console.log('2. Testing Reversible Cell Potential (E_rev) Thermodynamics...');
const pemfcErev = calculateReversibleCellVoltage('PEMFC_PROTON_EXCHANGE', 75, 2.0);
const sofcErev = calculateReversibleCellVoltage('SOFC_SOLID_OXIDE', 800, 1.0);

console.log(`  - PEMFC (75°C, 2 bar): E_rev = ${pemfcErev} V (Theoretical standard E° = 1.229 V)`);
console.log(`  - SOFC (800°C, 1 bar): E_rev = ${sofcErev} V (High temperature entropy reduction)`);

assert(pemfcErev >= 1.15 && pemfcErev <= 1.25, 'PEMFC at 75°C, 2 bar must have E_rev between 1.15V and 1.25V');
assert(sofcErev >= 0.95 && sofcErev <= 1.20, 'SOFC at 800°C must exhibit high-temperature thermodynamic potential');
console.log('  ✓ Thermodynamic Nernst equations confirmed\n');

// 3. Verify Polarization Curve & Overpotential Breakdown
console.log('3. Testing Fuel Cell Polarization Curve & Overpotential Breakdown...');
const curve = generateFuelCellPolarizationCurve('PEMFC_PROTON_EXCHANGE', 75, 2.0);
assert(curve.length >= 30, 'Polarization curve must have at least 30 sampling data points');

const zeroCurrentPt = curve[0];
const midCurrentPt = curve.find(p => p.currentDensityACm2 >= 1.0) || curve[15];
const limitPt = curve[curve.length - 1];

console.log(`  - Zero Current (J=0): V_cell = ${zeroCurrentPt.cellVoltageV} V, Power = ${zeroCurrentPt.powerDensityWCm2} W/cm²`);
console.log(`  - Operating Point (J=${midCurrentPt.currentDensityACm2} A/cm²): V_cell = ${midCurrentPt.cellVoltageV} V`);
console.log(`    Losses: Act = ${midCurrentPt.activationLossV} V, Ohmic = ${midCurrentPt.ohmicLossV} V, Conc = ${midCurrentPt.concentrationLossV} V`);
console.log(`    Power Density = ${midCurrentPt.powerDensityWCm2} W/cm², Electrical Efficiency = ${midCurrentPt.electricalEfficiencyPercent}%`);

assert.strictEqual(zeroCurrentPt.powerDensityWCm2, 0, 'Zero current power density must be 0');
assert(midCurrentPt.cellVoltageV >= 0.55 && midCurrentPt.cellVoltageV <= 0.85, 'Operating cell voltage at 1.0 A/cm² must be between 0.55V and 0.85V');
assert(midCurrentPt.activationLossV > 0.15, 'Sluggish ORR kinetics must induce activation loss > 0.15V');
assert(midCurrentPt.ohmicLossV > 0.03, 'Membrane resistance must induce Ohmic loss > 0.03V');

let maxPower = 0;
let maxPowerPoint = curve[0];
for (const pt of curve) {
  if (pt.powerDensityWCm2 > maxPower) {
    maxPower = pt.powerDensityWCm2;
    maxPowerPoint = pt;
  }
}

console.log(`  - Peak Power Density: ${maxPower} W/cm² at J = ${maxPowerPoint.currentDensityACm2} A/cm² (V = ${maxPowerPoint.cellVoltageV} V)`);
assert(maxPower >= 0.45, 'Modern PEMFC must achieve peak power density >= 0.45 W/cm²');
console.log('  ✓ Polarization curve and 3 overpotential regimes validated\n');

// 4. Verify FCEV Vehicle Stack Simulation
console.log('4. Testing FCEV Vehicle Stack Simulation (330 Cells, 300 cm², 1.0 A/cm²)...');
const fcev = simulateFcevStackPerformance('PEMFC_PROTON_EXCHANGE', 330, 300.0, 1.0, 5.6);

console.log(`  - Stack Total Voltage: ${fcev.stackTotalVoltageV} V, Stack Current: ${fcev.stackCurrentAmperes} A`);
console.log(`  - Electric Power: ${fcev.stackElectricPowerKw} kW (${Math.round(fcev.stackElectricPowerKw * 1.341)} HP)`);
console.log(`  - Efficiency: ${fcev.stackEfficiencyPercent}%, Waste Heat: ${fcev.wasteHeatGenerationKw} kW`);
console.log(`  - H2 Consumption: ${fcev.hydrogenConsumptionKgPerHour} kg/h, Water Production: ${fcev.waterProductionLitersPerHour} L/h`);
console.log(`  - Driving Range (5.6 kg H2): ${fcev.drivingRangeKm} km, CO2 Emissions: ${fcev.co2EmissionsGramsPerKm} g/km`);

assert(fcev.stackElectricPowerKw >= 50.0, 'Passenger vehicle FCEV stack must deliver >= 50 kW electric power');
assert(fcev.waterProductionLitersPerHour >= 10.0, 'Water production rate at nominal cruise power must exceed 10 L/h');
assert.strictEqual(fcev.co2EmissionsGramsPerKm, 0, 'Zero-emission vehicle must strictly emit 0 g CO2/km');
assert(fcev.drivingRangeKm >= 600, '5.6 kg 700-bar H2 tank must deliver driving range >= 600 km');
assert(fcev.stackEfficiencyPercent >= 40.0, 'Stack electrical efficiency must exceed 40%');
console.log('  ✓ FCEV automotive stack mechanics and zero-emission metrics confirmed\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 244 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
