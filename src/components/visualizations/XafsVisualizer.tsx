// src/components/visualizations/XafsVisualizer.tsx
// Milestone 73: X-ray Absorption Fine Structure (XAFS), XANES Chemical Valence & EXAFS Coordination Shell Visualizer
// Standards: IUPAC Physical Chemistry & Synchrotron Radiation X-ray Spectroscopy Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Cấu trúc vỏ nguyên tử, phân lớp electron và tia X; Hóa học 12: Phức chất phối trí, trạng thái oxy hóa kim loại chuyển tiếp, xúc tác đơn nguyên tử; Sinh học 11: Quang hợp và cụm Mn4CaO5 tạo oxy; Vật lý 12: Bức xạ hãm bức xạ synchrotron, hiệu ứng quang điện trong và tán xạ lượng tử)

import React, { useState, useMemo } from 'react';
import {
  XAFS_STANDARD_CATALOG,
  XafsStandard,
  simulateXafsExperiment,
  calculateFourierTransformRSpace,
  calculateWavevectorK,
  SILICON_111_D_SPACING_ANGSTROM
} from '../../domain/xafsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Zap,
  Activity,
  Layers,
  Info,
  Sliders,
  CheckCircle2,
  Atom,
  RotateCcw,
  Flame,
  FileText,
  Compass,
  Play,
  Eye,
  Crosshair,
  Volume2,
  Sparkles,
  Target,
  Sun,
  Radio,
  Cpu
} from 'lucide-react';

export interface XafsVisualizerProps {
  initialStandardId?: string;
}

