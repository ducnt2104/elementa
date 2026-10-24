// src/components/visualizations/PeriodicTrendsOctetVisualizer.tsx
// Interactive Periodic Trends, Period 3 Acid-Base Progression, Ionization Anomalies & Octet Exceptions Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 10 (Chủ đề 2 & 3: Bảng tuần hoàn & Liên kết hóa học) & IUPAC Standards

import React, { useState } from 'react';
import {
  PERIOD_3_TRENDS_CATALOG,
  IONIZATION_ANOMALIES,
  OCTET_CASES,
  simulateNO2Dimerization
} from '../../domain/periodicTrendsOctetEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  Info,
  CheckCircle2,
  Thermometer,
  Gauge,
  RotateCcw,
  Zap,
  Flame
} from 'lucide-react';

export type PeriodicTrendsMode = 'PERIOD_3_ACID_BASE' | 'IONIZATION_ANOMALIES' | 'OCTET_EXCEPTIONS_AND_NO2';

export const PeriodicTrendsOctetVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PeriodicTrendsMode>('PERIOD_3_ACID_BASE');

  // Mode 1 state: selected Period 3 element
  const [selectedElementSymbol, setSelectedElementSymbol] = useState<string>('Al');

  // Mode 2 state: selected ionization anomaly pair
  const [selectedAnomalyPairIdx, setSelectedAnomalyPairIdx] = useState<number>(0);

  // Mode 3 state: selected octet case & NO2 equilibrium sliders
  const [selectedOctetFormula, setSelectedOctetFormula] = useState<string>('NO2');
  const [tempC, setTempC] = useState<number>(25);
  const [pressureAtm, setPressureAtm] = useState<number>(1.0);

  const selectedElement = PERIOD_3_TRENDS_CATALOG.find(e => e.symbol === selectedElementSymbol) || PERIOD_3_TRENDS_CATALOG[2];
  const selectedAnomaly = IONIZATION_ANOMALIES[selectedAnomalyPairIdx] || IONIZATION_ANOMALIES[0];
  const selectedOctetCase = OCTET_CASES.find(c => c.formula === selectedOctetFormula) || OCTET_CASES[0];
  const no2Equilibrium = simulateNO2Dimerization(tempC, pressureAtm);

  return (
    <div className="bg-obsidian-surface border border-cyan-500/30 rounded-2xl p-6 text-ivory shadow-2xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              GDPT 2018 Hóa Học 10 • Chủ Đề 2 & 3
            </span>
            <span className="text-xs text-ivory-muted">Periodic Law, Acid-Base Trends, Ionization Anomalies & Octet Exceptions</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 mt-1">
            Quy Luật Tuần Hoàn, Bất Thường Năng Lượng Ion Hóa & Ngoại Lệ Octet
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Biến đổi tính acid-base Chu kỳ 3, bất thường Be/B & N/O cơ học lượng tử, và mô phỏng cân bằng 2NO₂ ⇌ N₂O₄
          </p>
        </div>

        {/* MODE NAVIGATION TABS */}
        <div className="flex items-center bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PERIOD_3_ACID_BASE');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'PERIOD_3_ACID_BASE'
                ? 'bg-cyan-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>1. Chu Kỳ 3 & Acid-Base</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('IONIZATION_ANOMALIES');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'IONIZATION_ANOMALIES'
                ? 'bg-cyan-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2. Bất Thường I₁</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('OCTET_EXCEPTIONS_AND_NO2');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'OCTET_EXCEPTIONS_AND_NO2'
                ? 'bg-cyan-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Ngoại Lệ Octet & NO₂</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: PERIOD 3 ACID-BASE PROGRESSION & TRENDS                          */}
      {/* ========================================================================= */}
      {activeMode === 'PERIOD_3_ACID_BASE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Element Selector Bar Across Period 3 */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Dãy nguyên tố Chu kỳ 3 (Tăng dần điện tích hạt nhân Z = 11 ➔ 18):
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PERIOD_3_TRENDS_CATALOG.map(elem => (
                <button
                  key={elem.symbol}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedElementSymbol(elem.symbol);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedElementSymbol === elem.symbol
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-extrabold shadow-lg shadow-cyan-500/10 scale-105'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] text-ivory-muted font-mono">Z = {elem.atomicNumber}</div>
                  <div className="text-xl font-mono font-black mt-0.5">{elem.symbol}</div>
                  <div className="text-[10px] text-ivory-muted truncate mt-0.5">{elem.nameVi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Comparative Metrics & Main Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inspector Left Panel */}
            <div className="lg:col-span-1 bg-obsidian-deep/90 rounded-2xl border border-cyan-500/30 p-5 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest block">
                  Đặc tính nguyên tử & Vỏ electron
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-3xl font-mono font-black text-ivory">{selectedElement.symbol}</h3>
                  <span className="text-sm text-cyan-300 font-bold">{selectedElement.nameVi}</span>
                  <span className="text-xs text-ivory-muted font-mono">(Z = {selectedElement.atomicNumber})</span>
                </div>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  Cấu hình: <strong className="text-ivory">{selectedElement.electronConfig}</strong>
                </div>
              </div>

              {/* Metric gauges */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-ivory-muted mb-1">
                    <span>Bán kính nguyên tử:</span>
                    <strong className="text-cyan-300">{selectedElement.atomicRadiusPm} pm</strong>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(selectedElement.atomicRadiusPm / 200) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-ivory-muted mb-1">
                    <span>Năng lượng ion hóa thứ nhất (I₁):</span>
                    <strong className="text-amber-300">{selectedElement.firstIonizationEnergyKj} kJ/mol</strong>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(selectedElement.firstIonizationEnergyKj / 1600) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-ivory-muted mb-1">
                    <span>Độ âm điện (Pauling):</span>
                    <strong className="text-pink-300">
                      {selectedElement.electronegativity > 0 ? selectedElement.electronegativity : 'Không xác định'}
                    </strong>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pink-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(selectedElement.electronegativity / 4.0) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Oxide & Hydroxide Acid-Base Trends Right Panel */}
            <div className="lg:col-span-2 bg-obsidian-deep/90 rounded-2xl border border-white/10 p-5 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-ivory-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Oxide cao nhất & Hydroxide tương ứng (GDPT 2018):
                </span>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                    selectedElement.acidBaseCategory === 'STRONG_BASE'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : selectedElement.acidBaseCategory === 'MEDIUM_BASE'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : selectedElement.acidBaseCategory === 'AMPHOTERIC'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse'
                      : selectedElement.acidBaseCategory === 'WEAK_ACID'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : selectedElement.acidBaseCategory === 'MEDIUM_ACID'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : selectedElement.acidBaseCategory === 'STRONG_ACID'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : selectedElement.acidBaseCategory === 'VERY_STRONG_ACID'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}
                >
                  {selectedElement.acidBaseCharacterVi}
                </span>
              </div>

              {/* Formula Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-obsidian-surface p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-ivory-muted uppercase tracking-wider">Oxide cao nhất</span>
                  <div className="text-2xl font-mono font-black text-amber-300">
                    {selectedElement.highestOxideFormula}
                  </div>
                  <div className="text-xs text-ivory-muted">
                    Hóa trị / Số oxi hóa: <strong className="text-ivory">+{selectedElement.highestOxideState}</strong>
                  </div>
                </div>

                <div className="bg-obsidian-surface p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-ivory-muted uppercase tracking-wider">Hydroxide tương ứng</span>
                  <div className="text-2xl font-mono font-black text-cyan-300">
                    {selectedElement.highestHydroxideFormula}
                  </div>
                  <div className="text-xs text-ivory-muted">
                    Bản chất: <strong className="text-ivory">{selectedElement.acidBaseCharacterVi.split(' ')[0]}</strong>
                  </div>
                </div>
              </div>

              {/* Chemical Equation Box */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  Phương trình hóa học minh chứng:
                </span>
                <div className="text-sm font-mono font-bold text-ivory">
                  {selectedElement.chemicalEquationVi}
                </div>
              </div>

              {/* General Rule Summary */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-cyan-200">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Quy luật biến đổi tuần hoàn (Chu kỳ 3):</strong> Đi từ trái sang phải qua Chu kỳ 3 (Na ➔ Cl), bán kính nguyên tử giảm dần, độ âm điện tăng dần; tính kim loại giảm dần và tính phi kim tăng dần; tính base của oxide và hydroxide giảm dần đồng thời tính acid tăng dần (từ base mạnh NaOH qua lưỡng tính Al(OH)₃ đến acid rất mạnh HClO₄).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: IONIZATION ENERGY ANOMALIES (QUANTUM SUBSHELL STABILITY)          */}
      {/* ========================================================================= */}
      {activeMode === 'IONIZATION_ANOMALIES' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pair Selector */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn cặp nguyên tố có bất thường năng lượng ion hóa thứ nhất (I₁):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {IONIZATION_ANOMALIES.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedAnomalyPairIdx(idx);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedAnomalyPairIdx === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-extrabold shadow-lg shadow-cyan-500/10'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Bất thường quy luật
                  </div>
                  <div className="text-sm font-bold mt-0.5">{pair.pairNameVi.split('—')[0]}</div>
                  <div className="text-xs text-ivory-muted mt-1 font-mono">
                    {pair.element1.symbol} ({pair.element1.i1}) &gt; {pair.element2.symbol} ({pair.element2.i1} kJ/mol)
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantum Anomaly Comparison Card */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-cyan-500/30 p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  So sánh năng lượng ion hóa thứ nhất I₁
                </span>
                <h3 className="text-xl font-black text-ivory mt-0.5">{selectedAnomaly.pairNameVi}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                I₁({selectedAnomaly.element1.symbol}) &gt; I₁({selectedAnomaly.element2.symbol})
              </span>
            </div>

            {/* Visual Bars for Both Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Element 1 (Higher I1) */}
              <div className="bg-obsidian-surface p-4 rounded-xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-mono font-black text-emerald-400">{selectedAnomaly.element1.symbol}</span>
                    <span className="text-xs font-mono text-ivory-muted ml-2">({selectedAnomaly.element1.config})</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-300">
                    {selectedAnomaly.element1.i1} kJ/mol
                  </span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(selectedAnomaly.element1.i1 / 1600) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-emerald-300/90 font-medium">
                  Cấu hình electron bão hòa / bán bão hòa rất bền vững
                </div>
              </div>

              {/* Element 2 (Lower I1 despite higher Z) */}
              <div className="bg-obsidian-surface p-4 rounded-xl border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-mono font-black text-amber-400">{selectedAnomaly.element2.symbol}</span>
                    <span className="text-xs font-mono text-ivory-muted ml-2">({selectedAnomaly.element2.config})</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-amber-300">
                    {selectedAnomaly.element2.i1} kJ/mol
                  </span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(selectedAnomaly.element2.i1 / 1600) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-amber-300/90 font-medium">
                  Electron dễ bứt ra do mức năng lượng cao hơn hoặc lực đẩy spin giữa cặp ghép đôi
                </div>
              </div>
            </div>

            {/* In-depth Quantum Explanation */}
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                Nguyên nhân cơ học lượng tử & Hiệu ứng chắn:
              </span>
              <p className="text-xs text-ivory-muted leading-relaxed">{selectedAnomaly.explanationVi}</p>
              <div className="text-xs text-cyan-300 pt-1">
                <strong>Nguyên lý:</strong> {selectedAnomaly.quantumPrincipleVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: OCTET RULE, EXCEPTIONS & NO2-N2O4 EQUILIBRIUM SIMULATOR          */}
      {/* ========================================================================= */}
      {activeMode === 'OCTET_EXCEPTIONS_AND_NO2' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Molecule Carousel */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn phân tử nghiên cứu quy tắc Octet và các ngoại lệ kinh điển:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {OCTET_CASES.map(mol => (
                <button
                  key={mol.formula}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedOctetFormula(mol.formula);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedOctetFormula === mol.formula
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-extrabold shadow-lg shadow-cyan-500/10'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-lg font-mono font-black">{mol.formula}</div>
                  <div className="text-[10px] text-ivory-muted truncate mt-0.5">{mol.nameVi.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Molecule Details Card */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-white/10 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                Phân loại quy tắc Octet
              </span>
              <h3 className="text-2xl font-mono font-black text-ivory">{selectedOctetCase.formula}</h3>
              <p className="text-xs text-ivory-muted">{selectedOctetCase.nameVi}</p>
              <div className="pt-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedOctetCase.categoryNameVi}
                </span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2 text-xs text-ivory-muted">
              <div>
                <strong className="text-ivory">Nguyên tử trung tâm:</strong>{' '}
                <span className="font-mono text-cyan-300">{selectedOctetCase.centralAtom}</span> (Chứa{' '}
                <strong className="text-amber-300">{selectedOctetCase.valenceElectronsAroundCentral} electron</strong> xung quanh)
              </div>
              <div>
                <strong className="text-ivory">Hình học phân tử:</strong> {selectedOctetCase.geometryVi}
              </div>
              <div>
                <strong className="text-ivory">Cấu trúc Lewis:</strong> {selectedOctetCase.lewisStructureDescriptionVi}
              </div>
              <div>
                <strong className="text-ivory">Ý nghĩa hóa học:</strong> {selectedOctetCase.reactivitySignificanceVi}
              </div>
            </div>
          </div>

          {/* Sub-section: 2NO2 <=> N2O4 Equilibrium Simulation */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-amber-500/30 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                  Thí nghiệm thực hành kinh điển GDPT 2018
                </span>
                <h3 className="text-base font-bold text-ivory mt-0.5">
                  Cân Bằng Nhị Hợp Hóa Khí NO₂ (Nâu Đỏ) ⇌ N₂O₄ (Không Màu) [ΔH° = -57.2 kJ/mol]
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setTempC(25);
                  setPressureAtm(1.0);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-ivory-muted hover:text-ivory border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mặc định (25°C, 1 atm)</span>
              </button>
            </div>

            {/* Sliders for Temperature and Pressure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <Thermometer className="w-4 h-4" />
                    Nhiệt độ ống nghiệm:
                  </span>
                  <span className="font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {tempC}°C {tempC < 0 ? '(Nước đá muối)' : tempC > 60 ? '(Nước sôi nóng)' : '(Nhiệt độ phòng)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="100"
                  step="1"
                  value={tempC}
                  onChange={e => setTempC(parseInt(e.target.value))}
                  className="w-full accent-orange-500 h-2 bg-obsidian-surface rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                  <span>-15°C (Lạnh)</span>
                  <span>25°C</span>
                  <span>100°C (Nóng)</span>
                </div>
              </div>

              {/* Pressure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Gauge className="w-4 h-4" />
                    Áp suất xilanh kín:
                  </span>
                  <span className="font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {pressureAtm.toFixed(1)} atm
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={pressureAtm}
                  onChange={e => setPressureAtm(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 h-2 bg-obsidian-surface rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                  <span>0.5 atm (Kéo piston ra)</span>
                  <span>1.0 atm</span>
                  <span>5.0 atm (Nén piston vào)</span>
                </div>
              </div>
            </div>

            {/* Live Sealed Ampoule SVG & Equilibrium Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Sealed Glass Tube SVG with Dynamic Gas Color */}
              <div className="flex flex-col items-center justify-center p-4 bg-obsidian-surface/60 rounded-xl border border-white/5">
                <svg width="100" height="150" viewBox="0 0 100 150" className="overflow-visible">
                  {/* Glass Tube Body */}
                  <rect
                    x="25"
                    y="15"
                    width="50"
                    height="120"
                    rx="15"
                    fill={no2Equilibrium.hexColor}
                    stroke="#94a3b8"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />
                  {/* Glass Reflection Highlight */}
                  <path d="M 32 25 L 32 125" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  {/* Gas Molecule Particles */}
                  <circle cx="45" cy="40" r="3" fill="#ffffff" opacity="0.4" />
                  <circle cx="60" cy="70" r="3" fill="#ffffff" opacity="0.4" />
                  <circle cx="40" cy="100" r="3" fill="#ffffff" opacity="0.4" />
                  <circle cx="55" cy="115" r="3" fill="#ffffff" opacity="0.4" />
                </svg>
                <span className="text-[11px] font-mono font-bold text-amber-300 mt-2">
                  Ống thủy tinh hàn kín
                </span>
              </div>

              {/* Equilibrium Explanation & Le Chatelier readout */}
              <div className="md:col-span-2 space-y-3">
                <div className="bg-obsidian-surface p-3.5 rounded-xl border border-white/10 text-xs leading-relaxed">
                  <div className="text-amber-400 font-bold mb-1">
                    {no2Equilibrium.dominantSpeciesVi}
                  </div>
                  <p className="text-ivory-muted">{no2Equilibrium.explanationVi}</p>
                </div>

                {/* Quantitative Mol Fraction Gauges */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-obsidian-surface p-3 rounded-xl border border-amber-500/20">
                    <div className="text-[10px] text-ivory-muted uppercase">Phần mol NO₂ (Nâu đỏ)</div>
                    <div className="text-amber-400 font-bold text-lg mt-0.5">
                      {(no2Equilibrium.fractionNO2 * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-obsidian-surface p-3 rounded-xl border border-cyan-500/20">
                    <div className="text-[10px] text-ivory-muted uppercase">Phần mol N₂O₄ (Không màu)</div>
                    <div className="text-cyan-300 font-bold text-lg mt-0.5">
                      {(no2Equilibrium.fractionN2O4 * 100).toFixed(1)}%
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
