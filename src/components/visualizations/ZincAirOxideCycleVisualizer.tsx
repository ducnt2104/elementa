// src/components/visualizations/ZincAirOxideCycleVisualizer.tsx
// Interactive Visualizer: Concentrated Solar Thermochemical Zinc-Zinc Oxide (Zn/ZnO) Water-Splitting Cycle
// Standards: IUPAC High-Temperature Chemical Thermodynamics, GDPT 2018 Chemistry & Green Hydrogen Production

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Flame,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Gauge,
  Factory,
  Zap,
  Droplets,
  Wind,
  ArrowRight
} from 'lucide-react';
import {
  SOLAR_RECEIVERS,
  SolarReceiverType,
  calculateZnZnoCyclePerformance
} from '../../domain/zincAirOxideCycleEngine';
import { sound } from '../../audio/soundEngine';

type ZnZnoTabMode =
  | 'TWO_STEP_SOLAR_REACTIONS'
  | 'SOLAR_TO_HYDROGEN_STH'
  | 'GREEN_H2_ECONOMICS';

export const ZincAirOxideCycleVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ZnZnoTabMode>('TWO_STEP_SOLAR_REACTIONS');

  // Interactive Controls
  const [receiverType, setReceiverType] = useState<SolarReceiverType>('BEAM_DOWN_ROTATING_CAVITY');
  const [solarThermalCapacityMWth, setSolarThermalCapacityMWth] = useState<number>(10.0);
  const [hydrolysisTempC, setHydrolysisTempC] = useState<number>(400.0);
  const [quenchEffectiveness, setQuenchEffectiveness] = useState<number>(0.94);

  const currentReceiver = SOLAR_RECEIVERS[receiverType];

  // Calculations
  const performance = useMemo(() => {
    return calculateZnZnoCyclePerformance(
      receiverType,
      solarThermalCapacityMWth,
      hydrolysisTempC,
      quenchEffectiveness
    );
  }, [receiverType, solarThermalCapacityMWth, hydrolysisTempC, quenchEffectiveness]);

  const handleModeChange = (mode: ZnZnoTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setReceiverType('BEAM_DOWN_ROTATING_CAVITY');
    setSolarThermalCapacityMWth(10.0);
    setHydrolysisTempC(400.0);
    setQuenchEffectiveness(0.94);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-600/30 rounded-2xl border border-yellow-500/40 text-yellow-400">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/30">
                Chu Trình Nhiệt Hóa Mặt Trời Zn/ZnO (Solar Thermochemical)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Hiệu Suất STH ~ 40% • Tách Khí Tự Nhiên • Zero Carbon
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Concentrated Solar Thermochemical Zinc-Zinc Oxide Cycle
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân ly quang nhiệt ZnO ở 1950 K &amp; Thủy phân hơi nước sinh khí Hydro xanh ở 670 K • Tách riêng O₂ và H₂ ở 2 bước triệt tiêu nguy cơ nổ hỗn hợp
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('TWO_STEP_SOLAR_REACTIONS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'TWO_STEP_SOLAR_REACTIONS'
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25 ring-1 ring-yellow-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Chu Trình 2 Bước &amp; Lò Nung</span>
          </button>

          <button
            onClick={() => handleModeChange('SOLAR_TO_HYDROGEN_STH')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'SOLAR_TO_HYDROGEN_STH'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Hiệu Suất STH (Solar-to-H₂)</span>
          </button>

          <button
            onClick={() => handleModeChange('GREEN_H2_ECONOMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GREEN_H2_ECONOMICS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Kinh Tế Hydro Xanh (LCOH)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: TWO-STEP REACTIONS & SCHEMATIC */}
      {activeMode === 'TWO_STEP_SOLAR_REACTIONS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                Bộ Thu Nhiệt Mặt Trời Tập Trung
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Receiver Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-semibold">Công nghệ lò phản ứng hội tụ:</label>
              <select
                value={receiverType}
                onChange={(e) => setReceiverType(e.target.value as SolarReceiverType)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              >
                {Object.values(SOLAR_RECEIVERS).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.solarConcentrationRatios} Suns, {r.receiverOperatingTempK} K)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {currentReceiver.vietnameseDescription}
              </p>
            </div>

            {/* Solar Thermal Input Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất nhiệt mặt trời (Q_solar):</span>
                <span className="font-mono text-yellow-400 font-bold">{solarThermalCapacityMWth.toFixed(1)} MWth</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="50.0"
                step="1.0"
                value={solarThermalCapacityMWth}
                onChange={(e) => setSolarThermalCapacityMWth(parseFloat(e.target.value))}
                className="w-full accent-yellow-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>2 MWth (Mô hình thử nghiệm)</span>
                <span>10 MWth</span>
                <span>50 MWth (Thương mại)</span>
              </div>
            </div>

            {/* Two Chemical Equations Box */}
            <div className="p-4 bg-yellow-950/20 rounded-xl border border-yellow-500/20 flex flex-col gap-3 text-xs">
              <span className="font-bold text-yellow-400 uppercase tracking-wider text-[11px]">
                Phương Trình Phản Ứng 2 Bước Khép Kín:
              </span>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px]">
                <span className="text-amber-400 font-bold block mb-1">Bước 1: Phân ly quang nhiệt (1950 K)</span>
                <span className="text-slate-200">ZnO(r) ➔ Zn(hơi) + ½ O₂(k)</span>
                <span className="text-slate-400 block text-[10px] mt-0.5">ΔH° = +460 kJ/mol (Thu nhiệt)</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px]">
                <span className="text-cyan-400 font-bold block mb-1">Bước 2: Thủy phân sinh Hydro (670 K)</span>
                <span className="text-slate-200">Zn(r) + H₂O(hơi) ➔ ZnO(r) + H₂(k)</span>
                <span className="text-slate-400 block text-[10px] mt-0.5">ΔH° = -105 kJ/mol (Tỏa nhiệt)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-yellow-400 block mb-1">Tại Sao Không Điện Phân Nước Thông Thường?</span>
              Điện phân PEM/Alkaline phải chuyển đổi: Ánh sáng ➔ Điện mặt trời PV (~22%) ➔ Điện phân nước (~70%) ➔ STH thực tế chỉ đạt ~15-18%. Ngược lại, chu trình nhiệt hóa Zn/ZnO chuyển trực tiếp photon ánh sáng hội tụ thành năng lượng liên kết hóa học, đạt STH lên tới 40%!
            </div>
          </div>

          {/* SVG Schematic & Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 justify-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                Sơ Đồ Tuần Hoàn Vật Liệu Zn/ZnO Khép Kín
              </span>
              <span className="text-xs px-2.5 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30 font-bold">
                T_lò: {performance.step1ReductionTempK} K • Áp suất hơi Zn: {performance.zincDissociationPressureBar.toFixed(1)} bar
              </span>
            </div>

            {/* SVG Schematic */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 720 340" className="w-full h-auto max-h-[320px]">
                <defs>
                  <linearGradient id="gradSolarSun" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradSolarCavity" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradHydrolyzer" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Heliostat Solar Beams Focusing */}
                <polygon points="50,40 220,120 50,200" fill="url(#gradSolarSun)" opacity="0.35" />
                <path d="M 50 60 L 220 120" stroke="#fde047" strokeWidth="2" strokeDasharray="6,4" />
                <path d="M 50 120 L 220 120" stroke="#fde047" strokeWidth="3" />
                <path d="M 50 180 L 220 120" stroke="#fde047" strokeWidth="2" strokeDasharray="6,4" />
                <text x="60" y="30" fill="#fef08a" fontSize="11" fontWeight="bold">Tập Trung 3500 Suns</text>

                {/* SOLAR CAVITY RECEIVER (STEP 1) */}
                <rect x="220" y="70" width="120" height="110" rx="12" fill="url(#gradSolarCavity)" stroke="#f87171" strokeWidth="2.5" />
                <text x="280" y="98" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">LÒ QUANG NHIỆT</text>
                <text x="280" y="118" fill="#fee2e2" fontSize="10" textAnchor="middle">ZnO ➔ Zn(k) + ½ O₂</text>
                <text x="280" y="140" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1950 K (1677 °C)</text>
                <text x="280" y="160" fill="#fca5a5" fontSize="9" textAnchor="middle">Tách Oxy Tự Nhiên</text>

                {/* Oxygen Gas Release Tube */}
                <path d="M 280 70 L 280 25 L 340 25" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="345,25 335,20 335,30" fill="#38bdf8" />
                <text x="355" y="29" fill="#7dd3fc" fontSize="11" fontWeight="bold">O₂ Thoát Ra (Khí Tinh Khiết)</text>

                {/* Quenching & Condensation Tube */}
                <path d="M 340 125 L 430 125" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <polygon points="435,125 425,120 425,130" fill="#f59e0b" />
                <text x="385" y="115" fill="#fde68a" fontSize="9" textAnchor="middle">Làm Lạnh Cực Nhanh Quench</text>
                <text x="385" y="142" fill="#94a3b8" fontSize="8" textAnchor="middle">&gt; 10⁵ K/giây</text>

                {/* Quench Chamber (Nano Zn condensation) */}
                <rect x="435" y="95" width="70" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="470" y="120" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Hạt Nano Zn</text>
                <text x="470" y="135" fill="#e2e8f0" fontSize="9" textAnchor="middle">dp ~ 80 nm</text>

                {/* Powder Transfer to Hydrolyzer (Step 2) */}
                <path d="M 470 155 L 470 210" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4,3" />
                <polygon points="470,215 465,205 475,205" fill="#94a3b8" />

                {/* HYDROLYZER REACTOR (STEP 2) */}
                <rect x="410" y="215" width="120" height="95" rx="12" fill="url(#gradHydrolyzer)" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="470" y="240" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">BÌNH THỦY PHÂN</text>
                <text x="470" y="260" fill="#e0f2fe" fontSize="10" textAnchor="middle">Zn + H₂O ➔ ZnO + H₂</text>
                <text x="470" y="280" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">673 K (400 °C)</text>

                {/* Steam H2O Injection */}
                <path d="M 590 260 L 530 260" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <polygon points="530,260 540,255 540,265" fill="#06b6d4" />
                <text x="600" y="264" fill="#67e8f9" fontSize="10" fontWeight="bold">Hơi Nước H₂O Cấp Vào</text>

                {/* Pure Hydrogen H2 Gas Exit */}
                <path d="M 470 310 L 470 330 L 610 330" fill="none" stroke="#10b981" strokeWidth="4" />
                <polygon points="615,330 605,325 605,335" fill="#10b981" />
                <text x="625" y="334" fill="#4ade80" fontSize="12" fontWeight="bold">⚡ KHÍ H₂ NĂNG LƯỢNG XANH</text>

                {/* ZnO Recycling back to Solar Receiver */}
                <path d="M 410 260 L 280 260 L 280 180" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,4" />
                <polygon points="280,180 275,190 285,190" fill="#eab308" />
                <text x="345" y="275" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Tái Tuần Hoàn Bột ZnO (Khép Kín 100%)
                </text>
              </svg>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Sản lượng hydro xanh:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {performance.hourlyHydrogenProductionKg.toFixed(1)} kg H₂/giờ
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Hiệu suất Solar-to-H₂:</span>
                <span className="font-bold text-yellow-400 font-mono text-sm">
                  {performance.solarToHydrogenEfficiencyPercent.toFixed(1)} % STH
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Giá thành sản xuất (LCOH):</span>
                <span className="font-bold text-cyan-400 font-mono text-sm">
                  ${performance.levelizedCostOfHydrogenUSDPerKg.toFixed(2)} / kg H₂
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: STH EFFICIENCY & THERMAL OPTIMIZATION */}
      {activeMode === 'SOLAR_TO_HYDROGEN_STH' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              Tối Ưu Hóa Hiệu Suất Nhiệt Động
            </h3>

            {/* Hydrolysis Steam Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ hơi nước thủy phân (T_hyd):</span>
                <span className="font-mono text-cyan-400 font-bold">{hydrolysisTempC.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="300"
                max="550"
                step="10"
                value={hydrolysisTempC}
                onChange={(e) => setHydrolysisTempC(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>300 °C (Hơi áp thấp)</span>
                <span>400 °C (Tối ưu)</span>
                <span>550 °C</span>
              </div>
            </div>

            {/* Quench Effectiveness */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hiệu quả ngăn tái kết hợp (Quench):</span>
                <span className="font-mono text-emerald-400 font-bold">{(quenchEffectiveness * 100).toFixed(0)} %</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="0.99"
                step="0.01"
                value={quenchEffectiveness}
                onChange={(e) => setQuenchEffectiveness(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-400 block mb-1">
                Hiện Tượng Tái Kết Hợp (Recombination) &amp; Quench:
              </span>
              Ở nhiệt độ 1950 K, phân ly tạo ra hỗn hợp khí Zn(g) và O₂(g). Nếu làm nguội từ từ, kẽm sẽ lập tức cháy ngược lại thành ZnO mà không thu được kim loại. Bằng cách phun khí trơ Ar/N₂ lạnh với tốc độ trên 10⁵ K/giây, hơi kẽm ngưng tụ siêu tốc thành các hạt nano Zn rắn trước khi kịp phản ứng với O₂, bảo toàn 94% kẽm hoạt tính cho bước 2!
            </div>
          </div>

          {/* Efficiency Comparison Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              So Sánh Hiệu Suất Solar-to-Hydrogen (STH) Toàn Diện
            </h3>

            {/* Visual STH Comparison Bars */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span className="font-bold text-yellow-400">Chu Trình Nhiệt Hóa Zn/ZnO Mặt Trời (Elementa):</span>
                  <span className="font-mono text-yellow-300 font-bold text-sm">
                    {performance.solarToHydrogenEfficiencyPercent.toFixed(1)} % STH
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${performance.solarToHydrogenEfficiencyPercent * 2}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Pin Mặt Trời Silicon (PV) + Điện Phân Màng PEM:</span>
                  <span className="font-mono text-cyan-400 font-bold text-sm">18.5 % STH</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '37%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Pin Mặt Trời Silicon + Điện Phân Kiềm Alkaline (AEL):</span>
                  <span className="font-mono text-slate-400 font-bold text-sm">14.8 % STH</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '29.6%' }}></div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Tốc Độ Ngưng Tụ Quench</span>
                <div className="text-2xl font-black text-amber-400 font-mono my-1">
                  1.5×10⁵ <span className="text-xs font-normal text-slate-400">K/s</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Làm lạnh dòng hạt nano khí dung
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Hiệu Suất Hấp Thụ Bức Xạ</span>
                <div className="text-2xl font-black text-yellow-400 font-mono my-1">
                  {currentReceiver.opticalEfficiencyPercent.toFixed(1)} <span className="text-xs font-normal text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Khoang hấp thụ đen tuyệt đối
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Sản Lượng Hydro Mỗi Ngày</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  {performance.dailyHydrogenProductionTons.toFixed(2)} <span className="text-xs font-normal text-slate-400">tấn/ngày</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  8 giờ nắng đỉnh cao
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GREEN H2 ECONOMICS & CO2 AVOIDANCE */}
      {activeMode === 'GREEN_H2_ECONOMICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Financials */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Chỉ Số Kinh Tế Hydro LCOH
            </h3>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Giá Thành Sản Xuất (LCOH)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${performance.levelizedCostOfHydrogenUSDPerKg.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ kg H₂</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Đã bao gồm chi phí tháp gương &amp; vận hành 30 năm
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Cắt Giảm Khí Thải CO₂ Hàng Năm</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {performance.avoidedAnnualCO2Tons.toFixed(0)} <span className="text-xs font-normal text-slate-400">tấn/năm</span>
              </div>
              <span className="text-[10px] text-slate-500">
                So với công nghệ Steam Methane Reforming (SMR)
              </span>
            </div>
          </div>

          {/* Comparison Table vs SMR and Coal Gasification */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              So Sánh Các Công Nghệ Sản Xuất Hydro Công Nghiệp
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3 font-semibold">Công Nghệ Sản Xuất</th>
                    <th className="py-2.5 px-3 font-semibold">Nguồn Nhiên Liệu</th>
                    <th className="py-2.5 px-3 font-semibold">Phát Thải CO₂ / kg H₂</th>
                    <th className="py-2.5 px-3 font-bold text-emerald-400">Giá Thành LCOH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[11px]">
                  <tr className="bg-yellow-950/20 font-semibold">
                    <td className="py-2.5 px-3 text-yellow-300">Nhiệt Hóa Zn/ZnO Mặt Trời (Elementa)</td>
                    <td className="py-2.5 px-3 text-slate-200">Ánh Sáng &amp; Nước</td>
                    <td className="py-2.5 px-3 text-emerald-400">0.0 kg (100% Xanh)</td>
                    <td className="py-2.5 px-3 text-emerald-300 font-mono">${performance.levelizedCostOfHydrogenUSDPerKg.toFixed(2)}/kg</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Reforming Khí Metan Hơi Nước (SMR Xám)</td>
                    <td className="py-2.5 px-3 text-slate-400">Khí Tự Nhiên (CH₄)</td>
                    <td className="py-2.5 px-3 text-red-400">9 - 11 kg CO₂</td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono">$1.80 - $2.40/kg</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Khí Hóa Than Đá (Hydro Nâu)</td>
                    <td className="py-2.5 px-3 text-slate-400">Than Đá</td>
                    <td className="py-2.5 px-3 text-red-500 font-bold">18 - 20 kg CO₂</td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono">$1.50 - $2.10/kg</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-300">Điện Phân Nước PV + PEM (Hydro Xanh)</td>
                    <td className="py-2.5 px-3 text-slate-400">Điện Mặt Trời &amp; Nước</td>
                    <td className="py-2.5 px-3 text-emerald-400">0.0 kg</td>
                    <td className="py-2.5 px-3 text-amber-400 font-mono">$4.50 - $6.50/kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">
                Lợi Thế Chiến Lược Của Chu Trình Nhiệt Hóa Kim Loại Kẽm:
              </span>
              Kẽm kim loại (Zn) sau khi ngưng tụ có thể trữ dạng bột rắn ổn định trong kho vô thời hạn mà không lo rò rỉ hay cháy nổ như khí nén hydro cao áp. Khi cần năng lượng, bột kẽm được vận chuyển tới các nhà máy nhiệt điện hoặc trạm cấp hydro địa phương để phản ứng với hơi nước sản xuất hydro theo yêu cầu, đóng vai trò như một chất mang năng lượng rắn hoàn hảo!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
