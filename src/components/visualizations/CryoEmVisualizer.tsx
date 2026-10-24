// src/components/visualizations/CryoEmVisualizer.tsx
// Milestone 60: Cryogenic Electron Microscopy (Cryo-EM), Vitreous Ice & Single-Particle 3D Reconstruction Visualizer
// Standards: Nobel Prize in Chemistry 2017 (Jacques Dubochet, Joachim Frank, Richard Henderson) & Rosenthal-Henderson FSC 0.143 Gold Standard
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Bước sóng De Broglie của electron tương đối tính, quang hình điện tử; Sinh học 10-12: Riboxom, Spike virus, kênh màng)

import React, { useState, useMemo } from 'react';
import {
  CRYO_EM_CATALOG,
  CryoEmSpecimenStandard,
  simulateCryoEmWorkflow,
  ELECTRON_WAVELENGTH_300KV,
  SPHERICAL_ABERRATION_CS_MM
} from '../../domain/cryoEmEngine';
import { sound } from '../../audio/soundEngine';
import {
  Microscope,
  Activity,
  Layers,
  Award,
  Sparkles,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
  ShieldAlert,
  Zap,
  RotateCcw,
  Maximize2,
  Compass,
  FileText,
  Snowflake,
  Eye,
  Camera
} from 'lucide-react';

export interface CryoEmVisualizerProps {
  initialSpecimenId?: string;
}

