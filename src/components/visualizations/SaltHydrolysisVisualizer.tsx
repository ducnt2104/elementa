// src/components/visualizations/SaltHydrolysisVisualizer.tsx
// Interactive Salt Hydrolysis, Solution pH, Three-Indicator Lab & Alum Water Clarification Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 11 (Chủ đề 2: Cân bằng trong dung dịch nước) & IUPAC Standards

import React, { useState } from 'react';
import {
  SALT_HYDROLYSIS_CATALOG,
  simulateAlumClarification,
  SaltHydrolysisProfile
} from '../../domain/saltHydrolysisEngine';
import { sound } from '../../audio/soundEngine';
import {
  Droplets,
  FlaskConical,
  Sparkles,
  Info,
  CheckCircle2,
  Activity,
  Layers,
  RotateCcw,
  Sliders
} from 'lucide-react';

export type SaltHydrolysisMode = 'SALT_CATALOG_PH' | 'INDICATOR_LAB' | 'ALUM_WATER_CLARIFICATION';

export const SaltHydrolysisVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SaltHydrolysisMode>('SALT_CATALOG_PH');

  // Mode 1 & 2 state: selected salt formula
  const [selectedFormula, setSelectedFormula] = useState<string>('Al2(SO4)3');

  // Mode 3 state: Alum clarification sliders
  const [initialTurbidity, setInitialTurbidity] = useState<number>(250);
  const [alumDose, setAlumDose] = useState<number>(55);

  const selectedSalt = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === selectedFormula) || SALT_HYDROLYSIS_CATALOG[4];
  const alumSimulation = simulateAlumClarification(initialTurbidity, alumDose);

  return (
    <div className="bg-obsidian-surface border border-sky-500/30 rounded-2xl p-6 text-ivory shadow-2xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
              GDPT 2018 Hóa Học 11 • Chủ Đề 2
            </span>
            <span className="text-xs text-ivory-muted">Salt Hydrolysis, pH Prediction & Water Clarification</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-300 to-cyan-400 mt-1">
            Sự Thủy Phân Của Muối & Ứng Dụng Phèn Chua
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Dự đoán pH dung dịch muối, thí nghiệm 3 chất chỉ thị màu và cơ chế keo tụ làm trong nước của phèn nhôm
          </p>
        </div>

        {/* MODE NAVIGATION TABS */}
        <div className="flex items-center bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('SALT_CATALOG_PH');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'SALT_CATALOG_PH'
                ? 'bg-sky-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. Thủy Phân & pH</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('INDICATOR_LAB');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'INDICATOR_LAB'
                ? 'bg-sky-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>2. 3 Chất Chỉ Thị</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ALUM_WATER_CLARIFICATION');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'ALUM_WATER_CLARIFICATION'
                ? 'bg-sky-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>3. Phèn Chua Làm Trong Nước</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SALT HYDROLYSIS CATALOG & pH PREDICTION                           */}
      {/* ========================================================================= */}
      {activeMode === 'SALT_CATALOG_PH' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Salt Selector Bar */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn muối hòa tan vào nước cất để khảo sát hiện tượng thủy phân:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {SALT_HYDROLYSIS_CATALOG.map(salt => (
                <button
                  key={salt.formula}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFormula(salt.formula);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedFormula === salt.formula
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-extrabold shadow-lg shadow-sky-500/10 scale-105'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-base font-mono font-bold">{salt.formula}</div>
                  <div className="text-[10px] text-ivory-muted truncate mt-0.5">{salt.nameVi.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Salt Details & pH Gauge Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* pH Meter Card */}
            <div className="lg:col-span-1 bg-obsidian-deep/90 rounded-2xl border border-sky-500/30 p-5 flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-full">
                <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest block">
                  Dự đoán môi trường dung dịch 0.1 M
                </span>
                <h3 className="text-2xl font-mono font-black text-ivory mt-1">{selectedSalt.formula}</h3>
                <p className="text-xs text-ivory-muted">{selectedSalt.nameVi}</p>
              </div>

              {/* Circular pH Indicator */}
              <div className="w-32 h-32 rounded-full border-4 border-sky-400/40 bg-obsidian-surface flex flex-col items-center justify-center font-mono shadow-xl">
                <span className="text-3xl font-black text-sky-300">{selectedSalt.nominalPh01M.toFixed(2)}</span>
                <span className="text-[10px] text-ivory-muted uppercase">pH Dung Dịch</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                    selectedSalt.nominalPh01M > 7.1
                      ? 'bg-blue-500/20 text-blue-300'
                      : selectedSalt.nominalPh01M < 6.9
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {selectedSalt.nominalPh01M > 7.1 ? 'Kiềm (Base)' : selectedSalt.nominalPh01M < 6.9 ? 'Acid' : 'Trung Tính'}
                </span>
              </div>

              {/* Linear pH Spectrum Bar */}
              <div className="w-full space-y-1 font-mono text-[10px]">
                <div className="flex justify-between text-ivory-muted">
                  <span>pH 0 (Acid)</span>
                  <span>pH 7 (Trung tính)</span>
                  <span>pH 14 (Base)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 relative">
                  <div
                    className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg border border-black transform -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${(selectedSalt.nominalPh01M / 14) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Hydrolysis Chemistry & Equation Panel */}
            <div className="lg:col-span-2 bg-obsidian-deep/90 rounded-2xl border border-white/10 p-5 space-y-4">
              <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  Cơ chế ion & Bản chất thủy phân (GDPT 2018):
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/5 text-sky-300 border border-white/10">
                  {selectedSalt.hydrolysisType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-obsidian-surface p-3 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-ivory-muted uppercase">Gốc Cation</span>
                  <div className="font-bold text-ivory">{selectedSalt.cation}</div>
                  <div className="text-[10px] text-ivory-muted">Sinh ra từ: {selectedSalt.parentBaseVi}</div>
                </div>
                <div className="bg-obsidian-surface p-3 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-ivory-muted uppercase">Gốc Anion</span>
                  <div className="font-bold text-ivory">{selectedSalt.anion}</div>
                  <div className="text-[10px] text-ivory-muted">Sinh ra từ: {selectedSalt.parentAcidVi}</div>
                </div>
              </div>

              {/* Equation Box */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                  Phương trình thủy phân ion trong nước:
                </span>
                <div className="text-sm font-mono font-bold text-ivory">
                  {selectedSalt.hydrolysisEquationVi}
                </div>
              </div>

              {/* Scientific Explanation & Real World App */}
              <div className="space-y-2 text-xs">
                <p className="text-ivory-muted leading-relaxed">
                  <strong className="text-sky-300">Giải thích:</strong> {selectedSalt.typeDescriptionVi}
                </p>
                <p className="text-ivory-muted leading-relaxed">
                  <strong className="text-emerald-300">Ứng dụng thực tiễn:</strong> {selectedSalt.realWorldApplicationVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: THREE-INDICATOR SIMULATION LAB                                   */}
      {/* ========================================================================= */}
      {activeMode === 'INDICATOR_LAB' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Salt Selector */}
          <div>
            <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider block mb-2">
              Chọn muối để nhỏ 3 chất chỉ thị màu:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {SALT_HYDROLYSIS_CATALOG.map(salt => (
                <button
                  key={salt.formula}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedFormula(salt.formula);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedFormula === salt.formula
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-extrabold shadow'
                      : 'bg-obsidian-deep/50 border-white/5 text-ivory hover:border-white/20'
                  }`}
                >
                  <div className="text-sm font-mono font-bold">{salt.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Test Tubes Grid */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-sky-500/30 p-6 space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest">
                Phản ứng đổi màu của 3 chất chỉ thị trong dung dịch {selectedSalt.formula} (pH ≈ {selectedSalt.nominalPh01M.toFixed(2)})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tube 1: Litmus */}
              <div className="bg-obsidian-surface/60 rounded-xl border border-white/10 p-5 flex flex-col items-center text-center space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  1. Quỳ Tím (Litmus)
                </span>
                {/* Test Tube SVG */}
                <svg width="60" height="130" viewBox="0 0 60 130">
                  <path d="M 15 10 L 15 105 A 15 15 0 0 0 45 105 L 45 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  <ellipse cx="30" cy="10" rx="15" ry="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Liquid inside */}
                  <path
                    d="M 17 40 L 43 40 L 43 105 A 13 13 0 0 1 17 105 Z"
                    fill={selectedSalt.litmusHex}
                    opacity="0.85"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="font-mono text-sm font-bold" style={{ color: selectedSalt.litmusHex }}>
                  {selectedSalt.litmusColorVi}
                </div>
                <p className="text-[10px] text-ivory-muted">Khoảng đổi màu: Đỏ (pH &lt; 5.0) ➔ Tím (5.0-8.3) ➔ Xanh (&gt; 8.3)</p>
              </div>

              {/* Tube 2: Phenolphthalein */}
              <div className="bg-obsidian-surface/60 rounded-xl border border-white/10 p-5 flex flex-col items-center text-center space-y-3">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                  2. Phenolphthalein
                </span>
                {/* Test Tube SVG */}
                <svg width="60" height="130" viewBox="0 0 60 130">
                  <path d="M 15 10 L 15 105 A 15 15 0 0 0 45 105 L 45 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  <ellipse cx="30" cy="10" rx="15" ry="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Liquid inside */}
                  <path
                    d="M 17 40 L 43 40 L 43 105 A 13 13 0 0 1 17 105 Z"
                    fill={selectedSalt.phenolphthaleinHex}
                    opacity="0.85"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="font-mono text-sm font-bold" style={{ color: selectedSalt.phenolphthaleinHex === '#f8fafc' ? '#cbd5e1' : selectedSalt.phenolphthaleinHex }}>
                  {selectedSalt.phenolphthaleinColorVi}
                </div>
                <p className="text-[10px] text-ivory-muted">Khoảng đổi màu: Không màu (pH &lt; 8.3) ➔ Đỏ tía / Hồng (pH ≥ 8.3)</p>
              </div>

              {/* Tube 3: Methyl Orange */}
              <div className="bg-obsidian-surface/60 rounded-xl border border-white/10 p-5 flex flex-col items-center text-center space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  3. Methyl Da Cam
                </span>
                {/* Test Tube SVG */}
                <svg width="60" height="130" viewBox="0 0 60 130">
                  <path d="M 15 10 L 15 105 A 15 15 0 0 0 45 105 L 45 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  <ellipse cx="30" cy="10" rx="15" ry="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Liquid inside */}
                  <path
                    d="M 17 40 L 43 40 L 43 105 A 13 13 0 0 1 17 105 Z"
                    fill={selectedSalt.methylOrangeHex}
                    opacity="0.85"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="font-mono text-sm font-bold" style={{ color: selectedSalt.methylOrangeHex }}>
                  {selectedSalt.methylOrangeColorVi}
                </div>
                <p className="text-[10px] text-ivory-muted">Khoảng đổi màu: Đỏ (pH &lt; 3.1) ➔ Da cam (3.1-4.4) ➔ Vàng (&gt; 4.4)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: ALUM WATER CLARIFICATION SIMULATOR                               */}
      {/* ========================================================================= */}
      {activeMode === 'ALUM_WATER_CLARIFICATION' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sliders Container */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-sky-500/30 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/20 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest">
                  Thí nghiệm kinh điển GDPT 2018
                </span>
                <h3 className="text-base font-bold text-ivory mt-0.5">
                  Cơ Chế Làm Trong Nước Đục Bằng Phèn Chua: KAl(SO₄)₂·12H₂O
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setInitialTurbidity(250);
                  setAlumDose(55);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-ivory-muted hover:text-ivory border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mặc định (55 mg/L)</span>
              </button>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alum dose slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-sky-300">Liều lượng phèn chua thêm vào:</span>
                  <span className="font-mono text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                    {alumDose} mg/L
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={alumDose}
                  onChange={e => setAlumDose(parseInt(e.target.value))}
                  className="w-full accent-sky-400 h-2 bg-obsidian-surface rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                  <span>0 mg/L (Chưa thêm)</span>
                  <span className="text-emerald-400 font-bold">55 mg/L (Tối ưu)</span>
                  <span>120 mg/L (Quá liều)</span>
                </div>
              </div>

              {/* Initial turbidity slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-amber-300">Độ đục ban đầu của nguồn nước:</span>
                  <span className="font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {initialTurbidity} NTU
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={initialTurbidity}
                  onChange={e => setInitialTurbidity(parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-obsidian-surface rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                  <span>50 NTU (Nước hồ)</span>
                  <span>250 NTU (Nước lũ)</span>
                  <span>500 NTU (Nước phù sa đặc)</span>
                </div>
              </div>
            </div>

            {/* Cylinder SVG & Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
              {/* Glass Cylinder SVG */}
              <div className="flex flex-col items-center justify-center p-4 bg-obsidian-surface/60 rounded-xl border border-white/5">
                <svg width="120" height="160" viewBox="0 0 120 160">
                  {/* Cylinder Body */}
                  <rect x="25" y="10" width="70" height="140" rx="6" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Graduations */}
                  <line x1="25" y1="40" x2="35" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="25" y1="70" x2="35" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="25" y1="100" x2="35" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="25" y1="130" x2="35" y2="130" stroke="#94a3b8" strokeWidth="1.5" />

                  {/* Water liquid */}
                  <rect
                    x="27"
                    y="30"
                    width="66"
                    height="118"
                    rx="4"
                    fill={alumSimulation.waterHexColor}
                    opacity="0.85"
                    className="transition-all duration-700"
                  />

                  {/* Sediment layer at bottom if clarified */}
                  {alumDose > 20 && (
                    <rect
                      x="27"
                      y={148 - Math.min(25, (alumSimulation.sedimentRemovedPercent / 100) * 25)}
                      width="66"
                      height={Math.min(25, (alumSimulation.sedimentRemovedPercent / 100) * 25)}
                      fill="#78350f"
                      className="transition-all duration-700"
                    />
                  )}
                </svg>
                <span className="text-[11px] font-mono font-bold text-sky-300 mt-2">
                  Trụ lắng keo tụ
                </span>
              </div>

              {/* Status and Readouts */}
              <div className="md:col-span-2 space-y-3">
                <div className="bg-obsidian-surface p-3.5 rounded-xl border border-white/10 text-xs leading-relaxed space-y-1">
                  <div className="text-sky-300 font-bold">{alumSimulation.waterAppearanceVi}</div>
                  <p className="text-ivory-muted">{alumSimulation.scientificMechanismVi}</p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">Độ đục còn lại</div>
                    <div className="text-sky-300 font-bold mt-0.5">{alumSimulation.finalTurbidityNtu} NTU</div>
                  </div>
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">Lắng cặn</div>
                    <div className="text-emerald-400 font-bold mt-0.5">{alumSimulation.sedimentRemovedPercent}%</div>
                  </div>
                  <div className="bg-obsidian-surface p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-ivory-muted uppercase">pH Cân bằng</div>
                    <div className="text-amber-300 font-bold mt-0.5">{alumSimulation.equilibriumPh}</div>
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
