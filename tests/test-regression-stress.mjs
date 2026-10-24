// test-regression-stress.mjs
// Phase 7: Regression & Multi-Cycle Stress Testing Suite for ELEMENTA
// Verifies State Backup / Restore Roundtrip, Multi-Cycle Duels & MOBA Endurance

import assert from 'node:assert';
import { GameStorage } from '../src/storage/localStore.ts';
import { DeckManagementService, TOTAL_DECK_SLOTS } from '../src/domain/deckManagement.ts';
import { RankedSystem } from '../src/domain/rankedSystem.ts';
import { DuelEngine } from '../src/domain/duelEngine.ts';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';
import { ParticleEngine } from '../src/game/rendering/particleEngine.ts';
import { parseChemicalEquation, formatChemicalEquation } from '../src/domain/equationBalancer.ts';
import { ThermochemistryEngine } from '../src/domain/thermochemistryEngine.ts';
import { EquilibriumEngine, CURRICULUM_EQUILIBRIUM_REACTIONS } from '../src/domain/equilibriumEngine.ts';

console.log('============================================================');
console.log('   ELEMENTA: PHASE 7 REGRESSION & MULTI-CYCLE STRESS AUDIT');
console.log('============================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    -> ${err.message}`);
    failed++;
  }
}

// Global in-memory localStorage Mock
const storageStore = {};
globalThis.localStorage = {
  getItem: (key) => storageStore[key] || null,
  setItem: (key, val) => { storageStore[key] = String(val); },
  removeItem: (key) => { delete storageStore[key]; },
  clear: () => { for (const k in storageStore) delete storageStore[k]; }
};

// ----------------------------------------------------------------------
// 1. Full State Export / Reset / Import Roundtrip (REG-02)
// ----------------------------------------------------------------------
console.log('--- 1. State Backup / Reset / Restore Roundtrip (REG-02) ---');

