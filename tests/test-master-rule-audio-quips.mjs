// test-master-rule-audio-quips.mjs
// Comprehensive Master Rule Audio Procedures & Character Combat Quip Audit Suite

import { sound } from '../src/audio/soundEngine.ts';
import { CharacterQuipEngine, QuipQueueManager } from '../src/domain/characterQuips.ts';

console.log('============================================================');
console.log('   ELEMENTA: MASTER RULE AUDIO & CHARACTER QUIPS AUDIT      ');
console.log('============================================================');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// GROUP 1: Master Rule Procedural Audio Engine
// ==========================================
console.log('\n--- Group 1: Master Rule Procedural Audio Pipeline ---');
{
  // 1.1 Synchro Summon Fanfare
  let synchroThrew = false;
  try {
    sound.playSynchroSummonFanfare();
  } catch (err) {
    synchroThrew = true;
  }
  assert(!synchroThrew, 'Synchro summon fanfare executes safely in headless environment');

  // 1.2 Xyz Summon Galaxy Singularity
  let xyzThrew = false;
  try {
    sound.playXyzSummonGalaxy();
  } catch (err) {
    xyzThrew = true;
  }
  assert(!xyzThrew, 'Xyz summon galaxy gravity drop executes safely in headless environment');

  // 1.3 Pendulum Swarm Solfeggio Chord
  let pendulumThrew = false;
  try {
    sound.playPendulumSwarmChord();
  } catch (err) {
    pendulumThrew = true;
  }
  assert(!pendulumThrew, 'Pendulum swarm celestial chord executes safely in headless environment');

  // 1.4 Ritual Altar Crystallization Chant
  let ritualThrew = false;
  try {
    sound.playRitualAltarChant();
  } catch (err) {
    ritualThrew = true;
  }
  assert(!ritualThrew, 'Ritual altar crystallization resonance executes safely in headless environment');

  // 1.5 Link Summon Electronic Circuit Chime
  let linkAudioThrew = false;
  try {
    sound.playLinkSummonNetwork();
  } catch (err) {
    linkAudioThrew = true;
  }
  assert(!linkAudioThrew, 'Link summon electronic circuit network audio executes safely in headless environment');

  // 1.6 Damage Step 5 Substeps Acoustic Dispatch
  for (let s = 1; s <= 5; s++) {
    let substepThrew = false;
    try {
      sound.playDamageStepSubstep(s);
    } catch {
      substepThrew = true;
    }
    assert(!substepThrew, `Damage Step Substep ${s} acoustic dispatch executes safely`);
  }

  // 1.7 Persona Fanfares
  const personas = ['MENDELEEV', 'CURIE', 'LAVOISIER', 'GENERAL', 'ALPHA', 'BETA'];
  personas.forEach(p => {
    let personaThrew = false;
    try {
      sound.playCharacterPersonaChime(p);
    } catch {
      personaThrew = true;
    }
    assert(!personaThrew, `Character persona chime for [${p}] executes safely`);
  });
}

