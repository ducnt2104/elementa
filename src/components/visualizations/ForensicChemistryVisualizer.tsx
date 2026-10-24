import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Sparkles,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Moon,
  Sun,
  Flame,
  Info,
  Scale,
  RotateCcw
} from 'lucide-react';
import {
  calculateBreathalyzerTest,
  evaluateLuminolChemiluminescence,
  performMarshTest,
  MARQUIS_CATALOG,
  simulateCyanideAntidote,
  LuminolTestScenario
} from '../../domain/forensicChemistryEngine';
import { sound } from '../../audio/soundEngine';

type ForensicMode = 'BREATHALYZER_LAB' | 'LUMINOL_DARKROOM' | 'TOXICOLOGY_MARSH_MARQUIS';

export const ForensicChemistryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ForensicMode>('BREATHALYZER_LAB');

  // Mode 1: Breathalyzer state
  const [breathEthanolMgL, setBreathEthanolMgL] = useState<number>(0.28);

  // Mode 2: Luminol state
  const [isDarkroomMode, setIsDarkroomMode] = useState<boolean>(true);
  const [selectedLuminolSample, setSelectedLuminolSample] = useState<LuminolTestScenario['targetSample']>('DRIED_BLOOD');
  const [isLuminolSprayed, setIsLuminolSprayed] = useState<boolean>(true);

  // Mode 3: Marsh & Marquis & Cyanide state
  const [marshSample, setMarshSample] = useState<'ARSENIC_TRIPTOXIDE' | 'ANTIMONY_TRICHLORIDE' | 'CONTROL_BLANK'>('ARSENIC_TRIPTOXIDE');
  const [selectedMarquisId, setSelectedMarquisId] = useState<string>('MORPHINE_HEROIN');
  const [cyanideDoseMg, setCyanideDoseMg] = useState<number>(60);
  const [selectedAntidote, setSelectedAntidote] = useState<'NONE' | 'SODIUM_THIOSULFATE' | 'HYDROXOCOBALAMIN'>('SODIUM_THIOSULFATE');

  // Calculations
  const breathalyzer = useMemo(() => {
    return calculateBreathalyzerTest(breathEthanolMgL);
  }, [breathEthanolMgL]);

  const luminol = useMemo(() => {
    return evaluateLuminolChemiluminescence(selectedLuminolSample);
  }, [selectedLuminolSample]);

  const marsh = useMemo(() => {
    return performMarshTest(marshSample);
  }, [marshSample]);

  const activeMarquis = useMemo(() => {
    return MARQUIS_CATALOG.find(m => m.id === selectedMarquisId) || MARQUIS_CATALOG[0];
  }, [selectedMarquisId]);

  const cyanide = useMemo(() => {
    return simulateCyanideAntidote(cyanideDoseMg, selectedAntidote);
  }, [cyanideDoseMg, selectedAntidote]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Hình Sự & Giám Định Pháp Y</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Phòng Thí Nghiệm Hóa Học Pháp Y & Giám Định Độc Chất
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá các phản ứng hóa học kinh điển trong kỹ thuật hình sự: Phản ứng oxi hóa khử đo nồng độ cồn hơi thở qua muối Dichromate,
              phát quang hóa học Luminol nhận diện vết máu siêu vi lượng, thử nghiệm gương Asen Marsh và phản ứng màu chỉ thị ma túy Marquis.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-indigo-800/40 shrink-0">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('BREATHALYZER_LAB');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'BREATHALYZER_LAB'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Nồng Độ Cồn Hơi Thở
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('LUMINOL_DARKROOM');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'LUMINOL_DARKROOM'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Phát Quang Luminol
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('TOXICOLOGY_MARSH_MARQUIS');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'TOXICOLOGY_MARSH_MARQUIS'
                  ? 'bg-purple-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Gương Asen & Marquis
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: BREATHALYZER ALCOHOL REDOX LAB                                */}
      {/* ===================================================================== */}
      {activeMode === 'BREATHALYZER_LAB' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ivory flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Nồng Độ Ethanol Hơi Thở (BrAC)
                </span>
                <span className="font-mono text-base font-extrabold text-amber-400">
                  {breathEthanolMgL.toFixed(2)} mg/L
                </span>
              </div>

              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={breathEthanolMgL}
                onChange={e => {
                  sound.playUiClick();
                  setBreathEthanolMgL(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />

              {/* Quick Presets */}
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setBreathEthanolMgL(0.0);
                  }}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    breathEthanolMgL === 0 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  0.0 (Tỉnh táo)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setBreathEthanolMgL(0.18);
                  }}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    breathEthanolMgL === 0.18 ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  0.18 (Mức 1)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setBreathEthanolMgL(0.32);
                  }}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    breathEthanolMgL === 0.32 ? 'bg-orange-500/20 border-orange-400 text-orange-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  0.32 (Mức 2)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setBreathEthanolMgL(0.65);
                  }}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    breathEthanolMgL === 0.65 ? 'bg-red-500/20 border-red-400 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  0.65 (Mức 3)
                </button>
              </div>

              {/* Calculated Blood Alcohol */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nồng độ cồn trong máu (BAC quy đổi Henry 2100:1):</span>
                  <span className="font-mono font-bold text-ivory">{breathalyzer.estimatedBacMgPer100mL.toFixed(1)} mg/100mL</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Độ hấp thụ quang tại λ = 440 nm (Cr₂O₇²⁻ Cam):</span>
                  <span className="font-mono text-orange-400 font-bold">{breathalyzer.absorbanceAt440nm} OD</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Độ hấp thụ quang tại λ = 600 nm (Cr³⁺ Xanh Lục):</span>
                  <span className="font-mono text-emerald-400 font-bold">{breathalyzer.absorbanceAt600nm} OD</span>
                </div>
              </div>

              {/* Vietnam Decree 100 Penalty Card */}
              <div className={`p-4 rounded-xl border ${
                breathalyzer.vietnamDecree100Tier === 'TIER_0_SOBER'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : breathalyzer.vietnamDecree100Tier === 'TIER_1_LOW'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : breathalyzer.vietnamDecree100Tier === 'TIER_2_MEDIUM'
                  ? 'bg-orange-950/40 border-orange-500/40 text-orange-200'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Quy Định Nghị Định 100/2019/NĐ-CP (Việt Nam)</span>
                </div>
                <p className="text-xs leading-relaxed">{breathalyzer.legalPenaltyDescriptionVi}</p>
              </div>
            </div>
          </div>

          {/* Cuvette Optical Colorimeter SVG & Chemistry */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-indigo-400 font-bold">
                BUỒNG ĐO QUANG PHỔ HẤP THỤ (PHOTOMETRIC REACTION CUVETTE)
              </span>

              {/* Reaction Apparatus SVG */}
              <svg viewBox="0 0 460 220" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="cuvetteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={breathalyzer.solutionColor} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={breathalyzer.solutionColor} stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="lightBeamGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Light Source (LED / Lamp) */}
                <rect x="20" y="80" width="40" height="60" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <circle cx="40" cy="110" r="12" fill="#fbbf24" filter="drop-shadow(0 0 8px #fbbf24)" />
                <text x="40" y="160" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">Nguồn sáng</text>

                {/* Light Beam Passing Through */}
                <polygon points="60,95 190,85 190,135 60,125" fill="#fde68a" fillOpacity="0.25" />
                <polygon points="270,90 400,100 400,120 270,130" fill="#34d399" fillOpacity="0.3" />

                {/* Cuvette Body */}
                <rect x="190" y="40" width="80" height="140" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                {/* Solution Fill */}
                <rect x="194" y="65" width="72" height="112" rx="2" fill="url(#cuvetteGrad)" className="transition-all duration-700" />
                {/* Meniscus */}
                <path d="M 194 65 Q 230 72 266 65" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
                <text x="230" y="30" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">Cuvette 1 cm</text>
                <text x="230" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">
                  {breathEthanolMgL < 0.25 ? 'Cr₂O₇²⁻ (Cam)' : 'Cr³⁺ (Xanh Lục)'}
                </text>

                {/* Photodiode Sensor */}
                <rect x="400" y="80" width="40" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect x="408" y="95" width="24" height="30" rx="2" fill="#0284c7" />
                <text x="420" y="160" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">Cảm biến quang</text>
              </svg>

              {/* Chemical Equation Badge */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-indigo-800/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-indigo-400 font-mono block mb-1">Phương trình phản ứng oxi hóa - khử:</span>
                <p className="text-xs font-mono font-bold text-amber-200">
                  3C₂H₅OH + 2K₂Cr₂O₇ + 8H₂SO₄ → 3CH₃COOH + 2Cr₂(SO₄)₃ + 2K₂SO₄ + 11H₂O
                </p>
                <div className="flex justify-center gap-6 text-[11px] font-mono text-slate-400 mt-2">
                  <span>C⁻² → C⁺³ + 4e⁻ (Khử)</span>
                  <span>Cr⁺⁶ + 3e⁻ → Cr⁺³ (Oxi hóa)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: LUMINOL CHEMILUMINESCENCE CRIME SCENE DARKROOM                */}
      {/* ===================================================================== */}
      {activeMode === 'LUMINOL_DARKROOM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ivory flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Mẫu Thử Nghiệm Nghi Vấn
                </span>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setIsDarkroomMode(!isDarkroomMode);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isDarkroomMode ? 'bg-cyan-500 text-obsidian' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isDarkroomMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  {isDarkroomMode ? 'Phòng Tối (Bật)' : 'Ánh Sáng Thường'}
                </button>
              </div>

              {/* Sample Selector */}
              <div className="space-y-2">
                {[
                  { id: 'DRIED_BLOOD', label: 'Vết máu khô lâu ngày (Fe-Heme)', color: 'text-red-400' },
                  { id: 'DILUTED_BLOOD_1_1000', label: 'Vết máu đã rửa qua nước (Pha loãng 1:1.000)', color: 'text-rose-400' },
                  { id: 'DILUTED_BLOOD_1_100000', label: 'Dấu vết siêu vi lượng (Pha loãng 1:100.000)', color: 'text-indigo-400' },
                  { id: 'BLEACH_FALSE_POSITIVE', label: 'Vết nước tẩy Javel (NaClO - Dương tính giả)', color: 'text-cyan-400' },
                  { id: 'RUST_IRON_OXIDE', label: 'Vệt rỉ sét kim loại (Fe₂O₃ - Dương tính giả)', color: 'text-amber-400' },
                  { id: 'CLEAN_SURFACE', label: 'Bề mặt sạch đối chứng (Mẫu trắng)', color: 'text-slate-400' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedLuminolSample(item.id as any);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedLuminolSample === item.id
                        ? 'bg-indigo-950/60 border-cyan-400 text-ivory font-bold shadow'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={item.color}>{item.label}</span>
                    {selectedLuminolSample === item.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>

              {/* Spray Button */}
              <button
                onClick={() => {
                  sound.playUiClick();
                  setIsLuminolSprayed(true);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Xịt Dung Dịch Luminol + H₂O₂ (Phun sương kiềm)
              </button>

              {/* Forensic Interpretation Card */}
              <div className={`p-4 rounded-xl border ${
                luminol.isFalsePositive
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : luminol.isPositiveGlow
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                  : 'bg-slate-950/40 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
                  {luminol.isFalsePositive ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{luminol.isFalsePositive ? 'Cảnh Báo: Dương Tính Giả' : 'Kết Quả Giám Định Pháp Y'}</span>
                </div>
                <p className="text-xs leading-relaxed">{luminol.forensicInterpretationVi}</p>
                <div className="mt-2 text-[11px] font-mono opacity-80">
                  Thời gian phát sáng: ~{luminol.glowDurationSeconds}s | Bước sóng cực đại: {luminol.emissionWavelengthNm} nm
                </div>
              </div>
            </div>
          </div>

          {/* Crime Scene Darkroom Visualizer Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative transition-all duration-700 ${
              isDarkroomMode ? 'bg-[#030712] border-indigo-950' : 'bg-slate-900 border-indigo-900/40'
            }`}>
              <span className="absolute top-4 left-4 text-xs font-mono text-cyan-400 font-bold">
                {isDarkroomMode ? 'HIỆN TRƯỜNG PHÒNG TỐI (CHEMILUMINESCENCE DARKROOM)' : 'HIỆN TRƯỜNG ÁNH SÁNG BÌNH THƯỜNG'}
              </span>

              {/* Chemiluminescent Footprint / Droplet SVG */}
              <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                <defs>
                  <filter id="luminolGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={isDarkroomMode ? "8" : "2"} result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Floor Tile Grid */}
                <path d="M 50 180 L 350 180 M 80 140 L 320 140 M 110 100 L 290 100" stroke={isDarkroomMode ? "#1e293b" : "#334155"} strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 120 70 L 60 210 M 200 70 L 200 210 M 280 70 L 340 210" stroke={isDarkroomMode ? "#1e293b" : "#334155"} strokeWidth="1" strokeDasharray="4 4" />

                {/* Footprint Bloodstain Contour */}
                {luminol.isPositiveGlow && isLuminolSprayed && (
                  <g filter="url(#luminolGlow)" className="transition-all duration-1000">
                    {/* Heel */}
                    <ellipse
                      cx="190"
                      cy="170"
                      rx="26"
                      ry="32"
                      fill={luminol.glowColorHex}
                      fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25}
                    />
                    {/* Sole / Arch */}
                    <path
                      d="M 170 145 C 165 110, 205 100, 215 110 C 220 130, 200 150, 190 150 Z"
                      fill={luminol.glowColorHex}
                      fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25}
                    />
                    {/* Toes */}
                    <circle cx="175" cy="85" r="9" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25} />
                    <circle cx="195" cy="88" r="7.5" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25} />
                    <circle cx="212" cy="94" r="6" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25} />
                    <circle cx="226" cy="102" r="5" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? (luminol.glowIntensityPercent / 100) : 0.25} />

                    {/* Spatter droplets */}
                    <circle cx="130" cy="120" r="4" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? 0.8 : 0.2} />
                    <circle cx="265" cy="150" r="5" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? 0.7 : 0.2} />
                    <circle cx="240" cy="70" r="3" fill={luminol.glowColorHex} fillOpacity={isDarkroomMode ? 0.9 : 0.2} />
                  </g>
                )}

                {/* If clean surface or not sprayed */}
                {(!luminol.isPositiveGlow || !isLuminolSprayed) && (
                  <text x="200" y="140" fill="#64748b" fontSize="12" textAnchor="middle" fontFamily="monospace">
                    Không phát hiện hiện tượng phát quang
                  </text>
                )}
              </svg>

              {/* Chemical Equation of Chemiluminescence */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-indigo-800/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-cyan-400 font-mono block mb-1">Cơ chế phát quang hóa học (Chemiluminescence Mechanism):</span>
                <p className="text-xs font-mono font-bold text-cyan-200">
                  {luminol.chemiluminescentEquationVi}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Ion Fe²⁺/Fe³⁺ trong Heme xúc tác phân hủy H₂O₂ thành gốc tự do, kích thích Luminol giải phóng photon λ = 425 nm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: MARSH TEST FOR ARSENIC & MARQUIS DRUG TESTING & CYANIDE       */}
      {/* ===================================================================== */}
      {activeMode === 'TOXICOLOGY_MARSH_MARQUIS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Marsh Test & Marquis Spot Plate */}
          <div className="lg:col-span-6 space-y-4">
            {/* Marsh Test */}
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ivory flex items-center gap-2">
                  <Flame className="w-4 h-4 text-purple-400" />
                  Thử Nghiệm Gương Asen Marsh (James Marsh 1836)
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                  Phát hiện Thạch tín
                </span>
              </div>

              {/* Marsh Sample Selection */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ARSENIC_TRIPTOXIDE', label: 'As₂O₃ (Thạch tín)' },
                  { id: 'ANTIMONY_TRICHLORIDE', label: 'SbCl₃ (Antimon)' },
                  { id: 'CONTROL_BLANK', label: 'Mẫu trắng (Blank)' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playUiClick();
                      setMarshSample(s.id as any);
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                      marshSample === s.id
                        ? 'bg-purple-600 text-white border-purple-400 shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Marsh Apparatus Diagram & Outcome */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Hiện tượng trên đĩa sứ lạnh:</span>
                  <span className="font-mono font-bold text-ivory">{marsh.mirrorAppearanceVi}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Độ tan trong nước Javel (NaOCl):</span>
                  <span className="font-mono font-bold text-amber-300">{marsh.hypochloriteSolubilityVi}</span>
                </div>
                <p className="text-[11px] font-mono text-purple-300 bg-purple-950/40 p-2 rounded-lg border border-purple-900/30">
                  {marsh.thermalDecompositionEquationVi}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{marsh.historicalContextVi}</p>
              </div>
            </div>

            {/* Marquis Spot Plate */}
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                Thử Nghiệm Màu Chỉ Thị Ma Túy Marquis (Formalin + H₂SO₄ đặc)
              </span>

              {/* 5 Substance Pills */}
              <div className="flex flex-wrap gap-2">
                {MARQUIS_CATALOG.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMarquisId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      selectedMarquisId === item.id
                        ? 'bg-amber-500 text-obsidian border-amber-400 font-extrabold shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.nameVi.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Active Marquis Result */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-ivory">{activeMarquis.nameVi}</h4>
                    <span className="text-[11px] font-mono text-slate-400">{activeMarquis.chemicalFormula} · {activeMarquis.classificationVi}</span>
                  </div>
                  {/* Spot color badge */}
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/40 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: activeMarquis.primaryColorHex }}
                  />
                </div>
                <p className="text-xs text-amber-200 font-semibold">{activeMarquis.colorTransitionDescriptionVi}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{activeMarquis.reactionMechanismVi}</p>
                <div className="text-[11px] font-mono text-indigo-400">
                  Phương pháp khẳng định chuẩn: {activeMarquis.confirmationMethodVi}
                </div>
              </div>
            </div>
          </div>

          {/* Cyanide Antidote Rescue Simulator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ivory flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Mô Phỏng Giải Độc Cyanide (NaCN Antidote Therapy)
                </span>
                <span className="font-mono text-xs text-red-400 font-bold">
                  Liều lượng: {cyanideDoseMg} mg
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={cyanideDoseMg}
                onChange={e => {
                  sound.playUiClick();
                  setCyanideDoseMg(parseInt(e.target.value));
                }}
                className="w-full accent-red-500 cursor-pointer"
              />

              {/* Antidote Selection */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Phác đồ cấp cứu giải độc:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'NONE', label: 'Không dùng Antidote' },
                    { id: 'SODIUM_THIOSULFATE', label: 'Sodium Thiosulfate' },
                    { id: 'HYDROXOCOBALAMIN', label: 'Cyanokit (Vit B12a)' }
                  ].map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedAntidote(a.id as any);
                      }}
                      className={`p-2 rounded-xl border text-center font-bold transition-all ${
                        selectedAntidote === a.id
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cytochrome c Oxidase Inhibition Bar */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tỷ lệ ức chế Chuỗi hô hấp ty thể (Cytochrome c Oxidase):</span>
                  <span className={`font-mono font-bold ${
                    cyanide.cytochromeOxidaseInhibitionPercent > 50 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {cyanide.cytochromeOxidaseInhibitionPercent}%
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      cyanide.cytochromeOxidaseInhibitionPercent > 50 ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${cyanide.cytochromeOxidaseInhibitionPercent}%` }}
                  />
                </div>
              </div>

              {/* Status Outcome Badge */}
              <div className={`p-4 rounded-xl border ${
                cyanide.patientSurvivalStatusVi === 'TỬ_VONG_DO_NGẠT_TẾ_BÀO'
                  ? 'bg-red-950/50 border-red-500/50 text-red-200'
                  : cyanide.patientSurvivalStatusVi === 'NGUY_KỊCH'
                  ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
                  : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
                  {cyanide.patientSurvivalStatusVi === 'HỒI_PHỤC_HOÀN_TOÀN' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
                  <span>Tiên lượng bệnh nhân: {cyanide.patientSurvivalStatusVi.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-xs leading-relaxed">{cyanide.biochemicalMechanismVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
