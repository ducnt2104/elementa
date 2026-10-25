// src/components/visualizations/SeawaterUraniumVisualizer.tsx
// ============================================================================
// SEAWATER URANIUM EXTRACTION & ELECTROCHEMICAL ELUTION VISUALIZER
// Passive Ocean Current Harvesting, Amidoxime Chelation, and Yellowcake Synthesis
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Waves,
  Zap,
  Layers,
  TrendingDown,
  ShieldCheck,
  Globe,
  Gauge,
  Factory,
  Atom,
  Sparkles,
  Anchor
} from 'lucide-react';
import {
  SeawaterUraniumExtractionEngine,
  ADSORBENT_CATALOG,
  TERRESTRIAL_VS_MARINE_COMPARISON,
  AdsorbentFiberSpecs,
  TerrestrialVsMarineBenchmark
} from '../../domain/seawaterUraniumExtractionEngine';

export const SeawaterUraniumVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flowsheet' | 'kinetics' | 'comparison'>('flowsheet');

  // Interactive parameters
  const [selectedAdsorbentId, setSelectedAdsorbentId] = useState<'Braided_Amidoxime_PE' | 'Graphene_Amidoxime' | 'MOF_Nanofiber' | 'Bacterial_Cellulose_Amidoxime'>('Braided_Amidoxime_PE');
  const [adsorbentTons, setAdsorbentTons] = useState<number>(500);
  const [immersionDays, setImmersionDays] = useState<number>(42);
  const [oceanVelocityMS, setOceanVelocityMS] = useState<number>(0.50);
  const [seawaterTempC, setSeawaterTempC] = useState<number>(22.0);
  const [desorptionPulseVoltageV, setDesorptionPulseVoltageV] = useState<number>(-0.65);

  const selectedAdsorbent = useMemo(() => {
    return ADSORBENT_CATALOG.find(a => a.id === selectedAdsorbentId) || ADSORBENT_CATALOG[0];
  }, [selectedAdsorbentId]);

  const campaignResults = useMemo(() => {
    return SeawaterUraniumExtractionEngine.simulateCampaign({
      adsorbentBraidsTotalTons: adsorbentTons,
      oceanCurrentVelocityMS: oceanVelocityMS,
      seawaterTemperatureC: seawaterTempC,
      immersionDurationDays: immersionDays,
      selectedAdsorbentId,
      desorptionPulseVoltageV
    });
  }, [adsorbentTons, oceanVelocityMS, seawaterTempC, immersionDays, selectedAdsorbentId, desorptionPulseVoltageV]);

  const kinetics = useMemo(() => {
    return SeawaterUraniumExtractionEngine.calculateAdsorptionUptake(
      selectedAdsorbent,
      immersionDays,
      oceanVelocityMS,
      seawaterTempC
    );
  }, [selectedAdsorbent, immersionDays, oceanVelocityMS, seawaterTempC]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Trữ Lượng Biển 4.5 Tỷ Tấn U
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Zero Quặng Đuôi Đất Liền
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Giải Hấp Điện Hóa Xung 50+ Vòng
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Anchor className="w-6 h-6 text-cyan-400" />
            Khai Thác Urani Từ Nước Biển (Seawater Uranium Extraction & Elution)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Bẫy chọn lọc ion Uranyl [UO₂(CO₃)₃]⁴⁻ (3.3 ppb) bằng sợi bện Polyacrylamidoxime trong hải lưu tự nhiên và giải hấp tái sinh bằng xung điện thế nhẹ. Nguồn nhiên liệu hạt nhân bền vững cho 10,000 năm.
          </p>
        </div>

        {/* Quick KPI Badge */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3 text-right">
          <div className="text-xs text-slate-400 font-medium">Sản Lượng Urani Thu Hoạch / Năm</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {campaignResults.annualUraniumHarvestTons} <span className="text-xs text-slate-400 font-normal">tấn U / năm</span>
          </div>
          <div className="text-xs text-cyan-400 flex items-center justify-end gap-1 mt-0.5">
            <Atom className="w-3 h-3" /> Tương đương {campaignResults.nuclearElectricityPotentialTWhYear} TWh điện hạt nhân sạch
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 my-5">
        <button
          onClick={() => setActiveTab('flowsheet')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'flowsheet'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Sơ Đồ Dàn Neo Sợi Đại Dương & Tách Urani
        </button>
        <button
          onClick={() => setActiveTab('kinetics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'kinetics'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Động Học Tạo Phức Uranyl & Giải Hấp Điện Hóa
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Khai Thác Biển vs Đất Liền & Trữ Lượng 4.5 Tỷ Tấn
        </button>
      </div>

      {/* TAB 1: Sơ Đồ Dàn Neo Sợi Đại Dương & Tách Urani */}
      {activeTab === 'flowsheet' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Factory className="w-4 h-4 text-cyan-400" />
              Sơ Đồ Chu Trình Khép Kín Khai Thác Urani Đại Dương & Tái Sinh Sợi 50 Vòng
            </h3>

            {/* Dynamic SVG Flowsheet */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 940 400" className="w-full min-w-[780px] h-auto">
                <defs>
                  <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* 1. Ocean Water Field */}
                <rect x="30" y="60" width="360" height="270" rx="12" fill="url(#oceanGrad)" stroke="#0284c7" strokeWidth="2" />
                <text x="210" y="90" fill="#bae6fd" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Dòng Hải Lưu Tự Nhiên (V = {oceanVelocityMS} m/s)
                </text>
                <text x="210" y="108" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                  Nồng độ Urani: 3.3 ppb dạng [UO₂(CO₃)₃]⁴⁻ | T = {seawaterTempC}°C
                </text>

                {/* Waves & Flow Arrows */}
                <path d="M 45 130 Q 90 120 135 130 T 225 130 T 315 130 T 375 130" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 45 160 Q 90 150 135 160 T 225 160 T 315 160 T 375 160" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.6" />

                {/* Suspended Braided Amidoxime Fibers */}
                <rect x="120" y="140" width="15" height="150" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="170" y="140" width="15" height="150" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="220" y="140" width="15" height="150" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="270" y="140" width="15" height="150" rx="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Mooring anchor line */}
                <line x1="80" y1="310" x2="330" y2="310" stroke="#64748b" strokeWidth="4" />
                <text x="210" y="325" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Dàn Neo Cố Định Dưới Đáy Biển ({adsorbentTons} Tấn Sợi Bện Amidoxime)
                </text>

                {/* Current Arrows */}
                <path d="M 50 200 L 90 200" stroke="#ffffff" strokeWidth="2" />
                <polygon points="90,200 80,195 80,205" fill="#ffffff" />
                <text x="70" y="220" fill="#ffffff" fontSize="9" textAnchor="middle">Hải Lưu</text>

                {/* 2. Fiber Retrieval Line to Shore Plant */}
                <path d="M 390 170 L 460 170" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <polygon points="460,170 450,165 450,175" fill="#f59e0b" />
                <text x="425" y="155" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Thu Vớt ({immersionDays} ngày)
                </text>
                <text x="425" y="185" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  {campaignResults.uraniumHarvestedPerCycleKg} kg U / mẻ
                </text>

                {/* 3. Pulsed Electrochemical Elution Cell */}
                <rect x="470" y="70" width="180" height="250" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                <text x="560" y="100" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">Bể Giải Hấp Điện Hóa Xung</text>
                <text x="560" y="118" fill="#a5b4fc" fontSize="9" textAnchor="middle">Pulsed Potential (E = {desorptionPulseVoltageV} V)</text>

                {/* Electrodes inside cell */}
                <rect x="500" y="135" width="12" height="130" rx="2" fill="#ef4444" opacity="0.8" />
                <text x="506" y="200" fill="#ffffff" fontSize="8" textAnchor="middle" transform="rotate(-90 506 200)">Cathode</text>

                <rect x="550" y="135" width="20" height="130" rx="3" fill="#fbbf24" opacity="0.8" />
                <text x="560" y="200" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 560 200)">Sợi Urani</text>

                <rect x="610" y="135" width="12" height="130" rx="2" fill="#3b82f6" opacity="0.8" />
                <text x="616" y="200" fill="#ffffff" fontSize="8" textAnchor="middle" transform="rotate(-90 616 200)">Anode</text>

                <text x="560" y="290" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Hiệu Suất Tách: {campaignResults.elutionRecoveryPercent}%
                </text>
                <text x="560" y="308" fill="#94a3b8" fontSize="8" textAnchor="middle">Không Dùng Axit Ăn Mòn - Bảo Vệ Sợi</text>

                {/* 4. Regenerated Fiber Recycling Line Back to Ocean */}
                <path d="M 560 320 L 560 360 L 210 360 L 210 330" stroke="#10b981" strokeWidth="2.5" fill="none" strokeDasharray="5 3" />
                <polygon points="210,330 206,340 214,340" fill="#10b981" />
                <text x="385" y="375" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ← Tái Sinh Sợi Hoàn Lưu Ra Biển (Vòng Đời: {selectedAdsorbent.regenerationCyclesLifetime} Mẻ Thu Hoạch)
                </text>

                {/* 5. Uranyl Solution to Yellowcake Precipitation */}
                <path d="M 650 170 L 720 170" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <polygon points="720,170 710,165 710,175" fill="#f59e0b" />
                <text x="685" y="160" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">UO₂²⁺ Dung Dịch</text>

                {/* 6. Yellowcake Precipitation Tank */}
                <rect x="730" y="80" width="180" height="230" rx="10" fill="#422006" stroke="#eab308" strokeWidth="2" />
                <text x="820" y="110" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">Kết Tủa Bánh Vàng</text>
                <text x="820" y="128" fill="#fde047" fontSize="10" textAnchor="middle">(NH₄)₂U₂O₇ (Yellowcake)</text>

                <circle cx="820" cy="180" r="30" fill="#eab308" opacity="0.8" />
                <text x="820" y="185" fill="#422006" fontSize="16" fontWeight="bold" textAnchor="middle">U</text>

                <text x="820" y="235" fill="#fef9c3" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {campaignResults.yellowcakeProductKgYear.toLocaleString()} kg/năm
                </text>
                <text x="820" y="255" fill="#fef08a" fontSize="9" textAnchor="middle">Nhiên Liệu Lò Hạt Nhân Sạch</text>
                <text x="820" y="280" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {campaignResults.nuclearElectricityPotentialTWhYear} TWh Điện Sạch
                </text>
              </svg>
            </div>

            {/* Bottom KPI metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Sản lượng mẻ thu hoạch:</span>
                <span className="text-sm font-bold text-amber-400">{campaignResults.uraniumHarvestedPerCycleKg} kg U / mẻ</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Sức hấp phụ thực tế (q_t):</span>
                <span className="text-sm font-bold text-cyan-400">{kinetics.uptakeMgUG} mg U / g sợi</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Chi phí sản xuất bình quân:</span>
                <span className="text-sm font-bold text-emerald-400">${campaignResults.productionCostDollarPerKgU} / kg U</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Quặng đuôi độc hại tránh được:</span>
                <span className="text-sm font-bold text-emerald-400">{campaignResults.avoidedMiningTailingsTonsYear.toLocaleString()} tấn / năm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Động Học Tạo Phức Uranyl & Giải Hấp Điện Hóa */}
      {activeTab === 'kinetics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Sliders */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                Thông Số Sợi Hấp Phụ & Điều Kiện Đại Dương
              </h3>

              {/* Adsorbent Selector */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Lựa Chọn Vật Liệu Sợi Hấp Phụ:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ADSORBENT_CATALOG.map((fiber) => (
                    <button
                      key={fiber.id}
                      onClick={() => setSelectedAdsorbentId(fiber.id)}
                      className={`p-2.5 rounded text-left text-xs font-medium border transition-colors ${
                        selectedAdsorbentId === fiber.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-white line-clamp-1">{fiber.name}</div>
                      <div className="text-[10px] text-slate-400">q_e: {fiber.equilibriumCapacityMgUG} mg/g | T_half: {fiber.adsorptionHalfLifeDays}d</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Immersion Days Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Thời gian ngâm sợi ngoài biển:</span>
                  <span className="text-amber-400 font-bold">{immersionDays} Ngày</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="70"
                  step="2"
                  value={immersionDays}
                  onChange={(e) => setImmersionDays(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Đạt {(kinetics.fractionOfEquilibrium * 100).toFixed(0)}% sức chứa cân bằng cực đại</span>
              </div>

              {/* Seawater Temp Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Nhiệt độ nước biển:</span>
                  <span className="text-rose-400 font-bold">{seawaterTempC.toFixed(1)}°C</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="30"
                  step="1"
                  value={seawaterTempC}
                  onChange={(e) => setSeawaterTempC(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Phản ứng tạo phức Uranyl thu nhiệt (ΔH &gt; 0, nhiệt độ cao tăng hấp phụ)</span>
              </div>

              {/* Ocean Velocity Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Vận tốc dòng hải lưu qua dàn sợi:</span>
                  <span className="text-cyan-400 font-bold">{oceanVelocityMS.toFixed(2)} m/s</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="1.00"
                  step="0.05"
                  value={oceanVelocityMS}
                  onChange={(e) => setOceanVelocityMS(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Hải lưu tự nhiên giúp khuấy trộn đối lưu mà không cần bơm tuần hoàn</span>
              </div>
            </div>

            {/* Chelation & Desorption Physics Panel */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                  <Atom className="w-5 h-5 text-indigo-400" />
                  Hóa Học Tạo Phức Uranyl & Giải Hấp Bằng Xung Điện
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Sức hấp phụ thực tế (q_t):</span>
                    <span className="font-mono font-bold text-amber-400">{kinetics.uptakeMgUG} mg U / g sợi</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Điện thế xung giải hấp (Pulse Potential):</span>
                    <span className="font-mono font-bold text-cyan-400">{desorptionPulseVoltageV} V (vs Ag/AgCl)</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Thời gian giải hấp điện hóa:</span>
                    <span className="font-mono font-bold text-emerald-400">&lt; 15 Phút (so với 24h ngâm axit)</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Số vòng đời tái sử dụng sợi bện:</span>
                    <span className="font-mono font-bold text-indigo-300">{selectedAdsorbent.regenerationCyclesLifetime} Vòng đời biển</span>
                  </div>
                </div>

                {/* Progress bar to equilibrium */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Mức Độ Bão Hòa Sợi Hấp Phụ:</span>
                    <span className="font-bold text-cyan-400">{(kinetics.fractionOfEquilibrium * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-cyan-400 h-full transition-all duration-300"
                      style={{ width: `${kinetics.fractionOfEquilibrium * 100}%` }}
                    />
                    <div
                      className="bg-slate-700/80 h-full"
                      style={{ width: `${(1 - kinetics.fractionOfEquilibrium) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Chemical reaction badge */}
              <div className="mt-4 p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300 leading-relaxed font-mono">
                [UO₂(CO₃)₃]⁴⁻ + 2 R-C(=N-OH)NH₂ ⇌ [UO₂(Amidoxime)₂] + 3 CO₃²⁻ <br />
                Giải hấp điện hóa xung: Áp thế -0.65 V làm giảm lực liên kết chelate, phóng thích ion UO₂²⁺ nguyên vẹn mà không phá vỡ khung polime sợi.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Khai Thác Biển vs Đất Liền & Trữ Lượng 4.5 Tỷ Tấn */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Globe className="w-5 h-5 text-emerald-400" />
              So Sánh Môi Trường: Khai Thác Biển Thụ Động vs Mỏ Quặng Đất Liền
            </h3>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Nguồn Khai Thác Urani</th>
                    <th className="p-3 text-center">Trữ Lượng Toàn Cầu</th>
                    <th className="p-3 text-center">Hàm Lượng (Grade)</th>
                    <th className="p-3 text-center">Quặng Đuôi Độc Hại</th>
                    <th className="p-3 text-center">Thời Gian Khai Thác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {TERRESTRIAL_VS_MARINE_COMPARISON.map((source) => (
                    <tr
                      key={source.source}
                      className={source.source === 'Seawater_Extraction' ? 'bg-cyan-950/30 font-bold text-white' : 'hover:bg-slate-900/50'}
                    >
                      <td className="p-3 flex items-center gap-2">
                        {source.source === 'Seawater_Extraction' && <Anchor className="w-3.5 h-3.5 text-cyan-400" />}
                        {source.vietnameseName}
                      </td>
                      <td className="p-3 text-center text-emerald-400">{(source.reserveTonnes / 1e6).toFixed(1)} Triệu Tấn</td>
                      <td className="p-3 text-center">{source.gradePpm} ppm</td>
                      <td className="p-3 text-center text-rose-400">{source.tailingsWasteTonsPerKgU} kg / kg U</td>
                      <td className="p-3 text-center text-cyan-300">{source.longevityYears.toLocaleString()} Năm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Farm Scale Slider & Long-Term Nuclear Grid Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Quy mô dàn neo sợi hấp phụ biển:</span>
                    <span className="text-cyan-400 font-bold">{adsorbentTons.toLocaleString()} Tấn Sợi</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={adsorbentTons}
                    onChange={(e) => setAdsorbentTons(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>100 Tấn (Thí điểm ven biển)</span>
                    <span>500 Tấn (Cụm thương mại)</span>
                    <span>2,000 Tấn (Hạm đội đại dương)</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thể tích nước biển lọc tương đương:</span>
                    <span className="font-mono font-bold text-cyan-400">{campaignResults.seawaterFilteredEquivalentKm3} km³ nước biển</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sản lượng bánh vàng Yellowcake:</span>
                    <span className="font-mono font-bold text-amber-400">{campaignResults.yellowcakeProductKgYear.toLocaleString()} kg / năm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Điện hạt nhân sạch tạo ra:</span>
                    <span className="font-mono font-bold text-emerald-400">{campaignResults.nuclearElectricityPotentialTWhYear} TWh / năm</span>
                  </div>
                </div>
              </div>

              {/* Economic Cost Breakdown */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Cơ Cấu Giá Thành Urani Nước Biển ($/kg U)
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Khấu hao vật liệu sợi hấp phụ:</span>
                      <span className="font-mono font-bold text-slate-200">${(campaignResults.productionCostDollarPerKgU * 0.24).toFixed(1)} / kg U</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vận hành tàu biển & thu thả neo:</span>
                      <span className="font-mono font-bold text-slate-200">$110.0 / kg U</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Giải hấp điện hóa xung & đệm muối:</span>
                      <span className="font-mono font-bold text-slate-200">$28.0 / kg U</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kết tủa bánh vàng & sấy:</span>
                      <span className="font-mono font-bold text-slate-200">$18.0 / kg U</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-700 font-bold">
                      <span className="text-emerald-400">Tổng Chi Phí Sản Xuất:</span>
                      <span className="text-emerald-400 font-mono text-base">${campaignResults.productionCostDollarPerKgU} / kg U</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-xs text-emerald-400 font-medium">
                  Trữ lượng 4.5 tỷ tấn Urani hòa tan trong đại dương bảo đảm an ninh năng lượng hạt nhân toàn cầu trong hơn 10 thiên niên kỷ!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeawaterUraniumVisualizer;
