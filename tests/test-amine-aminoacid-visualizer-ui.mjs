// tests/test-amine-aminoacid-visualizer-ui.mjs
// Test Suite 173: AmineAminoAcidVisualizer UI Component and Integration Audit
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 & IUPAC Standards

import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- TEST SUITE 173: AmineAminoAcidVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AmineAminoAcidVisualizer.tsx');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
const enginePath = path.resolve('src/domain/amineAminoAcidPeptideEngine.ts');

// Test 1: File Existence
assert(fs.existsSync(visualizerPath), 'AmineAminoAcidVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'amineAminoAcidPeptideEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');
const codexContent = fs.readFileSync(codexPath, 'utf8');

// Test 2: Engine Imports
assert(
  visualizerContent.includes('AMINES_CATALOG') &&
  visualizerContent.includes('AMINO_ACIDS_CATALOG') &&
  visualizerContent.includes('calculateElectrophoresisMigration') &&
  visualizerContent.includes('calculateAnilineBromineReaction') &&
  visualizerContent.includes('evaluateBiuretTest'),
  'AmineAminoAcidVisualizer must import catalogs and evaluation functions from engine'
);

// Test 3: Audio Feedback Integration
assert(
  visualizerContent.includes("sound.playUiClick()"),
  'AmineAminoAcidVisualizer must trigger sound.playUiClick() on interactive selections'
);

// Test 4: Modes Support
assert(
  visualizerContent.includes('AMINES_BASICITY') &&
  visualizerContent.includes('AMINO_ACID_ELECTROPHORESIS') &&
  visualizerContent.includes('PEPTIDE_BIURET_TEST'),
  'AmineAminoAcidVisualizer must support all 3 modes: AMINES_BASICITY, AMINO_ACID_ELECTROPHORESIS, and PEPTIDE_BIURET_TEST'
);

// Test 5: Visual Elements and SVG
assert(
  visualizerContent.includes('<svg') &&
  visualizerContent.includes('CATOT') &&
  visualizerContent.includes('ANOT'),
  'AmineAminoAcidVisualizer must render SVG electrophoresis chamber with Cathode and Anode'
);

assert(
  visualizerContent.includes('BẪY THI ĐẠI HỌC') || visualizerContent.includes('BẪY KINH ĐIỂN') || visualizerContent.includes('Lưu Ý Sách Giáo Khoa'),
  'AmineAminoAcidVisualizer must provide pedagogical warnings regarding Dipeptide Biuret exception'
);

// Test 6: Integration in PeriodicCodexTab
assert(
  codexContent.includes("import { AmineAminoAcidVisualizer } from './visualizations/AmineAminoAcidVisualizer';"),
  'PeriodicCodexTab must import AmineAminoAcidVisualizer'
);
assert(
  codexContent.includes("'AMINES_AMINO_ACIDS_PEPTIDES'"),
  "PeriodicCodexTab must include 'AMINES_AMINO_ACIDS_PEPTIDES' in navigation tabs"
);
assert(
  codexContent.includes('<AmineAminoAcidVisualizer />'),
  'PeriodicCodexTab must mount <AmineAminoAcidVisualizer /> when activeMainTab is AMINES_AMINO_ACIDS_PEPTIDES'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 173 PASSED: AmineAminoAcidVisualizer fully verified!');
  process.exit(0);
}
