// src/components/visualizations/ChemicalEquilibriumVisualizer.tsx
// Interactive Chemical Equilibrium & Le Chatelier Visualizer (Cân bằng Hóa học & Nguyên lý Le Chatelier)
// Standardized for Vietnam GDPT 2018 Grade 11 Chemistry Curriculum & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Scale,
  Flame,
  Gauge,
  Sparkles,
  Info,
  RotateCcw,
  BookOpen,
  Zap,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import {
  EquilibriumEngine,
  CURRICULUM_EQUILIBRIUM_REACTIONS,
  EquilibriumReactionDef
} from '../../domain/equilibriumEngine';
import { sound } from '../../audio/soundEngine';

interface ChemicalEquilibriumVisualizerProps {
  initialReactionId?: string;
  onEquilibriumStateChange?: (state: any) => void;
  className?: string;
}

export const ChemicalEquilibriumVisualizer: React.FC<ChemicalEquilibriumVisualizerProps> = ({
  initialReactionId = 'eq_no2_dimerization',
  onEquilibriumStateChange,
  className = ''
}) => {
  const [selectedReactionId, setSelectedReactionId] = useState<string>(initialReactionId);
  const [tempCelsius, setTempCelsius] = useState<number>(25); // Default 25 °C (298.15 K)
  const [pressureAtm, setPressureAtm] = useState<number>(1.0); // Default 1.0 atm
  const [isCatalystActive, setIsCatalystActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'VISUAL' | 'PEDAGOGY' | 'GAMEPLAY'>('VISUAL');

  const selectedReaction = useMemo<EquilibriumReactionDef>(() => {
    return (
      CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === selectedReactionId) ||
      CURRICULUM_EQUILIBRIUM_REACTIONS[0]
    );
  }, [selectedReactionId]);

  // Initial concentration state for the current reaction
  const [concentrations, setConcentrations] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    selectedReaction.reactants.forEach(r => {
      init[r.formula] = r.phase === 's' ? 1.0 : 1.0;
    });
    selectedReaction.products.forEach(p => {
      init[p.formula] = p.phase === 's' ? 1.0 : 1.0;
    });
    return init;
  });

  // Reset concentrations when reaction changes
  const handleSelectReaction = (id: string) => {
    setSelectedReactionId(id);
    const rx = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === id) || CURRICULUM_EQUILIBRIUM_REACTIONS[0];
    const init: Record<string, number> = {};
    rx.reactants.forEach(r => {
      init[r.formula] = r.phase === 's' ? 1.0 : 1.0;
    });
    rx.products.forEach(p => {
      init[p.formula] = p.phase === 's' ? 1.0 : 1.0;
    });
    setConcentrations(init);
    setTempCelsius(25);
    setPressureAtm(1.0);
    setIsCatalystActive(false);
    try {
      sound.playUiClick();
    } catch {}
  };

  const handleConcentrationChange = (formula: string, val: number) => {
    setConcentrations(prev => ({
      ...prev,
      [formula]: Math.max(0, Math.round(val * 100) / 100)
    }));
  };

  const handleResetToEquilibrium = () => {
    setTempCelsius(25);
    setPressureAtm(1.0);
    setIsCatalystActive(false);
    const init: Record<string, number> = {};
    selectedReaction.reactants.forEach(r => {
      init[r.formula] = 1.0;
    });
    selectedReaction.products.forEach(p => {
      init[p.formula] = 1.0;
    });
    setConcentrations(init);
    try {
      sound.playUiClick();
    } catch {}
  };

  // Convert Celsius to Kelvin
  const tempKelvin = useMemo(() => tempCelsius + 273.15, [tempCelsius]);

  // Evaluate current equilibrium state
  const evalResult = useMemo(() => {
    const res = EquilibriumEngine.evaluateEquilibriumState(
      selectedReaction,
      concentrations,
      tempKelvin,
      pressureAtm
    );
    if (onEquilibriumStateChange) {
      onEquilibriumStateChange(res);
    }
    return res;
  }, [selectedReaction, concentrations, tempKelvin, pressureAtm, onEquilibriumStateChange]);

  // Tilt angle for the seesaw balance scale (-15 deg to +15 deg)
  const tiltAngle = useMemo(() => {
    if (evalResult.shiftDirection === 'EQUILIBRIUM') return 0;
    if (evalResult.shiftDirection === 'FORWARD') {
      // Tilt left towards products
      return -12;
    }
    // Tilt right towards reactants
    return 12;
  }, [evalResult.shiftDirection]);

  // Dynamic NO2 / N2O4 gas bulb color
  const gasBulbColor = useMemo(() => {
    if (selectedReaction.id !== 'eq_no2_dimerization') return null;
    // Lower temp or higher pressure -> more N2O4 (colorless)
    // Higher temp -> more NO2 (intense reddish-brown #8B1E0F / #A03010)
    const normalizedTemp = Math.min(100, Math.max(0, tempCelsius)); // 0 to 100 C
    const no2Ratio = normalizedTemp / 100;
    const alpha = Math.min(0.95, Math.max(0.08, no2Ratio * (1.5 / Math.sqrt(pressureAtm))));
    return {
      rgba: `rgba(165, 42, 42, ${alpha})`,
      borderRgba: `rgba(180, 50, 40, ${Math.min(1, alpha + 0.3)})`,
      labelVI:
        alpha < 0.2
          ? 'Gần như không màu (N₂O₄ chiếm ưu thế)'
          : alpha < 0.55
          ? 'Màu nâu nhạt'
          : 'Màu nâu đỏ đậm đặc trưng (NO₂ chiếm ưu thế)'
    };
  }, [selectedReaction.id, tempCelsius, pressureAtm]);

  return (
    <div
      className={`bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-slate-100 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Cân Bằng Hóa Học & Le Chatelier
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-normal border border-indigo-500/30">
                GDPT 2018 Hóa 11
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Mô phỏng chuyển dịch trạng thái cân bằng, hằng số Kc & thương số phản ứng Qc
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('VISUAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'VISUAL'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Trực Quan
          </button>
          <button
            onClick={() => setActiveTab('PEDAGOGY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'PEDAGOGY'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cơ Chế & GDPT
          </button>
          <button
            onClick={() => setActiveTab('GAMEPLAY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'GAMEPLAY'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hiệu Ứng Chiến Thuật
          </button>
        </div>
      </div>

      {/* Reaction Picker */}
      <div className="mb-6">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">
          Chọn Phản Ứng Thuận Nghịch Chuẩn GDPT 2018:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {CURRICULUM_EQUILIBRIUM_REACTIONS.map(rx => {
            const isSelected = rx.id === selectedReactionId;
            return (
              <button
                key={rx.id}
                onClick={() => handleSelectReaction(rx.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="text-xs font-bold text-slate-200 truncate">{rx.name_vi}</div>
                <div className="text-xs font-mono text-cyan-400 mt-1">{rx.equation}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chemical State Equation Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 mb-6 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-slate-400">Phương trình hóa học:</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                selectedReaction.isExothermic
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
              }`}
            >
              {selectedReaction.isExothermic
                ? `Tỏa nhiệt (ΔᵣH° = ${selectedReaction.delta_r_H298_kJ} kJ)`
                : `Thu nhiệt (ΔᵣH° = +${selectedReaction.delta_r_H298_kJ} kJ)`}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50">
              Δn khí = {selectedReaction.delta_n_gas > 0 ? `+${selectedReaction.delta_n_gas}` : selectedReaction.delta_n_gas}
            </span>
          </div>
        </div>
        <div className="text-center py-2 text-lg md:text-xl font-bold font-mono text-cyan-300 tracking-wide">
          {selectedReaction.equation}
        </div>
      </div>

      {activeTab === 'VISUAL' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-4">
            {/* Environmental Conditions */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-indigo-400" />
                Biến Số Môi Trường Ngoại Cảnh
              </h3>

              {/* Temperature Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Nhiệt độ (T):
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {tempCelsius}°C ({tempKelvin.toFixed(1)} K)
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="450"
                  step="5"
                  value={tempCelsius}
                  onChange={e => setTempCelsius(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>-20°C (Nước đá muối)</span>
                  <span>25°C (Chuẩn)</span>
                  <span>450°C (Công nghiệp)</span>
                </div>
              </div>

              {/* Pressure Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    Áp suất (P):
                  </span>
                  <span className="font-mono text-sky-300 font-bold">{pressureAtm.toFixed(1)} atm</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="50"
                  step="0.5"
                  value={pressureAtm}
                  onChange={e => setPressureAtm(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>0.2 atm (Giảm áp)</span>
                  <span>1.0 atm (Tiêu chuẩn)</span>
                  <span>50 atm (Nén pit-tông)</span>
                </div>
              </div>

              {/* Catalyst Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/60">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-xs font-semibold text-slate-200">Chất Xúc Tác</span>
                    <p className="text-[10px] text-slate-400">Giảm năng lượng hoạt hóa Eₐ</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCatalystActive(!isCatalystActive);
                    try {
                      if (isCatalystActive) sound.playUiClick();
                      else sound.playCardSelect();
                    } catch {}
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCatalystActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCatalystActive ? 'ĐANG BẬT' : 'TẮT'}
                </button>
              </div>
            </div>

            {/* Concentration Sliders */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Nồng Độ Các Chất [M]
                </h3>
                <button
                  onClick={handleResetToEquilibrium}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  Đặt lại chuẩn
                </button>
              </div>

              <div className="space-y-3">
                {/* Reactants */}
                <div>
                  <span className="text-[11px] font-semibold text-cyan-400 block mb-1.5">
                    Chất phản ứng (Vế trái):
                  </span>
                  {selectedReaction.reactants.map(r => (
                    <div key={r.formula} className="mb-2">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-300 font-mono">[{r.formula}] ({r.name_vi})</span>
                        <span className="font-mono text-cyan-300 font-bold">
                          {(concentrations[r.formula] ?? 1.0).toFixed(2)} M
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="5.0"
                        step="0.05"
                        value={concentrations[r.formula] ?? 1.0}
                        onChange={e => handleConcentrationChange(r.formula, parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Products */}
                <div className="border-t border-slate-700/50 pt-2.5">
                  <span className="text-[11px] font-semibold text-emerald-400 block mb-1.5">
                    Sản phẩm (Vế phải):
                  </span>
                  {selectedReaction.products.map(p => (
                    <div key={p.formula} className="mb-2">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-300 font-mono">[{p.formula}] ({p.name_vi})</span>
                        <span className="font-mono text-emerald-300 font-bold">
                          {(concentrations[p.formula] ?? 1.0).toFixed(2)} M
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="5.0"
                        step="0.05"
                        value={concentrations[p.formula] ?? 1.0}
                        onChange={e => handleConcentrationChange(p.formula, parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Seesaw Scale & Physical Simulators */}
          <div className="lg:col-span-6 space-y-4">
            {/* Dynamic Seesaw Balance Scale */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 self-start flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                Cán Cân Cân Bằng Động (Seesaw Scale)
              </h3>

              {/* Status Pill */}
              <div
                className={`px-4 py-1.5 rounded-full font-bold text-xs border mb-4 shadow-md transition-all ${
                  evalResult.shiftDirection === 'EQUILIBRIUM'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                    : evalResult.shiftDirection === 'FORWARD'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-cyan-500/10 animate-pulse'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10 animate-pulse'
                }`}
              >
                {evalResult.shiftDirection === 'EQUILIBRIUM'
                  ? '⚖️ TRẠNG THÁI CÂN BẰNG (Qc ≈ Kc)'
                  : evalResult.shiftDirection === 'FORWARD'
                  ? '➡️ CHUYỂN DỊCH CHIỀU THUẬN (Tạo sản phẩm)'
                  : '⬅️ CHUYỂN DỊCH CHIỀU NGHỊCH (Tạo chất đầu)'}
              </div>

              {/* Animated SVG Seesaw */}
              <div className="w-full max-w-[340px] h-[170px] relative flex items-center justify-center my-2">
                <svg viewBox="0 0 300 160" className="w-full h-full overflow-visible">
                  {/* Fulcrum (Central Pivot) */}
                  <polygon points="150,90 135,130 165,130" fill="#475569" stroke="#64748b" strokeWidth="2" />
                  <circle cx="150" cy="90" r="5" fill="#a855f7" />
                  <rect x="110" y="130" width="80" height="6" rx="3" fill="#334155" />

                  {/* Tilting Beam */}
                  <g
                    style={{
                      transformOrigin: '150px 90px',
                      transform: `rotate(${tiltAngle}deg)`,
                      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* The Beam */}
                    <rect x="30" y="87" width="240" height="6" rx="3" fill="#94a3b8" />

                    {/* Left Pan (Reactants) */}
                    <line x1="50" y1="90" x2="50" y2="120" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="30" y1="120" x2="70" y2="120" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                    <text x="50" y="140" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Chất Đầu
                    </text>

                    {/* Right Pan (Products) */}
                    <line x1="250" y1="90" x2="250" y2="120" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="230" y1="120" x2="270" y2="120" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                    <text x="250" y="140" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Sản Phẩm
                    </text>
                  </g>
                </svg>
              </div>

              {/* Metrics Readout */}
              <div className="grid grid-cols-2 gap-3 w-full border-t border-slate-700/60 pt-3">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Thương số phản ứng (Qc):</span>
                  <span className="text-sm font-bold font-mono text-cyan-400">
                    {evalResult.reactionQuotientQc === Number.POSITIVE_INFINITY
                      ? '∞'
                      : evalResult.reactionQuotientQc < 1e-3 || evalResult.reactionQuotientQc > 1e4
                      ? evalResult.reactionQuotientQc.toExponential(2)
                      : evalResult.reactionQuotientQc.toFixed(2)}
                  </span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Hằng số cân bằng (Kc ở T):</span>
                  <span className="text-sm font-bold font-mono text-purple-400">
                    {evalResult.effectiveKc < 1e-3 || evalResult.effectiveKc > 1e4
                      ? evalResult.effectiveKc.toExponential(2)
                      : evalResult.effectiveKc.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Specialized Simulator: NO2/N2O4 Gas Color Bulb */}
            {gasBulbColor && (
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    Màu Sắc Ống Nghiệm NO₂ ⇌ N₂O₄
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {tempCelsius <= 10 ? '❄️ Nước lạnh' : tempCelsius >= 80 ? '🔥 Nước sôi' : 'Phòng thường'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* The Sealed Bulb */}
                  <div
                    className="w-20 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-700 relative overflow-hidden shadow-inner"
                    style={{
                      backgroundColor: gasBulbColor.rgba,
                      borderColor: gasBulbColor.borderRgba
                    }}
                  >
                    <div className="absolute top-1 w-6 h-2 rounded-full bg-white/20 blur-[1px]" />
                    <span className="text-[10px] font-mono text-white/80 font-bold drop-shadow">
                      {tempCelsius}°C
                    </span>
                  </div>

                  <div className="flex-1 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-amber-300">{gasBulbColor.labelVI}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      NO₂ có màu nâu đỏ, trong khi N₂O₄ hoàn toàn không màu. Khi ngâm ống nghiệm vào nước đá
                      (hạ nhiệt độ), phản ứng tỏa nhiệt tạo N₂O₄ chiếm ưu thế làm khí nhạt màu!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'PEDAGOGY' && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Lý Giải Khoa Học Theo Chuẩn GDPT 2018 (Hóa Học 11)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {selectedReaction.pedagogicalRationaleVI}
            </p>

            <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-indigo-300">Nguyên lý chuyển dịch Le Chatelier:</div>
              <p className="text-[11px] text-slate-400">
                "Một hệ phản ứng thuận nghịch đang ở trạng thái cân bằng khi chịu một tác động từ bên ngoài
                (nồng độ, nhiệt độ, áp suất) thì cân bằng sẽ chuyển dịch theo chiều làm giảm tác động đó."
              </p>
            </div>
          </div>

          {/* Detailed step analysis */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Phân Tích Chi Tiết Trạng Thái Hiện Tại:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {evalResult.leChatelierAnalysisVI.map((line, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
              {evalResult.leChatelierAnalysisVI.length === 0 && (
                <li className="text-slate-400 italic">
                  Không có tác động ngoại cảnh đáng kể. Hệ đang duy trì ở điều kiện tiêu chuẩn 25°C và 1 atm.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'GAMEPLAY' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/40 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Hiệu Ứng Chiến Thuật Trong Trận Đấu (Duel & MOBA)</h3>
                <span className="text-xs text-indigo-300">Trạng thái: {evalResult.gameplayModifier.statusEffect}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4">{evalResult.gameplayModifier.descriptionVI}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Hồi phục Mana:</span>
                <span
                  className={`text-sm font-bold font-mono ${
                    evalResult.gameplayModifier.manaRegenDeltaPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {evalResult.gameplayModifier.manaRegenDeltaPct > 0
                    ? `+${evalResult.gameplayModifier.manaRegenDeltaPct}%`
                    : `${evalResult.gameplayModifier.manaRegenDeltaPct}%`}
                </span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Hệ số Công kích:</span>
                <span className="text-sm font-bold font-mono text-cyan-400">
                  {evalResult.gameplayModifier.atkMultiplier.toFixed(2)}x
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
