// tests/test-biopolymer-biodegradation.mjs
// Test Suite 214: Biopolymers, Biodegradation Kinetics & Green Polymer Chemistry Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & ISO 14855 / ASTM D6400 Standards

import assert from 'assert';
import {
  BIOPOLYMERS_CATALOG,
  DEGRADATION_ENVIRONMENTS,
  simulateBiodegradation,
  ESTERASE_CATALYTIC_MECHANISM_STEPS,
  getBiopolymerRadarMetrics
} from '../src/domain/biopolymerBiodegradationEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 214: BIOPOLYMERS & BIODEGRADATION KINETICS    ');
console.log('======================================================================\n');

// 1. Catalog integrity & structural classification
{
  assert(BIOPOLYMERS_CATALOG.length >= 6, 'Catalog must contain at least 6 polymer profiles');

  const pla = BIOPOLYMERS_CATALOG.find(p => p.id === 'PLA');
  const pha = BIOPOLYMERS_CATALOG.find(p => p.id === 'PHA_PHB');
  const chitosan = BIOPOLYMERS_CATALOG.find(p => p.id === 'CHITOSAN');
  const pe = BIOPOLYMERS_CATALOG.find(p => p.id === 'PE_SYNTHETIC');

  assert(pla, 'PLA must exist in catalog');
  assert.strictEqual(pla.linkageType, 'ESTER', 'PLA must have ester linkages');
  assert.strictEqual(pla.iso14855CertifiedCompostable, true, 'PLA must be ISO 14855 compostable');
  assert.strictEqual(pla.microplasticRiskPercent, 0, 'PLA microplastic risk must be 0%');

  assert(pha, 'PHA must exist');
  assert.strictEqual(pha.marineBiodegradable, true, 'PHA must be marine biodegradable');

  assert(chitosan, 'Chitosan must exist');
  assert.strictEqual(chitosan.feedstockOrigin, 'SEAFOOD_WASTE', 'Chitosan must originate from seafood waste');
  assert.strictEqual(chitosan.linkageType, 'GLYCOSIDIC', 'Chitosan must have glycosidic bonds');

  assert(pe, 'Synthetic PE must exist');
  assert.strictEqual(pe.linkageType, 'CARBON_CARBON', 'PE must have non-polar C-C bonds');
  assert.strictEqual(pe.iso14855CertifiedCompostable, false, 'PE must not be compostable');
  assert.strictEqual(pe.microplasticRiskPercent, 100, 'PE must carry 100% microplastic fragmentation risk');

  console.log('  ✓ Biopolymer catalog profiles validated (PLA, PHA, Chitosan, TPS vs synthetic PE/PP)');
}

// 2. ISO 14855 Industrial Composting Simulation
{
  // PLA in Industrial Composting (58°C, moist) -> should meet ISO 14855 >= 90% mineralization in 26 weeks
  const plaCompost = simulateBiodegradation('PLA', 'INDUSTRIAL_COMPOST', 26);
  assert(plaCompost.iso14855Compliant, 'PLA must be compliant with ISO 14855 in industrial compost');
  assert(plaCompost.finalMineralizationPercent >= 90, `PLA CO2 mineralization should be >= 90%, got ${plaCompost.finalMineralizationPercent}%`);
  assert(plaCompost.finalMassPercent <= 5, 'PLA mass remaining should be <= 5%');
  assert(plaCompost.finalMwKDa < plaCompost.polymer.initialMwKDa * 0.1, 'PLA Mw must drop significantly below 10 kDa');
  console.log(`  ✓ PLA in Industrial Compost (58°C): ${plaCompost.finalMineralizationPercent}% CO2 mineralization, compliant with ISO 14855`);
}

// 3. Environmental Temperature & Medium Selectivity (PLA vs PHA in Marine Seawater)
{
  // PLA in cold marine water (18°C) should degrade very slowly because T << Tg (58°C)
  const plaMarine = simulateBiodegradation('PLA', 'MARINE_SEAWATER', 26);
  assert(plaMarine.finalMassPercent > 80, 'PLA should not degrade quickly in ocean water without high temp');
  assert.strictEqual(plaMarine.isFullyDegraded, false, 'PLA is not marine biodegradable in short term');

  // PHA in cold marine water (18°C) DOES degrade because marine bacteria possess PHA depolymerase
  const phaMarine = simulateBiodegradation('PHA_PHB', 'MARINE_SEAWATER', 26);
  assert(phaMarine.finalMineralizationPercent > 60, `PHA marine mineralization should be > 60%, got ${phaMarine.finalMineralizationPercent}%`);
  assert(phaMarine.finalMassPercent < 40, 'PHA should lose significant mass in marine seawater');
  console.log(`  ✓ Environmental selectivity: PLA remains ${plaMarine.finalMassPercent}% in marine vs PHA degrades to ${phaMarine.finalMassPercent}%`);
}

