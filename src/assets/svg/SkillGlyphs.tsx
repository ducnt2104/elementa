// src/assets/svg/SkillGlyphs.tsx
// Bespoke Vector Glyphs for Chemical Abilities, Summoner Spells, and Tactical Status Effects

import React from 'react';

interface GlyphProps {
  size?: number | string;
  className?: string;
}

/**
 * 1. Thủy Kích / Water Burst (Na + H2O)
 */
export const WaterBurstGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="waterBurstGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="60%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#082f49" />
      </radialGradient>
    </defs>
    {/* Shockwave Rings */}
    <circle cx="32" cy="32" r="28" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
    <circle cx="32" cy="32" r="20" stroke="#7dd3fc" strokeWidth="2.5" />
    {/* Central Water Droplet */}
    <path
      d="M 32 14 C 32 14 20 28 20 38 C 20 44.6 25.4 50 32 50 C 38.6 50 44 44.6 44 38 C 44 28 32 14 32 14 Z"
      fill="url(#waterBurstGrad)"
      stroke="#bae6fd"
      strokeWidth="1.5"
    />
    {/* Spark Flare */}
    <circle cx="32" cy="38" r="4" fill="#fbbf24" />
  </svg>
);

/**
 * 2. Xút / Alkaline Hydroxide Shield (NaOH / Ba(OH)2)
 */
export const AlkalineShieldGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <polygon points="32,6 56,18 56,44 32,58 8,44 8,18" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
    <polygon points="32,14 48,22 48,40 32,50 16,40 16,22" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
    <text x="32" y="38" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="13" fill="#67e8f9">
      OH⁻
    </text>
  </svg>
);

/**
 * 3. Gỉ Sét / Rust Corrosion (Fe2O3)
 */
export const RustCorrosionGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crumbling serrated plate */}
    <path
      d="M 12 18 L 26 12 L 40 16 L 52 10 L 48 30 L 54 44 L 38 54 L 20 48 L 10 34 Z"
      fill="#431407"
      stroke="#ea580c"
      strokeWidth="2.5"
    />
    <path d="M 22 24 L 34 38 M 38 22 L 28 42" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    {/* Flaking rust particles */}
    <circle cx="16" cy="42" r="2.5" fill="#ea580c" />
    <circle cx="48" cy="22" r="2" fill="#fdba74" />
    <circle cx="42" cy="46" r="3" fill="#ea580c" />
  </svg>
);

/**
 * 4. Khí Độc Clo / Chlorine Gas Vortex (Cl2)
 */
export const ToxicGasGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#022c22" stroke="#10b981" strokeWidth="2.5" />
    {/* Diatomic Cloud Swirls */}
    <path
      d="M 18 36 Q 24 22 36 24 T 48 36 T 32 46 T 18 36"
      stroke="#84cc16"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="28" cy="32" r="5" fill="#a3e635" />
    <circle cx="38" cy="32" r="5" fill="#a3e635" />
    <line x1="28" y1="32" x2="38" y2="32" stroke="#022c22" strokeWidth="2" />
  </svg>
);

/**
 * 5. Nhiệt Nhôm / Thermite Blast (2Al + Fe2O3)
 */
export const ThermiteBlastGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="thermiteGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#b91c1c" />
      </radialGradient>
    </defs>
    <polygon
      points="32,4 40,24 60,18 46,34 58,52 38,44 32,60 26,44 6,52 18,34 4,18 24,24"
      fill="url(#thermiteGrad)"
      stroke="#fef08a"
      strokeWidth="1.5"
    />
    <circle cx="32" cy="34" r="8" fill="#ffffff" />
  </svg>
);

/**
 * 6. Phóng Điện Cu / Galvanic Discharge (Cu2+ + 2e-)
 */
export const GalvanicSparkGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
    {/* Lightning Bolt */}
    <polygon points="34,8 18,34 30,34 26,56 46,28 34,28" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

/**
 * 7. Tốc Biến / Flash Spell
 */
export const FlashSpellGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#0f172a" stroke="#eab308" strokeWidth="2.5" />
    {/* Teleporting Footprint / Wings */}
    <path
      d="M 16 38 L 32 16 L 36 28 L 48 20 L 36 46 L 32 36 Z"
      fill="#facc15"
      stroke="#fef08a"
      strokeWidth="1.5"
    />
    <circle cx="48" cy="18" r="3" fill="#ffffff" />
  </svg>
);

/**
 * 8. Hồi Phục / Heal Spell
 */
export const HealSpellGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
    {/* Cross */}
    <path
      d="M 26 14 L 38 14 L 38 26 L 50 26 L 50 38 L 38 38 L 38 50 L 26 50 L 26 38 L 14 38 L 14 26 L 26 26 Z"
      fill="#34d399"
      stroke="#a7f3d0"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * 9. Biến Về / Recall Spell
 */
export const RecallSpellGlyph: React.FC<GlyphProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2.5" />
    {/* Quantum Portal Swirl */}
    <path
      d="M 32 14 A 18 18 0 1 1 16 32"
      stroke="#7dd3fc"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="8 4"
    />
    <polygon points="12,24 16,34 26,30" fill="#38bdf8" />
    <circle cx="32" cy="32" r="5" fill="#e0f2fe" />
  </svg>
);

/**
 * Status Effect Badges (for Champion / Target buff indicator)
 */
export const StatusBadge: React.FC<{ type: 'OXIDATION' | 'REDUCTION' | 'CATALYST' | 'CORROSION' | 'SHIELD'; label: string }> = ({
  type,
  label
}) => {
  const configs = {
    OXIDATION: { bg: 'bg-red-950/80', border: 'border-red-500/60', text: 'text-red-400', icon: '🔥' },
    REDUCTION: { bg: 'bg-cyan-950/80', border: 'border-cyan-500/60', text: 'text-cyan-400', icon: '⚡' },
    CATALYST: { bg: 'bg-emerald-950/80', border: 'border-emerald-500/60', text: 'text-emerald-400', icon: '⚗️' },
    CORROSION: { bg: 'bg-amber-950/80', border: 'border-amber-500/60', text: 'text-amber-400', icon: '☣️' },
    SHIELD: { bg: 'bg-blue-950/80', border: 'border-blue-500/60', text: 'text-blue-400', icon: '🛡️' }
  };
  const cfg = configs[type] || configs.CATALYST;

  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold shadow-sm ${cfg.bg} ${cfg.border} ${cfg.text}`}>
      <span>{cfg.icon}</span>
      <span>{label}</span>
    </div>
  );
};
