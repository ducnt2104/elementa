// src/components/deck/TacticalDeckBuilderTab.tsx
// Comprehensive Yu-Gi-Oh! Inspired Tactical 40-60 Card Deck Builder

import React, { useState, useMemo, useEffect } from 'react';
import { PlayerProfile, DuelDeckConfig } from '../../domain/types';
import { PLAYABLE_CARDS, getPlayableCardById, getAllPlayableCards } from '../../data/playableCardsData';
import { PlayableCardDef, CardType, ChemicalAttribute, CardRarity } from '../../domain/cardGameTypes';
import { ChemicalCardView } from '../cards/ChemicalCardView';
import { CardDetailModal } from '../cards/CardDetailModal';
import { CardScientificInspector } from '../duel/CardScientificInspector';
import { sound } from '../../audio/soundEngine';
import {
  DeckManagementService,
  DeckSlot,
  DeckSynergyAnalysis,
  TournamentFormat,
  PREBUILT_DECKS,
  TOTAL_DECK_SLOTS,
  MIN_MAIN_DECK_CARDS,
  MAX_MAIN_DECK_CARDS,
  MAX_EXTRA_DECK_CARDS,
  MAX_SIDE_DECK_CARDS
} from '../../domain/deckManagement';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
  Shield,
  Flame,
  Droplets,
  BookOpen,
  Copy,
  ChevronDown,
  Star,
  Info,
  Share2,
  Download,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  Atom,
  Maximize2
} from 'lucide-react';

interface TacticalDeckBuilderTabProps {
  profile: PlayerProfile;
  onSaveDeck: (updatedDeck: DuelDeckConfig) => void;
}

