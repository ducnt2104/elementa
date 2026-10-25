// src/components/visualizations/ThermallyRegenerativeElectrochemicalCycleVisualizer.tsx
// Interactive Visualizer: Thermally Regenerative Electrochemical Cycle (TREC) for Industrial Waste Heat Harvesting (<100°C)
// Standards: IUPAC Electrochemistry, Temperature Coefficient of Potential (dE/dT), Carnot Efficiency & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Flame,
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
  Zap,
  Wind,
  Factory,
  RefreshCw,
  Thermometer,
  Layers2,
  Cpu,
  Coins
} from 'lucide-react';
import {
  TREC_COUPLE_SPECS,
  TrecCoupleType,
  ThermallyRegenerativeElectrochemicalCycleEngine,
  TrecOperatingConditions
} from '../../domain/thermallyRegenerativeElectrochemicalCycleEngine';
import { sound } from '../../audio/soundEngine';

type TrecTabMode =
  | 'FOUR_STAGE_THERMODYNAMIC_CYCLE'
  | 'PRUSSIAN_BLUE_INTERCALATION'
  | 'INDUSTRIAL_WASTE_HEAT_PLANT';

export const ThermallyRegenerativeElectrochemicalCycleVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TrecTabMode>('FOUR_STAGE_THERMODYNAMIC_CYCLE');

  // Interactive controls
  const [selectedCouple, setSelectedCouple] = useState<TrecCoupleType>('KNiHCF_AG_AGCL');
  const [tempHighC, setTempHighC] = useState<number>(60.0); // 50 to 90 °C
  const [tempLowC, setTempLowC] = useState<number>(20.0); // 15 to 35 °C
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(4.0); // 2 to 20 mA/cm2
  const [activeMassG, setActiveMassG] = useState<number>(50.0); // 10 to 150 g
  const [heatExchangerEff, setHeatExchangerEff] = useState<number>(75.0); // 40 to 90 %

  // Industrial Plant Sizing
  const [wasteHeatKwTh, setWasteHeatKwTh] = useState<number>(100.0); // 20 to 1,000 kW_th

  const currentCouple = TREC_COUPLE_SPECS[selectedCouple];

  // Engine Computations
  const operatingConditions: TrecOperatingConditions = useMemo(() => ({
    coupleType: selectedCouple,
    tempHighC,
    tempLowC,
    chargeCurrentDensityMaCm2: currentDensityMaCm2,
    dischargeCurrentDensityMaCm2: currentDensityMaCm2,
    activeMassGramPerCell: activeMassG,
    heatExchangerEffectivenessPercent: heatExchangerEff
  }), [selectedCouple, tempHighC, tempLowC, currentDensityMaCm2, activeMassG, heatExchangerEff]);

  const cycleResult = useMemo(() => {
    return ThermallyRegenerativeElectrochemicalCycleEngine.calculateCycleThermodynamics(operatingConditions);
  }, [operatingConditions]);

  const plantResult = useMemo(() => {
    return ThermallyRegenerativeElectrochemicalCycleEngine.designIndustrialHarvestingPlant(
      wasteHeatKwTh,
      operatingConditions
    );
  }, [wasteHeatKwTh, operatingConditions]);

  const handleModeChange = (mode: TrecTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleResetDefaults = () => {
    sound.playUiClick();
    setSelectedCouple('KNiHCF_AG_AGCL');
    setTempHighC(60.0);
    setTempLowC(20.0);
    setCurrentDensityMaCm2(4.0);
    setActiveMassG(50.0);
    setHeatExchangerEff(75.0);
    setWasteHeatKwTh(100.0);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-rose-600/30 rounded-xl border border-amber-500/30 text-amber-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800 rounded-full">
                  Thermally Regenerative Electrochemical Cycle (TREC)
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-full">
                  Carnot Waste Heat Harvesting (&lt;100°C)
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                Chu Trình Điện Hóa Tái Sinh Nhiệt (TREC) Thu Hồi Nhiệt Thải Công Nghiệp
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Khai thác hệ số nhiệt điện thế α = dE/dT từ biến thiên entropi xen phủ ion K⁺/Na⁺ trong cấu trúc khung mở Prussian Blue (KNiHCF/CuHCF), biến đổi trực tiếp nhiệt thải công nghiệp thấp nhiệt (&lt;100°C) thành điện năng sạch.
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
          onClick={() => handleModeChange('FOUR_STAGE_THERMODYNAMIC_CYCLE')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'FOUR_STAGE_THERMODYNAMIC_CYCLE'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>1. Chu Trình Nhiệt Động 4 Giai Đoạn</span>
        </button>

        <button
          onClick={() => handleModeChange('PRUSSIAN_BLUE_INTERCALATION')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'PRUSSIAN_BLUE_INTERCALATION'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers2 className="w-4 h-4" />
          <span>2. Tinh Thể Khung Mở Prussian Blue</span>
        </button>

        <button
          onClick={() => handleModeChange('INDUSTRIAL_WASTE_HEAT_PLANT')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeMode === 'INDUSTRIAL_WASTE_HEAT_PLANT'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>3. Trạm Thu Hồi Nhiệt Thải 100 kW_th</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Visualizer Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Thông Số Vận Hành Chu Trình
            </span>
            <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-400 rounded-md border border-amber-800 font-mono">
              ΔT = {cycleResult.deltaTemperatureK} K
            </span>
          </div>

          {/* Mode 1 & 2 Controls */}
          {activeMode !== 'INDUSTRIAL_WASTE_HEAT_PLANT' ? (
            <div className="flex flex-col gap-4">
              {/* Couple Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span>Hệ Cặp Điện Cực Tái Sinh Nhiệt (TREC Couple):</span>
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    α = {currentCouple.tempCoefficientMvPerK} mV/K
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(TREC_COUPLE_SPECS) as TrecCoupleType[]).map((coupleId) => {
                    const spec = TREC_COUPLE_SPECS[coupleId];
                    const isSelected = selectedCouple === coupleId;
                    return (
                      <button
                        key={coupleId}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedCouple(coupleId);
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-950/80 border-amber-500/80 text-white shadow-md shadow-amber-900/20'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className={isSelected ? 'text-amber-300' : 'text-slate-300'}>
                            {spec.nameVi}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-amber-950 text-amber-400 border border-amber-800">
                            {spec.tempCoefficientMvPerK} mV/K
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* High Temperature T_H */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Nguồn Nhiệt Thải (T_H):</span>
                  <span className="font-mono text-rose-400 font-bold">{tempHighC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="1"
                  value={tempHighC}
                  onChange={(e) => setTempHighC(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>50°C (Nhiệt làm mát máy chủ)</span>
                  <span>70°C (Nước thải dệt nhuộm)</span>
                  <span>90°C (Hơi áp thấp)</span>
                </div>
              </div>

              {/* Low Temperature T_L */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Nhiệt Độ Bồn Thu Nhiệt Môi Trường (T_L):</span>
                  <span className="font-mono text-cyan-400 font-bold">{tempLowC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="35"
                  step="1"
                  value={tempLowC}
                  onChange={(e) => setTempLowC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>15°C (Nước sông/suối ngầm)</span>
                  <span>25°C (Nhiệt độ phòng)</span>
                  <span>35°C (Mùa hè nhiệt đới)</span>
                </div>
              </div>

              {/* Current Density */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Mật Độ Dòng Chu Trình (Current Density):</span>
                  <span className="font-mono text-amber-400 font-bold">{currentDensityMaCm2.toFixed(1)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>2 mA/cm² (Tổn thất Ohmic thấp)</span>
                  <span>10 mA/cm²</span>
                  <span>20 mA/cm² (Công suất đỉnh)</span>
                </div>
              </div>

              {/* Heat Exchanger Effectiveness */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Hiệu Suất Trao Đổi Hồi Nhiệt (Heat Exchanger):</span>
                  <span className="font-mono text-emerald-400 font-bold">{heatExchangerEff.toFixed(0)} %</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  step="5"
                  value={heatExchangerEff}
                  onChange={(e) => setHeatExchangerEff(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>40% (Không tối ưu)</span>
                  <span>75% (Tiêu chuẩn công nghiệp)</span>
                  <span>90% (Hồi nhiệt vi kênh cao cấp)</span>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 3 Industrial Plant Controls */
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                  <span>Công Suất Nhiệt Thải Đầu Vào (Waste Heat Source):</span>
                  <span className="font-mono text-rose-400 font-bold">{wasteHeatKwTh} kW_th</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="20"
                  value={wasteHeatKwTh}
                  onChange={(e) => setWasteHeatKwTh(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>20 kW_th (Cụm máy tính)</span>
                  <span>100 kW_th (Tòa nhà Data Center)</span>
                  <span>1,000 kW_th (Nhà máy hóa chất)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  Hiệu Quả Kinh Tế & Thu Hồi Vốn
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  TREC sử dụng nguyên liệu muối sắt/đồng Prussian Blue dồi dào trên vỏ Trái Đất, hoạt động trong dung dịch nước không áp suất (&lt;100°C), không có bộ phận cơ khí chuyển động nhanh, đem lại thời gian hoàn vốn ấn tượng chỉ <strong className="text-emerald-400 font-mono">{plantResult.simplePaybackPeriodYears} năm</strong> với chi phí điện quy dẫn LCOE cực thấp <strong className="text-cyan-300 font-mono">${plantResult.levelizedCostOfElectricityDollarPerKwh}/kWh</strong>.
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
                <span>Chênh Áp Điện Chu Trình (ΔV)</span>
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                {(cycleResult.deltaVoltageV * 1000).toFixed(1)} <span className="text-xs text-slate-400">mV</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                V_dis: {cycleResult.voltageHighTempV.toFixed(3)} V
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Hiệu Suất Nhiệt (η_th)</span>
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                {cycleResult.efficiencies.thermalEfficiencyPercent.toFixed(2)} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Giới hạn Carnot: {cycleResult.efficiencies.carnotEfficiencyPercent.toFixed(1)}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Tỷ Lệ Carnot Tương Đối</span>
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                {cycleResult.efficiencies.relativeCarnotEfficiencyPercent.toFixed(1)} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Chu trình nhiệt động học cao
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Công Suất Điện Thu Hồi</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {plantResult.netElectricPowerOutputKwE.toFixed(2)} <span className="text-xs text-slate-400">kW_e</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Từ {wasteHeatKwTh} kW_th nhiệt thải
              </div>
            </div>
          </div>

          {/* TAB 1: 4-Stage Thermodynamic Cycle & V-Q Diagram */}
          {activeMode === 'FOUR_STAGE_THERMODYNAMIC_CYCLE' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Đồ Thị V-Q & Chu Trình Khép Kín 4 Bước Thu Nhận Công Điện
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 rounded-lg">
                  W_net = ∮ V dq = {cycleResult.netWorkOutputJoules} J / cell
                </span>
              </div>

              {/* Dynamic SVG: V-Q Thermodynamic Loop Diagram */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden">
                <svg viewBox="0 0 760 260" className="w-full h-auto">
                  <defs>
                    <linearGradient id="workAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Axes */}
                  <line x1="80" y1="210" x2="700" y2="210" stroke="#475569" strokeWidth="1.5" />
                  <line x1="80" y1="30" x2="80" y2="210" stroke="#475569" strokeWidth="1.5" />
                  <text x="700" y="235" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    Điện Lượng Q (Coulombs) ➔
                  </text>
                  <text x="35" y="40" textAnchor="start" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    Điện Thế V (V) ↑
                  </text>

                  {/* Coordinates for V-Q Loop */}
                  {/* Point 1: Start of High Temp Discharge (Q=0, V_dis_high) */}
                  {/* Point 2: End of High Temp Discharge (Q=Q_max, V_dis_high - slope) */}
                  {/* Point 3: After Cooling (Q=Q_max, V_chg_low + slope) */}
                  {/* Point 4: Start of Charge at Low Temp (Q=0, V_chg_low) */}
                  <polygon
                    points="140,75 620,95 620,165 140,145"
                    fill="url(#workAreaGrad)"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  {/* Top Curve: High Temperature Discharge at T_H */}
                  <line x1="140" y1="75" x2="620" y2="95" stroke="#ef4444" strokeWidth="3" />
                  <text x="380" y="65" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                    Bước 1: Xả ở T_H ({tempHighC}°C) ➔ Phát Điện (V = {cycleResult.voltageHighTempV.toFixed(3)} V)
                  </text>

                  {/* Right Edge: Isochoric / Regenerative Cooling T_H -> T_L */}
                  <line x1="620" y1="95" x2="620" y2="165" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5,4" />
                  <text x="635" y="135" textAnchor="start" fill="#7dd3fc" fontSize="10">
                    Bước 2: Hồi nhiệt làm mát ({tempHighC}°C ➔ {tempLowC}°C)
                  </text>

                  {/* Bottom Curve: Low Temperature Charge at T_L */}
                  <line x1="620" y1="165" x2="140" y2="145" stroke="#3b82f6" strokeWidth="3" />
                  <text x="380" y="185" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">
                    Bước 3: Nạp lại ở T_L ({tempLowC}°C) tiêu thụ ít công hơn (V = {cycleResult.voltageLowTempV.toFixed(3)} V)
                  </text>

                  {/* Left Edge: Regenerative Reheating T_L -> T_H */}
                  <line x1="140" y1="145" x2="140" y2="75" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,4" />
                  <text x="125" y="115" textAnchor="end" fill="#fcd34d" fontSize="10">
                    Bước 4: Gia nhiệt ({tempLowC}°C ➔ {tempHighC}°C)
                  </text>

                  {/* Center Label for Enclosed Work Area */}
                  <circle cx="380" cy="120" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="380" y="124" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    W_net
                  </text>
                  <text x="380" y="145" textAnchor="middle" fill="#fef08a" fontSize="9">
                    +{cycleResult.netWorkOutputJoules} J/chu kỳ
                  </text>
                </svg>
              </div>

              {/* 4-Step Description Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                    <Flame className="w-4 h-4" />
                    Giai Đoạn 1: Xả Nhiệt Độ Cao (T_H = {tempHighC}°C)
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Hấp thụ nhiệt thải công nghiệp Q_H, thế tế bào giảm theo hệ số nhiệt dE/dT &lt; 0. Xả phát điện công suất lớn.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                    <Droplets className="w-4 h-4" />
                    Giai Đoạn 2: Hồi Lưu Làm Mát (T_H ➔ T_L)
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Bộ trao đổi nhiệt vi kênh dòng ngược ({heatExchangerEff}% hồi nhiệt) làm nguội tế bào về {tempLowC}°C mà tổn thất nhiệt tối thiểu.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <Zap className="w-4 h-4" />
                    Giai Đoạn 3: Nạp Nhiệt Độ Thấp (T_L = {tempLowC}°C)
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tại nhiệt độ thấp, điện áp cần thiết để nạp lại pin thấp hơn thế xả ban đầu, tạo ra thặng dư công điện thuần W_net &gt; 0!
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <RefreshCw className="w-4 h-4" />
                    Giai Đoạn 4: Tái Gia Nhiệt (T_L ➔ T_H)
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Nhiệt thải đưa tế bào trở lại {tempHighC}°C khép kín chu trình Carnot vi mô hoàn toàn tự động.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Prussian Blue Intercalation Crystal & Entropy */}
          {activeMode === 'PRUSSIAN_BLUE_INTERCALATION' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    Cấu Trúc Tinh Thể Khung Mở & Biến Thiên Entropi Solvat Hóa
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-blue-950/80 border border-blue-800 text-blue-300 rounded-lg">
                  ΔS_rxn = {currentCouple.reversibleEntropyJPerMolK} J/(mol·K)
                </span>
              </div>

              {/* Crystal Framework SVG */}
              <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800/90">
                <svg viewBox="0 0 760 220" className="w-full h-auto">
                  {/* Prussian Blue Interstitial Cubic Lattice */}
                  <g transform="translate(100, 30)">
                    {/* Metal framework nodes: Fe, Ni/Cu linked by -C#N- ligands */}
                    <rect x="20" y="20" width="120" height="120" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    <rect x="60" y="50" width="120" height="120" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4,4" />
                    
                    {/* Corner connecting lines */}
                    <line x1="20" y1="20" x2="60" y2="50" stroke="#0284c7" strokeWidth="2" />
                    <line x1="140" y1="20" x2="180" y2="50" stroke="#0284c7" strokeWidth="2" />
                    <line x1="20" y1="140" x2="60" y2="170" stroke="#0284c7" strokeWidth="2" />
                    <line x1="140" y1="140" x2="180" y2="170" stroke="#0284c7" strokeWidth="2" />

                    {/* Nodes (Fe, Ni/Cu) */}
                    <circle cx="20" cy="20" r="7" fill="#f59e0b" />
                    <circle cx="140" cy="20" r="7" fill="#06b6d4" />
                    <circle cx="20" cy="140" r="7" fill="#06b6d4" />
                    <circle cx="140" cy="140" r="7" fill="#f59e0b" />

                    {/* Intercalated K+ ion in interstitial cage */}
                    <circle cx="90" cy="85" r="12" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                    <text x="90" y="89" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                      K⁺
                    </text>
                  </g>

                  {/* Text Explanations */}
                  <text x="360" y="55" fill="#f8fafc" fontSize="13" fontWeight="bold">
                    Khung Mở Kim Loại - Hữu Cơ Prussian Blue (PBA Lattice)
                  </text>
                  <text x="360" y="80" fill="#cbd5e1" fontSize="11">
                    • Kênh khuếch tán mở đường kính rộng (~3.2 Å) cho phép ion K⁺/Na⁺ xen phủ tự do.
                  </text>
                  <text x="360" y="105" fill="#cbd5e1" fontSize="11">
                    • Khi nhiệt độ tăng, các phân tử nước trong vỏ solvat hóa sắp xếp ngẫu nhiên hơn (ΔS &lt; 0).
                  </text>
                  <text x="360" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    • Phương trình IUPAC: dE/dT = ΔS_rxn / (n·F) = ({currentCouple.tempCoefficientMvPerK} mV/K).
                  </text>
                  <text x="360" y="155" fill="#94a3b8" fontSize="10">
                    Tuổi thọ vượt 10,000 chu trình do không biến dạng mạng tinh thể (Zero lattice strain).
                  </text>
                </svg>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  Cơ Chế Chi Tiết: {currentCouple.nameVi}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {currentCouple.mechanismVi}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Industrial Waste Heat Harvesting Plant (100 kW_th) */}
          {activeMode === 'INDUSTRIAL_WASTE_HEAT_PLANT' && (
            <div className="flex flex-col gap-5 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    Nhà Máy Thu Hồi Nhiệt Thải Công Nghiệp (Data Center / Nhà Máy Sản Xuất)
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg font-mono">
                  {plantResult.wasteHeatSourceKwTh} kW_th Đầu Vào
                </span>
              </div>

              {/* Plant Sizing Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-800/60">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Sản Lượng Điện Hàng Năm
                  </span>
                  <div className="text-2xl font-black font-mono text-white mt-1">
                    {plantResult.annualElectricityGeneratedMwh} <span className="text-sm font-normal text-emerald-300">MWh/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    8,000 giờ vận hành liên tục không phụ thuộc thời tiết
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-xl border border-cyan-800/60">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Thời Gian Hoàn Vốn Đầu Tư
                  </span>
                  <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                    {plantResult.simplePaybackPeriodYears} <span className="text-sm font-normal text-slate-400">năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    LCOE: <strong className="text-white">${plantResult.levelizedCostOfElectricityDollarPerKwh}/kWh</strong>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-950/40 to-slate-950 rounded-xl border border-rose-800/60">
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    Cắt Giảm Phát Thải CO₂
                  </span>
                  <div className="text-2xl font-black font-mono text-rose-300 mt-1">
                    {plantResult.avoidedGridCo2TonsPerYear} <span className="text-sm font-normal text-slate-400">tấn CO₂/năm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Thay thế điện lưới hóa thạch (0.55 kg CO₂/kWh)
                  </p>
                </div>
              </div>

              {/* Plant Technical Specs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Thông Số Kỹ Thuật Nhà Máy</th>
                      <th className="py-2 px-3 text-right">Giá Trị Tính Toán</th>
                      <th className="py-2 px-3 text-right">Ý Nghĩa Kỹ Thuật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Nguồn nhiệt thải đầu vào (Q_in)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400 font-bold">{plantResult.wasteHeatSourceKwTh} kW_th</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Nước làm mát 60°C - 80°C</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Công suất điện thuần liên tục (P_elec)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-400 font-bold">{plantResult.netElectricPowerOutputKwE} kW_e</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Không tiêu hao nhiên liệu</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Tổng số module tế bào TREC</td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-400 font-bold">{plantResult.totalCellsCount} tế bào</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Module hóa trong container</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-300">Hiệu suất Carnot đạt được (Relative)</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">{cycleResult.efficiencies.relativeCarnotEfficiencyPercent}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">Vượt xa Seebeck thông thường</td>
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
