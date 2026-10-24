// src/components/visualizations/PetRadiochemistryVisualizer.tsx
// Milestone 68: Positron Emission Tomography (PET) Radiochemistry & β⁺ Annihilation Coincidence Visualizer
// Standards: 511 keV Collinear Photon Annihilation & [¹⁸F]FDG Warburg Metabolic Trapping (Hamacher 1986)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Phóng xạ β⁺, cặp phản vật chất e⁺-e⁻, định luật phóng xạ; Hóa học 12: Hóa học đồng vị hạt nhân; Sinh học 11-12: Chuyển hóa tế bào)

import React, { useState, useMemo } from 'react';
import {
  PET_RADIOCHEMISTRY_CATALOG,
  PetSpecimenStandard,
  simulatePetRadiochemistry,
  calculateRadioactiveDecayFraction,
  ELECTRON_REST_MASS_ENERGY_KEV
} from '../../domain/petRadiochemistryEngine';
import { sound } from '../../audio/soundEngine';
import {
  Radiation,
  Activity,
  Layers,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  Atom,
  RotateCcw,
  Flame,
  FileText,
  Compass,
  Play,
  Eye,
  Crosshair,
  Volume2,
  Maximize2,
  Zap,
  ShieldAlert,
  Clock,
  Target
} from 'lucide-react';

export interface PetRadiochemistryVisualizerProps {
  initialSpecimenId?: string;
}

