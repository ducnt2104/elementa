// src/components/visualizations/SalinityGradientOsmoticVisualizer.tsx
// Interactive Visualizer: Salinity Gradient Energy & Osmotic Power (Blue Energy - PRO & RED)
// Conforms to: IUPAC Van 't Hoff Thermodynamics, IEA Ocean Energy Systems & Vietnam GDPT 2018 (Hóa học 11 & 12: Áp suất thẩm thấu Van 't Hoff, Năng lượng Gibbs hòa trộn & Pin điện hóa ion)

import React, { useState, useMemo } from 'react';
import {
  Waves,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Box,
  Droplets,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Factory,
  DollarSign,
  Sun,
  Filter,
  ShieldAlert,
  Wind
} from 'lucide-react';
import {
  OsmoticTechnologyType,
  SalinityWaterSource,
  OsmoticOperatingConditions,
  WATER_SALINITY_PROFILES,
  calculateVanTHoffOsmoticPressure,
  calculateGibbsMixingEnergy,
  simulateOsmoticPowerPlant
} from '../../domain/salinityGradientOsmoticEngine';
import { sound } from '../../audio/soundEngine';

type OsmoticTabMode = 'PRO_MEMBRANE_AND_TURBINE' | 'RED_ION_EXCHANGE_STACK' | 'WATERFALL_HEAD_AND_ECONOMICS';

export const SalinityGradientOsmoticVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OsmoticTabMode>('PRO_MEMBRANE_AND_TURBINE');
  const [selectedTech, setSelectedTech] = useState<OsmoticTechnologyType>('PRESSURE_RETARDED_OSMOSIS');
  const [drawSourceIndex, setDrawSourceIndex] = useState<number>(1); // Default: Standard Seawater

  // Sliders
  const [membraneAreaM2, setMembraneAreaM2] = useState<number>(500000);
  const [riverWaterFlowRateM3s, setRiverWaterFlowRateM3s] = useState<number>(10);
  const [proHydraulicPressureBar, setProHydraulicPressureBar] = useState<number>(13.0);
  const [operatingTempC, setOperatingTempC] = useState<number>(25);

  const feedSource = WATER_SALINITY_PROFILES[0]; // River water
  const drawSource = WATER_SALINITY_PROFILES[drawSourceIndex];

  // Simulation calculations
  const sim = useMemo(() => {
    const conditions: OsmoticOperatingConditions = {
      riverWaterFlowRateM3s,
      seawaterFlowRateM3s: riverWaterFlowRateM3s * 2.5,
      operatingTempC,
      membraneAreaM2,
      proHydraulicPressureBar,
      internalConcentrationPolarizationS: 350,
      membraneWaterPermeabilityA: 3.2,
      membraneSaltPermeabilityB: 0.2
    };
    return simulateOsmoticPowerPlant(selectedTech, feedSource, drawSource, conditions);
  }, [
    selectedTech,
    feedSource,
    drawSource,
    riverWaterFlowRateM3s,
    membraneAreaM2,
    proHydraulicPressureBar,
    operatingTempC
  ]);

  const handleTabChange = (tab: OsmoticTabMode) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  const handleTechChange = (tech: OsmoticTechnologyType) => {
    sound.playUiClick();
    setSelectedTech(tech);
  };

  const handleDrawChange = (idx: number) => {
    sound.playUiClick();
    setDrawSourceIndex(idx);
    if (idx === 2) {
      setProHydraulicPressureBar(26.0); // Boost for SWRO brine
    } else if (idx === 3) {
      setProHydraulicPressureBar(60.0); // Boost for Dead Sea
    } else {
      setProHydraulicPressureBar(13.0); // Standard seawater
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
              <Waves className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Năng Lượng Thẩm Thấu Gradient Độ Mặn (Blue Energy & Osmotic Power)
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  IEA-OES Baseload 24/7
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Thẩm thấu chậm áp suất (Pressure Retarded Osmosis - PRO) &amp; Pin gradient muối (Reverse Electrodialysis - RED)
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('PRO_MEMBRANE_AND_TURBINE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'PRO_MEMBRANE_AND_TURBINE'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Màng Thẩm Thấu PRO & Tua-bin
          </button>
          <button
            onClick={() => handleTabChange('RED_ION_EXCHANGE_STACK')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'RED_ION_EXCHANGE_STACK'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Pin Gradient Muối RED
          </button>
          <button
            onClick={() => handleTabChange('WATERFALL_HEAD_AND_ECONOMICS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'WATERFALL_HEAD_AND_ECONOMICS'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Thác Nước 270m & Kinh Tế LCOE
          </button>
        </div>
      </div>

      {/* Technology & Salinity Source Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Công Nghệ Màng:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTechChange('PRESSURE_RETARDED_OSMOSIS')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'PRESSURE_RETARDED_OSMOSIS'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Thẩm Thấu Chậm Áp Suất (PRO)
            </button>
            <button
              onClick={() => handleTechChange('REVERSE_ELECTRODIALYSIS')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedTech === 'REVERSE_ELECTRODIALYSIS'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Điện Phân Thẩm Thấu Ngược (RED)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Chênh áp thẩm thấu:</span>
            <span className="text-cyan-400 font-bold">Δπ = {sim.osmoticPressureDifferenceBar} bar</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Cột nước tương đương:</span>
            <span className="text-emerald-400 font-bold">{sim.equivalentHydrostaticHeadMeters} mét</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Mật độ công suất:</span>
            <span className="text-amber-400 font-bold">{sim.powerDensityWPerM2} W/m²</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {/* TAB 1: PRO MEMBRANE AND TURBINE */}
        {activeTab === 'PRO_MEMBRANE_AND_TURBINE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* SVG Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Sơ đồ Mô-đun Màng PRO & Tua-bin Thủy Lực Pelton:</span>
                <span className="font-mono text-blue-400">J_w = {sim.waterFluxLmH} L/(m²·h) | ΔP = {proHydraulicPressureBar} bar</span>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                <svg viewBox="0 0 700 420" className="w-full h-full">
                  <defs>
                    <linearGradient id="riverWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="seawaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* PRO Membrane Module Housing */}
                  <rect x="50" y="60" width="380" height="280" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  {/* River Water Feed Channel (Top Half) */}
                  <rect x="60" y="70" width="360" height="110" rx="8" fill="url(#riverWaterGrad)" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="240" y="95" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Kênh Nước Sông / Nước Ngọt (River Water: 0.5 g/L NaCl)
                  </text>
                  <text x="240" y="115" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                    Áp suất khí quyển P = 1.0 bar | Áp suất thẩm thấu π = 0.4 bar
                  </text>

                  {/* Flow Direction Arrow */}
                  <path d="M 80 145 L 380 145" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="240" y="140" fill="#38bdf8" fontSize="9" textAnchor="middle">Dòng nước ngọt chảy qua</text>

                  {/* Semi-permeable TFC Membrane (Center Barrier) */}
                  <rect x="60" y="190" width="360" height="18" fill="#10b981" fillOpacity="0.8" stroke="#34d399" strokeWidth="1.5" />
                  <text x="240" y="203" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Màng Bán Thấm TFC (Polyamide Active Layer: Chỉ Cho Nước Đi Qua)
                  </text>

                  {/* Water molecules permeation arrows across membrane */}
                  {[100, 160, 220, 280, 340, 380].map(x => (
                    <path key={x} d={`M ${x} 175 L ${x} 225`} stroke="#4ade80" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  ))}
                  <text x="240" y="172" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Dòng thẩm thấu tự nhiên J_w (Nước ngọt tự chui qua màng)
                  </text>

                  {/* Pressurized Seawater Draw Channel (Bottom Half) */}
                  <rect x="60" y="218" width="360" height="110" rx="8" fill="url(#seawaterGrad)" stroke="#3b82f6" strokeWidth="1" />
                  <text x="240" y="245" fill="#dbeafe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Kênh Nước Biển Chịu Áp Suất (Seawater Draw: 35 g/L NaCl)
                  </text>
                  <text x="240" y="265" fill="#93c5fd" fontSize="10" textAnchor="middle">
                    Áp suất thủy lực ΔP = {proHydraulicPressureBar} bar | Áp suất thẩm thấu π = 27.2 bar
                  </text>
                  <text x="240" y="295" fill="#60a5fa" fontSize="9" textAnchor="middle">
                    Thể tích nước biển tăng vọt do hút nước ngọt qua màng!
                  </text>

                  {/* High Pressure Pipeline to Hydro-Turbine */}
                  <path d="M 420 280 L 480 280 L 480 180 L 520 180" stroke="#f59e0b" strokeWidth="4" />
                  <text x="470" y="235" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Dòng nén ΔP = {proHydraulicPressureBar} bar
                  </text>

                  {/* Pelton Hydro-Turbine & Generator (Right) */}
                  <g className="cursor-pointer">
                    <circle cx="580" cy="180" r="45" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                    {/* Turbine blades */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                      <line
                        key={deg}
                        x1="580"
                        y1="180"
                        x2={580 + 35 * Math.cos((deg * Math.PI) / 180)}
                        y2={180 + 35 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                    ))}
                    <circle cx="580" cy="180" r="14" fill="#b45309" stroke="#fcd34d" />
                    <text x="580" y="184" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">GEN</text>

                    <text x="580" y="245" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Tua-bin Thủy Lực Pelton
                    </text>
                    <text x="580" y="265" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Công suất: {sim.netPowerExportMw} MW
                    </text>
                    <text x="580" y="285" fill="#4ade80" fontSize="10" textAnchor="middle">
                      Phát điện sạch 24/7
                    </text>
                  </g>

                  {/* Water Discharge from Turbine */}
                  <path d="M 580 225 L 580 340 L 460 340" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
                  <text x="540" y="360" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    Nước lợ xả ra biển tự nhiên (Không ô nhiễm)
                  </text>
                </svg>
              </div>
            </div>

            {/* Operating Parameters & Controls */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-3">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Tham Số Vận Hành Mô-Đun PRO:
                </span>

                {/* Slider 1: PRO Hydraulic Pressure */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">Áp suất thủy lực nén buồng nước biển:</span>
                    <span className="font-mono text-amber-400 font-bold">{proHydraulicPressureBar.toFixed(1)} bar</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={proHydraulicPressureBar}
                    onChange={e => setProHydraulicPressureBar(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>5 bar</span>
                    <span className="text-emerald-400 font-bold">ΔP_opt ≈ Δπ / 2 = 13 bar</span>
                    <span>25 bar</span>
                  </div>
                </div>

                {/* Slider 2: Membrane Area */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">Tổng diện tích màng bán thấm:</span>
                    <span className="font-mono text-cyan-400 font-bold">{(membraneAreaM2 / 1000).toLocaleString()} nghìn m²</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={membraneAreaM2}
                    onChange={e => setMembraneAreaM2(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Slider 3: River Flow Rate */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">Lưu lượng nước ngọt cửa sông:</span>
                    <span className="font-mono text-emerald-400 font-bold">{riverWaterFlowRateM3s} m³/giây</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="2"
                    value={riverWaterFlowRateM3s}
                    onChange={e => setRiverWaterFlowRateM3s(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Theoretical Van 't Hoff Rule */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Info className="w-4 h-4 text-blue-400" />
                  Định Luật Áp Suất Thẩm Thấu Van 't Hoff:
                </span>
                <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                  Δπ = i · ΔC · R · T = 2 × (0.55 - 0.0085 mol/L) × 8.314 × 298.15 ≈ <strong>26.8 bar</strong>.
                </p>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Khi nước ngọt hòa tan vào nước biển, entropy hệ tăng cực đại. Áp suất thẩm thấu 26.8 bar tương đương với <strong>cột nước cao 270 mét</strong>, cho phép tạo ra mật độ công suất màng đạt <strong>{sim.powerDensityWPerM2} W/m²</strong> vượt ngưỡng thương mại (&gt; 5 W/m²).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RED ION EXCHANGE STACK */}
        {activeTab === 'RED_ION_EXCHANGE_STACK' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* RED Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Nguyên Lý Pin Gradient Muối RED (Reverse Electrodialysis):</span>
                <span className="font-mono text-cyan-400">Không Cần Tua-bin — Phát Điện Trực Tiếp!</span>
              </div>

              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                <svg viewBox="0 0 700 420" className="w-full h-full">
                  {/* Anode & Cathode Terminals */}
                  <rect x="50" y="80" width="30" height="240" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                  <text x="65" y="205" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 65 205)">ANODE (-)</text>

                  <rect x="620" y="80" width="30" height="240" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
                  <text x="635" y="205" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(90 635 205)">CATHODE (+)</text>

                  {/* Alternating CEM and AEM membranes */}
                  {/* Cell 1: High Salinity */}
                  <rect x="120" y="90" width="80" height="220" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" />
                  <text x="160" y="200" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Biển</text>
                  <text x="160" y="215" fill="#60a5fa" fontSize="8" textAnchor="middle">Na⁺ + Cl⁻</text>

                  {/* CEM 1 (Cation Exchange Membrane) */}
                  <rect x="200" y="80" width="16" height="240" fill="#ea580c" stroke="#f97316" />
                  <text x="208" y="200" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 208 200)">CEM (Na⁺)</text>

                  {/* Cell 2: Low Salinity */}
                  <rect x="216" y="90" width="80" height="220" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" />
                  <text x="256" y="200" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Sông</text>
                  <text x="256" y="215" fill="#38bdf8" fontSize="8" textAnchor="middle">Ít muối</text>

                  {/* AEM 1 (Anion Exchange Membrane) */}
                  <rect x="296" y="80" width="16" height="240" fill="#0284c7" stroke="#38bdf8" />
                  <text x="304" y="200" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 304 200)">AEM (Cl⁻)</text>

                  {/* Cell 3: High Salinity */}
                  <rect x="312" y="90" width="80" height="220" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" />
                  <text x="352" y="200" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Biển</text>

                  {/* CEM 2 */}
                  <rect x="392" y="80" width="16" height="240" fill="#ea580c" stroke="#f97316" />
                  <text x="400" y="200" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 400 200)">CEM (Na⁺)</text>

                  {/* Cell 4: Low Salinity */}
                  <rect x="408" y="90" width="80" height="220" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" />
                  <text x="448" y="200" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Sông</text>

                  {/* AEM 2 */}
                  <rect x="488" y="80" width="16" height="240" fill="#0284c7" stroke="#38bdf8" />
                  <text x="496" y="200" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 496 200)">AEM (Cl⁻)</text>

                  {/* Cell 5: High Salinity */}
                  <rect x="504" y="90" width="80" height="220" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" />
                  <text x="544" y="200" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Biển</text>

                  {/* Ion Migration Arrows */}
                  <path d="M 170 140 L 210 140" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="190" y="132" fill="#fb923c" fontSize="8" fontWeight="bold">Na⁺</text>

                  <path d="M 340 140 L 300 140" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="320" y="132" fill="#38bdf8" fontSize="8" fontWeight="bold">Cl⁻</text>

                  {/* External Circuit with Lightbulb */}
                  <path d="M 65 80 L 65 30 L 635 30 L 635 80" fill="none" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="350" cy="30" r="18" fill="#eab308" stroke="#fde047" strokeWidth="2" />
                  <text x="350" y="34" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">TẢI</text>
                  <text x="350" y="65" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Dòng Điện Một Chiều DC Sinh Ra Trực Tiếp
                  </text>
                </svg>
              </div>
            </div>

            {/* RED Explanation & Advantages */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-cyan-300 uppercase tracking-wider block">
                  Ưu Điểm Của Pin Gradient Muối (RED Stack):
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Ngược lại với PRO cần tua-bin áp suất cao, công nghệ RED là một thiết bị <strong>trạng thái rắn hoàn toàn (Solid-State)</strong>. Ion Na⁺ và Cl⁻ khuếch tán qua các màng chọn lọc cation (CEM) và anion (AEM), tạo ra hiệu điện thế ~0.18V trên mỗi cặp màng.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="text-cyan-400 font-bold">Xếp chồng hàng nghìn cặp màng:</div>
                  <div className="text-slate-400">1,000 cặp màng × 0.18 V = <strong className="text-white">180 V DC</strong></div>
                  <div className="text-emerald-400">Mật độ công suất: {sim.powerDensityWPerM2} W/m²</div>
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs leading-relaxed space-y-2">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Khả Năng Vận Hành Bền Bỉ:
                </span>
                <p className="text-slate-400 text-[11px]">
                  Không có các chi tiết cơ khí chuyển động, không tiếng ồn, không xâm lấn sinh thái cá sông/biển và hoàn toàn miễn nhiễm với sự cố rò rỉ áp suất cao.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WATERFALL HEAD AND ECONOMICS */}
        {activeTab === 'WATERFALL_HEAD_AND_ECONOMICS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Draw Source Selection */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Chọn Cặp Nguồn Nước Gradient:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Độ mặn càng cao, áp suất thẩm thấu và thế năng thác nước càng lớn
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {WATER_SALINITY_PROFILES.slice(1).map((source, idx) => (
                  <button
                    key={source.name}
                    onClick={() => handleDrawChange(idx + 1)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      drawSourceIndex === idx + 1
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-semibold shadow-sm'
                        : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{source.name}</span>
                      <span className="text-cyan-400 font-mono">π = {source.osmoticPressureBar} bar</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      Độ mặn: <strong className="text-emerald-400">{source.salinityGramsPerLiter} g/L</strong> | Cột nước: <strong className="text-amber-400">{(source.osmoticPressureBar * 10).toFixed(0)} mét</strong>
                    </div>
                  </button>
                ))}
              </div>

              {/* Baseload Comparison Badge */}
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono space-y-1">
                <span className="font-bold text-emerald-300 block">★ Hệ Số Khả Dụng (Capacity Factor): 92%</span>
                <p className="text-slate-400 text-[10px] leading-relaxed font-sans">
                  Khác với năng lượng mặt trời (nghỉ ban đêm) hay gió (ngừng khi lặng gió), nước các dòng sông đổ ra biển liên tục 24/7 suốt 365 ngày, mang lại nguồn <strong>điện nền (Baseload)</strong> tuyệt đối tin cậy cho lưới điện quốc gia!
                </p>
              </div>
            </div>

            {/* Waterfall Comparison Graphic & Power Output */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Thế Năng Khổng Lồ — Tương Đương Thác Nước Tự Nhiên:
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Cột Nước Tương Đương (Head):</span>
                    <span className="text-3xl font-bold font-mono text-cyan-400 block mt-1">
                      {sim.equivalentHydrostaticHeadMeters} m
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Cao gấp 5 lần Thác Niagara 51m!)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Sản Lượng Điện Hàng Năm:</span>
                    <span className="text-3xl font-bold font-mono text-emerald-400 block mt-1">
                      {sim.annualElectricityGenerationGwh} GWh
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Cung cấp điện cho ~8,000 hộ gia đình)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Công Suất Phát Điện Lưới:</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                      {sim.netPowerExportMw} MW
                    </span>
                    <span className="text-[10px] text-slate-500">Gross: {sim.grossPowerOutputMw} MW</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Chi Phí Điện LCOE:</span>
                    <span className="text-xl font-bold font-mono text-white mt-1 block">
                      ${sim.levelizedCostOfElectricityUsdMwh} / MWh
                    </span>
                    <span className="text-[10px] text-slate-500">Cạnh tranh điện than và khí đốt</span>
                  </div>
                </div>
              </div>

              {/* Blue Energy Vietnam Context */}
              <div className="mt-4 p-3 rounded-lg bg-blue-950/20 border border-blue-800/40 text-xs text-blue-300/90 leading-relaxed font-mono">
                <span className="font-bold text-blue-200 block mb-0.5">
                  Tiềm Năng Năng Lượng Lam Tại Việt Nam (Mê Kông & Sông Hồng):
                </span>
                Việt Nam sở hữu hơn 3,260 km bờ biển với hệ thống 9 cửa sông Cửu Long và đồng bằng sông Hồng đổ ra Biển Đông lưu lượng hơn 850 tỷ m³/năm, mang tiềm năng năng lượng thẩm thấu khổng lồ hơn <strong>25,000 MW điện nền sạch</strong> không phát thải carbon!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SalinityGradientOsmoticVisualizer;
