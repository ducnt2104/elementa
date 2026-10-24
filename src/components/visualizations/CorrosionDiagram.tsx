// src/components/visualizations/CorrosionDiagram.tsx
// Scientific Visualization: Electrochemical & Chemical Iron Rusting Mechanism

import React from 'react';

export const CorrosionDiagram: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-obsidian rounded-xl border border-navy-light/60 select-none">
      <svg viewBox="0 0 280 180" width={size} height={(size * 180) / 280} className="overflow-visible">
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#233348" />
            <stop offset="100%" stopColor="#0D141E" />
          </linearGradient>

          <linearGradient id="rustGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#935328" />
            <stop offset="50%" stopColor="#C67A45" />
            <stop offset="100%" stopColor="#B83E2C" />
          </linearGradient>

          <linearGradient id="waterDropletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#57C8C8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#172231" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Atmosphere Label */}
        <text x="140" y="20" textAnchor="middle" fill="#B0A898" fontSize="9" fontFamily="'JetBrains Mono', monospace">
          KHÔNG KHÍ CHỨA KHÍ OXYGEN (O₂)
        </text>

        {/* Water Droplet (Electrolyte Layer) */}
        <path
          d="M 50 110 Q 140 28 230 110 Z"
          fill="url(#waterDropletGrad)"
          stroke="#57C8C8"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
        <text x="140" y="70" textAnchor="middle" fill="#57C8C8" fontSize="10" fontFamily="monospace" fontWeight="bold">
          Màng nước điện li (2xH₂O)
        </text>

        {/* O2 Diffusion Arrow into droplet */}
        <path d="M 140 32 L 140 50" stroke="#DE996A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="160" y="44" fill="#DE996A" fontSize="8" fontFamily="monospace">O₂ hòa tan</text>

        {/* Porous Rust Flake Layer on Surface */}
        <path
          d="M 50 106 Q 90 98 140 104 Q 190 96 230 106 L 230 120 L 50 120 Z"
          fill="url(#rustGrad)"
          stroke="#F06A55"
          strokeWidth="1"
        />
        <text x="140" y="115" textAnchor="middle" fill="#FDFBF7" fontSize="9" fontFamily="monospace" fontWeight="bold">
          2Fe₂O₃·xH₂O (Gỉ sắt xốp rỗng)
        </text>

        {/* Solid Pure Iron Metal Substrate (Anode/Cathode Base) */}
        <rect x="30" y="120" width="220" height="48" rx="6" fill="url(#metalGrad)" stroke="#57C8C8" strokeWidth="1.5" />
        <text x="140" y="148" textAnchor="middle" fill="#E8E0D1" fontSize="12" fontFamily="'Cinzel', serif" fontWeight="900" letterSpacing="1">
          LÕI SẮT KIM LOẠI — Fe(s)
        </text>

        {/* Anodic reaction text */}
        <text x="70" y="132" textAnchor="middle" fill="#F06A55" fontSize="7" fontFamily="monospace">
          Anode: Fe → Fe²⁺ + 2e⁻
        </text>
        {/* Cathodic reaction text */}
        <text x="200" y="132" textAnchor="middle" fill="#57C8C8" fontSize="7" fontFamily="monospace">
          Cathode: O₂ + 4e⁻ → 4OH⁻
        </text>
      </svg>

      <div className="text-center mt-1">
        <span className="font-serif font-bold text-xs text-copper block">
          4Fe(s) + 3O₂(g) + 2xH₂O(l) → 2Fe₂O₃·xH₂O(s)
        </span>
        <span className="text-[10px] text-ivory-muted font-mono block">
          Cần đồng thời cả O₂ và hơi ẩm; gỉ xốp không bảo vệ được kim loại bên trong
        </span>
      </div>
    </div>
  );
};
