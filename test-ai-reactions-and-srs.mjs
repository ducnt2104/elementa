// test-ai-reactions-and-srs.mjs
// Automated Verification Suite for:
// 1. TCG Opponent AI Chemical Reaction Strategy & Cognitive Trap Avoidance
// 2. MOBA Dynamic Hero-on-Hero Chemical Reactions & Electrochemical Resistance
// 3. CA-SRS Automated Flashcard Generation from Cognitive Traps & Educational Hub Integration

import { strict as assert } from 'assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { MobaEngine } from './src/game/engine/mobaEngine.ts';
import { SpacedRepetitionService } from './src/domain/spacedRepetition.ts';
import { PLAYABLE_CARDS } from './src/data/playableCardsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: AI REACTIONS & CA-SRS PIPELINE AUDIT');
console.log('============================================================\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

// ------------------------------------------------------------
// 1. TCG OPPONENT AI CHEMICAL REACTION STRATEGY
// ------------------------------------------------------------
console.log('--- 1. TCG Opponent AI Chemical Reaction Strategy ---');

test('Opponent AI evaluates and triggers battlefield chemical reaction when conditions are met', () => {
  const engine = new DuelEngine(undefined, undefined, 'MENDELEEV');
  
  // Setup environment with water solvent
  engine.environment.solvent = 'WATER';

  // Give AI a Sodium card on field
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  assert(naDef, 'Sodium card definition must exist');

  const naInstance = {
    uid: 'test_ai_na_001',
    def: naDef,
    currentAtk: naDef.atk,
    currentDef: naDef.def,
    position: 'FACE_UP_ATTACK',
    counters: 0
  };

  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: naInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    turnSummoned: 1,
    hasChangedPositionThisTurn: false
  };

  const initialPlayerLp = engine.player.lp;

  // Execute AI Main Phase
  engine.aiPlayMainPhase();

  // Reaction should trigger 2Na + 2H2O (85 basePower * 10 = 850 damage)
  assert(engine.player.lp < initialPlayerLp, `Player LP should be reduced by reaction (was ${initialPlayerLp}, now ${engine.player.lp})`);
  assert(initialPlayerLp - engine.player.lp >= 800, `Damage dealt should be at least 800 (actual: ${initialPlayerLp - engine.player.lp})`);

  // Duel log must contain tactical reasoning and reaction announcement
  const reactionLogs = engine.logs.filter(l => l.category === 'CHEMICAL_REACTION' || l.message.includes('Tư Duy Chiến Thuật AI'));
  assert(reactionLogs.length > 0, 'Duel log must record AI tactical chemical reaction execution');
});

test('Opponent AI strictly avoids Cognitive Traps (e.g. Copper + HCl)', () => {
  const engine = new DuelEngine(undefined, undefined, 'MENDELEEV');
  
  // Setup acidic environment
  engine.environment.ph = 3.0; // Dilute Acid

  // Give AI a Copper card on field
  const cuDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_29_cu');
  assert(cuDef, 'Copper card definition must exist');

  const cuInstance = {
    uid: 'test_ai_cu_001',
    def: cuDef,
    currentAtk: cuDef.atk,
    currentDef: cuDef.def,
    position: 'FACE_UP_ATTACK',
    counters: 0
  };

  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: cuInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    turnSummoned: 1,
    hasChangedPositionThisTurn: false
  };

  const initialAiMana = engine.opponent.mana;

  // Execute AI Main Phase
  engine.aiPlayMainPhase();

  // AI must NOT trigger trap (mana penalty must be 0 from trap)
  const trapLogs = engine.logs.filter(l => l.category === 'TRAP' && l.message.includes('Bẫy Nhận Thức'));
  assert(trapLogs.length === 0, 'AI must never trigger cognitive trap Cu + HCl');
});

test('Chemical reaction lethal check ends duel immediately with Victory/Defeat', () => {
  const engine = new DuelEngine(undefined, undefined, 'EXPERT');
  engine.player.lp = 500; // Player has only 500 LP left
  engine.environment.solvent = 'WATER';

  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  const naInstance = {
    uid: 'test_ai_na_lethal',
    def: naDef,
    currentAtk: naDef.atk,
    currentDef: naDef.def,
    position: 'FACE_UP_ATTACK',
    counters: 0
  };

  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: naInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    turnSummoned: 1,
    hasChangedPositionThisTurn: false
  };

  engine.aiPlayMainPhase();

  assert(engine.player.lp === 0, 'Player LP should be reduced to 0 by lethal reaction');
  assert(engine.outcome === 'OPPONENT_VICTORY', `Outcome must be OPPONENT_VICTORY (got: ${engine.outcome})`);
});

// ------------------------------------------------------------
// 2. MOBA DYNAMIC HERO COLLISION REACTIONS & RESISTANCE
// ------------------------------------------------------------
console.log('\n--- 2. MOBA Dynamic Hero Chemical Reactions & Resistance ---');

