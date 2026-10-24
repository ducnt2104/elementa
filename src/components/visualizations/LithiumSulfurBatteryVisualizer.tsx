// src/components/visualizations/LithiumSulfurBatteryVisualizer.tsx
// Interactive Visualizer: Lithium-Sulfur (Li-S) Batteries, Polysulfide Shuttle Effect & 2D MXene Separators
// Standards: IUPAC Electrochemistry, High-Energy Density Targets (> 500 Wh/kg) & Vietnam GDPT 2018 (Hóa 10 & 12: Đơn chất S8 & Pin năng lượng cao)

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
  Snowflake,
  Sun,
  Box,
  Truck,
  Atom,
  Cpu,
  ArrowRight,
  RefreshCw,
  Flame,
  ShieldAlert
} from 'lucide-react';
import {
  LIS_MULTISTEP_PATHWAY,
  LIS_BARRIER_STRATEGIES_CATALOG,
  getLiSBarrierStrategies,
  generateLiSDischargeCurve,
  simulateLiSCellPerformance,
  PolysulfideMitigationStrategy,
  LiSBarrierStrategySpec
} from '../../domain/lithiumSulfurBatteryEngine';
import { sound } from '../../audio/soundEngine';

type LiSTabMode = 'SHUTTLE_EFFECT_MECHANISM' | 'MULTISTEP_DISCHARGE_PLATEAUS' | 'BARRIER_COMPARISON_500WHKG';

