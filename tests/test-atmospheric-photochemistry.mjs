// tests/test-atmospheric-photochemistry.mjs
// Test Suite 224: Atmospheric Photochemistry, Stratospheric Ozone, Smog & Acid Rain / FGD Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & QCVN 19:2009/BTNMT Standards

import assert from 'assert';
import {
  CHAPMAN_CYCLE_STEPS,
  CFC_CATALYTIC_MECHANISM,
  simulateStratosphericOzone,
  SMOG_REACTION_NETWORK,
  generatePhotochemicalSmogDiurnalProfile,
  ACID_RAIN_REACTIONS,
  evaluateAcidRainImpact,
  simulateFlueGasDesulfurization
} from '../src/domain/atmosphericPhotochemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 224: ATMOSPHERIC PHOTOCHEMISTRY ENGINE       ');
console.log('======================================================================\n');

// 1. Chapman Stratospheric Ozone Cycle
{
  assert.strictEqual(CHAPMAN_CYCLE_STEPS.length, 4, 'Chapman cycle must comprise 4 canonical steps');

  const o2Photolysis = CHAPMAN_CYCLE_STEPS.find(s => s.id === 'O2_PHOTOLYSIS');
  const o3Formation = CHAPMAN_CYCLE_STEPS.find(s => s.id === 'O3_FORMATION');
  const uvbShield = CHAPMAN_CYCLE_STEPS.find(s => s.id === 'O3_UVB_ABSORPTION');
  const recombination = CHAPMAN_CYCLE_STEPS.find(s => s.id === 'O3_RECOMBINATION');

  assert(o2Photolysis && o2Photolysis.chemicalEquationVi.includes('O₂ + hν'), 'Step 1 must be O2 photolysis');
  assert(o3Formation && o3Formation.chemicalEquationVi.includes('+ M'), 'Step 2 must cite three-body chaperone M');
  assert(uvbShield && uvbShield.wavelengthConditionVi.includes('UV-B'), 'Step 3 must protect against UV-B');
  assert(recombination && recombination.enthalpyChangeKj < 0, 'Step 4 recombination must be exothermic');

  console.log('  ✓ Chapman Stratospheric Ozone cycle verified (O2 photolysis -> Three-body O3 synthesis -> Hartley UV-B absorption -> O3 recombination)');
}

// 2. CFC Catalytic Ozone Depletion & Polar Vortex Ice Clouds
{
  assert(CFC_CATALYTIC_MECHANISM.turnoverRatio >= 100000, 'One Cl radical must destroy at least 100,000 O3 molecules');
  assert(CFC_CATALYTIC_MECHANISM.chlorineReservoirs.some(r => r.includes('HCl')), 'Must include HCl reservoir');
  assert(CFC_CATALYTIC_MECHANISM.chlorineReservoirs.some(r => r.includes('ClONO₂')), 'Must include ClONO2 reservoir');

  // Normal pristine stratosphere
  const pristine = simulateStratosphericOzone(100, 50, false);
  assert(pristine.totalOzoneDu >= 270 && pristine.totalOzoneDu <= 320, 'Normal stratosphere must be ~300 DU');
  assert(!pristine.isOzoneHole, 'Pristine atmosphere must not be an ozone hole');
  assert.strictEqual(pristine.dnaDamageRisk, 'LOW', 'Pristine atmosphere has low DNA damage risk');

  // Antarctic vortex with high CFC
  const antarcticHole = simulateStratosphericOzone(100, 350, true);
  assert(antarcticHole.totalOzoneDu < 220, 'Antarctic polar vortex with CFCs must produce Ozone Hole (< 220 DU)');
  assert(antarcticHole.isOzoneHole, 'isOzoneHole flag must be true');
  assert(antarcticHole.uvbTransmittancePercent > pristine.uvbTransmittancePercent * 2, 'UV-B penetration must spike under ozone hole');
  assert(antarcticHole.dnaDamageRisk === 'HIGH' || antarcticHole.dnaDamageRisk === 'EXTREME', 'DNA damage risk must be HIGH or EXTREME');

  console.log(`  ✓ CFC Catalytic destruction validated: ${pristine.totalOzoneDu} DU (normal) vs ${antarcticHole.totalOzoneDu} DU (Antarctic Ozone Hole, UV-B irradiance ${antarcticHole.uvbIrradianceWm2} W/m²)`);
}

