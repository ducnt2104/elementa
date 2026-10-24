import React, { useState, useMemo, useEffect } from 'react';
import {
  PPC_STANDARD_CATALOG,
  PpcStandard,
  simulatePpcExperiment,
  calculateWaterThermalExpansionKInv,
  calculateProteinThermalExpansionKInv,
  WATER_DENSITY_MAX_TEMP_CELSIUS,
  STANDARD_PPC_PRESSURE_JUMP_BAR,
} from '../../domain/ppcEngine';
import { sound } from '../../audio/soundEngine';
import {
  Gauge,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Thermometer,
  TrendingUp,
  Award,
  Droplets,
  Sliders,
  Wind,
} from 'lucide-react';

interface PpcVisualizerProps {
  initialStandardId?: string;
}

export const PpcVisualizer: React.FC<PpcVisualizerProps> = ({
  initialStandardId = 'lysozyme_hewl_solvation_shell',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'THERMAL_EXPANSION_CURVE' | 'PRESSURE_PULSES' | 'SOLVATION_CAVITY' | 'CURRICULUM_STANDARDS'
  >('THERMAL_EXPANSION_CURVE');

  const standard: PpcStandard = useMemo(() => {
    return (
      PPC_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || PPC_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTempIndex, setHoveredTempIndex] = useState<number | null>(null);

  // Play audio on standard selection
  useEffect(() => {
    sound.playThermalExpansionPulsePing?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulatePpcExperiment(standard, 85);
  }, [standard]);

  const hoveredPoint =
    hoveredTempIndex !== null && simulation.points[hoveredTempIndex]
      ? simulation.points[hoveredTempIndex]
      : simulation.points[Math.floor(simulation.points.length / 2)];

  // SVG plot settings
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 35, bottom: 50, left: 75 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const [minTemp, maxTemp] = standard.temperatureRangeCelsius;

  const minAlpha = Math.min(
    ...simulation.points.map((p) => Math.min(p.proteinThermalExpansionKInv, p.waterThermalExpansionKInv))
  );
  const maxAlpha = Math.max(
    ...simulation.points.map((p) => Math.max(p.proteinThermalExpansionKInv, p.waterThermalExpansionKInv))
  ) * 1.15;

  const getX = (tempC: number) => {
    return padding.left + ((tempC - minTemp) / (maxTemp - minTemp)) * plotWidth;
  };

  const getY = (alpha: number) => {
    return padding.top + plotHeight - ((alpha - minAlpha) / (maxAlpha - minAlpha)) * plotHeight;
  };

  // Protein thermal expansion curve
  const proteinAlphaPath = useMemo(() => {
    return simulation.points.reduce((acc, pt, idx) => {
      const x = getX(pt.temperatureCelsius);
      const y = getY(pt.proteinThermalExpansionKInv);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, minAlpha, maxAlpha, minTemp, maxTemp]);

  // Water reference curve
  const waterAlphaPath = useMemo(() => {
    return simulation.points.reduce((acc, pt, idx) => {
      const x = getX(pt.temperatureCelsius);
      const y = getY(pt.waterThermalExpansionKInv);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, minAlpha, maxAlpha, minTemp, maxTemp]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-emerald-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
            <Gauge className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Nhiệt Lượng Kế Nhiễu Loạn Áp Suất PPC & Độ Nở Nhiệt (α)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                IUPAC / IAPWS-95
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Bước nhảy áp suất ±5 bar · Hệ số nở nhiệt thể tích vỏ hydrat hóa α(T) · Thể tích biến tính ΔV
            </p>
          </div>
        </div>

        {/* Audio Test Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPpcPressureJumpHiss?.();
              sound.playThermalExpansionPulsePing?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-mono transition-colors shadow-sm"
          >
            <Wind className="w-3.5 h-3.5 text-emerald-400" />
            <span>Xả Áp Suất ±5 bar PPC ⚡</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-ivory-muted font-mono flex items-center gap-1 mr-1">
          <Target className="w-3.5 h-3.5 text-emerald-400" /> Hệ Chuẩn PPC:
        </span>
        {PPC_STANDARD_CATALOG.map((std) => (
          <button
            key={std.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedStandardId(std.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedStandardId === std.id
                ? 'bg-emerald-500 text-obsidian border-emerald-300 font-extrabold shadow-md scale-105'
                : 'bg-navy-light/40 text-ivory hover:text-white border-navy-light/60 hover:border-emerald-400/50'
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
            setActiveSubTab('THERMAL_EXPANSION_CURVE');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'THERMAL_EXPANSION_CURVE'
              ? 'bg-emerald-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>Đường Cong Nở Nhiệt α(T)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('PRESSURE_PULSES');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'PRESSURE_PULSES'
              ? 'bg-emerald-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Wind className="w-4 h-4 text-emerald-300" />
          <span>Xung Nhiệt Nhiễu Loạn Áp Suất (ΔQ)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SOLVATION_CAVITY');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'SOLVATION_CAVITY'
              ? 'bg-emerald-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Droplets className="w-4 h-4 text-emerald-300" />
          <span>Vỏ Hydrat Hóa & Hốc Rỗng (Cavity Volume)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CURRICULUM_STANDARDS');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'CURRICULUM_STANDARDS'
              ? 'bg-emerald-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-300" />
          <span>Chuẩn IUPAC/IAPWS & GDPT 2018</span>
        </button>
      </div>

      {/* TAB 1: THERMAL EXPANSION CURVE */}
      {activeSubTab === 'THERMAL_EXPANSION_CURVE' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="relative w-full bg-navy/90 rounded-2xl border border-emerald-500/30 p-4 shadow-inner overflow-hidden">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-ivory-muted mb-2">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                Dải Nhiệt Độ Quét: <strong className="text-white">{minTemp} °C → {maxTemp} °C</strong> (Bước nhảy: ±{STANDARD_PPC_PRESSURE_JUMP_BAR} bar)
              </span>
              <span className="text-emerald-300 font-bold">
                {standard.unfoldingTmCelsius ? (
                  <>Bước Nhảy Nở Nhiệt Tại Tm {standard.unfoldingTmCelsius}°C: <strong className="text-white">Δα = {(simulation.thermalExpansionJumpAtTmKInv * 1e4).toFixed(2)} × 10⁻⁴ K⁻¹</strong></>
                ) : (
                  <>Điểm Nước Không Nở Nhiệt: <strong className="text-white font-mono">3.98 °C (α = 0)</strong></>
                )}
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
              {/* Grid Lines */}
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

              {/* Zero alpha horizontal line if in range */}
              {minAlpha <= 0 && maxAlpha >= 0 && (
                <line
                  x1={padding.left}
                  y1={getY(0)}
                  x2={padding.left + plotWidth}
                  y2={getY(0)}
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              )}

              {/* Water Anomaly 3.98 °C Marker */}
              {minTemp <= 3.98 && maxTemp >= 3.98 && (
                <g>
                  <line
                    x1={getX(3.98)}
                    y1={padding.top}
                    x2={getX(3.98)}
                    y2={padding.top + plotHeight}
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx={getX(3.98)} cy={getY(0)} r="4" fill="#38bdf8" />
                  <text
                    x={getX(3.98) + 4}
                    y={padding.top + 20}
                    fill="#7dd3fc"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    3.98°C (α_nước = 0)
                  </text>
                </g>
              )}

              {/* Protein Unfolding Tm Marker */}
              {standard.unfoldingTmCelsius && (
                <g>
                  <line
                    x1={getX(standard.unfoldingTmCelsius)}
                    y1={padding.top}
                    x2={getX(standard.unfoldingTmCelsius)}
                    y2={padding.top + plotHeight}
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={getX(standard.unfoldingTmCelsius) + 4}
                    y={padding.top + 35}
                    fill="#6ee7b7"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    Tm: {standard.unfoldingTmCelsius}°C (Bộc Lộ Gốc Kỵ Nước)
                  </text>
                </g>
              )}

              {/* Water Reference Path (Cyan) */}
              <path
                d={waterAlphaPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />

              {/* Protein Thermal Expansion Path (Emerald) */}
              <path
                d={proteinAlphaPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Hover Cursor */}
              {hoveredPoint && (
                <g>
                  <line
                    x1={getX(hoveredPoint.temperatureCelsius)}
                    y1={padding.top}
                    x2={getX(hoveredPoint.temperatureCelsius)}
                    y2={padding.top + plotHeight}
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={getX(hoveredPoint.temperatureCelsius)}
                    cy={getY(hoveredPoint.proteinThermalExpansionKInv)}
                    r="5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-ivory-muted px-2 mt-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                  <strong className="text-white">Protein α_bar_p(T)</strong> (Đo bởi PPC)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 inline-block stroke-dasharray" />
                  <strong className="text-cyan-300">Nước Chuẩn α_water(T)</strong>
                </span>
              </div>
              <span className="text-emerald-300 font-bold">Trục hoành: Nhiệt độ T (°C)</span>
            </div>
          </div>

          {/* Cursor Readout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy/70 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Nhiệt Độ Điểm Đọc</span>
              <span className="text-base font-bold text-white font-mono">
                {hoveredPoint.temperatureCelsius} °C
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Hệ Số Nở Nhiệt α_p</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                {(hoveredPoint.proteinThermalExpansionKInv * 1e4).toFixed(3)} × 10⁻⁴ K⁻¹
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Xung Nhiệt Áp Suất ΔQ</span>
              <span className="text-base font-bold text-cyan-300 font-mono">
                {hoveredPoint.heatEffectMicroJoules} µJ
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Thể Tích Riêng v_bar_p</span>
              <span className="text-base font-bold text-amber-300 font-mono">
                {hoveredPoint.partialSpecificVolumeCm3PerG} cm³/g
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRESSURE JUMP HEAT PULSES */}
      {activeSubTab === 'PRESSURE_PULSES' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-emerald-500/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                Hiệu Ứng Nhiệt Của Bước Nhảy Áp Suất (Pressure Perturbation Thermogram)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                ΔP = ±{STANDARD_PPC_PRESSURE_JUMP_BAR} bar (0.5 MPa)
              </span>
            </div>

            <div className="p-3 bg-navy rounded-xl border border-navy-light/40 font-mono text-xs text-emerald-200">
              ΔQ = -T · V_cell · (α_mẫu - α_chuẩn) · ΔP
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Khi buồng mẫu nhận bước nhảy áp suất ΔP = +5 bar, lượng nhiệt trao đổi ΔQ phụ thuộc trực tiếp vào
              chênh lệch hệ số nở nhiệt thể tích giữa dung dịch protein và dung môi đệm.
              Bằng cách lặp lại bước nhảy áp suất ở các nhiệt độ tăng dần, PPC vẽ nên bức tranh thể tích học hoàn chỉnh
              của phân tử sinh học mà không cần tiếp xúc quang học.
            </p>

            {/* Discrete Temperature Pulses */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[15, 25, 37, standard.unfoldingTmCelsius || 50, 75].map((temp, idx) => {
                const waterAlpha = calculateWaterThermalExpansionKInv(temp);
                const protAlpha = calculateProteinThermalExpansionKInv(temp, standard);
                const heatUj = - (temp + 273.15) * 5e-7 * (protAlpha - waterAlpha) * 5e5 * 1e6;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy-light/40 border border-emerald-500/30 flex flex-col justify-between gap-1 shadow-sm"
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>T = {temp} °C</span>
                      {temp === standard.unfoldingTmCelsius && (
                        <span className="text-[10px] text-amber-300 font-mono font-bold">Tm</span>
                      )}
                    </div>
                    <div className="text-sm font-black font-mono text-emerald-300 my-1">
                      {heatUj.toFixed(1)} µJ
                    </div>
                    <div className="text-[10px] text-ivory-muted font-mono">
                      Δα: {((protAlpha - waterAlpha) * 1e4).toFixed(2)} × 10⁻⁴
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOLVATION & CAVITY VOLUME */}
      {activeSubTab === 'SOLVATION_CAVITY' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-emerald-500/30 p-4 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-400" />
              Cấu Trúc Lớp Vỏ Hydrat Hóa & Thể Tích Hốc Rỗng Nội Phân Tử (Cavities)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-navy-light/40 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-mono text-ivory-muted block">Thể Tích Hốc Rỗng (Cavity Volume)</span>
                <span className="text-2xl font-black text-amber-300 font-mono">
                  {standard.internalCavityVolumeAngstrom3} Å³
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Các khiếm khuyết sắp xếp nội phân tử trong lõi kỵ nước. Dưới áp suất cao, các hốc này bị nén lại hoặc bị phân tử nước xâm nhập.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-light/40 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-mono text-ivory-muted block">Biến Thiên Thể Tích Biến Tính (ΔV_unf)</span>
                <span className="text-2xl font-black text-cyan-300 font-mono">
                  {standard.volumeChangeOfUnfoldingMlPerMol || 0.0} mL/mol
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Đo trực tiếp độ chênh lệch thể tích mol giữa trạng thái biến tính và trạng thái tự nhiên. Giá trị âm phản ánh nước lấp đầy các hốc rỗng.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-light/40 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-mono text-ivory-muted block">Chỉ Số Trật Tự Vỏ Hydrat Hóa</span>
                <span className="text-2xl font-black text-emerald-300 font-mono">
                  {simulation.solvationShellOrderScore} / 100
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Mức độ hình thành mạng lưới liên kết hydro kiểu lồng "ice-like clathrate" của các phân tử nước bao quanh protein.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CURRICULUM & STANDARDS */}
      {activeSubTab === 'CURRICULUM_STANDARDS' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/80 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Chuẩn Đo Lường Quốc Tế IUPAC & IAPWS-95
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.biotechSignificance}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Quy chuẩn:</strong> {standard.astmIupacReference}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy/80 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                <Award className="w-4 h-4 text-cyan-400" />
                Tích Hợp Chương Trình GDPT 2018 (Vật Lý & Hóa Học)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Dung dịch đệm:</strong> {standard.bufferComposition}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
