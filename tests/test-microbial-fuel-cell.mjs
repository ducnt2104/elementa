// tests/test-microbial-fuel-cell.mjs
// Test Suite 242: Microbial Fuel Cells (MFCs) & Extracellular Electron Transfer Engine Audit
// Standards: IUPAC Bioelectrochemistry, QCVN 40:2011/BTNMT (Wastewater COD) & Vietnam GDPT 2018 (Hóa sinh & Môi trường)

import assert from 'node:assert';
import {
  EXOELECTROGENS_CATALOG,
  MFC_REACTORS_CATALOG,
  getExoelectrogens,
  getMfcReactors,
  simulateWastewaterMfc,
  generateMfcPolarizationCurve
} from '../src/domain/microbialFuelCellEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 242: MICROBIAL FUEL CELLS (MFCs) AUDIT        ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Exoelectrogens & MFC Reactor Catalogs...');
const microbes = getExoelectrogens();
const reactors = getMfcReactors();

assert(microbes.length >= 4, 'Must provide at least 4 exoelectrogen species or consortia');
assert(reactors.length >= 2, 'Must provide both single-chamber air-cathode and dual-chamber MFC reactors');

const geobacter = microbes.find(m => m.id === 'GEOBACTER_SULFURREDUCENS');
const shewanella = microbes.find(m => m.id === 'SHEWANELLA_ONEIDENSIS');
const consortium = microbes.find(m => m.id === 'ANAEROBIC_MUNICIPAL_CONSORTIUM');

assert(geobacter && shewanella && consortium, 'Geobacter, Shewanella and Sludge consortium must exist');
assert.strictEqual(geobacter.transferMechanism, 'MICROBIAL_NANOWIRES_PILI', 'Geobacter must use microbial nanowires (e-pili)');
assert.strictEqual(shewanella.transferMechanism, 'SOLUBLE_FLAVIN_SHUTTLE', 'Shewanella must use soluble flavin shuttle mediators');
assert.strictEqual(consortium.transferMechanism, 'SYNTHETIC_CONSORTIUM', 'Consortium must leverage syntrophic microbial cooperation');

assert(geobacter.biofilmConductivityScm > 0.003, 'Geobacter conductive biofilm must exhibit high conductivity > 0.003 S/cm');
assert(geobacter.maxCurrentDensityAm2 >= 2.5, 'Geobacter must achieve high current density >= 2.5 A/m²');

const airCathode = reactors.find(r => r.id === 'SINGLE_CHAMBER_AIR_CATHODE');
assert(airCathode && airCathode.nominalOcvVolts >= 0.7, 'Air-cathode MFC must have nominal OCV >= 0.7V');
console.log('  ✓ Catalogs verified: Geobacter (e-pili), Shewanella (Flavin), Consortium & Air-Cathode MFC\n');

// 2. Verify Wastewater Remediation & QCVN 40 Compliance
console.log('2. Testing Wastewater Treatment Simulation (800 mg/L COD, 24h HRT)...');
const standardRemediation = simulateWastewaterMfc(
  'SINGLE_CHAMBER_AIR_CATHODE',
  'GEOBACTER_SULFURREDUCENS',
  800.0,
  24.0,
  100.0
);

console.log(`  - Influent COD: ${standardRemediation.influentCodMgL} mg/L -> Effluent: ${standardRemediation.effluentCodMgL} mg/L`);
console.log(`  - COD Removal: ${standardRemediation.codRemovalEfficiencyPercent}%, Coulombic Efficiency: ${standardRemediation.coulombicEfficiencyPercent}%`);
console.log(`  - Cell Voltage: ${standardRemediation.operatingCellVoltageV} V, Current: ${standardRemediation.operatingCurrentMa} mA`);
console.log(`  - Power Density: ${standardRemediation.powerDensityMilliWm2} mW/m²`);
console.log(`  - QCVN 40 Column A Passed: ${standardRemediation.meetsQcvn40ColumnA}`);

assert(standardRemediation.codRemovalEfficiencyPercent >= 80.0, 'Standard 24h HRT must achieve >= 80% COD removal');
assert(standardRemediation.effluentCodMgL <= 75.0, 'Standard 24h HRT must reduce COD <= 75 mg/L to meet QCVN 40 Column A');
assert.strictEqual(standardRemediation.meetsQcvn40ColumnA, true, 'Must verify compliance with QCVN 40:2011/BTNMT Column A');
assert(standardRemediation.coulombicEfficiencyPercent >= 35.0, 'Geobacter MFC must exhibit Coulombic Efficiency >= 35%');
assert(standardRemediation.operatingCellVoltageV > 0.4, 'Operating voltage on 100Ω load must be > 0.4V');
console.log('  ✓ Wastewater remediation and environmental discharge compliance confirmed\n');

// 3. Verify HRT Kinetic Response (Short vs Extended Retention)
console.log('3. Testing Hydraulic Retention Time (HRT) Sensitivity...');
const fastHrt = simulateWastewaterMfc(
  'SINGLE_CHAMBER_AIR_CATHODE',
  'GEOBACTER_SULFURREDUCENS',
  1200.0,
  6.0,
  100.0
);
console.log(`  - High Inflow (1200 mg/L) at 6h HRT: Effluent COD = ${fastHrt.effluentCodMgL} mg/L (Meets Column A: ${fastHrt.meetsQcvn40ColumnA})`);
assert.strictEqual(fastHrt.meetsQcvn40ColumnA, false, '6h short HRT on 1200 mg/L COD must not meet Column A yet');

const extendedHrt = simulateWastewaterMfc(
  'SINGLE_CHAMBER_AIR_CATHODE',
  'GEOBACTER_SULFURREDUCENS',
  1200.0,
  48.0,
  100.0
);
console.log(`  - High Inflow (1200 mg/L) at 48h HRT: Effluent COD = ${extendedHrt.effluentCodMgL} mg/L (Meets Column A: ${extendedHrt.meetsQcvn40ColumnA})`);
assert.strictEqual(extendedHrt.meetsQcvn40ColumnA, true, 'Extended 48h HRT must remediate high COD water to meet Column A');
console.log('  ✓ Kinetic degradation curves and HRT optimization validated\n');

// 4. Verify Polarization Curves (V-J and P-J Characteristics)
console.log('4. Testing MFC Polarization & Power Density Curve Generator...');
const curve = generateMfcPolarizationCurve('SINGLE_CHAMBER_AIR_CATHODE', 'GEOBACTER_SULFURREDUCENS');
assert(curve.length >= 30, 'Polarization curve must have at least 30 sampling data points');

const zeroCurrentPt = curve[0];
const maxCurrentPt = curve[curve.length - 1];
console.log(`  - OCV at J=0: ${zeroCurrentPt.cellVoltageV} V, Power: ${zeroCurrentPt.powerDensityMilliWm2} mW/m²`);
console.log(`  - J_max: ${maxCurrentPt.currentDensityMaM2} mA/m², Voltage near limit: ${maxCurrentPt.cellVoltageV} V`);

assert(zeroCurrentPt.cellVoltageV >= 0.7, 'Zero current point must represent open circuit voltage >= 0.7V');
assert.strictEqual(zeroCurrentPt.powerDensityMilliWm2, 0, 'Zero current power density must be 0');

// Find peak power point
let peakPower = 0;
let peakPoint = curve[0];
for (const pt of curve) {
  if (pt.powerDensityMilliWm2 > peakPower) {
    peakPower = pt.powerDensityMilliWm2;
    peakPoint = pt;
  }
}

console.log(`  - Peak Power Density: ${peakPower} mW/m² at J = ${peakPoint.currentDensityMaM2} mA/m² (V = ${peakPoint.cellVoltageV} V)`);
assert(peakPower > 100.0, 'Air-cathode Geobacter MFC must achieve peak power density > 100 mW/m²');
assert(peakPoint.cellVoltageV < zeroCurrentPt.cellVoltageV && peakPoint.cellVoltageV > 0.1, 'Peak power voltage must lie in mid-range');
console.log('  ✓ Polarization and power curves conform to bioelectrochemical laws\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 242 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
