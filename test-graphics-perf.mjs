// test-graphics-perf.mjs
// Graphics, Canvas 2D, Particle Pooling & Memory Leak Verification Suite

import assert from 'assert';
import { ParticleEngine } from './src/game/rendering/particleEngine.ts';
import { MAP_CONFIG, LANE_WAYPOINTS } from './src/game/maps/periodicRiftMap.ts';
import { MobaRenderer, computeViewportBounds, isCircleInViewport, isRectInViewport } from './src/game/rendering/mobaRenderer.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('=== TEST SUITE: GRAPHICS, CANVAS 2D & PERFORMANCE AUDIT ===\n');

// -------------------------------------------------------------
// GROUP 1: OBJECT-POOLED PARTICLE SYSTEM (ZERO-ALLOCATION)
// -------------------------------------------------------------
console.log('--- Group 1: Particle Engine Pooling & Zero-GC Allocations ---');

runTest('Particle engine initializes with exactly 350 pre-allocated particles', () => {
  const engine = new ParticleEngine();
  assert.strictEqual(engine['poolSize'], 350);
  assert.strictEqual(engine['pool'].length, 350);
  assert.strictEqual(engine.getActiveCount(), 0);
});

runTest('Active particle budget scales accurately with quality profiles', () => {
  const engine = new ParticleEngine();

  engine.setQuality('PERFORMANCE');
  assert.strictEqual(engine['activeBudget'], 80);

  engine.setQuality('BALANCED');
  assert.strictEqual(engine['activeBudget'], 200);

  engine.setQuality('ULTRA');
  assert.strictEqual(engine['activeBudget'], 350);
});

runTest('Spawning bursts reuses pooled particles without exceeding budget', () => {
  const engine = new ParticleEngine();
  engine.setQuality('PERFORMANCE'); // Budget 80

  // Spawn 100 particles (should be clamped to budget 80)
  engine.spawnBurst(500, 500, 100, 'SPARK', '#00f0ff');
  assert.ok(engine.getActiveCount() <= 80, `Active particles (${engine.getActiveCount()}) exceeded PERFORMANCE budget (80)`);

  // Pool length should remain strictly 350 (no dynamic re-allocation)
  assert.strictEqual(engine['pool'].length, 350);
});

runTest('Particles expire and return to pool when life reaches maxLife', () => {
  const engine = new ParticleEngine();
  engine.spawnBurst(100, 100, 20, 'SPARK', '#ff0000', 100, 4, 0.2); // 0.2s maxLife
  assert.strictEqual(engine.getActiveCount(), 20);

  // Advance time by 0.1s -> particles still alive
  engine.update(0.1);
  assert.ok(engine.getActiveCount() > 0);

  // Advance time by another 0.2s -> all particles should have expired and returned to pool
  engine.update(0.2);
  assert.strictEqual(engine.getActiveCount(), 0, 'All particles should be recycled after maxLife');
});

// -------------------------------------------------------------
// GROUP 2: CAMERA VIEWPORT & MAP BOUNDARY CONSTRAINTS
// -------------------------------------------------------------
console.log('\n--- Group 2: Camera Clamping & Map Bounds ---');

runTest('Map dimensions are strictly defined and square', () => {
  assert.strictEqual(MAP_CONFIG.WIDTH, 2400);
  assert.strictEqual(MAP_CONFIG.HEIGHT, 2400);
  assert.ok(Object.keys(LANE_WAYPOINTS).length >= 3);
});

runTest('Camera clamping prevents rendering outside battlefield borders', () => {
  const viewportWidth = 1920;
  const viewportHeight = 1080;
  const zoom = 1.0;

  const halfW = (viewportWidth / 2) / zoom; // 960
  const halfH = (viewportHeight / 2) / zoom; // 540

  const clampCam = (rawX, rawY) => {
    return {
      x: Math.max(halfW, Math.min(MAP_CONFIG.WIDTH - halfW, rawX)),
      y: Math.max(halfH, Math.min(MAP_CONFIG.HEIGHT - halfH, rawY))
    };
  };

  // Extreme top-left corner
  const cam1 = clampCam(-500, -500);
  assert.strictEqual(cam1.x, halfW);
  assert.strictEqual(cam1.y, halfH);

  // Extreme bottom-right corner
  const cam2 = clampCam(5000, 5000);
  assert.strictEqual(cam2.x, MAP_CONFIG.WIDTH - halfW);
  assert.strictEqual(cam2.y, MAP_CONFIG.HEIGHT - halfH);

  // Center position
  const camCenter = clampCam(1200, 1200);
  assert.strictEqual(camCenter.x, 1200);
  assert.strictEqual(camCenter.y, 1200);
});

