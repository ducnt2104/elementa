// src/components/visualizations/AnionExchangeElectrolyzerVisualizer.tsx
// Interactive Visualizer: Anion Exchange Membrane Water Electrolysis (AEMWE), PGM-Free Catalysts & Terawatt Hydrogen
// Standards: IUPAC Electrochemistry, IEA / IRENA Green Hydrogen & Vietnam GDPT 2018 (Hóa học 10 & 12: Điện phân kiềm, Màng bán dẫn & Xúc tác dị thể)

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
  Box,
  Droplets,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Flame,
  ShieldAlert,
  BatteryCharging,
  DollarSign
} from 'lucide-react';
import {
  ELECTROLYZER_TECHNOLOGIES_CATALOG,
  simulateElectrolyzerPolarization,
  simulateAEMWEPerformance,
  AEMWEStackSpec
} from '../../domain/anionExchangeElectrolyzerEngine';
import { sound } from '../../audio/soundEngine';

type AEMWETabMode = 'AEM_CELL_CROSS_SECTION_OH_HOPPING' | 'POLARIZATION_OVERPOTENTIALS' | 'TERAWATT_SCALING_AND_LCOH';

export const AnionExchangeElectrolyzerVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AEMWETabMode>('AEM_CELL_CROSS_SECTION_OH_HOPPING');

  // Selected technology
  const [selectedTechId, setSelectedTechId] = useState<string>('AEMWE_PIPERION_NIFE');

  // Sliders
  const [operatingTempC, setOperatingTempC] = useState<number>(65);
  const [pressureBar, setPressureBar] = useState<number>(30);
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(1.2);
  const [stackAreaM2, setStackAreaM2] = useState<number>(5.0);
  const [electricityPriceUsd, setElectricityPriceUsd] = useState<number>(0.03);

  const selectedSpec = useMemo(() => {
    return ELECTROLYZER_TECHNOLOGIES_CATALOG.find(t => t.id === selectedTechId) || ELECTROLYZER_TECHNOLOGIES_CATALOG[0];
  }, [selectedTechId]);

  // Polarization curve
  const polPoints = useMemo(() => {
    return simulateElectrolyzerPolarization(selectedTechId, operatingTempC, pressureBar);
  }, [selectedTechId, operatingTempC, pressureBar]);

  // Performance calculation
  const performance = useMemo(() => {
    return simulateAEMWEPerformance(selectedTechId, operatingTempC, pressureBar, currentDensityAcm2, stackAreaM2, electricityPriceUsd);
  }, [selectedTechId, operatingTempC, pressureBar, currentDensityAcm2, stackAreaM2, electricityPriceUsd]);

  // Current matched point on curve
  const currentPoint = useMemo(() => {
    return polPoints.reduce((prev, curr) => 
      Math.abs(curr.currentDensityAcm2 - currentDensityAcm2) < Math.abs(prev.currentDensityAcm2 - currentDensityAcm2) ? curr : prev,
      polPoints[0]
    );
  }, [polPoints, currentDensityAcm2]);

  return (
    <div className="bg-obsidian-card border border-teal-900/40 rounded-2xl p-6 shadow-2xl text-ivory space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-950/80 text-teal-400 border border-teal-500/40">
              CÔNG NGHỆ ĐIỆN PHÂN NƯỚC THẾ HỆ MỚI (AEMWE)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" /> 100% PGM-Free NiFe-LDH
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2">
            Điện Phân Màng Trao Đổi Anion (AEMWE) & Hydro Quy Mô Terawatt
          </h2>
          <p className="text-xs text-ivory-muted max-w-2xl mt-0.5">
            Mô phỏng cơ chế dẫn ion hydroxide (OH⁻) qua màng polyme PiperION mỏng 40 µm, xúc tác lưỡng lớp NiFe-LDH không kim loại quý (loại bỏ hoàn toàn Iridium/Bạch kim đắt đỏ), hướng tới giá thành Hydro xanh &lt; $2.00/kg.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-obsidian-elevated/70 p-1.5 rounded-xl border border-obsidian-border gap-1 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('AEM_CELL_CROSS_SECTION_OH_HOPPING');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'AEM_CELL_CROSS_SECTION_OH_HOPPING'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-1 ring-teal-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mặt Cắt Màng AEM & Ion OH⁻</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('POLARIZATION_OVERPOTENTIALS');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'POLARIZATION_OVERPOTENTIALS'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-1 ring-teal-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Đường Cong Phân Cực I-V</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TERAWATT_SCALING_AND_LCOH');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'TERAWATT_SCALING_AND_LCOH'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-1 ring-teal-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Chi Phí LCOH & Mở Rộng Terawatt</span>
          </button>
        </div>
      </div>

      {/* TECHNOLOGY SELECTOR ROW */}
      <div className="bg-obsidian-elevated/40 p-4 rounded-xl border border-obsidian-border">
        <label className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
          <Zap className="w-3.5 h-3.5 text-teal-400" />
          Chọn Công Nghệ Điện Phân Nước So Sánh:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ELECTROLYZER_TECHNOLOGIES_CATALOG.map(tech => (
            <button
              key={tech.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedTechId(tech.id);
              }}
              className={`p-3 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                selectedTechId === tech.id
                  ? 'bg-teal-950/70 border-teal-400 text-white shadow-lg ring-1 ring-teal-400'
                  : 'bg-obsidian-card border-obsidian-border text-ivory-muted hover:border-ivory-muted'
              }`}
            >
              <div>
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span>{tech.technology === 'AEMWE_PGM_FREE' ? 'Màng Anion (AEMWE)' : tech.technology === 'PEMWE_PRECIOUS_METALS' ? 'Màng Proton (PEMWE)' : 'Điện Phân Kiềm (AEL)'}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${tech.isPgmFree ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950 text-rose-300 border border-rose-500/40'}`}>
                    {tech.isPgmFree ? '100% PGM-Free' : `Iridium: ${tech.iridiumLoadingGramsPerKw} g/kW`}
                  </span>
                </div>
                <div className="text-[11px] text-ivory-muted mt-1 truncate">{tech.anodeOerCatalyst.split('(')[0]}</div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-obsidian-border/60 text-[10px]">
                <span className="text-ivory-muted">Chi phí tháp: <b className="text-teal-300">${tech.stackCostUsdPerKw}/kW</b></span>
                <span className="text-ivory-muted">Độ dày: <b className="text-white">{tech.membraneThicknessMicrons} µm</b></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CELL CROSS SECTION & OH- HOPPING */}
      {activeTab === 'AEM_CELL_CROSS_SECTION_OH_HOPPING' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualizer SVG */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider mb-2 flex items-center gap-2 self-start">
                <Layers className="w-4 h-4 text-teal-400" />
                Mặt Cắt Cấu Trúc Tế Bào AEMWE: Cathode NiMo | Màng Polyme PiperION | Anode NiFe-LDH
              </h4>

              <svg viewBox="0 0 540 320" className="w-full max-w-xl h-auto select-none">
                <defs>
                  <linearGradient id="aemCathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="aemMembraneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#0f766e" />
                  </linearGradient>
                  <linearGradient id="aemAnodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                </defs>

                {/* 1. Cathode Chamber (Left): Hydrogen Evolution Reaction (HER) */}
                <rect x="30" y="40" width="140" height="240" rx="8" fill="url(#aemCathodeGrad)" stroke="#64748b" strokeWidth="2" />
                <text x="100" y="65" fill="#f8fafc" fontSize="11" fontWeight="900" textAnchor="middle">CATHODE (ÂM, -)</text>
                <text x="100" y="80" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">Xúc Tác NiMo / Raney-Ni</text>

                {/* Water feed into cathode */}
                <path d="M 10 110 H 30" stroke="#38bdf8" strokeWidth="3" />
                <text x="5" y="105" fill="#38bdf8" fontSize="9" fontWeight="bold">Dung dịch H₂O (0.1M KOH)</text>

                {/* Reaction at cathode */}
                <g transform="translate(35, 135)">
                  <text x="0" y="0" fill="#e2e8f0" fontSize="9" fontWeight="bold">4H₂O + 4e⁻ ➔ 2H₂ + 4OH⁻</text>
                  <text x="0" y="18" fill="#bae6fd" fontSize="8">Thế khử E° = -0.828 V (pH 14)</text>
                  <text x="0" y="34" fill="#67e8f9" fontSize="8">Tạo bọt khí Hydro áp suất cao</text>
                </g>

                {/* H2 gas exit */}
                <path d="M 30 220 H 10" stroke="#06b6d4" strokeWidth="3" />
                <text x="5" y="235" fill="#22d3ee" fontSize="9" fontWeight="bold">Khí H₂ (30 bar)</text>

                {/* 2. Anion Exchange Membrane (Middle): PiperION 40 µm */}
                <rect x="200" y="40" width="140" height="240" rx="4" fill="url(#aemMembraneGrad)" stroke="#14b8a6" strokeWidth="2" />
                <text x="270" y="65" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">MÀNG AEM (40 µm)</text>
                <text x="270" y="80" fill="#ccfbf1" fontSize="9" textAnchor="middle">Cation cố định -NR₃⁺</text>

                {/* Hydroxide OH- hopping animation arrows */}
                {[110, 150, 190, 230].map(y => (
                  <g key={y} transform={`translate(220, ${y})`}>
                    <line x1="0" y1="0" x2="100" y2="0" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="50" cy="0" r="7" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
                    <text x="50" y="3" fill="#18181b" fontSize="8" fontWeight="bold" textAnchor="middle">OH⁻</text>
                  </g>
                ))}

                {/* 3. Anode Chamber (Right): Oxygen Evolution Reaction (OER) */}
                <rect x="370" y="40" width="140" height="240" rx="8" fill="url(#aemAnodeGrad)" stroke="#10b981" strokeWidth="2" />
                <text x="440" y="65" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">ANODE (DƯƠNG, +)</text>
                <text x="440" y="80" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">Xúc Tác 2D NiFe-LDH</text>

                {/* Anode reaction */}
                <g transform="translate(375, 135)">
                  <text x="0" y="0" fill="#ffffff" fontSize="9" fontWeight="bold">4OH⁻ ➔ O₂ + 2H₂O + 4e⁻</text>
                  <text x="0" y="18" fill="#d1fae5" fontSize="8">Thế oxi hóa E° = +0.401 V</text>
                  <text x="0" y="34" fill="#a7f3d0" fontSize="8">Overpotential cực thấp ~220 mV</text>
                </g>

                {/* O2 gas exit */}
                <path d="M 510 170 H 530" stroke="#10b981" strokeWidth="3" />
                <text x="535" y="174" fill="#34d399" fontSize="9" fontWeight="bold">Khí O₂</text>

                {/* External DC Circuit */}
                <path d="M 100 40 V 15 H 240" fill="none" stroke="#64748b" strokeWidth="2" />
                <path d="M 440 40 V 15 H 300" fill="none" stroke="#10b981" strokeWidth="2" />

                <rect x="240" y="5" width="60" height="20" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
                <text x="270" y="18" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">NGUỒN DC</text>
              </svg>

              <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-obsidian-border text-center text-xs">
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Điện áp tế bào V_cell</div>
                  <div className="text-sm font-black text-teal-400 font-mono mt-0.5">{performance.cellVoltageVolts} V</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Hiệu suất năng lượng (LHV)</div>
                  <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{performance.stackEfficiencyLhvPercent}%</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Hàm lượng kim loại quý (PGM)</div>
                  <div className="text-sm font-black text-amber-300 font-mono mt-0.5">0.0 g/kW (100% Free)</div>
                </div>
              </div>
            </div>

            {/* Scientific Architecture Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  Đặc Tính Vật Liệu & Phân Cực AEM
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Màng trao đổi anion:</span>
                    <div className="font-bold text-white mt-0.5">{selectedSpec.membraneName}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Xúc tác OER Anode:</span>
                    <div className="font-bold text-emerald-300 mt-0.5">{selectedSpec.anodeOerCatalyst}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Xúc tác HER Cathode:</span>
                    <div className="font-bold text-cyan-300 mt-0.5">{selectedSpec.cathodeHerCatalyst}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Tấm phân cực lưỡng cực:</span>
                    <div className="font-bold text-white mt-0.5">{selectedSpec.bipolarPlateMaterial}</div>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Áp suất xả vi sai:</span>
                    <span className="font-mono font-bold text-amber-300">{selectedSpec.differentialPressureLimitBar} bar</span>
                  </div>
                </div>

                <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-500/30 text-xs text-teal-200 leading-relaxed">
                  <span className="font-bold">Đột phá của màng AEM: </span>
                  Hoạt động trong môi trường kiềm loãng cho phép sử dụng tấm lưỡng cực bằng thép không gỉ 316L mạ niken thay vì titanium phủ vàng/bạch kim của PEM, giảm 65% chi phí chế tạo tháp điện phân.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POLARIZATION AND OVERPOTENTIAL BREAKDOWN */}
      {activeTab === 'POLARIZATION_OVERPOTENTIALS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG Polarization Chart */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  Đường Cong Phân Cực I-V & Phân Bổ Quá Thế (Ohmic, OER, HER)
                </h4>
                <div className="text-xs font-bold text-teal-300 font-mono">
                  {currentPoint.currentDensityAcm2} A/cm² ➔ {currentPoint.cellVoltageVolts} V
                </div>
              </div>

              <svg viewBox="0 0 540 280" className="w-full max-w-xl h-auto select-none">
                {/* Axis lines */}
                <line x1="50" y1="240" x2="500" y2="240" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Grid */}
                {[0.5, 1.0, 1.5, 2.0].map(j => {
                  const x = 50 + (j / 2.0) * 440;
                  return (
                    <g key={j}>
                      <line x1={x} y1="30" x2={x} y2="240" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                      <text x={x} y="255" fill="#64748b" fontSize="9" textAnchor="middle">{j} A/cm²</text>
                    </g>
                  );
                })}

                <text x="275" y="272" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Mật Độ Dòng Điện Phân J (A/cm²)</text>
                <text x="20" y="130" fill="#14b8a6" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">Điện Áp Tế Bào V_cell (Volts)</text>

                {/* Reversible voltage dashed line (~1.23 V) */}
                {(() => {
                  const minV = 1.0;
                  const maxV = 2.4;
                  const vRevY = 240 - ((1.23 - minV) / (maxV - minV)) * 200;

                  return (
                    <g>
                      <line x1="50" y1={vRevY} x2="500" y2={vRevY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="495" y={vRevY - 5} fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="end">
                        E_rev = 1.23 V (Thế nhiệt động thuận nghịch)
                      </text>
                    </g>
                  );
                })()}

                {/* Plot curve */}
                {(() => {
                  const minV = 1.0;
                  const maxV = 2.4;

                  const pathD = polPoints.map((pt, idx) => {
                    const x = 50 + (pt.currentDensityAcm2 / 2.0) * 440;
                    const y = 240 - ((pt.cellVoltageVolts - minV) / (maxV - minV)) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const curX = 50 + (currentPoint.currentDensityAcm2 / 2.0) * 440;
                  const curY = 240 - ((currentPoint.cellVoltageVolts - minV) / (maxV - minV)) * 200;

                  return (
                    <g>
                      <path d={pathD} fill="none" stroke="#14b8a6" strokeWidth="3" />
                      <circle cx={curX} cy={curY} r="6" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" />
                      <text x={curX} y={curY - 10} fill="#5eead4" fontSize="9" fontWeight="bold" textAnchor="middle">
                        V = {currentPoint.cellVoltageVolts} V ({currentPoint.currentDensityAcm2} A/cm²)
                      </text>
                    </g>
                  );
                })()}

                <text x="45" y="240" fill="#64748b" fontSize="9" textAnchor="end">1.0V</text>
                <text x="45" y="40" fill="#64748b" fontSize="9" textAnchor="end">2.4V</text>
              </svg>

              {/* Sliders for Temp and Pressure */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-obsidian-border">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory">Nhiệt Độ Vận Hành:</span>
                    <span className="font-mono font-bold text-amber-300">{operatingTempC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="80"
                    step="5"
                    value={operatingTempC}
                    onChange={e => setOperatingTempC(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory">Áp Suất Đầu Ra Hydro:</span>
                    <span className="font-mono font-bold text-cyan-300">{pressureBar} bar</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={pressureBar}
                    onChange={e => setPressureBar(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Overpotentials Partitioning */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-teal-400" />
                  Phân Rã Quá Thế Tại {currentPoint.currentDensityAcm2} A/cm²
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Điện áp tổng V_cell:</span>
                    <span className="font-mono font-bold text-teal-300">{currentPoint.cellVoltageVolts} V</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Quá thế điện trở Ohmic:</span>
                    <span className="font-mono font-bold text-amber-300">{(currentPoint.ohmicOverpotentialVolts * 1000).toFixed(0)} mV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Quá thế OER Anode (NiFe-LDH):</span>
                    <span className="font-mono font-bold text-emerald-300">{(currentPoint.anodeOerOverpotentialVolts * 1000).toFixed(0)} mV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Quá thế HER Cathode (NiMo):</span>
                    <span className="font-mono font-bold text-cyan-300">{(currentPoint.cathodeHerOverpotentialVolts * 1000).toFixed(0)} mV</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Mật độ công suất tiêu thụ:</span>
                    <span className="font-mono font-bold text-white">{currentPoint.powerDensityWcm2} W/cm²</span>
                  </div>
                </div>

                <div className="bg-obsidian-elevated/70 p-3 rounded-lg border border-obsidian-border text-xs leading-relaxed space-y-1">
                  <div className="font-bold text-white">Hiệu năng xúc tác NiFe-LDH:</div>
                  <p className="text-ivory-muted text-[11px]">
                    Cấu trúc 2D của NiFe-LDH tạo các tâm hoạt hóa kim loại chuyển tiếp hóa trị hỗn hợp (Ni³⁺/Fe³⁺), đẩy tốc độ giải phóng oxy (OER) vượt trội hơn cả IrO₂ trong môi trường kiềm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TERAWATT SCALING AND LCOH ECONOMICS */}
      {activeTab === 'TERAWATT_SCALING_AND_LCOH' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LCOH Economics Dashboard */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-5 rounded-xl border border-obsidian-border space-y-4">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Mô Hình Kinh Tế Hydro Xanh: Chi Phí Quy Dẫn LCOH & Khả Năng Mở Rộng Terawatt
              </h4>

              {/* LCOH Price Banner */}
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-ivory-muted">Chi Phí Quy Dẫn Hydro Xanh (LCOH):</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                    ${performance.levelizedCostOfHydrogenUsdPerKg} / kg H₂
                  </div>
                  <div className="text-xs text-teal-300 mt-1 font-bold">
                    Cạnh tranh trực tiếp với Hydro xám từ khí tự nhiên ($1.50 - $2.00/kg)
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-ivory-muted">Tiêu Hao Điện Năng Riêng:</div>
                  <div className="text-2xl font-black text-cyan-300 font-mono mt-0.5">
                    {performance.specificEnergyConsumptionKwhPerKg} kWh / kg H₂
                  </div>
                  <div className="text-[10px] text-ivory-muted">{performance.specificEnergyConsumptionKwhPerNm3} kWh / Nm³ H₂</div>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-obsidian-card p-3 rounded-lg border border-cyan-500/30 text-center">
                  <div className="text-[10px] text-cyan-300 font-bold uppercase">Sản Lượng Hydro Khối Lượng</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{performance.h2ProductionRateKgPerHour}</div>
                  <div className="text-[10px] text-ivory-muted">kg H₂ / giờ</div>
                </div>

                <div className="bg-obsidian-card p-3 rounded-lg border border-teal-500/30 text-center">
                  <div className="text-[10px] text-teal-300 font-bold uppercase">Sản Lượng Thể Tích Chuẩn</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{performance.h2ProductionRateNm3PerHour}</div>
                  <div className="text-[10px] text-ivory-muted">Nm³ H₂ / giờ</div>
                </div>

                <div className="bg-obsidian-card p-3 rounded-lg border border-emerald-500/30 text-center">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase">Khí Oxy Thu Hồi Kèm Theo</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{performance.o2ProductionRateNm3PerHour}</div>
                  <div className="text-[10px] text-ivory-muted">Nm³ O₂ / giờ</div>
                </div>
              </div>

              {/* Scalability Verdict Banner */}
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 space-y-1.5">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Đánh Giá Tiềm Năng Mở Rộng Terawatt (TW-Scale Assessment):
                </div>
                <p className="text-ivory text-xs leading-relaxed">
                  {performance.terawattScalabilityBottleneckVerdict}
                </p>
              </div>
            </div>

            {/* Economic Controls Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Biến Số Đầu Vào Chi Phí
                </h4>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory">Giá Điện Năng Tái Tạo:</span>
                    <span className="font-mono font-bold text-emerald-400">${electricityPriceUsd.toFixed(3)} / kWh</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.08"
                    step="0.005"
                    value={electricityPriceUsd}
                    onChange={e => setElectricityPriceUsd(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory">Quy Mô Diện Tích Stack:</span>
                    <span className="font-mono font-bold text-cyan-300">{stackAreaM2} m²</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="30.0"
                    step="1.0"
                    value={stackAreaM2}
                    onChange={e => setStackAreaM2(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2 text-xs pt-1">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Suất đầu tư tháp (CAPEX):</span>
                    <span className="font-mono font-bold text-teal-300">${selectedSpec.stackCostUsdPerKw} / kW</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Áp suất hydro trực tiếp:</span>
                    <span className="font-mono font-bold text-white">{pressureBar} bar (Không cần máy nén)</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Tiêu hao Iridium:</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedSpec.iridiumLoadingGramsPerKw} g / kW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
