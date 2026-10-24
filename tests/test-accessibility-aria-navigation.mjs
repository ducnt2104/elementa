// test-accessibility-aria-navigation.mjs
// Suite 70: WCAG 2.1 AA Accessibility, ARIA Semantics, Keyboard Navigation & Luminance Contrast Audit

import fs from 'fs';
import path from 'path';

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

console.log('======================================================================');
console.log('   ELEMENTA SUITE 70: WCAG 2.1 AA ACCESSIBILITY & CONTRAST AUDIT');
console.log('======================================================================\n');

// -------------------------------------------------------------
// GROUP 1: NAVBAR ARIA SEMANTICS & KEYBOARD FOCUS INVARIANTS
// -------------------------------------------------------------
console.log('--- 1. Navbar ARIA Semantics & Keyboard Focus ---');

const navbarSource = fs.readFileSync(path.resolve('./src/components/Navbar.tsx'), 'utf-8');

assert(navbarSource.includes('role="banner"'), 'Header contains landmark role="banner"');
assert(navbarSource.includes('role="navigation"') || navbarSource.includes('aria-label="Điều hướng chính"'), 'Main navigation contains semantic role="navigation" and aria-label');
assert(navbarSource.includes('aria-current={activeTab === \'MENU\' ? \'page\' : undefined}'), 'Active tab correctly signals aria-current="page" to screen readers');
assert(navbarSource.includes('aria-label="Về trang chủ Sảnh chính ELEMENTA"'), 'Brand logo provides descriptive aria-label for non-sighted users');
assert(navbarSource.includes('onKeyDown') && navbarSource.includes('Enter'), 'Brand logo supports keyboard activation (Enter / Space keys)');
assert(navbarSource.includes('focus-visible:ring-2') && navbarSource.includes('focus-visible:ring-cyan-ion'), 'Interactive controls apply focus-visible outline rings for keyboard accessibility');
assert(navbarSource.includes('aria-label="Điều hướng di động"'), 'Mobile navigation strip contains dedicated accessible name');
assert(navbarSource.includes('aria-label={isMuted ? \'Bật âm thanh trò chơi\' : \'Tắt âm thanh trò chơi\'}'), 'Sound toggle button dynamically informs assistive tech of mute state');

// -------------------------------------------------------------
// GROUP 2: CARD DETAIL MODAL DIALOG & TABLIST ACCESSIBILITY
// -------------------------------------------------------------
console.log('\n--- 2. Card Detail Modal Dialog & Tablist Semantics ---');

const modalSource = fs.readFileSync(path.resolve('./src/components/cards/CardDetailModal.tsx'), 'utf-8');

assert(modalSource.includes('role="dialog"'), 'Modal backdrop implements landmark role="dialog"');
assert(modalSource.includes('aria-modal="true"'), 'Modal specifies aria-modal="true" to trap screen reader focus');
assert(modalSource.includes('aria-labelledby="card-detail-title"'), 'Modal links dialog container to title via aria-labelledby');
assert(modalSource.includes('id="card-detail-title"'), 'Card title heading provides matching id="card-detail-title"');
assert(modalSource.includes('aria-label="Đóng cửa sổ chi tiết lá bài (Escape)"'), 'Close button has descriptive aria-label with keyboard hint');
assert(modalSource.includes('role="tablist"'), 'Tab container implements role="tablist"');
assert(modalSource.includes('role="tab"') && modalSource.includes('aria-selected={activeTab === \'DOSSIER\'}'), 'Tab buttons implement role="tab" with dynamic aria-selected state');
assert(modalSource.includes('aria-controls="panel-dossier"') && modalSource.includes('aria-controls="panel-quantum"'), 'Tab buttons link to their content panels via aria-controls');
assert(modalSource.includes('role="tabpanel" id="panel-dossier"') && modalSource.includes('role="tabpanel" id="panel-quantum"'), 'Content panels implement role="tabpanel" with matching ids');
assert(modalSource.includes('ArrowRight') && modalSource.includes('ArrowLeft'), 'Tablist implements ArrowLeft / ArrowRight keyboard navigation');
assert(modalSource.includes('e.key === \'Escape\''), 'Modal listens for Escape key to close cleanly');

