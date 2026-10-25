// src/components/visualizations/IronAirBatteryVisualizer.tsx
// Interactive Visualizer: Iron-Air Long-Duration Energy Storage Battery (Fe-Air)
// & Reversible Rusting Multi-Day Grid Storage System.
// Conforms strictly to IUPAC electrochemistry, Pourbaix Fe-H2O, and Vietnam GDPT 2018 Chemistry.

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
  Coins,
  Cpu
} from 'lucide-react';
import {
  IRON_ADDITIVE_CATALOG,
  IronAdditiveConfig,
  calculateFeAirCellState,
  calculateFeAirGridPlantBalance,
  FE_THEORETICAL_CAPACITY_MAH_G
} from '../../domain/ironAirBatteryEngine';
import { sound } from '../../audio/soundEngine';

type FeAirTabMode =
  | 'REVERSIBLE_RUSTING_MECHANISM'
  | 'CELL_POLARIZATION_EFFICIENCY'
  | 'MULTI_DAY_GRID_STORAGE';

export const IronAirBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<FeAirTabMode>('REVERSIBLE_RUSTING_MECHANISM');

  // Controls for Mode 1 & 2: Cell & Additive
  const [selectedAdditiveId, setSelectedAdditiveId] = useState<string>('BISMUTH_OXIDE');
  const [depthOfDischargePct, setDepthOfDischargePct] = useState<number>(75.0);
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(20.0);
  const [operatingTempC, setOperatingTempC] = useState<number>(25.0);

  // Controls for Mode 3: Grid Plant
  const [powerRatingMw, setPowerRatingMw] = useState<number>(10.0);
  const [storageDurationHours, setStorageDurationHours] = useState<number>(100.0); // 100h multi-day

  const currentAdditive = IRON_ADDITIVE_CATALOG[selectedAdditiveId] || IRON_ADDITIVE_CATALOG.BISMUTH_OXIDE;

  // Cell state calculations
  const cellState = useMemo(() => {
    return calculateFeAirCellState(
      depthOfDischargePct,
      currentDensityMaCm2,
      operatingTempC,
      selectedAdditiveId
    );
  }, [depthOfDischargePct, currentDensityMaCm2, operatingTempC, selectedAdditiveId]);

  // Grid plant balance calculations
  const plantBalance = useMemo(() => {
    return calculateFeAirGridPlantBalance(
      powerRatingMw,
      storageDurationHours,
      selectedAdditiveId
    );
  }, [powerRatingMw, storageDurationHours, selectedAdditiveId]);

  // Discharge / Charge voltage profile curve points across DOD (0% to 100%)
  const voltageCurvePoints = useMemo(() => {
    const points = [];
    for (let dod = 5; dod <= 95; dod += 5) {
      const state = calculateFeAirCellState(
        dod,
        currentDensityMaCm2,
        operatingTempC,
        selectedAdditiveId
      );
      points.push({
        dod,
        vDis: state.dischargeCellVoltageV,
        vChg: state.chargeCellVoltageV
      });
    }
    return points;
  }, [currentDensityMaCm2, operatingTempC, selectedAdditiveId]);

  const handleModeChange = (mode: FeAirTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleAdditiveSelect = (additiveId: string) => {
    sound.playUiClick();
    setSelectedAdditiveId(additiveId);
  };

  const handleResetControls = () => {
    sound.playUiClick();
    setSelectedAdditiveId('BISMUTH_OXIDE');
    setDepthOfDischargePct(75.0);
    setCurrentDensityMaCm2(20.0);
    setOperatingTempC(25.0);
    setPowerRatingMw(10.0);
    setStorageDurationHours(100.0);
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-950/90 rounded-2xl border border-amber-500/30 text-slate-100 shadow-2xl backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-cyan-500/20 rounded-xl border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                Iron-Air Long-Duration Energy Storage Battery (Fe-Air)
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                100h Multi-Day Grid Storage
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Reversible electrochemical rusting (Fe ↔ Fe(OH)₂), parasitic HER suppression dopants, and low-cost multi-day grid storage (&lt; $25/kWh).
            </p>
          </div>
        </div>

        <button
          onClick={handleResetControls}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          Reset Parameters
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          onClick={() => handleModeChange('REVERSIBLE_RUSTING_MECHANISM')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'REVERSIBLE_RUSTING_MECHANISM'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/30 border border-amber-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          1. Reversible Rusting &amp; Additives
        </button>
        <button
          onClick={() => handleModeChange('CELL_POLARIZATION_EFFICIENCY')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'CELL_POLARIZATION_EFFICIENCY'
              ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/30 border border-orange-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Gauge className="w-4 h-4" />
          2. Polarization &amp; Voltage Curves
        </button>
        <button
          onClick={() => handleModeChange('MULTI_DAY_GRID_STORAGE')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'MULTI_DAY_GRID_STORAGE'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Factory className="w-4 h-4" />
          3. 100-Hour Grid Plant (&lt; $25/kWh)
        </button>
      </div>

      {/* Tab Mode 1: Reversible Rusting Mechanism & Additive Screening */}
      {activeMode === 'REVERSIBLE_RUSTING_MECHANISM' && (
        <div className="flex flex-col gap-5">
          {/* Additive Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
            {Object.values(IRON_ADDITIVE_CATALOG).map(additive => (
              <button
                key={additive.id}
                onClick={() => handleAdditiveSelect(additive.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  selectedAdditiveId === additive.id
                    ? 'bg-amber-500/10 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold leading-tight block">{additive.name}</span>
                  <span className="font-mono text-[10px] text-amber-400 mt-0.5 block">{additive.chemicalFormula}</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">HER Boost</span>
                  <span className="font-mono font-bold text-emerald-400">+{additive.herOverpotentialBoostMv} mV</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cell Architecture Schematic */}
            <div className="lg:col-span-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-200">
                Aqueous Alkaline Fe-Air 3-Phase Interface (6 M KOH Electrolyte)
              </span>

              {/* Graphical Cell Cross-Section */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                {/* Anode: Iron */}
                <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-amber-400">Porous Iron Anode</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    Fe ↔ Fe(OH)₂ + 2 e⁻
                  </div>
                  <span className="text-[10px] text-amber-300">E° = -0.877 V vs SHE</span>
                  <span className="text-[9px] text-slate-500">
                    Additive: {currentAdditive.chemicalFormula} (+{currentAdditive.herOverpotentialBoostMv} mV HER)
                  </span>
                </div>

                {/* Electrolyte: 6M KOH */}
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-cyan-400">Alkaline Electrolyte</span>
                  <div className="text-[11px] font-mono text-cyan-300">
                    6 M KOH (aq) + LiOH
                  </div>
                  <span className="text-[10px] text-cyan-200">OH⁻ ion conductor</span>
                  <span className="text-[9px] text-slate-500">
                    Self-discharge: {currentAdditive.selfDischargeRatePctDay}%/day
                  </span>
                </div>

                {/* Cathode: Air Breathing */}
                <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-teal-400">Air Breathing Cathode</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    O₂ + 2 H₂O + 4 e⁻ ↔ 4 OH⁻
                  </div>
                  <span className="text-[10px] text-teal-300">E° = +0.401 V vs SHE</span>
                  <span className="text-[9px] text-slate-500">
                    Bifunctional Spinel Catalyst (NiFe-LDH)
                  </span>
                </div>
              </div>

              {/* Chemical Equations Card */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  Vietnam GDPT 2018 Chemistry: Reversible Rusting &amp; Redox Coupling
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-amber-300 font-bold block mb-1">Discharge (Spontaneous Rusting):</span>
                    <span>2 Fe + O₂ + 2 H₂O → 2 Fe(OH)₂</span>
                    <span className="text-[10px] text-slate-400 block mt-1">E°cell = 1.278 V | Consumes ambient O₂</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-cyan-300 font-bold block mb-1">Recharge (Un-Rusting / Reduction):</span>
                    <span>2 Fe(OH)₂ → 2 Fe + O₂ ↑ + 2 H₂O</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Evolves pure O₂ gas | Stores renewable electricity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Readouts & Additive Impact */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Parasitic HER Fraction</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {cellState.herCurrentFractionPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">vs &gt; 35% without dopant</span>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Coulombic Efficiency (CE)</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {cellState.coulombicEfficiencyPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">Charge retention ratio</span>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Active Iron Utilization</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {cellState.activeFeUtilizationPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">
                  Theoretical: {FE_THEORETICAL_CAPACITY_MAH_G.toFixed(0)} mAh/g
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-amber-400 font-semibold">{currentAdditive.name}:</span> {currentAdditive.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 2: Cell Polarization & Voltage Curves */}
      {activeMode === 'CELL_POLARIZATION_EFFICIENCY' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Sliders Control Panel */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sliders className="w-4 h-4" />
                Operational Variables
              </div>

              {/* Depth of Discharge (DOD) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Depth of Discharge (DOD):</span>
                  <span className="font-mono text-amber-400 font-bold">{depthOfDischargePct.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  step="1"
                  value={depthOfDischargePct}
                  onChange={e => setDepthOfDischargePct(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>10%</span>
                  <span className="text-amber-400">Fe → Fe(OH)₂</span>
                  <span>95% (Fe₃O₄ shift)</span>
                </div>
              </div>

              {/* Current Density */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Density:</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={currentDensityMaCm2}
                  onChange={e => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5 mA/cm² (Deep cycle)</span>
                  <span className="text-cyan-400">20 mA/cm²</span>
                  <span>50 mA/cm²</span>
                </div>
              </div>

              {/* Operating Temperature */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Operating Temperature:</span>
                  <span className="font-mono text-teal-400 font-bold">{operatingTempC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={operatingTempC}
                  onChange={e => setOperatingTempC(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-amber-400 font-semibold">Tafel Polarization:</span> The sluggish kinetics of the 4-electron Oxygen Reduction Reaction (ORR) at the air electrode causes a ~250 mV overpotential during discharge, establishing a discharge plateau around 0.92 V.
              </div>
            </div>

            {/* Readouts & Interactive Voltage Profile SVG */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Discharge Voltage</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {cellState.dischargeCellVoltageV.toFixed(3)} <span className="text-xs text-slate-500">V</span>
                  </span>
                  <span className="text-[10px] text-slate-500">OCV: {cellState.cellOpenCircuitVoltageV.toFixed(3)} V</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Charge Voltage</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {cellState.chargeCellVoltageV.toFixed(3)} <span className="text-xs text-slate-500">V</span>
                  </span>
                  <span className="text-[10px] text-slate-500">OER overpotential ~ 300 mV</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Voltage Efficiency</span>
                  <span className="text-2xl font-bold font-mono text-purple-400">
                    {cellState.voltageEfficiencyPct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500">V_dis / V_chg</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Round-Trip Energy (RTE)</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {cellState.roundTripEnergyEfficiencyPct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-400">Optimal for 100h multi-day</span>
                </div>
              </div>

              {/* Voltage Plateau SVG */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">
                    Galvanostatic Charge &amp; Discharge Voltage Plateaus (DOD 0% - 100%)
                  </span>
                  <span className="text-amber-400 font-mono text-[11px]">
                    Current DOD: {depthOfDischargePct.toFixed(0)}%
                  </span>
                </div>

                <div className="w-full h-44 bg-slate-950/80 rounded-lg p-2 border border-slate-800 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 140" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="60" x2="480" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                    {/* Secondary Phase Shift Line (80% DOD) */}
                    <line
                      x1={40 + (0.80 * 440)}
                      y1="10"
                      x2={40 + (0.80 * 440)}
                      y2="120"
                      stroke="#f59e0b"
                      strokeDasharray="4 2"
                      strokeWidth="1"
                    />
                    <text x={45 + (0.80 * 440)} y="25" fill="#f59e0b" fontSize="8">
                      Fe₃O₄ Shift
                    </text>

                    {/* Charge Curve (Top line ~ 1.70 - 1.80 V) */}
                    <path
                      d={voltageCurvePoints.reduce((acc, pt, idx) => {
                        const x = 40 + (pt.dod / 100) * 440;
                        // Map Voltage (0.5 V to 2.0 V) to Y (120 to 10)
                        const y = 120 - ((pt.vChg - 0.5) / 1.5) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Discharge Curve (Bottom line ~ 0.90 - 1.00 V) */}
                    <path
                      d={voltageCurvePoints.reduce((acc, pt, idx) => {
                        const x = 40 + (pt.dod / 100) * 440;
                        const y = 120 - ((pt.vDis - 0.5) / 1.5) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />

                    {/* Operating Point Markers */}
                    <circle
                      cx={40 + (depthOfDischargePct / 100) * 440}
                      cy={120 - ((cellState.chargeCellVoltageV - 0.5) / 1.5) * 110}
                      r="5"
                      fill="#06b6d4"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={40 + (depthOfDischargePct / 100) * 440}
                      cy={120 - ((cellState.dischargeCellVoltageV - 0.5) / 1.5) * 110}
                      r="5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Axes */}
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="10" x2="40" y2="120" stroke="#475569" strokeWidth="1" />

                    {/* Axis Labels */}
                    <text x="10" y="25" fill="#64748b" fontSize="8">1.8 V</text>
                    <text x="10" y="70" fill="#64748b" fontSize="8">1.2 V</text>
                    <text x="10" y="115" fill="#64748b" fontSize="8">0.6 V</text>
                    <text x="40" y="132" fill="#64748b" fontSize="8">0% DOD</text>
                    <text x="250" y="132" fill="#64748b" fontSize="8">50% DOD</text>
                    <text x="450" y="132" fill="#64748b" fontSize="8">100% DOD</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 3: 100-Hour Grid Plant Techno-Economics */}
      {activeMode === 'MULTI_DAY_GRID_STORAGE' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Plant Sizing Controls */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sliders className="w-4 h-4" />
                Grid System Sizing
              </div>

              {/* Power Rating Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Continuous Power Rating:</span>
                  <span className="font-mono text-cyan-400 font-bold">{powerRatingMw.toFixed(0)} MW</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={powerRatingMw}
                  onChange={e => setPowerRatingMw(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Storage Duration Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Multi-Day Duration:</span>
                  <span className="font-mono text-amber-400 font-bold">{storageDurationHours.toFixed(0)} Hours</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="150"
                  step="2"
                  value={storageDurationHours}
                  onChange={e => setStorageDurationHours(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>24h (1 Day)</span>
                  <span className="text-amber-400 font-semibold">100h (4+ Days)</span>
                  <span>150h</span>
                </div>
              </div>

              {/* Total Storage Capacity Readout */}
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total System Energy:</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {plantBalance.totalStorageCapacityMwh.toLocaleString()} MWh
                </span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-cyan-400 font-semibold">Techno-Economic Paradigm:</span> Iron is the 4th most abundant element in Earth's crust ($0.15/kg). By decoupling power (air cathode area) from energy (iron pellets in aqueous tanks), Fe-air achieves &lt; $25/kWh — over 10x cheaper than Li-ion!
              </div>
            </div>

            {/* Techno-Economics & Capital Savings */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Capital Cost per kWh</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  ${plantBalance.costPerKwhUsd.toFixed(1)} <span className="text-xs text-slate-500">/kWh</span>
                </span>
                <span className="text-[10px] text-emerald-400">vs $250/kWh for Li-ion</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Total System Cost</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  ${(plantBalance.installedCapitalCostUsd / 1e6).toFixed(1)}M
                </span>
                <span className="text-[10px] text-slate-500">Li-ion: ${(plantBalance.equivalentLiIonCostUsd / 1e6).toFixed(0)}M</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Capital Cost Savings</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  ${(plantBalance.capitalCostSavingsUsd / 1e6).toFixed(1)}M
                </span>
                <span className="text-[10px] text-cyan-400">&gt; 88% CapEx reduction</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Avoided Peaker CO2</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {(plantBalance.annualAvoidedCo2Tons / 1000).toFixed(1)}k <span className="text-xs text-slate-500">t/yr</span>
                </span>
                <span className="text-[10px] text-teal-400">Displaces peaker gas</span>
              </div>

              {/* Physical Logistics & Safety Badges */}
              <div className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-amber-400" />
                    Iron Anode Mass Inventory
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-amber-400">
                      {plantBalance.requiredIronMassTons.toLocaleString()} tons
                    </span>
                    <span className="text-xs text-slate-500">DRI Pellets</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Aqueous 6 M KOH volume: {plantBalance.electrolyteVolumeM3.toLocaleString()} m³
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Inherent Fire Safety
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      Zero Fire Risk
                    </span>
                    <span className="text-xs text-emerald-500">Non-Flammable</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Water-based aqueous chemistry with zero thermal runaway hazard
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    Asset Lifetime Durability
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-purple-400">
                      {plantBalance.calendarLifeYears} Years
                    </span>
                    <span className="text-xs text-purple-500">&gt; 10,000 Cycles</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Avoided curtailment: {(plantBalance.annualAvoidedCurtailmentMwh / 1000).toFixed(0)}k MWh/year
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
