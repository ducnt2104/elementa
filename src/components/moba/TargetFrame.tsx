// src/components/moba/TargetFrame.tsx
// Real-time Tactical & Pedagogical Target Inspection Frame for ELEMENTA MOBA
// Reveals target health, chemical composition, electron configuration, and combat vulnerabilities.

import React from 'react';
import { ElementalCrest } from '../../assets/svg/ElementalCrests';
import { Shield, Zap, Skull, Crosshair, X, Flame, Droplets } from 'lucide-react';

export interface TargetEntityData {
  id: string;
  name: string;
  title: string;
  type: 'HERO' | 'MINION' | 'TURRET' | 'MONSTER';
  team: 'BLUE' | 'RED' | 'NEUTRAL';
  hp: number;
  maxHp: number;
  mana?: number;
  maxMana?: number;
  symbol?: string;
  chemicalFormula?: string;
  reactionVulnerability?: string;
  attackDamage: number;
  armor: number;
}

interface TargetFrameProps {
  target: TargetEntityData | null;
  onClearTarget: () => void;
}

export const TargetFrame: React.FC<TargetFrameProps> = ({ target, onClearTarget }) => {
  if (!target) return null;

  const hpPercent = Math.max(0, Math.min(100, (target.hp / target.maxHp) * 100));
  const isEnemy = target.team === 'RED' || target.team === 'NEUTRAL';
  const teamColor = target.team === 'BLUE' ? '#38bdf8' : target.team === 'RED' ? '#ef4444' : '#fbbf24';

  return (
    <div className="absolute top-14 left-4 z-30 w-72 bg-obsidian/95 backdrop-blur-md rounded-2xl border-2 border-navy-light/80 p-3 shadow-2xl animate-fadeIn select-none">
      {/* Target Header */}
      <div className="flex items-center justify-between pb-2 border-b border-navy-light/60">
        <div className="flex items-center gap-2">
          {target.type === 'HERO' ? (
            <ElementalCrest heroIdOrSymbol={target.symbol || 'Na'} size={32} />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
              style={{ backgroundColor: `${teamColor}20`, color: teamColor, border: `1px solid ${teamColor}60` }}
            >
              {target.type === 'TURRET' ? '🛡️' : target.type === 'MONSTER' ? '🐉' : '⚔️'}
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-ivory truncate max-w-[170px]">{target.name}</h4>
            <span className="text-[10px] font-mono text-ivory-muted block">{target.title}</span>
          </div>
        </div>

        <button
          onClick={onClearTarget}
          className="p-1 rounded-md bg-navy hover:bg-navy-light text-ivory-muted hover:text-ivory transition-colors"
          title="Bỏ chọn mục tiêu"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Target HP Bar */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-ivory-muted">Sinh Lực</span>
          <span className="font-bold text-ivory">
            {Math.round(target.hp)} / {Math.round(target.maxHp)} ({Math.round(hpPercent)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-navy rounded-full overflow-hidden border border-navy-light/60">
          <div
            className={`h-full transition-all duration-150 ${
              isEnemy ? 'bg-gradient-to-r from-red-600 to-rose-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      {/* Target Stats: ATK & DEF */}
      <div className="grid grid-cols-2 gap-1.5 mt-2 font-mono text-[10px]">
        <div className="flex items-center gap-1 bg-navy/60 px-2 py-1 rounded-lg border border-navy-light/40 text-ivory">
          <Crosshair className="w-3 h-3 text-coral-reaction" />
          <span>Sát Thương: <strong className="text-white">{target.attackDamage}</strong></span>
        </div>
        <div className="flex items-center gap-1 bg-navy/60 px-2 py-1 rounded-lg border border-navy-light/40 text-ivory">
          <Shield className="w-3 h-3 text-cyan-ion" />
          <span>Giáp: <strong className="text-white">{target.armor}</strong></span>
        </div>
      </div>

      {/* Chemical Identity & Vulnerability Pedagogical Box */}
      {target.chemicalFormula && (
        <div className="mt-2 p-2 rounded-xl bg-navy/80 border border-cyan-ion/40 text-[10px]">
          <div className="flex items-center gap-1 text-cyan-300 font-mono font-bold">
            <Zap className="w-3 h-3" />
            <span>Thành Phần Hóa Học: {target.chemicalFormula}</span>
          </div>
          {target.reactionVulnerability && (
            <p className="text-ivory-muted mt-1 italic leading-tight">
              ⚡ Điểm yếu: {target.reactionVulnerability}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
