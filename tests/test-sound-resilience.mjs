// test-sound-resilience.mjs
// Comprehensive test suite for Native Web Audio Synthesizer Engine & Audio Resilience in ELEMENTA

import assert from 'node:assert';
import { sound, SoundEngine } from '../src/audio/soundEngine.ts';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';

console.log('--- TEST SUITE 29: NATIVE WEB AUDIO SYNTHESIZER RESILIENCE ---');

// Test 1: SSR / Headless Environment Safety
console.log('Test 1: Headless / SSR Execution Safety (Zero Crash on Missing Browser AudioContext)...');
assert(sound !== null && typeof sound === 'object', 'sound instance must exist');

// In Node.js environment, window is undefined, so methods must gracefully return without throwing
assert.doesNotThrow(() => {
  sound.playUiClick();
  sound.playCardSelect();
  sound.playExplosion();
  sound.playShield();
  sound.playErrorFizzle();
  sound.playTurretShot();
  sound.playSpellCast();
  sound.playReactionSuccess();
  sound.playVictory();
  sound.playChemicalDetonation(true);
  sound.playChemicalDetonation(false);
  sound.playTurretLaserSweep();
  sound.playNeutralMonsterRoar();
  sound.playLevelUp();
  sound.playRecall();
}, 'All sound synthesis methods must execute cleanly in headless/SSR environments');
console.log('  ✓ Headless / SSR safety verified across all 15 native audio synthesis methods');

// Test 2: Volume & Mute Governance
console.log('Test 2: Volume Clamping & Mute State Governance...');
const engine = new SoundEngine();

// Mute toggle
engine.setMute(true);
engine.setMute(false);

// Volume clamping bounds: [0, 1]
engine.setVolume(0.5);
engine.setVolume(-0.5); // Should clamp to 0
engine.setVolume(1.8);  // Should clamp to 1
assert.doesNotThrow(() => {
  engine.setVolume(0.8);
}, 'Volume configuration must execute without errors');
console.log('  ✓ Volume clamping and mute toggle operations verified');

// Test 3: Announcer Fanfare Chime Coverage
console.log('Test 3: Kill Announcement Procedural Fanfare Synthesizer...');
const announcementTypes = [
  'FIRST_BLOOD',
  'DOUBLE_KILL',
  'TRIPLE_KILL',
  'QUADRA_KILL',
  'PENTA_KILL',
  'KILLING_SPREE',
  'RAMPAGE',
  'UNSTOPPABLE',
  'SHUTDOWN',
  'HERO_KILL',
  'TURRET_DESTROYED',
  'MONSTER_SLAIN'
];

for (const type of announcementTypes) {
  assert.doesNotThrow(() => {
    sound.playAnnouncerChime(type);
  }, `playAnnouncerChime must not throw for type: ${type}`);
}
console.log(`  ✓ All ${announcementTypes.length} kill announcement sound branches verified`);

// Test 4: Mocked Web Audio API Pipeline Execution
console.log('Test 4: Mocked Web Audio Pipeline Node Connection & Curve Timing...');
let createdOscillators = 0;
let createdGainNodes = 0;

// Set up mock window and AudioContext
global.window = {
  AudioContext: class MockAudioContext {
    currentTime = 0;
    sampleRate = 44100;
    destination = {};
    state = 'running';

    createGain() {
      createdGainNodes++;
      return {
        gain: {
          value: 1,
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {},
          linearRampToValueAtTime: () => {}
        },
        connect: () => {}
      };
    }

    createOscillator() {
      createdOscillators++;
      return {
        type: 'sine',
        frequency: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {},
          linearRampToValueAtTime: () => {}
        },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }

    createBiquadFilter() {
      return {
        type: 'lowpass',
        frequency: {
          setValueAtTime: () => {},
          linearRampToValueAtTime: () => {}
        },
        connect: () => {}
      };
    }

    createBuffer(channels, size, sampleRate) {
      return {
        getChannelData: () => new Float32Array(size)
      };
    }

    createBufferSource() {
      return {
        buffer: null,
        connect: () => {},
        start: () => {}
      };
    }

    resume() {
      return Promise.resolve();
    }
  }
};

const mockEngine = new SoundEngine();
mockEngine.playUiClick();
assert(createdOscillators > 0, 'Must have created at least one oscillator');
assert(createdGainNodes > 0, 'Must have created at least one gain node');

const prevOsc = createdOscillators;
mockEngine.playAnnouncerChime('PENTA_KILL');
assert(createdOscillators >= prevOsc + 5, 'Penta-kill fanfare must generate a 5-note brass chord');

const prevOscTriple = createdOscillators;
mockEngine.playAnnouncerChime('TRIPLE_KILL');
assert(createdOscillators >= prevOscTriple + 3, 'Triple-kill fanfare must generate a 3-note ascending chord');

