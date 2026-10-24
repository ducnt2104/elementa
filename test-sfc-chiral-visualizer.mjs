import assert from 'node:assert';
import {
  SFC_STANDARD_CATALOG,
  CO2_CRITICAL_TEMP_CELSIUS,
  CO2_CRITICAL_PRESSURE_BAR,
  CO2_CRITICAL_DENSITY_G_CM3,
  calculateCo2Density,
  calculateVanDeemterHetpUm,
  simulateSfcChromatogram,
  getMatchingSfcCard,
  validateSfcStandardPhysics,
} from './src/domain/sfcEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 134: SUPERCRITICAL FLUID CHROMATOGRAPHY (SFC)');
console.log('🧪 Green Solvents · Supercritical CO2 · Chiral Enantiomer Resolution');
console.log('🧪 ========================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// 1. Critical Constants & Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('IUPAC CO2 critical constants are rigorously defined', () => {
  assert.strictEqual(CO2_CRITICAL_TEMP_CELSIUS, 31.1, 'Critical temp must be 31.1°C');
  assert.strictEqual(CO2_CRITICAL_PRESSURE_BAR, 73.8, 'Critical pressure must be 73.8 bar');
  assert.strictEqual(CO2_CRITICAL_DENSITY_G_CM3, 0.468, 'Critical density must be 0.468 g/cm³');
});

runTest('SFC Catalog contains 5 benchmark green chiral separation systems', () => {
  assert.strictEqual(SFC_STANDARD_CATALOG.length, 5, 'Catalog must contain 5 standards');
  const ids = SFC_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('thalidomide_chiral_enantiomers'), 'Must include Thalidomide');
  assert.ok(ids.includes('ibuprofen_nsaid_enantiomers'), 'Must include Ibuprofen');
  assert.ok(ids.includes('esomeprazole_omeprazole_ppi'), 'Must include Esomeprazole');
  assert.ok(ids.includes('cannabinoid_green_fractionation'), 'Must include Cannabinoids');
  assert.ok(ids.includes('tocopherol_vitamin_e_isomers'), 'Must include Tocopherol Vitamin E');
});

runTest('Thalidomide standard conforms to clinical chiral safety specifications', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'thalidomide_chiral_enantiomers');
  assert.ok(std, 'Thalidomide standard must exist');
  assert.strictEqual(std.stationaryPhase, 'CHIRALPAK_IA_IMMOBILIZED');
  assert.strictEqual(std.preferredModifier, 'METHANOL');
  assert.strictEqual(std.peaks.length, 2, 'Must have 2 enantiomers ((R) and (S))');
  assert.strictEqual(std.peaks[0].enantiomerDesignation, '(R)');
  assert.strictEqual(std.peaks[1].enantiomerDesignation, '(S)');
  assert.ok(std.greenChemistryScorePercent >= 95, 'Green score must be >= 95%');
  assert.ok(validateSfcStandardPhysics(std), 'Standard physics must validate as true');
});

runTest('Ibuprofen standard uses green bio-ethanol modifier on cellulose phase', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'ibuprofen_nsaid_enantiomers');
  assert.ok(std, 'Ibuprofen standard must exist');
  assert.strictEqual(std.stationaryPhase, 'CHIRALCEL_OD_CELLULOSE');
  assert.strictEqual(std.preferredModifier, 'ETHANOL');
  assert.strictEqual(std.peaks[0].enantiomerDesignation, '(S)'); // Dexibuprofen
  assert.strictEqual(std.peaks[1].enantiomerDesignation, '(R)');
  assert.ok(validateSfcStandardPhysics(std), 'Physics must be valid');
});

// -----------------------------------------------------------------------------
// 2. Supercritical CO2 Density Modeling (Span-Wagner Physics)
// -----------------------------------------------------------------------------
runTest('calculateCo2Density predicts tunable liquid-like solvating power', () => {
  // At 150 bar, 40°C: density should be ~ 0.7 to 0.85 g/cm³
  const rho150 = calculateCo2Density(150, 40);
  assert.ok(rho150 >= 0.65 && rho150 <= 0.88, `Density at 150 bar/40°C (${rho150}) must be 0.65-0.88 g/cm³`);

  // Higher pressure at constant T increases density monotonically
  const rho250 = calculateCo2Density(250, 40);
  assert.ok(rho250 > rho150, `Density at 250 bar (${rho250}) must exceed 150 bar (${rho150})`);

  // Higher temperature at constant P decreases density (thermal expansion)
  const rhoHot = calculateCo2Density(150, 60);
  assert.ok(rhoHot < rho150, `Density at 60°C (${rhoHot}) must be lower than at 40°C (${rho150})`);

  // Subcritical gas-like pressure (e.g. 50 bar) gives low density
  const rhoSubcritical = calculateCo2Density(50, 40);
  assert.ok(rhoSubcritical < 0.35, `Subcritical density (${rhoSubcritical}) must be < 0.35 g/cm³`);
});