// GROUP 2: Character Quips & Pedagogical Dialogue Engine
// ==========================================
console.log('\n--- Group 2: Character Persona Dialogue & Quip Engine ---');
{
  // 2.1 Persona Mapping
  assert(CharacterQuipEngine.mapAiLevelToPersona('MENDELEEV') === 'MENDELEEV', 'AI Level MENDELEEV maps to MENDELEEV persona');
  assert(CharacterQuipEngine.mapAiLevelToPersona('EXPERT') === 'BETA', 'AI Level EXPERT maps to BETA persona');
  assert(CharacterQuipEngine.mapAiLevelToPersona('NOVICE') === 'ALPHA', 'AI Level NOVICE maps to ALPHA persona');
  assert(CharacterQuipEngine.mapAiLevelToPersona('EXPERT', 'Viện Sĩ Marie Curie') === 'CURIE', 'Name override maps to CURIE persona');
  assert(CharacterQuipEngine.mapAiLevelToPersona('EXPERT', 'Học Giả Antoine Lavoisier') === 'LAVOISIER', 'Name override maps to LAVOISIER persona');

  // 2.2 Quip Invariants for Mendeleev
  const mendeleevMatch = CharacterQuipEngine.getQuip('MENDELEEV', 'MATCH_START');
  assert(mendeleevMatch.speaker.includes('Mendeleev'), 'Mendeleev match quip contains correct speaker');
  assert(mendeleevMatch.quoteVI.length > 10, 'Mendeleev match quip has Vietnamese text');
  assert(mendeleevMatch.scientificContextVI.includes('tuần hoàn') || mendeleevMatch.scientificContextVI.includes('Mendeleev'), 'Mendeleev match quip has periodic law context');

  const mendeleevSynchro = CharacterQuipEngine.getQuip('MENDELEEV', 'SYNCHRO_SUMMON');
  assert(mendeleevSynchro.quoteVI.includes('Bạch kim') || mendeleevSynchro.quoteVI.includes('xúc tác'), 'Mendeleev synchro quip references platinum catalysis');

  const mendeleevXyz = CharacterQuipEngine.getQuip('MENDELEEV', 'XYZ_SUMMON');
  assert(mendeleevXyz.quoteVI.includes('Cobalt') || mendeleevXyz.quoteVI.includes('phức chất'), 'Mendeleev Xyz quip references coordination complexes');

  const mendeleevPendulum = CharacterQuipEngine.getQuip('MENDELEEV', 'PENDULUM_SUMMON');
  assert(mendeleevPendulum.quoteVI.includes('acid amin') || mendeleevPendulum.quoteVI.includes('lưỡng cực'), 'Mendeleev pendulum quip references amino acid zwitterion');

  const mendeleevRitual = CharacterQuipEngine.getQuip('MENDELEEV', 'RITUAL_SUMMON');
  assert(mendeleevRitual.quoteVI.includes('Fullerene') || mendeleevRitual.quoteVI.includes('Buckyball'), 'Mendeleev ritual quip references Buckyball fullerene');

  // 2.3 Quip Invariants for Marie Curie
  const curieMatch = CharacterQuipEngine.getQuip('CURIE', 'MATCH_START');
  assert(curieMatch.speaker.includes('Curie'), 'Marie Curie match quip has correct speaker');
  assert(curieMatch.scientificContextVI.includes('Nobel'), 'Marie Curie scientific context mentions double Nobel prize');

  const curieLowHp = CharacterQuipEngine.getQuip('CURIE', 'LOW_LIFE_POINTS');
  assert(curieLowHp.quoteVI.includes('Radium') || curieLowHp.quoteVI.includes('huỳnh quang'), 'Marie Curie low-HP quip references Radium luminescence');

  // 2.4 Quip Invariants for Lavoisier
  const lavoisierMatch = CharacterQuipEngine.getQuip('LAVOISIER', 'MATCH_START');
  assert(lavoisierMatch.quoteVI.includes('Không có gì tự nhiên sinh ra') || lavoisierMatch.quoteVI.includes('chuyển hóa'), 'Lavoisier match quip cites Law of Conservation of Mass');

  const lavoisierSynchro = CharacterQuipEngine.getQuip('LAVOISIER', 'SYNCHRO_SUMMON');
  assert(lavoisierSynchro.quoteVI.includes('carbon monoxide') || lavoisierSynchro.quoteVI.includes('Oxy'), 'Lavoisier synchro quip references oxidation');
}

// GROUP 3: Concurrency & Stress Testing
// ==========================================
console.log('\n--- Group 3: Audio & Dialogue Concurrency Stress ---');
{
  let stressErrors = 0;
  for (let i = 0; i < 50; i++) {
    try {
      sound.playSynchroSummonFanfare();
      sound.playXyzSummonGalaxy();
      sound.playDamageStepSubstep(((i % 5) + 1));
      CharacterQuipEngine.getQuip('MENDELEEV', 'SYNCHRO_SUMMON');
      CharacterQuipEngine.getQuip('CURIE', 'LOW_LIFE_POINTS');
      CharacterQuipEngine.getQuip('LAVOISIER', 'XYZ_SUMMON');
    } catch {
      stressErrors++;
    }
  }
  assert(stressErrors === 0, '50 concurrent audio and dialogue dispatch cycles execute with 0 exceptions');
}

