// tests/test-render-config-spec.mjs
// Verifies Render deployment blueprint (render.yaml), environment contracts, and dynamic API base URL

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- TEST: Render Deployment Blueprint & Environment Contracts ---');

// 1. Verify render.yaml exists
console.log('1. Checking render.yaml presence and schema...');
const renderYamlPath = path.join(rootDir, 'render.yaml');
assert.ok(fs.existsSync(renderYamlPath), 'render.yaml must exist at repository root');

const yamlContent = fs.readFileSync(renderYamlPath, 'utf-8');
assert.ok(yamlContent.includes('type: web'), 'render.yaml must define a web service');
assert.ok(yamlContent.includes('env: node'), 'render.yaml runtime must be node');
assert.ok(yamlContent.includes('npm run build'), 'render.yaml must have buildCommand "npm run build"');
assert.ok(yamlContent.includes('npm start'), 'render.yaml must have startCommand "npm start"');
assert.ok(yamlContent.includes('/api/health'), 'render.yaml must include healthCheckPath "/api/health"');
console.log('   ✓ render.yaml configuration matches production requirements');

// 2. Verify apiClient.ts dynamically honors VITE_API_BASE_URL
console.log('2. Checking src/services/apiClient.ts API_BASE_URL resolution...');
const apiClientPath = path.join(rootDir, 'src', 'services', 'apiClient.ts');
assert.ok(fs.existsSync(apiClientPath), 'apiClient.ts must exist');

const apiClientContent = fs.readFileSync(apiClientPath, 'utf-8');
assert.ok(apiClientContent.includes('VITE_API_BASE_URL'), 'apiClient.ts must read import.meta.env.VITE_API_BASE_URL');
console.log('   ✓ apiClient.ts properly references VITE_API_BASE_URL');

// 3. Verify .env.example contains Render and Firebase variables
console.log('3. Checking .env.example documentation...');
const envExamplePath = path.join(rootDir, '.env.example');
const envContent = fs.readFileSync(envExamplePath, 'utf-8');
assert.ok(envContent.includes('VITE_API_BASE_URL'), '.env.example must document VITE_API_BASE_URL');
assert.ok(envContent.includes('PORT'), '.env.example must document PORT');
assert.ok(envContent.includes('VITE_FIREBASE_PROJECT_ID'), '.env.example must document VITE_FIREBASE_PROJECT_ID');
console.log('   ✓ .env.example contains all required environment parameters');

console.log('\n>>> ALL RENDER CONFIGURATION SPEC TESTS PASSED! <<<');