// 4. Synthetic Plastic Invariance & Microplastic Generation
{
  const peSoil = simulateBiodegradation('PE_SYNTHETIC', 'NATURAL_SOIL', 52);
  assert(peSoil.finalMassPercent >= 98, 'PE should retain practically 100% of mass after 52 weeks');
  assert.strictEqual(peSoil.iso14855Compliant, false, 'PE cannot be certified compostable');
  assert(peSoil.trajectory[peSoil.trajectory.length - 1].microplasticFragmentCount > 0, 'PE should accumulate microplastic fragments in soil');
  console.log(`  ✓ Synthetic PE persists at ${peSoil.finalMassPercent}% after 1 year with ${peSoil.trajectory[peSoil.trajectory.length - 1].microplasticFragmentCount} microplastic fragments generated`);
}

// 5. Enzymatic Catalytic Triad Cleavage
{
  assert.strictEqual(ESTERASE_CATALYTIC_MECHANISM_STEPS.length, 3, 'Must have 3 catalytic triad mechanism steps');
  const step1 = ESTERASE_CATALYTIC_MECHANISM_STEPS[0];
  assert(step1.activeResiduesVi.includes('Ser105'), 'Step 1 must involve Serine nucleophile');
  assert(step1.activeResiduesVi.includes('His224'), 'Step 1 must involve Histidine general base');
  assert(step1.chemicalEquationVi.includes('Enz-Ser-O⁻'), 'Equation must show Serine attack');

  const step3 = ESTERASE_CATALYTIC_MECHANISM_STEPS[2];
  assert(step3.chemicalEquationVi.includes('H₂O'), 'Step 3 must hydrolyze acyl intermediate with water');
  console.log('  ✓ Catalytic triad (Ser-His-Asp) esterase mechanism verified (Nucleophilic attack → Acyl-enzyme → Deacylation)');
}

// 6. Circular Economy Radar Metrics
{
  const plaRadar = getBiopolymerRadarMetrics('PLA');
  const peRadar = getBiopolymerRadarMetrics('PE_SYNTHETIC');
  const chitosanRadar = getBiopolymerRadarMetrics('CHITOSAN');

  assert(plaRadar.carbonFootprintScore > peRadar.carbonFootprintScore, 'PLA should have better carbon footprint score than PE');
  assert(chitosanRadar.renewabilityFeedstockScore === 100, 'Chitosan from seafood waste should have 100% renewability score');
  assert(peRadar.renewabilityFeedstockScore === 0, 'Petroleum PE should have 0% renewability score');
  console.log('  ✓ Circular economy radar metrics computed (Renewability, Carbon footprint, Biodegradability speed)');
}

// 7. Chain Scission vs Tensile Strength Relationship
{
  const tpsCompost = simulateBiodegradation('TPS', 'HOME_COMPOST', 12);
  // Early on, tensile strength collapses rapidly before all mass is gone
  const stepAtW4 = tpsCompost.trajectory.find(t => t.week === 4);
  assert(stepAtW4, 'Week 4 data point must exist');
  assert(stepAtW4.tensileRetentionPercent < 50, 'Tensile strength should drop below 50% quickly due to chain scission');
  console.log('  ✓ Molecular weight reduction ($M_w$) precipitates loss of mechanical tensile strength before complete mass loss');
}

// 8. Pedagogical and Vietnamese Curriculum Context
{
  const sim = simulateBiodegradation('PLA', 'INDUSTRIAL_COMPOST', 26);
  assert(sim.pedagogicalTakeawayVi.includes('GDPT 2018'), 'Takeaway must reference GDPT 2018 curriculum');
  assert(sim.summaryConclusionVi.includes('Poly(lactic acid)'), 'Summary must mention specific polymer');
  console.log('  ✓ Vietnam GDPT 2018 pedagogical takeaway and summary conclusions properly generated');
}

console.log('\n======================================================================');
console.log('   TEST SUITE 214: ALL 8 TEST CASES PASSED SUCCESSFULLY               ');
console.log('======================================================================\n');
