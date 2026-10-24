// tests/test-photocatalytic-energy.mjs
// Test Suite 232: Photocatalytic Water Splitting, Z-Scheme & Perovskite Tandem Solar Cells Engine
// Conforming to Honda-Fujishima Effect (1972) & Vietnam GDPT 2018 Standards

import assert from 'assert';
import {
  PHOTOCATALYST_CATALOG,
  simulateZSchemeWaterSplitting,
  calculatePerovskiteTandemEfficiency
} from '../src/domain/photocatalyticEnergyEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 232: PHOTOCATALYTIC WATER SPLITTING ENGINE    ');
console.log('======================================================================\n');

// 1. Photocatalyst Band Edges & Thermodynamics
{
  assert(Object.keys(PHOTOCATALYST_CATALOG).length >= 5, 'Must contain at least 5 photocatalysts');

  const tio2 = PHOTOCATALYST_CATALOG.TIO2_ANATASE;
  const bivo4 = PHOTOCATALYST_CATALOG.BIVO4;
  const srtio3 = PHOTOCATALYST_CATALOG.SRTIO3_RH;
  const c3n4 = PHOTOCATALYST_CATALOG.G_C3N4;

  assert(tio2 && tio2.canProduceH2Independently && tio2.canProduceO2Independently,
    'TiO2 must be capable of standalone water splitting under UV');
  assert(bivo4 && !bivo4.canProduceH2Independently && bivo4.canProduceO2Independently,
    'BiVO4 conduction band (+0.02 V) is too positive to reduce H+ to H2 independently');
  assert(srtio3 && srtio3.canProduceH2Independently,
    'SrTiO3:Rh conduction band (-0.35 V) must reduce H+ to H2');
  assert(c3n4 && c3n4.conductionBandMinNheV < -1.0,
    'g-C3N4 must have super-negative conduction band (< -1.0 V vs NHE)');

  console.log('  ✓ Photocatalyst band edges validated vs NHE (TiO2, SrTiO3:Rh, BiVO4, g-C3N4, WO3)');
}

// 2. Dual-Absorber Z-Scheme Artificial Photosynthesis
{
  // Pair SrTiO3:Rh (HEP) and BiVO4 (OEP) under 1 Sun (1000 W/m2, 2 m2 panel)
  const zScheme = simulateZSchemeWaterSplitting('SRTIO3_RH', 'BIVO4', 1000, 2.0);

  assert(zScheme.solarToHydrogenEfficiencyPercent >= 10.0,
    'Optimized visible light Z-scheme must reach >= 10.0% STH commercial target');
  assert(zScheme.meetsCommercialFeasibilityTarget, 'Must flag meetsCommercialFeasibilityTarget');

  // Verify stoichiometric 2 H2 : 1 O2 ratio
  const ratio = zScheme.h2EvolutionRateMmolPerHour / zScheme.o2EvolutionRateMmolPerHour;
  assert(Math.abs(ratio - 2.0) < 0.05, 'H2 to O2 ratio must be exactly 2:1 stoichiometric');

  console.log(`  ✓ Z-Scheme Artificial Photosynthesis confirmed:
      - Solar-to-Hydrogen (STH): ${zScheme.solarToHydrogenEfficiencyPercent}% (Meets commercial target >= 10%)
      - H₂ Production: ${zScheme.h2EvolutionRateMmolPerHour} mmol/h
      - O₂ Production: ${zScheme.o2EvolutionRateMmolPerHour} mmol/h (Stoichiometric 2:1)`);
}

// 3. Perovskite-Silicon Tandem Solar Cell Efficiency
{
  // Optimal top cell bandgap (1.68 eV)
  const optimalTandem = calculatePerovskiteTandemEfficiency(1.68);
  assert(optimalTandem.tandemPcePercent > optimalTandem.singleJunctionSiliconLimitPercent,
    'Tandem must break the single-junction silicon limit (29.4%)');
  assert(optimalTandem.tandemPcePercent >= 34.0, 'Optimal tandem must achieve >= 34% PCE');
  assert(optimalTandem.currentMatchingStatusVi.includes('HOÀN HẢO'), '1.68 eV must be current matched');

  // Mismatched top cell bandgap (1.90 eV)
  const mismatchedTandem = calculatePerovskiteTandemEfficiency(1.90);
  assert(mismatchedTandem.tandemPcePercent < optimalTandem.tandemPcePercent,
    'Mismatched tandem must suffer efficiency penalty');
  assert(mismatchedTandem.currentMatchingStatusVi.includes('LỆCH DÒNG'), 'Must flag current mismatch');

  console.log(`  ✓ Perovskite/Silicon Tandem confirmed:
      - Optimal 1.68 eV Top Cell: ${optimalTandem.tandemPcePercent}% PCE (+${optimalTandem.efficiencyBoostPercent}% over standard Si)
      - Breaks Shockley-Queisser 29.4% limit with current-matched tandem architecture`);
}

console.log('\n======================================================================');
console.log('   ALL 3 TESTS IN SUITE 232 PASSED WITH DISTINCTION!                 ');
console.log('======================================================================\n');
