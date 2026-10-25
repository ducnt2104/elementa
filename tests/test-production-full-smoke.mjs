// tests/test-production-full-smoke.mjs
// End-to-end production smoke test verifying HTTP, API, SQLite, and Web Assets

import assert from 'node:assert';
import http from 'node:http';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const testPort = 3110;
console.log(`=== ELEMENTA FULL PRODUCTION SMOKE TEST (PORT ${testPort}) ===\n`);

const serverProcess = spawn('npx', ['tsx', 'server/src/server.ts'], {
  cwd: rootDir,
  env: { ...process.env, PORT: String(testPort), NODE_ENV: 'production' },
  shell: true
});

let serverStarted = false;

serverProcess.stdout.on('data', (d) => {
  const str = d.toString();
  if (str.includes(String(testPort))) serverStarted = true;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: testPort,
      ...options
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function run() {
  const startTime = Date.now();
  while (!serverStarted && Date.now() - startTime < 7000) {
    await sleep(200);
  }

  try {
    // 1. Health check
    console.log('1. [SMOKE] Testing GET /api/health ...');
    const health = await request({ path: '/api/health', method: 'GET' });
    assert.strictEqual(health.statusCode, 200);
    const healthData = JSON.parse(health.body);
    assert.strictEqual(healthData.status, 'ok');
    assert.strictEqual(healthData.service, 'ELEMENTA-API');
    console.log(`   ✓ Health OK (Cards in memory: ${healthData.totalCards}, Users in DB: ${healthData.dbStats.userCount})`);

    // 2. Static Web Root
    console.log('2. [SMOKE] Testing GET / (Static Web Client) ...');
    const root = await request({ path: '/', method: 'GET' });
    assert.strictEqual(root.statusCode, 200);
    assert.ok(root.headers['content-type'].includes('text/html'));
    console.log('   ✓ Web Client SPA HTML served with 200 OK');

    // 3. Static CSS Bundle
    console.log('3. [SMOKE] Testing Static Assets Serving ...');
    const css = await request({ path: '/assets/index-DmaIww3U.css', method: 'GET' });
    assert.strictEqual(css.statusCode, 200);
    assert.ok(css.headers['content-type'].includes('text/css'));
    assert.ok(css.headers['cache-control'].includes('immutable'));
    console.log('   ✓ Immutable Asset served with Cache-Control headers');

    // 4. Card Catalog Query
    console.log('4. [SMOKE] Testing GET /api/cards?page=1&limit=5 ...');
    const cards = await request({ path: '/api/cards?page=1&limit=5', method: 'GET' });
    assert.strictEqual(cards.statusCode, 200);
    const cardsData = JSON.parse(cards.body);
    assert.strictEqual(cardsData.success, true);
    assert.strictEqual(cardsData.cards.length, 5);
    console.log(`   ✓ Cards API returned ${cardsData.total} playable cards catalog`);

    // 5. Guest Auth Session
    console.log('5. [SMOKE] Testing POST /api/auth/guest ...');
    const guestRes = await request({
      path: '/api/auth/guest',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    assert.strictEqual(guestRes.statusCode, 201);
    const guestData = JSON.parse(guestRes.body);
    assert.strictEqual(guestData.success, true);
    assert.ok(guestData.session.token);
    assert.ok(guestData.session.userId);
    console.log(`   ✓ Guest Session issued (User ID: ${guestData.session.userId})`);

    // 6. User Profile Query with Token
    console.log('6. [SMOKE] Testing GET /api/profile with Authorization Bearer ...');
    const profileRes = await request({
      path: '/api/profile',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${guestData.session.token}` }
    });
    assert.strictEqual(profileRes.statusCode, 200);
    const profileData = JSON.parse(profileRes.body);
    assert.strictEqual(profileData.success, true);
    assert.strictEqual(profileData.profile.level, 1);
    console.log(`   ✓ Profile returned: Level ${profileData.profile.level}, Tokens: ${profileData.profile.knowledgeTokens}`);

    console.log('\n======================================================');
    console.log('   ALL 6 PRODUCTION SMOKE TESTS PASSED (100% GREEN)   ');
    console.log('======================================================\n');
  } finally {
    if (serverProcess && serverProcess.pid) {
      try {
        if (process.platform === 'win32') {
          execSync(`taskkill /pid ${serverProcess.pid} /t /f`, { stdio: 'ignore' });
        } else {
          serverProcess.kill('SIGKILL');
        }
      } catch {}
    }
  }
}

run().then(() => process.exit(0)).catch((err) => {
  console.error('[Smoke Test Error]:', err);
  if (serverProcess && serverProcess.pid) {
    try {
      execSync(`taskkill /pid ${serverProcess.pid} /t /f`, { stdio: 'ignore' });
    } catch {}
  }
  process.exit(1);
});
