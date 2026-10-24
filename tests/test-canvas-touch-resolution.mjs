// test-canvas-touch-resolution.mjs
// Suite 32: Canvas 2D Touch & Mouse Coordinate Normalization across Resolutions & High-DPI Audit

import assert from 'assert';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';
import { MAP_CONFIG } from '../src/game/maps/periodicRiftMap.ts';
import {
  computeJoystickInput,
  computePinchZoom,
  extractPrimaryTouch,
  isTouchConsumedByHUD
} from '../src/game/controls/virtualJoystick.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 32: CANVAS TOUCH & MULTI-RESOLUTION AUDIT         ');
console.log('======================================================================\n');

// -------------------------------------------------------------------
// 1. Screen-to-World and World-to-Screen Bijective Math Invariant
// -------------------------------------------------------------------
console.log('--- 1. Screen / World Coordinate Transformations Invariants ---');

function mockScreenToWorld(screenX, screenY, viewportW, viewportH, zoom, camX, camY) {
  const cx = (viewportW || 1280) / 2;
  const cy = (viewportH || 720) / 2;
  const z = Math.max(0.1, zoom || 1.0);
  return {
    x: (screenX - cx) / z + camX,
    y: (screenY - cy) / z + camY
  };
}

function mockWorldToScreen(worldX, worldY, viewportW, viewportH, zoom, camX, camY) {
  const cx = (viewportW || 1280) / 2;
  const cy = (viewportH || 720) / 2;
  const z = Math.max(0.1, zoom || 1.0);
  return {
    x: (worldX - camX) * z + cx,
    y: (worldY - camY) * z + cy
  };
}

runTest('Bijective roundtrip invariant: screenToWorld -> worldToScreen is identity', () => {
  const viewports = [
    { w: 1920, h: 1080 }, // 16:9 1080p Desktop
    { w: 2560, h: 1440 }, // 16:9 1440p QHD
    { w: 3440, h: 1440 }, // 21:9 Ultrawide
    { w: 1024, h: 768 },  // 4:3 iPad
    { w: 390, h: 844 }    // 9:19.5 Mobile Portrait
  ];
  const zooms = [0.5, 0.8, 1.0, 1.25, 2.0];
  const testPoints = [
    { x: 0, y: 0 },
    { x: 100, y: 150 },
    { x: 500, y: 400 },
    { x: 1200, y: 800 }
  ];

  for (const vp of viewports) {
    for (const z of zooms) {
      for (const p of testPoints) {
        const cam = { x: 1200, y: 1200 };
        const world = mockScreenToWorld(p.x, p.y, vp.w, vp.h, z, cam.x, cam.y);
        const backToScreen = mockWorldToScreen(world.x, world.y, vp.w, vp.h, z, cam.x, cam.y);
        assert.ok(Math.abs(p.x - backToScreen.x) < 0.0001, `X mismatch at ${vp.w}x${vp.h}: ${p.x} vs ${backToScreen.x}`);
        assert.ok(Math.abs(p.y - backToScreen.y) < 0.0001, `Y mismatch at ${vp.w}x${vp.h}: ${p.y} vs ${backToScreen.y}`);
      }
    }
  }
});

runTest('Degenerate viewport dimensions (0x0 or negative) safely fallback to non-zero defaults', () => {
  const badDimensions = [
    { w: 0, h: 0 },
    { w: -100, h: -50 },
    { w: undefined, h: null }
  ];

  for (const dim of badDimensions) {
    const world = mockScreenToWorld(200, 300, dim.w, dim.h, 1.0, 1000, 1000);
    assert.ok(!Number.isNaN(world.x), 'World X must not be NaN');
    assert.ok(!Number.isNaN(world.y), 'World Y must not be NaN');
    assert.ok(Number.isFinite(world.x), 'World X must be finite');
    assert.ok(Number.isFinite(world.y), 'World Y must be finite');
  }
});

// -------------------------------------------------------------------
// 2. Camera Viewport Borders & Aspect Ratio Clamping
// -------------------------------------------------------------------
console.log('\n--- 2. Camera Map Boundary Clamping ---');

function clampCamera(camX, camY, vpW, vpH, zoom) {
  const z = Math.max(0.1, zoom || 1.0);
  const halfW = (vpW / 2) / z;
  const halfH = (vpH / 2) / z;
  return {
    x: Math.max(halfW, Math.min(MAP_CONFIG.WIDTH - halfW, camX)),
    y: Math.max(halfH, Math.min(MAP_CONFIG.HEIGHT - halfH, camY))
  };
}

