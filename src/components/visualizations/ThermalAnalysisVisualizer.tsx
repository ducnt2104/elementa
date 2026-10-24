// src/components/visualizations/ThermalAnalysisVisualizer.tsx
// Milestone 51: Thermogravimetric Analysis (TGA), Differential Scanning Calorimetry (DSC) & Thermal Decomposition Visualizer
// Standards: ICTAC (International Confederation for Thermal Analysis and Calorimetry)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Năng lượng & Enthalpy; Hóa học 11: Nhiệt phân; Hóa học 12: Chuyển pha Polymer)

import React, { useState } from 'react';
import {
  THERMAL_SAMPLES_CATALOG,
  ThermalAtmosphere,
  simulateThermalAnalysis,
} from '../../domain/thermalAnalysisEngine';
import { sound } from '../../audio/soundEngine';
import {
  Flame,
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
  Award,
  Thermometer,
  Wind,
  Scale,
  RefreshCw
} from 'lucide-react';

export interface ThermalAnalysisVisualizerProps {
  initialSampleId?: string;
}

export const ThermalAnalysisVisualizer: React.FC<ThermalAnalysisVisualizerProps> = ({
  initialSampleId,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(initialSampleId || 'calcium_oxalate_monohydrate');
  const [currentTemp, setCurrentTemp] = useState<number>(300.0);
  const [heatingRate, setHeatingRate] = useState<number>(10.0);
  const [atmosphere, setAtmosphere] = useState<ThermalAtmosphere>('INERT_NITROGEN');
  const [activeTab, setActiveTab] = useState<'tga_mass_loss_curve' | 'dsc_heat_flow' | 'furnace_microbalance' | 'ictac_stoichiometry_gdpt'>('tga_mass_loss_curve');

  const simResult = simulateThermalAnalysis(
    selectedSampleId,
    atmosphere,
    heatingRate,
    currentTemp
  );

  const handleSampleChange = (id: string) => {
    setSelectedSampleId(id);
    setCurrentTemp(150.0);
    sound.playEndothermicDscChime();
  };

  const handleTempChange = (val: number) => {
    setCurrentTemp(val);
    sound.playThermalFurnaceRampHum();
  };

  const handleAtmosphereToggle = (atm: ThermalAtmosphere) => {
    setAtmosphere(atm);
    sound.playThermalFurnaceRampHum();
  };

  return (
    <div className="w-full bg-navy/90 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with ICTAC & GDPT 2018 Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Scale className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Phân Tích Nhiệt TGA / DTG & Quét Nhiệt Vi Sai DSC
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono">
                Chuẩn ICTAC • Hóa học 10, 11 & 12 GDPT
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Đường cong mất khối lượng TGA m(T), Đạo hàm DTG, Dòng nhiệt quét vi sai DSC (Thu nhiệt / Tỏa nhiệt) & Nhiệt phân hợp chất vô cơ, polymer.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-amber-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
            {simResult.activeStage
              ? `GIAI ĐOẠN ${simResult.activeStage.stageIndex}: ${simResult.activeStage.eventType}`
              : 'TRẠNG THÁI RẮN ỔN ĐỊNH'}
          </span>
        </div>
      </div>

      {/* 2. Sample Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(THERMAL_SAMPLES_CATALOG).map((s) => {
          const isSelected = s.id === selectedSampleId;
          return (
            <button
              key={s.id}
              onClick={() => handleSampleChange(s.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-amber-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-amber-300">
                  {s.sampleType.split('_')[0]}
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{s.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{s.formula}</span>
                <span className="text-amber-300 font-bold">Cặn: {s.finalResiduePercentExpected.toFixed(0)}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Khối Lượng Mẫu m(T)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-amber-300">
              {simResult.currentMassPercent.toFixed(1)}%
            </p>
            <p className="text-[10px] text-ivory-muted">{simResult.currentMassMg.toFixed(2)} mg (Mất {simResult.totalMassLossPercent.toFixed(1)}%)</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Tốc Độ DTG (-dm/dT)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-sky-300">
              {simResult.currentDtgRate.toFixed(2)} <span className="text-xs text-ivory-muted">%/°C</span>
            </p>
            <p className="text-[10px] text-ivory-muted">Đỉnh phân hủy nhiệt</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Dòng Nhiệt DSC</p>
            <p className="text-base sm:text-lg font-bold font-mono text-purple-300">
              {simResult.currentHeatFlow >= 0 ? `+${simResult.currentHeatFlow.toFixed(2)}` : simResult.currentHeatFlow.toFixed(2)}{' '}
              <span className="text-xs text-ivory-muted">mW/mg</span>
            </p>
            <p className="text-[10px] text-ivory-muted">{simResult.currentHeatFlow < 0 ? 'Thu nhiệt (Endo)' : 'Tỏa nhiệt (Exo)'}</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Nhiệt Độ Lò Nung (T)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-emerald-300">
              {currentTemp.toFixed(0)} <span className="text-xs text-ivory-muted">°C</span>
            </p>
            <p className="text-[10px] text-ivory-muted">{heatingRate}°C/phút • {atmosphere === 'INERT_NITROGEN' ? 'N₂' : 'Không khí'}</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('tga_mass_loss_curve')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'tga_mass_loss_curve'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" />
          Đường Mất Khối Lượng TGA & Đạo Hàm DTG
        </button>

        <button
          onClick={() => setActiveTab('dsc_heat_flow')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'dsc_heat_flow'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Đường Quét Nhiệt Vi Sai DSC (Tg, Tc, Tm)
        </button>

        <button
          onClick={() => setActiveTab('furnace_microbalance')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'furnace_microbalance'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Cấu Trúc Lò Nung Cân Nhiệt Vi Lượng (TGA Furnace)
        </button>

        <button
          onClick={() => setActiveTab('ictac_stoichiometry_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'ictac_stoichiometry_gdpt'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Tính Toán Hợp Thức Hóa Học ICTAC & GDPT 2018
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'tga_mass_loss_curve' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    Đường Đặc Tuyến TGA (% Khối Lượng) & DTG (Đạo Hàm Tốc Độ)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Các bậc thềm phẳng phản ánh khoảng nhiệt độ mà chất rắn tồn tại bền vững; các bước sụt dốc phản ánh quá trình phân hủy giải phóng khí.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-amber-300">
                    <span className="w-2.5 h-0.5 bg-amber-400 inline-block"></span> TGA (%)
                  </span>
                  <span className="flex items-center gap-1 text-sky-300">
                    <span className="w-2.5 h-0.5 bg-sky-400 inline-block"></span> DTG (%/°C)
                  </span>
                </div>
              </div>

              {/* Dual Axis SVG Plot */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <defs>
                    <linearGradient id="tgaMassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="dtgRateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
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
                  <line x1="490" y1="30" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* X Axis Labels (Temp: 25 to 1000 °C) */}
                  <text x="50" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace">25°C</text>
                  <text x="270" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">500°C</text>
                  <text x="490" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">1000°C</text>

                  {/* Left Y-axis (Mass %: 0 to 100%) */}
                  <text x="42" y="35" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="end">100%</text>
                  <text x="42" y="130" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="end">50%</text>
                  <text x="42" y="230" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="end">0%</text>

                  {/* Right Y-axis (DTG Rate: 0 to 1.5 %/°C) */}
                  <text x="498" y="35" fill="#38bdf8" fontSize="9" fontFamily="monospace">1.5</text>
                  <text x="498" y="230" fill="#38bdf8" fontSize="9" fontFamily="monospace">0.0</text>

                  {/* Plot DTG Rate (Cyan) */}
                  {simResult.curveData.length > 1 && (() => {
                    const points = simResult.curveData.map((pt) => {
                      const x = 50 + ((pt.temperatureCelsius - 25) / 975.0) * 440;
                      const y = 230 - Math.min(200, (pt.dtgRatePercentPerCelsius / 1.5) * 200);
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="url(#dtgRateGrad)"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    );
                  })()}

                  {/* Plot TGA Mass % (Amber Solid) */}
                  {simResult.curveData.length > 1 && (() => {
                    const points = simResult.curveData.map((pt) => {
                      const x = 50 + ((pt.temperatureCelsius - 25) / 975.0) * 440;
                      const y = 230 - (pt.massPercent / 100.0) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="url(#tgaMassGrad)"
                        strokeWidth="3"
                      />
                    );
                  })()}

                  {/* Operating Temperature Line & Point */}
                  {(() => {
                    const currentX = 50 + ((currentTemp - 25) / 975.0) * 440;
                    const currentY = 230 - (simResult.currentMassPercent / 100.0) * 200;

                    return (
                      <>
                        <line
                          x1={currentX}
                          y1="30"
                          x2={currentX}
                          y2="230"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <circle cx={currentX} cy={currentY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Stage Explanations Accordion / Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {simResult.sample.stages.map((stage) => {
                  const isActive = simResult.activeStage?.stageIndex === stage.stageIndex;
                  return (
                    <div
                      key={stage.stageIndex}
                      className={`p-2.5 rounded-lg border text-xs transition-all ${
                        isActive
                          ? 'bg-amber-500/20 border-amber-400 shadow-sm'
                          : 'bg-navy-dark/40 border-navy-light/20 text-ivory-muted'
                      }`}
                    >
                      <div className="flex justify-between items-center font-bold">
                        <span className={isActive ? 'text-amber-300' : 'text-ivory'}>
                          Bước {stage.stageIndex}: {stage.peakTempCelsius}°C
                        </span>
                        <span className="font-mono text-[10px] text-amber-300">-{stage.massLossPercentExpected}%</span>
                      </div>
                      <p className="text-[10px] mt-1 line-clamp-1">{stage.reactionEquationVI}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'dsc_heat_flow' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Đường Quét Nhiệt Vi Sai DSC (Quy Ước: Thu Nhiệt Hướng Xuống / Tỏa Nhiệt Hướng Lên)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Phát hiện biến thiên enthalpy (ΔH) trong các phản ứng phân hủy hóa học cũng như chuyển pha vật lý (Tg, Tc, Tm) của polymer.
                </p>
              </div>

              {/* DSC Plot */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <line x1="50" y1="130" x2="490" y2="130" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* Y Axis Zero Baseline */}
                  <text x="42" y="133" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">0.0</text>
                  <text x="42" y="35" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="end">+Exo</text>
                  <text x="42" y="230" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="end">-Endo</text>

                  {/* Plot DSC Heat Flow */}
                  {simResult.curveData.length > 1 && (() => {
                    const points = simResult.curveData.map((pt) => {
                      const x = 50 + ((pt.temperatureCelsius - 25) / 975.0) * 440;
                      // scale: -3 to +3 mW/mg
                      const y = 130 - (pt.dscHeatFlowMwPerMg / 3.0) * 90;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Current Temp Indicator */}
                  {(() => {
                    const currentX = 50 + ((currentTemp - 25) / 975.0) * 440;
                    const currentY = 130 - (simResult.currentHeatFlow / 3.0) * 90;

                    return (
                      <circle cx={currentX} cy={currentY} r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="2" />
                    );
                  })()}
                </svg>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-navy-light/20 text-xs text-ivory-muted">
                Tại T = <strong className="text-white">{currentTemp.toFixed(0)}°C</strong>, dòng nhiệt đạt{' '}
                <strong className="text-purple-300 font-mono">{simResult.currentHeatFlow.toFixed(2)} mW/mg</strong>.
                {simResult.currentHeatFlow < -0.1 ? (
                  <span className="text-rose-300 ml-1">Phản ứng đang thu nhiệt mạnh để bẻ gãy liên kết hóa học.</span>
                ) : simResult.currentHeatFlow > 0.1 ? (
                  <span className="text-emerald-300 ml-1">Phản ứng đang tỏa nhiệt (kết tinh hoặc phản ứng cháy oxi hóa).</span>
                ) : (
                  <span className="text-slate-300 ml-1">Mẫu đang ở trạng thái cân bằng nhiệt ổn định.</span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'furnace_microbalance' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Cấu Trúc Lò Nung Cân Nhiệt Vi Lượng (TGA Furnace & Microbalance)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Cân quang điện từ siêu nhạy (độ phân giải 0.1 µg) kết hợp lò nung gốm điện trở và dòng khí quét liên tục.
                </p>
              </div>

              {/* Graphic Representation */}
              <div className="w-full h-72 sm:h-80 bg-black/40 rounded-xl border border-navy-light/20 p-4 relative flex flex-col justify-between overflow-hidden">
                {/* Microbalance Beam Top */}
                <div className="w-full flex items-center justify-center relative py-1">
                  <div className="w-2/3 h-6 border-b-2 border-amber-400/80 flex items-center justify-between px-4 text-[10px] font-mono text-amber-300">
                    <span>Quang điện cảm biến</span>
                    <span className="font-bold">ĐÒN CÂN VI LƯỢNG (0.1 µg)</span>
                    <span>Cuộn dây bù lực từ</span>
                  </div>
                </div>

                {/* Furnace Chamber */}
                <div className="w-full h-44 bg-slate-950 border-2 border-amber-500/50 rounded-2xl relative flex items-center justify-between px-8 overflow-hidden">
                  {/* Heating Coils */}
                  <div className="absolute inset-y-2 left-2 w-4 bg-orange-600/30 border border-orange-500 rounded flex flex-col justify-around py-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full h-1 bg-amber-400 animate-pulse"></div>
                    ))}
                  </div>
                  <div className="absolute inset-y-2 right-2 w-4 bg-orange-600/30 border border-orange-500 rounded flex flex-col justify-around py-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full h-1 bg-amber-400 animate-pulse"></div>
                    ))}
                  </div>

                  {/* Gas Flow Arrow */}
                  <div className="text-[10px] font-mono text-sky-300 flex items-center gap-1">
                    <Wind className="w-4 h-4" /> Khí quét: {atmosphere === 'INERT_NITROGEN' ? 'N₂ (50 mL/phút)' : 'Không khí'}
                  </div>

                  {/* Crucible and Thermocouple */}
                  <div className="flex flex-col items-center z-10 space-y-1">
                    <div className="p-3 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-center shadow-lg shadow-amber-500/20">
                      <span className="text-xs font-bold text-amber-200">Chén Nung Bạch Kim (Pt Crucible)</span>
                      <p className="text-[11px] font-mono text-white font-bold mt-0.5">
                        {simResult.currentMassMg.toFixed(2)} mg
                      </p>
                      <p className="text-[9px] text-amber-300/80 font-mono">{simResult.sample.formula}</p>
                    </div>
                    <div className="w-1 h-8 bg-slate-400"></div>
                    <span className="text-[9px] font-mono text-ivory-muted">Cặp nhiệt điện Pt-Rh</span>
                  </div>

                  {/* Evolved Gas Outlet */}
                  <div className="text-[10px] font-mono text-rose-300 flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" /> Khí bay ra: {simResult.activeStage?.releasedEvolvedGasVI || 'Không'}
                  </div>
                </div>

                <div className="text-center font-mono text-xs text-amber-300">
                  Nhiệt độ tâm lò: <strong className="text-white">{currentTemp.toFixed(0)} °C</strong> ({((currentTemp + 273.15)).toFixed(1)} K)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ictac_stoichiometry_gdpt' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Tính Toán Hợp Thức Khối Lượng Theo Chuẩn ICTAC & GDPT 2018
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Công thức định lượng phân tích nhiệt: Δm% = (M_khí / M_đầu) × 100%.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {simResult.sample.stages.map((st) => (
                  <div key={st.stageIndex} className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20 space-y-1">
                    <div className="flex justify-between font-bold text-amber-300">
                      <span>Giai đoạn {st.stageIndex}: {st.eventType}</span>
                      <span className="font-mono">Lý thuyết: -{st.massLossPercentExpected}%</span>
                    </div>
                    <p className="font-mono text-white">{st.reactionEquationVI}</p>
                    <p className="text-ivory-muted text-[11px]">{st.descriptionVI}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-amber-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Tính Toán Thực Nghiệm Phân Tích Nhiệt:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Điều Khiển Lò Nung TGA</h3>
            </div>

            {/* Slider 1: Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Nhiệt độ lò nung (T):</span>
                <span className="font-mono text-amber-300 font-bold">{currentTemp.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="25"
                max="1000"
                step="5"
                value={currentTemp}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>25°C</span>
                <span>500°C</span>
                <span>1000°C</span>
              </div>
            </div>

            {/* Heating Rate */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted">Tốc độ gia nhiệt (β):</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[5, 10, 20].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setHeatingRate(rate)}
                    className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                      heatingRate === rate
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                    }`}
                  >
                    {rate} °C/phút
                  </button>
                ))}
              </div>
            </div>

            {/* Atmosphere Toggle */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted">Khí quyển lò nung:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleAtmosphereToggle('INERT_NITROGEN')}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    atmosphere === 'INERT_NITROGEN'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                      : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                  }`}
                >
                  N₂ (Trơ)
                </button>
                <button
                  onClick={() => handleAtmosphereToggle('OXIDIZING_AIR')}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    atmosphere === 'OXIDIZING_AIR'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                      : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                  }`}
                >
                  Không khí (Oxi hóa)
                </button>
              </div>
            </div>

            {/* Stage Quick Jumps */}
            <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Đến Nhanh Đỉnh Phân Hủy:</span>
              <div className="grid grid-cols-3 gap-1">
                {simResult.sample.stages.map((st) => (
                  <button
                    key={st.stageIndex}
                    onClick={() => handleTempChange(st.peakTempCelsius)}
                    className="p-1 rounded bg-navy-light/20 hover:bg-navy-light/40 text-[10px] text-ivory-muted font-mono truncate"
                  >
                    {st.peakTempCelsius}°C
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
