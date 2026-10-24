// src/components/visualizations/PcrElectrophoresisVisualizer.tsx
// Milestone 49: Polymerase Chain Reaction (PCR), Thermal Cycling & Agarose Gel Electrophoresis Visualizer
// Standards: Nobel Prize in Chemistry 1993 (Kary B. Mullis) & Nobel Prize in Chemistry 1948 (Arne Tiselius)
// Curriculum: Vietnam GDPT 2018 (Sinh học 10 & 12 Chuyên đề: Kỹ thuật PCR; Hóa học 12 Chuyên đề: Cấu trúc Acid Nucleic)

import React, { useState } from 'react';
import {
  PCR_AMPLICON_CATALOG,
  simulatePcrAmplification,
} from '../../domain/pcrElectrophoresisEngine';
import { sound } from '../../audio/soundEngine';
import {
  Dna,
  Zap,
  Activity,
  Layers,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Thermometer,
  Eye,
  Sun,
  Flame,
  Radio
} from 'lucide-react';

export interface PcrElectrophoresisVisualizerProps {
  initialAmpliconId?: string;
}

export const PcrElectrophoresisVisualizer: React.FC<PcrElectrophoresisVisualizerProps> = ({
  initialAmpliconId,
}) => {
  const [selectedAmpliconId, setSelectedAmpliconId] = useState<string>(initialAmpliconId || 'sars_cov2_n_gene');
  const [cycleCount, setCycleCount] = useState<number>(30);
  const [annealingTemp, setAnnealingTemp] = useState<number>(55.0);
  const [mgConcentration, setMgConcentration] = useState<number>(2.0);
  const [currentPhase, setCurrentPhase] = useState<'DENATURATION' | 'ANNEALING' | 'EXTENSION'>('EXTENSION');
  const [uvLightOn, setUvLightOn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'thermal_cycling' | 'exponential_amplification' | 'agarose_gel_electrophoresis' | 'dna_chemistry_gdpt'>('agarose_gel_electrophoresis');

  const simResult = simulatePcrAmplification(
    selectedAmpliconId,
    cycleCount,
    100, // 100 initial copies
    annealingTemp,
    mgConcentration,
    currentPhase
  );

  const handleAmpliconChange = (id: string) => {
    setSelectedAmpliconId(id);
    const target = PCR_AMPLICON_CATALOG[id];
    setAnnealingTemp(target.optimalAnnealingTempCelsius);
    sound.playPcrThermalStepChime();
  };

  const handlePhaseChange = (phase: 'DENATURATION' | 'ANNEALING' | 'EXTENSION') => {
    setCurrentPhase(phase);
    sound.playPcrThermalStepChime();
  };

  const handleUvToggle = () => {
    const newState = !uvLightOn;
    setUvLightOn(newState);
    if (newState) {
      sound.playUvGelFluorescenceHum();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-fuchsia-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & GDPT 2018 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40">
              <Dna className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Nhân Bản Gen PCR & Điện Di Gel Agarose
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-mono">
                Nobel Hóa Học 1993 • Sinh & Hóa 12 GDPT
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Chu trình luân nhiệt 3 bước (95°C → 55°C → 72°C), Khuếch đại hàm mũ 2ⁿ, Giá trị ngưỡng Ct & Vạch huỳnh quang điện di DNA.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-fuchsia-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
          <span className="text-xs font-semibold text-fuchsia-300 uppercase tracking-wider font-mono">
            Pha: {currentPhase === 'DENATURATION' ? 'Biến Tính (95°C)' : currentPhase === 'ANNEALING' ? `Bắt Cặp (${annealingTemp}°C)` : 'Kéo Dài (72°C)'}
          </span>
        </div>
      </div>

      {/* 2. Amplicon Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(PCR_AMPLICON_CATALOG).map((amp) => {
          const isSelected = amp.id === selectedAmpliconId;
          return (
            <button
              key={amp.id}
              onClick={() => handleAmpliconChange(amp.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-fuchsia-500/20 border-fuchsia-400 shadow-md shadow-fuchsia-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-fuchsia-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-fuchsia-300">
                  {amp.ampliconLengthBp} bp
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{amp.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{amp.targetGene}</span>
                <span className="text-fuchsia-300 font-bold">Tm: {amp.forwardPrimerTmCelsius.toFixed(0)}°C</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-fuchsia-500/20 text-fuchsia-400">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Bản Sao DNA Hiện Tại</p>
            <p className="text-base sm:text-lg font-bold font-mono text-fuchsia-300">
              {simResult.currentCopiesTotal.toExponential(2)}
            </p>
            <p className="text-[10px] text-ivory-muted">N₀: {simResult.initialCopyNumberN0} phân tử ban đầu</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Độ Khuếch Đại (Fold)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-emerald-300">
              {simResult.amplificationFold >= 1e6 ? `${(simResult.amplificationFold / 1e6).toFixed(1)} Triệu Lần` : `${simResult.amplificationFold.toLocaleString()} Lần`}
            </p>
            <p className="text-[10px] text-ivory-muted">Chu kỳ: {simResult.cycleCount} / 40</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Chu Kỳ Ngưỡng (Ct)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              {simResult.cycleThresholdCt !== null ? `Ct = ${simResult.cycleThresholdCt}` : 'Chưa đạt'}
            </p>
            <p className="text-[10px] text-ivory-muted">Ngưỡng huỳnh quang: 10⁸ copies</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Hiệu Suất Phản Ứng (E)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-amber-300">
              {(simResult.reactionEfficiencyE * 100).toFixed(1)}%
            </p>
            <p className="text-[10px] text-ivory-muted">Mg²⁺: {simResult.mgConcentrationMm} mM</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('agarose_gel_electrophoresis')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'agarose_gel_electrophoresis'
              ? 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Bản Gel Điện Di & Soi Đèn UV Huỳnh Quang
        </button>

        <button
          onClick={() => setActiveTab('thermal_cycling')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'thermal_cycling'
              ? 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" />
          Chu Trình Luân Nhiệt 3 Bước & Taq Polymerase
        </button>

        <button
          onClick={() => setActiveTab('exponential_amplification')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'exponential_amplification'
              ? 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Đường Cong Tăng Trưởng Hàm Mũ qPCR & Điểm Ct
        </button>

        <button
          onClick={() => setActiveTab('dna_chemistry_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'dna_chemistry_gdpt'
              ? 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Hóa Học Nucleic Acid & Giải Nobel 1993
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'agarose_gel_electrophoresis' && (
            <div className="bg-navy-dark/80 border border-fuchsia-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-fuchsia-400" />
                    Buồng Điện Di Gel Agarose 1.5% (TBE Buffer pH 8.3)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Phân tách kích thước DNA theo điện trường: Cực âm (-) phía giếng giỏ đến Cực dương (+) phía đáy.
                  </p>
                </div>

                {/* UV Light Toggle Button */}
                <button
                  onClick={handleUvToggle}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                    uvLightOn
                      ? 'bg-purple-600/40 border-purple-400 text-purple-200 shadow-lg shadow-purple-500/30'
                      : 'bg-black/40 border-navy-light text-ivory-muted'
                  }`}
                >
                  <Sun className={`w-3.5 h-3.5 ${uvLightOn ? 'text-amber-300 animate-spin' : ''}`} />
                  Đèn Soi UV 302nm: {uvLightOn ? 'BẬT' : 'TẮT'}
                </button>
              </div>

              {/* Dark Chamber Gel Visualizer */}
              <div
                className={`w-full h-80 rounded-xl border relative p-4 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  uvLightOn
                    ? 'bg-slate-950 border-purple-500/60 shadow-2xl shadow-purple-900/40'
                    : 'bg-black/90 border-navy-light/30'
                }`}
              >
                {/* Gel Electrode Indicators */}
                <div className="flex justify-between items-center text-[11px] font-mono border-b border-navy-light/20 pb-1">
                  <span className="text-rose-400 font-bold">CỰC ÂM CATHODE (-) [Giếng nạp mẫu]</span>
                  <span className="text-purple-300 font-semibold">Điện áp: 100V • 45 phút</span>
                  <span className="text-blue-400 font-bold">CỰC DƯƠNG ANODE (+) [Đáy gel]</span>
                </div>

                {/* 4 Lanes */}
                <div className="grid grid-cols-4 gap-4 h-64 pt-2 relative">
                  {simResult.gelLanes.map((lane) => (
                    <div
                      key={lane.laneIndex}
                      className="bg-navy-dark/40 border border-navy-light/20 rounded-lg p-2 flex flex-col justify-between relative"
                    >
                      {/* Loading Well */}
                      <div className="w-full h-3 bg-black/80 border border-navy-light/50 rounded-sm mb-2 relative"></div>

                      {/* Gel Migration Area */}
                      <div className="relative flex-1 w-full">
                        {uvLightOn &&
                          lane.bands.map((band, bIdx) => (
                            <div
                              key={bIdx}
                              className="absolute left-1 right-1 h-1.5 rounded-full shadow-lg transition-all"
                              style={{
                                top: `${band.migrationPercent}%`,
                                backgroundColor: lane.isLadder ? '#38bdf8' : '#ec4899',
                                opacity: Math.max(0.2, band.relativeIntensity),
                                boxShadow: lane.isLadder
                                  ? '0 0 8px rgba(56, 189, 248, 0.8)'
                                  : '0 0 10px rgba(236, 72, 153, 0.9)',
                              }}
                            >
                              {lane.isLadder && [1000, 500, 100].includes(band.sizeBp) && (
                                <span className="absolute -left-1 text-[8px] font-mono text-sky-300 -top-3">
                                  {band.sizeBp}bp
                                </span>
                              )}
                              {!lane.isLadder && (
                                <span className="absolute right-0 text-[8px] font-mono text-pink-300 -top-3 font-bold">
                                  {band.sizeBp}bp
                                </span>
                              )}
                            </div>
                          ))}
                      </div>

                      {/* Lane Label */}
                      <div className="text-[10px] text-center font-mono text-ivory-muted truncate pt-1 border-t border-navy-light/20">
                        {lane.labelVI.split('(')[0]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-ivory-muted">
                  <span>GelRed™ / EtBr bắt cặp xen kẽ rãnh đôi DNA phát huỳnh quang cam-hồng</span>
                  <span>Đoạn ngắn (72bp) chạy nhanh hơn đoạn dài (2000bp)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'thermal_cycling' && (
            <div className="bg-navy-dark/80 border border-fuchsia-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-fuchsia-400" />
                    Chu Trình Luân Nhiệt 3 Bước & Enzyme Taq Polymerase
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Mô phỏng máy luân nhiệt (Thermal Cycler) điều khiển khối Peltier chính xác đến 0.1°C.
                  </p>
                </div>
              </div>

              {/* 3 Steps Visual Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Step 1: Denaturation */}
                <button
                  onClick={() => handlePhaseChange('DENATURATION')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentPhase === 'DENATURATION'
                      ? 'bg-rose-500/20 border-rose-400 shadow-md shadow-rose-500/20'
                      : 'bg-navy-dark/40 border-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400">1. Biến Tính (95°C)</span>
                    <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-2">
                    Nhiệt độ cao bẻ gãy các liên kết hydro giữa hai mạch đơn DNA, tách rời chuỗi xoắn kép.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-rose-300">Thời gian: 30 giây</div>
                </button>

                {/* Step 2: Annealing */}
                <button
                  onClick={() => handlePhaseChange('ANNEALING')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentPhase === 'ANNEALING'
                      ? 'bg-sky-500/20 border-sky-400 shadow-md shadow-sky-500/20'
                      : 'bg-navy-dark/40 border-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">2. Bắt Cặp ({annealingTemp}°C)</span>
                    <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-2">
                    Hai mồi (Forward & Reverse Primer) bắt cặp đặc hiệu vào hai đầu trình tự mục tiêu theo nguyên tắc bổ sung.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-sky-300">Thời gian: 30 giây</div>
                </button>

                {/* Step 3: Extension */}
                <button
                  onClick={() => handlePhaseChange('EXTENSION')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentPhase === 'EXTENSION'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-navy-dark/40 border-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">3. Kéo Dài (72°C)</span>
                    <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-ivory-muted mt-2">
                    Taq Polymerase tổng hợp sợi mới từ đầu 3'-OH bằng cách lắp ráp dNTP tự do theo chiều 5' → 3'.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-emerald-300">Tốc độ: 1000 bp/phút</div>
                </button>
              </div>

              {/* Primer Information Card */}
              <div className="p-3 rounded-xl bg-black/40 border border-navy-light/20 text-xs space-y-1.5 font-mono">
                <div className="text-fuchsia-300 font-bold">Trình tự Primer Đặc Hiệu:</div>
                <div className="text-ivory-muted">
                  Forward: <span className="text-white font-bold">{simResult.amplicon.forwardPrimerSequence}</span> (Tm = {simResult.amplicon.forwardPrimerTmCelsius}°C)
                </div>
                <div className="text-ivory-muted">
                  Reverse: <span className="text-white font-bold">{simResult.amplicon.reversePrimerSequence}</span> (Tm = {simResult.amplicon.reversePrimerTmCelsius}°C)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exponential_amplification' && (
            <div className="bg-navy-dark/80 border border-fuchsia-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                    Đường Cong Khuếch Đại Hàm Mũ qPCR & Điểm Ngưỡng Ct
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Công thức N_n = N₀(1 + E)ⁿ chuyển sang pha bão hòa khi enzyme bị cạn kiệt dNTP.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-fuchsia-300">
                  {simResult.isPlateauReached ? 'Pha Bão Hòa (Plateau)' : 'Pha Tăng Trưởng Hàm Mũ'}
                </span>
              </div>

              {/* SVG Chart */}
              <div className="w-full h-64 sm:h-72 bg-black/40 rounded-xl border border-navy-light/20 relative p-2 flex items-center justify-center">
                <svg viewBox="0 0 540 260" className="w-full h-full">
                  <defs>
                    <linearGradient id="pcrGrowthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="50" y1={30 + y} x2="490" y2={30 + y} stroke="#1e293b" strokeDasharray="3 3" />
                  ))}
                  {[0, 110, 220, 330, 440].map((x) => (
                    <line key={x} x1={50 + x} y1="30" x2={50 + x} y2="230" stroke="#1e293b" strokeDasharray="3 3" />
                  ))}

                  {/* Threshold Line at 10^8 copies (y = 230 - (8 / 12) * 200 = 96.7) */}
                  <line x1="50" y1="97" x2="490" y2="97" stroke="#38bdf8" strokeDasharray="4 2" strokeWidth="1.5" />
                  <text x="495" y="100" fill="#38bdf8" fontSize="9" fontFamily="monospace">Ct Ngưỡng (10⁸)</text>

                  {/* Axes */}
                  <line x1="50" y1="230" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="1.5" />

                  {/* X Axis Labels (Cycles: 0 to 40) */}
                  <text x="50" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace">0</text>
                  <text x="270" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">20 Chu kỳ</text>
                  <text x="490" y="246" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">40</text>

                  {/* Y Axis Labels (log10 copies: 0 to 12) */}
                  <text x="42" y="35" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="end">10¹²</text>
                  <text x="42" y="130" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="end">10⁶</text>
                  <text x="42" y="230" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="end">10⁰</text>

                  {/* Growth Curve */}
                  {simResult.growthCurve.length > 1 && (() => {
                    const points = simResult.growthCurve.map((pt) => {
                      const x = 50 + (pt.cycle / 40.0) * 440;
                      const y = 230 - (pt.log10Copies / 12.0) * 200;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <polyline
                        points={points.join(' ')}
                        fill="none"
                        stroke="url(#pcrGrowthGrad)"
                        strokeWidth="3"
                      />
                    );
                  })()}

                  {/* Current Operating Point */}
                  {(() => {
                    const currentX = 50 + (simResult.cycleCount / 40.0) * 440;
                    const logVal = Math.log10(Math.max(1, simResult.currentCopiesTotal));
                    const currentY = 230 - (logVal / 12.0) * 200;

                    return (
                      <circle cx={currentX} cy={currentY} r="6" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                    );
                  })()}
                </svg>
              </div>
            </div>
          )}

          {activeTab === 'dna_chemistry_gdpt' && (
            <div className="bg-navy-dark/80 border border-fuchsia-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Cấu Trúc Hóa Học Acid Nucleic & Giải Nobel Hóa Học 1993
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Kary Mullis phát minh kỹ thuật PCR năm 1983 nhờ thấu hiểu bản chất liên kết hydro giữa các base nitơ.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-sky-300">1. Khung Xương Đường - Photphat (Phosphodiester Backbone)</h4>
                  <p className="text-ivory-muted mt-1">
                    Mỗi nucleotide liên kết qua cầu nối este photphat mang điện tích âm (-PO₄⁻) ở pH sinh lý, giải thích vì sao mọi phân tử DNA đều di chuyển về phía cực dương (+) trong điện di.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-fuchsia-300">2. Cặp Base Bổ Sung & Nhiệt Độ Nóng Chảy (Tm)</h4>
                  <p className="text-ivory-muted mt-1">
                    Cặp Adenine - Thymine (A=T) liên kết bằng 2 liên kết hydro; Cặp Guanine - Cytosine (G≡C) liên kết bằng 3 liên kết hydro. Do đó đoạn mồi giàu G-C có Tm cao hơn và bền nhiệt hơn.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-emerald-300">3. Đột Phá Enzyme Chịu Nhiệt Taq Polymerase</h4>
                  <p className="text-ivory-muted mt-1">
                    Phân lập từ vi khuẩn suối nước nóng *Thermus aquaticus* tại vườn quốc gia Yellowstone, chịu được 95°C mà không bị biến tính, giúp tự động hóa hoàn toàn phản ứng PCR trong phòng thí nghiệm.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-fuchsia-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-fuchsia-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Chẩn Đoán Sinh Học Phân Tử:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-fuchsia-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-fuchsia-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Điều Khiển Máy Luân Nhiệt</h3>
            </div>

            {/* Slider 1: Cycle Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Số chu kỳ PCR:</span>
                <span className="font-mono text-fuchsia-300 font-bold">{cycleCount} Chu kỳ</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={cycleCount}
                onChange={(e) => setCycleCount(Number(e.target.value))}
                className="w-full accent-fuchsia-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>1</span>
                <span>20 (Bắt đầu thấy vạch)</span>
                <span>40 (Bão hòa)</span>
              </div>
            </div>

            {/* Slider 2: Annealing Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Nhiệt độ bắt cặp (Annealing):</span>
                <span className="font-mono text-sky-300 font-bold">{annealingTemp} °C</span>
              </div>
              <input
                type="range"
                min="48"
                max="65"
                step="0.5"
                value={annealingTemp}
                onChange={(e) => setAnnealingTemp(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>48°C (Không đặc hiệu)</span>
                <span>{simResult.amplicon.optimalAnnealingTempCelsius}°C (Chuẩn)</span>
                <span>65°C (Khó bắt cặp)</span>
              </div>
            </div>

            {/* Slider 3: Mg2+ Concentration */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Nồng độ cofactor Mg²⁺:</span>
                <span className="font-mono text-amber-300 font-bold">{mgConcentration} mM</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={mgConcentration}
                onChange={(e) => setMgConcentration(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.5 mM (Quá yếu)</span>
                <span>2.0 mM (Tối ưu)</span>
                <span>4.0 mM (Mồi giả)</span>
              </div>
            </div>

            {/* Amplicon Detailed Info Box */}
            <div className="space-y-2 pt-2 border-t border-navy-light/30">
              <h4 className="text-[11px] font-bold text-fuchsia-300 uppercase tracking-wider">Thông Tin Đoạn Khuếch Đại</h4>
              <div className="text-[11px] space-y-1.5 font-mono text-ivory-muted bg-black/30 p-3 rounded-xl border border-navy-light/20">
                <div className="flex justify-between">
                  <span>Kích thước sản phẩm:</span>
                  <span className="text-white font-bold">{simResult.amplicon.ampliconLengthBp} bp</span>
                </div>
                <div className="flex justify-between">
                  <span>Sinh vật đích:</span>
                  <span className="text-white font-bold">{simResult.amplicon.organismVI.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vị trí trên gel:</span>
                  <span className="text-fuchsia-300 font-bold">{simResult.amplicon.expectedBandPositionPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ý nghĩa chẩn đoán:</span>
                  <span className="text-emerald-300 font-bold">RT-qPCR Y tế</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
