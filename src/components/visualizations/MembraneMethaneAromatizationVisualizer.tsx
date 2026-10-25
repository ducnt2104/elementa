// src/components/visualizations/MembraneMethaneAromatizationVisualizer.tsx
// Interactive Visualizer: Membrane Methane Dehydroaromatization (MDA) to Pure Hydrogen and Benzene
// Conforms to: Le Chatelier Equilibrium Shift, Sieverts' Law Permeation, Mo/ZSM-5 Shape Selectivity & Vietnam GDPT 2018

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Flame,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Gauge,
  Sliders,
  BarChart3,
  Factory,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Sparkles,
  Atom
} from 'lucide-react';
import {
  MdaCatalystType,
  MembraneMaterialType,
  MDA_CATALYST_CATALOG,
  MEMBRANE_CATALOG,
  calculateEquilibriumVsMembrane,
  calculateMembraneFlux,
  calculateMdaPlantBalance,
  evaluateCatalystCoking,
  HYDROGEN_AROMATICS_BENCHMARKS
} from '../../domain/membraneMethaneAromatizationEngine';
import { sound } from '../../audio/soundEngine';

type MdaTabMode =
  | 'LE_CHATELIER_EQUILIBRIUM_AND_REACTOR'
  | 'TECHNO_ECONOMIC_MASS_ENERGY_SIMULATOR'
  | 'COKING_KINETICS_AND_REGENERATION';

export const MembraneMethaneAromatizationVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MdaTabMode>('LE_CHATELIER_EQUILIBRIUM_AND_REACTOR');

  // Mode 1: Equilibrium & Reactor Flow
  const [temperatureC, setTemperatureC] = useState<number>(720);
  const [h2ExtractionRatePct, setH2ExtractionRatePct] = useState<number>(85);
  const [selectedCatalyst, setSelectedCatalyst] = useState<MdaCatalystType>('MO_ZSM5_STANDARD');
  const [selectedMembrane, setSelectedMembrane] = useState<MembraneMaterialType>('CERAMIC_BZY_PEROVSKITE');

  // Mode 2: Plant Simulation
  const [methaneFeedNm3PerHour, setMethaneFeedNm3PerHour] = useState<number>(6000);
  const [feedPressureBar, setFeedPressureBar] = useState<number>(5.0);
  const [permeatePressureBar, setPermeatePressureBar] = useState<number>(0.2);
  const [membraneActive, setMembraneActive] = useState<boolean>(true);

  // Mode 3: Coking & Regeneration
  const [timeOnStreamHours, setTimeOnStreamHours] = useState<number>(3.5);

  // Calculations
  const eqData = useMemo(() => {
    return calculateEquilibriumVsMembrane(temperatureC, h2ExtractionRatePct);
  }, [temperatureC, h2ExtractionRatePct]);

  const fluxData = useMemo(() => {
    return calculateMembraneFlux({
      membraneType: selectedMembrane,
      feedPressureBar,
      permeatePressureBar,
      temperatureC,
      membraneThicknessMicrons: 25.0,
      h2PartialPressureRetentateBar: feedPressureBar * 0.45
    });
  }, [selectedMembrane, feedPressureBar, permeatePressureBar, temperatureC]);

  const plantBalance = useMemo(() => {
    return calculateMdaPlantBalance({
      methaneFeedNm3PerHour,
      operatingTempC: temperatureC,
      feedPressureBar,
      permeatePressureBar,
      catalystType: selectedCatalyst,
      membraneType: selectedMembrane,
      membraneAreaM2: 300,
      membraneActive
    });
  }, [
    methaneFeedNm3PerHour,
    temperatureC,
    feedPressureBar,
    permeatePressureBar,
    selectedCatalyst,
    selectedMembrane,
    membraneActive
  ]);

  const cokingData = useMemo(() => {
    return evaluateCatalystCoking({
      timeOnStreamHours,
      catalystType: selectedCatalyst,
      membraneInSituH2Extraction: membraneActive
    });
  }, [timeOnStreamHours, selectedCatalyst, membraneActive]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400 shadow-inner">
            <Atom className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Lò Phản Ứng Màng Dehydroaromat hóa Metan (MDA) Trực Tiếp
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                6 CH₄ ⇌ C₆H₆ + 9 H₂
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Chuyển hóa khí metan thành benzen thơm và hydro siêu tinh khiết (&gt;99.999%), vượt giới hạn cân bằng Le Chatelier gấp 5 lần nhờ màng gốm BZY
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('LE_CHATELIER_EQUILIBRIUM_AND_REACTOR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'LE_CHATELIER_EQUILIBRIUM_AND_REACTOR'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Lò Phản Ứng Màng & Cân Bằng Le Chatelier
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('TECHNO_ECONOMIC_MASS_ENERGY_SIMULATOR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'TECHNO_ECONOMIC_MASS_ENERGY_SIMULATOR'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Mô Phỏng Cân Bằng & Kinh Tế
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('COKING_KINETICS_AND_REGENERATION');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'COKING_KINETICS_AND_REGENERATION'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Động Học Muội Than & Tái Sinh
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* MODE 1: LE CHATELIER EQUILIBRIUM & REACTOR FLOW */}
        {activeMode === 'LE_CHATELIER_EQUILIBRIUM_AND_REACTOR' && (
          <div className="space-y-6">
            {/* Interactive SVG Diagram of Membrane MDA Reactor */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Sơ Đồ Cấu Trúc Lò Phản Ứng Màng Gốm BZY (Độ Chọn Lọc Hydro H₂/N₂ &gt; 10,000)
                </span>
                <span className="text-[11px] text-slate-400">
                  Phản ứng thu nhiệt: 6 CH₄ ⇌ C₆H₆ + 9 H₂ (ΔH = +598 kJ/mol benzen)
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
                <svg viewBox="0 0 900 270" className="w-full max-w-4xl h-auto select-none">
                  <defs>
                    <linearGradient id="mdaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="h2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>

                  {/* Outer Reactor Shell */}
                  <rect x="60" y="30" width="760" height="200" rx="16" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  <text x="440" y="52" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Vỏ Lò Phản Ứng Màng Đồng Tâm (T = {temperatureC}°C, P = {feedPressureBar} bar)
                  </text>

                  {/* Annular Catalyst Bed (Mo/ZSM-5 beads) */}
                  <rect x="180" y="65" width="520" height="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                  <rect x="180" y="155" width="520" height="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="440" y="88" fill="#fbbf24" fontSize="11" textAnchor="middle">
                    Lớp Xúc Tác Lưỡng Chức Năng Mo/ZSM-5 (Mo₂C hoạt hóa C-H + Zeolit đóng vòng benzen)
                  </text>
                  <text x="440" y="178" fill="#fbbf24" fontSize="11" textAnchor="middle">
                    Kênh Zeolit Kích Thước 5.5 Å (Chọn Lọc Hình Học Ngăn Đóng Vòng 3 Naphthalene)
                  </text>

                  {/* Central Ceramic Membrane Tube (BZY / Pd) */}
                  <rect x="180" y="105" width="520" height="50" rx="4" fill="#134e4a" stroke="#34d399" strokeWidth="2.5" />
                  <text x="440" y="128" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Ống Màng Gốm Dẫn Proton BZY (BaZr₀.₈Y₀.₂O₃₋δ)
                  </text>
                  <text x="440" y="145" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    Khuếch tán chọn lọc 100% H⁺ qua nút mạng oxy (Độ tinh khiết &gt; 99.999%)
                  </text>

                  {/* Permeation arrows (H2 moving into membrane center) */}
                  {[220, 280, 340, 400, 460, 520, 580, 640].map((x, idx) => (
                    <g key={idx}>
                      <line x1={x} y1="75" x2={x} y2="105" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
                      <line x1={x} y1="185" x2={x} y2="155" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
                      <polygon points={`${x-3},100 ${x+3},100 ${x},105`} fill="#34d399" />
                      <polygon points={`${x-3},160 ${x+3},160 ${x},155`} fill="#34d399" />
                    </g>
                  ))}

                  {/* Methane Feed Inlet (Left) */}
                  <rect x="10" y="100" width="110" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="65" y="122" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Dòng Khí Nạp CH₄</text>
                  <text x="65" y="138" fill="#94a3b8" fontSize="9" textAnchor="middle">Metan / Biomethane</text>
                  <line x1="120" y1="125" x2="180" y2="85" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="120" y1="125" x2="180" y2="175" stroke="#38bdf8" strokeWidth="3" />

                  {/* Retentate Outlet (Right top): Benzene + Unreacted CH4 */}
                  <line x1="700" y1="85" x2="770" y2="85" stroke="#f59e0b" strokeWidth="3" />
                  <rect x="770" y="60" width="120" height="50" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="830" y="82" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Dòng Benzen C₆H₆</text>
                  <text x="830" y="98" fill="#94a3b8" fontSize="9" textAnchor="middle">Ngưng tụ thành lỏng</text>

                  {/* Permate Outlet (Right center): Pure Hydrogen H2 */}
                  <line x1="700" y1="130" x2="770" y2="130" stroke="#34d399" strokeWidth="4" />
                  <rect x="770" y="120" width="120" height="50" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="830" y="142" fill="#34d399" fontSize="11" fontWeight="black" textAnchor="middle">HYDRO TINH KHIẾT</text>
                  <text x="830" y="158" fill="#6ee7b7" fontSize="9" textAnchor="middle">&gt; 99.999% H₂ (Pin FCEV)</text>
                </svg>
              </div>
            </div>

            {/* Controls and Le Chatelier Multiplier */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Temperature Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nhiệt Độ Phản Ứng (T):</span>
                  <span className="text-amber-400 font-bold">{temperatureC}°C</span>
                </div>
                <input
                  type="range"
                  min="650"
                  max="800"
                  step="5"
                  value={temperatureC}
                  onChange={e => {
                    sound.playUiClick();
                    setTemperatureC(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">
                  Phản ứng thu nhiệt lớn (ΔH = +99.7 kJ/mol CH₄). Nhiệt độ tối ưu 700 - 740°C cân bằng giữa tốc độ chuyển hóa và độ bền xúc tác.
                </div>
              </div>

              {/* H2 Extraction Rate Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Tỷ Lệ Trích Ly Hydro Tại Chỗ:</span>
                  <span className="text-emerald-400 font-bold">{h2ExtractionRatePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="95"
                  step="5"
                  value={h2ExtractionRatePct}
                  onChange={e => {
                    sound.playUiClick();
                    setH2ExtractionRatePct(parseInt(e.target.value));
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">
                  Trích ly liên tục 9 mol H₂ làm giảm áp suất riêng phần hydro trong lò, kéo cân bằng Le Chatelier dịch chuyển về phía tạo benzen.
                </div>
              </div>

              {/* Le Chatelier Multiplier Card */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/40 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400">Hệ Số Tăng Cường Chuyển Hóa Le Chatelier:</div>
                  <div className="text-3xl font-black text-amber-300 mt-1">
                    {eqData.conversionEnhancementFactor}x
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Cân bằng cố định (1 bar):</span>
                    <span className="font-bold text-slate-400">{eqData.equilibriumMethaneConversionPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lò phản ứng màng BZY:</span>
                    <span className="font-bold text-emerald-400">{eqData.membraneMethaneConversionPct}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalyst and Membrane Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Xúc Tác Lưỡng Chức Năng:</label>
                <select
                  value={selectedCatalyst}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedCatalyst(e.target.value as MdaCatalystType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 focus:outline-none focus:border-amber-500"
                >
                  {Object.values(MDA_CATALYST_CATALOG).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Độ chọn lọc C₆H₆: {c.typicalBenzeneSelectivityPct}%)
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  {MDA_CATALYST_CATALOG[selectedCatalyst].description}
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Màng Tách Hydro Chọn Lọc:</label>
                <select
                  value={selectedMembrane}
                  onChange={e => {
                    sound.playUiClick();
                    setSelectedMembrane(e.target.value as MembraneMaterialType);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                >
                  {Object.values(MEMBRANE_CATALOG).map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} (T: {m.operatingTempRangeC[0]}-{m.operatingTempRangeC[1]}°C)
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  {MEMBRANE_CATALOG[selectedMembrane].description}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: TECHNO-ECONOMIC SIMULATOR */}
        {activeMode === 'TECHNO_ECONOMIC_MASS_ENERGY_SIMULATOR' && (
          <div className="space-y-6">
            {/* Input Controls */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Thông Số Vận Hành & Quy Mô Nhà Máy Đồng Sản Xuất Hydro-Benzen
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Lưu lượng khí Metan nạp:</span>
                    <span className="font-bold text-amber-400">{methaneFeedNm3PerHour.toLocaleString()} Nm³/h</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    step="500"
                    value={methaneFeedNm3PerHour}
                    onChange={e => {
                      sound.playUiClick();
                      setMethaneFeedNm3PerHour(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Áp suất nạp (P_feed):</span>
                    <span className="font-bold text-cyan-400">{feedPressureBar.toFixed(1)} bar</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={feedPressureBar}
                    onChange={e => {
                      sound.playUiClick();
                      setFeedPressureBar(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Áp suất thẩm thấu (P_perm):</span>
                    <span className="font-bold text-emerald-400">{permeatePressureBar.toFixed(2)} bar</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={permeatePressureBar}
                    onChange={e => {
                      sound.playUiClick();
                      setPermeatePressureBar(parseFloat(e.target.value));
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400">Chế độ vận hành lò:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setMembraneActive(!membraneActive);
                    }}
                    className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      membraneActive
                        ? 'bg-amber-600/80 text-white border border-amber-400'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {membraneActive ? '✓ Bật Màng BZY Tách H₂' : '✕ Lò Cố Định Thông Thường'}
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Sản Lượng Benzen Tinh Khiết</span>
                  <Droplets className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300">
                  {plantBalance.benzeneProductionKgPerHour.toLocaleString()} <span className="text-sm font-normal text-amber-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Đạt <span className="font-semibold text-amber-300">{plantBalance.benzeneAnnualMetricTons.toLocaleString()} tấn/năm</span> (~${(plantBalance.annualBenzeneMarketValueUsd / 1e6).toFixed(2)}M/năm)
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Hydro Siêu Tinh Khiết (&gt;99.999%)</span>
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-300">
                  {plantBalance.pureHydrogenProducedNm3PerHour.toLocaleString()} <span className="text-sm font-normal text-emerald-400">Nm³/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Đạt <span className="font-semibold text-emerald-300">{plantBalance.hydrogenAnnualMetricTons.toLocaleString()} tấn/năm</span> (~${(plantBalance.annualHydrogenValueUsd / 1e6).toFixed(2)}M/năm)
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Nhiệt Thu Phản Ứng (Endothermic)</span>
                  <Flame className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-black text-rose-300">
                  {plantBalance.endothermicHeatRequiredMwTh} <span className="text-sm font-normal text-rose-400">MWth</span>
                </div>
                <div className="text-xs text-slate-400">
                  Cần cấp nhiệt cao tần hoặc hạt nhân MSR/CSP
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Khí CO₂ Tránh Phát Thải Vs SMR</span>
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-teal-300">
                  {plantBalance.co2AvoidedVsSmrTonsPerYear.toLocaleString()} <span className="text-sm font-normal text-teal-400">tấn/năm</span>
                </div>
                <div className="text-xs text-slate-400">
                  Không thải CO₂ trực tiếp; carbon hóa vào benzen
                </div>
              </div>
            </div>

            {/* Total Annual Revenue Synergy Banner */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Tổng Doanh Thu Đồng Sản Xuất Hydro &amp; Benzen Hóa Dầu
                </div>
                <div className="text-2xl font-black text-slate-100 mt-1">
                  ${((plantBalance.annualBenzeneMarketValueUsd + plantBalance.annualHydrogenValueUsd) / 1e6).toFixed(2)} Triệu USD / năm
                </div>
              </div>
              <div className="text-xs text-slate-400 text-right">
                <div>Benzen: ${(plantBalance.annualBenzeneMarketValueUsd / 1e6).toFixed(2)}M (Giá $950/tấn)</div>
                <div>Hydro FCEV: ${(plantBalance.annualHydrogenValueUsd / 1e6).toFixed(2)}M (Giá $4.50/kg)</div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: COKING KINETICS & REGENERATION */}
        {activeMode === 'COKING_KINETICS_AND_REGENERATION' && (
          <div className="space-y-6">
            {/* Coking Simulator */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                Động Học Tích Tụ Muội Than Graphit &amp; Tái Sinh Xúc Tác Mo/ZSM-5
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Thời Gian Vận Hành Liên Tục (Time-on-Stream):</span>
                    <span className="text-amber-400 font-bold">{timeOnStreamHours.toFixed(1)} giờ</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="24.0"
                    step="0.5"
                    value={timeOnStreamHours}
                    onChange={e => {
                      sound.playUiClick();
                      setTimeOnStreamHours(parseFloat(e.target.value));
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Chu kỳ tái sinh khuyến nghị: mỗi 8 - 12 giờ
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lượng muội than lắng đọng:</span>
                    <span className="font-bold text-rose-400">{cokingData.carbonCokeDepositedWtPct} wt%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hoạt tính xúc tác còn lại:</span>
                    <span className="font-bold text-emerald-400">{cokingData.relativeActivityPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trạng thái kênh xốp 5.5 Å:</span>
                    <span className={`font-bold ${cokingData.isRegenerationRequired ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {cokingData.isRegenerationRequired ? 'Bị nghẽn bởi Coke' : 'Thông suốt'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs ${
                !cokingData.isRegenerationRequired
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                {!cokingData.isRegenerationRequired ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {!cokingData.isRegenerationRequired ? 'XÚC TÁC ĐANG HOẠT ĐỘNG ỔN ĐỊNH' : 'CẦN KÍCH HOẠT QUY TRÌNH TÁI SINH'}
                  </div>
                  <div className="leading-relaxed">{cokingData.regenerationIntervention}</div>
                </div>
              </div>
            </div>

            {/* Benchmark Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-400" />
                So Sánh 4 Công Nghệ Sản Xuất Hydro &amp; Thu Hồi Giá Trị Carbon
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border-collapse">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Công Nghệ</th>
                      <th className="py-2.5 px-3">Nguyên Liệu</th>
                      <th className="py-2.5 px-3">Phát Thải CO₂</th>
                      <th className="py-2.5 px-3">Trạng Thái Carbon</th>
                      <th className="py-2.5 px-3">Hiệu Suất LHV</th>
                      <th className="py-2.5 px-3">Độ Tinh Khiết H₂</th>
                      <th className="py-2.5 px-3">Sản Phẩm Phụ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {HYDROGEN_AROMATICS_BENCHMARKS.map((b, idx) => (
                      <tr key={idx} className={b.processName.includes('MDA') ? 'bg-amber-950/20 font-semibold' : 'hover:bg-slate-900/50'}>
                        <td className="py-2.5 px-3 font-bold text-slate-100">{b.processName}</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.feedstock}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{b.co2EmissionsKgPerKgH2} kg/kg H₂</td>
                        <td className="py-2.5 px-3 text-amber-300">{b.productStateOfCarbon}</td>
                        <td className="py-2.5 px-3 font-mono text-cyan-300">{b.energyEfficiencyLhvPct}%</td>
                        <td className="py-2.5 px-3 text-emerald-300 font-bold">{b.hydrogenPurityRawPct}</td>
                        <td className="py-2.5 px-3 text-slate-400">{b.byproductCommercialValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BAR */}
      <div className="bg-slate-900/90 p-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-amber-400" />
          <span>
            Le Chatelier Shift ({eqData.conversionEnhancementFactor}x) • Màng Gốm BZY • Xúc Tác Mo/ZSM-5 (5.5 Å) • 0.0 kg CO₂ Trực Tiếp
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Thông lượng H₂ = {fluxData.h2PermeationFluxMolPerM2S} mol/(m²·s) • Độ chọn lọc C₆H₆ = {eqData.benzeneSelectivityPct}%
        </div>
      </div>
    </div>
  );
};
