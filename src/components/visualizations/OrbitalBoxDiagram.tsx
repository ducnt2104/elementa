// src/components/visualizations/OrbitalBoxDiagram.tsx
// Interactive Quantum Orbital Box Diagram (Ô lượng tử & Quy tắc Hund)
// Designed for GDPT 2018 Chemistry Standards

import React from 'react';
import { computeElectronStructure, OrbitalBox } from '../../domain/orbitalEngine';
import { Sparkles, Atom, ShieldAlert, Award } from 'lucide-react';

interface OrbitalBoxDiagramProps {
  z: number;
  symbol: string;
}

export const OrbitalBoxDiagram: React.FC<OrbitalBoxDiagramProps> = ({ z, symbol }) => {
  const structure = computeElectronStructure(z, symbol);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 text-xs">
      {/* Header: Electron Configuration */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2.5">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-cyan-ion" />
          <span className="font-mono font-bold text-ivory">CẤU HÌNH ELECTRON THEO ORBITAL</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="px-2 py-0.5 rounded bg-navy text-cyan-ion border border-cyan-ion/40 font-semibold">
            {structure.nobleGasConfigString}
          </span>
        </div>
      </div>

      {/* Full String Notation */}
      <div className="p-2 rounded-lg bg-navy/60 font-mono text-cyan-300 text-[11px] tracking-wide break-words">
        {structure.fullConfigString}
      </div>

      {/* Unpaired Electon & Valence Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
        <div className="p-2 rounded-lg bg-navy/40 border border-navy-light/40 flex items-center justify-between">
          <span className="text-ivory-muted">e hóa trị:</span>
          <span className="font-bold text-copper px-1.5 py-0.5 rounded bg-copper/10">
            {structure.valenceElectrons} e
          </span>
        </div>

        <div className="p-2 rounded-lg bg-navy/40 border border-navy-light/40 flex items-center justify-between">
          <span className="text-ivory-muted">e độc thân (Hund):</span>
          <span className={`font-bold px-1.5 py-0.5 rounded ${structure.totalUnpairedElectrons > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-navy text-ivory-muted'}`}>
            {structure.totalUnpairedElectrons} e
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-navy/40 border border-navy-light/40 flex items-center justify-between">
          <span className="text-ivory-muted">Phân loại:</span>
          <span className="font-bold text-cyan-ion px-1.5 py-0.5 rounded bg-cyan-ion/10">
            {structure.elementClass}
          </span>
        </div>
      </div>

      {/* Magnetic Character & Spin-Only Moment Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-navy/40 border border-navy-light/40 font-mono text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="text-ivory-muted">Từ tính (Magnetism):</span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              structure.magneticProperty.magneticType === 'PARAMAGNETIC'
                ? 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border border-slate-600 text-slate-300'
            }`}
          >
            {structure.magneticProperty.magneticTypeVI}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-ivory-muted">Mômen từ spin (μ):</span>
          <span className="font-bold text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
            {structure.magneticProperty.magneticMomentBohrMagneton.toFixed(2)} BM
          </span>
        </div>
      </div>

      {/* Orbital Boxes Visual Grid */}
      <div className="flex flex-wrap items-end gap-2.5 pt-2">
        {structure.subshells.map((sub, sIdx) => {
          const isValenceSubshell = sub.n === structure.valenceShellPrincipalN;

          return (
            <div
              key={sIdx}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                isValenceSubshell
                  ? 'bg-cyan-950/20 border-cyan-ion/50 shadow-sm shadow-cyan-ion/10'
                  : 'bg-navy/30 border-navy-light/40'
              }`}
            >
              {/* Subshell Label */}
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                <span className={isValenceSubshell ? 'text-cyan-ion' : 'text-ivory'}>
                  {sub.subshell}
                </span>
                <span className="text-ivory-muted text-[9px]">
                  ({sub.electronCount}/{sub.capacity})
                </span>
              </div>

              {/* Orbital Box Row */}
              <div className="flex items-center gap-1">
                {sub.boxes.map((box, bIdx) => (
                  <div
                    key={bIdx}
                    className="w-7 h-9 rounded bg-obsidian border border-navy-light flex items-center justify-center font-mono text-sm relative select-none"
                    title={`Orbital ${sub.subshell} ô ${bIdx + 1}: ${box.spinUp && box.spinDown ? 'Đôi e ghép đôi' : box.spinUp ? 'Electron độc thân' : 'Orbital trống'}`}
                  >
                    {/* Spin Up Arrow */}
                    {box.spinUp && (
                      <span className="text-cyan-400 font-black leading-none drop-shadow">↑</span>
                    )}
                    {/* Spin Down Arrow */}
                    {box.spinDown && (
                      <span className="text-amber-400 font-black leading-none drop-shadow">↓</span>
                    )}
                    {/* Empty Box Placeholder */}
                    {!box.spinUp && !box.spinDown && (
                      <span className="w-1.5 h-0.5 rounded bg-navy-light/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pedagogical Tendency Explanation */}
      <div className="p-2.5 rounded-lg bg-navy/50 border border-navy-light/30 flex items-start gap-2 text-ivory-muted leading-relaxed">
        <Sparkles className="w-4 h-4 text-cyan-ion flex-shrink-0 mt-0.5" />
        <span className="text-[11px]">{structure.chemicalTendencyVI}</span>
      </div>
    </div>
  );
};
