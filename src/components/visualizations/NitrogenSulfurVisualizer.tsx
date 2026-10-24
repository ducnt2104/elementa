import React, { useState, useMemo } from 'react';
import {
  NITROGEN_SPECIES_CATALOG,
  SULFUR_SPECIES_CATALOG,
  simulateAmmoniaFountain,
  predictHno3Redox,
  simulateAquaRegia,
  simulateSugarDehydration,
  evaluateEutrophication
} from '../../domain/nitrogenSulfurEngine';
import { sound } from '../../audio/soundEngine';

type VisualizerMode = 'AMMONIA_FOUNTAIN' | 'HNO3_REDOX_AQUA_REGIA' | 'ACID_RAIN_SUGAR_CHARCOAL';

export const NitrogenSulfurVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualizerMode>('AMMONIA_FOUNTAIN');

  // Mode 1 state: Ammonia fountain
  const [nh3Volume, setNh3Volume] = useState<number>(1.0);
  const [isFountainTriggered, setIsFountainTriggered] = useState<boolean>(true);

  // Mode 2 state: HNO3 redox & Aqua Regia
  const [selectedMetal, setSelectedMetal] = useState<string>('Cu');
  const [acidConcentration, setAcidConcentration] = useState<'ĐẶC' | 'LOÃNG' | 'RẤT_LOÃNG'>('ĐẶC');
  const [isColdAcid, setIsColdAcid] = useState<boolean>(false);
  const [aquaRegiaMetal, setAquaRegiaMetal] = useState<'Au' | 'Pt'>('Au');

  // Mode 3 state: Eutrophication & Sugar Dehydration
  const [nitrateLevel, setNitrateLevel] = useState<number>(2.5);
  const [phosphateLevel, setPhosphateLevel] = useState<number>(0.15);
  const [sugarGrams, setSugarGrams] = useState<number>(25);

  const fountainResult = useMemo(() => {
    return simulateAmmoniaFountain(nh3Volume);
  }, [nh3Volume]);

  const hno3Result = useMemo(() => {
    return predictHno3Redox(selectedMetal, acidConcentration, isColdAcid);
  }, [selectedMetal, acidConcentration, isColdAcid]);

  const aquaRegiaResult = useMemo(() => {
    return simulateAquaRegia(aquaRegiaMetal, 0.01);
  }, [aquaRegiaMetal]);

  const eutrophicationResult = useMemo(() => {
    return evaluateEutrophication(nitrateLevel, phosphateLevel);
  }, [nitrateLevel, phosphateLevel]);

  const sugarDehydrationResult = useMemo(() => {
    return simulateSugarDehydration(sugarGrams);
  }, [sugarGrams]);

  const handleTabChange = (mode: VisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_12px_#38bdf8]" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
              GDPT 2018 Grade 11 · Chủ đề 2 · IUPAC Standard
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1">
            NITROGEN & SULFUR · CÁC HỢP CHẤT CỐT LÕI
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Đài phun nước Ammonia, oxi hóa HNO₃ & thụ động hóa, nước cường toan, phú dưỡng & than hóa đường H₂SO₄
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-800/90 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleTabChange('AMMONIA_FOUNTAIN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'AMMONIA_FOUNTAIN'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Đài Phun Nước NH₃
          </button>
          <button
            onClick={() => handleTabChange('HNO3_REDOX_AQUA_REGIA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'HNO3_REDOX_AQUA_REGIA'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Axit Nitric & Nước Cường Toan
          </button>
          <button
            onClick={() => handleTabChange('ACID_RAIN_SUGAR_CHARCOAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'ACID_RAIN_SUGAR_CHARCOAL'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Phú Dưỡng & Than Hóa H₂SO₄
          </button>
        </div>
      </div>

      {/* MODE 1: AMMONIA FOUNTAIN EXPERIMENT */}
      {activeMode === 'AMMONIA_FOUNTAIN' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual Flask Fountain Simulation */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-pink-400 flex items-center gap-2">
                  <span>⛲</span> Mô Phỏng Đài Phun Nước Ammonia
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                  Độ tan 800:1 (20°C)
                </span>
              </div>

              {/* Graphic Flask & Fountain */}
              <div className="relative flex flex-col items-center my-4">
                {/* Round bottom flask */}
                <svg width="150" height="200" viewBox="0 0 150 200">
                  {/* Flask body (inverted) */}
                  <circle cx="75" cy="70" r="55" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
                  <rect x="65" y="125" width="20" height="40" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  
                  {/* Pink fountain jet */}
                  {isFountainTriggered && (
                    <>
                      {/* Fountain water in flask */}
                      <path
                        d="M 25 70 A 50 50 0 0 0 125 70 Z"
                        fill={fountainResult.indicatorHex}
                        opacity="0.85"
                        className="animate-pulse"
                      />
                      {/* Vertical jet stream */}
                      <line
                        x1="75"
                        y1="160"
                        x2="75"
                        y2="50"
                        stroke={fountainResult.indicatorHex}
                        strokeWidth="4"
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                    </>
                  )}

                  {/* Water trough at bottom */}
                  <rect x="15" y="165" width="120" height="28" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <rect x="20" y="170" width="110" height="20" rx="4" fill="#38bdf8" opacity="0.4" />
                </svg>

                <div className="mt-2 text-center">
                  <span className="text-xs font-bold text-pink-400 block">
                    {fountainResult.indicatorColor}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Độ cao cột nước phun: ~{fountainResult.fountainHeightCm} cm (ΔP = {fountainResult.pressureDropAtm} atm)
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="w-full space-y-2 mt-4 p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Thể tích khí NH₃ trong bình:</span>
                  <span className="font-mono text-sky-400 font-bold">{nh3Volume.toFixed(2)} lít</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={nh3Volume}
                  onChange={e => setNh3Volume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>
            </div>

            {/* Scientific Explanation & Equations */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🔬</span> Nguyên Lý Thí Nghiệm & Phản Ứng Ostwald:
                </h3>

                <div className="text-xs font-mono text-sky-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/60">
                  {fountainResult.chemicalEquation}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  {fountainResult.explanationVi}
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-amber-300 block">
                    Phản ứng Oxi Hóa Ammonia (Giai đoạn đầu của quy trình Ostwald):
                  </span>
                  <div className="text-xs font-mono text-slate-300 space-y-1">
                    <div>• Không xúc tác: <span className="text-white">4 NH₃ + 3 O₂ —(t°)→ 2 N₂ + 6 H₂O</span></div>
                    <div>• Có xúc tác Pt (850-900°C): <span className="text-amber-400 font-bold">4 NH₃ + 5 O₂ —(Pt, 850°C)→ 4 NO + 6 H₂O</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-pink-950/40 border border-pink-800/60 rounded-xl text-xs text-pink-200">
                <span className="font-bold text-pink-300">Điểm mấu chốt GDPT 2018: </span>
                NH₃ tan cực tốt tạo dung dịch có tính bazơ yếu làm quỳ tím ẩm hóa xanh và phenolphtalein hóa hồng. Độ tan lớn làm giảm áp suất đột ngột tạo lực hút xiphông (chân không).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: HNO3 REDOX & AQUA REGIA */}
      {activeMode === 'HNO3_REDOX_AQUA_REGIA' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECTION A: HNO3 REDOX & PASSIVATION */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-amber-300">
                    A. Phản Ứng Oxi Hóa Kim Loại Với HNO₃
                  </h3>
                  {hno3Result.isPassivated && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 font-bold animate-pulse">
                      BỊ THỤ ĐỘNG HÓA!
                    </span>
                  )}
                </div>

                {/* Metal & Acid Selector */}
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Chọn kim loại:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Cu', 'Fe', 'Al', 'Mg', 'Zn', 'Ag'].map(sym => (
                        <button
                          key={sym}
                          onClick={() => {
                            sound.playUiClick();
                            setSelectedMetal(sym);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                            selectedMetal === sym
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Nồng độ HNO₃:</span>
                      <select
                        value={acidConcentration}
                        onChange={e => setAcidConcentration(e.target.value as any)}
                        className="w-full bg-slate-900 text-white text-xs rounded-lg p-2 border border-slate-700"
                      >
                        <option value="ĐẶC">Đặc (tạo NO₂ nâu đỏ)</option>
                        <option value="LOÃNG">Loãng (tạo NO không màu)</option>
                        <option value="RẤT_LOÃNG">Rất loãng (tạo NH₄NO₃)</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Trạng thái nhiệt:</span>
                      <button
                        onClick={() => {
                          sound.playUiClick();
                          setIsColdAcid(!isColdAcid);
                        }}
                        className={`w-full p-2 rounded-lg text-xs font-bold border transition-all ${
                          isColdAcid
                            ? 'bg-blue-600/30 text-blue-300 border-blue-500'
                            : 'bg-amber-600/30 text-amber-300 border-amber-500'
                        }`}
                      >
                        {isColdAcid ? '❄️ Axit Đặc Nguội' : '🔥 Đun Nóng / Bình Thường'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reaction Product Badge */}
                <div className="mt-4 p-4 bg-slate-900/90 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Sản phẩm khử:</span>
                    <strong className="text-amber-300">{hno3Result.reductionProductVi}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Màu sắc khí:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: hno3Result.gasColorHex }}
                      />
                      <span className="text-white font-semibold">{hno3Result.gasColorVi}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-cyan-300 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                  {hno3Result.chemicalEquation}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {hno3Result.explanationVi}
              </div>
            </div>

            {/* SECTION B: AQUA REGIA (NƯỚC CƯỜNG TOAN) */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-yellow-300">
                    B. Nước Cường Toan (Aqua Regia — 1 HNO₃ : 3 HCl)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-bold">
                    Hòa tan Vàng (Au) & Platin (Pt)
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setAquaRegiaMetal('Au');
                    }}
                    className={`flex-1 p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      aquaRegiaMetal === 'Au'
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Vàng Kim Loại (Au)
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setAquaRegiaMetal('Pt');
                    }}
                    className={`flex-1 p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      aquaRegiaMetal === 'Pt'
                        ? 'bg-slate-200 text-slate-950 border-white shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Bạch Kim (Pt)
                  </button>
                </div>

                <div className="mt-6 p-4 bg-slate-900/90 rounded-xl border border-slate-700/60 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phức axit tạo thành:</span>
                    <strong className="text-yellow-400">{aquaRegiaResult.complexAcidFormed}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khí phụ thoát ra:</span>
                    <strong className="text-slate-200">{aquaRegiaResult.byproductGas}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tỉ lệ thể tích:</span>
                    <span className="font-mono text-cyan-300 font-bold">1 thể tích HNO₃ đặc : 3 thể tích HCl đặc</span>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-yellow-300 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                  {aquaRegiaResult.chemicalEquation}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {aquaRegiaResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: ACID RAIN, EUTROPHICATION & SUGAR DEHYDRATION */}
      {activeMode === 'ACID_RAIN_SUGAR_CHARCOAL' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECTION A: EUTROPHICATION (PHÚ DƯỠNG) */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-emerald-300">
                    A. Mô Phỏng Hiện Tượng Phú Dưỡng (Eutrophication)
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                    style={{
                      backgroundColor: `${eutrophicationResult.statusColorHex}20`,
                      borderColor: eutrophicationResult.statusColorHex,
                      color: eutrophicationResult.statusColorHex
                    }}
                  >
                    {eutrophicationResult.statusVi}
                  </span>
                </div>

                {/* Nutrient Sliders */}
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Hàm lượng Nitrate [NO₃⁻]:</span>
                      <span className="font-mono text-cyan-400 font-bold">{nitrateLevel.toFixed(1)} mg/L</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="20.0"
                      step="0.5"
                      value={nitrateLevel}
                      onChange={e => setNitrateLevel(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Hàm lượng Phosphate [PO₄³⁻]:</span>
                      <span className="font-mono text-emerald-400 font-bold">{phosphateLevel.toFixed(2)} mg/L</span>
                    </div>
                    <input
                      type="range"
                      min="0.02"
                      max="1.50"
                      step="0.02"
                      value={phosphateLevel}
                      onChange={e => setPhosphateLevel(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>
                </div>

                {/* Ecological Meters */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block mb-1">Oxy hòa tan (DO):</span>
                    <strong
                      className="text-lg font-mono font-bold"
                      style={{ color: eutrophicationResult.dissolvedOxygenMgL <= 3.0 ? '#EF4444' : '#10B981' }}
                    >
                      {eutrophicationResult.dissolvedOxygenMgL} mg/L
                    </strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Tiêu chuẩn: &gt; 6 mg/L</span>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block mb-1">Xác suất thủy sinh sống:</span>
                    <strong
                      className="text-lg font-mono font-bold"
                      style={{ color: eutrophicationResult.fishSurvivalProbability <= 20 ? '#EF4444' : '#38BDF8' }}
                    >
                      {eutrophicationResult.fishSurvivalProbability}%
                    </strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Nguy cơ ngạt thở hàng loạt</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {eutrophicationResult.explanationVi}
              </div>
            </div>

            {/* SECTION B: SUGAR DEHYDRATION BY H2SO4 (SUGAR SNAKE) */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-amber-400">
                    B. Than Hóa Đường Saccarozơ (H₂SO₄ Đặc)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Sugar Snake / Cột Than Đen
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Khối lượng đường saccarozơ (C₁₂H₂₂O₁₁):</span>
                    <span className="font-mono text-amber-400 font-bold">{sugarGrams} g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={sugarGrams}
                    onChange={e => setSugarGrams(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block">Khối lượng than xốp C:</span>
                    <strong className="text-base font-mono text-white">{sugarDehydrationResult.carbonMassGrams} g</strong>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block">Khí SO₂ thoát ra:</span>
                    <strong className="text-base font-mono text-amber-400">{sugarDehydrationResult.so2VolumeLiters} L</strong>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 text-xs font-mono text-cyan-300 space-y-1">
                  <div>1. {sugarDehydrationResult.chemicalEquations[0]}</div>
                  <div>2. {sugarDehydrationResult.chemicalEquations[1]}</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-200">
                <span className="font-bold text-red-300">Cảnh báo an toàn: </span>
                {sugarDehydrationResult.safetyWarningVi}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NitrogenSulfurVisualizer;