export const CryoEmVisualizer: React.FC<CryoEmVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'ribosome_70s'
  );
  const [defocusMicrons, setDefocusMicrons] = useState<number>(-1.2);
  const [iceThicknessNm, setIceThicknessNm] = useState<number>(30.0);
  const [viewMode, setViewMode] = useState<'fsc_resolution_curve' | 'ctf_thon_rings' | 'class_averages_2d' | 'vitreous_ice_grid'>('fsc_resolution_curve');
  const [activeTab, setActiveTab] = useState<'nobel_2017_pioneers' | 'fsc_gold_standard' | 'ctf_optics' | 'curriculum_gdpt'>('nobel_2017_pioneers');

  const simResult = useMemo(() => {
    return simulateCryoEmWorkflow(selectedSpecimenId, defocusMicrons, iceThicknessNm);
  }, [selectedSpecimenId, defocusMicrons, iceThicknessNm]);

  const {
    specimen,
    iceQuality,
    effectiveResolutionAngstroms,
    fsc0143Resolution,
    dataPoints,
    classAverages
  } = simResult;

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    sound.playFscResolutionLockTone();
  };

  const handleDefocusChange = (val: number) => {
    setDefocusMicrons(val);
    sound.playCryoEmPlungeVitrify();
  };

  const handleIceChange = (val: number) => {
    setIceThicknessNm(val);
    sound.playCryoEmPlungeVitrify();
  };

  // SVG coordinate dimensions
  const svgW = 600;
  const svgH = 300;
  const pad = { top: 30, right: 30, bottom: 45, left: 65 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // FSC Plot coordinate transforms: FSC vs q (spatial frequency Å⁻¹)
  const qMin = 0.015;
  const qMax = 0.85;
  const toFscX = (q: number) => pad.left + ((q - qMin) / (qMax - qMin)) * plotW;
  const toFscY = (fsc: number) => pad.top + plotH - fsc * plotH;

  const fscPath = useMemo(() => {
    return dataPoints.reduce((acc, pt, idx) => {
      const x = toFscX(pt.spatialFrequencyInvAngstrom);
      const y = toFscY(pt.fscCorrelation);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [dataPoints]);

  // CTF Plot coordinate transforms: CTF(q) vs q (-1 to +1)
  const toCtfX = (q: number) => pad.left + ((q - qMin) / (qMax - qMin)) * plotW;
  const toCtfY = (val: number) => pad.top + plotH / 2 - (val * (plotH / 2)) * 0.95;

  const ctfPath = useMemo(() => {
    return dataPoints.reduce((acc, pt, idx) => {
      const x = toCtfX(pt.spatialFrequencyInvAngstrom);
      const y = toCtfY(pt.ctfValue);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [dataPoints]);

  const envelopePath = useMemo(() => {
    return dataPoints.reduce((acc, pt, idx) => {
      const x = toCtfX(pt.spatialFrequencyInvAngstrom);
      const y = toCtfY(pt.ctfEnvelope);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [dataPoints]);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/40 text-cyan-400">
            <Snowflake className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                Cryo-EM Vitreous Ice & Single-Particle 3D Reconstruction
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-mono">
                NOBEL 2017 · FSC 0.143
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Liquid Ethane Rapid Vitrification · CTF Phase Correction · Gold-Standard 0.143 Resolution
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('nobel_2017_pioneers')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'nobel_2017_pioneers'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Nobel 2017 Pioneers
          </button>
          <button
            onClick={() => setActiveTab('fsc_gold_standard')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'fsc_gold_standard'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            FSC 0.143 Resolution
          </button>
          <button
            onClick={() => setActiveTab('ctf_optics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'ctf_optics'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            CTF & Thon Rings
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            IUPAC & GDPT 2018
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {CRYO_EM_CATALOG.map((item) => {
          const isSelected = item.id === specimen.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectSpecimen(item.id)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400 truncate">
                {item.symmetry} · {item.molecularWeightKDa >= 1000 ? `${(item.molecularWeightKDa / 1000).toFixed(1)} MDa` : `${item.molecularWeightKDa} kDa`}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                {item.name.split(' (')[0]}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">
                FSC: {item.nominalResolutionAngstroms} Å (Ø {item.particleDiameterNm} nm)
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Cryo-EM Graphical Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-4">
          {/* View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('fsc_resolution_curve')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  viewMode === 'fsc_resolution_curve'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                FSC Curve (0.143 Cut-off)
              </button>
              <button
                onClick={() => setViewMode('ctf_thon_rings')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  viewMode === 'ctf_thon_rings'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CTF & Thon Rings
              </button>
              <button
                onClick={() => setViewMode('class_averages_2d')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  viewMode === 'class_averages_2d'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2D Class Averages
              </button>
              <button
                onClick={() => setViewMode('vitreous_ice_grid')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  viewMode === 'vitreous_ice_grid'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Vitreous Ice Grid
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-cyan-400 font-bold">
                Res: {effectiveResolutionAngstroms.toFixed(2)} Å
              </span>
              <span className="text-slate-400">
                Δz = {defocusMicrons.toFixed(2)} µm
              </span>
            </div>
          </div>

          {/* SVG Visualizer */}
          <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-900 overflow-hidden">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="cryoFscGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="70%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Mode 1: FSC Resolution Curve */}
              {viewMode === 'fsc_resolution_curve' && (
                <>
                  {/* Grid Lines */}
                  {[0.143, 0.5, 0.8].map((fscVal) => (
                    <line
                      key={fscVal}
                      x1={pad.left}
                      y1={toFscY(fscVal)}
                      x2={svgW - pad.right}
                      y2={toFscY(fscVal)}
                      stroke={fscVal === 0.143 ? '#f43f5e' : '#1e293b'}
                      strokeWidth={fscVal === 0.143 ? 1.5 : 1}
                      strokeDasharray={fscVal === 0.143 ? '4 2' : '3 3'}
                    />
                  ))}

                  {/* Gold-Standard FSC = 0.143 Threshold Label */}
                  <text
                    x={svgW - pad.right - 5}
                    y={toFscY(0.143) - 5}
                    fill="#f43f5e"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    Rosenthal-Henderson Gold Standard: FSC = 0.143
                  </text>

                  {/* FSC Sigmoidal Curve */}
                  <path
                    d={fscPath}
                    fill="none"
                    stroke="url(#cryoFscGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Cut-off Resolution Vertical Marker */}
                  <line
                    x1={toFscX(1 / fsc0143Resolution)}
                    y1={pad.top}
                    x2={toFscX(1 / fsc0143Resolution)}
                    y2={pad.top + plotH}
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={toFscX(1 / fsc0143Resolution) - 35}
                    y={pad.top + 8}
                    width="70"
                    height="18"
                    rx="4"
                    fill="#0c4a6e"
                    stroke="#0284c7"
                  />
                  <text
                    x={toFscX(1 / fsc0143Resolution)}
                    y={pad.top + 20}
                    fill="#38bdf8"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {fsc0143Resolution.toFixed(2)} Å
                  </text>

                  {/* Spatial Frequency Ticks (1/d in Å⁻¹) */}
                  {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((q) => (
                    <g key={q} transform={`translate(${toFscX(q)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        {q.toFixed(1)}
                      </text>
                      <text y="27" fill="#64748b" fontSize="8" textAnchor="middle">
                        ({(1 / q).toFixed(1)}Å)
                      </text>
                    </g>
                  ))}

                  {/* Y-Axis Ticks */}
                  {[0.0, 0.143, 0.5, 1.0].map((fscVal) => (
                    <g key={fscVal} transform={`translate(${pad.left}, ${toFscY(fscVal)})`}>
                      <line x2="-5" stroke="#475569" />
                      <text x="-8" y="3" fill="#94a3b8" fontSize="9" textAnchor="end">
                        {fscVal.toFixed(2)}
                      </text>
                    </g>
                  ))}
                  <text
                    x={-svgH / 2}
                    y="18"
                    transform="rotate(-90)"
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Fourier Shell Correlation: FSC(q)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 6}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Spatial Frequency q (Å⁻¹) [Resolution d = 1/q]
                  </text>
                </>
              )}

              {/* Mode 2: CTF & Thon Ring Oscillations */}
              {viewMode === 'ctf_thon_rings' && (
                <>
                  {/* Zero Line */}
                  <line
                    x1={pad.left}
                    y1={toCtfY(0)}
                    x2={svgW - pad.right}
                    y2={toCtfY(0)}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />

                  {/* Damping Envelope */}
                  <path
                    d={envelopePath}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Oscillating CTF Curve */}
                  <path
                    d={ctfPath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Frequency Ticks */}
                  {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((q) => (
                    <g key={q} transform={`translate(${toCtfX(q)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        {q.toFixed(1)}
                      </text>
                    </g>
                  ))}
                  <text
                    x={-svgH / 2}
                    y="18"
                    transform="rotate(-90)"
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Contrast Transfer Function: CTF(q)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Spatial Frequency q (Å⁻¹) — Thon Ring Phase Reversals
                  </text>
                </>
              )}

              {/* Mode 3: 2D Class Averages Gallery */}
              {viewMode === 'class_averages_2d' && (
                <g transform={`translate(${pad.left + 20}, ${pad.top + 10})`}>
                  {classAverages.map((cls, idx) => {
                    const col = idx % 2;
                    const row = Math.floor(idx / 2);
                    const cellW = (plotW - 40) / 2;
                    const cellH = (plotH - 20) / 2;
                    return (
                      <g key={cls.classId} transform={`translate(${col * cellW}, ${row * cellH})`}>
                        <rect
                          width={cellW - 15}
                          height={cellH - 15}
                          rx="8"
                          fill="#020617"
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                        {/* Simulated high-contrast particle shape */}
                        <circle
                          cx={(cellW - 15) / 2}
                          cy={(cellH - 15) / 2 - 8}
                          r={specimen.particleDiameterNm * 1.5}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray={cls.orientation.includes('0°') ? 'none' : '4 2'}
                        />
                        <text
                          x={(cellW - 15) / 2}
                          y={cellH - 28}
                          fill="#94a3b8"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {cls.label} ({cls.orientation})
                        </text>
                        <text
                          x={(cellW - 15) / 2}
                          y={cellH - 17}
                          fill="#38bdf8"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          N = {cls.particleCount.toLocaleString()} · SNR Gain: {cls.snrGain}×
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Mode 4: Vitreous Ice Grid Schematic */}
              {viewMode === 'vitreous_ice_grid' && (
                <g transform={`translate(${pad.left + 20}, ${pad.top + 20})`}>
                  {/* Carbon Support Film */}
                  <rect x="0" y="30" width="100" height="140" fill="#334155" rx="4" />
                  <rect x="360" y="30" width="100" height="140" fill="#334155" rx="4" />
                  <text x="50" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Carbon Foil
                  </text>
                  <text x="410" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Carbon Foil
                  </text>

                  {/* Vitreous Ice Layer */}
                  <rect
                    x="100"
                    y={100 - (iceThicknessNm / 2) * 1.5}
                    width="260"
                    height={iceThicknessNm * 1.5}
                    fill="#38bdf8"
                    opacity="0.3"
                  />
                  <line
                    x1="100"
                    y1={100 - (iceThicknessNm / 2) * 1.5}
                    x2="360"
                    y2={100 - (iceThicknessNm / 2) * 1.5}
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="100"
                    y1={100 + (iceThicknessNm / 2) * 1.5}
                    x2="360"
                    y2={100 + (iceThicknessNm / 2) * 1.5}
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />

                  {/* Suspended Biomolecules in Native Vitreous Ice */}
                  {[140, 190, 240, 290, 330].map((x, i) => (
                    <circle
                      key={x}
                      cx={x}
                      cy={100 + (i % 2 === 0 ? -6 : 6)}
                      r={specimen.particleDiameterNm * 0.4}
                      fill="#818cf8"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  ))}

                  <text x="230" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Vitreous Amorphous Ice (Thickness: {iceThicknessNm.toFixed(0)} nm)
                  </text>
                  <text x="230" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Native Unstained Biomolecules Frozen in -183°C Liquid Ethane
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Instrument Defocus (Δz):
                </span>
                <span className="font-mono text-cyan-400 font-semibold">{defocusMicrons.toFixed(2)} µm</span>
              </div>
              <input
                type="range"
                min="-2.8"
                max="-0.4"
                step="0.05"
                value={defocusMicrons}
                onChange={(e) => handleDefocusChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>-2.8 µm (High Contrast)</span>
                <span>-1.2 µm (Optimal)</span>
                <span>-0.4 µm (Close Focus)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Snowflake className="w-3.5 h-3.5 text-blue-400" />
                  Vitreous Ice Thickness:
                </span>
                <span className="font-mono text-blue-400 font-semibold">{iceThicknessNm.toFixed(0)} nm</span>
              </div>
              <input
                type="range"
                min="10"
                max="75"
                step="1"
                value={iceThicknessNm}
                onChange={(e) => handleIceChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>10 nm (Too Thin)</span>
                <span>30 nm (Optimal Monolayer)</span>
                <span>75 nm (Inelastic Blur)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Optics & Resolution Metrics Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Resolution & Ice Quality Card */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-cyan-400" />
                Cryo-EM Resolution
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  iceQuality === 'VITREOUS_OPTIMAL'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                    : 'bg-rose-950/80 text-rose-400 border-rose-800'
                }`}
              >
                {iceQuality.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">FSC 0.143 Resolution</div>
                <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
                  {effectiveResolutionAngstroms.toFixed(2)} Å
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Nominal: {specimen.nominalResolutionAngstroms} Å
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Electron Wavelength</div>
                <div className="text-sm font-bold font-mono text-sky-400 mt-0.5">
                  {ELECTRON_WAVELENGTH_300KV} Å
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  @ 300 kV (0.78 c)
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Spherical Aberration</div>
                <div className="text-sm font-bold font-mono text-indigo-400 mt-0.5">
                  Cs = {SPHERICAL_ABERRATION_CS_MM} mm
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Titan Krios FEG
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Particle Diameter</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {specimen.particleDiameterNm} nm
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Symmetry: {specimen.symmetry}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {specimen.biologicalSignificance}
            </p>
          </div>

          {/* Quick Instrument Dossier */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-cyan-400" />
              Direct Electron Detection (DED)
            </span>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-1">
              <div><strong>Sensor:</strong> Gatan K3 / Falcon 4 Direct Counting</div>
              <div><strong>Frame Rate:</strong> 40 frames/sec (Beam-induced motion correction)</div>
              <div><strong>Accumulated Dose:</strong> 40 e⁻/Å² (Critical radiation limit)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Educational & Theoretical Foundation */}
      <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
        {activeTab === 'nobel_2017_pioneers' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Nobel Prize in Chemistry 2017: The Resolution Revolution
            </h3>
            <p>
              Awarded jointly to <strong>Jacques Dubochet</strong>, <strong>Joachim Frank</strong>, and <strong>Richard Henderson</strong> for transforming structural biology from blurry blob-ology to sub-2 Å atomic resolution:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-800/50">
                <div className="font-bold text-cyan-300">Jacques Dubochet (1981)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Invented liquid ethane plunge vitrification (&gt;10⁶ K/s) creating glass-like amorphous ice that preserves biomolecules in native hydration.
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-blue-800/50">
                <div className="font-bold text-blue-300">Joachim Frank (1975-1981)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pioneered single-particle 2D classification and 3D Radon/Fourier Slice reconstruction algorithms, turning noisy projections into atomic volumes.
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-indigo-800/50">
                <div className="font-bold text-indigo-300">Richard Henderson (1975-1990)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Proved electron cryo-microscopy can overcome radiation damage and achieve atomic models (bacteriorhodopsin 3.5 Å, 1990).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fsc_gold_standard' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-sky-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              The Fourier Shell Correlation (FSC) 0.143 Gold-Standard Criterion
            </h3>
            <p>
              In single-particle reconstruction, the particle dataset is randomly split into two completely independent halves (<strong className="text-slate-100">Gold-Standard</strong>). Each half is independently refined to eliminate noise correlation:
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              FSC(q) = [∑ F₁(q)·F₂*(q)] / [ √∑|F₁|² · √∑|F₂|² ]<br />
              Nominal Resolution d = 1 / q  where  FSC(q) = 0.143
            </div>
            <p className="text-[11px] text-slate-400">
              Rosenthal and Henderson demonstrated that the <strong>0.143 threshold</strong> rigorously corresponds to a signal-to-noise ratio where the reconstructed density has sufficient information for de novo atomic model building.
            </p>
          </div>
        )}

        {activeTab === 'ctf_optics' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Contrast Transfer Function (CTF) & Thon Ring Phase Correction
            </h3>
            <p>
              Cryo-EM operates under weak phase contrast. Spherical aberration (<strong className="text-slate-100">C_s</strong>) and defocus (<strong className="text-slate-100">Δz</strong>) modulate phase information according to the wave aberration function:
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              CTF(q) = -sin( (π/2)·Cs·λ³·q⁴ - π·Δz·λ·q² ) · E(q)<br />
              E(q) = exp(-B · q² / 4)
            </div>
            <p className="text-[11px] text-slate-400">
              Zero-crossings of the CTF produce concentric dark and bright rings (Thon rings) in the Fourier power spectrum. Advanced algorithms (RELION, cryoSPARC) invert the negative phases to synthesize true atomic densities.
            </p>
          </div>
        )}

        {activeTab === 'curriculum_gdpt' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Curriculum Alignment (GDPT 2018)
            </h3>
            <p>{specimen.curriculumNotes}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Vật lý 12: Quang hình & Bước sóng De Broglie</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hiệu ứng quang hình điện tử, hiện tượng giao thoa sóng electron relativistic ở 300 kV (λ = 0.0197 Å) vượt qua giới hạn quang học Abbe để đạt phân giải hạ-angstrom.
                </p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Sinh học & Hóa học 10-12: Đại phân tử sống</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Cấu trúc phân tử 3D nguyên tử của ribosome, gai glycoprotein virus và thụ thể màng, làm sáng tỏ cơ chế dịch mã di truyền và tương tác thuốc kháng thể.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
