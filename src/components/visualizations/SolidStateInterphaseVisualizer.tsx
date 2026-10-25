// src/components/visualizations/SolidStateInterphaseVisualizer.tsx
// Interactive Visualizer: Solid-State Battery Cathode Electrolyte Interphase (CEI) & Chemo-Mechanics
// Conforms strictly to IUPAC electrochemistry, Monroe-Newman elasticity criterion, and Vietnam GDPT 2018 Chemistry.

import React, { useState, useMemo } from 'react';
import {
  Battery,
  ShieldCheck,
  Activity,
  Zap,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Flame,
  ShieldAlert
} from 'lucide-react';
import {
  SolidElectrolyteType,
  CathodeActiveMaterialType,
  InterfacialCeiLayerType,
  SOLID_ELECTROLYTE_CATALOG,
  CATHODE_MATERIAL_CATALOG,
  CEI_LAYER_CATALOG,
  calculateInterfacialStability,
  calculateChemoMechanicalStress,
  simulateCapacityRetentionCycles,
  calculateSolidStateFullCellMetrics
} from '../../domain/solidStateInterphaseMechanicsEngine';
import { sound } from '../../audio/soundEngine';

type SolidStateTabMode =
  | 'INTERFACIAL_STABILITY_AND_CEI'
  | 'CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES'
  | 'CYCLE_RETENTION_AND_PACK_METRICS';