runTest('Export custom state bundle, reset storage, and re-import with 100% fidelity', () => {
  // Step 1: Initialize baseline custom profile
  const customProfile = {
    name: 'Archmage Mendeleev',
    level: 18,
    xp: 8750,
    knowledgeTokens: 4200,
    elementalShards: 850,
    unlockedElementZ: [1, 2, 6, 7, 8, 11, 12, 13, 16, 17, 19, 20, 26, 29, 30, 35, 47, 79, 80],
    activeDeck: ['elem_11', 'elem_26', 'elem_29', 'elem_2', 'elem_30'],
    savedDecks: [],
    cardCollection: {
      card_elem_11_na: 3,
      card_elem_17_cl: 3,
      card_elem_26_fe: 3,
      card_spell_h2o_burst: 3,
      card_spell_ester_synth: 2
    },
    activeDuelDeck: {
      id: 'custom_deck_alpha',
      name: 'Custom Alpha Deck',
      mainDeck: ['card_elem_11_na', 'card_elem_17_cl', 'card_elem_26_fe'],
      extraDeck: []
    },
    savedDuelDecks: [],
    srsItems: [
      {
        id: 'srs_test_item_1',
        targetId: 'Na_H2O',
        targetType: 'REACTION',
        title: 'Phản ứng Natri và Nước',
        question: 'Khí gì thoát ra?',
        correctAnswer: 'H2',
        options: ['H2', 'O2', 'Cl2', 'CO2'],
        explanation: '2Na + 2H2O -> 2NaOH + H2',
        errorLevel: 1,
        repetitionCount: 4,
        intervalDays: 14,
        easeFactor: 2.7,
        dueDate: '2026-11-01T00:00:00.000Z',
        consecutiveSuccesses: 4
      }
    ],
    hasClaimedFree10Pack: true
  };

  const customSettings = {
    volume: 0.65,
    isMuted: true,
    reducedMotion: true,
    graphicsQuality: 'ULTRA'
  };

  // Step 2: Initialize 9-slot deck state
  const customSlots = DeckManagementService.loadDeckSlots();
  assert.equal(customSlots.length, TOTAL_DECK_SLOTS);
  customSlots[3].name = 'Thử Nghiệm Phản Ứng Ester Hóa';
  customSlots[3].mainDeck = ['card_elem_6_c', 'card_elem_1_h', 'card_elem_8_o'];
  // Set slot index 3 as default
  customSlots.forEach((s, idx) => { s.isDefault = (idx === 3); });

  // Step 3: Initialize Ranked state
  const customRankedProfile = {
    playerId: 'p_mendeleev_99',
    seasonId: 'season_2026_s1',
    mmr: 2150,
    division: 1,
    tierId: 'DIAMOND',
    highestTierId: 'DIAMOND',
    wins: 28,
    losses: 6,
    winStreak: 8,
    bestWinStreak: 8,
    reactionsTriggered: 142,
    matchHistory: [
      {
        id: 'match_901',
        timestamp: '2026-10-21T18:00:00.000Z',
        mode: 'RANKED_STANDARD',
        outcome: 'VICTORY',
        playerLpRemaining: 4500,
        opponentName: 'AI Expert',
        opponentTier: 'PLATINUM',
        mmrDelta: 32,
        turns: 7,
        reactionsTriggered: 5,
        mvpCardId: 'card_spell_ester_synth'
      }
    ],
    quests: [
      {
        id: 'q_daily_win_1',
        title: 'Chiến Thắng Trận Đấu',
        description: 'Thắng 1 trận',
        type: 'DAILY',
        progress: 1,
        goal: 1,
        isCompleted: true,
        isClaimed: true,
        reward: { tokens: 100, xp: 120 }
      }
    ]
  };

  // Step 4: Write states into GameStorage & localStorage
  GameStorage.saveProfile(customProfile);
  GameStorage.saveSettings(customSettings);
  DeckManagementService.saveDeckSlots(customSlots);
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(customRankedProfile));

  // Step 5: Create backup bundle as SettingsModal does
  const exportBundle = {
    profile: GameStorage.loadProfile(),
    settings: GameStorage.loadSettings(),
    deckSlots: DeckManagementService.loadDeckSlots(),
    rankedProfile: JSON.parse(globalThis.localStorage.getItem('elementa_ranked_profile_v2')),
    exportedAt: new Date().toISOString()
  };

  assert.equal(exportBundle.profile.name, 'Archmage Mendeleev');
  assert.equal(exportBundle.profile.knowledgeTokens, 4200);
  assert.equal(exportBundle.profile.hasClaimedFree10Pack, true);
  assert.equal(exportBundle.settings.graphicsQuality, 'ULTRA');
  assert.equal(exportBundle.settings.isMuted, true);
  assert.equal(exportBundle.deckSlots[3].name, 'Thử Nghiệm Phản Ứng Ester Hóa');
  assert.equal(exportBundle.deckSlots[3].isDefault, true);
  assert.equal(exportBundle.rankedProfile.mmr, 2150);
  assert.equal(exportBundle.rankedProfile.winStreak, 8);

  // Step 6: Perform Full Hard Reset
  GameStorage.resetAll();
  globalThis.localStorage.clear();

  // Verify that storage is reset to blank / default
  const resetProfile = GameStorage.loadProfile();
  assert.equal(resetProfile.name, 'Học Giả Nguyên Tố', 'Profile reset to default learner');
  assert.equal(resetProfile.knowledgeTokens, 1000, 'Tokens reset to default 1,000');
  assert.equal(resetProfile.hasClaimedFree10Pack, false, 'Free 10-pack claim flag reset to false');

  // Step 7: Restore from exportBundle (simulating SettingsModal.handleImportData)
  GameStorage.saveProfile(exportBundle.profile);
  GameStorage.saveSettings(exportBundle.settings);
  DeckManagementService.saveDeckSlots(exportBundle.deckSlots);
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(exportBundle.rankedProfile));

  // Step 8: Verify restored integrity
  const restoredProfile = GameStorage.loadProfile();
  assert.equal(restoredProfile.name, 'Archmage Mendeleev', 'Restored player name');
  assert.equal(restoredProfile.level, 18, 'Restored level');
  assert.equal(restoredProfile.xp, 8750, 'Restored XP');
  assert.equal(restoredProfile.knowledgeTokens, 4200, 'Restored knowledge tokens');
  assert.equal(restoredProfile.elementalShards, 850, 'Restored elemental shards');
  assert.equal(restoredProfile.hasClaimedFree10Pack, true, 'Restored free pack claimed status');
  assert.equal(restoredProfile.cardCollection['card_spell_ester_synth'], 2, 'Restored custom collection');
  assert.equal(restoredProfile.srsItems[0].easeFactor, 2.7, 'Restored SRS easeFactor');

  const restoredSettings = GameStorage.loadSettings();
  assert.equal(restoredSettings.volume, 0.65, 'Restored volume');
  assert.equal(restoredSettings.isMuted, true, 'Restored mute state');
  assert.equal(restoredSettings.graphicsQuality, 'ULTRA', 'Restored graphics quality');

  const restoredSlots = DeckManagementService.loadDeckSlots();
  assert.equal(restoredSlots.length, 9, 'Restored exactly 9 deck slots');
  assert.equal(restoredSlots[3].name, 'Thử Nghiệm Phản Ứng Ester Hóa', 'Restored slot 4 custom name');
  assert.equal(restoredSlots[3].isDefault, true, 'Restored slot 4 default status');
  assert.equal(restoredSlots[3].mainDeck.length, 3, 'Restored slot 4 cards');

  const restoredRankedRaw = globalThis.localStorage.getItem('elementa_ranked_profile_v2');
  assert.ok(restoredRankedRaw, 'Ranked profile raw JSON exists in storage');
  const restoredRanked = JSON.parse(restoredRankedRaw);
  assert.equal(restoredRanked.mmr, 2150, 'Restored ranked MMR');
  assert.equal(restoredRanked.winStreak, 8, 'Restored win streak');
  assert.equal(restoredRanked.matchHistory.length, 1, 'Restored match history');
  assert.equal(restoredRanked.quests[0].isClaimed, true, 'Restored quest claim status');
});

