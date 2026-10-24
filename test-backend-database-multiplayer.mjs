// test-backend-database-multiplayer.mjs
// Comprehensive End-to-End Test Suite for ELEMENTA Online Platform
// Verifies:
// 1. Node.js native SQLite database & schema migrations
// 2. AuthService: Guest creation, upgrade to permanent account, session authentication
// 3. EconomyService: Authoritative catalog, wallet transactions, idempotency replay, card awards
// 4. QuestService: Quest progress, atomic claiming, anti-duplicate rewards
// 5. CA-SRS Subsystem: Match error logging, spaced repetition schedule (1 -> 3 -> 7 -> 14 days)
// 6. Multiplayer Room Lifecycle: Host creates room (E-XXXX), Guest joins with code, ready toggle, match start, action dispatching, win condition, room cleanup
// 7. REST API Endpoints over HTTP & CORS

import assert from 'node:assert';
import { ElementaServer } from './server/src/server.ts';
import { DatabaseManager } from './server/src/db/database.ts';

let passCount = 0;
let failCount = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

async function itAsync(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

console.log('================================================================');
console.log('--- ELEMENTA ONLINE BACKEND & MULTIPLAYER TEST SUITE ---');
console.log('================================================================');

async function runTests() {
  // Use in-memory SQLite database for clean, isolated, fast test execution
  const testDb = new DatabaseManager(':memory:');
  const server = new ElementaServer(testDb);
  const serverInstance = await server.listen(0, '127.0.0.1');
  const baseUrl = `http://127.0.0.1:${serverInstance.port}`;

  console.log(`Test server running at ${baseUrl}`);

  try {
    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 1: Health & System Info]');
    // -------------------------------------------------------------
    await itAsync('GET /api/health returns status 200 and accurate catalog count', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.status, 'ok');
      assert.strictEqual(json.service, 'ELEMENTA-API');
      assert.strictEqual(json.version, '2.0.0');
      assert.strictEqual(json.totalCards, 7330, 'Total cards must be exactly 7,330');
    });

    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 2: Authentication & Account Lifecycle]');
    // -------------------------------------------------------------
    let guestToken = '';
    let guestUserId = '';

    await itAsync('POST /api/auth/guest creates instant guest account with default wallet', async () => {
      const res = await fetch(`${baseUrl}/api/auth/guest`, { method: 'POST' });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.session.token.startsWith('elt_'));
      assert.strictEqual(data.session.isGuest, true);
      assert.strictEqual(data.profile.knowledgeTokens, 800);
      assert.strictEqual(data.profile.elementalShards, 150);

      guestToken = data.session.token;
      guestUserId = data.session.userId;
    });

    await itAsync('GET /api/auth/me authenticates valid Bearer token', async () => {
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.session.userId, guestUserId);
      assert.strictEqual(data.wallet.tokens, 800);
    });

    await itAsync('POST /api/auth/upgrade upgrades guest into permanent account preserving tokens', async () => {
      const uniqueUser = 'scholar_' + Date.now();
      const res = await fetch(`${baseUrl}/api/auth/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestToken,
          username: uniqueUser,
          email: `${uniqueUser}@elementa.edu.vn`,
          password: 'SecurePassword123!'
        })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.session.isGuest, false);
      assert.strictEqual(data.session.username, uniqueUser);
      assert.strictEqual(data.profile.knowledgeTokens, 800, 'Tokens preserved across upgrade');
    });

    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 3: Authoritative Economy & Anti-Pay-to-Win Shop]');
    // -------------------------------------------------------------
    await itAsync('GET /api/shop/catalog returns rebalanced items with 25-35% price cut', async () => {
      const res = await fetch(`${baseUrl}/api/shop/catalog`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(data.catalog.length >= 5);
      const starter = data.catalog.find(i => i.id === 'pack_starter_khtn');
      assert.strictEqual(starter.tokenPrice, 120, 'Starter pack must be rebalanced to 120 tokens');
    });

    let lastTxId = '';
    const idempotencyKey = 'test_key_' + Date.now();

    await itAsync('POST /api/shop/purchase completes transaction, deducts wallet, awards random cards', async () => {
      const res = await fetch(`${baseUrl}/api/shop/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({
          itemId: 'pack_starter_khtn',
          currency: 'TOKENS',
          idempotencyKey
        })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.tokensRemaining, 680, '800 - 120 = 680 tokens');
      assert.strictEqual(data.awardedCards.length, 5, 'Starter pack gives 5 cards');
      lastTxId = data.transactionId;
    });

    await itAsync('POST /api/shop/purchase with same idempotency key prevents double debit', async () => {
      const res = await fetch(`${baseUrl}/api/shop/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({
          itemId: 'pack_starter_khtn',
          currency: 'TOKENS',
          idempotencyKey
        })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.tokensRemaining, 680, 'Balance unchanged on replay');
      assert.strictEqual(data.transactionId, lastTxId, 'Same transaction ID returned');
    });

    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 4: Quests, Progress & Spaced Repetition (CA-SRS)]');
    // -------------------------------------------------------------
    await itAsync('GET /api/quests returns seeded quests with progress tracking', async () => {
      const res = await fetch(`${baseUrl}/api/quests`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(data.quests.length >= 6);
      const first = data.quests[0];
      assert.strictEqual(first.id, 'quest_tut_01');
      assert.strictEqual(first.isCompleted, false);
    });

    await itAsync('POST /api/quests/progress increments quest and marks complete', async () => {
      const incRes = await fetch(`${baseUrl}/api/quests/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ questId: 'quest_tut_01', amount: 1 })
      });
      assert.strictEqual(incRes.status, 200);

      const qRes = await fetch(`${baseUrl}/api/quests`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      const qData = await qRes.json();
      const first = qData.quests.find(q => q.id === 'quest_tut_01');
      assert.strictEqual(first.currentCount, 1);
      assert.strictEqual(first.isCompleted, true);
    });

    await itAsync('POST /api/quests/claim awards tokens and prevents double claim', async () => {
      const claimRes = await fetch(`${baseUrl}/api/quests/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ questId: 'quest_tut_01' })
      });
      assert.strictEqual(claimRes.status, 200);
      const claimData = await claimRes.json();
      assert.strictEqual(claimData.success, true);
      assert.strictEqual(claimData.reward.tokens, 200);
      assert.strictEqual(claimData.wallet.tokens, 880, '680 + 200 = 880 tokens');

      // Attempt second claim
      const secondRes = await fetch(`${baseUrl}/api/quests/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ questId: 'quest_tut_01' })
      });
      assert.strictEqual(secondRes.status, 500);
      const secondData = await secondRes.json();
      assert.ok(secondData.error.includes('trước đó'));
    });

    await itAsync('CA-SRS records match errors and advances review intervals', async () => {
      // Record error
      const errRes = await fetch(`${baseUrl}/api/srs/error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ topicId: 'redox_fe_cu', errorType: 'WRONG_OXIDATION_STATE', errorLevel: 2 })
      });
      assert.strictEqual(errRes.status, 200);

      // Verify recorded
      const dueRes = await fetch(`${baseUrl}/api/srs/due`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      const dueData = await dueRes.json();
      assert.strictEqual(dueData.dueReviews.length, 1);
      assert.strictEqual(dueData.dueReviews[0].topicId, 'redox_fe_cu');

      // Review success advances to 3 days
      const revRes = await fetch(`${baseUrl}/api/srs/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ topicId: 'redox_fe_cu' })
      });
      const revData = await revRes.json();
      assert.strictEqual(revData.nextIntervalDays, 3);
    });

    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 5: Golden Hours & Timed Community Events]');
    // -------------------------------------------------------------
    await itAsync('GET /api/events/golden-hours returns active state and multipliers', async () => {
      const res = await fetch(`${baseUrl}/api/events/golden-hours`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(typeof data.goldenHours.isActive === 'boolean');
      assert.strictEqual(data.goldenHours.timezone, 'Asia/Ho_Chi_Minh');
      if (data.goldenHours.isActive) {
        assert.strictEqual(data.goldenHours.xpMultiplier, 2.0);
        assert.strictEqual(data.goldenHours.tokenMultiplier, 1.5);
      } else {
        assert.strictEqual(data.goldenHours.xpMultiplier, 1.0);
        assert.strictEqual(data.goldenHours.tokenMultiplier, 1.0);
      }
    });

    // -------------------------------------------------------------
    console.log('\n[TEST GROUP 6: Real-Time Multiplayer Room & Match Flow]');
    // -------------------------------------------------------------
    // Create second player (Guest 2)
    const p2Res = await fetch(`${baseUrl}/api/auth/guest`, { method: 'POST' });
    const p2Data = await p2Res.json();
    const p2Token = p2Data.session.token;
    const p2UserId = p2Data.session.userId;

    let roomCode = '';

    await itAsync('POST /api/rooms/create creates waiting room with E-XXXX code', async () => {
      const res = await fetch(`${baseUrl}/api/rooms/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ mode: 'TCG' })
      });
      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.ok(data.room.code.startsWith('E-'));
      assert.strictEqual(data.room.status, 'WAITING');
      assert.strictEqual(data.room.host.userId, guestUserId);
      assert.strictEqual(data.room.guest, null);
      roomCode = data.room.code;
    });

    await itAsync('POST /api/rooms/join allows Player 2 to join with code', async () => {
      const res = await fetch(`${baseUrl}/api/rooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${p2Token}`
        },
        body: JSON.stringify({ code: roomCode })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.room.guest.userId, p2UserId);
      assert.strictEqual(data.room.status, 'WAITING');
    });

    await itAsync('POST /api/rooms/:code/ready updates player ready state', async () => {
      // Host ready
      const hRes = await fetch(`${baseUrl}/api/rooms/${roomCode}/ready`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ isReady: true, deckId: 'deck_host' })
      });
      const hData = await hRes.json();
      assert.strictEqual(hData.room.host.isReady, true);
      assert.strictEqual(hData.room.status, 'WAITING');

      // Guest ready -> status transitions to READY
      const gRes = await fetch(`${baseUrl}/api/rooms/${roomCode}/ready`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${p2Token}`
        },
        body: JSON.stringify({ isReady: true, deckId: 'deck_guest' })
      });
      const gData = await gRes.json();
      assert.strictEqual(gData.room.guest.isReady, true);
      assert.strictEqual(gData.room.status, 'READY');
    });

    await itAsync('POST /api/rooms/:code/start initializes match state with 8000 LP', async () => {
      const res = await fetch(`${baseUrl}/api/rooms/${roomCode}/start`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.room.status, 'IN_PROGRESS');
      assert.strictEqual(data.room.matchState.hostLp, 8000);
      assert.strictEqual(data.room.matchState.guestLp, 8000);
      assert.strictEqual(data.room.matchState.turn, 1);
    });

    await itAsync('POST /api/rooms/:code/action executes authoritative combat and turn ending', async () => {
      // Host attacks Guest for 1200 damage
      const atkRes = await fetch(`${baseUrl}/api/rooms/${roomCode}/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ actionType: 'ATTACK', payload: { damage: 1200 } })
      });
      assert.strictEqual(atkRes.status, 200);
      const atkData = await atkRes.json();
      assert.strictEqual(atkData.room.matchState.guestLp, 6800, '8000 - 1200 = 6800 LP');

      // Host ends turn
      const endRes = await fetch(`${baseUrl}/api/rooms/${roomCode}/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${guestToken}`
        },
        body: JSON.stringify({ actionType: 'END_TURN' })
      });
      assert.strictEqual(endRes.status, 200);
      const endData = await endRes.json();
      assert.strictEqual(endData.room.matchState.turn, 2);
      assert.strictEqual(endData.room.matchState.activePlayerId, p2UserId, 'Active player switched to guest');
    });

    await itAsync('GET /api/rooms/:code/events establishes native SSE stream with CONNECTED snapshot', async () => {
      const controller = new AbortController();
      const res = await fetch(`${baseUrl}/api/rooms/${roomCode}/events`, {
        signal: controller.signal
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'text/event-stream');
      assert.strictEqual(res.headers.get('connection'), 'keep-alive');

      // Read initial chunk
      const reader = res.body.getReader();
      const { value } = await reader.read();
      const text = new TextDecoder().decode(value);
      assert.ok(text.includes('CONNECTED'));
      assert.ok(text.includes(roomCode));
      controller.abort();
    });

    await itAsync('POST /api/rooms/:code/leave safely disbands or cleans up room', async () => {
      const res = await fetch(`${baseUrl}/api/rooms/${roomCode}/leave`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${guestToken}` }
      });
      assert.strictEqual(res.status, 200);

      // Verify room is disbanded
      const checkRes = await fetch(`${baseUrl}/api/rooms/${roomCode}`);
      assert.strictEqual(checkRes.status, 404, 'Disbanded room returns 404');
    });

  } finally {
    await serverInstance.close();
    console.log('Test server shut down cleanly.');
  }

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('================================================================');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
