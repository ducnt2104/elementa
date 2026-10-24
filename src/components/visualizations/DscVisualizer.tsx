import React, { useState, useMemo, useEffect } from 'react';
import {
  DSC_STANDARD_CATALOG,
  DscStandard,
  simulateDscScan,
  calculateGibbsFreeEnergyJPerMol,
  calculateFractionUnfolded,
  GAS_CONSTANT_R,
} from '../../domain/dscEngine';
import { sound } from '../../audio/soundEngine';
import {
  Flame,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Thermometer,
  Eye,
  Award,
  TrendingUp,
  Sliders,
  BarChart2,
} from 'lucide-react';

interface DscVisualizerProps {
  initialStandardId?: string;
}

export const DscVisualizer: React.FC<DscVisualizerProps> = ({
  initialStandardId = 'lysozyme_hen_egg_white_calibrant',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'THERMOGRAM_CURVE' | 'DOMAIN_DECONVOLUTION' | 'GIBBS_HELMHOLTZ' | 'CURRICULUM_STANDARDS'
  >('THERMOGRAM_CURVE');

  const standard: DscStandard = useMemo(() => {
    return (
      DSC_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || DSC_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTempIndex, setHoveredTempIndex] = useState<number | null>(null);

  // Play audio on standard selection
  useEffect(() => {
    sound.playProteinDenaturationTmPeakChime?.();
  }, [standard]);

  // Simulation result
  const simulation = useMemo(() => {
    return simulateDscScan(standard, 200);
  }, [standard]);

  const hoveredPoint =
    hoveredTempIndex !== null && simulation.points[hoveredTempIndex]
      ? simulation.points[hoveredTempIndex]
      : simulation.points[Math.floor(simulation.points.length / 2)];

  // SVG dimensions for thermogram
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 35, bottom: 50, left: 70 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const [minTemp, maxTemp] = standard.temperatureRangeCelsius;
  const minCp = Math.min(...simulation.points.map((p) => p.baselineHeatCapacityCp)) * 0.9;
  const maxCp = Math.max(...simulation.points.map((p) => p.totalApparentCp)) * 1.15;

  const getX = (tempC: number) => {
    return padding.left + ((tempC - minTemp) / (maxTemp - minTemp)) * plotWidth;
  };

  const getY = (cp: number) => {
    return padding.top + plotHeight - ((cp - minCp) / (maxCp - minCp)) * plotHeight;
  };

  // Generate SVG path strings
  const totalCpPath = useMemo(() => {
    return simulation.points.reduce((acc, pt, idx) => {
      const x = getX(pt.temperatureCelsius);
      const y = getY(pt.totalApparentCp);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, minCp, maxCp, minTemp, maxTemp]);

  const baselineCpPath = useMemo(() => {
    return simulation.points.reduce((acc, pt, idx) => {
      const x = getX(pt.temperatureCelsius);
      const y = getY(pt.baselineHeatCapacityCp);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, minCp, maxCp, minTemp, maxTemp]);

  // Area fill under excess peak
  const excessAreaPath = useMemo(() => {
    if (simulation.points.length === 0) return '';
    let path = `M ${getX(simulation.points[0].temperatureCelsius)},${getY(simulation.points[0].baselineHeatCapacityCp)}`;
    for (const pt of simulation.points) {
      path += ` L ${getX(pt.temperatureCelsius)},${getY(pt.totalApparentCp)}`;
    }
    for (let i = simulation.points.length - 1; i >= 0; i--) {
      const pt = simulation.points[i];
      path += ` L ${getX(pt.temperatureCelsius)},${getY(pt.baselineHeatCapacityCp)}`;
    }
    path += ' Z';
    return path;
  }, [simulation, minCp, maxCp, minTemp, maxTemp]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-amber-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Nhiệt Lượng Quét Vi Sai DSC & Độ Ổn Định Protein (Tm / Cp)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold">
                IUPAC / ASTM E967
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Biến tính nhiệt protein hai trạng thái (Two-State) · Đa vùng CH2/Fab/CH3 · Enthalpy ΔHcal/ΔHvH
            </p>
          </div>
        </div>

        {/* Audio Test Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playDscThermalRampHeaterHum?.();
              sound.playProteinDenaturationTmPeakChime?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-200 text-xs font-mono transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Âm Thanh Quét Nhiệt DSC ⚡</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-ivory-muted font-mono flex items-center gap-1 mr-1">
          <Target className="w-3.5 h-3.5 text-amber-400" /> Hệ Mẫu DSC Chuẩn:
        </span>
        {DSC_STANDARD_CATALOG.map((std) => (
          <button
            key={std.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedStandardId(std.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedStandardId === std.id
                ? 'bg-amber-500 text-obsidian border-amber-300 font-extrabold shadow-md scale-105'
                : 'bg-navy-light/40 text-ivory hover:text-white border-navy-light/60 hover:border-amber-400/50'
            }`}
          >
            {std.name.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/30 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('THERMOGRAM_CURVE');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'THERMOGRAM_CURVE'
              ? 'bg-amber-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-300" />
          <span>Đường Cong Nhiệt Lượng (Thermogram Cp vs T)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('DOMAIN_DECONVOLUTION');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'DOMAIN_DECONVOLUTION'
              ? 'bg-amber-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-300" />
          <span>Tách Vùng Biến Tính (Domain Deconvolution)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('GIBBS_HELMHOLTZ');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'GIBBS_HELMHOLTZ'
              ? 'bg-amber-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-300" />
          <span>Năng Lượng Tự Do Gibbs-Helmholtz (ΔG vs T)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CURRICULUM_STANDARDS');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'CURRICULUM_STANDARDS'
              ? 'bg-amber-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Chuẩn ASTM/IUPAC & GDPT 2018</span>
        </button>
      </div>

      {/* TAB 1: THERMOGRAM CURVE */}
      {activeSubTab === 'THERMOGRAM_CURVE' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {/* Main SVG Thermogram Canvas */}
          <div className="relative w-full bg-navy/90 rounded-2xl border border-amber-500/30 p-4 shadow-inner overflow-hidden">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-ivory-muted mb-2">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                Quét Nhiệt Độ: <strong className="text-white">{minTemp} °C → {maxTemp} °C</strong> (Tốc độ: {standard.scanRateCelsiusPerMin} °C/min)
              </span>
              <span className="text-amber-300 font-bold">
                Đỉnh Nóng Chảy Tm: <strong className="text-white font-mono">{simulation.peakTmCelsius} °C</strong> (Onset: {simulation.apparentOnsetTmCelsius} °C)
              </span>
            </div>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const svgX = (mouseX / rect.width) * svgWidth;
                const ratio = Math.max(0, Math.min(1, (svgX - padding.left) / plotWidth));
                const index = Math.round(ratio * (simulation.points.length - 1));
                setHoveredTempIndex(index);
              }}
              onMouseLeave={() => setHoveredTempIndex(null)}
            >
              <defs>
                <linearGradient id="dscPeakGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((tRatio) => {
                const tempVal = minTemp + tRatio * (maxTemp - minTemp);
                const x = getX(tempVal);
                return (
                  <g key={`t-grid-${tRatio}`}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + plotHeight}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={x}
                      y={padding.top + plotHeight + 18}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {tempVal.toFixed(0)}°C
                    </text>
                  </g>
                );
              })}

              {/* Y-axis Labels */}
              {[0, 0.5, 1.0].map((yRatio) => {
                const cpVal = minCp + yRatio * (maxCp - minCp);
                const y = getY(cpVal);
                return (
                  <g key={`y-grid-${yRatio}`}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={padding.left + plotWidth}
                      y2={y}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {cpVal.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Axes lines */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <line
                x1={padding.left}
                y1={padding.top + plotHeight}
                x2={padding.left + plotWidth}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              {/* Excess Area Fill under Curve */}
              <path d={excessAreaPath} fill="url(#dscPeakGradient)" />

              {/* Baseline Path */}
              <path
                d={baselineCpPath}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />

              {/* Total Apparent Cp Path */}
              <path
                d={totalCpPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Peak Tm Marker Line */}
              {standard.domains.map((dom, dIdx) => {
                const domX = getX(dom.tmCelsius);
                return (
                  <g key={`dom-marker-${dIdx}`}>
                    <line
                      x1={domX}
                      y1={padding.top}
                      x2={domX}
                      y2={padding.top + plotHeight}
                      stroke="#fbbf24"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle cx={domX} cy={getY(maxCp * 0.9)} r="4" fill="#fbbf24" />
                    <text
                      x={domX + 4}
                      y={padding.top + 15 + dIdx * 14}
                      fill="#fef08a"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      Tm{standard.domains.length > 1 ? ` (${dom.domainName.split(' ')[0]})` : ''}: {dom.tmCelsius}°C
                    </text>
                  </g>
                );
              })}

              {/* Interactive Hover Vertical Cursor */}
              {hoveredPoint && (
                <g>
                  <line
                    x1={getX(hoveredPoint.temperatureCelsius)}
                    y1={padding.top}
                    x2={getX(hoveredPoint.temperatureCelsius)}
                    y2={padding.top + plotHeight}
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={getX(hoveredPoint.temperatureCelsius)}
                    cy={getY(hoveredPoint.totalApparentCp)}
                    r="5"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Axis Titles */}
            <div className="flex justify-between items-center text-[11px] font-mono text-ivory-muted px-2 mt-1">
              <span>← Nhiệt độ thấp (Trạng thái Tự nhiên Native N)</span>
              <span className="font-bold text-amber-200">Trục hoành: Nhiệt độ T (°C)</span>
              <span>Nhiệt độ cao (Trạng thái Biến tính Denatured D) →</span>
            </div>
          </div>

          {/* Real-time Cursor Readout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy/70 border border-amber-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Nhiệt Độ Điểm Đọc</span>
              <span className="text-base font-bold text-white font-mono">
                {hoveredPoint.temperatureCelsius} °C / {hoveredPoint.temperatureKelvin} K
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-amber-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Nhiệt Dung Biểu Kiến Cp</span>
              <span className="text-base font-bold text-amber-300 font-mono">
                {hoveredPoint.totalApparentCp} kJ/(mol·K)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-amber-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Tỷ Lệ Biến Tính f_D</span>
              <span className="text-base font-bold text-cyan-300 font-mono">
                {(hoveredPoint.fractionUnfoldedFraction * 100).toFixed(1)}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-amber-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Nhiệt Dung Dư ΔCp_excess</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                {hoveredPoint.excessHeatCapacityDeltaCp} kJ/(mol·K)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOMAIN DECONVOLUTION */}
      {activeSubTab === 'DOMAIN_DECONVOLUTION' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-amber-500/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Giải Thừa Số Đa Vùng Biến Tính Nhiệt (Non-Two-State Domain Deconvolution)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                Tỷ số Hợp tác r_coop = {simulation.overallCooperativityRatio}
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Theo quy tắc nhiệt động học hai trạng thái (Two-State Rule): nếu tỷ số enthalpy nhiệt lượng kế trên van 't Hoff{' '}
              <strong className="text-amber-300 font-mono">r_coop = ΔHcal / ΔHvH ≈ 1.0</strong>, protein biến tính theo cơ chế
              "tất cả hoặc không". Nếu <strong className="text-cyan-300 font-mono">r_coop &gt; 1.0</strong>, phân tử bao gồm nhiều
              vùng cấu trúc (domains) biến tính độc lập ở các nhiệt độ nóng chảy khác nhau.
            </p>

            {/* Domain Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {simulation.deconvolutedDomains.map((dom, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-light/40 border border-amber-500/30 flex flex-col justify-between gap-2 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{dom.domainName}</span>
                      <span className="text-amber-400 font-mono">{dom.domainFractionPercent}% Enthalpy</span>
                    </div>
                    <div className="w-full bg-navy rounded-full h-1.5 overflow-hidden my-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-300 h-1.5 rounded-full"
                        style={{ width: `${dom.domainFractionPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-ivory-muted">
                      <span>Nhiệt độ Tm:</span>
                      <strong className="text-white">{dom.fittedTmCelsius} °C</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Enthalpy ΔHcal:</span>
                      <strong className="text-amber-300">{dom.fittedDeltaHcalKjPerMol} kJ/mol</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Enthalpy ΔHvH:</span>
                      <strong className="text-cyan-300">{dom.fittedDeltaHvHKjPerMol} kJ/mol</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Độ hợp tác r_coop:</span>
                      <strong className="text-emerald-300">
                        {(Math.abs(dom.fittedDeltaHcalKjPerMol) / Math.abs(dom.fittedDeltaHvHKjPerMol)).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Enthalpy Summary Bar */}
            <div className="p-3.5 rounded-xl bg-navy/90 border border-navy-light/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-ivory-muted">
                Tổng Biến Thiên Enthalpy: <strong className="text-amber-300">{simulation.totalCalorimetricEnthalpyKjPerMol} kJ/mol</strong>
              </span>
              <span className="text-ivory-muted">
                Độ Ổn Định Công Thức Đệm: <strong className="text-emerald-300">{simulation.bufferStabilizationScore}/100 Index</strong>
              </span>
              <span className="text-ivory-muted">
                Cơ Chế: <strong className="text-white">{standard.unfoldingMechanism}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GIBBS-HELMHOLTZ FREE ENERGY */}
      {activeSubTab === 'GIBBS_HELMHOLTZ' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-amber-500/30 p-4 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Phương Trình Gibbs-Helmholtz & Cửa Sổ Ổn Định Nhiệt Protein
            </h3>

            <div className="p-3 bg-navy rounded-xl border border-navy-light/40 font-mono text-xs text-amber-200">
              ΔG°(T) = ΔH_cal · (1 - T / Tm) - ΔCp · [ (Tm - T) + T · ln(T / Tm) ]
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Phương trình Gibbs-Helmholtz mô tả đường cong ổn định năng lượng tự do parabol của protein:
              Tại <strong className="text-white">T = Tm</strong>, năng lượng tự do <strong className="text-amber-300">ΔG° = 0</strong> (nồng độ dạng tự nhiên bằng dạng biến tính [N] = [D]).
              Tại nhiệt độ sinh lý (~37 °C), ΔG° đạt cực đại khoảng 40 - 60 kJ/mol, tạo thế cân bằng bền vững cho phân tử.
            </p>

            {/* Free Energy Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-navy-light/60 text-ivory-muted">
                    <th className="py-2 px-3">Nhiệt Độ (°C)</th>
                    <th className="py-2 px-3">Năng Lượng ΔG° (kJ/mol)</th>
                    <th className="py-2 px-3">Hằng Số Cân Bằng K_eq</th>
                    <th className="py-2 px-3">Phần Biến Tính f_D (%)</th>
                    <th className="py-2 px-3">Trạng Thái Chiếm Ưu Thế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {[25, 37, 50, standard.domains[0]?.tmCelsius || 65, 80, 95].map((temp, idx) => {
                    const dom = standard.domains[0];
                    const dGJ = calculateGibbsFreeEnergyJPerMol(
                      temp,
                      dom.tmCelsius,
                      dom.calorimetricEnthalpyKjPerMol,
                      dom.deltaCpKjPerMolKelvin
                    );
                    const dGkJ = Math.round((dGJ / 1000.0) * 10) / 10;
                    const fD = calculateFractionUnfolded(
                      temp,
                      dom.tmCelsius,
                      dom.calorimetricEnthalpyKjPerMol,
                      dom.deltaCpKjPerMolKelvin
                    );
                    const Keq = fD / Math.max(1e-9, 1.0 - fD);

                    return (
                      <tr key={idx} className="hover:bg-navy-light/20 transition-colors">
                        <td className="py-2 px-3 font-bold text-white">{temp} °C</td>
                        <td
                          className={`py-2 px-3 font-bold ${
                            dGkJ > 0 ? 'text-emerald-300' : dGkJ === 0 ? 'text-amber-300' : 'text-rose-300'
                          }`}
                        >
                          {dGkJ > 0 ? `+${dGkJ}` : dGkJ} kJ/mol
                        </td>
                        <td className="py-2 px-3 text-ivory-muted">
                          {Keq < 0.001 ? '< 0.001' : Keq > 1000 ? '> 1000' : Keq.toFixed(3)}
                        </td>
                        <td className="py-2 px-3 text-cyan-300">{(fD * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3">
                          {fD < 0.1 ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                              Tự nhiên (Native N)
                            </span>
                          ) : fD > 0.9 ? (
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                              Biến tính (Denatured D)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                              Chuyển Pha (Transition)
                            </span>
                          )}
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

      {/* TAB 4: CURRICULUM & STANDARDS */}
      {activeSubTab === 'CURRICULUM_STANDARDS' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/80 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Chuẩn Đo Lường Quốc Tế IUPAC & ASTM E967/E968
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.biotechSignificance}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Quy chuẩn:</strong> {standard.iupacAstmReference}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy/80 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                <Award className="w-4 h-4 text-cyan-400" />
                Tích Hợp Chương Trình GDPT 2018 (Hóa Học & Vật Lý)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Thành phần đệm / điều kiện:</strong> {standard.bufferComposition}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
