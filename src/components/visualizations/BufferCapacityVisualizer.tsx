// src/components/visualizations/BufferCapacityVisualizer.tsx
// Interactive Buffer Solution, Henderson-Hasselbalch Equation & Van Slyke Capacity Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 11 (Cân bằng ion trong dung dịch nước) & IUPAC Guidelines

import React, { useState, useMemo } from 'react';
import {
  Shield,
  Zap,
  RotateCcw,
  BookOpen,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplet
} from 'lucide-react';
import {
  BUFFER_SYSTEMS_CATALOG,
  BufferSystemDef,
  calculateBufferState,
  simulateBufferPerturbation,
  BufferPerturbationResult
} from '../../domain/bufferCapacityEngine';
import { sound } from '../../audio/soundEngine';

export interface BufferCapacityVisualizerProps {
  initialSystemId?: string;
  className?: string;
}

export const BufferCapacityVisualizer: React.FC<BufferCapacityVisualizerProps> = ({
  initialSystemId = 'acetate_buffer',
  className = ''
}) => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>(initialSystemId);
  const [acidConcM, setAcidConcM] = useState<number>(0.2);
  const [baseConcM, setBaseConcM] = useState<number>(0.2);
  const [volumeLiters, setVolumeLiters] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'PEDAGOGY' | 'TACTICAL'>('SIMULATION');

  // Perturbation state
  const [perturbation, setPerturbation] = useState<{
    type: 'STRONG_ACID' | 'STRONG_BASE';
    moles: number;
  } | null>(null);

  const currentSystem = useMemo<BufferSystemDef>(() => {
    return BUFFER_SYSTEMS_CATALOG.find(s => s.id === selectedSystemId) || BUFFER_SYSTEMS_CATALOG[0];
  }, [selectedSystemId]);

  const baseBufferState = useMemo(() => {
    return calculateBufferState({
      systemId: selectedSystemId,
      acidConcM,
      baseConcM,
      volumeLiters
    });
  }, [selectedSystemId, acidConcM, baseConcM, volumeLiters]);

  const perturbationResult = useMemo<BufferPerturbationResult | null>(() => {
    if (!perturbation) return null;
    return simulateBufferPerturbation({
      systemId: selectedSystemId,
      acidConcM,
      baseConcM,
      volumeLiters,
      perturbType: perturbation.type,
      addedMoles: perturbation.moles
    });
  }, [selectedSystemId, acidConcM, baseConcM, volumeLiters, perturbation]);

  const displayedPH = perturbationResult ? perturbationResult.finalPH : baseBufferState.pH;
  const isBreached = perturbationResult?.isBufferBreached ?? false;

  const handleSelectSystem = (sysId: string) => {
    setSelectedSystemId(sysId);
    setPerturbation(null);
    sound.playUiClick();
  };

  const handleAddPerturbation = (type: 'STRONG_ACID' | 'STRONG_BASE', deltaMoles: number) => {
    const currentMoles = perturbation && perturbation.type === type ? perturbation.moles : 0;
    const nextMoles = Math.round((currentMoles + deltaMoles) * 1000) / 1000;
    setPerturbation({ type, moles: nextMoles });
    sound.playVolumetricPouring('aqueous');
    if (type === 'STRONG_ACID') {
      sound.playAcidRainHiss();
    } else {
      sound.playEffervescence('gentle');
    }
  };

  const handleResetPerturbation = () => {
    setPerturbation(null);
    sound.playUiClick();
  };

  const handleResetAll = () => {
    setAcidConcM(0.2);
    setBaseConcM(0.2);
    setVolumeLiters(1.0);
    setPerturbation(null);
    sound.playUiClick();
  };

  // Color gradient interpolation based on pH (0: deep red, 7: cyan/emerald, 14: deep violet)
  const getPHColor = (ph: number) => {
    if (ph < 3) return '#EF4444'; // Red
    if (ph < 6) return '#F59E0B'; // Amber
    if (ph < 8) return '#10B981'; // Emerald
    if (ph < 11) return '#06B6D4'; // Cyan
    return '#8B5CF6'; // Purple
  };

  return (
    <div
      className={`bg-gradient-to-b from-navy to-obsidian border border-navy-light/80 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory space-y-6 ${className}`}
      role="region"
      aria-label="Mô phỏng Dung dịch Đệm và Phương trình Henderson-Hasselbalch"
    >
      {/* ========================================================================= */}
      {/* 1. HEADER & SYSTEM SELECTOR                                               */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-inner">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wide">
                HỆ ĐỆM &amp; PHƯƠNG TRÌNH HENDERSON-HASSELBALCH
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                GDPT 2018 LỚP 11
              </span>
            </div>
            <p className="text-xs text-ivory-muted font-mono mt-0.5">
              Sức đệm Van Slyke β, cơ chế chống sốc pH &amp; ứng dụng sinh hóa / y học
            </p>
          </div>
        </div>

        {/* Global Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-light/50 hover:bg-navy-light text-xs font-mono text-ivory hover:text-white transition-all border border-navy-light"
            title="Khôi phục trạng thái chuẩn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>
        </div>
      </div>

      {/* Preset System Switcher Buttons */}
      <div className="flex flex-wrap gap-2">
        {BUFFER_SYSTEMS_CATALOG.map(sys => {
          const isSelected = sys.id === selectedSystemId;
          return (
            <button
              key={sys.id}
              onClick={() => handleSelectSystem(sys.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border flex items-center gap-2 ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : 'bg-navy-light/30 border-navy-light hover:bg-navy-light/60 text-ivory-muted hover:text-ivory'
              }`}
            >
              <span className="font-bold">{sys.weakAcidFormula} / {sys.conjugateBaseFormula}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-ivory-muted">
                pKa {sys.pKa}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB CONTROLS                                                           */}
      {/* ========================================================================= */}
      <div className="flex border-b border-navy-light/60">
        {[
          { id: 'SIMULATION', label: 'Mô Phỏng Trực Quan', icon: Sliders },
          { id: 'PEDAGOGY', label: 'Sư Phạm Hóa Học', icon: BookOpen },
          { id: 'TACTICAL', label: 'Hiệu Ứng Game RPG', icon: Zap }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playUiClick();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold transition-all border-b-2 ${
                isActive
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                  : 'border-transparent text-ivory-muted hover:text-ivory hover:bg-navy-light/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN SIMULATION VIEW                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Sliders & Concentration Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-navy-dark/40 border border-navy-light/60 rounded-xl p-4">
            <h3 className="text-xs font-mono font-bold text-ivory tracking-wider uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Thiết Lập Thông Số Nồng Độ</span>
            </h3>

            {/* Acid Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Nồng độ axit [{currentSystem.weakAcidFormula}]:</span>
                <span className="text-emerald-400 font-bold">{acidConcM.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.00"
                step="0.01"
                value={acidConcM}
                onChange={e => setAcidConcM(parseFloat(e.target.value))}
                className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Conjugate Base Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Nồng độ bazơ [{currentSystem.conjugateBaseFormula}]:</span>
                <span className="text-cyan-ion font-bold">{baseConcM.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.00"
                step="0.01"
                value={baseConcM}
                onChange={e => setBaseConcM(parseFloat(e.target.value))}
                className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-ion"
              />
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Thể tích dung dịch đệm (V):</span>
                <span className="text-amber-gold font-bold">{volumeLiters.toFixed(1)} L</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={volumeLiters}
                onChange={e => setVolumeLiters(parseFloat(e.target.value))}
                className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-gold"
              />
            </div>

            {/* Stress Testing Section (Perturbation) */}
            <div className="border-t border-navy-light/60 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-ivory flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-gold" />
                  <span>Thử Thách Chống Sốc (Nhiễm Toan/Kiềm)</span>
                </h4>
                {perturbation && (
                  <button
                    onClick={handleResetPerturbation}
                    className="text-[10px] text-ivory-muted hover:text-white underline font-mono"
                  >
                    Xóa sốc
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddPerturbation('STRONG_ACID', 0.02)}
                  className="px-2.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  <span>+0.02 mol H⁺</span>
                </button>
                <button
                  onClick={() => handleAddPerturbation('STRONG_BASE', 0.02)}
                  className="px-2.5 py-2 rounded-lg bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <Droplet className="w-3.5 h-3.5 text-blue-400" />
                  <span>+0.02 mol OH⁻</span>
                </button>
              </div>

              {perturbation && perturbationResult && (
                <div className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 ${
                  isBreached
                    ? 'bg-red-950/60 border-red-500/80 text-red-100 animate-pulse'
                    : 'bg-navy-light/40 border-navy-light text-ivory'
                }`}>
                  <div className="flex justify-between font-bold">
                    <span>Đã thêm:</span>
                    <span>{perturbation.moles} mol {perturbation.type === 'STRONG_ACID' ? 'H⁺' : 'OH⁻'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dung lượng đã dùng:</span>
                    <span className={perturbationResult.capacityUtilizationPct > 80 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                      {perturbationResult.capacityUtilizationPct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Độ lệch pH (ΔpH):</span>
                    <span className="font-bold">
                      {perturbationResult.deltaPH > 0 ? `+${perturbationResult.deltaPH}` : perturbationResult.deltaPH}
                    </span>
                  </div>
                  {isBreached && (
                    <div className="text-[11px] text-red-300 font-sans mt-1">
                      ⚠️ {perturbationResult.breachReasonVI}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual pH Gauge & Buffer Capacity Readout (7 cols) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            {/* pH Meter Dial Box */}
            <div className="bg-navy-dark/60 border border-navy-light/80 rounded-xl p-6 text-center space-y-4 shadow-inner">
              <div className="flex justify-between items-center text-xs font-mono text-ivory-muted">
                <span>DUNG DỊCH ĐỆM HÓA HỌC</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  {currentSystem.nameEn}
                </span>
              </div>

              {/* Large pH Display */}
              <div className="py-2">
                <div
                  className="text-5xl sm:text-6xl font-black font-mono tracking-tight transition-all"
                  style={{ color: getPHColor(displayedPH) }}
                >
                  {displayedPH.toFixed(2)}
                </div>
                <div className="text-xs font-mono text-ivory-muted mt-1">
                  Giá trị pH cân bằng (pOH: {(14.0 - displayedPH).toFixed(2)})
                </div>
              </div>

              {/* pH Color Spectrum Bar */}
              <div className="space-y-1.5">
                <div className="relative h-4 rounded-full bg-gradient-to-r from-red-600 via-emerald-500 to-purple-600 overflow-hidden shadow-inner">
                  {/* Indicator Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg transition-all border border-black/40"
                    style={{ left: `calc(${Math.min(100, Math.max(0, (displayedPH / 14) * 100))}% - 4px)` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
                  <span>0 (Axit cực mạnh)</span>
                  <span>7 (Trung tính)</span>
                  <span>14 (Kiềm cực mạnh)</span>
                </div>
              </div>

              {/* Optimal Range Status Pill */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {baseBufferState.isOptimalRange && !isBreached ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Trong khoảng đệm hiệu nghiệm [{currentSystem.optimalPHRange[0]} - {currentSystem.optimalPHRange[1]}]
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono border border-amber-500/40">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {isBreached ? 'ĐỆM ĐÃ VỠ (Bị quá tải H⁺/OH⁻)' : 'Ngoài khoảng đệm tối ưu'}
                  </span>
                )}
              </div>
            </div>

            {/* Van Slyke Buffer Capacity β Card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-navy-light/20 border border-navy-light/50 space-y-1">
                <div className="text-[11px] font-mono text-ivory-muted">Sức đệm Van Slyke (β):</div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  {baseBufferState.vanSlykeBufferCapacityBeta.toFixed(4)}
                </div>
                <div className="text-[10px] text-ivory-muted">mol / (L · đơn vị pH)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-light/20 border border-navy-light/50 space-y-1">
                <div className="text-[11px] font-mono text-ivory-muted">Tỉ lệ [Bazơ] / [Axit]:</div>
                <div className="text-xl font-bold font-mono text-cyan-ion">
                  {baseBufferState.ratioBaseToAcid.toFixed(3)}
                </div>
                <div className="text-[10px] text-ivory-muted">
                  {baseBufferState.ratioBaseToAcid === 1.0 ? 'Cân bằng lý tưởng (pH = pKa)' : 'Lệch tỷ lệ'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PEDAGOGICAL BREAKDOWN (GDPT 2018)                                      */}
      {/* ========================================================================= */}
      {activeTab === 'PEDAGOGY' && (
        <div className="space-y-4 bg-navy-dark/40 border border-navy-light/60 rounded-xl p-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 font-mono">
            <BookOpen className="w-4 h-4" />
            <span>Quy Trình Tính Toán Sư Phạm GDPT 2018 Hóa Học 11</span>
          </div>

          <div className="space-y-2 text-xs font-mono text-ivory-muted">
            {(perturbationResult ? perturbationResult.stepByStepExplanationVI : baseBufferState.stepByStepExplanationVI).map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-navy/60 border border-navy-light/40 text-ivory leading-relaxed">
                {step}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
              <Info className="w-3.5 h-3.5" />
              <span>Bối Cảnh Ứng Dụng Thực Tiễn:</span>
            </div>
            <p className="text-ivory-muted leading-relaxed font-sans">
              {currentSystem.biologicalOrIndustrialContextVI}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TACTICAL RPG GAMEPLAY SYNERGY                                         */}
      {/* ========================================================================= */}
      {activeTab === 'TACTICAL' && (
        <div className="space-y-4 bg-navy-dark/40 border border-navy-light/60 rounded-xl p-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-gold font-mono">
            <Zap className="w-4 h-4" />
            <span>Hiệu Ứng Kháng Sốc Đệm Trong Trận Chiến TCG / MOBA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/70 border border-amber-gold/30 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-gold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Lớp Giáp Đệm Hóa Học (Chemical Buffer Ward):</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {perturbationResult ? perturbationResult.gameplayModifier.elementalWardPct : 40}%
              </div>
              <p className="text-xs text-ivory-muted font-sans leading-relaxed">
                {perturbationResult
                  ? perturbationResult.gameplayModifier.descriptionVI
                  : 'Hấp thụ sát thương ăn mòn từ nguyên tố Axit và Bazơ của đối thủ, bảo vệ nội năng.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy/70 border border-cyan-ion/30 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-ion flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-ion" />
                <span>Kỹ Năng Nội Tại Của Hệ Đệm:</span>
              </div>
              <div className="text-sm font-bold text-ivory font-mono">
                {currentSystem.nameVi}
              </div>
              <p className="text-xs text-ivory-muted font-sans leading-relaxed">
                {currentSystem.tacticalSynergyVI}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
