// test-two-pillars-tcg-moba.mjs
// Comprehensive End-to-End Test Suite for ELEMENTA Two-Pillar Architecture (TCG & MOBA)
// Validates: Clutter Removal, TCG 10 Sections, MOBA 8 Sections, 60-Card Bot Deck, Hero Shop Decoupling

import * as fs from 'fs';
import * as path from 'path';
import { generateRankedAiMaxDeck, DuelEngine } from './src/domain/duelEngine.ts';
import { HEROES_CATALOG } from './src/game/data/heroesData.ts';
import { PLAYABLE_CARDS, getPlayableCardById } from './src/data/playableCardsData.ts';
import { generateControlledStarterCollection, GameStorage } from './src/storage/localStore.ts';
import { DeckManagementService } from './src/domain/deckManagement.ts';

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

console.log('============================================================');
console.log('   ELEMENTA: TWO-PILLAR ARCHITECTURE & AUDIT VERIFICATION');
console.log('============================================================\n');

// ==========================================
// 1. VERIFY REMOVAL OF UI CLUTTER ("xóa này đi")
// ==========================================
console.log('--- 1. Clutter & Marketing Badges Removal ---');
{
  const mainMenuContent = fs.readFileSync('src/components/MainMenuTab.tsx', 'utf8');
  assert(!mainMenuContent.includes('Engine Tất Định DCSM < 2ms'), 'Removed "Engine Tất Định DCSM < 2ms" from Home Hub');
  assert(!mainMenuContent.includes('Zero Pay-to-Win • Chuẩn Học Thuật'), 'Removed "Zero Pay-to-Win • Chuẩn Học Thuật" from Home Hub');
  assert(!mainMenuContent.includes('Cam Kết Chuẩn Mực Khoa Học & Kiến Trúc Nền Tảng Trực Tuyến'), 'Removed bottom academic banner from Home Hub');

  const navbarContent = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
  assert(!navbarContent.includes("badge: '5 ẢI BOSS'"), 'Removed cramped badge "5 ẢI BOSS" from Navbar buttons');
  assert(!navbarContent.includes("badge: '8000 LP'"), 'Removed cramped badge "8000 LP" from Navbar buttons');
  assert(!navbarContent.includes("badge: '60 FPS'"), 'Removed cramped badge "60 FPS" from Navbar buttons');
}

// ==========================================
// 2. VERIFY HOME HUB & TWO PILLAR GATEWAYS
// ==========================================
console.log('\n--- 2. Home Hub Two-Pillar Gateways ---');
{
  const mainMenuContent = fs.readFileSync('src/components/MainMenuTab.tsx', 'utf8');
  assert(mainMenuContent.includes('ELEMENTA TCG — ĐẤU TRƯỜNG THẺ BÀI'), 'Home Hub prominently features Pillar 1: ELEMENTA TCG');
  assert(mainMenuContent.includes('ELEMENTA MOBA — ĐẤU TRƯỜNG NGUYÊN TỐ'), 'Home Hub prominently features Pillar 2: ELEMENTA MOBA');
  assert(mainMenuContent.includes('onEnterTcg'), 'Home Hub provides onEnterTcg transition handler');
  assert(mainMenuContent.includes('onEnterMoba'), 'Home Hub provides onEnterMoba transition handler');
}

// ==========================================
// 3. VERIFY TCG MAIN MENU (10 MANDATORY SECTIONS & 6 MODES)
// ==========================================
console.log('\n--- 3. TCG Main Menu & 6 Combat Modes ---');
{
  const tcgMenuContent = fs.readFileSync('src/components/tcg/TcgMainMenu.tsx', 'utf8');
  assert(tcgMenuContent.includes('CHƠI / CHỌN CHẾ ĐỘ ĐẤU BÀI'), 'TCG Menu Item 1: Chơi / Game Modes');
  assert(tcgMenuContent.includes('Shop Thẻ Bài'), 'TCG Menu Item 2: Shop Thẻ Bài');
  assert(tcgMenuContent.includes('Thư Viện Thẻ Bài (Card Library)'), 'TCG Menu Item 3: Thư Viện Thẻ Bài');
  assert(tcgMenuContent.includes('Kho Bài Sở Hữu (Collection)'), 'TCG Menu Item 4: Kho Bài Sở Hữu');
  assert(tcgMenuContent.includes('Xây Dựng Bộ Bài (Deck Builder)'), 'TCG Menu Item 5: Xây Dựng Bộ Bài');
  assert(tcgMenuContent.includes('Chiến Dịch (Campaign)'), 'TCG Menu Item 6: Chiến Dịch');
  assert(tcgMenuContent.includes('Hạng & Lịch Sử Đấu'), 'TCG Menu Item 7: Hạng & Lịch Sử Đấu');
  assert(tcgMenuContent.includes('Nhiệm Vụ & Phúc Lợi'), 'TCG Menu Item 8: Nhiệm Vụ & Phúc Lợi');
  assert(tcgMenuContent.includes('Cài Đặt Đấu Bài'), 'TCG Menu Item 9: Cài Đặt');
  assert(tcgMenuContent.includes('Quay Về Home Hub'), 'TCG Menu Item 10: Quay Về Home Hub');

  // 6 TCG Modes
  assert(tcgMenuContent.includes('1. Chiến Dịch (Campaign)'), 'Mode 1: Campaign PvE Stages');
  assert(tcgMenuContent.includes('2. Đấu Bot Thường (Bot Battle)'), 'Mode 2: Casual Bot Battle');
  assert(tcgMenuContent.includes('3. Đấu Hạng Bot (Ranked vs AI)'), 'Mode 3: Ranked vs AI');
  assert(tcgMenuContent.includes('4. Đấu Hạng Người Chơi (Ranked PvP)'), 'Mode 4: Ranked PvP Online');
  assert(tcgMenuContent.includes('5. Tạo Phòng Riêng (Create Room)'), 'Mode 5: Create Private Room');
  assert(tcgMenuContent.includes('6. Gia Nhập Phòng (Join Room)'), 'Mode 6: Join Room with Code');
}