// -------------------------------------------------------------
// GROUP 3: SIMULATED DOM LISTENER LIFECYCLE & TEARDOWN
// -------------------------------------------------------------
console.log('\n--- Group 3: Event Listener Teardown Verification ---');

runTest('Event listener register and unregister contracts behave symmetrically', () => {
  const listeners = new Map();

  const mockWindow = {
    addEventListener: (event, handler) => {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
    },
    removeEventListener: (event, handler) => {
      if (listeners.has(event)) {
        listeners.get(event).delete(handler);
        if (listeners.get(event).size === 0) listeners.delete(event);
      }
    }
  };

  const handleResize = () => {};
  const handleKeyDown = () => {};

  // Mount
  mockWindow.addEventListener('resize', handleResize);
  mockWindow.addEventListener('keydown', handleKeyDown);

  assert.strictEqual(listeners.get('resize').size, 1);
  assert.strictEqual(listeners.get('keydown').size, 1);

  // Unmount
  mockWindow.removeEventListener('resize', handleResize);
  mockWindow.removeEventListener('keydown', handleKeyDown);

  assert.strictEqual(listeners.size, 0, 'All listeners must be stripped on unmount to prevent memory leaks');
});

// -------------------------------------------------------------
// GROUP 4: VIEWPORT BOUNDS & ENTITY CULLING ACCURACY
// -------------------------------------------------------------
console.log('\n--- Group 4: Viewport Bounding Box & Culling Invariants ---');

runTest('computeViewportBounds calculates exact world-space box across zoom levels', () => {
  // Standard 1280x720 at 1.0 zoom centered at (1200, 1200) with 80px margin
  const bounds1 = computeViewportBounds(1200, 1200, 1280, 720, 1.0, 80);
  assert.strictEqual(bounds1.left, 1200 - 640 - 80); // 480
  assert.strictEqual(bounds1.right, 1200 + 640 + 80); // 1920
  assert.strictEqual(bounds1.top, 1200 - 360 - 80); // 760
  assert.strictEqual(bounds1.bottom, 1200 + 360 + 80); // 1640

  // Zoomed-in (2.0x): visible world shrinks by 50%
  const boundsZoomIn = computeViewportBounds(1200, 1200, 1280, 720, 2.0, 50);
  assert.strictEqual(boundsZoomIn.left, 1200 - 320 - 50); // 830
  assert.strictEqual(boundsZoomIn.right, 1200 + 320 + 50); // 1570

  // Zoomed-out (0.5x): visible world expands by 200%
  const boundsZoomOut = computeViewportBounds(1200, 1200, 1280, 720, 0.5, 50);
  assert.strictEqual(boundsZoomOut.left, 1200 - 1280 - 50); // -130
  assert.strictEqual(boundsZoomOut.right, 1200 + 1280 + 50); // 2530
});

runTest('isCircleInViewport correctly discriminates on-screen vs off-screen entities', () => {
  const bounds = { left: 500, right: 1500, top: 500, bottom: 1500 };

  // Center entity -> Visible
  assert.strictEqual(isCircleInViewport(1000, 1000, 30, bounds), true);

  // Far offscreen to the left (x = 100, radius = 30) -> Culled
  assert.strictEqual(isCircleInViewport(100, 1000, 30, bounds), false);

  // Far offscreen to the right (x = 2200, radius = 30) -> Culled
  assert.strictEqual(isCircleInViewport(2200, 1000, 30, bounds), false);

  // Far offscreen above (y = 200, radius = 30) -> Culled
  assert.strictEqual(isCircleInViewport(1000, 200, 30, bounds), false);

  // Far offscreen below (y = 2300, radius = 30) -> Culled
  assert.strictEqual(isCircleInViewport(1000, 2300, 30, bounds), false);

  // Edge entity straddling the left boundary (center at 490, radius 20 -> max edge 510 >= 500) -> Visible
  assert.strictEqual(isCircleInViewport(490, 1000, 20, bounds), true);

  // Edge entity just outside the left boundary (center at 470, radius 20 -> max edge 490 < 500) -> Culled
  assert.strictEqual(isCircleInViewport(470, 1000, 20, bounds), false);
});

