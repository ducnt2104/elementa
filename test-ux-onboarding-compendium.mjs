// test-ux-onboarding-compendium.mjs
// Verification suite for Phase B: UX/UI Restructure, Unified Resources & Spotlight Tour

import * as fs from 'fs';
import * as path from 'path';

console.log('============================================================');
console.log('   ELEMENTA: UX/UI RESTRUCTURE & SPOTLIGHT TOUR AUDIT');
console.log('============================================================\n');

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    totalFailed++;
  }
}

// 1. Check UnifiedResourcesModal.tsx
console.log('--- 1. Unified Resources Modal Integrity ---');
{
  const modalPath = path.resolve('src/components/resources/UnifiedResourcesModal.tsx');
  assert(fs.existsSync(modalPath), 'UnifiedResourcesModal.tsx exists on disk');
  const code = fs.readFileSync(modalPath, 'utf-8');
  assert(code.includes("activeTab === 'REACTIONS'"), 'Includes Reactions tab');
  assert(code.includes("activeTab === 'BONDING'"), 'Includes Bonding & VSEPR tab');
  assert(code.includes("activeTab === 'CALCULATOR'"), 'Includes Chemistry Calculator tab');
  assert(code.includes("activeTab === 'RULES'"), 'Includes TCG & MOBA Rules tab');
  assert(code.includes("activeTab === 'REFERENCES'"), 'Includes IUPAC & GDPT 2018 References tab');
  assert(code.includes('CẨM NANG & TÀI NGUYÊN HÓA HỌC'), 'Has official Vietnamese title');
}

// 2. Check SpotlightTour.tsx
console.log('\n--- 2. Spotlight Onboarding Tour Integrity ---');
{
  const tourPath = path.resolve('src/components/onboarding/SpotlightTour.tsx');
  assert(fs.existsSync(tourPath), 'SpotlightTour.tsx exists on disk');
  const tourCode = fs.readFileSync(tourPath, 'utf-8');
  assert(tourCode.includes('mask id="spotlight-mask"'), 'Implements SVG mask for dark cutout overlay');
  assert(tourCode.includes('getBoundingClientRect()'), 'Calculates dynamic bounding box of target element');
  assert(tourCode.includes('DEFAULT_TOUR_STEPS'), 'Has comprehensive 6-step default onboarding flow');
  assert(tourCode.includes('Escape'), 'Supports ESC key to exit gracefully');
}

// 3. Check Navbar.tsx
console.log('\n--- 3. Navbar Restructuring & Tour Hooks ---');
{
  const navbarPath = path.resolve('src/components/Navbar.tsx');
  const navbarCode = fs.readFileSync(navbarPath, 'utf-8');
  assert(navbarCode.includes('data-tour="compendium-btn"'), 'Navbar has data-tour="compendium-btn" anchor');
  assert(navbarCode.includes('Cẩm Nang & Tài Nguyên'), 'Navbar has unified Cẩm Nang & Tài Nguyên button');
  assert(navbarCode.includes('openUnifiedResources'), 'Navbar supports openUnifiedResources handler');
  assert(navbarCode.includes('py-2.5 sm:py-3'), 'Navbar has proper breathing room at top');
}

// 4. Check MainMenuTab.tsx (Homepage 4 Zones & Online Shift)
console.log('\n--- 4. Homepage 4 Functional Zones & Online Architecture Shift ---');
{
  const menuPath = path.resolve('src/components/MainMenuTab.tsx');
  const menuCode = fs.readFileSync(menuPath, 'utf-8');
  assert(menuCode.includes('data-tour="play-center"'), 'Zone 1: Play Center has tour hook');
  assert(menuCode.includes('data-tour="duel-cta"'), 'Zone 1: TCG CTA has tour hook');
  assert(menuCode.includes('data-tour="quests-section"'), 'Zone 2: Quests section has tour hook');
  assert(menuCode.includes('data-tour="collection-zone"'), 'Zone 3: Collection zone has tour hook');
  assert(menuCode.includes('data-tour="knowledge-lab"'), 'Zone 4: Knowledge Lab has tour hook');
  assert(!menuCode.includes('100% Offline'), 'Removed misleading "100% Offline" claim from homepage');
  assert(menuCode.includes('Nền Tảng Trực Tuyến Đồng Bộ') || menuCode.includes('Đồng Bộ Trực Tuyến'), 'Emphasizes online sync platform architecture');
  assert(menuCode.includes('KHUNG GIỜ VÀNG'), 'Zone 1 includes Golden Hours status badge');
}

// 5. Check App.tsx integration
console.log('\n--- 5. App.tsx Integration ---');
{
  const appPath = path.resolve('src/App.tsx');
  const appCode = fs.readFileSync(appPath, 'utf-8');
  assert(appCode.includes('<SpotlightTour'), 'App renders SpotlightTour');
  assert(appCode.includes('<UnifiedResourcesModal'), 'App renders UnifiedResourcesModal');
  assert(!appCode.includes('100% Local-First'), 'Footer removed 100% Local-First label');
  assert(appCode.includes('Đồng Bộ Trực Tuyến'), 'Footer displays Đồng Bộ Trực Tuyến');
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('============================================================');

if (totalFailed > 0) {
  process.exit(1);
}
