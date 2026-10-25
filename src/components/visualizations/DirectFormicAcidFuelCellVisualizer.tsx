// src/components/visualizations/DirectFormicAcidFuelCellVisualizer.tsx
// Interactive Visualizer: Direct Formic Acid Fuel Cell (DFAFC) with Bimetallic Electrocatalytic Dehydrogenation
// & Electrostatic Donnan Crossover Suppression for Portable Micro-Power Systems.
// Conforms strictly to IUPAC electrochemistry, dual-pathway kinetics, and Vietnam GDPT 2018 Chemistry.

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Factory,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Droplets,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Wind,
  BatteryCharging,
  Cpu,
  Plane
} from 'lucide-react';
import {
  DFAFC_CATALYST_CATALOG,
  DfafcCatalystType,
  calculateDfafcCellPerformance,
  calculateDfafcPortablePowerBalance,
  FORMIC_ACID_ENERGY_DENSITY_KWH_L,
  THEORETICAL_OCV_DFAFC_V
} from '../../domain/directFormicAcidFuelCellEngine';
import { sound } from '../../audio/soundEngine';

type DfafcTabMode =
  | 'DUAL_PATHWAY_DONNAN_EXCLUSION'
  | 'POLARIZATION_CONCENTRATION'
  | 'PORTABLE_DRONE_MICROPOWER';

export const DirectFormicAcidFuelCellVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<DfafcTabMode>('DUAL_PATHWAY_DONNAN_EXCLUSION');

  // Controls for Mode 1 & 2: Cell & Catalyst
  const [selectedCatalyst, setSelectedCatalyst] = useState<DfafcCatalystType>('ORDERED_INTERMETALLIC_PT_BI');
  const [formicAcidConcentrationMolar, setFormicAcidConcentrationMolar] = useState<number>(6.0); // 6 M optimal
  const [operatingTempC, setOperatingTempC] = useState<number>(50.0);
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(250.0);

  // Controls for Mode 3: Portable Power Balance
  const [missionPowerWatts, setMissionPowerWatts] = useState<number>(100.0);
  const [missionDurationHours, setMissionDurationHours] = useState<number>(24.0);

  const catalystConfig = DFAFC_CATALYST_CATALOG[selectedCatalyst] || DFAFC_CATALYST_CATALOG.ORDERED_INTERMETALLIC_PT_BI;

  // Cell performance calculations
  const cellPerf = useMemo(() => {
    return calculateDfafcCellPerformance(
      selectedCatalyst,
      formicAcidConcentrationMolar,
      operatingTempC,
      currentDensityMaCm2
    );
  }, [selectedCatalyst, formicAcidConcentrationMolar, operatingTempC, currentDensityMaCm2]);

  // Portable system balance calculations
  const portableBalance = useMemo(() => {
    return calculateDfafcPortablePowerBalance(
      missionPowerWatts,
      missionDurationHours,
      selectedCatalyst
    );
  }, [missionPowerWatts, missionDurationHours, selectedCatalyst]);

  // Polarization curve points across current densities (50 to 500 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 50; j <= 500; j += 25) {
      const perf = calculateDfafcCellPerformance(
        selectedCatalyst,
        formicAcidConcentrationMolar,
        operatingTempC,
        j
      );
      points.push({
        j,
        vCell: perf.operatingCellVoltageV,
        power: perf.powerDensityMwCm2
      });
    }
    return points;
  }, [selectedCatalyst, formicAcidConcentrationMolar, operatingTempC]);

  const handleModeChange = (mode: DfafcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleCatalystSelect = (cat: DfafcCatalystType) => {
    sound.playUiClick();
    setSelectedCatalyst(cat);
  };

  const handleResetControls = () => {
    sound.playUiClick();
    setSelectedCatalyst('ORDERED_INTERMETALLIC_PT_BI');
    setFormicAcidConcentrationMolar(6.0);
    setOperatingTempC(50.0);
    setCurrentDensityMaCm2(250.0);
    setMissionPowerWatts(100.0);
    setMissionDurationHours(24.0);
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-950/90 rounded-2xl border border-emerald-500/30 text-slate-100 shadow-2xl backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Direct Formic Acid Fuel Cell (DFAFC) &amp; Donnan Exclusion
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                2.1 kWh/L Liquid Energy Carrier
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct catalytic dehydrogenation (HCOOH → CO₂ + 2 H⁺ + 2 e⁻), electrostatic Donnan crossover barrier, and lightweight multi-day drone power.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetControls}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          Reset Parameters
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          onClick={() => handleModeChange('DUAL_PATHWAY_DONNAN_EXCLUSION')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'DUAL_PATHWAY_DONNAN_EXCLUSION'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          1. Dual-Pathway &amp; Donnan Exclusion
        </button>
        <button
          onClick={() => handleModeChange('POLARIZATION_CONCENTRATION')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'POLARIZATION_CONCENTRATION'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30 border border-teal-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Gauge className="w-4 h-4" />
          2. Polarization &amp; Power Density
        </button>
        <button
          onClick={() => handleModeChange('PORTABLE_DRONE_MICROPOWER')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'PORTABLE_DRONE_MICROPOWER'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Plane className="w-4 h-4" />
          3. Multi-Day Drone Power (&gt; 55% Weight Saved)
        </button>
      </div>

      {/* Tab Mode 1: Dual-Pathway & Donnan Exclusion */}
      {activeMode === 'DUAL_PATHWAY_DONNAN_EXCLUSION' && (
        <div className="flex flex-col gap-5">
          {/* Catalyst Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
            {Object.values(DFAFC_CATALYST_CATALOG).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCatalystSelect(cat.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  selectedCatalyst === cat.id
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold leading-tight block">{cat.name}</span>
                  <span className="font-mono text-[10px] text-teal-400 mt-0.5 block">{cat.chemicalFormula}</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Direct Selectivity</span>
                  <span className="font-mono font-bold text-emerald-400">{cat.directPathwaySelectivityPct}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cell Membrane Electrode Assembly (MEA) Schematic */}
            <div className="lg:col-span-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-200">
                Membrane Electrode Assembly (MEA) &amp; Electrostatic Donnan Barrier
              </span>

              {/* Graphical MEA Cross-Section */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                {/* Anode: Formic Acid Electro-Oxidation */}
                <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-emerald-400">Anode ({catalystConfig.chemicalFormula})</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    HCOOH → CO₂ + 2 H⁺ + 2 e⁻
                  </div>
                  <span className="text-[10px] text-emerald-300">E° = -0.25 V vs SHE</span>
                  <span className="text-[9px] text-slate-500">
                    Direct Pathway: {catalystConfig.directPathwaySelectivityPct}%
                  </span>
                </div>

                {/* Electrolyte: Nafion Membrane with Donnan Exclusion */}
                <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-teal-400">Nafion 212 (-SO₃⁻)</span>
                  <div className="text-[11px] font-mono text-teal-300">
                    Donnan Exclusion: {cellPerf.crossoverDonnanExclusionPct}%
                  </div>
                  <span className="text-[10px] text-teal-200">Repels HCOO⁻ anions</span>
                  <span className="text-[9px] text-slate-500">
                    Crossover: {cellPerf.fuelCrossoverFluxUmolCm2S} μmol/cm²·s
                  </span>
                </div>

                {/* Cathode: Air Breathing */}
                <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-cyan-400">Pt/C Air Cathode</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    ½ O₂ + 2 H⁺ + 2 e⁻ → H₂O
                  </div>
                  <span className="text-[10px] text-cyan-300">E° = +1.23 V vs SHE</span>
                  <span className="text-[9px] text-slate-500">
                    Ambient Oxygen Breather
                  </span>
                </div>
              </div>

              {/* Chemical Equations Box */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Vietnam GDPT 2018 Chemistry: Dual-Pathway Formic Acid Dehydrogenation
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-emerald-300 font-bold block mb-1">Direct Dehydrogenation (Fast &amp; Desired):</span>
                    <span>HCOOH → CO₂ + 2 H⁺ + 2 e⁻</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Favored on Pd and PtBi | Zero *CO poison</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-amber-300 font-bold block mb-1">Indirect Dehydration (*CO Poisoning):</span>
                    <span>HCOOH → *CO + H₂O → CO₂ + 2 H⁺ + 2 e⁻</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Poison *CO blocks pure Pt surface sites</span>
                  </div>
                </div>
              </div>

              {/* Donnan Exclusion Callout Banner */}
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 flex items-center gap-3 text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold">Electrostatic Donnan Exclusion:</span> Fixed negative sulfonate groups (-SO₃⁻) in the perfluorosulfonic acid (Nafion) backbone electrostatically repel formate anions (HCOO⁻). Fuel crossover is cut by &gt; 85% compared to neutral methanol, preventing severe cathode depolarization!
                </div>
              </div>
            </div>

            {/* Readouts & Catalyst Impact */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Direct Pathway Selectivity</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {catalystConfig.directPathwaySelectivityPct}%
                </span>
                <span className="text-[10px] text-slate-500">
                  *CO Poison Tolerance: {catalystConfig.coPoisoningToleranceRating}
                </span>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Donnan Crossover Barrier</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {cellPerf.crossoverDonnanExclusionPct}%
                </span>
                <span className="text-[10px] text-slate-500">
                  Flux: {cellPerf.fuelCrossoverFluxUmolCm2S} μmol/cm²·s
                </span>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Fuel Energy Density</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {FORMIC_ACID_ENERGY_DENSITY_KWH_L} <span className="text-xs text-slate-500">kWh/L</span>
                </span>
                <span className="text-[10px] text-slate-500">Safe, non-flammable liquid</span>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-emerald-400 font-semibold">{catalystConfig.name}:</span> {catalystConfig.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 2: Dynamic Cell Polarization & Concentration Optimization */}
      {activeMode === 'POLARIZATION_CONCENTRATION' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Operational Sliders */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Sliders className="w-4 h-4" />
                Operational Variables
              </div>

              {/* Formic Acid Concentration */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Formic Acid Molarity:</span>
                  <span className="font-mono text-emerald-400 font-bold">{formicAcidConcentrationMolar.toFixed(1)} M</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="15.0"
                  step="0.5"
                  value={formicAcidConcentrationMolar}
                  onChange={e => setFormicAcidConcentrationMolar(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>3 M (Dilute)</span>
                  <span className="text-emerald-400">Optimal 6 M</span>
                  <span>15 M (Pure neat)</span>
                </div>
              </div>

              {/* Operating Temperature */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Operating Temperature:</span>
                  <span className="font-mono text-teal-400 font-bold">{operatingTempC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="65"
                  step="5"
                  value={operatingTempC}
                  onChange={e => setOperatingTempC(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Current Density */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Density:</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={currentDensityMaCm2}
                  onChange={e => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-teal-400 font-semibold">Concentration Optimum:</span> While pure neat formic acid (26 M) maximizes fuel volume density, concentrations around 5-8 M deliver peak power density (~ 180 mW/cm²) due to optimal water activity and suppressed mass-transport overpotential.
              </div>
            </div>

            {/* Readouts & Interactive Polarization SVG */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Cell Voltage</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {cellPerf.operatingCellVoltageV.toFixed(3)} <span className="text-xs text-slate-500">V</span>
                  </span>
                  <span className="text-[10px] text-slate-500">OCV: {cellPerf.openCircuitVoltageV.toFixed(3)} V</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Power Density</span>
                  <span className="text-2xl font-bold font-mono text-teal-400">
                    {cellPerf.powerDensityMwCm2.toFixed(0)} <span className="text-xs text-slate-500">mW/cm²</span>
                  </span>
                  <span className="text-[10px] text-slate-500">At {currentDensityMaCm2} mA/cm²</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Fuel Efficiency</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {cellPerf.fuelEfficiencyPct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500">Theoretical: {THEORETICAL_OCV_DFAFC_V} V</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Anode Loss</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {cellPerf.anodeOverpotentialMv.toFixed(0)} <span className="text-xs text-slate-500">mV</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Ohmic: {cellPerf.ohmicDropMv.toFixed(0)} mV</span>
                </div>
              </div>

              {/* Polarization Curve SVG */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">
                    V-I &amp; Power Density Polarization Curves (6 M HCOOH, {operatingTempC} °C)
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px]">
                    Operating: {currentDensityMaCm2} mA/cm², {cellPerf.powerDensityMwCm2.toFixed(0)} mW/cm²
                  </span>
                </div>

                <div className="w-full h-44 bg-slate-950/80 rounded-lg p-2 border border-slate-800 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 140" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="60" x2="480" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                    {/* Voltage Curve (Cyan line) */}
                    <path
                      d={polarizationPoints.reduce((acc, pt, idx) => {
                        const x = 40 + ((pt.j - 50) / 450) * 440;
                        // Map Voltage (0.2 to 1.3 V) to Y (120 to 10)
                        const y = 120 - ((pt.vCell - 0.2) / 1.1) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Power Density Curve (Emerald line) */}
                    <path
                      d={polarizationPoints.reduce((acc, pt, idx) => {
                        const x = 40 + ((pt.j - 50) / 450) * 440;
                        // Map Power (0 to 250 mW/cm2) to Y (120 to 10)
                        const y = 120 - (pt.power / 250) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />

                    {/* Operating Point Markers */}
                    <circle
                      cx={40 + ((currentDensityMaCm2 - 50) / 450) * 440}
                      cy={120 - ((cellPerf.operatingCellVoltageV - 0.2) / 1.1) * 110}
                      r="5"
                      fill="#06b6d4"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={40 + ((currentDensityMaCm2 - 50) / 450) * 440}
                      cy={120 - (cellPerf.powerDensityMwCm2 / 250) * 110}
                      r="5"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Axes */}
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="10" x2="40" y2="120" stroke="#475569" strokeWidth="1" />

                    {/* Axis Labels */}
                    <text x="10" y="25" fill="#64748b" fontSize="8">1.3 V</text>
                    <text x="10" y="70" fill="#64748b" fontSize="8">0.7 V</text>
                    <text x="10" y="115" fill="#64748b" fontSize="8">0.2 V</text>
                    <text x="40" y="132" fill="#64748b" fontSize="8">50</text>
                    <text x="250" y="132" fill="#64748b" fontSize="8">275 mA/cm²</text>
                    <text x="450" y="132" fill="#64748b" fontSize="8">500</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 3: Portable Micro-Power System Balance */}
      {activeMode === 'PORTABLE_DRONE_MICROPOWER' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Mission Profile Controls */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sliders className="w-4 h-4" />
                Drone Mission Sizing
              </div>

              {/* Mission Power */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Continuous Flight Power:</span>
                  <span className="font-mono text-cyan-400 font-bold">{missionPowerWatts.toFixed(0)} Watts</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="400"
                  step="25"
                  value={missionPowerWatts}
                  onChange={e => setMissionPowerWatts(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Mission Duration */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Continuous Flight Duration:</span>
                  <span className="font-mono text-emerald-400 font-bold">{missionDurationHours.toFixed(0)} Hours</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="72"
                  step="2"
                  value={missionDurationHours}
                  onChange={e => setMissionDurationHours(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>6h (Tactical)</span>
                  <span className="text-emerald-400 font-semibold">24h (Full Day)</span>
                  <span>72h (Multi-Day)</span>
                </div>
              </div>

              {/* Stack Architecture Readout */}
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col gap-1">
                <span className="text-xs text-slate-400">DFAFC Stack Sizing:</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {portableBalance.stackCellCount} Cells ({portableBalance.cellActiveAreaCm2} cm²)
                </span>
                <span className="text-[10px] text-slate-500">Planar air-breathing stack with passive cooling</span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-cyan-400 font-semibold">Energy Density Advantage:</span> While Lithium-ion batteries top out around 180 Wh/kg, liquid formic acid delivers over 700 Wh/kg net system energy density. A 24-hour drone mission saves {portableBalance.weightSavingsPct}% of payload weight!
              </div>
            </div>

            {/* Performance Readouts & Weight Comparison */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Total System Weight</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {portableBalance.totalSystemWeightKg.toFixed(2)} <span className="text-xs text-slate-500">kg</span>
                </span>
                <span className="text-[10px] text-emerald-400">Stack + Fuel + BoP</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Weight Savings</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {portableBalance.weightSavingsPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-teal-400">vs Li-ion battery pack</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Liquid Fuel Volume</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {portableBalance.formicAcidCartridgeLiters.toFixed(2)} <span className="text-xs text-slate-500">Liters</span>
                </span>
                <span className="text-[10px] text-slate-500">Cartridge mass: {portableBalance.fuelMassKg.toFixed(2)} kg</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Li-Ion Pack Weight</span>
                <span className="text-2xl font-bold font-mono text-slate-400">
                  {portableBalance.equivalentLiIonWeightKg.toFixed(2)} <span className="text-xs text-slate-500">kg</span>
                </span>
                <span className="text-[10px] text-red-400">Too heavy for long flight</span>
              </div>

              {/* Hardware Metrics Cards */}
              <div className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                    Liquid Fuel Safety
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      Non-Flammable
                    </span>
                    <span className="text-xs text-emerald-500">Flash Pt &gt; 69 °C</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Safe transport and zero pressurized hydrogen cylinder hazards
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    Closed Carbon Cycle
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-teal-400">
                      Carbon Neutral
                    </span>
                    <span className="text-xs text-teal-500">e-HCOOH</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Synthesized via catalytic hydrogenation of captured industrial CO₂
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                    Instant Mechanical Refuel
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-cyan-400">
                      &lt; 30 Seconds
                    </span>
                    <span className="text-xs text-cyan-500">Cartridge Swap</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Zero multi-hour battery charging downtime during surveillance missions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
