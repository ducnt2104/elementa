// test-security-input-sanitization.mjs
// Suite 68: Security Hardening, Input Sanitization, Prototype Pollution & Tamper Integrity Audit

import { GameStorage, sanitizeSafeObject, sanitizeInputString } from '../src/storage/localStore.ts';
import { DeckManagementService } from '../src/domain/deckManagement.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// In-memory localStorage mock for node runtime test isolation
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};

console.log('======================================================================');
console.log('   ELEMENTA SUITE 68: SECURITY HARDENING & INPUT SANITIZATION AUDIT');
console.log('======================================================================\n');

// -------------------------------------------------------------
// GROUP 1: PROTOTYPE POLLUTION DEFENSE
// -------------------------------------------------------------
console.log('--- 1. Prototype Pollution Defense ---');

const maliciousPayload = JSON.parse(`{
  "normalField": "safe",
  "__proto__": {
    "pollutedField": "compromised_global_prototype"
  },
  "constructor": {
    "prototype": {
      "anotherPollutedField": "compromised_constructor"
    }
  },
  "nested": {
    "profile": {
      "__proto__": {
        "nestedPolluted": true
      },
      "username": "Hacker1337"
    }
  },
  "arrayPayload": [
    { "__proto__": { "arrayPollution": true } },
    { "safeIndex": 1 }
  ]
}`);

const cleanObj = sanitizeSafeObject(maliciousPayload);

assert(!('pollutedField' in ({})) && ({}).pollutedField === undefined, 'Object.prototype is completely untainted by __proto__ injection');
assert(!('anotherPollutedField' in ({})) && ({}).anotherPollutedField === undefined, 'Object.prototype is untainted by constructor.prototype injection');
assert(!('nestedPolluted' in ({})) && ({}).nestedPolluted === undefined, 'Nested prototype injection successfully blocked');
assert(!Object.prototype.hasOwnProperty('pollutedField'), 'hasOwnProperty confirms zero prototype leakage');
assert(cleanObj.normalField === 'safe', 'Legitimate field "normalField" preserved intact');
assert(cleanObj.nested.profile.username === 'Hacker1337', 'Legitimate nested properties preserved intact');
assert(cleanObj.arrayPayload.length === 2 && cleanObj.arrayPayload[1].safeIndex === 1, 'Array contents preserved and elements sanitized');

// -------------------------------------------------------------
// GROUP 2: XSS & STRING SANITIZATION
// -------------------------------------------------------------
console.log('\n--- 2. XSS & Control Character Sanitization ---');

const xssInputs = [
  { raw: "<script>alert('XSS')</script>ElementalMage", expected: "alert(XSS)ElementalMage" },
  { raw: "<img src=x onerror=alert(1)>", expected: "" },
  { raw: "John\" OR '1'='1", expected: "John OR 1=1" },
  { raw: "User & Co <tag>", expected: "User & Co" },
  { raw: "SafeName\u0000\u001FHidden", expected: "SafeNameHidden" }
];

