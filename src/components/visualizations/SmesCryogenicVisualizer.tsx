// src/components/visualizations/SmesCryogenicVisualizer.tsx
// Interactive Visualizer: Superconducting Magnetic Energy Storage (SMES) & Cryo-Hydrogen Hybrid Engine
// Conforms to: IEEE Std 1547 / 1045, REBCO 2G HTS at 20 K, Liquid Hydrogen Dual-Role Synergy & Vietnam GDPT 2018

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Sparkles,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Gauge,
  Flame,
  ShieldCheck,
  TrendingDown,
  RefreshCw,
  Sliders,
  BarChart3,
  Leaf
} from 'lucide-react';
import {
  SuperconductorTapeClass,
  CryogenCoolantType,
  SUPERCONDUCTOR_CATALOG,
  CRYOGEN_COOLANT_CATALOG,
  calculateSmesPerformance,
  calculateLh2CryoSynergy,
  evaluateQuenchProtection,
  ENERGY_STORAGE_BENCHMARKS
} from '../../domain/smesCryogenicEngine';
import { sound } from '../../audio/soundEngine';

type SmesTabMode =
  | 'SMES_COIL_AND_MAGNETIC_ENERGY'
  | 'LH2_CRYO_ENERGY_HUB_SYNERGY'
  | 'QUENCH_DYNAMICS_AND_STORAGE_BENCHMARK';

