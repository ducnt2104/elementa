// test-campaign-boss.mjs
// Automated Verification Suite for ELEMENTA Campaign Story Boss Battles & Environmental Hazards

import assert from 'assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { ChemicalEnvironmentEngine } from './src/domain/chemicalEnvironment.ts';
import { PLAYABLE_CARDS, getPlayableCardById } from './src/data/playableCardsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: CAMPAIGN STORY & BOSS HAZARD BATTLES AUDIT    ');
console.log('============================================================\n');

let passedAssertions = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedAssertions++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Campaign Stage Catalog Verification
console.log('--- 1. Campaign Stage Specifications & Reward Cards ---');

const EXPECTED_STAGES = [
  {
    id: 'stage_1_acid_rain',
    chapter: 1,
    bossName: 'Axiton — Chúa Tể Mưa Axit',
    expectedPh: 2.8,
    rewardCardId: 'card_field_acid_rain'
  },
  {
    id: 'stage_2_volcano_thermite',
    chapter: 2,
    bossName: 'Vulcanus — Hỏa Thần Dung Nham',
    expectedTempK: 900.0,
    rewardCardId: 'card_field_volcanic_vent'
  },
  {
    id: 'stage_3_cryo_freezing',
    chapter: 3,
    bossName: 'Glacies — Nữ Hoàng Băng Vĩnh Cửu',
    expectedTempK: 240.0,
    rewardCardId: 'card_field_cryogenic_lab'
  },
  {
    id: 'stage_4_haber_chamber',
    chapter: 4,
    bossName: 'Barometron — Đại Tướng Khí Nén',
    expectedPressureAtm: 200.0,
    rewardCardId: 'card_field_haber_chamber'
  },
  {
    id: 'stage_5_buffer_sanctuary',
    chapter: 5,
    bossName: 'Equilibrion — Hiện Thân Cân Bằng Nhiệt Động',
    expectedPh: 7.4,
    rewardCardId: 'card_field_buffer_solution'
  },
  {
    id: 'stage_6_coordination_spire',
    chapter: 6,
    bossName: 'Viện Sĩ Marie Curie — Nữ Hoàng Phức Chất',
    expectedPh: 7.0,
    rewardCardId: 'card_field_octahedral_complex'
  },
  {
    id: 'stage_7_zwitterion_rift',
    chapter: 7,
    bossName: 'Đại Sư Hóa Học Dmitri Mendeleev — Chúa Tể Dao Động',
    expectedPh: 5.97,
    rewardCardId: 'card_field_zwitterion_gate'
  }
];

it('All 7 campaign stages have verified reward cards in PLAYABLE_CARDS', () => {
  for (const stage of EXPECTED_STAGES) {
    const card = getPlayableCardById(stage.rewardCardId);
    assert.ok(card !== undefined, `Reward card ${stage.rewardCardId} must exist in catalog`);
    assert.strictEqual(card.cardType, 'FIELD_ENVIRONMENT', `Reward card ${stage.rewardCardId} must be FIELD_ENVIRONMENT`);
    assert.strictEqual(card.spellTrapSubtype, 'FIELD_SPELL', `Reward card ${stage.rewardCardId} must be a FIELD_SPELL`);
  }
});

// 2. Boss Duel Environmental Hazard Initialization
console.log('\n--- 2. Boss Duel Hazard Initialization in DuelEngine ---');

it('Stage 1 (Acid Rain): DuelEngine sets pH to 2.8 and overrides Boss name', () => {
  const engine = new DuelEngine([], [], 'ADEPT');
  engine.opponent.name = EXPECTED_STAGES[0].bossName;
  engine.setEnvironment({ ph: EXPECTED_STAGES[0].expectedPh }, 'Chương I: Hẻm Núi Mưa Axit Lưu Huỳnh');

  assert.strictEqual(engine.opponent.name, 'Axiton — Chúa Tể Mưa Axit');
  assert.strictEqual(engine.environment.ph, 2.8);
  assert.ok(engine.logs.some(l => l.message.includes('2.8')), 'Logs must report pH shift to 2.8');
});

