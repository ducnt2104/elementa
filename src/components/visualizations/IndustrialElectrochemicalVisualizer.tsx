import React, { useState, useMemo } from 'react';
import {
  Zap,
  Factory,
  ShieldAlert,
  Coins,
  TrendingDown,
  Layers,
  Activity,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Wind,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import {
  simulateChlorAlkaliMembraneCell,
  BLISTER_COPPER_TYPICAL_COMPOSITION,
  simulateCopperAnodicRefining,
  ELECTROLYZER_TECHNOLOGIES,
  ChlorAlkaliCellParameters
} from '../../domain/industrialElectrochemicalRefiningEngine';
import { sound } from '../../audio/soundEngine';

type ElectroRefiningTab = 'MEMBRANE_CHLOR_ALKALI' | 'COPPER_ANODIC_REFINING' | 'GREEN_HYDROGEN_PEM';

export const IndustrialElectrochemicalVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ElectroRefiningTab>('MEMBRANE_CHLOR_ALKALI');

  // Mode 1: Chlor-Alkali parameters
  const [caCurrentKA, setCaCurrentKA] = useState<number>(10); // 10 kA
  const [caCurrentDensity, setCaCurrentDensity] = useState<number>(4.0); // 4.0 kA/m2
  const [caHours, setCaHours] = useState<number>(24); // 24 hours
  const [caHardnessPpb, setCaHardnessPpb] = useState<number>(12); // ppb Ca2+/Mg2+
  const [membraneType, setMembraneType] = useState<'PERFLUOROSULFONIC_BILAYER' | 'ASBESTOS_DIAPHRAGM_LEGACY'>('PERFLUOROSULFONIC_BILAYER');

  // Mode 2: Copper Refining parameters
  const [anodeMassKg, setAnodeMassKg] = useState<number>(1000); // 1 metric ton
  const [cuCurrentKA, setCuCurrentKA] = useState<number>(25); // 25 kA
  const [cuDays, setCuDays] = useState<number>(14); // 14 days

  // Mode 3: Green Hydrogen active tech
  const [activeHydrogenTech, setActiveHydrogenTech] = useState<'PEM' | 'ALKALINE_AEL' | 'SOLID_OXIDE_SOEC'>('PEM');

  // Chlor-Alkali Simulation calculation
  const chlorAlkaliResult = useMemo(() => {
    const params: ChlorAlkaliCellParameters = {
      currentAmperes: caCurrentKA * 1000,
      currentDensityKAperM2: caCurrentDensity,
      operatingTempCelsius: 88,
      anolyteBrineFeedNaclGPerL: 305,
      membraneType,
      currentEfficiencyPercent: membraneType === 'PERFLUOROSULFONIC_BILAYER' ? 95.5 : 88.0,
      hoursOfOperation: caHours
    };
    return simulateChlorAlkaliMembraneCell(params, caHardnessPpb);
  }, [caCurrentKA, caCurrentDensity, caHours, caHardnessPpb, membraneType]);

  // Copper Refining Calculation
  const copperRefiningResult = useMemo(() => {
    return simulateCopperAnodicRefining(anodeMassKg, cuCurrentKA * 1000, cuDays);
  }, [anodeMassKg, cuCurrentKA, cuDays]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Factory className="w-4 h-4 text-cyan-400" />
              <span>Chuyên Đề GDPT 2018 · Điện Phân Công Nghiệp & Tinh Luyện Kim Loại (Lớp 12)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Điện Phân Xút - Clo Màng Trao Đổi Ion & Tinh Luyện Đồng Anot Thô
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Nghiên cứu công nghệ màng chọn lọc cation Nafion (loại trừ Donnan), định luật Faraday tính toán tiêu hao điện năng,
              bậc thang thế oxi hóa hòa tan chọn lọc thu hồi vàng/bạc từ bùn dương cực, và điện phân nước hydro xanh.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-cyan-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('MEMBRANE_CHLOR_ALKALI');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'MEMBRANE_CHLOR_ALKALI'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Bể Xút - Clo Màng Nafion</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('COPPER_ANODIC_REFINING');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'COPPER_ANODIC_REFINING'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Tinh Luyện Đồng & Bùn Anot</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('GREEN_HYDROGEN_PEM');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'GREEN_HYDROGEN_PEM'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Hydro Xanh (PEM / AEL / SOEC)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MEMBRANE CHLOR-ALKALI INDUSTRIAL CELL                             */}
      {/* ========================================================================= */}
      {activeTab === 'MEMBRANE_CHLOR_ALKALI' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Cell Technology */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                1. Công Nghệ Màng Ngăn
              </span>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setMembraneType('PERFLUOROSULFONIC_BILAYER');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    membraneType === 'PERFLUOROSULFONIC_BILAYER'
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ivory">Màng Nafion Cationic Lớp Kép</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      BAT (Tối ưu)
                    </span>
                  </div>
                  <div className="text-[11px] text-ivory-muted mt-1">
                    Cấu trúc perfluorosulfonic (-SO₃⁻/-COO⁻). Hiệu ứng Donnan loại trừ Cl⁻ và OH⁻ đạt 99.8%. NaOH 33.5% siêu tinh khiết.
                  </div>
                </button>

                <button
                  onClick={() => {
                    sound.playUiClick();
                    setMembraneType('ASBESTOS_DIAPHRAGM_LEGACY');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    membraneType === 'ASBESTOS_DIAPHRAGM_LEGACY'
                      ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/50'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ivory">Vách Ngăn Amiăng (Diaphragm)</span>
                    <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      Công nghệ cũ
                    </span>
                  </div>
                  <div className="text-[11px] text-ivory-muted mt-1">
                    Chỉ lọc cơ học, Cl⁻ thẩm thấu sang catot làm NaOH loãng (12%) lẫn nhiều muối NaCl (&gt;15%). Độc tính amiăng cao.
                  </div>
                </button>
              </div>
            </div>

            {/* Operating Sliders */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                2. Thông Số Vận Hành Bể Điện Phân
              </span>

              {/* Current */}
              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Cường độ dòng điện (I):</span>
                  <strong className="text-cyan-300">{caCurrentKA} kA ({caCurrentKA * 1000} A)</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  value={caCurrentKA}
                  onChange={(e) => setCaCurrentKA(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Current Density */}
              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Mật độ dòng (J):</span>
                  <strong className="text-cyan-300">{caCurrentDensity.toFixed(1)} kA/m²</strong>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="6.5"
                  step="0.5"
                  value={caCurrentDensity}
                  onChange={(e) => setCaCurrentDensity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Operating hours */}
              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Thời gian vận hành:</span>
                  <strong className="text-cyan-300">{caHours} giờ ({Math.round(caHours / 24)} ngày)</strong>
                </div>
                <input
                  type="range"
                  min="6"
                  max="168"
                  step="6"
                  value={caHours}
                  onChange={(e) => setCaHours(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Brine Hardness */}
              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Độ cứng nước muối (Ca²⁺ + Mg²⁺):</span>
                  <strong className={caHardnessPpb > 50 ? 'text-red-400 font-bold' : caHardnessPpb > 20 ? 'text-amber-400' : 'text-emerald-400'}>
                    {caHardnessPpb} ppb
                  </strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={caHardnessPpb}
                  onChange={(e) => setCaHardnessPpb(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                  <span>&lt;20 ppb (An toàn)</span>
                  <span>20-50 ppb (Nghẹt màng)</span>
                  <span>&gt;50 ppb (Hỏng màng)</span>
                </div>
              </div>
            </div>

            {/* Hardness Warning Banner */}
            {chlorAlkaliResult.brineHardnessRiskLevel !== 'SAFE' && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                chlorAlkaliResult.brineHardnessRiskLevel === 'CRITICAL_FAILURE'
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              }`}>
                <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold">
                    {chlorAlkaliResult.brineHardnessRiskLevel === 'CRITICAL_FAILURE'
                      ? 'CẢNH BÁO NGUY HIỂM: HỎNG MÀNG TRAO ĐỔI ION!'
                      : 'CẢNH BÁO: TẠP CHẤT ĐỘ CỨNG VƯỢT QUY CHUẨN'}
                  </div>
                  <p className="leading-relaxed opacity-90">
                    Nồng độ Ca²⁺ và Mg²⁺ ({caHardnessPpb} ppb) vượt ngưỡng an toàn (20 ppb). Các ion kim loại kiềm thổ này sẽ kết tủa thành
                    Ca(OH)₂ và Mg(OH)₂ rắn ngay bên trong các mao quản của màng Nafion ở môi trường pH kiềm cao, làm tăng điện trở đột biến và rách màng!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Visualization Stage & Production Outputs (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Cell Chamber Animated SVG */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-ivory">
                    Sơ Đồ Mặt Cắt Buồng Điện Phân Xút - Clo Màng Trao Đổi Cation (Nafion)
                  </h3>
                </div>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-700/30">
                  {chlorAlkaliResult.vietnamIndustrialSiteVi}
                </div>
              </div>

              {/* SVG Cell Chamber */}
              <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                <svg viewBox="0 0 540 220" className="w-full h-auto">
                  {/* Outer Cell Tank */}
                  <rect x="20" y="20" width="500" height="180" rx="10" fill="#090d16" stroke="#334155" strokeWidth="2" />

                  {/* Anode Chamber (Left - Green tint for Cl2/Brine) */}
                  <rect x="25" y="25" width="235" height="170" rx="6" fill="#064e3b" opacity="0.25" />
                  <text x="35" y="45" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    BUỒNG ANOT (+)
                  </text>
                  <text x="35" y="60" fill="#a7f3d0" fontSize="9" fontFamily="monospace">
                    Nước muối bão hòa NaCl 305 g/L
                  </text>

                  {/* Anode DSA Mesh Electrode (Titanium coated RuO2) */}
                  <rect x="60" y="70" width="18" height="110" rx="3" fill="#047857" stroke="#10b981" strokeWidth="2" />
                  <text x="69" y="130" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 69 130)">
                    Anot Titan DSA
                  </text>

                  {/* Cl2 Gas bubbles rising */}
                  <g>
                    <circle cx="85" cy="140" r="4" fill="#86efac" opacity="0.8">
                      <animate attributeName="cy" values="160;70" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="95" cy="110" r="5" fill="#86efac" opacity="0.7">
                      <animate attributeName="cy" values="150;60" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="78" cy="90" r="3" fill="#86efac" opacity="0.9">
                      <animate attributeName="cy" values="140;50" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Cl2 Outlet Top Arrow */}
                  <path d="M 69,65 L 69,35" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="100" y="38" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    ↑ Thoát Cl₂ ẩm ({chlorAlkaliResult.cl2VolumeStandardM3} m³)
                  </text>

                  {/* Central Cation-Exchange Membrane (Nafion) */}
                  <rect x="260" y="25" width="20" height="170" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
                  <text x="270" y="115" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 270 115)" fontWeight="bold">
                    MÀNG NAFION (-SO₃⁻)
                  </text>

                  {/* Na+ Ions Passing Through Membrane */}
                  <g>
                    <circle cx="230" cy="100" r="6" fill="#38bdf8" />
                    <text x="230" y="103" fill="#090d16" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Na⁺</text>
                    <path d="M 238,100 L 290,100" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />

                    <circle cx="230" cy="140" r="6" fill="#38bdf8" />
                    <text x="230" y="143" fill="#090d16" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Na⁺</text>
                    <path d="M 238,140 L 290,140" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  </g>

                  {/* Donnan Repulsion Arrow (OH- and Cl- bouncing back) */}
                  <path d="M 255,80 Q 250,70 240,75" stroke="#f87171" strokeWidth="2" fill="none" />
                  <text x="210" y="75" fill="#f87171" fontSize="8" fontFamily="monospace">Cl⁻, OH⁻ bị đẩy</text>

                  {/* Cathode Chamber (Right - Blue/Purple tint for NaOH/H2) */}
                  <rect x="280" y="25" width="235" height="170" rx="6" fill="#1e1b4b" opacity="0.35" />
                  <text x="400" y="45" fill="#818cf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    BUỒNG CATOT (-)
                  </text>
                  <text x="400" y="60" fill="#c7d2fe" fontSize="9" fontFamily="monospace">
                    NaOH {chlorAlkaliResult.catholyteProductConcentrationPercent}% + H₂O
                  </text>

                  {/* Cathode Mesh Electrode (Nickel) */}
                  <rect x="460" y="70" width="18" height="110" rx="3" fill="#3730a3" stroke="#818cf8" strokeWidth="2" />
                  <text x="469" y="130" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 469 130)">
                    Catot Niken Xốp
                  </text>

                  {/* H2 Gas bubbles rising */}
                  <g>
                    <circle cx="445" cy="140" r="3.5" fill="#93c5fd" opacity="0.8">
                      <animate attributeName="cy" values="160;65" dur="1.7s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="435" cy="115" r="4.5" fill="#93c5fd" opacity="0.7">
                      <animate attributeName="cy" values="150;55" dur="2.1s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* H2 Outlet Arrow */}
                  <path d="M 469,65 L 469,35" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="350" y="38" fill="#818cf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    ↑ Khí H₂ ({chlorAlkaliResult.h2VolumeStandardM3} m³)
                  </text>

                  {/* Concentrated NaOH Outlet Bottom */}
                  <text x="370" y="185" fill="#a5b4fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    ↓ Ra: NaOH {chlorAlkaliResult.catholyteProductConcentrationPercent}% ({chlorAlkaliResult.naohMassProducedKg} kg)
                  </text>
                </svg>
              </div>

              {/* 4 Quantitative Output Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Sản lượng NaOH</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-cyan-300 mt-1">
                    {chlorAlkaliResult.naohMassProducedKg} <span className="text-xs font-normal">kg</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Nồng độ: {chlorAlkaliResult.catholyteProductConcentrationPercent}%
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Sản lượng khí Cl₂</span>
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-emerald-300 mt-1">
                    {chlorAlkaliResult.cl2GasProducedKg} <span className="text-xs font-normal">kg</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Thể tích: {chlorAlkaliResult.cl2VolumeStandardM3} m³
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Điện thế bể (V_cell)</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-amber-300 mt-1">
                    {chlorAlkaliResult.voltageLosses.totalCellVoltageV} <span className="text-xs font-normal">V</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    E°_rev: {chlorAlkaliResult.voltageLosses.reversibleDecompositionVoltageV} V
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>Suất tiêu hao điện (SEC)</span>
                    <TrendingDown className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-xl font-extrabold font-mono text-purple-300 mt-1">
                    {chlorAlkaliResult.specificEnergyKwhPerTonNaoh} <span className="text-xs font-normal">kWh/t</span>
                  </div>
                  <div className="text-[10px] font-mono text-ivory-muted mt-1">
                    Chuẩn thế giới: 2100-2400
                  </div>
                </div>
              </div>

              {/* Voltage Loss Breakdown Bar */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                  <span>Phân Bố Tổn Hao Điện Thế Bể Điện Phân (V_cell = {chlorAlkaliResult.voltageLosses.totalCellVoltageV}V)</span>
                  <span className="text-ivory-muted text-[10px]">Định luật Ohm & Quá thế điện cực</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full"
                    title={`Thế thuận nghịch E0: ${chlorAlkaliResult.voltageLosses.reversibleDecompositionVoltageV}V`}
                    style={{ width: `${(chlorAlkaliResult.voltageLosses.reversibleDecompositionVoltageV / chlorAlkaliResult.voltageLosses.totalCellVoltageV) * 100}%` }}
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    title={`Quá thế Anot Cl2: ${chlorAlkaliResult.voltageLosses.anodeChlorineOverpotentialV}V`}
                    style={{ width: `${(chlorAlkaliResult.voltageLosses.anodeChlorineOverpotentialV / chlorAlkaliResult.voltageLosses.totalCellVoltageV) * 100}%` }}
                  />
                  <div
                    className="bg-indigo-500 h-full"
                    title={`Quá thế Catot H2: ${chlorAlkaliResult.voltageLosses.cathodeHydrogenOverpotentialV}V`}
                    style={{ width: `${(chlorAlkaliResult.voltageLosses.cathodeHydrogenOverpotentialV / chlorAlkaliResult.voltageLosses.totalCellVoltageV) * 100}%` }}
                  />
                  <div
                    className="bg-amber-500 h-full"
                    title={`Sụt áp Màng IR_mem: ${chlorAlkaliResult.voltageLosses.membraneOhmicDropV}V`}
                    style={{ width: `${(chlorAlkaliResult.voltageLosses.membraneOhmicDropV / chlorAlkaliResult.voltageLosses.totalCellVoltageV) * 100}%` }}
                  />
                  <div
                    className="bg-purple-500 h-full"
                    title={`Sụt áp Dung dịch IR_sol: ${chlorAlkaliResult.voltageLosses.electrolyteOhmicDropV}V`}
                    style={{ width: `${(chlorAlkaliResult.voltageLosses.electrolyteOhmicDropV / chlorAlkaliResult.voltageLosses.totalCellVoltageV) * 100}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-4 text-[10px] font-mono text-ivory-muted pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    Thế phân hủy: {chlorAlkaliResult.voltageLosses.reversibleDecompositionVoltageV}V
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Quá thế Anot: {chlorAlkaliResult.voltageLosses.anodeChlorineOverpotentialV}V
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Quá thế Catot: {chlorAlkaliResult.voltageLosses.cathodeHydrogenOverpotentialV}V
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Sụt áp Màng: {chlorAlkaliResult.voltageLosses.membraneOhmicDropV}V
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Sụt áp Dung dịch: {chlorAlkaliResult.voltageLosses.electrolyteOhmicDropV}V
                  </span>
                </div>
              </div>

              {/* Chemical Equation Summary */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-ivory-muted leading-relaxed whitespace-pre-line">
                {chlorAlkaliResult.chemicalProcessSummaryVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: COPPER ANODIC REFINING & ANODE SLIME RECOVERY                     */}
      {/* ========================================================================= */}
      {activeTab === 'COPPER_ANODIC_REFINING' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  Thông Số Bể Tinh Luyện Đồng Anot
                </span>

                {/* Anode Mass */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Khối lượng Anot đồng thô:</span>
                    <strong className="text-cyan-300">{anodeMassKg} kg ({anodeMassKg / 1000} tấn)</strong>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={anodeMassKg}
                    onChange={(e) => setAnodeMassKg(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Current */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Cường độ dòng (I):</span>
                    <strong className="text-cyan-300">{cuCurrentKA} kA ({cuCurrentKA * 1000} A)</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={cuCurrentKA}
                    onChange={(e) => setCuCurrentKA(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Days */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Chu kỳ điện phân:</span>
                    <strong className="text-cyan-300">{cuDays} ngày ({cuDays * 24} giờ)</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="28"
                    step="2"
                    value={cuDays}
                    onChange={(e) => setCuDays(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>

              {/* Precious Metals Valuation Card */}
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/40 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    Giá Trị Thu Hồi Kim Loại Quý (Bùn Anot)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-600/30">
                    +${copperRefiningResult.preciousMetalsEconomicValueUsd.toLocaleString()} USD
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Vàng (Au - 15 g/tấn):
                    </span>
                    <strong className="text-amber-300">{copperRefiningResult.recoveredGoldGrams} g (~${Math.round(copperRefiningResult.recoveredGoldGrams * 80).toLocaleString()})</strong>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      Bạc (Ag - 450 g/tấn):
                    </span>
                    <strong className="text-slate-200">{copperRefiningResult.recoveredSilverGrams} g (~${Math.round(copperRefiningResult.recoveredSilverGrams * 1.0).toLocaleString()})</strong>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="text-ivory flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                      Bạch kim (Pt - 5 g/tấn):
                    </span>
                    <strong className="text-cyan-200">{copperRefiningResult.recoveredPlatinumGrams} g (~${Math.round(copperRefiningResult.recoveredPlatinumGrams * 35).toLocaleString()})</strong>
                  </div>
                </div>

                <p className="text-[11px] text-ivory-muted leading-relaxed pt-1">
                  Toàn bộ chi phí điện năng của nhà máy luyện đồng thường được bù đắp trọn vẹn chỉ nhờ việc tinh chế vàng và bạc từ bùn dương cực!
                </p>
              </div>
            </div>

            {/* Refining Tank Visualization & Ladder (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                    <Factory className="w-5 h-5 text-cyan-400" />
                    Bể Điện Phân Tinh Luyện Đồng Anot (CuSO₄ + H₂SO₄)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-600/30">
                    Độ tinh khiết Catot: {copperRefiningResult.cathodePurityPercent}% Cu
                  </span>
                </div>

                {/* SVG Refining Tank */}
                <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <svg viewBox="0 0 540 220" className="w-full h-auto">
                    {/* Tank Shell */}
                    <rect x="30" y="30" width="480" height="170" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                    {/* Blue Acidified CuSO4 Electrolyte Liquid */}
                    <rect x="35" y="60" width="470" height="135" rx="6" fill="#0284c7" opacity="0.25" />
                    <text x="50" y="80" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      Dung dịch điện phân: CuSO₄ (160 g/L) + H₂SO₄ (180 g/L)
                    </text>

                    {/* Anode Slab (Impure Blister Copper) */}
                    <rect x="90" y="50" width="35" height="120" rx="4" fill="#b45309" stroke="#d97706" strokeWidth="2" />
                    <text x="107" y="115" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 107 115)" fontWeight="bold">
                      Anot Cu Thô (98.8%)
                    </text>

                    {/* Impurity specs on Anode */}
                    <circle cx="100" cy="80" r="3" fill="#ef4444">
                      <title>Fe, Zn</title>
                    </circle>
                    <circle cx="115" cy="120" r="3" fill="#eab308">
                      <title>Au, Ag</title>
                    </circle>
                    <circle cx="98" cy="140" r="2.5" fill="#94a3b8">
                      <title>Pb</title>
                    </circle>

                    {/* Cu2+ Migration Path */}
                    <path d="M 135,100 Q 250,60 365,100" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                    <circle cx="250" cy="80" r="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="83" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Cu²⁺</text>

                    {/* Cathode Starter Sheet (Pure Copper Deposited) */}
                    <rect x="380" y="50" width="30" height="120" rx="4" fill="#ea580c" stroke="#f97316" strokeWidth="2" />
                    <text x="395" y="115" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 395 115)" fontWeight="bold">
                      Catot Cu Tinh Khiết 99.99%
                    </text>

                    {/* Dissolved Ions Floating in Liquid (Ni2+, Fe2+, Zn2+) */}
                    <g opacity="0.8">
                      <rect x="180" y="115" width="40" height="16" rx="4" fill="#1e293b" />
                      <text x="200" y="127" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">Ni²⁺, Fe²⁺</text>

                      <rect x="290" y="115" width="35" height="16" rx="4" fill="#1e293b" />
                      <text x="307" y="127" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">Zn²⁺</text>
                    </g>

                    {/* Anode Slime Accumulation (Bottom beneath Anode) */}
                    <path d="M 75,185 Q 110,170 145,185 Z" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
                    <circle cx="95" cy="180" r="2" fill="#eab308" />
                    <circle cx="115" cy="178" r="2.5" fill="#f1f5f9" />
                    <circle cx="130" cy="182" r="2" fill="#eab308" />
                    <text x="110" y="196" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Bùn Anot (Au, Ag, Pt, PbSO₄, Cu₂Se)
                    </text>
                  </svg>
                </div>

                {/* 4 Quantitative Output Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Đồng Catot thu hồi</div>
                    <div className="text-xl font-extrabold font-mono text-orange-400 mt-1">
                      {copperRefiningResult.refinedCathodeCopperKg} <span className="text-xs font-normal">kg</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Khối lượng bùn anot</div>
                    <div className="text-xl font-extrabold font-mono text-amber-400 mt-1">
                      {copperRefiningResult.anodeSlimeTotalKg} <span className="text-xs font-normal">kg</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Điện thế bể (V_cell)</div>
                    <div className="text-xl font-extrabold font-mono text-cyan-400 mt-1">
                      {copperRefiningResult.cellOperatingVoltageV} <span className="text-xs font-normal">V</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Tiêu hao điện năng</div>
                    <div className="text-xl font-extrabold font-mono text-purple-400 mt-1">
                      {copperRefiningResult.energyKwhPerTonCopper} <span className="text-xs font-normal">kWh/t</span>
                    </div>
                  </div>
                </div>

                {/* Selective Dissolution Ladder */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    Quy Luật Thế Điện Cực & Thứ Tự Oxi Hóa Tại Anot Đồng Thô:
                  </span>
                  <div className="space-y-1.5 text-xs text-ivory-muted">
                    {copperRefiningResult.selectiveDissolutionLadderVi.map((step, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/50">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: GREEN HYDROGEN WATER ELECTROLYZER (PEM VS ALKALINE VS SOEC)       */}
      {/* ========================================================================= */}
      {activeTab === 'GREEN_HYDROGEN_PEM' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1">
                  <Wind className="w-4 h-4" />
                  Chuyên Đề Năng Lượng Xanh GDPT 2018 · Điện Phân Nước Sản Xuất Khí Hydro (Green H₂)
                </span>
                <h3 className="text-xl font-extrabold text-ivory">
                  So Sánh 3 Công Nghệ Điện Phân Nước Công Nghiệp: PEM vs Kiềm (AEL) vs Gốm Rắn (SOEC)
                </h3>
              </div>

              {/* Tech selector */}
              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                {(['PEM', 'ALKALINE_AEL', 'SOLID_OXIDE_SOEC'] as const).map(techId => (
                  <button
                    key={techId}
                    onClick={() => {
                      sound.playUiClick();
                      setActiveHydrogenTech(techId);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeHydrogenTech === techId
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    {techId === 'PEM' ? 'Màng PEM' : techId === 'ALKALINE_AEL' ? 'Điện phân Kiềm (AEL)' : 'Gốm Rắn (SOEC)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(ELECTROLYZER_TECHNOLOGIES) as Array<keyof typeof ELECTROLYZER_TECHNOLOGIES>).map((key) => {
                const tech = ELECTROLYZER_TECHNOLOGIES[key];
                const isSelected = activeHydrogenTech === key;

                return (
                  <div
                    key={key}
                    onClick={() => {
                      sound.playUiClick();
                      setActiveHydrogenTech(key as 'PEM' | 'ALKALINE_AEL' | 'SOLID_OXIDE_SOEC');
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-2 ring-cyan-500/30'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-ivory">{tech.nameVi}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                        {tech.chargeCarrier}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-ivory-muted">Nhiệt độ vận hành:</span>
                        <strong className="text-ivory">{tech.operatingTempCelsius}°C</strong>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-ivory-muted">Hiệu suất năng lượng (HHV):</span>
                        <strong className="text-emerald-400 font-bold">{tech.cellEfficiencyHhvPercent}%</strong>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-ivory-muted">Tiêu thụ điện:</span>
                        <strong className="text-amber-400">{tech.specificPowerConsumptionKwhPerKgH2} kWh/kg H₂</strong>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-ivory-muted">Thời gian khởi động:</span>
                        <strong className={tech.rampUpTimeSeconds <= 10 ? 'text-emerald-300' : 'text-ivory-muted'}>
                          {tech.rampUpTimeSeconds < 60 ? `${tech.rampUpTimeSeconds} giây` : `${Math.round(tech.rampUpTimeSeconds / 60)} phút`}
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-ivory-muted">Tuổi thọ ngăn điện phân:</span>
                        <strong className="text-ivory">{tech.durabilityHours.toLocaleString()} giờ</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60 text-[11px] text-ivory-muted leading-relaxed">
                      <strong className="text-cyan-300">Xúc tác:</strong> {tech.catalystMaterialVi}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Renewable Integration Note */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-ivory-muted space-y-1">
              <div className="font-bold text-cyan-300">Ứng dụng tích hợp điện gió ngoài khơi & điện mặt trời Việt Nam:</div>
              <p className="leading-relaxed">
                Tại các dự án Hydro xanh Ninh Thuận và Trà Vinh, công nghệ <strong>PEM</strong> được ưu tiên cao nhất nhờ tốc độ phản hồi tính bằng giây (1 giây),
                cho phép hấp thụ trọn vẹn các đợt phát điện đột biến không ổn định từ tuabin gió và tấm pin mặt trời mà không làm hỏng màng hay giảm tuổi thọ ngăn điện phân.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
