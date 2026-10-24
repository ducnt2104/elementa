// src/components/visualizations/SupercriticalWaterOxidationVisualizer.tsx
// Interactive Visualizer: Supercritical Water Oxidation (SCWO) & Hydrothermal Waste Destruction
// Conforms to: IUPAC Phase Equilibrium, IAPWS-95 Supercritical Water, EPA DRE Protocols & Vietnam GDPT 2018 (Hóa học 10, 11 & 12: Hằng số điện môi, C-F bond, Khí thải & Xử lý chất thải nguy hại)

import React, { useState, useMemo } from 'react';
import {
  Flame,
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
  Droplets,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Factory,
  DollarSign,
  Sun,
  Filter,
  ShieldAlert,
  Thermometer,
  Activity
} from 'lucide-react';
import {
  ScwoWasteStreamType,
  ScwoOperatingConditions,
  SCWO_WASTE_BENCHMARKS,
  calculateWaterSupercriticalProperties,
  simulateScwoKinetics
} from '../../domain/supercriticalWaterOxidationEngine';
import { sound } from '../../audio/soundEngine';

type ScwoTabMode = 'TRANSPIRING_REACTOR_AND_SALT_TRAP' | 'PHASE_DIAGRAM_AND_DIELECTRIC' | 'AUTOTHERMAL_PFAS_DESTRUCTION';

export const SupercriticalWaterOxidationVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScwoTabMode>('TRANSPIRING_REACTOR_AND_SALT_TRAP');
  const [selectedWasteType, setSelectedWasteType] = useState<ScwoWasteStreamType>('PFAS_FOREVER_CHEMICALS');

  // Sliders
  const [operatingTempC, setOperatingTempC] = useState<number>(550);
  const [operatingPressureMpa, setOperatingPressureMpa] = useState<number>(25.0);
  const [residenceTimeSeconds, setResidenceTimeSeconds] = useState<number>(45);
  const [excessOxygenRatio, setExcessOxygenRatio] = useState<number>(1.25);
  const [wasteFeedFlowRateKgH, setWasteFeedFlowRateKgH] = useState<number>(1500);
  const [organicCodPpm, setOrganicCodPpm] = useState<number>(65000);
  const [transpiringWallWaterPct, setTranspiringWallWaterPct] = useState<number>(10);

  const selectedBenchmark = useMemo(() => {
    return SCWO_WASTE_BENCHMARKS.find(b => b.type === selectedWasteType) || SCWO_WASTE_BENCHMARKS[0];
  }, [selectedWasteType]);

  // Simulation calculations
  const sim = useMemo(() => {
    const conditions: ScwoOperatingConditions = {
      operatingTempC,
      operatingPressureMpa,
      residenceTimeSeconds,
      excessOxygenRatio,
      wasteFeedFlowRateKgH,
      organicCodPpm,
      transpiringWallWaterPct
    };
    return simulateScwoKinetics(selectedWasteType, conditions);
  }, [
    selectedWasteType,
    operatingTempC,
    operatingPressureMpa,
    residenceTimeSeconds,
    excessOxygenRatio,
    wasteFeedFlowRateKgH,
    organicCodPpm,
    transpiringWallWaterPct
  ]);

  const handleTabChange = (tab: ScwoTabMode) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  const handleWasteTypeChange = (type: ScwoWasteStreamType) => {
    sound.playUiClick();
    setSelectedWasteType(type);
    const benchmark = SCWO_WASTE_BENCHMARKS.find(b => b.type === type);
    if (benchmark) {
      setOrganicCodPpm(benchmark.typicalCodMgL);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-inner">
              <Flame className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Oxi Hóa Trong Nước Siêu Tới Hạn (Supercritical Water Oxidation - SCWO)
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  EPA 99.9999% DRE
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Nước chuyển thành dung môi không phân cực (ε_r &lt; 5), Cháy không ngọn lửa tiêu diệt chất thải vĩnh cửu PFAS & 0% NOx/Dioxin
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('TRANSPIRING_REACTOR_AND_SALT_TRAP')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'TRANSPIRING_REACTOR_AND_SALT_TRAP'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Lò Thành Thấm & Bẫy Muối
          </button>
          <button
            onClick={() => handleTabChange('PHASE_DIAGRAM_AND_DIELECTRIC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'PHASE_DIAGRAM_AND_DIELECTRIC'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Giản Đồ Pha & Hằng Số Điện Môi
          </button>
          <button
            onClick={() => handleTabChange('AUTOTHERMAL_PFAS_DESTRUCTION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'AUTOTHERMAL_PFAS_DESTRUCTION'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Cháy Tự Nhiệt & Phá Hủy PFAS
          </button>
        </div>
      </div>

      {/* Waste Stream Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Dòng Chất Thải Nguy Hại:</span>
          <div className="flex items-center gap-2">
            {SCWO_WASTE_BENCHMARKS.map(item => (
              <button
                key={item.type}
                onClick={() => handleWasteTypeChange(item.type)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  selectedWasteType === item.type
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {item.type === 'PFAS_FOREVER_CHEMICALS' && 'Hóa chất vĩnh cửu PFAS'}
                {item.type === 'MUNICIPAL_SEWAGE_SLUDGE' && 'Bùn thải sinh học COD cao'}
                {item.type === 'PHARMACEUTICAL_CHEMICAL_WASTE' && 'Dược phẩm & Thuốc kháng sinh'}
                {item.type === 'HALOGENATED_SOLVENTS' && 'Dung môi clo hóa / PCBs'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Hiệu suất DRE:</span>
            <span className="text-emerald-400 font-bold">{sim.destructionRemovalEfficiencyPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Hằng số điện môi:</span>
            <span className="text-amber-400 font-bold">ε_r = {sim.waterProperties.dielectricConstant}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Nhiệt phát tán:</span>
            <span className="text-cyan-400 font-bold">{sim.thermalPowerGeneratedKw} kW</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {/* TAB 1: TRANSPIRING REACTOR AND SALT TRAP */}
        {activeTab === 'TRANSPIRING_REACTOR_AND_SALT_TRAP' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* SVG Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Sơ đồ Lò Phản Ứng Thành Thấm Nước (Transpiring Wall Reactor):</span>
                <span className="font-mono text-orange-400">T = {operatingTempC}°C | P = {operatingPressureMpa} MPa</span>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                <svg viewBox="0 0 700 420" className="w-full h-full">
                  <defs>
                    <linearGradient id="scwoCombustionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#ef4444" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="transpiringWaterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Pressure Vessel Outer Hull (Titanium / Inconel 625) */}
                  <rect x="180" y="30" width="340" height="350" rx="20" fill="#0f172a" stroke="#475569" strokeWidth="4" />
                  <text x="350" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Vỏ Chịu Áp Lực Cao Inconel 625 / Titanium Gr.7 (35 MPa)
                  </text>

                  {/* Transpiring Wall Porous Liner (Left & Right) */}
                  <rect x="220" y="70" width="25" height="260" rx="4" fill="url(#transpiringWaterGrad)" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2" />
                  <rect x="455" y="70" width="25" height="260" rx="4" fill="url(#transpiringWaterGrad)" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="140" y="190" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Màng nước thấm bảo vệ (300°C)
                  </text>
                  <path d="M 170 190 L 215 190" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Supercritical Core (Homogeneous Flameless Combustion Zone) */}
                  <rect x="245" y="70" width="210" height="230" rx="10" fill="url(#scwoCombustionGrad)" fillOpacity="0.35" stroke="#f97316" strokeWidth="2" />
                  <circle cx="350" cy="170" r="50" fill="#ea580c" fillOpacity="0.3" stroke="#f97316" strokeWidth="1.5" />

                  <text x="350" y="140" fill="#fef08a" fontSize="13" fontWeight="bold" textAnchor="middle">
                    VÙNG PHẢN ỨNG SIÊU TỚI HẠN
                  </text>
                  <text x="350" y="160" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    550°C | 25 MPa | ε_r &lt; 5
                  </text>
                  <text x="350" y="180" fill="#fed7aa" fontSize="9" textAnchor="middle">
                    Pha lỏng-khí đồng nhất 1 pha duy nhất
                  </text>
                  <text x="350" y="198" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
                    O₂ + Chất thải hữu cơ (PFAS) tan 100%
                  </text>
                  <text x="350" y="218" fill="#fef2f2" fontSize="9" textAnchor="middle">
                    Cháy gốc tự do trong ~30 - 60 giây
                  </text>
                  <text x="350" y="235" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                    DRE &gt; 99.9999%
                  </text>

                  {/* Feed Inflows (Top) */}
                  {/* Organic Waste */}
                  <path d="M 280 10 L 280 70" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="280" y="8" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">Nước thải hữu cơ</text>

                  {/* Liquid Oxygen (LOX) / Compressed Air */}
                  <path d="M 420 10 L 420 70" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="420" y="8" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Dòng Oxy nén (O₂)</text>

                  {/* Bottom Cold Quench & Salt Trap Zone */}
                  <rect x="245" y="300" width="210" height="70" rx="6" fill="#0369a1" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="350" y="325" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Vùng Làm Nguội Dưới Tới Hạn (Quench)
                  </text>
                  <text x="350" y="342" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                    Muối vô cơ (NaCl, CaF₂, Na₂SO₄) tan lại &amp; xả liên tục
                  </text>
                  <text x="350" y="360" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ★ Không gây tắc nghẽn đường ống!
                  </text>

                  {/* Top Clean Steam & CO2 Outlet */}
                  <path d="M 520 100 L 620 100" stroke="#22c55e" strokeWidth="3" />
                  <circle cx="625" cy="100" r="14" fill="#15803d" />
                  <text x="625" y="104" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">H₂O</text>
                  <text x="590" y="88" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">Hơi nước sạch</text>
                  <text x="590" y="125" fill="#cbd5e1" fontSize="9" textAnchor="middle">+ CO₂ vô hại</text>

                  {/* Bottom Brine Salt Drain */}
                  <path d="M 350 370 L 350 410" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="350" cy="412" r="12" fill="#b45309" />
                  <text x="350" y="416" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Muối</text>
                  <text x="430" y="410" fill="#fcd34d" fontSize="9" fontWeight="bold">Khoáng vô cơ sạch</text>
                </svg>
              </div>
            </div>

            {/* Reactor Architecture Details */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Đặc Tính Dòng Chất Thải Nguy Hại Được Chọn:
                </span>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white text-sm">{selectedBenchmark.vietnameseName}</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-orange-400 bg-orange-950/40 border border-orange-800/40">
                      Nhu cầu COD: {selectedBenchmark.typicalCodMgL.toLocaleString()} ppm
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono">
                    Liên kết bền nhất: {selectedBenchmark.bondDissociationEnergyKjMol} kJ/mol (C-F / C-Cl)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedBenchmark.keyHazard}
                  </p>
                  <div className="text-[11px] text-emerald-400 font-mono pt-1 border-t border-slate-800">
                    Sản phẩm khoáng hóa: {selectedBenchmark.mineralEndProduct}
                  </div>
                </div>
              </div>

              {/* The Severe Salt Plugging Challenge */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs leading-relaxed space-y-2">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Thách Thức Đọng Muối & Giải Pháp Thành Thấm Nước:
                </span>
                <p className="text-slate-400 text-[11px]">
                  Trong nước siêu tới hạn, hằng số điện môi giảm từ <strong>80 xuống dưới 5</strong>, làm các muối vô cơ (NaCl, Na₂SO₄, CaF₂) mất hoàn toàn tính tan (&lt; 100 ppm) và kết tủa dạng keo dính gây nghẹt buồng đốt.
                </p>
                <p className="text-emerald-400/90 text-[11px]">
                  Công nghệ <strong>Thành Thấm Mao Dẫn (Transpiring Wall)</strong> liên tục thẩm thấu màng nước mát 300°C bao quanh thành lòng lò, ngăn chặn muối tiếp xúc bề mặt kim loại, đồng thời gom muối xả liên tục ở đáy buồng làm nguội.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PHASE DIAGRAM AND DIELECTRIC */}
        {activeTab === 'PHASE_DIAGRAM_AND_DIELECTRIC' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Controls */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Thông Số Trạng Thái Nước Siêu Tới Hạn:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Điểm tới hạn của nước: T_c = 374.15°C | P_c = 22.06 MPa
                </p>
              </div>

              {/* Slider 1: Temperature */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Nhiệt độ phản ứng:</span>
                  <span className="font-mono text-orange-400 font-bold">{operatingTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="650"
                  step="10"
                  value={operatingTempC}
                  onChange={e => setOperatingTempC(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>374°C (Điểm Tới Hạn)</span>
                  <span>550°C (Tiêu chuẩn SCWO)</span>
                  <span>650°C (Phá hủy C-F)</span>
                </div>
              </div>

              {/* Slider 2: Pressure */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Áp suất vận hành:</span>
                  <span className="font-mono text-cyan-400 font-bold">{operatingPressureMpa.toFixed(1)} MPa</span>
                </div>
                <input
                  type="range"
                  min="22.5"
                  max="35.0"
                  step="0.5"
                  value={operatingPressureMpa}
                  onChange={e => setOperatingPressureMpa(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>22.1 MPa (Áp suất tới hạn P_c)</span>
                  <span>25 MPa</span>
                  <span>35 MPa</span>
                </div>
              </div>

              {/* Slider 3: Residence Time */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Thời gian lưu thủy động học:</span>
                  <span className="font-mono text-emerald-400 font-bold">{residenceTimeSeconds} giây</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={residenceTimeSeconds}
                  onChange={e => setResidenceTimeSeconds(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: Excess Oxygen Ratio */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Hệ số dư lượng Oxy (O₂ / COD):</span>
                  <span className="font-mono text-amber-400 font-bold">{excessOxygenRatio.toFixed(2)}×</span>
                </div>
                <input
                  type="range"
                  min="1.10"
                  max="2.00"
                  step="0.05"
                  value={excessOxygenRatio}
                  onChange={e => setExcessOxygenRatio(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Properties & Non-Polar Solvation Metrics */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Biến Đổi Tính Chất Lý Hóa Của Nước Tại Trạng Thái Siêu Tới Hạn:
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Hằng Số Điện Môi (ε_r):</span>
                    <span className="text-2xl font-bold font-mono text-amber-400 block mt-1">
                      {sim.waterProperties.dielectricConstant}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Nước lỏng thường ε_r = 80; N-hexane ε_r = 1.9)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Khối Lượng Riêng (ρ):</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 block mt-1">
                      {sim.waterProperties.densityKgM3} kg/m³
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Chuyển tiếp giữa chất lỏng và chất khí)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Độ Hòa Tan Hợp Chất Hữu Cơ:</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1">
                      {sim.waterProperties.organicMiscibilityPct}%
                    </span>
                    <span className="text-[10px] text-slate-500">Hòa tan hoàn toàn không tạo giọt phân lớp</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Độ Hòa Tan Muối Vô Cơ:</span>
                    <span className="text-2xl font-bold font-mono text-red-400 block mt-1">
                      &lt; {sim.waterProperties.saltSolubilityPpm} ppm
                    </span>
                    <span className="text-[10px] text-slate-500">Muối tách hoàn toàn khỏi dung dịch</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Tích số ion pKw:</span>
                    <span className="text-slate-200 font-bold">{sim.waterProperties.ionicProductLogKw}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Cơ chế phản ứng chủ đạo:</span>
                    <span className="text-orange-400 font-bold">Cháy gốc tự do đồng thể (Free-Radical Homogeneous)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Trở lực truyền khối pha:</span>
                    <span className="text-emerald-400 font-bold">0 (Không có ranh giới pha lỏng-khí!)</span>
                  </div>
                </div>
              </div>

              {/* Zero NOx Scientific Explanation */}
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300/90 leading-relaxed font-mono">
                <span className="font-bold text-emerald-200 block mb-0.5">
                  ★ Tại Sao SCWO Hoàn Toàn Không Tạo Ra Khí NOx Và Dioxin?
                </span>
                Cơ chế nhiệt Zeldovich sinh khí NOx chỉ kích hoạt khi nhiệt độ lò đốt vượt quá 1,200°C. Do SCWO cháy đồng thể ở nhiệt độ vừa phải (450 - 650°C), không có điểm nóng cục bộ nên nồng độ NOx là <strong>0.0 ppm</strong>. Đồng thời môi trường nước áp suất cao dập tắt hoàn toàn phản ứng tổng hợp dioxin/furan!
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTOTHERMAL PFAS DESTRUCTION */}
        {activeTab === 'AUTOTHERMAL_PFAS_DESTRUCTION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* COD and Flow Sliders */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Cân Bằng Năng Lượng Tự Nhiệt (Autothermal):
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Khi COD &gt; 40,000 ppm, phản ứng cháy tự sinh nhiệt duy trì mà không cần nhiên liệu phụ
                </p>
              </div>

              {/* Slider 1: COD */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Nhu cầu Oxy hóa học (COD):</span>
                  <span className="font-mono text-orange-400 font-bold">{organicCodPpm.toLocaleString()} ppm</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={organicCodPpm}
                  onChange={e => setOrganicCodPpm(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>20,000 ppm</span>
                  <span className="text-emerald-400 font-bold">40,000 ppm (Ngưỡng tự nhiệt)</span>
                  <span>150,000 ppm</span>
                </div>
              </div>

              {/* Slider 2: Waste Flow Rate */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Lưu lượng nạp chất thải:</span>
                  <span className="font-mono text-cyan-400 font-bold">{wasteFeedFlowRateKgH.toLocaleString()} kg/h</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={wasteFeedFlowRateKgH}
                  onChange={e => setWasteFeedFlowRateKgH(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Autothermal Status Banner */}
              <div className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 ${
                sim.isAutothermal
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-950/30 border-amber-500/50 text-amber-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Trạng Thái Tự Nhiệt (Autothermal):</span>
                  <span>{sim.isAutothermal ? '✓ TỰ DUY TRÌ NHIỆT 100%' : '⚠ CẦN BỔ SUNG NHIỆT PHỤ'}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                  <span>Nhiệt lượng tỏa ra:</span>
                  <span className="font-bold text-orange-400">{sim.thermalPowerGeneratedKw} kW</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Điện sạch xuất lưới:</span>
                  <span className="font-bold text-cyan-400">{sim.energyEconomics.netElectricityExportKwhTon} kWh / tấn thải</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Chi phí xử lý ròng:</span>
                  <span className="font-bold text-emerald-400">${sim.energyEconomics.operatingCostPerTonWasteUsd} / tấn</span>
                </div>
              </div>
            </div>

            {/* PFAS Destruction & Zero Emissions Showcase */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Phá Hủy Triệt Để "Hóa Chất Vĩnh Cửu" PFAS & Khí Thải Sạch:
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Khoáng Hóa Liên Kết C-F:</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1">
                      {sim.pfasMineralizationPct}%
                    </span>
                    <span className="text-[10px] text-slate-500">Chuyển thành muối florua CaF₂ vô hại</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block">Thu Hồi Nước Tinh Khiết:</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 block mt-1">
                      {sim.cleanWaterRecoveryM3Day} m³/ngày
                    </span>
                    <span className="text-[10px] text-slate-500">Nước sạch tái sử dụng công nghiệp</span>
                  </div>
                </div>

                {/* Emissions Zero Badges */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-300 font-semibold block">
                    Chứng Chỉ Không Phát Thải Khí Độc (EPA Verified Zero Emissions):
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900 border border-emerald-500/40">
                      <span className="text-slate-500 block text-[10px]">Khí NOx</span>
                      <span className="text-emerald-400 font-bold text-sm">0.0 ppm</span>
                      <span className="text-[9px] text-slate-400">Không có</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-emerald-500/40">
                      <span className="text-slate-500 block text-[10px]">Dioxin / Furan</span>
                      <span className="text-emerald-400 font-bold text-sm">0.0 ng/m³</span>
                      <span className="text-[9px] text-slate-400">Không có</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-cyan-500/40">
                      <span className="text-slate-500 block text-[10px]">Muối Khoáng Thu</span>
                      <span className="text-cyan-400 font-bold text-sm">{sim.effluentEmissions.inorganicSaltsSeparatedKgH} kg/h</span>
                      <span className="text-[9px] text-slate-400">Muối khoáng vô hại</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Economic comparison */}
              <div className="mt-4 p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300 leading-relaxed font-mono">
                <span className="font-bold text-cyan-200 block mb-0.5">
                  So Sánh Kinh Tế vs Lò Đốt Rác Nhiệt Độ Cao (Incinerator):
                </span>
                Lò đốt chất thải nguy hại truyền thống tiêu tốn $300 - $800/tấn do phải dùng vòi đốt dầu 1,200°C và hệ thống lọc bụi/khử axit khổng lồ. SCWO tự cháy trong nước chỉ tốn ~$72/tấn, hoàn toàn khép kín không ống khói!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SupercriticalWaterOxidationVisualizer;
