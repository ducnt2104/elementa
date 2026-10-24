// test-vsepr-lone-pair-repulsion.mjs
// Test Suite 77: Interactive 3D VSEPR Lone Pair Repulsion & Gillespie-Nyholm Electron Domain Deformation
// Calibrated strictly to Vietnam GDPT 2018 Chemistry Grade 10 & IUPAC Physical Chemistry

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  VseprEngine,
  VSEPR_BENCHMARK_PRESETS,
  VSEPR_GEOMETRY_CATALOG
} from './src/domain/vseprEngine.ts';

console.log('======================================================================');
console.log('   TEST SUITE 77: 3D VSEPR & GILLESPIE-NYHOLM LONE PAIR REPULSION');
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
    console.error(`         ${err.stack || err.message}`);
    failCount++;
  }
}

// ============================================================================
// 1. CURRICULUM PRESETS INTEGRITY (GDPT 2018 STANDARDS)
// ============================================================================
console.log('--- 1. CURRICULUM PRESETS & IUPAC NOMENCLATURE ---');

it('defines all 11 core curriculum benchmark molecules', () => {
  assert.ok(VSEPR_BENCHMARK_PRESETS.length >= 11);
  const ids = VSEPR_BENCHMARK_PRESETS.map(p => p.id);
  assert.ok(ids.includes('vsepr_h2o'));
  assert.ok(ids.includes('vsepr_nh3'));
  assert.ok(ids.includes('vsepr_ch4'));
  assert.ok(ids.includes('vsepr_bf3'));
  assert.ok(ids.includes('vsepr_so2'));
  assert.ok(ids.includes('vsepr_co2'));
  assert.ok(ids.includes('vsepr_pcl5'));
  assert.ok(ids.includes('vsepr_sf4'));
  assert.ok(ids.includes('vsepr_clf3'));
  assert.ok(ids.includes('vsepr_sf6'));
  assert.ok(ids.includes('vsepr_xef4'));
});

it('correctly maps molecular formulas and AXE notation for water, ammonia and methane', () => {
  const h2o = VseprEngine.getPreset('H2O');
  assert.ok(h2o);
  assert.strictEqual(h2o.formulaAXE, 'AX2E2');
  assert.strictEqual(h2o.bondingPairs, 2);
  assert.strictEqual(h2o.lonePairs, 2);
  assert.strictEqual(h2o.defaultAngleDeg, 104.5);

  const nh3 = VseprEngine.getPreset('NH3');
  assert.ok(nh3);
  assert.strictEqual(nh3.formulaAXE, 'AX3E1');
  assert.strictEqual(nh3.bondingPairs, 3);
  assert.strictEqual(nh3.lonePairs, 1);
  assert.strictEqual(nh3.defaultAngleDeg, 107.0);

  const ch4 = VseprEngine.getPreset('CH4');
  assert.ok(ch4);
  assert.strictEqual(ch4.formulaAXE, 'AX4');
  assert.strictEqual(ch4.bondingPairs, 4);
  assert.strictEqual(ch4.lonePairs, 0);
  assert.strictEqual(ch4.defaultAngleDeg, 109.5);
});

// ============================================================================
// 2. VSEPR GEOMETRY CATALOG & STERIC NUMBER RESOLUTION
// ============================================================================
console.log('--- 2. VSEPR GEOMETRY CATALOG & STERIC NUMBERS ---');

it('catalog covers all 13 canonical VSEPR geometries from SN = 2 to SN = 6', () => {
  const keys = Object.keys(VSEPR_GEOMETRY_CATALOG);
  assert.strictEqual(keys.length, 13);
  assert.ok(keys.includes('AX2'));
  assert.ok(keys.includes('AX3'));
  assert.ok(keys.includes('AX2E1'));
  assert.ok(keys.includes('AX4'));
  assert.ok(keys.includes('AX3E1'));
  assert.ok(keys.includes('AX2E2'));
  assert.ok(keys.includes('AX5'));
  assert.ok(keys.includes('AX4E1'));
  assert.ok(keys.includes('AX3E2'));
  assert.ok(keys.includes('AX2E3'));
  assert.ok(keys.includes('AX6'));
  assert.ok(keys.includes('AX5E1'));
  assert.ok(keys.includes('AX4E2'));
});

