// src/domain/relatedCardsService.ts
// Dynamic Chemistry & Gameplay Related Cards Engine for ELEMENTA Tactical TCG
// Maps data-driven chemical and tactical synergies without hardcoded UI lists.

import { PlayableCardDef } from './cardGameTypes';
import { getAllPlayableCards, getPlayableCardById } from '../data/playableCardsData';
import { REACTION_RULES_DATABASE, ReactionDetail } from '../data/reactionsData';

export type CardRelationType =
  | 'REACTANT'    // Thẻ cần kết hợp (Reactant needed for reaction/synthesis)
  | 'PRODUCT'     // Thẻ có thể tạo ra (Product formed from reaction/synthesis)
  | 'CATALYST'    // Thẻ xúc tác / hỗ trợ (Catalyst or supportive equip)
  | 'CONDITION'   // Thẻ điều kiện môi trường (Environment required, e.g. Moisture, High Temp)
  | 'COUNTER'     // Thẻ khắc chế (Neutralizes, quenches, or reverses reaction)
  | 'SYNERGY';    // Thẻ đồng bộ chiến thuật (Shares archetype, series or redox pairing)

export interface RelatedCardLink {
  targetCard: PlayableCardDef;
  relationType: CardRelationType;
  relationLabel: string;
  reason: string;
  formulaOrCondition?: string;
  isOwned: boolean;
  ownedCount: number;
}

/**
 * Discovers and computes all meaningful chemical and gameplay relations for a given card.
 */
