// src/components/visualizations/NmrSpectroscopyVisualizer.tsx
// ============================================================================
// ELEMENTA NUCLEAR MAGNETIC RESONANCE (¹H & ¹³C NMR) SPECTROMETER
// Standards: IUPAC Recommendations & Vietnam GDPT 2018 Chemistry 11/12
// Dynamic interactive NMR console with dual nucleus mode (¹H & ¹³C),
// Pascal triangle multiplet splitting, integral curves, Larmor precession,
// Free Induction Decay (FID) time-domain oscilloscope, and symmetry analysis.
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  NMRNucleus,
  NMRCompound,
  NMRPeakSignal,
  NMR_BENCHMARK_CATALOG,
  PROTON_DIAGNOSTIC_REGIONS,
  CARBON_DIAGNOSTIC_REGIONS,
  calculateLarmorFrequencyMHz,
  calculateMultipletPeakOffsetsPpm,
  calculatePascalTriangleRatios,
  classifyChemicalShiftRegion,
  deduceMolecularMotifsFromNMR,
} from '../../domain/nmrSpectroscopyEngine';
import { sound } from '../../audio/soundEngine';

export interface NmrSpectroscopyVisualizerProps {
  initialCompoundId?: string;
}

export const NmrSpectroscopyVisualizer: React.FC<NmrSpectroscopyVisualizerProps> = ({ initialCompoundId }) => {
  const [selectedNucleus, setSelectedNucleus] = useState<NMRNucleus>('1H');
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>(initialCompoundId || 'ethanol');
  const [magneticFieldTesla, setMagneticFieldTesla] = useState<number>(11.74); // 500 MHz for 1H
  const [activeTab, setActiveTab] = useState<'spectrum' | 'symmetry' | 'fid' | 'solver'>('spectrum');
  const [selectedPeakIndex, setSelectedPeakIndex] = useState<number | null>(null);
  const [isRfPulsing, setIsRfPulsing] = useState<boolean>(false);
  const [customPpmInput, setCustomPpmInput] = useState<string>('1.25, 3.69');

  const compound: NMRCompound = NMR_BENCHMARK_CATALOG[selectedCompoundId] || NMR_BENCHMARK_CATALOG.ethanol;

  // Larmor frequency at current field
  const currentLarmorFreq = useMemo(() => {
    return calculateLarmorFrequencyMHz(selectedNucleus, magneticFieldTesla);
  }, [selectedNucleus, magneticFieldTesla]);

  const activeSignals: NMRPeakSignal[] = useMemo(() => {
    return selectedNucleus === '1H' ? compound.protonSignals : compound.carbonSignals;
  }, [selectedNucleus, compound]);

  const maxPpm = selectedNucleus === '1H' ? 13.0 : 220.0;
  const minPpm = -0.5;

  // Convert chemical shift δ (ppm) to SVG x coordinate (inverted axis: maxPpm on left, minPpm on right)
  const ppmToSvgX = (ppm: number, width = 800) => {
    const fraction = (maxPpm - ppm) / (maxPpm - minPpm);
    return Math.max(40, Math.min(width - 40, 40 + fraction * (width - 80)));
  };

  const handlePulseRf = () => {
    setIsRfPulsing(true);
    sound.playNmrRfPulseBip();
    setTimeout(() => {
      sound.playNmrFidDecayChime();
      setIsRfPulsing(false);
    }, 120);
  };

  // Solver analysis
  const solverResults = useMemo(() => {
    const tokens = customPpmInput
      .split(/[,;\s]+/)
      .map(t => parseFloat(t.trim()))
      .filter(n => !isNaN(n) && n >= 0);

    const mockedSignals = tokens.map(ppm => ({
      deltaPpm: ppm,
      multiplicity: ppm < 1.5 ? 't' : ppm > 3.0 && ppm < 4.5 ? 'q' : ppm > 6.5 && ppm < 8.5 ? 'm' : 's',
      integration: ppm < 1.5 ? 3 : ppm > 3.0 && ppm < 4.5 ? 2 : 1,
    }));

    return deduceMolecularMotifsFromNMR(mockedSignals);
  }, [customPpmInput]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              IUPAC & GDPT 2018 Chemistry
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phổ Cộng Hưởng Từ Hạt Nhân (NMR)
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ν₀ = γ·B₀ / 2π
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            🔬 Máy Quang Phổ NMR Đa Hạt Nhân (¹H & ¹³C)
          </h2>
          <p className="text-xs text-slate-400">
            Khảo sát độ dịch chuyển hóa học δ (ppm), ghép spin vô hướng J, quy tắc tách chùm n+1 và diện tích tích phân proton.
          </p>
        </div>

        {/* NUCLEUS & RF TRIGGER */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => {
                setSelectedNucleus('1H');
                setSelectedPeakIndex(null);
                sound.playPhotodetectorBeep?.();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedNucleus === '1H'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ¹H NMR (Proton)
            </button>
            <button
              onClick={() => {
                setSelectedNucleus('13C');
                setSelectedPeakIndex(null);
                sound.playPhotodetectorBeep?.();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedNucleus === '13C'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ¹³C NMR (Carbon)
            </button>
          </div>

          <button
            onClick={handlePulseRf}
            disabled={isRfPulsing}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              isRfPulsing
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
            }`}
          >
            <span>📡</span>
            <span>{isRfPulsing ? 'Phát Xung 90° RF...' : 'Bắn Xung 90° RF'}</span>
          </button>
        </div>
      </div>

      {/* SPECTROMETER CONSOLE SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        {/* Compound Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Hợp Chất Mẫu (GDPT 2018):
          </label>
          <select
            value={selectedCompoundId}
            onChange={(e) => {
              setSelectedCompoundId(e.target.value);
              setSelectedPeakIndex(null);
              sound.playMassSpecIonTrapHum?.();
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            {Object.values(NMR_BENCHMARK_CATALOG).map((c) => (
              <option key={c.id} value={c.id}>
                {c.vietnameseName} ({c.chemicalFormula})
              </option>
            ))}
          </select>
        </div>

        {/* Magnetic Field Tuning */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Từ Trường Nam Châm Siêu Dẫn (B₀):</span>
            <span className="font-mono text-cyan-300 font-bold">{magneticFieldTesla.toFixed(2)} Tesla</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="7.05"
              max="14.09"
              step="0.1"
              value={magneticFieldTesla}
              onChange={(e) => setMagneticFieldTesla(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>300 MHz (7.05T)</span>
            <span>400 MHz (9.4T)</span>
            <span>500 MHz (11.74T)</span>
            <span>600 MHz (14.09T)</span>
          </div>
        </div>

        {/* Calculated Larmor Resonance Frequency */}
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-center">
          <div className="text-[11px] text-slate-400">Tần Số Hồi Sai Larmor (ν₀):</div>
          <div className="text-lg font-mono font-bold text-cyan-400 flex items-baseline gap-1">
            {currentLarmorFreq.toFixed(2)}
            <span className="text-xs text-slate-400">MHz</span>
            <span className="ml-auto text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              I = 1/2 ({selectedNucleus})
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
            Độ phân giải: 1 ppm = {(currentLarmorFreq).toFixed(1)} Hz
          </div>
        </div>
      </div>

      {/* SPECTRUM CANVAS & VISUALIZATION */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
        {/* Diagnostic Regions Bar */}
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span className="font-semibold text-slate-300">
            📊 Phổ Thực Nghiệm {selectedNucleus} NMR của {compound.name} ({compound.chemicalFormula})
          </span>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Tín hiệu phổ</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 ml-2"></span>
            <span>Đường tích phân ({selectedNucleus === '1H' ? 'nH' : 'Tương đối'})</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-500 ml-2"></span>
            <span>Chuẩn TMS (δ = 0.00 ppm)</span>
          </div>
        </div>

        {/* SVG NMR Spectrum */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 800 280"
            className="w-full min-w-[700px] h-[280px] bg-slate-950 rounded-lg select-none"
          >
            {/* Grid Lines */}
            {Array.from({ length: selectedNucleus === '1H' ? 14 : 12 }).map((_, idx) => {
              const ppmVal = selectedNucleus === '1H' ? idx : idx * 20;
              const xPos = ppmToSvgX(ppmVal);
              return (
                <g key={`grid-${idx}`}>
                  <line
                    x1={xPos}
                    y1={20}
                    x2={xPos}
                    y2={230}
                    stroke="#1e293b"
                    strokeDasharray="2,2"
                    strokeWidth="1"
                  />
                  <line
                    x1={xPos}
                    y1={230}
                    x2={xPos}
                    y2={236}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <text
                    x={xPos}
                    y={252}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {ppmVal}
                  </text>
                </g>
              );
            })}

            {/* Baseline */}
            <line x1={30} y1={230} x2={770} y2={230} stroke="#475569" strokeWidth="2" />
            <text x={780} y={234} fill="#64748b" fontSize="10" fontFamily="sans-serif">
              ppm (δ)
            </text>

            {/* Inverted Scale Orientation Indicators */}
            <text x={45} y={15} fill="#38bdf8" fontSize="10" fontWeight="bold">
              ← Trường yếu / Giải chắn (Downfield / Deshielded)
            </text>
            <text x={755} y={15} textAnchor="end" fill="#34d399" fontSize="10" fontWeight="bold">
              Trường mạnh / Chắn (Upfield / Shielded) →
            </text>

            {/* TMS Zero Reference Peak at δ = 0.00 */}
            <g>
              <line
                x1={ppmToSvgX(0)}
                y1={230}
                x2={ppmToSvgX(0)}
                y2={110}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text
                x={ppmToSvgX(0)}
                y={102}
                textAnchor="middle"
                fill="#64748b"
                fontSize="9"
                fontFamily="monospace"
              >
                TMS (0.00)
              </text>
            </g>

            {/* Diagnostic Region Shading */}
            {(selectedNucleus === '1H' ? PROTON_DIAGNOSTIC_REGIONS : CARBON_DIAGNOSTIC_REGIONS).map((reg, idx) => {
              const xLeft = ppmToSvgX(Math.min(reg.maxDeltaPpm, maxPpm));
              const xRight = ppmToSvgX(Math.max(reg.minDeltaPpm, minPpm));
              const width = Math.max(0, xRight - xLeft);
              return (
                <rect
                  key={`region-${idx}`}
                  x={xLeft}
                  y={225}
                  width={width}
                  height={5}
                  fill={idx % 2 === 0 ? '#38bdf8' : '#818cf8'}
                  opacity={0.35}
                />
              );
            })}

            {/* Signals & Multiplets */}
            {activeSignals.map((sig, sigIdx) => {
              const isSelected = selectedPeakIndex === sigIdx;
              const centerPpm = sig.deltaPpm;
              const neighborCount = sig.multiplicity === 's' ? 0 : sig.multiplicity === 'd' ? 1 : sig.multiplicity === 't' ? 2 : sig.multiplicity === 'q' ? 3 : 0;
              const J = sig.couplingConstantHz || 7.0;

              // Calculate split subpeaks
              const subpeaks = calculateMultipletPeakOffsetsPpm(centerPpm, neighborCount, J, currentLarmorFreq);
              const baseHeight = 120 + (sig.integrationProtons || 1) * 15;

              return (
                <g
                  key={`sig-${sigIdx}`}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedPeakIndex(sigIdx);
                    sound.playPhotodetectorBeep?.();
                  }}
                >
                  {/* Multiplet Lines */}
                  {subpeaks.map((sub, subIdx) => {
                    const subX = ppmToSvgX(sub.ppm);
                    const peakY = 230 - baseHeight * sub.relativeHeight;
                    return (
                      <line
                        key={`sub-${subIdx}`}
                        x1={subX}
                        y1={230}
                        x2={subX}
                        y2={peakY}
                        stroke={isSelected ? '#f43f5e' : selectedNucleus === '1H' ? '#06b6d4' : '#f59e0b'}
                        strokeWidth={isSelected ? '2.5' : '1.8'}
                        className="transition-colors"
                      />
                    );
                  })}

                  {/* Integration Step Curve (for 1H NMR) */}
                  {selectedNucleus === '1H' && (
                    <path
                      d={`M ${ppmToSvgX(centerPpm + 0.35)} 180 L ${ppmToSvgX(centerPpm + 0.05)} 180 L ${ppmToSvgX(centerPpm - 0.05)} ${
                        180 - (sig.integrationProtons || 1) * 12
                      } L ${ppmToSvgX(centerPpm - 0.35)} ${180 - (sig.integrationProtons || 1) * 12}`}
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="1.5"
                      strokeDasharray="2,1"
                      opacity={0.8}
                    />
                  )}

                  {/* Chemical Shift Label */}
                  <text
                    x={ppmToSvgX(centerPpm)}
                    y={230 - baseHeight - 12}
                    textAnchor="middle"
                    fill={isSelected ? '#f43f5e' : '#e2e8f0'}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    δ {sig.deltaPpm.toFixed(2)}
                  </text>

                  {/* Multiplicity & Integration Tag */}
                  <text
                    x={ppmToSvgX(centerPpm)}
                    y={230 - baseHeight - 2}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    {sig.multiplicity} ({sig.integrationProtons}H)
                  </text>

                  {/* Hit Area */}
                  <rect
                    x={ppmToSvgX(centerPpm + 0.4)}
                    y={30}
                    width={Math.max(25, ppmToSvgX(centerPpm - 0.4) - ppmToSvgX(centerPpm + 0.4))}
                    height={200}
                    fill="transparent"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Peak Quick Card */}
        {selectedPeakIndex !== null && activeSignals[selectedPeakIndex] && (
          <div className="mt-3 bg-slate-900 border border-cyan-500/40 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs animate-fadeIn">
            <div>
              <span className="text-cyan-400 font-bold font-mono">
                Đỉnh δ = {activeSignals[selectedPeakIndex].deltaPpm.toFixed(2)} ppm
              </span>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-emerald-400 font-semibold">
                {activeSignals[selectedPeakIndex].multiplicityLabelVI}
              </span>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-amber-300 font-mono">
                Tích phân: {activeSignals[selectedPeakIndex].integrationProtons}H
              </span>
              {activeSignals[selectedPeakIndex].couplingConstantHz && (
                <>
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-indigo-300 font-mono">
                    J = {activeSignals[selectedPeakIndex].couplingConstantHz} Hz
                  </span>
                </>
              )}
              <div className="text-slate-300 mt-1">
                Gán tín hiệu: <strong>{activeSignals[selectedPeakIndex].assignmentVI}</strong>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[11px] font-mono border border-slate-700">
                Tỉ lệ Pascal: [{activeSignals[selectedPeakIndex].pascalRatio.join(':')}]
              </span>
            </div>
          </div>
        )}
      </div>

      {/* PEDAGOGICAL TABS */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          {[
            { id: 'spectrum', label: '📊 Tách Chùm n+1 & Pascal', icon: '📐' },
            { id: 'symmetry', label: '⚖️ Tính Đối Xứng & Môi Trường', icon: '🔄' },
            { id: 'fid', label: '🌊 Xung RF & Free Induction Decay (FID)', icon: '⚡' },
            { id: 'solver', label: '🧠 AI Suy Luận Nhóm Chức NMR', icon: '🧪' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playPhotodetectorBeep?.();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: SPECTRUM & PASCAL MULTIPLET */}
        {activeTab === 'spectrum' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                📐 Quy Tắc Ghép Spin Vô Hướng (n + 1) & Tam Giác Pascal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Khi hai nhóm proton ở vị trí lân cận (vicinal ³J) có spin khác nhau, từ trường của n proton lân cận sẽ định hướng thuận hoặc nghịch với từ trường ngoài theo phân bố nhị thức, chia tín hiệu thành <strong>(n + 1)</strong> vạch:
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-200">Singlet (s)</div>
                  <div className="text-[11px] text-slate-400">n = 0</div>
                  <div className="font-mono text-cyan-400 font-bold mt-1">1</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-200">Doublet (d)</div>
                  <div className="text-[11px] text-slate-400">n = 1</div>
                  <div className="font-mono text-cyan-400 font-bold mt-1">1 : 1</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-200">Triplet (t)</div>
                  <div className="text-[11px] text-slate-400">n = 2</div>
                  <div className="font-mono text-cyan-400 font-bold mt-1">1 : 2 : 1</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-200">Quartet (q)</div>
                  <div className="text-[11px] text-slate-400">n = 3</div>
                  <div className="font-mono text-cyan-400 font-bold mt-1">1 : 3 : 3 : 1</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                💡 <strong>Dấu ấn kinh điển của nhóm Etyl (-CH2-CH3):</strong> Nhóm metyl (-CH3, 3H) đứng cạnh -CH2- nên bị tách thành <em>triplet (1:2:1)</em> ở trường cao; nhóm metylen (-CH2-, 2H) đứng cạnh -CH3 nên bị tách thành <em>quartet (1:3:3:1)</em> ở trường thấp!
              </div>
            </div>

            {/* Peak List Table */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                📋 Bảng Tọa Độ Tín Hiệu NMR Của {compound.name}
              </h3>
              <div className="overflow-x-auto max-h-[170px] overflow-y-auto">
                <table className="w-full text-left text-xs text-slate-300 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-1.5">δ (ppm)</th>
                      <th className="p-1.5">Tách chùm</th>
                      <th className="p-1.5">Tích phân</th>
                      <th className="p-1.5">Gán nhóm chức</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSignals.map((sig, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-800/50 hover:bg-slate-800/40 cursor-pointer ${
                          selectedPeakIndex === idx ? 'bg-cyan-950/40 text-cyan-300' : ''
                        }`}
                        onClick={() => setSelectedPeakIndex(idx)}
                      >
                        <td className="p-1.5 font-mono font-bold">{sig.deltaPpm.toFixed(2)}</td>
                        <td className="p-1.5 font-mono">{sig.multiplicity}</td>
                        <td className="p-1.5 font-mono">{sig.integrationProtons}H</td>
                        <td className="p-1.5 truncate max-w-[160px]">{sig.assignmentVI}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SYMMETRY & EQUIVALENCE */}
        {activeTab === 'symmetry' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-lg font-bold">
                ⚖️
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Tính Đối Xứng Phân Tử & Môi Trường Hóa Học Tương Đương
                </h3>
                <p className="text-xs text-slate-400">
                  Phân tích cấu trúc phân tử của {compound.name} ({compound.chemicalFormula})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400">Tổng Số Nguyên Tử</div>
                <div className="text-lg font-mono font-bold text-slate-200 mt-1">
                  {compound.totalProtons}H & {compound.totalCarbons}C
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400">Môi Trường ¹H Độc Nhất</div>
                <div className="text-lg font-mono font-bold text-cyan-400 mt-1">
                  {compound.uniqueProtonEnvironments} Tín Hiệu
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400">Môi Trường ¹³C Độc Nhất</div>
                <div className="text-lg font-mono font-bold text-amber-400 mt-1">
                  {compound.uniqueCarbonEnvironments} Tín Hiệu
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-purple-300">✨ Đặc trưng đối xứng:</div>
              <p className="leading-relaxed">{compound.symmetryDescriptionVI}</p>
              <p className="leading-relaxed text-slate-400">{compound.descriptionVI}</p>
            </div>
          </div>
        )}

        {/* TAB 3: FID & FOURIER TRANSFORM */}
        {activeTab === 'fid' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  🌊 Tín Hiệu Suy Giảm Tự Do FID (Free Induction Decay) & Biến Đổi Fourier (FT)
                </h3>
                <p className="text-xs text-slate-400">
                  Chuyển đổi tín hiệu miền thời gian S(t) sang miền tần số S(ω) bằng thuật toán Fourier nhanh (FFT).
                </p>
              </div>
              <button
                onClick={handlePulseRf}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>⚡ Bắn Xung Lại</span>
              </button>
            </div>

            {/* FID Waveform Canvas */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg viewBox="0 0 600 120" className="w-full h-[120px]">
                {/* Center baseline */}
                <line x1="10" y1="60" x2="590" y2="60" stroke="#334155" strokeWidth="1" />
                {/* Damped composite sine wave */}
                <path
                  d={Array.from({ length: 120 })
                    .map((_, i) => {
                      const t = i / 120;
                      const env = Math.exp(-t * 4); // Exponential decay e^(-t/T2*)
                      // Beat frequency of 2 chemical shifts
                      const val = env * (Math.sin(t * 50) * 0.7 + Math.cos(t * 110) * 0.3);
                      const x = 10 + t * 580;
                      const y = 60 - val * 45;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={isRfPulsing ? '#f43f5e' : '#38bdf8'}
                  strokeWidth="1.8"
                />
              </svg>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>t = 0 (Ngay sau xung 90°)</span>
                <span>Miền thời gian: S(t) = ∑ Aᵢ·cos(2π·Δνᵢ·t)·e^(-t/T₂*)</span>
                <span>t = Thu nhận xong</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-semibold text-cyan-300">1. Xung 90° Radiofrequency:</span>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  Làm nghiêng vectơ từ độ tổng hợp M₀ từ trục z xuống mặt phẳng ngang xy, tạo ra sự quay đồng pha của các spin hạt nhân.
                </p>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-semibold text-emerald-300">2. Độ hồi phục ngang T₂* (Dephasing):</span>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  Do từ trường cục bộ không đồng nhất, các spin bị mất pha dần làm biên độ sóng suy giảm theo hàm mũ, sinh ra phổ vạch sau biến đổi Fourier.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI STRUCTURE ELUCIDATION SOLVER */}
        {activeTab === 'solver' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                🧠 Bộ Giải Mã Cấu Trúc Hóa Học Bằng Phổ ¹H NMR (AI Structure Solver)
              </h3>
              <p className="text-xs text-slate-400">
                Nhập danh sách độ dịch chuyển hóa học δ quan sát được (cách nhau bởi dấu phẩy) để hệ thống nhận dạng nhóm chức.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customPpmInput}
                onChange={(e) => setCustomPpmInput(e.target.value)}
                placeholder="Ví dụ: 1.25, 3.69 hoặc 2.10, 11.85 hoặc 2.34, 7.20"
                className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-mono focus:ring-2 focus:ring-cyan-500 outline-none"
              />
              <button
                onClick={() => setCustomPpmInput('1.25, 3.69')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono"
              >
                Mẫu Etyl
              </button>
              <button
                onClick={() => setCustomPpmInput('2.10, 11.85')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono"
              >
                Mẫu Axit
              </button>
              <button
                onClick={() => setCustomPpmInput('2.34, 7.20')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono"
              >
                Mẫu Aren
              </button>
            </div>

            {/* Analysis Output */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <span>🔎 Kết quả giải mã cấu trúc:</span>
              </div>
              {solverResults.summaryVI.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {solverResults.summaryVI.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✔</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">Chưa nhận diện được nhóm chức điển hình từ các giá trị này.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