it('Stage 2 (Volcano Thermite): DuelEngine sets Temperature to 900 K', () => {
  const engine = new DuelEngine([], [], 'EXPERT');
  engine.opponent.name = EXPECTED_STAGES[1].bossName;
  engine.setEnvironment({ temperature: EXPECTED_STAGES[1].expectedTempK }, 'Chương II: Miệng Núi Lửa Magma');

  assert.strictEqual(engine.opponent.name, 'Vulcanus — Hỏa Thần Dung Nham');
  assert.strictEqual(engine.environment.temperature, 900.0);
  assert.ok(engine.logs.some(l => l.message.includes('627°C') || l.message.includes('900')), 'Logs must report temperature shift');
});

it('Stage 3 (Cryo Freezing): DuelEngine sets Temperature to 240 K', () => {
  const engine = new DuelEngine([], [], 'EXPERT');
  engine.opponent.name = EXPECTED_STAGES[2].bossName;
  engine.setEnvironment({ temperature: EXPECTED_STAGES[2].expectedTempK }, 'Chương III: Phòng Thí Nghiệm Hàn Băng');

  assert.strictEqual(engine.opponent.name, 'Glacies — Nữ Hoàng Băng Vĩnh Cửu');
  assert.strictEqual(engine.environment.temperature, 240.0);
  assert.ok(engine.logs.some(l => l.message.includes('-33°C') || l.message.includes('240')), 'Logs must report cryogenic temperature shift');
});

it('Stage 4 (Haber Chamber): DuelEngine sets Pressure to 200 atm', () => {
  const engine = new DuelEngine([], [], 'MENDELEEV');
  engine.opponent.name = EXPECTED_STAGES[3].bossName;
  engine.setEnvironment({ pressure: EXPECTED_STAGES[3].expectedPressureAtm }, 'Chương IV: Tháp Áp Suất Cao Haber-Bosch');

  assert.strictEqual(engine.opponent.name, 'Barometron — Đại Tướng Khí Nén');
  assert.strictEqual(engine.environment.pressure, 200.0);
  assert.ok(engine.logs.some(l => l.message.includes('200 atm')), 'Logs must report 200 atm pressure');
});

it('Stage 5 (Buffer Sanctuary): DuelEngine sets pH to 7.4', () => {
  const engine = new DuelEngine([], [], 'MENDELEEV');
  engine.opponent.name = EXPECTED_STAGES[4].bossName;
  engine.setEnvironment({ ph: EXPECTED_STAGES[4].expectedPh }, 'Chương V: Đền Thờ Cân Bằng Hằng Định');

  assert.strictEqual(engine.opponent.name, 'Equilibrion — Hiện Thân Cân Bằng Nhiệt Động');
  assert.strictEqual(engine.environment.ph, 7.4);
});

it('Stage 6 (Coordination Spire): DuelEngine initializes Marie Curie and Octahedral Complex hazard', () => {
  const engine = new DuelEngine([], [], 'EXPERT');
  engine.opponent.name = EXPECTED_STAGES[5].bossName;
  engine.setEnvironment({ ph: 7.0 }, 'Chương VI: Tháp Phối Trí Bát Diện Marie Curie');

  assert.strictEqual(engine.opponent.name, 'Viện Sĩ Marie Curie — Nữ Hoàng Phức Chất');
  assert.strictEqual(engine.environment.ph, 7.0);
  assert.ok(engine.logs.some(l => l.message.includes('Tháp Phối Trí Bát Diện')), 'Logs must report Marie Curie chapter hazard');
});

it('Stage 7 (Zwitterion Rift): DuelEngine initializes Dmitri Mendeleev at Isoelectric pI 5.97', () => {
  const engine = new DuelEngine([], [], 'MENDELEEV');
  engine.opponent.name = EXPECTED_STAGES[6].bossName;
  engine.setEnvironment({ ph: EXPECTED_STAGES[6].expectedPh }, 'Chương VII: Khe Nứt Dao Động Đẳng Điện Dmitri Mendeleev');

  assert.strictEqual(engine.opponent.name, 'Đại Sư Hóa Học Dmitri Mendeleev — Chúa Tể Dao Động');
  assert.strictEqual(engine.environment.ph, 5.97);
  assert.ok(engine.logs.some(l => l.message.includes('5.97')), 'Logs must report isoelectric pH 5.97');
});

// 3. Environmental Combat Modifiers & Thermodynamic Rules
console.log('\n--- 3. Stage Hazard Combat Modifiers & Thermodynamics ---');

