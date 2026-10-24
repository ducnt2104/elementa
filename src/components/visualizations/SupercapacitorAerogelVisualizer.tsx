// src/components/visualizations/SupercapacitorAerogelVisualizer.tsx
// Interactive Visualizer: Supercapacitors, Pseudocapacitance & Graphene Aerogels
// Standards: IUPAC Physical & Materials Chemistry & Vietnam GDPT 2018 (Vật liệu Năng lượng & Điện hóa Siêu tụ điện)

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  Gauge,
  Box,
  Cpu,
  Atom,
  TrendingUp,
  Snowflake,
  Wind
} from 'lucide-react';
import {
  ELECTRODE_MATERIALS_CATALOG,
  ELECTROLYTE_CATALOG,
  RAGONE_BENCHMARK_CATALOG,
  calculateSupercapacitorCellMetrics,
  simulateCyclicVoltammetry,
  simulateGrapheneAerogelFreezeDrying
} from '../../domain/supercapacitorAerogelEngine';
import { sound } from '../../audio/soundEngine';

type SupercapTabMode = 'CELL_METRICS_CV' | 'RAGONE_PLOT' | 'AEROGEL_SYNTHESIS';

export const SupercapacitorAerogelVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SupercapTabMode>('CELL_METRICS_CV');

  // Mode 1: Cell Metrics & CV State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('GRAPHENE_AEROGEL');
  const [selectedElectrolyteId, setSelectedElectrolyteId] = useState<string>('ORGANIC_ACN_TEABF4');
  const [electrodeMassGrams, setElectrodeMassGrams] = useState<number>(10.0);
  const [scanRateMvS, setScanRateMvS] = useState<number>(20);

  // Mode 3: Aerogel Freeze-Drying State
  const [freezingTempCelsius, setFreezingTempCelsius] = useState<number>(-50);
  const [goPrecursorConcentration, setGoPrecursorConcentration] = useState<number>(3.0);

  // Computed: Cell Metrics
  const cellMetrics = useMemo(() => {
    return calculateSupercapacitorCellMetrics(selectedMaterialId, selectedElectrolyteId, electrodeMassGrams);
  }, [selectedMaterialId, selectedElectrolyteId, electrodeMassGrams]);

  // Computed: CV Curve
  const cvCurvePoints = useMemo(() => {
    return simulateCyclicVoltammetry(selectedMaterialId, scanRateMvS, cellMetrics.cellVoltageV);
  }, [selectedMaterialId, scanRateMvS, cellMetrics.cellVoltageV]);

  // Computed: Aerogel Synthesis
  const aerogelSynthesis = useMemo(() => {
    return simulateGrapheneAerogelFreezeDrying(freezingTempCelsius, goPrecursorConcentration);
  }, [freezingTempCelsius, goPrecursorConcentration]);

  const handleTabChange = (mode: SupercapTabMode) => {
    sound.playUiClick();
    setActiveTab(mode);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Siêu Tụ Điện, Giả Điện Dung & Khí Gel Graphene 3D
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                IUPAC / GDPT 2018
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Mô phỏng EDLC, Giả điện dung Faradaic Conway, Đồ thị Ragone & Đông khô Ice-Templating
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleTabChange('CELL_METRICS_CV')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'CELL_METRICS_CV'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Điện Hóa & Đường Cong CV
          </button>
          <button
            onClick={() => handleTabChange('RAGONE_PLOT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'RAGONE_PLOT'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Đồ Thị Ragone
          </button>
          <button
            onClick={() => handleTabChange('AEROGEL_SYNTHESIS')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'AEROGEL_SYNTHESIS'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            Khí Gel Graphene 3D
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {/* TAB 1: CELL METRICS & CYCLIC VOLTAMMETRY */}
        {activeTab === 'CELL_METRICS_CV' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Material Selection */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    1. Vật Liệu Điện Cực Siêu Tụ
                  </label>
                  <div className="space-y-2">
                    {ELECTRODE_MATERIALS_CATALOG.map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedMaterialId(mat.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          selectedMaterialId === mat.id
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{mat.nameVi}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {mat.chemicalFormula} • {mat.specificCapacitanceFg} F/g • {mat.specificSurfaceAreaM2g} m²/g
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          mat.mechanism === 'EDLC_ELECTROSTATIC'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : mat.mechanism === 'PSEUDOCAPACITIVE_FARADAIC'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-purple-950 text-purple-400 border border-purple-800'
                        }`}>
                          {mat.mechanism === 'EDLC_ELECTROSTATIC' ? 'EDLC' : mat.mechanism === 'PSEUDOCAPACITIVE_FARADAIC' ? 'Faradaic' : 'Lai Ghép'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Electrolyte Selection */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    2. Hệ Dung Dịch Điện Ly & Cửa Sổ Thế
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ELECTROLYTE_CATALOG.map(elec => (
                      <button
                        key={elec.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedElectrolyteId(elec.id);
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          selectedElectrolyteId === elec.id
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{elec.nameVi.split(' ')[0]} {elec.nameVi.split(' ')[1]}</div>
                        <div className="text-[11px] font-mono text-emerald-400 mt-1">V_max: {elec.operatingVoltageWindowV} V</div>
                        <div className="text-[10px] text-slate-400 font-mono">{elec.ionicConductivitymScm} mS/cm</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Tốc độ quét Vôn-Ampe (v):</span>
                      <span className="font-mono text-emerald-400 font-semibold">{scanRateMvS} mV/s</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={scanRateMvS}
                      onChange={e => setScanRateMvS(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Khối lượng điện cực cell (m):</span>
                      <span className="font-mono text-emerald-400 font-semibold">{electrodeMassGrams} g</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={electrodeMassGrams}
                      onChange={e => setElectrodeMassGrams(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Display & CV Plot Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Metrics Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Điện Dung Cell (C)</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                      {cellMetrics.totalCapacitanceFarads} <span className="text-xs">F</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Mật Độ Năng Lượng (E)</div>
                    <div className="text-lg font-bold text-amber-400 font-mono mt-1">
                      {cellMetrics.energyDensityWhKg} <span className="text-xs">Wh/kg</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Công Suất Đỉnh (P_max)</div>
                    <div className="text-lg font-bold text-cyan-400 font-mono mt-1">
                      {cellMetrics.maxPowerDensityWKg} <span className="text-xs">W/kg</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Thời Gian Phóng (t)</div>
                    <div className="text-lg font-bold text-purple-400 font-mono mt-1">
                      {cellMetrics.typicalDischargeTimeSeconds} <span className="text-xs">s</span>
                    </div>
                  </div>
                </div>

                {/* Cyclic Voltammetry SVG Canvas */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      Đường Cong Vôn-Ampe Tuần Hoàn (Cyclic Voltammogram - CV)
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      v = {scanRateMvS} mV/s | V_cell = {cellMetrics.cellVoltageV} V
                    </span>
                  </div>

                  {/* SVG Plot */}
                  <div className="h-64 w-full flex items-center justify-center">
                    <svg viewBox="-50 -120 400 240" className="w-full h-full">
                      {/* Grid Lines */}
                      <line x1="0" y1="0" x2="320" y2="0" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="0" y1="-100" x2="0" y2="100" stroke="#334155" strokeWidth="1.5" />
                      <line x1="320" y1="-100" x2="320" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />

                      {/* Axis Labels */}
                      <text x="160" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        Điện Thế Hoạt Động V (0V → {cellMetrics.cellVoltageV}V)
                      </text>
                      <text x="-25" y="-5" fill="#94a3b8" fontSize="9" textAnchor="middle" transform="rotate(-90 -25 -5)" fontFamily="monospace">
                        Dòng Điện I (mA)
                      </text>

                      {/* Scale markers */}
                      <text x="0" y="15" fill="#64748b" fontSize="8" textAnchor="middle">0.0V</text>
                      <text x="160" y="15" fill="#64748b" fontSize="8" textAnchor="middle">{(cellMetrics.cellVoltageV / 2).toFixed(2)}V</text>
                      <text x="320" y="15" fill="#64748b" fontSize="8" textAnchor="middle">{cellMetrics.cellVoltageV.toFixed(1)}V</text>

                      {/* Zero line badge */}
                      <text x="-10" y="3" fill="#64748b" fontSize="8" textAnchor="end">0</text>

                      {/* CV Curve Path */}
                      {(() => {
                        if (cvCurvePoints.length === 0) return null;
                        // Find max abs current to normalize y scale
                        const maxCurrent = Math.max(...cvCurvePoints.map(p => Math.abs(p.currentMa)), 1.0);
                        const scaleX = 320 / cellMetrics.cellVoltageV;
                        const scaleY = 90 / maxCurrent;

                        const pathData = cvCurvePoints.map((p, idx) => {
                          const x = p.potentialV * scaleX;
                          const y = -p.currentMa * scaleY; // SVG inverted y
                          return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                        }).join(' ') + ' Z';

                        return (
                          <g>
                            {/* Area fill */}
                            <path
                              d={pathData}
                              fill={cellMetrics.material.mechanism === 'EDLC_ELECTROSTATIC' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}
                              stroke={cellMetrics.material.mechanism === 'EDLC_ELECTROSTATIC' ? '#10b981' : '#f59e0b'}
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            />
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Mechanism & Reaction Box */}
                  <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">Cơ Chế Tích Trữ:</span>
                      <span className="font-mono text-emerald-400">{cellMetrics.material.mechanismNameVi}</span>
                    </div>
                    {cellMetrics.material.redoxReactionVi && (
                      <div className="pt-1.5 border-t border-slate-800/80">
                        <span className="text-slate-400 block text-[11px] mb-0.5">Phản Ứng Oxi Hóa - Khử Bề Mặt (Faradaic Redox):</span>
                        <code className="text-amber-300 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded block overflow-x-auto">
                          {cellMetrics.material.redoxReactionVi}
                        </code>
                      </div>
                    )}
                    <div className="pt-1 text-[11px] text-slate-400">
                      <strong className="text-slate-300">Ưu điểm:</strong> {cellMetrics.material.advantagesVi}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RAGONE PLOT */}
        {activeTab === 'RAGONE_PLOT' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Đồ Thị Ragone: Cầu Nối Giữa Tụ Điện & Pin Năng Lượng
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mật độ công suất (W/kg) vs Mật độ năng lượng (Wh/kg) trên thang đo Logarithmic
                  </p>
                </div>
                <div className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  Thời gian phóng: t = E / P
                </div>
              </div>

              {/* SVG Ragone Canvas */}
              <div className="mt-6 h-80 w-full flex items-center justify-center bg-slate-950/80 rounded-xl p-4 border border-slate-800/80">
                <svg viewBox="0 0 540 300" className="w-full h-full">
                  {/* Axis */}
                  <line x1="60" y1="260" x2="500" y2="260" stroke="#475569" strokeWidth="2" />
                  <line x1="60" y1="260" x2="60" y2="20" stroke="#475569" strokeWidth="2" />

                  {/* Grid Lines */}
                  <line x1="170" y1="260" x2="170" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="280" y1="260" x2="280" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="390" y1="260" x2="390" y2="20" stroke="#1e293b" strokeDasharray="3,3" />

                  <line x1="60" y1="200" x2="500" y2="200" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="60" y1="140" x2="500" y2="140" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="60" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="3,3" />

                  {/* Labels X: Energy Density Wh/kg */}
                  <text x="60" y="278" fill="#64748b" fontSize="9" textAnchor="middle">0.01</text>
                  <text x="170" y="278" fill="#64748b" fontSize="9" textAnchor="middle">1</text>
                  <text x="280" y="278" fill="#64748b" fontSize="9" textAnchor="middle">10</text>
                  <text x="390" y="278" fill="#64748b" fontSize="9" textAnchor="middle">100</text>
                  <text x="490" y="278" fill="#64748b" fontSize="9" textAnchor="middle">1000</text>
                  <text x="280" y="295" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Mật Độ Năng Lượng Tích Trữ (Wh/kg) →
                  </text>

                  {/* Labels Y: Power Density W/kg */}
                  <text x="50" y="260" fill="#64748b" fontSize="9" textAnchor="end">10</text>
                  <text x="50" y="200" fill="#64748b" fontSize="9" textAnchor="end">100</text>
                  <text x="50" y="140" fill="#64748b" fontSize="9" textAnchor="end">1,000</text>
                  <text x="50" y="80" fill="#64748b" fontSize="9" textAnchor="end">10,000</text>
                  <text x="50" y="25" fill="#64748b" fontSize="9" textAnchor="end">100k</text>
                  <text x="20" y="140" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 140)" fontWeight="bold">
                    Mật Độ Công Suất (W/kg) →
                  </text>

                  {/* Discharge Time Diagonals (t = const) */}
                  <line x1="60" y1="80" x2="160" y2="260" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
                  <text x="110" y="165" fill="#475569" fontSize="8" transform="rotate(58 110 165)">t = 10⁻³ s (ms)</text>

                  <line x1="160" y1="40" x2="340" y2="260" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
                  <text x="245" y="145" fill="#475569" fontSize="8" transform="rotate(50 245 145)">t = 1 s</text>

                  <line x1="300" y1="40" x2="480" y2="260" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
                  <text x="385" y="145" fill="#475569" fontSize="8" transform="rotate(50 385 145)">t = 1 giờ</text>

                  {/* Region 1: Electrostatic Capacitors */}
                  <rect x="70" y="40" width="70" height="90" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="105" y="80" fill="#60a5fa" fontSize="9" textAnchor="middle" fontWeight="bold">Tụ Tĩnh Điện</text>
                  <text x="105" y="95" fill="#93c5fd" fontSize="7" textAnchor="middle">&gt; 10⁴ W/kg | &lt; 0.1 Wh/kg</text>

                  {/* Region 2: Supercapacitors (Our Core Highlight) */}
                  <rect x="230" y="80" width="110" height="95" rx="8" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
                  <text x="285" y="118" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">SIÊU TỤ ĐIỆN</text>
                  <text x="285" y="132" fill="#a7f3d0" fontSize="8" textAnchor="middle">(EDLC &amp; Giả Điện Dung)</text>
                  <text x="285" y="146" fill="#6ee7b7" fontSize="7" textAnchor="middle">10³ - 1.5×10⁴ W/kg | 5 - 35 Wh/kg</text>

                  {/* Region 3: Lithium-Ion Batteries */}
                  <rect x="370" y="150" width="90" height="90" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="415" y="190" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">Pin Li-Ion</text>
                  <text x="415" y="205" fill="#fde68a" fontSize="7" textAnchor="middle">150 - 280 Wh/kg</text>
                  <text x="415" y="217" fill="#fcd34d" fontSize="7" textAnchor="middle">~300 W/kg</text>

                  {/* Region 4: Fuel Cells */}
                  <rect x="430" y="190" width="60" height="65" rx="6" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="1.5" />
                  <text x="460" y="222" fill="#f472b6" fontSize="8" textAnchor="middle" fontWeight="bold">Pin H₂</text>
                  <text x="460" y="235" fill="#fbcfe8" fontSize="7" textAnchor="middle">&gt; 500 Wh/kg</text>
                </svg>
              </div>

              {/* Benchmark Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {RAGONE_BENCHMARK_CATALOG.map((dev, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-200">{dev.deviceTypeVi.split('(')[0]}</div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Năng lượng: {dev.energyDensityRangeWhKg[0]} - {dev.energyDensityRangeWhKg[1]} Wh/kg
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400">
                      Công suất: {dev.powerDensityRangeWKg[0]} - {dev.powerDensityRangeWKg[1]} W/kg
                    </div>
                    <div className="text-[10px] text-slate-400">
                      <strong>Ứng dụng:</strong> {dev.typicalApplicationsVi}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GRAPHENE AEROGEL SYNTHESIS */}
        {activeTab === 'AEROGEL_SYNTHESIS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Freeze Drying Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Snowflake className="w-4 h-4 text-cyan-400" />
                    Thông Số Đông Khô Định Hướng (Ice-Templating)
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Nhiệt độ đóng băng đông khô:</span>
                      <span className="font-mono text-cyan-400 font-semibold">{freezingTempCelsius}°C</span>
                    </div>
                    <input
                      type="range"
                      min={-80}
                      max={-20}
                      step={5}
                      value={freezingTempCelsius}
                      onChange={e => setFreezingTempCelsius(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                      <span>-80°C (Siêu mịn N₂ lỏng)</span>
                      <span>-50°C (Tối ưu)</span>
                      <span>-20°C (Lỗ xốp thô)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Nồng độ tiền chất Graphene Oxide (GO):</span>
                      <span className="font-mono text-cyan-400 font-semibold">{goPrecursorConcentration} mg/mL</span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={6.0}
                      step={0.5}
                      value={goPrecursorConcentration}
                      onChange={e => setGoPrecursorConcentration(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Synthesis Outcome Metrics */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Đặc Tính Khí Gel Thu Được</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Mật Độ Khí Gel</div>
                      <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                        {aerogelSynthesis.aerogelDensityMgCm3} <span className="text-xs">mg/cm³</span>
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Nhẹ hơn không khí (~1.2 mg/cm³)</div>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Độ Xốp Thể Tích</div>
                      <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                        {aerogelSynthesis.porosityPercent} <span className="text-xs">%</span>
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">&gt; 99% thể tích là khoảng trống</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="text-slate-400 text-[11px]">Hình Thái Cấu Trúc Mao Quản:</div>
                    <div className="text-amber-300 font-medium mt-0.5">{aerogelSynthesis.poreMorphologyVi}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="text-slate-400 text-[11px]">Độ Bền Cơ Học Chịu Nén:</div>
                    <div className="text-cyan-300 font-mono font-medium mt-0.5">{aerogelSynthesis.compressiveModulusKPa} kPa</div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Honeycomb SVG Diagram (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Box className="w-4 h-4 text-emerald-400" />
                    Mạng Lưới Xốp Liên Thông 3D (Hierarchical Porous Network)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Dẫn Ion Nhanh • Không Nghẽn Lỗ Xốp</span>
                </div>

                {/* SVG 3D Aerogel Skeleton */}
                <div className="h-64 w-full flex items-center justify-center bg-slate-950 rounded-xl p-2 border border-slate-800/80">
                  <svg viewBox="0 0 400 220" className="w-full h-full">
                    {/* Background Honeycomb Cells */}
                    <g stroke="#1e293b" strokeWidth="1.5" fill="none">
                      <polygon points="50,40 80,25 110,40 110,75 80,90 50,75" />
                      <polygon points="110,40 140,25 170,40 170,75 140,90 110,75" />
                      <polygon points="170,40 200,25 230,40 230,75 200,90 170,75" />
                      <polygon points="230,40 260,25 290,40 290,75 260,90 230,75" />
                      <polygon points="80,90 110,75 140,90 140,125 110,140 80,125" />
                      <polygon points="140,90 170,75 200,90 200,125 170,140 140,125" />
                      <polygon points="200,90 230,75 260,90 260,125 230,140 200,125" />
                      <polygon points="110,140 140,125 170,140 170,175 140,190 110,175" />
                      <polygon points="170,140 200,125 230,140 230,175 200,190 170,175" />
                    </g>

                    {/* Active Graphene Aerogel Interconnected Sheets */}
                    <g stroke="#10b981" strokeWidth="2.5" fill="rgba(16, 185, 129, 0.08)" strokeLinecap="round">
                      <polygon points="140,90 170,75 200,90 200,125 170,140 140,125" stroke="#34d399" strokeWidth="3" />
                      <path d="M 80,90 Q 110,105 140,90 T 200,90" fill="none" stroke="#10b981" strokeWidth="2" />
                      <path d="M 140,125 Q 170,145 200,125" fill="none" stroke="#10b981" strokeWidth="2" />
                      <path d="M 170,75 L 170,40" stroke="#059669" strokeWidth="2" strokeDasharray="3,2" />
                      <path d="M 170,140 L 170,175" stroke="#059669" strokeWidth="2" strokeDasharray="3,2" />
                    </g>

                    {/* Solvated Ions moving through Macropores */}
                    <g>
                      <circle cx="160" cy="105" r="5" fill="#38bdf8" />
                      <text x="160" y="108" fill="#0c4a6e" fontSize="7" textAnchor="middle" fontWeight="bold">K⁺</text>
                      <path d="M 167,105 L 180,108" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />

                      <circle cx="185" cy="115" r="6" fill="#f43f5e" />
                      <text x="185" y="118" fill="#881337" fontSize="7" textAnchor="middle" fontWeight="bold">OH⁻</text>

                      <circle cx="125" cy="100" r="5" fill="#38bdf8" />
                      <text x="125" y="103" fill="#0c4a6e" fontSize="7" textAnchor="middle" fontWeight="bold">K⁺</text>
                    </g>

                    {/* Dandelion Petal Comparison Badge */}
                    <rect x="250" y="145" width="135" height="55" rx="6" fill="#0f172a" stroke="#334155" />
                    <text x="260" y="163" fill="#38bdf8" fontSize="9" fontWeight="bold">Siêu nhẹ kỉ lục:</text>
                    <text x="260" y="177" fill="#cbd5e1" fontSize="8">Có thể đặt đứng cân bằng</text>
                    <text x="260" y="189" fill="#94a3b8" fontSize="8">trên đài hoa bồ công anh</text>
                  </svg>
                </div>

                {/* Educational Insight */}
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Đột Phá của Mạng Lưới Xốp Liên Thông 3D:
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Trong than hoạt tính truyền thống, các vi lỗ xốp (&lt; 2 nm) dễ bị tắc nghẽn khi dung dịch điện ly di chuyển ở dòng điện cao. Khí gel Graphene 3D được tạo ra bằng phương pháp đông khô định hướng (ice-templating) sở hữu hệ thống mao quản cấp bậc (macro-mesoporous hierarchy), cho phép các ion hydrat hóa di chuyển với tốc độ tối đa, giúp siêu tụ duy trì &gt; 85% điện dung ngay cả ở tốc độ nạp xả siêu nhanh (10 A/g).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