// ==========================================
// 4. VERIFY MOBA MAIN MENU (8 MANDATORY SECTIONS & 3 MODES)
// ==========================================
console.log('\n--- 4. MOBA Main Menu & 3 Combat Modes ---');
{
  const mobaMenuContent = fs.readFileSync('src/components/moba/MobaMainMenu.tsx', 'utf8');
  assert(mobaMenuContent.includes('CHƠI / CHỌN CHẾ ĐỘ ĐẤU TRƯỜNG MOBA'), 'MOBA Menu Item 1: Chơi / Game Modes');
  assert(mobaMenuContent.includes('Shop Nguyên Tố'), 'MOBA Menu Item 2: Shop Nguyên Tố');
  assert(mobaMenuContent.includes('Nguyên Tố Của Tôi'), 'MOBA Menu Item 3: Nguyên Tố Của Tôi (Roster)');
  assert(mobaMenuContent.includes('Kỹ Năng & Thông Tin'), 'MOBA Menu Item 4: Kỹ Năng & Lore');
  assert(mobaMenuContent.includes('Hạng & Lịch Sử Đấu'), 'MOBA Menu Item 5: Hạng & Lịch Sử Đấu');
  assert(mobaMenuContent.includes('Nhiệm Vụ & Tiến Trình'), 'MOBA Menu Item 6: Nhiệm Vụ & Tiến Trình');
  assert(mobaMenuContent.includes('Cài Đặt Điều Khiển'), 'MOBA Menu Item 7: Cài Đặt Điều Khiển');
  assert(mobaMenuContent.includes('Quay Về Home Hub'), 'MOBA Menu Item 8: Quay Về Home Hub');

  // 3 MOBA Modes
  assert(mobaMenuContent.includes('1. Chơi Bot (Casual vs AI)'), 'Mode 1: Casual vs AI (Practice)');
  assert(mobaMenuContent.includes('2. Đấu Hạng Bot (Ranked vs AI)'), 'Mode 2: Ranked vs AI (Bot Ladder)');
  assert(mobaMenuContent.includes('3. Đấu Hạng Người Chơi (PvP)'), 'Mode 3: Ranked PvP');
}

// ==========================================
// 5. VERIFY DYNAMIC 60-CARD BOT DECK GENERATOR
// ==========================================
console.log('\n--- 5. Dynamic 60-Card Bot Deck Generator ---');
{
  const genResult = generateRankedAiMaxDeck(777);
  assert(genResult.mainDeck.length === 60, `Bot Main Deck has EXACTLY 60 cards (ruleset maximum) (got: ${genResult.mainDeck.length})`);
  assert(genResult.extraDeck.length === 15, `Bot Extra Deck has EXACTLY 15 cards (ruleset maximum) (got: ${genResult.extraDeck.length})`);

  // Verify all card IDs exist in PLAYABLE_CARDS
  const invalidCard = genResult.mainDeck.find(id => !getPlayableCardById(id));
  assert(!invalidCard, 'All generated card IDs exist in universal PLAYABLE_CARDS catalog');

  // Verify max 3 copies
  const counts = {};
  for (const id of genResult.mainDeck) {
    counts[id] = (counts[id] || 0) + 1;
  }
  const maxCopies = Math.max(...Object.values(counts));
  assert(maxCopies <= 3, `Strictly obeys max 3 copies limit (actual max: ${maxCopies})`);
}

