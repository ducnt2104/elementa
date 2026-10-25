/**
 * ELEMENTA - TEST SUITE 282: GEOTHERMAL MINERAL EXTRACTION AUDIT
 *
 * Verifies:
 * 1. Geothermal Reservoir Sites Catalog & Brine Hydrochemistry (Salton Sea, Upper Rhine, Binh Chau, Krafla)
 * 2. Amorphous Silica Equilibrium Solubility & Anti-scaling Kinetics (Fournie & Marshall 1982 relation)
 * 3. Geothermal Power & Heat Balance Thermodynamics (Flash, Binary ORC, and Hybrid)
 * 4. Direct Lithium Extraction (DLE) Yields, LCE & Monohydrate Calculations
 * 5. Low-Enthalpy Geothermal Desalination (MED) Water Production
 * 6. Environmental Benchmark Comparison (Geothermal DLE vs Hard Rock vs Salar Ponds)
 */

import assert from 'assert';
import {
  GEOTHERMAL_SITES_CATALOG,
  calculateSilicaSolubilityPpm,
  evaluateSilicaScalingRisk,
  calculateGeothermalPower,
  calculateDirectMineralExtraction,
  calculateGeothermalDesalination,
  LITHIUM_MINING_BENCHMARKS
} from '../src/domain/geothermalMineralExtractionEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 282: GEOTHERMAL BRINE & MINERAL EXTRACTION AUDIT');
console.log('======================================================================\n');

// 1. Check Geothermal Reservoir Sites Catalog
console.log('1. Checking Geothermal Reservoir Sites Catalog & Hydrochemistry...');
const saltonSea = GEOTHERMAL_SITES_CATALOG['SALTON_SEA_USA'];
assert(saltonSea, 'Salton Sea site must exist');
assert.strictEqual(saltonSea.lithiumPpm, 240, 'Salton Sea Li+ must be 240 ppm');
assert.strictEqual(saltonSea.temperatureC, 290, 'Salton Sea temperature must be 290°C');

const binhChau = GEOTHERMAL_SITES_CATALOG['BINH_CHAU_VIETNAM'];
assert(binhChau, 'Binh Chau site must exist in Vietnam');
assert.strictEqual(binhChau.country, 'Việt Nam', 'Binh Chau country must be Viet Nam');
assert(binhChau.lithiumPpm > 30, 'Binh Chau must have valuable trace lithium');

console.log(`  - Salton Sea (USA): Temp = ${saltonSea.temperatureC}°C, Li = ${saltonSea.lithiumPpm} mg/L, TDS = ${saltonSea.tdsPpm.toLocaleString()} mg/L`);
console.log(`  - Binh Chau (VN): Temp = ${binhChau.temperatureC}°C, Flow = ${binhChau.typicalFlowRateKgPerSec} kg/s, Li = ${binhChau.lithiumPpm} mg/L`);
console.log('  ✓ Geothermal reservoir hydrochemistry verified\n');

// 2. Testing Silica Solubility & Scaling Risk
console.log('2. Testing Amorphous Silica Solubility & Anti-Scaling Kinetics...');
// At 70°C, Fournie & Marshall predicts ~240-250 ppm SiO2
const cSat70 = calculateSilicaSolubilityPpm(70);
assert(cSat70 >= 230 && cSat70 <= 260, 'Silica solubility at 70°C should be ~245 ppm');

// Severe scaling test: 550 ppm silica cooled to 70°C (SSI > 2.0)
const scalingHazard = evaluateSilicaScalingRisk(550, 70);
assert.strictEqual(scalingHazard.scalingRiskCategory, 'SEVERE_SCALING_HAZARD', '550 ppm at 70°C must trigger severe hazard');
assert(scalingHazard.silicaSaturationIndex > 2.0, 'SSI must be > 2.0');
assert(scalingHazard.recommendedAcidDosingPpm > 0, 'Acid dosing must be recommended');

// Safe subsaturated test: 150 ppm silica at 70°C
const safeSubsat = evaluateSilicaScalingRisk(150, 70);
assert.strictEqual(safeSubsat.scalingRiskCategory, 'SAFE_SUBSATURATED', '150 ppm at 70°C must be safe');
assert(safeSubsat.silicaSaturationIndex < 1.0, 'SSI must be < 1.0');

console.log(`  - C_sat(SiO2) at 70°C: ${cSat70} ppm`);
console.log(`  - High Silica (550 ppm @ 70°C): SSI = ${scalingHazard.silicaSaturationIndex}, Category = ${scalingHazard.scalingRiskCategory}`);
console.log(`  - Low Silica (150 ppm @ 70°C):  SSI = ${safeSubsat.silicaSaturationIndex}, Category = ${safeSubsat.scalingRiskCategory}`);
console.log('  ✓ Silica solubility and scaling risk evaluation verified\n');

// 3. Testing Geothermal Power & Heat Balance
console.log('3. Testing Geothermal Power & Thermal Balance Thermodynamics...');
// 450 kg/s at 290°C using Double-Flash cycle
const powerResult = calculateGeothermalPower(450, 290, 'DOUBLE_FLASH', 25);
assert(powerResult.grossPowerMWe > 50, 'Gross power must be > 50 MWe');
assert(powerResult.netExportPowerMWe > 40, 'Net export power must be > 40 MWe');
assert(powerResult.carnotEfficiencyPct > 40, 'Carnot efficiency should be > 40%');
assert(powerResult.thermalPowerAvailableMWth > 40, 'Reject thermal power for DLE/MED must be > 40 MWth');

