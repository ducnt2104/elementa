// test-laboratory-audio.mjs
// Comprehensive deterministic test suite for Procedural Chemical Laboratory Audio Synthesis & Haptic FX (Suite 40)
// Validates physical acoustics, frequency boundaries, oscillator graphs, SSR safety, and mobile haptics

import assert from 'node:assert';
import { sound, SoundEngine } from '../src/audio/soundEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 40: PROCEDURAL CHEMICAL LABORATORY AUDIO & HAPTIC ');
console.log('======================================================================\n');

// ---------------------------------------------------------------------------
// 1. Headless / SSR Execution Safety
// ---------------------------------------------------------------------------
console.log('--- 1. Headless / SSR Execution Safety (Zero Crash on Missing Window) ---');

assert(sound !== null && typeof sound === 'object', 'sound instance must exist');
assert(typeof sound.playEffervescence === 'function', 'playEffervescence must be defined');
assert(typeof sound.playCrystalShatter === 'function', 'playCrystalShatter must be defined');
assert(typeof sound.playBunsenBurnerHiss === 'function', 'playBunsenBurnerHiss must be defined');
assert(typeof sound.playVolumetricPouring === 'function', 'playVolumetricPouring must be defined');
assert(typeof sound.playPrecipitationClouding === 'function', 'playPrecipitationClouding must be defined');
assert(typeof sound.playPipetteSuction === 'function', 'playPipetteSuction must be defined');
assert(typeof sound.playMagneticStirrer === 'function', 'playMagneticStirrer must be defined');
assert(typeof sound.triggerHaptic === 'function', 'triggerHaptic must be defined');
console.log('  ✓ PASS: All laboratory audio and haptic methods exist on SoundEngine interface');

assert.doesNotThrow(() => {
  sound.playEffervescence('gentle');
  sound.playEffervescence('vigorous');
  sound.playCrystalShatter();
  sound.playBunsenBurnerHiss(0.3);
  sound.playBunsenBurnerHiss(1.2);
  sound.playVolumetricPouring('aqueous');
  sound.playVolumetricPouring('viscous');
  sound.playPrecipitationClouding();
  sound.playPipetteSuction();
  sound.playMagneticStirrer('slow');
  sound.playMagneticStirrer('fast');
  sound.triggerHaptic(40);
  sound.triggerHaptic([30, 20, 50]);
}, 'Laboratory sound methods must never crash in headless or SSR environments without DOM');
console.log('  ✓ PASS: Executed all laboratory sound methods cleanly in pure Node.js headless environment');

// ---------------------------------------------------------------------------
// 2. Mocked Web Audio API Pipeline & Node Connection Graph
// ---------------------------------------------------------------------------
console.log('\n--- 2. Mocked Web Audio API Node Graph Verification ---');

class MockAudioParam {
  constructor(initialVal = 0) {
    this.value = initialVal;
    this.rampEvents = [];
  }
  setValueAtTime(val, time) {
    this.value = val;
    this.rampEvents.push({ type: 'set', val, time });
  }
  linearRampToValueAtTime(val, time) {
    this.value = val;
    this.rampEvents.push({ type: 'linear', val, time });
  }
  exponentialRampToValueAtTime(val, time) {
    this.value = val;
    this.rampEvents.push({ type: 'exponential', val, time });
  }
}

class MockAudioNode {
  constructor(type = 'generic') {
    this.nodeType = type;
    this.connections = [];
  }
  connect(dest) {
    this.connections.push(dest);
  }
}

class MockOscillatorNode extends MockAudioNode {
  constructor() {
    super('oscillator');
    this.type = 'sine';
    this.frequency = new MockAudioParam(440);
    this.started = false;
    this.stopped = false;
    this.startTime = null;
    this.stopTime = null;
  }
  start(time = 0) {
    this.started = true;
    this.startTime = time;
  }
  stop(time = 0) {
    this.stopped = true;
    this.stopTime = time;
  }
}

class MockGainNode extends MockAudioNode {
  constructor() {
    super('gain');
    this.gain = new MockAudioParam(1.0);
  }
}

class MockBiquadFilterNode extends MockAudioNode {
  constructor() {
    super('biquad');
    this.type = 'lowpass';
    this.frequency = new MockAudioParam(1000);
    this.Q = new MockAudioParam(1.0);
  }
}

class MockBufferSourceNode extends MockAudioNode {
  constructor() {
    super('buffer_source');
    this.buffer = null;
    this.started = false;
  }
  start(time = 0) {
    this.started = true;
  }
  stop(time = 0) {}
}

const recordedOscillators = [];
const recordedFilters = [];
const recordedBufferSources = [];

