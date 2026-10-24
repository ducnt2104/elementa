/**
 * ELEMENTA TEST SUITE 178: Transition Metals & Coordination Complexes Domain Engine
 * Conforms to IUPAC Gold Book and Vietnam GDPT 2018 Grade 12 (Chủ đề 8: Kim loại chuyển tiếp & Phức chất).
 */

import {
  TRANSITION_METALS_SERIES,
  SPECTROCHEMICAL_LIGANDS,
  COORDINATION_COMPLEXES,
  calculateChromateEquilibrium,
  calculateCobaltEquilibrium,
  calculateOctahedralSplitting
} from '../src/domain/transitionMetalsEngine.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 178: TRANSITION METALS & COORDINATION COMPLEXES');
console.log('======================================================================');

// 1. Transition Metals Catalog & Electron Configurations
assert(TRANSITION_METALS_SERIES.length === 10, 'Catalog contains all 10 first-row transition elements (Sc to Zn)');

const cr = TRANSITION_METALS_SERIES.find(m => m.symbol === 'Cr');
assert(cr && cr.isAnomalous === true, 'Chromium (Cr) is flagged as anomalous');
assert(cr.electronConfig.includes('3d⁵ 4s¹') || cr.valenceElectrons.includes('3d⁵ 4s¹'), 'Cr has anomalous [Ar] 3d5 4s1 configuration');
assert(cr.anomalyReason && cr.anomalyReason.includes('bán bão hòa'), 'Cr anomaly reason explains half-filled 3d5 stability');

const cu = TRANSITION_METALS_SERIES.find(m => m.symbol === 'Cu');
assert(cu && cu.isAnomalous === true, 'Copper (Cu) is flagged as anomalous');
assert(cu.electronConfig.includes('3d¹⁰ 4s¹') || cu.valenceElectrons.includes('3d¹⁰ 4s¹'), 'Cu has anomalous [Ar] 3d10 4s1 configuration');
assert(cu.anomalyReason && cu.anomalyReason.includes('bão hòa'), 'Cu anomaly reason explains fully-filled 3d10 stability');

const zn = TRANSITION_METALS_SERIES.find(m => m.symbol === 'Zn');
assert(zn && zn.isAnomalous === false, 'Zinc is not anomalous');
assert(zn.colorInAqueous[2].colorVi.includes('Không màu'), 'Zn(II) aqueous complexes are colorless due to filled d10');

const mn = TRANSITION_METALS_SERIES.find(m => m.symbol === 'Mn');
assert(mn && mn.commonOxidationStates.includes(7), 'Manganese has oxidation state +7 (KMnO4)');
assert(mn.colorInAqueous[7].colorVi.includes('Tím'), 'Mn(VII) permanganate is characteristic purple');

// 2. Spectrochemical Series of Ligands
assert(SPECTROCHEMICAL_LIGANDS.length >= 10, 'Spectrochemical series includes at least 10 ligands');
const iLigand = SPECTROCHEMICAL_LIGANDS.find(l => l.formula === 'I-');
const coLigand = SPECTROCHEMICAL_LIGANDS.find(l => l.formula === 'CO');
const h2oLigand = SPECTROCHEMICAL_LIGANDS.find(l => l.formula === 'H2O');
const nh3Ligand = SPECTROCHEMICAL_LIGANDS.find(l => l.formula === 'NH3');
const cnLigand = SPECTROCHEMICAL_LIGANDS.find(l => l.formula === 'CN-');

assert(iLigand.spectrochemicalRank < h2oLigand.spectrochemicalRank, 'I- is weaker field than H2O');
assert(h2oLigand.spectrochemicalRank < nh3Ligand.spectrochemicalRank, 'H2O is weaker field than NH3');
assert(nh3Ligand.spectrochemicalRank < cnLigand.spectrochemicalRank, 'NH3 is weaker field than CN-');
assert(cnLigand.spectrochemicalRank < coLigand.spectrochemicalRank, 'CN- is weaker field than CO');

// 3. Coordination Complexes Catalog
assert(COORDINATION_COMPLEXES.length >= 10, 'Complexes catalog includes at least 10 canonical complexes');

const cuAmmine = COORDINATION_COMPLEXES.find(c => c.id === 'cu-ammine');
assert(cuAmmine && cuAmmine.formula.includes('[Cu(NH3)4(H2O)2]2+'), 'Schweizer/copper ammine complex is included');
assert(cuAmmine.solutionColorVi.includes('Xanh lam thẫm') || cuAmmine.solutionColorVi.includes('Royal Blue'), 'Copper ammine has royal dark blue color');

const agTollens = COORDINATION_COMPLEXES.find(c => c.id === 'ag-ammine');
assert(agTollens && agTollens.geometry === 'ĐƯỜNG_THẲNG', 'Tollens [Ag(NH3)2]+ has linear geometry (coordination number 2)');
assert(agTollens.coordinationNumber === 2, 'Tollens silver has coordination number 2');

