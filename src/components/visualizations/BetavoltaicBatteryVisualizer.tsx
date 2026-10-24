// src/components/visualizations/BetavoltaicBatteryVisualizer.tsx
// Interactive Visualizer: Betavoltaic Nuclear Batteries, Radioisotope Kinetics & Wide-Bandgap Semiconductor Transducers
// Standards: IUPAC Nuclear Chemistry, IEC / IAEA Radiation Safety & Vietnam GDPT 2018 (Vật lí & Hóa học 10/12: Phóng xạ, Bán dẫn & Năng lượng vĩnh cửu)

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
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Flame,
  ShieldAlert,
  BatteryCharging
} from 'lucide-react';
import {
  RADIOISOTOPES_CATALOG,
  SEMICONDUCTORS_CATALOG,
  simulateRadioactiveDecay,
  simulateBetavoltaicIVCurve,
  simulateLongevityCurve,
  RadioisotopeId,
  SemiconductorId
} from '../../domain/betavoltaicNuclearBatteryEngine';
import { sound } from '../../audio/soundEngine';

type BetavoltaicTabMode = 'BETAVOLTAIC_JUNCTION_CROSS_SECTION' | 'IV_POLARIZATION_CURVE' | 'CENTURY_LONGEVITY_VS_CHEMICAL';

