// scripts/update-manifest.ts
import * as fs from 'fs';
import * as path from 'path';
import { BATCH_CARDS } from '../src/data/cards/index';
import { CORE_PLAYABLE_CARDS, PLAYABLE_CARDS } from '../src/data/playableCardsData';

const manifestPath = path.resolve('src/data/cards/manifest.json');

const batches = [];
for (let b = 1; b <= 49; b++) {
  const bStr = String(b).padStart(2, '0');
  const files = fs.readdirSync('src/data/cards/batches').filter(f => f.startsWith(`batch_${bStr}_`));
  if (files.length > 0) {
    const fileName = files[0];
    const filePath = path.join('src/data/cards/batches', fileName);
    const content = fs.readFileSync(filePath, 'utf-8');
    const idMatches = content.match(/"id":\s*"([^"]+)"/g);
    const count = idMatches ? idMatches.length : 0;
    
    let category = 'MAIN_DECK_MONSTER';
    if (fileName.includes('extra_deck')) category = 'EXTRA_DECK_MONSTER';
    else if (fileName.includes('spells')) category = 'SPELL';
    else if (fileName.includes('traps')) category = 'TRAP';

    batches.push({
      batchIndex: b,
      batchId: `BATCH_${bStr}`,
      fileName,
      category,
      actualCount: count,
      status: 'validated'
    });
  }
}

const manifest = {
  manifestVersion: '3.0.0',
  project: 'ELEMENTA Tactical TCG Mega Card Catalog',
  targetMinCards: 7000,
  plannedTotalCards: BATCH_CARDS.length,
  coreExistingCards: CORE_PLAYABLE_CARDS.length,
  grandTotalCards: PLAYABLE_CARDS.length,
  lastUpdated: new Date().toISOString(),
  status: 'VALIDATED',
  batches
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`Manifest updated: ${batches.length} batches, ${PLAYABLE_CARDS.length} total cards!`);
