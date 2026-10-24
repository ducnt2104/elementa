// tests/test-metallurgy-and-corrosion.mjs
// Test Suite 174: Metallurgy Extraction, Electrochemical Reactivity Series & Corrosion Simulation
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 6: Đại cương kim loại & Ăn mòn) & IUPAC Standards

import {
  ELECTROCHEMICAL_SERIES,
  predictAlphaRuleRedox,
  simulateCorrosionMechanism
} from '../src/domain/metallurgyCorrosionEngine.ts';

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
console.log('   ELEMENTA TEST SUITE 174: METALLURGY, ELECTROCHEMICAL SERIES & CORROSION');
console.log('======================================================================');

// Test 1: Electrochemical Reactivity Series Potentials
assert(ELECTROCHEMICAL_SERIES.length >= 14, 'Electrochemical series has at least 14 couples');
const k = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'K');
const na = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Na');
const al = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Al');
const zn = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Zn');
const fe = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Fe');
const cu = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Cu');
const fe3 = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Fe_III');
const ag = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Ag');
const au = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === 'Au');

assert(k && k.standardPotentialE0Volts === -2.93, 'K+/K standard potential is -2.93V');
assert(na && na.standardPotentialE0Volts === -2.71, 'Na+/Na standard potential is -2.71V');
assert(al && al.standardPotentialE0Volts === -1.66, 'Al3+/Al standard potential is -1.66V');
assert(zn && zn.standardPotentialE0Volts === -0.76, 'Zn2+/Zn standard potential is -0.76V');
assert(fe && fe.standardPotentialE0Volts === -0.44, 'Fe2+/Fe standard potential is -0.44V');
assert(cu && cu.standardPotentialE0Volts === +0.34, 'Cu2+/Cu standard potential is +0.34V');
assert(fe3 && fe3.standardPotentialE0Volts === +0.77, 'Fe3+/Fe2+ standard potential is +0.77V');
assert(ag && ag.standardPotentialE0Volts === +0.80, 'Ag+/Ag standard potential is +0.80V');
assert(au && au.standardPotentialE0Volts === +1.50, 'Au3+/Au standard potential is +1.50V');

// Test 2: Metallurgical Extraction Logic
assert(al.reductionMethodVI === 'DIEN_PHAN_NONG_CHAY', 'Al must be extracted by molten salt electrolysis (Hall-Heroult)');
assert(fe.reductionMethodVI === 'NHIET_LUYEN_HOAC_THUY_LUYEN', 'Fe extracted by blast furnace pyrometallurgy');

// Test 3: Alpha-Rule Redox Spontaneity
// Fe + Cu2+ -> Fe2+ + Cu (Spontaneous)
const fePlusCu2 = predictAlphaRuleRedox({ oxidantCoupleSymbol: 'Cu', reductantCoupleSymbol: 'Fe' });
assert(fePlusCu2.isReactionSpontaneous === true, 'Fe + Cu2+ is spontaneous by alpha rule');
assert(fePlusCu2.standardCellEmfE0Volts === 0.78, `Fe/Cu2+ cell emf is +0.78V (expected 0.78V, got ${fePlusCu2.standardCellEmfE0Volts}V)`);
assert(fePlusCu2.gibbsFreeEnergyDeltaG0Kj < 0, 'Spontaneous reaction has deltaG < 0');

// Cu + Fe2+ -> Non-spontaneous
const cuPlusFe2 = predictAlphaRuleRedox({ oxidantCoupleSymbol: 'Fe', reductantCoupleSymbol: 'Cu' });
assert(cuPlusFe2.isReactionSpontaneous === false, 'Cu + Fe2+ is non-spontaneous');
assert(cuPlusFe2.standardCellEmfE0Volts < 0, 'Cell emf is negative');

