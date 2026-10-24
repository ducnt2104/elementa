// src/components/collection/TacticalCollectionTab.tsx
// Comprehensive Yu-Gi-Oh! Style Standalone Collection Gallery & Inspector

import React, { useState, useMemo } from 'react';
import { PlayerProfile } from '../../domain/types';
import { PLAYABLE_CARDS, getPlayableCardById, getAllPlayableCards } from '../../data/playableCardsData';
import { PlayableCardDef, CardType, ChemicalAttribute, CardRarity } from '../../domain/cardGameTypes';
import { ChemicalCardView } from '../cards/ChemicalCardView';
import { CardDetailModal } from '../cards/CardDetailModal';
import { CardScientificInspector } from '../duel/CardScientificInspector';
import { sound } from '../../audio/soundEngine';
import {
  Layers,
  Search,
  Filter,
  Sparkles,
  Heart,
  BookOpen,
  Atom,
  Flame,
  Droplets,
  Zap,
  Shield,
  Star,
  Award,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Eye,
  CheckCircle2,
  Lock,
  Maximize2
} from 'lucide-react';

interface TacticalCollectionTabProps {
  profile: PlayerProfile;
  initialViewMode?: 'COLLECTION_OWNED' | 'FULL_LIBRARY';
  onNavigateToShop?: () => void;
  onNavigateToDeck?: () => void;
  onReturnToTcgMenu?: () => void;
}

