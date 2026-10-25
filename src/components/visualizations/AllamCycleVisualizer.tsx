// src/components/visualizations/AllamCycleVisualizer.tsx
// ============================================================================
// SUPERCRITICAL CO2 ALLAM-FETVEDT CYCLE INTERACTIVE VISUALIZER
// High-Pressure Oxy-Combustion, Inherent 100% Carbon Capture, and 0 ppm NOx
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Droplets,
  Layers,
  TrendingDown,
  ShieldCheck,
  Globe,
  Gauge,
  Factory,
  Sparkles
} from 'lucide-react';
import {
  AllamCycleEngine,
  BENCHMARK_POWER_PLANTS,
  ComparisonPowerPlant
} from '../../domain/allamCycleEngine';

export const AllamCycleVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flowsheet' | 'thermodynamics' | 'benchmarks'>('flowsheet');

  // Interactive parameters
  const [naturalGasHeatInputMw, setNaturalGasHeatInputMw] = useState<number>(500);
  const [turbineInletPressureBar, setTurbineInletPressureBar] = useState<number>(300);
  const [turbineInletTempC, setTurbineInletTempC] = useState<number>(1150);
  const [pcheEffectiveness, setPcheEffectiveness] = useState<number>(0.96);
  const [fuelPricePerMmbtu, setFuelPricePerMmbtu] = useState<number>(3.50);

  const cycleResults = useMemo(() => {
    return AllamCycleEngine.simulateCycle({
      turbineInletPressureBar,
      turbineInletTemperatureC: turbineInletTempC,
      turbineOutletPressureBar: 30,
      turbineOutletTemperatureC: 750,
      naturalGasHeatInputMwLhv: naturalGasHeatInputMw,
      oxygenPurityPercent: 99.5,
      co2RecycleRatio: 28,
      pcheRecuperatorEffectiveness: pcheEffectiveness
    });
  }, [naturalGasHeatInputMw, turbineInletPressureBar, turbineInletTempC, pcheEffectiveness]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Oxy-Combustion sCO₂ (300 bar)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Inherent 100% Bẫy Carbon
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Zero Khói & Zero NOx
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-rose-400" />
            Chu Trình Allam-Fetvedt sCO₂ (Nhiệt Điện Siêu Tới Hạn Zero-Emission)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Đốt cháy khí thiên nhiên trong môi trường oxy tinh khiết và sCO₂ tuần hoàn ở 300 bar. 100% khí CO₂ sinh ra được thu hồi trực tiếp ở trạng thái siêu tới hạn mà không cần tháp hấp thụ hóa chất.
          </p>
        </div>

        {/* Quick KPI Badge */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3 text-right">
          <div className="text-xs text-slate-400 font-medium">Hiệu Suất Điện Ròng (LHV)</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {cycleResults.netThermalEfficiencyLhvPercent}% <span className="text-xs text-slate-400 font-normal">LHV</span>
          </div>
          <div className="text-xs text-cyan-400 flex items-center justify-end gap-1 mt-0.5">
            <Sparkles className="w-3 h-3" /> Công suất phát ròng: {cycleResults.netElectricOutputMw} MWe
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 my-5">
        <button
          onClick={() => setActiveTab('flowsheet')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'flowsheet'
              ? 'bg-slate-800 text-rose-400 border-b-2 border-rose-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Sơ Đồ Chu Trình Oxy-Combustion sCO₂
        </button>
        <button
          onClick={() => setActiveTab('thermodynamics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'thermodynamics'
              ? 'bg-slate-800 text-rose-400 border-b-2 border-rose-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Nhiệt Động Học & Hiệu Suất 58.7%
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'benchmarks'
              ? 'bg-slate-800 text-rose-400 border-b-2 border-rose-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Kinh Tế LCOE & So Sánh Bẫy Carbon
        </button>
      </div>

      {/* TAB 1: Sơ Đồ Chu Trình Oxy-Combustion sCO₂ */}
      {activeTab === 'flowsheet' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Factory className="w-4 h-4 text-rose-400" />
              Sơ Đồ Vòng Kín Siêu Tới Hạn sCO₂ Allam (Không Ống Khói - Zero Chimney)
            </h3>

            {/* Dynamic SVG Flowsheet */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 940 400" className="w-full min-w-[780px] h-auto">
                {/* 1. Cryogenic ASU (O2 generator) */}
                <rect x="30" y="60" width="120" height="90" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Cụm Tách Khí ASU</text>
                <text x="90" y="108" fill="#94a3b8" fontSize="9" textAnchor="middle">Cryogenic Distillation</text>
                <text x="90" y="130" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">99.5% Oxy (O₂)</text>

                {/* 2. Fuel Supply */}
                <rect x="30" y="180" width="120" height="70" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="90" y="210" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Khí Metan (CH₄)</text>
                <text x="90" y="230" fill="#fed7aa" fontSize="10" textAnchor="middle">{naturalGasHeatInputMw} MWth LHV</text>

                {/* Pipes to Combustor */}
                <path d="M 150 105 L 230 105 L 230 140 L 260 140" stroke="#38bdf8" strokeWidth="3" fill="none" />
                <path d="M 150 215 L 230 215 L 230 160 L 260 160" stroke="#f59e0b" strokeWidth="3" fill="none" />

                {/* 3. Oxy-Combustor (300 bar, 1150°C) */}
                <rect x="260" y="110" width="130" height="90" rx="12" fill="#7f1d1d" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="325" y="140" fill="#fecdd3" fontSize="13" fontWeight="bold" textAnchor="middle">Buồng Đốt Oxy</text>
                <text x="325" y="160" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{turbineInletPressureBar} bar | {turbineInletTempC}°C</text>
                <text x="325" y="180" fill="#fda4af" fontSize="9" textAnchor="middle">sCO₂ Working Fluid (95%)</text>

                {/* 4. sCO2 Turbine (Compact axial expansion) */}
                <path d="M 390 155 L 450 155" stroke="#f43f5e" strokeWidth="4" fill="none" />
                <polygon points="450,155 440,150 440,160" fill="#f43f5e" />

                <polygon points="460,110 550,85 550,225 460,200" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                <text x="505" y="145" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">Tua Bin sCO₂</text>
                <text x="505" y="165" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">+{cycleResults.grossTurbineOutputMw} MW</text>
                <text x="505" y="182" fill="#a5b4fc" fontSize="9" textAnchor="middle">300 bar → 30 bar</text>

                {/* Generator shaft */}
                <line x1="550" y1="155" x2="600" y2="155" stroke="#cbd5e1" strokeWidth="5" />
                <rect x="600" y="130" width="50" height="50" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
                <text x="625" y="160" fill="#bbf7d0" fontSize="10" fontWeight="bold" textAnchor="middle">GEN</text>

                {/* 5. Printed Circuit Heat Exchanger (PCHE) Recuperator */}
                <path d="M 505 225 L 505 280 L 400 280" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <polygon points="400,280 410,275 410,285" fill="#f59e0b" />

                <rect x="250" y="245" width="150" height="70" rx="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                <text x="325" y="272" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">Bộ Hồi Nhiệt PCHE</text>
                <text x="325" y="292" fill="#94a3b8" fontSize="9" textAnchor="middle">Hiệu quả trao đổi: {pcheEffectiveness * 100}%</text>

                {/* 6. Water Condenser / Separator */}
                <path d="M 250 280 L 160 280 L 160 320" stroke="#38bdf8" strokeWidth="3" fill="none" />
                <polygon points="160,320 155,310 165,310" fill="#38bdf8" />

                <rect x="110" y="320" width="100" height="60" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="160" y="345" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Tách Nước</text>
                <text x="160" y="365" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                  {cycleResults.waterCogenerationKgH} kg/h H₂O
                </text>

                {/* 7. Supercritical CO2 Recycle Pump */}
                <path d="M 210 350 L 325 350 L 325 315" stroke="#10b981" strokeWidth="3" fill="none" />
                
                {/* 8. Pure Pipeline-Ready CO2 Export Stream */}
                <path d="M 325 245 L 325 200" stroke="#10b981" strokeWidth="3" fill="none" />
                <path d="M 505 85 L 505 50 L 720 50" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="5 3" />
                <polygon points="720,50 710,45 710,55" fill="#10b981" />

                <rect x="730" y="30" width="180" height="90" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                <text x="820" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Xuất CO₂ Đường Ống</text>
                <text x="820" y="75" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {cycleResults.pipelineCo2CapturedKgH.toLocaleString()} kg/h
                </text>
                <text x="820" y="95" fill="#6ee7b7" fontSize="10" textAnchor="middle">100% Thu Hồi Tự Thân (Inherent)</text>
                <text x="820" y="110" fill="#d1fae5" fontSize="8" textAnchor="middle">Sẵn sàng lưu trữ vỉa địa chất / EOR</text>
              </svg>
            </div>

            {/* Bottom KPI metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Công suất phát điện ròng:</span>
                <span className="text-sm font-bold text-emerald-400">{cycleResults.netElectricOutputMw} MWe</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Tỷ lệ bắt giữ CO₂:</span>
                <span className="text-sm font-bold text-cyan-400">100.0% (Inherent)</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Nhiệt độ đầu vào tua bin:</span>
                <span className="text-sm font-bold text-rose-300">{turbineInletTempC}°C @ {turbineInletPressureBar} bar</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Phát thải NOx & SOx:</span>
                <span className="text-sm font-bold text-emerald-400">0.0 ppm (Zero Chimney)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Nhiệt Động Học & Hiệu Suất 58.7% */}
      {activeTab === 'thermodynamics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Sliders */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gauge className="w-5 h-5 text-rose-400" />
                Thông Số Vận Hành Chu Trình sCO₂
              </h3>

              {/* Slider 1: Heat Input */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Công suất nhiệt đầu vào nhiên liệu:</span>
                  <span className="text-rose-400 font-bold">{naturalGasHeatInputMw} MWth LHV</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={naturalGasHeatInputMw}
                  onChange={(e) => setNaturalGasHeatInputMw(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Quy mô nhà máy thương mại điển hình 300 - 600 MWth</span>
              </div>

              {/* Slider 2: Turbine Inlet Pressure */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Áp suất đầu vào tua bin sCO₂:</span>
                  <span className="text-amber-400 font-bold">{turbineInletPressureBar} bar</span>
                </div>
                <input
                  type="range"
                  min="240"
                  max="350"
                  step="10"
                  value={turbineInletPressureBar}
                  onChange={(e) => setTurbineInletPressureBar(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Vùng áp suất siêu tới hạn (P_c = 73.8 bar)</span>
              </div>

              {/* Slider 3: Turbine Inlet Temperature */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Nhiệt độ đầu vào tua bin:</span>
                  <span className="text-rose-400 font-bold">{turbineInletTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="1250"
                  step="25"
                  value={turbineInletTempC}
                  onChange={(e) => setTurbineInletTempC(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Vật liệu siêu hợp kim đơn tinh thể chịu nhiệt cao</span>
              </div>

              {/* Slider 4: PCHE Effectiveness */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Hiệu quả bộ hồi nhiệt vi kênh (PCHE):</span>
                  <span className="text-cyan-400 font-bold">{(pcheEffectiveness * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.92"
                  max="0.98"
                  step="0.01"
                  value={pcheEffectiveness}
                  onChange={(e) => setPcheEffectiveness(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Hàn khuếch tán vi rãnh (Printed Circuit Heat Exchanger)</span>
              </div>
            </div>

            {/* Power Balance Panel */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Cân Bằng Năng Lượng & Tải Tự Dùng
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Công suất phát gộp tua bin (Gross Output):</span>
                    <span className="font-mono font-bold text-white text-sm">+{cycleResults.grossTurbineOutputMw} MWe</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Điện năng cụm tách oxy ASU:</span>
                    <span className="font-mono font-bold text-cyan-400">-{cycleResults.asuElectricDutyMw} MWe</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Bơm nén hoàn lưu sCO₂ (30 → 300 bar):</span>
                    <span className="font-mono font-bold text-amber-400">-{cycleResults.co2CompressorDutyMw} MWe</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-emerald-500/40">
                    <span className="text-slate-300 font-medium">Công suất phát điện ròng lưới (Net Export):</span>
                    <span className="font-mono font-bold text-emerald-400 text-base">{cycleResults.netElectricOutputMw} MWe</span>
                  </div>
                </div>

                {/* Efficiency Gauge */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Hiệu Suất Nhiệt Ròng Chu Trình Allam sCO₂:</span>
                    <span className="font-bold text-emerald-400">{cycleResults.netThermalEfficiencyLhvPercent}% LHV</span>
                  </div>
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(cycleResults.netThermalEfficiencyLhvPercent / 65) * 100}%` }}
                    />
                    <div
                      className="bg-slate-700/80 h-full"
                      style={{ width: `${100 - (cycleResults.netThermalEfficiencyLhvPercent / 65) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Chu Trình Allam ({cycleResults.netThermalEfficiencyLhvPercent}%)</span>
                    <span>Giới hạn lý thuyết Carnot (~65%)</span>
                  </div>
                </div>
              </div>

              {/* Water byproduct badge */}
              <div className="mt-4 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300 leading-relaxed font-mono flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                Đồng sinh {cycleResults.waterCogenerationKgH.toLocaleString()} kg nước tinh khiết ngưng tụ mỗi giờ. Chu trình không tiêu thụ nước mà xuất khẩu nước ròng!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Kinh Tế LCOE & So Sánh Bẫy Carbon */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Globe className="w-5 h-5 text-emerald-400" />
              So Sánh Với Các Công Nghệ Nhiệt Điện & Bẫy Carbon Toàn Cầu
            </h3>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Công Nghệ Nhiệt Điện</th>
                    <th className="p-3 text-center">Hiệu Suất (LHV)</th>
                    <th className="p-3 text-center">Phát Thải CO₂ (g/kWh)</th>
                    <th className="p-3 text-center">Chi Phí Bẫy Carbon ($/t)</th>
                    <th className="p-3 text-center">Nước Tiêu Thụ (L/kWh)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {BENCHMARK_POWER_PLANTS.map((plant) => (
                    <tr
                      key={plant.type}
                      className={plant.type === 'Allam_Cycle_sCO2' ? 'bg-emerald-950/30 font-bold text-white' : 'hover:bg-slate-900/50'}
                    >
                      <td className="p-3 flex items-center gap-2">
                        {plant.type === 'Allam_Cycle_sCO2' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                        {plant.vietnameseName}
                      </td>
                      <td className="p-3 text-center text-emerald-400">{plant.efficiencyPercent}%</td>
                      <td className="p-3 text-center">{plant.co2IntensityGPerKwh} g/kWh</td>
                      <td className="p-3 text-center text-cyan-400">{plant.captureCostPerTon === 0 ? '$0 (Inherent)' : `$${plant.captureCostPerTon}/t`}</td>
                      <td className="p-3 text-center">{plant.waterConsumptionLPerKwh < 0 ? `${plant.waterConsumptionLPerKwh} L (Tạo Nước)` : `${plant.waterConsumptionLPerKwh} L`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Avoided Emissions Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Khối Lượng CO₂ Giảm Thiểu Hàng Năm
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">So với nhà máy Nhiệt điện than:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{cycleResults.avoidedCo2TonsYearVsCoal.toLocaleString()} tấn CO₂/năm</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">So với CCGT không có bẫy carbon:</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{cycleResults.avoidedCo2TonsYearVsCcgt.toLocaleString()} tấn CO₂/năm</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  Dòng CO₂ siêu tới hạn ở 30 - 150 bar xuất ra trực tiếp từ chu trình có độ tinh khiết &gt; 99.8%, sẵn sàng nạp vào đường ống dẫn khí hóa lỏng.
                </div>
              </div>

              {/* LCOE Card */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Giá Thành Điện Bình Lực (LCOE)
                  </div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-400">Chi phí phát điện quy dẫn:</span>
                    <span className="font-mono font-bold text-emerald-400 text-lg">${cycleResults.lcoeDollarMwh} / MWh</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    Nhờ loại bỏ hoàn toàn hệ thống tháp rửa amine đắt đỏ và không bị tụt 9% hiệu suất, chu trình Allam đạt LCOE cạnh tranh trực tiếp với CCGT truyền thống kể cả khi chưa tính thuế carbon.
                  </div>
                </div>

                <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-xs text-emerald-400 font-medium">
                  Giải pháp then chốt để cung cấp điện nền (baseload) 24/7 sạch cho các trung tâm dữ liệu AI tương lai.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllamCycleVisualizer;
