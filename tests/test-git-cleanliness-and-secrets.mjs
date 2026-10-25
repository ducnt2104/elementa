// tests/test-git-cleanliness-and-secrets.mjs
// Verifies git cleanliness, absence of tracked secrets, proper .gitignore patterns, and package metadata

import assert from 'node:assert';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- TEST: Git Cleanliness & Secret Leak Prevention ---');

// 1. Check tracked files via git ls-files for secret leaks
console.log('1. Checking git ls-files for tracked secrets and local databases...');
const trackedFilesOutput = execSync('git ls-files', { cwd: rootDir, encoding: 'utf-8' });
const trackedFiles = trackedFilesOutput.split(/\r?\n/).filter(Boolean);

const forbiddenPatterns = [
  /\.env$/i,
  /\.env\.local$/i,
  /\.env\.production$/i,
  /\.key$/i,
  /\.pem$/i,
  /serviceAccount.*\.json$/i,
  /credentials\.json$/i,
  /id_rsa/i,
  /\.db$/i,
  /\.db-shm$/i,
  /\.db-wal$/i,
  /\.db-journal$/i
];

for (const file of trackedFiles) {
  // .env.example is allowed as a template
  if (file === '.env.example') continue;

  for (const pattern of forbiddenPatterns) {
    assert.ok(
      !pattern.test(file),
      `SECURITY ALERT: Tracked file "${file}" matches forbidden pattern ${pattern}!`
    );
  }
}
console.log(`   ✓ Checked ${trackedFiles.length} tracked files: Zero secrets or local databases tracked.`);

// 2. Check .gitignore patterns
console.log('2. Checking .gitignore for comprehensive exclusion rules...');
const gitignorePath = path.join(rootDir, '.gitignore');
assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');

const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
const requiredIgnorePatterns = [
  'node_modules',
  'dist',
  '*.db',
  '*.db-shm',
  '*.db-wal',
  '.env',
  '.env.local',
  '*.key',
  '*.pem',
  'serviceAccountKey.json'
];

for (const pattern of requiredIgnorePatterns) {
  assert.ok(
    gitignoreContent.includes(pattern),
    `.gitignore must include "${pattern}" rule`
  );
}
console.log('   ✓ .gitignore contains all necessary protection rules.');

// 3. Verify package.json repository url
console.log('3. Checking package.json metadata...');
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
assert.strictEqual(pkg.name, 'elementa-tactical-chemistry');
console.log('   ✓ package.json metadata is valid.');

console.log('\n>>> ALL GIT CLEANLINESS & SECRET PREVENTION TESTS PASSED! <<<');
