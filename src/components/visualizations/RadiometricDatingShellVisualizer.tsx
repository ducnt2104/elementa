// src/components/visualizations/RadiometricDatingShellVisualizer.tsx
// Interactive Visualizer: Nuclear Shell Model, J^P Spin-Parity, Carbon-14 Dating & U-Pb Concordia Geochronology
// Standardized against Vietnam GDPT 2018 (Hóa 10 & Vật lí 12) & IUPAC / NIST Geochronology

import React, { useState, useMemo } from 'react';
import {
  Atom,
  Clock,
  Compass,
  Layers,
  Sparkles,
  Shield,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  Search,
  Calendar,
  Mountain
} from 'lucide-react';
import {
  NUCLEAR_SHELL_LEVELS,
  MAGIC_NUMBERS,
  DOUBLY_MAGIC_ISOTOPES,
  predictNuclearGroundState,
  calculateRadiocarbonAge,
  calculateUraniumLeadConcordia,
  DoublyMagicIsotope
} from '../../domain/nuclearShellModelEngine';
import { sound } from '../../audio/soundEngine';

type DatingTabMode = 'NUCLEAR_SHELL_JP' | 'RADIOCARBON_14_DATING' | 'URANIUM_LEAD_CONCORDIA';

export const RadiometricDatingShellVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DatingTabMode>('NUCLEAR_SHELL_JP');

  // Mode 1: Nuclear Shell State
  const [selectedZ, setSelectedZ] = useState<number>(8); // Oxygen (Z=8)
  const [selectedN, setSelectedN] = useState<number>(9); // 17O (N=9)
  const [highlightMagicOnly, setHighlightMagicOnly] = useState<boolean>(false);

  // Mode 2: Carbon-14 Dating State
  const [c14ActivityPercent, setC14ActivityPercent] = useState<number>(76.2); // Dong Son sample
  const [selectedSampleName, setSelectedSampleName] = useState<string>('Trống đồng Đông Sơn (Mẩu gỗ tang trống)');

  // Mode 3: Uranium-Lead Concordia State
  const [ratio206_238, setRatio206_238] = useState<number>(0.979); // ~4.4 Ga
  const [ratio207_235, setRatio207_235] = useState<number>(75.8);

  // Calculations
  const groundStatePrediction = useMemo(() => {
    return predictNuclearGroundState(selectedZ, selectedN);
  }, [selectedZ, selectedN]);

  const c14Result = useMemo(() => {
    return calculateRadiocarbonAge(c14ActivityPercent, selectedSampleName);
  }, [c14ActivityPercent, selectedSampleName]);

  const upbResult = useMemo(() => {
    return calculateUraniumLeadConcordia(ratio206_238, ratio207_235);
  }, [ratio206_238, ratio207_235]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Atom className="w-4 h-4 text-indigo-400" />
              <span>Chuyên Đề GDPT 2018 · Mô Hình Vỏ Hạt Nhân, Số Kỳ Diệu & Định Tuổi Phóng Xạ (Lớp 10 & 12)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Mô Hình Vỏ Hạt Nhân Mayer-Jensen, Spin-Parity (J^P) & Định Niên Đại Phóng Xạ (¹⁴C, U-Pb)
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá năng lượng tách mức Spin-Quỹ đạo giải thích số kỳ diệu (2, 8, 20, 28, 50, 82, 126),
              dự đoán trạng thái cơ bản Spin-Parity của hạt nhân, định tuổi cổ vật khảo cổ bằng Carbon-14
              và biểu đồ hòa hợp Wetherill Concordia định tuổi vỏ Trái Đất (4.54 tỷ năm).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-indigo-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('NUCLEAR_SHELL_JP');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'NUCLEAR_SHELL_JP'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Mô Hình Vỏ &amp; Spin J^P</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('RADIOCARBON_14_DATING');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'RADIOCARBON_14_DATING'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Định Tuổi Carbon-14</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('URANIUM_LEAD_CONCORDIA');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'URANIUM_LEAD_CONCORDIA'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Địa Thời Học U-Pb Concordia</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: NUCLEAR SHELL MODEL & J^P GROUND STATE PREDICTOR                  */}
      {/* ========================================================================= */}
      {activeTab === 'NUCLEAR_SHELL_JP' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Energy Level Ladder SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-ivory text-base">
                    Thang Năng Lượng Phân Mức Vỏ Hạt Nhân (Tương Tác Spin-Quỹ Đạo Mayer-Jensen)
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                  groundStatePrediction.isDoublyMagic
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                    : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50'
                }`}>
                  {groundStatePrediction.isDoublyMagic ? 'KÉP KỲ DIỆU (DOUBLY MAGIC)' : `HẠT NHÂN (A=${groundStatePrediction.a})`}
                </span>
              </div>

              {/* Energy Level Ladder Diagram */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 680 390" className="w-full h-auto max-h-[390px]">
                  <defs>
                    <linearGradient id="magicGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Axis */}
                  <line x1="60" y1="360" x2="60" y2="20" stroke="#475569" strokeWidth="2" />
                  <polygon points="60,15 55,25 65,25" fill="#475569" />
                  <text x="50" y="25" textAnchor="end" fill="#94a3b8" fontSize="10">Năng lượng E</text>

                  {/* Draw Energy Levels from bottom (1s1/2) to top */}
                  {NUCLEAR_SHELL_LEVELS.slice(0, 11).map((lvl, index) => {
                    const yPos = 345 - index * 30;
                    const isMagic = !!lvl.magicNumber;
                    return (
                      <g key={lvl.id}>
                        {/* Energy Level Line */}
                        <line
                          x1="80"
                          y1={yPos}
                          x2="480"
                          y2={yPos}
                          stroke={isMagic ? '#fbbf24' : '#6366f1'}
                          strokeWidth={isMagic ? 3 : 1.5}
                          strokeDasharray={isMagic ? 'none' : '2 2'}
                        />

                        {/* Level Label */}
                        <text
                          x="95"
                          y={yPos - 5}
                          fill={isMagic ? '#fef08a' : '#c7d2fe'}
                          fontSize="11"
                          fontWeight={isMagic ? 'bold' : 'normal'}
                        >
                          {lvl.label} (sức chứa: {lvl.capacity})
                        </text>

                        {/* Cumulative capacity badge */}
                        <text x="470" y={yPos - 5} textAnchor="end" fill="#94a3b8" fontSize="10">
                          Σ = {lvl.cumulativeNucleons}
                        </text>

                        {/* Magic Gap Band if Magic Number */}
                        {isMagic && (
                          <g>
                            <rect x="495" y={yPos - 12} width="165" height="24" fill="url(#magicGlow)" rx="6" />
                            <text x="575" y={yPos + 4} textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="extrabold">
                              SỐ KỲ DIỆU {lvl.magicNumber}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Ground State Spin-Parity Prediction Box */}
            <div className="mt-4 p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-ivory text-sm">
                  Dự Đoán Trạng Thái Cơ Bản Theo Mô Hình Đơn Hạt:
                </span>
                <span className="text-xl font-extrabold text-amber-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-amber-500/30">
                  J^P = {groundStatePrediction.predictedSpinParity}
                </span>
              </div>
              <p className="text-ivory-muted leading-relaxed">
                {groundStatePrediction.explanationVi}
              </p>
              <div className="flex gap-4 pt-1 text-[11px] text-ivory-subtle">
                <span>Dạng hình học: <strong className="text-indigo-300">{groundStatePrediction.deformedShape}</strong></span>
                <span>Phân lớp hóa trị: <strong className="text-indigo-300">{groundStatePrediction.valenceShell}</strong></span>
                <span>Loại hạt nhân: <strong className="text-indigo-300">{groundStatePrediction.nucleusType}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Nucles Selector & Doubly Magic Isotopes */}
          <div className="lg:col-span-5 space-y-4">
            {/* Nuclide Input Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Cấu Hình Số Hạt Nhân (Z Protons, N Neutrons)</span>
                </h4>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedZ(8);
                    setSelectedN(9);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>¹⁷O</span>
                </button>
              </div>

              {/* Slider Z */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Số hiệu nguyên tử Z (Protons):</span>
                  <span className="font-bold text-indigo-400">Z = {selectedZ} {MAGIC_NUMBERS.includes(selectedZ) ? '★ Kỳ diệu' : ''}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="82"
                  step="1"
                  value={selectedZ}
                  onChange={(e) => setSelectedZ(+e.target.value)}
                  className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider N */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Số hạt Neutron N:</span>
                  <span className="font-bold text-emerald-400">N = {selectedN} {MAGIC_NUMBERS.includes(selectedN) ? '★ Kỳ diệu' : ''}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="126"
                  step="1"
                  value={selectedN}
                  onChange={(e) => setSelectedN(+e.target.value)}
                  className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-ivory-subtle block mb-1.5">Chọn nhanh đồng vị thực nghiệm:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '¹²C (6,6)', z: 6, n: 6 },
                    { label: '¹³C (6,7)', z: 6, n: 7 },
                    { label: '¹⁶O (8,8)', z: 8, n: 8 },
                    { label: '¹⁷O (8,9)', z: 8, n: 9 },
                    { label: '⁴⁰Ca (20,20)', z: 20, n: 20 },
                    { label: '²⁰⁸Pb (82,126)', z: 82, n: 126 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedZ(preset.z);
                        setSelectedN(preset.n);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-ivory text-xs font-mono"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Doubly Magic Isotopes Catalog */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Đồng Vị Kép Kỳ Diệu (Doubly Magic) &amp; Đảo Bền Vững</span>
              </h4>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {DOUBLY_MAGIC_ISOTOPES.map((iso) => (
                  <div
                    key={iso.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedZ(iso.z);
                      setSelectedN(iso.n);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 font-mono text-sm">{iso.symbol} ({iso.nameVi})</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-ivory-subtle">
                        Z={iso.z}, N={iso.n}
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory-muted line-clamp-2">
                      {iso.stabilityNoteVi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: RADIOCARBON-14 ARCHEOLOGICAL DATING SIMULATOR                     */}
      {/* ========================================================================= */}
      {activeTab === 'RADIOCARBON_14_DATING' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Định Niên Đại Cổ Vật Bằng Đồng Vị Phóng Xạ Carbon-14 (t₁/₂ = 5,730 năm)</span>
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Đo hoạt độ phóng xạ beta của đồng vị ¹⁴C trong các mẫu hữu cơ khảo cổ học (gỗ, than củi, xương)
                  hiệu chuẩn theo niên đại vòng cây Dendrochronology (IntCal20).
                </p>
              </div>

              {/* Age result badge */}
              <div className="bg-slate-950/90 px-4 py-2 rounded-xl border border-amber-500/40 text-right">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Tuổi Khảo Cổ Ước Tính</span>
                <span className="text-2xl font-extrabold text-amber-400">
                  {c14Result.calculatedAgeBeforePresentYears} năm BP
                </span>
                <span className="text-xs text-ivory-muted block">
                  ({c14Result.calendarDateRangeVi})
                </span>
              </div>
            </div>

            {/* Activity Slider */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ivory">
                  Tỷ lệ hoạt độ phóng xạ ¹⁴C còn lại so với mẫu sinh vật hiện đại:
                </span>
                <span className="font-extrabold text-amber-400 text-sm font-mono">
                  {c14ActivityPercent.toFixed(1)}% (A/A₀)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="100"
                step="0.5"
                value={c14ActivityPercent}
                onChange={(e) => setC14ActivityPercent(+e.target.value)}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                <span>0.5% (~44,000 năm BP)</span>
                <span>25% (2 chu kỳ: 11,460 BP)</span>
                <span>50% (1 chu kỳ: 5,730 BP)</span>
                <span>100% (Hiện đại, 1950)</span>
              </div>
            </div>

            {/* Archaeological Presets Selection */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { name: 'Mẫu gỗ tang trống đồng Đông Sơn (Việt Nam)', activity: 76.2 },
                { name: 'Mẩu vải lanh quấn xác ướp Pharaoh Tutankhamun', activity: 67.4 },
                { name: 'Than củi hang Tiên Sơn / Hòa Bình', activity: 28.5 },
                { name: 'Hóa thạch xương voi ma mút Kỷ Băng Hà', activity: 3.2 }
              ].map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => {
                    sound.playUiClick();
                    setC14ActivityPercent(sample.activity);
                    setSelectedSampleName(sample.name);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all text-xs ${
                    c14ActivityPercent === sample.activity
                      ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-400'
                      : 'bg-slate-950/60 border-slate-800 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold block text-ivory line-clamp-1">{sample.name}</span>
                  <span className="text-[11px] text-amber-400/80 font-mono mt-1 block">
                    Hoạt độ: {sample.activity}%
                  </span>
                </button>
              ))}
            </div>

            {/* Radiocarbon Exponential Decay SVG Diagram */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 700 240" className="w-full h-auto max-h-[240px]">
                {/* Axes */}
                <line x1="60" y1="210" x2="660" y2="210" stroke="#475569" strokeWidth="2" />
                <line x1="60" y1="210" x2="60" y2="20" stroke="#475569" strokeWidth="2" />
                <text x="650" y="200" fill="#94a3b8" fontSize="10">Thời gian (năm)</text>
                <text x="50" y="25" textAnchor="end" fill="#94a3b8" fontSize="10">¹⁴C (%)</text>

                {/* Exponential Decay Curve: N(t) = 100 * exp(-t / 8267) */}
                <path
                  d="M60 30 Q180 120 300 165 T500 200 T660 208"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />

                {/* Half-life ticks */}
                <line x1="180" y1="205" x2="180" y2="215" stroke="#94a3b8" />
                <text x="180" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">5,730 (1 t₁/₂)</text>

                <line x1="300" y1="205" x2="300" y2="215" stroke="#94a3b8" />
                <text x="300" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">11,460 (2 t₁/₂)</text>

                <line x1="420" y1="205" x2="420" y2="215" stroke="#94a3b8" />
                <text x="420" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">17,190 (3 t₁/₂)</text>

                {/* Current sample point */}
                <circle
                  cx={60 + (c14Result.calculatedAgeBeforePresentYears / 30000) * 450}
                  cy={210 - (c14ActivityPercent / 100) * 180}
                  r="6"
                  fill="#f43f5e"
                />
                <text
                  x={75 + (c14Result.calculatedAgeBeforePresentYears / 30000) * 450}
                  y={205 - (c14ActivityPercent / 100) * 180}
                  fill="#fca5a5"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Mẫu: {c14Result.calculatedAgeBeforePresentYears} năm
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: URANIUM-LEAD DUAL ISOCHRON CONCORDIA GEOCHRONOLOGY                */}
      {/* ========================================================================= */}
      {activeTab === 'URANIUM_LEAD_CONCORDIA' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Wetherill Concordia Curve SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <Mountain className="w-5 h-5 text-cyan-400" />
                <span>Đồ Thị Hòa Hợp Wetherill Concordia (Hệ Đồng Vị Urani - Chì)</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                upbResult.isConcordant
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              }`}>
                {upbResult.isConcordant ? 'CONCORDANT (HÒA HỢP)' : 'DISCORDANT (BẤT HÒA HỢP)'}
              </span>
            </div>

            {/* Concordia Diagram SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 540 300" className="w-full h-auto max-h-[300px]">
                {/* Axes */}
                <line x1="60" y1="260" x2="500" y2="260" stroke="#475569" strokeWidth="2" />
                <line x1="60" y1="260" x2="60" y2="30" stroke="#475569" strokeWidth="2" />
                <text x="490" y="250" textAnchor="end" fill="#94a3b8" fontSize="10">²⁰⁷Pb / ²³⁵U</text>
                <text x="50" y="35" textAnchor="end" fill="#94a3b8" fontSize="10">²⁰⁶Pb / ²³⁸U</text>

                {/* Curved Concordia Curve */}
                <path
                  d="M60 260 Q240 220 380 130 T480 50"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Concordia Ga Marks */}
                <circle cx="160" cy="245" r="3" fill="#38bdf8" />
                <text x="160" y="240" textAnchor="middle" fill="#bae6fd" fontSize="8">1.0 Ga</text>

                <circle cx="280" cy="200" r="3" fill="#38bdf8" />
                <text x="280" y="195" textAnchor="middle" fill="#bae6fd" fontSize="8">2.5 Ga</text>

                <circle cx="420" cy="100" r="3" fill="#38bdf8" />
                <text x="420" y="95" textAnchor="middle" fill="#bae6fd" fontSize="8">4.0 Ga</text>

                <circle cx="465" cy="65" r="4" fill="#fbbf24" />
                <text x="465" y="55" textAnchor="middle" fill="#fde047" fontSize="9" fontWeight="bold">
                  4.4 Ga (Jack Hills Zircon)
                </text>

                {/* Active Sample Point */}
                <circle
                  cx={60 + Math.min(420, (ratio207_235 / 80) * 410)}
                  cy={260 - Math.min(230, (ratio206_238 / 1.0) * 200)}
                  r="7"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={75 + Math.min(420, (ratio207_235 / 80) * 410)}
                  y={255 - Math.min(230, (ratio206_238 / 1.0) * 200)}
                  fill="#fca5a5"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Mẫu: {upbResult.age206Ga} Ga
                </text>
              </svg>
            </div>

            <p className="text-xs text-ivory-muted bg-slate-950 p-3 rounded-xl border border-slate-800">
              {upbResult.interpretationVi}
            </p>
          </div>

          {/* Right Column: Parameters & Geological Epochs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Tỉ Lệ Đồng Vị Khối Phổ Kế Tinh Thể Zircon</span>
              </h4>

              {/* Slider 1: 206Pb / 238U */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Tỉ lệ ²⁰⁶Pb / ²³⁸U:</span>
                  <span className="font-bold text-cyan-400">{ratio206_238.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.1"
                  step="0.01"
                  value={ratio206_238}
                  onChange={(e) => setRatio206_238(+e.target.value)}
                  className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 2: 207Pb / 235U */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Tỉ lệ ²⁰⁷Pb / ²³⁵U:</span>
                  <span className="font-bold text-sky-400">{ratio207_235.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="85"
                  step="0.5"
                  value={ratio207_235}
                  onChange={(e) => setRatio207_235(+e.target.value)}
                  className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Quick geological rock presets */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-ivory-subtle block mb-1.5">Mẫu địa chất tiêu chuẩn:</span>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setRatio206_238(0.979);
                      setRatio207_235(75.8);
                    }}
                    className="p-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs"
                  >
                    <strong className="text-amber-400 block">Zircon Jack Hills (Tây Úc) ~4.40 Ga</strong>
                    <span className="text-[11px] text-ivory-muted">Mẩu khoáng vật vỏ Trái Đất cổ nhất từng được phát hiện</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setRatio206_238(0.35);
                      setRatio207_235(12.0);
                    }}
                    className="p-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs"
                  >
                    <strong className="text-rose-400 block">Mẫu Zircon Biến Chất Nhiệt (Discordant)</strong>
                    <span className="text-[11px] text-ivory-muted">Chì bị rò rỉ khi đá magma bị nung nóng lại sau kết tinh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Geological Era Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">Kỷ Nguyên Địa Chất Tương Ứng:</span>
              <p className="text-ivory-muted leading-relaxed">
                {upbResult.geologicalEpochVi}
              </p>
              <div className="pt-2 border-t border-slate-800 text-ivory-subtle text-[11px]">
                Độ trùng khớp hai chuỗi phân rã (Concordance): <strong className="text-emerald-400">{upbResult.concordancePercent}%</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
