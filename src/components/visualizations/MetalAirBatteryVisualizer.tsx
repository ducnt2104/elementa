// src/components/visualizations/MetalAirBatteryVisualizer.tsx
// Interactive Visualizer: Metal-Air Batteries (Zinc-Air & Lithium-Air), Gas Diffusion Cathodes & Open-Breathe Systems
// Standards: IUPAC Electrochemistry, Open-Atmosphere Secondary Systems & Vietnam GDPT 2018 (Hóa 10 & 12: Kim loại kiềm/chuyển tiếp & Pin hít thở không khí)

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
  Wind,
  Atom,
  Cpu,
  ArrowRight,
  Droplets,
  Flame,
  ShieldAlert
} from 'lucide-react';
import {
  METAL_AIR_CHEMISTRIES_CATALOG,
  getMetalAirChemistries,
  simulateGasDiffusionElectrode,
  simulateMetalAirSystem,
  MetalAirChemistryType,
  MetalAirBatterySpec
} from '../../domain/metalAirBatteryEngine';
import { sound } from '../../audio/soundEngine';

type MetalAirTabMode = 'OPEN_BREATHE_GDE_CROSS_SECTION' | 'GDE_O2_PRESSURE_POLARIZATION' | 'THEORETICAL_PINNACLE_3500WHKG';

