// src/components/visualizations/CircularDichroismVisualizer.tsx
// Milestone 57: Circular Dichroism (CD) Spectroscopy & Protein Secondary Structure Deconvolution Visualizer
// Standards: Aimé Cotton (1896, Cotton effect), Jean-Baptiste Biot (1815, Optical Rotation), Woody (1995), Provencher (1981, CONTIN)
// Curriculum: Vietnam GDPT 2018 (Hóa học 12: Cấu trúc bậc II, III của Protein, liên kết peptid, liên kết hydro; Sinh học 10: Cấu trúc không gian của protein; Vật lý 12: Sự phân cực ánh sáng và hoạt tính quang học)

import React, { useState, useMemo } from 'react';
import {
  CD_PROTEIN_CATALOG,
  CdProteinStandard,
  generateFarUvCdSpectrum,
  generateNearUvCdSpectrum,
  generateThermalMeltingCurve,
  deconvolveSecondaryStructure,
  estimateHelixFractionChenYang,
  calculateFractionUnfolded
} from '../../domain/circularDichroismEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Layers,
  Award,
  Sparkles,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
  Flame,
  ShieldAlert,
  Compass,
  Zap,
  Thermometer,
  RotateCcw,
  Eye,
  FileText
} from 'lucide-react';

export interface CircularDichroismVisualizerProps {
  initialProteinId?: string;
}

