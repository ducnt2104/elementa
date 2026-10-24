// src/components/visualizations/EnzymeKineticsVisualizer.tsx
// Milestone 43: CENTURY MILESTONE (Test Suite 100) — Enzyme Catalysis, Michaelis-Menten Kinetics, Lineweaver-Burk Double Reciprocal & Allosteric Hill Equation Visualizer
// Standards: IUPAC Recommendations on Enzyme Kinetics Symbolism & Vietnam GDPT 2018 (Sinh học 10 & Hóa học 12: Động học xúc tác enzyme)

import React, { useState } from 'react';
import {
  BENCHMARK_ENZYMES,
  EnzymeInhibitionType,
  calculateMichaelisMenten,
  calculateHillCooperativity,
} from '../../domain/enzymeKineticsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Zap,
  TrendingUp,
  Sliders,
  ShieldAlert,
  Info,
  CheckCircle2,
  Atom,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export interface EnzymeKineticsVisualizerProps {
  initialEnzymeId?: string;
}

export const EnzymeKineticsVisualizer: React.FC<EnzymeKineticsVisualizerProps> = ({
  initialEnzymeId,
}) => {
  const [selectedEnzymeId, setSelectedEnzymeId] = useState<string>(initialEnzymeId || 'catalase');
  const [substrateMm, setSubstrateMm] = useState<number>(2.0); // 2.0 mM
  const [inhibitionType, setInhibitionType] = useState<EnzymeInhibitionType>('NONE');
  const [inhibitorUm, setInhibitorUm] = useState<number>(0.0); // 0 uM
  const [activeTab, setActiveTab] = useState<'michaelis_menten' | 'lineweaver_burk' | 'inhibition_modes' | 'allosteric_hill'>('michaelis_menten');
  const [hillCoefficient, setHillCoefficient] = useState<number>(2.8);

  const enzyme = BENCHMARK_ENZYMES[selectedEnzymeId] || BENCHMARK_ENZYMES.catalase;

  // Conversions for calculation:
  // Substrate: mM -> M (x 10^-3)
  // Inhibitor: uM -> M (x 10^-6)
  const substrateM = substrateMm * 1e-3;
  const inhibitorM = inhibitorUm * 1e-6;

  const mmResult = calculateMichaelisMenten(
    selectedEnzymeId,
    substrateM,
    1.0e-7, // 100 nM enzyme
    inhibitorM,
    inhibitionType,
    enzyme.inhibitorKiMolar
  );

  const hillResult = calculateHillCooperativity(
    substrateM,
    hillCoefficient,
    enzyme.kmMolar
  );

  const handleEnzymeChange = (id: string) => {
    setSelectedEnzymeId(id);
    sound.playEnzymeSubstrateLockChime();
  };

  const handleSubstrateChange = (newMm: number) => {
    setSubstrateMm(newMm);
    if (Math.random() < 0.25) {
      sound.playCatalyticBubblesFizz();
    }
  };

  const handleInhibitionChange = (type: EnzymeInhibitionType) => {
    setInhibitionType(type);
    if (type !== 'NONE' && inhibitorUm === 0) {
      setInhibitorUm(10.0); // Default to 10 uM inhibitor when selected
    }
    sound.playEnzymeSubstrateLockChime();
  };

  return (
    <div className="w-full bg-navy/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Century Milestone & GDPT Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Động Học Xúc Tác Enzyme & Mô Hình Michaelis-Menten
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono">
                Sinh 10 & Hóa 12 GDPT
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Động học trạng thái ổn định Briggs-Haldane, Đồ thị nghịch đảo kép Lineweaver-Burk, 3 cơ chế ức chế & Cân bằng dị lập thể Hill.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            Suite 100 • Century Milestone
          </span>
        </div>
      </div>

      {/* 2. Benchmark Enzyme Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          Chọn Enzyme Chuẩn (Brenda / IUPAC Catalog):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.values(BENCHMARK_ENZYMES).map((e) => {
            const isSelected = e.id === selectedEnzymeId;
            return (
              <button
                key={e.id}
                onClick={() => handleEnzymeChange(e.id)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-500/30'
                    : 'bg-navy-dark/40 border-navy-light/40 text-ivory hover:border-emerald-500/40 hover:bg-navy-dark/70'
                }`}
              >
                <div className="text-xs font-bold truncate">{e.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">{e.ecNumber}</div>
                <div className="text-[9px] text-ivory-muted truncate mt-0.5">{e.naturalSubstrateVI}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-3">
        {[
          { id: 'michaelis_menten', label: '1. Đường Cong Bão Hòa Michaelis', icon: Activity },
          { id: 'lineweaver_burk', label: '2. Nghịch Đảo Kép Lineweaver-Burk', icon: TrendingUp },
          { id: 'inhibition_modes', label: '3. Ba Cơ Chế Ức Chế (Ki & Vmax)', icon: ShieldAlert },
          { id: 'allosteric_hill', label: '4. Dị Lập Thể & Phương Trình Hill', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playEnzymeSubstrateLockChime();
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500 text-navy-dark font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-navy-dark/50 text-ivory-muted hover:text-white hover:bg-navy-dark/80 border border-navy-light/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Main Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Graph Canvas / Simulation Display */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            {activeTab === 'michaelis_menten' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-400">Đồ thị v0 theo [S] (Michaelis-Menten Hyperbolic)</span>
                  <span className="font-mono text-ivory-muted">
                    v0 = {mmResult.initialVelocityUmolPerMin.toFixed(1)} μmol/min ({ (mmResult.saturationRatioV0OverVmax * 100).toFixed(1) }% Vmax)
                  </span>
                </div>

                {/* SVG Curve */}
                <div className="relative h-60 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="50" y1="20" x2="50" y2="190" stroke="#334155" strokeWidth="1.5" />
                    <line x1="50" y1="190" x2="480" y2="190" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Vmax asymptote */}
                    <line x1="50" y1="35" x2="480" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="55" y="30" fill="#ef4444" fontSize="10" fontFamily="sans-serif">
                      Vmax = {mmResult.apparentVmaxUmolPerMin.toFixed(1)} μmol/min
                    </text>

                    {/* 1/2 Vmax line */}
                    <line x1="50" y1="112" x2="480" y2="112" stroke="#eab308" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="55" y="108" fill="#eab308" fontSize="10" fontFamily="sans-serif">
                      1/2 Vmax (Km = {(mmResult.apparentKmMolar * 1000).toFixed(2)} mM)
                    </text>

                    {/* Hyperbolic Curve: v0 = (Vmax * S) / (Km + S) */}
                    <path
                      d={(() => {
                        let path = `M 50 190`;
                        const maxS_mM = 10.0;
                        for (let s = 0.1; s <= maxS_mM; s += 0.2) {
                          const sM = s * 1e-3;
                          const v = (mmResult.apparentVmaxUmolPerMin * sM) / (mmResult.apparentKmMolar + sM);
                          const x = 50 + (s / maxS_mM) * 420;
                          const y = 190 - (v / (mmResult.apparentVmaxUmolPerMin * 1.15)) * 160;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />

                    {/* Current operating point */}
                    {(() => {
                      const maxS_mM = 10.0;
                      const sClamp = Math.min(maxS_mM, substrateMm);
                      const currentX = 50 + (sClamp / maxS_mM) * 420;
                      const currentY = 190 - (mmResult.initialVelocityUmolPerMin / (mmResult.apparentVmaxUmolPerMin * 1.15)) * 160;
                      return (
                        <g>
                          <line x1={currentX} y1="190" x2={currentX} y2={currentY} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                          <circle cx={currentX} cy={currentY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          <text x={currentX + 8} y={currentY - 6} fill="#38bdf8" fontSize="11" fontWeight="bold">
                            ({substrateMm.toFixed(1)} mM, {mmResult.initialVelocityUmolPerMin.toFixed(1)})
                          </text>
                        </g>
                      );
                    })()}

                    {/* Axis Labels */}
                    <text x="440" y="205" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">[S] (mM)</text>
                    <text x="15" y="30" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">v0</text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'lineweaver_burk' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-blue-400">Đồ thị Nghịch Đảo Kép Lineweaver-Burk (1/v0 theo 1/[S])</span>
                  <span className="font-mono text-ivory-muted">Độ dốc = Km/Vmax = {mmResult.lineweaverBurkSlope.toExponential(2)}</span>
                </div>

                <div className="relative h-60 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                    {/* Origin is shifted right to show negative x-axis (-1/Km) */}
                    <line x1="160" y1="20" x2="160" y2="190" stroke="#334155" strokeWidth="1.5" />
                    <line x1="30" y1="160" x2="480" y2="160" stroke="#334155" strokeWidth="1.5" />

                    {/* Linear line connecting -1/Km to y-intercept 1/Vmax and beyond */}
                    <line x1="60" y1="185" x2="440" y2="40" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Y-intercept: 1/Vmax */}
                    <circle cx="160" cy="140" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    <text x="170" y="136" fill="#ef4444" fontSize="10" fontWeight="bold">
                      Trục tung = 1/Vmax ({mmResult.lineweaverBurkYIntercept.toExponential(2)})
                    </text>

                    {/* X-intercept: -1/Km */}
                    <circle cx="110" cy="160" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                    <text x="50" y="152" fill="#10b981" fontSize="10" fontWeight="bold">
                      Trục hoành = -1/Km ({mmResult.lineweaverBurkXIntercept.toFixed(1)})
                    </text>

                    {/* Operating point (1/[S], 1/v0) */}
                    <circle cx="260" cy="100" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="270" y="96" fill="#f59e0b" fontSize="10" fontWeight="bold">
                      Điểm làm việc (1/[S], 1/v0)
                    </text>

                    {/* Axis Labels */}
                    <text x="430" y="175" fill="#94a3b8" fontSize="10">1/[S] (M⁻¹)</text>
                    <text x="165" y="32" fill="#94a3b8" fontSize="10">1/v0</text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'inhibition_modes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-400">So Sánh 3 Cơ Chế Ức Chế Reversible Enzyme</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Chế độ: {inhibitionType}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3 rounded-xl border ${inhibitionType === 'COMPETITIVE' ? 'bg-amber-500/20 border-amber-400' : 'bg-navy/40 border-navy-light/40'}`}>
                    <div className="text-xs font-bold text-amber-300">1. Cạnh Tranh (Competitive)</div>
                    <div className="text-[10px] text-ivory-muted mt-1">Tranh chấp trung tâm hoạt động</div>
                    <div className="mt-2 text-xs space-y-1">
                      <div className="text-emerald-400 font-mono">Km biểu kiến: ↑ TĂNG</div>
                      <div className="text-blue-400 font-mono">Vmax biểu kiến: ↔ KHÔNG ĐỔI</div>
                      <div className="text-[10px] text-ivory-muted">Cắt nhau tại trục tung 1/Vmax</div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border ${inhibitionType === 'UNCOMPETITIVE' ? 'bg-purple-500/20 border-purple-400' : 'bg-navy/40 border-navy-light/40'}`}>
                    <div className="text-xs font-bold text-purple-300">2. Phi Cạnh Tranh (Uncompetitive)</div>
                    <div className="text-[10px] text-ivory-muted mt-1">Chỉ gắn vào phức hợp [ES]</div>
                    <div className="mt-2 text-xs space-y-1">
                      <div className="text-purple-400 font-mono">Km biểu kiến: ↓ GIẢM</div>
                      <div className="text-purple-400 font-mono">Vmax biểu kiến: ↓ GIẢM</div>
                      <div className="text-[10px] text-ivory-muted">Các đường thẳng song song</div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border ${inhibitionType === 'NON_COMPETITIVE' ? 'bg-rose-500/20 border-rose-400' : 'bg-navy/40 border-navy-light/40'}`}>
                    <div className="text-xs font-bold text-rose-300">3. Không Cạnh Tranh (Non-competitive)</div>
                    <div className="text-[10px] text-ivory-muted mt-1">Gắn vị trí dị lập thể (allosteric)</div>
                    <div className="mt-2 text-xs space-y-1">
                      <div className="text-blue-400 font-mono">Km biểu kiến: ↔ KHÔNG ĐỔI</div>
                      <div className="text-rose-400 font-mono">Vmax biểu kiến: ↓ GIẢM</div>
                      <div className="text-[10px] text-ivory-muted">Cắt nhau tại trục hoành -1/Km</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 text-xs text-ivory-muted">
                  <span className="font-semibold text-white">Chất ức chế tự nhiên/dược lý: </span>
                  {enzyme.typicalInhibitorVI} (Ki = {(enzyme.inhibitorKiMolar * 1e6).toFixed(2)} μM).
                </div>
              </div>
            )}

            {activeTab === 'allosteric_hill' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-400">Hiệu Ứng Hợp Tác Dị Lập Thể (Hill Equation)</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    Hệ số Hill h = {hillCoefficient.toFixed(1)} ({hillResult.cooperativityType})
                  </span>
                </div>

                <div className="relative h-60 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                    <line x1="50" y1="20" x2="50" y2="190" stroke="#334155" strokeWidth="1.5" />
                    <line x1="50" y1="190" x2="480" y2="190" stroke="#334155" strokeWidth="1.5" />

                    {/* Hyperbolic Reference Line (h = 1.0) */}
                    <path
                      d={(() => {
                        let path = `M 50 190`;
                        const maxS_mM = 10.0;
                        const k05 = 2.0;
                        for (let s = 0.1; s <= maxS_mM; s += 0.2) {
                          const vFrac = s / (k05 + s);
                          const x = 50 + (s / maxS_mM) * 420;
                          const y = 190 - vFrac * 160;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Hill Sigmoidal Curve */}
                    <path
                      d={(() => {
                        let path = `M 50 190`;
                        const maxS_mM = 10.0;
                        const k05 = 2.0;
                        const h = hillCoefficient;
                        for (let s = 0.05; s <= maxS_mM; s += 0.15) {
                          const sPow = Math.pow(s, h);
                          const kPow = Math.pow(k05, h);
                          const vFrac = sPow / (kPow + sPow);
                          const x = 50 + (s / maxS_mM) * 420;
                          const y = 190 - vFrac * 160;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2.5"
                    />

                    {/* Legend */}
                    <text x="280" y="70" fill="#a855f7" fontSize="10" fontWeight="bold">
                      Đường cong Hill h = {hillCoefficient.toFixed(1)} (Sigmoidal chữ S)
                    </text>
                    <text x="280" y="90" fill="#94a3b8" fontSize="10">
                      Chuẩn Hyperbolic h = 1.0 (Không hợp tác)
                    </text>

                    <text x="440" y="205" fill="#94a3b8" fontSize="10">[S]</text>
                    <text x="15" y="30" fill="#94a3b8" fontSize="10">% Vmax</text>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Commentary Banner */}
          <div className="bg-navy-dark/60 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed text-ivory-light">
              <span className="font-semibold text-emerald-300">Nhận định sư phạm GDPT 2018: </span>
              {activeTab === 'allosteric_hill' ? hillResult.pedagogicalInsightVI : mmResult.pedagogicalAnalysisVI}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Real-Time Quantitative Readouts */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-navy-light/40 pb-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Thông Số Động Học Thời Gian Thực
            </h3>

            {/* Slider 1: Substrate Concentration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nồng độ cơ chất [S]:</span>
                <span className="font-mono text-emerald-400 font-bold">{substrateMm.toFixed(2)} mM</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="10.0"
                step="0.05"
                value={substrateMm}
                onChange={(e) => handleSubstrateChange(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Inhibition Controls */}
            <div className="space-y-2 pt-2 border-t border-navy-light/30">
              <label className="text-xs font-semibold text-ivory-muted">Kiểu ức chế (Inhibition Type):</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['NONE', 'COMPETITIVE', 'UNCOMPETITIVE', 'NON_COMPETITIVE'] as EnzymeInhibitionType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInhibitionChange(type)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border truncate transition-all ${
                      inhibitionType === type
                        ? 'bg-emerald-500/30 border-emerald-400 text-white'
                        : 'bg-navy/40 border-navy-light/40 text-ivory-muted hover:text-white'
                    }`}
                  >
                    {type === 'NONE' ? 'Không ức chế' : type}
                  </button>
                ))}
              </div>

              {inhibitionType !== 'NONE' && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-ivory-muted">Nồng độ chất ức chế [I]:</span>
                    <span className="font-mono text-amber-400 font-bold">{inhibitorUm.toFixed(1)} μM</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={inhibitorUm}
                    onChange={(e) => setInhibitorUm(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Hill Coefficient Slider (when in allosteric tab) */}
            {activeTab === 'allosteric_hill' && (
              <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Hệ số Hill (h):</span>
                  <span className="font-mono text-purple-400 font-bold">{hillCoefficient.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={hillCoefficient}
                  onChange={(e) => setHillCoefficient(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            )}

            {/* Quantitative Kinetic Summary Cards */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-light/30 text-xs">
              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Hằng số Km (Apparent)</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {(mmResult.apparentKmMolar * 1000).toFixed(3)} mM
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Tốc độ cực đại Vmax</div>
                <div className="text-sm font-bold text-white font-mono">
                  {mmResult.apparentVmaxUmolPerMin.toFixed(1)}
                  <span className="text-[9px] text-ivory-muted ml-0.5">μmol/min</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Hằng số chu chuyển kcat</div>
                <div className="text-sm font-bold text-blue-400 font-mono">
                  {enzyme.kcatPerSec.toExponential(1)} s⁻¹
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Hiệu suất kcat/Km</div>
                <div className="text-sm font-bold text-amber-400 font-mono">
                  {enzyme.specificityConstantMInvSInv.toExponential(1)}
                </div>
              </div>
            </div>

            {/* Catalytic Perfection Badge */}
            {enzyme.isNearDiffusionLimit && (
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center gap-2 text-emerald-300 text-[11px]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Enzyme đạt độ hoàn hảo xúc tác (Catalytic Perfection, kcat/Km &gt; 10⁷ M⁻¹·s⁻¹).</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