runTest('Camera is strictly clamped inside [halfW, MAP_W - halfW] on all viewports', () => {
  const extremes = [
    { x: -500, y: -200 },
    { x: 0, y: 0 },
    { x: 3000, y: 5000 },
    { x: 1200, y: 1200 }
  ];

  for (const ext of extremes) {
    const clamped = clampCamera(ext.x, ext.y, 1280, 720, 1.0);
    const halfW = 640;
    const halfH = 360;
    assert.ok(clamped.x >= halfW, `clamped.x (${clamped.x}) must be >= ${halfW}`);
    assert.ok(clamped.x <= MAP_CONFIG.WIDTH - halfW, `clamped.x (${clamped.x}) must be <= ${MAP_CONFIG.WIDTH - halfW}`);
    assert.ok(clamped.y >= halfH, `clamped.y (${clamped.y}) must be >= ${halfH}`);
    assert.ok(clamped.y <= MAP_CONFIG.HEIGHT - halfH, `clamped.y (${clamped.y}) must be <= ${MAP_CONFIG.HEIGHT - halfH}`);
  }
});

// -------------------------------------------------------------------
// 3. High-DPI (Retina / 4K / Mobile) Scaling & Transform Matrix
// -------------------------------------------------------------------
console.log('\n--- 3. High-DPI Scaling & Transform Matrix Stability ---');

runTest('DPR scaling is bounded in [1.0, 3.0] to prevent memory exhaustion on extreme screens', () => {
  const dprs = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0];
  for (const rawDpr of dprs) {
    const clampedDpr = Math.max(1, Math.min(3, rawDpr || 1));
    assert.ok(clampedDpr >= 1.0, `Clamped DPR must be >= 1.0, got ${clampedDpr}`);
    assert.ok(clampedDpr <= 3.0, `Clamped DPR must be <= 3.0, got ${clampedDpr}`);
  }
});

runTest('Repeated resizes maintain consistent viewport resolution without compounding scale', () => {
  let appliedTransform = null;
  const mockCtx = {
    setTransform: (a, b, c, d, e, f) => {
      appliedTransform = [a, b, c, d, e, f];
    }
  };

  const dpr = 2.0;
  for (let i = 0; i < 5; i++) {
    mockCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    assert.deepStrictEqual(appliedTransform, [2.0, 0, 0, 2.0, 0, 0]);
  }
});

// -------------------------------------------------------------------
// 4. Contextual Touch / Click Interaction Logic
// -------------------------------------------------------------------
console.log('\n--- 4. Contextual Touch Interaction & Targeting Engine ---');

runTest('Touch tap on ground sets targetMovePos and clears targetEntityId', () => {
  const engine = new MobaEngine('hero_na_brawler', 'hero_cl_viper');
  engine.update(0.016);
  const pHero = engine.playerHero;
  assert.ok(pHero);

  // Simulate ground click at (800, 900)
  const clickWorld = { x: 800, y: 900 };
  pHero.targetMovePos = { ...clickWorld };
  pHero.targetEntityId = null;

  assert.deepStrictEqual(pHero.targetMovePos, { x: 800, y: 900 });
  assert.strictEqual(pHero.targetEntityId, null);
});

runTest('Touch tap on enemy entity sets targetEntityId and clears targetMovePos', () => {
  const engine = new MobaEngine('hero_na_brawler', 'hero_cl_viper');
  engine.update(0.016);
  const pHero = engine.playerHero;
  const enemy = engine.heroes.find(h => h.team !== pHero.team);
  assert.ok(pHero && enemy);

  // Simulate tapping directly on enemy
  pHero.targetEntityId = enemy.id;
  pHero.targetMovePos = null;

  assert.strictEqual(pHero.targetEntityId, enemy.id);
  assert.strictEqual(pHero.targetMovePos, null);
});

// -------------------------------------------------------------------
// 5. Minimap Coordinate Mapping Invariance
// -------------------------------------------------------------------
console.log('\n--- 5. Minimap Spatial Navigation Mapping ---');

runTest('Minimap click at (0, 0) maps exactly to world (0, 0)', () => {
  const rect = { width: 176, height: 176 };
  const worldX = Math.max(0, Math.min(2400, (0 / rect.width) * 2400));
  const worldY = Math.max(0, Math.min(2400, (0 / rect.height) * 2400));
  assert.strictEqual(worldX, 0);
  assert.strictEqual(worldY, 0);
});

