// src/components/visualizations/CrystallographyVisualizer.tsx
// Interactive Crystallography, Unit Cells & Solid-State Chemistry Visualizer
// Conforming to Vietnam GDPT 2018 (Hóa 10 Chương 3: Liên kết hóa học & Tinh thể) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Gem,
  Box,
  Layers,
  Sparkles,
  Info,
  Scale,
  Compass,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
  Maximize2,
  Volume2
} from 'lucide-react';
import {
  CRYSTAL_SYSTEMS,
  CrystalSystemType,
  CubicLatticeType,
  CURRICULUM_CRYSTAL_PRESETS,
  UnitCellPresetDef,
  calculateCrystalDensity,
  calculateLatticeConstantFromRadius,
  calculateAtomicRadiusFromLatticeConstant,
  calculateAtomicPackingFactor,
  calculateBraggDiffraction
} from '../../domain/crystallographyEngine';
import { sound } from '../../audio/soundEngine';

export interface CrystallographyVisualizerProps {
  initialPresetId?: string;
  className?: string;
}

export const CrystallographyVisualizer: React.FC<CrystallographyVisualizerProps> = ({
  initialPresetId = 'copper_fcc',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'SYSTEMS' | 'METALLIC' | 'IONIC' | 'CALCULATOR'>('METALLIC');

  // Tab 1 state
  const [selectedSystemType, setSelectedSystemType] = useState<CrystalSystemType>('CUBIC');

  // Tab 2 & 3 state
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);

  // Tab 4 Density Calculator state
  const [calcMolarMass, setCalcMolarMass] = useState<number>(63.546); // Cu
  const [calcZ, setCalcZ] = useState<number>(4);
  const [calcEdgeA_pm, setCalcEdgeA_pm] = useState<number>(361.5);

  // Tab 4 XRD Bragg Calculator state
  const [xrdWavelengthPm, setXrdWavelengthPm] = useState<number>(154.06); // Cu K-alpha
  const [millerH, setMillerH] = useState<number>(1);
  const [millerK, setMillerK] = useState<number>(1);
  const [millerL, setMillerL] = useState<number>(1);

  // Selected Preset
  const currentPreset: UnitCellPresetDef = useMemo(() => {
    return CURRICULUM_CRYSTAL_PRESETS[selectedPresetId] || CURRICULUM_CRYSTAL_PRESETS.copper_fcc;
  }, [selectedPresetId]);

  // Selected System
  const currentSystem = useMemo(() => {
    return CRYSTAL_SYSTEMS[selectedSystemType];
  }, [selectedSystemType]);

  // Tab 4 Density computation
  const densityResult = useMemo(() => {
    try {
      return calculateCrystalDensity(calcMolarMass, calcZ, calcEdgeA_pm);
    } catch {
      return {
        densityGcm3: 0,
        unitCellVolumeCm3: 0,
        unitCellVolumePm3: 0,
        interpretationVI: 'Lỗi thông số tính toán.'
      };
    }
  }, [calcMolarMass, calcZ, calcEdgeA_pm]);

  // Tab 4 XRD computation
  const braggResult = useMemo(() => {
    try {
      return calculateBraggDiffraction(xrdWavelengthPm, millerH, millerK, millerL, calcEdgeA_pm);
    } catch {
      return {
        interplanarDistancePm: 0,
        thetaDegrees: 0,
        twoThetaDegrees: 0,
        millerIndicesDisplay: '(0 0 0)',
        isDiffractionPossible: false
      };
    }
  }, [xrdWavelengthPm, millerH, millerK, millerL, calcEdgeA_pm]);

  // Metallic APF data
  const metallicApf = useMemo(() => {
    if (
      currentPreset.latticeType === 'SIMPLE_CUBIC' ||
      currentPreset.latticeType === 'BODY_CENTERED_CUBIC' ||
      currentPreset.latticeType === 'FACE_CENTERED_CUBIC' ||
      currentPreset.latticeType === 'HEXAGONAL_CLOSE_PACK' ||
      currentPreset.latticeType === 'DIAMOND_CUBIC'
    ) {
      return calculateAtomicPackingFactor(currentPreset.latticeType);
    }
    return null;
  }, [currentPreset.latticeType]);

  return (
    <div className={`bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl flex flex-col gap-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl shadow-lg">
            <Gem className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Tinh Thể Học, Ô Mạng Cơ Sở & Cấu Trúc Chất Rắn
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                GDPT 2018 · IUPAC · Solid State
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              7 Hệ Tinh Thể, 14 Mạng Bravais, Mạng Lập Phương (SC, BCC, FCC, Diamond), Tinh Thể Ion & Nhiễu Xạ Tia X (Bragg XRD)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('SYSTEMS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'SYSTEMS'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            7 Hệ Tinh Thể
          </button>
          <button
            onClick={() => setActiveTab('METALLIC')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'METALLIC'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Mạng Lập Phương & Kim Cương
          </button>
          <button
            onClick={() => setActiveTab('IONIC')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'IONIC'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Tinh Thể Ion (NaCl, CsCl, ZnS, CaF2)
          </button>
          <button
            onClick={() => setActiveTab('CALCULATOR')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CALCULATOR'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Máy Tính Khối Lượng Riêng & XRD
          </button>
        </div>
      </div>

      {/* TAB 1: 7 HỆ TINH THỂ & 14 MẠNG BRAVAIS */}
      {activeTab === 'SYSTEMS' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Systems List */}
          <div className="lg:w-4/12 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>7 Hệ Tinh Thể Không Gian</span>
              <span className="text-cyan-400 font-mono">7 Hệ / 14 Mạng</span>
            </span>
            <div className="space-y-2">
              {Object.values(CRYSTAL_SYSTEMS).map(sys => {
                const isSelected = sys.type === selectedSystemType;
                return (
                  <button
                    key={sys.type}
                    onClick={() => {
                      setSelectedSystemType(sys.type);
                      sound.playCrystalResonanceDing();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500 shadow-md shadow-cyan-950/40 text-cyan-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{sys.nameVI}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sys.axesRelationVI} · {sys.anglesRelationVI}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-400">
                      {sys.bravaisLatticeTypesVI.length} Mạng
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Details & Schematic */}
          <div className="lg:w-8/12 bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                  {currentSystem.nameEN}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {currentSystem.nameVI}
                </h3>
              </div>
              <button
                onClick={() => sound.playCrystalResonanceDing()}
                className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-all border border-cyan-500/30 flex items-center gap-1.5 text-xs font-semibold"
                title="Âm vang tinh thể"
              >
                <Volume2 className="w-4 h-4" />
                Âm vang Ô mạng
              </button>
            </div>

            {/* Geometry specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Quan hệ chiều dài trục tinh thể (Cạnh):</span>
                <strong className="text-cyan-300 text-sm">{currentSystem.axesRelationVI}</strong>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Quan hệ góc giữa các trục (Góc):</span>
                <strong className="text-amber-300 text-sm">{currentSystem.anglesRelationVI}</strong>
              </div>
            </div>

            {/* Bravais Lattices in this system */}
            <div className="space-y-1.5 text-xs">
              <span className="text-slate-400 font-semibold block">Các kiểu ô mạng Bravais tương ứng:</span>
              <div className="flex flex-wrap gap-2">
                {currentSystem.bravaisLatticeTypesVI.map((bravais, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 text-xs font-medium"
                  >
                    ✦ {bravais}
                  </span>
                ))}
              </div>
            </div>

            {/* Symmetry & Pedagogical notes */}
            <div className="space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block">Đặc điểm đối xứng không gian:</span>
              <p className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                {currentSystem.pedagogicalNotesVI}
              </p>
            </div>

            {/* Characteristic substances */}
            <div className="space-y-1 text-xs mt-auto">
              <span className="text-slate-400 font-semibold block">Các khoáng vật & chất tiêu biểu kết tinh theo hệ này:</span>
              <div className="flex flex-wrap gap-2">
                {currentSystem.characteristicSubstancesVI.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MẠNG LẬP PHƯƠNG & KIM CƯƠNG */}
      {activeTab === 'METALLIC' && (
        <div className="flex flex-col gap-6">
          {/* Preset Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              Chọn Mẫu Tinh Thể Lập Phương Chuẩn:
            </span>
            <div className="flex flex-wrap gap-2">
              {['copper_fcc', 'iron_alpha_bcc', 'polonium_alpha_sc', 'carbon_diamond'].map(id => {
                const preset = CURRICULUM_CRYSTAL_PRESETS[id];
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedPresetId(id);
                      setCalcMolarMass(preset.molarMassGmol);
                      setCalcZ(preset.atomsOrFormulaUnitsPerCell);
                      setCalcEdgeA_pm(preset.latticeEdgeA_pm);
                      sound.playCrystalResonanceDing();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selectedPresetId === id
                        ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {preset.nameVI.split('(')[0].trim()} ({preset.chemicalFormula})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit Cell Showcase & Interactive Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Visual SVG Isometric Unit Cell */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <Box className="w-4 h-4 text-cyan-400" />
                  MÔ HÌNH HỌC KHÔNG GIAN 3D Ô MẠNG CƠ SỞ
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  a = {currentPreset.latticeEdgeA_pm} pm
                </span>
              </div>

              {/* 3D Isometric Projection SVG */}
              <svg viewBox="-120 -100 240 200" className="w-64 h-64 drop-shadow-xl">
                {/* Cube Wireframe */}
                <g stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" fill="none">
                  {/* Back faces (dashed) */}
                  <line x1="-50" y1="-20" x2="30" y2="-20" strokeDasharray="3 3" />
                  <line x1="-50" y1="-20" x2="-50" y2="60" strokeDasharray="3 3" />
                  <line x1="-50" y1="-20" x2="-80" y2="-50" strokeDasharray="3 3" />

                  {/* Front faces */}
                  <polygon points="-80,30 0,30 0,-50 -80,-50" fill="rgba(56, 189, 248, 0.04)" />
                  <polygon points="0,30 30,60 30,-20 0,-50" fill="rgba(56, 189, 248, 0.08)" />
                  <polygon points="-80,-50 0,-50 30,-20 -50,-20" fill="rgba(56, 189, 248, 0.06)" />
                </g>

                {/* 8 Corner Atoms (Red/Cyan spheres) */}
                {[
                  [-80, 30], [0, 30], [-80, -50], [0, -50],
                  [-50, -20], [30, -20], [-50, 60], [30, 60]
                ].map(([cx, cy], idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="8"
                    fill="#38bdf8"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    className="drop-shadow"
                  />
                ))}

                {/* Body Centered Atom for BCC */}
                {currentPreset.latticeType === 'BODY_CENTERED_CUBIC' && (
                  <circle cx="-25" cy="5" r="11" fill="#f59e0b" stroke="#d97706" strokeWidth="2" className="animate-pulse" />
                )}

                {/* 6 Face Centered Atoms for FCC */}
                {currentPreset.latticeType === 'FACE_CENTERED_CUBIC' && (
                  <>
                    <circle cx="-40" cy="-10" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="-10" cy="5" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="-40" cy="45" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="-65" cy="-10" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="-25" cy="-35" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="15" cy="20" r="9" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                  </>
                )}

                {/* Diamond Interior Atoms */}
                {currentPreset.latticeType === 'DIAMOND_CUBIC' && (
                  <>
                    <circle cx="-45" cy="10" r="7" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="-15" cy="-20" r="7" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="-15" cy="25" r="7" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                    <circle cx="-45" cy="-25" r="7" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                  </>
                )}
              </svg>

              {/* Cleavage & Sound action */}
              <div className="w-full flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-mono">
                  Mặt Cát Khai: <strong className="text-cyan-300">{currentPreset.cleavagePlanesVI}</strong>
                </span>
                <button
                  onClick={() => sound.playLatticeCleavageSnap()}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition"
                >
                  ⚡ Mô phỏng nứt vỡ tinh thể
                </button>
              </div>
            </div>

            {/* Metrics & Mathematical Derivations */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {currentPreset.nameVI}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                    Z = {currentPreset.atomsOrFormulaUnitsPerCell} nguyên tử/ô
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Độ cứng Mohs: <strong className="text-amber-400">{currentPreset.mohsHardness} / 10</strong> · Khối lượng mol: <strong className="text-slate-200">{currentPreset.molarMassGmol} g/mol</strong>
                </p>
              </div>

              {/* APF & Coordination Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Số phối trí (Coordination Number):</span>
                  <strong className="text-lg font-bold font-mono text-cyan-300">{currentPreset.coordinationNumber}</strong>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Độ đặc khít hình học (APF):</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-lg font-bold font-mono text-emerald-400">{currentPreset.packingEfficiencyPercent}%</strong>
                  </div>
                </div>
              </div>

              {/* APF Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Phần không gian bị chiếm bởi nguyên tử:</span>
                  <span className="text-emerald-300 font-bold">{currentPreset.packingEfficiencyPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${currentPreset.packingEfficiencyPercent}%` }}
                  />
                </div>
              </div>

              {/* Theoretical derivation note */}
              {metallicApf && (
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                  {metallicApf.derivationVI}
                </div>
              )}

              {/* Insight callout */}
              <p className="text-xs text-cyan-200/90 bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40 leading-relaxed italic">
                "{currentPreset.pedagogicalInsightVI}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TINH THỂ ION (NaCl, CsCl, ZnS, CaF2) */}
      {activeTab === 'IONIC' && (
        <div className="flex flex-col gap-6">
          {/* Preset Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Chọn Điển Hình Tinh Thể Ion (GDPT 2018):
            </span>
            <div className="flex flex-wrap gap-2">
              {['sodium_chloride_rocksalt', 'cesium_chloride', 'zinc_blende', 'calcium_fluorite'].map(id => {
                const preset = CURRICULUM_CRYSTAL_PRESETS[id];
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedPresetId(id);
                      setCalcMolarMass(preset.molarMassGmol);
                      setCalcZ(preset.atomsOrFormulaUnitsPerCell);
                      setCalcEdgeA_pm(preset.latticeEdgeA_pm);
                      sound.playCrystalResonanceDing();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selectedPresetId === id
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {preset.nameVI.split('(')[0].trim()} ({preset.chemicalFormula})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pauling Radius Ratio & Interstitial Voids Rule */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Quy Tắc Tỉ Số Bán Kính Pauling (r⁺ / r⁻) & Dạng Hốc Tinh Thể
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Xác định số phối trí và hình học sắp xếp tối ưu giữa cation và anion
                </p>
              </div>
              {currentPreset.cationRadiusPm && currentPreset.anionRadiusPm && (
                <div className="text-right font-mono">
                  <span className="text-[11px] text-slate-400 block">Tỉ số r⁺/r⁻ hiện tại:</span>
                  <span className="text-base font-bold text-emerald-400">
                    {(currentPreset.cationRadiusPm / currentPreset.anionRadiusPm).toFixed(3)}
                  </span>
                </div>
              )}
            </div>

            {/* Radius details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Bán kính Cation r⁺:</span>
                <strong className="text-cyan-300 text-sm">{currentPreset.cationRadiusPm} pm</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Bán kính Anion r⁻:</span>
                <strong className="text-rose-300 text-sm">{currentPreset.anionRadiusPm} pm</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Số phối trí Cation : Anion:</span>
                <strong className="text-amber-300 text-sm">{currentPreset.coordinationNumber}</strong>
              </div>
            </div>

            {/* Pauling reference rules table */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 font-semibold block">Bảng tra khoảng tỉ số bán kính Pauling:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">0.225 – 0.414:</span>
                  <strong className="text-purple-300">Tứ diện (CN = 4, ZnS)</strong>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">0.414 – 0.732:</span>
                  <strong className="text-emerald-300">Bát diện (CN = 6, NaCl)</strong>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">0.732 – 1.000:</span>
                  <strong className="text-cyan-300">Lập phương (CN = 8, CsCl)</strong>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">1.000 (Chặt khít):</span>
                  <strong className="text-amber-300">Khối 12 mặt (CN = 12)</strong>
                </div>
              </div>
            </div>

            {/* Pedagogical notes */}
            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {currentPreset.pedagogicalInsightVI}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: MÁY TÍNH KHỐI LƯỢNG RIÊNG & NHIỄU XẠ TIA X */}
      {activeTab === 'CALCULATOR' && (
        <div className="flex flex-col gap-6">
          {/* Density Calculator */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Máy Tính Khối Lượng Riêng Tinh Thể Lý Thuyết (Density Calculator)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Công thức GDPT 2018: ρ = (Z × M) / (N_A × a³)
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Khối Lượng Riêng:</span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {densityResult.densityGcm3} g/cm³
                </span>
              </div>
            </div>

            {/* Sliders / Inputs for Density */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Khối lượng mol M (g/mol):</span>
                  <span className="font-mono font-bold text-white">{calcMolarMass}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="0.1"
                  value={calcMolarMass}
                  onChange={e => setCalcMolarMass(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Số phân tử / nguyên tử trong ô (Z):</span>
                  <span className="font-mono font-bold text-amber-300">{calcZ}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={calcZ}
                  onChange={e => setCalcZ(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Hằng số mạng a (pm):</span>
                  <span className="font-mono font-bold text-emerald-300">{calcEdgeA_pm}</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="700"
                  step="1"
                  value={calcEdgeA_pm}
                  onChange={e => setCalcEdgeA_pm(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {densityResult.interpretationVI}
            </p>
          </div>

          {/* Bragg XRD Diffraction Calculator */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Mô Phỏng Nhiễu Xạ Tia X (Định Luật Bragg - XRD)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  nλ = 2d·sin(θ) · Khoảng cách mặt phản xạ d_hkl = a / √(h² + k² + l²)
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Góc Nhiễu Xạ 2θ:</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {braggResult.isDiffractionPossible ? `${braggResult.twoThetaDegrees}°` : 'Vượt giới hạn'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 block">Mặt nhiễu xạ Miller (h k l):</span>
                <div className="flex gap-2">
                  {[millerH, millerK, millerL].map((val, idx) => (
                    <input
                      key={idx}
                      type="number"
                      min="0"
                      max="4"
                      value={val}
                      onChange={e => {
                        const v = Math.max(0, Number(e.target.value));
                        if (idx === 0) setMillerH(v);
                        if (idx === 1) setMillerK(v);
                        if (idx === 2) setMillerL(v);
                      }}
                      className="w-12 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white font-bold"
                    />
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Khoảng cách giữa các mặt d:</span>
                <strong className="text-base font-bold font-mono text-cyan-300">
                  {braggResult.interplanarDistancePm} pm
                </strong>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Góc tới Bragg θ:</span>
                <strong className="text-base font-bold font-mono text-amber-300">
                  {braggResult.isDiffractionPossible ? `${braggResult.thetaDegrees}°` : 'Không phản xạ'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          Bộ Giáo Dục & Đào Tạo Việt Nam — GDPT 2018 Hóa học 10 (Chương 3: Liên kết hóa học & Tinh thể)
        </span>
        <span className="font-mono text-slate-500">IUPAC Solid State Commission · 14 Bravais Lattices</span>
      </div>
    </div>
  );
};
