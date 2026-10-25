// src/components/visualizations/ThermoGalvanicCellVisualizer.tsx
// Interactive Visualizer: Thermoelectrochemical (Thermo-Galvanic) Cell Continuous Wearable Harvesting
// Standards: IUPAC Electrochemistry, Seebeck Coefficient (Se = dV/dT), Solvation Entropy & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Thermometer,
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
  HeartPulse,
  Radio,
  Watch,
  BatteryCharging,
  Maximize2
} from 'lucide-react';
import {
  THERMO_GALVANIC_SYSTEMS,
  ThermoGalvanicSystemType,
  ThermoGalvanicCellEngine,
  ThermoGalvanicConditions
} from '../../domain/thermoGalvanicCellEngine';
import { sound } from '../../audio/soundEngine';

type ThermoGalvanicTabMode =
  | 'STEADY_STATE_THERMAL_GRADIENT'
  | 'CHAOTROPIC_SOLVATION_CHEMISTRY'
  | 'WEARABLE_BODY_HEAT_PATCH';

export const ThermoGalvanicCellVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ThermoGalvanicTabMode>('STEADY_STATE_THERMAL_GRADIENT');

  // Interactive controls
  const [selectedSystem, setSelectedSystem] = useState<ThermoGalvanicSystemType>('GUANIDINIUM_ENHANCED_HYDROGEL');
  const [hotTempC, setHotTempC] = useState<number>(35.0); // 25 to 70 °C
  const [coldTempC, setColdTempC] = useState<number>(25.0); // 15 to 30 °C
  const [cellAreaCm2, setCellAreaCm2] = useState<number>(25.0); // 4 to 100 cm2
  const [cellThicknessMm, setCellThicknessMm] = useState<number>(3.5); // 2 to 10 mm
  const [isAutoMatchedLoad, setIsAutoMatchedLoad] = useState<boolean>(true);
  const [manualLoadOhm, setManualLoadOhm] = useState<number>(1.2);

  // Wearable Mode Controls
  const [patchAreaCm2, setPatchAreaCm2] = useState<number>(25.0); // 9 to 64 cm2
  const [skinTempC, setSkinTempC] = useState<number>(34.0);
  const [ambientTempC, setAmbientTempC] = useState<number>(24.0);

  const currentSystem = THERMO_GALVANIC_SYSTEMS[selectedSystem];

  // Engine Computations
  const operatingConditions: ThermoGalvanicConditions = useMemo(() => ({
    systemType: selectedSystem,
    hotTempC,
    coldTempC,
    cellAreaCm2,
    cellThicknessMm,
    externalLoadOhm: isAutoMatchedLoad ? undefined : manualLoadOhm
  }), [selectedSystem, hotTempC, coldTempC, cellAreaCm2, cellThicknessMm, isAutoMatchedLoad, manualLoadOhm]);

  const perfResult = useMemo(() => {
    return ThermoGalvanicCellEngine.calculatePerformance(operatingConditions);
  }, [operatingConditions]);

  const wearableResult = useMemo(() => {
    return ThermoGalvanicCellEngine.designWearablePatch(
      patchAreaCm2,
      selectedSystem,
      skinTempC,
      ambientTempC
    );
  }, [patchAreaCm2, selectedSystem, skinTempC, ambientTempC]);

  const handleModeChange = (mode: ThermoGalvanicTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedSystem('GUANIDINIUM_ENHANCED_HYDROGEL');
    setHotTempC(35.0);
    setColdTempC(25.0);
    setCellAreaCm2(25.0);
    setCellThicknessMm(3.5);
    setIsAutoMatchedLoad(true);
    setManualLoadOhm(1.2);
    setPatchAreaCm2(25.0);
    setSkinTempC(34.0);
    setAmbientTempC(24.0);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-500/20 to-orange-600/30 rounded-xl border border-rose-500/30 text-rose-400">
              <Thermometer className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800 rounded-full">
                  Thermoelectrochemical Cell (TEC / TGC)
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-full">
                  Continuous DC Power (Zero Moving Parts)
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Pin Nhiệt Điện Hóa (Thermo-Galvanic Cell) & Thu Nhiệt Da Người
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Phát điện DC liên tục từ gradient nhiệt độ dừng (ΔT = Th - Tc) thông qua hiệu ứng Seebeck nhiệt hóa học (Se = dV/dT = ΔS/nF) của cặp oxi hóa-khử Fe(CN)₆³⁻/⁴⁻ và cấu trúc hydrogel phá vỡ solvat hóa chaotropic guanidinium.
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
          onClick={() => handleModeChange('STEADY_STATE_THERMAL_GRADIENT')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'STEADY_STATE_THERMAL_GRADIENT'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-1 ring-rose-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Gradient Nhiệt Dừng & Phát Điện DC</span>
        </button>

        <button
          onClick={() => handleModeChange('CHAOTROPIC_SOLVATION_CHEMISTRY')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'CHAOTROPIC_SOLVATION_CHEMISTRY'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>2. Cơ Chế Solvat Hóa Chaotropic Guanidinium</span>
        </button>

        <button
          onClick={() => handleModeChange('WEARABLE_BODY_HEAT_PATCH')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'WEARABLE_BODY_HEAT_PATCH'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Watch className="w-4 h-4" />
          <span>3. Miếng Dán Thu Nhiệt Cơ Thể Da Người</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Visualizer Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-400" />
              Thông Số Gradient Nhiệt & Tế Bào
            </span>
            <span className="text-xs px-2 py-0.5 bg-rose-950 text-rose-400 rounded-md border border-rose-800 font-mono">
              ΔT = {perfResult.deltaTemperatureK} K
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'WEARABLE_BODY_HEAT_PATCH' ? (
            <div className="flex flex-col gap-4">
              {/* System Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Hệ Dung Dịch Điện Hóa Nhiệt (TGC System):</span>
                  <span className="text-[11px] font-mono text-rose-400 font-bold">
                    Se = {currentSystem.seebeckCoefficientMvPerK} mV/K
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(THERMO_GALVANIC_SYSTEMS) as ThermoGalvanicSystemType[]).map((sysId) => {
                    const spec = THERMO_GALVANIC_SYSTEMS[sysId];
                    const isSelected = selectedSystem === sysId;
                    return (
                      <button
                        key={sysId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedSystem(sysId);
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
                            {spec.seebeckCoefficientMvPerK} mV/K
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hot Temp Th */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Cực Nóng (T_hot):</span>
                  <span className="font-mono text-rose-400 font-bold">{hotTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="70"
                  step="0.5"
                  value={hotTempC}
                  onChange={(e) => setHotTempC(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>25°C (Phòng)</span>
                  <span>35°C (Nhiệt da người)</span>
                  <span>70°C (Vỏ CPU/Bộ đổi điện)</span>
                </div>
              </div>

              {/* Cold Temp Tc */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Cực Lạnh (T_cold):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="30"
                  step="0.5"
                  value={coldTempC}
                  onChange={(e) => setColdTempC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>15°C (Mùa đông)</span>
                  <span>25°C (Nhiệt độ phòng)</span>
                  <span>30°C</span>
                </div>
              </div>

              {/* Cell Geometry */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Diện Tích (A):</div>
                  <input
                    type="range"
                    min="4"
                    max="100"
                    step="2"
                    value={cellAreaCm2}
                    onChange={(e) => setCellAreaCm2(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-right text-[11px] font-mono text-emerald-400 font-bold mt-0.5">
                    {cellAreaCm2} cm²
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Độ Dày (d):</div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.5"
                    value={cellThicknessMm}
                    onChange={(e) => setCellThicknessMm(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-right text-[11px] font-mono text-emerald-400 font-bold mt-0.5">
                    {cellThicknessMm} mm
                  </div>
                </div>
              </div>

              {/* Load Matching Toggle */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Phối Hợp Trở Kháng:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setIsAutoMatchedLoad(!isAutoMatchedLoad);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isAutoMatchedLoad
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isAutoMatchedLoad ? 'Khớp R_L = R_int (P_max)' : 'Chỉnh tay'}
                  </button>
                </div>
                {!isAutoMatchedLoad && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Điện trở tải ngoài R_L:</span>
                      <span className="font-mono text-cyan-400">{manualLoadOhm} Ω</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={manualLoadOhm}
                      onChange={(e) => setManualLoadOhm(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Mode 3 Wearable Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Diện Tích Miếng Dán Dẻo (Patch Area):</span>
                  <span className="font-mono text-emerald-400 font-bold">{patchAreaCm2} cm²</span>
                </div>
                <input
                  type="range"
                  min="9"
                  max="64"
                  step="1"
                  value={patchAreaCm2}
                  onChange={(e) => setPatchAreaCm2(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>9 cm² (3x3 cm - Nhẫn/Đồng hồ)</span>
                  <span>25 cm² (5x5 cm - Băng dán ngực)</span>
                  <span>64 cm² (8x8 cm)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Bề Mặt Da Người:</span>
                  <span className="font-mono text-rose-400 font-bold">{skinTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="31"
                  max="37"
                  step="0.2"
                  value={skinTempC}
                  onChange={(e) => setSkinTempC(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Môi Trường Xung Quanh:</span>
                  <span className="font-mono text-cyan-400 font-bold">{ambientTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="30"
                  step="0.5"
                  value={ambientTempC}
                  onChange={(e) => setAmbientTempC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
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
                <span>Điện Thế Mạch Hở (Voc)</span>
                <Gauge className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-300 mt-1">
                {perfResult.openCircuitVoltageMv} <span className="text-xs text-slate-400">mV</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                V_load: {perfResult.operatingVoltageMv} mV
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Công Suất Thu Nhận (P_max)</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                {perfResult.powerOutputMicroWatts.toFixed(1)} <span className="text-xs text-slate-400">µW</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Dòng điện: {perfResult.currentMilliAmps.toFixed(2)} mA
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Mật Độ Chuẩn Hóa</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {perfResult.normalizedPowerDensityMwPerM2K2} <span className="text-xs text-slate-400">mW/m²·K²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {perfResult.arealPowerDensityMwPerM2} mW/m²
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Trở Kháng Nội (R_int)</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {perfResult.internalResistanceOhm} <span className="text-xs text-slate-400">Ω</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                R_load: {perfResult.matchedLoadResistanceOhm} Ω
              </div>
            </div>
          </div>

          {/* TAB 1: Steady-State Thermal Gradient & Continuous Generation */}
          {activeMode === 'STEADY_STATE_THERMAL_GRADIENT' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white">
                    Sơ Đồ Tế Bào Gradient Nhiệt Dừng & Dòng Chuyển Điện Tích Liên Tục
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-lg">
                  ΔT = {perfResult.deltaTemperatureK} K
                </span>
              </div>

              {/* Schematic SVG: Continuous Thermo-Galvanic Cell */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 250" className="w-full h-auto">
                  <defs>
                    <linearGradient id="thermalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Hot Electrode (Left) */}
                  <rect x="50" y="30" width="80" height="190" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                  <text x="90" y="60" textAnchor="middle" fill="#fca5a5" fontWeight="bold" fontSize="12">
                    CỰC NÓNG
                  </text>
                  <text x="90" y="85" textAnchor="middle" fill="#fecaca" fontSize="13" fontWeight="bold">
                    T_hot = {hotTempC}°C
                  </text>
                  <text x="90" y="115" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">
                    Oxi Hóa: Fe(II) ➔ Fe(III) + e⁻
                  </text>
                  <text x="90" y="135" textAnchor="middle" fill="#fee2e2" fontSize="9">
                    (Khi Se &lt; 0)
                  </text>

                  {/* Continuous Thermal Gradient Electrolyte Medium */}
                  <rect x="135" y="30" width="450" height="190" fill="url(#thermalGrad)" stroke="#64748b" strokeWidth="1" />
                  
                  {/* Diffusion Streamlines */}
                  <path d="M 145 60 Q 360 75 575 60" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
                  <path d="M 575 125 Q 360 140 145 125" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
                  <path d="M 145 190 Q 360 205 575 190" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />

                  <text x="360" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                    Khuếch Tán [Fe(CN)₆]⁴⁻ ➔ Cực Nóng
                  </text>
                  <text x="360" y="145" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                    Khuếch Tán [Fe(CN)₆]³⁻ ➔ Cực Lạnh
                  </text>
                  <text x="360" y="210" textAnchor="middle" fill="#ffffff" fontSize="10">
                    Độ dày truyền nhiệt: d = {cellThicknessMm} mm | Gradient: {(perfResult.deltaTemperatureK / (cellThicknessMm * 1e-3)).toFixed(0)} K/m
                  </text>

                  {/* Cold Electrode (Right) */}
                  <rect x="590" y="30" width="80" height="190" rx="6" fill="#164e63" stroke="#06b6d4" strokeWidth="2" />
                  <text x="630" y="60" textAnchor="middle" fill="#67e8f9" fontWeight="bold" fontSize="12">
                    CỰC LẠNH
                  </text>
                  <text x="630" y="85" textAnchor="middle" fill="#a5f3fc" fontSize="13" fontWeight="bold">
                    T_cold = {coldTempC}°C
                  </text>
                  <text x="630" y="115" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="monospace">
                    Khử: Fe(III) + e⁻ ➔ Fe(II)
                  </text>

                  {/* Top External Circuit & Load */}
                  <path d="M 90 30 L 90 12 L 630 12 L 630 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <rect x="330" y="4" width="60" height="16" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="360" y="16" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    TẢI R_L
                  </text>
                </svg>
              </div>

              {/* Thermodynamic Equations Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Định Luật Seebeck Nhiệt Hóa:</span>
                  <div className="text-sm font-mono text-rose-300 font-bold mt-1">
                    Voc = Se · ΔT
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Se = ({currentSystem.seebeckCoefficientMvPerK} mV/K)
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Công Suất Cực Đại (P_max):</span>
                  <div className="text-sm font-mono text-amber-300 font-bold mt-1">
                    P = Voc² / (4 · R_int)
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Tại R_load = R_int = {perfResult.internalResistanceOhm} Ω
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Hiệu Suất Tương Đối Carnot:</span>
                  <div className="text-sm font-mono text-emerald-300 font-bold mt-1">
                    η_rel = {perfResult.relativeCarnotPercent}%
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Không tiêu hao nhiên liệu
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Chaotropic Solvation Chemistry & Hydrogel Disruption */}
          {activeMode === 'CHAOTROPIC_SOLVATION_CHEMISTRY' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Hiệu Ứng Chaotropic: Phá Vỡ Vỏ Nước Solvat Hóa & Siêu Hệ Số Seebeck
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-blue-950/80 border border-blue-800 text-blue-300 rounded-lg">
                  ΔS_solv = {currentSystem.relativeSolvationEntropyJPerMolK} J/(mol·K)
                </span>
              </div>

              {/* Solvation Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Dung Dịch Nước Tiêu Chuẩn (Se ~ -1.45 mV/K)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ion [Fe(CN)₆]⁴⁻ có 4 điện tích âm, hút các phân tử nước định hướng thành vỏ solvat hóa cứng nhắc (rigid hydration shell). Khi nhiệt độ tăng, vỏ nước tan rã làm tăng entropi, tạo ra hệ số Seebeck cơ bản -1.45 mV/K.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-blue-800/60 bg-blue-950/20 space-y-2">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    2. Hydrogel Pha Tạp Chaotropic Guanidinium (Se ~ -3.85 mV/K)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cation phẳng guanidinium C(NH₂)₃⁺ tạo liên kết hydro chọn lọc với [Fe(CN)₆]⁴⁻, phá vỡ cấu trúc mạng nước liên kết. Khi đun nóng, liên kết hydro này phân ly cực kỳ nhạy, phóng đại biến thiên entropi lên gấp gần 3 lần!
                  </p>
                </div>
              </div>

              {/* Chemical Insight Box */}
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  Cơ Chế Phản Ứng: {currentSystem.nameVi}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {currentSystem.mechanismVi}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Wearable Body-Heat Harvesting Patch */}
          {activeMode === 'WEARABLE_BODY_HEAT_PATCH' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Watch className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    Miếng Dán Y Tế Tự Cấp Nguồn Từ Nhiệt Da Người (Self-Powered Wearable)
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg font-mono">
                  {wearableResult.patchAreaCm2} cm² Patch
                </span>
              </div>

              {/* Harvest Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Công Suất Thu Nhận Liên Tục
                  </span>
                  <div className="text-2xl font-black font-mono text-white mt-1">
                    {wearableResult.netHarvestedPowerMicroWatts.toFixed(1)} <span className="text-sm font-normal text-emerald-300">µW</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Chênh lệch: da {skinTempC}°C - không khí {ambientTempC}°C
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Năng Lượng Sạch Hàng Năm
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {(wearableResult.annualCleanEnergyJoules / 3600).toFixed(2)} <span className="text-sm font-normal text-slate-400">Wh/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Thu hoạch 24/7/365 không cần cắm sạc
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-xl border border-amber-800/60">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Loại Bỏ Pin Khuy CR2032
                  </span>
                  <div className="text-2xl font-black font-mono text-amber-300 mt-1">
                    {wearableResult.batteryEliminatedPerDecade} <span className="text-sm font-normal text-slate-400">viên/10 năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Triệt tiêu hoàn toàn rác thải pin y tế
                  </p>
                </div>
              </div>

              {/* Supported Wearable Devices Status List */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Khả Năng Vận Hành Thiết Bị Đeo Thông Minh:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wearableResult.supportedDevices.map((dev, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                        dev.canOperateContinuously
                          ? 'bg-slate-950 border-emerald-800/80 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{dev.deviceNameVi}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Yêu cầu: {dev.requiredPowerMicroWatts} µW
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dev.canOperateContinuously
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {dev.canOperateContinuously ? '100% Liên Tục' : `${dev.dutyCyclePercent}% Chu kỳ`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
