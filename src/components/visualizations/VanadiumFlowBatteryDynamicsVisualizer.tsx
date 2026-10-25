// src/components/visualizations/VanadiumFlowBatteryDynamicsVisualizer.tsx
// Interactive Visualizer: Vanadium Redox Flow Battery (VRFB) Dual-Membrane Electrolyte Dynamics & Viscosity-Pressure Drop System
// Standards: IUPAC Electrochemistry, Darcy-Forchheimer Porous Media & Vietnam GDPT 2018 Chemistry

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
  Cpu,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  VRFB_VALENCE_SPECIES,
  VRFB_MEMBRANE_CATALOG,
  VrfbMembraneType,
  VanadiumFlowBatteryDynamicsEngine
} from '../../domain/vanadiumFlowBatteryDynamicsEngine';
import { sound } from '../../audio/soundEngine';

type VrfbTabMode =
  | 'SPECTROPHOTOMETRY_AND_MEMBRANE'
  | 'HYDRODYNAMICS_AND_PUMPING'
  | 'GRID_SCALE_DECOUPLED_PLANT';

export const VanadiumFlowBatteryDynamicsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VrfbTabMode>('SPECTROPHOTOMETRY_AND_MEMBRANE');

  // Interactive controls
  const [stateOfCharge, setStateOfCharge] = useState<number>(0.65); // 5% to 95%
  const [temperatureC, setTemperatureC] = useState<number>(28.0); // 5°C to 55°C
  const [vanadiumConcM, setVanadiumConcM] = useState<number>(1.8); // 1.2M to 2.5M
  const [h2so4ConcM, setH2so4ConcM] = useState<number>(2.5); // 2.0M to 4.5M
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(140.0); // 40 to 260 mA/cm2
  const [flowRateLMin, setFlowRateLMin] = useState<number>(2.8); // 0.5 to 8.0 L/min
  const [selectedMembrane, setSelectedMembrane] = useState<VrfbMembraneType>('AEM_FUMASEP');
  const [hasAdditive, setHasAdditive] = useState<boolean>(true);

  // Grid Scale Sizing Controls
  const [gridRatedPowerMw, setGridRatedPowerMw] = useState<number>(10.0); // 1 - 50 MW
  const [gridStorageHours, setGridStorageHours] = useState<number>(8.0); // 2 - 16 h

  const membraneSpec = VRFB_MEMBRANE_CATALOG[selectedMembrane];

  // Engine Computations
  const operatingConditions = useMemo(() => ({
    stateOfCharge,
    temperatureC,
    vanadiumConcentrationMolar: vanadiumConcM,
    sulfuricAcidConcentrationMolar: h2so4ConcM,
    currentDensityMaPerCm2: currentDensityMaCm2,
    flowRateLitersPerMin: flowRateLMin,
    membrane: selectedMembrane,
    hasStabilizingAdditive: hasAdditive
  }), [stateOfCharge, temperatureC, vanadiumConcM, h2so4ConcM, currentDensityMaCm2, flowRateLMin, selectedMembrane, hasAdditive]);

  const electroResult = useMemo(() => {
    return VanadiumFlowBatteryDynamicsEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const hydroResult = useMemo(() => {
    return VanadiumFlowBatteryDynamicsEngine.calculateHydrodynamicsAndPumping(operatingConditions, 1000);
  }, [operatingConditions]);

  const thermalResult = useMemo(() => {
    return VanadiumFlowBatteryDynamicsEngine.evaluateThermalStability(operatingConditions);
  }, [operatingConditions]);

  const gridPlantResult = useMemo(() => {
    return VanadiumFlowBatteryDynamicsEngine.designGridScaleStoragePlant(
      gridRatedPowerMw,
      gridStorageHours,
      selectedMembrane
    );
  }, [gridRatedPowerMw, gridStorageHours, selectedMembrane]);

  // Flow rate vs Net Efficiency curve points (0.5 to 8.0 L/min)
  const flowEfficiencyCurvePoints = useMemo(() => {
    const points = [];
    for (let q = 0.8; q <= 6.5; q += 0.4) {
      const cond = { ...operatingConditions, flowRateLitersPerMin: q };
      const hydro = VanadiumFlowBatteryDynamicsEngine.calculateHydrodynamicsAndPumping(cond, 1000);
      points.push({
        flowRate: Number(q.toFixed(1)),
        netEfficiency: hydro.netDischargeEfficiencyPercent,
        pressureDrop: hydro.hydraulicPressureDropKpa
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: VrfbTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleMembraneSelect = (mem: VrfbMembraneType) => {
    sound.playUiClick();
    setSelectedMembrane(mem);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-emerald-500/30 text-white shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/40 rounded-xl">
            <Droplets className="w-7 h-7 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-400 bg-clip-text text-transparent">
                Pin Dòng Vanadi (VRFB) & Động Học Màng Đôi
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono">
                LDES Grid Storage
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Mô hình hóa 4 trạng thái hóa trị Vanadi, rào cản Donnan AEM, độ nhớt và thủy động học Darcy-Forchheimer (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => handleModeChange('SPECTROPHOTOMETRY_AND_MEMBRANE')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'SPECTROPHOTOMETRY_AND_MEMBRANE'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>4 Hóa Trị & Màng Đôi</span>
          </button>
          <button
            onClick={() => handleModeChange('HYDRODYNAMICS_AND_PUMPING')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'HYDRODYNAMICS_AND_PUMPING'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Thủy Động Lực & Bơm</span>
          </button>
          <button
            onClick={() => handleModeChange('GRID_SCALE_DECOUPLED_PLANT')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'GRID_SCALE_DECOUPLED_PLANT'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Trạm Lưu Trữ Lưới (10 MW)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: 4-Valence Spectrophotometry & Donnan Membrane Barrier */}
      {activeMode === 'SPECTROPHOTOMETRY_AND_MEMBRANE' && (
        <div className="space-y-6">
          {/* 4 Valence States Catalog Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.values(VRFB_VALENCE_SPECIES).map((species) => (
              <div
                key={species.symbol}
                className="p-3 rounded-xl border border-slate-700/70 bg-slate-800/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base" style={{ color: species.colorHex }}>
                    {species.symbol}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: species.colorHex }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-300 font-medium leading-snug">
                  {species.iupacNameVi}
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-1.5">
                  <span>λ_max = {species.lambdaMaxNm} nm</span>
                  <span className="font-mono text-emerald-400">Hóa trị +{species.valence}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  Điều Khiển Vận Hành Trực Tuyến
                </span>
                <span className="text-xs text-emerald-400 font-mono">SOC: {(stateOfCharge * 100).toFixed(0)}%</span>
              </div>

              {/* SOC Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Trạng Thái Nạp (SOC)</span>
                  <span className="font-semibold text-slate-200">{(stateOfCharge * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={stateOfCharge}
                  onChange={(e) => setStateOfCharge(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5% (Xả Kiệt)</span>
                  <span>50% (Danh Định)</span>
                  <span>95% (Nạp Đầy)</span>
                </div>
              </div>

              {/* Membrane Selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Lựa Chọn Loại Màng Phân Cách</label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(VRFB_MEMBRANE_CATALOG) as VrfbMembraneType[]).map((mKey) => {
                    const m = VRFB_MEMBRANE_CATALOG[mKey];
                    const isSelected = selectedMembrane === mKey;
                    return (
                      <button
                        key={mKey}
                        onClick={() => handleMembraneSelect(mKey)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{m.nameVi}</span>
                          <span className="font-mono text-[11px] text-emerald-400">
                            {m.capacityRetentionPerCyclePercent}%/chu kỳ
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {m.crossContaminationResistanceVi}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vanadium Concentration & Acid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">Nồng Độ [V] (M)</span>
                  <input
                    type="range"
                    min="1.2"
                    max="2.5"
                    step="0.1"
                    value={vanadiumConcM}
                    onChange={(e) => setVanadiumConcM(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded"
                  />
                  <div className="text-right text-xs font-mono text-emerald-400">{vanadiumConcM.toFixed(1)} M</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">Nồng Độ [H₂SO₄] (M)</span>
                  <input
                    type="range"
                    min="2.0"
                    max="4.5"
                    step="0.1"
                    value={h2so4ConcM}
                    onChange={(e) => setH2so4ConcM(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded"
                  />
                  <div className="text-right text-xs font-mono text-emerald-400">{h2so4ConcM.toFixed(1)} M</div>
                </div>
              </div>

              {/* Stabilizing Additive Toggle */}
              <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-700/70">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-300 font-medium">Phụ Gia Ổn Định H₃PO₄</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasAdditive}
                  onChange={(e) => {
                    sound.playUiClick();
                    setHasAdditive(e.target.checked);
                  }}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Right Column: Dynamic SVG Spectrophotometric Flow Loop & Cell */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Sơ Đồ Tuần Hoàn Điện Giải & Rào Cản Donnan
                </span>
                <span className="text-xs font-mono text-slate-400">
                  E°_cell = 1.26 V | OCV = {electroResult.openCircuitVoltageV.toFixed(3)} V
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 520 250" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  <defs>
                    <linearGradient id="anolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={electroResult.anolyteColor.colorHex} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={electroResult.anolyteColor.colorHex} stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="catholyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={electroResult.catholyteColor.colorHex} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={electroResult.catholyteColor.colorHex} stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Negative Anolyte Tank */}
                  <rect x="25" y="45" width="85" height="150" rx="8" fill="url(#anolyteGrad)" stroke="#7C3AED" strokeWidth="2" />
                  <text x="67" y="32" textAnchor="middle" fill="#C4B5FD" fontSize="11" fontWeight="bold">Bể Anolyte (V²⁺/V³⁺)</text>
                  <text x="67" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                    {(stateOfCharge * 100).toFixed(0)}% Nạp
                  </text>
                  <text x="67" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="9">
                    {electroResult.anolyteColor.v2Fraction > 0.5 ? 'Tím Hoa Cà' : 'Xanh Lục'}
                  </text>

                  {/* Positive Catholyte Tank */}
                  <rect x="410" y="45" width="85" height="150" rx="8" fill="url(#catholyteGrad)" stroke="#F59E0B" strokeWidth="2" />
                  <text x="452" y="32" textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="bold">Bể Catholyte (VO²⁺/VO₂⁺)</text>
                  <text x="452" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                    {(stateOfCharge * 100).toFixed(0)}% Nạp
                  </text>
                  <text x="452" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="9">
                    {electroResult.catholyteColor.voPlusFraction > 0.5 ? 'Vàng Hổ Phách' : 'Lam Biếc'}
                  </text>

                  {/* Cell Stack in Center */}
                  <rect x="175" y="45" width="170" height="150" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                  
                  {/* Porous Anode Felt */}
                  <rect x="185" y="55" width="55" height="130" fill="#334155" opacity="0.8" stroke="#7C3AED" strokeDasharray="3,3" />
                  <text x="212" y="125" textAnchor="middle" fill="#CBD5E1" fontSize="10">Nỉ Carbon (-)</text>

                  {/* Membrane in Center */}
                  <rect x="252" y="50" width="16" height="140" fill={selectedMembrane === 'AEM_FUMASEP' ? '#059669' : '#3B82F6'} rx="2" />
                  <text x="260" y="40" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold">
                    {selectedMembrane === 'AEM_FUMASEP' ? 'AEM (Donnan)' : 'Nafion CEM'}
                  </text>

                  {/* Porous Cathode Felt */}
                  <rect x="280" y="55" width="55" height="130" fill="#334155" opacity="0.8" stroke="#F59E0B" strokeDasharray="3,3" />
                  <text x="307" y="125" textAnchor="middle" fill="#CBD5E1" fontSize="10">Nỉ Carbon (+)</text>

                  {/* Fluid Circulation Lines */}
                  {/* Anolyte Pump Loops */}
                  <path d="M 110 80 L 185 80" stroke={electroResult.anolyteColor.colorHex} strokeWidth="3" fill="none" strokeDasharray="4,2" />
                  <path d="M 185 160 L 110 160" stroke={electroResult.anolyteColor.colorHex} strokeWidth="3" fill="none" strokeDasharray="4,2" />

                  {/* Catholyte Pump Loops */}
                  <path d="M 410 80 L 335 80" stroke={electroResult.catholyteColor.colorHex} strokeWidth="3" fill="none" strokeDasharray="4,2" />
                  <path d="M 335 160 L 410 160" stroke={electroResult.catholyteColor.colorHex} strokeWidth="3" fill="none" strokeDasharray="4,2" />

                  {/* Donnan Repulsion Arrow markers */}
                  {selectedMembrane === 'AEM_FUMASEP' ? (
                    <g>
                      <text x="260" y="115" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">⛔</text>
                      <text x="260" y="135" textAnchor="middle" fill="#FBBF24" fontSize="8" fontWeight="bold">ĐẨY DONNAN</text>
                    </g>
                  ) : (
                    <g>
                      <text x="260" y="115" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">H⁺ ⇄</text>
                    </g>
                  )}

                  {/* External Circuit */}
                  <path d="M 212 55 L 212 18 L 307 18 L 307 55" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  <circle cx="260" cy="18" r="10" fill="#0F172A" stroke="#FBBF24" strokeWidth="2" />
                  <text x="260" y="22" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">e⁻</text>
                </svg>
              </div>

              {/* Chemical Equations Card */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-purple-400">Cực Âm (-):</span>
                  <span>V³⁺ + e⁻ ⇌ V²⁺ (E° = -0.26 V vs SHE)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">Cực Dương (+):</span>
                  <span>VO²⁺ + H₂O ⇌ VO₂⁺ + 2H⁺ + e⁻ (E° = +1.00 V vs SHE)</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1 flex justify-between items-center text-emerald-300 font-bold">
                  <span>Toàn Phần:</span>
                  <span>V³⁺ + VO²⁺ + H₂O ⇌ V²⁺ + VO₂⁺ + 2H⁺ (E° = 1.26 V)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Darcy-Forchheimer Hydrodynamics & Pumping Trade-off */}
      {activeMode === 'HYDRODYNAMICS_AND_PUMPING' && (
        <div className="space-y-6">
          {/* Thermal Stability Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              thermalResult.catholyteV2O5PrecipitationRisk === 'CRITICAL_PRECIPITATION'
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : thermalResult.catholyteV2O5PrecipitationRisk === 'WARNING' || thermalResult.anolyteLowTempPrecipitationRisk === 'WARNING'
                ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
            }`}
          >
            {thermalResult.catholyteV2O5PrecipitationRisk === 'CRITICAL_PRECIPITATION' ? (
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            ) : thermalResult.catholyteV2O5PrecipitationRisk === 'WARNING' ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {thermalResult.catholyteV2O5PrecipitationRisk === 'CRITICAL_PRECIPITATION'
                    ? 'CẢNH BÁO KẾT TỦA V₂O₅ (CATHODE)'
                    : thermalResult.catholyteV2O5PrecipitationRisk === 'WARNING'
                    ? 'CẢNH BÁO BIÊN NHIỆT ĐỘ KHÔNG ỔN ĐỊNH'
                    : 'ỔN ĐỊNH NHIỆT AN TOÀN'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono">
                  T = {temperatureC}°C | Thời gian cảm ứng τ = {thermalResult.inductionTimeHours} h
                </span>
              </div>
              <p className="text-xs opacity-90">{thermalResult.recommendationVi}</p>
              <p className="text-[11px] opacity-75 font-mono">{thermalResult.stableOperatingTemperatureRangeVi}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hydrodynamic Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  Thông Số Thủy Động Carbon Felt
                </span>
                <span className="text-xs text-emerald-400 font-mono">λ = {hydroResult.stoichiometricFlowFactor}x</span>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Nhiệt Độ Vận Hành</span>
                  <span className="font-semibold text-slate-200">{temperatureC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="55"
                  step="0.5"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5°C (Đóng băng muối)</span>
                  <span>25°C (Tiêu chuẩn)</span>
                  <span>55°C (Kết tủa V₂O₅)</span>
                </div>
              </div>

              {/* Current Density */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mật Độ Dòng Điện (mA/cm²)</span>
                  <span className="font-semibold text-slate-200">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="260"
                  step="5"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Flow Rate Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Lưu Lượng Bơm (L/phút/cell)</span>
                  <span className="font-semibold text-slate-200">{flowRateLMin.toFixed(1)} L/min</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.1"
                  value={flowRateLMin}
                  onChange={(e) => setFlowRateLMin(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.5 L/min (Phân cực nồng độ)</span>
                  <span>Tối ưu (2-3 L/min)</span>
                  <span>6.0 L/min (Tổn thất bơm lớn)</span>
                </div>
              </div>

              {/* Hydrodynamic Readouts */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Độ Nhớt Catholyte</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {hydroResult.catholyteViscosityMpaS} mPa·s
                  </div>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Tổn Thất Áp Suất (ΔP)</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-1">
                    {hydroResult.hydraulicPressureDropKpa} kPa
                  </div>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Công Suất Bơm Ký Sinh</div>
                  <div className="text-base font-bold font-mono text-rose-400 mt-1">
                    {hydroResult.pumpingPowerPerCellWatts} W/cell
                  </div>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Hiệu Suất Thực Tế (Net)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {hydroResult.netDischargeEfficiencyPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Net Efficiency vs Flow Rate Curve */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Đường Cong Đánh Đổi: Hiệu Suất Hệ Thống vs Lưu Lượng Bơm
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  η_net = {hydroResult.netDischargeEfficiencyPercent}%
                </span>
              </div>

              {/* SVG Curve */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="100" x2="480" y2="100" stroke="#1E293B" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Y Axis labels (Efficiency %) */}
                  <text x="42" y="25" textAnchor="end" fill="#94A3B8" fontSize="10">88%</text>
                  <text x="42" y="100" textAnchor="end" fill="#94A3B8" fontSize="10">75%</text>
                  <text x="42" y="180" textAnchor="end" fill="#94A3B8" fontSize="10">60%</text>

                  {/* X Axis labels (Flow Rate L/min) */}
                  <text x="50" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">0.8</text>
                  <text x="180" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">2.5</text>
                  <text x="320" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">4.5</text>
                  <text x="460" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">6.5 L/min</text>

                  {/* Generate Curve Path */}
                  {(() => {
                    const minEff = 60.0;
                    const maxEff = 88.0;
                    const minQ = 0.8;
                    const maxQ = 6.5;

                    const getX = (q: number) => 50 + ((q - minQ) / (maxQ - minQ)) * 410;
                    const getY = (eff: number) => 180 - ((eff - minEff) / (maxEff - minEff)) * 160;

                    const pathStr = flowEfficiencyCurvePoints
                      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.flowRate)} ${getY(p.netEfficiency)}`)
                      .join(' ');

                    const currentX = getX(flowRateLMin);
                    const currentY = getY(hydroResult.netDischargeEfficiencyPercent);

                    return (
                      <g>
                        <path d={pathStr} fill="none" stroke="#10B981" strokeWidth="3" />
                        {/* Current Operating Point */}
                        <circle cx={currentX} cy={currentY} r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                        <line x1={currentX} y1="20" x2={currentX} y2="180" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
                        <text x={currentX + 8} y={Math.max(35, currentY - 8)} fill="#FDE68A" fontSize="10" fontWeight="bold">
                          {hydroResult.netDischargeEfficiencyPercent}% ({flowRateLMin} L/min)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Explanation Note */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-emerald-400">Quy Luật Tối Ưu Hóa:</span> Tại lưu lượng bơm thấp (&lt;1.5 L/min), quá thế phân cực nồng độ làm sụt áp tế bào. Tại lưu lượng cao (&gt;4.0 L/min), tổn thất áp suất Darcy-Forchheimer qua nỉ carbon tăng phi tuyến làm tổn hao công suất bơm ký sinh. Điểm cực trị tối ưu đạt tại λ = 2.5 - 3.5.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Decoupled Multi-MW / Multi-MWh Grid Storage Plant */}
      {activeMode === 'GRID_SCALE_DECOUPLED_PLANT' && (
        <div className="space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Cấu Hình Lưới Điển Hình:</span>
            {[
              { label: '5 MW / 20 MWh (Solar Peaker 4h)', mw: 5, h: 4 },
              { label: '10 MW / 40 MWh (Substation Chuẩn 4h)', mw: 10, h: 4 },
              { label: '10 MW / 80 MWh (LDES Đêm 8h)', mw: 10, h: 8 },
              { label: '20 MW / 160 MWh (Wind Farm Firming 8h)', mw: 20, h: 8 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  sound.playUiClick();
                  setGridRatedPowerMw(preset.mw);
                  setGridStorageHours(preset.h);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  gridRatedPowerMw === preset.mw && gridStorageHours === preset.h
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Plant Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-emerald-400" />
                  Quy Mô Nhà Máy LDES
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  {gridPlantResult.totalCapacityMwh} MWh
                </span>
              </div>

              {/* Power Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Công Suất Danh Định (MW)</span>
                  <span className="font-semibold text-slate-200">{gridRatedPowerMw} MW</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={gridRatedPowerMw}
                  onChange={(e) => setGridRatedPowerMw(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Storage Duration Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Thời Gian Lưu Trữ Xả Sâu (Giờ)</span>
                  <span className="font-semibold text-slate-200">{gridStorageHours} Giờ</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={gridStorageHours}
                  onChange={(e) => setGridStorageHours(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Economics Decoupled Sizing Metrics */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Suất Đầu Tư (CapEx / kWh):</span>
                  <span className="font-bold font-mono text-emerald-400">${gridPlantResult.capitalCostPerKwhUsd} / kWh</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Chi Phí Stack Module (MW):</span>
                  <span className="font-mono text-slate-300">${gridPlantResult.stackCapExMillionUsd} Triệu USD</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Chi Phí Điện Giải & Bể Chứa:</span>
                  <span className="font-mono text-slate-300">${gridPlantResult.electrolyteCapExMillionUsd} Triệu USD</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1.5 flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Tổng Vốn Đầu Tư (CapEx):</span>
                  <span className="font-mono text-cyan-400">${gridPlantResult.totalCapExMillionUsd} Triệu USD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Inventory & Decarbonization */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Định Mức Vật Tư & Giảm Phát Thải Carbon
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  RTE: {gridPlantResult.systemRoundTripEfficiencyPercent}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Số Cụm Stack (50 kW)</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                    {gridPlantResult.stackCount} cụm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{gridPlantResult.totalCellCount.toLocaleString()} tế bào</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Thể Tích Điện Giải (Tổng)</div>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                    {gridPlantResult.totalElectrolyteVolumeM3.toLocaleString()} m³
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Bể nhựa HDPE 2 buồng</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Tương Đương V₂O₅</div>
                  <div className="text-lg font-bold font-mono text-purple-400 mt-1">
                    {gridPlantResult.vanadiumPentoxideEquivalentTons.toLocaleString()} tấn
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Thu hồi từ xỉ luyện kim</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 sm:col-span-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Giảm Phát Thải CO₂ Thay Thế Điện Khí Peaker</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        {gridPlantResult.avoidedPeakerCo2TonsPerYear.toLocaleString()} tấn CO₂/năm
                      </div>
                    </div>
                    <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/40">
                      <Wind className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decoupling Advantage Explanation */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Ưu Thế Cạnh Tranh Tuyệt Đối So Với Pin Lithium-ion:
                </div>
                <p>
                  1. <span className="font-semibold text-white">Tách rời Công suất & Năng lượng:</span> Muốn tăng thời gian tích điện từ 4h lên 8h, nhà máy chỉ cần mở rộng bể chứa dung dịch giá rẻ ($135/kWh) mà không cần mua thêm cụm pin stack ($450/kW).
                </p>
                <p>
                  2. <span className="font-semibold text-white">Không Suy Giảm Dung Lượng:</span> Cùng một nguyên tố Vanadi ở 2 buồng, chống suy thoái chéo vĩnh viễn với tuổi thọ &gt;25 năm (&gt;20.000 chu kỳ).
                </p>
                <p>
                  3. <span className="font-semibold text-white">An Toàn Cháy Nổ 100%:</span> Dung dịch điện giải gốc nước không thể bốc cháy hay thoát nhiệt.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
