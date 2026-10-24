// tests/test-supercapacitor-aerogel.mjs
// Test Suite 234: Supercapacitors, Pseudocapacitance & Graphene Aerogels Engine
// Standards: IUPAC Physical & Materials Chemistry & Vietnam GDPT 2018 (Vật liệu Năng lượng & Điện hóa Siêu tụ điện)

import assert from 'node:assert';
import {
  ELECTRODE_MATERIALS_CATALOG,
  ELECTROLYTE_CATALOG,
  RAGONE_BENCHMARK_CATALOG,
  getElectrodeMaterials,
  getElectrolyteSystems,
  getRagoneBenchmarkCatalog,
  calculateSupercapacitorCellMetrics,
  simulateCyclicVoltammetry,
  simulateGrapheneAerogelFreezeDrying
} from '../src/domain/supercapacitorAerogelEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 234: SUPERCAPACITOR & AEROGEL ENGINE AUDIT     ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Electrode Materials & Electrolyte Catalogs...');
const materials = getElectrodeMaterials();
assert(materials.length >= 6, 'Must provide at least 6 specialized electrode materials');

const ac = materials.find(m => m.id === 'ACTIVATED_CARBON');
const aerogel = materials.find(m => m.id === 'GRAPHENE_AEROGEL');
const ruo2 = materials.find(m => m.id === 'RUO2_HYDRATE');
const mno2 = materials.find(m => m.id === 'MNO2_NANORODS');
const mxene = materials.find(m => m.id === 'TI3C2TX_MXENE');

assert(ac && aerogel && ruo2 && mno2 && mxene, 'Key materials (AC, Graphene Aerogel, RuO2, MnO2, MXene) must exist');
assert.strictEqual(ac.mechanism, 'EDLC_ELECTROSTATIC');
assert.strictEqual(ruo2.mechanism, 'PSEUDOCAPACITIVE_FARADAIC');
assert.strictEqual(ruo2.specificCapacitanceFg, 960, 'RuO2 must have record specific capacitance ~960 F/g');
assert(aerogel.electricalConductivityScm >= 1000, 'Graphene aerogel must exhibit metallic conductivity >= 1000 S/cm');
assert(ruo2.redoxReactionVi?.includes('RuO₂'), 'RuO2 must detail multi-electron continuous redox reaction');

const electrolytes = getElectrolyteSystems();
assert(electrolytes.length >= 4, 'Must provide at least 4 electrolyte systems');
const koh = electrolytes.find(e => e.id === 'AQUEOUS_KOH');
const organic = electrolytes.find(e => e.id === 'ORGANIC_ACN_TEABF4');
const ionicLiquid = electrolytes.find(e => e.id === 'IONIC_LIQUID_EMIM_TFSI');

assert.strictEqual(koh.operatingVoltageWindowV, 1.0, 'Aqueous KOH voltage window limited to 1.0V to prevent H2O electrolysis');
assert.strictEqual(organic.operatingVoltageWindowV, 2.7, 'Organic ACN solvent must support 2.7V window');
assert.strictEqual(ionicLiquid.operatingVoltageWindowV, 3.5, 'Room temperature ionic liquid must support 3.5V window');
console.log('  ✓ Catalogs passed with full chemical and thermodynamic validity\n');

// 2. Verify Supercapacitor Cell Metrics & Voltage Squared Scaling (E ∝ V²)
console.log('2. Testing Cell Metrics & Voltage Squared Law (E = 1/2 C V²)...');
// Test Graphene Aerogel in KOH (1.0 V) vs Organic (2.7 V)
const aerogelAqueous = calculateSupercapacitorCellMetrics('GRAPHENE_AEROGEL', 'AQUEOUS_KOH', 10.0);
const aerogelOrganic = calculateSupercapacitorCellMetrics('GRAPHENE_AEROGEL', 'ORGANIC_ACN_TEABF4', 10.0);

console.log(`  - Graphene Aerogel in 1.0V KOH: Energy Density = ${aerogelAqueous.energyDensityWhKg} Wh/kg`);
console.log(`  - Graphene Aerogel in 2.7V Organic: Energy Density = ${aerogelOrganic.energyDensityWhKg} Wh/kg`);

