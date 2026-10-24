import React, { useState, useMemo } from 'react';
import {
  Flame,
  Fuel,
  Activity,
  Sliders,
  ShieldCheck,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  TrendingDown,
  Gauge,
  Factory,
  ArrowRight
} from 'lucide-react';
import {
  PETROLEUM_FRACTIONS_CATALOG,
  VIETNAM_CRUDE_OILS,
  FCC_MECHANISM_STEPS,
  PURE_HYDROCARBONS_OCTANE,
  calculateGasolineBlendOctane,
  PetroleumFraction,
  VietnamCrudeOilProfile
} from '../../domain/petroleumRefiningEngine';
import { sound } from '../../audio/soundEngine';

type PetroleumTabMode = 'DISTILLATION_COLUMN' | 'CATALYTIC_CRACKING_FCC' | 'OCTANE_RATING_BIOFUEL';

export const PetroleumRefiningVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PetroleumTabMode>('DISTILLATION_COLUMN');

  // Mode 1: Distillation state
  const [selectedCrudeId, setSelectedCrudeId] = useState<string>('BACH_HO');
  const [selectedFractionId, setSelectedFractionId] = useState<string>('LIGHT_NAPHTHA_GASOLINE');

  // Mode 2: FCC state
  const [selectedFccStep, setSelectedFccStep] = useState<number>(1);

  // Mode 3: Octane & Biofuel state
  const [baseGasolineRon, setBaseGasolineRon] = useState<number>(92.0);
  const [ethanolPercent, setEthanolPercent] = useState<number>(5.0); // E5

  // Calculations
  const activeCrude = useMemo(() => {
    return VIETNAM_CRUDE_OILS[selectedCrudeId] || VIETNAM_CRUDE_OILS.BACH_HO;
  }, [selectedCrudeId]);

  const activeFraction = useMemo(() => {
    return PETROLEUM_FRACTIONS_CATALOG.find(f => f.id === selectedFractionId) || PETROLEUM_FRACTIONS_CATALOG[1];
  }, [selectedFractionId]);

  const blendResult = useMemo(() => {
    return calculateGasolineBlendOctane(baseGasolineRon, ethanolPercent);
  }, [baseGasolineRon, ethanolPercent]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Fuel className="w-4 h-4 text-amber-400" />
              <span>Chuyên Đề GDPT 2018 · Chế Biến Dầu Mỏ, Cracking Xúc Tác & Xăng Sinh Học (Lớp 11)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Lọc Hóa Dầu, Tháp Chưng Cất Phân Đoạn, Cracking FCC & Chỉ Số Octan (E5/E10)
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá phân đoạn dầu mỏ thô Bạch Hổ tại Nhà máy Lọc dầu Dung Quất, cơ chế phân cắt beta cacbocation
              trên zeolit Y, và tính toán chỉ số octan chống kích nổ động cơ theo chuẩn TCVN 7716:2011.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-amber-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('DISTILLATION_COLUMN');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'DISTILLATION_COLUMN'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>Tháp Chưng Cất Dầu Thô</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('CATALYTIC_CRACKING_FCC');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'CATALYTIC_CRACKING_FCC'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cracking Xúc Tác Zeolit Y</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('OCTANE_RATING_BIOFUEL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'OCTANE_RATING_BIOFUEL'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Chỉ Số Octan & Xăng E5/E10</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: FRACTIONAL DISTILLATION TOWER                                     */}
      {/* ========================================================================= */}
      {activeTab === 'DISTILLATION_COLUMN' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Crude Oil Specs (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Crude Oil Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Fuel className="w-4 h-4" />
                1. Nguồn Dầu Thô Nạp Liệu
              </span>

              <div className="space-y-2">
                {(Object.keys(VIETNAM_CRUDE_OILS) as Array<keyof typeof VIETNAM_CRUDE_OILS>).map(cId => {
                  const crude = VIETNAM_CRUDE_OILS[cId];
                  return (
                    <button
                      key={cId}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedCrudeId(cId);
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        selectedCrudeId === cId
                          ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/40'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-ivory">{crude.nameVi}</span>
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                          API {crude.apiGravity}°
                        </span>
                      </div>
                      <div className="text-[11px] text-ivory-muted mt-1 font-mono">
                        Lưu huỳnh: {crude.sulfurContentPercent}% S · Đông đặc: {crude.pourPointCelsius}°C
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Crude Details Callout */}
              <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl text-xs space-y-1">
                <div className="text-amber-400 font-bold">{activeCrude.oilFieldVi}</div>
                <p className="text-ivory-muted">{activeCrude.refineryMatchVi}</p>
              </div>
            </div>

            {/* Fraction Info Details Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Phân Đoạn Đang Chọn (Đĩa {activeFraction.trayPositionFromTop}/6)
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {activeFraction.carbonNumberRange}
                </span>
              </div>

              <h4 className="text-sm font-bold text-ivory">{activeFraction.nameVi}</h4>
              <div className="text-xs text-amber-300 font-mono">
                Dải nhiệt độ sôi: {activeFraction.boilingRangeCelsius[0]}°C ⟶ {activeFraction.boilingRangeCelsius[1]}°C
              </div>

              <div className="text-xs text-ivory-muted">
                <strong className="text-ivory">Thành phần chính:</strong> {activeFraction.primaryHydrocarbonsVi}
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs">
                <strong className="text-amber-400">Sản phẩm thương phẩm tại Việt Nam:</strong>
                <ul className="list-disc list-inside text-ivory-muted mt-1 space-y-0.5">
                  {activeFraction.vietnamCommercialProductsVi.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Distillation Tower Visual Canvas (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-ivory">
                    Mặt Cắt Tháp Chưng Cất Khí Quyển (CDU - Crude Distillation Unit)
                  </h3>
                </div>
                <div className="text-xs font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-700/30">
                  Nhà máy Lọc dầu Dung Quất
                </div>
              </div>

              {/* Dynamic SVG Distillation Column */}
              <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                <svg viewBox="0 0 540 280" className="w-full h-auto">
                  {/* Distillation Tower Main Cylinder */}
                  <rect x="180" y="20" width="180" height="230" rx="15" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />

                  {/* Temperature Gradient from Bottom (360°C) to Top (40°C) */}
                  <defs>
                    <linearGradient id="towerGradient" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                      <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="70%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <rect x="183" y="23" width="174" height="224" rx="12" fill="url(#towerGradient)" />

                  {/* 6 Distillation Trays */}
                  {PETROLEUM_FRACTIONS_CATALOG.map((f, index) => {
                    const yPos = 38 + index * 36;
                    const isSelected = selectedFractionId === f.id;

                    return (
                      <g
                        key={f.id}
                        className="cursor-pointer transition-all"
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedFractionId(f.id);
                        }}
                      >
                        {/* Horizontal Bubble Cap Tray Line */}
                        <line x1="185" y1={yPos} x2="355" y2={yPos} stroke={isSelected ? '#f59e0b' : '#64748b'} strokeWidth={isSelected ? '2.5' : '1.5'} strokeDasharray="4 2" />

                        {/* Outlet Pipe Right */}
                        <path d={`M 355,${yPos} L 400,${yPos}`} stroke={isSelected ? '#f59e0b' : '#64748b'} strokeWidth="2" />
                        <circle cx="400" cy={yPos} r="4" fill={isSelected ? '#f59e0b' : '#475569'} />

                        {/* Fraction Name on the Right */}
                        <text
                          x="410"
                          y={yPos + 4}
                          fill={isSelected ? '#fbbf24' : '#94a3b8'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {f.nameVi.split(' ')[0]} ({f.carbonNumberRange})
                        </text>

                        {/* Temperature Label on the Left */}
                        <text
                          x="170"
                          y={yPos + 4}
                          fill="#cbd5e1"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {f.boilingRangeCelsius[0]}°C
                        </text>
                      </g>
                    );
                  })}

                  {/* Crude Oil Inlet Pipe Bottom Left */}
                  <g transform="translate(60, 215)">
                    <rect x="0" y="0" width="120" height="18" rx="4" fill="#334155" />
                    <text x="60" y="12" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Dầu thô nung 360°C ➔
                    </text>
                  </g>

                  {/* Furnace / Heater Box */}
                  <g transform="translate(60, 160)">
                    <rect x="0" y="0" width="85" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <Flame x="30" y="5" className="w-6 h-6 text-amber-400 animate-pulse" />
                    <text x="42" y="38" fill="#fecaca" fontSize="7" fontFamily="monospace" textAnchor="middle">
                      Lò đốt 380°C
                    </text>
                  </g>
                </svg>
              </div>

              {/* Subtext and Process Explanation */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-ivory-muted leading-relaxed">
                <strong className="text-amber-400">Nguyên lý chưng cất phân đoạn dầu mỏ:</strong> Các phân tử hydrocarbon có nhiệt độ sôi phụ thuộc
                vào phân tử khối và số nguyên tử cacbon. Hỗn hợp dầu thô sau khi nung nóng 360-380°C đi vào đáy tháp; các phân tử nhẹ (C₁-C₄, C₅-C₁₀) bay hơi
                lên đỉnh tháp nơi nhiệt độ mát hơn (~40°C) để ngưng tụ, trong khi các hydrocarbon nặng mạch dài (C₁₅-C₃₀ và cặn) ngưng tụ ở các đĩa thấp hơn hoặc lắng đáy.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FLUID CATALYTIC CRACKING (FCC) & CARBOCATION MECHANISM           */}
      {/* ========================================================================= */}
      {activeTab === 'CATALYTIC_CRACKING_FCC' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                  <Zap className="w-4 h-4" />
                  Cơ Chế Phản Ứng Lớp 11 · Cracking Xúc Tác Trong Lòng Mao Quản Zeolit Y
                </span>
                <h3 className="text-xl font-extrabold text-ivory">
                  Cơ Chế Cacbocation & Phân Cắt Beta (Beta-Scission) Biến Dầu Nặng Thành Xăng Cao Cấp
                </h3>
              </div>

              {/* Step buttons */}
              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                {[1, 2, 3].map(stepNum => (
                  <button
                    key={stepNum}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedFccStep(stepNum);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedFccStep === stepNum
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    Bước {stepNum}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: Step Card Details (7 cols) */}
              <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                {(() => {
                  const step = FCC_MECHANISM_STEPS[selectedFccStep - 1];
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          GIAI ĐOẠN {step.stepIndex} / 3: {step.stepNameVi}
                        </span>
                        <span className="text-xs font-mono text-cyan-300">
                          {step.carbocationIntermediateTypeVi}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm font-mono text-amber-200">
                        {step.chemicalEquationVi}
                      </div>

                      <p className="text-xs text-ivory-muted leading-relaxed">{step.descriptionVi}</p>

                      <div className="pt-2 border-t border-slate-700/60 text-[11px] text-ivory-muted">
                        <strong className="text-amber-300">Vai trò xúc tác Zeolit Y:</strong> {step.catalystActiveSiteVi}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right: Carbocation Stability Hierarchy (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Quy Luật Độ Bền Cacbocation & Tạo Nhánh (Tăng RON)
                </span>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 flex justify-between items-center">
                    <div>
                      <strong className="text-emerald-300">Cacbocation Bậc 3 (3°):</strong>
                      <div className="text-[10px] text-ivory-muted">R₃C⁺ (3 nhóm ankyl đẩy e + 9 liên kết C-H siêu liên hợp)</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Bền nhất</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/40 flex justify-between items-center">
                    <div>
                      <strong className="text-amber-300">Cacbocation Bậc 2 (2°):</strong>
                      <div className="text-[10px] text-ivory-muted">R₂CH⁺ (Bền trung bình)</div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">Trung bình</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-600/40 flex justify-between items-center">
                    <div>
                      <strong className="text-red-300">Cacbocation Bậc 1 (1°):</strong>
                      <div className="text-[10px] text-ivory-muted">RCH₂⁺ (Kém bền, nhanh chóng chuyển vị)</div>
                    </div>
                    <span className="text-xs font-bold text-red-400">Kém bền</span>
                  </div>
                </div>

                <p className="text-[11px] text-ivory-muted leading-relaxed pt-1">
                  Nhờ xu hướng chuyển vị 1,2-hydride shift và 1,2-alkyl shift để tạo thành cacbocation bậc 3 bền nhất,
                  sản phẩm xăng của quá trình cracking FCC chứa hàm lượng iso-ankan (nhánh) rất cao, làm tăng vọt chỉ số octan so với xăng chưng cất trực tiếp.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: OCTANE RATING & BIOFUEL BLENDING (E5 / E10)                       */}
      {/* ========================================================================= */}
      {activeTab === 'OCTANE_RATING_BIOFUEL' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  Pha Chế Xăng Sinh Học (E5 / E10)
                </span>

                {/* Base Gasoline RON */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>RON xăng khoáng gốc:</span>
                    <strong className="text-amber-300">RON {baseGasolineRon}</strong>
                  </div>
                  <input
                    type="range"
                    min="85"
                    max="96"
                    step="1"
                    value={baseGasolineRon}
                    onChange={(e) => setBaseGasolineRon(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                    <span>RON 88</span>
                    <span>RON 92 (Chuẩn E5)</span>
                    <span>RON 95</span>
                  </div>
                </div>

                {/* Ethanol percentage */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Tỉ lệ Cồn Sinh Học (Etanol E100):</span>
                    <strong className="text-emerald-400 font-bold">{ethanolPercent}% (E{Math.round(ethanolPercent)})</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={ethanolPercent}
                    onChange={(e) => setEthanolPercent(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                    <span>0% (Xăng E0)</span>
                    <span>5% (Xăng E5)</span>
                    <span>10% (Xăng E10)</span>
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setBaseGasolineRon(92);
                      setEthanolPercent(5);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300 hover:bg-slate-700"
                  >
                    Chuẩn E5 RON 92
                  </button>

                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setBaseGasolineRon(95);
                      setEthanolPercent(10);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-300 hover:bg-slate-700"
                  >
                    Chuẩn E10 RON 95
                  </button>
                </div>
              </div>

              {/* Environmental Emission Savings Card */}
              <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-600/40 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Lợi Ích Khí Thải Sinh Thái
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-600/30">
                    -{blendResult.coEmissionReductionPercent}% Khí Độc CO
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory">Giảm phát thải khí nhà kính (GHG):</span>
                    <strong className="text-emerald-400">-{blendResult.greenhouseGasSavingsPercent}%</strong>
                  </div>

                  <div className="text-[11px] text-ivory-muted leading-relaxed">
                    {blendResult.engineCompatibilityNoticeVi}
                  </div>
                </div>
              </div>
            </div>

            {/* Octane Gauges & Piston Knocking Visual (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-amber-400" />
                    {blendResult.vietnamCommercialGradeNameVi}
                  </h3>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-700/30">
                    {blendResult.vietnamLegalStandardVi.split('&')[0]}
                  </span>
                </div>

                {/* 4 Quantitative Octane Output Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Chỉ số Nghiên cứu (RON)</div>
                    <div className="text-2xl font-extrabold font-mono text-amber-300 mt-1">
                      {blendResult.resultingBlendRon}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      +{parseFloat((blendResult.resultingBlendRon - blendResult.baseGasolineRon).toFixed(1))} điểm nhờ Etanol
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Chỉ số Động cơ (MON)</div>
                    <div className="text-2xl font-extrabold font-mono text-cyan-300 mt-1">
                      {blendResult.resultingBlendMon}
                    </div>
                    <div className="text-[10px] font-mono text-ivory-muted mt-0.5">
                      Tải cao & tốc độ lớn
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Chỉ số Chống gõ (AKI)</div>
                    <div className="text-2xl font-extrabold font-mono text-purple-300 mt-1">
                      {blendResult.antiKnockIndexAki}
                    </div>
                    <div className="text-[10px] font-mono text-ivory-muted mt-0.5">
                      (RON + MON) / 2
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Độ nhạy nhiên liệu</div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-300 mt-1">
                      {parseFloat((blendResult.resultingBlendRon - blendResult.resultingBlendMon).toFixed(1))}
                    </div>
                    <div className="text-[10px] font-mono text-ivory-muted mt-0.5">
                      RON - MON
                    </div>
                  </div>
                </div>

                {/* Pure Hydrocarbons Octane Comparison Table */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Đối Chiếu Cấu Trúc Hydrocarbon & Chỉ Số Octan Chuẩn:
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/40">
                      <div className="flex justify-between">
                        <span className="text-red-300 font-bold">n-Heptan (Alkan thẳng 7C):</span>
                        <strong className="text-red-400">RON = 0.0</strong>
                      </div>
                      <p className="text-[11px] text-ivory-muted mt-0.5">{PURE_HYDROCARBONS_OCTANE.N_HEPTANE.engineKnockingBehaviorVi}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                      <div className="flex justify-between">
                        <span className="text-emerald-300 font-bold">Isooctan (Alkan nhánh):</span>
                        <strong className="text-emerald-400">RON = 100.0</strong>
                      </div>
                      <p className="text-[11px] text-ivory-muted mt-0.5">{PURE_HYDROCARBONS_OCTANE.ISOOCTANE.engineKnockingBehaviorVi}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/40">
                      <div className="flex justify-between">
                        <span className="text-blue-300 font-bold">Toluen (Hydrocarbon thơm):</span>
                        <strong className="text-blue-400">RON = 120.0</strong>
                      </div>
                      <p className="text-[11px] text-ivory-muted mt-0.5">{PURE_HYDROCARBONS_OCTANE.TOLUENE.engineKnockingBehaviorVi}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-lime-950/30 border border-lime-800/40">
                      <div className="flex justify-between">
                        <span className="text-lime-300 font-bold">Etanol Sinh Học (E100):</span>
                        <strong className="text-lime-400">RON = 108.0</strong>
                      </div>
                      <p className="text-[11px] text-ivory-muted mt-0.5">{PURE_HYDROCARBONS_OCTANE.ETHANOL_BIOFUEL.engineKnockingBehaviorVi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