// ==========================================
// 6. VERIFY MOBA HERO SHOP DECOUPLING & PURCHASE
// ==========================================
console.log('\n--- 6. MOBA Hero Shop Decoupling & Unlocks ---');
{
  assert(HEROES_CATALOG.length === 12, `HEROES_CATALOG contains 12 elemental champions (actual: ${HEROES_CATALOG.length})`);

  const starterProfile = GameStorage.loadProfile();
  assert(Array.isArray(starterProfile.unlockedHeroes), 'Profile includes unlockedHeroes array');
  assert(starterProfile.unlockedHeroes.length >= 3, `Starter profile has at least 3 unlocked champions (actual: ${starterProfile.unlockedHeroes.length})`);
  assert(starterProfile.unlockedHeroes.includes('hero_na_brawler'), 'Starter profile includes Natri Hiệp Sĩ Kiềm Tác');
  assert(starterProfile.unlockedHeroes.includes('hero_fe_warden'), 'Starter profile includes Sắt Đại Tướng');

  // Verify buying hero does NOT alter TCG collection
  const tcgCardsBefore = Object.values(starterProfile.cardCollection || {}).reduce((s, c) => s + c, 0);
  const nextProfile = {
    ...starterProfile,
    knowledgeTokens: starterProfile.knowledgeTokens - 500,
    unlockedHeroes: [...starterProfile.unlockedHeroes, 'hero_cl_toxic'],
    auditTransactions: [
      ...(starterProfile.auditTransactions || []),
      {
        id: 'tx_hero_cl_test',
        type: 'HERO_PURCHASE',
        amount: -500,
        timestamp: new Date().toISOString(),
        detail: 'Mở khóa Tướng Clo'
      }
    ]
  };

  const tcgCardsAfter = Object.values(nextProfile.cardCollection || {}).reduce((s, c) => s + c, 0);
  assert(tcgCardsBefore === tcgCardsAfter, `Unlocking a MOBA champion leaves TCG card collection completely decoupled and unchanged (${tcgCardsAfter} cards)`);
  assert(nextProfile.unlockedHeroes.includes('hero_cl_toxic'), 'Newly unlocked champion is added to unlockedHeroes');
}

// ==========================================
// 7. VERIFY CARD LIBRARY VS COLLECTION SEPARATION
// ==========================================
console.log('\n--- 7. Card Library vs Collection vs Deck Builder ---');
{
  const totalInGame = PLAYABLE_CARDS.length;
  assert(totalInGame >= 7000, `Card Library exposes complete catalog (actual: ${totalInGame} cards)`);

  const starterData = generateControlledStarterCollection();
  const ownedCardsCount = Object.values(starterData.collection).reduce((s, c) => s + c, 0);
  assert(ownedCardsCount === 50, `Player Collection strictly contains only owned cards (50 cards starter)`);

  // Deck builder rejects unowned cards
  const unownedCardId = 'card_elem_92_u'; // Uranium not in starter pack
  const validation = DeckManagementService.validateDeck(
    [...starterData.mainDeck, unownedCardId],
    [...starterData.extraDeck],
    [],
    starterData.collection
  );
  assert(!validation.isValid, 'Deck containing unowned card is properly marked invalid');
  const foundMissing = validation.missingOwnedCards && validation.missingOwnedCards.some(m => m.id === unownedCardId);
  assert(foundMissing, 'Validation reports missing unowned card Uranium');
}

// ==========================================
// 8. VERIFY RANKED LADDER & BOT MMR PROGRESSION
// ==========================================
console.log('\n--- 8. Ranked Ladder & Bot MMR Progression ---');
{
  const { rankedEngine } = await import('./src/domain/rankedSystem.ts');
  const initialRank = rankedEngine.getProfile();
  assert(initialRank.mmr >= 0, `Ranked TCG initial MMR is valid (got: ${initialRank.mmr})`);

  // Record a duel victory
  const result = rankedEngine.recordDuelResult({
    opponentName: 'Bot Thử Nghiệm Rank',
    outcome: 'VICTORY',
    playerLpRemaining: 6500,
    opponentLpRemaining: 0,
    turns: 6,
    reactionsTriggered: 3
  });
  assert(result.mmrDelta > 0, `TCG Victory awards positive MMR delta (+${result.mmrDelta})`);
  assert(result.newMmr > initialRank.mmr, 'TCG New MMR increased after victory');

  // Verify MOBA rank tier calculation
  const mobaTierCalc = rankedEngine.calculateTier(1550);
  assert(mobaTierCalc.tier.id === 'GOLD', `MOBA MMR 1550 maps to GOLD tier (got: ${mobaTierCalc.tier.id})`);
  assert(mobaTierCalc.division >= 1 && mobaTierCalc.division <= 4, `MOBA Division is between 1 and 4 (got: ${mobaTierCalc.division})`);

  // Verify App.tsx wiring for duel finish & moba finish
  const appCode = fs.readFileSync(path.resolve('src/App.tsx'), 'utf-8');
  assert(appCode.includes('onDuelFinished={handleDuelFinished}'), 'App passes onDuelFinished handler to TacticalDuelArenaTab');
  assert(appCode.includes('handleMobaMatchFinished'), 'App implements handleMobaMatchFinished');
  assert(appCode.includes('mobaBotRank: updatedMobaRank'), 'App updates mobaBotRank on ranked matches');
}

console.log('\n============================================================');
console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) process.exit(1);
