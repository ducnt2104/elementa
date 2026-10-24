// src/components/visualizations/QuantumDotsVisualizer.tsx
// Interactive Visualizer: Quantum Dots, Brus Equation, Size-Tunable Colors & QLED Displays
// Standards: Nobel Prize in Chemistry 2023 & Vietnam GDPT 2018 (Vật liệu Nano bán dẫn)

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Sliders,
  Tv,
  Layers,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  Sun,
  ShieldCheck,
  Eye,
  Activity
} from 'lucide-react';
import {
  QUANTUM_DOT_CATALOG,
  calculateBrusBandgap,
  CORE_SHELL_PROFILES,
  QuantumDotMaterial
} from '../../domain/quantumDotsEngine';
import { sound } from '../../audio/soundEngine';

type QuantumDotTabMode = 'BRUS_CONFINEMENT_COLOR' | 'QLED_DISPLAY_PIXELS' | 'CORE_SHELL_PASSIVATION';

export const QuantumDotsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QuantumDotTabMode>('BRUS_CONFINEMENT_COLOR');

  // Mode 1: Brus Confinement State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('CDSE');
  const [particleRadiusNm, setParticleRadiusNm] = useState<number>(2.5); // 2.5 nm -> green emission

  // Mode 2: QLED TV State
  const [blueBacklightPower, setBlueBacklightPower] = useState<number>(85); // %
  const [qledRedRadius, setQledRedRadius] = useState<number>(3.8); // nm
  const [qledGreenRadius, setQledGreenRadius] = useState<number>(2.4); // nm

  // Mode 3: Core-Shell State
  const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);

  // Calculations
  const brusResult = useMemo(() => {
    return calculateBrusBandgap(selectedMaterialId, particleRadiusNm);
  }, [selectedMaterialId, particleRadiusNm]);

  const qledRed = useMemo(() => {
    return calculateBrusBandgap('INP', qledRedRadius);
  }, [qledRedRadius]);

  const qledGreen = useMemo(() => {
    return calculateBrusBandgap('INP', qledGreenRadius);
  }, [qledGreenRadius]);

  const selectedCoreShell = useMemo(() => {
    return CORE_SHELL_PROFILES[selectedProfileIndex] || CORE_SHELL_PROFILES[0];
  }, [selectedProfileIndex]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Chuyên Đề GDPT 2018 · Công Nghệ Chấm Lượng Tử &amp; Giam Cầm Lượng Tử (Nobel Hóa Học 2023)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Chấm Lượng Tử (Quantum Dots), Phương Trình Brus &amp; Màn Hình QLED Thế Hệ Mới
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá định luật điều biến màu sắc quang học theo kích thước hạt nano (1 - 6 nm) không đổi thành phần hóa học,
              hiệu ứng giam cầm lượng tử electron-lỗ trống, cấu trúc Vỏ-Lõi Type-I và công nghệ màn hình chấm lượng tử thân thiện môi trường.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-teal-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('BRUS_CONFINEMENT_COLOR');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'BRUS_CONFINEMENT_COLOR'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mô Hình Brus &amp; Màu Sắc</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('QLED_DISPLAY_PIXELS');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'QLED_DISPLAY_PIXELS'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Màn Hình QLED (RGB)</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('CORE_SHELL_PASSIVATION');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'CORE_SHELL_PASSIVATION'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cấu Trúc Vỏ-Lõi (Type-I)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: BRUS EQUATION & SIZE-TUNABLE EMISSION COLOR                       */}
      {/* ========================================================================= */}
      {activeTab === 'BRUS_CONFINEMENT_COLOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Quantum Dot Glowing Nanocrystal SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-ivory text-base">
                    Mô Phỏng Hạt Nano Chấm Lượng Tử Đơn &amp; Phát Quang Huỳnh Quang
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    brusResult.material.rohsCompliant
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                  }`}>
                    {brusResult.material.rohsCompliant ? 'EU RoHS CHUẨN (KHÔNG CHÌ/CADMI)' : 'CHỨA KIM LOẠI NẶNG (Cd/Pb)'}
                  </span>
                </div>
              </div>

              {/* Glowing QD SVG Canvas */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <svg viewBox="0 0 600 300" className="w-full h-auto max-h-[300px]">
                  <defs>
                    <radialGradient id="qdGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={brusResult.emissionColorHex} stopOpacity="1" />
                      <stop offset="60%" stopColor={brusResult.emissionColorHex} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={brusResult.emissionColorHex} stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Dark Chamber Background */}
                  <rect x="0" y="0" width="600" height="300" fill="#030712" rx="10" />

                  {/* Incoming UV Excitation Beam (365 nm) from Left */}
                  <path d="M40 150 L200 150" stroke="#a855f7" strokeWidth="6" strokeDasharray="6 3" />
                  <text x="60" y="135" fill="#d8b4fe" fontSize="11" fontWeight="bold">
                    Tia kích thích tử ngoại UV (365 nm)
                  </text>

                  {/* Outer Fluorescent Halos proportional to PLQY and Color */}
                  <circle
                    cx="300"
                    cy="150"
                    r={60 + particleRadiusNm * 18}
                    fill="url(#qdGlow)"
                    opacity="0.75"
                  />
                  <circle
                    cx="300"
                    cy="150"
                    r={30 + particleRadiusNm * 12}
                    fill="url(#qdGlow)"
                    opacity="0.9"
                  />

                  {/* Solid Nanoparticle Core */}
                  <circle
                    cx="300"
                    cy="150"
                    r={Math.max(16, particleRadiusNm * 10)}
                    fill={brusResult.emissionColorHex}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* Dimension Indicator Bar */}
                  <line
                    x1={300 - Math.max(16, particleRadiusNm * 10)}
                    y1="235"
                    x2={300 + Math.max(16, particleRadiusNm * 10)}
                    y2="235"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                  <line x1={300 - Math.max(16, particleRadiusNm * 10)} y1="230" x2={300 - Math.max(16, particleRadiusNm * 10)} y2="240" stroke="#38bdf8" strokeWidth="2" />
                  <line x1={300 + Math.max(16, particleRadiusNm * 10)} y1="230" x2={300 + Math.max(16, particleRadiusNm * 10)} y2="240" stroke="#38bdf8" strokeWidth="2" />
                  <text x="300" y="255" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                    Đường kính D = {brusResult.diameterNm} nm (Bán kính R = {particleRadiusNm} nm)
                  </text>

                  {/* Emitted Light Waves to Right */}
                  <path d="M400 130 Q430 110 460 130 T520 130" fill="none" stroke={brusResult.emissionColorHex} strokeWidth="3" />
                  <path d="M400 150 Q430 130 460 150 T520 150" fill="none" stroke={brusResult.emissionColorHex} strokeWidth="3" />
                  <path d="M400 170 Q430 150 460 170 T520 170" fill="none" stroke={brusResult.emissionColorHex} strokeWidth="3" />
                  <text x="535" y="155" fill={brusResult.emissionColorHex} fontSize="13" fontWeight="extrabold">
                    {brusResult.emissionWavelengthNm} nm
                  </text>
                </svg>
              </div>
            </div>

            {/* Live Photonic Metrics Dashboard */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Độ Rộng Vùng Cấm Eg(R)</span>
                <span className="font-extrabold text-teal-400 text-lg mt-0.5 block">
                  {brusResult.effectiveBandgapEv} eV
                </span>
                <span className="text-[10px] text-ivory-muted">(Bulk: {brusResult.bulkBandgapEv} eV)</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Bước Sóng Phát Xạ λ</span>
                <span className="font-extrabold text-lg mt-0.5 block" style={{ color: brusResult.emissionColorHex }}>
                  {brusResult.emissionWavelengthNm} nm
                </span>
                <span className="text-[10px] text-ivory-muted">{brusResult.colorNameVi}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Hiệu Suất Phát Quang PLQY</span>
                <span className="font-extrabold text-amber-400 text-lg mt-0.5 block">
                  {brusResult.plqyPercent}%
                </span>
                <span className="text-[10px] text-ivory-muted">Chế độ: {brusResult.confinementRegime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parameters, Material Selector & Brus Energy Terms */}
          <div className="lg:col-span-5 space-y-4">
            {/* Material Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Vật Liệu Bán Dẫn Chấm Lượng Tử</span>
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {Object.values(QUANTUM_DOT_CATALOG).map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMaterialId(mat.id);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      selectedMaterialId === mat.id
                        ? 'bg-teal-950/80 border-teal-400 text-teal-200 shadow-md ring-1 ring-teal-400'
                        : 'bg-slate-800/60 border-slate-700/60 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-extrabold block text-ivory font-mono text-sm">{mat.chemicalFormula}</span>
                    <span className="text-[10px] text-ivory-subtle line-clamp-1 block mt-0.5">{mat.nameVi}</span>
                  </button>
                ))}
              </div>

              {/* Radius Slider */}
              <div className="pt-3 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Bán kính hạt nano R:</span>
                  <span className="font-bold text-teal-400 font-mono">{particleRadiusNm.toFixed(1)} nm</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="6.0"
                  step="0.1"
                  value={particleRadiusNm}
                  onChange={(e) => setParticleRadiusNm(+e.target.value)}
                  className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                  <span>1.0 nm (Xanh dương/Tím)</span>
                  <span>2.5 nm (Xanh lá)</span>
                  <span>5.0 nm (Đỏ thẫm)</span>
                </div>
              </div>
            </div>

            {/* Brus Equation Energy Breakdown Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-ivory text-sm">Phương Trình Brus (1984)</h4>
                <span className="text-[10px] text-teal-300 font-mono bg-teal-950 px-2 py-0.5 rounded border border-teal-500/30">
                  Nobel 2023
                </span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded font-mono text-teal-300 text-xs border border-slate-800 leading-relaxed">
                Eg(R) = Eg,bulk + [ħ²π²/(2R²)(1/mₑ* + 1/mₕ*)] - [1.786e²/(4πε₀εᵣR)]
              </div>

              <div className="space-y-1 text-ivory-muted pt-1">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>1. Vùng cấm vật liệu khối (Eg,bulk):</span>
                  <strong className="text-ivory font-mono">+{brusResult.bulkBandgapEv} eV</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>2. Động năng giam cầm lượng tử (∝ 1/R²):</span>
                  <strong className="text-teal-400 font-mono">+{brusResult.confinementEnergyEv} eV</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>3. Lực hút Coulomb electron-lỗ trống (∝ 1/R):</span>
                  <strong className="text-rose-400 font-mono">-{brusResult.coulombEnergyEv} eV</strong>
                </div>
              </div>

              <p className="text-ivory-subtle text-[11px] italic pt-1">
                {brusResult.qledDisplayUtilityVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: QLED TELEVISION DISPLAY RGB SUBPIXEL ARCHITECTURE                 */}
      {/* ========================================================================= */}
      {activeTab === 'QLED_DISPLAY_PIXELS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Tv className="w-5 h-5 text-amber-400" />
                  <span>Cấu Trúc Điểm Ảnh Phụ RGB Màn Hình QLED (Quantum Dot LED Display)</span>
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Đèn nền LED xanh dương (450 nm) bơm năng lượng kích thích các chấm lượng tử InP/ZnS:
                  hạt nano cỡ R ≈ 2.4 nm phát ra màu Xanh Lục thuần khiết, hạt R ≈ 3.8 nm phát ra màu Đỏ tươi,
                  tạo nên dải màu siêu rộng chuẩn điện ảnh DCI-P3 &gt; 98%.
                </p>
              </div>

              {/* RoHS Compliance Badge */}
              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Indium Phosphide (InP) Chuẩn EU RoHS</span>
              </div>
            </div>

            {/* QLED TV Subpixels SVG Illustration */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 700 240" className="w-full h-auto max-h-[240px]">
                {/* Backlight Blue LED Base Bar */}
                <rect x="50" y="190" width="600" height="30" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="2" rx="4" />
                <text x="350" y="210" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">
                  ĐÈN NỀN LED XANH DƯƠNG NĂNG LƯỢNG CAO (BLUE PUMP LED: λ = 450 nm)
                </text>

                {/* Subpixel 1: Blue Subpixel (Direct pass-through) */}
                <rect x="100" y="40" width="130" height="130" fill="#0284c7" opacity="0.85" rx="8" stroke="#38bdf8" strokeWidth="2" />
                <text x="165" y="80" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="extrabold">BLUE</text>
                <text x="165" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="11">Xuyên qua trực tiếp</text>
                <text x="165" y="125" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">λ = 450 nm</text>

                {/* Subpixel 2: Green InP QD Subpixel */}
                <rect x="285" y="40" width="130" height="130" fill={qledGreen.emissionColorHex} opacity="0.85" rx="8" stroke="#ffffff" strokeWidth="2" />
                <text x="350" y="80" textAnchor="middle" fill="#064e3b" fontSize="16" fontWeight="extrabold">GREEN</text>
                <text x="350" y="105" textAnchor="middle" fill="#064e3b" fontSize="11">Chấm InP (R={qledGreenRadius}nm)</text>
                <text x="350" y="125" textAnchor="middle" fill="#064e3b" fontSize="12" fontWeight="bold">λ = {qledGreen.emissionWavelengthNm} nm</text>

                {/* Subpixel 3: Red InP QD Subpixel */}
                <rect x="470" y="40" width="130" height="130" fill={qledRed.emissionColorHex} opacity="0.85" rx="8" stroke="#ffffff" strokeWidth="2" />
                <text x="535" y="80" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="extrabold">RED</text>
                <text x="535" y="105" textAnchor="middle" fill="#ffe4e6" fontSize="11">Chấm InP (R={qledRedRadius}nm)</text>
                <text x="535" y="125" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">λ = {qledRed.emissionWavelengthNm} nm</text>
              </svg>
            </div>

            {/* Subpixel Fine Tuning Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Bán kính chấm lượng tử Lục (InP Green):</span>
                  <span className="font-bold text-emerald-400 font-mono">{qledGreenRadius} nm (λ = {qledGreen.emissionWavelengthNm} nm)</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="3.0"
                  step="0.05"
                  value={qledGreenRadius}
                  onChange={(e) => setQledGreenRadius(+e.target.value)}
                  className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Bán kính chấm lượng tử Đỏ (InP Red):</span>
                  <span className="font-bold text-rose-400 font-mono">{qledRedRadius} nm (λ = {qledRed.emissionWavelengthNm} nm)</span>
                </div>
                <input
                  type="range"
                  min="3.2"
                  max="4.5"
                  step="0.05"
                  value={qledRedRadius}
                  onChange={(e) => setQledRedRadius(+e.target.value)}
                  className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: CORE-SHELL HETEROSTRUCTURE & TYPE-I BAND ALIGNMENT                */}
      {/* ========================================================================= */}
      {activeTab === 'CORE_SHELL_PASSIVATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Energy Band Alignment Diagram */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Giản Đồ Vùng Năng Lượng Cấu Trúc Lõi-Vỏ (Core-Shell)</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-950/80 text-sky-300 border border-sky-500/50">
                {selectedCoreShell.alignmentType}
              </span>
            </div>

            {/* Band Alignment SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 540 260" className="w-full h-auto max-h-[260px]">
                {/* Conduction Band (CB) and Valence Band (VB) */}
                {/* Shell Left */}
                <rect x="60" y="40" width="120" height="30" fill="#334155" />
                <text x="120" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Vỏ (Shell: {selectedCoreShell.shellMaterial})</text>
                <rect x="60" y="190" width="120" height="30" fill="#334155" />

                {/* Core Middle */}
                <rect x="210" y="70" width="120" height="30" fill="#0284c7" />
                <text x="270" y="90" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Lõi (Core: {selectedCoreShell.coreMaterial})</text>
                <rect x="210" y="160" width="120" height="30" fill="#0284c7" />

                {/* Shell Right */}
                <rect x="360" y="40" width="120" height="30" fill="#334155" />
                <text x="420" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Vỏ (Shell: {selectedCoreShell.shellMaterial})</text>
                <rect x="360" y="190" width="120" height="30" fill="#334155" />

                {/* Trapped Electron in Core */}
                <circle cx="270" cy="85" r="5" fill="#facc15" />
                <text x="270" y="105" textAnchor="middle" fill="#fef08a" fontSize="9">e⁻ (Giam cầm)</text>

                {/* Trapped Hole in Core */}
                <circle cx="270" cy="175" r="5" fill="#f43f5e" />
                <text x="270" y="155" textAnchor="middle" fill="#fca5a5" fontSize="9">h⁺ (Giam cầm)</text>

                {/* Labels */}
                <text x="30" y="60" fill="#64748b" fontSize="10">CB</text>
                <text x="30" y="210" fill="#64748b" fontSize="10">VB</text>
              </svg>
            </div>

            <p className="text-xs text-ivory-muted bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {selectedCoreShell.explanationVi}
            </p>
          </div>

          {/* Right Column: Profiles Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-ivory text-sm">Các Cặp Dị Thể Vỏ-Lõi Tiêu Biểu:</h4>
            {CORE_SHELL_PROFILES.map((profile, idx) => (
              <div
                key={profile.coreMaterial + profile.shellMaterial}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedProfileIndex(idx);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-xs space-y-1 ${
                  selectedProfileIndex === idx
                    ? 'bg-sky-950/70 border-sky-400 text-sky-200 shadow-md ring-1 ring-sky-400'
                    : 'bg-slate-900 border-slate-800 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ivory font-mono text-sm">
                    {profile.coreMaterial} / {profile.shellMaterial}
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-sky-400 font-bold">
                    Hiệu suất thụ động hóa: {profile.passivationEfficiencyPercent}%
                  </span>
                </div>
                <p className="text-[11px] text-ivory-muted line-clamp-2">
                  {profile.explanationVi}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
