// src/components/visualizations/LithiumCarbonDioxideBatteryVisualizer.tsx
// Interactive Visualizer: Lithium-Carbon Dioxide (Li-CO2) Battery & Mars Deep Space Energy System
// Standards: IUPAC Electrochemistry, NASA Mars Exploration Benchmarks, Soluble Redox Mediators & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Rocket,
  Activity,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Droplets,
  TrendingUp,
  ShieldCheck,
  Zap,
  Wind,
  Layers,
  Sun,
  Moon,
  RefreshCw,
  Compass,
  ArrowRight
} from 'lucide-react';
import {
  LI_CO2_MEDIATORS,
  LiCo2MediatorType,
  LiCo2EnvironmentType,
  LithiumCarbonDioxideBatteryEngine,
  LiCo2OperatingConditions
} from '../../domain/lithiumCarbonDioxideBatteryEngine';
import { sound } from '../../audio/soundEngine';

type LiCo2TabMode =
  | 'MARS_ATMOSPHERE_CARBON_CAPTURE'
  | 'REDOX_MEDIATOR_RECHARGE_CYCLE'
  | 'MARS_ROVER_DEEP_SPACE_POWERTRAIN';

export const LithiumCarbonDioxideBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LiCo2TabMode>('MARS_ATMOSPHERE_CARBON_CAPTURE');

  // Interactive controls
  const [selectedMediator, setSelectedMediator] = useState<LiCo2MediatorType>('IODINE_REDOX_MEDIATOR');
  const [selectedEnv, setSelectedEnv] = useState<LiCo2EnvironmentType>('MARS_SURFACE_ATMOSPHERE');
  const [temperatureC, setTemperatureC] = useState<number>(-10.0); // -40 to 60 °C
  const [co2PressureBar, setCo2PressureBar] = useState<number>(0.007); // 0.006 to 1.0 bar
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(0.20); // 0.05 to 1.0 mA/cm2
  const [arealCapacityMahCm2, setArealCapacityMahCm2] = useState<number>(4.0); // 1.0 to 10.0 mAh/cm2

  // Mars Rover Controls
  const [roverPackKwh, setRoverPackKwh] = useState<number>(10.0); // 5 to 30 kWh

  const currentMediator = LI_CO2_MEDIATORS[selectedMediator];

  // Engine Computations
  const operatingConditions: LiCo2OperatingConditions = useMemo(() => ({
    mediatorType: selectedMediator,
    environmentType: selectedEnv,
    temperatureC,
    co2PartialPressureBar: co2PressureBar,
    currentDensityMaCm2,
    cellActiveAreaCm2: 250.0,
    arealCapacityMahCm2
  }), [selectedMediator, selectedEnv, temperatureC, co2PressureBar, currentDensityMaCm2, arealCapacityMahCm2]);

  const perfResult = useMemo(() => {
    return LithiumCarbonDioxideBatteryEngine.calculatePerformance(operatingConditions);
  }, [operatingConditions]);

  const roverResult = useMemo(() => {
    return LithiumCarbonDioxideBatteryEngine.designMarsRoverBatteryPack(
      roverPackKwh,
      selectedMediator
    );
  }, [roverPackKwh, selectedMediator]);

  const handleModeChange = (mode: LiCo2TabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedMediator('IODINE_REDOX_MEDIATOR');
    setSelectedEnv('MARS_SURFACE_ATMOSPHERE');
    setTemperatureC(-10.0);
    setCo2PressureBar(0.007);
    setCurrentDensityMaCm2(0.20);
    setArealCapacityMahCm2(4.0);
    setRoverPackKwh(10.0);
  };

  const handleEnvSelect = (env: LiCo2EnvironmentType) => {
    sound.playUiClick();
    setSelectedEnv(env);
    if (env === 'MARS_SURFACE_ATMOSPHERE') {
      setCo2PressureBar(0.007);
      setTemperatureC(-10.0);
    } else if (env === 'EARTH_FLUE_GAS_CAPTURE') {
      setCo2PressureBar(0.15);
      setTemperatureC(40.0);
    } else {
      setCo2PressureBar(1.0);
      setTemperatureC(25.0);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-500/20 to-orange-600/30 rounded-xl border border-rose-500/30 text-rose-400">
              <Rocket className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800 rounded-full">
                  Lithium-Carbon Dioxide (Li-CO₂) Battery
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-full">
                  NASA Mars Deep Space Architecture
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Pin Liti - Carbon Dioxide (Li-CO₂) & Năng Lượng Khí Quyển Sao Hỏa
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Sử dụng trực tiếp khí CO₂ khí quyển (95% trên Sao Hỏa) làm chất hoạt tính cathode (4Li + 3CO₂ ⇌ 2Li₂CO₃ + C), chất điều hòa oxi hóa khử iod (I⁻/I₃⁻) triệt tiêu quá thế nạp và thiết kế gói pin 10 kWh siêu nhẹ cho Robot thám hiểm Sao Hỏa.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Đặt lại chuẩn</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => handleModeChange('MARS_ATMOSPHERE_CARBON_CAPTURE')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'MARS_ATMOSPHERE_CARBON_CAPTURE'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-1 ring-rose-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>1. Hấp Thụ CO₂ & Lắng Đọng Li₂CO₃/C</span>
        </button>

        <button
          onClick={() => handleModeChange('REDOX_MEDIATOR_RECHARGE_CYCLE')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'REDOX_MEDIATOR_RECHARGE_CYCLE'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>2. Chất Điều Hòa Iod (I⁻/I₃⁻) Giảm Thế Nạp</span>
        </button>

        <button
          onClick={() => handleModeChange('MARS_ROVER_DEEP_SPACE_POWERTRAIN')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'MARS_ROVER_DEEP_SPACE_POWERTRAIN'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>3. Gói Pin Robot Tự Hành Sao Hỏa (10 kWh)</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Visualizer Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-400" />
              Môi Trường & Động Học
            </span>
            <span className="text-xs px-2 py-0.5 bg-rose-950 text-rose-400 rounded-md border border-rose-800 font-mono">
              {co2PressureBar.toFixed(3)} bar CO₂
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'MARS_ROVER_DEEP_SPACE_POWERTRAIN' ? (
            <div className="flex flex-col gap-4">
              {/* Environment Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">
                  Môi Trường Khí Quyển Hoạt Động:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleEnvSelect('MARS_SURFACE_ATMOSPHERE')}
                    className={`p-2 rounded-xl text-center border text-[11px] font-semibold transition-all ${
                      selectedEnv === 'MARS_SURFACE_ATMOSPHERE'
                        ? 'bg-rose-950 border-rose-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sao Hỏa (7 mbar)
                  </button>
                  <button
                    onClick={() => handleEnvSelect('EARTH_FLUE_GAS_CAPTURE')}
                    className={`p-2 rounded-xl text-center border text-[11px] font-semibold transition-all ${
                      selectedEnv === 'EARTH_FLUE_GAS_CAPTURE'
                        ? 'bg-cyan-950 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Khí Thải Trái Đất
                  </button>
                  <button
                    onClick={() => handleEnvSelect('PURE_LAB_CO2')}
                    className={`p-2 rounded-xl text-center border text-[11px] font-semibold transition-all ${
                      selectedEnv === 'PURE_LAB_CO2'
                        ? 'bg-blue-950 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    CO₂ Tinh Khiết
                  </button>
                </div>
              </div>

              {/* Mediator Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Chất Xúc Tác / Điều Hòa Nạp:</span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">
                    V_chg: {currentMediator.chargeVoltagePlateauV} V
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(LI_CO2_MEDIATORS) as LiCo2MediatorType[]).map((medId) => {
                    const spec = LI_CO2_MEDIATORS[medId];
                    const isSelected = selectedMediator === medId;
                    return (
                      <button
                        key={medId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedMediator(medId);
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'bg-rose-950/80 border-rose-500/80 text-white shadow-md shadow-rose-900/20'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className={isSelected ? 'text-rose-300' : 'text-slate-300'}>
                            {spec.nameVi}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-rose-950 text-rose-400 border border-rose-800">
                            RTE {spec.roundTripEfficiencyPercent}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Vận Hành Bề Mặt:</span>
                  <span className="font-mono text-cyan-400 font-bold">{temperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="60"
                  step="2"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>-40°C (Đêm Sao Hỏa)</span>
                  <span>-10°C (Trung bình)</span>
                  <span>+60°C</span>
                </div>
              </div>

              {/* Current Density */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Mật Độ Dòng Điện:</span>
                  <span className="font-mono text-rose-400 font-bold">{currentDensityMaCm2.toFixed(2)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Areal Capacity */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Dung Lượng Diện Tích (Areal Capacity):</span>
                  <span className="font-mono text-amber-400 font-bold">{arealCapacityMahCm2.toFixed(1)} mAh/cm²</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={arealCapacityMahCm2}
                  onChange={(e) => setArealCapacityMahCm2(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ) : (
            /* Mode 3 Mars Rover Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Dung Lượng Gói Pin Robot (Pack Capacity):</span>
                  <span className="font-mono text-amber-400 font-bold">{roverPackKwh} kWh</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={roverPackKwh}
                  onChange={(e) => setRoverPackKwh(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 kWh (Cỡ nhỏ Sojourner)</span>
                  <span>10 kWh (Perseverance chuẩn)</span>
                  <span>30 kWh (Xe có người lái)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-rose-400" />
                  Đột Phá Khối Lượng Tàu Vũ Trụ
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {roverResult.roverPayloadAdvantageVi}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visualization Dashboard (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Top Performance Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Điện Thế Xả (V_dis)</span>
                <Gauge className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-300 mt-1">
                {perfResult.operatingDischargeVoltageV.toFixed(3)} <span className="text-xs text-slate-400">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                OCV Nernst: {perfResult.openCircuitVoltageV.toFixed(3)} V
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Điện Thế Nạp (V_chg)</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {perfResult.operatingChargeVoltageV.toFixed(3)} <span className="text-xs text-slate-400">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Độ trễ: {perfResult.overpotentials.totalHysteresisV} V
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Hiệu Suất Khứ Hồi (RTE)</span>
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {perfResult.roundTripEfficiencyPercent.toFixed(1)} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Xúc tác điều hòa: {currentMediator.nameVi.split('(')[0]}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>CO₂ Thu Hồi / Chu Kỳ</span>
                <Droplets className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                {perfResult.carbonCaptureMetrics.co2CapturedPerCycleGrams} <span className="text-xs text-slate-400">g</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Tạo: {perfResult.carbonCaptureMetrics.solidLi2Co3DepositedGrams} g Li₂CO₃
              </div>
            </div>
          </div>

          {/* TAB 1: Mars Atmosphere CO2 Capture & Porous Deposition */}
          {activeMode === 'MARS_ATMOSPHERE_CARBON_CAPTURE' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white">
                    Sơ Đồ Tế Bào Li-CO₂ & Quá Trình Hấp Thụ Khí Quyển Sao Hỏa
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-lg">
                  {selectedEnv === 'MARS_SURFACE_ATMOSPHERE' ? 'Khí Quyển Sao Hỏa (95% CO₂)' : 'Khí Trái Đất'}
                </span>
              </div>

              {/* Schematic SVG: Li-CO2 Cell Cross-Section */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 250" className="w-full h-auto">
                  <defs>
                    <linearGradient id="liAnodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="cntCathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Left: Lithium Metal Anode */}
                  <rect x="50" y="30" width="110" height="190" rx="6" fill="url(#liAnodeGrad)" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="105" y="60" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">
                    CỰC ÂM LITI (Li)
                  </text>
                  <text x="105" y="80" textAnchor="middle" fill="#1e293b" fontSize="9" fontFamily="monospace">
                    4Li ⇌ 4Li⁺ + 4e⁻
                  </text>
                  <text x="105" y="100" textAnchor="middle" fill="#334155" fontSize="9">
                    E⁰ = -3.04 V
                  </text>

                  {/* Middle: Solid-State / Liquid Electrolyte + Separator */}
                  <rect x="180" y="30" width="160" height="190" fill="#0c4a6e" opacity="0.8" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="260" y="60" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                    Dung Dịch Điện Phân + Chất Điều Hòa
                  </text>
                  <text x="260" y="80" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {currentMediator.catalystMechanism}
                  </text>
                  
                  {/* Li+ Ion Transport */}
                  <path d="M 160 125 L 340 125" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="6,4" markerEnd="url(#arrow)" />
                  <text x="260" y="145" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                    Dòng ion Li⁺ ➔ Cathode
                  </text>

                  {/* Right: Porous Carbon Nanotube Cathode Matrix */}
                  <rect x="360" y="30" width="220" height="190" rx="6" fill="url(#cntCathodeGrad)" stroke="#64748b" strokeWidth="2" />
                  <text x="470" y="55" textAnchor="middle" fill="#f8fafc" fontWeight="bold" fontSize="12">
                    CATHODE RỖNG CNT / RuO₂
                  </text>
                  <text x="470" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    3CO₂ + 4Li⁺ + 4e⁻ ⇌ 2Li₂CO₃ + C
                  </text>

                  {/* Solid Deposit Representation */}
                  <circle cx="410" cy="115" r="8" fill="#ffffff" stroke="#94a3b8" />
                  <circle cx="430" cy="140" r="10" fill="#ffffff" stroke="#94a3b8" />
                  <circle cx="460" cy="110" r="9" fill="#ffffff" stroke="#94a3b8" />
                  <circle cx="490" cy="145" r="7" fill="#ffffff" stroke="#94a3b8" />
                  <circle cx="420" cy="155" r="5" fill="#64748b" />
                  <circle cx="475" cy="125" r="6" fill="#64748b" />

                  <text x="470" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                    Chất rắn lắng đọng: Li₂CO₃ (trắng) + C (đen)
                  </text>

                  {/* Far Right: Ambient Martian Atmosphere CO2 Ingestion */}
                  <path d="M 680 70 L 600 70" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <path d="M 680 125 L 600 125" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <path d="M 680 180 L 600 180" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <text x="700" y="55" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                    Khí Quyển CO₂
                  </text>
                  <text x="700" y="75" textAnchor="middle" fill="#fda4af" fontSize="9">
                    {co2PressureBar.toFixed(3)} bar
                  </text>
                  <text x="700" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                    Hút thụ động
                  </text>

                  {/* Top External Circuit */}
                  <path d="M 105 30 L 105 12 L 470 12 L 470 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <circle cx="280" cy="12" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="280" y="16" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    e⁻
                  </text>
                </svg>
              </div>

              {/* Carbon Capture Calculations Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Muối Li₂CO₃ Sinh Ra:</span>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {perfResult.carbonCaptureMetrics.solidLi2Co3DepositedGrams} <span className="text-xs text-slate-400">g</span>
                  </div>
                  <span className="text-[10px] text-slate-500">M = 73.89 g/mol</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Carbon Cố Định (C):</span>
                  <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
                    {perfResult.carbonCaptureMetrics.carbonPorousDepositGrams} <span className="text-xs text-slate-400">g</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Cacbon vô định hình dẫn điện</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Khí CO₂ Tái Sinh Ban Ngày:</span>
                  <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                    {perfResult.carbonCaptureMetrics.co2DesorbedDuringRechargeLiters} <span className="text-xs text-slate-400">Lít</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Giải phóng khi nạp pin bằng năng lượng mặt trời</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Redox Mediator Lower-Overpotential Recharge Cycle */}
          {activeMode === 'REDOX_MEDIATOR_RECHARGE_CYCLE' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Cơ Chế Phân Hủy Hóa Học Li₂CO₃ Bằng Cặp Trung Gian Iod (I⁻/I₃⁻)
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-blue-950/80 border border-blue-800 text-blue-300 rounded-lg">
                  ΔV Nạp: {currentMediator.chargeVoltagePlateauV} V
                </span>
              </div>

              {/* Chemical Equations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Bước 1: Oxi Hóa Điện Hóa Xúc Tác Iod (Tại Bề Mặt Cực)
                  </span>
                  <div className="text-sm font-mono text-cyan-300 font-bold p-2 bg-slate-900 rounded-lg border border-slate-800">
                    3 I⁻ ➔ I₃⁻ + 2e⁻ (E ~ +3.55 V)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ion I⁻ bị oxy hóa tại điện thế thấp chỉ 3.55 V (thay vì phải áp điện thế cực đoan &gt;4.4 V để ép Li₂CO₃ phân hủy trực tiếp).
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    2. Bước 2: Phân Hủy Hóa Học Li₂CO₃ (Trong Toàn Bộ Khối Xốp)
                  </span>
                  <div className="text-sm font-mono text-emerald-300 font-bold p-2 bg-slate-900 rounded-lg border border-slate-800">
                    2Li₂CO₃ + 2I₃⁻ ➔ 4Li⁺ + 6I⁻ + 2CO₂↑ + O₂↑
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Phân tử I₃⁻ hòa tan tự do len lỏi vào từng ngóc ngách của cathode carbon nanotube, hòa tan lớp muối Li₂CO₃ rắn cách điện và tái sinh ion I⁻ ban đầu!
                  </p>
                </div>
              </div>

              {/* Mediator Insight Box */}
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  Đánh Giá Hiệu Năng: {currentMediator.nameVi}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {currentMediator.mechanismVi}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Mars Rover Deep Space Powertrain (10 kWh) */}
          {activeMode === 'MARS_ROVER_DEEP_SPACE_POWERTRAIN' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Gói Pin Robot Tự Hành Khí Quyển Sao Hỏa 10 kWh (NASA Exploration Rover)
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 rounded-lg font-mono">
                  {roverResult.totalPackCapacityKwh} kWh Mars Pack
                </span>
              </div>

              {/* Rover Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Tiết Kiệm Khối Lượng Tàu
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
                    -{roverResult.massSavingsPercent}% <span className="text-sm font-normal text-slate-400">khối lượng</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Li-CO₂: <strong className="text-white">{roverResult.liCo2BatteryPackWeightKg} kg</strong> vs Space Li-Ion: <span className="line-through">{roverResult.equivalentLiIonPackWeightKg} kg</span>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Thời Lượng Vận Hành Tự Chủ
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {roverResult.drivingRangeSols} <span className="text-sm font-normal text-slate-400">Sols (Ngày Sao Hỏa)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Cấp nguồn liên tục cho payload 200 W (Radar & Khoan đất đá)
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-950/40 to-slate-950 rounded-xl border border-rose-800/60">
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    CO₂ Thu Hoạch Suốt Sứ Mệnh
                  </span>
                  <div className="text-2xl font-black font-mono text-rose-300 mt-1">
                    {roverResult.co2GasHarvestedFromMarsPerMissionKg} <span className="text-sm font-normal text-slate-400">kg CO₂</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hút từ khí quyển Sao Hỏa qua {currentMediator.cycleLifeCount} chu kỳ
                  </p>
                </div>
              </div>

              {/* Mass & Payload Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Hạng Mục Thiết Kế Pin Không Gian</th>
                      <th className="py-2 px-3 text-right">Pin Li-CO₂ Tự Nạp Khí</th>
                      <th className="py-2 px-3 text-right">Pin Lithium-Ion Vũ Trụ</th>
                      <th className="py-2 px-3 text-right">Ưu Thế Khoa Học</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Mật độ năng lượng thực tế</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">550 Wh/kg</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400">130 Wh/kg</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Cathode O₂/CO₂ lấy tại chỗ (ISRU)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Tổng trọng lượng gói pin 10 kWh</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">{roverResult.liCo2BatteryPackWeightKg} kg</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400">{roverResult.equivalentLiIonPackWeightKg} kg</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">Tiết kiệm {roverResult.massSavingsKg} kg</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Chu kỳ sạc xả tái sinh</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">{currentMediator.cycleLifeCount} chu kỳ</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">1,000 chu kỳ</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Đủ cho sứ mệnh 2 năm Sao Hỏa</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Vận hành đêm nhiệt độ thấp</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">Xuống tới -40°C</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">Cần sưởi ấm điện trở &gt; -10°C</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Tiết kiệm năng lượng sưởi ban đêm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
