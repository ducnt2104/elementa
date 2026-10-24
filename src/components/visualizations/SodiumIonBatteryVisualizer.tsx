// src/components/visualizations/SodiumIonBatteryVisualizer.tsx
// Interactive Visualizer: Sodium-Ion (Na-ion) Batteries, Prussian Blue Analogues & Hard Carbon Anodes
// Standards: IUPAC Electrochemistry, Battery Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Bán kính ion kim loại kiềm, Cấu trúc mạng tinh thể & Pin thứ cấp)

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
  Truck,
  Atom,
  Cpu,
  ArrowRight
} from 'lucide-react';
import {
  NA_ION_CATHODES_CATALOG,
  HARD_CARBON_ANODES_CATALOG,
  getNaIonCathodes,
  getHardCarbonAnodes,
  compareNaIonVsLiIon,
  generateHardCarbonDischargeCurve,
  NaIonCathodeClass,
  NaIonCathodeMaterialSpec,
  HardCarbonAnodeSpec
} from '../../domain/sodiumIonBatteryEngine';
import { sound } from '../../audio/soundEngine';

type NaIonTabMode = 'LATTICE_DUAL_ALUMINUM' | 'SLOPE_PLATEAU_PROFILE' | 'LOW_TEMP_ZERO_VOLT_SAFETY';