export const MetalAirBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MetalAirTabMode>('OPEN_BREATHE_GDE_CROSS_SECTION');

  // Chemistry Selection
  const [selectedChemistryId, setSelectedChemistryId] = useState<MetalAirChemistryType>('ZINC_AIR_AQUEOUS');

  // Mode 2: Oxygen pressure slider
  const [oxygenPartialPressureBar, setOxygenPartialPressureBar] = useState<number>(0.21);

  // Mode 3: Metal mass & discharge current sliders
  const [metalMassGrams, setMetalMassGrams] = useState<number>(50);
  const [dischargeCurrentMa, setDischargeCurrentMa] = useState<number>(500);

  const selectedSpec = useMemo(() => {
    return METAL_AIR_CHEMISTRIES_CATALOG.find(b => b.id === selectedChemistryId) || METAL_AIR_CHEMISTRIES_CATALOG[0];
  }, [selectedChemistryId]);

  // GDE simulation curve
  const gdePoints = useMemo(() => {
    return simulateGasDiffusionElectrode(selectedChemistryId, oxygenPartialPressureBar);
  }, [selectedChemistryId, oxygenPartialPressureBar]);

  // System simulation
  const systemResult = useMemo(() => {
    return simulateMetalAirSystem(selectedChemistryId, metalMassGrams, dischargeCurrentMa);
  }, [selectedChemistryId, metalMassGrams, dischargeCurrentMa]);

  // Peak power
  const peakPowerPoint = useMemo(() => {
    return gdePoints.reduce((prev, curr) => 
      curr.powerDensityMilliWCm2 > prev.powerDensityMilliWCm2 ? curr : prev,
      gdePoints[0]
    );
  }, [gdePoints]);

  return (
    <div className="bg-obsidian/90 border border-teal-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-teal-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-inner">
              <Wind className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
                PIN KIM LOẠI - KHÔNG KHÍ (ZINC-AIR & LI-AIR) & ĐIỆN CỰC HÍT THỞ (GDE)
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Điện cực khuếch tán khí ba pha (GDE) • Hít trực tiếp oxy O₂ từ khí quyển (Bỏ khối lượng cực dương) • Đỉnh cao mật độ năng lượng 3500 Wh/kg
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-teal-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('OPEN_BREATHE_GDE_CROSS_SECTION');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'OPEN_BREATHE_GDE_CROSS_SECTION'
                ? 'bg-teal-500 text-obsidian shadow-lg font-black ring-1 ring-teal-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Điện Cực Hít Thở Khí Ba Pha</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('GDE_O2_PRESSURE_POLARIZATION');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'GDE_O2_PRESSURE_POLARIZATION'
                ? 'bg-cyan-500 text-obsidian shadow-lg font-black ring-1 ring-cyan-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Phân Áp Oxy & Đường Cong V-J</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('THEORETICAL_PINNACLE_3500WHKG');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'THEORETICAL_PINNACLE_3500WHKG'
                ? 'bg-emerald-500 text-obsidian shadow-lg font-black ring-1 ring-emerald-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Đỉnh Cao 3500 Wh/kg (So Với Xăng)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: GDE TRIPLE-PHASE BOUNDARY CROSS SECTION */}
      {activeTab === 'OPEN_BREATHE_GDE_CROSS_SECTION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Chemistry Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Công Nghệ Pin Kim Loại - Khí Quyển
            </h3>
            <div className="space-y-2">
              {METAL_AIR_CHEMISTRIES_CATALOG.map((chem) => (
                <button
                  key={chem.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedChemistryId(chem.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedChemistryId === chem.id
                      ? 'bg-teal-500/20 border-teal-400/80 shadow-md ring-1 ring-teal-400/50'
                      : 'bg-obsidian-light/40 border-white/5 hover:border-teal-500/30 hover:bg-teal-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-ivory">{chem.nameVi}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {chem.theoreticalCellVoltageV} V
                    </span>
                  </div>
                  <p className="text-xs italic text-ivory-muted">{chem.scientificName}</p>
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-2 text-ivory/80 pt-2 border-t border-white/5">
                    <div>
                      Điện thế thực: <span className="font-mono text-amber-300 font-bold">{chem.practicalWorkingVoltageV} V</span>
                    </div>
                    <div>
                      Mật độ lý thuyết: <span className="font-mono text-emerald-300 font-bold">{chem.theoreticalSpecificEnergyWhKg} Wh/kg</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Breathing Feature Explanation */}
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-teal-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                Tại Sao Mật Độ Năng Lượng Lại Cực Kỳ Cao?
              </span>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Ở pin thông thường, vật liệu hoạt tính cực dương (như LiCoO₂ hay LiFePO₄) chiếm tới 40 - 50% tổng trọng lượng pin. Pin kim loại - không khí <strong>hoàn toàn không mang theo chất oxy hóa bên trong</strong>; nó "hít thở" oxy tự do từ không khí xung quanh khi phóng điện, giúp khối lượng viên pin siêu nhẹ.
              </p>
            </div>
          </div>

          {/* Interactive Breathing GDE SVG Diagram */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-teal-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-teal-300 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-teal-400" />
                    <span>Mặt Cắt Ngang Điện Cực Hít Thở Không Khí Ba Pha (Triple-Phase Boundary)</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Anode: {selectedSpec.anodeReactionVi} • Cathode: {selectedSpec.cathodeReactionVi}
                  </p>
                </div>
              </div>

              {/* Animated SVG Diagram of Open-Air Battery */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[320px]">
                <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[320px]">
                  {/* Left: Metal Anode (Zinc / Lithium / Aluminum) */}
                  <rect x="20" y="20" width="80" height="280" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                  <text x="60" y="160" fill="#f8fafc" fontSize="11" fontWeight="bold" transform="rotate(-90 60 160)" textAnchor="middle">
                    CỰC ÂM {selectedSpec.anodeMetalVi.split('(')[0]}
                  </text>
                  <text x="60" y="280" fill="#cbd5e1" fontSize="9" textAnchor="middle">(-) Anode</text>

                  {/* Center: Aqueous or Aprotic Electrolyte */}
                  <rect x="110" y="20" width="230" height="280" fill="#0284c7" opacity="0.35" rx="4" />
                  <text x="225" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    CHẤT ĐIỆN GIẢI ({selectedSpec.electrolyteTypeVi.split('(')[0]})
                  </text>

                  {/* Ions in motion (OH- or Li+) */}
                  {[75, 115, 155, 195, 235, 270].map((y, idx) => (
                    <g key={`ion-${idx}`} className="animate-pulse">
                      <circle cx={140 + (idx % 3) * 60} cy={y} r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x={140 + (idx % 3) * 60} cy={y + 3.5} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">
                        {selectedSpec.id === 'LITHIUM_AIR_APROTIC' ? 'Li⁺' : 'OH⁻'}
                      </text>
                      <line x1={155 + (idx % 3) * 60} y1={y} x2={125 + (idx % 3) * 60} y2={y} stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
                    </g>
                  ))}

                  {/* Right 1: Catalyst Active Layer (Spinel Co3O4 / RuO2) */}
                  <rect x="350" y="20" width="40" height="280" fill="#0d9488" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
                  <text x="370" y="160" fill="#ccfbf1" fontSize="10" fontWeight="bold" transform="rotate(-90 370 160)" textAnchor="middle">
                    Lớp Xúc Tác Song Chức ORR/OER
                  </text>

                  {/* Right 2: Hydrophobic PTFE Gas Diffusion Layer (GDL) */}
                  <rect x="400" y="20" width="50" height="280" fill="#334155" rx="3" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x="425" y="160" fill="#e2e8f0" fontSize="10" fontWeight="bold" transform="rotate(90 425 160)" textAnchor="middle">
                    Màng Kỵ Nước PTFE (GDL)
                  </text>

                  {/* Right 3: Open-Air Breathing Louvers (Ambient O2 Intake) */}
                  <rect x="460" y="20" width="220" height="280" fill="#042f2e" opacity="0.4" rx="6" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="570" y="45" fill="#2dd4bf" fontSize="13" fontWeight="bold" textAnchor="middle">
                    KHÔNG KHÍ KHÍ QUYỂN (O₂ INTAKE)
                  </text>

                  {/* Breathing air slots / louvers */}
                  {[75, 115, 155, 195, 235, 275].map((y, idx) => (
                    <g key={`air-slot-${idx}`} className="animate-pulse">
                      <rect x="480" y={y - 8} width="180" height="16" rx="4" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
                      <text x="570" y={y + 4} fill="#5eead4" fontSize="10" fontWeight="bold" textAnchor="middle">
                        ← Khí Oxy O₂ tự do đi vào mao quản
                      </text>
                    </g>
                  ))}

                  {/* External Circuit Load */}
                  <path d="M 60 20 L 60 8 L 370 8 L 370 20" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="215" cy="8" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                  <text x="215" y="12" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">TẢI</text>
                  <text x="140" y="12" fill="#fbbf24" fontSize="9" fontWeight="bold">← e⁻ Dòng điện</text>
                </svg>
              </div>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                    Chất Xúc Tác Song Chức (Bifunctional Catalyst)
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedSpec.bifunctionalCatalystOrrOerVi}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Độ Nhạy Khí Quyển (CO₂ & Hơi Nước)
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedSpec.ambientContaminantSensitivityVi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: GDE O2 PRESSURE POLARIZATION CURVE */}
      {activeTab === 'GDE_O2_PRESSURE_POLARIZATION' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Đường Cong Phân Cực Điện Cực GDE Theo Phân Áp Oxy (P_O₂)
              </h3>
              <p className="text-xs text-ivory-muted">
                Ảnh hưởng của nồng độ oxy khí quyển tới tốc độ phản ứng khử ORR và điểm giới hạn khuếch tán khí
              </p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              Công suất cực đại: <span className="font-bold text-amber-400">{peakPowerPoint.powerDensityMilliWCm2} mW/cm²</span> tại {peakPowerPoint.currentDensityMaCm2} mA/cm²
            </div>
          </div>

          {/* Oxygen Pressure Slider */}
          <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-ivory-muted">Phân áp oxy cung cấp (P_O₂):</span>
              <span className="font-mono text-cyan-300 font-bold">{(oxygenPartialPressureBar * 100).toFixed(0)}% O₂ ({oxygenPartialPressureBar} bar)</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={1.0}
              step={0.05}
              value={oxygenPartialPressureBar}
              onChange={(e) => setOxygenPartialPressureBar(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted/70">
              <span>0.05 bar (Núi cao thiếu dưỡng khí)</span>
              <span>0.21 bar (Không khí bình thường)</span>
              <span>1.00 bar (Oxy tinh khiết)</span>
            </div>
          </div>

          {/* SVG Polarization Plot */}
          <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
            <div className="bg-obsidian rounded-xl p-4 border border-white/5 relative">
              <svg viewBox="0 0 700 280" className="w-full h-auto max-h-[300px]">
                {/* Grid */}
                <line x1="60" y1="20" x2="60" y2="230" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="230" x2="660" y2="230" stroke="#334155" strokeWidth="1" />

                <line x1="60" y1="70" x2="660" y2="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="120" x2="660" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="170" x2="660" y2="170" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Axis Labels */}
                <text x="60" y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="360" y="265" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Mật Độ Dòng Điện Phóng J (mA/cm²)
                </text>
                <text x="660" y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">120 mA/cm²</text>

                {/* Y Axis: Voltage (0 - 1.8 V) */}
                <text x="25" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(-90 25 125)" textAnchor="middle">
                  Điện Thế Cell (V)
                </text>
                <text x="50" y="25" fill="#38bdf8" fontSize="10" textAnchor="end">1.8 V</text>
                <text x="50" y="125" fill="#38bdf8" fontSize="10" textAnchor="end">0.9 V</text>
                <text x="50" y="230" fill="#38bdf8" fontSize="10" textAnchor="end">0 V</text>

                {/* Curves */}
                {(() => {
                  const maxJ = 120.0;
                  const vPath = gdePoints.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityMaCm2 / maxJ) * 600;
                    const y = 230 - (pt.cellVoltageV / 1.8) * 210;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const maxP = peakPowerPoint.powerDensityMilliWCm2 * 1.2 || 1;
                  const pPath = gdePoints.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityMaCm2 / maxJ) * 600;
                    const y = 230 - (pt.powerDensityMilliWCm2 / maxP) * 210;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <g>
                      <path d={vPath} fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <path d={pPath} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: THEORETICAL PINNACLE 3500 WH/KG VS FOSSIL FUEL */}
      {activeTab === 'THEORETICAL_PINNACLE_3500WHKG' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-emerald-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Cấu Hình Khối Lượng Kim Loại & Dòng Xả
              </h3>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Khối lượng kim loại cực âm:</span>
                    <span className="font-mono text-emerald-300 font-bold">{metalMassGrams} gam</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={10}
                    value={metalMassGrams}
                    onChange={(e) => setMetalMassGrams(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>10 g</span>
                    <span>50 g (Chuẩn)</span>
                    <span>200 g (Mô hình lớn)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Dòng điện xả tải ngoài:</span>
                    <span className="font-mono text-cyan-300 font-bold">{dischargeCurrentMa} mA</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={2000}
                    step={100}
                    value={dischargeCurrentMa}
                    onChange={(e) => setDischargeCurrentMa(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>100 mA (Máy trợ thính)</span>
                    <span>500 mA (IoT/Đèn)</span>
                    <span>2000 mA (Động cơ)</span>
                  </div>
                </div>
              </div>

              {/* Verdict Card */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {systemResult.verdictVi}
                </div>
                <div className="text-[11px] text-ivory-muted">
                  Đánh giá độ an toàn: <span className="font-bold text-emerald-400">{systemResult.safetyScoreOutOf10}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Comparative Density Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Năng Lượng Cung Cấp</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {systemResult.deliveredEnergyWattHours}
                </span>
                <span className="text-[10px] text-ivory-muted block">Wh điện năng</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Thời Gian Phóng Điện</span>
                <span className="text-2xl font-mono font-black text-cyan-400">
                  {systemResult.operatingDurationHours}
                </span>
                <span className="text-[10px] text-ivory-muted block">giờ liên tục</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Oxy Đã Hít Thở</span>
                <span className="text-2xl font-mono font-black text-teal-400">
                  {systemResult.oxygenConsumedLiters}
                </span>
                <span className="text-[10px] text-ivory-muted block">Lít O₂ khí quyển</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Mật Độ Lý Thuyết</span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {selectedSpec.theoreticalSpecificEnergyWhKg}
                </span>
                <span className="text-[10px] text-ivory-muted block">Wh/kg</span>
              </div>
            </div>

            {/* Industrial Energy Density Comparison Table */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>So Sánh Mật Độ Năng Lượng Lý Thuyết Với Nhiên Liệu Hóa Thạch</span>
              </h4>
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Lithium-ion LFP</span>
                  <span className="font-mono text-sky-300 font-bold text-sm">160 Wh/kg</span>
                  <span className="text-[9px] text-ivory-muted block mt-0.5">Tiêu chuẩn xe điện</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Kẽm - Khí Zinc-Air</span>
                  <span className="font-mono text-teal-300 font-bold text-sm">1086 Wh/kg</span>
                  <span className="text-[9px] text-ivory-muted block mt-0.5">An toàn gốc nước</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-emerald-300 block text-[10px]">Lithi - Khí Li-Air</span>
                  <span className="font-mono text-emerald-300 font-bold text-sm">3505 Wh/kg</span>
                  <span className="text-[9px] text-emerald-400/80 block mt-0.5">Đỉnh cao pin điện</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Xăng Dầu (Hiệu dụng)</span>
                  <span className="font-mono text-amber-300 font-bold text-sm">~3000 Wh/kg</span>
                  <span className="text-[9px] text-ivory-muted block mt-0.5">Hiệu suất ICE ~25%</span>
                </div>
              </div>
            </div>

            {/* Geological & Medical Revolution */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-obsidian-light/40 to-emerald-950/40 border border-teal-500/20 text-xs text-ivory-muted space-y-1.5">
              <span className="font-bold text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Tại Sao Pin Kẽm - Không Khí Được Ưu Tiên Trong Y Tế & Trạm Lưu Trữ Đô Thị?
              </span>
              <p className="leading-relaxed">
                Kẽm là kim loại dồi dào, giá thành siêu rẻ và hoàn toàn không độc hại. Dung dịch điện giải kiềm nước không thể bắt lửa, giải quyết triệt để nguy cơ chập cháy nổ pin trong các thiết bị y tế cấy ghép / trợ thính và các trạm điện dự phòng đặt ngầm dưới tầng hầm tòa nhà chung cư cao tầng.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
