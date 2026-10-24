// src/components/cards/ChemicalCardView.tsx
// High-Fidelity Yu-Gi-Oh! Inspired Tactical Chemical Card Component
// Calibrated to standard vertical 5:7 Trading Card Game aspect ratio

import React, { useState } from 'react';
import { PlayableCardDef, ChemicalAttribute, CardRarity, CardType } from '../../domain/cardGameTypes';
import { CardIllustration } from '../../assets/svg/CardIllustrations';
import {
  Flame,
  Droplets,
  Mountain,
  Wind,
  Zap,
  Skull,
  Shield,
  Sparkles,
  Atom,
  FlaskConical,
  Star,
  Share2,
  Info,
  Maximize2
} from 'lucide-react';

export interface ChemicalCardViewProps {
  card: PlayableCardDef;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'detail';
  isFaceDown?: boolean;
  isDefensePosition?: boolean;
  isSelected?: boolean;
  isPlayable?: boolean;
  disableHoverZoom?: boolean;
  quantityOwned?: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onInspect?: (card: PlayableCardDef) => void;
  showDetailsOnHover?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  customOverlayBadge?: React.ReactNode;
}

export const ChemicalCardView: React.FC<ChemicalCardViewProps> = ({
  card,
  size = 'md',
  isFaceDown = false,
  isDefensePosition = false,
  isSelected = false,
  isPlayable = false,
  disableHoverZoom = false,
  quantityOwned,
  onClick,
  onDoubleClick,
  onInspect,
  draggable = false,
  onDragStart,
  onDragEnd,
  customOverlayBadge
}) => {
  const [tilt, setTilt] = useState<{ rx: number; ry: number; px: number; py: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableHoverZoom || size === 'xs' || isDefensePosition) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = -((y - cy) / cy) * 8;
    const ry = ((x - cx) / cx) * 8;
    const px = Math.round((x / rect.width) * 100);
    const py = Math.round((y / rect.height) * 100);
    setTilt({ rx, ry, px, py });
  };

  const handleMouseLeave = () => {
    setTilt(null);
  };

  // Calibrated to 5:7 vertical proportion (Width : Height = 5 : 7)
  const sizeClasses = {
    xs: 'w-20 aspect-[5/7] text-[8px]',        // 80 x 112 px
    sm: 'w-24 sm:w-26 md:w-28 aspect-[5/7] text-[9px]', // Scaled safely
    md: 'w-36 aspect-[5/7] text-[10px]',       // 144 x 202 px
    lg: 'w-48 aspect-[5/7] text-xs',           // 192 x 269 px
    detail: 'w-72 aspect-[5/7] text-sm'        // 288 x 403 px
  }[size];

  // Attribute styling & icon
  const getAttributeData = (attr: ChemicalAttribute) => {
    switch (attr) {
      case 'PYRO':
        return { label: 'HỎA', bg: 'bg-gradient-to-br from-amber-500 to-red-600', text: 'text-amber-200', border: 'border-amber-400', icon: <Flame className="w-3.5 h-3.5" /> };
      case 'AQUA':
        return { label: 'THỦY', bg: 'bg-gradient-to-br from-cyan-400 to-blue-600', text: 'text-cyan-200', border: 'border-cyan-400', icon: <Droplets className="w-3.5 h-3.5" /> };
      case 'TERRA':
        return { label: 'ĐỊA', bg: 'bg-gradient-to-br from-emerald-600 to-amber-800', text: 'text-emerald-200', border: 'border-emerald-400', icon: <Mountain className="w-3.5 h-3.5" /> };
      case 'AERO':
        return { label: 'PHONG', bg: 'bg-gradient-to-br from-teal-400 to-sky-600', text: 'text-teal-200', border: 'border-teal-400', icon: <Wind className="w-3.5 h-3.5" /> };
      case 'ELECTRO':
        return { label: 'LÔI', bg: 'bg-gradient-to-br from-yellow-400 to-amber-600', text: 'text-yellow-200', border: 'border-yellow-400', icon: <Zap className="w-3.5 h-3.5" /> };
      case 'ACID_DARK':
        return { label: 'ĐỘC', bg: 'bg-gradient-to-br from-purple-600 to-rose-700', text: 'text-purple-200', border: 'border-purple-400', icon: <Skull className="w-3.5 h-3.5" /> };
      case 'NOBLE_VOID':
      default:
        return { label: 'TRƠ', bg: 'bg-gradient-to-br from-sky-400 to-indigo-600', text: 'text-sky-200', border: 'border-sky-400', icon: <Shield className="w-3.5 h-3.5" /> };
    }
  };

  // Card frame background depending on card type (Authentic TCG colors)
  const getFrameGradient = (type: CardType) => {
    switch (type) {
      case 'ELEMENT_MONSTER':
        // Iconic Yu-Gi-Oh! Normal/Effect Monster Amber/Orange Gold
        return 'from-amber-700 via-amber-900/90 to-slate-950 border-amber-500/80 shadow-amber-500/25';
      case 'COMPOUND_MONSTER':
        // Fusion / Synthesis Monster Royal Violet
        return 'from-purple-700 via-fuchsia-950/90 to-slate-950 border-purple-400/85 shadow-purple-500/30';
      case 'LINK_MONSTER':
        // Link Monster Cyber Deep Indigo / Hex Blue
        return 'from-blue-700 via-indigo-950/90 to-slate-950 border-cyan-400/90 shadow-cyan-500/30';
      case 'REACTION_SPELL':
      case 'EQUIP_CATALYST':
      case 'FIELD_ENVIRONMENT':
        // Spell Cards Emerald / Viridian Green
        return 'from-emerald-700 via-teal-950/90 to-slate-950 border-emerald-400/80 shadow-emerald-500/25';
      case 'TRAP':
        // Trap Cards Magenta / Pinkish Crimson
        return 'from-pink-700 via-rose-950/90 to-slate-950 border-pink-400/80 shadow-pink-500/25';
      default:
        return 'from-slate-700 via-slate-900 to-slate-950 border-slate-500 shadow-slate-500/20';
    }
  };

  // Holographic Foil Shimmer for high rarity (smooth GPU shimmer without layout paint-thrashing)
  const getFoilClass = (rarity: CardRarity) => {
    switch (rarity) {
      case 'SECRET_RARE':
        return 'after:absolute after:inset-0 after:bg-gradient-to-tr after:from-transparent after:via-cyan-400/20 after:to-fuchsia-400/20 after:pointer-events-none after:mix-blend-overlay';
      case 'ULTRA_RARE':
        return 'after:absolute after:inset-0 after:bg-gradient-to-tr after:from-transparent after:via-amber-300/15 after:to-transparent after:pointer-events-none';
      case 'SUPER_RARE':
        return 'after:absolute after:inset-0 after:bg-gradient-to-tr after:from-transparent after:via-white/10 after:to-transparent after:pointer-events-none';
      default:
        return '';
    }
  };

  const attrData = getAttributeData(card.attribute);
  const frameClass = getFrameGradient(card.cardType);
  const foilClass = getFoilClass(card.rarity);
  const isLink = card.cardType === 'LINK_MONSTER';

  // If Face-Down (Card Back)
  if (isFaceDown) {
    return (
      <div
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`relative ${sizeClasses} rounded-lg border-2 border-cyan-400/60 bg-gradient-to-br from-slate-900 via-obsidian to-navy p-1 shadow-lg transform-gpu select-none cursor-pointer transition-shadow duration-150 ${
          !disableHoverZoom ? 'hover:border-cyan-400' : ''
        } ${
          isDefensePosition ? 'rotate-90 origin-center' : ''
        } ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-obsidian' : ''}`}
      >
        <div className="w-full h-full rounded border border-cyan-900/40 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-obsidian overflow-hidden relative">
          {/* Benzene & Atomic Orbital Back Pattern */}
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-cyan-400/40 flex items-center justify-center">
            <Atom className="w-6 h-6 text-cyan-400/70" />
          </div>
          <div className="absolute bottom-1 font-serif text-[7px] font-black tracking-widest text-cyan-400/60 uppercase">
            ELEMENTA
          </div>
        </div>
      </div>
    );
  }

  // Render Link Arrow Marker (8 cardinal directions)
  const renderLinkArrow = (direction: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT') => {
    const isActive = card.linkArrows?.includes(direction);
    if (!isLink) return null;

    const positions = {
      TOP: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1',
      BOTTOM: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1',
      LEFT: 'top-1/2 left-0 -translate-x-1 -translate-y-1/2',
      RIGHT: 'top-1/2 right-0 translate-x-1 -translate-y-1/2',
      TOP_LEFT: 'top-0 left-0 -translate-x-0.5 -translate-y-0.5',
      TOP_RIGHT: 'top-0 right-0 translate-x-0.5 -translate-y-0.5',
      BOTTOM_LEFT: 'bottom-0 left-0 -translate-x-0.5 translate-y-0.5',
      BOTTOM_RIGHT: 'bottom-0 right-0 translate-x-0.5 translate-y-0.5'
    }[direction];

    return (
      <div
        key={direction}
        className={`absolute ${positions} z-20 pointer-events-none transition-all duration-300 ${
          isActive
            ? 'w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-amber-500 border border-white shadow-[0_0_8px_#ef4444] rotate-45 scale-110'
            : 'w-1.5 h-1.5 bg-slate-800/60 border border-slate-600/40 rotate-45'
        }`}
      />
    );
  };

  const isXs = size === 'xs';

  return (
    <div
      onClick={onClick || (() => onInspect?.(card))}
      onDoubleClick={onDoubleClick || (() => onInspect?.(card))}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt && !isDefensePosition
          ? `perspective(600px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale(1.025)`
          : isDefensePosition
          ? 'rotate(90deg)'
          : undefined,
        transformStyle: 'preserve-3d'
      }}
      className={`relative ${sizeClasses} rounded-lg border-2 p-1 bg-gradient-to-b ${frameClass} shadow-xl select-none cursor-pointer flex flex-col justify-between overflow-hidden group ${foilClass} ${
        isSelected
          ? 'ring-2 ring-cyan-400 z-20 shadow-cyan-400/50'
          : disableHoverZoom
          ? 'hover:border-cyan-300'
          : isPlayable
          ? 'hover:border-cyan-400 shadow-emerald-400/20'
          : ''
      } transition-transform duration-75 ease-out`}
    >
      {/* VÙNG 1: Header (Tên & Thuộc tính) */}
      <div className="flex items-center justify-between gap-1 px-1 py-0.5 rounded bg-black/75 border border-white/10 shrink-0">
        <span className="font-serif font-black text-ivory truncate tracking-tight text-[10px] leading-tight flex-1">
          {card.name}
        </span>
        <div
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${attrData.bg} p-0.5 flex items-center justify-center text-white shrink-0 shadow border ${attrData.border}`}
          title={`Thuộc tính: ${attrData.label}`}
        >
          {attrData.icon}
        </div>
      </div>

      {/* VÙNG 2: Cấp độ / Sao (Quái thú) hoặc Huy hiệu Link Rating (Ẩn trên xs nếu quá chật) */}
      {!isXs && ((card.cardType === 'ELEMENT_MONSTER' || card.cardType === 'COMPOUND_MONSTER') && card.level ? (
        <div className="flex items-center justify-end gap-0.5 px-0.5 py-0.2 shrink-0">
          {Array.from({ length: Math.min(10, card.level) }).map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-500 drop-shadow" />
          ))}
        </div>
      ) : isLink ? (
        <div className="flex items-center justify-end gap-1 px-1 py-0.2 shrink-0">
          <span className="px-1 py-0.2 rounded bg-blue-950 border border-cyan-400/80 text-[8px] font-mono font-black text-cyan-300 flex items-center gap-0.5">
            <Share2 className="w-2.5 h-2.5 text-cyan-400" />
            LINK-{card.linkRating || 1}
          </span>
        </div>
      ) : null)}

      {/* VÙNG 3: Minh Họa Chính (SVG Artwork & Watermark) */}
      <div className="relative flex-1 my-0.5 rounded border border-black/60 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden flex flex-col items-center justify-center p-0.5 min-h-[36px]">
        {/* Link Arrows (if Link Monster) */}
        {isLink && (
          <>
            {renderLinkArrow('TOP')}
            {renderLinkArrow('BOTTOM')}
            {renderLinkArrow('LEFT')}
            {renderLinkArrow('RIGHT')}
            {renderLinkArrow('TOP_LEFT')}
            {renderLinkArrow('TOP_RIGHT')}
            {renderLinkArrow('BOTTOM_LEFT')}
            {renderLinkArrow('BOTTOM_RIGHT')}
          </>
        )}

        {/* High-Fidelity Vector SVG Artwork */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-95 p-0.5">
          <CardIllustration
            cardId={card.id}
            chemicalFormula={card.chemicalFormula}
            attribute={card.attribute}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Chemical Symbol / Formula Emblem Overlay */}
        <div className={`relative z-10 flex flex-col items-center justify-center bg-black/60 rounded backdrop-blur-[2px] border border-white/10 ${
          isXs ? 'px-1 py-0.2' : 'px-1.5 py-0.5'
        }`}>
          <span className={`font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 drop-shadow-md ${
            isXs ? 'text-[11px] leading-tight' : 'text-base'
          }`}>
            {card.chemicalFormula || (card.cardType === 'TRAP' ? 'TRAP' : 'SPELL')}
          </span>
          {card.atomicNumber && !isXs && (
            <span className="text-[7px] font-mono text-cyan-300 tracking-widest -mt-0.5 font-bold">
              Z = {card.atomicNumber}
            </span>
          )}
        </div>

        {/* Subtle Radial Glow */}
        <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />

        {/* Mana Cost Badge */}
        <div className="absolute top-0.5 left-0.5 px-1 py-0.2 rounded bg-cyan-950/90 border border-cyan-400/60 text-[8px] font-mono font-bold text-cyan-300 flex items-center gap-0.5 shadow">
          <Zap className="w-2 h-2 text-amber-300" />
          {card.manaCost}
        </div>

        {/* Card Type Tag */}
        <div className="absolute bottom-0.5 right-0.5 text-[7px] font-mono text-slate-300 bg-black/75 px-1 rounded uppercase tracking-wider border border-white/10">
          {card.cardType === 'ELEMENT_MONSTER' && '[Nguyên Tố]'}
          {card.cardType === 'COMPOUND_MONSTER' && '[Tổng Hợp]'}
          {card.cardType === 'LINK_MONSTER' && '[Liên Kết]'}
          {card.cardType === 'REACTION_SPELL' && '[Phép]'}
          {card.cardType === 'TRAP' && '[Bẫy]'}
          {card.cardType === 'EQUIP_CATALYST' && '[Xúc Tác]'}
          {card.cardType === 'FIELD_ENVIRONMENT' && '[Môi Trường]'}
        </div>
      </div>

      {/* VÙNG 5: Khung Hiệu Ứng & Phương Trình (Hiển thị khi size != xs) */}
      {!isXs && (
        <div className="px-1 py-0.5 rounded bg-black/85 border border-white/10 shrink-0 text-[8px] leading-snug max-h-14 overflow-hidden">
          {card.relatedEquation && (
            <div className="font-mono text-[7px] text-emerald-300 font-bold truncate border-b border-emerald-900/40 pb-0.5 mb-0.5">
              {card.relatedEquation}
            </div>
          )}
          <p className="text-slate-300 line-clamp-2">{card.effectText}</p>
        </div>
      )}

      {/* VÙNG 4: Chỉ Số Chiến Đấu (ATK/DEF/LINK) hoặc Loại Phép */}
      <div className="flex items-center justify-between px-1 py-0.5 mt-0.5 rounded bg-black/70 border border-white/10 shrink-0 font-mono text-[8px] font-bold">
        {isLink ? (
          <div className="w-full flex items-center justify-between text-ivory">
            <span className="text-amber-300">ATK/{card.atk ?? 0}</span>
            <span className="text-cyan-300 font-black">L-{card.linkRating || 1}</span>
          </div>
        ) : (card.cardType === 'ELEMENT_MONSTER' || card.cardType === 'COMPOUND_MONSTER') ? (
          <div className="w-full flex items-center justify-between text-ivory">
            <span className="text-amber-300">ATK/{card.atk ?? 0}</span>
            <span className="text-cyan-300">DEF/{card.def ?? 0}</span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between text-slate-400 text-[7px]">
            <span className="text-cyan-400 font-bold">{card.spellTrapSubtype?.replace('_', ' ') || 'SPELL'}</span>
            <span>SPD {card.spellSpeed || 1}</span>
          </div>
        )}
      </div>

      {/* Quantity Badge if in collection */}
      {quantityOwned !== undefined && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-obsidian font-mono font-black text-[9px] flex items-center justify-center shadow-lg border border-white z-20">
          x{quantityOwned}
        </div>
      )}

      {/* 3D Holographic Light Reflection Specular Foil Layer */}
      {tilt && (card.rarity === 'SECRET_RARE' || card.rarity === 'ULTRA_RARE' || card.rarity === 'SUPER_RARE') && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg mix-blend-color-dodge z-30 transition-opacity duration-150"
          style={{
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255,255,255,0.45) 0%, rgba(56,189,248,0.25) 25%, rgba(236,72,153,0.2) 55%, transparent 80%)`,
            opacity: card.rarity === 'SECRET_RARE' ? 0.85 : card.rarity === 'ULTRA_RARE' ? 0.65 : 0.45
          }}
        />
      )}

      {/* Custom Overlay Badge */}
      {customOverlayBadge}
    </div>
  );
};
