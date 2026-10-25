// src/components/visualizations/DeepSeaBioleachingVisualizer.tsx
// Interactive Visualizer: Deep-Sea Polymetallic Nodule Bioleaching & Supercritical Hydrometallurgical Refining
// Conforms to: IUPAC Hydrometallurgical Standards, Shrinking Core Dissolution Kinetics, Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Compass,
  Activity,
  Layers,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Droplets,
  ArrowRight,
  Sliders,
  Waves,
  Zap,
  BatteryCharging
} from 'lucide-react';
import {
  NoduleDepositLocation,
  BioleachingMicrobeConsortium,
  PrecursorRefiningRoute,
  NODULE_ASSAY_CATALOG,
  BIOLEACHING_SYSTEM_CATALOG,
  REFINING_ROUTE_CATALOG,
  calculateLeachingKinetics,
  calculateIndustrialPlantBalance
} from '../../domain/deepSeaBioleachingEngine';
import { sound } from '../../audio/soundEngine';

type BioleachTabMode =
  | 'SHRINKING_CORE_BIOLEACH_FLOW'
  | 'COMMERCIAL_PLANT_MASS_BALANCE'
  | 'REFINING_ROUTE_COMPARISON';

export const DeepSeaBioleachingVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<BioleachTabMode>('SHRINKING_CORE_BIOLEACH_FLOW');

  // Controls
  const [selectedDeposit, setSelectedDeposit] = useState<NoduleDepositLocation>('CLARION_CLIPPERTON_ZONE_CCZ');
  const [selectedMicrobe, setSelectedMicrobe] = useState<BioleachingMicrobeConsortium>('ACIDITHIOBACILLUS_CONSORTIUM');
  const [selectedRoute, setSelectedRoute] = useState<PrecursorRefiningRoute>('DIRECT_NMC811_COPRECIPITATION');

  const [reactionDurationHours, setReactionDurationHours] = useState<number>(48);
  const [pulpDensityWtPct, setPulpDensityWtPct] = useState<number>(15.0);
  const [annualOreFeedDryTons, setAnnualOreFeedDryTons] = useState<number>(200000);

  const depositConfig = NODULE_ASSAY_CATALOG[selectedDeposit];
  const microbeConfig = BIOLEACHING_SYSTEM_CATALOG[selectedMicrobe];
  const routeConfig = REFINING_ROUTE_CATALOG[selectedRoute];

  // Leaching kinetics curve
  const kineticsPoints = useMemo(() => {
    return calculateLeachingKinetics(depositConfig, microbeConfig, reactionDurationHours, pulpDensityWtPct);
  }, [depositConfig, microbeConfig, reactionDurationHours, pulpDensityWtPct]);

  const latestPoint = kineticsPoints[kineticsPoints.length - 1];

  // Plant commercial mass balance
  const plantBalance = useMemo(() => {
    return calculateIndustrialPlantBalance(
      depositConfig,
      microbeConfig,
      routeConfig,
      annualOreFeedDryTons,
      reactionDurationHours,
      pulpDensityWtPct
    );
  }, [depositConfig, microbeConfig, routeConfig, annualOreFeedDryTons, reactionDurationHours, pulpDensityWtPct]);

  return (
    <div className="w-full bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-blue-400/40 rounded-xl text-blue-400 shadow-inner">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Deep-Sea Nodule Bioleaching & Battery Precursors Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono">
                  Ni Rec: {latestPoint.nickelExtractionPct}%
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Biological Extraction of Abyssal Polymetallic Nodules & Direct NMC-811 EV Battery Synthesis
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('SHRINKING_CORE_BIOLEACH_FLOW');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SHRINKING_CORE_BIOLEACH_FLOW'
                ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Bioleaching Kinetics
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('COMMERCIAL_PLANT_MASS_BALANCE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'COMMERCIAL_PLANT_MASS_BALANCE'
                ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Commercial Refinery
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('REFINING_ROUTE_COMPARISON');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'REFINING_ROUTE_COMPARISON'
                ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Refining Routes
          </button>
        </div>
      </div>

      {/* Global Configuration Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-blue-400" /> Nodule Ore Deposit
          </label>
          <select
            value={selectedDeposit}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedDeposit(e.target.value as NoduleDepositLocation);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {Object.values(NODULE_ASSAY_CATALOG).map((dep) => (
              <option key={dep.deposit} value={dep.deposit}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-teal-400" /> Microorganism Consortium
          </label>
          <select
            value={selectedMicrobe}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedMicrobe(e.target.value as BioleachingMicrobeConsortium);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {Object.values(BIOLEACHING_SYSTEM_CATALOG).map((mic) => (
              <option key={mic.id} value={mic.id}>
                {mic.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> Precursor Refining Route
          </label>
          <select
            value={selectedRoute}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedRoute(e.target.value as PrecursorRefiningRoute);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {Object.values(REFINING_ROUTE_CATALOG).map((rt) => (
              <option key={rt.id} value={rt.id}>
                {rt.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Duration & Pulp Density:</span>
            <span className="text-blue-400 font-mono">{reactionDurationHours}h | {pulpDensityWtPct}%</span>
          </div>
          <input
            type="range"
            min="12"
            max="96"
            step="4"
            value={reactionDurationHours}
            onChange={(e) => setReactionDurationHours(Number(e.target.value))}
            className="w-full accent-blue-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Pulp:</span>
            <span className="text-cyan-400 font-mono">{pulpDensityWtPct}% solid</span>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={pulpDensityWtPct}
              onChange={(e) => setPulpDensityWtPct(Number(e.target.value))}
              className="w-24 accent-cyan-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Nickel Extraction Rate
          </div>
          <div className="text-2xl font-bold font-mono text-blue-300 mt-1">
            {latestPoint.nickelExtractionPct}%
          </div>
          <div className="text-[11px] text-slate-500">Cobalt: {latestPoint.cobaltExtractionPct}% | Copper: {latestPoint.copperExtractionPct}%</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            NMC-811 Precursor Yield
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {plantBalance.annualNmcPrecursorTons.toLocaleString()} tons/yr
          </div>
          <div className="text-[11px] text-slate-500">Pure Ni output: {plantBalance.annualNickelProductionTons.toLocaleString()} t/yr</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            Avoided Carbon Emissions
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300 mt-1">
            {plantBalance.avoidedGhgEmissionsVsNpiTonsCo2.toLocaleString()} t CO₂
          </div>
          <div className="text-[11px] text-slate-500">vs Terrestrial NPI Smelting (~55 t CO2/t Ni)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Gross Annual Revenue
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            ${(plantBalance.annualGrossRevenueUsd / 1e6).toFixed(1)}M / yr
          </div>
          <div className="text-[11px] text-slate-500">OPEX: ${plantBalance.specificProductionCostUsdPerLbNi} / lb Ni eq</div>
        </div>
      </div>

      {/* MODE 1: BIOLEACHING KINETICS */}
      {activeMode === 'SHRINKING_CORE_BIOLEACH_FLOW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Shrinking Core Dissolution SVG Plot */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Shrinking Core Mineral Leaching Kinetics
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  pH: {latestPoint.solutionPh} | Fe: {latestPoint.ironInSolutionGPerL} g/L
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Reductive dissolution of refractory manganese dioxide lattice (MnO₂ + 2 Fe²⁺ + 4 H⁺ → Mn²⁺ + 2 Fe³⁺ + 2 H₂O) unbinds finely disseminated nickel and cobalt into the pregnant leach solution.
              </p>
            </div>

            {/* SVG Kinetics Chart */}
            <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Time (Hours)</text>
                <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Recovery (%)</text>
                <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0h</text>
                <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(reactionDurationHours * 0.25).toFixed(0)}h</text>
                <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(reactionDurationHours * 0.5).toFixed(0)}h</text>
                <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{(reactionDurationHours * 0.75).toFixed(0)}h</text>
                <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">{reactionDurationHours}h</text>

                {/* 100% recovery reference line */}
                <line x1="50" y1="35" x2="480" y2="35" stroke="#334155" strokeDasharray="2 2" strokeWidth="1" />
                <text x="45" y="38" fill="#64748b" fontSize="9" textAnchor="end">100%</text>
                <text x="45" y="113" fill="#64748b" fontSize="9" textAnchor="end">50%</text>

                {/* Nickel recovery line */}
                {(() => {
                  const pathNi = kineticsPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.reactionHours / reactionDurationHours) * 430;
                      const y = 200 - (pt.nickelExtractionPct / 100) * 165;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathNi} fill="none" stroke="#38bdf8" strokeWidth="2.5" />;
                })()}

                {/* Cobalt recovery line */}
                {(() => {
                  const pathCo = kineticsPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.reactionHours / reactionDurationHours) * 430;
                      const y = 200 - (pt.cobaltExtractionPct / 100) * 165;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathCo} fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 1" />;
                })()}

                {/* Manganese recovery line */}
                {(() => {
                  const pathMn = kineticsPoints
                    .map((pt, i) => {
                      const x = 50 + (pt.reactionHours / reactionDurationHours) * 430;
                      const y = 200 - (pt.manganeseExtractionPct / 100) * 165;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={pathMn} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />;
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-3 h-0.5 bg-sky-400 inline-block" /> Nickel (Ni²⁺)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-0.5 bg-emerald-400 border-b border-dashed inline-block" /> Cobalt (Co²⁺)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400 border-b border-dotted inline-block" /> Manganese (Mn²⁺)
              </span>
            </div>
          </div>

          {/* Right: Mineralogy & Microorganism Specs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Seabed Mineral Composition
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Deposit Location:</span>
                  <span className="font-bold text-white">{depositConfig.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Abyssal Ocean Depth:</span>
                  <span className="font-mono text-cyan-300">{depositConfig.oceanDepthMeters[0]} - {depositConfig.oceanDepthMeters[1]} m</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-2 pt-1 text-[11px]">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Nickel (Ni):</span>
                    <span className="text-sm font-bold text-sky-300 font-mono">{depositConfig.nickelGradeWtPct} wt%</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Cobalt (Co):</span>
                    <span className="text-sm font-bold text-emerald-300 font-mono">{depositConfig.cobaltGradeWtPct} wt%</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Copper (Cu):</span>
                    <span className="text-sm font-bold text-amber-300 font-mono">{depositConfig.copperGradeWtPct} wt%</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block">Manganese (Mn):</span>
                    <span className="text-sm font-bold text-purple-300 font-mono">{depositConfig.manganeseGradeWtPct} wt%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-teal-400" /> Bio-Catalytic Microbial Culture
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>{microbeConfig.name}:</strong> Vi khuẩn hóa dưỡng vô cơ tự dưỡng oxy hóa lưu huỳnh nguyên tố thành axit sunfuric nội sinh, cung cấp proton và tạo chu trình Fe²⁺/Fe³⁺ hoàn nguyên MnO₂ rắn thành ion Mn²⁺ hòa tan.
                </p>
              </div>
              <div className="text-[11px] text-teal-400 bg-teal-500/10 p-2 rounded border border-teal-500/20 mt-2">
                ✓ Phản ứng: S⁰ + 1.5 O₂ + H₂O → H₂SO₄; MnO₂ + 2 Fe²⁺ + 4 H⁺ → Mn²⁺ + 2 Fe³⁺ + 2 H₂O
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: COMMERCIAL REFINERY */}
      {activeMode === 'COMMERCIAL_PLANT_MASS_BALANCE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Refinery Sizing Controls */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Factory className="w-4 h-4" /> Commercial Hydrometallurgical Refinery
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Full-scale continuous bioleaching and precursor synthesis plant processing deep-sea polymetallic nodules for the global EV battery supply chain.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Annual Dry Nodule Throughput:</span>
                    <span className="text-blue-400 font-mono font-bold">
                      {annualOreFeedDryTons.toLocaleString()} dry tons/yr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="25000"
                    value={annualOreFeedDryTons}
                    onChange={(e) => setAnnualOreFeedDryTons(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Refined Nickel Output:</span>
                    <span className="text-base font-bold font-mono text-sky-300">
                      {plantBalance.annualNickelProductionTons.toLocaleString()} t/yr
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Refined Cobalt Output:</span>
                    <span className="text-base font-bold font-mono text-emerald-300">
                      {plantBalance.annualCobaltProductionTons.toLocaleString()} t/yr
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Copper Cathode Output:</span>
                    <span className="text-base font-bold font-mono text-amber-300">
                      {plantBalance.annualCopperProductionTons.toLocaleString()} t/yr
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Manganese Product:</span>
                    <span className="text-base font-bold font-mono text-purple-300">
                      {plantBalance.annualManganeseProductTons.toLocaleString()} t/yr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Precursor Output Highlight Box */}
            <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Direct NMC-811 Precursor:</span>
                <span className="text-2xl font-bold font-mono text-emerald-300">
                  {plantBalance.annualNmcPrecursorTons.toLocaleString()} tons/yr
                </span>
                <span className="text-[10px] text-slate-500">Powers ~70,000 electric vehicle battery packs</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Bioleach Reactor Volume:</span>
                <span className="text-sm font-mono text-blue-300 font-bold">
                  {plantBalance.bioleachingTankVolumeM3.toLocaleString()} m³
                </span>
              </div>
            </div>
          </div>

          {/* Right: Decarbonization & Economics */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Decarbonization & Commercial Profitability
              </span>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Annual Gross Revenue:</span>
                  <span className="text-2xl font-bold font-mono text-amber-300">
                    ${(plantBalance.annualGrossRevenueUsd / 1e6).toFixed(1)}M / yr
                  </span>
                  <span className="text-[10px] text-slate-500">Ni, Co, Cu, Mn multi-revenue</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Avoided Carbon Emissions:</span>
                  <span className="text-2xl font-bold font-mono text-teal-300">
                    {plantBalance.avoidedGhgEmissionsVsNpiTonsCo2.toLocaleString()} t CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">vs Terrestrial NPI smelting</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-blue-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-medium">Specific Nickel Production OPEX:</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">
                    ${plantBalance.specificProductionCostUsdPerLbNi} / lb Ni eq
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  First-quartile cost curve positioning due to zero rock blasting, zero sulfur smelting, and biological acid generation.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Vietnam GDPT 2018 Connection:</strong> Bài học về Kim loại chuyển tiếp, Điện hóa và Luyện kim trong chương trình Hóa học 12. Phương pháp thủy luyện sinh học thân thiện với môi trường, loại bỏ hoàn toàn lò cao nhiệt luyện phát thải CO₂ và hồ bùn đỏ đuôi quặng nguy hại.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: REFINING ROUTES */}
      {activeMode === 'REFINING_ROUTE_COMPARISON' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Refining Route Selector Matrix */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Downstream Hydrometallurgical Refining Options
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Comparison of chemical refining flowsheets converting pregnant leach solution (PLS) into high-purity battery chemicals or industrial alloy feedstocks.
              </p>

              <div className="space-y-3">
                {Object.values(REFINING_ROUTE_CATALOG).map((rt) => (
                  <div
                    key={rt.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedRoute(rt.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedRoute === rt.id
                        ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {selectedRoute === rt.id && <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />}
                        {rt.name}
                      </span>
                      <span className="text-emerald-400 font-mono">{rt.ghgEmissionsKgCo2PerKgNi} kg CO₂/kg Ni</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{rt.description}</div>
                    <div className="flex gap-4 text-[10px] text-slate-500 mt-2 font-mono">
                      <span>End Product: {rt.primaryEndProduct}</span>
                      <span>Energy: {rt.specificEnergyConsumptionKwhPerKgNi} kWh/kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Active Route: <strong className="text-blue-300">{routeConfig.primaryEndProduct}</strong></span>
              <span>Reagent Cost: <strong className="text-amber-300 font-mono">${routeConfig.reagentCostUsdPerTonOre} / ton ore</strong></span>
            </div>
          </div>

          {/* Right: Environmental Footprint Comparison vs Terrestrial Smelting */}
          <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> Life-Cycle Carbon Comparison (kg CO₂ / kg Ni)
              </span>

              {/* Progress bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-300 font-semibold">Deep-Sea Bioleach ({routeConfig.name.split(' ')[0]}):</span>
                    <span className="text-emerald-300 font-mono font-bold">{routeConfig.ghgEmissionsKgCo2PerKgNi} kg CO₂</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(routeConfig.ghgEmissionsKgCo2PerKgNi / 65) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Terrestrial HPAL (Nickel Laterite):</span>
                    <span className="text-slate-300 font-mono">22.0 kg CO₂</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(22.0 / 65) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Nickel Pig Iron (NPI Coal Smelting):</span>
                    <span className="text-rose-400 font-mono font-bold">58.0 kg CO₂</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(58.0 / 65) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* ESG summary */}
              <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-200">ESG Environmental Superiority</div>
                <div className="text-[11px] text-slate-400">
                  Bioleaching eliminates toxic sulfur dioxide (SO₂) gas emissions, requires zero rainforest deforestation (unlike terrestrial nickel strip-mining in Indonesia), and produces non-hazardous silicate residue that can be utilized in construction concrete.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Clean Energy Sovereign Security:</strong> Đảm bảo nguồn cung ứng niken và coban độ tinh khiết cao độc lập cho ngành công nghiệp xe điện toàn cầu mà không phá hủy rừng nhiệt đới hoặc xả thải đuôi quặng biển sâu.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeepSeaBioleachingVisualizer;
