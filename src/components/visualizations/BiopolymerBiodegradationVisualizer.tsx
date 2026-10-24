import React, { useState, useMemo } from 'react';
import {
  Recycle,
  Leaf,
  Sprout,
  Clock,
  Sliders,
  Layers,
  ShieldCheck,
  AlertOctagon,
  Activity,
  Sparkles,
  Award,
  Info,
  TrendingDown,
  Gauge,
  FileText,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import {
  BIOPOLYMERS_CATALOG,
  DEGRADATION_ENVIRONMENTS,
  DegradationEnvironmentId,
  simulateBiodegradation,
  ESTERASE_CATALYTIC_MECHANISM_STEPS,
  getBiopolymerRadarMetrics
} from '../../domain/biopolymerBiodegradationEngine';
import { sound } from '../../audio/soundEngine';

type BiopolymerTabMode = 'KINETIC_SIMULATOR' | 'CATALYTIC_MECHANISM' | 'CIRCULAR_ECONOMY_RADAR';

export const BiopolymerBiodegradationVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BiopolymerTabMode>('KINETIC_SIMULATOR');

  // Simulation state
  const [selectedPolymerId, setSelectedPolymerId] = useState<string>('PLA');
  const [selectedEnvId, setSelectedEnvId] = useState<DegradationEnvironmentId>('INDUSTRIAL_COMPOST');
  const [currentWeek, setCurrentWeek] = useState<number>(14);

  // Catalytic step state
  const [selectedCatalyticStep, setSelectedCatalyticStep] = useState<number>(1);

  // Radar comparison comparison target
  const [radarComparePolymerId, setRadarComparePolymerId] = useState<string>('PE_SYNTHETIC');

  // Current simulation calculation (full 52-week run)
  const simulationResult = useMemo(() => {
    return simulateBiodegradation(selectedPolymerId, selectedEnvId, 52);
  }, [selectedPolymerId, selectedEnvId]);

  // Current snapshot at currentWeek
  const currentSnapshot = useMemo(() => {
    const step = simulationResult.trajectory.find(t => t.week >= currentWeek);
    return step || simulationResult.trajectory[simulationResult.trajectory.length - 1];
  }, [simulationResult, currentWeek]);

  // Current polymer profile
  const activePolymer = useMemo(() => {
    return BIOPOLYMERS_CATALOG.find(p => p.id === selectedPolymerId) || BIOPOLYMERS_CATALOG[0];
  }, [selectedPolymerId]);

  const activeEnv = useMemo(() => {
    return DEGRADATION_ENVIRONMENTS[selectedEnvId];
  }, [selectedEnvId]);

  // Radar metrics
  const radarPrimary = useMemo(() => {
    return getBiopolymerRadarMetrics(selectedPolymerId);
  }, [selectedPolymerId]);

  const radarCompare = useMemo(() => {
    return getBiopolymerRadarMetrics(radarComparePolymerId);
  }, [radarComparePolymerId]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Recycle className="w-4 h-4 text-emerald-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Xanh & Polymer Sinh Học (Lớp 12)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Biopolymer, Động Học Phân Hủy Sinh Học & Chu Trình Tuần Hoàn
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Nghiên cứu cơ chế thủy phân liên kết este/glycosidic của PLA, PHA, Chitosan theo chuẩn ISO 14855,
              đối chiếu sự tồn tại vi nhựa vĩnh cửu của nhựa hóa thạch (PE, PP) và xúc tác thủy phân Ser-His-Asp.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-emerald-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('KINETIC_SIMULATOR');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'KINETIC_SIMULATOR'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Động Học & Vi Nhựa</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('CATALYTIC_MECHANISM');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'CATALYTIC_MECHANISM'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cơ Chế Enzyme Ser-His-Asp</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('CIRCULAR_ECONOMY_RADAR');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'CIRCULAR_ECONOMY_RADAR'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Radar Vòng Đời LCA</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: KINETIC BIODEGRADATION SIMULATOR & MICROPLASTICS                   */}
      {/* ========================================================================= */}
      {activeTab === 'KINETIC_SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Polymer Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" />
                  1. Chọn Vật Liệu Polymer
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  activePolymer.linkageType === 'CARBON_CARBON'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {activePolymer.linkageType === 'CARBON_CARBON' ? 'Nhựa Hóa Thạch Trơ' : 'Biopolymer Tự Nhiên'}
                </span>
              </div>

              <div className="space-y-2">
                {BIOPOLYMERS_CATALOG.map(polymer => (
                  <button
                    key={polymer.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedPolymerId(polymer.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedPolymerId === polymer.id
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/50'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-ivory flex items-center gap-2">
                        <span>{polymer.nameVi}</span>
                        {polymer.iso14855CertifiedCompostable && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-mono">
                            ISO 14855
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-ivory-muted font-mono mt-0.5">
                        {polymer.chemicalFormula} · {polymer.feedstockOriginVi}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-mono font-bold ${
                        polymer.microplasticRiskPercent > 0 ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {polymer.microplasticRiskPercent > 0 ? 'Tạo vi nhựa' : '0% vi nhựa'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Environment Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                <Layers className="w-4 h-4" />
                2. Chọn Môi Trường Tiếp Nhận
              </span>

              <div className="space-y-2">
                {(Object.keys(DEGRADATION_ENVIRONMENTS) as DegradationEnvironmentId[]).map(envId => {
                  const env = DEGRADATION_ENVIRONMENTS[envId];
                  return (
                    <button
                      key={envId}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedEnvId(envId);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        selectedEnvId === envId
                          ? 'bg-teal-950/40 border-teal-500 shadow-md shadow-teal-950/40'
                          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ivory">{env.nameVi}</span>
                        <span className="text-[10px] font-mono text-teal-400">
                          {env.tempCelsius}°C · {env.moisturePercent}% ẩm
                        </span>
                      </div>
                      <p className="text-[11px] text-ivory-muted mt-1 line-clamp-1">{env.standardNormVi}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slider */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  3. Thời Gian Quá Trình (Tuần)
                </span>
                <span className="text-base font-extrabold font-mono text-emerald-300">
                  {currentWeek} tuần (~{Math.round(currentWeek / 4.33)} tháng)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="52"
                step="2"
                value={currentWeek}
                onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />

              <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
                <span>0 tuần (Ban đầu)</span>
                <span>26 tuần (6 tháng - Chuẩn ISO)</span>
                <span>52 tuần (1 năm)</span>
              </div>
            </div>
          </div>

          {/* Visualization Stage & Live Metrics (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Visualizer Canvas & Microstructure SVG */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-ivory">
                    Quan Sát Hình Thái Mẫu Thử & Xói Mòn Sinh Học ({currentWeek} tuần)
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-ivory-muted">Trạng thái:</span>
                  <span className="font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-700/30">
                    {currentSnapshot.stageNameVi}
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Sample Chamber */}
              <div className="w-full h-64 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Chamber Environment Atmospheric Backdrop */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  {selectedEnvId === 'MARINE_SEAWATER' && (
                    <div className="w-full h-full bg-gradient-to-t from-blue-900/60 via-cyan-900/30 to-transparent" />
                  )}
                  {selectedEnvId === 'INDUSTRIAL_COMPOST' && (
                    <div className="w-full h-full bg-gradient-to-t from-amber-900/50 via-orange-950/20 to-transparent" />
                  )}
                  {selectedEnvId === 'NATURAL_SOIL' && (
                    <div className="w-full h-full bg-gradient-to-t from-amber-950/60 via-stone-900/30 to-transparent" />
                  )}
                </div>

                {/* SVG Visual Model */}
                <svg viewBox="0 0 500 200" className="w-full h-full max-h-56">
                  {/* Environment Soil / Water Surface Layer */}
                  <rect x="20" y="150" width="460" height="40" rx="6" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
                  <text x="30" y="174" fill="#a8a29e" fontSize="10" fontFamily="monospace">
                    {activeEnv.nameVi} ({activeEnv.tempCelsius}°C · {activeEnv.moisturePercent}% ẩm)
                  </text>

                  {/* Gas emission bubbles (CO2 release for biopolymers) */}
                  {activePolymer.linkageType !== 'CARBON_CARBON' && currentSnapshot.co2MineralizationPercent > 10 && (
                    <g>
                      <circle cx="210" cy={110 - Math.min(60, currentWeek * 1.5)} r="5" fill="#34d399" opacity="0.6">
                        <animate attributeName="cy" values="130;70" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="280" cy={120 - Math.min(60, currentWeek * 1.2)} r="7" fill="#34d399" opacity="0.5">
                        <animate attributeName="cy" values="140;60" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text x="310" y="70" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        ↑ CO₂ + H₂O (Khoáng hóa {currentSnapshot.co2MineralizationPercent}%)
                      </text>
                    </g>
                  )}

                  {/* Microplastic hazard for PE/PP */}
                  {activePolymer.linkageType === 'CARBON_CARBON' && currentWeek >= 10 && (
                    <g>
                      {Array.from({ length: Math.min(18, Math.round(currentWeek / 3)) }).map((_, idx) => (
                        <circle
                          key={idx}
                          cx={70 + (idx * 22) % 360}
                          cy={130 + (idx * 7) % 35}
                          r={1.5 + (idx % 2)}
                          fill="#ef4444"
                          stroke="#f87171"
                          strokeWidth="0.5"
                        />
                      ))}
                      <text x="300" y="110" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        ⚠ Mảnh vi nhựa (&lt;5mm): {currentSnapshot.microplasticFragmentCount} hạt
                      </text>
                    </g>
                  )}

                  {/* Polymer Sample Coupon */}
                  {currentSnapshot.remainingMassPercent > 1 ? (
                    <g transform="translate(150, 80)">
                      {/* Main polymer block with dynamic width/height/erosion based on mass remaining */}
                      {(() => {
                        const widthScale = Math.max(0.08, currentSnapshot.remainingMassPercent / 100);
                        const width = 200 * widthScale;
                        const height = 45 * Math.sqrt(widthScale);
                        const xOffset = (200 - width) / 2;
                        const yOffset = (45 - height) / 2;

                        let fillColor = '#10b981'; // Green biopolymer
                        let strokeColor = '#34d399';
                        if (activePolymer.id === 'PLA') {
                          fillColor = '#059669';
                          strokeColor = '#10b981';
                        } else if (activePolymer.id === 'PHA_PHB') {
                          fillColor = '#0d9488';
                          strokeColor = '#14b8a6';
                        } else if (activePolymer.id === 'CHITOSAN') {
                          fillColor = '#d97706';
                          strokeColor = '#f59e0b';
                        } else if (activePolymer.id === 'TPS') {
                          fillColor = '#ca8a04';
                          strokeColor = '#eab308';
                        } else if (activePolymer.linkageType === 'CARBON_CARBON') {
                          // Synthetic turns yellowish brittle
                          fillColor = currentWeek > 26 ? '#78716c' : '#475569';
                          strokeColor = currentWeek > 26 ? '#f59e0b' : '#94a3b8';
                        }

                        return (
                          <g>
                            <rect
                              x={xOffset}
                              y={yOffset}
                              width={width}
                              height={height}
                              rx={Math.max(2, 6 * (1 - widthScale))}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="2"
                              strokeDasharray={currentSnapshot.remainingMassPercent < 50 ? '4 2' : 'none'}
                              opacity={Math.max(0.25, widthScale)}
                            />

                            {/* Pitting holes / microbial biofilm spots */}
                            {activePolymer.linkageType !== 'CARBON_CARBON' && currentSnapshot.remainingMassPercent < 90 && (
                              <g opacity="0.8">
                                <circle cx={xOffset + width * 0.3} cy={yOffset + height * 0.4} r="3" fill="#1e293b" />
                                <circle cx={xOffset + width * 0.7} cy={yOffset + height * 0.6} r="4" fill="#1e293b" />
                                <circle cx={xOffset + width * 0.5} cy={yOffset + height * 0.3} r="2.5" fill="#1e293b" />
                              </g>
                            )}

                            {/* Label inside coupon */}
                            {width > 60 && (
                              <text
                                x={100}
                                y={26}
                                fill="#ffffff"
                                fontSize="11"
                                fontFamily="monospace"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                {activePolymer.id} ({currentSnapshot.remainingMassPercent}%)
                              </text>
                            )}
                          </g>
                        );
                      })()}
                    </g>
                  ) : (
                    <g transform="translate(150, 95)">
                      <circle cx="100" cy="15" r="14" fill="#10b981" opacity="0.3" />
                      <CheckCircle2 x="90" y="5" className="w-5 h-5 text-emerald-400" />
                      <text x="100" y="42" fill="#34d399" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        Đã Phân Hủy Hoàn Toàn Thành CO₂ & H₂O
                      </text>
                    </g>
                  )}
                </svg>

                {/* Subtext Observation */}
                <div className="text-xs text-center text-ivory-muted px-4 mt-1 font-mono">
                  {currentSnapshot.visualAppearanceVi}
                </div>
              </div>

              {/* 4 Quantitative Gauge Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {/* Mass remaining */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Khối lượng còn lại</span>
                    <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-amber-300 mt-1">
                    {currentSnapshot.remainingMassPercent}%
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentSnapshot.remainingMassPercent}%` }}
                    />
                  </div>
                </div>

                {/* CO2 mineralization */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Khoáng hóa CO₂ (ISO)</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-emerald-300 mt-1">
                    {currentSnapshot.co2MineralizationPercent}%
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentSnapshot.co2MineralizationPercent}%` }}
                    />
                  </div>
                </div>

                {/* Molecular Weight */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Trọng lượng phân tử Mw</span>
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-blue-300 mt-1">
                    {currentSnapshot.averageMwKDa} <span className="text-xs font-normal">kDa</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Ban đầu: {activePolymer.initialMwKDa} kDa
                  </div>
                </div>

                {/* Tensile Retention */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Độ bền kéo cơ học</span>
                    <Gauge className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-purple-300 mt-1">
                    {currentSnapshot.tensileRetentionPercent}%
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Ban đầu: {activePolymer.tensileStrengthMpa} MPa
                  </div>
                </div>
              </div>

              {/* Summary and Pedagogical Context */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Kết Luận Khoa Học & Chuẩn ISO 14855 / ASTM D6400</span>
                </div>
                <p className="text-xs text-ivory leading-relaxed">{simulationResult.summaryConclusionVi}</p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-ivory-muted leading-relaxed">
                  {simulationResult.pedagogicalTakeawayVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ENZYMATIC CATALYTIC MECHANISM (SER-HIS-ASP TRIAD)                 */}
      {/* ========================================================================= */}
      {activeTab === 'CATALYTIC_MECHANISM' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4" />
                  Cơ Chế Hóa Học Lớp 12 · Xúc Tác Thủy Phân Este Bằng Enzyme
                </span>
                <h3 className="text-xl font-extrabold text-ivory">
                  Bộ Ba Xúc Tác Serine - Histidine - Aspartate (Catalytic Triad) Cắt Đứt Liên Kết Este PLA/PHA
                </h3>
                <p className="text-xs text-ivory-muted mt-1">
                  Enzyme Esterase / Cutinase / Proteinase K sử dụng chuỗi truyền proton để kích hoạt nguyên tử oxy của Serine
                  tấn công ái nhân vào nhóm cacbonyl este trên chuỗi polyme sinh học.
                </p>
              </div>

              {/* Step Selector Buttons */}
              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                {[1, 2, 3].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedCatalyticStep(stepNum);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCatalyticStep === stepNum
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    Giai Đoạn {stepNum}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalytic Mechanism Visual Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Active Site Schematic SVG (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4">
                <svg viewBox="0 0 540 240" className="w-full h-auto">
                  {/* Background Enzyme Pocket Glow */}
                  <path
                    d="M 30,30 Q 270,10 510,30 Q 520,210 270,220 Q 20,210 30,30 Z"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />

                  {/* Aspartate 187 (Proton Anchor) */}
                  <g transform="translate(60, 110)">
                    <rect x="0" y="0" width="85" height="50" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="42" y="22" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Asp187
                    </text>
                    <text x="42" y="38" fill="#f87171" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      -COO⁻
                    </text>
                  </g>

                  {/* Hydrogen Bond 1 */}
                  <line x1="145" y1="135" x2="190" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="168" y="128" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    H-bond
                  </text>

                  {/* Histidine 224 (General Base/Acid) */}
                  <g transform="translate(190, 100)">
                    <polygon points="40,5 75,30 65,70 15,70 5,30" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="40" y="35" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      His224
                    </text>
                    <text x="40" y="50" fill="#93c5fd" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      (Imidazole)
                    </text>
                  </g>

                  {/* Hydrogen Bond 2 / Proton Shuttle */}
                  <line x1="265" y1="135" x2="310" y2="135" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="288" y="128" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    H⁺ shuttle
                  </text>

                  {/* Serine 105 (Nucleophile) */}
                  <g transform="translate(310, 110)">
                    <rect x="0" y="0" width="85" height="50" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="42" y="22" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Ser105
                    </text>
                    <text x="42" y="38" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      -CH₂-O⁻
                    </text>
                  </g>

                  {/* Polymer Ester Bond Substrate */}
                  <g transform="translate(420, 80)">
                    <rect x="0" y="0" width="100" height="90" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="50" y="20" fill="#c7d2fe" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Mạch PLA/PHA
                    </text>
                    <text x="50" y="45" fill="#fef08a" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      -C(=O)-O-
                    </text>
                    <text x="50" y="70" fill="#a5b4fc" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      {selectedCatalyticStep === 1 ? 'Cacbonyl ái điện' : selectedCatalyticStep === 2 ? 'Acyl trung gian' : 'Tự do R-COOH'}
                    </text>
                  </g>

                  {/* Dynamic Reaction Arrow */}
                  {selectedCatalyticStep === 1 && (
                    <path
                      d="M 395,135 Q 410,120 425,125"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      markerEnd="url(#arrow)"
                    />
                  )}
                </svg>
              </div>

              {/* Step Explanation Card (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {(() => {
                  const step = ESTERASE_CATALYTIC_MECHANISM_STEPS[selectedCatalyticStep - 1];
                  return (
                    <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          BƯỚC {step.stepIndex} / 3
                        </span>
                        <span className="text-xs font-mono text-ivory-muted">
                          Hàng rào năng lượng: <strong className="text-amber-300">{step.energyBarrierKjMol} kJ/mol</strong>
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-ivory">{step.stepNameVi}</h4>
                      <p className="text-xs text-ivory-muted leading-relaxed">{step.reactionDescriptionVi}</p>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-amber-200">
                        {step.chemicalEquationVi}
                      </div>

                      <div className="text-[11px] text-ivory-muted">
                        <strong className="text-emerald-300">Tác nhân tham gia:</strong> {step.activeResiduesVi}
                      </div>
                    </div>
                  );
                })()}

                {/* Macromolecular comparison callout */}
                <div className="p-4 bg-emerald-950/30 border border-emerald-700/30 rounded-xl text-xs text-ivory-muted space-y-1">
                  <div className="font-bold text-emerald-400">Tại sao PE và PP không bị enzyme cắt đứt?</div>
                  <p>
                    Polyethylene (PE) chỉ chứa các liên kết C-C và C-H không phân cực, không có nhóm cacbonyl phân cực (C=O)
                    để tạo hiệu ứng hút electron δ⁺ cho Serine tấn công. Do đó năng lượng kích hoạt phân cắt liên kết C-C
                    lên đến ~348 kJ/mol, enzyme vi sinh vật hoàn toàn bất lực.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: CIRCULAR ECONOMY & COMPARATIVE LCA RADAR                           */}
      {/* ========================================================================= */}
      {activeTab === 'CIRCULAR_ECONOMY_RADAR' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                  <BarChart3 className="w-4 h-4" />
                  Đánh Giá Vòng Đời Sản Phẩm (LCA) & Kinh Tế Tuần Hoàn
                </span>
                <h3 className="text-xl font-extrabold text-ivory">
                  So Sánh Đa Chiều: Biopolymer Tái Tạo vs. Nhựa Hóa Thạch Truyền Thống
                </h3>
              </div>

              {/* Compare Selectors */}
              <div className="flex items-center gap-3">
                <div className="text-xs text-ivory-muted font-mono">Đối chứng với:</div>
                <select
                  value={radarComparePolymerId}
                  onChange={(e) => {
                    sound.playUiClick();
                    setRadarComparePolymerId(e.target.value);
                  }}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-ivory focus:border-emerald-500 focus:outline-none"
                >
                  <option value="PE_SYNTHETIC">Polyethylene (PE Hóa thạch)</option>
                  <option value="PP_SYNTHETIC">Polypropylene (PP Hóa thạch)</option>
                </select>
              </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Biopolymer Card */}
              <div className="bg-emerald-950/20 border border-emerald-700/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base font-bold text-emerald-300">{radarPrimary.polymerNameVi}</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-600/30">
                    Phát thải: {activePolymer.lcaCarbonFootprintKgCo2PerKg} kg CO₂/kg
                  </span>
                </div>

                {/* 5 Metric Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Điểm giảm phát thải carbon (LCA):</span>
                      <strong className="text-emerald-400">{radarPrimary.carbonFootprintScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarPrimary.carbonFootprintScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Tốc độ phân hủy sinh học tự nhiên:</span>
                      <strong className="text-emerald-400">{radarPrimary.biodegradabilitySpeedScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarPrimary.biodegradabilitySpeedScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Tỉ lệ nguồn nguyên liệu sinh khối tái tạo:</span>
                      <strong className="text-emerald-400">{radarPrimary.renewabilityFeedstockScore}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarPrimary.renewabilityFeedstockScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Độ bền kéo cơ học (Tensile strength):</span>
                      <strong className="text-emerald-400">{radarPrimary.mechanicalStrengthScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarPrimary.mechanicalStrengthScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Khả năng gia công nhiệt dẻo (Processability):</span>
                      <strong className="text-emerald-400">{radarPrimary.processabilityScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarPrimary.processabilityScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Applications in Vietnam */}
                <div className="pt-3 border-t border-emerald-800/40">
                  <div className="text-xs font-bold text-emerald-300 mb-2">Ứng dụng thực tiễn tại Việt Nam:</div>
                  <ul className="text-xs text-ivory-muted space-y-1 list-disc list-inside">
                    {activePolymer.vietnamIndustrialApplicationsVi.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benchmark Fossil Plastic Card */}
              <div className="bg-red-950/20 border border-red-700/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-red-400" />
                    <h4 className="text-base font-bold text-red-300">{radarCompare.polymerNameVi}</h4>
                  </div>
                  <span className="text-xs font-mono text-red-400 bg-red-900/40 px-2 py-0.5 rounded border border-red-600/30">
                    Phát thải: ~5.0 kg CO₂/kg
                  </span>
                </div>

                {/* 5 Metric Progress Bars for Benchmark */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Điểm giảm phát thải carbon (LCA):</span>
                      <strong className="text-red-400">{radarCompare.carbonFootprintScore} / 100 (Rất ô nhiễm)</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${radarCompare.carbonFootprintScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Tốc độ phân hủy sinh học tự nhiên:</span>
                      <strong className="text-red-400">{radarCompare.biodegradabilitySpeedScore} / 100 (Tồn tại &gt;450 năm)</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${radarCompare.biodegradabilitySpeedScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Tỉ lệ nguồn nguyên liệu sinh khối tái tạo:</span>
                      <strong className="text-red-400">{radarCompare.renewabilityFeedstockScore}% (100% dầu mỏ)</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${radarCompare.renewabilityFeedstockScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Độ bền kéo cơ học (Tensile strength):</span>
                      <strong className="text-amber-400">{radarCompare.mechanicalStrengthScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${radarCompare.mechanicalStrengthScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-ivory mb-1">
                      <span>Khả năng gia công nhiệt dẻo (Processability):</span>
                      <strong className="text-emerald-400">{radarCompare.processabilityScore} / 100</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${radarCompare.processabilityScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Threat assessment */}
                <div className="pt-3 border-t border-red-800/40">
                  <div className="text-xs font-bold text-red-300 mb-2">Đánh giá tác động sinh thái Việt Nam:</div>
                  <p className="text-xs text-ivory-muted leading-relaxed">
                    Theo Quyết định số 175/QĐ-TTg của Thủ tướng Chính phủ, Việt Nam đặt mục tiêu đến năm 2026 giảm 100% túi nilon
                    khó phân hủy tại các trung tâm thương mại và siêu thị. Việc thay thế bằng vật liệu màng bao bì sinh học từ tinh bột
                    (TPS), PLA và Chitosan là định hướng chiến lược quốc gia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
