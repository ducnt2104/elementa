// src/components/visualizations/SolidStateBatteryVisualizer.tsx
// Interactive Visualizer: Solid-State Battery Electrolytes, Dendrite Prevention & Fast Ion Conduction
// Standards: IUPAC Electrochemistry, Monroe-Newman Criterion (1972) & Vietnam GDPT 2018 (Hóa học & Vật lý Năng lượng Mới)

import React, { useState, useMemo } from 'react';
import {
  BatteryCharging,
  Activity,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  Gauge,
  Box,
  Cpu,
  Atom,
  TrendingUp,
  Thermometer,
  ShieldAlert
} from 'lucide-react';
import {
  SOLID_ELECTROLYTES_CATALOG,
  calculateArrheniusConductivity,
  evaluateLithiumDendriteRisk,
  simulateSolidStateBatteryCell,
  SolidElectrolyteMaterial
} from '../../domain/solidStateBatteryEngine';
import { sound } from '../../audio/soundEngine';

type SsbTabMode = 'IONIC_CONDUCTION_ARRHENIUS' | 'DENDRITE_PREVENTION' | 'ASSB_CELL_PERFORMANCE';

export const SolidStateBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SsbTabMode>('IONIC_CONDUCTION_ARRHENIUS');

  // Mode 1: Conduction State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('LLZO_GARNET');
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25);

  // Mode 2: Dendrite Risk State
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(1.2);
  const [stackPressureMpa, setStackPressureMpa] = useState<number>(5.0);
  const [hasLithiophilicInterlayer, setHasLithiophilicInterlayer] = useState<boolean>(true);

  // Mode 3: ASSB Cell State
  const [cathodeType, setCathodeType] = useState<'NMC811' | 'LFP'>('NMC811');
  const [cRate, setCRate] = useState<number>(0.5);
  const [nailPunctureTestActive, setNailPunctureTestActive] = useState<boolean>(false);

  // Computed values
  const currentMaterial = useMemo(() => {
    return SOLID_ELECTROLYTES_CATALOG.find(m => m.id === selectedMaterialId) || SOLID_ELECTROLYTES_CATALOG[0];
  }, [selectedMaterialId]);

  const effectiveConductivity = useMemo(() => {
    return calculateArrheniusConductivity(selectedMaterialId, temperatureCelsius);
  }, [selectedMaterialId, temperatureCelsius]);

  const dendriteAssessment = useMemo(() => {
    return evaluateLithiumDendriteRisk(selectedMaterialId, currentDensityMaCm2, stackPressureMpa, hasLithiophilicInterlayer);
  }, [selectedMaterialId, currentDensityMaCm2, stackPressureMpa, hasLithiophilicInterlayer]);

  const assbPerformance = useMemo(() => {
    return simulateSolidStateBatteryCell(selectedMaterialId, cathodeType, temperatureCelsius, cRate);
  }, [selectedMaterialId, cathodeType, temperatureCelsius, cRate]);

  const handleTabChange = (mode: SsbTabMode) => {
    sound.playUiClick();
    setActiveTab(mode);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BatteryCharging className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Pin Toàn Rắn (ASSB), Cản Nhánh Cây Li & Dẫn Ion Nhanh
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                Monroe-Newman / IUPAC
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chất điện ly Garnet LLZO, Sunfua LGPS, Polyme SPE, Dòng tới hạn CCD & An toàn đâm xuyên
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleTabChange('IONIC_CONDUCTION_ARRHENIUS')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'IONIC_CONDUCTION_ARRHENIUS'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Độ Dẫn Ion & Arrhenius
          </button>
          <button
            onClick={() => handleTabChange('DENDRITE_PREVENTION')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'DENDRITE_PREVENTION'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Cản Nhánh Cây Li (Dendrite)
          </button>
          <button
            onClick={() => handleTabChange('ASSB_CELL_PERFORMANCE')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'ASSB_CELL_PERFORMANCE'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Hiệu Năng Cell Toàn Rắn
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {/* TAB 1: IONIC CONDUCTION & ARRHENIUS */}
        {activeTab === 'IONIC_CONDUCTION_ARRHENIUS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    1. Chọn Chất Điện Ly Rắn (Solid Electrolyte)
                  </label>
                  <div className="space-y-2">
                    {SOLID_ELECTROLYTES_CATALOG.map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedMaterialId(mat.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          selectedMaterialId === mat.id
                            ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{mat.nameVi.split('(')[0]}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {mat.chemicalFormula} • σ(25°C): {mat.roomTempConductivitymScm} mS/cm
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          mat.family === 'OXIDE_GARNET'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : mat.family === 'SULFIDE_ARGYRODITE'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {mat.familyNameVi.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature Slider */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-cyan-400" />
                      Nhiệt Độ Môi Trường Hoạt Động (T)
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{temperatureCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={80}
                    step={5}
                    value={temperatureCelsius}
                    onChange={e => setTemperatureCelsius(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>-20°C (Mùa đông băng giá)</span>
                    <span>25°C (Nhiệt độ phòng)</span>
                    <span>80°C (Vận hành nhiệt cao)</span>
                  </div>
                </div>

                {/* Material Properties Snapshot */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Năng lượng hoạt hóa (E_a):</span>
                    <span className="font-mono text-amber-400 font-semibold">{currentMaterial.activationEnergyEv} eV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mô đun trượt cơ học (G):</span>
                    <span className="font-mono text-cyan-400 font-semibold">{currentMaterial.shearModulusGpa} GPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cửa sổ ổn định điện hóa:</span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      {currentMaterial.electrochemicalStabilityWindowV[0]}V - {currentMaterial.electrochemicalStabilityWindowV[1]}V
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <strong className="text-slate-300">Độ nhạy hơi ẩm:</strong> {currentMaterial.moistureSensitivityVi}
                  </div>
                </div>
              </div>

              {/* Display & Lattice Simulation Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Real-time Conductivity Gauge Card */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Độ Dẫn Ion Thực Tế σ(T)</div>
                    <div className="text-2xl font-bold text-cyan-400 font-mono mt-0.5">
                      {effectiveConductivity} <span className="text-sm">mS/cm</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Điện ly lỏng thương phẩm tham chiếu: ~10 mS/cm
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                      effectiveConductivity >= 1.0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : effectiveConductivity >= 0.1
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {effectiveConductivity >= 1.0 ? 'Dẫn Ion Nhanh Siêu Cấp' : effectiveConductivity >= 0.1 ? 'Khả Dụng Ở T Đột Phá' : 'Nghẽn Dòng Ion T Low'}
                    </span>
                  </div>
                </div>

                {/* SVG Crystal Lattice Ion Hopping Diagram */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Atom className="w-4 h-4 text-cyan-400" />
                      Mô Phỏng Nhảy Kênh Li⁺ Qua Khe Nghẽn Mạng Tinh Thể (Ion Hopping)
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Arrhenius: σ = (σ₀/T)·exp(-Ea/kT)
                    </span>
                  </div>

                  <div className="h-60 w-full flex items-center justify-center">
                    <svg viewBox="0 0 380 200" className="w-full h-full">
                      {/* Host Lattice Atoms (Zr/La/O or P/S) */}
                      <g fill="#334155" stroke="#475569" strokeWidth="1">
                        <circle cx="60" cy="50" r="14" />
                        <circle cx="160" cy="50" r="14" />
                        <circle cx="260" cy="50" r="14" />
                        <circle cx="60" cy="150" r="14" />
                        <circle cx="160" cy="150" r="14" />
                        <circle cx="260" cy="150" r="14" />
                      </g>

                      {/* Bottleneck Interstitial Pathways */}
                      <line x1="60" y1="50" x2="160" y2="50" stroke="#1e293b" strokeWidth="3" strokeDasharray="4,3" />
                      <line x1="160" y1="50" x2="260" y2="50" stroke="#1e293b" strokeWidth="3" strokeDasharray="4,3" />
                      <line x1="60" y1="150" x2="160" y2="150" stroke="#1e293b" strokeWidth="3" strokeDasharray="4,3" />
                      <line x1="160" y1="150" x2="260" y2="150" stroke="#1e293b" strokeWidth="3" strokeDasharray="4,3" />
                      <line x1="110" y1="100" x2="210" y2="100" stroke="#0ea5e9" strokeWidth="2.5" strokeOpacity="0.4" />

                      {/* Hopping Li+ Ions */}
                      <g>
                        <circle cx="110" cy="100" r="10" fill="#38bdf8" />
                        <text x="110" y="103" fill="#082f49" fontSize="9" textAnchor="middle" fontWeight="bold">Li⁺</text>

                        {/* Hopping Trajectory Arc */}
                        <path d="M 118,95 Q 160,65 202,95" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />

                        <circle cx="210" cy="100" r="10" fill="#38bdf8" fillOpacity="0.6" stroke="#0284c7" strokeWidth="1.5" />
                        <text x="210" y="103" fill="#082f49" fontSize="9" textAnchor="middle" fontWeight="bold">Li⁺</text>

                        {/* Thermal kinetic energy waves */}
                        <circle cx="110" cy="100" r="16" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" />
                      </g>

                      {/* Bottleneck Window Marker */}
                      <rect x="150" y="75" width="20" height="50" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                      <text x="160" y="140" fill="#f59e0b" fontSize="8" textAnchor="middle">Khe nghẽn (E_a = {currentMaterial.activationEnergyEv} eV)</text>

                      {/* Info callout */}
                      <text x="320" y="85" fill="#94a3b8" fontSize="8" textAnchor="middle">Mạng chủ Garnet</text>
                      <text x="320" y="100" fill="#64748b" fontSize="7" textAnchor="middle">Không gian 3D mở</text>
                      <text x="320" y="115" fill="#38bdf8" fontSize="8" textAnchor="middle">Kênh dẫn ion đa chiều</text>
                    </svg>
                  </div>

                  {/* Scientific Insight */}
                  <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong>Cơ Chế Vi Mô:</strong> {currentMaterial.advantagesVi}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DENDRITE PREVENTION */}
        {activeTab === 'DENDRITE_PREVENTION' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    Tham Số Vận Hành Dòng Sạc & Áp Suất Ép
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Mật độ dòng sạc nạp (J):</span>
                      <span className="font-mono text-cyan-400 font-semibold">{currentDensityMaCm2} mA/cm²</span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={4.0}
                      step={0.1}
                      value={currentDensityMaCm2}
                      onChange={e => setCurrentDensityMaCm2(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Áp suất ép nén cell (Stack Pressure):</span>
                      <span className="font-mono text-cyan-400 font-semibold">{stackPressureMpa} MPa</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={15.0}
                      step={0.5}
                      value={stackPressureMpa}
                      onChange={e => setStackPressureMpa(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Lithiophilic Interlayer Toggle */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Lớp Đệm Ái Liti (Lithiophilic Layer)</div>
                      <div className="text-[10px] text-slate-400">Hạt nano Au / Ag / ZnO phân tán đều mầm Li</div>
                    </div>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setHasLithiophilicInterlayer(!hasLithiophilicInterlayer);
                      }}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        hasLithiophilicInterlayer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {hasLithiophilicInterlayer ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>
                </div>

                {/* Safety Status Card */}
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  dendriteAssessment.dendritePenetrated
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : dendriteAssessment.riskStatusVi === 'CẢNH BÁO PHÂN CỰC'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>Trạng Thái An Toàn Cell:</span>
                    <span>{dendriteAssessment.riskStatusVi}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    {dendriteAssessment.mitigationRecommendationVi}
                  </div>
                </div>
              </div>

              {/* SVG Cross-Section Column (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Mặt Cắt Giao Diện Li / Điện Ly Rắn & Tiêu Chuẩn Monroe-Newman
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    CCD: {dendriteAssessment.criticalCurrentDensityCcdMaCm2} mA/cm²
                  </span>
                </div>

                {/* SVG Visualizing Dendrite Growth or Mechanical Blocking */}
                <div className="h-64 w-full flex items-center justify-center bg-slate-950 rounded-xl p-2 border border-slate-800">
                  <svg viewBox="0 0 420 200" className="w-full h-full">
                    {/* Layer 1: Lithium Metal Anode */}
                    <rect x="20" y="30" width="90" height="140" fill="#94a3b8" rx="4" />
                    <text x="65" y="105" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Cực Âm Li
                    </text>
                    <text x="65" y="120" fill="#334155" fontSize="8" textAnchor="middle">(Kim loại 100%)</text>

                    {/* Interlayer (if active) */}
                    {hasLithiophilicInterlayer && (
                      <rect x="110" y="30" width="10" height="140" fill="#f59e0b" fillOpacity="0.8" />
                    )}

                    {/* Layer 2: Solid Electrolyte Membrane */}
                    <rect
                      x={hasLithiophilicInterlayer ? 120 : 110}
                      y="30"
                      width="180"
                      height="140"
                      fill={currentMaterial.family === 'OXIDE_GARNET' ? '#1e3a8a' : '#14532d'}
                      fillOpacity="0.3"
                      stroke={currentMaterial.family === 'OXIDE_GARNET' ? '#3b82f6' : '#10b981'}
                      strokeWidth="2"
                      rx="4"
                    />
                    <text x="210" y="55" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Chất Điện Ly Rắn {currentMaterial.nameVi.split(' ')[0]}
                    </text>
                    <text x="210" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">
                      G = {currentMaterial.shearModulusGpa} GPa (Tiêu chuẩn &gt; 6.8 GPa)
                    </text>

                    {/* Dendrite vs Flat Plating */}
                    {dendriteAssessment.dendritePenetrated ? (
                      /* Penetrating Dendrites */
                      <g stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeLinecap="round">
                        <path d="M 110,100 L 160,95 L 190,110 L 240,105 L 290,100" />
                        <path d="M 160,95 L 180,80 L 210,85" />
                        <path d="M 190,110 L 220,130 L 250,125" />
                        <circle cx="290" cy="100" r="4" fill="#f43f5e" />
                        <text x="290" y="90" fill="#f43f5e" fontSize="8" fontWeight="bold">Xuyên thủng!</text>
                      </g>
                    ) : (
                      /* Flat Uniform Lithium Plating */
                      <g>
                        <rect x={hasLithiophilicInterlayer ? 116 : 106} y="35" width="6" height="130" fill="#38bdf8" rx="2" />
                        <text x="210" y="115" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                          ✓ Liti kết tủa phẳng đều (Không mọc gai)
                        </text>
                      </g>
                    )}

                    {/* Layer 3: Solid Composite Cathode */}
                    <rect x="300" y="30" width="100" height="140" fill="#701a75" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2" rx="4" />
                    <text x="350" y="105" fill="#f5d0fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Cực Dương NMC
                    </text>
                    <text x="350" y="120" fill="#d8b4fe" fontSize="8" textAnchor="middle">Toàn Rắn</text>
                  </svg>
                </div>

                {/* Key takeaway */}
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <strong>Tiêu Chuẩn Monroe-Newman (1972):</strong> Khi mô đun trượt cơ học của chất điện ly rắn G &gt; 2 × G_Li (xấp xỉ 6.8 GPa), ứng suất nén cơ học sẽ triệt tiêu hoàn toàn gradient thế hóa học tại đỉnh nhọn của nhánh cây dendrite, buộc liti kim loại phải kết tủa thành lớp phẳng mịn không đoản mạch.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ASSB CELL PERFORMANCE */}
        {activeTab === 'ASSB_CELL_PERFORMANCE' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-cyan-400" />
                    Mô Phỏng Hiệu Năng & An Toàn Thử Nghiệm Đâm Xuyên (Nail Penetration)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Đột phá mật độ năng lượng với cực âm Liti kim loại mỏng & cực dương toàn rắn NMC811
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setNailPunctureTestActive(!nailPunctureTestActive);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      nailPunctureTestActive
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    Thử Đâm Đinh Nhọn (Nail Test)
                  </button>
                </div>
              </div>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Mật Độ Năng Lượng Khối Lượng</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    {assbPerformance.gravimetricEnergyDensityWhKg} <span className="text-xs">Wh/kg</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Li-ion thường: ~250 Wh/kg</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Mật Độ Năng Lượng Thể Tích</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {assbPerformance.volumetricEnergyDensityWhL} <span className="text-xs">Wh/L</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Li-ion thường: ~650 Wh/L</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Điện Thế Vận Hành Cell</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                    {assbPerformance.cellOperatingVoltageV} <span className="text-xs">V</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Tuổi Thọ Chu Kỳ (&gt;80%)</div>
                  <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                    {assbPerformance.estimatedCycleLife80Percent} <span className="text-xs">chu kỳ</span>
                  </div>
                </div>
              </div>

              {/* Nail Puncture Visualizer Banner */}
              {nailPunctureTestActive && (
                <div className={`p-4 rounded-xl border mb-6 flex items-center justify-between ${
                  assbPerformance.thermalRunawayPunctureSafe
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500 text-rose-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase">
                        Kết Quả Thử Nghiệm Đâm Đinh Thép Xuyên Thấu Cell:
                      </div>
                      <div className="text-[11px] mt-0.5">
                        {assbPerformance.thermalRunawayPunctureSafe
                          ? 'KHÔNG CHÁY, KHÔNG NỔ, KHÔNG KHÓI ĐỘC (Nhiệt độ bề mặt tối đa chỉ tăng +3°C nhờ chất điện ly oxit vô cơ hoàn toàn bất hoạt).'
                          : 'CẢNH BÁO: Sunfua có nguy cơ phát thải một lượng nhỏ hơi H₂S nếu đâm thủng trong môi trường ẩm.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-lg">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Hạng Mục Kỹ Thuật</th>
                      <th className="p-3">Pin Lithium-Ion Truyền Thống</th>
                      <th className="p-3 text-cyan-400">Pin Toàn Rắn ASSB (Garnet LLZO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold">Chất Điện Ly</td>
                      <td className="p-3 text-rose-400">Dung môi hữu cơ lỏng dễ cháy (EC/DMC/EMC)</td>
                      <td className="p-3 text-emerald-400 font-bold">Gốm Oxit Vô Cơ Không Cháy (LLZO)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Cực Âm (Anode)</td>
                      <td className="p-3">Graphite cồng kềnh (372 mAh/g)</td>
                      <td className="p-3 text-emerald-400 font-bold">Liti Kim Loại Tinh Khiết (3860 mAh/g)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Mật Độ Năng Lượng</td>
                      <td className="p-3">250 Wh/kg (Chạm trần vật lý)</td>
                      <td className="p-3 text-emerald-400 font-bold">&gt; 420 Wh/kg (+68% hành trình xe điện)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">An Toàn Quá Nhiệt</td>
                      <td className="p-3 text-rose-400">Bắt lửa nổ dây chuyền tại 130°C</td>
                      <td className="p-3 text-emerald-400 font-bold">Chịu nhiệt vượt trội &gt; 250°C không bắt lửa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
