// src/components/visualizations/RedoxReactionsVisualizer.tsx
// Interactive Redox Reactions, Oxidation State Determination & Permanganate Titration Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 10 (Chủ đề 4: Phản ứng oxi hóa - khử) & IUPAC Standards

import React, { useState } from 'react';
import {
  OXIDATION_STATE_CATALOG,
  REDOX_PRESETS,
  PERMANGANATE_MEDIA,
  simulatePermanganateTitration,
  verifyElectronBalance,
  RedoxMedium
} from '../../domain/redoxReactionsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  Zap,
  FlaskConical,
  Activity,
  Layers,
  Info,
  CheckCircle2,
  Droplets,
  RotateCcw,
  Scale
} from 'lucide-react';

export type RedoxVisualizerMode = 'OXIDATION_STATES' | 'ELECTRON_BALANCE' | 'PERMANGANATE_MEDIA_TITRATION';

export const RedoxReactionsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<RedoxVisualizerMode>('OXIDATION_STATES');

  // Mode 1 state: selected compound for oxidation states
  const [selectedCompoundFormula, setSelectedCompoundFormula] = useState<string>('KMnO4');

  // Mode 2 state: selected reaction preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ZN_HCL_INTERMOLECULAR');

  // Mode 3 state: selected permanganate medium & titration slider
  const [selectedMedium, setSelectedMedium] = useState<RedoxMedium>('ACIDIC');
  const [vTitrantAdded, setVTitrantAdded] = useState<number>(0.0);

  const selectedCompound = OXIDATION_STATE_CATALOG.find(c => c.formula === selectedCompoundFormula) || OXIDATION_STATE_CATALOG[0];
  const selectedPreset = REDOX_PRESETS.find(p => p.id === selectedPresetId) || REDOX_PRESETS[0];
  const selectedMediumData = PERMANGANATE_MEDIA.find(m => m.medium === selectedMedium) || PERMANGANATE_MEDIA[0];
  const balanceResult = verifyElectronBalance(selectedPreset);
  const titrationState = simulatePermanganateTitration(0.10, 20.0, 0.02, vTitrantAdded);

  return (
    <div className="bg-obsidian-surface border border-amber-500/30 rounded-2xl p-6 text-ivory shadow-2xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              GDPT 2018 Hóa Học 10 • Chủ Đề 4
            </span>
            <span className="text-xs text-ivory-muted">IUPAC Oxidation Numbers & Electron Balance</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-500 mt-1">
            Phản Ứng Oxi Hóa - Khử & Thăng Bằng Electron
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Xác định số oxi hóa, quy tắc thăng bằng electron, 4 dạng phản ứng và chuẩn độ Permanganate đa môi trường
          </p>
        </div>

        {/* MODE NAVIGATION TABS */}
        <div className="flex items-center bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('OXIDATION_STATES');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'OXIDATION_STATES'
                ? 'bg-amber-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Số Oxi Hóa</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ELECTRON_BALANCE');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'ELECTRON_BALANCE'
                ? 'bg-amber-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2. Thăng Bằng e</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PERMANGANATE_MEDIA_TITRATION');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'PERMANGANATE_MEDIA_TITRATION'
                ? 'bg-amber-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>3. Môi Trường & Chuẩn Độ</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: OXIDATION STATE DETERMINATION & CATALOG                          */}
      {/* ========================================================================= */}
      {activeMode === 'OXIDATION_STATES' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Substance selector carousel */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn hợp chất hoặc ion đa nguyên tử tiêu biểu:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {OXIDATION_STATE_CATALOG.map(compound => (
                <button
                  key={compound.formula}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedCompoundFormula(compound.formula);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedCompoundFormula === compound.formula
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold shadow-lg shadow-amber-500/10 scale-105'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-sm font-mono font-bold">{compound.formula}</div>
                  <div className="text-[10px] text-ivory-muted truncate mt-0.5">{compound.nameVi.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Inspection Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Formula with States Banner */}
            <div className="lg:col-span-1 bg-obsidian-deep/90 rounded-xl border border-white/10 p-5 flex flex-col justify-between items-center text-center">
              <div className="w-full">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Cấu trúc số oxi hóa
                </span>
                <h3 className="text-lg font-bold text-ivory">{selectedCompound.nameVi}</h3>
                <p className="text-xs text-ivory-muted italic mt-0.5">{selectedCompound.nameEn}</p>
              </div>

              {/* Big Formula Display with Overset Numbers */}
              <div className="my-8 flex items-end justify-center gap-3 bg-obsidian-surface/60 px-6 py-5 rounded-2xl border border-amber-500/30">
                {selectedCompound.elements.map((el, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span
                      className={`text-sm font-black font-mono px-1.5 py-0.5 rounded ${
                        el.oxidationState > 0
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : el.oxidationState < 0
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}
                    >
                      {el.oxidationState > 0 ? `+${el.oxidationState}` : el.oxidationState}
                    </span>
                    <span className="text-3xl font-black font-mono mt-1 text-ivory">
                      {el.symbol}
                      {el.count > 1 && <sub className="text-lg text-amber-400">{el.count}</sub>}
                    </span>
                  </div>
                ))}
                {selectedCompound.isIon && (
                  <sup className="text-sm font-black text-amber-300 font-mono self-start mt-2">
                    {selectedCompound.charge! > 0 ? `+${selectedCompound.charge}` : `${selectedCompound.charge}`}
                  </sup>
                )}
              </div>

              {/* Notes */}
              <div className="w-full text-left bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedCompound.notesVi}</span>
              </div>
            </div>

            {/* Element Rules & Explanations Breakdown */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                Giải thích chi tiết quy tắc số oxi hóa (GDPT 2018):
              </h4>
              <div className="space-y-3">
                {selectedCompound.elements.map((el, idx) => (
                  <div
                    key={idx}
                    className="bg-obsidian-deep/80 rounded-xl border border-white/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg border ${
                          el.oxidationState > 0
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : el.oxidationState < 0
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                        }`}
                      >
                        {el.oxidationState > 0 ? `+${el.oxidationState}` : el.oxidationState}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ivory flex items-center gap-2">
                          <span>Nguyên tố: {el.symbol}</span>
                          <span className="text-xs font-normal text-ivory-muted">(Số lượng: {el.count})</span>
                        </div>
                        <p className="text-xs text-ivory-muted mt-0.5">{el.ruleExplanationVi}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">
                        Tổng = {el.count * el.oxidationState > 0 ? `+${(el.count * el.oxidationState).toFixed(1)}` : (el.count * el.oxidationState).toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Charge Sum Verification Box */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-200 font-medium">
                    {selectedCompound.isIon
                      ? `Quy tắc ion đa nguyên tử: Tổng số oxi hóa bằng điện tích ion (${selectedCompound.charge}).`
                      : 'Quy tắc phân tử trung hòa: Tổng đại số các số oxi hóa của các nguyên tử trong phân tử bằng 0.'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                  {selectedCompound.isIon ? `∑ = ${selectedCompound.charge}` : '∑ = 0'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ELECTRON BALANCE LAB & 4 REDOX TYPES                             */}
      {/* ========================================================================= */}
      {activeMode === 'ELECTRON_BALANCE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn phản ứng thuộc 4 dạng oxi hóa - khử kinh điển (GDPT 2018):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
              {REDOX_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedPresetId(preset.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPresetId === preset.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold shadow-lg shadow-amber-500/10'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1">
                    {preset.type === 'INTERMOLECULAR' && 'Oxi Hóa - Khử Thông Thường'}
                    {preset.type === 'INTRAMOLECULAR' && 'Oxi Hóa - Khử Nội Phân Tử'}
                    {preset.type === 'DISPROPORTIONATION' && 'Tự Oxi Hóa - Tự Khử (Dị Phân)'}
                    {preset.type === 'COMPROPORTIONATION' && 'Quy Tụ (Đồng Phân Hóa Ngược)'}
                  </div>
                  <div className="text-xs font-bold truncate">{preset.nameVi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Balanced Equation Banner */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-amber-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 w-full">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                Phương trình phản ứng thăng bằng electron hoàn chỉnh
              </span>
              <div className="text-xl md:text-2xl font-black font-mono text-ivory tracking-wide">
                {selectedPreset.balancedEquation}
              </div>
              <div className="text-xs text-ivory-muted flex items-center gap-2">
                <span>Chưa thăng bằng:</span>
                <span className="font-mono text-amber-300/80">{selectedPreset.unbalancedEquation}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/20">
              <Scale className="w-5 h-5 text-amber-400" />
              <div className="text-right font-mono">
                <div className="text-[10px] text-ivory-muted uppercase">Tổng e trao đổi</div>
                <div className="text-sm font-bold text-amber-300">{selectedPreset.totalElectronsTransferred} e⁻</div>
              </div>
            </div>
          </div>

          {/* Half Reactions & Multipliers Step-by-Step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Oxidation Process (Electron Donation) */}
            <div className="bg-obsidian-deep/80 rounded-2xl border border-red-500/30 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-red-400" />
                  1. Quá trình Oxi hóa (Sự oxi hóa)
                </span>
                <span className="text-xs font-mono font-bold text-red-300 bg-red-500/20 px-2 py-0.5 rounded">
                  Hệ số x {selectedPreset.electronMultiplierOx}
                </span>
              </div>
              <div className="text-lg font-mono font-bold text-ivory">
                {selectedPreset.oxidationHalf.equationVi}
              </div>
              <div className="text-xs text-ivory-muted space-y-1">
                <div>
                  <strong className="text-red-300">Vai trò:</strong> {selectedPreset.oxidationHalf.roleVi}
                </div>
                <div>
                  <strong className="text-ivory">Chuyển dịch số oxi hóa:</strong>{' '}
                  <span className="font-mono text-amber-300">{selectedPreset.oxidationHalf.speciesInitial}</span> ➔{' '}
                  <span className="font-mono text-amber-300">{selectedPreset.oxidationHalf.speciesFinal}</span> (Nhường {selectedPreset.oxidationHalf.electronsExchanged}e)
                </div>
              </div>
            </div>

            {/* Reduction Process (Electron Acceptance) */}
            <div className="bg-obsidian-deep/80 rounded-2xl border border-blue-500/30 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  2. Quá trình Khử (Sự khử)
                </span>
                <span className="text-xs font-mono font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                  Hệ số x {selectedPreset.electronMultiplierRed}
                </span>
              </div>
              <div className="text-lg font-mono font-bold text-ivory">
                {selectedPreset.reductionHalf.equationVi}
              </div>
              <div className="text-xs text-ivory-muted space-y-1">
                <div>
                  <strong className="text-blue-300">Vai trò:</strong> {selectedPreset.reductionHalf.roleVi}
                </div>
                <div>
                  <strong className="text-ivory">Chuyển dịch số oxi hóa:</strong>{' '}
                  <span className="font-mono text-amber-300">{selectedPreset.reductionHalf.speciesInitial}</span> ➔{' '}
                  <span className="font-mono text-amber-300">{selectedPreset.reductionHalf.speciesFinal}</span> (Nhận {selectedPreset.reductionHalf.electronsExchanged}e)
                </div>
              </div>
            </div>
          </div>

          {/* Conservation of Electrons & Phenomenon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-obsidian-surface rounded-xl border border-white/10 p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Bảo toàn Electron & Thăng bằng
              </span>
              <p className="text-xs text-ivory-muted leading-relaxed">{balanceResult.summaryVi}</p>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <div className="bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-1 rounded">
                  Cho: {selectedPreset.oxidationHalf.electronsExchanged} × {selectedPreset.electronMultiplierOx} = {balanceResult.totalDonated}e
                </div>
                <span>=</span>
                <div className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded">
                  Nhận: {selectedPreset.reductionHalf.electronsExchanged} × {selectedPreset.electronMultiplierRed} = {balanceResult.totalAccepted}e
                </div>
              </div>
            </div>

            <div className="bg-obsidian-surface rounded-xl border border-white/10 p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Hiện tượng thực tế & Ứng dụng thực tiễn
              </span>
              <p className="text-xs text-ivory-muted leading-relaxed">
                <strong className="text-ivory">Hiện tượng:</strong> {selectedPreset.observationsVi}
              </p>
              <p className="text-xs text-ivory-muted leading-relaxed pt-1">
                <strong className="text-ivory">Ứng dụng:</strong> {selectedPreset.industrialApplicationVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: PERMANGANATE MEDIA & TITRATION SIMULATOR                          */}
      {/* ========================================================================= */}
      {activeMode === 'PERMANGANATE_MEDIA_TITRATION' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub-section A: Permanganate Medium-Dependent Reactions */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  A. Ảnh Hưởng Của Môi Trường Đến Tính Oxi Hóa Của Thuốc Tím (KMnO4)
                </h3>
                <p className="text-xs text-ivory-muted">
                  Ion Permanganate (MnO4-) bị khử xuống các mức oxi hóa khác nhau tùy thuộc môi trường dung dịch
                </p>
              </div>
              <div className="flex items-center gap-2">
                {PERMANGANATE_MEDIA.map(media => (
                  <button
                    key={media.medium}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMedium(media.medium);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedMedium === media.medium
                        ? 'bg-amber-500 text-obsidian font-extrabold shadow-md'
                        : 'bg-obsidian-deep border border-white/10 text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    {media.medium === 'ACIDIC' && 'Môi Trường Acid (H+)'}
                    {media.medium === 'NEUTRAL' && 'Môi Trường Trung Tính (H2O)'}
                    {media.medium === 'BASIC' && 'Môi Trường Kiềm (OH-)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Medium Inspector Card with Dynamic Color Beaker */}
            <div className="bg-obsidian-deep/90 rounded-2xl border border-white/10 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Animated Beaker SVG */}
              <div className="flex flex-col items-center justify-center p-4 bg-obsidian-surface/60 rounded-xl border border-white/5">
                <svg width="140" height="150" viewBox="0 0 140 150" className="overflow-visible">
                  {/* Beaker Outline */}
                  <path d="M 25 20 L 25 130 A 10 10 0 0 0 35 140 L 105 140 A 10 10 0 0 0 115 130 L 115 20" fill="none" stroke="#64748b" strokeWidth="3" />
                  <line x1="20" y1="20" x2="30" y2="20" stroke="#64748b" strokeWidth="3" />
                  <line x1="110" y1="20" x2="120" y2="20" stroke="#64748b" strokeWidth="3" />
                  
                  {/* Liquid inside beaker */}
                  <rect
                    x="27"
                    y="50"
                    width="86"
                    height="88"
                    rx="6"
                    fill={selectedMediumData.colorAfter}
                    opacity="0.85"
                    className="transition-all duration-700"
                  />
                  
                  {/* Precipitate particles if neutral (MnO2 brown precipitate) */}
                  {selectedMedium === 'NEUTRAL' && (
                    <g>
                      <circle cx="50" cy="132" r="4" fill="#451a03" />
                      <circle cx="70" cy="134" r="5" fill="#451a03" />
                      <circle cx="90" cy="131" r="4" fill="#451a03" />
                      <circle cx="60" cy="128" r="3" fill="#451a03" />
                      <circle cx="80" cy="129" r="4" fill="#451a03" />
                    </g>
                  )}
                  
                  {/* Graduation ticks */}
                  <line x1="30" y1="65" x2="40" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="30" y1="85" x2="40" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="30" y1="105" x2="40" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="30" y1="125" x2="40" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
                </svg>
                <span className="text-[11px] font-mono font-bold text-amber-300 mt-2">
                  {selectedMediumData.finalSpecies}
                </span>
              </div>

              {/* Information & Half-Reaction Details */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">{selectedMediumData.mediumNameVi}</span>
                  <span className="text-[10px] font-mono text-ivory-muted bg-white/5 px-2 py-0.5 rounded">
                    Nhận {selectedMediumData.electronsReceived} e⁻
                  </span>
                </div>
                <div className="text-base font-mono font-bold text-ivory bg-black/40 p-3 rounded-xl border border-white/10">
                  {selectedMediumData.reductionEquationVi}
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  <strong className="text-amber-200">Hiện tượng màu sắc:</strong> {selectedMediumData.colorDescriptionVi}
                </p>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  <strong className="text-emerald-200">Ví dụ thực tế:</strong> {selectedMediumData.practicalExampleVi}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-section B: Permanganate Redox Titration Simulator */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-amber-500/30 p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
              <div>
                <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300 uppercase tracking-wider">
                  B. Mô Phỏng Chuẩn Độ Oxi Hóa - Khử: KMnO4 vs FeSO4 Trong H2SO4 Loãng
                </h3>
                <p className="text-xs text-ivory-muted">
                  Chuẩn độ tự chỉ thị màu: 5Fe²⁺ + MnO₄⁻ + 8H⁺ ➔ 5Fe³⁺ + Mn²⁺ + 4H₂O (Điểm tương đương = 20.0 mL)
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setVTitrantAdded(0.0);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-ivory-muted hover:text-ivory border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại (0 mL)</span>
              </button>
            </div>

            {/* Titration Slider & Live Status */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-ivory">
                  Thể tích dung dịch thuốc tím KMnO₄ 0.02 M đã nhỏ từ buret:
                </span>
                <span className="text-sm font-mono font-black text-pink-400 bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/20">
                  {vTitrantAdded.toFixed(1)} / 30.0 mL (V_eq = {titrationState.equivalenceVolume.toFixed(1)} mL)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={vTitrantAdded}
                onChange={e => setVTitrantAdded(parseFloat(e.target.value))}
                className="w-full accent-pink-500 h-2 bg-obsidian-surface rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.0 mL (Bắt đầu)</span>
                <span className="text-emerald-400 font-bold">20.0 mL (Điểm tương đương)</span>
                <span>30.0 mL (Quá chuẩn độ)</span>
              </div>
            </div>

            {/* Live Titration Flask & Chemical Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Erlenmeyer Flask SVG with Titration Solution Color */}
              <div className="flex flex-col items-center justify-center p-4 bg-obsidian-surface/60 rounded-xl border border-white/5">
                <svg width="140" height="150" viewBox="0 0 140 150" className="overflow-visible">
                  {/* Burette Tip above Flask */}
                  <rect x="67" y="5" width="6" height="25" fill="#94a3b8" />
                  <polygon points="65,30 75,30 70,38" fill="#94a3b8" />
                  {/* Falling Drop of KMnO4 */}
                  {vTitrantAdded > 0 && vTitrantAdded < 30 && (
                    <circle cx="70" cy="46" r="3" fill="#ec4899" className="animate-pulse" />
                  )}

                  {/* Erlenmeyer Flask Outline */}
                  <path
                    d="M 60 40 L 80 40 L 80 60 L 125 130 A 10 10 0 0 1 115 142 L 25 142 A 10 10 0 0 1 15 130 L 60 60 Z"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="3"
                  />

                  {/* Solution in Flask with Dynamic Color */}
                  <path
                    d="M 40 95 L 100 95 L 122 130 A 10 10 0 0 1 115 140 L 25 140 A 10 10 0 0 1 18 130 Z"
                    fill={titrationState.solutionColor}
                    opacity="0.9"
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="text-[11px] font-mono font-bold text-ivory mt-2">
                  Bình tam giác chứa Fe²⁺ + H₂SO₄
                </span>
              </div>

              {/* State Diagnostics & Explanations */}
              <div className="md:col-span-2 space-y-3">
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                    titrationState.isEquivalenceReached && !titrationState.isOverTitrated
                      ? 'bg-pink-500/20 border-pink-400 text-pink-200 font-bold shadow-lg'
                      : titrationState.isOverTitrated
                      ? 'bg-red-500/10 border-red-500/30 text-red-200'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold uppercase tracking-wide">Trạng thái chuẩn độ:</span>
                  </div>
                  {titrationState.statusVi}
                </div>

                {/* Quantitative Mol Registry */}
                <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">Fe²⁺ còn lại</div>
                    <div className="text-amber-300 font-bold mt-0.5">
                      {(titrationState.fe2RemainingMoles * 1000).toFixed(3)} mmol
                    </div>
                  </div>
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">Mn²⁺ sinh ra</div>
                    <div className="text-blue-300 font-bold mt-0.5">
                      {(titrationState.mn2ProducedMoles * 1000).toFixed(3)} mmol
                    </div>
                  </div>
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">KMnO₄ dư</div>
                    <div className="text-pink-300 font-bold mt-0.5">
                      {(titrationState.excessKMnO4Moles * 1000).toFixed(3)} mmol
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
