import React, { useState, useMemo, useCallback } from 'react';
import {
  SM_FRET_BENCHMARK_STANDARDS,
  SmFretStandard,
  simulateSmFretAlexSystem,
  calculateSmFretDistanceNm,
  calculateSmFretEfficiency,
  calculateCorrectedSmFretAlexValues
} from '../../domain/smFretEngine';
import { sound } from '../../audio/soundEngine';
import { Activity, Zap, Play, RotateCcw, Info, Sparkles, Filter, Eye } from 'lucide-react';

interface SmFretVisualizerProps {
  initialStandardId?: string;
  onSelectStandard?: (standardId: string) => void;
}

export const SmFretVisualizer: React.FC<SmFretVisualizerProps> = ({
  initialStandardId = 'HOLLIDAY_JUNCTION',
  onSelectStandard
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialStandardId);
  const [activeTab, setActiveTab] = useState<'ES_DIAGRAM' | 'TIME_TRAJECTORY' | 'DISTANCES'>('ES_DIAGRAM');
  const [filterDonorOnly, setFilterDonorOnly] = useState<boolean>(true);
  const [filterAcceptorOnly, setFilterAcceptorOnly] = useState<boolean>(true);
  const [hoveredBurstId, setHoveredBurstId] = useState<number | null>(null);

  const currentStandard: SmFretStandard = useMemo(() => {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === selectedId) || SM_FRET_BENCHMARK_STANDARDS[0];
  }, [selectedId]);

  const simulation = useMemo(() => {
    return simulateSmFretAlexSystem(currentStandard);
  }, [currentStandard]);

  const handleSelectStandard = useCallback((id: string) => {
    setSelectedId(id);
    sound.playSmFretLaserAlternationClick();
    if (onSelectStandard) onSelectStandard(id);
  }, [onSelectStandard]);

  const handleBurstClick = useCallback(() => {
    sound.playFretBurstChime();
  }, []);

  // Filter bursts according to user toggles
  const visibleBursts = useMemo(() => {
    return simulation.bursts.filter(b => {
      if (!filterDonorOnly && b.subpopulation === 'DONOR_ONLY') return false;
      if (!filterAcceptorOnly && b.subpopulation === 'ACCEPTOR_ONLY') return false;
      return true;
    });
  }, [simulation.bursts, filterDonorOnly, filterAcceptorOnly]);

  const state1 = currentStandard.states[0];
  const state2 = currentStandard.states[1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-2xl flex flex-col gap-6">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Single-Molecule Biophysics
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              ALEX / PIE
            </span>
            <span className="text-xs text-slate-400">Section 79 Codex</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1 flex items-center gap-2">
            <span>smFRET & Alternating-Laser Excitation (ALEX)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Phân tích huỳnh quang truyền năng lượng cộng hưởng đơn phân tử kết hợp kích thích laser xen kẽ xanh/đỏ (ALEX).
            Tách biệt hoàn toàn phân tử Donor-only, Acceptor-only và đo trực tiếp chuyển động tái cấu trúc phân tử theo thời gian thực (độ phân giải 1 Å).
          </p>
        </div>

        {/* View Tab Selector */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => { setActiveTab('ES_DIAGRAM'); sound.playSmFretLaserAlternationClick(); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'ES_DIAGRAM'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2D E-S Histogram
          </button>
          <button
            onClick={() => { setActiveTab('TIME_TRAJECTORY'); sound.playSmFretLaserAlternationClick(); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'TIME_TRAJECTORY'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Real-Time smTrajectory
          </button>
          <button
            onClick={() => { setActiveTab('DISTANCES'); sound.playSmFretLaserAlternationClick(); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'DISTANCES'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Förster Ruler
          </button>
        </div>
      </div>

      {/* Benchmark Standard Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {SM_FRET_BENCHMARK_STANDARDS.map(std => {
          const isSelected = std.id === selectedId;
          return (
            <button
              key={std.id}
              onClick={() => handleSelectStandard(std.id)}
              className={`px-3 py-2 rounded-lg text-left text-xs transition border flex flex-col gap-0.5 ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-white">{std.name}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{std.vietnameseName}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Visualizer Screen */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 relative">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              {activeTab === 'ES_DIAGRAM' && 'Giản đồ 2D ALEX E-S (Stoichiometry vs FRET Efficiency)'}
              {activeTab === 'TIME_TRAJECTORY' && 'Vết thời gian Photon Đơn Phân tử & Mô hình Markov (HMM)'}
              {activeTab === 'DISTANCES' && 'Thước đo Nanomet Förster R₀ và Động học Chuyển dịch'}
            </span>
            {activeTab === 'ES_DIAGRAM' && (
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer text-[11px] text-emerald-400">
                  <input
                    type="checkbox"
                    checked={filterDonorOnly}
                    onChange={(e) => setFilterDonorOnly(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Donor-only (S~1)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-[11px] text-rose-400">
                  <input
                    type="checkbox"
                    checked={filterAcceptorOnly}
                    onChange={(e) => setFilterAcceptorOnly(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span>Acceptor-only (S~0)</span>
                </label>
              </div>
            )}
          </div>

          {/* TAB 1: 2D E-S Burst Diagram */}
          {activeTab === 'ES_DIAGRAM' && (
            <div className="relative w-full h-[340px] bg-slate-950/90 rounded-lg overflow-hidden border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 500 340">
                {/* Background grid */}
                <defs>
                  <pattern id="esGrid" width="50" height="34" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 34" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="500" height="340" fill="url(#esGrid)" />

                {/* Subpopulation bounding zones */}
                {/* 1. Donor-only zone: S in [0.85, 1.0], E in [0, 0.2] */}
                <rect x="50" y="20" width="80" height="45" fill="#22c55e" fillOpacity="0.08" stroke="#22c55e" strokeWidth="0.6" strokeDasharray="3 3" rx="4" />
                <text x="55" y="35" fill="#4ade80" fontSize="9" fontWeight="bold">Donor-only (D-only)</text>
                <text x="55" y="48" fill="#86efac" fontSize="8">S ≈ 1.0, E ≈ 0.0</text>

                {/* 2. Acceptor-only zone: S in [0.0, 0.15], E in [0, 0.2] */}
                <rect x="50" y="260" width="80" height="45" fill="#f43f5e" fillOpacity="0.08" stroke="#f43f5e" strokeWidth="0.6" strokeDasharray="3 3" rx="4" />
                <text x="55" y="275" fill="#fb7185" fontSize="9" fontWeight="bold">Acceptor-only (A-only)</text>
                <text x="55" y="288" fill="#fda4af" fontSize="8">S ≈ 0.0, Direct laser red</text>

                {/* 3. 1D:1A Dual-labeled Active Zone (S in [0.35, 0.65]) */}
                <rect x="50" y="110" width="410" height="85" fill="#0284c7" fillOpacity="0.06" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 4" rx="6" />
                <text x="55" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  Phân tử Hoạt tính 1D:1A (FRET Active Complex, S ≈ 0.5)
                </text>

                {/* Axis lines */}
                {/* X-axis (E: 0 -> 1.0) */}
                <line x1="50" y1="305" x2="460" y2="305" stroke="#64748b" strokeWidth="1.2" />
                <text x="255" y="332" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                  FRET Efficiency E = F_DA / (F_DA + γ · I_DD)
                </text>
                {/* Y-axis (S: 0 -> 1.0) */}
                <line x1="50" y1="20" x2="50" y2="305" stroke="#64748b" strokeWidth="1.2" />
                <text x="18" y="160" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold" transform="rotate(-90 18 160)">
                  Stoichiometry Ratio S
                </text>

                {/* Axis ticks */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(val => {
                  const x = 50 + val * 410;
                  const y = 305 - val * 285;
                  return (
                    <g key={val}>
                      {/* X tick */}
                      <line x1={x} y1="305" x2={x} y2="310" stroke="#94a3b8" />
                      <text x={x} y="322" fill="#94a3b8" fontSize="9" textAnchor="middle">{val.toFixed(1)}</text>
                      {/* Y tick */}
                      <line x1="45" y1={y} x2="50" y2={y} stroke="#94a3b8" />
                      <text x="40" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val.toFixed(1)}</text>
                    </g>
                  );
                })}

                {/* Render Bursts */}
                {visibleBursts.map(b => {
                  const cx = 50 + b.fretEfficiency * 410;
                  const cy = 305 - b.stoichiometry * 285;
                  let color = '#38bdf8';
                  if (b.subpopulation === 'DONOR_ONLY') color = '#22c55e';
                  else if (b.subpopulation === 'ACCEPTOR_ONLY') color = '#f43f5e';
                  else if (b.subpopulation === 'DUAL_LABELED_STATE_2') color = '#a855f7';

                  const isHovered = hoveredBurstId === b.id;
                  const r = isHovered ? 6 : Math.max(2.5, Math.min(5.5, b.totalPhotons / 60));

                  return (
                    <circle
                      key={b.id}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={color}
                      fillOpacity={isHovered ? 1.0 : 0.75}
                      stroke={isHovered ? '#ffffff' : color}
                      strokeWidth={isHovered ? 2 : 0.5}
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredBurstId(b.id)}
                      onMouseLeave={() => setHoveredBurstId(null)}
                      onClick={handleBurstClick}
                    />
                  );
                })}

                {/* Hover info label */}
                {hoveredBurstId && (
                  <g>
                    {(() => {
                      const b = simulation.bursts.find(item => item.id === hoveredBurstId);
                      if (!b) return null;
                      const bx = Math.min(380, Math.max(60, 50 + b.fretEfficiency * 410 + 10));
                      const by = Math.max(30, 305 - b.stoichiometry * 285 - 20);
                      return (
                        <g>
                          <rect x={bx} y={by} width="110" height="42" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="4" />
                          <text x={bx + 6} y={by + 14} fill="#e2e8f0" fontSize="9" fontWeight="bold">
                            Burst #{b.id} ({b.totalPhotons} photons)
                          </text>
                          <text x={bx + 6} y={by + 26} fill="#38bdf8" fontSize="8">
                            E: {b.fretEfficiency.toFixed(2)} | S: {b.stoichiometry.toFixed(2)}
                          </text>
                          <text x={bx + 6} y={by + 37} fill="#a855f7" fontSize="7.5">
                            {b.subpopulation.replace('_', ' ')}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* TAB 2: Time-Resolved smTrajectory & HMM fit */}
          {activeTab === 'TIME_TRAJECTORY' && (
            <div className="relative w-full h-[340px] bg-slate-950/90 rounded-lg overflow-hidden border border-slate-800 p-2 flex flex-col justify-between">
              {/* Upper Trace: Anti-correlated Intensities I_D and I_A */}
              <div className="h-[155px] w-full relative">
                <div className="absolute top-1 left-2 text-[10px] font-semibold text-slate-300 flex items-center gap-3 z-10 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    Donor I_D (Cy3)
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
                    Acceptor I_A (Cy5)
                  </span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 480 150">
                  {/* Grid */}
                  <line x1="30" y1="20" x2="470" y2="20" stroke="#1e293b" />
                  <line x1="30" y1="70" x2="470" y2="70" stroke="#1e293b" />
                  <line x1="30" y1="120" x2="470" y2="120" stroke="#1e293b" />
                  <line x1="30" y1="140" x2="470" y2="140" stroke="#475569" strokeWidth="1" />
                  <line x1="30" y1="10" x2="30" y2="140" stroke="#475569" strokeWidth="1" />

                  {/* Donor polyline */}
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    points={simulation.trajectory.map((p, idx) => {
                      const x = 30 + (idx / (simulation.trajectory.length - 1)) * 440;
                      const y = 140 - (p.donorIntensityCounts / 140) * 125;
                      return `${x},${y}`;
                    }).join(' ')}
                  />

                  {/* Acceptor polyline */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    points={simulation.trajectory.map((p, idx) => {
                      const x = 30 + (idx / (simulation.trajectory.length - 1)) * 440;
                      const y = 140 - (p.acceptorIntensityCounts / 140) * 125;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                </svg>
              </div>

              {/* Lower Trace: Apparent FRET Efficiency & HMM Step Fit */}
              <div className="h-[155px] w-full relative">
                <div className="absolute top-1 left-2 text-[10px] font-semibold text-slate-300 flex items-center gap-3 z-10 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                    FRET E_app = I_A / (I_D + I_A)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2 h-2 rounded-sm bg-amber-400 inline-block"></span>
                    2-State HMM Step Fit
                  </span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 480 150">
                  <line x1="30" y1="140" x2="470" y2="140" stroke="#475569" strokeWidth="1" />
                  <line x1="30" y1="10" x2="30" y2="140" stroke="#475569" strokeWidth="1" />

                  {/* Reference dashed lines for state 1 and state 2 */}
                  <line
                    x1="30"
                    y1={140 - state1.fretEfficiency * 120}
                    x2="470"
                    y2={140 - state1.fretEfficiency * 120}
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="30"
                    y1={140 - state2.fretEfficiency * 120}
                    x2="470"
                    y2={140 - state2.fretEfficiency * 120}
                    stroke="#a855f7"
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                  />

                  {/* Real-time FRET trace */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    points={simulation.trajectory.map((p, idx) => {
                      const x = 30 + (idx / (simulation.trajectory.length - 1)) * 440;
                      const y = 140 - p.apparentFretEfficiency * 120;
                      return `${x},${y}`;
                    }).join(' ')}
                  />

                  {/* Idealized HMM step function */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.0"
                    points={simulation.trajectory.map((p, idx) => {
                      const x = 30 + (idx / (simulation.trajectory.length - 1)) * 440;
                      const nominal = p.idealHMMStateIndex === 0 ? state1.fretEfficiency : state2.fretEfficiency;
                      const y = 140 - nominal * 120;
                      return `${x},${y}`;
                    }).join(' ')}
                  />

                  {/* Time labels */}
                  <text x="30" y="148" fill="#94a3b8" fontSize="8">0.0s</text>
                  <text x="250" y="148" fill="#94a3b8" fontSize="8">4.0s</text>
                  <text x="450" y="148" fill="#94a3b8" fontSize="8">8.0s</text>
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: Förster Distance & Nanometer Ruler */}
          {activeTab === 'DISTANCES' && (
            <div className="relative w-full h-[340px] bg-slate-950/90 rounded-lg p-5 flex flex-col justify-between border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Mô hình Thước đo Phân tử Förster (Förster Nanometer Ruler)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hiệu suất truyền năng lượng FRET thay đổi nghịch đảo theo lũy thừa 6 của khoảng cách r:
                  <span className="text-purple-300 font-mono font-semibold ml-1">E = 1 / [1 + (r / R₀)⁶]</span>.
                  Bán kính Förster của hệ là <span className="text-white font-mono font-semibold">{currentStandard.forsterRadiusR0Nm} nm</span>.
                </p>
              </div>

              {/* Visual Distance Slider Bar */}
              <div className="flex flex-col gap-4 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                {/* State 1 Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-cyan-400">{state1.vietnameseName}</span>
                    <span className="font-mono text-slate-300">
                      r₁ = <strong className="text-cyan-400">{state1.intermolecularDistanceNm} nm</strong> (E₁ = {(state1.fretEfficiency * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (state1.intermolecularDistanceNm / 10.0) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* State 2 Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-purple-400">{state2.vietnameseName}</span>
                    <span className="font-mono text-slate-300">
                      r₂ = <strong className="text-purple-400">{state2.intermolecularDistanceNm} nm</strong> (E₂ = {(state2.fretEfficiency * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (state2.intermolecularDistanceNm / 10.0) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Distance Difference Delta r */}
              <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-lg flex justify-between items-center text-xs">
                <div>
                  <span className="text-purple-300 font-semibold">Độ dịch chuyển không gian Δr:</span>
                  <div className="text-[11px] text-slate-400">Chênh lệch giữa 2 cấu hình trong dung dịch</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-purple-200">
                    {Math.abs(state2.intermolecularDistanceNm - state1.intermolecularDistanceNm).toFixed(2)} nm
                  </span>
                  <div className="text-[10px] text-purple-400">
                    ({(Math.abs(state2.intermolecularDistanceNm - state1.intermolecularDistanceNm) * 10).toFixed(1)} Ångström)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Biophysical & Kinetic Dashboard */}
        <div className="flex flex-col gap-4">
          {/* Card: Current System Properties */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Thông số Vật lý Quang phổ
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Cặp Thuốc nhuộm:</span>
                <div className="font-semibold text-emerald-300 mt-0.5 truncate">
                  {currentStandard.donorDye} / {currentStandard.acceptorDye}
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Bán kính Förster R₀:</span>
                <div className="font-semibold text-cyan-300 mt-0.5 font-mono">
                  {currentStandard.forsterRadiusR0Nm} nm
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Laser Xanh / Đỏ:</span>
                <div className="font-semibold text-slate-200 mt-0.5 font-mono">
                  {currentStandard.laserDonorWavelengthNm} / {currentStandard.laserAcceptorWavelengthNm} nm
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Hệ số Hiệu chỉnh γ:</span>
                <div className="font-semibold text-slate-200 mt-0.5 font-mono">
                  {currentStandard.gammaFactor.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Card: Kinetic & Thermodynamic Rates */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Động học & Nhiệt động học Markov
            </h3>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Tốc độ thuận k₁₂:</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {simulation.forwardRateConstantK12} s⁻¹
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Tốc độ nghịch k₂₁:</span>
                <span className="font-mono font-semibold text-rose-400">
                  {simulation.reverseRateConstantK21} s⁻¹
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Hằng số cân bằng K_eq:</span>
                <span className="font-mono font-bold text-cyan-300">
                  {simulation.equilibriumConstantKeq}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400">Năng lượng Gibbs ΔG°:</span>
                <span className="font-mono font-bold text-amber-300">
                  {simulation.deltaGStandardKiloJoulesPerMole} kJ/mol
                </span>
              </div>
            </div>
          </div>

          {/* Card: Literature Citation & Curriculum */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-[11px]">
              <Info className="w-3.5 h-3.5" />
              <span>Chuẩn Khoa học Quốc tế & GDPT 2018</span>
            </div>
            <p className="text-[11px] text-slate-400 italic leading-snug">
              {currentStandard.citation}
            </p>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10.5px] text-slate-300">
              {currentStandard.curriculumNotes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