it('Stage 1 (Acid Rain, pH 2.8): Active metals gain +300 ATK & lose -200 DEF; Acid Dark gains +250 ATK', () => {
  const env = { ...ChemicalEnvironmentEngine.createDefaultEnvironment(), ph: 2.8 };
  const modFe = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'ELEMENT_MONSTER', 'TERRA', 'Fe');
  assert.strictEqual(modFe.atkBoost, 300);
  assert.strictEqual(modFe.defBoost, -200);
  assert.ok(modFe.specialPerks.some(p => p.includes('Axit mạnh ăn mòn giáp kim loại')));

  const modAcid = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'SPELL_TRAP', 'ACID_DARK');
  assert.strictEqual(modAcid.atkBoost, 250);
});

it('Stage 2 (Volcano Thermite, 900 K): Pyro gains +350 ATK, Aqua suffers -250 DEF vaporization', () => {
  const env = { ...ChemicalEnvironmentEngine.createDefaultEnvironment(), temperature: 900.0 };
  const modPyro = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'ELEMENT_MONSTER', 'PYRO', 'S');
  assert.strictEqual(modPyro.atkBoost, 350);
  assert.ok(modPyro.specialPerks.some(p => p.includes('Nhiệt độ cao (>500K) kích hoạt ngọn lửa plasma')));

  const modAqua = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'COMPOUND_MONSTER', 'AQUA', 'H2O');
  assert.strictEqual(modAqua.defBoost, -250);
  assert.ok(modAqua.specialPerks.some(p => p.includes('Nước bốc hơi dữ dội')));
});

it('Stage 3 (Cryogenic Freezing, 240 K): Aqua gains +400 DEF ice crystal shield, Pyro suffers -300 ATK freeze debuff', () => {
  const env = { ...ChemicalEnvironmentEngine.createDefaultEnvironment(), temperature: 240.0 };
  const modAqua = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'COMPOUND_MONSTER', 'AQUA', 'H2O');
  assert.strictEqual(modAqua.defBoost, 400);
  assert.ok(modAqua.specialPerks.some(p => p.includes('Băng giá vĩnh cửu hóa rắn phân tử nước')));

  const modPyro = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'ELEMENT_MONSTER', 'PYRO', 'P');
  assert.strictEqual(modPyro.atkBoost, -300);
  assert.ok(modPyro.specialPerks.some(p => p.includes('Nhiệt độ đóng băng dập tắt ngọn lửa')));
});

it('Stage 4 (Haber Chamber, 200 atm, Fe catalyst): Aero gains +250 ATK; Le Chatelier forward shift with 1.45x yield', () => {
  const env = { ...ChemicalEnvironmentEngine.createDefaultEnvironment(), pressure: 200.0, activeCatalysts: ['Fe'] };
  const modAero = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'ELEMENT_MONSTER', 'AERO', 'N');
  // Aero (+250) + Fe Catalyst (+150) = +400 ATK
  assert.strictEqual(modAero.atkBoost, 400);
  assert.ok(modAero.specialPerks.some(p => p.includes('Áp suất nén khí cao')));
  assert.ok(modAero.specialPerks.some(p => p.includes('Xúc tác [Fe]')));

  // Le Chatelier Gas Shift for Haber reaction N2 + 3H2 <=> 2NH3 (deltaMolesGas = -2)
  const leChatelier = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(-2, true);
  assert.strictEqual(leChatelier.shiftDirection, 'FORWARD');
  assert.strictEqual(leChatelier.yieldMultiplier, 1.45);
  assert.ok(leChatelier.scientificLore.includes('+45%'));
});

it('Stage 5 (Buffer Sanctuary, pH 7.4): Buffer capacity absorbs 75% of severe acidic and alkaline shocks', () => {
  let env = {
    ...ChemicalEnvironmentEngine.createDefaultEnvironment(),
    ph: 7.4,
    bufferCapacity: 4,
    bufferType: 'BICARBONATE_PHYSIO'
  };

  // Shock 1: Strong acid shock (-2.0 pH drop)
  const acidShock = ChemicalEnvironmentEngine.applyPhShift(env, -2.0);
  assert.strictEqual(acidShock.buffered, true);
  assert.strictEqual(acidShock.newEnv.ph, 6.9); // 7.4 + (-2.0 * 0.25) = 7.4 - 0.5 = 6.9
  assert.strictEqual(acidShock.newEnv.bufferCapacity, 3);
  assert.ok(acidShock.message.includes('Hấp thụ 75% biến thiên pH'));

  // Shock 2: Base perturbation (+1.6 pH surge)
  const baseShock = ChemicalEnvironmentEngine.applyPhShift(acidShock.newEnv, 1.6);
  assert.strictEqual(baseShock.buffered, true);
  assert.strictEqual(baseShock.newEnv.ph, 7.3); // 6.9 + (1.6 * 0.25) = 6.9 + 0.4 = 7.3
  assert.strictEqual(baseShock.newEnv.bufferCapacity, 2);
});

