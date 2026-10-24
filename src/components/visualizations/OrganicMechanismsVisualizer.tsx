// src/components/visualizations/OrganicMechanismsVisualizer.tsx
// Interactive Organic Chemistry Stereoisomerism, Reaction Mechanisms & Diagnostic Tests Visualizer
// Aligned with Vietnam GDPT 2018 Chemistry 11-12 & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Compass,
  RotateCcw,
  Sparkles,
  FlaskConical,
  Scale,
  Layers,
  ArrowRight,
  HelpCircle,
  Activity,
  CheckCircle2,
  Atom,
  Flame,
  Beaker,
  ShieldAlert,
  Info,
  Droplets,
  ExternalLink
} from 'lucide-react';
import {
  CURRICULUM_GEOMETRIC_ISOMERS,
  GeometricIsomerPair,
  CURRICULUM_CHIRAL_CENTERS,
  ChiralCenterDefinition,
  CURRICULUM_MARKOVNIKOV_CASES,
  MarkovnikovAdditionCase,
  CURRICULUM_ZAITSEV_CASES,
  ZaitsevEliminationCase,
  CURRICULUM_ORGANIC_TESTS,
  DiagnosticOrganicTest,
  evaluateDiagnosticOrganicTest,
  checkGeometricIsomerismFeasibility
} from '../../domain/organicMechanismsEngine';
import { sound } from '../../audio/soundEngine';

export interface OrganicMechanismsVisualizerProps {
  initialMode?: 'CIS_TRANS' | 'CHIRAL' | 'MARKOVNIKOV' | 'DIAGNOSTIC_TESTS';
  initialCompoundId?: string;
  className?: string;
}