export const TacticalDeckBuilderTab: React.FC<TacticalDeckBuilderTabProps> = ({
  profile,
  onSaveDeck
}) => {
  // 9 Deck Slots State
  const [deckSlots, setDeckSlots] = useState<DeckSlot[]>(() => DeckManagementService.loadDeckSlots());
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(() => {
    const slots = DeckManagementService.loadDeckSlots();
    const defaultIdx = slots.findIndex(s => s.isDefault);
    return defaultIdx !== -1 ? defaultIdx : 0;
  });

  const activeSlot = deckSlots[activeSlotIndex] || deckSlots[0];

  const [deckName, setDeckName] = useState<string>(activeSlot?.name || 'Bộ Bài Ô 1');
  const [mainDeckCardIds, setMainDeckCardIds] = useState<string[]>([...(activeSlot?.mainDeck || [])]);
  const [extraDeckCardIds, setExtraDeckCardIds] = useState<string[]>([...(activeSlot?.extraDeck || [])]);
  const [sideDeckCardIds, setSideDeckCardIds] = useState<string[]>([...(activeSlot?.sideDeck || [])]);
  const [duplicateTargetIndex, setDuplicateTargetIndex] = useState<number>(0);
  const [targetDeckSection, setTargetDeckSection] = useState<'AUTO' | 'SIDE'>('AUTO');
  const [selectedFormat, setSelectedFormat] = useState<TournamentFormat>('STANDARD_GDPT');

  // Sync when active slot index changes
  const handleSelectSlot = (idx: number) => {
    sound.playCardSelect();
    setActiveSlotIndex(idx);
    const target = deckSlots[idx];
    if (target) {
      setDeckName(target.name);
      setMainDeckCardIds([...target.mainDeck]);
      setExtraDeckCardIds([...target.extraDeck]);
      setSideDeckCardIds([...(target.sideDeck || [])]);
    }
  };
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('ALL');
  const [onlyOwned, setOnlyOwned] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const CARDS_PER_PAGE = 36;
  const [selectedInspectCard, setSelectedInspectCard] = useState<PlayableCardDef | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [showDeepScienceInspector, setShowDeepScienceInspector] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // All available archetypes for filtering
  const allArchetypes = useMemo(() => {
    const set = new Set<string>();
    getAllPlayableCards().forEach(c => {
      if (c.archetype) set.add(c.archetype);
    });
    return Array.from(set).sort();
  }, []);

  // Reset page to 1 on filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedAttribute, selectedRarity, selectedArchetype, onlyOwned]);

  // Export & Import Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [exportedCode, setExportedCode] = useState<string>('');
  const [importInputCode, setImportInputCode] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);
  const [copiedExport, setCopiedExport] = useState<boolean>(false);

  // Available cards in collection
  const collectionOwned = profile.cardCollection || {};

  // Resolved card objects in Main Deck, Extra Deck & Side Deck
  const mainCards = useMemo(() => {
    return mainDeckCardIds.map(id => getPlayableCardById(id)).filter((c): c is PlayableCardDef => c !== undefined);
  }, [mainDeckCardIds]);

  const extraCards = useMemo(() => {
    return extraDeckCardIds.map(id => getPlayableCardById(id)).filter((c): c is PlayableCardDef => c !== undefined);
  }, [extraDeckCardIds]);

  const sideCards = useMemo(() => {
    return sideDeckCardIds.map(id => getPlayableCardById(id)).filter((c): c is PlayableCardDef => c !== undefined);
  }, [sideDeckCardIds]);

  // Card counts in deck for 3-copy rule validation
  const deckCardCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id of [...mainDeckCardIds, ...extraDeckCardIds, ...sideDeckCardIds]) {
      counts[id] = (counts[id] || 0) + 1;
    }
    return counts;
  }, [mainDeckCardIds, extraDeckCardIds, sideDeckCardIds]);

  // Mana Curve Analysis (1 to 10)
  const manaCurve = useMemo(() => {
    const curve: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    for (const c of mainCards) {
      const cost = Math.min(8, Math.max(1, c.manaCost));
      curve[cost] = (curve[cost] || 0) + 1;
    }
    return curve;
  }, [mainCards]);

  // Deck Ratio Statistics
  const monsterCount = mainCards.filter(c => c.cardType === 'ELEMENT_MONSTER' || c.cardType === 'COMPOUND_MONSTER' || c.cardType === 'LINK_MONSTER').length;
  const spellCount = mainCards.filter(c => c.cardType === 'REACTION_SPELL' || c.cardType === 'EQUIP_CATALYST' || c.cardType === 'FIELD_ENVIRONMENT').length;
  const trapCount = mainCards.filter(c => c.cardType === 'TRAP').length;

  // Comprehensive TCG Validation & Elemental Synergy Analysis
  const validation = useMemo(() => {
    return DeckManagementService.validateDeck(
      mainDeckCardIds,
      extraDeckCardIds,
      sideDeckCardIds,
      collectionOwned,
      selectedFormat
    );
  }, [mainDeckCardIds, extraDeckCardIds, sideDeckCardIds, collectionOwned, selectedFormat]);

  const synergy = useMemo(() => {
    return DeckManagementService.analyzeDeckSynergy(mainDeckCardIds, extraDeckCardIds);
  }, [mainDeckCardIds, extraDeckCardIds]);

  const isValidMainCount = mainCards.length >= MIN_MAIN_DECK_CARDS && mainCards.length <= MAX_MAIN_DECK_CARDS;
  const isValidExtraCount = extraCards.length <= MAX_EXTRA_DECK_CARDS;
  const isValidSideCount = sideCards.length <= MAX_SIDE_DECK_CARDS;
  const isDeckValid = validation.isValid;

  // Filter available cards in pool
  const filteredCatalog = useMemo(() => {
    return getAllPlayableCards().filter(card => {
      // Name / Formula / Lore search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(query) || card.name_en.toLowerCase().includes(query);
        const matchesFormula = card.chemicalFormula?.toLowerCase().includes(query);
        const matchesIupac = card.iupacName?.toLowerCase().includes(query);
        if (!matchesName && !matchesFormula && !matchesIupac) return false;
      }

      // Card Type filter
      if (selectedType !== 'ALL') {
        if (selectedType === 'ELEMENT' && card.cardType !== 'ELEMENT_MONSTER') return false;
        if (selectedType === 'COMPOUND' && card.cardType !== 'COMPOUND_MONSTER') return false;
        if (selectedType === 'SYNCHRO' && (card.cardType !== 'SYNCHRO_MONSTER' && !card.isTuner && !card.synchroLevel)) return false;
        if (selectedType === 'XYZ' && (card.cardType !== 'XYZ_MONSTER' && !card.xyzRank)) return false;
        if (selectedType === 'PENDULUM' && (card.cardType !== 'PENDULUM_MONSTER' && card.pendulumScale === undefined)) return false;
        if (selectedType === 'LINK' && card.cardType !== 'LINK_MONSTER') return false;
        if (selectedType === 'RITUAL' && (card.cardType !== 'RITUAL_MONSTER' && !card.isRitualMonster && card.spellTrapSubtype !== 'RITUAL_SPELL')) return false;
        if (selectedType === 'SPELL' && card.cardType !== 'REACTION_SPELL' && card.cardType !== 'EQUIP_CATALYST' && card.cardType !== 'FIELD_ENVIRONMENT') return false;
        if (selectedType === 'TRAP' && card.cardType !== 'TRAP') return false;
      }

      // Attribute filter
      if (selectedAttribute !== 'ALL' && card.attribute !== selectedAttribute) return false;

      // Rarity filter
      if (selectedRarity !== 'ALL' && card.rarity !== selectedRarity) return false;

      // Archetype filter
      if (selectedArchetype !== 'ALL' && card.archetype !== selectedArchetype) return false;

      // Only Owned filter (Layer 2 Player Collection Segregation)
      if (onlyOwned && (collectionOwned[card.id] || 0) <= 0) return false;

      return true;
    });
  }, [searchQuery, selectedType, selectedAttribute, selectedRarity, selectedArchetype, onlyOwned, collectionOwned]);

  // Windowed Pagination for Deck Catalog (36 cards/page)
  const totalPages = Math.max(1, Math.ceil(filteredCatalog.length / CARDS_PER_PAGE));
  const paginatedCatalog = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredCatalog.slice(start, start + CARDS_PER_PAGE);
  }, [filteredCatalog, currentPage]);

  // Add card to deck
  const handleAddCard = (card: PlayableCardDef, forceTarget?: 'MAIN' | 'EXTRA' | 'SIDE' | 'AUTO') => {
    const currentCount = deckCardCounts[card.id] || 0;
    const maxOwned = collectionOwned[card.id] || 0;

    if (maxOwned <= 0) {
      sound.playErrorFizzle();
      showNotice(`Bạn chưa sở hữu lá bài [${card.name}] trong Kho thẻ! Hãy mở Gói Thẻ trong Cửa Hàng.`);
      return;
    }

    if (currentCount >= 3) {
      sound.playErrorFizzle();
      showNotice('Luật TCG: Tối đa 3 bản sao của cùng 1 lá bài trong cả Main, Extra và Side Deck!');
      return;
    }

    if (currentCount >= maxOwned) {
      sound.playErrorFizzle();
      showNotice(`Bạn chỉ sở hữu ${maxOwned} bản sao của lá bài này trong Kho thẻ!`);
      return;
    }

    const targetMode = forceTarget || (targetDeckSection === 'SIDE' ? 'SIDE' : 'AUTO');

    if (targetMode === 'SIDE') {
      if (sideDeckCardIds.length >= MAX_SIDE_DECK_CARDS) {
        sound.playErrorFizzle();
        showNotice(`Side Deck tối đa ${MAX_SIDE_DECK_CARDS} lá bài!`);
        return;
      }
      sound.playCardSelect();
      setSideDeckCardIds([...sideDeckCardIds, card.id]);
      showNotice(`Đã thêm [${card.name}] vào Side Deck!`);
      return;
    }

    // Determine target deck (Compound, Link, Synchro, Xyz monsters go to Extra Deck, others to Main Deck)
    const isExtraDeckMonster = card.cardType === 'COMPOUND_MONSTER' ||
      card.cardType === 'LINK_MONSTER' ||
      card.cardType === 'SYNCHRO_MONSTER' ||
      card.cardType === 'XYZ_MONSTER' ||
      !!card.synchroLevel ||
      !!card.xyzRank;

    if (isExtraDeckMonster) {
      if (extraDeckCardIds.length >= MAX_EXTRA_DECK_CARDS) {
        sound.playErrorFizzle();
        showNotice(`Extra Deck tối đa ${MAX_EXTRA_DECK_CARDS} lá bài!`);
        return;
      }
      sound.playCardSelect();
      setExtraDeckCardIds([...extraDeckCardIds, card.id]);
    } else {
      if (mainDeckCardIds.length >= MAX_MAIN_DECK_CARDS) {
        sound.playErrorFizzle();
        showNotice(`Main Deck tối đa ${MAX_MAIN_DECK_CARDS} lá bài!`);
        return;
      }
      sound.playCardSelect();
      setMainDeckCardIds([...mainDeckCardIds, card.id]);
    }
  };

  // Remove card from deck
  const handleRemoveMainCard = (index: number) => {
    sound.playCardSelect();
    const updated = [...mainDeckCardIds];
    updated.splice(index, 1);
    setMainDeckCardIds(updated);
  };

  const handleRemoveExtraCard = (index: number) => {
    sound.playCardSelect();
    const updated = [...extraDeckCardIds];
    updated.splice(index, 1);
    setExtraDeckCardIds(updated);
  };

  const handleRemoveSideCard = (index: number) => {
    sound.playCardSelect();
    const updated = [...sideDeckCardIds];
    updated.splice(index, 1);
    setSideDeckCardIds(updated);
  };

  const handleSwapWithSideDeck = (origCardId: string, sideCardId: string) => {
    sound.playCardSelect();
    const res = DeckManagementService.swapCardsWithSideDeck(activeSlotIndex, origCardId, sideCardId, 'MAIN');
    if (res.success && res.updatedSlot) {
      setMainDeckCardIds([...res.updatedSlot.mainDeck]);
      setSideDeckCardIds([...(res.updatedSlot.sideDeck || [])]);
      showNotice('Đã hoán đổi thẻ bài với Side Deck thành công!');
    } else {
      sound.playErrorFizzle();
      showNotice(res.error || 'Hoán đổi thẻ bài thất bại!');
    }
  };

  const handleRemoveCardById = (cardId: string) => {
    const sideIdx = sideDeckCardIds.lastIndexOf(cardId);
    if (sideIdx !== -1) {
      handleRemoveSideCard(sideIdx);
      return;
    }
    const extraIdx = extraDeckCardIds.lastIndexOf(cardId);
    if (extraIdx !== -1) {
      handleRemoveExtraCard(extraIdx);
      return;
    }
    const mainIdx = mainDeckCardIds.lastIndexOf(cardId);
    if (mainIdx !== -1) {
      handleRemoveMainCard(mainIdx);
    }
  };

  const handleSaveDeck = () => {
    sound.playUiClick();
    const updated = DeckManagementService.saveSlot(activeSlotIndex, {
      name: deckName.trim() || `Bộ Bài Ô ${activeSlotIndex + 1}`,
      mainDeck: mainDeckCardIds,
      extraDeck: extraDeckCardIds,
      sideDeck: sideDeckCardIds
    });
    setDeckSlots([...updated]);

    const updatedSlot = updated[activeSlotIndex];
    if (updatedSlot.isDefault) {
      onSaveDeck({
        id: updatedSlot.id,
        name: updatedSlot.name,
        mainDeck: updatedSlot.mainDeck,
        extraDeck: updatedSlot.extraDeck,
        sideDeck: updatedSlot.sideDeck
      });
    }

    sound.playVictory();
    showNotice(`Đã lưu thành công Bộ bài vào Ô ${activeSlotIndex + 1}!`);
  };

  const handleSetDefault = () => {
    if (!validation.isValid) {
      sound.playErrorFizzle();
      showNotice('Không thể đặt làm bộ bài thi đấu mặc định khi chưa đủ 30-60 lá hoặc còn vi phạm luật!');
      return;
    }
    sound.playUiClick();
    const updated = DeckManagementService.setDefaultSlot(activeSlotIndex);
    setDeckSlots([...updated]);
    const current = updated[activeSlotIndex];
    onSaveDeck({
      id: current.id,
      name: current.name,
      mainDeck: current.mainDeck,
      extraDeck: current.extraDeck,
      sideDeck: current.sideDeck
    });
    sound.playLevelUp();
    showNotice(`Đã đặt "${current.name}" làm Bộ Bài Thi Đấu Mặc Định!`);
  };

  const handleDuplicateToTarget = () => {
    sound.playUiClick();
    const updated = DeckManagementService.duplicateSlot(activeSlotIndex, duplicateTargetIndex);
    setDeckSlots([...updated]);
    showNotice(`Đã nhân bản sang Ô ${duplicateTargetIndex + 1} thành công!`);
  };

  const handleLoadPresetDeck = (presetId: string) => {
    sound.playCardSelect();
    const preset = PREBUILT_DECKS.find(p => p.id === presetId);
    if (!preset) return;
    setDeckName(preset.name);
    setMainDeckCardIds([...preset.mainDeck]);
    setExtraDeckCardIds([...preset.extraDeck]);
    setSideDeckCardIds([...(preset.sideDeck || [])]);

    // Check ownership of cards in preset
    const presetCounts: Record<string, number> = {};
    for (const id of [...preset.mainDeck, ...preset.extraDeck, ...(preset.sideDeck || [])]) {
      presetCounts[id] = (presetCounts[id] || 0) + 1;
    }
    let missingCount = 0;
    for (const [id, needed] of Object.entries(presetCounts)) {
      const owned = collectionOwned[id] || 0;
      if (owned < needed) {
        missingCount += (needed - owned);
      }
    }

    if (missingCount > 0) {
      sound.playErrorFizzle();
      showNotice(`Đã nạp bộ bài mẫu "${preset.name}". Cảnh báo: Bạn còn thiếu ${missingCount} lá bài trong Kho thẻ để có thể sử dụng bộ bài này thi đấu! Hãy mở Gói Thẻ trong Cửa Hàng.`);
    } else {
      showNotice(`Đã nạp bộ bài mẫu "${preset.name}" vào Ô ${activeSlotIndex + 1}! Tất cả thẻ bài đều đã sở hữu.`);
    }
  };

  const handleResetSlot = () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ bài trong Ô ${activeSlotIndex + 1}?`)) return;
    sound.playUiClick();
    const updated = DeckManagementService.resetSlot(activeSlotIndex);
    setDeckSlots([...updated]);
    setDeckName(`Bộ Bài Ô ${activeSlotIndex + 1} (Trống)`);
    setMainDeckCardIds([]);
    setExtraDeckCardIds([]);
    setSideDeckCardIds([]);
    showNotice(`Đã làm trống Ô ${activeSlotIndex + 1}!`);
  };

  const handleOpenExport = () => {
    sound.playUiClick();
    try {
      const code = DeckManagementService.exportDeckToString(activeSlotIndex);
      setExportedCode(code);
      setCopiedExport(false);
      setIsExportModalOpen(true);
    } catch (e: any) {
      sound.playErrorFizzle();
      showNotice(e?.message || 'Không thể xuất mã bộ bài!');
    }
  };

  const handleCopyExportCode = () => {
    if (!exportedCode) return;
    navigator.clipboard?.writeText(exportedCode);
    setCopiedExport(true);
    sound.playLevelUp();
    showNotice('Đã sao chép mã bộ bài vào bộ nhớ tạm (Clipboard)!');
  };

  const handleExecuteImport = () => {
    sound.playUiClick();
    setImportError(null);
    const res = DeckManagementService.importDeckFromString(activeSlotIndex, importInputCode);
    if (res.success && res.deck) {
      setDeckSlots([...res.slots]);
      setDeckName(res.deck.name);
      setMainDeckCardIds([...res.deck.mainDeck]);
      setExtraDeckCardIds([...res.deck.extraDeck]);
      setSideDeckCardIds([...(res.deck.sideDeck || [])]);
      setIsImportModalOpen(false);
      setImportInputCode('');
      sound.playVictory();
      showNotice(`Đã nhập thành công bộ bài vào Ô ${activeSlotIndex + 1}!`);
    } else {
      sound.playErrorFizzle();
      setImportError(res.error || 'Nhập mã bộ bài thất bại!');
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-7xl mx-auto flex flex-col gap-4 select-none">
      {/* 9-Slot Deck Governance Selector Bar */}
      <div className="p-3 rounded-xl bg-navy/80 border border-navy-light/60 flex flex-col gap-2 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-ion">
          <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-cyan-400" />
            9 Ô Bộ Bài Cá Nhân (Deck Governance) — Đang chọn: Ô {activeSlotIndex + 1}
          </span>
          <span className="text-[11px] text-slate-400">
            {deckSlots.filter(s => s.mainDeck.length >= MIN_MAIN_DECK_CARDS).length} / {TOTAL_DECK_SLOTS} Bộ bài sẵn sàng
          </span>
        </div>

        {/* 9 Horizontal Slots Row */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
          {deckSlots.map((slot, idx) => {
            const isCurrent = activeSlotIndex === idx;
            const slotValidation = DeckManagementService.validateDeck(slot.mainDeck, slot.extraDeck);
            const isEmpty = slot.mainDeck.length === 0;

            return (
              <button
                key={`deck_slot_${idx}`}
                type="button"
                onClick={() => handleSelectSlot(idx)}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between h-20 transition-all ${
                  isCurrent
                    ? 'border-cyan-ion bg-cyan-950/80 ring-2 ring-cyan-ion shadow-md shadow-cyan-ion/40 scale-102'
                    : 'border-white/10 bg-black/40 hover:border-cyan-400/50 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono font-bold text-xs text-white">Ô {idx + 1}</span>
                  {slot.isDefault ? (
                    <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-bold border border-amber-500/40">
                      ★ Đấu
                    </span>
                  ) : null}
                </div>

                <div className="text-[10px] font-mono truncate w-full text-slate-300">
                  {slot.name}
                </div>

                <div className="flex items-center justify-between w-full text-[9px] font-mono">
                  <span className={isEmpty ? 'text-slate-500' : 'text-slate-400'}>
                    {isEmpty ? 'Trống' : `${slot.mainDeck.length} lá`}
                  </span>
                  {isEmpty ? (
                    <span className="text-slate-600">+</span>
                  ) : slotValidation.isValid ? (
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-navy/60 border border-navy-light/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-ion to-blue-600 flex items-center justify-center text-obsidian shadow-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="bg-black/50 border border-cyan-ion/40 rounded px-2.5 py-1 font-serif font-black text-lg text-ivory focus:outline-none focus:border-cyan-ion w-64 sm:w-80"
                placeholder="Đặt tên bộ bài..."
              />
              {activeSlot.isDefault && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold">
                  ★ Bộ Bài Mặc Định
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
              <span>Main: <strong className={isValidMainCount ? 'text-emerald-400' : 'text-amber-400'}>{mainDeckCardIds.length}</strong> / 30-60</span>
              <span>Extra: <strong className={isValidExtraCount ? 'text-emerald-400' : 'text-amber-400'}>{extraDeckCardIds.length}</strong> / 15</span>
              <span>Side: <strong className={isValidSideCount ? 'text-emerald-400' : 'text-amber-400'}>{sideDeckCardIds.length}</strong> / 15</span>
              <span>Quái: {monsterCount} • Phép: {spellCount} • Bẫy: {trapCount}</span>
            </div>
          </div>
        </div>

        {/* Validation Status & Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSetDefault}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              activeSlot.isDefault
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-white/10 text-slate-300 hover:text-white hover:border-amber-400'
            }`}
            title="Đặt làm bộ bài mặc định sử dụng trong Đấu Bài TCG"
          >
            <Star className="w-3.5 h-3.5" />
            <span>{activeSlot.isDefault ? 'Đang Là Mặc Định' : 'Đặt Làm Mặc Định'}</span>
          </button>

          {/* Duplicate to target slot */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={handleDuplicateToTarget}
              className="px-2 py-1 text-slate-300 hover:text-white flex items-center gap-1"
              title="Nhân bản bộ bài này sang ô khác"
            >
              <Copy className="w-3 h-3 text-cyan-400" />
              <span>Nhân bản sang</span>
            </button>
            <select
              value={duplicateTargetIndex}
              onChange={(e) => setDuplicateTargetIndex(Number(e.target.value))}
              className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 text-xs border border-white/10 focus:outline-none"
            >
              {deckSlots.map((_, i) => (
                <option key={i} value={i} disabled={i === activeSlotIndex}>
                  Ô {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Load GDPT 2018 Preset Tournament Decks (TSK-P2-03) */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-amber-500/30 rounded-lg px-2 py-1 text-xs font-mono">
            <span className="text-amber-400 text-[10px] font-bold shrink-0">Nạp Mẫu GDPT 2018:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleLoadPresetDeck(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-black/60 border border-white/20 rounded px-2 py-0.5 text-[11px] text-cyan-300 font-mono focus:outline-none focus:border-cyan-ion max-w-[200px]"
            >
              <option value="" disabled>-- Chọn Bộ Bài Mẫu --</option>
              {PREBUILT_DECKS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export Deck Code */}
          <button
            onClick={handleOpenExport}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 text-xs font-mono font-bold flex items-center gap-1 transition-all"
            title="Xuất mã chia sẻ bộ bài (Export)"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Xuất Mã</span>
          </button>

          {/* Import Deck Code */}
          <button
            onClick={() => {
              sound.playUiClick();
              setImportInputCode('');
              setImportError(null);
              setIsImportModalOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-white/10 text-xs font-mono font-bold flex items-center gap-1 transition-all"
            title="Nhập bộ bài từ mã chia sẻ (Import)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Nhập Mã</span>
          </button>

          <button
            onClick={handleResetSlot}
            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 transition-all text-xs"
            title="Xóa toàn bộ bài trong ô này"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSaveDeck}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-ion to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            LƯU BỘ BÀI
          </button>
        </div>
      </div>

      {/* Tournament & Educational Format Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-navy/60 border border-navy-light/40 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-slate-400 font-bold uppercase text-[11px] flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-cyan-ion" />
            Định Dạng (Format):
          </span>
          <div className="inline-flex rounded-lg bg-obsidian/80 p-0.5 border border-white/10 font-mono text-xs">
            <button
              onClick={() => { sound.playUiClick(); setSelectedFormat('STANDARD_GDPT'); }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                selectedFormat === 'STANDARD_GDPT'
                  ? 'bg-cyan-ion text-obsidian font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chuẩn GDPT 2018
            </button>
            <button
              onClick={() => { sound.playUiClick(); setSelectedFormat('CLASSROOM_SAFE'); }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                selectedFormat === 'CLASSROOM_SAFE'
                  ? 'bg-amber-400 text-obsidian font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phòng TN An Toàn
            </button>
            <button
              onClick={() => { sound.playUiClick(); setSelectedFormat('UNLIMITED'); }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                selectedFormat === 'UNLIMITED'
                  ? 'bg-purple-400 text-obsidian font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tự Do (Unlimited)
            </button>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          {selectedFormat === 'STANDARD_GDPT' && 'Giới hạn hóa chất nguy hại cao (Thermite: 1, Siêu axit: 1).'}
          {selectedFormat === 'CLASSROOM_SAFE' && 'Cấm hợp chất nổ mạnh; giới hạn hóa chất ăn mòn / độc tính cao.'}
          {selectedFormat === 'UNLIMITED' && 'Cho phép tối đa 3 bản sao cho mọi thẻ bài.'}
        </div>
      </div>

      {/* Comprehensive Deck Validation Feedback Box */}
      {validation.errors.length > 0 ? (
        <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-mono space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="w-4 h-4" />
            Lý Do Bộ Bài Chưa Đủ Điều Kiện Thi Đấu ({validation.errors.length}):
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-300 pl-1">
            {validation.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>✓ Bộ bài hoàn toàn hợp lệ thi đấu TCG (30-60 lá Main Deck, tối đa 15 lá Extra Deck, tối đa 15 lá Side Deck, tuân thủ 3 bản sao).</span>
        </div>
      )}

      {notification && (
        <div className="p-3 rounded-lg bg-cyan-950/80 border border-cyan-ion text-cyan-200 text-xs font-mono animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-ion" />
          {notification}
        </div>
      )}

      {/* Main Grid: Left = Active Deck Viewer & Stats, Right = Collection Pool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Column (5 Cols): Deck Preview & Mana Curve */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Mana Curve Chart */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-ion" />
              ĐƯỜNG CONG MANA (MANA CURVE)
            </span>
            <div className="flex items-end gap-2 h-20 pt-2 px-2 bg-black/40 rounded border border-white/5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((cost) => {
                const count = manaCurve[cost] || 0;
                const maxInCurve = Math.max(...Object.values(manaCurve), 1);
                const heightPercent = Math.max(10, (count / maxInCurve) * 100);
                return (
                  <div key={cost} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-mono text-cyan-ion font-bold">{count}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-cyan-600 to-cyan-300 transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[9px] font-mono text-slate-400">{cost === 8 ? '8+' : cost}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Elemental Synergy & Chemistry Analyzer Panel */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-navy via-slate-900 to-navy border border-cyan-ion/40 flex flex-col gap-2.5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ĐIỂM HIỆP ĐỒNG HÓA HỌC (SYNERGY)
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black font-mono border ${
                  synergy.synergyScore >= 75
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : synergy.synergyScore >= 50
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-red-500/20 text-red-300 border-red-500/40'
                }`}>
                  {synergy.synergyScore}/100 ĐIỂM
                </span>
              </div>
            </div>

            {/* Archetype & Redox Stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-black/40 p-2 rounded border border-white/5">
              <div>
                <span className="text-slate-400 block">Hệ chủ đạo:</span>
                <span className="font-bold text-amber-300">
                  {synergy.dominantArchetype === 'NITRO_LEGION'
                    ? 'Quân Đoàn Nitơ'
                    : synergy.dominantArchetype === 'SULFUR_FORGE'
                    ? 'Lò Rèn Lưu Huỳnh'
                    : synergy.dominantArchetype === 'ALKALI_HALOGEN'
                    ? 'Kiềm & Halogen'
                    : synergy.dominantArchetype === 'ORGANIC_SYNTHESIS'
                    ? 'Hóa Học Hữu Cơ'
                    : 'Đa Hệ Tổng Hợp'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Cân bằng Oxi hóa - Khử:</span>
                <span className={`font-bold ${synergy.redoxBalance.isBalanced ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {synergy.redoxBalance.reductants} Khử : {synergy.redoxBalance.oxidants} Oxi hóa {synergy.redoxBalance.isBalanced ? '✓' : '⚠️'}
                </span>
              </div>
            </div>

            {/* Golden Ratio Composition (Mục II.2.1.c Thuyết minh) */}
            <div className="p-2.5 rounded-lg bg-navy-dark/80 border border-copper/30 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-ivory-muted uppercase font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-copper" />
                  Tỉ Lệ Vàng Chiến Thuật (4 : 3 : 3):
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  synergy.goldenRatio?.isOptimal
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {synergy.goldenRatio?.actualRatio || '4 : 3 : 3'} {synergy.goldenRatio?.isOptimal ? '✓ ĐẠT CHUẨN' : '▲ CẦN CÂN BẰNG'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                <div className="bg-obsidian/60 p-1 rounded border border-navy-light/60">
                  <div className="text-ivory-muted">Tấn công (4)</div>
                  <div className="font-bold text-coral-reaction">{synergy.goldenRatio?.attackCount || 0} lá</div>
                </div>
                <div className="bg-obsidian/60 p-1 rounded border border-navy-light/60">
                  <div className="text-ivory-muted">Môi trường (3)</div>
                  <div className="font-bold text-cyan-ion">{synergy.goldenRatio?.environmentCount || 0} lá</div>
                </div>
                <div className="bg-obsidian/60 p-1 rounded border border-navy-light/60">
                  <div className="text-ivory-muted">Phòng thủ (3)</div>
                  <div className="font-bold text-emerald-400">{synergy.goldenRatio?.defenseCount || 0} lá</div>
                </div>
              </div>
              <div className="text-[9px] text-ivory-muted leading-tight">
                {synergy.goldenRatio?.pedagogicalAdvice}
              </div>
            </div>

            {/* Available Chemical Combos */}
            {synergy.chemicalCombosAvailable.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-coral-reaction" />
                  Combo Hóa Học Kích Hoạt Được ({synergy.chemicalCombosAvailable.length}):
                </span>
                <div className="flex flex-col gap-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/40 pr-1">
                  {synergy.chemicalCombosAvailable.map((combo, i) => (
                    <div key={i} className="text-[9px] font-mono text-cyan-200 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 truncate">
                      • {combo}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pedagogical Recommendations */}
            {synergy.recommendations.length > 0 && (
              <div className="text-[9px] font-mono text-slate-400 bg-amber-950/20 border border-amber-500/20 p-2 rounded space-y-0.5">
                <div className="text-amber-300 font-bold flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Lời Khuyên Sư Phạm Cho Bộ Bài:
                </div>
                {synergy.recommendations.map((rec, i) => (
                  <div key={i} className="text-slate-300">• {rec}</div>
                ))}
              </div>
            )}
          </div>

          {/* Extra Deck Zone */}
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                EXTRA DECK: HỢP CHẤT & LIÊN KẾT ({extraDeckCardIds.length}/15)
              </span>
              <span className="text-[10px] text-slate-400">Nhấp để gỡ bỏ</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto p-1 bg-black/40 rounded min-h-[90px] scrollbar-thin scrollbar-thumb-purple-500/40">
              {extraCards.map((card, idx) => (
                <div
                  key={`extra_${card.id}_${idx}`}
                  onClick={() => setSelectedInspectCard(card)}
                  className="shrink-0 relative group cursor-pointer"
                  title="Nhấp để xem chi tiết thẻ"
                >
                  <ChemicalCardView card={card} size="xs" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExtraCard(idx);
                    }}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
                    title="Xóa khỏi Extra Deck"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {extraCards.length === 0 && (
                <div className="text-xs text-slate-500 italic w-full text-center py-4 font-mono">
                  Chưa có quái thú Hợp Chất, Đồng Bộ, Xyz hoặc Liên Kết nào trong Extra Deck.
                </div>
              )}
            </div>
          </div>

          {/* Side Deck Zone (0-15 cards) */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span className="font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                BỘ BÀI PHỤ (SIDE DECK: {sideDeckCardIds.length}/15)
              </span>
              <span className="text-[10px] text-slate-400">Dự bị chiến thuật • Nhấp để gỡ bỏ</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto p-1 bg-black/40 rounded min-h-[90px] scrollbar-thin scrollbar-thumb-amber-500/40">
              {sideCards.map((card, idx) => (
                <div
                  key={`side_${card.id}_${idx}`}
                  onClick={() => setSelectedInspectCard(card)}
                  className="shrink-0 relative group cursor-pointer"
                  title="Nhấp để xem chi tiết thẻ"
                >
                  <ChemicalCardView card={card} size="xs" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSideCard(idx);
                    }}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
                    title="Xóa khỏi Side Deck"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {sideCards.length === 0 && (
                <div className="text-xs text-slate-500 italic w-full text-center py-4 font-mono">
                  Chưa có thẻ bài dự bị nào trong Side Deck (tối đa 15 lá).
                </div>
              )}
            </div>
          </div>

          {/* Main Deck Cards List (Scrollable Grid) */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 border-b border-white/10 pb-1">
              <span className="font-bold">BỘ BÀI CHÍNH ({mainDeckCardIds.length} LÁ)</span>
              <span className="text-[10px] text-slate-400">Nhấp xem chi tiết • Hover để xóa</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 overflow-y-auto max-h-[420px] p-1 bg-black/40 rounded scrollbar-thin scrollbar-thumb-cyan-ion/40">
              {mainCards.map((card, idx) => (
                <div
                  key={`main_${card.id}_${idx}`}
                  onClick={() => setSelectedInspectCard(card)}
                  className="relative group cursor-pointer"
                  title="Nhấp để xem chi tiết thẻ"
                >
                  <ChemicalCardView card={card} size="xs" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMainCard(idx);
                    }}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
                    title="Xóa khỏi Main Deck"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {mainCards.length === 0 && (
                <div className="col-span-full py-12 text-center text-xs text-slate-500 italic">
                  Bộ bài chính đang trống! Hãy thêm thẻ từ danh mục bên phải.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Available Card Catalog & Filter System */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Search & Filters */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên lá bài, ký hiệu hóa học (Na, Fe, H2O...), danh pháp IUPAC..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-ivory focus:outline-none focus:border-cyan-ion"
                />
              </div>
            </div>

            {/* Target Deck Section Toggle */}
            <div className="flex items-center justify-between bg-black/50 p-1.5 rounded-lg border border-white/10 text-xs font-mono">
              <span className="text-slate-400 text-[11px] ml-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                Khu vực nhận thẻ khi bấm "+":
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTargetDeckSection('AUTO')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    targetDeckSection === 'AUTO'
                      ? 'bg-cyan-ion text-obsidian shadow'
                      : 'text-slate-400 hover:text-white bg-black/40'
                  }`}
                >
                  Main / Extra
                </button>
                <button
                  type="button"
                  onClick={() => setTargetDeckSection('SIDE')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    targetDeckSection === 'SIDE'
                      ? 'bg-amber-400 text-obsidian shadow'
                      : 'text-slate-400 hover:text-white bg-black/40'
                  }`}
                >
                  Side Deck ({sideDeckCardIds.length}/15)
                </button>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {/* Type Filter */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10 overflow-x-auto max-w-full">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Loại:</span>
                {['ALL', 'ELEMENT', 'COMPOUND', 'SYNCHRO', 'XYZ', 'PENDULUM', 'LINK', 'RITUAL', 'SPELL', 'TRAP'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all whitespace-nowrap ${
                      selectedType === t ? 'bg-cyan-ion text-obsidian' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t === 'ALL'
                      ? 'Tất cả'
                      : t === 'ELEMENT'
                      ? 'Nguyên tố'
                      : t === 'COMPOUND'
                      ? 'Hợp chất'
                      : t === 'SYNCHRO'
                      ? 'Đồng bộ'
                      : t === 'XYZ'
                      ? 'Xyz'
                      : t === 'PENDULUM'
                      ? 'Dao động'
                      : t === 'LINK'
                      ? 'Liên kết'
                      : t === 'RITUAL'
                      ? 'Nghi thức'
                      : t === 'SPELL'
                      ? 'Phép'
                      : 'Bẫy'}
                  </button>
                ))}
              </div>

              {/* Attribute Filter */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10 overflow-x-auto max-w-full">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Hệ:</span>
                {['ALL', 'PYRO', 'AQUA', 'TERRA', 'AERO', 'ELECTRO', 'ACID_DARK', 'NOBLE_VOID'].map((attr) => (
                  <button
                    key={attr}
                    onClick={() => setSelectedAttribute(attr)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all whitespace-nowrap ${
                      selectedAttribute === attr ? 'bg-amber-400 text-obsidian' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {attr === 'ALL'
                      ? 'Tất cả'
                      : attr === 'ACID_DARK'
                      ? 'Axit'
                      : attr === 'NOBLE_VOID'
                      ? 'Khí hiếm'
                      : attr}
                  </button>
                ))}
              </div>

              {/* Archetype Dropdown Filter */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10 text-xs font-mono">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Họ bài:</span>
                <select
                  value={selectedArchetype}
                  onChange={(e) => setSelectedArchetype(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded px-2 py-0.5 text-[11px] text-cyan-300 font-mono focus:outline-none focus:border-cyan-ion"
                >
                  <option value="ALL">Tất cả ({allArchetypes.length} Archetypes)</option>
                  {allArchetypes.map((arch) => (
                    <option key={arch} value={arch}>
                      {arch.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Only Owned Toggle */}
              <button
                type="button"
                onClick={() => setOnlyOwned(!onlyOwned)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono font-bold transition-all ${
                  onlyOwned
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                    : 'bg-black/40 border-white/20 text-slate-400 hover:text-white'
                }`}
                title="Bật/Tắt hiển thị chỉ các thẻ đã sở hữu trong kho bài"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {onlyOwned ? 'Chỉ thẻ sở hữu' : 'Toàn bộ Catalog'}
              </button>
            </div>
          </div>

          {/* Cards Grid from Catalog */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 border-b border-white/10 pb-1">
              <span className="font-bold text-cyan-300">
                {onlyOwned ? 'KHO THẺ SỞ HỮU' : 'TOÀN BỘ CATALOG THẺ'} ({filteredCatalog.length}) • TRANG {currentPage} / {totalPages}
              </span>
              <span className="text-[10px] text-slate-400">
                Hiển thị {Math.min(filteredCatalog.length, (currentPage - 1) * CARDS_PER_PAGE + 1)} - {Math.min(filteredCatalog.length, currentPage * CARDS_PER_PAGE)} / {filteredCatalog.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 overflow-y-auto max-h-[520px] p-1.5 scrollbar-thin scrollbar-thumb-cyan-ion/40">
              {paginatedCatalog.map((card) => {
                const countInDeck = deckCardCounts[card.id] || 0;
                const maxOwned = collectionOwned[card.id] || 0;
                const canAdd = maxOwned > 0 && countInDeck < 3 && countInDeck < maxOwned;
                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedInspectCard(card)}
                    className={`relative cursor-pointer transition-all flex flex-col p-1.5 rounded-xl border group ${
                      maxOwned === 0
                        ? 'bg-black/60 border-white/5 opacity-75'
                        : 'bg-black/40 hover:bg-navy/50 border-white/10 hover:border-cyan-ion/60'
                    }`}
                  >
                    <div className="flex justify-center">
                      <ChemicalCardView card={card} size="sm" />
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono px-0.5">
                      <span className={maxOwned === 0 ? 'text-amber-400/80 font-semibold' : 'text-slate-400'}>
                        {maxOwned === 0 ? 'Chưa sở hữu' : `Sở hữu: x${maxOwned}`}
                      </span>
                      <span className={countInDeck >= 3 ? 'text-red-400 font-bold' : 'text-cyan-ion'}>
                        Deck: {countInDeck}/3
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInspectCard(card);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9px] font-bold flex items-center justify-center border border-white/10"
                        title="Xem chi tiết hồ sơ thẻ"
                      >
                        <Info className="w-3 h-3 text-cyan-400" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canAdd) handleAddCard(card, 'AUTO');
                        }}
                        disabled={!canAdd}
                        className={`flex-1 py-1 rounded font-mono text-[9px] font-bold flex items-center justify-center gap-0.5 transition-all ${
                          canAdd
                            ? 'bg-cyan-ion/90 hover:bg-cyan-400 text-obsidian shadow'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                        }`}
                        title={canAdd ? 'Thêm vào Main/Extra Deck' : 'Đã đạt giới hạn 3 bản sao'}
                      >
                        <Plus className="w-2.5 h-2.5" />
                        Deck
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canAdd) handleAddCard(card, 'SIDE');
                        }}
                        disabled={!canAdd || sideDeckCardIds.length >= MAX_SIDE_DECK_CARDS}
                        className={`flex-1 py-1 rounded font-mono text-[9px] font-bold flex items-center justify-center gap-0.5 transition-all ${
                          canAdd && sideDeckCardIds.length < MAX_SIDE_DECK_CARDS
                            ? 'bg-amber-400/90 hover:bg-amber-300 text-obsidian shadow'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                        }`}
                        title={canAdd ? 'Thêm vào Side Deck' : 'Đã đạt giới hạn'}
                      >
                        <Shield className="w-2.5 h-2.5" />
                        Side
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Windowed Pagination Bar for Deck Catalog */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => {
                      sound.playUiClick();
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 rounded bg-black/50 border border-white/10 hover:border-cyan-ion disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                    title="Trang đầu"
                  >
                    « Đầu
                  </button>
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => {
                      sound.playUiClick();
                      setCurrentPage(prev => Math.max(1, prev - 1));
                    }}
                    className="px-2 py-1 rounded bg-black/50 border border-white/10 hover:border-cyan-ion disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-0.5 text-[11px]"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-3 h-3" /> Trước
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">
                    Trang <span className="font-bold text-cyan-300">{currentPage}</span> / {totalPages}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      sound.playUiClick();
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                    }}
                    className="px-2 py-1 rounded bg-black/50 border border-white/10 hover:border-cyan-ion disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-0.5 text-[11px]"
                    title="Trang tiếp theo"
                  >
                    Sau <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      sound.playUiClick();
                      setCurrentPage(totalPages);
                    }}
                    className="px-2 py-1 rounded bg-black/50 border border-white/10 hover:border-cyan-ion disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                    title="Trang cuối"
                  >
                    Cuối »
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CẤP ĐỘ ROOT: Modal Hồ Sơ Chi Tiết Khoa Học Tuyệt Đối Không Chớp Tắt */}
      {selectedInspectCard && (
        <div
          onClick={() => setSelectedInspectCard(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-slate-900 border-2 border-cyan-ion rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-200 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 font-serif font-black text-xs">
                  {selectedInspectCard.chemicalFormula || 'TCG'}
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-cyan-300 leading-tight">
                    {selectedInspectCard.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {selectedInspectCard.name_en} • ID: {selectedInspectCard.id}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInspectCard(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm transition-all border border-white/10"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Left = High-Res Card View, Right = Detailed Chemical Dossier */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Card Visual Preview */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <ChemicalCardView card={selectedInspectCard} size="md" disableHoverZoom />
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  Độ hiếm: <strong className="text-fuchsia-300">{selectedInspectCard.rarity}</strong>
                </span>
              </div>

              {/* Chemical & Combat Details */}
              <div className="md:col-span-7 flex flex-col gap-2.5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/50 p-3 rounded-xl border border-white/10">
                  <div><span className="text-slate-400">Công thức:</span> <span className="font-bold text-amber-300">{selectedInspectCard.chemicalFormula || 'N/A'}</span></div>
                  <div><span className="text-slate-400">Số hiệu Z:</span> <span className="font-bold text-cyan-300">{selectedInspectCard.atomicNumber || 'N/A'}</span></div>
                  <div><span className="text-slate-400">Thuộc tính:</span> <span className="font-bold text-amber-200">{selectedInspectCard.attribute}</span></div>
                  <div><span className="text-slate-400">Chi phí Mana:</span> <span className="font-bold text-yellow-300">{selectedInspectCard.manaCost}</span></div>
                  {selectedInspectCard.atk !== undefined && (
                    <div><span className="text-slate-400">ATK:</span> <span className="font-bold text-amber-400">{selectedInspectCard.atk}</span></div>
                  )}
                  {selectedInspectCard.def !== undefined && (
                    <div><span className="text-slate-400">DEF:</span> <span className="font-bold text-cyan-400">{selectedInspectCard.def}</span></div>
                  )}
                  {selectedInspectCard.linkRating && (
                    <div><span className="text-slate-400">Link Rating:</span> <span className="font-bold text-cyan-400">LINK-{selectedInspectCard.linkRating}</span></div>
                  )}
                  {selectedInspectCard.spellSpeed && (
                    <div><span className="text-slate-400">Spell Speed:</span> <span className="font-bold text-slate-300">SPD {selectedInspectCard.spellSpeed}</span></div>
                  )}
                </div>

                {/* Chemical Reaction Equation */}
                {selectedInspectCard.relatedEquation && (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-2.5 text-xs font-mono">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase mb-0.5">Phương Trình Hóa Học Bản Quyền:</div>
                    <div className="text-emerald-200 font-bold">{selectedInspectCard.relatedEquation}</div>
                  </div>
                )}

                {/* Tactical Effect */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">Hiệu Ứng Chiến Thuật:</div>
                  <p className="text-slate-200 leading-relaxed">{selectedInspectCard.effectText}</p>
                </div>

                {/* Scientific Lore */}
                {selectedInspectCard.scientificLore && (
                  <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-3 text-xs">
                    <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Tri Thức Hóa Học (GDPT 2018 / IUPAC):</div>
                    <p className="text-slate-300 text-[11px] leading-relaxed italic">{selectedInspectCard.scientificLore}</p>
                  </div>
                )}

                {/* Deep Scientific Inspector Toggle */}
                <button
                  type="button"
                  onClick={() => setShowDeepScienceInspector(!showDeepScienceInspector)}
                  className="w-full py-2 px-3 rounded-xl bg-navy hover:bg-navy-light text-cyan-ion text-xs font-mono font-bold border border-cyan-ion/40 flex items-center justify-center gap-1.5 transition-all shadow-sm hover:scale-[1.01]"
                >
                  <Atom className="w-3.5 h-3.5" />
                  <span>{showDeepScienceInspector ? 'Ẩn Giám Định Bohr & Orbital' : 'Mở Giám Định Hóa Học Chuyên Sâu (Bohr & DCSM)'}</span>
                </button>

                {showDeepScienceInspector && (
                  <div className="mt-2 pt-2 border-t border-cyan-ion/30 max-h-[450px] overflow-y-auto pr-1">
                    <CardScientificInspector
                      card={selectedInspectCard}
                      cardCollection={collectionOwned}
                      onSelectCard={(c) => setSelectedInspectCard(c)}
                      onAddCardToDeck={(c) => handleAddCard(c)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-mono text-slate-400">
                Trong bộ bài hiện tại: <strong className="text-cyan-300">{deckCardCounts[selectedInspectCard.id] || 0} / 3</strong>
              </div>
              <div className="flex items-center gap-2">
                {(deckCardCounts[selectedInspectCard.id] || 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCardById(selectedInspectCard.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-mono text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Bỏ 1 Thẻ Khỏi Deck
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleAddCard(selectedInspectCard, 'AUTO')}
                  disabled={
                    (collectionOwned[selectedInspectCard.id] || 0) <= 0 ||
                    (deckCardCounts[selectedInspectCard.id] || 0) >= 3 ||
                    (deckCardCounts[selectedInspectCard.id] || 0) >= (collectionOwned[selectedInspectCard.id] || 0)
                  }
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 ${
                    (collectionOwned[selectedInspectCard.id] || 0) > 0 &&
                    (deckCardCounts[selectedInspectCard.id] || 0) < 3 &&
                    (deckCardCounts[selectedInspectCard.id] || 0) < (collectionOwned[selectedInspectCard.id] || 0)
                      ? 'bg-cyan-ion hover:bg-cyan-400 text-obsidian shadow-lg'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Main/Extra
                </button>
                <button
                  type="button"
                  onClick={() => handleAddCard(selectedInspectCard, 'SIDE')}
                  disabled={
                    (collectionOwned[selectedInspectCard.id] || 0) <= 0 ||
                    (deckCardCounts[selectedInspectCard.id] || 0) >= 3 ||
                    (deckCardCounts[selectedInspectCard.id] || 0) >= (collectionOwned[selectedInspectCard.id] || 0) ||
                    sideDeckCardIds.length >= MAX_SIDE_DECK_CARDS
                  }
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 ${
                    (collectionOwned[selectedInspectCard.id] || 0) > 0 &&
                    (deckCardCounts[selectedInspectCard.id] || 0) < 3 &&
                    (deckCardCounts[selectedInspectCard.id] || 0) < (collectionOwned[selectedInspectCard.id] || 0) &&
                    sideDeckCardIds.length < MAX_SIDE_DECK_CARDS
                      ? 'bg-amber-400 hover:bg-amber-300 text-obsidian shadow-lg'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  + Side Deck
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playUiClick();
                    setIsDetailModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-ion/50 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1 shadow-sm"
                  title="Phóng to 3D & Kính hiển vi Bohr"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-ion" />
                  Kính Hiển Vi 3D
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInspectCard(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div
          onClick={() => setIsExportModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-slate-900 border-2 border-cyan-ion rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-ion" />
                <h3 className="font-serif font-black text-base text-cyan-300">
                  XUẤT MÃ BỘ BÀI (DECK EXPORT)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Mã chia sẻ bộ bài chuẩn hóa bao gồm Main Deck ({mainDeckCardIds.length} lá), Extra Deck ({extraDeckCardIds.length} lá) và Side Deck ({sideDeckCardIds.length} lá).
            </p>

            <textarea
              readOnly
              value={exportedCode}
              rows={4}
              className="w-full p-2.5 rounded-lg bg-black/70 border border-cyan-ion/40 text-[11px] font-mono text-cyan-200 focus:outline-none select-all resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleCopyExportCode}
                className="px-4 py-2 rounded-lg bg-cyan-ion hover:bg-cyan-400 text-obsidian font-bold text-xs flex items-center gap-1.5 shadow"
              >
                {copiedExport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedExport ? 'Đã Sao Chép!' : 'Sao Chép Mã'}
              </button>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {isImportModalOpen && (
        <div
          onClick={() => setIsImportModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-slate-900 border-2 border-amber-400 rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-black text-base text-amber-300">
                  NHẬP MÃ BỘ BÀI VÀO Ô {activeSlotIndex + 1}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Dán mã bộ bài (bắt đầu bằng <code className="text-amber-300 font-mono">ELM-DECK-...</code>) để nạp vào Ô {activeSlotIndex + 1}. Toàn bộ Main Deck, Extra Deck và Side Deck sẽ được phục hồi.
            </p>

            <textarea
              value={importInputCode}
              onChange={(e) => setImportInputCode(e.target.value)}
              placeholder="Dán mã ELM-DECK-... vào đây..."
              rows={4}
              className="w-full p-2.5 rounded-lg bg-black/70 border border-amber-400/40 text-[11px] font-mono text-amber-200 focus:outline-none resize-none"
            />

            {importError && (
              <div className="p-2 rounded bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-mono">
                {importError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleExecuteImport}
                disabled={!importInputCode.trim()}
                className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow ${
                  importInputCode.trim()
                    ? 'bg-amber-400 hover:bg-amber-300 text-obsidian'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                Nạp Bộ Bài
              </button>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 3D Holographic Card Detail & Quantum Inspection Modal */}
      <CardDetailModal
        card={selectedInspectCard}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        cardCollection={collectionOwned}
        onSelectCard={(c) => setSelectedInspectCard(c)}
        onAddCardToDeck={(c) => handleAddCard(c, 'MAIN')}
      />
    </div>
  );
};
