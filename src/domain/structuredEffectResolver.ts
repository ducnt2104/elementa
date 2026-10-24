// src/domain/structuredEffectResolver.ts
// Deterministic Structured Effect Execution Engine for ELEMENTA Tactical TCG

import {
  StructuredEffectDefinition,
  EffectOperation,
  ChainItem,
  CardInstance,
  MonsterZoneSlot
} from './cardGameTypes';

export interface StructuredExecutionLog {
  opcode: string;
  status: 'SUCCESS' | 'SKIPPED' | 'FAILED';
  description: string;
}

export interface StructuredExecutionResult {
  success: boolean;
  logs: StructuredExecutionLog[];
}

/**
 * Executes machine-readable structured operations for a card effect during chain resolution.
 */
export function executeStructuredEffect(
  engine: any,
  activatorId: string,
  chainItem: ChainItem,
  effectDef: StructuredEffectDefinition
): StructuredExecutionResult {
  const logs: StructuredExecutionLog[] = [];
  const activator = engine.getDuelist(activatorId);
  const opponent = engine.getOpponent(activatorId);

  if (!activator || !opponent) {
    return {
      success: false,
      logs: [{ opcode: 'INIT', status: 'FAILED', description: 'Invalid activator or opponent player.' }]
    };
  }

  // 1. Check Activation Conditions
  if (effectDef.condition) {
    const { requiredAttributeOnField, requiredArchetypeOnField, minMonstersOnField, minOpponentMonsters } = effectDef.condition;

    if (minMonstersOnField !== undefined) {
      const myMonsters = activator.monsterZones.filter((z: MonsterZoneSlot | null) => z && z.card).length;
      if (myMonsters < minMonstersOnField) {
        return {
          success: false,
          logs: [{ opcode: 'CONDITION_CHECK', status: 'SKIPPED', description: `Requires at least ${minMonstersOnField} monsters on field.` }]
        };
      }
    }

    if (minOpponentMonsters !== undefined) {
      const oppMonsters = opponent.monsterZones.filter((z: MonsterZoneSlot | null) => z && z.card).length;
      if (oppMonsters < minOpponentMonsters) {
        return {
          success: false,
          logs: [{ opcode: 'CONDITION_CHECK', status: 'SKIPPED', description: `Requires at least ${minOpponentMonsters} opponent monsters.` }]
        };
      }
    }

    if (requiredAttributeOnField) {
      const hasAttr = activator.monsterZones.some(
        (z: MonsterZoneSlot | null) => z && z.card && z.card.def.attribute === requiredAttributeOnField
      );
      if (!hasAttr) {
        return {
          success: false,
          logs: [{ opcode: 'CONDITION_CHECK', status: 'SKIPPED', description: `Requires ${requiredAttributeOnField} monster on field.` }]
        };
      }
    }

    if (requiredArchetypeOnField) {
      const hasArch = activator.monsterZones.some(
        (z: MonsterZoneSlot | null) => z && z.card && z.card.def.archetype === requiredArchetypeOnField
      );
      if (!hasArch) {
        return {
          success: false,
          logs: [{ opcode: 'CONDITION_CHECK', status: 'SKIPPED', description: `Requires archetype ${requiredArchetypeOnField} on field.` }]
        };
      }
    }
  }

  // 2. Execute Operations Sequentially
  for (const op of effectDef.operations) {
    const { params } = op;

    switch (op.op) {
      case 'DRAW_CARD': {
        const count = params.amount || 1;
        for (let i = 0; i < count; i++) {
          engine.drawCard(activatorId);
        }
        logs.push({
          opcode: 'DRAW_CARD',
          status: 'SUCCESS',
          description: `Rút ${count} lá bài từ Bộ bài.`
        });
        break;
      }

      case 'SEARCH_CARD': {
        const deck = activator.deck;
        const matchIdx = deck.findIndex((c: CardInstance) => {
          if (params.cardTypeFilter && c.def.cardType !== params.cardTypeFilter) return false;
          if (params.attributeFilter && c.def.attribute !== params.attributeFilter) return false;
          if (params.archetypeFilter && c.def.archetype !== params.archetypeFilter) return false;
          return true;
        });

        if (matchIdx !== -1) {
          const [found] = deck.splice(matchIdx, 1);
          activator.hand.push(found);
          logs.push({
            opcode: 'SEARCH_CARD',
            status: 'SUCCESS',
            description: `Tìm kiếm thành công [${found.def.name}] và thêm vào tay.`
          });
        } else {
          logs.push({
            opcode: 'SEARCH_CARD',
            status: 'SKIPPED',
            description: 'Không tìm thấy thẻ bài phù hợp trong bộ bài.'
          });
        }
        break;
      }

      case 'BURN_DAMAGE': {
        const dmg = params.amount || 300;
        opponent.lp = Math.max(0, opponent.lp - dmg);
        logs.push({
          opcode: 'BURN_DAMAGE',
          status: 'SUCCESS',
          description: `Gây ${dmg} LP sát thương hiệu ứng lên đối thủ. (Còn ${opponent.lp} LP)`
        });
        break;
      }

      case 'HEAL_LP': {
        const heal = params.amount || 500;
        activator.lp = Math.min(8000, activator.lp + heal);
        logs.push({
          opcode: 'HEAL_LP',
          status: 'SUCCESS',
          description: `Hồi phục ${heal} LP cho người chơi. (Hiện có ${activator.lp} LP)`
        });
        break;
      }

      case 'MODIFY_STATS': {
        const boost = params.amount || 300;
        const stat = params.statTarget || 'ATK';

        if (params.targetScope === 'ALL_ALLIES') {
          for (const slot of activator.monsterZones) {
            if (slot && slot.card) {
              if (stat === 'ATK' || stat === 'BOTH') slot.tempAtkBoost += boost;
              if (stat === 'DEF' || stat === 'BOTH') slot.tempDefBoost += boost;
            }
          }
          logs.push({
            opcode: 'MODIFY_STATS',
            status: 'SUCCESS',
            description: `Tăng ${boost} ${stat} cho tất cả quái thú đồng minh.`
          });
        } else if (params.targetScope === 'ALL_ENEMIES') {
          for (const slot of opponent.monsterZones) {
            if (slot && slot.card) {
              if (stat === 'ATK' || stat === 'BOTH') slot.tempAtkBoost = Math.max(-slot.card.def.atk, slot.tempAtkBoost - boost);
              if (stat === 'DEF' || stat === 'BOTH') slot.tempDefBoost = Math.max(-(slot.card.def.def || 0), slot.tempDefBoost - boost);
            }
          }
          logs.push({
            opcode: 'MODIFY_STATS',
            status: 'SUCCESS',
            description: `Giảm ${boost} ${stat} của tất cả quái thú đối thủ.`
          });
        } else {
          // Default: Target designated in chainItem
          const targetSlot = chainItem.targetSlotIndex !== undefined ? activator.monsterZones[chainItem.targetSlotIndex] : null;
          if (targetSlot && targetSlot.card) {
            if (stat === 'ATK' || stat === 'BOTH') targetSlot.tempAtkBoost += boost;
            if (stat === 'DEF' || stat === 'BOTH') targetSlot.tempDefBoost += boost;
            logs.push({
              opcode: 'MODIFY_STATS',
              status: 'SUCCESS',
              description: `Điều chỉnh ${boost} ${stat} cho [${targetSlot.card.def.name}].`
            });
          }
        }
        break;
      }

      case 'DESTROY_CARD': {
        if (params.targetScope === 'ALL_ENEMIES') {
          let destroyed = 0;
          for (let i = 0; i < opponent.monsterZones.length; i++) {
            const slot = opponent.monsterZones[i];
            if (slot && slot.card) {
              engine.sendMonsterToGraveyard(opponent.id, i, false);
              destroyed++;
            }
          }
          logs.push({
            opcode: 'DESTROY_CARD',
            status: 'SUCCESS',
            description: `Tiêu diệt ${destroyed} quái thú đối phương.`
          });
        } else if (chainItem.targetSlotIndex !== undefined) {
          engine.sendMonsterToGraveyard(opponent.id, chainItem.targetSlotIndex, false);
          logs.push({
            opcode: 'DESTROY_CARD',
            status: 'SUCCESS',
            description: `Tiêu diệt quái thú tại ô ${chainItem.targetSlotIndex}.`
          });
        }
        break;
      }

      case 'SUMMON_TOKEN': {
        const tokenDef = params.tokenDef || {
          name: 'Token Gốc Tự Do',
          name_en: 'Free Radical Token',
          atk: 500,
          def: 500,
          level: 1,
          attribute: 'AERO',
          chemicalFormula: '·R',
          scientificLore: 'Gốc tự do trung gian hoạt tính cao.'
        };
        const summoned = engine.summonToken(activatorId, tokenDef, 'FACE_UP_ATTACK');
        logs.push({
          opcode: 'SUMMON_TOKEN',
          status: summoned ? 'SUCCESS' : 'SKIPPED',
          description: summoned ? `Triệu hồi thành công [${tokenDef.name}].` : 'Không còn ô quái thú trống.'
        });
        break;
      }

      case 'BANISH_CARD': {
        const amount = params.amount || 1;
        const banishRes = engine.banishTopCardsFromDeck(opponent.id, amount, false);
        logs.push({
          opcode: 'BANISH_CARD',
          status: 'SUCCESS',
          description: `Trục xuất ${banishRes.count} lá bài từ đỉnh bộ bài đối phương.`
        });
        break;
      }

      case 'APPLY_STATUS': {
        const statusType = params.statusType || 'PASSIVATION';
        if (statusType === 'PASSIVATION') {
          for (const slot of activator.monsterZones) {
            if (slot && slot.card) slot.passivationShieldUsed = false;
          }
          logs.push({
            opcode: 'APPLY_STATUS',
            status: 'SUCCESS',
            description: 'Thiết lập màng thụ động hóa Al2O3 bảo vệ quái thú.'
          });
        } else if (statusType === 'POSITION_LOCKED') {
          for (const slot of opponent.monsterZones) {
            if (slot && slot.card) slot.positionLockedUntilTurn = engine.currentTurn + (params.turns || 2);
          }
          logs.push({
            opcode: 'APPLY_STATUS',
            status: 'SUCCESS',
            description: `Khóa tư thế chiến đấu của quái thú đối phương trong ${params.turns || 2} lượt.`
          });
        }
        break;
      }

      case 'RETURN_TO_HAND': {
        if (chainItem.targetSlotIndex !== undefined) {
          const slot = opponent.monsterZones[chainItem.targetSlotIndex];
          if (slot && slot.card) {
            const card = slot.card;
            slot.card = null;
            opponent.hand.push(card);
            logs.push({
              opcode: 'RETURN_TO_HAND',
              status: 'SUCCESS',
              description: `Thu hồi [${card.def.name}] về tay đối thủ.`
            });
          }
        }
        break;
      }

      case 'BOUNCE_TO_DECK': {
        if (chainItem.targetSlotIndex !== undefined) {
          const slot = opponent.monsterZones[chainItem.targetSlotIndex];
          if (slot && slot.card) {
            const card = slot.card;
            slot.card = null;
            opponent.deck.unshift(card);
            logs.push({
              opcode: 'BOUNCE_TO_DECK',
              status: 'SUCCESS',
              description: `Đẩy lùi [${card.def.name}] về đỉnh Bộ bài.`
            });
          }
        }
        break;
      }

      case 'SWAP_ATK_DEF': {
        if (chainItem.targetSlotIndex !== undefined) {
          const slot = activator.monsterZones[chainItem.targetSlotIndex];
          if (slot && slot.card) {
            engine.swapMonsterAtkDef(activatorId, chainItem.targetSlotIndex);
            logs.push({
              opcode: 'SWAP_ATK_DEF',
              status: 'SUCCESS',
              description: `Hoán đổi ATK/DEF của [${slot.card.def.name}] theo phản ứng Oxi hóa - Khử.`
            });
          }
        }
        break;
      }

      case 'RECOVER_RESOURCE': {
        const manaGain = params.amount || 2;
        activator.mana = Math.min(10, activator.mana + manaGain);
        logs.push({
          opcode: 'RECOVER_RESOURCE',
          status: 'SUCCESS',
          description: `Phục hồi +${manaGain} Mana cho người chơi.`
        });
        break;
      }

      case 'NEGATE_EFFECT': {
        logs.push({
          opcode: 'NEGATE_EFFECT',
          status: 'SUCCESS',
          description: 'Vô hiệu hóa hiệu ứng của đối thủ.'
        });
        break;
      }

      default:
        logs.push({
          opcode: (op as any).op,
          status: 'SKIPPED',
          description: `Opcode [${(op as any).op}] không được hỗ trợ.`
        });
        break;
    }
  }

  return {
    success: true,
    logs
  };
}