it('verifies correct steric numbers, hybridization and ideal bond angles', () => {
  // SN = 2
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2.stericNumber, 2);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2.hybridization, 'sp');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2.idealBondAngleDeg, 180);

  // SN = 3
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3.stericNumber, 3);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3.hybridization, 'sp²');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3.idealBondAngleDeg, 120);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E1.stericNumber, 3);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E1.hybridization, 'sp²');

  // SN = 4
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4.stericNumber, 4);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4.hybridization, 'sp³');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4.idealBondAngleDeg, 109.5);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3E1.hybridization, 'sp³');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E2.hybridization, 'sp³');

  // SN = 5
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX5.stericNumber, 5);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX5.hybridization, 'sp³d');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4E1.hybridization, 'sp³d');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3E2.hybridization, 'sp³d');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E3.hybridization, 'sp³d');

  // SN = 6
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX6.stericNumber, 6);
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX6.hybridization, 'sp³d²');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX5E1.hybridization, 'sp³d²');
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4E2.hybridization, 'sp³d²');
});

it('resolves AXE formulas deterministically for custom domain counts', () => {
  assert.strictEqual(VseprEngine.getAXEFormula(2, 0), 'AX2');
  assert.strictEqual(VseprEngine.getAXEFormula(3, 0), 'AX3');
  assert.strictEqual(VseprEngine.getAXEFormula(2, 1), 'AX2E1');
  assert.strictEqual(VseprEngine.getAXEFormula(4, 0), 'AX4');
  assert.strictEqual(VseprEngine.getAXEFormula(3, 1), 'AX3E1');
  assert.strictEqual(VseprEngine.getAXEFormula(2, 2), 'AX2E2');
  assert.strictEqual(VseprEngine.getAXEFormula(5, 0), 'AX5');
  assert.strictEqual(VseprEngine.getAXEFormula(4, 1), 'AX4E1');
  assert.strictEqual(VseprEngine.getAXEFormula(3, 2), 'AX3E2');
  assert.strictEqual(VseprEngine.getAXEFormula(2, 3), 'AX2E3');
  assert.strictEqual(VseprEngine.getAXEFormula(6, 0), 'AX6');
  assert.strictEqual(VseprEngine.getAXEFormula(5, 1), 'AX5E1');
  assert.strictEqual(VseprEngine.getAXEFormula(4, 2), 'AX4E2');
});

// ============================================================================
// 3. GILLESPIE-NYHOLM LONE PAIR REPULSION HIERARCHY & ANGLE DEFORMATION
// ============================================================================
console.log('--- 3. GILLESPIE-NYHOLM REPULSION & ANGLE DEFORMATION ---');

it('calculates water (AX2E2) angle deformation across repulsion scales', () => {
  // At 0.0x: unperturbed ideal angle 109.5°
  const zeroRepulsion = VseprEngine.calculateDeformedAngle('AX2E2', 0.0);
  assert.strictEqual(zeroRepulsion.actualAngleDeg, 109.5);
  assert.strictEqual(zeroRepulsion.angleDeviationDeg, 0);

  // At 1.0x: standard physical reality 104.5°
  const stdRepulsion = VseprEngine.calculateDeformedAngle('AX2E2', 1.0);
  assert.strictEqual(stdRepulsion.actualAngleDeg, 104.5);
  assert.strictEqual(stdRepulsion.angleDeviationDeg, 5.0);

  // At 2.0x: doubled repulsion compression to 99.5°
  const maxRepulsion = VseprEngine.calculateDeformedAngle('AX2E2', 2.0);
  assert.strictEqual(maxRepulsion.actualAngleDeg, 99.5);
  assert.strictEqual(maxRepulsion.angleDeviationDeg, 10.0);
});

it('calculates ammonia (AX3E1) compression from 109.5° to 107.0°', () => {
  const std = VseprEngine.calculateDeformedAngle('AX3E1', 1.0);
  assert.strictEqual(std.actualAngleDeg, 107.0);
  assert.strictEqual(std.angleDeviationDeg, 2.5);
});