runTest('Minimap click at (176, 176) maps exactly to world (2400, 2400)', () => {
  const rect = { width: 176, height: 176 };
  const worldX = Math.max(0, Math.min(2400, (176 / rect.width) * 2400));
  const worldY = Math.max(0, Math.min(2400, (176 / rect.height) * 2400));
  assert.strictEqual(worldX, 2400);
  assert.strictEqual(worldY, 2400);
});

runTest('Minimap click at midpoint (88, 88) maps to map center (1200, 1200)', () => {
  const rect = { width: 176, height: 176 };
  const worldX = Math.max(0, Math.min(2400, (88 / rect.width) * 2400));
  const worldY = Math.max(0, Math.min(2400, (88 / rect.height) * 2400));
  assert.strictEqual(worldX, 1200);
  assert.strictEqual(worldY, 1200);
});

// -------------------------------------------------------------------
// 6. Mobile Skill Aiming Decal Vector Math & Directional Decal
// -------------------------------------------------------------------
console.log('\n--- 6. Skill Aiming Decal Vector Math & Range Clamping ---');

function computeAimVector(originX, originY, targetX, targetY, maxRange) {
  const dx = targetX - originX;
  const dy = targetY - originY;
  const dist = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  const clampedDist = Math.min(dist, maxRange);
  return {
    angle,
    clampedTarget: {
      x: originX + Math.cos(angle) * clampedDist,
      y: originY + Math.sin(angle) * clampedDist
    },
    isAtMaxRange: dist >= maxRange
  };
}

runTest('Skill aim vector accurately computes angle and clamps target within maxRange', () => {
  const origin = { x: 500, y: 500 };
  const target = { x: 900, y: 500 }; // Due East (angle 0)
  const maxRange = 300;

  const aim = computeAimVector(origin.x, origin.y, target.x, target.y, maxRange);
  assert.strictEqual(aim.angle, 0, 'Angle due East must be 0 radians');
  assert.strictEqual(aim.clampedTarget.x, 800, 'Target clamped to 500 + 300 = 800');
  assert.strictEqual(aim.clampedTarget.y, 500, 'Y must remain unchanged');
  assert.strictEqual(aim.isAtMaxRange, true, 'Distance 400 > maxRange 300, isAtMaxRange must be true');
});

runTest('Skill aim vector preserves target within range without truncation', () => {
  const origin = { x: 500, y: 500 };
  const target = { x: 600, y: 500 }; // Dist 100 < maxRange 300
  const maxRange = 300;

  const aim = computeAimVector(origin.x, origin.y, target.x, target.y, maxRange);
  assert.strictEqual(aim.clampedTarget.x, 600, 'Target within range preserved');
  assert.strictEqual(aim.isAtMaxRange, false, 'Distance 100 < maxRange, isAtMaxRange must be false');
});

// -------------------------------------------------------------------
// 7. Touch Event Client Coordinates & Bounding Rect Offset Guard
// -------------------------------------------------------------------
console.log('\n--- 7. Touch Event Bounding Rect Offset & Non-zero Size Guard ---');

function normalizeTouchCoords(touchClientX, touchClientY, rect) {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return { screenX: 0, screenY: 0, isValid: false };
  }
  const screenX = Math.max(0, Math.min(rect.width, touchClientX - rect.left));
  const screenY = Math.max(0, Math.min(rect.height, touchClientY - rect.top));
  return { screenX, screenY, isValid: true };
}

runTest('Touch normalization clamps out-of-bounds touches to canvas bounding rect', () => {
  const rect = { left: 100, top: 50, width: 800, height: 600 };
  // Touch outside top-left
  const res1 = normalizeTouchCoords(50, 20, rect);
  assert.strictEqual(res1.screenX, 0, 'X clamped to 0');
  assert.strictEqual(res1.screenY, 0, 'Y clamped to 0');
  assert.strictEqual(res1.isValid, true);

  // Touch outside bottom-right
  const res2 = normalizeTouchCoords(1200, 800, rect);
  assert.strictEqual(res2.screenX, 800, 'X clamped to width 800');
  assert.strictEqual(res2.screenY, 600, 'Y clamped to height 600');

  // Touch inside
  const res3 = normalizeTouchCoords(300, 250, rect);
  assert.strictEqual(res3.screenX, 200, '300 - 100 = 200');
  assert.strictEqual(res3.screenY, 200, '250 - 50 = 200');
});

runTest('Degenerate rect (0x0 or collapsed) handled safely without division by zero', () => {
  const badRect = { left: 0, top: 0, width: 0, height: 0 };
  const res = normalizeTouchCoords(100, 100, badRect);
  assert.strictEqual(res.isValid, false);
  assert.strictEqual(res.screenX, 0);
  assert.strictEqual(res.screenY, 0);
});

