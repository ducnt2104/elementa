import assert from 'node:assert';
import {
  DSC_STANDARD_CATALOG,
  GAS_CONSTANT_R,
  calculateGibbsFreeEnergyJPerMol,
  calculateEquilibriumConstant,
  calculateFractionUnfolded,
  calculateDomainExcessCp,
  calculateBaselineHeatCapacity,
  simulateDscScan,
  getMatchingDscCard,
  validateDscStandardPhysics,
} from '../src/domain/dscEngine.ts';

console.log('🧪 =================================================================');
console.log('🧪 ELEMENTA TEST SUITE 139: DIFFERENTIAL SCANNING CALORIMETRY (DSC)');
console.log('🧪 Two-State Unfolding · Gibbs-Helmholtz · Multi-Domain mAb & Tg');
console.log('🧪 =================================================================\n');

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
// 1. Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('DSC Catalog contains 5 international benchmark calorimetric systems', () => {
  assert.strictEqual(DSC_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = DSC_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('lysozyme_hen_egg_white_calibrant'), 'Must include Lysozyme HEWL');
  assert.ok(ids.includes('therapeutic_mab_igg1_multidomain'), 'Must include Monoclonal Antibody IgG1');
  assert.ok(ids.includes('indomethacin_pvp_amorphous_dispersion'), 'Must include Amorphous Indomethacin-PVP');
  assert.ok(ids.includes('dsdna_oligonucleotide_duplex_melting'), 'Must include dsDNA Duplex');
  assert.ok(ids.includes('gallium_indium_astm_e967_calibrant'), 'Must include Gallium/Indium Calibrant');
});

runTest('Lysozyme standard exhibits ideal two-state cooperativity (r_coop ~ 1.02)', () => {
  const hewl = DSC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hen_egg_white_calibrant');
  assert.ok(hewl, 'HEWL standard must exist');
  assert.strictEqual(hewl.unfoldingMechanism, 'TWO_STATE_COOPERATIVE');
  assert.strictEqual(hewl.domains.length, 1, 'Two-state model has single domain');
  assert.strictEqual(hewl.domains[0].tmCelsius, 65.4, 'Tm must be 65.4 °C');
  assert.strictEqual(hewl.domains[0].calorimetricEnthalpyKjPerMol, 504.0, 'Delta H_cal must be 504 kJ/mol');
  assert.ok(Math.abs(hewl.cooperativityRatio - 1.02) < 0.01, 'Cooperativity ratio ~ 1.02');
  assert.ok(validateDscStandardPhysics(hewl), 'HEWL physics must validate');
});

runTest('IgG1 monoclonal antibody resolves 3 distinct domains (CH2, Fab, CH3) with non-two-state cooperativity', () => {
  const mab = DSC_STANDARD_CATALOG.find((s) => s.id === 'therapeutic_mab_igg1_multidomain');
  assert.ok(mab, 'IgG1 mAb standard must exist');
  assert.strictEqual(mab.unfoldingMechanism, 'MULTI_DOMAIN_NON_TWO_STATE');
  assert.strictEqual(mab.domains.length, 3, 'Must have 3 domains: CH2, Fab, and CH3');

  const ch2 = mab.domains.find((d) => d.domainName.includes('CH2'));
  const fab = mab.domains.find((d) => d.domainName.includes('Fab'));
  const ch3 = mab.domains.find((d) => d.domainName.includes('CH3'));

  assert.ok(ch2 && fab && ch3, 'All 3 domains must be defined');
  assert.ok(ch2.tmCelsius < fab.tmCelsius, 'CH2 must unfold earlier than Fab (lowest thermal stability)');
  assert.ok(fab.tmCelsius < ch3.tmCelsius, 'Fab must unfold earlier than CH3');
  assert.ok(mab.cooperativityRatio > 2.0, 'Cooperativity ratio > 2.0 confirms non-two-state multi-domain transition');
  assert.ok(validateDscStandardPhysics(mab), 'mAb physics must validate');
});

runTest('Indomethacin-PVP solid dispersion models glass transition Tg and recrystallization', () => {
  const pvp = DSC_STANDARD_CATALOG.find((s) => s.id === 'indomethacin_pvp_amorphous_dispersion');
  assert.ok(pvp, 'Amorphous dispersion standard must exist');
  assert.strictEqual(pvp.unfoldingMechanism, 'AMORPHOUS_CRYSTALLINE_GLASS');
  assert.strictEqual(pvp.glassTransitionTgCelsius, 42.0, 'Tg must be 42.0 °C');
  assert.strictEqual(pvp.coldCrystallizationTcCelsius, 95.5, 'Tc must be 95.5 °C');
  assert.ok(validateDscStandardPhysics(pvp), 'Polymer dispersion physics must validate');
});

// -----------------------------------------------------------------------------
// 2. Gibbs-Helmholtz & Thermodynamics
// -----------------------------------------------------------------------------
runTest('Gibbs-Helmholtz free energy Delta G(T) equals 0 at transition midpoint Tm', () => {
  const tm = 65.4; // °C
  const deltaH = 504.0; // kJ/mol
  const deltaCp = 6.3; // kJ/(mol*K)

  const deltaGatTm = calculateGibbsFreeEnergyJPerMol(tm, tm, deltaH, deltaCp);
  assert.ok(Math.abs(deltaGatTm) < 1e-6, 'Delta G° must equal exactly 0 J/mol at T = Tm');

  // Below Tm (e.g. 25 °C), native state is favored (Delta G > 0)
  const deltaGat25C = calculateGibbsFreeEnergyJPerMol(25.0, tm, deltaH, deltaCp);
  assert.ok(deltaGat25C > 30000.0, 'Delta G° must be > +30 kJ/mol at 25 °C (folded stable native state)');

  // Above Tm (e.g. 90 °C), denatured state is favored (Delta G < 0)
  const deltaGat90C = calculateGibbsFreeEnergyJPerMol(90.0, tm, deltaH, deltaCp);
  assert.ok(deltaGat90C < -20000.0, 'Delta G° must be < -20 kJ/mol at 90 °C (unfolded denatured state)');
});

