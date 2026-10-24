// src/components/visualizations/OsmosisColligativeVisualizer.tsx
// Milestone 40: Chemical Osmosis, Colligative Properties & Van 't Hoff Factor Interactive Visualizer
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 (Hóa 10-12: Áp suất thẩm thấu, Băng điểm, Điểm sôi)

import React, { useState } from 'react';
import {
  COLLIGATIVE_SOLUTES,
  ColligativeSolute,
  calculateOsmoticPressure,
  calculateColligativeProperties,
  simulateReverseOsmosisDesalination,
  PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM,
} from '../../domain/osmosisColligativeEngine';
import { sound } from '../../audio/soundEngine';
import {
  Droplets,
  Activity,
  Waves,
  Scale,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export interface OsmosisColligativeVisualizerProps {
  initialSoluteId?: string;
}

export const OsmosisColligativeVisualizer: React.FC<OsmosisColligativeVisualizerProps> = ({
  initialSoluteId,
}) => {
  const [selectedSoluteId, setSelectedSoluteId] = useState<string>(initialSoluteId || 'sodium_chloride');
  const [concentrationM, setConcentrationM] = useState<number>(0.154); // Default to physiological saline 0.154 M
  const [temperatureC, setTemperatureC] = useState<number>(37.0); // Default to body temperature 37 °C
  const [activeTab, setActiveTab] = useState<'osmosis' | 'colligative' | 'reverse_osmosis'>('osmosis');

  // Reverse Osmosis parameters
  const [feedSalinityGPerL, setFeedSalinityGPerL] = useState<number>(35.0); // 35 g/L seawater
  const [appliedPressureBar, setAppliedPressureBar] = useState<number>(65.0); // 65 bar standard SWRO
  const [recoveryPercent, setRecoveryPercent] = useState<number>(45);

  const solute: ColligativeSolute = COLLIGATIVE_SOLUTES[selectedSoluteId] || COLLIGATIVE_SOLUTES.sodium_chloride;
  const tempK = temperatureC + 273.15;

  const osmosisResult = calculateOsmoticPressure(solute.id, concentrationM, tempK);
  const colligativeResult = calculateColligativeProperties(solute.id, concentrationM);
  const roResult = simulateReverseOsmosisDesalination(feedSalinityGPerL, appliedPressureBar, recoveryPercent);

  // Tonicity color coding
  const getTonicityBadge = () => {
    switch (osmosisResult.tonicity) {
      case 'ISOTONIC':
        return {
          label: 'ĐẲNG TRƯƠNG (ISOTONIC)',
          bg: 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        };
      case 'HYPOTONIC':
        return {
          label: 'NHƯỢC TRƯƠNG (HYPOTONIC - NGUY CƠ TIÊU HUYẾT)',
          bg: 'bg-rose-950/60 border-rose-500/50 text-rose-300',
          icon: <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
        };
      case 'HYPERTONIC':
        return {
          label: 'ƯU TRƯƠNG (HYPERTONIC - TEO HỒNG CẦU)',
          bg: 'bg-amber-950/60 border-amber-500/50 text-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        };
    }
  };

  const tonicityBadge = getTonicityBadge();

  return (
    <div className="w-full bg-navy/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with IUPAC & GDPT 2018 badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Droplets className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Áp Suất Thẩm Thấu & Tính Chất Nồng Độ
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono">
                GDPT 2018
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Mô phỏng Thẩm thấu Pfeffer, Độ hạ băng điểm, Tăng nhiệt độ sôi & Khử mặn thẩm thấu ngược (RO) theo Hệ số Van 't Hoff.
          </p>
        </div>

        {/* Global Solute Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-ivory-muted font-mono whitespace-nowrap">Chất tan:</span>
          <select
            value={selectedSoluteId}
            onChange={(e) => {
              sound.playUiClick();
              sound.playOsmoticFlowTrickle?.();
              setSelectedSoluteId(e.target.value);
            }}
            className="w-full sm:w-64 bg-navy-light/60 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
          >
            {Object.values(COLLIGATIVE_SOLUTES).map((s) => (
              <option key={s.id} value={s.id} className="bg-navy text-white">
                {s.nameVI} ({s.formula}) [i_max = {s.theoreticalMaxI}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Solute Chemical Dossier Banner */}
      <div className="p-3.5 rounded-xl bg-navy-light/30 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
            {solute.soluteType === 'NON_ELECTROLYTE'
              ? 'Không điện ly (i = 1.0)'
              : solute.soluteType === 'STRONG_ELECTROLYTE'
              ? `Điện ly mạnh (n = ${solute.ionCountN})`
              : 'Điện ly yếu (Ka)'}
          </span>
          <span className="text-ivory-muted">M = <strong className="text-white">{solute.molarMassGPerMol} g/mol</strong></span>
          <span className="text-ivory-muted">Phân ly: <code className="text-cyan-200">{solute.dissociationEquation}</code></span>
        </div>
        <div className="text-cyan-300 font-bold">
          Hệ số Van 't Hoff hiệu dụng: i = {osmosisResult.apparentVanTHoffI}
        </div>
      </div>

      {/* 3. Sub-tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            sound.playOsmoticFlowTrickle?.();
            setActiveTab('osmosis');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'osmosis'
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>Thẩm Thấu Pfeffer & Hồng Cầu (Π = iCRT)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            sound.playOsmoticFlowTrickle?.();
            setActiveTab('colligative');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'colligative'
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>Băng Điểm, Điểm Sôi & Áp Suất Hơi (ΔTf & ΔTb)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            sound.playOsmoticFlowTrickle?.();
            setActiveTab('reverse_osmosis');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reverse_osmosis'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Waves className="w-4 h-4" />
          <span>Thẩm Thấu Ngược (Khử Mặn RO Công Nghiệp)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PFEFFER OSMOMETER & RED BLOOD CELL TONICITY                       */}
      {/* ========================================================================= */}
      {activeTab === 'osmosis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sliders for Osmosis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-cyan-500/20">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Nồng độ mol (C):</span>
                <span className="text-cyan-300 font-bold">{concentrationM.toFixed(3)} M ({concentrationM * solute.molarMassGPerMol < 1000 ? `${(concentrationM * solute.molarMassGPerMol).toFixed(1)} g/L` : `${((concentrationM * solute.molarMassGPerMol)/10).toFixed(1)} %`})</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.5"
                step="0.01"
                value={concentrationM}
                onChange={(e) => {
                  setConcentrationM(parseFloat(e.target.value));
                  if (Math.random() < 0.2) sound.playOsmoticFlowTrickle?.();
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0.01 M (Nhược trương)</span>
                <button
                  onClick={() => setConcentrationM(0.154)}
                  className="text-cyan-400 underline hover:text-cyan-200"
                >
                  0.154 M (NaCl 0.9% sinh lý)
                </button>
                <span>1.50 M (Ưu trương)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Nhiệt độ (T):</span>
                <span className="text-amber-300 font-bold">{temperatureC.toFixed(1)} °C ({tempK.toFixed(1)} K)</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="1"
                value={temperatureC}
                onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0 °C (273.15 K)</span>
                <button
                  onClick={() => setTemperatureC(37.0)}
                  className="text-amber-400 underline hover:text-amber-200"
                >
                  37.0 °C (Thân nhiệt)
                </button>
                <span>80 °C (353.15 K)</span>
              </div>
            </div>
          </div>

          {/* Interactive Pfeffer Tube & RBC Dual Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Pfeffer U-Tube Column SVG (7 cols) */}
            <div className="lg:col-span-7 p-4 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Mô Hình Ống Thẩm Thấu Pfeffer (Osmometer)
                </span>
                <span className="text-[11px] font-mono text-cyan-200">
                  Cột nước h = <strong className="text-white">{osmosisResult.equilibriumWaterColumnHeightCm > 1000 ? `${(osmosisResult.equilibriumWaterColumnHeightCm / 100).toFixed(1)} m` : `${osmosisResult.equilibriumWaterColumnHeightCm.toFixed(1)} cm`}</strong>
                </span>
              </div>

              {/* Dynamic SVG Pfeffer U-Tube */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 340 240" className="w-full max-w-md h-auto">
                  <defs>
                    <linearGradient id="soluteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* Outer Beaker containing pure water */}
                  <rect x="40" y="80" width="260" height="130" rx="8" fill="url(#waterGrad)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="170" y="200" textAnchor="middle" fill="#bae6fd" fontSize="10" fontFamily="monospace">
                    Nước cất tinh khiết (H2O, nồng độ solute = 0)
                  </text>

                  {/* Semipermeable membrane Bell (Funnel) */}
                  <path d="M 120 40 L 120 120 L 90 170 L 250 170 L 220 120 L 220 40 Z" fill="url(#soluteGrad)" stroke="#38bdf8" strokeWidth="2" />

                  {/* Semipermeable membrane bottom border */}
                  <line x1="90" y1="170" x2="250" y2="170" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3 3" />
                  <text x="170" y="185" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                    MÀNG BÁN THẤM (SEMI-PERMEABLE MEMBRANE)
                  </text>

                  {/* Liquid column rising inside capillary */}
                  {/* Base height at y=120, max rise to y=50 */}
                  {(() => {
                    const riseNorm = Math.min(1.0, osmosisResult.osmoticPressureAtm / 30);
                    const colY = 120 - riseNorm * 75;
                    return (
                      <g>
                        <rect x="122" y={colY} width="96" height={120 - colY} fill="#38bdf8" fillOpacity="0.5" />
                        <line x1="120" y1={colY} x2="220" y2={colY} stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="170" cy={colY} r="3" fill="#ffffff" />
                        <text x="170" y={colY - 6} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          Δh ({osmosisResult.osmoticPressureAtm} atm)
                        </text>
                      </g>
                    );
                  })()}

                  {/* Water influx arrows penetrating membrane */}
                  <g className="animate-pulse">
                    <line x1="130" y1="180" x2="130" y2="162" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="170" y1="180" x2="170" y2="162" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="210" y1="180" x2="210" y2="162" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="126,164 130,158 134,164" fill="#38bdf8" />
                    <polygon points="166,164 170,158 174,164" fill="#38bdf8" />
                    <polygon points="206,164 210,158 214,164" fill="#38bdf8" />
                  </g>

                  {/* Label inside funnel */}
                  <text x="170" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    Dung dịch {solute.nameVI}
                  </text>
                  <text x="170" y="158" textAnchor="middle" fill="#93c5fd" fontSize="9">
                    Π = {osmosisResult.osmoticPressureAtm} atm ({osmosisResult.osmoticPressureKPa} kPa)
                  </text>
                </svg>
              </div>

              {/* Formula & Calculation Box */}
              <div className="w-full p-2.5 rounded-lg bg-navy/80 border border-cyan-500/30 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-ivory-muted">Định luật Van 't Hoff: </span>
                  <strong className="text-cyan-300">Π = i · C · R · T</strong>
                </div>
                <div className="text-cyan-200">
                  = ({osmosisResult.apparentVanTHoffI}) × ({concentrationM}) × (0.08206) × ({tempK.toFixed(1)}) = <strong className="text-white">{osmosisResult.osmoticPressureAtm} atm</strong>
                </div>
              </div>
            </div>

            {/* Red Blood Cell (RBC) Tonicity Response (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between gap-4">
              <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Đáp Ứng Sinh Học Tế Bào Hồng Cầu (RBC)
                </span>
              </div>

              {/* Tonicity Status Pill */}
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${tonicityBadge.bg}`}>
                {tonicityBadge.icon}
                <span>{tonicityBadge.label}</span>
              </div>

              {/* Dynamic RBC Shape Illustration SVG */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 160 120" className="w-40 h-32">
                  {osmosisResult.rbcResponse === 'NORMAL_BICONCAVE' && (
                    <g>
                      {/* Normal Biconcave Disc */}
                      <ellipse cx="80" cy="60" rx="55" ry="32" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
                      <ellipse cx="80" cy="60" rx="30" ry="15" fill="#b91c1c" opacity="0.65" />
                      <text x="80" y="105" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">
                        Đĩa lõm 2 mặt bình thường
                      </text>
                    </g>
                  )}

                  {osmosisResult.rbcResponse === 'TURGID_HEMOLYSIS' && (
                    <g className="animate-pulse">
                      {/* Swollen Sphere with Burst Risk */}
                      <circle cx="80" cy="55" r="44" fill="#f87171" stroke="#dc2626" strokeWidth="3" />
                      {/* Burst fragments */}
                      <circle cx="45" cy="25" r="3" fill="#ef4444" />
                      <circle cx="115" cy="22" r="4" fill="#ef4444" />
                      <circle cx="120" cy="85" r="3" fill="#ef4444" />
                      <circle cx="35" cy="75" r="3.5" fill="#ef4444" />
                      <text x="80" y="112" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                        Trương phồng & Tiêu huyết (Lysis)
                      </text>
                    </g>
                  )}

                  {osmosisResult.rbcResponse === 'CRENATION_SHRIVELED' && (
                    <g>
                      {/* Spiky Crenated Shriveled Cell */}
                      <path
                        d="M 80 25 L 90 35 L 105 30 L 105 45 L 120 50 L 115 65 L 125 78 L 110 85 L 102 100 L 88 92 L 75 100 L 68 86 L 50 82 L 58 68 L 45 54 L 60 48 L 62 34 L 75 36 Z"
                        fill="#a855f7"
                        stroke="#7e22ce"
                        strokeWidth="2"
                      />
                      <text x="80" y="114" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">
                        Teo nhăn nhúm (Crenation)
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Description text */}
              <p className="text-xs text-ivory-muted leading-relaxed bg-navy-light/30 p-2.5 rounded-lg border border-white/5">
                {osmosisResult.rbcDescriptionVI}
              </p>

              {/* Osmolarity Metric Box */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-navy-light/40 border border-white/10">
                  <span className="text-[10px] text-ivory-muted">Áp suất thẩm thấu:</span>
                  <div className="text-white font-bold">{osmosisResult.osmoticPressureAtm} atm</div>
                </div>
                <div className="p-2 rounded bg-navy-light/40 border border-white/10">
                  <span className="text-[10px] text-ivory-muted">Huyết tương chuẩn:</span>
                  <div className="text-emerald-400 font-bold">{PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM} atm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COLLIGATIVE PROPERTIES (EBULLIOSCOPY & CRYOSCOPY)                 */}
      {/* ========================================================================= */}
      {activeTab === 'colligative' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Molality Slider */}
          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-ivory-muted">Nồng độ molal (m = mol chất tan / kg dung môi H2O):</span>
              <span className="text-amber-300 font-bold">{concentrationM.toFixed(3)} mol/kg</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="3.0"
              step="0.05"
              value={concentrationM}
              onChange={(e) => setConcentrationM(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
              <span>0.05 m (Dung dịch loãng)</span>
              <span>1.0 m (Dung dịch chuẩn)</span>
              <span>3.0 m (Đậm đặc)</span>
            </div>
          </div>

          {/* Colligative Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Freezing point depression */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
              <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-bold">
                <Thermometer className="w-4 h-4" /> Độ Hạ Băng Điểm (Cryoscopy)
              </span>
              <div className="text-2xl font-black text-white font-mono">
                ΔTf = {colligativeResult.deltaTfCelsius.toFixed(3)} °C
              </div>
              <div className="text-xs text-cyan-200 font-mono">
                Băng điểm dung dịch: <strong className="text-white">{colligativeResult.solutionFreezingPointCelsius.toFixed(3)} °C</strong>
              </div>
              <p className="text-[11px] text-ivory-muted leading-tight">
                ΔTf = i · Kf · m với hằng số nghiệm lạnh của nước Kf = 1.86 °C·kg/mol.
              </p>
            </div>

            {/* Boiling point elevation */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
              <span className="text-xs font-mono text-amber-300 flex items-center gap-1.5 font-bold">
                <Thermometer className="w-4 h-4" /> Độ Tăng Điểm Sôi (Ebullioscopy)
              </span>
              <div className="text-2xl font-black text-white font-mono">
                ΔTb = {colligativeResult.deltaTbCelsius.toFixed(3)} °C
              </div>
              <div className="text-xs text-amber-200 font-mono">
                Nhiệt độ sôi dung dịch: <strong className="text-white">{colligativeResult.solutionBoilingPointCelsius.toFixed(3)} °C</strong>
              </div>
              <p className="text-[11px] text-ivory-muted leading-tight">
                ΔTb = i · Kb · m với hằng số nghiệm sôi của nước Kb = 0.512 °C·kg/mol.
              </p>
            </div>

            {/* Raoult's Vapor Pressure Lowering */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2">
              <span className="text-xs font-mono text-purple-300 flex items-center gap-1.5 font-bold">
                <Waves className="w-4 h-4" /> Hạ Áp Suất Hơi Bão Hòa (Raoult)
              </span>
              <div className="text-2xl font-black text-white font-mono">
                ΔP = {colligativeResult.deltaPmmHg.toFixed(3)} mmHg
              </div>
              <div className="text-xs text-purple-200 font-mono">
                Áp suất hơi ở 25 °C: <strong className="text-white">{colligativeResult.vaporPressureMmHg.toFixed(3)} mmHg</strong> (gốc 23.76 mmHg)
              </div>
              <p className="text-[11px] text-ivory-muted leading-tight">
                ΔP = x_solute · P0. Các hạt chất tan cản trở phân tử nước bay hơi khỏi bề mặt.
              </p>
            </div>
          </div>

          {/* Invariant Comparison: Kf / Kb = 3.633 & De-icing application */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" /> Bất Biến Vật Lý: Tỷ số Hằng Số Nghiệm Lạnh / Nghiệm Sôi
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Kf / Kb = 1.86 / 0.512 = 3.633
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Tại sao mùa đông người ta rắc muối (NaCl hoặc CaCl2) để rã băng tuyết trên đường mà không dùng đường?
              Vì <strong>CaCl2 phân ly cho 3 ion (i ≈ 2.7)</strong> và <strong>NaCl cho 2 ion (i ≈ 1.9)</strong> giúp hạ băng điểm xuống sâu hơn nhiều lần so với đường không điện ly (i = 1.0). Đồng thời, hằng số Kf của nước (1.86) lớn gấp 3.63 lần Kb (0.512), nên độ hạ băng điểm luôn vượt trội độ tăng điểm sôi!
            </p>

            <pre className="p-3 rounded-lg bg-navy/80 text-xs text-cyan-200 font-mono whitespace-pre-wrap">
              {colligativeResult.pedagogicalExplanationVI}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INDUSTRIAL SEAWATER REVERSE OSMOSIS (SWRO)                       */}
      {/* ========================================================================= */}
      {activeTab === 'reverse_osmosis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sliders for RO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-blue-500/20">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Độ mặn nước biển nguồn (Feed Salinity):</span>
                <span className="text-blue-300 font-bold">{feedSalinityGPerL} g/L (Áp suất thẩm thấu: ~{roResult.feedOsmoticPressureAtm} atm)</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value={feedSalinityGPerL}
                onChange={(e) => setFeedSalinityGPerL(parseFloat(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>10 g/L (Nước lợ)</span>
                <span>35 g/L (Đại dương chuẩn)</span>
                <span>60 g/L (Vịnh Ba Tư / Biển Đỏ)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ivory-muted">Áp suất bơm cao áp tác dụng (Applied Pressure):</span>
                <span className="text-cyan-300 font-bold">{appliedPressureBar} bar ({roResult.appliedPressureAtm} atm)</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={appliedPressureBar}
                onChange={(e) => setAppliedPressureBar(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>20 bar</span>
                <span>65 bar (SWRO chuẩn)</span>
                <span>100 bar (Áp suất cực cao)</span>
              </div>
            </div>
          </div>

          {/* RO Performance Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
            <div className="p-3.5 rounded-xl bg-navy-light/40 border border-white/10">
              <span className="text-[10px] text-ivory-muted">Lực đẩy hiệu dụng (Net Driving Pressure):</span>
              <div className={`text-xl font-bold ${roResult.isDesalinationFeasible ? 'text-emerald-400' : 'text-rose-400'}`}>
                {roResult.netDrivingPressureAtm} atm
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-light/40 border border-white/10">
              <span className="text-[10px] text-ivory-muted">Lưu lượng nước ngọt qua màng (Flux):</span>
              <div className="text-xl font-bold text-cyan-300">
                {roResult.permeateFluxLPerM2Hour} L/(m²·h)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-light/40 border border-white/10">
              <span className="text-[10px] text-ivory-muted">Hiệu suất ngăn muối (Rejection):</span>
              <div className="text-xl font-bold text-white">
                {roResult.saltRejectionPercent}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-light/40 border border-white/10">
              <span className="text-[10px] text-ivory-muted">Độ mặn nước sau lọc (TDS):</span>
              <div className={`text-xl font-bold ${roResult.permeateSalinityMgPerL <= 500 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {roResult.permeateSalinityMgPerL} mg/L
              </div>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs leading-relaxed ${
            roResult.isDesalinationFeasible
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
          }`}>
            {roResult.isDesalinationFeasible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
            <span>{roResult.statusVI}</span>
          </div>
        </div>
      )}
    </div>
  );
};
