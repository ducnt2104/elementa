// tests/test-direct-lithium-extraction.mjs
// Test Suite 266: Direct Lithium Extraction (DLE) & Geothermal Brine Sorbent Kinetics Audit

import assert from 'node:assert';
import {
  KNOWN_BRINE_RESERVOIRS,
  ION_STERIC_PROFILES,
  simulateDlePerformance
} from '../src/domain/directLithiumExtractionEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 266: DIRECT LITHIUM EXTRACTION (DLE) AUDIT');
console.log('======================================================================\n');

// 1. Reservoir Compositions & Steric Exclusion Profiles
console.log('1. Checking Brine Compositions & Sieve Steric Mechanisms...');
assert(KNOWN_BRINE_RESERVOIRS.length >= 4, 'Must catalog at least 4 global brine reservoirs');
const saltonSea = KNOWN_BRINE_RESERVOIRS.find(b => b.name.includes('Salton Sea'));
const atacama = KNOWN_BRINE_RESERVOIRS.find(b => b.name.includes('Atacama'));

assert(saltonSea && atacama, 'Salton Sea and Atacama brines must be defined');
assert(saltonSea.temperatureC > 100, 'Salton Sea must be high-temperature geothermal (> 100°C)');
assert(saltonSea.liPpm >= 200, 'Salton Sea must contain rich lithium (>= 200 ppm)');

// Steric profiles
assert(ION_STERIC_PROFILES.length >= 4, 'Must profile Li+, Na+, Mg2+, Ca2+, K+');
const li = ION_STERIC_PROFILES.find(p => p.symbol === 'Li⁺');
const na = ION_STERIC_PROFILES.find(p => p.symbol === 'Na⁺');
const mg = ION_STERIC_PROFILES.find(p => p.symbol === 'Mg²⁺');

assert.strictEqual(li.sieveStericFit, 'PERFECT_FIT', 'Li+ must be the only perfect steric fit (0.76 Å)');
assert.strictEqual(na.sieveStericFit, 'EXCLUDED_TOO_LARGE', 'Na+ must be excluded by size (1.02 Å)');
assert.strictEqual(mg.sieveStericFit, 'EXCLUDED_HIGH_HYDRATION_ENERGY', 'Mg2+ must be excluded by huge hydration enthalpy (-1921 kJ/mol)');

console.log(`  - Salton Sea Geothermal: ${saltonSea.liPpm} ppm Li at ${saltonSea.temperatureC}°C, Mg/Li = ${saltonSea.mgToLiMassRatio}`);
console.log(`  - Steric Selectivity: Li⁺ (${li.ionicRadiusAngstrom} Å) Fits, Na⁺ (${na.ionicRadiusAngstrom} Å) Excluded, Mg²⁺ (ΔH_hyd = ${mg.hydrationEnthalpyKjMol} kJ/mol) Hydration Barrier`);
console.log('  ✓ Reservoir data and sub-nanometer ion sieve steric mechanisms verified');

// 2. DLE Kinetics & Comparison against Traditional Evaporation Ponds
console.log('\n2. Testing DLE Process Kinetics & Evaporation Contrast...');
const conditions = {
  brineFlowRateM3h: 500,
  sorbentBedVolumeM3: 80,
  operatingCycleMinutes: 90,
  acidElutionConcentrationM: 0.25,
  elutionTempC: 75,
  heatRecoveryEnabled: true,
  electricityPriceUsdKwh: 0.05,
  hydrochloricAcidPriceUsdTon: 120,
  sodaAshPriceUsdTon: 280
};

const simHmo = simulateDlePerformance('MANGANESE_ION_SIEVE', saltonSea, conditions);
const simLdh = simulateDlePerformance('ALUMINUM_LDH_SORBENT', saltonSea, conditions);

