// src/components/visualizations/ThermalShiftVisualizer.tsx
// Milestone 58: Differential Scanning Fluorimetry (DSF) & Protein Thermal Shift Assay (PTSA) Visualizer
// Standards: Boltzmann Two-State Sigmoidal Unfolding, SYPRO Orange Hydrophobic Dye Probe, Schellman-Brandts Ligand Stabilization Formulation
// Curriculum: Vietnam GDPT 2018 (Hóa học 12: Biến tính nhiệt của protein, tương tác kỵ nước, phức chất kẽm trong enzym; Sinh học 10-12: Cấu trúc không gian, trung tâm hoạt động enzym & thuốc ức chế cạnh tranh)

import React, { useState, useMemo } from 'react';
import {
  DSF_ASSAY_CATALOG,
  DsfAssayStandard,
  simulateDsfExperiment
} from '../../domain/thermalShiftEngine';
import { sound } from '../../audio/soundEngine';
import {
  Flame,
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
  Thermometer,
  RotateCcw,
  Pill,
  Droplets
} from 'lucide-react';

export interface ThermalShiftVisualizerProps {
  initialAssayId?: string;
}

export const ThermalShiftVisualizer: React.FC<ThermalShiftVisualizerProps> = ({
  initialAssayId
}) => {
  const [selectedAssayId, setSelectedAssayId] = useState<string>(
    initialAssayId || 'ca2_acetazolamide'
  );
  const [ligandConcentration, setLigandConcentration] = useState<number>(10.0); // µM
  const [plotMode, setPlotMode] = useState<'sigmoidal_melt' | 'derivative_tm_peaks' | 'dual_overlay'>('sigmoidal_melt');
  const [activeTab, setActiveTab] = useState<'boltzmann_mechanics' | 'ligand_stabilization' | 'drug_screening' | 'curriculum_gdpt'>('ligand_stabilization');

  const simResult = useMemo(() => {
    return simulateDsfExperiment(selectedAssayId, ligandConcentration);
  }, [selectedAssayId, ligandConcentration]);

  const {
    assay,
    measuredApoTm,
    measuredHoloTm,
    measuredDeltaTm,
    stabilizationStatus,
    points
  } = simResult;

  const handleSelectAssay = (id: string) => {
    setSelectedAssayId(id);
    sound.playThermalShiftPeakTone();
  };

  const handleConcentrationChange = (val: number) => {
    setLigandConcentration(val);
    sound.playDsfFluorescenceSurge();
  };

  // SVG coordinate dimensions
  const svgW = 600;
  const svgH = 300;
  const pad = { top: 30, right: 30, bottom: 45, left: 65 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const tMin = 20;
  const tMax = 95;
  const toX = (t: number) => pad.left + ((t - tMin) / (tMax - tMin)) * plotW;

  // Max fluorescence for Y scaling
  const maxF = assay.maxFluorescenceRfu * 1.05;
  const toY_F = (f: number) => pad.top + plotH - (f / maxF) * plotH;

  // Max derivative for Y scaling
  const maxDeriv = useMemo(() => {
    return Math.max(
      ...points.map((p) => Math.max(p.dF_dT_apo, p.dF_dT_holo)),
      100
    ) * 1.1;
  }, [points]);
  const toY_D = (d: number) => pad.top + plotH - (d / maxDeriv) * plotH;

  // SVG Path generation
  const apoMeltPath = useMemo(() => {
    return points.reduce((acc, pt, idx) => {
      const x = toX(pt.temperatureC);
      const y = toY_F(pt.fluorescenceApo);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [points, maxF]);

  const holoMeltPath = useMemo(() => {
    return points.reduce((acc, pt, idx) => {
      const x = toX(pt.temperatureC);
      const y = toY_F(pt.fluorescenceHolo);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [points, maxF]);

  const apoDerivPath = useMemo(() => {
    return points.reduce((acc, pt, idx) => {
      const x = toX(pt.temperatureC);
      const y = toY_D(pt.dF_dT_apo);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [points, maxDeriv]);

  const holoDerivPath = useMemo(() => {
    return points.reduce((acc, pt, idx) => {
      const x = toX(pt.temperatureC);
      const y = toY_D(pt.dF_dT_holo);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [points, maxDeriv]);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-xl border border-amber-500/40 text-amber-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-rose-200 to-cyan-300 bg-clip-text text-transparent">
                Differential Scanning Fluorimetry (DSF) & Thermal Shift Assay
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800 font-mono">
                SYPRO ORANGE · ΔTm SHIFT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hydrophobic Core Exposure · Boltzmann Two-State Sigmoid · High-Throughput Drug Binding Stabilization
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('ligand_stabilization')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'ligand_stabilization'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            ΔTm Shift Assay
          </button>
          <button
            onClick={() => setActiveTab('boltzmann_mechanics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'boltzmann_mechanics'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Boltzmann Model & Dye
          </button>
          <button
            onClick={() => setActiveTab('drug_screening')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'drug_screening'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Drug Discovery & Kd
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            IUPAC & GDPT 2018
          </button>
        </div>
      </div>

      {/* Target-Ligand System Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {DSF_ASSAY_CATALOG.map((item) => {
          const isSelected = item.id === assay.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectAssay(item.id)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-950/60 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400 truncate">
                {item.targetClass.replace('_', ' ')}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                {item.targetProteinName.split(' (')[0]}
              </div>
              <div className="text-[11px] text-amber-400 font-mono mt-1">
                + {item.ligandName.split(' (')[0]}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                ΔTm: +{item.maxDeltaTmCelsius}°C
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: DSF Fluorimetry Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-4">
          {/* Plot Mode Toggle & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setPlotMode('sigmoidal_melt')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'sigmoidal_melt'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Melt Curves F(T)
              </button>
              <button
                onClick={() => setPlotMode('derivative_tm_peaks')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'derivative_tm_peaks'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1st Derivative dF/dT (Tm)
              </button>
              <button
                onClick={() => setPlotMode('dual_overlay')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  plotMode === 'dual_overlay'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dual Overlay
              </button>
            </div>

            {/* Curve Legend */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-cyan-400 rounded-full inline-block" />
                <span className="text-cyan-300">Apo (Unbound): {measuredApoTm.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-400 rounded-full inline-block" />
                <span className="text-amber-300">Holo (+Ligand): {measuredHoloTm.toFixed(1)}°C</span>
              </div>
            </div>
          </div>

          {/* SVG Graph Graphic */}
          <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-900 overflow-hidden">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="dsfApoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="dsfHoloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
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

              {/* Sigmoidal Melt Curves */}
              {(plotMode === 'sigmoidal_melt' || plotMode === 'dual_overlay') && (
                <>
                  <path
                    d={apoMeltPath}
                    fill="none"
                    stroke="url(#dsfApoGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={plotMode === 'dual_overlay' ? 0.4 : 1.0}
                  />
                  <path
                    d={holoMeltPath}
                    fill="none"
                    stroke="url(#dsfHoloGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={plotMode === 'dual_overlay' ? 0.4 : 1.0}
                  />
                </>
              )}

              {/* 1st Derivative Curves */}
              {(plotMode === 'derivative_tm_peaks' || plotMode === 'dual_overlay') && (
                <>
                  <path
                    d={apoDerivPath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={holoDerivPath}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Vertical Tm Marker Lines */}
              <line
                x1={toX(measuredApoTm)}
                y1={pad.top}
                x2={toX(measuredApoTm)}
                y2={pad.top + plotH}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <line
                x1={toX(measuredHoloTm)}
                y1={pad.top}
                x2={toX(measuredHoloTm)}
                y2={pad.top + plotH}
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* ΔTm Arrow Bar */}
              {measuredDeltaTm > 0 && (
                <g>
                  <line
                    x1={toX(measuredApoTm)}
                    y1={pad.top + 20}
                    x2={toX(measuredHoloTm)}
                    y2={pad.top + 20}
                    stroke="#34d399"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                  <rect
                    x={(toX(measuredApoTm) + toX(measuredHoloTm)) / 2 - 35}
                    y={pad.top + 8}
                    width="70"
                    height="18"
                    rx="4"
                    fill="#064e3b"
                    stroke="#059669"
                  />
                  <text
                    x={(toX(measuredApoTm) + toX(measuredHoloTm)) / 2}
                    y={pad.top + 20}
                    fill="#34d399"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ΔTm = +{measuredDeltaTm.toFixed(1)}°C
                  </text>
                </g>
              )}

              {/* Temperature X-Axis Ticks */}
              {[20, 30, 40, 50, 60, 70, 80, 90].map((t) => (
                <g key={t} transform={`translate(${toX(t)}, ${pad.top + plotH})`}>
                  <line y2="5" stroke="#475569" />
                  <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    {t}°C
                  </text>
                </g>
              ))}

              {/* Y-Axis Label */}
              <text
                x={-svgH / 2}
                y="18"
                transform="rotate(-90)"
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
              >
                {plotMode === 'sigmoidal_melt'
                  ? 'SYPRO Orange Fluorescence (RFU)'
                  : plotMode === 'derivative_tm_peaks'
                  ? 'First Derivative dF/dT (RFU/°C)'
                  : 'Fluorescence & Derivative (Normalized)'}
              </text>
              <text
                x={pad.left + plotW / 2}
                y={svgH - 8}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
              >
                Temperature (°C) — Linear Ramp (1°C/min)
              </text>
            </svg>
          </div>

          {/* Interactive Concentration Slider */}
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Pill className="w-3.5 h-3.5 text-amber-400" />
                Ligand Concentration [{assay.ligandName.split(' (')[0]}]:
              </span>
              <span className="font-mono text-amber-400 font-semibold">
                {ligandConcentration.toFixed(1)} µM ({((ligandConcentration / (ligandConcentration + assay.kdNanomolar / 1000)) * 100).toFixed(0)}% Saturated)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={ligandConcentration}
              onChange={(e) => handleConcentrationChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.0 µM (Pure Apo)</span>
              <span>10.0 µM</span>
              <span>50.0 µM (Saturating Holo)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Biophysical Parameters & Screening Metrics (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Thermal Shift & Affinity Panel */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                Thermal Stability Shift
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  stabilizationStatus === 'HIGH_STABILIZATION'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                    : stabilizationStatus === 'MODERATE_STABILIZATION'
                    ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {stabilizationStatus.replace('_', ' ')}
              </span>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Apo Tm (Unbound)</div>
                <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
                  {measuredApoTm.toFixed(1)}°C
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Holo Tm (+Drug)</div>
                <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">
                  {measuredHoloTm.toFixed(1)}°C
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Thermal Shift ΔTm</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  +{measuredDeltaTm.toFixed(1)}°C
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Affinity (Kd)</div>
                <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">
                  {assay.kdNanomolar < 1000 ? `${assay.kdNanomolar} nM` : `${(assay.kdNanomolar / 1000).toFixed(1)} µM`}
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Enthalpy (ΔHm)</div>
                <div className="text-sm font-bold font-mono text-slate-300 mt-0.5">
                  {assay.deltaHkJmol} kJ/mol
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Target Mol Wt</div>
                <div className="text-sm font-bold font-mono text-slate-300 mt-0.5">
                  {(assay.molecularWeightDa / 1000).toFixed(1)} kDa
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {assay.biologicalMechanism}
            </p>
          </div>

          {/* Hydrophobic Dye Binding Diagram */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              SYPRO Orange Fluorogenic Mechanism
            </span>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span><strong>Native State:</strong> Hydrophobic core buried; dye quenched in aqueous buffer.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span><strong>Denatured State:</strong> Thermal unfolding exposes Leu/Ile/Val/Phe core; dye binds with massive &gt;100× fluorescence surge.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Educational & Theoretical Foundation */}
      <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
        {activeTab === 'ligand_stabilization' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Schellman-Brandts Formulation & Thermodynamic Stabilization (ΔTm)
            </h3>
            <p>
              When a small-molecule drug or cofactor binds specifically to the native folded state with high affinity (<strong className="text-slate-100">K_D</strong>),
              it lowers the free energy of the folded state, increasing the free energy required for thermal denaturation:
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
              ΔG_unfold(holo) = ΔG_unfold(apo) + R·T·ln(1 + [L] / K_D)<br />
              ΔT_m = T_m(holo) - T_m(apo) ≈ (R·T_m² / ΔH_m) · ln(1 + [L] / K_D)
            </div>
            <p className="text-[11px] text-slate-400">
              A large positive thermal shift (<strong className="text-emerald-400">ΔTm &gt; +5°C</strong>) is direct proof of on-target binding and conformational stabilization in drug lead optimization.
            </p>
          </div>
        )}

        {activeTab === 'boltzmann_mechanics' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Boltzmann Two-State Unfolding Sigmoid & First Derivative Peak
            </h3>
            <p>
              The experimental fluorescence trace follows a classic two-state sigmoidal curve:
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
              F(T) = F_pre(T) + [F_post(T) - F_pre(T)] / [1 + exp((T_m - T) / a)]<br />
              (dF/dT)_max occurs exactly at T = T_m (Inflection Point)
            </div>
            <p className="text-[11px] text-slate-400">
              The slope factor <strong className="text-slate-200">a = R·T_m² / ΔH_m</strong> reflects the cooperativity of the unfolding transition. Highly cooperative globins unfold in a narrow temperature window (<strong className="text-slate-200">a ≈ 2.0°C</strong>).
            </p>
          </div>
        )}

        {activeTab === 'drug_screening' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2">
              <Pill className="w-4 h-4 text-purple-400" />
              High-Throughput Screening (HTS) in Biopharmaceuticals
            </h3>
            <p>
              DSF is the premier assay used by pharmaceutical giants and academic labs to screen chemical libraries of 100,000+ compounds using 384-well real-time PCR instruments:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Low Sample Consumption</div>
                <p className="text-[11px] text-slate-400 mt-1">Requires only 1 - 5 µg of unpurified target protein per well.</p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Label-Free Target</div>
                <p className="text-[11px] text-slate-400 mt-1">Target protein does not require fluorescent tagging or radio-labeling.</p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Hit Validation</div>
                <p className="text-[11px] text-slate-400 mt-1">Directly filters out non-specific aggregators and pan-assay interference (PAINS).</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum_gdpt' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Curriculum Alignment (GDPT 2018)
            </h3>
            <p>{assay.curriculumNotes}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Hóa học 12: Protein & Enzim</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Đặc tính biến tính nhiệt của protein (phá vỡ liên kết hydro và tương tác ion); phức chất kẽm trong enzym xúc tác sinh học.
                </p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Sinh học 10-12: Dược lý & Bệnh học</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Cơ chế ức chế enzym cạnh tranh của thuốc kháng sinh, thuốc kháng virus (Paxlovid) và liệu pháp trúng đích ức chế kinase trong ung thư.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
