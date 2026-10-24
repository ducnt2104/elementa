// src/data/cards/schemas/cardSchema.ts
// Comprehensive Runtime Schema & Validation Engine for ELEMENTA TCG Cards

import {
  PlayableCardDef,
  CardType,
  CardRarity,
  ChemicalAttribute,
  SpellTrapSubtype,
  StructuredEffectDefinition,
  EffectOpcode
} from '../../../domain/cardGameTypes';

export const VALID_CARD_TYPES: CardType[] = [
  'ELEMENT_MONSTER',
  'COMPOUND_MONSTER',
  'LINK_MONSTER',
  'SYNCHRO_MONSTER',
  'XYZ_MONSTER',
  'PENDULUM_MONSTER',
  'RITUAL_MONSTER',
  'TOKEN_MONSTER',
  'REACTION_SPELL',
  'EQUIP_CATALYST',
  'FIELD_ENVIRONMENT',
  'TRAP'
];

export const VALID_RARITIES: CardRarity[] = [
  'COMMON',
  'RARE',
  'SUPER_RARE',
  'ULTRA_RARE',
  'SECRET_RARE'
];

export const VALID_ATTRIBUTES: ChemicalAttribute[] = [
  'PYRO',
  'AQUA',
  'TERRA',
  'AERO',
  'ELECTRO',
  'ACID_DARK',
  'NOBLE_VOID'
];

export const VALID_SPELL_TRAP_SUBTYPES: SpellTrapSubtype[] = [
  'NORMAL_SPELL',
  'CONTINUOUS_SPELL',
  'QUICK_PLAY_SPELL',
  'FIELD_SPELL',
  'EQUIP_SPELL',
  'RITUAL_SPELL',
  'NORMAL_TRAP',
  'COUNTER_TRAP',
  'CONTINUOUS_TRAP'
];

export const VALID_EFFECT_OPCODES: EffectOpcode[] = [
  'DRAW_CARD',
  'SEARCH_CARD',
  'MODIFY_STATS',
  'DESTROY_CARD',
  'NEGATE_EFFECT',
  'BURN_DAMAGE',
  'HEAL_LP',
  'SUMMON_TOKEN',
  'BANISH_CARD',
  'APPLY_STATUS',
  'RETURN_TO_HAND',
  'BOUNCE_TO_DECK',
  'SWAP_ATK_DEF',
  'RECOVER_RESOURCE'
];

export interface CardValidationResult {
  valid: boolean;
  errors: string[];
}

export interface BatchValidationResult {
  valid: boolean;
  totalCards: number;
  validCards: number;
  invalidCards: number;
  duplicateIds: string[];
  duplicateNames: string[];
  errors: { cardId: string; cardName: string; errors: string[] }[];
}

/**
 * Validates a single PlayableCardDef record against strict TCG & chemical invariants.
 */
