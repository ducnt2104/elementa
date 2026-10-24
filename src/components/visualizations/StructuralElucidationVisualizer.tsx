// src/components/visualizations/StructuralElucidationVisualizer.tsx
// ============================================================================
// ELEMENTA MULTI-SPECTROSCOPIC STRUCTURAL ELUCIDATION & ISOMER DISCRIMINATOR
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 Chemistry 11/12
// Cross-validates all 4 analytical spectroscopy pillars (Combustion EA + MS + IR + NMR),
// Interactive 6-step deductive reasoning chain, side-by-side constitutional isomer comparator,
// and real-time IHD / Degree of Unsaturation calculator.
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  ISOMER_CHALLENGE_SETS,
  IsomerChallengeSet,
  MultiSpectroCompound,
  calculateIHD,
  parseFormulaAndCalculateIHD,
  calculateEmpiricalFormula,
  executeStepwiseElucidation,
} from '../../domain/structuralElucidationEngine';
import { sound } from '../../audio/soundEngine';

export interface StructuralElucidationVisualizerProps {
  initialSetId?: string;
}

export const StructuralElucidationVisualizer: React.FC<StructuralElucidationVisualizerProps> = ({
  initialSetId,
}) => {
  const [selectedSetId, setSelectedSetId] = useState<string>(initialSetId || 'set_C3H6O');
  const [selectedIsomerIndex, setSelectedIsomerIndex] = useState<number>(0);
  const [activeViewMode, setActiveViewMode] = useState<'stepwise' | 'comparator' | 'calculator'>('stepwise');

  // Calculator inputs
  const [calcFormulaInput, setCalcFormulaInput] = useState<string>('C6H5CH3');
  const [calcPercentC, setCalcPercentC] = useState<number>(62.04);
  const [calcPercentH, setCalcPercentH] = useState<number>(10.41);
  const [calcPercentO, setCalcPercentO] = useState<number>(27.55);
  const [calcMz, setCalcMz] = useState<number>(58);

  const challengeSet: IsomerChallengeSet = ISOMER_CHALLENGE_SETS[selectedSetId] || ISOMER_CHALLENGE_SETS.set_C3H6O;
  const currentCompound: MultiSpectroCompound = challengeSet.isomers[selectedIsomerIndex] || challengeSet.isomers[0];

  // Stepwise deduction for current compound
  const deduction = useMemo(() => {
    return executeStepwiseElucidation({
      composition: currentCompound.elementalComposition,
      molecularIonMz: currentCompound.msFingerprint.molecularIonMz,
      irKeyWaveNumbers: currentCompound.irFingerprint.keyBandsCm.map(b => b.waveNumber),
      nmr1HSignalsCount: currentCompound.nmr1HFingerprint.signalCount,
      hasAldehydePeak1H: currentCompound.nmr1HFingerprint.signals.some(s => s.deltaPpm > 9.0),
      hasCarboxylicAcidPeak1H: currentCompound.nmr1HFingerprint.signals.some(s => s.deltaPpm > 10.5),
      hasAromaticMultiplet1H: currentCompound.nmr1HFingerprint.signals.some(s => s.deltaPpm > 6.5 && s.deltaPpm < 8.5),
    });
  }, [currentCompound]);

  // Dynamic IHD calculation for custom formula
  const calculatedIHDResult = useMemo(() => {
    return parseFormulaAndCalculateIHD(calcFormulaInput);
  }, [calcFormulaInput]);

  // Dynamic Empirical calculation from user percentages
  const calculatedEmpirical = useMemo(() => {
    return calculateEmpiricalFormula({
      percentC: calcPercentC,
      percentH: calcPercentH,
      percentO: calcPercentO > 0 ? calcPercentO : undefined,
    });
  }, [calcPercentC, calcPercentH, calcPercentO]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* HEADER & BADGES */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
              IUPAC & GDPT 2018 Chemistry
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Giải Đoán Cấu Trúc Đa Phổ
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              EA + MS + IR + NMR (4 Trụ Cột)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            🧬 Hệ Thống Phân Định Đồng Phân & Giải Đoán Phổ Hóa Học
          </h2>
          <p className="text-xs text-slate-400">
            Kết hợp phân tích nguyên tố, độ bất bão hòa IHD, mảnh vỡ phổ khối MS, dao động hồng ngoại IR và cộng hưởng từ NMR để giải mã cấu trúc phân tử.
          </p>
        </div>

        {/* VIEW MODE TABS */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setActiveViewMode('stepwise');
              sound.playPhotodetectorBeep?.();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeViewMode === 'stepwise'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 6 Bước Giải Đoán
          </button>
          <button
            onClick={() => {
              setActiveViewMode('comparator');
              sound.playIsomerCompareSwoosh?.();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeViewMode === 'comparator'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚖️ So Sánh Đồng Phân
          </button>
          <button
            onClick={() => {
              setActiveViewMode('calculator');
              sound.playPhotodetectorBeep?.();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeViewMode === 'calculator'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧮 Máy Tính IHD & CTPT
          </button>
        </div>
      </div>

      {/* CHALLENGE SET SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Bộ Thử Thách Đồng Phân GDPT 2018:
          </label>
          <select
            value={selectedSetId}
            onChange={(e) => {
              setSelectedSetId(e.target.value);
              setSelectedIsomerIndex(0);
              sound.playIsomerCompareSwoosh?.();
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {Object.values(ISOMER_CHALLENGE_SETS).map((s) => (
              <option key={s.setId} value={s.setId}>
                {s.titleVI} ({s.molecularFormula})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Chọn Đồng Phân Cụ Thể:
          </label>
          <div className="flex gap-2">
            {challengeSet.isomers.map((iso, idx) => (
              <button
                key={iso.id}
                onClick={() => {
                  setSelectedIsomerIndex(idx);
                  sound.playIsomerCompareSwoosh?.();
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
                  selectedIsomerIndex === idx
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {iso.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-center">
          <div className="text-[11px] text-slate-400">Công thức & Độ bất bão hòa:</div>
          <div className="text-base font-mono font-bold text-cyan-400 flex items-baseline gap-2 mt-0.5">
            <span>{challengeSet.molecularFormula}</span>
            <span className="text-xs text-slate-400 font-normal">M = {challengeSet.molecularWeight}</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              IHD = {challengeSet.ihd}
            </span>
          </div>
        </div>
      </div>

      {/* VIEW 1: STEPWISE DEDUCTIVE REASONING CHAIN */}
      {activeViewMode === 'stepwise' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <span>🔬 Chuỗi Lập Luận 6 Bước Giải Đoán:</span>
              <span className="text-purple-400 font-mono">{currentCompound.vietnameseName}</span>
              <span className="text-xs text-slate-400 font-normal">({currentCompound.functionalClassVI})</span>
            </h3>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  1
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-blue-300">Bước 1: Phân Tích Nguyên Tố (Combustion Analysis)</div>
                  <div className="text-slate-300 font-mono">
                    %C = {currentCompound.elementalComposition.percentC}%, %H = {currentCompound.elementalComposition.percentH}%
                    {currentCompound.elementalComposition.percentO !== undefined && `, %O = ${currentCompound.elementalComposition.percentO}%`}
                  </div>
                  <div className="text-slate-400">{deduction.step1Empirical}</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  2
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-emerald-300">Bước 2: Phổ Khối Lượng MS (Xác Định Phân Tử Khối)</div>
                  <div className="text-slate-300 font-mono">
                    Pic ion phân tử [M]⁺• tại m/z = {currentCompound.msFingerprint.molecularIonMz} | Pic cơ sở m/z = {currentCompound.msFingerprint.basePeakMz}
                  </div>
                  <div className="text-slate-400">{deduction.step2MolecularFormula}</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  3
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-amber-300">Bước 3: Tính Độ Bất Bão Hòa (IHD = C - H/2 + N/2 - X/2 + 1)</div>
                  <div className="text-slate-300 font-mono">
                    IHD = {deduction.step3IHD} (Index of Hydrogen Deficiency / Double Bond Equivalent)
                  </div>
                  <div className="text-slate-400">{deduction.step3IHDInterpretationVI}</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  4
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-rose-300">Bước 4: Phổ Hồng Ngoại IR (Nhận Diện Nhóm Chức)</div>
                  <div className="text-slate-300">
                    {currentCompound.irFingerprint.keyBandsCm.map((b, i) => (
                      <span key={i} className="inline-block mr-2 font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {b.waveNumber} cm⁻¹ ({b.bond})
                      </span>
                    ))}
                  </div>
                  <ul className="text-slate-400 list-disc pl-4 space-y-0.5">
                    {deduction.step4IRFunctionalGroupsVI.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  5
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-cyan-300">Bước 5: Phổ NMR (Tính Đối Xứng & Môi Trường Proton/Carbon)</div>
                  <div className="text-slate-300 font-mono">
                    ¹H NMR: {currentCompound.nmr1HFingerprint.signalCount} tín hiệu | ¹³C NMR: {currentCompound.nmr13CFingerprint.signalCount} tín hiệu
                  </div>
                  <div className="text-slate-400">{deduction.step5NMRSymmetryInterpretationVI}</div>
                  <div className="text-slate-500 text-[11px] italic">{currentCompound.symmetryExplanationVI}</div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-purple-950/40 p-3.5 rounded-lg border border-purple-500/40 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                  ✔
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-purple-300 text-sm">Bước 6: Kết Luận Cấu Trúc IUPAC Chính Xác</div>
                  <div className="text-white font-mono font-bold text-base">
                    {currentCompound.iupacName} ({currentCompound.vietnameseName})
                  </div>
                  <div className="text-emerald-300 font-semibold">{deduction.step6IdentifiedCompoundVI}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SIDE-BY-SIDE CONSTITUTIONAL ISOMER COMPARATOR */}
      {activeViewMode === 'comparator' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>⚖️ Bảng Đối Chiếu Phổ Đa Chiều Các Đồng Phân Của</span>
                <span className="text-cyan-400 font-mono">{challengeSet.molecularFormula}</span>
              </h3>
              <button
                onClick={() => sound.playAnalyticalDeductionSuccess?.()}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>✨ Phát Âm Thanh Xác Nhận</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {challengeSet.isomers.map((iso) => (
                <div
                  key={iso.id}
                  className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-white">{iso.name}</span>
                      <span className="text-[10px] bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                        {iso.functionalClassVI}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{iso.vietnameseName}</div>

                    <div className="mt-3 space-y-2 text-xs">
                      {/* MS */}
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <span className="text-emerald-400 font-semibold block text-[11px]">📊 Phổ Khối MS:</span>
                        <div className="font-mono text-slate-300 text-[11px]">
                          [M]⁺ = {iso.msFingerprint.molecularIonMz} | Base = {iso.msFingerprint.basePeakMz}
                        </div>
                      </div>

                      {/* IR */}
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <span className="text-rose-400 font-semibold block text-[11px]">🌊 Phổ Hồng Ngoại IR:</span>
                        <div className="font-mono text-slate-300 text-[11px]">
                          {iso.irFingerprint.keyBandsCm.map(b => `${b.waveNumber} (${b.bond})`).join(', ')}
                        </div>
                      </div>

                      {/* NMR */}
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <span className="text-cyan-400 font-semibold block text-[11px]">📡 Phổ ¹H & ¹³C NMR:</span>
                        <div className="font-mono text-slate-300 text-[11px]">
                          ¹H: {iso.nmr1HFingerprint.signalCount} mũi | ¹³C: {iso.nmr13CFingerprint.signalCount} mũi
                        </div>
                        <div className="text-slate-400 text-[10px] mt-0.5">
                          {iso.nmr1HFingerprint.signals.map(s => `${s.deltaPpm}ppm (${s.multiplicity})`).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800 italic">
                    {iso.symmetryExplanationVI}
                  </div>
                </div>
              ))}
            </div>

            {/* Discrimination Guidelines */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>💡 Bí Quyết Nhận Diện Nhanh Trong Kỳ Thi Hóa Học:</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc">
                {challengeSet.discriminationGuideVI.map((g, idx) => (
                  <li key={idx} className="leading-relaxed">{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: INTERACTIVE IHD & FORMULA CALCULATOR */}
      {activeViewMode === 'calculator' && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🧮 Máy Tính Độ Bất Bão Hòa IHD & Thiết Lập Công Thức Đơn Giản Nhất</span>
            </h3>
            <p className="text-xs text-slate-400">
              Nhập công thức phân tử hoặc thành phần phần trăm khối lượng để tính toán tức thời theo chuẩn IUPAC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: IHD Calculator */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                1. Tính Độ Bất Bão Hòa (IHD / DBE)
              </span>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nhập Công Thức Phân Tử:</label>
                <input
                  type="text"
                  value={calcFormulaInput}
                  onChange={(e) => setCalcFormulaInput(e.target.value)}
                  placeholder="Ví dụ: C6H6, C7H8, C3H6O, C2H4Cl2"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-mono focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Số C: {calculatedIHDResult.carbon} | Số H: {calculatedIHDResult.hydrogen}</span>
                  <span className="font-mono text-slate-300">M = {calculatedIHDResult.molecularWeight} g/mol</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-semibold">Độ Bất Bão Hòa IHD:</span>
                  <span className="text-lg font-bold font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    {calculatedIHDResult.ihd}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded">
                  {calculatedIHDResult.ihd === 0 && '✔ Hợp chất no mạch hở (chỉ có liên kết đơn).'}
                  {calculatedIHDResult.ihd === 1 && '✔ Chứa 1 liên kết đôi (C=C hoặc C=O) HOẶC 1 vòng no monocyclic.'}
                  {calculatedIHDResult.ihd === 2 && '✔ Chứa 1 liên kết ba (C≡C, C≡N) hoặc 2 liên kết đôi/vòng.'}
                  {calculatedIHDResult.ihd >= 4 && '✔ Nhiều khả năng chứa nhân thơm benzen (1 vòng + 3 nối đôi = 4 IHD).'}
                </div>
              </div>
            </div>

            {/* Box 2: Empirical Formula Calculator */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                2. Thiết Lập Công Thức Đơn Giản Nhất (% Khối Lượng)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">%C:</label>
                  <input
                    type="number"
                    value={calcPercentC}
                    onChange={(e) => setCalcPercentC(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-1.5 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">%H:</label>
                  <input
                    type="number"
                    value={calcPercentH}
                    onChange={(e) => setCalcPercentH(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-1.5 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">%O:</label>
                  <input
                    type="number"
                    value={calcPercentO}
                    onChange={(e) => setCalcPercentO(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-1.5 rounded text-xs font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-semibold">Công thức đơn giản nhất:</span>
                  <span className="text-base font-bold font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    {calculatedEmpirical.empiricalFormula}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Khối lượng CTĐGN: <span className="font-mono text-slate-200">{calculatedEmpirical.empiricalWeight}</span> g/mol
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
