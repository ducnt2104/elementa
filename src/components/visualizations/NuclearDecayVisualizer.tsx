// src/components/visualizations/NuclearDecayVisualizer.tsx
// Interactive Nuclear Chemistry, Radioactivity & Half-Life Decay Visualizer
// Conforming to Vietnam GDPT 2018 (Hóa 10 Chương 1, Vật lý 12 Chương Hạt Nhân) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Radiation,
  Sparkles,
  Sliders,
  RotateCcw,
  Shield,
  Activity,
  Flame,
  Info,
  Calendar,
  Layers,
  Scale,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  CURRICULUM_RADIOISOTOPES,
  RadioisotopeDef,
  NuclearDecayMode,
  RadiationShieldingType,
  calculateRemainingFraction,
  calculateRemainingMass,
  calculateDecayConstant,
  calculateCarbon14AgeYears,
  calculateMassDefectAmu,
  calculateBindingEnergyMeV,
  calculateBindingEnergyPerNucleon,
  PROTON_MASS_AMU,
  NEUTRON_MASS_AMU
} from '../../domain/nuclearEngine';
import { sound } from '../../audio/soundEngine';

export interface NuclearDecayVisualizerProps {
  initialIsotopeId?: string;
  className?: string;
}

export const NuclearDecayVisualizer: React.FC<NuclearDecayVisualizerProps> = ({
  initialIsotopeId = 'carbon_14',
  className = ''
}) => {
  const [selectedIsotopeId, setSelectedIsotopeId] = useState<string>(initialIsotopeId);
  const [decayFilter, setDecayFilter] = useState<NuclearDecayMode | 'ALL'>('ALL');
  const [halfLivesElapsed, setHalfLivesElapsed] = useState<number>(1.0); // 0 to 6 half-lives
  const [carbon14Pct, setCarbon14Pct] = useState<number>(50.0); // 1% to 100%
  const [activeTab, setActiveTab] = useState<'HALF_LIFE' | 'C14_DATING' | 'BINDING_ENERGY' | 'SHIELDING'>('HALF_LIFE');

  const isotope: RadioisotopeDef = useMemo(() => {
    return CURRICULUM_RADIOISOTOPES[selectedIsotopeId] || CURRICULUM_RADIOISOTOPES.carbon_14;
  }, [selectedIsotopeId]);

  const filteredIsotopes = useMemo(() => {
    return Object.values(CURRICULUM_RADIOISOTOPES).filter(item => {
      if (decayFilter === 'ALL') return true;
      return item.decayMode === decayFilter;
    });
  }, [decayFilter]);

  // Half-life calculations
  const remainingFraction = useMemo(() => {
    return calculateRemainingFraction(halfLivesElapsed, 1.0);
  }, [halfLivesElapsed]);

  const remainingPercentage = useMemo(() => {
    return Math.round(remainingFraction * 10000) / 100;
  }, [remainingFraction]);

  // Carbon-14 dating result
  const c14Result = useMemo(() => {
    return calculateCarbon14AgeYears(carbon14Pct);
  }, [carbon14Pct]);

  // Mass defect & Binding energy calculations for current isotope
  const bindingEnergyData = useMemo(() => {
    const z = isotope.parentNuclide.atomicNumberZ;
    const a = isotope.parentNuclide.massNumberA;
    // Approximate actual mass based on typical mass excess
    // For standard display purposes
    const estActualMass = a - (a > 50 ? 0.08 : 0.015);
    const deltaM = calculateMassDefectAmu(z, a, estActualMass);
    const eb = calculateBindingEnergyMeV(deltaM);
    const ebPerNucleon = calculateBindingEnergyPerNucleon(deltaM, a);
    return {
      z,
      neutronsN: a - z,
      a,
      deltaM,
      eb,
      ebPerNucleon
    };
  }, [isotope]);

  // 100 nuclei representation on a 10x10 grid
  // Number of remaining parents = round(100 * remainingFraction)
  const nucleiGrid = useMemo(() => {
    const parentCount = Math.round(100 * remainingFraction);
    return Array.from({ length: 100 }, (_, idx) => {
      // Deterministic distribution
      const isParent = idx < parentCount;
      return { id: idx, isParent };
    });
  }, [remainingFraction]);

  const handleTriggerDecayClick = () => {
    sound.playGeigerCounterClick();
    sound.playNuclearDecayBurst();
  };

  return (
    <div className={`p-4 sm:p-6 bg-navy/90 border border-amber-500/30 rounded-2xl text-ivory space-y-6 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-lg">
            <Radiation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                Hóa Học Hạt Nhân & Phóng Xạ
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs text-ivory-muted">
              Định luật phân rã phóng xạ, chu kỳ bán rã t₁/₂, định tuổi Cacbon-14 & năng lượng liên kết hạt nhân
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('HALF_LIFE');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'HALF_LIFE'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Chu Kỳ Bán Rã
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('C14_DATING');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'C14_DATING'
                ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Định Tuổi ¹⁴C
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('BINDING_ENERGY');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'BINDING_ENERGY'
                ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Độ Hụt Khối & E_b
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SHIELDING');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'SHIELDING'
                ? 'bg-purple-500 text-white shadow font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Tấm Chắn Phóng Xạ
          </button>
        </div>
      </div>

      {/* Radioisotope Catalog Selector */}
      <div className="space-y-3 bg-black/30 p-3.5 rounded-xl border border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono text-ivory-muted flex items-center gap-1.5 font-bold">
            <Radiation className="w-3.5 h-3.5 text-amber-400" /> Đồng vị phóng xạ chương trình:
          </span>
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
            {(['ALL', 'ALPHA', 'BETA_MINUS', 'BETA_PLUS', 'GAMMA', 'FISSION'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  sound.playUiClick();
                  setDecayFilter(mode);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  decayFilter === mode
                    ? 'bg-amber-500 text-obsidian font-bold'
                    : 'bg-navy-light/40 text-ivory-muted hover:text-ivory'
                }`}
              >
                {mode === 'ALL' ? 'Tất cả' : mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {filteredIsotopes.map(item => {
            const isSelected = item.id === selectedIsotopeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedIsotopeId(item.id);
                  handleTriggerDecayClick();
                }}
                className={`p-2 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400'
                    : 'bg-navy-light/20 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black font-mono text-white">
                    {item.parentNuclide.symbol}
                  </span>
                  <span className="text-[10px] font-mono px-1 rounded bg-black/40 text-amber-300">
                    {item.decayMode}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-ivory-muted truncate">
                  {item.nameVI}
                </div>
                <div className="text-[10px] font-mono text-amber-400">
                  t₁/₂ = {item.halfLifeDisplayVI}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: HALF-LIFE SIMULATOR & ATOM GRID */}
      {activeTab === 'HALF_LIFE' && (
        <div className="space-y-6">
          {/* Reaction Equation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-obsidian to-navy-light/30 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Phương trình phân rã phóng xạ (Bảo toàn số khối A và điện tích Z):
              </div>
              <div className="text-base sm:text-lg font-black font-mono text-white mt-1">
                {isotope.decayEquationVI}
              </div>
              <div className="text-xs text-ivory-muted mt-1">
                Hạt phát ra: <strong className="text-amber-300">{isotope.emittedParticleVI}</strong> • Năng lượng: <strong className="text-amber-300">Q = {isotope.decayEnergyMeV} MeV</strong>
              </div>
            </div>

            <button
              onClick={handleTriggerDecayClick}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all whitespace-nowrap"
            >
              <Zap className="w-4 h-4 fill-obsidian" />
              Bấm Máy Đo Geiger (Click!)
            </button>
          </div>

          {/* Interactive Slider */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-ivory-muted flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Thời gian trôi qua theo chu kỳ bán rã: <strong className="text-amber-300 text-sm">{halfLivesElapsed.toFixed(2)} × t₁/₂</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-ivory-muted">
                  Còn lại: <strong className="text-amber-300 text-sm">{remainingPercentage}%</strong>
                </span>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setHalfLivesElapsed(1.0);
                  }}
                  className="p-1 rounded bg-navy-light/40 hover:bg-navy-light text-ivory text-xs"
                  title="Đặt lại về 1 t1/2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="6"
              step="0.05"
              value={halfLivesElapsed}
              onChange={(e) => {
                setHalfLivesElapsed(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
              <span>0 t₁/₂ (100%)</span>
              <span>1 t₁/₂ (50%)</span>
              <span>2 t₁/₂ (25%)</span>
              <span>3 t₁/₂ (12.5%)</span>
              <span>4 t₁/₂ (6.25%)</span>
              <span>5 t₁/₂ (3.12%)</span>
              <span>6 t₁/₂ (1.56%)</span>
            </div>
          </div>

          {/* Dual Visual: 100-Nuclei Grid & Exponential Decay Curve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual 1: 100-Nuclei Lattice */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-ivory font-bold flex items-center gap-1.5">
                  <Radiation className="w-4 h-4 text-amber-400" /> Mạng 100 Hạt Nhân Mô Phỏng
                </span>
                <span className="text-amber-300 text-[11px]">
                  Mẹ: {Math.round(remainingFraction * 100)} • Con: {100 - Math.round(remainingFraction * 100)}
                </span>
              </div>

              {/* 10x10 Grid */}
              <div className="grid grid-cols-10 gap-1.5 p-3 rounded-lg bg-navy/80 border border-white/5 aspect-square max-w-[280px] mx-auto">
                {nucleiGrid.map(cell => (
                  <div
                    key={cell.id}
                    className={`rounded-full transition-all duration-300 ${
                      cell.isParent
                        ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] scale-100 animate-pulse'
                        : 'bg-slate-700/60 scale-75 border border-white/10'
                    }`}
                    title={cell.isParent ? `Hạt nhân mẹ ${isotope.parentNuclide.symbol}` : `Hạt nhân con ${isotope.daughterNuclide.symbol}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-ivory-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
                  <span>Hạt nhân mẹ ({isotope.parentNuclide.symbol})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-white/20" />
                  <span>Hạt nhân con ({isotope.daughterNuclide.symbol})</span>
                </div>
              </div>
            </div>

            {/* Visual 2: Theoretical Decay Curve SVG */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-ivory font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" /> Đường Cong Phân Rã Lý Thuyết
                </span>
                <span className="text-cyan-300 text-[11px]">
                  N(t) = N₀ · (1/2)^(t/t₁/₂)
                </span>
              </div>

              <svg viewBox="0 0 300 200" className="w-full h-auto bg-navy/80 rounded-lg p-2 border border-white/5">
                {/* Axes */}
                <line x1="30" y1="170" x2="280" y2="170" stroke="#64748b" strokeWidth="1.5" />
                <line x1="30" y1="20" x2="30" y2="170" stroke="#64748b" strokeWidth="1.5" />

                {/* Y-axis ticks */}
                <text x="5" y="25" fill="#94a3b8" fontSize="8" fontFamily="monospace">100%</text>
                <text x="12" y="95" fill="#94a3b8" fontSize="8" fontFamily="monospace">50%</text>
                <text x="18" y="168" fill="#94a3b8" fontSize="8" fontFamily="monospace">0%</text>

                {/* Horizontal reference lines */}
                <line x1="30" y1="95" x2="280" y2="95" stroke="#334155" strokeDasharray="3,3" />

                {/* X-axis ticks (0 to 6 half-lives) */}
                {[0, 1, 2, 3, 4, 5, 6].map(k => {
                  const x = 30 + (k / 6) * 240;
                  return (
                    <g key={k}>
                      <line x1={x} y1="170" x2={x} y2="175" stroke="#64748b" />
                      <text x={x - 4} y="186" fill="#94a3b8" fontSize="8" fontFamily="monospace">{k}</text>
                    </g>
                  );
                })}
                <text x="250" y="196" fill="#94a3b8" fontSize="8" fontFamily="monospace">t/t₁/₂</text>

                {/* Exponential decay path */}
                <path
                  d={`M 30 20 ${Array.from({ length: 60 }, (_, i) => {
                    const step = i / 10; // 0 to 6
                    const x = 30 + (step / 6) * 240;
                    const y = 20 + (1 - Math.pow(0.5, step)) * 150;
                    return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Current operating point */}
                {(() => {
                  const currentX = 30 + (Math.min(halfLivesElapsed, 6) / 6) * 240;
                  const currentY = 20 + (1 - remainingFraction) * 150;
                  return (
                    <g>
                      <line x1={currentX} y1="20" x2={currentX} y2="170" stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1.5" />
                      <circle cx={currentX} cy={currentY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={Math.min(currentX + 8, 220)} y={Math.max(currentY - 6, 30)} fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        {remainingPercentage}%
                      </text>
                    </g>
                  );
                })()}
              </svg>

              <div className="text-[11px] text-ivory-muted leading-relaxed">
                Định luật phân rã phóng xạ mang tính chất ngẫu nhiên thống kê: không thể biết trước chính xác khi nào một hạt nhân đơn lẻ phân rã, nhưng một quần thể hạt nhân lớn luôn suy giảm theo hàm mũ cố định.
              </div>
            </div>
          </div>

          {/* Real-world applications & pedagogical insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-navy-light/20 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Ứng Dụng Thực Tế Trong Đời Sống:
              </span>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {isotope.practicalApplicationVI}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-light/20 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" /> Trọng Tâm Bài Giảng & Thi Cử (GDPT 2018):
              </span>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {isotope.pedagogicalInsightVI}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RADIOCARBON DATING CALCULATOR */}
      {activeTab === 'C14_DATING' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-emerald-200">
                Máy Tính Định Tuổi Cổ Vật Bằng Cacbon-14 (Radiocarbon Dating)
              </h3>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Dựa trên chu kỳ bán rã t₁/₂ = 5,730 năm của đồng vị ¹⁴C. Khi sinh vật còn sống, tỷ lệ ¹⁴C/¹²C cân bằng với sinh quyển. Sau khi sinh vật chết, lượng ¹⁴C suy giảm theo công thức: t = - (5730 / ln 2) · ln(N/N₀).
            </p>
          </div>

          {/* C-14 Percentage Slider */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-ivory-muted flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Hoạt độ phóng xạ ¹⁴C còn lại so với mẫu sinh vật sống:
              </span>
              <span className="text-sm font-black font-mono text-emerald-300">
                {carbon14Pct.toFixed(1)}%
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="100"
              step="0.5"
              value={carbon14Pct}
              onChange={(e) => {
                setCarbon14Pct(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
              <span>0.5% (~43,000 năm)</span>
              <span>12.5% (17,190 năm)</span>
              <span>25% (11,460 năm)</span>
              <span>50% (5,730 năm)</span>
              <span>100% (Hiện đại)</span>
            </div>
          </div>

          {/* Archaeological Result Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/50 to-black/60 border border-emerald-500/30 text-center space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Niên đại ước tính
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {c14Result.estimatedAgeYears.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-emerald-300">
                năm trước hiện tại (BP)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ivory-muted">
                Độ không đảm bảo đo
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                ±{c14Result.uncertaintyYears.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-ivory-muted">
                năm (độ tin cậy 95%)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ivory-muted">
                Số chu kỳ bán rã đã trôi qua
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                {(c14Result.estimatedAgeYears / 5730).toFixed(2)}
              </div>
              <div className="text-xs font-mono text-ivory-muted">
                lần t₁/₂ (5,730 năm)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-light/20 border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white">Nhận định bối cảnh khảo cổ học:</span>
              <p className="text-xs text-ivory-muted mt-0.5">
                {c14Result.pedagogicalInterpretationVI}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BINDING ENERGY & MASS DEFECT */}
      {activeTab === 'BINDING_ENERGY' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-cyan-200">
                Độ Hụt Khối & Năng Lượng Liên Kết Hạt Nhân (Hệ thức Einstein E = mc²)
              </h3>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng của các nuclon tự do cấu thành nên nó. Chênh lệch khối lượng đó chính là độ hụt khối Δm, được giải phóng dưới dạng năng lượng liên kết E_b khi các nuclon liên kết lại với nhau.
            </p>
          </div>

          {/* Quantitative cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-center">
              <div className="text-[10px] font-mono text-ivory-muted uppercase">Thành phần hạt nhân</div>
              <div className="text-base font-black font-mono text-white">
                {bindingEnergyData.z} p + {bindingEnergyData.neutronsN} n
              </div>
              <div className="text-[10px] font-mono text-cyan-300">A = {bindingEnergyData.a} nuclon</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-center">
              <div className="text-[10px] font-mono text-ivory-muted uppercase">Độ hụt khối (Δm)</div>
              <div className="text-base font-black font-mono text-amber-300">
                {bindingEnergyData.deltaM.toFixed(4)}
              </div>
              <div className="text-[10px] font-mono text-ivory-muted">amu (u)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-center">
              <div className="text-[10px] font-mono text-ivory-muted uppercase">Năng lượng liên kết (E_b)</div>
              <div className="text-base font-black font-mono text-emerald-300">
                {bindingEnergyData.eb.toFixed(1)}
              </div>
              <div className="text-[10px] font-mono text-ivory-muted">MeV (Δm × 931.5)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-center">
              <div className="text-[10px] font-mono text-ivory-muted uppercase">Năng lượng liên kết riêng</div>
              <div className="text-base font-black font-mono text-cyan-400">
                {bindingEnergyData.ebPerNucleon.toFixed(3)}
              </div>
              <div className="text-[10px] font-mono text-ivory-muted">MeV / nuclon (E_b / A)</div>
            </div>
          </div>

          {/* Benchmark Stability Curve Explanation */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              Quy luật bền vững của đường cong năng lượng liên kết riêng (E_b / A):
            </span>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-1">
              <p>
                • <strong>Đỉnh bền vững cực đại:</strong> Nằm ở các hạt nhân trung bình với số khối A từ 50 đến 70 (tiêu biểu là Sắt <strong>⁵⁶₂₆Fe</strong> đạt 8.79 MeV/nuclon và Niken <strong>⁶²₂₈Ni</strong> đạt 8.80 MeV/nuclon).
              </p>
              <p>
                • <strong>Phản ứng Nhiệt hạch (Fusion):</strong> Khi ghép hai hạt nhân rất nhẹ (như ²H + ³H tạo ⁴He) lại với nhau, năng lượng liên kết riêng tăng vọt, giải phóng năng lượng khổng lồ.
              </p>
              <p>
                • <strong>Phản ứng Phân hạch (Fission):</strong> Khi bẻ vỡ một hạt nhân rất nặng (như ²³⁵U) thành hai mảnh trung bình, năng lượng liên kết riêng của các mảnh cao hơn, giải phóng khoảng 200 MeV năng lượng hạt nhân.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RADIATION SHIELDING & PENETRATION */}
      {activeTab === 'SHIELDING' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-purple-200">
                Khả Năng Đâm Xuyên & Tấm Chắn An Toàn Phóng Xạ
              </h3>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Các loại tia phóng xạ có bản chất vật lý khác nhau: Alpha (hạt nhân ⁴₂He²⁺), Beta (electron/positron năng lượng cao) và Gamma (sóng điện từ photon bước sóng cực ngắn), dẫn tới khả năng đâm xuyên và yêu cầu che chắn hoàn toàn khác nhau.
            </p>
          </div>

          {/* Shielding Schematic SVG */}
          <svg viewBox="0 0 500 200" className="w-full h-auto bg-black/50 rounded-xl border border-white/10 p-3">
            {/* Radiation Source */}
            <rect x="20" y="30" width="30" height="140" fill="#334155" rx="4" />
            <text x="35" y="105" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 35 105)">
              NGUỒN PHÓNG XẠ
            </text>

            {/* Shield 1: Paper */}
            <rect x="150" y="20" width="8" height="160" fill="#e2e8f0" rx="1" />
            <text x="154" y="192" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Tờ Giấy
            </text>

            {/* Shield 2: Aluminum */}
            <rect x="280" y="20" width="16" height="160" fill="#94a3b8" rx="2" />
            <text x="288" y="192" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Nhôm (vài mm)
            </text>

            {/* Shield 3: Lead / Concrete */}
            <rect x="420" y="20" width="35" height="160" fill="#475569" rx="3" />
            <text x="437" y="192" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Chì / Bê tông dày
            </text>

            {/* Alpha Beam */}
            <g>
              <line x1="50" y1="55" x2="150" y2="55" stroke="#ef4444" strokeWidth="3" />
              <polygon points="145,51 153,55 145,59" fill="#ef4444" />
              <text x="60" y="48" fill="#ef4444" fontSize="10" fontWeight="bold">Tia Alpha (α) — Dừng lại ở mặt giấy</text>
            </g>

            {/* Beta Beam */}
            <g>
              <line x1="50" y1="100" x2="280" y2="100" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="275,96 283,100 275,104" fill="#06b6d4" />
              <text x="60" y="93" fill="#06b6d4" fontSize="10" fontWeight="bold">Tia Beta (β⁻, β⁺) — Xuyên qua giấy, dừng lại ở nhôm</text>
            </g>

            {/* Gamma Beam */}
            <g>
              <path
                d="M 50 145 Q 70 138, 90 145 T 130 145 T 170 145 T 210 145 T 250 145 T 290 145 T 330 145 T 370 145 T 410 145 L 435 145"
                fill="none"
                stroke="#eab308"
                strokeWidth="2.5"
              />
              <polygon points="430,141 438,145 430,149" fill="#eab308" />
              <text x="60" y="138" fill="#eab308" fontSize="10" fontWeight="bold">Tia Gamma (γ) — Xuyên sâu, chỉ bị suy giảm bởi chì dày</text>
            </g>
          </svg>

          {/* Shielding details for current isotope */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-ivory-muted">
              Yêu cầu che chắn đối với <strong className="text-white">{isotope.parentNuclide.symbol} ({isotope.nameVI})</strong>:
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/50 text-purple-300">
              {isotope.shieldingRequired === 'PAPER_SKIN' && 'Chặn được bằng giấy hoặc lớp da ngoài'}
              {isotope.shieldingRequired === 'ALUMINUM_SHEET' && 'Cần tấm nhôm dày vài milimet'}
              {isotope.shieldingRequired === 'LEAD_CONCRETE' && 'Bắt buộc dùng chì hoặc tường bê tông dày'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
