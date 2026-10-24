// test-industrial-synthesis-visualizer.mjs
// Test Suite 75: Industrial Gas Synthesis & Reactor Dynamics Verification
// Conforming to Vietnam GDPT 2018 Chemistry & IUPAC Thermodynamics

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  INDUSTRIAL_PROCESSES,
  IndustrialReactorEngine,
  R_IDEAL_GAS,
  T_REF_KELVIN
} from './src/domain/industrialReactorEngine.ts';

console.log('======================================================================');
console.log('   TEST SUITE 75: INDUSTRIAL GAS SYNTHESIS & REACTOR VISUALIZER');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}`);
    console.error(`         ${err.message}`);
    failCount++;
  }
}

// ============================================================================
// 1. DOMAIN SPECIFICATION & CURRICULUM PRESETS INTEGRITY
// ============================================================================
console.log('--- 1. INDUSTRIAL PROCESS DEFINITIONS & GDPT 2018 STANDARDS ---');

it('defines exactly 4 core industrial gas synthesis processes', () => {
  assert.strictEqual(INDUSTRIAL_PROCESSES.length, 4);
  const ids = INDUSTRIAL_PROCESSES.map(p => p.id);
  assert.ok(ids.includes('haber_bosch'));
  assert.ok(ids.includes('contact_so3'));
  assert.ok(ids.includes('steam_methane_reforming'));
  assert.ok(ids.includes('ostwald_oxidation'));
});

it('Haber-Bosch process conforms to GDPT 2018 Grade 11 thermodynamics & kinetics', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  assert.ok(hb);
  assert.strictEqual(hb.equation, 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)');
  assert.strictEqual(hb.standardDeltaH_kJ, -92.2);
  assert.strictEqual(hb.isExothermic, true);
  assert.strictEqual(hb.delta_n_gas, -2);
  assert.strictEqual(hb.catalystComposition, 'Fe');
  assert.ok(hb.promoters_vi.includes('Al₂O₃') && hb.promoters_vi.includes('K₂O'));
  assert.deepStrictEqual(hb.optimalTempRangeC, [400, 450]);
  assert.deepStrictEqual(hb.optimalPressureRangeAtm, [150, 200]);
  assert.ok(hb.activationEnergyUncat_kJ > hb.activationEnergyCat_kJ);
});

it('Contact process (SO3 oxidation) conforms to GDPT 2018 Grade 10/11 standards', () => {
  const contact = INDUSTRIAL_PROCESSES.find(p => p.id === 'contact_so3');
  assert.ok(contact);
  assert.strictEqual(contact.equation, '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)');
  assert.strictEqual(contact.standardDeltaH_kJ, -198.0);
  assert.strictEqual(contact.isExothermic, true);
  assert.strictEqual(contact.delta_n_gas, -1);
  assert.ok(contact.catalystComposition.includes('V₂O₅'));
  assert.deepStrictEqual(contact.optimalTempRangeC, [440, 460]);
  assert.deepStrictEqual(contact.optimalPressureRangeAtm, [1, 2]);
});

it('Steam Methane Reforming process conforms to endothermic syngas synthesis', () => {
  const smr = INDUSTRIAL_PROCESSES.find(p => p.id === 'steam_methane_reforming');
  assert.ok(smr);
  assert.strictEqual(smr.equation, 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)');
  assert.strictEqual(smr.standardDeltaH_kJ, 206.1);
  assert.strictEqual(smr.isExothermic, false);
  assert.strictEqual(smr.delta_n_gas, 2);
  assert.ok(smr.catalystComposition.includes('Ni'));
  assert.deepStrictEqual(smr.optimalTempRangeC, [750, 900]);
});

it('Ostwald oxidation process conforms to fast catalytic wire gauze kinetics', () => {
  const ostwald = INDUSTRIAL_PROCESSES.find(p => p.id === 'ostwald_oxidation');
  assert.ok(ostwald);
  assert.strictEqual(ostwald.equation, '4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)');
  assert.strictEqual(ostwald.standardDeltaH_kJ, -905.2);
  assert.strictEqual(ostwald.isExothermic, true);
  assert.ok(ostwald.catalystComposition.includes('Pt'));
  assert.deepStrictEqual(ostwald.optimalTempRangeC, [850, 920]);
});

// ============================================================================
// 2. THERMODYNAMIC & VAN 'T HOFF EQUILIBRIUM CONSTANT
// ============================================================================
console.log('\n--- 2. THERMODYNAMICS & VAN \'T HOFF CALCULATIONS ---');

it('calculates Kp using Van \'t Hoff equation correctly at 298.15 K', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const kp298 = IndustrialReactorEngine.calculateKpAtTemperature(
    hb.standardKp298,
    hb.standardDeltaH_kJ,
    T_REF_KELVIN
  );
  assert.strictEqual(Math.round(kp298), Math.round(hb.standardKp298));
});

it('exothermic reactions show decreasing Kp with increasing temperature (Le Chatelier)', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const kpLowT = IndustrialReactorEngine.calculateKpAtTemperature(
    hb.standardKp298,
    hb.standardDeltaH_kJ,
    473.15 // 200 °C
  );
  const kpHighT = IndustrialReactorEngine.calculateKpAtTemperature(
    hb.standardKp298,
    hb.standardDeltaH_kJ,
    723.15 // 450 °C
  );
  assert.ok(kpLowT > kpHighT, `Expected Kp(200C) > Kp(450C), got ${kpLowT} vs ${kpHighT}`);
});

it('endothermic reactions show increasing Kp with increasing temperature', () => {
  const smr = INDUSTRIAL_PROCESSES.find(p => p.id === 'steam_methane_reforming');
  const kpLowT = IndustrialReactorEngine.calculateKpAtTemperature(
    smr.standardKp298,
    smr.standardDeltaH_kJ,
    500
  );
  const kpHighT = IndustrialReactorEngine.calculateKpAtTemperature(
    smr.standardKp298,
    smr.standardDeltaH_kJ,
    1100
  );
  assert.ok(kpHighT > kpLowT, `Expected Kp(1100K) > Kp(500K), got ${kpHighT} vs ${kpLowT}`);
});

it('throws error for invalid temperature (T <= 0 K)', () => {
  assert.throws(() => {
    IndustrialReactorEngine.calculateKpAtTemperature(100, -92, 0);
  }, /Kelvin phải lớn hơn 0 K/);
});

// ============================================================================
// 3. ARRHENIUS REACTION KINETICS & CATALYST EFFECT
// ============================================================================
console.log('\n--- 3. ARRHENIUS REACTION KINETICS & CATALYST IMPACT ---');

it('catalyst dramatically accelerates reaction rate index', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const tempK = 723.15; // 450 °C
  const rateCat = IndustrialReactorEngine.calculateReactionRateIndex(hb, tempK, true);
  const rateUncat = IndustrialReactorEngine.calculateReactionRateIndex(hb, tempK, false);
  assert.ok(rateCat > rateUncat * 5, `Expected rateCat > 5 * rateUncat, got ${rateCat} vs ${rateUncat}`);
});

it('reaction rate index scales positively with temperature', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const rateCold = IndustrialReactorEngine.calculateReactionRateIndex(hb, 473.15, true); // 200 °C
  const rateHot = IndustrialReactorEngine.calculateReactionRateIndex(hb, 723.15, true);  // 450 °C
  assert.ok(rateHot > rateCold, `Expected rateHot > rateCold, got ${rateHot} vs ${rateCold}`);
});

it('clamps reaction rate index within [0.1, 100.0]', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const rate1 = IndustrialReactorEngine.calculateReactionRateIndex(hb, 100, false);
  const rate2 = IndustrialReactorEngine.calculateReactionRateIndex(hb, 1500, true);
  assert.ok(rate1 >= 0.1 && rate1 <= 100);
  assert.ok(rate2 >= 0.1 && rate2 <= 100);
});

// ============================================================================
// 4. CONVERSION, PRESSURE EFFECTS & RECYCLE STREAM
// ============================================================================
console.log('\n--- 4. CONVERSION, PRESSURE EFFECTS & RECYCLE LOOPS ---');

it('Haber-Bosch single-pass conversion at 450°C and 200 atm is realistic (~15-22%)', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const conv = IndustrialReactorEngine.calculateSinglePassConversion(hb, 723.15, 200, true);
  const pct = conv * 100;
  assert.ok(pct >= 10 && pct <= 30, `Expected single-pass conversion in 10-30%, got ${pct}%`);
});

it('increasing pressure increases single-pass conversion for Haber-Bosch (Delta n = -2)', () => {
  const hb = INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch');
  const convLowP = IndustrialReactorEngine.calculateSinglePassConversion(hb, 723.15, 20, true);
  const convHighP = IndustrialReactorEngine.calculateSinglePassConversion(hb, 723.15, 200, true);
  assert.ok(convHighP > convLowP, `Expected convHighP > convLowP, got ${convHighP} vs ${convLowP}`);
});

it('gas recycle loop elevates overall conversion substantially (single-pass 18% -> >50% at 85% recycle, and >85% at 98% recycle)', () => {
  const singlePass = 0.18; // 18% single pass
  const overall85 = IndustrialReactorEngine.calculateOverallConversion(
    singlePass,
    0.85,
    0.95
  );
  assert.ok(overall85 > 0.50, `Expected overall conversion > 50% at 85% recycle, got ${overall85 * 100}%`);

  const overall98 = IndustrialReactorEngine.calculateOverallConversion(
    singlePass,
    0.98,
    0.99
  );
  assert.ok(overall98 > 0.85, `Expected overall conversion > 85% at 98% recycle, got ${overall98 * 100}%`);
});

it('zero recycle ratio leaves overall conversion equal to single-pass conversion', () => {
  const singlePass = 0.18;
  const overall = IndustrialReactorEngine.calculateOverallConversion(singlePass, 0, 0.95);
  assert.strictEqual(Math.round(overall * 1000) / 1000, singlePass);
});

// ============================================================================
// 5. COMPREHENSIVE SIMULATOR, SAFETY WARNINGS & ECONOMIC SCORE
// ============================================================================
console.log('\n--- 5. FULL REACTOR SIMULATOR & ECONOMIC / SAFETY AUDIT ---');

it('simulates Haber-Bosch at optimal industrial standard conditions', () => {
  const result = IndustrialReactorEngine.simulate({
    processId: 'haber_bosch',
    temperatureCelsius: 450,
    pressureAtm: 200,
    hasCatalyst: true,
    recycleRatio: 0.85,
    coolingEfficiency: 0.95
  });

  assert.strictEqual(result.process.id, 'haber_bosch');
  assert.strictEqual(result.temperatureKelvin, 723.15);
  assert.strictEqual(result.pressureAtm, 200);
  assert.ok(result.singlePassConversionPct >= 10);
  assert.ok(result.overallConversionPct > result.singlePassConversionPct);
  assert.ok(result.economicEfficiencyScore > 40);
  assert.ok(result.compromiseAssessmentVI.includes('TRẠNG THÁI TỐI ƯU CÔNG NGHIỆP'));
  assert.strictEqual(result.safetyWarning, undefined);
});

it('triggers safety warning on extreme overpressure (P > 240 atm)', () => {
  const result = IndustrialReactorEngine.simulate({
    processId: 'haber_bosch',
    temperatureCelsius: 450,
    pressureAtm: 250,
    hasCatalyst: true,
    recycleRatio: 0.85,
    coolingEfficiency: 0.95
  });
  assert.ok(result.safetyWarning);
  assert.ok(result.safetyWarning.includes('CẢNH BÁO QUÁ ÁP'));
});

it('triggers kinetic stagnation warning when operating without catalyst', () => {
  const result = IndustrialReactorEngine.simulate({
    processId: 'haber_bosch',
    temperatureCelsius: 200,
    pressureAtm: 100,
    hasCatalyst: false,
    recycleRatio: 0.85,
    coolingEfficiency: 0.95
  });
  assert.ok(result.safetyWarning);
  assert.ok(result.safetyWarning.includes('BẾ TẮC ĐỘNG HỌC'));
});

// ============================================================================
// 6. GAMEPLAY TACTICAL MODIFIERS
// ============================================================================
console.log('\n--- 6. TACTICAL GAMEPLAY EFFECTS ---');

it('awards Pressure Surge tactical bonus under high pressure (P >= 180 atm)', () => {
  const result = IndustrialReactorEngine.simulate({
    processId: 'haber_bosch',
    temperatureCelsius: 450,
    pressureAtm: 190,
    hasCatalyst: true,
    recycleRatio: 0.5,
    coolingEfficiency: 0.95
  });
  assert.strictEqual(result.tacticalGameplayBonus.tacticalTag, 'PRESSURE_SURGE');
  assert.ok(result.tacticalGameplayBonus.powerMultiplier >= 1.3);
});

it('awards Catalytic Fury bonus when catalyst produces high reaction rate', () => {
  const result = IndustrialReactorEngine.simulate({
    processId: 'contact_so3',
    temperatureCelsius: 450,
    pressureAtm: 2,
    hasCatalyst: true,
    recycleRatio: 0.5,
    coolingEfficiency: 0.95
  });
  assert.strictEqual(result.tacticalGameplayBonus.tacticalTag, 'CATALYTIC_FURY');
  assert.ok(result.tacticalGameplayBonus.manaRefundPct >= 20);
});

// ============================================================================
// 7. COMPONENT SOURCE CODE INTEGRATION AUDIT
// ============================================================================
console.log('\n--- 7. UI VISUALIZER & APP INTEGRATION INTEGRITY ---');

it('IndustrialSynthesisVisualizer.tsx exists and contains essential schematic SVG elements', () => {
  const compPath = path.resolve('src/components/visualizations/IndustrialSynthesisVisualizer.tsx');
  assert.ok(fs.existsSync(compPath));
  const code = fs.readFileSync(compPath, 'utf8');
  assert.ok(code.includes('industrial-synthesis-visualizer'));
  assert.ok(code.includes('Tháp Chịu Áp'));
  assert.ok(code.includes('Bộ Trao Đổi Nhiệt'));
  assert.ok(code.includes('Máy Nén Tuần Hoàn'));
  assert.ok(code.includes('Ngưng Tụ / Tách'));
  assert.ok(code.includes('SIMULATION'));
  assert.ok(code.includes('PEDAGOGY'));
  assert.ok(code.includes('TACTICAL'));
});

it('PeriodicCodexTab.tsx contains Industrial Reactor tab and component import', () => {
  const tabPath = path.resolve('src/components/PeriodicCodexTab.tsx');
  assert.ok(fs.existsSync(tabPath));
  const code = fs.readFileSync(tabPath, 'utf8');
  assert.ok(code.includes('IndustrialSynthesisVisualizer'));
  assert.ok(code.includes('INDUSTRIAL_REACTOR'));
  assert.ok(code.includes('Lò Khí Công Nghiệp (Haber-Bosch)'));
});

it('CardDetailModal.tsx contains Industrial Reactor detection and modal launcher', () => {
  const modalPath = path.resolve('src/components/cards/CardDetailModal.tsx');
  assert.ok(fs.existsSync(modalPath));
  const code = fs.readFileSync(modalPath, 'utf8');
  assert.ok(code.includes('IndustrialSynthesisVisualizer'));
  assert.ok(code.includes('matchingIndustrial'));
  assert.ok(code.includes('showIndustrialModal'));
  assert.ok(code.includes('Haber-Bosch'));
});

it('soundEngine.ts includes procedural reactor sound synthesis methods', () => {
  const audioPath = path.resolve('src/audio/soundEngine.ts');
  assert.ok(fs.existsSync(audioPath));
  const code = fs.readFileSync(audioPath, 'utf8');
  assert.ok(code.includes('playReactorPressureVent'));
  assert.ok(code.includes('playCatalyticTurbineHum'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${passCount + failCount} TESTS PASSED`);
if (failCount > 0) {
  console.error(` ❌ ${failCount} TESTS FAILED`);
  process.exit(1);
} else {
  console.log(' 100% SUCCESS — INDUSTRIAL SYNTHESIS REACTOR VALIDATED!');
  console.log('======================================================================\n');
}
