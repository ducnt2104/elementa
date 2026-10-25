// src/components/visualizations/HydrothermalLiquefactionVisualizer.tsx
// Interactive Visualizer: Subcritical Hydrothermal Liquefaction (HTL) & Wet Biomass Biocrude Refining
// Standards: Subcritical Water Physical Chemistry, IUPAC Green Chemistry & Circular Bioeconomy

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Gauge,
  Factory,
  Droplets,
  Wind,
  CheckCircle2,
  RefreshCw,
  Plane,
  Leaf
} from 'lucide-react';
import {
  calculateSubcriticalWaterProperties,
  calculateHtlPerformance,
  BIOMASS_FEEDSTOCK_CATALOG,
  FeedstockType
} from '../../domain/hydrothermalLiquefactionEngine';
import { sound } from '../../audio/soundEngine';

type HtlTabMode =
  | 'SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING'
  | 'SOLVATION_PHYSICS_AND_DIELECTRIC_METER'
  | 'BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY';

export const HydrothermalLiquefactionVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HtlTabMode>('SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING');

  // Interactive Controls
  const [feedstockType, setFeedstockType] = useState<FeedstockType>('WET_MICROALGAE');
  const [wetFlowKgH, setWetFlowKgH] = useState<number>(10000);
  const [temperatureC, setTemperatureC] = useState<number>(320.0);
  const [pressureMPa, setPressureMPa] = useState<number>(18.0);
  const [residenceTimeMin, setResidenceTimeMin] = useState<number>(20.0);
  const [inspectedPhase, setInspectedPhase] = useState<'BIOCRUDE' | 'AQUEOUS_NUTRIENTS' | 'HYDROCHAR' | 'BIOGENIC_GAS'>('BIOCRUDE');

  // Calculations
  const subWater = useMemo(() => {
    return calculateSubcriticalWaterProperties(temperatureC, pressureMPa);
  }, [temperatureC, pressureMPa]);

  const performance = useMemo(() => {
    return calculateHtlPerformance({
      feedstockType,
      wetFeedstockFlowKgPerHour: wetFlowKgH,
      reactorTemperatureC: temperatureC,
      operatingPressureMPa: pressureMPa,
      residenceTimeMinutes: residenceTimeMin,
      heatRecoveryEffectiveness: 0.80
    });
  }, [feedstockType, wetFlowKgH, temperatureC, pressureMPa, residenceTimeMin]);

  const handleModeChange = (mode: HtlTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setFeedstockType('WET_MICROALGAE');
    setWetFlowKgH(10000);
    setTemperatureC(320.0);
    setPressureMPa(18.0);
    setResidenceTimeMin(20.0);
    setInspectedPhase('BIOCRUDE');
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Nhiệt Hóa Nước Dưới Tới Hạn (HTL)
              </span>
              <span className="text-xs text-slate-400">320°C (18 MPa) • Không Cần Sấy Khô</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Hóa Lỏng Thủy Nhiệt (HTL) Biến Bùn Thải & Vi Tảo Thành Dầu Sinh Học SAF
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Mặc Định
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        <button
          onClick={() => handleModeChange('SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          1. Lò Phản Ứng & Phân Tách 4 Pha
        </button>

        <button
          onClick={() => handleModeChange('SOLVATION_PHYSICS_AND_DIELECTRIC_METER')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'SOLVATION_PHYSICS_AND_DIELECTRIC_METER'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Gauge className="w-4 h-4" />
          2. Vật Lý Nước Dưới Tới Hạn (ε: 21.4)
        </button>

        <button
          onClick={() => handleModeChange('BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Plane className="w-4 h-4" />
          3. Dầu Hàng Không SAF & Tuần Hoàn N-P
        </button>
      </div>

      {/* MODE 1: FLOWSHEET & 4-PHASE PARTITIONING */}
      {activeMode === 'SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Dây Chuyền Hóa Lỏng Thủy Nhiệt Khép Kín (Không Cần Sấy Khô)
              </h3>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                Pha Nước Làm Dung Môi & Xúc Tác
              </span>
            </div>

            <div className="w-full bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 760 380" className="w-full h-auto max-h-[380px]">
                {/* Guidelines */}
                <rect x="10" y="10" width="740" height="360" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

                {/* 1. WET SLURRY FEED PUMP */}
                <rect x="35" y="100" width="130" height="180" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="100" y="130" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Bùn Thải Ẩm</text>
                <text x="100" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">{performance.feedstockUsed.moistureContentPercent}% Nước (Ẩm)</text>
                <text x="100" y="175" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{wetFlowKgH.toLocaleString()} kg/h</text>
                <rect x="45" y="200" width="110" height="60" rx="6" fill="#10b981" fillOpacity="0.1" />
                <text x="100" y="222" textAnchor="middle" fill="#34d399" fontSize="9">Bơm Cao Áp</text>
                <text x="100" y="238" textAnchor="middle" fill="#34d399" fontSize="9">{pressureMPa} MPa (180 bar)</text>
                <text x="100" y="252" textAnchor="middle" fill="#34d399" fontSize="9">Tiết kiệm 2.5 MJ/kg</text>

                {/* Feed Tube to Reactor */}
                <path d="M 165 190 L 250 190" stroke="#10b981" strokeWidth="3" />
                <polygon points="250,190 242,186 242,194" fill="#10b981" />
                <text x="207" y="180" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">18 MPa</text>

                {/* 2. SUBCRITICAL HTL REACTOR */}
                <rect x="250" y="60" width="180" height="260" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="340" y="95" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">LÒ PHẢN ỨNG HTL</text>
                <text x="340" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{temperatureC}°C ({temperatureC + 273.15} K)</text>
                <text x="340" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Thời gian lưu: {residenceTimeMin} phút</text>

                <rect x="265" y="150" width="150" height="150" rx="8" fill="#f59e0b" fillOpacity="0.1" />
                <text x="340" y="175" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Nước Dưới Tới Hạn</text>
                <text x="340" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="9">Hằng số điện môi: ε = {subWater.dielectricConstant}</text>
                <text x="340" y="215" textAnchor="middle" fill="#e2e8f0" fontSize="9">Tự xúc tác phân hủy:</text>
                <text x="340" y="235" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Kw = 10^{subWater.ionProductKwLog10}</text>
                <text x="340" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="9">Tách liên kết peptit & lipid</text>
                <text x="340" y="275" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Thu hồi nhiệt 80%</text>

                {/* Flow Tube to 4-Phase Separator */}
                <path d="M 430 190 L 510 190" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="510,190 502,186 502,194" fill="#f59e0b" />

                {/* 3. FOUR-PHASE SEPARATOR TANK */}
                <rect x="510" y="50" width="210" height="280" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="615" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">BÌNH PHÂN TÁCH 4 PHA</text>

                {/* Phase 1: Biogenic Gas (Top) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedPhase('BIOGENIC_GAS'); }}
                >
                  <rect
                    x="520"
                    y="90"
                    width="190"
                    height="45"
                    rx="6"
                    fill={inspectedPhase === 'BIOGENIC_GAS' ? '#6b21a8' : '#3b0764'}
                    stroke={inspectedPhase === 'BIOGENIC_GAS' ? '#c084fc' : '#581c87'}
                    strokeWidth={inspectedPhase === 'BIOGENIC_GAS' ? 2 : 1}
                  />
                  <text x="615" y="110" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="bold">1. Khí Sinh Học (CO₂ + CH₄)</text>
                  <text x="615" y="125" textAnchor="middle" fill="#d8b4fe" fontSize="9">{performance.gasYieldKgPerHour} kg/h</text>
                </g>

                {/* Phase 2: Biocrude Oil (Upper Middle) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedPhase('BIOCRUDE'); }}
                >
                  <rect
                    x="520"
                    y="145"
                    width="190"
                    height="60"
                    rx="6"
                    fill={inspectedPhase === 'BIOCRUDE' ? '#b45309' : '#78350f'}
                    stroke={inspectedPhase === 'BIOCRUDE' ? '#fbbf24' : '#92400e'}
                    strokeWidth={inspectedPhase === 'BIOCRUDE' ? 2 : 1}
                  />
                  <text x="615" y="168" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">2. Dầu Biocrude (SAF Feed)</text>
                  <text x="615" y="184" textAnchor="middle" fill="#fde68a" fontSize="10">{performance.biocrudeYieldKgPerHour} kg/h ({performance.biocrudeYieldBarrelsPerDay} thùng/ngày)</text>
                  <text x="615" y="198" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">HHV: {performance.biocrudeEnergyDensityHhvMJPerKg} MJ/kg</text>
                </g>

                {/* Phase 3: Aqueous Nutrients (Lower Middle) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedPhase('AQUEOUS_NUTRIENTS'); }}
                >
                  <rect
                    x="520"
                    y="215"
                    width="190"
                    height="50"
                    rx="6"
                    fill={inspectedPhase === 'AQUEOUS_NUTRIENTS' ? '#0e7490' : '#155e75'}
                    stroke={inspectedPhase === 'AQUEOUS_NUTRIENTS' ? '#22d3ee' : '#0891b2'}
                    strokeWidth={inspectedPhase === 'AQUEOUS_NUTRIENTS' ? 2 : 1}
                  />
                  <text x="615" y="235" textAnchor="middle" fill="#cffafe" fontSize="10" fontWeight="bold">3. Pha Nước Khoáng N & P</text>
                  <text x="615" y="252" textAnchor="middle" fill="#a5f3fc" fontSize="9">Tuần hoàn {performance.recycledNitrogenKgPerHour} kg N/h | {performance.recycledPhosphorusKgPerHour} kg P/h</text>
                </g>

                {/* Phase 4: Solid Hydrochar (Bottom) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedPhase('HYDROCHAR'); }}
                >
                  <rect
                    x="520"
                    y="275"
                    width="190"
                    height="45"
                    rx="6"
                    fill={inspectedPhase === 'HYDROCHAR' ? '#334155' : '#1e293b'}
                    stroke={inspectedPhase === 'HYDROCHAR' ? '#94a3b8' : '#475569'}
                    strokeWidth={inspectedPhase === 'HYDROCHAR' ? 2 : 1}
                  />
                  <text x="615" y="295" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontWeight="bold">4. Than Hydrochar Rắn</text>
                  <text x="615" y="310" textAnchor="middle" fill="#cbd5e1" fontSize="9">{performance.solidHydrocharKgPerHour} kg/h (Lưu trữ carbon đất)</text>
                </g>
              </svg>
            </div>

            {/* Inspected Phase Description Card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/60 flex flex-col gap-2">
              {inspectedPhase === 'BIOCRUDE' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-amber-300">
                      Dầu Sinh Học Biocrude (Nguyên Liệu Sản Xuất Xăng Máy Bay SAF)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      ERR = {performance.energyRecoveryRatioPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dầu thô sinh học HTL có nhiệt trị rất cao ({performance.biocrudeEnergyDensityHhvMJPerKg} MJ/kg), tiệm cận dầu thô hóa thạch (42 MJ/kg). Hàm lượng oxy thấp (&lt;10%) giúp quá trình hydrotreating thành nhiên liệu bay SAF tiết kiệm hơn 60% hydro so với dầu nhiệt phân thường.
                  </p>
                </>
              )}

              {inspectedPhase === 'AQUEOUS_NUTRIENTS' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-cyan-300">
                      Pha Lỏng Thu Hồi Dinh Dưỡng Khoáng Tuần Hoàn (Nitơ & Phốt Pho)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {performance.recycledNitrogenKgPerHour} kg N/h • {performance.recycledPhosphorusKgPerHour} kg P/h
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hơn 78% nguyên tố Nitơ và 65% Phốt pho trong sinh khối được hòa tan vào pha nước dưới dạng ion ammonium và photphat, được bơm trực tiếp trở lại các ao nuôi vi tảo để thay thế hoàn toàn phân bón vô cơ tổng hợp.
                  </p>
                </>
              )}

              {inspectedPhase === 'HYDROCHAR' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-200">
                      Than Hydrochar Rắn (Cố Định Carbon Đất & Hấp Phụ Nông Nghiệp)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {performance.solidHydrocharKgPerHour} kg/h
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hydrochar xốp có diện tích bề mặt lớn, giàu nhóm chức hữu cơ, là chất cải tạo đất tuyệt hảo giúp giữ ẩm, giữ khoáng và cô lập carbon vĩnh viễn trong đất nông nghiệp.
                  </p>
                </>
              )}

              {inspectedPhase === 'BIOGENIC_GAS' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-purple-300">
                      Khí Biogenic CO₂ Tinh Khiết Thu Hồi Cho Nuôi Trồng
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {performance.gasYieldKgPerHour} kg/h
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pha khí chứa hơn 85% CO₂ sinh học tinh khiết (cùng một lượng nhỏ H₂ và CH₄), được sục trực tiếp vào nước ao nuôi tảo để thúc đẩy quang hợp.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Metrics & Sizing Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Hiệu Quả Năng Lượng Đột Phá
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-1">Hệ Số Năng Lượng Thuần: NER = {performance.netEnergyRatioNer}</div>
                  <p className="text-slate-300">
                    Năng lượng thu được trong biocrude gấp {performance.netEnergyRatioNer} lần năng lượng nhiệt cần cấp cho lò nhờ công nghệ thu hồi nhiệt đối lưu 80%.
                  </p>
                </div>

                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="font-bold text-amber-300 mb-1">Hiệu Suất Thu Hồi Năng Lượng: {performance.energyRecoveryRatioPercent}%</div>
                  <p className="text-slate-300">
                    Chuyển hóa hơn 3/4 nhiệt trị của nguyên liệu hữu cơ khô vào dòng dầu lỏng chất lượng cao.
                  </p>
                </div>

                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <div className="font-bold text-cyan-300 mb-1">Không Cần Sấy Bùn (Tiết Kiệm 25 GJ/tấn)</div>
                  <p className="text-slate-300">
                    Bỏ qua công đoạn sấy khô tốn năng lượng nhất trong các công nghệ nhiệt phân truyền thống, cho phép xử lý sinh khối bùn thải ướt trực tiếp.
                  </p>
                </div>
              </div>
            </div>

            {/* Plant Capacity Box */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sản Lượng Nhà Máy ({wetFlowKgH.toLocaleString()} kg/h Bùn)</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-amber-400">{performance.biocrudeYieldBarrelsPerDay}</div>
                  <div className="text-[10px] text-slate-400">Thùng Dầu / Ngày</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-emerald-400">{(performance.annualAvoidedCO2Tons / 1000).toFixed(1)}k</div>
                  <div className="text-[10px] text-slate-400">Tấn CO₂ Giảm/Năm</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                <span>Nhiệt trị dầu biocrude:</span>
                <span className="font-bold text-amber-300 font-mono">{performance.biocrudeEnergyDensityHhvMJPerKg} MJ/kg</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Thu hồi phân bón N-P:</span>
                <span className="font-bold text-cyan-400 font-mono">100% Khép Kín</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SOLVATION PHYSICS & DIELECTRIC METER */}
      {activeMode === 'SOLVATION_PHYSICS_AND_DIELECTRIC_METER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-5 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              Điều Khiển Trạng Thái Nước Dưới Tới Hạn
            </h3>

            {/* Slider: Temperature */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Nhiệt Độ Lò Phản Ứng (°C)</label>
                <span className="text-sm font-mono font-bold text-amber-400">{temperatureC}°C</span>
              </div>
              <input
                type="range"
                min="280"
                max="360"
                step="5"
                value={temperatureC}
                onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>280°C (Bắt đầu phân ly protein)</span>
                <span>320°C (Tối ưu hóa lỏng lipid)</span>
                <span>360°C (Tiệm cận điểm tới hạn 374°C)</span>
              </div>
            </div>

            {/* Slider: Pressure */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Áp Suất Vận Hành (MPa)</label>
                <span className="text-sm font-mono font-bold text-cyan-400">{pressureMPa} MPa ({pressureMPa * 10} bar)</span>
              </div>
              <input
                type="range"
                min="12"
                max="25"
                step="1"
                value={pressureMPa}
                onChange={(e) => setPressureMPa(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>12 MPa (Duy trì pha lỏng nén)</span>
                <span>18 MPa (Chuẩn công nghiệp)</span>
                <span>25 MPa (Áp suất siêu nén)</span>
              </div>
            </div>

            {/* Slider: Residence Time */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Thời Gian Lưu Trong Lò (Phút)</label>
                <span className="text-sm font-mono font-bold text-emerald-400">{residenceTimeMin} phút</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={residenceTimeMin}
                onChange={(e) => setResidenceTimeMin(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Subcritical Water Solvation Meters */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Biến Đổi Tính Chất Hóa Lý Nước Ở 320°C
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Hằng Số Điện Môi (ε)</span>
                <span className="text-2xl font-black text-cyan-400 font-mono">{subWater.dielectricConstant}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Gốc: 78.5 (Hoạt tính như dung môi hữu cơ)</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Tích Số Ion (log₁₀ Kw)</span>
                <span className="text-2xl font-black text-amber-400 font-mono">{subWater.ionProductKwLog10}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Tăng gấp 1,000x lần nồng độ H⁺/OH⁻</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Mật Độ Khối Nước</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{subWater.densityKgM3}</span>
                <span className="text-[10px] text-slate-500 block mt-1">kg/m³ (Nước nén lỏng)</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Độ Nhớt Động Lực</span>
                <span className="text-2xl font-black text-purple-400 font-mono">{subWater.viscosityMicroPaS}</span>
                <span className="text-[10px] text-slate-500 block mt-1">μPa·s (Khuếch tán cực nhanh)</span>
              </div>
            </div>

            <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">Giải Mã Hiện Tượng Dung Môi: </strong>
              Khi nước được gia nhiệt lên 320°C dưới áp suất 18 MPa, liên kết hydro bị suy yếu mạnh khiến hằng số điện môi giảm từ 78.5 xuống còn 21.4, tương đương dung môi hữu cơ ethanol. Các hợp chất hữu cơ không phân cực (chất béo, lipid, sáp) tan hoàn toàn trong nước, cho phép bẻ gãy và hóa lỏng sinh khối trong vài phút mà không cần dung môi hóa chất độc hại.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SAF & CIRCULAR ECONOMY */}
      {activeMode === 'BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feedstock Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              Nguồn Sinh Khối Ẩm Nông Nghiệp & Đô Thị
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {Object.values(BIOMASS_FEEDSTOCK_CATALOG).map((feed) => (
                <div
                  key={feed.id}
                  onClick={() => {
                    sound.playUiClick();
                    setFeedstockType(feed.id);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    feedstockType === feed.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-emerald-300">{feed.vietnameseName}</span>
                    <span className="text-xs font-mono font-bold text-amber-400">{feed.moistureContentPercent}% Ẩm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {feed.description}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800/80">
                    <span>Thành phần: Lipid {feed.lipidContentDryPercent}% | Protein {feed.proteinContentDryPercent}%</span>
                    <span className="text-emerald-400 font-semibold">{feed.dryHhvMJPerKg} MJ/kg khô</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAF Refining & Aviation Impact */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plane className="w-5 h-5 text-cyan-400" />
              Nhiên Liệu Hàng Không Bền Vững (SAF) Cho Hàng Không
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Sản lượng dầu Biocrude:</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {performance.biocrudeYieldKgPerHour.toLocaleString()} kg/h ({performance.biocrudeYieldBarrelsPerDay} thùng/ngày)
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Tỷ lệ chuyển hóa thành SAF (Hydrotreating):</span>
                <span className="font-bold text-emerald-400 font-mono">72 - 78% Thể Tích</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Hàm lượng Oxy trong biocrude:</span>
                <span className="font-bold text-cyan-400 font-mono">&lt; 8.5% (Cực kỳ dễ nâng cấp)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Tuân thủ tiêu chuẩn hàng không:</span>
                <span className="font-bold text-white font-mono">ASTM D7566 Annex A7 Drop-In</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800">
                <span>Giảm phát thải khí nhà kính trọn vòng đời:</span>
                <span className="font-bold text-emerald-400 font-mono">-85% CO₂e vs Nhiên Liệu Jet-A1</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">Chu Trình Kinh Tế Sinh Học Tuần Hoàn: </strong>
              Mô hình HTL tích hợp giải quyết đồng thời hai bài toán nan giải: xử lý ô nhiễm bùn thải đô thị và đáp ứng bắt buộc chỉ tiêu phối trộn 2 - 6% nhiên liệu bay bền vững (ReFuelEU Aviation 2025/2030) cho ngành hàng không toàn cầu.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
