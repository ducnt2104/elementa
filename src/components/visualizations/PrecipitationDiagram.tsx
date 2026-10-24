// src/components/visualizations/PrecipitationDiagram.tsx
// Scientific Visualization: Precipitation & Crystal Nucleation in Aqueous Solution

import React from 'react';

interface PrecipitationDiagramProps {
  type?: 'BaSO4' | 'AgCl';
  size?: number;
}

export const PrecipitationDiagram: React.FC<PrecipitationDiagramProps> = ({
  type = 'BaSO4',
  size = 240
}) => {
  const isBarium = type === 'BaSO4';
  const cationLabel = isBarium ? 'Ba²⁺' : 'Ag⁺';
  const anionLabel = isBarium ? 'SO₄²⁻' : 'Cl⁻';
  const precipitateLabel = isBarium ? 'BaSO₄↓' : 'AgCl↓';
  const precipitateName = isBarium ? 'Barium sulfate (Trắng tinh khiết)' : 'Silver chloride (Trắng vón)';
  const kspText = isBarium ? 'K_sp ≈ 1.1 × 10⁻¹⁰' : 'K_sp ≈ 1.8 × 10⁻¹⁰';

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-obsidian rounded-xl border border-navy-light/60 select-none">
      <svg viewBox="0 0 240 180" width={size} height={(size * 180) / 240} className="overflow-visible">
        <defs>
          <linearGradient id="solutionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#57C8C8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#172231" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="precipitateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8E0D1" />
            <stop offset="50%" stopColor="#FDFBF7" />
            <stop offset="100%" stopColor="#B0A898" />
          </linearGradient>
        </defs>

        {/* Beaker Outline */}
        <path d="M 40 25 L 40 155 Q 40 165 50 165 L 190 165 Q 200 165 200 155 L 200 25" fill="none" stroke="#57C8C8" strokeWidth="2" opacity="0.6" />
        {/* Solution Level */}
        <path d="M 42 45 Q 120 40 198 45 L 198 163 L 42 163 Z" fill="url(#solutionGrad)" />

        {/* Floating Solvated Cations */}
        <g transform="translate(75, 70)">
          <circle cx="0" cy="0" r="13" fill="#172231" stroke="#DE996A" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#DE996A" fontSize="9" fontFamily="monospace" fontWeight="bold">{cationLabel}</text>
        </g>
        <g transform="translate(160, 60)">
          <circle cx="0" cy="0" r="13" fill="#172231" stroke="#DE996A" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#DE996A" fontSize="9" fontFamily="monospace" fontWeight="bold">{cationLabel}</text>
        </g>

        {/* Floating Solvated Anions */}
        <g transform="translate(125, 95)">
          <circle cx="0" cy="0" r="14" fill="#172231" stroke="#57C8C8" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#57C8C8" fontSize="9" fontFamily="monospace" fontWeight="bold">{anionLabel}</text>
        </g>
        <g transform="translate(65, 115)">
          <circle cx="0" cy="0" r="14" fill="#172231" stroke="#57C8C8" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#57C8C8" fontSize="9" fontFamily="monospace" fontWeight="bold">{anionLabel}</text>
        </g>

        {/* Crystal Lattice Nucleation Settling at the Bottom */}
        <path d="M 45 163 Q 120 150 195 163 Z" fill="url(#precipitateGrad)" stroke="#E8E0D1" strokeWidth="1" />
        
        {/* Crystal precipitate cluster icons */}
        <polygon points="110,154 118,142 126,154" fill="#FDFBF7" stroke="#C67A45" strokeWidth="0.8" />
        <polygon points="124,155 132,139 140,155" fill="#E8E0D1" stroke="#C67A45" strokeWidth="0.8" />
        <polygon points="138,154 146,145 154,154" fill="#FDFBF7" stroke="#C67A45" strokeWidth="0.8" />

        {/* Downward settling arrows */}
        <line x1="120" y1="115" x2="120" y2="135" stroke="#E8E0D1" strokeWidth="1.5" strokeDasharray="2 2" />
        <polygon points="120,138 116,132 124,132" fill="#E8E0D1" />

        <text x="120" y="35" textAnchor="middle" fill="#E8E0D1" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
          {precipitateLabel}
        </text>
      </svg>

      <div className="text-center mt-1 space-y-0.5">
        <span className="font-serif font-bold text-xs text-ivory">{precipitateName}</span>
        <span className="text-[10px] font-mono text-cyan-ion block">{kspText} (Không tan trong acid)</span>
      </div>
    </div>
  );
};
