// src/components/visualizations/TitrationCurveVisualizer.tsx
// Interactive Acid-Base Titration Curve & Indicator Visualizer (Mô Phỏng Chuẩn Độ Axit - Bazơ & Đường Cong pH)
// Conforming strictly to Vietnam GDPT 2018 Chemistry 11 (Chủ đề Cân Bằng Nước & Chuẩn Độ) and IUPAC Standards

import React, { useState, useMemo, useEffect } from 'react';
import {
  FlaskConical,
  Droplets,
  RotateCcw,
  Sparkles,
  Info,
  BookOpen,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  HelpCircle
} from 'lucide-react';
import {
  calculateTitrationCurve,
  TitrationCurveResult,
  TitrationDataPoint,
  IndicatorRecommendation
} from '../../domain/chemicalCalculator';
import { sound } from '../../audio/soundEngine';

export interface TitrationScenarioPreset {
  id: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  acidType: 'STRONG' | 'WEAK';
  baseType: 'STRONG' | 'WEAK';
  titrationMode: 'ACID_BY_BASE' | 'BASE_BY_ACID';
  acidName: string;
  baseName: string;
  defaultAcidMolarity: number;
  defaultBaseMolarity: number;
  defaultVolumeMl: number;
  pKa?: number;
  pKb?: number;
  recommendedIndicator: string;
}

export const TITRATION_SCENARIO_PRESETS: TitrationScenarioPreset[] = [
  {
    id: 'hcl_naoh',
    nameVi: 'HCl + NaOH (Axit Mạnh - Bazơ Mạnh)',
    nameEn: 'HCl + NaOH (Strong Acid - Strong Base)',
    descriptionVi: 'Chuẩn độ mẫu mực GDPT 2018 Lớp 11: Bước nhảy pH rộng từ 4.0 đến 10.0, pH tương đương = 7.00. Thích hợp với Phenolphthalein, Bromothymol xanh và Methyl da cam.',
    acidType: 'STRONG',
    baseType: 'STRONG',
    titrationMode: 'ACID_BY_BASE',
    acidName: 'Axit Clohiđric (HCl)',
    baseName: 'Natri Hiđroxit (NaOH)',
    defaultAcidMolarity: 0.1,
    defaultBaseMolarity: 0.1,
    defaultVolumeMl: 25.0,
    recommendedIndicator: 'Phenolphthalein'
  },
  {
    id: 'ch3cooh_naoh',
    nameVi: 'CH₃COOH + NaOH (Axit Yếu - Bazơ Mạnh)',
    nameEn: 'CH3COOH + NaOH (Weak Acid - Strong Base)',
    descriptionVi: 'Chuẩn độ giấm ăn: pH tương đương ~8.72 (muối CH₃COONa thủy phân kiềm). Nửa tương đương pH = pKa = 4.76 (vùng đệm). BẮT BUỘC dùng Phenolphthalein, LOẠI BỎ Methyl da cam!',
    acidType: 'WEAK',
    baseType: 'STRONG',
    titrationMode: 'ACID_BY_BASE',
    acidName: 'Axit Axetic (CH₃COOH)',
    baseName: 'Natri Hiđroxit (NaOH)',
    defaultAcidMolarity: 0.1,
    defaultBaseMolarity: 0.1,
    defaultVolumeMl: 25.0,
    pKa: 4.76,
    recommendedIndicator: 'Phenolphthalein'
  },
  {
    id: 'nh3_hcl',
    nameVi: 'NH₃ + HCl (Bazơ Yếu - Axit Mạnh)',
    nameEn: 'NH3 + HCl (Weak Base - Strong Acid)',
    descriptionVi: 'Chuẩn độ dung dịch Amoniac bằng HCl: pH tương đương ~5.28 (muối NH₄Cl thủy phân axit). Thích hợp dùng Methyl đỏ hoặc Methyl da cam, LOẠI BỎ Phenolphthalein!',
    acidType: 'STRONG',
    baseType: 'WEAK',
    titrationMode: 'BASE_BY_ACID',
    acidName: 'Axit Clohiđric (HCl)',
    baseName: 'Amoniac (NH₃)',
    defaultAcidMolarity: 0.1,
    defaultBaseMolarity: 0.1,
    defaultVolumeMl: 25.0,
    pKb: 4.75,
    recommendedIndicator: 'Methyl Đỏ (Methyl Red)'
  },
  {
    id: 'hno3_koh',
    nameVi: 'HNO₃ + KOH (Axit Mạnh - Bazơ Mạnh)',
    nameEn: 'HNO3 + KOH (Strong Acid - Strong Base)',
    descriptionVi: 'Chuẩn độ axit nitric bằng kali hidroxit: Bước nhảy pH cực rộng, pH tương đương = 7.00. Trung hòa hoàn toàn 1 mol H⁺ với 1 mol OH⁻.',
    acidType: 'STRONG',
    baseType: 'STRONG',
    titrationMode: 'ACID_BY_BASE',
    acidName: 'Axit Nitric (HNO₃)',
    baseName: 'Kali Hiđroxit (KOH)',
    defaultAcidMolarity: 0.1,
    defaultBaseMolarity: 0.1,
    defaultVolumeMl: 25.0,
    recommendedIndicator: 'Bromothymol Xanh (Bromothymol Blue)'
  }
];

export interface TitrationCurveVisualizerProps {
  initialScenarioId?: string;
  className?: string;
  onEquivalenceReached?: () => void;
}

export const TitrationCurveVisualizer: React.FC<TitrationCurveVisualizerProps> = ({
  initialScenarioId = 'ch3cooh_naoh',
  className = '',
  onEquivalenceReached
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenarioId);
  const [titrantVolume, setTitrantVolume] = useState<number>(0.0); // mL added
  const [activeIndicatorName, setActiveIndicatorName] = useState<string>('Phenolphthalein');
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'PEDAGOGY' | 'TACTICAL'>('SIMULATION');
  const [isAutoDripping, setIsAutoDripping] = useState<boolean>(false);

  const scenario = useMemo(() => {
    return TITRATION_SCENARIO_PRESETS.find(s => s.id === selectedScenarioId) || TITRATION_SCENARIO_PRESETS[0];
  }, [selectedScenarioId]);

  // Calculate analytical titration curve
  const titrationResult = useMemo<TitrationCurveResult>(() => {
    return calculateTitrationCurve({
      acidType: scenario.acidType,
      baseType: scenario.baseType,
      titrationMode: scenario.titrationMode,
      acidMolarity: scenario.defaultAcidMolarity,
      acidVolumeMl: scenario.defaultVolumeMl,
      baseMolarity: scenario.defaultBaseMolarity,
      baseVolumeMl: scenario.defaultVolumeMl,
      pKa: scenario.pKa,
      pKb: scenario.pKb
    });
  }, [scenario]);

  const Veq = titrationResult.equivalenceVolumeMl;
  const maxVolume = Math.round(Veq * 1.5 * 10) / 10; // e.g. 37.5 mL or 50 mL

  // Interpolate current pH from dense curve points
  const currentPH = useMemo(() => {
    const points = titrationResult.curvePoints || titrationResult.dataPoints;
    if (!points || points.length === 0) return 7.0;
    if (titrantVolume <= points[0].volumeBaseAddedMl) return points[0].pH;
    if (titrantVolume >= points[points.length - 1].volumeBaseAddedMl) {
      return points[points.length - 1].pH;
    }

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      if (titrantVolume >= p1.volumeBaseAddedMl && titrantVolume <= p2.volumeBaseAddedMl) {
        const dv = p2.volumeBaseAddedMl - p1.volumeBaseAddedMl;
        if (dv === 0) return p1.pH;
        const t = (titrantVolume - p1.volumeBaseAddedMl) / dv;
        return Math.round((p1.pH + t * (p2.pH - p1.pH)) * 100) / 100;
      }
    }
    return 7.0;
  }, [titrantVolume, titrationResult]);

  // Check if close to equivalence point
  const isNearEquivalence = Math.abs(titrantVolume - Veq) <= 0.15;

  useEffect(() => {
    if (isNearEquivalence && onEquivalenceReached) {
      onEquivalenceReached();
    }
  }, [isNearEquivalence, onEquivalenceReached]);

  // Auto-dripping effect
  useEffect(() => {
    if (!isAutoDripping) return;
    const interval = setInterval(() => {
      setTitrantVolume(prev => {
        if (prev >= maxVolume) {
          setIsAutoDripping(false);
          return maxVolume;
        }
        const next = Math.round((prev + 0.25) * 100) / 100;
        sound.playPipetteSuction();
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [isAutoDripping, maxVolume]);

  // Switch scenario
  const handleSelectScenario = (sc: TitrationScenarioPreset) => {
    setSelectedScenarioId(sc.id);
    setTitrantVolume(0.0);
    setIsAutoDripping(false);
    setActiveIndicatorName(sc.recommendedIndicator);
    sound.playUiClick();
  };

  // Add drops
  const handleAddDrop = (amountMl: number) => {
    setTitrantVolume(prev => {
      const next = Math.min(maxVolume, Math.round((prev + amountMl) * 100) / 100);
      return next;
    });
    sound.playPipetteSuction();
    if (Math.abs(titrantVolume + amountMl - Veq) <= 0.15) {
      sound.playReactionSuccess();
    }
  };

  const handleJumpToEquivalence = () => {
    setTitrantVolume(Veq);
    setIsAutoDripping(false);
    sound.playReactionSuccess();
  };

  const handleReset = () => {
    setTitrantVolume(0.0);
    setIsAutoDripping(false);
    sound.playUiClick();
  };

  // Determine solution liquid color in Erlenmeyer flask
  const flaskColor = useMemo(() => {
    const ph = currentPH;
    const ind = activeIndicatorName.toLowerCase();

    if (ind.includes('phenol')) {
      // Phenolphthalein: < 8.2 colorless; 8.2-10 pale pink; > 10 intense hot magenta
      if (ph < 8.2) return 'rgba(241, 245, 249, 0.18)'; // colorless transparent
      if (ph < 9.2) return 'rgba(244, 114, 182, 0.55)'; // light pink
      return 'rgba(236, 72, 153, 0.88)'; // hot magenta
    }

    if (ind.includes('orange') || ind.includes('cam')) {
      // Methyl Orange: < 3.1 red; 3.1-4.4 orange; > 4.4 yellow
      if (ph < 3.1) return 'rgba(239, 68, 68, 0.85)'; // red
      if (ph <= 4.4) return 'rgba(249, 115, 22, 0.85)'; // orange
      return 'rgba(234, 179, 8, 0.85)'; // yellow
    }

    if (ind.includes('bromo') || ind.includes('btb')) {
      // Bromothymol Blue: < 6.0 yellow; 6.0-7.6 green; > 7.6 blue
      if (ph < 6.0) return 'rgba(234, 179, 8, 0.85)'; // yellow
      if (ph <= 7.6) return 'rgba(34, 197, 94, 0.85)'; // emerald green
      return 'rgba(59, 130, 246, 0.85)'; // deep blue
    }

    if (ind.includes('red') || ind.includes('đỏ')) {
      // Methyl Red: < 4.4 red; 4.4-6.2 orange; > 6.2 yellow
      if (ph < 4.4) return 'rgba(239, 68, 68, 0.85)';
      if (ph <= 6.2) return 'rgba(249, 115, 22, 0.85)';
      return 'rgba(234, 179, 8, 0.85)';
    }

    return 'rgba(56, 189, 248, 0.35)';
  }, [currentPH, activeIndicatorName]);

  // Indicator suitable status
  const currentIndicatorInfo = useMemo(() => {
    return (
      titrationResult.indicators.find(i =>
        i.name.toLowerCase().includes(activeIndicatorName.toLowerCase()) ||
        activeIndicatorName.toLowerCase().includes(i.name.toLowerCase())
      ) || titrationResult.indicators[0]
    );
  }, [titrationResult, activeIndicatorName]);

  // SVG Chart Dimensions & Coordinate Mapping
  const chartWidth = 520;
  const chartHeight = 280;
  const paddingLeft = 45;
  const paddingBottom = 35;
  const paddingTop = 25;
  const paddingRight = 25;

  const plotW = chartWidth - paddingLeft - paddingRight;
  const plotH = chartHeight - paddingTop - paddingBottom;

  const mapX = (vol: number) => paddingLeft + (vol / maxVolume) * plotW;
  const mapY = (ph: number) => paddingTop + plotH - (ph / 14) * plotH;

  // Build SVG path string for titration curve
  const curvePathD = useMemo(() => {
    const points = titrationResult.curvePoints || titrationResult.dataPoints;
    if (!points || points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      const x = mapX(pt.volumeBaseAddedMl);
      const y = mapY(pt.pH);
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  }, [titrationResult, maxVolume]);

  return (
    <div
      className={`bg-gradient-to-b from-navy to-obsidian border border-navy-light/80 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory space-y-6 ${className}`}
      role="region"
      aria-label="Mô phỏng Chuẩn Độ Axit - Bazơ và Đường Cong pH"
    >
      {/* ========================================================================= */}
      {/* 1. HEADER & SCENARIOS                                                     */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/40 shadow-inner">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wide">
                CHUẨN ĐỘ AXIT - BAZƠ &amp; ĐƯỜNG CONG pH
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                GDPT 2018 LỚP 11
              </span>
            </div>
            <p className="text-xs text-ivory-muted font-mono mt-0.5">
              Khảo sát bước nhảy pH, điểm tương đương, điểm nửa tương đương (pKa) &amp; lựa chọn chất chỉ thị màu
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAutoDripping(!isAutoDripping)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow ${
              isAutoDripping
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30'
                : 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50 hover:bg-cyan-ion/30'
            }`}
          >
            {isAutoDripping ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoDripping ? 'DỪNG CHUẨN ĐỘ' : 'TỰ ĐỘNG NHỎ GIỌT'}</span>
          </button>

          <button
            onClick={handleJumpToEquivalence}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 shadow"
            title="Nhảy nhanh đến điểm tương đương hóa học"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-ion" />
            <span>Điểm Tương Đương (Veq)</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-navy-light/60 hover:bg-navy-light text-ivory-muted hover:text-ivory transition-colors border border-navy-light"
            title="Reset về 0 mL"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Scenarios Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-xs font-bold text-copper uppercase tracking-wider flex items-center gap-1 shrink-0 font-mono">
          <Droplets className="w-3.5 h-3.5 text-copper" /> Hệ Chuẩn Độ:
        </span>
        {TITRATION_SCENARIO_PRESETS.map(sc => {
          const isSelected = selectedScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-pink-500 text-obsidian font-bold border-pink-400 shadow-md shadow-pink-500/20'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-ivory border-navy-light/60 hover:bg-navy-light/70'
              }`}
            >
              {sc.nameVi}
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
              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/50 shadow'
              : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Buret, Bình Tam Giác &amp; Đồ Thị pH</span>
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
          <span>Phân Tích Chỉ Thị &amp; Sư Phạm GDPT 2018</span>
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
      {/* 2. TAB 1: APPARATUS & LIVE CURVE SIMULATION                               */}
      {/* ========================================================================= */}
      {activeTab === 'SIMULATION' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Workspace Split: Apparatus (Left) + Titration Curve Chart (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Left: Burette + Erlenmeyer Flask SVG (4 Cols) */}
            <div className="lg:col-span-4 bg-obsidian rounded-2xl border border-navy-light/80 p-4 flex flex-col items-center justify-center relative shadow-inner">
              <span className="text-[11px] font-mono font-bold text-copper uppercase tracking-wider mb-2">
                Hệ Dụng Cụ Thí Nghiệm Chuẩn Độ
              </span>

              <svg viewBox="0 0 220 340" className="w-full max-w-[200px] h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="glassTube" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                    <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
                  </linearGradient>

                  <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
                  </linearGradient>

                  <filter id="flaskGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Glass Burette Tube (Top) */}
                <g transform="translate(100, 15)">
                  {/* Tube Body */}
                  <rect x="-10" y="0" width="20" height="150" rx="3" fill="url(#glassTube)" stroke="#38BDF8" strokeWidth="1.5" />
                  {/* Liquid inside burette (drops as titrantVolume increases) */}
                  {(() => {
                    const fillFraction = Math.max(0, 1 - titrantVolume / maxVolume);
                    const liquidH = 145 * fillFraction;
                    const liquidY = 150 - liquidH;
                    return (
                      <rect
                        x="-8"
                        y={liquidY}
                        width="16"
                        height={liquidH}
                        fill="rgba(56, 189, 248, 0.45)"
                        stroke="#38BDF8"
                        strokeWidth="0.5"
                      />
                    );
                  })()}

                  {/* Volume markings */}
                  {[0, 10, 20, 30, 40, 50].map((v, idx) => (
                    <g key={v} transform={`translate(10, ${idx * 28 + 5})`}>
                      <line x1="0" y1="0" x2="4" y2="0" stroke="#94A3B8" strokeWidth="1" />
                      <text x="6" y="2.5" fill="#94A3B8" fontSize="6" fontFamily="monospace">{v}</text>
                    </g>
                  ))}

                  {/* Stopcock Valve (Khoá buret) */}
                  <circle cx="0" cy="155" r="5" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
                  <line x1="-8" y1="155" x2="8" y2="155" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Burette Tip nozzle */}
                  <path d="M -4 160 L -1.5 180 L 1.5 180 L 4 160 Z" fill="#38BDF8" opacity="0.6" stroke="#38BDF8" strokeWidth="1" />

                  {/* Titrant Droplet falling into flask */}
                  {isAutoDripping && (
                    <circle cx="0" cy="195" r="2.5" fill="#38BDF8" className="animate-bounce" />
                  )}

                  <text x="-16" y="70" textAnchor="end" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold">
                    BURET ({scenario.titrationMode === 'ACID_BY_BASE' ? 'NaOH' : 'HCl'})
                  </text>
                </g>

                {/* 2. Conical Erlenmeyer Flask (Bottom) */}
                <g transform="translate(100, 210)">
                  {/* Conical Flask Outline */}
                  <path
                    d="M -15 0 L 15 0 L 15 25 L 55 110 Q 58 116 50 116 L -50 116 Q -58 116 -55 110 L -15 25 Z"
                    fill="url(#flaskGrad)"
                    stroke="#38BDF8"
                    strokeWidth="2"
                  />

                  {/* Solution inside Flask (dynamically colored by indicator) */}
                  <path
                    d="M -42 85 Q 0 80 42 85 L 49 113 Q 50 115 45 115 L -45 115 Q -50 115 -49 113 Z"
                    fill={flaskColor}
                    filter="url(#flaskGlow)"
                    style={{ transition: 'fill 0.4s ease-in-out' }}
                  />

                  {/* Magnetic Stirrer Bar spinning inside flask */}
                  <rect x="-8" y="108" width="16" height="4" rx="2" fill="#FFFFFF" opacity="0.9" />

                  {/* Flask Label */}
                  <text x="0" y="70" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    {scenario.titrationMode === 'ACID_BY_BASE' ? scenario.acidName : scenario.baseName}
                  </text>
                  <text x="0" y="80" textAnchor="middle" fill="#CBD5E1" fontSize="7" fontFamily="monospace">
                    + Chỉ thị: {activeIndicatorName}
                  </text>
                </g>
              </svg>

              {/* Real-time Indicator Color Swatch & Status */}
              <div className="w-full mt-3 p-2.5 rounded-xl bg-navy-light/40 border border-navy-light flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/40 shadow-inner"
                    style={{ backgroundColor: flaskColor }}
                  />
                  <span className="text-ivory font-bold">{activeIndicatorName}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  currentIndicatorInfo.isSuitable
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {currentIndicatorInfo.isSuitable ? '✓ Rất Thích Hợp' : '✗ Không Thích Hợp'}
                </span>
              </div>
            </div>

            {/* Right: SVG Titration Curve Chart (8 Cols) */}
            <div className="lg:col-span-8 bg-obsidian rounded-2xl border border-navy-light/80 p-4 sm:p-5 shadow-inner space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-ion uppercase">
                    ĐƯỜNG CONG CHUẨN ĐỘ pH LIÊN TỤC
                  </span>
                  <span className="text-[10px] font-mono text-ivory-muted">
                    (V_tđ = {Veq} mL, pH_tđ = {titrationResult.equivalencePH.toFixed(2)})
                  </span>
                </div>
                {/* Live Probe Badge */}
                <div className="flex items-center gap-2 bg-navy-light/80 px-3 py-1 rounded-lg border border-cyan-ion/40 text-xs font-mono">
                  <span className="text-ivory-muted">V:</span>
                  <span className="text-cyan-ion font-bold">{titrantVolume.toFixed(2)} mL</span>
                  <span className="text-ivory-muted ml-1">pH:</span>
                  <span className="text-pink-400 font-bold">{currentPH.toFixed(2)}</span>
                </div>
              </div>

              {/* Continuous SVG Chart */}
              <div className="relative w-full overflow-hidden select-none">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="curveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>

                    {/* Indicator transition band gradient */}
                    <linearGradient id="indicatorBand" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines & Axis Labels (pH 0, 2, 4, 6, 7, 8, 10, 12, 14) */}
                  {[0, 2, 4, 6, 7, 8, 10, 12, 14].map(phVal => {
                    const y = mapY(phVal);
                    const isNeutral = phVal === 7;
                    return (
                      <g key={phVal}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={chartWidth - paddingRight}
                          y2={y}
                          stroke={isNeutral ? '#10B981' : '#1E293B'}
                          strokeWidth={isNeutral ? 1.2 : 0.8}
                          strokeDasharray={isNeutral ? '3 3' : 'none'}
                        />
                        <text
                          x={paddingLeft - 6}
                          y={y + 3}
                          textAnchor="end"
                          fill={isNeutral ? '#34D399' : '#64748B'}
                          fontSize="9"
                          fontFamily="'JetBrains Mono', monospace"
                        >
                          {phVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* Volume Grid Lines on X-axis (0, 10, 20, 25, 30, 40, 50 mL) */}
                  {[0, 10, 20, Veq, 30, 40, 50].filter(v => v <= maxVolume).map(vVal => {
                    const x = mapX(vVal);
                    const isEq = Math.abs(vVal - Veq) < 0.01;
                    return (
                      <g key={vVal}>
                        <line
                          x1={x}
                          y1={paddingTop}
                          x2={x}
                          y2={chartHeight - paddingBottom}
                          stroke={isEq ? '#38BDF8' : '#1E293B'}
                          strokeWidth={isEq ? 1.2 : 0.8}
                          strokeDasharray={isEq ? '4 3' : 'none'}
                        />
                        <text
                          x={x}
                          y={chartHeight - paddingBottom + 14}
                          textAnchor="middle"
                          fill={isEq ? '#38BDF8' : '#64748B'}
                          fontSize="9"
                          fontFamily="'JetBrains Mono', monospace"
                          fontWeight={isEq ? 'bold' : 'normal'}
                        >
                          {vVal.toFixed(0)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Indicator Color Transition Band Shading (Phenolphthalein 8.2 - 10.0) */}
                  {(() => {
                    if (activeIndicatorName.includes('Phenol')) {
                      const yTop = mapY(10.0);
                      const yBottom = mapY(8.2);
                      return (
                        <g>
                          <rect
                            x={paddingLeft}
                            y={yTop}
                            width={plotW}
                            height={yBottom - yTop}
                            fill="url(#indicatorBand)"
                          />
                          <text
                            x={chartWidth - paddingRight - 4}
                            y={yTop + 11}
                            textAnchor="end"
                            fill="#F472B6"
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            Khoảng đổi màu Phenolphthalein (8.2 – 10.0)
                          </text>
                        </g>
                      );
                    }
                    if (activeIndicatorName.includes('Orange') || activeIndicatorName.includes('cam')) {
                      const yTop = mapY(4.4);
                      const yBottom = mapY(3.1);
                      return (
                        <g>
                          <rect
                            x={paddingLeft}
                            y={yTop}
                            width={plotW}
                            height={yBottom - yTop}
                            fill="rgba(249, 115, 22, 0.15)"
                          />
                          <text
                            x={chartWidth - paddingRight - 4}
                            y={yTop + 11}
                            textAnchor="end"
                            fill="#FB923C"
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            Khoảng đổi màu Methyl da cam (3.1 – 4.4)
                          </text>
                        </g>
                      );
                    }
                    return null;
                  })()}

                  {/* Titration Curve Line Path */}
                  <path
                    d={curvePathD}
                    fill="none"
                    stroke="url(#curveLineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Landmark 1: Equivalence Point Pin (Veq, pHeq) */}
                  {(() => {
                    const eqX = mapX(Veq);
                    const eqY = mapY(titrationResult.equivalencePH);
                    return (
                      <g transform={`translate(${eqX}, ${eqY})`}>
                        <circle cx="0" cy="0" r="6" fill="#0B1320" stroke="#38BDF8" strokeWidth="2" />
                        <circle cx="0" cy="0" r="3" fill="#38BDF8" />
                        <rect x="8" y="-12" width="90" height="18" rx="4" fill="#0B1320" stroke="#38BDF8" strokeWidth="1" />
                        <text x="12" y="1" fill="#38BDF8" fontSize="8" fontFamily="monospace" fontWeight="bold">
                          Điểm TĐ ({Veq} mL, pH {titrationResult.equivalencePH.toFixed(2)})
                        </text>
                      </g>
                    );
                  })()}

                  {/* Landmark 2: Half-Equivalence Point Pin (Weak Acid buffer pKa) */}
                  {titrationResult.halfEquivalencePH !== undefined && (
                    (() => {
                      const halfX = mapX(Veq * 0.5);
                      const halfY = mapY(titrationResult.halfEquivalencePH);
                      return (
                        <g transform={`translate(${halfX}, ${halfY})`}>
                          <polygon points="0,-5 5,0 0,5 -5,0" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                          <rect x="8" y="-10" width="85" height="18" rx="4" fill="#0B1320" stroke="#10B981" strokeWidth="1" />
                          <text x="12" y="3" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="bold">
                            pH = pKa = {titrationResult.halfEquivalencePH}
                          </text>
                        </g>
                      );
                    })()
                  )}

                  {/* Active Tracer Cursor Tracking current titrantVolume */}
                  {(() => {
                    const curX = mapX(titrantVolume);
                    const curY = mapY(currentPH);
                    return (
                      <g transform={`translate(${curX}, ${curY})`}>
                        <circle cx="0" cy="0" r="8" fill="rgba(236, 72, 153, 0.3)" className="animate-ping" />
                        <circle cx="0" cy="0" r="5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.5" />
                      </g>
                    );
                  })()}

                  {/* Axis Titles */}
                  <text x={chartWidth / 2} y={chartHeight - 4} textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                    Thể tích dung dịch chuẩn thêm vào V (mL)
                  </text>
                  <text x="12" y={chartHeight / 2} textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace" transform={`rotate(-90, 12, ${chartHeight / 2})`}>
                    pH dung dịch
                  </text>
                </svg>
              </div>

              {/* Volume Slider & Incremental Drop Dispenser */}
              <div className="space-y-2 pt-2 border-t border-navy-light/60">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ivory-muted flex items-center gap-1 font-bold">
                    <Droplets className="w-3.5 h-3.5 text-cyan-ion" /> Điều chỉnh thể tích chuẩn độ:
                  </span>
                  <span className="text-cyan-ion font-bold bg-navy-light/60 px-2 py-0.5 rounded border border-navy-light">
                    {titrantVolume.toFixed(2)} / {maxVolume.toFixed(1)} mL
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxVolume}
                  step="0.05"
                  value={titrantVolume}
                  onChange={e => setTitrantVolume(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />

                {/* Drop dispensing button steps */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] font-mono text-ivory-muted uppercase">Nhỏ dung dịch:</span>
                  <button
                    onClick={() => handleAddDrop(0.05)}
                    className="px-2.5 py-1 rounded bg-navy-light/50 hover:bg-navy-light text-xs font-mono text-cyan-ion border border-cyan-ion/30 active:scale-95 transition-all"
                  >
                    +1 Giọt (0.05 mL)
                  </button>
                  <button
                    onClick={() => handleAddDrop(0.5)}
                    className="px-2.5 py-1 rounded bg-navy-light/50 hover:bg-navy-light text-xs font-mono text-ivory border border-navy-light active:scale-95 transition-all"
                  >
                    +0.5 mL
                  </button>
                  <button
                    onClick={() => handleAddDrop(2.0)}
                    className="px-2.5 py-1 rounded bg-navy-light/50 hover:bg-navy-light text-xs font-mono text-ivory border border-navy-light active:scale-95 transition-all"
                  >
                    +2.0 mL
                  </button>
                  <button
                    onClick={() => handleAddDrop(5.0)}
                    className="px-2.5 py-1 rounded bg-navy-light/50 hover:bg-navy-light text-xs font-mono text-ivory border border-navy-light active:scale-95 transition-all"
                  >
                    +5.0 mL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Indicator Selector Bar */}
          <div className="p-4 rounded-xl bg-navy-light/30 border border-navy-light/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-copper uppercase font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-copper" /> Chọn Thuốc Thử Chỉ Thị Axit - Bazơ:
              </span>
              <span className="text-[11px] font-mono text-ivory-muted">
                Quan sát sự đổi màu tại bước nhảy pH
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {titrationResult.indicators.map(ind => {
                const isSelected = activeIndicatorName.toLowerCase().includes(ind.name.toLowerCase()) ||
                  ind.name.toLowerCase().includes(activeIndicatorName.toLowerCase());
                return (
                  <button
                    key={ind.name}
                    onClick={() => {
                      setActiveIndicatorName(ind.name);
                      sound.playUiClick();
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-navy-light/90 border-cyan-ion shadow-md shadow-cyan-ion/15'
                        : 'bg-navy/50 border-navy-light/60 hover:border-navy-light'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-ivory">{ind.name}</span>
                      <span className={`w-2 h-2 rounded-full ${ind.isSuitable ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                    </div>
                    <span className="text-[10px] text-cyan-300 font-mono block mt-0.5">
                      Dải pH: {ind.pHRange}
                    </span>
                    <span className="text-[9px] text-ivory-muted block mt-0.5 truncate">
                      {ind.colorChangeVI}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: PEDAGOGY & GDPT 2018 EXPLANATIONS                               */}
      {/* ========================================================================= */}
      {activeTab === 'PEDAGOGY' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Scientific Recommendation Alert */}
          <div className={`p-4 rounded-xl border ${
            currentIndicatorInfo.isSuitable
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
          }`}>
            <div className="flex items-start gap-3">
              {currentIndicatorInfo.isSuitable ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="font-bold text-sm">
                  Đánh Giá Chỉ Thị {currentIndicatorInfo.name}: {currentIndicatorInfo.isSuitable ? 'THÍCH HỢP' : 'KHÔNG THÍCH HỢP'}
                </h4>
                <p className="text-xs leading-relaxed opacity-90">
                  {currentIndicatorInfo.scientificReasonVI}
                </p>
              </div>
            </div>
          </div>

          {/* Curriculum Step-by-Step Pedagogical Explanation */}
          <div className="p-4 bg-navy-light/20 border border-navy-light rounded-xl space-y-3">
            <h4 className="font-bold text-xs text-cyan-ion uppercase font-mono tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-ion" /> Các Giai Đoạn Chuẩn Độ (Chương Trình GDPT 2018)
            </h4>
            <div className="space-y-2">
              {titrationResult.stepByStepExplanationVI.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light/60 text-xs font-mono text-ivory leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Buffer Solution & Henderson-Hasselbalch Card */}
          {scenario.acidType === 'WEAK' && (
            <div className="p-4 bg-navy/80 border border-navy-light rounded-xl space-y-2">
              <h4 className="font-bold text-xs text-copper uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-copper" /> Vùng Đệm &amp; Phương Trình Henderson-Hasselbalch
              </h4>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Tại điểm nửa tương đương (V = {Veq * 0.5} mL), một nửa lượng axit axetic đã phản ứng tạo thành muối axetat: [CH₃COOH] = [CH₃COO⁻].
              </p>
              <div className="p-2.5 bg-obsidian rounded font-mono text-xs text-center text-cyan-ion border border-navy-light">
                pH = pKa + log₁₀([CH₃COO⁻] / [CH₃COOH]) = {scenario.pKa} + log₁₀(1) = {scenario.pKa}
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Dung dịch có khả năng đệm pH mạnh mẽ, giữ cho pH thay đổi rất chậm khi thêm từng giọt bazơ cho đến gần điểm tương đương.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 3: TCG & MOBA TACTICAL MECHANICS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'TACTICAL' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Neutralization Shock */}
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/40 space-y-2">
              <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase font-mono">
                <Zap className="w-4 h-4" /> Sốc Trung Hòa Điểm Tương Đương (TCG)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khi người chơi phối hợp chính xác số mol H⁺ và OH⁻ đạt điểm tương đương hoàn hảo (V = Veq), kích hoạt phản ứng trung hòa bộc phát.
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-pink-300 border border-pink-500/30">
                Hiệu ứng: Tiêu hủy toàn bộ phép duy trì (Continuous Spell) trên sân đối phương!
              </div>
            </div>

            {/* Buffer Shield */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                <Layers className="w-4 h-4" /> Giáp Kháng Chấn Dung Dịch Đệm (TCG)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khi duy trì nồng độ trong vùng đệm Henderson-Hasselbalch (pH = pKa), dung dịch hấp thụ sốc axit/bazơ mà không làm đổi thế trận.
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
                Hiệu ứng: Giảm 50% toàn bộ sát thương nguyên tố phải gánh chịu trong 2 lượt!
              </div>
            </div>

            {/* Indicator Flare */}
            <div className="p-4 rounded-xl bg-copper/10 border border-copper/40 space-y-2">
              <div className="flex items-center gap-2 text-copper font-bold text-xs uppercase font-mono">
                <Activity className="w-4 h-4" /> Pháo Sáng Đổi Màu Chỉ Thị (MOBA)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Sự đổi màu đột ngột tại bước nhảy pH (từ không màu sang hồng rực rỡ hoặc vàng sang xanh) tạo hiệu ứng quang học chớp lóa.
              </p>
              <div className="p-2 bg-obsidian/70 rounded text-[11px] font-mono text-copper border border-copper/30">
                Hào quang: Làm mù (Blind) tất cả tướng địch xung quanh trong 1.5 giây!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
