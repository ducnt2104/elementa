// src/components/visualizations/CarbohydrateVisualizer.tsx
// Interactive Carbohydrate Biochemistry, Mutarotation, Tollens Mirror, Fehling Test & Starch-Iodine Helix Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 2: Cacbohiđrat) & IUPAC Guidelines

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Droplets,
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Thermometer,
  Shield,
  Layers,
  FlaskRound as Flask,
  Sun,
  Activity,
  Zap
} from 'lucide-react';
import {
  CARBOHYDRATES_CATALOG,
  CarbohydrateDef,
  calculateMutarotationEquilibrium,
  calculateTollensSilverMirror,
  calculateFehlingReaction,
  simulateStarchIodineColor,
  calculateSucroseInversion,
  calculateCelluloseNitration,
  TollensSilverMirrorResult,
  FehlingCopperReactionResult,
  StarchIodineInclusionResult,
  SucroseInversionResult,
  CelluloseNitrationResult
} from '../../domain/carbohydrateEngine';
import { sound } from '../../audio/soundEngine';

export interface CarbohydrateVisualizerProps {
  initialMode?: 'MUTAROTATION' | 'REDOX_TESTS' | 'POLYSACCHARIDE_EXPERIMENTS';
  className?: string;
}

export const CarbohydrateVisualizer: React.FC<CarbohydrateVisualizerProps> = ({
  initialMode = 'MUTAROTATION',
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'MUTAROTATION' | 'REDOX_TESTS' | 'POLYSACCHARIDE_EXPERIMENTS'>(initialMode);

  // 1. Mutarotation State
  const [selectedMutarotationSugar, setSelectedMutarotationSugar] = useState<'glucose' | 'fructose'>('glucose');

  // 2. Redox Tests State
  const [selectedRedoxSugarId, setSelectedRedoxSugarId] = useState<string>('glucose');
  const [activeTestType, setActiveTestType] = useState<'TOLLENS' | 'FEHLING'>('TOLLENS');
  const [sugarMassInputGrams, setSugarMassInputGrams] = useState<number>(18.0);
  const [fehlingTempCondition, setFehlingTempCondition] = useState<'ROOM_TEMPERATURE' | 'HEATING_ABOVE_80C'>('ROOM_TEMPERATURE');

  // 3. Polysaccharide Experiments State
  const [polySubTab, setPolySubTab] = useState<'STARCH_IODINE' | 'SUCROSE_INVERSION' | 'CELLULOSE_NITRATION'>('STARCH_IODINE');
  const [starchTemperatureC, setStarchTemperatureC] = useState<number>(25);
  const [sucroseHydrolysisPct, setSucroseHydrolysisPct] = useState<number>(50);
  const [celluloseMassInput, setCelluloseMassInput] = useState<number>(16.2);

  // Calculations
  const mutarotationData = useMemo(() => {
    return calculateMutarotationEquilibrium(selectedMutarotationSugar);
  }, [selectedMutarotationSugar]);

  const currentRedoxSugar = useMemo<CarbohydrateDef>(() => {
    return CARBOHYDRATES_CATALOG.find(s => s.id === selectedRedoxSugarId) || CARBOHYDRATES_CATALOG[0];
  }, [selectedRedoxSugarId]);

  const tollensResult = useMemo<TollensSilverMirrorResult>(() => {
    return calculateTollensSilverMirror({
      sugarId: selectedRedoxSugarId,
      sugarMassGrams: sugarMassInputGrams
    });
  }, [selectedRedoxSugarId, sugarMassInputGrams]);

  const fehlingResult = useMemo<FehlingCopperReactionResult>(() => {
    return calculateFehlingReaction({
      sugarId: selectedRedoxSugarId,
      reactionCondition: fehlingTempCondition,
      sugarMassGrams: sugarMassInputGrams
    });
  }, [selectedRedoxSugarId, fehlingTempCondition, sugarMassInputGrams]);

  const starchResult = useMemo<StarchIodineInclusionResult>(() => {
    return simulateStarchIodineColor(starchTemperatureC);
  }, [starchTemperatureC]);

  const inversionResult = useMemo<SucroseInversionResult>(() => {
    return calculateSucroseInversion({
      sucroseMassGrams: 34.2,
      conversionPercent: sucroseHydrolysisPct
    });
  }, [sucroseHydrolysisPct]);

  const nitrationResult = useMemo<CelluloseNitrationResult>(() => {
    return calculateCelluloseNitration({
      celluloseMassGrams: celluloseMassInput
    });
  }, [celluloseMassInput]);

  const handleModeChange = (mode: 'MUTAROTATION' | 'REDOX_TESTS' | 'POLYSACCHARIDE_EXPERIMENTS') => {
    setActiveMode(mode);
    sound.playUiClick();
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Chuyên Đề Cacbohiđrat &amp; Hóa Sinh Đường
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                GDPT 2018 Lớp 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cân bằng hỗ biến Mutarotation · Tráng gương Tollens &amp; Fehling · Xoắn ốc Iot Tinh bột · Thuốc súng Xenlulozơ
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => handleModeChange('MUTAROTATION')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'MUTAROTATION'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            1. Mutarotation &amp; Quay Cực
          </button>
          <button
            onClick={() => handleModeChange('REDOX_TESTS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'REDOX_TESTS'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Flask className="w-3.5 h-3.5" />
            2. Tráng Bạc &amp; Cu(OH)₂
          </button>
          <button
            onClick={() => handleModeChange('POLYSACCHARIDE_EXPERIMENTS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'POLYSACCHARIDE_EXPERIMENTS'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3. Tinh Bột &amp; Xenlulozơ
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== MODE 1: MUTAROTATION ===================== */}
        {activeMode === 'MUTAROTATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Monosaccharide Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Lựa Chọn Monosaccarit Khảo Sát
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedMutarotationSugar('glucose');
                      sound.playUiClick();
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedMutarotationSugar === 'glucose'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs">D-Glucozơ</div>
                    <div className="text-[10px] text-slate-400">Aldohexose (C₆H₁₂O₆)</div>
                    <div className="text-[10px] font-mono text-emerald-300 mt-1">[α] = +52.7°</div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMutarotationSugar('fructose');
                      sound.playUiClick();
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedMutarotationSugar === 'fructose'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs">D-Fructozơ</div>
                    <div className="text-[10px] text-slate-400">Ketohexose (C₆H₁₂O₆)</div>
                    <div className="text-[10px] font-mono text-purple-300 mt-1">[α] = -92.4°</div>
                  </button>
                </div>
              </div>

              {/* Anomer Fractions Card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" /> Tỉ Lệ Dạng Đồng Phân Tại Cân Bằng Nước
                </span>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-400 font-semibold">β-Anomer (Dạng xích đạo bền hơn):</span>
                      <span className="font-mono font-bold text-emerald-300">{mutarotationData.betaAnomerPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${mutarotationData.betaAnomerPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-cyan-400 font-semibold">α-Anomer (Dạng trục axial C1-OH):</span>
                      <span className="font-mono font-bold text-cyan-300">{mutarotationData.alphaAnomerPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${mutarotationData.alphaAnomerPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-amber-400 font-semibold">Dạng Mạch Hở (Aldehyde / Ketone):</span>
                      <span className="font-mono font-bold text-amber-300">{mutarotationData.openChainPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.max(2, mutarotationData.openChainPercent * 10)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RPG Perk Banner */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Nội Tại Năng Lượng Đường
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    +40 Hồi Phục Năng Lượng / Giây
                  </div>
                </div>
                <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Right Polarimeter & Equilibrium Rationale (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Polarimeter Banner */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/60 p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Góc Quay Cực Riêng Cân Bằng [α]D²⁰ (Specific Optical Rotation)
                  </span>
                  <div className="text-3xl font-black font-mono text-emerald-300">
                    {mutarotationData.equilibriumSpecificRotationDegrees > 0 ? `+${mutarotationData.equilibriumSpecificRotationDegrees}` : mutarotationData.equilibriumSpecificRotationDegrees}°
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedMutarotationSugar === 'glucose'
                      ? 'Chuyển hóa từ α (+112°) và β (+18.7°) hội tụ về +52.7° (Hữu triền - Dextrorotatory)'
                      : 'Hỗn hợp cân bằng quay mặt phẳng ánh sáng phân cực sang trái -92.4° (Tả triền - Levorotatory)'}
                  </div>
                </div>

                <div className="hidden sm:block text-right p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Độ ngọt tương đối</div>
                  <div className="text-lg font-bold text-amber-300 font-mono">
                    {selectedMutarotationSugar === 'glucose' ? '0.74×' : '1.50×'}
                  </div>
                  <div className="text-[9px] text-slate-500">So với đường mía = 1.0</div>
                </div>
              </div>

              {/* Chemical Structure Illustration SVG */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-emerald-400" /> Sơ Đồ Cân Bằng Hỗ Biến Mở Vòng - Đóng Vòng
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Hemiacetal ⇌ Open Chain</span>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-center items-center">
                  <svg viewBox="0 0 460 140" className="w-full max-w-lg h-32">
                    {/* Alpha form box */}
                    <rect x="10" y="20" width="120" height="100" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="70" y="45" fill="#67e8f9" fontSize="12" fontWeight="bold" textAnchor="middle">α-D-Glucopyranose</text>
                    <text x="70" y="70" fill="#94a3b8" fontSize="10" textAnchor="middle">C1-OH vị trí trục (Axial)</text>
                    <text x="70" y="90" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">[α] = +112° (36%)</text>

                    {/* Left reversible arrow */}
                    <line x1="135" y1="65" x2="165" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="165" y1="75" x2="135" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
                    <polygon points="165,62 173,65 165,68" fill="#94a3b8" />
                    <polygon points="135,72 127,75 135,78" fill="#94a3b8" />

                    {/* Open chain box */}
                    <rect x="175" y="25" width="110" height="90" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="230" y="50" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Mạch Hở Anđehit</text>
                    <text x="230" y="72" fill="#cbd5e1" fontSize="9" textAnchor="middle">CH₂OH[CHOH]₄CHO</text>
                    <text x="230" y="92" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">&lt; 0.1% Cực Nhỏ</text>

                    {/* Right reversible arrow */}
                    <line x1="290" y1="65" x2="320" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="320" y1="75" x2="290" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
                    <polygon points="320,62 328,65 320,68" fill="#94a3b8" />
                    <polygon points="290,72 282,75 290,78" fill="#94a3b8" />

                    {/* Beta form box */}
                    <rect x="330" y="20" width="120" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="390" y="45" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">β-D-Glucopyranose</text>
                    <text x="390" y="70" fill="#94a3b8" fontSize="10" textAnchor="middle">C1-OH vị trí xích đạo (Bền)</text>
                    <text x="390" y="90" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">[α] = +18.7° (64%)</text>
                  </svg>
                </div>
              </div>

              {/* Pedagogical Explanation Card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Bản Chất Của Hiện Tượng Mutarotation (GDPT 2018)
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px] p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                  {mutarotationData.explanationVI}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 2: REDOX DIAGNOSTIC TESTS ===================== */}
        {activeMode === 'REDOX_TESTS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Sugar Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Sugar Picker */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flask className="w-4 h-4" /> Chọn Mẫu Cacbohiđrat Thử Nghiệm
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {CARBOHYDRATES_CATALOG.map((sugar) => {
                    const isSelected = sugar.id === selectedRedoxSugarId;
                    return (
                      <button
                        key={sugar.id}
                        onClick={() => {
                          setSelectedRedoxSugarId(sugar.id);
                          sound.playUiClick();
                        }}
                        className={`text-left p-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-xs truncate">{sugar.nameVI.split('(')[0]}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{sugar.formula}</div>
                        <span className={`text-[9px] px-1 py-0.2 rounded font-bold mt-1 inline-block ${
                          sugar.isReducingSugar ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {sugar.isReducingSugar ? 'Đường khử' : 'Không khử'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Test Type Tabs */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Loại Thuốc Thử Hóa Học
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActiveTestType('TOLLENS');
                      sound.playUiClick();
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                      activeTestType === 'TOLLENS'
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    1. Thuốc Thử Tollens [Ag(NH₃)₂]OH
                  </button>
                  <button
                    onClick={() => {
                      setActiveTestType('FEHLING');
                      sound.playUiClick();
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                      activeTestType === 'FEHLING'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    2. Thuốc Thử Cu(OH)₂ / Fehling
                  </button>
                </div>

                {/* Mass Slider */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Khối lượng đường thí nghiệm:</span>
                    <span className="font-mono font-bold text-amber-300">{sugarMassInputGrams.toFixed(1)} g</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="50.0"
                    step="1.0"
                    value={sugarMassInputGrams}
                    onChange={(e) => setSugarMassInputGrams(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Fehling Temperature Toggle */}
                {activeTestType === 'FEHLING' && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Nhiệt độ thí nghiệm</div>
                      <div className="text-[10px] text-slate-400">Đun nóng oxi hóa anđehit thành Cu₂O đỏ gạch</div>
                    </div>
                    <button
                      onClick={() => {
                        setFehlingTempCondition(
                          fehlingTempCondition === 'ROOM_TEMPERATURE'
                            ? 'HEATING_ABOVE_80C'
                            : 'ROOM_TEMPERATURE'
                        );
                        sound.playUiClick();
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border ${
                        fehlingTempCondition === 'HEATING_ABOVE_80C'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      {fehlingTempCondition === 'HEATING_ABOVE_80C' ? 'Đun Nóng >80°C' : 'Nhiệt Độ Thường (25°C)'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Reaction Observation & Quantitative Output (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* TOLLENS REACTION VIEW */}
              {activeTestType === 'TOLLENS' && (
                <>
                  <div className={`p-4 rounded-xl border transition-all ${
                    tollensResult.canReduceTollens
                      ? 'bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900/60 border-amber-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        Phản Ứng Tráng Bạc (Tollens Silver Mirror)
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        tollensResult.canReduceTollens
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {tollensResult.canReduceTollens ? 'Dương Tính (Tráng Gương)' : 'Âm Tính (Không Phản Ứng)'}
                      </span>
                    </div>

                    <div className="text-3xl font-black font-mono text-amber-300">
                      {tollensResult.theoreticalSilverYieldGrams.toFixed(2)} g Bạc Kim Loại (Ag)
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {tollensResult.visualPhenomenonVI}
                    </div>
                  </div>

                  {/* SVG Flask with Silver Coating */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Flask className="w-4 h-4 text-amber-400" /> Bình Tam Giác Tráng Gương Bạc
                    </div>
                    <div className="flex justify-center p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                      <svg viewBox="0 0 400 150" className="w-full max-w-md h-32">
                        <defs>
                          <linearGradient id="silverMirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f1f5f9" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                          </linearGradient>
                        </defs>

                        {/* Flask outline */}
                        <polygon
                          points="170,25 230,25 230,50 280,130 120,130 170,50"
                          fill="#090d16"
                          stroke={tollensResult.canReduceTollens ? "url(#silverMirrorGrad)" : "#475569"}
                          strokeWidth={tollensResult.canReduceTollens ? "4" : "2"}
                        />

                        {/* Silver coating reflection shine */}
                        {tollensResult.canReduceTollens && (
                          <>
                            <polygon points="175,55 225,55 270,125 130,125" fill="#f8fafc" opacity="0.15" />
                            <line x1="140" y1="120" x2="260" y2="120" stroke="#f8fafc" strokeWidth="3" opacity="0.8" />
                            <circle cx="200" cy="90" r="15" fill="#ffffff" opacity="0.2" />
                          </>
                        )}

                        <text x="295" y="60" fill="#fcd34d" fontSize="11" fontWeight="bold">
                          {tollensResult.canReduceTollens ? 'Lớp bạc kim loại sáng bóng' : 'Không có bạc kết tủa'}
                        </text>
                        <text x="295" y="80" fill="#94a3b8" fontSize="9">
                          Tỉ lệ mol: 1 mol đường ➔ {tollensResult.stoichiometricRatioSugarToAg} mol Ag
                        </text>
                        <text x="295" y="100" fill="#cbd5e1" fontSize="9" fontStyle="italic">
                          Ứng dụng: Ruột phích giữ nhiệt &amp; gương soi
                        </text>
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {/* FEHLING REACTION VIEW */}
              {activeTestType === 'FEHLING' && (
                <>
                  <div className={`p-4 rounded-xl border transition-all ${
                    fehlingResult.formsRedBrickPrecipitate
                      ? 'bg-rose-950/40 border-rose-500/40'
                      : fehlingResult.formsSolubleBlueComplex
                      ? 'bg-blue-950/40 border-blue-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                        Phản Ứng Thuốc Thử Cu(OH)₂ / Fehling
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        fehlingResult.formsRedBrickPrecipitate
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : fehlingResult.formsSolubleBlueComplex
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {fehlingResult.formsRedBrickPrecipitate
                          ? 'Kết Tủa Đỏ Gạch Cu₂O'
                          : fehlingResult.formsSolubleBlueComplex
                          ? 'Phức Đồng Xanh Lam Thẫm'
                          : 'Không Phản Ứng'}
                      </span>
                    </div>

                    <div className="text-2xl font-black font-mono text-slate-100">
                      {fehlingResult.formsRedBrickPrecipitate
                        ? `${fehlingResult.redPrecipitateMassGrams.toFixed(2)} g Cu₂O (Đỏ gạch)`
                        : fehlingResult.formsSolubleBlueComplex
                        ? 'Dung dịch phức đồng - ancol đa chức'
                        : 'Không tạo phức hay kết tủa'}
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {fehlingResult.visualPhenomenonVI}
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Phương Trình Hóa Học &amp; Giải Thích
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-300 text-center text-[11px] overflow-x-auto">
                      {fehlingResult.chemicalEquationVI}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                      {fehlingResult.pedagogicalRationaleVI}
                    </p>
                  </div>
                </>
              )}

              {/* Chemical Equation and Mechanism Box */}
              {activeTestType === 'TOLLENS' && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Phương Trình Phản Ứng &amp; Cơ Chế
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-amber-300 text-center text-[11px] overflow-x-auto">
                    {tollensResult.chemicalEquationVI}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                    {tollensResult.reductionMechanismVI}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== MODE 3: POLYSACCHARIDES (STARCH & CELLULOSE) ===================== */}
        {activeMode === 'POLYSACCHARIDE_EXPERIMENTS' && (
          <div className="space-y-4">
            {/* Sub-tab navigation */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 max-w-md gap-1">
              <button
                onClick={() => {
                  setPolySubTab('STARCH_IODINE');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  polySubTab === 'STARCH_IODINE'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Xoắn Ốc Iot - Tinh Bột
              </button>
              <button
                onClick={() => {
                  setPolySubTab('SUCROSE_INVERSION');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  polySubTab === 'SUCROSE_INVERSION'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Đường Nghịch Đảo
              </button>
              <button
                onClick={() => {
                  setPolySubTab('CELLULOSE_NITRATION');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  polySubTab === 'CELLULOSE_NITRATION'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Thuốc Súng Không Khói
              </button>
            </div>

            {/* Subtab 1: Starch Iodine */}
            {polySubTab === 'STARCH_IODINE' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4" /> Điều Chỉnh Nhiệt Độ Dung Dịch Hồ Tinh Bột
                    </span>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Nhiệt độ ống nghiệm:</span>
                        <span className="font-mono font-bold text-indigo-300">{starchTemperatureC}°C</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="95"
                        step="1"
                        value={starchTemperatureC}
                        onChange={(e) => setStarchTemperatureC(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setStarchTemperatureC(25);
                          sound.playUiClick();
                        }}
                        className="flex-1 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:bg-slate-800"
                      >
                        Nhiệt độ thường (25°C)
                      </button>
                      <button
                        onClick={() => {
                          setStarchTemperatureC(85);
                          sound.playUiClick();
                        }}
                        className="flex-1 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-rose-300 hover:bg-slate-800"
                      >
                        Đun sôi (85°C)
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Cấu Trúc Hóa Học Amilozơ &amp; Amilopectin
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                      <li><strong>Amilozơ (20-30%):</strong> Mạch thẳng không phân nhánh, liên kết α-1,4-glicosizơ xoắn hình lò xo.</li>
                      <li><strong>Amilopectin (70-80%):</strong> Mạch phân nhánh, liên kết α-1,4 xen kẽ các điểm phân nhánh α-1,6 (cứ 24-30 gốc).</li>
                      <li>Iot chỉ chui vừa vặn vào đường hầm xoắn ốc của amilozơ tạo phức màu xanh tím!</li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  {/* Dynamic Color Flask Banner */}
                  <div className="p-4 rounded-xl border border-indigo-500/40 bg-slate-900/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        Trạng Thái Màu Sắc Hỗn Hợp Hồ Tinh Bột + Dung Dịch Iot
                      </span>
                      <div className="text-2xl font-black text-slate-100 flex items-center gap-2 mt-1">
                        <span
                          className="w-5 h-5 rounded-full border border-slate-600 inline-block shrink-0 shadow-inner"
                          style={{ backgroundColor: starchResult.solutionColorHex }}
                        ></span>
                        {starchResult.colorNameVI}
                      </div>
                      <div className="text-xs text-slate-400 mt-2">
                        {starchResult.pedagogicalInsightVI}
                      </div>
                    </div>
                  </div>

                  {/* SVG Helical Inclusion Model */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-400" /> Mô Hình Chuỗi Xoắn Ống Rỗng Ngậm Phân Tử I₂
                    </div>
                    <div className="flex justify-center p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                      <svg viewBox="0 0 400 120" className="w-full max-w-md h-28">
                        {/* Helical coil lines */}
                        <path
                          d={starchResult.isHelixFormed
                            ? "M 30,60 Q 60,20 90,60 T 150,60 T 210,60 T 270,60 T 330,60 T 380,60"
                            : "M 30,60 L 380,60"}
                          fill="none"
                          stroke={starchResult.isHelixFormed ? "#6366f1" : "#94a3b8"}
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        {/* Trapped iodine molecules */}
                        {starchResult.isHelixFormed ? (
                          <>
                            <circle cx="90" cy="60" r="7" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="150" cy="60" r="7" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="210" cy="60" r="7" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="270" cy="60" r="7" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="330" cy="60" r="7" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                            <text x="200" y="105" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                              Phân tử I₂ bị bọc kín bên trong lòng ống xoắn ốc ➔ Hấp thụ ánh sáng tạo màu xanh tím
                            </text>
                          </>
                        ) : (
                          <>
                            <circle cx="110" cy="30" r="6" fill="#cbd5e1" opacity="0.6" />
                            <circle cx="210" cy="90" r="6" fill="#cbd5e1" opacity="0.6" />
                            <circle cx="310" cy="35" r="6" fill="#cbd5e1" opacity="0.6" />
                            <text x="200" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                              Đun nóng làm duỗi thẳng mạch ➔ I₂ thoát ra khỏi ống ➔ Mất màu xanh tím
                            </text>
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Subtab 2: Sucrose Inversion */}
            {polySubTab === 'SUCROSE_INVERSION' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Tiến Độ Thủy Phân Saccarozơ (Axit / Invertase)
                    </span>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Độ chuyển hóa (%):</span>
                        <span className="font-mono font-bold text-amber-300">{sucroseHydrolysisPct}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={sucroseHydrolysisPct}
                        onChange={(e) => setSucroseHydrolysisPct(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="font-semibold text-amber-300">Khối Lượng Sản Phẩm Thu Được</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">D-Glucozơ:</span>
                        <div className="font-bold text-emerald-300 text-base font-mono">{inversionResult.glucoseYieldGrams} g</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">D-Fructozơ:</span>
                        <div className="font-bold text-purple-300 text-base font-mono">{inversionResult.fructoseYieldGrams} g</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-xl border border-amber-500/40 bg-slate-900/80">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Góc Quay Cực Dung Dịch Sau Thủy Phân [α]D
                    </span>
                    <div className="text-3xl font-black font-mono text-amber-300 mt-1">
                      {inversionResult.currentOpticalRotationDegrees > 0
                        ? `+${inversionResult.currentOpticalRotationDegrees.toFixed(1)}° (Hữu triền)`
                        : `${inversionResult.currentOpticalRotationDegrees.toFixed(1)}° (Đã Nghịch Đảo Tả Triền)`}
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {inversionResult.explanationVI}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Subtab 3: Cellulose Nitration */}
            {polySubTab === 'CELLULOSE_NITRATION' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                      Phản Ứng Este Hóa Xenlulozơ Trinitrat
                    </span>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Khối lượng bông nõn xenlulozơ:</span>
                        <span className="font-mono font-bold text-rose-300">{celluloseMassInput.toFixed(1)} g</span>
                      </div>
                      <input
                        type="range"
                        min="5.0"
                        max="100.0"
                        step="5.0"
                        value={celluloseMassInput}
                        onChange={(e) => setCelluloseMassInput(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="text-[11px] text-slate-400 p-2 rounded bg-slate-950 border border-slate-800">
                      Lượng axit nitric HNO₃ đặc cần dùng: <span className="text-rose-300 font-mono font-bold">{nitrationResult.nitricAcidMolesNeeded} mol</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-xl border border-rose-500/40 bg-slate-900/80">
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                      Sản Lượng Thuốc Súng Không Khói (Guncotton)
                    </span>
                    <div className="text-3xl font-black font-mono text-rose-300 mt-1">
                      {nitrationResult.theoreticalCelluloseTrinitrateGrams.toFixed(1)} g
                      <span className="text-xs font-normal text-slate-400 ml-2">
                        ({nitrationResult.nitrogenMassPercent}% Nitơ)
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {nitrationResult.combustionPhenomenonVI}
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Phương Trình Hóa Học Tổng Hợp
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-rose-300 text-center text-[11px] overflow-x-auto">
                      [C₆H₇O₂(OH)₃]ₙ + 3n HNO₃ (đặc) ➔ [C₆H₇O₂(ONO₂)₃]ₙ + 3n H₂O (Xúc tác H₂SO₄ đặc)
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      * {nitrationResult.militaryAndIndustrialApplicationVI}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
