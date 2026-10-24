// src/components/visualizations/ElectrolysisVisualizer.tsx
// Interactive Electrolysis & Faraday's Laws Visualizer (Mô Phỏng Điện Phân & Định Luật Faraday)
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề Điện Phân) & IUPAC Standards

import React, { useState, useMemo, useEffect } from 'react';
import {
  Zap,
  Sliders,
  RotateCcw,
  Info,
  Layers,
  Sparkles,
  Gauge,
  Activity,
  CheckCircle2,
  Power,
  Flame,
  ArrowRight,
  HelpCircle,
  Clock,
  BatteryCharging,
  Cpu,
  GraduationCap
} from 'lucide-react';
import {
  ELECTROLYSIS_SCENARIOS,
  ElectrolysisScenario,
  simulateElectrolysis,
  calculateElectrolysisTime,
  GAS_MOLAR_VOLUME_STANDARD,
  GAS_MOLAR_VOLUME_LEGACY,
  CURRICULUM_ELECTROLYSIS_CHALLENGES
} from '../../domain/electrolysisEngine';
import { sound } from '../../audio/soundEngine';

export interface ElectrolysisVisualizerProps {
  initialScenarioId?: string;
  className?: string;
}

export const ElectrolysisVisualizer: React.FC<ElectrolysisVisualizerProps> = ({
  initialScenarioId = 'chlor_alkali_membrane',
  className = ''
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenarioId);
  const [currentA, setCurrentA] = useState<number>(3.0);
  const [durationSec, setDurationSec] = useState<number>(1800); // 30 mins default
  const [efficiencyPercent, setEfficiencyPercent] = useState<number>(100);
  const [gasStandard, setGasStandard] = useState<'GDPT_2018' | 'LEGACY'>('GDPT_2018');
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'PEDAGOGY' | 'QUIZ'>('SIMULATION');

  // Animation cycle
  const [animTick, setAnimTick] = useState<number>(0);

  // Selected quiz question state
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);

  // Time calculator modal/panel
  const [targetMassInput, setTargetMassInput] = useState<string>('');

  const scenario: ElectrolysisScenario = useMemo(() => {
    return ELECTROLYSIS_SCENARIOS[selectedScenarioId] || ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
  }, [selectedScenarioId]);

  // Sync default parameters when scenario changes
  useEffect(() => {
    if (scenario) {
      setCurrentA(scenario.recommendedCurrentA);
      setDurationSec(scenario.recommendedTimeSec);
    }
  }, [scenario]);

  // Animation loop for electrons and bubbles
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (isPowerOn) {
        setAnimTick(prev => (prev + dt * 1.8) % 100);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPowerOn]);

  const gasMolarVolume = gasStandard === 'GDPT_2018' ? GAS_MOLAR_VOLUME_STANDARD : GAS_MOLAR_VOLUME_LEGACY;

  // Run simulation
  const result = useMemo(() => {
    return simulateElectrolysis(selectedScenarioId, currentA, durationSec, {
      efficiencyPercent,
      gasMolarVolume
    });
  }, [selectedScenarioId, currentA, durationSec, efficiencyPercent, gasMolarVolume]);

  const handleTogglePower = () => {
    const nextState = !isPowerOn;
    setIsPowerOn(nextState);
    if (nextState) {
      sound.playElectrolysisSpark();
    }
  };

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setSelectedOptionId(null);
    setHasSubmittedQuiz(false);
    sound.playDomainSnap?.();
  };

  const handleEffervescenceTrigger = () => {
    sound.playElectrodeGasEffervescence();
  };

  const calculatedTimeNeededSec = useMemo(() => {
    const m = parseFloat(targetMassInput);
    if (isNaN(m) || m <= 0) return null;
    return calculateElectrolysisTime({
      targetMassGrams: m,
      molarMass: scenario.cathode.molarMass,
      electronsTransferred: scenario.cathode.stoichiometricElectronRatio,
      currentA,
      efficiencyPercent
    });
  }, [targetMassInput, scenario, currentA, efficiencyPercent]);

  return (
    <div className={`flex flex-col bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans ${className}`}>
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Mô Phỏng Điện Phân & Định Luật Faraday
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono font-medium">
                  GDPT 2018 · Hóa 12
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Điện phân nóng chảy & dung dịch · Định luật Faraday m = (A·I·t)/(n·F)
            </p>
          </div>
        </div>

        {/* Global Controls & Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => { setActiveTab('SIMULATION'); sound.playDomainSnap?.(); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'SIMULATION'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Mô Phỏng Trực Quan
            </button>
            <button
              onClick={() => { setActiveTab('PEDAGOGY'); sound.playDomainSnap?.(); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'PEDAGOGY'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Bản Chất Sư Phạm
            </button>
            <button
              onClick={() => { setActiveTab('QUIZ'); sound.playDomainSnap?.(); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'QUIZ'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Đề Thi THPT ({CURRICULUM_ELECTROLYSIS_CHALLENGES.length})
            </button>
          </div>

          {/* Power toggle */}
          <button
            onClick={handleTogglePower}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isPowerOn
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-emerald-950/40'
                : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 shadow-red-950/40'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {isPowerOn ? 'Nguồn DC: Đang Bật' : 'Nguồn DC: Đã Ngắt'}
          </button>
        </div>
      </div>

      {/* 2. Scenario Picker Strip */}
      <div className="flex gap-2 p-3 bg-slate-900/50 border-b border-slate-800/60 overflow-x-auto no-scrollbar">
        {Object.values(ELECTROLYSIS_SCENARIOS).map(item => {
          const isSelected = item.id === selectedScenarioId;
          return (
            <button
              key={item.id}
              onClick={() => handleScenarioChange(item.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md shadow-amber-950/30'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold">
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
                <span>{item.nameEN}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  {item.medium === 'MOLTEN' ? 'Nóng Chảy' : 'Dung Dịch'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[220px]">
                {item.electrolyteFormula}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Body */}
      {activeTab === 'SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
          {/* Left Column: Interactive Electrolytic Cell SVG & Diagram (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative bg-slate-900/60 rounded-2xl border border-slate-800/90 p-4 overflow-hidden flex flex-col items-center">
              {/* Overall Equation Badge */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">PT Điện phân:</span>
                  <span className="font-mono text-slate-200 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    {scenario.overallEquation}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>t = {durationSec}s ({(durationSec / 60).toFixed(1)} phút)</span>
                </div>
              </div>

              {/* 2D Schematic SVG */}
              <div className="w-full my-2 flex justify-center">
                <svg
                  viewBox="0 0 600 360"
                  className="w-full max-w-[560px] h-auto select-none overflow-visible"
                >
                  <defs>
                    <linearGradient id="anodeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#991b1b" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="cathodeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                      {scenario.medium === 'MOLTEN' ? (
                        <>
                          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#b45309" stopOpacity="0.65" />
                        </>
                      ) : scenario.id.includes('cuso4') ? (
                        <>
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.55" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
                        </>
                      )}
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Beaker / Cell container */}
                  <rect
                    x="100"
                    y="130"
                    width="400"
                    height="200"
                    rx="18"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Electrolyte solution inside beaker */}
                  <rect
                    x="104"
                    y="160"
                    width="392"
                    height="165"
                    rx="14"
                    fill="url(#liquidGrad)"
                  />

                  {/* Optional Semi-permeable Membrane / Diaphragm */}
                  {scenario.hasDiaphragmOrMembrane && (
                    <g>
                      <line
                        x1="300"
                        y1="150"
                        x2="300"
                        y2="325"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="6,4"
                      />
                      <rect
                        x="280"
                        y="136"
                        width="40"
                        height="18"
                        rx="4"
                        fill="#78350f"
                        stroke="#f59e0b"
                        strokeWidth="1"
                      />
                      <text
                        x="300"
                        y="148"
                        textAnchor="middle"
                        fill="#fbbf24"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        Màng ngăn
                      </text>
                    </g>
                  )}

                  {/* DC Power Supply Box */}
                  <rect
                    x="220"
                    y="15"
                    width="160"
                    height="65"
                    rx="12"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  <text
                    x="300"
                    y="36"
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    NGUỒN ĐIỆN 1 CHIỀU (DC)
                  </text>
                  <text
                    x="300"
                    y="52"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    U = {result.metrics.actualVoltageV.toFixed(2)} V · I = {currentA.toFixed(2)} A
                  </text>
                  <circle cx="245" cy="65" r="7" fill="#ef4444" />
                  <text x="245" y="69" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">+</text>
                  <circle cx="355" cy="65" r="7" fill="#3b82f6" />
                  <text x="355" y="69" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">-</text>

                  {/* Wires from DC to Electrodes */}
                  {/* Positive (+) Wire to Anode */}
                  <path
                    d="M 245 72 L 245 95 L 180 95 L 180 140"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                  {/* Negative (-) Wire to Cathode */}
                  <path
                    d="M 355 72 L 355 95 L 420 95 L 420 140"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />

                  {/* Animated Electron dots along wires */}
                  {isPowerOn && (
                    <g>
                      {/* Electrons flowing from Anode (left) to DC (+) */}
                      <circle
                        cx={180}
                        cy={140 - (animTick % 45)}
                        r="3.5"
                        fill="#facc15"
                      />
                      <circle
                        cx={180 + (animTick % 65)}
                        cy={95}
                        r="3.5"
                        fill="#facc15"
                      />
                      {/* Electrons flowing from DC (-) to Cathode (right) */}
                      <circle
                        cx={355 + (animTick % 65)}
                        cy={95}
                        r="3.5"
                        fill="#facc15"
                      />
                      <circle
                        cx={420}
                        cy={95 + (animTick % 45)}
                        r="3.5"
                        fill="#facc15"
                      />
                    </g>
                  )}

                  {/* Anode Electrode (+) [Left] */}
                  <rect
                    x="165"
                    y="135"
                    width="30"
                    height="140"
                    rx="4"
                    fill="url(#anodeGrad)"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                  />
                  <text
                    x="180"
                    y="125"
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    ANOT (+)
                  </text>
                  <text
                    x="180"
                    y="290"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="9"
                    fontWeight="semibold"
                  >
                    {scenario.anode.speciesProduced.slice(0, 10)}
                  </text>

                  {/* Cathode Electrode (-) [Right] */}
                  <rect
                    x="405"
                    y="135"
                    width="30"
                    height="140"
                    rx="4"
                    fill="url(#cathodeGrad)"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                  />
                  <text
                    x="420"
                    y="125"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    CATOT (-)
                  </text>
                  <text
                    x="420"
                    y="290"
                    textAnchor="middle"
                    fill="#93c5fd"
                    fontSize="9"
                    fontWeight="semibold"
                  >
                    {scenario.cathode.speciesProduced.slice(0, 10)}
                  </text>

                  {/* Bubbles or Deposition Layer Animation */}
                  {isPowerOn && (
                    <g onClick={handleEffervescenceTrigger} className="cursor-pointer">
                      {/* Anode side bubbles if gas */}
                      {scenario.anode.state === 'GAS' && (
                        <>
                          <circle cx="160" cy={230 - ((animTick * 3) % 70)} r="4" fill={scenario.anode.visualColor} opacity="0.8" />
                          <circle cx="168" cy={250 - ((animTick * 2.5 + 20) % 80)} r="5.5" fill={scenario.anode.visualColor} opacity="0.75" />
                          <circle cx="156" cy={265 - ((animTick * 2 + 40) % 90)} r="3" fill={scenario.anode.visualColor} opacity="0.85" />
                        </>
                      )}

                      {/* Cathode side bubbles if gas */}
                      {scenario.cathode.state === 'GAS' && (
                        <>
                          <circle cx="438" cy={230 - ((animTick * 3.5) % 70)} r="3.5" fill={scenario.cathode.visualColor} opacity="0.8" />
                          <circle cx="442" cy={255 - ((animTick * 3 + 15) % 85)} r="5" fill={scenario.cathode.visualColor} opacity="0.75" />
                          <circle cx="445" cy={270 - ((animTick * 2.2 + 35) % 95)} r="4" fill={scenario.cathode.visualColor} opacity="0.85" />
                        </>
                      )}

                      {/* Solid Deposition on Cathode (e.g. Copper plating or Aluminum layer) */}
                      {scenario.cathode.state === 'SOLID' && (
                        <rect
                          x="400"
                          y="155"
                          width="7"
                          height="115"
                          rx="3"
                          fill="#ea580c"
                          stroke="#fdba74"
                          strokeWidth="1"
                        />
                      )}

                      {/* Liquid Metal Layer at Bottom (e.g. Na or Al) */}
                      {scenario.cathode.state === 'LIQUID' && (
                        <rect
                          x="108"
                          y="305"
                          width="384"
                          height="15"
                          rx="6"
                          fill="#94a3b8"
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          opacity="0.9"
                        />
                      )}
                    </g>
                  )}

                  {/* Indicator labels in solution */}
                  <text
                    x="300"
                    y="225"
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {scenario.electrolyteName.slice(0, 36)}...
                  </text>
                  <text
                    x="300"
                    y="245"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    e⁻ di chuyển: Anot (+) ➔ Nguồn DC ➔ Catot (-)
                  </text>
                </svg>
              </div>

              {/* Bottom Quick Metric summary bar */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-center">
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Điện Lượng (Q)</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono">
                    {result.metrics.totalChargeCoulombs.toLocaleString()} C
                  </div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Mol electron (n_e)</div>
                  <div className="text-xs sm:text-sm font-bold text-sky-400 font-mono">
                    {result.metrics.molesOfElectrons.toFixed(5)} mol
                  </div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Sản phẩm Catot (-)</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono truncate">
                    {result.cathodeResult.displayQuantityText}
                  </div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Sản phẩm Anot (+)</div>
                  <div className="text-xs sm:text-sm font-bold text-red-400 font-mono truncate">
                    {result.anodeResult.displayQuantityText}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Faraday Formula Derivation */}
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  Các Bước Áp Dụng Định Luật Faraday (Bảo Toàn Mol Electron):
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  F = 96,485 C/mol · Vm = {gasMolarVolume} L/mol
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 font-mono">
                {result.faradayFormulaDerivationVI.map((step, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Parameters, Target Mass Calculator, & Cell Metrics (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* 1. Electrolysis Parameters Panel */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Thông Số Thí Nghiệm</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentA(scenario.recommendedCurrentA);
                    setDurationSec(scenario.recommendedTimeSec);
                    setEfficiencyPercent(100);
                    sound.playDomainSnap?.();
                  }}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Mặc định
                </button>
              </div>

              {/* Current Slider (I) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Cường độ dòng điện (I):</span>
                  <span className="font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {currentA.toFixed(2)} A
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20.0"
                  step="0.25"
                  value={currentA}
                  onChange={e => setCurrentA(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0.5 A</span>
                  <span>5.0 A</span>
                  <span>10.0 A</span>
                  <span>20.0 A</span>
                </div>
              </div>

              {/* Time Slider & Quick Buttons (t) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Thời gian điện phân (t):</span>
                  <span className="font-mono font-bold text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {durationSec} s ({(durationSec / 60).toFixed(1)} phút)
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="7200"
                  step="60"
                  value={durationSec}
                  onChange={e => setDurationSec(parseInt(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex gap-1.5 mt-1">
                  {[300, 900, 1800, 3600, 7200].map(sec => (
                    <button
                      key={sec}
                      onClick={() => { setDurationSec(sec); sound.playDomainSnap?.(); }}
                      className={`flex-1 py-1 rounded text-[11px] font-mono border transition-all ${
                        durationSec === sec
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {sec < 3600 ? `${sec / 60}m` : `${sec / 3600}h`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Efficiency & Gas standard toggles */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-slate-400">Hiệu suất dòng (η):</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="range"
                      min="60"
                      max="100"
                      step="5"
                      value={efficiencyPercent}
                      onChange={e => setEfficiencyPercent(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1 bg-slate-800 rounded cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {efficiencyPercent}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-slate-400">Điều kiện thể tích khí:</span>
                  <button
                    onClick={() => {
                      setGasStandard(prev => (prev === 'GDPT_2018' ? 'LEGACY' : 'GDPT_2018'));
                      sound.playDomainSnap?.();
                    }}
                    className="px-2 py-1 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 hover:border-slate-700 text-left font-mono"
                  >
                    {gasStandard === 'GDPT_2018' ? '24.79 L/mol (25°C, 1 bar)' : '22.4 L/mol (0°C, 1 atm)'}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Target Mass Calculator Tool (Tính thời gian cần thiết để giải phóng m gam) */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Công Cụ Đảo: Tính Thời Gian Cần Điện Phân</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Nhập khối lượng kim loại muốn thu được ở Catot ({scenario.cathode.speciesFormula}, M = {scenario.cathode.molarMass} g/mol) với cường độ dòng điện {currentA}A:
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Ví dụ: 3.2 (gam)"
                  value={targetMassInput}
                  onChange={e => setTargetMassInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  onClick={() => {
                    if (calculatedTimeNeededSec) {
                      setDurationSec(Math.round(calculatedTimeNeededSec));
                      sound.playDomainSnap?.();
                    }
                  }}
                  disabled={!calculatedTimeNeededSec}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Áp dụng t
                </button>
              </div>

              {calculatedTimeNeededSec !== null && (
                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs flex items-center justify-between">
                  <span className="text-slate-300">Thời gian cần thiết (t):</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {calculatedTimeNeededSec.toFixed(1)} s (~{(calculatedTimeNeededSec / 60).toFixed(2)} phút)
                  </span>
                </div>
              )}
            </div>

            {/* 3. Detailed Cell Half-Reactions */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <BatteryCharging className="w-4 h-4 text-sky-400" />
                <span>Bán Phản Ứng Tại Từng Điện Cực</span>
              </div>

              <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between font-bold text-red-400">
                  <span>ANOT (+) · Sự Oxi Hóa (Oxidation)</span>
                  <span className="font-mono text-[10px] text-red-300">E° = {scenario.anode.standardPotentialE0}V</span>
                </div>
                <div className="font-mono text-slate-100 font-semibold bg-slate-950/80 px-2.5 py-1 rounded border border-red-900/50">
                  {scenario.anode.halfReactionEquation}
                </div>
                <p className="text-[11px] text-slate-400 pt-0.5">
                  {scenario.anode.descriptionVI}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between font-bold text-sky-400">
                  <span>CATOT (-) · Sự Khử (Reduction)</span>
                  <span className="font-mono text-[10px] text-sky-300">E° = {scenario.cathode.standardPotentialE0}V</span>
                </div>
                <div className="font-mono text-slate-100 font-semibold bg-slate-950/80 px-2.5 py-1 rounded border border-sky-900/50">
                  {scenario.cathode.halfReactionEquation}
                </div>
                <p className="text-[11px] text-slate-400 pt-0.5">
                  {scenario.cathode.descriptionVI}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tab 2: Pedagogy & Curriculum Standards */}
      {activeTab === 'PEDAGOGY' && (
        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: General Rules of Electrolysis */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Quy Tắc Thứ Tự Phóng Điện Ở Các Điện Cực (GDPT 2018)
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-sky-400 mb-1">1. Tại Catot (-) [Quá trình khử cation]:</div>
                  <p className="leading-relaxed text-slate-400">
                    Cation có tính oxi hóa mạnh hơn sẽ bị khử trước theo dãy điện hóa:
                  </p>
                  <p className="font-mono text-amber-300 font-semibold my-1">
                    Ag⁺ &gt; Fe³⁺ &gt; Cu²⁺ &gt; H⁺ &gt; Pb²⁺ &gt; Sn²⁺ &gt; Fe²⁺ &gt; Zn²⁺ &gt; H₂O
                  </p>
                  <p className="text-[11px] text-slate-400">
                    * Các kim loại từ Al³⁺ trở về trước (K⁺, Na⁺, Ca²⁺, Mg²⁺, Al³⁺) không bị khử trong dung dịch nước; phân tử H₂O sẽ bị khử thay thế sinh H₂: 2H₂O + 2e⁻ → H₂ + 2OH⁻.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-red-400 mb-1">2. Tại Anot (+) [Quá trình oxi hóa anion điện cực trơ]:</div>
                  <p className="leading-relaxed text-slate-400">
                    Anion có tính khử mạnh hơn sẽ bị oxi hóa trước:
                  </p>
                  <p className="font-mono text-amber-300 font-semibold my-1">
                    S²⁻ &gt; I⁻ &gt; Br⁻ &gt; Cl⁻ &gt; OH⁻ &gt; H₂O &gt; SO₄²⁻, NO₃⁻, CO₃²⁻, F⁻
                  </p>
                  <p className="text-[11px] text-slate-400">
                    * Các gốc axit chứa oxi (SO₄²⁻, NO₃⁻,...) và ion F⁻ không bao giờ bị oxi hóa trong dung dịch nước; H₂O bị oxi hóa thay thế sinh O₂: 2H₂O → O₂ + 4H⁺ + 4e⁻.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Specific Scenario Insights */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                Chi Tiết Cốt Lõi: {scenario.nameVI}
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-slate-200">Điểm sư phạm quan trọng:</div>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-400 leading-relaxed">
                  {scenario.pedagogicalKeyPointsVI.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex flex-col gap-1">
                <span className="font-bold text-emerald-400">Ứng dụng thực tiễn trong công nghiệp:</span>
                <span className="text-slate-400 leading-relaxed">{scenario.industrialApplicationVI}</span>
              </div>

              {scenario.historicalContextVI && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex flex-col gap-1">
                  <span className="font-bold text-amber-400">Lịch sử phát minh khoa học:</span>
                  <span className="text-slate-400 leading-relaxed">{scenario.historicalContextVI}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 3: Curriculum Exam Challenges & Quiz */}
      {activeTab === 'QUIZ' && (
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                Câu Hỏi Trắc Nghiệm Ôn Thi Tốt Nghiệp THPT Chuyên Đề Điện Phân
              </h3>
              <p className="text-xs text-slate-400">
                Trích đề thi chuẩn GDPT 2018 · Rèn luyện kỹ năng giải nhanh định luật Faraday
              </p>
            </div>
            <div className="flex gap-1.5">
              {CURRICULUM_ELECTROLYSIS_CHALLENGES.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuizIndex(idx);
                    setSelectedOptionId(null);
                    setHasSubmittedQuiz(false);
                    sound.playDomainSnap?.();
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all ${
                    selectedQuizIndex === idx
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question Display */}
          {(() => {
            const currentQuestion = CURRICULUM_ELECTROLYSIS_CHALLENGES[selectedQuizIndex];
            if (!currentQuestion) return null;

            return (
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 uppercase tracking-wider">
                    {currentQuestion.titleVI}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    currentQuestion.difficulty === 'EASY'
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                      : 'bg-amber-950/40 text-amber-400 border-amber-800/60'
                  }`}>
                    {currentQuestion.difficulty === 'EASY' ? 'Mức độ: Thông hiểu' : 'Mức độ: Vận dụng'}
                  </span>
                </div>

                <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  {currentQuestion.questionVI}
                </p>

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQuestion.options.map(opt => {
                    const isSelected = selectedOptionId === opt.id;
                    let style = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (hasSubmittedQuiz) {
                      if (opt.isCorrect) {
                        style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && !opt.isCorrect) {
                        style = 'bg-red-950/40 border-red-500 text-red-300 font-semibold';
                      }
                    } else if (isSelected) {
                      style = 'bg-sky-500/20 border-sky-500 text-white font-semibold';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={hasSubmittedQuiz}
                        onClick={() => {
                          setSelectedOptionId(opt.id);
                          sound.playDomainSnap?.();
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${style}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                          {opt.id}
                        </span>
                        <span className="leading-snug">{opt.textVI}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submit button & Detailed Answer Explanation */}
                <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                  {!hasSubmittedQuiz ? (
                    <button
                      disabled={!selectedOptionId}
                      onClick={() => {
                        setHasSubmittedQuiz(true);
                        const isCorrect = currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect;
                        if (isCorrect) {
                          sound.playReactionSuccess();
                        } else {
                          sound.playElectrolysisSpark();
                        }
                      }}
                      className="px-5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold hover:bg-emerald-500/30 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Kiểm Tra Đáp Án
                    </button>
                  ) : (
                    <div className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Chính xác! Bạn đã nắm vững kiến thức.
                          </span>
                        ) : (
                          <span className="text-red-400">
                            Chưa chính xác! Xem lời giải chi tiết bên dưới:
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                        {currentQuestion.explanationVI}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