runTest('isRectInViewport correctly culls rectangular obstacles and bushes', () => {
  const bounds = { left: 400, right: 1600, top: 400, bottom: 1600 };

  // Obstacle completely inside -> Visible
  assert.strictEqual(isRectInViewport(600, 600, 100, 100, bounds), true);

  // Obstacle completely to the right -> Culled
  assert.strictEqual(isRectInViewport(1800, 600, 100, 100, bounds), false);

  // Obstacle overlapping top boundary (top at 350, height 100 -> bottom at 450 >= 400) -> Visible
  assert.strictEqual(isRectInViewport(600, 350, 100, 100, bounds), true);

  // Obstacle completely above top boundary (top at 250, height 100 -> bottom at 350 < 400) -> Culled
  assert.strictEqual(isRectInViewport(600, 250, 100, 100, bounds), false);
});

runTest('ParticleEngine draw accepts viewport bounds without throwing on mock context', () => {
  const engine = new ParticleEngine();
  engine.spawnBurst(1000, 1000, 15, 'SPARK', '#00f0ff');
  engine.spawnBurst(100, 100, 15, 'FLAME', '#ff0000');

  let pathsDrawn = 0;
  const mockCtx = {
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    beginPath: () => { pathsDrawn++; },
    ellipse: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {}
  };

  // Draw with bounds centered at (1000, 1000), radius 200 -> only sparks at (1000, 1000) drawn
  const bounds = { left: 800, right: 1200, top: 800, bottom: 1200 };
  engine.draw(mockCtx, bounds);
  assert.ok(pathsDrawn > 0, 'Particles inside bounds were drawn');
});

// -------------------------------------------------------------
// GROUP 5: SUSTAINED HIGH-FREQUENCY 60HZ STRESS & ZERO-GC ALLOCATION
// -------------------------------------------------------------
console.log('\n--- Group 5: Sustained 60 Hz Stress & Zero-GC Allocations ---');

runTest('1,000 sustained burst cycles maintain strict zero reallocation invariant', () => {
  const engine = new ParticleEngine();
  const initialPoolLength = engine['pool'].length;
  assert.strictEqual(initialPoolLength, 350);

  // Simulate 1000 frames (~16.6 seconds of heavy gameplay at 60Hz)
  for (let frame = 0; frame < 1000; frame++) {
    if (frame % 3 === 0) {
      engine.spawnBurst(Math.random() * 2400, Math.random() * 2400, 8, 'SPARK');
    }
    if (frame % 5 === 0) {
      engine.spawnShockwave(1200, 1200, 120, '#38bdf8', 0.2);
    }
    if (frame % 4 === 0) {
      engine.spawnDirectionalSpray(800, 800, Math.PI / 4, 4, 'FLAME');
    }
    engine.update(0.0166);
  }

  // Memory invariant: Pool must NEVER expand or shrink
  assert.strictEqual(engine['pool'].length, 350, 'Particle pool length must stay strictly invariant at 350');
});

runTest('Dynamic graphics quality switches under full particle load bound active count safely', () => {
  const engine = new ParticleEngine();

  // 1. Fill engine at ULTRA quality (350 budget)
  engine.setQuality('ULTRA');
  for (let i = 0; i < 20; i++) {
    engine.spawnBurst(500, 500, 30, 'SPARK');
  }
  const ultraCount = engine.getActiveCount();
  assert.ok(ultraCount <= 350, `Ultra count (${ultraCount}) must not exceed 350`);

  // 2. Switch to PERFORMANCE (80 budget)
  engine.setQuality('PERFORMANCE');
  assert.strictEqual(engine['activeBudget'], 80);

  // Future bursts clamped to 80
  engine.reset();
  for (let i = 0; i < 20; i++) {
    engine.spawnBurst(500, 500, 30, 'SPARK');
  }
  const perfCount = engine.getActiveCount();
  assert.strictEqual(perfCount, 80, `Performance count (${perfCount}) must clamp to 80`);

  // 3. Switch to BALANCED (200 budget)
  engine.setQuality('BALANCED');
  assert.strictEqual(engine['activeBudget'], 200);
  engine.reset();
  for (let i = 0; i < 20; i++) {
    engine.spawnBurst(500, 500, 30, 'SPARK');
  }
  const balCount = engine.getActiveCount();
  assert.strictEqual(balCount, 200, `Balanced count (${balCount}) must clamp to 200`);
});

runTest('ParticleEngine reset flushes all active elements immediately', () => {
  const engine = new ParticleEngine();
  engine.spawnBurst(300, 300, 50, 'SPARK');
  assert.ok(engine.getActiveCount() > 0);

  engine.reset();
  assert.strictEqual(engine.getActiveCount(), 0, 'Active count must be 0 after reset');
  assert.strictEqual(engine['pool'].length, 350);
});

// -------------------------------------------------------------
// GROUP 6: AOE CHEMICAL REACTION ZONES & AIM DECAL CANVAS PIPELINE
// -------------------------------------------------------------
console.log('\n--- Group 6: AoE Chemical Zones & Aim Decal Canvas Pipeline ---');

function createComprehensiveMockCanvasContext() {
  const operations = [];
  return {
    operations,
    save: () => operations.push({ type: 'save' }),
    restore: () => operations.push({ type: 'restore' }),
    beginPath: () => operations.push({ type: 'beginPath' }),
    closePath: () => operations.push({ type: 'closePath' }),
    moveTo: (x, y) => operations.push({ type: 'moveTo', x, y }),
    lineTo: (x, y) => operations.push({ type: 'lineTo', x, y }),
    arc: (x, y, r, sa, ea) => operations.push({ type: 'arc', x, y, r, sa, ea }),
    rect: (x, y, w, h) => operations.push({ type: 'rect', x, y, w, h }),
    roundRect: (x, y, w, h, r) => operations.push({ type: 'roundRect', x, y, w, h, r }),
    fillRect: (x, y, w, h) => operations.push({ type: 'fillRect', x, y, w, h }),
    fill: () => operations.push({ type: 'fill' }),
    stroke: () => operations.push({ type: 'stroke' }),
    fillText: (text, x, y) => operations.push({ type: 'fillText', text, x, y }),
    measureText: (text) => ({ width: (text || '').length * 8 }),
    setLineDash: (segments) => operations.push({ type: 'setLineDash', segments }),
    translate: (x, y) => operations.push({ type: 'translate', x, y }),
    rotate: (angle) => operations.push({ type: 'rotate', angle }),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    font: '',
    textAlign: '',
    textBaseline: '',
    globalAlpha: 1.0,
    lineCap: '',
    lineJoin: ''
  };
}

runTest('drawAoEZones skips chemical pools completely outside camera viewport', () => {
  const mockCtx = createComprehensiveMockCanvasContext();
  const mockRenderer = {
    isInViewport: (x, y, r) => isCircleInViewport(x, y, r, { left: 500, right: 1500, top: 500, bottom: 1500 }),
    graphicsQuality: 'BALANCED',
    particles: new ParticleEngine()
  };

  const culledAoE = {
    id: 'aoe-culled',
    sourceEntityId: 'hero-1',
    team: 'ORDER',
    pos: { x: 3000, y: 3000 },
    radius: 120,
    durationSeconds: 5,
    remainingSeconds: 4,
    tickRateSeconds: 0.5,
    timeSinceLastTick: 0,
    damagePerTick: 30,
    damageType: 'CHEMICAL',
    color: '#ef4444',
    chemicalEffectType: 'ĐỐT CHÁY NHIỆT NHÔM',
    equationVI: 'Fe2O3 + 2Al -> 2Fe + Al2O3'
  };

  MobaRenderer.prototype.drawAoEZones.call(mockRenderer, mockCtx, [culledAoE]);
  assert.strictEqual(mockCtx.operations.length, 0, 'No draw operations should be issued for culled AoE');
});

runTest('drawAoEZones renders ground pool, concentric reaction waves, and chemical equation badge', () => {
  const mockCtx = createComprehensiveMockCanvasContext();
  const mockRenderer = {
    isInViewport: (x, y, r) => isCircleInViewport(x, y, r, { left: 500, right: 1500, top: 500, bottom: 1500 }),
    graphicsQuality: 'BALANCED',
    particles: new ParticleEngine()
  };

  const visibleAoE = {
    id: 'aoe-visible',
    sourceEntityId: 'hero-2',
    team: 'CHAOS',
    pos: { x: 1000, y: 1000 },
    radius: 140,
    durationSeconds: 6,
    remainingSeconds: 3,
    tickRateSeconds: 0.5,
    timeSinceLastTick: 0,
    damagePerTick: 50,
    damageType: 'CHEMICAL',
    color: '#10b981',
    chemicalEffectType: 'KẾT TỦA ACID',
    equationVI: 'H2SO4 + Ba(OH)2 -> BaSO4 + 2H2O'
  };

  MobaRenderer.prototype.drawAoEZones.call(mockRenderer, mockCtx, [visibleAoE]);

  // Must have drawn arcs for base pool and concentric shockwaves
  const arcOps = mockCtx.operations.filter(op => op.type === 'arc');
  assert.ok(arcOps.length >= 3, `Expected at least 3 arc operations (base pool + 2 shockwaves), got ${arcOps.length}`);

  // Must have rendered text for chemicalEffectType and equationVI
  const textOps = mockCtx.operations.filter(op => op.type === 'fillText');
  assert.ok(textOps.some(op => op.text === 'KẾT TỦA ACID'), 'Chemical effect type text must be rendered');
  assert.ok(textOps.some(op => op.text === 'H2SO4 + Ba(OH)2 -> BaSO4 + 2H2O'), 'Chemical equation text must be rendered');

  // Must render duration progress bar
  const fillRectOps = mockCtx.operations.filter(op => op.type === 'fillRect');
  assert.ok(fillRectOps.length >= 1, 'Duration progress bar fillRect must be rendered');
});

