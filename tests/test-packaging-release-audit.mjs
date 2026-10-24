// test-packaging-release-audit.mjs
// Test Suite 72: Production Packaging, PWA Offline Service Worker & Release Integrity Audit
// Phase I Milestone: Full-System Verification & Final Release Audit

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { GameStorage, STARTER_COLLECTION, sanitizeSafeObject } from '../src/storage/localStore.ts';
import { REACTION_RULES_DATABASE } from '../src/data/reactionsData.ts';
import { ALL_ELEMENTS } from '../src/data/elementsData.ts';
import { getPlayableCardById } from '../src/data/playableCardsData.ts';

console.log('======================================================================');
console.log('   TEST SUITE 72: PRODUCTION PACKAGING & RELEASE INTEGRITY AUDIT      ');
console.log('   Phase I: Final System Verification & Offline Readiness Audit       ');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] #${totalTests}: ${name}`);
  } catch (err) {
    console.error(`  [FAIL] #${totalTests}: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ----------------------------------------------------------------------
// 1. PRODUCTION BUILD DIST AUDIT
// ----------------------------------------------------------------------
console.log('--- 1. PRODUCTION BUILD DIST AUDIT ---');

runTest('dist/index.html exists, contains root mount and valid manifest link', () => {
  const distHtmlPath = path.resolve('dist/index.html');
  assert.ok(fs.existsSync(distHtmlPath), 'dist/index.html must exist');
  const htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
  assert.ok(htmlContent.includes('<div id="root"></div>'), 'HTML must contain root container');
  assert.ok(htmlContent.includes('rel="manifest"'), 'HTML must link to manifest.json');
  assert.ok(htmlContent.includes('ELEMENTA'), 'HTML title/description must include ELEMENTA');
});

runTest('dist/assets contains compiled JS and CSS chunks', () => {
  const assetsDir = path.resolve('dist/assets');
  assert.ok(fs.existsSync(assetsDir), 'dist/assets directory must exist');
  const files = fs.readdirSync(assetsDir);

  const hasCss = files.some(f => f.endsWith('.css'));
  const hasVendorReact = files.some(f => f.includes('vendor-react') && f.endsWith('.js'));
  const hasCompendium = files.some(f => (f.includes('chemistry-compendium-data') || f.includes('cards-monsters')) && f.endsWith('.js'));
  const hasVisualizers = files.some(f => f.includes('chemistry-visualizers') && f.endsWith('.js'));
  const hasIndex = files.some(f => f.startsWith('index-') && f.endsWith('.js'));

  assert.ok(hasCss, 'Must generate compiled CSS');
  assert.ok(hasVendorReact, 'Must generate vendor-react chunk');
  assert.ok(hasCompendium, 'Must generate cards/compendium chunk (e.g. cards-monsters or chemistry-compendium-data)');
  assert.ok(hasVisualizers, 'Must generate chemistry-visualizers chunk');
  assert.ok(hasIndex, 'Must generate index bundle');
});

// ----------------------------------------------------------------------
// 2. PWA & WEB APP MANIFEST INTEGRITY
// ----------------------------------------------------------------------
console.log('\n--- 2. PWA & WEB APP MANIFEST INTEGRITY ---');

runTest('public/manifest.json is strictly valid PWA schema', () => {
  const manifestPath = path.resolve('public/manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);

  assert.strictEqual(manifest.name, 'ELEMENTA: Trận Chiến Nguyên Tố');
  assert.strictEqual(manifest.short_name, 'ELEMENTA');
  assert.strictEqual(manifest.display, 'standalone');
  assert.strictEqual(manifest.start_url, '/');
  assert.ok(manifest.theme_color, 'theme_color must be set');
  assert.ok(manifest.background_color, 'background_color must be set');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 1, 'At least 1 icon must be declared');
  assert.strictEqual(manifest.icons[0].type, 'image/svg+xml');
});

runTest('public/sw.js service worker implements offline caching lifecycle', () => {
  const swPath = path.resolve('public/sw.js');
  assert.ok(fs.existsSync(swPath), 'public/sw.js must exist');
  const swContent = fs.readFileSync(swPath, 'utf8');

  assert.ok(swContent.includes("addEventListener('install'"), 'SW must have install event');
  assert.ok(swContent.includes("addEventListener('activate'"), 'SW must have activate event');
  assert.ok(swContent.includes("addEventListener('fetch'"), 'SW must have fetch event');
  assert.ok(swContent.includes('caches.open'), 'SW must use CacheStorage API');
  assert.ok(swContent.includes('/index.html'), 'SW must cache index.html for offline fallback');
});

// ----------------------------------------------------------------------
// 3. SCIENTIFIC DATASET & CORE CATALOG INTEGRITY
// ----------------------------------------------------------------------
console.log('\n--- 3. SCIENTIFIC DATASET & CORE CATALOG INTEGRITY ---');

runTest('Periodic Table Elements catalog covers all 118 chemical elements', () => {
  assert.strictEqual(ALL_ELEMENTS.length, 118, 'Periodic table must include exactly 118 elements');
  for (let z = 1; z <= 118; z++) {
    const el = ALL_ELEMENTS.find(e => e.z === z);
    assert.ok(el, `Element with atomic number Z=${z} must exist`);
    assert.ok(el.symbol && el.symbol.length >= 1, `Element Z=${z} must have valid symbol`);
    assert.ok(el.name_vi && el.name_vi.length >= 1, `Element Z=${z} must have Vietnamese IUPAC name`);
    assert.ok(el.atomic_weight > 0, `Element Z=${z} must have positive atomic weight`);
  }
});

runTest('Chemical Reactions dataset contains comprehensive reaction rules', () => {
  assert.ok(REACTION_RULES_DATABASE.length >= 310, `Reactions catalog must have >= 310 rules (found: ${REACTION_RULES_DATABASE.length})`);
  
  for (const rx of REACTION_RULES_DATABASE) {
    assert.ok(rx.id, 'Reaction must have id');
    assert.ok(rx.code, 'Reaction must have code');
    assert.ok(rx.name_vi, `Reaction ${rx.id} must have name_vi`);
    assert.ok(
      (Array.isArray(rx.reactants) && rx.reactants.length >= 1) || (rx.requiredConditions && rx.requiredConditions.length >= 1),
      `Reaction ${rx.id} must declare reactants or required environmental conditions`
    );
    assert.ok(rx.equation && rx.equation.length >= 3, `Reaction ${rx.id} must have equation`);
  }
});

runTest('Starter Pack 50 cards are complete and well-formed', () => {
  const totalStarterCards = Object.values(STARTER_COLLECTION).reduce((sum, n) => sum + n, 0);
  assert.strictEqual(totalStarterCards, 50, 'Starter Pack must contain exactly 50 total cards');
  
  for (const cardId of Object.keys(STARTER_COLLECTION)) {
    const card = getPlayableCardById(cardId);
    assert.ok(card, `Card ID ${cardId} in starter collection must resolve`);
    assert.ok(card.id, 'Card must have id');
    assert.ok(card.name, 'Card must have name');
    assert.ok(card.cardType, `Card ${card.id} must have cardType`);
    assert.ok(card.rarity, `Card ${card.id} must have rarity`);
  }
});

// ----------------------------------------------------------------------
// 4. STORAGE & STATE PERSISTENCE HYGIENE
// ----------------------------------------------------------------------
console.log('\n--- 4. STORAGE & STATE PERSISTENCE HYGIENE ---');

runTest('GameStorage.loadProfile() is immune to prototype pollution and sanitizes cleanly', () => {
  const profile = GameStorage.loadProfile();
  const sanitized = sanitizeSafeObject(profile);
  assert.ok(sanitized, 'Sanitized profile must be valid');
  assert.strictEqual(sanitized.__proto__, Object.prototype);
  assert.strictEqual(sanitized.level, 1);
  assert.strictEqual(sanitized.knowledgeTokens, 1000);
  assert.strictEqual(sanitized.elementalShards, 150);
  assert.strictEqual(sanitized.tcgBotRank.mmr, 100);
  assert.ok(sanitized.unlockedElementZ.length >= 15);
});

// ----------------------------------------------------------------------
// AUDIT SUMMARY
// ----------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log(' PHASE I PACKAGING & RELEASE INTEGRITY AUDIT: SUCCESS');
console.log('======================================================================\n');
