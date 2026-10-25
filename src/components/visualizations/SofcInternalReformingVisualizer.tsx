// src/components/visualizations/SofcInternalReformingVisualizer.tsx
// Interactive Visualizer: Solid Oxide Fuel Cell (SOFC) with Direct Internal Reforming (DIR)
// & Tri-Generation Combined Heat & Power (CHP) Plant Balance.
// Conforms strictly to IUPAC electrochemistry, ternary C-H-O carbon coking, and Vietnam GDPT 2018 Chemistry.

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
  Flame,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Thermometer,
  Wind
} from 'lucide-react';
import {
  SOFC_FUEL_CATALOG,
  ELECTROLYTE_CATALOG,
  SofcFuelType,
  ElectrolyteArchitecture,
  calculateSofcCellPerformance,
  calculateSofcChpPlantBalance
} from '../../domain/sofcInternalReformingEngine';
import { sound } from '../../audio/soundEngine';

type SofcTabMode =
  | 'INTERNAL_REFORMING_COKING'
  | 'POLARIZATION_OVERPOTENTIALS'
  | 'TRI_GENERATION_CHP_PLANT';

export const SofcInternalReformingVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SofcTabMode>('INTERNAL_REFORMING_COKING');

  // Controls for Mode 1 & 2: Cell & Materials
  const [selectedFuel, setSelectedFuel] = useState<SofcFuelType>('NATURAL_GAS_METHANE');
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<ElectrolyteArchitecture>('YSZ_OXYGEN_ION');
  const [operatingTempC, setOperatingTempC] = useState<number>(750.0);
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(500.0);
  const [steamToCarbonRatio, setSteamToCarbonRatio] = useState<number>(2.5);

  // Controls for Mode 3: CHP Plant
  const [ratedOutputKw, setRatedOutputKw] = useState<number>(500.0);

  const fuelConfig = SOFC_FUEL_CATALOG[selectedFuel] || SOFC_FUEL_CATALOG.NATURAL_GAS_METHANE;
  const electrolyteConfig = ELECTROLYTE_CATALOG[selectedElectrolyte] || ELECTROLYTE_CATALOG.YSZ_OXYGEN_ION;

  // Cell performance calculations
  const cellPerf = useMemo(() => {
    return calculateSofcCellPerformance(
      selectedFuel,
      selectedElectrolyte,
      operatingTempC,
      currentDensityMaCm2,
      steamToCarbonRatio
    );
  }, [selectedFuel, selectedElectrolyte, operatingTempC, currentDensityMaCm2, steamToCarbonRatio]);

  // CHP plant balance calculations
  const chpPlant = useMemo(() => {
    return calculateSofcChpPlantBalance(ratedOutputKw, selectedFuel, operatingTempC);
  }, [ratedOutputKw, selectedFuel, operatingTempC]);

  // Polarization curve points across current densities (100 to 1200 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 100; j <= 1200; j += 100) {
      const perf = calculateSofcCellPerformance(
        selectedFuel,
        selectedElectrolyte,
        operatingTempC,
        j,
        steamToCarbonRatio
      );
      points.push({
        j,
        vCell: perf.operatingCellVoltageV,
        power: perf.powerDensityWcm2
      });
    }
    return points;
  }, [selectedFuel, selectedElectrolyte, operatingTempC, steamToCarbonRatio]);

  const handleModeChange = (mode: SofcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleFuelSelect = (fuel: SofcFuelType) => {
    sound.playUiClick();
    setSelectedFuel(fuel);
    const cfg = SOFC_FUEL_CATALOG[fuel];
    if (cfg && steamToCarbonRatio < cfg.minSteamToCarbonRatio) {
      setSteamToCarbonRatio(cfg.minSteamToCarbonRatio + 0.5);
    }
  };

  const handleElectrolyteSelect = (el: ElectrolyteArchitecture) => {
    sound.playUiClick();
    setSelectedElectrolyte(el);
    const cfg = ELECTROLYTE_CATALOG[el];
    if (cfg) {
      if (operatingTempC < cfg.operatingTempMinC) setOperatingTempC(cfg.operatingTempMinC);
      if (operatingTempC > cfg.operatingTempMaxC) setOperatingTempC(cfg.operatingTempMaxC);
    }
  };

  const handleResetControls = () => {
    sound.playUiClick();
    setSelectedFuel('NATURAL_GAS_METHANE');
    setSelectedElectrolyte('YSZ_OXYGEN_ION');
    setOperatingTempC(750.0);
    setCurrentDensityMaCm2(500.0);
    setSteamToCarbonRatio(2.5);
    setRatedOutputKw(500.0);
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-950/90 rounded-2xl border border-orange-500/30 text-slate-100 shadow-2xl backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-teal-500/20 rounded-xl border border-orange-500/40 text-orange-400 shadow-lg shadow-orange-500/10">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-orange-400 via-amber-300 to-teal-400 bg-clip-text text-transparent">
                Solid Oxide Fuel Cell (SOFC) &amp; Direct Internal Reforming
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/30">
                Tri-Generation CHP (&gt; 85% Total η)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct internal reforming of hydrocarbons (CH₄ + H₂O ↔ CO + 3 H₂), solid oxide O²⁻ transport, and zero-emission high-efficiency cogeneration.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetControls}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
          Reset Parameters
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          onClick={() => handleModeChange('INTERNAL_REFORMING_COKING')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'INTERNAL_REFORMING_COKING'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 border border-orange-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Flame className="w-4 h-4" />
          1. Direct Internal Reforming &amp; Coking
        </button>
        <button
          onClick={() => handleModeChange('POLARIZATION_OVERPOTENTIALS')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'POLARIZATION_OVERPOTENTIALS'
              ? 'bg-gradient-to-r from-amber-600 to-teal-600 text-white shadow-md shadow-amber-600/30 border border-amber-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Gauge className="w-4 h-4" />
          2. Polarization &amp; Overpotentials
        </button>
        <button
          onClick={() => handleModeChange('TRI_GENERATION_CHP_PLANT')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'TRI_GENERATION_CHP_PLANT'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30 border border-teal-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Factory className="w-4 h-4" />
          3. Tri-Generation CHP Plant (500 kW)
        </button>
      </div>

      {/* Tab Mode 1: Direct Internal Reforming & Coking Boundary */}
      {activeMode === 'INTERNAL_REFORMING_COKING' && (
        <div className="flex flex-col gap-5">
          {/* Fuel Selectors Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {Object.values(SOFC_FUEL_CATALOG).map(fuel => (
              <button
                key={fuel.id}
                onClick={() => handleFuelSelect(fuel.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  selectedFuel === fuel.id
                    ? 'bg-orange-500/10 border-orange-400 text-orange-300 shadow-md shadow-orange-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold leading-tight block">{fuel.name}</span>
                  <span className="font-mono text-[10px] text-amber-400 mt-0.5 block">{fuel.chemicalFormula}</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Min S/C</span>
                  <span className="font-mono font-bold text-teal-400">{fuel.minSteamToCarbonRatio > 0 ? fuel.minSteamToCarbonRatio.toFixed(1) : 'None'}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cell Multi-Layer Cross-Section Schematic */}
            <div className="lg:col-span-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-200">
                Solid Oxide Cell Architecture &amp; Reforming Kinetics ({operatingTempC} °C)
              </span>

              {/* Graphical Cell Cross-Section */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                {/* Anode: Ni-YSZ Cermet */}
                <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-amber-400">Ni-YSZ Anode</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    SMR &amp; H₂ Oxidation
                  </div>
                  <span className="text-[10px] text-amber-300">H₂ + O²⁻ → H₂O + 2 e⁻</span>
                  <span className="text-[9px] text-slate-500">
                    Reforming Extent: {cellPerf.internalReformingExtentPct}%
                  </span>
                </div>

                {/* Electrolyte: YSZ / GDC */}
                <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-teal-400">{electrolyteConfig.name}</span>
                  <div className="text-[11px] font-mono text-teal-300">
                    Dense Solid Oxide
                  </div>
                  <span className="text-[10px] text-teal-200">{electrolyteConfig.conductingIon} Ion Conductor</span>
                  <span className="text-[9px] text-slate-500">
                    ASR: {electrolyteConfig.nominalAsrOhmCm2} Ω·cm²
                  </span>
                </div>

                {/* Cathode: LSCF */}
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/30 flex flex-col items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-cyan-400">Porous LSCF Cathode</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    Air Oxygen Reduction
                  </div>
                  <span className="text-[10px] text-cyan-300">½ O₂ + 2 e⁻ → O²⁻</span>
                  <span className="text-[9px] text-slate-500">
                    Mixed Ionic-Electronic (MIEC)
                  </span>
                </div>
              </div>

              {/* Chemical Equations Box */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-orange-400">
                  Vietnam GDPT 2018 Chemistry: Endothermic Reforming &amp; Thermal Synergy
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-orange-300 font-bold block mb-1">Steam Methane Reforming (SMR):</span>
                    <span>CH₄ + H₂O ⇌ CO + 3 H₂</span>
                    <span className="text-[10px] text-slate-400 block mt-1">ΔH° = +206.2 kJ/mol (Absorbs heat!)</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-teal-300 font-bold block mb-1">Electrochemical Oxidation:</span>
                    <span>H₂ + O²⁻ → H₂O + 2 e⁻</span>
                    <span className="text-[10px] text-slate-400 block mt-1">ΔH° = -241.8 kJ/mol (Releases heat!)</span>
                  </div>
                </div>
              </div>

              {/* Coking Warning or Safety Banner */}
              {cellPerf.isCokingRisk ? (
                <div className="p-3 bg-red-950/50 rounded-xl border border-red-500/50 flex items-center gap-3 text-red-300 animate-pulse">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold">Carbon Coking Alert:</span> Steam-to-Carbon ratio ({steamToCarbonRatio.toFixed(1)}) is below the thermodynamic carbon deposition threshold ({fuelConfig.minSteamToCarbonRatio.toFixed(1)}). Carbon cracking (CH₄ → C + 2 H₂) will deactivate Ni catalyst sites!
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 flex items-center gap-3 text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold">Thermodynamic Carbon Suppression Active:</span> S/C = {steamToCarbonRatio.toFixed(1)} lies safely outside the ternary C-H-O coking boundary, ensuring long-term Ni catalyst stability.
                  </div>
                </div>
              )}
            </div>

            {/* S/C Ratio Slider & Readouts */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
                <Sliders className="w-4 h-4" />
                Reforming Controls
              </div>

              {/* Steam-to-Carbon Ratio Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Steam-to-Carbon (S/C):</span>
                  <span className="font-mono text-orange-400 font-bold">{steamToCarbonRatio.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="4.0"
                  step="0.1"
                  value={steamToCarbonRatio}
                  onChange={e => setSteamToCarbonRatio(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span className="text-red-400">0.8 (Coking)</span>
                  <span className="text-orange-400">Optimal ~ 2.5</span>
                  <span>4.0</span>
                </div>
              </div>

              {/* Thermal Heat Absorption Metric */}
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Thermal Self-Cooling</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {cellPerf.heatAbsorptionRatioPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">
                  Cell Joule heat neutralized by endothermic SMR
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Direct Reforming Extent</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {cellPerf.internalReformingExtentPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">
                  Methane conversion on Ni-YSZ catalyst
                </span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-orange-400 font-semibold">{fuelConfig.name}:</span> {fuelConfig.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 2: Dynamic Cell Polarization & Overpotential Deconstruction */}
      {activeMode === 'POLARIZATION_OVERPOTENTIALS' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Operational Sliders */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sliders className="w-4 h-4" />
                Electrochemical Variables
              </div>

              {/* Operating Temperature */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Operating Temperature:</span>
                  <span className="font-mono text-amber-400 font-bold">{operatingTempC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min={electrolyteConfig.operatingTempMinC}
                  max={electrolyteConfig.operatingTempMaxC}
                  step="10"
                  value={operatingTempC}
                  onChange={e => setOperatingTempC(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{electrolyteConfig.operatingTempMinC} °C</span>
                  <span className="text-amber-400">Optimal 750 °C</span>
                  <span>{electrolyteConfig.operatingTempMaxC} °C</span>
                </div>
              </div>

              {/* Current Density */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Density:</span>
                  <span className="font-mono text-teal-400 font-bold">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="25"
                  value={currentDensityMaCm2}
                  onChange={e => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Electrolyte Selection Radio Buttons */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-300">Electrolyte Material:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {Object.values(ELECTROLYTE_CATALOG).map(el => (
                    <button
                      key={el.id}
                      onClick={() => handleElectrolyteSelect(el.id)}
                      className={`p-2 rounded-lg text-left text-xs transition-all ${
                        selectedElectrolyte === el.id
                          ? 'bg-teal-500/20 border border-teal-400 text-teal-300 font-semibold'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>{el.name}</span>
                        <span className="font-mono text-[10px] text-teal-400">{el.conductingIon}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Readouts & Interactive Polarization Curve SVG */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Cell Voltage</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {cellPerf.operatingCellVoltageV.toFixed(3)} <span className="text-xs text-slate-500">V</span>
                  </span>
                  <span className="text-[10px] text-slate-500">OCV: {cellPerf.openCircuitVoltageV.toFixed(3)} V</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Power Density</span>
                  <span className="text-2xl font-bold font-mono text-teal-400">
                    {cellPerf.powerDensityWcm2.toFixed(3)} <span className="text-xs text-slate-500">W/cm²</span>
                  </span>
                  <span className="text-[10px] text-slate-500">At {currentDensityMaCm2} mA/cm²</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">LHV Electrical Eff</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {cellPerf.electricalEfficiencyLhvPct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-400">Industry highest</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Ohmic Loss</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {cellPerf.ohmicOverpotentialMv.toFixed(0)} <span className="text-xs text-slate-500">mV</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Act: {cellPerf.activationOverpotentialMv.toFixed(0)} mV</span>
                </div>
              </div>

              {/* Polarization Curve SVG */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">
                    V-I &amp; Power Density Polarization Characteristics ({operatingTempC} °C)
                  </span>
                  <span className="text-amber-400 font-mono text-[11px]">
                    Current: {currentDensityMaCm2} mA/cm², {cellPerf.powerDensityWcm2.toFixed(3)} W/cm²
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
                        const x = 40 + ((pt.j - 100) / 1100) * 440;
                        // Map Voltage (0.4 to 1.1 V) to Y (120 to 10)
                        const y = 120 - ((pt.vCell - 0.4) / 0.7) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Power Density Curve (Amber line) */}
                    <path
                      d={polarizationPoints.reduce((acc, pt, idx) => {
                        const x = 40 + ((pt.j - 100) / 1100) * 440;
                        // Map Power (0 to 0.7 W/cm2) to Y (120 to 10)
                        const y = 120 - (pt.power / 0.7) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />

                    {/* Operating Point Markers */}
                    <circle
                      cx={40 + ((currentDensityMaCm2 - 100) / 1100) * 440}
                      cy={120 - ((cellPerf.operatingCellVoltageV - 0.4) / 0.7) * 110}
                      r="5"
                      fill="#06b6d4"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={40 + ((currentDensityMaCm2 - 100) / 1100) * 440}
                      cy={120 - (cellPerf.powerDensityWcm2 / 0.7) * 110}
                      r="5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Axes */}
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="10" x2="40" y2="120" stroke="#475569" strokeWidth="1" />

                    {/* Axis Labels */}
                    <text x="10" y="25" fill="#64748b" fontSize="8">1.1 V</text>
                    <text x="10" y="70" fill="#64748b" fontSize="8">0.7 V</text>
                    <text x="10" y="115" fill="#64748b" fontSize="8">0.4 V</text>
                    <text x="40" y="132" fill="#64748b" fontSize="8">100</text>
                    <text x="250" y="132" fill="#64748b" fontSize="8">600 mA/cm²</text>
                    <text x="440" y="132" fill="#64748b" fontSize="8">1200</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 3: Tri-Generation CHP Plant Balance */}
      {activeMode === 'TRI_GENERATION_CHP_PLANT' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Plant Capacity Slider */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Sliders className="w-4 h-4" />
                CHP Stack Rating
              </div>

              {/* Rated Output */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Rated Net Power Output:</span>
                  <span className="font-mono text-teal-400 font-bold">{ratedOutputKw.toFixed(0)} kWe</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={ratedOutputKw}
                  onChange={e => setRatedOutputKw(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>100 kWe</span>
                  <span className="text-teal-400">500 kWe</span>
                  <span>2,000 kWe</span>
                </div>
              </div>

              {/* Physical Stack Sizing */}
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Commercial Cell Count:</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {chpPlant.cellCount.toLocaleString()} Cells ({chpPlant.activeAreaM2} m²)
                </span>
                <span className="text-[10px] text-slate-500">Planar repeat unit with metallic interconnects</span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-teal-400 font-semibold">High-Grade Heat Recovery:</span> Solid oxide cells discharge exhaust gases at ~ {chpPlant.exhaustTempC} °C. This thermal energy is recovered to generate high-pressure steam and district heating, raising total plant efficiency to {chpPlant.totalChpEfficiencyPct}%.
              </div>
            </div>

            {/* Cogeneration Outputs & Energy Efficiency */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Total CHP Efficiency</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {chpPlant.totalChpEfficiencyPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-emerald-400">Elec + Thermal recovery</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Electrical Efficiency</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {chpPlant.electricalEfficiencyPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500">LHV basis</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Recoverable Heat</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {chpPlant.recoverableHighGradeHeatKw.toFixed(0)} <span className="text-xs text-slate-500">kWth</span>
                </span>
                <span className="text-[10px] text-slate-500">Exhaust at {chpPlant.exhaustTempC} °C</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Avoided Grid CO2</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {chpPlant.avoidedGridCo2TonsYear.toFixed(0)} <span className="text-xs text-slate-500">t/yr</span>
                </span>
                <span className="text-[10px] text-cyan-400">Displaces coal/gas grid</span>
              </div>

              {/* Plant Flow Cards */}
              <div className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    Fuel Feed Consumption
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-orange-400">
                      {chpPlant.fuelConsumptionKgHr.toFixed(1)} kg/hr
                    </span>
                    <span className="text-xs text-slate-500">Thermal: {chpPlant.thermalInputLhvKw.toFixed(0)} kWth</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Lower heating value: {fuelConfig.lowerHeatingValueMjKg} MJ/kg
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                    Zero NOx Emissions
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      &lt; 0.5 ppm
                    </span>
                    <span className="text-xs text-emerald-500">Non-combustion</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Flameless electrochemical oxidation prevents thermal NOx formation
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    Grid Support Capability
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-purple-400">
                      Base-Load 24/7
                    </span>
                    <span className="text-xs text-purple-500">Dispatchable</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Decentralized microgrid &amp; hospital continuous power resiliency
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
