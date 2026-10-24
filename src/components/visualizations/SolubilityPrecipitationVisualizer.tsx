// src/components/visualizations/SolubilityPrecipitationVisualizer.tsx
// Interactive Solubility Product Constant (K_sp), Precipitation Equilibrium & Amphoteric Re-dissolution Visualizer
// Calibrated strictly to Vietnam GDPT 2018 Chemistry & IUPAC Physical Chemistry

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  RotateCcw,
  BookOpen,
  Zap,
  Info,
  Droplets,
  FlaskConical,
  Activity,
  CheckCircle2,
  Compass,
  Sliders,
  Shield,
  Filter
} from 'lucide-react';
import {
  CURRICULUM_SPARINGLY_SOLUBLE_SALTS,
  SparinglySolubleSalt,
  SolubilityEngine
} from '../../domain/solubilityEngine';
import { sound } from '../../audio/soundEngine';

export interface SolubilityPrecipitationVisualizerProps {
  initialSaltId?: string;
  className?: string;
}

export const SolubilityPrecipitationVisualizer: React.FC<SolubilityPrecipitationVisualizerProps> = ({
  initialSaltId = 'salt_agcl',
  className = ''
}) => {
  const [selectedSaltId, setSelectedSaltId] = useState<string>(initialSaltId);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'COMMON_ION' | 'FRACTIONAL' | 'AMPHOTERIC' | 'TACTICAL'>('SIMULATION');

  // Simulation Parameters
  const [cationConcM, setCationConcM] = useState<number>(0.05); // 0.05 M
  const [anionConcM, setAnionConcM] = useState<number>(0.05); // 0.05 M
  const [solutionVolumeL, setSolutionVolumeL] = useState<number>(0.1); // 100 mL

  // Common-Ion Effect Parameters
  const [commonIonType, setCommonIonType] = useState<'CATION' | 'ANION'>('ANION');
  const [addedCommonIonM, setAddedCommonIonM] = useState<number>(0.1); // 0.1 M added common ion

  // Fractional Precipitation Parameters
  const [agAddedMmol, setAgAddedMmol] = useState<number>(1.5); // 1.5 mmol Ag+

  // Amphoteric Re-dissolution Parameters
  const [selectedAmphoteric, setSelectedAmphoteric] = useState<'ALUMINUM' | 'ZINC'>('ALUMINUM');
  const [addedOhConcM, setAddedOhConcM] = useState<number>(0.15); // 0.15 M OH-

  // Active salt definition
  const currentSalt = useMemo<SparinglySolubleSalt>(() => {
    return (
      CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === selectedSaltId) ||
      CURRICULUM_SPARINGLY_SOLUBLE_SALTS[0]
    );
  }, [selectedSaltId]);

  // Pure water equilibrium solubility
  const pureWaterSolubility = useMemo(() => {
    return SolubilityEngine.calculateSolubilityInPureWater(currentSalt);
  }, [currentSalt]);

  // Precipitation condition calculation
  const pptCondition = useMemo(() => {
    return SolubilityEngine.evaluatePrecipitationCondition(
      currentSalt,
      cationConcM,
      anionConcM,
      solutionVolumeL
    );
  }, [currentSalt, cationConcM, anionConcM, solutionVolumeL]);

  // Common-ion effect calculation
  const commonIonResult = useMemo(() => {
    return SolubilityEngine.calculateSolubilityWithCommonIon(
      currentSalt,
      commonIonType,
      addedCommonIonM
    );
  }, [currentSalt, commonIonType, addedCommonIonM]);

  // Fractional precipitation simulation result
  const fractionalResult = useMemo(() => {
    return SolubilityEngine.simulateFractionalPrecipitation(
      { Cl_M: 0.02, Br_M: 0.02, I_M: 0.02 },
      agAddedMmol / 1000,
      0.1
    );
  }, [agAddedMmol]);

  // Amphoteric dissolution simulation result
  const amphotericResult = useMemo(() => {
    return SolubilityEngine.simulateAmphotericDissolution(
      selectedAmphoteric,
      0.05,
      addedOhConcM,
      0.1
    );
  }, [selectedAmphoteric, addedOhConcM]);

  const handleSelectSalt = (id: string) => {
    setSelectedSaltId(id);
    setCationConcM(0.05);
    setAnionConcM(0.05);
    setAddedCommonIonM(0.1);
    sound.playUiClick();
  };

  const handleResetParameters = () => {
    setCationConcM(0.05);
    setAnionConcM(0.05);
    setAddedCommonIonM(0.1);
    setAgAddedMmol(1.5);
    setAddedOhConcM(0.15);
    sound.playUiClick();
  };

  // Sound triggers when conditions change
  const handleCationChange = (val: number) => {
    setCationConcM(val);
    if (val * anionConcM > currentSalt.ksp) {
      sound.playPrecipitationNucleation();
    }
  };

  const handleAnionChange = (val: number) => {
    setAnionConcM(val);
    if (val * cationConcM > currentSalt.ksp) {
      sound.playPrecipitationNucleation();
    }
  };

  const handleOhChange = (val: number) => {
    setAddedOhConcM(val);
    if (val >= (selectedAmphoteric === 'ALUMINUM' ? 0.20 : 0.20)) {
      sound.playAmphotericDissolution();
    } else {
      sound.playPrecipitationNucleation();
    }
  };

  return (
    <div className={`w-full bg-navy/90 border border-cyan-ion/40 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-5 text-ivory ${className}`}>
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-light/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-600 to-blue-700 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-ion/20">
            <Droplets className="w-6 h-6 text-obsidian" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wide">
                MÔ PHỎNG TÍCH SỐ TAN (K_sp), KẾT TỦA & TÍNH LƯỠNG TÍNH
              </h2>
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/50 font-mono text-[10px] font-bold">
                GDPT 2018 Hóa 10, 11 & 12
              </span>
            </div>
            <p className="text-xs text-ivory-muted">
              Cân bằng dung dịch muối ít tan, mầm tinh thể, hiệu ứng ion chung, kết tủa phân đoạn và sự tái hòa tan của Al(OH)₃ / Zn(OH)₂
            </p>
          </div>
        </div>

        <button
          onClick={handleResetParameters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy/80 hover:bg-navy border border-navy-light/60 text-xs font-mono text-ivory-muted hover:text-ivory transition-all self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại chuẩn</span>
        </button>
      </div>

      {/* Salt Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {CURRICULUM_SPARINGLY_SOLUBLE_SALTS.map(salt => {
          const isSelected = selectedSaltId === salt.id;
          return (
            <button
              key={salt.id}
              onClick={() => handleSelectSalt(salt.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-ion text-obsidian border-cyan-ion shadow-md shadow-cyan-ion/25 font-bold scale-105'
                  : 'bg-obsidian/60 text-ivory-muted border-navy-light/50 hover:bg-navy-light/60 hover:text-ivory'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: salt.colorHex }} />
              <span className="font-bold">{salt.formula}</span>
              <span className="text-[10px] opacity-75">
                (K_sp ≈ {salt.ksp.toExponential(1)})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Layout: Beaker Canvas (Left) + Interactive Analytical Console (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Glass Beaker & Precipitation SVG Animation (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-obsidian/85 border border-navy-light/70 p-4 flex flex-col items-center justify-between relative overflow-hidden min-h-[380px]">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Title Badge */}
          <div className="w-full flex items-center justify-between z-10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-navy/90 text-cyan-ion border border-cyan-ion/40 font-bold flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-ion" />
                {activeTab === 'FRACTIONAL'
                  ? 'Kết tủa phân đoạn (AgI, AgBr, AgCl)'
                  : activeTab === 'AMPHOTERIC'
                  ? `${selectedAmphoteric === 'ALUMINUM' ? 'Al(OH)₃' : 'Zn(OH)₂'} Lưỡng tính`
                  : `${currentSalt.formula} • ${currentSalt.name_vi}`}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeTab === 'FRACTIONAL'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : activeTab === 'AMPHOTERIC'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : pptCondition.state === 'SUPERSATURATED'
                  ? 'bg-coral-reaction/20 text-coral-reaction border border-coral-reaction/50'
                  : pptCondition.state === 'SATURATED'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              }`}>
                {activeTab === 'FRACTIONAL'
                  ? `Đang tạo: ${fractionalResult.activePrecipitatingIon}`
                  : activeTab === 'AMPHOTERIC'
                  ? amphotericResult.stageStateVI
                  : pptCondition.state === 'SUPERSATURATED'
                  ? 'QUÁ BÃO HÒA (KẾT TỦA)'
                  : pptCondition.state === 'SATURATED'
                  ? 'ĐẠT BÃO HÒA'
                  : 'CHƯA BÃO HÒA (TAN HOÀN TOÀN)'}
              </span>
            </div>
          </div>

          {/* Glass Beaker SVG */}
          <div className="w-full flex-1 flex items-center justify-center select-none relative my-2">
            <svg viewBox="0 0 320 250" className="w-full max-w-[460px] h-auto overflow-visible">
              <defs>
                <filter id="pptGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Solution Fluid Gradient */}
                <linearGradient id="beakerFluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
                </linearGradient>

                {/* Dynamic Precipitate Sediment Gradient */}
                <linearGradient id="sedimentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={currentSalt.colorHex} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={currentSalt.colorHex} stopOpacity="0.65" />
                </linearGradient>
              </defs>

              {/* Beaker Glass Body */}
              {/* Spout */}
              <path d="M 52 40 L 40 32 L 52 35" fill="none" stroke="#67e8f9" strokeWidth="2.5" opacity="0.7" />
              {/* Main Walls and Curved Bottom */}
              <path
                d="M 52 35 L 52 215 Q 52 230 70 230 L 250 230 Q 268 230 268 215 L 268 35"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2.5"
                opacity="0.8"
                filter="url(#pptGlow)"
              />

              {/* Volume Graduations */}
              <line x1="52" y1="180" x2="68" y2="180" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6" />
              <text x="73" y="183" fill="#67e8f9" fontSize="8" fontFamily="monospace" opacity="0.8">50 mL</text>

              <line x1="52" y1="130" x2="72" y2="130" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6" />
              <text x="77" y="133" fill="#67e8f9" fontSize="8" fontFamily="monospace" opacity="0.8">100 mL</text>

              <line x1="52" y1="80" x2="68" y2="80" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6" />
              <text x="73" y="83" fill="#67e8f9" fontSize="8" fontFamily="monospace" opacity="0.8">150 mL</text>

              {/* Solution Liquid Body */}
              <path
                d="M 54 85 Q 160 80 266 85 L 266 215 Q 266 228 250 228 L 70 228 Q 54 228 54 215 Z"
                fill="url(#beakerFluidGrad)"
              />

              {/* Meniscus Ripple */}
              <path
                d="M 54 85 Q 160 80 266 85"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                opacity="0.75"
              />

              {/* Floating Free Solvated Ions in Solution */}
              <g>
                {/* Cations */}
                <g transform="translate(100, 120)">
                  <circle r="12" fill="#0f172a" stroke="#f87171" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#fca5a5" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.cation.label}
                  </text>
                </g>
                <g transform="translate(210, 110)">
                  <circle r="12" fill="#0f172a" stroke="#f87171" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#fca5a5" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.cation.label}
                  </text>
                </g>
                <g transform="translate(155, 145)">
                  <circle r="12" fill="#0f172a" stroke="#f87171" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#fca5a5" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.cation.label}
                  </text>
                </g>

                {/* Anions */}
                <g transform="translate(170, 115)">
                  <circle r="13" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#7dd3fc" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.anion.label}
                  </text>
                </g>
                <g transform="translate(120, 160)">
                  <circle r="13" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#7dd3fc" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.anion.label}
                  </text>
                </g>
                <g transform="translate(230, 155)">
                  <circle r="13" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" filter="url(#pptGlow)" />
                  <text textAnchor="middle" dy="4" fill="#7dd3fc" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    {currentSalt.anion.label}
                  </text>
                </g>
              </g>

              {/* RENDER PRECIPITATE AT BOTTOM ACCORDING TO ACTIVE TAB */}
              {activeTab === 'FRACTIONAL' ? (
                // Multi-phase Fractional Precipitation Sediment (AgI on bottom, AgBr middle, AgCl top)
                <g>
                  {fractionalResult.precipitatedPhases[0].precipitatedMassMg > 0 && (
                    // AgI (Yellow) bottom
                    <path d="M 55 228 Q 160 215 265 228 Z" fill="#FACC15" opacity="0.9" filter="url(#pptGlow)" />
                  )}
                  {fractionalResult.precipitatedPhases[1].precipitatedMassMg > 0 && (
                    // AgBr (Cream) middle
                    <path d="M 55 220 Q 160 208 265 220 L 265 225 Q 160 215 55 225 Z" fill="#FEF08A" opacity="0.9" />
                  )}
                  {fractionalResult.precipitatedPhases[2].precipitatedMassMg > 0 && (
                    // AgCl (White) top
                    <path d="M 55 212 Q 160 200 265 212 L 265 218 Q 160 206 55 218 Z" fill="#F8FAFC" opacity="0.95" />
                  )}
                  <text x="160" y="242" textAnchor="middle" fill="#f8fafc" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    Lớp trầm tích phân đoạn: AgI (Vàng) → AgBr (Nhạt) → AgCl (Trắng)
                  </text>
                </g>
              ) : activeTab === 'AMPHOTERIC' ? (
                // Amphoteric Al/Zn Re-dissolution (mass increases then disappears into complex)
                amphotericResult.isPrecipitatePresent ? (
                  <g>
                    <path
                      d={`M 55 228 Q 160 ${228 - Math.min(35, amphotericResult.precipitateMassMg * 0.12)} 265 228 Z`}
                      fill="#E2E8F0"
                      opacity="0.85"
                      filter="url(#pptGlow)"
                    />
                    <text x="160" y="242" textAnchor="middle" fill="#e2e8f0" fontFamily="monospace" fontSize="9" fontWeight="bold">
                      {selectedAmphoteric === 'ALUMINUM' ? 'Al(OH)₃↓ keo trắng' : 'Zn(OH)₂↓ keo trắng'} ({amphotericResult.precipitateMassMg} mg)
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Clear transparent complex solution with glowing dissolved complex ions */}
                    <circle cx="160" cy="140" r="18" fill="#a855f7" fillOpacity="0.2" stroke="#c084fc" strokeWidth="2" filter="url(#pptGlow)" />
                    <text x="160" y="144" textAnchor="middle" fill="#f3e8ff" fontFamily="monospace" fontSize="9" fontWeight="bold">
                      {selectedAmphoteric === 'ALUMINUM' ? '[Al(OH)₄]⁻' : '[Zn(OH)₄]²⁻'}
                    </text>
                    <text x="160" y="242" textAnchor="middle" fill="#c084fc" fontFamily="monospace" fontSize="9" fontWeight="bold">
                      Dung dịch trong suốt: Phức chất tan hoàn toàn!
                    </text>
                  </g>
                )
              ) : (
                // Standard Precipitation (Q_sp vs K_sp)
                pptCondition.precipitateMassMg > 0 ? (
                  <g>
                    {/* Downward settling arrows */}
                    <line x1="160" y1="165" x2="160" y2="185" stroke={currentSalt.colorHex} strokeWidth="2" strokeDasharray="3 2" />
                    <polygon points="160,190 156,182 164,182" fill={currentSalt.colorHex} />

                    {/* Settled Sediment at Bottom */}
                    <path
                      d={`M 55 228 Q 160 ${228 - Math.min(40, pptCondition.precipitateMassMg * 0.08 + 12)} 265 228 Z`}
                      fill="url(#sedimentGrad)"
                      filter="url(#pptGlow)"
                    />

                    {/* Crystalline facets on top of sediment */}
                    <polygon points="135,212 142,202 150,212" fill={currentSalt.colorHex} opacity="0.9" />
                    <polygon points="152,210 160,198 168,210" fill={currentSalt.colorHex} opacity="0.9" />
                    <polygon points="170,212 178,204 186,212" fill={currentSalt.colorHex} opacity="0.9" />

                    <text x="160" y="242" textAnchor="middle" fill={currentSalt.colorHex} fontFamily="monospace" fontSize="9" fontWeight="bold">
                      {currentSalt.formula}↓ ({pptCondition.precipitateMassMg} mg • {pptCondition.percentPrecipitated}%)
                    </text>
                  </g>
                ) : (
                  <text x="160" y="242" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="9">
                    Không có kết tủa (Q_sp &lt; K_sp) • Dung dịch trong suốt
                  </text>
                )
              )}
            </svg>
          </div>

          {/* Bottom Diagnostic Bar */}
          <div className="w-full bg-navy/80 border border-navy-light/60 rounded-xl p-3 flex flex-col gap-2 z-10 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-ivory-muted">Tích số tan cân bằng:</span>
              <span className="text-cyan-300 font-bold">K_sp = {currentSalt.ksp.toExponential(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ivory-muted">Độ tan trong nước cất:</span>
              <span className="text-emerald-400 font-bold">
                s = {pureWaterSolubility.molarSolubilityM.toExponential(2)} M ({pureWaterSolubility.massSolubilityMgPerL.toFixed(2)} mg/L)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Interactive Analytical Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Navigation Subtabs */}
          <div className="flex items-center gap-1 bg-obsidian/70 p-1 rounded-xl border border-navy-light/50">
            <button
              onClick={() => {
                setActiveTab('SIMULATION');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'SIMULATION'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Q_sp & K_sp
            </button>
            <button
              onClick={() => {
                setActiveTab('COMMON_ION');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'COMMON_ION'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Ion Chung
            </button>
            <button
              onClick={() => {
                setActiveTab('FRACTIONAL');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'FRACTIONAL'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Phân Đoạn
            </button>
            <button
              onClick={() => {
                setActiveTab('AMPHOTERIC');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'AMPHOTERIC'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Lưỡng Tính
            </button>
            <button
              onClick={() => {
                setActiveTab('TACTICAL');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'TACTICAL'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Chiến Thuật
            </button>
          </div>

          {/* TAB 1: SIMULATION (Q_sp vs K_sp Điều Kiện Kết Tủa) */}
          {activeTab === 'SIMULATION' && (
            <div className="flex flex-col gap-3">
              {/* Sliders */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/40 flex flex-col gap-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ivory-muted">Nồng độ cation [{currentSalt.cation.label}]:</span>
                    <span className="text-red-400 font-bold">{cationConcM.toFixed(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min={0.001}
                    max={0.20}
                    step={0.005}
                    value={cationConcM}
                    onChange={e => handleCationChange(parseFloat(e.target.value))}
                    className="w-full accent-red-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ivory-muted">Nồng độ anion [{currentSalt.anion.label}]:</span>
                    <span className="text-cyan-400 font-bold">{anionConcM.toFixed(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min={0.001}
                    max={0.20}
                    step={0.005}
                    value={anionConcM}
                    onChange={e => handleAnionChange(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-navy-light/40 pt-2 text-[11px]">
                  <span>Thể tích dung dịch:</span>
                  <span className="text-ivory font-bold">{solutionVolumeL * 1000} mL</span>
                </div>
              </div>

              {/* Quotient Q_sp Comparison Card */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ivory font-bold">TÍCH NỒNG ĐỘ ION (Q_sp):</span>
                  <span className="text-amber-400 font-extrabold text-sm">{pptCondition.qSp.toExponential(2)}</span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted border-t border-navy-light/40 pt-1.5">
                  <span>Tích số tan (K_sp):</span>
                  <span className="text-cyan-300 font-bold">{pptCondition.kSp.toExponential(2)}</span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted">
                  <span>Tỉ số log₁₀(Q_sp / K_sp):</span>
                  <span className={pptCondition.logRatio > 0 ? 'text-coral-reaction font-bold' : 'text-emerald-400 font-bold'}>
                    {pptCondition.logRatio > 0 ? `+${pptCondition.logRatio}` : pptCondition.logRatio}
                  </span>
                </div>
              </div>

              {/* Explanation Note */}
              <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 text-xs">
                <span className="font-mono font-bold text-cyan-ion block mb-1">KẾT LUẬN ĐỘC ĐOÁN:</span>
                <p className="text-ivory-muted leading-relaxed">
                  {pptCondition.explanationVI}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: COMMON_ION (Hiệu Ứng Ion Chung Le Chatelier) */}
          {activeTab === 'COMMON_ION' && (
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/40 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ivory">CHỌN ION CHUNG BỔ SUNG:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCommonIonType('ANION')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        commonIonType === 'ANION' ? 'bg-cyan-ion text-obsidian' : 'bg-navy text-ivory-muted'
                      }`}
                    >
                      {currentSalt.anion.label}
                    </button>
                    <button
                      onClick={() => setCommonIonType('CATION')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        commonIonType === 'CATION' ? 'bg-red-400 text-obsidian' : 'bg-navy text-ivory-muted'
                      }`}
                    >
                      {currentSalt.cation.label}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ivory-muted">Nồng độ ion chung thêm vào:</span>
                    <span className="text-amber-400 font-bold">{addedCommonIonM.toFixed(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min={0.001}
                    max={0.50}
                    step={0.01}
                    value={addedCommonIonM}
                    onChange={e => setAddedCommonIonM(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
                  />
                </div>
              </div>

              {/* Suppression Result Card */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-ivory font-bold">ĐỘ TAN CÒN LẠI (s):</span>
                  <span className="text-amber-400 font-extrabold">{commonIonResult.molarSolubilityM.toExponential(2)} M</span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted border-t border-navy-light/40 pt-1.5">
                  <span>Hệ số giảm độ tan:</span>
                  <span className="text-coral-reaction font-bold">Giảm {commonIonResult.suppressionRatio.toLocaleString()} lần!</span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted">
                  <span>Độ tan khối lượng:</span>
                  <span className="text-ivory">{commonIonResult.massSolubilityMgPerL.toFixed(4)} mg/L</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <p className="text-ivory-muted leading-relaxed font-sans text-xs">
                  {commonIonResult.explanationVI}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: FRACTIONAL (Kết Tủa Phân Đoạn AgI -> AgBr -> AgCl) */}
          {activeTab === 'FRACTIONAL' && (
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/40 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-ivory font-bold">LƯỢNG Ag⁺ NHỎ VÀO TỪ BURETTE:</span>
                  <span className="text-cyan-ion font-black text-sm">{agAddedMmol.toFixed(2)} mmol</span>
                </div>
                <input
                  type="range"
                  min={0.0}
                  max={5.0}
                  step={0.1}
                  value={agAddedMmol}
                  onChange={e => setAgAddedMmol(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-navy-light rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-ivory-muted">
                  <span>0 mmol (Bắt đầu)</span>
                  <span>2 mmol (Hết I⁻)</span>
                  <span>4 mmol (Hết Br⁻)</span>
                  <span>5 mmol (Hết Cl⁻)</span>
                </div>
              </div>

              {/* Fractional Status Grid */}
              <div className="grid grid-cols-3 gap-2">
                {fractionalResult.precipitatedPhases.map(phase => (
                  <div key={phase.halide} className="p-2.5 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col items-center text-center gap-1">
                    <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: phase.color }} />
                    <span className="font-bold text-ivory">{phase.formula}</span>
                    <span className="text-[10px] text-ivory-muted">{phase.precipitatedMassMg} mg</span>
                    <span className="text-[9px] text-cyan-300">Còn lại: {(phase.remainingM * 1000).toFixed(1)} mM</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <span className="font-bold text-amber-300 block mb-1">QUY LUẬT TÁCH ĐỊNH LƯỢNG:</span>
                <p className="text-ivory-muted leading-relaxed font-sans text-xs">
                  {fractionalResult.stageDescriptionVI}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: AMPHOTERIC (Tái Hòa Tan Al(OH)3 & Zn(OH)2 Trong Kiềm Dư) */}
          {activeTab === 'AMPHOTERIC' && (
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-obsidian/80 border border-purple-500/40 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ivory">CHỌN KIM LOẠI LƯỠNG TÍNH:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSelectedAmphoteric('ALUMINUM')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        selectedAmphoteric === 'ALUMINUM' ? 'bg-purple-500 text-white' : 'bg-navy text-ivory-muted'
                      }`}
                    >
                      Nhôm (Al³⁺)
                    </button>
                    <button
                      onClick={() => setSelectedAmphoteric('ZINC')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        selectedAmphoteric === 'ZINC' ? 'bg-purple-500 text-white' : 'bg-navy text-ivory-muted'
                      }`}
                    >
                      Kẽm (Zn²⁺)
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ivory-muted">Nồng độ dung dịch kiềm OH⁻ nhỏ vào:</span>
                    <span className="text-purple-300 font-bold">{addedOhConcM.toFixed(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={0.30}
                    step={0.005}
                    value={addedOhConcM}
                    onChange={e => handleOhChange(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-2 bg-navy-light rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted mt-1">
                    <span>0 M (Chưa kiềm)</span>
                    <span className="text-coral-reaction">0.15 M (Cực đại kết tủa)</span>
                    <span className="text-purple-300">≥ 0.20 M (Tan thành phức)</span>
                  </div>
                </div>
              </div>

              {/* Amphoteric Metrics */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-ivory font-bold">KHỐI LƯỢNG KẾT TỦA KEO:</span>
                  <span className="text-purple-300 font-extrabold text-sm">{amphotericResult.precipitateMassMg} mg</span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted border-t border-navy-light/40 pt-1.5">
                  <span>Trạng thái dung dịch:</span>
                  <span className={amphotericResult.isPrecipitatePresent ? 'text-coral-reaction font-bold' : 'text-emerald-400 font-bold'}>
                    {amphotericResult.stageStateVI}
                  </span>
                </div>
                <div className="flex items-center justify-between text-ivory-muted">
                  <span>Phức chất tan hình thành:</span>
                  <span className="text-ivory font-bold">
                    {selectedAmphoteric === 'ALUMINUM' ? '[Al(OH)₄]⁻' : '[Zn(OH)₄]²⁻'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <p className="text-ivory-muted leading-relaxed font-sans text-xs">
                  {amphotericResult.explanationVI}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: TACTICAL (Bùa Lợi Đấu Trường) */}
          {activeTab === 'TACTICAL' && (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-teal-500/40 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span className="font-mono text-xs font-bold text-teal-300 uppercase">
                    BÙA LỢI CHIẾN THUẬT KẾT TỦA ELEMENTA
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  {currentSalt.tacticalBuff.nameVI}
                </h4>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  {currentSalt.tacticalBuff.descriptionVI}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-mono border-t border-teal-500/20 pt-2 text-teal-300">
                  <span>Hệ số chiến thuật: +{currentSalt.tacticalBuff.power}</span>
                  <span>Độ bền: {currentSalt.solubilityInAcidVI.slice(0, 32)}...</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian/70 border border-navy-light/60 text-xs">
                <div className="font-mono font-bold text-cyan-ion mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ỨNG DỤNG TÁC CHIẾN TCG & MOBA:</span>
                </div>
                <p className="text-ivory-muted leading-relaxed">
                  Các phản ứng kết tủa ($BaSO_4, CaCO_3$) tạo rào chắn cứng ngăn đường đạn, trong khi các mầm tinh thể ($AgI$) tạo vùng làm chậm diện rộng, và kết tủa lưỡng tính ($Al(OH)_3$) có thể chuyển đổi linh hoạt giữa Khiên bảo hộ và Năng lượng phép!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
