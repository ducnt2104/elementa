// src/components/visualizations/SaxsScatteringVisualizer.tsx
// Milestone 59: Small-Angle X-Ray Scattering (SAXS), Guinier Radius of Gyration & Kratky Plot Visualizer
// Standards: Nobel Prize in Chemistry 1936 (Peter Debye), André Guinier (1939, Guinier Law), Otto Kratky (Kratky Plot)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Nhiễu xạ và tán xạ tia X; Hóa học 12: Cấu trúc không gian protein bậc III, IV, hạt nano & đại phân tử sinh học)

import React, { useState, useMemo } from 'react';
import {
  SAXS_PROTEIN_CATALOG,
  SaxsProteinStandard,
  simulateSaxsExperiment
} from '../../domain/saxsScatteringEngine';
import { sound } from '../../audio/soundEngine';
import {
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
  Scan,
  Compass,
  FileText
} from 'lucide-react';

export interface SaxsScatteringVisualizerProps {
  initialProteinId?: string;
}

export const SaxsScatteringVisualizer: React.FC<SaxsScatteringVisualizerProps> = ({
  initialProteinId
}) => {
  const [selectedProteinId, setSelectedProteinId] = useState<string>(
    initialProteinId || 'bsa_monomer'
  );
  const [concentration, setConcentration] = useState<number>(2.0); // mg/mL
  const [aggregationFraction, setAggregationFraction] = useState<number>(0.0); // 0 to 0.08
  const [plotMode, setPlotMode] = useState<'kratky_plot' | 'guinier_fit' | 'log_log_scattering' | 'pair_distance_pr'>('kratky_plot');
  const [activeTab, setActiveTab] = useState<'guinier_debye_laws' | 'kratky_folding_diagnostic' | 'pair_distance_shape' | 'synchrotron_gdpt'>('kratky_folding_diagnostic');

  const simResult = useMemo(() => {
    return simulateSaxsExperiment(selectedProteinId, concentration, aggregationFraction);
  }, [selectedProteinId, concentration, aggregationFraction]);

  const {
    protein,
    scatteringCurve,
    pairDistanceCurve,
    guinier,
    estimatedMwKDa
  } = simResult;

  const handleSelectProtein = (id: string) => {
    setSelectedProteinId(id);
    sound.playGuinierFitLockTone();
  };

  const handleConcentrationChange = (val: number) => {
    setConcentration(val);
    sound.playSaxsBeamExposureHum();
  };

  const handleAggregationChange = (val: number) => {
    setAggregationFraction(val);
    sound.playSaxsBeamExposureHum();
  };

  // SVG coordinate dimensions
  const svgW = 600;
  const svgH = 300;
  const pad = { top: 30, right: 30, bottom: 45, left: 65 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // Coordinate transforms for Kratky Plot: q²·I(q) vs q
  const qMin = 0.008;
  const qMax = 0.35;
  const maxKratky = useMemo(() => {
    return Math.max(...scatteringCurve.map((p) => p.kratky), 0.01) * 1.15;
  }, [scatteringCurve]);

  const toKratkyX = (q: number) => pad.left + ((q - qMin) / (qMax - qMin)) * plotW;
  const toKratkyY = (k: number) => pad.top + plotH - (k / maxKratky) * plotH;

  const kratkyPath = useMemo(() => {
    return scatteringCurve.reduce((acc, pt, idx) => {
      const x = toKratkyX(pt.q);
      const y = toKratkyY(pt.kratky);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [scatteringCurve, maxKratky]);

  // Coordinate transforms for Guinier Plot: ln I(q) vs q²
  const q2Min = 0;
  const q2Max = Math.max(...scatteringCurve.slice(0, 24).map((p) => p.qSquared), 0.01);
  const minLnI = Math.min(...scatteringCurve.slice(0, 24).map((p) => p.logIntensity));
  const maxLnI = Math.max(...scatteringCurve.slice(0, 24).map((p) => p.logIntensity)) + 0.3;

  const toGuinierX = (q2: number) => pad.left + ((q2 - q2Min) / (q2Max - q2Min)) * plotW;
  const toGuinierY = (lnI: number) => pad.top + plotH - ((lnI - minLnI) / (maxLnI - minLnI)) * plotH;

  // Coordinate transforms for Log-Log Scattering: log I(q) vs log q
  const minLogQ = Math.log10(qMin);
  const maxLogQ = Math.log10(qMax);
  const minLogI = Math.log10(Math.min(...scatteringCurve.map((p) => Math.max(0.001, p.intensity))));
  const maxLogI = Math.log10(Math.max(...scatteringCurve.map((p) => p.intensity))) + 0.2;

  const toLogX = (q: number) => pad.left + ((Math.log10(q) - minLogQ) / (maxLogQ - minLogQ)) * plotW;
  const toLogY = (intensity: number) => pad.top + plotH - ((Math.log10(Math.max(0.001, intensity)) - minLogI) / (maxLogI - minLogI)) * plotH;

  const logLogPath = useMemo(() => {
    return scatteringCurve.reduce((acc, pt, idx) => {
      const x = toLogX(pt.q);
      const y = toLogY(pt.intensity);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [scatteringCurve, minLogI, maxLogI]);

  // Coordinate transforms for P(r) Pair Distance
  const rMax = protein.dMaxAngstroms;
  const toPrX = (r: number) => pad.left + (r / rMax) * plotW;
  const toPrY = (pr: number) => pad.top + plotH - (pr / 105) * plotH;

  const prPath = useMemo(() => {
    return pairDistanceCurve.reduce((acc, pt, idx) => {
      const x = toPrX(pt.r);
      const y = toPrY(pt.pr);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [pairDistanceCurve]);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-xl border border-cyan-500/40 text-cyan-400">
            <Scan className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                Small-Angle X-Ray Scattering (SAXS) & Macromolecular Sizing
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-mono">
                GUINIER LAW · KRATKY PLOT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Guinier Radius of Gyration (R_g) · Folded vs IDP Kratky Diagnostic · Real-Space P(r) Distance Distribution
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('kratky_folding_diagnostic')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'kratky_folding_diagnostic'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Kratky Folding Diagnostic
          </button>
          <button
            onClick={() => setActiveTab('guinier_debye_laws')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'guinier_debye_laws'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Guinier & Debye Laws
          </button>
          <button
            onClick={() => setActiveTab('pair_distance_shape')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'pair_distance_shape'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            P(r) Distance & D_max
          </button>
          <button
            onClick={() => setActiveTab('synchrotron_gdpt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'synchrotron_gdpt'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            IUPAC & GDPT 2018
          </button>
        </div>
      </div>

      {/* Protein Standard Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {SAXS_PROTEIN_CATALOG.map((item) => {
          const isSelected = item.id === protein.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectProtein(item.id)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400 truncate">
                {item.category.replace('_', ' ')}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                {item.name.split(' (')[0]}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">
                Rg: {item.theoreticalRgAngstroms} Å ({item.molecularWeightKDa} kDa)
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Dmax: {item.dMaxAngstroms} Å
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
        {/* Left Column: SAXS Graphic Display (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-4">
          {/* Plot Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setPlotMode('kratky_plot')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'kratky_plot'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kratky q²·I(q)
              </button>
              <button
                onClick={() => setPlotMode('guinier_fit')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'guinier_fit'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Guinier ln I vs q²
              </button>
              <button
                onClick={() => setPlotMode('log_log_scattering')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'log_log_scattering'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Log-Log I(q)
              </button>
              <button
                onClick={() => setPlotMode('pair_distance_pr')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'pair_distance_pr'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                P(r) Distance
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-cyan-400 font-semibold">
                Rg = {guinier.rgAngstroms.toFixed(1)} Å ({guinier.rgNanometers.toFixed(2)} nm)
              </span>
              <span className="text-slate-400">
                R² = {guinier.rSquared.toFixed(4)}
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-900 overflow-hidden">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="saxsKratkyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="saxsPrGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((frac) => (
                <line
                  key={`h-${frac}`}
                  x1={pad.left}
                  y1={pad.top + plotH * frac}
                  x2={svgW - pad.right}
                  y2={pad.top + plotH * frac}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Mode 1: Kratky Plot */}
              {plotMode === 'kratky_plot' && (
                <>
                  <path
                    d={kratkyPath}
                    fill="none"
                    stroke="url(#saxsKratkyGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Characteristic Folded vs IDP diagnostic annotations */}
                  {protein.category === 'intrinsically_disordered' ? (
                    <g transform={`translate(${toKratkyX(0.24)}, ${toKratkyY(scatteringCurve[60].kratky) - 15})`}>
                      <text fill="#c084fc" fontSize="10" fontWeight="bold">
                        Monotonic Rise (Gaussian Random Coil IDP)
                      </text>
                    </g>
                  ) : (
                    <g transform={`translate(${toKratkyX(0.08)}, ${toKratkyY(maxKratky * 0.9)})`}>
                      <text fill="#38bdf8" fontSize="10" fontWeight="bold">
                        Bell-Shaped Peak (Compact Folded Globular)
                      </text>
                    </g>
                  )}

                  {/* X-Axis Ticks (q in Å⁻¹) */}
                  {[0.05, 0.10, 0.15, 0.20, 0.25, 0.30].map((q) => (
                    <g key={q} transform={`translate(${toKratkyX(q)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {q.toFixed(2)}
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
                    Kratky Function: q²·I(q) (Å⁻²·a.u.)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Momentum Transfer q (Å⁻¹) — Folding & Compactness Diagnostic
                  </text>
                </>
              )}

              {/* Mode 2: Guinier Plot (ln I vs q²) */}
              {plotMode === 'guinier_fit' && (
                <>
                  {/* Guinier Fit Regression Line */}
                  <line
                    x1={toGuinierX(0)}
                    y1={toGuinierY(guinier.intercept)}
                    x2={toGuinierX(q2Max)}
                    y2={toGuinierY(guinier.intercept + guinier.slope * q2Max)}
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Scatter Data Points */}
                  {scatteringCurve.slice(0, 24).map((pt, i) => {
                    const isValidGuinier = pt.q * protein.theoreticalRgAngstroms <= 1.3;
                    return (
                      <circle
                        key={i}
                        cx={toGuinierX(pt.qSquared)}
                        cy={toGuinierY(pt.logIntensity)}
                        r={isValidGuinier ? 3.5 : 2.5}
                        fill={isValidGuinier ? '#38bdf8' : '#64748b'}
                        stroke="#fff"
                        strokeWidth={isValidGuinier ? 1.5 : 0.5}
                      />
                    );
                  })}

                  {/* Guinier Limit Marker q·Rg = 1.3 */}
                  <line
                    x1={toGuinierX(Math.pow(1.3 / protein.theoreticalRgAngstroms, 2))}
                    y1={pad.top}
                    x2={toGuinierX(Math.pow(1.3 / protein.theoreticalRgAngstroms, 2))}
                    y2={pad.top + plotH}
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={toGuinierX(Math.pow(1.3 / protein.theoreticalRgAngstroms, 2)) + 5}
                    y={pad.top + 15}
                    fill="#fbbf24"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    q·Rg = 1.3 Limit
                  </text>

                  {/* Regression Formula Label */}
                  <text
                    x={toGuinierX(q2Max * 0.45)}
                    y={pad.top + 35}
                    fill="#38bdf8"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ln I(0) = {guinier.intercept.toFixed(2)} · Rg = {guinier.rgAngstroms.toFixed(1)} Å
                  </text>

                  {/* X-Axis Ticks (q² in Å⁻²) */}
                  {[0.0, 0.002, 0.004, 0.006, 0.008].map((q2) => (
                    <g key={q2} transform={`translate(${toGuinierX(q2)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        {q2.toFixed(3)}
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
                    Natural Log of Scattering Intensity: ln I(q)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Square of Momentum Transfer q² (Å⁻²) — Guinier Region (q·Rg ≤ 1.3)
                  </text>
                </>
              )}

              {/* Mode 3: Log-Log Scattering Overview */}
              {plotMode === 'log_log_scattering' && (
                <>
                  <path
                    d={logLogPath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Power-law asymptotic annotations */}
                  <text x={toLogX(0.015)} y={pad.top + 25} fill="#94a3b8" fontSize="9">
                    Guinier Plateau (q → 0)
                  </text>
                  <text x={toLogX(0.18)} y={pad.top + plotH - 30} fill="#94a3b8" fontSize="9">
                    Porod Tail (I ~ q⁻⁴)
                  </text>

                  {/* X-Axis Ticks */}
                  {[0.01, 0.03, 0.10, 0.30].map((q) => (
                    <g key={q} transform={`translate(${toLogX(q)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {q}
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
                    Log Scattering Intensity: log₁₀ I(q)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Log Momentum Transfer: log₁₀ q (Å⁻¹)
                  </text>
                </>
              )}

              {/* Mode 4: Pair Distance Distribution P(r) */}
              {plotMode === 'pair_distance_pr' && (
                <>
                  {/* Filled Area */}
                  <path
                    d={`${prPath} L ${toPrX(rMax)} ${toPrY(0)} L ${toPrX(0)} ${toPrY(0)} Z`}
                    fill="url(#saxsPrGradient)"
                  />
                  <path
                    d={prPath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* D_max point marker */}
                  <circle cx={toPrX(rMax)} cy={toPrY(0)} r="4" fill="#f43f5e" />
                  <text
                    x={toPrX(rMax)}
                    y={toPrY(0) - 10}
                    fill="#f43f5e"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    D_max = {rMax} Å
                  </text>

                  {/* X-Axis Ticks (r in Å) */}
                  {[0, 25, 50, 75, 100, 125, 150].filter((r) => r <= rMax).map((r) => (
                    <g key={r} transform={`translate(${toPrX(r)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {r}
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
                    Probability Distribution: P(r)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Inter-atomic Distance r (Å) — Real Space Histogram
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Sample Concentration:
                </span>
                <span className="font-mono text-cyan-400 font-semibold">{concentration.toFixed(1)} mg/mL</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={concentration}
                onChange={(e) => handleConcentrationChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0.5 mg/mL (Dilute)</span>
                <span>4.0 mg/mL</span>
                <span>8.0 mg/mL (High Signal)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Sample Aggregation / Oligomers:
                </span>
                <span className="font-mono text-amber-400 font-semibold">{(aggregationFraction * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.06"
                step="0.005"
                value={aggregationFraction}
                onChange={(e) => handleAggregationChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0% (Monodisperse)</span>
                <span>3% (Low-q Upturn)</span>
                <span>6% (Polydisperse)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Biophysical Metrics Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Sizing & Guinier Analysis Card */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                Guinier Structural Parameters
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  guinier.aggregationWarning
                    ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                    : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                }`}
              >
                {guinier.aggregationWarning ? 'AGGREGATION UPTURN' : 'MONODISPERSE FIT'}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Radius of Gyration (Rg)</div>
                <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
                  {guinier.rgAngstroms.toFixed(1)} Å
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  ({guinier.rgNanometers.toFixed(2)} nm)
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Max Dimension (Dmax)</div>
                <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">
                  {protein.dMaxAngstroms} Å
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  ({(protein.dMaxAngstroms / 10).toFixed(1)} nm)
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Estimated Mol Wt</div>
                <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">
                  {estimatedMwKDa.toFixed(1)} kDa
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  True: {protein.molecularWeightKDa} kDa
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Forward Scattering I(0)</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {guinier.i0.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  R²: {guinier.rSquared.toFixed(4)}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {protein.biologicalDescription}
            </p>
          </div>

          {/* Quick Folding Diagnostic Box */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              Conformational State
            </span>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span>Class:</span>
                <strong className="text-cyan-300">{protein.category.replace('_', ' ').toUpperCase()}</strong>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span>Guinier Window:</span>
                <span className="text-slate-400">q·Rg ≤ {guinier.qRgMax} (Target ≤ 1.30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Educational & Theoretical Foundation */}
      <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
        {activeTab === 'kratky_folding_diagnostic' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              The Kratky Plot: Universal Diagnostic for Protein Globularity vs Intrinsic Disorder
            </h3>
            <p>
              In a Kratky plot (<strong className="text-slate-100">q²·I(q) vs q</strong>), the mathematical asymptotic behavior of the scattering intensity reveals protein folding:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-800/50">
                <div className="font-bold text-cyan-300">Compact Globular (Bell Peak)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  At high angles, scattering follows Porod's law (<strong>I ~ q⁻⁴</strong>). Multiplying by q² causes the curve to decay to zero (<strong>q²·q⁻⁴ ~ q⁻² → 0</strong>), forming a distinct bell-shaped maximum.
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-purple-800/50">
                <div className="font-bold text-purple-300">Intrinsically Disordered (Rising)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Flexible polymer chains obey Debye's law (<strong>I ~ q⁻²</strong>). Multiplying by q² yields a flat plateau or monotonically rising curve (<strong>q²·q⁻² → constant</strong>).
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-indigo-800/50">
                <div className="font-bold text-indigo-300">Multi-domain Flexible Assemblies</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Antibodies and modular kinases exhibit double-peaked or shouldered curves reflecting inter-domain distances and flexible linkers.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guinier_debye_laws' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
              <Atom className="w-4 h-4 text-indigo-400" />
              Guinier's Law (1939) & The Debye Scattering Equation (Nobel 1936)
            </h3>
            <p>
              In the low-angle limit (<strong className="text-slate-100">q·R_g ≤ 1.3</strong>), the scattering of any particulate macromolecule in solution is independent of internal atomic details and depends only on its overall size (<strong className="text-cyan-400">R_g</strong>) and molecular weight (<strong className="text-cyan-400">I(0)</strong>):
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              ln I(q) ≈ ln I(0) - (R_g² / 3) · q²<br />
              Slope = -R_g² / 3  ⟹  R_g = √(-3 · Slope)
            </div>
            <p className="text-[11px] text-slate-400">
              Any trace of soluble aggregate produces an immediate steep upward curvature at low q, serving as the gold-standard quality control gate in structural biology.
            </p>
          </div>
        )}

        {activeTab === 'pair_distance_shape' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              Pair Distance Distribution Function P(r) & Direct Space Electron Histogram
            </h3>
            <p>
              The indirect Fourier transform of the reciprocal-space scattering curve yields <strong className="text-slate-100">P(r)</strong>, representing the probability histogram of all electron-pair distances inside the particle:
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              P(r) = (r / 2π²) · ∫ q · I(q) · sin(q · r) dq   (0 ≤ r ≤ D_max)
            </div>
            <p className="text-[11px] text-slate-400">
              The point where P(r) drops smoothly to zero defines <strong className="text-rose-400">D_max</strong>, the absolute maximum diameter of the molecule.
            </p>
          </div>
        )}

        {activeTab === 'synchrotron_gdpt' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Curriculum Alignment (GDPT 2018) & Synchrotron Facilities
            </h3>
            <p>{protein.curriculumNotes}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Vật lý 12: Bức xạ Hãm & Tán Xạ Tia X</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Bản chất sóng điện từ của tia X, động học photon, phương trình tán xạ đàn hồi và tán xạ Thomson từ đám mây electron của phân tử sinh học.
                </p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Hóa học 12: Cấu trúc Protein Bậc III, IV</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hình thể không gian dạng cầu (globular) so với dạng cuộn ngẫu nhiên (random coil); bán kính quán tính Rg và trạng thái tập hợp của đại phân tử sinh học.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