export const PetRadiochemistryVisualizer: React.FC<PetRadiochemistryVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'f18_fdg_oncology_warburg'
  );
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(60.0);
  const [viewMode, setViewMode] = useState<
    'annihilation_coincidence_ring' | 'radioactive_decay_curve' | 'suv_compartment_breakdown' | 'warburg_glucose_trapping_scheme'
  >('annihilation_coincidence_ring');
  const [activeTab, setActiveTab] = useState<
    'beta_plus_annihilation_physics' | 'fdg_warburg_biochemistry' | 'suv_quantification_oncology' | 'curriculum_gdpt'
  >('beta_plus_annihilation_physics');

  const simResult = useMemo(() => {
    return simulatePetRadiochemistry(selectedSpecimenId, elapsedMinutes);
  }, [selectedSpecimenId, elapsedMinutes]);

  const {
    specimen,
    decayFraction,
    currentActivityMbq,
    suvMax,
    coincidenceEvents,
    trueCoincidenceRateCps
  } = simResult;

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const spec = PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === id);
    if (spec) {
      setElapsedMinutes(spec.uptakeTimeMinutes);
    }
    sound.playCyclotronRadioisotopeSurgeTone(spec?.halfLifeMinutes || 109.8);
  };

  const handleTriggerAnnihilation = () => {
    sound.playPetPositronAnnihilationPing(ELECTRON_REST_MASS_ENERGY_KEV);
  };

  const handleTriggerCyclotron = () => {
    sound.playCyclotronRadioisotopeSurgeTone(specimen.halfLifeMinutes);
  };

  // SVG dimensions for plots
  const svgW = 600;
  const svgH = 300;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  return (
    <div className="bg-slate-950/95 border border-rose-800/40 rounded-xl p-5 shadow-2xl backdrop-blur-md text-slate-100 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-800/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-rose-950/80 text-rose-300 border border-rose-700/50 flex items-center gap-1.5 shadow-sm">
              <Radiation className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              PET RADIOCHEMISTRY • β⁺ POSITRON ANNIHILATION
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/40">
              COLLINEAR 511 keV PHOTON COINCIDENCE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              GDPT 2018 VIETNAM
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Hóa Phóng Xạ PET & Hủy Cặp Positron 511 keV
            <span className="text-rose-400 font-serif italic text-lg">(Positron Emission Tomography & [¹⁸F]FDG Trapping)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng phân rã phóng xạ β⁺, sự hủy cặp e⁺-e⁻ sinh hai photon gamma {ELECTRON_REST_MASS_ENERGY_KEV} keV đối song song (180°), định vị thời gian bay TOF-PET và bẫy chuyển hóa Warburg trong ung bướu.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900/90 border border-rose-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-rose-400">Hoạt Độ Phóng Xạ A(t)</div>
            <div className="text-lg font-bold font-mono text-rose-200">
              {currentActivityMbq} <span className="text-xs text-rose-400 font-normal">MBq</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-amber-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400">Chỉ Số SUV Cực Đại</div>
            <div className="text-lg font-bold font-mono text-amber-200">
              {suvMax.toFixed(1)} <span className="text-xs text-amber-400 font-normal">SUV_max</span>
            </div>
          </div>
          <button
            onClick={handleTriggerAnnihilation}
            title="Kích hoạt âm thanh hủy cặp photon 511 keV trùng phùng"
            className="p-2.5 bg-rose-900/40 hover:bg-rose-800/60 border border-rose-600/50 rounded-lg text-rose-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-rose-300" />
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Carousel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-rose-400" />
          Mẫu Dược Chất Phóng Xạ Chuẩn PET (5 Chuẩn Quốc Tế IAEA/EANM):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PET_RADIOCHEMISTRY_CATALOG.map((std) => {
            const isSelected = std.id === selectedSpecimenId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectSpecimen(std.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-950/70 border-rose-400 shadow-md shadow-rose-950/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-rose-300">
                      {std.radionuclide.replace(/_/g, '-')}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug mb-1">{std.name}</div>
                  <div className="text-[11px] text-rose-200/80 line-clamp-2">{std.vietnameseName}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">t_½: {std.halfLifeMinutes}m</span>
                  <span className="text-amber-400">{std.positronMaxEnergyKev} keV</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Visualizer Canvas & Plots (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* View Mode Bar */}
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                onClick={() => {
                  setViewMode('annihilation_coincidence_ring');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'annihilation_coincidence_ring'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                Vành Trùng Phùng 511 keV (Detector Ring)
              </button>
              <button
                onClick={() => {
                  setViewMode('radioactive_decay_curve');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'radioactive_decay_curve'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Đường Cong Phân Rã A(t)
              </button>
              <button
                onClick={() => {
                  setViewMode('suv_compartment_breakdown');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'suv_compartment_breakdown'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Bản Đồ Bắt Giữ SUV Mô & Khối U
              </button>
              {specimen.id === 'f18_fdg_oncology_warburg' && (
                <button
                  onClick={() => {
                    setViewMode('warburg_glucose_trapping_scheme');
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'warburg_glucose_trapping_scheme'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Cơ Chế Bẫy Hexokinase Warburg
                </button>
              )}
            </div>

            <div className="text-[11px] font-mono text-rose-300 px-2 hidden sm:block">
              2γ = {ELECTRON_REST_MASS_ENERGY_KEV * 2} keV (Collinear 180°)
            </div>
          </div>

          {/* Render Active View Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[340px]">
            {viewMode === 'annihilation_coincidence_ring' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-rose-300">
                    Vành Tinh Thể Nhấp Nháy LSO/LYSO • {trueCoincidenceRateCps.toLocaleString()} Trùng Phùng/giây (cps)
                  </span>
                  <span className="font-mono text-amber-300">
                    Tầm bay positron trung bình: {specimen.meanPositronRangeMm} mm
                  </span>
                </div>

                <svg viewBox="0 0 600 280" className="w-full h-auto max-h-[290px]">
                  {/* Outer Gantry Ring */}
                  <circle cx="300" cy="140" r="125" fill="none" stroke="#334155" strokeWidth="18" opacity="0.6" />
                  <circle cx="300" cy="140" r="134" fill="none" stroke="#475569" strokeWidth="2" />
                  <circle cx="300" cy="140" r="116" fill="none" stroke="#475569" strokeWidth="2" />

                  {/* Scintillation Detector Blocks (Around the circle) */}
                  {[...Array(36)].map((_, i) => {
                    const angle = (i * 10 * Math.PI) / 180;
                    const bx = 300 + 125 * Math.cos(angle);
                    const by = 140 + 125 * Math.sin(angle);
                    return (
                      <circle key={`det-${i}`} cx={bx} cy={by} r="3.5" fill="#f43f5e" opacity="0.8" />
                    );
                  })}

                  {/* Patient Port FOV */}
                  <circle cx="300" cy="140" r="105" fill="#020617" opacity="0.75" />

                  {/* Coincidence Lines of Response (LORs) */}
                  {coincidenceEvents.slice(0, 16).map((evt, idx) => {
                    const r = 125;
                    const rad1 = (evt.detectorIndex1 * Math.PI) / 180;
                    const rad2 = (evt.detectorIndex2 * Math.PI) / 180;
                    const x1 = 300 + r * Math.cos(rad1);
                    const y1 = 140 + r * Math.sin(rad1);
                    const x2 = 300 + r * Math.cos(rad2);
                    const y2 = 140 + r * Math.sin(rad2);

                    return (
                      <line
                        key={`lor-${idx}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#f43f5e"
                        strokeWidth="1.2"
                        strokeDasharray="4,2"
                        opacity={0.35 + (idx % 3) * 0.25}
                      />
                    );
                  })}

                  {/* Center Annihilation Spot (Tumor / Hotspot Focus) */}
                  <g>
                    <circle cx="300" cy="140" r="14" fill="#fb7185" opacity="0.25" className="animate-ping" />
                    <circle cx="300" cy="140" r="7" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="300" y="162" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      Vùng Hủy Cặp e⁺ + e⁻
                    </text>
                  </g>

                  {/* Collinear Photons Arrow Indicators */}
                  <line x1="300" y1="140" x2="230" y2="80" stroke="#fbbf24" strokeWidth="2.5" />
                  <polygon points="226,76 235,80 231,85" fill="#fbbf24" />
                  <text x="220" y="70" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    γ₁ (511 keV)
                  </text>

                  <line x1="300" y1="140" x2="370" y2="200" stroke="#fbbf24" strokeWidth="2.5" />
                  <polygon points="374,204 365,200 369,195" fill="#fbbf24" />
                  <text x="380" y="215" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    γ₂ (511 keV)
                  </text>
                </svg>
              </div>
            )}

            {viewMode === 'radioactive_decay_curve' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-rose-300">
                    Định Luật Phóng Xạ Hạt Nhân: A(t) = A₀ · (½)^(t / t_½)
                  </span>
                  <span className="font-mono text-amber-300">
                    Chu kỳ bán rã t_½ = {specimen.halfLifeMinutes} phút
                  </span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const y = padT + plotH * (1 - tickFrac);
                    const aVal = (specimen.injectedDoseMbc * tickFrac).toFixed(0);
                    return (
                      <g key={`y-grid-${tickFrac}`}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={padL - 10} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {aVal} MBq
                        </text>
                      </g>
                    );
                  })}

                  {[0, 60, 120, 180, 240].map((tVal) => {
                    const x = padL + (tVal / 240) * plotW;
                    return (
                      <g key={`x-grid-${tVal}`}>
                        <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={x} y={padT + plotH + 18} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {tVal} min
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis lines */}
                  <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />
                  <line x1={padL} y1={padT + plotH} x2={svgW - padR} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />

                  {/* Decay Curve Polyline */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.8"
                    points={[...Array(60)]
                      .map((_, i) => {
                        const t = (i / 59) * 240;
                        const frac = Math.pow(0.5, t / specimen.halfLifeMinutes);
                        const px = padL + (t / 240) * plotW;
                        const py = padT + plotH * (1 - frac);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Current Active Time Point */}
                  {(() => {
                    const px = padL + (elapsedMinutes / 240) * plotW;
                    const py = padT + plotH * (1 - decayFraction);
                    return (
                      <g>
                        <circle cx={px} cy={py} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" className="animate-ping" opacity="0.4" />
                        <circle cx={px} cy={py} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1={px} y1={padT} x2={px} y2={padT + plotH} stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                      </g>
                    );
                  })()}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục Hoành: Thời gian phân rã trôi qua (phút)</span>
                  <span>Trục Tung: Hoạt độ phóng xạ còn lại A(t) (MBq)</span>
                </div>
              </div>
            )}

            {viewMode === 'suv_compartment_breakdown' && (
              <div className="w-full flex flex-col gap-2 p-2">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-rose-300">
                    Phổ Định Lượng Bắt Giữ Dược Chất SUV (Standardized Uptake Value)
                  </span>
                  <span className="font-mono text-amber-300">
                    Ngưỡng ác tính: SUV &gt; 2.5
                  </span>
                </div>

                <div className="space-y-3">
                  {specimen.compartments.map((comp) => {
                    const isMalignant = comp.metabolicStatus === 'HYPERMETABOLIC_MALIGNANT';
                    const barWidthPercent = Math.min(100, (comp.suvValue / 30.0) * 100);

                    return (
                      <div key={comp.name} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold flex items-center gap-1.5">
                            {isMalignant ? (
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                            ) : (
                              <Activity className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span className={isMalignant ? 'text-rose-300 font-bold' : 'text-slate-300'}>
                              {comp.vietnameseName}
                            </span>
                          </span>
                          <span className="font-mono">
                            <strong className={isMalignant ? 'text-rose-300' : 'text-amber-300'}>
                              {comp.suvValue.toFixed(1)} SUV
                            </strong>{' '}
                            <span className="text-[10px] text-slate-400">({comp.activityConcentrationKbqPerMl} kBq/mL)</span>
                          </span>
                        </div>

                        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isMalignant
                                ? 'bg-gradient-to-r from-amber-500 to-rose-600 shadow-lg shadow-rose-950/50'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-500 opacity-80'
                            }`}
                            style={{ width: `${barWidthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {viewMode === 'warburg_glucose_trapping_scheme' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-rose-300">
                    Cơ Chế Bẫy Chuyển Hóa [¹⁸F]FDG Bằng Enzyme Hexokinase (Hiệu Ứng Warburg)
                  </span>
                  <span className="font-mono text-amber-300">
                    Không thể đồng phân hóa Fructose-6-P
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full p-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-rose-800/40 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-rose-400 uppercase">1. Vận Chuyển GLUT1</div>
                    <div className="text-sm font-bold text-white my-1">[¹⁸F]FDG Đi Vào Tế Bào</div>
                    <div className="text-[10px] text-slate-400">
                      Tế bào ung thư biểu hiện quá mức chất vận chuyển glucose GLUT1 &amp; GLUT3, hút đường gấp hàng chục lần tế bào lành.
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/40 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-amber-400 uppercase">2. Phosphoryl Hóa</div>
                    <div className="text-sm font-bold text-amber-300 my-1">Hexokinase II (ATP)</div>
                    <div className="text-[10px] text-slate-400">
                      Enzyme Hexokinase gắn nhóm phosphate vào C6 tạo thành <code>[¹⁸F]FDG-6-Phosphate</code> mang điện tích âm lớn.
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/40 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-emerald-400 uppercase">3. Bẫy Chuyển Hóa</div>
                    <div className="text-sm font-bold text-emerald-300 my-1">Bị Khóa Trong Khối U</div>
                    <div className="text-[10px] text-slate-400">
                      Do mất nhóm -OH ở vị trí C2 (thay bằng ¹⁸F), phân tử không thể tiếp tục đường phân và không thể đi ra ngoài màng!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scrubbing & Controls Bar */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-2/3 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> Thời Gian Sau Tiêm Phóng Xạ:
                  </span>
                  <span className="font-mono text-rose-300 font-bold">
                    {elapsedMinutes} phút <span className="text-slate-400 font-normal">({(decayFraction * 100).toFixed(1)}% còn lại)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="240"
                  step="5"
                  value={elapsedMinutes}
                  onChange={(e) => setElapsedMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              <div className="w-full sm:w-1/3 flex items-center justify-end gap-2">
                <button
                  onClick={handleTriggerCyclotron}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Atom className="w-3.5 h-3.5 text-amber-400" />
                  Cyclotron Beam
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Diagnostics & Realtime Data (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Data Readout Card */}
          <div className="bg-slate-900/90 border border-rose-800/40 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-rose-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Radiation className="w-4 h-4 text-rose-400" />
              Thông Số Hạt Nhân & Định Lượng PET
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Đồng Vị & Phân Rã</div>
                <div className="text-base font-bold font-mono text-rose-300">
                  {specimen.radionuclide.replace(/_/g, '-')} <span className="text-[10px] font-normal text-slate-400">β⁺</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Năng Lượng Annihilation</div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {ELECTRON_REST_MASS_ENERGY_KEV} <span className="text-[10px] font-normal text-slate-400">keV</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Tốc Độ Đếm Trùng Phùng</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {trueCoincidenceRateCps.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">cps</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Tầm Bay Positron</div>
                <div className="text-base font-bold font-mono text-purple-300">
                  {specimen.meanPositronRangeMm} <span className="text-[10px] font-normal text-slate-400">mm</span>
                </div>
              </div>
            </div>

            {/* Target Biomarker Readout */}
            <div className="p-3 rounded-lg border bg-rose-950/40 border-rose-500/50 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-400" /> Đích Tác Dụng / Biomarker:
              </div>
              <div className="text-[11px] text-rose-200 mt-0.5">{specimen.targetOrganOrBiomarker}</div>
            </div>
          </div>

          {/* Specimen Description */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-rose-400" />
              Chi Tiết Mẫu Vật Chuẩn
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">{specimen.description}</div>
            <div className="text-[11px] text-rose-300/90 bg-rose-950/50 p-2.5 rounded-lg border border-rose-800/40 mt-1">
              <strong>Liên hệ chương trình GDPT 2018:</strong> {specimen.curriculumNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Educational & Academic Reference Tabs */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('beta_plus_annihilation_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'beta_plus_annihilation_physics'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Vật Lý Phóng Xạ β⁺ & Hủy Cặp Positron
          </button>
          <button
            onClick={() => setActiveTab('fdg_warburg_biochemistry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'fdg_warburg_biochemistry'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Sinh Hóa Bẫy [¹⁸F]FDG & Hiệu Ứng Warburg
          </button>
          <button
            onClick={() => setActiveTab('suv_quantification_oncology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'suv_quantification_oncology'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Định Lượng SUV Chuẩn Hóa Trong Ung Thư
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Tích Hợp GDPT 2018 Vật Lý, Hóa & Sinh
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          {activeTab === 'beta_plus_annihilation_physics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Vật Lý Phân Rã Hạt Nhân β⁺ & Quá Trình Hủy Cặp Positron (511 keV)
              </h4>
              <p>
                Khi một hạt nhân giàu proton trải qua phân rã beta cộng (β⁺ decay), một proton biến thành neutron, phóng thích một hạt positron (phản electron mang điện tích +e) và một hạt neutrino:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-rose-300 rounded border border-slate-800 text-center my-2">
                p → n + e⁺ + ν_e
              </div>
              <p>
                Positron chuyển động trong mô, mất dần động năng qua tán xạ Coulomb trong khoảng cách 0.2 - 2.5 mm. Khi đã bị nhiệt hóa, nó gặp một electron tự do trong môi trường và quá trình <strong>hủy cặp (annihilation)</strong> xảy ra. Theo định luật bảo toàn năng lượng và động lượng, toàn bộ khối lượng nghỉ của cặp hạt biến thành hai photon gamma phát ra đối song song góc 180° với năng lượng chính xác:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-rose-300 rounded border border-slate-800 text-center my-2">
                E_γ = m_e · c² = 511.0 keV
              </div>
            </div>
          )}

          {activeTab === 'fdg_warburg_biochemistry' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Cơ Chế Bẫy Chuyển Hóa [¹⁸F]FDG & Giải Nobel Otto Warburg
              </h4>
              <p>
                Năm 1924, Otto Warburg phát hiện các tế bào ác tính có xu hướng chuyển hóa năng lượng bằng con đường đường phân kỵ khí sinh axit lactic ngay cả khi có đầy đủ oxy (Hiệu ứng Warburg). Dược chất phóng xạ <strong>[¹⁸F]FDG</strong> (tổng hợp bởi Kurt Hamacher năm 1986 từ mannose triflate) được vận chuyển vào tế bào qua protein vận chuyển GLUT1.
              </p>
              <p>
                Enzyme Hexokinase phosphoryl hóa FDG thành [¹⁸F]FDG-6-phosphate. Vì phân tử thiếu nhóm -OH ở vị trí C2 (được thay thế bằng ¹⁸F), nó không thể bị enzyme phosphoglucose isomerase biến đổi thành fructose-6-phosphate để đi tiếp vào chu trình đường phân. Mặt khác, do mang điện tích âm của nhóm phosphate, nó không thể khuếch tán ngược qua màng tế bào và bị <strong>bẫy vĩnh viễn</strong> bên trong khối u.
              </p>
            </div>
          )}

          {activeTab === 'suv_quantification_oncology' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Định Lượng Giá Trị Bắt Giữ Chuẩn Hóa SUV (Standardized Uptake Value)
              </h4>
              <p>
                Để so sánh mức độ ác tính và đáp ứng điều trị giữa các bệnh nhân và qua các thời điểm khác nhau, y học hạt nhân sử dụng chỉ số SUV chuẩn hóa:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-rose-300 rounded border border-slate-800 text-center my-2">
                SUV = [ Nồng độ phóng xạ mô (Bq/g) ] / [ Liều tiêm toàn thân (Bq) / Trọng lượng cơ thể (g) ]
              </div>
              <p>
                Mô bình thường thường có SUV từ 1.0 đến 2.0. Các tổn thương ác tính chuyển hóa cao (ung thư phổi, u lympho, ung thư đại trực tràng) thường có SUV_max vượt quá 2.5 và có thể lên tới 15 - 30, mang lại độ nhạy và độ đặc hiệu xuất sắc trong chẩn đoán giai đoạn ung thư.
              </p>
            </div>
          )}

          {activeTab === 'curriculum_gdpt' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Chuẩn Hóa Sư Phạm Chương Trình Giáo Dục Phổ Thông 2018 (Việt Nam)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>
                  <strong>Vật lý 12 (Chủ đề Vật lý hạt nhân & Phóng xạ):</strong> Hiện tượng phân rã phóng xạ tự nhiên và nhân tạo, phóng xạ β⁺, khái niệm phản hạt và phản vật chất (positron), hệ thức Einstein E = mc² và hiện tượng hủy cặp hạt - phản hạt tạo bức xạ điện từ 511 keV.
                </li>
                <li>
                  <strong>Hóa học 12 (Chủ đề Hóa học hạt nhân & Carbohydrate):</strong> Điều chế đồng vị phóng xạ bằng máy gia tốc cyclotron, cấu trúc phân tử glucose và cơ chế phản ứng thế nucleophil SN2 tổng hợp dược chất phóng xạ.
                </li>
                <li>
                  <strong>Sinh học 11-12 (Chủ đề Chuyển hóa vật chất & Di truyền y học):</strong> Sự vận chuyển thụ động và chủ động qua màng tế bào, quá trình đường phân tế bào chất, sự biến đổi biểu hiện gen gây ra chuyển hóa bất thường ở tế bào ung thư.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
