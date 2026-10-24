import React, { useState, useMemo } from 'react';
import {
  Activity,
  Heart,
  Pill,
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info,
  Scale,
  Sparkles,
  Zap,
  Sliders,
  RotateCcw
} from 'lucide-react';
import {
  DRUG_CATALOG,
  DrugProfile,
  evaluateDrugAbsorptionAcrossOrgans,
  simulateOralSingleDose,
  assessParacetamolOverdoseAndNac
} from '../../domain/pharmacokineticsEngine';
import { sound } from '../../audio/soundEngine';

type PkMode = 'PH_PARTITION_IONIZATION' | 'BATEMAN_KINETICS_CURVE' | 'PARACETAMOL_NAC_NOMOGRAM';

export const PharmacokineticsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PkMode>('PH_PARTITION_IONIZATION');

  // Mode 1: Ionization & pH Partition state
  const [selectedDrugId, setSelectedDrugId] = useState<string>('ASPIRIN');
  const [selectedOrganIndex, setSelectedOrganIndex] = useState<number>(0);

  // Mode 2: Kinetics Curve state
  const [kineticsDrugId, setKineticsDrugId] = useState<string>('IBUPROFEN');
  const [doseMg, setDoseMg] = useState<number>(400);
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(60);

  // Mode 3: Paracetamol Overdose state
  const [paracetamolGrams, setParacetamolGrams] = useState<number>(12);
  const [hoursPostIngestion, setHoursPostIngestion] = useState<number>(6);
  const [isNacAdministered, setIsNacAdministered] = useState<boolean>(false);

  // Calculations
  const activeDrug = useMemo(() => {
    return DRUG_CATALOG.find(d => d.id === selectedDrugId) || DRUG_CATALOG[0];
  }, [selectedDrugId]);

  const organRatios = useMemo(() => {
    return evaluateDrugAbsorptionAcrossOrgans(selectedDrugId);
  }, [selectedDrugId]);

  const currentOrgan = organRatios[selectedOrganIndex] || organRatios[0];

  const kineticsResult = useMemo(() => {
    return simulateOralSingleDose(kineticsDrugId, doseMg, bodyWeightKg, 24);
  }, [kineticsDrugId, doseMg, bodyWeightKg]);

  const paracetamolResult = useMemo(() => {
    return assessParacetamolOverdoseAndNac(paracetamolGrams, hoursPostIngestion, isNacAdministered);
  }, [paracetamolGrams, hoursPostIngestion, isNacAdministered]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Pill className="w-4 h-4 text-rose-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Y - Dược & Động Dược Học</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Dược Động Học, Sự Ion Hóa Thuốc & Cửa Sổ Trị Liệu
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khảo sát định lượng quá trình ADME (Hấp thu, Phân bố, Chuyển hóa, Thải trừ): Thuyết pH-phân bố màng tế bào theo Henderson-Hasselbalch,
              đường cong nồng độ huyết tương Bateman, cửa sổ điều trị an toàn và mô phỏng giải độc Paracetamol bằng N-Acetylcysteine.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-rose-800/40 shrink-0">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('PH_PARTITION_IONIZATION');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'PH_PARTITION_IONIZATION'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Ion Hóa & Màng Tế Bào
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('BATEMAN_KINETICS_CURVE');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'BATEMAN_KINETICS_CURVE'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Đường Cong Bateman
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('PARACETAMOL_NAC_NOMOGRAM');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'PARACETAMOL_NAC_NOMOGRAM'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Giải Độc Paracetamol (NAC)
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: PH-PARTITION HYPOTHESIS & MEMBRANE DIFFUSION                  */}
      {/* ===================================================================== */}
      {activeMode === 'PH_PARTITION_IONIZATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Drug & Organ Selection */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Pill className="w-4 h-4 text-rose-400" />
                Chọn Dược Phẩm Khảo Sát
              </span>

              {/* Drug Pills */}
              <div className="grid grid-cols-2 gap-2">
                {DRUG_CATALOG.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedDrugId(d.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedDrugId === d.id
                        ? 'bg-rose-500 text-obsidian border-rose-400 shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:text-ivory'
                    }`}
                  >
                    <div>{d.nameVi.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-75 font-mono">{d.nature} · pKa {d.pKa}</div>
                  </button>
                ))}
              </div>

              {/* Organ Compartments */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400">Khoang Cơ Quan Trong Cơ Thể (pH Môi Trường):</span>
                <div className="space-y-1.5">
                  {organRatios.map((org, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedOrganIndex(idx);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        selectedOrganIndex === idx
                          ? 'bg-rose-950/60 border-rose-400 text-ivory font-bold shadow'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{org.organNameVi}</span>
                      <span className="font-mono text-rose-300 font-bold">pH = {org.nominalPh}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ionization Percentage Bars */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Dạng không ion hóa (Khuếch tán qua lipid):
                  </span>
                  <span className="font-mono font-extrabold text-emerald-400">{currentOrgan.fractionUnIonizedPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${currentOrgan.fractionUnIonizedPercent}%` }} />
                  <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${currentOrgan.fractionIonizedPercent}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs text-rose-400">
                  <span>Dạng ion hóa (Bị cản lại trong nước):</span>
                  <span className="font-mono font-bold">{currentOrgan.fractionIonizedPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lipid Bilayer Membrane Diffusion Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-rose-400 font-bold">
                MÔ PHỎNG KHUẾCH TÁN QUA LỚP KÉP PHOSPHOLIPID (LIPID BILAYER PASSIVE DIFFUSION)
              </span>

              {/* Membrane SVG */}
              <svg viewBox="0 0 460 220" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="lumenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="bloodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#881337" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4c0519" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Upper: Lumen Region */}
                <rect x="20" y="20" width="420" height="70" rx="6" fill="url(#lumenGrad)" stroke="#334155" strokeWidth="1" />
                <text x="35" y="42" fill="#94a3b8" fontSize="11" fontWeight="bold">LÒNG ỐNG TIÊU HÓA ({currentOrgan.organNameVi.split(' ')[0]} - pH {currentOrgan.nominalPh})</text>

                {/* Lipid Bilayer Membrane Center (y: 95 to 135) */}
                <rect x="20" y="95" width="420" height="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                {/* Phospholipid Heads & Tails (Upper leaflet) */}
                {[...Array(17)].map((_, i) => (
                  <g key={`up-${i}`}>
                    <circle cx={40 + i * 24} cy="102" r="5" fill="#f59e0b" />
                    <line x1={38 + i * 24} y1="107" x2={38 + i * 24} y2="114" stroke="#d97706" strokeWidth="1.5" />
                    <line x1={42 + i * 24} y1="107" x2={42 + i * 24} y2="114" stroke="#d97706" strokeWidth="1.5" />
                  </g>
                ))}
                {/* Phospholipid Heads & Tails (Lower leaflet) */}
                {[...Array(17)].map((_, i) => (
                  <g key={`down-${i}`}>
                    <circle cx={40 + i * 24} cy="128" r="5" fill="#f59e0b" />
                    <line x1={38 + i * 24} y1="123" x2={38 + i * 24} y2="116" stroke="#d97706" strokeWidth="1.5" />
                    <line x1={42 + i * 24} y1="123" x2={42 + i * 24} y2="116" stroke="#d97706" strokeWidth="1.5" />
                  </g>
                ))}
                <text x="430" y="118" fill="#fbbf24" fontSize="10" textAnchor="end" fontFamily="monospace">Màng Lipid Kép</text>

                {/* Lower: Blood Capillary Region */}
                <rect x="20" y="140" width="420" height="70" rx="6" fill="url(#bloodGrad)" stroke="#4c0519" strokeWidth="1" />
                <text x="35" y="195" fill="#f43f5e" fontSize="11" fontWeight="bold">MAO MẠCH MÁU (Huyết tương - pH 7.4)</text>

                {/* Drug Molecules Penetration Demonstration */}
                {/* Non-ionized molecules (Green) passing through */}
                <g>
                  <circle cx="160" cy="55" r="7" fill="#10b981" />
                  <text x="160" y="58" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">HA</text>
                  <path d="M 160 65 L 160 165" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="160,172 156,164 164,164" fill="#10b981" />
                  <circle cx="160" cy="180" r="7" fill="#10b981" />
                  <text x="160" y="183" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">HA</text>
                  <text x="180" y="120" fill="#34d399" fontSize="9" fontWeight="bold">Khuếch tán</text>
                </g>

                {/* Ionized molecules (Red) bouncing off */}
                <g>
                  <circle cx="280" cy="55" r="7" fill="#f43f5e" />
                  <text x="280" y="58" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">A⁻</text>
                  <path d="M 280 65 L 280 92 Q 280 98 295 90 L 310 75" stroke="#f43f5e" strokeWidth="2" fill="none" />
                  <polygon points="314,71 306,75 311,81" fill="#f43f5e" />
                  <text x="300" y="112" fill="#f87171" fontSize="9" fontWeight="bold">Bị chặn lại</text>
                </g>
              </svg>

              {/* Chemical Mechanism Card */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-rose-400 font-mono block mb-1">Cơ sở lý thuyết Henderson-Hasselbalch:</span>
                <p className="text-xs text-ivory leading-relaxed">{currentOrgan.explanationVi}</p>
                <div className="mt-2 text-[11px] font-mono text-emerald-400">
                  {currentOrgan.isFavorableForPassiveAbsorption ? '✓ ĐIỀU KIỆN HẤP THU THUẬN LỢI' : '✗ HẤP THU THỤ ĐỘNG HẠN CHẾ'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: ONE-COMPARTMENT BATEMAN KINETICS CURVE                        */}
      {/* ===================================================================== */}
      {activeMode === 'BATEMAN_KINETICS_CURVE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-5 space-y-5">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Thông Số Liều Lượng & Thể Trạng Bệnh Nhân
              </span>

              {/* Drug Selection */}
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {DRUG_CATALOG.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      sound.playUiClick();
                      setKineticsDrugId(d.id);
                    }}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      kineticsDrugId === d.id
                        ? 'bg-amber-500 text-obsidian border-amber-400 shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.nameVi.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Dose Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Liều dùng đường uống (Oral Dose):</span>
                  <span className="font-mono font-bold text-amber-400">{doseMg} mg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={doseMg}
                  onChange={e => {
                    sound.playUiClick();
                    setDoseMg(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Body Weight Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Cân nặng bệnh nhân:</span>
                  <span className="font-mono font-bold text-ivory">{bodyWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={bodyWeightKg}
                  onChange={e => {
                    sound.playUiClick();
                    setBodyWeightKg(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Pharmacokinetic Results Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nồng độ đỉnh (C_max):</span>
                  <span className="font-mono font-bold text-amber-400">{kineticsResult.cMaxMgL} mg/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thời gian đạt đỉnh (T_max):</span>
                  <span className="font-mono font-bold text-ivory">{kineticsResult.tMaxHours} giờ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thời gian bán thải (t_1/2):</span>
                  <span className="font-mono font-bold text-ivory">{kineticsResult.drug.halfLifeHours} giờ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Độ thanh thải toàn phần (Cl):</span>
                  <span className="font-mono text-cyan-400 font-bold">{kineticsResult.clearanceLPerHr} L/giờ</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-[11px]">
                  <span className="text-slate-400">Đào thải {'>'} 96.9% sau 5 t_1/2:</span>
                  <span className="font-mono text-emerald-400 font-bold">{kineticsResult.fiveHalfLivesHours} giờ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Concentration-Time Curve SVG */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-amber-400 font-bold">
                ĐỒ THỊ NỒNG ĐỘ HUYẾT TƯƠNG THEO THỜI GIAN (BATEMAN PHARMACOKINETICS)
              </span>

              {/* Curve SVG */}
              <svg viewBox="0 0 460 240" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Axes */}
                <line x1="40" y1="200" x2="440" y2="200" stroke="#475569" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="2" />
                <text x="440" y="215" fill="#94a3b8" fontSize="10" textAnchor="end">Thời gian (giờ)</text>
                <text x="30" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Nồng độ (mg/L)</text>

                {/* Therapeutic Window Shading (MEC to MTC) */}
                {(() => {
                  const maxPlotConc = Math.max(kineticsResult.cMaxMgL * 1.3, kineticsResult.drug.therapeuticWindow.mtc * 1.2, 30);
                  const scaleY = (conc: number) => 200 - (conc / maxPlotConc) * 170;
                  const scaleX = (t: number) => 40 + (t / 24) * 380;

                  const yMec = scaleY(kineticsResult.drug.therapeuticWindow.mec);
                  const yMtc = scaleY(kineticsResult.drug.therapeuticWindow.mtc);

                  // Curve path
                  const pointsStr = kineticsResult.curvePoints
                    .map(p => `${scaleX(p.timeHours)},${scaleY(p.concentrationMgL)}`)
                    .join(' L ');

                  return (
                    <>
                      {/* Therapeutic Band */}
                      <rect x="40" y={Math.max(20, yMtc)} width="380" height={Math.max(4, yMec - yMtc)} fill="#10b981" fillOpacity="0.15" />
                      <line x1="40" y1={yMtc} x2="420" y2={yMtc} stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="425" y={yMtc + 3} fill="#ef4444" fontSize="9" fontWeight="bold">MTC</text>

                      <line x1="40" y1={yMec} x2="420" y2={yMec} stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="425" y={yMec + 3} fill="#10b981" fontSize="9" fontWeight="bold">MEC</text>

                      {/* Area under curve */}
                      <path d={`M 40,200 L ${pointsStr} L ${scaleX(24)},200 Z`} fill="url(#curveFill)" />
                      {/* Actual Curve Line */}
                      <path d={`M ${pointsStr}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

                      {/* Cmax point marker */}
                      <circle cx={scaleX(kineticsResult.tMaxHours)} cy={scaleY(kineticsResult.cMaxMgL)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                    </>
                  );
                })()}

                {/* X-axis ticks: 0, 6, 12, 18, 24 */}
                {[0, 6, 12, 18, 24].map(h => (
                  <text key={h} x={40 + (h / 24) * 380} y="215" fill="#64748b" fontSize="9" textAnchor="middle">{h}h</text>
                ))}
              </svg>

              {/* Status explanation */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-amber-400 font-mono block mb-1">Đánh giá trị liệu lâm sàng:</span>
                <p className="text-xs text-ivory">
                  {kineticsResult.cMaxMgL > kineticsResult.drug.therapeuticWindow.mtc
                    ? '⚠️ CẢNH BÁO: Nồng độ đỉnh C_max vượt ngưỡng độc tính MTC! Cần giảm liều.'
                    : kineticsResult.cMaxMgL < kineticsResult.drug.therapeuticWindow.mec
                    ? '⚠️ Nồng độ chưa đạt ngưỡng điều trị tối thiểu MEC. Không đủ hiệu lực trị liệu.'
                    : '✓ Nồng độ thuốc nằm gọn trong CỬA SỔ ĐIỀU TRỊ AN TOÀN (Therapeutic Window).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: PARACETAMOL OVERDOSE & NAC (N-ACETYLCYSTEINE) NOMOGRAM        */}
      {/* ===================================================================== */}
      {activeMode === 'PARACETAMOL_NAC_NOMOGRAM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-5 space-y-5">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                Cấp Cứu Ngộ Độc Paracetamol (Rumack-Matthew Nomogram)
              </span>

              {/* Dose Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Liều Paracetamol uống phải:</span>
                  <span className={`font-mono font-bold ${paracetamolGrams > 4 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {paracetamolGrams} g ({paracetamolGrams * 2} viên 500mg)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={paracetamolGrams}
                  onChange={e => {
                    sound.playUiClick();
                    setParacetamolGrams(parseInt(e.target.value));
                  }}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              {/* Time post-ingestion */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Thời gian sau uống:</span>
                  <span className="font-mono font-bold text-ivory">{hoursPostIngestion} giờ</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={hoursPostIngestion}
                  onChange={e => {
                    sound.playUiClick();
                    setHoursPostIngestion(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* NAC Antidote Toggle */}
              <button
                onClick={() => {
                  sound.playUiClick();
                  setIsNacAdministered(!isNacAdministered);
                }}
                className={`w-full py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isNacAdministered
                    ? 'bg-emerald-500 text-obsidian border-emerald-400 font-extrabold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-ivory'
                }`}
              >
                <Shield className="w-4 h-4" />
                {isNacAdministered ? 'Đang truyền tĩnh mạch N-Acetylcysteine (NAC Bật)' : 'Truyền Antidote N-Acetylcysteine (NAC)'}
              </button>

              {/* Hepatic Glutathione Depletion Bar */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tỷ lệ suy kiệt Glutathione tế bào gan:</span>
                  <span className={`font-mono font-bold ${
                    paracetamolResult.hepaticGlutathioneDepletedPercent > 50 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {paracetamolResult.hepaticGlutathioneDepletedPercent}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      paracetamolResult.hepaticGlutathioneDepletedPercent > 50 ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${paracetamolResult.hepaticGlutathioneDepletedPercent}%` }}
                  />
                </div>
              </div>

              {/* Clinical Outcome Card */}
              <div className={`p-4 rounded-xl border ${
                paracetamolResult.isHepatotoxicRiskHigh && !paracetamolResult.nacAdministered
                  ? 'bg-red-950/50 border-red-500/50 text-red-200'
                  : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
                  {paracetamolResult.isHepatotoxicRiskHigh && !paracetamolResult.nacAdministered
                    ? <AlertTriangle className="w-4 h-4 text-red-400" />
                    : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span>Tiên lượng tổn thương gan</span>
                </div>
                <p className="text-xs leading-relaxed">{paracetamolResult.clinicalOutcomeVi}</p>
                <p className="text-[11px] text-slate-400 mt-2">{paracetamolResult.biochemicalMechanismVi}</p>
              </div>
            </div>
          </div>

          {/* Rumack-Matthew Nomogram Plot SVG */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-emerald-400 font-bold">
                RUMACK-MATTHEW NOMOGRAM (ĐƯỜNG CHỈ ĐỊNH DÙNG THUỐC GIẢI ĐỘC NAC)
              </span>

              {/* Nomogram SVG */}
              <svg viewBox="0 0 460 240" className="w-full max-w-md h-auto">
                {/* Semi-log like axes */}
                <line x1="45" y1="200" x2="430" y2="200" stroke="#475569" strokeWidth="2" />
                <line x1="45" y1="20" x2="45" y2="200" stroke="#475569" strokeWidth="2" />
                <text x="430" y="215" fill="#94a3b8" fontSize="10" textAnchor="end">Thời gian sau uống (giờ)</text>
                <text x="35" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Nồng độ (mg/L)</text>

                {/* Rumack 150-treatment line (from 4h at 150 mg/L down to 24h at ~4.7 mg/L) */}
                <path d="M 108 50 L 420 180" stroke="#ef4444" strokeWidth="2.5" />
                <text x="420" y="172" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="end">Đường 150 mg/L (Chỉ định NAC)</text>

                {/* High risk zone fill */}
                <polygon points="108,50 420,180 420,20 108,20" fill="#ef4444" fillOpacity="0.12" />
                <text x="250" y="70" fill="#f87171" fontSize="11" fontWeight="bold" fillOpacity="0.6">VÙNG HOẠI TỬ GAN NẶNG</text>

                {/* Safe zone label */}
                <text x="220" y="180" fill="#34d399" fontSize="10" fontWeight="bold" fillOpacity="0.6">VÙNG NGUY CƠ THẤP</text>

                {/* Patient data point */}
                {(() => {
                  const xPos = 45 + (hoursPostIngestion / 24) * 375;
                  const maxDisplayConc = 250;
                  const yPos = 200 - (Math.min(maxDisplayConc, paracetamolResult.plasmaParacetamolMgL) / maxDisplayConc) * 170;

                  return (
                    <g>
                      <circle cx={xPos} cy={yPos} r="7" fill={isNacAdministered ? "#10b981" : (paracetamolResult.isHepatotoxicRiskHigh ? "#ef4444" : "#f59e0b")} stroke="#ffffff" strokeWidth="2" />
                      <text x={xPos + 10} y={yPos + 4} fill="#ffffff" fontSize="10" fontWeight="bold">
                        Bệnh nhân ({paracetamolResult.plasmaParacetamolMgL} mg/L)
                      </text>
                    </g>
                  );
                })()}

                {/* X-axis ticks */}
                {[4, 8, 12, 16, 20, 24].map(h => (
                  <text key={h} x={45 + (h / 24) * 375} y="215" fill="#64748b" fontSize="9" textAnchor="middle">{h}h</text>
                ))}
              </svg>

              {/* Bio-chemical explanation */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-emerald-400 font-mono block mb-1">Cơ chế bảo vệ của N-Acetylcysteine (NAC):</span>
                <p className="text-xs font-mono text-emerald-200">
                  NAC ─(cung cấp nhóm -SH)─{'>'} Tái tạo Glutathione (GSH) ─{'>'} Bắt giữ NAPQI thành Mercapturic Acid vô hại
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