export const SodiumIonBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NaIonTabMode>('LATTICE_DUAL_ALUMINUM');

  // Cathode & Anode Selection
  const [selectedCathodeId, setSelectedCathodeId] = useState<NaIonCathodeClass>('PRUSSIAN_BLUE_ANALOGUE');
  const [selectedAnodeId, setSelectedAnodeId] = useState<string>('BIOMASS_HARD_CARBON');

  // Temperature State for Mode 3
  const [temperatureC, setTemperatureC] = useState<number>(-20);

  const selectedCathode = useMemo(() => {
    return NA_ION_CATHODES_CATALOG.find(c => c.id === selectedCathodeId) || NA_ION_CATHODES_CATALOG[0];
  }, [selectedCathodeId]);

  const selectedAnode = useMemo(() => {
    return HARD_CARBON_ANODES_CATALOG.find(a => a.id === selectedAnodeId) || HARD_CARBON_ANODES_CATALOG[0];
  }, [selectedAnodeId]);

  // Comparison result
  const comparison = useMemo(() => {
    return compareNaIonVsLiIon(temperatureC);
  }, [temperatureC]);

  // Discharge curve data
  const dischargeCurve = useMemo(() => {
    return generateHardCarbonDischargeCurve(selectedCathodeId, selectedAnodeId);
  }, [selectedCathodeId, selectedAnodeId]);

  return (
    <div className="bg-obsidian/90 border border-amber-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-inner">
              <Zap className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400">
                PIN NATRI-ION (Na-ion), KHUNG LỒNG XANH PHỔ & CARBON CỨNG
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Cực thu dòng Nhôm kép (Bỏ lá đồng) • Cơ chế dốc-thềm Hard Carbon (d₀₀₂ &gt; 0.37 nm) • Vận hành âm sâu -40°C & An toàn vận chuyển 0V
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-amber-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('LATTICE_DUAL_ALUMINUM');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'LATTICE_DUAL_ALUMINUM'
                ? 'bg-amber-500 text-obsidian shadow-lg font-black ring-1 ring-amber-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Cấu Trúc Lưới & Lá Nhôm Kép</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SLOPE_PLATEAU_PROFILE');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'SLOPE_PLATEAU_PROFILE'
                ? 'bg-orange-500 text-obsidian shadow-lg font-black ring-1 ring-orange-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Cơ Chế Dốc - Thềm Hard Carbon</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('LOW_TEMP_ZERO_VOLT_SAFETY');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'LOW_TEMP_ZERO_VOLT_SAFETY'
                ? 'bg-yellow-500 text-obsidian shadow-lg font-black ring-1 ring-yellow-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span>Âm Nhiệt -40°C & An Toàn 0V</span>
          </button>
        </div>
      </div>

      {/* MODE 1: LATTICE STRUCTURE & DUAL ALUMINUM CURRENT COLLECTORS */}
      {activeTab === 'LATTICE_DUAL_ALUMINUM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Cathode & Anode Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5" />
                Vật Liệu Cực Dương (Cathode)
              </h3>
              <div className="space-y-2">
                {NA_ION_CATHODES_CATALOG.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedCathodeId(cat.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedCathodeId === cat.id
                        ? 'bg-amber-500/20 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-obsidian-light/40 border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="font-bold text-xs text-ivory">{cat.nameVi}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {cat.averageWorkingVoltageVsNaV} V
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-amber-300/80">{cat.chemicalFormula}</p>
                    <div className="mt-1 text-[10px] text-ivory-muted flex justify-between pt-1 border-t border-white/5">
                      <span>Dung lượng: <strong className="text-ivory">{cat.specificCapacityMahG} mAh/g</strong></span>
                      <span>Sạc max: <strong className="text-cyan-300">{cat.rateCapabilityMaxC}C</strong></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5 mb-2">
                <Box className="w-3.5 h-3.5" />
                Vật Liệu Cực Âm Carbon Cứng (Hard Carbon)
              </h3>
              <div className="space-y-2">
                {HARD_CARBON_ANODES_CATALOG.map((ano) => (
                  <button
                    key={ano.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedAnodeId(ano.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedAnodeId === ano.id
                        ? 'bg-orange-500/20 border-orange-400/80 shadow-md ring-1 ring-orange-400/50'
                        : 'bg-obsidian-light/40 border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5'
                    }`}
                  >
                    <div className="font-bold text-xs text-ivory">{ano.nameVi}</div>
                    <div className="text-[10px] text-ivory-muted mt-0.5">{ano.biomassPrecursorVi}</div>
                    <div className="mt-1 text-[10px] text-orange-300 flex justify-between pt-1 border-t border-white/5 font-mono">
                      <span>d₀₀₂ = {ano.interlayerSpacingD002Nm} nm</span>
                      <span>Dung lượng = {ano.totalReversibleCapacityMahG} mAh/g</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Dual-Aluminum Foil SVG Diagram */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-amber-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-amber-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Cấu Trúc Tế Bào Na-ion & Đột Phá Lá Nhôm Thu Dòng Kép</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Khác với pin Lithium phải dùng lá Đồng (Cu) ở cực âm, Natri không tạo hợp kim với Nhôm ở điện thế thấp, cho phép dùng lá Nhôm (Al) ở cả 2 cực!
                  </p>
                </div>
              </div>

              {/* Animated SVG Diagram of Na-ion Cross-Section */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[320px]">
                <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[320px]">
                  {/* Left: Anode Current Collector (ALUMINUM FOIL - REPLACING COPPER) */}
                  <rect x="20" y="20" width="45" height="280" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                  <text x="42" y="160" fill="#0f172a" fontSize="11" fontWeight="bold" transform="rotate(-90 42 160)" textAnchor="middle">
                    LÁ NHÔM (ALUMINUM) CỰC ÂM
                  </text>

                  {/* Anode Active Layer: Hard Carbon */}
                  <rect x="65" y="20" width="200" height="280" fill="#1e293b" rx="4" stroke="#475569" strokeWidth="1" />
                  <text x="165" y="45" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                    CARBON CỨNG (HARD CARBON)
                  </text>
                  <text x="165" y="65" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    d₀₀₂ = {selectedAnode.interlayerSpacingD002Nm} nm (Rộng hơn Graphite)
                  </text>

                  {/* Hard Carbon Turbostratic Graphene Layers & Nanopores */}
                  {[90, 130, 170, 210, 250].map((y, idx) => (
                    <g key={`hc-layer-${idx}`}>
                      <path d={`M 75 ${y} Q 120 ${y - 8} 165 ${y} T 255 ${y}`} fill="none" stroke="#64748b" strokeWidth="3" />
                      <circle cx={110 + (idx % 3) * 45} cy={y + 15} r="9" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                      <text x={110 + (idx % 3) * 45} cy={y + 18} fill="#f59e0b" fontSize="7" textAnchor="middle">Lỗ xốp</text>
                    </g>
                  ))}

                  {/* Center: Separator with Na+ Ions */}
                  <rect x="275" y="20" width="130" height="280" fill="#065f46" opacity="0.3" rx="4" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,3" />
                  <text x="340" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    MÀNG NGĂN ĐIỆN GIẢI
                  </text>

                  {/* Animated Na+ ions in transit */}
                  {[80, 120, 160, 200, 240, 270].map((y, idx) => (
                    <g key={`na-ion-${idx}`} className="animate-pulse">
                      <circle cx={310 + (idx % 2) * 50} cy={y} r="11" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />
                      <text x={310 + (idx % 2) * 50} cy={y + 4} fill="#000" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Na⁺
                      </text>
                    </g>
                  ))}
                  <text x="340" y="295" fill="#fde68a" fontSize="10" textAnchor="middle">
                    r = 1.02 Å (Lớn hơn Li⁺ 0.76 Å)
                  </text>

                  {/* Cathode Active Layer (PBA or Layered Oxide) */}
                  <rect x="415" y="20" width="220" height="280" fill="#1e1b4b" rx="4" stroke="#4338ca" strokeWidth="1" />
                  <text x="525" y="45" fill="#818cf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {selectedCathode.nameVi.split('(')[0]}
                  </text>
                  <text x="525" y="65" fill="#cbd5e1" fontSize="9" className="font-mono" textAnchor="middle">
                    {selectedCathode.chemicalFormula}
                  </text>

                  {/* PBA 3D Giant Cage Lattice Representation */}
                  {[90, 135, 180, 225].map((y, idx) => (
                    <g key={`pba-cage-${idx}`}>
                      <rect x="440" y={y} width="35" height="35" rx="3" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <rect x="500" y={y} width="35" height="35" rx="3" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <rect x="560" y={y} width="35" height="35" rx="3" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <circle cx="457" cy={y + 17} r="6" fill="#f59e0b" />
                      <circle cx="517" cy={y + 17} r="6" fill="#f59e0b" />
                      <circle cx="577" cy={y + 17} r="6" fill="#f59e0b" />
                    </g>
                  ))}
                  <text x="525" y="295" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    Khung Lồng 3D Khổng Lồ Cho Phép Sạc Tốc Độ {selectedCathode.rateCapabilityMaxC}C
                  </text>

                  {/* Right: Cathode Current Collector (ALUMINUM FOIL) */}
                  <rect x="635" y="20" width="45" height="280" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                  <text x="657" y="160" fill="#0f172a" fontSize="11" fontWeight="bold" transform="rotate(90 657 160)" textAnchor="middle">
                    LÁ NHÔM (ALUMINUM) CỰC DƯƠNG
                  </text>
                </svg>
              </div>

              {/* Economic & Resource Breakthrough Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Đột Phá Bỏ Lá Đồng (Copper-Free Anode)
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    Ở pin Lithium-ion, Lithi tạo hợp kim với Nhôm ở điện thế thấp nên bắt buộc phải dùng lá Đồng đắt đỏ và nặng làm cực thu dòng anode. Ngược lại, Natri trơ với Nhôm, cho phép dùng <strong>100% lá Nhôm ở cả 2 cực</strong>, giúp giảm ngay <strong>8.5% chi phí cell</strong> và giảm đáng kể khối lượng pin.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                    Vật Liệu Cực Dương Phi Coban (Cobalt-Free)
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    Cực dương PBA hoặc Na(Fe,Mn)O₂ hoàn toàn không sử dụng Coban (Co) hay Niken (Ni) đắt tiền và độc hại. Nguyên liệu chủ đạo là Sắt (Fe), Mangan (Mn) và muối ăn Natri Clorua (NaCl) dồi dào bậc nhất vỏ Trái Đất (Na phong phú gấp 1300 lần Li).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SLOPE-PLATEAU DISCHARGE VOLTAGE PROFILE */}
      {activeTab === 'SLOPE_PLATEAU_PROFILE' && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Đường Cong Phóng Điện Hai Vùng Dốc - Thềm Của Carbon Cứng (Slope-Plateau Model)
            </h3>
            <p className="text-xs text-ivory-muted">
              Cơ chế lưu trữ 2 giai đoạn: Vùng dốc (Hấp phụ vào khuyết tật bề mặt) và Vùng thềm (Chèn giữa các lớp graphene và ngưng tụ lỗ xốp nano)
            </p>
          </div>

          {/* SVG Plot for Slope-Plateau Curve */}
          <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
            <div className="bg-obsidian rounded-xl p-4 border border-white/5 relative">
              <svg viewBox="0 0 700 300" className="w-full h-auto max-h-[320px]">
                {/* Grid Lines */}
                <line x1="60" y1="20" x2="60" y2="250" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="250" x2="660" y2="250" stroke="#334155" strokeWidth="1" />

                <line x1="60" y1="80" x2="660" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="140" x2="660" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="200" x2="660" y2="200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Vertical Divider for Slope vs Plateau Region */}
                <line x1="300" y1="20" x2="300" y2="250" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />

                {/* Region Background Tints */}
                <rect x="60" y="20" width="240" height="230" fill="#f59e0b" opacity="0.08" />
                <rect x="300" y="20" width="360" height="230" fill="#10b981" opacity="0.08" />

                {/* Region Headers */}
                <text x="180" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. VÙNG DỐC (SLOPE REGION)
                </text>
                <text x="180" y="60" fill="#fde68a" fontSize="9" textAnchor="middle">
                  Hấp phụ Na⁺ vào khuyết tật bề mặt & heteroatoms
                </text>

                <text x="480" y="45" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. VÙNG THỀM (PLATEAU REGION)
                </text>
                <text x="480" y="60" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  Chèn giữa lớp graphene mở rộng & ngưng tụ cụm lỗ xốp nano
                </text>

                {/* Axis Labels */}
                <text x="60" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="360" y="285" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Dung Lượng Phóng Điện Q (mAh/g Carbon cứng)
                </text>
                <text x="660" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {selectedAnode.totalReversibleCapacityMahG} mAh/g
                </text>

                {/* Y Axis: Voltage (1.5 V to 4.0 V) */}
                <text x="25" y="135" fill="#f59e0b" fontSize="11" fontWeight="bold" transform="rotate(-90 25 135)" textAnchor="middle">
                  Điện Thế Cell (V)
                </text>
                <text x="50" y="25" fill="#f59e0b" fontSize="10" textAnchor="end">4.0 V</text>
                <text x="50" y="100" fill="#f59e0b" fontSize="10" textAnchor="end">3.2 V</text>
                <text x="50" y="175" fill="#f59e0b" fontSize="10" textAnchor="end">2.4 V</text>
                <text x="50" y="250" fill="#f59e0b" fontSize="10" textAnchor="end">1.5 V</text>

                {/* Draw Voltage Curve */}
                {(() => {
                  const maxCap = selectedAnode.totalReversibleCapacityMahG || 1;
                  const vPath = dischargeCurve.map((pt, idx) => {
                    const x = 60 + (pt.capacityMahG / maxCap) * 600;
                    const y = 250 - ((pt.cellVoltageV - 1.5) / 2.5) * 230;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <path d={vPath} fill="none" stroke="#f59e0b" strokeWidth="3.5" />
                  );
                })()}
              </svg>
            </div>

            {/* Microscopic Storage Physics Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-obsidian border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-400 block">
                  Vùng Dốc: Hấp Phụ Bề Mặt (Adsorption)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Ở điện thế cao (&gt; 0.1 V so với Na/Na⁺), ion Na⁺ liên kết tĩnh điện với các khuyết tật mép mạng, lỗ trống đơn nguyên tử và các nhóm chức chứa oxy/nitơ trên bề mặt carbon. Vùng này mang lại khả năng phóng nạp dòng lớn (Rate capability cao).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 block">
                  Vùng Thềm: Chèn Lớp & Ngưng Tụ Lỗ Xốp (Intercalation & Pore Filling)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Ở điện thế thấp (&lt; 0.1 V so với Na/Na⁺), khoảng cách d₀₀₂ mở rộng (0.385 nm) cho phép Na⁺ chèn sâu vào giữa các phiến graphene uốn lượn và ngưng tụ tạo thành các cụm natri giả kim loại trong lỗ xốp nano khép kín, mang lại điện thế cell bằng phẳng lý tưởng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: LOW-TEMPERATURE -40°C & ZERO-VOLT (0.0V) SAFETY */}
      {activeTab === 'LOW_TEMP_ZERO_VOLT_SAFETY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls & Temperature Slider */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-yellow-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Snowflake className="w-3.5 h-3.5" />
                Thử Nghiệm Âm Nhiệt Độ Môi Trường
              </h3>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Nhiệt độ môi trường vận hành:</span>
                    <span className={`font-mono font-bold ${
                      temperatureC < 0 ? 'text-cyan-300' : 'text-amber-300'
                    }`}>
                      {temperatureC}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-40}
                    max={50}
                    step={5}
                    value={temperatureC}
                    onChange={(e) => setTemperatureC(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>-40°C (Băng tuyết cực)</span>
                    <span>-20°C (Mùa đông Nga/Mỹ)</span>
                    <span>25°C (Tiêu chuẩn)</span>
                  </div>
                </div>
              </div>

              {/* Zero-Volt Shipping Safety Certificate */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-400 text-xs flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  An Toàn Vận Chuyển Hàng Không Ở Điện Thế 0.0 V
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Pin Lithium-ion nếu xả kiệt dưới 2.0 V sẽ làm hòa tan lá đồng cực âm (Cu dissolution), tạo thành gai đồng đâm thủng màng ngăn gây nổ khi sạc lại, nên hàng không cấm vận chuyển pin xả cạn. Ngược lại, pin Na-ion dùng lá Nhôm cực âm có thể <strong>xả kiệt về đúng 0.00 V và ngắn mạch an toàn 100%</strong> khi vận chuyển đường biển/hàng không, hoàn toàn loại trừ nguy cơ cháy nổ!
                </p>
              </div>
            </div>
          </div>

          {/* Comparative Capacity Retention Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Gauge className="w-4 h-4 text-yellow-400" />
                <span>Khả Năng Giữ Dung Lượng Ở {temperatureC}°C (Capacity Retention)</span>
              </h4>

              {/* Progress Bars Comparison */}
              <div className="space-y-3.5">
                {/* Sodium-Ion Battery */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-amber-300">Pin Natri-ion (Na-ion):</span>
                    <span className="font-mono text-amber-300 font-bold">{comparison.naIonCapacityRetentionPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-obsidian rounded-full overflow-hidden border border-amber-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                      style={{ width: `${comparison.naIonCapacityRetentionPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Lithium-ion LFP */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-sky-300">Lithium Sắt Photphat (LiFePO₄ - LFP):</span>
                    <span className="font-mono text-sky-300 font-bold">{comparison.liIonLfpCapacityRetentionPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-obsidian rounded-full overflow-hidden border border-sky-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-all duration-300"
                      style={{ width: `${comparison.liIonLfpCapacityRetentionPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Lithium-ion NMC */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-rose-300">Lithium Niken Mangan Coban (NMC 811):</span>
                    <span className="font-mono text-rose-300 font-bold">{comparison.liIonNmcCapacityRetentionPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-obsidian rounded-full overflow-hidden border border-rose-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-300"
                      style={{ width: `${comparison.liIonNmcCapacityRetentionPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Kinetic Explanation */}
              <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5 text-xs text-ivory-muted">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Tại Sao Pin Na-ion Chịu Lạnh Vượt Trội Hơn Pin Lithium?
                </span>
                <p className="leading-relaxed text-[11px]">
                  Ion Na⁺ có mật độ điện tích bề mặt thấp hơn ion Li⁺, dẫn đến <strong>năng lượng giải solvate (desolvation energy) thấp hơn đáng kể</strong> khi ion đi qua màng thụ động bề mặt (SEI). Do đó ở nhiệt độ cực đoan -20°C đến -40°C, ion Na⁺ vẫn khuếch tán linh hoạt vào màng điện cực mà không bị kết tủa thành natri kim loại (plating), giúp xe điện Na-ion khởi động và sạc bình thường ở vùng khí hậu giá lạnh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