export const SmesCryogenicVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SmesTabMode>('SMES_COIL_AND_MAGNETIC_ENERGY');

  // Mode 1 state: Superconductor, Coolant, Coil params
  const [scType, setScType] = useState<SuperconductorTapeClass>('REBCO_2G_YBCO');
  const [coolantType, setCoolantType] = useState<CryogenCoolantType>('LIQUID_HYDROGEN_LH2_20K');
  const [inductanceH, setInductanceH] = useState<number>(0.5);
  const [operatingCurrentA, setOperatingCurrentA] = useState<number>(2500);
  const [magneticFieldT, setMagneticFieldT] = useState<number>(8.0);

  // Mode 2 state: LH2 Cryo Synergy
  const [lh2FlowRateKgH, setLh2FlowRateKgH] = useState<number>(120);
  const [heatLeakWatts, setHeatLeakWatts] = useState<number>(250);

  // Mode 3 state: Quench protection
  const [dumpResistorOhms, setDumpResistorOhms] = useState<number>(0.50);

  const selectedSc = useMemo(() => {
    return SUPERCONDUCTOR_CATALOG[scType] || SUPERCONDUCTOR_CATALOG.REBCO_2G_YBCO;
  }, [scType]);

  const selectedCoolant = useMemo(() => {
    return CRYOGEN_COOLANT_CATALOG[coolantType] || CRYOGEN_COOLANT_CATALOG.LIQUID_HYDROGEN_LH2_20K;
  }, [coolantType]);

  const handleModeSwitch = (mode: SmesTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleScSelect = (sc: SuperconductorTapeClass) => {
    sound.playUiClick();
    setScType(sc);
  };

  const handleCoolantSelect = (c: CryogenCoolantType) => {
    sound.playUiClick();
    setCoolantType(c);
  };

  // Calculations for Mode 1
  const smesPerf = useMemo(() => {
    return calculateSmesPerformance({
      inductanceHenries: inductanceH,
      operatingCurrentAmperes: operatingCurrentA,
      peakMagneticFieldTesla: magneticFieldT,
      coilRadiusMeters: 0.6,
      coilHeightMeters: 1.0,
      superconductorType: scType,
      coolantType: coolantType
    });
  }, [inductanceH, operatingCurrentA, magneticFieldT, scType, coolantType]);

  // Calculations for Mode 2
  const synergy = useMemo(() => {
    return calculateLh2CryoSynergy(smesPerf.storedEnergyMwh, heatLeakWatts, lh2FlowRateKgH);
  }, [smesPerf.storedEnergyMwh, heatLeakWatts, lh2FlowRateKgH]);

  // Calculations for Mode 3
  const quench = useMemo(() => {
    return evaluateQuenchProtection(inductanceH, operatingCurrentA, dumpResistorOhms);
  }, [inductanceH, operatingCurrentA, dumpResistorOhms]);

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Lưu Trữ Năng Lượng Từ Trường Siêu Dẫn (SMES) & Hydro Lỏng LH₂
              </h2>
              <p className="text-xs text-slate-400">
                Hiệu suất vòng nạp-xả 96.5% • Phản ứng tức thì &lt;5ms • Tích hợp làm mát bằng nhiên liệu hydro lỏng 20 K
              </p>
            </div>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeSwitch('SMES_COIL_AND_MAGNETIC_ENERGY')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SMES_COIL_AND_MAGNETIC_ENERGY'
                ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Cuộn Cảm Siêu Dẫn & Từ Trường
          </button>
          <button
            onClick={() => handleModeSwitch('LH2_CRYO_ENERGY_HUB_SYNERGY')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'LH2_CRYO_ENERGY_HUB_SYNERGY'
                ? 'bg-indigo-600/30 border border-indigo-500 text-indigo-300 shadow-md shadow-indigo-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            Tổ Hợp Năng Lượng Kép LH₂
          </button>
          <button
            onClick={() => handleModeSwitch('QUENCH_DYNAMICS_AND_STORAGE_BENCHMARK')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'QUENCH_DYNAMICS_AND_STORAGE_BENCHMARK'
                ? 'bg-amber-600/30 border border-amber-500 text-amber-300 shadow-md shadow-amber-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Dập Quench & So Sánh Lưu Trữ
          </button>
        </div>
      </div>

      {/* MODE 1: SMES COIL & MAGNETIC ENERGY */}
      {activeMode === 'SMES_COIL_AND_MAGNETIC_ENERGY' && (
        <div className="space-y-6">
          {/* Controls: Material, Coolant, Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            {/* Superconductor Tape Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Vật Liệu Băng Siêu Dẫn:
              </label>
              <div className="space-y-1.5">
                {(Object.keys(SUPERCONDUCTOR_CATALOG) as SuperconductorTapeClass[]).map(scKey => {
                  const sc = SUPERCONDUCTOR_CATALOG[scKey];
                  const isSelected = scType === scKey;
                  return (
                    <button
                      key={scKey}
                      onClick={() => handleScSelect(scKey)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                          : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-[12px]">{sc.name.split('(')[0].trim()}</div>
                      <div className="text-[10px] text-slate-400 flex justify-between mt-0.5">
                        <span>Tc: <b className="text-cyan-400">{sc.criticalTemperatureTcK} K</b></span>
                        <span className="text-emerald-400 font-semibold">{sc.criticalMagneticFieldAt20KTesla} T @ 20K</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coolant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                Môi Chất Làm Lạnh Siêu Cực:
              </label>
              <div className="space-y-1.5">
                {(Object.keys(CRYOGEN_COOLANT_CATALOG) as CryogenCoolantType[]).map(cKey => {
                  const c = CRYOGEN_COOLANT_CATALOG[cKey];
                  const isSelected = coolantType === cKey;
                  return (
                    <button
                      key={cKey}
                      onClick={() => handleCoolantSelect(cKey)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-blue-950/40 border-blue-500 text-blue-200'
                          : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-[12px]">{c.name.split('(')[0].trim()}</div>
                      <div className="text-[10px] text-slate-400 flex justify-between mt-0.5">
                        <span>T_sôi: <b className="text-blue-400">{c.boilingPointK} K</b></span>
                        {c.dualRoleAsFuel && (
                          <span className="text-emerald-400 font-bold">Nhiên Liệu Kép LH₂</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coil Sliders: Inductance & Current */}
            <div className="space-y-3 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Độ Tự Cảm Cuộn Dây (L):</span>
                  <span className="text-cyan-400 font-bold">{inductanceH.toFixed(2)} Henry</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={inductanceH}
                  onChange={e => {
                    sound.playUiClick();
                    setInductanceH(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Dòng Điện Siêu Dẫn (I):</span>
                  <span className="text-amber-400 font-bold">{operatingCurrentA.toLocaleString()} A</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="250"
                  value={operatingCurrentA}
                  onChange={e => {
                    sound.playUiClick();
                    setOperatingCurrentA(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Từ Trường Đỉnh (B):</span>
                  <span className="text-rose-400 font-bold">{magneticFieldT.toFixed(1)} Tesla</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="16.0"
                  step="0.5"
                  value={magneticFieldT}
                  onChange={e => {
                    sound.playUiClick();
                    setMagneticFieldT(parseFloat(e.target.value));
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interactive SMES Coil & Magnetic Flux SVG */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 px-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                Sơ Đồ Cuộn Cảm Siêu Dẫn & Đường Sức Từ Trường B (E = ½ L·I²)
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Hiệu suất vòng: {smesPerf.roundTripEfficiencyPct}% • Trễ đáp ứng: {smesPerf.responseDelayMilliseconds} ms
              </span>
            </div>

            <div className="relative overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-64 select-none">
                <defs>
                  <linearGradient id="magneticFluxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Outer Cryostat Vacuum Chamber */}
                <rect x="120" y="20" width="600" height="240" fill="#0f172a" stroke="#334155" strokeWidth="2" rx="16" />
                <text x="420" y="42" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Bình Cryostat Chân Không Cách Nhiệt Đa Lớp (MLI) • Làm Mát Bằng {selectedCoolant.name}
                </text>

                {/* Magnetic Field Flux Lines (Ellipses) */}
                {[140, 180, 220, 260].map((rx, idx) => (
                  <ellipse
                    key={rx}
                    cx="420"
                    cy="140"
                    rx={rx}
                    ry={75 + idx * 12}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={idx === 0 ? "2.5" : "1.5"}
                    strokeOpacity={0.85 - idx * 0.18}
                    strokeDasharray={idx % 2 === 0 ? "5,5" : "none"}
                  />
                ))}

                {/* Superconducting Left Solenoid Block */}
                <rect x="230" y="70" width="55" height="140" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="6" />
                {/* Winding wire strands */}
                {[80, 100, 120, 140, 160, 180, 200].map(wy => (
                  <circle key={wy} cx="257" cy={wy} r="5" fill="#f59e0b" stroke="#78350f" />
                ))}
                <text x="257" y="145" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(-90 257 145)" fontWeight="bold">
                  Băng {selectedSc.name.split(' ')[0]} (I = {operatingCurrentA} A)
                </text>

                {/* Superconducting Right Solenoid Block */}
                <rect x="555" y="70" width="55" height="140" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="6" />
                {[80, 100, 120, 140, 160, 180, 200].map(wy => (
                  <circle key={wy} cx="582" cy={wy} r="5" fill="#f59e0b" stroke="#78350f" />
                ))}
                <text x="582" y="145" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(90 582 145)" fontWeight="bold">
                  Băng {selectedSc.name.split(' ')[0]} (I = {operatingCurrentA} A)
                </text>

                {/* Core Magnetic Field Vector & Energy Density Label */}
                <g transform="translate(420, 140)">
                  <rect x="-90" y="-35" width="180" height="70" fill="#022c22" stroke="#10b981" strokeWidth="1.5" rx="8" />
                  <text x="0" y="-12" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
                    Từ Trường B = {magneticFieldT.toFixed(1)} T
                  </text>
                  <text x="0" y="8" fill="#ffffff" fontSize="16" textAnchor="middle" fontWeight="black">
                    {smesPerf.storedEnergyMegaJoules} MJ
                  </text>
                  <text x="0" y="24" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    ({smesPerf.storedEnergyKwh} kWh lưu trữ)
                  </text>
                </g>

                {/* Carbon Fiber Hoop Stress Banding Overwrap */}
                <rect x="220" y="60" width="10" height="160" fill="#475569" stroke="#1e293b" rx="2" />
                <rect x="610" y="60" width="10" height="160" fill="#475569" stroke="#1e293b" rx="2" />
                <text x="420" y="235" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                  Vành Đai Sợi Carbon Siêu Bền Chịu Ứng Suất Lorentz: σ = {smesPerf.hoopStressMpa} MPa (Hệ số an toàn: {smesPerf.burstProtectionFactor}x)
                </text>
              </svg>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Năng lượng từ lưu trữ:</span>
                <span className="font-bold text-cyan-400 text-sm">{smesPerf.storedEnergyMegaJoules} MJ ({smesPerf.storedEnergyKwh} kWh)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mật độ năng lượng từ u:</span>
                <span className="font-bold text-emerald-400 text-sm">{smesPerf.magneticEnergyDensityMjPerM3} MJ/m³</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Công suất phát 10s:</span>
                <span className="font-bold text-amber-400 text-sm">{smesPerf.peakDischargePowerMw} MW</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tuổi thọ chu kỳ:</span>
                <span className="font-bold text-purple-400 text-sm">{smesPerf.cycleLifeCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: LH2 CRYO-ENERGY HUB SYNERGY */}
      {activeMode === 'LH2_CRYO_ENERGY_HUB_SYNERGY' && (
        <div className="space-y-6">
          {/* Sliders for LH2 flow and heat leak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Lưu Lượng Dòng Hydro Lỏng (LH₂):</span>
                <span className="text-cyan-400 font-bold">{lh2FlowRateKgH} kg/giờ</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="20"
                value={lh2FlowRateKgH}
                onChange={e => {
                  sound.playUiClick();
                  setLh2FlowRateKgH(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>20 kg/h (Trạm nạp xe)</span>
                <span>500 kg/h (Hub năng lượng lớn)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Nhiệt Lượng Rò Rỉ Cryo (Watts):</span>
                <span className="text-amber-400 font-bold">{heatLeakWatts} Watts</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={heatLeakWatts}
                onChange={e => {
                  sound.playUiClick();
                  setHeatLeakWatts(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>50 W (Cách nhiệt chân không cao)</span>
                <span>800 W (Thanh dẫn dòng lớn)</span>
              </div>
            </div>
          </div>

          {/* Synergy Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Điện Lạnh Tiết Kiệm</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {synergy.cryogenicPowerSavedKw} <span className="text-sm font-normal text-emerald-400">kW</span>
              </div>
              <div className="text-xs text-slate-400">
                Không cần máy nén heli cơ học đắt tiền
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Năng Lượng Hóa Học LH₂</span>
                <Droplets className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-300">
                {synergy.hybridChemicalEnergyMwhLhv} <span className="text-sm font-normal text-blue-400">MWh LHV</span>
              </div>
              <div className="text-xs text-slate-400">
                Dòng chảy {lh2FlowRateKgH} kg/h hydro sạch
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Tổng Dung Lượng Hub</span>
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {synergy.totalHybridSystemEnergyMwh} <span className="text-sm font-normal text-cyan-400">MWh</span>
              </div>
              <div className="text-xs text-slate-400">
                Kết hợp điện siêu tốc SMES + hóa thô LH₂
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Tiết Kiệm Tiền Điện Làm Lạnh</span>
                <Leaf className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-black text-green-300">
                ${synergy.annualRefrigerationCostSavedUsd.toLocaleString()} <span className="text-sm font-normal text-green-400">/năm</span>
              </div>
              <div className="text-xs text-slate-400">
                Tận dụng nhiệt ẩn bay hơi của hydro
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: QUENCH DYNAMICS & BENCHMARKS */}
      {activeMode === 'QUENCH_DYNAMICS_AND_STORAGE_BENCHMARK' && (
        <div className="space-y-6">
          {/* Quench Simulator */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Hệ Thống Dập Quench Khẩn Cấp (Emergency Dump Resistor: V_dump = I · R_dump)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Điện Trở Xả Năng Lượng (R_dump):</span>
                  <span className="text-amber-400 font-bold">{dumpResistorOhms.toFixed(2)} Ω</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={dumpResistorOhms}
                  onChange={e => {
                    sound.playUiClick();
                    setDumpResistorOhms(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Điện áp phóng đỉnh V_dump:</span>
                  <span className="font-bold text-rose-400">{quench.peakDumpVoltageVolts} V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hằng số thời gian xả (tau = L/R):</span>
                  <span className="font-bold text-cyan-400">{quench.quenchDischargeTimeConstantSec} giây</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nhiệt độ điểm nóng cực hạn:</span>
                  <span className="font-bold text-emerald-400">{quench.hotSpotTemperatureK} K</span>
                </div>
              </div>
            </div>

            <div className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 ${
              quench.isSafeQuench
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              {quench.isSafeQuench ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {quench.isSafeQuench ? 'Hệ Thống Dập Quench An Toàn Đạt Chuẩn' : 'Cảnh Báo Quá Áp / Quá Nhiệt'}
                </div>
                <div>{quench.intervention}</div>
              </div>
            </div>
          </div>

          {/* Grid Storage Benchmarks */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              So Sánh Kỹ Thuật 4 Công Nghệ Lưu Trữ Năng Lượng Lưới Điện
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {ENERGY_STORAGE_BENCHMARKS.map(bench => (
                <div
                  key={bench.technologyName}
                  className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-sm text-cyan-300">{bench.technologyName}</div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hiệu suất vòng (RTE):</span>
                        <span className="font-bold text-emerald-400">{bench.roundTripEfficiencyPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tốc độ phản ứng:</span>
                        <span className="font-bold text-cyan-400">{bench.responseSpeed}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Suy hao hàng năm:</span>
                        <span className="font-bold text-amber-400">{bench.degradationPerYearPct}%/năm</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                      {bench.description}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-700/50 pt-2 italic">
                    Tuổi thọ chu kỳ: {bench.cycleLifeCount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
