// src/components/visualizations/ProtonSolidOxideElectrolyzerVisualizer.tsx
// Interactive Visualizer: Proton-Conducting Solid Oxide Electrolyzer Cells (P-SOEC / PCEL)
// Standards: IUPAC Electrochemistry, Kröger-Vink Defect Hydration & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Factory,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Droplets,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Wind,
  Coins,
  Cpu,
  Flame,
  Thermometer,
  Atom,
  Feather
} from 'lucide-react';
import {
  PSOEC_ELECTROLYTE_CATALOG,
  PsoecElectrolyteType,
  ProtonSolidOxideElectrolyzerEngine
} from '../../domain/protonSolidOxideElectrolyzerEngine';
import { sound } from '../../audio/soundEngine';

type PsoecTabMode =
  | 'KROGER_VINK_DRY_SYNGAS'
  | 'POLARIZATION_AND_THERMONEUTRAL'
  | 'POWER_TO_X_PLANT';

export const ProtonSolidOxideElectrolyzerVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PsoecTabMode>('KROGER_VINK_DRY_SYNGAS');

  // Interactive controls
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<PsoecElectrolyteType>('BZCYYB_PEROVSKITE');
  const [temperatureC, setTemperatureC] = useState<number>(550.0); // 450°C to 650°C
  const [currentDensityA, setCurrentDensityA] = useState<number>(1.2); // 0.2 to 2.5 A/cm2
  const [steamPressureBar, setSteamPressureBar] = useState<number>(0.8); // 0.1 to 1.5 bar
  const [co2CathodeRatio, setCo2CathodeRatio] = useState<number>(0.50); // 0 to 1
  const [operatingPressureBar, setOperatingPressureBar] = useState<number>(5.0); // 1 to 25 bar

  // Plant Sizing Controls
  const [plantPowerMw, setPlantPowerMw] = useState<number>(10.0); // 1 to 50 MW

  const currentSpec = PSOEC_ELECTROLYTE_CATALOG[selectedElectrolyte];

  // Engine Computations
  const operatingConditions = useMemo(() => ({
    electrolyte: selectedElectrolyte,
    temperatureC,
    currentDensityA,
    steamPartialPressureBar: steamPressureBar,
    co2CathodeFeedRatio: co2CathodeRatio,
    operatingPressureBar,
    cellActiveAreaCm2: 550.0,
    targetSyngasH2ToCoRatio: 2.0
  }), [selectedElectrolyte, temperatureC, currentDensityA, steamPressureBar, co2CathodeRatio, operatingPressureBar]);

  const electroResult = useMemo(() => {
    return ProtonSolidOxideElectrolyzerEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const plantResult = useMemo(() => {
    return ProtonSolidOxideElectrolyzerEngine.designPowerToSyngasPlant(plantPowerMw, operatingConditions);
  }, [plantPowerMw, operatingConditions]);

  // Polarization Curve Points (0.2 to 2.4 A/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 0.2; j <= 2.4; j += 0.2) {
      const cond = { ...operatingConditions, currentDensityA: j };
      const res = ProtonSolidOxideElectrolyzerEngine.calculateElectrochemicalPerformance(cond);
      points.push({
        currentDensityA: Number(j.toFixed(1)),
        vCell: res.operatingCellElectrolysisVoltageV,
        powerW: res.electricalPowerDensityWPerCm2
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: PsoecTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleElectrolyteSelect = (el: PsoecElectrolyteType) => {
    sound.playUiClick();
    setSelectedElectrolyte(el);
    setTemperatureC(PSOEC_ELECTROLYTE_CATALOG[el].nominalOperatingTemperatureC);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 text-white shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/40 rounded-xl">
            <Atom className="w-7 h-7 text-cyan-400 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                Điện Phân Gốm Proton (P-SOEC / PCEL)
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono">
                Pure Dry Syngas & E-Fuel
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Đồng điện phân H₂O-CO₂ tạo syngas khô sạch 100% không lẫn hơi nước qua màng perovskite dẫn proton (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => handleModeChange('KROGER_VINK_DRY_SYNGAS')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'KROGER_VINK_DRY_SYNGAS'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Kröger-Vink & Syngas Khô</span>
          </button>
          <button
            onClick={() => handleModeChange('POLARIZATION_AND_THERMONEUTRAL')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'POLARIZATION_AND_THERMONEUTRAL'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Phân Cực & Điểm Nhiệt Trung Hòa</span>
          </button>
          <button
            onClick={() => handleModeChange('POWER_TO_X_PLANT')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'POWER_TO_X_PLANT'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Nhà Máy Power-to-Syngas (10 MW)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Kröger-Vink Hydration & Pure Dry Syngas Mechanism */}
      {activeMode === 'KROGER_VINK_DRY_SYNGAS' && (
        <div className="space-y-6">
          {/* Key Advantage Banner */}
          <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cyan-200">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong className="text-white">Đột Phá Bản Chất Của P-SOEC:</strong> Hơi nước được nạp vào cực Anode (+), sinh oxy tinh khiết và đẩy ion H⁺ qua màng sang cực Cathode (-). Khí Syngas (H₂ + CO) tạo thành tại cực âm <strong className="text-cyan-300">hoàn toàn khô ráo 100%</strong>, triệt tiêu chi phí sấy ngưng tụ tốn kém của SOEC truyền thống!
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px] shrink-0">
              100% Dry Cathode
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Vật Liệu Màng & Tải Khí
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  Độ Hydrat Hóa: {electroResult.protonHydrationMetrics.hydrationExtentPercent}%
                </span>
              </div>

              {/* Electrolyte Selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Lớp Điện Giải Perovskite Dẫn Proton</label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(PSOEC_ELECTROLYTE_CATALOG) as PsoecElectrolyteType[]).map((eKey) => {
                    const e = PSOEC_ELECTROLYTE_CATALOG[eKey];
                    const isSelected = selectedElectrolyte === eKey;
                    return (
                      <button
                        key={eKey}
                        onClick={() => handleElectrolyteSelect(eKey)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{e.nameVi}</span>
                          <span className="font-mono text-[11px] text-cyan-400">
                            {e.nominalOperatingTemperatureC}°C | {e.protonConductivitySPerCm} S/cm
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {e.primaryAdvantagesVi}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Nhiệt Độ Vận Hành</span>
                  <span className="font-semibold text-slate-200">{temperatureC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min="450"
                  max="650"
                  step="5"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>450°C (BCZY)</span>
                  <span>550°C (BZCYYb)</span>
                  <span>650°C (BZY20)</span>
                </div>
              </div>

              {/* Steam Partial Pressure */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Áp Suất Riêng Phần Hơi Nước Anode</span>
                  <span className="font-semibold text-slate-200">{steamPressureBar.toFixed(2)} bar</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.05"
                  value={steamPressureBar}
                  onChange={(e) => setSteamPressureBar(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* CO2 Cathode Ratio */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Tỷ Lệ Nạp CO₂ Cực Cathode</span>
                  <span className="font-semibold text-slate-200">{(co2CathodeRatio * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={co2CathodeRatio}
                  onChange={(e) => setCo2CathodeRatio(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0% (Chỉ Điện Phân H₂O)</span>
                  <span>50% (Tạo Syngas 2:1)</span>
                  <span>100% (Tối Đa Khử CO₂)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic SVG MEA Cross-Section */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Mô Phỏng Vi Cấu Trúc Vận Chuyển H⁺ & Khí Syngas Khô
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  V_cell = {electroResult.operatingCellElectrolysisVoltageV} V | j = {currentDensityA} A/cm²
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 520 240" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Left Chamber: Anode Oxygen Evolution */}
                  <rect x="30" y="30" width="130" height="180" rx="8" fill="#1E293B" stroke="#0284C7" strokeWidth="2" />
                  <text x="95" y="22" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">Anode (+)</text>
                  
                  {/* Steam Feed In */}
                  <path d="M 10 70 L 40 70" stroke="#06B6D4" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="25" y="60" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold">H₂O(g)</text>

                  {/* Pure Oxygen Evolution Out */}
                  <path d="M 40 170 L 10 170" stroke="#38BDF8" strokeWidth="3" />
                  <text x="25" y="160" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">O₂ ↑</text>

                  {/* Anode Active Layer: BGLC / PBSCF */}
                  <rect x="135" y="40" width="25" height="160" fill="#334155" stroke="#38BDF8" strokeDasharray="2,2" />
                  <text x="95" y="115" textAnchor="middle" fill="#E2E8F0" fontSize="10">H₂O → 2H⁺ + ½O₂ + 2e⁻</text>

                  {/* Middle Dense Perovskite Membrane */}
                  <rect x="160" y="30" width="190" height="180" fill="#0E7490" rx="2" stroke="#22D3EE" strokeWidth="2" />
                  <text x="255" y="55" textAnchor="middle" fill="#CFFAFE" fontSize="11" fontWeight="bold">
                    Màng Perovskite Dẫn Proton (15 µm)
                  </text>
                  <text x="255" y="72" textAnchor="middle" fill="#A5F3FC" fontSize="9" fontStyle="italic">
                    {currentSpec.chemicalFormula}
                  </text>

                  {/* Proton Transport Hopping */}
                  <g>
                    {[95, 125, 155].map((y, idx) => (
                      <g key={idx}>
                        <path d={`M 175 ${y} L 335 ${y}`} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5,3" />
                        <circle cx="215" cy={y} r="8" fill="#FFFFFF" />
                        <text x="215" y={y + 3} textAnchor="middle" fill="#0E7490" fontSize="9" fontWeight="bold">H⁺</text>
                        <circle cx="295" cy={y} r="8" fill="#FFFFFF" />
                        <text x="295" y={y + 3} textAnchor="middle" fill="#0E7490" fontSize="9" fontWeight="bold">H⁺</text>
                      </g>
                    ))}
                  </g>
                  <text x="255" y="195" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="bold">
                    Kröger-Vink: H₂O + V_O•• + O_Oˣ ⇌ 2 OH_O•
                  </text>

                  {/* Right Chamber: Cathode Syngas Production */}
                  <rect x="350" y="30" width="140" height="180" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                  <text x="420" y="22" textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">Cathode (-)</text>

                  {/* Cathode Active Layer: Ni-BZCYYb Cermet */}
                  <rect x="350" y="40" width="25" height="160" fill="#334155" stroke="#10B981" strokeDasharray="2,2" />

                  {/* Dry CO2 In */}
                  <path d="M 505 70 L 475 70" stroke="#F59E0B" strokeWidth="3" />
                  <text x="495" y="60" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="bold">CO₂ Khô</text>

                  {/* 100% Dry Syngas Out */}
                  <path d="M 475 170 L 505 170" stroke="#10B981" strokeWidth="3" />
                  <text x="495" y="160" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">Syngas Khô</text>
                  <text x="495" y="190" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="bold">(H₂ + CO)</text>

                  <text x="425" y="105" textAnchor="middle" fill="#E2E8F0" fontSize="10">2H⁺ + 2e⁻ → H₂</text>
                  <text x="425" y="125" textAnchor="middle" fill="#E2E8F0" fontSize="10">CO₂ + 2H⁺ + 2e⁻ → CO + H₂O</text>
                  <text x="425" y="145" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">
                    H₂/CO = {plantResult.actualSyngasH2ToCoRatio}
                  </text>
                </svg>
              </div>

              {/* Kröger-Vink Defect Card */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs space-y-1 font-mono">
                <div className="text-cyan-300 font-bold">Ký Hiệu Khuyết Tật Kröger-Vink:</div>
                <div className="text-slate-300">
                  H₂O(g) + V_O•• (Hốc Oxy) + O_Oˣ (Oxy Mạng) ⇌ 2 OH_O• (Proton liên kết hydroxyl)
                </div>
                <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-700/60">
                  Nồng độ proton hòa tan: {electroResult.protonHydrationMetrics.protonConcentrationMolPerCm3} mol/cm³ | Độ sạch syngas cực âm: {electroResult.protonHydrationMetrics.dryCathodeSyngasPurityPercent}% Khô Sạch!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Polarization Overpotentials & Thermoneutral Thermal Mode */}
      {activeMode === 'POLARIZATION_AND_THERMONEUTRAL' && (
        <div className="space-y-6">
          {/* Thermal Mode Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              electroResult.thermalMode === 'ENDOTHERMIC_REQUIRES_HEAT'
                ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                : electroResult.thermalMode === 'THERMONEUTRAL'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500 text-amber-200'
            }`}
          >
            {electroResult.thermalMode === 'ENDOTHERMIC_REQUIRES_HEAT' ? (
              <Droplets className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
            ) : electroResult.thermalMode === 'THERMONEUTRAL' ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Flame className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {electroResult.thermalMode === 'ENDOTHERMIC_REQUIRES_HEAT'
                    ? 'CHẾ ĐỘ THU NHIỆT (HẤP THỤ NHIỆT THẢI CÔNG NGHIỆP)'
                    : electroResult.thermalMode === 'THERMONEUTRAL'
                    ? 'CHẾ ĐỘ NHIỆT TRUNG HÒA (HIỆU SUẤT ĐIỆN 100%)'
                    : 'CHẾ ĐỘ TỎA NHIỆT JOULE (TỰ LÀM MÁT QUA KHÍ NẠP)'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono">
                  V_cell = {electroResult.operatingCellElectrolysisVoltageV} V vs V_tn = {electroResult.thermoneutralVoltageV} V
                </span>
              </div>
              <p className="text-xs opacity-90">
                {electroResult.thermalMode === 'ENDOTHERMIC_REQUIRES_HEAT'
                  ? 'Điện thế tế bào thấp hơn điểm nhiệt trung hòa (1.28 V). Phản ứng hấp thu nhiệt từ môi trường ngoài, cho phép chuyển đổi nhiệt thải từ lò phản ứng hạt nhân hoặc công nghiệp thành năng lượng hóa học với hiệu suất điện trên 100%!'
                  : 'Nhiệt Joule sinh ra từ điện trở nội cân bằng hoàn hảo với năng lượng entanpi phân rã hơi nước. Không cần thiết bị giải nhiệt hay gia nhiệt bổ sung.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  Tham Số Điện Phân Áp Suất Cao
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  {electroResult.electricalPowerDensityWPerCm2} W/cm²
                </span>
              </div>

              {/* Current Density */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mật Độ Dòng Điện Phân (A/cm²)</span>
                  <span className="font-semibold text-slate-200">{currentDensityA.toFixed(2)} A/cm²</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={currentDensityA}
                  onChange={(e) => setCurrentDensityA(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.2 A/cm² (Thu nhiệt)</span>
                  <span>1.0 A/cm² (Chuẩn)</span>
                  <span>2.5 A/cm² (Công suất cao)</span>
                </div>
              </div>

              {/* Operating Pressure */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Áp Suất Vận Hành Buồng Kín (bar)</span>
                  <span className="font-semibold text-slate-200">{operatingPressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={operatingPressureBar}
                  onChange={(e) => setOperatingPressureBar(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Overpotentials Readout */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Quá Thế Ohm Màng (η_ohm)</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-1">
                    {(electroResult.overpotentials.ohmicV * 1000).toFixed(1)} mV
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Màng mỏng 15 µm</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Quá Thế Anode OER</div>
                  <div className="text-base font-bold font-mono text-blue-400 mt-1">
                    {(electroResult.overpotentials.anodeOerV * 1000).toFixed(1)} mV
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Quá Thế Cathode Syngas</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {(electroResult.overpotentials.cathodeHerAndRwgsV * 1000).toFixed(1)} mV
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Điện Năng Tiêu Thụ</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {electroResult.electricalPowerDensityWPerCm2} W/cm²
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: V-I Curve & Thermoneutral Line */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Đường Cong Điện Phân V-I & Đường Nhiệt Trung Hòa
                </span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  V_cell = {electroResult.operatingCellElectrolysisVoltageV} V
                </span>
              </div>

              {/* SVG Curve */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />

                  {/* Y Axis labels (Voltage V) */}
                  <text x="42" y="25" textAnchor="end" fill="#94A3B8" fontSize="10">1.8 V</text>
                  <text x="42" y="75" textAnchor="end" fill="#94A3B8" fontSize="10">1.5 V</text>
                  <text x="42" y="125" textAnchor="end" fill="#10B981" fontSize="10" fontWeight="bold">1.28 V (V_tn)</text>
                  <text x="42" y="180" textAnchor="end" fill="#94A3B8" fontSize="10">1.0 V (E_rev)</text>

                  {/* X Axis labels (Current Density A/cm2) */}
                  <text x="50" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">0.2</text>
                  <text x="190" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">1.0</text>
                  <text x="330" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">1.8</text>
                  <text x="460" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">2.4 A/cm²</text>

                  {/* Thermoneutral Horizontal Line */}
                  <line x1="50" y1="125" x2="480" y2="125" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x="440" y="120" textAnchor="end" fill="#34D399" fontSize="9" fontWeight="bold">Điểm Nhiệt Trung Hòa (V_tn)</text>

                  {/* Generate Path */}
                  {(() => {
                    const minV = 0.95;
                    const maxV = 1.80;
                    const minJ = 0.2;
                    const maxJ = 2.4;

                    const getX = (j: number) => 50 + ((j - minJ) / (maxJ - minJ)) * 410;
                    const getY = (v: number) => 180 - ((v - minV) / (maxV - minV)) * 160;

                    const pathStr = polarizationPoints
                      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.currentDensityA)} ${getY(p.vCell)}`)
                      .join(' ');

                    const currentX = getX(currentDensityA);
                    const currentY = getY(electroResult.operatingCellElectrolysisVoltageV);

                    return (
                      <g>
                        <path d={pathStr} fill="none" stroke="#06B6D4" strokeWidth="3" />
                        <circle cx={currentX} cy={currentY} r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                        <line x1={currentX} y1="20" x2={currentX} y2="180" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
                        <text x={currentX + 8} y={Math.max(35, currentY - 8)} fill="#FDE68A" fontSize="10" fontWeight="bold">
                          {electroResult.operatingCellElectrolysisVoltageV} V ({currentDensityA} A/cm²)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Explanation Note */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-cyan-400">Động Học Vận Chuyển Proton:</span> Nhờ năng lượng hoạt hóa dẫn proton qua mạng perovskite BZCYYb thấp (0.44 eV), điện trở ASR chỉ 0.054 Ω·cm², cho phép vận hành tại mật độ dòng cao trên 1.5 A/cm² với điện áp tế bào cực kỳ tối ưu &lt; 1.5 V.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Industrial Power-to-Syngas & E-Methanol Plant */}
      {activeMode === 'POWER_TO_X_PLANT' && (
        <div className="space-y-6">
          {/* Quick Power Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quy Mô Công Nghiệp Power-to-X:</span>
            {[
              { label: '2 MW (Pilot Thí Điểm E-Fuel)', mw: 2 },
              { label: '5 MW (Nhà Máy Syngas Phân Tán)', mw: 5 },
              { label: '10 MW (Tổ Hợp E-Methanol Chuẩn)', mw: 10 },
              { label: '25 MW (Trạm Sản Xuất Nhiên Liệu Hàng Không SAF)', mw: 25 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  sound.playUiClick();
                  setPlantPowerMw(preset.mw);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  plantPowerMw === preset.mw
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-cyan-400" />
                  Quy Mô Điện Năng Nạp
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  {plantPowerMw} MW
                </span>
              </div>

              {/* Power Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Công Suất Điện Vào (MW)</span>
                  <span className="font-semibold text-slate-200">{plantPowerMw} MW</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={plantPowerMw}
                  onChange={(e) => setPlantPowerMw(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Syngas Ratio Controller */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Tỷ Lệ CO₂ Nạp Cathode</span>
                  <span className="font-semibold text-slate-200">{(co2CathodeRatio * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={co2CathodeRatio}
                  onChange={(e) => setCo2CathodeRatio(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Downstream Synthesis Target Badge */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Sản Phẩm Đầu Ra Mong Muốn:</span>
                  <span className="font-bold font-mono text-emerald-400">{plantResult.downstreamProductVi}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tỷ Lệ Molar H₂ : CO:</span>
                  <span className="font-bold font-mono text-cyan-400">{plantResult.actualSyngasH2ToCoRatio} : 1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Sản Lượng E-Fuel Thành Phẩm:</span>
                  <span className="font-mono text-slate-200">{plantResult.downstreamProductMetricTonsPerDay} tấn/ngày</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1.5 flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Hiệu Suất Điện-Sang-Khí (LHV):</span>
                  <span className="font-mono text-emerald-400">{plantResult.powerToSyngasLhvEfficiencyPercent}%</span>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Production & Decarbonization */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Sản Lượng Khí & Thu Hồi Tuần Hoàn CO₂
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  {plantResult.stackCellCount.toLocaleString()} Tế Bào
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Sản Lượng Hydro Khô (H₂)</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                    {plantResult.h2ProductionKgPerHour} kg/h
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Không lẫn hơi nước</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Sản Lượng Monoxide (CO)</div>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                    {plantResult.coProductionKgPerHour} kg/h
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Khử từ CO₂ thu giữ</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Lưu Lượng Syngas Chuẩn</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                    {plantResult.syngasVolumeNm3PerHour.toLocaleString()} Nm³/h
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Nhiệt trị cao LHV</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 sm:col-span-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">CO₂ Thu Hồi & Tái Sử Dụng Thành Nhiên Liệu Tuần Hoàn</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        {plantResult.annualCo2UtilizedTons.toLocaleString()} tấn CO₂/năm
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Tổng lượng giảm phát thải tương đương: {plantResult.avoidedFossilCo2TonsPerYear.toLocaleString()} tấn CO₂/năm
                      </div>
                    </div>
                    <div className="p-2.5 bg-cyan-500/20 rounded-xl border border-cyan-500/40">
                      <Wind className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Economic & Technological Advantage */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Lợi Thế Công Nghệ Vượt Trội Của P-SOEC:
                </div>
                <p>
                  1. <span className="font-semibold text-white">Loại bỏ hoàn toàn tháp tách nước:</span> Khí syngas cực âm khô 100%, sẵn sàng nạp trực tiếp vào lò phản ứng tổng hợp methanol hoặc SAF mà không cần hệ thống làm lạnh ngưng tụ.
                </p>
                <p>
                  2. <span className="font-semibold text-white">Nhiệt độ vận hành thấp hơn 250°C:</span> Vận hành ở 550°C thay vì 850°C của SOEC cổ điển giúp tuổi thọ gioăng làm kín và tấm phân cực kim loại kéo dài trên 10 năm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