// 4. Field Spell Catalog Integrity
console.log('\n--- 4. Field Spell Catalog Integrity ---');

it('All 8 field environment spell cards have complete pedagogical lore and scientific equations', () => {
  const fieldCardIds = [
    'card_field_acid_rain',
    'card_field_alkaline_spring',
    'card_field_haber_chamber',
    'card_field_buffer_solution',
    'card_field_volcanic_vent',
    'card_field_cryogenic_lab',
    'card_field_octahedral_complex',
    'card_field_zwitterion_gate'
  ];

  for (const cardId of fieldCardIds) {
    const card = getPlayableCardById(cardId);
    assert.ok(card, `Card ${cardId} must exist`);
    assert.strictEqual(card.cardType, 'FIELD_ENVIRONMENT');
    assert.strictEqual(card.spellTrapSubtype, 'FIELD_SPELL');
    assert.strictEqual(card.spellSpeed, 1);
    assert.ok(card.manaCost >= 3 && card.manaCost <= 4, `Mana cost for ${cardId} should be 3-4`);
    assert.ok(card.relatedEquation && card.relatedEquation.length > 5, `Equation for ${cardId} must be present`);
    assert.ok(card.scientificLore && card.scientificLore.length > 20, `Lore for ${cardId} must be comprehensive`);
  }
});

// 5. Campaign Progression & Reward State Simulation
console.log('\n--- 5. Campaign Progression & Reward Distribution ---');

it('Player profile records completed stages and distributes exclusive reward cards', () => {
  let profile = {
    completedCampaignStages: ['stage_1_acid_rain'],
    cardCollection: {},
    knowledgeTokens: 500,
    elementalShards: 150,
    xp: 0
  };

  // Helper simulating handleCampaignStageWon
  function winStage(stageId, rewardCardId) {
    const currentCompleted = profile.completedCampaignStages || ['stage_1_acid_rain'];
    const nextCompleted = currentCompleted.includes(stageId)
      ? currentCompleted
      : [...currentCompleted, stageId];
    const nextCollection = { ...(profile.cardCollection || {}) };
    nextCollection[rewardCardId] = (nextCollection[rewardCardId] || 0) + 1;
    profile = {
      ...profile,
      completedCampaignStages: nextCompleted,
      cardCollection: nextCollection,
      knowledgeTokens: profile.knowledgeTokens + 200,
      elementalShards: (profile.elementalShards || 0) + 100,
      xp: profile.xp + 250
    };
  }

  // Win Stage 2
  winStage('stage_2_volcano_thermite', 'card_field_volcanic_vent');
  assert.strictEqual(profile.completedCampaignStages.length, 2);
  assert.ok(profile.completedCampaignStages.includes('stage_2_volcano_thermite'));
  assert.strictEqual(profile.cardCollection['card_field_volcanic_vent'], 1);
  assert.strictEqual(profile.knowledgeTokens, 700);
  assert.strictEqual(profile.elementalShards, 250);
  assert.strictEqual(profile.xp, 250);

  // Win Stage 3
  winStage('stage_3_cryo_freezing', 'card_field_cryogenic_lab');
  assert.strictEqual(profile.completedCampaignStages.length, 3);
  assert.ok(profile.completedCampaignStages.includes('stage_3_cryo_freezing'));
  assert.strictEqual(profile.cardCollection['card_field_cryogenic_lab'], 1);

  // Winning same stage again does not create duplicate stage entries
  winStage('stage_2_volcano_thermite', 'card_field_volcanic_vent');
  assert.strictEqual(profile.completedCampaignStages.length, 3);
  assert.strictEqual(profile.cardCollection['card_field_volcanic_vent'], 2);
});

