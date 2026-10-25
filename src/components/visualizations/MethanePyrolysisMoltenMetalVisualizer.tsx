// src/components/visualizations/MethanePyrolysisMoltenMetalVisualizer.tsx
// ============================================================================
// METHANE PYROLYSIS IN MOLTEN METAL BUBBLE COLUMNS INTERACTIVE VISUALIZER
// Turquoise Hydrogen, Stokes Buoyancy Carbon Separation, and Coproduct MWCNT
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Layers,
  TrendingDown,
  ShieldCheck,
  Globe,
  Gauge,
  Factory,
  Boxes,
  Sparkles
} from 'lucide-react';
import {
  MethanePyrolysisMoltenMetalEngine,
  MOLTEN_ALLOYS,
  CARBON_MARKET_GRADES,
  MoltenAlloySpecs,
  CarbonMarketGrade
} from '../../domain/methanePyrolysisMoltenMetalEngine';

export const MethanePyrolysisMoltenMetalVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flowsheet' | 'kinetics' | 'economics'>('flowsheet');

  // Interactive parameters
  const [selectedAlloyId, setSelectedAlloyId] = useState<'Ni-Bi' | 'Pt-Bi' | 'Fe-Sn' | 'Cu-Bi'>('Ni-Bi');
  const [methaneFeedRateNm3H, setMethaneFeedRateNm3H] = useState<number>(1000);
  const [liquidColumnHeightM, setLiquidColumnHeightM] = useState<number>(2.5);
  const [operatingTempOffsetC, setOperatingTempOffsetC] = useState<number>(0);
  const [reactorPressureBar, setReactorPressureBar] = useState<number>(2.0);
  const [carbonProductType, setCarbonProductType] = useState<'Conductive_Carbon_Black' | 'Graphitic_Flakes' | 'Carbon_Nanotubes_MWCNT'>('Conductive_Carbon_Black');
  const [naturalGasCostNm3, setNaturalGasCostNm3] = useState<number>(0.30);
  const [electricityPriceKwh, setElectricityPriceKwh] = useState<number>(0.04);

  const currentAlloy = useMemo(() => {
    const base = MOLTEN_ALLOYS.find(a => a.id === selectedAlloyId) || MOLTEN_ALLOYS[0];
    return {
      ...base,
      operatingTemperatureC: base.operatingTemperatureC + operatingTempOffsetC
    };
  }, [selectedAlloyId, operatingTempOffsetC]);

  const simResults = useMemo(() => {
    return MethanePyrolysisMoltenMetalEngine.simulatePyrolysisPlant(
      {
        methaneFeedRateNm3H,
        reactorPressureBar,
        liquidColumnHeightM,
        orificeDiameterMm: 1.0,
        selectedAlloyId,
        externalHeatSource: 'Electric_Induction',
        carbonProductType
      },
      naturalGasCostNm3,
      electricityPriceKwh
    );
  }, [methaneFeedRateNm3H, reactorPressureBar, liquidColumnHeightM, selectedAlloyId, carbonProductType, naturalGasCostNm3, electricityPriceKwh]);

  const selectedCarbonGrade = useMemo(() => {
    return CARBON_MARKET_GRADES.find(c => c.gradeId === carbonProductType) || CARBON_MARKET_GRADES[0];
  }, [carbonProductType]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Hydro Màu Lam (Turquoise H₂)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Zero CO₂ Phát Thải Trực Tiếp
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Cột Kim Loại Nóng Chảy Chống Coking
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-teal-400" />
            Nhiệt Phân Metan Trong Kim Loại Nóng Chảy (Turquoise H₂ & Carbon Rắn)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Bẻ gãy trực tiếp khí metan (CH₄ → C + 2H₂) trong bể hợp kim lỏng Ni-Bi ở 1,000°C. Muội than tự nổi lên mặt nhờ lực đẩy Archimedes, giải phóng Hydro siêu sạch và Carbon thương phẩm giá trị cao.
          </p>
        </div>

        {/* Quick KPI Badge */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3 text-right">
          <div className="text-xs text-slate-400 font-medium">Chi Phí Hydro Ròng (Net LCOH)</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {simResults.netLcohDollarKg < 0 ? (
              <span>-${Math.abs(simResults.netLcohDollarKg).toFixed(2)} <span className="text-xs text-emerald-300 font-normal">(Sinh Lời)</span></span>
            ) : (
              <span>${simResults.netLcohDollarKg.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ kg H₂</span></span>
            )}
          </div>
          <div className="text-xs text-teal-300 flex items-center justify-end gap-1 mt-0.5">
            <TrendingDown className="w-3 h-3" /> Tiết kiệm {simResults.electricitySavingsVsWaterElectrolysisPercent}% điện vs điện phân nước
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 my-5">
        <button
          onClick={() => setActiveTab('flowsheet')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'flowsheet'
              ? 'bg-slate-800 text-teal-300 border-b-2 border-teal-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Sơ Đồ Cột Bọt Kim Loại Nóng Chảy
        </button>
        <button
          onClick={() => setActiveTab('kinetics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'kinetics'
              ? 'bg-slate-800 text-teal-300 border-b-2 border-teal-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Động Học Bọt Khí & Chống Coking
        </button>
        <button
          onClick={() => setActiveTab('economics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'economics'
              ? 'bg-slate-800 text-teal-300 border-b-2 border-teal-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Kinh Tế Hydro & Giá Trị Phụ Phẩm Carbon
        </button>
      </div>

      {/* TAB 1: Sơ Đồ Cột Bọt Kim Loại Nóng Chảy */}
      {activeTab === 'flowsheet' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Factory className="w-4 h-4 text-teal-400" />
              Sơ Đồ Lò Phản Ứng Cột Bọt Kim Loại Lỏng & Cơ Chế Tự Nổi Tách Muội Than
            </h3>

            {/* Dynamic SVG Flowsheet */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 920 420" className="w-full min-w-[760px] h-auto">
                <defs>
                  <linearGradient id="moltenMetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#c2410c" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#9a3412" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="carbonLayerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                </defs>

                {/* 1. Induction Heating Coils */}
                <rect x="230" y="90" width="20" height="260" rx="4" fill="#f59e0b" opacity="0.6" />
                <rect x="490" y="90" width="20" height="260" rx="4" fill="#f59e0b" opacity="0.6" />
                <text x="210" y="220" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 210 220)">
                  Cuộn Gia Nhiệt Cảm Ứng (Induction 1000°C)
                </text>

                {/* 2. Main Molten Metal Reactor Column */}
                <rect x="260" y="60" width="220" height="300" rx="14" fill="#18181b" stroke="#71717a" strokeWidth="3" />
                
                {/* Molten Liquid Metal Pool (Bismuth-Nickel alloy) */}
                <rect x="265" y="130" width="210" height="225" rx="6" fill="url(#moltenMetalGrad)" />
                <text x="370" y="245" fill="#fef08a" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {currentAlloy.name} (T = {currentAlloy.operatingTemperatureC}°C)
                </text>
                <text x="370" y="265" fill="#fed7aa" fontSize="10" textAnchor="middle">
                  Mật độ: {currentAlloy.densityKgM3} kg/m³ | Chiều cao cột: {liquidColumnHeightM}m
                </text>

                {/* Bubbles rising inside molten metal */}
                <circle cx="310" cy="320" r="7" fill="#38bdf8" opacity="0.8" />
                <circle cx="370" cy="310" r="8" fill="#38bdf8" opacity="0.8" />
                <circle cx="430" cy="325" r="6" fill="#38bdf8" opacity="0.8" />

                <circle cx="330" cy="280" r="9" fill="#38bdf8" opacity="0.85" />
                <circle cx="410" cy="275" r="9" fill="#38bdf8" opacity="0.85" />

                <circle cx="350" cy="210" r="11" fill="#38bdf8" opacity="0.9" />
                <circle cx="390" cy="205" r="11" fill="#38bdf8" opacity="0.9" />

                <circle cx="330" cy="160" r="13" fill="#22d3ee" opacity="0.95" />
                <circle cx="410" cy="155" r="13" fill="#22d3ee" opacity="0.95" />

                {/* 3. Floating Solid Carbon Layer on Top of Metal Pool */}
                <rect x="265" y="105" width="210" height="25" rx="3" fill="url(#carbonLayerGrad)" stroke="#64748b" strokeWidth="1" />
                <text x="370" y="122" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Lớp Carbon Rắn Tự Nổi (ρ = 2,150 kg/m³)
                </text>

                {/* 4. Bottom Methane Gas Sparger */}
                <path d="M 120 375 L 370 375 L 370 355" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
                <polygon points="370,350 365,360 375,360" fill="#38bdf8" />
                <rect x="40" y="355" width="130" height="40" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="105" y="375" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Khí Metan (CH₄)</text>
                <text x="105" y="390" fill="#bae6fd" fontSize="9" textAnchor="middle">{methaneFeedRateNm3H} Nm³/h @ {reactorPressureBar} bar</text>

                {/* 5. Carbon Skimmer / Extractor Mechanism */}
                <path d="M 475 115 L 590 115 L 630 150" stroke="#94a3b8" strokeWidth="3" fill="none" strokeDasharray="5 3" />
                <polygon points="630,150 620,145 625,140" fill="#94a3b8" />
                <rect x="630" y="130" width="160" height="90" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="710" y="155" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Thu Hồi Carbon Rắn</text>
                <text x="710" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">{selectedCarbonGrade.vietnameseName}</text>
                <text x="710" y="195" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {simResults.solidCarbonYieldKgH} kg/h
                </text>
                <text x="710" y="210" fill="#38bdf8" fontSize="9" textAnchor="middle">
                  Giá: ${selectedCarbonGrade.marketPriceDollarKg}/kg (${simResults.carbonRevenueDollarHour}/h)
                </text>

                {/* 6. Top Pure Hydrogen Gas Exit & Cyclone Filter */}
                <path d="M 370 60 L 370 25 L 660 25 L 660 50" stroke="#2dd4bf" strokeWidth="3.5" fill="none" />
                <polygon points="660,55 655,45 665,45" fill="#2dd4bf" />
                <rect x="630" y="55" width="160" height="65" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeWidth="2" />
                <text x="710" y="78" fill="#ccfbf1" fontSize="12" fontWeight="bold" textAnchor="middle">Khí Hydro Màu Lam (H₂)</text>
                <text x="710" y="96" fill="#5eead4" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {simResults.hydrogenProductionKgH} kg/h ({simResults.hydrogenProductionNm3H} Nm³/h)
                </text>
                <text x="710" y="112" fill="#99f6e4" fontSize="9" textAnchor="middle">Độ tinh khiết &gt; 99.8% (Zero Direct CO₂)</text>
              </svg>
            </div>

            {/* Bottom KPI metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Độ chuyển hóa CH₄ 1 pass:</span>
                <span className="text-sm font-bold text-teal-300">{simResults.methaneConversionPercent}%</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Sản lượng Hydro / giờ:</span>
                <span className="text-sm font-bold text-cyan-400">{simResults.hydrogenProductionKgH} kg H₂/h</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Sản lượng Carbon / giờ:</span>
                <span className="text-sm font-bold text-emerald-400">{simResults.solidCarbonYieldKgH} kg C/h</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Suất điện năng tiêu thụ:</span>
                <span className="text-sm font-bold text-amber-400">{simResults.specificElectricityKwhPerKgH2} kWh / kg H₂</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Động Học Bọt Khí & Chống Coking */}
      {activeTab === 'kinetics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Sliders & Catalyst Selector */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gauge className="w-5 h-5 text-teal-400" />
                Thông Số Cột Kim Loại Nóng Chảy & Xúc Tác
              </h3>

              {/* Alloy Selector */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Lựa Chọn Hợp Kim Kim Loại Lỏng Hoạt Hóa:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MOLTEN_ALLOYS.map((alloy) => (
                    <button
                      key={alloy.id}
                      onClick={() => setSelectedAlloyId(alloy.id)}
                      className={`p-2.5 rounded text-left text-xs font-medium border transition-colors ${
                        selectedAlloyId === alloy.id
                          ? 'bg-teal-950/80 border-teal-400 text-teal-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-white">{alloy.name}</div>
                      <div className="text-[10px] text-slate-400">Nhiệt độ: {alloy.operatingTemperatureC}°C | Ea: {alloy.activationEnergyKjMol} kJ/mol</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Column Height Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Chiều cao cột kim loại lỏng:</span>
                  <span className="text-teal-300 font-bold">{liquidColumnHeightM.toFixed(1)} m</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={liquidColumnHeightM}
                  onChange={(e) => setLiquidColumnHeightM(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Quyết định thời gian lưu của bọt khí (Bubble residence time: ~2.5s)</span>
              </div>

              {/* Temperature Offset Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Nhiệt độ vận hành bể lò:</span>
                  <span className="text-amber-400 font-bold">{currentAlloy.operatingTemperatureC}°C</span>
                </div>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  step="10"
                  value={operatingTempOffsetC}
                  onChange={(e) => setOperatingTempOffsetC(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Phạm vi 900°C - 1,120°C cho bẻ gãy liên kết C-H tốc độ cao</span>
              </div>

              {/* Pressure Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Áp suất lò phản ứng:</span>
                  <span className="text-blue-400 font-bold">{reactorPressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={reactorPressureBar}
                  onChange={(e) => setReactorPressureBar(Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Áp suất thủy tĩnh chân cột bọt khí</span>
              </div>
            </div>

            {/* Bubble Hydrodynamics & Floatation Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                  <Flame className="w-5 h-5 text-amber-400" />
                  Động Lực Học Nổi Tách Carbon & Chống Nghẽn
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Tốc độ nổi hạt Carbon 50µm (Stokes):</span>
                    <span className="font-mono font-bold text-emerald-400">{simResults.buoyancyFloatationVelocityCmS} cm/s</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Tốc độ nổi cụm hạt 150µm:</span>
                    <span className="font-mono font-bold text-teal-300">{(simResults.buoyancyFloatationVelocityCmS * 9).toFixed(1)} cm/s</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Chênh lệch khối lượng riêng (Δρ):</span>
                    <span className="font-mono font-bold text-cyan-400">{currentAlloy.densityKgM3 - 2150} kg/m³</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Nhiệt phản ứng thu nhiệt (ΔH°):</span>
                    <span className="font-mono font-bold text-amber-400">{simResults.endothermicReactionHeatKw} kWth</span>
                  </div>
                </div>

                {/* Electricity vs Water Electrolysis Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>So Sánh Điện Năng vs Điện Phân Nước PEM (52 kWh/kg H₂):</span>
                    <span className="font-bold text-teal-300">-{simResults.electricitySavingsVsWaterElectrolysisPercent}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-teal-400 h-full transition-all duration-300"
                      style={{ width: `${(simResults.specificElectricityKwhPerKgH2 / 52) * 100}%` }}
                    />
                    <div
                      className="bg-slate-700/80 h-full"
                      style={{ width: `${100 - (simResults.specificElectricityKwhPerKgH2 / 52) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Pyrolysis Metan ({simResults.specificElectricityKwhPerKgH2} kWh/kg)</span>
                    <span>Điện phân nước PEM (52.0 kWh/kg)</span>
                  </div>
                </div>
              </div>

              {/* Anti-Coking Mechanism Explanation */}
              <div className="mt-4 p-3 rounded-lg bg-teal-950/40 border border-teal-800/40 text-[11px] text-teal-300 leading-relaxed font-mono">
                Đặc tính chống coking vượt trội: Do kim loại lỏng ở trạng thái lỏng liên tục di động, các tinh thể carbon không thể bám dính vào bề mặt thành lò, mà lập tức bị đẩy nổi lên mặt thoáng chất lỏng, cho phép gạt tự động 100%.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Kinh Tế Hydro & Giá Trị Phụ Phẩm Carbon */}
      {activeTab === 'economics' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Boxes className="w-5 h-5 text-teal-400" />
              Lựa Chọn Phẩm Cấp Carbon Giá Trị Cao & Mô Hình Kinh Tế Kép
            </h3>

            {/* Carbon Grade Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {CARBON_MARKET_GRADES.map((grade) => (
                <button
                  key={grade.gradeId}
                  onClick={() => setCarbonProductType(grade.gradeId)}
                  className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    carbonProductType === grade.gradeId
                      ? 'bg-teal-950/60 border-teal-400 ring-1 ring-teal-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{grade.vietnameseName}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{grade.primaryApplication}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Giá thị trường:</span>
                    <span className="font-bold text-emerald-400">${grade.marketPriceDollarKg.toFixed(2)} / kg</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Scale Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Lưu lượng khí Metan nạp (Feed Rate):</span>
                    <span className="text-teal-300 font-bold">{methaneFeedRateNm3H.toLocaleString()} Nm³/h</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={methaneFeedRateNm3H}
                    onChange={(e) => setMethaneFeedRateNm3H(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>200 Nm³/h (Thí điểm)</span>
                    <span>1,000 Nm³/h (Cụm mô đun)</span>
                    <span>5,000 Nm³/h (Nhà máy công nghiệp)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-400">Giá khí tự nhiên ($/Nm³):</span>
                      <span className="text-white font-bold">${naturalGasCostNm3.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.15"
                      max="0.60"
                      step="0.05"
                      value={naturalGasCostNm3}
                      onChange={(e) => setNaturalGasCostNm3(Number(e.target.value))}
                      className="w-full accent-slate-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-400">Giá điện ($/kWh):</span>
                      <span className="text-white font-bold">${electricityPriceKwh.toFixed(3)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.02"
                      max="0.08"
                      step="0.005"
                      value={electricityPriceKwh}
                      onChange={(e) => setElectricityPriceKwh(Number(e.target.value))}
                      className="w-full accent-slate-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tỷ lệ khối lượng Carbon : Hydro:</span>
                    <span className="font-mono font-bold text-slate-200">2.98 kg C / 1.00 kg H₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Doanh thu bán Carbon thương phẩm:</span>
                    <span className="font-mono font-bold text-emerald-400">${simResults.carbonRevenueDollarHour.toLocaleString()} / giờ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CO₂ tránh phát thải so với lò SMR:</span>
                    <span className="font-mono font-bold text-teal-300">{simResults.avoidedCo2EmissionsTonsYear.toLocaleString()} tấn CO₂/năm</span>
                  </div>
                </div>
              </div>

              {/* Dual Economics LCOH Card */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Cơ Cấu Giá Thành Hydro (LCOH Breakdown)
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Chi phí nguyên liệu khí Metan:</span>
                      <span className="font-mono font-bold text-slate-200">${(methaneFeedRateNm3H * naturalGasCostNm3 / simResults.hydrogenProductionKgH).toFixed(2)} / kg H₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Chi phí điện năng cảm ứng:</span>
                      <span className="font-mono font-bold text-slate-200">${(simResults.specificElectricityKwhPerKgH2 * electricityPriceKwh).toFixed(2)} / kg H₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Khấu hao lò & xúc tác hợp kim:</span>
                      <span className="font-mono font-bold text-slate-200">$0.70 / kg H₂</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-700 font-bold">
                      <span className="text-slate-200">Giá thành gộp (Gross LCOH):</span>
                      <span className="font-mono text-sm text-amber-400">${simResults.grossLcohDollarKg} / kg H₂</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold">
                      <span className="text-teal-300">Khấu trừ giá trị phụ phẩm Carbon:</span>
                      <span className="font-mono text-sm text-emerald-400">-${(simResults.carbonRevenueDollarHour / simResults.hydrogenProductionKgH).toFixed(2)} / kg H₂</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-teal-500/40 font-bold">
                      <span className="text-emerald-400 text-sm">Giá Thành Hydro Ròng (Net LCOH):</span>
                      <span className="font-mono text-base text-emerald-400">
                        {simResults.netLcohDollarKg < 0 ? `-$${Math.abs(simResults.netLcohDollarKg).toFixed(2)} / kg H₂ (Lãi)` : `$${simResults.netLcohDollarKg.toFixed(2)} / kg H₂`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-teal-500/10 border border-teal-500/30 rounded text-center text-xs text-teal-300 font-medium">
                  Mô hình cộng sinh: Doanh thu bán Carbon rắn bù đắp toàn bộ chi phí sản xuất Hydro!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethanePyrolysisMoltenMetalVisualizer;
