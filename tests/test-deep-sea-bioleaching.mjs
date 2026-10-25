// tests/test-deep-sea-bioleaching.mjs
// Test Suite 302: Deep-Sea Polymetallic Nodule Bioleaching & Critical Battery Minerals Engine

import assert from 'node:assert';
import {
  NODULE_ASSAY_CATALOG,
  BIOLEACHING_SYSTEM_CATALOG,
  REFINING_ROUTE_CATALOG,
  calculateLeachingKinetics,
  calculateIndustrialPlantBalance
} from '../src/domain/deepSeaBioleachingEngine.ts';

console.log('🧪 Running Test Suite 302: Deep-Sea Bioleaching Engine...');

// Test 1: Nodule Assays & Catalog Integrity
console.log('  1. Verifying Seabed Nodule Assays & Microorganism Systems...');
assert(NODULE_ASSAY_CATALOG.CLARION_CLIPPERTON_ZONE_CCZ, 'CCZ assay must exist');
const ccz = NODULE_ASSAY_CATALOG.CLARION_CLIPPERTON_ZONE_CCZ;
assert.strictEqual(ccz.nickelGradeWtPct, 1.42);
assert.strictEqual(ccz.cobaltGradeWtPct, 0.24);
assert.strictEqual(ccz.copperGradeWtPct, 1.18);
assert(ccz.manganeseGradeWtPct > 28.0, 'CCZ manganese should be > 28%');

assert(BIOLEACHING_SYSTEM_CATALOG.ACIDITHIOBACILLUS_CONSORTIUM, 'Acidithiobacillus consortium must exist');
const at = BIOLEACHING_SYSTEM_CATALOG.ACIDITHIOBACILLUS_CONSORTIUM;
assert(at.dominantMicrobes.includes('Acidithiobacillus ferrooxidans'));

assert(REFINING_ROUTE_CATALOG.DIRECT_NMC811_COPRECIPITATION, 'NMC-811 direct co-precipitation route must exist');
console.log('  ✓ Catalogs, mineral grades, and microorganism consortiums verified.');

// Test 2: Leaching Kinetics & Shrinking Core Dissolution
console.log('  2. Verifying Shrinking Core Leaching Kinetics...');
const kineticsAt = calculateLeachingKinetics(ccz, at, 48, 10.0);
assert(kineticsAt.length >= 12, 'Kinetics points should cover 48 hours');
const finalPtAt = kineticsAt[kineticsAt.length - 1];

assert(finalPtAt.nickelExtractionPct >= 80.0, `Ni extraction at 48h should be >= 80%, got ${finalPtAt.nickelExtractionPct}%`);
assert(finalPtAt.cobaltExtractionPct >= 80.0, `Co extraction at 48h should be >= 80%, got ${finalPtAt.cobaltExtractionPct}%`);
assert(finalPtAt.manganeseExtractionPct >= 75.0, `Mn extraction at 48h should be >= 75%, got ${finalPtAt.manganeseExtractionPct}%`);

// Compare with electro-assisted bioleaching (3.2x faster)
const bear = BIOLEACHING_SYSTEM_CATALOG.ELECTRO_ASSISTED_BIOLEACH;
const kineticsBear = calculateLeachingKinetics(ccz, bear, 24, 10.0);
const finalPtBear = kineticsBear[kineticsBear.length - 1];
assert(finalPtBear.nickelExtractionPct > 88.0, `Electro-assisted Ni extraction at 24h should be > 88%, got ${finalPtBear.nickelExtractionPct}%`);
console.log(`  ✓ Kinetics verified: Standard Bioleach (48h) Ni = ${finalPtAt.nickelExtractionPct}%, Co = ${finalPtAt.cobaltExtractionPct}%; Electro-assisted (24h) Ni = ${finalPtBear.nickelExtractionPct}%.`);

// Test 3: Industrial Commercial Plant Balance & Decarbonization
console.log('  3. Verifying 200,000 t/yr Commercial Plant Mass Balance & Carbon Abatement...');
const nmcRoute = REFINING_ROUTE_CATALOG.DIRECT_NMC811_COPRECIPITATION;
const plantBalance = calculateIndustrialPlantBalance(ccz, at, nmcRoute, 200000, 48, 15.0);

assert.strictEqual(plantBalance.annualOreFeedDryTons, 200000);
assert(plantBalance.annualNickelProductionTons > 2000, `Ni output should be > 2,000 t/yr, got ${plantBalance.annualNickelProductionTons}`);
assert(plantBalance.annualCobaltProductionTons > 300, `Co output should be > 300 t/yr, got ${plantBalance.annualCobaltProductionTons}`);
assert(plantBalance.annualCopperProductionTons > 1500, `Cu output should be > 1,500 t/yr, got ${plantBalance.annualCopperProductionTons}`);
assert(plantBalance.annualNmcPrecursorTons > 4000, `NMC-811 precursor should be > 4,000 t/yr, got ${plantBalance.annualNmcPrecursorTons}`);

// Check carbon abatement: displacing terrestrial smelting NPI (~55 kg CO2/kg Ni)
assert(plantBalance.avoidedGhgEmissionsVsNpiTonsCo2 > 100000, `Avoided GHG should be > 100,000 t CO2/yr, got ${plantBalance.avoidedGhgEmissionsVsNpiTonsCo2}`);
assert(plantBalance.annualGrossRevenueUsd > 80000000, `Gross revenue should be > $80M/yr, got $${plantBalance.annualGrossRevenueUsd}`);
assert(plantBalance.specificProductionCostUsdPerLbNi < 3.50, `OPEX should be < $3.50/lb Ni, got $${plantBalance.specificProductionCostUsdPerLbNi}/lb`);
console.log(`  ✓ Commercial Plant Balance: Ni = ${plantBalance.annualNickelProductionTons} t/yr, Co = ${plantBalance.annualCobaltProductionTons} t/yr, Cu = ${plantBalance.annualCopperProductionTons} t/yr, NMC-811 Precursor = ${plantBalance.annualNmcPrecursorTons} t/yr, Avoided CO2 = ${plantBalance.avoidedGhgEmissionsVsNpiTonsCo2} t/yr, Revenue = $${plantBalance.annualGrossRevenueUsd.toLocaleString()}/yr.`);

console.log('🎉 Test Suite 302 PASSED: Deep-Sea Bioleaching Engine is 100% verified!\n');
