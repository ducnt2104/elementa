/**
 * test-direct-formic-acid-solid-oxide.mjs
 *
 * Test Suite 342: Direct Formic Acid Solid Oxide Fuel Cell (DFA-SOFC) Engine Verification
 * Verifies electrolyte specs, catalytic internal reforming equilibrium, Butler-Volmer polarization,
 * and high-grade Combined Heat & Power (CHP) co-generation performance.
 */

import assert from 'assert';
import {
  DFA_SOFC_ELECTROLYTES,
  DFA_SOFC_ANODES,
  DirectFormicAcidSolidOxideEngine
} from '../src/domain/directFormicAcidSolidOxideEngine.ts';

console.log('🧪 Running Test Suite 342: Direct Formic Acid Solid Oxide Fuel Cell (DFA-SOFC) Engine...');

// =========================================================================
// 1. Electrolyte & Anode Cermet Catalog
// =========================================================================
console.log('  1. Verifying Electrolyte & Anode Cermet Catalog...');
const bzcy = DFA_SOFC_ELECTROLYTES.BZCY_PROTONIC;
assert.strictEqual(bzcy.chargeCarrier, 'H+', 'BZCY must be a proton conductor (H+)');
assert.strictEqual(bzcy.waterFormationSide, 'CATHODE', 'BZCY must form water at the cathode, leaving pure dry CO2 at anode');
assert(bzcy.faradaicTransportNumber >= 0.95, 'BZCY proton transport number must be >= 0.95');

const sdc = DFA_SOFC_ELECTROLYTES.SDC_CERIA;
assert.strictEqual(sdc.chargeCarrier, 'O2-', 'SDC must be an oxide ion conductor (O2-)');
assert.strictEqual(sdc.waterFormationSide, 'ANODE', 'SDC must form water at the anode');

const niBzcy = DFA_SOFC_ANODES.NI_BZCY;
assert.strictEqual(niBzcy.cokingResistance, 'ULTRA_HIGH', 'Ni-BZCY must have ultra-high coking resistance');
assert(niBzcy.internalReformingEfficiencyPercent >= 98.0, 'Ni-BZCY internal reforming must be >= 98%');
console.log('  ✓ Electrolyte and anode specifications verified.');

// =========================================================================
// 2. Catalytic Internal Reforming & Coking Suppression
// =========================================================================
console.log('  2. Verifying Internal Reforming Equilibrium & Coking Suppression...');
const reformingPure = DirectFormicAcidSolidOxideEngine.calculateDecompositionEquilibrium(600, 0.0, niBzcy);
assert(reformingPure.dehydrogenationRatioPercent >= 90.0, 'Dehydrogenation ratio must be >= 90% at 600°C');
assert(reformingPure.equilibriumH2MolarFraction > 0.40, 'H2 molar fraction must exceed 40%');
assert(reformingPure.equilibriumCo2MolarFraction > 0.40, 'CO2 molar fraction must exceed 40%');

// Adding steam reduces coking tendency
const reformingSteam = DirectFormicAcidSolidOxideEngine.calculateDecompositionEquilibrium(600, 0.5, niBzcy);
assert(reformingSteam.cokingTendencyIndex < reformingPure.cokingTendencyIndex, 'Steam addition must reduce coking tendency index');
console.log(`  ✓ Reforming at 600°C: Dehydrogenation = ${reformingPure.dehydrogenationRatioPercent.toFixed(1)}%, H2 = ${(reformingPure.equilibriumH2MolarFraction * 100).toFixed(1)}%, CO2 = ${(reformingPure.equilibriumCo2MolarFraction * 100).toFixed(1)}%, Coking index dropped from ${reformingPure.cokingTendencyIndex.toFixed(3)} to ${reformingSteam.cokingTendencyIndex.toFixed(3)} with steam.`);

// =========================================================================
// 3. Polarization & Operating Performance
// =========================================================================
console.log('  3. Verifying Electrochemical Polarization & Power Density...');
const polarizationResult = DirectFormicAcidSolidOxideEngine.calculateCellPolarization({
  electrolyteType: 'BZCY_PROTONIC',
  anodeType: 'NI_BZCY',
  temperatureC: 600,
  steamToFormicAcidRatio: 0.3,
  currentDensityAcm2: 0.8,
  formicAcidConcentrationPercent: 95
});

assert(polarizationResult.reversibleNernstVoltageV >= 1.0 && polarizationResult.reversibleNernstVoltageV <= 1.20, 'Nernst voltage must be 1.0 - 1.2 V');
assert(polarizationResult.operatingCellVoltageV >= 0.65 && polarizationResult.operatingCellVoltageV <= 0.90, `Operating cell voltage (${polarizationResult.operatingCellVoltageV.toFixed(3)} V) must be 0.65 - 0.90 V at 0.8 A/cm2`);
assert(polarizationResult.powerDensityWPerCm2 >= 0.50, `Power density (${polarizationResult.powerDensityWPerCm2.toFixed(3)} W/cm2) must be >= 0.50 W/cm2`);
assert.strictEqual(polarizationResult.polarizationCurve.length, 11, 'Polarization curve must have 11 data points');
console.log(`  ✓ Operating at 600°C & 0.8 A/cm2: V_cell = ${polarizationResult.operatingCellVoltageV.toFixed(3)} V, Power = ${polarizationResult.powerDensityWPerCm2.toFixed(3)} W/cm2, ASR_ohm = ${polarizationResult.areaSpecificOhmicResistanceOhmCm2.toFixed(3)} Ω·cm2.`);

// =========================================================================
// 4. Combined Heat & Power (CHP) Co-Generation System
// =========================================================================
console.log('  4. Verifying Combined Heat & Power (CHP) System Co-Generation...');
const chpPerformance = DirectFormicAcidSolidOxideEngine.calculateChpSystemPerformance({
  electrolyteType: 'BZCY_PROTONIC',
  anodeType: 'NI_BZCY',
  temperatureC: 600,
  steamToFormicAcidRatio: 0.3,
  currentDensityAcm2: 0.8,
  formicAcidConcentrationPercent: 95
}, 300, 80); // 300 cm2 active area, 80 cells stack (~15 kW class)

assert(chpPerformance.electricalPowerKw >= 10.0 && chpPerformance.electricalPowerKw <= 25.0, `Stack electrical power (${chpPerformance.electricalPowerKw.toFixed(1)} kW) must be 10 - 25 kW`);
assert(chpPerformance.highGradeThermalPowerKw > 5.0, 'High-grade thermal power must be > 5.0 kW');
assert(chpPerformance.combinedChpEfficiencyPercent >= 80.0, `Combined CHP efficiency (${chpPerformance.combinedChpEfficiencyPercent.toFixed(1)}%) must be >= 80%`);
assert(chpPerformance.annualAvoidedCo2Tons > 40.0, `Annual avoided CO2 (${chpPerformance.annualAvoidedCo2Tons.toFixed(1)} tons) must be > 40 tons`);
console.log(`  ✓ 80-Cell Stack CHP: P_e = ${chpPerformance.electricalPowerKw.toFixed(1)} kW_e, Q_th = ${chpPerformance.highGradeThermalPowerKw.toFixed(1)} kW_th, Total = ${chpPerformance.totalCombinedPowerKw.toFixed(1)} kW (η_CHP = ${chpPerformance.combinedChpEfficiencyPercent.toFixed(1)}%), Fuel = ${chpPerformance.formicAcidConsumptionLitersPerHour.toFixed(1)} L/h HCOOH, Avoided CO2 = ${chpPerformance.annualAvoidedCo2Tons.toFixed(1)} tons/yr.`);

console.log('🎉 Test Suite 342 Passed (4/4 assertion groups clean)!');
