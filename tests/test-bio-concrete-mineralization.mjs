// tests/test-bio-concrete-mineralization.mjs
// Test Suite 304: Biochemical Carbon-Negative Bio-Concrete & MICP Mineralization Engine

import assert from 'node:assert';
import {
  BACTERIAL_CULTURE_CATALOG,
  AGGREGATE_CATALOG,
  MINERALIZATION_PATHWAY_CATALOG,
  calculateMicpCuringKinetics,
  simulateCrackSelfHealing,
  calculateBioConcreteLcaBalance
} from '../src/domain/bioConcreteMineralizationEngine.ts';

console.log('🧪 Running Test Suite 304: Bio-Concrete Mineralization Engine...');

// Test 1: Catalogs & Microorganism Traits
console.log('  1. Verifying Bacterial Cultures & Aggregate Specifications...');
assert(BACTERIAL_CULTURE_CATALOG.SPOROSARCINA_PASTEURII, 'Sporosarcina pasteurii must exist');
const sp = BACTERIAL_CULTURE_CATALOG.SPOROSARCINA_PASTEURII;
assert.strictEqual(sp.ureaseActivityUPerMl, 18.5);
assert(sp.cellSurfaceZetaPotentialMv < -30.0, 'Zeta potential should be strongly negative to attract Ca2+');

assert(AGGREGATE_CATALOG.DESERT_DUNE_SAND_FINE, 'Desert dune sand must exist');
const desertSand = AGGREGATE_CATALOG.DESERT_DUNE_SAND_FINE;
assert.strictEqual(desertSand.circularEconomyWasteUtilization, true);

assert(MINERALIZATION_PATHWAY_CATALOG.UREOLYSIS_INDUCED_CALCITE, 'Enzymatic ureolysis pathway must exist');
const ureolysis = MINERALIZATION_PATHWAY_CATALOG.UREOLYSIS_INDUCED_CALCITE;
assert.strictEqual(ureolysis.primaryPrecipitateMineral, 'Calcite (Rhombohedral crystal)');
console.log('  ✓ Catalogs, bacterial enzymatic activity, and aggregate traits verified.');

// Test 2: MICP Curing Kinetics & Compressive Strength Development
console.log('  2. Verifying Biomineralization Kinetics & Structural Strength (ASTM C39)...');
const kinetics = calculateMicpCuringKinetics(sp, desertSand, ureolysis, 72, 0.50, 15.0);
assert(kinetics.length >= 18, 'Kinetics points should cover 72 hours');
const finalPt = kinetics[kinetics.length - 1];

assert(finalPt.calcitePrecipitatedWtPct >= 12.0, `Calcite precipitated should be >= 12 wt%, got ${finalPt.calcitePrecipitatedWtPct}%`);
assert(finalPt.unconfinedCompressiveStrengthMpa >= 25.0, `UCS strength should be >= 25 MPa for structural use, got ${finalPt.unconfinedCompressiveStrengthMpa} MPa`);
assert(finalPt.slurryPh >= 8.8, `Alkaline pH shift should be >= 8.8, got ${finalPt.slurryPh}`);
console.log(`  ✓ Curing Kinetics verified: Calcite = ${finalPt.calcitePrecipitatedWtPct} wt%, Strength = ${finalPt.unconfinedCompressiveStrengthMpa} MPa (C25/C30 grade), pH = ${finalPt.slurryPh}.`);

// Test 3: Crack Self-Healing Simulation
console.log('  3. Verifying Autonomous Crack Self-Healing Dynamics...');
const healingPoints = simulateCrackSelfHealing(0.60, 0.95, 28);
assert(healingPoints.length >= 14, 'Healing points should cover 28 days');
const day28 = healingPoints[healingPoints.length - 1];

assert(day28.healingRatioPct > 90.0, `Crack healing should be > 90% at 28 days, got ${day28.healingRatioPct}%`);
assert(day28.waterPermeabilityReductionPct > 95.0, `Permeability reduction should be > 95%, got ${day28.waterPermeabilityReductionPct}%`);
console.log(`  ✓ Crack Self-Healing: 0.60 mm crack healed to ${day28.crackWidthRemainingMm} mm (${day28.healingRatioPct}% closure, ${day28.waterPermeabilityReductionPct}% permeability reduction).`);

// Test 4: Carbon-Negative Life-Cycle Assessment (LCA)
console.log('  4. Verifying Carbon-Negative Footprint & Portland Cement Abatement...');
const lca = calculateBioConcreteLcaBalance(sp, desertSand, ureolysis, 100, 15.0);
assert.strictEqual(lca.productionVolumeM3, 100);
assert(lca.netCarbonDioxideSequestrationTons < 0, `Net CO2 balance should be negative (carbon sink), got ${lca.netCarbonDioxideSequestrationTons} tons`);
assert(lca.avoidedCarbonEmissionsTons > 35.0, `Avoided CO2 vs OPC baseline (35 t) should be > 35 t, got ${lca.avoidedCarbonEmissionsTons} tons`);
assert(lca.finalStructuralStrengthMpa >= 28.0, `Final strength should be >= 28 MPa, got ${lca.finalStructuralStrengthMpa} MPa`);
assert.strictEqual(lca.structuralGradeClassification, 'C30_STRUCTURAL');
console.log(`  ✓ Carbon-Negative LCA: 100 m³ Bio-Concrete -> Net CO2 = ${lca.netCarbonDioxideSequestrationTons} tons (Net Sink!), Avoided CO2 vs OPC = ${lca.avoidedCarbonEmissionsTons} tons, Grade = ${lca.structuralGradeClassification} (${lca.finalStructuralStrengthMpa} MPa).`);

console.log('🎉 Test Suite 304 PASSED: Bio-Concrete Mineralization Engine is 100% verified!\n');