// -----------------------------------------------------------------------------
// 3. Van Deemter Equation & Mobile Phase Mass Transfer
// -----------------------------------------------------------------------------
runTest('calculateVanDeemterHetpUm models column plate height efficiency', () => {
  // For 5.0 um particles at typical linear velocity 0.5 cm/s
  const hetp = calculateVanDeemterHetpUm(0.5, 5.0);
  assert.ok(hetp > 5.0 && hetp < 250.0, `HETP (${hetp} um) must be in physical range`);

  // Smaller particle size (e.g. 3.0 um) yields lower HETP (higher efficiency)
  const hetpSmall = calculateVanDeemterHetpUm(0.5, 3.0);
  assert.ok(hetpSmall < hetp, `Smaller 3um particles (${hetpSmall} um) must yield lower HETP than 5um (${hetp} um)`);
});

// -----------------------------------------------------------------------------
// 4. Chromatographic Simulation & Chiral Resolution
// -----------------------------------------------------------------------------
runTest('simulateSfcChromatogram achieves baseline enantiomeric resolution (Rs >= 1.5) for Thalidomide', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'thalidomide_chiral_enantiomers');
  const sim = simulateSfcChromatogram(std);

  assert.strictEqual(sim.standard.id, std.id);
  assert.ok(sim.deadTimeT0Minutes > 0.1 && sim.deadTimeT0Minutes < 2.0, `t0 (${sim.deadTimeT0Minutes}m) reasonable`);
  assert.strictEqual(sim.peaks.length, 2, 'Must resolve 2 peaks');

  const p1 = sim.peaks[0];
  const p2 = sim.peaks[1];
  assert.ok(p2.retentionTimeMinutes > p1.retentionTimeMinutes, 'Second peak must elute after first peak');
  assert.ok(sim.separationFactorAlpha > 1.2, `Separation factor alpha (${sim.separationFactorAlpha}) must exceed 1.2`);
  assert.ok(sim.resolutionRs >= 1.5, `Resolution Rs (${sim.resolutionRs}) must be baseline resolved (>= 1.5)`);
  assert.strictEqual(sim.isBaselineResolved, true, 'isBaselineResolved must be true');

  // Equal 50:50 racemate gives ~0% ee
  assert.ok(sim.enantiomericExcessPercent < 1.0, `Racemate ee% (${sim.enantiomericExcessPercent}%) should be ~0%`);
});

runTest('simulateSfcChromatogram reflects high ee% for Esomeprazole chiral switch', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'esomeprazole_omeprazole_ppi');
  const sim = simulateSfcChromatogram(std);

  // Esomeprazole is 85% S vs 15% R -> ee% = (85 - 15) / (85 + 15) = 70.0%
  assert.ok(Math.abs(sim.enantiomericExcessPercent - 70.0) < 0.5, `ee% (${sim.enantiomericExcessPercent}%) must match 70%`);
  assert.ok(sim.peaks[0].peakArea > sim.peaks[1].peakArea, 'Esomeprazole peak must dominate');
});

runTest('Increasing organic modifier % accelerates elution and reduces retention times', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'thalidomide_chiral_enantiomers');
  const simLowMod = simulateSfcChromatogram(std, 10.0); // 10% MeOH
  const simHighMod = simulateSfcChromatogram(std, 30.0); // 30% MeOH

  const tR1Low = simLowMod.peaks[0].retentionTimeMinutes;
  const tR1High = simHighMod.peaks[0].retentionTimeMinutes;
  assert.ok(tR1High < tR1Low, `High modifier retention (${tR1High}m) must be shorter than low modifier (${tR1Low}m)`);
});

runTest('Chromatogram point series produces smooth curve with peak maxima', () => {
  const std = SFC_STANDARD_CATALOG.find((s) => s.id === 'cannabinoid_green_fractionation');
  const sim = simulateSfcChromatogram(std);

  assert.ok(sim.chromatogramPoints.length > 300, 'Must have >300 chromatogram points');
  const maxMau = Math.max(...sim.chromatogramPoints.map((p) => p.absorbanceMau));
  assert.ok(maxMau > 10.0, `Max absorbance (${maxMau} mAU) must indicate detected peaks`);
  assert.ok(sim.solventWasteSavedKgPerDay > 1.0, 'Must quantify organic solvent waste saved');
});

