// src/components/visualizations/AluminumAirBatteryVisualizer.tsx
// Interactive Visualizer: Aluminum-Air (Al-Air) Mechanically Rechargeable Battery System
// Standards: IUPAC Electrochemistry, Bayer Crystallization Kinetics, Phinergy EV Benchmarks & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
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
  Car,
  RefreshCw,
  FlaskConical,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  AL_AIR_INHIBITORS,
  AlAirInhibitorType,
  AluminumAirBatteryEngine,
  AlAirOperatingConditions
} from '../../domain/aluminumAirBatteryEngine';
import { sound } from '../../audio/soundEngine';

type AlAirTabMode =
  | 'ALKALINE_CORROSION_AND_INHIBITORS'
  | 'BAYER_CRYSTALLIZER_AND_RECYCLING'
  | 'EV_ULTRA_LONG_RANGE_PACK';

export const AluminumAirBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AlAirTabMode>('ALKALINE_CORROSION_AND_INHIBITORS');

  // Interactive controls
  const [selectedInhibitor, setSelectedInhibitor] = useState<AlAirInhibitorType>('PEG_ORGANIC_SURFACTANT');
  const [temperatureC, setTemperatureC] = useState<number>(35.0); // 20 to 65 °C
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(80.0); // 20 to 250 mA/cm2
  const [kohConcentrationM, setKohConcentrationM] = useState<number>(5.5); // 4.0 to 7.0 M
  const [aluminateConcM, setAluminateConcM] = useState<number>(2.2); // 0.5 to 4.5 M
  const [flowVelocityCmS, setFlowVelocityCmS] = useState<number>(8.0); // 2 to 20 cm/s
  const [hasSeedCrystallizer, setHasSeedCrystallizer] = useState<boolean>(true);

  // EV Pack Sizing
  const [evPackEnergyKwh, setEvPackEnergyKwh] = useState<number>(100.0); // 30 to 200 kWh

  const currentInhibitor = AL_AIR_INHIBITORS[selectedInhibitor];

  // Engine Computations
  const operatingConditions: AlAirOperatingConditions = useMemo(() => ({
    inhibitor: selectedInhibitor,
    temperatureC,
    currentDensityMaPerCm2: currentDensityMaCm2,
    kohConcentrationMolar: kohConcentrationM,
    aluminateConcentrationMolar: aluminateConcM,
    electrolyteFlowVelocityCmPerS: flowVelocityCmS,
    cellActiveAreaCm2: 400.0,
    hasSeedCrystallizer
  }), [selectedInhibitor, temperatureC, currentDensityMaCm2, kohConcentrationM, aluminateConcM, flowVelocityCmS, hasSeedCrystallizer]);

  const electroResult = useMemo(() => {
    return AluminumAirBatteryEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const evResult = useMemo(() => {
    return AluminumAirBatteryEngine.designElectricVehicleBatteryPack(
      evPackEnergyKwh,
      selectedInhibitor
    );
  }, [evPackEnergyKwh, selectedInhibitor]);

  // Polarization Curve Points (20 to 250 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 20; j <= 240; j += 20) {
      const cond: AlAirOperatingConditions = { ...operatingConditions, currentDensityMaPerCm2: j };
      const res = AluminumAirBatteryEngine.calculateElectrochemicalPerformance(cond);
      points.push({
        currentDensity: j,
        vCell: res.operatingCellVoltageV,
        powerDensity: res.powerDensityMwPerCm2
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: AlAirTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedInhibitor('PEG_ORGANIC_SURFACTANT');
    setTemperatureC(35.0);
    setCurrentDensityMaCm2(80.0);
    setKohConcentrationM(5.5);
    setAluminateConcM(2.2);
    setFlowVelocityCmS(8.0);
    setHasSeedCrystallizer(true);
    setEvPackEnergyKwh(100.0);
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
                  Primary Metal-Air Battery • Phinergy EV Benchmarks
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-full">
                  IUPAC & Bayer Kinetics
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Pin Nhôm - Không Khí (Al-Air) & Công Nghệ Tái Sinh Cơ Học
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Mô phỏng động học quá thế ăn mòn kiềm ký sinh của nhôm, ức chế thoát khí hydro bằng màng khuếch tán Stannate/Zincate/PEG, kết tinh tuần hoàn Al(OH)₃ Bayer và thiết kế gói pin EV 100 kWh tầm hoạt động 1,500 km.
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
          onClick={() => handleModeChange('ALKALINE_CORROSION_AND_INHIBITORS')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'ALKALINE_CORROSION_AND_INHIBITORS'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>1. Ăn Mòn Kiềm & Màng Ức Chế H₂</span>
        </button>

        <button
          onClick={() => handleModeChange('BAYER_CRYSTALLIZER_AND_RECYCLING')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'BAYER_CRYSTALLIZER_AND_RECYCLING'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>2. Bình Kết Tinh Bayer & Tái Sinh KOH</span>
        </button>

        <button
          onClick={() => handleModeChange('EV_ULTRA_LONG_RANGE_PACK')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'EV_ULTRA_LONG_RANGE_PACK'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>3. Gói Pin EV Tầm Xa 1,500 km</span>
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
              {operatingConditions.currentDensityMaPerCm2} mA/cm²
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'EV_ULTRA_LONG_RANGE_PACK' ? (
            <div className="flex flex-col gap-4">
              {/* Inhibitor Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Chất Ức Chế Ăn Mòn Anode Nhôm:</span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {currentInhibitor.chemicalFormula}
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(AL_AIR_INHIBITORS) as AlAirInhibitorType[]).map((inhId) => {
                    const spec = AL_AIR_INHIBITORS[inhId];
                    const isSelected = selectedInhibitor === inhId;
                    return (
                      <button
                        key={inhId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedInhibitor(inhId);
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
                            inhId === 'UNINHIBITED_RAW_AL'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}>
                            {spec.corrosionInhibitionEfficiencyPercent}% ức chế
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
                  <span>Mật Độ Dòng Xả (Discharge Current Density):</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentDensityMaCm2} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>20 mA/cm² (Tải nhẹ)</span>
                  <span>100 mA/cm² (Tối ưu)</span>
                  <span>250 mA/cm² (Công suất cao)</span>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Vận Hành Khối Pin:</span>
                  <span className="font-mono text-cyan-400 font-bold">{temperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  step="1"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>20°C (Phòng)</span>
                  <span>35°C (Ổn định)</span>
                  <span>65°C (Ăn mòn nhiệt cao)</span>
                </div>
              </div>

              {/* KOH Concentration */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nồng Độ Kiềm Điện Phân (KOH Molarity):</span>
                  <span className="font-mono text-cyan-400 font-bold">{kohConcentrationM.toFixed(1)} M</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="7.0"
                  step="0.1"
                  value={kohConcentrationM}
                  onChange={(e) => setKohConcentrationM(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>4.0 M</span>
                  <span>5.5 M (Dẫn điện cực đại)</span>
                  <span>7.0 M</span>
                </div>
              </div>

              {/* Aluminate Concentration (for mode 2) */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nồng Độ Aluminate Hòa Tan [Al(OH)₄⁻]:</span>
                  <span className="font-mono text-cyan-400 font-bold">{aluminateConcM.toFixed(1)} M</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.5"
                  step="0.1"
                  value={aluminateConcM}
                  onChange={(e) => setAluminateConcM(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.5 M (Dung dịch mới)</span>
                  <span>2.2 M (Bão hòa)</span>
                  <span>4.5 M (Nguy cơ đông keo)</span>
                </div>
              </div>

              {/* Flow Velocity & Seed Crystallizer Toggle */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Vận Tốc Bơm Điện Phân:</span>
                  <span className="text-xs font-mono text-cyan-400">{flowVelocityCmS.toFixed(1)} cm/s</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={flowVelocityCmS}
                  onChange={(e) => setFlowVelocityCmS(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Bộ Mầm Kết Tinh Bayer:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setHasSeedCrystallizer(!hasSeedCrystallizer);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      hasSeedCrystallizer
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {hasSeedCrystallizer ? 'Đang Bật (95% Kết Tinh)' : 'Tắt (Nguy cơ tắc keo)'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 3 EV Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Dung Lượng Năng Lượng Gói Pin EV:</span>
                  <span className="font-mono text-amber-400 font-bold">{evPackEnergyKwh} kWh</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="200"
                  step="5"
                  value={evPackEnergyKwh}
                  onChange={(e) => setEvPackEnergyKwh(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>30 kWh (Đô thị)</span>
                  <span>100 kWh (Phinergy EV)</span>
                  <span>200 kWh (Xe tải nặng)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Mật Độ Năng Lượng Vượt Trội
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhôm kim loại sở hữu mật độ năng lượng lý thuyết <strong className="text-white">8,100 Wh/kg</strong> (gấp gần 30 lần so với pin Lithium-ion hiện hành ~300 Wh/kg). Khi kết hợp nạp cơ học (mechanical refuel) thay thế tấm cực nhôm chỉ mất 3 phút, xe điện có thể chạy hơn 1,500 km không cần dừng chờ sạc trạm.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visualization Graphics & Detailed Analytics (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Top Performance Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Điện Thế Tế Bào (V_cell)</span>
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {electroResult.operatingCellVoltageV.toFixed(3)} <span className="text-xs text-slate-400">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                OCV hỗn hợp: {electroResult.openCircuitVoltageV.toFixed(2)} V
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Mật Độ Công Suất</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {electroResult.powerDensityMwPerCm2} <span className="text-xs text-slate-400">mW/cm²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Tổng quá thế: {(electroResult.overpotentials.totalV * 1000).toFixed(0)} mV
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Hiệu Suất Faradaic Anode</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {electroResult.parasiticCorrosionMetrics.anodeFaradaicEfficiencyPercent.toFixed(1)} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Tự phóng điện: {electroResult.parasiticCorrosionMetrics.openCircuitShelfLifeLossPercentPerDay}%/ngày
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Khí Hydro Ký Sinh (H₂)</span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-300 mt-1">
                {electroResult.parasiticCorrosionMetrics.hydrogenGasEvolutionRateMlPerMinPerCell.toFixed(2)} <span className="text-xs text-slate-400">ml/min</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Dòng ăn mòn: {electroResult.parasiticCorrosionMetrics.corrosionCurrentDensityMaPerCm2} mA/cm²
              </div>
            </div>
          </div>

          {/* TAB 1: Alkaline Corrosion Suppression & Inhibitor Adlayer */}
          {activeMode === 'ALKALINE_CORROSION_AND_INHIBITORS' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    Mô Hình Cắt Lớp Tế Bào Điện Phân & Cơ Chế Ức Chế Ăn Mòn Hydro
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 rounded-lg">
                  {currentInhibitor.nameVi.split('(')[0]}
                </span>
              </div>

              {/* Schematic SVG: Cross-section of Aluminum-Air Battery */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 280" className="w-full h-auto">
                  <defs>
                    <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="electrolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#083344" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0e7490" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="airCathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <pattern id="bubblePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="2" fill="#fda4af" opacity="0.6" />
                      <circle cx="15" cy="14" r="1.5" fill="#f43f5e" opacity="0.4" />
                    </pattern>
                  </defs>

                  {/* Left: Aluminum Anode Cassette */}
                  <rect x="40" y="30" width="120" height="220" rx="8" fill="url(#anodeGrad)" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="100" y="60" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="13">
                    ANODE NHÔM (Al)
                  </text>
                  <text x="100" y="80" textAnchor="middle" fill="#1e293b" fontSize="10" fontFamily="monospace">
                    Al ➔ Al³⁺ + 3e⁻
                  </text>
                  <text x="100" y="100" textAnchor="middle" fill="#334155" fontSize="9">
                    E⁰ = -2.31 V
                  </text>

                  {/* Protective Inhibitor Film Layer */}
                  <rect
                    x="152"
                    y="32"
                    width="14"
                    height="216"
                    rx="2"
                    fill={selectedInhibitor === 'UNINHIBITED_RAW_AL' ? '#e11d48' : '#06b6d4'}
                    opacity={selectedInhibitor === 'UNINHIBITED_RAW_AL' ? '0.3' : '0.9'}
                  />
                  <text
                    x="159"
                    y="140"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8"
                    fontWeight="bold"
                    transform="rotate(-90 159 140)"
                  >
                    {selectedInhibitor === 'UNINHIBITED_RAW_AL' ? 'TẠP CHẤT VI PIN (Fe/Si)' : 'MÀNG BẢO VỆ CHỐNG H₂'}
                  </text>

                  {/* Middle: Circulating Alkaline Electrolyte KOH */}
                  <rect x="175" y="30" width="370" height="220" rx="4" fill="url(#electrolyteGrad)" stroke="#164e63" strokeWidth="1.5" />
                  
                  {/* Electrolyte Flow Stream Lines */}
                  <path d="M 200 60 Q 360 80 520 60" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
                  <path d="M 200 140 Q 360 160 520 140" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
                  <path d="M 200 220 Q 360 240 520 220" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />

                  {/* Parasitic H2 Bubbles if uninhibited or low inhibition */}
                  {selectedInhibitor === 'UNINHIBITED_RAW_AL' ? (
                    <g>
                      <circle cx="190" cy="70" r="6" fill="#f43f5e" opacity="0.8" />
                      <circle cx="210" cy="95" r="9" fill="#f43f5e" opacity="0.7" />
                      <circle cx="195" cy="130" r="7" fill="#f43f5e" opacity="0.8" />
                      <circle cx="225" cy="160" r="11" fill="#f43f5e" opacity="0.9" />
                      <circle cx="200" cy="200" r="8" fill="#f43f5e" opacity="0.75" />
                      <text x="250" y="110" fill="#fca5a5" fontSize="11" fontWeight="bold">
                        Ăn mòn tự do: 73+ ml/min H₂ ↑
                      </text>
                      <text x="250" y="128" fill="#fda4af" fontSize="9">
                        2Al + 6H₂O + 2OH⁻ ➔ 2Al(OH)₄⁻ + 3H₂↑
                      </text>
                    </g>
                  ) : (
                    <g>
                      <circle cx="180" cy="120" r="3" fill="#38bdf8" opacity="0.7" />
                      <circle cx="185" cy="180" r="2.5" fill="#38bdf8" opacity="0.6" />
                      <text x="260" y="110" fill="#a5f3fc" fontSize="11" fontWeight="bold">
                        Đã Ức Chế Ăn Mòn: &lt;4.5 ml/min H₂
                      </text>
                      <text x="260" y="128" fill="#67e8f9" fontSize="9">
                        Quá thế thoát H₂ tăng +{currentInhibitor.herOverpotentialShiftMv} mV
                      </text>
                    </g>
                  )}

                  {/* Electrolyte label */}
                  <text x="360" y="52" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">
                    Dung Dịch Điện Phân KOH ({kohConcentrationM} M) + Aluminate ({aluminateConcM} M)
                  </text>
                  <text x="360" y="240" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    Dòng chảy đối lưu: v = {flowVelocityCmS} cm/s
                  </text>

                  {/* Right: Gas Diffusion Air Cathode (ORR) */}
                  <rect x="555" y="30" width="110" height="220" rx="8" fill="url(#airCathodeGrad)" stroke="#475569" strokeWidth="2" />
                  <text x="610" y="60" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                    CATHODE KHÔNG KHÍ
                  </text>
                  <text x="610" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    O₂ + 2H₂O + 4e⁻ ➔ 4OH⁻
                  </text>
                  <text x="610" y="96" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                    E⁰ = +0.40 V (Ag/Co₃O₄)
                  </text>

                  {/* Atmospheric Air Ingestion Vents */}
                  <path d="M 675 60 L 730 60" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <path d="M 675 120 L 730 120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <path d="M 675 180 L 730 180" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                  <text x="705" y="45" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">
                    O₂ Khí Quyển
                  </text>
                  <text x="705" y="210" textAnchor="middle" fill="#64748b" fontSize="8">
                    Hút thụ động / Quạt
                  </text>

                  {/* Top External Circuit */}
                  <path d="M 100 30 L 100 12 L 610 12 L 610 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <circle cx="355" cy="12" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="355" y="16" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    e⁻
                  </text>
                </svg>
              </div>

              {/* Inhibitor Mechanism Card */}
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Cơ Chế Phản Ứng: {currentInhibitor.nameVi}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentInhibitor.primaryMechanismVi}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400">Độ dịch quá thế H₂:</span>{' '}
                    <span className="font-mono font-bold text-cyan-400">+{currentInhibitor.herOverpotentialShiftMv} mV</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Độ ức chế ăn mòn:</span>{' '}
                    <span className="font-mono font-bold text-emerald-400">{currentInhibitor.corrosionInhibitionEfficiencyPercent}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Hiệu dụng Faradaic:</span>{' '}
                    <span className="font-mono font-bold text-blue-400">{currentInhibitor.anodeFaradaicUtilizationPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Overpotential Breakdown Chart */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Phân Phối Tổn Thất Quá Thế Điện Hóa (Total Overpotential: {(electroResult.overpotentials.totalV * 1000).toFixed(0)} mV)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Hoạt hóa Anode Al:</span>
                    <div className="font-mono font-bold text-amber-400">
                      {(electroResult.overpotentials.anodeActivationV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Hoạt hóa Cathode ORR:</span>
                    <div className="font-mono font-bold text-blue-400">
                      {(electroResult.overpotentials.cathodeAirReductionActivationV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Ohmic Dung Dịch:</span>
                    <div className="font-mono font-bold text-rose-400">
                      {(electroResult.overpotentials.ohmicElectrolyteAndSeparatorV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Nồng độ Aluminate:</span>
                    <div className="font-mono font-bold text-purple-400">
                      {(electroResult.overpotentials.concentrationAluminateDiffusionV * 1000).toFixed(0)} mV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Bayer Seed Crystallizer & KOH Closed-Loop Regeneration */}
          {activeMode === 'BAYER_CRYSTALLIZER_AND_RECYCLING' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Vòng Tuần Hoàn Bayer & Kết Tinh Al(OH)₃ (Gibbsite) Tái Sinh Kiềm
                  </h3>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  electroResult.crystallizerState.gelationRisk === 'GELATION_CLOGGING_RISK'
                    ? 'bg-rose-950 text-rose-400 border-rose-800'
                    : electroResult.crystallizerState.gelationRisk === 'SATURATED_CRYSTALLIZING'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}>
                  {electroResult.crystallizerState.gelationRisk === 'GELATION_CLOGGING_RISK'
                    ? 'NGUY CƠ ĐÔNG KEO TẮC MẠNG'
                    : electroResult.crystallizerState.gelationRisk === 'SATURATED_CRYSTALLIZING'
                    ? 'KẾT TINH BẢO HÒA ỔN ĐỊNH'
                    : 'DUNG DỊCH DẪN AN TOÀN'}
                </div>
              </div>

              {/* Chemical Equations of Bayer Closed-Loop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    1. Phản Ứng Tại Tế Bào (Anode Hòa Tan)
                  </span>
                  <div className="text-sm font-mono text-cyan-300 font-bold mt-2">
                    Al + 4OH⁻ ➔ Al(OH)₄⁻ + 3e⁻
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Nhôm bị oxy hóa trong kiềm, tiêu thụ 4 ion OH⁻ để tạo phức ion aluminate hòa tan [Al(OH)₄]⁻.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    2. Phản Ứng Kết Tinh Bayer (Bình Lắng Mầm)
                  </span>
                  <div className="text-sm font-mono text-emerald-300 font-bold mt-2">
                    Al(OH)₄⁻ ➔ Al(OH)₃↓ + OH⁻
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Hạt mầm gibbsite kích thích phân hủy aluminate, giải phóng ion OH⁻ tinh khiết quay lại cell pin!
                  </p>
                </div>
              </div>

              {/* Crystallizer Metrics Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Tỷ Lệ Quá Bão Hòa (S):</span>
                  <div className="text-lg font-bold font-mono text-amber-300 mt-1">
                    {electroResult.crystallizerState.aluminateSupersaturationRatio.toFixed(2)}x
                  </div>
                  <span className="text-[10px] text-slate-500">Giới hạn bền: 1.0 - 2.2x</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Tốc Độ Kết Tủa Al(OH)₃:</span>
                  <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
                    {electroResult.crystallizerState.alOh3PrecipitationRateGPerHour} <span className="text-xs text-slate-400">g/h</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Hiệu suất mầm: {hasSeedCrystallizer ? '95%' : '20%'}</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">KOH Tái Sinh Tự Động:</span>
                  <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                    {electroResult.crystallizerState.freeKohRegeneratedMolesPerHour} <span className="text-xs text-slate-400">mol/h</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Bảo toàn nồng độ kiềm</span>
                </div>
              </div>

              {/* Schematic Workflow Banner */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <div className="text-xs font-semibold text-slate-300 mb-2">Quy Trình Tái Chế Nhôm Đóng Kín 100%:</div>
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                  <span className="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-200">
                    Cực Nhôm Anode Mới
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
                  <span className="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300">
                    Hòa Tan Sinh Điện
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
                  <span className="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                    Kết Tinh Al(OH)₃
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
                  <span className="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-amber-300">
                    Luyện Nhôm Tái Sinh (98%)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Electric Vehicle Pack Benchmark (>1,500 km) */}
          {activeMode === 'EV_ULTRA_LONG_RANGE_PACK' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Gói Pin Ô Tô Điện Tầm Siêu Xa 100 kWh vs Pin Lithium-Ion Hiện Hành
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 rounded-lg font-mono">
                  {evResult.totalUsableEnergyKwh} kWh Pack
                </span>
              </div>

              {/* Range & Weight Comparison Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-xl border border-amber-800/60">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Tầm Hoạt Động Xe (1 Lần Nạp)
                  </span>
                  <div className="text-2xl font-black font-mono text-white mt-1">
                    {evResult.vehicleRangeKm} <span className="text-sm font-normal text-amber-300">km</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tiêu thụ: ~14 kWh / 100 km (Xe sedan điện chuẩn)
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Tiết Kiệm Khối Lượng Pin
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
                    -{evResult.weightSavingsPercent}% <span className="text-sm font-normal text-slate-400">khối lượng</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Al-Air: <strong className="text-white">{evResult.totalBatterySystemWeightKg} kg</strong> vs Li-ion: <span className="line-through">{evResult.equivalentLiIonBatteryWeightKg} kg</span>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Thời Gian Nạp Cơ Học
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {evResult.mechanicalRefuelTimeMinutes} <span className="text-sm font-normal text-slate-400">phút</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Thay hộp cassette nhôm tự động tại trạm dịch vụ
                  </p>
                </div>
              </div>

              {/* Detailed Mass Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Hạng Mục Linh Kiện</th>
                      <th className="py-2 px-3 text-right">Khối Lượng Pin Al-Air</th>
                      <th className="py-2 px-3 text-right">Pin Li-Ion Tương Đương</th>
                      <th className="py-2 px-3 text-right">Ý Nghĩa Kỹ Thuật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Vật liệu hoạt tính Anode</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">{evResult.aluminumAnodePlateWeightKg} kg (Al)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">185.0 kg (Graphite + Cu)</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Mật độ Al 2,980 Ah/kg</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Vật liệu Cathode</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">22.0 kg (Màng khí GDE)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">210.0 kg (NMC/LFP + Al)</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Sử dụng O₂ từ khí quyển</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Dung dịch điện phân & Vỏ</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">30.0 kg (KOH + Bơm)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">160.6 kg (Dung môi + Vỏ thép)</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Dung dịch nước an toàn cháy nổ</td>
                    </tr>
                    <tr className="bg-slate-950 font-bold">
                      <td className="py-2.5 px-3 text-white">TỔNG KHỐI LƯỢNG GÓI PIN</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 text-sm">{evResult.totalBatterySystemWeightKg} kg</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400 text-sm">{evResult.equivalentLiIonBatteryWeightKg} kg</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">Nhẹ hơn {evResult.weightSavingsPercent}%!</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Environmental Carbon & Byproduct Recycling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    Thu Hồi Sản Phẩm Al(OH)₃ Tinh Khiết
                  </div>
                  <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                    {evResult.alOh3ByproductCollectedKg} <span className="text-xs text-slate-400">kg Al(OH)₃</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tái chế đạt {evResult.recycledAluminumEfficiencyPercent}% thành nhôm nguyên chất trong lò luyện nhôm sạch.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    Cắt Giảm Khí Thải CO₂ Giao Thông
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                    {evResult.avoidedTailpipeCo2TonsPerYear} <span className="text-xs text-slate-400">tấn CO₂/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    So với xe chạy xăng tương đương (150 g CO₂/km, 20,000 km/năm).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
