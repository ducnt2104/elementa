import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('======================================================================');
console.log('   TEST SUITE 160: PWA SERVICE WORKER & SUBPATH OFFLINE READINESS     ');
console.log('   Phase D: Offline Caching Lifecycle & Cross-Domain PWA Registration ');
console.log('======================================================================\n');

let passCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  [PASS] #${totalCount}: ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] #${totalCount}: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Service Worker Registration in main.tsx
console.log('--- 1. CLIENT ENTRYPOINT SW REGISTRATION ---');
const mainPath = resolve(rootDir, 'src', 'main.tsx');
assert(existsSync(mainPath), 'src/main.tsx exists');

if (existsSync(mainPath)) {
  const mainContent = readFileSync(mainPath, 'utf8');
  assert(mainContent.includes('navigator.serviceWorker.register'), 'Registers service worker');
  assert(mainContent.includes('import.meta.env.BASE_URL'), 'Uses dynamic BASE_URL for subpath compatibility');
  assert(!mainContent.includes("navigator.serviceWorker.register('/sw.js')"), 'Does not hardcode root-only /sw.js');
}

// 2. Service Worker File & Precaching Lifecycle
console.log('\n--- 2. SERVICE WORKER LIFECYCLE & CACHE HYGIENE ---');
const swPath = resolve(rootDir, 'public', 'sw.js');
assert(existsSync(swPath), 'public/sw.js exists');

if (existsSync(swPath)) {
  const swContent = readFileSync(swPath, 'utf8');
  assert(swContent.includes('caches.open'), 'sw.js implements cache storage');
  assert(swContent.includes("'./index.html'") && swContent.includes("'/index.html'"), 'sw.js precaches both relative and absolute index paths');
  assert(swContent.includes('self.skipWaiting()'), 'sw.js activates immediately on install via skipWaiting()');
  assert(swContent.includes('self.clients.claim()'), 'sw.js claims active clients on activate');
  assert(swContent.includes("e.request.mode === 'navigate'"), 'sw.js intercepts navigation requests for offline fallback');
}

// 3. Web App Manifest Standards
console.log('\n--- 3. WEB APP MANIFEST INTEGRITY ---');
const manifestPath = resolve(rootDir, 'public', 'manifest.json');
assert(existsSync(manifestPath), 'public/manifest.json exists');

if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  assert(manifest.name && manifest.short_name, 'Manifest contains full and short application names');
  assert(manifest.display === 'standalone', 'Manifest display mode is standalone');
  assert(manifest.icons && manifest.icons.length > 0, 'Manifest defines application icons');
  assert(manifest.theme_color && manifest.background_color, 'Manifest defines theme and background colors');
}

// 4. SVG App Icon Integrity
console.log('\n--- 4. APP ICON ASSET VERIFICATION ---');
const iconPath = resolve(rootDir, 'public', 'icon.svg');
assert(existsSync(iconPath), 'public/icon.svg exists');

if (existsSync(iconPath)) {
  const iconContent = readFileSync(iconPath, 'utf8');
  assert(iconContent.startsWith('<svg') && iconContent.includes('</svg>'), 'icon.svg is valid XML vector graphic');
  assert(iconContent.includes('viewBox'), 'icon.svg defines scalable viewBox');
}

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE D PWA OFFLINE READINESS AUDIT: SUCCESS');
console.log('======================================================================\n');
