// src/components/visualizations/DmaVisualizer.tsx
// Milestone 74: Dynamic Mechanical Analysis (DMA), Viscoelastic Loss Modulus & Glass Transition (Tg) Visualizer
// Standards: IUPAC Polymer Division & ISO 6721 / ASTM D4065 Dynamic Mechanical Testing Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 12: Đại cương về polymer, vật liệu polymer - chất dẻo, cao su, tơ sợi, composite; Vật lý 12: Biến dạng cơ học của vật rắn, dao động cưỡng bức có ma sát và tiêu tán cơ năng)

import React, { useState, useMemo } from 'react';
import {
  DMA_STANDARD_CATALOG,
  DmaStandard,
  simulateDmaMeasurement,
  calculateWlfShiftFactorLogAT,
  WLF_C1_UNIVERSAL,
  WLF_C2_UNIVERSAL
} from '../../domain/dmaEngine';
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
  Cpu,
  Thermometer,
  ShieldAlert,
  Wind
} from 'lucide-react';

export interface DmaVisualizerProps {
  initialStandardId?: string;
}

export const DmaVisualizer: React.FC<DmaVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'pmma_plexiglas'
  );

  // Active Standard
  const standard: DmaStandard = useMemo(() => {
    return (
      DMA_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) ||
      DMA_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Temperature state: initialize at 25°C or near standard's Tg
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [frequencyHz, setFrequencyHz] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'TEMP_SCAN' | 'TTS_WLF' | 'HYSTERESIS' | 'CLAMP_GEOMETRY'>('TEMP_SCAN');
  const [isRamping, setIsRamping] = useState<boolean>(false);

  // Handle Standard selection
  const handleSelectStandard = (newId: string) => {
    setSelectedStandardId(newId);
    const targetStd = DMA_STANDARD_CATALOG.find((s) => s.id === newId) || DMA_STANDARD_CATALOG[0];
    sound.playUiClick();
    sound.playDmaOscillationFrequencyHum?.(frequencyHz);
    // If elastomer with negative Tg, start at -20°C, otherwise 25°C
    if (targetStd.glassTransitionTgCelsius < 0) {
      setTemperatureCelsius(-20.0);
    } else {
      setTemperatureCelsius(25.0);
    }
  };

  // Run DMA simulation
  const simResult = useMemo(() => {
    return simulateDmaMeasurement(standard, temperatureCelsius, frequencyHz, 0.05);
  }, [standard, temperatureCelsius, frequencyHz]);

  // Handle Temperature slider change
  const handleTempChange = (newT: number) => {
    setTemperatureCelsius(newT);
    if (Math.abs(newT) % 10 < 1) {
      if (Math.abs(newT - standard.glassTransitionTgCelsius) < standard.transitionWidthCelsius) {
        sound.playGlassTransitionDampingChime?.(simResult.tanDelta);
      } else {
        sound.playDmaOscillationFrequencyHum?.(frequencyHz);
      }
    }
  };

  // Auto-tune to Glass Transition Tg
  const handleAutoTuneTg = () => {
    setTemperatureCelsius(standard.glassTransitionTgCelsius);
    sound.playUiClick();
    sound.playGlassTransitionDampingChime?.(standard.peakTanDelta);
  };

  // Run automated temperature ramp animation
  const handleRunTempRamp = () => {
    sound.playUiClick();
    sound.playDmaOscillationFrequencyHum?.(frequencyHz);
    setIsRamping(true);

    const startT = standard.glassTransitionTgCelsius - 40;
    const endT = standard.glassTransitionTgCelsius + 40;
    let stepCount = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      stepCount++;
      const curT = startT + (stepCount / totalSteps) * (endT - startT);
      setTemperatureCelsius(Math.round(curT));

      if (stepCount >= totalSteps) {
        clearInterval(interval);
        setIsRamping(false);
        sound.playGlassTransitionDampingChime?.(standard.peakTanDelta);
      }
    }, 45);
  };

  // Format modulus with engineering units (GPa or MPa)
  const formatModulus = (modulusPa: number): string => {
    if (modulusPa >= 1e9) {
      return `${(modulusPa / 1e9).toFixed(2)} GPa`;
    }
    if (modulusPa >= 1e6) {
      return `${(modulusPa / 1e6).toFixed(2)} MPa`;
    }
    return `${(modulusPa / 1e3).toFixed(1)} kPa`;
  };

  // SVG Canvas dimensions
  const svgWidth = 620;
  const svgHeight = 220;
  const padding = { top: 20, right: 45, bottom: 35, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Temperature Scan SVG paths (E' and Tan Delta)
  const { ePrimePath, tanDeltaPath, minT, maxT } = useMemo(() => {
    const pts = simResult.temperatureScanCurve;
    if (pts.length === 0) return { ePrimePath: '', tanDeltaPath: '', minT: 0, maxT: 100 };

    const tMin = pts[0].temperatureCelsius;
    const tMax = pts[pts.length - 1].temperatureCelsius;

    // Log10 range for E'
    const minLogE = 5.0; // 100 kPa
    const maxLogE = 11.0; // 100 GPa

    // Max Tan Delta for secondary axis
    const maxTanD = Math.max(1.2, standard.peakTanDelta * 1.25);

    const pathE = pts
      .map((p, idx) => {
        const x = padding.left + ((p.temperatureCelsius - tMin) / (tMax - tMin)) * plotWidth;
        const clampedLog = Math.max(minLogE, Math.min(maxLogE, p.storageModulusLogPa));
        const y = padding.top + plotHeight - ((clampedLog - minLogE) / (maxLogE - minLogE)) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const pathTanD = pts
      .map((p, idx) => {
        const x = padding.left + ((p.temperatureCelsius - tMin) / (tMax - tMin)) * plotWidth;
        const clampedTanD = Math.max(0, Math.min(maxTanD, p.tanDelta));
        const y = padding.top + plotHeight - (clampedTanD / maxTanD) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return { ePrimePath: pathE, tanDeltaPath: pathTanD, minT: tMin, maxT: tMax };
  }, [simResult.temperatureScanCurve, standard, plotWidth, plotHeight, padding]);

  // Hysteresis Ellipse Points for Stress-Strain Viscoelastic Lissajous figure
  const hysteresisPath = useMemo(() => {
    const deltaRad = (simResult.lossAngleDegrees * Math.PI) / 180;
    const numPoints = 64;
    const pts: string[] = [];

    const centerX = padding.left + plotWidth / 2;
    const centerY = padding.top + plotHeight / 2;
    const radiusX = plotWidth * 0.38;
    const radiusY = plotHeight * 0.38;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * 2 * Math.PI;
      // Strain gamma(t) = gamma_0 * sin(theta)
      // Stress sigma(t) = sigma_0 * sin(theta + delta)
      const x = centerX + radiusX * Math.sin(theta);
      const y = centerY - radiusY * Math.sin(theta + deltaRad);
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    return pts.join(' ');
  }, [simResult.lossAngleDegrees, plotWidth, plotHeight, padding]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-navy-dark via-navy to-obsidian border border-amber-500/30 text-ivory space-y-6 shadow-2xl">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-600 to-rose-700 text-white shadow-lg ring-1 ring-amber-400/40">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-400 border border-amber-500/40 font-bold uppercase tracking-wider">
                DYNAMIC MECHANICAL ANALYSIS (DMA)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 font-bold">
                ISO 6721 / ASTM D4065
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold">
                GDPT 2018 POLYMER METROLOGY
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-ivory mt-1">
              Phân Tích Cơ Học Động (DMA): Modulus E', E'' & Điểm Hóa Thủy Tinh (Tg)
            </h2>
          </div>
        </div>
      </div>

      {/* Polymer Specimen Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-amber-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Layers className="w-4 h-4 text-amber-400" />
            CHỌN MẪU CHUẨN POLYMER & COMPOSITE (BENCHMARK DMA CATALOG):
          </span>
          <span className="text-[11px] text-ivory-muted">5 Vật Liệu Tiêu Chuẩn Quốc Tế</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {DMA_STANDARD_CATALOG.map((std) => {
            const isSelected = std.id === selectedStandardId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectStandard(std.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/80 to-rose-950/90 border-amber-400 text-ivory shadow-lg ring-1 ring-amber-400/50'
                    : 'bg-navy/50 border-navy-light/40 text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-amber-500/30 text-amber-200' : 'bg-navy-dark text-ivory-muted'
                      }`}
                    >
                      {std.classification.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">
                      Tg = {std.glassTransitionTgCelsius}°C
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ivory mt-1 line-clamp-1">{std.name}</h4>
                  <p className="text-[10px] text-ivory-muted line-clamp-1">{std.chemicalFormula}</p>
                </div>
                <div className="text-[9px] font-mono text-amber-300/80 truncate">
                  E' thủy tinh: {formatModulus(std.glassyStorageModulusPa)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-obsidian/70 border border-rose-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            Nhiệt Độ Thử Nghiệm (T):
          </span>
          <strong className="text-rose-300 text-base font-bold">
            {temperatureCelsius.toFixed(1)}°C
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Điểm Tg = {standard.glassTransitionTgCelsius}°C
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-blue-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            Modulus Lưu Trữ Đàn Hồi (E'):
          </span>
          <strong className="text-blue-300 text-base font-bold">
            {formatModulus(simResult.storageModulusEPrimePa)}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            log₁₀(E') = {Math.log10(simResult.storageModulusEPrimePa).toFixed(2)}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-emerald-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Modulus Tiêu Tán Nhớt (E''):
          </span>
          <strong className="text-emerald-300 text-base font-bold">
            {formatModulus(simResult.lossModulusEDoublePrimePa)}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Nhiệt ma sát nội phân tử
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-amber-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Hệ Số Tiêu Tán Damping (tan δ):
          </span>
          <strong className="text-amber-300 text-base font-bold">
            {simResult.tanDelta.toFixed(3)}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Góc trễ δ = {simResult.lossAngleDegrees.toFixed(1)}°
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-violet-500/30 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Trạng Thái Cơ Học:
          </span>
          <strong className="text-violet-300 text-xs font-bold truncate block">
            {simResult.viscoelasticState}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Tần số: {frequencyHz} Hz
          </span>
        </div>
      </div>

      {/* Multi-View Mode Tabs */}
      <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('TEMP_SCAN');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'TEMP_SCAN'
                ? 'bg-amber-600 text-white shadow ring-1 ring-amber-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            1. Quét Nhiệt Độ E', E'' & tan δ
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('TTS_WLF');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'TTS_WLF'
                ? 'bg-cyan-600 text-white shadow ring-1 ring-cyan-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            2. Trùng Phùng Thời Gian - Nhiệt Độ WLF
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('HYSTERESIS');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'HYSTERESIS'
                ? 'bg-rose-600 text-white shadow ring-1 ring-rose-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            3. Vòng Trễ Đàn Hồi Giả (Hysteresis Loop)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('CLAMP_GEOMETRY');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'CLAMP_GEOMETRY'
                ? 'bg-emerald-600 text-white shadow ring-1 ring-emerald-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            4. Cơ Cấu Ngàm Kẹp ({standard.deformationMode.replace(/_/g, ' ')})
          </button>
        </div>

        {/* Frequency selector buttons */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-ivory-muted">f:</span>
          {([0.1, 1.0, 10.0] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                sound.playUiClick();
                sound.playDmaOscillationFrequencyHum?.(f);
                setFrequencyHz(f);
              }}
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                frequencyHz === f ? 'bg-amber-500 text-obsidian' : 'bg-navy-light text-ivory-muted'
              }`}
            >
              {f} Hz
            </button>
          ))}
        </div>
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="p-4 rounded-xl bg-obsidian/90 border border-amber-500/30 flex flex-col items-center">
        {viewMode === 'TEMP_SCAN' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span className="flex items-center gap-3">
                <span className="text-blue-400 font-bold">─── log₁₀(E') (Trục trái)</span>
                <span className="text-amber-400 font-bold">─── tan δ (Trục phải)</span>
              </span>
              <span className="text-ivory-muted text-[10px]">
                Điểm cực đại tan δ xác định Tg = {standard.glassTransitionTgCelsius}°C
              </span>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                {/* Left and Bottom Axis Lines */}
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left + plotWidth} y1={padding.top} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Vertical Tg Marker */}
                {(() => {
                  const xTg = padding.left + ((standard.glassTransitionTgCelsius - minT) / (maxT - minT)) * plotWidth;
                  return (
                    <g>
                      <line x1={xTg} y1={padding.top} x2={xTg} y2={padding.top + plotHeight} stroke="#f43f5e" strokeDasharray="4 3" strokeWidth="1.5" />
                      <text x={xTg + 4} y={padding.top + 14} fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        Tg ({standard.glassTransitionTgCelsius}°C)
                      </text>
                    </g>
                  );
                })()}

                {/* Secondary Relaxations Markers (e.g. beta-transition) */}
                {standard.secondaryRelaxations.map((sec, idx) => {
                  const xSec = padding.left + ((sec.temperatureCelsius - minT) / (maxT - minT)) * plotWidth;
                  if (xSec < padding.left || xSec > padding.left + plotWidth) return null;
                  return (
                    <g key={idx}>
                      <line x1={xSec} y1={padding.top + 25} x2={xSec} y2={padding.top + plotHeight} stroke="#a855f7" strokeDasharray="2 2" strokeWidth="1" />
                      <text x={xSec - 15} y={padding.top + 28} fill="#c084fc" fontSize="9" fontFamily="monospace">
                        β ({sec.temperatureCelsius}°C)
                      </text>
                    </g>
                  );
                })}

                {/* Current Temperature Indicator */}
                {(() => {
                  if (temperatureCelsius >= minT && temperatureCelsius <= maxT) {
                    const xCur = padding.left + ((temperatureCelsius - minT) / (maxT - minT)) * plotWidth;
                    return (
                      <g>
                        <line x1={xCur} y1={padding.top} x2={xCur} y2={padding.top + plotHeight} stroke="#eab308" strokeWidth="2" />
                        <circle cx={xCur} cy={padding.top + plotHeight - ((Math.log10(simResult.storageModulusEPrimePa) - 5) / 6) * plotHeight} r="4" fill="#60a5fa" />
                        <circle cx={xCur} cy={padding.top + plotHeight - (simResult.tanDelta / Math.max(1.2, standard.peakTanDelta * 1.25)) * plotHeight} r="4" fill="#fbbf24" />
                        <text x={xCur + 5} y={padding.top + plotHeight - 10} fill="#eab308" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          T = {temperatureCelsius.toFixed(0)}°C
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}

                {/* Curves */}
                <path d={ePrimePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                <path d={tanDeltaPath} fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="4 1" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Nhiệt Độ Thử Nghiệm T (°C)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  log₁₀(E' / Pa)
                </text>
                <text x={svgWidth - 12} y={padding.top + plotHeight / 2} fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(90 ${svgWidth - 12} ${padding.top + plotHeight / 2})`}>
                  tan δ
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'TTS_WLF' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Đường Cong Chủ (Master Curve) & Hệ Số Dịch Chuyển WLF: log₁₀(aₜ) vs T</span>
              <span className="text-ivory-muted text-[10px]">
                Phương trình WLF: log₁₀(aₜ) = -C₁(T - Tg) / (C₂ + (T - Tg))
              </span>
            </div>
            <div className="p-4 rounded-xl bg-navy/50 border border-cyan-500/30 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-center font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-navy/70 border border-cyan-500/20">
                  <span className="text-[10px] text-ivory-muted block">Hằng Số Universal C₁:</span>
                  <strong className="text-cyan-300 text-sm">{WLF_C1_UNIVERSAL}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-navy/70 border border-cyan-500/20">
                  <span className="text-[10px] text-ivory-muted block">Hằng Số Universal C₂:</span>
                  <strong className="text-cyan-300 text-sm">{WLF_C2_UNIVERSAL} K</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-navy/70 border border-cyan-500/20">
                  <span className="text-[10px] text-ivory-muted block">Hệ Số Dịch aₜ Hiện Tại:</span>
                  <strong className="text-amber-300 text-sm">
                    10^{simResult.wlfShiftFactorLogAT} (log₁₀ aₜ = {simResult.wlfShiftFactorLogAT})
                  </strong>
                </div>
              </div>
              <p className="text-[11px] font-mono text-ivory-muted mt-3 text-center leading-relaxed">
                Nguyên lý tương đương Thời gian - Nhiệt độ: Kiểm tra ở tần số cao (thời gian ngắn) tương đương với đo ở nhiệt độ thấp; kiểm tra ở tần số thấp tương đương với nhiệt độ cao.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'HYSTERESIS' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-rose-300">
              <span>Vòng Trễ Ứng Suất - Biến Dạng (Viscoelastic Lissajous Ellipse: σ vs γ)</span>
              <span className="text-ivory-muted text-[10px]">
                Diện tích elip = Năng lượng tiêu tán nhiệt ΔW = {simResult.energyDissipationJPerM3Cycle} J/m³·chu kỳ
              </span>
            </div>
            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                {/* Center Crosshairs */}
                <line x1={padding.left} y1={padding.top + plotHeight / 2} x2={padding.left + plotWidth} y2={padding.top + plotHeight / 2} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={padding.left + plotWidth / 2} y1={padding.top} x2={padding.left + plotWidth / 2} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                {/* Hysteresis Ellipse */}
                <path d={hysteresisPath} fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="2.5" />

                {/* Phase lag indicator */}
                <text x={padding.left + plotWidth / 2 + 15} y={padding.top + 25} fill="#fb7185" fontSize="10" fontFamily="monospace">
                  Góc lệch pha δ = {simResult.lossAngleDegrees.toFixed(1)}°
                </text>
                <text x={padding.left + plotWidth / 2 + 15} y={padding.top + 40} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  {simResult.lossAngleDegrees < 10
                    ? 'Chủ yếu đàn hồi thuần (Elastic Spring)'
                    : simResult.lossAngleDegrees > 45
                    ? 'Chủ yếu nhớt chảy (Viscous Dashpot)'
                    : 'Nhớt đàn hồi cân bằng (Viscoelastic)'}
                </text>

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Biến Dạng Kéo γ(t) = γ₀·sin(ωt)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  Ứng Suất σ(t) = σ₀·sin(ωt + δ)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'CLAMP_GEOMETRY' && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Sơ Đồ Ngàm Kẹp Đo DMA: {standard.deformationMode.replace(/_/g, ' ')}</span>
              <span className="text-ivory-muted text-[10px]">Đầu Dò Dao Động Lực Từ (Electromagnetic Drive Motor)</span>
            </div>
            <div className="p-4 rounded-xl bg-navy/60 border border-emerald-500/30 flex flex-col items-center">
              <svg width={svgWidth} height={140} className="w-full max-w-xl">
                {/* Fixed clamp base */}
                <rect x="80" y="30" width="70" height="80" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="115" y="75" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Ngàm Cố Định
                </text>

                {/* Polymer Sample Beam */}
                <rect x="150" y="60" width="260" height="20" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <text x="280" y="74" fill="#1e293b" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {standard.name}
                </text>

                {/* Drive clamp / tip */}
                <rect x="410" y="45" width="60" height="50" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                <text x="440" y="72" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Ngàm Động
                </text>

                {/* Oscillation arrow */}
                <line x1="440" y1="20" x2="440" y2="40" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                <line x1="440" y1="120" x2="440" y2="100" stroke="#f43f5e" strokeWidth="3" />
                <text x="475" y="35" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ±γ₀ (f={frequencyHz} Hz)
                </text>
              </svg>
              <p className="text-[11px] font-mono text-ivory-muted mt-2 text-center">
                Động cơ điện từ tạo dao động cưỡng bức tuần hoàn; cảm biến LVDT thu nhận độ võng và góc lệch pha δ với độ phân giải sub-micron.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls & Temperature Ramp Bar */}
      <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" />
              ĐIỀU KHIỂN NHIỆT ĐỘ BUỒNG LÒ (TEMPERATURE SLIDER):
            </span>
            <span className="text-xs font-mono text-rose-300 font-bold">
              {temperatureCelsius.toFixed(1)}°C
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoTuneTg}
              className="px-2.5 py-1 rounded bg-rose-950 border border-rose-500/50 hover:bg-rose-900/60 text-rose-200 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <Target className="w-3.5 h-3.5" />
              Điểm Tg ({standard.glassTransitionTgCelsius}°C)
            </button>
            <button
              onClick={handleRunTempRamp}
              disabled={isRamping}
              className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow ${
                isRamping
                  ? 'bg-amber-600 text-obsidian animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-obsidian font-extrabold'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isRamping ? 'Đang Nâng Nhiệt...' : 'Quét Nhiệt Độ Tự Động (Temp Ramp)'}
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={minT}
          max={maxT}
          step={1}
          value={temperatureCelsius}
          onChange={(e) => handleTempChange(parseFloat(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer h-2 bg-obsidian rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
          <span>{minT}°C (Vùng Thủy Tinh Giòn)</span>
          <span className="text-amber-300 font-bold">Vùng Chuyển Hóa Thủy Tinh (Tg = {standard.glassTransitionTgCelsius}°C)</span>
          <span>{maxT}°C (Vùng Cao Su / Chảy Nhớt)</span>
        </div>
      </div>

      {/* Curriculum & Engineering Significance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-navy/40 border border-amber-500/30 space-y-2">
          <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 font-mono">
            <FileText className="w-4 h-4 text-amber-400" />
            CHƯƠNG TRÌNH GDPT 2018 (HÓA HỌC 12 & VẬT LÝ 12):
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.curriculumNotes}
          </p>
          <div className="text-[10px] font-mono text-amber-400/80 pt-1 border-t border-navy-light/30">
            Trọng tâm: Bản chất hóa dẻo khi vượt qua nhiệt độ chuyển hóa thủy tinh; sự phụ thuộc của tính đàn hồi vào mạng lưới polymer mạch thẳng, phân nhánh hay không gian 3 chiều.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy/40 border border-rose-500/30 space-y-2">
          <h4 className="font-semibold text-rose-300 flex items-center gap-1.5 font-mono">
            <Sun className="w-4 h-4 text-rose-400" />
            ỨNG DỤNG CÔNG NGHIỆP & VẬT LIỆU CAO CẤP:
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.engineeringApplication}
          </p>
          <div className="text-[10px] font-mono text-rose-300/80 pt-1 border-t border-navy-light/30">
            Tiêu chuẩn đo: ISO 6721-11 (Dynamic mechanical properties of plastics) & ASTM D4065; độ nhạy phát hiện chuyển pha cao gấp 100 lần so với DSC (nhiệt lượng kế quét vi sai).
          </div>
        </div>
      </div>

      {/* Provenance Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3">
        <span>Nguồn: IUPAC Polymer Division & ISO 6721 Dynamic Mechanical Metrology</span>
        <span className="text-amber-400 font-semibold">IUPAC & GDPT 2018 AUDITED</span>
      </div>
    </div>
  );
};
