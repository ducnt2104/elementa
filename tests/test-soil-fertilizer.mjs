// tests/test-soil-fertilizer.mjs
// Test Suite 218: Soil Chemistry, Agricultural Fertilizers & Nitrogen Leaching Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & WHO / TCVN 6187 Guidelines

import assert from 'assert';
import {
  FERTILIZERS_CATALOG,
  VIETNAM_SOILS_DATA,
  calculateLimingRequirement,
  simulateNitrogenTransformation
} from '../src/domain/soilFertilizerEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 218: SOIL CHEMISTRY & FERTILIZER DYNAMICS      ');
console.log('======================================================================\n');

// 1. Fertilizer Catalog & Grade Integrity
{
  assert(FERTILIZERS_CATALOG.length >= 8, 'Catalog must contain at least 8 agricultural fertilizers');

  const urea = FERTILIZERS_CATALOG.find(f => f.id === 'UREA');
  const ssp = FERTILIZERS_CATALOG.find(f => f.id === 'SINGLE_SUPERPHOSPHATE');
  const tsp = FERTILIZERS_CATALOG.find(f => f.id === 'TRIPLE_SUPERPHOSPHATE');
  const kcl = FERTILIZERS_CATALOG.find(f => f.id === 'POTASSIUM_CHLORIDE');
  const crf = FERTILIZERS_CATALOG.find(f => f.id === 'CONTROLLED_RELEASE_UREA');

  assert(urea && urea.gradeNPercent === 46.0, 'Urea must have 46% N');
  assert(ssp && ssp.gradeP2O5Percent >= 16.0, 'SSP must have at least 16% P2O5');
  assert(tsp && tsp.gradeP2O5Percent >= 45.0, 'TSP must have ~46% P2O5');
  assert(kcl && kcl.gradeK2OPercent === 60.0, 'KCl must have 60% K2O');
  assert(crf && crf.fertilizerClass === 'CONTROLLED_RELEASE', 'CRF must be classified as CONTROLLED_RELEASE');

  assert(urea.vietnamManufacturingPlantsVi.some(p => p.includes('Đạm Phú Mỹ') || p.includes('Đạm Cà Mau')),
    'Urea must cite Phú Mỹ or Cà Mau plant');
  assert(ssp.vietnamManufacturingPlantsVi.some(p => p.includes('Lâm Thao')),
    'SSP must cite Lâm Thao plant');

  console.log('  ✓ Agricultural fertilizer catalog validated (% N, % P2O5, % K2O & Vietnam manufacturing complexes)');
}

// 2. Vietnam Soil Profiles & Acid Sulfate Characteristics
{
  const acidSulfate = VIETNAM_SOILS_DATA.ACID_SULFATE_SOIL;
  const alluvial = VIETNAM_SOILS_DATA.ALLUVIAL_RIVER_SOIL;
  const sandy = VIETNAM_SOILS_DATA.SANDY_COASTAL_SOIL;

  assert(acidSulfate.baselinePh < 4.0, 'Acid sulfate soil baseline pH must be < 4.0');
  assert(acidSulfate.toxicFreeAl3PlusPpm > 50, 'Acid sulfate soil must have high toxic Al3+');
  assert(alluvial.baselinePh >= 6.0 && alluvial.baselinePh <= 7.0, 'Alluvial soil must be near neutral');
  assert(sandy.cationExchangeCapacityCecMeqPer100g < 10, 'Sandy soil must have very low CEC');

  console.log('  ✓ Vietnamese soil classifications validated (Đất phèn pH 3.8 vs Đất phù sa pH 6.5 vs Đất cát ven biển)');
}

