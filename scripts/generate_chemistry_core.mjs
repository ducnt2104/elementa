// scripts/generate_chemistry_core.mjs
// Comprehensive IUPAC & GDPT 2018 Generator for ELEMENTA Chemistry Core
// Generates:
// 1. src/data/elementsData.ts (All 118 verified elements, zero placeholders)
// 2. src/data/substancesData.ts (>= 300 verified chemical substances)
// 3. src/data/reactionsData.ts (>= 300 balanced chemical equations with sources)

import fs from 'fs';
import path from 'path';

console.log('Generating comprehensive ELEMENTA Chemistry Core...');
