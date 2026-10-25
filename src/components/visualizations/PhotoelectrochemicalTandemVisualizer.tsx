// src/components/visualizations/PhotoelectrochemicalTandemVisualizer.tsx
// Interactive Visualizer: Photoelectrochemical (PEC) Solar Tandem Water-Splitting & Concentrated PV-Electrolysis
// Conforms to: IUPAC Photochemical & Electrochemical Standards, Shockley-Queisser Tandem Physics, Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Gauge,
  Sliders,
  BarChart3,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  TandemCellArchitecture,
  PassivationLayerType,
  ElectrocatalystType,
  TANDEM_ARCHITECTURES,
  PASSIVATION_LAYERS,
  ELECTROCATALYSTS,
  solveOperatingPoint,
  generateTandemJVCurve,
  generateElectrochemicalLoadCurve,
  calculatePECSolarFarmBalance,
  simulateLifetimeDegradation,
  STANDARD_THERMO_WATER_SPLITTING_VOLTAGE
} from '../../domain/photoelectrochemicalTandemEngine';
import { sound } from '../../audio/soundEngine';

type PecTabMode =
  | 'TANDEM_JV_BANDGAP'
  | 'SOLAR_FARM_BALANCE'
  | 'PASSIVATION_STABILITY';

export const PhotoelectrochemicalTandemVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PecTabMode>('TANDEM_JV_BANDGAP');

  // Controls
  const [selectedArch, setSelectedArch] = useState<TandemCellArchitecture>('III_V_GAINP2_GAAS');
  const [selectedPassivation, setSelectedPassivation] = useState<PassivationLayerType>('ALD_TIO2_AMORPHOUS');
  const [selectedCatalyst, setSelectedCatalyst] = useState<ElectrocatalystType>('NIFEOX_OER_PT_HER');
  const [solarIrradianceWPerM2, setSolarIrradianceWPerM2] = useState<number>(1000);
  const [opticalConcentration, setOpticalConcentration] = useState<number>(1.0);
  const [collectorAreaM2, setCollectorAreaM2] = useState<number>(1000);
  const [temperatureC, setTemperatureC] = useState<number>(25);

  const archConfig = TANDEM_ARCHITECTURES[selectedArch];
  const passConfig = PASSIVATION_LAYERS[selectedPassivation];
  const catConfig = ELECTROCATALYSTS[selectedCatalyst];

  // Solved operating point
  const operatingPoint = useMemo(() => {
    return solveOperatingPoint(
      archConfig,
      passConfig,
      catConfig,
      solarIrradianceWPerM2,
      opticalConcentration,
      2.0,
      temperatureC
    );
  }, [archConfig, passConfig, catConfig, solarIrradianceWPerM2, opticalConcentration, temperatureC]);

  // J-V and Load curves
  const jvPoints = useMemo(() => {
    return generateTandemJVCurve(archConfig, passConfig, solarIrradianceWPerM2, opticalConcentration, temperatureC);
  }, [archConfig, passConfig, solarIrradianceWPerM2, opticalConcentration, temperatureC]);

  const loadPoints = useMemo(() => {
    const maxJ = Math.max(25, operatingPoint.operatingCurrentDensityMaPerCm2 * 1.5);
    return generateElectrochemicalLoadCurve(catConfig, temperatureC, 2.0, maxJ);
  }, [catConfig, temperatureC, operatingPoint]);

  // Solar farm techno-economics
  const farmBalance = useMemo(() => {
    return calculatePECSolarFarmBalance(
      archConfig,
      passConfig,
      catConfig,
      collectorAreaM2,
      opticalConcentration,
      solarIrradianceWPerM2,
      1800,
      5.00
    );
  }, [archConfig, passConfig, catConfig, collectorAreaM2, opticalConcentration, solarIrradianceWPerM2]);

  // Passivation degradation curves
  const degradationPoints = useMemo(() => {
    return simulateLifetimeDegradation(passConfig, 4000);
  }, [passConfig]);

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-400/40 rounded-xl text-amber-400 shadow-inner">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Photoelectrochemical Tandem Solar Water-Splitting Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                  STH: {operatingPoint.solarToHydrogenEfficiencyPct}%
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Direct Bias-Free Solar-to-Hydrogen (STH) Conversion & CPV-Electrolysis Engineering
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('TANDEM_JV_BANDGAP');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'TANDEM_JV_BANDGAP'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            J-V & Bandgap Matching
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('SOLAR_FARM_BALANCE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SOLAR_FARM_BALANCE'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Solar Farm H₂ Balance
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PASSIVATION_STABILITY');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PASSIVATION_STABILITY'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Passivation & Corrosion
          </button>
        </div>
      </div>

      {/* Global Configuration Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Tandem Architecture
          </label>
          <select
            value={selectedArch}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedArch(e.target.value as TandemCellArchitecture);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {Object.values(TANDEM_ARCHITECTURES).map((arch) => (
              <option key={arch.id} value={arch.id}>
                {arch.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Passivation Layer
          </label>
          <select
            value={selectedPassivation}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedPassivation(e.target.value as PassivationLayerType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {Object.values(PASSIVATION_LAYERS).map((pass) => (
              <option key={pass.id} value={pass.id}>
                {pass.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Catalyst Pair
          </label>
          <select
            value={selectedCatalyst}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedCatalyst(e.target.value as ElectrocatalystType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {Object.values(ELECTROCATALYSTS).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Irradiance & Temp:</span>
            <span className="text-cyan-400 font-mono">{solarIrradianceWPerM2} W/m² | {temperatureC}°C</span>
          </div>
          <input
            type="range"
            min="400"
            max="1200"
            step="50"
            value={solarIrradianceWPerM2}
            onChange={(e) => setSolarIrradianceWPerM2(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          {archConfig.opticalConcentrationCompatible && (
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Concentration (C):</span>
              <span className="text-amber-400 font-mono">{opticalConcentration}×</span>
              <input
                type="range"
                min="1"
                max={archConfig.maxConcentrationRatio}
                step="5"
                value={opticalConcentration}
                onChange={(e) => setOpticalConcentration(Number(e.target.value))}
                className="w-24 accent-amber-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            STH Conversion Efficiency
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            {operatingPoint.solarToHydrogenEfficiencyPct}%
          </div>
          <div className="text-[11px] text-slate-500">Benchmark: {archConfig.benchmarkedSthEfficiencyPct}%</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Operating Point (J_op, V_op)
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {operatingPoint.operatingCurrentDensityMaPerCm2} mA/cm²
          </div>
          <div className="text-[11px] text-slate-500">V_op: {operatingPoint.operatingVoltageV} V (Bias-Free)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            Instant Clean H₂ Output
          </div>
          <div className="text-2xl font-bold font-mono text-blue-300 mt-1">
            {farmBalance.hydrogenProductionRateKgPerHour} kg/hr
          </div>
          <div className="text-[11px] text-slate-500">O₂ by-product: {farmBalance.oxygenProductionRateKgPerHour} kg/hr</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Passivation Lifetime
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {passConfig.operationalLifetimeHours} hrs
          </div>
          <div className="text-[11px] text-slate-500">Stability: pH {passConfig.chemicalStabilityPhRange[0]} - {passConfig.chemicalStabilityPhRange[1]}</div>
        </div>
      </div>

      {/* MODE 1: TANDEM J-V & BANDGAP MATCHING */}
      {activeMode === 'TANDEM_JV_BANDGAP' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: J-V & Load Intersection SVG Plot */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Tandem J-V Curve vs Electrochemical Load
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Intersection: ({operatingPoint.operatingVoltageV} V, {operatingPoint.operatingCurrentDensityMaPerCm2} mA/cm²)
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                The operating current density is uniquely dictated by the intersection of the dual-absorber tandem photovoltaic curve and the total water electrolysis load (E_rev + η_OER + η_HER + IR).
              </p>
            </div>

            {/* SVG J-V Chart */}
            <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                {/* Grid lines */}
                <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="50" y1="50" x2="480" y2="50" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="260" y1="20" x2="260" y2="200" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                {/* Axes labels */}
                <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Voltage (V)</text>
                <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">J (mA/cm²)</text>
                <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0V</text>
                <text x="190" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">1.0V</text>
                <text x="260" y="215" fill="#38bdf8" fontSize="10" textAnchor="middle">1.23V (E°)</text>
                <text x="330" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">2.0V</text>
                <text x="470" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">3.0V</text>

                {/* Tandem Photovoltaic J-V curve */}
                {(() => {
                  const maxV = 3.0;
                  const maxJ = Math.max(30, operatingPoint.operatingCurrentDensityMaPerCm2 * 1.5);
                  const pathPv = jvPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.voltage / maxV) * 420;
                      const y = 200 - (pt.currentDensity / maxJ) * 180;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathPv} fill="none" stroke="#38bdf8" strokeWidth="2.5" />;
                })()}

                {/* Electrochemical Load curve */}
                {(() => {
                  const maxV = 3.0;
                  const maxJ = Math.max(30, operatingPoint.operatingCurrentDensityMaPerCm2 * 1.5);
                  const pathLoad = loadPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.voltageRequired / maxV) * 420;
                      const y = 200 - (pt.currentDensity / maxJ) * 180;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathLoad} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 1" />;
                })()}

                {/* Operating Point marker */}
                {(() => {
                  const maxV = 3.0;
                  const maxJ = Math.max(30, operatingPoint.operatingCurrentDensityMaPerCm2 * 1.5);
                  const cx = 50 + (operatingPoint.operatingVoltageV / maxV) * 420;
                  const cy = 200 - (operatingPoint.operatingCurrentDensityMaPerCm2 / maxJ) * 180;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r="6" fill="#10b981" stroke="#ecfdf5" strokeWidth="2" className="animate-pulse" />
                      <line x1={cx} y1={cy} x2={cx} y2="200" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
                      <line x1="50" y1={cy} x2={cx} y2={cy} stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
                      <text x={cx + 8} y={cy - 8} fill="#34d399" fontSize="11" fontWeight="bold">
                        J_op = {operatingPoint.operatingCurrentDensityMaPerCm2} mA/cm²
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> Tandem PV Generation Curve
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400 border-b border-dashed inline-block" /> EC Water Electrolysis Load
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Operating Point
              </span>
            </div>
          </div>

          {/* Right: Bandgap & Overpotential Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Dual-Absorber Band Alignment
              </span>
              <div className="space-y-3">
                {/* Top cell band */}
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{archConfig.topCell.name}</span>
                    <span className="text-cyan-400 font-mono">Eg1 = {archConfig.topCell.bandgapEv} eV</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cutoff λ: {archConfig.topCell.absorptionCutoffNm} nm | Voc: {archConfig.topCell.openCircuitVoltageVoc} V
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                      style={{ width: `${(archConfig.topCell.bandgapEv / 3.0) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Bottom cell band */}
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{archConfig.bottomCell.name}</span>
                    <span className="text-cyan-400 font-mono">Eg2 = {archConfig.bottomCell.bandgapEv} eV</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cutoff λ: {archConfig.bottomCell.absorptionCutoffNm} nm | Voc: {archConfig.bottomCell.openCircuitVoltageVoc} V
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-red-400 h-full rounded-full"
                      style={{ width: `${(archConfig.bottomCell.bandgapEv / 3.0) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-800">
                  Total Photovoltage Voc: <span className="text-emerald-400 font-bold">{archConfig.combinedVocVolts} V</span>
                  {archConfig.combinedVocVolts > 1.8 ? (
                    <span className="ml-2 text-emerald-400">✓ Bias-free operation verified!</span>
                  ) : (
                    <span className="ml-2 text-red-400">⚠ Requires external bias!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Overpotentials breakdown */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Overpotential & Loss Partitioning
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Thermodynamic Reversible E°:</span>
                  <span className="font-mono text-cyan-300">{operatingPoint.thermodynamicVoltageV} V</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">OER Overpotential (η_OER):</span>
                  <span className="font-mono text-amber-400">+{operatingPoint.oerOverpotentialV} V</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">HER Overpotential (η_HER):</span>
                  <span className="font-mono text-blue-400">+{operatingPoint.herOverpotentialV} V</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Ohmic Electrolyte Drop (IR):</span>
                  <span className="font-mono text-slate-300">+{operatingPoint.ohmicDropV} V</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-emerald-400">Total Operating Voltage V_op:</span>
                  <span className="font-mono text-emerald-300">{operatingPoint.operatingVoltageV} V</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SOLAR FARM H2 BALANCE */}
      {activeMode === 'SOLAR_FARM_BALANCE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Solar Farm Field Simulator */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Factory className="w-4 h-4" /> Industrial Solar Field Collector Specs
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Simulates real-world hydrogen generation for an industrial solar plant across 1,800 full-sun hours/year (Vietnam South-Central solar belt).
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Total Collector Field Aperture:</span>
                    <span className="text-cyan-400 font-mono font-bold">{collectorAreaM2} m²</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={collectorAreaM2}
                    onChange={(e) => setCollectorAreaM2(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Total Solar Peak Power:</span>
                    <span className="text-base font-bold font-mono text-amber-300">
                      {farmBalance.totalSolarPowerInKw} kWp
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Faradaic Current:</span>
                    <span className="text-base font-bold font-mono text-cyan-300">
                      {farmBalance.operatingCurrentA.toLocaleString()} A
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Specific Energy per kg H₂:</span>
                    <span className="text-base font-bold font-mono text-emerald-300">
                      {farmBalance.specificEnergyConsumptionKwhPerKgH2} kWh/kg
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Energy Delivery Rate (LHV):</span>
                    <span className="text-base font-bold font-mono text-blue-300">
                      {farmBalance.hydrogenEnergyRateKwLHV} kW-th
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Microbubble Animation Graphic */}
            <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center relative overflow-hidden">
              <div className="text-xs font-semibold text-slate-300 mb-2">Electrochemical Evolution Chambers</div>
              <div className="flex items-center justify-around py-3">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-16 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center relative">
                    <Droplets className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                  <span className="text-[11px] text-blue-300 font-bold mt-1">Cathode: H₂</span>
                  <span className="text-[10px] text-slate-400 font-mono">{farmBalance.hydrogenProductionRateKgPerHour} kg/h</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600" />
                <div className="text-[10px] text-slate-500 max-w-[120px]">
                  2 H₂O → 2 H₂ + O₂ (Faradaic η: {catConfig.faradaicEfficiencyPct}%)
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-16 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center relative">
                    <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-emerald-300 font-bold mt-1">Anode: O₂</span>
                  <span className="text-[10px] text-slate-400 font-mono">{farmBalance.oxygenProductionRateKgPerHour} kg/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Annual Techno-Economics & Environmental */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Annual Techno-Economics & Decarbonization
              </span>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Annual Green H₂ Yield:</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {farmBalance.annualHydrogenProductionTonsPerYear} tons/yr
                  </span>
                  <span className="text-[10px] text-slate-500">at 1,800 h/yr equivalent</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Avoided Carbon Emissions:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {farmBalance.annualAvoidedCo2TonsPerYear} tons CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">vs SMR gray hydrogen</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-emerald-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-medium">Estimated Clean H₂ Revenue:</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">
                    ${farmBalance.annualRevenueUsd.toLocaleString()} / year
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Valued at $5.00/kg green hydrogen (levelized cost benchmark under clean energy incentives).
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-slate-200">Vietnam GDPT 2018 Connection:</span> Bài học về Năng lượng sạch, Điện phân dung dịch và Hóa học lượng tử trong chương trình Hóa học 12 (Chương Kim loại & Điện hóa). Thể hiện trực tiếp cơ chế chuyển hóa quang tử thành liên kết hydro bền vững không phát thải khí nhà kính.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: PASSIVATION & CORROSION */}
      {activeMode === 'PASSIVATION_STABILITY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Corrosion kinetics & Lifetime plot */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 4,000-Hour Accelerated Photocorrosion Kinetics
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  Corrosion: {passConfig.corrosionRateNmPerHour} nm/hr
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Direct contact of semiconductors with aqueous electrolyte causes severe photo-oxidation (e.g. Si → SiO₂). Atomic Layer Deposition (ALD) TiO₂ isolates the absorber while conducting holes via localized defect states.
              </p>
            </div>

            {/* Degradation Chart */}
            <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Operating Time (Hours)</text>
                <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">STH Retention (%)</text>
                <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0h</text>
                <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">1000h</text>
                <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">2000h</text>
                <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">3000h</text>
                <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">4000h</text>

                {/* Retention curve */}
                {(() => {
                  const maxT = 4000;
                  const path = degradationPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.elapsedHours / maxT) * 430;
                      const y = 200 - (pt.relativeSthRetentionPct / 100) * 180;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={path} fill="none" stroke="#10b981" strokeWidth="2.5" />;
                })()}

                {/* Lifetime limit marker */}
                {(() => {
                  const maxT = 4000;
                  const tFail = Math.min(passConfig.operationalLifetimeHours, maxT);
                  const x = 50 + (tFail / maxT) * 430;
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="200" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1.5" />
                      <text x={x} y="30" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Limit: {passConfig.operationalLifetimeHours}h
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 mt-2">
              <span>Hole conductance: <strong className="text-cyan-300 font-mono">{passConfig.holeConductanceMhoPerCm2} Mho/cm²</strong></span>
              <span>Optical transmittance: <strong className="text-amber-300 font-mono">{passConfig.opticalTransmittancePct}%</strong></span>
            </div>
          </div>

          {/* Right: Passivation Layer Microscopic Architecture */}
          <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> Atomic Layer Structure & Interface
              </span>

              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-xs font-bold text-slate-200">{passConfig.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{passConfig.description}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deposition Method:</span>
                    <span className="text-slate-200 font-mono">{passConfig.depositionMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Layer Thickness:</span>
                    <span className="text-cyan-400 font-mono">{passConfig.thicknessNm} nm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stable pH Envelope:</span>
                    <span className="text-emerald-400 font-mono">
                      pH {passConfig.chemicalStabilityPhRange[0]} – {passConfig.chemicalStabilityPhRange[1]}
                    </span>
                  </div>
                </div>

                {/* Layer stack diagram */}
                <div className="mt-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-center text-xs">
                  <div className="py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-mono mb-1">
                    [Electrocatalyst Overlayer: {catConfig.oerCatalyst}]
                  </div>
                  <div className="py-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 font-mono mb-1">
                    [Protective Dielectric: {passConfig.material} ({passConfig.thicknessNm} nm)]
                  </div>
                  <div className="py-2 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/40 font-mono">
                    [Tandem Absorber: {archConfig.topCell.material} / {archConfig.bottomCell.material}]
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Conduction Mechanism:</strong> Tunneling across defect states (Ti³⁺ polarons / oxygen vacancies) enables efficient hole collection for water oxidation without pinhole chemical leakage.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PhotoelectrochemicalTandemVisualizer;
