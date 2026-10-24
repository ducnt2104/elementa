// tests/test-solid-state-battery.mjs
// Test Suite 236: Solid-State Battery Electrolytes & Dendrite Prevention Engine
// Standards: IUPAC Electrochemistry, Monroe-Newman Criterion & Vietnam GDPT 2018 (Vật lý & Hóa học Năng lượng Mới)

import assert from 'node:assert';
import {
  SOLID_ELECTROLYTES_CATALOG,
  getSolidElectrolytes,
  calculateArrheniusConductivity,
  evaluateLithiumDendriteRisk,
  simulateSolidStateBatteryCell
} from '../src/domain/solidStateBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 236: SOLID-STATE BATTERY ELECTROLYTE AUDIT    ');
console.log('======================================================================\n');

// 1. Verify Solid Electrolyte Materials Catalog
console.log('1. Checking Solid Electrolyte Materials Catalog...');
const materials = getSolidElectrolytes();
assert(materials.length >= 5, 'Must provide at least 5 distinct solid electrolyte classes');

const llzo = materials.find(m => m.id === 'LLZO_GARNET');
const lgps = materials.find(m => m.id === 'LGPS_SULFIDE');
const latp = materials.find(m => m.id === 'LATP_NASICON');
const peo = materials.find(m => m.id === 'PEO_LITFSI_POLYMER');
const composite = materials.find(m => m.id === 'LLZO_PEO_COMPOSITE');

assert(llzo && lgps && latp && peo && composite, 'All 5 core materials must exist in catalog');
assert.strictEqual(llzo.monroeNewmanDendriteBlocked, true, 'LLZO garnet shear modulus (61 GPa) must exceed 6.8 GPa');
assert(lgps.roomTempConductivitymScm > 10.0, 'LGPS sulfide must possess record room temperature conductivity > 10 mS/cm');
assert.strictEqual(peo.monroeNewmanDendriteBlocked, false, 'Soft polymer PEO cannot mechanically block dendrites');
console.log('  ✓ Catalog passed: LLZO (Garnet), LGPS (Sulfide), LATP (NASICON), PEO (SPE), Composite\n');

// 2. Verify Arrhenius Temperature Dependence
console.log('2. Testing Arrhenius Ionic Conductivity Temperature Dependence...');
const peo25 = calculateArrheniusConductivity('PEO_LITFSI_POLYMER', 25);
const peo60 = calculateArrheniusConductivity('PEO_LITFSI_POLYMER', 60);
console.log(`  - PEO at 25°C: ${peo25} mS/cm vs PEO at 60°C: ${peo60} mS/cm`);

assert(peo60 > peo25 * 5.0, 'Polymer SPE conductivity must surge by > 5x when heated above glass/melting transition');

const llzo25 = calculateArrheniusConductivity('LLZO_GARNET', 25);
const llzo60 = calculateArrheniusConductivity('LLZO_GARNET', 60);
assert(llzo60 > llzo25, 'Oxide garnet conductivity must increase with temperature via Arrhenius thermal activation');
console.log('  ✓ Arrhenius exponential temperature scaling validated\n');

// 3. Verify Lithium Dendrite & Sand Time Mechanics
console.log('3. Testing Lithium Dendrite Risk & Monroe-Newman Mechanics...');
const safeRisk = evaluateLithiumDendriteRisk('LLZO_GARNET', 0.8, 5.0, true);
const dangerRisk = evaluateLithiumDendriteRisk('PEO_LITFSI_POLYMER', 2.5, 0.5, false);

console.log(`  - Safe Case (LLZO with Interlayer): CCD = ${safeRisk.criticalCurrentDensityCcdMaCm2} mA/cm², Status: ${safeRisk.riskStatusVi}`);
console.log(`  - Danger Case (PEO without Interlayer): CCD = ${dangerRisk.criticalCurrentDensityCcdMaCm2} mA/cm², Status: ${dangerRisk.riskStatusVi}`);

assert.strictEqual(safeRisk.dendritePenetrated, false, 'LLZO must not be mechanically penetrated by dendrite');
assert.strictEqual(dangerRisk.dendritePenetrated, true, 'Soft polymer subjected to current > CCD must trigger dendrite penetration');
assert(dangerRisk.sandTimeSeconds < safeRisk.sandTimeSeconds, 'High current density must dramatically shorten Sand time (tau proportional to 1/J^2)');
console.log('  ✓ Dendrite nucleation and mechanical blocking verified\n');

// 4. Verify All-Solid-State Battery Cell Performance
console.log('4. Testing All-Solid-State Battery (ASSB) Cell Performance...');
const assbNmc = simulateSolidStateBatteryCell('LLZO_GARNET', 'NMC811', 25, 0.5);
console.log(`  - LLZO + Li-Metal + NMC811: Energy Density = ${assbNmc.gravimetricEnergyDensityWhKg} Wh/kg (${assbNmc.volumetricEnergyDensityWhL} Wh/L)`);
console.log(`  - Puncture Safe: ${assbNmc.thermalRunawayPunctureSafe}, Cycle Life: ${assbNmc.estimatedCycleLife80Percent} cycles`);

assert(assbNmc.gravimetricEnergyDensityWhKg >= 380, 'Solid-state Li-metal battery must exceed 380 Wh/kg (vs conventional 250 Wh/kg)');
assert.strictEqual(assbNmc.thermalRunawayPunctureSafe, true, 'Non-flammable oxide ceramic electrolyte must pass nail penetration without thermal runaway');
assert(assbNmc.estimatedCycleLife80Percent >= 2000, 'All-solid-state garnet cell must provide >= 2000 cycles');
console.log('  ✓ Battery cell performance and energy density breakthrough confirmed\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 236 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