export const LithiumSulfurBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LiSTabMode>('SHUTTLE_EFFECT_MECHANISM');

  // Barrier Strategy Selection
  const [selectedStrategyId, setSelectedStrategyId] = useState<PolysulfideMitigationStrategy>('MXENE_TI3C2_INTERLAYER');

  // Sulfur mass slider
  const [sulfurMassGrams, setSulfurMassGrams] = useState<number>(2.5);

  const selectedStrategy = useMemo(() => {
    return LIS_BARRIER_STRATEGIES_CATALOG.find(s => s.id === selectedStrategyId) || LIS_BARRIER_STRATEGIES_CATALOG[1];
  }, [selectedStrategyId]);

  // Simulation calculation
  const simResult = useMemo(() => {
    return simulateLiSCellPerformance(selectedStrategyId, sulfurMassGrams);
  }, [selectedStrategyId, sulfurMassGrams]);

  // Discharge curve data
  const dischargeCurve = useMemo(() => {
    return generateLiSDischargeCurve();
  }, []);

  return (
    <div className="bg-obsidian/90 border border-yellow-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-yellow-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-inner">
              <Flame className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400">
                PIN LITHI - LƯU HUỲNH (Li-S), HIỆU ỨNG CON THOI & MÀNG NANO 2D MXENE
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Dung lượng lý thuyết 1675 mAh/g • Cơ chế chuyển hóa 2 thềm điện thế • Lớp chặn hóa hấp phụ MXene Ti₃C₂Tₓ & MOF vượt ngưỡng 500 Wh/kg
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-yellow-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SHUTTLE_EFFECT_MECHANISM');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'SHUTTLE_EFFECT_MECHANISM'
                ? 'bg-yellow-500 text-obsidian shadow-lg font-black ring-1 ring-yellow-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Cơ Chế Con Thoi (Shuttle)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('MULTISTEP_DISCHARGE_PLATEAUS');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'MULTISTEP_DISCHARGE_PLATEAUS'
                ? 'bg-amber-500 text-obsidian shadow-lg font-black ring-1 ring-amber-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Hai Thềm Điện Thế Phóng Điện</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('BARRIER_COMPARISON_500WHKG');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'BARRIER_COMPARISON_500WHKG'
                ? 'bg-orange-500 text-obsidian shadow-lg font-black ring-1 ring-orange-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Lớp Chặn & Ngưỡng 500 Wh/kg</span>
          </button>
        </div>
      </div>

      {/* MODE 1: POLYSULFIDE SHUTTLE EFFECT & MXENE INTERLAYER VISUALIZATION */}
      {activeTab === 'SHUTTLE_EFFECT_MECHANISM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Strategy Selection List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Công Nghệ Màng Ngăn & Lớp Chắn (Separator)
            </h3>
            <div className="space-y-2">
              {LIS_BARRIER_STRATEGIES_CATALOG.map((strat) => (
                <button
                  key={strat.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedStrategyId(strat.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedStrategyId === strat.id
                      ? 'bg-yellow-500/20 border-yellow-400/80 shadow-md ring-1 ring-yellow-400/50'
                      : 'bg-obsidian-light/40 border-white/5 hover:border-yellow-500/30 hover:bg-yellow-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-ivory">{strat.nameVi}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      strat.cellEnergyDensityWhKg >= 500
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {strat.cellEnergyDensityWhKg} Wh/kg
                    </span>
                  </div>
                  <p className="text-xs text-ivory-muted">{strat.interlayerMaterialVi}</p>
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-2 text-ivory/80 pt-2 border-t border-white/5">
                    <div>
                      Chặn con thoi: <span className="font-mono text-emerald-300 font-bold">{strat.polysulfideShuttleCurrentReductionPercent}%</span>
                    </div>
                    <div>
                      Giữ pin 500 chu kỳ: <span className="font-mono text-cyan-300 font-bold">{strat.capacityRetentionAt500CyclesPercent}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Shuttle Explanation */}
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Nguy Hại Của Hiệu Ứng Con Thoi (Shuttle Effect)
              </span>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Các chuỗi lithium polysulfide dài (Li₂S₈, Li₂S₆, Li₂S₄) hòa tan trong dung môi ether và khuếch tán xuyên màng sang cực âm Lithi, bị khử trực tiếp thành Li₂S rắn cách điện phủ kín cực Lithi và ăn mòn vĩnh viễn lượng lưu huỳnh có ích, khiến pin chai nhanh chỉ sau vài chục chu kỳ.
              </p>
            </div>
          </div>

          {/* Interactive SVG Diagram of Li-S Cross-Section with MXene Interlayer */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-yellow-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-yellow-300 flex items-center gap-2">
                    <Atom className="w-4 h-4 text-yellow-400" />
                    <span>Mô Hình Bẫy Hóa Học & Tái Kích Hoạt Polysunfua: {selectedStrategy.nameVi}</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Cực dương S₈ (Lưu huỳnh) • Cực âm Li kim loại • Màng chặn ngăn con thoi
                  </p>
                </div>
              </div>

              {/* Animated SVG Visualization */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[320px]">
                <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[320px]">
                  {/* Left: Lithium Metal Anode */}
                  <rect x="20" y="20" width="70" height="280" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                  <text x="55" y="160" fill="#f8fafc" fontSize="11" fontWeight="bold" transform="rotate(-90 55 160)" textAnchor="middle">
                    LITHI KIM LOẠI (ANODE -)
                  </text>

                  {/* Anode Interface / SEI Layer */}
                  <rect x="90" y="20" width="15" height="280" fill="#475569" opacity="0.6" />

                  {/* Center: Electrolyte + Separator with Interlayer */}
                  <rect x="105" y="20" width="310" height="280" fill="#0f172a" rx="4" />
                  <text x="260" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    DUNG DỊCH ĐIỆN GIẢI ETHER (DOL / DME)
                  </text>

                  {/* Separator / Interlayer barrier */}
                  {selectedStrategy.id === 'CONVENTIONAL_CELGARD' && (
                    <g>
                      <rect x="250" y="20" width="20" height="280" fill="#334155" stroke="#64748b" strokeDasharray="4,4" />
                      <text x="260" y="160" fill="#ef4444" fontSize="10" fontWeight="bold" transform="rotate(-90 260 160)" textAnchor="middle">
                        Màng Celgard Thủng Con Thoi
                      </text>
                      {/* Dissolved Polysulfide chains leaking directly to Li anode */}
                      {[80, 140, 200, 250].map((y, idx) => (
                        <g key={`leak-${idx}`} className="animate-pulse">
                          <circle cx={200 - idx * 25} cy={y} r="8" fill="#eab308" opacity="0.8" />
                          <text x={200 - idx * 25} cy={y + 3} fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">Li₂S₆</text>
                          <line x1={240} y1={y} x2={110} y2={y} stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                        </g>
                      ))}
                      <text x="180" y="295" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">
                        ⚠️ Polysunfua rò rỉ làm hỏng cực Lithi
                      </text>
                    </g>
                  )}

                  {selectedStrategy.id === 'MXENE_TI3C2_INTERLAYER' && (
                    <g>
                      {/* MXene 2D nanosheet interlayer */}
                      <rect x="240" y="20" width="40" height="280" rx="4" fill="#059669" stroke="#34d399" strokeWidth="2" />
                      <text x="260" y="160" fill="#ecfdf5" fontSize="10" fontWeight="bold" transform="rotate(-90 260 160)" textAnchor="middle">
                        LỚP CHẮN NANO 2D MXENE Ti₃C₂Tₓ
                      </text>
                      {/* Chemisorption active sites on MXene */}
                      {[60, 100, 140, 180, 220, 260].map((y, idx) => (
                        <g key={`mxene-trap-${idx}`} className="animate-pulse">
                          <rect x="245" y={y - 8} width="30" height="16" rx="2" fill="#10b981" />
                          <circle cx="285" cy={y} r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="285" y={y + 3} fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">Li₂S₄</text>
                          <line x1="275" y1={y} x2="285" y2={y} stroke="#34d399" strokeWidth="2" />
                        </g>
                      ))}
                      <text x="260" y="295" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                        ⚡ Bẫy hóa học Ti-S + Dẫn truyền electron &gt; 5,000 S/cm
                      </text>
                    </g>
                  )}

                  {selectedStrategy.id === 'POLAR_MOF_SEPARATOR' && (
                    <g>
                      <rect x="240" y="20" width="40" height="280" rx="4" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                      <text x="260" y="160" fill="#e0e7ff" fontSize="10" fontWeight="bold" transform="rotate(-90 260 160)" textAnchor="middle">
                        MÀNG RÂY PHÂN TỬ MOF (ZIF-8)
                      </text>
                      {/* Sub-nanometer windows blocking large polysulfides */}
                      {[70, 130, 190, 250].map((y, idx) => (
                        <g key={`mof-sieve-${idx}`}>
                          <circle cx="295" cy={y} r="9" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="295" y={y + 3} fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">Li₂S₆</text>
                          <line x1="280" y1={y - 12} x2="280" y2={y + 12} stroke="#ef4444" strokeWidth="3" />
                        </g>
                      ))}
                      <text x="260" y="295" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Cửa sổ 0.4 nm chặn đứng LiPS chuỗi dài
                      </text>
                    </g>
                  )}

                  {selectedStrategy.id === 'ALL_SOLID_STATE_LIS' && (
                    <g>
                      <rect x="105" y="20" width="310" height="280" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="260" y="160" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                        CHẤT ĐIỆN GIẢI RẮN SUNFUA Li₆PS₅Cl (KHÔNG DUNG MÔI LỎNG)
                      </text>
                      <text x="260" y="295" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Không có dung dịch hòa tan → Triệt tiêu hoàn toàn hiệu ứng con thoi
                      </text>
                    </g>
                  )}

                  {/* Right: Sulfur-Carbon Nanocomposite Cathode */}
                  <rect x="420" y="20" width="220" height="280" rx="4" fill="#854d0e" stroke="#eab308" strokeWidth="2" />
                  <text x="530" y="45" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">
                    CỰC DƯƠNG COMPOSITE LƯU HUỲNH S₈ / C
                  </text>
                  <text x="530" y="65" fill="#fef9c3" fontSize="9" textAnchor="middle">
                    Dung lượng lý thuyết 1675 mAh/g
                  </text>

                  {/* S8 particles embedded in porous carbon matrix */}
                  {[90, 135, 180, 225].map((y, idx) => (
                    <g key={`s8-cluster-${idx}`}>
                      <circle cx="460" cy={y} r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                      <text x="460" y={y + 4} fill="#000" fontSize="9" fontWeight="bold" textAnchor="middle">S₈</text>
                      <circle cx="530" cy={y} r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                      <text x="530" y={y + 4} fill="#000" fontSize="9" fontWeight="bold" textAnchor="middle">S₈</text>
                      <circle cx="600" cy={y} r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                      <text x="600" y={y + 4} fill="#000" fontSize="9" fontWeight="bold" textAnchor="middle">S₈</text>
                    </g>
                  ))}

                  {/* Right Current Collector (Aluminum Foil) */}
                  <rect x="645" y="20" width="35" height="280" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="662" y="160" fill="#0f172a" fontSize="10" fontWeight="bold" transform="rotate(90 662 160)" textAnchor="middle">
                    Lá Nhôm Al
                  </text>
                </svg>
              </div>

              {/* Mechanism Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider block">
                    Cơ Chế Bẫy Hóa Hấp Phụ & Xúc Tác
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedStrategy.chemisorptionMechanismVi}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Đánh Giá Khả Thi Thực Tiễn
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedStrategy.advantagesVi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: MULTI-STEP VOLTAGE PLATEAUS */}
      {activeTab === 'MULTISTEP_DISCHARGE_PLATEAUS' && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Đường Cong Phóng Điện 2 Thềm Điện Thế Của Cực Dương S₈ (1675 mAh/g)
            </h3>
            <p className="text-xs text-ivory-muted">
              Quá trình chuyển hóa pha từ Rắn S₈ sang Dung dịch lỏng polysunfua và kết tủa cuối cùng thành Li₂S rắn cách điện
            </p>
          </div>

          {/* SVG Plot for 2-Plateau Curve */}
          <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
            <div className="bg-obsidian rounded-xl p-4 border border-white/5 relative">
              <svg viewBox="0 0 700 300" className="w-full h-auto max-h-[320px]">
                {/* Grid Lines */}
                <line x1="60" y1="20" x2="60" y2="250" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="250" x2="660" y2="250" stroke="#334155" strokeWidth="1" />

                <line x1="60" y1="80" x2="660" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="140" x2="660" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="200" x2="660" y2="200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Vertical Divider for 2 Plateaus (at 25% capacity / 418 mAh/g) */}
                <line x1="210" y1="20" x2="210" y2="250" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,4" />

                {/* Region Tints */}
                <rect x="60" y="20" width="150" height="230" fill="#eab308" opacity="0.08" />
                <rect x="210" y="20" width="450" height="230" fill="#f97316" opacity="0.08" />

                {/* Region Headers */}
                <text x="135" y="45" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. THỀM CAO (2.4 - 2.15 V)
                </text>
                <text x="135" y="60" fill="#fef08a" fontSize="9" textAnchor="middle">
                  Rắn S₈ → Lỏng Li₂S₈, Li₂S₆, Li₂S₄
                </text>

                <text x="435" y="45" fill="#fb923c" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. THỀM THẤP (2.15 - 1.90 V) - CHIẾM 75% DUNG LƯỢNG
                </text>
                <text x="435" y="60" fill="#fed7aa" fontSize="9" textAnchor="middle">
                  Lỏng Li₂S₄ → Kết tủa rắn Li₂S₂ và Li₂S (Nở thể tích 80%)
                </text>

                {/* Axis Labels */}
                <text x="60" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="210" y="270" fill="#eab308" fontSize="10" textAnchor="middle">418 mAh/g</text>
                <text x="435" y="285" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Dung Lượng Phóng Điện Q (mAh/g Lưu huỳnh)
                </text>
                <text x="660" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">1675 mAh/g</text>

                {/* Y Axis: Voltage (1.7 V to 2.6 V) */}
                <text x="25" y="135" fill="#facc15" fontSize="11" fontWeight="bold" transform="rotate(-90 25 135)" textAnchor="middle">
                  Điện Thế Cell (V)
                </text>
                <text x="50" y="25" fill="#facc15" fontSize="10" textAnchor="end">2.6 V</text>
                <text x="50" y="80" fill="#facc15" fontSize="10" textAnchor="end">2.3 V</text>
                <text x="50" y="160" fill="#facc15" fontSize="10" textAnchor="end">2.0 V</text>
                <text x="50" y="250" fill="#facc15" fontSize="10" textAnchor="end">1.7 V</text>

                {/* Curve */}
                {(() => {
                  const vPath = dischargeCurve.map((pt, idx) => {
                    const x = 60 + (pt.deliveredCapacityMahG / 1675.0) * 600;
                    const y = 250 - ((pt.cellVoltageV - 1.7) / 0.9) * 230;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <path d={vPath} fill="none" stroke="#facc15" strokeWidth="3.5" />
                  );
                })()}
              </svg>
            </div>

            {/* Step-by-Step Pathway Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {LIS_MULTISTEP_PATHWAY.map((st) => (
                <div key={st.stepIndex} className="p-3 rounded-xl bg-obsidian border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-amber-300 font-bold text-[11px]">Bước {st.stepIndex}</span>
                    <span className="text-[10px] text-ivory-muted">{st.voltagePlateauV} V</span>
                  </div>
                  <div className="font-bold text-ivory text-[11px] truncate">{st.speciesNameVi.split('(')[0]}</div>
                  <p className="text-[10px] font-mono text-ivory-muted/90">{st.reactionVi}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full inline-block mt-1 ${
                    st.phaseStateVi === 'LIQUID_SOLUBLE_SHUTTLE'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {st.phaseStateVi === 'LIQUID_SOLUBLE_SHUTTLE' ? 'Hòa tan con thoi' : 'Kết tủa rắn'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: BARRIER COMPARISON & 500 WH/KG MILESTONE */}
      {activeTab === 'BARRIER_COMPARISON_500WHKG' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-orange-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Thông Số Thiết Kế Cell Pin Li-S
              </h3>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Khối lượng lưu huỳnh trong cell:</span>
                    <span className="font-mono text-amber-300 font-bold">{sulfurMassGrams} gam S</span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={10.0}
                    step={0.5}
                    value={sulfurMassGrams}
                    onChange={(e) => setSulfurMassGrams(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>1.0 g (Pin cúc áo)</span>
                    <span>2.5 g (Pouch cell nhỏ)</span>
                    <span>10.0 g (Cell ô tô)</span>
                  </div>
                </div>
              </div>

              {/* Verdict Card */}
              <div className={`p-4 rounded-xl border ${
                simResult.cellEnergyDensityWhKg >= 500
                  ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-300'
                  : 'bg-amber-500/15 border-amber-400/60 text-amber-300'
              }`}>
                <div className="font-black text-xs uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {simResult.verdictVi}
                </div>
                <div className="text-[11px] text-ivory-muted mt-1">
                  {simResult.anodeCorrosionSeverityVi}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics & Performance Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Mật Độ Năng Lượng</span>
                <span className={`text-2xl font-mono font-black ${
                  simResult.cellEnergyDensityWhKg >= 500 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {simResult.cellEnergyDensityWhKg}
                </span>
                <span className="text-[10px] text-ivory-muted block">Wh/kg (LFP chỉ ~160 Wh/kg)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Dung Lượng Danh Định</span>
                <span className="text-2xl font-mono font-black text-cyan-400">
                  {simResult.nominalCellCapacityAh}
                </span>
                <span className="text-[10px] text-ivory-muted block">Ah</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Chặn Dòng Con Thoi</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {simResult.strategy.polysulfideShuttleCurrentReductionPercent}%
                </span>
                <span className="text-[10px] text-emerald-400/80 block">Bẫy hóa học</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Tuổi Thọ Dự Báo</span>
                <span className="text-2xl font-mono font-black text-purple-400">
                  {simResult.predictedCyclesTo80Percent}
                </span>
                <span className="text-[10px] text-ivory-muted block">chu kỳ tới 80%</span>
              </div>
            </div>

            {/* Industrial Comparison Card */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>So Sánh Với Các Thế Hệ Pin Thương Mại Hiện Nay</span>
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Lithium Sắt LFP</span>
                  <span className="font-mono text-sky-300 font-bold text-sm">160 Wh/kg</span>
                  <span className="text-[9px] text-ivory-muted block mt-0.5">Xe điện đô thị</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Lithium Ternary NMC 811</span>
                  <span className="font-mono text-rose-300 font-bold text-sm">260 Wh/kg</span>
                  <span className="text-[9px] text-ivory-muted block mt-0.5">Xe cao cấp</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-emerald-300 block text-[10px]">Lithi - Lưu Huỳnh (Li-S MXene)</span>
                  <span className="font-mono text-emerald-300 font-bold text-sm">520 Wh/kg (Gấp đôi!)</span>
                  <span className="text-[9px] text-emerald-400/80 block mt-0.5">Hàng không & Drone</span>
                </div>
              </div>
            </div>

            {/* Aviation & Drone Revolution Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-obsidian-light/40 to-yellow-950/40 border border-amber-500/20 text-xs text-ivory-muted space-y-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Chìa Khóa Cho Máy Bay Điện & Máy Bay Không Người Lái (eVTOL & Drones)
              </span>
              <p className="leading-relaxed">
                Ngưỡng mật độ năng lượng <strong>500 Wh/kg</strong> là "chén thánh" để máy bay chở khách cất cánh thẳng đứng chạy điện (eVTOL) và máy bay thương mại tầm trung có thể bay quãng đường &gt; 1,000 km mà không bị quá tải trọng pin. Nhờ loại bỏ hoàn toàn kim loại nặng Coban/Niken và thay bằng Lưu huỳnh siêu nhẹ giá rẻ, pin Li-S MXene hứa hẹn cách mạng hóa ngành hàng không xanh.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
