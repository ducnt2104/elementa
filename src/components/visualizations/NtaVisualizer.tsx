import React, { useState, useMemo, useEffect } from 'react';
import {
  NTA_STANDARD_CATALOG,
  NtaStandard,
  simulateNtaExperiment,
  calculateStokesEinsteinDiffusionCoeff,
  calculateWaterViscosityPaS,
  BOLTZMANN_CONSTANT_J_PER_K,
} from '../../domain/ntaEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Layers,
  Sparkles,
  Zap,
  Target,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Eye,
  Microscope,
  Award,
  CircleDot,
} from 'lucide-react';

interface NtaVisualizerProps {
  initialStandardId?: string;
}

export const NtaVisualizer: React.FC<NtaVisualizerProps> = ({
  initialStandardId = 'nist_100nm_polystyrene_beads',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'TRACKING_VIEW' | 'SIZE_DISTRIBUTION' | 'STOKES_EINSTEIN' | 'BIOMEDICAL_APPLICATIONS'
  >('TRACKING_VIEW');

  const standard: NtaStandard = useMemo(() => {
    return (
      NTA_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || NTA_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(standard.optimalTemperatureCelsius);
  const [activeFrame, setActiveFrame] = useState<number>(0);
  const [selectedParticleId, setSelectedParticleId] = useState<number | null>(null);

  // Synchronize temperature on standard switch
  useEffect(() => {
    setTemperatureCelsius(standard.optimalTemperatureCelsius);
    sound.playHydrodynamicModeDiameterBeep?.(standard.trueModeDiameterNm);
  }, [standard]);

  // Simulation computation
  const simulation = useMemo(() => {
    return simulateNtaExperiment(standard, temperatureCelsius);
  }, [standard, temperatureCelsius]);

  // Animate Brownian motion frame counter (looping from frame 0 to 24)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % 25);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 text-ivory">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-navy to-purple-950/80 p-5 rounded-2xl border border-indigo-500/30 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30 text-indigo-400">
              <Microscope className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  ISO 19430:2016 Nanoparticle Tracking
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Stokes-Einstein Single-Particle Sizing
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Phân Tích Bám Vết Hạt Nano NTA & Chuyển Động Nhiệt Brown (ISO 19430)
              </h2>
              <p className="text-xs text-ivory-muted mt-0.5">
                Khuếch tán Brown 2D · Đo đạc trực tiếp từng hạt vi mô không thiên lệch tán xạ d⁶ · Định lượng nồng
                độ exosome và hạt nano lipid LNP
              </p>
            </div>
          </div>

          {/* Key Metrics Quick Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-indigo-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Đường Kính Mode (d_mode)</div>
              <div className="text-sm font-mono font-bold text-indigo-300">
                {simulation.modeDiameterNm.toFixed(1)} nm
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-purple-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Hệ Số Khuếch Tán D_t</div>
              <div className="text-sm font-mono font-bold text-purple-300">
                {(simulation.diffusionCoeffModeM2S * 1e12).toFixed(2)} × 10⁻¹² m²/s
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-teal-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Nồng Độ Hạt C_N</div>
              <div className="text-sm font-mono font-bold text-teal-300">
                {(simulation.totalConcentrationParticlesPerMl / 1e8).toFixed(1)} × 10⁸ hạt/mL
              </div>
            </div>
          </div>
        </div>

        {/* Standard Selector Buttons */}
        <div className="mt-4 pt-4 border-t border-navy-light/40 flex flex-wrap gap-2">
          {NTA_STANDARD_CATALOG.map((std) => (
            <button
              key={std.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedStandardId(std.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedStandardId === std.id
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-900/40 border border-indigo-400'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy-light/80 border border-navy-light/30'
              }`}
            >
              {std.vietnameseName.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders & Temperature Tuning */}
      <div className="bg-navy/70 p-4 rounded-2xl border border-navy-light/40 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Chamber Temperature */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Nhiệt Độ Buồng Đo (T):
            </span>
            <span className="font-mono font-bold text-rose-300">{temperatureCelsius}°C</span>
          </div>
          <input
            type="range"
            min="10"
            max="45"
            step="1"
            value={temperatureCelsius}
            onChange={(e) => setTemperatureCelsius(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>10°C (η = 1.31 mPa·s)</span>
            <span>45°C (η = 0.60 mPa·s)</span>
          </div>
        </div>

        {/* 2. Laser Optical Wavelength & Optical Permittivity */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Bước Sóng Laser Tán Xạ:
            </span>
            <span className="font-mono font-bold text-cyan-300">{standard.optimalLaserWavelengthNm} nm</span>
          </div>
          <div className="text-xs text-ivory-muted font-mono">
            Chiết suất hạt: <strong className="text-white">n = {standard.refractiveIndex}</strong>
          </div>
          <div className="text-[10px] text-teal-300 font-mono">
            Độ nhớt nước: {simulation.mediumViscosityMpaS.toFixed(3)} mPa·s
          </div>
        </div>

        {/* 3. Polydispersity & Span Metric */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-400" /> Chỉ Số Phân Bố Span:
            </span>
            <span className="font-mono font-bold text-amber-300">{simulation.spanMetric.toFixed(2)}</span>
          </div>
          <div className="text-xs text-ivory-muted font-mono">
            D10: {simulation.d10Nm.toFixed(1)} nm · D50: {simulation.d50Nm.toFixed(1)} nm · D90: {simulation.d90Nm.toFixed(1)} nm
          </div>
          <div className="text-[10px] text-ivory-muted font-mono">
            Span = (D90 - D10) / D50
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('TRACKING_VIEW');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'TRACKING_VIEW'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 text-indigo-300" />
          <span>Kính Hiển Vi Video NTA Live</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SIZE_DISTRIBUTION');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'SIZE_DISTRIBUTION'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-purple-300" />
          <span>Phổ Phân Bố Kích Thước (PSD)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('STOKES_EINSTEIN');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'STOKES_EINSTEIN'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Atom className="w-4 h-4 text-teal-300" />
          <span>Cơ Sở Vật Lý Brown & Stokes-Einstein</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('BIOMEDICAL_APPLICATIONS');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'BIOMEDICAL_APPLICATIONS'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-rose-300" />
          <span>Ứng Dụng Y Sinh Học & GDPT 2018</span>
        </button>
      </div>

      {/* Sub-Tab 1: Microscopic Tracking Live Video View */}
      {activeSubTab === 'TRACKING_VIEW' && (
        <div className="space-y-4">
          <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  Kính Hiển Vi Trường Tối Live Tracking (Tia Laser & Chuyển Động Brown)
                </h3>
                <span className="text-[11px] font-mono text-ivory-muted">
                  Theo dõi từng chấm sáng tán xạ vi mô (30 fps) · Nhấp vào hạt để nghe âm thanh chirp khuếch tán
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-indigo-300">Frame: {activeFrame + 1} / 25</span>
                <span className="text-emerald-300">8 hạt đang theo dõi</span>
              </div>
            </div>

            {/* Darkfield Microscopic Canvas */}
            <div className="w-full h-80 bg-black rounded-xl border border-navy-light/60 p-2 relative overflow-hidden flex items-center justify-center">
              {/* Laser Beam Illumination Band across viewport */}
              <div className="absolute inset-y-12 inset-x-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none"></div>

              <svg viewBox="0 0 700 300" className="w-full h-full">
                {/* Darkfield Background Grid */}
                <defs>
                  <radialGradient id="laserGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Trajectory Tails and Moving Nanoparticles */}
                {simulation.trackedParticles.map((pt, pIdx) => {
                  // Base coordinate offset for each particle so they don't overlap
                  const originX = 75 + (pIdx % 4) * 160;
                  const originY = 60 + Math.floor(pIdx / 4) * 120;

                  // Slice trajectory up to activeFrame
                  const visibleTraj = pt.trajectory.slice(0, activeFrame + 1);
                  const currentPoint = visibleTraj[visibleTraj.length - 1];
                  const curX = originX + currentPoint.xMicrons * 15;
                  const curY = originY + currentPoint.yMicrons * 15;

                  // Path for tail
                  const tailPath = visibleTraj
                    .map((p, idx) => {
                      const px = originX + p.xMicrons * 15;
                      const py = originY + p.yMicrons * 15;
                      return `${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
                    })
                    .join(' ');

                  const isSelected = selectedParticleId === pt.particleId;

                  return (
                    <g
                      key={pt.particleId}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedParticleId(pt.particleId);
                        sound.playBrownianParticleTrackChirp?.(pt.apparentDiameterNm);
                      }}
                    >
                      {/* Trajectory Line */}
                      <path
                        d={tailPath}
                        fill="none"
                        stroke={isSelected ? '#f43f5e' : '#a5b4fc'}
                        strokeWidth={isSelected ? '2' : '1.2'}
                        strokeDasharray={isSelected ? 'none' : '2 2'}
                        opacity="0.85"
                      />

                      {/* Scattering Halo Glow */}
                      <circle
                        cx={curX}
                        cy={curY}
                        r={Math.max(5, (pt.apparentDiameterNm / standard.trueModeDiameterNm) * 10)}
                        fill="url(#laserGlow)"
                      />

                      {/* Core Nanoparticle Dot */}
                      <circle
                        cx={curX}
                        cy={curY}
                        r={isSelected ? '5' : '3.5'}
                        fill={isSelected ? '#fb7185' : '#ffffff'}
                        stroke={isSelected ? '#ffffff' : '#818cf8'}
                        strokeWidth="1.5"
                      />

                      {/* Particle Tag */}
                      <text
                        x={curX + 8}
                        y={curY - 6}
                        fill={isSelected ? '#fda4af' : '#c7d2fe'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        #{pt.particleId} ({pt.apparentDiameterNm} nm)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Particle Tracking Details Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-navy-light text-ivory-muted font-mono">
                    <th className="py-2 px-3">Hạt #</th>
                    <th className="py-2 px-3">Đường Kính Đo Được (nm)</th>
                    <th className="py-2 px-3">Hệ Số Khuếch Tán D_t (m²/s)</th>
                    <th className="py-2 px-3">Cường Độ Tán Xạ (ADU)</th>
                    <th className="py-2 px-3">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/40 font-mono">
                  {simulation.trackedParticles.map((p) => {
                    const isSelected = selectedParticleId === p.particleId;
                    return (
                      <tr
                        key={p.particleId}
                        className={`hover:bg-navy-light/30 transition-colors ${
                          isSelected ? 'bg-indigo-950/40 text-indigo-200' : ''
                        }`}
                      >
                        <td className="py-2 px-3 font-bold text-white flex items-center gap-1.5">
                          <CircleDot className="w-3.5 h-3.5 text-indigo-400" />
                          Hạt #{p.particleId}
                        </td>
                        <td className="py-2 px-3 text-cyan-300 font-bold">{p.apparentDiameterNm} nm</td>
                        <td className="py-2 px-3 text-purple-300">
                          {(p.diffusionCoeffM2S * 1e12).toFixed(3)} × 10⁻¹²
                        </td>
                        <td className="py-2 px-3 text-amber-300">{p.scatteringIntensityAdu} ADU</td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => {
                              setSelectedParticleId(p.particleId);
                              sound.playBrownianParticleTrackChirp?.(p.apparentDiameterNm);
                            }}
                            className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/40 text-[10px]"
                          >
                            Bám Vết 🔊
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Size Distribution Histogram View */}
      {activeSubTab === 'SIZE_DISTRIBUTION' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Phổ Phân Bố Kích Thước Hạt NTA (Particle Size Distribution - PSD)
              </h3>
              <p className="text-xs text-ivory-muted mt-0.5">
                Trục tung: Nồng độ tuyệt đối (hạt/mL) · Trục hoành: Đường kính thủy động học d_H (nm)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-indigo-300">Mode: {simulation.modeDiameterNm} nm</span>
              <span className="text-emerald-300">Mean: {simulation.meanDiameterNm} nm</span>
              <span className="text-teal-300">Span: {simulation.spanMetric}</span>
            </div>
          </div>

          {/* SVG Histogram Canvas */}
          <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
            <svg viewBox="0 0 800 260" className="w-full h-full">
              {/* Axes */}
              <line x1="50" y1="20" x2="50" y2="230" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="230" x2="780" y2="230" stroke="#475569" strokeWidth="1.5" />

              {/* Mode Indicator Line */}
              {(() => {
                const pts = simulation.distributionCurve;
                if (pts.length < 2) return null;
                const minD = pts[0].diameterNm;
                const maxD = pts[pts.length - 1].diameterNm;
                const xMode = 50 + ((simulation.modeDiameterNm - minD) / (maxD - minD)) * 730;

                return (
                  <g>
                    <line x1={xMode} y1="30" x2={xMode} y2="230" stroke="#a855f7" strokeDasharray="4 2" strokeWidth="1.5" />
                    <text x={xMode + 5} y="42" fill="#c084fc" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                      Mode: {simulation.modeDiameterNm} nm
                    </text>
                  </g>
                );
              })()}

              {/* Distribution Histogram Curve */}
              {(() => {
                const pts = simulation.distributionCurve;
                if (pts.length < 2) return null;
                const minD = pts[0].diameterNm;
                const maxD = pts[pts.length - 1].diameterNm;
                const maxConc = Math.max(...pts.map((p) => p.concentrationParticlesPerMl));

                const pathD = pts
                  .map((p, idx) => {
                    const x = 50 + ((p.diameterNm - minD) / (maxD - minD)) * 730;
                    const y = 230 - (p.concentrationParticlesPerMl / maxConc) * 190;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  })
                  .join(' ');

                return (
                  <g>
                    <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                    <path
                      d={`${pathD} L 780 230 L 50 230 Z`}
                      fill="url(#ntaCurveGradient)"
                      opacity="0.3"
                    />
                  </g>
                );
              })()}

              <defs>
                <linearGradient id="ntaCurveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Stokes-Einstein Physical Principles View */}
      {activeSubTab === 'STOKES_EINSTEIN' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Atom className="w-4 h-4 text-teal-400" />
              Cơ Sở Vật Lý: Phương Trình Stokes-Einstein & Dịch Chuyển Trung Bình Brown
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Albert Einstein (1905) chứng minh chuyển động nhiệt Brown là bằng chứng thực nghiệm trực tiếp về
              sự tồn tại của các phân tử vật chất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-2">
              <span className="text-xs font-bold text-teal-300">
                1. Phương Trình Stokes-Einstein Khuếch Tán (D_t)
              </span>
              <div className="p-3 bg-navy-light/40 rounded-lg text-sm font-mono text-center text-teal-200">
                D_t = (k_B · T) / (3 · π · η · d_H)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                • <strong>k_B</strong>: Hằng số Boltzmann = 1.380649 × 10⁻²³ J/K
                <br />• <strong>T</strong>: Nhiệt độ tuyệt đối Kelvin = {(temperatureCelsius + 273.15).toFixed(1)} K
                <br />• <strong>η</strong>: Độ nhớt động lực môi trường = {simulation.mediumViscosityMpaS.toFixed(3)} mPa·s
                <br />• <strong>d_H</strong>: Đường kính thủy động học hạt vi mô
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-2">
              <span className="text-xs font-bold text-indigo-300">
                2. Dịch Chuyển Bình Phương Trung Bình 2D (MSD)
              </span>
              <div className="p-3 bg-navy-light/40 rounded-lg text-sm font-mono text-center text-indigo-200">
                ⟨(Δx)² + (Δy)²⟩ = 4 · D_t · Δt
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Kính hiển vi NTA ghi lại video tại 30 khung hình/giây (Δt = 33.3 ms). Bằng cách đo tọa độ (x, y)
                từng hạt qua các frame liên tiếp, máy tính trích xuất hệ số khuếch tán D_t của từng hạt và suy ra
                đường kính d_H độc lập mà không bị che lấp bởi các hạt lớn như trong phương pháp DLS.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Biomedical Applications & Curriculum Notes */}
      {activeSubTab === 'BIOMEDICAL_APPLICATIONS' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Ứng Dụng Y Sinh Học & Chương Trình GDPT 2018
              </h3>
              <p className="text-xs text-ivory-muted">
                Chuẩn MISEV2018 cho túi ngoại bào Exosome và tiêu chuẩn USP &lt;1243&gt; cho thuốc tiêm nano.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Sinh Thiết Lỏng Exosome
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Tế bào ung thư bài tiết lượng lớn túi ngoại bào (30-150 nm). NTA cho phép định lượng chính xác
                nồng độ hạt (hạt/mL) trong máu mà không cần màng lọc phức tạp.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Vaccine mRNA & LNP
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Hạt nano lipid cần duy trì kích thước tối ưu (60-100 nm) để bảo vệ mRNA khỏi enzym ribonuclease
                và đảm bảo quá trình nhập bào (endocytosis) thành công.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> GDPT 2018 Liên Môn
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