const cisplatin = COORDINATION_COMPLEXES.find(c => c.id === 'cisplatin');
assert(cisplatin && cisplatin.geometry === 'VUÔNG_PHẲNG', 'Cisplatin [Pt(NH3)2Cl2] has square planar geometry');
assert(cisplatin.netCharge === 0, 'Cisplatin is a neutral coordination compound');

const feScn = COORDINATION_COMPLEXES.find(c => c.id === 'fe-scn');
assert(feScn && feScn.solutionColorVi.includes('Đỏ máu'), 'Fe(III)-thiocyanate complex [Fe(SCN)]2+ is blood red');

// 4. Chromate - Dichromate Equilibrium Model
const acidResult = calculateChromateEquilibrium(2.0);
assert(acidResult.dominantSpecies === 'Cr2O7(2-)', 'In acidic conditions (pH 2), Cr2O7(2-) dichromate dominates');
assert(acidResult.cr2O7Percentage >= 80, 'Dichromate percentage is >= 80% at pH 2');
assert(acidResult.solutionColorVi.includes('Da cam'), 'Acidic chromate solution is orange');

const basicResult = calculateChromateEquilibrium(12.0);
assert(basicResult.dominantSpecies === 'CrO4(2-)', 'In basic conditions (pH 12), CrO4(2-) chromate dominates');
assert(basicResult.crO4Percentage >= 80, 'Chromate percentage is >= 80% at pH 12');
assert(basicResult.solutionColorVi.includes('Vàng'), 'Basic chromate solution is yellow');

const midResult = calculateChromateEquilibrium(6.0);
assert(Math.abs(midResult.crO4Percentage - midResult.cr2O7Percentage) <= 10, 'At pH 6.0, chromate and dichromate are near equilibrium parity');

// 5. Cobalt Chloride Octahedral - Tetrahedral Thermal Switch
const coldDilute = calculateCobaltEquilibrium(10, 0.5, 1.5);
assert(coldDilute.dominantSpecies === '[Co(H2O)6]2+', 'Cold and dilute cobalt solution is octahedral [Co(H2O)6]2+');
assert(coldDilute.solutionColorVi.includes('Hồng'), 'Cold dilute cobalt is pink');

const hotConc = calculateCobaltEquilibrium(80, 5.0, 0.5);
assert(hotConc.dominantSpecies === '[CoCl4]2-', 'Hot and high chloride cobalt solution is tetrahedral [CoCl4]2-');
assert(hotConc.solutionColorVi.includes('Xanh lam'), 'Hot high chloride cobalt is deep blue');

// 6. Crystal Field Splitting Spin & Magnetic Calculator
// Fe3+ is d5:
// Weak field (e.g. [Fe(H2O)6]3+): High spin t2g3 eg2, 5 unpaired e, paramagnetic
const feWeak = calculateOctahedralSplitting(5, 'YẾU');
assert(feWeak.t2g === 3 && feWeak.eg === 2, 'd5 weak field splits into t2g3 eg2');
assert(feWeak.unpaired === 5, 'd5 weak field has 5 unpaired electrons (high spin)');
assert(feWeak.magneticNature === 'THUẬN_TỪ', 'd5 high spin is paramagnetic (thuận từ)');
assert(feWeak.magneticMomentBM > 5.8, 'd5 high spin magnetic moment is ~5.92 BM');

// Fe3+ strong field (e.g. [Fe(CN)6]3-): Low spin t2g5 eg0, 1 unpaired e
const feStrong = calculateOctahedralSplitting(5, 'MẠNH');
assert(feStrong.t2g === 5 && feStrong.eg === 0, 'd5 strong field splits into t2g5 eg0');
assert(feStrong.unpaired === 1, 'd5 strong field has 1 unpaired electron (low spin)');
assert(feStrong.magneticMomentBM < 1.8 && feStrong.magneticMomentBM > 1.7, 'd5 low spin magnetic moment is ~1.73 BM');

// Fe2+ strong field (e.g. [Fe(CN)6]4-): Low spin t2g6 eg0, 0 unpaired e, diamagnetic
const fe2Strong = calculateOctahedralSplitting(6, 'MẠNH');
assert(fe2Strong.t2g === 6 && fe2Strong.eg === 0, 'd6 strong field splits into t2g6 eg0');
assert(fe2Strong.unpaired === 0, 'd6 strong field has 0 unpaired electrons');
assert(fe2Strong.magneticNature === 'NGHỊCH_TỪ', 'd6 strong field is diamagnetic (nghịch từ)');
assert(fe2Strong.magneticMomentBM === 0, 'd6 strong field magnetic moment is exactly 0 BM');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed === 0) {
  console.log(' TEST SUITE 178 COMPLETED IN 100% HARMONY!');
} else {
  console.error(` TEST SUITE 178 FAILED WITH ${failed} DEFECTS!`);
  process.exit(1);
}
console.log('======================================================================');
