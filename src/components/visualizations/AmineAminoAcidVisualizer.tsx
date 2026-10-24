// src/components/visualizations/AmineAminoAcidVisualizer.tsx
// Interactive Amines Basicity, Amino Acids Isoelectric Electrophoresis & Peptide Biuret Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 3: Hợp chất chứa Nitơ) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Droplets,
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Thermometer,
  Layers,
  FlaskConical,
  Activity,
  Zap,
  Plus,
  Trash2,
  Shield
} from 'lucide-react';
import {
  AMINES_CATALOG,
  AMINO_ACIDS_CATALOG,
  AmineDef,
  AminoAcidDef,
  calculateElectrophoresisMigration,
  calculateAnilineBromineReaction,
  evaluateBiuretTest,
  evaluateXanthoproteicTest,
  ElectrophoresisMigrationResult,
  AnilineBromineTestResult,
  BiuretProteinTestResult
} from '../../domain/amineAminoAcidPeptideEngine';
import { sound } from '../../audio/soundEngine';

export interface AmineAminoAcidVisualizerProps {
  initialMode?: 'AMINES_BASICITY' | 'AMINO_ACID_ELECTROPHORESIS' | 'PEPTIDE_BIURET_TEST';
  className?: string;
}

export const AmineAminoAcidVisualizer: React.FC<AmineAminoAcidVisualizerProps> = ({
  initialMode = 'AMINES_BASICITY',
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'AMINES_BASICITY' | 'AMINO_ACID_ELECTROPHORESIS' | 'PEPTIDE_BIURET_TEST'>(initialMode);

  // 1. Amines State
  const [selectedAmineId, setSelectedAmineId] = useState<string>('aniline');
  const [anilineMassInput, setAnilineMassInput] = useState<number>(9.3);

  // 2. Amino Acids State
  const [selectedAAId, setSelectedAAId] = useState<string>('glutamic_acid');
  const [solutionPH, setSolutionPH] = useState<number>(7.0);

  // 3. Peptides State
  const [peptideSequence, setPeptideSequence] = useState<string[]>(['Gly', 'Ala']); // Default Dipeptide

  // Current selections
  const currentAmine = useMemo<AmineDef>(() => {
    return AMINES_CATALOG.find(a => a.id === selectedAmineId) || AMINES_CATALOG[0];
  }, [selectedAmineId]);

  const currentAA = useMemo<AminoAcidDef>(() => {
    return AMINO_ACIDS_CATALOG.find(a => a.id === selectedAAId) || AMINO_ACIDS_CATALOG[0];
  }, [selectedAAId]);

  // Calculations
  const anilineResult = useMemo<AnilineBromineTestResult>(() => {
    return calculateAnilineBromineReaction({
      anilineMassGrams: anilineMassInput
    });
  }, [anilineMassInput]);

  const electrophoresisResult = useMemo<ElectrophoresisMigrationResult>(() => {
    return calculateElectrophoresisMigration({
      aminoAcidId: selectedAAId,
      solutionPH
    });
  }, [selectedAAId, solutionPH]);

  const biuretResult = useMemo<BiuretProteinTestResult>(() => {
    return evaluateBiuretTest(peptideSequence);
  }, [peptideSequence]);

  const handleModeChange = (mode: 'AMINES_BASICITY' | 'AMINO_ACID_ELECTROPHORESIS' | 'PEPTIDE_BIURET_TEST') => {
    setActiveMode(mode);
    sound.playUiClick();
  };

  const handleAddAAToPeptide = (symbol: string) => {
    if (peptideSequence.length < 8) {
      setPeptideSequence([...peptideSequence, symbol]);
      sound.playUiClick();
    }
  };

  const handleRemoveLastAA = () => {
    if (peptideSequence.length > 2) {
      setPeptideSequence(peptideSequence.slice(0, -1));
      sound.playUiClick();
    }
  };

  const handleResetPeptideToTripeptide = () => {
    setPeptideSequence(['Gly', 'Ala', 'Val']);
    sound.playUiClick();
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Chuyên Đề Amin - Amino Axit - Peptit &amp; Protein
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                GDPT 2018 Lớp 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Thang tính bazơ Amin · Điểm đẳng điện &amp; Điện di Amino Axit · Phản ứng màu Biuret Peptit
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => handleModeChange('AMINES_BASICITY')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'AMINES_BASICITY'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            1. Tính Bazơ &amp; Anilin
          </button>
          <button
            onClick={() => handleModeChange('AMINO_ACID_ELECTROPHORESIS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'AMINO_ACID_ELECTROPHORESIS'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            2. Điểm Đẳng Điện &amp; Điện Di
          </button>
          <button
            onClick={() => handleModeChange('PEPTIDE_BIURET_TEST')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'PEPTIDE_BIURET_TEST'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3. Phản Ứng Màu Biuret
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== MODE 1: AMINES BASICITY & ANILINE ===================== */}
        {activeMode === 'AMINES_BASICITY' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Basicity Ladder (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Dãy So Sánh Tính Bazơ Tiêu Chuẩn (SGK GDPT 2018)
                </span>

                <div className="space-y-2">
                  {AMINES_CATALOG.map((amine) => {
                    const isSelected = amine.id === selectedAmineId;
                    return (
                      <button
                        key={amine.id}
                        onClick={() => {
                          setSelectedAmineId(amine.id);
                          sound.playUiClick();
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                              {amine.relativeBasicityRank}
                            </span>
                            {amine.nameVI}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {amine.structuralFormula} (pKb = {amine.pKb})
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            amine.relativeBasicityRank === 1
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : amine.relativeBasicityRank === 4
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {amine.relativeBasicityRank === 1 ? 'Mạnh nhất' : amine.relativeBasicityRank === 4 ? 'Yếu nhất (Quỳ không đổi màu)' : 'Trung bình'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Litmus Reaction Card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-purple-400" /> Tác Dụng Lên Giấy Quỳ Tím Ẩm
                </div>
                <div className={`p-3 rounded-lg border font-semibold text-xs ${
                  currentAmine.id === 'aniline'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                }`}>
                  {currentAmine.litmusReactionVI}
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  * {currentAmine.curriculumContextVI}
                </p>
              </div>
            </div>

            {/* Right Aniline Bromination Reaction (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-slate-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                    Phản Ứng Nhận Biết Anilin Bằng Nước Brom
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Mất Màu Nước Brom + Kết Tủa Trắng
                  </span>
                </div>

                {/* Slider */}
                <div className="my-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Khối lượng Anilin (C₆H₅NH₂) cho vào:</span>
                    <span className="font-mono font-bold text-purple-300">{anilineMassInput.toFixed(1)} g</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="50.0"
                    step="0.5"
                    value={anilineMassInput}
                    onChange={(e) => setAnilineMassInput(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Số mol Br₂ phản ứng:</span>
                    <div className="text-2xl font-black text-amber-300 font-mono">
                      {anilineResult.bromineMolesNeeded.toFixed(3)} mol
                    </div>
                    <div className="text-[10px] text-slate-500">Tỉ lệ mol: 1 mol Anilin : 3 mol Br₂</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Kết tủa trắng 2,4,6-tribromanilin:</span>
                    <div className="text-2xl font-black text-slate-100 font-mono">
                      {anilineResult.theoreticalPrecipitateGrams.toFixed(1)} g
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">M = 329.8 g/mol (Chất rắn trắng)</div>
                  </div>
                </div>
              </div>

              {/* Chemical Equation and Phenomenon Box */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Phương Trình Phản Ứng &amp; Giải Thích
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-purple-300 text-center text-xs overflow-x-auto">
                  {anilineResult.chemicalEquationVI}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  {anilineResult.pedagogicalRationaleVI}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 2: AMINO ACIDS & ELECTROPHORESIS ===================== */}
        {activeMode === 'AMINO_ACID_ELECTROPHORESIS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Amino Acid Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> 5 Amino Axit Tiêu Biểu SGK GDPT 2018
                </span>

                <div className="space-y-1.5">
                  {AMINO_ACIDS_CATALOG.map((aa) => {
                    const isSelected = aa.id === selectedAAId;
                    return (
                      <button
                        key={aa.id}
                        onClick={() => {
                          setSelectedAAId(aa.id);
                          sound.playUiClick();
                        }}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            {aa.nameVI} ({aa.abbreviation3Letter})
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            pI = {aa.isoelectricPointPI.toFixed(2)} · M = {aa.molarMass} g/mol
                          </div>
                        </div>
                        <div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            aa.litmusColorVI === 'DO'
                              ? 'bg-rose-500/20 text-rose-300'
                              : aa.litmusColorVI === 'XANH'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {aa.litmusColorVI === 'DO' ? 'Quỳ đỏ' : aa.litmusColorVI === 'XANH' ? 'Quỳ xanh' : 'Không đổi màu'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* pH Slider */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">pH Của Môi Trường Dung Dịch:</span>
                  <span className="font-mono font-bold text-blue-300 text-sm">pH = {solutionPH.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="13.0"
                  step="0.1"
                  value={solutionPH}
                  onChange={(e) => setSolutionPH(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSolutionPH(currentAA.isoelectricPointPI);
                      sound.playUiClick();
                    }}
                    className="flex-1 py-1 text-[11px] rounded bg-slate-950 border border-slate-800 text-cyan-300 hover:bg-slate-800"
                  >
                    Đặt pH = pI ({currentAA.isoelectricPointPI.toFixed(2)})
                  </button>
                  <button
                    onClick={() => {
                      setSolutionPH(7.0);
                      sound.playUiClick();
                    }}
                    className="flex-1 py-1 text-[11px] rounded bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    pH sinh lý (7.0)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Electrophoresis Chamber SVG & Migration Dynamics (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-blue-500/30 bg-slate-900/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Trạng Thái Điện Tích &amp; Hướng Di Chuyển Điện Di
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    electrophoresisResult.dominantFormVI === 'ZWITTERION_LUONG_CUC'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : electrophoresisResult.dominantFormVI === 'CATION_DUONG'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {electrophoresisResult.dominantFormVI === 'ZWITTERION_LUONG_CUC'
                      ? 'Ion Lưỡng Cực (Net Charge = 0)'
                      : electrophoresisResult.dominantFormVI === 'CATION_DUONG'
                      ? 'Cation (+) Di chuyển về Catot (-)'
                      : 'Anion (-) Di chuyển về Anot (+)'}
                  </span>
                </div>

                <div className="text-xs text-slate-300 mt-2">
                  {electrophoresisResult.explanationVI}
                </div>
              </div>

              {/* SVG Electrophoresis Chamber */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-2 text-slate-400">
                  <span className="text-rose-400 font-bold font-mono">[-] CỰC ÂM (CATOT)</span>
                  <span className="text-slate-500">Bể Điện Di Amino Axit (pH = {solutionPH.toFixed(1)})</span>
                  <span className="text-emerald-400 font-bold font-mono">[+] CỰC DƯƠNG (ANOT)</span>
                </div>

                <div className="p-4 bg-slate-950/90 rounded-lg border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 400 120" className="w-full max-w-md h-28">
                    {/* Chamber body */}
                    <rect x="20" y="20" width="360" height="80" rx="8" fill="#090d16" stroke="#334155" strokeWidth="2" />

                    {/* Negative Cathode Electrode (Left) */}
                    <rect x="25" y="30" width="10" height="60" rx="2" fill="#f43f5e" />

                    {/* Positive Anode Electrode (Right) */}
                    <rect x="365" y="30" width="10" height="60" rx="2" fill="#10b981" />

                    {/* Center Zero-Migration Line */}
                    <line x1="200" y1="20" x2="200" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Animated Amino Acid Molecule Dot */}
                    {/* Position: 200 at center, moves left if cation (to 80), moves right if anion (to 320) */}
                    {(() => {
                      let cx = 200;
                      if (electrophoresisResult.dominantFormVI === 'CATION_DUONG') {
                        cx = 200 - Math.min(130, (currentAA.isoelectricPointPI - solutionPH) * 25);
                      } else if (electrophoresisResult.dominantFormVI === 'ANION_AM') {
                        cx = 200 + Math.min(130, (solutionPH - currentAA.isoelectricPointPI) * 25);
                      }
                      return (
                        <g>
                          <circle cx={cx} cy="60" r="14" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" className="animate-pulse" />
                          <text x={cx} y="64" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {currentAA.abbreviation3Letter}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Labels */}
                    <text x="200" y="112" fill="#64748b" fontSize="9" textAnchor="middle">
                      Điểm xuất phát ban đầu (pI = {currentAA.isoelectricPointPI.toFixed(2)})
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 3: PEPTIDE BIURET TEST ===================== */}
        {activeMode === 'PEPTIDE_BIURET_TEST' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Peptide Sequence Builder (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Chuỗi Peptit Thử Nghiệm
                  </span>
                  <button
                    onClick={handleResetPeptideToTripeptide}
                    className="text-[10px] text-slate-400 hover:text-slate-200 underline"
                  >
                    Mẫu Tripeptit
                  </button>
                </div>

                {/* Display Current Sequence Chips */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-wrap gap-1.5 items-center min-h-[50px]">
                  {peptideSequence.map((aa, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-pink-500/20 text-pink-300 font-mono font-bold text-xs border border-pink-500/30 flex items-center gap-1"
                    >
                      {aa}
                      {idx < peptideSequence.length - 1 && (
                        <span className="text-slate-500 text-[10px]">—</span>
                      )}
                    </span>
                  ))}
                  {peptideSequence.length > 2 && (
                    <button
                      onClick={handleRemoveLastAA}
                      className="p-1 rounded bg-slate-900 text-slate-400 hover:text-rose-400 ml-auto"
                      title="Xóa gốc cuối"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick Add Buttons */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400">Thêm gốc Amino Axit vào chuỗi (Tối đa 8 gốc):</span>
                  <div className="grid grid-cols-5 gap-1">
                    {['Gly', 'Ala', 'Val', 'Glu', 'Lys'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => handleAddAAToPeptide(sym)}
                        className="py-1 px-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:bg-slate-800 hover:text-pink-300"
                      >
                        +{sym}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Số gốc amino axit:</span>
                    <div className="font-bold text-slate-200 font-mono text-sm">{biuretResult.peptide.aminoAcidCount}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Số liên kết peptit:</span>
                    <div className={`font-bold font-mono text-sm ${biuretResult.peptide.peptideBondCount >= 2 ? 'text-pink-400' : 'text-amber-400'}`}>
                      {biuretResult.peptide.peptideBondCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Biuret Test Observation & Warning (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className={`p-4 rounded-xl border transition-all ${
                biuretResult.canGiveBiuretTest
                  ? 'bg-purple-950/40 border-purple-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
                    Kết Quả Thí Nghiệm Màu Biuret Với Cu(OH)₂ / NaOH
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    biuretResult.canGiveBiuretTest
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {biuretResult.canGiveBiuretTest ? 'DƯƠNG TÍNH (MÀU TÍM)' : 'ÂM TÍNH (VẪN XANH LAM)'}
                  </span>
                </div>

                <div className="text-2xl font-black text-slate-100 flex items-center gap-2 mt-2">
                  <span
                    className="w-5 h-5 rounded-full border border-slate-600 inline-block shrink-0 shadow-inner"
                    style={{ backgroundColor: biuretResult.observedColorHex }}
                  ></span>
                  {biuretResult.canGiveBiuretTest
                    ? 'Xuất Hiện Phức Màu Tím Đặc Trưng'
                    : 'Không Đổi Màu Tím (Chỉ Có Màu Xanh Lam Nhạt Cu(OH)₂)'}
                </div>

                <div className="text-xs text-slate-300 mt-2">
                  {biuretResult.visualPhenomenonVI}
                </div>
              </div>

              {/* Warning Card */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                !biuretResult.canGiveBiuretTest
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Lưu Ý Sách Giáo Khoa &amp; Đề Thi Tốt Nghiệp THPT
                </div>
                <p className="leading-relaxed text-[11px]">
                  {biuretResult.curriculumWarningVI}
                </p>
                <p className="leading-relaxed text-[11px] text-slate-400 pt-1">
                  * {biuretResult.pedagogicalRationaleVI}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