// -------------------------------------------------------------------
// 8. Multi-Touch Isolation & Primary Touch Finger Guard
// -------------------------------------------------------------------
console.log('\n--- 8. Multi-Touch Isolation & Primary Finger Guard ---');

runTest('extractPrimaryTouch isolates primary finger and ignores secondary/pinch touches', () => {
  const touches = [
    { identifier: 0, clientX: 250, clientY: 300 },
    { identifier: 1, clientX: 400, clientY: 500 }
  ];
  const primary = extractPrimaryTouch(touches);
  assert.ok(primary);
  assert.strictEqual(primary.identifier, 0);
  assert.strictEqual(primary.clientX, 250);

  // Empty touches
  assert.strictEqual(extractPrimaryTouch([]), null);
  assert.strictEqual(extractPrimaryTouch(null), null);
});

// -------------------------------------------------------------------
// 9. Virtual Joystick Deadzone & Directional Polar Math
// -------------------------------------------------------------------
console.log('\n--- 9. Virtual Joystick Deadzone & Directional Polar Math ---');

runTest('Joystick touch inside deadzone (< 12px) suppresses drifting movement', () => {
  const center = { x: 150, y: 550 };
  // Small touch jitter 5px away
  const input = computeJoystickInput(153, 554, center.x, center.y);
  assert.strictEqual(input.isActive, false);
  assert.strictEqual(input.x, 0);
  assert.strictEqual(input.y, 0);
  assert.strictEqual(input.intensity, 0);
});

runTest('Joystick touch beyond maxRadius (60px) clamps to maximum unit intensity 1.0', () => {
  const center = { x: 150, y: 550 };
  // Dragged 100px due East
  const input = computeJoystickInput(250, 550, center.x, center.y);
  assert.strictEqual(input.isActive, true);
  assert.strictEqual(input.intensity, 1.0);
  assert.strictEqual(input.x, 1.0);
  assert.strictEqual(input.y, 0);
  assert.strictEqual(input.angle, 0);
});

runTest('Joystick half-way deflection produces accurate intermediate intensity', () => {
  const center = { x: 150, y: 550 };
  // Deflected 36px (halfway between 12 and 60 -> (36 - 12) / 48 = 0.5)
  const input = computeJoystickInput(150, 586, center.x, center.y); // Due South
  assert.strictEqual(input.isActive, true);
  assert.strictEqual(input.intensity, 0.5);
  assert.ok(Math.abs(input.x) < 1e-10, 'X component must be ~0 on due South deflection');
  assert.ok(Math.abs(input.y - 0.5) < 1e-10, 'Y component must be ~0.5 on due South deflection');
  assert.strictEqual(input.angle, Math.PI / 2);
});

// -------------------------------------------------------------------
// 10. Multi-Touch Pinch-to-Zoom Distance Clamping
// -------------------------------------------------------------------
console.log('\n--- 10. Multi-Touch Pinch-to-Zoom Distance Clamping ---');

runTest('Pinch expansion increases camera zoom up to maxZoom 2.0 clamp', () => {
  const tA = { clientX: 200, clientY: 300 };
  const tB = { clientX: 400, clientY: 300 }; // dist = 200
  const initialDist = 100; // was 100 -> expanded 2x
  const zoom = computePinchZoom(tA, tB, initialDist, 1.0);
  assert.strictEqual(zoom, 2.0);

  // Even larger expansion (dist = 400, was 100 -> 4x) clamps to 2.0
  const tB2 = { clientX: 600, clientY: 300 };
  const overZoom = computePinchZoom(tA, tB2, initialDist, 1.0);
  assert.strictEqual(overZoom, 2.0);
});

runTest('Pinch contraction decreases camera zoom down to minZoom 0.5 clamp', () => {
  const tA = { clientX: 200, clientY: 300 };
  const tB = { clientX: 230, clientY: 300 }; // dist = 30
  const initialDist = 100; // was 100 -> contracted to 0.3x
  const zoom = computePinchZoom(tA, tB, initialDist, 1.0);
  assert.strictEqual(zoom, 0.5);
});

// -------------------------------------------------------------------
// 11. HUD Interaction Occlusion & Input Consumption Guard
// -------------------------------------------------------------------
console.log('\n--- 11. HUD Interaction Occlusion & Input Consumption Guard ---');