it('calculates sulfur dioxide (AX2E1) compression from 120.0° to 119.0°', () => {
  const std = VseprEngine.calculateDeformedAngle('AX2E1', 1.0);
  assert.strictEqual(std.actualAngleDeg, 119.0);
  assert.strictEqual(std.angleDeviationDeg, 1.0);
});

it('preserves ideal angle for symmetric molecules with 0 lone pairs', () => {
  const co2 = VseprEngine.calculateDeformedAngle('AX2', 1.5);
  assert.strictEqual(co2.actualAngleDeg, 180.0);
  assert.strictEqual(co2.angleDeviationDeg, 0);

  const ch4 = VseprEngine.calculateDeformedAngle('AX4', 1.5);
  assert.strictEqual(ch4.actualAngleDeg, 109.5);
  assert.strictEqual(ch4.angleDeviationDeg, 0);

  const sf6 = VseprEngine.calculateDeformedAngle('AX6', 1.5);
  assert.strictEqual(sf6.actualAngleDeg, 90.0);
  assert.strictEqual(sf6.angleDeviationDeg, 0);
});

it('preserves linear angle for XeF2 (AX2E3) due to equatorial LP cancellation', () => {
  const xef2 = VseprEngine.calculateDeformedAngle('AX2E3', 1.2);
  assert.strictEqual(xef2.actualAngleDeg, 180.0);
  assert.strictEqual(xef2.angleDeviationDeg, 0);
});

it('confirms Gillespie-Nyholm electrostatic repulsion energy hierarchy: H2O > NH3 > CH4', () => {
  const h2o = VseprEngine.calculateDeformedAngle('AX2E2', 1.0);
  const nh3 = VseprEngine.calculateDeformedAngle('AX3E1', 1.0);
  const ch4 = VseprEngine.calculateDeformedAngle('AX4', 1.0);

  assert.ok(
    h2o.repulsionEnergyIndex > nh3.repulsionEnergyIndex,
    `H2O energy (${h2o.repulsionEnergyIndex}) must exceed NH3 (${nh3.repulsionEnergyIndex})`
  );
  assert.ok(
    nh3.repulsionEnergyIndex > ch4.repulsionEnergyIndex,
    `NH3 energy (${nh3.repulsionEnergyIndex}) must exceed CH4 (${ch4.repulsionEnergyIndex})`
  );
});

// ============================================================================
// 4. 3D DOMAIN COORDINATE GENERATION & PERSPECTIVE PROJECTION
// ============================================================================
console.log('--- 4. 3D COORDINATES & PERSPECTIVE PROJECTION ---');

it('generates exact domain count (BP + LP = Steric Number) for all geometries', () => {
  for (const [key, meta] of Object.entries(VSEPR_GEOMETRY_CATALOG)) {
    const domains = VseprEngine.generateDomainCoordinates3D(key, 1.0);
    assert.strictEqual(
      domains.length,
      meta.stericNumber,
      `Geometry ${key} should produce ${meta.stericNumber} domains`
    );

    const bpCount = domains.filter(d => d.type === 'BONDING').length;
    const lpCount = domains.filter(d => d.type === 'LONE_PAIR').length;
    assert.strictEqual(bpCount, meta.bondingPairs, `BP count mismatch on ${key}`);
    assert.strictEqual(lpCount, meta.lonePairs, `LP count mismatch on ${key}`);
  }
});

it('ensures all 3D generated vectors lie on unit sphere (radius ≈ 1.0)', () => {
  const domains = VseprEngine.generateDomainCoordinates3D('AX2E2', 1.0);
  for (const d of domains) {
    const len = Math.hypot(d.x, d.y, d.z);
    assert.ok(
      Math.abs(len - 1.0) < 0.02,
      `Domain vector length must be ~1.0, got ${len}`
    );
  }
});

