import React, { useState, useMemo } from 'react';
import {
  CURRICULUM_ALCOHOLS,
  CURRICULUM_PHENOLS,
  predictAlcoholOxidation,
  predictAlcoholDehydration,
  evaluateCuOh2PolyolTest,
  evaluatePhenolReaction,
  type AlcoholDef,
  type PhenolDef
} from '../../domain/alcoholPhenolEngine';
import { sound } from '../../audio/soundEngine';

type VisualizerMode = 'ALCOHOL_REACTIONS' | 'CUOH2_POLYOL_TEST' | 'PHENOL_CHEMISTRY';

export const AlcoholPhenolVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualizerMode>('ALCOHOL_REACTIONS');

  // Mode 1 state: Alcohol reactions
  const [selectedAlcoholId, setSelectedAlcoholId] = useState<string>('ethanol');
  const [dehydrationTemp, setDehydrationTemp] = useState<number>(170);

  // Mode 2 state: Cu(OH)2 Polyol test
  const [polyolTestCompoundId, setPolyolTestCompoundId] = useState<string>('glycerol');

  // Mode 3 state: Phenol chemistry
  const [phenolReagent, setPhenolReagent] = useState<'NAOH' | 'CO2_H2O' | 'BR2_WATER' | 'HNO3_CONC'>('BR2_WATER');
  const [phenolMoles, setPhenolMoles] = useState<number>(0.01);

  const selectedAlcohol = useMemo(() => {
    return CURRICULUM_ALCOHOLS.find(a => a.id === selectedAlcoholId) || CURRICULUM_ALCOHOLS[0];
  }, [selectedAlcoholId]);

  const oxidationResult = useMemo(() => {
    return predictAlcoholOxidation(selectedAlcoholId);
  }, [selectedAlcoholId]);

  const dehydrationResult = useMemo(() => {
    return predictAlcoholDehydration(selectedAlcoholId, dehydrationTemp);
  }, [selectedAlcoholId, dehydrationTemp]);

  const polyolTestResult = useMemo(() => {
    return evaluateCuOh2PolyolTest(polyolTestCompoundId);
  }, [polyolTestCompoundId]);

  const phenolReactionResult = useMemo(() => {
    return evaluatePhenolReaction(phenolReagent, phenolMoles);
  }, [phenolReagent, phenolMoles]);

  const handleTabChange = (mode: VisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              GDPT 2018 Grade 11 · Chủ đề 5 · IUPAC Standard
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1">
            DẪN XUẤT HALOGEN · ALCOHOL · PHENOL
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Oxi hóa CuO, tách nước theo Zaitsev, nhận biết poliancol với Cu(OH)₂ & phản ứng thế phenol
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-800/90 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleTabChange('ALCOHOL_REACTIONS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'ALCOHOL_REACTIONS'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Ancol (CuO & Zaitsev)
          </button>
          <button
            onClick={() => handleTabChange('CUOH2_POLYOL_TEST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'CUOH2_POLYOL_TEST'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Phức Chelate Cu(OH)₂
          </button>
          <button
            onClick={() => handleTabChange('PHENOL_CHEMISTRY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'PHENOL_CHEMISTRY'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Hóa Học Phenol
          </button>
        </div>
      </div>

      {/* MODE 1: ALCOHOL REACTIONS (CuO OXIDATION & ZAITSEV DEHYDRATION) */}
      {activeMode === 'ALCOHOL_REACTIONS' && (
        <div className="mt-6 space-y-6">
          {/* Alcohol Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {CURRICULUM_ALCOHOLS.map(alc => {
              const isSelected = alc.id === selectedAlcoholId;
              return (
                <button
                  key={alc.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedAlcoholId(alc.id);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {alc.formula} ({alc.nameIupac})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECTION A: CONTROLLED CuO OXIDATION */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-emerald-300">
                    A. Oxi Hóa Không Hoàn Toàn Bằng CuO (t°)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {selectedAlcohol.alcoholClass}
                  </span>
                </div>
                <div className="mt-2 text-xs font-mono text-cyan-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                  {oxidationResult.chemicalEquation}
                </div>

                {/* Visual Cu Metal Wire */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-24 rounded-t-xl border-2 border-slate-600 bg-slate-900 flex flex-col items-center justify-end p-2 relative overflow-hidden">
                      <div className="absolute top-2 w-4 h-12 bg-slate-800 rounded-sm" />
                      <div
                        className="w-full h-8 rounded transition-colors duration-500 shadow-md flex items-center justify-center text-[10px] font-bold"
                        style={{
                          backgroundColor: oxidationResult.isRedOxidized ? '#DC2626' : '#1E293B',
                          color: oxidationResult.isRedOxidized ? '#FEF2F2' : '#94A3B8'
                        }}
                      >
                        {oxidationResult.isRedOxidized ? 'Cu (đỏ gạch)' : 'CuO (đen)'}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 font-mono">Dây Cu nung nóng</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Loại sản phẩm: </span>
                      <strong className="text-white">{oxidationResult.productType}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Tên sản phẩm: </span>
                      <strong className="text-emerald-300">{oxidationResult.productNameVi}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg">
                      <span className="text-slate-400">Hiện tượng: </span>
                      <span className="text-slate-200">{oxidationResult.cuoColorChange}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {oxidationResult.explanationVi}
              </div>
            </div>

            {/* SECTION B: DEHYDRATION TEMPERATURE SWITCH & ZAITSEV RULE */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-amber-300">
                    B. Phản Ứng Tách Nước (H₂SO₄ đặc)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    140°C vs 170°C
                  </span>
                </div>

                {/* Temperature Slider */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">Nhiệt độ phản ứng:</span>
                    <span className="font-mono text-amber-300 font-bold text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      T = {dehydrationTemp}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    step="5"
                    value={dehydrationTemp}
                    onChange={e => setDehydrationTemp(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>100°C</span>
                    <span className="text-amber-400 font-bold">140°C (Tạo Ete)</span>
                    <span className="text-cyan-400 font-bold">170°C (Tạo Anken)</span>
                    <span>200°C</span>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-amber-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                  {dehydrationResult.chemicalEquation}
                </div>

                {/* Reaction Outcome Display */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                    <span className="text-slate-400">Kiểu phản ứng:</span>
                    <strong className="text-amber-300">{dehydrationResult.reactionType}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg flex justify-between">
                    <span className="text-slate-400">Sản phẩm chính:</span>
                    <strong className="text-white">{dehydrationResult.mainProductVi} ({dehydrationResult.mainProductFormula})</strong>
                  </div>
                  {dehydrationResult.followsZaitsev && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                      <span className="font-bold">Quy tắc Zaitsev: </span>
                      {dehydrationResult.majorAlkene}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                {dehydrationResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: CU(OH)2 POLYOL CHELATION TEST */}
      {activeMode === 'CUOH2_POLYOL_TEST' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/60 flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold text-slate-300">Chọn chất thử nghiệm với Cu(OH)₂:</span>
            <div className="flex flex-wrap gap-2">
              {CURRICULUM_ALCOHOLS.map(alc => (
                <button
                  key={alc.id}
                  onClick={() => {
                    sound.playUiClick();
                    setPolyolTestCompoundId(alc.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    polyolTestCompoundId === alc.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {alc.nameVi}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Visual Test Tube Comparison */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-slate-700">
              <div className="flex items-end gap-12">
                {/* Tube 1: Ethanol (monohydric) */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-36 rounded-b-2xl border-2 border-slate-600 bg-slate-800/40 relative overflow-hidden flex flex-col justify-end p-1">
                    {/* Clear liquid */}
                    <div className="w-full h-24 bg-sky-200/20" />
                    {/* Insoluble precipitate at bottom */}
                    <div className="w-full h-4 bg-sky-400 rounded-b-xl shadow-inner flex items-center justify-center text-[8px] font-bold text-slate-950">
                      Cu(OH)₂↓
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 mt-2">C₂H₅OH (Đơn chức)</span>
                  <span className="text-[10px] text-slate-400">Không tan (Lắng cặn)</span>
                </div>

                {/* Tube 2: Selected Substance */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-36 rounded-b-2xl border-2 border-slate-600 bg-slate-800/40 relative overflow-hidden flex flex-col justify-end p-1">
                    <div
                      className="w-full transition-all duration-300 rounded-b-xl flex items-center justify-center text-[9px] font-bold"
                      style={{
                        height: polyolTestResult.dissolvesCuOh2 ? '80px' : '20px',
                        backgroundColor: polyolTestResult.colorHex,
                        color: polyolTestResult.dissolvesCuOh2 ? '#ffffff' : '#0f172a'
                      }}
                    >
                      {polyolTestResult.dissolvesCuOh2 ? 'Dung dịch phức' : 'Cu(OH)₂↓'}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-300 mt-2">Chất đang chọn</span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px] text-center">
                    {polyolTestResult.dissolvesCuOh2 ? 'Hòa tan tạo phức' : 'Không tạo phức'}
                  </span>
                </div>
              </div>
            </div>

            {/* Scientific Explanation & Equation */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🧪</span> Kết quả phản ứng tạo phức chelate:
                </h4>
                <div
                  className="mt-3 p-3 rounded-xl border text-xs font-bold"
                  style={{
                    backgroundColor: polyolTestResult.dissolvesCuOh2 ? '#1E3A8A' : '#0F172A',
                    borderColor: polyolTestResult.dissolvesCuOh2 ? '#3B82F6' : '#475569',
                    color: polyolTestResult.dissolvesCuOh2 ? '#93C5FD' : '#94A3B8'
                  }}
                >
                  {polyolTestResult.solutionColorVi}
                </div>

                {polyolTestResult.chemicalEquation && (
                  <div className="mt-3 text-xs font-mono text-cyan-300 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                    {polyolTestResult.chemicalEquation}
                  </div>
                )}

                <div className="mt-4 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  {polyolTestResult.explanationVi}
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                <span className="font-bold">Quy tắc GDPT 2018: </span>
                Chỉ các poliancol có ít nhất 2 nhóm -OH ở 2 nguyên tử cacbon liền kề nhau (vicinal diol/triol như etylen glicol, glixerol) mới có khả năng hòa tan Cu(OH)₂ tạo dung dịch xanh lam thẫm. Các ancol đơn chức hoặc poliancol có -OH xa nhau (propan-1,3-điol) không có phản ứng này.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: PHENOL CHEMISTRY */}
      {activeMode === 'PHENOL_CHEMISTRY' && (
        <div className="mt-6 space-y-6">
          {/* Reagent Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'NAOH', label: '1. Dung dịch NaOH', sub: 'Tính axit yếu' },
              { id: 'CO2_H2O', label: '2. Khí CO₂ + H₂O', sub: 'Đẩy phenol khỏi phenolat' },
              { id: 'BR2_WATER', label: '3. Nước Brom (Br₂)', sub: 'Kết tủa trắng 2,4,6-tribromophenol' },
              { id: 'HNO3_CONC', label: '4. Axit HNO₃ đặc', sub: 'Axit Picric kết tủa vàng' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => {
                  sound.playUiClick();
                  setPhenolReagent(r.id as any);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  phenolReagent === r.id
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="text-xs font-bold">{r.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{r.sub}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/70">
            {/* Input Controls & Stoichiometry */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200">Thông số phản ứng:</h4>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Lượng Phenol ban đầu:</span>
                  <span className="font-mono text-emerald-300 font-bold">{phenolMoles.toFixed(3)} mol</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.005"
                  value={phenolMoles}
                  onChange={e => setPhenolMoles(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {phenolReactionResult.precipitateFormed && (
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-xs text-slate-400">Kết tủa thu được:</span>
                  <div className="text-sm font-bold text-white">{phenolReactionResult.precipitateNameVi}</div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Khối lượng kết tủa:</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      {phenolReactionResult.precipitateMassG} g
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Reaction Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-mono text-emerald-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/70">
                {phenolReactionResult.chemicalEquation}
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-300 leading-relaxed">
                {phenolReactionResult.explanationVi}
              </div>

              {/* Special pedagogical warning banner */}
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 leading-relaxed">
                <span className="font-bold text-cyan-300">Bẫy lý thuyết GDPT 2018: </span>
                Phenol có tính axit yếu (pKₐ = 9.95), yếu hơn axit cacbonic (H₂CO₃) và không làm đổi màu quỳ tím. Phenol tác dụng được với dung dịch NaOH nhưng KHÔNG tác dụng được với dung dịch NaHCO₃ hoặc Na₂CO₃ để giải phóng khí CO₂.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlcoholPhenolVisualizer;
