// tests/test-sodium-ion-battery.mjs
// Test Suite 248: Sodium-Ion (Na-ion) Batteries, Prussian Blue & Hard Carbon Engine Audit
// Standards: IUPAC Electrochemistry, Battery Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Bán kính ion kim loại kiềm & Pin thứ cấp)

import assert from 'node:assert';
import {
  NA_ION_CATHODES_CATALOG,
  HARD_CARBON_ANODES_CATALOG,
  getNaIonCathodes,
  getHardCarbonAnodes,
  compareNaIonVsLiIon,
  generateHardCarbonDischargeCurve
} from '../src/domain/sodiumIonBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 248: SODIUM-ION (Na-ion) BATTERIES AUDIT       ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Na-ion Cathodes & Hard Carbon Anodes Catalogs...');
const cathodes = getNaIonCathodes();
const anodes = getHardCarbonAnodes();

assert(cathodes.length >= 3, 'Must provide at least 3 distinct Na-ion cathode classes');
assert(anodes.length >= 2, 'Must provide both biomass and resin hard carbon anodes');

const nfm = cathodes.find(c => c.id === 'LAYERED_OXIDE_NFM');
const pba = cathodes.find(c => c.id === 'PRUSSIAN_BLUE_ANALOGUE');
const nvpf = cathodes.find(c => c.id === 'POLYANIONIC_NVPF');

assert(nfm && pba && nvpf, 'Layered oxide, PBA and polyanionic NVPF must exist');
assert.strictEqual(pba.cobaltFreeEcoCompliant, true, 'PBA must be completely cobalt-free');
assert.strictEqual(nfm.cobaltFreeEcoCompliant, true, 'NFM must be cobalt-free');
assert(pba.rateCapabilityMaxC >= 15.0, 'PBA 3D open framework must achieve fast charge >= 15C');
assert(nvpf.averageWorkingVoltageVsNaV >= 3.8, 'NVPF polyanionic cathode must deliver high voltage >= 3.8V');

const biomassHc = anodes.find(a => a.id === 'BIOMASS_HARD_CARBON');
assert(biomassHc && biomassHc.interlayerSpacingD002Nm >= 0.37, 'Hard carbon d002 interlayer spacing must exceed 0.37 nm');
assert(biomassHc.totalReversibleCapacityMahG >= 300.0, 'Hard carbon must deliver capacity >= 300 mAh/g');
console.log('  ✓ Catalogs verified: PBA (Cobalt-free, 20C), NFM, NVPF (3.9V) & Hard Carbon (d002 = 0.385 nm)\n');

// 2. Verify Hard Carbon Slope-Plateau Discharge Profile
console.log('2. Testing Hard Carbon Slope-Plateau Mechanism Profile...');
const curve = generateHardCarbonDischargeCurve('PRUSSIAN_BLUE_ANALOGUE', 'BIOMASS_HARD_CARBON');
assert(curve.length >= 30, 'Discharge curve must have at least 30 sampling points');

const startPt = curve[0];
const slopePt = curve[5];
const plateauPt = curve[20];
const endPt = curve[curve.length - 1];

console.log(`  - Full Charge (DOD 0%): V_cell = ${startPt.cellVoltageV} V, Regime = ${startPt.anodeStorageRegimeVi}`);
console.log(`  - Slope Region (DOD ${slopePt.depthOfDischargePercent}%): V_cell = ${slopePt.cellVoltageV} V, Cap = ${slopePt.capacityMahG} mAh/g, Regime = ${slopePt.anodeStorageRegimeVi}`);
console.log(`  - Plateau Region (DOD ${plateauPt.depthOfDischargePercent}%): V_cell = ${plateauPt.cellVoltageV} V, Cap = ${plateauPt.capacityMahG} mAh/g, Regime = ${plateauPt.anodeStorageRegimeVi}`);
console.log(`  - Fully Discharged (DOD 100%): V_cell = ${endPt.cellVoltageV} V, Cap = ${endPt.capacityMahG} mAh/g`);

assert(startPt.cellVoltageV >= 3.5, 'Full charge voltage must be >= 3.5V');
assert.strictEqual(slopePt.anodeStorageRegimeVi, 'SLOPE_DEFECT_ADSORPTION', 'Early discharge must operate in Slope defect adsorption regime');
assert.strictEqual(plateauPt.anodeStorageRegimeVi, 'PLATEAU_INTERCALATION_PORE_FILLING', 'Late discharge must operate in Plateau pore-filling regime');
assert(plateauPt.cellVoltageV < slopePt.cellVoltageV, 'Plateau voltage must be lower than slope voltage');
assert(endPt.capacityMahG >= 320.0, 'Full discharge must deliver >= 320 mAh/g capacity');
console.log('  ✓ Slope-Plateau two-stage storage mechanism validated\n');

// 3. Verify Low-Temperature Kinetics (-20°C & -40°C)
console.log('3. Testing Extreme Subzero Temperature Kinetics (-20°C and -40°C)...');
const sub20 = compareNaIonVsLiIon(-20.0);
console.log(`  - Temperature -20°C:`);
console.log(`    * Na-ion Retention: ${sub20.naIonCapacityRetentionPercent}%`);
console.log(`    * Li-ion LFP Retention: ${sub20.liIonLfpCapacityRetentionPercent}%`);
console.log(`    * Li-ion NMC Retention: ${sub20.liIonNmcCapacityRetentionPercent}%`);

assert(sub20.naIonCapacityRetentionPercent >= 75.0, 'Na-ion must retain >= 75% capacity at -20°C');
assert(sub20.naIonCapacityRetentionPercent > sub20.liIonLfpCapacityRetentionPercent + 20.0, 'Na-ion must outperform Li-ion LFP by at least 20% at -20°C');

const sub40 = compareNaIonVsLiIon(-40.0);
console.log(`  - Temperature -40°C: Na-ion = ${sub40.naIonCapacityRetentionPercent}% vs LFP = ${sub40.liIonLfpCapacityRetentionPercent}%`);
assert(sub40.naIonCapacityRetentionPercent >= 65.0, 'Na-ion must retain >= 65% capacity even at -40°C extreme subzero');
console.log('  ✓ Subzero temperature desolvation kinetics confirmed\n');

// 4. Verify Zero-Volt Transportation Safety & Dual Aluminum Current Collector
console.log('4. Testing Zero-Volt Transportation Safety & Dual Aluminum Foil Economics...');
assert.strictEqual(sub20.naIonDischargeToZeroVoltSafe, true, 'Na-ion must be 100% safe to discharge to 0.0V without copper dissolution');
assert.strictEqual(sub20.liIonDischargeToZeroVoltSafe, false, 'Li-ion must NOT be safe to discharge to 0V due to copper foil dissolution');
assert(sub20.copperEliminatedCostSavingPercent >= 7.0, 'Eliminating copper foil must save >= 7% of total cell cost');
assert(sub20.rawMaterialAbundanceRatioNaVsLi >= 1000, 'Sodium crustal abundance must exceed Lithium by > 1000x');
console.log(`  - Anode Collector: ${sub20.anodeCurrentCollectorMaterialVi}`);
console.log(`  - Cathode Collector: ${sub20.cathodeCurrentCollectorMaterialVi}`);
console.log(`  - Cost Saving from Cu Elimination: ${sub20.copperEliminatedCostSavingPercent}%`);
console.log(`  - Na vs Li Abundance Ratio: ${sub20.rawMaterialAbundanceRatioNaVsLi}x`);
console.log('  ✓ Zero-volt shipping safety and dual-aluminum foil economics confirmed\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 248 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
