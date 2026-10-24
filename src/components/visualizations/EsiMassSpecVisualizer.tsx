// src/components/visualizations/EsiMassSpecVisualizer.tsx
// Milestone 76: Electrospray Ionization Mass Spectrometry (ESI-MS), Multiple Charging & Macromolecular Deconvolution Visualizer
// Standards: John B. Fenn (Nobel Prize in Chemistry 2002) & IUPAC Mass Spectrometry Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Khối phổ MS xác định phân tử khối; Hóa học 12: Protein, cấu trúc bậc 1 của insulin, kháng thể đơn dòng mAb; Sinh học 10: Axit nucleic DNA/RNA)

import React, { useState, useMemo } from 'react';
import {
  ESI_STANDARD_CATALOG,
  EsiStandard,
  simulateEsiMassSpectrum,
  deconvoluteAdjacentChargeState,
  PROTON_MASS_DA
} from '../../domain/esiMassSpecEngine';
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
  Wind,
  Award
} from 'lucide-react';

export interface EsiMassSpecVisualizerProps {
  initialStandardId?: string;
}

export const EsiMassSpecVisualizer: React.FC<EsiMassSpecVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'horse_heart_cytochrome_c'
  );

  // Active Standard
  const standard: EsiStandard = useMemo(() => {
    return (
      ESI_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) ||
      ESI_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Simulation Results
  const simResult = useMemo(() => {
    return simulateEsiMassSpectrum(standard);
  }, [standard]);

  const [selectedChargeZ, setSelectedChargeZ] = useState<number>(
    standard.mostAbundantChargeZ
  );
  const [viewMode, setViewMode] = useState<'RAW_SPECTRUM' | 'DECONVOLUTED_MASS' | 'CHARGE_LADDER' | 'TAYLOR_CONE'>('RAW_SPECTRUM');
  const [isSpraying, setIsSpraying] = useState<boolean>(false);

  // Handle Standard Selection
  const handleSelectStandard = (newId: string) => {
    setSelectedStandardId(newId);
    const targetStd = ESI_STANDARD_CATALOG.find((s) => s.id === newId) || ESI_STANDARD_CATALOG[0];
    setSelectedChargeZ(targetStd.mostAbundantChargeZ);
    sound.playUiClick();
    sound.playTaylorConeHighVoltageHum?.(targetStd.capillaryVoltageKv);
  };

  // Run Electrospray Ionization animation
  const handleRunSpray = () => {
    sound.playUiClick();
    sound.playTaylorConeHighVoltageHum?.(standard.capillaryVoltageKv);
    setIsSpraying(true);

    const peaks = simResult.chargeEnvelopePeaks;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const pk = peaks[(step * 2) % peaks.length];
      setSelectedChargeZ(pk.chargeZ);
      sound.playMassSpecIonDetectorPeakChime?.(pk.massToChargeMz);

      if (step >= 10) {
        clearInterval(interval);
        setIsSpraying(false);
        setSelectedChargeZ(standard.mostAbundantChargeZ);
      }
    }, 80);
  };

  // Active peak
  const activePeak = useMemo(() => {
    return (
      simResult.chargeEnvelopePeaks.find((p) => p.chargeZ === selectedChargeZ) ||
      simResult.chargeEnvelopePeaks[0]
    );
  }, [simResult.chargeEnvelopePeaks, selectedChargeZ]);

  // SVG dimensions
  const svgWidth = 620;
  const svgHeight = 220;
  const padding = { top: 20, right: 35, bottom: 35, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Render SVG Path for raw mass spectrum
  const { spectrumPath, minMz, maxMz } = useMemo(() => {
    const pts = simResult.spectrumCurve;
    if (pts.length === 0) return { spectrumPath: '', minMz: 500, maxMz: 3000 };

    const mzStart = pts[0].massToChargeMz;
    const mzEnd = pts[pts.length - 1].massToChargeMz;

    const path = pts
      .map((p, idx) => {
        const x = padding.left + ((p.massToChargeMz - mzStart) / (mzEnd - mzStart)) * plotWidth;
        const y = padding.top + plotHeight - (p.intensityPercent / 100) * plotHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return { spectrumPath: path, minMz: mzStart, maxMz: mzEnd };
  }, [simResult.spectrumCurve, plotWidth, plotHeight, padding]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-navy-dark via-navy to-obsidian border border-teal-500/30 text-ivory space-y-6 shadow-2xl">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-500/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-lg ring-1 ring-teal-400/40">
            <Atom className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/70 text-teal-400 border border-teal-500/40 font-bold uppercase tracking-wider">
                ELECTROSPRAY IONIZATION (ESI-MS)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
                <Award className="w-3 h-3" /> NOBEL HÓA HỌC 2002 (JOHN FENN)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-bold">
                GDPT 2018 METROLOGY
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-ivory mt-1">
              Khối Phổ Phun Mù Điện (ESI-MS): Đa Điện Tích [M + zH]ᶻ⁺ & Giải Chập Phân Tử Khối
            </h2>
          </div>
        </div>
      </div>

      {/* Standard Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-teal-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Layers className="w-4 h-4 text-teal-400" />
            CHỌN ĐẠI PHÂN TỬ CHUẨN (ESI-MS BENCHMARK CATALOG):
          </span>
          <span className="text-[11px] text-ivory-muted">5 Chuẩn Phổ Sinh Học & Dược Phẩm</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ESI_STANDARD_CATALOG.map((std) => {
            const isSelected = std.id === selectedStandardId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectStandard(std.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-br from-teal-950/80 to-cyan-950/90 border-teal-400 text-ivory shadow-lg ring-1 ring-teal-400/50'
                    : 'bg-navy/50 border-navy-light/40 text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-teal-500/30 text-teal-200' : 'bg-navy-dark text-ivory-muted'
                      }`}
                    >
                      {std.polarityMode === 'POSITIVE_ION' ? 'ESI (+)' : 'ESI (-)'}
                    </span>
                    <span className="text-[10px] font-mono text-teal-300 font-bold">
                      {std.trueNeutralMolecularWeightDa.toLocaleString()} Da
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ivory mt-1 line-clamp-1">{std.name}</h4>
                  <p className="text-[10px] text-ivory-muted line-clamp-1">{std.macromoleculeClass.replace(/_/g, ' ')}</p>
                </div>
                <div className="text-[9px] font-mono text-teal-300/80 truncate">
                  Đỉnh chính: z = {std.mostAbundantChargeZ}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-obsidian/70 border border-teal-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Atom className="w-3.5 h-3.5 text-teal-400" />
            Khối Lượng Trung Hòa Thực (M):
          </span>
          <strong className="text-teal-300 text-base font-bold">
            {standard.trueNeutralMolecularWeightDa.toFixed(1)} Da
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            {standard.chemicalFormula.split('(')[0]}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-cyan-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Khối Lượng Giải Chập:
          </span>
          <strong className="text-cyan-300 text-base font-bold">
            {simResult.calculatedNeutralMassDa.toFixed(1)} Da
          </strong>
          <span className="text-[10px] text-emerald-300 font-semibold block mt-0.5">
            Sai số: {simResult.massAccuracyPpm.toFixed(1)} ppm
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-amber-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Điện Áp Vi Kim & Nhiệt Khí:
          </span>
          <strong className="text-amber-300 text-base font-bold">
            {standard.capillaryVoltageKv} kV
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Khí N₂ sấy: {standard.desolvationGasTempCelsius}°C
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-rose-500/30">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            Đỉnh Tích Điện Đang Chọn:
          </span>
          <strong className="text-rose-300 text-base font-bold">
            z = {activePeak ? activePeak.chargeZ : standard.mostAbundantChargeZ}
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            m/z = {activePeak ? activePeak.massToChargeMz.toFixed(1) : 0} Th
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/70 border border-violet-500/30 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-ivory-muted block flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Giới Hạn Rayleigh (q_R):
          </span>
          <strong className="text-violet-300 text-base font-bold">
            {simResult.rayleighDropletChargeLimitFc.toFixed(2)} fC
          </strong>
          <span className="text-[10px] text-ivory-muted/70 block mt-0.5">
            Bùng nổ hạt giọt (Fission)
          </span>
        </div>
      </div>

      {/* Multi-View Mode Tabs */}
      <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('RAW_SPECTRUM');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'RAW_SPECTRUM'
                ? 'bg-teal-600 text-white shadow ring-1 ring-teal-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            1. Phổ Đa Tích Điện ESI [M + zH]ᶻ⁺
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('DECONVOLUTED_MASS');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'DECONVOLUTED_MASS'
                ? 'bg-cyan-600 text-white shadow ring-1 ring-cyan-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            2. Phổ Khối Trung Hòa Đã Giải Chập (M)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('CHARGE_LADDER');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'CHARGE_LADDER'
                ? 'bg-amber-600 text-white shadow ring-1 ring-amber-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            3. Ma Trận Giải Chập Từng Cặp Đỉnh
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setViewMode('TAYLOR_CONE');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              viewMode === 'TAYLOR_CONE'
                ? 'bg-rose-600 text-white shadow ring-1 ring-rose-400'
                : 'text-ivory-muted hover:text-ivory bg-navy/60'
            }`}
          >
            4. Nón Taylor & Cơ Chế Bay Hơi Ion
          </button>
        </div>

        <span className="text-[11px] font-mono text-teal-300">
          Chế độ: <strong>{standard.polarityMode === 'POSITIVE_ION' ? 'Proton hóa (+)' : 'Khử proton (-)'}</strong>
        </span>
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="p-4 rounded-xl bg-obsidian/90 border border-teal-500/30 flex flex-col items-center">
        {viewMode === 'RAW_SPECTRUM' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-teal-300">
              <span>Phổ Khối ESI Gốc: Cường Độ Tương Đối (%) vs Tỷ Số Khối Trên Điện Tích m/z (Th)</span>
              <span className="text-ivory-muted text-[10px]">
                Mỗi đỉnh biểu thị một trạng thái proton hóa [M + zH]ᶻ⁺ của đại phân tử
              </span>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Charge Peak Indicators */}
                {simResult.chargeEnvelopePeaks.map((pk) => {
                  const x = padding.left + ((pk.massToChargeMz - minMz) / (maxMz - minMz)) * plotWidth;
                  const isSelected = pk.chargeZ === selectedChargeZ;

                  return (
                    <g key={pk.chargeZ}>
                      <line
                        x1={x}
                        y1={padding.top + plotHeight - (pk.relativeIntensityPercent / 100) * plotHeight}
                        x2={x}
                        y2={padding.top + plotHeight}
                        stroke={isSelected ? '#f59e0b' : '#14b8a6'}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />
                      <text
                        x={x}
                        y={padding.top + plotHeight - (pk.relativeIntensityPercent / 100) * plotHeight - 6}
                        fill={isSelected ? '#f59e0b' : '#5eead4'}
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {pk.chargeZ > 0 ? `+${pk.chargeZ}` : pk.chargeZ}
                      </text>
                    </g>
                  );
                })}

                {/* Continuous Raw Spectrum Trace */}
                <path d={spectrumPath} fill="none" stroke="#2dd4bf" strokeWidth="1.8" />

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Tỷ Số Khối Trên Điện Tích m/z (Thomsons, Th)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  Cường Độ Tương Đối (%)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'DECONVOLUTED_MASS' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Phổ Sau Giải Chập (Deconvoluted Mass Spectrum): Khối Lượng Phân Tử Trung Hòa M (Da)</span>
              <span className="text-ivory-muted text-[10px]">
                Toàn bộ dải đỉnh đa tích điện được sáp nhập thành 1 đỉnh nguyên vẹn duy nhất
              </span>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-navy-light/30 rounded-lg bg-navy/30">
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />
                <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1" />

                {/* Single Deconvoluted Mass Peak at center */}
                {(() => {
                  const xCenter = padding.left + plotWidth / 2;
                  return (
                    <g>
                      <line x1={xCenter} y1={padding.top + 20} x2={xCenter} y2={padding.top + plotHeight} stroke="#06b6d4" strokeWidth="4" />
                      <circle cx={xCenter} cy={padding.top + 20} r="5" fill="#38bdf8" />
                      <text x={xCenter} y={padding.top + 12} fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        M = {simResult.calculatedNeutralMassDa.toFixed(1)} Da (100%)
                      </text>
                      <text x={xCenter} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        Chuẩn thực tế: {standard.trueNeutralMolecularWeightDa} Da
                      </text>
                    </g>
                  );
                })()}

                {/* Axis Labels */}
                <text x={padding.left + plotWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Khối Lượng Phân Tử Trung Hòa M (Dalton, Da)
                </text>
                <text x={18} y={padding.top + plotHeight / 2} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`}>
                  Cường Độ Tích Hợp (%)
                </text>
              </svg>
            </div>
          </div>
        )}

        {viewMode === 'CHARGE_LADDER' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Bảng Giải Chập Độc Lập Giữa Các Cặp Đỉnh Liền Kề: z₁ = ((m/z)₂ - mₚ) / Δ(m/z)</span>
              <span className="text-ivory-muted text-[10px]">
                Phương trình John Fenn: Mỗi cặp đỉnh lân cận đều suy ra cùng một phân tử khối
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-navy-light/40">
              <table className="w-full text-left font-mono text-xs bg-navy/40">
                <thead className="bg-obsidian/60 text-ivory-muted border-b border-navy-light/40 text-[11px]">
                  <tr>
                    <th className="p-2.5">Trạng Thái Tích Điện (z)</th>
                    <th className="p-2.5">Dạng Ion Adduct</th>
                    <th className="p-2.5">m/z Đo Được (Th)</th>
                    <th className="p-2.5">Cường Độ (%)</th>
                    <th className="p-2.5">Khối Lượng Giải Chập (Da)</th>
                    <th className="p-2.5">Sai Số Đối Với M Chuẩn (ppm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {simResult.chargeEnvelopePeaks.map((pk) => {
                    const isSelected = pk.chargeZ === selectedChargeZ;
                    const errorPpm = (Math.abs(pk.deconvolutedMassDa - standard.trueNeutralMolecularWeightDa) / standard.trueNeutralMolecularWeightDa) * 1e6;

                    return (
                      <tr
                        key={pk.chargeZ}
                        onClick={() => {
                          setSelectedChargeZ(pk.chargeZ);
                          sound.playUiClick();
                          sound.playMassSpecIonDetectorPeakChime?.(pk.massToChargeMz);
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-teal-950/70 text-white font-bold' : 'hover:bg-navy-light/20 text-ivory-muted'
                        }`}
                      >
                        <td className="p-2.5 text-teal-300 font-bold">{pk.chargeZ > 0 ? `+${pk.chargeZ}` : pk.chargeZ}</td>
                        <td className="p-2.5 text-cyan-200">{pk.adductIdentity}</td>
                        <td className="p-2.5 text-amber-300">{pk.massToChargeMz.toFixed(2)} Th</td>
                        <td className="p-2.5">{pk.relativeIntensityPercent.toFixed(1)}%</td>
                        <td className="p-2.5 text-ivory font-bold">{pk.deconvolutedMassDa.toFixed(1)} Da</td>
                        <td className="p-2.5 text-emerald-300">{errorPpm.toFixed(1)} ppm</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'TAYLOR_CONE' && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-rose-300">
              <span>Sơ Đồ Buồng Phun Mù Điện ESI: Nón Taylor, Khí N₂ Sấy & Bùng Nổ Coulomb (Rayleigh Fission)</span>
              <span className="text-ivory-muted text-[10px]">Áp điện thế cao V = {standard.capillaryVoltageKv} kV</span>
            </div>

            <div className="p-4 rounded-xl bg-navy/60 border border-rose-500/30 flex flex-col items-center">
              <svg width={svgWidth} height={150} className="w-full max-w-xl">
                {/* Capillary Needle */}
                <rect x="30" y="65" width="100" height="15" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="75" y="60" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Vi Ống Dẫn Mẫu
                </text>
                <text x="75" y="93" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  V = {standard.capillaryVoltageKv} kV
                </text>

                {/* Taylor Cone */}
                <polygon points="130,65 130,80 160,72.5" fill="#38bdf8" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="145" y="55" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Nón Taylor (49.3°)
                </text>

                {/* Aerosol Plume */}
                <circle cx="180" cy="68" r="4" fill="#38bdf8" opacity="0.8" />
                <circle cx="210" cy="74" r="3.5" fill="#38bdf8" opacity="0.7" />
                <circle cx="240" cy="65" r="3" fill="#38bdf8" opacity="0.6" />
                <circle cx="270" cy="78" r="2.5" fill="#38bdf8" opacity="0.5" />
                <circle cx="300" cy="70" r="2" fill="#38bdf8" opacity="0.4" />
                <circle cx="330" cy="72" r="1.5" fill="#38bdf8" opacity="0.3" />

                {/* Heated Desolvation Nitrogen Gas */}
                <path d="M 280,25 Q 250,50 220,68" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                <text x="290" y="22" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  Khí N₂ Sấy ({standard.desolvationGasTempCelsius}°C)
                </text>

                {/* Mass Spectrometer Sampling Orifice */}
                <rect x="380" y="45" width="180" height="55" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="470" y="72" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Lỗ Thu Nhận Ion MS
                </text>
                <text x="470" y="87" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Chân Không Cao 10⁻⁵ mbar
                </text>
              </svg>
              <p className="text-[11px] font-mono text-ivory-muted mt-2 text-center">
                Mô hình bốc hơi ion (IEM) và mô hình giọt tàn dư (CRM): Phân tử sinh học được ion hóa nhẹ nhàng ở áp suất khí quyển mà không hề bị bẻ gãy liên kết peptide.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls & Electrospray Trigger */}
      <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-teal-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-400" />
              CHỌN TRẠNG THÁI TÍCH ĐIỆN (CHARGE STATE SELECTOR):
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              z = {selectedChargeZ > 0 ? `+${selectedChargeZ}` : selectedChargeZ} ({activePeak ? activePeak.massToChargeMz.toFixed(1) : 0} Th)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedChargeZ(standard.mostAbundantChargeZ);
                sound.playUiClick();
              }}
              className="px-2.5 py-1 rounded bg-navy-light/80 hover:bg-navy-light text-ivory text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Đỉnh Chính (z={standard.mostAbundantChargeZ})
            </button>
            <button
              onClick={handleRunSpray}
              disabled={isSpraying}
              className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow ${
                isSpraying
                  ? 'bg-amber-600 text-obsidian animate-pulse'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-obsidian font-extrabold'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isSpraying ? 'Đang Phun Mù Ion Hóa...' : 'Bơm Phun Mù Điện (Spray Ionize)'}
            </button>
          </div>
        </div>

        {/* Charge State Slider */}
        <input
          type="range"
          min={Math.abs(standard.minimumChargeZ)}
          max={Math.abs(standard.maximumChargeZ)}
          step={1}
          value={Math.abs(selectedChargeZ)}
          onChange={(e) => {
            const absVal = parseInt(e.target.value, 10);
            const signedZ = standard.polarityMode === 'POSITIVE_ION' ? absVal : -absVal;
            setSelectedChargeZ(signedZ);
            const pk = simResult.chargeEnvelopePeaks.find((p) => p.chargeZ === signedZ);
            if (pk) {
              sound.playMassSpecIonDetectorPeakChime?.(pk.massToChargeMz);
            }
          }}
          className="w-full accent-teal-400 cursor-pointer h-2 bg-obsidian rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
          <span>z = {standard.minimumChargeZ} (m/z cao)</span>
          <span className="text-teal-300 font-bold">Phân Bố Gaussian Đa Proton Hóa</span>
          <span>z = {standard.maximumChargeZ} (m/z thấp)</span>
        </div>
      </div>

      {/* Curriculum & Biotech Significance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-navy/40 border border-teal-500/30 space-y-2">
          <h4 className="font-semibold text-teal-300 flex items-center gap-1.5 font-mono">
            <FileText className="w-4 h-4 text-teal-400" />
            CHƯƠNG TRÌNH GDPT 2018 (HÓA HỌC 10 & 12):
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.curriculumNotes}
          </p>
          <div className="text-[10px] font-mono text-teal-400/80 pt-1 border-t border-navy-light/30">
            Trọng tâm: Phương pháp ion hóa mềm không phân mảnh; giải chập tỷ số m/z để xác định phân tử khối chính xác tuyệt đối của protein và peptide.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy/40 border border-cyan-500/30 space-y-2">
          <h4 className="font-semibold text-cyan-300 flex items-center gap-1.5 font-mono">
            <Sun className="w-4 h-4 text-cyan-400" />
            CÔNG NGHỆ SINH HỌC & KIỂM ĐỊNH DƯỢC PHẨM:
          </h4>
          <p className="text-ivory-muted leading-relaxed text-[11px]">
            {standard.biotechApplication}
          </p>
          <div className="text-[10px] font-mono text-cyan-300/80 pt-1 border-t border-navy-light/30">
            {standard.nobelCitation}
          </div>
        </div>
      </div>

      {/* Provenance Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3">
        <span>Nguồn: John B. Fenn Nobel Metrology & IUPAC Mass Spectrometry Standards</span>
        <span className="text-teal-400 font-semibold">IUPAC & GDPT 2018 AUDITED</span>
      </div>
    </div>
  );
};
