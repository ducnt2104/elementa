// src/components/visualizations/AtomDiagram.tsx
// Bespoke SVG Scientific Visualization: Bohr-Sommerfeld Electron Shell Representation

import React, { useMemo } from 'react';
import { ElementData } from '../../domain/types';
import { getShellElectrons } from '../../domain/orbitalEngine';

interface AtomDiagramProps {
  element: ElementData;
  size?: number; // width & height in px
  animated?: boolean;
}

export const AtomDiagram: React.FC<AtomDiagramProps> = ({
  element,
  size = 220,
  animated = true
}) => {
  const z = element.z;

  // Calculate electrons per shell (K, L, M, N, O, P, Q) accurately using IUPAC quantum orbital engine
  const shells = useMemo(() => getShellElectrons(z, element.symbol), [z, element.symbol]);
  const numShells = shells.length;
  const maxRadius = 90;
  const baseRadius = 26;
  const shellStep = (maxRadius - baseRadius) / Math.max(1, numShells);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <svg
        viewBox="-110 -110 220 220"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id={`nucleusGrad_${z}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#DE996A" />
            <stop offset="60%" stopColor="#C67A45" />
            <stop offset="100%" stopColor="#172231" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Orbit Field */}
        <circle cx="0" cy="0" r="105" fill="none" stroke="#233348" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />

        {/* Electron Shell Rings */}
        {shells.map((electronCount, shellIdx) => {
          const r = baseRadius + (shellIdx + 1) * shellStep;
          const animSpeed = 8 + shellIdx * 4; // outer orbits take longer
          const isClockwise = shellIdx % 2 === 0;

          return (
            <g key={shellIdx}>
              {/* Shell Orbit Track */}
              <circle
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke="#57C8C8"
                strokeWidth="1"
                strokeDasharray="4 2"
                opacity={0.35 + (shellIdx / numShells) * 0.35}
              />

              {/* Orbiting Electrons Group */}
              <g
                style={
                  animated
                    ? {
                        transformOrigin: '0px 0px',
                        animation: `spin ${animSpeed}s linear infinite ${isClockwise ? 'normal' : 'reverse'}`
                      }
                    : undefined
                }
              >
                {Array.from({ length: electronCount }).map((_, eIdx) => {
                  const angle = (2 * Math.PI * eIdx) / electronCount;
                  const cx = r * Math.cos(angle);
                  const cy = r * Math.sin(angle);

                  return (
                    <circle
                      key={eIdx}
                      cx={cx}
                      cy={cy}
                      r="3.2"
                      fill="#57C8C8"
                      stroke="#10131B"
                      strokeWidth="1"
                      filter="url(#glow)"
                    />
                  );
                })}
              </g>
            </g>
          );
        })}

        {/* Central Nucleus (Protons + Neutrons) */}
        <circle cx="0" cy="0" r="19" fill={`url(#nucleusGrad_${z})`} stroke="#E8E0D1" strokeWidth="1.5" filter="url(#glow)" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fill="#FDFBF7"
          fontFamily="'Cinzel', serif"
          fontSize="13"
          fontWeight="900"
          letterSpacing="0.5"
        >
          {element.symbol}
        </text>

        {/* Quantum Sub-labels */}
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fill="#C67A45"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="700"
        >
          Z={z}
        </text>
      </svg>

      {/* Orbit Shell Breakdown Legend */}
      <div className="flex items-center gap-1.5 mt-2 font-mono text-[10px] text-ivory-muted">
        <span className="text-cyan-ion font-bold">Lớp e:</span>
        {shells.map((count, i) => (
          <span key={i} className="px-1 py-0.5 rounded bg-navy-light/60 border border-navy-light text-ivory">
            {['K', 'L', 'M', 'N', 'O', 'P', 'Q'][i]}:{count}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
