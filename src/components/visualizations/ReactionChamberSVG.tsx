// src/components/visualizations/ReactionChamberSVG.tsx
// Sci-Fi Chemical Tactical Reaction Vessel SVG Component

import React from 'react';
import { EnvironmentalCondition } from '../../domain/types';

interface ReactionChamberSVGProps {
  reactants: string[];
  conditions: EnvironmentalCondition[];
  isReacting?: boolean;
  isSuccess?: boolean;
  isFizzle?: boolean;
}

export const ReactionChamberSVG: React.FC<ReactionChamberSVGProps> = ({
  reactants,
  conditions,
  isReacting = false,
  isSuccess = false,
  isFizzle = false
}) => {
  const hasTemp = conditions.includes('HIGH_TEMP');
  const hasMoisture = conditions.includes('MOISTURE_H2O');
  const hasOxygen = conditions.includes('OXYGEN_GAS');
  const hasAcid = conditions.includes('ACID_DILUTE');
  const hasBase = conditions.includes('BASE_ALKALINE');

  const glowColor = isSuccess ? '#B4CD70' : isFizzle ? '#F06A55' : isReacting ? '#DE996A' : '#57C8C8';

  return (
    <div className="relative w-full max-w-[320px] mx-auto select-none">
      <svg viewBox="0 0 300 240" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172231" />
            <stop offset="50%" stopColor="#10131B" />
            <stop offset="100%" stopColor="#233348" />
          </linearGradient>

          <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0.05" />
          </linearGradient>

          <filter id="vesselGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Hexagonal Heavy Pylon Housing */}
        <polygon
          points="60,20 240,20 280,60 280,180 240,220 60,220 20,180 20,60"
          fill="url(#vesselGrad)"
          stroke="#233348"
          strokeWidth="2.5"
        />

        {/* Top & Bottom Magnetic Induction Coils */}
        <rect x="70" y="22" width="160" height="12" rx="4" fill="#0D141E" stroke="#C67A45" strokeWidth="1" />
        <rect x="70" y="206" width="160" height="12" rx="4" fill="#0D141E" stroke="#C67A45" strokeWidth="1" />

        {/* Central Cylindrical Quartz Reaction Core */}
        <rect
          x="65"
          y="42"
          width="170"
          height="156"
          rx="18"
          fill="#10131B"
          stroke={glowColor}
          strokeWidth="1.8"
          filter="url(#vesselGlow)"
        />

        {/* Plasma Energy Fluid Inside Chamber */}
        <path
          d="M 68 150 Q 150 142 232 150 L 232 186 Q 150 198 68 186 Z"
          fill="url(#plasmaGrad)"
        />

        {/* Atmospheric Environmental Condition Inlets (Left & Right) */}
        {/* Left Side: Water / Moisture / Temperature Indicators */}
        <g transform="translate(28, 70)">
          <circle cx="0" cy="0" r="12" fill={hasMoisture ? '#57C8C8' : '#172231'} stroke="#233348" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill={hasMoisture ? '#10131B' : '#B0A898'} fontSize="9" fontFamily="monospace" fontWeight="bold">H₂O</text>
        </g>
        <g transform="translate(28, 110)">
          <circle cx="0" cy="0" r="12" fill={hasTemp ? '#F06A55' : '#172231'} stroke="#233348" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill={hasTemp ? '#10131B' : '#B0A898'} fontSize="9" fontFamily="monospace" fontWeight="bold">t°</text>
        </g>
        <g transform="translate(28, 150)">
          <circle cx="0" cy="0" r="12" fill={hasOxygen ? '#DE996A' : '#172231'} stroke="#233348" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill={hasOxygen ? '#10131B' : '#B0A898'} fontSize="9" fontFamily="monospace" fontWeight="bold">O₂</text>
        </g>

        {/* Right Side: Acid / Base Valves */}
        <g transform="translate(272, 90)">
          <circle cx="0" cy="0" r="12" fill={hasAcid ? '#B4CD70' : '#172231'} stroke="#233348" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill={hasAcid ? '#10131B' : '#B0A898'} fontSize="8" fontFamily="monospace" fontWeight="bold">H⁺</text>
        </g>
        <g transform="translate(272, 130)">
          <circle cx="0" cy="0" r="12" fill={hasBase ? '#57C8C8' : '#172231'} stroke="#233348" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill={hasBase ? '#10131B' : '#B0A898'} fontSize="8" fontFamily="monospace" fontWeight="bold">OH⁻</text>
        </g>

        {/* Interactive Reactant Quantum Nodes Floating Inside */}
        {reactants.length === 0 ? (
          <text x="150" y="125" textAnchor="middle" fill="#B0A898" fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            [BUỒNG PHẢN ỨNG TRỐNG]
          </text>
        ) : (
          <g transform="translate(150, 115)">
            {reactants.map((sym, idx) => {
              const count = reactants.length;
              const angle = (2 * Math.PI * idx) / count - Math.PI / 2;
              const r = count === 1 ? 0 : 38;
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);

              return (
                <g key={sym} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="18" fill="#172231" stroke={glowColor} strokeWidth="1.8" filter="url(#vesselGlow)" />
                  <text x="0" y="6" textAnchor="middle" fill="#FDFBF7" fontSize="14" fontFamily="'Cinzel', serif" fontWeight="900">
                    {sym}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Energy Laser Lines between reactants */}
        {reactants.length >= 2 && (
          <line x1="120" y1="115" x2="180" y2="115" stroke={glowColor} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
        )}

        {/* Status Indicator Bar at Bottom */}
        <text x="150" y="215" textAnchor="middle" fill={glowColor} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          {isSuccess ? '● PHẢN ỨNG HOÀN TẤT' : isFizzle ? '▲ BẤY NHẬN THỨC / BẤT HOẠT' : isReacting ? '► ĐANG XÚC TÁC' : '■ TRẠNG THÁI CHỜ'}
        </text>
      </svg>
    </div>
  );
};