runTest('Fraction unfolded f_D(T) is exactly 0.50 (50%) at Tm and follows sigmoidal transition', () => {
  const tm = 65.4;
  const deltaH = 504.0;
  const deltaCp = 6.3;

  const fDatTm = calculateFractionUnfolded(tm, tm, deltaH, deltaCp);
  assert.ok(Math.abs(fDatTm - 0.5) < 1e-4, 'f_D(Tm) must be exactly 0.500 (50% unfolded)');

  const fDat25 = calculateFractionUnfolded(25.0, tm, deltaH, deltaCp);
  assert.ok(fDat25 < 0.001, 'f_D(25 °C) must be < 0.1% unfolded');

  const fDat90 = calculateFractionUnfolded(90.0, tm, deltaH, deltaCp);
  assert.ok(fDat90 > 0.999, 'f_D(90 °C) must be > 99.9% unfolded');
});

runTest('Excess heat capacity Delta Cp_excess(T) peaks at Tm with positive heat capacity uptake', () => {
  const hewl = DSC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hen_egg_white_calibrant');
  const dom = hewl.domains[0];

  const peakExcessCp = calculateDomainExcessCp(dom.tmCelsius, dom);
  const baselineExcessCp = calculateDomainExcessCp(25.0, dom);

  assert.ok(peakExcessCp > 25.0, 'Peak excess Cp at Tm must be substantial (> 25 kJ/(mol*K))');
  assert.ok(baselineExcessCp < 0.01, 'Excess Cp far below Tm must be approximately 0');
});

// -----------------------------------------------------------------------------
// 3. Full DSC Thermogram Simulation
// -----------------------------------------------------------------------------
runTest('simulateDscScan generates continuous thermogram with baseline and deconvoluted domains', () => {
  const mab = DSC_STANDARD_CATALOG.find((s) => s.id === 'therapeutic_mab_igg1_multidomain');
  const sim = simulateDscScan(mab, 150);

  assert.ok(sim, 'Simulation result must exist');
  assert.strictEqual(sim.points.length, 150, 'Must produce requested number of temperature points');
  assert.ok(sim.deconvolutedDomains.length === 3, 'Must report all 3 domains');

  // Deconvoluted enthalpy sum
  const percentSum = sim.deconvolutedDomains.reduce((acc, d) => acc + d.domainFractionPercent, 0);
  assert.ok(Math.abs(percentSum - 100) <= 2, 'Domain percentage fractions must sum to approximately 100%');

  // Buffer stabilization score
  assert.ok(sim.bufferStabilizationScore >= 0 && sim.bufferStabilizationScore <= 100, 'Score must be in range 0-100');
  assert.ok(sim.apparentOnsetTmCelsius < sim.peakTmCelsius, 'Onset temperature must precede peak temperature');
});

// -----------------------------------------------------------------------------
// 4. Card Matching Heuristic
// -----------------------------------------------------------------------------
runTest('getMatchingDscCard associates relevant cards with DSC standards', () => {
  const lysozymeCard = { name: 'Enzyme Lysozyme', description: 'Chuẩn nhiệt lượng kế sinh học HEWL' };
  const match1 = getMatchingDscCard(lysozymeCard);
  assert.ok(match1, 'Must match lysozyme card');
  assert.strictEqual(match1.id, 'lysozyme_hen_egg_white_calibrant');

  const mabCard = { name: 'Kháng thể đơn dòng IgG1', description: 'Đo độ ổn định nhiệt công thức mAbs' };
  const match2 = getMatchingDscCard(mabCard);
  assert.ok(match2, 'Must match mAb card');
  assert.strictEqual(match2.id, 'therapeutic_mab_igg1_multidomain');

  const indoCard = { name: 'Indomethacin vô định hình', description: 'Nhiệt độ hóa thủy tinh Tg và tái kết tinh' };
  const match3 = getMatchingDscCard(indoCard);
  assert.ok(match3, 'Must match indomethacin card');
  assert.strictEqual(match3.id, 'indomethacin_pvp_amorphous_dispersion');

  const dnaCard = { name: 'Đoạn mồi PCR DNA duplex', description: 'Nóng chảy DNA oligonucleotide' };
  const match4 = getMatchingDscCard(dnaCard);
  assert.ok(match4, 'Must match DNA card');
  assert.strictEqual(match4.id, 'dsdna_oligonucleotide_duplex_melting');

  const gaCard = { name: 'Kim loại Gallium 99.9999%', description: 'Hiệu chuẩn nhiệt độ ASTM E967' };
  const match5 = getMatchingDscCard(gaCard);
  assert.ok(match5, 'Must match gallium card');
  assert.strictEqual(match5.id, 'gallium_indium_astm_e967_calibrant');

  const unrelated = { name: 'Muối ăn NaCl', description: 'Tinh thể ion lập phương tâm diện' };
  assert.strictEqual(getMatchingDscCard(unrelated), null, 'Unrelated card must return null');
});

console.log('\n=================================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (100% Pass)`);
console.log('=================================================================\n');
