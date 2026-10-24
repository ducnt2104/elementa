import React, { useState, useMemo } from 'react';
import {
  CURRICULUM_CARBONYLS,
  CURRICULUM_CARBOXYLIC_ACIDS,
  evaluateTollensTest,
  evaluateFehlingTest,
  evaluateIodoformTest,
  evaluateAcidReaction,
  type CarbonylDef,
  type CarboxylicAcidDef
} from '../../domain/carbonylCarboxylicEngine';
import { sound } from '../../audio/soundEngine';

type VisualizerMode = 'TOLLENS_FEHLING' | 'IODOFORM_HALOFORM' | 'CARBOXYLIC_ACID_LAB';

export const CarbonylCarboxylicVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualizerMode>('TOLLENS_FEHLING');

  // Mode 1 state: Tollens & Fehling
  const [selectedTollensCompoundId, setSelectedTollensCompoundId] = useState<string>('formaldehyde');
  const [tollensMoles, setTollensMoles] = useState<number>(0.01);

  // Mode 2 state: Iodoform
  const [selectedIodoformCompoundId, setSelectedIodoformCompoundId] = useState<string>('acetone');
  const [iodoformMoles, setIodoformMoles] = useState<number>(0.01);

  // Mode 3 state: Carboxylic Acids
  const [selectedAcidId, setSelectedAcidId] = useState<string>('acetic-acid');
  const [acidReagent, setAcidReagent] = useState<'NA' | 'NAOH' | 'NA2CO3' | 'CUO'>('NA2CO3');

  const tollensResult = useMemo(() => {
    return evaluateTollensTest(selectedTollensCompoundId, tollensMoles);
  }, [selectedTollensCompoundId, tollensMoles]);

  const fehlingResult = useMemo(() => {
    return evaluateFehlingTest(selectedTollensCompoundId);
  }, [selectedTollensCompoundId]);

  const iodoformResult = useMemo(() => {
    return evaluateIodoformTest(selectedIodoformCompoundId, iodoformMoles);
  }, [selectedIodoformCompoundId, iodoformMoles]);

  const acidReactionResult = useMemo(() => {
    return evaluateAcidReaction(selectedAcidId, acidReagent);
  }, [selectedAcidId, acidReagent]);

  const selectedAcid = useMemo(() => {
    return CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === selectedAcidId) || CURRICULUM_CARBOXYLIC_ACIDS[0];
  }, [selectedAcidId]);

  const handleTabChange = (mode: VisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_#fbbf24]" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              GDPT 2018 Grade 11 · Chủ đề 6 · IUPAC Standard
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1">
            HỢP CHẤT CARBONYL & AXIT CACBOXYLIC
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Phản ứng tráng bạc (Tollens 1:4 Ag), thử nghiệm Fehling đỏ gạch, phản ứng iođofom & độ axit
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-800/90 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleTabChange('TOLLENS_FEHLING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'TOLLENS_FEHLING'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Tráng Bạc & Fehling
          </button>
          <button
            onClick={() => handleTabChange('IODOFORM_HALOFORM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'IODOFORM_HALOFORM'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Thử Nghiệm Iođofom (CHI₃)
          </button>
          <button
            onClick={() => handleTabChange('CARBOXYLIC_ACID_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'CARBOXYLIC_ACID_LAB'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Axit Cacboxylic & Sủi Bọt CO₂
          </button>
        </div>
      </div>

      {/* MODE 1: TOLLENS SILVER MIRROR & FEHLING TEST */}
      {activeMode === 'TOLLENS_FEHLING' && (
        <div className="mt-6 space-y-6">
          {/* Compound Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Chọn mẫu thử nghiệm:</span>
            {[
              { id: 'formaldehyde', label: 'HCHO (Fomanđehit)', tag: 'Tỉ lệ 1:4 Ag' },
              { id: 'acetaldehyde', label: 'CH₃CHO (Axetanđehit)', tag: 'Tỉ lệ 1:2 Ag' },
              { id: 'benzaldehyde', label: 'C₆H₅CHO (Benzanđehit)', tag: 'Anđehit thơm' },
              { id: 'formic-acid', label: 'HCOOH (Axit fomic)', tag: 'Axit tráng bạc' },
              { id: 'acetone', label: 'CH₃COCH₃ (Axeton)', tag: 'Xeton (Trơ)' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedTollensCompoundId(c.id);
                }}
                className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                  selectedTollensCompoundId === c.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                    : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div>{c.label}</div>
                <div className="text-[10px] text-slate-400 font-normal">{c.tag}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECTION A: TOLLENS SILVER MIRROR */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>🪞</span> Thuốc Thử Tollens ([Ag(NH₃)₂]OH, t°)
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      tollensResult.isPositive
                        ? 'bg-slate-200 text-slate-950 border-white'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {tollensResult.isPositive ? `${tollensResult.silverEquivalentsPerMole} mol Ag / mol` : 'Âm tính'}
                  </span>
                </div>

                {/* Silver Flask SVG */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="relative flex flex-col items-center">
                    <svg width="110" height="120" viewBox="0 0 110 120">
                      <path
                        d="M38 10 L38 35 L12 95 A15 15 0 0 0 25 110 L85 110 A15 15 0 0 0 98 95 L72 35 L72 10 Z"
                        fill={tollensResult.isPositive ? 'url(#silverGradient)' : '#1e293b'}
                        stroke={tollensResult.isPositive ? '#e2e8f0' : '#475569'}
                        strokeWidth="2.5"
                      />
                      <defs>
                        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="40%" stopColor="#94a3b8" />
                          <stop offset="60%" stopColor="#f1f5f9" />
                          <stop offset="100%" stopColor="#64748b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[11px] font-mono text-slate-400 mt-2">Bình tráng bạc</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Số mol mẫu: </span>
                      <strong className="text-white">{tollensMoles.toFixed(3)} mol</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Khối lượng Ag thu được: </span>
                      <strong className="text-amber-300 font-mono text-sm">{tollensResult.silverMassG} g</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Hiện tượng: </span>
                      <span className="text-slate-200">{tollensResult.solutionAppearanceVi}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-cyan-300 bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                  {tollensResult.chemicalEquation}
                </div>
              </div>

              {tollensResult.isPedagogicalTrap && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                  <span className="font-bold">⚠️ Bẫy đề thi GDPT 2018: </span>
                  {tollensResult.explanationVi}
                </div>
              )}
            </div>

            {/* SECTION B: FEHLING TEST (Cu(OH)2 in alkaline medium) */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                    <span>🧱</span> Phản Ứng Với Cu(OH)₂ Trong Kiềm Nóng (Fehling)
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      fehlingResult.isPositive
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {fehlingResult.isPositive ? 'Cu₂O↓ (Đỏ gạch)' : 'Không phản ứng'}
                  </span>
                </div>

                {/* Visual Fehling Tube */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-28 rounded-b-xl border-2 border-slate-600 bg-slate-900/80 relative overflow-hidden flex flex-col justify-end p-1">
                      <div
                        className="w-full transition-all duration-300 rounded-b-lg flex items-center justify-center text-[9px] font-bold text-white"
                        style={{
                          height: fehlingResult.isPositive ? '45px' : '15px',
                          backgroundColor: fehlingResult.precipitateColorHex
                        }}
                      >
                        {fehlingResult.isPositive ? 'Cu₂O↓' : 'CuO đen'}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-2">Ống nghiệm đun nóng</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Kết tủa: </span>
                      <strong className="text-red-400">{fehlingResult.cu2oColorVi}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Trạng thái oxi hóa: </span>
                      <span className="text-slate-200">Cu²⁺ bị khử về Cu⁺ (Cu₂O)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-red-300 bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                  {fehlingResult.chemicalEquation}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {fehlingResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: IODOFORM / HALOFORM TEST */}
      {activeMode === 'IODOFORM_HALOFORM' && (
        <div className="mt-6 space-y-6">
          {/* Carbonyl Selector for Iodoform */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Chọn hợp chất thử iodoform:</span>
            {CURRICULUM_CARBONYLS.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedIodoformCompoundId(c.id);
                }}
                className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                  selectedIodoformCompoundId === c.id
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                    : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                }`}
              >
                {c.formula} ({c.nameVi})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Input Controls */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200">Thông số phản ứng:</h4>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Lượng chất phản ứng:</span>
                  <span className="font-mono text-yellow-300 font-bold">{iodoformMoles.toFixed(3)} mol</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.005"
                  value={iodoformMoles}
                  onChange={e => setIodoformMoles(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              {/* Visual Tube of CHI3 */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 flex flex-col items-center">
                <div className="w-16 h-28 rounded-b-xl border-2 border-slate-600 bg-slate-800 relative overflow-hidden flex flex-col justify-end p-1">
                  <div
                    className="w-full transition-all duration-300 rounded-b-lg flex items-center justify-center text-[9px] font-bold text-slate-950"
                    style={{
                      height: iodoformResult.isPositive ? '40px' : '0px',
                      backgroundColor: iodoformResult.precipitateColorHex
                    }}
                  >
                    {iodoformResult.isPositive ? 'CHI₃↓' : ''}
                  </div>
                </div>
                <span className="text-xs font-bold mt-2 text-white">
                  {iodoformResult.isPositive ? `${iodoformResult.precipitateMassG} g CHI₃` : 'Không có kết tủa'}
                </span>
              </div>
            </div>

            {/* Reaction Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-mono text-yellow-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/70">
                {iodoformResult.chemicalEquation}
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-300 leading-relaxed">
                {iodoformResult.explanationVi}
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                <span className="font-bold">Quy tắc nhận biết nhóm Metyl Cacbonyl: </span>
                Phản ứng tạo iodoform (kết tủa vàng CHI₃ có mùi sát trùng y tế) là dấu hiệu đặc trưng khẳng định sự có mặt của nhóm <strong className="text-white">CH₃-C=O</strong> (như axetanđehit CH₃CHO, axeton CH₃COCH₃) hoặc nhóm <strong className="text-white">CH₃-CH(OH)-</strong> (như etanol CH₃CH₂OH, propan-2-ol).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: CARBOXYLIC ACIDS ACIDITY & CO2 EFFERVESCENCE */}
      {activeMode === 'CARBOXYLIC_ACID_LAB' && (
        <div className="mt-6 space-y-6">
          {/* Acid Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {CURRICULUM_CARBOXYLIC_ACIDS.map(acid => {
              const isSelected = acid.id === selectedAcidId;
              return (
                <button
                  key={acid.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedAcidId(acid.id);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                      : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {acid.formula} ({acid.nameVi})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Acidity Profile & Ranking */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">{selectedAcid.nameVi}</h4>
                  <span className="text-xs font-mono text-amber-400 font-bold">pKa = {selectedAcid.pKa}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">{selectedAcid.nameIupac}</div>
                <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {selectedAcid.descriptionVi}
                </div>
              </div>

              {/* Reagent Switcher */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-slate-400 block mb-1">Thử nghiệm phản ứng:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'NA', label: '+ Na (sủi bọt H₂)' },
                    { id: 'NAOH', label: '+ NaOH (trung hòa)' },
                    { id: 'NA2CO3', label: '+ Na₂CO₃ (sủi bọt CO₂)' },
                    { id: 'CUO', label: '+ CuO (đen -> lam)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        sound.playUiClick();
                        setAcidReagent(r.id as any);
                      }}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        acidReagent === r.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reaction Simulation & Bubbles */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-700/70 flex items-center gap-6">
                {/* SVG Beaker with dynamic bubbles */}
                <div className="relative">
                  <svg width="90" height="110" viewBox="0 0 90 110">
                    <rect x="15" y="15" width="60" height="85" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
                    <rect
                      x="18"
                      y="45"
                      width="54"
                      height="52"
                      rx="6"
                      fill={acidReagent === 'CUO' ? '#0284c7' : '#38bdf8'}
                      opacity="0.8"
                    />
                    {/* Animated bubbles if gas is evolved */}
                    {acidReactionResult.gasEvolved && (
                      <>
                        <circle cx="35" cy="70" r="3" fill="#ffffff" opacity="0.8" className="animate-bounce" />
                        <circle cx="50" cy="60" r="4" fill="#ffffff" opacity="0.9" className="animate-pulse" />
                        <circle cx="45" cy="80" r="2.5" fill="#ffffff" opacity="0.7" className="animate-bounce" />
                      </>
                    )}
                  </svg>
                </div>

                <div className="space-y-2 text-xs flex-1">
                  <div className="p-2.5 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">Khí thoát ra: </span>
                    <strong className="text-amber-300 font-mono text-sm">
                      {acidReactionResult.gasEvolved || 'Không có khí'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">Hiện tượng: </span>
                    <span className="text-white font-semibold">{acidReactionResult.solutionColorChangeVi}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono text-amber-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/70">
                {acidReactionResult.chemicalEquation}
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-300 leading-relaxed">
                {acidReactionResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonylCarboxylicVisualizer;
