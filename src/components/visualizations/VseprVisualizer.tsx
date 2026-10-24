// src/components/visualizations/VseprVisualizer.tsx
// Interactive 3D VSEPR Lone Pair Repulsion & Gillespie-Nyholm Molecular Deformation Visualizer
// Calibrated to Vietnam GDPT 2018 Chemistry Grade 10 & IUPAC Physical Chemistry

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  RotateCcw,
  BookOpen,
  Zap,
  Info,
  CheckCircle2,
  Compass,
  Sliders,
  Shield,
  Activity,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';
import {
  VseprEngine,
  VSEPR_BENCHMARK_PRESETS,
  VSEPR_GEOMETRY_CATALOG,
  VseprGenericFormula,
  VseprMoleculePreset,
  VseprDomain3D
} from '../../domain/vseprEngine';
import { sound } from '../../audio/soundEngine';

export interface VseprVisualizerProps {
  initialPresetId?: string;
  className?: string;
  onAngleChange?: (angleDeg: number, formulaAXE: VseprGenericFormula) => void;
}

export const VseprVisualizer: React.FC<VseprVisualizerProps> = ({
  initialPresetId = 'vsepr_h2o',
  className = '',
  onAngleChange
}) => {
  // Mode selection: Preset Molecules vs Custom Builder
  const [builderMode, setBuilderMode] = useState<'PRESET' | 'BUILDER'>('PRESET');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);

  // Custom builder counts
  const [customBP, setCustomBP] = useState<number>(2);
  const [customLP, setCustomLP] = useState<number>(2);

  // Gillespie-Nyholm Lone Pair Repulsion Multiplier (0.0x to 2.0x, default 1.0x)
  const [repulsionMultiplier, setRepulsionMultiplier] = useState<number>(1.0);

  // 3D Perspective Rotation (Yaw and Pitch in degrees)
  const [yawDeg, setYawDeg] = useState<number>(25);
  const [pitchDeg, setPitchDeg] = useState<number>(-15);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'3D_MODEL' | 'REPULSION_DEFORMATION' | 'VSEPR_RULES' | 'TACTICAL'>('3D_MODEL');

  // Drag interaction state for 3D viewport
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; yaw: number; pitch: number }>({ x: 0, y: 0, yaw: 0, pitch: 0 });

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setYawDeg(prev => (prev + 1.2 > 180 ? -180 : prev + 1.2));
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Active Preset definition
  const activePreset = useMemo<VseprMoleculePreset>(() => {
    return (
      VSEPR_BENCHMARK_PRESETS.find(p => p.id === selectedPresetId) ||
      VSEPR_BENCHMARK_PRESETS[0]
    );
  }, [selectedPresetId]);

  // Active AXnEm formula
  const currentFormulaAXE = useMemo<VseprGenericFormula>(() => {
    if (builderMode === 'PRESET') {
      return activePreset.formulaAXE;
    }
    return VseprEngine.getAXEFormula(customBP, customLP);
  }, [builderMode, activePreset, customBP, customLP]);

  // VSEPR Geometry Metadata
  const geometryMeta = useMemo(() => {
    return VSEPR_GEOMETRY_CATALOG[currentFormulaAXE] || VSEPR_GEOMETRY_CATALOG.AX4;
  }, [currentFormulaAXE]);

  // Dynamic deformed angle and repulsion index
  const angleMetrics = useMemo(() => {
    return VseprEngine.calculateDeformedAngle(currentFormulaAXE, repulsionMultiplier);
  }, [currentFormulaAXE, repulsionMultiplier]);

  // Inform parent callback if provided
  useEffect(() => {
    if (onAngleChange) {
      onAngleChange(angleMetrics.actualAngleDeg, currentFormulaAXE);
    }
  }, [angleMetrics.actualAngleDeg, currentFormulaAXE, onAngleChange]);

  // Projected 3D domains with perspective and depth sorting
  const projectedDomains = useMemo(() => {
    const rawDomains = VseprEngine.generateDomainCoordinates3D(currentFormulaAXE, repulsionMultiplier);
    const projected = VseprEngine.project3Dto2D(rawDomains, yawDeg, pitchDeg, 95);
    // Depth sort: lower depth (further away) rendered first
    return [...projected].sort((a, b) => (a.depth || 0) - (b.depth || 0));
  }, [currentFormulaAXE, repulsionMultiplier, yawDeg, pitchDeg]);

  // Central and ligand labels
  const centralSymbol = builderMode === 'PRESET' ? activePreset.centralAtomSymbol : 'A';
  const ligandSymbol = builderMode === 'PRESET' ? activePreset.ligandSymbol : 'X';

  // Mouse drag handlers for direct 3D manipulation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw: yawDeg,
      pitch: pitchDeg
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    let nextYaw = dragStartRef.current.yaw + dx * 0.6;
    let nextPitch = dragStartRef.current.pitch + dy * 0.6;

    while (nextYaw > 180) nextYaw -= 360;
    while (nextYaw < -180) nextYaw += 360;
    nextPitch = Math.max(-85, Math.min(85, nextPitch));

    setYawDeg(Number(nextYaw.toFixed(1)));
    setPitchDeg(Number(nextPitch.toFixed(1)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleRepulsionChange = (newVal: number) => {
    setRepulsionMultiplier(newVal);
    sound.playVseprRepulsionShift(newVal);
  };

  const handleResetOrientation = () => {
    setYawDeg(25);
    setPitchDeg(-15);
    setRepulsionMultiplier(1.0);
    sound.playUiClick();
  };

  return (
    <div className={`w-full bg-navy/90 border border-cyan-ion/40 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-5 text-ivory ${className}`}>
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-light/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-ion/80 via-blue-600 to-indigo-700 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-ion/20">
            <Compass className="w-6 h-6 text-obsidian" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wide">
                MÔ PHỎNG VSEPR & SỰ BIẾN DẠNG GÓC LIÊN KẾT GILLESPIE-NYHOLM
              </h2>
              <span className="px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50 font-mono text-[10px] font-bold">
                GDPT 2018 Lớp 10
              </span>
            </div>
            <p className="text-xs text-ivory-muted">
              Mô hình hóa lực đẩy cặp electron tự do (LP-LP &gt; LP-BP &gt; BP-BP), góc không gian 3D và trạng thái lai hóa orbital
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-obsidian/70 p-1 rounded-xl border border-navy-light/60 self-start sm:self-center">
          <button
            onClick={() => {
              setBuilderMode('PRESET');
              sound.playDomainSnap();
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
              builderMode === 'PRESET'
                ? 'bg-cyan-ion text-obsidian shadow-md shadow-cyan-ion/20 font-black'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            Phân Tử Chuẩn
          </button>
          <button
            onClick={() => {
              setBuilderMode('BUILDER');
              sound.playDomainSnap();
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
              builderMode === 'BUILDER'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-obsidian shadow-md shadow-amber-400/20 font-black'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            Tự Thiết Kế (AXₙEₘ)
          </button>
        </div>
      </div>

      {/* Selector Row: Presets or Custom Steric Builder */}
      {builderMode === 'PRESET' ? (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {VSEPR_BENCHMARK_PRESETS.map(preset => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  sound.playDomainSnap();
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-ion text-obsidian border-cyan-ion shadow-md shadow-cyan-ion/25 font-bold scale-105'
                    : 'bg-obsidian/60 text-ivory-muted border-navy-light/50 hover:bg-navy-light/60 hover:text-ivory'
                }`}
              >
                <span className="font-bold">{preset.formula}</span>
                <span className="text-[10px] opacity-75">({preset.formulaAXE})</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-obsidian/70 border border-amber-500/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-ivory-muted">Cặp e liên kết (BP):</span>
              <span className="text-cyan-300 font-bold">{customBP}</span>
            </div>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={customBP}
              onChange={e => {
                const val = Number(e.target.value);
                setCustomBP(val);
                if (val + customLP > 6) {
                  setCustomLP(Math.max(0, 6 - val));
                }
                sound.playDomainSnap();
              }}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-ivory-muted">Cặp e tự do (LP):</span>
              <span className="text-amber-300 font-bold">{customLP}</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.max(0, 6 - customBP)}
              step={1}
              value={customLP}
              onChange={e => {
                setCustomLP(Number(e.target.value));
                sound.playDomainSnap();
              }}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-navy-light/60 border border-navy-light text-ivory">
              SN = {customBP + customLP}
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              {currentFormulaAXE}
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-[11px] text-cyan-300">
              Lai hóa: <strong>{geometryMeta.hybridization}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Main Showcase Layout: 3D Canvas (Left) + Analytical Console (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive 3D SVG Projection Canvas (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-obsidian/85 border border-navy-light/70 p-4 flex flex-col items-center justify-between relative overflow-hidden min-h-[380px]">
          {/* Subtle Radial Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Canvas Badges */}
          <div className="w-full flex items-center justify-between z-10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-navy/90 text-cyan-ion border border-cyan-ion/40 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-ion" />
                {builderMode === 'PRESET' ? `${activePreset.formula} • ${activePreset.name_vi}` : `Cấu hình ${currentFormulaAXE}`}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                {geometryMeta.molecularShapeVI}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                  isAutoSpinning
                    ? 'bg-cyan-ion text-obsidian border-cyan-ion shadow-sm'
                    : 'bg-navy/80 text-ivory-muted border-navy-light/60 hover:text-ivory'
                }`}
                title={isAutoSpinning ? 'Tạm dừng xoay tự động' : 'Tự động xoay 3D'}
              >
                {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{isAutoSpinning ? 'Dừng' : 'Xoay'}</span>
              </button>

              <button
                onClick={handleResetOrientation}
                className="p-1.5 rounded-lg bg-navy/80 text-ivory-muted border border-navy-light/60 hover:text-ivory transition-all"
                title="Đặt lại góc xoay và lực đẩy"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG 3D Canvas */}
          <div
            className="w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative my-2"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              viewBox="-160 -120 320 240"
              className="w-full max-w-[460px] h-auto overflow-visible"
            >
              <defs>
                {/* Glow filter */}
                <filter id="vseprGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Lone Pair Gradient (Luminous Pear-shaped Lobe) */}
                <radialGradient id="vseprLpGlow" cx="50%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                </radialGradient>

                {/* Central Atom Gradient */}
                <radialGradient id="centralAtomGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="60%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </radialGradient>

                {/* Ligand Atom Gradient */}
                <radialGradient id="ligandAtomGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="60%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#164e63" />
                </radialGradient>

                {/* Bond Cylinder Gradient */}
                <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* 3D Coordinate Grid Guide (XY Plane Subtle Ring) */}
              <ellipse
                cx="0"
                cy="0"
                rx="105"
                ry={105 * Math.sin((Math.abs(pitchDeg) * Math.PI) / 180 + 0.1)}
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Render Domains in Depth Order */}
              {projectedDomains.map(d => {
                const px = d.px || 0;
                const py = d.py || 0;
                const depth = d.depth || 0;
                const scale = 0.85 + (depth + 1) * 0.15; // Depth scaling factor

                if (d.type === 'LONE_PAIR') {
                  // Pear-shaped Lone Pair Orbital Lobe pointing towards (px, py)
                  const len = Math.hypot(px, py);
                  const angleRad = Math.atan2(py, px);
                  const angleDegRot = (angleRad * 180) / Math.PI;

                  return (
                    <g key={d.id} transform={`rotate(${angleDegRot})`}>
                      {/* Orbital Lobe */}
                      <path
                        d={`M 0 0 C ${len * 0.4} -24, ${len * 0.9} -20, ${len} 0 C ${len * 0.9} 20, ${len * 0.4} 24, 0 0 Z`}
                        fill="url(#vseprLpGlow)"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                        opacity={0.75 * scale}
                        filter="url(#vseprGlow)"
                      />
                      {/* Electron Pair (2 glowing dots inside lobe) */}
                      <circle cx={len * 0.72} cy="-6" r={3 * scale} fill="#00f0ff" filter="url(#vseprGlow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={len * 0.72} cy="6" r={3 * scale} fill="#00f0ff" filter="url(#vseprGlow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <text
                        x={len * 0.75}
                        y={20}
                        textAnchor="middle"
                        fill="#38bdf8"
                        fontFamily="monospace"
                        fontSize={8 * scale}
                        fontWeight="bold"
                        transform={`rotate(${-angleDegRot}, ${len * 0.75}, 20)`}
                      >
                        LP ({d.label})
                      </text>
                    </g>
                  );
                }

                // Bonding Domain (BP): Bond cylinder line + Ligand Sphere
                return (
                  <g key={d.id}>
                    {/* Bond Stick */}
                    <line
                      x1="0"
                      y1="0"
                      x2={px}
                      y2={py}
                      stroke="url(#bondGrad)"
                      strokeWidth={5 * scale}
                      strokeLinecap="round"
                    />

                    {/* Ligand Sphere */}
                    <g transform={`translate(${px}, ${py}) scale(${scale})`}>
                      <circle
                        r="18"
                        fill="url(#ligandAtomGrad)"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        filter="url(#vseprGlow)"
                      />
                      <text
                        textAnchor="middle"
                        dy="5"
                        fill="#f8fafc"
                        fontFamily="'Cinzel', serif"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        {ligandSymbol}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Central Atom (Rendered in center with glow) */}
              <g transform="translate(0, 0)">
                <circle
                  r="24"
                  fill="url(#centralAtomGrad)"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  filter="url(#vseprGlow)"
                />
                <text
                  textAnchor="middle"
                  dy="6"
                  fill="#f8fafc"
                  fontFamily="'Cinzel', serif"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {centralSymbol}
                </text>
                <text
                  textAnchor="middle"
                  dy="17"
                  fill="#fca5a5"
                  fontFamily="monospace"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {geometryMeta.hybridization}
                </text>
              </g>

              {/* Angle Measurement Arc & Badge (between first 2 BP domains if present) */}
              {projectedDomains.filter(d => d.type === 'BONDING').length >= 2 && (
                <g>
                  <circle
                    cx="0"
                    cy="0"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />
                  <rect
                    x="-28"
                    y="46"
                    width="56"
                    height="18"
                    rx="4"
                    fill="#0f172a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    filter="url(#vseprGlow)"
                  />
                  <text
                    x="0"
                    y="59"
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontFamily="monospace"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {angleMetrics.actualAngleDeg}°
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Canvas Controls: Repulsion Slider + Rotation Stats */}
          <div className="w-full bg-navy/80 border border-navy-light/60 rounded-xl p-3 flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ivory font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-ion" />
                ÁP LỰC ĐẨY CẶP E TỰ DO (GILLESPIE-NYHOLM):
              </span>
              <span className="text-cyan-ion font-black text-sm">
                {repulsionMultiplier.toFixed(2)}x
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.0}
                max={2.0}
                step={0.05}
                value={repulsionMultiplier}
                onChange={e => handleRepulsionChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-navy-light rounded-lg"
              />
              <button
                onClick={() => handleRepulsionChange(1.0)}
                className="px-2.5 py-1 rounded bg-navy-light/60 text-[11px] font-mono text-ivory-muted hover:text-cyan-ion border border-navy-light/80 whitespace-nowrap"
              >
                Chuẩn (1.0x)
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-ivory-muted pt-1 border-t border-navy-light/40">
              <span>Xoay ngang (Yaw): <strong className="text-ivory">{yawDeg}°</strong></span>
              <span>Xoay dọc (Pitch): <strong className="text-ivory">{pitchDeg}°</strong></span>
              <span className="text-cyan-300">Giữ chuột để kéo xoay 3D</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Analytical Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Navigation Subtabs */}
          <div className="flex items-center gap-1 bg-obsidian/70 p-1 rounded-xl border border-navy-light/50">
            <button
              onClick={() => {
                setActiveTab('3D_MODEL');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === '3D_MODEL'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Thông Số
            </button>
            <button
              onClick={() => {
                setActiveTab('REPULSION_DEFORMATION');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'REPULSION_DEFORMATION'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Biến Dạng
            </button>
            <button
              onClick={() => {
                setActiveTab('VSEPR_RULES');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'VSEPR_RULES'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Lý Thuyết
            </button>
            <button
              onClick={() => {
                setActiveTab('TACTICAL');
                sound.playUiClick();
              }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'TACTICAL'
                  ? 'bg-cyan-ion text-obsidian shadow-sm font-black'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Chiến Thuật
            </button>
          </div>

          {/* TAB 1: 3D_MODEL (Thông Số Không Gian) */}
          {activeTab === '3D_MODEL' && (
            <div className="flex flex-col gap-3">
              {/* VSEPR Key Metrics Card */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/40 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-ion uppercase flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-ion" />
                    CẤU TRÚC HÌNH HỌC VSEPR
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-ion/20 text-cyan-300 border border-cyan-ion/50 font-black">
                    {currentFormulaAXE}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-navy/70 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Cấu hình electron:</div>
                    <div className="text-ivory font-bold truncate">{geometryMeta.electronDomainGeometryVI}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy/70 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Hình học phân tử:</div>
                    <div className="text-cyan-300 font-bold truncate">{geometryMeta.molecularShapeVI}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy/70 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Số phối trí (SN):</div>
                    <div className="text-ivory font-bold">{geometryMeta.stericNumber} ({geometryMeta.bondingPairs} BP + {geometryMeta.lonePairs} LP)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy/70 border border-navy-light/40">
                    <div className="text-[10px] text-ivory-muted">Trạng thái lai hóa:</div>
                    <div className="text-amber-300 font-bold">{geometryMeta.hybridization}</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Angle Comparison */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory font-bold">GÓC LIÊN KẾT THỰC NGHIỆM:</span>
                  <span className="text-amber-400 font-extrabold text-sm">{angleMetrics.actualAngleDeg}°</span>
                </div>
                <div className="flex items-center justify-between text-xs text-ivory-muted border-t border-navy-light/40 pt-2">
                  <span>Góc lý tưởng đối xứng:</span>
                  <span className="text-ivory">{angleMetrics.idealAngleDeg}°</span>
                </div>
                <div className="flex items-center justify-between text-xs text-ivory-muted">
                  <span>Độ co góc do lực đẩy LP:</span>
                  <span className={angleMetrics.angleDeviationDeg > 0 ? 'text-coral-reaction font-bold' : 'text-emerald-400 font-bold'}>
                    -{angleMetrics.angleDeviationDeg}°
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-ivory-muted">
                  <span>Chỉ số năng lượng đẩy:</span>
                  <span className="text-cyan-300 font-bold">{angleMetrics.repulsionEnergyIndex}</span>
                </div>
              </div>

              {/* Dipole Moment & Polarity */}
              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ivory-muted">Độ phân cực phân tử:</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    geometryMeta.isPolar
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {geometryMeta.isPolar ? 'PHÂN CỰC (μ > 0)' : 'KHÔNG PHÂN CỰC (μ = 0)'}
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  {geometryMeta.dipoleMomentText}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: REPULSION_DEFORMATION (Thuyết Sức Đẩy Gillespie-Nyholm) */}
          {activeTab === 'REPULSION_DEFORMATION' && (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-ion/40 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-cyan-ion uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-ion" />
                  THỨ TỰ SỨC ĐẨY CẶP ELECTRON (IUPAC)
                </span>
                <div className="p-3 rounded-lg bg-navy/80 border border-cyan-ion/30 text-center font-mono font-bold text-amber-300 text-sm">
                  LP - LP &gt; LP - BP &gt; BP - BP
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Cặp electron tự do (LP) chỉ chịu lực hút của 1 hạt nhân nguyên tử trung tâm nên đám mây electron của nó phân tán rộng hơn trong không gian, gây ra lực đẩy tĩnh điện lớn hơn đám mây liên kết (BP) vốn bị giữ giữa 2 hạt nhân.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2 text-xs">
                <span className="font-mono font-bold text-ivory">GIẢI THÍCH SỰ BIẾN DẠNG GÓC:</span>
                <p className="text-ivory leading-relaxed bg-navy/50 p-3 rounded-lg border border-navy-light/40">
                  {angleMetrics.explanationVI}
                </p>
                <div className="mt-1 text-ivory-muted text-[11px] leading-relaxed">
                  {geometryMeta.pedagogicalNotesVI}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VSEPR_RULES (Bảng Tra Cứu Toàn Diện GDPT 2018) */}
          {activeTab === 'VSEPR_RULES' && (
            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto scrollbar-thin pr-1">
              <div className="p-3 rounded-xl bg-obsidian/80 border border-navy-light/60 text-xs">
                <span className="font-mono font-bold text-cyan-ion block mb-1">
                  ĐỊNH NGHĨA SỐ PHỐI TRÍ (STERIC NUMBER - SN):
                </span>
                <p className="text-ivory-muted leading-relaxed font-mono">
                  SN = (Số liên kết σ) + (Số cặp e tự do LP trên nguyên tử trung tâm)
                </p>
              </div>

              {Object.values(VSEPR_GEOMETRY_CATALOG).map(cat => (
                <div
                  key={cat.formulaAXE}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                    cat.formulaAXE === currentFormulaAXE
                      ? 'bg-cyan-ion/15 border-cyan-ion text-ivory shadow-md'
                      : 'bg-obsidian/60 border-navy-light/40 text-ivory-muted hover:bg-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-300">{cat.formulaAXE} (SN = {cat.stericNumber})</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-light text-ivory">
                      {cat.hybridization}
                    </span>
                  </div>
                  <div className="text-[11px] text-ivory mb-1">
                    {cat.molecularShapeVI} • Góc chuẩn: <strong className="text-amber-400">{cat.bondAngleFormulaText}</strong>
                  </div>
                  <div className="text-[10px] text-ivory-muted">
                    Ví dụ: {cat.curriculumExamples.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: TACTICAL (Hiệu Ứng Chiến Thuật Đấu Trường) */}
          {activeTab === 'TACTICAL' && (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-emerald-500/40 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-300 uppercase">
                    BÙA LỢI HÌNH HỌC KHÔNG GIAN VSEPR
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  {builderMode === 'PRESET' ? activePreset.tacticalBuff.nameVI : 'Cân Bằng Miền Không Gian'}
                </h4>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  {builderMode === 'PRESET'
                    ? activePreset.tacticalBuff.descriptionVI
                    : `Cấu hình ${currentFormulaAXE} cung cấp ${angleMetrics.repulsionEnergyIndex * 5} điểm sức mạnh chiến thuật và tăng khả năng kháng hiệu ứng khống chế.`}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-mono border-t border-emerald-500/20 pt-2 text-emerald-300">
                  <span>Hệ số chỉ số: +{builderMode === 'PRESET' ? activePreset.tacticalBuff.power : 35}</span>
                  <span>Độ phân cực: {geometryMeta.isPolar ? 'Xuyên kháng phép' : 'Miễn nhiễm khống chế'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian/70 border border-navy-light/60 text-xs">
                <div className="font-mono font-bold text-cyan-ion mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ỨNG DỤNG TÁC CHIẾN TCG & MOBA:</span>
                </div>
                <p className="text-ivory-muted leading-relaxed">
                  Trong ELEMENTA, phân tử có góc cong phân cực lớn ($H_2O, SO_2$) tăng hiệu ứng dẫn điện và làm chậm trên sông, trong khi các cấu trúc đối xứng triệt tiêu lưỡng cực ($CO_2, CH_4, SF_6$) mang lại giáp bảo hộ và miễn nhiễm sốc điện!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
