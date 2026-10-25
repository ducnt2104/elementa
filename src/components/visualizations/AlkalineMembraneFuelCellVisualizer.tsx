// src/components/visualizations/AlkalineMembraneFuelCellVisualizer.tsx
// Interactive Visualizer: Alkaline Anion Exchange Membrane Fuel Cell (AEMFC) Platinum-Free System
// Standards: IUPAC Electrochemistry, DOE Hydrogen & Fuel Cell Benchmarks, Carbonation Self-Purging & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Flame,
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
  Truck,
  RefreshCw,
  Coins,
  Cpu,
  Layers
} from 'lucide-react';
import {
  AEMFC_CATALYSTS,
  AemfcCatalystType,
  AlkalineMembraneFuelCellEngine,
  AemfcOperatingConditions
} from '../../domain/alkalineMembraneFuelCellEngine';
import { sound } from '../../audio/soundEngine';

type AemfcTabMode =
  | 'PGM_FREE_CATALYST_AND_MEMBRANE'
  | 'CO2_CARBONATION_SELF_PURGING'
  | 'HEAVY_DUTY_TRUCK_POWERTRAIN';

export const AlkalineMembraneFuelCellVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AemfcTabMode>('PGM_FREE_CATALYST_AND_MEMBRANE');

  // Interactive controls
  const [selectedCatalyst, setSelectedCatalyst] = useState<AemfcCatalystType>('PGM_FREE_AG_NIMO');
  const [temperatureC, setTemperatureC] = useState<number>(75.0); // 60 to 85 °C
  const [pressureBar, setPressureBar] = useState<number>(1.5); // 1.0 to 3.0 bar
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(1.20); // 0.1 to 2.5 A/cm2
  const [co2InletPpm, setCo2InletPpm] = useState<number>(420.0); // 0 to 500 ppm
  const [membraneThicknessUm, setMembraneThicknessUm] = useState<number>(15.0); // 10 to 30 um

  // Heavy Truck Powertrain Controls
  const [truckNetPowerKw, setTruckNetPowerKw] = useState<number>(150.0); // 50 to 300 kW

  const currentCatalyst = AEMFC_CATALYSTS[selectedCatalyst];

  // Engine Computations
  const operatingConditions: AemfcOperatingConditions = useMemo(() => ({
    catalystType: selectedCatalyst,
    temperatureC,
    pressureBar,
    currentDensityAcm2,
    co2InletPpm,
    membraneThicknessMicrons: membraneThicknessUm,
    relativeHumidityCathodePercent: 90.0,
    relativeHumidityAnodePercent: 85.0,
    cellActiveAreaCm2: 350.0
  }), [selectedCatalyst, temperatureC, pressureBar, currentDensityAcm2, co2InletPpm, membraneThicknessUm]);

  const perfResult = useMemo(() => {
    return AlkalineMembraneFuelCellEngine.calculatePerformance(operatingConditions);
  }, [operatingConditions]);

  const truckResult = useMemo(() => {
    return AlkalineMembraneFuelCellEngine.designHeavyTruckPowerSystem(
      truckNetPowerKw,
      selectedCatalyst
    );
  }, [truckNetPowerKw, selectedCatalyst]);

  // Polarization Curve Points (0.1 to 2.5 A/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 0.1; j <= 2.4; j += 0.2) {
      const cond: AemfcOperatingConditions = { ...operatingConditions, currentDensityAcm2: j };
      const res = AlkalineMembraneFuelCellEngine.calculatePerformance(cond);
      points.push({
        currentDensity: j,
        vCell: res.operatingCellVoltageV,
        powerDensity: res.powerDensityWPerCm2
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: AemfcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedCatalyst('PGM_FREE_AG_NIMO');
    setTemperatureC(75.0);
    setPressureBar(1.5);
    setCurrentDensityAcm2(1.20);
    setCo2InletPpm(420.0);
    setMembraneThicknessUm(15.0);
    setTruckNetPowerKw(150.0);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-full">
                  Alkaline Anion Exchange Membrane Fuel Cell (AEMFC)
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-full">
                  100% Platinum-Free (Zero PGM)
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Pin Nhiên Liệu Màng Kiềm AEMFC & Động Lực Học Tự Thoát CO₂
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Mô phỏng phản ứng oxi hóa hydro HOR trên niken-molybden (Ni-Mo) và khử oxy ORR trên hạt nano bạc (Ag/C) trong môi trường kiềm (pH &gt; 13), cơ chế tự làm sạch cacbonat (electrochemical self-purging) và hệ thống pin nhiên liệu 150 kW cho xe tải đường dài.
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
          onClick={() => handleModeChange('PGM_FREE_CATALYST_AND_MEMBRANE')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'PGM_FREE_CATALYST_AND_MEMBRANE'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Xúc Tác Không Bạch Kim (Ag/Ni-Mo) & Màng Kiềm OH⁻</span>
        </button>

        <button
          onClick={() => handleModeChange('CO2_CARBONATION_SELF_PURGING')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'CO2_CARBONATION_SELF_PURGING'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>2. Tự Thoát Khí CO₂ (Self-Purging) & Cân Bằng Nước</span>
        </button>

        <button
          onClick={() => handleModeChange('HEAVY_DUTY_TRUCK_POWERTRAIN')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'HEAVY_DUTY_TRUCK_POWERTRAIN'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>3. Xe Tải Nặng Chạy Hydro 150 kW (&gt;650 km)</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Visualizer Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Thông Số Động Học & Vận Hành
            </span>
            <span className="text-xs px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded-md border border-cyan-800 font-mono">
              {currentDensityAcm2.toFixed(2)} A/cm²
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'HEAVY_DUTY_TRUCK_POWERTRAIN' ? (
            <div className="flex flex-col gap-4">
              {/* Catalyst Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Hệ Vật Liệu Xúc Tác Điện Cực (Catalyst):</span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">
                    ${currentCatalyst.costPerKwDollar}/kW
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(AEMFC_CATALYSTS) as AemfcCatalystType[]).map((catId) => {
                    const spec = AEMFC_CATALYSTS[catId];
                    const isSelected = selectedCatalyst === catId;
                    return (
                      <button
                        key={catId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedCatalyst(catId);
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-950/80 border-cyan-500/80 text-white shadow-md shadow-cyan-900/20'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className={isSelected ? 'text-cyan-300' : 'text-slate-300'}>
                            {spec.nameVi}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            spec.pgmLoadingMgPerCm2 === 0
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {spec.pgmLoadingMgPerCm2 === 0 ? '0g PGM' : `${spec.pgmLoadingMgPerCm2} mg/cm² Pt`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Density */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Mật Độ Dòng Điện (Current Density):</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentDensityAcm2.toFixed(2)} A/cm²</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.05"
                  value={currentDensityAcm2}
                  onChange={(e) => setCurrentDensityAcm2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.1 A/cm²</span>
                  <span>1.2 A/cm² (Điểm làm việc tối ưu)</span>
                  <span>2.5 A/cm² (Đỉnh)</span>
                </div>
              </div>

              {/* CO2 Inlet Concentration */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Hàm Lượng CO₂ Khí Đầu Vào (Cathode CO₂):</span>
                  <span className="font-mono text-amber-400 font-bold">{co2InletPpm.toFixed(0)} ppm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={co2InletPpm}
                  onChange={(e) => setCo2InletPpm(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0 ppm (Khí O₂ tinh khiết)</span>
                  <span>420 ppm (Không khí tự nhiên)</span>
                  <span>500 ppm</span>
                </div>
              </div>

              {/* Operating Temperature */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Khối Pin (Cell Temperature):</span>
                  <span className="font-mono text-cyan-400 font-bold">{temperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="85"
                  step="1"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Pressure & Membrane Thickness */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Áp Suất (P):</div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={pressureBar}
                    onChange={(e) => setPressureBar(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-right text-[11px] font-mono text-blue-400 font-bold mt-0.5">
                    {pressureBar.toFixed(1)} bar
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Độ Dày Màng:</div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={membraneThicknessUm}
                    onChange={(e) => setMembraneThicknessUm(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-right text-[11px] font-mono text-blue-400 font-bold mt-0.5">
                    {membraneThicknessUm} µm
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 3 Heavy Truck Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Công Suất Thuần Khối Pin Xe Tải (Net Stack Power):</span>
                  <span className="font-mono text-amber-400 font-bold">{truckNetPowerKw} kW</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={truckNetPowerKw}
                  onChange={(e) => setTruckNetPowerKw(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>50 kW (Xe van giao hàng)</span>
                  <span>150 kW (Xe đầu kéo Class-8 chuẩn)</span>
                  <span>300 kW (Tải siêu nặng)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  Đột Phá Chi Phí: Không Còn Nút Thắt Bạch Kim
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pin PEMFC truyền thống tiêu tốn gần $8,000 tiền kim loại quý bạch kim/rutheni cho mỗi xe tải 150 kW. Với công nghệ AEMFC sử dụng xúc tác Bạc (Ag) và Niken-Molybden (Ni-Mo), chi phí xúc tác giảm vọt <strong className="text-emerald-400 font-mono">-{truckResult.catalystCostSavingsPercent}%</strong> chỉ còn <strong className="text-cyan-300 font-mono">${truckResult.totalCatalystCostDollar}</strong>!
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
                <span>Điện Thế Tế Bào (V_cell)</span>
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {perfResult.operatingCellVoltageV.toFixed(3)} <span className="text-xs text-slate-400">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                OCV: {perfResult.openCircuitVoltageV.toFixed(2)} V
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Mật Độ Công Suất</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {perfResult.powerDensityWPerCm2.toFixed(3)} <span className="text-xs text-slate-400">W/cm²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Hiệu suất LHV: {perfResult.efficiencies.systemLhvEfficiencyPercent}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Tự Thoát CO₂ (Purging)</span>
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {perfResult.carbonationState.selfPurgingEfficiencyPercent}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {perfResult.carbonationState.isOperatingInSelfPurgingRegime ? 'Chế độ tự làm sạch tích cực' : 'Tích tụ cacbonat'}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Nước Sinh Tại Anode</span>
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="text-xl font-bold font-mono text-sky-300 mt-1">
                {perfResult.waterManagement.anodeProductionGPerHour.toFixed(0)} <span className="text-xs text-slate-400">g/h</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Khuếch tán ngược: {perfResult.waterManagement.backDiffusionSufficiencyRatio}x
              </div>
            </div>
          </div>

          {/* TAB 1: PGM-Free Catalyst & Anion Exchange Membrane */}
          {activeMode === 'PGM_FREE_CATALYST_AND_MEMBRANE' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    Cấu Trúc Màng Điện Cực MEA & Chiều Vận Chuyển Ion Hydroxit OH⁻
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 rounded-lg">
                  {currentCatalyst.nameVi.split('(')[0]}
                </span>
              </div>

              {/* Schematic SVG: AEMFC MEA Cross-Section */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 260" className="w-full h-auto">
                  <defs>
                    <linearGradient id="anodeCatalystGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="aemMembraneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="cathodeCatalystGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>

                  {/* Left: Anode GDL & Ni-Mo Catalyst */}
                  <rect x="50" y="30" width="130" height="200" rx="6" fill="url(#anodeCatalystGrad)" stroke="#64748b" strokeWidth="2" />
                  <text x="115" y="60" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                    ANODE HYDRO (-)
                  </text>
                  <text x="115" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    2H₂ + 4OH⁻ ➔ 4H₂O + 4e⁻
                  </text>
                  <text x="115" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                    E⁰ = -0.83 V (Ni-Mo/C)
                  </text>
                  <text x="115" y="130" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                    H₂ vào ➔ H₂O sinh ra
                  </text>

                  {/* Middle: Thin Alkaline Anion Exchange Membrane (AEM) */}
                  <rect x="210" y="30" width="340" height="200" rx="4" fill="url(#aemMembraneGrad)" stroke="#164e63" strokeWidth="1.5" />
                  
                  {/* Hydroxide OH- migration stream (Right to Left!) */}
                  <path d="M 520 70 L 240 70" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="6,4" markerEnd="url(#arrow)" />
                  <path d="M 520 130 L 240 130" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="6,4" markerEnd="url(#arrow)" />
                  <path d="M 520 190 L 240 190" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="6,4" markerEnd="url(#arrow)" />

                  <text x="380" y="55" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold">
                    Dòng Chuyển Dịch Ion Hydroxit OH⁻ (Từ Cathode Sang Anode!)
                  </text>
                  <text x="380" y="145" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">
                    Màng Polymer PiperION / Sustainion ({membraneThicknessUm} µm)
                  </text>
                  <text x="380" y="210" textAnchor="middle" fill="#a5f3fc" fontSize="9">
                    Khác biệt cốt lõi với PEMFC: Ion mang điện là OH⁻ (không phải proton H⁺)
                  </text>

                  {/* Right: Cathode GDL & Silver (Ag/C) Nanoparticles */}
                  <rect x="580" y="30" width="130" height="200" rx="6" fill="url(#cathodeCatalystGrad)" stroke="#94a3b8" strokeWidth="2" />
                  <text x="645" y="60" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">
                    CATHODE OXY (+)
                  </text>
                  <text x="645" y="80" textAnchor="middle" fill="#1e293b" fontSize="9" fontFamily="monospace">
                    O₂ + 2H₂O + 4e⁻ ➔ 4OH⁻
                  </text>
                  <text x="645" y="100" textAnchor="middle" fill="#334155" fontSize="9">
                    E⁰ = +0.40 V (Ag/C Nano)
                  </text>
                  <text x="645" y="130" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                    O₂ vào ➔ H₂O bị tiêu thụ
                  </text>

                  {/* Top External Circuit */}
                  <path d="M 115 30 L 115 12 L 645 12 L 645 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <circle cx="380" cy="12" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="380" y="16" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    e⁻
                  </text>
                </svg>
              </div>

              {/* Overpotential Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Phân Phối Tổn Thất Quá Thế (Tổng Quá Thế: {(perfResult.overpotentials.totalV * 1000).toFixed(0)} mV)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Hoạt hóa Cathode ORR:</span>
                    <div className="font-mono font-bold text-amber-400">
                      {(perfResult.overpotentials.cathodeOrrActivationV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Hoạt hóa Anode HOR:</span>
                    <div className="font-mono font-bold text-blue-400">
                      {(perfResult.overpotentials.anodeHorActivationV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Ohmic Màng AEM:</span>
                    <div className="font-mono font-bold text-rose-400">
                      {(perfResult.overpotentials.ohmicMembraneAndIonomerV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Tổn thất Cacbonat (CO₂):</span>
                    <div className="font-mono font-bold text-purple-400">
                      {(perfResult.overpotentials.carbonationOverpotentialV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CO2 Carbonation & Self-Purging Dynamics */}
          {activeMode === 'CO2_CARBONATION_SELF_PURGING' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Động Lực Học Cacbonat Hóa & Cơ Chế Tự Làm Sạch (Electrochemical Self-Purging)
                  </h3>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  perfResult.carbonationState.isOperatingInSelfPurgingRegime
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border-amber-800'
                }`}>
                  {perfResult.carbonationState.isOperatingInSelfPurgingRegime
                    ? 'ĐANG TỰ LÀM SẠCH CO₂ HIỆU QUẢ'
                    : 'DÒNG THẤP: TÍCH TỤ CACBONAT'}
                </div>
              </div>

              {/* Chemical Equations of Self-Purging */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    1. Phản Ứng Tại Cathode (Hấp Thụ CO₂ Khí Quyển)
                  </span>
                  <div className="text-xs font-mono text-amber-300 font-bold mt-2">
                    CO₂ + 2OH⁻ ⇌ CO₃²⁻ + H₂O
                  </div>
                  <div className="text-xs font-mono text-amber-400 mt-1">
                    CO₂ + OH⁻ ⇌ HCO₃⁻
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    CO₂ trong không khí phản ứng tiêu thụ ion OH⁻ tạo thành ion cacbonat có độ linh động thấp hơn.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    2. Phản Ứng Tại Anode (Tự Thoát Khí CO₂ Ở Dòng Cao)
                  </span>
                  <div className="text-xs font-mono text-emerald-300 font-bold mt-2">
                    CO₃²⁻ + 2H⁺ ➔ H₂O + CO₂↑ (Thoát van khí H₂)
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Tại mật độ dòng cao (&gt;0.8 A/cm²), môi trường axit vi mô ở anode đẩy CO₂ thoát ra đường xả mà không cần bộ lọc hóa chất cồng kềnh!
                  </p>
                </div>
              </div>

              {/* Self-Purging Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Hiệu Suất Tự Thoát CO₂:</span>
                  <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
                    {perfResult.carbonationState.selfPurgingEfficiencyPercent}%
                  </div>
                  <span className="text-[10px] text-slate-500">Tại {currentDensityAcm2} A/cm²</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Tốc Độ Xả Khí CO₂ Tại Anode:</span>
                  <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                    {perfResult.carbonationState.anodeCo2PurgeRateMlPerMinPerCell} <span className="text-xs text-slate-400">ml/min</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Mỗi tế bào 350 cm²</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Tỷ Lệ Cacbonat Dư Trong Màng:</span>
                  <div className="text-lg font-bold font-mono text-amber-300 mt-1">
                    {perfResult.carbonationState.membraneCarbonateFractionPercent}%
                  </div>
                  <span className="text-[10px] text-slate-500">Giữ độ dẫn điện ở mức cao</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Heavy-Duty Truck Powertrain (150 kW) */}
          {activeMode === 'HEAVY_DUTY_TRUCK_POWERTRAIN' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Hệ Thống Động Lực Xe Tải Nặng Chạy Hydro AEMFC 150 kW
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 rounded-lg font-mono">
                  {truckResult.netStackPowerKw} kW Class-8 Truck
                </span>
              </div>

              {/* Truck Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Tiết Kiệm Chi Phí Xúc Tác
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
                    -{truckResult.catalystCostSavingsPercent}% <span className="text-sm font-normal text-slate-400">giá</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    AEMFC: <strong className="text-white">${truckResult.totalCatalystCostDollar}</strong> vs PEMFC: <span className="line-through">${truckResult.equivalentPemfcCatalystCostDollar}</span>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Tầm Hoạt Động (50 kg H₂)
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {truckResult.drivingRangeKmOn50KgH2} <span className="text-sm font-normal text-slate-400">km</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Nạp nhanh 700 bar chỉ trong {truckResult.refuelTimeMinutes} phút
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-950/40 to-slate-950 rounded-xl border border-blue-800/60">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Cắt Giảm Khí Thải Diesel
                  </span>
                  <div className="text-2xl font-black font-mono text-blue-300 mt-1">
                    {truckResult.avoidedDieselCo2TonsPerYear} <span className="text-sm font-normal text-slate-400">tấn CO₂/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    120,000 km vận tải hàng hóa liên tỉnh/năm
                  </p>
                </div>
              </div>

              {/* Technical Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Hạng Mục Kỹ Thuật Khối Pin</th>
                      <th className="py-2 px-3 text-right">Khối AEMFC (Ag/Ni-Mo)</th>
                      <th className="py-2 px-3 text-right">Khối PEMFC (Bạch Kim)</th>
                      <th className="py-2 px-3 text-right">Ý Nghĩa Kinh Tế</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Hàm lượng kim loại quý PGM</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">{truckResult.totalPgmWeightGrams} g (0% PGM)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400">62.8 g (Bạch kim/Rutheni)</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Không phụ thuộc mỏ bạch kim</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Tổng chi phí vật liệu xúc tác</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">${truckResult.totalCatalystCostDollar}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400">${truckResult.equivalentPemfcCatalystCostDollar}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">Tiết kiệm ${truckResult.equivalentPemfcCatalystCostDollar - truckResult.totalCatalystCostDollar}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Số lượng tế bào nối tiếp</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">{truckResult.totalRepeatCellsCount} cells</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">420 cells</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Điện áp danh định ~320 V</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Khí thải ống xả</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">100% H₂O (Hơi nước sạch)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">100% H₂O</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Zero Emission Vehicle (ZEV)</td>
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
