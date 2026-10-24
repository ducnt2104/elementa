// test-structured-effect-engine.mjs
// Deterministic Verification Suite for Machine-Readable Structured Effects

import { DuelEngine } from './src/domain/duelEngine.ts';
import { executeStructuredEffect } from './src/domain/structuredEffectResolver.ts';

console.log('============================================================');
console.log('   ELEMENTA: STRUCTURED EFFECT ENGINE AUDIT');
console.log('============================================================\n');

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    totalFailed++;
  }
}

// Initialize test duel
const engine = new DuelEngine();

const p1 = engine.player;
const p2 = engine.opponent;

// Test 1: DRAW_CARD opcode
{
  const initialHandSize = p1.hand.length;
  const structDef = {
    effectId: 'TEST_DRAW_2',
    activationWindow: 'IGNITION',
    operations: [
      { op: 'DRAW_CARD', params: { amount: 2 } }
    ],
    description: 'Rút 2 lá bài.'
  };

  const res = executeStructuredEffect(engine, 'player', { chainIndex: 1, cardInstance: null, activatorPlayerId: 'player', spellSpeed: 1, description: 'Test' }, structDef);
  assert(res.success === true, 'DRAW_CARD structured execution returned success');
  assert(p1.hand.length === initialHandSize + 2, `Hand size increased by 2 (from ${initialHandSize} to ${p1.hand.length})`);
}

// Test 2: BURN_DAMAGE opcode
{
  const initialLp = p2.lp;
  const structDef = {
    effectId: 'TEST_BURN_600',
    activationWindow: 'IGNITION',
    operations: [
      { op: 'BURN_DAMAGE', params: { amount: 600 } }
    ],
    description: 'Thiêu đốt 600 LP đối thủ.'
  };

  const res = executeStructuredEffect(engine, 'player', { chainIndex: 1, cardInstance: null, activatorPlayerId: 'player', spellSpeed: 1, description: 'Test' }, structDef);
  assert(res.success === true, 'BURN_DAMAGE structured execution returned success');
  assert(p2.lp === initialLp - 600, `Opponent LP reduced by 600 (from ${initialLp} to ${p2.lp})`);
}

// Test 3: HEAL_LP opcode
{
  p1.lp = 5000;
  const structDef = {
    effectId: 'TEST_HEAL_800',
    activationWindow: 'IGNITION',
    operations: [
      { op: 'HEAL_LP', params: { amount: 800 } }
    ],
    description: 'Hồi 800 LP.'
  };

  const res = executeStructuredEffect(engine, 'player', { chainIndex: 1, cardInstance: null, activatorPlayerId: 'player', spellSpeed: 1, description: 'Test' }, structDef);
  assert(res.success === true, 'HEAL_LP structured execution returned success');
  assert(p1.lp === 5800, `Player LP restored to 5800 (got ${p1.lp})`);
}

// Test 4: MODIFY_STATS (ALL_ALLIES) opcode
{
  // Place a monster in player zone 0
  p1.monsterZones[0] = {
    slotIndex: 0,
    card: {
      uid: 'test_m1',
      def: { id: 'm1', name: 'Mon 1', atk: 1500, def: 1000, cardType: 'ELEMENT_MONSTER', attribute: 'PYRO', rarity: 'COMMON', manaCost: 3, effectCode: 'NONE', effectText: '', scientificLore: '' },
      ownerId: 'player'
    },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const structDef = {
    effectId: 'TEST_BOOST_ALL',
    activationWindow: 'IGNITION',
    operations: [
      { op: 'MODIFY_STATS', params: { amount: 400, statTarget: 'ATK', targetScope: 'ALL_ALLIES' } }
    ],
    description: 'Tăng 400 ATK cho toàn bộ đồng minh.'
  };

  const res = executeStructuredEffect(engine, 'player', { chainIndex: 1, cardInstance: null, activatorPlayerId: 'player', spellSpeed: 1, description: 'Test' }, structDef);
  assert(res.success === true, 'MODIFY_STATS structured execution returned success');
  assert(p1.monsterZones[0].tempAtkBoost === 400, `Player monster gained +400 ATK boost (got ${p1.monsterZones[0].tempAtkBoost})`);
}

// Test 5: SUMMON_TOKEN opcode
{
  const structDef = {
    effectId: 'TEST_SUMMON_TOKEN',
    activationWindow: 'IGNITION',
    operations: [
      {
        op: 'SUMMON_TOKEN',
        params: {
          tokenDef: {
            name: 'Token Ion Đồng',
            name_en: 'Copper Ion Token',
            atk: 600,
            def: 400,
            level: 2,
            attribute: 'TERRA',
            chemicalFormula: 'Cu²⁺',
            scientificLore: 'Cation đồng tạo phức.'
          }
        }
      }
    ],
    description: 'Triệu hồi Token Ion.'
  };

  const res = executeStructuredEffect(engine, 'player', { chainIndex: 1, cardInstance: null, activatorPlayerId: 'player', spellSpeed: 1, description: 'Test' }, structDef);
  assert(res.success === true, 'SUMMON_TOKEN structured execution returned success');
  const hasToken = p1.monsterZones.some(z => z && z.card && z.card.def.name === 'Token Ion Đồng');
  assert(hasToken, 'Token was placed onto Player monster zone');
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('============================================================\n');

if (totalFailed > 0) {
  process.exit(1);
}
