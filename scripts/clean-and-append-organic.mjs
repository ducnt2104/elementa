// scripts/clean-and-append-organic.mjs
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/reactionsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// If rx_org_ester_ethyl_acetate exists, truncate right before its opening {
const firstIdx = content.indexOf('{\r\n    "id": "rx_org_ester_ethyl_acetate"');
const firstIdxLF = content.indexOf('{\n    "id": "rx_org_ester_ethyl_acetate"');
const idx = firstIdx !== -1 ? firstIdx : firstIdxLF;

if (idx !== -1) {
  content = content.substring(0, idx).trimEnd();
  if (content.endsWith(',')) {
    content = content.substring(0, content.length - 1).trimEnd();
  }
  content += '\n];\n';
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned reactionsData.ts back to baseline.');
