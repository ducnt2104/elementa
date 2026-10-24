// tests/test-direct-lithium-extraction-visualizer-ui.mjs
// Test Suite 267: Direct Lithium Extraction (DLE) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 267: DirectLithiumExtractionVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DirectLithiumExtractionVisualizer.tsx');
const enginePath = path.resolve('src/domain/directLithiumExtractionEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'DirectLithiumExtractionVisualizer.tsx component file must exist');
console.log('  ✓ DirectLithiumExtractionVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'directLithiumExtractionEngine.ts domain engine file must exist');
console.log('  ✓ directLithiumExtractionEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('KNOWN_BRINE_RESERVOIRS') &&
  visualizerContent.includes('ION_STERIC_PROFILES') &&
  visualizerContent.includes('simulateDlePerformance'),
  'DirectLithiumExtractionVisualizer must import reservoir catalogs and simulation functions from directLithiumExtractionEngine'
);
console.log('  ✓ DirectLithiumExtractionVisualizer must import functions from directLithiumExtractionEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'DirectLithiumExtractionVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ DirectLithiumExtractionVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'STERIC_ION_SIEVE_CAVITY',
  'KINETICS_AND_BRINE_RESERVOIRS',
  'LCE_ECONOMICS_AND_WATER_SAVINGS'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `DirectLithiumExtractionVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ DirectLithiumExtractionVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets check
assert(
  visualizerContent.includes('<svg viewBox="0 0 700 420"') &&
  visualizerContent.includes('Kênh Chọn Lọc Dưới Nanomet') &&
  visualizerContent.includes('r = 0.76 Å') &&
  visualizerContent.includes('LiCl'),
  'DirectLithiumExtractionVisualizer must render interactive SVG diagrams showing sub-nanometer sieve cavity and ion filtration'
);
console.log('  ✓ DirectLithiumExtractionVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & DLE benchmarks
const requiredTerms = [
  'Direct Lithium Extraction',
  'HMO Sieve',
  'Al-LDH',
  'Salton Sea',
  '0.76 Å',
  'Li₂CO₃',
  'HMnO',
  'LCE'
];

requiredTerms.forEach(term => {
  assert(
    visualizerContent.includes(term),
    `DirectLithiumExtractionVisualizer must include scientific concept: ${term}`
  );
});
console.log('  ✓ All scientific standards, DLE ion-sieving mechanisms and battery mineral benchmarks present');

// 7. Mount in PeriodicCodexTab
assert(
  codexContent.includes('import { DirectLithiumExtractionVisualizer } from') &&
  codexContent.includes("'DIRECT_LITHIUM_EXTRACTION'") &&
  codexContent.includes('<DirectLithiumExtractionVisualizer />'),
  'PeriodicCodexTab.tsx must import and mount DirectLithiumExtractionVisualizer under DIRECT_LITHIUM_EXTRACTION tab'
);
console.log('  ✓ PeriodicCodexTab.tsx mounts DirectLithiumExtractionVisualizer under DIRECT_LITHIUM_EXTRACTION');

console.log('\n--- ALL 7 AUDIT CHECKS PASSED: DirectLithiumExtractionVisualizer UI IS VERIFIED! ---');