export function getRelatedCards(
  card: PlayableCardDef,
  cardCollection: Record<string, number> = {}
): RelatedCardLink[] {
  if (!card) return [];

  const allCards = getAllPlayableCards();
  const cardFormula = card.chemicalFormula?.trim().toUpperCase();
  const cardSymbol = card.chemicalFormula?.replace(/[^a-zA-Z]/g, '') || '';
  const relations: RelatedCardLink[] = [];
  const addedTargetIds = new Set<string>();

  // 1. If card has an explicit synthesis recipe (Compound Monster / Extra Deck)
  if (card.synthesisRecipe && card.synthesisRecipe.reactantFormulas) {
    for (const req of card.synthesisRecipe.reactantFormulas) {
      const match = allCards.find(c => c.chemicalFormula?.toUpperCase() === req.formula.toUpperCase());
      if (match && !addedTargetIds.has(match.id)) {
        addedTargetIds.add(match.id);
        const owned = cardCollection[match.id] || 0;
        relations.push({
          targetCard: match,
          relationType: 'REACTANT',
          relationLabel: 'Cần Kết Hợp',
          reason: `Nguyên liệu bắt buộc (${req.count}x ${req.formula}) để tổng hợp quái thú [${card.name}] theo phương trình: ${card.synthesisRecipe.pedagogicalEquation}`,
          formulaOrCondition: req.formula,
          isOwned: owned > 0,
          ownedCount: owned
        });
      }
    }
  }

  // 2. Reactions Database Discovery (Search reactants and products in 310+ verified IUPAC reactions)
  for (const rule of REACTION_RULES_DATABASE) {
    if (relations.length >= 12) break;

    const isReactant = (cardFormula && rule.reactants.some(r => r.toUpperCase() === cardFormula || r.toUpperCase() === cardSymbol.toUpperCase())) ||
      (cardFormula === 'H2O' && rule.requiredConditions.includes('MOISTURE_H2O'));
    
    // Check if card is a reactant in this rule -> find other reactants and products
    if (isReactant) {
      const arrowParts = (rule.balancedEquationPlain || rule.equation).split(/->|→|⇌/);
      const leftSide = arrowParts[0] || '';
      const rightSide = arrowParts[1] || '';

      // 2a. Find other co-reactants
      for (const otherReactant of rule.reactants) {
        if (otherReactant.toUpperCase() === cardFormula || otherReactant.toUpperCase() === cardSymbol.toUpperCase()) continue;
        const coReactantCard = allCards.find(c => c.chemicalFormula?.toUpperCase() === otherReactant.toUpperCase());
        if (coReactantCard && !addedTargetIds.has(coReactantCard.id)) {
          addedTargetIds.add(coReactantCard.id);
          const owned = cardCollection[coReactantCard.id] || 0;
          relations.push({
            targetCard: coReactantCard,
            relationType: 'REACTANT',
            relationLabel: 'Cần Kết Hợp',
            reason: `Phản ứng với [${card.name}] theo quy tắc [${rule.name_vi}]: ${rule.equation}`,
            formulaOrCondition: rule.equation,
            isOwned: owned > 0,
            ownedCount: owned
          });
        }
      }

      // 2b. If reaction involves Water (MOISTURE_H2O or H2O in leftSide) and card is not H2O itself
      if (cardFormula !== 'H2O' && (rule.requiredConditions.includes('MOISTURE_H2O') || leftSide.includes('H₂O') || leftSide.includes('H2O'))) {
        const waterCard = allCards.find(c => c.chemicalFormula === 'H2O');
        if (waterCard && !addedTargetIds.has(waterCard.id)) {
          addedTargetIds.add(waterCard.id);
          const owned = cardCollection[waterCard.id] || 0;
          relations.push({
            targetCard: waterCard,
            relationType: 'REACTANT',
            relationLabel: 'Cần Kết Hợp',
            reason: `Tác dụng với nước [${waterCard.name}] theo phản ứng [${rule.name_vi}]: ${rule.equation}`,
            formulaOrCondition: 'H2O',
            isOwned: owned > 0,
            ownedCount: owned
          });
        }
      }

      // 2c. Check required conditions (Environment/Catalysts)
      for (const cond of rule.requiredConditions) {
        const condCard = allCards.find(c => 
          (cond === 'MOISTURE_H2O' && c.chemicalFormula === 'H2O') ||
          (cond === 'HIGH_TEMP' && (c.effectCode?.includes('TEMP') || c.attribute === 'PYRO')) ||
          (cond === 'ACID_DILUTE' && c.chemicalFormula === 'HCl') ||
          (cond === 'BASE_ALKALINE' && c.chemicalFormula === 'NaOH')
        );
        if (condCard && !addedTargetIds.has(condCard.id)) {
          addedTargetIds.add(condCard.id);
          const owned = cardCollection[condCard.id] || 0;
          relations.push({
            targetCard: condCard,
            relationType: 'CONDITION',
            relationLabel: 'Điều Kiện',
            reason: `Cung cấp điều kiện môi trường [${cond}] để kích hoạt phản ứng [${rule.name_vi}]`,
            formulaOrCondition: cond,
            isOwned: owned > 0,
            ownedCount: owned
          });
        }
      }

      // 2d. Find authentic products from the RIGHT side of the equation only
      if (rightSide) {
        const productTokens = rightSide
          .replace(/\([^)]*\)/g, '')
          .replace(/[↑↓]/g, '')
          .split('+')
          .map(t => t.trim().replace(/^\d+/, '').trim().toUpperCase())
          .filter(Boolean);

        let productsFromThisRule = 0;
        for (const candidate of allCards) {
          if (candidate.id === card.id || addedTargetIds.has(candidate.id)) continue;
          const candidateFormula = candidate.chemicalFormula?.trim().toUpperCase();
          if (!candidateFormula) continue;

          // Exact formula token match or sanitized formula match
          const isExactProduct = productTokens.some(pt => pt === candidateFormula || (candidateFormula.length > 1 && pt.includes(candidateFormula)));
          if (isExactProduct && !rule.reactants.includes(candidate.chemicalFormula || '')) {
            addedTargetIds.add(candidate.id);
            const owned = cardCollection[candidate.id] || 0;
            relations.push({
              targetCard: candidate,
              relationType: 'PRODUCT',
              relationLabel: 'Sản Phẩm',
              reason: `Sản phẩm tạo thành khi [${card.name}] phản ứng: ${rule.equation}`,
              formulaOrCondition: rule.equation,
              isOwned: owned > 0,
              ownedCount: owned
            });
            productsFromThisRule++;
            if (productsFromThisRule >= 2) break;
          }
        }
      }
    }
  }

  // 3. Counter relations (Neutralization / Redox / Quenching)
  if (card.cardType === 'ELEMENT_MONSTER' || card.cardType === 'COMPOUND_MONSTER') {
    // Acid vs Base Neutralization Counter
    const isAcid = card.effectText?.toLowerCase().includes('axit') || card.chemicalFormula === 'HCl' || card.chemicalFormula === 'H2SO4';
    const isBase = card.effectText?.toLowerCase().includes('bazơ') || card.chemicalFormula === 'NaOH' || card.chemicalFormula === 'KOH';
    
    if (isAcid) {
      const counterBase = allCards.find(c => c.chemicalFormula === 'NaOH' || c.chemicalFormula === 'KOH');
      if (counterBase && !addedTargetIds.has(counterBase.id)) {
        addedTargetIds.add(counterBase.id);
        const owned = cardCollection[counterBase.id] || 0;
        relations.push({
          targetCard: counterBase,
          relationType: 'COUNTER',
          relationLabel: 'Khắc Chế',
          reason: `Trung hòa dung dịch axit bằng bazơ kiềm mạnh: H⁺ + OH⁻ → H₂O`,
          isOwned: owned > 0,
          ownedCount: owned
        });
      }
    } else if (isBase) {
      const counterAcid = allCards.find(c => c.chemicalFormula === 'HCl' || c.chemicalFormula === 'H2SO4');
      if (counterAcid && !addedTargetIds.has(counterAcid.id)) {
        addedTargetIds.add(counterAcid.id);
        const owned = cardCollection[counterAcid.id] || 0;
        relations.push({
          targetCard: counterAcid,
          relationType: 'COUNTER',
          relationLabel: 'Khắc Chế',
          reason: `Trung hòa bazơ kiềm bằng dung dịch axit: OH⁻ + H⁺ → H₂O`,
          isOwned: owned > 0,
          ownedCount: owned
        });
      }
    }
  }

  // 4. Strategic Archetype Synergy
  if (card.archetype && relations.length < 8) {
    const archetypePeers = allCards.filter(c => c.id !== card.id && c.archetype === card.archetype);
    for (const peer of archetypePeers) {
      if (!addedTargetIds.has(peer.id)) {
        addedTargetIds.add(peer.id);
        const owned = cardCollection[peer.id] || 0;
        relations.push({
          targetCard: peer,
          relationType: 'SYNERGY',
          relationLabel: 'Đồng Bộ',
          reason: `Cùng thuộc chiến thuật liên kết [${card.archetype}], cộng hưởng sức mạnh hóa học trên sân.`,
          isOwned: owned > 0,
          ownedCount: owned
        });
        if (relations.length >= 8) break;
      }
    }
  }

  // 5. Fallback same chemical attribute or periodic group synergy if still sparse
  if (relations.length < 4) {
    const sameAttr = allCards.filter(c => c.id !== card.id && c.attribute === card.attribute && !addedTargetIds.has(c.id));
    for (const candidate of sameAttr.slice(0, 4 - relations.length)) {
      addedTargetIds.add(candidate.id);
      const owned = cardCollection[candidate.id] || 0;
      relations.push({
        targetCard: candidate,
        relationType: 'SYNERGY',
        relationLabel: 'Đồng Bộ',
        reason: `Cùng hệ thuộc tính hóa học [${card.attribute}], hiệp đồng kích hoạt hiệu ứng trường.`,
        isOwned: owned > 0,
        ownedCount: owned
      });
    }
  }

  return relations.slice(0, 10);
}