export const TacticalCollectionTab: React.FC<TacticalCollectionTabProps> = ({
  profile,
  initialViewMode = 'COLLECTION_OWNED',
  onNavigateToShop,
  onNavigateToDeck,
  onReturnToTcgMenu
}) => {
  const [viewMode, setViewMode] = useState<'COLLECTION_OWNED' | 'FULL_LIBRARY'>(initialViewMode);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(40);
  const [sortBy, setSortBy] = useState<'ATK' | 'DEF' | 'LEVEL' | 'MANA' | 'NAME' | 'RARITY' | 'LINK'>('RARITY');
  const [selectedCard, setSelectedCard] = useState<PlayableCardDef | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [inspectorMode, setInspectorMode] = useState<'QUICK' | 'SCIENTIFIC'>('QUICK');

  const collectionOwned = profile.cardCollection || {};

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
  }, [searchQuery, selectedType, selectedAttribute, selectedRarity, selectedArchetype, sortBy, viewMode]);

  // Toggle favorite
  const toggleFavorite = (cardId: string) => {
    sound.playUiClick();
    setFavorites(prev => 
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  // Filtered & Sorted Cards
  const processedCards = useMemo(() => {
    return getAllPlayableCards().filter(card => {
      // Ownership filter: only owned cards appear in COLLECTION_OWNED view
      if (viewMode === 'COLLECTION_OWNED') {
        if ((collectionOwned[card.id] || 0) <= 0) return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = card.name.toLowerCase().includes(query) || card.name_en.toLowerCase().includes(query);
        const matchesFormula = card.chemicalFormula?.toLowerCase().includes(query);
        const matchesIupac = card.iupacName?.toLowerCase().includes(query);
        const matchesEffect = card.effectCode?.toLowerCase().includes(query) || card.effectText?.toLowerCase().includes(query);
        const matchesLore = card.scientificLore?.toLowerCase().includes(query);
        const matchesArchetype = card.archetype?.toLowerCase().includes(query);

        // Atomic number search: "z=26", "z:26", "z26", or direct integer
        let matchesZ = false;
        if (card.atomicNumber !== undefined) {
          if (query === card.atomicNumber.toString()) {
            matchesZ = true;
          } else if (query.startsWith('z=') || query.startsWith('z:')) {
            const zVal = parseInt(query.slice(2).trim(), 10);
            if (!isNaN(zVal) && card.atomicNumber === zVal) matchesZ = true;
          } else if (query.startsWith('z') && !isNaN(parseInt(query.slice(1).trim(), 10))) {
            const zVal = parseInt(query.slice(1).trim(), 10);
            if (card.atomicNumber === zVal) matchesZ = true;
          }
        }

        // Mechanic keywords
        let matchesKeyword = false;
        if (query === 'tuner' && card.isTuner) matchesKeyword = true;
        if (query === 'synchro' && (card.cardType === 'SYNCHRO_MONSTER' || !!card.synchroLevel || card.isTuner)) matchesKeyword = true;
        if (query === 'xyz' && (card.cardType === 'XYZ_MONSTER' || !!card.xyzRank)) matchesKeyword = true;
        if (query === 'pendulum' && (card.cardType === 'PENDULUM_MONSTER' || card.pendulumScale !== undefined)) matchesKeyword = true;
        if (query === 'scale' && card.pendulumScale !== undefined) matchesKeyword = true;
        if (query === 'ritual' && (card.cardType === 'RITUAL_MONSTER' || card.isRitualMonster || card.spellTrapSubtype === 'RITUAL_SPELL')) matchesKeyword = true;
        if (query === 'link' && (card.cardType === 'LINK_MONSTER' || !!card.linkRating)) matchesKeyword = true;
        if (query === 'trap' && card.cardType === 'TRAP') matchesKeyword = true;
        if (query === 'spell' && (card.cardType === 'REACTION_SPELL' || card.cardType === 'EQUIP_CATALYST' || card.cardType === 'FIELD_ENVIRONMENT')) matchesKeyword = true;

        if (!matchesName && !matchesFormula && !matchesIupac && !matchesEffect && !matchesLore && !matchesArchetype && !matchesZ && !matchesKeyword) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'ALL') {
        if (selectedType === 'MONSTER' && card.cardType !== 'ELEMENT_MONSTER') return false;
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

      return true;
    }).sort((a, b) => {
      if (sortBy === 'ATK') return (b.atk || 0) - (a.atk || 0);
      if (sortBy === 'DEF') return (b.def || 0) - (a.def || 0);
      if (sortBy === 'LEVEL') {
        const getRankOrLevel = (c: PlayableCardDef) => c.level || c.synchroLevel || c.xyzRank || c.linkRating || 0;
        return getRankOrLevel(b) - getRankOrLevel(a);
      }
      if (sortBy === 'LINK') return (b.linkRating || 0) - (a.linkRating || 0);
      if (sortBy === 'MANA') return b.manaCost - a.manaCost;
      if (sortBy === 'NAME') return a.name.localeCompare(b.name);
      // Rarity sort
      const rarityRank: Record<CardRarity, number> = {
        SECRET_RARE: 5,
        ULTRA_RARE: 4,
        SUPER_RARE: 3,
        RARE: 2,
        COMMON: 1
      };
      return rarityRank[b.rarity] - rarityRank[a.rarity];
    });
  }, [searchQuery, selectedType, selectedAttribute, selectedRarity, selectedArchetype, sortBy, viewMode, collectionOwned]);

  // Windowed Pagination calculations (customizable cards/page)
  const totalPages = Math.max(1, Math.ceil(processedCards.length / cardsPerPage));
  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return processedCards.slice(start, start + cardsPerPage);
  }, [processedCards, currentPage, cardsPerPage]);

  // Total collection stats
  const totalCardsInGame = getAllPlayableCards().length;
  const uniqueOwnedCount = Object.keys(collectionOwned).filter(id => (collectionOwned[id] || 0) > 0).length;
  const completionPercentage = Math.round((uniqueOwnedCount / totalCardsInGame) * 100);

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-7xl mx-auto flex flex-col gap-4 select-none animate-fadeIn">
      {/* Top Banner: Collection Stats & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-navy/60 border border-navy-light/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onReturnToTcgMenu && (
            <button
              onClick={() => {
                sound.playUiClick();
                onReturnToTcgMenu();
              }}
              className="px-3 py-1.5 rounded-lg bg-navy hover:bg-navy-light text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
            >
              ← Menu TCG
            </button>
          )}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-black text-xl text-ivory">
              {viewMode === 'COLLECTION_OWNED' ? 'Kho Bài Của Bạn (Collection)' : 'Thư Viện Toàn Bộ Thẻ (Card Library)'}
            </h1>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-1">
              <span>Đã sưu tập: <strong className="text-cyan-ion">{uniqueOwnedCount}</strong>/{totalCardsInGame} thẻ ({completionPercentage}%)</span>
              <span>Yêu thích: <strong className="text-pink-400">{favorites.length}</strong></span>
              <span>Token: <strong className="text-amber-400">{profile.knowledgeTokens}</strong></span>
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Kho Bài vs Thư Viện */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-obsidian rounded-xl border border-navy-light/60">
            <button
              onClick={() => {
                sound.playUiClick();
                setViewMode('COLLECTION_OWNED');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'COLLECTION_OWNED'
                  ? 'bg-emerald-500 text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Kho Sở Hữu ({uniqueOwnedCount})
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setViewMode('FULL_LIBRARY');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'FULL_LIBRARY'
                  ? 'bg-cyan-ion text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Toàn Bộ Thư Viện ({totalCardsInGame})
            </button>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 pl-2">
            <div className="w-32 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-ion via-emerald-400 to-amber-400 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-cyan-ion">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Filters & Cards Gallery, Right = High-Res 3D Card Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Column (8 Cols): Search, Filter & Gallery */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Controls Bar */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên thẻ, ký hiệu nguyên tố (Na, Cl, Fe...), công thức (H2O, NaCl), số hiệu Z (z=26), cơ chế (synchro, xyz, tuner)..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-ivory focus:outline-none focus:border-cyan-ion"
                />
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-cyan-200 focus:outline-none"
              >
                <option value="RARITY">Sắp xếp: Độ hiếm</option>
                <option value="LEVEL">Sắp xếp: Cấp sao / Rank / Link</option>
                <option value="ATK">Sắp xếp: ATK cao nhất</option>
                <option value="DEF">Sắp xếp: DEF cao nhất</option>
                <option value="LINK">Sắp xếp: Link Rating</option>
                <option value="MANA">Sắp xếp: Chi phí Mana</option>
                <option value="NAME">Sắp xếp: Theo tên A-Z</option>
              </select>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10 overflow-x-auto max-w-full">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Loại:</span>
                {['ALL', 'MONSTER', 'COMPOUND', 'SYNCHRO', 'XYZ', 'PENDULUM', 'LINK', 'RITUAL', 'SPELL', 'TRAP'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all whitespace-nowrap ${
                      selectedType === t ? 'bg-cyan-ion text-obsidian' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t === 'ALL'
                      ? 'Tất cả'
                      : t === 'MONSTER'
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

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10 overflow-x-auto max-w-full">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Thuộc tính:</span>
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

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Độ hiếm:</span>
                {['ALL', 'SECRET_RARE', 'ULTRA_RARE', 'SUPER_RARE', 'RARE', 'COMMON'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRarity(r)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                      selectedRarity === r ? 'bg-fuchsia-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r === 'ALL' ? 'Tất cả' : r.replace('_RARE', '')}
                  </button>
                ))}
              </div>

              {/* Archetype Dropdown Filter */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10 text-xs font-mono">
                <span className="text-slate-500 text-[10px] uppercase ml-1">Họ bài (Archetype):</span>
                <select
                  value={selectedArchetype}
                  onChange={(e) => setSelectedArchetype(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded px-2 py-0.5 text-[11px] text-cyan-300 font-mono focus:outline-none focus:border-cyan-ion"
                >
                  <option value="ALL">Tất cả họ bài ({allArchetypes.length} Archetypes)</option>
                  {allArchetypes.map((arch) => (
                    <option key={arch} value={arch}>
                      {arch.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cards Gallery */}
          <div className="p-3 rounded-xl bg-navy/40 border border-navy-light/40 flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 border-b border-white/10 pb-1">
              <span className="font-bold text-cyan-300">
                HIỂN THỊ: {processedCards.length} THẺ BÀI • TRANG {currentPage} / {totalPages}
              </span>
              <span className="text-[10px] text-slate-400">
                Hiển thị {Math.min(processedCards.length, (currentPage - 1) * cardsPerPage + 1)} - {Math.min(processedCards.length, currentPage * cardsPerPage)} / {processedCards.length} lá bài
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-[580px] p-2 scrollbar-thin scrollbar-thumb-cyan-ion/40">
              {paginatedCards.map((card) => {
                const owned = collectionOwned[card.id] || 0;
                const isFav = favorites.includes(card.id);
                const isSelected = selectedCard?.id === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      sound.playCardSelect();
                      setSelectedCard(card);
                    }}
                    onDoubleClick={() => {
                      sound.playUiClick();
                      setSelectedCard(card);
                      setIsDetailModalOpen(true);
                    }}
                    className={`relative cursor-pointer transition-all duration-200 group flex flex-col items-center ${
                      isSelected ? 'scale-105 z-10' : 'hover:scale-105'
                    }`}
                  >
                    <ChemicalCardView
                      card={card}
                      size="sm"
                      quantityOwned={owned}
                      isSelected={isSelected}
                    />

                    {/* Quick action overlay */}
                    <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playUiClick();
                          setSelectedCard(card);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1 rounded-full shadow bg-black/60 text-slate-300 hover:text-cyan-400"
                        title="Phóng to thẻ bài & Kính hiển vi Bohr"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(card.id);
                        }}
                        className={`p-1 rounded-full shadow ${isFav ? 'bg-pink-600 text-white' : 'bg-black/60 text-slate-300 hover:text-pink-400'}`}
                        title="Đánh dấu yêu thích"
                      >
                        <Heart className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Windowed Pagination Bar */}
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

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-slate-400 text-[11px]">
                    Trang <span className="font-bold text-cyan-300">{currentPage}</span> / {totalPages}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-[10px]">Đến:</span>
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value, 10);
                        if (!isNaN(page) && page >= 1 && page <= totalPages) {
                          setCurrentPage(page);
                        }
                      }}
                      className="w-12 px-1 py-0.5 rounded bg-black/60 border border-white/20 text-center text-xs text-cyan-300 font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                    <span className="text-slate-500 text-[10px]">Hiển thị:</span>
                    {[24, 40, 80].map(cnt => (
                      <button
                        key={cnt}
                        onClick={() => {
                          sound.playUiClick();
                          setCardsPerPage(cnt);
                          setCurrentPage(1);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          cardsPerPage === cnt ? 'bg-cyan-ion text-obsidian font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
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

        {/* Right Column (4 Cols): Deep Scientific Card Inspector */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-b from-navy/60 to-slate-950/80 border border-navy-light/40 flex flex-col gap-3 sticky top-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Atom className="w-4 h-4 text-cyan-ion" />
                KÍNH HIỂN VI HÓA HỌC: TRA CỨU
              </span>
              {selectedCard && (
                <div className="flex items-center gap-1 bg-black/50 p-0.5 rounded border border-white/10 text-[10px] font-mono">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setInspectorMode('QUICK');
                    }}
                    className={`px-2 py-0.5 rounded font-bold transition-all ${
                      inspectorMode === 'QUICK' ? 'bg-cyan-ion text-obsidian' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setInspectorMode('SCIENTIFIC');
                    }}
                    className={`px-2 py-0.5 rounded font-bold transition-all ${
                      inspectorMode === 'SCIENTIFIC' ? 'bg-amber-400 text-obsidian' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Kính hiển vi (Bohr)
                  </button>
                </div>
              )}
            </div>

            {selectedCard ? (
              inspectorMode === 'SCIENTIFIC' ? (
                <div className="max-h-[750px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-ion/40 animate-fade-in">
                  <CardScientificInspector
                    card={selectedCard}
                    cardCollection={collectionOwned}
                    onSelectCard={(c) => setSelectedCard(c)}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3 animate-fade-in">
                  {/* Mode switch helper banner */}
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setInspectorMode('SCIENTIFIC');
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-600/30 to-amber-600/30 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    <Atom className="w-4 h-4 text-cyan-ion group-hover:rotate-45 transition-transform" />
                    KÍNH HIỂN VI NGUYÊN TỬ (BOHR & ORBITAL) 🔬
                  </button>

                  {/* Large Preview with Interactive Zoom Button */}
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setIsDetailModalOpen(true)}
                      title="Nhấn để phóng to toàn màn hình"
                    >
                      <ChemicalCardView card={selectedCard} size="md" />
                    </div>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setIsDetailModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-black/60 hover:bg-slate-800 border border-cyan-ion/40 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-ion" />
                      Phóng To 3D & Khảo Sát Toàn Diện
                    </button>
                  </div>

                  {/* Ownership Status & Acquisition Hint */}
                  {(collectionOwned[selectedCard.id] || 0) > 0 ? (
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs flex items-center justify-between">
                      <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Đã sở hữu: {collectionOwned[selectedCard.id]} bản sao
                      </span>
                      {onNavigateToDeck && (
                        <button
                          onClick={onNavigateToDeck}
                          className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-obsidian text-[11px] font-bold"
                        >
                          Xây Deck
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-500/40 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                        <Lock className="w-4 h-4 shrink-0" />
                        <span>Thẻ chưa sở hữu trong Kho bài</span>
                      </div>
                      <p className="text-[11px] text-ivory-muted leading-relaxed">
                        Mở gói Booster tại Shop Thẻ Bài, vượt ải Chiến Dịch hoặc hoàn thành Nhiệm Vụ Hóa Học để mở khóa thẻ này.
                      </p>
                      {onNavigateToShop && (
                        <button
                          onClick={onNavigateToShop}
                          className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian font-black text-xs transition-all shadow"
                        >
                          Mở Gói Tại Shop Thẻ Bài
                        </button>
                      )}
                    </div>
                  )}

                  {/* Identity & Scientific Specs */}
                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex flex-col gap-1.5 text-xs font-mono">
                    <div className="font-serif font-black text-base text-ivory">{selectedCard.name}</div>
                    <div className="text-slate-400 italic">{selectedCard.name_en}</div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
                      <div>
                        <span className="text-slate-500">Thuộc tính:</span>{' '}
                        <strong className="text-amber-300">{selectedCard.attribute}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Độ hiếm:</span>{' '}
                        <strong className="text-fuchsia-300">{selectedCard.rarity}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Mana Cost:</span>{' '}
                        <strong className="text-cyan-ion">{selectedCard.manaCost}</strong>
                      </div>
                      {selectedCard.atomicNumber && (
                        <div>
                          <span className="text-slate-500">Số hiệu Z:</span>{' '}
                          <strong className="text-emerald-400">{selectedCard.atomicNumber}</strong>
                        </div>
                      )}
                      {selectedCard.atk !== undefined && (
                        <div>
                          <span className="text-slate-500">ATK:</span>{' '}
                          <strong className="text-amber-400">{selectedCard.atk}</strong>
                        </div>
                      )}
                      {selectedCard.def !== undefined && (
                        <div>
                          <span className="text-slate-500">DEF:</span>{' '}
                          <strong className="text-cyan-400">{selectedCard.def}</strong>
                        </div>
                      )}
                      {selectedCard.linkRating !== undefined && (
                        <div>
                          <span className="text-slate-500">Link:</span>{' '}
                          <strong className="text-cyan-300">LINK-{selectedCard.linkRating}</strong>
                        </div>
                      )}
                      {selectedCard.xyzRank !== undefined && (
                        <div>
                          <span className="text-slate-500">Rank:</span>{' '}
                          <strong className="text-yellow-400">RANK-{selectedCard.xyzRank}</strong>
                        </div>
                      )}
                      {selectedCard.synchroLevel !== undefined && (
                        <div>
                          <span className="text-slate-500">Synchro:</span>{' '}
                          <strong className="text-emerald-300">LV-{selectedCard.synchroLevel}</strong>
                        </div>
                      )}
                      {selectedCard.pendulumScale !== undefined && (
                        <div>
                          <span className="text-slate-500">Scale:</span>{' '}
                          <strong className="text-purple-400">SCALE-{selectedCard.pendulumScale}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chemical Equation & Reaction Mechanism */}
                  {selectedCard.relatedEquation && (
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono">
                      <span className="text-emerald-400 font-bold block mb-1">⚛️ Phương trình hóa học bảo toàn:</span>
                      <div className="bg-black/60 p-2 rounded text-emerald-200 font-black text-sm">
                        {selectedCard.relatedEquation}
                      </div>
                    </div>
                  )}

                  {/* Educational Scientific Lore */}
                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs flex flex-col gap-1">
                    <span className="font-mono text-cyan-ion font-bold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Bản Sắc Khoa Học Thực Nghiệm:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {selectedCard.scientificLore}
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center text-xs text-slate-500 p-6 border border-dashed border-navy-light/30 rounded-lg">
                <Eye className="w-8 h-8 text-cyan-ion/40 mb-2" />
                Chọn bất kỳ thẻ bài nào trong kho để soi chi tiết công thức, phương trình, cấu hình electron Bohr và chỉ số chiến đấu!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Holographic Card Detail & Quantum Inspection Modal */}
      <CardDetailModal
        card={selectedCard}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        cardCollection={collectionOwned}
        onSelectCard={(c) => setSelectedCard(c)}
        onAddCardToDeck={onNavigateToDeck ? () => onNavigateToDeck() : undefined}
      />
    </div>
  );
};
