// src/components/visualizations/SuperconductivityVisualizer.tsx
// Milestone 46: Superconductivity, BCS Cooper Pairs, London Penetration Depth & Meissner Effect Visualizer
// Standards: Nobel Prize in Physics 1972 (BCS Theory), 1987 (High-Tc Cuprates), 2003 (Type II Vortices)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Hiện tượng siêu dẫn & Từ trường; Hóa học 12: Vật liệu gốm siêu dẫn YBCO)

import React, { useState } from 'react';
import {
  SUPERCONDUCTOR_CATALOG,
  calculateSuperconductivity,
  LIQUID_NITROGEN_BOILING_POINT_K,
  LIQUID_HELIUM_BOILING_POINT_K,
} from '../../domain/superconductivityEngine';
import { sound } from '../../audio/soundEngine';
import {
  Zap,
  Shield,
  Layers,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Cpu,
  Sparkles,
  TrendingDown,
  Atom,
  Magnet
} from 'lucide-react';

export interface SuperconductivityVisualizerProps {
  initialMaterialId?: string;
}

export const SuperconductivityVisualizer: React.FC<SuperconductivityVisualizerProps> = ({
  initialMaterialId,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(initialMaterialId || 'ybco_cuprate');
  const [temperatureK, setTemperatureK] = useState<number>(65.0); // 65 K (Liquid Nitrogen regime for YBCO)
  const [appliedFieldT, setAppliedFieldT] = useState<number>(0.02); // 0.02 T (20 mT)
  const [activeTab, setActiveTab] = useState<'phase_diagram' | 'bcs_energy_gap' | 'meissner_levitation' | 'london_vortices'>('phase_diagram');

  const scResult = calculateSuperconductivity(
    selectedMaterialId,
    temperatureK,
    appliedFieldT
  );

  const handleMaterialChange = (id: string) => {
    setSelectedMaterialId(id);
    const mat = SUPERCONDUCTOR_CATALOG[id];
    // Set appropriate initial temperature below Tc
    if (mat.criticalTemperatureKelvin > 80) setTemperatureK(65.0);
    else if (mat.criticalTemperatureKelvin > 20) setTemperatureK(15.0);
    else setTemperatureK(2.0);
    sound.playSuperconductingMeissnerLevitateHum();
  };

  const handleTemperatureChange = (val: number) => {
    setTemperatureK(val);
    if (val < scResult.material.criticalTemperatureKelvin && scResult.superconductingState === 'MEISSNER_STATE') {
      sound.playSuperconductingMeissnerLevitateHum();
    }
  };

  const handleFieldChange = (val: number) => {
    setAppliedFieldT(val);
    if (scResult.superconductingState === 'MIXED_VORTEX_STATE') {
      sound.playFluxVortexPinningClick();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-blue-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & GDPT 2018 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Vật Lý Siêu Dẫn & Đệm Từ Meissner-Ochsenfeld
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono">
                Vật lí 12 Chuyên đề • Nobel 1972/1987
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Cặp Cooper BCS, Khe năng lượng Δ(T), Bề sâu London λL, Trạng thái xoáy từ thông Abrikosov & Lực nâng đệm từ.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-blue-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider font-mono">
            {scResult.isSuperconducting ? 'SIÊU DẪN (R = 0)' : 'TRẠNG THÁI BÌNH THƯỜNG'}
          </span>
        </div>
      </div>

      {/* 2. Superconductor Material Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          Chọn Vật Liệu Siêu Dẫn Benchmark:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.values(SUPERCONDUCTOR_CATALOG).map((mat) => {
            const isSelected = mat.id === selectedMaterialId;
            return (
              <button
                key={mat.id}
                onClick={() => handleMaterialChange(mat.id)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-blue-500/20 border-blue-400 text-white shadow-lg ring-1 ring-blue-500/30'
                    : 'bg-navy-dark/40 border-navy-light/40 text-ivory hover:border-blue-500/40 hover:bg-navy-dark/70'
                }`}
              >
                <div className="text-xs font-bold truncate">{mat.name}</div>
                <div className="text-[10px] text-blue-300 font-mono">
                  Tc = {mat.criticalTemperatureKelvin} K ({mat.type})
                </div>
                <div className="text-[9px] text-ivory-muted truncate mt-0.5">{mat.formula}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-3">
        {[
          { id: 'phase_diagram', label: '1. Giản Đồ Pha Từ Trường H - T', icon: Shield },
          { id: 'bcs_energy_gap', label: '2. Khe Năng Lượng Cặp Cooper BCS', icon: Layers },
          { id: 'meissner_levitation', label: '3. Đệm Từ & Khóa Lượng Tử Meissner', icon: Zap },
          { id: 'london_vortices', label: '4. Bề Sâu London & Tâm Xoáy Abrikosov', icon: Magnet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playSuperconductingMeissnerLevitateHum();
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-navy-dark font-bold shadow-md shadow-blue-500/20'
                  : 'bg-navy-dark/50 text-ivory-muted hover:text-white hover:bg-navy-dark/80 border border-navy-light/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Main Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Graph Canvas / Simulation Display */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            {activeTab === 'phase_diagram' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-blue-400">
                    Giản Đồ Pha Từ Trường H theo Nhiệt Độ T ({scResult.material.type})
                  </span>
                  <span className="font-mono text-ivory-muted">
                    Trạng thái: <strong className={scResult.isSuperconducting ? 'text-emerald-400' : 'text-rose-400'}>{scResult.superconductingState}</strong>
                  </span>
                </div>

                {/* SVG Phase Diagram */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="50" y1="20" x2="50" y2="210" stroke="#334155" strokeWidth="1.5" />
                    <line x1="50" y1="210" x2="480" y2="210" stroke="#334155" strokeWidth="1.5" />

                    {/* Critical Temperature Reference Line */}
                    <line x1="420" y1="20" x2="420" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="400" y="225" fill="#94a3b8" fontSize="10">Tc = {scResult.material.criticalTemperatureKelvin} K</text>

                    {/* Liquid Nitrogen Reference Mark (77.36 K) */}
                    {scResult.material.criticalTemperatureKelvin > 80 && (
                      <g>
                        <line x1="350" y1="20" x2="350" y2="210" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="310" y="32" fill="#06b6d4" fontSize="9">Nitơ Lỏng (77.4 K)</text>
                      </g>
                    )}

                    {/* Parabolic Critical Curve Hc(T) = H0 * [1 - (T/Tc)^2] */}
                    {scResult.material.type === 'TYPE_I' ? (
                      <g>
                        <path
                          d={(() => {
                            let path = 'M 50 40';
                            for (let t = 0; t <= 1.0; t += 0.05) {
                              const hRatio = 1 - t * t;
                              const x = 50 + t * 370;
                              const y = 210 - hRatio * 170;
                              path += ` L ${x} ${y}`;
                            }
                            return path;
                          })()}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                        />
                        <text x="120" y="150" fill="#3b82f6" fontSize="11" fontWeight="bold">
                          Miền Siêu Dẫn Meissner (χ = -1, R = 0)
                        </text>
                        <text x="240" y="80" fill="#94a3b8" fontSize="11">
                          Miền Bình Thường (Normal)
                        </text>
                      </g>
                    ) : (
                      // Type II: Hc1(T) and Hc2(T)
                      <g>
                        {/* Upper Critical Field Hc2(T) */}
                        <path
                          d={(() => {
                            let path = 'M 50 30';
                            for (let t = 0; t <= 1.0; t += 0.05) {
                              const hRatio = 1 - t * t;
                              const x = 50 + t * 370;
                              const y = 210 - hRatio * 180;
                              path += ` L ${x} ${y}`;
                            }
                            return path;
                          })()}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        {/* Lower Critical Field Hc1(T) */}
                        <path
                          d={(() => {
                            let path = 'M 50 170';
                            for (let t = 0; t <= 1.0; t += 0.05) {
                              const hRatio = 1 - t * t;
                              const x = 50 + t * 370;
                              const y = 210 - hRatio * 40;
                              path += ` L ${x} ${y}`;
                            }
                            return path;
                          })()}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        <text x="80" y="195" fill="#3b82f6" fontSize="9" fontWeight="bold">Meissner (H &lt; Hc1)</text>
                        <text x="140" y="120" fill="#f59e0b" fontSize="10" fontWeight="bold">
                          Trạng Thái Xoáy Hỗn Hợp Abrikosov (Hc1 &lt; H &lt; Hc2)
                        </text>
                        <text x="260" y="60" fill="#94a3b8" fontSize="10">Bình Thường (H &gt; Hc2)</text>
                      </g>
                    )}

                    {/* Current (T, H) Operating Coordinate Point */}
                    {(() => {
                      const tClamped = Math.min(scResult.material.criticalTemperatureKelvin, temperatureK);
                      const tFrac = tClamped / scResult.material.criticalTemperatureKelvin;
                      const x = 50 + tFrac * 370;
                      const y = 210 - Math.min(1.0, appliedFieldT / (scResult.material.thermodynamicCriticalFieldH0Tesla * 1.2)) * 160;
                      return (
                        <g>
                          <line x1={x} y1="20" x2={x} y2="210" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                          <circle cx={x} cy={y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          <text x={x + 8} y={y - 6} fill="#38bdf8" fontSize="10" fontWeight="bold">
                            ({temperatureK.toFixed(1)} K, {(appliedFieldT * 1000).toFixed(0)} mT)
                          </text>
                        </g>
                      );
                    })()}

                    {/* Axis Labels */}
                    <text x="440" y="225" fill="#94a3b8" fontSize="10">Nhiệt độ T (K)</text>
                    <text x="15" y="30" fill="#94a3b8" fontSize="10">Từ trường H</text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'bcs_energy_gap' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-400">
                    Khe Năng Lượng Cặp Cooper BCS: Δ(0) = 1.764 kBTc & Sự Suy Giảm Nhiệt Độ
                  </span>
                  <span className="font-mono text-ivory-muted">
                    Δ(T) = {scResult.bcsEnergyGapMilliEv.toFixed(2)} meV
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-2">
                    <div className="font-bold text-emerald-300">Cơ Chế Ghép Đôi Electron-Phonon (BCS)</div>
                    <p className="text-[11px] text-ivory-muted leading-relaxed">
                      Hai electron (tích điện âm đẩy nhau) tương tác hút gián tiếp nhờ mạng tinh thể: electron thứ nhất hút ion dương mạng tinh thể biến dạng, tạo vùng điện tích dương dư thừa thu hút electron thứ hai.
                    </p>
                    <div className="p-2 rounded bg-navy-dark/70 font-mono text-[10px] text-white border border-navy-light/30">
                      Cặp Cooper: (|k, ↑⟩, |-k, ↓⟩) • Spin tổng S = 0 (Boson)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-2">
                    <div className="font-bold text-blue-300">Ngưng Tụ Lượng Tử Macroscopic (Bose-Einstein)</div>
                    <p className="text-[11px] text-ivory-muted leading-relaxed">
                      Vì các cặp Cooper có spin nguyên (S = 0), chúng cư xử như các Boson và cùng ngưng tụ vào một trạng thái lượng tử vĩ mô duy nhất, chuyển động đồng pha mà không bị tán xạ bởi khuyết tật mạng tinh thể.
                    </p>
                    <div className="text-[10px] text-cyan-300 font-mono">
                      Độ dài kết hợp Cooper ξ₀ = {scResult.material.coherenceLength0Nm} nm
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meissner_levitation' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-cyan-400">
                    Mô Phỏng Bay Lơ Lửng Đệm Từ (Meissner Levitation & Quantum Pinning)
                  </span>
                  <span className="font-mono text-ivory-muted">
                    Lực nâng F = {scResult.magneticLevitationForceNewtons.toFixed(1)} N
                  </span>
                </div>

                {/* Animated Levitating Pill Canvas */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-4 flex flex-col items-center justify-between overflow-hidden">
                  {/* Magnetic Track Below */}
                  <div className="w-full flex justify-center items-center">
                    <span className="text-[10px] font-mono text-ivory-muted">
                      Đường ray nam châm vĩnh cửu NdFeB (Từ trường H = {(appliedFieldT * 1000).toFixed(0)} mT)
                    </span>
                  </div>

                  {/* Levitating Superconductor Puck */}
                  {scResult.isSuperconducting ? (
                    <div className="flex flex-col items-center animate-bounce duration-1000">
                      <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_25px_rgba(6,182,212,0.6)] border border-cyan-300 text-xs flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-200" />
                        <span>{scResult.material.formula} BAY LƠ LỬNG TRÊN ĐƯỜNG RAY</span>
                      </div>
                      <div className="h-10 w-1 border-l-2 border-dashed border-cyan-400 my-1"></div>
                      <span className="text-[10px] text-cyan-300 font-mono">
                        Khoảng cách nâng: {Math.max(2, (scResult.magneticLevitationForceNewtons * 0.4)).toFixed(1)} mm
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-60">
                      <div className="px-6 py-3 rounded-2xl bg-navy-dark text-ivory-muted border border-navy-light/50 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>VẬT LIỆU CHẠM ĐÁY (Không có lực nâng do R &gt; 0)</span>
                      </div>
                    </div>
                  )}

                  {/* Track Base */}
                  <div className="w-4/5 h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg border border-slate-500 flex items-center justify-around text-[9px] font-mono text-slate-300">
                    <span>[N]</span>
                    <span>[S]</span>
                    <span>[N]</span>
                    <span>[S]</span>
                    <span>[N]</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'london_vortices' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-400">
                    Bề Sâu Xuyên Thấu London λL & Ống Từ Thông Lượng Tử Hóa Φ₀
                  </span>
                  <span className="font-mono text-ivory-muted">
                    λL(T) = {scResult.londonPenetrationDepthNm.toFixed(1)} nm • Φ₀ = 2.07 × 10⁻¹⁵ Wb
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-2">
                    <div className="font-bold text-purple-300">Phương Trình London (F. & H. London 1935)</div>
                    <p className="text-[11px] text-ivory-muted leading-relaxed">
                      Từ trường không bị dập tắt tức thời tại bề mặt, mà suy giảm theo hàm mũ âm: B(x) = B₀ exp(-x / λL).
                    </p>
                    <div className="p-2 rounded bg-navy-dark/70 font-mono text-[10px] text-purple-200 border border-navy-light/30">
                      Tham số Ginzburg-Landau: κ = λ / ξ = {scResult.ginzburgLandauKappa}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-2">
                    <div className="font-bold text-amber-300">Mạng Lưới Xoáy Abrikosov (Nobel 2003)</div>
                    <p className="text-[11px] text-ivory-muted leading-relaxed">
                      Trong siêu dẫn Loại II (κ &gt; 1/√2), từ trường thâm nhập dưới dạng lưới tam giác các ống từ thông lượng tử. Mỗi ống mang một lượng tử từ thông đúng bằng Φ₀ = h / (2e).
                    </p>
                    <div className="text-[10px] text-amber-300 font-mono">
                      Đẩy từ thông: {scResult.magneticFluxExpulsionPercent}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Commentary Banner */}
          <div className="bg-navy-dark/60 border border-blue-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed text-ivory-light">
              <span className="font-semibold text-blue-300">Ý nghĩa vật lí & Công nghệ: </span>
              {scResult.pedagogicalInsightVI}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Quantitative Readouts */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-navy-light/40 pb-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              Điều Khiển Tham Số Nhiệt & Từ
            </h3>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nhiệt độ (T):</span>
                <span className="font-mono text-blue-400 font-bold">{temperatureK.toFixed(1)} Kelvin</span>
              </div>
              <input
                type="range"
                min="0.5"
                max={Math.max(120, scResult.material.criticalTemperatureKelvin * 1.3)}
                step="0.5"
                value={temperatureK}
                onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-ivory-muted">
                <span>4.2 K (Heli)</span>
                <span>77.4 K (Nitơ)</span>
                <span>Tc = {scResult.material.criticalTemperatureKelvin} K</span>
              </div>
            </div>

            {/* Magnetic Field Slider */}
            <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Từ trường ngoài (H):</span>
                <span className="font-mono text-amber-400 font-bold">{(appliedFieldT * 1000).toFixed(0)} mT</span>
              </div>
              <input
                type="range"
                min="0"
                max={scResult.material.type === 'TYPE_I' ? scResult.material.thermodynamicCriticalFieldH0Tesla * 1.5 : 2.0}
                step="0.005"
                value={appliedFieldT}
                onChange={(e) => handleFieldChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Real-Time Quantitative Superconducting Readouts */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-light/30 text-xs">
              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Khe năng lượng BCS</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {scResult.bcsEnergyGapMilliEv.toFixed(2)} meV
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Bề sâu London λL</div>
                <div className="text-sm font-bold text-purple-400 font-mono">
                  {scResult.isSuperconducting ? `${scResult.londonPenetrationDepthNm.toFixed(0)} nm` : '∞'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Trường tới hạn Hc(T)</div>
                <div className="text-sm font-bold text-white font-mono">
                  {(scResult.criticalFieldTesla * 1000).toFixed(0)} mT
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Lực nâng đệm từ</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">
                  {scResult.magneticLevitationForceNewtons.toFixed(1)} N
                </div>
              </div>
            </div>

            {/* High-Tc Liquid Nitrogen Badge */}
            {scResult.material.isHighTcLiquidNitrogenAccessible && (
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Siêu dẫn nhiệt độ cao (HTS): Đạt trạng thái siêu dẫn trong môi trường nitơ lỏng 77 K!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
