// scripts/build-all-card-batches.ts
// Robust 2,200 Card Catalog Synthesis Engine for ELEMENTA Tactical TCG

import * as fs from 'fs';
import * as path from 'path';

export interface CardDef {
  id: string;
  name: string;
  name_en: string;
  cardType: string;
  rarity: 'COMMON' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'SECRET_RARE';
  attribute: 'PYRO' | 'AQUA' | 'TERRA' | 'AERO' | 'ELECTRO' | 'ACID_DARK' | 'NOBLE_VOID';
  manaCost: number;
  level?: number;
  atk?: number;
  def?: number;
  xyzRank?: number;
  xyzMaterialsRequired?: { count: number; level: number };
  linkRating?: number;
  linkArrows?: string[];
  linkMaterialsRequired?: { minCount: number; maxCount: number; materialType: string };
  pendulumScale?: number;
  pendulumEffectText?: string;
  isTuner?: boolean;
  synchroLevel?: number;
  synchroMaterialsRequired?: { tunerCount: number; nonTunerMinCount: number };
  chemicalFormula?: string;
  atomicNumber?: number;
  spellTrapSubtype?: string;
  spellSpeed?: 1 | 2 | 3;
  effectCode: string;
  effectText: string;
  scientificLore: string;
  relatedEquation?: string;
  iupacName?: string;
  archetype: string;
  structuredEffects?: any[];
}

const RARITIES: ('COMMON' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'SECRET_RARE')[] = [
  'COMMON', 'COMMON', 'COMMON', 'RARE', 'RARE', 'SUPER_RARE', 'SUPER_RARE', 'ULTRA_RARE', 'SECRET_RARE'
];

export function getRarity(idx: number): 'COMMON' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'SECRET_RARE' {
  return RARITIES[idx % RARITIES.length];
}

const BATCHES_DIR = path.resolve(process.cwd(), 'src/data/cards/batches');
if (!fs.existsSync(BATCHES_DIR)) {
  fs.mkdirSync(BATCHES_DIR, { recursive: true });
}

export function writeBatchFile(fileName: string, constName: string, batchTitle: string, cards: CardDef[]) {
  const filePath = path.join(BATCHES_DIR, fileName);
  const content = `// src/data/cards/batches/${fileName}
// ${batchTitle} (${cards.length} cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const ${constName}: PlayableCardDef[] = ${JSON.stringify(cards, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[GENERATED] ${fileName} (${cards.length} cards) written successfully.`);
}