// 3. Agricultural Liming & Aluminum Toxicity Remediation
{
  const limeResult = calculateLimingRequirement('ACID_SULFATE_SOIL', 6.0);
  assert(limeResult.limeRequirementKgCaoPerHa > 1500, 'Remediating acid sulfate soil must require significant lime');
  assert.strictEqual(limeResult.finalFreeAl3PlusPpm, 0, 'Liming to pH 6.0 must completely precipitate toxic Al3+');
  assert(limeResult.neutralizedAl3PlusPpm === 85, 'Must neutralize all 85 ppm Al3+');
  assert(limeResult.bioavailablePhosphateIncreasePercent > 30, 'Phosphate bioavailability must increase substantially');
  assert(limeResult.chemicalReactionVi.includes('Al(OH)₃'), 'Reaction must explain Al(OH)3 precipitation');

  console.log(`  ✓ Liming acid sulfate soil to pH 6.0 requires ${limeResult.limeRequirementKgCaoPerHa} kg CaO/ha and eliminates toxic Al3+ (85 ppm -> 0 ppm)`);
}

// 4. Nitrogen Transformation & Leaching Dynamics
{
  // Standard urea on sandy soil with heavy rain (30 mm/day) -> severe leaching
  const ureaSandy = simulateNitrogenTransformation('UREA', 'SANDY_COASTAL_SOIL', 200, 30);
  assert(ureaSandy.finalLeachedNitrateKgPerHa > 20, 'Heavy rain on sandy soil must cause significant nitrate leaching');
  assert(ureaSandy.whoStandardExceeded, 'Should exceed WHO drinking water nitrate limit (50 mg/L)');
  assert.strictEqual(ureaSandy.dailyTrajectory[ureaSandy.dailyTrajectory.length - 1].eutrophicationRiskLevel, 'HAZARDOUS',
    'Must be HAZARDOUS eutrophication risk');

  // Controlled release fertilizer (CRF) under same conditions -> dramatically reduced leaching!
  const crfSandy = simulateNitrogenTransformation('CONTROLLED_RELEASE_UREA', 'SANDY_COASTAL_SOIL', 200, 30);
  assert(crfSandy.finalLeachedNitrateKgPerHa < ureaSandy.finalLeachedNitrateKgPerHa * 0.5,
    'CRF must reduce nitrate leaching by at least 50% compared to standard urea');
  assert(crfSandy.nitrogenUseEfficiencyNuePercent > ureaSandy.nitrogenUseEfficiencyNuePercent,
    'CRF must achieve higher Nitrogen Use Efficiency');

  console.log(`  ✓ Controlled release urea reduces nitrate leaching: Standard Urea (${ureaSandy.finalLeachedNitrateKgPerHa} kg N) vs CRF (${crfSandy.finalLeachedNitrateKgPerHa} kg N)`);
}

// 5. Cation Retention vs Anion Mobility (CEC Mechanism)
{
  const sim = simulateNitrogenTransformation('UREA', 'ALLUVIAL_RIVER_SOIL', 150, 15);
  // Early trajectory (day 3-5) should show high NH4+ held in soil before nitrification
  const day4 = sim.dailyTrajectory.find(d => d.day === 4);
  assert(day4, 'Day 4 snapshot must exist');
  assert(day4.soilAmmoniumKgPerHa > 10, 'Soil should hold ammonium pool in early days');
  console.log(`  ✓ Cation exchange retention: Day 4 soil retains ${day4.soilAmmoniumKgPerHa} kg NH4+/ha via CEC before nitrification`);
}

// 6. Pedagogical & Vietnamese Curriculum Context
{
  const sim = simulateNitrogenTransformation('UREA', 'ACID_SULFATE_SOIL', 120, 10);
  assert(sim.pedagogicalTakeawayVi.includes('GDPT 2018'), 'Takeaway must reference GDPT 2018 curriculum');
  assert(sim.pedagogicalTakeawayVi.includes('keo sét'), 'Must explain clay colloid electrical charge');
  assert(sim.pedagogicalTakeawayVi.includes('anion exclusion'), 'Must cite anion exclusion mechanism');
  console.log('  ✓ Vietnam GDPT 2018 pedagogical takeaway and real-world agricultural context verified');
}

console.log('\n======================================================================');
console.log('   TEST SUITE 218: ALL 6 TEST CASES PASSED SUCCESSFULLY               ');
console.log('======================================================================\n');
