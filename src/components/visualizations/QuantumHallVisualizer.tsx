// src/components/visualizations/QuantumHallVisualizer.tsx
// Milestone 44: Quantum Hall Effect, Topological Matter & Berry Phase Visualizer
// Standards: 2019 SI Metrology (von Klitzing constant R_K = h/e^2), Nobel Prize Physics 1985 (von Klitzing), 1998 (Laughlin), 2016 (Thouless)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Hiệu ứng lượng tử & Vật liệu tô pô; Hóa học 12: Graphene & Bán dẫn 2D)

import React, { useState } from 'react';
import {
  TWO_DEE_MATERIALS,
  calculateQuantumHallEffect,
  SI_VON_KLITZING_RK,
} from '../../domain/quantumHallEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Zap,
  TrendingUp,
  Sliders,
  Shield,
  Info,
  CheckCircle2,
  Layers,
  Compass,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface QuantumHallVisualizerProps {
  initialMaterialId?: string;
}

export const QuantumHallVisualizer: React.FC<QuantumHallVisualizerProps> = ({
  initialMaterialId,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(initialMaterialId || 'gaas_algaas');
  const [magneticFieldB, setMagneticFieldB] = useState<number>(6.0); // 6.0 Tesla
  const [sheetDensityX15, setSheetDensityX15] = useState<number>(3.0); // 3.0 x 10^15 m^-2
  const [temperatureK, setTemperatureK] = useState<number>(1.5); // 1.5 K
  const [activeTab, setActiveTab] = useState<'plateaus_transport' | 'landau_levels' | 'chiral_edge_states' | 'graphene_dirac'>('plateaus_transport');

  const sheetDensityM2 = sheetDensityX15 * 1e15;
  const qheResult = calculateQuantumHallEffect(
    selectedMaterialId,
    magneticFieldB,
    sheetDensityM2,
    temperatureK
  );

  const handleMaterialChange = (id: string) => {
    setSelectedMaterialId(id);
    sound.playQuantumHallPlateauLockBeep();
  };

  const handleBChange = (val: number) => {
    setMagneticFieldB(val);
    if (Math.abs(qheResult.fillingFactorNu - qheResult.integerPlateauIndex) < 0.1) {
      sound.playQuantumHallPlateauLockBeep();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & BIPM Metrology */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Hiệu Ứng Hall Lượng Tử & Dòng Biên Bất Biến Tô Pô
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono">
                Vật lí 12 Chuyên đề & Nobel 1985/2016
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Lượng tử hóa điện trở Hall RK = h/e², Mức năng lượng Landau, Số Chern TKNN & Dòng điện biên chiral không tiêu tán.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-cyan-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
            RK = {SI_VON_KLITZING_RK.toFixed(3)} Ω
          </span>
        </div>
      </div>

      {/* 2. 2D Material Benchmark Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Chọn Hệ Bán Dẫn 2 Chiều (2DEG & Graphene):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(TWO_DEE_MATERIALS).map((m) => {
            const isSelected = m.id === selectedMaterialId;
            return (
              <button
                key={m.id}
                onClick={() => handleMaterialChange(m.id)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-500/30'
                    : 'bg-navy-dark/40 border-navy-light/40 text-ivory hover:border-cyan-500/40 hover:bg-navy-dark/70'
                }`}
              >
                <div className="text-xs font-bold truncate">{m.name}</div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  m* = {m.effectiveMassRatio} mₑ {m.isDiracMaterial ? '• Dirac' : ''}
                </div>
                <div className="text-[9px] text-ivory-muted truncate mt-0.5">{m.nameVI}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-3">
        {[
          { id: 'plateaus_transport', label: '1. Cao Nguyên Hall Rxy & Đỉnh Rxx', icon: TrendingUp },
          { id: 'landau_levels', label: '2. Thang Mức Năng Lượng Landau', icon: Layers },
          { id: 'chiral_edge_states', label: '3. Dòng Biên Chiral Tô Pô', icon: Shield },
          { id: 'graphene_dirac', label: '4. Graphene & Lượng Tử Dị Thường', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'chiral_edge_states') {
                  sound.playChiralEdgeCurrentWhoosh();
                } else {
                  sound.playQuantumHallPlateauLockBeep();
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500 text-navy-dark font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-navy-dark/50 text-ivory-muted hover:text-white hover:bg-navy-dark/80 border border-navy-light/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Main Interactive Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Graph / Quantum State Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            {activeTab === 'plateaus_transport' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-cyan-400">
                    Đồ thị Điện trở Hall Rxy (Đỏ) & Điện trở dọc Rxx (Xanh lá) theo Từ trường B
                  </span>
                  <span className="font-mono text-ivory-muted">
                    B = {magneticFieldB.toFixed(1)} T • ν = {qheResult.fillingFactorNu.toFixed(2)}
                  </span>
                </div>

                {/* SVG Transport Spectrum */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Coordinate axes */}
                    <line x1="50" y1="20" x2="50" y2="210" stroke="#334155" strokeWidth="1.5" />
                    <line x1="50" y1="210" x2="480" y2="210" stroke="#334155" strokeWidth="1.5" />

                    {/* Plateau horizontal reference guidelines (R_K / 1, R_K / 2, R_K / 3, R_K / 4) */}
                    {[
                      { nu: 1, label: 'ν=1 (25812.8 Ω)', y: 40 },
                      { nu: 2, label: 'ν=2 (12906.4 Ω)', y: 95 },
                      { nu: 3, label: 'ν=3 (8604.3 Ω)', y: 135 },
                      { nu: 4, label: 'ν=4 (6453.2 Ω)', y: 165 },
                    ].map((p) => (
                      <g key={p.nu}>
                        <line x1="50" y1={p.y} x2="480" y2={p.y} stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                        <text x="55" y={p.y - 4} fill="#f43f5e" fontSize="9" fontFamily="monospace">
                          {p.label}
                        </text>
                      </g>
                    ))}

                    {/* R_xy Quantized Staircase Curve */}
                    <path
                      d={(() => {
                        let path = 'M 50 200';
                        const maxB = 18.0;
                        for (let b = 0.5; b <= maxB; b += 0.25) {
                          const nu = (qheResult.material.typicalSheetDensityM2 * 6.626e-34) / (1.602e-19 * b);
                          let rxy = SI_VON_KLITZING_RK / Math.max(0.8, nu);
                          // Quantization flattening
                          const nearestInt = Math.round(nu);
                          if (Math.abs(nu - nearestInt) < 0.25 && nearestInt >= 1 && nearestInt <= 6) {
                            rxy = SI_VON_KLITZING_RK / nearestInt;
                          }
                          const x = 50 + (b / maxB) * 420;
                          const y = 210 - (rxy / 27000) * 175;
                          path += ` L ${x} ${Math.max(25, y)}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                    />

                    {/* R_xx Shubnikov-de Haas Oscillations (Peaks at transitions, Zero on plateaus) */}
                    <path
                      d={(() => {
                        let path = 'M 50 210';
                        const maxB = 18.0;
                        for (let b = 0.5; b <= maxB; b += 0.15) {
                          const nu = (qheResult.material.typicalSheetDensityM2 * 6.626e-34) / (1.602e-19 * b);
                          const nearestInt = Math.round(nu);
                          const dist = Math.abs(nu - nearestInt);
                          // Peaks when dist is around 0.5, drops to 0 when dist < 0.2
                          let rxxPeak = Math.sin(nu * Math.PI) * Math.sin(nu * Math.PI);
                          if (dist < 0.18) rxxPeak = 0;
                          const x = 50 + (b / maxB) * 420;
                          const y = 210 - rxxPeak * 60;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />

                    {/* Current operating B point */}
                    {(() => {
                      const maxB = 18.0;
                      const x = 50 + (Math.min(maxB, magneticFieldB) / maxB) * 420;
                      return (
                        <g>
                          <line x1={x} y1="20" x2={x} y2="210" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx={x} cy={210 - (qheResult.hallResistanceRxyOhm / 27000) * 175} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          <text x={x - 20} y="228" fill="#38bdf8" fontSize="10" fontWeight="bold">
                            B = {magneticFieldB.toFixed(1)} T
                          </text>
                        </g>
                      );
                    })()}

                    {/* Axis Labels */}
                    <text x="440" y="225" fill="#94a3b8" fontSize="10">Từ trường B (T)</text>
                    <text x="15" y="30" fill="#94a3b8" fontSize="10">R (Ω)</text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'landau_levels' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-400">
                    Phổ Năng Lượng Mức Landau En = ħωc(n + 1/2) & Tách Mức Spin Zeeman
                  </span>
                  <span className="font-mono text-ivory-muted">
                    ħωc = {(qheResult.cyclotronEnergyEv * 1000).toFixed(1)} meV • EF = {(qheResult.fermiEnergyEv * 1000).toFixed(1)} meV
                  </span>
                </div>

                {/* Landau Levels Ladder */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-3 flex flex-col justify-end space-y-2">
                  {/* Fermi Energy Line */}
                  <div className="absolute w-full left-0 px-4 top-1/2 -translate-y-4 flex items-center gap-2 z-10">
                    <div className="h-[2px] bg-amber-400 w-full shadow-[0_0_8px_#f59e0b]"></div>
                    <span className="text-[10px] font-bold text-amber-300 font-mono shrink-0 bg-navy-dark px-1.5 py-0.5 rounded border border-amber-500/40">
                      Mức Fermi EF = {(qheResult.fermiEnergyEv * 1000).toFixed(1)} meV
                    </span>
                  </div>

                  <div className="space-y-3 z-0">
                    {qheResult.landauLevels.slice(0, 5).reverse().map((level) => {
                      const isOccupied = level.isOccupied;
                      return (
                        <div key={level.levelIndexN} className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-cyan-300 w-12 shrink-0">
                            n = {level.levelIndexN}
                          </span>
                          <div className={`flex-1 h-5 rounded-lg border flex items-center justify-between px-3 transition-all ${
                            isOccupied
                              ? 'bg-cyan-500/20 border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                              : 'bg-navy-dark/40 border-navy-light/30 opacity-40'
                          }`}>
                            <span className="text-[10px] font-mono text-ivory">
                              E = {(level.energyEv * 1000).toFixed(1)} meV
                            </span>
                            <div className="flex items-center gap-2 text-[9px] font-mono">
                              <span className="text-cyan-300">↑ {(level.energyEvSpinUp * 1000).toFixed(1)}</span>
                              <span className="text-rose-300">↓ {(level.energyEvSpinDown * 1000).toFixed(1)}</span>
                              {isOccupied && (
                                <span className="px-1.5 py-0.2 rounded bg-cyan-400/30 text-cyan-200 text-[8px] font-bold">
                                  ĐÃ LẤP ĐẦY
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chiral_edge_states' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-400">
                    Mô Hình Thanh Hall (Hall Bar) & Dòng Biên Chiral Bất Biến Tô Pô
                  </span>
                  <span className="font-mono text-ivory-muted">
                    Số Chern C = {qheResult.chernNumber} ({qheResult.chiralEdgeStatesCount} Kênh Biên)
                  </span>
                </div>

                {/* Hall Bar Graphic */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-4 flex flex-col justify-center items-center">
                  <div className="relative w-4/5 h-36 bg-navy-dark/90 border-2 border-emerald-500/60 rounded-xl p-3 flex flex-col justify-between shadow-2xl overflow-hidden">
                    {/* Top Edge State: Currents travel Right */}
                    <div className="w-full flex items-center justify-between border-b border-emerald-500/40 pb-1 text-emerald-300 font-mono text-[10px]">
                      <span className="flex items-center gap-1 animate-pulse">
                        Dòng biên Chiral (Cạnh trên) <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[9px] text-ivory-muted">Tán xạ ngược = 0 (Rxx = 0)</span>
                    </div>

                    {/* Insulating Bulk (Chern Topological Insulator) */}
                    <div className="text-center py-2">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Khối Bên Trong (Bulk) Cách Điện Tuyệt Đối
                      </div>
                      <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                        Khe năng lượng Landau gap ΔE = ħωc • Quỹ đạo Cyclotron đóng kín
                      </div>
                    </div>

                    {/* Bottom Edge State: Currents travel Left */}
                    <div className="w-full flex items-center justify-between border-t border-emerald-500/40 pt-1 text-emerald-300 font-mono text-[10px]">
                      <span className="text-[9px] text-ivory-muted">Bảo vệ tô pô TKNN Invariant</span>
                      <span className="flex items-center gap-1 animate-pulse">
                        ← Dòng biên Chiral (Cạnh dưới)
                      </span>
                    </div>

                    {/* Corner Leads / Contacts */}
                    <div className="absolute top-0 left-0 w-3 h-3 bg-amber-400 rounded-br"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-bl"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-400 rounded-tr"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-400 rounded-tl"></div>
                  </div>

                  <div className="mt-3 text-[11px] text-ivory-muted text-center max-w-md">
                    Các electron ở rìa mẫu không thể quay đầu lại khi gặp khuyết tật vật lý vì không có trạng thái đối xứng ngược chiều ở cùng một biên.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'graphene_dirac' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-400">
                    Graphene Đơn Lớp & Lượng Tử Hóa Nửa Nguyên: ν = ±4(n + 1/2)
                  </span>
                  <span className="font-mono text-ivory-muted">Pha Berry = π (180°)</span>
                </div>

                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-4 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                      <div className="font-bold text-amber-300">Điểm Nón Dirac K & K'</div>
                      <p className="text-[11px] text-ivory-muted leading-relaxed">
                        Phương trình Dirac không khối lượng E = ħ v_F k. Vận tốc Fermi v_F ≈ 10⁶ m/s (1/300 tốc độ ánh sáng).
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                      <div className="font-bold text-cyan-300">Mức Landau n = 0 Đặc Biệt</div>
                      <p className="text-[11px] text-ivory-muted leading-relaxed">
                        Tồn tại một mức Landau ngay tại năng lượng E = 0, chia đều giữa dải dẫn và dải hóa trị, dẫn đến QHE ở nhiệt độ phòng.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-ivory space-y-1">
                    <span className="font-bold text-amber-300">Pha Berry Tô Pô (Topological Berry Phase): </span>
                    Khi giả spin (pseudospin) quay một vòng 360° quanh điểm Dirac trong không gian xung lượng, hàm sóng electron nhận thêm một góc pha hình học đúng bằng π (Berry Phase = π).
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Commentary Banner */}
          <div className="bg-navy-dark/60 border border-cyan-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed text-ivory-light">
              <span className="font-semibold text-cyan-300">Ý nghĩa vật lí & Chuẩn đo lường: </span>
              {qheResult.pedagogicalSummaryVI}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Quantitative Metrics */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-navy-light/40 pb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Điều Khiển Tham Số Lượng Tử
            </h3>

            {/* Magnetic Field Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Từ trường (B):</span>
                <span className="font-mono text-cyan-400 font-bold">{magneticFieldB.toFixed(1)} Tesla</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="18.0"
                step="0.1"
                value={magneticFieldB}
                onChange={(e) => handleBChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Sheet Density Slider */}
            <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Mật độ hạt 2D (ns):</span>
                <span className="font-mono text-emerald-400 font-bold">{sheetDensityX15.toFixed(2)} × 10¹⁵ m⁻²</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.1"
                value={sheetDensityX15}
                onChange={(e) => setSheetDensityX15(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nhiệt độ (T):</span>
                <span className="font-mono text-amber-400 font-bold">{temperatureK.toFixed(1)} Kelvin</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="20.0"
                step="0.1"
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Real-Time Quantitative Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-light/30 text-xs">
              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Hệ số lấp đầy ν</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">
                  {qheResult.fillingFactorNu.toFixed(2)}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Điện trở Hall Rxy</div>
                <div className="text-sm font-bold text-white font-mono">
                  {qheResult.hallResistanceRxyOhm.toFixed(1)} Ω
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Điện trở dọc Rxx</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {qheResult.longitudinalResistanceRxxOhm.toFixed(2)} Ω
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Chiều dài từ lB</div>
                <div className="text-sm font-bold text-purple-400 font-mono">
                  {qheResult.magneticLengthNm} nm
                </div>
              </div>
            </div>

            {/* Plateau Status Badge */}
            {qheResult.isAtPlateau ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center gap-2 text-emerald-300 text-[11px]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Khoá cao nguyên ν = {qheResult.integerPlateauIndex}: Chuẩn lượng tử hóa tuyệt đối!</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center gap-2 text-amber-300 text-[11px]">
                <Activity className="w-4 h-4 shrink-0 animate-pulse" />
                <span>Vùng chuyển tiếp: Xuất hiện điện trở tiêu tán trong khối bulk.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
