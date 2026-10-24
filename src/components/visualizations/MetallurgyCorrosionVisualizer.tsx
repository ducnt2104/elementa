// src/components/visualizations/MetallurgyCorrosionVisualizer.tsx
// Interactive Metallurgy Extraction, Electrochemical Reactivity Series, Alpha Rule & Corrosion Protection Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 6: Đại cương kim loại & Ăn mòn) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Shield,
  Zap,
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Layers,
  Factory,
  Compass,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import {
  ELECTROCHEMICAL_SERIES,
  RedoxCoupleDef,
  predictAlphaRuleRedox,
  simulateCorrosionMechanism,
  AlphaRuleReactionResult,
  CorrosionSimulationResult
} from '../../domain/metallurgyCorrosionEngine';
import { sound } from '../../audio/soundEngine';

export interface MetallurgyCorrosionVisualizerProps {
  initialMode?: 'ALPHA_RULE' | 'METALLURGY_METHODS' | 'CORROSION_SIMULATION';
  className?: string;
}

export const MetallurgyCorrosionVisualizer: React.FC<MetallurgyCorrosionVisualizerProps> = ({
  initialMode = 'ALPHA_RULE',
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'ALPHA_RULE' | 'METALLURGY_METHODS' | 'CORROSION_SIMULATION'>(initialMode);

  // 1. Alpha Rule State
  const [oxidantSymbol, setOxidantSymbol] = useState<string>('Cu'); // Cu2+/Cu
  const [reductantSymbol, setReductantSymbol] = useState<string>('Fe'); // Fe2+/Fe

  // 2. Metallurgy Method State
  const [selectedMethod, setSelectedMethod] = useState<'DIEN_PHAN_NONG_CHAY' | 'NHIET_LUYEN' | 'THUY_LUYEN'>('DIEN_PHAN_NONG_CHAY');

  // 3. Corrosion Simulation State
  const [corrosionMetal1, setCorrosionMetal1] = useState<string>('Fe');
  const [corrosionMetal2, setCorrosionMetal2] = useState<string>('Zn'); // Sacrificial pair
  const [corrosionEnv, setCorrosionEnv] = useState<'DRY_AIR' | 'PURE_WATER' | 'ACID_DILUTE' | 'SALINE_SEAWATER'>('SALINE_SEAWATER');
  const [hasContact, setHasContact] = useState<boolean>(true);

  // Calculations
  const alphaResult = useMemo<AlphaRuleReactionResult>(() => {
    return predictAlphaRuleRedox({
      oxidantCoupleSymbol: oxidantSymbol,
      reductantCoupleSymbol: reductantSymbol
    });
  }, [oxidantSymbol, reductantSymbol]);

  const corrosionResult = useMemo<CorrosionSimulationResult>(() => {
    return simulateCorrosionMechanism({
      metalAnodeOrCouple1: corrosionMetal1,
      metalCouple2: corrosionMetal2,
      environmentType: corrosionEnv,
      hasDirectElectricalContact: hasContact
    });
  }, [corrosionMetal1, corrosionMetal2, corrosionEnv, hasContact]);

  const handleModeChange = (mode: 'ALPHA_RULE' | 'METALLURGY_METHODS' | 'CORROSION_SIMULATION') => {
    setActiveMode(mode);
    sound.playUiClick();
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Chuyên Đề Đại Cương Kim Loại &amp; Ăn Mòn Điện Hóa
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                GDPT 2018 Lớp 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Dãy điện hóa &amp; Quy tắc α · 3 Phương pháp luyện kim · Ăn mòn hóa học &amp; Bảo vệ Catot
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => handleModeChange('ALPHA_RULE')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'ALPHA_RULE'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            1. Dãy Điện Hóa &amp; Quy Tắc α
          </button>
          <button
            onClick={() => handleModeChange('METALLURGY_METHODS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'METALLURGY_METHODS'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            2. Điều Chế Kim Loại
          </button>
          <button
            onClick={() => handleModeChange('CORROSION_SIMULATION')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'CORROSION_SIMULATION'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            3. Ăn Mòn &amp; Bảo Vệ Catot
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== MODE 1: ALPHA RULE ===================== */}
        {activeMode === 'ALPHA_RULE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Couples Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Chọn Cặp Oxi Hóa / Khử
                </span>

                {/* Oxidant Choice */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Cặp Oxi Hóa (Cathode):</label>
                  <select
                    value={oxidantSymbol}
                    onChange={(e) => {
                      setOxidantSymbol(e.target.value);
                      sound.playUiClick();
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  >
                    {ELECTROCHEMICAL_SERIES.map((c) => (
                      <option key={c.elementSymbol} value={c.elementSymbol}>
                        {c.oxidizedForm}/{c.reducedForm} (E° = {c.standardPotentialE0Volts > 0 ? `+${c.standardPotentialE0Volts}` : c.standardPotentialE0Volts} V) — {c.elementNameVI}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reductant Choice */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Cặp Khử (Anode):</label>
                  <select
                    value={reductantSymbol}
                    onChange={(e) => {
                      setReductantSymbol(e.target.value);
                      sound.playUiClick();
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  >
                    {ELECTROCHEMICAL_SERIES.map((c) => (
                      <option key={c.elementSymbol} value={c.elementSymbol}>
                        {c.oxidizedForm}/{c.reducedForm} (E° = {c.standardPotentialE0Volts > 0 ? `+${c.standardPotentialE0Volts}` : c.standardPotentialE0Volts} V) — {c.elementNameVI}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Electrochemical Series Miniature Ladder */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Dãy Điện Hóa Kim Loại Chuẩn</span>
                  <span className="text-[10px] text-slate-500 font-mono">Tính oxi hóa tăng ➔</span>
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {ELECTROCHEMICAL_SERIES.map((c) => (
                    <div
                      key={c.elementSymbol}
                      className={`p-1.5 rounded text-[11px] font-mono flex justify-between border ${
                        c.elementSymbol === oxidantSymbol
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                          : c.elementSymbol === reductantSymbol
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <span>{c.oxidizedForm}/{c.reducedForm}</span>
                      <span>{c.standardPotentialE0Volts > 0 ? `+${c.standardPotentialE0Volts}` : c.standardPotentialE0Volts} V</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Alpha Rule Diagram & EMF Result (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className={`p-4 rounded-xl border transition-all ${
                alphaResult.isReactionSpontaneous
                  ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/60 border-cyan-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Suất Điện Động Chuẩn Của Pin Ganvani (Standard Cell EMF)
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    alphaResult.isReactionSpontaneous
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {alphaResult.isReactionSpontaneous ? 'TỰ PHÁT (E° > 0)' : 'KHÔNG TỰ PHÁT (E° ≤ 0)'}
                  </span>
                </div>

                <div className="text-3xl font-black font-mono text-cyan-300">
                  E° = {alphaResult.standardCellEmfE0Volts > 0 ? `+${alphaResult.standardCellEmfE0Volts.toFixed(2)}` : alphaResult.standardCellEmfE0Volts.toFixed(2)} V
                  <span className="text-xs font-normal text-slate-400 ml-3">
                    (ΔG° = {alphaResult.gibbsFreeEnergyDeltaG0Kj} kJ)
                  </span>
                </div>
              </div>

              {/* Graphical Alpha Rule SVG */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" /> Sơ Đồ Quy Tắc α (Alpha Rule)
                </div>

                <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 380 140" className="w-full max-w-md h-32">
                    {/* Upper left: Oxidant (stronger) */}
                    <rect x="20" y="20" width="100" height="40" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="70" y="45" fill="#67e8f9" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {alphaResult.oxidantCouple.oxidizedForm}
                    </text>

                    {/* Lower left: Reductant (weaker) */}
                    <rect x="20" y="80" width="100" height="40" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                    <text x="70" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">
                      {alphaResult.oxidantCouple.reducedForm}
                    </text>

                    {/* Upper right: Oxidant (weaker) */}
                    <rect x="260" y="20" width="100" height="40" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                    <text x="310" y="45" fill="#94a3b8" fontSize="12" textAnchor="middle">
                      {alphaResult.reductantCouple.oxidizedForm}
                    </text>

                    {/* Lower right: Reductant (stronger) */}
                    <rect x="260" y="80" width="100" height="40" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="310" y="105" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {alphaResult.reductantCouple.reducedForm}
                    </text>

                    {/* Alpha Greek Curve Path */}
                    <path
                      d="M 125,40 C 200,40 240,100 255,100 M 255,100 C 180,100 130,40 125,100 M 125,100 L 255,40"
                      fill="none"
                      stroke={alphaResult.isReactionSpontaneous ? "#10b981" : "#f43f5e"}
                      strokeWidth="2.5"
                      strokeDasharray={alphaResult.isReactionSpontaneous ? "none" : "4 4"}
                    />
                  </svg>
                </div>
              </div>

              {/* Reaction Equation Box */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Phương Trình Phản Ứng &amp; Diễn Giải Sách Giáo Khoa
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-300 text-center text-xs overflow-x-auto">
                  {alphaResult.balancedEquationVI}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  {alphaResult.pedagogicalRationaleVI}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 2: METALLURGY METHODS ===================== */}
        {activeMode === 'METALLURGY_METHODS' && (
          <div className="space-y-4">
            {/* Sub-nav */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 max-w-lg gap-1">
              <button
                onClick={() => {
                  setSelectedMethod('DIEN_PHAN_NONG_CHAY');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedMethod === 'DIEN_PHAN_NONG_CHAY'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Điện Phân Nóng Chảy
              </button>
              <button
                onClick={() => {
                  setSelectedMethod('NHIET_LUYEN');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedMethod === 'NHIET_LUYEN'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Nhiệt Luyện (Lò Cao)
              </button>
              <button
                onClick={() => {
                  setSelectedMethod('THUY_LUYEN');
                  sound.playUiClick();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedMethod === 'THUY_LUYEN'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Thủy Luyện (Đẩy Muối)
              </button>
            </div>

            {/* Method Details */}
            {selectedMethod === 'DIEN_PHAN_NONG_CHAY' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-amber-400 text-sm">Điện Phân Nóng Chảy (Molten Salt Electrolysis)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Áp dụng duy nhất cho các kim loại có tính khử rất mạnh: <strong>Kim loại kiềm (Na, K), kiềm thổ (Mg, Ca) và Nhôm (Al)</strong>.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-amber-300 text-xs">
                    2 Al₂O₃ ➔ 4 Al (lỏng) + 3 O₂↑ (Catot than chì, Anot than chì)
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-slate-300 space-y-1">
                    <strong className="text-amber-300 block">Vai trò sống còn của Criolit (Na₃AlF₆):</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>Hạ nhiệt độ nóng chảy của Al₂O₃ từ 2050°C xuống 950°C (tiết kiệm điện năng khổng lồ).</li>
                      <li>Tăng độ dẫn điện của hỗn hợp điện phân.</li>
                      <li>Có khối lượng riêng nhỏ hơn nhôm lỏng, nổi lên trên bề mặt ngăn Al lỏng bị oxi hóa bởi O₂ không khí!</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-cyan-400 text-sm">Điện Phân Muối Clorua Nóng Chảy</div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs">
                    2 NaCl (nóng chảy) ➔ 2 Na + Cl₂↑
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs">
                    MgCl₂ (nóng chảy) ➔ Mg + Cl₂↑
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    * Lưu ý thi THPT: Nhôm clorua (AlCl₃) là hợp chất cộng hóa trị có hiện tượng thăng hoa ở 180°C, KHÔNG dẫn điện khi nóng chảy nên KHÔNG thể dùng điều chế Al! (Bắt buộc phải điện phân oxit Al₂O₃ với criolit).
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'NHIET_LUYEN' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-rose-400 text-sm">Phương Pháp Nhiệt Luyện (Pyrometallurgy)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Dùng chất khử mạnh như <strong>CO, H₂, C, Al</strong> để khử ion kim loại trong oxit ở nhiệt độ cao. Chỉ áp dụng cho kim loại đứng <strong>sau Al</strong> trong dãy điện hóa (Zn, Fe, Cu, Ni, Sn, Pb).
                  </p>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-rose-300">
                      Fe₂O₃ + 3 CO ➔ 2 Fe + 3 CO₂ (Quá trình sản xuất gang trong lò cao)
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-rose-300">
                      CuO + H₂ ➔ Cu + H₂O (Bột đen hóa đỏ đồng)
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-rose-300">
                      Cr₂O₃ + 2 Al ➔ 2 Cr + Al₂O₃ (Phản ứng nhiệt nhôm hàn đường ray xe lửa)
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-amber-400 text-sm">Giới Hạn &amp; Bẫy Trọng Tâm THPT</div>
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-200">
                    <strong>BẪY THI THPT:</strong> Dẫn khí CO dư đi qua ống sứ nung nóng chứa hỗn hợp (Al₂O₃, MgO, Fe₂O₃, CuO).
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Al₂O₃ và MgO đứng trước Al nên <strong>KHÔNG BỊ KHỬ</strong> bởi CO hay H₂! Chất rắn thu được sau phản ứng gồm: <strong>Al₂O₃, MgO, Fe và Cu</strong>.
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'THUY_LUYEN' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-blue-400 text-sm">Phương Pháp Thủy Luyện (Hydrometallurgy)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Hòa tan hợp chất kim loại bằng dung môi thích hợp rồi dùng kim loại tự do có tính khử mạnh hơn để đẩy kim loại yếu ra khỏi dung dịch muối.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-blue-300 text-xs">
                    Fe + CuSO₄ (dd) ➔ FeSO₄ + Cu↓ (bám đỏ trên đinh sắt)
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-blue-300 text-xs">
                    Zn + 2 Ag(CN)₂⁻ ➔ Zn(CN)₄²⁻ + 2 Ag↓ (Chiết tách vàng &amp; bạc)
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-amber-400 text-sm">Điều Kiện Kim Loại Đẩy Muối</div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
                    <li>Kim loại dùng đẩy muối phải đứng trước kim loại trong muối theo dãy điện hóa.</li>
                    <li><strong>TUYỆT ĐỐI KHÔNG DÙNG</strong> kim loại kiềm/kiềm thổ tan trong nước (Na, K, Ca, Ba) để đẩy muối! Vì Na sẽ phản ứng trước với nước tạo NaOH và H₂, sau đó NaOH mới kết tủa với muối (Ví dụ: Cho Na vào CuSO₄ tạo Cu(OH)₂ xanh lam, KHÔNG tạo Cu kim loại!).</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== MODE 3: CORROSION SIMULATION ===================== */}
        {activeMode === 'CORROSION_SIMULATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Thiết Lập Mô Phỏng Ăn Mòn
                </span>

                {/* Metal 1 */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Kim loại nền (Vật liệu chính):</label>
                  <select
                    value={corrosionMetal1}
                    onChange={(e) => {
                      setCorrosionMetal1(e.target.value);
                      sound.playUiClick();
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200"
                  >
                    <option value="Fe">Sắt / Thép carbon (Fe, E° = -0.44V)</option>
                    <option value="Cu">Đồng (Cu, E° = +0.34V)</option>
                    <option value="Al">Nhôm (Al, E° = -1.66V)</option>
                    <option value="Zn">Kẽm (Zn, E° = -0.76V)</option>
                  </select>
                </div>

                {/* Metal 2 (Coupling) */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Kim loại / Phi kim ghép cặp:</label>
                  <select
                    value={corrosionMetal2}
                    onChange={(e) => {
                      setCorrosionMetal2(e.target.value);
                      sound.playUiClick();
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-300"
                  >
                    <option value="Zn">Kẽm (Zn) — Bảo vệ Catot hy sinh vỏ tàu</option>
                    <option value="Cu">Đồng (Cu) — Cặp Fe-Cu thoát khí mãnh liệt</option>
                    <option value="Sn">Thiếc (Sn) — Sắt tây mạ hộp bị trầy xước</option>
                    <option value="C">Cacbon (C) — Gang và thép trong không khí ẩm</option>
                    <option value="NONE">Không ghép cặp (Kim loại độc lập)</option>
                  </select>
                </div>

                {/* Environment */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Môi trường điện li tiếp xúc:</label>
                  <select
                    value={corrosionEnv}
                    onChange={(e) => {
                      setCorrosionEnv(e.target.value as any);
                      sound.playUiClick();
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-300"
                  >
                    <option value="SALINE_SEAWATER">Nước biển mặn (Chứa NaCl, O₂ hòa tan)</option>
                    <option value="ACID_DILUTE">Dung dịch axit loãng (H₂SO₄ loãng)</option>
                    <option value="PURE_WATER">Nước cất tinh khiết (Không dẫn điện)</option>
                    <option value="DRY_AIR">Không khí khô ráo (Không có màng nước)</option>
                  </select>
                </div>

                {/* Direct electrical contact toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Tiếp xúc điện trực tiếp:</span>
                  <button
                    onClick={() => {
                      setHasContact(!hasContact);
                      sound.playUiClick();
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded border ${
                      hasContact ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {hasContact ? 'Đang tiếp xúc (Bật)' : 'Cách điện (Tắt)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Corrosion Diagnostic & Sacrificial Anode (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className={`p-4 rounded-xl border transition-all ${
                corrosionResult.isSacrificialProtectionActive
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : corrosionResult.corrosionType === 'AN_MON_DIEN_HOA'
                  ? 'bg-rose-950/40 border-rose-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                    Phân Loại Cơ Chế Ăn Mòn
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    corrosionResult.isSacrificialProtectionActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : corrosionResult.corrosionType === 'AN_MON_DIEN_HOA'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {corrosionResult.corrosionType === 'AN_MON_DIEN_HOA'
                      ? 'ĂN MÒN ĐIỆN HÓA HỌC'
                      : corrosionResult.corrosionType === 'AN_MON_HOA_HOC'
                      ? 'ĂN MÒN HÓA HỌC'
                      : 'KHÔNG BỊ ĂN MÒN'}
                  </span>
                </div>

                <div className="text-xl font-black text-slate-100 flex items-center gap-2">
                  {corrosionResult.isSacrificialProtectionActive && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {corrosionResult.isSacrificialProtectionActive
                    ? 'BẢO VỆ CATOT THÀNH CÔNG!'
                    : `Kim loại bị hòa tan: ${corrosionResult.anodeMetalVI}`}
                </div>

                {corrosionResult.isSacrificialProtectionActive && (
                  <div className="text-xs text-emerald-300 mt-1 font-semibold">
                    Khối kẽm Zn đóng vai trò Anode bị ăn mòn hy sinh ➔ Vỏ tàu sắt Fe (Catot) được bảo vệ 100%!
                  </div>
                )}

                <div className="text-xs text-slate-300 mt-2">
                  {corrosionResult.visualPhenomenonVI}
                </div>
              </div>

              {/* Anode and Cathode Reaction Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-rose-400 font-semibold uppercase">Cực Âm (Anode - Bị Ăn Mòn):</span>
                  <div className="font-mono text-slate-200 text-[11px]">{corrosionResult.anodeReactionVI}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase">Cực Dương (Cathode - Được Bảo Vệ):</span>
                  <div className="font-mono text-slate-200 text-[11px]">{corrosionResult.cathodeReactionVI}</div>
                </div>
              </div>

              {/* Pedagogical Tip Box */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Trọng Tâm Ôn Thi Tốt Nghiệp THPT (GDPT 2018)
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {corrosionResult.curriculumExamTipVI}
                </p>
                <p className="text-slate-400 text-[11px] pt-1">
                  * {corrosionResult.pedagogicalRationaleVI}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
