// src/components/visualizations/GalvanicCellVisualizer.tsx
// Interactive Galvanic Electrochemical Cell & Nernst Equation Visualizer (Mô Phỏng Pin Điện Hóa & Phương Trình Nernst)
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Pin Điện Hóa) & IUPAC Standards

import React, { useState, useMemo, useEffect } from 'react';
import {
  Battery,
  Zap,
  Sliders,
  RotateCcw,
  Info,
  Layers,
  Shield,
  ArrowRight,
  BookOpen,
  Sparkles,
  Gauge,
  Thermometer,
  Activity,
  CheckCircle2,
  Power,
  Waves
} from 'lucide-react';
import {
  STANDARD_REDUCTION_POTENTIALS,
  GALVANIC_CELL_PRESETS,
  GalvanicCellPreset,
  simulateGalvanicCell,
  GalvanicCellResult,
  RedoxCouple
} from '../../domain/electrochemistryEngine';
import { sound } from '../../audio/soundEngine';

export interface GalvanicCellVisualizerProps {
  initialPresetId?: string;
  initialAnodeCoupleId?: string;
  initialCathodeCoupleId?: string;
  className?: string;
  onPotentialChange?: (eCell: number) => void;
}

export const GalvanicCellVisualizer: React.FC<GalvanicCellVisualizerProps> = ({
  initialPresetId = 'daniell_zn_cu',
  initialAnodeCoupleId,
  initialCathodeCoupleId,
  className = '',
  onPotentialChange
}) => {
  // Preset or Custom selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const [coupleAId, setCoupleAId] = useState<string>(
    initialAnodeCoupleId || GALVANIC_CELL_PRESETS[0].anodeCoupleId
  );
  const [coupleBId, setCoupleBId] = useState<string>(
    initialCathodeCoupleId || GALVANIC_CELL_PRESETS[0].cathodeCoupleId
  );

  // Electrochemical parameters
  const [concentrationA, setConcentrationA] = useState<number>(1.0); // M
  const [concentrationB, setConcentrationB] = useState<number>(1.0); // M
  const [tempCelsius, setTempCelsius] = useState<number>(25); // °C
  const [isCircuitClosed, setIsCircuitClosed] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'PEDAGOGY' | 'TACTICAL'>('SIMULATION');

  // Electron animation cycle phase
  const [animTick, setAnimTick] = useState<number>(0);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (isCircuitClosed) {
        setAnimTick(prev => (prev + dt * 1.5) % 1);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isCircuitClosed]);

  // Find active preset if matches current couples
  const currentPreset = useMemo<GalvanicCellPreset | undefined>(() => {
    return GALVANIC_CELL_PRESETS.find(p => p.id === selectedPresetId);
  }, [selectedPresetId]);

  // Compute simulation result
  const cellResult = useMemo<GalvanicCellResult | null>(() => {
    try {
      const tempK = tempCelsius + 273.15;
      return simulateGalvanicCell({
        coupleAId,
        coupleBId,
        concentrationA,
        concentrationB,
        temperatureKelvin: tempK
      });
    } catch {
      return null;
    }
  }, [coupleAId, coupleBId, concentrationA, concentrationB, tempCelsius]);

  useEffect(() => {
    if (cellResult && onPotentialChange) {
      onPotentialChange(isCircuitClosed ? cellResult.nonStandardCellPotentialE : 0);
    }
  }, [cellResult, isCircuitClosed, onPotentialChange]);

  // Preset switch handler
  const handleSelectPreset = (preset: GalvanicCellPreset) => {
    setSelectedPresetId(preset.id);
    setCoupleAId(preset.anodeCoupleId);
    setCoupleBId(preset.cathodeCoupleId);
    setConcentrationA(1.0);
    setConcentrationB(1.0);
    setTempCelsius(25);
    setIsCircuitClosed(true);
    sound.playUiClick();
    sound.playGalvanicCurrentHum(preset.standardPotentialE0);
  };

  const handleToggleCircuit = () => {
    const nextState = !isCircuitClosed;
    setIsCircuitClosed(nextState);
    sound.playGalvanicCircuitSwitch(nextState);
    if (nextState && cellResult) {
      sound.playGalvanicCurrentHum(cellResult.nonStandardCellPotentialE);
    }
  };

  const handleReset = () => {
    setConcentrationA(1.0);
    setConcentrationB(1.0);
    setTempCelsius(25);
    setIsCircuitClosed(true);
    sound.playUiClick();
    if (cellResult) {
      sound.playGalvanicCurrentHum(cellResult.standardCellPotentialE0);
    }
  };

  // Measured voltmeter potential (0.00 V when open circuit)
  const displayedVoltage = isCircuitClosed && cellResult ? cellResult.nonStandardCellPotentialE : 0.0;
  const standardVoltage = cellResult ? cellResult.standardCellPotentialE0 : 1.1;

  // Determine Anode and Cathode visuals
  const anodeCouple = cellResult?.anode.couple;
  const cathodeCouple = cellResult?.cathode.couple;

  const anodeColor = currentPreset?.anodeColor || '#94A3B8';
  const cathodeColor = currentPreset?.cathodeColor || '#E07A5F';
  const anodeSolColor = currentPreset?.anodeSolutionColor || 'rgba(148, 163, 184, 0.25)';
  const cathodeSolColor = currentPreset?.cathodeSolutionColor || 'rgba(14, 165, 233, 0.45)';

  // Voltmeter needle rotation angle (-60 deg for -1V, 0 deg for 1.1V, +60 deg for 3V)
  const needleAngle = useMemo(() => {
    if (!isCircuitClosed) return -65; // At rest on 0/left
    // Scale from 0V to 3.0V -> angle from -50 deg to +50 deg
    const clampedV = Math.max(-0.5, Math.min(3.5, displayedVoltage));
    return -50 + (clampedV / 3.0) * 100;
  }, [displayedVoltage, isCircuitClosed]);

  // Available redox couples for custom pair selection
  const allCouples = useMemo<RedoxCouple[]>(() => {
    return Object.values(STANDARD_REDUCTION_POTENTIALS);
  }, []);

  return (
    <div
      className={`bg-gradient-to-b from-navy to-obsidian border border-navy-light/80 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory space-y-6 ${className}`}
      role="region"
      aria-label="Mô phỏng Pin Điện Hóa và Phương Trình Nernst"
    >
      {/* ========================================================================= */}
      {/* 1. HEADER & PRESET PICKER                                                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-ion/15 text-cyan-ion border border-cyan-ion/40 shadow-inner">
            <Battery className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wide">
                PIN ĐIỆN HÓA & PHƯƠNG TRÌNH NERNST
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40">
                GDPT 2018 LỚP 12
              </span>
            </div>
            <p className="text-xs text-ivory-muted font-mono mt-0.5">
              Mô phỏng bán phản ứng Anot (-), Catot (+), cầu muối KNO₃ &amp; tính thế Nernst E(pin)
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleToggleCircuit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow ${
              isCircuitClosed
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30'
            }`}
            title="Đóng / Ngắt mạch ngoài của pin"
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isCircuitClosed ? 'MẠCH ĐÓNG (ON)' : 'MẠCH HỞ (OFF)'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-navy-light/60 hover:bg-navy-light text-ivory-muted hover:text-ivory transition-colors border border-navy-light"
            title="Thiết lập lại điều kiện chuẩn 1.0 M, 25°C"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chuẩn</span>
          </button>
        </div>
      </div>

      {/* Benchmark Presets Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-xs font-bold text-copper uppercase tracking-wider flex items-center gap-1 shrink-0 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-copper" /> Pin Mẫu:
        </span>
        {GALVANIC_CELL_PRESETS.map(preset => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-cyan-ion text-obsidian font-bold border-cyan-ion shadow-md shadow-cyan-ion/20'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-ivory border-navy-light/60 hover:bg-navy-light/70'
              }`}
            >
              {preset.nameVi} <span className="opacity-80 text-[10px] font-mono">({preset.standardPotentialE0.toFixed(2)}V)</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-navy-light/60 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('SIMULATION');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'SIMULATION'
              ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50 shadow'
              : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Mô Phỏng Trực Quan &amp; Điện Kế</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('PEDAGOGY');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'PEDAGOGY'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow'
              : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Phân Tích Nhiệt Động &amp; Nernst</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('TACTICAL');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'TACTICAL'
              ? 'bg-copper/20 text-copper border border-copper/50 shadow'
              : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-copper" />
          <span>Cơ Chế Chiến Thuật TCG/MOBA</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB 1: VISUAL SIMULATION & VOLTMETER                                    */}
      {/* ========================================================================= */}
      {activeTab === 'SIMULATION' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main SVG Schematic Canvas */}
          <div className="relative w-full bg-obsidian rounded-2xl border border-navy-light/80 p-3 sm:p-5 shadow-inner overflow-hidden select-none">
            {/* Ambient circuit glow */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCircuitClosed ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 50% 25%, rgba(6,182,212,0.18) 0%, transparent 70%)'
              }}
            />

            <svg
              viewBox="0 0 800 480"
              className="w-full h-auto overflow-visible"
              style={{ maxHeight: '520px' }}
            >
              <defs>
                {/* Metallic electrode gradients */}
                <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={anodeColor} stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor={anodeColor} stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="cathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={cathodeColor} stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor={cathodeColor} stopOpacity="0.95" />
                </linearGradient>

                {/* Salt bridge agar gel gradient */}
                <linearGradient id="saltBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.4" />
                </linearGradient>

                {/* Glass beaker reflections */}
                <linearGradient id="glassWall" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                  <stop offset="10%" stopColor="#0F172A" stopOpacity="0.1" />
                  <stop offset="90%" stopColor="#0F172A" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
                </linearGradient>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ========================================================================= */}
              {/* VOLTMETER & EXTERNAL CONDUCTOR CIRCUIT (TOP CENTER)                       */}
              {/* ========================================================================= */}
              {/* External Wire (Copper Brown / Neon Gold when active) */}
              <path
                d="M 185 190 L 185 75 L 340 75"
                fill="none"
                stroke={isCircuitClosed ? '#F59E0B' : '#78716C'}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 460 75 L 615 75 L 615 190"
                fill="none"
                stroke={isCircuitClosed ? '#F59E0B' : '#78716C'}
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Animated Electron Flow Dots (Anode (-) -> Cathode (+)) */}
              {isCircuitClosed && (
                <>
                  {[0, 0.2, 0.4, 0.6, 0.8].map(offset => {
                    const phase = (animTick + offset) % 1;
                    // Wire coordinates: Anode strip (185, 190) -> top-left corner (185, 75) -> voltmeter left (340, 75)
                    // Then voltmeter right (460, 75) -> top-right corner (615, 75) -> Cathode strip (615, 190)
                    let cx = 185;
                    let cy = 75;

                    if (phase < 0.25) {
                      // Rising from Anode
                      const p = phase / 0.25;
                      cx = 185;
                      cy = 190 - p * 115;
                    } else if (phase < 0.5) {
                      // Moving right to Voltmeter left
                      const p = (phase - 0.25) / 0.25;
                      cx = 185 + p * 155;
                      cy = 75;
                    } else if (phase < 0.75) {
                      // Leaving Voltmeter right to right corner
                      const p = (phase - 0.5) / 0.25;
                      cx = 460 + p * 155;
                      cy = 75;
                    } else {
                      // Descending into Cathode
                      const p = (phase - 0.75) / 0.25;
                      cx = 615;
                      cy = 75 + p * 115;
                    }

                    return (
                      <g key={offset} filter="url(#neonGlow)">
                        <circle cx={cx} cy={cy} r="4.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
                        <text
                          x={cx}
                          y={cy + 2.5}
                          textAnchor="middle"
                          fill="#0F172A"
                          fontSize="7"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          e⁻
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Voltmeter Housing (Center Top) */}
              <g transform="translate(340, 20)">
                {/* Instrument Body */}
                <rect
                  x="0"
                  y="0"
                  width="120"
                  height="105"
                  rx="14"
                  fill="#0B1320"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  filter="drop-shadow(0 6px 12px rgba(0,0,0,0.6))"
                />

                {/* Dial Face Arc */}
                <path
                  d="M 20 65 A 40 40 0 0 1 100 65"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 65 A 40 40 0 0 1 100 65"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />

                {/* Dial Scale Labels */}
                <text x="22" y="76" fontSize="7" fill="#94A3B8" fontFamily="monospace">0V</text>
                <text x="60" y="32" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">1.5V</text>
                <text x="98" y="76" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="end">3.0V</text>

                {/* Voltmeter Needle */}
                <g transform="translate(60, 65)">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-38"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${needleAngle})`}
                    style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  />
                  <circle cx="0" cy="0" r="4" fill="#E2E8F0" stroke="#0B1320" strokeWidth="1.5" />
                </g>

                {/* Voltmeter Digital 7-Segment Readout */}
                <rect x="25" y="80" width="70" height="18" rx="4" fill="#030712" stroke="#1E293B" strokeWidth="1" />
                <text
                  x="60"
                  y="93"
                  textAnchor="middle"
                  fill={isCircuitClosed ? '#38BDF8' : '#64748B'}
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="bold"
                >
                  {isCircuitClosed ? `${displayedVoltage >= 0 ? '+' : ''}${displayedVoltage.toFixed(3)} V` : '0.000 V'}
                </text>

                {/* Top Label */}
                <text x="60" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ĐIỆN KẾ (VOLTMETER)
                </text>
              </g>

              {/* Electron Flow Direction Banner */}
              <g transform="translate(400, 142)">
                <rect x="-105" y="-12" width="210" height="24" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {isCircuitClosed ? '◄ DÒNG ELECTRON (e⁻) DI CHUYỂN ◄' : 'MẠCH NGOÀI ĐANG MỞ (NGẮT)'}
                </text>
              </g>

              {/* ========================================================================= */}
              {/* SALT BRIDGE U-TUBE (CẦU MUỐI KNO3)                                        */}
              {/* ========================================================================= */}
              <g>
                {/* U-Tube Outer Glass Wall */}
                <path
                  d="M 235 340 L 235 220 Q 235 170 280 170 L 520 170 Q 565 170 565 220 L 565 340"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="28"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                {/* U-Tube Agar Gel Filling */}
                <path
                  d="M 235 340 L 235 220 Q 235 170 280 170 L 520 170 Q 565 170 565 220 L 565 340"
                  fill="none"
                  stroke="url(#saltBridgeGrad)"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                {/* Cotton/Porous plugs at ends */}
                <ellipse cx="235" cy="338" rx="10" ry="4" fill="#F1F5F9" opacity="0.8" />
                <ellipse cx="565" cy="338" rx="10" ry="4" fill="#F1F5F9" opacity="0.8" />

                {/* Salt Bridge Label */}
                <rect x="330" y="160" width="140" height="20" rx="4" fill="#0B1320" stroke="#10B981" strokeWidth="1" />
                <text x="400" y="174" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  CẦU MUỐI (KNO₃ / KCl)
                </text>

                {/* Ion Migration Arrows (K+ to Cathode, NO3- to Anode) */}
                {isCircuitClosed && (
                  <>
                    {/* NO3- towards Anode (Left) */}
                    <g transform="translate(310, 196)">
                      <circle cx="0" cy="0" r="7" fill="#F59E0B" opacity="0.9" />
                      <text x="0" y="3" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold" fontFamily="monospace">
                        NO₃⁻
                      </text>
                      <path d="M -10 0 L -18 0 M -14 -3 L -18 0 L -14 3" stroke="#F59E0B" strokeWidth="1.5" />
                    </g>
                    {/* K+ towards Cathode (Right) */}
                    <g transform="translate(490, 196)">
                      <circle cx="0" cy="0" r="7" fill="#818CF8" opacity="0.9" />
                      <text x="0" y="3" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold" fontFamily="monospace">
                        K⁺
                      </text>
                      <path d="M 10 0 L 18 0 M 14 -3 L 18 0 L 14 3" stroke="#818CF8" strokeWidth="1.5" />
                    </g>
                  </>
                )}
              </g>

              {/* ========================================================================= */}
              {/* LEFT BEAKER: ANODE HALF-CELL (-)                                          */}
              {/* ========================================================================= */}
              <g transform="translate(90, 200)">
                {/* Glass Beaker Body */}
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="220"
                  rx="14"
                  fill="url(#glassWall)"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  opacity="0.9"
                />
                {/* Electrolyte Solution Liquid Layer (fills 65% of beaker) */}
                <rect
                  x="3"
                  y="65"
                  width="184"
                  height="152"
                  rx="10"
                  fill={anodeSolColor}
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                />
                {/* Liquid Meniscus Wave */}
                <path
                  d="M 3 65 Q 45 61 95 65 Q 145 69 187 65"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Metal Anode Electrode Strip */}
                <rect
                  x="80"
                  y="-25"
                  width="30"
                  height="180"
                  rx="3"
                  fill="url(#anodeGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
                />

                {/* Wire clip on top of electrode */}
                <rect x="77" y="-28" width="36" height="8" rx="2" fill="#F59E0B" />

                {/* Dissolving ion animation bubbles / ions M -> M^n+ + ne- */}
                {isCircuitClosed && (
                  <g>
                    <circle cx="118" cy="110" r="5" fill="#38BDF8" opacity="0.8" />
                    <text x="118" y="113" textAnchor="middle" fill="#000" fontSize="6" fontWeight="bold">
                      {anodeCouple ? anodeCouple.oxidizedForm.replace(/[\(\)]/g, '') : 'M²⁺'}
                    </text>
                    <path d="M 112 110 L 126 110" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
                  </g>
                )}

                {/* Beaker Header Label: ANODE (-) */}
                <rect x="25" y="10" width="140" height="24" rx="6" fill="#0B1320" stroke="#EF4444" strokeWidth="1.5" />
                <text x="95" y="26" textAnchor="middle" fill="#F87171" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  ANOT (-) • OXI HÓA
                </text>

                {/* Electrode Formula Label */}
                <text x="95" y="60" textAnchor="middle" fill="#F1F5F9" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="bold">
                  {currentPreset?.anodeMetalNameVi || anodeCouple?.reducedForm || 'Kẽm (Zn)'}
                </text>

                {/* Half Reaction in Beaker */}
                <rect x="15" y="175" width="160" height="34" rx="6" fill="#0B1320" stroke="#334155" strokeWidth="1" />
                <text x="95" y="190" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {anodeCouple ? `${anodeCouple.reducedForm} → ${anodeCouple.oxidizedForm} + ${anodeCouple.electronsTransferred}e⁻` : 'M → Mⁿ⁺ + ne⁻'}
                </text>
                <text x="95" y="203" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                  Dung dịch: {currentPreset?.anodeSolutionFormula || `${anodeCouple?.oxidizedForm} (${concentrationA.toFixed(2)} M)`}
                </text>
              </g>

              {/* ========================================================================= */}
              {/* RIGHT BEAKER: CATHODE HALF-CELL (+)                                       */}
              {/* ========================================================================= */}
              <g transform="translate(520, 200)">
                {/* Glass Beaker Body */}
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="220"
                  rx="14"
                  fill="url(#glassWall)"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  opacity="0.9"
                />
                {/* Electrolyte Solution Liquid Layer (fills 65% of beaker) */}
                <rect
                  x="3"
                  y="65"
                  width="184"
                  height="152"
                  rx="10"
                  fill={cathodeSolColor}
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                />
                {/* Liquid Meniscus Wave */}
                <path
                  d="M 3 65 Q 45 69 95 65 Q 145 61 187 65"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Metal Cathode Electrode Strip */}
                <rect
                  x="80"
                  y="-25"
                  width="30"
                  height="180"
                  rx="3"
                  fill="url(#cathodeGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
                />

                {/* Wire clip on top of electrode */}
                <rect x="77" y="-28" width="36" height="8" rx="2" fill="#F59E0B" />

                {/* Plating / Deposition animation ions M^m+ -> M(s) */}
                {isCircuitClosed && (
                  <g>
                    <circle cx="72" cy="110" r="5" fill="#F59E0B" opacity="0.8" />
                    <text x="72" y="113" textAnchor="middle" fill="#000" fontSize="6" fontWeight="bold">
                      {cathodeCouple ? cathodeCouple.oxidizedForm.replace(/[\(\)]/g, '') : 'Cu²⁺'}
                    </text>
                    <path d="M 77 110 L 80 110" stroke="#F59E0B" strokeWidth="1.5" />
                  </g>
                )}

                {/* Beaker Header Label: CATHODE (+) */}
                <rect x="25" y="10" width="140" height="24" rx="6" fill="#0B1320" stroke="#10B981" strokeWidth="1.5" />
                <text x="95" y="26" textAnchor="middle" fill="#34D399" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  CATOT (+) • SỰ KHỬ
                </text>

                {/* Electrode Formula Label */}
                <text x="95" y="60" textAnchor="middle" fill="#F1F5F9" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="bold">
                  {currentPreset?.cathodeMetalNameVi || cathodeCouple?.reducedForm || 'Đồng (Cu)'}
                </text>

                {/* Half Reaction in Beaker */}
                <rect x="15" y="175" width="160" height="34" rx="6" fill="#0B1320" stroke="#334155" strokeWidth="1" />
                <text x="95" y="190" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {cathodeCouple ? `${cathodeCouple.oxidizedForm} + ${cathodeCouple.electronsTransferred}e⁻ → ${cathodeCouple.reducedForm}↓` : 'Mᵐ⁺ + me⁻ → M'}
                </text>
                <text x="95" y="203" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                  Dung dịch: {currentPreset?.cathodeSolutionFormula || `${cathodeCouple?.oxidizedForm} (${concentrationB.toFixed(2)} M)`}
                </text>
              </g>
            </svg>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE CONTROLS BAR: CONCENTRATIONS & TEMPERATURE                    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-navy-light/30 border border-navy-light/60 rounded-xl p-4">
            {/* Anode Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> [{anodeCouple?.oxidizedForm || 'Anot'}]:
                </span>
                <span className="text-ivory font-bold bg-navy-light/80 px-2 py-0.5 rounded border border-navy-light">
                  {concentrationA.toFixed(2)} M
                </span>
              </div>
              <input
                type="range"
                min="0.01"
                max="3.00"
                step="0.05"
                value={concentrationA}
                onChange={e => {
                  setConcentrationA(parseFloat(e.target.value));
                  setSelectedPresetId(''); // custom
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.01 M (Loãng)</span>
                <span>1.00 M (Chuẩn)</span>
                <span>3.00 M (Đặc)</span>
              </div>
            </div>

            {/* Cathode Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-ion font-bold flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> [{cathodeCouple?.oxidizedForm || 'Catot'}]:
                </span>
                <span className="text-ivory font-bold bg-navy-light/80 px-2 py-0.5 rounded border border-navy-light">
                  {concentrationB.toFixed(2)} M
                </span>
              </div>
              <input
                type="range"
                min="0.01"
                max="3.00"
                step="0.05"
                value={concentrationB}
                onChange={e => {
                  setConcentrationB(parseFloat(e.target.value));
                  setSelectedPresetId(''); // custom
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.01 M (Loãng)</span>
                <span>1.00 M (Chuẩn)</span>
                <span>3.00 M (Đặc)</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-copper font-bold flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5" /> Nhiệt độ (T):
                </span>
                <span className="text-ivory font-bold bg-navy-light/80 px-2 py-0.5 rounded border border-navy-light">
                  {tempCelsius} °C ({(tempCelsius + 273.15).toFixed(1)} K)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="1"
                value={tempCelsius}
                onChange={e => setTempCelsius(parseInt(e.target.value, 10))}
                className="w-full accent-copper cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0 °C (273 K)</span>
                <span>25 °C (Chuẩn)</span>
                <span>80 °C (353 K)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/60">
              <span className="text-[10px] text-ivory-muted font-mono block">Sức Điện Động Nernst E(pin)</span>
              <span className="text-lg font-mono font-bold text-cyan-ion">
                {displayedVoltage >= 0 ? '+' : ''}{displayedVoltage.toFixed(3)} V
              </span>
              <span className="text-[9px] text-ivory-muted block mt-0.5 font-mono">
                {displayedVoltage > standardVoltage ? '▲ Tăng thế do nồng độ' : displayedVoltage < standardVoltage ? '▼ Giảm thế do phân cực' : '= Điều kiện chuẩn'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/60">
              <span className="text-[10px] text-ivory-muted font-mono block">Thế Chuẩn E°(pin)</span>
              <span className="text-lg font-mono font-bold text-ivory">
                +{standardVoltage.toFixed(3)} V
              </span>
              <span className="text-[9px] text-emerald-400 block mt-0.5 font-mono">
                E°(catot) - E°(anot)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/60">
              <span className="text-[10px] text-ivory-muted font-mono block">Năng Lượng Tự Do Gibbs ΔG°</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {cellResult?.gibbsFreeEnergyDeltaG0Kj} kJ/mol
              </span>
              <span className="text-[9px] text-ivory-muted block mt-0.5 font-mono">
                ΔG° &lt; 0: Tự phát sinh công
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/60">
              <span className="text-[10px] text-ivory-muted font-mono block">Thương Số Phản Ứng (Q)</span>
              <span className="text-lg font-mono font-bold text-yellow-400">
                {cellResult?.reactionQuotientQ.toFixed(3)}
              </span>
              <span className="text-[9px] text-ivory-muted block mt-0.5 font-mono">
                [Anot]ⁿ / [Catot]ᵐ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: PEDAGOGY & THERMODYNAMIC NERNST DERIVATION                      */}
      {/* ========================================================================= */}
      {activeTab === 'PEDAGOGY' && cellResult && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 bg-navy-light/20 border border-cyan-ion/40 rounded-xl space-y-4">
            <h3 className="font-serif font-bold text-sm text-cyan-ion flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-ion" />
              BẢN GIẢI THÍCH CHI TIẾT TỪNG BƯỚC (GDPT 2018 &amp; IUPAC)
            </h3>

            <div className="space-y-2">
              {cellResult.stepByStepExplanationVI.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light/60 text-xs font-mono text-ivory leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Nernst Equation Card */}
          <div className="p-4 bg-navy/80 border border-navy-light rounded-xl space-y-3">
            <h4 className="font-bold text-xs text-copper uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-copper" /> Công Thức Phương Trình Nernst Tổng Quát
            </h4>
            <div className="p-3 bg-obsidian rounded-lg border border-navy-light font-mono text-xs text-center text-cyan-ion">
              E(pin) = E°(pin) - (2.303 · R · T / (n · F)) · log₁₀(Q)
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed font-sans">
              Trong đó: <b>R</b> = 8.314 J/(mol·K); <b>F</b> = 96,485 C/mol (hằng số Faraday); <b>n</b> = {cellResult.electronsTransferred} (số mol electron trao đổi); 
              <b>T</b> = {cellResult.temperatureKelvin.toFixed(1)} K; <b>Q</b> = {cellResult.reactionQuotientQ.toFixed(4)}.
            </p>
          </div>

          {/* Salt Bridge Role */}
          <div className="p-4 bg-navy/80 border border-navy-light rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Vai Trò Bản Chất Của Cầu Muối (KNO₃ / KCl)
            </h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              {cellResult.saltBridgeIonsMigrationVI}
            </p>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Nếu rút cầu muối ra khỏi hai cốc dung dịch, mạch điện bị ngắt, điện tích dương tích tụ ở Anot và điện tích âm tích tụ ở Catot làm cho hiệu điện thế triệt tiêu ngay lập tức (E = 0 V).
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 3: TCG & MOBA TACTICAL MECHANICS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'TACTICAL' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Galvanic Discharge */}
            <div className="p-4 rounded-xl bg-cyan-ion/10 border border-cyan-ion/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-ion font-bold text-xs uppercase font-mono">
                <Zap className="w-4 h-4" /> Phóng Điện Galvanic (TCG)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khi triệu hồi đồng thời một Quái thú Kim loại Anode ({currentPreset?.anodeMetalNameVi || 'Kẽm'}) và Cathode ({currentPreset?.cathodeMetalNameVi || 'Đồng'}), kích hoạt mạch pin điện hóa khép kín.
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-cyan-ion border border-cyan-ion/30">
                Hiệu ứng: Gây {(standardVoltage * 1000).toFixed(0)} Sát Thương Trực Tiếp vào Điểm Gốc (LP) của Đối thủ!
              </div>
            </div>

            {/* Sacrificial Anode */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
                <Shield className="w-4 h-4" /> Cực Âm Hi Sinh (Bảo Vệ Catot)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Phương pháp bảo vệ kim loại bằng điện hóa học (GDPT 2018): Thanh kim loại Anot tự tan rã để bảo vệ vật phẩm/quái thú ở Catot khỏi bị phá hủy.
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-rose-300 border border-rose-500/30">
                Hiệu ứng: Chặn 1 đòn tấn công tiêu diệt nhắm vào thẻ bài Đồng/Bạc, hi sinh thẻ bài Kẽm/Sắt.
              </div>
            </div>

            {/* MOBA Battery Overcharge */}
            <div className="p-4 rounded-xl bg-copper/10 border border-copper/40 space-y-2">
              <div className="flex items-center gap-2 text-copper font-bold text-xs uppercase font-mono">
                <Activity className="w-4 h-4" /> Quá Tải Điện Hóa (MOBA)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khi người chơi điều chỉnh nồng độ dung dịch đạt tỉ lệ Q &lt; 1 ([Anot] &lt; [Catot]), sức điện động Nernst vượt ngưỡng chuẩn (E &gt; E°).
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-copper border border-copper/30">
                Hào quang: Tăng 35% Tốc Độ Đánh và 20% Tốc Độ Di Chuyển cho toàn đội trong 6 giây!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
