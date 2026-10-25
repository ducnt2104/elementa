// src/components/visualizations/AllIronFlowBatteryVisualizer.tsx
// Interactive Visualizer: All-Iron Redox Flow Battery (IFB) Non-Toxic LDES Grid Storage System
// Standards: IUPAC Electrochemistry, ESS Inc. Commercial Benchmarks, Catalytic Proton Rebalancer & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Layers,
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
  Factory,
  RefreshCw,
  Cpu,
  Flame,
  Coins,
  ShieldAlert
} from 'lucide-react';
import {
  IRON_FLOW_ELECTROLYTES,
  IronFlowElectrolyteType,
  AllIronFlowBatteryEngine,
  IronFlowOperatingConditions
} from '../../domain/allIronFlowBatteryEngine';
import { sound } from '../../audio/soundEngine';

type IronFlowTabMode =
  | 'IRON_PLATING_AND_REDOX_STACK'
  | 'CATALYTIC_PROTON_REBALANCER'
  | 'SUBSTATION_LDES_PLANT';

export const AllIronFlowBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<IronFlowTabMode>('IRON_PLATING_AND_REDOX_STACK');

  // Interactive controls
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<IronFlowElectrolyteType>('ALL_CHLORIDE_SLURRY');
  const [stateOfCharge, setStateOfCharge] = useState<number>(0.50); // 5% to 95%
  const [temperatureC, setTemperatureC] = useState<number>(40.0); // 25 to 65 °C
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(45.0); // 20 to 120 mA/cm2
  const [flowRateLMin, setFlowRateLMin] = useState<number>(4.0); // 1.0 to 10.0 L/min
  const [hasProtonRebalancer, setHasProtonRebalancer] = useState<boolean>(true);

  // Grid Plant Sizing
  const [plantPowerKw, setPlantPowerKw] = useState<number>(500.0); // 100 to 2,000 kW
  const [storageHours, setStorageHours] = useState<number>(12.0); // 4 to 24 hours

  const currentElectrolyte = IRON_FLOW_ELECTROLYTES[selectedElectrolyte];

  // Engine Computations
  const operatingConditions: IronFlowOperatingConditions = useMemo(() => ({
    electrolyteType: selectedElectrolyte,
    stateOfCharge,
    temperatureC,
    currentDensityMaCm2,
    flowRateLMin,
    hasProtonRebalancer,
    electrodeAreaCm2: 1000.0,
    membraneTypeVi: 'Daramic Hydrophilic Microporous'
  }), [selectedElectrolyte, stateOfCharge, temperatureC, currentDensityMaCm2, flowRateLMin, hasProtonRebalancer]);

  const electroResult = useMemo(() => {
    return AllIronFlowBatteryEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const plantResult = useMemo(() => {
    return AllIronFlowBatteryEngine.designGridStoragePlant(
      plantPowerKw,
      storageHours,
      selectedElectrolyte
    );
  }, [plantPowerKw, storageHours, selectedElectrolyte]);

  // Polarization Curve Points (20 to 120 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 20; j <= 120; j += 10) {
      const cond: IronFlowOperatingConditions = { ...operatingConditions, currentDensityMaCm2: j };
      const res = AllIronFlowBatteryEngine.calculateElectrochemicalPerformance(cond);
      points.push({
        currentDensity: j,
        vDis: res.operatingDischargeVoltageV,
        vChg: res.operatingChargeVoltageV
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: IronFlowTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedElectrolyte('ALL_CHLORIDE_SLURRY');
    setStateOfCharge(0.50);
    setTemperatureC(40.0);
    setCurrentDensityMaCm2(45.0);
    setFlowRateLMin(4.0);
    setHasProtonRebalancer(true);
    setPlantPowerKw(500.0);
    setStorageHours(12.0);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-600/30 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-full">
                  All-Iron Redox Flow Battery (IFB) • ESS Inc. Technology
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-full">
                  100% Non-Toxic & Zero Degradation
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Pin Dòng Chảy Toàn Sắt (All-Iron Flow Battery) & Tháp Tái Tổ Hợp Proton
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Mô phỏng phản ứng mạ/hòa tan sắt Fe²⁺/Fe⁰ (-0.44 V) và oxi hóa-khử hòa tan Fe²⁺/Fe³⁺ (+0.77 V), tháp tái cân bằng proton xúc tác Pt/C (2Fe³⁺ + H₂ → 2Fe²⁺ + 2H⁺) và thiết kế trạm lưu trữ lưới điện siêu dài 12 giờ (LDES) chi phí cực thấp &lt;$185/kWh.
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
          onClick={() => handleModeChange('IRON_PLATING_AND_REDOX_STACK')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'IRON_PLATING_AND_REDOX_STACK'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Cặp Điện Cực Mạ Sắt & Dung Dịch Fe²⁺/Fe³⁺</span>
        </button>

        <button
          onClick={() => handleModeChange('CATALYTIC_PROTON_REBALANCER')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'CATALYTIC_PROTON_REBALANCER'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>2. Tháp Xúc Tác Tái Tổ Hợp Proton (H₂ + 2Fe³⁺)</span>
        </button>

        <button
          onClick={() => handleModeChange('SUBSTATION_LDES_PLANT')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'SUBSTATION_LDES_PLANT'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>3. Trạm Lưới Điện LDES 12 Giờ (500 kW / 6 MWh)</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Visualizer Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Thông Số Động Học & Vận Hành
            </span>
            <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded-md border border-emerald-800 font-mono">
              SOC {(stateOfCharge * 100).toFixed(0)}%
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'SUBSTATION_LDES_PLANT' ? (
            <div className="flex flex-col gap-4">
              {/* Electrolyte Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Hệ Dung Dịch Điện Phân Sắt:</span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    pH {currentElectrolyte.phOperatingRange.join(' - ')}
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(IRON_FLOW_ELECTROLYTES) as IronFlowElectrolyteType[]).map((elId) => {
                    const spec = IRON_FLOW_ELECTROLYTES[elId];
                    const isSelected = selectedElectrolyte === elId;
                    return (
                      <button
                        key={elId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedElectrolyte(elId);
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500/80 text-white shadow-md shadow-emerald-900/20'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className={isSelected ? 'text-emerald-300' : 'text-slate-300'}>
                            {spec.nameVi}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                            CE {spec.ironPlatingCoulombicEfficiencyPercent}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* State of Charge (SOC) */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Trạng Thái Nạp (State of Charge - SOC):</span>
                  <span className="font-mono text-emerald-400 font-bold">{(stateOfCharge * 100).toFixed(0)} %</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.05"
                  value={stateOfCharge}
                  onChange={(e) => setStateOfCharge(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5% (Xả cạn an toàn)</span>
                  <span>50% (Cân bằng)</span>
                  <span>95% (Nạp đầy)</span>
                </div>
              </div>

              {/* Current Density */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Mật Độ Dòng Điện Vận Hành:</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentDensityMaCm2.toFixed(1)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>20 mA/cm² (Tổn thất thấp)</span>
                  <span>45 mA/cm² (Tối ưu ESS)</span>
                  <span>120 mA/cm² (Công suất cao)</span>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Khối Tế Bào:</span>
                  <span className="font-mono text-amber-400 font-bold">{temperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="65"
                  step="1"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>25°C (Nhiệt độ phòng)</span>
                  <span>40°C (Ổn định động học)</span>
                  <span>65°C (Tự làm mát)</span>
                </div>
              </div>

              {/* Flow Rate & Proton Rebalancer Toggle */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Lưu Lượng Bơm Điện Phân:</span>
                  <span className="text-xs font-mono text-emerald-400">{flowRateLMin.toFixed(1)} L/min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={flowRateLMin}
                  onChange={(e) => setFlowRateLMin(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Tháp Tái Tổ Hợp Proton:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setHasProtonRebalancer(!hasProtonRebalancer);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      hasProtonRebalancer
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-700'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {hasProtonRebalancer ? 'Đang Bật (0% Lệch SOC)' : 'Tắt (Lệch SOC 0.42%/h)'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 3 Grid Plant Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Công Suất Trạm Lưu Trữ (Power):</span>
                  <span className="font-mono text-amber-400 font-bold">{plantPowerKw} kW</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={plantPowerKw}
                  onChange={(e) => setPlantPowerKw(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Thời Lượng Xả Lưới (Duration):</span>
                  <span className="font-mono text-cyan-400 font-bold">{storageHours} giờ (LDES)</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  step="1"
                  value={storageHours}
                  onChange={(e) => setStorageHours(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>4h (Cắt đỉnh)</span>
                  <span>12h (Lưu qua đêm tiêu chuẩn)</span>
                  <span>24h (Dự phòng lưới)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  An Toàn Tuyệt Đối & Không Suy Thoái
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Khác với pin Vanadium đắt đỏ ($300+/kWh) hoặc Lithium-ion dễ cháy nổ, pin All-Iron chỉ sử dụng muối sắt (FeCl₂/FeSO₄) hòa tan trong nước và muối ăn NH₄Cl. Dung dịch hoàn toàn không cháy, không độc hại sinh thái và tuổi thọ trên 25 năm với chu kỳ nạp/xả không giới hạn!
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
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {electroResult.operatingDischargeVoltageV.toFixed(3)} <span className="text-xs text-slate-400">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                V_chg: {electroResult.operatingChargeVoltageV.toFixed(3)} V (OCV: {electroResult.openCircuitVoltageV.toFixed(3)} V)
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Hiệu Suất Khứ Hồi (RTE)</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {electroResult.roundTripEfficiencyPercent.toFixed(1)} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                CE: {electroResult.coulombicEfficiencyPercent}% | VE: {electroResult.voltageEfficiencyPercent}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Tái Sinh Proton (H⁺)</span>
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {electroResult.rebalancerMetrics.protonRegenerationRateMolesPerHour.toFixed(3)} <span className="text-xs text-slate-400">mol/h</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Khí H₂: {electroResult.rebalancerMetrics.parasiticH2EvolutionRateMlPerMin} ml/min
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Lệch Trạng Thái (SOC Drift)</span>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className={`text-xl font-bold font-mono mt-1 ${
                electroResult.rebalancerMetrics.isStateOfChargeBalanced ? 'text-emerald-300' : 'text-rose-400'
              }`}>
                {electroResult.rebalancerMetrics.socDriftPerHourPercent}% <span className="text-xs text-slate-400">/giờ</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {electroResult.rebalancerMetrics.isStateOfChargeBalanced ? 'Cân bằng tự động khép kín' : 'Cần hóa chất bù'}
              </div>
            </div>
          </div>

          {/* TAB 1: Iron Plating & Soluble Redox Stack */}
          {activeMode === 'IRON_PLATING_AND_REDOX_STACK' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    Sơ Đồ Cắt Lớp Tế Bào Mạ Sắt Anode & Oxi Hóa-Khử Dung Dịch Fe²⁺/Fe³⁺
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg">
                  {currentElectrolyte.nameVi.split('(')[0]}
                </span>
              </div>

              {/* Schematic SVG: All-Iron Battery Cell Cross-Section */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 260" className="w-full h-auto">
                  <defs>
                    <linearGradient id="ironPlatingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <linearGradient id="negElectrolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="posElectrolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#78350f" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* Left: Negative Electrode (Iron Plating / Stripping) */}
                  <rect x="40" y="30" width="110" height="200" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <rect x="135" y="32" width="15" height="196" fill="url(#ironPlatingGrad)" stroke="#94a3b8" strokeWidth="1" />
                  <text x="95" y="60" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                    CỰC ÂM (-)
                  </text>
                  <text x="95" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    Fe²⁺ + 2e⁻ ⇌ Fe⁰
                  </text>
                  <text x="95" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                    E⁰ = -0.44 V
                  </text>
                  <text x="142" y="130" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold" transform="rotate(-90 142 130)">
                    LỚP MẠ SẮT Fe⁰
                  </text>

                  {/* Negative Flow Channel */}
                  <rect x="155" y="30" width="180" height="200" fill="url(#negElectrolyteGrad)" stroke="#047857" strokeWidth="1" />
                  <text x="245" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                    Dung Dịch Cực Âm (Fe²⁺)
                  </text>
                  <text x="245" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                    {currentElectrolyte.chemicalFormulas.negative}
                  </text>

                  {/* Middle: Microporous Separator */}
                  <rect x="340" y="30" width="20" height="200" fill="#f8fafc" opacity="0.8" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="350" y="130" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 350 130)">
                    MÀNG XỐP DARAMIC
                  </text>

                  {/* Positive Flow Channel */}
                  <rect x="365" y="30" width="180" height="200" fill="url(#posElectrolyteGrad)" stroke="#b45309" strokeWidth="1" />
                  <text x="455" y="55" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">
                    Dung Dịch Cực Dương (Fe²⁺/Fe³⁺)
                  </text>
                  <text x="455" y="75" textAnchor="middle" fill="#fcd34d" fontSize="9">
                    {currentElectrolyte.chemicalFormulas.positive}
                  </text>

                  {/* Right: Positive Carbon Felt Electrode */}
                  <rect x="550" y="30" width="110" height="200" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="605" y="60" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="12">
                    CỰC DƯƠNG (+)
                  </text>
                  <text x="605" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    Fe²⁺ ⇌ Fe³⁺ + e⁻
                  </text>
                  <text x="605" y="100" textAnchor="middle" fill="#fbbf24" fontSize="9">
                    E⁰ = +0.77 V
                  </text>

                  {/* Top External Circuit */}
                  <path d="M 95 30 L 95 12 L 605 12 L 605 30" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="350" cy="12" r="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <text x="350" y="16" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                    e⁻
                  </text>
                </svg>
              </div>

              {/* Chemical Equations Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Phản Ứng Khi Nạp Điện (Charge)
                  </span>
                  <div className="text-xs font-mono text-emerald-300 font-bold mt-2">
                    Cực Âm (-): Fe²⁺ + 2e⁻ ➔ Fe⁰ (Mạ sắt lên nỉ)
                  </div>
                  <div className="text-xs font-mono text-amber-300 font-bold mt-1">
                    Cực Dương (+): 2Fe²⁺ ➔ 2Fe³⁺ + 2e⁻ (Oxi hóa Fe²⁺)
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Phản Ứng Khi Xả Điện (Discharge)
                  </span>
                  <div className="text-xs font-mono text-emerald-300 font-bold mt-2">
                    Cực Âm (-): Fe⁰ ➔ Fe²⁺ + 2e⁻ (Hòa tan kim loại sắt)
                  </div>
                  <div className="text-xs font-mono text-amber-300 font-bold mt-1">
                    Cực Dương (+): 2Fe³⁺ + 2e⁻ ➔ 2Fe²⁺ (Khử ion Fe³⁺)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Catalytic Proton Rebalancer Tower */}
          {activeMode === 'CATALYTIC_PROTON_REBALANCER' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    Tháp Xúc Tác Tái Tổ Hợp Khí Hydro & Triệt Tiêu Lệch Trạng Thái Nạp
                  </h3>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                  hasProtonRebalancer
                    ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                    : 'bg-rose-950 text-rose-400 border-rose-800'
                }`}>
                  {hasProtonRebalancer ? 'HỆ THỐNG CÂN BẰNG TỰ ĐỘNG' : 'CHƯA BẬT BỘ TÁI TỔ HỢP'}
                </span>
              </div>

              {/* Rebalancer Mechanism Explanation */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Cơ Chế Phản Ứng Xúc Tác Triệt Tiêu Khí Hydro:
                </div>
                <div className="text-sm font-mono text-white font-bold p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  2 Fe³⁺ + H₂(k) ➔ 2 Fe²⁺ + 2 H⁺ (Xúc tác lưới Pt/C)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trong quá trình nạp mạ sắt ở cực âm, một lượng nhỏ điện lượng (~2-4%) bị tiêu hao cho phản ứng phụ thoát khí hydro: <span className="font-mono text-rose-300">2H⁺ + 2e⁻ ➔ H₂↑</span>. Điều này làm dung dịch cực âm mất proton (tăng pH) và làm cực dương tích lũy dư ion Fe³⁺ gây lệch SOC.
                  Tháp xúc tác gom toàn bộ khí H₂ từ khoang cực âm và cho tiếp xúc với dung dịch cực dương chứa Fe³⁺, phản ứng tái sinh hoàn toàn 2 ion H⁺ và đưa Fe³⁺ dư thừa trở lại Fe²⁺, duy trì dung dịch ở trạng thái cân bằng vĩnh cửu!
                </p>
              </div>

              {/* Rebalancer Metrics Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Khí H₂ Ký Sinh Thoát Ra:</span>
                  <div className="text-lg font-bold font-mono text-rose-300 mt-1">
                    {electroResult.rebalancerMetrics.parasiticH2EvolutionRateMlPerMin} <span className="text-xs text-slate-400">ml/min</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Được gom 100% vào tháp xúc tác</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Tốc Độ Tái Sinh Proton:</span>
                  <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                    {electroResult.rebalancerMetrics.protonRegenerationRateMolesPerHour.toFixed(3)} <span className="text-xs text-slate-400">mol/h</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Bảo toàn pH dung dịch</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Độ Ổn Định SOC Qua 20 Năm:</span>
                  <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
                    &gt; 99.98% <span className="text-xs text-slate-400">dung lượng</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Không cần thay dung dịch điện phân</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Substation LDES Grid Storage Plant (500 kW / 6 MWh) */}
          {activeMode === 'SUBSTATION_LDES_PLANT' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Trạm Lưu Trữ Lưới Điện LDES Siêu Dài 12 Giờ (ESS Energy Warehouse)
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 rounded-lg font-mono">
                  {plantResult.totalStorageCapacityKwh} kWh ({plantResult.storageDurationHours}h)
                </span>
              </div>

              {/* Plant Sizing Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-xl border border-amber-800/60">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Suất Vốn Đầu Tư (CapEx)
                  </span>
                  <div className="text-2xl font-black font-mono text-white mt-1">
                    ${plantResult.capitalCostDollarPerKwh} <span className="text-sm font-normal text-amber-300">/kWh</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tổng chi phí: <strong className="text-white">${plantResult.totalCapExDollar.toLocaleString()}</strong>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Điện Năng Xả Hàng Năm
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
                    {plantResult.annualElectricityDischargedMwh} <span className="text-sm font-normal text-slate-400">MWh/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    330 chu kỳ xả sâu 100% DOD/năm
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Cắt Giảm Phát Thải CO₂
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {plantResult.avoidedGridCo2TonsPerYear} <span className="text-sm font-normal text-slate-400">tấn CO₂/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Thay thế nhà máy điện khí chạy đỉnh
                  </p>
                </div>
              </div>

              {/* Plant Technical Specs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Hạng Mục Kỹ Thuật</th>
                      <th className="py-2 px-3 text-right">Quy Mô Thiết Kế</th>
                      <th className="py-2 px-3 text-right">Ý Nghĩa Kinh Tế / Môi Trường</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Công suất & Thời lượng lưu trữ</td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-400 font-bold">{plantResult.plantPowerKw} kW / {plantResult.storageDurationHours}h</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Dung lượng tổng: {plantResult.totalStorageCapacityKwh} kWh</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Số lượng Module tế bào (50 kW/stack)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">{plantResult.totalStacksCount} stacks</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Lắp đặt trong container ISO 40ft</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Tổng khối lượng muối sắt công nghiệp</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">{plantResult.totalIronSaltMassTons} tấn FeCl₂</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Giá chỉ ~$0.15/kg muối sắt thô</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Thể tích bồn chứa điện phân</td>
                      <td className="py-2.5 px-3 text-right font-mono text-blue-400 font-bold">{plantResult.electrolyteTankVolumeM3} m³</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Bồn nhựa HDPE tiêu chuẩn không áp suất</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Tuổi thọ dự án & Bảo hành chu kỳ</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">25 năm / Không giới hạn chu kỳ</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">100% tái chế được</td>
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
