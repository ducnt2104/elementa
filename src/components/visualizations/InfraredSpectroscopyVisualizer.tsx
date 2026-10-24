// src/components/visualizations/InfraredSpectroscopyVisualizer.tsx
// Interactive Infrared Spectroscopy (IR) & Molecular Vibration Visualizer
// Conforms to Vietnam GDPT 2018 (Hóa 11: Phổ hồng ngoại xác định nhóm chức) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Activity,
  Waves,
  Eye,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Scale,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  IR_BENCHMARK_CATALOG,
  IR_DIAGNOSTIC_REGIONS,
  IRCompound,
  IRBandDef,
  calculateHarmonicWaveNumber,
  calculateVibrationalDegreesOfFreedom,
  calculateIsotopeVibrationShift,
  identifyFunctionalGroupsFromPeaks
} from '../../domain/infraredSpectroscopyEngine';
import { sound } from '../../audio/soundEngine';

export interface InfraredSpectroscopyVisualizerProps {
  initialCompoundId?: string;
  className?: string;
}

export const InfraredSpectroscopyVisualizer: React.FC<InfraredSpectroscopyVisualizerProps> = ({
  initialCompoundId = 'ethanol',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'IR_SPECTRUM' | 'HOOKE_LAW' | 'DIAGNOSTIC_REGIONS' | 'VIBRATION_MODES_TCG'>('IR_SPECTRUM');

  // Tab 1: Compound & Peak Selection
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>(initialCompoundId);
  const currentCompound: IRCompound = useMemo(() => {
    return IR_BENCHMARK_CATALOG[selectedCompoundId] || IR_BENCHMARK_CATALOG.ethanol;
  }, [selectedCompoundId]);

  const [selectedPeak, setSelectedPeak] = useState<IRBandDef | null>(null);

  // Tab 2: Hooke's Law Physical Parameters
  const [mass1Amu, setMass1Amu] = useState<number>(12); // Carbon
  const [mass2Amu, setMass2Amu] = useState<number>(1); // Hydrogen
  const [bondOrder, setBondOrder] = useState<1 | 2 | 3>(1); // Single

  // Tab 3: Interactive Functional Group Peak Finder
  const [inputWn1, setInputWn1] = useState<number>(1715);
  const [inputWn2, setInputWn2] = useState<number>(3350);

  // Tab 4: Vibrational Degrees of Freedom
  const [atomCount, setAtomCount] = useState<number>(currentCompound.atomCount);
  const [isLinear, setIsLinear] = useState<boolean>(currentCompound.isLinear);

  // Calculations
  const calculatedWaveNumber = useMemo(() => {
    return calculateHarmonicWaveNumber(mass1Amu, mass2Amu, bondOrder);
  }, [mass1Amu, mass2Amu, bondOrder]);

  const chToCdShift = useMemo(() => {
    const muCH = (12 * 1) / 13;
    const muCD = (12 * 2) / 14;
    return calculateIsotopeVibrationShift(calculatedWaveNumber, muCH, muCD);
  }, [calculatedWaveNumber]);

  const groupIdentification = useMemo(() => {
    return identifyFunctionalGroupsFromPeaks([inputWn1, inputWn2]);
  }, [inputWn1, inputWn2]);

  const degreesOfFreedom = useMemo(() => {
    return calculateVibrationalDegreesOfFreedom(atomCount, isLinear);
  }, [atomCount, isLinear]);

  // Audio Triggers
  const handleLaserChirp = () => {
    sound.playInfraredLaserChirp();
  };

  const handleHarmonicChime = () => {
    sound.playMolecularVibrationHarmonic();
  };

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-750 rounded-xl overflow-hidden shadow-2xl text-slate-100 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-800/90 border-b border-slate-700/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Quang Phổ Hồng Ngoại & Dao Động Phân Tử (IR)
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/50">
                4000 - 400 cm⁻¹
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Định luật Hooke k/μ, nhận diện nhóm chức O-H, C=O, N-H & vùng điểm chỉ (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Audio buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLaserChirp}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-650 text-slate-200 border border-slate-600 transition"
            title="Nghe tiếng giao thoa kế Michelson quét tia laser He-Ne (FTIR Laser Chirp)"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            Laser FTIR
          </button>
          <button
            onClick={handleHarmonicChime}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-700 hover:bg-rose-650 text-white border border-rose-500/50 transition shadow"
            title="Cộng hưởng dao động lưỡng cực phân tử (Molecular Dipole Harmonic Chime)"
          >
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            Dao Động Lưỡng Cực
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-700/70 bg-slate-850 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveTab('IR_SPECTRUM'); handleLaserChirp(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'IR_SPECTRUM'
              ? 'border-rose-500 text-rose-300 bg-rose-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Waves className="w-4 h-4" />
          1. Đồ Thị Phổ Hồng Ngoại FTIR
        </button>

        <button
          onClick={() => { setActiveTab('HOOKE_LAW'); handleHarmonicChime(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'HOOKE_LAW'
              ? 'border-rose-500 text-rose-300 bg-rose-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Scale className="w-4 h-4" />
          2. Định Luật Hooke & Hiệu Ứng Khối Lượng
        </button>

        <button
          onClick={() => { setActiveTab('DIAGNOSTIC_REGIONS'); handleLaserChirp(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'DIAGNOSTIC_REGIONS'
              ? 'border-rose-500 text-rose-300 bg-rose-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Eye className="w-4 h-4" />
          3. 4 Vùng Chẩn Đoán Nhóm Chức
        </button>

        <button
          onClick={() => { setActiveTab('VIBRATION_MODES_TCG'); handleHarmonicChime(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'VIBRATION_MODES_TCG'
              ? 'border-rose-500 text-rose-300 bg-rose-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          4. Kiểu Dao Động & Chiến Thuật IR
        </button>
      </div>

      {/* BODY */}
      <div className="p-4 md:p-6 space-y-6">
        {/* COMMON COMPOUND PICKER */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chất Mẫu Phổ IR (GDPT 2018):</span>
            <select
              value={selectedCompoundId}
              onChange={(e) => {
                const newId = e.target.value;
                setSelectedCompoundId(newId);
                const comp = IR_BENCHMARK_CATALOG[newId];
                setSelectedPeak(null);
                setAtomCount(comp.atomCount);
                setIsLinear(comp.isLinear);
                sound.playInfraredLaserChirp();
              }}
              className="bg-slate-900 border border-slate-600 rounded-md px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
            >
              {Object.values(IR_BENCHMARK_CATALOG).map((cmp) => (
                <option key={cmp.id} value={cmp.id}>
                  {cmp.chemicalFormula} — {cmp.vietnameseName} ({cmp.functionalGroupVI})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-700/50 font-mono">
              {currentCompound.functionalGroupVI}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              Số bậc tự do dao động: {calculateVibrationalDegreesOfFreedom(currentCompound.atomCount, currentCompound.isLinear)} (3N - 6)
            </span>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE FTIR TRANSMITTANCE SPECTRUM */}
        {activeTab === 'IR_SPECTRUM' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: FTIR Curve */}
            <div className="lg:col-span-8 space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">
                    Phổ Truyền Qua Hồng Ngoại FTIR (%Transmittance vs Số sóng cm⁻¹)
                  </span>
                  <span className="text-[11px] text-rose-400 font-mono">
                    Trục số sóng chạy ngược: 4000 cm⁻¹ (Trái) → 400 cm⁻¹ (Phải)
                  </span>
                </div>

                {/* SVG IR Spectrum Plot */}
                <svg viewBox="0 0 620 280" className="w-full h-64 select-none">
                  {/* Background Grid Lines (%T from 0 to 100) */}
                  {[0, 20, 40, 60, 80, 100].map((val) => {
                    const y = 230 - (val / 100) * 190;
                    return (
                      <g key={val}>
                        <line x1="50" y1={y} x2="590" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="42" y={y + 4} fontSize="9" fill="#64748b" textAnchor="end">
                          {val}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Wave Number Tick Marks (4000 to 400 cm⁻¹) */}
                  {[4000, 3500, 3000, 2500, 2000, 1500, 1000, 500].map((wn) => {
                    // Map 4000 cm-1 to x=50, 400 cm-1 to x=590 (inverse mapping!)
                    const x = 50 + ((4000 - wn) / 3600) * 540;
                    return (
                      <g key={wn}>
                        <line x1={x} y1="230" x2={x} y2="235" stroke="#64748b" strokeWidth="1" />
                        <text x={x} y="248" fontSize="8" fill="#64748b" textAnchor="middle">
                          {wn}
                        </text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  <line x1="50" y1="230" x2="590" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="230" x2="50" y2="40" stroke="#475569" strokeWidth="1.5" />

                  <text x="320" y="265" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">
                    Số sóng ν̃ (cm⁻¹)
                  </text>
                  <text x="16" y="135" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 16 135)">
                    Độ truyền qua %T
                  </text>

                  {/* Characteristic Absorption Bands (Dips downward) */}
                  {currentCompound.diagnosticPeaks.map((peak, idx) => {
                    const x = 50 + ((4000 - peak.waveNumberCm) / 3600) * 540;
                    const isBroad = peak.intensity === 'BROAD_STRONG';
                    const dipHeight = isBroad ? 140 : peak.intensity === 'VERY_STRONG' ? 160 : peak.intensity === 'STRONG' ? 120 : 80;
                    const bandWidth = isBroad ? 40 : 12;
                    const yBaseline = 45;
                    const yDip = yBaseline + dipHeight;
                    const isSelected = selectedPeak?.waveNumberCm === peak.waveNumberCm;

                    return (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onClick={() => {
                          setSelectedPeak(peak);
                          sound.playMolecularVibrationHarmonic();
                        }}
                      >
                        {/* Interactive Click Target */}
                        <rect x={x - bandWidth} y="40" width={bandWidth * 2} height="190" fill="transparent" />

                        {/* Parabolic Absorption Dip */}
                        <path
                          d={`M ${x - bandWidth} ${yBaseline} Q ${x} ${yDip} ${x + bandWidth} ${yBaseline}`}
                          fill={isBroad ? 'rgba(244, 63, 94, 0.15)' : 'rgba(251, 191, 36, 0.15)'}
                          stroke={isSelected ? '#ffffff' : isBroad ? '#f43f5e' : '#fbbf24'}
                          strokeWidth={isSelected ? '3' : '2'}
                          className="transition-all"
                        />

                        {/* Bottom Marker */}
                        <circle cx={x} cy={yDip} r={isSelected ? 4 : 2.5} fill={isSelected ? '#ffffff' : '#f43f5e'} />

                        {/* Peak Value Label */}
                        <text
                          x={x}
                          y={yDip + 14}
                          fontSize={isSelected ? '9' : '8'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fill={isSelected ? '#ffffff' : '#cbd5e1'}
                          textAnchor="middle"
                        >
                          {peak.waveNumberCm}
                        </text>
                        <text
                          x={x}
                          y={yDip + 24}
                          fontSize="7"
                          fill={isBroad ? '#fda4af' : '#fef08a'}
                          textAnchor="middle"
                        >
                          {peak.bond}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Peak Inspector Card */}
              {selectedPeak ? (
                <div className="bg-slate-800/90 p-4 rounded-xl border border-rose-500/40 space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500 text-rose-300 font-mono">
                        ν̃ = {selectedPeak.waveNumberCm} cm⁻¹
                      </span>
                      <span className="text-amber-300 font-mono">Liên kết: {selectedPeak.bond}</span>
                    </span>
                    <span className="font-mono text-cyan-300">
                      Khoảng dải: {selectedPeak.minWaveNumberCm} - {selectedPeak.maxWaveNumberCm} cm⁻¹
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="text-[10px] text-slate-400">Kiểu dao động:</div>
                      <div className="font-semibold text-rose-300 text-[11px]">{selectedPeak.vibrationMode}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="text-[10px] text-slate-400">Cường độ vạch:</div>
                      <div className="font-semibold text-amber-300 text-[11px]">{selectedPeak.intensity}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750 col-span-2 md:col-span-1">
                      <div className="text-[10px] text-slate-400">Nhóm chức suy ra:</div>
                      <div className="font-semibold text-cyan-300 text-[11px]">{selectedPeak.functionalGroup}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-750">
                    <span className="font-semibold text-emerald-400">Ý nghĩa chẩn đoán GDPT 2018: </span>
                    {selectedPeak.diagnosticSignificanceVI}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs text-slate-400 text-center italic">
                  Nhấp vào bất kỳ dải lõm hấp thụ nào trên phổ FTIR để xem loại liên kết, kiểu dao động và phân loại nhóm chức.
                </div>
              )}
            </div>

            {/* Right 4 Cols: Compound Details & Diagnostic Signatures */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-rose-400" />
                    Đặc Trưng Quang Phổ
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                    {currentCompound.chemicalFormula}
                  </span>
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCompound.description}
                </p>

                <div className="pt-2 border-t border-slate-700/60 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Các Đỉnh Chẩn Đoán Chính:</div>
                  <div className="space-y-1.5">
                    {currentCompound.diagnosticPeaks.map((peak, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-750 text-[11px] space-y-0.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-rose-300 font-bold">{peak.waveNumberCm} cm⁻¹ ({peak.bond})</span>
                          <span className="text-amber-400 text-[10px]">{peak.intensity}</span>
                        </div>
                        <div className="text-slate-400 text-[10px]">{peak.diagnosticSignificanceVI}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOOKE'S LAW HARMONIC OSCILLATOR & ISOTOPE MASS SHIFT */}
        {activeTab === 'HOOKE_LAW' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: Hooke's Law Calculator */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-rose-400" />
                    Định Luật Hooke Cho Dao Động Phân Tử
                  </h4>
                  <span className="text-xs font-mono text-rose-300">
                    ν̃ = 1/(2πc) · √(k/μ)
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Tần số dao động hóa trị tăng khi độ cứng liên kết <strong className="text-rose-300">k tăng</strong> (Liên kết ba &gt; Đôi &gt; Đơn) và giảm khi khối lượng rút gọn <strong className="text-cyan-300">μ tăng</strong> (nguyên tử nặng dao động chậm hơn).
                </p>

                {/* Parameters */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Bậc liên kết hóa học (Độ cứng lực k):</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setBondOrder(1)}
                        className={`p-2 rounded text-xs font-bold transition ${bondOrder === 1 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'}`}
                      >
                        Đơn (k ≈ 5×10⁵)
                      </button>
                      <button
                        onClick={() => setBondOrder(2)}
                        className={`p-2 rounded text-xs font-bold transition ${bondOrder === 2 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'}`}
                      >
                        Đôi (k ≈ 10×10⁵)
                      </button>
                      <button
                        onClick={() => setBondOrder(3)}
                        className={`p-2 rounded text-xs font-bold transition ${bondOrder === 3 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'}`}
                      >
                        Ba (k ≈ 15×10⁵)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Khối lượng nguyên tử 1 (m₁):</span>
                      <span className="font-mono text-cyan-300 font-bold">{mass1Amu} amu</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="1"
                      value={mass1Amu}
                      onChange={(e) => setMass1Amu(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Khối lượng nguyên tử 2 (m₂):</span>
                      <span className="font-mono text-amber-300 font-bold">{mass2Amu} amu</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="1"
                      value={mass2Amu}
                      onChange={(e) => setMass2Amu(parseInt(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Số sóng dao động lý thuyết tính được:</div>
                  <div className="text-2xl font-mono font-bold text-rose-300">
                    ν̃ ≈ {calculatedWaveNumber} cm⁻¹
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Khối lượng rút gọn: μ = {((mass1Amu * mass2Amu) / (mass1Amu + mass2Amu)).toFixed(3)} amu
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Isotope Mass Shift Demonstration (C-H vs C-D) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Hiệu Ứng Thay Thế Đồng Vị (C-H sang C-D)
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-300 font-mono">
                    Red Shift
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Khi thay thế Hydro (¹H = 1 amu) bằng Đơteri (²H = 2 amu), liên kết hóa học giữ nguyên lực k nhưng khối lượng rút gọn μ tăng lên, làm số sóng dao động dịch chuyển về phía đỏ (tần số thấp hơn) theo tỷ lệ <strong className="text-white">√(μ_D / μ_H) ≈ 1.36</strong>.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Liên kết C-¹H Chuẩn:</div>
                    <div className="text-lg font-mono font-bold text-cyan-300">~ 3030 cm⁻¹</div>
                    <div className="text-[10px] text-slate-500">μ = 0.923 amu</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Liên kết C-²D (Đơteri):</div>
                    <div className="text-lg font-mono font-bold text-rose-300">~ 2220 cm⁻¹</div>
                    <div className="text-[10px] text-slate-500">μ = 1.714 amu (Dịch đỏ ~810 cm⁻¹)</div>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-750 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-400">Ứng dụng thực nghiệm:</div>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Hiện tượng dịch chuyển đồng vị C-D được dùng trong hóa sinh để đánh dấu vị trí nguyên tử và chứng minh cơ chế phản ứng hữu cơ (Kinetic Isotope Effect - KIE).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 4 DIAGNOSTIC REGIONS & FUNCTIONAL GROUP DETECTOR */}
        {activeTab === 'DIAGNOSTIC_REGIONS' && (
          <div className="space-y-6">
            {/* Interactive Functional Group Detector */}
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-rose-400" />
                  Bộ Dò Nhóm Chức Tự Động (Interactive IR Peak Identifier)
                </h4>
                <div className="text-xs text-slate-400">
                  Nhập số sóng hấp thụ quan sát được để máy tự suy luận nhóm chức
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Đỉnh hấp thụ 1 (cm⁻¹):</span>
                    <span className="font-mono text-cyan-300 font-bold">{inputWn1} cm⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="3600"
                    step="10"
                    value={inputWn1}
                    onChange={(e) => setInputWn1(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Đỉnh hấp thụ 2 (cm⁻¹):</span>
                    <span className="font-mono text-rose-300 font-bold">{inputWn2} cm⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="3600"
                    step="10"
                    value={inputWn2}
                    onChange={(e) => setInputWn2(parseInt(e.target.value))}
                    className="w-full accent-rose-400"
                  />
                </div>
              </div>

              {/* Detector Result Output */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">Nhóm chức dự đoán từ phổ hồng ngoại:</div>
                {groupIdentification.detectedGroups.length > 0 ? (
                  <div className="space-y-1.5">
                    {groupIdentification.detectedGroups.map((grp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{grp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-amber-400 italic">
                    Chưa phát hiện nhóm chức đặc trưng phổ biến ở các số sóng này.
                  </div>
                )}
              </div>
            </div>

            {/* 4 Diagnostic Regions Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {IR_DIAGNOSTIC_REGIONS.map((region, idx) => (
                <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-rose-300">{region.vietnameseName}</h5>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                      {region.minWaveNumberCm} - {region.maxWaveNumberCm} cm⁻¹
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {region.descriptionVI}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {region.primaryBonds.map((b, bIdx) => (
                      <span key={bIdx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-750 text-[10px] font-mono text-cyan-300">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MOLECULAR VIBRATION MODES & TCG RECON TACTICS */}
        {activeTab === 'VIBRATION_MODES_TCG' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Degrees of Freedom & Vibration Modes */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Số Bậc Tự Do Dao Động Phân Tử
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono">
                    {isLinear ? '3N - 5 (Thẳng)' : '3N - 6 (Gấp khúc / Phi tuyến)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Số nguyên tử trong phân tử (N):</span>
                      <span className="font-mono text-cyan-300 font-bold">{atomCount}</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="1"
                      value={atomCount}
                      onChange={(e) => setAtomCount(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Hình học không gian:</label>
                    <select
                      value={isLinear ? 'linear' : 'nonlinear'}
                      onChange={(e) => setIsLinear(e.target.value === 'linear')}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white"
                    >
                      <option value="nonlinear">Phi tuyến / Gấp khúc (3N - 6)</option>
                      <option value="linear">Thẳng / Tuyến tính (3N - 5, vd: CO2, C2H2)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Tổng số mốt dao động cơ bản độc lập:</div>
                  <div className="text-2xl font-mono font-bold text-cyan-300">
                    {degreesOfFreedom} mốt dao động riêng biệt
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Bao gồm dao động hóa trị (kéo dãn đối xứng/bất đối xứng) và dao động biến dạng (uốn hình kéo, lắc, vặn).
                  </div>
                </div>

                {/* Vibration Modes List */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                    <span className="font-bold text-rose-300">1. Kéo dãn (Stretching):</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Thay đổi độ dài liên kết dọc theo trục (đối xứng νs và bất đối xứng νas).</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                    <span className="font-bold text-amber-300">2. Cắt kéo (Scissoring):</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Hai nguyên tử cùng tiến lại gần nhau trong một mặt phẳng.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                    <span className="font-bold text-cyan-300">3. Đung đưa (Rocking):</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Hai nguyên tử cùng nghiêng theo một hướng trong mặt phẳng.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                    <span className="font-bold text-emerald-300">4. Vẫy cánh (Wagging):</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Hai nguyên tử cùng di chuyển lên/xuống vuông góc với mặt phẳng.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: TCG / MOBA Tactical Mechanic */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-rose-950/80 to-slate-900 p-5 rounded-xl border border-rose-700/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Hiệu Ứng Thẻ Bài & Trinh Sát Nhiệt IR
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    Infrared Recon
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Trong ELEMENTA, năng lực Trinh Sát Nhiệt Hồng Ngoại (Infrared Thermal Lock) khóa mục tiêu theo bức xạ nhiệt và dao động liên kết:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/90 border border-rose-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-300">Phá Tàng Hình Bức Xạ Nhiệt (Thermal Sight):</span>
                      <p className="text-[11px] text-slate-400">Phát hiện ngay lập tức các thẻ bài bẫy hoặc tướng tàng hình ẩn nấp trong bụi rậm.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-rose-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300">Tăng Sát Thương Nhiệt (+25% Thermal Burn):</span>
                      <p className="text-[11px] text-slate-400">Cộng hưởng tần số tự nhiên của liên kết C-H làm tăng sát thương hỏa công.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-rose-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Khóa Điểm Yếu Nhóm Chức (Functional Weakness):</span>
                      <p className="text-[11px] text-slate-400">Nhắm thẳng vào liên kết yếu nhất (C=O hoặc O-H) để triệt tiêu năng lượng phòng thủ.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playInfraredLaserChirp();
                      setTimeout(() => sound.playMolecularVibrationHarmonic(), 180);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-550 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Quét Hồng Ngoại Khóa Mục Tiêu
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
