// src/components/visualizations/HalogensRedoxVisualizer.tsx
/**
 * ELEMENTA — Halogens (Group VIIA) & Hydrogen Halides Visualizer
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 7: Nhóm Halogen) & IUPAC standards.
 * 
 * Modes:
 * 1. HALOGEN_DISPLACEMENT_LAB: Halogen displacement reactions (Cl2, Br2, I2) and organic solvent extraction (hexan layer).
 * 2. HYDROGEN_HALIDES_REDOX_LAB: Acid strength, reducing power with conc H2SO4 (SO2 vs H2S), and HF glass etching.
 * 3. BLEACHING_JAVEL_AND_IODINE_LAB: Javel water, CaOCl2 bleaching mechanism, and starch-iodine temperature-reversible test.
 */

import React, { useState, useMemo } from 'react';
import {
  HALOGEN_ELEMENTS_CATALOG,
  simulateHalogenDisplacement,
  HYDROGEN_HALIDES_CATALOG,
  simulateBleachingProduct,
  simulateStarchIodineTest,
  HalogenElement
} from '../../domain/halogensRedoxEngine';
import { sound } from '../../audio/soundEngine';

export type HalogensVisualizerMode =
  | 'HALOGEN_DISPLACEMENT_LAB'
  | 'HYDROGEN_HALIDES_REDOX_LAB'
  | 'BLEACHING_JAVEL_AND_IODINE_LAB';

