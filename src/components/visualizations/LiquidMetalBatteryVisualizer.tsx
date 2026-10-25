// src/components/visualizations/LiquidMetalBatteryVisualizer.tsx
// Interactive Visualizer: Liquid Metal Battery (LMB) High-Temperature Density-Stratified Grid Storage System
// Standards: IUPAC Electrochemistry, Molten Salt Metallurgy & Vietnam GDPT 2018 Chemistry

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
  Box
} from 'lucide-react';
import {
  LMB_CHEMISTRY_CATALOG,
  LmbChemistryType,
  LiquidMetalBatteryEngine
} from '../../domain/liquidMetalBatteryEngine';
import { sound } from '../../audio/soundEngine';

type LmbTabMode =
  | 'DENSITY_STRATIFIED_INTERFACES'
  | 'SELF_HEATING_KINETICS'
  | 'CONTAINERIZED_GRID_LDES';

export const LiquidMetalBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LmbTabMode>('DENSITY_STRATIFIED_INTERFACES');

  // Interactive controls
  const [selectedChemistry, setSelectedChemistry] = useState<LmbChemistryType>('CA_SB');
  const [depthOfDischarge, setDepthOfDischarge] = useState<number>(0.50); // 5% to 95%
  const [operatingTempC, setOperatingTempC] = useState<number>(500.0); // 420°C to 550°C
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(300.0); // 100 to 800 mA/cm2
  const [cellActiveAreaCm2, setCellActiveAreaCm2] = useState<number>(400.0); // 200 to 1600 cm2

  // Containerized Grid Sizing
  const [gridPowerMw, setGridPowerMw] = useState<number>(2.0); // 1 to 20 MW
  const [gridDurationHours, setGridDurationHours] = useState<number>(6.0); // 4 to 16 h

  const currentSpec = LMB_CHEMISTRY_CATALOG[selectedChemistry];

  // Engine Computations
  const operatingConditions = useMemo(() => ({
    chemistry: selectedChemistry,
    temperatureC: operatingTempC,
    depthOfDischarge,
    currentDensityMaPerCm2: currentDensityMaCm2,
    cellActiveAreaCm2,
    ambientTemperatureC: 25.0,
    thermalInsulationConductivityWPerMK: 0.035
  }), [selectedChemistry, operatingTempC, depthOfDischarge, currentDensityMaCm2, cellActiveAreaCm2]);

  const electroResult = useMemo(() => {
    return LiquidMetalBatteryEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const gridSystemResult = useMemo(() => {
    return LiquidMetalBatteryEngine.designContainerizedGridSystem(
      gridPowerMw,
      gridDurationHours,
      selectedChemistry
    );
  }, [gridPowerMw, gridDurationHours, selectedChemistry]);

  // Polarization Curve Points (100 to 800 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 100; j <= 800; j += 50) {
      const cond = { ...operatingConditions, currentDensityMaPerCm2: j };
      const res = LiquidMetalBatteryEngine.calculateElectrochemicalPerformance(cond);
      points.push({
        currentDensity: j,
        vDis: res.operatingDischargeVoltageV,
        powerMw: res.powerDensityMwPerCm2
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: LmbTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleChemistrySelect = (chem: LmbChemistryType) => {
    sound.playUiClick();
    setSelectedChemistry(chem);
    setOperatingTempC(LMB_CHEMISTRY_CATALOG[chem].operatingTemperatureC);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 text-white shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-xl">
            <Flame className="w-7 h-7 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-400 bg-clip-text text-transparent">
                Pin Kim Loại Lỏng (LMB) & Phân Tầng Tỷ Trọng
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono">
                Ambri / Sadoway Tech
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              3 tầng chất lỏng tự phân tầng tỷ trọng (Mg || Muối || Sb), bề mặt tự phục hồi vĩnh viễn và tự sưởi Joule (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => handleModeChange('DENSITY_STRATIFIED_INTERFACES')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'DENSITY_STRATIFIED_INTERFACES'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3 Tầng Lỏng & Tỷ Trọng</span>
          </button>
          <button
            onClick={() => handleModeChange('SELF_HEATING_KINETICS')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'SELF_HEATING_KINETICS'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Động Học & Tự Sưởi Joule</span>
          </button>
          <button
            onClick={() => handleModeChange('CONTAINERIZED_GRID_LDES')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'CONTAINERIZED_GRID_LDES'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Container Lưới 20ft (LDES)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: 3-Layer Density Stratification & Self-Healing Liquid Interfaces */}
      {activeMode === 'DENSITY_STRATIFIED_INTERFACES' && (
        <div className="space-y-6">
          {/* Density Hierarchy Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-slate-700/70 bg-slate-800/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Tầng Trên (Top - Cực Âm)</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">{currentSpec.anodeLayer.nameVi}</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  ρ = {currentSpec.anodeLayer.densityGPerCm3} g/cm³ (Nhẹ nhất)
                </div>
              </div>
              <div
                className="w-4 h-12 rounded border border-white/30"
                style={{ backgroundColor: currentSpec.anodeLayer.colorHex }}
              />
            </div>

            <div className="p-3 rounded-xl border border-slate-700/70 bg-slate-800/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Tầng Giữa (Middle - Điện Giải)</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">{currentSpec.electrolyteLayer.nameVi}</div>
                <div className="text-[11px] text-cyan-400 font-mono mt-1">
                  ρ = {currentSpec.electrolyteLayer.densityGPerCm3} g/cm³ (Trung gian)
                </div>
              </div>
              <div
                className="w-4 h-12 rounded border border-white/30"
                style={{ backgroundColor: currentSpec.electrolyteLayer.colorHex }}
              />
            </div>

            <div className="p-3 rounded-xl border border-slate-700/70 bg-slate-800/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Tầng Đáy (Bottom - Cực Dương)</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">{currentSpec.cathodeLayer.nameVi}</div>
                <div className="text-[11px] text-amber-400 font-mono mt-1">
                  ρ = {currentSpec.cathodeLayer.densityGPerCm3} g/cm³ (Nặng nhất)
                </div>
              </div>
              <div
                className="w-4 h-12 rounded border border-white/30"
                style={{ backgroundColor: currentSpec.cathodeLayer.colorHex }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Lựa Chọn Hóa Học & Trạng Thái
                </span>
                <span className="text-xs text-amber-400 font-mono">DOD: {(depthOfDischarge * 100).toFixed(0)}%</span>
              </div>

              {/* Chemistry Selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Hệ Cặp Điện Cực Kim Loại Lỏng</label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(LMB_CHEMISTRY_CATALOG) as LmbChemistryType[]).map((cKey) => {
                    const c = LMB_CHEMISTRY_CATALOG[cKey];
                    const isSelected = selectedChemistry === cKey;
                    return (
                      <button
                        key={cKey}
                        onClick={() => handleChemistrySelect(cKey)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{c.nameVi}</span>
                          <span className="font-mono text-[11px] text-amber-400">
                            {c.operatingTemperatureC}°C | {c.standardPotentialE0V} V
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {c.primaryAdvantagesVi}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DOD Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Độ Sâu Phóng Điện (DOD)</span>
                  <span className="font-semibold text-slate-200">{(depthOfDischarge * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={depthOfDischarge}
                  onChange={(e) => setDepthOfDischarge(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5% (Nạp Đầy)</span>
                  <span>50% (Danh Định)</span>
                  <span>95% (Xả Sâu)</span>
                </div>
              </div>

              {/* Marangoni Convection Status */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Ổn Định Mặt Phân Giới Lỏng-Lỏng</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">
                    {electroResult.liquidInterfacesStability.marangoniConvectionRisk === 'STABLE'
                      ? 'ỔN ĐỊNH TUYỆT ĐỐI (KHÔNG NHŨ HÓA)'
                      : 'LƯU CHUYỂN CUỘN XOÁY MARANGONI'}
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Right Column: Dynamic SVG 3-Layer Cross-Section */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Mô Phỏng Mặt Cắt 3 Tầng Lỏng Trong Tế Bào Kín
                </span>
                <span className="text-xs font-mono text-amber-300">
                  OCV = {electroResult.openCircuitVoltageV.toFixed(3)} V | V_dis = {electroResult.operatingDischargeVoltageV.toFixed(3)} V
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Outer Steel Container with Vacuum Insulation */}
                  <rect x="50" y="20" width="400" height="200" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="3" />
                  <rect x="65" y="35" width="370" height="170" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />

                  {/* Top Layer: Liquid Anode */}
                  <rect x="75" y="45" width="350" height="40" rx="4" fill={currentSpec.anodeLayer.colorHex} opacity="0.85" />
                  <text x="250" y="70" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="bold">
                    {currentSpec.anodeLayer.chemicalFormula} - Cực Âm Lỏng (ρ = {currentSpec.anodeLayer.densityGPerCm3} g/cm³)
                  </text>

                  {/* Middle Layer: Molten Halide Salt */}
                  <rect x="75" y="90" width="350" height="35" rx="2" fill={currentSpec.electrolyteLayer.colorHex} opacity="0.85" />
                  <text x="250" y="112" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">
                    {currentSpec.electrolyteLayer.chemicalFormula} - Muối Nóng Chảy (ρ = {currentSpec.electrolyteLayer.densityGPerCm3} g/cm³)
                  </text>

                  {/* Ion Transport Arrow */}
                  <path d="M 250 85 L 250 125" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,3" />
                  <circle cx="250" cy="105" r="8" fill="#FFFFFF" />
                  <text x="250" y="108" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="bold">Mg²⁺</text>

                  {/* Bottom Layer: Liquid Cathode */}
                  <rect x="75" y="130" width="350" height="65" rx="4" fill={currentSpec.cathodeLayer.colorHex} opacity="0.9" />
                  <text x="250" y="162" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="bold">
                    {currentSpec.cathodeLayer.chemicalFormula} - Cực Dương Lỏng (ρ = {currentSpec.cathodeLayer.densityGPerCm3} g/cm³)
                  </text>
                  <text x="250" y="180" textAnchor="middle" fill="#1E293B" fontSize="10">
                    Hợp kim hóa Mg₃Sb₂ ({Math.round(depthOfDischarge * 100)}% DOD)
                  </text>

                  {/* External Circuit Leads */}
                  <path d="M 120 45 L 120 10 L 380 10 L 380 195" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  <circle cx="250" cy="10" r="10" fill="#0F172A" stroke="#FBBF24" strokeWidth="2" />
                  <text x="250" y="14" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">e⁻</text>
                </svg>
              </div>

              {/* Chemical Equations Card */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Phản ứng Cực Âm (-):</span>
                  <span>{currentSpec.anodeReactionVi}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">Phản ứng Cực Dương (+):</span>
                  <span>{currentSpec.cathodeReactionVi}</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1 flex justify-between items-center text-emerald-300 font-bold">
                  <span>Toàn Phần Hợp Kim Hóa:</span>
                  <span>{currentSpec.overallAlloyingReactionVi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: High-Current Kinetics & Joulean Self-Heating */}
      {activeMode === 'SELF_HEATING_KINETICS' && (
        <div className="space-y-6">
          {/* Thermal Self-Sustaining Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              electroResult.selfHeatingThermalBalance.thermalSelfSustaining
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500 text-amber-200'
            }`}
          >
            {electroResult.selfHeatingThermalBalance.thermalSelfSustaining ? (
              <Flame className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {electroResult.selfHeatingThermalBalance.thermalSelfSustaining
                    ? 'TỰ SƯỞI JOULE DUY TRÌ NHIỆT (SELF-SUSTAINING)'
                    : 'CẦN BỘ SƯỞI BỔ SUNG KHI VẬN HÀNH DÒNG THẤP'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono">
                  P_joule = {electroResult.selfHeatingThermalBalance.jouleanHeatGeneratedWatts} W vs Q_loss = {electroResult.selfHeatingThermalBalance.heatLossToAmbientWatts} W
                </span>
              </div>
              <p className="text-xs opacity-90">
                Tại mật độ dòng {currentDensityMaCm2} mA/cm², nhiệt trở nội Ohm sinh nhiệt I²·R đủ bù đắp hoàn toàn lượng nhiệt thất thoát qua lớp cách nhiệt chân không microporous, giúp tế bào tự giữ nhiệt độ {operatingTempC}°C mà không tốn điện sưởi ngoài.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Tham Số Động Học & Tải Dòng
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {electroResult.powerDensityMwPerCm2} mW/cm²
                </span>
              </div>

              {/* Operating Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Nhiệt Độ Vận Hành</span>
                  <span className="font-semibold text-slate-200">{operatingTempC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min="420"
                  max="550"
                  step="5"
                  value={operatingTempC}
                  onChange={(e) => setOperatingTempC(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>420°C (Li-Bi)</span>
                  <span>475°C (Mg-Sb)</span>
                  <span>550°C (Giới hạn tối đa)</span>
                </div>
              </div>

              {/* Current Density */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mật Độ Dòng Điện (mA/cm²)</span>
                  <span className="font-semibold text-slate-200">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="20"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Overpotentials Readout */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Quá Thế Hoạt Hóa (η_act)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {(electroResult.overpotentials.activationV * 1000).toFixed(1)} mV
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Siêu nhanh (&gt;8 A/cm²)</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Quá Thế Ohm (η_ohm)</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-1">
                    {(electroResult.overpotentials.ohmicV * 1000).toFixed(1)} mV
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Muối halide 2.1 S/cm</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Nhiệt Sinh Joule (P_joule)</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {electroResult.selfHeatingThermalBalance.jouleanHeatGeneratedWatts} W
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Nhiệt Thất Thoát (Q_loss)</div>
                  <div className="text-base font-bold font-mono text-rose-400 mt-1">
                    {electroResult.selfHeatingThermalBalance.heatLossToAmbientWatts} W
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: V-I Curve & Power Density */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Đường Cong Phân Cực Điện Áp & Mật Độ Công Suất
                </span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  V_cell = {electroResult.operatingDischargeVoltageV} V
                </span>
              </div>

              {/* SVG V-I Curve */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="100" x2="480" y2="100" stroke="#1E293B" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Y Axis labels (Voltage V) */}
                  <text x="42" y="25" textAnchor="end" fill="#94A3B8" fontSize="10">1.3 V</text>
                  <text x="42" y="100" textAnchor="end" fill="#94A3B8" fontSize="10">1.0 V</text>
                  <text x="42" y="180" textAnchor="end" fill="#94A3B8" fontSize="10">0.7 V</text>

                  {/* X Axis labels (Current Density mA/cm2) */}
                  <text x="50" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">100</text>
                  <text x="190" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">350</text>
                  <text x="330" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">600</text>
                  <text x="460" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">800 mA/cm²</text>

                  {/* Generate Path */}
                  {(() => {
                    const minV = 0.70;
                    const maxV = 1.30;
                    const minJ = 100;
                    const maxJ = 800;

                    const getX = (j: number) => 50 + ((j - minJ) / (maxJ - minJ)) * 410;
                    const getY = (v: number) => 180 - ((v - minV) / (maxV - minV)) * 160;

                    const pathStr = polarizationPoints
                      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.currentDensity)} ${getY(p.vDis)}`)
                      .join(' ');

                    const currentX = getX(currentDensityMaCm2);
                    const currentY = getY(electroResult.operatingDischargeVoltageV);

                    return (
                      <g>
                        <path d={pathStr} fill="none" stroke="#F59E0B" strokeWidth="3" />
                        <circle cx={currentX} cy={currentY} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                        <line x1={currentX} y1="20" x2={currentX} y2="180" stroke="#10B981" strokeWidth="1" strokeDasharray="3,3" />
                        <text x={currentX + 8} y={Math.max(35, currentY - 8)} fill="#A7F3D0" fontSize="10" fontWeight="bold">
                          {electroResult.operatingDischargeVoltageV} V ({currentDensityMaCm2} mA/cm²)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-400">Đặc Tuyến Thẳng Tuyệt Đối:</span> Vì quá thế hoạt hóa lỏng-lỏng gần như bằng 0 (quá trình chuyển electron giữa 2 kim loại lỏng không bị giới hạn bởi tinh thể học), sụt áp tế bào hoàn toàn tuyến tính tuân theo định luật Ohm của muối nóng chảy.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: 20-Foot ISO Containerized Grid Energy Storage System */}
      {activeMode === 'CONTAINERIZED_GRID_LDES' && (
        <div className="space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Cấu Hình Container Lưới:</span>
            {[
              { label: '1 MW / 4 MWh (4h Trạm Phân Phối)', mw: 1, h: 4 },
              { label: '2 MW / 12 MWh (6h Peaker Tối)', mw: 2, h: 6 },
              { label: '5 MW / 40 MWh (8h Trang Trại Gió)', mw: 5, h: 8 },
              { label: '10 MW / 100 MWh (10h LDES Trọng Điểm)', mw: 10, h: 10 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  sound.playUiClick();
                  setGridPowerMw(preset.mw);
                  setGridDurationHours(preset.h);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  gridPowerMw === preset.mw && gridDurationHours === preset.h
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Plant Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-amber-400" />
                  Quy Mô Trạm Container ISO
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {gridSystemResult.totalStorageCapacityMwh} MWh
                </span>
              </div>

              {/* Power Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Công Suất Danh Định (MW)</span>
                  <span className="font-semibold text-slate-200">{gridPowerMw} MW</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={gridPowerMw}
                  onChange={(e) => setGridPowerMw(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Duration Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Thời Gian Xả Liên Tục (Giờ)</span>
                  <span className="font-semibold text-slate-200">{gridDurationHours} Giờ</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="1"
                  value={gridDurationHours}
                  onChange={(e) => setGridDurationHours(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Economics */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Suất Đầu Tư Trọn Gói:</span>
                  <span className="font-bold font-mono text-emerald-400">${gridSystemResult.capitalCostPerKwhUsd} / kWh</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Số Container ISO 20ft:</span>
                  <span className="font-mono text-slate-300">{gridSystemResult.containerCount20Ft} Container</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Suy Thoái Sau 20 Năm:</span>
                  <span className="font-mono text-emerald-400">&lt; {gridSystemResult.twentyYearCalendarDegradationPercent}%</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1.5 flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Tổng Vốn Đầu Tư (CapEx):</span>
                  <span className="font-mono text-cyan-400">${gridSystemResult.totalCapExMillionUsd} Triệu USD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Inventory & Decarbonization */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Khối Lượng Kim Loại & Giảm Phát Thải
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  RTE: {gridSystemResult.roundTripEfficiencyPercent}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Kim Loại Cực Âm ({currentSpec.anodeLayer.chemicalFormula})</div>
                  <div className="text-lg font-bold font-mono text-slate-300 mt-1">
                    {gridSystemResult.magnesiumAnodeTons} tấn
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Kim Loại Cực Dương ({currentSpec.cathodeLayer.chemicalFormula})</div>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                    {gridSystemResult.antimonyCathodeTons} tấn
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Muối Halide Nóng Chảy</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                    {gridSystemResult.moltenElectrolyteSaltTons} tấn
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 sm:col-span-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Giảm Phát Thải Khí Nhà Kính Thay Thế Peaker</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        {gridSystemResult.avoidedPeakerCo2TonsPerYear.toLocaleString()} tấn CO₂/năm
                      </div>
                    </div>
                    <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/40">
                      <Wind className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Longevity & Safety Highlights */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Đột Phá Của Công Nghệ Pin Kim Loại Lỏng (Ambri):
                </div>
                <p>
                  1. <span className="font-semibold text-white">Không Suy Giảm Dung Lượng:</span> Hoàn toàn không có vật liệu rắn chịu ứng suất giãn nở nhiệt hay phân rã cấu trúc. Sau 20 năm vận hành (&gt;15.000 chu kỳ 100% DOD), dung lượng pin vẫn đạt &gt;99%.
                </p>
                <p>
                  2. <span className="font-semibold text-white">Chống Cháy Nổ Tuyệt Đối:</span> Không có dung môi hữu cơ dễ bay hơi. Nếu bị quá nhiệt hoặc chập mạch, các kim loại lỏng chỉ hòa tan vào nhau mà không gây phản ứng thoát nhiệt (Thermal Runaway).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
