// src/components/visualizations/ElectrochemicalCorrVisualizer.tsx
// Interactive Visualizer: Electrochemical Carbon Monoxide Reduction (CO-RR) to Multi-Carbon Alcohols (C2+)
// Conforms strictly to IUPAC electrocatalysis standards and Vietnam GDPT 2018 Organic & Redox Chemistry.

import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
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
  Droplets,
  TrendingUp,
  Fuel
} from 'lucide-react';
import {
  CuCatalystMorphologyType,
  CorrElectrolyteType,
  CU_CATALYST_CATALOG,
  TARGET_PRODUCT_CATALOG,
  calculateCorrKinetics,
  calculateCorrIndustrialBalance
} from '../../domain/electrochemicalCarbonMonoxideReductionEngine';
import { sound } from '../../audio/soundEngine';

type CorrTabMode =
  | 'CATALYSIS_AND_CC_COUPLING'
  | 'POLARIZATION_AND_SELECTIVITY'
  | 'COMMERCIAL_PLANT_MASS_BALANCE';

export const ElectrochemicalCorrVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CorrTabMode>('CATALYSIS_AND_CC_COUPLING');

  // Controls
  const [selectedCatalyst, setSelectedCatalyst] = useState<CuCatalystMorphologyType>('OXIDE_DERIVED_COPPER_OD_CU');
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<CorrElectrolyteType>('PURE_WATER_AEM_ZERO_GAP');

  const [currentDensityMacm2, setCurrentDensityMacm2] = useState<number>(400.0);
  const [feedCoPressureBar, setFeedCoPressureBar] = useState<number>(5.0);
  const [stackAreaM2, setStackAreaM2] = useState<number>(250.0);

  const catalystConfig = CU_CATALYST_CATALOG[selectedCatalyst];

  // Kinetics calculations
  const kinetics = useMemo(() => {
    return calculateCorrKinetics(
      catalystConfig,
      selectedElectrolyte,
      currentDensityMacm2,
      feedCoPressureBar
    );
  }, [catalystConfig, selectedElectrolyte, currentDensityMacm2, feedCoPressureBar]);

  // Industrial mass balance calculations
  const plantBalance = useMemo(() => {
    return calculateCorrIndustrialBalance(kinetics, stackAreaM2);
  }, [kinetics, stackAreaM2]);

  // Polarization curve data points
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 100; j <= 800; j += 50) {
      const res = calculateCorrKinetics(catalystConfig, selectedElectrolyte, j, feedCoPressureBar);
      points.push({
        j,
        voltage: res.cellOperatingVoltageV,
        feC2Plus: res.c2PlusOverallFaradaicEfficiencyPct,
        feEthanol: res.ethanolFaradaicEfficiencyPct
      });
    }
    return points;
  }, [catalystConfig, selectedElectrolyte, feedCoPressureBar]);

  return (
    <div className="w-full bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-teal-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-400/40 rounded-xl text-teal-400 shadow-inner">
              <Fuel className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Electrochemical CO Reduction to E-Ethanol (CO-RR) Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono">
                  {plantBalance.dailyEthanolProductionKg.toLocaleString()} kg/day | {kinetics.c2PlusOverallFaradaicEfficiencyPct}% C2+ FE
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Tandem High-Pressure GDE, *CO Dimerization C-C Coupling & Zero-Gap AEM Electrolysis
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CATALYSIS_AND_CC_COUPLING');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'CATALYSIS_AND_CC_COUPLING'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            C-C Coupling Mechanism
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('POLARIZATION_AND_SELECTIVITY');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'POLARIZATION_AND_SELECTIVITY'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Polarization & Selectivity
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('COMMERCIAL_PLANT_MASS_BALANCE');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'COMMERCIAL_PLANT_MASS_BALANCE'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Plant Mass Balance
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Controls & Configuration */}
        <div className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-teal-300 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Electrosynthesis Parameters
          </h3>

          {/* Catalyst Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Copper Catalyst Morphology</label>
            <select
              value={selectedCatalyst}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedCatalyst(e.target.value as CuCatalystMorphologyType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-teal-200 focus:outline-none focus:border-teal-400"
            >
              {Object.values(CU_CATALYST_CATALOG).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.c2PlusFaradaicEfficiencyPct}% C2+ FE)
                </option>
              ))}
            </select>
          </div>

          {/* Electrolyte Architecture */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Electrolyte & Cell Assembly</label>
            <select
              value={selectedElectrolyte}
              onChange={(e) => {
                sound.playUiClick();
                setSelectedElectrolyte(e.target.value as CorrElectrolyteType);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-sky-200 focus:outline-none focus:border-sky-400"
            >
              <option value="PURE_WATER_AEM_ZERO_GAP">Pure Water Fed AEM Zero-Gap MEA (No salt buildup)</option>
              <option value="AQUEOUS_KOH_1M">1.0 M KOH Alkaline Catholyte (High conductivity)</option>
              <option value="AQUEOUS_KHCO3_0_5M">0.5 M KHCO3 Neutral Buffer</option>
            </select>
          </div>

          {/* Operating Current Density */}
          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Current Density</span>
              <span className="font-mono text-teal-300 font-bold">{currentDensityMacm2.toFixed(0)} mA/cm²</span>
            </div>
            <input
              type="range"
              min={100}
              max={800}
              step={25}
              value={currentDensityMacm2}
              onChange={(e) => setCurrentDensityMacm2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>100 mA/cm²</span>
              <span>Max Stable: {catalystConfig.maxStableCurrentDensityMacm2}</span>
              <span>800 mA/cm²</span>
            </div>
          </div>

          {/* Feed CO Pressure */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">CO Gas Pressure (GDE Backpressure)</span>
              <span className="font-mono text-cyan-300 font-bold">{feedCoPressureBar.toFixed(1)} bar</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={10.0}
              step={0.5}
              value={feedCoPressureBar}
              onChange={(e) => setFeedCoPressureBar(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>1.0 bar (Atmospheric)</span>
              <span>High *CO Coverage</span>
              <span>10.0 bar</span>
            </div>
          </div>

          {/* Stack Active Area */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Electrolyzer Stack Active Area</span>
              <span className="font-mono text-emerald-300 font-bold">{stackAreaM2} m²</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={25}
              value={stackAreaM2}
              onChange={(e) => setStackAreaM2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              sound.playUiClick();
              setSelectedCatalyst('OXIDE_DERIVED_COPPER_OD_CU');
              setSelectedElectrolyte('PURE_WATER_AEM_ZERO_GAP');
              setCurrentDensityMacm2(400.0);
              setFeedCoPressureBar(5.0);
              setStackAreaM2(250.0);
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Standard High-Rate Baseline
          </button>
        </div>

        {/* Center & Right Column: Dynamic Modes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 border border-teal-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Cell Voltage</div>
              <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">
                {kinetics.cellOperatingVoltageV} <span className="text-xs font-normal">V</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Cathode: {kinetics.cathodicPotentialVsRheV} V vs RHE
              </div>
            </div>

            <div className="bg-slate-800/60 border border-emerald-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Ethanol Faradaic Eff.</div>
              <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">
                {kinetics.ethanolFaradaicEfficiencyPct}%
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Total C2+: {kinetics.c2PlusOverallFaradaicEfficiencyPct}%
              </div>
            </div>

            <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">*CO Surface Coverage</div>
              <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                θ_CO = {kinetics.coSurfaceCoverageThetaCo}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Single-pass conv: {kinetics.coSinglePassConversionPct}%
              </div>
            </div>

            <div className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-medium">Daily Ethanol Output</div>
              <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">
                {plantBalance.dailyEthanolProductionKg.toLocaleString()} <span className="text-xs font-normal">kg</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Power: {plantBalance.stackElectricalPowerKw.toLocaleString()} kW
              </div>
            </div>
          </div>

          {/* TAB 1: C-C COUPLING & CATALYSIS MECHANISM */}
          {activeMode === 'CATALYSIS_AND_CC_COUPLING' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-teal-400" />
                  Catalytic Dimerization & Surface Facet Mechanism
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono">
                  Barrier: {catalystConfig.ccCouplingKineticBarrierEv} eV | Facets: {catalystConfig.activeFacets}
                </span>
              </div>

              {/* Chemical Reaction Pathway Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                {/* Step 1: Adsorption */}
                <div className="p-3 bg-teal-950/20 border border-teal-500/30 rounded-lg">
                  <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px]">1</span>
                    CO Gas Chemisorption
                  </div>
                  <div className="my-2 font-mono text-xs text-white">
                    CO (g) → *CO
                  </div>
                  <div className="text-[11px] text-slate-400">
                    High pressure ({feedCoPressureBar} bar) drives near-unity coverage (θ = {kinetics.coSurfaceCoverageThetaCo}), suppressing free Cu sites for H2 evolution.
                  </div>
                </div>

                {/* Step 2: Dimerization */}
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">2</span>
                    *CO-*CO C-C Coupling
                  </div>
                  <div className="my-2 font-mono text-xs text-white">
                    *CO + *CO + e⁻ → *C₂O₂⁻
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Rate-determining step (RDS) with {catalystConfig.ccCouplingKineticBarrierEv} eV activation barrier on {catalystConfig.activeFacets}.
                  </div>
                </div>

                {/* Step 3: Reduction */}
                <div className="p-3 bg-sky-950/20 border border-sky-500/30 rounded-lg">
                  <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px]">3</span>
                    Proton-Electron Cascades
                  </div>
                  <div className="my-2 font-mono text-xs text-white">
                    *C₂O₂ → *CH₂CHO → C₂H₅OH
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Sequential addition of 8 electrons and 7 H2O molecules yielding pure green liquid ethanol (C2H5OH).
                  </div>
                </div>
              </div>

              {/* GDPT 2018 Chemical Equation Callout */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="font-semibold text-slate-300">Total Electrochemical Reaction (Vietnam GDPT 2018):</div>
                <div className="font-mono text-teal-300 text-sm">
                  2 CO (k) + 8 e⁻ + 7 H₂O (l) → C₂H₅OH (l) + 8 OH⁻ (dd)
                </div>
                <div className="text-[11px] text-slate-500">
                  Anode reaction: 8 OH⁻ → 2 O₂ (k) + 4 H₂O (l) + 8 e⁻ (Oxygen Evolution OER)
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POLARIZATION & PRODUCT SELECTIVITY */}
          {activeMode === 'POLARIZATION_AND_SELECTIVITY' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Polarization Curve & Faradaic Efficiency Spectrum
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  {currentDensityMacm2} mA/cm² @ {kinetics.cellOperatingVoltageV} V
                </span>
              </div>

              {/* SVG Polarization Chart */}
              <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 240">
                  <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                  <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Current Density (mA/cm²)</text>
                  <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Cell V / FE %</text>
                  <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">100</text>
                  <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">300</text>
                  <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">500</text>
                  <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">700</text>
                  <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">800</text>

                  {/* Cell Voltage Path */}
                  {(() => {
                    const pathV = polarizationPoints
                      .map((pt, i) => {
                        const x = 50 + ((pt.j - 100) / 700) * 430;
                        const y = 200 - ((pt.voltage - 1.5) / 2.5) * 165;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ');
                    return <path d={pathV} fill="none" stroke="#f59e0b" strokeWidth="2.5" />;
                  })()}

                  {/* Faradaic Efficiency Path (C2+) */}
                  {(() => {
                    const pathFe = polarizationPoints
                      .map((pt, i) => {
                        const x = 50 + ((pt.j - 100) / 700) * 430;
                        const y = 200 - (pt.feC2Plus / 100.0) * 165;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ');
                    return <path d={pathFe} fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 1" />;
                  })()}
                </svg>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-0.5 bg-amber-400 inline-block" /> Cell Operating Voltage (V)
                </span>
                <span className="flex items-center gap-1.5 text-teal-400">
                  <span className="w-3 h-0.5 bg-teal-400 border-b border-dashed inline-block" /> C2+ Faradaic Efficiency (%)
                </span>
                <span className="text-slate-400">
                  Parasitic HER: <strong className="text-rose-400">{kinetics.hydrogenEvolutionFePct}%</strong>
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: INDUSTRIAL PLANT BALANCE & AVOIDED CO2 */}
          {activeMode === 'COMMERCIAL_PLANT_MASS_BALANCE' && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Factory className="w-4 h-4 text-emerald-400" />
                  Commercial Electrolyzer Balance & Avoided Fossil Emissions
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">
                  ${plantBalance.annualNetRevenueUsd.toLocaleString()} / year
                </span>
              </div>

              {/* Product Outflow Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-teal-950/20 border border-teal-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Daily Green Ethanol</div>
                  <div className="text-xl font-bold font-mono text-teal-300">
                    {plantBalance.dailyEthanolProductionKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {((plantBalance.dailyEthanolProductionKg * 350) / 1000).toFixed(0)} tons/year
                  </div>
                </div>

                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Daily Green Ethylene</div>
                  <div className="text-xl font-bold font-mono text-cyan-300">
                    {plantBalance.dailyEthyleneProductionKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {((plantBalance.dailyEthyleneProductionKg * 350) / 1000).toFixed(0)} tons/year
                  </div>
                </div>

                <div className="p-3 bg-sky-950/20 border border-sky-500/30 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">Daily Green n-Propanol</div>
                  <div className="text-xl font-bold font-mono text-sky-300">
                    {plantBalance.dailyPropanolProductionKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-500">
                    High-value C3 chemical ($2.40/kg)
                  </div>
                </div>
              </div>

              {/* Energy Consumption & Carbon Abatement */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Specific Electrical Energy Consumption:</span>
                  <span className="font-mono text-amber-300 font-bold">{plantBalance.specificEnergyConsumptionKwhPerKgEthanol} kWh / kg C₂H₅OH</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Feed CO Gas Consumption:</span>
                  <span className="font-mono text-slate-200 font-bold">{plantBalance.dailyCoFeedMassKg.toLocaleString()} kg CO / day</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-300 font-semibold border-t border-slate-800 pt-2">
                  <span>Avoided Fossil Carbon Dioxide Emissions:</span>
                  <span className="font-mono font-bold">{plantBalance.avoidedFossilCo2EmissionsTonsPerYear.toLocaleString()} tons CO₂ / year</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