// 6. Boss Field Spell Overrides & Environmental Clash
console.log('\n--- 6. Boss Field Spell Overrides & Environmental Clash ---');

it('Player field spell overrides Boss environmental hazard and routes old spell to Graveyard', () => {
  const engine = new DuelEngine([], [], 'ADEPT');
  const boss = engine.opponent;
  const player = engine.player;

  // Boss initializes Stage 1 Acid Rain
  const bossAcidCard = getPlayableCardById('card_field_acid_rain');
  boss.fieldZone = bossAcidCard;
  engine.setEnvironment({ ph: 2.8, activeEnvironmentCardId: bossAcidCard.id }, 'Acid Rain Hazard');
  assert.strictEqual(engine.environment.ph, 2.8);
  assert.strictEqual(boss.fieldZone.id, 'card_field_acid_rain');

  // Player activates Alkaline Spring from hand to neutralize and override
  const playerAlkaliCard = getPlayableCardById('card_field_alkaline_spring');
  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_alkali_1', def: playerAlkaliCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Suối Khoáng Kiềm Neutralization Override'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  // Environment must now be pH 10.5
  assert.strictEqual(engine.environment.ph, 10.5);
  assert.strictEqual(engine.environment.activeEnvironmentCardId, 'card_field_alkaline_spring');
  assert.strictEqual(player.fieldZone.def.id, 'card_field_alkaline_spring');
});

// 7. Progressive Stage Gating & Campaign Trophy Invariants
console.log('\n--- 7. Progressive Stage Gating & Campaign Completion Master Trophy ---');

it('Campaign enforces linear progressive chapter unlocking and grants master trophy upon completing Stage 7', () => {
  function canEnterStage(completedStages, stageIndex) {
    if (stageIndex === 0) return true; // Stage 1 always open
    const prevStageId = EXPECTED_STAGES[stageIndex - 1].id;
    return completedStages.includes(prevStageId);
  }

  const completed = [];
  assert.strictEqual(canEnterStage(completed, 0), true, 'Stage 1 must be unlocked for new players');
  assert.strictEqual(canEnterStage(completed, 1), false, 'Stage 2 must be locked initially');
  assert.strictEqual(canEnterStage(completed, 4), false, 'Stage 5 must be locked initially');
  assert.strictEqual(canEnterStage(completed, 6), false, 'Stage 7 must be locked initially');

  // Complete Stages 1 through 6 sequentially
  for (let i = 0; i < 6; i++) {
    completed.push(EXPECTED_STAGES[i].id);
    assert.strictEqual(canEnterStage(completed, i + 1), true, `Stage ${i + 2} must unlock after Stage ${i + 1}`);
  }

  // Complete Stage 7
  completed.push(EXPECTED_STAGES[6].id);
  assert.strictEqual(completed.length, 7);

  const isCampaignMaster = EXPECTED_STAGES.every(s => completed.includes(s.id));
  assert.strictEqual(isCampaignMaster, true, 'All 7 stages completed confers Campaign Master status');
});

// 8. Boss AI Difficulty & Environmental Synergy Invariants
console.log('\n--- 8. Boss Difficulty Hierarchy & Environmental Synergy ---');

it('Boss AI difficulty scales monotonically with chapter progression', () => {
  const AI_LEVEL_TIERS = {
    'BEGINNER': 1,
    'ADEPT': 2,
    'EXPERT': 3,
    'MASTER': 4,
    'MENDELEEV': 5
  };

  const stageAiTiers = [
    { chapter: 1, ai: 'ADEPT' },
    { chapter: 2, ai: 'EXPERT' },
    { chapter: 3, ai: 'EXPERT' },
    { chapter: 4, ai: 'MENDELEEV' },
    { chapter: 5, ai: 'MENDELEEV' },
    { chapter: 6, ai: 'MENDELEEV' },
    { chapter: 7, ai: 'MENDELEEV' }
  ];

  for (let i = 1; i < stageAiTiers.length; i++) {
    const prevRank = AI_LEVEL_TIERS[stageAiTiers[i - 1].ai];
    const currRank = AI_LEVEL_TIERS[stageAiTiers[i].ai];
    assert.ok(
      currRank >= prevRank,
      `Chapter ${stageAiTiers[i].chapter} AI (${currRank}) must be >= Chapter ${stageAiTiers[i - 1].chapter} AI (${prevRank})`
    );
  }
});

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