// 3. Photochemical Smog Diurnal Profile (0h - 24h)
{
  assert.strictEqual(SMOG_REACTION_NETWORK.length, 5, 'Smog reaction network must define 5 stages');
  const profile = generatePhotochemicalSmogDiurnalProfile(1.0, 1.0);
  assert.strictEqual(profile.length, 25, 'Profile must span 25 hourly points (0 to 24)');

  // Morning rush hour check (07:00 - 08:00)
  const morningData = profile[8];
  // Afternoon peak check (14:00 - 15:00)
  const afternoonData = profile[14];
  // Night check (22:00)
  const nightData = profile[22];

  assert(morningData.noConcentrationPpb > afternoonData.noConcentrationPpb, 'Morning rush hour must have higher primary NO than afternoon');
  assert(afternoonData.o3ConcentrationPpb > morningData.o3ConcentrationPpb * 2, 'Afternoon must have massive toxic O3 accumulation (> 2x morning)');
  assert(afternoonData.panConcentrationPpb > 10, 'Afternoon PAN must peak significantly');
  assert(afternoonData.aqi > morningData.aqi, 'AQI must worsen in the afternoon during smog peak');
  assert(nightData.sunlightIntensityPercent === 0, 'Night solar intensity must be 0');

  console.log(`  ✓ Photochemical smog diurnal dynamics confirmed: 08:00 NO = ${morningData.noConcentrationPpb} ppb -> 14:00 O₃ = ${afternoonData.o3ConcentrationPpb} ppb, PAN = ${afternoonData.panConcentrationPpb} ppb (AQI ${afternoonData.aqi} ${afternoonData.aqiCategory})`);
}

// 4. Acid Rain Kinetics & Limestone Weathering
{
  assert.strictEqual(ACID_RAIN_REACTIONS.length, 5, 'Must contain 5 acid rain reaction pathways');

  const cleanRain = evaluateAcidRainImpact(5.6, 1800);
  const severeAcidRain = evaluateAcidRainImpact(3.8, 1800);

  assert.strictEqual(cleanRain.acidClassificationVi, 'Mưa tự nhiên sạch', 'pH 5.6 must be clean rain');
  assert.strictEqual(severeAcidRain.acidClassificationVi, 'Mưa axit nghiêm trọng', 'pH 3.8 must be severe acid rain');
  assert(severeAcidRain.limestoneCorrosionRateMicronsPerYear > cleanRain.limestoneCorrosionRateMicronsPerYear * 3,
    'Severe acid rain must corrode CaCO3 at least 3x faster than natural rain');

  console.log(`  ✓ Acid rain weathering validated: Clean rain (pH 5.6) erosion = ${cleanRain.limestoneCorrosionRateMicronsPerYear} µm/yr vs Severe acid rain (pH 3.8) erosion = ${severeAcidRain.limestoneCorrosionRateMicronsPerYear} µm/yr`);
}

// 5. Industrial Flue Gas Desulfurization (FGD) Wet Limestone Scrubber
{
  // Optimal FGD operation (pH 5.8, nominal flow 500 L/min)
  const optimalFgd = simulateFlueGasDesulfurization(1800, 500, 5.8);
  assert(optimalFgd.so2RemovalEfficiencyPercent >= 95.0, 'Optimal FGD scrubber must achieve >= 95% SO2 removal');
  assert(optimalFgd.compliesWithQCVN19, 'Optimal FGD scrubber must comply with QCVN 19:2009/BTNMT (< 500 mg/Nm3)');
  assert(optimalFgd.syntheticGypsumProductionKgPerHour > 50, 'Must produce substantial synthetic gypsum byproduct');

  // Degraded FGD operation (acid saturated pH 4.2)
  const acidicFgd = simulateFlueGasDesulfurization(1800, 500, 4.2);
  assert(acidicFgd.so2RemovalEfficiencyPercent < 75.0, 'Acid saturated scrubber (pH 4.2) must suffer steep efficiency loss');
  assert(!acidicFgd.compliesWithQCVN19, 'Degraded FGD must violate QCVN 19:2009/BTNMT');

  console.log(`  ✓ Industrial Flue Gas Desulfurization (FGD) confirmed: Optimal removal = ${optimalFgd.so2RemovalEfficiencyPercent}% (${optimalFgd.so2OutletMgNm3} mg/Nm³, QCVN 19 compliant, ${optimalFgd.syntheticGypsumProductionKgPerHour} kg gypsum/h)`);
}

console.log('\n======================================================================');
console.log('   ALL 5 TESTS IN SUITE 224 PASSED WITH DISTINCTION!                 ');
console.log('======================================================================\n');