// -----------------------------------------------------------------------------
// 5. Card Matching Service
// -----------------------------------------------------------------------------
runTest('getMatchingSfcCard correctly maps drug and natural product cards', () => {
  const thalidomideCard = { name: 'Thalidomide Sedative Racemate', formula: 'C13H10N2O4', description: 'Chiral sedative' };
  const matchThal = getMatchingSfcCard(thalidomideCard);
  assert.ok(matchThal, 'Must match Thalidomide');
  assert.strictEqual(matchThal.id, 'thalidomide_chiral_enantiomers');

  const ibuprofenCard = { name: 'Dexibuprofen Anti-inflammatory', formula: 'C13H18O2', description: 'NSAID pain reliever' };
  const matchIbu = getMatchingSfcCard(ibuprofenCard);
  assert.ok(matchIbu, 'Must match Ibuprofen');
  assert.strictEqual(matchIbu.id, 'ibuprofen_nsaid_enantiomers');

  const esomeprazoleCard = { name: 'Nexium Esomeprazole Magnesium', formula: 'C17H19N3O3S', description: 'Proton pump inhibitor' };
  const matchEso = getMatchingSfcCard(esomeprazoleCard);
  assert.ok(matchEso, 'Must match Esomeprazole');
  assert.strictEqual(matchEso.id, 'esomeprazole_omeprazole_ppi');

  const cbdCard = { name: 'Cannabidiol Hemp Extract (CBD)', formula: 'C21H30O2', description: 'Non-psychoactive cannabinoid' };
  const matchCbd = getMatchingSfcCard(cbdCard);
  assert.ok(matchCbd, 'Must match CBD');
  assert.strictEqual(matchCbd.id, 'cannabinoid_green_fractionation');

  const vitECard = { name: 'd-alpha-Tocopherol Vitamin E Oil', formula: 'C29H50O2', description: 'Antioxidant lipid' };
  const matchVitE = getMatchingSfcCard(vitECard);
  assert.ok(matchVitE, 'Must match Vitamin E');
  assert.strictEqual(matchVitE.id, 'tocopherol_vitamin_e_isomers');

  const saltCard = { name: 'Magnesium Sulfate Heptahydrate', formula: 'MgSO4.7H2O', description: 'Epsom salt' };
  const matchNone = getMatchingSfcCard(saltCard);
  assert.strictEqual(matchNone, null, 'Inorganic salts must return null for SFC');
});

// -----------------------------------------------------------------------------
// 6. Physics Validation & Invariant Testing
// -----------------------------------------------------------------------------
runTest('validateSfcStandardPhysics rejects subcritical pressure or unphysical geometry', () => {
  const lowPressure = { ...SFC_STANDARD_CATALOG[0], defaultBackPressureBar: 50.0 }; // < 73.8 bar
  assert.strictEqual(validateSfcStandardPhysics(lowPressure), false, 'Must reject subcritical pressure');

  const lowTemp = { ...SFC_STANDARD_CATALOG[0], defaultOvenTempCelsius: 15.0 }; // < 20°C
  assert.strictEqual(validateSfcStandardPhysics(lowTemp), false, 'Must reject cold column');

  const zeroPeaks = { ...SFC_STANDARD_CATALOG[0], peaks: [] };
  assert.strictEqual(validateSfcStandardPhysics(zeroPeaks), false, 'Must reject empty peaks');

  const zeroLength = { ...SFC_STANDARD_CATALOG[0], columnLengthMm: 0 };
  assert.strictEqual(validateSfcStandardPhysics(zeroLength), false, 'Must reject zero column length');
});

runTest('All 5 SFC standards simulate cleanly across extreme pressure and temperature', () => {
  for (const std of SFC_STANDARD_CATALOG) {
    // Test standard at 100 bar, 35°C
    const sim1 = simulateSfcChromatogram(std, 15, 100, 35, 2.5);
    assert.ok(!Number.isNaN(sim1.resolutionRs), `Rs must be finite for ${std.id}`);
    assert.ok(!Number.isNaN(sim1.densityCo2GPerCm3), `Density must be finite for ${std.id}`);
    assert.ok(sim1.peaks.length > 0, `Peaks must exist for ${std.id}`);

    // Test standard at 250 bar, 60°C
    const sim2 = simulateSfcChromatogram(std, 25, 250, 60, 4.0);
    assert.ok(sim2.theoreticalPlateCountN > 500, `N must exceed 500 for ${std.id}`);
  }
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('🎉 Supercritical Fluid Chromatography (SFC) Engine verified!');
console.log('========================================================\n');
