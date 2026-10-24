// src/components/visualizations/BondingVisualizerModal.tsx
// Interactive Chemical Bonding SVG Visualizer & Electronegativity Gauge
// Calibrated to GDPT 2018 Chemistry Standards & IUPAC VSEPR Theory

import React, { useState } from 'react';
import {
  CANONICAL_BONDING_DATABASE,
  CanonicalBondingModel
} from '../../domain/bondingEngine';
import { VseprVisualizer } from './VseprVisualizer';
import { sound } from '../../audio/soundEngine';
import {
  X,
  Atom,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  Compass,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface BondingVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BondingVisualizerModal: React.FC<BondingVisualizerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedBondId, setSelectedBondId] = useState<string>('bond_h2o');
  const [activeTab, setActiveTab] = useState<'VISUAL' | 'VSEPR' | 'MECHANISM' | 'TACTICAL'>('VISUAL');

  if (!isOpen) return null;

  const currentBond: CanonicalBondingModel =
    CANONICAL_BONDING_DATABASE.find(b => b.id === selectedBondId) ||
    CANONICAL_BONDING_DATABASE[0];

  const vsepr = currentBond.vsepr;

  const mapBondToVseprPreset = (bondId: string): string => {
    switch (bondId) {
      case 'bond_h2o': return 'vsepr_h2o';
      case 'bond_nh3': return 'vsepr_nh3';
      case 'bond_ch4': return 'vsepr_ch4';
      case 'bond_bf3': return 'vsepr_bf3';
      case 'bond_so2': return 'vsepr_so2';
      case 'bond_co2': return 'vsepr_co2';
      default: return 'vsepr_h2o';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-ion/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-ivory">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playUiClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-navy-light/50 pb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-ion to-coral-reaction p-0.5 flex items-center justify-center shadow-md">
            <Atom className="w-5 h-5 text-obsidian" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl text-ivory tracking-wide flex items-center gap-2">
              PHÒNG THÍ NGHIỆM LIÊN KẾT HÓA HỌC & CẤU TRÚC PHÂN TỬ (VSEPR)
            </h2>
            <p className="text-xs text-ivory-muted">
              Mô phỏng hình học không gian, lai hóa orbital và hiệu độ âm điện Pauling theo GDPT 2018 Lớp 10
            </p>
          </div>
        </div>

        {/* Molecule / Salt Quick Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CANONICAL_BONDING_DATABASE.map(b => (
            <button
              key={b.id}
              onClick={() => {
                sound.playCardSelect();
                setSelectedBondId(b.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all border ${
                selectedBondId === b.id
                  ? 'bg-cyan-ion text-obsidian border-cyan-ion shadow-md shadow-cyan-ion/20 scale-105'
                  : 'bg-navy/70 text-ivory-muted border-navy-light/50 hover:bg-navy-light hover:text-ivory'
              }`}
            >
              <span>{b.formula}</span>
              <span className="text-[10px] ml-1 opacity-80">
                ({b.bondType === 'IONIC' ? 'Ion' : b.bondType === 'POLAR_COVALENT' ? 'Có cực' : 'Không cực'})
              </span>
            </button>
          ))}
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('VISUAL');
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'VISUAL'
                ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mô Hình Không Gian VSEPR</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('VSEPR');
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'VSEPR'
                ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Lai Hóa & Góc Không Gian</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('MECHANISM');
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'MECHANISM'
                ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cơ Chế Liên Kết</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TACTICAL');
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'TACTICAL'
                ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bùa Lợi Tác Chiến</span>
          </button>
        </div>

        {activeTab === 'VSEPR' ? (
          <VseprVisualizer initialPresetId={mapBondToVseprPreset(currentBond.id)} />
        ) : (
          <>
            {/* Main Bonding Showcase Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Interactive Bespoke SVG Diagram (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-obsidian/75 border border-navy-light/60 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#233348_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Title Badge inside canvas */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-navy/90 text-cyan-ion border border-cyan-ion/40 font-bold">
                {currentBond.formula} • {currentBond.name_vi}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                currentBond.bondType === 'IONIC'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : currentBond.bondType === 'POLAR_COVALENT'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {currentBond.bondType === 'IONIC' ? 'LIÊN KẾT ION' : currentBond.bondType === 'POLAR_COVALENT' ? 'CỘNG HÓA TRỊ CÓ CỰC' : 'CỘNG HÓA TRỊ KHÔNG CỰC'}
              </span>
            </div>

            {/* SVG Visual Representation */}
            <svg viewBox="-160 -100 320 200" className="w-full max-w-[420px] h-auto overflow-visible select-none my-2">
              <defs>
                <filter id="glowBond">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="polarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="lonePairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* 1. IONIC LATTICE (NaCl, MgO) */}
              {currentBond.vsepr?.shape === 'CRYSTAL_LATTICE' ? (
                <g>
                  {/* Electrostatic Force Waves between ions */}
                  <line x1="-55" y1="0" x2="55" y2="0" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" filter="url(#glowBond)">
                    <animate attributeName="strokeDashoffset" from="16" to="0" dur="1.2s" repeatCount="indefinite" />
                  </line>

                  {/* Cation A+ */}
                  <g transform="translate(-70, 0)">
                    <circle r="36" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                    <circle r="22" fill="#0284c7" opacity="0.7" />
                    <text textAnchor="middle" dy="5" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="16" fontWeight="bold">
                      {currentBond.formula.includes('Na') ? 'Na⁺' : 'Mg²⁺'}
                    </text>
                    <text textAnchor="middle" dy="48" fill="#38bdf8" fontFamily="monospace" fontSize="9">
                      Cation ({currentBond.formula.includes('Na') ? '+1' : '+2'})
                    </text>
                  </g>

                  {/* Electron Transfer Arc */}
                  <path d="M -50 -35 Q 0 -65 50 -35" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2">
                    <animate attributeName="strokeDashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
                  </path>
                  <circle cx="0" cy="-50" r="4" fill="#00f0ff" filter="url(#glowBond)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <text x="0" y="-58" textAnchor="middle" fill="#00f0ff" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    e⁻ chuyển dịch
                  </text>

                  {/* Anion B- */}
                  <g transform="translate(70, 0)">
                    <circle r="46" fill="#172231" stroke="#f43f5e" strokeWidth="2" filter="url(#glowBond)" />
                    <circle r="30" fill="#e11d48" opacity="0.7" />
                    <text textAnchor="middle" dy="5" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="16" fontWeight="bold">
                      {currentBond.formula.includes('Cl') ? 'Cl⁻' : 'O²⁻'}
                    </text>
                    <text textAnchor="middle" dy="58" fill="#f43f5e" fontFamily="monospace" fontSize="9">
                      Anion ({currentBond.formula.includes('Cl') ? '-1' : '-2'}, 8e Octet)
                    </text>

                    {/* 8 Octet Electrons around Anion */}
                    {Array.from({ length: 8 }).map((_, idx) => {
                      const angle = (idx * Math.PI) / 4;
                      const ex = 46 * Math.cos(angle);
                      const ey = 46 * Math.sin(angle);
                      return (
                        <circle key={idx} cx={ex} cy={ey} r="3" fill="#fb7185" stroke="#0f172a" strokeWidth="1" />
                      );
                    })}
                  </g>
                </g>
              ) : currentBond.id === 'bond_h2o' ? (
                // 2. BENT 104.5° (H2O)
                <g>
                  {/* Two Lone Pair Lobes on Oxygen */}
                  <path d="M -15 -18 C -35 -45, -15 -65, 0 -35 Z" fill="url(#lonePairGrad)" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <circle cx="-15" cy="-45" r="2.5" fill="#38bdf8" />
                  <circle cx="-23" cy="-45" r="2.5" fill="#38bdf8" />

                  <path d="M 15 -18 C 35 -45, 15 -65, 0 -35 Z" fill="url(#lonePairGrad)" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <circle cx="15" cy="-45" r="2.5" fill="#38bdf8" />
                  <circle cx="23" cy="-45" r="2.5" fill="#38bdf8" />

                  <text x="0" y="-62" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="9">
                    2 cặp electron tự do (đẩy góc)
                  </text>

                  {/* Bond Lines to Hydrogens */}
                  <line x1="0" y1="0" x2="-60" y2="45" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="0" x2="60" y2="45" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

                  {/* Bond Angle Arc (104.5°) */}
                  <path d="M -25 19 A 30 30 0 0 0 25 19" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="-24" y="22" width="48" height="15" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="0" y="33" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="10" fontWeight="bold">
                    104.5°
                  </text>

                  {/* Central Oxygen */}
                  <circle cx="0" cy="0" r="26" fill="#172231" stroke="#f43f5e" strokeWidth="2.5" filter="url(#glowBond)" />
                  <text x="0" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="16" fontWeight="bold">
                    O
                  </text>
                  <text x="0" y="16" textAnchor="middle" fill="#f43f5e" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    δ²⁻
                  </text>

                  {/* Left Hydrogen */}
                  <circle cx="-60" cy="45" r="18" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-60" y="50" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">
                    H
                  </text>
                  <text x="-60" y="70" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    δ⁺
                  </text>

                  {/* Right Hydrogen */}
                  <circle cx="60" cy="45" r="18" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="60" y="50" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">
                    H
                  </text>
                  <text x="60" y="70" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    δ⁺
                  </text>
                </g>
              ) : currentBond.id === 'bond_co2' ? (
                // 3. LINEAR 180° (CO2)
                <g>
                  {/* Left Double Bond */}
                  <line x1="-22" y1="-5" x2="-62" y2="-5" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />
                  <line x1="-22" y1="5" x2="-62" y2="5" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />

                  {/* Right Double Bond */}
                  <line x1="22" y1="-5" x2="62" y2="-5" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />
                  <line x1="22" y1="5" x2="62" y2="5" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />

                  {/* Bond Angle Arc (180°) */}
                  <path d="M -40 -12 A 40 40 0 0 1 40 -12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="-24" y="-38" width="48" height="15" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="0" y="-27" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="10" fontWeight="bold">
                    180°
                  </text>

                  {/* Central Carbon */}
                  <circle cx="0" cy="0" r="22" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                    C
                  </text>
                  <text x="0" y="15" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="8">
                    lai hóa sp
                  </text>

                  {/* Left Oxygen */}
                  <circle cx="-82" cy="0" r="22" fill="#172231" stroke="#f43f5e" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-82" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="14" fontWeight="bold">
                    O
                  </text>
                  <text x="-82" y="-28" textAnchor="middle" fill="#f43f5e" fontFamily="monospace" fontSize="8">
                    δ⁻ ←
                  </text>

                  {/* Right Oxygen */}
                  <circle cx="82" cy="0" r="22" fill="#172231" stroke="#f43f5e" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="82" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="14" fontWeight="bold">
                    O
                  </text>
                  <text x="82" y="-28" textAnchor="middle" fill="#f43f5e" fontFamily="monospace" fontSize="8">
                    → δ⁻
                  </text>

                  {/* Dipole Moment Cancellation Label */}
                  <text x="0" y="42" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    Hai vectơ lưỡng cực triệt tiêu nhau: μ = 0 (Không phân cực)
                  </text>
                </g>
              ) : currentBond.id === 'bond_bf3' ? (
                // 4. TRIGONAL PLANAR 120° (BF3)
                <g>
                  {/* Three B-F Bonds */}
                  <line x1="0" y1="0" x2="0" y2="-65" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />
                  <line x1="0" y1="0" x2="58" y2="34" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />
                  <line x1="0" y1="0" x2="-58" y2="34" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />

                  {/* 120° Arc */}
                  <path d="M 0 -25 A 25 25 0 0 1 22 13" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="26" y="-8" fill="#f59e0b" fontFamily="monospace" fontSize="10" fontWeight="bold">
                    120°
                  </text>

                  {/* Central Boron */}
                  <circle cx="0" cy="0" r="22" fill="#172231" stroke="#f59e0b" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                    B
                  </text>
                  <text x="0" y="15" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="7">
                    sp² (6e)
                  </text>

                  {/* Top Fluorine */}
                  <circle cx="0" cy="-65" r="18" fill="#172231" stroke="#22d3ee" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="-60" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">
                    F
                  </text>

                  {/* Bottom-Right Fluorine */}
                  <circle cx="58" cy="34" r="18" fill="#172231" stroke="#22d3ee" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="58" y="39" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">
                    F
                  </text>

                  {/* Bottom-Left Fluorine */}
                  <circle cx="-58" cy="34" r="18" fill="#172231" stroke="#22d3ee" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-58" y="39" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">
                    F
                  </text>

                  {/* Incomplete Octet Tag */}
                  <text x="0" y="68" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    Boron có 6e (Octet chưa đầy đủ) • Axit Lewis mạnh
                  </text>
                </g>
              ) : currentBond.id === 'bond_nh3' ? (
                // 5. TRIGONAL PYRAMIDAL 107° (NH3)
                <g>
                  {/* Lone Pair Lobe on Nitrogen */}
                  <path d="M 0 -18 C -22 -45, 22 -45, 0 -18 Z" fill="url(#lonePairGrad)" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <circle cx="-5" cy="-36" r="2.5" fill="#38bdf8" />
                  <circle cx="5" cy="-36" r="2.5" fill="#38bdf8" />
                  <text x="0" y="-48" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="8">
                    1 cặp electron tự do (đỉnh chóp)
                  </text>

                  {/* 3 Bonds Downwards */}
                  <line x1="0" y1="-5" x2="-60" y2="40" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />
                  <polygon points="0,-5 -8,50 8,50" fill="#38bdf8" opacity="0.4" />
                  <line x1="0" y1="-5" x2="0" y2="50" stroke="#38bdf8" strokeWidth="3.5" />
                  <line x1="0" y1="-5" x2="60" y2="40" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />

                  {/* Bond Angle Arc 107° */}
                  <path d="M -22 10 A 24 24 0 0 0 0 19" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="-32" y="24" fill="#f59e0b" fontFamily="monospace" fontSize="10" fontWeight="bold">
                    107°
                  </text>

                  {/* Central Nitrogen */}
                  <circle cx="0" cy="-5" r="24" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="0" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                    N
                  </text>
                  <text x="0" y="10" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="8">
                    sp³ (δ⁻)
                  </text>

                  {/* 3 Hydrogens */}
                  <circle cx="-60" cy="40" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="-60" y="44" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <circle cx="0" cy="55" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="59" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <circle cx="60" cy="40" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="60" y="44" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>
                </g>
              ) : currentBond.id === 'bond_ch4' ? (
                // 6. TETRAHEDRAL 109.5° (CH4)
                <g>
                  {/* 4 Bonds in 3D Perspective */}
                  {/* Top Bond (In Plane) */}
                  <line x1="0" y1="0" x2="0" y2="-62" stroke="#34d399" strokeWidth="3" opacity="0.9" />

                  {/* Right Bond (In Plane) */}
                  <line x1="0" y1="0" x2="58" y2="18" stroke="#34d399" strokeWidth="3" opacity="0.9" />

                  {/* Forward Wedge Bond */}
                  <polygon points="0,0 -35,46 -48,36" fill="#34d399" opacity="0.75" />

                  {/* Backward Dash Bond */}
                  <line x1="0" y1="0" x2="-55" y2="-22" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.8" />

                  {/* Angle Arc 109.5° */}
                  <path d="M 0 -25 A 25 25 0 0 1 24 8" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="14" y="-18" width="44" height="15" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="36" y="-7" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    109.5°
                  </text>

                  {/* Central Carbon */}
                  <circle cx="0" cy="0" r="22" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="0" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                    C
                  </text>
                  <text x="0" y="15" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="8">
                    sp³
                  </text>

                  {/* 4 Hydrogens */}
                  <circle cx="0" cy="-62" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="0" y="-58" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <circle cx="58" cy="18" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="58" y="22" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <circle cx="-42" cy="42" r="16" fill="#172231" stroke="#38bdf8" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-42" y="46" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <circle cx="-55" cy="-22" r="15" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                  <text x="-55" y="-18" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold">H</text>

                  <text x="0" y="70" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="9">
                    Hình tứ diện đều hoàn hảo (Tetrahedral 109.5°)
                  </text>
                </g>
              ) : currentBond.id === 'bond_so2' ? (
                // 7. BENT 119° (SO2)
                <g>
                  {/* Lone Pair Lobe on Sulfur */}
                  <path d="M 0 -18 C -22 -45, 22 -45, 0 -18 Z" fill="url(#lonePairGrad)" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
                  <circle cx="-5" cy="-34" r="2.5" fill="#f59e0b" />
                  <circle cx="5" cy="-34" r="2.5" fill="#f59e0b" />
                  <text x="0" y="-48" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="8">
                    1 cặp electron tự do (đẩy góc thu hẹp)
                  </text>

                  {/* Resonance Bonds to Oxygen */}
                  <line x1="-12" y1="12" x2="-54" y2="36" stroke="#f43f5e" strokeWidth="2.5" opacity="0.9" />
                  <line x1="-6" y1="20" x2="-48" y2="44" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />

                  <line x1="12" y1="12" x2="54" y2="36" stroke="#f43f5e" strokeWidth="2.5" opacity="0.9" />
                  <line x1="6" y1="20" x2="48" y2="44" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />

                  {/* Bond Angle Arc 119° */}
                  <path d="M -24 16 A 28 28 0 0 0 24 16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="-22" y="20" width="44" height="15" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="0" y="31" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="10" fontWeight="bold">
                    119°
                  </text>

                  {/* Central Sulfur */}
                  <circle cx="0" cy="0" r="24" fill="#172231" stroke="#f59e0b" strokeWidth="2.5" filter="url(#glowBond)" />
                  <text x="0" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                    S
                  </text>
                  <text x="0" y="15" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="8">
                    sp² (δ⁺)
                  </text>

                  {/* Left Oxygen */}
                  <circle cx="-65" cy="42" r="20" fill="#172231" stroke="#f43f5e" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-65" y="47" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">O</text>
                  <text x="-65" y="68" textAnchor="middle" fill="#f43f5e" fontFamily="monospace" fontSize="8">δ⁻</text>

                  {/* Right Oxygen */}
                  <circle cx="65" cy="42" r="20" fill="#172231" stroke="#f43f5e" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="65" y="47" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">O</text>
                  <text x="65" y="68" textAnchor="middle" fill="#f43f5e" fontFamily="monospace" fontSize="8">δ⁻</text>

                  {/* Dipole Net */}
                  <text x="0" y="70" textAnchor="middle" fill="#22d3ee" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    Cấu trúc cộng hưởng lai hóa • Phân tử phân cực (μ &gt; 0 D)
                  </text>
                </g>
              ) : currentBond.id === 'bond_c2h4' ? (
                // 8. PLANAR 120° (C2H4)
                <g>
                  {/* C=C Double Bond */}
                  <line x1="-20" y1="-5" x2="20" y2="-5" stroke="#34d399" strokeWidth="3" opacity="0.9" />
                  <line x1="-20" y1="5" x2="20" y2="5" stroke="#34d399" strokeWidth="3" opacity="0.9" />
                  <rect x="-16" y="-18" width="32" height="12" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                  <text x="0" y="-9" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    1σ + 1π
                  </text>

                  {/* 4 C-H Bonds */}
                  <line x1="-40" y1="-10" x2="-80" y2="-45" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />
                  <line x1="-40" y1="10" x2="-80" y2="45" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />
                  <line x1="40" y1="-10" x2="80" y2="-45" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />
                  <line x1="40" y1="10" x2="80" y2="45" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />

                  {/* Angle Arc 120° */}
                  <path d="M -55 -25 A 25 25 0 0 1 -55 25" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="-70" y="4" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    120°
                  </text>

                  {/* Left Carbon */}
                  <circle cx="-38" cy="0" r="20" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-38" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="14" fontWeight="bold">C</text>
                  <text x="-38" y="14" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="7">sp²</text>

                  {/* Right Carbon */}
                  <circle cx="38" cy="0" r="20" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="38" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="14" fontWeight="bold">C</text>
                  <text x="38" y="14" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="7">sp²</text>

                  {/* 4 Hydrogens */}
                  <circle cx="-85" cy="-50" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="-85" y="-46" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  <circle cx="-85" cy="50" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="-85" y="54" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  <circle cx="85" cy="-50" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="85" y="-46" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  <circle cx="85" cy="50" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="85" y="54" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  <text x="0" y="68" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    6 nguyên tử cùng nằm trên 1 mặt phẳng (Planar 120°) • μ = 0
                  </text>
                </g>
              ) : currentBond.id === 'bond_c2h2' ? (
                // 9. LINEAR 180° (C2H2)
                <g>
                  {/* C#C Triple Bond */}
                  <line x1="-15" y1="-6" x2="15" y2="-6" stroke="#34d399" strokeWidth="2.5" opacity="0.9" />
                  <line x1="-15" y1="0" x2="15" y2="0" stroke="#34d399" strokeWidth="3" opacity="0.9" />
                  <line x1="-15" y1="6" x2="15" y2="6" stroke="#34d399" strokeWidth="2.5" opacity="0.9" />
                  <rect x="-16" y="-20" width="32" height="12" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                  <text x="0" y="-11" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="8" fontWeight="bold">
                    1σ + 2π
                  </text>

                  {/* Left C-H Bond */}
                  <line x1="-48" y1="0" x2="-80" y2="0" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />

                  {/* Right C-H Bond */}
                  <line x1="48" y1="0" x2="80" y2="0" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" />

                  {/* Left Carbon */}
                  <circle cx="-32" cy="0" r="18" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="-32" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">C</text>
                  <text x="-32" y="13" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="7">sp</text>

                  {/* Right Carbon */}
                  <circle cx="32" cy="0" r="18" fill="#172231" stroke="#34d399" strokeWidth="2" filter="url(#glowBond)" />
                  <text x="32" y="5" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="13" fontWeight="bold">C</text>
                  <text x="32" y="13" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="7">sp</text>

                  {/* Left Hydrogen */}
                  <circle cx="-92" cy="0" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="-92" y="4" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  {/* Right Hydrogen */}
                  <circle cx="92" cy="0" r="14" fill="#172231" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="92" y="4" textAnchor="middle" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="bold">H</text>

                  {/* Angle Arc 180° */}
                  <path d="M -50 -12 A 50 50 0 0 1 50 -12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="-22" y="-38" width="44" height="15" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="0" y="-27" textAnchor="middle" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    180°
                  </text>

                  <text x="0" y="45" textAnchor="middle" fill="#34d399" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    Đường thẳng 180° • Mật độ electron hình trụ siêu cao (μ = 0)
                  </text>
                </g>
              ) : (
                // 7. DIATOMIC COVALENT OVERLAP (H2, O2, N2, HCl)
                <g>
                  {/* Left Atom Orbit */}
                  <g transform="translate(-50, 0)">
                    <circle r="42" fill="#172231" stroke={currentBond.bondType === 'POLAR_COVALENT' ? '#38bdf8' : '#34d399'} strokeWidth="1.5" opacity="0.8" />
                    <text textAnchor="middle" dy="5" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                      {currentBond.formula.slice(0, 1)}
                    </text>
                    {currentBond.bondType === 'POLAR_COVALENT' && (
                      <text textAnchor="middle" dy="-48" fill="#38bdf8" fontFamily="monospace" fontSize="11" fontWeight="bold">
                        δ⁺
                      </text>
                    )}
                  </g>

                  {/* Right Atom Orbit */}
                  <g transform="translate(50, 0)">
                    <circle r="42" fill="#172231" stroke={currentBond.bondType === 'POLAR_COVALENT' ? '#f43f5e' : '#34d399'} strokeWidth="1.5" opacity="0.8" />
                    <text textAnchor="middle" dy="5" fill="#f8fafc" fontFamily="'Cinzel', serif" fontSize="15" fontWeight="bold">
                      {currentBond.formula.includes('Cl') ? 'Cl' : currentBond.formula.slice(0, 1)}
                    </text>
                    {currentBond.bondType === 'POLAR_COVALENT' && (
                      <text textAnchor="middle" dy="-48" fill="#f43f5e" fontFamily="monospace" fontSize="11" fontWeight="bold">
                        δ⁻
                      </text>
                    )}
                  </g>

                  {/* Shared Orbital Overlap Zone */}
                  <ellipse cx="0" cy="0" rx="24" ry="34" fill={currentBond.bondType === 'POLAR_COVALENT' ? 'url(#polarGrad)' : '#10b981'} opacity="0.5" filter="url(#glowBond)" />

                  {/* Shared Electron Pairs */}
                  {currentBond.bondOrder === 1 && (
                    <g transform="translate(0, 0)">
                      <circle cx="0" cy="-8" r="3.5" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="0" cy="8" r="3.5" fill="#00f0ff" filter="url(#glowBond)" />
                    </g>
                  )}
                  {currentBond.bondOrder === 2 && (
                    <g transform="translate(0, 0)">
                      <circle cx="-5" cy="-10" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="5" cy="-10" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="-5" cy="10" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="5" cy="10" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                    </g>
                  )}
                  {currentBond.bondOrder === 3 && (
                    <g transform="translate(0, 0)">
                      <circle cx="-6" cy="-14" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="6" cy="-14" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="-6" cy="0" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="6" cy="0" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="-6" cy="14" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                      <circle cx="6" cy="14" r="3" fill="#00f0ff" filter="url(#glowBond)" />
                    </g>
                  )}

                  {/* Shared Pair Label */}
                  <text x="0" y="52" textAnchor="middle" fill="#00f0ff" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentBond.sharedPairsCount} đôi e dùng chung ({currentBond.bondOrder === 3 ? 'Liên kết Ba N≡N' : currentBond.bondOrder === 2 ? 'Liên kết Đôi O=O' : 'Liên kết Đơn'})
                  </text>
                </g>
              )}
            </svg>

            {/* Geometry Tag */}
            <div className="mt-2 text-center">
              <span className="font-mono text-[11px] text-ivory-muted">
                Hình học không gian VSEPR: <strong className="text-cyan-300">{currentBond.geometryVI}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Pauling Scale Gauge & Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Pauling Electronegativity Difference Gauge */}
            <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-ivory">HIỆU ĐỘ ÂM ĐIỆN PAULING (Δχ)</span>
                <span className="font-mono text-sm font-extrabold text-cyan-ion">
                  Δχ = {currentBond.deltaChi.toFixed(2)}
                </span>
              </div>

              {/* Graphical Scale Bar [0, 0.4, 1.7, 3.2] */}
              <div className="space-y-1">
                <div className="w-full h-3 rounded-full bg-navy relative overflow-hidden flex">
                  <div className="h-full bg-emerald-500/70" style={{ width: `${(0.4 / 3.2) * 100}%` }} title="Không cực (< 0.4)" />
                  <div className="h-full bg-sky-500/70" style={{ width: `${((1.7 - 0.4) / 3.2) * 100}%` }} title="Có cực (0.4 - 1.7)" />
                  <div className="h-full bg-amber-500/70" style={{ width: `${((3.2 - 1.7) / 3.2) * 100}%` }} title="Liên kết Ion (≥ 1.7)" />

                  {/* Dynamic Pointer Indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg shadow-cyan-ion/80 transition-all duration-500"
                    style={{ left: `calc(${Math.min(100, (currentBond.deltaChi / 3.2) * 100)}% - 4px)` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-ivory-muted px-0.5">
                  <span>0.0 (Không cực)</span>
                  <span className="text-sky-300">0.4</span>
                  <span className="text-amber-300">1.7</span>
                  <span>3.2 (Ion)</span>
                </div>
              </div>
            </div>

            {/* VSEPR Parameters Card (When VSEPR tab or default visual) */}
            {vsepr && (
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/30 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-ion uppercase flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    THÔNG SỐ VSEPR & LAI HÓA
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-300 border border-cyan-ion/40 font-bold">
                    {vsepr.bondAngle}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Nguyên tử trung tâm:</div>
                    <div className="text-ivory font-bold">{vsepr.centralAtomSymbol}</div>
                  </div>
                  <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Trạng thái lai hóa:</div>
                    <div className="text-cyan-300 font-bold">{vsepr.hybridization}</div>
                  </div>
                  <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Số phối trí (SN):</div>
                    <div className="text-ivory font-bold">{vsepr.stericNumber}</div>
                  </div>
                  <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Momen lưỡng cực:</div>
                    <div className="text-amber-300 font-bold">{vsepr.dipoleMomentNet}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Lewis Formula Card */}
            <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-copper uppercase">CÔNG THỨC LEWIS & CẶP ELECTRON</span>
              <div className="p-2.5 rounded-lg bg-navy/80 font-mono text-center text-sm font-black text-cyan-300 tracking-widest border border-cyan-ion/30">
                {currentBond.lewisRepresentation}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-ivory-muted pt-1">
                <div>Đôi e liên kết: <strong className="text-ivory">{currentBond.sharedPairsCount} đôi</strong></div>
                <div>Đôi e tự do: <strong className="text-ivory">{currentBond.lonePairsCount} đôi</strong></div>
              </div>
            </div>

            {/* Tactical Buff Card (MOBA Synergy) */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-cyan-ion/40 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-emerald-300 uppercase">
                  BÙA LỢI CHIẾN THUẬT ELEMENTA
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm text-ivory">{currentBond.gameplayModifier.buffNameVI}</h4>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {currentBond.gameplayModifier.descriptionVI}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Details Tabs: Mechanism & Pedagogical Note */}
        <div className="p-4 rounded-xl bg-navy/50 border border-navy-light/40 flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-cyan-ion text-xs">
            <Sparkles className="w-4 h-4 text-cyan-ion" />
            <span>CƠ CHẾ HÌNH THÀNH LIÊN KẾT (GDPT 2018):</span>
          </div>
          <p className="text-ivory leading-relaxed">
            {currentBond.formationMechanismVI}
          </p>
        </div>
      </>
    )}
      </div>
    </div>
  );
};