for (const { raw, expected } of xssInputs) {
  const sanitized = sanitizeInputString(raw);
  assert(!/[<>'\"`]/.test(sanitized), `Dangerous delimiters removed from: "${raw.slice(0, 20)}..."`);
  assert(sanitized === expected, `Output matches expected sanitized string: "${sanitized}"`);
}

// Length truncation test
const longString = 'A'.repeat(200);
const truncated = sanitizeInputString(longString, 32);
assert(truncated.length === 32, `String correctly truncated to max length 32 (got ${truncated.length})`);

// Non-string edge cases
assert(sanitizeInputString(null) === '', 'null safely resolves to empty string');
assert(sanitizeInputString(undefined) === '', 'undefined safely resolves to empty string');
assert(sanitizeInputString(12345) === '', 'number safely resolves to empty string');
assert(sanitizeInputString({}) === '', 'object safely resolves to empty string');

// -------------------------------------------------------------
// GROUP 3: SAVE BUNDLE IMPORT BOUNDS & TAMPER RESISTANCE
// -------------------------------------------------------------
console.log('\n--- 3. Save Bundle Import Bounds & Tamper Resistance ---');

mockStorage.clear();

const tamperedSaveBundle = {
  version: 2,
  schema: 'ELEMENTA_SAVE_BUNDLE_V2',
  exportedAt: new Date().toISOString(),
  profile: {
    name: "<b onmouseover=alert(1)>Siêu Học Giả</b>",
    level: 999999, // Should clamp to 100
    xp: -500, // Should clamp to 0
    knowledgeTokens: 999999999, // Should clamp to 1e7
    elementalShards: -100, // Should clamp to 0
    tcgBotRank: {
      tier: "GOD_TIER", // Invalid tier, should fallback to BRONZE
      division: 99, // Should clamp to 5
      mmr: Infinity, // Should fallback to 100
      wins: -10, // Should clamp to 0
      losses: 5
    },
    cardCollection: {
      "card_elem_11_na": 5,
      "card_elem_17_cl": 150, // Should clamp to 99
      "malicious/../../path": 10, // Invalid card ID, should be stripped
      "card_elem_26_fe": -5 // Invalid negative, should clamp to 0
    },
    unlockedElementZ: [1, 1, 6, 8, 119, -5, 26, "invalid", 118] // Should filter to [1, 6, 8, 26, 118]
  },
  settings: {
    volume: 5.5, // Should clamp to 1.0
    graphicsQuality: "HACKED_SUPER_ULTRA" // Should fallback to BALANCED
  },
  skills: [
    {
      id: "skill_custom_1",
      elementSymbol: "Na<script>",
      skillName: "<script>bad()</script>Bùng Nổ Kiềm",
      description: "Tạo vụ nổ natri trong nước &lt;h1&gt;",
      iconCanvasDataUrl: "javascript:alert(1)", // Invalid canvas data URL
      validation: {
        isSchoolSafe: true,
        isScientificallyValid: true,
        accuracyScore: 999, // Clamp to 100
        effectArchetype: "DIRECT_DAMAGE",
        basePower: 500, // Hard capped <= 120
        cooldownSeconds: 2 // Hard capped >= 5s
      }
    }
  ]
};

const importResult = GameStorage.importSaveBundle(tamperedSaveBundle);

assert(importResult.success === true, 'Save bundle import completed safely without crashing');
assert(importResult.restoredItems.profile === true, 'Profile was processed and restored');
assert(importResult.restoredItems.settings === true, 'Settings were processed and restored');
assert(importResult.restoredItems.skills === 1, 'Custom skills were processed and restored');

// Verify sanitized profile in storage
const storedProfile = GameStorage.loadProfile();
assert(storedProfile.name === 'Siêu Học Giả', `Profile name HTML tags stripped (got "${storedProfile.name}")`);
assert(storedProfile.level === 100, `Level capped to max limit 100 (got ${storedProfile.level})`);
assert(storedProfile.xp === 0, `Negative XP clamped to 0 (got ${storedProfile.xp})`);
assert(storedProfile.knowledgeTokens === 1e7, `Knowledge Tokens capped at 10,000,000 (got ${storedProfile.knowledgeTokens})`);
assert(storedProfile.elementalShards === 0, `Negative Shards clamped to 0 (got ${storedProfile.elementalShards})`);

// Verify rank sanitization
assert(storedProfile.tcgBotRank.tier === 'BRONZE', `Invalid tier "GOD_TIER" reverted to "BRONZE" (got ${storedProfile.tcgBotRank.tier})`);
assert(storedProfile.tcgBotRank.division === 5, `Division capped at 5 (got ${storedProfile.tcgBotRank.division})`);
assert(storedProfile.tcgBotRank.mmr === 100, `Infinity MMR reverted to default 100 (got ${storedProfile.tcgBotRank.mmr})`);
assert(storedProfile.tcgBotRank.wins === 0, `Negative wins clamped to 0 (got ${storedProfile.tcgBotRank.wins})`);

// Verify card collection sanitization
const coll = storedProfile.cardCollection;
assert(coll['card_elem_11_na'] === 5, 'Valid card Na preserved');
assert(coll['card_elem_17_cl'] === 99, `Excessive count 150 clamped to 99 (got ${coll['card_elem_17_cl']})`);
assert(!('malicious/../../path' in coll), 'Path traversal card ID stripped from collection');
assert(coll['card_elem_26_fe'] === 0, 'Negative card count clamped to 0');

// Verify unlocked elements sanitization
assert(JSON.stringify(storedProfile.unlockedElementZ) === JSON.stringify([1, 6, 8, 26, 118]), `Unlocked Z sanitized strictly to valid periodic elements 1..118 (got ${JSON.stringify(storedProfile.unlockedElementZ)})`);

// Verify settings sanitization
const storedSettings = GameStorage.loadSettings();
assert(storedSettings.volume === 1.0, `Excessive volume 5.5 clamped to 1.0 (got ${storedSettings.volume})`);
assert(storedSettings.graphicsQuality === 'BALANCED', `Invalid graphics quality reverted to 'BALANCED' (got ${storedSettings.graphicsQuality})`);

// Verify skills sanitization
const storedSkills = GameStorage.loadSkills();
assert(storedSkills.length === 1, '1 custom skill restored');
assert(!/[<>]/.test(storedSkills[0].skillName), `XSS stripped from skillName (got "${storedSkills[0].skillName}")`);
assert(storedSkills[0].iconCanvasDataUrl === undefined, 'Malicious javascript: canvas data URL rejected and set to undefined');
assert(storedSkills[0].validation.basePower <= 120, `Base power clamped to <= 120 (got ${storedSkills[0].validation.basePower})`);
assert(storedSkills[0].validation.cooldownSeconds >= 5, `Cooldown clamped to >= 5s (got ${storedSkills[0].validation.cooldownSeconds})`);

// -------------------------------------------------------------
// GROUP 4: DECK CODE CHECKSUM & TAMPER DETECTION
// -------------------------------------------------------------
console.log('\n--- 4. Deck Code Checksum & Cryptographic Tamper Detection ---');

mockStorage.clear();
const slots = DeckManagementService.loadDeckSlots();
// Slot 0 has pre-built Nitro Legion
const validCode = DeckManagementService.exportDeckToString(0);

assert(typeof validCode === 'string' && validCode.startsWith('ELM-DECK-'), 'Export code successfully generated with "ELM-DECK-" prefix');

// 1. Successful import into Slot 3
const importGood = DeckManagementService.importDeckFromString(3, validCode);
assert(importGood.success === true, 'Valid deck code imported into Slot 3 cleanly');
assert(importGood.deck.name === slots[0].name, 'Imported deck name matches exported original');

// 2. Tamper Test A: Modify 1 character in the payload
const b64Part = validCode.slice('ELM-DECK-'.length);
const decoded = Buffer.from(b64Part, 'base64').toString('utf-8');
const tamperedObj = JSON.parse(decoded);

// Attacker attempts to sneak in an un-owned boss card
tamperedObj.main[0] = 'card_elem_79_au';
const tamperedB64 = Buffer.from(JSON.stringify(tamperedObj), 'utf-8').toString('base64');
const tamperedCode = `ELM-DECK-${tamperedB64}`;

const importTampered = DeckManagementService.importDeckFromString(4, tamperedCode);
assert(importTampered.success === false, 'Tampered deck code with modified card was REJECTED');
assert(importTampered.error.includes('Checksum không khớp') || importTampered.error.includes('bị hỏng'), `Appropriate tamper error message returned: "${importTampered.error}"`);

// 3. Tamper Test B: Modify deck name to attempt XSS without updating checksum
tamperedObj.name = "<script>alert('pwn')</script>";
const tamperedNameB64 = Buffer.from(JSON.stringify(tamperedObj), 'utf-8').toString('base64');
const tamperedNameCode = `ELM-DECK-${tamperedNameB64}`;

const importTamperedName = DeckManagementService.importDeckFromString(4, tamperedNameCode);
assert(importTamperedName.success === false, 'Tampered deck name with modified payload was REJECTED by checksum validation');

// 4. Invalid Format Test: Random garbage string
const junkCode = "NOT-A-DECK-CODE-123456789";
const importJunk = DeckManagementService.importDeckFromString(4, junkCode);
assert(importJunk.success === false, 'Non-conforming prefix rejected immediately');

// 5. Corrupted Base64
const corruptCode = "ELM-DECK-@@@NOT_VALID_BASE64###";
const importCorrupt = DeckManagementService.importDeckFromString(4, corruptCode);
assert(importCorrupt.success === false, 'Corrupted Base64 handled gracefully without unhandled exception');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 68 AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
