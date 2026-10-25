// src/components/visualizations/ThermophotovoltaicGridStorageVisualizer.tsx
// Interactive Visualizer: Thermophotovoltaic (TPV) Ultra-High Temperature Grid Energy Storage (Thermal Battery & Photonic Selective Emitter)
// Conforms to: Planck Radiation Law, Stefan-Boltzmann Electrodynamics, Shockley-Queisser Limits & Vietnam GDPT 2018

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Activity,
  Layers,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Gauge,
  Sliders,
  Sun,
  Thermometer,
  RotateCcw
} from 'lucide-react';
import {
  TpvCellArchitecture,
  ThermalStorageCoreMaterial,
  SelectiveEmitterOpticalType,
  TPV_CELL_CATALOG,
  STORAGE_CORE_CATALOG,
  SELECTIVE_EMITTER_CATALOG,
  generatePlanckSpectrum,
  solveTpvCellOperatingPoint,
  calculateTpvGridStorageSystemBalance
} from '../../domain/thermophotovoltaicGridStorageEngine';
import { sound } from '../../audio/soundEngine';

type TpvTabMode =
  | 'TPV_SPECTRAL_BANDGAP_ALIGNMENT'
  | 'GRID_STORAGE_THERMAL_BATTERY'
  | 'SELECTIVE_EMITTER_AND_LOSSES';

export const ThermophotovoltaicGridStorageVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TpvTabMode>('TPV_SPECTRAL_BANDGAP_ALIGNMENT');

  // Controls
  const [selectedCell, setSelectedCell] = useState<TpvCellArchitecture>('DUAL_JUNCTION_GAASSB_INGAAS');
  const [selectedCore, setSelectedCore] = useState<ThermalStorageCoreMaterial>('HIGH_PURITY_ISOSTATIC_GRAPHITE');
  const [selectedEmitter, setSelectedEmitter] = useState<SelectiveEmitterOpticalType>('TUNGSTEN_1D_PHOTONIC_CRYSTAL');

  const [emitterTempC, setEmitterTempC] = useState<number>(2200);
  const [storageCapacityMwhElectric, setStorageCapacityMwhElectric] = useState<number>(100);
  const [dischargeHours, setDischargeHours] = useState<number>(10);

  const cellConfig = TPV_CELL_CATALOG[selectedCell];
  const coreConfig = STORAGE_CORE_CATALOG[selectedCore];
  const emitterConfig = SELECTIVE_EMITTER_CATALOG[selectedEmitter];

  // Solved operating point
  const operatingPoint = useMemo(() => {
    return solveTpvCellOperatingPoint(cellConfig, emitterTempC, emitterConfig.inBandEmissivity, 30);
  }, [cellConfig, emitterTempC, emitterConfig]);

  // Planck spectrum points
  const spectrumPoints = useMemo(() => {
    return generatePlanckSpectrum(emitterTempC + 273.15, cellConfig.bottomBandgapEv, emitterConfig.inBandEmissivity);
  }, [emitterTempC, cellConfig, emitterConfig]);

  // Solved grid storage system balance
  const systemBalance = useMemo(() => {
    return calculateTpvGridStorageSystemBalance(
      cellConfig,
      coreConfig,
      storageCapacityMwhElectric,
      emitterTempC,
      dischargeHours
    );
  }, [cellConfig, coreConfig, storageCapacityMwhElectric, emitterTempC, dischargeHours]);

  return (
    <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-xl text-amber-400 shadow-inner">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Thermophotovoltaic (TPV) Grid Thermal Battery Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                  RTE: {operatingPoint.totalRoundTripEfficiencyPct}%
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                2,400°C Incandescent Graphite Core, Photonic Crystal Emitter & Multi-Junction Infrared Conversion
              </p>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('TPV_SPECTRAL_BANDGAP_ALIGNMENT');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'TPV_SPECTRAL_BANDGAP_ALIGNMENT'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Planck Spectrum & Bandgap
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('GRID_STORAGE_THERMAL_BATTERY');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'GRID_STORAGE_THERMAL_BATTERY'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            100 MWh Thermal Battery
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('SELECTIVE_EMITTER_AND_LOSSES');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SELECTIVE_EMITTER_AND_LOSSES'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Photonic Emitter & Losses
          </button>
        </div>
      </div>

      {/* Global Configuration Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> TPV Cell Architecture
          </label>
          <select
            value={selectedCell}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedCell(e.target.value as TpvCellArchitecture);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {Object.values(TPV_CELL_CATALOG).map((cell) => (
              <option key={cell.id} value={cell.id}>
                {cell.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Storage Core Medium
          </label>
          <select
            value={selectedCore}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedCore(e.target.value as ThermalStorageCoreMaterial);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {Object.values(STORAGE_CORE_CATALOG).map((core) => (
              <option key={core.id} value={core.id}>
                {core.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Selective Emitter Filter
          </label>
          <select
            value={selectedEmitter}
            onChange={(e) => {
              sound.playUiClick();
              setSelectedEmitter(e.target.value as SelectiveEmitterOpticalType);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {Object.values(SELECTIVE_EMITTER_CATALOG).map((emit) => (
              <option key={emit.id} value={emit.id}>
                {emit.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Core Temp & Discharge:</span>
            <span className="text-amber-400 font-mono">{emitterTempC}°C | {dischargeHours}h</span>
          </div>
          <input
            type="range"
            min="1400"
            max="2400"
            step="50"
            value={emitterTempC}
            onChange={(e) => setEmitterTempC(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Duration:</span>
            <span className="text-cyan-400 font-mono">{dischargeHours} hours</span>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={dischargeHours}
              onChange={(e) => setDischargeHours(Number(e.target.value))}
              className="w-24 accent-cyan-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            TPV Electrical Efficiency
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {operatingPoint.cellElectricalEfficiencyPct}%
          </div>
          <div className="text-[11px] text-slate-500">Benchmark: {cellConfig.benchmarkedEfficiencyAt2400KPct}%</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-orange-400" />
            Electrical Power Density
          </div>
          <div className="text-2xl font-bold font-mono text-orange-300 mt-1">
            {operatingPoint.generatedElectricalPowerWPerCm2} W/cm²
          </div>
          <div className="text-[11px] text-slate-500">~1,200× higher than Solar PV (0.03 W/cm²)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Storage Capital Cost (CAPEX)
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            ${systemBalance.capexUsdPerKwhStorageCapacity} / kWh
          </div>
          <div className="text-[11px] text-slate-500">vs Li-ion (~$150/kWh)</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            Grid Round-Trip Efficiency
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            {operatingPoint.totalRoundTripEfficiencyPct}%
          </div>
          <div className="text-[11px] text-slate-500">Standby loss: {systemBalance.thermalStandbyLossRatePctPerDay}%/day</div>
        </div>
      </div>

      {/* MODE 1: PLANCK SPECTRUM & BANDGAP */}
      {activeMode === 'TPV_SPECTRAL_BANDGAP_ALIGNMENT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Planck Spectrum SVG Chart */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Incandescent Thermal Radiation Spectrum
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Peak Wien λ: {(2898 / (emitterTempC + 273.15)).toFixed(2)} μm
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                At 2,400 K, blackbody thermal radiation shifts into the near-infrared. Supra-bandgap photons (λ &le; {(1.2398 / cellConfig.bottomBandgapEv).toFixed(2)} μm) are converted to electricity, while sub-bandgap photons are reflected back to the graphite core with {cellConfig.subBandgapReflectivityPct}% reflectivity.
              </p>
            </div>

            {/* SVG Planck Spectrum */}
            <div className="relative w-full h-64 bg-slate-900/80 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <line x1="50" y1="20" x2="50" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

                <text x="480" y="215" fill="#64748b" fontSize="10" textAnchor="end">Wavelength λ (μm)</text>
                <text x="35" y="25" fill="#64748b" fontSize="10" textAnchor="end">Radiance</text>
                <text x="50" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">0.5</text>
                <text x="157" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">1.0</text>
                <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">2.0</text>
                <text x="372" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">3.0</text>
                <text x="480" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">4.0</text>

                {/* Bandgap Cutoff vertical line */}
                {(() => {
                  const cutoffUm = 1.2398 / cellConfig.bottomBandgapEv;
                  const x = 50 + ((cutoffUm - 0.2) / 3.8) * 430;
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="200" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                      <text x={x} y="30" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Eg Cutoff ({cutoffUm.toFixed(2)} μm)
                      </text>
                      {/* Shaded supra-bandgap region */}
                      <rect x="50" y="20" width={x - 50} height="180" fill="#f59e0b" fillOpacity="0.1" />
                    </g>
                  );
                })()}

                {/* Planck curve */}
                {(() => {
                  const maxRadiance = Math.max(...spectrumPoints.map(p => p.spectralRadianceWPerM2Um), 100);
                  const path = spectrumPoints
                    .map((pt, i) => {
                      const x = 50 + ((pt.wavelengthUm - 0.2) / 3.8) * 430;
                      const y = 200 - (pt.spectralRadianceWPerM2Um / maxRadiance) * 170;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return <path d={path} fill="none" stroke="#f59e0b" strokeWidth="2.5" />;
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400 inline-block" /> Thermal Radiation
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-3 h-0.5 bg-sky-400 border-b border-dashed inline-block" /> Cell Bandgap Cutoff
              </span>
              <span className="text-emerald-400">
                Recycled Sub-Eg Radiation: <strong>{operatingPoint.recycledSubBandgapRadiationWPerCm2} W/cm²</strong>
              </span>
            </div>
          </div>

          {/* Right: Dual-Junction Bandgap & Photon Balance */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Multi-Junction Infrared Stacking
              </span>
              <div className="space-y-3">
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">Top Sub-Cell (GaAsSb / InGaAsP)</span>
                    <span className="text-amber-400 font-mono">Eg1 = {cellConfig.topBandgapEv} eV</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cutoff λ: {(1.2398 / cellConfig.topBandgapEv).toFixed(2)} μm | Absorbs short-wave IR
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">Bottom Sub-Cell (InGaAs / Ge)</span>
                    <span className="text-amber-400 font-mono">Eg2 = {cellConfig.bottomBandgapEv} eV</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cutoff λ: {(1.2398 / cellConfig.bottomBandgapEv).toFixed(2)} μm | Absorbs medium-wave IR
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-amber-500/30">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-amber-300">Gold Back Surface Reflector (BSR)</span>
                    <span className="text-emerald-400 font-mono">{cellConfig.subBandgapReflectivityPct}% Reflectivity</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Sub-bandgap infrared photons are mirrored back to graphite without dissipating as waste heat.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-400" /> Radiative Flux Partitioning
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Total Radiative Flux (εσT⁴):</span>
                  <span className="font-mono text-amber-300">{operatingPoint.blackbodyTotalRadiationWPerCm2} W/cm²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Absorbed Supra-Eg Flux:</span>
                  <span className="font-mono text-cyan-300">{operatingPoint.absorbedAboveEgRadiationWPerCm2} W/cm²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Recycled Sub-Eg Radiation:</span>
                  <span className="font-mono text-emerald-400">+{operatingPoint.recycledSubBandgapRadiationWPerCm2} W/cm²</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-amber-400">Electric Output Density:</span>
                  <span className="font-mono text-amber-300">{operatingPoint.generatedElectricalPowerWPerCm2} W/cm²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 100 MWH THERMAL BATTERY */}
      {activeMode === 'GRID_STORAGE_THERMAL_BATTERY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Battery Controls */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Factory className="w-4 h-4" /> Grid Storage Thermal Battery Sizing
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Synthetic graphite thermal battery storing excess solar/wind electricity as incandescent heat (up to 2,400°C) with discharge through modular TPV receivers.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Target Electric Capacity:</span>
                    <span className="text-amber-400 font-mono font-bold">{storageCapacityMwhElectric} MWh-e</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={storageCapacityMwhElectric}
                    onChange={(e) => setStorageCapacityMwhElectric(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Thermal Storage Needed:</span>
                    <span className="text-base font-bold font-mono text-orange-300">
                      {systemBalance.storageCapacityMwhThermal} MWh-th
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Discharge Power (MW):</span>
                    <span className="text-base font-bold font-mono text-amber-300">
                      {systemBalance.dischargeElectricalPowerMw} MW
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Graphite Core Mass:</span>
                    <span className="text-base font-bold font-mono text-cyan-300">
                      {systemBalance.graphiteCoreMassTons.toLocaleString()} tons
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">TPV Receiver Area:</span>
                    <span className="text-base font-bold font-mono text-emerald-300">
                      {systemBalance.tpvCellActiveAreaM2} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Schematic Representation */}
            <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center relative overflow-hidden">
              <div className="text-xs font-semibold text-slate-300 mb-2">Thermal Battery Architecture</div>
              <div className="flex items-center justify-around py-3">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-orange-600/30 border-2 border-orange-500 flex items-center justify-center relative shadow-lg shadow-orange-500/20">
                    <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-orange-300 font-bold mt-1">Graphite Block</span>
                  <span className="text-[10px] text-slate-400 font-mono">{emitterTempC}°C</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600" />
                <div className="text-[10px] text-slate-500 max-w-[120px]">
                  Vacuum Multi-Foil Insulation + Photon Recycling
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center relative shadow-lg shadow-amber-500/20">
                    <Zap className="w-8 h-8 text-amber-300" />
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold mt-1">TPV Receiver</span>
                  <span className="text-[10px] text-slate-400 font-mono">{systemBalance.dischargeElectricalPowerMw} MW Power</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Economics & LCOS vs Lithium-Ion */}
          <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> CAPEX & Long-Duration Storage Economics
              </span>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">TPV Battery CAPEX:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    ${systemBalance.capexUsdPerKwhStorageCapacity} / kWh
                  </span>
                  <span className="text-[10px] text-slate-500">Li-ion: ~$150/kWh (7x cheaper)</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Avoided Carbon Emissions:</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {systemBalance.annualAvoidedCo2TonsPerYear.toLocaleString()} tons CO₂
                  </span>
                  <span className="text-[10px] text-slate-500">Replacing simple gas peakers</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-amber-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-medium">Levelized Cost of Storage (LCOS):</span>
                  <span className="text-xl font-bold font-mono text-amber-300">
                    ${systemBalance.levelizedCostOfStorageUsdPerKwh} / kWh-cycle
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Over 10,000 cycles / 30-year lifetime with zero capacity degradation and zero rare metal supply chain risk.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Vietnam GDPT 2018 Connection:</strong> Bài học về Bức xạ nhiệt, Định luật Stefan-Boltzmann và Năng lượng tái tạo trong chương trình Vật lý & Hóa học 12. Tận dụng vật liệu cacbon graphit giá rẻ có sẵn trong tự nhiên để lưu trữ điện gió và mặt trời cho hệ thống lưới điện quốc gia.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SELECTIVE EMITTER & LOSSES */}
      {activeMode === 'SELECTIVE_EMITTER_AND_LOSSES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Selective Emitter Selection */}
          <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Photonic Crystal Selective Emitter Filters
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Tailored 1D/2D refractory metamaterials suppress thermal emission at non-useful wavelengths, ensuring radiant power is concentrated solely within the TPV cell photoactive band.
              </p>

              <div className="space-y-3">
                {Object.values(SELECTIVE_EMITTER_CATALOG).map((emit) => (
                  <div
                    key={emit.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedEmitter(emit.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEmitter === emit.id
                        ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {selectedEmitter === emit.id && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />}
                        {emit.name}
                      </span>
                      <span className="text-amber-400 font-mono">Cutoff: {emit.cutoffWavelengthUm} μm</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{emit.description}</div>
                    <div className="flex gap-4 text-[10px] text-slate-500 mt-2 font-mono">
                      <span>In-Band Emissivity: {emit.inBandEmissivity}</span>
                      <span>Max Temp: {emit.maxStableTemperatureC}°C</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Active Emitter: <strong className="text-amber-300">{emitterConfig.name}</strong></span>
              <span>Thermal Standby Loss: <strong className="text-emerald-300 font-mono">{systemBalance.thermalStandbyLossRatePctPerDay}% / day</strong></span>
            </div>
          </div>

          {/* Right: Insulation & Vacuum Enclosure */}
          <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Vacuum Multi-Foil Enclosure
              </span>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-200">Vacuum Multi-Foil Insulation (MLI)</div>
                  <div className="text-[11px] text-slate-400">
                    Alternating reflective refractory foil layers (tungsten/molybdenum) in a high-vacuum chamber (&lt; 10⁻⁴ mbar) eliminate convection and reduce parasitic radiative conduction to less than 0.8% per day.
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Core Operating Temp:</span>
                    <span className="text-orange-400 font-mono">{emitterTempC}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Outer Skin Temp:</span>
                    <span className="text-emerald-400 font-mono">&lt; 40°C (Safe touch)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Multi-Day Self-Discharge:</span>
                    <span className="text-cyan-400 font-mono">&gt; 92% retention after 10 days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Co-generation CHP:</strong> Nhiệt thải TPV (~50%) ở 80-120°C có thể cung cấp trực tiếp hơi nước công nghiệp hoặc sưởi ấm khu dân cư, nâng hiệu suất sử dụng năng lượng tổng thể lên &gt; 90%.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ThermophotovoltaicGridStorageVisualizer;