// GROUP 4: Quip Priority Governance & Queue Manager
// ==========================================
console.log('\n--- Group 4: Quip Priority Governance & Queue Manager ---');
{
  // 4.1 Priority Tiers
  assert(CharacterQuipEngine.getEventPriority('DEFEAT') === 3, 'Game resolution DEFEAT has highest priority (3)');
  assert(CharacterQuipEngine.getEventPriority('VICTORY') === 3, 'Game resolution VICTORY has highest priority (3)');
  assert(CharacterQuipEngine.getEventPriority('SYNCHRO_SUMMON') === 2, 'Tactical summon event has medium priority (2)');
  assert(CharacterQuipEngine.getEventPriority('LOW_LIFE_POINTS') === 2, 'Critical LP alert has medium priority (2)');
  assert(CharacterQuipEngine.getEventPriority('MATCH_START') === 1, 'Routine match greeting has priority 1');
  assert(CharacterQuipEngine.getEventPriority('REACTION') === 1, 'Basic reaction has priority 1');

  // 4.2 Dispatch Evaluation
  // Case A: No current quip -> Immediate DISPATCH
  assert(
    CharacterQuipEngine.evaluateQuipDispatch(null, 'MATCH_START', 0) === 'DISPATCH',
    'Dispatches immediately when no active dialogue is showing'
  );

  // Case B: Routine quip arrives while routine quip is showing (< 2500ms) -> IGNORE (no clutter)
  assert(
    CharacterQuipEngine.evaluateQuipDispatch('MATCH_START', 'REACTION', 500) === 'IGNORE',
    'Suppresses overlapping low-priority banter during active dialogue'
  );

  // Case C: Medium priority arrives while routine is showing (< 1000ms) -> QUEUE
  assert(
    CharacterQuipEngine.evaluateQuipDispatch('MATCH_START', 'SYNCHRO_SUMMON', 400) === 'QUEUE',
    'Queues high-impact summon quip during early reading window of current quip'
  );

  // Case D: Game-ending VICTORY arrives during any active dialogue -> Immediate DISPATCH (preemption)
  assert(
    CharacterQuipEngine.evaluateQuipDispatch('MATCH_START', 'VICTORY', 200) === 'DISPATCH',
    'Game-ending VICTORY immediately preempts active casual dialogue'
  );

  // 4.3 QuipQueueManager Lifecycle
  const qm = new QuipQueueManager();
  const t0 = 100000;

  // First request dispatches
  const res1 = qm.requestQuip('MENDELEEV', 'MATCH_START', t0);
  assert(res1.action === 'DISPATCH' && res1.quip !== undefined, 'First request immediately dispatches');
  assert(qm.getActiveQuip()?.persona === 'MENDELEEV', 'Active quip set to Mendeleev');

  // Second request for high-impact summon arrives at t0 + 200ms -> QUEUED
  const res2 = qm.requestQuip('CURIE', 'SYNCHRO_SUMMON', t0 + 200);
  assert(res2.action === 'QUEUED', 'Second quip successfully queued');
  assert(qm.getQueueLength() === 1, 'Queue length is exactly 1');

  // Third request for routine banter arrives at t0 + 300ms -> DROPPED (priority too low to queue)
  const res3 = qm.requestQuip('LAVOISIER', 'REACTION', t0 + 300);
  assert(res3.action === 'DROPPED', 'Routine banter dropped when queue is occupied');

  // Advance queue after 4500ms
  const next = qm.advanceQueue(t0 + 4500);
  assert(next !== null, 'advanceQueue retrieves queued quip');
  assert(next?.persona === 'CURIE', 'Retrieved quip belongs to Curie');
  assert(qm.getQueueLength() === 0, 'Queue is now empty');

  // Next advance returns null
  const emptyNext = qm.advanceQueue(t0 + 9000);
  assert(emptyNext === null, 'advanceQueue on empty queue returns null');
  assert(qm.getActiveQuip() === null, 'Active quip cleared');

  // Clean clear
  qm.requestQuip('MENDELEEV', 'MATCH_START', t0);
  qm.clear();
  assert(qm.getActiveQuip() === null, 'clear() cleanly resets active quip');
  assert(qm.getQueueLength() === 0, 'clear() cleanly purges pending queue');
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) {
  process.exit(1);
}