// HMO verification
assert(simHmo.recoveryEfficiencyPct >= 90.0, 'HMO must achieve >= 90% Li recovery');
assert(simHmo.selectivityLiOverMg > 2500, 'HMO must possess extreme Li/Mg selectivity (> 2500)');
assert(simHmo.selectivityLiOverNa > 3500, 'HMO must possess extreme Li/Na selectivity (> 3500)');
assert(simHmo.purityEluatePct > 99.0, 'HMO eluate purity must exceed 99%');

// Al-LDH verification (Water eluted, zero acid)
assert(simLdh.recoveryEfficiencyPct >= 85.0, 'Al-LDH must achieve >= 85% Li recovery');
assert(simLdh.waterConsumptionM3PerTonLce > simHmo.waterConsumptionM3PerTonLce, 'Al-LDH uses water wash instead of acid');
assert(simLdh.operatingCostsBreakdown.reagentsCostPerKgLce < simHmo.operatingCostsBreakdown.reagentsCostPerKgLce, 'Al-LDH eliminates acid purchase cost');

// Traditional evaporation pond contrast
assert(
  simHmo.recoveryEfficiencyPct > simHmo.traditionalEvaporationComparison.evaporationRecoveryPct * 1.8,
  'DLE recovery (> 90%) must be > 1.8x higher than solar evaporation ponds (~45%)'
);
assert(
  simHmo.traditionalEvaporationComparison.dleWaterSavingsM3Year > 1000000,
  'DLE must save > 1 million m³ of fresh water per year by reinjecting brine'
);

console.log(`  - HMO Sieve: Recovery = ${simHmo.recoveryEfficiencyPct}%, Purity = ${simHmo.purityEluatePct}%, Li/Mg Selectivity = ${simHmo.selectivityLiOverMg}:1`);
console.log(`  - Al-LDH Sorbent: Recovery = ${simLdh.recoveryEfficiencyPct}%, Purity = ${simLdh.purityEluatePct}%, Zero-Acid Water Wash`);
console.log(`  - Production Output: ${simHmo.liExtractedKgDay} kg Li/day -> ${simHmo.lceProductionTonsYear} tons LCE/year`);
console.log(`  - Water Stewardship: Saves ${simHmo.traditionalEvaporationComparison.dleWaterSavingsM3Year.toLocaleString()} m³ water/yr vs evaporation ponds`);
console.log('  ✓ DLE kinetics, high recoveries, and environmental water conservation verified');

// 3. Operating Cost Breakdown ($ / kg LCE)
console.log('\n3. Checking Battery-Grade LCE Economics & OPEX...');
assert(
  simHmo.operatingCostsBreakdown.totalOpexPerKgLce > 1.5 && simHmo.operatingCostsBreakdown.totalOpexPerKgLce < 4.5,
  `HMO OPEX must fall in $1.5 - $4.5/kg LCE range (got $${simHmo.operatingCostsBreakdown.totalOpexPerKgLce})`
);
assert(
  simLdh.operatingCostsBreakdown.totalOpexPerKgLce > 1.2 && simLdh.operatingCostsBreakdown.totalOpexPerKgLce < 4.0,
  `Al-LDH OPEX must fall in $1.2 - $4.0/kg LCE range (got $${simLdh.operatingCostsBreakdown.totalOpexPerKgLce})`
);

console.log(`  - HMO Total OPEX: $${simHmo.operatingCostsBreakdown.totalOpexPerKgLce}/kg LCE ($${simHmo.operatingCostsBreakdown.totalOpexPerTonLce}/ton LCE)`);
console.log(`  - Al-LDH Total OPEX: $${simLdh.operatingCostsBreakdown.totalOpexPerKgLce}/kg LCE ($${simLdh.operatingCostsBreakdown.totalOpexPerTonLce}/ton LCE)`);
console.log('  ✓ Low OPEX cost profile validated');

console.log('\n======================================================================');
console.log('   ALL 3 AUDIT CHECKS IN SUITE 266 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
