// src/components/visualizations/PhotocatalyticArtificialPhotosynthesisVisualizer.tsx
// Interactive Visualizer: Photocatalytic Artificial Photosynthesis & Z-Scheme Water Splitting
// Conforms to: IUPAC Photochemistry, Semiconductor Bandgap Engineering, Nernstian Thermodynamics & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  Sparkles,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle,
  Info,
  Scale,
  Car,
  Leaf,
  Sliders,
  BarChart3,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  PhotocatalystId,
  PHOTOCATALYST_CATALOG,
  Z_SCHEME_CATALOG,
  Z_SCHEME_RELAYS,
  calculateWaterSplittingThermodynamics,
  evaluateBandAlignmentFeasibility,
  calculateSolarHydrogenProduction,
  calculateApparentQuantumYield,
  HYDROGEN_PRODUCTION_TECH_COMPARISON
} from '../../domain/photocatalyticArtificialPhotosynthesisEngine';
import { sound } from '../../audio/soundEngine';

type PhotosynthesisMode =
  | 'Z_SCHEME_BAND_DIAGRAM'
  | 'SOLAR_PANEL_ARRAY_SIMULATOR'
  | 'AQY_AND_TECH_COMPARISON';

export const PhotocatalyticArtificialPhotosynthesisVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PhotosynthesisMode>('Z_SCHEME_BAND_DIAGRAM');
  
  // Mode 1 state: Band alignment & Z-Scheme
  const [selectedSystemId, setSelectedSystemId] = useState<string>('DOMEN_SRTIO3_BIVO4_SHEET');
  const [phValue, setPhValue] = useState<number>(7.0);

  // Mode 2 state: Solar panel production simulation
  const [panelAreaM2, setPanelAreaM2] = useState<number>(100);
  const [sthEfficiencyPct, setSthEfficiencyPct] = useState<number>(1.20);
  const [solarIrradianceW, setSolarIrradianceW] = useState<number>(1000);
  const [sunHours, setSunHours] = useState<number>(5.5);

  // Mode 3 state: AQY wavelength
  const [monochromaticWavelengthNm, setMonochromaticWavelengthNm] = useState<number>(420);
  const [monochromaticLightIntensityMw, setMonochromaticLightIntensityMw] = useState<number>(50);
  const [h2EvolutionRateUmolH, setH2EvolutionRateUmolH] = useState<number>(150);

  const selectedSystem = useMemo(() => {
    return Z_SCHEME_CATALOG.find(s => s.id === selectedSystemId) || Z_SCHEME_CATALOG[0];
  }, [selectedSystemId]);

  const hepMaterial = useMemo(() => PHOTOCATALYST_CATALOG[selectedSystem.hepId], [selectedSystem]);
  const oepMaterial = useMemo(() => PHOTOCATALYST_CATALOG[selectedSystem.oepId], [selectedSystem]);
  const relayInfo = useMemo(() => Z_SCHEME_RELAYS[selectedSystem.relayType], [selectedSystem]);

  // Calculations for Mode 1
  const thermo = useMemo(() => calculateWaterSplittingThermodynamics(phValue), [phValue]);
  const feasibility = useMemo(() => {
    return evaluateBandAlignmentFeasibility(selectedSystem.hepId, selectedSystem.oepId, phValue);
  }, [selectedSystem, phValue]);

  // Calculations for Mode 2
  const farmProduction = useMemo(() => {
    return calculateSolarHydrogenProduction(panelAreaM2, sthEfficiencyPct, solarIrradianceW, sunHours);
  }, [panelAreaM2, sthEfficiencyPct, solarIrradianceW, sunHours]);

  // Calculations for Mode 3
  const aqyData = useMemo(() => {
    return calculateApparentQuantumYield(
      monochromaticWavelengthNm,
      h2EvolutionRateUmolH,
      monochromaticLightIntensityMw
    );
  }, [monochromaticWavelengthNm, h2EvolutionRateUmolH, monochromaticLightIntensityMw]);

  const handleModeSwitch = (mode: PhotosynthesisMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleSystemSelect = (sysId: string) => {
    sound.playUiClick();
    setSelectedSystemId(sysId);
    const sys = Z_SCHEME_CATALOG.find(s => s.id === sysId);
    if (sys) {
      setSthEfficiencyPct(sys.nominalSthEfficiencyPct);
    }
  };

  // Helper to map V vs NHE (-1.5 V to +3.0 V) to SVG Y coordinate (30px to 270px)
  const mapPotentialToY = (potentialV: number) => {
    const minV = -1.5; // top of diagram (more negative)
    const maxV = 3.0;  // bottom of diagram (more positive)
    const minY = 30;
    const maxY = 270;
    const clamped = Math.max(minV, Math.min(maxV, potentialV));
    return minY + ((clamped - minV) / (maxV - minV)) * (maxY - minY);
  };

  // Adjust CB and VB for pH shift (-0.0591 V per pH)
  const phShift = -0.05916 * phValue;
  const hepCbY = mapPotentialToY(hepMaterial.conductionBandMinV + phShift);
  const hepVbY = mapPotentialToY(hepMaterial.valenceBandMaxV + phShift);
  const oepCbY = mapPotentialToY(oepMaterial.conductionBandMinV + phShift);
  const oepVbY = mapPotentialToY(oepMaterial.valenceBandMaxV + phShift);

  const herLineY = mapPotentialToY(thermo.herPotentialVVsNHE);
  const oerLineY = mapPotentialToY(thermo.oerPotentialVVsNHE);

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 text-amber-400 border border-amber-500/30">
              <Sun className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Quang Phân Tách Nước & Quang Hợp Nhân Tạo Z-Scheme
              </h2>
              <p className="text-xs text-slate-400">
                Mô phỏng cơ chế Z-Scheme hai vùng hấp thụ, định luật Nernst, hiệu suất STH (Solar-to-Hydrogen) & AQY
              </p>
            </div>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeSwitch('Z_SCHEME_BAND_DIAGRAM')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'Z_SCHEME_BAND_DIAGRAM'
                ? 'bg-amber-600/30 border border-amber-500 text-amber-300 shadow-md shadow-amber-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sơ Đồ Dải Năng Lượng Z-Scheme
          </button>
          <button
            onClick={() => handleModeSwitch('SOLAR_PANEL_ARRAY_SIMULATOR')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SOLAR_PANEL_ARRAY_SIMULATOR'
                ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Mô Phỏng Nông Trại Hydro STH
          </button>
          <button
            onClick={() => handleModeSwitch('AQY_AND_TECH_COMPARISON')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'AQY_AND_TECH_COMPARISON'
                ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Hiệu Suất Lượng Tử AQY & 3 Công Nghệ
          </button>
        </div>
      </div>

      {/* MODE 1: Z-SCHEME BAND DIAGRAM */}
      {activeMode === 'Z_SCHEME_BAND_DIAGRAM' && (
        <div className="space-y-6">
          {/* Controls: System Selector & pH Slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Chọn Cấu Hình Hệ Thống Xúc Tác Quang:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Z_SCHEME_CATALOG.map(sys => (
                  <button
                    key={sys.id}
                    onClick={() => handleSystemSelect(sys.id)}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                      selectedSystemId === sys.id
                        ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                        : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-[13px]">{sys.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      STH: <span className="text-emerald-400 font-bold">{sys.nominalSthEfficiencyPct}%</span> | AQY: {sys.aqyAt420nmPct}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* pH Slider with Nernst Shift */}
            <div className="space-y-3 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  Độ pH Dung Dịch:
                </span>
                <span className="text-sm font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  pH = {phValue.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="0.5"
                value={phValue}
                onChange={e => {
                  sound.playUiClick();
                  setPhValue(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>
                  Thế khử proton E(H⁺/H₂):{' '}
                  <span className="text-cyan-400 font-semibold">{thermo.herPotentialVVsNHE.toFixed(2)} V</span>
                </div>
                <div>
                  Thế oxy hóa nước E(O₂/H₂O):{' '}
                  <span className="text-rose-400 font-semibold">+{thermo.oerPotentialVVsNHE.toFixed(2)} V</span>
                </div>
                <div className="text-[10px] text-slate-500 italic">
                  Dịch chuyển Nernst: -0.059 V / đơn vị pH (ΔE = 1.23 V)
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Band Energy Diagram */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 px-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Activity className="w-4 h-4 text-amber-400" />
                Sơ Đồ Dải Vùng Bán Dẫn & Đường Tái Hợp Z-Scheme (V vs NHE)
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-cyan-400 inline-block"></span> E(H⁺/H₂) Khử
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-rose-400 inline-block"></span> E(O₂/H₂O) Oxy Hóa
                </span>
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <svg viewBox="0 0 800 300" className="w-full h-72 select-none">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="hepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="oepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#be123c" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                  </marker>
                  <marker id="recombArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Energy scale axis (left) */}
                <line x1="50" y1="30" x2="50" y2="270" stroke="#475569" strokeWidth="2" />
                {[-1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map(v => {
                  const y = mapPotentialToY(v);
                  return (
                    <g key={v}>
                      <line x1="45" y1={y} x2="50" y2={y} stroke="#64748b" strokeWidth="1.5" />
                      <text x="38" y={y + 3} fill="#94a3b8" fontSize="10" textAnchor="end">
                        {v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1)}
                      </text>
                    </g>
                  );
                })}
                <text x="25" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 25 150)">
                  Thế Điện Cực E (V vs NHE)
                </text>

                {/* HER Redox Line */}
                <line x1="50" y1={herLineY} x2="780" y2={herLineY} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="775" y={herLineY - 4} fill="#38bdf8" fontSize="10" textAnchor="end" fontWeight="bold">
                  E(H⁺/H₂) = {thermo.herPotentialVVsNHE.toFixed(2)} V
                </text>

                {/* OER Redox Line */}
                <line x1="50" y1={oerLineY} x2="780" y2={oerLineY} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="775" y={oerLineY + 12} fill="#f43f5e" fontSize="10" textAnchor="end" fontWeight="bold">
                  E(O₂/H₂O) = +{thermo.oerPotentialVVsNHE.toFixed(2)} V
                </text>

                {/* HEP Semiconductor Block (Left) */}
                <g transform="translate(130, 0)">
                  <rect
                    x="0"
                    y={Math.min(hepCbY, hepVbY)}
                    width="180"
                    height={Math.abs(hepVbY - hepCbY)}
                    fill="url(#hepGrad)"
                    stroke="#0284c7"
                    strokeWidth="2"
                    rx="6"
                  />
                  {/* Conduction band label */}
                  <text x="90" y={hepCbY - 6} fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                    CB: {(hepMaterial.conductionBandMinV + phShift).toFixed(2)} V
                  </text>
                  {/* Valence band label */}
                  <text x="90" y={hepVbY + 14} fill="#bae6fd" fontSize="11" textAnchor="middle">
                    VB: {(hepMaterial.valenceBandMaxV + phShift).toFixed(2)} V
                  </text>
                  {/* Material Name & Eg */}
                  <text x="90" y={(hepCbY + hepVbY) / 2 - 6} fill="#ffffff" fontSize="13" textAnchor="middle" fontWeight="bold">
                    {hepMaterial.name.split('(')[0].trim()}
                  </text>
                  <text x="90" y={(hepCbY + hepVbY) / 2 + 10} fill="#7dd3fc" fontSize="11" textAnchor="middle">
                    Eg = {hepMaterial.bandgapEv.toFixed(2)} eV (HEP - H₂ Sinh)
                  </text>

                  {/* Photon excitation h*nu arrow */}
                  <line x1="40" y1={hepVbY - 10} x2="40" y2={hepCbY + 15} stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="25" y={(hepCbY + hepVbY) / 2} fill="#fbbf24" fontSize="11" fontWeight="bold">
                    hν
                  </text>

                  {/* Photoelectrons on CB driving HER */}
                  <circle cx="140" cy={hepCbY + 10} r="8" fill="#38bdf8" />
                  <text x="140" y={hepCbY + 13} fill="#0f172a" fontSize="10" textAnchor="middle" fontWeight="bold">e⁻</text>
                  
                  {/* HER Cocatalyst Nano-island */}
                  <rect x="110" y={hepCbY - 22} width="60" height="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="4" />
                  <text x="140" y={hepCbY - 10} fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {selectedSystem.herCocatalyst.split(' ')[0]}
                  </text>
                  {/* Reaction Bubble */}
                  <text x="140" y={hepCbY - 26} fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">
                    2H⁺ + 2e⁻ → H₂ ↑
                  </text>
                </g>

                {/* Central Relay / Ohmic Contact Sheet */}
                <g transform="translate(355, 0)">
                  <rect x="0" y="45" width="90" height="210" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" rx="8" />
                  <text x="45" y="70" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Tiếp Xúc Ohmic
                  </text>
                  <text x="45" y="85" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    {relayInfo.formula}
                  </text>

                  {/* Z-Scheme Recombination Path: OEP CB -> Relay -> HEP VB */}
                  <path
                    d={`M 140 ${oepCbY + 10} L 45 160 L -45 ${hepVbY - 10}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    markerEnd="url(#recombArrow)"
                  />
                  <rect x="10" y="145" width="70" height="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" rx="4" />
                  <text x="45" y="158" fill="#fcd34d" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Tái Hợp e⁻ + h⁺
                  </text>
                  <text x="45" y="169" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Khép Mạch Z
                  </text>
                </g>

                {/* OEP Semiconductor Block (Right) */}
                <g transform="translate(490, 0)">
                  <rect
                    x="0"
                    y={Math.min(oepCbY, oepVbY)}
                    width="180"
                    height={Math.abs(oepVbY - oepCbY)}
                    fill="url(#oepGrad)"
                    stroke="#e11d48"
                    strokeWidth="2"
                    rx="6"
                  />
                  {/* Conduction band label */}
                  <text x="90" y={oepCbY - 6} fill="#fda4af" fontSize="11" textAnchor="middle">
                    CB: {(oepMaterial.conductionBandMinV + phShift).toFixed(2)} V
                  </text>
                  {/* Valence band label */}
                  <text x="90" y={oepVbY + 14} fill="#f43f5e" fontSize="11" textAnchor="middle" fontWeight="bold">
                    VB: {(oepMaterial.valenceBandMaxV + phShift).toFixed(2)} V
                  </text>
                  {/* Material Name & Eg */}
                  <text x="90" y={(oepCbY + oepVbY) / 2 - 6} fill="#ffffff" fontSize="13" textAnchor="middle" fontWeight="bold">
                    {oepMaterial.name.split('(')[0].trim()}
                  </text>
                  <text x="90" y={(oepCbY + oepVbY) / 2 + 10} fill="#fca5a5" fontSize="11" textAnchor="middle">
                    Eg = {oepMaterial.bandgapEv.toFixed(2)} eV (OEP - O₂ Sinh)
                  </text>

                  {/* Photon excitation h*nu arrow */}
                  <line x1="40" y1={oepVbY - 10} x2="40" y2={oepCbY + 15} stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="25" y={(oepCbY + oepVbY) / 2} fill="#fbbf24" fontSize="11" fontWeight="bold">
                    hν
                  </text>

                  {/* Photoholes on VB driving OER */}
                  <circle cx="140" cy={oepVbY - 10} r="8" fill="#f43f5e" />
                  <text x="140" y={oepVbY - 7} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">h⁺</text>

                  {/* OER Cocatalyst Nano-island */}
                  <rect x="110" y={oepVbY + 6} width="60" height="18" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" rx="4" />
                  <text x="140" y={oepVbY + 18} fill="#fda4af" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {selectedSystem.oerCocatalyst.split(' ')[0]}
                  </text>
                  {/* Reaction Bubble */}
                  <text x="140" y={oepVbY + 36} fill="#fb7185" fontSize="11" textAnchor="middle" fontWeight="bold">
                    2H₂O + 4h⁺ → O₂ ↑ + 4H⁺
                  </text>
                </g>
              </svg>
            </div>

            {/* Feasibility Evaluation Card */}
            <div className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 ${
              feasibility.isFeasible
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              {feasibility.isFeasible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {feasibility.isFeasible ? 'Hệ Z-Scheme Đạt Chuẩn Động Học Quang Hóa' : 'Hệ Thống Không Khả Thi Về Nhiệt Động Học'}
                </div>
                <div>{feasibility.assessment}</div>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-300 pt-1">
                  <span>Lực khử proton: <b className="text-cyan-300">+{feasibility.herDrivingForceV} V</b></span>
                  <span>Lực oxy hóa nước: <b className="text-rose-300">+{feasibility.oerDrivingForceV} V</b></span>
                  <span>Giới hạn phổ hấp thụ: <b className="text-amber-300">{feasibility.wavelengthLimitNm} nm</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SOLAR HYDROGEN FARM SIMULATOR */}
      {activeMode === 'SOLAR_PANEL_ARRAY_SIMULATOR' && (
        <div className="space-y-6">
          {/* Controls: Area, STH, Irradiance, Sun Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            {/* Panel Area Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Diện Tích Tấm Thu (m²):</span>
                <span className="text-amber-400 font-bold">{panelAreaM2.toLocaleString()} m²</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={panelAreaM2}
                onChange={e => {
                  sound.playUiClick();
                  setPanelAreaM2(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>10 m² (Mái nhà)</span>
                <span>1,000 m² (Trang trại)</span>
              </div>
            </div>

            {/* STH Efficiency Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Hiệu Suất STH (%):</span>
                <span className="text-emerald-400 font-bold">{sthEfficiencyPct.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="10.0"
                step="0.1"
                value={sthEfficiencyPct}
                onChange={e => {
                  sound.playUiClick();
                  setSthEfficiencyPct(parseFloat(e.target.value));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>0.2% (Chuẩn TiO₂)</span>
                <span>10.0% (Mục tiêu TM)</span>
              </div>
            </div>

            {/* Solar Irradiance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Bức Xạ Mặt Trời:</span>
                <span className="text-cyan-400 font-bold">{solarIrradianceW} W/m²</span>
              </div>
              <input
                type="range"
                min="400"
                max="1200"
                step="50"
                value={solarIrradianceW}
                onChange={e => {
                  sound.playUiClick();
                  setSolarIrradianceW(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>400 W/m² (Mây mù)</span>
                <span>1,000 W/m² (AM1.5G)</span>
              </div>
            </div>

            {/* Sun hours per day */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Số Giờ Nắng Đỉnh:</span>
                <span className="text-rose-400 font-bold">{sunHours.toFixed(1)} h/ngày</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="8.0"
                step="0.5"
                value={sunHours}
                onChange={e => {
                  sound.playUiClick();
                  setSunHours(parseFloat(e.target.value));
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>3.5h (Miền Bắc)</span>
                <span>5.5h - 6h (Ninh Thuận)</span>
              </div>
            </div>
          </div>

          {/* Farm Output Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Sản Lượng Hydro H₂</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {farmProduction.hydrogenDailyKg} <span className="text-sm font-normal text-emerald-400">kg/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Tương đương <span className="text-slate-200 font-semibold">{farmProduction.hydrogenRateGramsPerHour} g/h</span> ({farmProduction.hydrogenRateMolPerHour} mol/h)
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Khí Oxy O₂ Đồng Sinh</span>
                <Droplets className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {farmProduction.oxygenDailyKg} <span className="text-sm font-normal text-cyan-400">kg/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Tiêu thụ <span className="text-cyan-200 font-semibold">{farmProduction.cleanWaterConsumedLitersPerDay} L</span> nước tinh khiết/ngày
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Quãng Đường Xe FCEV</span>
                <Car className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">
                {farmProduction.equivalentCleanFuelKmPerDay.toLocaleString()} <span className="text-sm font-normal text-amber-400">km/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Dựa trên định mức 105 km/kg H₂ cho xe Toyota Mirai
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Cắt Giảm CO₂ Hóa Thạch</span>
                <Leaf className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-black text-green-300">
                {farmProduction.fossilCo2AvoidedKgPerDay} <span className="text-sm font-normal text-green-400">kg CO₂/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                So sánh với hydro xám từ khí metan (SMR 10.5 kg CO₂/kg)
              </div>
            </div>
          </div>

          {/* Visual Schematic of Bag Panel Solar Collector */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              Sơ Đồ Tấm Panel Túi Nước Quang Phân Tách Mặt Trời Thực Nghiệm (Water-Bag Panel Reactor)
            </div>
            <div className="h-44 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center p-4">
              <svg viewBox="0 0 600 140" className="w-full h-full select-none">
                {/* Sunlight rays */}
                {[50, 110, 170, 230, 290, 350, 410, 470, 530].map(x => (
                  <line key={x} x1={x - 20} y1="10" x2={x + 10} y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                ))}
                <text x="300" y="25" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Bức Xạ Mặt Trời Tự Nhiên AM1.5G (1,000 W/m²)
                </text>

                {/* Glass / Plastic Cover */}
                <rect x="30" y="50" width="540" height="8" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1" rx="2" />

                {/* Water layer */}
                <rect x="30" y="58" width="540" height="40" fill="#0369a1" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1" />
                <text x="300" y="82" fill="#7dd3fc" fontSize="11" textAnchor="middle">
                  Lớp Nước Mỏng (Độ sâu 1 - 2 mm phủ trên tấm xúc tác quang học Z-Scheme)
                </text>

                {/* Bubbles H2 & O2 */}
                {[70, 140, 210, 280, 350, 420, 490].map((bx, i) => (
                  <g key={bx}>
                    <circle cx={bx} cy={70 + (i % 3) * 6} r={3 + (i % 2)} fill={i % 2 === 0 ? "#4ade80" : "#38bdf8"} />
                    <text x={bx + 6} y={72 + (i % 3) * 6} fill={i % 2 === 0 ? "#4ade80" : "#38bdf8"} fontSize="8" fontWeight="bold">
                      {i % 2 === 0 ? "H₂" : "O₂"}
                    </text>
                  </g>
                ))}

                {/* Photocatalyst Sheet Layer */}
                <rect x="30" y="98" width="540" height="12" fill="#eab308" fillOpacity="0.8" stroke="#ca8a04" strokeWidth="1" rx="1" />
                <text x="300" y="108" fill="#1e293b" fontSize="9" textAnchor="middle" fontWeight="bold">
                  Tấm Màng Phức Hợp Z-Scheme (SrTiO₃:Rh / Au-rGO / BiVO₄:Mo)
                </text>

                {/* Base substrate */}
                <rect x="30" y="110" width="540" height="15" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                <text x="300" y="122" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Đế Nhựa Polymer Chi Phí Thấp (~ $12/m²)
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: AQY & 3-TECH COMPARISON */}
      {activeMode === 'AQY_AND_TECH_COMPARISON' && (
        <div className="space-y-6">
          {/* AQY Monochromatic Light Testing */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Hiệu Suất Lượng Tử Biểu Kiến (AQY - Apparent Quantum Yield)
                </h3>
                <p className="text-xs text-slate-400">
                  AQY(λ) = [2 × Tốc độ sinh phân tử H₂] / [Số lượng photon tới] × 100%
                </p>
              </div>

              {/* Monochromatic wavelength picker */}
              <div className="flex flex-wrap gap-1.5">
                {[365, 420, 450, 500, 550, 600].map(wl => (
                  <button
                    key={wl}
                    onClick={() => {
                      sound.playUiClick();
                      setMonochromaticWavelengthNm(wl);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      monochromaticWavelengthNm === wl
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {wl} nm
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/50">
              <div className="space-y-1">
                <div className="text-xs text-slate-400">Bước sóng đang chiếu:</div>
                <div className="text-lg font-bold text-amber-300">{monochromaticWavelengthNm} nm</div>
                <div className="text-[11px] text-slate-500">
                  {monochromaticWavelengthNm < 400 ? 'Vùng Tử Ngoại (UV)' : 'Vùng Ánh Sáng Khả Kiến (Visible Light)'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400">Tốc độ sinh H₂ thực nghiệm:</div>
                <div className="text-lg font-bold text-emerald-300">{h2EvolutionRateUmolH} μmol/h</div>
                <div className="text-[11px] text-slate-500">
                  Cường độ đèn chiếu: {monochromaticLightIntensityMw} mW
                </div>
              </div>

              <div className="space-y-1 bg-amber-950/30 p-2 rounded border border-amber-500/30">
                <div className="text-xs text-amber-300 font-semibold">Giá trị AQY đo được:</div>
                <div className="text-2xl font-black text-amber-400">{aqyData.aqyPct}%</div>
                <div className="text-[10px] text-amber-200/80">{aqyData.explanation}</div>
              </div>
            </div>
          </div>

          {/* Technical Comparison Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              So Sánh Kỹ Thuật 3 Công Nghệ Sản Xuất Hydro Tái Tạo
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {HYDROGEN_PRODUCTION_TECH_COMPARISON.map(tech => (
                <div
                  key={tech.name}
                  className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-sm text-cyan-300">{tech.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Chi phí đầu tư (CAPEX):</span>
                        <span className="font-bold text-amber-400">${tech.capitalCostUsdPerM2} / m²</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hiệu suất tương đương:</span>
                        <span className="font-bold text-emerald-400">{tech.overallEfficiencyPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Nguồn điện ngoài (Bias):</span>
                        <span className="font-semibold text-slate-200">
                          {tech.externalBiasRequired ? 'Cần (Grid/DC)' : 'Không cần (0 V)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Độ phức tạp hệ thống:</span>
                        <span className="font-semibold text-slate-200">{tech.systemComplexity}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-semibold text-emerald-400">Ưu điểm:</div>
                      <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                        {tech.pros.map((p, idx) => (
                          <li key={idx} className="leading-tight">{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-semibold text-rose-400">Thách thức:</div>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                        {tech.cons.map((c, idx) => (
                          <li key={idx} className="leading-tight">{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-700/50 pt-2 italic">
                    Khả năng mở rộng: {tech.scalabilityPotential}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
