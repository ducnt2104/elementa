// tests/test-cloudflare-pages-spec.mjs
// Verifies Cloudflare Pages zero-cost deployment configuration, SPA redirects, headers, and Firebase Spark integration

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- TEST: Cloudflare Pages Free & Firebase Spark Configuration ---');

// 1. Verify wrangler.toml for Cloudflare Pages
console.log('1. Checking wrangler.toml configuration...');
const wranglerPath = path.join(rootDir, 'wrangler.toml');
assert.ok(fs.existsSync(wranglerPath), 'wrangler.toml must exist at root');
const wranglerContent = fs.readFileSync(wranglerPath, 'utf-8');
assert.ok(wranglerContent.includes('pages_build_output_dir = "dist"'), 'pages_build_output_dir must be "dist"');
console.log('   ✓ wrangler.toml is configured for Cloudflare Pages');

// 2. Verify public/_redirects for SPA routing on Cloudflare Pages
console.log('2. Checking public/_redirects for SPA routing...');
const redirectsPath = path.join(rootDir, 'public', '_redirects');
assert.ok(fs.existsSync(redirectsPath), 'public/_redirects must exist');
const redirectsContent = fs.readFileSync(redirectsPath, 'utf-8');
assert.ok(redirectsContent.includes('/*    /index.html   200') || redirectsContent.includes('/* /index.html 200'), 'public/_redirects must route /* to /index.html with status 200');
console.log('   ✓ public/_redirects ensures SPA client routing without 404');

// 3. Verify public/_headers for security and CSP
console.log('3. Checking public/_headers security headers...');
const headersPath = path.join(rootDir, 'public', '_headers');
assert.ok(fs.existsSync(headersPath), 'public/_headers must exist');
const headersContent = fs.readFileSync(headersPath, 'utf-8');
assert.ok(headersContent.includes('Content-Security-Policy'), 'Must include CSP header');
console.log('   ✓ public/_headers configured with strict security policy');

// 4. Verify no Render YAML blueprint exists
console.log('4. Verifying absence of Render blueprint...');
const renderPath = path.join(rootDir, 'render.yaml');
assert.ok(!fs.existsSync(renderPath), 'render.yaml must NOT exist in zero-cost Cloudflare deployment');
console.log('   ✓ Zero paid Render blueprints present in repository');

// 5. Verify Firebase Spark configuration
console.log('5. Verifying Firebase Spark configuration...');
const firebaseJsonPath = path.join(rootDir, 'firebase.json');
assert.ok(fs.existsSync(firebaseJsonPath), 'firebase.json must exist');
const firebasercPath = path.join(rootDir, '.firebaserc');
assert.ok(fs.existsSync(firebasercPath), '.firebaserc must exist');
const firebasercJson = JSON.parse(fs.readFileSync(firebasercPath, 'utf-8'));
assert.strictEqual(firebasercJson.projects.default, 'elementa-tactical-chemistry');
console.log('   ✓ Firebase project is configured as elementa-tactical-chemistry');

console.log('\n>>> ALL CLOUDFLARE PAGES & FIREBASE SPARK CONFIG TESTS PASSED! <<<');