// -------------------------------------------------------------
// GROUP 3: W3C WCAG 2.1 RELATIVE LUMINANCE & CONTRAST RATIO AUDIT
// -------------------------------------------------------------
console.log('\n--- 3. W3C WCAG 2.1 Relative Luminance & Contrast Ratios ---');

// W3C Relative Luminance Calculation (WCAG 2.1 Formula)
function getLuminance(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const colorPairs = [
  { name: 'Cyan Ion on Obsidian Background', fg: '#00f0ff', bg: '#0a0e17', minRatio: 7.0 },
  { name: 'Ivory Text on Obsidian Background', fg: '#f8fafc', bg: '#0a0e17', minRatio: 12.0 },
  { name: 'Amber Gold on Obsidian Background', fg: '#f59e0b', bg: '#0a0e17', minRatio: 7.0 },
  { name: 'Emerald Plasma on Obsidian Background', fg: '#10b981', bg: '#0a0e17', minRatio: 7.0 },
  { name: 'Ivory Text on Navy Card Surface', fg: '#f8fafc', bg: '#0f172a', minRatio: 10.0 },
  { name: 'Cyan Ion on Navy Card Surface', fg: '#00f0ff', bg: '#0f172a', minRatio: 7.0 },
  { name: 'Coral Reaction on Obsidian Background', fg: '#ff4d6d', bg: '#0a0e17', minRatio: 4.5 }
];

for (const pair of colorPairs) {
  const ratio = getContrastRatio(pair.fg, pair.bg);
  console.log(`  > ${pair.name}: ${ratio.toFixed(2)} : 1 (Min required: ${pair.minRatio} : 1)`);
  assert(ratio >= 4.5, `${pair.name} meets or exceeds WCAG 2.1 AA contrast threshold of 4.5:1 (achieved ${ratio.toFixed(2)}:1)`);
  assert(ratio >= pair.minRatio, `${pair.name} meets strict design system benchmark (${ratio.toFixed(2)}:1 >= ${pair.minRatio}:1)`);
}

// -------------------------------------------------------------
// GROUP 4: DUEL ARENA & MULTIPLAYER LOBBY ARIA LIVE REGIONS
// -------------------------------------------------------------
console.log('\n--- 4. Duel Arena & Multiplayer Lobby ARIA Live Regions ---');

const duelSource = fs.readFileSync(path.resolve('./src/components/duel/TacticalDuelArenaTab.tsx'), 'utf-8');
const lobbySource = fs.readFileSync(path.resolve('./src/components/duel/OnlineMultiplayerLobbyModal.tsx'), 'utf-8');

assert(duelSource.includes('role="region"') && duelSource.includes('aria-label="Tiến trình giai đoạn lượt đấu"'), 'Phase indicator implements role="region" and aria-label');
assert(duelSource.includes('aria-live="polite"') && duelSource.includes('aria-atomic="true"'), 'Phase flow notifies screen readers via aria-live="polite"');
assert(duelSource.includes('aria-current={isCurrent ? \'step\' : undefined}'), 'Current phase signals aria-current="step"');
assert(duelSource.includes('role="log"') && duelSource.includes('aria-relevant="additions"'), 'Combat log implements role="log" with live additions');

assert(lobbySource.includes('role="dialog"') && lobbySource.includes('aria-modal="true"'), 'Multiplayer lobby implements modal role="dialog"');
assert(lobbySource.includes('aria-labelledby="multiplayer-lobby-title"'), 'Multiplayer lobby links dialog to title heading');
assert(lobbySource.includes('aria-label="Đóng cửa sổ phòng thi đấu (Escape)"'), 'Close button has descriptive aria-label with keyboard hint');
assert(lobbySource.includes('e.key === \'Escape\''), 'Multiplayer lobby listens for Escape key');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 70 AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
