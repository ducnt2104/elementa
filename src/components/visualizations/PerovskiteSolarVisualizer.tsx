// src/components/visualizations/PerovskiteSolarVisualizer.tsx
// Interactive Visualizer: Perovskite Solar Cells, ABX3 Crystal Lattices & 2-Terminal Tandem Record
// Standards: IUPAC Photovoltaics, NREL Best Research-Cell Efficiency Chart, ISOS Testing & Vietnam GDPT 2018 (Hóa 10 & 11: Liên kết ion, Tinh thể & Năng lượng mặt trời)

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Box,
  Sun,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Flame,
  ShieldAlert,
  BatteryCharging
} from 'lucide-react';
import {
  PEROVSKITE_COMPOSITIONS_CATALOG,
  calculateGoldschmidtTolerance,
  simulateSolarCellPerformance,
  simulatePerovskiteStabilityISOS,
  PerovskiteCompositionId,
  SolarArchitectureType
} from '../../domain/perovskiteSolarEngine';
import { sound } from '../../audio/soundEngine';

type PerovskiteTabMode = 'CRYSTAL_LATTICE_ABX3' | 'TANDEM_2T_POLARIZATION_CURVE' | 'ISOS_OPERATIONAL_STABILITY';

export const PerovskiteSolarVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PerovskiteTabMode>('CRYSTAL_LATTICE_ABX3');

  // Selections
  const [selectedCompositionId, setSelectedCompositionId] = useState<PerovskiteCompositionId>('MIXED_HALIDE_WIDE_GAP');
  const [selectedArchitecture, setSelectedArchitecture] = useState<SolarArchitectureType>('TANDEM_PEROVSKITE_SILICON_2T');

  // Sliders
  const [irradianceSuns, setIrradianceSuns] = useState<number>(1.0);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25);

  const selectedComposition = useMemo(() => {
    return PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === selectedCompositionId) || PEROVSKITE_COMPOSITIONS_CATALOG[0];
  }, [selectedCompositionId]);

  // Photovoltaic simulation
  const { performance, ivPoints } = useMemo(() => {
    return simulateSolarCellPerformance(selectedArchitecture, selectedCompositionId, irradianceSuns, temperatureCelsius);
  }, [selectedArchitecture, selectedCompositionId, irradianceSuns, temperatureCelsius]);

  // Comparison performances
  const singlePerovskitePerf = useMemo(() => {
    return simulateSolarCellPerformance('SINGLE_JUNCTION_PEROVSKITE', selectedCompositionId, irradianceSuns, temperatureCelsius).performance;
  }, [selectedCompositionId, irradianceSuns, temperatureCelsius]);

  const singleSiliconPerf = useMemo(() => {
    return simulateSolarCellPerformance('SINGLE_JUNCTION_SILICON', selectedCompositionId, irradianceSuns, temperatureCelsius).performance;
  }, [selectedCompositionId, irradianceSuns, temperatureCelsius]);

  const tandemPerf = useMemo(() => {
    return simulateSolarCellPerformance('TANDEM_PEROVSKITE_SILICON_2T', selectedCompositionId, irradianceSuns, temperatureCelsius).performance;
  }, [selectedCompositionId, irradianceSuns, temperatureCelsius]);

  // Goldschmidt tolerance check
  const toleranceCalc = useMemo(() => {
    return calculateGoldschmidtTolerance(
      selectedComposition.aRadiusAngstrom,
      selectedComposition.bRadiusAngstrom,
      selectedComposition.xRadiusAngstrom
    );
  }, [selectedComposition]);

  // ISOS stability data
  const stabilityPoints = useMemo(() => {
    return simulatePerovskiteStabilityISOS(1500);
  }, []);

  return (
    <div className="bg-obsidian-card border border-amber-900/40 rounded-2xl p-6 shadow-2xl text-ivory space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-500/40">
              KỶ NGUYÊN QUANG ĐIỆN THẾ HỆ THỨ 3
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <Sun className="w-3 h-3 text-yellow-300 animate-spin" /> Tandem 33.9% PCE
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2">
            Pin Mặt Trời Perovskite & Cặp Ghép Tandem 2 Cực (Perovskite/Silicon)
          </h2>
          <p className="text-xs text-ivory-muted max-w-2xl mt-0.5">
            Mô phỏng mạng tinh thể lập phương ABX₃, hệ số dung sai Goldschmidt, và kiến trúc Tandem nguyên khối phá vỡ giới hạn quang điện đơn lớp Shockley-Queisser (33.7%) đạt kỷ lục thế giới trên 33.9%.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-obsidian-elevated/70 p-1.5 rounded-xl border border-obsidian-border gap-1 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CRYSTAL_LATTICE_ABX3');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CRYSTAL_LATTICE_ABX3'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-1 ring-amber-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Mạng Tinh Thể ABX₃ & Goldschmidt</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TANDEM_2T_POLARIZATION_CURVE');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'TANDEM_2T_POLARIZATION_CURVE'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-1 ring-amber-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Đặc Tính I-V & Kỷ Lục Tandem 2T</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('ISOS_OPERATIONAL_STABILITY');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ISOS_OPERATIONAL_STABILITY'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-1 ring-amber-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Độ Bền ISOS & Đóng Gói 2D/3D</span>
          </button>
        </div>
      </div>

      {/* COMPOSITION SELECTOR ROW */}
      <div className="bg-obsidian-elevated/40 p-4 rounded-xl border border-obsidian-border">
        <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
          <Atom className="w-3.5 h-3.5 text-amber-400" />
          Chọn Công Thức Tinh Thể Perovskite Kim Loại Halogen (ABX₃):
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
          {PEROVSKITE_COMPOSITIONS_CATALOG.map(comp => (
            <button
              key={comp.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedCompositionId(comp.id);
              }}
              className={`p-3 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                selectedCompositionId === comp.id
                  ? 'bg-amber-950/70 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                  : 'bg-obsidian-card border-obsidian-border text-ivory-muted hover:border-ivory-muted'
              }`}
            >
              <div>
                <div className="font-mono font-bold text-amber-200 text-xs">{comp.formula}</div>
                <div className="text-[11px] font-medium text-ivory mt-0.5 truncate">{comp.name.split('(')[0]}</div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-obsidian-border/60 text-[10px]">
                <span className="text-ivory-muted">Eg: <b className="text-emerald-400">{comp.bandgapEv} eV</b></span>
                <span className="font-mono text-amber-300">t = {comp.goldschmidtToleranceFactor}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CRYSTAL LATTICE ABX3 & GOLDSCHMIDT TOLERANCE */}
      {activeTab === 'CRYSTAL_LATTICE_ABX3' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualizer SVG Canvas */}
            <div className="lg:col-span-7 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider mb-2 flex items-center gap-2 self-start">
                <Box className="w-4 h-4 text-amber-400" />
                Mô Phỏng Không Gian Mạng Tinh Thể Ô Cơ Sở Perovskite Lập Phương
              </h4>

              <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto select-none">
                <defs>
                  <radialGradient id="cationAGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </radialGradient>
                  <radialGradient id="cationBGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#b45309" />
                  </radialGradient>
                  <radialGradient id="anionXGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#581c87" />
                  </radialGradient>
                </defs>

                {/* 3D Cube Perspective Edges */}
                {/* Back edges */}
                <line x1="180" y1="80" x2="380" y2="80" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="180" y1="80" x2="180" y2="240" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="180" y1="80" x2="120" y2="140" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Octahedral [BX6] bonds from central B-site (250, 160) */}
                <line x1="250" y1="160" x2="250" y2="60" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="250" y1="160" x2="250" y2="260" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="250" y1="160" x2="150" y2="160" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="250" y1="160" x2="350" y2="160" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="250" y1="160" x2="200" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="250" y1="160" x2="300" y2="200" stroke="#f59e0b" strokeWidth="2" />

                {/* Front and connecting cube edges */}
                <rect x="120" y="140" width="200" height="140" fill="none" stroke="#64748b" strokeWidth="2" />
                <line x1="320" y1="140" x2="380" y2="80" stroke="#64748b" strokeWidth="2" />
                <line x1="320" y1="280" x2="380" y2="220" stroke="#64748b" strokeWidth="2" />
                <line x1="380" y1="80" x2="380" y2="220" stroke="#64748b" strokeWidth="2" />
                <line x1="180" y1="240" x2="380" y2="220" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="180" y1="240" x2="120" y2="280" stroke="#64748b" strokeWidth="2" />

                {/* Octahedral Anion X positions (Face centers / Edge midpoints) */}
                <circle cx="250" cy="60" r="14" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="250" cy="260" r="14" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="150" cy="160" r="14" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="350" cy="160" r="14" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="200" cy="120" r="12" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
                <circle cx="300" cy="200" r="14" fill="url(#anionXGrad)" stroke="#c084fc" strokeWidth="1.5" />

                {/* Central B-site cation (Pb2+ / Sn2+) */}
                <circle cx="250" cy="160" r="18" fill="url(#cationBGrad)" stroke="#fef08a" strokeWidth="2" />
                <text x="250" y="165" fill="#18181b" fontSize="11" fontWeight="900" textAnchor="middle">B²⁺</text>

                {/* Corner A-site cations (MA+ / FA+ / Cs+) */}
                {[
                  { x: 120, y: 140 },
                  { x: 320, y: 140 },
                  { x: 120, y: 280 },
                  { x: 320, y: 280 },
                  { x: 380, y: 80 },
                  { x: 380, y: 220 }
                ].map((pt, idx) => (
                  <circle key={idx} cx={pt.x} cy={pt.y} r="16" fill="url(#cationAGrad)" stroke="#93c5fd" strokeWidth="2" />
                ))}

                {/* Legend callouts */}
                <g transform="translate(30, 20)">
                  <circle cx="10" cy="10" r="7" fill="url(#cationAGrad)" />
                  <text x="25" y="14" fill="#93c5fd" fontSize="10" fontWeight="bold">Vị trí A: {selectedComposition.aSiteCation.split('(')[0]}</text>

                  <circle cx="10" cy="28" r="7" fill="url(#cationBGrad)" />
                  <text x="25" y="32" fill="#fde047" fontSize="10" fontWeight="bold">Vị trí B (Trung tâm bát diện): {selectedComposition.bSiteCation.split('(')[0]}</text>

                  <circle cx="10" cy="46" r="7" fill="url(#anionXGrad)" />
                  <text x="25" y="50" fill="#c084fc" fontSize="10" fontWeight="bold">Vị trí X (Halogen đỉnh): {selectedComposition.xSiteAnion.split('(')[0]}</text>
                </g>
              </svg>

              <div className="w-full bg-obsidian-card p-3 rounded-lg border border-obsidian-border mt-2 text-xs flex justify-between items-center">
                <span className="text-ivory-muted">Trạng thái pha tinh thể:</span>
                <span className="font-bold text-amber-300">{toleranceCalc.crystalVerdict}</span>
              </div>
            </div>

            {/* Scientific Analysis Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Định Luật Dung Sai Goldschmidt (Tolerance Factor)
                </h4>

                <div className="bg-obsidian-elevated/80 p-3 rounded-lg border border-obsidian-border text-center">
                  <div className="text-[11px] text-ivory-muted font-mono">
                    t = (r_A + r_X) / [√2 · (r_B + r_X)]
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                    t = {toleranceCalc.toleranceFactor}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    Hệ số bát diện (μ = r_B / r_X): {toleranceCalc.octahedralFactor}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Bán kính ion A (r_A):</span>
                    <span className="font-mono font-bold text-blue-300">{selectedComposition.aRadiusAngstrom} Å</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Bán kính cation B (r_B):</span>
                    <span className="font-mono font-bold text-amber-400">{selectedComposition.bRadiusAngstrom} Å</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Bán kính anion Halogen X (r_X):</span>
                    <span className="font-mono font-bold text-purple-300">{selectedComposition.xRadiusAngstrom} Å</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Vùng cấm quang học (Eg):</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedComposition.bandgapEv} eV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Bước sóng cắt hấp thụ (λ_cutoff):</span>
                    <span className="font-mono font-bold text-teal-300">{selectedComposition.absorptionCutoffNm} nm</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Tiêu chuẩn môi trường:</span>
                    <span className={`font-bold ${selectedComposition.isLeadFree ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {selectedComposition.isLeadFree ? 'Không chì (Lead-Free, An toàn sinh thái)' : 'Có chứa ion Pb²⁺ (Cần thu hồi vòng kín)'}
                    </span>
                  </div>
                </div>

                <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                  <span className="font-bold">Đặc tính kỹ thuật: </span>
                  {selectedComposition.phaseStability}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TANDEM 2T POLARIZATION AND IV CURVE */}
      {activeTab === 'TANDEM_2T_POLARIZATION_CURVE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Architecture Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'TANDEM_PEROVSKITE_SILICON_2T', label: 'Cặp Ghép Tandem 2 Cực (Perovskite / Silicon Heterojunction)', icon: Sun },
              { id: 'SINGLE_JUNCTION_PEROVSKITE', label: 'Pin Đơn Lớp Perovskite (Single-Junction)', icon: Sparkles },
              { id: 'SINGLE_JUNCTION_SILICON', label: 'Pin Đơn Lớp Silicon Tinh Thể (c-Si Truyền Thống)', icon: Cpu }
            ].map(arch => (
              <button
                key={arch.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedArchitecture(arch.id as SolarArchitectureType);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedArchitecture === arch.id
                    ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-1 ring-amber-300'
                    : 'bg-obsidian-card border border-obsidian-border text-ivory-muted hover:text-ivory'
                }`}
              >
                <arch.icon className="w-3.5 h-3.5" />
                <span>{arch.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG IV Curve */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Đường Cong Đặc Tuyến I-V Dưới Ánh Sáng Chuẩn 1 Sun (AM1.5G, 100 mW/cm²)
                </h4>
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  PCE: {performance.powerConversionEfficiencyPercent}%
                </div>
              </div>

              <svg viewBox="0 0 540 280" className="w-full max-w-xl h-auto select-none">
                {/* Axis lines */}
                <line x1="50" y1="240" x2="500" y2="240" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Grid */}
                {[50, 100, 150, 200].map(y => (
                  <line key={y} x1="50" y1={y} x2="500" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                ))}

                <text x="275" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Điện Áp Hoạt Động V_cell (Volts)</text>
                <text x="20" y="130" fill="#f59e0b" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">Mật Độ Dòng Quang J (mA/cm²)</text>

                {/* Plot IV curves */}
                {(() => {
                  const maxJ = 46.0; // scale up to ~46 mA/cm²
                  const maxV = 2.2;  // scale up to ~2.2 V (Tandem goes to ~1.99 V)

                  const pathD = ivPoints.map((pt, idx) => {
                    const x = 50 + (pt.voltageVolts / maxV) * 440;
                    const y = 240 - (pt.currentDensityMaPerCm2 / maxJ) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const vocX = 50 + (performance.openCircuitVoltageVocVolts / maxV) * 440;

                  return (
                    <g>
                      <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx={vocX} cy="240" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      <text x={vocX} y="230" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Voc = {performance.openCircuitVoltageVocVolts} V
                      </text>
                    </g>
                  );
                })()}

                {/* Axis ticks */}
                <text x="50" y="255" fill="#64748b" fontSize="9" textAnchor="middle">0 V</text>
                <text x="250" y="255" fill="#64748b" fontSize="9" textAnchor="middle">1.0 V</text>
                <text x="450" y="255" fill="#64748b" fontSize="9" textAnchor="middle">2.0 V</text>
              </svg>

              {/* Sliders for Irradiance & Temperature */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-obsidian-border">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-yellow-300" /> Cường Độ Bức Xạ Mặt Trời:
                    </span>
                    <span className="font-mono font-bold text-amber-300">{irradianceSuns.toFixed(1)} Sun ({(irradianceSuns * 100).toFixed(0)} mW/cm²)</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.1"
                    value={irradianceSuns}
                    onChange={e => setIrradianceSuns(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" /> Nhiệt Độ Tế Bào (Cell Temp):
                    </span>
                    <span className="font-mono font-bold text-orange-300">{temperatureCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    step="5"
                    value={temperatureCelsius}
                    onChange={e => setTemperatureCelsius(parseInt(e.target.value, 10))}
                    className="w-full accent-orange-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Metrics Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Hiệu Suất Quang Điện & Kỷ Lục Thế Giới
                </h4>

                <div className="bg-obsidian-elevated/70 p-3 rounded-lg border border-obsidian-border flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-ivory-muted">Hiệu suất chuyển hóa (PCE)</div>
                    <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">
                      {performance.powerConversionEfficiencyPercent}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-ivory-muted">Giới hạn Shockley-Queisser</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                      {performance.shockleyQueisserLimitPercent}% SQ
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Điện áp mạch hở (Voc):</span>
                    <span className="font-mono font-bold text-emerald-400">{performance.openCircuitVoltageVocVolts} V</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Mật độ dòng ngắn mạch (Jsc):</span>
                    <span className="font-mono font-bold text-amber-400">{performance.shortCircuitCurrentJscMaPerCm2} mA/cm²</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Hệ số lấp đầy (Fill Factor):</span>
                    <span className="font-mono font-bold text-white">{performance.fillFactorPercent}%</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Hệ số suy giảm nhiệt:</span>
                    <span className="font-mono font-bold text-rose-300">{performance.temperatureCoefficientPcePerK}% / °C</span>
                  </div>
                </div>

                {performance.currentMatchingStatus && (
                  <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{performance.currentMatchingStatus}</span>
                  </div>
                )}
              </div>

              {/* Architecture comparison cards */}
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-2 text-xs">
                <div className="font-bold text-ivory">Bảng Đối Chiếu 3 Công Nghệ:</div>
                <div className="flex justify-between p-2 rounded bg-obsidian-elevated/50">
                  <span className="text-ivory-muted">Silicon Heterojunction:</span>
                  <span className="font-mono font-bold text-white">{singleSiliconPerf.powerConversionEfficiencyPercent}% (Voc: 0.74V)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-obsidian-elevated/50">
                  <span className="text-ivory-muted">Perovskite Đơn Lớp:</span>
                  <span className="font-mono font-bold text-amber-300">{singlePerovskitePerf.powerConversionEfficiencyPercent}% (Voc: 1.13V)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-emerald-950/50 border border-emerald-500/40">
                  <span className="font-bold text-emerald-300">Tandem 2-Terminal:</span>
                  <span className="font-mono font-black text-emerald-400">{tandemPerf.powerConversionEfficiencyPercent}% (Voc: 1.99V) 🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ISOS OPERATIONAL STABILITY AND 2D/3D ENCAPSULATION */}
      {activeTab === 'ISOS_OPERATIONAL_STABILITY' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG Chart */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Độ Bền Vận Hành Liên Tục Theo Tiêu Chuẩn Quốc Tế ISOS-L-1 (1000h Chiếu Sáng)
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> 2D/3D Đóng Gói Kỵ Nước
                  </span>
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <span className="w-3 h-0.5 bg-rose-400 inline-block"></span> MAPI Không Thụ Động Hóa
                  </span>
                </div>
              </div>

              <svg viewBox="0 0 540 280" className="w-full max-w-xl h-auto select-none">
                {/* Axis lines */}
                <line x1="50" y1="240" x2="500" y2="240" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Grid */}
                {[0, 300, 600, 900, 1200, 1500].map(h => {
                  const x = 50 + (h / 1500) * 440;
                  return (
                    <g key={h}>
                      <line x1={x} y1="30" x2={x} y2="240" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                      <text x={x} y="255" fill="#64748b" fontSize="9" textAnchor="middle">{h}h</text>
                    </g>
                  );
                })}

                <text x="275" y="272" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Thời Gian Chiếu Sáng Liên Tục 1-Sun (Giờ)</text>
                <text x="20" y="130" fill="#10b981" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">Hiệu Suất PCE (%)</text>

                {/* Plot curves */}
                {(() => {
                  const maxPCE = 30.0;

                  // 1. Passivated (Green)
                  const pathPassivated = stabilityPoints.map((pt, idx) => {
                    const x = 50 + (pt.hoursIllumination / 1500) * 440;
                    const y = 240 - (pt.passivated2d3dEncapsulatedPcePercent / maxPCE) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // 2. Unpassivated (Red)
                  const pathUnpassivated = stabilityPoints.map((pt, idx) => {
                    const x = 50 + (pt.hoursIllumination / 1500) * 440;
                    const y = 240 - (pt.standardUnpassivatedPcePercent / maxPCE) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // 3. Silicon baseline (Blue dashed)
                  const pathSilicon = stabilityPoints.map((pt, idx) => {
                    const x = 50 + (pt.hoursIllumination / 1500) * 440;
                    const y = 240 - (pt.siliconBaselinePcePercent / maxPCE) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <g>
                      <path d={pathSilicon} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                      <path d={pathPassivated} fill="none" stroke="#10b981" strokeWidth="3" />
                      <path d={pathUnpassivated} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Degradation mechanisms analysis */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Cơ Chế Phân Hủy & Giải Pháp 2D/3D
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 space-y-1">
                    <div className="font-bold text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> 1. Thủy phân bởi hơi ẩm (H₂O):
                    </div>
                    <p className="text-ivory-muted text-[11px] leading-relaxed">
                      CH₃NH₃PbI₃ + H₂O ➔ PbI₂ (vàng) + CH₃NH₃I (aq). Hơi nước bẻ gãy liên kết ion giữa MA⁺ và khung bát diện [PbI₆]⁴⁻.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 2. Di cư ion Iodide (Ion Migration):
                    </div>
                    <p className="text-ivory-muted text-[11px] leading-relaxed">
                      Lỗ trống Iodide có năng lượng kích hoạt thấp (Ea ~ 0.58 eV) dễ di cư dưới điện trường, gây hiện tượng trễ I-V (hysteresis).
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                    <div className="font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 3. Lớp thụ động hóa dị thể 2D/3D:
                    </div>
                    <p className="text-ivory-muted text-[11px] leading-relaxed">
                      Phủ lớp mỏng cation hữu cơ kỵ nước cồng kềnh (PEA⁺ / F-PEA⁺) tạo cấu trúc 2D bảo vệ bề mặt, khóa chặt ion và ngăn 100% hơi ẩm xâm nhập.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
