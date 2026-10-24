// src/components/visualizations/BatteryIntercalationVisualizer.tsx
// Milestone 48: Lithium-Ion Battery Intercalation, Solid Electrolyte Interphase (SEI) & Nernst Degradation Visualizer
// Standards: Nobel Prize in Chemistry 2019 (John B. Goodenough, M. Stanley Whittingham, Akira Yoshino)
// Curriculum: Vietnam GDPT 2018 (Hóa học 12 Chuyên đề: Pin Li-ion & Năng lượng tái tạo; Dãy thế điện cực chuẩn E0(Li+/Li) = -3.04 V)

import React, { useState } from 'react';
import {
  BATTERY_CATALOG,
  simulateBatteryIntercalation,
  STANDARD_LI_REDUCTION_POTENTIAL_V,
} from '../../domain/batteryIntercalationEngine';
import { sound } from '../../audio/soundEngine';
import {
  Battery,
  BatteryCharging,
  Zap,
  Activity,
  Layers,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Shield,
  Award,
  Thermometer,
  RefreshCw,
  Cpu
} from 'lucide-react';

export interface BatteryIntercalationVisualizerProps {
  initialChemistryId?: string;
}

export const BatteryIntercalationVisualizer: React.FC<BatteryIntercalationVisualizerProps> = ({
  initialChemistryId,
}) => {
  const [selectedChemistryId, setSelectedChemistryId] = useState<string>(initialChemistryId || 'lfp_iron_phosphate');
  const [socPercent, setSocPercent] = useState<number>(75.0);
  const [cRate, setCRate] = useState<number>(1.0);
  const [temperature, setTemperature] = useState<number>(25.0);
  const [cycles, setCycles] = useState<number>(150);
  const [activeTab, setActiveTab] = useState<'intercalation_model' | 'voltage_discharge_profile' | 'sei_cycle_aging' | 'nobel_history_gdpt'>('intercalation_model');

  const simResult = simulateBatteryIntercalation(
    selectedChemistryId,
    socPercent,
    cRate,
    temperature,
    cycles
  );

  const handleChemistryChange = (id: string) => {
    setSelectedChemistryId(id);
    sound.playBatteryIntercalationZip();
  };

  const handleSocChange = (val: number) => {
    setSocPercent(val);
    sound.playBatteryIntercalationZip();
  };

  const handleTempChange = (val: number) => {
    setTemperature(val);
    if (val < 0 && cRate >= 2.0 && simResult.chemistry.anodeType !== 'LTO') {
      sound.playThermalRunawayWarningHum();
    }
  };

  const handleCRateChange = (val: number) => {
    setCRate(val);
    if (val >= 3.0 && temperature <= 5.0 && simResult.chemistry.anodeType !== 'LTO') {
      sound.playThermalRunawayWarningHum();
    } else {
      sound.playBatteryIntercalationZip();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & GDPT 2018 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <BatteryCharging className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Pin Lithium-Ion & Động Học Xen Phủ Điện Hóa
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono">
                Nobel Hóa Học 2019 • Hóa học 12 Chuyên đề
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Quá trình xen phủ Li⁺ (Intercalation), Màng thụ động liên pha SEI, Đường phóng điện OCV(SoC) & Nguy cơ kết tinh nhánh cây Dendrite.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          {simResult.lithiumPlatingRiskVI === 'CRITICAL_DENDRITE_HAZARD' ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          ) : (
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          )}
          <span
            className={`text-xs font-semibold uppercase tracking-wider font-mono ${
              simResult.lithiumPlatingRiskVI === 'CRITICAL_DENDRITE_HAZARD'
                ? 'text-rose-400 font-bold'
                : simResult.lithiumPlatingRiskVI === 'ELEVATED'
                ? 'text-amber-400'
                : 'text-emerald-300'
            }`}
          >
            {simResult.lithiumPlatingRiskVI === 'CRITICAL_DENDRITE_HAZARD'
              ? 'CẢNH BÁO: NGUY CƠ DENDRITE'
              : simResult.lithiumPlatingRiskVI === 'ELEVATED'
              ? 'LƯU Ý BIÊN AN TOÀN'
              : 'TRẠNG THÁI AN TOÀN'}
          </span>
        </div>
      </div>

      {/* 2. Chemistry Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(BATTERY_CATALOG).map((chem) => {
          const isSelected = chem.id === selectedChemistryId;
          return (
            <button
              key={chem.id}
              onClick={() => handleChemistryChange(chem.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-emerald-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-emerald-300">
                  {chem.cathodeType} / {chem.anodeType}
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{chem.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{chem.cathodeFormula}</span>
                <span className="text-emerald-300 font-bold">{chem.nominalVoltageV} V</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Điện Áp Tải V_cell</p>
            <p className="text-base sm:text-lg font-bold font-mono text-emerald-300">
              {simResult.operatingVoltageV.toFixed(3)} <span className="text-xs text-ivory-muted">V</span>
            </p>
            <p className="text-[10px] text-ivory-muted">OCV: {simResult.openCircuitVoltageV.toFixed(3)} V</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Battery className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Trạng Thái Sạc (SoC)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-sky-300">
              {simResult.stateOfChargePercent.toFixed(0)}%
            </p>
            <p className="text-[10px] text-ivory-muted">Dung lượng: {simResult.availableCapacityMah} mAh</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Sức Khỏe Pin (SoH)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-amber-300">
              {simResult.stateOfHealthPercent.toFixed(1)}%
            </p>
            <p className="text-[10px] text-ivory-muted">Chu kỳ: {simResult.cycleCount} / {simResult.chemistry.cycleLifeNominal}</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Thế Anode vs Li⁺/Li</p>
            <p
              className={`text-base sm:text-lg font-bold font-mono ${
                simResult.anodePotentialVsLiV <= 0 ? 'text-rose-400' : 'text-purple-300'
              }`}
            >
              {simResult.anodePotentialVsLiV.toFixed(3)} <span className="text-xs text-ivory-muted">V</span>
            </p>
            <p className="text-[10px] text-ivory-muted">Nội trở: {simResult.internalResistanceMilliohm} mΩ</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('intercalation_model')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'intercalation_model'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Mô Hình Xen Phủ Cấu Trúc & Màng SEI
        </button>

        <button
          onClick={() => setActiveTab('voltage_discharge_profile')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'voltage_discharge_profile'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Đường Phóng Điện V(SoC) & Cao Nguyên Điện Áp
        </button>

        <button
          onClick={() => setActiveTab('sei_cycle_aging')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'sei_cycle_aging'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" />
          Lão Hóa Chu Kỳ, Màng SEI & Suy Giảm SoH
        </button>

        <button
          onClick={() => setActiveTab('nobel_history_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_history_gdpt'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Lịch Sử Giải Nobel 2019 & Xe Điện VinFast
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'intercalation_model' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Cơ Chế Con Thoi (Rocking-Chair) Giữa Cathode & Anode Graphite
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Ion Li⁺ di chuyển qua chất điện phân lỏng LiPF₆, electron e⁻ chạy qua tải tiêu thụ mạch ngoài.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  x = {simResult.lithiumIntercalationFractionX} trong LiₓC₆
                </span>
              </div>

              {/* Physical Schematic */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 p-4 relative flex flex-col justify-between overflow-hidden">
                {/* External Circuit */}
                <div className="w-full flex items-center justify-center relative py-1">
                  <div className="w-3/4 h-7 border-t-2 border-l-2 border-r-2 border-emerald-400/80 rounded-t-xl flex items-center justify-center relative">
                    <div className="bg-emerald-500/20 border border-emerald-400 px-3 py-0.5 rounded-full text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Mạch Ngoài: e⁻ Flow ({((5000 / 1000) * simResult.cRate).toFixed(1)} A)
                    </div>
                  </div>
                </div>

                {/* 3 Main Physical Blocks: Cathode - Separator + SEI - Anode */}
                <div className="grid grid-cols-3 gap-2 h-36 items-stretch">
                  {/* Cathode Block */}
                  <div className="bg-blue-950/40 border border-blue-500/50 rounded-xl p-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">CỰC DƯƠNG (Cathode)</span>
                        <span className="text-[10px] font-mono px-1 rounded bg-blue-500/20 text-blue-300">{simResult.chemistry.cathodeType}</span>
                      </div>
                      <p className="text-[10px] font-mono text-ivory mt-1">{simResult.chemistry.cathodeFormula}</p>
                      <p className="text-[9px] text-ivory-muted">{simResult.chemistry.crystalStructureVI.split('(')[0]}</p>
                    </div>
                    <div className="text-[10px] text-blue-300/80 font-mono">
                      {simResult.chemistry.cathodeReactionVI}
                    </div>
                  </div>

                  {/* Separator & SEI Layer Block */}
                  <div className="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-xl p-2.5 flex flex-col justify-between items-center text-center relative overflow-hidden">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">MÀNG NGĂN & SEI</span>
                      <p className="text-[10px] text-ivory-muted">Màng Polypropylene + LiPF₆</p>
                    </div>

                    {/* Animated Li+ Shuttling */}
                    <div className="flex items-center gap-1 p-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-[11px] font-bold">
                      <span className="animate-pulse">Li⁺</span>
                      <ArrowRight className="w-3.5 h-3.5 animate-bounce" />
                      <span className="animate-pulse">Li⁺</span>
                    </div>

                    {/* SEI Metrics */}
                    <div className="text-[9px] font-mono text-emerald-200">
                      {simResult.chemistry.anodeType === 'LTO' ? (
                        <span className="text-amber-300">Không có SEI (LTO 1.55V)</span>
                      ) : (
                        <span>SEI: {simResult.seiThicknessNanometers} nm (Tiêu hao: {simResult.seiCapacityLossPercent}%)</span>
                      )}
                    </div>
                  </div>

                  {/* Anode Block */}
                  <div
                    className={`border rounded-xl p-2.5 flex flex-col justify-between transition-colors ${
                      simResult.lithiumPlatingRiskVI === 'CRITICAL_DENDRITE_HAZARD'
                        ? 'bg-rose-950/60 border-rose-500/80 shadow-inner shadow-rose-500/30'
                        : 'bg-purple-950/40 border-purple-500/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300">CỰC ÂM (Anode)</span>
                        <span className="text-[10px] font-mono px-1 rounded bg-purple-500/20 text-purple-200">
                          {simResult.chemistry.anodeType}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-ivory mt-1">{simResult.chemistry.anodeFormula}</p>
                      <p className="text-[9px] text-ivory-muted font-mono">Thế: {simResult.anodePotentialVsLiV.toFixed(3)} V vs Li</p>
                    </div>

                    {simResult.lithiumPlatingRiskVI === 'CRITICAL_DENDRITE_HAZARD' ? (
                      <div className="text-[9px] font-bold text-rose-300 bg-rose-500/20 p-1 rounded border border-rose-500/40 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-400" /> Kết tinh nhánh cây Lithium Plating!
                      </div>
                    ) : (
                      <div className="text-[10px] text-purple-300/80 font-mono">
                        {simResult.chemistry.anodeReactionVI}
                      </div>
                    )}
                  </div>
                </div>

                {/* Overall Reaction Footnote */}
                <div className="bg-navy-dark/90 border border-emerald-500/30 p-2 rounded-lg text-center font-mono text-xs text-emerald-200">
                  Phản ứng tổng quát: <span className="font-bold text-white">{simResult.chemistry.overallReactionVI}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voltage_discharge_profile' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Đường Đặc Tuyến Phóng Điện V_cell(SoC)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    So sánh cao nguyên phẳng (LFP/LTO chuyển pha 2 thành phần) với độ dốc liên tục (NMC/LCO dung dịch rắn).
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-300">
                  Cắt trên: {simResult.chemistry.chargeCutoffVoltageV}V | Cắt dưới: {simResult.chemistry.dischargeCutoffVoltageV}V
                </span>
              </div>

              {/* SVG Chart */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <defs>
                    <linearGradient id="batteryVoltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="50" y1={30 + y} x2="490" y2={30 + y} stroke="#1e293b" strokeDasharray="3 3" />
                  ))}
                  {[0, 110, 220, 330, 440].map((x) => (
                    <line key={x} x1={50 + x} y1="30" x2={50 + x} y2="230" stroke="#1e293b" strokeDasharray="3 3" />
                  ))}

                  {/* Axes */}
                  <line x1="50" y1="230" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* X labels (SoC: 0% to 100%) */}
                  <text x="50" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace">0%</text>
                  <text x="270" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">50% SoC</text>
                  <text x="490" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">100%</text>

                  {/* Y labels (Voltage: 1.5V to 4.5V) */}
                  <text x="42" y="35" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="end">4.5V</text>
                  <text x="42" y="130" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="end">3.0V</text>
                  <text x="42" y="230" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="end">1.5V</text>

                  {/* Plot Discharge Curve */}
                  {simResult.dischargeCurve.length > 1 && (() => {
                    const points = simResult.dischargeCurve.map((pt) => {
                      const x = 50 + (pt.soc / 100.0) * 440;
                      const y = 230 - ((pt.voltage - 1.5) / 3.0) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="url(#batteryVoltGrad)"
                        strokeWidth="3"
                      />
                    );
                  })()}

                  {/* Operating Point Indicator */}
                  {(() => {
                    const currentX = 50 + (simResult.stateOfChargePercent / 100.0) * 440;
                    const currentY = 230 - ((simResult.operatingVoltageV - 1.5) / 3.0) * 200;

                    return (
                      <>
                        <line
                          x1={currentX}
                          y1="30"
                          x2={currentX}
                          y2="230"
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <circle cx={currentX} cy={currentY} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-navy-light/20 text-xs text-ivory-muted leading-relaxed">
                Pin <strong className="text-emerald-300">{simResult.chemistry.name}</strong> có điện thế danh định{' '}
                <span className="font-mono text-white">{simResult.chemistry.nominalVoltageV} V</span>. Tại mức tải{' '}
                <span className="font-mono text-white">{simResult.cRate}C</span>, sụt áp do nội trở{' '}
                <span className="font-mono text-white">{simResult.internalResistanceMilliohm} mΩ</span> khiến điện thế thực tế còn{' '}
                <span className="font-mono text-emerald-300 font-bold">{simResult.operatingVoltageV.toFixed(3)} V</span>.
              </div>
            </div>
          )}

          {activeTab === 'sei_cycle_aging' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    Động Học Lão Hóa & Sự Phát Triển Lớp Màng Thụ Động SEI
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Lớp SEI tăng trưởng theo định luật khuếch tán vi phân ~ √t, tiêu hao lithium hoạt hóa và tăng nội trở.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-300">
                  Chu kỳ tuổi thọ: {simResult.chemistry.cycleLifeNominal} chu kỳ
                </span>
              </div>

              {/* Aging SVG Curve */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <line x1="50" y1="230" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* Threshold 80% EOL Line */}
                  <line x1="50" y1="130" x2="490" y2="130" stroke="#f43f5e" strokeDasharray="4 2" strokeWidth="1.5" />
                  <text x="495" y="133" fill="#fb7185" fontSize="9" fontFamily="monospace">80% EOL</text>

                  {/* X Axis Labels */}
                  <text x="50" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace">0</text>
                  <text x="270" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    {(simResult.chemistry.cycleLifeNominal / 2).toFixed(0)} Cycles
                  </text>
                  <text x="490" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                    {simResult.chemistry.cycleLifeNominal}
                  </text>

                  {/* Y Axis Labels (100% to 50% SoH) */}
                  <text x="42" y="35" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="end">100%</text>
                  <text x="42" y="130" fill="#fb7185" fontSize="9" fontFamily="monospace" textAnchor="end">80%</text>
                  <text x="42" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">50%</text>

                  {/* Plot Aging Curve */}
                  {simResult.cycleAgingCurve.length > 1 && (() => {
                    const maxC = simResult.chemistry.cycleLifeNominal;
                    const points = simResult.cycleAgingCurve.map((pt) => {
                      const x = 50 + (pt.cycle / maxC) * 440;
                      const y = 30 + ((100.0 - pt.capacityPercent) / 50.0) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Current Cycle Point */}
                  {(() => {
                    const maxC = simResult.chemistry.cycleLifeNominal;
                    const currentX = 50 + (Math.min(maxC, simResult.cycleCount) / maxC) * 440;
                    const currentY = 30 + ((100.0 - simResult.stateOfHealthPercent) / 50.0) * 200;

                    return (
                      <circle cx={currentX} cy={currentY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    );
                  })()}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-navy-light/10 border border-navy-light/20">
                  <span className="text-ivory-muted">Độ dày màng SEI:</span>
                  <p className="font-bold font-mono text-emerald-300 mt-0.5">{simResult.seiThicknessNanometers} nm</p>
                </div>
                <div className="p-2.5 rounded-lg bg-navy-light/10 border border-navy-light/20">
                  <span className="text-ivory-muted">Tổn thất dung lượng do SEI:</span>
                  <p className="font-bold font-mono text-amber-300 mt-0.5">{simResult.seiCapacityLossPercent}%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nobel_history_gdpt' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Di Sản Giải Nobel Hóa Học 2019 & Cuộc Cách Mạng Xe Điện VinFast
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Bộ ba nhà khoa học kiến tạo nên thế giới có thể sạc lại (A Rechargeable World).
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-emerald-300">1. M. Stanley Whittingham (1970s)</h4>
                  <p className="text-ivory-muted mt-1">
                    Khám phá vật liệu xen phủ đầu tiên Titan Disulfide (TiS₂) có cấu trúc phân lớp nhận ion Li⁺.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-sky-300">2. John B. Goodenough (1980)</h4>
                  <p className="text-ivory-muted mt-1">
                    Thay thế sulfua kim loại bằng oxit kim loại LiCoO₂ (LCO) và sau này là LiFePO₄ (LFP), tăng gấp đôi điện thế pin từ 2V lên 4V.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-purple-300">3. Akira Yoshino (1985)</h4>
                  <p className="text-ivory-muted mt-1">
                    Thay thế lithium kim loại nguy hiểm bằng than chì cốc dầu mỏ (Petroleum Coke / Graphite), tạo nên pin lithium-ion thương mại an toàn đầu tiên năm 1991.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
                <span className="font-bold">Ứng dụng tại Việt Nam:</span> Hãng xe VinFast (VF3, VF5, VF8, VF9) và tổ hợp nhà máy sản xuất pack pin VinES tại Hải Phòng và Hà Tĩnh áp dụng công nghệ tế bào pin LFP của Gotion/CATL, loại bỏ hoàn toàn Coban, mang lại sự an toàn chống cháy nổ tuyệt đối và giảm giá thành xe điện cho người dân Việt Nam.
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-emerald-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Tính Toán Điện Hóa Thực Nghiệm:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bảng Quản Lý Pin (BMS Controls)</h3>
            </div>

            {/* Slider 1: SoC */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Mức sạc (SoC):</span>
                <span className="font-mono text-emerald-300 font-bold">{socPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={socPercent}
                onChange={(e) => handleSocChange(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0% (Cạn)</span>
                <span>50%</span>
                <span>100% (Đầy)</span>
              </div>
            </div>

            {/* Slider 2: C-Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Tốc độ nạp/xả (C-Rate):</span>
                <span className="font-mono text-sky-300 font-bold">
                  {cRate}C ({((5000 / 1000) * cRate).toFixed(1)} A)
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5.0"
                step="0.2"
                value={cRate}
                onChange={(e) => handleCRateChange(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.2C (5h)</span>
                <span>1.0C (1h)</span>
                <span>5.0C (12m Sạc nhanh)</span>
              </div>
            </div>

            {/* Slider 3: Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Nhiệt độ pin (T):</span>
                <span
                  className={`font-mono font-bold ${
                    temperature < 0 ? 'text-rose-400' : 'text-amber-300'
                  }`}
                >
                  {temperature} °C
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="55"
                step="1"
                value={temperature}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>-20°C (Băng giá)</span>
                <span>25°C (Chuẩn)</span>
                <span>55°C (Nóng)</span>
              </div>
            </div>

            {/* Slider 4: Cycle Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Số chu kỳ nạp/xả:</span>
                <span className="font-mono text-purple-300 font-bold">{cycles} chu kỳ</span>
              </div>
              <input
                type="range"
                min="0"
                max={simResult.chemistry.cycleLifeNominal}
                step="25"
                value={cycles}
                onChange={(e) => setCycles(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0 (Mới)</span>
                <span>{(simResult.chemistry.cycleLifeNominal / 2).toFixed(0)}</span>
                <span>{simResult.chemistry.cycleLifeNominal} (Hết hạn)</span>
              </div>
            </div>

            {/* Detailed Spec Box */}
            <div className="space-y-2 pt-2 border-t border-navy-light/30">
              <h4 className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Thông Số Hóa Học Pin</h4>
              <div className="text-[11px] space-y-1.5 font-mono text-ivory-muted bg-black/30 p-3 rounded-xl border border-navy-light/20">
                <div className="flex justify-between">
                  <span>Mật độ năng lượng:</span>
                  <span className="text-white font-bold">{simResult.chemistry.gravimetricEnergyDensityWhPerKg} Wh/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Dung lượng riêng:</span>
                  <span className="text-white font-bold">{simResult.chemistry.theoreticalSpecificCapacityMahPerG} mAh/g</span>
                </div>
                <div className="flex justify-between">
                  <span>Nhiệt độ thoát nhiệt:</span>
                  <span className="text-emerald-300 font-bold">{simResult.chemistry.thermalRunawayTempCelsius} °C</span>
                </div>
                <div className="flex justify-between">
                  <span>Thế chuẩn Li⁺/Li:</span>
                  <span className="text-sky-300 font-bold">{STANDARD_LI_REDUCTION_POTENTIAL_V} V</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
