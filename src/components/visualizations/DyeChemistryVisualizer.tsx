import React, { useState, useMemo } from 'react';
import {
  Palette,
  Sparkles,
  Thermometer,
  Sliders,
  ShieldAlert,
  Layers,
  Activity,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Waves,
  Sun,
  Eye,
  Zap,
  FlaskConical
} from 'lucide-react';
import {
  DYES_CATALOG,
  DyeProfile,
  simulateDiazotizationReaction,
  simulateAzoCoupling,
  simulateFentonDecolorization
} from '../../domain/dyeChemistryEngine';
import { sound } from '../../audio/soundEngine';

type DyeTabMode = 'DIAZOTIZATION_AZO_LAB' | 'CHROMOPHORE_HOMO_LUMO' | 'FENTON_WASTEWATER';

export const DyeChemistryVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DyeTabMode>('DIAZOTIZATION_AZO_LAB');

  // Mode 1: Diazotization & Azo Coupling state
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(3.0);
  const [couplingComponent, setCouplingComponent] = useState<'2_NAPHTHOL_PHENOL' | 'DIMETHYLANILINE_AMINE'>('2_NAPHTHOL_PHENOL');
  const [couplingPh, setCouplingPh] = useState<number>(9.5);

  // Mode 2: Chromophore & Spectrum state
  const [selectedDyeId, setSelectedDyeId] = useState<string>('SUDAN_I');

  // Mode 3: Fenton treatment state
  const [initialDyePpm, setInitialDyePpm] = useState<number>(200);
  const [feDosageMmol, setFeDosageMmol] = useState<number>(1.5);
  const [h2o2DosageMmol, setH2o2DosageMmol] = useState<number>(15.0);
  const [fentonPh, setFentonPh] = useState<number>(3.0);
  const [treatmentMinutes, setTreatmentMinutes] = useState<number>(45);

  // Calculation 1: Diazotization outcome
  const diazotizationOutcome = useMemo(() => {
    return simulateDiazotizationReaction(temperatureCelsius, 0.1);
  }, [temperatureCelsius]);

  // Calculation 2: Azo coupling outcome
  const azoCouplingOutcome = useMemo(() => {
    return simulateAzoCoupling(couplingComponent, couplingPh);
  }, [couplingComponent, couplingPh]);

  // Calculation 3: Active dye profile
  const activeDye = useMemo(() => {
    return DYES_CATALOG.find(d => d.id === selectedDyeId) || DYES_CATALOG[0];
  }, [selectedDyeId]);

  // Calculation 4: Fenton wastewater treatment
  const fentonOutcome = useMemo(() => {
    return simulateFentonDecolorization(initialDyePpm, feDosageMmol, h2o2DosageMmol, fentonPh, treatmentMinutes);
  }, [initialDyePpm, feDosageMmol, h2o2DosageMmol, fentonPh, treatmentMinutes]);

  const fentonCurrentSnapshot = useMemo(() => {
    const list = fentonOutcome.trajectory;
    return list[list.length - 1];
  }, [fentonOutcome]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Palette className="w-4 h-4 text-rose-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Phẩm Nhuộm, Ghép Đôi Azo & Xử Lý Nước Thải (Lớp 12)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Phẩm Nhuộm Tổng Hợp, Muối Diazoni, Thuyết Sắc Tố & Oxy Hóa Fenton
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Nghiên cứu phản ứng điazô hóa (0-5°C), ghép đôi azo tạo phẩm màu Sudan I & Da cam Metyl, thuyết nhóm sinh màu
              Witt (HOMO-LUMO), và công nghệ oxy hóa nâng cao Fenton khử màu nước thải dệt nhuộm theo chuẩn QCVN 13-MT:2015/BTNMT.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-rose-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('DIAZOTIZATION_AZO_LAB');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'DIAZOTIZATION_AZO_LAB'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Thí Nghiệm Ghép Đôi Azo</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('CHROMOPHORE_HOMO_LUMO');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'CHROMOPHORE_HOMO_LUMO'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quang Phổ & Nhóm Sinh Màu</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('FENTON_WASTEWATER');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'FENTON_WASTEWATER'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Khử Màu Fenton (QCVN 13)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: DIAZOTIZATION & AZO COUPLING LABORATORY                           */}
      {/* ========================================================================= */}
      {activeTab === 'DIAZOTIZATION_AZO_LAB' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Step 1: Diazotization Temperature Slider */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4" />
                Giai Đoạn 1: Nhiệt Độ Điazô Hóa Anilin (0 - 5°C)
              </span>

              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Nhiệt độ bể phản ứng:</span>
                  <strong className={temperatureCelsius <= 5 ? 'text-cyan-300' : 'text-red-400 font-bold'}>
                    {temperatureCelsius.toFixed(1)}°C {temperatureCelsius <= 5 ? '(Nước đá tối ưu)' : '(Quá nóng!)'}
                  </strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={temperatureCelsius}
                  onChange={(e) => setTemperatureCelsius(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                  <span>0°C (Bền vững)</span>
                  <span>5°C (Ngưỡng an toàn)</span>
                  <span>&gt;10°C (Phân hủy ra phenol)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Hiệu suất muối điazoni:</span>
                  <strong className="text-cyan-300">{diazotizationOutcome.diazoniumYieldPercent}%</strong>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-ivory-muted">Khí N₂ sủi bọt thoát ra:</span>
                  <strong className={diazotizationOutcome.nitrogenGasReleasedMl > 100 ? 'text-red-400' : 'text-ivory'}>
                    {diazotizationOutcome.nitrogenGasReleasedMl} mL
                  </strong>
                </div>
              </div>
            </div>

            {/* Step 2: Coupling Component & pH Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                Giai Đoạn 2: Tác Nhân & pH Ghép Đôi Azo
              </span>

              {/* Coupling Component Selector */}
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setCouplingComponent('2_NAPHTHOL_PHENOL');
                    setCouplingPh(9.5); // optimal for phenol
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    couplingComponent === '2_NAPHTHOL_PHENOL'
                      ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/40'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-ivory">Ghép đôi với 2-Naphthol (Phenol)</span>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded">
                      Sudan I
                    </span>
                  </div>
                  <div className="text-[11px] text-ivory-muted mt-1">
                    Cần môi trường kiềm (pH 9-10) tạo ion naphtholate (Ar-O⁻) phản ứng cực mạnh.
                  </div>
                </button>

                <button
                  onClick={() => {
                    sound.playUiClick();
                    setCouplingComponent('DIMETHYLANILINE_AMINE');
                    setCouplingPh(4.8); // optimal for amine
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    couplingComponent === 'DIMETHYLANILINE_AMINE'
                      ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/40'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-ivory">Ghép đôi với N,N-Đimetylanilin (Amin)</span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                      Da Cam Metyl
                    </span>
                  </div>
                  <div className="text-[11px] text-ivory-muted mt-1">
                    Cần môi trường axit yếu (pH 4-5) để nhóm -N(CH₃)₂ tự do không bị proton hóa.
                  </div>
                </button>
              </div>

              {/* pH Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                  <span>Độ pH môi trường ghép đôi:</span>
                  <strong className="text-rose-300 font-bold">{couplingPh.toFixed(1)}</strong>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="13.0"
                  step="0.5"
                  value={couplingPh}
                  onChange={(e) => setCouplingPh(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                  <span>pH 1-3 (Axit mạnh)</span>
                  <span>pH 4-6 (Axit yếu)</span>
                  <span>pH 9-10 (Kiềm)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Stage & Beaker (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <h3 className="text-lg font-bold text-ivory">
                    Bể Phản Ứng Ghép Đôi Azo & Kết Tủa Phẩm Màu (Hiệu Suất: {azoCouplingOutcome.couplingYieldPercent}%)
                  </h3>
                </div>
                <div className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  azoCouplingOutcome.couplingSpeedVi === 'OPTIMAL_RAPID'
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
                    : 'bg-amber-950/40 text-amber-300 border-amber-700/50'
                }`}>
                  {azoCouplingOutcome.couplingSpeedVi === 'OPTIMAL_RAPID' ? 'Tối Ưu Hoàn Hảo' : 'Chậm / Bị Cản Trở'}
                </div>
              </div>

              {/* Dynamic SVG Lab Bench Beakers */}
              <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                <svg viewBox="0 0 540 220" className="w-full h-auto">
                  {/* Bench Countertop */}
                  <rect x="20" y="190" width="500" height="15" rx="3" fill="#334155" />

                  {/* Left: Diazotization Beaker in Ice Bath */}
                  <g transform="translate(60, 40)">
                    {/* Ice Bath Tub */}
                    <rect x="0" y="60" width="130" height="85" rx="8" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="65" y="80" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Chậu nước đá ({temperatureCelsius}°C)
                    </text>

                    {/* Glass Beaker Inside */}
                    <rect x="25" y="20" width="80" height="110" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

                    {/* Liquid layer */}
                    {temperatureCelsius <= 5 ? (
                      <g>
                        <rect x="28" y="55" width="74" height="72" rx="2" fill="#38bdf8" opacity="0.3" />
                        <text x="65" y="85" fill="#e0f2fe" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          [C₆H₅-N₂⁺]Cl⁻
                        </text>
                        <text x="65" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                          Bền vững ({diazotizationOutcome.diazoniumYieldPercent}%)
                        </text>
                      </g>
                    ) : (
                      <g>
                        {/* Decomposed into Phenol + N2 bubbling */}
                        <rect x="28" y="55" width="74" height="72" rx="2" fill="#78350f" opacity="0.5" />
                        <circle cx="50" cy="90" r="3" fill="#ffffff" opacity="0.8">
                          <animate attributeName="cy" values="110;60" dur="1.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="75" cy="80" r="4" fill="#ffffff" opacity="0.7">
                          <animate attributeName="cy" values="100;55" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <text x="65" y="80" fill="#fca5a5" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          C₆H₅OH + N₂↑
                        </text>
                        <text x="65" y="98" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="middle">
                          Phân hủy ({diazotizationOutcome.phenolHydrolysisPercent}%)
                        </text>
                      </g>
                    )}

                    <text x="65" y="142" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Bình 1: Muối Điazoni
                    </text>
                  </g>

                  {/* Transfer Pouring Arrow */}
                  <g transform="translate(230, 90)">
                    <path d="M 0,20 Q 30,5 60,20" stroke="#f43f5e" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
                    <text x="30" y="10" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Rót vào (pH {couplingPh})
                    </text>
                  </g>

                  {/* Right: Coupling Reaction Flask with Dye Precipitate */}
                  <g transform="translate(330, 40)">
                    {/* Conical Flask */}
                    <polygon points="40,20 80,20 115,130 5,130" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="40" y="10" width="40" height="15" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />

                    {/* Dye liquid & precipitate based on yield */}
                    {azoCouplingOutcome.couplingYieldPercent > 15 ? (
                      <g>
                        <polygon
                          points="25,128 95,128 85,75 35,75"
                          fill={azoCouplingOutcome.precipitateColorHex}
                          opacity={0.85}
                        />
                        {/* Precipitate flakes */}
                        <circle cx="45" cy="115" r="2.5" fill="#ffffff" opacity="0.8" />
                        <circle cx="65" cy="118" r="3" fill="#ffffff" opacity="0.7" />
                        <circle cx="80" cy="112" r="2" fill="#ffffff" opacity="0.8" />

                        <text x="60" y="95" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {azoCouplingOutcome.targetDye.nameVi.split(' ')[0]}
                        </text>
                        <text x="60" y="110" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle">
                          Kết tủa ({azoCouplingOutcome.couplingYieldPercent}%)
                        </text>
                      </g>
                    ) : (
                      <g>
                        <polygon points="25,128 95,128 85,85 35,85" fill="#334155" opacity="0.4" />
                        <text x="60" y="105" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                          Không tạo phẩm ({azoCouplingOutcome.couplingYieldPercent}%)
                        </text>
                      </g>
                    )}

                    <text x="60" y="150" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Bình 2: Bể Ghép Đôi
                    </text>
                  </g>
                </svg>
              </div>

              {/* Explanatory Callouts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-cyan-400 font-bold">1. Trạng Thái Điazô Hóa:</span>
                  <p className="text-ivory-muted">{diazotizationOutcome.statusDescriptionVi}</p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-rose-400 font-bold">2. Trạng Thái Ghép Đôi Azo:</span>
                  <p className="text-ivory-muted">{azoCouplingOutcome.chemicalExplanationVi}</p>
                </div>
              </div>

              {/* Chemical Equation Bar */}
              <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-amber-200">
                {azoCouplingOutcome.targetDye.chemicalSynthesisEquationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: CHROMOPHORE, AUXOCHROME & HOMO-LUMO ABSORPTION STUDIO             */}
      {/* ========================================================================= */}
      {activeTab === 'CHROMOPHORE_HOMO_LUMO' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-1">
                  <Eye className="w-4 h-4" />
                  Thuyết Nhóm Sinh Màu Witt & Hệ Liên Hợp Quang Học (HOMO - LUMO)
                </span>
                <h3 className="text-xl font-extrabold text-ivory">
                  Tại Sao Hợp Chất Azo Có Màu Sắc Rực Rỡ Trong Vùng Ánh Sáng Nhìn Thấy?
                </h3>
              </div>

              {/* Dye selector buttons */}
              <div className="flex flex-wrap gap-1.5 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                {DYES_CATALOG.map(dye => (
                  <button
                    key={dye.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedDyeId(dye.id);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedDyeId === dye.id
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dye.complementaryObservedColorHex }} />
                    <span>{dye.nameVi.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Dye Profile Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-ivory flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: activeDye.complementaryObservedColorHex }} />
                    {activeDye.nameVi}
                  </h4>
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-700/30">
                    {activeDye.colourIndexCiNumber}
                  </span>
                </div>

                <div className="text-xs font-mono text-rose-300 font-bold">{activeDye.chemicalFormula}</div>

                <div className="space-y-3 text-xs">
                  <div>
                    <strong className="text-rose-400">1. Nhóm mang màu (Chromophores):</strong>
                    <ul className="list-disc list-inside text-ivory-muted mt-1">
                      {activeDye.chromophoresVi.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-amber-400">2. Nhóm trợ màu (Auxochromes):</strong>
                    <ul className="list-disc list-inside text-ivory-muted mt-1">
                      {activeDye.auxochromesVi.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60">
                    <strong className="text-ivory">Ứng dụng dệt may Việt Nam:</strong>
                    <p className="text-ivory-muted mt-0.5">{activeDye.vietnamTextileIndustryUsageVi}</p>
                  </div>

                  <div>
                    <strong className="text-red-400">Độc tính & Kiểm soát môi trường:</strong>
                    <p className="text-ivory-muted mt-0.5">{activeDye.environmentalToxicityVi}</p>
                  </div>
                </div>
              </div>

              {/* Right: Optical Spectrum & HOMO-LUMO Visual (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                  Quang Phổ Hấp Thụ & Màu Bổ Thể
                </span>

                {/* Visible Light Spectrum Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ivory-muted">Bước sóng cực đại (λ_max):</span>
                    <strong className="text-cyan-300">{activeDye.maxAbsorptionWavelengthNm} nm</strong>
                  </div>

                  {/* Rainbow Spectrum Ribbon */}
                  <div className="w-full h-6 rounded-lg relative overflow-hidden flex shadow-inner">
                    <div className="w-[15%] bg-violet-600" title="Tím 380-450 nm" />
                    <div className="w-[15%] bg-blue-500" title="Lam 450-490 nm" />
                    <div className="w-[20%] bg-emerald-500" title="Lục 490-560 nm" />
                    <div className="w-[15%] bg-yellow-400" title="Vàng 560-590 nm" />
                    <div className="w-[15%] bg-amber-500" title="Cam 590-620 nm" />
                    <div className="w-[20%] bg-red-600" title="Đỏ 620-750 nm" />

                    {/* Indicator needle of absorbed lambda */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                      style={{
                        left: `${Math.max(5, Math.min(95, ((activeDye.maxAbsorptionWavelengthNm - 380) / (750 - 380)) * 100))}%`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
                    <span>380 nm (Tím)</span>
                    <span>550 nm (Lục)</span>
                    <span>750 nm (Đỏ)</span>
                  </div>
                </div>

                {/* Absorbed vs Observed Color Cards */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-ivory-muted">Màu bị hấp thụ:</div>
                    <strong className="text-cyan-300">{activeDye.absorbedColorNameVi}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-ivory-muted">Màu mắt nhìn thấy:</div>
                    <strong className="flex items-center gap-1.5" style={{ color: activeDye.complementaryObservedColorHex }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeDye.complementaryObservedColorHex }} />
                      {activeDye.complementaryObservedColorNameVi.split(' ')[0]}
                    </strong>
                  </div>
                </div>

                {/* Energy Gap */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-ivory-muted">Khoảng cách HOMO - LUMO (ΔE):</span>
                    <strong className="text-amber-300">{activeDye.homoLumoGapEv} eV</strong>
                  </div>
                  <div className="text-[10px] text-ivory-muted mt-1">
                    Hệ liên hợp π càng dài ⟶ ΔE càng nhỏ ⟶ Hấp thụ ánh sáng nhìn thấy!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: FENTON ADVANCED OXIDATION TEXTILE WASTEWATER DECOLORIZATION       */}
      {/* ========================================================================= */}
      {activeTab === 'FENTON_WASTEWATER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  Thông Số Bể Phản Ứng Fenton (AOP)
                </span>

                {/* Dye concentration */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Nồng độ phẩm màu đầu vào:</span>
                    <strong className="text-rose-300">{initialDyePpm} ppm (mg/L)</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="25"
                    value={initialDyePpm}
                    onChange={(e) => setInitialDyePpm(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* pH Slider (Critical for Fenton) */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Độ pH dung dịch:</span>
                    <strong className={fentonOutcome.isOptimalPh ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      pH {fentonPh.toFixed(1)} {fentonOutcome.isOptimalPh ? '(Tối ưu 2.8 - 3.5)' : '(Ngoài vùng chuẩn)'}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="8.0"
                    step="0.1"
                    value={fentonPh}
                    onChange={(e) => setFentonPh(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-ivory-muted mt-1">
                    <span>pH 1.5</span>
                    <span>pH 3.0 (Chuẩn)</span>
                    <span>pH 8.0 (Kiềm)</span>
                  </div>
                </div>

                {/* Fe2+ Dosage */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Liều lượng Fe²⁺ (Xúc tác):</span>
                    <strong className="text-amber-300">{feDosageMmol.toFixed(1)} mmol/L</strong>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.2"
                    value={feDosageMmol}
                    onChange={(e) => setFeDosageMmol(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* H2O2 Dosage */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Liều lượng H₂O₂ (Chất oxy hóa):</span>
                    <strong className="text-cyan-300">{h2o2DosageMmol.toFixed(0)} mmol/L</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="2"
                    value={h2o2DosageMmol}
                    onChange={(e) => setH2o2DosageMmol(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Treatment Duration */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-ivory mb-1">
                    <span>Thời gian phản ứng:</span>
                    <strong className="text-purple-300">{treatmentMinutes} phút</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={treatmentMinutes}
                    onChange={(e) => setTreatmentMinutes(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Wastewater Tank & Compliance Results (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                    <Waves className="w-5 h-5 text-rose-400" />
                    Hiệu Quả Khử Màu Nước Thải & Tiêu Chuẩn QCVN 13-MT:2015/BTNMT
                  </h3>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    fentonOutcome.qcvn13Compliant
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-600/30'
                      : 'bg-red-950/40 text-red-300 border-red-600/30'
                  }`}>
                    {fentonOutcome.qcvn13Compliant ? '✅ ĐẠT QUY CHUẨN XẢ THẢI CỘNG ĐỒNG' : '❌ CHƯA ĐẠT CHUẨN (CẦN TỐI ƯU pH)'}
                  </span>
                </div>

                {/* SVG Visual Treatment Tank */}
                <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <svg viewBox="0 0 540 200" className="w-full h-auto">
                    {/* Tank Shell */}
                    <rect x="30" y="20" width="480" height="160" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                    {/* Left: Raw Effluent Inlet */}
                    <rect x="35" y="40" width="120" height="135" rx="6" fill="#dc2626" opacity="0.8" />
                    <text x="95" y="65" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Nước Thải Thô
                    </text>
                    <text x="95" y="85" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      {initialDyePpm} ppm phẩm azo
                    </text>

                    {/* Central Reaction Zone with Hydroxyl Radical (*OH) Attack */}
                    <rect x="165" y="40" width="200" height="135" rx="6" fill="#1e1b4b" opacity="0.6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="265" y="65" fill="#818cf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      VÙNG PHẢN ỨNG FENTON (pH {fentonPh})
                    </text>

                    {/* Radical Sparkles */}
                    <g>
                      <circle cx="210" cy="100" r="5" fill="#38bdf8" />
                      <text x="210" y="103" fill="#090d16" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">•OH</text>

                      <circle cx="270" cy="115" r="5" fill="#38bdf8" />
                      <text x="270" y="118" fill="#090d16" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">•OH</text>

                      <circle cx="320" cy="95" r="5" fill="#38bdf8" />
                      <text x="320" y="98" fill="#090d16" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">•OH</text>
                    </g>
                    <text x="265" y="145" fill="#a5b4fc" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Fe²⁺ + H₂O₂ ⟶ Fe³⁺ + •OH (E° = +2.8V)
                    </text>

                    {/* Right: Decolorized Effluent Outlet */}
                    <rect
                      x="375"
                      y="40"
                      width="130"
                      height="135"
                      rx="6"
                      fill={fentonCurrentSnapshot.observedLiquidColorHex}
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                    <text x="440" y="65" fill="#0f172a" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Nước Sau Khử Màu
                    </text>
                    <text x="440" y="85" fill="#0f172a" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Khử màu: {fentonOutcome.finalDecolorizationPercent}%
                    </text>
                    <text x="440" y="105" fill="#0f172a" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Còn lại: {fentonCurrentSnapshot.residualDyeConcentrationPpm} ppm
                    </text>
                  </svg>
                </div>

                {/* 4 Quantitative Output Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Tỉ lệ khử màu (%)</div>
                    <div className="text-xl font-extrabold font-mono text-emerald-400 mt-1">
                      {fentonOutcome.finalDecolorizationPercent}%
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Nồng độ phẩm còn lại</div>
                    <div className="text-xl font-extrabold font-mono text-cyan-400 mt-1">
                      {fentonCurrentSnapshot.residualDyeConcentrationPpm} <span className="text-xs font-normal">ppm</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Chỉ số COD còn lại</div>
                    <div className="text-xl font-extrabold font-mono text-amber-400 mt-1">
                      {fentonCurrentSnapshot.residualCodMgPerL} <span className="text-xs font-normal">mg/L</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-ivory-muted">Hiệu suất loại bỏ COD</div>
                    <div className="text-xl font-extrabold font-mono text-purple-400 mt-1">
                      {fentonOutcome.finalCodRemovalPercent}%
                    </div>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-ivory-muted leading-relaxed whitespace-pre-line">
                  {fentonOutcome.processSummaryVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
