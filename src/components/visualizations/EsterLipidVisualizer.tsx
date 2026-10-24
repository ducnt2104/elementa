// src/components/visualizations/EsterLipidVisualizer.tsx
// Interactive Fischer Esterification, Lipid Saponification & Soap Salting-Out Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Este - Lipit - Xà Phòng) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Sparkles,
  Droplets,
  Layers,
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Thermometer,
  Feather,
  Wind,
  Shield
} from 'lucide-react';
import {
  ESTERS_CATALOG,
  TRIGLYCERIDES_CATALOG,
  EsterAromaDef,
  TriglycerideDef,
  calculateFischerEsterificationYield,
  calculateSaponification,
  simulateSoapSaltingOut,
  EsterificationEquilibriumResult,
  SaponificationResult,
  SaltingOutResult
} from '../../domain/esterLipidEngine';
import { sound } from '../../audio/soundEngine';

export interface EsterLipidVisualizerProps {
  initialMode?: 'FISCHER_ESTERIFICATION' | 'LIPID_SAPONIFICATION' | 'SALTING_OUT';
  className?: string;
}

export const EsterLipidVisualizer: React.FC<EsterLipidVisualizerProps> = ({
  initialMode = 'FISCHER_ESTERIFICATION',
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'FISCHER_ESTERIFICATION' | 'LIPID_SAPONIFICATION' | 'SALTING_OUT'>(initialMode);

  // 1. Fischer Esterification State
  const [selectedEsterId, setSelectedEsterId] = useState<string>(ESTERS_CATALOG[0].id);
  const [acidMoles, setAcidMoles] = useState<number>(1.0);
  const [alcoholMoles, setAlcoholMoles] = useState<number>(1.0);
  const [useDehydratingAgent, setUseDehydratingAgent] = useState<boolean>(true);

  // 2. Saponification State
  const [selectedLipidId, setSelectedLipidId] = useState<string>(TRIGLYCERIDES_CATALOG[0].id);
  const [lipidMassGrams, setLipidMassGrams] = useState<number>(88.5);
  const [naohConcM, setNaohConcM] = useState<number>(1.0);

  // 3. Salting Out State
  const [soapMassInput, setSoapMassInput] = useState<number>(50.0);
  const [waterVolumeInput, setWaterVolumeInput] = useState<number>(200.0);
  const [addedNaclGrams, setAddedNaclGrams] = useState<number>(35.0);

  // Selected ester item
  const currentEster = useMemo<EsterAromaDef>(() => {
    return ESTERS_CATALOG.find(e => e.id === selectedEsterId) || ESTERS_CATALOG[0];
  }, [selectedEsterId]);

  // Selected lipid item
  const currentLipid = useMemo<TriglycerideDef>(() => {
    return TRIGLYCERIDES_CATALOG.find(l => l.id === selectedLipidId) || TRIGLYCERIDES_CATALOG[0];
  }, [selectedLipidId]);

  // Calculations
  const esterResult = useMemo<EsterificationEquilibriumResult>(() => {
    return calculateFischerEsterificationYield({
      initialAcidMoles: acidMoles,
      initialAlcoholMoles: alcoholMoles,
      equilibriumConstantKc: 4.0,
      dehydratingAgentUsed: useDehydratingAgent
    });
  }, [acidMoles, alcoholMoles, useDehydratingAgent]);

  const saponificationResult = useMemo<SaponificationResult>(() => {
    return calculateSaponification({
      triglycerideId: selectedLipidId,
      lipidMassGrams,
      naohConcentrationM: naohConcM
    });
  }, [selectedLipidId, lipidMassGrams, naohConcM]);

  const saltingOutResult = useMemo<SaltingOutResult>(() => {
    return simulateSoapSaltingOut({
      soapMassGrams: soapMassInput,
      waterVolumeMl: waterVolumeInput,
      addedNaclGrams
    });
  }, [soapMassInput, waterVolumeInput, addedNaclGrams]);

  const handleModeChange = (mode: 'FISCHER_ESTERIFICATION' | 'LIPID_SAPONIFICATION' | 'SALTING_OUT') => {
    setActiveMode(mode);
    sound.playUiClick();
  };

  const handleResetEster = () => {
    setAcidMoles(1.0);
    setAlcoholMoles(1.0);
    setUseDehydratingAgent(true);
    sound.playUiClick();
  };

  const handleResetLipid = () => {
    setLipidMassGrams(88.5);
    setNaohConcM(1.0);
    sound.playUiClick();
  };

  const handleResetSaltingOut = () => {
    setSoapMassInput(50.0);
    setWaterVolumeInput(200.0);
    setAddedNaclGrams(35.0);
    sound.playUiClick();
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Chuyên Đề Este - Lipit - Xà Phòng Hóa
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                GDPT 2018 Lớp 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cân bằng este hóa Fischer · Thủy phân chất béo · Hiệu ứng muối kết xà phòng (Salting-out)
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => handleModeChange('FISCHER_ESTERIFICATION')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'FISCHER_ESTERIFICATION'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            1. Este Hóa Fischer
          </button>
          <button
            onClick={() => handleModeChange('LIPID_SAPONIFICATION')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'LIPID_SAPONIFICATION'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            2. Xà Phòng Hóa Lipit
          </button>
          <button
            onClick={() => handleModeChange('SALTING_OUT')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'SALTING_OUT'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3. Tách Muối (Salting-Out)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== MODE 1: FISCHER ESTERIFICATION ===================== */}
        {activeMode === 'FISCHER_ESTERIFICATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Scent Selector (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Scent Cards Picker */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Wind className="w-4 h-4" /> Danh Mục Este & Hương Liệu Tự Nhiên
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">5 Este Tiêu Biểu</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {ESTERS_CATALOG.map((ester) => {
                    const isSelected = ester.id === selectedEsterId;
                    return (
                      <button
                        key={ester.id}
                        onClick={() => {
                          setSelectedEsterId(ester.id);
                          sound.playUiClick();
                        }}
                        className={`text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            {ester.nameVI}
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                          </div>
                          <div className="text-[10px] text-slate-400 italic">
                            {ester.fragranceNoteVI}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                            {ester.formula}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reaction Slider Controls */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-amber-400" /> Điều Kiện Phản Ứng Fischer
                  </span>
                  <button
                    onClick={handleResetEster}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors"
                    title="Đặt lại thông số"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Acid Moles Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Số mol Axit ban đầu ({currentEster.acidPrecursorVI}):</span>
                    <span className="font-mono font-bold text-amber-300">{acidMoles.toFixed(2)} mol</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={acidMoles}
                    onChange={(e) => setAcidMoles(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Alcohol Moles Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Số mol Ancol ban đầu ({currentEster.alcoholPrecursorVI}):</span>
                    <span className="font-mono font-bold text-blue-300">{alcoholMoles.toFixed(2)} mol</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={alcoholMoles}
                    onChange={(e) => setAlcoholMoles(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Dehydrating Agent Toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Xúc tác H₂SO₄ đặc hút ẩm</div>
                    <div className="text-[10px] text-slate-400">Hút nước liên tục làm cân bằng chuyển dịch theo Le Chatelier</div>
                  </div>
                  <button
                    onClick={() => {
                      setUseDehydratingAgent(!useDehydratingAgent);
                      sound.playUiClick();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      useDehydratingAgent
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    {useDehydratingAgent ? 'Đang Hút Ẩm (Bật)' : 'Không Dùng (Tắt)'}
                  </button>
                </div>
              </div>

              {/* Chemical Identity Card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Feather className="w-4 h-4" /> Đặc Tính Lý Hóa: {currentEster.nameVI}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Tên IUPAC:</span>
                    <div className="font-mono font-semibold text-slate-200 truncate">{currentEster.nameIUPAC}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">CT cấu tạo:</span>
                    <div className="font-mono font-semibold text-slate-200 truncate">{currentEster.structuralFormula}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Nhiệt độ sôi:</span>
                    <div className="font-mono font-semibold text-amber-300">{currentEster.boilingPointC}°C</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Khối lượng riêng:</span>
                    <div className="font-mono font-semibold text-cyan-300">{currentEster.densityGml} g/mL (nhẹ hơn H₂O)</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 italic">
                  * {currentEster.curriculumContextVI}
                </div>
              </div>
            </div>

            {/* Right Reaction Chamber & Equilibrium Balance (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Dynamic Equilibrium Yield Banner */}
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900/60 p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Hiệu Suất Chuyển Hóa Cân Bằng (Conversion Yield)
                  </span>
                  <div className="text-3xl font-black text-amber-300 font-mono flex items-baseline gap-2">
                    {esterResult.conversionYieldPercent.toFixed(1)}%
                    <span className="text-xs font-normal text-slate-400">
                      ({esterResult.equilibriumEsterMoles} mol este sinh ra)
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    {useDehydratingAgent ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Le Chatelier: Tách nước đẩy hiệu suất vượt trần 66.7%!
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Giới hạn cân bằng thuận nghịch động (K_c = 4.0): Max 66.7%
                      </span>
                    )}
                  </div>
                </div>

                {/* Tactical RPG Perk */}
                <div className="hidden sm:block text-right p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 justify-end">
                    <Shield className="w-3.5 h-3.5" /> Nội Tại Tinh Dầu
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    +{Math.round(esterResult.conversionYieldPercent * 0.5)}% Thần Tốc
                  </div>
                  <div className="text-[9px] text-slate-400">Hương thơm tăng né tránh</div>
                </div>
              </div>

              {/* Graphical Equilibrium Vessel / Distillation SVG */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Beaker className="w-4 h-4 text-amber-400" /> Mô Phỏng Phân Lớp Ống Nghiệm Sau Este Hóa
                  </span>
                  <span className="text-slate-500 text-[10px] font-mono">
                    d_este &lt; d_dungdich =&gt; Nổi Lên Trên
                  </span>
                </div>

                {/* SVG Tube with Layers */}
                <div className="flex items-center justify-center p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <svg viewBox="0 0 400 160" className="w-full max-w-md h-36">
                    {/* Definitions */}
                    <defs>
                      <linearGradient id="esterLayerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="aqueousLayerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Test Tube Body */}
                    <rect x="140" y="20" width="120" height="110" rx="15" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    
                    {/* Lower Aqueous Layer (Acid dư + Ancol dư + H2SO4) */}
                    <rect x="142" y="85" width="116" height="43" rx="10" fill="url(#aqueousLayerGrad)" />
                    
                    {/* Upper Ester Layer (Floating) */}
                    <rect
                      x="142"
                      y={85 - Math.max(15, Math.min(45, esterResult.conversionYieldPercent * 0.45))}
                      width="116"
                      height={Math.max(15, Math.min(45, esterResult.conversionYieldPercent * 0.45))}
                      fill="url(#esterLayerGrad)"
                    />

                    {/* Meniscus division line */}
                    <line
                      x1="142"
                      y1="85"
                      x2="258"
                      y2="85"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />

                    {/* Text Annotations */}
                    <text x="270" y="65" fill="#fcd34d" fontSize="11" fontWeight="bold">
                      ▲ Lớp Este nhẹ hơn nổi lên ({currentEster.nameVI})
                    </text>
                    <text x="270" y="80" fill="#94a3b8" fontSize="9">
                      Mùi thơm hoa quả đậm đà, không tan trong nước
                    </text>

                    <text x="270" y="110" fill="#60a5fa" fontSize="11" fontWeight="bold">
                      ▼ Lớp dung dịch đáy (d &gt; 1.0)
                    </text>
                    <text x="270" y="125" fill="#94a3b8" fontSize="9">
                      Chứa H₂SO₄, axit dư ({esterResult.remainingAcidMoles} mol) &amp; ancol dư
                    </text>

                    {/* Bubble sparkles */}
                    <circle cx="170" cy="70" r="2" fill="#fef08a" opacity="0.8" />
                    <circle cx="210" cy="60" r="3" fill="#fef08a" opacity="0.6" />
                    <circle cx="190" cy="75" r="2" fill="#fef08a" opacity="0.9" />
                  </svg>
                </div>
              </div>

              {/* Step-by-Step Explanation Accordion */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-semibold text-xs text-amber-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Bản Chất Hóa Học &amp; Tiến Trình Phản Ứng (GDPT 2018)
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {esterResult.stepByStepExplanationVI.map((step, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950/50 border border-slate-800/80 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 2: LIPID SAPONIFICATION ===================== */}
        {activeMode === 'LIPID_SAPONIFICATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Lipid Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Lipid Picker */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4" /> Danh Mục Chất Béo Tiêu Biểu
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">4 Triglycerit</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {TRIGLYCERIDES_CATALOG.map((lipid) => {
                    const isSelected = lipid.id === selectedLipidId;
                    return (
                      <button
                        key={lipid.id}
                        onClick={() => {
                          setSelectedLipidId(lipid.id);
                          sound.playUiClick();
                        }}
                        className={`text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            {lipid.nameVI}
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                              lipid.physicalStateAt25C === 'LIQUID_OIL'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              {lipid.physicalStateAt25C === 'LIQUID_OIL' ? 'Dầu lỏng' : 'Mỡ rắn'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[240px]">
                            {lipid.originVI}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                            {lipid.molarMass} g/mol
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reaction Sliders */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-emerald-400" /> Thông Số Thủy Phân Kiềm
                  </span>
                  <button
                    onClick={handleResetLipid}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Lipid Mass Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Khối lượng chất béo ({currentLipid.nameVI}):</span>
                    <span className="font-mono font-bold text-emerald-300">{lipidMassGrams.toFixed(1)} g</span>
                  </div>
                  <input
                    type="range"
                    min="10.0"
                    max="500.0"
                    step="5.0"
                    value={lipidMassGrams}
                    onChange={(e) => setLipidMassGrams(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* NaOH Concentration Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Nồng độ dung dịch NaOH:</span>
                    <span className="font-mono font-bold text-cyan-300">{naohConcM.toFixed(1)} M</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.5"
                    value={naohConcM}
                    onChange={(e) => setNaohConcM(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  Thể tích dung dịch NaOH cần dùng: <span className="text-cyan-300 font-mono font-bold">{saponificationResult.naohVolumeMl} mL</span>
                </div>
              </div>

              {/* Lipid Chemistry Metrics */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Chỉ Số Hóa Học Quan Trọng
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Chỉ số xà phòng hóa:</span>
                    <div className="font-mono font-semibold text-emerald-300">{currentLipid.saponificationValue} mg KOH/g</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Chỉ số iod (độ không no):</span>
                    <div className="font-mono font-semibold text-amber-300">{currentLipid.iodineValue} g I₂/100g</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Nhiệt độ nóng chảy:</span>
                    <div className="font-mono font-semibold text-slate-200">{currentLipid.meltingPointC}°C</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-500">Axit béo cấu thành:</span>
                    <div className="font-mono font-semibold text-purple-300 truncate">{currentLipid.fattyAcidNameVI.split('(')[0]}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Saponification Stoichiometry & Mass Conservation (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Product Yields Banner */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/60 p-4 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Sản Phẩm Thủy Phân Xà Phòng Hóa
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Bảo toàn khối lượng: m_vào = m_ra
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase">Muối Xà Phòng (RCOONa)</span>
                    <div className="text-2xl font-black text-emerald-300 font-mono">
                      {saponificationResult.theoreticalSoapYieldGrams.toFixed(1)} g
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {saponificationResult.soapCompoundFormula}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-400 font-semibold uppercase">Grixerol C₃H₅(OH)₃</span>
                    <div className="text-2xl font-black text-cyan-300 font-mono">
                      {saponificationResult.theoreticalGlycerolYieldGrams.toFixed(1)} g
                    </div>
                    <div className="text-[10px] text-slate-400">
                      M = 92.09 g/mol (Chất lỏng sánh, vị ngọt)
                    </div>
                  </div>
                </div>
              </div>

              {/* Chemical Equation Box */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-emerald-400" /> Phương Trình Phản Ứng Tổng Quát
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-emerald-300 text-center text-xs overflow-x-auto">
                  ({currentLipid.fattyAcidFormula.replace('COOH', 'COO')})₃C₃H₅ + 3 NaOH → 3 {currentLipid.fattyAcidFormula.replace('COOH', 'COONa')} + C₃H₅(OH)₃
                </div>
              </div>

              {/* Step-by-Step Pedagogical Guide */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-semibold text-xs text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Các Bước Tính Toán Lý Thuyết &amp; Thực Tiễn
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {saponificationResult.stepByStepExplanationVI.map((step, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950/50 border border-slate-800/80 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 3: SALTING-OUT SOAP ===================== */}
        {activeMode === 'SALTING_OUT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Thí Nghiệm Tách Xà Phòng (Salting-Out)
                  </span>
                  <button
                    onClick={handleResetSaltingOut}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Soap Mass Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Khối lượng xà phòng ban đầu (muối RCOONa):</span>
                    <span className="font-mono font-bold text-emerald-300">{soapMassInput.toFixed(1)} g</span>
                  </div>
                  <input
                    type="range"
                    min="10.0"
                    max="100.0"
                    step="5.0"
                    value={soapMassInput}
                    onChange={(e) => setSoapMassInput(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Water Volume Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Thể tích nước (H₂O):</span>
                    <span className="font-mono font-bold text-blue-300">{waterVolumeInput.toFixed(0)} mL</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={waterVolumeInput}
                    onChange={(e) => setWaterVolumeInput(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Added NaCl Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Lượng muối ăn (NaCl) bão hòa thêm vào:</span>
                    <span className="font-mono font-bold text-cyan-300">{addedNaclGrams.toFixed(1)} g</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="2"
                    value={addedNaclGrams}
                    onChange={(e) => setAddedNaclGrams(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Ionic Strength Meter */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nồng độ NaCl trong dung dịch:</span>
                    <span className={`font-mono font-bold ${
                      saltingOutResult.isSaltingOutThresholdReached ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {saltingOutResult.naclConcentrationPercent.toFixed(1)}% (w/w)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    * Ngưỡng muối kết hiệu dụng trong SGK: ≥ 8.0% NaCl bão hòa.
                  </div>
                </div>
              </div>

              {/* Rationale Explanation */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Bản Chất Của Hiện Tượng Muối Kết
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                  {saltingOutResult.pedagogicalRationaleVI}
                </div>
              </div>
            </div>

            {/* Right Visual Precipitation Tank & Metrics (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border transition-all ${
                saltingOutResult.isSaltingOutThresholdReached
                  ? 'bg-cyan-950/40 border-cyan-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Hiệu Suất Tách Bánh Xà Phòng
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    saltingOutResult.isSaltingOutThresholdReached
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {saltingOutResult.isSaltingOutThresholdReached ? 'Đã Tách Lớp Thành Công' : 'Chưa Đạt Ngưỡng Muối'}
                  </span>
                </div>
                <div className="text-3xl font-black text-cyan-300 font-mono">
                  {saltingOutResult.precipitationEfficiencyPercent.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  {saltingOutResult.visualPhenomenonVI}
                </div>
              </div>

              {/* Graphical Beaker SVG */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Beaker className="w-4 h-4 text-cyan-400" /> Cốc Thủy Tinh Quan Sát Xà Phòng Nổi
                </div>

                <div className="flex items-center justify-center p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <svg viewBox="0 0 400 160" className="w-full max-w-md h-36">
                    <defs>
                      <linearGradient id="soapCakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="brineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Beaker Outline */}
                    <rect x="130" y="25" width="140" height="105" rx="8" fill="#090d16" stroke="#475569" strokeWidth="2" />

                    {/* Lower Brine Layer */}
                    <rect x="132" y="70" width="136" height="58" rx="6" fill="url(#brineGrad)" />

                    {/* Floating Soap Layer */}
                    {saltingOutResult.precipitationEfficiencyPercent > 5 && (
                      <rect
                        x="132"
                        y={70 - Math.min(30, (saltingOutResult.precipitationEfficiencyPercent / 100) * 28)}
                        width="136"
                        height={Math.min(30, (saltingOutResult.precipitationEfficiencyPercent / 100) * 28)}
                        rx="4"
                        fill="url(#soapCakeGrad)"
                      />
                    )}

                    {/* Annotations */}
                    <text x="280" y="55" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      ▲ Mảng xà phòng đông tụ ({saltingOutResult.precipitatedSoapCakeGrams.toFixed(1)} g)
                    </text>
                    <text x="280" y="70" fill="#94a3b8" fontSize="9">
                      Nhẹ hơn nước muối (d &lt; d_muối), nổi lên trên
                    </text>

                    <text x="280" y="95" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      ▼ Nước ót (chất lỏng trong suốt)
                    </text>
                    <text x="280" y="110" fill="#94a3b8" fontSize="9">
                      Chứa grixerol, NaCl bão hòa và NaOH dư
                    </text>
                  </svg>
                </div>
              </div>

              {/* Quantitative Balance Table */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-300 flex items-center justify-between">
                  <span>Bảng Cân Bằng Pha Tách Biệt</span>
                  <span className="font-mono text-cyan-400">Tổng m = {(soapMassInput + waterVolumeInput + addedNaclGrams).toFixed(1)} g</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">Xà phòng kết tủa thành bánh:</span>
                    <div className="font-mono font-bold text-emerald-300 text-base">
                      {saltingOutResult.precipitatedSoapCakeGrams.toFixed(1)} g
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">Xà phòng còn hòa tan trong nước ót:</span>
                    <div className="font-mono font-bold text-slate-400 text-base">
                      {saltingOutResult.residualDissolvedSoapGrams.toFixed(1)} g
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
