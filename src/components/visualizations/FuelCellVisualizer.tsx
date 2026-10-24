// src/components/visualizations/FuelCellVisualizer.tsx
// Milestone 47: Fuel Cells, Proton-Exchange Membrane (PEMFC), Solid Oxide (SOFC) & Butler-Volmer Overpotential Visualizer
// Standards: IUPAC Electrochemistry Recommendations & Grove-Nernst Thermodynamic Principles
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Phản ứng oxi hóa - khử & Năng lượng; Hóa học 12: Pin điện, Điện phân & Pin nhiên liệu Hydro)

import React, { useState } from 'react';
import {
  FUEL_CELL_CATALOG,
  calculateFuelCellPolarization,
  THERMONEUTRAL_VOLTAGE_HHV,
} from '../../domain/fuelCellEngine';
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
  Droplets,
  Wind,
  Shield,
  Leaf
} from 'lucide-react';

export interface FuelCellVisualizerProps {
  initialCellId?: string;
}

export const FuelCellVisualizer: React.FC<FuelCellVisualizerProps> = ({
  initialCellId,
}) => {
  const [selectedCellId, setSelectedCellId] = useState<string>(initialCellId || 'pemfc_hydrogen');
  const [currentDensity, setCurrentDensity] = useState<number>(600.0); // 600 mA/cm^2
  const [tempOffset, setTempOffset] = useState<number>(0.0);
  const [activeTab, setActiveTab] = useState<'polarization_curve' | 'cell_architecture' | 'energy_efficiency' | 'hydrogen_economy'>('polarization_curve');

  const simResult = calculateFuelCellPolarization(
    selectedCellId,
    currentDensity,
    tempOffset
  );

  const handleCellChange = (id: string) => {
    setSelectedCellId(id);
    const cell = FUEL_CELL_CATALOG[id];
    setTempOffset(0.0);
    // Adjust current density to ~40% of limiting current
    setCurrentDensity(Math.round(cell.limitingCurrentDensityJLMaPerCm2 * 0.4));
    sound.playFuelCellProtonFlowHum();
  };

  const handleCurrentChange = (val: number) => {
    setCurrentDensity(val);
    if (val > simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 * 0.85) {
      sound.playHydrogenPurgeWhistle();
    } else {
      sound.playFuelCellProtonFlowHum();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-sky-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with GDPT 2018 & IUPAC Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Pin Nhiên Liệu Hydro & Động Học Điện Hóa Butler-Volmer
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-mono">
                Hóa học 12 GDPT • Năng lượng Xanh Net-Zero 2050
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Đường đặc tuyến phân cực V(j), Tổn hao kích hoạt Tafel η_act, Tổn hao điện trở màng η_ohm & Giới hạn khuếch tán dòng tới hạn j_L.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-sky-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
            {simResult.cellSpec.archetype} • {simResult.cellSpec.mobileChargeCarrier}
          </span>
        </div>
      </div>

      {/* 2. Fuel Cell Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(FUEL_CELL_CATALOG).map((cell) => {
          const isSelected = cell.id === selectedCellId;
          return (
            <button
              key={cell.id}
              onClick={() => handleCellChange(cell.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-400 shadow-md shadow-sky-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-sky-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-sky-300">
                  {cell.archetype}
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{cell.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{cell.operatingTempCelsius}°C</span>
                <span className="text-sky-300 font-bold">{cell.standardReversibleVoltageV} V</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Điện Áp Tải V_cell</p>
            <p className="text-base sm:text-lg font-bold font-mono text-sky-300">
              {simResult.operatingCellVoltageV.toFixed(3)} <span className="text-xs text-ivory-muted">V</span>
            </p>
            <p className="text-[10px] text-ivory-muted">OCV: {simResult.openCircuitVoltageErevV.toFixed(3)} V</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Mật Độ Công Suất</p>
            <p className="text-base sm:text-lg font-bold font-mono text-emerald-300">
              {simResult.powerDensityMwPerCm2.toFixed(0)} <span className="text-xs text-ivory-muted">mW/cm²</span>
            </p>
            <p className="text-[10px] text-ivory-muted">Max: {simResult.maximumPowerDensityMwPerCm2.toFixed(0)} mW/cm²</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Tổng Tổn Hao (η_tot)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-amber-300">
              {((simResult.openCircuitVoltageErevV - simResult.operatingCellVoltageV) * 1000).toFixed(0)}{' '}
              <span className="text-xs text-ivory-muted">mV</span>
            </p>
            <p className="text-[10px] text-ivory-muted">
              η_act: {(simResult.activationOverpotentialV * 1000).toFixed(0)} | η_ohm: {(simResult.ohmicOverpotentialV * 1000).toFixed(0)} mV
            </p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Hiệu Suất Nhiệt HHV</p>
            <p className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              {simResult.thermalEfficiencyHHVPercent.toFixed(1)}%
            </p>
            <p className="text-[10px] text-ivory-muted">Động cơ xăng: 30-35%</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('polarization_curve')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'polarization_curve'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Đường Đặc Tuyến Phân Cực V(j) & Công Suất
        </button>

        <button
          onClick={() => setActiveTab('cell_architecture')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'cell_architecture'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Cấu Trúc Tế Bào Điện Hóa (Anode - Màng - Cathode)
        </button>

        <button
          onClick={() => setActiveTab('energy_efficiency')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'energy_efficiency'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          Hiệu Suất Nhiệt Động Học & Tổn Hao Năng Lượng
        </button>

        <button
          onClick={() => setActiveTab('hydrogen_economy')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'hydrogen_economy'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          Kinh Tế Hydro Xanh & Net-Zero 2050
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'polarization_curve' && (
            <div className="bg-navy-dark/80 border border-sky-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-sky-400" />
                    Đường Đặc Tuyến Phân Cực Điện Áp V_cell(j) & Mật Độ Công Suất P(j)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Thể hiện 3 vùng suy giảm điện thế: Kích hoạt Tafel (I), Điện trở Ohm (II), và Giới hạn khuếch tán nồng độ (III).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-sky-300">
                    <span className="w-2.5 h-0.5 bg-sky-400 inline-block"></span> V_cell (V)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <span className="w-2.5 h-0.5 bg-emerald-400 inline-block"></span> Công suất (mW/cm²)
                  </span>
                </div>
              </div>

              {/* SVG Dual-Axis Chart */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <defs>
                    <linearGradient id="voltageLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="powerLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="powerAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="50" y1={30 + y} x2="490" y2={30 + y} stroke="#1e293b" strokeDasharray="3 3" />
                  ))}
                  {[0, 110, 220, 330, 440].map((x) => (
                    <line key={x} x1={50 + x} y1="30" x2={50 + x} y2="230" stroke="#1e293b" strokeDasharray="3 3" />
                  ))}

                  {/* Axis lines */}
                  <line x1="50" y1="230" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="490" y1="30" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* Axis labels */}
                  <text x="50" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace">0</text>
                  <text x="270" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    {(simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 / 2).toFixed(0)} mA/cm²
                  </text>
                  <text x="490" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                    {simResult.cellSpec.limitingCurrentDensityJLMaPerCm2.toFixed(0)} (j_L)
                  </text>

                  {/* Left Y-axis (Voltage: 0 to 1.3V) */}
                  <text x="42" y="35" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="end">1.3V</text>
                  <text x="42" y="130" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="end">0.65V</text>
                  <text x="42" y="230" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="end">0.0V</text>

                  {/* Right Y-axis (Power: 0 to MaxPower) */}
                  <text x="498" y="35" fill="#34d399" fontSize="9" fontFamily="monospace">
                    {(simResult.maximumPowerDensityMwPerCm2 * 1.15).toFixed(0)}
                  </text>
                  <text x="498" y="230" fill="#34d399" fontSize="9" fontFamily="monospace">0 mW</text>

                  {/* 3 Regions Background Shading */}
                  {/* Region I: Activation (0 to 15% j_L) */}
                  <rect x="50" y="30" width="66" height="200" fill="#38bdf8" fillOpacity="0.04" />
                  <text x="83" y="45" fill="#38bdf8" fontSize="9" textAnchor="middle" opacity="0.7">Vùng I: Tafel</text>

                  {/* Region II: Ohmic (15% to 75% j_L) */}
                  <rect x="116" y="30" width="264" height="200" fill="#a855f7" fillOpacity="0.04" />
                  <text x="248" y="45" fill="#c084fc" fontSize="9" textAnchor="middle" opacity="0.7">Vùng II: Tổn Hao Điện Trở Ohm</text>

                  {/* Region III: Concentration (75% to 100% j_L) */}
                  <rect x="380" y="30" width="110" height="200" fill="#f43f5e" fillOpacity="0.04" />
                  <text x="435" y="45" fill="#fb7185" fontSize="9" textAnchor="middle" opacity="0.7">Vùng III: Khuếch Tán</text>

                  {/* Plot Power Density Area & Curve */}
                  {simResult.polarizationCurve.length > 1 && (() => {
                    const maxP = simResult.maximumPowerDensityMwPerCm2 * 1.15 || 1;
                    const maxJ = simResult.cellSpec.limitingCurrentDensityJLMaPerCm2;
                    const points = simResult.polarizationCurve.map((pt) => {
                      const x = 50 + (pt.currentDensityMaPerCm2 / maxJ) * 440;
                      const y = 230 - (pt.powerDensityMwPerCm2 / maxP) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    const areaPoints = `50,230 ${points.join(' ')} 490,230`;

                    return (
                      <>
                        <polygon points={areaPoints} fill="url(#powerAreaGrad)" />
                        <polyline points={points.join(' ')} fill="none" stroke="url(#powerLineGrad)" strokeWidth="2" />
                      </>
                    );
                  })()}

                  {/* Plot Cell Voltage Curve */}
                  {simResult.polarizationCurve.length > 1 && (() => {
                    const maxJ = simResult.cellSpec.limitingCurrentDensityJLMaPerCm2;
                    const points = simResult.polarizationCurve.map((pt) => {
                      const x = 50 + (pt.currentDensityMaPerCm2 / maxJ) * 440;
                      const y = 230 - (pt.cellVoltageVolts / 1.3) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="url(#voltageLineGrad)"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Operating Point Markers */}
                  {(() => {
                    const maxJ = simResult.cellSpec.limitingCurrentDensityJLMaPerCm2;
                    const maxP = simResult.maximumPowerDensityMwPerCm2 * 1.15 || 1;
                    const currentX = 50 + (simResult.currentDensityMaPerCm2 / maxJ) * 440;
                    const voltageY = 230 - (simResult.operatingCellVoltageV / 1.3) * 200;
                    const powerY = 230 - (simResult.powerDensityMwPerCm2 / maxP) * 200;

                    return (
                      <>
                        {/* Vertical line at current operating j */}
                        <line
                          x1={currentX}
                          y1="30"
                          x2={currentX}
                          y2="230"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        {/* Voltage Point */}
                        <circle cx={currentX} cy={voltageY} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                        {/* Power Point */}
                        <circle cx={currentX} cy={powerY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Losses Breakdown Accordion / Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs">
                  <div className="flex items-center justify-between font-bold text-sky-300">
                    <span>1. η_kích hoạt (Tafel)</span>
                    <span className="font-mono">{(simResult.activationOverpotentialV * 1000).toFixed(0)} mV</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-1">
                    Vượt qua hàng rào năng lượng oxi hóa khử trên bề mặt xúc tác Pt.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
                  <div className="flex items-center justify-between font-bold text-purple-300">
                    <span>2. η_điện trở Ohm</span>
                    <span className="font-mono">{(simResult.ohmicOverpotentialV * 1000).toFixed(0)} mV</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-1">
                    Trở kháng màng dẫn proton Nafion và điện trở tiếp xúc lưỡng cực.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
                  <div className="flex items-center justify-between font-bold text-rose-300">
                    <span>3. η_nồng độ (Khuếch tán)</span>
                    <span className="font-mono">{(simResult.concentrationOverpotentialV * 1000).toFixed(0)} mV</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-1">
                    Tốc độ cấp khí H2/O2 không kịp đáp ứng tiêu thụ khi tiến sát j_L.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cell_architecture' && (
            <div className="bg-navy-dark/80 border border-sky-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  Mô Hình Cắt Lớp Tế Bào Điện Hóa (Tách Biệt Bán Phản Ứng Anode & Cathode)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Dòng electron di chuyển qua mạch ngoài tạo dòng điện 1 chiều, trong khi ion dẫn xuyên qua màng điện phân.
                </p>
              </div>

              {/* Graphical Schematic of Fuel Cell Cross-section */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 p-4 relative flex flex-col justify-between overflow-hidden">
                {/* External Circuit with Lightbulb / Motor */}
                <div className="w-full flex items-center justify-center relative py-2">
                  <div className="w-3/4 h-8 border-t-2 border-l-2 border-r-2 border-amber-400/80 rounded-t-xl flex items-center justify-center relative">
                    <div className="bg-amber-400/20 border border-amber-400 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
                      <Zap className="w-3.5 h-3.5 animate-bounce" />
                      Tải Tiêu Thụ / Động Cơ Điện (e⁻ Flow: {simResult.currentDensityMaPerCm2} mA/cm²)
                    </div>
                  </div>
                </div>

                {/* 3 Main Physical Layers (Anode, Membrane, Cathode) */}
                <div className="grid grid-cols-3 gap-2 h-36 items-stretch">
                  {/* Anode */}
                  <div className="bg-blue-950/40 border border-blue-500/50 rounded-xl p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">CỰC ANODE (-)</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">Pt xúc tác</span>
                      </div>
                      <p className="text-[11px] font-mono text-ivory mt-1">{simResult.cellSpec.anodeReactionVI}</p>
                    </div>
                    <div className="text-[10px] text-blue-300/80 flex items-center gap-1">
                      <Wind className="w-3 h-3" /> Cung cấp nhiên liệu hydro H₂
                    </div>
                  </div>

                  {/* Membrane / Electrolyte */}
                  <div className="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-xl p-3 flex flex-col justify-between items-center text-center">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">MÀNG ĐIỆN PHÂN</span>
                      <p className="text-[10px] text-ivory-muted mt-1">{simResult.cellSpec.electrolyteVI}</p>
                    </div>
                    <div className="p-2 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1">
                      <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                      {simResult.cellSpec.mobileChargeCarrier}
                    </div>
                    <span className="text-[9px] text-emerald-300/70">Không cho electron xuyên qua</span>
                  </div>

                  {/* Cathode */}
                  <div className="bg-rose-950/40 border border-rose-500/50 rounded-xl p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-400">CỰC CATHODE (+)</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">Pt xúc tác</span>
                      </div>
                      <p className="text-[11px] font-mono text-ivory mt-1">{simResult.cellSpec.cathodeReactionVI}</p>
                    </div>
                    <div className="text-[10px] text-rose-300/80 flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Nước tinh khiết H₂O thoát ra
                    </div>
                  </div>
                </div>

                {/* Overall Chemical Formula */}
                <div className="bg-navy-dark/90 border border-sky-500/30 p-2 rounded-lg text-center font-mono text-xs text-sky-200">
                  Phản ứng tổng quát: <span className="font-bold text-white">{simResult.cellSpec.overallReactionVI}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'energy_efficiency' && (
            <div className="bg-navy-dark/80 border border-sky-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-sky-400" />
                  So Sánh Hiệu Suất Năng Lượng & Giới Hạn Carnot
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Pin nhiên liệu chuyển đổi trực tiếp hóa năng thành điện năng qua phản ứng điện hóa, không bị khống chế bởi chu trình nhiệt Carnot.
                </p>
              </div>

              {/* Comparative Progress Bars */}
              <div className="space-y-3 bg-black/30 p-4 rounded-xl border border-navy-light/20">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-sky-300 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {simResult.cellSpec.nameVI.split('(')[0]} (Hiệu suất vận hành hiện tại)
                    </span>
                    <span className="font-mono text-white font-bold">{simResult.thermalEfficiencyHHVPercent}%</span>
                  </div>
                  <div className="w-full bg-navy-light/30 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, simResult.thermalEfficiencyHHVPercent)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-emerald-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Pin SOFC Kết Hợp Thu Hồi Nhiệt Đồng Phát (CHP)
                    </span>
                    <span className="font-mono text-white font-bold">85.0%</span>
                  </div>
                  <div className="w-full bg-navy-light/30 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Động Cơ Đốt Trong Xăng/Diesel (Bị kẹt bởi Carnot)
                    </span>
                    <span className="font-mono text-white font-bold">32.0%</span>
                  </div>
                  <div className="w-full bg-navy-light/30 h-3 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-light/10 border border-sky-500/20 text-xs text-ivory-muted leading-relaxed">
                <p>
                  Theo định luật 2 nhiệt động lực học, nhiệt lượng truyền qua động cơ đốt trong phải tuân theo giới hạn Carnot:{' '}
                  <span className="font-mono text-sky-300">η_Carnot = 1 - T_lạnh / T_nóng</span>, phần lớn năng lượng bị tiêu tán thành nhiệt thải qua ống xả.
                  Ngược lại, pin nhiên liệu hydro biến đổi trực tiếp thế năng hóa học Gibbs (ΔG = -237.13 kJ/mol) thành dòng điện với hiệu suất điện hóa lý thuyết lên tới 83%.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'hydrogen_economy' && (
            <div className="bg-navy-dark/80 border border-sky-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Kinh Tế Hydro Xanh Trong Chiến Lược Quốc Gia Việt Nam Net-Zero 2050
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Chuỗi giá trị năng lượng khép kín: Điện gió ngoài khơi / Điện mặt trời → Điện phân nước → Lưu trữ Hydro → Pin nhiên liệu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-navy-dark border border-navy-light/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                    <Droplets className="w-4 h-4 text-sky-400" />
                    1. Sản Xuất Hydro Xanh (Green Hydrogen)
                  </div>
                  <p className="text-[11px] text-ivory-muted">
                    Sử dụng nguồn điện tái tạo dồi dào tại miền Trung và Tây Nam Bộ để điện phân nước biển hoặc nước ngọt tinh khiết:
                    <br />
                    <span className="font-mono text-sky-300">2 H₂O + Điện tái tạo → 2 H₂ + O₂</span>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-navy-dark border border-navy-light/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    2. Giao Thông Xanh & Công Nghiệp Nặng
                  </div>
                  <p className="text-[11px] text-ivory-muted">
                    Xe buýt đô thị, tàu hỏa đường sắt Bắc-Nam và xe tải hạng nặng đường dài được chuyển đổi sang động cơ pin nhiên liệu PEMFC với thời gian nạp hydro chỉ 3-5 phút và cự ly trên 600 km.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
                <span className="font-bold">Đóng góp cho GDPT 2018:</span> Học sinh nắm vững sự chuyển hóa giữa quang năng, cơ năng gió, thế năng hóa học và điện năng, xây dựng tư duy bảo vệ môi trường và định hướng nghề nghiệp công nghệ bán dẫn - vật liệu mới.
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-sky-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-sky-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Tính Toán Năng Lượng Thực Nghiệm:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-sky-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bảng Điều Khiển Tải Điện Hóa</h3>
            </div>

            {/* Slider 1: Current Density j */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Mật độ dòng j (Tải):</span>
                <span className="font-mono text-sky-300 font-bold">{currentDensity} mA/cm²</span>
              </div>
              <input
                type="range"
                min="10"
                max={simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 - 20}
                step="10"
                value={currentDensity}
                onChange={(e) => handleCurrentChange(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>10 mA</span>
                <span>{(simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 / 2).toFixed(0)} mA</span>
                <span>{simResult.cellSpec.limitingCurrentDensityJLMaPerCm2.toFixed(0)} mA (j_L)</span>
              </div>

              {/* Current Presets */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => handleCurrentChange(50)}
                  className="px-2 py-1 rounded bg-navy-light/20 hover:bg-navy-light/40 text-[10px] text-ivory-muted"
                >
                  Không tải (OCV)
                </button>
                <button
                  onClick={() => handleCurrentChange(Math.round(simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 * 0.45))}
                  className="px-2 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-[10px] text-sky-300 font-bold"
                >
                  Định mức
                </button>
                <button
                  onClick={() => handleCurrentChange(Math.round(simResult.cellSpec.limitingCurrentDensityJLMaPerCm2 * 0.75))}
                  className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-[10px] text-emerald-300 font-bold"
                >
                  Max Công Suất
                </button>
              </div>
            </div>

            {/* Slider 2: Temperature Offset */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Độ lệch nhiệt độ ΔT:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {tempOffset >= 0 ? `+${tempOffset}` : tempOffset} °C (T = {simResult.temperatureCelsius.toFixed(0)} °C)
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                step="5"
                value={tempOffset}
                onChange={(e) => setTempOffset(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>-30 °C</span>
                <span>Chuẩn ({simResult.cellSpec.operatingTempCelsius} °C)</span>
                <span>+50 °C</span>
              </div>
            </div>

            {/* Cell Specifications Card */}
            <div className="space-y-2 pt-2 border-t border-navy-light/30">
              <h4 className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">Thông Số Kỹ Thuật Chi Tiết</h4>
              <div className="text-[11px] space-y-1.5 font-mono text-ivory-muted bg-black/30 p-3 rounded-xl border border-navy-light/20">
                <div className="flex justify-between">
                  <span>Dòng trao đổi j₀:</span>
                  <span className="text-white font-bold">{simResult.cellSpec.exchangeCurrentDensityJ0MaPerCm2} mA/cm²</span>
                </div>
                <div className="flex justify-between">
                  <span>Trở kháng ASR:</span>
                  <span className="text-white font-bold">{simResult.cellSpec.areaSpecificResistanceOhmCm2} Ω·cm²</span>
                </div>
                <div className="flex justify-between">
                  <span>Dòng tới hạn j_L:</span>
                  <span className="text-white font-bold">{simResult.cellSpec.limitingCurrentDensityJLMaPerCm2} mA/cm²</span>
                </div>
                <div className="flex justify-between">
                  <span>Biến thiên Gibbs ΔG:</span>
                  <span className="text-sky-300 font-bold">{simResult.cellSpec.gibbsFreeEnergyDeltaGkJ} kJ/mol</span>
                </div>
                <div className="flex justify-between">
                  <span>Điện áp chuẩn E⁰:</span>
                  <span className="text-sky-300 font-bold">{simResult.cellSpec.standardReversibleVoltageV} V</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