export const SolidStateInterphaseVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SolidStateTabMode>('INTERFACIAL_STABILITY_AND_CEI');

  // Interactive controls
  const [selectedSe, setSelectedSe] = useState<SolidElectrolyteType>('LGPS_SULFIDE');
  const [selectedCathode, setSelectedCathode] = useState<CathodeActiveMaterialType>('NMC_811');
  const [selectedCei, setSelectedCei] = useState<InterfacialCeiLayerType>('LITHIUM_NIOBATE_LINBO3');

  const [chargeVoltageV, setChargeVoltageV] = useState<number>(4.30);
  const [stackPressureMpa, setStackPressureMpa] = useState<number>(5.0);
  const [arealCapacityMahCm2, setArealCapacityMahCm2] = useState<number>(4.0);

  const seConfig = SOLID_ELECTROLYTE_CATALOG[selectedSe];
  const cathodeConfig = CATHODE_MATERIAL_CATALOG[selectedCathode];
  const ceiConfig = CEI_LAYER_CATALOG[selectedCei];

  // Interfacial stability calculation
  const stabilityResult = useMemo(() => {
    return calculateInterfacialStability(seConfig, cathodeConfig, ceiConfig, chargeVoltageV);
  }, [seConfig, cathodeConfig, ceiConfig, chargeVoltageV]);

  // Chemo-mechanical stress calculation
  const mechanicsResult = useMemo(() => {
    return calculateChemoMechanicalStress(seConfig, cathodeConfig, stackPressureMpa);
  }, [seConfig, cathodeConfig, stackPressureMpa]);

  // 1,000-cycle retention simulation
  const cycleData = useMemo(() => {
    return simulateCapacityRetentionCycles(stabilityResult, mechanicsResult, 1000);
  }, [stabilityResult, mechanicsResult]);

  const latestCycle = cycleData[cycleData.length - 1];

  // Full-cell pack metrics
  const packMetrics = useMemo(() => {
    return calculateSolidStateFullCellMetrics(seConfig, cathodeConfig, arealCapacityMahCm2);
  }, [seConfig, cathodeConfig, arealCapacityMahCm2]);

  return (
    <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-xl text-amber-400 shadow-inner">
              <Battery className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Solid-State Battery CEI & Halide/Sulfide Chemo-Mechanics
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                  {packMetrics.cellGravimetricEnergyDensityWhKg} Wh/kg | {packMetrics.cellVolumetricEnergyDensityWhL} Wh/L
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Cathode-Electrolyte Interphase (CEI), Space-Charge Passivation & Monroe-Newman Chemo-Mechanical Dynamics
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('INTERFACIAL_STABILITY_AND_CEI');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'INTERFACIAL_STABILITY_AND_CEI'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            CEI & Stability
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Stack Pressure & CCD
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CYCLE_RETENTION_AND_PACK_METRICS');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CYCLE_RETENTION_AND_PACK_METRICS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            1000-Cycle Retention
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Interactive Configuration */}
        <div className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Solid-State Architecture Parameters
          </h3>

          {/* Solid Electrolyte Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Solid Electrolyte Chemistry</label>
            <select
              value={selectedSe}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedSe(e.target.value as SolidElectrolyteType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-400"
            >
              {Object.values(SOLID_ELECTROLYTE_CATALOG).map((se) => (
                <option key={se.id} value={se.id}>
                  {se.name} ({se.chemicalFormula}) — {se.roomTempIonicConductivityMscm} mS/cm
                </option>
              ))}
            </select>
          </div>

          {/* Cathode Material Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Cathode Active Material</label>
            <select
              value={selectedCathode}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedCathode(e.target.value as CathodeActiveMaterialType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-sky-200 focus:outline-none focus:border-sky-400"
            >
              {Object.values(CATHODE_MATERIAL_CATALOG).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} — {cat.specificCapacityMahG} mAh/g (Max {cat.maxChargeVoltageV} V)
                </option>
              ))}
            </select>
          </div>

          {/* CEI Protective Coating Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Cathode/SE Protective Buffer (CEI)</label>
            <select
              value={selectedCei}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedCei(e.target.value as InterfacialCeiLayerType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-emerald-200 focus:outline-none focus:border-emerald-400"
            >
              {Object.values(CEI_LAYER_CATALOG).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.interfacialDecompositionSuppressionPct}% suppression)
                </option>
              ))}
            </select>
          </div>

          {/* Charge Cutoff Voltage Slider */}
          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Charge Cutoff Voltage</span>
              <span className="font-mono text-amber-300 font-bold">{chargeVoltageV.toFixed(2)} V vs Li/Li⁺</span>
            </div>
            <input
              type="range"
              min={3.8}
              max={4.9}
              step={0.05}
              value={chargeVoltageV}
              onChange={(e) => setChargeVoltageV(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>3.80 V</span>
              <span>Stability Limit: {seConfig.electrochemicalStabilityWindowMaxV} V</span>
              <span>4.90 V</span>
            </div>
          </div>

          {/* External Stack Pressure Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">External Stack Pressure</span>
              <span className="font-mono text-emerald-300 font-bold">{stackPressureMpa.toFixed(1)} MPa</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={10.0}
              step={0.1}
              value={stackPressureMpa}
              onChange={(e) => setStackPressureMpa(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>0.1 MPa (Free)</span>
              <span>3-5 MPa (Recommended)</span>
              <span>10 MPa</span>
            </div>
          </div>

          {/* Areal Capacity Target */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Cathode Areal Loading</span>
              <span className="font-mono text-cyan-300 font-bold">{arealCapacityMahCm2.toFixed(1)} mAh/cm²</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={6.0}
              step={0.5}
              value={arealCapacityMahCm2}
              onChange={(e) => setArealCapacityMahCm2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Quick Reset */}
          <button
            onClick={() => {
              sound.playUiClick();
              setSelectedSe('LGPS_SULFIDE');
              setSelectedCathode('NMC_811');
              setSelectedCei('LITHIUM_NIOBATE_LINBO3');
              setChargeVoltageV(4.30);
              setStackPressureMpa(5.0);
              setArealCapacityMahCm2(4.0);
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Standard High-Energy Benchmark
          </button>
        </div>

        {/* Center & Right Columns: Dynamic Visualizations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Interfacial Resistance</div>
              <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">
                {stabilityResult.interfacialArealResistanceOhmCm2} <span className="text-xs font-normal">Ω·cm²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                SCL: {stabilityResult.spaceChargeLayerThicknessNm} nm
              </div>
            </div>

            <div className="bg-slate-800/60 border border-emerald-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Contact Area Retention</div>
              <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">
                {mechanicsResult.contactAreaRetentionPct}%
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Stress: {mechanicsResult.interfacialVonMisesStressMpa} MPa
              </div>
            </div>

            <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Critical Plating CCD</div>
              <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                {mechanicsResult.criticalPlatingCurrentDensityMacm2} <span className="text-xs font-normal">mA/cm²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Strip: {mechanicsResult.criticalStrippingCurrentDensityMacm2} mA/cm²
              </div>
            </div>

            <div className="bg-slate-800/60 border border-orange-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Thermal Safety Onset</div>
              <div className="text-lg font-bold text-orange-400 font-mono mt-0.5 flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                {packMetrics.thermalRunawayOnsetTempCelsius}°C
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Liquid Li-ion: 130°C
              </div>
            </div>
          </div>

          {/* TAB 1: CEI INTERFACIAL STABILITY & DECOMPOSITION */}
          {activeMode === 'INTERFACIAL_STABILITY_AND_CEI' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  High-Voltage Cathode/Electrolyte Interphase Microstructure
                </h4>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    stabilityResult.passivationQuality === 'EXCELLENT_PINHOLE_FREE'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : stabilityResult.passivationQuality === 'MODERATE_GROWING_PASSIVATION'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {stabilityResult.passivationQuality.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Interphase Microstructure Layer Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                {/* Layer 1: Cathode Particle */}
                <div className="p-3 bg-sky-950/30 border border-sky-500/30 rounded-lg flex flex-col justify-between">
                  <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    Cathode Active Particle
                  </div>
                  <div className="my-2">
                    <div className="text-sm font-mono text-white font-bold">{cathodeConfig.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Delithiation Shrinkage: <strong className="text-sky-300">-{cathodeConfig.volumeShrinkageDelithiationPct}%</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    High chemical potential μ(Li) ≈ 4.3 V
                  </div>
                </div>

                {/* Layer 2: CEI Coating Buffer */}
                <div
                  className={`p-3 rounded-lg border flex flex-col justify-between ${
                    ceiConfig.id === 'BARE_UNCOATED'
                      ? 'bg-red-950/20 border-red-500/40 text-red-300'
                      : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    CEI Protective Interphase
                  </div>
                  <div className="my-2">
                    <div className="text-sm font-mono font-bold text-white">{ceiConfig.name}</div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Thickness: <strong className="text-amber-300">{ceiConfig.thicknessNm} nm</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Suppression: <strong>{ceiConfig.interfacialDecompositionSuppressionPct}%</strong> oxidation barrier
                  </div>
                </div>

                {/* Layer 3: Solid Electrolyte */}
                <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg flex flex-col justify-between">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Solid Electrolyte Bulk
                  </div>
                  <div className="my-2">
                    <div className="text-sm font-mono text-white font-bold">{seConfig.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      σ_i: <strong className="text-amber-300">{seConfig.roomTempIonicConductivityMscm} mS/cm</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Stability Window: {seConfig.electrochemicalStabilityWindowMinV} - {seConfig.electrochemicalStabilityWindowMaxV} V
                  </div>
                </div>
              </div>

              {/* Chemical Decomposition Analysis */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Decomposition Overpotential (ΔV above stability window):</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {stabilityResult.overpotentialDecompositionV > 0
                      ? `+${stabilityResult.overpotentialDecompositionV} V (Oxidative Driving Force)`
                      : '0.00 V (Thermodynamically Stable)'}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Dominant Interfacial Phases Formed:
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stabilityResult.dominantDecompositionProducts.map((prod, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 border border-slate-700 text-slate-200"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHEMO-MECHANICAL PRESSURE & DENDRITES */}
          {activeMode === 'CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  Chemo-Mechanical Contact & Dendrite Propagation Mechanics
                </h4>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    mechanicsResult.dendriteSuppressionStatus === 'SAFE_DENDRITE_FREE'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : mechanicsResult.dendriteSuppressionStatus === 'GRAIN_BOUNDARY_SHORTING_RISK'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {mechanicsResult.dendriteSuppressionStatus.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Physical Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Monroe-Newman Elasticity Criterion
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lithium Shear Modulus (G_Li):</span>
                      <span className="font-mono font-bold">3.4 GPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monroe-Newman Threshold (2 × G_Li):</span>
                      <span className="font-mono text-emerald-400 font-bold">6.8 GPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Solid Electrolyte Modulus (G_SE):</span>
                      <span className="font-mono text-cyan-300 font-bold">{seConfig.shearModulusGpa} GPa</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                    {seConfig.shearModulusGpa > 6.8
                      ? '✓ Mechanically satisfies Monroe-Newman criterion to suppress direct lithium creep.'
                      : '⚠ Low shear modulus allows localized lithium protrusion into micro-cracks.'}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Cathode Breathing & Contact Retention
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Applied Stack Pressure:</span>
                      <span className="font-mono font-bold">{stackPressureMpa} MPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Solid-Solid Contact:</span>
                      <span className="font-mono text-emerald-400 font-bold">{mechanicsResult.contactAreaRetentionPct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Interfacial Von Mises Stress:</span>
                      <span className="font-mono text-amber-400 font-bold">{mechanicsResult.interfacialVonMisesStressMpa} MPa</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                    {stackPressureMpa >= 3.0
                      ? '✓ High stack pressure maintains intimate contact during cathode delithiation shrinkage.'
                      : '⚠ Insufficient pressure leads to interfacial void accumulation and fast capacity fade.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 1,000-CYCLE RETENTION & PACK METRICS */}
          {activeMode === 'CYCLE_RETENTION_AND_PACK_METRICS' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  1,000-Cycle Extended Durability & Full-Cell Pack Comparison
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  1,000th Cycle: {latestCycle.capacityRetentionPct}% Retention
                </span>
              </div>

              {/* SVG Cycle Retention Curve */}
              <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 240">
                  <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                  <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Cycle Number</text>
                  <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Retention (%)</text>
                  <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                  <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">250</text>
                  <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">500</text>
                  <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">750</text>
                  <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">1000</text>

                  {/* 80% Retention Industry Benchmark Line */}
                  <line x1="50" y1="68" x2="480" y2="68" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
                  <text x="45" y="71" fill="#34d399" fontSize="9" textAnchor="end">80%</text>

                  {/* Capacity Retention Path */}
                  {(() => {
                    const pathD = cycleData
                      .map((pt, i) => {
                        const x = 50 + (pt.cycleNumber / 1000) * 430;
                        const y = 200 - ((pt.capacityRetentionPct - 40.0) / 60.0) * 165;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ');
                    return <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" />;
                  })()}
                </svg>
              </div>

              {/* Legend & Benchmarking */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" /> Capacity Retention (%)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-0.5 bg-emerald-400 border-b border-dashed inline-block" /> 80% Automotive EOL Benchmark
                </span>
                <span className="text-slate-400">
                  Coulombic Efficiency: <strong className="text-white">{latestCycle.coulombicEfficiencyPct}%</strong>
                </span>
              </div>

              {/* Side-by-Side Cell Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-emerald-300">Solid-State Battery (This Configuration)</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>Gravimetric Energy: <strong className="text-white font-mono">{packMetrics.cellGravimetricEnergyDensityWhKg} Wh/kg</strong> (+45% vs liquid)</div>
                    <div>Volumetric Energy: <strong className="text-white font-mono">{packMetrics.cellVolumetricEnergyDensityWhL} Wh/L</strong> (+52% vs liquid)</div>
                    <div>Thermal Runaway: <strong className="text-emerald-400 font-mono">{packMetrics.thermalRunawayOnsetTempCelsius}°C</strong> (Non-flammable)</div>
                    <div>Displaced Toxic Solvents: <strong className="text-emerald-300 font-mono">{packMetrics.avoidedToxicSolventsGPerKwh} g/kWh</strong></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-slate-400">Conventional Liquid Li-Ion (State of the Art)</div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Gravimetric Energy: <span className="text-slate-300 font-mono">265.0 Wh/kg</span></div>
                    <div>Volumetric Energy: <span className="text-slate-300 font-mono">700.0 Wh/L</span></div>
                    <div>Thermal Runaway: <span className="text-red-400 font-mono">130°C</span> (Flammable electrolyte fire risk)</div>
                    <div>Solvent Toxicity: <span className="text-amber-400 font-mono">Flammable EC/DMC/EMC carbonates</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
