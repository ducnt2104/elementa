// tests/test-direct-ammonia-sofc-visualizer-ui.mjs
// Test Suite 379: UI Verification for Direct Ammonia SOFC (DA-SOFC) Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 379: Direct Ammonia SOFC Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying DirectAmmoniaSofcVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'DirectAmmoniaSofcVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'DirectAmmoniaSofcVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'IN_SITU_CRACKING_AND_CELL_FLOW'"), 'Visualizer must have IN_SITU_CRACKING_AND_CELL_FLOW tab');
assert(visualizerSrc.includes("'ELECTROCHEMICAL_KINETICS_AND_POLARIZATION'"), 'Visualizer must have ELECTROCHEMICAL_KINETICS_AND_POLARIZATION tab');
assert(visualizerSrc.includes("'MARITIME_DECARBONIZATION_AND_BUNKERING'"), 'Visualizer must have MARITIME_DECARBONIZATION_AND_BUNKERING tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateDaSofcKinetics'), 'Visualizer must import calculateDaSofcKinetics');
assert(visualizerSrc.includes('calculateMaritimeDaSofcPerformance'), 'Visualizer must import calculateMaritimeDaSofcPerformance');
assert(visualizerSrc.includes('MARITIME_VESSEL_CATALOG'), 'Visualizer must import MARITIME_VESSEL_CATALOG');

// Check SVG elements
assert(visualizerSrc.includes('Kho Bunkering'), 'Visualizer SVG must render bunkering fuel tank');
assert(visualizerSrc.includes('ANODE (Ni-YSZ)'), 'Visualizer SVG must render Anode cracking chamber');
assert(visualizerSrc.includes('2NH₃ ➔ N₂ + 3H₂'), 'Visualizer SVG must render in-situ cracking reaction');
assert(visualizerSrc.includes('YSZ / ScSZ (O²⁻)'), 'Visualizer SVG must render ceramic solid oxide electrolyte');
assert(visualizerSrc.includes('CATHODE (LSCF)'), 'Visualizer SVG must render Cathode oxygen reduction');
assert(visualizerSrc.includes('ĐỘNG CƠ TÀU'), 'Visualizer SVG must render ship electric propulsion circuit');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { DirectAmmoniaSofcVisualizer } from './visualizations/DirectAmmoniaSofcVisualizer'"),
  'PeriodicCodexTab must import DirectAmmoniaSofcVisualizer');

assert(codexSrc.includes("'DIRECT_AMMONIA_SOFC'"),
  'PeriodicCodexTab state union must contain DIRECT_AMMONIA_SOFC');

assert(codexSrc.includes("setActiveMainTab('DIRECT_AMMONIA_SOFC')"),
  'PeriodicCodexTab must have button trigger for DIRECT_AMMONIA_SOFC');

assert(codexSrc.includes("<DirectAmmoniaSofcVisualizer />"),
  'PeriodicCodexTab must render <DirectAmmoniaSofcVisualizer />');
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite Chunk Allocation
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');
assert(viteSrc.includes("'DirectAmmonia'"), 'vite.config.ts must include DirectAmmonia in energyKeywords chunk');
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert(visualizerSrc.includes('temperatureC'), 'Must include temperature slider');
assert(visualizerSrc.includes('currentDensityAcm2'), 'Must include current density slider');
assert(visualizerSrc.includes('selectedVesselClass'), 'Must include vessel class selector');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 379: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