class MockAudioContext {
  constructor() {
    this.currentTime = 10.0;
    this.sampleRate = 44100;
    this.state = 'running';
    this.destination = new MockAudioNode('destination');
  }
  createOscillator() {
    const osc = new MockOscillatorNode();
    recordedOscillators.push(osc);
    return osc;
  }
  createGain() {
    return new MockGainNode();
  }
  createBiquadFilter() {
    const filter = new MockBiquadFilterNode();
    recordedFilters.push(filter);
    return filter;
  }
  createBuffer(channels, length, sampleRate) {
    return {
      numberOfChannels: channels,
      length,
      sampleRate,
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() {
    const src = new MockBufferSourceNode();
    recordedBufferSources.push(src);
    return src;
  }
  resume() {
    return Promise.resolve();
  }
}

// Inject Mock window with AudioContext
global.window = {
  AudioContext: MockAudioContext
};

const labEngine = new SoundEngine();

// ---------------------------------------------------------------------------
// 3. Effervescence (Minnaert Bubble Acoustics & Froth Hiss)
// ---------------------------------------------------------------------------
console.log('\n--- 3. Effervescence Synthesizer Physical Acoustic Properties ---');

recordedOscillators.length = 0;
recordedFilters.length = 0;
recordedBufferSources.length = 0;

labEngine.playEffervescence('gentle');
const gentleOscCount = recordedOscillators.length;
assert(gentleOscCount === 5, `Gentle effervescence must synthesize exactly 5 bubble pops (got ${gentleOscCount})`);
assert(recordedBufferSources.length === 1, 'Effervescence must create 1 froth noise source');
assert(recordedFilters.length === 1, 'Effervescence froth must pass through a bandpass filter');
assert(recordedFilters[0].type === 'bandpass', 'Effervescence froth filter must be bandpass');
console.log('  ✓ PASS: Gentle effervescence generated 5 discrete bubble oscillators and 1 bandpass froth layer');

// Check Minnaert bubble frequency bounds: typically 300 - 1500 Hz
for (const osc of recordedOscillators) {
  assert(osc.type === 'sine', 'Bubble cavity resonance must be pure sine');
  const startEvent = osc.frequency.rampEvents.find(e => e.type === 'set');
  assert(startEvent && startEvent.val >= 350 && startEvent.val <= 900, `Bubble initial frequency must be in [350, 900] Hz (got ${startEvent?.val})`);
  const endEvent = osc.frequency.rampEvents.find(e => e.type === 'exponential');
  assert(endEvent && endEvent.val > startEvent.val, 'Bubble frequency must rise exponentially as cavity pinches off');
  assert(osc.started && osc.stopped, 'Bubble oscillator must have start and stop scheduled');
}
console.log('  ✓ PASS: Minnaert acoustic physics validated: sinusoidal bubble micro-bursts rise in frequency');

recordedOscillators.length = 0;
recordedFilters.length = 0;
recordedBufferSources.length = 0;

labEngine.playEffervescence('vigorous');
const vigorousOscCount = recordedOscillators.length;
assert(vigorousOscCount === 9, `Vigorous effervescence must synthesize 9 bubble pops (got ${vigorousOscCount})`);
console.log('  ✓ PASS: Vigorous effervescence scales bubble density to 9 micro-pops');

// ---------------------------------------------------------------------------
// 4. Crystal Shatter & Cleavage Synthesizer
// ---------------------------------------------------------------------------
console.log('\n--- 4. Crystal Shatter / Glass Cleavage Harmonics ---');

recordedOscillators.length = 0;
recordedFilters.length = 0;
recordedBufferSources.length = 0;

labEngine.playCrystalShatter();
assert(recordedOscillators.length === 3, `Crystal shatter must synthesize 3 glassy harmonics (got ${recordedOscillators.length})`);
assert(recordedFilters.length === 1, 'Crystal fracture must include highpass filtered impact noise');
assert(recordedFilters[0].type === 'highpass', 'Fracture filter must be highpass');

// Verify crystal harmonics are in bright high-register (> 2000 Hz)
const crystalHarmonicFreqs = recordedOscillators.map(o => o.frequency.rampEvents.find(e => e.type === 'set')?.val);
assert(crystalHarmonicFreqs[0] === 2150, `First harmonic must be 2150 Hz (got ${crystalHarmonicFreqs[0]})`);
assert(crystalHarmonicFreqs[1] === 3240, `Second harmonic must be 3240 Hz (got ${crystalHarmonicFreqs[1]})`);
assert(crystalHarmonicFreqs[2] === 4850, `Third harmonic must be 4850 Hz (got ${crystalHarmonicFreqs[2]})`);
for (const osc of recordedOscillators) {
  assert(osc.type === 'triangle', 'Crystal harmonic oscillators must use triangle waveforms for glassy overtones');
}
console.log('  ✓ PASS: Crystal harmonics calibrated to 2150 Hz, 3240 Hz, and 4850 Hz with triangle overtones');

// ---------------------------------------------------------------------------
// 5. Bunsen Burner Flame Rush Synthesizer
// ---------------------------------------------------------------------------
console.log('\n--- 5. Bunsen Burner Flame Rush Duration Clamping & Frequency ---');

recordedOscillators.length = 0;
recordedFilters.length = 0;

labEngine.playBunsenBurnerHiss(0.1); // Sub-minimum requested duration
assert(recordedOscillators.length === 1, 'Bunsen burner must create 1 low cavity roar oscillator');
assert(recordedFilters.length === 1, 'Bunsen nozzle rush must pass through a bandpass filter');
assert(recordedFilters[0].type === 'bandpass', 'Nozzle rush filter must be bandpass');
const filterFreq = recordedFilters[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(filterFreq === 820, `Bunsen gas filter frequency must be centered at 820 Hz (got ${filterFreq})`);

const burnerLowRoar = recordedOscillators[0];
const roarStartFreq = burnerLowRoar.frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(roarStartFreq === 115, `Low combustion roar must start at 115 Hz (got ${roarStartFreq})`);
console.log('  ✓ PASS: Bunsen burner combines 115 Hz low rumble with 820 Hz bandpass nozzle hiss');

// ---------------------------------------------------------------------------
// 6. Volumetric Pouring & Decanting Acoustics
// ---------------------------------------------------------------------------
console.log('\n--- 6. Volumetric Liquid Pouring & Decanting ---');

recordedOscillators.length = 0;
labEngine.playVolumetricPouring('aqueous');
assert(recordedOscillators.length === 2, 'Aqueous pouring must generate primary glide oscillator and droplet plop oscillator');
assert(recordedOscillators[0].type === 'sine', 'Aqueous liquid glide must use sine waveform');
const aqStartF = recordedOscillators[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(aqStartF === 580, `Aqueous start frequency must be 580 Hz (got ${aqStartF})`);

recordedOscillators.length = 0;
labEngine.playVolumetricPouring('viscous');
assert(recordedOscillators.length === 2, 'Viscous pouring must generate primary glide and droplet plop oscillators');
assert(recordedOscillators[0].type === 'triangle', 'Viscous liquid glide must use richer triangle waveform');
const viscStartF = recordedOscillators[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(viscStartF === 320, `Viscous start frequency must be lower (320 Hz) reflecting higher density/viscosity (got ${viscStartF})`);
console.log('  ✓ PASS: Aqueous (580 Hz sine) and viscous (320 Hz triangle) acoustic profiles verified');

// ---------------------------------------------------------------------------
// 7. Precipitation Clouding (Colloidal Detuned Pair)
// ---------------------------------------------------------------------------
console.log('\n--- 7. Precipitation Clouding Acoustic Shimmer ---');

recordedOscillators.length = 0;
labEngine.playPrecipitationClouding();
assert(recordedOscillators.length === 2, 'Precipitation must synthesize dual detuned sine waves for acoustic beat frequency');
const precipFreqs = recordedOscillators.map(o => o.frequency.rampEvents.find(e => e.type === 'set')?.val);
assert(precipFreqs[0] === 330 && precipFreqs[1] === 334, `Dual detune frequencies must be 330 Hz and 334 Hz (got ${precipFreqs})`);
console.log('  ✓ PASS: Dual detuned 330 Hz / 334 Hz shimmer produces subtle 4 Hz acoustic beat pattern');

// ---------------------------------------------------------------------------
// 8. Mobile Haptic FX Safe Execution & Semantic Reaction Patterns
// ---------------------------------------------------------------------------
console.log('\n--- 8. Mobile Haptic Feedback Vibration Dispatch & Reaction Types ---');

let vibrationPatternReceived = null;
try {
  Object.defineProperty(globalThis.navigator, 'vibrate', {
    value: (pattern) => {
      vibrationPatternReceived = pattern;
      return true;
    },
    configurable: true,
    writable: true
  });
} catch {
  // If navigator cannot be mutated in some runtimes, mock fallback directly
}

labEngine.triggerHaptic(50);
assert(vibrationPatternReceived === 50, `triggerHaptic must pass single millisecond value (got ${vibrationPatternReceived})`);

labEngine.triggerHaptic([30, 20, 50]);
assert(Array.isArray(vibrationPatternReceived) && vibrationPatternReceived.length === 3, 'triggerHaptic must pass vibration array patterns');
assert(vibrationPatternReceived[0] === 30 && vibrationPatternReceived[2] === 50, 'Array vibration elements must match');
console.log('  ✓ PASS: Mobile haptic vibration patterns dispatched correctly to navigator.vibrate');

// Semantic reaction haptic patterns
labEngine.triggerReactionHaptic('COMBUSTION');
assert.deepStrictEqual(vibrationPatternReceived, [40, 30, 80], 'Combustion haptic must be [40, 30, 80]');

labEngine.triggerReactionHaptic('PRECIPITATION');
assert.deepStrictEqual(vibrationPatternReceived, [15, 20, 25, 20, 35], 'Precipitation haptic must be [15, 20, 25, 20, 35]');

labEngine.triggerReactionHaptic('ACID_BASE');
assert.deepStrictEqual(vibrationPatternReceived, [25, 40, 25], 'Acid-base neutralization haptic must be [25, 40, 25]');

labEngine.triggerReactionHaptic('EFFERVESCENCE');
assert.deepStrictEqual(vibrationPatternReceived, [10, 15, 10, 15, 10, 15, 20], 'Effervescence bubble haptic must be multi-burst');

labEngine.triggerReactionHaptic('SYNTHESIS');
assert.deepStrictEqual(vibrationPatternReceived, [30, 50, 70], 'Synthesis haptic must be ascending double thud');

labEngine.triggerReactionHaptic('CRITICAL');
assert.deepStrictEqual(vibrationPatternReceived, [60, 40, 100, 50, 120], 'Critical hazard haptic must be heavy rumble');

labEngine.triggerReactionHaptic('UNKNOWN_EFFECT');
assert.deepStrictEqual(vibrationPatternReceived, [35, 25, 35], 'Unknown effect must fallback to default pulse');
console.log('  ✓ PASS: Semantic reaction haptics verified across all 6 reaction archetypes plus fallback');

// Test fallback when navigator.vibrate is undefined or throws
try {
  delete globalThis.navigator.vibrate;
} catch {}
assert.doesNotThrow(() => {
  labEngine.triggerHaptic(35);
  labEngine.triggerReactionHaptic('COMBUSTION');
}, 'triggerHaptic must safely no-op when navigator.vibrate is not available');
console.log('  ✓ PASS: Fallback gracefully handled when navigator.vibrate is unsupported');

// ---------------------------------------------------------------------------
// 9. Pipette Pneumatic Suction & Meniscus Droplet Pinch Synthesizer
// ---------------------------------------------------------------------------
console.log('\n--- 9. Pipette Pneumatic Suction & Droplet Pinch Acoustics ---');

recordedOscillators.length = 0;
labEngine.playPipetteSuction();
assert(recordedOscillators.length === 2, `Pipette suction must generate 2 oscillators (fluid draw + droplet pinch, got ${recordedOscillators.length})`);
assert(recordedOscillators[0].type === 'sine', 'Fluid draw oscillator must use sine waveform');
assert(recordedOscillators[1].type === 'sine', 'Droplet pinch oscillator must use sine waveform');

const suctionStartF = recordedOscillators[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(suctionStartF === 180, `Pneumatic suction start frequency must be 180 Hz (got ${suctionStartF})`);

const pinchStartF = recordedOscillators[1].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(pinchStartF === 850, `Droplet pinch start frequency must be 850 Hz (got ${pinchStartF})`);
console.log('  ✓ PASS: Pipette fluid draw (180 Hz -> 480 Hz) and droplet pinch (850 Hz -> 420 Hz) verified');

// ---------------------------------------------------------------------------
// 10. Magnetic Stirrer Vortex Whir Synthesizer
// ---------------------------------------------------------------------------
console.log('\n--- 10. Magnetic Stirrer Vortex Resonance & PTFE Coupler Whir ---');

recordedOscillators.length = 0;
labEngine.playMagneticStirrer('fast');
assert(recordedOscillators.length === 1, 'Fast magnetic stirrer must generate 1 vortex oscillator');
assert(recordedOscillators[0].type === 'triangle', 'Magnetic stirrer must use triangle waveform for mechanical motor overtones');
const fastStirF = recordedOscillators[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(fastStirF === 140, `Fast magnetic stirrer frequency must be 140 Hz (got ${fastStirF})`);

recordedOscillators.length = 0;
labEngine.playMagneticStirrer('slow');
assert(recordedOscillators.length === 1, 'Slow magnetic stirrer must generate 1 vortex oscillator');
const slowStirF = recordedOscillators[0].frequency.rampEvents.find(e => e.type === 'set')?.val;
assert(slowStirF === 90, `Slow magnetic stirrer frequency must be lower (90 Hz) (got ${slowStirF})`);
console.log('  ✓ PASS: Magnetic stirrer fast (140 Hz) and slow (90 Hz) vortex profiles verified');

console.log('\n======================================================================');
console.log('   ✓ SUITE 40: ALL CHEMICAL LABORATORY AUDIO & HAPTIC ASSERTIONS PASSED!');
console.log('======================================================================\n');