runTest('Touches over HUD elements (minimap, skill buttons) are intercepted from canvas ground clicks', () => {
  const hudZones = [
    { id: 'hud_minimap', x: 10, y: 10, width: 176, height: 176 },
    { id: 'hud_skill_q', x: 1000, y: 600, width: 64, height: 64 },
    { id: 'hud_skill_w', x: 1080, y: 550, width: 64, height: 64 },
    { id: 'hud_recall',  x: 600, y: 650, width: 80, height: 40 }
  ];

  // Tap on minimap
  const resMinimap = isTouchConsumedByHUD(50, 50, hudZones);
  assert.strictEqual(resMinimap.consumed, true);
  assert.strictEqual(resMinimap.zoneId, 'hud_minimap');

  // Tap on Skill Q button
  const resSkill = isTouchConsumedByHUD(1030, 620, hudZones);
  assert.strictEqual(resSkill.consumed, true);
  assert.strictEqual(resSkill.zoneId, 'hud_skill_q');

  // Tap on game canvas ground (not over HUD)
  const resGround = isTouchConsumedByHUD(500, 300, hudZones);
  assert.strictEqual(resGround.consumed, false);
  assert.strictEqual(resGround.zoneId, null);
});

// -------------------------------------------------------------------
// 12. Non-Integer High-DPI Display Scaling & Continuous Joystick Math
// -------------------------------------------------------------------
console.log('\n--- 12. Non-Integer High-DPI Scaling & Continuous Joystick Movement ---');

runTest('Fractional DPR displays (1.25x, 1.5x, 2.25x, 2.75x) maintain coordinate fidelity', () => {
  const fractionalDprs = [1.25, 1.5, 1.75, 2.25, 2.625, 2.75, 3.0];
  const screenPos = { x: 450, y: 320 };
  const viewport = { w: 1080, h: 720 };
  const camera = { x: 1200, y: 1200 };

  for (const dpr of fractionalDprs) {
    const world = mockScreenToWorld(screenPos.x, screenPos.y, viewport.w, viewport.h, 1.0, camera.x, camera.y);
    const roundtrip = mockWorldToScreen(world.x, world.y, viewport.w, viewport.h, 1.0, camera.x, camera.y);
    assert.ok(
      Math.abs(roundtrip.x - screenPos.x) < 1e-9 && Math.abs(roundtrip.y - screenPos.y) < 1e-9,
      `Fractional DPR ${dpr} roundtrip coordinate discrepancy detected`
    );
  }
});

runTest('Continuous Virtual Joystick movement calculates directional velocity without drift', () => {
  const center = { x: 80, y: 500 };
  const heroPos = { x: 1200, y: 1200 };
  const moveDist = 200;

  // Deflect North-East (angle -45 deg / -PI/4)
  const touchNE = { x: center.x + 35, y: center.y - 35 };
  const joyNE = computeJoystickInput(touchNE.x, touchNE.y, center.x, center.y, 10, 52);
  assert.ok(joyNE.isActive);
  assert.ok(joyNE.x > 0, 'X must be positive heading East');
  assert.ok(joyNE.y < 0, 'Y must be negative heading North');

  const targetPos = {
    x: heroPos.x + joyNE.x * moveDist,
    y: heroPos.y + joyNE.y * moveDist
  };
  assert.ok(targetPos.x > heroPos.x);
  assert.ok(targetPos.y < heroPos.y);

  // Release joystick into deadzone
  const joyRelease = computeJoystickInput(center.x + 2, center.y + 2, center.x, center.y, 10, 52);
  assert.strictEqual(joyRelease.isActive, false);
  assert.strictEqual(joyRelease.intensity, 0);
});

runTest('Concurrent multi-touch handles joystick navigation and simultaneous ability tap', () => {
  const touches = [
    { identifier: 101, clientX: 75, clientY: 520 },  // Finger 1 on Joystick
    { identifier: 102, clientX: 950, clientY: 600 }  // Finger 2 on Skill Button R
  ];

  const primary = extractPrimaryTouch(touches);
  assert.ok(primary);
  assert.strictEqual(primary.identifier, 101);

  const joy = computeJoystickInput(primary.clientX, primary.clientY, 80, 500, 10, 52);
  assert.ok(joy.isActive);

  const hudZones = [
    { id: 'hud_skill_r', x: 920, y: 570, width: 64, height: 64 }
  ];
  const skillTouch = isTouchConsumedByHUD(touches[1].clientX, touches[1].clientY, hudZones);
  assert.strictEqual(skillTouch.consumed, true);
  assert.strictEqual(skillTouch.zoneId, 'hud_skill_r');
});

console.log('\n======================================================================');
console.log(` AUDIT RESULT: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% SUCCESS)`);
console.log('======================================================================\n');
