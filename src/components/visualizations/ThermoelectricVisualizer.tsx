// src/components/visualizations/ThermoelectricVisualizer.tsx
// Interactive Visualizer: Thermoelectric Seebeck & Peltier Modules (ZT > 2.5) & Waste Heat Recovery
// Standards: IUPAC Physical Chemistry, PGEC (Slack 1995) & Vietnam GDPT 2018 (Vật lý Nhiệt điện & Bán dẫn)

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Snowflake,
  Activity,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  Box,
  Cpu,
  Atom,
  TrendingUp,
  Zap,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import {
  THERMOELECTRIC_MATERIALS_CATALOG,
  calculateThermoelectricZt,
  simulateTegWasteHeatRecovery,
  simulatePeltierCooling,
  ThermoelectricMaterial
} from '../../domain/thermoelectricEngine';
import { sound } from '../../audio/soundEngine';

type ThermoelectricTabMode = 'ZT_FIGURE_OF_MERIT' | 'WASTE_HEAT_HARVESTING' | 'PELTIER_SOLID_COOLING';

export const ThermoelectricVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ThermoelectricTabMode>('ZT_FIGURE_OF_MERIT');

  // Mode 1: ZT State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('SNSE_SINGLE_CRYSTAL');
  const [operatingTempCelsius, setOperatingTempCelsius] = useState<number>(650);

  // Mode 2: Waste Heat State
  const [hotSideTempCelsius, setHotSideTempCelsius] = useState<number>(350);
  const [coldSideTempCelsius, setColdSideTempCelsius] = useState<number>(50);
  const [coupleCount, setCoupleCount] = useState<number>(127);

  // Mode 3: Peltier Cooling State
  const [appliedCurrentA, setAppliedCurrentA] = useState<number>(3.5);
  const [ambientTempCelsius, setAmbientTempCelsius] = useState<number>(30);
  const [activeHeatLoadW, setActiveHeatLoadW] = useState<number>(15.0);

  // Computed values
  const currentMaterial = useMemo(() => {
    return THERMOELECTRIC_MATERIALS_CATALOG.find(m => m.id === selectedMaterialId) || THERMOELECTRIC_MATERIALS_CATALOG[1];
  }, [selectedMaterialId]);

  const ztCalculation = useMemo(() => {
    return calculateThermoelectricZt(selectedMaterialId, operatingTempCelsius);
  }, [selectedMaterialId, operatingTempCelsius]);

  const tegSimulation = useMemo(() => {
    return simulateTegWasteHeatRecovery(selectedMaterialId, hotSideTempCelsius, coldSideTempCelsius, coupleCount);
  }, [selectedMaterialId, hotSideTempCelsius, coldSideTempCelsius, coupleCount]);

  const peltierSimulation = useMemo(() => {
    return simulatePeltierCooling(selectedMaterialId, appliedCurrentA, ambientTempCelsius, activeHeatLoadW);
  }, [selectedMaterialId, appliedCurrentA, ambientTempCelsius, activeHeatLoadW]);

  const handleTabChange = (mode: ThermoelectricTabMode) => {
    sound.playUiClick();
    setActiveTab(mode);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Hiệu Ứng Nhiệt Điện Seebeck & Peltier (ZT &gt; 2.5)
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-950/80 text-orange-400 border border-orange-800">
                Slack PGEC • IUPAC
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Đơn tinh thể SnSe, Bismut Tellurit Bi₂Te₃, Thu hồi nhiệt thải ô tô & Tủ lạnh bán dẫn không chất làm lạnh
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleTabChange('ZT_FIGURE_OF_MERIT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'ZT_FIGURE_OF_MERIT'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Hệ Số ZT & PGEC
          </button>
          <button
            onClick={() => handleTabChange('WASTE_HEAT_HARVESTING')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'WASTE_HEAT_HARVESTING'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Thu Hồi Nhiệt Thải (TEG)
          </button>
          <button
            onClick={() => handleTabChange('PELTIER_SOLID_COOLING')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'PELTIER_SOLID_COOLING'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            Làm Lạnh Rắn Peltier
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {/* TAB 1: ZT FIGURE OF MERIT */}
        {activeTab === 'ZT_FIGURE_OF_MERIT' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    1. Vật Liệu Nhiệt Điện Tiên Tiến
                  </label>
                  <div className="space-y-2">
                    {THERMOELECTRIC_MATERIALS_CATALOG.map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedMaterialId(mat.id);
                          setOperatingTempCelsius(mat.optimalOperatingTempKelvin - 273);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          selectedMaterialId === mat.id
                            ? 'bg-orange-950/40 border-orange-500 text-orange-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{mat.nameVi.split('(')[0]}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            S: {mat.seebeckCoefficientMicroVK} µV/K • ZT: {mat.peakZtValue} @ {mat.optimalOperatingTempKelvin}K
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          mat.peakZtValue >= 2.0
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          ZT: {mat.peakZtValue}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature Slider */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Nhiệt Độ Khảo Sát (T)
                    </span>
                    <span className="text-xs font-mono font-bold text-orange-400">
                      {operatingTempCelsius}°C ({operatingTempCelsius + 273} K)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={800}
                    step={10}
                    value={operatingTempCelsius}
                    onChange={e => setOperatingTempCelsius(Number(e.target.value))}
                    className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>-50°C</span>
                    <span>300°C (Nhiệt khí xả)</span>
                    <span>800°C (Lò công nghiệp)</span>
                  </div>
                </div>

                {/* Physics Breakdown Table */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hệ số Seebeck (S):</span>
                    <span className="font-mono text-orange-400 font-semibold">{currentMaterial.seebeckCoefficientMicroVK} µV/K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Độ dẫn điện (σ):</span>
                    <span className="font-mono text-cyan-400 font-semibold">{currentMaterial.electricalConductivityScm} S/cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Độ dẫn nhiệt toàn phần (κ):</span>
                    <span className="font-mono text-amber-400 font-semibold">{currentMaterial.totalThermalConductivityWmK} W/m·K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Độ dẫn nhiệt mạng tinh thể (κ_L):</span>
                    <span className="font-mono text-purple-400 font-semibold">{currentMaterial.latticeThermalConductivityWmK} W/m·K</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-300">Cơ chế PGEC:</strong> {currentMaterial.pgecPhononRattling ? 'Tán xạ mạnh phonon mạng (Phonon Rattling)' : 'Mạng tinh thể thông thường'}
                  </div>
                </div>
              </div>

              {/* Display & PN Junction SVG (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Hệ Số Phẩm Chất ZT</div>
                    <div className="text-2xl font-bold text-orange-400 font-mono mt-1">
                      {ztCalculation.figureOfMeritZt}
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Hệ Số Công Suất (PF)</div>
                    <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                      {ztCalculation.powerFactorMicroWmK2} <span className="text-xs">µW/cm·K²</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Hiệu Suất Thực Tế (η)</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      {ztCalculation.thermoelectricEfficiencyPercent} <span className="text-xs">%</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Giới Hạn Carnot (η_C)</div>
                    <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                      {ztCalculation.carnotEfficiencyLimitPercent} <span className="text-xs">%</span>
                    </div>
                  </div>
                </div>

                {/* SVG Thermoelectric Leg Carrier Diffusion */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Atom className="w-4 h-4 text-orange-400" />
                      Cặp Lưỡng Nhiệt Điện p-n &amp; Dòng Khuếch Tán Hạt Tải Nhiệt
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ZT = S²·σ·T / κ
                    </span>
                  </div>

                  <div className="h-60 w-full flex items-center justify-center">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* Hot Side Ceramic Plate */}
                      <rect x="60" y="20" width="280" height="20" fill="#dc2626" rx="3" />
                      <text x="200" y="34" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                        MẶT NÓNG T_hot ({operatingTempCelsius}°C)
                      </text>

                      {/* Hot Copper Interconnect */}
                      <rect x="90" y="40" width="220" height="10" fill="#b45309" />

                      {/* p-type Semiconductor Leg */}
                      <rect x="110" y="50" width="60" height="90" fill="#1e3a8a" rx="2" />
                      <text x="140" y="85" fill="#bfdbfe" fontSize="10" fontWeight="bold" textAnchor="middle">p-Type</text>
                      {/* Holes diffusing downward */}
                      <g fill="#60a5fa" fontSize="8" fontWeight="bold">
                        <text x="140" y="105" textAnchor="middle">h⁺ ↓</text>
                        <text x="140" y="125" textAnchor="middle">h⁺ ↓</text>
                      </g>

                      {/* n-type Semiconductor Leg */}
                      <rect x="230" y="50" width="60" height="90" fill="#14532d" rx="2" />
                      <text x="260" y="85" fill="#bbf7d0" fontSize="10" fontWeight="bold" textAnchor="middle">n-Type</text>
                      {/* Electrons diffusing downward */}
                      <g fill="#4ade80" fontSize="8" fontWeight="bold">
                        <text x="260" y="105" textAnchor="middle">e⁻ ↓</text>
                        <text x="260" y="125" textAnchor="middle">e⁻ ↓</text>
                      </g>

                      {/* Cold Copper Interconnects */}
                      <rect x="90" y="140" width="80" height="10" fill="#b45309" />
                      <rect x="230" y="140" width="80" height="10" fill="#b45309" />

                      {/* Cold Side Ceramic Plate */}
                      <rect x="60" y="150" width="280" height="20" fill="#0284c7" rx="3" />
                      <text x="200" y="164" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                        MẶT LẠNH T_cold (25°C)
                      </text>

                      {/* Output Voltage Terminals */}
                      <line x1="100" y1="170" x2="100" y2="190" stroke="#f59e0b" strokeWidth="2" />
                      <text x="100" y="198" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">+ V_out</text>

                      <line x1="300" y1="170" x2="300" y2="190" stroke="#38bdf8" strokeWidth="2" />
                      <text x="300" y="198" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">- V_out</text>
                    </svg>
                  </div>

                  <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong>Đột Phá Kỷ Lục SnSe:</strong> Đơn tinh thể SnSe trực thoi sở hữu cấu trúc mạng nguyên tử xếp nếp zigzag cực kỳ bất đối xứng, khiến các phonon dao động nhiệt bị triệt tiêu gần như hoàn toàn (độ dẫn nhiệt mạng kappa_L &lt; 0.25 W/(m·K) tiệm cận giới hạn lý thuyết tối thiểu), giúp hệ số ZT vọt lên kỷ lục thế giới 2.65.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WASTE HEAT HARVESTING */}
        {activeTab === 'WASTE_HEAT_HARVESTING' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Hệ Thống Thu Hồi Nhiệt Thải Ống Xả Ô Tô / Công Nghiệp (TEG)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Chuyển đổi trực tiếp nhiệt lượng ống xả động cơ đốt trong thành điện DC nạp ắc quy 12V
                  </p>
                </div>
                <div className="text-xs text-orange-400 font-mono bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800">
                  ΔT: {tegSimulation.temperatureDifferenceDeltaT} K
                </div>
              </div>

              {/* Sliders for Exhaust Temp & Cold Side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nhiệt độ khí xả (T_hot):</span>
                    <span className="font-mono text-rose-400 font-bold">{hotSideTempCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={600}
                    step={10}
                    value={hotSideTempCelsius}
                    onChange={e => setHotSideTempCelsius(Number(e.target.value))}
                    className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nhiệt độ nước làm mát (T_cold):</span>
                    <span className="font-mono text-cyan-400 font-bold">{coldSideTempCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={90}
                    step={5}
                    value={coldSideTempCelsius}
                    onChange={e => setColdSideTempCelsius(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Số cặp trụ nhiệt điện (N):</span>
                    <span className="font-mono text-amber-400 font-bold">{coupleCount} cặp</span>
                  </div>
                  <input
                    type="range"
                    min={31}
                    max={254}
                    step={1}
                    value={coupleCount}
                    onChange={e => setCoupleCount(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Output Performance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Điện Áp Hở Mạch (V_oc)</div>
                  <div className="text-xl font-bold text-orange-400 font-mono mt-1">
                    {tegSimulation.openCircuitVoltageV} <span className="text-xs">V</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">V_oc = N · 2|S| · ΔT</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Công Suất Điện Cực Đại</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {tegSimulation.maximumElectricPowerOutputWatts} <span className="text-xs">W</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Khớp tải R_load = {tegSimulation.matchedLoadResistanceOhms} Ω</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Dòng Nhiệt Dẫn Qua Module</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                    {tegSimulation.wasteHeatInputWatts} <span className="text-xs">W</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Tiết Kiệm Nhiên Liệu Xe</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    +{tegSimulation.automotiveFuelSavingPercent} <span className="text-xs">%</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Giảm tải cho máy phát Alternator</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PELTIER SOLID-STATE COOLING */}
        {activeTab === 'PELTIER_SOLID_COOLING' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Snowflake className="w-5 h-5 text-cyan-400" />
                    Mô Phỏng Làm Lạnh Rắn Bán Dẫn Peltier (CFC-Free Solid State Cooling)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bơm nhiệt bằng dòng điện một chiều DC không dùng máy nén cơ học, hoàn toàn không phát thải khí nhà kính
                  </p>
                </div>
                <div className="text-xs text-cyan-400 font-mono bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                  COP: {peltierSimulation.coefficientOfPerformanceCop}
                </div>
              </div>

              {/* Sliders for Peltier */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Dòng điện cấp DC (I):</span>
                    <span className="font-mono text-cyan-400 font-bold">{appliedCurrentA} A</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={6.0}
                    step={0.5}
                    value={appliedCurrentA}
                    onChange={e => setAppliedCurrentA(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tải nhiệt cần làm lạnh (Q_c):</span>
                    <span className="font-mono text-amber-400 font-bold">{activeHeatLoadW} W</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={40.0}
                    step={1.0}
                    value={activeHeatLoadW}
                    onChange={e => setActiveHeatLoadW(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nhiệt độ môi trường (T_amb):</span>
                    <span className="font-mono text-slate-300 font-bold">{ambientTempCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={45}
                    step={1}
                    value={ambientTempCelsius}
                    onChange={e => setAmbientTempCelsius(Number(e.target.value))}
                    className="w-full accent-slate-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Cooling Result Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Nhiệt Độ Mặt Lạnh (T_c)</div>
                  <div className={`text-xl font-bold font-mono mt-1 ${peltierSimulation.coldSideTemperatureCelsius < 0 ? 'text-cyan-400' : 'text-emerald-400'}`}>
                    {peltierSimulation.coldSideTemperatureCelsius} <span className="text-xs">°C</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">
                    {peltierSimulation.coldSideTemperatureCelsius < 0 ? 'Dưới điểm đóng băng 0°C' : 'Nhiệt độ phòng mát'}
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Độ Giảm Nhiệt (ΔT)</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    -{peltierSimulation.temperatureDropDeltaTCelsius} <span className="text-xs">°C</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Hệ Số Hiệu Quả (COP)</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                    {peltierSimulation.coefficientOfPerformanceCop}
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Khả Thi Làm Lạnh</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {peltierSimulation.isCoolingFeasible ? '✓ ĐẠT CHUẨN' : 'QUÁ TẢI NHIỆT'}
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
