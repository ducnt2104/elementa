// src/components/visualizations/AtmosphericPhotochemistryVisualizer.tsx
// Interactive Visualizer: Atmospheric Photochemistry, Stratospheric Ozone, Smog & FGD
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & QCVN 19:2009/BTNMT

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Shield,
  ShieldAlert,
  Wind,
  CloudRain,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Factory,
  Zap,
  Sparkles,
  Info,
  Clock,
  Layers,
  Thermometer,
  Eye,
  RefreshCw
} from 'lucide-react';
import {
  CHAPMAN_CYCLE_STEPS,
  CFC_CATALYTIC_MECHANISM,
  simulateStratosphericOzone,
  SMOG_REACTION_NETWORK,
  generatePhotochemicalSmogDiurnalProfile,
  ACID_RAIN_REACTIONS,
  evaluateAcidRainImpact,
  simulateFlueGasDesulfurization
} from '../../domain/atmosphericPhotochemistryEngine';
import { sound } from '../../audio/soundEngine';

type AtmosphericTabMode = 'STRATOSPHERIC_OZONE_CHAPMAN' | 'PHOTOCHEMICAL_SMOG_DIURNAL' | 'ACID_RAIN_FGD_SCRUBBER';

export const AtmosphericPhotochemistryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AtmosphericTabMode>('STRATOSPHERIC_OZONE_CHAPMAN');

  // Mode 1: Stratospheric Ozone State
  const [uvcSolarFlux, setUvcSolarFlux] = useState<number>(100);
  const [cfcConcentration, setCfcConcentration] = useState<number>(250);
  const [antarcticVortexActive, setAntarcticVortexActive] = useState<boolean>(false);
  const [selectedChapmanStepId, setSelectedChapmanStepId] = useState<string>('O3_UVB_ABSORPTION');

  // Mode 2: Photochemical Smog State
  const [simulatedHour, setSimulatedHour] = useState<number>(14);
  const [trafficDensityFactor, setTrafficDensityFactor] = useState<number>(1.2);
  const [solarRadiationFactor, setSolarRadiationFactor] = useState<number>(1.0);

  // Mode 3: Acid Rain & FGD Scrubber State
  const [rainPh, setRainPh] = useState<number>(4.2);
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(1800);
  const [so2InletPpm, setSo2InletPpm] = useState<number>(1800);
  const [slurryFlowRateLpm, setSlurryFlowRateLpm] = useState<number>(500);
  const [slurryPh, setSlurryPh] = useState<number>(5.8);

  // Memoized calculations
  const ozoneResult = useMemo(() => {
    return simulateStratosphericOzone(uvcSolarFlux, cfcConcentration, antarcticVortexActive);
  }, [uvcSolarFlux, cfcConcentration, antarcticVortexActive]);

  const selectedChapmanStep = useMemo(() => {
    return CHAPMAN_CYCLE_STEPS.find(s => s.id === selectedChapmanStepId) || CHAPMAN_CYCLE_STEPS[2];
  }, [selectedChapmanStepId]);

  const smogDiurnalProfile = useMemo(() => {
    return generatePhotochemicalSmogDiurnalProfile(trafficDensityFactor, solarRadiationFactor);
  }, [trafficDensityFactor, solarRadiationFactor]);

  const currentHourSmog = useMemo(() => {
    return smogDiurnalProfile[simulatedHour] || smogDiurnalProfile[14];
  }, [smogDiurnalProfile, simulatedHour]);

  const acidRainResult = useMemo(() => {
    return evaluateAcidRainImpact(rainPh, annualRainfallMm);
  }, [rainPh, annualRainfallMm]);

  const fgdResult = useMemo(() => {
    return simulateFlueGasDesulfurization(so2InletPpm, slurryFlowRateLpm, slurryPh);
  }, [so2InletPpm, slurryFlowRateLpm, slurryPh]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sun className="w-4 h-4 text-sky-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Khí Quyển & Bảo Vệ Môi Trường (Lớp 10 & 11)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Quang Hóa Khí Quyển, Chu Trình Chapman, Khói Mù Đô Thị & Khử Mưa Axit (FGD)
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Nghiên cứu cân bằng động lá chắn Ozone tầng bình lưu và xúc tác suy thoái bởi hợp chất CFCs,
              chu trình biến thiên nồng độ quang hóa khói mù (NO/NO₂/O₃/PAN), và tháp hấp thụ khử SO₂ đạt chuẩn QCVN 19:2009/BTNMT.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-sky-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('STRATOSPHERIC_OZONE_CHAPMAN');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'STRATOSPHERIC_OZONE_CHAPMAN'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Ozone Tầng Bình Lưu & CFCs</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('PHOTOCHEMICAL_SMOG_DIURNAL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'PHOTOCHEMICAL_SMOG_DIURNAL'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Khói Mù Quang Hóa (AQI/O₃)</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('ACID_RAIN_FGD_SCRUBBER');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'ACID_RAIN_FGD_SCRUBBER'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Mưa Axit & Tháp Khử SO₂</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: STRATOSPHERIC OZONE LAYER, CHAPMAN CYCLE & CFC HOLE               */}
      {/* ========================================================================= */}
      {activeTab === 'STRATOSPHERIC_OZONE_CHAPMAN' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Interactive Atmosphere & Ozone Column SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  <h3 className="font-bold text-ivory text-base">
                    Mô Hình Khí Quyển Trái Đất & Khiên Chắn Ozone Tầng Bình Lưu (15 - 35 km)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    ozoneResult.isOzoneHole
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  }`}>
                    {ozoneResult.isOzoneHole ? 'LỖ THỦNG OZONE (< 220 DU)' : 'KHIÊN OZONE ỔN ĐỊNH'}
                  </span>
                </div>
              </div>

              {/* Dynamic Stratosphere SVG */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 700 380" className="w-full h-auto max-h-[380px]">
                  <defs>
                    <linearGradient id="spaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#030712" />
                      <stop offset="40%" stopColor="#0b1329" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>

                    <linearGradient id="ozoneLayerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity={ozoneResult.totalOzoneDu / 400} />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity={ozoneResult.totalOzoneDu / 300} />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity={ozoneResult.totalOzoneDu / 400} />
                    </linearGradient>

                    <linearGradient id="earthSurfaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                  </defs>

                  {/* Deep Space Background */}
                  <rect x="0" y="0" width="700" height="380" fill="url(#spaceGradient)" rx="12" />

                  {/* Sun in Space */}
                  <circle cx="90" cy="50" r="32" fill="#fbbf24" opacity="0.9" />
                  <circle cx="90" cy="50" r="44" fill="#f59e0b" opacity="0.25" />
                  <text x="90" y="55" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">MẶT TRỜI</text>

                  {/* UV-C and UV-B Solar Rays */}
                  <path d="M125 60 L240 110" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
                  <text x="175" y="80" fill="#fda4af" fontSize="10" fontWeight="bold">UV-C (λ &lt; 242 nm)</text>

                  <path d="M130 75 L380 180" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="230" y="115" fill="#fde68a" fontSize="10" fontWeight="bold">UV-B (280 - 315 nm)</text>

                  {/* Mesosphere / Thermosphere Label */}
                  <text x="670" y="45" textAnchor="end" fill="#64748b" fontSize="10">Tầng trung lưu &gt; 50 km</text>

                  {/* Stratosphere Ozone Layer (15 km - 35 km) */}
                  <rect
                    x="40"
                    y="130"
                    width="620"
                    height="90"
                    fill="url(#ozoneLayerGradient)"
                    rx="16"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text x="350" y="155" textAnchor="middle" fill="#e0f2fe" fontSize="13" fontWeight="bold">
                    TẦNG BÌNH LƯU (STRATOSPHERE 15 - 35 km) · KHIÊN OZONE
                  </text>
                  <text x="350" y="175" textAnchor="middle" fill="#bae6fd" fontSize="11">
                    Chu trình Chapman cân bằng: O₂ + hν ⇌ O₃ (Độ dày hiện tại: {ozoneResult.totalOzoneDu} Dobson Units)
                  </text>

                  {/* Active Chlorine Catalytic Depletion particles if CFCs > 100 */}
                  {cfcConcentration > 100 && (
                    <g>
                      <circle cx="180" cy="190" r="6" fill="#ef4444" />
                      <text x="180" y="180" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">Cl•</text>
                      <circle cx="270" cy="195" r="7" fill="#ef4444" />
                      <text x="270" y="185" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">ClO•</text>
                      <text x="225" y="210" textAnchor="middle" fill="#f87171" fontSize="9">
                        1 Cl• phá hủy 100,000 phân tử O₃
                      </text>
                    </g>
                  )}

                  {/* Polar Stratospheric Clouds (PSC) if Antarctic Vortex Active */}
                  {antarcticVortexActive && (
                    <g>
                      <ellipse cx="530" cy="180" rx="65" ry="22" fill="#c7d2fe" opacity="0.75" />
                      <text x="530" y="178" textAnchor="middle" fill="#312e81" fontSize="9" fontWeight="bold">
                        Mây Nam Cực PSC (T &lt; 195 K)
                      </text>
                      <text x="530" y="192" textAnchor="middle" fill="#3730a3" fontSize="8">
                        HCl + ClONO₂ → Cl₂↑
                      </text>
                    </g>
                  )}

                  {/* Troposphere (0 - 12 km) */}
                  <rect x="40" y="240" width="620" height="60" fill="#0f172a" opacity="0.8" rx="8" />
                  <text x="350" y="260" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    Tầng đối lưu (Troposphere 0 - 12 km) · Máy bay chở khách &amp; Thời tiết
                  </text>

                  {/* UV-B penetration rays through ozone layer */}
                  <path
                    d="M380 180 L420 310"
                    stroke="#f59e0b"
                    strokeWidth={Math.max(1, ozoneResult.uvbTransmittancePercent / 8)}
                    opacity={Math.min(1, 0.2 + ozoneResult.uvbTransmittancePercent / 40)}
                  />
                  <text x="440" y="285" fill="#fcd34d" fontSize="9" fontWeight="bold">
                    UV-B xuyên: {ozoneResult.uvbTransmittancePercent}%
                  </text>

                  {/* Earth Surface Curved Horizon */}
                  <path d="M20 340 Q350 315 680 340 L680 380 L20 380 Z" fill="url(#earthSurfaceGradient)" />
                  <text x="350" y="355" textAnchor="middle" fill="#dcfce7" fontSize="12" fontWeight="bold">
                    BỀ MẶT TRÁI ĐẤT &amp; SINH QUYỂN (SINH VẬT &amp; CON NGƯỜI)
                  </text>
                  <text x="350" y="370" textAnchor="middle" fill="#86efac" fontSize="9">
                    Bức xạ UV-B mặt đất: {ozoneResult.uvbIrradianceWm2} W/m² (Mức nguy hại ADN: {ozoneResult.dnaDamageRisk})
                  </text>
                </svg>
              </div>
            </div>

            {/* Environmental Warning Card */}
            <div className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 ${
              ozoneResult.isOzoneHole
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                : 'bg-sky-950/40 border-sky-500/40 text-sky-200'
            }`}>
              {ozoneResult.isOzoneHole ? (
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <span className="font-bold">{ozoneResult.environmentalNoticeVi}</span>
                <p className="text-ivory-muted">
                  Nghị định thư Montreal 1987 cấm sử dụng hoàn toàn chlorofluorocarbons (CFCs), bảo vệ thành công tầng Ozone hồi phục về mức trước năm 1980.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Parameters & Chapman Cycle Steps */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quantitative Sliders */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>Tham Số Bức Xạ &amp; Hóa Chất Làm Suy Thoái</span>
                </h4>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setUvcSolarFlux(100);
                    setCfcConcentration(250);
                    setAntarcticVortexActive(false);
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Mặc định</span>
                </button>
              </div>

              {/* Slider 1: UV-C Solar Flux */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Cường độ bức xạ UV-C mặt trời:</span>
                  <span className="font-bold text-amber-400">{uvcSolarFlux}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={uvcSolarFlux}
                  onChange={(e) => setUvcSolarFlux(+e.target.value)}
                  className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 2: CFC Concentration */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Nồng độ Freon CFC-12 khí quyển:</span>
                  <span className="font-bold text-rose-400">{cfcConcentration} ppt</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="600"
                  step="20"
                  value={cfcConcentration}
                  onChange={(e) => setCfcConcentration(+e.target.value)}
                  className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[11px] text-ivory-subtle block">
                  Đỉnh điểm lịch sử trước Nghị định thư Montreal: ~500 ppt; Hiện tại: ~200-250 ppt.
                </span>
              </div>

              {/* Toggle: Antarctic Polar Vortex */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-ivory block">Lốc xoáy cực Nam (Antarctic Polar Vortex)</span>
                  <span className="text-[11px] text-ivory-muted">Xúc tác dị thể trên tinh thể băng mây bình lưu PSC (T &lt; 195 K)</span>
                </div>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setAntarcticVortexActive(!antarcticVortexActive);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    antarcticVortexActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/40 ring-2 ring-rose-400'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {antarcticVortexActive ? 'ĐANG KÍCH HOẠT' : 'TẮT'}
                </button>
              </div>
            </div>

            {/* Chapman 4-Step Cycle Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>4 Bước Trong Chu Trình Quang Hóa Chapman (1930)</span>
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {CHAPMAN_CYCLE_STEPS.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedChapmanStepId(step.id);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedChapmanStepId === step.id
                        ? 'bg-sky-950/80 border-sky-400 text-sky-200 shadow-md ring-1 ring-sky-400'
                        : 'bg-slate-800/60 border-slate-700/60 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-sky-400 block mb-0.5">
                      Bước {idx + 1}
                    </span>
                    <span className="text-xs font-bold leading-tight block line-clamp-1">
                      {step.nameVi}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Step Explanation Card */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-300 text-sm">{selectedChapmanStep.nameVi}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedChapmanStep.enthalpyChangeKj > 0
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40'
                      : 'bg-cyan-950/80 text-cyan-300 border border-cyan-600/40'
                  }`}>
                    ΔH = {selectedChapmanStep.enthalpyChangeKj > 0 ? '+' : ''}{selectedChapmanStep.enthalpyChangeKj} kJ/mol
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded font-mono text-emerald-400 text-xs border border-slate-800">
                  {selectedChapmanStep.chemicalEquationVi}
                </div>
                <div className="text-ivory-muted">
                  <strong className="text-ivory">Điều kiện năng lượng:</strong> {selectedChapmanStep.wavelengthConditionVi}
                </div>
                <div className="text-ivory-muted">
                  <strong className="text-ivory">Ý nghĩa sinh học:</strong> {selectedChapmanStep.biologicalRoleVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: PHOTOCHEMICAL SMOG DIURNAL SIMULATOR (0H - 24H)                   */}
      {/* ========================================================================= */}
      {activeTab === 'PHOTOCHEMICAL_SMOG_DIURNAL' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Panel: Timeline Slider & City Skyline Visualization */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Wind className="w-5 h-5 text-amber-400" />
                  <span>Diễn Biến Chu Trình Ngày Đêm Khói Mù Quang Hóa Los Angeles</span>
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Phát thải giao thông buổi sáng (NO, VOC) chuyển hóa dưới bức xạ cực tím buổi trưa tạo ra khí nâu đỏ NO₂
                  và đỉnh điểm Ozone mặt đất (O₃) cùng chất gây cay mắt PAN vào đầu giờ chiều.
                </p>
              </div>

              {/* Current AQI Badge */}
              <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Chỉ Số Ô Nhiễm (AQI)</span>
                  <span className={`text-xl font-extrabold ${
                    currentHourSmog.aqiCategory === 'GOOD' ? 'text-emerald-400' :
                    currentHourSmog.aqiCategory === 'MODERATE' ? 'text-yellow-400' :
                    currentHourSmog.aqiCategory === 'UNHEALTHY_SENSITIVE' ? 'text-amber-400' :
                    currentHourSmog.aqiCategory === 'UNHEALTHY' ? 'text-rose-400' :
                    currentHourSmog.aqiCategory === 'VERY_UNHEALTHY' ? 'text-purple-400' : 'text-red-500'
                  }`}>
                    {currentHourSmog.aqi}
                  </span>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  currentHourSmog.aqiCategory === 'GOOD' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' :
                  currentHourSmog.aqiCategory === 'MODERATE' ? 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40' :
                  currentHourSmog.aqiCategory === 'UNHEALTHY_SENSITIVE' ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' :
                  currentHourSmog.aqiCategory === 'UNHEALTHY' ? 'bg-rose-950/80 text-rose-300 border-rose-500/40' :
                  'bg-purple-950/80 text-purple-300 border-purple-500/40'
                }`}>
                  {currentHourSmog.aqiCategory}
                </div>
              </div>
            </div>

            {/* Timeline Scrubber */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ivory flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Thời Điểm Trong Ngày: {String(simulatedHour).padStart(2, '0')}:00</span>
                </span>
                <span className="text-ivory-muted">
                  Bức xạ mặt trời: <strong className="text-amber-400">{currentHourSmog.sunlightIntensityPercent}%</strong>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={simulatedHour}
                onChange={(e) => setSimulatedHour(+e.target.value)}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                <span>00:00 (Đêm)</span>
                <span>06:00 (Bình minh)</span>
                <span>08:00 (Giờ cao điểm)</span>
                <span>12:00 (Trưa nắng)</span>
                <span>15:00 (Đỉnh Ozone)</span>
                <span>18:00 (Hoàng hôn)</span>
                <span>24:00 (Đêm)</span>
              </div>
            </div>

            {/* City Skyline SVG with dynamic smog haze */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 750 260" className="w-full h-auto max-h-[260px]">
                {/* Sky Color mapped to time of day */}
                <rect
                  x="0"
                  y="0"
                  width="750"
                  height="260"
                  fill={
                    simulatedHour >= 6 && simulatedHour <= 18
                      ? '#38bdf8' // daytime blue
                      : '#0f172a' // night dark
                  }
                  rx="10"
                />

                {/* Sun or Moon */}
                {simulatedHour >= 6 && simulatedHour <= 18 ? (
                  <circle
                    cx={150 + ((simulatedHour - 6) / 12) * 450}
                    cy={160 - Math.sin(((simulatedHour - 6) / 12) * Math.PI) * 110}
                    r="24"
                    fill="#fbbf24"
                    opacity="0.9"
                  />
                ) : (
                  <circle cx="620" cy="50" r="18" fill="#e2e8f0" opacity="0.8" />
                )}

                {/* Photochemical Brown Smog Haze Overlay */}
                <rect
                  x="0"
                  y="0"
                  width="750"
                  height="260"
                  fill="#78350f" // brown NO2/PAN haze
                  opacity={currentHourSmog.hazeOpacityPercent / 120}
                  rx="10"
                />

                {/* City Buildings Silhouettes */}
                <path
                  d="M40 260 L40 140 L70 140 L70 170 L110 170 L110 120 L140 120 L140 190 L180 190 L180 110 L220 110 L220 260 Z"
                  fill="#1e293b"
                />
                <path
                  d="M230 260 L230 150 L270 150 L270 90 L310 90 L310 170 L350 170 L350 130 L390 130 L390 260 Z"
                  fill="#0f172a"
                />
                <path
                  d="M400 260 L400 120 L440 120 L440 80 L480 80 L480 160 L520 160 L520 140 L560 140 L560 260 Z"
                  fill="#1e293b"
                />
                <path
                  d="M570 260 L570 160 L610 160 L610 110 L650 110 L650 180 L710 180 L710 260 Z"
                  fill="#0f172a"
                />

                {/* Highway traffic emissions dots at bottom */}
                <rect x="0" y="240" width="750" height="20" fill="#334155" />
                <circle cx="120" cy="250" r="3" fill="#f87171" />
                <circle cx="280" cy="250" r="3" fill="#f87171" />
                <circle cx="450" cy="250" r="3" fill="#f87171" />
                <circle cx="620" cy="250" r="3" fill="#f87171" />

                {/* On-screen Telemetry Overlay */}
                <text x="375" y="40" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                  BẦU TRỜI ĐÔ THỊ LÚC {String(simulatedHour).padStart(2, '0')}:00 · ĐỘ MỜ KHÓI QUANG HÓA: {currentHourSmog.hazeOpacityPercent}%
                </text>
                <text x="375" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="11">
                  [O₃]: {currentHourSmog.o3ConcentrationPpb} ppb | [PAN]: {currentHourSmog.panConcentrationPpb} ppb | [NO₂]: {currentHourSmog.no2ConcentrationPpb} ppb
                </text>
              </svg>
            </div>
          </div>

          {/* Bottom Panel: 5 Real-Time Pollutant Meters & Health Advisory */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* NO */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block">Chất Sơ Cấp (Giao Thông)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-extrabold text-ivory text-xl">NO</span>
                <span className="text-cyan-300 font-bold text-sm">{currentHourSmog.noConcentrationPpb} ppb</span>
              </div>
              <p className="text-[11px] text-ivory-subtle mt-1">Đạt đỉnh lúc 07:00 - 08:00 giờ cao điểm sáng.</p>
            </div>

            {/* NO2 */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-amber-400 uppercase block">Khí Nâu Đỏ (Trung Gian)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-extrabold text-ivory text-xl">NO₂</span>
                <span className="text-amber-300 font-bold text-sm">{currentHourSmog.no2ConcentrationPpb} ppb</span>
              </div>
              <p className="text-[11px] text-ivory-subtle mt-1">Quang phân dưới ánh nắng (λ &lt; 420 nm) tạo nguyên tử O.</p>
            </div>

            {/* VOCs */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-orange-400 uppercase block">Hợp Chất Hữu Cơ Dễ Bay Hơi</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-extrabold text-ivory text-xl">VOCs</span>
                <span className="text-orange-300 font-bold text-sm">{currentHourSmog.vocConcentrationPpb} ppb</span>
              </div>
              <p className="text-[11px] text-ivory-subtle mt-1">Tạo gốc peoxy RO₂• oxy hóa NO mà không tiêu hao O₃.</p>
            </div>

            {/* O3 Ground */}
            <div className="bg-slate-900/90 border border-rose-800/40 p-4 rounded-xl bg-gradient-to-b from-rose-950/20 to-transparent">
              <span className="text-[10px] font-mono text-rose-400 uppercase block">Ozone Mặt Đất (Thứ Cấp Độc)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-extrabold text-rose-300 text-xl">O₃</span>
                <span className="text-rose-400 font-bold text-sm">{currentHourSmog.o3ConcentrationPpb} ppb</span>
              </div>
              <p className="text-[11px] text-rose-200/70 mt-1">Đạt đỉnh lúc 13:00 - 15:00 gây tổn thương phổi.</p>
            </div>

            {/* PAN */}
            <div className="bg-slate-900/90 border border-purple-800/40 p-4 rounded-xl bg-gradient-to-b from-purple-950/20 to-transparent">
              <span className="text-[10px] font-mono text-purple-400 uppercase block">Chất Gây Cay Mắt Lachrymator</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-extrabold text-purple-300 text-xl">PAN</span>
                <span className="text-purple-400 font-bold text-sm">{currentHourSmog.panConcentrationPpb} ppb</span>
              </div>
              <p className="text-[11px] text-purple-200/70 mt-1">Peroxyacetyl nitrate gây chảy nước mắt và hại thực vật.</p>
            </div>
          </div>

          {/* Health Advisory Banner */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-3">
            <Eye className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-ivory">Khuyến cáo sức khỏe theo QCVN 05:2023/BTNMT: </strong>
              <span className="text-ivory-muted">{currentHourSmog.healthAdvisoryVi}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: ACID RAIN KINETICS & WET LIMESTONE FGD SCRUBBER (QCVN 19)         */}
      {/* ========================================================================= */}
      {activeTab === 'ACID_RAIN_FGD_SCRUBBER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Acid Rain & Limestone Monument Weathering */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-emerald-400" />
                <span>Ăn Mòn Di Tích Kiến Trúc Đá Vôi (CaCO₃)</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                acidRainResult.rainPh < 4.5
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
              }`}>
                {acidRainResult.acidClassificationVi}
              </span>
            </div>

            {/* pH Slider */}
            <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Độ pH nước mưa:</span>
                <span className="font-bold text-emerald-400">pH = {rainPh.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="7.0"
                step="0.1"
                value={rainPh}
                onChange={(e) => setRainPh(+e.target.value)}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                <span>pH 2.5 (Cực độc)</span>
                <span>pH 4.0 (Axit mạnh)</span>
                <span>pH 5.6 (Mưa tự nhiên sạch)</span>
                <span>pH 7.0 (Trung tính)</span>
              </div>
            </div>

            {/* Monument Weathering SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 500 240" className="w-full h-auto max-h-[240px]">
                {/* Cloud & Falling Rain Drops */}
                <ellipse cx="250" cy="40" rx="90" ry="25" fill="#475569" opacity="0.8" />
                <ellipse cx="200" cy="45" rx="60" ry="20" fill="#64748b" opacity="0.9" />
                <ellipse cx="290" cy="45" rx="60" ry="20" fill="#64748b" opacity="0.9" />

                {/* Rain drops colored by acidity */}
                <line x1="180" y1="75" x2="175" y2="105" stroke={rainPh < 4.5 ? '#f43f5e' : '#38bdf8'} strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="75" x2="215" y2="105" stroke={rainPh < 4.5 ? '#f43f5e' : '#38bdf8'} strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="260" y1="75" x2="255" y2="105" stroke={rainPh < 4.5 ? '#f43f5e' : '#38bdf8'} strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="300" y1="75" x2="295" y2="105" stroke={rainPh < 4.5 ? '#f43f5e' : '#38bdf8'} strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Classical Limestone / Marble Column Monument */}
                <rect x="210" y="110" width="80" height="15" fill="#cbd5e1" rx="2" />
                <rect x="225" y="125" width="50" height="90" fill="#94a3b8" />
                <rect x="200" y="215" width="100" height="20" fill="#64748b" rx="2" />

                {/* Surface Pitting Corrosion overlay if pH < 5.0 */}
                {rainPh < 5.0 && (
                  <g>
                    <circle cx="235" cy="145" r="4" fill="#0f172a" opacity="0.7" />
                    <circle cx="260" cy="165" r="5" fill="#0f172a" opacity="0.7" />
                    <circle cx="240" cy="190" r="4" fill="#0f172a" opacity="0.7" />
                    <text x="250" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                      CaCO₃ + H₂SO₄ → CaSO₄ + CO₂↑
                    </text>
                  </g>
                )}

                {/* Telemetry */}
                <text x="380" y="150" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                  Tốc độ bào mòn:
                </text>
                <text x="380" y="170" fill="#38bdf8" fontSize="14" fontWeight="extrabold">
                  {acidRainResult.limestoneCorrosionRateMicronsPerYear} µm/năm
                </text>
                <text x="380" y="190" fill="#94a3b8" fontSize="9">
                  (Độ tan CaSO₄ gấp 100 lần CaCO₃)
                </text>
              </svg>
            </div>

            <p className="text-xs text-ivory-muted italic bg-slate-950 p-3 rounded-xl border border-slate-800">
              {acidRainResult.damageDescriptionVi}
            </p>
          </div>

          {/* Right Column: Industrial FGD Scrubber Column (QCVN 19) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <Factory className="w-5 h-5 text-sky-400" />
                <span>Tháp Hấp Thụ Khử Lưu Huỳnh Khí Thải (FGD Scrubber)</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                fgdResult.compliesWithQCVN19
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              }`}>
                {fgdResult.compliesWithQCVN19 ? 'ĐẠT QCVN 19:2009/BTNMT' : 'VƯỢT QUY CHUẨN'}
              </span>
            </div>

            {/* FGD Operating Sliders */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">SO₂ khí thô đầu vào:</span>
                  <span className="font-bold text-amber-400">{so2InletPpm} ppm</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2800"
                  step="100"
                  value={so2InletPpm}
                  onChange={(e) => setSo2InletPpm(+e.target.value)}
                  className="w-full accent-amber-500 bg-slate-800 h-1 rounded appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">pH huyền phù đá vôi:</span>
                  <span className="font-bold text-emerald-400">{slurryPh.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="7.0"
                  step="0.1"
                  value={slurryPh}
                  onChange={(e) => setSlurryPh(+e.target.value)}
                  className="w-full accent-emerald-500 bg-slate-800 h-1 rounded appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Industrial Scrubber Tower SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 500 240" className="w-full h-auto max-h-[240px]">
                {/* Cylindrical Absorption Column */}
                <rect x="180" y="30" width="140" height="180" fill="#1e293b" rx="8" stroke="#475569" strokeWidth="2" />

                {/* Chimney Clean Gas Exit */}
                <rect x="230" y="10" width="40" height="20" fill="#334155" />
                <path d="M250 10 Q240 -10 230 -20" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />

                {/* Raw Flue Gas Inlet from bottom left */}
                <rect x="120" y="160" width="60" height="25" fill="#334155" />
                <text x="145" y="177" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Khí thô SO₂</text>

                {/* Spray Nozzles for Limestone Slurry */}
                <line x1="200" y1="70" x2="300" y2="70" stroke="#0284c7" strokeWidth="3" />
                <circle cx="215" cy="75" r="2.5" fill="#38bdf8" />
                <circle cx="250" cy="75" r="2.5" fill="#38bdf8" />
                <circle cx="285" cy="75" r="2.5" fill="#38bdf8" />
                {/* Slurry Droplets falling */}
                <line x1="215" y1="80" x2="215" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="250" y1="80" x2="250" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="285" y1="80" x2="285" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                <text x="250" y="60" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                  Béc phun CaCO₃ (Huyền phù vôi)
                </text>

                {/* Bottom Sump with Gypsum Slurry */}
                <rect x="180" y="180" width="140" height="30" fill="#0369a1" opacity="0.8" rx="4" />
                <text x="250" y="198" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold">
                  Bể lắng CaSO₄•2H₂O (Thạch cao)
                </text>

                {/* Output Telemetry Dashboard on Right */}
                <text x="350" y="70" fill="#94a3b8" fontSize="10">Hiệu suất khử SO₂:</text>
                <text x="350" y="90" fill="#10b981" fontSize="15" fontWeight="extrabold">
                  {fgdResult.so2RemovalEfficiencyPercent}%
                </text>

                <text x="350" y="125" fill="#94a3b8" fontSize="10">Nồng độ khí thoát:</text>
                <text x="350" y="145" fill={fgdResult.compliesWithQCVN19 ? '#38bdf8' : '#f43f5e'} fontSize="14" fontWeight="bold">
                  {fgdResult.so2OutletMgNm3} mg/Nm³
                </text>
                <text x="350" y="160" fill="#64748b" fontSize="8">(Quy chuẩn &lt; 500 mg/Nm³)</text>

                <text x="350" y="185" fill="#94a3b8" fontSize="10">Thạch cao thu hồi:</text>
                <text x="350" y="205" fill="#fbbf24" fontSize="12" fontWeight="bold">
                  {fgdResult.syntheticGypsumProductionKgPerHour} kg/giờ
                </text>
              </svg>
            </div>

            {/* Performance Status Summary */}
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              fgdResult.compliesWithQCVN19
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
            }`}>
              {fgdResult.compliesWithQCVN19 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{fgdResult.statusSummaryVi}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