// Cu + 2Fe3+ -> Cu2+ + 2Fe2+ (Classic GDPT 2018 test question!)
const cuPlusFe3 = predictAlphaRuleRedox({ oxidantCoupleSymbol: 'Fe_III', reductantCoupleSymbol: 'Cu' });
assert(cuPlusFe3.isReactionSpontaneous === true, 'Cu + 2Fe3+ is spontaneous (Fe3+ oxidizes Cu)');
assert(cuPlusFe3.standardCellEmfE0Volts === 0.43, 'Cu + Fe3+ emf is +0.43V');

// Test 4: Corrosion in Dry Air (Pure Chemical)
const dryAirCorrosion = simulateCorrosionMechanism({
  metalAnodeOrCouple1: 'Fe',
  environmentType: 'DRY_AIR',
  hasDirectElectricalContact: false
});
assert(dryAirCorrosion.corrosionType === 'AN_MON_HOA_HOC', 'Dry air causes chemical corrosion without electric current');
assert(dryAirCorrosion.corrosionRateScore < 20, 'Dry air corrosion rate is low');

// Test 5: Pure Water (Negligible Corrosion)
const pureWaterCorrosion = simulateCorrosionMechanism({
  metalAnodeOrCouple1: 'Fe',
  environmentType: 'PURE_WATER',
  hasDirectElectricalContact: false
});
assert(pureWaterCorrosion.corrosionRateScore <= 5, 'Pure water without electrolyte has negligible corrosion rate');

// Test 6: Electrochemical Corrosion: Fe-Cu Couple in Acid
const feCuAcid = simulateCorrosionMechanism({
  metalAnodeOrCouple1: 'Fe',
  metalCouple2: 'Cu',
  environmentType: 'ACID_DILUTE',
  hasDirectElectricalContact: true
});
assert(feCuAcid.corrosionType === 'AN_MON_DIEN_HOA', 'Fe-Cu in acid triggers electrochemical corrosion');
assert(feCuAcid.anodeMetalVI.includes('Fe'), 'Fe has more negative potential (-0.44V < +0.34V) so Fe is ANODE');
assert(feCuAcid.cathodeReactionVI.includes('H₂'), 'Cathode produces H2 gas on Cu surface');
assert(feCuAcid.corrosionRateScore >= 90, 'Electrochemical corrosion in acid has highest rate score');

// Test 7: Sacrificial Anode Cathodic Protection (Zn-Fe in Seawater)
const znFeShip = simulateCorrosionMechanism({
  metalAnodeOrCouple1: 'Fe',
  metalCouple2: 'Zn',
  environmentType: 'SALINE_SEAWATER',
  hasDirectElectricalContact: true
});
assert(znFeShip.corrosionType === 'AN_MON_DIEN_HOA', 'Zn-Fe triggers electrochemical corrosion');
assert(znFeShip.anodeMetalVI.includes('Zn'), 'Zn has more negative potential (-0.76V < -0.44V) so Zn is sacrificial ANODE');
assert(znFeShip.isSacrificialProtectionActive === true, 'Sacrificial cathodic protection is ACTIVE');
assert(znFeShip.protectedMetalVI.includes('Fe'), 'Iron ship hull is 100% protected from rusting');

// Test 8: Scratched Tin-Plate Iron (Fe-Sn in Seawater)
const feSnScratched = simulateCorrosionMechanism({
  metalAnodeOrCouple1: 'Fe',
  metalCouple2: 'Sn',
  environmentType: 'SALINE_SEAWATER',
  hasDirectElectricalContact: true
});
assert(feSnScratched.anodeMetalVI.includes('Fe'), 'When scratched, Fe is more reactive than Sn (-0.44V < -0.14V) so Fe is ANODE');
assert(feSnScratched.curriculumExamTipVI.includes('SẮT TÂY MẠ THIẾC'), 'Features classic tin-plate iron exam trap');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed > 0) {
  console.log(` FAILURE: ${failed} tests failed!`);
  process.exit(1);
} else {
  console.log(' TEST SUITE 174 COMPLETED IN 100% HARMONY!');
  console.log('======================================================================');
  process.exit(0);
}
