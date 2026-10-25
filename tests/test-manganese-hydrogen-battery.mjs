// tests/test-manganese-hydrogen-battery.mjs
// Test Suite 356: Aqueous Manganese-Hydrogen (Mn-H2) Gas-Liquid Hybrid Battery
import assert from 'assert';
import {
  MN_H2_CATALYSTS,
  MN_H2_SUBSTRATES,
  calculateMnH2NernstPotential,
  calculateMnH2Polarization,
  sizeMnH2GridStoragePlant
} from '../src/domain/manganeseHydrogenBatteryEngine.ts';

console.log('🧪 Running Test Suite 356: Aqueous Manganese-Hydrogen (Mn-H2) Battery Engine...');

// 1. Verifying Catalyst and Substrate Catalog
console.log('  1. Verifying Catalyst and Substrate Catalog...');
assert.ok(MN_H2_CATALYSTS.NI_MO_PGM_FREE, 'Ni-Mo PGM-Free catalyst must exist');
assert.strictEqual(MN_H2_CATALYSTS.NI_MO_PGM_FREE.pgmLoadingMgPerCm2, 0.0, 'Ni-Mo must have 0.0 mg/cm2 PGM');
assert.ok(MN_H2_CATALYSTS.NI_MO_PGM_FREE.catalystCostUSDPerM2 < 20.0, 'Ni-Mo catalyst cost must be < $20/m2');

assert.ok(MN_H2_SUBSTRATES.CARBON_FELT, 'Carbon felt substrate must exist');
assert.ok(MN_H2_SUBSTRATES.CARBON_FELT.arealCapacityMaxMahPerCm2 >= 40.0, 'Carbon felt areal capacity must be >= 40 mAh/cm2');
console.log('  ✓ Catalogs verified: 100% PGM-Free Ni-Mo alloy and 3D Carbon Felt confirmed.');

// 2. Verifying Dissolution-Deposition Nernst Potentials
console.log('  2. Verifying Dissolution-Deposition Nernst Potentials...');
const nernst = calculateMnH2NernstPotential(1.5, 1.8, 20.0, 25.0);
assert.ok(nernst.cellOpenCircuitVoltageV > 1.20 && nernst.cellOpenCircuitVoltageV < 1.45, `Cell OCV (${nernst.cellOpenCircuitVoltageV.toFixed(3)} V) must be in 1.20 - 1.45 V`);
assert.ok(nernst.cathodePotentialVvsSHE > 0.95 && nernst.cathodePotentialVvsSHE < 1.30, `Cathode potential (${nernst.cathodePotentialVvsSHE.toFixed(3)} V) must be 0.95 - 1.30 V vs SHE`);
assert.ok(nernst.anodePotentialVvsSHE < 0.00, `Anode potential (${nernst.anodePotentialVvsSHE.toFixed(3)} V) in acidic medium must be < 0 V vs SHE`);
console.log(`  ✓ Nernst Potentials: E_cath = ${nernst.cathodePotentialVvsSHE.toFixed(3)} V, E_anode = ${nernst.anodePotentialVvsSHE.toFixed(3)} V, V_ocv = ${nernst.cellOpenCircuitVoltageV.toFixed(3)} V.`);

// 3. Verifying Polarization, Voltage Efficiency, and RTE
console.log('  3. Verifying Polarization, Voltage Efficiency, and RTE...');
const pol = calculateMnH2Polarization(40.0, 'NI_MO_PGM_FREE', 'CARBON_FELT', 25.0);
assert.ok(pol.chargeVoltageV > 1.35 && pol.chargeVoltageV < 1.60, `Charge voltage (${pol.chargeVoltageV.toFixed(3)} V) must be in 1.35 - 1.60 V`);
assert.ok(pol.dischargeVoltageV > 1.15 && pol.dischargeVoltageV < 1.35, `Discharge voltage (${pol.dischargeVoltageV.toFixed(3)} V) must be in 1.15 - 1.35 V`);
assert.ok(pol.roundTripEnergyEfficiencyPercent > 75.0 && pol.roundTripEnergyEfficiencyPercent < 95.0, `RTE (${pol.roundTripEnergyEfficiencyPercent.toFixed(1)}%) must be in 75 - 95%`);
assert.ok(pol.coulombicEfficiencyPercent > 98.0, `Coulombic efficiency (${pol.coulombicEfficiencyPercent.toFixed(1)}%) must exceed 98%`);
console.log(`  ✓ Polarization @ 40 mA/cm²: V_chg = ${pol.chargeVoltageV.toFixed(3)} V, V_dis = ${pol.dischargeVoltageV.toFixed(3)} V, CE = ${pol.coulombicEfficiencyPercent.toFixed(1)}%, RTE = ${pol.roundTripEnergyEfficiencyPercent.toFixed(1)}%.`);

// 4. Verifying Long-Duration Grid Storage (10 MW / 240 MWh) Economics
console.log('  4. Verifying Long-Duration Grid Storage (10 MW / 240 MWh) Economics...');
const plant = sizeMnH2GridStoragePlant(10.0, 24.0, 'NI_MO_PGM_FREE');
assert.strictEqual(plant.targetPowerMW, 10.0);
assert.strictEqual(plant.storageDurationHours, 24.0);
assert.strictEqual(plant.totalEnergyMWh, 240.0);
assert.ok(plant.cellCapExUSDPerKWh < 35.0, `24h LDES CapEx ($${plant.cellCapExUSDPerKWh.toFixed(1)}/kWh) must be < $35/kWh`);
assert.strictEqual(plant.cycleLifeCount, 20000, 'Cycle life must reach 20,000 cycles');
assert.ok(plant.manganeseSulfateMassTons > 1000, `MnSO4 mass (${plant.manganeseSulfateMassTons.toFixed(0)} tons) must be > 1,000 tons`);
assert.ok(plant.levelizedCostOfStorageLCOSUSDPerMWh < 35.0, `LCOS ($${plant.levelizedCostOfStorageLCOSUSDPerMWh}/MWh) must be < $35/MWh`);
console.log(`  ✓ 10 MW / 240 MWh Sizing: CapEx = $${plant.cellCapExUSDPerKWh.toFixed(2)}/kWh ($${(plant.totalPlantCapExUSD / 1e6).toFixed(2)}M total), LCOS = $${plant.levelizedCostOfStorageLCOSUSDPerMWh}/MWh, Electrolyte = ${plant.totalElectrolyteVolumeM3.toFixed(0)} m³, MnSO4 = ${plant.manganeseSulfateMassTons.toFixed(0)} tons, 20,000 cycles / 25 years.`);

console.log('🎉 Test Suite 356 Passed (4/4 assertion groups clean)!');
