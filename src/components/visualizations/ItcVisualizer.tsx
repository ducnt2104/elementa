// src/components/visualizations/ItcVisualizer.tsx
// Milestone 75: Isothermal Titration Calorimetry (ITC), Binding Enthalpy (ΔH°) & Wiseman c-Value Visualizer
// Standards: IUPAC Division I Physical & Biophysical Chemistry, Wiseman et al. (1989), Freire et al.
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Năng lượng hóa học, biến thiên enthalpy chuẩn Δr H°298; Hóa học 12: Phức chất kim loại, hằng số bền phối trí; Sinh học 10: Tương tác enzyme - cơ chất, tính đặc hiệu cấu trúc)

import React, { useState, useMemo } from 'react';
import {
  ITC_STANDARD_CATALOG,
  ItcStandard,
  simulateItcTitration,
  calculateWisemanCValue
} from '../../domain/itcEngine';
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
  Droplets,
  ArrowRight,
  Wind
} from 'lucide-react';

export interface ItcVisualizerProps {
  initialStandardId?: string;
}

export const ItcVisualizer: React.FC<ItcVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'edta_calcium_chelation'
  );

  // Active Standard
  const standard: ItcStandard = useMemo(() => {
    return (
      ITC_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) ||
      ITC_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Simulation Results
  const simResult = useMemo(() => {
    return simulateItcTitration(standard);
  }, [standard]);

  // Active injection step in titration (1 to number of injections)
  const [activeInjectionIndex, setActiveInjectionIndex] = useState<number>(
    standard.numberOfInjections
  );
  const [viewMode, setViewMode] = useState<'ISOTHERM' | 'RAW_THERMOGRAM' | 'THERMODYNAMICS_BAR' | 'CELL_SCHEMATIC'>('ISOTHERM');
  const [isTitrating, setIsTitrating] = useState<boolean>(false);

  // Handle Standard Selection
  const handleSelectStandard = (newId: string) => {
    setSelectedStandardId(newId);
    const targetStd = ITC_STANDARD_CATALOG.find((s) => s.id === newId) || ITC_STANDARD_CATALOG[0];
    setActiveInjectionIndex(targetStd.numberOfInjections);
    sound.playUiClick();
    sound.playCalorimetricHeatExothermHiss?.(targetStd.bindingEnthalpyDeltaHKjPerMol);
  };

  // Inject next drop manually
  const handleInjectNext = () => {
    const nextIdx = Math.min(standard.numberOfInjections, activeInjectionIndex + 1);
    setActiveInjectionIndex(nextIdx);
    sound.playItcSyringeInjectionPing?.(nextIdx);
    sound.playCalorimetricHeatExothermHiss?.(standard.bindingEnthalpyDeltaHKjPerMol);
  };

  // Reset titration to initial injection
  const handleResetTitration = () => {
    setActiveInjectionIndex(1);
    sound.playUiClick();
  };

  // Run automated titration animation
  const handleRunAutoTitration = () => {
    sound.playUiClick();
    setIsTitrating(true);
    setActiveInjectionIndex(1);

    let curStep = 1;
    const interval = setInterval(() => {
      curStep++;
      setActiveInjectionIndex(curStep);
      sound.playItcSyringeInjectionPing?.(curStep);

      if (curStep >= standard.numberOfInjections) {
        clearInterval(interval);
        setIsTitrating(false);
        sound.playCalorimetricHeatExothermHiss?.(standard.bindingEnthalpyDeltaHKjPerMol);
      }
    }, 120);
  };

  // Format dissociation constant Kd with suitable metric prefix
  const formatKd = (kdMolar: number): string => {
    if (kdMolar < 1e-12) {
      return `${(kdMolar * 1e15).toFixed(1)} fM`;
    }
    if (kdMolar < 1e-9) {
      return `${(kdMolar * 1e12).toFixed(1)} pM`;
    }
    if (kdMolar < 1e-6) {
      return `${(kdMolar * 1e9).toFixed(1)} nM`;
    }
    if (kdMolar < 1e-3) {
      return `${(kdMolar * 1e6).toFixed(1)} μM`;
    }
    return `${(kdMolar * 1e3).toFixed(2)} mM`;
  };

  // SVG Canvas dimensions
  const svgWidth = 620;
  const svgHeight = 220;
  const padding = { top: 20, right: 35, bottom: 35, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Integrated Isotherm SVG Path
  const { isothermPoints, maxMolarRatio, minHeat, maxHeat } = useMemo(() => {
    const injs = simResult.injections;
    if (injs.length === 0) return { isothermPoints: [], maxMolarRatio: 2.5, minHeat: -60, maxHeat: 5 };

    const maxRatio = Math.max(2.5, injs[injs.length - 1].titrantMolarRatio * 1.1);
    const heats = injs.map((inj) => inj.normalizedHeatKjPerMol);
    const hMin = Math.min(...heats, standard.bindingEnthalpyDeltaHKjPerMol * 1.1);
    const hMax = Math.max(2.0, ...heats);

    return { isothermPoints: injs, maxMolarRatio: maxRatio, minHeat: hMin, maxHeat: hMax };
  }, [simResult.injections, standard]);

  // Raw Thermogram SVG Path
  const rawThermogramPath = useMemo(() => {
    const raw = simResult.rawThermogram;
    if (raw.length === 0) return '';
    const maxT = raw[raw.length - 1].timeSeconds;
    const powers = raw.map((p) => p.differentialPowerMicroWatts);
    const minP = Math.min(-1.0, ...powers);
    const maxP = Math.max(1.0, ...powers);
    const pSpan = Math.max(2.0, maxP - minP);

    // Filter to current active injection
    const activeTimeLimit = activeInjectionIndex * 150;
    const visiblePoints = raw.filter((p) => p.timeSeconds <= activeTimeLimit);

    return visiblePoints
      .map((p, idx) => {
        const x = padding.left + (p.timeSeconds / maxT) * plotWidth;
        const y = padding.top + plotHeight - ((p.differentialPowerMicroWatts - minP) / pSpan) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [simResult.rawThermogram, activeInjectionIndex, plotWidth, plotHeight, padding]);

  // Current active injection data
  const currentInjection = simResult.injections[Math.min(activeInjectionIndex - 1, simResult.injections.length - 1)];

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-navy-dark via-navy to-obsidian border border-rose-500/30 text-ivory space-y-6 shadow-2xl">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-600 to-amber-700 text-white shadow-lg ring-1 ring-rose-400/40">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 text-rose-400 border border-rose-500/40 font-bold uppercase tracking-wider">
                ISOTHERMAL TITRATION CALORIMETRY (ITC)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold">
                IUPAC BIOPHYSICAL CHEMISTRY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold">
                GDPT 2018 ENTHALPY METROLOGY
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-ivory mt-1">
              Nhiệt Lượng Kế Chuẩn Độ Đẳng Nhiệt (ITC): Enthalpy ΔH°, Entropy ΔS° & Wiseman c
            </h2>
          </div>
        </div>
      </div>

      {/* ITC Specimen Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-rose-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Layers className="w-4 h-4 text-rose-400" />
            CHỌN HỆ TƯƠNG TÁC PHÂN TỬ (BENCHMARK ITC CATALOG):
          </span>
          <span className="text-[11px] text-ivory-muted">5 Chuẩn Phức Hệ Sinh Hóa Quốc Tế</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ITC_STANDARD_CATALOG.map((std) => {
            const isSelected = std.id === selectedStandardId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectStandard(std.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-br from-rose-950/80 to-amber-950/90 border-rose-400 text-ivory shadow-lg ring-1 ring-rose-400/50'
                    : 'bg-navy/50 border-navy-light/40 text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-rose-500/30 text-rose-200' : 'bg-navy-dark text-ivory-muted'
                      }`}
                    >
                      {std.interactionType.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 font-bold">
                      n = {std.stoichiometryN}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ivory mt-1 line-clamp-1">{std.name}</h4>
                  <p className="text-[10px] text-ivory-muted line-clamp-1">{std.titrantLigandName}</p>
                </div>
                <div className="text-[9px] font-mono text-rose-300/80 truncate">
                  Kd = {formatKd(std.dissociationConstantKdMolar)} · ΔH = {std.bindingEnthalpyDeltaHKjPerMol} kJ
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
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Enthalpy Liên Kết (ΔH°):
          </span>
          <strong className="text-rose-300 text-base font-bold">
            {standard.bindingEnthalpyDeltaHKjPerMol.toFixed(1)} kJ/mol
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            {standard.bindingEnthalpyDeltaHKjPerMol < 0 ? 'Phản ứng Tỏa nhiệt (Exothermic)' : 'Thu nhiệt (Endothermic)'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-amber-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Năng Lượng Gibbs (ΔG°):
          </span>
          <strong className="text-amber-300 text-base font-bold">
            {simResult.gibbsFreeEnergyDeltaGKjPerMol.toFixed(1)} kJ/mol
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            ΔG° = -RT·ln(Ka)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-blue-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-blue-400" />
            Đóng Góp Entropy (-TΔS°):
          </span>
          <strong className="text-blue-300 text-base font-bold">
            {simResult.entropyContributionMinusTDeltaSKjPerMol.toFixed(1)} kJ/mol
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            ΔS° = {simResult.entropyChangeDeltaSJPerMolK.toFixed(1)} J/(mol·K)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-emerald-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Hằng Số Phân Ly (Kd):
          </span>
          <strong className="text-emerald-300 text-base font-bold">
            {formatKd(standard.dissociationConstantKdMolar)}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Ka = {standard.associationConstantKaMolar.toExponential(2)} M⁻¹
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-violet-500/30 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Thông Số Wiseman (c):
          </span>
          <strong className="text-violet-300 text-base font-bold">
            {simResult.wisemanCValue >= 1000
              ? `${(simResult.wisemanCValue / 1000).toFixed(1)}k`
              : simResult.wisemanCValue.toFixed(1)}
          </strong>
          <span className="text-[10px] text-emerald-300 font-semibold block mt-0.5">
            {simResult.wisemanRegime.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Multi-View Mode Tabs */}
      <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('ISOTHERM');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'ISOTHERM'
                ? 'bg-rose-600 text-white shadow ring-1 ring-rose-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            1. Đường Chuẩn Độ Đẳng Nhiệt (Isotherm Δq/Δn)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('RAW_THERMOGRAM');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'RAW_THERMOGRAM'
                ? 'bg-amber-600 text-white shadow ring-1 ring-amber-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            2. Phổ Nhiệt Thô (Raw Power vs Thời Gian)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('THERMODYNAMICS_BAR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'THERMODYNAMICS_BAR'
                ? 'bg-cyan-600 text-white shadow ring-1 ring-cyan-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            3. Cân Bằng Enthalpy - Entropy (EEC)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('CELL_SCHEMATIC');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'CELL_SCHEMATIC'
                ? 'bg-emerald-600 text-white shadow ring-1 ring-emerald-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            4. Buồng Đo Nhiệt Lượng Kế Đoan Nhiệt
          </button>
        </div>

        {/* Current Injection progress indicator */}
        <span className="text-[11px] font-mono text-ivory-muted">
          Giọt Bơm: <strong className="text-rose-300">{activeInjectionIndex}</strong> / {standard.numberOfInjections}
        </span>
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="p-4 rounded-xl bg-obsidian/90 border border-rose-500/30 flex flex-col items-center">
        {viewMode === 'ISOTHERM' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-rose-300">
              <span>Đường Cong Chuẩn Độ Tích Phân: Δq / Δn_L (kJ/mol) vs Tỷ Lệ Mol [L]ₜ / [M]ₜ</span>
              <span className="text-ivory-muted text-[10px]">
                Điểm uốn tương đương n = {standard.stoichiometryN} · ΔH° = {standard.bindingEnthalpyDeltaHKjPerMol} kJ/mol
              </span>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                {/* Left & Bottom Axis Lines */}
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Baseline 0 kJ/mol dashed line */}
                {(() => {
                  const y0 = padding.top + plotHeight - ((0 - minHeat) / (maxHeat - minHeat)) * plotHeight;
                  return (
                    <line x1={padding.left} y1={y0} x2={padding.left + plotWidth} y2={y0} stroke="#475569" strokeDasharray="3 3" strokeWidth="1" />
                  );
                })()}

                {/* Vertical Stoichiometric Equivalence Marker n */}
                {(() => {
                  const xEq = padding.left + (standard.stoichiometryN / maxMolarRatio) * plotWidth;
                  return (
                    <g>
                      <line x1={xEq} y1={padding.top} x2={xEq} y2={padding.top + plotHeight} stroke="#06b6d4" strokeDasharray="3 3" strokeWidth="1.2" />
                      <text x={xEq + 4} y={padding.top + 16} fill="#06b6d4" fontSize="9" fontFamily="monospace">
                        Điểm Đương Lượng n={standard.stoichiometryN}
                      </text>
                    </g>
                  );
                })()}

                {/* Connecting fitted line for completed titration */}
                {(() => {
                  const fittedPath = isothermPoints
                    .map((inj, idx) => {
                      const x = padding.left + (inj.titrantMolarRatio / maxMolarRatio) * plotWidth;
                      const y = padding.top + plotHeight - ((inj.normalizedHeatKjPerMol - minHeat) / (maxHeat - minHeat)) * plotHeight;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ');
                  return <path d={fittedPath} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" opacity="0.6" />;
                })()}

                {/* Injection Data Points */}
                {isothermPoints.map((inj) => {
                  const isDelivered = inj.injectionIndex <= activeInjectionIndex;
                  const isCurrent = inj.injectionIndex === activeInjectionIndex;
                  const x = padding.left + (inj.titrantMolarRatio / maxMolarRatio) * plotWidth;
                  const y = padding.top + plotHeight - ((inj.normalizedHeatKjPerMol - minHeat) / (maxHeat - minHeat)) * plotHeight;

                  return (
                    <g key={inj.injectionIndex}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 6 : isDelivered ? 4 : 2.5}
                        fill={isCurrent ? '#f59e0b' : isDelivered ? '#f43f5e' : '#475569'}
                        stroke={isCurrent ? '#ffffff' : '#1e293b'}
                        strokeWidth="1.5"
                      />
                      {isCurrent && (
                        <text x={x + 7} y={y - 6} fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          #{inj.injectionIndex} ({inj.normalizedHeatKjPerMol.toFixed(1)} kJ)
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Tỷ Lệ Mol Phối Tử / Đại Phân Tử ([L]ₜ / [M]ₜ)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  Nhiệt Chuẩn Hóa (kJ / mol)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'RAW_THERMOGRAM' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Nhiệt Đồ Thô Thời Gian Thực: Công Suất Vi Sai (Differential Power μW) vs Thời Gian (s)</span>
              <span className="text-ivory-muted text-[10px]">
                Mỗi đỉnh tương ứng một giọt bơm vi tích {standard.injectionVolumeMicroL} μL từ vi kim tự động
              </span>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                <line x1={padding.left} y1={padding.top + plotHeight / 2} x2={padding.left + plotWidth} y2={padding.top + plotHeight / 2} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Raw Thermogram Signal Path */}
                <path d={rawThermogramPath} fill="none" stroke="#f59e0b" strokeWidth="2.0" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Thời Gian Chuẩn Độ t (giây)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  Công Suất ΔP (μW)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'THERMODYNAMICS_BAR' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Hồ Sơ Nhiệt Động Học Hoàn Chỉnh: ΔG° = ΔH° - TΔS°</span>
              <span className="text-ivory-muted text-[10px]">
                Động lực chi phối: {simResult.thermodynamicDrivingForce.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-navy/50 border border-cyan-500/30 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center font-mono text-xs">
                {/* Delta G */}
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                  <span className="text-[11px] text-amber-300 font-bold block">Biến Thiên Gibbs (ΔG°):</span>
                  <strong className="text-amber-200 text-lg font-black">{simResult.gibbsFreeEnergyDeltaGKjPerMol.toFixed(1)} kJ/mol</strong>
                  <p className="text-[10px] text-ivory-muted">Ái lực tự do tổng quát</p>
                </div>

                {/* Delta H */}
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                  <span className="text-[11px] text-rose-300 font-bold block">Biến Thiên Enthalpy (ΔH°):</span>
                  <strong className="text-rose-200 text-lg font-black">{standard.bindingEnthalpyDeltaHKjPerMol.toFixed(1)} kJ/mol</strong>
                  <p className="text-[10px] text-ivory-muted">Liên kết H, van der Waals, phối trí</p>
                </div>

                {/* -T Delta S */}
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-1">
                  <span className="text-[11px] text-blue-300 font-bold block">Đóng Góp Entropy (-TΔS°):</span>
                  <strong className="text-blue-200 text-lg font-black">{simResult.entropyContributionMinusTDeltaSKjPerMol.toFixed(1)} kJ/mol</strong>
                  <p className="text-[10px] text-ivory-muted">
                    {simResult.entropyContributionMinusTDeltaSKjPerMol < 0
                      ? 'Thuận lợi do giải sonvat hóa kỵ nước'
                      : 'Bất lợi do khóa cứng chuỗi peptit'}
                  </p>
                </div>
              </div>
              <p className="text-[11px] font-mono text-ivory-muted mt-3 text-center">
                Quy luật bù trừ Enthalpy - Entropy (EEC): Sự hình thành liên kết mạnh (ΔH &lt; 0) thường bị triệt tiêu một phần do mất bậc tự do quay và tịnh tiến (-TΔS &gt; 0).
              </p>
            </div>
          </div>
        )}

        {viewMode === 'CELL_SCHEMATIC' && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>Sơ Đồ Cấu Tạo Buồng Đo Nhiệt Lượng Kế Đoan Nhiệt (Adiabatic Reaction Cell)</span>
              <span className="text-ivory-muted text-[10px]">Hệ thống cân bằng nhiệt điện tử Peltier vi mô</span>
            </div>
            <div className="p-4 rounded-xl bg-navy/60 border border-emerald-500/30 flex flex-col items-center">
              <svg width={svgWidth} height={150} className="w-full max-w-xl">
                {/* Outer Adiabatic Shield */}
                <rect x="80" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />
                <text x="310" y="36" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Vỏ Bọc Đoan Nhiệt Chân Không (Adiabatic Shield)
                </text>

                {/* Reference Cell */}
                <rect x="130" y="55" width="110" height="65" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="185" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Buồng Đối Chứng
                </text>
                <text x="185" y="95" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Nước / Đệm Chuẩn
                </text>

                {/* Peltier Thermoelectric Sensor */}
                <line x1="240" y1="87" x2="380" y2="87" stroke="#eab308" strokeWidth="3" strokeDasharray="3 2" />
                <text x="310" y="82" fill="#fde047" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Cảm Biến Nhiệt Điện Peltier (ΔT → 0)
                </text>

                {/* Sample Cell */}
                <rect x="380" y="55" width="120" height="65" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
                <text x="440" y="78" fill="#e9d5ff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Buồng Mẫu Đo ({standard.cellVolumeMilliL} mL)
                </text>
                <text x="440" y="92" fill="#c084fc" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  {standard.macromoleculeName.split('(')[0]}
                </text>

                {/* Injection Syringe Needle */}
                <line x1="440" y1="5" x2="440" y2="55" stroke="#f43f5e" strokeWidth="3" />
                <text x="480" y="20" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Vi Kim Bơm ({standard.titrantLigandName.split('(')[0]})
                </text>
              </svg>
              <p className="text-[11px] font-mono text-ivory-muted mt-2 text-center">
                Mạch phản hồi vi sai cấp nhiệt tức thời bù trừ biến thiên nhiệt độ: diện tích đỉnh xung nhiệt tỷ lệ thuận chính xác với nhiệt phản ứng Δq.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls & Titration Buttons */}
      <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-rose-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-rose-400" />
              TIẾN ĐỘ CHUẨN ĐỘ VI KIM (INJECTION PROGRESS):
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              Giọt #{activeInjectionIndex} ({currentInjection ? currentInjection.titrantMolarRatio : 0}x mol)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetTitration}
              className="px-2.5 py-1 rounded bg-navy-light/80 hover:bg-navy-light text-ivory text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm Mới
            </button>
            <button
              onClick={handleInjectNext}
              disabled={activeInjectionIndex >= standard.numberOfInjections || isTitrating}
              className="px-3 py-1 rounded bg-rose-950 border border-rose-500/50 hover:bg-rose-900/60 text-rose-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Droplets className="w-3.5 h-3.5 text-rose-400" />
              Bơm Thêm 1 Giọt (+{standard.injectionVolumeMicroL} μL)
            </button>
            <button
              onClick={handleRunAutoTitration}
              disabled={isTitrating}
              className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow ${
                isTitrating
                  ? 'bg-amber-600 text-obsidian animate-pulse'
                  : 'bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-obsidian font-extrabold'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isTitrating ? 'Đang Chuẩn Độ...' : 'Chuẩn Độ Tự Động (Auto-Titrate)'}
            </button>
          </div>
        </div>

        {/* Range Slider for Injections */}
        <input
          type="range"
          min={1}
          max={standard.numberOfInjections}
          step={1}
          value={activeInjectionIndex}
          onChange={(e) => setActiveInjectionIndex(parseInt(e.target.value, 10))}
          className="w-full accent-rose-400 cursor-pointer h-2 bg-obsidian rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
          <span>Giọt 1 (Chưa bão hòa, nhiệt tỏa cực đại)</span>
          <span className="text-rose-300 font-bold">Điểm tương đương n = {standard.stoichiometryN}</span>
          <span>Giọt {standard.numberOfInjections} (Bão hòa phối tử, chỉ còn nhiệt pha loãng)</span>
        </div>
      </div>

      {/* Curriculum & Biophysical Significance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-navy/40 border border-rose-500/30 space-y-2">
          <h4 className="font-semibold text-rose-300 flex items-center gap-1.5 font-mono">
            <FileText className="w-4 h-4 text-rose-400" />
            CHƯƠNG TRÌNH GDPT 2018 (HÓA HỌC 10–12 & SINH HỌC 10):
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.curriculumNotes}
          </p>
          <div className="text-[10px] font-mono text-rose-400/80 pt-1 border-t border-navy-light/30">
            Trọng tâm: Phương pháp trực tiếp duy nhất đo lường đồng thời ái lực (Ka), nhiệt phản ứng (ΔH°) và số phối vị (n) mà không cần gắn chất huỳnh quang hay cố định bề mặt.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy/40 border border-amber-500/30 space-y-2">
          <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 font-mono">
            <Sun className="w-4 h-4 text-amber-400" />
            Ý NGHĨA SINH HỌC VẬT LÝ & THIẾT KẾ THUỐC:
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.biophysicalSignificance}
          </p>
          <div className="text-[10px] font-mono text-amber-300/80 pt-1 border-t border-navy-light/30">
            Thông số Wiseman c = n·Ka·[M]₀ tối ưu từ 10 đến 1000 để thu được đường chuẩn độ chữ S rõ nét; vượt quá 1000 đường cong trở thành hàm bậc thang.
          </div>
        </div>
      </div>

      {/* Provenance Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3">
        <span>Nguồn: IUPAC Division I Physical & Biophysical Chemistry (Wiseman 1989 Standards)</span>
        <span className="text-rose-400 font-semibold">IUPAC & GDPT 2018 AUDITED</span>
      </div>
    </div>
  );
};
