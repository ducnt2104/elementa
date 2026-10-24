import React, { useState, useMemo } from 'react';
import {
  TRANSITION_METALS_SERIES,
  SPECTROCHEMICAL_LIGANDS,
  COORDINATION_COMPLEXES,
  calculateChromateEquilibrium,
  calculateCobaltEquilibrium,
  calculateOctahedralSplitting,
  type TransitionMetal,
  type ComplexIon
} from '../../domain/transitionMetalsEngine';
import { sound } from '../../audio/soundEngine';

type VisualizerMode = 'METALS_SERIES' | 'EQUILIBRIUM_SWITCH' | 'COMPLEXES_AND_CRYSTAL_FIELD';

export const TransitionMetalsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualizerMode>('METALS_SERIES');
  
  // Mode 1 state: Selected Metal
  const [selectedMetal, setSelectedMetal] = useState<TransitionMetal>(
    TRANSITION_METALS_SERIES.find(m => m.symbol === 'Cr') || TRANSITION_METALS_SERIES[0]
  );

  // Mode 2 state: Chromate & Cobalt
  const [chromatePh, setChromatePh] = useState<number>(3.0);
  const [cobaltTemp, setCobaltTemp] = useState<number>(25);
  const [cobaltCl, setCobaltCl] = useState<number>(2.0);
  const [cobaltWater, setCobaltWater] = useState<number>(1.0);

  // Mode 3 state: Complex Ion & Crystal Field
  const [selectedComplexId, setSelectedComplexId] = useState<string>('cu-ammine');
  const [customDCount, setCustomDCount] = useState<number>(5);
  const [customFieldStrength, setCustomFieldStrength] = useState<'YẾU' | 'MẠNH'>('YẾU');

  const selectedComplex = useMemo(() => {
    return COORDINATION_COMPLEXES.find(c => c.id === selectedComplexId) || COORDINATION_COMPLEXES[0];
  }, [selectedComplexId]);

  const chromateResult = useMemo(() => {
    return calculateChromateEquilibrium(chromatePh);
  }, [chromatePh]);

  const cobaltResult = useMemo(() => {
    return calculateCobaltEquilibrium(cobaltTemp, cobaltCl, cobaltWater);
  }, [cobaltTemp, cobaltCl, cobaltWater]);

  const crystalFieldResult = useMemo(() => {
    return calculateOctahedralSplitting(customDCount, customFieldStrength);
  }, [customDCount, customFieldStrength]);

  const handleTabChange = (mode: VisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              GDPT 2018 Grade 12 · Chủ đề 8 · IUPAC Standard
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1">
            KIM LOẠI CHUYỂN TIẾP DÃY THỨ NHẤT & PHỨC CHẤT
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Cấu hình electron phân lớp 3d, cân bằng chuyển màu dung dịch & thuyết trường phối tử (Crystal Field Theory)
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-slate-800/90 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleTabChange('METALS_SERIES')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'METALS_SERIES'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Dãy 3d (Sc → Zn)
          </button>
          <button
            onClick={() => handleTabChange('EQUILIBRIUM_SWITCH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'EQUILIBRIUM_SWITCH'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Cân Bằng Màu Dung Dịch
          </button>
          <button
            onClick={() => handleTabChange('COMPLEXES_AND_CRYSTAL_FIELD')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'COMPLEXES_AND_CRYSTAL_FIELD'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Phức Chất & Tách Orbital d
          </button>
        </div>
      </div>

      {/* MODE 1: TRANSITION METALS 3D SERIES */}
      {activeMode === 'METALS_SERIES' && (
        <div className="mt-6 space-y-6">
          {/* Metals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {TRANSITION_METALS_SERIES.map(metal => {
              const isSelected = selectedMetal.symbol === metal.symbol;
              return (
                <button
                  key={metal.symbol}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedMetal(metal);
                  }}
                  className={`relative p-3 rounded-xl border flex flex-col items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105'
                      : metal.isAnomalous
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                      : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-500'
                  }`}
                >
                  {metal.isAnomalous && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                      !
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-400">Z={metal.atomicNumber}</span>
                  <span className="text-xl font-black text-white my-0.5">{metal.symbol}</span>
                  <span className="text-[10px] text-slate-300 truncate w-full text-center">{metal.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Metal Detailed Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Identity Card */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-[10px] font-mono text-cyan-300">Z={selectedMetal.atomicNumber}</span>
                    <span className="text-2xl font-black text-white">{selectedMetal.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMetal.nameVi}</h3>
                    <span className="text-xs font-mono text-cyan-400">{selectedMetal.electronConfig}</span>
                  </div>
                </div>

                {selectedMetal.isAnomalous && (
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <span className="text-amber-400">⚠️</span> Cấu hình electron bất thường:
                    </div>
                    {selectedMetal.anomalyReason}
                  </div>
                )}

                <div className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {selectedMetal.descriptionVi}
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Các số oxi hóa phổ biến:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMetal.commonOxidationStates.map(ox => (
                    <span
                      key={ox}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60"
                    >
                      +{ox}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Aqueous Ion Colors Gallery */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>🎨</span> Màu sắc các ion trong dung dịch nước GDPT 2018:
              </h4>

              {selectedMetal.colorInAqueous ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(selectedMetal.colorInAqueous).map(([ox, info]) => (
                    <div
                      key={ox}
                      className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex items-center gap-3.5"
                    >
                      <div
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-lg flex-shrink-0 flex items-center justify-center font-mono font-bold text-xs"
                        style={{ backgroundColor: info.hex, color: ox === '7' ? '#fff' : '#0f172a' }}
                      >
                        +{ox}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white truncate">{info.species}</div>
                        <div className="text-[11px] text-cyan-300 font-medium">{info.colorVi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                  Ion không có màu đặc trưng trong dung dịch nước.
                </div>
              )}

              {/* Orbital 3d and 4s visual box */}
              <div className="mt-4 p-4 bg-slate-900/70 rounded-xl border border-slate-700/50">
                <span className="text-xs font-bold text-slate-300 block mb-2">
                  Phân bố electron hóa trị ({selectedMetal.valenceElectrons}):
                </span>
                <div className="flex items-center gap-6">
                  {/* 3d (5 boxes) */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Phân lớp 3d (5 orbital)</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded bg-slate-800 border border-cyan-500/40 flex items-center justify-center text-xs font-mono text-cyan-300"
                        >
                          {selectedMetal.symbol === 'Cr'
                            ? '↿'
                            : selectedMetal.symbol === 'Cu'
                            ? '⥮'
                            : selectedMetal.atomicNumber - 20 <= 5
                            ? idx < selectedMetal.atomicNumber - 20
                              ? '↿'
                              : ''
                            : idx < (selectedMetal.atomicNumber - 20) % 5
                            ? '⥮'
                            : '↿'}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4s (1 box) */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Phân lớp 4s (1 orbital)</span>
                    <div className="w-8 h-8 rounded bg-slate-800 border border-blue-500/40 flex items-center justify-center text-xs font-mono text-blue-300">
                      {selectedMetal.symbol === 'Cr' || selectedMetal.symbol === 'Cu' ? '↿' : '⥮'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: EQUILIBRIUM SWITCH (CHROMATE & COBALT) */}
      {activeMode === 'EQUILIBRIUM_SWITCH' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SECTION A: CHROMATE - DICHROMATE */}
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-amber-300">
                  A. Cân Bằng Chromate ⇌ Dichromate
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  pH Nhạy
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                {chromateResult.chemicalEquation}
              </p>

              {/* Interactive pH Slider */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Độ pH môi trường:</span>
                  <span className="font-mono text-amber-300 font-bold text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    pH = {chromatePh.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={chromatePh}
                  onChange={e => setChromatePh(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>pH 0 (Axit mạnh - Da cam)</span>
                  <span>pH 6 (Chuyển tiếp)</span>
                  <span>pH 14 (Bazơ mạnh - Vàng)</span>
                </div>
              </div>

              {/* Visual Beaker Flask */}
              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <svg width="120" height="130" viewBox="0 0 120 130">
                    <path
                      d="M40 10 L40 35 L15 105 A15 15 0 0 0 30 120 L90 120 A15 15 0 0 0 105 105 L80 35 L80 10 Z"
                      fill="#1e293b"
                      stroke="#94a3b8"
                      strokeWidth="2.5"
                    />
                    {/* Liquid fill */}
                    <path
                      d="M24 85 L30 118 L90 118 L96 85 Z"
                      fill={chromateResult.colorHex}
                      opacity="0.85"
                      className="transition-colors duration-300"
                    />
                  </svg>
                  <span
                    className="mt-2 text-xs font-bold px-3 py-1 rounded-full border shadow-md text-slate-900"
                    style={{ backgroundColor: chromateResult.colorHex, borderColor: '#ffffff40' }}
                  >
                    {chromateResult.solutionColorVi}
                  </span>
                </div>
              </div>

              {/* Composition Bar */}
              <div className="mt-6 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-amber-500 font-bold">Cr₂O₇²⁻ (Da cam): {chromateResult.cr2O7Percentage}%</span>
                  <span className="text-yellow-400 font-bold">CrO₄²⁻ (Vàng): {chromateResult.crO4Percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-200"
                    style={{ width: `${chromateResult.cr2O7Percentage}%` }}
                  />
                  <div
                    className="h-full bg-yellow-400 transition-all duration-200"
                    style={{ width: `${chromateResult.crO4Percentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              {chromateResult.explanationVi}
            </div>
          </div>

          {/* SECTION B: COBALT CHLORIDE SWITCH */}
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  B. Cân Bằng Cobalt Octahedral ⇌ Tetrahedral
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Nhiệt độ & [Cl⁻]
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                {cobaltResult.reactionEquation}
              </p>

              {/* Sliders */}
              <div className="mt-4 space-y-3">
                {/* Temp */}
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">Nhiệt độ (T):</span>
                    <span className="font-mono text-cyan-300 font-bold text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {cobaltTemp}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cobaltTemp}
                    onChange={e => setCobaltTemp(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* Chloride Concentration */}
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">Nồng độ ion Cl⁻ (M):</span>
                    <span className="font-mono text-blue-400 font-bold text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {cobaltCl.toFixed(1)} M
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.2"
                    value={cobaltCl}
                    onChange={e => setCobaltCl(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Water Dilution */}
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">Lượng nước pha loãng:</span>
                    <span className="font-mono text-pink-400 font-bold text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {cobaltWater.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={cobaltWater}
                    onChange={e => setCobaltWater(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>

              {/* Visual Test Tube */}
              <div className="mt-4 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <svg width="70" height="110" viewBox="0 0 70 110">
                    <rect x="20" y="10" width="30" height="80" rx="15" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
                    <rect
                      x="23"
                      y="40"
                      width="24"
                      height="48"
                      rx="12"
                      fill={cobaltResult.colorHex}
                      opacity="0.85"
                      className="transition-colors duration-300"
                    />
                  </svg>
                  <span
                    className="mt-1 text-xs font-bold px-3 py-1 rounded-full border shadow-md text-white"
                    style={{ backgroundColor: cobaltResult.colorHex, borderColor: '#ffffff40' }}
                  >
                    {cobaltResult.solutionColorVi}
                  </span>
                </div>
              </div>

              {/* Ratio Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-pink-400 font-bold">[Co(H₂O)₆]²⁺: {cobaltResult.coH2O6Percentage}%</span>
                  <span className="text-blue-500 font-bold">[CoCl₄]²⁻: {cobaltResult.coCl4Percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-pink-500 transition-all duration-200"
                    style={{ width: `${cobaltResult.coH2O6Percentage}%` }}
                  />
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${cobaltResult.coCl4Percentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              {cobaltResult.explanationVi}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: COORDINATION COMPLEXES & CRYSTAL FIELD SPLITTING */}
      {activeMode === 'COMPLEXES_AND_CRYSTAL_FIELD' && (
        <div className="mt-6 space-y-6">
          {/* Complexes Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {COORDINATION_COMPLEXES.map(complex => {
              const isSelected = complex.id === selectedComplexId;
              return (
                <button
                  key={complex.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedComplexId(complex.id);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                      : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {complex.formula}
                </button>
              );
            })}
          </div>

          {/* Selected Complex Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Identity & Geometry */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-black text-white">{selectedComplex.formula}</span>
                  <div
                    className="w-5 h-5 rounded-full border border-white/30"
                    style={{ backgroundColor: selectedComplex.colorHex }}
                  />
                </div>
                <div className="text-xs text-cyan-400 font-semibold mt-1">{selectedComplex.iupacNameVi}</div>
                <div className="mt-3 text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Màu sắc: </span>
                  <span className="font-bold text-white">{selectedComplex.solutionColorVi}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                  <span className="text-slate-400">Ion trung tâm:</span>
                  <span className="font-mono font-bold text-white">
                    {selectedComplex.centralAtom}(+{selectedComplex.centralOxidationState}) — d{selectedComplex.dElectronsCount}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                  <span className="text-slate-400">Số phối trí:</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedComplex.coordinationNumber}</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                  <span className="text-slate-400">Hình học phân tử:</span>
                  <span className="font-bold text-amber-300">{selectedComplex.geometry}</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                  <span className="text-slate-400">Điện tích phức:</span>
                  <span className="font-mono font-bold text-white">{selectedComplex.netCharge > 0 ? `+${selectedComplex.netCharge}` : selectedComplex.netCharge}</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                  <span className="text-slate-400">Tính chất từ:</span>
                  <span className="font-bold text-emerald-400">
                    {selectedComplex.magneticNature} ({selectedComplex.unpairedElectrons} e độc thân, {selectedComplex.magneticMomentBM} BM)
                  </span>
                </div>
              </div>

              {selectedComplex.specialApplicationVi && (
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 leading-relaxed">
                  <span className="font-bold text-cyan-300">Ứng dụng GDPT 2018: </span>
                  {selectedComplex.specialApplicationVi}
                </div>
              )}
            </div>

            {/* Interactive Crystal Field Splitting Diagram (Thuyết trường tinh thể) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700 gap-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>⚛️</span> Mô Phỏng Tách Năng Lượng Orbital d (Trường Bát Diện):
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Số electron d:</span>
                  <select
                    value={customDCount}
                    onChange={e => setCustomDCount(parseInt(e.target.value, 10))}
                    className="bg-slate-900 text-cyan-300 text-xs font-mono font-bold rounded px-2 py-1 border border-slate-700"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>d{n}</option>
                    ))}
                  </select>

                  <div className="flex p-0.5 bg-slate-900 rounded border border-slate-700 ml-2">
                    <button
                      onClick={() => setCustomFieldStrength('YẾU')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        customFieldStrength === 'YẾU' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Trường yếu (High Spin)
                    </button>
                    <button
                      onClick={() => setCustomFieldStrength('MẠNH')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        customFieldStrength === 'MẠNH' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Trường mạnh (Low Spin)
                    </button>
                  </div>
                </div>
              </div>

              {/* Energy Diagram Graphic */}
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-700/80 relative">
                {/* Energy axis */}
                <div className="absolute left-4 top-4 bottom-4 w-6 flex flex-col items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Năng lượng (E) ↑</span>
                  <span>0</span>
                </div>

                <div className="ml-16 space-y-8">
                  {/* eg levels (raised +0.6 Delta_o) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-amber-400 font-bold">Mức eg (dx²-y², dz²) [ +0.6 Δₒ ]</span>
                      <span className="text-[11px] text-slate-400 font-mono">{crystalFieldResult.eg} electron</span>
                    </div>
                    <div className="flex gap-4">
                      {Array.from({ length: 2 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-12 rounded-xl bg-slate-800 border-2 border-amber-500/60 flex items-center justify-center text-lg font-mono font-bold text-amber-300 shadow-md"
                        >
                          {crystalFieldResult.eg === 0
                            ? ''
                            : crystalFieldResult.eg === 1
                            ? idx === 0 ? '↿' : ''
                            : crystalFieldResult.eg === 2
                            ? '↿'
                            : crystalFieldResult.eg === 3
                            ? idx === 0 ? '⥮' : '↿'
                            : '⥮'}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Splitting Energy Delta_o Gap */}
                  <div className="flex items-center gap-3 pl-8">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-amber-400 to-cyan-400" />
                    <span className="text-xs font-mono text-cyan-300">
                      Năng lượng tách trường bát diện (Δₒ)
                    </span>
                  </div>

                  {/* t2g levels (lowered -0.4 Delta_o) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-cyan-400 font-bold">Mức t2g (dxy, dyz, dxz) [ -0.4 Δₒ ]</span>
                      <span className="text-[11px] text-slate-400 font-mono">{crystalFieldResult.t2g} electron</span>
                    </div>
                    <div className="flex gap-4">
                      {Array.from({ length: 3 }).map((_, idx) => {
                        const count = crystalFieldResult.t2g;
                        let text = '';
                        if (count <= 3) {
                          text = idx < count ? '↿' : '';
                        } else {
                          const pairedCount = count - 3;
                          text = idx < pairedCount ? '⥮' : '↿';
                        }
                        return (
                          <div
                            key={idx}
                            className="w-16 h-12 rounded-xl bg-slate-800 border-2 border-cyan-500/60 flex items-center justify-center text-lg font-mono font-bold text-cyan-300 shadow-md"
                          >
                            {text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Calculated Physics Summary */}
                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 bg-slate-800/60 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Trạng thái spin</span>
                    <span className="text-xs font-bold text-cyan-300">{crystalFieldResult.spinType}</span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Số e độc thân (n)</span>
                    <span className="text-xs font-mono font-bold text-white">{crystalFieldResult.unpaired}</span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Từ tính</span>
                    <span className="text-xs font-bold text-emerald-400">{crystalFieldResult.magneticNature}</span>
                  </div>
                  <div className="p-2 bg-slate-800/60 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Mômen từ (μ)</span>
                    <span className="text-xs font-mono font-bold text-amber-300">{crystalFieldResult.magneticMomentBM} BM</span>
                  </div>
                </div>
              </div>

              {/* Spectrochemical Ribbon */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <span className="text-xs font-bold text-slate-300 block mb-2">
                  Dãy hóa phổ phối tử (Spectrochemical Series):
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                  {SPECTROCHEMICAL_LIGANDS.map((ligand, i) => (
                    <React.Fragment key={ligand.formula}>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          ligand.fieldStrength === 'YẾU'
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                            : ligand.fieldStrength === 'TRUNG_BÌNH'
                            ? 'bg-slate-800 text-slate-300 border border-slate-600'
                            : 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40'
                        }`}
                      >
                        {ligand.formula}
                      </span>
                      {i < SPECTROCHEMICAL_LIGANDS.length - 1 && (
                        <span className="text-slate-500 font-bold">&lt;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitionMetalsVisualizer;
