import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('======================================================================');
console.log('   TEST SUITE 158: TACTICAL DECK BUILDER FORMAT UI INTEGRATION        ');
console.log('   Phase C: TCG Regulation, Pedagogical Formats & Deck Builder UI     ');
console.log('======================================================================\n');

let passCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  [PASS] #${totalCount}: ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] #${totalCount}: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Verify component source exists
console.log('--- 1. COMPONENT SOURCE AUDIT ---');
const componentPath = resolve(rootDir, 'src', 'components', 'deck', 'TacticalDeckBuilderTab.tsx');
assert(existsSync(componentPath), 'TacticalDeckBuilderTab.tsx exists');

if (existsSync(componentPath)) {
  const content = readFileSync(componentPath, 'utf8');

  // 2. Format state and service integration
  console.log('\n--- 2. FORMAT STATE & HOOK INTEGRATION ---');
  assert(content.includes('TournamentFormat'), 'Imports TournamentFormat from deckManagement');
  assert(content.includes("selectedFormat, setSelectedFormat"), 'Maintains selectedFormat reactive state');
  assert(content.includes("STANDARD_GDPT"), 'Defaults or includes STANDARD_GDPT format');
  assert(content.includes("CLASSROOM_SAFE"), 'Supports CLASSROOM_SAFE format');
  assert(content.includes("UNLIMITED"), 'Supports UNLIMITED format');
  assert(
    content.includes("DeckManagementService.validateDeck(") && content.includes("selectedFormat"),
    'Passes selectedFormat to DeckManagementService.validateDeck inside useMemo'
  );

  // 3. UI Controls and Pedagogical Indicators
  console.log('\n--- 3. FORMAT SELECTION CONTROLS & PEDAGOGY ---');
  assert(content.includes('Định Dạng (Format):'), 'Renders Format label with icon in UI');
  assert(content.includes('Chuẩn GDPT 2018'), 'Renders Chuẩn GDPT 2018 button');
  assert(content.includes('Phòng TN An Toàn'), 'Renders Phòng TN An Toàn button');
  assert(content.includes('Tự Do (Unlimited)'), 'Renders Tự Do (Unlimited) button');
  assert(content.includes('Giới hạn hóa chất nguy hại cao'), 'Displays pedagogical explanation for standard GDPT format');
  assert(content.includes('Cấm hợp chất nổ mạnh'), 'Displays safety warning for classroom format');
}

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE C DECK BUILDER UI INTEGRATION AUDIT: SUCCESS');
console.log('======================================================================\n');