export const BetavoltaicBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BetavoltaicTabMode>('BETAVOLTAIC_JUNCTION_CROSS_SECTION');

  // Selections
  const [selectedIsotopeId, setSelectedIsotopeId] = useState<RadioisotopeId>('NICKEL_63');
  const [selectedSemiconductorId, setSelectedSemiconductorId] = useState<SemiconductorId>('DIAMOND');

  // Sliders
  const [activityCurie, setActivityCurie] = useState<number>(2.0);
  const [deviceAreaCm2, setDeviceAreaCm2] = useState<number>(1.0);
  const [timelineYears, setTimelineYears] = useState<number>(20);

  const selectedIsotope = useMemo(() => {
    return RADIOISOTOPES_CATALOG.find(i => i.id === selectedIsotopeId) || RADIOISOTOPES_CATALOG[0];
  }, [selectedIsotopeId]);

  const selectedSemiconductor = useMemo(() => {
    return SEMICONDUCTORS_CATALOG.find(s => s.id === selectedSemiconductorId) || SEMICONDUCTORS_CATALOG[0];
  }, [selectedSemiconductorId]);

  // IV Simulation
  const { ivPoints, systemResult } = useMemo(() => {
    return simulateBetavoltaicIVCurve(selectedIsotopeId, selectedSemiconductorId, activityCurie, deviceAreaCm2);
  }, [selectedIsotopeId, selectedSemiconductorId, activityCurie, deviceAreaCm2]);

  // Multi-decade longevity
  const longevityPoints = useMemo(() => {
    return simulateLongevityCurve(selectedIsotopeId, selectedSemiconductorId, activityCurie, 100);
  }, [selectedIsotopeId, selectedSemiconductorId, activityCurie]);

  // Current timeline point
  const currentTimelineDecay = useMemo(() => {
    return simulateRadioactiveDecay(selectedIsotopeId, activityCurie, timelineYears);
  }, [selectedIsotopeId, activityCurie, timelineYears]);

  // Max power point
  const peakPowerPoint = useMemo(() => {
    return ivPoints.reduce((prev, curr) => 
      curr.powerDensityMicroWattPerCm2 > prev.powerDensityMicroWattPerCm2 ? curr : prev,
      ivPoints[0]
    );
  }, [ivPoints]);

  return (
    <div className="bg-obsidian-card border border-emerald-900/40 rounded-2xl p-6 shadow-2xl text-ivory space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
              CÔNG NGHỆ NĂNG LƯỢNG HẠT NHÂN THẾ HỆ MỚI
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-spin" /> Betavoltaics
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-2">
            Pin Hạt Nhân Betavoltaic & Bán Dẫn Kim Cương C-14
          </h2>
          <p className="text-xs text-ivory-muted max-w-2xl mt-0.5">
            Mô phỏng hiệu ứng biến đổi trực tiếp chùm electron phát xạ beta (β⁻) thành điện năng thông qua lớp chuyển tiếp p-n bán dẫn vùng cấm rộng (Kim Cương & SiC) với tuổi thọ từ 50 đến hơn 5,000 năm.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-obsidian-elevated/70 p-1.5 rounded-xl border border-obsidian-border gap-1 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('BETAVOLTAIC_JUNCTION_CROSS_SECTION');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'BETAVOLTAIC_JUNCTION_CROSS_SECTION'
                ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-1 ring-emerald-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Mặt Cắt p-n & Bức Xạ β</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('IV_POLARIZATION_CURVE');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'IV_POLARIZATION_CURVE'
                ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-1 ring-emerald-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Đường Đặc Tính I-V & Công Suất</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CENTURY_LONGEVITY_VS_CHEMICAL');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CENTURY_LONGEVITY_VS_CHEMICAL'
                ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-1 ring-emerald-300'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tuổi Thọ 100 Năm vs Hóa Học</span>
          </button>
        </div>
      </div>

      {/* ISOTOPE & SEMICONDUCTOR SELECTOR ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-obsidian-elevated/40 p-4 rounded-xl border border-obsidian-border">
        {/* Radioisotope selection */}
        <div>
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            1. Chọn Đồng Vị Phóng Xạ Phát Hạt Beta (β⁻ Source):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {RADIOISOTOPES_CATALOG.map(iso => (
              <button
                key={iso.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedIsotopeId(iso.id);
                }}
                className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                  selectedIsotopeId === iso.id
                    ? 'bg-amber-950/70 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                    : 'bg-obsidian-card border-obsidian-border text-ivory-muted hover:border-ivory-muted'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{iso.chemicalSymbol}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-obsidian text-amber-300 font-mono">
                    t½: {iso.halfLifeYears >= 1000 ? `${(iso.halfLifeYears/1000).toFixed(1)}k năm` : `${iso.halfLifeYears} năm`}
                  </span>
                </div>
                <div className="text-[10px] text-ivory-muted truncate mt-1">
                  E_avg: {iso.averageBetaEnergyKev} keV
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Semiconductor transducer selection */}
        <div>
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            2. Chọn Bán Dẫn Vùng Cấm Rộng Chuyển Hóa (Transducer):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SEMICONDUCTORS_CATALOG.map(semi => (
              <button
                key={semi.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedSemiconductorId(semi.id);
                }}
                className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                  selectedSemiconductorId === semi.id
                    ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-obsidian-card border-obsidian-border text-ivory-muted hover:border-ivory-muted'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span className="truncate">{semi.name.split(' ')[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-obsidian text-emerald-300 font-mono">
                    Eg: {semi.bandgapEv} eV
                  </span>
                </div>
                <div className="text-[10px] text-ivory-muted truncate mt-1">
                  Độ bền: {semi.radiationToleranceYears} năm
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: BETAVOLTAIC JUNCTION CROSS-SECTION */}
      {activeTab === 'BETAVOLTAIC_JUNCTION_CROSS_SECTION' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualizer SVG Canvas */}
            <div className="lg:col-span-7 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider mb-2 flex items-center gap-2 self-start">
                <Layers className="w-4 h-4 text-emerald-400" />
                Mô Hình Vi Cấu Trúc Lớp Chuyển Tiếp p-n Bán Dẫn Dưới Chùm Beta (β⁻)
              </h4>

              <svg viewBox="0 0 540 320" className="w-full max-w-lg h-auto select-none">
                {/* Background Grid */}
                <defs>
                  <linearGradient id="isotopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="pTypeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="depletionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#065f46" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#022c22" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="nTypeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* External Shielding Frame */}
                <rect x="20" y="20" width="500" height="280" rx="14" fill="#0b0f17" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />
                <text x="35" y="42" fill="#10b981" fontSize="10" fontWeight="bold">VỎ BỌC KIM CƯƠNG / TITAN KHÔNG PHÓNG XẠ (100% CẢN TIA BETA & KHÔNG TIA GAMMA)</text>

                {/* 1. TOP RADIOISOTOPE LAYER */}
                <rect x="40" y="55" width="460" height="40" rx="6" fill="url(#isotopeGrad)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="270" y="76" fill="#18181b" fontSize="12" fontWeight="900" textAnchor="middle">
                  LỚP ĐỒNG VỊ PHÓNG XẠ: {selectedIsotope.name} ({selectedIsotope.chemicalSymbol})
                </text>
                <text x="270" y="90" fill="#27272a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Phân rã: {selectedIsotope.decayEquation} (Năng lượng trung bình: {selectedIsotope.averageBetaEnergyKev} keV)
                </text>

                {/* Emitted Beta Particles Flow */}
                {Array.from({ length: 8 }).map((_, idx) => (
                  <g key={idx} transform={`translate(${65 + idx * 58}, 98)`}>
                    <line x1="0" y1="0" x2="0" y2="28" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 2" />
                    <circle cx="0" cy="28" r="4" fill="#eab308" />
                    <text x="0" y="20" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">e⁻ (β)</text>
                  </g>
                ))}

                {/* 2. OHMIC TOP CONTACT & P-LAYER */}
                <rect x="40" y="130" width="460" height="35" rx="4" fill="url(#pTypeGrad)" stroke="#10b981" strokeWidth="1" />
                <text x="55" y="152" fill="#ecfdf5" fontSize="11" fontWeight="bold">Lớp Bán Dẫn Loại p ({selectedSemiconductor.name.split(' ')[0]})</text>
                <text x="440" y="152" fill="#a7f3d0" fontSize="10" className="font-mono" textAnchor="end">Lỗ trống (h⁺) tự do</text>

                {/* 3. DEPLETION LAYER (SPACE CHARGE REGION) */}
                <rect x="40" y="165" width="460" height="45" rx="2" fill="url(#depletionGrad)" stroke="#34d399" strokeWidth="1.5" />
                <text x="270" y="185" fill="#34d399" fontSize="11" fontWeight="900" textAnchor="middle">
                  VÙNG NGHÈO (DEPLETION REGION) & ĐIỆN TRƯỜNG NỘI TẠI E_bi
                </text>
                <text x="270" y="200" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  Tách tức thì cặp Electron-Lỗ trống (EHP) sinh ra từ va chạm ion hóa hạt beta
                </text>

                {/* Direction arrow of E_bi */}
                <line x1="120" y1="190" x2="160" y2="190" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="380" y1="190" x2="420" y2="190" stroke="#f59e0b" strokeWidth="2" />

                {/* 4. N-LAYER */}
                <rect x="40" y="210" width="460" height="35" rx="4" fill="url(#nTypeGrad)" stroke="#38bdf8" strokeWidth="1" />
                <text x="55" y="232" fill="#f0f9ff" fontSize="11" fontWeight="bold">Lớp Bán Dẫn Loại n ({selectedSemiconductor.name.split(' ')[0]})</text>
                <text x="440" y="232" fill="#bae6fd" fontSize="10" textAnchor="end">Điện tử (e⁻) đa số</text>

                {/* 5. BOTTOM SUBSTRATE & ELECTRODE */}
                <rect x="40" y="245" width="460" height="15" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                <text x="270" y="256" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">CỰC TIẾP XÚC OHMIC ĐÁY (ANODE DƯƠNG)</text>

                {/* External Circuit Loop */}
                <path d="M 40 148 H 25 V 275 H 230" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 500 252 H 515 V 275 H 310" fill="none" stroke="#38bdf8" strokeWidth="2" />

                {/* Load Symbol */}
                <rect x="230" y="265" width="80" height="20" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
                <text x="270" y="279" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">TẢI TIÊU THỤ (Load)</text>
              </svg>

              <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-obsidian-border text-center text-xs">
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Điện áp mạch hở (Voc)</div>
                  <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{systemResult.openCircuitVoltageVolts} V</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Dòng ngắn mạch (Isc)</div>
                  <div className="text-sm font-black text-amber-400 font-mono mt-0.5">{systemResult.shortCircuitCurrentMicroAmp} µA</div>
                </div>
                <div className="bg-obsidian-card p-2 rounded-lg border border-obsidian-border">
                  <div className="text-[10px] text-ivory-muted">Hiệu suất chuyển hóa (η)</div>
                  <div className="text-sm font-black text-teal-300 font-mono mt-0.5">{systemResult.electricalConversionEfficiencyPercent}%</div>
                </div>
              </div>
            </div>

            {/* Scientific Analysis Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Đặc Tính Vật Lí & Cơ Chế Chuyển Hóa
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Năng lượng sinh cặp EHP (ε):</span>
                    <span className="font-mono font-bold text-white">{selectedSemiconductor.electronHolePairCreationEnergyEv} eV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Vùng cấm bán dẫn (Eg):</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedSemiconductor.bandgapEv} eV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Ngưỡng phá hủy bức xạ:</span>
                    <span className="font-mono font-bold text-amber-300">{selectedSemiconductor.radiationDamageThresholdEv} eV</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Hạt nhân con sau phân rã:</span>
                    <span className="font-bold text-teal-200">{selectedIsotope.daughterNuclide}</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Yêu cầu chắn xạ:</span>
                    <span className="font-bold text-emerald-300">{selectedIsotope.shieldingRequirement}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                  <span className="font-bold">Độ an toàn sinh học: </span>
                  {selectedIsotope.isPureBetaEmitter
                    ? 'Đồng vị phát xạ beta thuần (Pure Beta), không phát tia gamma đâm xuyên. Toàn bộ electron có quãng chạy < 50 µm trong chất rắn, bị triệt tiêu hoàn toàn ngay bên trong vỏ pin kim cương/titan.'
                    : 'Phát xạ có kèm theo bức xạ hãm (Bremsstrahlung) thứ cấp. Cần lớp vỏ hợp kim nặng tungsten/chì mỏng để đạt tiêu chuẩn an toàn y tế và cấy ghép sinh học.'}
                </div>
              </div>

              {/* Slider for Activity */}
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ivory">Hoạt Độ Phóng Xạ Khởi Tạo:</span>
                  <span className="font-mono font-black text-amber-300 text-sm">{activityCurie} Curie ({(activityCurie * 37).toFixed(0)} GBq)</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="10.0"
                  step="0.2"
                  value={activityCurie}
                  onChange={e => {
                    setActivityCurie(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="font-bold text-ivory">Diện Tích Tiếp Xúc Chip:</span>
                  <span className="font-mono font-black text-emerald-300 text-sm">{deviceAreaCm2} cm²</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.2"
                  value={deviceAreaCm2}
                  onChange={e => {
                    setDeviceAreaCm2(parseFloat(e.target.value));
                  }}
                  className="w-full accent-emerald-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IV POLARIZATION AND POWER DENSITY */}
      {activeTab === 'IV_POLARIZATION_CURVE' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG Chart */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Đường Cong Đặc Tuyến I-V & Mật Độ Công Suất (Power Curve)
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> Mật độ Dòng (µA/cm²)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <span className="w-3 h-0.5 bg-amber-400 inline-block"></span> Công suất (µW/cm²)
                  </span>
                </div>
              </div>

              <svg viewBox="0 0 540 280" className="w-full max-w-xl h-auto select-none">
                {/* Axis lines */}
                <line x1="50" y1="240" x2="500" y2="240" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Grid horizontal */}
                {[50, 100, 150, 200].map(y => (
                  <line key={y} x1="50" y1={y} x2="500" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                ))}

                {/* Labels */}
                <text x="275" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Điện Áp Cực Tế Bào V_cell (Volts)</text>
                <text x="20" y="130" fill="#10b981" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">J (µA/cm²)</text>
                <text x="525" y="130" fill="#f59e0b" fontSize="10" transform="rotate(90 525 130)" textAnchor="middle" fontWeight="bold">P (µW/cm²)</text>

                {/* Plot Current Density Curve (Green) */}
                {(() => {
                  const maxJ = Math.max(1, ivPoints[0].currentDensityMicroAmpPerCm2 * 1.15);
                  const maxV = Math.max(0.5, systemResult.openCircuitVoltageVolts * 1.05);

                  const pathD = ivPoints.map((pt, idx) => {
                    const x = 50 + (pt.voltageVolts / maxV) * 440;
                    const y = 240 - (pt.currentDensityMicroAmpPerCm2 / maxJ) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  return (
                    <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" />
                  );
                })()}

                {/* Plot Power Density Curve (Amber) */}
                {(() => {
                  const maxP = Math.max(1, peakPowerPoint.powerDensityMicroWattPerCm2 * 1.25);
                  const maxV = Math.max(0.5, systemResult.openCircuitVoltageVolts * 1.05);

                  const pathP = ivPoints.map((pt, idx) => {
                    const x = 50 + (pt.voltageVolts / maxV) * 440;
                    const y = 240 - (pt.powerDensityMicroWattPerCm2 / maxP) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // Peak point coords
                  const peakX = 50 + (peakPowerPoint.voltageVolts / maxV) * 440;
                  const peakY = 240 - (peakPowerPoint.powerDensityMicroWattPerCm2 / maxP) * 200;

                  return (
                    <g>
                      <path d={pathP} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
                      <circle cx={peakX} cy={peakY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      <text x={peakX} y={peakY - 10} fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">
                        P_max: {peakPowerPoint.powerDensityMicroWattPerCm2} µW/cm²
                      </text>
                    </g>
                  );
                })()}

                {/* Axis values */}
                <text x="50" y="255" fill="#64748b" fontSize="9" textAnchor="middle">0 V</text>
                <text x="500" y="255" fill="#64748b" fontSize="9" textAnchor="middle">{systemResult.openCircuitVoltageVolts} V</text>
              </svg>
            </div>

            {/* Metrics Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Chỉ Số Công Suất & Hiệu Suất Cực Đại
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-obsidian-elevated/70 p-3 rounded-lg border border-obsidian-border flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-ivory-muted">Công suất điện cực đại (P_max)</div>
                      <div className="text-base font-black text-amber-300 font-mono mt-0.5">
                        {systemResult.maxElectricalPowerMicroWatt} µW
                      </div>
                    </div>
                    <BatteryCharging className="w-6 h-6 text-amber-400" />
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Điện áp mạch hở (Voc):</span>
                    <span className="font-mono font-bold text-emerald-400">{systemResult.openCircuitVoltageVolts} V</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Dòng ngắn mạch (Isc):</span>
                    <span className="font-mono font-bold text-teal-300">{systemResult.shortCircuitCurrentMicroAmp} µA</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Hệ số lấp đầy (Fill Factor):</span>
                    <span className="font-mono font-bold text-white">{(systemResult.fillFactor * 100).toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Nhiệt lượng phát xạ (P_thermal):</span>
                    <span className="font-mono font-bold text-orange-300">{systemResult.initialThermalPowerMicroWatt} µW</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Hiệu suất chuyển hóa (η):</span>
                    <span className="font-mono font-bold text-emerald-300">{systemResult.electricalConversionEfficiencyPercent}%</span>
                  </div>
                </div>

                <div className="bg-obsidian-elevated/60 p-3 rounded-lg border border-obsidian-border text-xs text-ivory-muted leading-relaxed">
                  <span className="font-bold text-white">Nhận xét vùng cấm: </span>
                  Bán dẫn Kim Cương (Eg = 5.47 eV) và SiC (Eg = 3.26 eV) tạo điện áp mạch hở Voc lên tới trên 2.4V, cao gấp 5 lần so với tấm Silicon thông thường (Voc ~ 0.46V).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CENTURY LONGEVITY NUCLEAR VS CHEMICAL */}
      {activeTab === 'CENTURY_LONGEVITY_VS_CHEMICAL' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Longevity Timeline SVG */}
            <div className="lg:col-span-8 bg-obsidian-elevated/50 p-4 rounded-xl border border-obsidian-border flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Biểu Đồ Suy Giảm Công Suất Qua 100 Năm: Betavoltaic vs Pin Hóa Học (Li-ion)
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> Pin Hạt Nhân ({selectedIsotope.chemicalSymbol})
                  </span>
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <span className="w-3 h-0.5 bg-rose-400 inline-block"></span> Pin Li-ion Hóa Học (Chết sau 10-15 năm)
                  </span>
                </div>
              </div>

              <svg viewBox="0 0 540 280" className="w-full max-w-xl h-auto select-none">
                {/* Axis lines */}
                <line x1="50" y1="240" x2="500" y2="240" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map(yr => {
                  const x = 50 + (yr / 100) * 440;
                  return (
                    <g key={yr}>
                      <line x1={x} y1="30" x2={x} y2="240" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                      <text x={x} y="255" fill="#64748b" fontSize="9" textAnchor="middle">{yr} năm</text>
                    </g>
                  );
                })}

                <text x="275" y="272" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Thời Gian Vận Hành Trôi Qua (Năm)</text>
                <text x="20" y="130" fill="#10b981" fontSize="10" transform="rotate(-90 20 130)" textAnchor="middle" fontWeight="bold">Công Suất P (µW)</text>

                {/* Max power scale */}
                {(() => {
                  const maxP = Math.max(1, longevityPoints[0].electricalPowerMicroWatt * 1.1);

                  // 1. Nuclear curve (Green)
                  const pathNuclear = longevityPoints.map((pt, idx) => {
                    const x = 50 + (pt.years / 100) * 440;
                    const y = 240 - (pt.electricalPowerMicroWatt / maxP) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // 2. Chemical Li-ion curve (Red)
                  const pathChemical = longevityPoints.map((pt, idx) => {
                    const x = 50 + (pt.years / 100) * 440;
                    const y = 240 - (pt.chemicalLiIonBaselineMicroWatt / maxP) * 200;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // Highlight timeline point
                  const currentTimelineX = 50 + (timelineYears / 100) * 440;

                  return (
                    <g>
                      <path d={pathNuclear} fill="none" stroke="#10b981" strokeWidth="3" />
                      <path d={pathChemical} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Current timeline vertical marker */}
                      <line x1={currentTimelineX} y1="30" x2={currentTimelineX} y2="240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx={currentTimelineX} cy={240 - ((longevityPoints.find(p => p.years === timelineYears)?.electricalPowerMicroWatt || 0) / maxP) * 200} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>

              {/* Slider for Timeline Year */}
              <div className="w-full bg-obsidian-card p-3 rounded-xl border border-obsidian-border mt-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ivory flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Dòng Thời Gian Vận Hành:
                  </span>
                  <span className="font-mono font-black text-amber-300 text-sm">Năm thứ {timelineYears}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={timelineYears}
                  onChange={e => {
                    setTimelineYears(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-amber-400 bg-obsidian-border h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Milestone & Mission Log */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-obsidian-card p-4 rounded-xl border border-obsidian-border space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Trạng Thái Năm Thứ {timelineYears}
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Hoạt độ còn lại:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {currentTimelineDecay.remainingActivityCi.toFixed(3)} Ci ({(currentTimelineDecay.activityRetentionRatio * 100).toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Công suất hạt nhân:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {(longevityPoints.find(p => p.years === timelineYears)?.electricalPowerMicroWatt || 0).toFixed(2)} µW
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-obsidian-border/50 pb-1.5">
                    <span className="text-ivory-muted">Công suất pin hóa học:</span>
                    <span className="font-mono font-bold text-rose-400">
                      {(longevityPoints.find(p => p.years === timelineYears)?.chemicalLiIonBaselineMicroWatt || 0).toFixed(2)} µW
                    </span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-ivory-muted">Số mol sản phẩm con:</span>
                    <span className="font-mono font-bold text-teal-300">
                      {currentTimelineDecay.daughterMolesAccumulated.toExponential(3)} mol
                    </span>
                  </div>
                </div>

                <div className="bg-obsidian-elevated/70 p-3 rounded-lg border border-obsidian-border text-xs leading-relaxed space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ứng Dụng Độc Quyền:
                  </div>
                  <p className="text-ivory-muted text-[11px]">
                    {selectedIsotope.idealApplication}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
