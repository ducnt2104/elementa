// src/components/visualizations/ColloidSurfaceVisualizer.tsx
// Interactive Colloids, Surface Chemistry, Surfactants & Micelles Visualizer
// Conforming to Vietnam GDPT 2018 (Hóa 10 & 11: Dung dịch & Hệ phân tán) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Droplets,
  Sun,
  Activity,
  Layers,
  Sparkles,
  Info,
  Scale,
  Zap,
  Sliders,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import {
  DISPERSED_SYSTEMS_CATALOG,
  SURFACTANTS_CATALOG,
  DispersedSystemDef,
  SurfactantPresetDef,
  calculateRayleighTyndallScattering,
  calculateBrownianMotionDiffusion,
  calculateYoungLaplacePressure,
  calculateLangmuirAdsorption,
  calculateSchulzeHardyCoagulation
} from '../../domain/colloidSurfaceEngine';
import { sound } from '../../audio/soundEngine';

export interface ColloidSurfaceVisualizerProps {
  initialSystemId?: string;
  className?: string;
}

export const ColloidSurfaceVisualizer: React.FC<ColloidSurfaceVisualizerProps> = ({
  initialSystemId = 'fe_oh_3_sol',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'CLASSIFICATION' | 'TYNDALL_BROWNIAN' | 'SURFACTANTS' | 'SURFACE_COAGULATION'>('TYNDALL_BROWNIAN');

  // Tab 1 state
  const [selectedSystemId, setSelectedSystemId] = useState<string>(initialSystemId);

  // Tab 2 Tyndall & Brownian state
  const [laserWavelengthNm, setLaserWavelengthNm] = useState<number>(450); // Blue laser 450nm
  const [isLaserOn, setIsLaserOn] = useState<boolean>(true);
  const [brownianRadiusNm, setBrownianRadiusNm] = useState<number>(20);
  const [brownianTempC, setBrownianTempC] = useState<number>(25);

  // Tab 3 Surfactant state
  const [selectedSurfactantId, setSelectedSurfactantId] = useState<string>('sodium_dodecyl_sulfate');
  const [concentrationRatioToCmc, setConcentrationRatioToCmc] = useState<number>(1.2); // 0.1 to 2.5x CMC

  // Tab 4 Surface Tension & Coagulation state
  const [bubbleRadiusMicrons, setBubbleRadiusMicrons] = useState<number>(50);
  const [isSoapBubbleFilm, setIsSoapBubbleFilm] = useState<boolean>(true);
  const [adsorptionC, setAdsorptionC] = useState<number>(0.05); // mol/L
  const [counterIonValency, setCounterIonValency] = useState<number>(3); // Al3+

  // Selected System
  const currentSystem: DispersedSystemDef = useMemo(() => {
    return DISPERSED_SYSTEMS_CATALOG[selectedSystemId] || DISPERSED_SYSTEMS_CATALOG.fe_oh_3_sol;
  }, [selectedSystemId]);

  // Selected Surfactant
  const currentSurfactant: SurfactantPresetDef = useMemo(() => {
    return SURFACTANTS_CATALOG[selectedSurfactantId] || SURFACTANTS_CATALOG.sodium_dodecyl_sulfate;
  }, [selectedSurfactantId]);

  // Tab 2 Tyndall calculation
  const tyndallResult = useMemo(() => {
    try {
      return calculateRayleighTyndallScattering(brownianRadiusNm, laserWavelengthNm);
    } catch {
      return {
        wavelengthNm: 550,
        relativeIntensityNormalized: 1.0,
        colorAppearanceVI: 'Lỗi thông số.',
        isRayleighRegime: true
      };
    }
  }, [brownianRadiusNm, laserWavelengthNm]);

  // Tab 2 Brownian calculation
  const brownianResult = useMemo(() => {
    try {
      return calculateBrownianMotionDiffusion(brownianRadiusNm, brownianTempC, 1.0);
    } catch {
      return {
        diffusionCoefficientM2s: 0,
        meanDisplacementMicrons: 0,
        rmsDisplacementDisplay: '0 µm',
        interpretationVI: 'Lỗi nhiệt độ.'
      };
    }
  }, [brownianRadiusNm, brownianTempC]);

  // Tab 4 Young-Laplace calculation
  const laplaceResult = useMemo(() => {
    try {
      const gamma = currentSurfactant.pureWaterSurfaceTensionPlateau_mNm;
      return calculateYoungLaplacePressure(gamma, bubbleRadiusMicrons, isSoapBubbleFilm);
    } catch {
      return {
        overpressurePascals: 0,
        overpressureAtm: 0,
        interpretationVI: 'Lỗi tính toán.'
      };
    }
  }, [currentSurfactant.pureWaterSurfaceTensionPlateau_mNm, bubbleRadiusMicrons, isSoapBubbleFilm]);

  // Tab 4 Langmuir calculation
  const langmuirResult = useMemo(() => {
    try {
      return calculateLangmuirAdsorption(50.0, adsorptionC);
    } catch {
      return {
        surfaceCoverageFractionTheta: 0,
        surfaceCoveragePercent: 0,
        adsorptionRegimeVI: 'HENRY_LINEAR_REGIME' as const,
        explanationVI: 'Lỗi nồng độ.'
      };
    }
  }, [adsorptionC]);

  // Tab 4 Schulze-Hardy calculation
  const schulzeHardyResult = useMemo(() => {
    try {
      return calculateSchulzeHardyCoagulation(counterIonValency, 100.0);
    } catch {
      return {
        valencyZ: 1,
        relativeCoagulationPower: 1,
        criticalConcentration_mM: 100,
        interpretationVI: 'Lỗi hóa trị.'
      };
    }
  }, [counterIonValency]);

  return (
    <div className={`bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl flex flex-col gap-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded-xl shadow-lg">
            <Droplets className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Hóa Học Hệ Keo & Hóa Học Bề Mặt
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                GDPT 2018 · IUPAC · Colloids & Interfaces
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hiệu Ứng Tyndall, Chuyển Động Brown, Chất Hoạt Động Bề Mặt (CMC & Micelle), Đẳng Nhiệt Hấp Phụ & Quy Tắc Schulze-Hardy
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('CLASSIFICATION')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CLASSIFICATION'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Hệ Phân Tán
          </button>
          <button
            onClick={() => setActiveTab('TYNDALL_BROWNIAN')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'TYNDALL_BROWNIAN'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Tyndall & Brown
          </button>
          <button
            onClick={() => setActiveTab('SURFACTANTS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'SURFACTANTS'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Micelle & Tẩy Rửa (CMC)
          </button>
          <button
            onClick={() => setActiveTab('SURFACE_COAGULATION')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'SURFACE_COAGULATION'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Sức Căng & Keo Tụ
          </button>
        </div>
      </div>

      {/* TAB 1: PHÂN LOẠI HỆ PHÂN TÁN */}
      {activeTab === 'CLASSIFICATION' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* List of systems */}
          <div className="lg:w-5/12 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Các Hệ Phân Tán Tiêu Biểu</span>
              <span className="text-blue-400 font-mono">Dung dịch · Keo · Huyền phù</span>
            </span>
            <div className="space-y-2">
              {Object.values(DISPERSED_SYSTEMS_CATALOG).map(sys => {
                const isSelected = sys.id === selectedSystemId;
                return (
                  <button
                    key={sys.id}
                    onClick={() => {
                      setSelectedSystemId(sys.id);
                      sound.playColloidLightBeam();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-blue-950/70 border-blue-500 shadow-md shadow-blue-950/40 text-blue-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{sys.nameVI}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-400">
                        {sys.category === 'TRUE_SOLUTION' ? '< 1 nm' : sys.category === 'COLLOIDAL_SYSTEM' ? '1 – 100 nm' : '> 100 nm'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {sys.dispersedPhaseVI}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System details */}
          <div className="lg:w-7/12 bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold border border-blue-500/30">
                  {currentSystem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {currentSystem.nameVI}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Kích thước: {currentSystem.typicalParticleSizeRangeNm[0]} – {currentSystem.typicalParticleSizeRangeNm[1]} nm
              </span>
            </div>

            {/* Permeability tests */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Qua giấy lọc thông thường:</span>
                <strong className={currentSystem.passFilterPaper ? 'text-emerald-400' : 'text-rose-400'}>
                  {currentSystem.passFilterPaper ? '✓ Lọt qua' : '✗ Bị giữ lại'}
                </strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Qua màng thẩm tích:</span>
                <strong className={currentSystem.passDialysisMembrane ? 'text-emerald-400' : 'text-rose-400'}>
                  {currentSystem.passDialysisMembrane ? '✓ Lọt qua' : '✗ Bị giữ lại'}
                </strong>
              </div>
            </div>

            {/* Optical & Kinetic descriptions */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-cyan-400 font-semibold block mb-1">Hiện tượng quang học & tán xạ:</span>
                <p className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300">
                  {currentSystem.opticalBehaviorVI}
                </p>
              </div>

              <div>
                <span className="text-amber-400 font-semibold block mb-1">Độ bền động học & nhiệt động học:</span>
                <p className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300">
                  {currentSystem.kineticStabilityVI}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Ví dụ thực tế:</span>
                <div className="flex flex-wrap gap-2">
                  {currentSystem.realWorldExamplesVI.map((ex, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pedagogical insight */}
            <p className="text-xs text-blue-200/90 bg-blue-950/30 p-3 rounded-xl border border-blue-800/40 leading-relaxed italic mt-auto">
              "{currentSystem.pedagogicalInsightVI}"
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: HIỆU ỨNG TYNDALL & CHUYỂN ĐỘNG BROWNIAN */}
      {activeTab === 'TYNDALL_BROWNIAN' && (
        <div className="flex flex-col gap-6">
          {/* Tyndall Optical Simulator */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-cyan-400" />
                  Mô Phỏng Hiệu Ứng Tán Xạ Tyndall (Rayleigh Scattering)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Cường độ tán xạ: I ∝ 1 / λ⁴ (Ánh sáng bước sóng ngắn tán xạ mạnh hơn nhiều lần)
                </p>
              </div>
              <button
                onClick={() => {
                  setIsLaserOn(!isLaserOn);
                  sound.playColloidLightBeam();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  isLaserOn ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {isLaserOn ? 'Đang Chiếu Laser' : 'Tắt Laser'}
              </button>
            </div>

            {/* SVG Tyndall Demonstration */}
            <div className="bg-black/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <svg viewBox="0 0 500 120" className="w-full max-w-xl h-32">
                {/* Cuvee / Beaker container */}
                <rect x="80" y="20" width="340" height="80" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="250" y="112" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                  Dung dịch keo Fe(OH)3 (Bán kính r = {brownianRadiusNm} nm)
                </text>

                {/* Laser Pointer */}
                <rect x="20" y="52" width="50" height="16" rx="3" fill="#334155" stroke="#475569" />
                <circle cx="70" cy="60" r="3" fill={laserWavelengthNm < 500 ? '#38bdf8' : laserWavelengthNm < 600 ? '#22c55e' : '#ef4444'} />

                {/* Tyndall Cone Beam */}
                {isLaserOn && (
                  <>
                    {/* Beam before cell */}
                    <line
                      x1="70"
                      y1="60"
                      x2="80"
                      y2="60"
                      stroke={laserWavelengthNm < 500 ? '#38bdf8' : laserWavelengthNm < 600 ? '#22c55e' : '#ef4444'}
                      strokeWidth="2"
                    />
                    {/* Tyndall cone inside cell */}
                    <polygon
                      points={`80,56 420,40 420,80 80,64`}
                      fill={laserWavelengthNm < 500 ? 'rgba(56, 189, 248, 0.35)' : laserWavelengthNm < 600 ? 'rgba(34, 197, 94, 0.28)' : 'rgba(239, 68, 68, 0.15)'}
                    />
                    <line
                      x1="80"
                      y1="60"
                      x2="420"
                      y2="60"
                      stroke={laserWavelengthNm < 500 ? '#38bdf8' : laserWavelengthNm < 600 ? '#22c55e' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray="2 2"
                    />
                    {/* Scattered rays */}
                    {[120, 180, 240, 300, 360].map((x, idx) => (
                      <g key={idx} opacity={0.7}>
                        <circle cx={x} cy="60" r="2.5" fill="#ffffff" />
                        <line x1={x} y1="60" x2={x - 10} y2="35" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 2" />
                        <line x1={x} y1="60" x2={x + 10} y2="85" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 2" />
                      </g>
                    ))}
                    {/* Exiting transmitted beam */}
                    <line
                      x1="420"
                      y1="60"
                      x2="480"
                      y2="60"
                      stroke={laserWavelengthNm < 500 ? '#38bdf8' : laserWavelengthNm < 600 ? '#22c55e' : '#ef4444'}
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Bước sóng ánh sáng tới (λ):</span>
                  <span className="font-mono font-bold text-cyan-300">{laserWavelengthNm} nm</span>
                </label>
                <input
                  type="range"
                  min="400"
                  max="700"
                  step="10"
                  value={laserWavelengthNm}
                  onChange={e => setLaserWavelengthNm(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>400 nm (Tím/Lam)</span>
                  <span>550 nm (Lục)</span>
                  <span>700 nm (Đỏ)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Bán kính hạt keo phân tán (r):</span>
                  <span className="font-mono font-bold text-amber-300">{brownianRadiusNm} nm</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="80"
                  step="1"
                  value={brownianRadiusNm}
                  onChange={e => setBrownianRadiusNm(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2 nm (Siêu nhỏ)</span>
                  <span>40 nm</span>
                  <span>80 nm (Gần giới hạn keo)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Cường độ tán xạ tỉ đối:</span>
              <span className="text-base font-bold text-cyan-300">
                {tyndallResult.relativeIntensityNormalized}× (so với bước sóng 550nm)
              </span>
              <span className="text-[11px] text-slate-300">{tyndallResult.colorAppearanceVI}</span>
            </div>
          </div>

          {/* Brownian Motion Simulator */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Mô Phỏng Chuyển Động Hỗn Loạn Brown (Einstein-Smoluchowski)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Hệ số khuếch tán: D = (k_B·T) / (6πηr) · Dịch chuyển trung bình: &lt;x²&gt; = 2Dt
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Dịch chuyển RMS (t = 1s):</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {brownianResult.rmsDisplacementDisplay}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Nhiệt độ dung dịch (°C):</span>
                  <span className="font-mono font-bold text-white">{brownianTempC}°C ({brownianTempC + 273.15} K)</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="1"
                  value={brownianTempC}
                  onChange={e => setBrownianTempC(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-400 block">Hệ số khuếch tán Einstein D:</span>
                <strong className="text-emerald-300 text-sm">{brownianResult.diffusionCoefficientM2s} m²/s</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {brownianResult.interpretationVI}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: CHẤT HOẠT ĐỘNG BỀ MẶT & MICELLE */}
      {activeTab === 'SURFACTANTS' && (
        <div className="flex flex-col gap-6">
          {/* Surfactant Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Chọn Chất Hoạt Động Bề Mặt Tiêu Biểu:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.values(SURFACTANTS_CATALOG).map(sur => (
                <button
                  key={sur.id}
                  onClick={() => {
                    setSelectedSurfactantId(sur.id);
                    sound.playMicelleFormBubble();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    selectedSurfactantId === sur.id
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {sur.nameVI.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Surfactant Details & Micelle State */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Micelle Assembly Schematic SVG */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-blue-300">
                  CẤU TRÚC MICELLE HÌNH CẦU & BỌC DẦU MỠ
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  {concentrationRatioToCmc >= 1.0 ? 'Đã tạo Micelle (C ≥ CMC)' : 'Chưa tạo Micelle (C < CMC)'}
                </span>
              </div>

              {/* Dynamic Micelle SVG */}
              <svg viewBox="-100 -100 200 200" className="w-56 h-56">
                {concentrationRatioToCmc >= 1.0 ? (
                  <>
                    {/* Hydrophobic oil droplet core */}
                    <circle cx="0" cy="0" r="32" fill="#d97706" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="0" y="4" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="monospace" fontWeight="bold">
                      DẦU MỠ
                    </text>

                    {/* Surfactant molecules in radial micelle */}
                    {Array.from({ length: 16 }).map((_, idx) => {
                      const angle = (idx * 2 * Math.PI) / 16;
                      const rInner = 32;
                      const rOuter = 65;
                      const xInner = rInner * Math.cos(angle);
                      const yInner = rInner * Math.sin(angle);
                      const xOuter = rOuter * Math.cos(angle);
                      const yOuter = rOuter * Math.sin(angle);
                      return (
                        <g key={idx}>
                          {/* Hydrophobic hydrocarbon tail */}
                          <line
                            x1={xInner}
                            y1={yInner}
                            x2={xOuter}
                            y2={yOuter}
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          {/* Hydrophilic polar head */}
                          <circle cx={xOuter} cy={yOuter} r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                        </g>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* Unassembled monomers */}
                    <text x="0" y="-70" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                      Bề mặt nước - Các phân tử tự do
                    </text>
                    <line x1="-80" y1="-50" x2="80" y2="-50" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
                    {[-60, -30, 0, 30, 60].map((x, idx) => (
                      <g key={idx}>
                        <circle cx={x} cy="-50" r="5" fill="#38bdf8" />
                        <line x1={x} y1="-50" x2={x} y2="-20" stroke="#f59e0b" strokeWidth="2" />
                      </g>
                    ))}
                    <text x="0" y="30" textAnchor="middle" fill="#64748b" fontSize="10">
                      Nồng độ dưới CMC: Chưa hình thành micelle
                    </text>
                  </>
                )}
              </svg>

              {/* Concentration Slider */}
              <div className="w-full space-y-1">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Tỉ lệ nồng độ so với CMC (C / CMC):</span>
                  <span className={`font-mono font-bold ${concentrationRatioToCmc >= 1.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {concentrationRatioToCmc.toFixed(2)}× CMC
                  </span>
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={concentrationRatioToCmc}
                  onChange={e => {
                    setConcentrationRatioToCmc(Number(e.target.value));
                    if (Number(e.target.value) >= 1.0 && concentrationRatioToCmc < 1.0) {
                      sound.playMicelleFormBubble();
                    }
                  }}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Surfactant Properties & Mechanism */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {currentSurfactant.nameVI}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
                    {currentSurfactant.surfactantType}
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 mt-2">
                  {currentSurfactant.iupacFormula}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 text-[10px]">Nồng độ tới hạn CMC:</span>
                  <strong className="text-cyan-300 text-sm">{(currentSurfactant.criticalMicelleConcentrationMolar * 1000).toFixed(2)} mM</strong>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 text-[10px]">Chỉ số HLB (Griffin):</span>
                  <strong className="text-emerald-300 text-sm">{currentSurfactant.griffinHLB} / 20</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Đầu phân cực ưa nước:</span>
                  <p className="text-slate-200">{currentSurfactant.hydrophilicHeadGroupVI}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Đuôi kỵ nước ưa dầu:</span>
                  <p className="text-slate-200">{currentSurfactant.lipophilicTailGroupVI}</p>
                </div>
              </div>

              <p className="text-xs text-blue-200/90 bg-blue-950/30 p-3 rounded-xl border border-blue-800/40 leading-relaxed italic">
                "{currentSurfactant.cleansingMechanismVI}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SỨC CĂNG BỀ MẶT & KEO TỤ SCHULZE-HARDY */}
      {activeTab === 'SURFACE_COAGULATION' && (
        <div className="flex flex-col gap-6">
          {/* Young-Laplace Pressure Calculator */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Phương Trình Áp Suất Mao Dẫn Young-Laplace (ΔP)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Giọt chất lỏng: ΔP = 2γ / R · Bọt màng đôi: ΔP = 4γ / R
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Áp Suất Mao Dẫn Phụ:</span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {laplaceResult.overpressurePascals} Pa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Bán kính giọt/bọt (R):</span>
                  <span className="font-mono font-bold text-cyan-300">{bubbleRadiusMicrons} µm</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={bubbleRadiusMicrons}
                  onChange={e => setBubbleRadiusMicrons(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSoapBubbleFilm(!isSoapBubbleFilm)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    isSoapBubbleFilm
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isSoapBubbleFilm ? 'Bọt xà phòng màng đôi (4γ/R)' : 'Giọt chất lỏng đặc (2γ/R)'}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {laplaceResult.interpretationVI}
            </p>
          </div>

          {/* Schulze-Hardy Coagulation Rule */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Quy Tắc Keo Tụ Schulze-Hardy (CCC ∝ 1 / z⁶)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Năng lực keo tụ tỉ lệ thuận với lũy thừa 6 của điện tích ion ngược dấu
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Năng lực keo tụ so với ion z=1:</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {schulzeHardyResult.relativeCoagulationPower}×
                </span>
              </div>
            </div>

            {/* Valency Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-400">Chọn ion keo tụ:</span>
              {[
                { z: 1, label: 'Na⁺ / K⁺ (z = 1)' },
                { z: 2, label: 'Mg²⁺ / Ca²⁺ (z = 2)' },
                { z: 3, label: 'Al³⁺ / Fe³⁺ (Phèn chua, z = 3)' }
              ].map(item => (
                <button
                  key={item.z}
                  onClick={() => setCounterIonValency(item.z)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border transition ${
                    counterIonValency === item.z
                      ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {schulzeHardyResult.interpretationVI}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          Bộ Giáo Dục & Đào Tạo Việt Nam — GDPT 2018 Hóa học 10 & 11 (Dung dịch, Hệ phân tán & Hóa keo)
        </span>
        <span className="font-mono text-slate-500">IUPAC Colloid & Surface Chemistry Commission</span>
      </div>
    </div>
  );
};