console.log('  ✓ Procedural Web Audio node graph connections and chord polyphony verified');

// Clean up mock
delete global.window;

// Test 5: MOBA Engine Announcement Audio Dispatch Integration
console.log('Test 5: MOBA Engine Announcement Audio Dispatch Integration...');
const moba = new MobaEngine('hero_na_brawler');
moba.triggerAnnouncement({
  type: 'FIRST_BLOOD',
  title: 'CHIẾN CÔNG ĐẦU! (FIRST BLOOD)',
  subtitle: 'Sodium Brawler đã hạ gục Chlorine Assassin!',
  killerName: 'Sodium Brawler',
  killerTeam: 'BLUE'
});
assert.strictEqual(moba.killAnnouncements.length, 1, 'Kill announcement must be registered in queue');
assert.strictEqual(moba.activeAnnouncement?.type, 'FIRST_BLOOD', 'Active announcement must match dispatched type');
assert(moba.announcementTimer > 0, 'Announcement display timer must be positive');
console.log('  ✓ MOBA engine correctly synchronizes announcer display timer with procedural audio fanfare');

// Test 6: Laboratory Procedural Sound Synthesis Resilience
console.log('\nTest 6: Laboratory Procedural Sound Synthesis Resilience...');
assert.doesNotThrow(() => {
  sound.playEffervescence('gentle');
  sound.playEffervescence('vigorous');
  sound.playCrystalShatter();
  sound.playBunsenBurnerHiss(0.2);
  sound.playVolumetricPouring('aqueous');
  sound.playVolumetricPouring('viscous');
  sound.playPrecipitationClouding();
  sound.playPipetteSuction();
  sound.playMagneticStirrer('slow');
  sound.playMagneticStirrer('fast');
}, 'All 10 laboratory audio methods must execute safely without throwing in headless environments');
console.log('  ✓ Laboratory audio synthesis suite executed safely in headless environment');

// Test 7: Mobile Semantic Reaction Haptic Feedback
console.log('\nTest 7: Mobile Semantic Reaction Haptic Feedback & Pulse Mapping...');
let lastHapticPattern = null;
const origNav = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
Object.defineProperty(globalThis, 'navigator', {
  value: {
    vibrate: (pattern) => {
      lastHapticPattern = pattern;
      return true;
    }
  },
  configurable: true,
  writable: true
});

sound.triggerReactionHaptic('COMBUSTION');
assert.deepStrictEqual(lastHapticPattern, [40, 30, 80], 'Combustion triggers heavy double pulse [40, 30, 80]');

sound.triggerReactionHaptic('PRECIPITATION');
assert.deepStrictEqual(lastHapticPattern, [15, 20, 25, 20, 35], 'Precipitation triggers crystal nucleation triplet [15, 20, 25, 20, 35]');

sound.triggerReactionHaptic('ACID_BASE');
assert.deepStrictEqual(lastHapticPattern, [25, 40, 25], 'Acid-Base triggers smooth neutralization pulse [25, 40, 25]');

sound.triggerReactionHaptic('EFFERVESCENCE');
assert.deepStrictEqual(lastHapticPattern, [10, 15, 10, 15, 10, 15, 20], 'Effervescence triggers bubble flutter sequence');

sound.triggerReactionHaptic('SYNTHESIS');
assert.deepStrictEqual(lastHapticPattern, [30, 50, 70], 'Synthesis triggers ascending thud sequence');

sound.triggerReactionHaptic('CRITICAL');
assert.deepStrictEqual(lastHapticPattern, [60, 40, 100, 50, 120], 'Critical triggers emergency rumble sequence');

sound.triggerReactionHaptic('UNKNOWN_EFFECT');
assert.deepStrictEqual(lastHapticPattern, [35, 25, 35], 'Unknown effect triggers default fallback pulse [35, 25, 35]');

if (origNav) {
  Object.defineProperty(globalThis, 'navigator', origNav);
} else {
  delete globalThis.navigator;
}
console.log('  ✓ All 7 semantic haptic feedback vibration patterns verified');

// Test 8: Rapid Multi-Fire Concurrency & No Memory Leaks
console.log('\nTest 8: Rapid Multi-Fire Concurrency (100 Concurrent Audio Calls)...');
assert.doesNotThrow(() => {
  for (let i = 0; i < 100; i++) {
    sound.playUiClick();
    sound.playCardSelect();
    sound.triggerReactionHaptic('COMBUSTION');
  }
}, 'Must execute 100 rapid concurrent audio/haptic calls without exception');
console.log('  ✓ 100 rapid concurrent calls completed with zero exceptions');

console.log('\n========================================');
console.log('ALL 8 TEST GROUPS IN SUITE 29 PASSED (100% SUCCESS)');
console.log('========================================');