it('projects 3D domains onto 2D canvas with valid px, py and depth sorting', () => {
  const rawDomains = VseprEngine.generateDomainCoordinates3D('AX3E1', 1.0);
  const projected = VseprEngine.project3Dto2D(rawDomains, 30, -20, 100);

  assert.strictEqual(projected.length, 4);
  for (const p of projected) {
    assert.ok(!Number.isNaN(p.px), 'px must not be NaN');
    assert.ok(!Number.isNaN(p.py), 'py must not be NaN');
    assert.ok(!Number.isNaN(p.depth), 'depth must not be NaN');
  }

  // Verify depth sorting works properly
  const sorted = [...projected].sort((a, b) => (a.depth || 0) - (b.depth || 0));
  assert.ok(sorted[0].depth <= sorted[sorted.length - 1].depth);
});

// ============================================================================
// 5. MOLECULAR POLARITY & DIPOLE MOMENT CANCELATION (GDPT 2018)
// ============================================================================
console.log('--- 5. MOLECULAR POLARITY & DIPOLE MOMENTS ---');

it('marks asymmetric molecules with lone pairs as polar (μ > 0)', () => {
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E1.isPolar, true); // SO2
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3E1.isPolar, true); // NH3
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E2.isPolar, true); // H2O
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4E1.isPolar, true); // SF4
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3E2.isPolar, true); // ClF3
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX5E1.isPolar, true); // BrF5
});

it('marks symmetric molecules with 0 LP or balanced LP cancellation as nonpolar (μ = 0)', () => {
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2.isPolar, false); // CO2
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX3.isPolar, false); // BF3
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4.isPolar, false); // CH4
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX5.isPolar, false); // PCl5
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX2E3.isPolar, false); // XeF2
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX6.isPolar, false); // SF6
  assert.strictEqual(VSEPR_GEOMETRY_CATALOG.AX4E2.isPolar, false); // XeF4
});

// ============================================================================
// 6. UNIVERSAL APP INTEGRATION VERIFICATION
// ============================================================================
console.log('--- 6. UNIVERSAL APP INTEGRATION VERIFICATION ---');

it('integrates VSEPR 3D Visualizer into PeriodicCodexTab as Section 9', () => {
  const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
  const code = fs.readFileSync(codexPath, 'utf8');
  assert.ok(code.includes("import { VseprVisualizer } from './visualizations/VseprVisualizer'"));
  assert.ok(code.includes("'VSEPR_BONDING'"));
  assert.ok(code.includes('SECTION 9: 3D VSEPR'));
  assert.ok(code.includes('<VseprVisualizer />'));
});

it('integrates VSEPR into CardDetailModal with auto-detector, badges and dedicated modal overlay', () => {
  const cardModalPath = path.resolve('src/components/cards/CardDetailModal.tsx');
  const code = fs.readFileSync(cardModalPath, 'utf8');
  assert.ok(code.includes("import { VseprVisualizer } from '../visualizations/VseprVisualizer'"));
  assert.ok(code.includes('matchingVsepr'));
  assert.ok(code.includes('showVseprModal'));
  assert.ok(code.includes('Hình học VSEPR (Hóa 10)'));
  assert.ok(code.includes('<VseprVisualizer initialPresetId={matchingVsepr.id} />'));
});

it('embeds VseprVisualizer into BondingVisualizerModal when VSEPR tab is active', () => {
  const bondingModalPath = path.resolve('src/components/visualizations/BondingVisualizerModal.tsx');
  const code = fs.readFileSync(bondingModalPath, 'utf8');
  assert.ok(code.includes("import { VseprVisualizer } from './VseprVisualizer'"));
  assert.ok(code.includes("activeTab === 'VSEPR'"));
  assert.ok(code.includes('<VseprVisualizer initialPresetId={mapBondToVseprPreset(currentBond.id)} />'));
});

it('provides procedural Web Audio synthesis methods in SoundEngine', () => {
  const soundEnginePath = path.resolve('src/audio/soundEngine.ts');
  const code = fs.readFileSync(soundEnginePath, 'utf8');
  assert.ok(code.includes('playVseprRepulsionShift'));
  assert.ok(code.includes('playDomainSnap'));
});

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n======================================================================');
console.log(`   SUITE 77 COMPLETE: ${passCount} PASSED, ${failCount} FAILED (TOTAL: ${passCount + failCount})`);
console.log('======================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
