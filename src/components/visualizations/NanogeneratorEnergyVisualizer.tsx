// src/components/visualizations/NanogeneratorEnergyVisualizer.tsx
// Interactive Visualizer: Piezoelectric & Triboelectric Nanogenerators (PENG & TENG)
// Standards: IUPAC Advanced Materials, Maxwell's Displacement Current (Wang 2006, 2012) & Vietnam GDPT 2018 (Vật lý & Hóa học Năng lượng Tự cấp nguồn)

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  Gauge,
  Box,
  Cpu,
  Atom,
  TrendingUp,
  Radio,
  Wifi,
  Waves
} from 'lucide-react';
import {
  PIEZOELECTRIC_MATERIALS_CATALOG,
  TRIBOELECTRIC_PAIRS_CATALOG,
  calculatePengOutput,
  calculateTengOutput,
  simulatePmuStorageCharging,
  PiezoelectricMaterial,
  TriboelectricMaterialPair
} from '../../domain/nanogeneratorEnergyEngine';
import { sound } from '../../audio/soundEngine';

type NanogenTabMode = 'PENG_PIEZOELECTRIC' | 'TENG_TRIBOELECTRIC' | 'PMU_IOT_SELF_POWERED';

export const NanogeneratorEnergyVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NanogenTabMode>('PENG_PIEZOELECTRIC');

  // Mode 1: PENG State
  const [selectedPiezoId, setSelectedPiezoId] = useState<string>('PVDF_BETA_POLYMER');
  const [appliedForceN, setAppliedForceN] = useState<number>(30.0);
  const [vibrationFrequencyHz, setVibrationFrequencyHz] = useState<number>(5.0);
  const [filmThicknessMicrons, setFilmThicknessMicrons] = useState<number>(50.0);

  // Mode 2: TENG State
  const [selectedTriboId, setSelectedTriboId] = useState<string>('PTFE_ALUMINUM_CONTACT');
  const [contactGapMm, setContactGapMm] = useState<number>(2.0);
  const [tengFrequencyHz, setTengFrequencyHz] = useState<number>(4.0);
  const [loadResistanceMegaOhms, setLoadResistanceMegaOhms] = useState<number>(800.0);

  // Mode 3: PMU Storage State
  const [pmuSourceType, setPmuSourceType] = useState<'PIEZOELECTRIC_PENG' | 'TRIBOELECTRIC_TENG' | 'HYBRID_PENG_TENG'>('TRIBOELECTRIC_TENG');
  const [chargingDurationSeconds, setChargingDurationSeconds] = useState<number>(30.0);
  const [storageCapacitanceMicroF, setStorageCapacitanceMicroF] = useState<number>(100.0);

  // Computed: PENG Output
  const pengOutput = useMemo(() => {
    return calculatePengOutput(selectedPiezoId, appliedForceN, vibrationFrequencyHz, filmThicknessMicrons, 10.0, true);
  }, [selectedPiezoId, appliedForceN, vibrationFrequencyHz, filmThicknessMicrons]);

  // Computed: TENG Output
  const tengOutput = useMemo(() => {
    return calculateTengOutput(selectedTriboId, tengFrequencyHz, contactGapMm, loadResistanceMegaOhms);
  }, [selectedTriboId, tengFrequencyHz, contactGapMm, loadResistanceMegaOhms]);

  // Computed: PMU Storage Simulation
  const pmuSimulation = useMemo(() => {
    return simulatePmuStorageCharging(pmuSourceType, selectedTriboId, chargingDurationSeconds, storageCapacitanceMicroF);
  }, [pmuSourceType, selectedTriboId, chargingDurationSeconds, storageCapacitanceMicroF]);

  const handleTabChange = (mode: NanogenTabMode) => {
    sound.playUiClick();
    setActiveTab(mode);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Máy Phát Điện Nano (PENG & TENG) & Năng Lượng Tự Cấp Nguồn
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
                Wang 2006/2012 • IUPAC
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Áp điện PVDF/ZnO, Ma sát điện PTFE/Al, Dòng dịch chuyển Maxwell & Thu hồi năng lượng rung động IoT
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleTabChange('PENG_PIEZOELECTRIC')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'PENG_PIEZOELECTRIC'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Áp Điện (PENG)
          </button>
          <button
            onClick={() => handleTabChange('TENG_TRIBOELECTRIC')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'TENG_TRIBOELECTRIC'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Ma Sát Điện (TENG)
          </button>
          <button
            onClick={() => handleTabChange('PMU_IOT_SELF_POWERED')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'PMU_IOT_SELF_POWERED'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            Mạch PMU & Cảm Biến IoT
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {/* TAB 1: PIEZOELECTRIC NANOGENERATOR (PENG) */}
        {activeTab === 'PENG_PIEZOELECTRIC' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    1. Vật Liệu Áp Điện (Piezoelectric Material)
                  </label>
                  <div className="space-y-2">
                    {PIEZOELECTRIC_MATERIALS_CATALOG.map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedPiezoId(mat.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                          selectedPiezoId === mat.id
                            ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{mat.nameVi.split('(')[0]}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            d₃₃: {mat.d33PiezoelectricCoefficientPcN} pC/N • g₃₃: {mat.g33VoltageCoefficientVmN} mV·m/N
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          mat.leadFreeEcoCompliant
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {mat.leadFreeEcoCompliant ? 'Không Chì (Eco)' : 'Chứa Chì (Pb)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mechanical Force & Frequency Sliders */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Tham Số Cơ Học Kích Thích
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Lực cơ học tác dụng (F):</span>
                      <span className="font-mono text-amber-400 font-semibold">{appliedForceN} N</span>
                    </div>
                    <input
                      type="range"
                      min={5.0}
                      max={100.0}
                      step={5.0}
                      value={appliedForceN}
                      onChange={e => setAppliedForceN(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Tần số rung động uốn dẻo (f):</span>
                      <span className="font-mono text-amber-400 font-semibold">{vibrationFrequencyHz} Hz</span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={20.0}
                      step={1.0}
                      value={vibrationFrequencyHz}
                      onChange={e => setVibrationFrequencyHz(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Độ dày màng áp điện (t):</span>
                      <span className="font-mono text-amber-400 font-semibold">{filmThicknessMicrons} µm</span>
                    </div>
                    <input
                      type="range"
                      min={20.0}
                      max={200.0}
                      step={10.0}
                      value={filmThicknessMicrons}
                      onChange={e => setFilmThicknessMicrons(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Display & Cantilever SVG Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Metrics Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Điện Áp Đỉnh (V_oc)</div>
                    <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                      {pengOutput.peakOpenCircuitVoltageV} <span className="text-xs">V</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Dòng Ngắn Mạch (I_sc)</div>
                    <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                      {pengOutput.peakShortCircuitCurrentMicroA} <span className="text-xs">µA</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Công Suất Trung Bình</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      {pengOutput.instantaneousPowerMilliW} <span className="text-xs">mW</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Năng Lượng / Chu Kỳ</div>
                    <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                      {pengOutput.energyPerCycleMicroJ} <span className="text-xs">µJ</span>
                    </div>
                  </div>
                </div>

                {/* SVG Cantilever Bending Diagram */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Atom className="w-4 h-4 text-amber-400" />
                      Mô Phỏng Phân Cực Lưỡng Cực Điện Khi Màng Bị Uốn Cong (Cantilever Bending)
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      V_oc = g₃₃·σ·t
                    </span>
                  </div>

                  <div className="h-60 w-full flex items-center justify-center">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* Fixed Anchor Base */}
                      <rect x="20" y="50" width="35" height="100" fill="#334155" rx="3" />
                      <line x1="20" y1="50" x2="10" y2="60" stroke="#475569" strokeWidth="2" />
                      <line x1="20" y1="80" x2="10" y2="90" stroke="#475569" strokeWidth="2" />
                      <line x1="20" y1="110" x2="10" y2="120" stroke="#475569" strokeWidth="2" />
                      <line x1="20" y1="140" x2="10" y2="150" stroke="#475569" strokeWidth="2" />

                      {/* Top Metal Electrode */}
                      <path d="M 55,85 Q 200,60 330,110" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      <text x="340" y="105" fill="#f59e0b" fontSize="8" fontWeight="bold">+ Điện cực dương</text>

                      {/* Piezoelectric Active Film (Bent Arc) */}
                      <path d="M 55,95 Q 200,70 330,120" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" />

                      {/* Internal Aligned Dipoles (+ -) */}
                      <g fill="#022c22" fontSize="7" fontWeight="bold">
                        <text x="120" y="93" fill="#ec4899">+</text>
                        <text x="120" y="103" fill="#38bdf8">-</text>
                        <text x="180" y="85" fill="#ec4899">+</text>
                        <text x="180" y="95" fill="#38bdf8">-</text>
                        <text x="240" y="95" fill="#ec4899">+</text>
                        <text x="240" y="105" fill="#38bdf8">-</text>
                      </g>

                      {/* Bottom Metal Electrode */}
                      <path d="M 55,105 Q 200,80 330,130" fill="none" stroke="#3b82f6" strokeWidth="3" />
                      <text x="340" y="140" fill="#38bdf8" fontSize="8" fontWeight="bold">- Điện cực âm</text>

                      {/* Mechanical Vibration Arrow */}
                      <path d="M 320,50 L 320,80" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <text x="320" y="45" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">
                        Lực F ({appliedForceN}N, {vibrationFrequencyHz}Hz)
                      </text>

                      {/* External Load Resistor Loop */}
                      <path d="M 330,110 L 370,110 L 370,130 L 330,130" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,2" />
                      <circle cx="370" cy="120" r="4" fill="#10b981" />
                    </svg>
                  </div>

                  <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong>Đặc Tính Tinh Thể:</strong> {pengOutput.material.crystalPhaseVi}. {pengOutput.material.advantagesVi}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRIBOELECTRIC NANOGENERATOR (TENG) */}
        {activeTab === 'TENG_TRIBOELECTRIC' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    1. Cặp Vật Liệu & Chế Độ Hoạt Động TENG
                  </label>
                  <div className="space-y-2">
                    {TRIBOELECTRIC_PAIRS_CATALOG.map(pair => (
                      <button
                        key={pair.id}
                        onClick={() => {
                          sound.playUiClick();
                          setSelectedTriboId(pair.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                          selectedTriboId === pair.id
                            ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{pair.nameVi.split('(')[0]}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {pair.modeNameVi.split('(')[0]} • σ: {pair.surfaceChargeDensityMicroCm2} µC/m²
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mechanical Gap & Load Resistance Sliders */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Tham Số Vận Hành TENG
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Khoảng cách tách rời (Gap d):</span>
                      <span className="font-mono text-amber-400 font-semibold">{contactGapMm} mm</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={5.0}
                      step={0.5}
                      value={contactGapMm}
                      onChange={e => setContactGapMm(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Trở kháng tải ngoài (R_load):</span>
                      <span className="font-mono text-amber-400 font-semibold">{loadResistanceMegaOhms} MΩ</span>
                    </div>
                    <input
                      type="range"
                      min={50.0}
                      max={2000.0}
                      step={50.0}
                      value={loadResistanceMegaOhms}
                      onChange={e => setLoadResistanceMegaOhms(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                      <span>50 MΩ (Tải thấp)</span>
                      <span>R_opt: {tengOutput.optimalLoadResistanceMegaOhms} MΩ</span>
                      <span>2000 MΩ (Hở mạch)</span>
                    </div>
                  </div>
                </div>

                {/* Impedance Matching Indicator */}
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  tengOutput.isImpedanceMatched
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500 text-amber-200'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>Khớp Trở Kháng Nguồn:</span>
                    <span>{tengOutput.isImpedanceMatched ? '✓ HOÀN HẢO (CÔNG SUẤT ĐỈNH)' : 'LỆCH TRỞ KHÁNG TẢI'}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    {tengOutput.isImpedanceMatched
                      ? `Tải ngoài ${loadResistanceMegaOhms} MΩ khớp sát với trở kháng nội tại của TENG (${tengOutput.optimalLoadResistanceMegaOhms} MΩ), cho phép chuyển giao công suất điện cực đại ra mạch.`
                      : `Khuyến nghị điều chỉnh biến trở tải ngoài về gần ${tengOutput.optimalLoadResistanceMegaOhms} MΩ để đạt đỉnh công suất Maxwell.`}
                  </div>
                </div>
              </div>

              {/* Display & Contact-Separation SVG (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Chu Kỳ Tách Rời Tiếp Xúc & Dòng Dịch Chuyển Maxwell
                  </h3>
                  <span className="text-xs text-amber-400 font-mono font-bold">
                    Công suất đỉnh: {tengOutput.matchedPeakPowerMilliW} mW
                  </span>
                </div>

                {/* SVG Visualizing Contact Electrification */}
                <div className="h-64 w-full flex items-center justify-center bg-slate-950 rounded-xl p-2 border border-slate-800">
                  <svg viewBox="0 0 420 220" className="w-full h-full">
                    {/* Top Layer: Positive Tribo Layer (Al) */}
                    <rect x="60" y="30" width="300" height="35" fill="#64748b" rx="4" />
                    <text x="210" y="52" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {tengOutput.pair.positiveTriboLayer.split(' - ')[0]}
                    </text>

                    {/* Positive Surface Charges on Al */}
                    <g fill="#ec4899" fontSize="9" fontWeight="bold">
                      <text x="80" y="77">+</text>
                      <text x="130" y="77">+</text>
                      <text x="180" y="77">+</text>
                      <text x="230" y="77">+</text>
                      <text x="280" y="77">+</text>
                      <text x="330" y="77">+</text>
                    </g>

                    {/* Air Gap d Indicator */}
                    <line x1="45" y1="65" x2="45" y2="125" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                    <text x="40" y="98" fill="#f59e0b" fontSize="8" textAnchor="end">d = {contactGapMm} mm</text>

                    {/* Negative Surface Charges on PTFE */}
                    <g fill="#38bdf8" fontSize="11" fontWeight="bold">
                      <text x="80" y="120">-</text>
                      <text x="130" y="120">-</text>
                      <text x="180" y="120">-</text>
                      <text x="230" y="120">-</text>
                      <text x="280" y="120">-</text>
                      <text x="330" y="120">-</text>
                    </g>

                    {/* Bottom Layer: Negative Tribo Layer (PTFE) */}
                    <rect x="60" y="125" width="300" height="35" fill="#0284c7" rx="4" />
                    <text x="210" y="147" fill="#f0f9ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {tengOutput.pair.negativeTriboLayer.split(' - ')[0]}
                    </text>

                    {/* Bottom Backing Electrode (Cu) */}
                    <rect x="60" y="160" width="300" height="15" fill="#b45309" rx="2" />
                    <text x="210" y="172" fill="#fef3c7" fontSize="8" textAnchor="middle">Điện cực đáy đồng (Cu Backing)</text>

                    {/* External Circuit with Electrons Flowing */}
                    <path d="M 60,47 L 20,47 L 20,167 L 60,167" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="10" y="95" width="20" height="25" fill="#0f172a" stroke="#f59e0b" rx="2" />
                    <text x="20" y="111" fill="#f59e0b" fontSize="7" textAnchor="middle" fontWeight="bold">R_L</text>
                  </svg>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <strong>Dòng Dịch Chuyển Maxwell:</strong> Tiến sĩ Vương Trung Lâm (Zhong Lin Wang, 2017) đã bổ sung số hạng điện tích phân cực bề mặt dPs/dt vào phương trình dòng dịch chuyển Maxwell JD = ε·(dE/dt) + (dPs/dt), chứng minh TENG là nguồn phát điện dịch chuyển đầu tiên của nhân loại ở tần số thấp.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PMU CIRCUIT & IOT SENSOR */}
        {activeTab === 'PMU_IOT_SELF_POWERED' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 md:p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-emerald-400" />
                    Mạch Quản Lý Năng Lượng (PMU) & Cảm Biến Không Dây Tự Cấp Nguồn
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Chỉnh lưu Schottky, tích lũy điện tích tụ điện & phát sóng Bluetooth Low Energy (BLE)
                  </p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  pmuSimulation.canPowerIotSensorNode
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {pmuSimulation.canPowerIotSensorNode ? '✓ ĐỦ NĂNG LƯỢNG PHÁT BLE' : 'ĐANG NẠP TÍCH LŨY...'}
                </span>
              </div>

              {/* Sliders for Harvesting Duration & Capacitor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Thời gian thu hồi rung động (t):</span>
                    <span className="font-mono text-emerald-400 font-bold">{chargingDurationSeconds} giây</span>
                  </div>
                  <input
                    type="range"
                    min={5.0}
                    max={60.0}
                    step={5.0}
                    value={chargingDurationSeconds}
                    onChange={e => setChargingDurationSeconds(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Điện dung tụ tích trữ PMU (C):</span>
                    <span className="font-mono text-emerald-400 font-bold">{storageCapacitanceMicroF} µF</span>
                  </div>
                  <input
                    type="range"
                    min={10.0}
                    max={470.0}
                    step={10.0}
                    value={storageCapacitanceMicroF}
                    onChange={e => setStorageCapacitanceMicroF(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Điện Áp Tụ Tích Lũy</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {pmuSimulation.accumulatedVoltageV} <span className="text-xs">V</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Điện áp định mức IoT: 3.3V</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Năng Lượng Tích Trữ (E)</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                    {pmuSimulation.storedEnergyMilliJoules} <span className="text-xs">mJ</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Cần ≥ 1.2 mJ để phát BLE</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Hiệu Suất Chỉnh Lưu</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    {pmuSimulation.rectifierEfficiencyPercent} <span className="text-xs">%</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Cầu 4 Diode Schottky</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Thời Gian Duy Trì Cảm Biến</div>
                  <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                    {pmuSimulation.sensorDischargeDurationMs} <span className="text-xs">ms</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Đủ gửi 1 bản tin truyền tin</div>
                </div>
              </div>

              {/* PMU IoT Circuit Diagram */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Sơ Đồ Mạch Điện Tử Thu Hồi &amp; Cấp Nguồn Cảm Biến (Power Management Unit)
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <svg viewBox="0 0 500 140" className="w-full h-full">
                    {/* AC Nanogenerator Source */}
                    <circle cx="50" cy="70" r="25" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="50" y="67" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">TENG/PENG</text>
                    <text x="50" y="78" fill="#cbd5e1" fontSize="7" textAnchor="middle">Nguồn AC</text>

                    {/* Rectifier Bridge Box */}
                    <path d="M 75,70 L 120,70" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="120" y="45" width="80" height="50" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" rx="4" />
                    <text x="160" y="67" fill="#60a5fa" fontSize="8" textAnchor="middle" fontWeight="bold">Cầu Schottky</text>
                    <text x="160" y="80" fill="#93c5fd" fontSize="7" textAnchor="middle">Chỉnh lưu AC-DC</text>

                    {/* Storage Capacitor */}
                    <path d="M 200,70 L 260,70" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="260" y="45" width="70" height="50" fill="#0f172a" stroke="#10b981" strokeWidth="2" rx="4" />
                    <text x="295" y="67" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="bold">Tụ Lưu Trữ</text>
                    <text x="295" y="80" fill="#a7f3d0" fontSize="7" textAnchor="middle">{storageCapacitanceMicroF} µF</text>

                    {/* DC-DC Buck Regulator */}
                    <path d="M 330,70 L 370,70" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="370" y="45" width="55" height="50" fill="#0f172a" stroke="#a855f7" strokeWidth="2" rx="4" />
                    <text x="397" y="67" fill="#c084fc" fontSize="8" textAnchor="middle" fontWeight="bold">Hạ Áp</text>
                    <text x="397" y="80" fill="#e9d5ff" fontSize="7" textAnchor="middle">3.3V DC</text>

                    {/* Wireless IoT Node */}
                    <path d="M 425,70 L 455,70" stroke="#cbd5e1" strokeWidth="2" />
                    <circle cx="470" cy="70" r="16" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
                    <text x="470" y="73" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">BLE</text>

                    {/* Radio Beams */}
                    {pmuSimulation.canPowerIotSensorNode && (
                      <g stroke="#22c55e" strokeWidth="1.5" fill="none">
                        <path d="M 488,60 Q 498,70 488,80" />
                        <path d="M 494,55 Q 508,70 494,85" />
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
