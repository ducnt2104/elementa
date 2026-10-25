// src/components/visualizations/BioConcreteMineralizationVisualizer.tsx
// Interactive Visualizer: Biochemical Carbon-Negative Bio-Concrete & Microbial Carbonate Precipitation (MICP)
// Conforms to: ASTM C39 Compressive Strength Standards, IUPAC Crystal Growth Kinetics, Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Activity,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Droplets,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import {
  MicpBacterialSpecies,
  AggregateMatrixType,
  MineralizationPathwayType,
  BACTERIAL_CULTURE_CATALOG,
  AGGREGATE_CATALOG,
  MINERALIZATION_PATHWAY_CATALOG,
  calculateMicpCuringKinetics,
  simulateCrackSelfHealing,
  calculateBioConcreteLcaBalance
} from '../../domain/bioConcreteMineralizationEngine';
import { sound } from '../../audio/soundEngine';

type BioConcreteTabMode =
  | 'MICP_MINERALIZATION_KINETICS'
  | 'CRACK_SELF_HEALING_SIMULATOR'
  | 'CARBON_NEGATIVE_LCA_BALANCE';

export const BioConcreteMineralizationVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<BioConcreteTabMode>('MICP_MINERALIZATION_KINETICS');

  // Controls
  const [selectedBacterium, setSelectedBacterium] = useState<MicpBacterialSpecies>('SPOROSARCINA_PASTEURII');
  const [selectedAggregate, setSelectedAggregate] = useState<AggregateMatrixType>('DESERT_DUNE_SAND_FINE');
  const [selectedPathway, setSelectedPathway] = useState<MineralizationPathwayType>('UREOLYSIS_INDUCED_CALCITE');

  const [curingDurationHours, setCuringDurationHours] = useState<number>(72);
  const [calciteTargetWtPct, setCalciteTargetWtPct] = useState<number>(15.0);
  const [initialCrackWidthMm, setInitialCrackWidthMm] = useState<number>(0.60);
  const [productionVolumeM3, setProductionVolumeM3] = useState<number>(100);

  const bacteriumConfig = BACTERIAL_CULTURE_CATALOG[selectedBacterium];
  const aggregateConfig = AGGREGATE_CATALOG[selectedAggregate];
  const pathwayConfig = MINERALIZATION_PATHWAY_CATALOG[selectedPathway];

  // Curing kinetics
  const kineticsPoints = useMemo(() => {
    return calculateMicpCuringKinetics(
      bacteriumConfig,
      aggregateConfig,
      pathwayConfig,
      curingDurationHours,
      0.50,
      calciteTargetWtPct
    );
  }, [bacteriumConfig, aggregateConfig, pathwayConfig, curingDurationHours, calciteTargetWtPct]);

  const latestKinetics = kineticsPoints[kineticsPoints.length - 1];

  // Crack self-healing
  const healingPoints = useMemo(() => {
    return simulateCrackSelfHealing(initialCrackWidthMm, 0.95, 28);
  }, [initialCrackWidthMm]);

  const latestHealing = healingPoints[healingPoints.length - 1];

  // Life-cycle assessment balance
  const lcaBalance = useMemo(() => {
    return calculateBioConcreteLcaBalance(
      bacteriumConfig,
      aggregateConfig,
      pathwayConfig,
      productionVolumeM3,
      calciteTargetWtPct
    );
  }, [bacteriumConfig, aggregateConfig, pathwayConfig, productionVolumeM3, calciteTargetWtPct]);

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 rounded-xl text-emerald-400 shadow-inner">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Biochemical Carbon-Negative Concrete (MICP) Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">
                  {lcaBalance.structuralGradeClassification} ({lcaBalance.finalStructuralStrengthMpa} MPa)
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Microbial Induced Calcite Precipitation (MICP), Desert Sand Consolidation & Autonomous Crack Healing
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('MICP_MINERALIZATION_KINETICS');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'MICP_MINERALIZATION_KINETICS'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Curing & Strength
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CRACK_SELF_HEALING_SIMULATOR');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CRACK_SELF_HEALING_SIMULATOR'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Crack Self-Healing
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CARBON_NEGATIVE_LCA_BALANCE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CARBON_NEGATIVE_LCA_BALANCE'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Carbon-Negative LCA
          </button>
        </div>
      </div>

      {/* Global Configuration Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-teal-400" /> Bacterial Biomineralizer
          </label>
          <select
            value={selectedBacterium}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedBacterium(e.target.value as MicpBacterialSpecies);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.values(BACTERIAL_CULTURE_CATALOG).map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" /> Aggregate Matrix
          </label>
          <select
            value={selectedAggregate}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedAggregate(e.target.value as AggregateMatrixType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.values(AGGREGATE_CATALOG).map((agg) => (
              <option key={agg.id} value={agg.id}>
                {agg.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Mineralization Pathway
          </label>
          <select
            value={selectedPathway}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedPathway(e.target.value as MineralizationPathwayType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.values(MINERALIZATION_PATHWAY_CATALOG).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Curing Time & Target:</span>
            <span className="text-emerald-400 font-mono">{curingDurationHours}h | {calciteTargetWtPct}% CaCO₃</span>
          </div>
          <input
            type="range"
            min="12"
            max="96"
            step="4"
            value={curingDurationHours}
            onChange={(e) => setCuringDurationHours(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">CaCO₃ target:</span>
            <span className="text-cyan-400 font-mono">{calciteTargetWtPct} wt%</span>
            <input
              type="range"
              min="8"
              max="22"
              step="1"
              value={calciteTargetWtPct}
              onChange={(e) => setCalciteTargetWtPct(Number(e.target.value))}
              className="w-24 accent-cyan-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Compressive Strength (UCS)
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {latestKinetics.unconfinedCompressiveStrengthMpa} MPa
          </div>
          <div className="text-[11px] text-slate-500">Standard ASTM C39: {lcaBalance.structuralGradeClassification}</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Precipitated Calcite
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            {latestKinetics.calcitePrecipitatedWtPct} wt%
          </div>
          <div className="text-[11px] text-slate-500">Urea Hydrolysis: {latestKinetics.ureaHydrolysisPct}%</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            Net Carbon Sequestration
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300 mt-1">
            {lcaBalance.netCarbonDioxideSequestrationTons} tons
          </div>
          <div className="text-[11px] text-slate-500">True Carbon Sink (-{((Math.abs(lcaBalance.netCarbonDioxideSequestrationTons) / productionVolumeM3) * 1000).toFixed(0)} kg CO₂/m³)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Avoided CO₂ vs Portland Cement
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {lcaBalance.avoidedCarbonEmissionsTons} tons
          </div>
          <div className="text-[11px] text-slate-500">Production cost: ${lcaBalance.costPerCubicMeterUsd}/m³</div>
        </div>
      </div>

      {/* MODE 1: CURING & STRENGTH */}
      {activeMode === 'MICP_MINERALIZATION_KINETICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Strength & Calcite Growth SVG Plot */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Biomineralization & Strength Kinetics
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  pH: {latestKinetics.slurryPh} | NH₄⁺: {latestKinetics.residualAmmoniaMmolPerL} mmol/L
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Bacterial urease hydrolyzes urea, shifting local pH to 9.2. Dissolved Ca²⁺ ions bind to negatively charged peptidoglycan cell walls, precipitating rhombohedral calcite crystals that cement loose aggregate grains into high-strength stone.
              </p>
            </div>

            {/* SVG Kinetics Chart */}
            <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Curing Time (Hours)</text>
                <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Strength (MPa)</text>
                <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0h</text>
                <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(curingDurationHours * 0.25).toFixed(0)}h</text>
                <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(curingDurationHours * 0.5).toFixed(0)}h</text>
                <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(curingDurationHours * 0.75).toFixed(0)}h</text>
                <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{curingDurationHours}h</text>

                {/* Reference line for 30 MPa (Structural Concrete) */}
                <line x1="50" y1="85" x2="480" y2="85" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
                <text x="45" y="88" fill="#34d399" fontSize="9" textAnchor="end">30 MPa</text>

                {/* Strength curve (UCS) */}
                {(() => {
                  const maxStrength = 45.0;
                  const pathUcs = kineticsPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.reactionHours / curingDurationHours) * 430;
                      const y = 200 - (pt.unconfinedCompressiveStrengthMpa / maxStrength) * 165;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathUcs} fill="none" stroke="#10b981" strokeWidth="2.5" />;
                })()}

                {/* Calcite precipitated curve */}
                {(() => {
                  const maxCalcite = 25.0;
                  const pathCal = kineticsPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.reactionHours / curingDurationHours) * 430;
                      const y = 200 - (pt.calcitePrecipitatedWtPct / maxCalcite) * 165;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathCal} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 1" />;
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Compressive Strength (UCS MPa)
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-3 h-0.5 bg-sky-400 border-b border-dashed inline-block" /> Calcite Precipitated (wt%)
              </span>
              <span className="text-slate-400">
                Crystal: <strong className="text-white">{pathwayConfig.primaryPrecipitateMineral}</strong>
              </span>
            </div>
          </div>

          {/* Right: Mineral Matrix & Reaction Mechanism */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Microstructural Bonding Matrix
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Aggregate Particle Size:</span>
                  <span className="font-mono text-amber-300">D50 = {aggregateConfig.grainSizeD50Mm} mm</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Initial Packing Porosity:</span>
                  <span className="font-mono text-cyan-300">{(aggregateConfig.porosityFraction * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Bacterial Urease Rate:</span>
                  <span className="font-mono text-emerald-300">{bacteriumConfig.ureaseActivityUPerMl} U/mL</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Zeta Surface Charge:</span>
                  <span className="font-mono text-teal-300">{bacteriumConfig.cellSurfaceZetaPotentialMv} mV (Ca²⁺ Anchor)</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-emerald-400">ASTM C39 Classification:</span>
                  <span className="font-mono text-emerald-300">{lcaBalance.structuralGradeClassification}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Desert Sand Valorization
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Khắc phục khủng hoảng cát xây dựng:</strong> Cát sa mạc (dune sand) hạt tròn mịn (0.15 mm) trước đây không thể dùng cho bê tông xi măng Portland vì làm mất cường độ. Công nghệ MICP sử dụng vi khuẩn làm tâm kết tinh canxi cacbonat, liên kết hoàn hảo các hạt cát sa mạc thành khối đá nhân tạo chịu lực &gt; 30 MPa.
                </p>
              </div>
              <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 mt-2">
                ✓ Phản ứng: CO(NH₂)₂ + 2 H₂O → 2 NH₄⁺ + CO₃²⁻; Ca²⁺ + CO₃²⁻ → CaCO₃↓
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: CRACK SELF-HEALING */}
      {activeMode === 'CRACK_SELF_HEALING_SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Crack Sealing Animation */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bacterial Spore Crack Self-Healing (28 Days)
                </span>
                <span className="text-xs text-emerald-300 font-mono font-bold">
                  Healing: {latestHealing.healingRatioPct}%
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Dormant bacterial endospores (Bacillus pseudofirmus) embedded inside concrete germinate upon crack formation and water ingress, metabolizing nutrients into solid calcite to seal cracks up to 0.85 mm.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Initial Structural Crack Width:</span>
                    <span className="text-amber-400 font-mono font-bold">{initialCrackWidthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={initialCrackWidthMm}
                    onChange={(e) => setInitialCrackWidthMm(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Crack Visual Cross-Section */}
            <div className="mt-4 p-5 bg-slate-900 rounded-xl border border-slate-800 text-center relative overflow-hidden">
              <div className="text-xs font-semibold text-slate-300 mb-3">Concrete Microstructure Cross-Section</div>
              <div className="relative w-full h-28 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center border border-slate-700">
                {/* Left concrete slab */}
                <div className="absolute left-0 top-0 bottom-0 bg-slate-700 border-r-2 border-slate-600" style={{ width: '45%' }}>
                  <div className="p-2 text-[10px] text-slate-400 text-left">Aggregates & Endospores</div>
                </div>
                {/* Right concrete slab */}
                <div className="absolute right-0 top-0 bottom-0 bg-slate-700 border-l-2 border-slate-600" style={{ width: '45%' }}>
                  <div className="p-2 text-[10px] text-slate-400 text-right">Spore Germination Zone</div>
                </div>
                {/* Center crack with precipitated calcite bridge */}
                <div className="absolute top-0 bottom-0 bg-slate-950 flex flex-col justify-center items-center" style={{ width: '10%' }}>
                  <div
                    className="bg-gradient-to-b from-emerald-400 to-teal-300 rounded-sm transition-all duration-300 shadow-lg shadow-emerald-500/30"
                    style={{
                      width: '100%',
                      height: `${latestHealing.healingRatioPct}%`
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-3">
                <span>Residual Width: <strong className="text-amber-300 font-mono">{latestHealing.crackWidthRemainingMm} mm</strong></span>
                <span>Water Leakage Blocked: <strong className="text-emerald-300 font-mono">{latestHealing.waterPermeabilityReductionPct}%</strong></span>
                <span>Status: <strong className="text-cyan-300">{latestHealing.isCrackStructurallySealed ? '✓ Hermetically Sealed' : '⏳ In Progress'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Durability & Rebar Protection */}
          <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> Infrastructure Longevity & Rebar Protection
              </span>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200">Rebar Corrosion Prevention</div>
                  <div className="text-[11px] text-slate-400">
                    Sealing cracks prevents chloride ion (Cl⁻) and water penetration that causes steel rebar oxidation, concrete spalling, and bridge deck failures.
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Spore Longevity in Matrix:</span>
                    <span className="text-emerald-400 font-mono font-bold">&gt; 50 Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Healable Crack Width:</span>
                    <span className="text-cyan-400 font-mono">0.85 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lifecycle Maintenance Savings:</span>
                    <span className="text-amber-300 font-mono">-65% OPEX over 50 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Cơ chế tự vá sinh học:</strong> Bào tử vi khuẩn tồn tại ở trạng thái ngủ sâu bên trong viên đất sét trương nở. Khi có vết nứt xuất hiện và nước thấm vào, bào tử lập tức nảy mầm, oxy hóa canxi lactat tạo CaCO₃ bịt kín khe nứt trong vòng 28 ngày.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: CARBON-NEGATIVE LCA */}
      {activeMode === 'CARBON_NEGATIVE_LCA_BALANCE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Production Volume Sizing */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Factory className="w-4 h-4" /> Commercial Bio-Concrete Batch Production
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Life-cycle mass balance quantifying raw material consumption, solid carbon sequestration, and avoided emissions compared to conventional Ordinary Portland Cement (OPC).
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Production Batch Volume:</span>
                    <span className="text-emerald-400 font-mono font-bold">{productionVolumeM3} m³</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={productionVolumeM3}
                    onChange={(e) => setProductionVolumeM3(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Total Bio-Concrete Mass:</span>
                    <span className="text-base font-bold font-mono text-cyan-300">
                      {(productionVolumeM3 * 2.1).toFixed(0)} tons
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mineralized Calcite:</span>
                    <span className="text-base font-bold font-mono text-emerald-300">
                      {lcaBalance.calcitePrecipitatedTons} tons CaCO₃
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Aggregate Utilized:</span>
                    <span className="text-base font-bold font-mono text-amber-300">
                      {lcaBalance.aggregateMassTons} tons
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Structural Strength:</span>
                    <span className="text-base font-bold font-mono text-teal-300">
                      {lcaBalance.finalStructuralStrengthMpa} MPa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Carbon Negative Badge */}
            <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 block font-semibold">Net Embodied Carbon Balance:</span>
                <span className="text-2xl font-bold font-mono text-emerald-300">
                  {lcaBalance.netCarbonDioxideSequestrationTons} tons CO₂ (Carbon Sink!)
                </span>
                <span className="text-[10px] text-slate-500">Locks industrial CO₂ permanently in calcite rock</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Batch Cost:</span>
                <span className="text-sm font-mono text-amber-300 font-bold">
                  ${(productionVolumeM3 * lcaBalance.costPerCubicMeterUsd).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Decarbonization vs Portland Cement */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Decarbonization vs Portland Cement Baseline
              </span>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Portland Cement Baseline:</span>
                  <span className="text-2xl font-bold font-mono text-rose-400">
                    +{lcaBalance.opcBaselineCarbonEmissionsTons} tons CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">at +350 kg CO₂/m³ clinker emissions</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Avoided Carbon Emissions:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {lcaBalance.avoidedCarbonEmissionsTons} tons CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">100% net decarbonization delta</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-emerald-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-medium">Unit Production Cost:</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">
                    ${lcaBalance.costPerCubicMeterUsd} / m³
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Competitive with standard concrete ($90-110/m³) while qualifying for premium carbon removal credits.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Vietnam GDPT 2018 Connection:</strong> Bài học về Cacbonat, Hợp chất của Canxi và Hóa học Môi trường trong chương trình Hóa học 12. Ứng dụng quá trình sinh khoáng tự nhiên để chuyển hóa khí thải CO₂ công nghiệp thành đá vôi liên kết bền vững, giải quyết triệt để 8% lượng phát thải khí nhà kính toàn cầu từ sản xuất xi măng truyền thống.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BioConcreteMineralizationVisualizer;