console.log(`  - Flow Rate: 450 kg/s @ 290°C (Double-Flash Cycle)`);
console.log(`  - Carnot Efficiency Ceiling: ${powerResult.carnotEfficiencyPct}%`);
console.log(`  - Gross Power: ${powerResult.grossPowerMWe} MWe, Net Export: ${powerResult.netExportPowerMWe} MWe`);
console.log(`  - Low-Grade Reject Thermal Power (DLE/MED Supply): ${powerResult.thermalPowerAvailableMWth} MWth`);
console.log('  ✓ Power generation and thermal recuperation validated\n');

// 4. Testing Direct Lithium Extraction (DLE) Yields
console.log('4. Testing Direct Lithium Extraction (DLE) Yields & Battery Equivalents...');
// Salton Sea: 450 kg/s, 240 ppm Li+, 90% DLE efficiency, 8000 hours
const dleYield = calculateDirectMineralExtraction(450, 240, 110, 20, 90.0, 8000);
assert(dleYield.annualLithiumMetalTons > 2000, 'Lithium metal yield must be > 2,000 tons/year');
assert(dleYield.annualLceMetricTons > 10000, 'LCE yield must be > 10,000 metric tons/year');
assert(dleYield.annualLiOhMonohydrateTons > 12000, 'LiOH monohydrate must be > 12,000 tons/year');
assert(dleYield.equivalentEvBatteriesCount > 180000, 'EV battery equivalent must be > 180,000 packs');
assert.strictEqual(dleYield.co2EmissionsIntensityKgPerKgLi, 0.35, 'Carbon intensity should be ~0.35 kg CO2/kg');
assert(dleYield.annualRubidiumKg > 1000, 'Rubidium co-product should be > 1,000 kg/year');

console.log(`  - Annual Pure Lithium Metal: ${dleYield.annualLithiumMetalTons.toLocaleString()} metric tons/year`);
console.log(`  - Annual Battery-grade LCE (Li2CO3): ${dleYield.annualLceMetricTons.toLocaleString()} metric tons/year`);
console.log(`  - Annual LiOH·H2O Monohydrate: ${dleYield.annualLiOhMonohydrateTons.toLocaleString()} metric tons/year`);
console.log(`  - Equivalent 75 kWh EV Battery Packs: ${dleYield.equivalentEvBatteriesCount.toLocaleString()} packs/year`);
console.log(`  - Strategic By-Products: Rubidium = ${dleYield.annualRubidiumKg.toLocaleString()} kg/year, Cesium = ${dleYield.annualCesiumKg.toLocaleString()} kg/year`);
console.log(`  - Closed-Loop Deep Reinjection: ${dleYield.waterRecirculationEfficiencyPct}% (Zero Surface Water Loss)`);
console.log('  ✓ DLE chemical yield and battery equivalent calculations verified\n');

// 5. Testing Multi-Effect Desalination (MED) from Low-Enthalpy Brine
console.log('5. Testing Multi-Effect Desalination (MED) from Reject Geothermal Brine...');
// 50 MWth available reject heat with GOR = 8.5
const desalYield = calculateGeothermalDesalination(50.0, 8.5);
assert(desalYield.freshwaterDailyM3 > 12000, 'Freshwater daily output must be > 12,000 m³/day');
assert(desalYield.freshwaterAnnualM3 > 4500000, 'Freshwater annual output must be > 4,500,000 m³/year');
assert.strictEqual(desalYield.productWaterTdsPpm, 5.0, 'Distillate TDS must be ultra-pure 5 ppm');

console.log(`  - Available Reject Thermal Power: 50.0 MWth, GOR = 8.5`);
console.log(`  - Daily High-Purity Fresh Water: ${desalYield.freshwaterDailyM3.toLocaleString()} m³/day`);
console.log(`  - Annual Fresh Water Output: ${desalYield.freshwaterAnnualM3.toLocaleString()} m³/year`);
console.log(`  - Water Quality: TDS = ${desalYield.productWaterTdsPpm} ppm (Electrolyzer / Potable Grade)`);
console.log('  ✓ Geothermal desalination equations validated\n');

// 6. Checking Environmental Mining Benchmarks
console.log('6. Checking Environmental Mining Benchmark Comparison...');
assert.strictEqual(LITHIUM_MINING_BENCHMARKS.length, 3, 'Must compare 3 lithium mining routes');

const dleBenchmark = LITHIUM_MINING_BENCHMARKS.find(m => m.methodName.includes('Geothermal DLE'));
assert(dleBenchmark, 'Geothermal DLE benchmark must exist');
assert.strictEqual(dleBenchmark.co2EmissionsKgPerKgLiOH, 0.35, 'DLE CO2 must be 0.35 kg/kg');

const hardRockBenchmark = LITHIUM_MINING_BENCHMARKS.find(m => m.methodName.includes('Spodumene'));
assert(hardRockBenchmark, 'Hard rock spodumene benchmark must exist');
assert.strictEqual(hardRockBenchmark.co2EmissionsKgPerKgLiOH, 15.0, 'Hard rock CO2 must be 15.0 kg/kg');

console.log(`  - Geothermal DLE:       CO2 = ${dleBenchmark.co2EmissionsKgPerKgLiOH} kg/kg LiOH, Cycle = ${dleBenchmark.extractionCycleTime}`);
console.log(`  - Hard Rock Spodumene:  CO2 = ${hardRockBenchmark.co2EmissionsKgPerKgLiOH} kg/kg LiOH, Cycle = ${hardRockBenchmark.extractionCycleTime}`);
console.log('  ✓ Multi-method environmental comparison validated\n');

console.log('======================================================================');
console.log('   TEST SUITE 282: ALL GEOTHERMAL BRINE CHECKS PASSED!');
console.log('======================================================================');
