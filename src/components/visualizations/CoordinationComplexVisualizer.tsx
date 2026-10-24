// src/components/visualizations/CoordinationComplexVisualizer.tsx
// Interactive Coordination Complex & Crystal Field Splitting Visualizer (Mô Phỏng Phức Chất & Thuyết Trường Tinh Thể)
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 4: Phức chất) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  RotateCcw,
  BookOpen,
  Zap,
  Info,
  Droplets,
  FlaskConical,
  Activity,
  CheckCircle2,
  Compass,
  Sliders,
  Shield,
  Eye
} from 'lucide-react';
import {
  CURRICULUM_COORDINATION_COMPLEXES,
  CoordinationComplexDef,
  CoordinationComplexEngine,
  LigandExchangeSimulationResult
} from '../../domain/coordinationComplexEngine';
import { sound } from '../../audio/soundEngine';

export interface CoordinationComplexVisualizerProps {
  initialComplexId?: string;
  className?: string;
  onSimulationChange?: (result: LigandExchangeSimulationResult) => void;
}

export const CoordinationComplexVisualizer: React.FC<CoordinationComplexVisualizerProps> = ({
  initialComplexId = 'complex_cu_nh3',
  className = '',
  onSimulationChange
}) => {
  const [selectedComplexId, setSelectedComplexId] = useState<string>(initialComplexId);

  // Active complex definition
  const currentComplex = useMemo<CoordinationComplexDef>(() => {
    return (
      CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === selectedComplexId) ||
      CURRICULUM_COORDINATION_COMPLEXES[0]
    );
  }, [selectedComplexId]);

  // Operational Simulation Parameters
  const [ligandConcM, setLigandConcM] = useState<number>(3.0); // 3.0 M default added ligand
  const [tempC, setTempC] = useState<number>(25); // 25 °C default
  const [excessLigand, setExcessLigand] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'CRYSTAL_FIELD' | 'PEDAGOGY' | 'TACTICAL'>('SIMULATION');

  // Compute simulation result
  const simulationResult = useMemo<LigandExchangeSimulationResult>(() => {
    return CoordinationComplexEngine.simulateLigandExchange({
      complexId: selectedComplexId,
      addedLigandConcentrationM: ligandConcM,
      temperatureCelsius: tempC,
      excessLigand
    });
  }, [selectedComplexId, ligandConcM, tempC, excessLigand]);

  // Callback to parent if provided
  React.useEffect(() => {
    if (onSimulationChange) {
      onSimulationChange(simulationResult);
    }
  }, [simulationResult, onSimulationChange]);

  const handleSelectComplex = (id: string) => {
    setSelectedComplexId(id);
    setLigandConcM(3.0);
    setTempC(25);
    setExcessLigand(true);
    try {
      sound.playUiClick();
      sound.playCardSelect();
    } catch {}
  };

  const handleResetToStandard = () => {
    setLigandConcM(3.0);
    setTempC(25);
    setExcessLigand(true);
    try {
      sound.playUiClick();
    } catch {}
  };

  const handleAddDropLigand = () => {
    setLigandConcM(prev => Math.min(10.0, Math.round((prev + 0.5) * 10) / 10));
    try {
      sound.playPipetteSuction();
    } catch {}
  };

  return (
    <div
      className={`coordination-complex-visualizer bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 flex flex-col gap-5 ${className}`}
      data-testid="coordination-complex-visualizer"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-500/40 text-indigo-400 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
              <span>MÔ PHỎNG PHỨC CHẤT & THUYẾT TRƯỜNG TINH THỂ</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                GDPT 2018 HÓA 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cấu trúc không gian, phối tử thế chỗ, tách mức năng lượng orbital d (Δ) & màu sắc quang phổ
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => {
              setActiveTab('SIMULATION');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'SIMULATION'
                ? 'bg-indigo-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Mô Phỏng Phản Ứng</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('CRYSTAL_FIELD');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'CRYSTAL_FIELD'
                ? 'bg-indigo-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Trường Tinh Thể (Δ)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('PEDAGOGY');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'PEDAGOGY'
                ? 'bg-indigo-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sư Phạm & Ứng Dụng</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('TACTICAL');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'TACTICAL'
                ? 'bg-indigo-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Bùa Lợi Tác Chiến</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {CURRICULUM_COORDINATION_COMPLEXES.map(c => {
          const isSelected = c.id === selectedComplexId;
          return (
            <button
              key={c.id}
              onClick={() => handleSelectComplex(c.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-500/10 border-indigo-500/80 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: c.solutionColorHex }}
                />
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                )}
              </div>
              <div className="text-xs font-mono font-bold text-white truncate">
                {c.formula}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {c.name_vi.split('(')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Tab: SIMULATION */}
      {activeTab === 'SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Test Tube Reaction & 3D Spatial Coordination Geometry SVG (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative bg-slate-950/80 rounded-xl border border-slate-800 p-3 overflow-hidden shadow-inner flex flex-col">
              {/* Diagram Title Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200">
                    Cấu Trúc Không Gian Phức Chất & Cầu Nội Phối Trí
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                    Số phối trí: {currentComplex.coordinationNumber} ({currentComplex.geometryName_vi})
                  </span>
                </div>
              </div>

              {/* Chemical Equation Banner */}
              <div className="flex items-center justify-center p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-mono text-center font-bold text-indigo-300 mb-3 shadow">
                {currentComplex.ligandExchangeEquationVI}
              </div>

              {/* Visual Apparatus SVG: Test Tube Solution + 3D Coordination Complex Orbit */}
              <div className="w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 620 340"
                  className="w-full max-h-[340px] drop-shadow-xl select-none"
                  style={{ background: '#0b1120', borderRadius: '12px' }}
                >
                  <defs>
                    {/* Glowing Metal Core Filter */}
                    <filter id="glowCentral">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Dynamic Solution Gradient */}
                    <linearGradient id="solutionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={simulationResult.currentColorHex} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={simulationResult.currentColorHex} stopOpacity="0.85" />
                    </linearGradient>

                    {/* Glass Tube Highlight */}
                    <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* ======================================================= */}
                  {/* PART 1: TEST TUBE / CUVETTE (Left Side: 30, 40 -> 140, 290) */}
                  {/* ======================================================= */}
                  <g transform="translate(30, 30)">
                    {/* Test Tube Stand Clamp */}
                    <rect x="0" y="70" width="8" height="150" fill="#475569" />
                    <rect x="0" y="110" width="45" height="8" fill="#64748b" rx="2" />

                    {/* Test Tube Body */}
                    <path
                      d="M 45 30 L 45 220 A 25 25 0 0 0 95 220 L 95 30 Z"
                      fill="#0f172a"
                      stroke="#94a3b8"
                      strokeWidth="2.5"
                    />

                    {/* Solution Liquid Column */}
                    <path
                      d="M 47 100 L 47 220 A 23 23 0 0 0 93 220 L 93 100 Z"
                      fill="url(#solutionGrad)"
                    />

                    {/* Liquid Meniscus */}
                    <ellipse cx="70" cy="100" rx="23" ry="5" fill={simulationResult.currentColorHex} opacity="0.9" />

                    {/* Glass Reflection Overlay */}
                    <path
                      d="M 47 30 L 47 220 A 23 23 0 0 0 93 220 L 93 30 Z"
                      fill="url(#glassReflection)"
                    />

                    {/* Falling Ligand Droplet from Pipette */}
                    <circle cx="70" cy="60" r="3.5" fill="#38bdf8" opacity="0.9" />
                    <text x="70" y="20" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                      +{currentComplex.innerSphereLigands[0].ligandFormula}
                    </text>

                    {/* Test Tube Color Label */}
                    <text x="70" y="270" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">
                      {simulationResult.observedColorNameVI}
                    </text>
                    <text x="70" y="285" fill="#94a3b8" fontSize="8" textAnchor="middle">
                      {simulationResult.formationFractionPct}% chuyển hóa
                    </text>
                  </g>

                  {/* ======================================================= */}
                  {/* PART 2: 3D COORDINATION COMPLEX BALL & STICK (Right Side) */}
                  {/* ======================================================= */}
                  <g transform="translate(380, 160)">
                    {/* Inner Sphere Outer Coordinate Square Brackets [ ... ] */}
                    <path
                      d="M -160 -100 L -180 -100 L -180 100 L -160 100"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="3"
                    />
                    <path
                      d="M 160 -100 L 180 -100 L 180 100 L 160 100"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="3"
                    />
                    {/* Net Charge Superscript */}
                    <text x="188" y="-90" fill="#f59e0b" fontSize="14" fontWeight="bold" fontFamily="monospace">
                      {currentComplex.netCharge > 0 ? `+${currentComplex.netCharge}` : currentComplex.netCharge < 0 ? `${currentComplex.netCharge}` : '0'}
                    </text>

                    {/* Central Transition Metal Cation */}
                    <circle cx="0" cy="0" r="30" fill="#172231" stroke="#38bdf8" strokeWidth="3" filter="url(#glowCentral)" />
                    <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                      {currentComplex.centralCationSymbol}
                    </text>
                    <text x="0" y="18" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                      3d^{currentComplex.dElectronCount}
                    </text>

                    {/* Coordination Bonds depending on Geometry */}
                    {currentComplex.geometry === 'OCTAHEDRAL' ? (
                      <g>
                        {/* 1. Top Axial Ligand */}
                        <line x1="0" y1="-30" x2="0" y2="-80" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
                        <polygon points="0,-35 -4,-45 4,-45" fill="#f59e0b" />
                        <circle cx="0" cy="-85" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                        <text x="0" y="-81" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        {/* 2. Bottom Axial Ligand */}
                        <line x1="0" y1="30" x2="0" y2="80" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
                        <polygon points="0,35 -4,45 4,45" fill="#f59e0b" />
                        <circle cx="0" cy="85" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                        <text x="0" y="89" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[1]?.ligandFormula || currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        {/* 3. Right Equatorial Ligand */}
                        <line x1="30" y1="0" x2="95" y2="0" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 2" />
                        <polygon points="35,0 45,-4 45,4" fill="#38bdf8" />
                        <circle cx="100" cy="0" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="100" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        {/* 4. Left Equatorial Ligand */}
                        <line x1="-30" y1="0" x2="-95" y2="0" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 2" />
                        <polygon points="-35,0 -45,-4 -45,4" fill="#38bdf8" />
                        <circle cx="-100" cy="0" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="-100" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        {/* 5. Front Wedge Ligand (3D perspective) */}
                        <polygon points="0,0 -45,40 -65,35" fill="#38bdf8" opacity="0.6" />
                        <circle cx="-60" cy="40" r="17" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="-60" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        {/* 6. Back Dash Ligand (3D perspective) */}
                        <line x1="0" y1="0" x2="65" y2="-40" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
                        <circle cx="65" cy="-40" r="17" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                        <text x="65" y="-36" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {currentComplex.innerSphereLigands[0].ligandFormula}
                        </text>

                        <text x="0" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Cấu trúc Bát diện đều 6 phối tử (Octahedral, góc 90°)
                        </text>
                      </g>
                    ) : currentComplex.geometry === 'TETRAHEDRAL' ? (
                      <g>
                        {/* Tetrahedral 4 ligands */}
                        <line x1="0" y1="-30" x2="0" y2="-80" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="0" cy="-85" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-81" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cl⁻</text>

                        <line x1="0" y1="0" x2="70" y2="40" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="75" cy="45" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="75" y="49" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cl⁻</text>

                        <polygon points="0,0 -50,55 -65,45" fill="#38bdf8" opacity="0.6" />
                        <circle cx="-60" cy="55" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="-60" y="59" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cl⁻</text>

                        <line x1="0" y1="0" x2="-60" y2="-30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
                        <circle cx="-65" cy="-35" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                        <text x="-65" y="-31" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cl⁻</text>

                        <text x="0" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Cấu trúc Tứ diện 4 phối tử (Tetrahedral, góc 109.5°)
                        </text>
                      </g>
                    ) : currentComplex.geometry === 'SQUARE_PLANAR' ? (
                      <g>
                        {/* Square Planar (Cisplatin) */}
                        <line x1="-30" y1="-30" x2="-75" y2="-75" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="-80" cy="-80" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="-80" y="-76" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">NH₃</text>

                        <line x1="30" y1="-30" x2="75" y2="-75" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="80" cy="-80" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="80" y="-76" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">NH₃</text>

                        <line x1="-30" y1="30" x2="-75" y2="75" stroke="#10b981" strokeWidth="3" />
                        <circle cx="-80" cy="80" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                        <text x="-80" y="84" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Cl⁻</text>

                        <line x1="30" y1="30" x2="75" y2="75" stroke="#10b981" strokeWidth="3" />
                        <circle cx="80" cy="80" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                        <text x="80" y="84" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Cl⁻</text>

                        <text x="0" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Đồng phân hình học cis-[Pt(NH₃)₂Cl₂] Vuông phẳng (90°)
                        </text>
                      </g>
                    ) : (
                      <g>
                        {/* Linear (Ag(NH3)2+) - LINEAR 180° */}
                        <line x1="-30" y1="0" x2="-95" y2="0" stroke="#38bdf8" strokeWidth="3" />
                        <polygon points="-35,0 -45,-4 -45,4" fill="#38bdf8" />
                        <circle cx="-100" cy="0" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="-100" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">NH₃</text>

                        <line x1="30" y1="0" x2="95" y2="0" stroke="#38bdf8" strokeWidth="3" />
                        <polygon points="35,0 45,-4 45,4" fill="#38bdf8" />
                        <circle cx="100" cy="0" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="100" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">NH₃</text>

                        <text x="0" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Đường thẳng 2 phối tử đối xứng (Linear 180°)
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* Assessment Status Bar */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-indigo-300">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Đánh giá cân bằng phối trí (GDPT 2018):</span>
                </div>
                <p className="text-slate-300 leading-relaxed pl-6">
                  {simulationResult.pedagogicalAnalysisVI}
                </p>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pl-6 border-t border-slate-800/80 pt-1 mt-1">
                  <span>
                    <strong>Độ bền phức:</strong> log₁₀(β) = {currentComplex.logStabilityConstantBeta}
                  </span>
                  <span>
                    <strong>Trường phối tử:</strong> {simulationResult.spectrochemicalFieldStrengthVI}
                  </span>
                  <span>
                    <strong>Năng lượng tách Δ:</strong> {currentComplex.crystalFieldSplitting_kJ} kJ/mol
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Parameter Sliders & Chemical Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">ĐIỀU KHIỂN NỒNG ĐỘ PHỐI TỬ</h3>
                </div>
                <button
                  onClick={handleResetToStandard}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-indigo-300 border border-slate-700 flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Chuẩn Ban Đầu</span>
                </button>
              </div>

              {/* 1. Added Ligand Concentration Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <strong>Nồng độ [{currentComplex.innerSphereLigands[0].ligandFormula}]:</strong>
                  </span>
                  <span className="font-mono font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {ligandConcM.toFixed(1)} M
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="10.0"
                  step="0.1"
                  value={ligandConcM}
                  onChange={e => setLigandConcM(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>0.0 M (Chỉ có cation aqua)</span>
                  <button
                    onClick={handleAddDropLigand}
                    className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors"
                  >
                    +0.5 M (Thêm từng giọt 💧)
                  </button>
                  <span>10.0 M (Đậm đặc)</span>
                </div>
              </div>

              {/* 2. Temperature Slider (Relevant for thermochromic CoCl4 equilibrium) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <strong>Nhiệt độ dung dịch (T):</strong>
                  </span>
                  <span className="font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {tempC} °C
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="1"
                  value={tempC}
                  onChange={e => setTempC(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10 °C (Nước đá)</span>
                  <span>25 °C (Tiêu chuẩn)</span>
                  <span>80 °C (Đun nóng)</span>
                </div>
              </div>

              {/* 3. Excess Ligand Switch */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dư lượng Phối Tử ({currentComplex.innerSphereLigands[0].ligandFormula})</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {simulationResult.isPrecipitateDissolved
                      ? 'Kết tủa tan hoàn toàn tạo phức đồng nhất'
                      : 'Nồng độ chưa đủ để hòa tan kết tủa trung gian'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setExcessLigand(!excessLigand);
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    excessLigand
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/60 shadow-inner'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {excessLigand ? 'DƯ (HÒA TAN)' : 'VỪA ĐỦ'}
                </button>
              </div>

              {/* 4. Spectrophotometer Color Absorption Band */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span>Quang Phổ Hấp Thụ & Màu Phụ (Complementary)</span>
                  <span className="text-[10px] text-indigo-400 font-mono">
                    λ_max = {currentComplex.absorbedWavelength_nm} nm
                  </span>
                </span>
                <div className="w-full h-6 rounded-lg bg-gradient-to-r from-violet-600 via-blue-500 via-emerald-500 via-amber-400 via-orange-500 to-rose-600 relative overflow-hidden flex items-center shadow-inner">
                  {/* Absorbed Wavelength Needle Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-md z-10"
                    style={{
                      left: `${Math.min(98, Math.max(2, ((currentComplex.absorbedWavelength_nm - 380) / (750 - 380)) * 100))}%`
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>380 nm (Tím)</span>
                  <span className="text-white font-bold">
                    Hấp thụ: {currentComplex.complementaryColorName_vi} → Hiện màu:{' '}
                    <strong style={{ color: currentComplex.solutionColorHex }}>
                      {currentComplex.solutionColorName_vi}
                    </strong>
                  </span>
                  <span>750 nm (Đỏ)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: CRYSTAL FIELD THEORY (Thuyết Trường Tinh Thể & Tách Mức Orbital d) */}
      {activeTab === 'CRYSTAL_FIELD' && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col gap-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>THUYẾT TRƯỜNG TINH THỂ (CRYSTAL FIELD THEORY - CFT) & DÃY HÓA QUANG PHỔ</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Sự tách 5 orbital d suy biến thành nhóm t₂g và eg dưới tác dụng của điện trường phối tử
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* SVG d-orbital splitting diagram */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-300 mb-2">
                Sơ Đồ Tách Mức Năng Lượng Orbital d ({currentComplex.geometryName_vi})
              </span>
              <svg viewBox="0 0 340 200" className="w-full max-h-[200px] select-none bg-slate-950 rounded-lg border border-slate-800">
                {/* Energy Arrow */}
                <line x1="25" y1="180" x2="25" y2="20" stroke="#64748b" strokeWidth="2" />
                <polygon points="25,15 21,25 29,25" fill="#64748b" />
                <text x="18" y="15" fill="#94a3b8" fontSize="9" textAnchor="end" fontWeight="bold">E</text>

                {/* Free Cation Degenerate 5d levels */}
                <g transform="translate(60, 100)">
                  <line x1="0" y1="0" x2="16" y2="0" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="20" y1="0" x2="36" y2="0" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="40" y1="0" x2="56" y2="0" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="60" y1="0" x2="76" y2="0" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="80" y1="0" x2="96" y2="0" stroke="#38bdf8" strokeWidth="3" />
                  <text x="48" y="22" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    Ion tự do (5d suy biến)
                  </text>
                </g>

                {/* Splitting in Octahedral Field */}
                {currentComplex.geometry === 'OCTAHEDRAL' ? (
                  <g>
                    {/* Upper eg (2 levels) */}
                    <line x1="220" y1="60" x2="250" y2="60" stroke="#ef4444" strokeWidth="3" />
                    <line x1="260" y1="60" x2="290" y2="60" stroke="#ef4444" strokeWidth="3" />
                    <text x="300" y="64" fill="#ef4444" fontSize="10" fontWeight="bold">
                      eg (dx²-y², dz²)
                    </text>

                    {/* Lower t2g (3 levels) */}
                    <line x1="210" y1="130" x2="235" y2="130" stroke="#10b981" strokeWidth="3" />
                    <line x1="242" y1="130" x2="267" y2="130" stroke="#10b981" strokeWidth="3" />
                    <line x1="274" y1="130" x2="299" y2="130" stroke="#10b981" strokeWidth="3" />
                    <text x="306" y="134" fill="#10b981" fontSize="10" fontWeight="bold">
                      t₂g (dxy, dyz, dxz)
                    </text>

                    {/* Energy gap Delta_o */}
                    <line x1="200" y1="60" x2="200" y2="130" stroke="#f59e0b" strokeWidth="2" />
                    <polygon points="200,60 197,68 203,68" fill="#f59e0b" />
                    <polygon points="200,130 197,122 203,122" fill="#f59e0b" />
                    <text x="180" y="98" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Δo
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Tetrahedral Splitting: upper t2 (3 levels), lower e (2 levels) */}
                    <line x1="210" y1="70" x2="235" y2="70" stroke="#ef4444" strokeWidth="3" />
                    <line x1="242" y1="70" x2="267" y2="70" stroke="#ef4444" strokeWidth="3" />
                    <line x1="274" y1="70" x2="299" y2="70" stroke="#ef4444" strokeWidth="3" />
                    <text x="306" y="74" fill="#ef4444" fontSize="10" fontWeight="bold">t₂</text>

                    <line x1="220" y1="130" x2="250" y2="130" stroke="#10b981" strokeWidth="3" />
                    <line x1="260" y1="130" x2="290" y2="130" stroke="#10b981" strokeWidth="3" />
                    <text x="300" y="134" fill="#10b981" fontSize="10" fontWeight="bold">e</text>

                    <line x1="200" y1="70" x2="200" y2="130" stroke="#f59e0b" strokeWidth="2" />
                    <text x="180" y="102" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Δt
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Spectrochemical Series & Physics Explanation */}
            <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-indigo-300">Dãy Hóa Quang Phổ (Spectrochemical Series):</strong>
                <p className="font-mono text-[11px] text-amber-300 mt-1">
                  I⁻ &lt; Br⁻ &lt; Cl⁻ &lt; F⁻ &lt; OH⁻ &lt; H₂O &lt; NH₃ &lt; en &lt; NO₂⁻ &lt; CN⁻ &lt; CO
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Trường yếu (Δ nhỏ, hấp thụ bước sóng dài đỏ) → Trường mạnh (Δ lớn, hấp thụ bước sóng ngắn tím).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-cyan-300">Tại sao phức chất có màu sắc rực rỡ?</strong>
                <p className="mt-1">
                  Khi ánh sáng trắng chiếu vào phức chất, các electron d từ mức thấp (t₂g) hấp thụ photon có năng lượng đúng bằng khoảng cách tách mức:
                </p>
                <p className="font-mono text-center text-amber-300 my-1 font-bold">
                  Δ = h·c / λ_hấp_thụ
                </p>
                <p>
                  Ánh sáng còn lại truyền qua mắt người quan sát có màu phụ (complementary color) với màu đã bị hấp thụ!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PEDAGOGY (GDPT 2018 Sư Phạm & Ứng Dụng Đời Sống) */}
      {activeTab === 'PEDAGOGY' && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>CHỦ ĐỀ DẠY HỌC GDPT 2018: HÓA HỌC PHỨC CHẤT TRONG ĐỜI SỐNG & Y HỌC</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Các khái niệm cơ bản, vai trò phân tích định tính và tầm quan trọng sinh học
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Cấu Tạo & Danh Pháp IUPAC Phức Chất</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentComplex.pedagogicalRationaleVI}
              </p>
              <div className="p-2.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 font-mono">
                Tên IUPAC: <strong>{currentComplex.name_iupac}</strong> (Cầu nội phối trí: [Tâm kim loại + Phối tử])
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Vai Trò Trong Hóa Học Phân Tích Định Tính</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentComplex.qualitativeAnalysisRoleVI}
              </p>
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-mono">
                Ứng dụng: Nhận biết đặc hiệu ion kim loại chuyển tiếp dựa vào phản ứng thế phối tử và sự đổi màu sắc nét.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2 md:col-span-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>3. Tầm Quan Trọng Sinh Học, Y Học & Công Nghiệp</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentComplex.biologicalOrMedicalSignificanceVI}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: TACTICAL (Bùa Lợi Tác Chiến ELEMENTA) */}
      {activeTab === 'TACTICAL' && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>BÙA LỢI TÁC CHIẾN PHỨC CHẤT TRONG TCG & MOBA</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Liên kết phối trí bát diện và năng lượng tách trường tinh thể mang lại khả năng hộ vệ kiên cố
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Shield className="w-6 h-6 animate-bounce" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider">
                  Bùa Lợi Kích Hoạt
                </span>
                <h4 className="text-base font-bold text-white">
                  {simulationResult.tacticalBonus.nameVI}
                </h4>
                <p className="text-xs text-slate-300">
                  {simulationResult.tacticalBonus.descriptionVI}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 shrink-0">
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Khiên Hộ Vệ</div>
                <div className="text-base font-mono font-bold text-indigo-400">
                  +{simulationResult.tacticalBonus.shieldAmount} HP
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Kháng Hiệu Ứng</div>
                <div className="text-base font-mono font-bold text-emerald-400">
                  +{simulationResult.tacticalBonus.tenacityBoostPct}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinationComplexVisualizer;