export const HalogensRedoxVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HalogensVisualizerMode>('HALOGEN_DISPLACEMENT_LAB');

  // Mode 1: Halogen Displacement
  const [addedHalogen, setAddedHalogen] = useState<'Cl2' | 'Br2' | 'I2' | 'F2'>('Cl2');
  const [targetHalide, setTargetHalide] = useState<'NaF' | 'NaCl' | 'NaBr' | 'NaI'>('NaBr');
  const [hasOrganicExtraction, setHasOrganicExtraction] = useState<boolean>(true);

  // Mode 2: Hydrogen Halides
  const [selectedHx, setSelectedHx] = useState<'HF' | 'HCl' | 'HBr' | 'HI'>('HI');

  // Mode 3: Bleaching & Iodine
  const [bleachType, setBleachType] = useState<'JAVEL_WATER' | 'BLEACHING_POWDER_CAOCl2'>('JAVEL_WATER');
  const [iodineTestTemp, setIodineTestTemp] = useState<number>(25);

  // Computed results
  const displacementResult = useMemo(() => {
    return simulateHalogenDisplacement(addedHalogen, targetHalide);
  }, [addedHalogen, targetHalide]);

  const hxAnalysis = useMemo(() => {
    return HYDROGEN_HALIDES_CATALOG[selectedHx];
  }, [selectedHx]);

  const bleachResult = useMemo(() => {
    return simulateBleachingProduct(bleachType);
  }, [bleachType]);

  const starchResult = useMemo(() => {
    return simulateStarchIodineTest(true, iodineTestTemp);
  }, [iodineTestTemp]);

  const handleModeChange = (mode: HalogensVisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="bg-slate-900 border border-lime-500/30 rounded-xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-lime-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-lime-500/20 text-lime-300 border border-lime-500/30">
              GDPT 2018 Hóa Học 10 — Chủ Đề 7
            </span>
            <span className="text-xs text-slate-400">Group VIIA Halogens & Hydrogen Halides</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-lime-400 tracking-wide mt-1">
            Phòng Thí Nghiệm Nguyên Tố Nhóm Halogen (VIIA)
          </h2>
          <p className="text-sm text-slate-300">
            Khảo sát quy luật đẩy halogen, chiết xuất dung môi hữu cơ, tính axit & tính khử của hydro halide, nước Javel và phản ứng màu iot
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeChange('HALOGEN_DISPLACEMENT_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'HALOGEN_DISPLACEMENT_LAB'
                ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Phản Ứng Đẩy Halogen & Chiết Tách
          </button>
          <button
            onClick={() => handleModeChange('HYDROGEN_HALIDES_REDOX_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'HYDROGEN_HALIDES_REDOX_LAB'
                ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Hydro Halide & Khắc Kính HF
          </button>
          <button
            onClick={() => handleModeChange('BLEACHING_JAVEL_AND_IODINE_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'BLEACHING_JAVEL_AND_IODINE_LAB'
                ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Nước Javel, Clorua Vôi & Màu Iot
          </button>
        </div>
      </div>

      {/* MODE 1: HALOGEN DISPLACEMENT LAB */}
      {activeMode === 'HALOGEN_DISPLACEMENT_LAB' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Halogen Added */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Dẫn Halogen Đơn Chất Vào
              </label>
              <div className="flex gap-2">
                {(['Cl2', 'Br2', 'I2', 'F2'] as const).map(hal => (
                  <button
                    key={hal}
                    onClick={() => {
                      sound.playUiClick();
                      setAddedHalogen(hal);
                    }}
                    className={`flex-1 py-1.5 rounded text-xs font-bold border transition-all ${
                      addedHalogen === hal
                        ? 'bg-lime-500/20 border-lime-400 text-lime-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {hal === 'F2' ? '⚠️ F2' : hal}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Halide Solution */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Dung Dịch Muối Halogenua Mục Tiêu
              </label>
              <div className="flex gap-2">
                {(['NaF', 'NaCl', 'NaBr', 'NaI'] as const).map(salt => (
                  <button
                    key={salt}
                    onClick={() => {
                      sound.playUiClick();
                      setTargetHalide(salt);
                    }}
                    className={`flex-1 py-1.5 rounded text-xs font-bold border transition-all ${
                      targetHalide === salt
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {salt}
                  </button>
                ))}
              </div>
            </div>

            {/* Organic Solvent Extraction Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Lắc Với Dung Môi Hữu Cơ (Hexan)
              </label>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setHasOrganicExtraction(!hasOrganicExtraction);
                }}
                className={`w-full py-1.5 px-3 rounded text-xs font-bold border flex items-center justify-between ${
                  hasOrganicExtraction
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                    : 'bg-slate-700/40 border-slate-600 text-slate-400'
                }`}
              >
                <span>Chiết tách hữu cơ:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${hasOrganicExtraction ? 'bg-purple-500 text-white' : 'bg-slate-600 text-slate-300'}`}>
                  {hasOrganicExtraction ? 'BẬT (2 LỚP)' : 'TẮT (1 LỚP)'}
                </span>
              </button>
            </div>
          </div>

          {/* Test Tube Visualization & Reaction Outcome */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: SVG Test Tube with 2-layer extraction */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Ống Nghiệm Phản Ứng & Chiết Tách Dung Môi Hữu Cơ
              </h3>

              <svg width="180" height="230" viewBox="0 0 180 230" className="overflow-visible">
                {/* Tube glass */}
                <path
                  d="M 60 20 L 60 170 A 30 30 0 0 0 120 170 L 120 20 Z"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <ellipse cx="90" cy="20" rx="33" ry="6" fill="none" stroke="#94a3b8" strokeWidth="3" />

                {/* Lower aqueous layer */}
                <path
                  d="M 62 115 L 62 170 A 28 28 0 0 0 118 170 L 118 115 Z"
                  fill={
                    displacementResult.reactionOccurs
                      ? targetHalide === 'NaBr'
                        ? '#f59e0b'
                        : '#78350f'
                      : '#cbd5e1'
                  }
                  opacity="0.45"
                />

                {/* Upper organic layer (if extracted) */}
                {hasOrganicExtraction && (
                  <path
                    d="M 62 65 L 62 115 L 118 115 L 118 65 Z"
                    fill={
                      displacementResult.reactionOccurs
                        ? targetHalide === 'NaBr'
                          ? '#991b1b' // Deep red-brown Br2
                          : '#a855f7' // Bright violet I2
                        : '#94a3b8'
                    }
                    opacity="0.85"
                  />
                )}

                {/* Separation line */}
                {hasOrganicExtraction && (
                  <line x1="62" y1="115" x2="118" y2="115" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="2 2" />
                )}

                {/* Layer Labels */}
                {hasOrganicExtraction && (
                  <g>
                    <text x="90" y="93" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      LỚP HỮU CƠ (HEXAN)
                    </text>
                    <text x="90" y="145" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      LỚP NƯỚC (AQUEOUS)
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Badge */}
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  displacementResult.reactionOccurs
                    ? 'bg-lime-500/20 border-lime-400 text-lime-300'
                    : 'bg-slate-700 border-slate-600 text-slate-400'
                }`}
              >
                {displacementResult.reactionOccurs
                  ? `Xảy ra phản ứng thế halogen: ${displacementResult.chemicalEquation.split('->')[0]} → ...`
                  : 'Không xảy ra phản ứng đẩy halogen'}
              </div>
            </div>

            {/* Right: Explanation & Analytical Details */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phương Trình Hóa Học & Chiết Tách
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    displacementResult.reactionOccurs
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {displacementResult.reactionOccurs ? 'PHẢN ỨNG TỰ PHÁT' : 'KHÔNG ĐẨY ĐƯỢC'}
                </span>
              </div>

              {/* Equation Box */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-lime-200 overflow-x-auto">
                {displacementResult.chemicalEquation}
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-slate-300">
                  <span className="text-amber-400 font-semibold block mb-0.5">Hiện tượng pha nước:</span>
                  {displacementResult.colorAfterVi}
                </div>
                {hasOrganicExtraction && (
                  <div className="bg-purple-950/30 border border-purple-500/40 p-2.5 rounded text-purple-200">
                    <span className="font-semibold block mb-0.5">Chiết tách pha hữu cơ (Hexan / Benzen):</span>
                    {displacementResult.organicExtractionColorVi}
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700 text-xs text-slate-300">
                <span className="font-bold text-lime-400 block mb-1">Cơ sở lý thuyết thế điện cực chuẩn (E°):</span>
                {displacementResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: HYDROGEN HALIDES REDOX LAB */}
      {activeMode === 'HYDROGEN_HALIDES_REDOX_LAB' && (
        <div className="space-y-6">
          {/* HX Selector */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chọn Hydro Halide Khảo Sát
            </label>
            <div className="flex flex-wrap gap-2">
              {(['HF', 'HCl', 'HBr', 'HI'] as const).map(hx => (
                <button
                  key={hx}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedHx(hx);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                    selectedHx === hx
                      ? 'bg-lime-500/20 border-lime-400 text-lime-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300'
                  }`}
                >
                  {hx} — {HYDROGEN_HALIDES_CATALOG[hx].nameVi.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* HX Physical Properties & Redox Outcome */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-slate-100">{hxAnalysis.nameVi}</span>
                <span className="text-xs text-slate-400 block mt-0.5">Công thức: {hxAnalysis.formula}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-lime-500/20 border border-lime-400 text-lime-300 font-mono">
                pKa = {hxAnalysis.pKaInWater}
              </span>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Độ Dài Liên Kết H-X:</span>
                <div className="text-base font-bold font-mono text-cyan-300 mt-1">
                  {hxAnalysis.bondLengthPm} pm
                </div>
                <span className="text-[10px] text-slate-400">tăng dần từ HF (92) đến HI (161)</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Năng Lượng Liên Kết H-X:</span>
                <div className="text-base font-bold font-mono text-amber-300 mt-1">
                  {hxAnalysis.bondEnergyKjMol} kJ/mol
                </div>
                <span className="text-[10px] text-slate-400">giảm dần làm độ bền phân tử giảm</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Đánh Giá Độ Mạnh Axit:</span>
                <div className="text-sm font-bold text-lime-300 mt-1">
                  {hxAnalysis.formula === 'HF' ? 'Axit Yếu (pK_a = 3.17)' : 'Axit Rất Mạnh'}
                </div>
                <span className="text-[10px] text-slate-400">{hxAnalysis.acidStrengthVi}</span>
              </div>
            </div>

            {/* Redox with Conc H2SO4 Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">
                  Phản Ứng Oxi Hóa Khử Với H2SO4 Đặc Nóng:
                </span>
                <span className={`px-2.5 py-0.5 rounded font-bold ${hxAnalysis.reactionWithConcH2SO4.occurs ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
                  {hxAnalysis.reactionWithConcH2SO4.occurs ? 'BỊ OXI HÓA' : 'KHÔNG BỊ OXI HÓA'}
                </span>
              </div>
              <div className="font-mono text-lime-200">{hxAnalysis.reactionWithConcH2SO4.redoxEquation}</div>
              <p className="text-slate-300">{hxAnalysis.reactionWithConcH2SO4.gasEvolvedVi}</p>
              <div className="text-cyan-300">{hxAnalysis.reactionWithConcH2SO4.reducingStrengthRanking}</div>
            </div>

            {/* Special Reaction Alert (HF glass etching) */}
            <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-lg text-xs space-y-1 text-amber-200">
              <span className="font-bold block">🌟 Ứng Dụng Đặc Biệt / Bẫy Thi:</span>
              <p>{hxAnalysis.specialReactionsVi}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: BLEACHING & IODINE STARCH LAB */}
      {activeMode === 'BLEACHING_JAVEL_AND_IODINE_LAB' && (
        <div className="space-y-6">
          {/* Section A: Javel & Bleaching Powder */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300">
              Phần A: Hợp Chất Chứa Oxi Của Clo (Nước Javel & Clorua Vôi)
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playUiClick();
                  setBleachType('JAVEL_WATER');
                }}
                className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${
                  bleachType === 'JAVEL_WATER'
                    ? 'bg-lime-500/20 border-lime-400 text-lime-300'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Nước Javel (NaCl + NaClO)
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setBleachType('BLEACHING_POWDER_CAOCl2');
                }}
                className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${
                  bleachType === 'BLEACHING_POWDER_CAOCl2'
                    ? 'bg-lime-500/20 border-lime-400 text-lime-300'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Clorua Vôi (CaOCl2 - Muối hỗn tạp)
              </button>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-100">
                <span>{bleachResult.nameVi}</span>
                <span className="text-lime-300 font-mono">{bleachResult.activeSpeciesVi}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700 font-mono text-lime-200 overflow-x-auto">
                {bleachResult.chemicalEquation}
              </div>
              <p className="text-slate-300">{bleachResult.bleachingMechanismVi}</p>
              <div className="text-slate-400 pt-1 border-t border-slate-800">
                <span className="font-semibold text-lime-400">Ứng dụng thực tiễn: </span>
                {bleachResult.realWorldApplicationVi}
              </div>
            </div>
          </div>

          {/* Section B: Starch-Iodine Test */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              Phần B: Thí Nghiệm Nhận Biết Iot Bằng Hồ Tinh Bột (Phức Màu Thuận Nghịch)
            </h3>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nhiệt Độ Ống Nghiệm Hồ Tinh Bột + I2:
                </label>
                <span className="text-xs font-bold text-purple-400 font-mono">{iodineTestTemp} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="2"
                value={iodineTestTemp}
                onChange={e => setIodineTestTemp(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <span className="text-[10px] text-slate-400 block">
                Kéo nhiệt độ lên &gt; 70°C để quan sát hiện tượng mất màu do mạch xoắn amylose dãn nở; để nguội màu xanh tím sẽ quay trở lại.
              </span>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Màu Sắc Quan Sát Thấy:</span>
                <span
                  className="px-3 py-1 rounded-full font-bold text-white shadow"
                  style={{ backgroundColor: starchResult.colorHex === '#ffffff' ? '#64748b' : starchResult.colorHex }}
                >
                  {starchResult.colorVi}
                </span>
              </div>
              <p className="text-slate-300">{starchResult.explanationVi}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