assert(aerogelOrganic.energyDensityWhKg > aerogelAqueous.energyDensityWhKg * 7.0,
  'Expanding voltage from 1.0V to 2.7V must yield ~7.29x higher energy density (E proportional to V^2)');
assert(aerogelAqueous.maxPowerDensityWKg > 1000, 'Supercapacitor must exhibit high power density > 1000 W/kg');
assert(aerogelOrganic.totalCapacitanceFarads > 0, 'Cell capacitance must be strictly positive');
console.log('  ✓ Cell metrics and energy scaling laws verified\n');

// 3. Verify Ragone Plot Dynamics
console.log('3. Testing Ragone Plot Benchmark Catalog...');
const ragoneList = getRagoneBenchmarkCatalog();
const capacitor = ragoneList.find(r => r.deviceTypeVi.includes('Tụ Điện Tĩnh Điện'));
const supercap = ragoneList.find(r => r.deviceTypeVi.includes('Siêu Tụ Điện'));
const liIon = ragoneList.find(r => r.deviceTypeVi.includes('Pin Lithium-Ion'));

assert(capacitor && supercap && liIon, 'Ragone catalog must bridge capacitors, supercapacitors, and batteries');
assert(supercap.energyDensityRangeWhKg[0] > capacitor.energyDensityRangeWhKg[1], 'Supercapacitor energy must exceed electrostatic capacitors');
assert(supercap.powerDensityRangeWKg[1] > liIon.powerDensityRangeWKg[1], 'Supercapacitor power must exceed lithium-ion batteries');
console.log('  ✓ Ragone trade-offs strictly confirmed\n');

// 4. Verify Cyclic Voltammetry (CV) Simulation
console.log('4. Testing Cyclic Voltammetry (CV) Curves...');
const edlcCv = simulateCyclicVoltammetry('GRAPHENE_AEROGEL', 20, 1.0);
const pseudoCv = simulateCyclicVoltammetry('RUO2_HYDRATE', 20, 1.0);

assert(edlcCv.length > 50, 'CV simulation must produce dense data points');
assert(pseudoCv.length > 50, 'CV simulation must produce dense data points');

// Check that EDLC is relatively flat whereas RuO2 has faradaic redox peak
const edlcMidCurrent = edlcCv.find(p => p.potentialV >= 0.5 && p.potentialV <= 0.6)?.currentMa || 0;
const pseudoMidCurrent = pseudoCv.find(p => p.potentialV >= 0.5 && p.potentialV <= 0.6)?.currentMa || 0;

assert(pseudoMidCurrent > edlcMidCurrent, 'Pseudocapacitive Faradaic redox peak must elevate peak current');
console.log(`  - EDLC Mid Current: ${edlcMidCurrent} mA vs RuO2 Faradaic Peak: ${pseudoMidCurrent} mA`);
console.log('  ✓ Cyclic Voltammetry simulation verified\n');

// 5. Verify Graphene Aerogel Freeze-Drying Synthesis
console.log('5. Testing 3D Graphene Aerogel Freeze-Drying Physics...');
const aerogelResult = simulateGrapheneAerogelFreezeDrying(-50, 3.0);
console.log(`  - Density: ${aerogelResult.aerogelDensityMgCm3} mg/cm³ (Porosity: ${aerogelResult.porosityPercent}%)`);
console.log(`  - Pore Morphology: ${aerogelResult.poreMorphologyVi}`);
console.log(`  - Compressive Modulus: ${aerogelResult.compressiveModulusKPa} kPa`);

assert(aerogelResult.aerogelDensityMgCm3 < 10.0, 'Graphene aerogel density must be ultra-lightweight < 10 mg/cm³');
assert(aerogelResult.porosityPercent > 99.0, 'Graphene aerogel porosity must exceed 99%');
assert(aerogelResult.compressiveModulusKPa > 20.0, 'Hierarchical interconnected struts must provide compressive strength');
console.log('  ✓ Freeze-drying synthesis validated\n');

console.log('======================================================================');
console.log('   ALL 5 AUDIT CHECKS IN SUITE 234 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
