import React, { useState, useMemo } from 'react';
import {
  Compass,
  RotateCw,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Sliders,
  Scale,
  Info,
  Shield,
  Layers,
  Activity
} from 'lucide-react';
import {
  CHIRAL_MOLECULES_CATALOG,
  ChiralMoleculeProfile,
  calculatePolarimeterRotation
} from '../../domain/chiralStereochemistryEngine';
import { sound } from '../../audio/soundEngine';

type ChiralMode = 'CIP_RULES_3D_WEDGE' | 'BIOT_POLARIMETER_LAB' | 'THALIDOMIDE_TRAGEDY_MESO';

export const ChiralStereochemistryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ChiralMode>('CIP_RULES_3D_WEDGE');

  // Mode 1: CIP Wedge state
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('R_LACTIC_ACID');

  // Mode 2: Polarimeter state
  const [polarimeterMolId, setPolarimeterMolId] = useState<string>('S_THALIDOMIDE');
  const [tubeLengthDm, setTubeLengthDm] = useState<number>(1.0);
  const [concentrationGPerMl, setConcentrationGPerMl] = useState<number>(0.10);
  const [ratioRPercent, setRatioRPercent] = useState<number>(0); // 0% R = 100% S

  const activeMolecule = useMemo(() => {
    return CHIRAL_MOLECULES_CATALOG.find(m => m.id === selectedMoleculeId) || CHIRAL_MOLECULES_CATALOG[0];
  }, [selectedMoleculeId]);

  const polarimeterReading = useMemo(() => {
    return calculatePolarimeterRotation(polarimeterMolId, tubeLengthDm, concentrationGPerMl, ratioRPercent);
  }, [polarimeterMolId, tubeLengthDm, concentrationGPerMl, ratioRPercent]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Lập Thể & Đồng Phân Quang Học</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Hóa Lập Thể, Quy Tắc CIP (R/S) & Phân Cực Kế Biot
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Xác định cấu hình tuyệt đối (R/S) theo quy tắc Cahn-Ingold-Prelog (CIP), mô phỏng đo góc quay cực qua phân cực kế theo Định luật Biot,
              độ dư đối quang (% ee), tính triệt quang của hợp chất Meso và bài học lịch sử thảm họa Thalidomide.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-teal-800/40 shrink-0">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('CIP_RULES_3D_WEDGE');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'CIP_RULES_3D_WEDGE'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Quy Tắc CIP (R/S)
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('BIOT_POLARIMETER_LAB');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'BIOT_POLARIMETER_LAB'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Phân Cực Kế Biot
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('THALIDOMIDE_TRAGEDY_MESO');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'THALIDOMIDE_TRAGEDY_MESO'
                  ? 'bg-purple-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Thalidomide & Hợp Chất Meso
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: CIP PRIORITY RULES & 3D WEDGE-DASH VISUALIZER                */}
      {/* ===================================================================== */}
      {activeMode === 'CIP_RULES_3D_WEDGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Molecule Selection */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-400" />
                Chọn Phân Tử Bất Đối (Chiral Molecule)
              </span>

              {/* Molecule Pills */}
              <div className="space-y-1.5">
                {CHIRAL_MOLECULES_CATALOG.map(mol => (
                  <button
                    key={mol.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMoleculeId(mol.id);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedMoleculeId === mol.id
                        ? 'bg-teal-950/60 border-teal-400 text-ivory font-bold shadow'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{mol.nameVi}</div>
                      <div className="text-[10px] font-mono text-slate-400">{mol.formula}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      mol.rOrSDesignation === 'R'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : mol.rOrSDesignation === 'S'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    }`}>
                      {mol.rOrSDesignation}
                    </span>
                  </button>
                ))}
              </div>

              {/* CIP Substituents Breakdown */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-mono text-teal-300 block font-bold">Thứ Tự Ưu Tiên 4 Nhóm Thế (CIP 1 → 4):</span>
                {activeMolecule.substituents.map(sub => (
                  <div key={sub.priority} className="flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-teal-400 shrink-0">
                      {sub.priority}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-mono font-bold text-ivory">{sub.groupFormula}</span>
                        <span className="text-slate-400 text-[11px] font-mono">Z = {sub.directAtomicNumberZ}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{sub.tieBreakerAtomsDescriptionVi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Wedge-Dash Tetrahedral Center Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-teal-400 font-bold">
                MÔ HÌNH NÊM - NÉT ĐỨT (TETRAHEDRAL WEDGE-DASH STEREOCHEMISTRY)
              </span>

              {/* Wedge Dash SVG */}
              <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="wedgeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Central Chiral Carbon C* */}
                <circle cx="200" cy="120" r="16" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2.5" />
                <text x="200" y="125" fill="#5eead4" fontSize="13" fontWeight="bold" textAnchor="middle">C*</text>

                {/* Bond 1: Top in-plane bond to Group 1 or 2 */}
                <line x1="200" y1="104" x2="200" y2="40" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="200" cy="35" r="14" fill="#3b82f6" />
                <text x="200" y="39" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {activeMolecule.substituents[0].groupFormula}
                </text>
                <text x="200" y="15" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">(1)</text>

                {/* Bond 2: Bottom-left in-plane bond to Group 2 or 3 */}
                <line x1="188" y1="130" x2="110" y2="185" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="105" cy="190" r="14" fill="#10b981" />
                <text x="105" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {activeMolecule.substituents[1].groupFormula}
                </text>
                <text x="105" y="215" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">(2)</text>

                {/* Bond 3: Wedge bond pointing toward viewer (forward) */}
                <polygon points="208,128 280,185 270,195" fill="url(#wedgeGrad)" />
                <circle cx="285" cy="190" r="14" fill="#f59e0b" />
                <text x="285" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {activeMolecule.substituents[2].groupFormula}
                </text>
                <text x="285" y="215" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">(3)</text>

                {/* Bond 4: Hash/Dash bond pointing backward (away from viewer) */}
                <g stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 3">
                  <line x1="214" y1="114" x2="295" y2="70" />
                </g>
                <circle cx="305" cy="65" r="12" fill="#64748b" />
                <text x="305" y="69" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  {activeMolecule.substituents[3].groupFormula}
                </text>
                <text x="305" y="48" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">(4 - Hướng sau)</text>

                {/* CIP Arc Arrow 1 -> 2 -> 3 */}
                {activeMolecule.rOrSDesignation === 'R' && (
                  <path
                    d="M 180 50 A 80 80 0 0 1 270 170"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowCyan)"
                  />
                )}
                {activeMolecule.rOrSDesignation === 'S' && (
                  <path
                    d="M 220 50 A 80 80 0 0 0 120 170"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowRose)"
                  />
                )}
              </svg>

              {/* R/S Conclusion Card */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-teal-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-teal-400 font-mono block mb-1">Kết luận phân tích lập thể:</span>
                <div className="flex items-center justify-center gap-2">
                  {activeMolecule.rOrSDesignation === 'R' ? (
                    <RotateCw className="w-5 h-5 text-cyan-400" />
                  ) : activeMolecule.rOrSDesignation === 'S' ? (
                    <RotateCcw className="w-5 h-5 text-rose-400" />
                  ) : (
                    <Scale className="w-5 h-5 text-purple-400" />
                  )}
                  <span className="text-sm font-bold text-ivory">
                    Cấu hình tuyệt đối: {activeMolecule.rOrSDesignation} · Quay cực riêng [{activeMolecule.opticalSign}] {activeMolecule.specificRotationD20}°
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{activeMolecule.fischerProjectionDescriptionVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: BIOT'S LAW POLARIMETER SIMULATOR                              */}
      {/* ===================================================================== */}
      {activeMode === 'BIOT_POLARIMETER_LAB' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                Thông Số Ống Đo Phân Cực Kế (Polarimeter Tube)
              </span>

              {/* Molecule Select */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Chất quang hoạt thử nghiệm:</span>
                <select
                  value={polarimeterMolId}
                  onChange={e => {
                    sound.playUiClick();
                    setPolarimeterMolId(e.target.value);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-ivory"
                >
                  {CHIRAL_MOLECULES_CATALOG.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nameVi} ([α] = {m.specificRotationD20}°)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tube Length Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Chiều dài ống đo (l):</span>
                  <span className="font-mono font-bold text-cyan-400">{tubeLengthDm.toFixed(1)} dm ({tubeLengthDm * 10} cm)</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={tubeLengthDm}
                  onChange={e => {
                    sound.playUiClick();
                    setTubeLengthDm(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Concentration Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nồng độ dung dịch (c):</span>
                  <span className="font-mono font-bold text-ivory">{concentrationGPerMl.toFixed(2)} g/mL ({concentrationGPerMl * 100} g/100mL)</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.40"
                  step="0.01"
                  value={concentrationGPerMl}
                  onChange={e => {
                    sound.playUiClick();
                    setConcentrationGPerMl(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Enantiomer Ratio R Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tỷ lệ đồng phân R : S:</span>
                  <span className="font-mono font-bold text-amber-400">{ratioRPercent}% R : {100 - ratioRPercent}% S</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={ratioRPercent}
                  onChange={e => {
                    sound.playUiClick();
                    setRatioRPercent(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>100% S</span>
                  <span>50:50 (Racemic)</span>
                  <span>100% R</span>
                </div>
              </div>

              {/* Biot Law Reading Output */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Độ dư đối quang (% ee):</span>
                  <span className="font-mono font-bold text-amber-400">{polarimeterReading.enantiomericExcessPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Góc quay cực đo được (α):</span>
                  <span className={`font-mono font-extrabold ${polarimeterReading.observedRotationAlphaDegrees > 0 ? 'text-cyan-400' : polarimeterReading.observedRotationAlphaDegrees < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {polarimeterReading.observedRotationAlphaDegrees > 0 ? '+' : ''}{polarimeterReading.observedRotationAlphaDegrees}°
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-[11px]">
                  <span className="text-slate-400">Chiều quay mặt phẳng ánh sáng:</span>
                  <span className="font-mono font-bold text-ivory">{polarimeterReading.directionVi}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Polarimeter Optical Bench SVG */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-cyan-400 font-bold">
                BĂNG QUANG HỌC PHÂN CỰC KẾ LAURENT (POLARIMETER OPTICAL BENCH)
              </span>

              {/* Optical Bench SVG */}
              <svg viewBox="0 0 460 220" className="w-full max-w-md h-auto">
                {/* Sodium Lamp (589.3nm yellow) */}
                <rect x="20" y="85" width="35" height="50" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <circle cx="37" cy="110" r="10" fill="#facc15" filter="drop-shadow(0 0 6px #facc15)" />
                <text x="37" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">Đèn Na-D</text>

                {/* Polarizing Prism (Nicol) */}
                <polygon points="85,85 110,85 100,135 75,135" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="88" y1="90" x2="88" y2="130" stroke="#ffffff" strokeWidth="2" />
                <text x="92" y="150" fill="#38bdf8" fontSize="9" textAnchor="middle">Kính phân cực</text>

                {/* Polarized Light Beam */}
                <line x1="110" y1="110" x2="160" y2="110" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" />

                {/* Sample Tube (Chiral Liquid) */}
                <rect x="160" y="90" width="160" height="40" rx="6" fill="#14b8a6" fillOpacity="0.4" stroke="#2dd4bf" strokeWidth="2" />
                <text x="240" y="114" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Dung dịch mẫu (l = {tubeLengthDm} dm)
                </text>
                <text x="240" y="150" fill="#2dd4bf" fontSize="9" textAnchor="middle">Ống đo mẫu</text>

                {/* Rotated Light Beam exiting tube */}
                <line x1="320" y1="110" x2="360" y2="110" stroke="#fde047" strokeWidth="2" />

                {/* Analyzer Eyepiece */}
                <circle cx="390" cy="110" r="28" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                {/* Split field / extinction line */}
                <line
                  x1="390"
                  y1="82"
                  x2="390"
                  y2="138"
                  stroke="#ef4444"
                  strokeWidth="2"
                  transform={`rotate(${polarimeterReading.eyepieceExtinctionAngleDegrees * 5}, 390, 110)`}
                />
                <circle cx="390" cy="110" r="5" fill="#f59e0b" />
                <text x="390" y="155" fill="#fbbf24" fontSize="9" textAnchor="middle">Thị kính quay</text>
              </svg>

              {/* Formula and Biot equation badge */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-teal-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-cyan-400 font-mono block mb-1">Định luật Biot về độ quay cực dung dịch:</span>
                <p className="text-xs font-mono font-bold text-amber-200">
                  α = [α] × l × c × (%ee / 100)
                </p>
                <p className="text-xs text-slate-300 mt-1">{polarimeterReading.explanationVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: THALIDOMIDE TRAGEDY & MESO COMPOUND SYMMETRY                 */}
      {/* ===================================================================== */}
      {activeMode === 'THALIDOMIDE_TRAGEDY_MESO' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Thalidomide Case Study */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Thảm Họa Dược Phẩm Thalidomide (1957 - 1961)
              </span>

              {/* R vs S comparison */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-cyan-950/40 p-3.5 rounded-xl border border-cyan-500/40 space-y-1">
                  <span className="font-bold text-cyan-300 block text-sm">(R)-Thalidomide</span>
                  <span className="text-[11px] text-emerald-400 font-semibold block">✓ Trị liệu an toàn</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Có tác dụng an thần, gây ngủ êm dịu và chống nôn nghén hiệu quả cho phụ nữ mang thai. Không độc cho thai nhi.
                  </p>
                </div>

                <div className="bg-rose-950/40 p-3.5 rounded-xl border border-rose-500/40 space-y-1">
                  <span className="font-bold text-rose-300 block text-sm">(S)-Thalidomide</span>
                  <span className="text-[11px] text-rose-400 font-semibold block">☠ Tác nhân gây quái thai</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Gắn vào thụ thể Cereblon làm thoái hóa protein SALL4, ngăn tạo mạch chi gây dị tật teo cụt chi (phocomelia).
                  </p>
                </div>
              </div>

              {/* In vivo Racemization Danger */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  Cơ Chế Đồng Hóa Racemization Trong Huyết Tương Người:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ngay cả khi bệnh nhân uống dạng (R) tinh khiết 100%, trong máu người ở pH 7.4, hydro tại carbon chiral có tính acid yếu
                  sẽ bị deproton hóa tạo chất trung gian enol phẳng không đối xứng, rồi tự động proton hóa tái lập hỗn hợp racemic (R:S = 50:50)
                  với chu kỳ bán hủy chỉ <span className="text-rose-400 font-bold">t_1/2 ≈ 4 - 5 giờ</span>!
                </p>
              </div>
            </div>
          </div>

          {/* Meso Tartaric Acid Internal Symmetry */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-teal-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                Hợp Chất Meso & Mặt Phẳng Đối Xứng Gương Nội Phân Tử (σ)
              </span>

              {/* Tartaric Acid Meso Diagram */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-center">
                  <span className="text-xs font-mono text-purple-300 font-bold block">
                    Axit Meso-Tartaric (2R, 3S):
                  </span>
                  <p className="text-xs font-mono text-ivory mt-1">
                    HOOC ─ CH*(OH) ─ [Mặt phẳng đối xứng σ] ─ CH*(OH) ─ COOH
                  </p>
                </div>

                {/* Mirror symmetry card */}
                <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-500/30 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tính Triệt Quang Nội Phân Tử (Internal Compensation)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Nửa trên phân tử có cấu hình (2R) làm quay mặt phẳng ánh sáng phân cực sang phải một góc (+α),
                    nhưng nửa dưới có cấu hình đối xứng (3S) làm quay sang trái đúng một góc (-α).
                    Hai nửa phân tử bù trừ tuyệt đối cho nhau khiến toàn bộ phân tử không có tính quang hoạt ([α] = 0°).
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                  <span>Số tâm chiral (C*): <strong className="text-ivory">2</strong></span>
                  <span>Tính quang hoạt: <strong className="text-purple-400">Hoàn toàn triệt quang</strong></span>
                  <span>Góc quay riêng [α]: <strong className="text-ivory">0.0°</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
