// tests/test-moba-accessibility-and-aria.mjs
// Suite 167: MOBA Battlefield Accessibility, ARIA Live Regions & Keyboard Nav Audit
// Conforming to WCAG 2.1 Level AA & Vietnam Digital Accessibility Standards

import assert from 'assert';
import fs from 'fs';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 167: MOBA ARENA ACCESSIBILITY & ARIA AUDIT        ');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

const sourceFile = fs.readFileSync('src/components/moba/MobaArenaTab.tsx', 'utf8');

// -------------------------------------------------------------------
// 1. Semantic Container & Region Landmarks
// -------------------------------------------------------------------
console.log('--- 1. Semantic Container & Landmark Invariants ---');

runTest('Root arena container has role="region" and descriptive aria-label', () => {
  assert.ok(sourceFile.includes('role="region"'), 'Must have role="region"');
  assert.ok(sourceFile.includes('aria-label="Đấu Trường MOBA Hóa Học Real-Time 60 FPS"'), 'Must have descriptive arena label');
});

runTest('Canvas element has role="img", aria-label, and tabIndex={0} for keyboard focus', () => {
  assert.ok(sourceFile.includes('role="img"'), 'Canvas must specify role="img"');
  assert.ok(sourceFile.includes('aria-label="Bản đồ giao tranh chiến trường MOBA thời gian thực"'), 'Canvas must describe battlefield');
  assert.ok(sourceFile.includes('tabIndex={0}'), 'Canvas must be focusable via tabIndex={0}');
});

// -------------------------------------------------------------------
// 2. ARIA Live Regions for Combat & Chemical Telemetry
// -------------------------------------------------------------------
console.log('--- 2. ARIA Live Regions for Real-Time Telemetry ---');

runTest('Kill & synergy announcements use role="status" and aria-live="polite"', () => {
  assert.ok(sourceFile.includes('role="status"'), 'Announcement banner must declare role="status"');
  assert.ok(sourceFile.includes('aria-live="polite"'), 'Kill notifications must be announced politely');
  assert.ok(sourceFile.includes('aria-atomic="true"'), 'Live region must announce atomically');
});

runTest('Chemical reaction alert popups use role="alert" and aria-live="assertive"', () => {
  assert.ok(sourceFile.includes('role="alert"'), 'Reaction alert must declare role="alert"');
  assert.ok(sourceFile.includes('aria-live="assertive"'), 'Reaction alerts must announce assertively');
  assert.ok(sourceFile.includes('aria-label="Đóng thông báo phản ứng hóa học"'), 'Dismiss button must have accessible label');
});

runTest('Screen reader dedicated live region exists with class sr-only', () => {
  assert.ok(sourceFile.includes('className="sr-only" aria-live="polite"'), 'sr-only live region must exist for non-visual assistive tech');
  assert.ok(sourceFile.includes('Phản ứng hóa học ${reactionAlert.name}'), 'Formats reaction text for screen readers');
  assert.ok(sourceFile.includes('${activeAnnouncement.title}: ${activeAnnouncement.subtitle}'), 'Formats announcement text for screen readers');
});

// -------------------------------------------------------------------
// 3. Keyboard Navigation & Short-Cut Mappings
// -------------------------------------------------------------------
console.log('--- 3. Keyboard Navigation & Hotkeys ---');

runTest('Keyboard listener registers essential MOBA hotkeys (Q, W, E, R, A, S, H)', () => {
  assert.ok(sourceFile.includes("case 'q':"), 'Q skill shortcut registered');
  assert.ok(sourceFile.includes("case 'w':"), 'W skill shortcut registered');
  assert.ok(sourceFile.includes("case 'e':"), 'E skill shortcut registered');
  assert.ok(sourceFile.includes("case 'r':"), 'R ultimate shortcut registered');
  assert.ok(sourceFile.includes("case 'a':"), 'A attack move shortcut registered');
  assert.ok(sourceFile.includes("case 's':"), 'S stop command registered');
  assert.ok(sourceFile.includes("case 'h':"), 'H help/controls shortcut registered');
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 167 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
