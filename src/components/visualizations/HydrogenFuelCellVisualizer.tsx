// src/components/visualizations/HydrogenFuelCellVisualizer.tsx
// Interactive Visualizer: Hydrogen Fuel Cells (PEMFC & SOFC) & FCEV Vehicle Stack Simulation
// Standards: IUPAC Electrochemistry, DOE Technical Targets & Vietnam GDPT 2018 (Hóa 10 & 12: Điện hóa học, Oxi hóa khử, Năng lượng Hydro Xanh)

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Zap,
  Flame,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  Cpu,
  TrendingUp,
  ArrowRight,
  Droplets,
  Wind,
  Atom,
  RefreshCw,
  Sliders,
  Car
} from 'lucide-react';
import {
  FUEL_CELL_SYSTEMS_CATALOG,
  getFuelCellSystems,
  calculateReversibleCellVoltage,
  generateFuelCellPolarizationCurve,
  simulateFcevStackPerformance,
  FuelCellTechnology,
  FuelCellSystemSpec
} from '../../domain/hydrogenFuelCellEngine';
import { sound } from '../../audio/soundEngine';

type FuelCellTabMode = 'MEMBRANE_CROSS_SECTION' | 'FCEV_STACK_SIMULATOR' | 'POLARIZATION_EFFICIENCY';

