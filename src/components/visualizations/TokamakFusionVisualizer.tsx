// src/components/visualizations/TokamakFusionVisualizer.tsx
// Interactive Visualizer: Tokamak Magnetic Confinement Fusion & Plasma Chemistry
// Conforms to: IUPAC Nuclear Chemistry, IAEA Fusion Standards, ITER & High-Field REBCO Benchmarks

import React, { useState, useMemo } from 'react';
import {
  Atom,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Droplets,
  Layers,
  ThermometerSun,
  Radio,
  Timer,
  Cpu,
  ShieldAlert,
  Flame,
  Globe2,
  Anchor
} from 'lucide-react';
import {
  FusionFuelReaction,
  MagnetTechnology,
  BlanketBreederType,
  TokamakParameters,
  FUSION_REACTIONS_CATALOG,
  BLANKET_CATALOG,
  calculateTokamakPerformance
} from '../../domain/tokamakFusionEngine';
import { sound } from '../../audio/soundEngine';

type TokamakTabMode =
  | 'TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT'
  | 'TRITIUM_BREEDING_BLANKET_RADIOCHEMISTRY'
  | 'DIVERTOR_EXHAUST_AND_POWER_GRID_BALANCE';

export const TokamakFusionVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TokamakTabMode>('TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT');
  const [selectedReaction, setSelectedReaction] = useState<FusionFuelReaction>('DEUTERIUM_TRITIUM');
  const [selectedBlanket, setSelectedBlanket] = useState<BlanketBreederType>('LIQUID_PB16LI_EUTECTIC');
  const [selectedMagnet, setSelectedMagnet] = useState<MagnetTechnology>('REBCO_HIGH_TEMP_SUPERCONDUCTOR');

  // Sliders
  const [toroidalMagneticFieldTesla, setToroidalMagneticFieldTesla] = useState<number>(8.5);
  const [plasmaCurrentMA, setPlasmaCurrentMA] = useState<number>(14.0);
  const [ionTemperatureKeV, setIonTemperatureKeV] = useState<number>(15.0);
  const [electronDensity10e19M3, setElectronDensity10e19M3] = useState<number>(11.0);
  const [energyConfinementTimeS, setEnergyConfinementTimeS] = useState<number>(3.5);
  const [auxiliaryHeatingPowerMw, setAuxiliaryHeatingPowerMw] = useState<number>(45.0);

  // Machine Scale preset
  const [machineScale, setMachineScale] = useState<'ITER_STANDARD' | 'COMPACT_REBCO_ARC'>('COMPACT_REBCO_ARC');

  const dimensions = useMemo(() => {
    if (machineScale === 'ITER_STANDARD') {
      return { majorRadiusM: 6.2, minorRadiusM: 2.0 };
    }
    return { majorRadiusM: 3.3, minorRadiusM: 1.1 };
  }, [machineScale]);

  // Tokamak Performance Calculation
  const result = useMemo(() => {
    const params: TokamakParameters = {
      majorRadiusM: dimensions.majorRadiusM,
      minorRadiusM: dimensions.minorRadiusM,
      toroidalMagneticFieldTesla,
      plasmaCurrentMA,
      electronDensity10e19M3,
      ionTemperatureKeV,
      energyConfinementTimeS,
      auxiliaryHeatingPowerMw,
      fuelReaction: selectedReaction,
      blanketType: selectedBlanket,
      magnetTechnology: selectedMagnet
    };
    return calculateTokamakPerformance(params);
  }, [
    dimensions,
    toroidalMagneticFieldTesla,
    plasmaCurrentMA,
    electronDensity10e19M3,
    ionTemperatureKeV,
    energyConfinementTimeS,
    auxiliaryHeatingPowerMw,
    selectedReaction,
    selectedBlanket,
    selectedMagnet
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border border-purple-800/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Atom className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Magnetic Confinement Fusion (Tokamak) & Plasma Chemistry</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
              Lò Phản Ứng Nhiệt Hạch Tokamak & Vật Lý Plasma Giam Giữ Từ Trường
            </h2>
            <p className="text-purple-200/80 text-sm mt-1 max-w-3xl leading-relaxed">
              Mô phỏng phản ứng tổng hợp hạt nhân Đơteri - Triti (²H + ³H → ⁴He + n + 17.6 MeV) ở nhiệt độ 174 triệu °C, tiêu chuẩn Lawson
              (n·T·τ_E), từ trường siêu dẫn REBCO (12 Tesla), chăn tái sinh Triti và hệ thống tản nhiệt Divertor vonfram.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-900/60 border border-purple-500/40 rounded-lg text-purple-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <ThermometerSun className="w-3.5 h-3.5 text-purple-400" />
              <span>T_plasma: {result.plasmaState.temperatureMillionCelsius}°C</span>
            </span>
            <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Q = {result.nuclearReactionsAndHeating.energyGainFactorQ}x</span>
            </span>
            <span className="px-3 py-1 bg-cyan-900/60 border border-cyan-500/40 rounded-lg text-cyan-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>TBR: {result.tritiumBreedingCycle.tritiumBreedingRatioTBR}</span>
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-purple-900/50">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT'
                ? 'bg-purple-500 text-obsidian shadow-lg shadow-purple-500/30 font-extrabold ring-2 ring-purple-300'
                : 'bg-obsidian/40 text-purple-200/80 hover:bg-purple-950/60 hover:text-white border border-purple-800/40'
            }`}
          >
            <Atom className="w-4 h-4" />
            <span>1. Buồng Tokamak & Từ Trường Giam Giữ Plasma</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TRITIUM_BREEDING_BLANKET_RADIOCHEMISTRY');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'TRITIUM_BREEDING_BLANKET_RADIOCHEMISTRY'
                ? 'bg-purple-500 text-obsidian shadow-lg shadow-purple-500/30 font-extrabold ring-2 ring-purple-300'
                : 'bg-obsidian/40 text-purple-200/80 hover:bg-purple-950/60 hover:text-white border border-purple-800/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Chăn Liti Tái Sinh Triti & Phản Ứng Hạt Nhân</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('DIVERTOR_EXHAUST_AND_POWER_GRID_BALANCE');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'DIVERTOR_EXHAUST_AND_POWER_GRID_BALANCE'
                ? 'bg-purple-500 text-obsidian shadow-lg shadow-purple-500/30 font-extrabold ring-2 ring-purple-300'
                : 'bg-obsidian/40 text-purple-200/80 hover:bg-purple-950/60 hover:text-white border border-purple-800/40'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>3. Tản Nhiệt Divertor & Cân Bằng Điện Xuất Lưới</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TOKAMAK CHAMBER & MAGNETIC CONFINEMENT */}
      {activeTab === 'TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Controls Column */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
              <Gauge className="w-4 h-4 text-purple-400" />
              <span>Thông Số Vận Hành Tokamak</span>
            </h3>

            {/* Architecture Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Cấu Hình Lò Phản Ứng (Machine Scale):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setMachineScale('COMPACT_REBCO_ARC');
                    setSelectedMagnet('REBCO_HIGH_TEMP_SUPERCONDUCTOR');
                    setToroidalMagneticFieldTesla(11.5);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    machineScale === 'COMPACT_REBCO_ARC'
                      ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Gọn Từ Trường Cao (ARC REBCO)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setMachineScale('ITER_STANDARD');
                    setSelectedMagnet('NBSN_LOW_TEMP_SUPERCONDUCTOR');
                    setToroidalMagneticFieldTesla(5.3);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    machineScale === 'ITER_STANDARD'
                      ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Chuẩn Nghiên Cứu Lớn (ITER)
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Từ Trường Hình Xuyến (Toroidal Field B_T):</span>
                  <span className="font-mono text-purple-400 font-bold">{toroidalMagneticFieldTesla.toFixed(1)} Tesla</span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="13.0"
                  step="0.1"
                  value={toroidalMagneticFieldTesla}
                  onChange={e => setToroidalMagneticFieldTesla(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Dòng Điện Plasma (Plasma Current I_p):</span>
                  <span className="font-mono text-amber-400 font-bold">{plasmaCurrentMA.toFixed(1)} MA</span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="18.0"
                  step="0.5"
                  value={plasmaCurrentMA}
                  onChange={e => setPlasmaCurrentMA(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Nhiệt Độ Ion Plasma (T_i):</span>
                  <span className="font-mono text-rose-400 font-bold">
                    {ionTemperatureKeV.toFixed(1)} keV (~{Math.round(ionTemperatureKeV * 11.6)}M °C)
                  </span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="25.0"
                  step="0.5"
                  value={ionTemperatureKeV}
                  onChange={e => setIonTemperatureKeV(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Mật Độ Điện Tử (Electron Density n_e):</span>
                  <span className="font-mono text-cyan-400 font-bold">{electronDensity10e19M3.toFixed(1)} × 10¹⁹ m⁻³</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="18.0"
                  step="0.5"
                  value={electronDensity10e19M3}
                  onChange={e => setElectronDensity10e19M3(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Thời Gian Giam Giữ Năng Lượng (τ_E):</span>
                  <span className="font-mono text-emerald-400 font-bold">{energyConfinementTimeS.toFixed(2)} giây</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={energyConfinementTimeS}
                  onChange={e => setEnergyConfinementTimeS(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Lawson Criterion Status Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-300">Tiêu Chuẩn Lawson (Triple Product):</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded ${
                    result.plasmaState.isLawsonIgnitionMet
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                      : 'bg-amber-950 text-amber-400 border border-amber-600'
                  }`}
                >
                  {result.plasmaState.isLawsonIgnitionMet ? 'ĐẠT NGƯỠNG BÙNG NỔ' : 'DƯỚI TỚI HẠN'}
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Tích n · T · τ_E:</span>
                  <span className="text-purple-300 font-bold">
                    {result.plasmaState.lawsonTripleProductKeVsM3.toExponential(2)} keV·s/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ngưỡng Tự Duy Trì (Ignition):</span>
                  <span className="text-slate-500">
                    {result.plasmaState.lawsonIgnitionThresholdKeVsM3.toExponential(2)} keV·s/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Biên Độ Vượt Ngưỡng:</span>
                  <span className="text-emerald-400 font-bold">{result.plasmaState.tripleProductMarginFactor}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Animated Tokamak Cross-Section SVG */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
                <Atom className="w-4 h-4 text-purple-400" />
                <span>Trắc Diện Buồng Chân Không & Vòng Plasma Tokamak</span>
              </h3>

              {/* Interactive SVG Diagram */}
              <div className="mt-4 bg-slate-950/90 border border-purple-950 rounded-xl p-4 flex items-center justify-center">
                <svg viewBox="0 0 460 340" className="w-full max-w-md h-auto font-sans">
                  <defs>
                    <radialGradient id="plasmaGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                      <stop offset="40%" stopColor="#a855f7" stopOpacity="0.85" />
                      <stop offset="80%" stopColor="#6366f1" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </radialGradient>
                    <linearGradient id="coilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                  </defs>

                  {/* Central Solenoid Magnet */}
                  <rect x="25" y="30" width="40" height="280" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="45" y="165" fill="#38bdf8" fontSize="8" fontWeight="bold" transform="rotate(-90 45,165)" textAnchor="middle">
                    CUỘN SOLENOID TRUNG TÂM (I_p = {plasmaCurrentMA} MA)
                  </text>

                  {/* Outer Cryostat & Vacuum Vessel Wall */}
                  <path
                    d="M 100 40 C 260 30, 420 80, 420 170 C 420 260, 260 310, 100 300 Z"
                    fill="#0f172a"
                    stroke="#64748b"
                    strokeWidth="4"
                  />

                  {/* Breeding Blanket Shell (Lithium) */}
                  <path
                    d="M 112 52 C 248 42, 400 90, 400 170 C 400 250, 248 298, 112 288 Z"
                    fill="#1e1b4b"
                    stroke="#a855f7"
                    strokeWidth="6"
                    strokeDasharray="6 3"
                  />

                  {/* First Wall Armor (Tungsten) */}
                  <path
                    d="M 125 65 C 235 55, 380 100, 380 170 C 380 240, 235 285, 125 275 Z"
                    fill="#090d16"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  {/* D-Shaped Elongated Plasma Torus Core (Hotter than the Sun!) */}
                  <path
                    d="M 145 95 C 220 80, 345 110, 345 170 C 345 230, 220 260, 145 245 C 165 200, 165 140, 145 95 Z"
                    fill="url(#plasmaGlow)"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                  />

                  {/* Magnetic flux helical field lines */}
                  <ellipse cx="245" cy="170" rx="75" ry="55" fill="none" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <ellipse cx="245" cy="170" rx="45" ry="32" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />

                  {/* Plasma core label */}
                  <text x="245" y="165" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
                    VÙNG LÕI PLASMA
                  </text>
                  <text x="245" y="180" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {result.plasmaState.temperatureMillionCelsius}°C ({result.plasmaState.temperatureKeV} keV)
                  </text>

                  {/* Divertor Assembly at the bottom (Target plate) */}
                  <polygon points="195,290 220,270 270,270 295,290 245,305" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                  <text x="245" y="286" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">
                    DIVERTOR VONFRAM (W)
                  </text>

                  {/* Exhaust ash particles towards divertor */}
                  <circle cx="235" cy="255" r="2" fill="#38bdf8" />
                  <circle cx="245" cy="260" r="2.5" fill="#38bdf8" />
                  <circle cx="255" cy="255" r="2" fill="#38bdf8" />

                  {/* Toroidal Field Coils on Right */}
                  <rect x="428" y="50" width="16" height="240" rx="4" fill="url(#coilGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="436" y="170" fill="#e0f2fe" fontSize="7" fontWeight="bold" transform="rotate(90 436,170)" textAnchor="middle">
                    CUỘN TỪ HÌNH XUYẾN REBCO ({toroidalMagneticFieldTesla}T)
                  </text>
                </svg>
              </div>
            </div>

            {/* Quick Physics Callout */}
            <div className="bg-purple-950/40 border border-purple-800/40 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Giam Giữ Từ Trường Xoắn Ốc (Helical Magnetic Confinement):</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Từ trường hình xuyến B_T ({toroidalMagneticFieldTesla} Tesla) kết hợp với dòng điện plasma I_p ({plasmaCurrentMA} MA)
                tạo ra các đường sức từ xoắn ốc khép kín, triệt tiêu lực đẩy phân ly điện tích, giam giữ plasma nóng hơn tâm Mặt Trời 10 lần mà không chạm vào thành buồng!
              </p>
            </div>
          </div>

          {/* Right Column: Fusion Power & Gain Metrics */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>Năng Lượng Phản Ứng & Hệ Số Khuếch Đại Q</span>
            </h3>

            <div className="space-y-3">
              {/* Fusion Power Total */}
              <div className="bg-purple-950/50 border border-purple-500/50 rounded-xl p-4 flex justify-between items-center shadow-lg">
                <div>
                  <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">Công Suất Nhiệt Hạch (P_fusion):</div>
                  <div className="text-2xl font-black text-white font-mono">
                    {result.nuclearReactionsAndHeating.fusionPowerThermalMw} MWth
                  </div>
                  <div className="text-[11px] text-purple-200/70 mt-0.5">
                    Hệ số khuếch đại: <span className="font-mono font-bold text-emerald-400">Q = {result.nuclearReactionsAndHeating.energyGainFactorQ}x</span> (P_aux = {auxiliaryHeatingPowerMw} MW)
                  </div>
                </div>
                <Flame className="w-8 h-8 text-purple-400" />
              </div>

              {/* Energy Split: Alpha vs Neutron */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Phân Phối Năng Lượng Phản Ứng D-T:</span>
                  <span className="font-mono text-purple-300">17.58 MeV / phản ứng</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-rose-400 font-bold">Hạt Alpha (⁴He 3.5 MeV):</div>
                    <div className="text-sm font-black text-white">{result.nuclearReactionsAndHeating.alphaSelfHeatingPowerMw} MW</div>
                    <div className="text-[10px] text-slate-500">20% Tự sưởi ấm plasma</div>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-cyan-400 font-bold">Neutron Nhanh (14.1 MeV):</div>
                    <div className="text-sm font-black text-white">{result.nuclearReactionsAndHeating.neutronPowerMw} MW</div>
                    <div className="text-[10px] text-slate-500">80% Sinh điện & tạo Triti</div>
                  </div>
                </div>
              </div>

              {/* Active Fuel in Core (Inherent Safety) */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>An Toàn Cố Hữu Tuyệt Đối (Inherent Safety):</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Lượng nhiên liệu thực tế trong buồng plasma chỉ có{' '}
                  <span className="font-mono text-emerald-300 font-bold">{result.environmentalSafetyCheck.activeFuelInventoryInCoreGrams} gram</span>!
                  Không thể xảy ra nổ hạt nhân hay nóng chảy rò rỉ thảm họa như Chernobyl, vì khi mất chân không phản ứng tự tắt trong 1 phần nghìn giây.
                </p>
              </div>

              {/* Net Clean Electricity Generation */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
                <div>
                  <div className="text-slate-400">Điện Năng Thuần Xuất Lưới:</div>
                  <div className="text-base font-black text-emerald-400 font-mono">
                    +{result.powerPlantEnergyBalance.netElectricPowerExportMw} MWe ({result.powerPlantEnergyBalance.annualCleanElectricityGwh} GWh/năm)
                  </div>
                </div>
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRITIUM BREEDING BLANKET RADIOCHEMISTRY */}
      {activeTab === 'TRITIUM_BREEDING_BLANKET_RADIOCHEMISTRY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Blanket Materials & Radiochemical Physics */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Hóa Học Phóng Xạ Tái Tạo Triti Trong Lớp Chăn Liti</span>
            </h3>

            {/* Blanket Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Vật Liệu Chăn Tái Sinh Liti (Breeding Blanket):</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedBlanket('LIQUID_PB16LI_EUTECTIC');
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedBlanket === 'LIQUID_PB16LI_EUTECTIC'
                      ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Kim Loại Lỏng Chì-Liti (Pb-16Li)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedBlanket('SOLID_CERAMIC_LI4SIO4_BE');
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedBlanket === 'SOLID_CERAMIC_LI4SIO4_BE'
                      ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Gốm Rắn Liti + Beryli (Li₄SiO₄)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedBlanket('FLIBE_MOLTEN_SALT');
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedBlanket === 'FLIBE_MOLTEN_SALT'
                      ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Muối Nóng Chảy FLiBe (2LiF·BeF₂)
                </button>
              </div>
            </div>

            {/* Nuclear Breeding Equations */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div className="text-xs font-bold text-purple-300 border-b border-slate-800 pb-2">
                Phương Trình Phản Ứng Tái Tạo Triti (^3H) Với Neutron 14.1 MeV:
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg space-y-1 font-mono">
                <div className="text-emerald-400 font-bold">1. Phản ứng Liti-6 nhiệt (Tỏa nhiệt):</div>
                <div className="text-white text-xs">⁶Li + n → ⁴He (2.05 MeV) + ³H (2.73 MeV) + 4.78 MeV</div>
                <div className="text-[10px] text-slate-400">Tiết diện bắt neutron nhiệt cực lớn (940 barns)</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg space-y-1 font-mono">
                <div className="text-cyan-400 font-bold">2. Phản ứng Liti-7 nhanh (Thu nhiệt, bảo tồn neutron):</div>
                <div className="text-white text-xs">⁷Li + n (nhanh) → ⁴He + ³H + n' - 2.47 MeV</div>
                <div className="text-[10px] text-slate-400">Sinh Triti mà vẫn giải phóng tiếp neutron thứ cấp n'</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg space-y-1 font-mono">
                <div className="text-amber-400 font-bold">3. Phản ứng nhân đôi neutron của Beryli / Chì:</div>
                <div className="text-white text-xs">⁹Be + n (14 MeV) → 2 ⁴He + 2 n' - 1.57 MeV / ²⁰⁸Pb(n, 2n)</div>
                <div className="text-[10px] text-slate-400">Nhân 1 neutron thành 2 neutron, bù đắp thất thoát hình học</div>
              </div>
            </div>

            {/* Blanket Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-purple-950/50 p-3 rounded-xl border border-purple-800/40">
                <div className="text-purple-300 font-semibold">Tỷ Số Tái Sinh Triti (TBR):</div>
                <div className="text-2xl font-black text-purple-400 font-mono mt-0.5">
                  TBR = {result.tritiumBreedingCycle.tritiumBreedingRatioTBR}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1 font-bold">Tự túc nhiên liệu 100% (TBR &gt; 1.05)</div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400">Thặng Dư Triti Hàng Năm:</div>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  +{result.tritiumBreedingCycle.netTritiumSurplusKgPerYear} kg
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Dùng để khởi động lò nhiệt hạch mới</div>
              </div>
            </div>
          </div>

          {/* Tritium Extraction & Fuel Cycle Balance */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Cân Bằng Tiêu Thụ & Tinh Chế Nhiên Liệu Triti</span>
              </h3>

              <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Lượng Triti tiêu thụ mỗi ngày:</span>
                  <span className="font-mono text-rose-400 font-bold">
                    -{result.tritiumBreedingCycle.tritiumConsumptionGramsPerDay} g/ngày
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Lượng Triti sinh ra từ lớp chăn Liti:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    +{result.tritiumBreedingCycle.tritiumProductionGramsPerDay} g/ngày
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Chất tải nhiệt mang Triti ra ngoài:</span>
                  <span className="font-mono text-purple-300">{result.tritiumBreedingCycle.blanketInfo.coolantFluid}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nhiệt độ lớp chăn Liti:</span>
                  <span className="font-mono text-amber-300">{result.tritiumBreedingCycle.blanketInfo.operatingTemperatureC}°C</span>
                </div>
              </div>
            </div>

            {/* Fuel Abundance Statement */}
            <div className="bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-4 text-xs space-y-1">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>Nhiên Liệu Vô Tận Cho Toàn Nhân Loại:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Đơteri (²H) có sẵn trong nước biển (33 gram trong 1 m³ nước). Liti (Li) có dồi dào trong quặng và nước biển.
                Năng lượng nhiệt hạch từ 1 cốc nước biển và 1 viên pin lithium của laptop có thể cung cấp toàn bộ điện năng cho một người dân suốt 30 năm!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIVERTOR EXHAUST & POWER GRID BALANCE */}
      {activeTab === 'DIVERTOR_EXHAUST_AND_POWER_GRID_BALANCE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top 4 Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Thermal Power to Turbines */}
            <div className="bg-slate-900/80 border border-purple-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 uppercase">Nhiệt Năng Vào Tuabin</span>
                <Flame className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {result.powerPlantEnergyBalance.thermalPowerToTurbinesMw} MWth
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Nhiệt lượng từ neutron hấp thụ trong lớp chăn (nhân 1.18x) kết hợp nhiệt dư tản từ plasma.
              </div>
            </div>

            {/* 2. Gross Electric Power */}
            <div className="bg-slate-900/80 border border-blue-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase">Điện Phát Gộp Tuabin</span>
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-400 font-mono">
                {result.powerPlantEnergyBalance.grossElectricPowerMw} MWe
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Tuabin sCO₂ Brayton / hơi nước siêu tới hạn đạt hiệu suất nhiệt 46% từ nguồn nhiệt 650°C.
              </div>
            </div>

            {/* 3. Divertor Mitigated Heat Flux */}
            <div className="bg-slate-900/80 border border-amber-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Tải Nhiệt Divertor</span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {result.divertorAndWallSafety.detachedDivertorHeatFluxMwPerM2} MW/m²
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Phun khí trơ Argon/Neon làm nguội plasma bức xạ, hạ tải nhiệt dưới ngưỡng giới hạn vonfram (10 MW/m²).
              </div>
            </div>

            {/* 4. Net Electric Power Export */}
            <div className="bg-slate-900/80 border border-emerald-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase">Điện Xuất Lưới Thuần</span>
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +{result.powerPlantEnergyBalance.netElectricPowerExportMw} MWe
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Đã trừ điện tự dùng cho sưởi ấm NBI/RF và hệ thống làm lạnh siêu dẫn cryostat ({result.powerPlantEnergyBalance.auxiliarySystemsElectricConsumptionMw} MW).
              </div>
            </div>
          </div>

          {/* Plant Power Flow & Safety Analysis */}
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-900/40 pb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sơ Đồ Dòng Năng Lượng & Đánh Giá An Toàn Môi Trường Lò Nhiệt Hạch</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="font-bold text-purple-300">Cân Bằng Điện Tự Dùng Nhà Máy (Balance of Plant):</div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Công suất sưởi bổ sung (NBI/ECRH):</span>
                    <span className="text-amber-400">-{auxiliaryHeatingPowerMw * 2} MWe (Hiệu suất 50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Điện làm lạnh siêu dẫn (Cryogenics):</span>
                    <span className="text-cyan-400">
                      -{selectedMagnet === 'REBCO_HIGH_TEMP_SUPERCONDUCTOR' ? '6.5' : '22.0'} MWe (REBCO 20K tiết kiệm 70%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bơm tuần hoàn và hệ thống phụ trợ:</span>
                    <span className="text-slate-400">-12.0 MWe</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold">
                    <span className="text-white">Tổng điện năng tự dùng:</span>
                    <span className="text-rose-400">
                      -{result.powerPlantEnergyBalance.auxiliarySystemsElectricConsumptionMw} MWe
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="font-bold text-emerald-300">So Sánh Chất Thải Hạt Nhân Với Lò Phân Hạch:</div>
                <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300">
                  <p>
                    <span className="font-bold text-white">Không có Actinide tồn lưu dài:</span> Nhiệt hạch không tạo ra bất kỳ đồng vị Plutoni hay rác thải có tuổi thọ hàng trăm nghìn năm.
                  </p>
                  <p>
                    <span className="font-bold text-white">Vật liệu kích hoạt thấp (EUROFER):</span> Vỏ kim loại bị neutron kích hoạt sẽ giảm phóng xạ về mức nền an toàn sau 50 - 100 năm và có thể tái chế hoàn toàn để xây dựng lò phản ứng thế hệ tiếp theo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
