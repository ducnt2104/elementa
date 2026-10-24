import React, { useState, useMemo } from 'react';
import {
  Sprout,
  Droplets,
  Sliders,
  ShieldAlert,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  TrendingDown,
  Activity,
  Award,
  AlertTriangle,
  Scale,
  CloudRain,
  MapPin,
  FlaskConical
} from 'lucide-react';
import {
  FERTILIZERS_CATALOG,
  VIETNAM_SOILS_DATA,
  VietnamSoilType,
  calculateLimingRequirement,
  simulateNitrogenTransformation,
  FertilizerProfile,
  SoilProfile
} from '../../domain/soilFertilizerEngine';
import { sound } from '../../audio/soundEngine';

type SoilFertilizerTab = 'NITROGEN_LEACHING' | 'ACID_SOIL_LIMING' | 'FERTILIZER_CATALOG';

export const SoilFertilizerVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SoilFertilizerTab>('NITROGEN_LEACHING');

  // Mode 1: Nitrogen simulation parameters
  const [selectedFertilizerId, setSelectedFertilizerId] = useState<string>('UREA');
  const [selectedSoilId, setSelectedSoilId] = useState<VietnamSoilType>('ALLUVIAL_RIVER_SOIL');
  const [applicationRateKg, setApplicationRateKg] = useState<number>(150);
  const [rainfallMmDay, setRainfallMmDay] = useState<number>(15);
  const [simulationDay, setSimulationDay] = useState<number>(15);

  // Mode 2: Liming parameters
  const [limingSoilId, setLimingSoilId] = useState<VietnamSoilType>('ACID_SULFATE_SOIL');
  const [targetPh, setTargetPh] = useState<number>(6.0);

  // Run 45-day Nitrogen transformation simulation
  const nitrogenResult = useMemo(() => {
    return simulateNitrogenTransformation(selectedFertilizerId, selectedSoilId, applicationRateKg, rainfallMmDay, 45);
  }, [selectedFertilizerId, selectedSoilId, applicationRateKg, rainfallMmDay]);

  // Current snapshot at simulationDay
  const currentSnapshot = useMemo(() => {
    const snap = nitrogenResult.dailyTrajectory.find(d => d.day === simulationDay);
    return snap || nitrogenResult.dailyTrajectory[nitrogenResult.dailyTrajectory.length - 1];
  }, [nitrogenResult, simulationDay]);

  // Liming calculation
  const limingResult = useMemo(() => {
    return calculateLimingRequirement(limingSoilId, targetPh);
  }, [limingSoilId, targetPh]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-lime-950 to-slate-900 border border-lime-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-lime-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sprout className="w-4 h-4 text-lime-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Đất & Phân Bón Nông Nghiệp (Lớp 11 & 12)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Hóa Học Đất, Chuyển Hóa Đạm, Rửa Trôi Nitrat & Khử Chua Bằng Vôi
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Mô phỏng thủy phân urê bởi urease, động học nitrat hóa, keo đất trao đổi cation (CEC), rửa trôi nitrat gây phú dưỡng
              theo chuẩn WHO (50 mg/L), và giải độc nhôm Al³⁺ trên đất phèn Đồng Tháp Mười.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-lime-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('NITROGEN_LEACHING');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'NITROGEN_LEACHING'
                  ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Động Học Đạm & Rửa Trôi</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('ACID_SOIL_LIMING');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'ACID_SOIL_LIMING'
                  ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Bón Vôi Khử Chua & Độc Al³⁺</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('FERTILIZER_CATALOG');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'FERTILIZER_CATALOG'
                  ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Từ Điển Phân Bón Việt Nam</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: NITROGEN TRANSFORMATION & GROUNDWATER LEACHING                    */}
      {/* ========================================================================= */}
      {activeTab === 'NITROGEN_LEACHING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Fertilizer Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                1. Loại Phân Bón
              </span>

              <div className="space-y-1.5">
                {FERTILIZERS_CATALOG.filter(f => f.gradeNPercent > 0).map(fert => (
                  <button
                    key={fert.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedFertilizerId(fert.id);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                      selectedFertilizerId === fert.id
                        ? 'bg-lime-950/40 border-lime-500 shadow-md shadow-lime-950/40'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ivory">{fert.nameVi}</span>
                      <span className="text-[10px] font-mono font-bold text-lime-300 bg-lime-500/20 px-1.5 py-0.5 rounded">
                        {fert.gradeNPercent}% N
                      </span>
                    </div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">{fert.commonNameVi}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Soil Type Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                2. Loại Thổ Nhưỡng (Đất Canh Tác)
              </span>

              <div className="space-y-1.5">
                {(Object.keys(VIETNAM_SOILS_DATA) as VietnamSoilType[]).map(sId => {
                  const s = VIETNAM_SOILS_DATA[sId];
                  return (
                    <button
                      key={sId}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedSoilId(sId);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                        selectedSoilId === sId
                          ? 'bg-teal-950/40 border-teal-500 shadow-md shadow-teal-950/40'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ivory">{s.nameVi}</span>
                        <span className="text-[10px] font-mono text-teal-300">
                          pH {s.baselinePh} · CEC {s.cationExchangeCapacityCecMeqPer100g}
                        </span>
                      </div>
                      <div className="text-[10px] text-ivory-muted mt-0.5">{s.regionalLocationVi}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Application & Rainfall Sliders */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                3. Điều Kiện Canh Tác & Thời Tiết
              </span>

              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Liều lượng bón:</span>
                  <strong className="text-lime-300">{applicationRateKg} kg phân/ha</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="25"
                  value={applicationRateKg}
                  onChange={(e) => setApplicationRateKg(parseInt(e.target.value))}
                  className="w-full accent-lime-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Lượng mưa / Tưới nước:</span>
                  <strong className="text-cyan-300">{rainfallMmDay} mm/ngày</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={rainfallMmDay}
                  onChange={(e) => setRainfallMmDay(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Ngày sau khi bón:</span>
                  <strong className="text-amber-300">Ngày thứ {simulationDay} / 45</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  step="1"
                  value={simulationDay}
                  onChange={(e) => setSimulationDay(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Visualization Stage & Profile (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-lime-400" />
                  <h3 className="text-lg font-bold text-ivory">
                    Mặt Cắt Thổ Nhưỡng, Hấp Phụ Keo Đất & Thẩm Thấu Nước Ngầm (Ngày {simulationDay})
                  </h3>
                </div>
                <div className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  currentSnapshot.eutrophicationRiskLevel === 'HAZARDOUS'
                    ? 'bg-red-950/40 text-red-300 border-red-700/50'
                    : currentSnapshot.eutrophicationRiskLevel === 'MODERATE'
                    ? 'bg-amber-950/40 text-amber-300 border-amber-700/50'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
                }`}>
                  {currentSnapshot.eutrophicationRiskLevel === 'HAZARDOUS'
                    ? '⚠ Ô NHIỄM NƯỚC NGẦM (WHO > 50 mg/L)'
                    : '✅ An Toàn Sinh Thái'}
                </div>
              </div>

              {/* Dynamic SVG Soil Profile */}
              <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                <svg viewBox="0 0 540 240" className="w-full h-auto">
                  {/* Sky & Rain */}
                  <rect x="20" y="10" width="500" height="40" fill="#0f172a" />
                  {rainfallMmDay > 0 && (
                    <g>
                      <line x1="80" y1="15" x2="70" y2="35" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="160" y1="12" x2="150" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="280" y1="15" x2="270" y2="35" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="390" y1="12" x2="380" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="440" y="30" fill="#38bdf8" fontSize="9" fontFamily="monospace">Mưa {rainfallMmDay}mm</text>
                    </g>
                  )}

                  {/* Topsoil Layer (0 - 20 cm) with Rice Root */}
                  <rect x="20" y="50" width="500" height="70" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
                  <text x="30" y="65" fill="#a8a29e" fontSize="9" fontFamily="monospace">
                    Tầng mặt canh tác (0-20cm): Mùn & Keo sét âm
                  </text>

                  {/* Rice Crop Cartoon */}
                  <g transform="translate(180, 20)">
                    {/* Plant Leaves */}
                    <path d="M 40,30 Q 30,5 15,10" stroke="#84cc16" strokeWidth="2.5" fill="none" />
                    <path d="M 40,30 Q 50,5 65,10" stroke="#84cc16" strokeWidth="2.5" fill="none" />
                    <path d="M 40,30 L 40,10" stroke="#84cc16" strokeWidth="3" />
                    {/* Roots penetrating topsoil */}
                    <path d="M 40,30 Q 25,60 20,80" stroke="#fef08a" strokeWidth="1.5" fill="none" />
                    <path d="M 40,30 Q 40,65 38,85" stroke="#fef08a" strokeWidth="1.5" fill="none" />
                    <path d="M 40,30 Q 55,60 60,80" stroke="#fef08a" strokeWidth="1.5" fill="none" />
                    <text x="75" y="70" fill="#fef08a" fontSize="8" fontFamily="monospace">Hấp thu: {currentSnapshot.plantCumulativeUptakeKgNPerHa} kg N/ha</text>
                  </g>

                  {/* NH4+ Cations Bound to Clay Plates (Blue) */}
                  <g>
                    <rect x="80" y="80" width="30" height="8" rx="2" fill="#78716c" />
                    <text x="95" y="86" fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle">- - - -</text>
                    <circle cx="95" cy="74" r="5" fill="#38bdf8" />
                    <text x="95" y="77" fill="#090d16" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NH₄⁺</text>
                    <text x="70" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace">NH₄⁺ gắn chặt keo đất (CEC)</text>
                  </g>

                  {/* Subsoil Layer (20 - 60 cm) */}
                  <rect x="20" y="120" width="500" height="60" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
                  <text x="30" y="135" fill="#78716c" fontSize="9" fontFamily="monospace">
                    Tầng dưới đất (20-60cm): Rửa trôi tự do anion NO₃⁻
                  </text>

                  {/* Mobile NO3- Anions Leaching downward (Red) */}
                  <g>
                    <circle cx="320" cy="130" r="5" fill="#ef4444" />
                    <text x="320" y="133" fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NO₃⁻</text>
                    <path d="M 320,136 L 320,160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)" />

                    <circle cx="360" cy="140" r="5" fill="#ef4444" />
                    <text x="360" y="143" fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NO₃⁻</text>
                    <path d="M 360,146 L 360,170" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)" />

                    <text x="380" y="155" fill="#f87171" fontSize="8" fontFamily="monospace">
                      ↓ NO₃⁻ bị đẩy, rửa trôi ({currentSnapshot.leachedNitrateCumulativeKgNPerHa} kg N)
                    </text>
                  </g>

                  {/* Groundwater Table (Mực nước ngầm) */}
                  {(() => {
                    let gwColor = '#0284c7'; // clean blue
                    if (currentSnapshot.groundwaterNitratePpm > 50) {
                      gwColor = '#7f1d1d'; // hazardous murky dark red
                    } else if (currentSnapshot.groundwaterNitratePpm > 25) {
                      gwColor = '#854d0e'; // moderate warning brown
                    }

                    return (
                      <g>
                        <rect x="20" y="180" width="500" height="50" rx="4" fill={gwColor} opacity="0.75" />
                        <text x="30" y="200" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          TẦNG CHỨA NƯỚC NGẦM (GROUNDWATER WATER TABLE)
                        </text>
                        <text x="30" y="215" fill="#ffffff" fontSize="9" fontFamily="monospace">
                          Nồng độ Nitrat: {currentSnapshot.groundwaterNitratePpm} mg/L NO₃⁻ (Ngưỡng WHO: 50 mg/L)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* 4 Quantitative Output Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted">Cây trồng hấp thu (NUE)</div>
                  <div className="text-xl font-extrabold font-mono text-lime-400 mt-1">
                    {currentSnapshot.plantCumulativeUptakeKgNPerHa} <span className="text-xs font-normal">kg N</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Hiệu suất: {nitrogenResult.nitrogenUseEfficiencyNuePercent}%
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted">Rửa trôi nitrat tích lũy</div>
                  <div className={`text-xl font-extrabold font-mono mt-1 ${
                    currentSnapshot.leachedNitrateCumulativeKgNPerHa > 15 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {currentSnapshot.leachedNitrateCumulativeKgNPerHa} <span className="text-xs font-normal">kg N</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Trôi vào nước ngầm
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted">Nồng độ NO₃⁻ nước ngầm</div>
                  <div className={`text-xl font-extrabold font-mono mt-1 ${
                    currentSnapshot.groundwaterNitratePpm > 50 ? 'text-red-400' : 'text-cyan-400'
                  }`}>
                    {currentSnapshot.groundwaterNitratePpm} <span className="text-xs font-normal">mg/L</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Giới hạn WHO: 50 mg/L
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted">Bay hơi khí amoniac (NH₃)</div>
                  <div className="text-xl font-extrabold font-mono text-amber-400 mt-1">
                    {currentSnapshot.volatilizedAmmoniaCumulativeKgNPerHa} <span className="text-xs font-normal">kg N</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Mất mát khí thải
                  </div>
                </div>
              </div>

              {/* Explanatory pedagogical conclusion */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-lime-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Tổng Kết Khoa Học Thổ Nhưỡng GDPT 2018</span>
                </div>
                <p className="text-xs text-ivory leading-relaxed">{nitrogenResult.summaryConclusionVi}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-ivory-muted leading-relaxed whitespace-pre-line">
                  {nitrogenResult.pedagogicalTakeawayVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ACID SOIL LIMING & AL3+ TOXICITY REMEDIATION                      */}
      {/* ========================================================================= */}
      {activeTab === 'ACID_SOIL_LIMING' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  Chọn Loại Đất Cần Cải Tạo
                </span>

                <div className="space-y-2">
                  {(['ACID_SULFATE_SOIL', 'FERRALSOLIC_SOIL', 'ALLUVIAL_RIVER_SOIL'] as VietnamSoilType[]).map(sId => {
                    const s = VIETNAM_SOILS_DATA[sId];
                    return (
                      <button
                        key={sId}
                        onClick={() => {
                          sound.playUiClick();
                          setLimingSoilId(sId);
                          setTargetPh(Math.max(s.baselinePh + 0.5, 6.0));
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          limingSoilId === sId
                            ? 'bg-lime-950/40 border-lime-500 shadow-md shadow-lime-950/40'
                            : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-ivory">{s.nameVi}</span>
                          <span className="text-[10px] font-mono text-lime-300">pH {s.baselinePh}</span>
                        </div>
                        <div className="text-[11px] text-ivory-muted mt-1">{s.descriptionVi}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Target pH Slider */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>pH mục tiêu sau khi bón vôi:</span>
                    <strong className="text-lime-300 font-bold">{targetPh.toFixed(1)}</strong>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="7.0"
                    step="0.1"
                    value={targetPh}
                    onChange={(e) => setTargetPh(parseFloat(e.target.value))}
                    className="w-full accent-lime-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                    <span>Ban đầu ({limingResult.initialPh})</span>
                    <span>Tối ưu (6.0 - 6.5)</span>
                    <span>Trung tính (7.0)</span>
                  </div>
                </div>
              </div>

              {/* Requirement Result Card */}
              <div className="bg-gradient-to-br from-lime-950/40 via-slate-900 to-slate-900 border border-lime-600/40 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    Lượng Vôi Nông Nghiệp Cần Bón
                  </span>
                  <span className="text-xs font-mono font-bold text-lime-300 bg-lime-950/50 px-2 py-0.5 rounded border border-lime-600/30">
                    {limingResult.limeRequirementKgCaoPerHa.toLocaleString()} kg CaO/ha
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory">Nhôm tự do Al³⁺ độc hại còn lại:</span>
                    <strong className={limingResult.finalFreeAl3PlusPpm === 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {limingResult.finalFreeAl3PlusPpm} ppm ({limingResult.finalFreeAl3PlusPpm === 0 ? 'Đã hết độc' : 'Còn độc rễ'})
                    </strong>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory">Lân hữu hiệu giải phóng thêm:</span>
                    <strong className="text-emerald-400">+{limingResult.bioavailablePhosphateIncreasePercent}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Reaction & Beaker Visualization (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-lime-400" />
                  Cơ Chế Hóa Học Khử Chua & Kết Tủa Giải Độc Nhôm Al³⁺
                </h3>

                {/* SVG Visual Beaker */}
                <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <svg viewBox="0 0 540 220" className="w-full h-auto">
                    {/* Beaker Soil Chamber */}
                    <rect x="30" y="30" width="480" height="170" rx="10" fill="#1c1917" stroke="#44403c" strokeWidth="2" />

                    {/* Left: Acid condition with Al3+ */}
                    <g transform="translate(60, 40)">
                      <rect x="0" y="0" width="180" height="140" rx="6" fill="#450a0a" opacity="0.3" />
                      <text x="90" y="25" fill="#f87171" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        ĐẤT CHUA BAN ĐẦU (pH {limingResult.initialPh})
                      </text>

                      {/* Stunted yellow root */}
                      <path d="M 90,35 Q 90,65 85,85 Q 80,105 75,115" stroke="#ca8a04" strokeWidth="3" fill="none" />
                      <circle cx="75" cy="115" r="4" fill="#ef4444" />
                      <text x="90" y="130" fill="#fca5a5" fontSize="8" fontFamily="monospace" textAnchor="middle">
                        Rễ thối do độc {limingResult.soilType.toxicFreeAl3PlusPpm} ppm Al³⁺
                      </text>
                    </g>

                    {/* Central Arrow: Liming with CaO / Ca(OH)2 */}
                    <g transform="translate(250, 90)">
                      <path d="M 0,20 L 40,20" stroke="#a3e635" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="20" y="10" fill="#a3e635" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        + CaO / vôi
                      </text>
                    </g>

                    {/* Right: Neutralized soil with Al(OH)3 precipitate */}
                    <g transform="translate(300, 40)">
                      <rect x="0" y="0" width="180" height="140" rx="6" fill="#064e3b" opacity="0.3" />
                      <text x="90" y="25" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        SAU KHỬ CHUA (pH {limingResult.targetPh})
                      </text>

                      {/* Vigorous white/green healthy root */}
                      <path d="M 90,35 Q 90,75 90,110" stroke="#84cc16" strokeWidth="4" fill="none" />
                      <path d="M 90,60 Q 75,80 70,100" stroke="#a3e635" strokeWidth="2.5" fill="none" />
                      <path d="M 90,75 Q 105,95 110,115" stroke="#a3e635" strokeWidth="2.5" fill="none" />

                      {/* White Al(OH)3 precipitate dots */}
                      <circle cx="50" cy="120" r="3" fill="#f1f5f9" />
                      <circle cx="65" cy="125" r="3.5" fill="#f1f5f9" />
                      <circle cx="130" cy="122" r="3" fill="#f1f5f9" />
                      <text x="90" y="135" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                        Al(OH)₃↓ kết tủa trơ không độc
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Reaction Text */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-ivory-muted leading-relaxed whitespace-pre-line">
                  {limingResult.chemicalReactionVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: VIETNAM FERTILIZER CATALOG & MANUFACTURING ENCYCLOPEDIA            */}
      {/* ========================================================================= */}
      {activeTab === 'FERTILIZER_CATALOG' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center gap-1.5 mb-1">
                <FlaskConical className="w-4 h-4" />
                Cẩm Nang Phân Bón Nông Nghiệp & Tổ Hợp Hóa Chất Việt Nam
              </span>
              <h3 className="text-xl font-extrabold text-ivory">
                Phân Loại, Công Thức Hóa Học & Cơ Chế Chua Sinh Lý Của Các Loại Phân Khoáng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FERTILIZERS_CATALOG.map(fert => (
                <div
                  key={fert.id}
                  className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:bg-slate-800/70 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-ivory">{fert.nameVi}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-300 font-bold">
                        {fert.fertilizerClass}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-lime-400 font-bold">{fert.chemicalFormula}</div>
                    <div className="text-xs text-ivory-muted mt-1 font-mono">
                      Hàm lượng: {fert.gradeNPercent}% N - {fert.gradeP2O5Percent}% P₂O₅ - {fert.gradeK2OPercent}% K₂O
                    </div>
                  </div>

                  <div className="text-[11px] text-ivory-muted leading-relaxed">
                    <strong className="text-ivory">Tác động pH:</strong> {fert.acidityDescriptionVi}
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 text-[10px] text-ivory-muted">
                    <strong className="text-lime-300">Nhà máy sản xuất:</strong>
                    <ul className="list-disc list-inside mt-0.5">
                      {fert.vietnamManufacturingPlantsVi.map((p, idx) => (
                        <li key={idx} className="line-clamp-1">{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