runTest('drawAimDecal renders CONE skillshots with sweeping wavefronts and guidance rays', () => {
  const mockCtx = createComprehensiveMockCanvasContext();
  const mockRenderer = {
    graphicsQuality: 'BALANCED'
  };

  const coneDecal = {
    type: 'CONE',
    range: 350,
    slot: 'E',
    color: '#f59e0b'
  };

  MobaRenderer.prototype.drawAimDecal.call(
    mockRenderer,
    mockCtx,
    { x: 600, y: 600 },
    { x: 850, y: 600 },
    coneDecal
  );

  const arcOps = mockCtx.operations.filter(op => op.type === 'arc');
  assert.ok(arcOps.length >= 3, `CONE decal should render outer boundary arc, sweeping wavefronts, and range ring (got ${arcOps.length})`);

  const lineOps = mockCtx.operations.filter(op => op.type === 'lineTo');
  assert.ok(lineOps.length >= 3, `CONE decal should render central aiming vector and guidelines (got ${lineOps.length})`);
});

runTest('drawAimDecal renders LINE and AOE skillshots with exact geometric constraints', () => {
  const mockCtx = createComprehensiveMockCanvasContext();
  const mockRenderer = {
    graphicsQuality: 'BALANCED'
  };

  const lineDecal = {
    type: 'LINE',
    range: 500,
    width: 50,
    slot: 'Q',
    color: '#00f0ff'
  };

  MobaRenderer.prototype.drawAimDecal.call(
    mockRenderer,
    mockCtx,
    { x: 400, y: 400 },
    { x: 700, y: 400 },
    lineDecal
  );

  const fillRectOps = mockCtx.operations.filter(op => op.type === 'fillRect');
  assert.ok(fillRectOps.length >= 1, 'LINE decal must render corridor background');

  const aoeDecal = {
    type: 'AOE',
    range: 400,
    radius: 120,
    slot: 'R',
    color: '#ec4899'
  };

  const mockCtxAoe = createComprehensiveMockCanvasContext();
  MobaRenderer.prototype.drawAimDecal.call(
    mockRenderer,
    mockCtxAoe,
    { x: 400, y: 400 },
    { x: 650, y: 400 },
    aoeDecal
  );

  const aoeArcOps = mockCtxAoe.operations.filter(op => op.type === 'arc');
  assert.ok(aoeArcOps.length >= 3, 'AOE decal must render target circle, pulsating ring, and range border');
});

runTest('AoE and Decal drawing maintains strict 60 FPS Canvas draw-call budget under load', () => {
  const mockCtx = createComprehensiveMockCanvasContext();
  const mockRenderer = {
    isInViewport: () => true,
    graphicsQuality: 'BALANCED',
    particles: new ParticleEngine()
  };

  // Simulate 8 simultaneous chemical pools in a clustered teamfight
  const pools = Array.from({ length: 8 }, (_, i) => ({
    id: `pool-${i}`,
    sourceEntityId: `hero-${i}`,
    team: i % 2 === 0 ? 'ORDER' : 'CHAOS',
    pos: { x: 1000 + (i * 20), y: 1000 + (i * 20) },
    radius: 100,
    durationSeconds: 4,
    remainingSeconds: 2,
    tickRateSeconds: 0.5,
    timeSinceLastTick: 0,
    damagePerTick: 40,
    damageType: 'CHEMICAL',
    color: '#38bdf8',
    chemicalEffectType: `REACTION ${i}`,
    equationVI: `A + B -> C`
  }));

  MobaRenderer.prototype.drawAoEZones.call(mockRenderer, mockCtx, pools);

  // Total operations for 8 simultaneous complex chemical pools should stay well under 300
  assert.ok(mockCtx.operations.length <= 250, `Canvas operations (${mockCtx.operations.length}) exceeded 60 FPS safety budget`);
});

console.log(`\n=================================================`);
console.log(`GRAPHICS PERF TESTS COMPLETE: ${passedTests} / ${totalTests} PASSED`);
console.log(`=================================================\n`);
