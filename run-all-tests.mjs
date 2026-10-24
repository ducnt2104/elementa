// run-all-tests.mjs
// Comprehensive test runner executing all 62 test suites in ELEMENTA
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const testFiles = fs.readdirSync('tests')
  .filter(f => f.startsWith('test-') && f.endsWith('.mjs'))
  .sort();

console.log('======================================================================');
console.log(`   ELEMENTA — COMPLETE TEST MATRIX RUNNER (${testFiles.length} SUITES)`);
console.log('======================================================================\n');

let passed = 0;
let failed = 0;
const failedSuites = [];
const startTime = Date.now();

for (let i = 0; i < testFiles.length; i++) {
  const file = testFiles[i];
  const padIndex = String(i + 1).padStart(2, '0');
  process.stdout.write(`[${padIndex}/${testFiles.length}] ${file.padEnd(42, ' ')} ... `);
  
  const suiteStart = Date.now();
  try {
    execSync(`npx tsx tests/${file}`, { stdio: 'pipe' });
    const duration = ((Date.now() - suiteStart) / 1000).toFixed(2);
    console.log(`\x1b[32mPASSED\x1b[0m (${duration}s)`);
    passed++;
  } catch (err) {
    const duration = ((Date.now() - suiteStart) / 1000).toFixed(2);
    console.log(`\x1b[31mFAILED\x1b[0m (${duration}s)`);
    failed++;
    failedSuites.push(file);
  }
}

const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${testFiles.length} SUITES PASSED (${totalDuration}s)`);
if (failed > 0) {
  console.log(` \x1b[31mFAILURE REPORT: ${failed} SUITE(S) FAILED:\x1b[0m`);
  failedSuites.forEach(s => console.log(`   - ${s}`));
  console.log('======================================================================\n');
  process.exit(1);
} else {
  console.log(' \x1b[32m100% SUCCESS — ALL TEST SUITES IN FULL HARMONY!\x1b[0m');
  console.log('======================================================================\n');
  process.exit(0);
}
