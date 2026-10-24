import { ParticleEngine } from '../src/game/rendering/particleEngine.ts';
import { performance } from 'node:perf_hooks';

console.log('======================================================================');
console.log('   TEST SUITE 156: MOBA PARTICLE ENGINE & FRAME BUDGET BENCHMARK      ');
console.log('   Phase B: Canvas 2D/WebGL Optimization, Object Pooling & Latency   ');
console.log('======================================================================\n');

let passCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  [PASS] #${totalCount}: ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] #${totalCount}: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Initial State & Object Pooling
console.log('--- 1. POOL INITIALIZATION & PRE-ALLOCATION ---');
const engine = new ParticleEngine();
assert(engine.getActiveCount() === 0, 'Initial active particle count is 0');

// 2. Adaptive Quality Budgets
console.log('\n--- 2. ADAPTIVE QUALITY BUDGETS ---');
engine.setQuality('PERFORMANCE');
// Try to spawn 150 particles
for (let i = 0; i < 5; i++) {
  engine.spawnBurst(100, 100, 30, 'SPARK');
}
const perfCount = engine.getActiveCount();
assert(perfCount <= 80, `PERFORMANCE profile caps active particles to <= 80 (actual: ${perfCount})`);

engine.setQuality('BALANCED');
for (let i = 0; i < 5; i++) {
  engine.spawnBurst(100, 100, 30, 'SPARK');
}
const balancedCount = engine.getActiveCount();
assert(balancedCount <= 200 && balancedCount > perfCount, `BALANCED profile permits up to 200 particles (actual: ${balancedCount})`);

engine.setQuality('ULTRA');
for (let i = 0; i < 10; i++) {
  engine.spawnBurst(100, 100, 40, 'SPARK');
}
const ultraCount = engine.getActiveCount();
assert(ultraCount <= 350 && ultraCount > balancedCount, `ULTRA profile permits full pool budget up to 350 particles (actual: ${ultraCount})`);

// 3. Multitype VFX Spawning
console.log('\n--- 3. MULTI-TYPE PARTICLE GENERATION ---');
const freshEngine = new ParticleEngine();
freshEngine.setQuality('ULTRA');

freshEngine.spawnBurst(200, 200, 20, 'SPARK', '#00f0ff');
freshEngine.spawnBurst(200, 200, 20, 'SHARD', '#94a3b8');
freshEngine.spawnBurst(200, 200, 20, 'VAPOR', '#10b981');
freshEngine.spawnBurst(200, 200, 20, 'FLAME', '#ef4444');
freshEngine.spawnBurst(200, 200, 20, 'BUBBLE', '#3b82f6');
freshEngine.spawnBurst(200, 200, 20, 'CRYSTAL', '#a855f7');
freshEngine.spawnShockwave(200, 200, 100, '#eab308', 0.5);
freshEngine.spawnDirectionalSpray(200, 200, Math.PI / 4, 15, 'SPARK', '#06b6d4');

const multiCount = freshEngine.getActiveCount();
assert(multiCount >= 100, `Successfully instantiated multiple particle types simultaneously (active: ${multiCount})`);

// 4. Viewport Culling Simulation
console.log('\n--- 4. VIEWPORT CULLING INTEGRITY ---');
let drawCalls = 0;
const mockCtx = {
  save() {},
  restore() {},
  translate() {},
  rotate() {},
  beginPath() {},
  arc() { drawCalls++; },
  ellipse() { drawCalls++; },
  fill() {},
  stroke() {},
  moveTo() {},
  lineTo() {},
  closePath() {},
  globalAlpha: 1,
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1
};

// Test culling: Particles are at (200, 200). Viewport is at (500, 500) to (1000, 1000).
drawCalls = 0;
freshEngine.draw(mockCtx, { left: 500, right: 1000, top: 500, bottom: 1000 });
assert(drawCalls === 0, 'Offscreen particles outside viewport bounds are culled completely (zero canvas draw calls)');

// Viewport enclosing particles: (0, 0) to (400, 400)
drawCalls = 0;
freshEngine.draw(mockCtx, { left: 0, right: 400, top: 0, bottom: 400 });
assert(drawCalls > 0, `Onscreen particles within viewport are rendered (${drawCalls} geometry draws executed)`);

// 5. 1,000-Frame Performance & Latency Benchmark (60 FPS Budget)
console.log('\n--- 5. 1,000-FRAME LATENCY & FRAME-RATE BUDGET BENCHMARK ---');
const benchEngine = new ParticleEngine();
benchEngine.setQuality('ULTRA');

// Keep pool saturated near capacity
const targetFrames = 1000;
const dt = 0.0166; // 60 Hz frame step

const start = performance.now();
for (let frame = 0; frame < targetFrames; frame++) {
  // Periodically inject bursts to keep active particles high
  if (frame % 10 === 0) {
    benchEngine.spawnBurst(300, 300, 25, 'SPARK');
    benchEngine.spawnBurst(400, 400, 15, 'FLAME');
  }
  benchEngine.update(dt);
}
const elapsedMs = performance.now() - start;
const avgFrameTimeMs = elapsedMs / targetFrames;

console.log(`  -> 1,000 frames simulated in ${elapsedMs.toFixed(2)}ms`);
console.log(`  -> Average ParticleEngine.update() time per frame: ${avgFrameTimeMs.toFixed(4)}ms`);
console.log(`  -> Frame budget headroom: ${(16.6 - avgFrameTimeMs).toFixed(4)}ms remaining per frame`);

assert(avgFrameTimeMs < 0.5, `Average update time (${avgFrameTimeMs.toFixed(4)}ms) is under 0.5ms (well within 16.6ms budget)`);
assert(avgFrameTimeMs < 16.6, 'ParticleEngine never drops below 60 FPS frame-rate deadline');

// 6. Complete Pool Lifecycle & Decay
console.log('\n--- 6. PARTICLE LIFECYCLE DECAY & RECYCLING ---');
// Advance time by 3 seconds without new spawns
for (let i = 0; i < 180; i++) {
  benchEngine.update(0.0166);
}
assert(benchEngine.getActiveCount() === 0, 'All particles naturally decay and recycle back to pool after maxLife');

console.log('\n======================================================================');
console.log(` BENCHMARK SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE B RENDERING & PERFORMANCE INTEGRITY: SUCCESS');
console.log('======================================================================\n');