test('MOBA dynamic hero-on-hero collision triggers authentic chemical reaction', () => {
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
  
  // Find an ally hero and an enemy hero with chemical affinity (e.g. Fe and Cl)
  const feHero = engine.heroes.find(h => h.definition.symbol === 'Fe') || engine.heroes[0];
  const clHero = engine.heroes.find(h => h.definition.symbol === 'Cl') || engine.heroes[1];
  
  // Ensure they are opposing teams
  feHero.team = 'BLUE';
  clHero.team = 'RED';
  clHero.pos = { x: 1000, y: 1000 };
  feHero.pos = { x: 1050, y: 1000 };

  const initialHp = clHero.hp;
  const initialRxCount = engine.reactionsTriggered.length;

  // Fe attacks Cl with chemical strike -> dynamic reaction resolution!
  engine.applyDirectDamage(clHero, 60, 'CHEMICAL', feHero);

  assert(clHero.hp < initialHp, 'Target hero must take damage');
  assert(engine.reactionsTriggered.length > initialRxCount, 'Dynamic reaction must be recorded in reactionsTriggered');
  
  const lastRx = engine.reactionsTriggered[engine.reactionsTriggered.length - 1];
  assert(lastRx.reactionRule, 'Reaction event must reference a verified ReactionRule');
});

test('MOBA Copper champion resists non-oxidizing acid attacks with 80% damage reduction', () => {
  const engine = new MobaEngine('hero_cu_striker', 'SOLO_AI_5V5', 'STANDARD');
  const cuHero = engine.playerHero;
  assert(cuHero.definition.symbol === 'Cu', 'Player hero must be Copper (Cu)');

  const initialHp = cuHero.hp;
  const initialTrapCount = engine.chemicalTrapsEncountered.length;

  // Attacker strikes Cu with dilute acid reaction
  const enemy = engine.heroes.find(h => h.team === 'RED');
  engine.applyDirectDamage(cuHero, 100, 'CHEMICAL', enemy, 'R03_FE_ACID');

  // Damage should be reduced by ~80% (taking <= 25 dmg)
  const dmgTaken = initialHp - cuHero.hp;
  assert(dmgTaken <= 25, `Copper should reduce acid damage by 80% (took ${dmgTaken} damage out of 100)`);
  assert(engine.chemicalTrapsEncountered.length > initialTrapCount, 'Cognitive trap must be recorded in chemicalTrapsEncountered');
  
  const trapEvent = engine.chemicalTrapsEncountered[engine.chemicalTrapsEncountered.length - 1];
  assert(trapEvent.isTrap === true, 'Trap event must have isTrap = true');
  assert(trapEvent.pedagogicalNoteVI.includes('dãy hoạt động hóa học') || trapEvent.observablePhenomenaVI.includes('không tan'), 'Must contain educational feedback');
});

// ------------------------------------------------------------
// 3. CA-SRS PIPELINE & EDUCATIONAL HUB INTEGRATION
// ------------------------------------------------------------
console.log('\n--- 3. CA-SRS Flashcard Generation & Knowledge Hub ---');

test('SpacedRepetitionService synthesizes Level 3 cognitive error cards from match mistakes', () => {
  const srsCard = SpacedRepetitionService.createItemFromMistake(
    'R06_TRAP_CU_ACID',
    'REACTION',
    'Đồng Cu tác dụng với Axit HCl loãng',
    'Tại sao phản ứng Cu + 2HCl loãng không xảy ra?',
    'Cu đứng sau Hydro trong dãy hoạt động hóa học (thế điện cực dương E° = +0.34V), không thể khử ion H+ thành H2.',
    [
      'Cu đứng sau Hydro trong dãy hoạt động hóa học (thế điện cực dương E° = +0.34V), không thể khử ion H+ thành H2.',
      'Axit clohiđric là axit yếu không phản ứng với kim loại.',
      'Nhiệt độ phòng làm đóng băng động học phân tử.',
      'Thiếu xúc tác bạch kim Pt để kích hoạt.'
    ],
    'Dãy hoạt động hóa học: K Na Ca Mg Al Zn Fe Ni Sn Pb (H) Cu Hg Ag Pt Au. Chỉ các kim loại đứng trước H mới giải phóng H2 từ axit loãng.',
    3 // Level 3 Cognitive Trap
  );

  assert(srsCard.id.startsWith('srs_'), 'SRS card must have unique generated ID');
  assert(srsCard.errorLevel === 3, 'Cognitive trap card must have errorLevel 3');
  assert(srsCard.intervalDays === 1, 'Initial interval must be 1 day');
  assert(srsCard.easeFactor === 2.5, 'Default ease factor must be 2.5');

  // Test error weight calculation for Level 3
  const omega = SpacedRepetitionService.getErrorWeight(3);
  assert(omega === 0.70, `Level 3 error weight must be 0.70 (got: ${omega})`);

  // Process a review pass
  const reviewed = SpacedRepetitionService.processReview(srsCard, true, 5);
  assert(reviewed.repetitionCount === 1, 'Repetition count should increment to 1');
  assert(reviewed.intervalDays >= 1, 'Next interval should be at least 1 day');
});

// ------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------
console.log('\n============================================================');
console.log(` RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('============================================================\n');

if (failCount > 0) {
  process.exit(1);
}