export const HydrogenFuelCellVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FuelCellTabMode>('MEMBRANE_CROSS_SECTION');

  // Technology selection
  const [selectedTechId, setSelectedTechId] = useState<FuelCellTechnology>('PEMFC_PROTON_EXCHANGE');

  // Stack Simulator state
  const [cellCount, setCellCount] = useState<number>(330);
  const [activeAreaCm2, setActiveAreaCm2] = useState<number>(300);
  const [operatingCurrentDensity, setOperatingCurrentDensity] = useState<number>(1.0);
  const [h2TankKg, setH2TankKg] = useState<number>(5.6);

  // Polarization state
  const [operatingTempC, setOperatingTempC] = useState<number>(75);
  const [operatingPressureBar, setOperatingPressureBar] = useState<number>(2.0);

  const selectedSpec = useMemo(() => {
    return FUEL_CELL_SYSTEMS_CATALOG.find(s => s.id === selectedTechId) || FUEL_CELL_SYSTEMS_CATALOG[0];
  }, [selectedTechId]);

  // Stack calculation
  const stackResult = useMemo(() => {
    return simulateFcevStackPerformance(
      selectedTechId,
      cellCount,
      activeAreaCm2,
      operatingCurrentDensity,
      h2TankKg
    );
  }, [selectedTechId, cellCount, activeAreaCm2, operatingCurrentDensity, h2TankKg]);

  // Polarization curve
  const polarizationData = useMemo(() => {
    return generateFuelCellPolarizationCurve(selectedTechId, operatingTempC, operatingPressureBar);
  }, [selectedTechId, operatingTempC, operatingPressureBar]);

  // Peak power in curve
  const peakPowerPoint = useMemo(() => {
    return polarizationData.reduce((prev, curr) => 
      curr.powerDensityWCm2 > prev.powerDensityWCm2 ? curr : prev,
      polarizationData[0]
    );
  }, [polarizationData]);

  return (
    <div className="bg-obsidian/90 border border-cyan-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cyan-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-inner">
              <Zap className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                PIN NHIÊN LIỆU HYDRO (PEMFC & SOFC) & ĐIỆN HÓA HỌC FCEV
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Cơ chế khử oxy ORR & oxi hóa hydro HOR • Màng Nafion & Gốm 8YSZ • Bộ Pin Xe Điện FCEV Phát Thải Ròng Bằng 0
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-cyan-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('MEMBRANE_CROSS_SECTION');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'MEMBRANE_CROSS_SECTION'
                ? 'bg-cyan-500 text-obsidian shadow-lg font-black ring-1 ring-cyan-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Mặt Cắt Màng & Điện Cực</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('FCEV_STACK_SIMULATOR');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'FCEV_STACK_SIMULATOR'
                ? 'bg-sky-500 text-obsidian shadow-lg font-black ring-1 ring-sky-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Bộ Pin FCEV (Xe Ô Tô)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('POLARIZATION_EFFICIENCY');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'POLARIZATION_EFFICIENCY'
                ? 'bg-blue-500 text-obsidian shadow-lg font-black ring-1 ring-blue-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Đường Cong Phân Cực V-J</span>
          </button>
        </div>
      </div>

      {/* MODE 1: MEMBRANE ELECTRODE ASSEMBLY (MEA) CROSS-SECTION */}
      {activeTab === 'MEMBRANE_CROSS_SECTION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Fuel Cell Technology Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5" />
              Công Nghệ Pin Nhiên Liệu Hydro
            </h3>
            <div className="space-y-2">
              {FUEL_CELL_SYSTEMS_CATALOG.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedTechId(tech.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedTechId === tech.id
                      ? 'bg-cyan-500/20 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/50'
                      : 'bg-obsidian-light/40 border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-ivory">{tech.nameVi}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {tech.chargeCarrierIon}
                    </span>
                  </div>
                  <p className="text-xs italic text-ivory-muted">{tech.scientificName}</p>
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-2 text-ivory/80 pt-2 border-t border-white/5">
                    <div>
                      Nhiệt độ: <span className="font-mono text-cyan-300 font-bold">{tech.operatingTempCelsiusRange[0]} - {tech.operatingTempCelsiusRange[1]}°C</span>
                    </div>
                    <div>
                      Hiệu suất LHV: <span className="font-mono text-emerald-300 font-bold">{tech.systemEfficiencyLhvPercent}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Catalysts & Reaction Summary */}
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/10 space-y-2.5 text-xs">
              <div className="font-bold text-ivory flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Vật Liệu Xúc Tác & Điện Giải</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-ivory-muted">
                <div>
                  <span className="text-cyan-300 font-bold">Chất điện giải: </span>
                  {selectedSpec.electrolyteMaterialVi}
                </div>
                <div>
                  <span className="text-emerald-300 font-bold">Xúc tác Anode: </span>
                  {selectedSpec.anodeCatalystVi}
                </div>
                <div>
                  <span className="text-rose-300 font-bold">Xúc tác Cathode (ORR): </span>
                  {selectedSpec.cathodeCatalystVi}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive MEA Animated SVG Diagram */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-cyan-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-cyan-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Mặt Cắt Ngang Màng Điện Cực MEA (Membrane Electrode Assembly)</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Anode: {selectedSpec.anodeReactionVi} • Cathode: {selectedSpec.cathodeReactionVi}
                  </p>
                </div>
              </div>

              {/* Animated SVG Visualization of Fuel Cell Triple-Phase Boundary */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[320px]">
                  <defs>
                    <linearGradient id="anodePlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="membraneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="cathodePlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e11d48" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#be123c" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* 1. Left Bipolar Plate & Anode Flow Channel (H2 Gas In) */}
                  <rect x="20" y="20" width="80" height="280" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="60" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    KHÍ H₂ VÀO
                  </text>
                  {/* Flow channel grooves */}
                  <path d="M 60 70 L 60 250" stroke="#0284c7" strokeWidth="12" strokeDasharray="8,6" className="animate-pulse" />
                  <text x="60" y="280" fill="#94a3b8" fontSize="10" textAnchor="middle">CỰC ANODE (-)</text>

                  {/* 2. Anode Gas Diffusion Layer (GDL) */}
                  <rect x="110" y="20" width="60" height="280" fill="#334155" opacity="0.6" rx="4" />
                  <text x="140" y="160" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(-90 140 160)" textAnchor="middle">
                    LỚP KHUẾCH TÁN GDL
                  </text>

                  {/* 3. Anode Catalyst Layer (Pt/C Nanoparticles) */}
                  <rect x="180" y="20" width="40" height="280" fill="#0284c7" opacity="0.5" rx="3" />
                  {/* Catalyst active sites (dots) */}
                  {[40, 80, 120, 160, 200, 240, 270].map((y, idx) => (
                    <circle key={`cat-a-${idx}`} cx="200" cy={y} r="4" fill="#38bdf8" />
                  ))}

                  {/* 4. Center: Proton Exchange / Solid Oxide Membrane */}
                  <rect x="230" y="20" width="240" height="280" fill="url(#membraneGrad)" rx="6" stroke="#34d399" strokeWidth="1.5" />
                  <text x="350" y="50" fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">
                    {selectedSpec.chargeCarrierIon === 'H+'
                      ? 'MÀNG TRAO ĐỔI PROTON NAFION (H⁺)'
                      : selectedSpec.chargeCarrierIon === 'O2-'
                      ? 'GỐM OXIT RẮN 8YSZ (O²⁻)'
                      : 'MÀNG TRAO ĐỔI ANION (OH⁻)'}
                  </text>

                  {/* Animated Ions migration inside membrane */}
                  {selectedSpec.chargeCarrierIon === 'H+' && (
                    <g className="animate-pulse">
                      {[70, 110, 150, 190, 230, 260].map((y, idx) => (
                        <g key={`h-ion-${idx}`}>
                          <circle cx={270 + (idx % 3) * 60} cy={y} r="10" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.5" />
                          <text x={270 + (idx % 3) * 60} cy={y + 3.5} fill="#022c22" fontSize="9" fontWeight="bold" textAnchor="middle">
                            H⁺
                          </text>
                          <line x1={250 + (idx % 3) * 60} y1={y} x2={290 + (idx % 3) * 60} y2={y} stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3,2" />
                        </g>
                      ))}
                      <text x="350" y="285" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Cơ chế Grotthuss: Proton nhảy giữa các phân tử H₂O liên kết
                      </text>
                    </g>
                  )}

                  {selectedSpec.chargeCarrierIon === 'O2-' && (
                    <g className="animate-pulse">
                      {[70, 120, 170, 220, 260].map((y, idx) => (
                        <g key={`o-ion-${idx}`}>
                          <circle cx={430 - (idx % 3) * 60} cy={y} r="10" fill="#f43f5e" stroke="#fecdd3" strokeWidth="1.5" />
                          <text x={430 - (idx % 3) * 60} cy={y + 3.5} fill="#4c0519" fontSize="8" fontWeight="bold" textAnchor="middle">
                            O²⁻
                          </text>
                          <line x1={450 - (idx % 3) * 60} y1={y} x2={410 - (idx % 3) * 60} y2={y} stroke="#fda4af" strokeWidth="2" strokeDasharray="3,2" />
                        </g>
                      ))}
                      <text x="350" y="285" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Ion O²⁻ nhảy qua các vị trí khuyết tật oxy trong mạng tinh thể YSZ
                      </text>
                    </g>
                  )}

                  {/* 5. Cathode Catalyst Layer (Pt3Ni / Perovskite) */}
                  <rect x="480" y="20" width="40" height="280" fill="#f43f5e" opacity="0.5" rx="3" />
                  {[40, 80, 120, 160, 200, 240, 270].map((y, idx) => (
                    <circle key={`cat-c-${idx}`} cx="500" cy={y} r="4" fill="#fb7185" />
                  ))}

                  {/* 6. Cathode Gas Diffusion Layer (GDL) */}
                  <rect x="530" y="20" width="60" height="280" fill="#334155" opacity="0.6" rx="4" />
                  <text x="560" y="160" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(90 560 160)" textAnchor="middle">
                    LỚP KHUẾCH TÁN GDL
                  </text>

                  {/* 7. Right Cathode Bipolar Plate & Air/O2 Flow Channel */}
                  <rect x="600" y="20" width="80" height="280" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="640" y="55" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
                    KHÍ O₂ (KHÔNG KHÍ)
                  </text>
                  <path d="M 640 70 L 640 250" stroke="#e11d48" strokeWidth="12" strokeDasharray="8,6" className="animate-pulse" />
                  <text x="640" y="280" fill="#94a3b8" fontSize="10" textAnchor="middle">CỰC CATHODE (+)</text>

                  {/* Water Droplets leaving exhaust */}
                  <circle cx="640" cy="220" r="7" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" className="animate-bounce" />
                  <text x="640" y="245" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">H₂O Nước sạch</text>

                  {/* External Circuit with Electric Load */}
                  <path d="M 100 20 L 100 8 L 600 8 L 600 20" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="350" cy="8" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                  <text x="350" y="12" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">ĐỘNG CƠ</text>
                  <text x="210" y="12" fill="#fbbf24" fontSize="10" fontWeight="bold">← 4 e⁻ Dòng điện</text>
                </svg>
              </div>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Đặc Điểm Nhiên Liệu & Tính Linh Hoạt
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedSpec.fuelFlexibilityVi}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Ứng Dụng Thực Tiễn Điển Hình
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedSpec.primaryApplicationsVi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FCEV VEHICLE STACK & HYDROGEN RANGE SIMULATOR */}
      {activeTab === 'FCEV_STACK_SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-sky-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" />
                Thông Số Thiết Kế Bộ Pin FCEV (Fuel Cell Stack)
              </h3>

              {/* Sliders */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Số lượng tế bào nối tiếp (N_cells):</span>
                    <span className="font-mono text-cyan-300 font-bold">{cellCount} tế bào</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={400}
                    step={10}
                    value={cellCount}
                    onChange={(e) => setCellCount(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>100 (Drone/Xe máy)</span>
                    <span>330 (Toyota Mirai)</span>
                    <span>400 (Xe tải hạng nặng)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Diện tích hoạt động mỗi cell:</span>
                    <span className="font-mono text-emerald-300 font-bold">{activeAreaCm2} cm²</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={400}
                    step={10}
                    value={activeAreaCm2}
                    onChange={(e) => setActiveAreaCm2(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>150 cm²</span>
                    <span>300 cm² (Chuẩn)</span>
                    <span>400 cm² (Công suất lớn)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Mật độ dòng điện vận hành (J):</span>
                    <span className="font-mono text-amber-300 font-bold">{operatingCurrentDensity} A/cm²</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={1.8}
                    step={0.1}
                    value={operatingCurrentDensity}
                    onChange={(e) => setOperatingCurrentDensity(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>0.2 A/cm² (Hiệu suất cao)</span>
                    <span>1.0 A/cm² (Danh định)</span>
                    <span>1.8 A/cm² (Tăng tốc max)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Dung tích bình hydro nén 700 bar:</span>
                    <span className="font-mono text-sky-300 font-bold">{h2TankKg} kg H₂</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={10.0}
                    step={0.2}
                    value={h2TankKg}
                    onChange={(e) => setH2TankKg(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>2.0 kg</span>
                    <span>5.6 kg (Mirai)</span>
                    <span>10.0 kg (Đường dài)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Vehicle Telemetry Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            {/* Zero Emission Green Badge */}
            <div className="p-4 rounded-xl border bg-emerald-500/15 border-emerald-400/60 text-emerald-300 flex items-center gap-3.5">
              <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-emerald-400" />
              <div>
                <div className="font-black text-sm uppercase tracking-wide">
                  PHÁT THẢI RÒNG BẰNG KHÔNG: {stackResult.co2EmissionsGramsPerKm} g CO₂/km
                </div>
                <div className="text-xs text-ivory-muted mt-0.5">
                  Khí thải duy nhất thoát ra từ ống pô xe FCEV là hơi nước tinh khiết (H₂O). Thời gian tiếp nhiên liệu hydro 700 bar chỉ mất 3 - 5 phút.
                </div>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Công Suất Điện Stack</span>
                <span className="text-2xl font-mono font-black text-cyan-400">
                  {stackResult.stackElectricPowerKw}
                </span>
                <span className="text-[10px] text-ivory-muted block">kW ({Math.round(stackResult.stackElectricPowerKw * 1.341)} HP)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Tầm Vận Hành FCEV</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {stackResult.drivingRangeKm}
                </span>
                <span className="text-[10px] text-emerald-400/80 block">km mỗi lần nạp đầy</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Tiêu Hao Hydro</span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {stackResult.hydrogenConsumptionKgPerHour}
                </span>
                <span className="text-[10px] text-ivory-muted block">kg H₂/giờ ở công suất này</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Sản Sinh Nước H₂O</span>
                <span className="text-2xl font-mono font-black text-sky-400">
                  {stackResult.waterProductionLitersPerHour}
                </span>
                <span className="text-[10px] text-ivory-muted block">Lít nước tinh khiết/giờ</span>
              </div>
            </div>

            {/* Detailed Electrical Telemetry */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Thông Số Vận Hành Tế Bào & Bộ Pin (Stack Electrical Telemetry)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Điện thế 1 cell (V_cell):</span>
                  <span className="font-mono text-cyan-300 font-bold text-base">{stackResult.singleCellVoltageV} V</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Điện thế tổng stack:</span>
                  <span className="font-mono text-sky-300 font-bold text-base">{stackResult.stackTotalVoltageV} V</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Dòng điện tổng:</span>
                  <span className="font-mono text-emerald-300 font-bold text-base">{stackResult.stackCurrentAmperes} A</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Hiệu suất điện stack:</span>
                  <span className="font-mono text-amber-300 font-bold text-base">{stackResult.stackEfficiencyPercent}%</span>
                </div>
              </div>
            </div>

            {/* Thermodynamic & Waste Heat Dissipation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-obsidian-light/40 to-blue-950/40 border border-sky-500/20 text-xs text-ivory-muted space-y-1.5">
              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Quản Lý Nhiệt & Tản Nhiệt: {stackResult.wasteHeatGenerationKw} kW Nhiệt Hao Phí
              </span>
              <p className="leading-relaxed">
                Tại mật độ dòng điện lớn, chênh lệch giữa điện thế nhiệt động học HHV (1.482 V) và điện thế hoạt động (V_cell) chuyển thành nhiệt năng. Xe FCEV sử dụng bơm tuần hoàn nước làm mát qua bộ tản nhiệt cỡ lớn để duy trì màng Nafion luôn ở nhiệt độ tối ưu 70 - 80°C và độ ẩm 100% RH tránh làm khô màng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: POLARIZATION & EFFICIENCY BREAKDOWN CURVES */}
      {activeTab === 'POLARIZATION_EFFICIENCY' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Đường Cong Phân Cực V-J & Mật Độ Công Suất (Fuel Cell Polarization Curve)
              </h3>
              <p className="text-xs text-ivory-muted">
                Phân tích 3 cơ chế tổn thất overpotential: Hoạt hóa ORR (Activation), Điện trở màng (Ohmic ASR) và Nghẽn khí (Concentration)
              </p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              Công suất cực đại: <span className="font-bold text-amber-400">{peakPowerPoint.powerDensityWCm2} W/cm²</span> tại {peakPowerPoint.currentDensityACm2} A/cm²
            </div>
          </div>

          {/* Environmental Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-obsidian-light/40 border border-white/5 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-ivory-muted">Nhiệt độ vận hành:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={50}
                  max={90}
                  step={5}
                  value={operatingTempC}
                  onChange={(e) => setOperatingTempC(Number(e.target.value))}
                  className="w-28 accent-cyan-400 cursor-pointer"
                />
                <span className="font-mono text-cyan-300 font-bold">{operatingTempC}°C</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-ivory-muted">Áp suất khí cung cấp:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1.0}
                  max={3.0}
                  step={0.5}
                  value={operatingPressureBar}
                  onChange={(e) => setOperatingPressureBar(Number(e.target.value))}
                  className="w-28 accent-sky-400 cursor-pointer"
                />
                <span className="font-mono text-sky-300 font-bold">{operatingPressureBar} bar</span>
              </div>
            </div>
          </div>

          {/* Polarization SVG Plot */}
          <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
            <div className="bg-obsidian rounded-xl p-4 border border-white/5 relative">
              <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[340px]">
                {/* Grid Lines */}
                <line x1="60" y1="20" x2="60" y2="270" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="270" x2="660" y2="270" stroke="#334155" strokeWidth="1" />
                <line x1="660" y1="20" x2="660" y2="270" stroke="#334155" strokeWidth="1" />

                <line x1="60" y1="70" x2="660" y2="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="120" x2="660" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="170" x2="660" y2="170" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="220" x2="660" y2="220" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Axis Labels */}
                <text x="60" y="290" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="360" y="305" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Mật Độ Dòng Điện J (A/cm²)
                </text>
                <text x="660" y="290" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {polarizationData[polarizationData.length - 1]?.currentDensityACm2}
                </text>

                {/* Left Y Axis: Voltage (0 - 1.25 V) */}
                <text x="25" y="145" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(-90 25 145)" textAnchor="middle">
                  Điện Thế Cell V_cell (V)
                </text>
                <text x="50" y="25" fill="#38bdf8" fontSize="10" textAnchor="end">1.25 V</text>
                <text x="50" y="145" fill="#38bdf8" fontSize="10" textAnchor="end">0.65 V</text>
                <text x="50" y="270" fill="#38bdf8" fontSize="10" textAnchor="end">0 V</text>

                {/* Right Y Axis: Power Density (W/cm²) */}
                <text x="695" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold" transform="rotate(90 695 145)" textAnchor="middle">
                  Mật Độ Công Suất (W/cm²)
                </text>
                <text x="665" y="25" fill="#f59e0b" fontSize="10" textAnchor="start">
                  {(peakPowerPoint.powerDensityWCm2 * 1.2).toFixed(2)}
                </text>
                <text x="665" y="270" fill="#f59e0b" fontSize="10" textAnchor="start">0</text>

                {/* Draw Voltage & Power Curves */}
                {(() => {
                  const maxJ = polarizationData[polarizationData.length - 1]?.currentDensityACm2 || 1;
                  const vPath = polarizationData.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityACm2 / maxJ) * 600;
                    const y = 270 - (pt.cellVoltageV / 1.25) * 250;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const maxP = peakPowerPoint.powerDensityWCm2 * 1.2 || 1;
                  const pPath = polarizationData.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityACm2 / maxJ) * 600;
                    const y = 270 - (pt.powerDensityWCm2 / maxP) * 250;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const peakX = 60 + (peakPowerPoint.currentDensityACm2 / maxJ) * 600;
                  const peakY = 270 - (peakPowerPoint.powerDensityWCm2 / maxP) * 250;

                  return (
                    <g>
                      {/* Polarization Loss Regimes Background Bars */}
                      <rect x="65" y="25" width="120" height="20" rx="4" fill="#38bdf8" opacity="0.12" />
                      <text x="125" y="38" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Hoạt Hóa ORR (Tafel)
                      </text>

                      <rect x="200" y="25" width="280" height="20" rx="4" fill="#10b981" opacity="0.12" />
                      <text x="340" y="38" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Ohmic Màng Nafion (Tuyến tính)
                      </text>

                      <rect x="500" y="25" width="150" height="20" rx="4" fill="#f43f5e" opacity="0.12" />
                      <text x="575" y="38" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Nghẽn Nồng Độ (Mass Transport)
                      </text>

                      {/* Voltage curve */}
                      <path d={vPath} fill="none" stroke="#38bdf8" strokeWidth="3" />
                      {/* Power curve */}
                      <path d={pPath} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,2" />

                      {/* Peak Power Indicator */}
                      <circle cx={peakX} cy={peakY} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" className="animate-pulse" />
                      <text x={peakX} y={peakY - 12} fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                        P_max ({peakPowerPoint.powerDensityWCm2} W/cm²)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Educational Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-obsidian border border-cyan-500/20 space-y-1">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                  1. Tổn Thất Hoạt Hóa (Activation)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Động học phản ứng khử oxy (ORR) 4 electron diễn ra chậm chạp trên bề mặt hạt nano Platin, tạo ra độ sụt áp ban đầu 0.2 - 0.3 V ngay khi bắt đầu sinh dòng điện (tuân theo phương trình Tafel).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                  2. Tổn Thất Ohmic Màng & Điện Cực
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Độ dốc tuyến tính V = I * ASR xuất phát từ điện trở dẫn proton của màng Nafion (cần độ ẩm cao để duy trì độ dẫn) và điện trở tiếp xúc giữa các tấm lưỡng cực than chì.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                  3. Tổn Thất Nồng Độ & Ngập Nước
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Ở mật độ dòng cao, oxy bị tiêu thụ nhanh hơn tốc độ khuếch tán qua lớp GDL, đồng thời nước sinh ra gây ngập úng mao quản (flooding), khiến điện thế sụt giảm đột ngột về 0 V.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
