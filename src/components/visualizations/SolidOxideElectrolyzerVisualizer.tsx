// src/components/visualizations/SolidOxideElectrolyzerVisualizer.tsx
// Interactive Visualizer: Solid Oxide Electrolyzer Cells (SOEC), High-Temp H2O/CO2 Co-Electrolysis & Power-to-X Syngas
// Standards: IUPAC Electrochemistry, IEA Power-to-X & Vietnam GDPT 2018 (Hóa học 10 & 12: Điện phân nhiệt độ cao & Tổng hợp Fischer-Tropsch)

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
  Flame,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Wind,
  Droplets,
  Plane,
  Factory
} from 'lucide-react';
import {
  SOEC_STANDARD_MATERIALS,
  calculateWaterThermodynamics,
  simulateSOECPolarization,
  simulateSOECCoElectrolysis
} from '../../domain/solidOxideElectrolyzerEngine';
import { sound } from '../../audio/soundEngine';

type SOECTabMode = 'CELL_CROSS_SECTION_O2_HOPPING' | 'THERMODYNAMICS_AND_OVERPOTENTIALS' | 'CO_ELECTROLYSIS_POWER_TO_X';

export const SolidOxideElectrolyzerVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SOECTabMode>('CELL_CROSS_SECTION_O2_HOPPING');

  // Sliders
  const [operatingTempC, setOperatingTempC] = useState<number>(800);
  const [pressureBar, setPressureBar] = useState<number>(1.0);
  const [steamFractionPercent, setSteamFractionPercent] = useState<number>(67); // 67% H2O, 33% CO2 -> 2:1 ratio
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(1.0);
  const [stackAreaM2, setStackAreaM2] = useState<number>(10.0);

  // Thermodynamics
  const thermo = useMemo(() => {
    return calculateWaterThermodynamics(operatingTempC);
  }, [operatingTempC]);

  // Polarization points
  const polPoints = useMemo(() => {
    return simulateSOECPolarization(operatingTempC, pressureBar, steamFractionPercent / 100);
  }, [operatingTempC, pressureBar, steamFractionPercent]);

  // Co-electrolysis performance result
  const coElecResult = useMemo(() => {
    return simulateSOECCoElectrolysis(operatingTempC, pressureBar, steamFractionPercent, currentDensityAcm2, stackAreaM2);
  }, [operatingTempC, pressureBar, steamFractionPercent, currentDensityAcm2, stackAreaM2]);

  // Current operating point on polarization curve
  const currentPoint = useMemo(() => {
    return polPoints.reduce((prev, curr) => 
      Math.abs(curr.currentDensityAcm2 - currentDensityAcm2) < Math.abs(prev.currentDensityAcm2 - currentDensityAcm2) ? curr : prev,
      polPoints[0]
    );
  }, [polPoints, currentDensityAcm2]);

  return (
    <div className="bg-obsidian-card border border-rose-900/40 rounded-2xl p-6 shadow-2xl text-ivory space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-500/40">
              ĐỒNG ĐIỆN PHÂN NHIỆT ĐỘ CAO (700°C - 850°C)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              <Factory className="w-3 h-3 text-cyan-300" /> Power-to-X Green Syngas
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2">
            Tế Bào Điện Phân Oxit Rắn (SOEC) & Khí Tổng Hợp e-Kerosene
          </h2>
          <p className="text-xs text-ivory-muted max-w-2xl mt-0.5">
            Mô phỏng đồng điện phân H₂O và CO₂ thành khí tổng hợp Syngas (H₂ + CO) ở 800°C qua màng gốm 8YSZ dẫn ion O²⁻, tận dụng nhiệt công nghiệp đạt hiệu suất điện cực đại &gt; 90% LHV.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-obsidian-elevated/70 p-1.5 rounded-xl border border-obsidian-border gap-1 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CELL_CROSS_SECTION_O2_HOPPING');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CELL_CROSS_SECTION_O2_HOPPING'
                ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-1 ring-rose-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mặt Cắt Màng & Dẫn Ion O²⁻</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('THERMODYNAMICS_AND_OVERPOTENTIALS');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'THERMODYNAMICS_AND_OVERPOTENTIALS'
                ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-1 ring-rose-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Nhiệt Động Học & Thế Trung Hòa V_tn</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CO_ELECTROLYSIS_POWER_TO_X');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CO_ELECTROLYSIS_POWER_TO_X'
                ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-1 ring-rose-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Tổng Hợp Syngas e-Kerosene</span>
          </button>
        </div>
      </div>

      {/* GLOBAL SLIDERS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-obsidian-elevated/40 p-4 rounded-xl border border-obsidian-border">
        {/* Temperature */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-ivory flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Nhiệt Độ Vận Hành (SOEC):
            </span>
            <span className="font-mono font-bold text-rose-300">{operatingTempC}°C</span>
          </div>
          <input
            type="range"
            min="700"
            max="850"
            step="10"
            value={operatingTempC}
            onChange={e => setOperatingTempC(parseInt(e.target.value, 10))}
            className="w-full accent-rose-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted mt-1">
            <span>700°C (ASR cao hơn)</span>
            <span>850°C (Độ dẫn O²⁻ tối ưu)</span>
          </div>
        </div>

        {/* Current Density */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-ivory flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Mật Độ Dòng Điện Phân:
            </span>
            <span className="font-mono font-bold text-amber-300">{currentDensityAcm2.toFixed(2)} A/cm²</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.05"
            value={currentDensityAcm2}
            onChange={e => setCurrentDensityAcm2(parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted mt-1">
            <span>0.2 A/cm² (Hồi nhiệt)</span>
            <span>2.0 A/cm² (Sản lượng cao)</span>
          </div>
        </div>

        {/* Steam / CO2 Ratio */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-ivory flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Tỷ Lệ Nạp Hơi Nước / CO₂:
            </span>
            <span className="font-mono font-bold text-cyan-300">{steamFractionPercent}% H₂O / {100 - steamFractionPercent}% CO₂</span>
          </div>
          <input
            type="range"
            min="20"
            max="90"
            step="1"
            value={steamFractionPercent}
            onChange={e => setSteamFractionPercent(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted mt-1">
            <span>Giàu CO (Hóa chất)</span>
            <span>67% (e-Kerosene 2:1)</span>
            <span>Giàu H₂ (SNG)</span>
          </div>
        </div>
      </div>

      {/* TAB 1: CELL CROSS SECTION & O2- TRANSPORT */}
      {activeTab === 'CELL_CROSS_SECTION_O2_HOPPING' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG Cross-Section */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider mb-2 flex items-center gap-2 self-start">
                <Layers className="w-4 h-4 text-rose-400" />
                Mặt Cắt Cấu Trúc Vi Mô Tế Bào Oxit Rắn (Cathode Ni-YSZ | Màng 8YSZ | Anode LSCF)
              </h4>

              <svg viewBox="0 0 540 320" className="w-full max-w-xl h-auto select-none">
                <defs>
                  <linearGradient id="cathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="electrolyteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>
                </defs>

                {/* 1. Cathode Chamber (Left): Fuel Electrode */}
                <rect x="30" y="40" width="140" height="240" rx="8" fill="url(#cathodeGrad)" stroke="#64748b" strokeWidth="2" />
                <text x="100" y="65" fill="#f8fafc" fontSize="11" fontWeight="900" textAnchor="middle">CATHODE XỐP (ÂM)</text>
                <text x="100" y="80" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">Ni-YSZ Cermet Xúc Tác</text>

                {/* Reactant feeds entering cathode */}
                <path d="M 10 110 H 30" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="5" y="105" fill="#38bdf8" fontSize="9" fontWeight="bold">H₂O (hơi) + CO₂</text>

                {/* Reactions at cathode boundary */}
                <g transform="translate(40, 130)">
                  <text x="0" y="0" fill="#e2e8f0" fontSize="9" fontWeight="bold">H₂O + 2e⁻ ➔ H₂ + O²⁻</text>
                  <text x="0" y="20" fill="#e2e8f0" fontSize="9" fontWeight="bold">CO₂ + 2e⁻ ➔ CO + O²⁻</text>
                  <text x="0" y="40" fill="#fde047" fontSize="8" fontWeight="bold">Cân bằng RWGS: CO₂+H₂⇌CO+H₂O</text>
                </g>

                {/* Syngas exit from cathode */}
                <path d="M 30 220 H 10" stroke="#10b981" strokeWidth="3" />
                <text x="5" y="235" fill="#10b981" fontSize="9" fontWeight="bold">Syngas: H₂ + CO</text>

                {/* 2. Solid Oxide Electrolyte (Middle): 8YSZ */}
                <rect x="200" y="40" width="140" height="240" rx="4" fill="url(#electrolyteGrad)" stroke="#38bdf8" strokeWidth="2" />
                <text x="270" y="65" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">MÀNG GỐM 8YSZ</text>
                <text x="270" y="80" fill="#bae6fd" fontSize="9" textAnchor="middle">Dẫn Ion O²⁻ (800°C)</text>

                {/* Oxygen vacancy hopping animation arrows */}
                {[110, 150, 190, 230].map(y => (
                  <g key={y} transform={`translate(220, ${y})`}>
                    <line x1="0" y1="0" x2="100" y2="0" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="50" cy="0" r="7" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
                    <text x="50" y="3" fill="#18181b" fontSize="8" fontWeight="bold" textAnchor="middle">O²⁻</text>
                  </g>
                ))}

                {/* 3. Anode Chamber (Right): Oxygen Electrode */}
                <rect x="370" y="40" width="140" height="240" rx="8" fill="url(#anodeGrad)" stroke="#f43f5e" strokeWidth="2" />
                <text x="440" y="65" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">ANODE OXY (DƯƠNG)</text>
                <text x="440" y="80" fill="#fecdd3" fontSize="9" fontWeight="bold" textAnchor="middle">LSCF + Lớp Ngăn GDC</text>

                {/* Anode reaction */}
                <g transform="translate(380, 140)">
                  <text x="0" y="0" fill="#ffffff" fontSize="10" fontWeight="bold">2O²⁻ ➔ O₂ + 4e⁻</text>
                  <text x="0" y="20" fill="#ffe4e6" fontSize="8">Tạo khí Oxy tinh khiết 100%</text>
                </g>

                {/* Oxygen exit */}
                <path d="M 510 170 H 530" stroke="#f43f5e" strokeWidth="3" />
                <text x="535" y="174" fill="#f43f5e" fontSize="9" fontWeight="bold">O₂ (khí sạch)</text>

                {/* External Power Source Loop */}
                <path d="M 100 40 V 15 H 240" fill="none" stroke="#64748b" strokeWidth="2" />
                <path d="M 440 40 V 15 H 300" fill="none" stroke="#f43f5e" strokeWidth="2" />

                {/* DC Power Supply Symbol */}
                <rect x="240" y="5" width="60" height="20" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
                <text x="270" y="18" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">NGUỒN DC</text>
              </svg>

              <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-obsidian-border text-center text-xs">
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Điện áp vận hành V_cell</div>
                  <div className="text-sm font-black text-rose-400 font-mono mt-0.5">{coElecResult.cellVoltageVolts} V</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Thế thuận nghịch E_rev</div>
                  <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{coElecResult.reversibleVoltageV} V</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Chế độ nhiệt (Thermal Mode)</div>
                  <div className="text-xs font-black text-amber-300 font-mono mt-0.5">{coElecResult.operatingMode}</div>
                </div>
              </div>
            </div>

            {/* Materials & Reaction Parameters */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  Vật Liệu Màng & Xúc Tác Gốm SOEC
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Chất điện phân (Electrolyte):</span>
                    <div className="font-bold text-white mt-0.5">{SOEC_STANDARD_MATERIALS.electrolyte}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Cathode Khí Nhiên Liệu:</span>
                    <div className="font-bold text-cyan-300 mt-0.5">{SOEC_STANDARD_MATERIALS.fuelCathode}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Anode Oxy (Oxygen Electrode):</span>
                    <div className="font-bold text-rose-300 mt-0.5">{SOEC_STANDARD_MATERIALS.oxygenAnode}</div>
                  </div>

                  <div className="border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Lớp đệm ngăn khuếch tán:</span>
                    <div className="font-bold text-emerald-300 mt-0.5">{SOEC_STANDARD_MATERIALS.interlayerBarrier}</div>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Độ dẫn ion O²⁻ ở 800°C:</span>
                    <span className="font-mono font-bold text-amber-300">{SOEC_STANDARD_MATERIALS.ionicConductivitySPerCm} S/cm</span>
                  </div>
                </div>

                <div className="bg-rose-950/40 p-3 rounded-lg border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                  <span className="font-bold">Độ bền chống bám muội than (Coking): </span>
                  {SOEC_STANDARD_MATERIALS.cokingResistanceScore}/10. Tỷ lệ hơi nước $H_2O$ duy trì $\ge 60\%$ ngăn chặn hoàn toàn phản ứng Boudouard ($2CO \to C + CO_2$) gây nghẹt xúc tác Ni.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THERMODYNAMICS & THERMONEUTRAL VOLTAGE */}
      {activeTab === 'THERMODYNAMICS_AND_OVERPOTENTIALS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Polarization Curve SVG */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  Đường Cong Phân Cực Điện Phân SOEC & Vùng Nhiệt Trung Hòa (V_tn)
                </h4>
                <div className="text-xs font-bold text-rose-300 font-mono">
                  ASR: ~0.22 Ω·cm²
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
                <text x="20" y="130" fill="#f43f5e" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">Điện Áp Tế Bào V_cell (Volts)</text>

                {/* Thermoneutral voltage horizontal dashed line (V_tn ~ 1.285 V) */}
                {(() => {
                  const minV = 0.8;
                  const maxV = 2.0;
                  const vTnY = 240 - ((thermo.thermoneutralVoltageV - minV) / (maxV - minV)) * 200;
                  const vRevY = 240 - ((thermo.reversibleVoltageV - minV) / (maxV - minV)) * 200;

                  return (
                    <g>
                      {/* E_rev line */}
                      <line x1="50" y1={vRevY} x2="500" y2={vRevY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="495" y={vRevY - 5} fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="end">
                        E_rev = {thermo.reversibleVoltageV} V (Thế thuận nghịch)
                      </text>

                      {/* V_tn line */}
                      <line x1="50" y1={vTnY} x2="500" y2={vTnY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
                      <text x="495" y={vTnY - 5} fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="end">
                        V_tn = {thermo.thermoneutralVoltageV} V (Thế nhiệt trung hòa)
                      </text>

                      {/* Shaded endothermic zone */}
                      <rect x="50" y={vTnY} width="450" height={vRevY - vTnY} fill="#0284c7" opacity="0.1" />
                      <text x="120" y={(vTnY + vRevY) / 2 + 3} fill="#38bdf8" fontSize="9" fontWeight="bold">
                        Vùng Thu Nhiệt (Endothermic, η &gt; 100%)
                      </text>
                    </g>
                  );
                })()}

                {/* Plot SOEC Polarization curve */}
                {(() => {
                  const minV = 0.8;
                  const maxV = 2.0;

                  const pathD = polPoints.map((pt, idx) => {
                    const x = 50 + (pt.currentDensityAcm2 / 2.0) * 440;
                    const y = 240 - ((pt.cellVoltageVolts - minV) / (maxV - minV)) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const curX = 50 + (currentPoint.currentDensityAcm2 / 2.0) * 440;
                  const curY = 240 - ((currentPoint.cellVoltageVolts - minV) / (maxV - minV)) * 200;

                  return (
                    <g>
                      <path d={pathD} fill="none" stroke="#f43f5e" strokeWidth="3" />
                      <circle cx={curX} cy={curY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                      <text x={curX} y={curY - 10} fill="#fecdd3" fontSize="9" fontWeight="bold" textAnchor="middle">
                        V = {currentPoint.cellVoltageVolts} V ({currentPoint.currentDensityAcm2} A/cm²)
                      </text>
                    </g>
                  );
                })()}

                <text x="45" y="240" fill="#64748b" fontSize="9" textAnchor="end">0.8V</text>
                <text x="45" y="40" fill="#64748b" fontSize="9" textAnchor="end">2.0V</text>
              </svg>
            </div>

            {/* Thermodynamics Analysis */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Cân Bằng Nhiệt Động Học (Enthalpy & Gibbs)
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Tổng Entanpi phân ly (ΔH):</span>
                    <span className="font-mono font-bold text-amber-400">{(thermo.deltaHJoulesPerMol / 1000).toFixed(1)} kJ/mol</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Năng lượng điện cần cấp (ΔG):</span>
                    <span className="font-mono font-bold text-cyan-300">{(thermo.deltaGJoulesPerMol / 1000).toFixed(1)} kJ/mol</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Nhiệt lượng hỗ trợ (T·ΔS):</span>
                    <span className="font-mono font-bold text-rose-400">{(thermo.tDeltaSJoulesPerMol / 1000).toFixed(1)} kJ/mol</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Tỷ lệ nhiệt thay thế điện:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {((thermo.tDeltaSJoulesPerMol / thermo.deltaHJoulesPerMol) * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Thế nhiệt trung hòa (V_tn):</span>
                    <span className="font-mono font-bold text-yellow-300">{thermo.thermoneutralVoltageV} V</span>
                  </div>
                </div>

                <div className="bg-obsidian-elevated/70 p-3 rounded-lg border border-obsidian-border text-xs leading-relaxed space-y-1">
                  <div className="font-bold text-white">Ý nghĩa thế nhiệt trung hòa:</div>
                  <p className="text-ivory-muted text-[11px]">
                    Tại V_cell = V_tn = 1.285 V, nhiệt Joule sinh ra do nội trở tế bào cân bằng chính xác với nhiệt thu vào của phản ứng hóa học (ΔQ = 0). Không cần làm mát và không cần cấp thêm nhiệt phụ trợ!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CO-ELECTROLYSIS POWER-TO-X GREEN SYNGAS */}
      {activeTab === 'CO_ELECTROLYSIS_POWER_TO_X' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Syngas Flow Dashboard */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-5 rounded-xl border border-obsidian-border space-y-4">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Plane className="w-4 h-4 text-cyan-400" />
                Sản Lượng Khí Tổng Hợp Syngas (H₂ + CO) & Nhiên Liệu Hàng Không e-Kerosene
              </h4>

              {/* Syngas H2/CO Ratio Gauge Banner */}
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-ivory-muted">Tỷ Lệ Thành Phần Khí Tổng Hợp:</div>
                  <div className="text-3xl font-black text-cyan-300 font-mono mt-1">
                    H₂ / CO = {coElecResult.syngasH2ToCoRatio}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 font-bold">
                    {coElecResult.downstreamSuitability}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-ivory-muted">Hiệu Suất Điện Năng (LHV):</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                    {coElecResult.electricalEfficiencyLhvPercent}% LHV
                  </div>
                  <div className="text-[10px] text-ivory-muted">Vượt trội hơn PEM (65%) & Kiềm (60%)</div>
                </div>
              </div>

              {/* 3 Gas Production Meters */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-obsidian-card p-3 rounded-lg border border-cyan-500/30 text-center">
                  <div className="text-[10px] text-cyan-300 font-bold uppercase">Khí Hydro (H₂)</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{coElecResult.h2ProductionRateNm3PerHour}</div>
                  <div className="text-[10px] text-ivory-muted">Nm³/h</div>
                </div>

                <div className="bg-obsidian-card p-3 rounded-lg border border-amber-500/30 text-center">
                  <div className="text-[10px] text-amber-300 font-bold uppercase">Cacbon Monoxide (CO)</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{coElecResult.coProductionRateNm3PerHour}</div>
                  <div className="text-[10px] text-ivory-muted">Nm³/h</div>
                </div>

                <div className="bg-obsidian-card p-3 rounded-lg border border-rose-500/30 text-center">
                  <div className="text-[10px] text-rose-300 font-bold uppercase">Khí Oxy Tinh Khiết (O₂)</div>
                  <div className="text-xl font-black text-white font-mono mt-1">{coElecResult.o2ProductionRateNm3PerHour}</div>
                  <div className="text-[10px] text-ivory-muted">Nm³/h (Phụ phẩm y tế)</div>
                </div>
              </div>

              {/* Industrial Application Pipeline Diagram */}
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-emerald-400" />
                  Quy Trình Chuyển Đổi Power-to-Liquid (PtL) Khép Kín:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded bg-obsidian-elevated/60 border border-obsidian-border">
                    <div className="font-bold text-cyan-300">1. Thu Hút Khí Thải:</div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">Thu gom CO₂ từ ống khói nhà máy xi măng/nhiệt điện và nước tinh khiết.</div>
                  </div>
                  <div className="p-2.5 rounded bg-rose-950/40 border border-rose-500/40">
                    <div className="font-bold text-rose-300">2. Đồng Điện Phân SOEC:</div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">Biến trực tiếp CO₂ + H₂O thành Syngas H₂/CO = 2.05 ở 800°C bằng năng lượng tái tạo.</div>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40">
                    <div className="font-bold text-emerald-300">3. Tổng Hợp Fischer-Tropsch:</div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">n CO + (2n+1) H₂ ➔ CₙH₂ₙ₊₂ (e-Kerosene máy bay không phát thải ròng).</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stack Scale Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Quy Mô Module Tháp Điện Phân (Stack)
                </h4>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-ivory">Diện Tích Hoạt Hóa Tháp:</span>
                    <span className="font-mono font-bold text-amber-300">{stackAreaM2} m²</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="50.0"
                    step="1.0"
                    value={stackAreaM2}
                    onChange={e => setStackAreaM2(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2 text-xs pt-1">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Tổng dòng điện phân (I):</span>
                    <span className="font-mono font-bold text-white">{(currentDensityAcm2 * stackAreaM2 * 10).toFixed(0)} kA</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Công suất điện đầu vào:</span>
                    <span className="font-mono font-bold text-rose-400">
                      {((coElecResult.cellVoltageVolts * currentDensityAcm2 * stackAreaM2 * 10000) / 1000).toFixed(1)} kW
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Năng lượng tiêu hao riêng:</span>
                    <span className="font-mono font-bold text-emerald-400">3.12 kWh / Nm³ Syngas</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Độ tinh khiết Oxy thu hồi:</span>
                    <span className="font-mono font-bold text-cyan-300">99.8% O₂</span>
                  </div>
                </div>

                <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                  <span className="font-bold">Đóng góp giảm phát thải ròng (Net-Zero): </span>
                  Mỗi tấn e-Kerosene sản xuất bằng SOEC thu hồi và tái chế trực tiếp 3.16 tấn CO₂ công nghiệp, giảm 90% dấu chân carbon ngành hàng không so với nhiên liệu hóa thạch Jet A-1.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
