// tests/test-production-server-serving.mjs
// Verifies production unified HTTP server: API routes, static asset serving, MIME types, and SPA fallback

import assert from 'node:assert';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { spawn, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- TEST: Production Server Static Asset Serving & SPA Fallback ---');

// Ensure dist/ exists with an index.html for testing
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
const testIndexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(testIndexPath)) {
  fs.writeFileSync(testIndexPath, '<!DOCTYPE html><html><head><title>Elementa Test</title></head><body><div id="root"></div></body></html>', 'utf-8');
}

// Start server process on test port
const testPort = 3105;
const serverProcess = spawn('npx', ['tsx', 'server/src/server.ts'], {
  cwd: rootDir,
  env: { ...process.env, PORT: String(testPort), NODE_ENV: 'production' },
  shell: true
});

let serverStarted = false;

serverProcess.stdout.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('ELEMENTA SERVER') && msg.includes(String(testPort))) {
    serverStarted = true;
  }
});

serverProcess.stderr.on('data', (data) => {
  // console.error('[Server Error Output]:', data.toString());
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function get(pathStr) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${testPort}${pathStr}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });
}

async function run() {
  // Wait up to 5 seconds for server to start
  const startTime = Date.now();
  while (!serverStarted && Date.now() - startTime < 6000) {
    await sleep(200);
  }

  try {
    // 1. Check /api/health
    console.log('1. Verifying /api/health endpoint...');
    const health = await get('/api/health');
    assert.strictEqual(health.statusCode, 200, 'Health endpoint should return 200');
    const healthJson = JSON.parse(health.body);
    assert.strictEqual(healthJson.status, 'ok', 'Health status should be ok');
    console.log('   ✓ /api/health returned 200 OK with valid JSON');

    // 2. Check Root / returns dist/index.html with text/html
    console.log('2. Verifying Root / serves index.html...');
    const rootRes = await get('/');
    assert.strictEqual(rootRes.statusCode, 200, 'Root / should return 200');
    assert.ok(rootRes.headers['content-type']?.includes('text/html'), 'Content-type must be text/html');
    assert.ok(rootRes.body.includes('<div id="root">') || rootRes.body.includes('<!DOCTYPE html>'), 'Body should contain HTML content');
    console.log('   ✓ Root / served index.html correctly');

    // 3. Check arbitrary route /moba-arena returns dist/index.html (SPA Fallback)
    console.log('3. Verifying SPA Fallback for /moba-arena...');
    const spaRes = await get('/moba-arena');
    assert.strictEqual(spaRes.statusCode, 200, 'SPA route should return 200');
    assert.ok(spaRes.headers['content-type']?.includes('text/html'), 'Content-type must be text/html');
    assert.ok(spaRes.body.includes('<!DOCTYPE html>'), 'SPA fallback should serve index.html');
    console.log('   ✓ SPA Fallback returned 200 with index.html');

    // 4. Check that non-existent API routes still return 404
    console.log('4. Verifying non-existent API routes return 404...');
    const api404Res = await get('/api/non-existent-route-12345');
    assert.strictEqual(api404Res.statusCode, 404, 'API 404 should return 404');
    console.log('   ✓ Non-existent API route returned 404');

    console.log('\n>>> ALL PRODUCTION SERVER VERIFICATIONS PASSED! <<<');
  } finally {
    if (serverProcess && serverProcess.pid) {
      try {
        if (process.platform === 'win32') {
          execSync(`taskkill /pid ${serverProcess.pid} /t /f`, { stdio: 'ignore' });
        } else {
          serverProcess.kill('SIGKILL');
        }
      } catch {
        serverProcess.kill();
      }
    }
  }
}

run().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('Server test failed:', err);
  if (serverProcess && serverProcess.pid) {
    try {
      execSync(`taskkill /pid ${serverProcess.pid} /t /f`, { stdio: 'ignore' });
    } catch {}
  }
  process.exit(1);
});
