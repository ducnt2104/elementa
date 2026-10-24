// src/components/visualizations/MassSpectrometryVisualizer.tsx
// Interactive Mass Spectrometry (MS) & Isotope Pattern Analysis Visualizer
// Conforms to Vietnam GDPT 2018 (Hóa 10: Đồng vị & Hóa 11: Phổ khối lượng xác định CTPT) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Layers,
  Sparkles,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  Atom,
  Eye,
  Info,
  Scale,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  MASS_SPEC_CATALOG,
  MassSpecCompound,
  MassSpecPeak,
  checkNitrogenRule,
  estimateCarbonCountFromMPlusOne,
  calculateHalogenIsotopePattern,
  calculateMassAccuracyPpm,
  matchHRMSFormulaCandidates
} from '../../domain/massSpectrometryEngine';
import { sound } from '../../audio/soundEngine';

export interface MassSpectrometryVisualizerProps {
  initialCompoundId?: string;
  className?: string;
}

export const MassSpectrometryVisualizer: React.FC<MassSpectrometryVisualizerProps> = ({
  initialCompoundId = 'toluene',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'MASS_SPECTRUM' | 'ISOTOPE_PATTERNS' | 'NITROGEN_RULE_FRAGMENTS' | 'HRMS_TCG'>('MASS_SPECTRUM');

  // Tab 1: Spectrum Compound Selection & Interactive Peak Selection
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>(initialCompoundId);
  const currentCompound: MassSpecCompound = useMemo(() => {
    return MASS_SPEC_CATALOG[selectedCompoundId] || MASS_SPEC_CATALOG.toluene;
  }, [selectedCompoundId]);

  const [selectedPeak, setSelectedPeak] = useState<MassSpecPeak | null>(null);

  // Tab 2: Halogen Isotope Clustering & 13C Satellite Estimator
  const [numChlorine, setNumChlorine] = useState<number>(currentCompound.halogenType === 'CHLORINE' ? 1 : 0);
  const [numBromine, setNumBromine] = useState<number>(currentCompound.halogenType === 'BROMINE' ? 1 : 0);
  const [mPeakIntensity, setMPeakIntensity] = useState<number>(68.0);
  const [mPlusOneIntensity, setMPlusOneIntensity] = useState<number>(5.2);

  // Tab 3: Nitrogen Rule Tester
  const [testNominalMass, setTestNominalMass] = useState<number>(currentCompound.nominalMass);
  const [testNitrogenCount, setTestNitrogenCount] = useState<number>(currentCompound.nitrogenCount);

  // Tab 4: HRMS Exact Mass Defect Tester
  const [observedExactMz, setObservedExactMz] = useState<number>(44.0262);
  const [ppmTolerance, setPpmTolerance] = useState<number>(10.0);

  // Audio Triggers
  const handleHumSound = () => {
    sound.playMassSpecIonTrapHum();
  };

  const handleDetectorClick = () => {
    sound.playDetectorIonHitClick();
  };

  // Calculations
  const halogenClusters = useMemo(() => {
    return calculateHalogenIsotopePattern(numChlorine, numBromine);
  }, [numChlorine, numBromine]);

  const carbonEstimate = useMemo(() => {
    return estimateCarbonCountFromMPlusOne(mPeakIntensity, mPlusOneIntensity);
  }, [mPeakIntensity, mPlusOneIntensity]);

  const nitrogenRuleResult = useMemo(() => {
    return checkNitrogenRule(testNominalMass, testNitrogenCount);
  }, [testNominalMass, testNitrogenCount]);

  const hrmsCandidates = useMemo(() => {
    return matchHRMSFormulaCandidates(observedExactMz, ppmTolerance);
  }, [observedExactMz, ppmTolerance]);

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-750 rounded-xl overflow-hidden shadow-2xl text-slate-100 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-800/90 border-b border-slate-700/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Phổ Khối Lượng & Phân Tích Cụm Đồng Vị (MS)
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                m/z & [M]⁺•
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Xác định phân tử khối, mảnh phân ly đặc trưng, quy tắc Nitơ & chùm đồng vị halogen (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Audio buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleHumSound}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-650 text-slate-200 border border-slate-600 transition"
            title="Nghe tiếng buồng ion hóa và bẫy tần số vô tuyến RF (Ion Trap Hum)"
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            Bẫy Ion RF
          </button>
          <button
            onClick={handleDetectorClick}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-700 hover:bg-emerald-650 text-white border border-emerald-500/50 transition shadow"
            title="Đầu dò ống nhân electron nhân dòng ion (Electron Multiplier Click)"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-300" />
            Đầu Dò Ion
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-700/70 bg-slate-850 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveTab('MASS_SPECTRUM'); handleHumSound(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'MASS_SPECTRUM'
              ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Activity className="w-4 h-4" />
          1. Đồ Thị Phổ Khối Lượng
        </button>

        <button
          onClick={() => { setActiveTab('ISOTOPE_PATTERNS'); handleDetectorClick(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'ISOTOPE_PATTERNS'
              ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          2. Cụm Đồng Vị & Halogen
        </button>

        <button
          onClick={() => { setActiveTab('NITROGEN_RULE_FRAGMENTS'); handleHumSound(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'NITROGEN_RULE_FRAGMENTS'
              ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Scale className="w-4 h-4" />
          3. Quy Tắc Nitơ & Mảnh Vỡ
        </button>

        <button
          onClick={() => { setActiveTab('HRMS_TCG'); handleDetectorClick(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'HRMS_TCG'
              ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          4. HRMS Độ Phân Giải Cao & TCG
        </button>
      </div>

      {/* BODY */}
      <div className="p-4 md:p-6 space-y-6">
        {/* COMMON COMPOUND PICKER */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hợp Chất Mẫu (GDPT 2018):</span>
            <select
              value={selectedCompoundId}
              onChange={(e) => {
                const newId = e.target.value;
                setSelectedCompoundId(newId);
                const comp = MASS_SPEC_CATALOG[newId];
                setSelectedPeak(null);
                setNumChlorine(comp.halogenType === 'CHLORINE' ? (comp.id === 'dichloromethane' ? 2 : 1) : 0);
                setNumBromine(comp.halogenType === 'BROMINE' ? 1 : 0);
                setTestNominalMass(comp.nominalMass);
                setTestNitrogenCount(comp.nitrogenCount);
                sound.playMassSpecIonTrapHum();
              }}
              className="bg-slate-900 border border-slate-600 rounded-md px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            >
              {Object.values(MASS_SPEC_CATALOG).map((cmp) => (
                <option key={cmp.id} value={cmp.id}>
                  {cmp.chemicalFormula} — {cmp.vietnameseName} (M = {cmp.nominalMass}, {cmp.curriculumGrade})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/40 font-mono">
              [M]⁺• = m/z {currentCompound.molecularIonMz}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-700/40 font-mono">
              Đỉnh cơ bản (Base) = m/z {currentCompound.basePeakMz} (100%)
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              Khối lượng chính xác: {currentCompound.exactMassDa.toFixed(4)} Da
            </span>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE MASS STICK SPECTRUM */}
        {activeTab === 'MASS_SPECTRUM' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Interactive SVG Stick Spectrum */}
            <div className="lg:col-span-8 space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">
                    Phổ Khối Lượng Electron Ionization (EI 70 eV)
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    Nhấp vào đỉnh để xem cơ chế phân mảnh
                  </span>
                </div>

                {/* SVG Stick Spectrum */}
                <svg viewBox="0 0 600 280" className="w-full h-64 select-none">
                  {/* Background grid lines */}
                  {[0, 25, 50, 75, 100].map((val) => {
                    const y = 230 - (val / 100) * 190;
                    return (
                      <g key={val}>
                        <line x1="50" y1={y} x2="570" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="42" y={y + 4} fontSize="9" fill="#64748b" textAnchor="end">
                          {val}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  <line x1="50" y1="230" x2="570" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="230" x2="50" y2="35" stroke="#475569" strokeWidth="1.5" />

                  <text x="310" y="265" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">
                    Tỷ số khối lượng trên điện tích (m/z)
                  </text>
                  <text x="18" y="130" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 18 130)">
                    Cường độ tương đối (%)
                  </text>

                  {/* Spectrum Sticks */}
                  {(() => {
                    const maxMz = Math.max(160, currentCompound.molecularIonMz + 20);
                    const minMz = 10;
                    const plotWidth = 510;

                    return currentCompound.peaks.map((peak, idx) => {
                      const x = 50 + ((peak.mz - minMz) / (maxMz - minMz)) * plotWidth;
                      const yTop = 230 - (peak.relativeIntensityPct / 100) * 190;
                      const isSelected = selectedPeak?.mz === peak.mz;

                      // Peak Color by type
                      let strokeColor = '#38bdf8'; // Default fragment cyan
                      if (peak.peakType === 'BASE_PEAK') strokeColor = '#10b981'; // Green
                      else if (peak.peakType === 'MOLECULAR_ION') strokeColor = '#f59e0b'; // Amber
                      else if (peak.peakType === 'M_PLUS_2') strokeColor = '#a855f7'; // Purple (Halogen)

                      return (
                        <g
                          key={idx}
                          className="cursor-pointer group"
                          onClick={() => {
                            setSelectedPeak(peak);
                            sound.playDetectorIonHitClick();
                          }}
                        >
                          {/* Hit Area */}
                          <rect x={x - 6} y="35" width="12" height="195" fill="transparent" />

                          {/* Stick Line */}
                          <line
                            x1={x}
                            y1="230"
                            x2={x}
                            y2={yTop}
                            stroke={isSelected ? '#ffffff' : strokeColor}
                            strokeWidth={isSelected ? '3.5' : '2'}
                            className="transition-all"
                          />

                          {/* Top Marker */}
                          <circle
                            cx={x}
                            cy={yTop}
                            r={isSelected ? 4 : 2.5}
                            fill={isSelected ? '#ffffff' : strokeColor}
                          />

                          {/* Label on top */}
                          <text
                            x={x}
                            y={yTop - 6}
                            fontSize={isSelected ? '10' : '8'}
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            fill={isSelected ? '#ffffff' : '#94a3b8'}
                            textAnchor="middle"
                          >
                            {peak.mz}
                          </text>
                        </g>
                      );
                    });
                  })()}
                </svg>
              </div>

              {/* Peak Detail Inspector Card */}
              {selectedPeak ? (
                <div className="bg-slate-800/90 p-4 rounded-xl border border-emerald-500/40 space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono">
                        m/z = {selectedPeak.mz}
                      </span>
                      <span className="text-slate-300 font-mono">[{selectedPeak.ionFormula}]</span>
                    </span>
                    <span className="font-mono text-cyan-300 font-bold">
                      Cường độ: {selectedPeak.relativeIntensityPct.toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="text-[10px] text-slate-400">Phân loại đỉnh:</div>
                      <div className="font-semibold text-emerald-300 text-[11px]">{selectedPeak.peakType}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="text-[10px] text-slate-400">Mảnh trung hòa bị mất:</div>
                      <div className="font-semibold text-amber-300 text-[11px]">{selectedPeak.lossFragment || 'Không có (Ion nguyên vẹn)'}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750 col-span-2 md:col-span-1">
                      <div className="text-[10px] text-slate-400">Khối lượng chính xác:</div>
                      <div className="font-mono text-cyan-300 text-[11px]">{selectedPeak.exactMz.toFixed(4)} Da</div>
                    </div>
                  </div>

                  {selectedPeak.mechanism && (
                    <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-750">
                      <span className="font-semibold text-emerald-400">Cơ chế hình thành: </span>
                      {selectedPeak.mechanism}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs text-slate-400 text-center italic">
                  Nhấp vào bất kỳ vạch phổ nào trên đồ thị để mở chi tiết mảnh phân ly ion và cơ chế cắt mạch.
                </div>
              )}
            </div>

            {/* Right 4 Cols: Compound Metadata & Fragmentation Steps */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Atom className="w-4 h-4 text-emerald-400" />
                    Đặc Điểm Phân Tử
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                    M = {currentCompound.nominalMass}
                  </span>
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCompound.description}
                </p>

                <div className="pt-2 border-t border-slate-700/60 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Các Con Đường Phân Mảnh Chính:</div>
                  <div className="space-y-1.5">
                    {currentCompound.fragmentations.map((frag, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-750 text-[11px] space-y-1">
                        <div className="flex justify-between font-mono text-cyan-300 font-bold">
                          <span>m/z {frag.precursorMz} → {frag.productMz}</span>
                          <span className="text-amber-400">Mất {frag.neutralLossFormula} ({frag.neutralLossDa} Da)</span>
                        </div>
                        <div className="text-slate-300">{frag.nameVI}</div>
                        <div className="text-[10px] text-slate-500">{frag.mechanism}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ISOTOPE PATTERNS (HALOGEN & 13C) */}
        {activeTab === 'ISOTOPE_PATTERNS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: Halogen Binomial Cluster Generator */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Mô Phỏng Chùm Đồng Vị Halogen (Cl / Br)
                  </h4>
                  <span className="text-xs font-mono text-purple-300">
                    Nhị thức (p + q)ⁿ
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Đồng vị Clo gồm <code className="text-cyan-300 font-bold">³⁵Cl (75.8%)</code> và <code className="text-purple-300 font-bold">³⁷Cl (24.2%)</code> tạo tỷ lệ chuẩn <strong className="text-white">3 : 1</strong>. Đồng vị Brom gồm <code className="text-amber-300 font-bold">⁷⁹Br (50.7%)</code> và <code className="text-rose-300 font-bold">⁸¹Br (49.3%)</code> tạo tỷ lệ chuẩn <strong className="text-white">1 : 1</strong>.
                </p>

                {/* Halogen Selectors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Số nguyên tử Clo (Cl):</label>
                    <select
                      value={numChlorine}
                      onChange={(e) => {
                        setNumChlorine(parseInt(e.target.value));
                        sound.playDetectorIonHitClick();
                      }}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white"
                    >
                      <option value="0">0 Clo (Không có)</option>
                      <option value="1">1 Clo (Tỷ lệ 3 : 1)</option>
                      <option value="2">2 Clo (Tỷ lệ 9 : 6 : 1)</option>
                      <option value="3">3 Clo (Tỷ lệ 27 : 27 : 9 : 1)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Số nguyên tử Brom (Br):</label>
                    <select
                      value={numBromine}
                      onChange={(e) => {
                        setNumBromine(parseInt(e.target.value));
                        sound.playDetectorIonHitClick();
                      }}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white"
                    >
                      <option value="0">0 Brom (Không có)</option>
                      <option value="1">1 Brom (Tỷ lệ 1 : 1)</option>
                      <option value="2">2 Brom (Tỷ lệ 1 : 2 : 1)</option>
                    </select>
                  </div>
                </div>

                {/* Halogen Cluster Visualizer Bars */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    Phổ Cụm Đồng Vị Lý Thuyết:
                  </div>

                  <div className="space-y-2">
                    {halogenClusters.map((cluster, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-purple-300 font-bold">
                            {cluster.deltaM === 0 ? '[M]' : `[M + ${cluster.deltaM}]`}
                          </span>
                          <span className="text-slate-300">
                            {cluster.relativeIntensityPct.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${cluster.relativeIntensityPct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: 13C Satellite Rule of Thumb Calculator */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Xác Định Số Cacbon Qua Vệ Tinh ¹³C ([M+1])
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-300 font-mono">
                    n_C ≈ [M+1] / (0.011 · [M])
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Vì đồng vị tự nhiên <code className="text-amber-300 font-bold">¹³C chiếm 1.07% (≈ 1.1%)</code> tổng lượng cacbon, tỷ số cường độ giữa đỉnh vệ tinh [M+1] và đỉnh phân tử [M] phản ánh trực tiếp số lượng nguyên tử Cacbon trong công thức phân tử.
                </p>

                {/* Sliders for [M] and [M+1] */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Cường độ đỉnh [M] (%):</span>
                      <span className="font-mono text-cyan-300 font-bold">{mPeakIntensity.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="1"
                      value={mPeakIntensity}
                      onChange={(e) => setMPeakIntensity(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Cường độ đỉnh vệ tinh [M+1] (%):</span>
                      <span className="font-mono text-amber-300 font-bold">{mPlusOneIntensity.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="20"
                      step="0.1"
                      value={mPlusOneIntensity}
                      onChange={(e) => setMPlusOneIntensity(parseFloat(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>

                {/* Output Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-750 space-y-2">
                  <div className="text-xs text-slate-400">Kết quả ước tính số nguyên tử C:</div>
                  <div className="text-2xl font-mono font-bold text-amber-300">
                    n_C = {carbonEstimate.estimatedCarbons} nguyên tử Cacbon
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{carbonEstimate.formulaConfidence}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NITROGEN RULE & COMMON NEUTRAL LOSSES */}
        {activeTab === 'NITROGEN_RULE_FRAGMENTS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Nitrogen Rule Interactive Tester */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    Quy Tắc Nitơ (The Nitrogen Rule)
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono">
                    Parity Rule
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Vì nguyên tử Nitơ có hóa trị lẻ (3) nhưng khối lượng nguyên tử chẵn (14), một phân tử hữu cơ trung hòa chứa <strong className="text-emerald-300">số chẵn nguyên tử N (0, 2, 4...) luôn có phân tử khối CHẴN</strong>; nếu chứa <strong className="text-amber-300">số lẻ nguyên tử N (1, 3, 5...) luôn có phân tử khối LẺ</strong>.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Phân tử khối danh nghĩa (Nominal M):</span>
                      <span className="font-mono text-cyan-300 font-bold">{testNominalMass} Da ({testNominalMass % 2 === 0 ? 'CHẴN' : 'LẺ'})</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="180"
                      step="1"
                      value={testNominalMass}
                      onChange={(e) => setTestNominalMass(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Số nguyên tử Nitơ trong phân tử:</span>
                      <span className="font-mono text-emerald-300 font-bold">{testNitrogenCount} N</span>
                    </div>
                    <select
                      value={testNitrogenCount}
                      onChange={(e) => setTestNitrogenCount(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white"
                    >
                      <option value="0">0 nguyên tử N (Số chẵn)</option>
                      <option value="1">1 nguyên tử N (Số lẻ - ví dụ Aniline 93)</option>
                      <option value="2">2 nguyên tử N (Số chẵn - ví dụ Urea 60)</option>
                      <option value="3">3 nguyên tử N (Số lẻ)</option>
                    </select>
                  </div>
                </div>

                {/* Validation Banner */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  nitrogenRuleResult.satisfiesRule
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}>
                  {nitrogenRuleResult.satisfiesRule ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs space-y-1">
                    <div className="font-bold">
                      {nitrogenRuleResult.satisfiesRule ? 'HỢP LỆ VỚI QUY TẮC NITƠ' : 'VI PHẠM QUY TẮC NITƠ'}
                    </div>
                    <div className="text-[11px] leading-relaxed">
                      {nitrogenRuleResult.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Neutral Losses Matrix */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Bảng Mảnh Mất Trung Hòa Phổ Biến (Neutral Loss Table)
                </h4>

                <div className="overflow-x-auto rounded-lg border border-slate-700">
                  <table className="w-full text-[11px] text-left">
                    <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-700">
                      <tr>
                        <th className="px-3 py-2">Δm (Da)</th>
                        <th className="px-3 py-2">Mảnh Trung Hòa</th>
                        <th className="px-3 py-2">Ý Nghĩa Cấu Trúc</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950/60 font-mono">
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-amber-300 font-bold">M - 15</td>
                        <td className="px-3 py-1.5 text-cyan-300">•CH₃</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Mất gốc metyl (nhánh hoặc este metyl)</td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-amber-300 font-bold">M - 18</td>
                        <td className="px-3 py-1.5 text-cyan-300">H₂O</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Tách nước từ ancol hoặc axit cacboxylic</td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-amber-300 font-bold">M - 28</td>
                        <td className="px-3 py-1.5 text-cyan-300">CO hoặc C₂H₄</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Mất cacbonyl hoặc etilen (McLafferty)</td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-amber-300 font-bold">M - 35/37</td>
                        <td className="px-3 py-1.5 text-cyan-300">•Cl</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Đứt liên kết C-Cl trong dẫn xuất halogen</td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-amber-300 font-bold">M - 45</td>
                        <td className="px-3 py-1.5 text-cyan-300">•OCH₂CH₃ / •COOH</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Mất gốc etoxy hoặc nhóm cacboxyl</td>
                      </tr>
                      <tr className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-emerald-300 font-bold">m/z = 91</td>
                        <td className="px-3 py-1.5 text-cyan-300">C₇H₇⁺ (Tropylium)</td>
                        <td className="px-3 py-1.5 text-slate-300 font-sans">Đặc trưng của hợp chất chứa vòng benzyl</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HRMS RESOLVING POWER & TCG TACTICAL RECON */}
        {activeTab === 'HRMS_TCG' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: HRMS Mass Defect Separator */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Khối Phổ Phân Giải Cao (HRMS & Độ Hụt Khối Mass Defect)
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono">
                    R &gt; 10,000
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Ở khối phổ thông thường (Low-Res MS), 4 chất <strong className="text-white">CO₂, N₂O, C₂H₄O, C₃H₈</strong> đều có cùng khối lượng danh nghĩa <code className="text-amber-300 font-bold">m/z = 44</code>. Tuy nhiên thiết bị HRMS (Orbitrap / Q-TOF) đo tới 4 chữ số thập phân sẽ phân giải chính xác sự khác biệt về độ hụt khối hạt nhân:
                </p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Giá trị m/z thực nghiệm quan sát được:</span>
                      <span className="font-mono text-cyan-300 font-bold">{observedExactMz.toFixed(4)} Da</span>
                    </div>
                    <input
                      type="range"
                      min="43.9800"
                      max="44.0700"
                      step="0.0005"
                      value={observedExactMz}
                      onChange={(e) => setObservedExactMz(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Độ dung sai cho phép (ppm tolerance):</span>
                      <span className="font-mono text-emerald-300 font-bold">±{ppmTolerance.toFixed(1)} ppm</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="30.0"
                      step="1.0"
                      value={ppmTolerance}
                      onChange={(e) => setPpmTolerance(parseFloat(e.target.value))}
                      className="w-full accent-emerald-400"
                    />
                  </div>
                </div>

                {/* Candidate Matches */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Ứng Viên Khớp Với m/z Thực Nghiệm:</div>
                  {hrmsCandidates.length > 0 ? (
                    <div className="space-y-1.5">
                      {hrmsCandidates.map((cand, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-750 flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="font-bold text-white">{cand.formula}</span>
                            <span className="text-slate-400 ml-2">({cand.exactMassDa.toFixed(4)} Da)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              cand.deltaPpm <= 5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-amber-950 text-amber-300 border border-amber-600'
                            }`}>
                              Δ = {cand.deltaPpm.toFixed(1)} ppm
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-750 text-xs text-amber-400 text-center italic">
                      Không tìm thấy công thức ứng viên nào trong giới hạn ±{ppmTolerance} ppm. Hãy điều chỉnh thanh trượt.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: TCG / MOBA Tactical Mechanic */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 p-5 rounded-xl border border-emerald-700/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Hiệu Ứng Thẻ Bài & Trinh Sát MS
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    Mass Spec Scan
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Trong ELEMENTA, năng lực Quét Phổ Khối (Mass Spectrometric Identification) phân tích cấu trúc nguyên tử của đối thủ ở cấp độ lượng tử:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/90 border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-300">Phá Khiên Phân Tử (-25% Magic Resistance):</span>
                      <p className="text-[11px] text-slate-400">Tia bắn phá 70 eV làm suy yếu liên kết của lớp giáp hóa học đối phương.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300">Chí Mạng Điểm Yếu Cắt α (+30% Crit):</span>
                      <p className="text-[11px] text-slate-400">Xác định chính xác vị trí liên kết C-C yếu nhất để tung đòn kết liễu.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Phát Hiện Dị Tố Halogen & Nitơ:</span>
                      <p className="text-[11px] text-slate-400">Tự động nhận diện thành phần Clo/Brom/Nitơ của đối thủ, kích hoạt combo đối kháng tương khắc.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playMassSpecIonTrapHum();
                      setTimeout(() => sound.playDetectorIonHitClick(), 200);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-550 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Bắn Phá Ion Hóa EI 70 eV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