export const OrganicMechanismsVisualizer: React.FC<OrganicMechanismsVisualizerProps> = ({
  initialMode = 'CIS_TRANS',
  initialCompoundId,
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'CIS_TRANS' | 'CHIRAL' | 'MARKOVNIKOV' | 'DIAGNOSTIC_TESTS'>(initialMode);

  // 1. Cis/Trans State
  const [selectedGeometricId, setSelectedGeometricId] = useState<string>(initialCompoundId || 'but_2_ene');
  const [isTrans, setIsTrans] = useState<boolean>(false); // false = cis/Z, true = trans/E

  // Custom Geometric Checker inputs
  const [customR1, setCustomR1] = useState<string>('CH3');
  const [customR2, setCustomR2] = useState<string>('H');
  const [customR3, setCustomR3] = useState<string>('CH3');
  const [customR4, setCustomR4] = useState<string>('H');

  // 2. Chiral Center State
  const [selectedChiralId, setSelectedChiralId] = useState<string>('lactic_acid');
  const [isLOrS, setIsLOrS] = useState<boolean>(false); // false = D/R, true = L/S

  // 3. Markovnikov / Zaitsev State
  const [selectedMarkovnikovId, setSelectedMarkovnikovId] = useState<string>('propene_hbr');
  const [hasPeroxide, setHasPeroxide] = useState<boolean>(false);
  const [selectedZaitsevId, setSelectedZaitsevId] = useState<string>('butan_2_ol_dehydration');

  // 4. Diagnostic Tests State
  const [selectedTestId, setSelectedTestId] = useState<string>('tollens_silver_mirror');
  const [testedSubstance, setTestedSubstance] = useState<string>('CH3CHO');
  const [isTestRun, setIsTestRun] = useState<boolean>(true);

  // Selected Geometric pair
  const geometricPair: GeometricIsomerPair = useMemo(() => {
    return CURRICULUM_GEOMETRIC_ISOMERS.find(g => g.id === selectedGeometricId) || CURRICULUM_GEOMETRIC_ISOMERS[0];
  }, [selectedGeometricId]);

  // Selected Chiral Center
  const chiralCenter: ChiralCenterDefinition = useMemo(() => {
    return CURRICULUM_CHIRAL_CENTERS.find(c => c.id === selectedChiralId) || CURRICULUM_CHIRAL_CENTERS[0];
  }, [selectedChiralId]);

  // Selected Markovnikov Case
  const markovnikovCase: MarkovnikovAdditionCase = useMemo(() => {
    return CURRICULUM_MARKOVNIKOV_CASES.find(m => m.id === selectedMarkovnikovId) || CURRICULUM_MARKOVNIKOV_CASES[0];
  }, [selectedMarkovnikovId]);

  // Selected Zaitsev Case
  const zaitsevCase: ZaitsevEliminationCase = useMemo(() => {
    return CURRICULUM_ZAITSEV_CASES.find(z => z.id === selectedZaitsevId) || CURRICULUM_ZAITSEV_CASES[0];
  }, [selectedZaitsevId]);

  // Selected Test
  const currentTest: DiagnosticOrganicTest = useMemo(() => {
    return CURRICULUM_ORGANIC_TESTS.find(t => t.id === selectedTestId) || CURRICULUM_ORGANIC_TESTS[0];
  }, [selectedTestId]);

  // Diagnostic Test Evaluation
  const testResult = useMemo(() => {
    return evaluateDiagnosticOrganicTest(selectedTestId, testedSubstance);
  }, [selectedTestId, testedSubstance]);

  // Custom feasibility check
  const customFeasibility = useMemo(() => {
    return checkGeometricIsomerismFeasibility(customR1, customR2, customR3, customR4);
  }, [customR1, customR2, customR3, customR4]);

  const handleFlipIsomer = () => {
    setIsTrans(prev => !prev);
    sound.playOrganicIsomerFlip();
  };

  const handleFlipChiral = () => {
    setIsLOrS(prev => !prev);
    sound.playOrganicIsomerFlip();
  };

  const handleRunDiagnostic = (substanceFormula: string) => {
    setTestedSubstance(substanceFormula);
    setIsTestRun(true);
    sound.playDiagnosticTestDrop();
  };

  const currentIsomer = isTrans ? geometricPair.transOrE : geometricPair.cisOrZ;
  const currentChiral = isLOrS ? chiralCenter.enantiomerLOrS : chiralCenter.enantiomerDOrR;

  return (
    <div className={`flex flex-col bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans ${className}`}>
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Cơ Chế Phản Ứng & Đồng Phân Hóa Học Hữu Cơ
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono font-medium">
                  GDPT 2018 · Hóa 11-12
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Đồng phân hình học (cis/trans, E/Z) · Tâm bất đối (C*) · Quy tắc Maccopnhicop/Zai-xép · Thuốc thử đặc trưng
            </p>
          </div>
        </div>

        {/* Mode Selector Navigation */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs flex-wrap">
          <button
            onClick={() => { setActiveMode('CIS_TRANS'); sound.playDomainSnap?.(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'CIS_TRANS'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Hình Học (Cis/Trans, E/Z)
          </button>
          <button
            onClick={() => { setActiveMode('CHIRAL'); sound.playDomainSnap?.(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'CHIRAL'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Quang Học & Carbon Bất Đối (C*)
          </button>
          <button
            onClick={() => { setActiveMode('MARKOVNIKOV'); sound.playDomainSnap?.(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'MARKOVNIKOV'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Quy Tắc Cộng & Tách
          </button>
          <button
            onClick={() => { setActiveMode('DIAGNOSTIC_TESTS'); sound.playDomainSnap?.(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'DIAGNOSTIC_TESTS'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Thuốc Thử Đặc Trưng
          </button>
        </div>
      </div>

      {/* 2. MODE 1: GEOMETRIC ISOMERISM (CIS/TRANS, E/Z) */}
      {activeMode === 'CIS_TRANS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
          {/* Left Column: Interactive Double Bond 2D/3D SVG Diagram (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Preset Selector */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CURRICULUM_GEOMETRIC_ISOMERS.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedGeometricId(item.id);
                    sound.playDomainSnap?.();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                    selectedGeometricId === item.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.compoundNameVI}
                </button>
              ))}
            </div>

            {/* Central SVG Schematic Diagram */}
            <div className="relative bg-slate-900/60 rounded-2xl border border-slate-800/90 p-5 flex flex-col items-center overflow-hidden">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
                <span className="font-bold text-emerald-400 font-mono">
                  {currentIsomer.nameIUPAC}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  currentIsomer.isPolar
                    ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                    : 'bg-sky-950/40 text-sky-300 border-sky-800/60'
                }`}>
                  {currentIsomer.isPolar ? `Phân Cực (μ = ${currentIsomer.dipoleMomentDebye} D)` : 'Không Phân Cực (μ = 0 D)'}
                </span>
              </div>

              {/* 2D Planar SVG of C=C Double Bond with Substituents */}
              <div className="my-4 w-full flex justify-center">
                <svg viewBox="0 0 460 240" className="w-full max-w-[420px] select-none overflow-visible">
                  {/* Central C=C Double Bond */}
                  <line x1="170" y1="116" x2="290" y2="116" stroke="#e2e8f0" strokeWidth="4" />
                  <line x1="170" y1="124" x2="290" y2="124" stroke="#e2e8f0" strokeWidth="4" />

                  {/* Left Carbon C1 */}
                  <circle cx="170" cy="120" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="170" y="125" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>

                  {/* Right Carbon C2 */}
                  <circle cx="290" cy="120" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="290" y="125" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>

                  {/* Left Top Substituent (R1) */}
                  <line x1="158" y1="108" x2="105" y2="60" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="95" cy="50" r="22" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <text x="95" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                    {geometricPair.leftSubstituents[0]}
                  </text>

                  {/* Left Bottom Substituent (R2) */}
                  <line x1="158" y1="132" x2="105" y2="180" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="95" cy="190" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <text x="95" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                    {geometricPair.leftSubstituents[1]}
                  </text>

                  {/* Right Top Substituent */}
                  <line x1="302" y1="108" x2="355" y2="60" stroke="#94a3b8" strokeWidth="3" />
                  <circle
                    cx="365"
                    cy="50"
                    r="22"
                    fill={!isTrans ? '#065f46' : '#1e293b'}
                    stroke={!isTrans ? '#10b981' : '#64748b'}
                    strokeWidth={!isTrans ? 2 : 1.5}
                  />
                  <text
                    x="365"
                    y="55"
                    textAnchor="middle"
                    fill={!isTrans ? '#a7f3d0' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {!isTrans ? geometricPair.rightSubstituents[0] : geometricPair.rightSubstituents[1]}
                  </text>

                  {/* Right Bottom Substituent */}
                  <line x1="302" y1="132" x2="355" y2="180" stroke="#94a3b8" strokeWidth="3" />
                  <circle
                    cx="365"
                    cy="190"
                    r="22"
                    fill={isTrans ? '#065f46' : '#1e293b'}
                    stroke={isTrans ? '#10b981' : '#64748b'}
                    strokeWidth={isTrans ? 2 : 1.5}
                  />
                  <text
                    x="365"
                    y="195"
                    textAnchor="middle"
                    fill={isTrans ? '#a7f3d0' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {isTrans ? geometricPair.rightSubstituents[0] : geometricPair.rightSubstituents[1]}
                  </text>

                  {/* Dipole Moment Vector Indication */}
                  {currentIsomer.isPolar ? (
                    <g>
                      <path d="M 230 150 L 230 40" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
                      <text x="230" y="30" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        μ tổng hợp ≠ 0
                      </text>
                    </g>
                  ) : (
                    <g>
                      <text x="230" y="90" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                        μ triệt tiêu = 0 (Đối xứng tâm)
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Flip Button */}
              <button
                onClick={handleFlipIsomer}
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Đảo Đồng Phân: Chuyển sang {isTrans ? 'CIS (Z)' : 'TRANS (E)'}
              </button>
            </div>

            {/* CIP Priority Rationale Box */}
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 text-xs flex flex-col gap-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                Quy Tắc Xác Định Độ Ưu Tiên CIP (Cahn-Ingold-Prelog):
              </span>
              <p className="text-slate-300 leading-relaxed font-mono">
                {geometricPair.cipPriorityRationaleVI}
              </p>
            </div>
          </div>

          {/* Right Column: Physical Properties & Custom Feasibility Checker (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Physical Property Comparison Card */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                So Sánh Tính Chất Vật Lý & Hóa Học
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">Nhiệt độ sôi (t°s):</span>
                  <span className="text-sm font-bold text-emerald-400">{currentIsomer.boilingPointC}°C</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">Nhiệt độ nóng chảy (t°nc):</span>
                  <span className="text-sm font-bold text-sky-400">{currentIsomer.meltingPointC}°C</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
                <span className="font-bold text-amber-400">Đặc điểm hình học phân tử:</span>
                <span className="text-slate-300 leading-relaxed">{currentIsomer.structuralDescriptionVI}</span>
              </div>

              {currentIsomer.distinctChemicalPropertyVI && (
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-xs flex flex-col gap-1">
                  <span className="font-bold text-red-400">Tính chất hóa học dị biệt đặc sắc:</span>
                  <span className="text-slate-300 leading-relaxed">{currentIsomer.distinctChemicalPropertyVI}</span>
                </div>
              )}
            </div>

            {/* Custom Geometric Isomerism Checker Tool */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Công Cụ Kiểm Tra Điều Kiện Có Đồng Phân Hình Học</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mô hình dạng R₁R₂C = CR₃R₄. Nhập nhóm thế ở 2 đầu liên kết đôi:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">C1: Nhóm R₁</span>
                  <input
                    type="text"
                    value={customR1}
                    onChange={e => setCustomR1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">C1: Nhóm R₂</span>
                  <input
                    type="text"
                    value={customR2}
                    onChange={e => setCustomR2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">C2: Nhóm R₃</span>
                  <input
                    type="text"
                    value={customR3}
                    onChange={e => setCustomR3(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">C2: Nhóm R₄</span>
                  <input
                    type="text"
                    value={customR4}
                    onChange={e => setCustomR4(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-white font-mono"
                  />
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs leading-relaxed font-mono ${
                customFeasibility.hasGeometricIsomerism
                  ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
                  : 'bg-red-950/30 border-red-500 text-red-300'
              }`}>
                {customFeasibility.reasonVI}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODE 2: CHIRAL OPTICAL ISOMERISM (C*) */}
      {activeMode === 'CHIRAL' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CURRICULUM_CHIRAL_CENTERS.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedChiralId(item.id);
                    sound.playDomainSnap?.();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                    selectedChiralId === item.id
                      ? 'bg-purple-500/20 border-purple-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.compoundNameVI}
                </button>
              ))}
            </div>

            {/* 3D Tetrahedral Chiral Model Display */}
            <div className="relative bg-slate-900/60 rounded-2xl border border-slate-800/90 p-5 flex flex-col items-center overflow-hidden">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
                <span className="font-bold text-purple-400 font-mono">
                  {currentChiral.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/40 text-purple-300 border border-purple-800/60 font-mono">
                  Quay cực: {currentChiral.opticalRotation}
                </span>
              </div>

              {/* Tetrahedral SVG representation */}
              <div className="my-4 w-full flex justify-center">
                <svg viewBox="0 0 360 220" className="w-full max-w-[340px] select-none">
                  {/* Central Asymmetric Carbon C* */}
                  <circle cx="180" cy="110" r="20" fill="#312e81" stroke="#818cf8" strokeWidth="3" />
                  <text x="180" y="115" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">C*</text>

                  {/* Top substituent (a) */}
                  <line x1="180" y1="90" x2="180" y2="40" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="180" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="180" y="34" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                    {chiralCenter.substituents[0]}
                  </text>

                  {/* Left Bottom (b) */}
                  <line x1="165" y1="125" x2="115" y2="170" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="105" cy="180" r="18" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="105" y="184" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">
                    {!isLOrS ? chiralCenter.substituents[1] : chiralCenter.substituents[2]}
                  </text>

                  {/* Right Bottom (c) */}
                  <line x1="195" y1="125" x2="245" y2="170" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="255" cy="180" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="255" y="184" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
                    {!isLOrS ? chiralCenter.substituents[2] : chiralCenter.substituents[1]}
                  </text>

                  {/* Front Wedge / Dash substituent (d) */}
                  <path d="M 180 128 L 195 155 L 165 155 Z" fill="#6366f1" />
                  <circle cx="180" cy="170" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="180" y="174" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
                    {chiralCenter.substituents[3]}
                  </text>
                </svg>
              </div>

              <button
                onClick={handleFlipChiral}
                className="px-5 py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30 text-xs font-bold transition-all flex items-center gap-2 shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Chuyển Đối Quang: Sang đồng phân {isLOrS ? 'D / (R)' : 'L / (S)'}
              </button>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 text-xs flex flex-col gap-1.5">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-400" />
                Đặc Điểm Tâm Bất Đối Xứng:
              </span>
              <p className="text-slate-300 leading-relaxed font-mono">
                {chiralCenter.pharmacologyOrBiologicalInsightVI}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Ý Nghĩa Sinh Học & Dược Học (Chiral Drugs)
              </h3>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
                <span className="font-bold text-purple-400">Tác dụng sinh học của {currentChiral.name}:</span>
                <span className="text-slate-300 leading-relaxed">{currentChiral.biologicalActivityVI}</span>
              </div>
              <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <p>
                  • Hai đồng phân đối quang (Enantiomers) có tính chất vật lý và hóa học thông thường giống hệt nhau (cùng t°s, t°nc, độ tan).
                </p>
                <p>
                  • Chúng chỉ khác nhau ở hướng quay mặt phẳng ánh sáng phân cực và tương tác với các thụ thể sinh học bất đối xứng trong cơ thể người.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODE 3: MARKOVNIKOV & ZAITSEV MECHANISMS */}
      {activeMode === 'MARKOVNIKOV' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          {/* Markovnikov Electrophilic Addition */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Quy Tắc Cộng Maccopnhicop (Addition)</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold">
                Cacbocation Bền Hơn
              </span>
            </div>

            <div className="flex gap-2">
              {CURRICULUM_MARKOVNIKOV_CASES.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMarkovnikovId(m.id);
                    sound.playDomainSnap?.();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedMarkovnikovId === m.id
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {m.alkeneNameVI.slice(0, 16)}...
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400">Phản ứng:</div>
              <div className="text-amber-300 font-bold text-sm my-1">{markovnikovCase.alkeneFormula} + {markovnikovCase.reagentFormula}</div>
              <div className="text-[11px] text-slate-400">{markovnikovCase.reagentNameVI}</div>
            </div>

            {/* Major vs Minor yield breakdown */}
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs flex flex-col gap-1">
                <div className="flex justify-between items-center font-bold text-emerald-300">
                  <span>SẢN PHẨM CHÍNH (Major Product)</span>
                  <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    {markovnikovCase.majorProduct.yieldPercent}%
                  </span>
                </div>
                <div className="font-mono font-bold text-white">{markovnikovCase.majorProduct.nameIUPAC}</div>
                <div className="text-slate-400 text-[11px]">{markovnikovCase.majorProduct.carbocationIntermediateVI}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
                <div className="flex justify-between items-center font-bold text-slate-400">
                  <span>SẢN PHẨM PHỤ (Minor Product)</span>
                  <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {markovnikovCase.minorProduct.yieldPercent}%
                  </span>
                </div>
                <div className="font-mono font-semibold text-slate-200">{markovnikovCase.minorProduct.nameIUPAC}</div>
                <div className="text-slate-400 text-[11px]">{markovnikovCase.minorProduct.carbocationIntermediateVI}</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
              {markovnikovCase.ruleStatementVI}
            </p>
          </div>

          {/* Zaitsev Elimination */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">Quy Tắc Tách Zai-xép (Elimination)</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 font-mono font-bold">
                Anken Bền Hơn
              </span>
            </div>

            <div className="flex gap-2">
              {CURRICULUM_ZAITSEV_CASES.map(z => (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZaitsevId(z.id);
                    sound.playDomainSnap?.();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedZaitsevId === z.id
                      ? 'bg-orange-500/20 border-orange-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {z.precursorNameVI.slice(0, 16)}...
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400">Chất ban đầu:</div>
              <div className="text-orange-300 font-bold text-sm my-1">{zaitsevCase.precursorFormula}</div>
              <div className="text-[11px] text-slate-400">Điều kiện: {zaitsevCase.conditionsVI}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs flex flex-col gap-1">
                <div className="flex justify-between items-center font-bold text-emerald-300">
                  <span>SẢN PHẨM CHÍNH (Major Alkene)</span>
                  <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    {zaitsevCase.majorAlkene.yieldPercent}%
                  </span>
                </div>
                <div className="font-mono font-bold text-white">{zaitsevCase.majorAlkene.nameIUPAC}</div>
                <div className="text-slate-400 text-[11px]">{zaitsevCase.majorAlkene.stabilityReasonVI}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
                <div className="flex justify-between items-center font-bold text-slate-400">
                  <span>SẢN PHẨM PHỤ (Minor Alkene)</span>
                  <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {zaitsevCase.minorAlkene.yieldPercent}%
                  </span>
                </div>
                <div className="font-mono font-semibold text-slate-200">{zaitsevCase.minorAlkene.nameIUPAC}</div>
                <div className="text-slate-400 text-[11px]">{zaitsevCase.minorAlkene.stabilityReasonVI}</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
              {zaitsevCase.ruleStatementVI}
            </p>
          </div>
        </div>
      )}

      {/* 5. MODE 4: DIAGNOSTIC ORGANIC TESTS (THUỐC THỬ ĐẶC TRƯNG) */}
      {activeMode === 'DIAGNOSTIC_TESTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
          {/* Left Column: Test Tube Simulation (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CURRICULUM_ORGANIC_TESTS.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTestId(t.id);
                    setTestedSubstance(t.positiveSubstances[0].formula);
                    sound.playDomainSnap?.();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                    selectedTestId === t.id
                      ? 'bg-sky-500/20 border-sky-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {t.testNameVI.split('(')[0].trim()}
                </button>
              ))}
            </div>

            {/* Virtual Test Tube SVG */}
            <div className="relative bg-slate-900/60 rounded-2xl border border-slate-800/90 p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-sky-400">{currentTest.testNameVI}</span>
                <span className="font-mono text-slate-400">{testedSubstance}</span>
              </div>

              {/* Test Tube SVG */}
              <div className="my-4 flex justify-center">
                <svg viewBox="0 0 200 280" className="w-40 select-none overflow-visible">
                  {/* Dropper adding reagent */}
                  <path d="M 100 0 L 105 25 L 95 25 Z" fill="#94a3b8" />
                  <circle cx="100" cy="35" r="4" fill={testResult.isPositive ? testResult.indicatorColor : '#94a3b8'} opacity="0.9" />

                  {/* Glass Test Tube Body */}
                  <path
                    d="M 60 40 L 60 210 A 40 40 0 0 0 140 210 L 140 40"
                    fill="#0f172a"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  {/* Liquid inside */}
                  <path
                    d="M 64 120 L 64 210 A 36 36 0 0 0 136 210 L 136 120 Z"
                    fill={testResult.isPositive ? testResult.indicatorColor : '#334155'}
                    opacity="0.8"
                  />

                  {/* Silver mirror coating on glass wall if Tollens */}
                  {testResult.isPositive && currentTest.id === 'tollens_silver_mirror' && (
                    <path
                      d="M 64 110 L 64 210 A 36 36 0 0 0 136 210 L 136 110"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="6"
                      strokeOpacity="0.85"
                    />
                  )}

                  {/* Precipitate granules at bottom */}
                  {testResult.isPositive && (currentTest.id.includes('iodoform') || currentTest.id.includes('cuoh2')) && (
                    <ellipse cx="100" cy="235" rx="25" ry="8" fill={testResult.indicatorColor} />
                  )}
                </svg>
              </div>

              {/* Status Outcome Banner */}
              <div className={`w-full p-3 rounded-xl border text-xs flex items-center justify-between ${
                testResult.isPositive
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {testResult.isPositive ? 'HIỆN TƯỢNG DƯƠNG TÍNH' : 'ÂM TÍNH (KHÔNG PHẢN ỨNG)'}
                </span>
                <span className="font-mono text-[11px]">{testResult.phenomenonVI.slice(0, 28)}...</span>
              </div>
            </div>
          </div>

          {/* Right Column: Chemical Equation, Phenol/Aldehyde Presets (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Quick Testable Substances Strip */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-2.5">
              <span className="text-xs font-bold text-white">Thử Nghiệm Các Hợp Chất Chuẩn:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentTest.positiveSubstances.map(pos => (
                  <button
                    key={pos.formula}
                    onClick={() => handleRunDiagnostic(pos.formula)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                      testedSubstance === pos.formula
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    ✓ {pos.nameVI.split('(')[0]} ({pos.formula})
                  </button>
                ))}
                {currentTest.negativeSubstances.map(neg => (
                  <button
                    key={neg.formula}
                    onClick={() => handleRunDiagnostic(neg.formula)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                      testedSubstance === neg.formula
                        ? 'bg-red-500/20 text-red-300 border-red-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    ✗ {neg.nameVI.split('(')[0]} ({neg.formula})
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Reaction Observation & Equation */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Quan Sát Thực Nghiệm & Phương Trình Hóa Học
              </h4>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
                <span className="font-semibold text-slate-300">Hiện tượng thực nghiệm:</span>
                <span className="text-white leading-relaxed">{testResult.phenomenonVI}</span>
              </div>

              {testResult.chemicalEquationVI && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1 font-mono">
                  <span className="font-semibold text-emerald-400">Phương trình hóa học:</span>
                  <span className="text-emerald-200 leading-relaxed font-bold">{testResult.chemicalEquationVI}</span>
                </div>
              )}

              <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                {testResult.pedagogicalReasonVI}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
