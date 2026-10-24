import React, { useState, useMemo } from 'react';
import {
  Utensils,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Shield,
  Sparkles,
  Info,
  Scale,
  Sun,
  Moon,
  Search,
  Sliders,
  RotateCcw
} from 'lucide-react';
import {
  simulateMaillardReaction,
  simulateLipidAutoOxidation,
  performBoraxCurcuminTest,
  PRESERVATIVE_CATALOG
} from '../../domain/foodChemistryEngine';
import { sound } from '../../audio/soundEngine';

type FoodMode = 'MAILLARD_BROWNING_LAB' | 'LIPID_AUTO_OXIDATION' | 'FOOD_SAFETY_BORAX_TEST';

export const FoodChemistryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<FoodMode>('MAILLARD_BROWNING_LAB');

  // Mode 1: Maillard reaction state
  const [bakingTemp, setBakingTemp] = useState<number>(165);
  const [bakingDuration, setBakingDuration] = useState<number>(25);
  const [aminoAcid, setAminoAcid] = useState<string>('L-Lysine');

  // Mode 2: Lipid auto-oxidation state
  const [oilType, setOilType] = useState<'OLIVE_OIL' | 'SOYBEAN_OIL' | 'SUNFLOWER_OIL'>('SOYBEAN_OIL');
  const [storageDays, setStorageDays] = useState<number>(30);
  const [hasLight, setHasLight] = useState<boolean>(true);
  const [hasOxygen, setHasOxygen] = useState<boolean>(true);
  const [hasAntioxidant, setHasAntioxidant] = useState<boolean>(false);
  const [storageTemp, setStorageTemp] = useState<number>(25);

  // Mode 3: Borax safety test state
  const [boraxSample, setBoraxSample] = useState<'ADULTERATED_BORAX_SAUSAGE' | 'PURE_PORK_SAUSAGE' | 'TURMERIC_BLANK'>('ADULTERATED_BORAX_SAUSAGE');
  const [isAlkaliApplied, setIsAlkaliApplied] = useState<boolean>(false);
  const [selectedPreservativeId, setSelectedPreservativeId] = useState<string>('SODIUM_BENZOATE');

  // Calculations
  const maillard = useMemo(() => {
    return simulateMaillardReaction(bakingTemp, bakingDuration, 'D-Glucose', aminoAcid);
  }, [bakingTemp, bakingDuration, aminoAcid]);

  const lipid = useMemo(() => {
    return simulateLipidAutoOxidation(oilType, storageDays, hasLight, hasOxygen, hasAntioxidant, storageTemp);
  }, [oilType, storageDays, hasLight, hasOxygen, hasAntioxidant, storageTemp]);

  const borax = useMemo(() => {
    return performBoraxCurcuminTest(boraxSample);
  }, [boraxSample]);

  const activePreservative = useMemo(() => {
    return PRESERVATIVE_CATALOG.find(p => p.id === selectedPreservativeId) || PRESERVATIVE_CATALOG[0];
  }, [selectedPreservativeId]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Lương Thực - Thực Phẩm & An Toàn Vệ Sinh</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Hóa Học Thực Phẩm, Phản Ứng Maillard & Kiểm Nghiệm An Toàn
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá động học phản ứng tạo màu nâu và mùi thơm Maillard giữa đường khử và acid amin, cơ chế ôi thiu dầu mỡ qua gốc tự do Peroxide,
              thử nghiệm phát hiện Hàn the (Borax) trong giò chả bằng giấy nghệ và nguyên lý phụ gia bảo quản.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-amber-800/40 shrink-0">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('MAILLARD_BROWNING_LAB');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'MAILLARD_BROWNING_LAB'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Phản Ứng Maillard
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('LIPID_AUTO_OXIDATION');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'LIPID_AUTO_OXIDATION'
                  ? 'bg-yellow-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Ôi Thiu Dầu Mỡ (POV)
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMode('FOOD_SAFETY_BORAX_TEST');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMode === 'FOOD_SAFETY_BORAX_TEST'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Kiểm Nghiệm Hàn The
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: MAILLARD REACTION BROWNING & AROMA LAB                        */}
      {/* ===================================================================== */}
      {activeMode === 'MAILLARD_BROWNING_LAB' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Điều Kiện Nhiệt Phản Ứng Nướng / Chiên
              </span>

              {/* Temperature Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nhiệt độ gia nhiệt:</span>
                  <span className="font-mono font-bold text-amber-400">{bakingTemp} °C</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="240"
                  step="5"
                  value={bakingTemp}
                  onChange={e => {
                    sound.playUiClick();
                    setBakingTemp(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Duration Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Thời gian gia nhiệt:</span>
                  <span className="font-mono font-bold text-ivory">{bakingDuration} phút</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="2"
                  value={bakingDuration}
                  onChange={e => {
                    sound.playUiClick();
                    setBakingDuration(parseInt(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Amino Acid Selector */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-semibold">Nhóm Acid Amin phản ứng với Glucose:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'L-Lysine', label: 'L-Lysine (Bánh mì & Thịt)' },
                    { id: 'L-Asparagine', label: 'L-Asparagine (Khoai tây)' }
                  ].map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        sound.playUiClick();
                        setAminoAcid(a.id);
                      }}
                      className={`p-2 rounded-xl border text-center font-bold transition-all ${
                        aminoAcid === a.id
                          ? 'bg-amber-600 text-white border-amber-400 shadow'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Melanoidin & Acrylamide Metrics */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Độ đậm sắc tố nâu (Browning %):</span>
                  <span className="font-mono font-bold text-amber-400">{maillard.browningIntensityPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hàm lượng Melanoidin sinh ra:</span>
                  <span className="font-mono font-bold text-ivory">{maillard.melanoidinYieldMmol} mmol</span>
                </div>
                {aminoAcid === 'L-Asparagine' && (
                  <div className="flex justify-between border-t border-slate-800 pt-2 text-rose-400">
                    <span>Hàm lượng Acrylamide phụ phẩm:</span>
                    <span className="font-mono font-bold">{maillard.acrylamideConcentrationPpb} ppb ({maillard.acrylamideRiskLevel})</span>
                  </div>
                )}
              </div>

              {/* Aroma Notes Badges */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-mono">Hương thơm & Hợp chất mùi đặc trưng:</span>
                <div className="flex flex-wrap gap-1.5">
                  {maillard.dominantAromaNotesVi.map((aroma, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-700/40 text-amber-300 text-[11px]">
                      {aroma}
                    </span>
                  ))}
                  {maillard.keyAromaCompoundsVi.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bread Toast Browning SVG Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-amber-400 font-bold">
                MÔ PHỎNG BIẾN ĐỔI MÀU NÂU VỎ BÁNH MÌ / MIẾNG THỊT (MAILLARD TOAST)
              </span>

              {/* Toast Slice SVG */}
              <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={maillard.browningColorHex} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={maillard.browningColorHex} stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                {/* Toast Crust Outline */}
                <path
                  d="M 120 40 C 90 40, 80 80, 70 120 C 60 170, 75 210, 110 215 L 290 215 C 325 210, 340 170, 330 120 C 320 80, 310 40, 280 40 C 250 40, 230 60, 200 60 C 170 60, 150 40, 120 40 Z"
                  fill="url(#crustGrad)"
                  stroke="#78350f"
                  strokeWidth="3"
                  className="transition-all duration-700"
                />

                {/* Inner Crumb with slightly lighter shade */}
                <path
                  d="M 130 55 C 105 55, 95 90, 88 125 C 80 165, 90 195, 120 200 L 280 200 C 310 195, 320 165, 312 125 C 305 90, 295 55, 270 55 C 245 55, 225 72, 200 72 C 175 72, 155 55, 130 55 Z"
                  fill={maillard.browningColorHex}
                  fillOpacity="0.5"
                  className="transition-all duration-700"
                />

                {/* Butter Melt / Grill Marks */}
                <path d="M 140 100 Q 200 120 260 100" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none" opacity={bakingTemp > 120 ? "0.8" : "0.2"} />
                <path d="M 135 140 Q 200 160 265 140" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none" opacity={bakingTemp > 120 ? "0.8" : "0.2"} />

                {/* Temperature heat wave indicators */}
                {bakingTemp >= 140 && (
                  <g opacity="0.6">
                    <path d="M 170 30 Q 180 15 170 5" stroke="#f59e0b" strokeWidth="2" fill="none" />
                    <path d="M 200 30 Q 210 15 200 5" stroke="#f59e0b" strokeWidth="2" fill="none" />
                    <path d="M 230 30 Q 240 15 230 5" stroke="#f59e0b" strokeWidth="2" fill="none" />
                  </g>
                )}

                <text x="200" y="180" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))">
                  {maillard.browningIntensityPercent > 70 ? 'Cháy Xém (Charred)' : maillard.browningIntensityPercent > 40 ? 'Vàng Óng (Golden Crust)' : 'Bột Mới Nướng (Light)'}
                </text>
              </svg>

              {/* Chemical Mechanism Card */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-amber-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-amber-400 font-mono block mb-1">Cơ chế hóa học 3 giai đoạn:</span>
                <p className="text-xs text-ivory leading-relaxed">{maillard.chemicalExplanationVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: LIPID AUTO-OXIDATION & RANCIDITY (POV METRIC)                 */}
      {/* ===================================================================== */}
      {activeMode === 'LIPID_AUTO_OXIDATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Droplets className="w-4 h-4 text-yellow-400" />
                Loại Dầu Ăn & Điều Kiện Bảo Quản
              </span>

              {/* Oil Type */}
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'OLIVE_OIL', label: 'Dầu Oliu (11% PUFA)' },
                  { id: 'SOYBEAN_OIL', label: 'Đậu Nành (58% PUFA)' },
                  { id: 'SUNFLOWER_OIL', label: 'Hướng Dương (65%)' }
                ].map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      sound.playUiClick();
                      setOilType(o.id as any);
                    }}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      oilType === o.id
                        ? 'bg-yellow-500 text-obsidian border-yellow-400 shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Storage Days */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Thời gian bảo quản:</span>
                  <span className="font-mono font-bold text-yellow-400">{storageDays} ngày</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={storageDays}
                  onChange={e => {
                    sound.playUiClick();
                    setStorageDays(parseInt(e.target.value));
                  }}
                  className="w-full accent-yellow-500 cursor-pointer"
                />
              </div>

              {/* Environmental Factors Toggles */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setHasLight(!hasLight);
                  }}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    hasLight ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {hasLight ? 'Có Ánh Sáng' : 'Để Trong Tối'}
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setHasOxygen(!hasOxygen);
                  }}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    hasOxygen ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {hasOxygen ? 'Tiếp Xúc Khí O₂' : 'Hút Chân Không'}
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setHasAntioxidant(!hasAntioxidant);
                  }}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    hasAntioxidant ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {hasAntioxidant ? '+ Vitamin E' : 'Không Chất Chống Oxi'}
                </button>
              </div>

              {/* POV Meter Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Chỉ số Peroxide (Peroxide Value - POV):</span>
                  <span className={`font-mono font-extrabold ${lipid.peroxideValuePovMeqPerKg > 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {lipid.peroxideValuePovMeqPerKg} meq O₂/kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hàm lượng Malondialdehyde (MDA):</span>
                  <span className="font-mono font-bold text-ivory">{lipid.malondialdehydeMdaPpm} ppm</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-[11px]">
                  <span className="text-slate-400">Đánh giá độ tươi mới:</span>
                  <span className={`font-mono font-bold ${
                    lipid.freshnessGradeVi === 'DẦU_TƯƠI_MỚI' ? 'text-emerald-400' : lipid.freshnessGradeVi === 'BẮT_ĐẦU_OXI_HÓA' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {lipid.freshnessGradeVi.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Oil Bottle & Free Radical Flow SVG */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-xs font-mono text-yellow-400 font-bold">
                MÔ PHỎNG CHAI DẦU ĂN & CHUỖI PHẢN ỨNG GỐC TỰ DO (FREE RADICAL PEROXIDATION)
              </span>

              {/* Bottle SVG */}
              <svg viewBox="0 0 460 220" className="w-full max-w-md h-auto">
                {/* Bottle body */}
                <rect x="60" y="80" width="80" height="120" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <rect x="85" y="50" width="30" height="30" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <rect x="80" y="40" width="40" height="12" rx="3" fill="#ca8a04" />

                {/* Oil liquid inside */}
                <rect
                  x="64"
                  y={lipid.freshnessGradeVi === 'ÔI_THIU_NGUY_HẠI' ? "95" : "90"}
                  width="72"
                  height="106"
                  rx="4"
                  fill={lipid.freshnessGradeVi === 'ÔI_THIU_NGUY_HẠI' ? "#854d0e" : "#eab308"}
                  fillOpacity="0.8"
                />
                <text x="100" y="150" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">
                  {lipid.peroxideValuePovMeqPerKg > 10 ? 'ÔI THIU' : 'DẦU TƯƠI'}
                </text>

                {/* Free Radical Reaction Pathway Flowchart */}
                <g transform="translate(160, 45)">
                  {/* Step 1: RH -> R* */}
                  <rect x="10" y="10" width="120" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="70" y="27" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">RH ─(hν, O₂)─{'>'} R•</text>
                  <text x="70" y="38" fill="#94a3b8" fontSize="8" textAnchor="middle">Gốc alkyl tự do</text>

                  {/* Arrow down */}
                  <line x1="70" y1="45" x2="70" y2="65" stroke="#f59e0b" strokeWidth="1.5" />
                  <polygon points="70,68 67,62 73,62" fill="#f59e0b" />

                  {/* Step 2: R* + O2 -> ROO* -> ROOH */}
                  <rect x="10" y="70" width="120" height="35" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="70" y="87" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">R• + O₂ ─{'>'} ROO•</text>
                  <text x="70" y="98" fill="#94a3b8" fontSize="8" textAnchor="middle">Gốc peroxy</text>

                  {/* Arrow down */}
                  <line x1="70" y1="105" x2="70" y2="125" stroke="#ef4444" strokeWidth="1.5" />
                  <polygon points="70,128 67,122 73,122" fill="#ef4444" />

                  {/* Step 3: Hydroperoxide Breakdown */}
                  <rect x="0" y="130" width="140" height="35" rx="6" fill="#0f172a" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="70" y="147" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">ROOH ─{'>'} Hexanal + MDA</text>
                  <text x="70" y="158" fill="#f87171" fontSize="8" textAnchor="middle">Aldehyde hôi khét</text>
                </g>
              </svg>

              {/* Smell notes */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-amber-900/40 text-center w-full max-w-lg">
                <span className="text-[11px] text-yellow-400 font-mono block mb-1">Mùi cảm quan đặc trưng:</span>
                <p className="text-xs text-ivory font-semibold">{lipid.rancidOdorNotesVi.join(' · ')}</p>
                <p className="text-[11px] text-slate-400 mt-1">{lipid.biochemicalMechanismVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: FOOD SAFETY BORAX (CURCUMIN TEST) & PRESERVATIVES             */}
      {/* ===================================================================== */}
      {activeMode === 'FOOD_SAFETY_BORAX_TEST' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Borax Inspection Lab */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                Kiểm Nghiệm Hàn The (Borax) Bằng Giấy Tẩm Nghệ (Curcumin)
              </span>

              {/* Sample Selector */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'ADULTERATED_BORAX_SAUSAGE', label: 'Giò lụa nghi có Hàn the' },
                  { id: 'PURE_PORK_SAUSAGE', label: 'Giò lụa sạch an toàn' },
                  { id: 'TURMERIC_BLANK', label: 'Mẫu giấy nghệ trắng' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playUiClick();
                      setBoraxSample(s.id as any);
                      setIsAlkaliApplied(false);
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      boraxSample === s.id
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Alkali Drop Confirmation Button */}
              <button
                onClick={() => {
                  sound.playUiClick();
                  setIsAlkaliApplied(!isAlkaliApplied);
                }}
                className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isAlkaliApplied
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-ivory'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {isAlkaliApplied ? 'Đã nhỏ giọt dung dịch kiềm (NH₃ / NaOH)' : 'Nhỏ giọt dung dịch kiềm xác nhận (NH₃ / NaOH)'}
              </button>

              {/* Turmeric Paper Color Result */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Màu sắc dải giấy nghệ:</span>
                    <span className="text-xs font-mono font-bold text-ivory">{borax.complexNameVi}</span>
                  </div>
                  {/* Paper Strip Visualizer */}
                  <div
                    className="w-16 h-8 rounded-lg border-2 border-white/40 shadow-inner transition-all duration-500"
                    style={{ backgroundColor: isAlkaliApplied ? borax.alkaliConfirmationColorHex : borax.acidExtractColorHex }}
                  />
                </div>

                <div className={`p-3 rounded-xl border text-xs ${
                  borax.boraxPresent ? 'bg-red-950/50 border-red-500/50 text-red-200' : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold uppercase mb-1">
                    {borax.boraxPresent ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    <span>{borax.boraxPresent ? 'DƯƠNG TÍNH HÀN THE' : 'ĐẠT CHUẨN AN TOÀN'}</span>
                  </div>
                  <p className="leading-relaxed">{borax.forensicReportVi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preservative Standards Catalog */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-5 space-y-4">
              <span className="text-sm font-bold text-ivory flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                Quy Chuẩn Phụ Gia Bảo Quản Thực Phẩm (Codex & BYT)
              </span>

              {/* Preservative Pills */}
              <div className="flex flex-wrap gap-2">
                {PRESERVATIVE_CATALOG.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedPreservativeId(p.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      selectedPreservativeId === p.id
                        ? 'bg-amber-500 text-obsidian border-amber-400 font-extrabold shadow'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.nameVi.split(' ')[0]} ({p.eNumber})
                  </button>
                ))}
              </div>

              {/* Active Preservative Details */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-ivory">{activePreservative.nameVi}</h4>
                  <span className="font-mono text-amber-300 font-bold">{activePreservative.eNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Công thức hóa học:</span>
                  <span className="font-mono text-cyan-300 font-bold">{activePreservative.chemicalFormula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khoảng pH hoạt động tối ưu:</span>
                  <span className="font-mono text-amber-400 font-bold">{activePreservative.optimalPhRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hàm lượng cho phép tối đa:</span>
                  <span className="font-mono text-emerald-400 font-bold">{activePreservative.maxPermittedLevelVi}</span>
                </div>
                <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800">{activePreservative.mechanismVi}</p>
                <div className="text-[11px] text-slate-400">
                  <span className="font-bold text-amber-300">Thực phẩm phổ biến: </span>
                  {activePreservative.commonFoodsVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
