// src/components/visualizations/MicrobialFuelCellVisualizer.tsx
// Interactive Visualizer: Bioelectrochemical Microbial Fuel Cells (MFCs) & Extracellular Electron Transfer
// Standards: IUPAC Bioelectrochemistry, QCVN 40:2011/BTNMT & Vietnam GDPT 2018 (Hóa sinh, Năng lượng sinh học & Môi trường)

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Droplets,
  Zap,
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
  Filter,
  Biohazard,
  Atom,
  RefreshCw
} from 'lucide-react';
import {
  EXOELECTROGENS_CATALOG,
  MFC_REACTORS_CATALOG,
  simulateWastewaterMfc,
  generateMfcPolarizationCurve,
  ExoelectrogenSpecies,
  MfcReactorConfiguration
} from '../../domain/microbialFuelCellEngine';
import { sound } from '../../audio/soundEngine';

type MfcTabMode = 'EET_MECHANISMS' | 'WASTEWATER_REMEDIATION' | 'POLARIZATION_CURVES';

export const MicrobialFuelCellVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MfcTabMode>('EET_MECHANISMS');

  // Mode 1: EET State
  const [selectedMicrobeId, setSelectedMicrobeId] = useState<string>('GEOBACTER_SULFURREDUCENS');

  // Mode 2: Wastewater Remediation State
  const [selectedReactorId, setSelectedReactorId] = useState<string>('SINGLE_CHAMBER_AIR_CATHODE');
  const [influentCod, setInfluentCod] = useState<number>(800);
  const [hrtHours, setHrtHours] = useState<number>(24);
  const [externalResistance, setExternalResistance] = useState<number>(100);

  // Selected entities
  const selectedMicrobe = useMemo(() => {
    return EXOELECTROGENS_CATALOG.find(m => m.id === selectedMicrobeId) || EXOELECTROGENS_CATALOG[0];
  }, [selectedMicrobeId]);

  const selectedReactor = useMemo(() => {
    return MFC_REACTORS_CATALOG.find(r => r.id === selectedReactorId) || MFC_REACTORS_CATALOG[0];
  }, [selectedReactorId]);

  // Simulation output for Wastewater Mode
  const remediationResult = useMemo(() => {
    return simulateWastewaterMfc(
      selectedReactorId,
      selectedMicrobeId,
      influentCod,
      hrtHours,
      externalResistance
    );
  }, [selectedReactorId, selectedMicrobeId, influentCod, hrtHours, externalResistance]);

  // Polarization Curve Data for Mode 3
  const polarizationData = useMemo(() => {
    return generateMfcPolarizationCurve(selectedReactorId, selectedMicrobeId);
  }, [selectedReactorId, selectedMicrobeId]);

  // Peak power in curve
  const peakPowerPoint = useMemo(() => {
    return polarizationData.reduce((prev, curr) => 
      curr.powerDensityMilliWm2 > prev.powerDensityMilliWm2 ? curr : prev,
      polarizationData[0]
    );
  }, [polarizationData]);

  return (
    <div className="bg-obsidian/90 border border-emerald-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-inner">
              <Droplets className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                PIN NHIÊN LIỆU VI SINH (MFC) & XỬ LÝ NƯỚC THẢI SINH HỌC
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Cơ chế truyền electron ngoại bào (EET) • Vi khuẩn Dây Nano Geobacter & Con thoi Shewanella • Chuẩn xả thải QCVN 40:2011/BTNMT
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-emerald-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('EET_MECHANISMS');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'EET_MECHANISMS'
                ? 'bg-emerald-500 text-obsidian shadow-lg font-black ring-1 ring-emerald-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Biohazard className="w-4 h-4" />
            <span>Cơ Chế EET & Vi Sinh</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('WASTEWATER_REMEDIATION');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'WASTEWATER_REMEDIATION'
                ? 'bg-teal-500 text-obsidian shadow-lg font-black ring-1 ring-teal-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Xử Lý Nước Thải (QCVN 40)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('POLARIZATION_CURVES');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'POLARIZATION_CURVES'
                ? 'bg-cyan-500 text-obsidian shadow-lg font-black ring-1 ring-cyan-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Đường Cong Phân Cực (V & P)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: EET MECHANISMS & EXOMICROBIOLOGY */}
      {activeTab === 'EET_MECHANISMS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Microbe Selection List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Biohazard className="w-3.5 h-3.5" />
              Chủng Vi Sinh Điện Hoạt Tính (Exoelectrogens)
            </h3>
            <div className="space-y-2">
              {EXOELECTROGENS_CATALOG.map((microbe) => (
                <button
                  key={microbe.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedMicrobeId(microbe.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedMicrobeId === microbe.id
                      ? 'bg-emerald-500/20 border-emerald-400/80 shadow-md ring-1 ring-emerald-400/50'
                      : 'bg-obsidian-light/40 border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-ivory">{microbe.nameVi}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {microbe.transferMechanism === 'MICROBIAL_NANOWIRES_PILI'
                        ? 'Dây nano'
                        : microbe.transferMechanism === 'SOLUBLE_FLAVIN_SHUTTLE'
                        ? 'Con thoi'
                        : 'Cộng sinh'}
                    </span>
                  </div>
                  <p className="text-xs italic text-ivory-muted">{microbe.scientificName}</p>
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-2 text-ivory/80 pt-2 border-t border-white/5">
                    <div>
                      Độ dẫn màng: <span className="font-mono text-emerald-300 font-bold">{microbe.biofilmConductivityScm} S/cm</span>
                    </div>
                    <div>
                      Dòng max: <span className="font-mono text-cyan-300 font-bold">{microbe.maxCurrentDensityAm2} A/m²</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Environmental Requirements Card */}
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/10 space-y-2 text-xs">
              <div className="font-bold text-ivory flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Điều Kiện Sinh Trưởng Tối Ưu</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-ivory-muted text-[11px]">
                <div>Nhiệt độ tối ưu: <span className="text-emerald-300 font-bold">{selectedMicrobe.optimalTemperatureCelsius}°C</span></div>
                <div>pH tối ưu: <span className="text-emerald-300 font-bold">{selectedMicrobe.optimalPh}</span></div>
              </div>
              <div className="text-[11px] text-amber-300/90 pt-1">
                {selectedMicrobe.anaerobicRequirementVi}
              </div>
            </div>
          </div>

          {/* Interactive EET Animated SVG Diagram & Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-emerald-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-emerald-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Cơ Chế Truyền Điện Tích Ngoại Bào: {selectedMicrobe.mechanismNameVi}</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Hóa sinh phản ứng: CH₃COO⁻ + 2H₂O → 2CO₂ + 7H⁺ + 8e⁻ (Tại Anode graphite kỵ khí)
                  </p>
                </div>
              </div>

              {/* Animated SVG Visualization of EET at Biofilm/Electrode Interface */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[320px]">
                  {/* Defs for gradients & patterns */}
                  <defs>
                    <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="biofilmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#065f46" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                    </linearGradient>
                    <radialGradient id="electronGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#67e8f9" />
                      <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Left: Graphite Anode Electrode */}
                  <rect x="20" y="20" width="80" height="280" rx="8" fill="url(#anodeGrad)" stroke="#64748b" strokeWidth="2" />
                  <text x="60" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 60 160)">
                    ANODE GRAPHITE (CỰC ÂM)
                  </text>

                  {/* Biofilm Layer Area */}
                  <rect x="100" y="20" width="300" height="280" fill="url(#biofilmGrad)" rx="4" />
                  <text x="250" y="45" textAnchor="middle" fill="#a7f3d0" fontSize="13" fontWeight="bold">
                    LỚP MÀNG SINH HỌC DẪN ĐIỆN (ELECTROACTIVE BIOFILM)
                  </text>

                  {/* Right: Bulk Wastewater Solution */}
                  <rect x="400" y="20" width="280" height="280" fill="#0f172a" opacity="0.6" rx="4" />
                  <text x="540" y="45" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
                    DUNG DỊCH NƯỚC THẢI (ACETATE / COD)
                  </text>

                  {/* Bacterial Cell Bodies */}
                  {/* Cell 1: Attached directly to anode */}
                  <ellipse cx="160" cy="110" rx="35" ry="22" fill="#10b981" stroke="#34d399" strokeWidth="2" />
                  <text x="160" y="114" textAnchor="middle" fill="#022c22" fontSize="10" fontWeight="bold">Vi Khuẩn 1</text>

                  {/* Cell 2: In outer biofilm */}
                  <ellipse cx="260" cy="180" rx="38" ry="24" fill="#059669" stroke="#10b981" strokeWidth="2" />
                  <text x="260" y="184" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="bold">Vi Khuẩn 2</text>

                  {/* Cell 3: Border biofilm */}
                  <ellipse cx="340" cy="240" rx="36" ry="22" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  <text x="340" y="244" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="bold">Vi Khuẩn 3</text>

                  {/* EET Pathway Visualization based on selected species */}
                  {selectedMicrobe.transferMechanism === 'MICROBIAL_NANOWIRES_PILI' && (
                    <g>
                      {/* Conductive Nanowires (e-pili) branching across cells to anode */}
                      <path d="M 340 240 Q 260 210 160 110 T 100 110" fill="none" stroke="#22d3ee" strokeWidth="3" strokeDasharray="6,3" className="animate-pulse" />
                      <path d="M 260 180 Q 180 160 100 160" fill="none" stroke="#22d3ee" strokeWidth="3" strokeDasharray="6,3" className="animate-pulse" />
                      <path d="M 160 110 L 100 110" fill="none" stroke="#22d3ee" strokeWidth="4" />
                      
                      {/* Outer membrane cytochromes OmcZ nodes */}
                      <circle cx="100" cy="110" r="7" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="100" cy="160" r="7" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="195" cy="110" r="5" fill="#f43f5e" />
                      <circle cx="298" cy="180" r="5" fill="#f43f5e" />

                      {/* Moving electrons along nanowires */}
                      <circle cx="130" cy="110" r="4" fill="#67e8f9" className="animate-ping" />
                      <circle cx="200" cy="170" r="4" fill="#67e8f9" className="animate-ping" />
                      <circle cx="300" cy="220" r="4" fill="#67e8f9" className="animate-ping" />

                      {/* Text callout */}
                      <text x="180" y="260" fill="#22d3ee" fontSize="11" fontWeight="bold">
                        ⚡ Sợi nano PilA (e-pili) & Cytochrome đa nhân OmcZ dẫn truyền electron
                      </text>
                    </g>
                  )}

                  {selectedMicrobe.transferMechanism === 'SOLUBLE_FLAVIN_SHUTTLE' && (
                    <g>
                      {/* Soluble Mediator Shuttles (Flavin/Riboflavin/Pyocyanin) */}
                      {/* Oxidized / Reduced mediator cycle */}
                      <g className="animate-pulse">
                        <circle cx="130" cy="80" r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                        <text x="130" y="83" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Flv_red</text>
                        <line x1="130" y1="88" x2="100" y2="95" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,3" />

                        <circle cx="130" cy="130" r="8" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
                        <text x="130" y="133" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Flv_ox</text>

                        <circle cx="220" cy="130" r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                        <text x="220" y="133" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Flv_red</text>

                        <circle cx="300" cy="130" r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                        <text x="300" y="133" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Flv_red</text>
                      </g>

                      {/* Cytochrome complex MtrCAB on outer membrane */}
                      <rect x="123" y="102" width="6" height="16" fill="#f43f5e" rx="2" />
                      <rect x="222" y="172" width="6" height="16" fill="#f43f5e" rx="2" />

                      <text x="180" y="260" fill="#fbbf24" fontSize="11" fontWeight="bold">
                        🔄 Chất con thoi hòa tan (Riboflavin/Flavin) khuếch tán giải phóng 2e⁻ tại cực Anode
                      </text>
                    </g>
                  )}

                  {selectedMicrobe.transferMechanism === 'SYNTHETIC_CONSORTIUM' && (
                    <g>
                      {/* Syntrophic cooperation: Fermenters + Exoelectrogens */}
                      <ellipse cx="440" cy="140" rx="30" ry="18" fill="#f97316" stroke="#fb923c" strokeWidth="1.5" />
                      <text x="440" y="143" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Lên men</text>

                      {/* Fermentation product (Acetate/H2) arrow to Geobacter */}
                      <path d="M 410 140 Q 370 170 300 180" fill="none" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4,2" />
                      <text x="365" y="155" fill="#fdba74" fontSize="9">Acetate</text>

                      <path d="M 260 180 L 100 180" fill="none" stroke="#22d3ee" strokeWidth="3" strokeDasharray="4,2" />
                      <circle cx="100" cy="180" r="6" fill="#f43f5e" />

                      <text x="180" y="260" fill="#f97316" fontSize="11" fontWeight="bold">
                        🤝 Cộng sinh vi sinh: Lên men phân giải đường phức tạp → Acetate → Vi khuẩn sinh điện
                      </text>
                    </g>
                  )}

                  {/* Organic Substrate oxidation particles in wastewater */}
                  <g>
                    <text x="470" y="90" fill="#38bdf8" fontSize="11" fontWeight="mono">CH₃COO⁻ (Acetate)</text>
                    <text x="480" y="220" fill="#38bdf8" fontSize="11" fontWeight="mono">H₂O, Protein, Đường</text>
                    <text x="75" y="295" fill="#22d3ee" fontSize="11" fontWeight="bold">8 e⁻ → Mạch ngoài (Dòng điện)</text>
                  </g>
                </svg>
              </div>

              {/* Carrier & Biochemical Advantages Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Chất Mang Điện Tích Ngoại Bào (Electron Carriers)
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedMicrobe.electronCarriersVi}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Đặc Điểm & Ứng Dụng Nổi Bật
                  </span>
                  <p className="text-xs text-ivory/90 leading-relaxed">
                    {selectedMicrobe.advantagesVi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: WASTEWATER REMEDIATION & ENVIRONMENTAL COMPLIANCE */}
      {activeTab === 'WASTEWATER_REMEDIATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-teal-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                Cấu Hình Buồng Phản Ứng & Thông Số Nước Thải
              </h3>

              {/* Reactor Configuration Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ivory">Cấu hình buồng phản ứng MFC:</label>
                <div className="grid grid-cols-1 gap-2">
                  {MFC_REACTORS_CATALOG.map((reactor) => (
                    <button
                      key={reactor.id}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedReactorId(reactor.id);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedReactorId === reactor.id
                          ? 'bg-teal-500/20 border-teal-400/80 shadow-md ring-1 ring-teal-400/50'
                          : 'bg-obsidian/40 border-white/5 hover:border-teal-500/30 hover:bg-teal-500/5'
                      }`}
                    >
                      <div className="font-bold text-xs text-ivory">{reactor.nameVi}</div>
                      <div className="text-[11px] text-ivory-muted mt-0.5">{reactor.membraneSeparatorVi}</div>
                      <div className="flex gap-4 mt-2 text-[10px] text-teal-300 font-mono">
                        <span>V_OCV = {reactor.nominalOcvVolts} V</span>
                        <span>R_int = {reactor.nominalInternalResistanceOhms} Ω</span>
                        <span>S_anode = {reactor.typicalAnodeSurfaceAreaM2} m²</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Nồng độ COD nước thải đầu vào:</span>
                    <span className="font-mono text-cyan-300 font-bold">{influentCod} mg/L</span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={2500}
                    step={50}
                    value={influentCod}
                    onChange={(e) => setInfluentCod(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>200 (Thải nhẹ)</span>
                    <span>800 (Sinh hoạt)</span>
                    <span>2500 (Nông sản/Bia)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Thời gian lưu nước (HRT):</span>
                    <span className="font-mono text-emerald-300 font-bold">{hrtHours} giờ</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={72}
                    step={2}
                    value={hrtHours}
                    onChange={(e) => setHrtHours(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>6h (Nhanh)</span>
                    <span>24h (Chuẩn)</span>
                    <span>72h (Kéo dài)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Điện trở tải ngoài (R_ext):</span>
                    <span className="font-mono text-amber-300 font-bold">{externalResistance} Ω</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={externalResistance}
                    onChange={(e) => setExternalResistance(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>10 Ω</span>
                    <span>100 Ω</span>
                    <span>500 Ω</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results & QCVN 40 Compliance Card */}
          <div className="lg:col-span-7 space-y-4">
            {/* Verdict Badge */}
            <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
              remediationResult.meetsQcvn40ColumnA
                ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-300'
                : remediationResult.effluentCodMgL <= 150
                ? 'bg-amber-500/15 border-amber-400/60 text-amber-300'
                : 'bg-rose-500/15 border-rose-400/60 text-rose-300'
            }`}>
              {remediationResult.meetsQcvn40ColumnA ? (
                <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
              )}
              <div>
                <div className="font-black text-sm uppercase tracking-wide">
                  {remediationResult.remediationVerdictVi}
                </div>
                <div className="text-xs text-ivory-muted mt-0.5">
                  Quy chuẩn kỹ thuật quốc gia QCVN 40:2011/BTNMT: Cột A (COD ≤ 75 mg/L), Cột B (COD ≤ 150 mg/L).
                </div>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">COD Sau Xử Lý</span>
                <span className={`text-xl font-mono font-black ${
                  remediationResult.effluentCodMgL <= 75 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {remediationResult.effluentCodMgL}
                </span>
                <span className="text-[10px] text-ivory-muted block">mg/L</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Hiệu Suất Khử COD</span>
                <span className="text-xl font-mono font-black text-teal-400">
                  {remediationResult.codRemovalEfficiencyPercent}%
                </span>
                <span className="text-[10px] text-emerald-400/80 block">Đạt chuẩn sinh học</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Hiệu Suất Coulombic</span>
                <span className="text-xl font-mono font-black text-cyan-400">
                  {remediationResult.coulombicEfficiencyPercent}%
                </span>
                <span className="text-[10px] text-ivory-muted block">e⁻ thu hồi làm dòng điện</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Mật Độ Công Suất</span>
                <span className="text-xl font-mono font-black text-amber-400">
                  {remediationResult.powerDensityMilliWm2}
                </span>
                <span className="text-[10px] text-ivory-muted block">mW/m² anode</span>
              </div>
            </div>

            {/* Electrical Output Parameters */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Thông Số Điện Năng Thu Được Trên Tải Ngoài ({externalResistance} Ω)</span>
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Hiệu điện thế cell V_cell:</span>
                  <span className="font-mono text-cyan-300 font-bold text-base">{remediationResult.operatingCellVoltageV} V</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Cường độ dòng điện I:</span>
                  <span className="font-mono text-emerald-300 font-bold text-base">{remediationResult.operatingCurrentMa} mA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Công suất phát điện:</span>
                  <span className="font-mono text-amber-300 font-bold text-base">
                    {(remediationResult.operatingCellVoltageV * (remediationResult.operatingCurrentMa / 1000) * 1000).toFixed(2)} mW
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental & Economic Dual Benefit Explanation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-obsidian-light/40 to-teal-950/40 border border-emerald-500/20 text-xs text-ivory-muted space-y-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Lợi Ích Kép: Xử Lý Ô Nhiễm Không Tốn Năng Lượng Sục Khí
              </span>
              <p className="leading-relaxed">
                Phương pháp xử lý nước thải bùn hoạt tính truyền thống tiêu tốn tới <strong>0.6 - 1.2 kWh điện cho mỗi m³ nước thải</strong> chủ yếu để sục khí nén oxy liên tục. Ngược lại, pin nhiên liệu vi sinh (MFC) biến nước thải hữu cơ giàu COD thành nguồn cung cấp electron, vừa tự động làm sạch nước thải đạt chuẩn xả thải QCVN 40 vừa phát điện tại chỗ, mở ra mô hình xử lý nước thải phát thải ròng âm (Net-negative energy footprint).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: POLARIZATION & POWER DENSITY CURVES */}
      {activeTab === 'POLARIZATION_CURVES' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Đường Cong Phân Cực Điện Thế & Mật Độ Công Suất (V-J và P-J Curves)
              </h3>
              <p className="text-xs text-ivory-muted">
                Đặc tính phóng điện phân tích 3 vùng tổn thất: Hoạt hóa (Activation), Điện trở thuần (Ohmic) và Nồng độ khuếch tán (Concentration)
              </p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              Công suất cực đại: <span className="font-bold text-amber-400">{peakPowerPoint.powerDensityMilliWm2} mW/m²</span> tại {peakPowerPoint.currentDensityMaM2} mA/m²
            </div>
          </div>

          {/* Polarization Curve SVG Plot */}
          <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-4">
            <div className="bg-obsidian rounded-xl p-4 border border-white/5 relative">
              <svg viewBox="0 0 700 320" className="w-full h-auto max-h-[340px]">
                {/* Grid Lines */}
                <line x1="60" y1="20" x2="60" y2="270" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="270" x2="660" y2="270" stroke="#334155" strokeWidth="1" />
                <line x1="660" y1="20" x2="660" y2="270" stroke="#334155" strokeWidth="1" />

                {/* Horizontal guide lines */}
                <line x1="60" y1="80" x2="660" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="145" x2="660" y2="145" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="60" y1="210" x2="660" y2="210" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Axis Labels */}
                <text x="60" y="290" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="360" y="305" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Mật Độ Dòng Điện J (mA/m²)
                </text>
                <text x="660" y="290" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {polarizationData[polarizationData.length - 1]?.currentDensityMaM2}
                </text>

                {/* Left Y Axis: Voltage (0 - 1.0 V) */}
                <text x="25" y="145" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(-90 25 145)" textAnchor="middle">
                  Hiệu Điện Thế V_cell (V)
                </text>
                <text x="50" y="25" fill="#38bdf8" fontSize="10" textAnchor="end">1.0 V</text>
                <text x="50" y="145" fill="#38bdf8" fontSize="10" textAnchor="end">0.5 V</text>
                <text x="50" y="270" fill="#38bdf8" fontSize="10" textAnchor="end">0 V</text>

                {/* Right Y Axis: Power Density (mW/m²) */}
                <text x="695" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold" transform="rotate(90 695 145)" textAnchor="middle">
                  Mật Độ Công Suất (mW/m²)
                </text>
                <text x="665" y="25" fill="#f59e0b" fontSize="10" textAnchor="start">
                  {Math.round(peakPowerPoint.powerDensityMilliWm2 * 1.2)}
                </text>
                <text x="665" y="270" fill="#f59e0b" fontSize="10" textAnchor="start">0</text>

                {/* Draw Voltage Curve (Cyan) */}
                {/* Mapping: x from 60 to 660, y from 270 (0V) to 20 (1.0V) */}
                {(() => {
                  const maxJ = polarizationData[polarizationData.length - 1]?.currentDensityMaM2 || 1;
                  const vPath = polarizationData.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityMaM2 / maxJ) * 600;
                    const y = 270 - (pt.cellVoltageV / 1.0) * 250;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const maxP = peakPowerPoint.powerDensityMilliWm2 * 1.2 || 1;
                  const pPath = polarizationData.map((pt, idx) => {
                    const x = 60 + (pt.currentDensityMaM2 / maxJ) * 600;
                    const y = 270 - (pt.powerDensityMilliWm2 / maxP) * 250;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  // Peak power point coords
                  const peakX = 60 + (peakPowerPoint.currentDensityMaM2 / maxJ) * 600;
                  const peakY = 270 - (peakPowerPoint.powerDensityMilliWm2 / maxP) * 250;

                  return (
                    <g>
                      {/* Polarization Loss Zones Labels */}
                      <rect x="70" y="25" width="130" height="20" rx="4" fill="#38bdf8" opacity="0.1" />
                      <text x="135" y="38" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Hoạt Hóa (Activation)
                      </text>

                      <rect x="220" y="25" width="230" height="20" rx="4" fill="#10b981" opacity="0.1" />
                      <text x="335" y="38" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Tổn Thất Ohmic (Tuyến tính)
                      </text>

                      <rect x="470" y="25" width="170" height="20" rx="4" fill="#f43f5e" opacity="0.1" />
                      <text x="555" y="38" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Vùng Nồng Độ (Mass Transport)
                      </text>

                      {/* Curves */}
                      <path d={vPath} fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <path d={pPath} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,2" />

                      {/* Peak Power Indicator */}
                      <circle cx={peakX} cy={peakY} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" className="animate-pulse" />
                      <text x={peakX} y={peakY - 12} fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                        P_max ({peakPowerPoint.powerDensityMilliWm2} mW/m²)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Legend & 3 Loss Regimes Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-obsidian border border-cyan-500/20 space-y-1">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                  1. Tổn Thất Hoạt Hóa (Activation)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Xảy ra ở mật độ dòng điện thấp. Năng lượng hoạt hóa cần thiết để vi khuẩn chuyển electron từ chuỗi hô hấp tế bào qua cytochrome màng ngoài tới điện cực (tuân theo phương trình Tafel).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                  2. Tổn Thất Ohmic (Internal R)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Suy giảm tuyến tính V = I * R_int do điện trở dung dịch nước thải, điện trở tiếp xúc của màng sinh học và trở kháng màng trao đổi cation (Nafion).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                  3. Tổn Thất Nồng Độ (Mass Transfer)
                </span>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Xảy ra ở dòng điện cao tiệm cận dòng giới hạn khi tốc độ khuếch tán chất hữu cơ vào màng sinh học hoặc tốc độ khuếch tán proton H+ ra khỏi anode bị nghẽn.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
