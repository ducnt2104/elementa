// src/components/visualizations/PhotocatalyticEnergyVisualizer.tsx
// Interactive Visualizer: Photocatalytic Water Splitting, Z-Scheme & Perovskite Tandem Solar Cells
// Standards: Honda-Fujishima Effect (1972), IUPAC & Vietnam GDPT 2018 (Năng Lượng Xanh & Quang Hóa)

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  Droplets,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  Activity,
  RefreshCw,
  Gauge
} from 'lucide-react';
import {
  PHOTOCATALYST_CATALOG,
  simulateZSchemeWaterSplitting,
  calculatePerovskiteTandemEfficiency,
  PhotocatalystMaterial
} from '../../domain/photocatalyticEnergyEngine';
import { sound } from '../../audio/soundEngine';

type PhotoTabMode = 'BAND_ALIGNMENT_SPLITTING' | 'Z_SCHEME_PHOTOSYNTHESIS' | 'PEROVSKITE_TANDEM_SOLAR';

export const PhotocatalyticEnergyVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PhotoTabMode>('BAND_ALIGNMENT_SPLITTING');

  // Mode 1: Band Alignment State
  const [selectedCatalystId, setSelectedCatalystId] = useState<string>('TIO2_ANATASE');

  // Mode 2: Z-Scheme State
  const [selectedHepId, setSelectedHepId] = useState<string>('SRTIO3_RH');
  const [selectedOepId, setSelectedOepId] = useState<string>('BIVO4');
  const [solarFluxWm2, setSolarFluxWm2] = useState<number>(1000); // 1 Sun
  const [reactorAreaM2, setReactorAreaM2] = useState<number>(2.0); // 2 m2

  // Mode 3: Perovskite Tandem State
  const [perovskiteBandgap, setPerovskiteBandgap] = useState<number>(1.68); // eV

  // Calculations
  const activeCatalyst: PhotocatalystMaterial = useMemo(() => {
    return PHOTOCATALYST_CATALOG[selectedCatalystId] || PHOTOCATALYST_CATALOG.TIO2_ANATASE;
  }, [selectedCatalystId]);

  const zSchemeResult = useMemo(() => {
    return simulateZSchemeWaterSplitting(selectedHepId, selectedOepId, solarFluxWm2, reactorAreaM2);
  }, [selectedHepId, selectedOepId, solarFluxWm2, reactorAreaM2]);

  const tandemResult = useMemo(() => {
    return calculatePerovskiteTandemEfficiency(perovskiteBandgap);
  }, [perovskiteBandgap]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Chuyên Đề GDPT 2018 · Quang Xúc Tác Tách Nước &amp; Pin Mặt Trời Tandem (Lớp 10 &amp; 11)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Quang Xúc Tác Tách Nước Sinh Hydro, Quang Hợp Nhân Tạo (Z-Scheme) &amp; Pin Tandem
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá thế bờ vùng năng lượng (Conduction / Valence Band vs NHE) theo hiệu ứng Honda-Fujishima 1972,
              hệ quang xúc tác chữ Z kép (Z-Scheme) đạt mục tiêu thương mại &gt; 10% STH, và pin mặt trời Perovskite/Silicon phá vỡ giới hạn Shockley-Queisser.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-amber-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('BAND_ALIGNMENT_SPLITTING');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'BAND_ALIGNMENT_SPLITTING'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Vùng Năng Lượng &amp; Bờ Vùng</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('Z_SCHEME_PHOTOSYNTHESIS');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'Z_SCHEME_PHOTOSYNTHESIS'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Quang Hợp Chữ Z (Z-Scheme)</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('PEROVSKITE_TANDEM_SOLAR');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'PEROVSKITE_TANDEM_SOLAR'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pin Mặt Trời Tandem</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: BAND EDGE ALIGNMENT VS WATER REDOX POTENTIALS                     */}
      {/* ========================================================================= */}
      {activeTab === 'BAND_ALIGNMENT_SPLITTING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Band Alignment vs NHE Diagram SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-ivory text-base">
                    Thế Bờ Vùng Năng Lượng (V vs NHE) &amp; Cân Bằng Tách Nước
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    activeCatalyst.canProduceH2Independently && activeCatalyst.canProduceO2Independently
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                  }`}>
                    {activeCatalyst.canProduceH2Independently && activeCatalyst.canProduceO2Independently
                      ? 'TỰ TÁCH NƯỚC ĐỘC LẬP'
                      : 'CẦN GHÉP CẶP Z-SCHEME'}
                  </span>
                </div>
              </div>

              {/* Band Alignment SVG */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[320px]">
                <svg viewBox="0 0 600 320" className="w-full h-auto max-h-[320px]">
                  {/* Energy Axis (V vs NHE): More negative is UP, more positive is DOWN */}
                  <line x1="80" y1="20" x2="80" y2="300" stroke="#475569" strokeWidth="2" />
                  <polygon points="80,15 75,25 85,25" fill="#475569" />
                  <text x="70" y="25" textAnchor="end" fill="#94a3b8" fontSize="10">Thế điện cực (V vs NHE)</text>

                  {/* Redox Potential Reference Lines */}
                  {/* E°(H+/H2) = 0.00 V */}
                  <line x1="80" y1="120" x2="560" y2="120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="565" y="124" fill="#38bdf8" fontSize="10" fontWeight="bold">0.00 V (H⁺/H₂ Sinh Hydro)</text>

                  {/* E°(O2/H2O) = +1.23 V */}
                  <line x1="80" y1="200" x2="560" y2="200" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="565" y="204" fill="#f43f5e" fontSize="10" fontWeight="bold">+1.23 V (O₂/H₂O Oxi hóa O₂)</text>

                  {/* Minimum Thermodynamic Window Shading */}
                  <rect x="80" y="120" width="480" height="80" fill="#38bdf8" opacity="0.05" />
                  <text x="320" y="165" textAnchor="middle" fill="#64748b" fontSize="10">
                    Cửa sổ nhiệt động học tối thiểu: ΔE = 1.23 eV (ΔG° = 237.2 kJ/mol)
                  </text>

                  {/* Active Catalyst Bandgap Pillar */}
                  {/* Map V to Y: Y = 120 + V * 65 */}
                  {(() => {
                    const cbY = 120 + activeCatalyst.conductionBandMinNheV * 65;
                    const vbY = 120 + activeCatalyst.valenceBandMaxNheV * 65;
                    const height = Math.max(20, vbY - cbY);
                    return (
                      <g>
                        <rect x="230" y={cbY} width="140" height="25" fill="#0284c7" rx="4" />
                        <text x="300" y={cbY + 17} textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">
                          CB: {activeCatalyst.conductionBandMinNheV > 0 ? '+' : ''}{activeCatalyst.conductionBandMinNheV} V
                        </text>

                        <rect x="230" y={cbY + 25} width="140" height={Math.max(10, height - 50)} fill="#0f172a" opacity="0.6" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="300" y={cbY + height / 2 + 5} textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="extrabold">
                          Eg = {activeCatalyst.bandgapEv} eV
                        </text>

                        <rect x="230" y={vbY - 25} width="140" height="25" fill="#e11d48" rx="4" />
                        <text x="300" y={vbY - 8} textAnchor="middle" fill="#ffe4e6" fontSize="11" fontWeight="bold">
                          VB: +{activeCatalyst.valenceBandMaxNheV} V
                        </text>

                        {/* Title of material */}
                        <text x="300" y="295" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">
                          {activeCatalyst.chemicalFormula}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Thermodynamic Verification Summary */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Lực Thúc Đẩy Sinh H₂</span>
                <span className={`font-extrabold text-base mt-0.5 block ${
                  activeCatalyst.canProduceH2Independently ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {activeCatalyst.canProduceH2Independently ? 'ĐỦ THẾ KHỬ (E_CB < 0.00 V)' : 'KHÔNG ĐỦ THẾ KHỬ (E_CB > 0.00 V)'}
                </span>
                <span className="text-[10px] text-ivory-muted">Thế đáy vùng dẫn CB = {activeCatalyst.conductionBandMinNheV} V</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Lực Thúc Đẩy Oxi Hóa H₂O</span>
                <span className={`font-extrabold text-base mt-0.5 block ${
                  activeCatalyst.canProduceO2Independently ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {activeCatalyst.canProduceO2Independently ? 'ĐỦ THẾ OXI HÓA (E_VB > +1.23 V)' : 'KHÔNG ĐỦ THẾ OXI HÓA'}
                </span>
                <span className="text-[10px] text-ivory-muted">Thế đỉnh vùng hóa trị VB = +{activeCatalyst.valenceBandMaxNheV} V</span>
              </div>
            </div>
          </div>

          {/* Right Column: Material Selector & Optical Absorption */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Thư Viện Chất Quang Xúc Tác Tiêu Biểu</span>
              </h4>

              <div className="space-y-2">
                {Object.values(PHOTOCATALYST_CATALOG).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedCatalystId(cat.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-xs space-y-1 ${
                      selectedCatalystId === cat.id
                        ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400'
                        : 'bg-slate-950/80 border-slate-800 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-ivory font-mono text-sm">{cat.chemicalFormula}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-bold">
                        Eg = {cat.bandgapEv} eV
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory-subtle line-clamp-1">{cat.nameVi}</p>
                    <div className="text-[10px] text-ivory-muted pt-0.5">
                      {cat.lightAbsorptionRangeVi}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-2">
              <span className="font-bold text-amber-300 text-sm block">Đặc Tính Kỹ Thuật &amp; Độ Bền:</span>
              <p className="text-ivory-muted leading-relaxed">
                {activeCatalyst.stabilityNotesVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: Z-SCHEME ARTIFICIAL PHOTOSYNTHESIS (2 H2O -> 2 H2 + O2)           */}
      {/* ========================================================================= */}
      {activeTab === 'Z_SCHEME_PHOTOSYNTHESIS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-emerald-400" />
                  <span>Mô Hình Quang Hợp Nhân Tạo Chữ Z Kép (Z-Scheme) Sinh Hydro Xanh</span>
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Mô phỏng chu trình quang hợp tự nhiên (Photosystem II + I): kết hợp chất xúc tác sinh Hydro (HEP: SrTiO₃:Rh)
                  với chất xúc tác sinh Oxy (OEP: BiVO₄) qua cầu nối chuyển điện tử Ohmic Au nano,
                  tạo ra dòng khí Hydro xanh và Oxy tinh khiết tỉ lệ chuẩn 2 : 1.
                </p>
              </div>

              {/* Commercial STH Feasibility Badge */}
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-right">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Hiệu Suất Quang - Hydro (STH)</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {zSchemeResult.solarToHydrogenEfficiencyPercent}%
                </span>
                <span className={`text-[10px] block font-bold ${
                  zSchemeResult.meetsCommercialFeasibilityTarget ? 'text-emerald-300' : 'text-amber-400'
                }`}>
                  {zSchemeResult.meetsCommercialFeasibilityTarget ? 'ĐẠT CHUẨN THƯƠNG MẠI (≥ 10%)' : 'MỨC PHÒNG THÍ NGHIỆM'}
                </span>
              </div>
            </div>

            {/* Z-Scheme Dual Panel SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 700 250" className="w-full h-auto max-h-[250px]">
                {/* OEP Panel (BiVO4) on Left */}
                <rect x="80" y="80" width="160" height="120" fill="#047857" rx="8" stroke="#10b981" strokeWidth="2" />
                <text x="160" y="105" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="extrabold">
                  OEP: {zSchemeResult.oepCatalyst.chemicalFormula}
                </text>
                <text x="160" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="10">Oxi hóa H₂O</text>
                <text x="160" y="155" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                  2 H₂O → O₂↑ + 4 H⁺ + 4 e⁻
                </text>
                <text x="160" y="180" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">
                  Tốc độ O₂: {zSchemeResult.o2EvolutionRateMmolPerHour} mmol/h
                </text>

                {/* Ohmic Electron Mediator (Au / Redox shuttle) in Center */}
                <path d="M240 140 L460 140" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5 3" />
                <circle cx="350" cy="140" r="14" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
                <text x="350" y="144" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">Au nano</text>
                <text x="350" y="170" textAnchor="middle" fill="#fde047" fontSize="10">Tái hợp e⁻(OEP) và h⁺(HEP)</text>

                {/* HEP Panel (SrTiO3:Rh) on Right */}
                <rect x="460" y="80" width="160" height="120" fill="#0284c7" rx="8" stroke="#38bdf8" strokeWidth="2" />
                <text x="540" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="extrabold">
                  HEP: {zSchemeResult.hepCatalyst.chemicalFormula}
                </text>
                <text x="540" y="130" textAnchor="middle" fill="#bae6fd" fontSize="10">Khử ion H⁺</text>
                <text x="540" y="155" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                  2 H⁺ + 2 e⁻ → H₂↑
                </text>
                <text x="540" y="180" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Tốc độ H₂: {zSchemeResult.h2EvolutionRateMmolPerHour} mmol/h
                </text>

                {/* Stoichiometric Badge */}
                <text x="350" y="45" textAnchor="middle" fill="#a3e635" fontSize="12" fontWeight="bold">
                  Tỉ lệ thể tích cân bằng hoàn hảo: 2 H₂ : 1 O₂
                </text>
              </svg>
            </div>

            {/* Operating Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Cường độ bức xạ mặt trời:</span>
                  <span className="font-bold text-amber-400 font-mono">{solarFluxWm2} W/m² (AM1.5G)</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={solarFluxWm2}
                  onChange={(e) => setSolarFluxWm2(+e.target.value)}
                  className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Diện tích tấm panel quang xúc tác:</span>
                  <span className="font-bold text-emerald-400 font-mono">{reactorAreaM2.toFixed(1)} m²</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={reactorAreaM2}
                  onChange={(e) => setReactorAreaM2(+e.target.value)}
                  className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: PEROVSKITE-SILICON TANDEM SOLAR CELL                              */}
      {/* ========================================================================= */}
      {activeTab === 'PEROVSKITE_TANDEM_SOLAR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Tandem Cross-Section SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Cấu Trúc Xếp Chồng 2 Tầng (2-Terminal Perovskite / Silicon Tandem)</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-950/80 text-sky-300 border border-sky-500/50">
                PCE Kỷ Lục: {tandemResult.tandemPcePercent}%
              </span>
            </div>

            {/* Tandem Cross Section SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 540 260" className="w-full h-auto max-h-[260px]">
                {/* Sunlight from above */}
                <line x1="270" y1="15" x2="270" y2="45" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
                <text x="270" y="35" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">
                  Bức xạ quang phổ mặt trời đầy đủ (300 - 1200 nm)
                </text>

                {/* Top Cell: Perovskite Layer (absorbs high-energy blue/green) */}
                <rect x="70" y="55" width="400" height="60" fill="#0284c7" rx="4" stroke="#38bdf8" strokeWidth="2" />
                <text x="270" y="80" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="extrabold">
                  TẾ BÀO TRÊN: HALIDE PEROVSKITE (Eg = {perovskiteBandgap} eV)
                </text>
                <text x="270" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">
                  Hấp thụ photon năng lượng cao (Tử ngoại, Xanh lam, Xanh lục: λ &lt; 740 nm)
                </text>

                {/* Recombination Junction Layer (ITO / Tunnel junction) */}
                <rect x="70" y="120" width="400" height="15" fill="#f59e0b" opacity="0.8" />
                <text x="270" y="131" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">
                  Lớp tiếp xúc xuyên hầm ITO / Đường nối 2 cực (2-Terminal Interconnect)
                </text>

                {/* Bottom Cell: Silicon Substrate (absorbs NIR transmitted photons) */}
                <rect x="70" y="140" width="400" height="80" fill="#334155" rx="4" stroke="#64748b" strokeWidth="2" />
                <text x="270" y="175" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="extrabold">
                  TẾ BÀO DƯỚI: SILICON ĐƠN TINH THỂ c-Si (Eg = 1.12 eV)
                </text>
                <text x="270" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                  Hấp thụ photon hồng ngoại gần NIR xuyên qua (λ: 740 - 1100 nm)
                </text>
              </svg>
            </div>

            <p className="text-xs text-ivory-muted bg-slate-950 p-3 rounded-xl border border-slate-800">
              {tandemResult.currentMatchingStatusVi}
            </p>
          </div>

          {/* Right Column: Bandgap Tuning Slider & Efficiency Comparison */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Điều Hợp Vùng Cấm Perovskite Lớp Trên</span>
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Vùng cấm Perovskite (Eg):</span>
                  <span className="font-bold text-sky-400 font-mono">{perovskiteBandgap.toFixed(2)} eV</span>
                </div>
                <input
                  type="range"
                  min="1.50"
                  max="1.90"
                  step="0.01"
                  value={perovskiteBandgap}
                  onChange={(e) => setPerovskiteBandgap(+e.target.value)}
                  className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                  <span>1.50 eV (Giàu Iod I⁻)</span>
                  <span>1.68 eV (Tối ưu)</span>
                  <span>1.90 eV (Giàu Brom Br⁻)</span>
                </div>
              </div>

              {/* Efficiency Gauges */}
              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-ivory-muted">Hiệu suất Tandem Perovskite/Si:</span>
                  <strong className="text-sky-300 font-mono text-sm">{tandemResult.tandemPcePercent}%</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-ivory-muted">Giới hạn Shockley-Queisser của Silicon:</span>
                  <strong className="text-rose-400 font-mono">29.4%</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-ivory-muted">Tăng trưởng hiệu suất so với Si chuẩn:</span>
                  <strong className="text-emerald-400 font-mono">+{tandemResult.efficiencyBoostPercent}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
