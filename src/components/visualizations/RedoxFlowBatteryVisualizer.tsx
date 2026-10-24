// src/components/visualizations/RedoxFlowBatteryVisualizer.tsx
// Interactive Visualizer: Redox Flow Batteries (VRFB & AORFB) & Long-Duration Energy Storage (LDES)
// Standards: IUPAC Electrochemistry, Grid LDES Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Oxi hóa khử, Điện thế chuẩn & Năng lượng tái tạo)

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Zap,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Sliders,
  Database,
  Building2,
  Waves
} from 'lucide-react';
import {
  FLOW_BATTERY_CHEMISTRIES_CATALOG,
  getFlowBatteryChemistries,
  calculateFlowBatterySoc,
  simulateGridScaleLdesStation,
  FlowBatteryChemistry,
  FlowBatteryChemistrySpec
} from '../../domain/redoxFlowBatteryEngine';
import { sound } from '../../audio/soundEngine';

type FlowBatteryTabMode = 'HYDRAULIC_MEMBRANE_SCHEMATIC' | 'SOC_NERNST_POTENTIAL' | 'GRID_SCALE_LDES_SIMULATOR';

export const RedoxFlowBatteryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FlowBatteryTabMode>('HYDRAULIC_MEMBRANE_SCHEMATIC');

  // Chemistry Selection
  const [selectedChemistryId, setSelectedChemistryId] = useState<FlowBatteryChemistry>('ALL_VANADIUM_VRFB');

  // Mode 1 & 2: SOC State
  const [socPercent, setSocPercent] = useState<number>(65);
  const [isCharging, setIsCharging] = useState<boolean>(true);

  // Mode 3: Grid LDES Simulator State
  const [ratedPowerMw, setRatedPowerMw] = useState<number>(10);
  const [dischargeDurationHours, setDischargeDurationHours] = useState<number>(8);

  const selectedSpec = useMemo(() => {
    return FLOW_BATTERY_CHEMISTRIES_CATALOG.find(c => c.id === selectedChemistryId) || FLOW_BATTERY_CHEMISTRIES_CATALOG[0];
  }, [selectedChemistryId]);

  // SOC calculation
  const socResult = useMemo(() => {
    return calculateFlowBatterySoc(selectedChemistryId, socPercent);
  }, [selectedChemistryId, socPercent]);

  // Grid LDES Simulation
  const ldesResult = useMemo(() => {
    return simulateGridScaleLdesStation(selectedChemistryId, ratedPowerMw, dischargeDurationHours);
  }, [selectedChemistryId, ratedPowerMw, dischargeDurationHours]);

  return (
    <div className="bg-obsidian/90 border border-violet-500/30 rounded-2xl p-6 text-ivory shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-violet-500/20 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 shadow-inner">
              <Database className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
                PIN DÒNG CHẢY OXI HÓA KHỬ (VRFB & AORFB) & LƯU TRỮ LƯỚI ĐIỆN (LDES)
              </h2>
              <p className="text-xs text-ivory-muted font-medium mt-0.5">
                Tách rời Công suất (MW) & Dung lượng (MWh) • 4 Trạng thái hóa trị Vanadi • Lưu trữ năng lượng dài hạn 8h - 24h
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-obsidian-light/60 p-1.5 rounded-xl border border-violet-500/30 gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('HYDRAULIC_MEMBRANE_SCHEMATIC');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'HYDRAULIC_MEMBRANE_SCHEMATIC'
                ? 'bg-violet-500 text-obsidian shadow-lg font-black ring-1 ring-violet-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Sơ Đồ Thủy Lực & Cực</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SOC_NERNST_POTENTIAL');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'SOC_NERNST_POTENTIAL'
                ? 'bg-purple-500 text-obsidian shadow-lg font-black ring-1 ring-purple-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Trạng Thái Nạp SOC & Nernst</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('GRID_SCALE_LDES_SIMULATOR');
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'GRID_SCALE_LDES_SIMULATOR'
                ? 'bg-indigo-500 text-obsidian shadow-lg font-black ring-1 ring-indigo-300'
                : 'text-ivory-muted hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Trạm Lưu Trữ Lưới Điện LDES</span>
          </button>
        </div>
      </div>

      {/* MODE 1: HYDRAULIC & MEMBRANE SCHEMATIC */}
      {activeTab === 'HYDRAULIC_MEMBRANE_SCHEMATIC' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Flow Battery Chemistry Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Hóa Học Pin Dòng Điện Giải Lỏng
            </h3>
            <div className="space-y-2">
              {FLOW_BATTERY_CHEMISTRIES_CATALOG.map((chem) => (
                <button
                  key={chem.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedChemistryId(chem.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedChemistryId === chem.id
                      ? 'bg-violet-500/20 border-violet-400/80 shadow-md ring-1 ring-violet-400/50'
                      : 'bg-obsidian-light/40 border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-ivory">{chem.nameVi}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {chem.nominalCellVoltageVolts} V
                    </span>
                  </div>
                  <p className="text-xs italic text-ivory-muted">{chem.inventorYearVi}</p>
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-2 text-ivory/80 pt-2 border-t border-white/5">
                    <div>
                      Tuổi thọ: <span className="font-mono text-emerald-300 font-bold">{chem.calendarLifeYears} năm ({chem.cycleLifeLimit.toLocaleString()} chu kỳ)</span>
                    </div>
                    <div>
                      Hiệu suất RTE: <span className="font-mono text-cyan-300 font-bold">{chem.roundTripEfficiencyPercent}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Operating State Switcher */}
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/10 space-y-3 text-xs">
              <div className="font-bold text-ivory flex items-center justify-between">
                <span>Chế Độ Hoạt Động Của Pin Dòng:</span>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setIsCharging(!isCharging);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isCharging
                      ? 'bg-emerald-500 text-obsidian shadow'
                      : 'bg-amber-500 text-obsidian shadow'
                  }`}
                >
                  {isCharging ? 'ĐANG NẠP (CHARGE)' : 'ĐANG XẢ (DISCHARGE)'}
                </button>
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                {isCharging
                  ? 'Nạp: Điện lưới đẩy electron vào cực âm để khử V³⁺ thành V²⁺, đồng thời oxy hóa VO²⁺ thành VO₂⁺ ở cực dương.'
                  : 'Xả: V²⁺ tự phát nhường electron tạo dòng điện nuôi tải, proton H⁺ di chuyển xuyên màng cân bằng điện tích.'}
              </p>
            </div>
          </div>

          {/* Interactive Flow Battery Hydraulic SVG Diagram */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-xl bg-obsidian-light/80 border border-violet-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-violet-300 flex items-center gap-2">
                    <Waves className="w-4 h-4 text-violet-400" />
                    <span>Sơ Đồ Thủy Lực Hai Bể Chứa Dung Dịch Điện Giải & Cụm Stack</span>
                  </h4>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Anode: {selectedSpec.anolyteReactionVi} • Cathode: {selectedSpec.catholyteReactionVi}
                  </p>
                </div>
              </div>

              {/* Animated SVG Diagram of Redox Flow System */}
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[320px]">
                <svg viewBox="0 0 700 340" className="w-full h-auto max-h-[340px]">
                  {/* Left: Anolyte Storage Tank */}
                  <rect x="30" y="50" width="120" height="200" rx="12" fill={socResult.anolyteColorHex} opacity="0.35" stroke={socResult.anolyteColorHex} strokeWidth="2.5" />
                  <rect x="30" y={250 - (socResult.stateOfChargePercent / 100) * 180} width="120" height={(socResult.stateOfChargePercent / 100) * 180} rx="8" fill={socResult.anolyteColorHex} opacity="0.8" />
                  <text x="90" y="80" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    BỂ ANOLYTE (-)
                  </text>
                  <text x="90" y="100" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                    {socResult.anolyteValenceStateVi}
                  </text>
                  <text x="90" y="275" fill={socResult.anolyteColorHex} fontSize="10" fontWeight="bold" textAnchor="middle">
                    Màu: {socResult.anolyteColorNameVi}
                  </text>

                  {/* Right: Catholyte Storage Tank */}
                  <rect x="550" y="50" width="120" height="200" rx="12" fill={socResult.catholyteColorHex} opacity="0.35" stroke={socResult.catholyteColorHex} strokeWidth="2.5" />
                  <rect x="550" y={250 - (socResult.stateOfChargePercent / 100) * 180} width="120" height={(socResult.stateOfChargePercent / 100) * 180} rx="8" fill={socResult.catholyteColorHex} opacity="0.8" />
                  <text x="610" y="80" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    BỂ CATHOLYTE (+)
                  </text>
                  <text x="610" y="100" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                    {socResult.catholyteValenceStateVi}
                  </text>
                  <text x="610" y="275" fill={socResult.catholyteColorHex} fontSize="10" fontWeight="bold" textAnchor="middle">
                    Màu: {socResult.catholyteColorNameVi}
                  </text>

                  {/* Center: Membrane Electrode Assembly Stack */}
                  <rect x="250" y="30" width="200" height="240" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <text x="350" y="55" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    CỤM CELL PIN DÒNG
                  </text>

                  {/* Negative Half-Cell Chamber (Left of Stack) */}
                  <rect x="260" y="70" width="80" height="180" fill={socResult.anolyteColorHex} opacity="0.3" rx="4" />
                  <text x="300" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">CỰC ÂM (-)</text>
                  <text x="300" y="160" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Nỉ Carbon</text>

                  {/* Center Membrane */}
                  <line x1="350" y1="70" x2="350" y2="250" stroke="#10b981" strokeWidth="4" strokeDasharray="6,3" />
                  <text x="350" y="165" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 350 165)">
                    Màng Proton Nafion (H⁺)
                  </text>

                  {/* Positive Half-Cell Chamber (Right of Stack) */}
                  <rect x="360" y="70" width="80" height="180" fill={socResult.catholyteColorHex} opacity="0.3" rx="4" />
                  <text x="400" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">CỰC DƯƠNG (+)</text>
                  <text x="400" y="160" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Nỉ Carbon</text>

                  {/* Hydraulic Circulation Pipes & Pumps */}
                  {/* Anolyte Circulation (Left Loop) */}
                  <path d="M 150 180 L 220 180 L 220 130 L 260 130" fill="none" stroke={socResult.anolyteColorHex} strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
                  <path d="M 260 210 L 200 210 L 200 230 L 150 230" fill="none" stroke={socResult.anolyteColorHex} strokeWidth="3" strokeDasharray="6,4" />
                  <circle cx="210" cy="180" r="12" fill="#0f172a" stroke={socResult.anolyteColorHex} strokeWidth="2" />
                  <text x="210" y="184" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Bơm</text>

                  {/* Catholyte Circulation (Right Loop) */}
                  <path d="M 550 180 L 480 180 L 480 130 L 440 130" fill="none" stroke={socResult.catholyteColorHex} strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
                  <path d="M 440 210 L 500 210 L 500 230 L 550 230" fill="none" stroke={socResult.catholyteColorHex} strokeWidth="3" strokeDasharray="6,4" />
                  <circle cx="490" cy="180" r="12" fill="#0f172a" stroke={socResult.catholyteColorHex} strokeWidth="2" />
                  <text x="490" y="184" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Bơm</text>

                  {/* External Circuit Load/Source */}
                  <path d="M 300 70 L 300 15 L 400 15 L 400 70" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="350" cy="15" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                  <text x="350" y="19" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {isCharging ? 'NẠP' : 'TẢI'}
                  </text>
                  <text x="350" y="325" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    V_ocv = {socResult.openCircuitVoltageV} V • Không suy thoái dung lượng chu kỳ (Decoupled Capacity)
                  </text>
                </svg>
              </div>

              {/* Cross-Contamination Immunity Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/40 via-obsidian-light/40 to-purple-950/40 border border-violet-500/20 text-xs text-ivory-muted space-y-1.5">
                <span className="font-bold text-violet-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Ưu Thế Cốt Lõi: Miễn Nhiễm Suy Thoái Chéo (Cross-Contamination Immunity)
                </span>
                <p className="leading-relaxed">
                  {selectedSpec.crossContaminationImmunityVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: STATE OF CHARGE (SOC) & NERNST REVERSIBLE POTENTIAL */}
      {activeTab === 'SOC_NERNST_POTENTIAL' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-purple-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Điều Chỉnh Trạng Thái Nạp SOC
              </h3>

              {/* Slider */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Trạng thái nạp năng lượng (SOC):</span>
                    <span className="font-mono text-purple-300 font-bold">{socPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    step={1}
                    value={socPercent}
                    onChange={(e) => setSocPercent(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>5% (Xả cạn)</span>
                    <span>50% (Bán nạp)</span>
                    <span>95% (Nạp no)</span>
                  </div>
                </div>
              </div>

              {/* Nernst Formula Card */}
              <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-2 text-xs">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Phương Trình Nernst Điện Thế Hở Mạch
                </span>
                <p className="font-mono text-[11px] text-ivory/90 bg-white/5 p-2 rounded-lg">
                  V_ocv = E° + (2·R·T / F) · ln[ SOC / (1 - SOC) ]
                </p>
                <p className="text-[11px] text-ivory-muted">
                  Điện thế tế bào tăng dần từ 1.15 V lên tới 1.55 V khi nạp đầy do tỉ lệ ion hoạt hóa V²⁺/V³⁺ và VO₂⁺/VO²⁺ thay đổi theo phương trình Nernst.
                </p>
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            {/* Real-Time OCV Display */}
            <div className="p-4 rounded-xl border bg-purple-500/15 border-purple-400/60 text-purple-300 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-ivory-muted block">Điện Thế Hở Mạch Hiện Tại</span>
                <span className="text-3xl font-mono font-black text-purple-300">{socResult.openCircuitVoltageV} V</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-ivory-muted block">Điện Thế Danh Định E°</span>
                <span className="text-xl font-mono font-bold text-ivory">{selectedSpec.nominalCellVoltageVolts} V</span>
              </div>
            </div>

            {/* Electrolyte Color & Valence States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Anolyte Swatch */}
              <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: socResult.anolyteColorHex }}></div>
                  <span className="text-xs font-bold text-ivory">Dung Dịch Cực Âm (Anolyte)</span>
                </div>
                <div className="text-sm font-bold text-ivory">{socResult.anolyteValenceStateVi}</div>
                <div className="text-xs text-ivory-muted">Trạng thái quang học: <span className="font-bold text-ivory">{socResult.anolyteColorNameVi}</span></div>
                <p className="text-[11px] text-ivory-muted pt-1 border-t border-white/5">
                  {socPercent > 70 ? 'Nồng độ ion V²⁺ (tím) chiếm ưu thế, năng lượng nạp cao.' : 'Nồng độ ion V³⁺ (xanh lục) chiếm ưu thế.'}
                </p>
              </div>

              {/* Catholyte Swatch */}
              <div className="p-4 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: socResult.catholyteColorHex }}></div>
                  <span className="text-xs font-bold text-ivory">Dung Dịch Cực Dương (Catholyte)</span>
                </div>
                <div className="text-sm font-bold text-ivory">{socResult.catholyteValenceStateVi}</div>
                <div className="text-xs text-ivory-muted">Trạng thái quang học: <span className="font-bold text-ivory">{socResult.catholyteColorNameVi}</span></div>
                <p className="text-[11px] text-ivory-muted pt-1 border-t border-white/5">
                  {socPercent > 70 ? 'Nồng độ ion VO₂⁺ (vàng chanh) chiếm ưu thế.' : 'Nồng độ ion VO²⁺ (xanh lam) chiếm ưu thế.'}
                </p>
              </div>
            </div>

            {/* Degradation Comparison Table */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-ivory block">So Sánh Tuổi Thọ Với Pin Lithium-ion Truyền Thống</span>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px]">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Tiêu chí</span>
                  <span className="font-bold text-ivory">Chu kỳ sạc xả</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
                  <span className="text-rose-300 block text-[10px]">Lithium-ion LFP</span>
                  <span className="font-bold text-rose-300">3,000 - 5,000 lần</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-emerald-300 block text-[10px]">Pin Dòng VRFB</span>
                  <span className="font-bold text-emerald-300">&gt; 20,000 lần (Bền vĩnh cửu)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GRID-SCALE LDES SIMULATOR */}
      {activeTab === 'GRID_SCALE_LDES_SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-obsidian-light/60 border border-indigo-500/30 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Quy Mô Dự Án Lưu Trữ Lưới Điện LDES
              </h3>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Công suất danh định của trạm:</span>
                    <span className="font-mono text-cyan-300 font-bold">{ratedPowerMw} MW</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={ratedPowerMw}
                    onChange={(e) => setRatedPowerMw(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>1 MW (Khu công nghiệp)</span>
                    <span>10 MW (Thành phố vừa)</span>
                    <span>50 MW (Trang trại điện gió lớn)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ivory-muted">Thời gian xả liên tục (LDES Duration):</span>
                    <span className="font-mono text-emerald-300 font-bold">{dischargeDurationHours} giờ</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={24}
                    step={2}
                    value={dischargeDurationHours}
                    onChange={(e) => setDischargeDurationHours(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted/70">
                    <span>4h (Đỉnh tối)</span>
                    <span>8h (Suốt đêm)</span>
                    <span>24h (Dự phòng cả ngày)</span>
                  </div>
                </div>
              </div>

              {/* Architecture Principle Callout */}
              <div className="p-3.5 rounded-xl bg-obsidian border border-white/5 space-y-1.5 text-xs text-ivory-muted">
                <span className="font-bold text-indigo-300 block">Ưu Điểm Tách Rời (Decoupled Scalability)</span>
                <p className="leading-relaxed text-[11px]">
                  Để tăng thời gian xả từ 8h lên 24h, ta <strong>chỉ cần xây thêm bể chứa dung dịch điện giải</strong> lớn hơn mà không cần mua thêm cụm màng stack đắt tiền. Điều này làm chi phí lưu trữ $/kWh giảm dần theo thời gian xả dài (kinh tế quy mô LDES).
                </p>
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Tổng Dung Lượng</span>
                <span className="text-2xl font-mono font-black text-cyan-400">
                  {ldesResult.totalStoredEnergyMwh}
                </span>
                <span className="text-[10px] text-ivory-muted block">MWh năng lượng</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Thể Tích Mỗi Bể</span>
                <span className="text-2xl font-mono font-black text-purple-400">
                  {ldesResult.anolyteTankVolumeM3}
                </span>
                <span className="text-[10px] text-ivory-muted block">m³ dung dịch lỏng</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Số Cụm Stack</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {ldesResult.stackCount}
                </span>
                <span className="text-[10px] text-ivory-muted block">cụm module ({ldesResult.totalCellCount} cells)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-light/60 border border-white/5 space-y-1">
                <span className="text-[10px] text-ivory-muted uppercase font-bold block">Hiệu Suất Chu Trình</span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {ldesResult.roundTripEfficiencyPercent}%
                </span>
                <span className="text-[10px] text-ivory-muted block">RTE (đã trừ bơm)</span>
              </div>
            </div>

            {/* Station Engineering Parameters */}
            <div className="p-4 rounded-xl bg-obsidian-light/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-ivory flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Thông Số Kỹ Thuật Trạm Lưu Trữ Lưới Điện</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Lưu lượng bơm tuần hoàn:</span>
                  <span className="font-mono text-cyan-300 font-bold text-base">{ldesResult.flowRateLitersPerMin} L/phút</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Hao phí công suất bơm:</span>
                  <span className="font-mono text-amber-300 font-bold text-base">{ldesResult.pumpingParasiticLossKw} kW</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Diện tích mặt bằng trạm:</span>
                  <span className="font-mono text-emerald-300 font-bold text-base">{ldesResult.estimatedFootprintM2} m²</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian border border-white/5">
                  <span className="text-ivory-muted block text-[10px]">Ước tính vốn đầu tư Capex:</span>
                  <span className="font-mono text-purple-300 font-bold text-base">${ldesResult.capexMillionUsd}M USD</span>
                </div>
              </div>
            </div>

            {/* Zero Fire Hazard Safety Certificate */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-obsidian-light/40 to-teal-950/40 border border-emerald-500/20 text-xs text-ivory-muted space-y-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                An Toàn Cháy Nổ Cấp Độ Cao Nhất (Non-Flammable Aqueous Electrolyte)
              </span>
              <p className="leading-relaxed">
                Khác với các hệ thống pin Lithium-ion dễ xảy ra thoát nhiệt dây chuyền (Thermal Runaway) và cháy nổ dữ dội sinh khí độc hydro florua (HF), dung dịch điện giải của pin dòng chứa hơn 70% là nước, hoàn toàn không thể bắt lửa. Trạm có thể lắp đặt an toàn ngay bên dưới các tòa nhà văn phòng, khu công nghiệp và đô thị đông dân cư.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