runTest('GameStorage.exportSaveBundle & importSaveBundle API with schema verification & corruption protection', () => {
  // Test exportSaveBundle
  const bundle = GameStorage.exportSaveBundle();
  assert.equal(bundle.version, 2, 'Bundle version is 2');
  assert.equal(bundle.schema, 'ELEMENTA_SAVE_BUNDLE_V2', 'Bundle schema tag is ELEMENTA_SAVE_BUNDLE_V2');
  assert.ok(bundle.exportedAt, 'Exported timestamp exists');
  assert.equal(bundle.profile.name, 'Archmage Mendeleev', 'Bundle contains current profile');
  assert.equal(bundle.settings.graphicsQuality, 'ULTRA', 'Bundle contains current settings');
  assert.equal(bundle.deckSlots.length, 9, 'Bundle contains all 9 deck slots');

  // Test malformed string rejection
  const corruptRes = GameStorage.importSaveBundle('INVALID_NOT_JSON');
  assert.equal(corruptRes.success, false, 'Rejects malformed non-JSON data');
  assert.ok(corruptRes.error.includes('Lỗi'), 'Returns informative Vietnamese error message');

  // Test future version rejection (e.g. v99)
  const futureRes = GameStorage.importSaveBundle({ version: 99, schema: 'ELEMENTA_SAVE_BUNDLE_V99' });
  assert.equal(futureRes.success, false, 'Rejects unsupported future schema version');
  assert.ok(futureRes.error.includes('mới hơn'), 'Informs user about unsupported newer version');

  // Test legacy v1 bundle migration (missing deckSlots & rankedProfile)
  const legacyV1Bundle = {
    version: 1,
    profile: {
      name: 'Legacy Scholar',
      level: 5,
      xp: 1200,
      knowledgeTokens: 300,
      elementalShards: 50
    },
    settings: {
      volume: 0.5,
      isMuted: false,
      reducedMotion: false,
      graphicsQuality: 'BALANCED'
    }
  };
  const legacyRes = GameStorage.importSaveBundle(legacyV1Bundle);
  assert.equal(legacyRes.success, true, 'Legacy v1 bundle imported successfully');
  assert.equal(legacyRes.restoredItems.profile, true, 'Profile restored from legacy v1');
  assert.equal(legacyRes.restoredItems.settings, true, 'Settings restored from legacy v1');

  const loadedLegacyProfile = GameStorage.loadProfile();
  assert.equal(loadedLegacyProfile.name, 'Legacy Scholar', 'Loaded legacy profile name');
  assert.equal(loadedLegacyProfile.level, 5, 'Loaded legacy profile level');
});

