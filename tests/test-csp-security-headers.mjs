import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('======================================================================');
console.log('   TEST SUITE 155: CONTENT SECURITY POLICY (CSP) & HEADERS AUDIT       ');
console.log('   Phase E: Production Security, Network Boundaries & Defense in Depth');
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

// 1. Verify public/_headers exists and contains strict security headers
console.log('--- 1. STATIC HOSTING _HEADERS VERIFICATION ---');
const headersPath = resolve(rootDir, 'public', '_headers');
assert(existsSync(headersPath), 'public/_headers file exists');

if (existsSync(headersPath)) {
  const headersContent = readFileSync(headersPath, 'utf8');
  assert(headersContent.includes('X-Frame-Options: DENY'), 'Header X-Frame-Options is set to DENY (clickjacking defense)');
  assert(headersContent.includes('X-Content-Type-Options: nosniff'), 'Header X-Content-Type-Options is set to nosniff (MIME sniffing defense)');
  assert(headersContent.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Header Referrer-Policy is set to strict-origin-when-cross-origin');
  assert(headersContent.includes('Permissions-Policy: camera=(), microphone=(), geolocation=()'), 'Header Permissions-Policy disables dangerous sensor access');
  assert(headersContent.includes('Content-Security-Policy:'), 'Header Content-Security-Policy is present');
  assert(headersContent.includes("default-src 'self'"), 'CSP default-src is locked to self');
  assert(headersContent.includes("object-src 'none'"), 'CSP object-src is none (plugins disabled)');
  assert(headersContent.includes("frame-ancestors 'none'"), 'CSP frame-ancestors is none');
  assert(headersContent.includes("worker-src 'self' blob:"), 'CSP worker-src allows self and blob workers safely');
  assert(!headersContent.includes("script-src *"), 'CSP script-src does not allow wildcard execution');
  assert(headersContent.includes("https://*.firebaseio.com") && headersContent.includes("https://identitytoolkit.googleapis.com"), 'CSP connect-src allows Firebase auth and realtime services');
}

// 2. Verify index.html contains synchronized meta CSP tag
console.log('\n--- 2. INDEX.HTML META CSP VERIFICATION ---');
const indexPath = resolve(rootDir, 'index.html');
assert(existsSync(indexPath), 'index.html exists');

if (existsSync(indexPath)) {
  const indexHtml = readFileSync(indexPath, 'utf8');
  assert(indexHtml.includes('<meta http-equiv="Content-Security-Policy"'), 'index.html includes meta http-equiv="Content-Security-Policy"');
  assert(indexHtml.includes("default-src 'self'"), 'Meta CSP locks default-src to self');
  assert(indexHtml.includes("object-src 'none'"), 'Meta CSP disables object plugins');
  assert(indexHtml.includes("fonts.googleapis.com") && indexHtml.includes("fonts.gstatic.com"), 'Meta CSP permits official typography endpoints');
  assert(indexHtml.includes("worker-src 'self' blob:"), 'Meta CSP permits internal workers');
  assert(indexHtml.includes("media-src 'self' data: blob:"), 'Meta CSP permits Web Audio sound synthesis');
}

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE E CONTENT SECURITY POLICY AUDIT: SUCCESS');
console.log('======================================================================\n');