export const XafsVisualizer: React.FC<XafsVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'cu_foil_reference'
  );

  // Active Standard
  const standard: XafsStandard = useMemo(() => {
    return (
      XAFS_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) ||
      XAFS_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Energy state: initialize near edge threshold E_0
  const [incidentEnergyEv, setIncidentEnergyEv] = useState<number>(
    standard.xanes.edgeEnergyE0Ev
  );
  const [kWeight, setKWeight] = useState<1 | 2 | 3>(2);
  const [viewMode, setViewMode] = useState<'XANES' | 'EXAFS' | 'R_SPACE' | 'BEAMLINE'>('XANES');
  const [isSweeping, setIsSweeping] = useState<boolean>(false);

  // When standard changes, re-center energy at edge
  const handleSelectStandard = (newId: string) => {
    setSelectedStandardId(newId);
    const targetStd = XAFS_STANDARD_CATALOG.find((s) => s.id === newId) || XAFS_STANDARD_CATALOG[0];
    setIncidentEnergyEv(targetStd.xanes.edgeEnergyE0Ev);
    sound.playUiClick();
    sound.playSynchrotronMonochromatorEnergySweep?.(targetStd.xanes.edgeEnergyE0Ev);
  };

  // Run simulation
  const simResult = useMemo(() => {
    return simulateXafsExperiment(standard, incidentEnergyEv);
  }, [standard, incidentEnergyEv]);

  // Fourier Transform R-space points with current k-weight
  const rSpacePoints = useMemo(() => {
    return calculateFourierTransformRSpace(simResult.spectrumCurve, standard, kWeight, 2.0, 12.0);
  }, [simResult.spectrumCurve, standard, kWeight]);

  // Slider change handler
  const handleEnergyChange = (newEnergy: number) => {
    setIncidentEnergyEv(newEnergy);
    const k = calculateWavevectorK(newEnergy, standard.xanes.edgeEnergyE0Ev);
    if (Math.abs(newEnergy) % 15 < 1) {
      if (k >= 2.0) {
        sound.playExafsPhotoelectronInterferenceChime?.(k);
      } else {
        sound.playSynchrotronMonochromatorEnergySweep?.(newEnergy);
      }
    }
  };

  // Auto-tune to threshold E_0
  const handleAutoTuneEdge = () => {
    setIncidentEnergyEv(standard.xanes.edgeEnergyE0Ev);
    sound.playUiClick();
    sound.playSynchrotronMonochromatorEnergySweep?.(standard.xanes.edgeEnergyE0Ev);
  };

  // Auto-tune to white-line maximum
  const handleAutoTuneWhiteLine = () => {
    setIncidentEnergyEv(standard.xanes.whiteLineEnergyEv);
    sound.playUiClick();
    sound.playExafsPhotoelectronInterferenceChime?.(3.0);
  };

  // Run rapid beamline energy sweep animation
  const handleRunEnergySweep = () => {
    sound.playUiClick();
    sound.playSynchrotronMonochromatorEnergySweep?.(standard.xanes.edgeEnergyE0Ev);
    setIsSweeping(true);
    let stepCount = 0;
    const interval = setInterval(() => {
      stepCount++;
      const sweepE = standard.xanes.edgeEnergyE0Ev - 20 + stepCount * 25;
      setIncidentEnergyEv(Math.min(standard.xanes.edgeEnergyE0Ev + 350, sweepE));
      if (stepCount >= 15) {
        clearInterval(interval);
        setIsSweeping(false);
        sound.playExafsPhotoelectronInterferenceChime?.(8.0);
      }
    }, 40);
  };

  // Plot dimensions
  const svgWidth = 620;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Render SVG Path for XANES / full spectrum
  const xanesPath = useMemo(() => {
    if (simResult.spectrumCurve.length === 0) return '';
    const minE = standard.xanes.edgeEnergyE0Ev - 40;
    const maxE = standard.xanes.edgeEnergyE0Ev + 500;
    const maxMu = Math.max(2.6, standard.xanes.whiteLineIntensity * 1.25);

    return simResult.spectrumCurve
      .filter((p) => p.energyEv >= minE && p.energyEv <= maxE)
      .map((p, idx) => {
        const x = padding.left + ((p.energyEv - minE) / (maxE - minE)) * plotWidth;
        const y = padding.top + plotHeight - (Math.max(0, p.absorptionMu) / maxMu) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [simResult.spectrumCurve, standard, plotWidth, plotHeight, padding]);

  // Render SVG Path for EXAFS chi(k)
  const exafsPath = useMemo(() => {
    const kPts = simResult.spectrumCurve.filter((p) => p.kWavevector >= 1.5 && p.kWavevector <= 14.0);
    if (kPts.length === 0) return '';
    const minK = 1.5;
    const maxK = 14.0;

    // Determine max amplitude based on k-weight
    const values = kPts.map((p) =>
      kWeight === 1 ? p.k1ChiK : kWeight === 2 ? p.k2ChiK : p.k3ChiK
    );
    const maxAmp = Math.max(0.1, ...values.map((v) => Math.abs(v))) * 1.2;

    return kPts
      .map((p, idx) => {
        const val = kWeight === 1 ? p.k1ChiK : kWeight === 2 ? p.k2ChiK : p.k3ChiK;
        const x = padding.left + ((p.kWavevector - minK) / (maxK - minK)) * plotWidth;
        const y = padding.top + plotHeight / 2 - (val / maxAmp) * (plotHeight / 2);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [simResult.spectrumCurve, kWeight, plotWidth, plotHeight, padding]);

  // Render SVG Path for R-space Fourier Transform
  const rSpacePath = useMemo(() => {
    if (rSpacePoints.length === 0) return '';
    const minR = 0.5;
    const maxR = 6.0;
    const maxMag = Math.max(0.01, ...rSpacePoints.map((p) => p.radialMagnitude)) * 1.2;

    return rSpacePoints
      .map((p, idx) => {
        const x = padding.left + ((p.radialDistanceR - minR) / (maxR - minR)) * plotWidth;
        const y = padding.top + plotHeight - (p.radialMagnitude / maxMag) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [rSpacePoints, plotWidth, plotHeight, padding]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-navy-dark via-navy to-obsidian border border-cyan-500/30 text-ivory space-y-6 shadow-2xl">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg ring-1 ring-cyan-400/40">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-400 border border-cyan-500/40 font-bold uppercase tracking-wider">
                SYNCHROTRON X-RAY ABSORPTION (XAFS)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold">
                IUPAC PHYSICAL CHEMISTRY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold">
                GDPT 2018 METROLOGY
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-ivory mt-1">
              Quang Phổ Hấp Thụ Tia X (XAFS): XANES Hóa Trị & EXAFS Phối Trí
            </h2>
          </div>
        </div>
      </div>

      {/* Specimen Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Layers className="w-4 h-4 text-cyan-400" />
            CHỌN MẪU CHUẨN XAFS (SYNCHROTRON BENCHMARK CATALOG):
          </span>
          <span className="text-[11px] text-ivory-muted">5 Chuẩn Phổ Quốc Tế</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {XAFS_STANDARD_CATALOG.map((std) => {
            const isSelected = std.id === selectedStandardId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectStandard(std.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/90 border-cyan-400 text-ivory shadow-lg ring-1 ring-cyan-400/50'
                    : 'bg-navy/50 border-navy-light/40 text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-navy-dark text-ivory-muted'
                      }`}
                    >
                      {std.absorberElement} {std.edgeType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold">
                      {std.xanes.edgeEnergyE0Ev} eV
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ivory mt-1 line-clamp-1">{std.name}</h4>
                  <p className="text-[10px] text-ivory-muted line-clamp-1">{std.chemicalFormula}</p>
                </div>
                <div className="text-[9px] font-mono text-cyan-400/80 truncate">
                  Oxidation: {std.xanes.oxidationState}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-obsidian/70 border border-cyan-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Năng Lượng Tia X Tới (E):
          </span>
          <strong className="text-cyan-300 text-base font-bold">
            {incidentEnergyEv.toFixed(1)} eV
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Ngưỡng E₀ = {standard.xanes.edgeEnergyE0Ev} eV
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-amber-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Góc Tinh Thể Si(111) (θ):
          </span>
          <strong className="text-amber-300 text-base font-bold">
            {simResult.monochromatorAngleDeg.toFixed(2)}°
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Bragg: 2d·sinθ = λ (d=3.136 Å)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-emerald-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Vector Sóng Quang Electron (k):
          </span>
          <strong className="text-emerald-300 text-base font-bold">
            {simResult.currentK.toFixed(2)} Å⁻¹
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            χ(k) = {simResult.currentChiK >= 0 ? '+' : ''}
            {simResult.currentChiK.toFixed(4)}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-violet-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Độ Hấp Thụ Chuẩn Hóa μ(E):
          </span>
          <strong className="text-violet-300 text-base font-bold">
            {simResult.absorptionCoefficientMu.toFixed(3)}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Truyền qua: {simResult.transmittedIntensityPercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Multi-View Mode Tabs */}
      <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('XANES');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'XANES'
                ? 'bg-cyan-600 text-white shadow ring-1 ring-cyan-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            1. XANES Năng Lượng μ(E)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('EXAFS');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'EXAFS'
                ? 'bg-emerald-600 text-white shadow ring-1 ring-emerald-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            2. Dao Động EXAFS χ(k)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('R_SPACE');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'R_SPACE'
                ? 'bg-violet-600 text-white shadow ring-1 ring-violet-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            3. Phân Bố Bán Kính R-space |FT|
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('BEAMLINE');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'BEAMLINE'
                ? 'bg-amber-600 text-white shadow ring-1 ring-amber-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            4. Sơ Đồ Beamline Synchrotron
          </button>
        </div>

        {viewMode === 'EXAFS' && (
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <span className="text-ivory-muted">Trọng số k:</span>
            {([1, 2, 3] as const).map((w) => (
              <button
                key={w}
                onClick={() => {
                  sound.playUiClick();
                  setKWeight(w);
                }}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  kWeight === w ? 'bg-emerald-500 text-obsidian' : 'bg-navy-light text-ivory-muted'
                }`}
              >
                k^{w}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="p-4 rounded-xl bg-obsidian/90 border border-cyan-500/30 flex flex-col items-center">
        {viewMode === 'XANES' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Đồ thị Phổ Hấp Thụ XANES: μ(E) vs Năng Lượng Photon (eV)</span>
              <span className="text-ivory-muted text-[10px]">
                Dịch chuyển hóa học ΔE = +{standard.xanes.edgeShiftDeltaEv} eV ({standard.xanes.oxidationState})
              </span>
            </div>
            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                {/* Grid Lines */}
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* E0 threshold vertical dashed line */}
                {(() => {
                  const minE = standard.xanes.edgeEnergyE0Ev - 40;
                  const maxE = standard.xanes.edgeEnergyE0Ev + 500;
                  const xE0 = padding.left + ((standard.xanes.edgeEnergyE0Ev - minE) / (maxE - minE)) * plotWidth;
                  return (
                    <g>
                      <line x1={xE0} y1={padding.top} x2={xE0} y2={padding.top + plotHeight} stroke="#06b6d4" strokeDasharray="4 3" strokeWidth="1.5" />
                      <text x={xE0 + 4} y={padding.top + 14} fill="#06b6d4" fontSize="10" fontFamily="monospace">
                        E₀ ({standard.xanes.edgeEnergyE0Ev} eV)
                      </text>
                    </g>
                  );
                })()}

                {/* White Line Marker */}
                {(() => {
                  const minE = standard.xanes.edgeEnergyE0Ev - 40;
                  const maxE = standard.xanes.edgeEnergyE0Ev + 500;
                  const xWL = padding.left + ((standard.xanes.whiteLineEnergyEv - minE) / (maxE - minE)) * plotWidth;
                  return (
                    <g>
                      <line x1={xWL} y1={padding.top} x2={xWL} y2={padding.top + plotHeight} stroke="#ec4899" strokeDasharray="2 2" strokeWidth="1" />
                      <text x={xWL - 35} y={padding.top + 28} fill="#ec4899" fontSize="9" fontFamily="monospace">
                        White-Line ({standard.xanes.whiteLineEnergyEv} eV)
                      </text>
                    </g>
                  );
                })()}

                {/* Current Incident Energy Marker */}
                {(() => {
                  const minE = standard.xanes.edgeEnergyE0Ev - 40;
                  const maxE = standard.xanes.edgeEnergyE0Ev + 500;
                  if (incidentEnergyEv >= minE && incidentEnergyEv <= maxE) {
                    const xCur = padding.left + ((incidentEnergyEv - minE) / (maxE - minE)) * plotWidth;
                    return (
                      <g>
                        <line x1={xCur} y1={padding.top} x2={xCur} y2={padding.top + plotHeight} stroke="#eab308" strokeWidth="2" />
                        <circle cx={xCur} cy={padding.top + plotHeight - (simResult.absorptionCoefficientMu / 2.6) * plotHeight} r="4" fill="#eab308" />
                        <text x={xCur + 5} y={padding.top + plotHeight - 10} fill="#eab308" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          E = {incidentEnergyEv.toFixed(0)} eV
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}

                {/* Curve */}
                <path d={xanesPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Năng Lượng Tia X (eV)
                </text>
                <text x={15} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 15 ${padding.top + plotHeight / 2})`}>
                  Hấp Thụ μ(E)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'EXAFS' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Đồ thị Dao Động Giao Thoa Sóng Quang Electron EXAFS: k^{kWeight}·χ(k) vs k (Å⁻¹)</span>
              <span className="text-ivory-muted text-[10px]">
                Phương trình EXAFS: Tán xạ ngược từ các lớp phối trí nguyên tử
              </span>
            </div>
            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                {/* Center Baseline y=0 */}
                <line x1={padding.left} y1={padding.top + plotHeight / 2} x2={padding.left + plotWidth} y2={padding.top + plotHeight / 2} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Current k Marker */}
                {(() => {
                  const minK = 1.5;
                  const maxK = 14.0;
                  if (simResult.currentK >= minK && simResult.currentK <= maxK) {
                    const xK = padding.left + ((simResult.currentK - minK) / (maxK - minK)) * plotWidth;
                    return (
                      <g>
                        <line x1={xK} y1={padding.top} x2={xK} y2={padding.top + plotHeight} stroke="#eab308" strokeWidth="1.5" />
                        <text x={xK + 4} y={padding.top + 16} fill="#eab308" fontSize="10" fontFamily="monospace">
                          k = {simResult.currentK.toFixed(2)} Å⁻¹
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}

                {/* EXAFS Oscillatory Curve */}
                <path d={exafsPath} fill="none" stroke="#10b981" strokeWidth="2.2" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Số Sóng Quang Electron k (Å⁻¹)
                </text>
                <text x={15} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 15 ${padding.top + plotHeight / 2})`}>
                  k^{kWeight}·χ(k)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'R_SPACE' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-violet-300">
              <span>Biến Đổi Fourier |FT[k^{kWeight}·χ(k)]| Sang Không Gian Bán Kính Phối Trí R (Å)</span>
              <span className="text-ivory-muted text-[10px]">
                Đỉnh biên độ tương ứng với khoảng cách nguyên tử lân cận (R - α)
              </span>
            </div>
            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Peak indicators for coordination shells */}
                {standard.shells.map((sh) => {
                  const minR = 0.5;
                  const maxR = 6.0;
                  // Experimental peak in R-space is shifted down by phase shift ~0.3-0.5 A
                  const apparentR = Math.max(minR, sh.radialDistanceAngstrom - 0.4);
                  const xSh = padding.left + ((apparentR - minR) / (maxR - minR)) * plotWidth;
                  if (sh.coordinationNumber <= 0) return null;
                  return (
                    <g key={sh.shellIndex}>
                      <line x1={xSh} y1={padding.top + 20} x2={xSh} y2={padding.top + plotHeight} stroke="#a855f7" strokeDasharray="3 3" strokeWidth="1" />
                      <text x={xSh - 15} y={padding.top + 16} fill="#c084fc" fontSize="9" fontFamily="monospace">
                        Lớp {sh.shellIndex}: {sh.scattererElement} ({sh.radialDistanceAngstrom}Å)
                      </text>
                    </g>
                  );
                })}

                {/* R-space Curve */}
                <path d={rSpacePath} fill="none" stroke="#a855f7" strokeWidth="2.5" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Bán Kính Phối Trí R (Ångström)
                </text>
                <text x={15} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 15 ${padding.top + plotHeight / 2})`}>
                  Biên Độ |FT(R)|
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'BEAMLINE' && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Sơ Đồ Hệ Thống Trạm Đo Beamline Quang Phổ XAFS Tại Trung Tâm Synchrotron</span>
              <span className="text-ivory-muted text-[10px]">Từ Vành Trữ Điện Tử (Storage Ring) Đến Buồng Ion Hóa</span>
            </div>
            <div className="p-4 rounded-xl bg-navy/60 border border-amber-500/30 flex flex-col items-center">
              <svg width={svgWidth} height={160} className="w-full max-w-xl">
                {/* Storage ring source */}
                <rect x="20" y="55" width="80" height="50" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="60" y="78" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Storage Ring
                </text>
                <text x="60" y="93" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  3.0 GeV e⁻
                </text>

                {/* White X-ray Beam */}
                <line x1="100" y1="80" x2="160" y2="80" stroke="#f8fafc" strokeWidth="4" />

                {/* Double Crystal Monochromator Si(111) */}
                <rect x="160" y="50" width="75" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
                <text x="197" y="75" fill="#fde047" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  DCM Si(111)
                </text>
                <text x="197" y="90" fill="#fde047" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  θ = {simResult.monochromatorAngleDeg.toFixed(1)}°
                </text>

                {/* Monochromatic Beam */}
                <line x1="235" y1="80" x2="295" y2="80" stroke="#38bdf8" strokeWidth="2.5" />

                {/* I_0 Ionization chamber */}
                <rect x="295" y="60" width="55" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.2" />
                <text x="322" y="78" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  I₀ (Ion)
                </text>
                <text x="322" y="91" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  100%
                </text>

                {/* Beam to sample */}
                <line x1="350" y1="80" x2="395" y2="80" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Sample holder */}
                <rect x="395" y="45" width="50" height="70" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
                <text x="420" y="75" fill="#e9d5ff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {standard.absorberElement}
                </text>
                <text x="420" y="90" fill="#c084fc" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Mẫu Đo
                </text>

                {/* Transmitted beam */}
                <line x1="445" y1="80" x2="495" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />

                {/* I_t Ionization chamber */}
                <rect x="495" y="60" width="55" height="40" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1.2" />
                <text x="522" y="78" fill="#f472b6" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Iₜ (Ion)
                </text>
                <text x="522" y="91" fill="#f472b6" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  {simResult.transmittedIntensityPercent.toFixed(1)}%
                </text>
              </svg>
              <p className="text-[11px] font-mono text-ivory-muted mt-2 text-center">
                Định luật Lambert-Beer trong XAFS: μ(E)·x = ln(I₀ / Iₜ). Bước sóng chọn lọc bởi góc Bragg: λ = 2d·sinθ.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls & Sweep Bar */}
      <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              ĐIỀU KHIỂN NĂNG LƯỢNG TIA X TỚI (ENERGY SCAN):
            </span>
            <span className="text-xs font-mono text-yellow-300 font-bold">
              {incidentEnergyEv.toFixed(1)} eV
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoTuneEdge}
              className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900/60 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <Target className="w-3.5 h-3.5" />
              Ngưỡng E₀ ({standard.xanes.edgeEnergyE0Ev} eV)
            </button>
            <button
              onClick={handleAutoTuneWhiteLine}
              className="px-2.5 py-1 rounded bg-pink-950 border border-pink-500/50 hover:bg-pink-900/60 text-pink-200 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              White-Line ({standard.xanes.whiteLineEnergyEv} eV)
            </button>
            <button
              onClick={handleRunEnergySweep}
              disabled={isSweeping}
              className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow ${
                isSweeping
                  ? 'bg-amber-600 text-obsidian animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-obsidian font-extrabold'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isSweeping ? 'Đang Quét Phổ...' : 'Quét Phổ Nhanh (Energy Sweep)'}
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={standard.xanes.edgeEnergyE0Ev - 35}
          max={standard.xanes.edgeEnergyE0Ev + 450}
          step={1}
          value={incidentEnergyEv}
          onChange={(e) => handleEnergyChange(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer h-2 bg-obsidian rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
          <span>{standard.xanes.edgeEnergyE0Ev - 35} eV (Tiền ngưỡng)</span>
          <span className="text-cyan-300 font-bold">Vùng XANES: Ngưỡng hấp thụ & dịch chuyển hóa học</span>
          <span>{standard.xanes.edgeEnergyE0Ev + 450} eV (Vùng EXAFS dao động k)</span>
        </div>
      </div>

      {/* Coordination Shells Breakdown Table */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
          <Atom className="w-4 h-4 text-cyan-400" />
          KẾT QUẢ KHỚP CẤU TRÚC PHỐI TRÍ EXAFS (COORDINATION SHELL FITTING PARAMETERS):
        </h3>
        <div className="overflow-x-auto rounded-xl border border-navy-light/40">
          <table className="w-full text-left font-mono text-xs bg-navy/40">
            <thead className="bg-obsidian/60 text-ivory-muted border-b border-navy-light/40 text-[11px]">
              <tr>
                <th className="p-2.5">Lớp (Shell)</th>
                <th className="p-2.5">Nguyên Tử Tán Xạ</th>
                <th className="p-2.5">Số Phối Trí (Nⱼ)</th>
                <th className="p-2.5">Khoảng Cách Rⱼ (Å)</th>
                <th className="p-2.5">Hệ Số Rối Loạn Debye-Waller (σⱼ² Å²)</th>
                <th className="p-2.5">Ý Nghĩa Cấu Trúc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light/30">
              {standard.shells.map((sh) => (
                <tr key={sh.shellIndex} className="hover:bg-navy-light/20 transition-colors">
                  <td className="p-2.5 font-bold text-cyan-300">Lớp {sh.shellIndex}</td>
                  <td className="p-2.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-200 font-bold">
                      {sh.scattererElement} (Z={sh.scattererAtomicNumber})
                    </span>
                  </td>
                  <td className="p-2.5 font-bold">
                    {sh.coordinationNumber === 0 ? (
                      <span className="text-emerald-400 font-bold">
                        N = 0.0 (Triệt tiêu liên kết kim loại - Đơn nguyên tử)
                      </span>
                    ) : (
                      <span className="text-ivory">{sh.coordinationNumber.toFixed(1)}</span>
                    )}
                  </td>
                  <td className="p-2.5 font-bold text-amber-300">{sh.radialDistanceAngstrom.toFixed(3)} Å</td>
                  <td className="p-2.5 text-violet-300">{sh.debyeWallerFactorAngstromSq.toFixed(4)}</td>
                  <td className="p-2.5 text-ivory-muted text-[11px]">
                    {sh.coordinationNumber === 0
                      ? 'Minh chứng vàng: không có cụm nano kim loại'
                      : sh.shellIndex === 1
                      ? 'Lớp phối trí thứ nhất (liên kết phối tử trực tiếp)'
                      : `Lớp phối trí thứ ${sh.shellIndex} (tán xạ cầu ngoài)`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curriculum & Synchrotron Significance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-navy/40 border border-cyan-500/30 space-y-2">
          <h4 className="font-semibold text-cyan-300 flex items-center gap-1.5 font-mono">
            <FileText className="w-4 h-4 text-cyan-400" />
            CHƯƠNG TRÌNH GDPT 2018 (HÓA HỌC & VẬT LÝ 10–12):
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.curriculumNotes}
          </p>
          <div className="text-[10px] font-mono text-cyan-400/80 pt-1 border-t border-navy-light/30">
            Trọng tâm: Quy tắc dịch chuyển ngưỡng hấp thụ theo hóa trị kim loại chuyển tiếp; cơ chế hấp thụ và tán xạ lượng tử của electron lớp trong (K, L).
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy/40 border border-amber-500/30 space-y-2">
          <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 font-mono">
            <Sun className="w-4 h-4 text-amber-400" />
            Ý NGHĨA KHOA HỌC VÀ BỨC XẠ SYNCHROTRON:
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.synchrotronSignificance}
          </p>
          <div className="text-[10px] font-mono text-amber-300/80 pt-1 border-t border-navy-light/30">
            Độ chính xác đo đạc khoảng cách liên kết: ±0.01 Å; độ nhạy nguyên tố đặc thù 100% không phụ thuộc trạng thái kết tinh hay vô định hình.
          </div>
        </div>
      </div>

      {/* Provenance Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3">
        <span>Nguồn: International X-ray Absorption Society (IXAS) & Synchrotron Beamline Standards</span>
        <span className="text-cyan-400 font-semibold">IUPAC & GDPT 2018 AUDITED</span>
      </div>
    </div>
  );
};