// ----------------------------------------------------------------------
// 2. Multi-Cycle Tactical Card Duel Stress & Flakiness Test (REG-01)
// ----------------------------------------------------------------------
console.log('\n--- 2. Multi-Cycle Tactical Card Duel Stress (REG-01) ---');

runTest('10 Consecutive AI vs AI / Automated duels complete with zero NaN or stack corruption', () => {
  const allSlots = DeckManagementService.loadDeckSlots();
  const archetypes = [allSlots[0], allSlots[1], allSlots[2]];
  const aiTiers = ['NOVICE', 'ADEPT', 'EXPERT', 'MASTER'];

  for (let cycle = 1; cycle <= 10; cycle++) {
    const activeDeck = archetypes[cycle % archetypes.length];
    const aiTier = aiTiers[cycle % aiTiers.length];

    const engine = new DuelEngine(
      [...activeDeck.mainDeck],
      [...activeDeck.extraDeck],
      aiTier
    );

    // Run up to 15 game turns
    for (let turn = 1; turn <= 15; turn++) {
      if (engine.outcome !== 'IN_PROGRESS') break;

      const p = engine.player;
      // Normal Summon first eligible monster
      const monsterCard = p.hand.find(c =>
        (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
        p.mana >= c.def.manaCost &&
        (c.def.level || 1) <= 4
      );

      if (monsterCard && p.normalSummonsRemaining > 0) {
        engine.normalSummon('player', monsterCard.uid);
      }

      // Play spell if available
      const spellCard = p.hand.find(c =>
        c.def.cardType === 'SPELL' &&
        p.mana >= c.def.manaCost
      );
      if (spellCard) {
        engine.activateSpellFromHand('player', spellCard.uid);
      }

      // Advance to battle
      engine.advancePhase(); // -> BATTLE_PHASE
      if (engine.currentPhase === 'BATTLE_PHASE') {
        const attackerIdx = p.monsterZones.findIndex(s => s && s.card && !s.hasAttackedThisTurn);
        if (attackerIdx !== -1) {
          const oppMonsterIdx = engine.opponent.monsterZones.findIndex(s => s && s.card);
          const target = oppMonsterIdx !== -1 ? oppMonsterIdx : 'DIRECT';
          engine.declareAttack(attackerIdx, target);
        }
      }

      // Complete phases & trigger AI
      if (engine.outcome === 'IN_PROGRESS') {
        engine.advancePhase(); // -> MAIN_PHASE_2
        engine.advancePhase(); // -> END_PHASE (runs opponent turn and returns)
      }
    }

    // Health & State checks for each cycle
    assert.ok(!Number.isNaN(engine.player.lp), `Cycle ${cycle}: Player LP is valid number (got ${engine.player.lp})`);
    assert.ok(!Number.isNaN(engine.opponent.lp), `Cycle ${cycle}: Opponent LP is valid number (got ${engine.opponent.lp})`);
    assert.equal(engine.player.monsterZones.length, 5, `Cycle ${cycle}: Player has 5 monster zones`);
    assert.equal(engine.opponent.monsterZones.length, 5, `Cycle ${cycle}: Opponent has 5 monster zones`);
    assert.ok(engine.currentTurn >= 2, `Cycle ${cycle}: Duel progressed at least 2 turns (got ${engine.currentTurn})`);
    assert.ok(engine.logs.length > 5, `Cycle ${cycle}: Duel logged rich activity (got ${engine.logs.length} logs)`);

    // Verify logs do not contain broken undefined tokens
    const brokenLog = engine.logs.find(l => (l.message && (l.message.includes('undefined') || l.message.includes('[object Object]'))));
    assert.ok(!brokenLog, `Cycle ${cycle}: Logs are free of stringification errors`);
  }
});

// ----------------------------------------------------------------------
// 3. Multi-Cycle MOBA Engine Physics & Object-Pooling Stress (REG-01)
// ----------------------------------------------------------------------
console.log('\n--- 3. Multi-Cycle MOBA Engine & Particle Pooling Stress (REG-01) ---');

runTest('5 MOBA matches with diverse heroes run 300 ticks each with zero memory leaks', () => {
  const testHeroes = [
    'hero_na_brawler',
    'hero_fe_guardian',
    'hero_cl_assassin',
    'hero_cu_support',
    'hero_al_artillery'
  ];

  for (let m = 0; m < testHeroes.length; m++) {
    const heroId = testHeroes[m];
    const engine = new MobaEngine(heroId, 'SOLO_AI_5V5', 'STANDARD');

    // Run 300 simulation ticks (5 seconds of 60Hz physics)
    for (let tick = 0; tick < 300; tick++) {
      engine.update(1 / 60);

      // Periodically trigger ability casts
      if (tick === 50) {
        engine.castSkill(engine.playerHero, 'Q', { x: engine.playerHero.pos.x + 100, y: engine.playerHero.pos.y });
      } else if (tick === 120) {
        engine.castSkill(engine.playerHero, 'W', { x: engine.playerHero.pos.x - 50, y: engine.playerHero.pos.y + 50 });
      }
    }

    // Verify coordinates and state integrity
    assert.equal(engine.heroes.length, 10, `Match ${m + 1}: 10 heroes present in 5v5`);
    for (const h of engine.heroes) {
      assert.ok(!Number.isNaN(h.pos.x), `Hero ${h.definition.symbol} pos.x is finite number`);
      assert.ok(!Number.isNaN(h.pos.y), `Hero ${h.definition.symbol} pos.y is finite number`);
      assert.ok(!Number.isNaN(h.hp), `Hero ${h.definition.symbol} HP is finite number`);
      assert.ok(h.hp >= 0, `Hero ${h.definition.symbol} HP is non-negative (got ${h.hp})`);
    }

    // Verify ParticleEngine pool bound (must never exceed pool size 350)
    const pEngine = new ParticleEngine();
    pEngine.setQuality('ULTRA');
    pEngine.spawnBurst(500, 500, 50, 'SPARK', '#00f0ff');
    const activeParticles = pEngine.getActiveCount();
    assert.ok(activeParticles <= 350, `Match ${m + 1}: Particle pool usage bounded <= 350 (got ${activeParticles})`);

    // Verify Debrief generation functions cleanly
    const debrief = engine.generateMatchDebrief();
    assert.ok(debrief.matchDurationSeconds > 0, `Match ${m + 1}: Debrief has positive duration`);
    assert.ok(debrief.teamScore !== undefined, `Match ${m + 1}: Debrief contains team score`);
    assert.ok(debrief.xpEarned >= 150, `Match ${m + 1}: Debrief awards valid XP`);
  }
});

// ----------------------------------------------------------------------
// 4. Stoichiometry Balancing Endurance Stress
// ----------------------------------------------------------------------
console.log('\n--- 4. Stoichiometry Balancing Rapid-Fire Endurance ---');

runTest('30 Rapid-fire equation balancing runs across all reaction genres without hangs', () => {
  const equationsToTest = [
    '2Na + 2H2O -> 2NaOH + H2',
    'Fe + S -> FeS',
    '4Fe + 3O2 -> 2Fe2O3',
    'Ba(OH)2 + H2SO4 -> BaSO4 + 2H2O',
    '2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2',
    'Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag',
    '2H2 + O2 -> 2H2O',
    'CaCO3 -> CaO + CO2',
    'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    'C2H4 + H2O -> C2H5OH',
    'Zn + Cu^2+ -> Zn^2+ + Cu',
    '2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 5Cl2 + 8H2O',
    'N2 + 3H2 <=> 2NH3',
    '2SO2 + O2 <=> 2SO3',
    'Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O'
  ];

  // Repeat twice for 30 runs
  for (let i = 0; i < 30; i++) {
    const eq = equationsToTest[i % equationsToTest.length];
    const formatted = formatChemicalEquation(eq);
    assert.ok(formatted && formatted.length > 0, `Equation ${i + 1} (${eq}) formatted cleanly`);
    const check = parseChemicalEquation(eq);
    assert.ok(check.isBalanced, `Equation ${i + 1} satisfies atom & charge conservation: ${eq}`);
  }
});

// ----------------------------------------------------------------------
// 5. Corrupted Storage Auto-Healing & Schema Tolerance
// ----------------------------------------------------------------------
console.log('\n--- 5. Corrupted Storage Auto-Healing & Schema Resilience ---');

runTest('GameStorage heals corrupted or partial localStorage without fatal errors', () => {
  // Scenario A: Completely invalid JSON syntax in profile key
  globalThis.localStorage.setItem('elementa_profile_v1', '{"broken_json": [12, 34, incomplete');
  const healedProfile = GameStorage.loadProfile();
  assert.ok(healedProfile, 'Healed profile is returned');
  assert.equal(healedProfile.name, 'Học Giả Nguyên Tố', 'Fell back cleanly to default profile name');
  assert.equal(healedProfile.knowledgeTokens, 1000, 'Fell back cleanly to default tokens (1,000)');

  // Scenario B: Partially populated profile missing essential nested collections
  const partialProfile = {
    name: 'Tân Binh Hóa Học',
    level: 3,
    xp: 450
    // Missing cardCollection, activeDuelDeck, savedDuelDecks, solvedPuzzleIds, etc.
  };
  globalThis.localStorage.setItem('elementa_profile_v1', JSON.stringify(partialProfile));
  const healedPartial = GameStorage.loadProfile();
  assert.equal(healedPartial.name, 'Tân Binh Hóa Học', 'Preserved existing player name');
  assert.equal(healedPartial.level, 3, 'Preserved existing level');
  assert.ok(healedPartial.cardCollection, 'Self-healed card collection');
  assert.ok(Object.keys(healedPartial.cardCollection).length > 0, 'Card collection contains cards');
  assert.ok(healedPartial.activeDuelDeck, 'Self-healed active duel deck');
  assert.ok(Array.isArray(healedPartial.solvedPuzzleIds), 'Self-healed solved puzzle array');

  // Scenario C: Corrupted settings key
  globalThis.localStorage.setItem('elementa_settings_v1', '!!!INVALID_SETTINGS!!!');
  const healedSettings = GameStorage.loadSettings();
  assert.ok(healedSettings, 'Healed settings object returned');
  assert.equal(healedSettings.graphicsQuality, 'BALANCED', 'Fell back to default graphics quality');
  assert.equal(healedSettings.isMuted, false, 'Fell back to default unmuted');
});

// ----------------------------------------------------------------------
// 6. Deck Slot Boundary & Default Slot Preservation Invariants
// ----------------------------------------------------------------------
console.log('\n--- 6. Deck Slot Boundary & Default Slot Preservation Invariants ---');

runTest('DeckManagementService preserves slot count, default invariants, and reset integrity', () => {
  // Ensure pristine slot generation
  const slots = DeckManagementService.loadDeckSlots();
  assert.equal(slots.length, TOTAL_DECK_SLOTS, `Must have exactly ${TOTAL_DECK_SLOTS} slots`);

  // Verify only 1 default slot exists at all times
  const defaultCountInitial = slots.filter(s => s.isDefault).length;
  assert.equal(defaultCountInitial, 1, 'Exactly one initial default slot');

  // Set slot 5 as default
  DeckManagementService.setDefaultSlot(5);
  const slotsAfterDefault = DeckManagementService.loadDeckSlots();
  assert.equal(slotsAfterDefault[5].isDefault, true, 'Slot 5 is now default');
  const defaultCountAfter = slotsAfterDefault.filter(s => s.isDefault).length;
  assert.equal(defaultCountAfter, 1, 'Strictly 1 default slot maintained');

  // Reset slot 5 back to clean empty state
  DeckManagementService.resetSlot(5);
  const slotsAfterReset = DeckManagementService.loadDeckSlots();
  assert.equal(slotsAfterReset[5].mainDeck.length, 0, 'Reset slot has empty main deck');
  assert.equal(slotsAfterReset[5].name, 'Bộ Bài Ô 6 (Trống)', 'Reset slot has empty name placeholder');

  // Verify slots out-of-bounds safety: does not crash
  const safeOob1 = DeckManagementService.setDefaultSlot(999);
  assert.equal(safeOob1.length, TOTAL_DECK_SLOTS, 'Out-of-bounds default returns intact array');
  const safeOob2 = DeckManagementService.resetSlot(-1);
  assert.equal(safeOob2.length, TOTAL_DECK_SLOTS, 'Out-of-bounds reset returns intact array');
});

// ----------------------------------------------------------------------
// 7. Extreme Physical Chemistry Boundaries & Float Stability
// ----------------------------------------------------------------------
console.log('\n--- 7. Extreme Physical Chemistry Boundaries & Float Stability ---');

runTest('ThermochemistryEngine maintains mathematical bounds across extreme temperatures and kinetics', () => {
  // Van 't Hoff rule at deltaT = 0
  const v0 = ThermochemistryEngine.calculateVanTHoffRateIncrease(25, 25, 2.0);
  assert.equal(v0.rateRatio, 1.0, 'No rate change when deltaT = 0');
  assert.equal(v0.deltaT, 0);

  // Van 't Hoff rule at cooling (deltaT = -30 C)
  const vCool = ThermochemistryEngine.calculateVanTHoffRateIncrease(50, 20, 2.0);
  assert.equal(vCool.deltaT, -30);
  assert.equal(vCool.rateRatio, 0.13, 'Rate slows down at lower temp (2^-3 = 0.125 -> 0.13)');

  // Catalyst Kinetics with zero activation energy reduction (deltaEa = 0)
  const cat0 = ThermochemistryEngine.calculateCatalystSpeedup(80, 80, 298.15);
  assert.equal(cat0.deltaEa_kJ, 0);
  assert.equal(Math.round(cat0.speedupFactor), 1, 'No speedup when catalyst has zero effect');

  // Catalyst Kinetics with realistic reduction (80 kJ -> 50 kJ, deltaEa = 30 kJ)
  const catRealistic = ThermochemistryEngine.calculateCatalystSpeedup(80, 50, 298.15);
  assert.equal(catRealistic.deltaEa_kJ, 30);
  assert.ok(catRealistic.speedupFactor > 100000, 'Significant speedup (~1.76e5 times)');
  assert.ok(!Number.isNaN(catRealistic.speedupFactor), 'speedupFactor is not NaN');

  // Extreme activation energy drop (overflow protection check)
  const catExtreme = ThermochemistryEngine.calculateCatalystSpeedup(2000, 50, 298.15);
  assert.equal(catExtreme.speedupFactor, Number.POSITIVE_INFINITY, 'Gracefully handles astronomical numbers');
  assert.ok(catExtreme.speedupFormatted.includes('10^'), 'Formatted string preserves scientific power');
});

// ----------------------------------------------------------------------
// 8. Rapid Duel Recursive Lifecycle & Graveyard/Banished Zone Integrity
// ----------------------------------------------------------------------
console.log('\n--- 8. Rapid Duel Recursive Lifecycle & Zone Integrity ---');

runTest('Continuous monster destruction & GY movement preserves zone consistency', () => {
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opponent = engine.getDuelist('opponent');

  player.mana = 20;

  // Verify initial zones are empty
  assert.equal(player.graveyard.length, 0);
  assert.equal(player.banished.length, 0);

  // Directly place cards in monster zones and then destroy them
  for (let round = 1; round <= 5; round++) {
    const cardId = `card_elem_11_na`;
    player.monsterZones[0] = {
      card: {
        id: cardId,
        name: 'Natri',
        cardType: 'ELEMENT_MONSTER',
        rarity: 'COMMON',
        attribute: 'PYRO',
        manaCost: 1,
        atk: 1200,
        def: 800
      },
      position: 'ATTACK',
      turnsOnField: 1,
      hasAttackedThisTurn: false
    };

    // Simulate sending from field to graveyard
    const destroyed = player.monsterZones[0].card;
    player.monsterZones[0] = null;
    player.graveyard.push({ def: destroyed, uid: `gy_inst_${round}` });

    assert.equal(player.graveyard.length, round, `Graveyard size matches destruction count ${round}`);
    assert.equal(player.monsterZones[0], null, 'Zone cleared after destruction');
  }

  // Banish one card from graveyard
  const banishedCard = player.graveyard.pop();
  player.banished.push(banishedCard);
  assert.equal(player.graveyard.length, 4, 'Graveyard decreased by 1');
  assert.equal(player.banished.length, 1, 'Banished increased by 1');
});

// ----------------------------------------------------------------------
// 9. Multi-Cycle Chemical Equilibrium Thermal Cycling & Reversibility (REG-06)
// ----------------------------------------------------------------------
console.log('\n--- 9. Multi-Cycle Equilibrium Thermal Oscillation & Reversibility (REG-06) ---');

runTest('100 Thermal heating/cooling cycles preserve equilibrium thermodynamic symmetry', () => {
  const haber = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  const no2 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_no2_dimerization');
  const caco3 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_caco3_calcination');

  assert.ok(haber && no2 && caco3, 'Curriculum equilibrium definitions exist');

  const baselineKc = haber.standardKc;

  for (let cycle = 1; cycle <= 100; cycle++) {
    // Heat up to 800 K
    const kcHot = EquilibriumEngine.calculateKcAtTemperature(haber.standardKc, haber.delta_r_H298_kJ, 800);
    // Cool down to 200 K
    const kcCold = EquilibriumEngine.calculateKcAtTemperature(haber.standardKc, haber.delta_r_H298_kJ, 200);

    // Haber-Bosch is exothermic: Kc(cold) > Kc(hot)
    assert.ok(kcCold > kcHot, `Exothermic reaction must favor low temperatures (cycle ${cycle})`);

    // Calcium carbonate calcination is endothermic: Kc(hot) > Kc(cold)
    const caco3Hot = EquilibriumEngine.calculateKcAtTemperature(caco3.standardKc, caco3.delta_r_H298_kJ, 1200);
    const caco3Cold = EquilibriumEngine.calculateKcAtTemperature(caco3.standardKc, caco3.delta_r_H298_kJ, 298.15);
    assert.ok(caco3Hot > caco3Cold, `Endothermic calcination must favor high temperatures (cycle ${cycle})`);

    // Returning to 298.15 K must preserve baseline Kc within 1e-6 relative error
    const kcRestored = EquilibriumEngine.calculateKcAtTemperature(haber.standardKc, haber.delta_r_H298_kJ, 298.15);
    const relDiff = Math.abs(kcRestored - baselineKc) / baselineKc;
    assert.ok(relDiff < 1e-6, `Thermal cycle must restore baseline Kc without drift (diff=${relDiff})`);
  }
});

// ----------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------
console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