export const CircularDichroismVisualizer: React.FC<CircularDichroismVisualizerProps> = ({
  initialProteinId
}) => {
  const [selectedProteinId, setSelectedProteinId] = useState<string>(
    initialProteinId || 'myoglobin'
  );
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [denaturantMolar, setDenaturantMolar] = useState<number>(0.0);
  const [spectralMode, setSpectralMode] = useState<'far_uv_secondary' | 'near_uv_tertiary' | 'thermal_denaturation'>('far_uv_secondary');
  const [showDeconvolutionOverlay, setShowDeconvolutionOverlay] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'cotton_chiral_optics' | 'secondary_deconvolution' | 'thermal_stability' | 'nobel_curriculum_gdpt'>('secondary_deconvolution');

  const selectedProtein = useMemo(() => {
    return CD_PROTEIN_CATALOG.find((p) => p.id === selectedProteinId) || CD_PROTEIN_CATALOG[0];
  }, [selectedProteinId]);

  // Generate Far-UV spectrum
  const farUvSpectrum = useMemo(() => {
    return generateFarUvCdSpectrum(selectedProtein, temperatureCelsius, denaturantMolar);
  }, [selectedProtein, temperatureCelsius, denaturantMolar]);

  // Generate Near-UV spectrum
  const nearUvSpectrum = useMemo(() => {
    return generateNearUvCdSpectrum(selectedProtein, temperatureCelsius);
  }, [selectedProtein, temperatureCelsius]);

  // Generate Thermal Melting points
  const thermalCurve = useMemo(() => {
    return generateThermalMeltingCurve(selectedProtein);
  }, [selectedProtein]);

  // Secondary structure deconvolution
  const deconvolution = useMemo(() => {
    return deconvolveSecondaryStructure(farUvSpectrum);
  }, [farUvSpectrum]);

  // Chen-Yang helix estimation from 222 nm
  const chenYangHelix = useMemo(() => {
    const pt222 = farUvSpectrum.find((p) => p.wavelength === 222);
    return pt222 ? estimateHelixFractionChenYang(pt222.mre) : 0;
  }, [farUvSpectrum]);

  // Unfolded fraction
  const fractionUnfolded = useMemo(() => {
    const effTm = selectedProtein.tmCelsius - denaturantMolar * 5.5;
    return calculateFractionUnfolded(temperatureCelsius, effTm, selectedProtein.deltaHkJmol);
  }, [selectedProtein, temperatureCelsius, denaturantMolar]);

  const handleSelectProtein = (id: string) => {
    setSelectedProteinId(id);
    sound.playAlphaHelixResonanceTone();
  };

  const handleTempChange = (val: number) => {
    setTemperatureCelsius(val);
    sound.playCircularDichroismChiralHum();
  };

  const handleDenaturantChange = (val: number) => {
    setDenaturantMolar(val);
    sound.playCircularDichroismChiralHum();
  };

  // SVG dimensions for spectrum plot
  const svgW = 600;
  const svgH = 300;
  const pad = { top: 30, right: 30, bottom: 45, left: 65 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // Far-UV coordinate transforms
  const farUvWlMin = 190;
  const farUvWlMax = 260;
  const farUvMreMin = -45000;
  const farUvMreMax = 75000;

  const toFarUvX = (wl: number) => pad.left + ((wl - farUvWlMin) / (farUvWlMax - farUvWlMin)) * plotW;
  const toFarUvY = (mre: number) => pad.top + plotH - ((mre - farUvMreMin) / (farUvMreMax - farUvMreMin)) * plotH;

  const farUvPath = useMemo(() => {
    if (!farUvSpectrum.length) return '';
    return farUvSpectrum.reduce((acc, pt, idx) => {
      const x = toFarUvX(pt.wavelength);
      const y = toFarUvY(pt.mre);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [farUvSpectrum]);

  // Near-UV coordinate transforms
  const nearUvWlMin = 250;
  const nearUvWlMax = 320;
  const nearUvMreMin = -150;
  const nearUvMreMax = 450;

  const toNearUvX = (wl: number) => pad.left + ((wl - nearUvWlMin) / (nearUvWlMax - nearUvWlMin)) * plotW;
  const toNearUvY = (mre: number) => pad.top + plotH - ((mre - nearUvMreMin) / (nearUvMreMax - nearUvMreMin)) * plotH;

  const nearUvPath = useMemo(() => {
    if (!nearUvSpectrum.length) return '';
    return nearUvSpectrum.reduce((acc, pt, idx) => {
      const x = toNearUvX(pt.wavelength);
      const y = toNearUvY(pt.mre);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [nearUvSpectrum]);

  // Thermal melting coordinate transforms
  const tMin = 20;
  const tMax = 95;
  const tmreMin = -40000;
  const tmreMax = 5000;

  const toTX = (t: number) => pad.left + ((t - tMin) / (tMax - tMin)) * plotW;
  const toTY = (mre: number) => pad.top + plotH - ((mre - tmreMin) / (tmreMax - tmreMin)) * plotH;

  const thermalPath = useMemo(() => {
    if (!thermalCurve.length) return '';
    return thermalCurve.reduce((acc, pt, idx) => {
      const x = toTX(pt.temperatureC);
      const y = toTY(pt.mre222);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [thermalCurve]);

  // Key Far-UV inflection points
  const pt193 = farUvSpectrum.find((p) => p.wavelength === 193);
  const pt208 = farUvSpectrum.find((p) => p.wavelength === 208);
  const pt218 = farUvSpectrum.find((p) => p.wavelength === 218);
  const pt222 = farUvSpectrum.find((p) => p.wavelength === 222);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/40 text-indigo-400">
            <Atom className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                Circular Dichroism (CD) Spectroscopy & Protein Secondary Structure
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800 font-mono">
                COTTON EFFECT · FAR/NEAR-UV
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Differential Chiral Absorption (ΔA = A_L - A_R) · α-Helix / β-Sheet Deconvolution · Thermal Unfolding (T_m)
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('secondary_deconvolution')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'secondary_deconvolution'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Secondary Structure Deconv
          </button>
          <button
            onClick={() => setActiveTab('cotton_chiral_optics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'cotton_chiral_optics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Chiral Optics & Cotton Effect
          </button>
          <button
            onClick={() => setActiveTab('thermal_stability')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'thermal_stability'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Thermal Stability & T_m
          </button>
          <button
            onClick={() => setActiveTab('nobel_curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'nobel_curriculum_gdpt'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            IUPAC & GDPT 2018
          </button>
        </div>
      </div>

      {/* Protein Standard Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CD_PROTEIN_CATALOG.map((protein) => {
          const isSelected = protein.id === selectedProtein.id;
          return (
            <button
              key={protein.id}
              onClick={() => handleSelectProtein(protein.id)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                {protein.category.replace('-', ' ')}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                {protein.name.split(' (')[0]}
              </div>
              <div className="text-[11px] text-indigo-400 font-mono mt-1">
                {(protein.nativeFractions.alphaHelix * 100).toFixed(0)}% α · {(protein.nativeFractions.betaSheet * 100).toFixed(0)}% β
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Spectral Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-4">
          {/* Spectral Mode & Plot Options */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSpectralMode('far_uv_secondary')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  spectralMode === 'far_uv_secondary'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Far-UV (190-260 nm)
              </button>
              <button
                onClick={() => setSpectralMode('near_uv_tertiary')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  spectralMode === 'near_uv_tertiary'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Near-UV (250-320 nm)
              </button>
              <button
                onClick={() => setSpectralMode('thermal_denaturation')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  spectralMode === 'thermal_denaturation'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Melting [θ]₂₂₂ (T)
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              {spectralMode === 'far_uv_secondary' && (
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDeconvolutionOverlay}
                    onChange={(e) => setShowDeconvolutionOverlay(e.target.checked)}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Peak Markers</span>
                </label>
              )}
              <span className="font-mono text-indigo-400">
                T: {temperatureCelsius.toFixed(1)}°C
              </span>
            </div>
          </div>

          {/* SVG Spectrum Graphic */}
          <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-900 overflow-hidden">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="cdFarUvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="cdNearUvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="cdThermalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((frac) => (
                <line
                  key={`h-${frac}`}
                  x1={pad.left}
                  y1={pad.top + plotH * frac}
                  x2={svgW - pad.right}
                  y2={pad.top + plotH * frac}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Mode-specific plots */}
              {spectralMode === 'far_uv_secondary' && (
                <>
                  {/* Zero Baseline */}
                  <line
                    x1={pad.left}
                    y1={toFarUvY(0)}
                    x2={svgW - pad.right}
                    y2={toFarUvY(0)}
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text x={svgW - pad.right - 4} y={toFarUvY(0) - 5} fill="#64748b" fontSize="10" textAnchor="end">
                    Baseline [θ] = 0
                  </text>

                  {/* Far-UV Spectrum Curve */}
                  <path
                    d={farUvPath}
                    fill="none"
                    stroke="url(#cdFarUvGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Key Transition Markers */}
                  {showDeconvolutionOverlay && pt193 && (
                    <g transform={`translate(${toFarUvX(193)}, ${toFarUvY(pt193.mre)})`}>
                      <circle r="4" fill="#38bdf8" />
                      <text y="-8" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                        193 nm (π→π* ⊥)
                      </text>
                    </g>
                  )}
                  {showDeconvolutionOverlay && pt208 && (
                    <g transform={`translate(${toFarUvX(208)}, ${toFarUvY(pt208.mre)})`}>
                      <circle r="4" fill="#818cf8" />
                      <text y="16" fill="#818cf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                        208 nm (π→π* ∥)
                      </text>
                    </g>
                  )}
                  {showDeconvolutionOverlay && pt222 && (
                    <g transform={`translate(${toFarUvX(222)}, ${toFarUvY(pt222.mre)})`}>
                      <circle r="4" fill="#c084fc" />
                      <text y="16" fill="#c084fc" fontSize="10" textAnchor="middle" fontWeight="bold">
                        222 nm (n→π*)
                      </text>
                    </g>
                  )}
                  {showDeconvolutionOverlay && pt218 && selectedProtein.nativeFractions.betaSheet > 0.3 && (
                    <g transform={`translate(${toFarUvX(218)}, ${toFarUvY(pt218.mre)})`}>
                      <circle r="4" fill="#34d399" />
                      <text y="16" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">
                        218 nm (β-sheet)
                      </text>
                    </g>
                  )}

                  {/* Wavelength Ticks */}
                  {[190, 200, 210, 220, 230, 240, 250, 260].map((wl) => (
                    <g key={wl} transform={`translate(${toFarUvX(wl)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {wl}
                      </text>
                    </g>
                  ))}

                  {/* Y-Axis Ticks */}
                  {[-40000, -20000, 0, 20000, 40000, 60000].map((mre) => (
                    <g key={mre} transform={`translate(${pad.left}, ${toFarUvY(mre)})`}>
                      <line x2="-5" stroke="#475569" />
                      <text x="-8" y="3" fill="#94a3b8" fontSize="9" textAnchor="end">
                        {(mre / 1000).toFixed(0)}k
                      </text>
                    </g>
                  ))}
                  <text
                    x={-svgH / 2}
                    y="18"
                    transform="rotate(-90)"
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    [θ] Mean Residue Ellipticity (deg·cm²/dmol)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Wavelength λ (nm) — Far-UV Backbone Amide Region
                  </text>
                </>
              )}

              {spectralMode === 'near_uv_tertiary' && (
                <>
                  {/* Zero Baseline */}
                  <line
                    x1={pad.left}
                    y1={toNearUvY(0)}
                    x2={svgW - pad.right}
                    y2={toNearUvY(0)}
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Near-UV Curve */}
                  <path
                    d={nearUvPath}
                    fill="none"
                    stroke="url(#cdNearUvGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Aromatic Residue annotations */}
                  <text x={toNearUvX(260)} y={pad.top + 20} fill="#f59e0b" fontSize="9" textAnchor="middle">
                    Phe (255-270 nm)
                  </text>
                  <text x={toNearUvX(278)} y={pad.top + 20} fill="#f59e0b" fontSize="9" textAnchor="middle">
                    Tyr (275-282 nm)
                  </text>
                  <text x={toNearUvX(290)} y={pad.top + 20} fill="#f59e0b" fontSize="9" textAnchor="middle">
                    Trp (282-293 nm)
                  </text>

                  {/* Wavelength Ticks */}
                  {[250, 260, 270, 280, 290, 300, 310, 320].map((wl) => (
                    <g key={wl} transform={`translate(${toNearUvX(wl)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {wl}
                      </text>
                    </g>
                  ))}

                  {/* Y-Axis Ticks */}
                  {[-100, 0, 100, 200, 300, 400].map((mre) => (
                    <g key={mre} transform={`translate(${pad.left}, ${toNearUvY(mre)})`}>
                      <line x2="-5" stroke="#475569" />
                      <text x="-8" y="3" fill="#94a3b8" fontSize="9" textAnchor="end">
                        {mre}
                      </text>
                    </g>
                  ))}
                  <text
                    x={-svgH / 2}
                    y="18"
                    transform="rotate(-90)"
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    [θ] Mean Residue Ellipticity (deg·cm²/dmol)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Wavelength λ (nm) — Near-UV Aromatic & Disulfide Tertiary Fingerprint
                  </text>
                </>
              )}

              {spectralMode === 'thermal_denaturation' && (
                <>
                  {/* Thermal Melting Curve */}
                  <path
                    d={thermalPath}
                    fill="none"
                    stroke="url(#cdThermalGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Tm Marker Line */}
                  <line
                    x1={toTX(selectedProtein.tmCelsius)}
                    y1={pad.top}
                    x2={toTX(selectedProtein.tmCelsius)}
                    y2={pad.top + plotH}
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={toTX(selectedProtein.tmCelsius) + 4}
                    y={pad.top + 15}
                    fill="#f43f5e"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    T_m = {selectedProtein.tmCelsius.toFixed(1)}°C
                  </text>

                  {/* Current Temp Point */}
                  <circle
                    cx={toTX(temperatureCelsius)}
                    cy={toTY(thermalCurve.find((p) => p.temperatureC === Math.round(temperatureCelsius))?.mre222 || -20000)}
                    r="5"
                    fill="#38bdf8"
                    stroke="#fff"
                    strokeWidth="2"
                  />

                  {/* Temperature Ticks */}
                  {[20, 30, 40, 50, 60, 70, 80, 90].map((t) => (
                    <g key={t} transform={`translate(${toTX(t)}, ${pad.top + plotH})`}>
                      <line y2="5" stroke="#475569" />
                      <text y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {t}°C
                      </text>
                    </g>
                  ))}

                  {/* Y-Axis Ticks */}
                  {[-35000, -25000, -15000, -5000, 0].map((mre) => (
                    <g key={mre} transform={`translate(${pad.left}, ${toTY(mre)})`}>
                      <line x2="-5" stroke="#475569" />
                      <text x="-8" y="3" fill="#94a3b8" fontSize="9" textAnchor="end">
                        {(mre / 1000).toFixed(0)}k
                      </text>
                    </g>
                  ))}
                  <text
                    x={-svgH / 2}
                    y="18"
                    transform="rotate(-90)"
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    [θ]₂₂₂ at 222 nm (deg·cm²/dmol)
                  </text>
                  <text
                    x={pad.left + plotW / 2}
                    y={svgH - 8}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    Temperature (°C) — Two-State Unfolding Sigmoid
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  Temperature:
                </span>
                <span className="font-mono text-rose-400 font-semibold">{temperatureCelsius.toFixed(1)}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="0.5"
                value={temperatureCelsius}
                onChange={(e) => handleTempChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>10°C (Native)</span>
                <span>50°C</span>
                <span>95°C (Denatured)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Chemical Denaturant (Urea / GdnHCl):
                </span>
                <span className="font-mono text-amber-400 font-semibold">{denaturantMolar.toFixed(1)} M</span>
              </div>
              <input
                type="range"
                min="0"
                max="8.0"
                step="0.2"
                value={denaturantMolar}
                onChange={(e) => handleDenaturantChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0.0 M (Pure Buffer)</span>
                <span>4.0 M</span>
                <span>8.0 M (Chaotropic)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deconvolution Analysis & Biophysics Metrics (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Secondary Structure Fractions Panel */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Secondary Structure
              </span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                NNLS MATRIX FIT
              </span>
            </div>

            {/* Fraction Meters */}
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                    α-Helix (208 / 222 nm)
                  </span>
                  <span className="font-mono font-semibold text-cyan-400">
                    {(deconvolution.alphaHelix * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, deconvolution.alphaHelix * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    β-Sheet (218 nm)
                  </span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {(deconvolution.betaSheet * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, deconvolution.betaSheet * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    β-Turn (202 / 224 nm)
                  </span>
                  <span className="font-mono font-semibold text-amber-400">
                    {(deconvolution.betaTurn * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, deconvolution.betaTurn * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 inline-block" />
                    Random Coil (198 nm)
                  </span>
                  <span className="font-mono font-semibold text-fuchsia-400">
                    {(deconvolution.randomCoil * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, deconvolution.randomCoil * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
              <span>Fit NRMSD: <strong className="text-slate-200 font-mono">{deconvolution.nrmsd.toFixed(4)}</strong></span>
              <span>Chen-Yang α: <strong className="text-cyan-400 font-mono">{(chenYangHelix * 100).toFixed(1)}%</strong></span>
            </div>
          </div>

          {/* Folding State & Thermodynamic Stability */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-rose-400" />
                Two-State Folding
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  fractionUnfolded < 0.2
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                    : fractionUnfolded > 0.8
                    ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                    : 'bg-amber-950/80 text-amber-400 border-amber-800'
                }`}
              >
                {fractionUnfolded < 0.2
                  ? 'FOLDED NATIVE'
                  : fractionUnfolded > 0.8
                  ? 'DENATURED COIL'
                  : 'COOPERATIVE UNFOLDING'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Melting Temp (T_m)</div>
                <div className="text-sm font-bold font-mono text-rose-400 mt-0.5">
                  {selectedProtein.tmCelsius.toFixed(1)}°C
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Enthalpy (ΔH_m)</div>
                <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">
                  {selectedProtein.deltaHkJmol} kJ/mol
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Mean Res. Wt (MRW)</div>
                <div className="text-sm font-bold font-mono text-indigo-400 mt-0.5">
                  {selectedProtein.mrw.toFixed(1)} Da
                </div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Unfolded Frac. f_U</div>
                <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">
                  {(fractionUnfolded * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {selectedProtein.biologicalFunction}
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Educational & Theoretical Foundation */}
      <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
        {activeTab === 'secondary_deconvolution' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Secondary Structure Deconvolution: Amide Chromophore Far-UV (190 - 260 nm)
            </h3>
            <p>
              Protein Far-UV Circular Dichroism arises predominantly from the electronic transitions of the peptide amide backbone (<strong className="text-slate-100">-CO-NH-</strong>).
              In an ordered secondary structure, exciton coupling between neighboring peptide dipoles splits the absorption bands:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-cyan-800/50">
                <div className="font-bold text-cyan-300">α-Helix (Double Minima)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Negative bands at <strong>222 nm</strong> (n → π*) and <strong>208 nm</strong> (π → π* ∥); positive peak at <strong>193 nm</strong> (π → π* ⊥).
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-emerald-800/50">
                <div className="font-bold text-emerald-300">β-Sheet (Single Minimum)</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Broad negative band at <strong>218 nm</strong> (n → π*) and positive peak at <strong>195 nm</strong>; characteristic of immunoglobulin & lectin folds.
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-amber-800/50">
                <div className="font-bold text-amber-300">β-Turn / Loops</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Weak positive peak near <strong>202 nm</strong> and weak negative minimum near <strong>224 nm</strong> connecting secondary elements.
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-fuchsia-800/50">
                <div className="font-bold text-fuchsia-300">Random Coil / Disordered</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Intense negative minimum at <strong>198 nm</strong> ([θ] ≈ -40,000) and low ellipticity above 215 nm; diagnostic of IDPs like α-synuclein.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cotton_chiral_optics' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2">
              <Atom className="w-4 h-4 text-purple-400" />
              The Cotton Effect, Ellipticity, & Mean Residue Conversion Formulae
            </h3>
            <p>
              In optically active chiral biomacromolecules, left-circularly polarized (LCP) and right-circularly polarized (RCP) light experience different absorption coefficients (<strong>ε_L ≠ ε_R</strong>) and refractive indices (<strong>n_L ≠ n_R</strong>).
              This differential absorption is the <strong>Cotton Effect</strong> (Aimé Cotton, 1896):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                <div className="text-purple-400 font-bold mb-1">Differential Absorbance</div>
                ΔA = A_L - A_R = (ε_L - ε_R) · c · l<br />
                θ (rad) = (ln 10 / 4) · ΔA
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                <div className="text-indigo-400 font-bold mb-1">Instrument Ellipticity (mdeg)</div>
                θ (mdeg) = 32980 · ΔA<br />
                Δε = θ (mdeg) / (32980 · c · l)
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                <div className="text-pink-400 font-bold mb-1">Mean Residue Ellipticity [θ]</div>
                [θ]_MRE = (θ · MRW) / (10 · c · l)<br />
                MRW = MW / (N_res - 1) ≈ 110 Da
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thermal_stability' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-rose-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Thermodynamic Two-State Thermal Unfolding & Chemical Denaturation
            </h3>
            <p>
              For globular proteins undergoing cooperative unfolding (<strong>Folded ⇌ Unfolded</strong>), the equilibrium constant <strong>K_eq = f_U / (1 - f_U)</strong> is governed by the Gibbs-Helmholtz equation:
            </p>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              ΔG_unfold(T) = ΔH_m · (1 - T / T_m) - ΔC_p · [(T_m - T) + T · ln(T / T_m)]<br />
              f_U(T) = 1 / [1 + exp(-ΔH_m / (R·T) · (1 - T / T_m))]
            </div>
            <p className="text-[11px] text-slate-400">
              At the melting temperature <strong>T_m</strong>, exactly 50% of the protein molecules are folded and 50% are denatured (f_U = 0.50, ΔG = 0).
              Adding chaotropic denaturants such as Urea or Guanidinium HCl shifts T_m downward by disrupting hydrogen bonding networks and hydrophobic core packing.
            </p>
          </div>
        )}

        {activeTab === 'nobel_curriculum_gdpt' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Curriculum Alignment (GDPT 2018) & Historical Milestones
            </h3>
            <p>
              {selectedProtein.curriculumNotes}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">GDPT 2018 Hóa học & Sinh học 10-12</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Liên kết peptid (-CO-NH-), cấu trúc xoắn α và phiến gấp β ổn định bởi liên kết hydro nội/liên chuỗi; hiện tượng biến tính nhiệt và biến tính hóa học của protein.
                </p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="font-bold text-slate-200">Vật lý 12: Phân cực ánh sáng</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hiện tượng phân cực tròn trái/phải, hoạt tính quang học của đồng phân quang học (L-amino acid), định luật Biot và hiệu ứng Cotton.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
