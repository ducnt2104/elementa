// src/components/visualizations/ForwardOsmosisVisualizer.tsx
// Interactive Visualizer: Forward Osmosis (FO) Desalination & Pressure Retarded Osmosis (PRO) Clean Energy
// Conforms strictly to IUPAC membrane transport standards, Kedem-Katchalsky equations, and Vietnam GDPT 2018 Chemistry.

import React, { useState, useMemo } from 'react';
import {
  Droplets,
  Activity,
  Factory,
  Zap,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Flame,
  ArrowRight,
  TrendingUp,
  Waves
} from 'lucide-react';
import {
  FoMembraneType,
  DrawSolutionType,
  FeedWaterSourceType,
  FO_MEMBRANE_CATALOG,
  DRAW_SOLUTION_CATALOG,
  FEED_WATER_CATALOG,
  calculateFoFlux,
  calculateProPowerDensity,
  calculateCommercialZldPlantBalance
} from '../../domain/forwardOsmosisDesalinationEngine';
import { sound } from '../../audio/soundEngine';

type FoTabMode =
  | 'FORWARD_OSMOSIS_DESALINATION'
  | 'PRO_SALINITY_GRADIENT_POWER'
  | 'COMMERCIAL_ZLD_PLANT_BALANCE';

export const ForwardOsmosisVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<FoTabMode>('FORWARD_OSMOSIS_DESALINATION');

  // Controls
  const [selectedMembrane, setSelectedMembrane] = useState<FoMembraneType>('TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER');
  const [selectedDraw, setSelectedDraw] = useState<DrawSolutionType>('THERMOLYTIC_AMMONIUM_BICARBONATE');
  const [selectedFeed, setSelectedFeed] = useState<FeedWaterSourceType>('RO_DESALINATION_BRINE_70_PPT');

  const [drawMolarityM, setDrawMolarityM] = useState<number>(2.5);
  const [operatingTempCelsius, setOperatingTempCelsius] = useState<number>(25.0);
  const [proPressureRatio, setProPressureRatio] = useState<number>(0.50);
  const [membraneAreaM2, setMembraneAreaM2] = useState<number>(5000.0);

  const membraneConfig = FO_MEMBRANE_CATALOG[selectedMembrane];
  const drawConfig = DRAW_SOLUTION_CATALOG[selectedDraw];
  const feedConfig = FEED_WATER_CATALOG[selectedFeed];

  // FO Flux calculation
  const foFlux = useMemo(() => {
    return calculateFoFlux(
      membraneConfig,
      drawConfig,
      feedConfig,
      drawMolarityM,
      operatingTempCelsius
    );
  }, [membraneConfig, drawConfig, feedConfig, drawMolarityM, operatingTempCelsius]);

  // PRO Power calculation
  const proPower = useMemo(() => {
    return calculateProPowerDensity(
      membraneConfig,
      drawConfig,
      feedConfig,
      drawMolarityM,
      proPressureRatio
    );
  }, [membraneConfig, drawConfig, feedConfig, drawMolarityM, proPressureRatio]);

  // ZLD Plant Balance
  const zldBalance = useMemo(() => {
    return calculateCommercialZldPlantBalance(foFlux, membraneAreaM2, feedConfig);
  }, [foFlux, membraneAreaM2, feedConfig]);

  // PRO Power Curve data points
  const proCurvePoints = useMemo(() => {
    const points = [];
    for (let r = 0.05; r <= 0.95; r += 0.05) {
      const res = calculateProPowerDensity(membraneConfig, drawConfig, feedConfig, drawMolarityM, r);
      points.push({
        pressureBar: res.appliedHydraulicPressureBar,
        powerW: res.powerDensityWPerM2
      });
    }
    return points;
  }, [membraneConfig, drawConfig, feedConfig, drawMolarityM]);

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-xl text-cyan-400 shadow-inner">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Forward Osmosis (FO) & Salinity Gradient Power (PRO) Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  {foFlux.waterFluxLmh} LMH | {proPower.powerDensityWPerM2} W/m²
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Thermolytic Draw Solutes, Internal Concentration Polarization (ICP) Mitigation & Zero Liquid Discharge (ZLD)
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('FORWARD_OSMOSIS_DESALINATION');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'FORWARD_OSMOSIS_DESALINATION'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            FO Desalination & ICP
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PRO_SALINITY_GRADIENT_POWER');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PRO_SALINITY_GRADIENT_POWER'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            PRO Blue Energy
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('COMMERCIAL_ZLD_PLANT_BALANCE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'COMMERCIAL_ZLD_PLANT_BALANCE'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Commercial ZLD Plant
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Configuration Controls */}
        <div className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Membrane & Solution Controls
          </h3>

          {/* Membrane Type Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">FO/PRO Membrane Architecture</label>
            <select
              value={selectedMembrane}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedMembrane(e.target.value as FoMembraneType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
            >
              {Object.values(FO_MEMBRANE_CATALOG).map((mem) => (
                <option key={mem.id} value={mem.id}>
                  {mem.name} (S = {mem.structuralParameterS} µm, A = {mem.pureWaterPermeabilityA})
                </option>
              ))}
            </select>
          </div>

          {/* Draw Solution Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Draw Solution System</label>
            <select
              value={selectedDraw}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedDraw(e.target.value as DrawSolutionType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-teal-200 focus:outline-none focus:border-teal-400"
            >
              {Object.values(DRAW_SOLUTION_CATALOG).map((draw) => (
                <option key={draw.id} value={draw.id}>
                  {draw.name} ({draw.chemicalFormula}) — {draw.regenerationMethod.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Feed Water Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Feed Water Inflow</label>
            <select
              value={selectedFeed}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedFeed(e.target.value as FeedWaterSourceType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-sky-200 focus:outline-none focus:border-sky-400"
            >
              {Object.values(FEED_WATER_CATALOG).map((feed) => (
                <option key={feed.id} value={feed.id}>
                  {feed.name} (π = {feed.osmoticPressureBar} bar)
                </option>
              ))}
            </select>
          </div>

          {/* Draw Molarity Slider */}
          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Draw Solution Concentration</span>
              <span className="font-mono text-cyan-300 font-bold">{drawMolarityM.toFixed(1)} M ({foFlux.drawBulkOsmoticPressureBar} bar)</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={4.0}
              step={0.1}
              value={drawMolarityM}
              onChange={(e) => setDrawMolarityM(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>1.0 M</span>
              <span>Thermolytic Optimum: 2.5 M</span>
              <span>4.0 M</span>
            </div>
          </div>

          {/* Operating Temp */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Operating Temperature</span>
              <span className="font-mono text-amber-300 font-bold">{operatingTempCelsius.toFixed(0)} °C</span>
            </div>
            <input
              type="range"
              min={15}
              max={45}
              step={1}
              value={operatingTempCelsius}
              onChange={(e) => setOperatingTempCelsius(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* PRO Hydraulic Pressure Ratio */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">PRO Pressure Ratio (ΔP / Δπ)</span>
              <span className="font-mono text-teal-300 font-bold">{(proPressureRatio * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.05}
              value={proPressureRatio}
              onChange={(e) => setProPressureRatio(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          {/* Membrane Area */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Plant Membrane Area</span>
              <span className="font-mono text-emerald-300 font-bold">{membraneAreaM2.toLocaleString()} m²</span>
            </div>
            <input
              type="range"
              min={1000}
              max={10000}
              step={500}
              value={membraneAreaM2}
              onChange={(e) => setMembraneAreaM2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              sound.playUiClick();
              setSelectedMembrane('TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER');
              setSelectedDraw('THERMOLYTIC_AMMONIUM_BICARBONATE');
              setSelectedFeed('RO_DESALINATION_BRINE_70_PPT');
              setDrawMolarityM(2.5);
              setOperatingTempCelsius(25.0);
              setProPressureRatio(0.50);
              setMembraneAreaM2(5000.0);
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to High-Flux Nanofiber Baseline
          </button>
        </div>

        {/* Center & Right Column: Dynamic Visualizations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Permeate Water Flux</div>
              <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                {foFlux.waterFluxLmh} <span className="text-xs font-normal">LMH</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                L / (m² · h)
              </div>
            </div>

            <div className="bg-slate-800/60 border border-teal-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">ICP Modulus (π_m / π_bulk)</div>
              <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">
                {foFlux.internalConcentrationPolarizationModulus}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Structural S: {membraneConfig.structuralParameterS} µm
              </div>
            </div>

            <div className="bg-slate-800/60 border border-emerald-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">PRO Power Density</div>
              <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">
                {proPower.powerDensityWPerM2} <span className="text-xs font-normal">W/m²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {proPower.isCommerciallyViable ? '✓ Viable (> 5 W/m²)' : '⚠ Below 5 W/m²'}
              </div>
            </div>

            <div className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Daily Pure Water Yield</div>
              <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">
                {zldBalance.dailyPureWaterPermeateM3.toLocaleString()} <span className="text-xs font-normal">m³</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Energy: {zldBalance.specificEnergyConsumptionKwhPerM3} kWh/m³
              </div>
            </div>
          </div>

          {/* TAB 1: FO DESALINATION & ICP MECHANISM */}
          {activeMode === 'FORWARD_OSMOSIS_DESALINATION' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Forward Osmosis Mass Transport & Dilutive ICP Microstructure
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  Δπ_bulk = {(foFlux.drawBulkOsmoticPressureBar - foFlux.feedBulkOsmoticPressureBar).toFixed(1)} bar → Δπ_eff = {foFlux.effectiveMembraneOsmoticPressureDiffBar} bar
                </span>
              </div>

              {/* Membrane Transport Cross-Section Diagram */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {/* Feed Solution */}
                  <div className="p-3 bg-sky-950/20 border border-sky-500/30 rounded-lg">
                    <div className="text-xs font-bold text-sky-300">Feed Solution (AL Side)</div>
                    <div className="my-1 text-sm font-mono text-white font-bold">{feedConfig.name}</div>
                    <div className="text-[11px] text-slate-400">
                      TDS: <strong className="text-sky-300">{feedConfig.totalDissolvedSolidsGPerL} g/L</strong> (π = {foFlux.feedBulkOsmoticPressureBar} bar)
                    </div>
                  </div>

                  {/* Membrane Selective & Support Layers */}
                  <div className="p-3 bg-cyan-950/30 border border-cyan-400/40 rounded-lg">
                    <div className="text-xs font-bold text-cyan-300">TFC Composite Membrane</div>
                    <div className="my-1 text-xs text-white">
                      <div>Active Polyamide Layer: ~100 nm</div>
                      <div>Porous Nanofiber Support: S = {membraneConfig.structuralParameterS} µm</div>
                    </div>
                    <div className="text-[11px] text-amber-300">
                      ICP Retention: <strong>{(foFlux.internalConcentrationPolarizationModulus * 100).toFixed(1)}%</strong> of draw pressure
                    </div>
                  </div>

                  {/* Draw Solution */}
                  <div className="p-3 bg-teal-950/20 border border-teal-500/30 rounded-lg">
                    <div className="text-xs font-bold text-teal-300">Draw Solution (SL Side)</div>
                    <div className="my-1 text-sm font-mono text-white font-bold">{drawConfig.name}</div>
                    <div className="text-[11px] text-slate-400">
                      Conc: <strong className="text-teal-300">{drawMolarityM} M</strong> (π = {foFlux.drawBulkOsmoticPressureBar} bar)
                    </div>
                  </div>
                </div>

                {/* Salt Leakage & Selectivity Specs */}
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs flex flex-wrap justify-between gap-2">
                  <span>Reverse Solute Flux ($J_s$): <strong className="text-rose-300 font-mono">{foFlux.reverseSoluteFluxGmh} g/(m²·h)</strong></span>
                  <span>Specific Salt Flux ($J_s / J_w$): <strong className="text-emerald-300 font-mono">{foFlux.specificReverseSoluteFluxGPerL} g/L</strong></span>
                  <span>Fouling Flux Decline: <strong className="text-amber-300 font-mono">{foFlux.foulingFluxDeclinePct}%</strong></span>
                </div>
              </div>

              {/* Chemical Regeneration Callout */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Thermolytic Draw Regeneration Chemistry (Vietnam GDPT 2018):
                </div>
                <div className="font-mono text-teal-300 text-sm">
                  (NH₄)₂CO₃ (dd) ──[ 60°C Waste Heat ]──&gt; 2 NH₃ (k) ↑ + CO₂ (k) ↑ + H₂O (l)
                </div>
                <div className="text-[11px] text-slate-400">
                  NH3 and CO2 off-gases are stripped and recombined in cold water, reconstituting draw solution with zero chemical consumption.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRO SALINITY GRADIENT ENERGY */}
          {activeMode === 'PRO_SALINITY_GRADIENT_POWER' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Pressure Retarded Osmosis (PRO) Power Density Curve
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">
                  Applied ΔP = {proPower.appliedHydraulicPressureBar} bar | Optimal = {proPower.optimalHydraulicPressureBar} bar
                </span>
              </div>

              {/* SVG PRO Power Curve */}
              <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 240">
                  <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                  <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Hydraulic Pressure ΔP (bar)</text>
                  <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Power W/m²</text>
                  <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                  <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">15</text>
                  <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">30</text>
                  <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">45</text>
                  <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">60</text>

                  {/* 5 W/m2 Commercial Viability Line */}
                  <line x1="50" y1="180" x2="480" y2="180" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
                  <text x="45" y="183" fill="#34d399" fontSize="9" textAnchor="end">5 W/m²</text>

                  {/* Power Density Curve Path */}
                  {(() => {
                    const maxW = 50.0;
                    const maxP = 60.0;
                    const pathD = proCurvePoints
                      .map((pt, i) => {
                        const x = 50 + (pt.pressureBar / maxP) * 430;
                        const y = 200 - (pt.powerW / maxW) * 165;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ');
                    return <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" />;
                  })()}
                </svg>
              </div>

              {/* Legend & Stats */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Power Density (W/m²)
                </span>
                <span className="flex items-center gap-1.5 text-teal-400">
                  <span className="w-3 h-0.5 bg-teal-400 border-b border-dashed inline-block" /> 5 W/m² Commercial Benchmark
                </span>
                <span className="text-slate-400">
                  Flux under pressure: <strong className="text-white">{proPower.waterFluxUnderPressureLmh} LMH</strong>
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: COMMERCIAL ZLD PLANT BALANCE */}
          {activeMode === 'COMMERCIAL_ZLD_PLANT_BALANCE' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Factory className="w-4 h-4 text-cyan-400" />
                  Zero Liquid Discharge (ZLD) Mass Balance & Energy Savings
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  Avoided CO2: {zldBalance.avoidedThermalCrystallizerCo2TonsPerYear.toLocaleString()} tons/yr
                </span>
              </div>

              {/* Plant Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Daily Permeate Clean Water</div>
                  <div className="text-xl font-bold font-mono text-cyan-300">
                    {zldBalance.dailyPureWaterPermeateM3.toLocaleString()} m³
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {((zldBalance.dailyPureWaterPermeateM3 * 350) / 1000).toFixed(0)}k m³/year
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Concentrated Brine TDS</div>
                  <div className="text-xl font-bold font-mono text-amber-300">
                    {zldBalance.finalConcentratedBrineTdsGPerL} g/L
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {zldBalance.brineConcentrationRatio}x concentration factor
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Specific Electrical Energy</div>
                  <div className="text-xl font-bold font-mono text-emerald-300">
                    {zldBalance.specificEnergyConsumptionKwhPerM3} kWh/m³
                  </div>
                  <div className="text-[10px] text-slate-500">
                    vs 22 kWh/m³ thermal evaporator
                  </div>
                </div>
              </div>

              {/* Thermal Duty & Cost Callout */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Low-Grade Thermal Regeneration Duty (at 60°C):</span>
                  <span className="font-mono text-amber-300 font-bold">{zldBalance.thermalRegenerationHeatDutyKwt.toLocaleString()} kW_th</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Draw Solute Makeup Cost:</span>
                  <span className="font-mono text-slate-200 font-bold">${zldBalance.dailyDrawChemicalLossCostUsd}/day</span>
                </div>
                <div className="flex justify-between text-emerald-300 font-semibold border-t border-slate-800 pt-2">
                  <span>Annual Carbon Abatement vs Thermal Crystallizer:</span>
                  <span className="font-mono font-bold">{zldBalance.avoidedThermalCrystallizerCo2TonsPerYear.toLocaleString()} metric tons CO₂/yr</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
