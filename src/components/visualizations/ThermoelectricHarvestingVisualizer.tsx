// src/components/visualizations/ThermoelectricHarvestingVisualizer.tsx
// Interactive Visualizer: Solid-State Thermoelectric Generator & Peltier Heat Harvesting (TEG/TEC)
// Standards: IUPAC Physical Chemistry, Seebeck & Peltier Transport Physics, GDPT 2018 Physics & Industrial Waste Heat Harvesting

import React, { useState, useMemo } from 'react';
import {
  Zap,
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
  Car,
  Rocket,
  Cpu,
  ArrowRight
} from 'lucide-react';
import {
  THERMOELECTRIC_MATERIALS,
  ThermoelectricMaterialId,
  calculateFigureOfMeritZT,
  calculateThermoelectricGeneratorPerformance,
  calculateAutomotiveExhaustTegEconomics
} from '../../domain/thermoelectricGeneratorEngine';
import { sound } from '../../audio/soundEngine';

type TegTabMode =
  | 'ZT_MATERIALS_DISCOVERY'
  | 'POWER_EFFICIENCY_MAP'
  | 'AUTOMOTIVE_EXHAUST_TEG';

export const ThermoelectricHarvestingVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TegTabMode>('POWER_EFFICIENCY_MAP');

  // Controls for Mode 1 & 2
  const [materialId, setMaterialId] = useState<ThermoelectricMaterialId>('SKUTTERUDITE_FILLED_MID_TEMP');
  const [hotSideTempC, setHotSideTempC] = useState<number>(380.0);
  const [coldSideTempC, setColdSideTempC] = useState<number>(50.0);
  const [thermocouplePairs, setThermocouplePairs] = useState<number>(256);
  const [thermalInputWatts, setThermalInputWatts] = useState<number>(3000.0);

  // Controls for Mode 3 (Automotive)
  const [enginePowerKW, setEnginePowerKW] = useState<number>(150.0);
  const [exhaustTempC, setExhaustTempC] = useState<number>(400.0);

  const selectedMaterial = THERMOELECTRIC_MATERIALS[materialId];

  // Calculations
  const tegPerformance = useMemo(() => {
    return calculateThermoelectricGeneratorPerformance(
      materialId,
      hotSideTempC,
      coldSideTempC,
      thermocouplePairs,
      thermalInputWatts
    );
  }, [materialId, hotSideTempC, coldSideTempC, thermocouplePairs, thermalInputWatts]);

  const autoEconomics = useMemo(() => {
    return calculateAutomotiveExhaustTegEconomics(enginePowerKW, exhaustTempC, 65.0);
  }, [enginePowerKW, exhaustTempC]);

  const handleModeChange = (mode: TegTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setMaterialId('SKUTTERUDITE_FILLED_MID_TEMP');
    setHotSideTempC(380.0);
    setColdSideTempC(50.0);
    setThermocouplePairs(256);
    setThermalInputWatts(3000.0);
    setEnginePowerKW(150.0);
    setExhaustTempC(400.0);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Máy Phát Nhiệt Điện Bán Dẫn (TEG / Seebeck Generator)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                0% Bộ Phận Chuyển Động • zT &gt; 1.6 • Bền Bỉ &gt; 45 Năm
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Solid-State Thermoelectric Generator &amp; Peltier Cooling
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hiệu ứng Seebeck phát điện trực tiếp từ chênh lệch nhiệt độ • Cấu trúc lồng Skutterudite &amp; Bi₂Te₃ • Thu hồi nhiệt khí thải ô tô và lò nung công nghiệp
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('POWER_EFFICIENCY_MAP')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'POWER_EFFICIENCY_MAP'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Phát Điện Seebeck &amp; Cặp Nhiệt</span>
          </button>

          <button
            onClick={() => handleModeChange('ZT_MATERIALS_DISCOVERY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'ZT_MATERIALS_DISCOVERY'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 ring-1 ring-orange-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Chỉ Số zT &amp; Bản Đồ Vật Liệu</span>
          </button>

          <button
            onClick={() => handleModeChange('AUTOMOTIVE_EXHAUST_TEG')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'AUTOMOTIVE_EXHAUST_TEG'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Thu Hồi Khí Thải Ô Tô &amp; Xe Tải</span>
          </button>
        </div>
      </div>

      {/* MODE 1: POWER & EFFICIENCY MAP WITH THERMOCOUPLE SVG */}
      {activeMode === 'POWER_EFFICIENCY_MAP' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                Thông Số Module Nhiệt Điện
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Material Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-semibold">Vật liệu bán dẫn nhiệt điện:</label>
              <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value as ThermoelectricMaterialId)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {Object.values(THERMOELECTRIC_MATERIALS).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.chemicalFormula} - {m.name} (zT = {m.peakFigureOfMeritZT})
                  </option>
                ))}
              </select>
            </div>

            {/* Hot Side Temperature Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ mặt nóng (T_hot):</span>
                <span className="font-mono text-red-400 font-bold">{hotSideTempC.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="60"
                max="650"
                step="5"
                value={hotSideTempC}
                onChange={(e) => setHotSideTempC(parseFloat(e.target.value))}
                className="w-full accent-red-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>60 °C (Nước ấm)</span>
                <span>350 °C (Khí thải)</span>
                <span>650 °C (Khí lò nung)</span>
              </div>
            </div>

            {/* Cold Side Temperature Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ mặt lạnh (T_cold):</span>
                <span className="font-mono text-cyan-400 font-bold">{coldSideTempC.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="2"
                value={coldSideTempC}
                onChange={(e) => setColdSideTempC(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Thermocouple Pairs */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Số cặp bán dẫn p-n (N_pairs):</span>
                <span className="font-mono text-amber-400 font-bold">{thermocouplePairs}</span>
              </div>
              <input
                type="range"
                min="32"
                max="512"
                step="32"
                value={thermocouplePairs}
                onChange={(e) => setThermocouplePairs(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-400 block mb-1">Hiệu Ứng Seebeck (1821):</span>
              Khi có gradien nhiệt độ ΔT giữa 2 đầu thanh bán dẫn, các hạt mang điện (electron ở bán dẫn loại n và lỗ trống ở bán dẫn loại p) khuếch tán từ đầu nóng về đầu lạnh, tích tụ điện tích tạo nên hiệu điện thế nhiệt điện V_oc = 2·N·S·ΔT.
            </div>
          </div>

          {/* SVG Schematic & Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Công Suất Phát Điện</span>
                <div className="text-2xl font-black text-amber-400 font-mono my-1">
                  {tegPerformance.electricalPowerOutputWatts.toFixed(0)} <span className="text-sm font-normal text-slate-400">W</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Từ {thermalInputWatts.toFixed(0)} W nhiệt đầu vào
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Hiệu Suất Chuyển Đổi</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  {tegPerformance.actualConversionEfficiencyPercent.toFixed(1)} <span className="text-sm font-normal text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Carnot lý thuyết: {tegPerformance.carnotMaxEfficiencyPercent.toFixed(1)}%
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Điện Áp Hở Mạch (V_oc)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {tegPerformance.openCircuitVoltageVolts.toFixed(1)} <span className="text-sm font-normal text-slate-400">V</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Chênh lệch nhiệt: ΔT = {tegPerformance.tempDifferenceK.toFixed(0)} K
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Chỉ Số Phẩm Chất zT</span>
                <div className="text-2xl font-black text-purple-400 font-mono my-1">
                  {tegPerformance.averageFigureOfMeritZT.toFixed(2)}
                </div>
                <span className="text-[10px] text-purple-400 font-bold">
                  {selectedMaterial.chemicalFormula}
                </span>
              </div>
            </div>

            {/* Dynamic Thermocouple p-n Leg SVG */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 700 280" className="w-full h-auto max-h-[260px]">
                <defs>
                  <linearGradient id="gradHotPlat" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradColdPlat" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradPtype" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c2410c" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradNtype" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Hot Junction Header Plate */}
                <rect x="80" y="20" width="540" height="30" rx="6" fill="url(#gradHotPlat)" stroke="#fca5a5" strokeWidth="2" />
                <text x="350" y="40" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  MẶT GIA NHIỆT NÓNG (T_hot = {hotSideTempC.toFixed(0)} °C / {tegPerformance.hotJunctionTempK.toFixed(0)} K)
                </text>

                {/* Hot Interconnect Copper Strips */}
                <rect x="130" y="50" width="160" height="12" fill="#d97706" rx="2" />
                <rect x="410" y="50" width="160" height="12" fill="#d97706" rx="2" />

                {/* Thermocouple Legs (p-type and n-type) */}
                {/* Leg 1: p-type */}
                <rect x="130" y="62" width="70" height="140" rx="4" fill="url(#gradPtype)" stroke="#ea580c" strokeWidth="1.5" />
                <text x="165" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">p-Type</text>
                <text x="165" y="135" fill="#ffedd5" fontSize="10" textAnchor="middle">Lỗ Trống h⁺</text>
                <text x="165" y="155" fill="#ffffff" fontSize="12" textAnchor="middle">↓</text>

                {/* Leg 2: n-type */}
                <rect x="220" y="62" width="70" height="140" rx="4" fill="url(#gradNtype)" stroke="#2563eb" strokeWidth="1.5" />
                <text x="255" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">n-Type</text>
                <text x="255" y="135" fill="#dbeafe" fontSize="10" textAnchor="middle">Electron e⁻</text>
                <text x="255" y="155" fill="#ffffff" fontSize="12" textAnchor="middle">↓</text>

                {/* Leg 3: p-type */}
                <rect x="410" y="62" width="70" height="140" rx="4" fill="url(#gradPtype)" stroke="#ea580c" strokeWidth="1.5" />
                <text x="445" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">p-Type</text>
                <text x="445" y="135" fill="#ffedd5" fontSize="10" textAnchor="middle">Lỗ Trống h⁺</text>
                <text x="445" y="155" fill="#ffffff" fontSize="12" textAnchor="middle">↓</text>

                {/* Leg 4: n-type */}
                <rect x="500" y="62" width="70" height="140" rx="4" fill="url(#gradNtype)" stroke="#2563eb" strokeWidth="1.5" />
                <text x="535" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">n-Type</text>
                <text x="535" y="135" fill="#dbeafe" fontSize="10" textAnchor="middle">Electron e⁻</text>
                <text x="535" y="155" fill="#ffffff" fontSize="12" textAnchor="middle">↓</text>

                {/* Cold Interconnect Copper Strips */}
                <rect x="220" y="202" width="190" height="12" fill="#d97706" rx="2" />
                <rect x="90" y="202" width="40" height="12" fill="#d97706" rx="2" />
                <rect x="570" y="202" width="40" height="12" fill="#d97706" rx="2" />

                {/* Cold Junction Footer Plate */}
                <rect x="80" y="220" width="540" height="30" rx="6" fill="url(#gradColdPlat)" stroke="#7dd3fc" strokeWidth="2" />
                <text x="350" y="240" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  MẶT GIẢI NHIỆT LẠNH (T_cold = {coldSideTempC.toFixed(0)} °C / {tegPerformance.coldJunctionTempK.toFixed(0)} K)
                </text>

                {/* External Electrical Circuit Leads */}
                <path d="M 90 208 L 40 208 L 40 140 L 70 140" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <path d="M 610 208 L 660 208 L 660 140 L 630 140" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <circle cx="55" cy="140" r="14" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                <text x="55" y="144" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                <circle cx="645" cy="140" r="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                <text x="645" y="144" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>

                <text x="350" y="270" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ⚡ Dòng điện tải: {tegPerformance.electricalPowerOutputWatts.toFixed(0)} W • V_oc = {tegPerformance.openCircuitVoltageVolts.toFixed(1)} V
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ZT FIGURE OF MERIT & MATERIALS DISCOVERY */}
      {activeMode === 'ZT_MATERIALS_DISCOVERY' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Material Cards */}
          <div className="flex flex-col gap-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              Các Dòng Hợp Kim Nhiệt Điện
            </h3>

            {Object.values(THERMOELECTRIC_MATERIALS).map((mat) => (
              <div
                key={mat.id}
                onClick={() => setMaterialId(mat.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  materialId === mat.id
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-bold text-sm text-white">{mat.chemicalFormula}</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                    zT = {mat.peakFigureOfMeritZT}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-1">{mat.name}</div>
                <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-slate-300">
                  <div>S: {mat.seebeckCoefficientMicroVPerK} µV/K</div>
                  <div>σ: {mat.electricalConductivitySiemensPerCm} S/cm</div>
                  <div>κ: {mat.thermalConductivityWPerMK} W/(m·K)</div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 italic border-t border-slate-800/80 pt-1.5">
                  {mat.vietnameseDescription}
                </div>
              </div>
            ))}
          </div>

          {/* Physics & Transport Equations */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-400" />
              Vật Lý Lượng Tử &amp; Chỉ Số Phẩm Chất zT
            </h3>

            {/* zT Formula Card */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Phương Trình Chỉ Số Phẩm Chất zT Không Thứ Nguyên:
              </span>
              <div className="font-mono text-base bg-slate-900 p-3 rounded-xl border border-slate-800 text-center text-slate-200">
                zT = (S² · σ · T) / κ
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-300 mt-2">
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Hệ số Seebeck S:</span>
                  <span className="font-bold text-amber-400">{selectedMaterial.seebeckCoefficientMicroVPerK} µV/K</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Độ dẫn điện σ:</span>
                  <span className="font-bold text-cyan-400">{selectedMaterial.electricalConductivitySiemensPerCm} S/cm</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Độ dẫn nhiệt κ:</span>
                  <span className="font-bold text-emerald-400">{selectedMaterial.thermalConductivityWPerMK} W/(m·K)</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Thừa số công suất (PF):</span>
                  <span className="font-bold text-purple-400">
                    {(Math.pow(selectedMaterial.seebeckCoefficientMicroVPerK * 1e-6, 2) * selectedMaterial.electricalConductivitySiemensPerCm * 100 * 1e3).toFixed(2)} mW/(m·K²)
                  </span>
                </div>
              </div>
            </div>

            {/* Applications Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Rocket className="w-4 h-4" />
                  <span>Nguồn Điện Tàu Vũ Trụ NASA RTG</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Sử dụng nhiệt phân rã đồng vị phóng xạ Plutonium-238 để nung nóng một đầu hợp kim Si₀.₈Ge₀.₂ lên 1000°C, phát điện liên tục trên 45 năm cho các tàu Voyager 1 &amp; 2 hiện đang thám hiểm không gian liên sao ngoài rìa Hệ Mặt Trời.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>Làm Lạnh Chip Bán Dẫn Peltier (TEC)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Khi đảo chiều cấp dòng điện một chiều vào module Bi₂Te₃, hiệu ứng Peltier đảo ngược dòng nhiệt, bơm nhiệt cưỡng bức rút nhiệt cực nhanh từ chip AI và cảm biến quang học CCD xuống nhiệt độ âm sâu không cần máy nén khí.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: AUTOMOTIVE EXHAUST TEG HARVESTING */}
      {activeMode === 'AUTOMOTIVE_EXHAUST_TEG' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-400" />
              Thông Số Động Cơ Xe Tải / Xe Khách
            </h3>

            {/* Engine Power Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất động cơ (P_engine):</span>
                <span className="font-mono text-emerald-400 font-bold">{enginePowerKW.toFixed(0)} kW</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={enginePowerKW}
                onChange={(e) => setEnginePowerKW(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>50 kW (Xe con)</span>
                <span>150 kW (Xe tải)</span>
                <span>400 kW (Đầu kéo container)</span>
              </div>
            </div>

            {/* Exhaust Temperature Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ khí thải bô xả (T_exhaust):</span>
                <span className="font-mono text-red-400 font-bold">{exhaustTempC.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="250"
                max="550"
                step="10"
                value={exhaustTempC}
                onChange={(e) => setExhaustTempC(parseFloat(e.target.value))}
                className="w-full accent-red-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 flex flex-col gap-2 text-xs">
              <span className="text-slate-400">Nhiệt thải bô xe thoát ra môi trường:</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                {autoEconomics.exhaustGasHeatKW.toFixed(1)} kW nhiệt
              </span>
              <span className="text-slate-400 mt-1">Điện năng TEG thu hồi trực tiếp:</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {autoEconomics.recoveredElectricPowerWatts.toFixed(0)} W điện
              </span>
            </div>
          </div>

          {/* Results & Fuel Economy */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Lợi Ích Tiết Kiệm Nhiên Liệu &amp; Giảm Tải Máy Phát Điện
            </h3>

            {/* Alternator Unload Progress */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">Giảm Tải Máy Phát Điện Xoay Chiều (Alternator):</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {autoEconomics.alternatorUnloadPercent.toFixed(1)} %
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, autoEconomics.alternatorUnloadPercent)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400">
                Khi TEG cấp đủ 1.2+ kW điện, máy phát cơ học của động cơ được ngắt ly hợp, giảm lực cản trục khuỷu xe.
              </span>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Tăng Hiệu Quả Nhiên Liệu</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  +{autoEconomics.fuelEconomyImprovementPercent.toFixed(2)} <span className="text-xs font-normal text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Cắt giảm tải cơ học động cơ
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Dầu Diesel Tiết Kiệm</span>
                <div className="text-2xl font-black text-amber-400 font-mono my-1">
                  {autoEconomics.annualFuelSavedLiters.toFixed(0)} <span className="text-xs font-normal text-slate-400">L/năm</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Tiết kiệm ~ ${(autoEconomics.annualFuelSavedLiters * 0.95).toFixed(0)}/năm cho mỗi xe
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Tránh Phát Thải Khí CO₂</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {autoEconomics.annualAvoidedCO2Kg.toFixed(0)} <span className="text-xs font-normal text-slate-400">kg/năm</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Giảm ô nhiễm khí thải giao thông đô thị
                </span>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">
                Tích Hợp Đồng Phát Năng Lượng Thể Rắn:
              </span>
              Khoảng 60% năng lượng tỏa ra từ quá trình đốt cháy xăng dầu trong động cơ đốt trong bị phân tán ra môi trường qua hệ thống làm mát và đường ống xả. Việc ốp các module nhiệt điện bán dẻo Skutterudite quanh cổ xả bô xe biến luồng khí nóng bỏng thành nguồn điện 12V/48V sạc trực tiếp vào ắc-quy và cấp điện cho hệ thống điều hòa, đèn LED và radar xe tải.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