export function validateCardDef(card: PlayableCardDef): CardValidationResult {
  const errors: string[] = [];

  // Required string identity fields
  if (!card.id || typeof card.id !== 'string' || card.id.trim() === '') {
    errors.push('Missing or invalid id');
  } else if (!/^[a-z0-9_]+$/.test(card.id)) {
    errors.push(`Card ID [${card.id}] must only contain lowercase alphanumeric characters and underscores`);
  }

  if (!card.name || typeof card.name !== 'string' || card.name.trim() === '') {
    errors.push('Missing or invalid name');
  }

  if (!card.name_en || typeof card.name_en !== 'string' || card.name_en.trim() === '') {
    errors.push('Missing or invalid name_en');
  }

  // Card Type
  if (!VALID_CARD_TYPES.includes(card.cardType)) {
    errors.push(`Invalid cardType [${card.cardType}]`);
  }

  // Rarity
  if (!VALID_RARITIES.includes(card.rarity)) {
    errors.push(`Invalid rarity [${card.rarity}]`);
  }

  // Attribute
  if (!VALID_ATTRIBUTES.includes(card.attribute)) {
    errors.push(`Invalid attribute [${card.attribute}]`);
  }

  // Mana Cost bounds
  if (typeof card.manaCost !== 'number' || card.manaCost < 0 || card.manaCost > 12) {
    errors.push(`Invalid manaCost [${card.manaCost}], must be an integer between 0 and 12`);
  }

  // Monster specific rules
  const isMonster = [
    'ELEMENT_MONSTER',
    'COMPOUND_MONSTER',
    'LINK_MONSTER',
    'SYNCHRO_MONSTER',
    'XYZ_MONSTER',
    'PENDULUM_MONSTER',
    'RITUAL_MONSTER',
    'TOKEN_MONSTER'
  ].includes(card.cardType);

  if (isMonster) {
    // ATK is mandatory for monsters
    if (typeof card.atk !== 'number' || card.atk < 0 || card.atk > 5000) {
      errors.push(`Monster [${card.id}] ATK must be between 0 and 5000 (got ${card.atk})`);
    }

    // Link Monster invariants
    if (card.cardType === 'LINK_MONSTER') {
      if (card.def !== undefined) {
        errors.push(`Link Monster [${card.id}] cannot have a DEF stat (Rulebook v10 tr. 22-23)`);
      }
      if (typeof card.linkRating !== 'number' || card.linkRating < 1 || card.linkRating > 8) {
        errors.push(`Link Monster [${card.id}] linkRating must be between 1 and 8 (got ${card.linkRating})`);
      }
      if (!card.linkArrows || !Array.isArray(card.linkArrows) || card.linkArrows.length === 0) {
        errors.push(`Link Monster [${card.id}] must define at least 1 linkArrow`);
      }
    } else {
      // Non-Link monsters must have DEF
      if (typeof card.def !== 'number' || card.def < 0 || card.def > 5000) {
        errors.push(`Monster [${card.id}] DEF must be between 0 and 5000 (got ${card.def})`);
      }
    }

    // Xyz Monster invariants
    if (card.cardType === 'XYZ_MONSTER') {
      if (typeof card.xyzRank !== 'number' || card.xyzRank < 1 || card.xyzRank > 13) {
        errors.push(`Xyz Monster [${card.id}] xyzRank must be between 1 and 13 (got ${card.xyzRank})`);
      }
      if (card.level !== undefined) {
        errors.push(`Xyz Monster [${card.id}] has Rank, not Level (Rulebook v10 tr. 18-19, 51)`);
      }
    } else if (card.cardType !== 'LINK_MONSTER') {
      // Standard Level for other monsters
      if (typeof card.level !== 'number' || card.level < 1 || card.level > 12) {
        errors.push(`Monster [${card.id}] level must be between 1 and 12 (got ${card.level})`);
      }
    }

    // Pendulum Scale invariants
    if (card.cardType === 'PENDULUM_MONSTER') {
      if (typeof card.pendulumScale !== 'number' || card.pendulumScale < 0 || card.pendulumScale > 13) {
        errors.push(`Pendulum Monster [${card.id}] pendulumScale must be between 0 and 13 (got ${card.pendulumScale})`);
      }
    }
  }

  // Spell / Trap specific rules
  const isSpellTrap = ['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT', 'TRAP'].includes(card.cardType);
  if (isSpellTrap) {
    if (card.atk !== undefined || card.def !== undefined) {
      errors.push(`Spell/Trap [${card.id}] cannot possess base ATK or DEF stats`);
    }
    if (!card.spellTrapSubtype || !VALID_SPELL_TRAP_SUBTYPES.includes(card.spellTrapSubtype)) {
      errors.push(`Spell/Trap [${card.id}] must possess a valid spellTrapSubtype (got ${card.spellTrapSubtype})`);
    }
  }

  // Scientific Lore & Descriptions
  if (!card.scientificLore || card.scientificLore.trim() === '') {
    errors.push(`Card [${card.id}] must provide educational scientificLore`);
  }

  if (!card.effectText || card.effectText.trim() === '') {
    errors.push(`Card [${card.id}] must provide effectText description`);
  }

  if (!card.effectCode || card.effectCode.trim() === '') {
    errors.push(`Card [${card.id}] must provide an effectCode identifier`);
  }

  // Structured Effects validation if present
  if (card.structuredEffects && Array.isArray(card.structuredEffects)) {
    for (const eff of card.structuredEffects) {
      if (!eff.effectId || !eff.activationWindow) {
        errors.push(`StructuredEffect in [${card.id}] must have effectId and activationWindow`);
      }
      if (!eff.operations || !Array.isArray(eff.operations) || eff.operations.length === 0) {
        errors.push(`StructuredEffect [${eff.effectId}] in [${card.id}] must define at least 1 operation`);
      } else {
        for (const op of eff.operations) {
          if (!VALID_EFFECT_OPCODES.includes(op.op)) {
            errors.push(`Unsupported opcode [${op.op}] in [${card.id}]`);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates a batch or full catalog of cards for integrity, schema validity, and duplication.
 */
export function validateCardCatalog(cards: PlayableCardDef[]): BatchValidationResult {
  const idMap = new Map<string, number>();
  const nameMap = new Map<string, number>();
  const duplicateIds: string[] = [];
  const duplicateNames: string[] = [];
  const errorsList: { cardId: string; cardName: string; errors: string[] }[] = [];

  let validCount = 0;

  for (const card of cards) {
    // Check ID duplicates
    const idCount = (idMap.get(card.id) || 0) + 1;
    idMap.set(card.id, idCount);
    if (idCount === 2) {
      duplicateIds.push(card.id);
    }

    // Check Name duplicates (case-insensitive trimmed)
    const normName = card.name.toLowerCase().trim();
    const nameCount = (nameMap.get(normName) || 0) + 1;
    nameMap.set(normName, nameCount);
    if (nameCount === 2) {
      duplicateNames.push(card.name);
    }

    // Validate schema
    const result = validateCardDef(card);
    if (result.valid) {
      validCount++;
    } else {
      errorsList.push({
        cardId: card.id,
        cardName: card.name,
        errors: result.errors
      });
    }
  }

  const isFullyValid = errorsList.length === 0 && duplicateIds.length === 0 && duplicateNames.length === 0;

  return {
    valid: isFullyValid,
    totalCards: cards.length,
    validCards: validCount,
    invalidCards: errorsList.length,
    duplicateIds,
    duplicateNames,
    errors: errorsList
  };
}
