// src/components/visualizations/SupercriticalCo2BraytonVisualizer.tsx
// Interactive Visualizer: Supercritical CO2 (sCO2) Recompression Brayton Cycle
// & Direct Oxy-Combustion Allam-Fetvedt Clean Power Generation.
// Conforms strictly to IUPAC thermodynamics, Span-Wagner real-gas CO2, and Vietnam GDPT 2018 Chemistry.

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
  Wind,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import {
  SCO2_CYCLE_CONFIGS,
  calculateRealGasCo2Properties,
  calculateRecompressionCyclePerformance,
  calculateAllamCyclePlantBalance,
  CO2_CRITICAL_TEMP_C,
  CO2_CRITICAL_PRESSURE_BAR
} from '../../domain/supercriticalCo2BraytonEngine';
import { sound } from '../../audio/soundEngine';

type Sco2TabMode =
  | 'REAL_GAS_THERMODYNAMICS'
  | 'RCBC_PINCH_POINT_SOLVER'
  | 'ALLAM_OXYCOMBUSTION_PLANT';

export const SupercriticalCo2BraytonVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Sco2TabMode>('REAL_GAS_THERMODYNAMICS');

  // Controls for Mode 1: Real-gas properties
  const [fluidTempC, setFluidTempC] = useState<number>(32.0);
  const [fluidPressureBar, setFluidPressureBar] = useState<number>(77.0);

  // Controls for Mode 2: RCBC Cycle
  const [selectedConfigId, setSelectedConfigId] = useState<string>('rcbc_nuclear_csp');
  const [turbineInletTempC, setTurbineInletTempC] = useState<number>(650.0);
  const [cycleHighPressureBar, setCycleHighPressureBar] = useState<number>(200.0);
  const [cycleLowPressureBar, setCycleLowPressureBar] = useState<number>(77.0);
  const [recompressionSplitRatio, setRecompressionSplitRatio] = useState<number>(0.32);
  const [cycleMassFlowKgS, setCycleMassFlowKgS] = useState<number>(2400.0);

  // Controls for Mode 3: Allam Cycle Plant
  const [methaneFeedKgS, setMethaneFeedKgS] = useState<number>(10.0); // 10 kg/s = 500 MWth
  const [allamTitTempC, setAllamTitTempC] = useState<number>(1150.0);
  const [combustorPressureBar, setCombustorPressureBar] = useState<number>(300.0);

  // Mode 1 calculations
  const fluidProps = useMemo(() => {
    return calculateRealGasCo2Properties(fluidTempC, fluidPressureBar);
  }, [fluidTempC, fluidPressureBar]);

  // Compressibility Z curve across pressures at current temperature
  const compressibilityCurvePoints = useMemo(() => {
    const points = [];
    for (let p = 10; p <= 250; p += 10) {
      const res = calculateRealGasCo2Properties(fluidTempC, p);
      points.push({
        pressure: p,
        z: res.compressibilityZ,
        density: res.densityKgM3
      });
    }
    return points;
  }, [fluidTempC]);

  // Mode 2 calculations
  const rcbcResult = useMemo(() => {
    return calculateRecompressionCyclePerformance(
      turbineInletTempC,
      cycleHighPressureBar,
      cycleLowPressureBar,
      recompressionSplitRatio,
      cycleMassFlowKgS
    );
  }, [
    turbineInletTempC,
    cycleHighPressureBar,
    cycleLowPressureBar,
    recompressionSplitRatio,
    cycleMassFlowKgS
  ]);

  // Mode 3 calculations
  const allamResult = useMemo(() => {
    return calculateAllamCyclePlantBalance(methaneFeedKgS, allamTitTempC, combustorPressureBar);
  }, [methaneFeedKgS, allamTitTempC, combustorPressureBar]);

  const handleModeChange = (mode: Sco2TabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleConfigSelect = (configId: string) => {
    sound.playUiClick();
    setSelectedConfigId(configId);
    const cfg = SCO2_CYCLE_CONFIGS.find(c => c.id === configId);
    if (cfg) {
      setTurbineInletTempC(cfg.turbineInletTempC);
      setCycleHighPressureBar(cfg.highPressureMpa * 10);
      setCycleLowPressureBar(cfg.lowPressureMpa * 10);
    }
  };

  const handleResetControls = () => {
    sound.playUiClick();
    setFluidTempC(32.0);
    setFluidPressureBar(77.0);
    setTurbineInletTempC(650.0);
    setCycleHighPressureBar(200.0);
    setCycleLowPressureBar(77.0);
    setRecompressionSplitRatio(0.32);
    setCycleMassFlowKgS(2400.0);
    setMethaneFeedKgS(10.0);
    setAllamTitTempC(1150.0);
    setCombustorPressureBar(300.0);
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-950/90 rounded-2xl border border-emerald-500/30 text-slate-100 shadow-2xl backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Supercritical CO2 Brayton Power Cycle & Direct Oxy-Combustion
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                IUPAC / ASME PTC 46
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-efficiency closed recompression Brayton cycles (RCBC &gt; 50%) &amp; Allam-Fetvedt zero-emission oxy-combustion with 100% inherent CCUS.
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
          onClick={() => handleModeChange('REAL_GAS_THERMODYNAMICS')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'REAL_GAS_THERMODYNAMICS'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Gauge className="w-4 h-4" />
          1. Real-Gas CO2 &amp; Critical Point
        </button>
        <button
          onClick={() => handleModeChange('RCBC_PINCH_POINT_SOLVER')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'RCBC_PINCH_POINT_SOLVER'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30 border border-teal-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          2. RCBC &amp; Pinch-Point Solver
        </button>
        <button
          onClick={() => handleModeChange('ALLAM_OXYCOMBUSTION_PLANT')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeMode === 'ALLAM_OXYCOMBUSTION_PLANT'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Factory className="w-4 h-4" />
          3. Allam Oxy-Combustion (100% CCUS)
        </button>
      </div>

      {/* Tab Mode 1: Real-Gas Thermodynamics & Critical Point */}
      {activeMode === 'REAL_GAS_THERMODYNAMICS' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Sliders Control Panel */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Sliders className="w-4 h-4" />
                State Variable Controls
              </div>

              {/* Temperature Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Fluid Temperature:</span>
                  <span className="font-mono text-emerald-400 font-bold">{fluidTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="20.0"
                  max="120.0"
                  step="0.5"
                  value={fluidTempC}
                  onChange={e => setFluidTempC(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>20 °C</span>
                  <span className="text-emerald-400">Critical: 31.0 °C</span>
                  <span>120 °C</span>
                </div>
              </div>

              {/* Pressure Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Fluid Pressure:</span>
                  <span className="font-mono text-cyan-400 font-bold">{fluidPressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="20.0"
                  max="250.0"
                  step="1.0"
                  value={fluidPressureBar}
                  onChange={e => setFluidPressureBar(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>20 bar</span>
                  <span className="text-cyan-400">Critical: 73.8 bar</span>
                  <span>250 bar</span>
                </div>
              </div>

              {/* State Indicator */}
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Thermodynamic State:</span>
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${
                    fluidProps.state === 'SUPERCRITICAL'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20 animate-pulse'
                      : fluidProps.state === 'SUB_LIQUID'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  {fluidProps.state === 'SUPERCRITICAL' ? 'Supercritical Fluid (sCO2)' : fluidProps.state}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-emerald-400 font-semibold">Vietnam GDPT 2018 Chemistry:</span> Supercritical CO2 exists above its critical point (Tc = 31.0 °C, Pc = 73.8 bar). It possesses gas-like diffusivity for rapid heat transfer and liquid-like density that slashes compression power by over 60%.
              </div>
            </div>

            {/* Readouts & Metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Compressibility (Z)</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {fluidProps.compressibilityZ.toFixed(3)}
                </span>
                <span className="text-[10px] text-slate-500">Ideal gas = 1.000</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Fluid Density (ρ)</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {fluidProps.densityKgM3.toFixed(1)} <span className="text-xs text-slate-500">kg/m³</span>
                </span>
                <span className="text-[10px] text-slate-500">Critical = 467.6 kg/m³</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Specific Heat (Cp)</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {fluidProps.specificHeatCpKjKgK.toFixed(2)} <span className="text-xs text-slate-500">kJ/kg·K</span>
                </span>
                <span className="text-[10px] text-slate-500">Spikes near pseudo-crit</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Compression Work</span>
                <span className="text-2xl font-bold font-mono text-purple-400">
                  -{((1 - fluidProps.compressionWorkRatioVsIdeal) * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-slate-500">vs ideal gas compression</span>
              </div>

              {/* Interactive Compressibility Z vs Pressure Curve SVG */}
              <div className="col-span-2 md:col-span-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">
                    Span-Wagner Compressibility Factor Z vs Pressure Curve (T = {fluidTempC.toFixed(1)} °C)
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px]">
                    Current: P = {fluidPressureBar.toFixed(1)} bar, Z = {fluidProps.compressibilityZ.toFixed(3)}
                  </span>
                </div>

                <div className="w-full h-44 bg-slate-950/80 rounded-lg p-2 border border-slate-800 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 140" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="60" x2="480" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                    {/* Critical pressure marker */}
                    <line
                      x1={40 + ((CO2_CRITICAL_PRESSURE_BAR - 10) / 240) * 440}
                      y1="10"
                      x2={40 + ((CO2_CRITICAL_PRESSURE_BAR - 10) / 240) * 440}
                      y2="120"
                      stroke="#10b981"
                      strokeDasharray="4 2"
                      strokeWidth="1.5"
                    />
                    <text
                      x={45 + ((CO2_CRITICAL_PRESSURE_BAR - 10) / 240) * 440}
                      y="25"
                      fill="#10b981"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Pc = 73.8 bar
                    </text>

                    {/* Z curve */}
                    <path
                      d={compressibilityCurvePoints.reduce((acc, pt, idx) => {
                        const x = 40 + ((pt.pressure - 10) / 240) * 440;
                        // Map Z (0.2 to 1.1) to Y (120 to 10)
                        const y = 120 - ((pt.z - 0.2) / 0.9) * 110;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Current operating point marker */}
                    <circle
                      cx={40 + (Math.min(250, Math.max(10, fluidPressureBar)) - 10) / 240 * 440}
                      cy={120 - ((fluidProps.compressibilityZ - 0.2) / 0.9) * 110}
                      r="5.5"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Axes */}
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="10" x2="40" y2="120" stroke="#475569" strokeWidth="1" />

                    {/* Labels */}
                    <text x="15" y="25" fill="#64748b" fontSize="8">Z=1.0</text>
                    <text x="15" y="70" fill="#64748b" fontSize="8">Z=0.6</text>
                    <text x="15" y="115" fill="#64748b" fontSize="8">Z=0.2</text>
                    <text x="40" y="132" fill="#64748b" fontSize="8">10 bar</text>
                    <text x="250" y="132" fill="#64748b" fontSize="8">130 bar</text>
                    <text x="460" y="132" fill="#64748b" fontSize="8">250 bar</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 2: RCBC Cycle & Pinch-Point Solver */}
      {activeMode === 'RCBC_PINCH_POINT_SOLVER' && (
        <div className="flex flex-col gap-5">
          {/* Preset Configurations Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SCO2_CYCLE_CONFIGS.map(cfg => (
              <button
                key={cfg.id}
                onClick={() => handleConfigSelect(cfg.id)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  selectedConfigId === cfg.id
                    ? 'bg-teal-500/10 border-teal-400 text-teal-300 shadow-md shadow-teal-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-bold leading-tight line-clamp-1">{cfg.name}</span>
                <div className="flex justify-between items-center mt-2 text-[10px]">
                  <span className="text-slate-500">{cfg.turbineInletTempC} °C</span>
                  <span className="font-mono font-bold text-teal-400">{cfg.thermalEfficiencyPct}% η</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cycle Parameters Sliders */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Sliders className="w-4 h-4" />
                Cycle Operational Variables
              </div>

              {/* Turbine Inlet Temperature */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Turbine Inlet Temp (TIT):</span>
                  <span className="font-mono text-teal-400 font-bold">{turbineInletTempC.toFixed(0)} °C</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="800"
                  step="5"
                  value={turbineInletTempC}
                  onChange={e => setTurbineInletTempC(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* High Side Pressure */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">High Side Pressure:</span>
                  <span className="font-mono text-cyan-400 font-bold">{cycleHighPressureBar.toFixed(0)} bar</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="300"
                  step="5"
                  value={cycleHighPressureBar}
                  onChange={e => setCycleHighPressureBar(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Split Ratio */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Recompression Flow Split (γ):</span>
                  <span className="font-mono text-emerald-400 font-bold">{recompressionSplitRatio.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.20"
                  max="0.45"
                  step="0.01"
                  value={recompressionSplitRatio}
                  onChange={e => setRecompressionSplitRatio(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.20 (Pinch hazard)</span>
                  <span className="text-emerald-400">Optimal ~ 0.32</span>
                  <span>0.45</span>
                </div>
              </div>

              {/* Mass Flow Rate */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">sCO2 Mass Flow:</span>
                  <span className="font-mono text-purple-400 font-bold">{cycleMassFlowKgS.toFixed(0)} kg/s</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="50"
                  value={cycleMassFlowKgS}
                  onChange={e => setCycleMassFlowKgS(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <span className="text-teal-400 font-semibold">Heat Capacity Matching:</span> The secondary recompressor compresses { (recompressionSplitRatio * 100).toFixed(0) }% of the flow without cooling, exactly matching the heat capacity rates in the LTR and preventing thermal pinch crossover (ΔT = {rcbcResult.pinchPointDeltaTC} °C).
              </div>
            </div>

            {/* Performance Readouts & Diagrams */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Net Electrical Power</span>
                  <span className="text-2xl font-bold font-mono text-teal-400">
                    {rcbcResult.netElectricalPowerMw.toFixed(1)} <span className="text-xs text-slate-500">MWe</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Turbine: {rcbcResult.turbinePowerMw.toFixed(0)} MW</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Cycle Thermal Efficiency</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {rcbcResult.thermalEfficiencyPct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    +{rcbcResult.efficiencyAdvantagePoints.toFixed(1)}% vs Steam Rankine
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Compressor Burden</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {rcbcResult.totalCompressorPowerMw.toFixed(1)} <span className="text-xs text-slate-500">MW</span>
                  </span>
                  <span className="text-[10px] text-slate-500">MC: {rcbcResult.mainCompressorPowerMw.toFixed(0)} + RC: {rcbcResult.recompressorPowerMw.toFixed(0)}</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">LTR Pinch Point (ΔT)</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {rcbcResult.pinchPointDeltaTC.toFixed(1)} <span className="text-xs text-slate-500">°C</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Safe margin &gt; 5.0 °C</span>
                </div>
              </div>

              {/* Cycle Flow Diagram SVG */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-200">
                  Closed Recompression Brayton Cycle Architecture &amp; Dual Recuperation
                </span>

                <div className="w-full h-44 bg-slate-950/80 rounded-lg p-2 border border-slate-800 relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 540 140" preserveAspectRatio="none">
                    {/* Primary Reactor / Heat Source */}
                    <rect x="20" y="20" width="80" height="40" rx="6" fill="#dc2626" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="60" y="38" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">Heat Source</text>
                    <text x="60" y="50" fill="#fca5a5" fontSize="8" textAnchor="middle">{turbineInletTempC} °C</text>

                    {/* Flow arrow from Heat Source to Turbine */}
                    <line x1="100" y1="40" x2="140" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />

                    {/* Turbine */}
                    <polygon points="140,25 190,15 190,65 140,55" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="165" y="42" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">Turbine</text>

                    {/* Generator */}
                    <rect x="200" y="30" width="40" height="20" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
                    <text x="220" y="43" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">Gen</text>

                    {/* Flow arrow from Turbine to HTR */}
                    <line x1="190" y1="40" x2="260" y2="40" stroke="#f59e0b" strokeWidth="2" />

                    {/* High Temperature Recuperator (HTR) */}
                    <rect x="260" y="20" width="60" height="40" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="290" y="42" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">HTR</text>

                    {/* Flow arrow to LTR */}
                    <line x1="320" y1="40" x2="350" y2="40" stroke="#10b981" strokeWidth="2" />

                    {/* Low Temperature Recuperator (LTR) */}
                    <rect x="350" y="20" width="60" height="40" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
                    <text x="380" y="42" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">LTR</text>

                    {/* Splitter */}
                    <circle cx="430" cy="40" r="4" fill="#06b6d4" />

                    {/* Path A: Gas Cooler -> Main Compressor */}
                    <line x1="430" y1="40" x2="455" y2="40" stroke="#06b6d4" strokeWidth="2" />
                    <rect x="455" y="25" width="40" height="30" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.2" />
                    <text x="475" y="43" fill="#bae6fd" fontSize="7" textAnchor="middle">Cooler</text>

                    <line x1="495" y1="40" x2="510" y2="40" stroke="#06b6d4" strokeWidth="2" />
                    <polygon points="510,50 530,45 530,35 510,30" fill="#06b6d4" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1.2" />
                    <text x="520" y="42" fill="#cffafe" fontSize="7" textAnchor="middle">MC</text>

                    {/* Path B: Recompressor Branch */}
                    <line x1="430" y1="40" x2="430" y2="100" stroke="#a855f7" strokeWidth="2" />
                    <line x1="430" y1="100" x2="380" y2="100" stroke="#a855f7" strokeWidth="2" />
                    <polygon points="380,110 360,105 360,95 380,90" fill="#a855f7" fillOpacity="0.3" stroke="#c084fc" strokeWidth="1.2" />
                    <text x="370" y="103" fill="#f3e8ff" fontSize="7" textAnchor="middle">RC</text>

                    {/* High pressure return path */}
                    <line x1="360" y1="100" x2="60" y2="100" stroke="#10b981" strokeWidth="2" />
                    <line x1="60" y1="100" x2="60" y2="60" stroke="#10b981" strokeWidth="2" />

                    {/* Flow percentage annotations */}
                    <text x="480" y="20" fill="#38bdf8" fontSize="8">{((1 - recompressionSplitRatio) * 100).toFixed(0)}% Flow</text>
                    <text x="410" y="115" fill="#c084fc" fontSize="8">{(recompressionSplitRatio * 100).toFixed(0)}% Recomp</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Mode 3: Direct Oxy-Combustion Allam-Fetvedt Plant */}
      {activeMode === 'ALLAM_OXYCOMBUSTION_PLANT' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Plant Feed Controls */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sliders className="w-4 h-4" />
                Oxy-Fuel Plant Controls
              </div>

              {/* Methane Fuel Feed */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Natural Gas (CH4) Feed:</span>
                  <span className="font-mono text-cyan-400 font-bold">{methaneFeedKgS.toFixed(1)} kg/s</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="20.0"
                  step="0.5"
                  value={methaneFeedKgS}
                  onChange={e => setMethaneFeedKgS(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>2 kg/s (100 MWth)</span>
                  <span className="text-cyan-400 font-semibold">10 kg/s (500 MWth)</span>
                  <span>20 kg/s (1 GWth)</span>
                </div>
              </div>

              {/* Combustor Pressure */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Combustor sCO2 Pressure:</span>
                  <span className="font-mono text-emerald-400 font-bold">{combustorPressureBar.toFixed(0)} bar</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="350"
                  step="10"
                  value={combustorPressureBar}
                  onChange={e => setCombustorPressureBar(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>200 bar</span>
                  <span className="text-emerald-400">300 bar (Optimal)</span>
                  <span>350 bar</span>
                </div>
              </div>

              {/* Chemical Equation Box */}
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">GDPT 2018 Oxy-Combustion Equation</span>
                <div className="font-mono text-xs text-amber-300">
                  CH₄ + 2 O₂ → CO₂ + 2 H₂O
                </div>
                <span className="text-[10px] text-slate-400">
                  ΔH° = -890.3 kJ/mol | 100% Inherent Carbon Capture
                </span>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-cyan-400 font-semibold">Zero-Emissions Architecture:</span> Pure oxygen from the Air Separation Unit (ASU) burns methane directly in a 300 bar sCO2 working fluid. Pure liquid water condenses upon cooling, and excess pure CO2 is exported directly to pipeline at 120 bar without any amine scrubbing!
              </div>
            </div>

            {/* Performance & CCUS Decarbonization Metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Net Electrical Power</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {allamResult.netElectricalPowerMw.toFixed(1)} <span className="text-xs text-slate-500">MWe</span>
                </span>
                <span className="text-[10px] text-slate-500">Thermal: {allamResult.thermalInputLhvMw.toFixed(0)} MWth</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Net LHV Efficiency</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {allamResult.netEfficiencyLhvPct.toFixed(1)}%
                </span>
                <span className="text-[10px] text-emerald-400">Over 58% clean base-load</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Captured CO2</span>
                <span className="text-2xl font-bold font-mono text-teal-400">
                  {(allamResult.co2CapturedTonsYear / 1000).toFixed(0)}k <span className="text-xs text-slate-500">t/yr</span>
                </span>
                <span className="text-[10px] text-teal-400">100% Pipeline-ready</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400">Distilled Water</span>
                <span className="text-2xl font-bold font-mono text-blue-400">
                  {(allamResult.distilledWaterTonsYear / 1000).toFixed(0)}k <span className="text-xs text-slate-500">t/yr</span>
                </span>
                <span className="text-[10px] text-slate-500">Condensate byproduct</span>
              </div>

              {/* Plant Breakdown Cards */}
              <div className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" />
                    Cryogenic Oxygen Demand
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-cyan-300">
                      {allamResult.oxygenDemandKgS.toFixed(1)} kg/s
                    </span>
                    <span className="text-xs text-slate-500">O2 Mass Flow</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    ASU parasitic power: {allamResult.asuPowerConsumptionMw.toFixed(1)} MW
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Avoided CO2 vs CCGT
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {(allamResult.avoidedCo2VsCcgtTonsYear / 1000).toFixed(0)}k t/yr
                    </span>
                    <span className="text-xs text-emerald-500">Displaced Fossil</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Clean electricity: {allamResult.cleanElectricityGwhYear.toFixed(0)} GWh/year
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    Turbomachinery Compactness
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-mono font-bold text-purple-400">
                      &gt; 90%
                    </span>
                    <span className="text-xs text-purple-500">Footprint Reduction</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Dense sCO2 eliminates colossal low-pressure steam turbines
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
