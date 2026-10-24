// test-itc-visualizer.mjs
// Milestone 75: Test Suite 132 - Isothermal Titration Calorimetry (ITC), Binding Enthalpy (ΔH°) & Wiseman c-Value Thermodynamics Engine
// Standards: IUPAC Division I Physical & Biophysical Chemistry, Wiseman et al. (1989), Freire et al.
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Năng lượng hóa học, biến thiên enthalpy Δr H°298; Hóa học 12: Phức chất kim loại; Sinh học 10: Tương tác enzyme - cơ chất)

import assert from 'node:assert';
import {
  UNIVERSAL_GAS_CONSTANT_R,
  CALORIE_TO_JOULE,
  ITC_STANDARD_CATALOG,
  calculateWisemanCValue,
  calculateBoundFractionTheta,
  simulateItcTitration,
  getMatchingItcCard,
  validateItcStandardPhysics
} from '../src/domain/itcEngine.ts';

console.log('🧪 ============================================================');
console.log('🧪 ELEMENTA TEST SUITE 132: ITC & BINDING ENTHALPY ENGINE');
console.log('🧪 Standards: IUPAC Biophysical Chemistry & Wiseman Metrology');
console.log('🧪 ============================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// 1. Fundamental Physical Constants & Conversion Factors
// ---------------------------------------------------------------------------
runTest('Universal Gas Constant R and calorie conversion adhere to CODATA', () => {
  assert.strictEqual(UNIVERSAL_GAS_CONSTANT_R, 8.314462618);
  assert.strictEqual(CALORIE_TO_JOULE, 4.184);
});

// ---------------------------------------------------------------------------
// 2. Catalog Standards Verification & Physical Consistency
// ---------------------------------------------------------------------------
runTest('ITC Catalog contains exactly 5 benchmark interaction systems', () => {
  assert.strictEqual(ITC_STANDARD_CATALOG.length, 5);
});

runTest('All standards pass physical validity checks', () => {
  for (const std of ITC_STANDARD_CATALOG) {
    assert.ok(validateItcStandardPhysics(std), `Standard ${std.id} failed physics validation`);
    assert.ok(std.id.length > 0);
    assert.ok(std.name.length > 0);
    assert.ok(std.vietnameseName.length > 0);
    assert.ok(std.stoichiometryN >= 1.0);
    assert.ok(std.associationConstantKaMolar > 0);
    assert.ok(std.dissociationConstantKdMolar > 0);
    assert.ok(Math.abs(std.bindingEnthalpyDeltaHKjPerMol) > 0);
    assert.ok(std.curriculumNotes.includes('GDPT 2018'));
  }
});

runTest('Catalog IDs are completely unique', () => {
  const ids = ITC_STANDARD_CATALOG.map((s) => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, ids.length);
});

// ---------------------------------------------------------------------------
// 3. Calcium - EDTA Chelation Standard Calibrant Specifics
// ---------------------------------------------------------------------------
runTest('EDTA-Calcium chelation exhibits n=1.00 stoichiometry and exothermic ΔH = -25.5 kJ/mol', () => {
  const edta = ITC_STANDARD_CATALOG.find((s) => s.id === 'edta_calcium_chelation');
  assert.ok(edta);
  assert.strictEqual(edta.interactionType, 'CHELATION_COMPLEX');
  assert.strictEqual(edta.stoichiometryN, 1.0);
  assert.strictEqual(edta.bindingEnthalpyDeltaHKjPerMol, -25.5);
  assert.strictEqual(edta.associationConstantKaMolar, 5.2e7);

  // Wiseman c-value: c = 1.0 * 5.2e7 * 2.5e-5 = 1300
  const c = calculateWisemanCValue(edta.stoichiometryN, edta.associationConstantKaMolar, edta.macromoleculeConcentrationMolar);
  assert.strictEqual(c, 1300);
});

// ---------------------------------------------------------------------------
// 4. Streptavidin - Biotin Ultra-Affinity (Tetrameric n=4, Kd=100 fM)
// ---------------------------------------------------------------------------
runTest('Streptavidin-Biotin exhibits tetrameric n=4.0 and massive enthalpy ΔH = -134 kJ/mol', () => {
  const bio = ITC_STANDARD_CATALOG.find((s) => s.id === 'streptavidin_biotin');
  assert.ok(bio);
  assert.strictEqual(bio.stoichiometryN, 4.0);
  assert.strictEqual(bio.dissociationConstantKdMolar, 1.0e-13); // 100 fM
  assert.strictEqual(bio.bindingEnthalpyDeltaHKjPerMol, -134.0);

  // Simulation verification
  const sim = simulateItcTitration(bio);
  assert.strictEqual(sim.thermodynamicDrivingForce, 'ENTHALPY_DRIVEN');
  assert.ok(sim.entropyContributionMinusTDeltaSKjPerMol > 0); // Entropic penalty for rigid loop locking
});

// ---------------------------------------------------------------------------
// 5. HIV-1 Protease - Darunavir Inhibitor (Enthalpy-Optimized Drug Design)
// ---------------------------------------------------------------------------
runTest('HIV-1 Protease inhibitor Darunavir displays picomolar affinity (Kd=15 pM)', () => {
  const hiv = ITC_STANDARD_CATALOG.find((s) => s.id === 'hiv1_protease_darunavir');
  assert.ok(hiv);
  assert.strictEqual(hiv.interactionType, 'DRUG_ENZYME_INHIBITOR');
  assert.strictEqual(hiv.stoichiometryN, 1.0);
  assert.strictEqual(hiv.dissociationConstantKdMolar, 1.5e-11); // 15 pM
  assert.strictEqual(hiv.bindingEnthalpyDeltaHKjPerMol, -46.8);
});

// ---------------------------------------------------------------------------
// 6. β-Cyclodextrin - Adamantane (Host-Guest Cavity Desolvation)
// ---------------------------------------------------------------------------
runTest('β-Cyclodextrin host-guest inclusion model verifies 1:1 hydrophobic encapsulation', () => {
  const cd = ITC_STANDARD_CATALOG.find((s) => s.id === 'beta_cyclodextrin_adamantane');
  assert.ok(cd);
  assert.strictEqual(cd.interactionType, 'HOST_GUEST_INCLUSION');
  assert.strictEqual(cd.stoichiometryN, 1.0);
  assert.strictEqual(cd.bindingEnthalpyDeltaHKjPerMol, -19.2);
  assert.ok(cd.associationConstantKaMolar > 1e4);
});

// ---------------------------------------------------------------------------
// 7. Lysozyme - Tri-NAG Bacterial Mimic
// ---------------------------------------------------------------------------
runTest('Lysozyme binds NAG3 substrate mimic with ΔH = -52 kJ/mol and sub-cleft ordering', () => {
  const lys = ITC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_tri_nag');
  assert.ok(lys);
  assert.strictEqual(lys.interactionType, 'ENZYME_SUBSTRATE_MIMIC');
  assert.strictEqual(lys.stoichiometryN, 1.0);
  assert.strictEqual(lys.bindingEnthalpyDeltaHKjPerMol, -52.0);
  assert.strictEqual(lys.dissociationConstantKdMolar, 5.56e-6); // 5.56 uM
});

// ---------------------------------------------------------------------------
// 8. Langmuir Binding Isotherm & Fraction Bound Theta
// ---------------------------------------------------------------------------
runTest('calculateBoundFractionTheta correctly calculates saturation curve', () => {
  const mt = 2.5e-5; // 25 uM
  const ka = 5.2e7; // 5.2e7 M^-1
  const n = 1.0;

  // No ligand -> 0
  assert.strictEqual(calculateBoundFractionTheta(mt, 0, n, ka), 0);

  // Equimolar ligand ([L] = [M] = 25 uM): high binding (>90%)
  const thetaEq = calculateBoundFractionTheta(mt, 2.5e-5, n, ka);
  assert.ok(thetaEq > 0.90 && thetaEq < 1.0);

  // Large excess ligand ([L] = 10 * [M]): saturated (~1.0)
  const thetaSat = calculateBoundFractionTheta(mt, 2.5e-4, n, ka);
  assert.ok(thetaSat > 0.98 && thetaSat <= 1.0);

  // Monotonic increase
  assert.ok(thetaSat > thetaEq);
});

// ---------------------------------------------------------------------------
// 9. Thermodynamic State Functions Identity: ΔG° = ΔH° - TΔS°
// ---------------------------------------------------------------------------
runTest('Full thermodynamic cycle rigorously satisfies Gibbs Helmholtz equation', () => {
  for (const std of ITC_STANDARD_CATALOG) {
    const sim = simulateItcTitration(std);
    const deltaG = sim.gibbsFreeEnergyDeltaGKjPerMol;
    const deltaH = std.bindingEnthalpyDeltaHKjPerMol;
    const minusTDeltaS = sim.entropyContributionMinusTDeltaSKjPerMol;

    // Delta G° = Delta H° + (-T Delta S°)
    const reconstructedDeltaG = deltaH + minusTDeltaS;
    assert.ok(
      Math.abs(deltaG - reconstructedDeltaG) < 0.2,
      `Thermodynamic mismatch in ${std.id}: ΔG°=${deltaG}, ΔH°-TΔS°=${reconstructedDeltaG}`
    );
  }
});

// ---------------------------------------------------------------------------
// 10. Titration Injections & Heat Plateau Behavior
// ---------------------------------------------------------------------------
runTest('simulateItcTitration produces decreasing injection heats approaching dilution baseline', () => {
  const edta = ITC_STANDARD_CATALOG[0];
  const sim = simulateItcTitration(edta);

  assert.strictEqual(sim.injections.length, edta.numberOfInjections);

  // First injection should release maximum negative heat (exothermic)
  const firstInj = sim.injections[0];
  const lastInj = sim.injections[sim.injections.length - 1];

  assert.ok(firstInj.heatPerInjectionMicroJoules < 0);
  // Last injection should have small heat (near dilution)
  assert.ok(Math.abs(lastInj.heatPerInjectionMicroJoules) < Math.abs(firstInj.heatPerInjectionMicroJoules));
  assert.ok(lastInj.titrantMolarRatio > edta.stoichiometryN * 1.5);
});

// ---------------------------------------------------------------------------
// 11. Raw Thermogram Signal Verification
// ---------------------------------------------------------------------------
runTest('simulateItcTitration generates exponential power spikes in raw thermogram', () => {
  const edta = ITC_STANDARD_CATALOG[0];
  const sim = simulateItcTitration(edta);

  assert.ok(sim.rawThermogram.length > 500);

  // Peak power should be negative for exothermic reaction
  const minPower = Math.min(...sim.rawThermogram.map((p) => p.differentialPowerMicroWatts));
  assert.ok(minPower < -1.0, `Expected negative power spike for exothermic run, got ${minPower}`);
});

// ---------------------------------------------------------------------------
// 12. Card Matcher Engine
// ---------------------------------------------------------------------------
runTest('getMatchingItcCard accurately maps cards to ITC benchmark standards', () => {
  // Calcium / EDTA
  const caCard = { name: 'Calci Clorua CaCl2', symbol: 'Ca', formula: 'CaCl2' };
  assert.strictEqual(getMatchingItcCard(caCard)?.id, 'edta_calcium_chelation');

  // Biotin
  const bioCard = { name: 'Vitamin B7 Biotin', formula: 'C10H16N2O3S' };
  assert.strictEqual(getMatchingItcCard(bioCard)?.id, 'streptavidin_biotin');

  // Darunavir / HIV
  const hivCard = { name: 'Thuốc Kháng Virus HIV Protease', formula: 'Darunavir' };
  assert.strictEqual(getMatchingItcCard(hivCard)?.id, 'hiv1_protease_darunavir');

  // Cyclodextrin
  const cdCard = { name: 'Vòng Beta-Cyclodextrin Siêu Phân Tử', formula: 'C42H70O35' };
  assert.strictEqual(getMatchingItcCard(cdCard)?.id, 'beta_cyclodextrin_adamantane');

  // Lysozyme
  const lysCard = { name: 'Kháng Khuẩn Lysozyme Lòng Trắng Trứng', formula: 'Lysozyme' };
  assert.strictEqual(getMatchingItcCard(lysCard)?.id, 'lysozyme_tri_nag');

  // Non-matching
  const feCard = { name: 'Quặng Sắt', symbol: 'Fe', formula: 'Fe2O3' };
  assert.strictEqual(getMatchingItcCard(feCard), null);
  assert.strictEqual(getMatchingItcCard(null), null);
});

// ---------------------------------------------------------------------------
// 13. Wiseman c-Value Regimes Classification
// ---------------------------------------------------------------------------
runTest('Wiseman c-value regimes correctly classify diffuse, optimal, and step-function curves', () => {
  // Low affinity or low concentration -> diffuse curve (c < 5)
  const lowC = calculateWisemanCValue(1.0, 1e4, 1e-4); // c = 1.0
  assert.strictEqual(lowC, 1.0);

  // Moderate affinity -> optimal sigmoidal curvature (10 <= c <= 1000)
  const optC = calculateWisemanCValue(1.0, 5e6, 5e-5); // c = 250
  assert.strictEqual(optC, 250);

  // Ultra-high affinity -> stoichiometric step function (c > 1500)
  const highC = calculateWisemanCValue(4.0, 1e13, 5e-6); // c = 2e8
  assert.ok(highC > 1e6);
});

// ---------------------------------------------------------------------------
// 14. Enthalpy-Entropy Compensation (EEC) Invariance
// ---------------------------------------------------------------------------
runTest('Thermodynamic driving force identifies enthalpy-driven vs entropy-driven binding', () => {
  const bio = ITC_STANDARD_CATALOG.find((s) => s.id === 'streptavidin_biotin');
  const simBio = simulateItcTitration(bio);
  assert.strictEqual(simBio.thermodynamicDrivingForce, 'ENTHALPY_DRIVEN');

  // Negative Delta G confirms spontaneous binding in all standards
  for (const std of ITC_STANDARD_CATALOG) {
    const sim = simulateItcTitration(std);
    assert.ok(sim.gibbsFreeEnergyDeltaGKjPerMol < 0, `Delta G must be negative for ${std.id}`);
  }
});

// ---------------------------------------------------------------------------
// 15. Cumulative Heat Monotonicity
// ---------------------------------------------------------------------------
runTest('Cumulative titration heat evolves monotonically until saturation', () => {
  const edta = ITC_STANDARD_CATALOG[0];
  const sim = simulateItcTitration(edta);

  for (let i = 1; i < sim.injections.length; i++) {
    // Exothermic -> cumulative heat becomes increasingly negative
    assert.ok(
      sim.injections[i].cumulativeHeatMicroJoules <= sim.injections[i - 1].cumulativeHeatMicroJoules,
      `Cumulative heat must be monotonic at injection ${i}`
    );
  }
});

// ---------------------------------------------------------------------------
// 16. Physiological Temperature Shift (37°C vs 25°C)
// ---------------------------------------------------------------------------
runTest('ITC simulation operates consistently across temperature ranges', () => {
  const edta = ITC_STANDARD_CATALOG[0];
  const edta37 = { ...edta, temperatureKelvin: 310.15 }; // 37°C
  const sim37 = simulateItcTitration(edta37);

  assert.ok(sim37.gibbsFreeEnergyDeltaGKjPerMol < 0);
  assert.strictEqual(sim37.injections.length, edta.numberOfInjections);
});

console.log(`\n🎉 ALL ${passedTests} / ${totalTests} TESTS PASSED FOR TEST SUITE 132!`);
