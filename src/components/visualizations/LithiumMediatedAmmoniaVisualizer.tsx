// src/components/visualizations/LithiumMediatedAmmoniaVisualizer.tsx
// Interactive Visualizer: Lithium-Mediated Electrochemical Nitrogen Reduction (Li-NRR) & Green Ammonia Synthesis
// Conforms to: IUPAC Electrochemical Standards, Solid Electrolyte Interphase (SEI) Science & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Layers,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Droplets,
  ArrowRight,
  Gauge,
  Sliders,
  Atom,
  Wind
} from 'lucide-react';
import {
  NonAqueousSolventType,
  ProtonShuttleAlcoholType,
  SeiAdditiveEngineType,
  SOLVENT_CATALOG,
  PROTON_SHUTTLE_CATALOG,
  SEI_ADDITIVE_CATALOG,
  calculateLiNrrOperatingPoint,
  calculateAmmoniaPlantBalance
} from '../../domain/lithiumMediatedAmmoniaEngine';
import { sound } from '../../audio/soundEngine';

type LiNrrTabMode =
  | 'ELECTROCHEMICAL_CELL_AND_CYCLE'
  | 'PLANT_SCALE_AMMONIA_SIMULATOR'
  | 'SEI_ENGINEERING_AND_SELECTIVITY';

export const LithiumMediatedAmmoniaVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LiNrrTabMode>('ELECTROCHEMICAL_CELL_AND_CYCLE');

  // Controls
  const [selectedSolvent, setSelectedSolvent] = useState<NonAqueousSolventType>('CYCLOPENTYL_METHYL_ETHER_CPME');
  const [selectedShuttle, setSelectedShuttle] = useState<ProtonShuttleAlcoholType>('ETHANOL_ETOH');
  const [selectedSei, setSelectedSei] = useState<SeiAdditiveEngineType>('OXYGEN_GAS_DOPING_1VOL');

  const [appliedVoltageV, setAppliedVoltageV] = useState<number>(3.8);
  const [n2PressureBar, setN2PressureBar] = useState<number>(20.0);
  const [shuttleConcentrationVolPct, setShuttleConcentrationVolPct] = useState<number>(0.8);
  const [stackAreaM2, setStackAreaM2] = useState<number>(200);

  const solventConfig = SOLVENT_CATALOG[selectedSolvent];
  const shuttleConfig = PROTON_SHUTTLE_CATALOG[selectedShuttle];
  const seiConfig = SEI_ADDITIVE_CATALOG[selectedSei];

  // Solved operating point
  const operatingPoint = useMemo(() => {
    return calculateLiNrrOperatingPoint(
      solventConfig,
      shuttleConfig,
      seiConfig,
      appliedVoltageV,
      n2PressureBar,
      shuttleConcentrationVolPct,
      25
    );
  }, [solventConfig, shuttleConfig, seiConfig, appliedVoltageV, n2PressureBar, shuttleConcentrationVolPct]);

  // Solved plant mass & energy balance
  const plantBalance = useMemo(() => {
    return calculateAmmoniaPlantBalance(operatingPoint, stackAreaM2, 8000, 800);
  }, [operatingPoint, stackAreaM2]);

  return (
    <div className="w-full bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-teal-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-400/40 rounded-xl text-teal-400 shadow-inner">
              <Atom className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Lithium-Mediated Ammonia Synthesis (Li-NRR)
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono">
                  FE: {operatingPoint.faradaicEfficiencyPct}%
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Ambient Electrochemical N₂ Cleavage, SEI Proton Barrier & Zero-Carbon Fertilizer Hub
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ELECTROCHEMICAL_CELL_AND_CYCLE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'ELECTROCHEMICAL_CELL_AND_CYCLE'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Li-NRR Catalytic Cycle
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PLANT_SCALE_AMMONIA_SIMULATOR');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PLANT_SCALE_AMMONIA_SIMULATOR'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Green NH₃ Plant
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('SEI_ENGINEERING_AND_SELECTIVITY');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SEI_ENGINEERING_AND_SELECTIVITY'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            SEI Proton Shielding
          </button>
        </div>
      </div>

      {/* Global Configuration Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-teal-400" /> Non-Aqueous Solvent
          </label>
          <select
            value={selectedSolvent}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedSolvent(e.target.value as NonAqueousSolventType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {Object.values(SOLVENT_CATALOG).map((sol) => (
              <option key={sol.id} value={sol.id}>
                {sol.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Proton Shuttle Alcohol
          </label>
          <select
            value={selectedShuttle}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedShuttle(e.target.value as ProtonShuttleAlcoholType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {Object.values(PROTON_SHUTTLE_CATALOG).map((shut) => (
              <option key={shut.id} value={shut.id}>
                {shut.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SEI Passivation Additive
          </label>
          <select
            value={selectedSei}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedSei(e.target.value as SeiAdditiveEngineType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            {Object.values(SEI_ADDITIVE_CATALOG).map((sei) => (
              <option key={sei.id} value={sei.id}>
                {sei.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">N₂ Pressure & Voltage:</span>
            <span className="text-teal-400 font-mono">{n2PressureBar} bar | {appliedVoltageV} V</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={n2PressureBar}
            onChange={(e) => setN2PressureBar(Number(e.target.value))}
            className="w-full accent-teal-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Shuttle conc:</span>
            <span className="text-cyan-400 font-mono">{shuttleConcentrationVolPct}%</span>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={shuttleConcentrationVolPct}
              onChange={(e) => setShuttleConcentrationVolPct(Number(e.target.value))}
              className="w-24 accent-cyan-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Faradaic Efficiency (FE)
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300 mt-1">
            {operatingPoint.faradaicEfficiencyPct}%
          </div>
          <div className="text-[11px] text-slate-500">
            HER Parasitic: {(100 - operatingPoint.faradaicEfficiencyPct).toFixed(1)}%
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Ammonia Yield Rate
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            {operatingPoint.ammoniaYieldRateNmolPerSCm2} nmol/(s·cm²)
          </div>
          <div className="text-[11px] text-slate-500">Current: {operatingPoint.currentDensityMaPerCm2} mA/cm²</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Specific Energy Consumed
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {operatingPoint.specificEnergyConsumptionKwhPerKgNh3} kWh/kg
          </div>
          <div className="text-[11px] text-slate-500">Haber-Bosch equiv: ~10-12 kWh/kg (fossil)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Operating Regime
          </div>
          <div className="text-sm font-bold font-mono text-emerald-300 mt-2 truncate">
            {operatingPoint.limitingMechanism}
          </div>
          <div className="text-[11px] text-slate-500">
            {operatingPoint.isContinuousOperationStable ? '✓ Stable continuous run' : '⚠ High degradation risk'}
          </div>
        </div>
      </div>

      {/* MODE 1: LI-NRR CATALYTIC CYCLE */}
      {activeMode === 'ELECTROCHEMICAL_CELL_AND_CYCLE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Catalytic Cycle Diagram */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Atom className="w-4 h-4" /> 4-Step Lithium-Mediated Catalytic Loop
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Metallic lithium spontaneously cleaves the 945 kJ/mol N≡N bond at room temperature to form Li₃N, which is then protonated by alcohol to release ammonia.
              </p>
            </div>

            {/* SVG Catalytic Flowsheet */}
            <div className="relative w-full h-72 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 540 260">
                {/* Central Cycle Loop */}
                <circle cx="270" cy="130" r="85" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />

                {/* Step 1: Li+ -> Li0 */}
                <g>
                  <rect x="220" y="15" width="100" height="42" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1.5" />
                  <text x="270" y="32" fill="#ccfbf1" fontSize="10" textAnchor="middle" fontWeight="bold">Step 1: Li Deposition</text>
                  <text x="270" y="47" fill="#5eead4" fontSize="9" textAnchor="middle" fontFamily="monospace">Li⁺ + e⁻ → Li⁰</text>
                </g>

                {/* Step 2: N2 activation to Li3N */}
                <g>
                  <rect x="390" y="105" width="125" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="452" y="123" fill="#e0f2fe" fontSize="10" textAnchor="middle" fontWeight="bold">Step 2: N₂ Cleavage</text>
                  <text x="452" y="137" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace">6 Li⁰ + N₂ → 2 Li₃N</text>
                  <text x="452" y="148" fill="#94a3b8" fontSize="8" textAnchor="middle">(N≡N Dissociation)</text>
                </g>

                {/* Step 3: Protonation to NH3 */}
                <g>
                  <rect x="210" y="195" width="120" height="50" rx="8" fill="#134e4a" stroke="#34d399" strokeWidth="1.5" />
                  <text x="270" y="213" fill="#d1fae5" fontSize="10" textAnchor="middle" fontWeight="bold">Step 3: Protonation</text>
                  <text x="270" y="227" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontFamily="monospace">Li₃N + 3 ROH → 3 LiOR + NH₃↑</text>
                  <text x="270" y="238" fill="#a7f3d0" fontSize="8" textAnchor="middle" fontWeight="bold">Pure NH₃ Gas Released</text>
                </g>

                {/* Step 4: Regeneration of Shuttle */}
                <g>
                  <rect x="25" y="105" width="125" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="87" y="123" fill="#fef3c7" fontSize="10" textAnchor="middle" fontWeight="bold">Step 4: Regeneration</text>
                  <text x="87" y="137" fill="#fcd34d" fontSize="9" textAnchor="middle" fontFamily="monospace">H₂ Anode Oxidation</text>
                  <text x="87" y="148" fill="#fde68a" fontSize="8" textAnchor="middle">LiOR + H⁺ → Li⁺ + ROH</text>
                </g>

                {/* Connecting Directional Arrows */}
                <path d="M 320 36 Q 440 40 450 100" fill="none" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 452 160 Q 440 220 335 220" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 210 220 Q 90 220 87 160" fill="none" stroke="#34d399" strokeWidth="2" />
                <path d="M 87 100 Q 90 36 215 36" fill="none" stroke="#f59e0b" strokeWidth="2" />

                {/* Center Badge */}
                <circle cx="270" cy="130" r="32" fill="#0f172a" stroke="#0d9488" strokeWidth="1.5" />
                <text x="270" y="128" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">FE: {operatingPoint.faradaicEfficiencyPct}%</text>
                <text x="270" y="140" fill="#94a3b8" fontSize="8" textAnchor="middle">{appliedVoltageV}V / {n2PressureBar}bar</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span>Solvent: <strong className="text-teal-300">{solventConfig.name}</strong></span>
              <span>Proton Donor: <strong className="text-cyan-300">{shuttleConfig.chemicalFormula}</strong></span>
              <span>SEI Barrier: <strong className="text-emerald-300">{seiConfig.seiCompositionPrimary}</strong></span>
            </div>
          </div>

          {/* Right: Voltage & Kinetic Barrier Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Thermodynamic & Kinetic Potentials
              </span>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Li/Li⁺ Standard Potential:</span>
                  <span className="font-mono text-teal-300">-3.04 V vs SHE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">N₂/Li₃N Chemical ΔG°:</span>
                  <span className="font-mono text-cyan-300">-128.6 kJ/mol (Spontaneous)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Applied Stack Cell Voltage:</span>
                  <span className="font-mono text-amber-400">{appliedVoltageV} V</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Shuttle pKa in Solvent:</span>
                  <span className="font-mono text-slate-300">{shuttleConfig.pKaInSolvent}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-emerald-400">Parasitic HER Suppression:</span>
                  <span className="font-mono text-emerald-300">{seiConfig.parasiticHerSuppressionFactor}×</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Atom className="w-4 h-4 text-cyan-400" /> Vietnam GDPT 2018 Connection
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Chương trình Hóa học 11 & 12:</strong> Khí Nitơ trơ ở điều kiện thường do liên kết ba N≡N rất bền (năng lượng liên kết 945 kJ/mol). Phương pháp khử nitơ bằng liti là minh chứng sinh động cho việc sử dụng kim loại kiềm có tính khử cực mạnh (E° = -3,04 V) để bẻ gãy liên kết ba N≡N mà không cần điều kiện khắc nghiệt của quy trình Haber-Bosch.
                </p>
              </div>
              <div className="text-[11px] text-teal-400 bg-teal-500/10 p-2 rounded border border-teal-500/20 mt-2">
                ✓ Phản ứng: 6 Li + N₂ → 2 Li₃N; Li₃N + 3 C₂H₅OH → 3 C₂H₅OLi + NH₃↑
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: GREEN NH3 PLANT */}
      {activeMode === 'PLANT_SCALE_AMMONIA_SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Plant Scale Controls */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Factory className="w-4 h-4" /> Modular Electrochemical NH₃ Plant
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Scalable zero-carbon ammonia production module for agricultural fertilizer and maritime green hydrogen fuel storage.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Electrolysis Stack Active Area:</span>
                    <span className="text-teal-400 font-mono font-bold">{stackAreaM2} m²</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="20"
                    value={stackAreaM2}
                    onChange={(e) => setStackAreaM2(Number(e.target.value))}
                    className="w-full accent-teal-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Total Stack Current:</span>
                    <span className="text-base font-bold font-mono text-teal-300">
                      {plantBalance.operatingCurrentA.toLocaleString()} A
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Electric Power Demand:</span>
                    <span className="text-base font-bold font-mono text-amber-300">
                      {plantBalance.electricPowerConsumptionKw} kW
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">N₂ Feed Flowrate:</span>
                    <span className="text-base font-bold font-mono text-cyan-300">
                      {plantBalance.nitrogenFeedRateKgPerHour} kg/hr
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Anodic H₂ Feed:</span>
                    <span className="text-base font-bold font-mono text-emerald-300">
                      {plantBalance.hydrogenAnodicFeedKgPerHour} kg/hr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Yield Display */}
            <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Clean Ammonia Output:</span>
                <span className="text-2xl font-bold font-mono text-teal-300">
                  {plantBalance.ammoniaProductionKgPerHour} kg/hr
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Vented Parasitic H₂:</span>
                <span className="text-sm font-mono text-slate-400">
                  {plantBalance.parasiticHydrogenVentedKgPerHour} kg/hr
                </span>
              </div>
            </div>
          </div>

          {/* Right: Annual Techno-Economics & Decarbonization */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Annual Economics & CO₂ Abatement
              </span>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Annual Green NH₃ Output:</span>
                  <span className="text-2xl font-bold font-mono text-teal-400">
                    {plantBalance.annualAmmoniaProductionTonsPerYear} tons/yr
                  </span>
                  <span className="text-[10px] text-slate-500">at 8,000 operating hrs/yr</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Avoided Fossil CO₂ Emissions:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {plantBalance.annualAvoidedCo2TonsPerYear} tons CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">vs Haber-Bosch (1.8 t CO2/t NH3)</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-teal-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-medium">Estimated Annual Revenue:</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">
                    ${plantBalance.annualRevenueUsd.toLocaleString()} / year
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Based on benchmark $800/ton green premium ammonia price index.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Zero-Carbon Hydrogen Carrier:</strong> NH₃ chứa 17,8% hydro theo khối lượng, hóa lỏng dễ dàng ở -33°C hoặc áp suất 8,6 bar ở 20°C, vượt trội hơn hydro lỏng (-253°C) trong vận chuyển đường biển và lưu trữ năng lượng theo mùa.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SEI PROTON SHIELDING */}
      {activeMode === 'SEI_ENGINEERING_AND_SELECTIVITY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: SEI Additive Matrix */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SEI Layer Architecture & Proton Exclusion
              </span>
              <p className="text-xs text-slate-400 mb-4">
                The Solid Electrolyte Interphase (SEI) on the cathode must selectively allow Li⁺ ion transport and N₂ gas dissolution while blocking free alcohol proton donors from attacking metallic Li.
              </p>

              <div className="space-y-3">
                {Object.values(SEI_ADDITIVE_CATALOG).map((sei) => (
                  <div
                    key={sei.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedSei(sei.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedSei === sei.id
                        ? 'bg-teal-950/40 border-teal-500 shadow-md shadow-teal-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {selectedSei === sei.id && <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />}
                        {sei.name}
                      </span>
                      <span className="text-teal-400 font-mono">HER Suppression: {sei.parasiticHerSuppressionFactor}×</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{sei.description}</div>
                    <div className="flex gap-4 text-[10px] text-slate-500 mt-2 font-mono">
                      <span>Composition: {sei.seiCompositionPrimary}</span>
                      <span>Stability: {sei.cycleStabilityHours} hrs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Selected SEI: <strong className="text-teal-300">{seiConfig.name}</strong></span>
              <span>Stability Envelope: <strong className="text-emerald-300">{seiConfig.cycleStabilityHours} Hours</strong></span>
            </div>
          </div>

          {/* Right: Faradaic Efficiency Breakdown Comparison */}
          <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" /> Faradaic Selectivity Breakdown
              </span>

              {/* Progress bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-teal-300 font-semibold">Green NH₃ Selectivity (FE):</span>
                    <span className="text-teal-300 font-mono font-bold">{operatingPoint.faradaicEfficiencyPct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${operatingPoint.faradaicEfficiencyPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Parasitic H₂ Evolution:</span>
                    <span className="text-slate-400 font-mono font-bold">
                      {(100 - operatingPoint.faradaicEfficiencyPct).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${100 - operatingPoint.faradaicEfficiencyPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Microscopic transport mechanism diagram */}
              <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200 mb-2">Microscopic SEI Transport Barrier</div>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
                    <span>Li⁺ Ion Conduction: {seiConfig.liIonConductivitySPerCm.toExponential(1)} S/cm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                    <span>N₂ Gas Permeability: Permitted across porous nanodomains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span>Alcohol Proton Block: Excluded via dense Li₂O/LiF electrostatic barrier</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Scientific Impact:</strong> Doping with 0.5-1.0% O₂ gas forms an in-situ Li₂O SEI that suppresses parasitic proton reduction, elevating Faradaic efficiency from 20% to nearly 80%.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LithiumMediatedAmmoniaVisualizer;
