// src/components/visualizations/CrystalFieldTheoryVisualizer.tsx
// Milestone 42: Transition Metal Crystal Field Theory (CFT), Octahedral/Tetrahedral Splitting, High-Spin/Low-Spin & Spectrochemical Series Visualizer
// Standards: IUPAC Compendium of Chemical Terminology & Vietnam GDPT 2018 (Hóa 12 Chuyên đề: Phức chất & Phổ hấp thụ d-d)

import React, { useState } from 'react';
import {
  SPECTROCHEMICAL_LIGANDS,
  TRANSITION_METAL_CATIONS,
  CoordinationGeometry,
  calculateCrystalFieldSplitting,
} from '../../domain/crystalFieldTheoryEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  Layers,
  Activity,
  Compass,
  Eye,
  Sliders,
  Scale,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export interface CrystalFieldTheoryVisualizerProps {
  initialMetalId?: string;
  initialLigandId?: string;
}

export const CrystalFieldTheoryVisualizer: React.FC<CrystalFieldTheoryVisualizerProps> = ({
  initialMetalId,
  initialLigandId,
}) => {
  const [selectedMetalId, setSelectedMetalId] = useState<string>(initialMetalId || 'fe2');
  const [selectedLigandId, setSelectedLigandId] = useState<string>(initialLigandId || 'water');
  const [geometry, setGeometry] = useState<CoordinationGeometry>('OCTAHEDRAL');
  const [activeTab, setActiveTab] = useState<'energy_splitting' | 'spectrochemical' | 'absorption_color' | 'jahn_teller'>('energy_splitting');

  const cftResult = calculateCrystalFieldSplitting(selectedMetalId, selectedLigandId, geometry);

  return (
    <div className="w-full bg-navy/90 border border-blue-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with IUPAC & GDPT 2018 Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Thuyết Trường Tinh Thể & Phổ Hấp Thụ Phức Chất
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono">
                Hóa 12 GDPT
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Tách mức orbital d (t2g / eg), Dãy hóa quang phổ, Phân nhánh Spin cao/thấp (HS/LS), Màu bù d-d & Hiệu ứng Jahn-Teller.
          </p>
        </div>

        {/* Global Selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Metal Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-ivory-muted font-mono">Cation:</span>
            <select
              value={selectedMetalId}
              onChange={(e) => {
                sound.playUiClick();
                sound.playLigandExchangeDrip?.();
                setSelectedMetalId(e.target.value);
              }}
              className="bg-navy-light/60 border border-blue-500/40 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
            >
              {Object.values(TRANSITION_METAL_CATIONS).map((m) => (
                <option key={m.id} value={m.id} className="bg-navy text-white">
                  {m.symbol} ({m.nameVI}) [d{m.dElectronCount}]
                </option>
              ))}
            </select>
          </div>

          {/* Ligand Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-ivory-muted font-mono">Phối tử:</span>
            <select
              value={selectedLigandId}
              onChange={(e) => {
                sound.playUiClick();
                sound.playCoordinationColorShiftChime?.();
                setSelectedLigandId(e.target.value);
              }}
              className="bg-navy-light/60 border border-blue-500/40 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
            >
              {Object.values(SPECTROCHEMICAL_LIGANDS).map((l) => (
                <option key={l.id} value={l.id} className="bg-navy text-white">
                  {l.nameVI} ({l.fieldStrength === 'STRONG_FIELD' ? '★ Trường mạnh' : 'Trường yếu'})
                </option>
              ))}
            </select>
          </div>

          {/* Geometry Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-ivory-muted font-mono">Hình học:</span>
            <select
              value={geometry}
              onChange={(e) => {
                sound.playUiClick();
                sound.playCoordinationColorShiftChime?.();
                setGeometry(e.target.value as CoordinationGeometry);
              }}
              className="bg-navy-light/60 border border-blue-500/40 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
            >
              <option value="OCTAHEDRAL" className="bg-navy text-white">Bát diện (Oh - CN=6)</option>
              <option value="TETRAHEDRAL" className="bg-navy text-white">Tứ diện (Td - CN=4)</option>
              <option value="SQUARE_PLANAR" className="bg-navy text-white">Vuông phẳng (D4h - CN=4)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Complex Identity Dossier Banner */}
      <div className="p-3.5 rounded-xl bg-navy-light/30 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-cyan-300">
            {cftResult.complexFormula}
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Cấu hình d{cftResult.dElectronCount}
          </span>
          <span className={`px-2 py-0.5 rounded border font-bold ${
            cftResult.spinState === 'LOW_SPIN'
              ? 'bg-purple-950/60 border-purple-500 text-purple-300'
              : 'bg-amber-950/60 border-amber-500 text-amber-300'
          }`}>
            {cftResult.spinState === 'LOW_SPIN' ? 'SPIN THẤP (LOW-SPIN)' : 'SPIN CAO (HIGH-SPIN)'}
          </span>
          <span className={`px-2 py-0.5 rounded border font-bold ${
            cftResult.magneticBehavior === 'DIAMAGNETIC'
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500 text-rose-300'
          }`}>
            {cftResult.magneticBehavior === 'DIAMAGNETIC' ? 'NGHỊCH TỪ (μ = 0 BM)' : `THUẬN TỪ (μ = ${cftResult.spinOnlyMagneticMomentBM} BM)`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-ivory-muted">Màu dung dịch:</span>
          <span
            className="w-4 h-4 rounded-full border border-white/40 shadow"
            style={{ backgroundColor: cftResult.transmittedComplementaryColorHex }}
          />
          <strong className="text-white">{cftResult.transmittedComplementaryColorNameVI}</strong>
        </div>
      </div>

      {/* 3. Sub-tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('energy_splitting');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'energy_splitting'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sơ Đồ Mức Năng Lượng & Electron Spin (t2g / eg)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('spectrochemical');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'spectrochemical'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Thước Đo Dãy Hóa Quang Phổ (Δ vs P)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('absorption_color');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'absorption_color'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Phổ Hấp Thụ d-d & Vòng Màu Bù</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('jahn_teller');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jahn_teller'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Biến Dạng Jahn-Teller (Hệ d⁹ Cu²⁺)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ENERGY LEVEL SPLITTING & ELECTRON SPIN DIAGRAM SVG                 */}
      {/* ========================================================================= */}
      {activeTab === 'energy_splitting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* SVG Orbital Splitting Diagram (7 cols) */}
            <div className="lg:col-span-7 p-4 rounded-xl bg-black/60 border border-blue-500/30 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Sơ Đồ Tách Mức Năng Lượng Orbital d
                </span>
                <span className="text-xs font-mono text-cyan-200">
                  Δ = <strong className="text-white">{cftResult.deltaEnergyCmInv} cm⁻¹</strong> ({cftResult.deltaEnergyKjPerMol} kJ/mol)
                </span>
              </div>

              {/* Dynamic SVG Splitting Diagram */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 380 260" className="w-full max-w-md h-auto font-mono">
                  {/* Energy Axis */}
                  <line x1="30" y1="230" x2="30" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
                  <polygon points="26,35 30,25 34,35" fill="#94a3b8" />
                  <text x="25" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90 25 130)">
                    Năng lượng (Energy)
                  </text>

                  {/* Free Ion Degenerate Level (5 d-orbitals at y=150) */}
                  <g>
                    <text x="90" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      Cation tự do (Suy biến)
                    </text>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line key={i} x1={50 + i * 16} y1="150" x2={62 + i * 16} y2="150" stroke="#64748b" strokeWidth="3" />
                    ))}
                  </g>

                  {/* Splitting in Octahedral vs Tetrahedral */}
                  {geometry === 'OCTAHEDRAL' && (
                    <g>
                      {/* Barycenter Dashed Line */}
                      <line x1="130" y1="150" x2="360" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="365" y="153" fill="#64748b" fontSize="8">Trọng tâm</text>

                      {/* eg Level (Higher, y=75, dx2-y2 & dz2) */}
                      <line x1="220" y1="75" x2="260" y2="75" stroke="#f43f5e" strokeWidth="3.5" />
                      <line x1="275" y1="75" x2="315" y2="75" stroke="#f43f5e" strokeWidth="3.5" />
                      <text x="240" y="65" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">dx²-y²</text>
                      <text x="295" y="65" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">dz²</text>
                      <text x="330" y="80" fill="#f43f5e" fontSize="10" fontWeight="bold">eg (+0.6 Δo)</text>

                      {/* eg Electron arrows */}
                      {(() => {
                        const arrows: JSX.Element[] = [];
                        for (let i = 0; i < cftResult.egElectrons; i++) {
                          const isSecondBox = i >= 1 && (i !== 2 || cftResult.egElectrons === 3);
                          const boxX = (i % 2 === 0) ? 240 : 295;
                          const isSpinDown = (i >= 2);
                          const arrowX = isSpinDown ? boxX + 6 : boxX - 6;
                          arrows.push(
                            <text key={i} x={arrowX} y="79" fill="#ffffff" fontSize="13" fontWeight="bold">
                              {isSpinDown ? '↓' : '↑'}
                            </text>
                          );
                        }
                        return arrows;
                      })()}

                      {/* t2g Level (Lower, y=190, dxy, dyz, dxz) */}
                      <line x1="200" y1="190" x2="235" y2="190" stroke="#0ea5e9" strokeWidth="3.5" />
                      <line x1="250" y1="190" x2="285" y2="190" stroke="#0ea5e9" strokeWidth="3.5" />
                      <line x1="300" y1="190" x2="335" y2="190" stroke="#0ea5e9" strokeWidth="3.5" />
                      <text x="217" y="205" textAnchor="middle" fill="#38bdf8" fontSize="9">dxy</text>
                      <text x="267" y="205" textAnchor="middle" fill="#38bdf8" fontSize="9">dyz</text>
                      <text x="317" y="205" textAnchor="middle" fill="#38bdf8" fontSize="9">dxz</text>
                      <text x="345" y="195" fill="#38bdf8" fontSize="10" fontWeight="bold">t2g (-0.4 Δo)</text>

                      {/* t2g Electron arrows */}
                      {(() => {
                        const arrows: JSX.Element[] = [];
                        for (let i = 0; i < cftResult.t2gElectrons; i++) {
                          const boxIdx = i % 3;
                          const boxX = 217 + boxIdx * 50;
                          const isSpinDown = i >= 3;
                          const arrowX = isSpinDown ? boxX + 5 : boxX - 5;
                          arrows.push(
                            <text key={i} x={arrowX} y="194" fill="#ffffff" fontSize="13" fontWeight="bold">
                              {isSpinDown ? '↓' : '↑'}
                            </text>
                          );
                        }
                        return arrows;
                      })()}

                      {/* Delta_o Arrow indicator */}
                      <line x1="175" y1="75" x2="175" y2="190" stroke="#a855f7" strokeWidth="2" />
                      <polygon points="171,85 175,75 179,85" fill="#a855f7" />
                      <polygon points="171,180 175,190 179,180" fill="#a855f7" />
                      <text x="165" y="135" textAnchor="end" fill="#c084fc" fontSize="11" fontWeight="bold">
                        Δo
                      </text>
                    </g>
                  )}

                  {geometry === 'TETRAHEDRAL' && (
                    <g>
                      {/* Barycenter Dashed Line */}
                      <line x1="130" y1="150" x2="360" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

                      {/* t2 Level (Higher, y=95, dxy, dyz, dxz) */}
                      <line x1="200" y1="95" x2="235" y2="95" stroke="#f43f5e" strokeWidth="3.5" />
                      <line x1="250" y1="95" x2="285" y2="95" stroke="#f43f5e" strokeWidth="3.5" />
                      <line x1="300" y1="95" x2="335" y2="95" stroke="#f43f5e" strokeWidth="3.5" />
                      <text x="345" y="100" fill="#f43f5e" fontSize="10" fontWeight="bold">t2 (+0.4 Δt)</text>

                      {/* e Level (Lower, y=185, dx2-y2, dz2) */}
                      <line x1="220" y1="185" x2="260" y2="185" stroke="#0ea5e9" strokeWidth="3.5" />
                      <line x1="275" y1="185" x2="315" y2="185" stroke="#0ea5e9" strokeWidth="3.5" />
                      <text x="330" y="190" fill="#38bdf8" fontSize="10" fontWeight="bold">e (-0.6 Δt)</text>

                      {/* Delta_t Arrow */}
                      <line x1="175" y1="95" x2="175" y2="185" stroke="#a855f7" strokeWidth="2" />
                      <polygon points="171,105 175,95 179,105" fill="#a855f7" />
                      <polygon points="171,175 175,185 179,175" fill="#a855f7" />
                      <text x="165" y="142" textAnchor="end" fill="#c084fc" fontSize="10" fontWeight="bold">
                        Δt = 4/9 Δo
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Occupancy Formula Box */}
              <div className="w-full p-2.5 rounded-lg bg-navy/80 border border-blue-500/30 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-ivory-muted">Cấu hình electron phân lớp: </span>
                  <strong className="text-cyan-300">
                    {geometry === 'OCTAHEDRAL'
                      ? `t2g^${cftResult.t2gElectrons} eg^${cftResult.egElectrons}`
                      : `e^${cftResult.egElectrons} t2^${cftResult.t2gElectrons}`}
                  </strong>
                </div>
                <div className="text-purple-300">
                  CFSE = <strong className="text-white">{cftResult.cfseDeltaUnits} Δo</strong> ({cftResult.cfseKjPerMol} kJ/mol)
                </div>
              </div>
            </div>

            {/* Spin & Magnetism Panel (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between gap-4 font-mono">
              <div className="border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Trạng Thái Spin & Từ Tính
                </span>
              </div>

              {/* Spin Comparison Box */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-navy-light/40 border border-white/10 flex justify-between">
                  <span className="text-ivory-muted">Năng lượng tách Δ:</span>
                  <span className="text-white font-bold">{cftResult.deltaEnergyCmInv} cm⁻¹</span>
                </div>

                <div className="p-2.5 rounded-lg bg-navy-light/40 border border-white/10 flex justify-between">
                  <span className="text-ivory-muted">Năng lượng ghép đôi (P):</span>
                  <span className="text-amber-300 font-bold">{cftResult.pairingEnergyCmInv} cm⁻¹</span>
                </div>

                <div className="p-2.5 rounded-lg bg-navy-light/40 border border-white/10 flex justify-between">
                  <span className="text-ivory-muted">So sánh Δ vs P:</span>
                  <span className="text-cyan-300 font-bold">
                    {cftResult.deltaEnergyCmInv > cftResult.pairingEnergyCmInv ? 'Δ > P (Ưu tiên ghép đôi -> Spin thấp)' : 'Δ < P (Ưu tiên độc thân -> Spin cao)'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-navy-light/40 border border-white/10 flex justify-between">
                  <span className="text-ivory-muted">Số electron độc thân (n):</span>
                  <span className="text-rose-400 font-bold text-sm">{cftResult.unpairedElectronsCount}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-navy-light/40 border border-white/10 flex justify-between">
                  <span className="text-ivory-muted">Momen từ spin (μ_eff):</span>
                  <span className="text-emerald-400 font-bold text-sm">{cftResult.spinOnlyMagneticMomentBM} BM</span>
                </div>
              </div>

              {/* Pedagogical Explanation */}
              <p className="text-xs text-ivory-muted leading-relaxed bg-navy-light/20 p-2.5 rounded-lg border border-white/5 font-sans">
                {cftResult.pedagogicalInsightVI}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SPECTROCHEMICAL SERIES RULER                                      */}
      {/* ========================================================================= */}
      {activeTab === 'spectrochemical' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-black/60 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Dãy Hóa Quang Phổ Phối Tử (IUPAC Spectrochemical Series)
              </span>
              <span className="text-xs font-mono text-purple-200">
                Trường yếu (High-Spin) ➔ Trường mạnh (Low-Spin)
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Dãy hóa quang phổ sắp xếp các phối tử theo độ lớn của năng lượng tách trường tinh thể Δo mà chúng tạo ra.
              Phối tử pi-donor (như I-, Cl-, F-) làm giảm Δo, trong khi phối tử pi-acceptor (như CN-, CO) làm tăng vọt Δo.
            </p>

            {/* Interactive Ligand Ruler */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {Object.values(SPECTROCHEMICAL_LIGANDS).map((lig) => {
                const isSelected = selectedLigandId === lig.id;
                return (
                  <button
                    key={lig.id}
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCoordinationColorShiftChime?.();
                      setSelectedLigandId(lig.id);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-between gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border-white shadow-lg shadow-purple-500/40 scale-105 font-bold'
                        : 'bg-navy-light/40 border-purple-500/30 text-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <span className="text-sm font-bold font-mono">{lig.formula}</span>
                    <span className="text-[10px] text-center">{lig.nameVI}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 font-mono">
                      Hệ số: {lig.splittingFactor}x
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OPTICAL ABSORPTION & COMPLEMENTARY COLOR                          */}
      {/* ========================================================================= */}
      {activeTab === 'absorption_color' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Color Beaker Preview (5 cols) */}
            <div className="md:col-span-5 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-between gap-4">
              <span className="text-xs font-bold text-cyan-300">
                Màu Sắc Dung Dịch Phức Chất Truyền Qua
              </span>

              {/* Chemical Beaker Flask SVG */}
              <div className="py-2">
                <svg viewBox="0 0 140 180" className="w-32 h-40">
                  {/* Beaker Body */}
                  <path d="M 30 20 L 30 140 A 20 20 0 0 0 50 160 L 90 160 A 20 20 0 0 0 110 140 L 110 20" fill="none" stroke="#64748b" strokeWidth="2.5" />
                  <ellipse cx="70" cy="20" rx="40" ry="8" fill="none" stroke="#64748b" strokeWidth="2" />

                  {/* Liquid inside beaker with transmitted color */}
                  <path
                    d="M 32 60 Q 70 65 108 60 L 108 140 A 18 18 0 0 1 90 158 L 50 158 A 18 18 0 0 1 32 140 Z"
                    fill={cftResult.transmittedComplementaryColorHex}
                    fillOpacity="0.85"
                  />
                  <ellipse cx="70" cy="60" rx="38" ry="7" fill={cftResult.transmittedComplementaryColorHex} fillOpacity="0.6" />
                </svg>
              </div>

              <div className="text-center space-y-1 font-mono">
                <div className="text-base font-bold text-white">
                  {cftResult.transmittedComplementaryColorNameVI}
                </div>
                <div className="text-xs text-ivory-muted">
                  Hấp thụ photon: {cftResult.absorptionWavelengthNm} nm ({cftResult.absorbedColorNameVI})
                </div>
              </div>
            </div>

            {/* Scientific Explanation (7 cols) */}
            <div className="md:col-span-7 p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-sans">
                <Eye className="w-4 h-4" /> Cơ Chế Tạo Màu Chuyển Dời d-d
              </span>

              <p className="text-ivory-muted leading-relaxed font-sans">
                Khi ánh sáng trắng chiếu qua dung dịch, photon có năng lượng đúng bằng khoảng cách tách trường tinh thể (h·c / λ = Δo) sẽ bị electron ở orbital t2g hấp thụ để nhảy lên orbital eg.
                Mắt người không nhìn thấy photon bị hấp thụ, mà nhìn thấy <strong>màu bù (complementary color)</strong> của các bước sóng còn lại truyền qua!
              </p>

              <div className="p-3 rounded-lg bg-navy/80 space-y-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Năng lượng hấp thụ Δo:</span>
                  <span className="text-white font-bold">{cftResult.deltaEnergyCmInv} cm⁻¹ ({cftResult.deltaEnergyKjPerMol} kJ/mol)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Bước sóng hấp thụ cực đại (λ_max):</span>
                  <span className="text-cyan-300 font-bold">{cftResult.absorptionWavelengthNm} nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Màu photon bị hấp thụ:</span>
                  <span className="text-rose-400 font-bold">{cftResult.absorbedColorNameVI}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Màu mắt người quan sát được:</span>
                  <span className="text-emerald-400 font-bold">{cftResult.transmittedComplementaryColorNameVI}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: JAHN-TELLER DISTORTION                                            */}
      {/* ========================================================================= */}
      {activeTab === 'jahn_teller' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Định Lý Biến Dạng Jahn-Teller (Tetragonal Distortion)
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                cftResult.jahnTellerType === 'STRONG_ELONGATION'
                  ? 'bg-rose-950/60 border border-rose-500 text-rose-300'
                  : 'bg-navy-light/40 border border-white/20 text-ivory-muted'
              }`}>
                {cftResult.jahnTellerType === 'STRONG_ELONGATION' ? '★ BIẾN DẠNG MẠNH' : 'Không biến dạng'}
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              {cftResult.jahnTellerExplanationVI}
            </p>

            {/* Quick button to select Cu(II) for Jahn-Teller demo */}
            {selectedMetalId !== 'cu2' && (
              <button
                onClick={() => {
                  sound.playUiClick();
                  setSelectedMetalId('cu2');
                  setSelectedLigandId('water');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-colors"
              >
                🔬 Xem ví dụ kinh điển: [Cu(H2O)6]2+ (d9)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
