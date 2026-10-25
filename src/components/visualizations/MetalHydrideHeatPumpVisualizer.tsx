// src/components/visualizations/MetalHydrideHeatPumpVisualizer.tsx
// Interactive Visualizer: Solid-State Thermochemical Metal Hydride Heat Pump & Heat Transformer (MH-HP)
// Standards: IUPAC Chemical Thermodynamics, Van 't Hoff Isotherms, GDPT 2018 Chemistry & Industrial Waste Heat Upgrading

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Snowflake,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Gauge,
  Factory,
  ArrowRight,
  Boxes,
  ZapOff
} from 'lucide-react';
import {
  METAL_HYDRIDE_ALLOYS,
  HydrideAlloyId,
  calculateVanTHoffEquilibrium,
  calculateHeatTransformerPerformance,
  calculateMetalHydrideChillerPerformance
} from '../../domain/metalHydrideHeatPumpEngine';
import { sound } from '../../audio/soundEngine';

type MhHpTabMode =
  | 'VAN_T_HOFF_ISOTHERMS'
  | 'HEAT_TRANSFORMER_UPGRADE'
  | 'THERMAL_REFRIGERATION_CHILLER';

export const MetalHydrideHeatPumpVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MhHpTabMode>('HEAT_TRANSFORMER_UPGRADE');

  // Interactive Controls for Mode 1 & 2
  const [hthAlloyId, setHthAlloyId] = useState<HydrideAlloyId>('MM_NI_AL_MISCHMETAL');
  const [lthAlloyId, setLthAlloyId] = useState<HydrideAlloyId>('TIFE_MN_TITANIUM_IRON');
  const [wasteHeatTempC, setWasteHeatTempC] = useState<number>(95.0);
  const [ambientSinkTempC, setAmbientSinkTempC] = useState<number>(25.0);
  const [wasteHeatInputKW, setWasteHeatInputKW] = useState<number>(500.0);

  // Interactive Controls for Mode 3 (Chiller)
  const [chillerDriveTempC, setChillerDriveTempC] = useState<number>(130.0);
  const [chillerSinkTempC, setChillerSinkTempC] = useState<number>(32.0);
  const [chillerTargetTempC, setChillerTargetTempC] = useState<number>(5.0);
  const [chillerDrivePowerKW, setChillerDrivePowerKW] = useState<number>(300.0);

  const selectedHth = METAL_HYDRIDE_ALLOYS[hthAlloyId];
  const selectedLth = METAL_HYDRIDE_ALLOYS[lthAlloyId];

  // Calculations
  const transformerResult = useMemo(() => {
    return calculateHeatTransformerPerformance(
      wasteHeatTempC,
      ambientSinkTempC,
      wasteHeatInputKW,
      hthAlloyId,
      lthAlloyId
    );
  }, [wasteHeatTempC, ambientSinkTempC, wasteHeatInputKW, hthAlloyId, lthAlloyId]);

  const chillerResult = useMemo(() => {
    return calculateMetalHydrideChillerPerformance(
      chillerDriveTempC,
      chillerSinkTempC,
      chillerTargetTempC,
      chillerDrivePowerKW,
      'LANI5_STANDARD',
      lthAlloyId
    );
  }, [chillerDriveTempC, chillerSinkTempC, chillerTargetTempC, chillerDrivePowerKW, lthAlloyId]);

  const hthEquilibrium = useMemo(() => {
    return calculateVanTHoffEquilibrium(hthAlloyId, wasteHeatTempC);
  }, [hthAlloyId, wasteHeatTempC]);

  const lthEquilibrium = useMemo(() => {
    return calculateVanTHoffEquilibrium(lthAlloyId, ambientSinkTempC);
  }, [lthAlloyId, ambientSinkTempC]);

  const handleModeChange = (mode: MhHpTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setHthAlloyId('MM_NI_AL_MISCHMETAL');
    setLthAlloyId('TIFE_MN_TITANIUM_IRON');
    setWasteHeatTempC(95.0);
    setAmbientSinkTempC(25.0);
    setWasteHeatInputKW(500.0);
    setChillerDriveTempC(130.0);
    setChillerSinkTempC(32.0);
    setChillerTargetTempC(5.0);
    setChillerDrivePowerKW(300.0);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-600/30 rounded-2xl border border-orange-500/40 text-orange-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/30">
                Bơm Nhiệt &amp; Nâng Cấp Nhiệt Thể Rắn (Solid-State MH-HP)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                0% Máy Nén Cơ Học • Nâng Nhiệt Thải 95°C ➔ 150°C+
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Metal Hydride Thermochemical Heat Pump &amp; Transformer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cân bằng Van &apos;t Hoff hấp phụ hydro thuận nghịch • Cặp phản ứng nhiệt hóa HTH/LTH • Tái tạo hơi nước công nghiệp &amp; Làm lạnh không dùng điện
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('HEAT_TRANSFORMER_UPGRADE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'HEAT_TRANSFORMER_UPGRADE'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 ring-1 ring-orange-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Nâng Cấp Nhiệt Thải (Transformer)</span>
          </button>

          <button
            onClick={() => handleModeChange('VAN_T_HOFF_ISOTHERMS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'VAN_T_HOFF_ISOTHERMS'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Đẳng Nhiệt Van &apos;t Hoff &amp; Hợp Kim</span>
          </button>

          <button
            onClick={() => handleModeChange('THERMAL_REFRIGERATION_CHILLER')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'THERMAL_REFRIGERATION_CHILLER'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span>Làm Lạnh Nhiệt Hóa (Zero Electricity)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: HEAT TRANSFORMER UPGRADING */}
      {activeMode === 'HEAT_TRANSFORMER_UPGRADE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Factory className="w-4 h-4 text-orange-400" />
                Thông Số Nhiệt Thải Công Nghiệp
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-orange-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Waste Heat Temperature (T_m) */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ nhiệt thải đầu vào (T_waste):</span>
                <span className="font-mono text-orange-400 font-bold">{wasteHeatTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="75"
                max="120"
                step="1"
                value={wasteHeatTempC}
                onChange={(e) => setWasteHeatTempC(parseFloat(e.target.value))}
                className="w-full accent-orange-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>75 °C (Nước làm mát)</span>
                <span>95 °C</span>
                <span>120 °C (Hơi áp thấp)</span>
              </div>
            </div>

            {/* Waste Heat Thermal Power */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất nhiệt thải đầu vào (Q_in):</span>
                <span className="font-mono text-amber-400 font-bold">{wasteHeatInputKW.toFixed(0)} kW</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={wasteHeatInputKW}
                onChange={(e) => setWasteHeatInputKW(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Alloy Pair Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold">Tầng nhiệt độ cao (HTH):</label>
                <select
                  value={hthAlloyId}
                  onChange={(e) => setHthAlloyId(e.target.value as HydrideAlloyId)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="MM_NI_AL_MISCHMETAL">MmNi4.5Al0.5 (Mischmetal AB₅, ΔH = -34.5 kJ/mol)</option>
                  <option value="LANI5_STANDARD">LaNi₅ (Standard AB₅, ΔH = -30.8 kJ/mol)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold">Tầng nhiệt độ thấp (LTH):</label>
                <select
                  value={lthAlloyId}
                  onChange={(e) => setLthAlloyId(e.target.value as HydrideAlloyId)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="TIFE_MN_TITANIUM_IRON">TiFe0.85Mn0.15 (AB Intermetallic, ΔH = -27.5 kJ/mol)</option>
                  <option value="ZR_TI_CR_FE_LAVES">Zr-Ti-Cr-Fe (AB₂ Laves Phase, ΔH = -25.5 kJ/mol)</option>
                </select>
              </div>
            </div>

            {/* Scientific Explanation */}
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-orange-400 block mb-1">Nguyên Lý Nâng Cấp Nhiệt Thể Rắn:</span>
              Dựa trên hiệu ứng thoi đưa hydro (H₂ shuttle) giữa 2 bình phản ứng chứa hợp kim kim loại khác biệt về ái lực hóa học. Nhiệt thải 95°C giải hấp hydro từ hợp kim LTH ở áp suất cao, dòng hydro này lập tức phản ứng tỏa nhiệt mãnh liệt vào hợp kim HTH, giải phóng dòng nhiệt mới có phẩm vị cao đạt 145-160°C đủ áp suất tái sinh hơi bão hòa công nghiệp.
            </div>
          </div>

          {/* SVG Schematic & Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            {/* Top Stat Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Nhiệt Độ Hơi Nâng Cấp</span>
                <div className="text-2xl font-black text-orange-400 font-mono my-1">
                  {transformerResult.upgradedOutputTempC.toFixed(1)} <span className="text-sm font-normal text-slate-400">°C</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Độ nâng nhiệt: +{transformerResult.temperatureLiftK.toFixed(1)} K
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Công Suất Hơi Thu Được</span>
                <div className="text-2xl font-black text-amber-400 font-mono my-1">
                  {transformerResult.upgradedThermalPowerKW.toFixed(0)} <span className="text-sm font-normal text-slate-400">kW</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  COP nhiệt: {transformerResult.thermalCop.toFixed(2)} (Carnot: {transformerResult.carnotMaxCop.toFixed(2)})
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Tiết Kiệm Nhiên Liệu</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  ${(transformerResult.annualFuelSavingsUSD / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">/năm</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Thay thế đốt dầu / than cấp hơi
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Giảm Khí CO₂</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {transformerResult.annualAvoidedCO2Tons.toFixed(0)} <span className="text-xs font-normal text-slate-400">tấn/năm</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-semibold">
                  Zero phát thải tại chỗ
                </span>
              </div>
            </div>

            {/* Dynamic Hydrogen Shuttle Flow SVG */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 700 280" className="w-full h-auto max-h-[260px]">
                <defs>
                  <linearGradient id="gradHth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c2410c" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradLth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Hydrogen Shuttle Tube */}
                <path d="M 230 140 L 470 140" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="8,6" />
                <polygon points="480,140 465,133 465,147" fill="#f59e0b" />
                <polygon points="220,140 235,133 235,147" fill="#f59e0b" />
                <text x="350" y="125" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Dòng Khí Hydro H₂ Tuần Hoàn Kín (Zero Tổn Thất)
                </text>
                <text x="350" y="160" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  P_cao = {transformerResult.pressureHighBar.toFixed(1)} bar • P_thấp = {transformerResult.pressureLowBar.toFixed(1)} bar
                </text>

                {/* REACTOR 1: LTH */}
                <rect x="90" y="60" width="140" height="160" rx="12" fill="url(#gradLth)" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="160" y="90" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">LTH REACTOR</text>
                <text x="160" y="110" fill="#bae6fd" fontSize="11" textAnchor="middle">{selectedLth.formula}</text>
                <text x="160" y="135" fill="#ffffff" fontSize="10" textAnchor="middle">Tầng Nhiệt Độ Thấp</text>
                <text x="160" y="170" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
                  T_in = {wasteHeatTempC.toFixed(0)} °C
                </text>
                <text x="160" y="195" fill="#bae6fd" fontSize="9" textAnchor="middle">
                  ΔH = {selectedLth.enthalpyAbsorptionKJPerMolH2} kJ/mol
                </text>

                {/* REACTOR 2: HTH */}
                <rect x="470" y="60" width="140" height="160" rx="12" fill="url(#gradHth)" stroke="#fb923c" strokeWidth="2.5" />
                <text x="540" y="90" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">HTH REACTOR</text>
                <text x="540" y="110" fill="#ffedd5" fontSize="11" textAnchor="middle">{selectedHth.formula}</text>
                <text x="540" y="135" fill="#ffffff" fontSize="10" textAnchor="middle">Tầng Nhiệt Độ Cao</text>
                <text x="540" y="170" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  T_out = {transformerResult.upgradedOutputTempC.toFixed(0)} °C 🔥
                </text>
                <text x="540" y="195" fill="#ffedd5" fontSize="9" textAnchor="middle">
                  ΔH = {selectedHth.enthalpyAbsorptionKJPerMolH2} kJ/mol
                </text>

                {/* Energy Input/Output Flags */}
                <text x="160" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  🔥 Cấp Nhiệt Thải ({wasteHeatTempC.toFixed(0)}°C)
                </text>
                <text x="540" y="42" fill="#fb923c" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ⚡ Phát Hơi Nước Bão Hòa ({transformerResult.upgradedOutputTempC.toFixed(0)}°C)
                </text>
                <text x="160" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Giải nhiệt đáy T_sink: {ambientSinkTempC}°C
                </text>
                <text x="540" y="245" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Công suất: {transformerResult.upgradedThermalPowerKW.toFixed(0)} kW nhiệt
                </text>
              </svg>
            </div>

            {/* Key Advantages Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2">
                <ZapOff className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">0% Máy Nén Khí:</span>
                  <span className="text-slate-400 text-[11px]">Không rung lắc, không tiếng ồn, không rò rỉ cơ học.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Zero Môi Chất Nhà Kính:</span>
                  <span className="text-slate-400 text-[11px]">GWP = 0, ODP = 0, loại bỏ hoàn toàn khí gas fluorocarbon.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2">
                <Boxes className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Tuổi Thọ &gt; 15.000 Chu Kỳ:</span>
                  <span className="text-slate-400 text-[11px]">Hợp kim pha graphite tự nhiên dẫn nhiệt siêu tốc 8.5 W/(m·K).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: VAN 'T HOFF ISOTHERMS & ALLOY COMPARISON */}
      {activeMode === 'VAN_T_HOFF_ISOTHERMS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alloy Details */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Đặc Tính Các Họ Hợp Kim Trữ Hydro
            </h3>

            <div className="flex flex-col gap-3">
              {Object.values(METAL_HYDRIDE_ALLOYS).map((alloy) => (
                <div
                  key={alloy.id}
                  onClick={() => setHthAlloyId(alloy.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    hthAlloyId === alloy.id
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-md ring-1 ring-amber-400/40'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-sm text-white">{alloy.formula}</span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                      Họ {alloy.alloyFamily}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{alloy.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                    <div>ΔH: {alloy.enthalpyAbsorptionKJPerMolH2} kJ/mol</div>
                    <div>Dung lượng: {alloy.hydrogenStorageCapacityWtPercent} wt% H₂</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 italic border-t border-slate-800/80 pt-1.5">
                    {alloy.vietnameseDescription}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Van 't Hoff Isotherm Chart & Formulas */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              Đồ Thị Van &apos;t Hoff Áp Suất Cân Bằng (ln P vs. 1/T)
            </h3>

            {/* Van 't Hoff Equation Card */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Phương Trình Nhiệt Động Lực Học Van &apos;t Hoff:
              </span>
              <div className="font-mono text-sm bg-slate-900 p-3 rounded-xl border border-slate-800 text-center text-slate-200">
                ln(P_eq / P₀) = (ΔH / R·T) - (ΔS / R)
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Độ dốc của đường thẳng quyết định bởi Entanpy phản ứng hấp phụ <span className="text-amber-300 font-mono">ΔH</span>. Khoảng chênh lệch giữa đường nạp (Absorption) và đường xả (Desorption) phản ánh hiện tượng trễ <span className="text-cyan-300 font-mono">Hysteresis</span> do biến dạng mạng tinh thể khi hydro xen kẽ vào các hốc bát diện kim loại.
              </div>
            </div>

            {/* Equilibrium State Table */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-bold text-white">Bảng Áp Suất Cân Bằng Theo Nhiệt Độ Vận Hành</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">LaNi₅ ở 25°C:</span>
                  <span className="font-mono font-bold text-amber-400 text-base">1.76 bar</span>
                  <span className="text-[10px] text-slate-500 block">Dễ giải hấp</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">LaNi₅ ở 95°C:</span>
                  <span className="font-mono font-bold text-orange-400 text-base">18.4 bar</span>
                  <span className="text-[10px] text-slate-500 block">Động lực nén nhiệt</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">MmNi₄.₅Al₀.₅ ở 150°C:</span>
                  <span className="font-mono font-bold text-red-400 text-base">12.2 bar</span>
                  <span className="text-[10px] text-slate-500 block">Hấp phụ tỏa nhiệt</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TiFe₀.₈₅Mn₀.₁₅ ở 25°C:</span>
                  <span className="font-mono font-bold text-cyan-400 text-base">3.4 bar</span>
                  <span className="text-[10px] text-slate-500 block">Bình hấp thụ LTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: THERMAL REFRIGERATION CHILLER */}
      {activeMode === 'THERMAL_REFRIGERATION_CHILLER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-cyan-400" />
              Thông Số Máy Làm Lạnh Nhiệt Hóa
            </h3>

            {/* Driving Heat Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ nhiệt dẫn động (T_drive):</span>
                <span className="font-mono text-orange-400 font-bold">{chillerDriveTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="100"
                max="160"
                step="1"
                value={chillerDriveTempC}
                onChange={(e) => setChillerDriveTempC(parseFloat(e.target.value))}
                className="w-full accent-orange-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>100 °C (Hơi áp thấp)</span>
                <span>130 °C</span>
                <span>160 °C (Dầu tải nhiệt)</span>
              </div>
            </div>

            {/* Driving Power */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất nhiệt cấp (Q_drive):</span>
                <span className="font-mono text-amber-400 font-bold">{chillerDrivePowerKW.toFixed(0)} kW</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={chillerDrivePowerKW}
                onChange={(e) => setChillerDrivePowerKW(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Chilled Water Delivery */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ nước lạnh tạo ra (T_chill):</span>
                <span className="font-mono text-cyan-400 font-bold">{chillerTargetTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="-5"
                max="10"
                step="0.5"
                value={chillerTargetTempC}
                onChange={(e) => setChillerTargetTempC(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-5 °C (Bảo quản lạnh)</span>
                <span>5 °C (Điều hòa)</span>
                <span>10 °C</span>
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Hiệu Quả Làm Lạnh Nhiệt Thể Rắn
            </h3>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Công Suất Lạnh (Q_cool)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {chillerResult.coolingCapacityKW.toFixed(0)} <span className="text-sm font-normal text-slate-400">kW</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Nước lạnh cấp: {chillerTargetTempC.toFixed(1)} °C
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">COP Nhiệt Làm Lạnh</span>
                <div className="text-2xl font-black text-blue-400 font-mono my-1">
                  {chillerResult.coolingThermalCop.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500">
                  Q_cool / Q_drive
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">COP Điện Tương Đương</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  {chillerResult.effectiveElectricCopEquivalent.toFixed(0)}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Gần như 0 điện năng tiêu thụ
                </span>
              </div>
            </div>

            <div className="p-5 bg-cyan-950/20 rounded-2xl border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-cyan-400 block mb-1">
                Làm Lạnh Bền Vững Không Rung Động (Zero-Vibration Cryo-Cooling):
              </span>
              Nhờ không sử dụng máy nén pittông hay trục vít, chu trình giải hấp hydro thu nhiệt từ hợp kim kim loại diễn ra hoàn toàn tĩnh (solid-state). Hệ thống này lý tưởng cho các ứng dụng yêu cầu độ tĩnh tuyệt đối như kính thiên văn vũ trụ, trạm viễn thông biển đảo, và kho bảo quản dược phẩm vắc-xin tại các vùng không có lưới điện ổn định.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
