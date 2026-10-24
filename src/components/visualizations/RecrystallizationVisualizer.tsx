// src/components/visualizations/RecrystallizationVisualizer.tsx
// ============================================================================
// ELEMENTA RECRYSTALLIZATION & MELTING POINT PURITY SIMULATOR
// Standards: IUPAC Physical Organic Chemistry & Vietnam GDPT 2018 Chemistry 11
// Covers: Temperature-Solubility Curve S(T), Theoretical Recovery Yield, Cooling Rate (Slow vs Shock),
// Capillary Melting Point Determination (Onset to Clear), and Mixed Melting Point Identification.
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  RECRYSTALLIZATION_SUBSTANCES,
  RECRYSTALLIZATION_SOLVENTS,
  RecrystallizationSubstance,
  RecrystallizationProtocol,
  calculateRecrystallizationYield,
  calculateMixedMeltingPoint,
  interpolateSolubility,
} from '../../domain/recrystallizationEngine';
import { sound } from '../../audio/soundEngine';

export interface RecrystallizationVisualizerProps {
  initialSubstanceId?: string;
}

export const RecrystallizationVisualizer: React.FC<RecrystallizationVisualizerProps> = ({
  initialSubstanceId,
}) => {
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string>(
    initialSubstanceId || 'benzoic_acid'
  );
  const [crudeMassG, setCrudeMassG] = useState<number>(5.0);
  const [initialPurityPercent, setInitialPurityPercent] = useState<number>(90.0);
  const [solventVolumeMl, setSolventVolumeMl] = useState<number>(80);
  const [dissolutionTempC, setDissolutionTempC] = useState<number>(95);
  const [crystallizationTempC, setCrystallizationTempC] = useState<number>(4);
  const [coolingMode, setCoolingMode] = useState<'SLOW_CONTROLLED' | 'SHOCK_ICE_BATH'>('SLOW_CONTROLLED');
  const [useActivatedCharcoal, setUseActivatedCharcoal] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'crystallization' | 'solubility' | 'melting_point' | 'mixed_mp'>('crystallization');

  // Melting point simulator state
  const [mpHeaterTempC, setMpHeaterTempC] = useState<number>(115);
  const [isMeltingSimulating, setIsMeltingSimulating] = useState<boolean>(false);

  // Mixed melting point state
  const [mixedSampleBId, setMixedSampleBId] = useState<string>('acetanilide');

  const substance: RecrystallizationSubstance =
    RECRYSTALLIZATION_SUBSTANCES[selectedSubstanceId] || RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;

  // Protocol config
  const protocol: RecrystallizationProtocol = useMemo(() => {
    return {
      substanceId: selectedSubstanceId,
      solventId: substance.idealSolventId,
      crudeMassG,
      initialPurityPercent,
      solventVolumeMl,
      dissolutionTempC,
      crystallizationTempC,
      coolingMode,
      useActivatedCharcoal,
    };
  }, [
    selectedSubstanceId,
    substance.idealSolventId,
    crudeMassG,
    initialPurityPercent,
    solventVolumeMl,
    dissolutionTempC,
    crystallizationTempC,
    coolingMode,
    useActivatedCharcoal,
  ]);

  // Yield calculation
  const yieldResult = useMemo(() => {
    return calculateRecrystallizationYield(protocol);
  }, [protocol]);

  // Mixed melting point calculation
  const mixedMpResult = useMemo(() => {
    return calculateMixedMeltingPoint(selectedSubstanceId, mixedSampleBId, 0.5);
  }, [selectedSubstanceId, mixedSampleBId]);

  // Trigger crystal growth chime
  const handleTriggerGrowth = () => {
    sound.playUiClick();
    sound.playCrystalGrowthChime?.();
  };

  // Run melting ramp simulation
  const handleSimulateMeltingRamp = () => {
    if (isMeltingSimulating) return;
    setIsMeltingSimulating(true);
    setMpHeaterTempC(yieldResult.observedMeltingMinC - 6.0);
    sound.playUiClick();

    let temp = yieldResult.observedMeltingMinC - 6.0;
    const targetTemp = yieldResult.observedMeltingMaxC + 4.0;
    const interval = setInterval(() => {
      temp += 0.5;
      setMpHeaterTempC(Number(temp.toFixed(1)));
      if (temp >= yieldResult.observedMeltingMinC && temp <= yieldResult.observedMeltingMaxC) {
        sound.playMeltingPointThawSizzle?.();
      }
      if (temp >= targetTemp) {
        clearInterval(interval);
        setIsMeltingSimulating(false);
      }
    }, 120);
  };

  return (
    <div className="bg-navy/90 border border-amber-500/40 rounded-2xl p-5 sm:p-6 text-ivory shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              IUPAC PURIFICATION & GDPT 2018 (HÓA 11)
            </span>
            <span className="text-xs text-ivory-muted font-mono">Phương Pháp Kết Tinh Lại & Kiểm Tra Độ Tinh Khiết</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>💎 Mô Phỏng Kết Tinh Lại & Đo Điểm Nóng Chảy</span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1 max-w-3xl">
            Tách biệt và tinh chế chất rắn hữu cơ dựa trên độ dốc đường cong độ tan theo nhiệt độ S(T).
            Đánh giá độ tinh khiết qua hình thái tinh thể và khoảng nóng chảy mao quản (Pure ≤ 1.0 °C).
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1.5 bg-obsidian/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('crystallization');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'crystallization'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Quy Trình Kết Tinh
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('solubility');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'solubility'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Đường Cong Độ Tan S(T)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('melting_point');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'melting_point'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Đo Điểm Nóng Chảy (M.P)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('mixed_mp');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'mixed_mp'
                ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Nóng Chảy Hỗn Hợp (Mixed M.P)
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {Object.values(RECRYSTALLIZATION_SUBSTANCES).map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedSubstanceId(sub.id);
            }}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedSubstanceId === sub.id
                ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400'
                : 'bg-obsidian/40 border-navy-light/40 hover:border-amber-500/40 hover:bg-obsidian/70'
            }`}
          >
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block">
                T_m chuẩn: {sub.meltingPointPureMinC} - {sub.meltingPointPureMaxC} °C
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">{sub.nameVI}</h4>
              <div className="text-[10px] font-mono text-cyan-300">{sub.formula}</div>
              <p className="text-[11px] text-ivory-muted line-clamp-2 mt-1">
                {sub.descriptionVI}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-amber-300">
              Dung môi: {RECRYSTALLIZATION_SOLVENTS[sub.idealSolventId]?.nameVI || 'Nước'}
            </div>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXPERIMENTAL RECRYSTALLIZATION PROTOCOL & YIELD                    */}
      {/* ========================================================================= */}
      {activeTab === 'crystallization' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Experimental Parameters Control Panel */}
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Thông Số Thí Nghiệm Kết Tinh Lại</span>
              <button
                onClick={handleTriggerGrowth}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all"
              >
                ✨ Kích Mầm Tinh Thể
              </button>
            </h3>

            {/* Crude Sample Mass */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Khối lượng mẫu thô (crude mass):</span>
                <span className="font-mono text-white font-bold">{crudeMassG} g</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="20.0"
                step="0.5"
                value={crudeMassG}
                onChange={(e) => setCrudeMassG(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Initial Purity */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Độ tinh khiết ban đầu:</span>
                <span className="font-mono text-amber-300 font-bold">{initialPurityPercent}%</span>
              </div>
              <input
                type="range"
                min="60.0"
                max="98.0"
                step="1.0"
                value={initialPurityPercent}
                onChange={(e) => setInitialPurityPercent(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Solvent Volume */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Thể tích dung môi (V_solvent):</span>
                <span className="font-mono text-cyan-300 font-bold">{solventVolumeMl} mL</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={solventVolumeMl}
                onChange={(e) => setSolventVolumeMl(parseInt(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Cooling Mode Selection */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted block">Tốc độ làm lạnh kết tinh:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCoolingMode('SLOW_CONTROLLED')}
                  className={`p-2 rounded-lg text-xs font-bold border transition-all text-left ${
                    coolingMode === 'SLOW_CONTROLLED'
                      ? 'bg-emerald-950/50 border-emerald-400 text-emerald-200'
                      : 'bg-navy border-navy-light text-ivory-muted'
                  }`}
                >
                  <div className="font-bold">Làm nguội từ từ</div>
                  <div className="text-[10px] opacity-75 font-normal">Nhiệt độ phòng → Chậu đá (Tinh thể lớn, tinh khiết)</div>
                </button>
                <button
                  onClick={() => setCoolingMode('SHOCK_ICE_BATH')}
                  className={`p-2 rounded-lg text-xs font-bold border transition-all text-left ${
                    coolingMode === 'SHOCK_ICE_BATH'
                      ? 'bg-rose-950/50 border-rose-400 text-rose-200'
                      : 'bg-navy border-navy-light text-ivory-muted'
                  }`}
                >
                  <div className="font-bold">Làm lạnh đột ngột</div>
                  <div className="text-[10px] opacity-75 font-normal">Nhúng ngay vào chậu đá (Bột mịn, ngậm tạp chất)</div>
                </button>
              </div>
            </div>

            {/* Decolorizing Carbon Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-navy/60 border border-navy-light/40">
              <div className="text-xs">
                <div className="font-bold text-white">Than hoạt tính khử màu (Norit A)</div>
                <div className="text-[10px] text-ivory-muted">Hấp phụ tạp chất màu hữu cơ trước khi lọc nóng</div>
              </div>
              <input
                type="checkbox"
                checked={useActivatedCharcoal}
                onChange={(e) => setUseActivatedCharcoal(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            {/* Calculated Yield Summary Box */}
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 space-y-1.5 text-xs font-mono">
              <div className="text-amber-300 font-bold">KẾT QUẢ THU HỒI TINH THỂ:</div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Khối lượng tinh thể thu được:</span>
                <span className="font-bold text-white">{yieldResult.recoveredCrystalsMassG} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Hiệu suất thu hồi lý thuyết:</span>
                <span className="font-bold text-emerald-300">{yieldResult.theoreticalRecoveryPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Độ tinh khiết sau kết tinh:</span>
                <span className="font-bold text-cyan-300">{yieldResult.purifiedPurityPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Khoảng nóng chảy (M.P range):</span>
                <span className="font-bold text-amber-200">
                  {yieldResult.observedMeltingMinC} - {yieldResult.observedMeltingMaxC} °C (ΔT = {yieldResult.meltingRangeC} °C)
                </span>
              </div>
            </div>
          </div>

          {/* Graphical Step-by-Step Laboratory Workflow */}
          <div className="lg:col-span-7 bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Quy Trình Thực Hành Chuẩn (Standard Operating Procedure)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                yieldResult.isPureSharp
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {yieldResult.isPureSharp ? '✓ TINH KHIẾT SẮC NÉT' : '⚠ CẦN KẾT TINH LẠI LẦN 2'}
              </span>
            </h4>

            {/* Operational Steps Cards */}
            <div className="space-y-2">
              {yieldResult.operationalStepsVI.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 text-xs text-ivory flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <div className="leading-relaxed">{step}</div>
                </div>
              ))}
            </div>

            {/* Crystal Habit Visual Description Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/30 to-navy border border-amber-500/30 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div className="text-xs">
                <div className="font-bold text-amber-200">Hình thái tinh thể quan sát được:</div>
                <div className="text-ivory-muted mt-0.5">{yieldResult.crystalMorphologyVI}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TEMPERATURE SOLUBILITY CURVE S(T) EXPLORER                        */}
      {/* ========================================================================= */}
      {activeTab === 'solubility' && (
        <div className="bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">Đồ Thị Đường Cong Độ Tan S(T) Theo Nhiệt Độ</h3>
              <p className="text-xs text-ivory-muted">
                Độ tan (gam chất tan / 100 gam dung môi) tăng theo nhiệt độ. Vùng chênh lệch giữa nhiệt độ nóng ({dissolutionTempC} °C)
                và nhiệt độ lạnh ({crystallizationTempC} °C) quyết định lượng tinh thể tách ra.
              </p>
            </div>
            <div className="text-xs font-mono text-amber-300">
              ΔS = {(interpolateSolubility(substance, dissolutionTempC) - interpolateSolubility(substance, crystallizationTempC)).toFixed(2)} g/100g dung môi
            </div>
          </div>

          {/* SVG Solubility Curve */}
          <div className="flex justify-center">
            <svg viewBox="0 0 500 280" className="w-full max-w-2xl h-auto select-none">
              {/* Axes */}
              <line x1="50" y1="230" x2="470" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <line x1="50" y1="20" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <text x="260" y="260" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Nhiệt độ dung môi T (°C)
              </text>
              <text
                x="20"
                y="125"
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(-90 20 125)"
                fontFamily="monospace"
              >
                Độ tan S (g / 100g H2O)
              </text>

              {/* Gridlines */}
              <line x1="50" y1="180" x2="470" y2="180" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="130" x2="470" y2="130" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="80" x2="470" y2="80" stroke="#334155" strokeDasharray="3 3" />

              {/* Curve Path */}
              {(() => {
                const maxS = substance.solubilityCurve[substance.solubilityCurve.length - 1].solubilityGPer100G * 1.1;
                const pts: string[] = [];
                for (let t = 0; t <= 100; t += 2) {
                  const s = interpolateSolubility(substance, t);
                  const x = 50 + (t / 100) * 420;
                  const y = 230 - (s / maxS) * 200;
                  pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return (
                  <path
                    d={`M ${pts.join(' L ')}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                );
              })()}

              {/* Cold Crystallization Temperature Marker */}
              {(() => {
                const maxS = substance.solubilityCurve[substance.solubilityCurve.length - 1].solubilityGPer100G * 1.1;
                const sCold = interpolateSolubility(substance, crystallizationTempC);
                const xCold = 50 + (crystallizationTempC / 100) * 420;
                const yCold = 230 - (sCold / maxS) * 200;
                return (
                  <g>
                    <circle cx={xCold} cy={yCold} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1={xCold} y1={yCold} x2={xCold} y2="230" stroke="#38bdf8" strokeDasharray="2 2" />
                    <text x={xCold} y="242" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      {crystallizationTempC}°C
                    </text>
                  </g>
                );
              })()}

              {/* Hot Dissolution Temperature Marker */}
              {(() => {
                const maxS = substance.solubilityCurve[substance.solubilityCurve.length - 1].solubilityGPer100G * 1.1;
                const sHot = interpolateSolubility(substance, dissolutionTempC);
                const xHot = 50 + (dissolutionTempC / 100) * 420;
                const yHot = 230 - (sHot / maxS) * 200;
                return (
                  <g>
                    <circle cx={xHot} cy={yHot} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1={xHot} y1={yHot} x2={xHot} y2="230" stroke="#ef4444" strokeDasharray="2 2" />
                    <text x={xHot} y="242" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      {dissolutionTempC}°C
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CAPILLARY MELTING POINT PURITY APPARATUS                          */}
      {/* ========================================================================= */}
      {activeTab === 'melting_point' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Thiết Bị Đo Điểm Nóng Chảy Mao Quản</span>
              <button
                onClick={handleSimulateMeltingRamp}
                disabled={isMeltingSimulating}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isMeltingSimulating
                    ? 'bg-navy-light text-ivory-muted cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-obsidian shadow font-extrabold'
                }`}
              >
                {isMeltingSimulating ? 'Đang Gia Nhiệt...' : '▶ Bắt Đầu Gia Nhiệt (1°C/phút)'}
              </button>
            </h3>
            <p className="text-xs text-ivory-muted">
              Mẫu tinh thể nghiền mịn nạp vào ống mao quản thủy tinh một đầu hàn kín (cao 2 - 3 mm).
              Gia nhiệt chậm gần điểm nóng chảy. Quan sát khoảnh khắc bắt đầu chảy (Onset) đến khi hoàn toàn trong suốt (Clear).
            </p>

            {/* Live Temperature Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nhiệt độ khối nung (Heater block):</span>
                <span className="font-mono text-2xl font-extrabold text-amber-300">
                  {mpHeaterTempC.toFixed(1)} °C
                </span>
              </div>
              <input
                type="range"
                min={yieldResult.observedMeltingMinC - 10}
                max={yieldResult.observedMeltingMaxC + 10}
                step="0.2"
                value={mpHeaterTempC}
                onChange={(e) => setMpHeaterTempC(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Melting State Verdict */}
            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 space-y-1.5 text-xs font-mono">
              <div className="text-ivory-muted">TRẠNG THÁI PHA HIỆN TẠI TRONG ỐNG MAO QUẢN:</div>
              {(() => {
                if (mpHeaterTempC < yieldResult.observedMeltingMinC) {
                  return <div className="text-white font-bold">❄ PHA RẮN: Tinh thể trắng mờ, chưa có dấu hiệu nóng chảy.</div>;
                } else if (mpHeaterTempC <= yieldResult.observedMeltingMaxC) {
                  return (
                    <div className="text-amber-300 font-bold animate-pulse">
                      💧 CHUYỂN PHA (ONSET → CLEAR): Các hạt tinh thể mềm nhũn, xuất hiện giọt lỏng đầu tiên và mặt khum (meniscus).
                    </div>
                  );
                } else {
                  return <div className="text-cyan-300 font-bold">🧪 PHA LỎNG HOÀN TOÀN: Chất lỏng trong suốt, hoàn toàn chảy lỏng.</div>;
                }
              })()}
            </div>
          </div>

          {/* Visual Capillary Window */}
          <div className="lg:col-span-7 bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 flex flex-col items-center">
            <h4 className="text-xs font-mono text-ivory-muted mb-3">
              Kính Lúp Quan Sát Ống Mao Quản (Magnified Capillary Window)
            </h4>

            <div className="w-48 h-64 rounded-full border-4 border-amber-500/50 bg-black/80 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]">
              {/* Glass capillary tube */}
              <div className="w-8 h-56 bg-white/10 border-x border-white/30 rounded-t-sm flex flex-col justify-end p-1 relative">
                {/* Solid or melted substance inside capillary */}
                {(() => {
                  const isSolid = mpHeaterTempC < yieldResult.observedMeltingMinC;
                  const isTransition = mpHeaterTempC >= yieldResult.observedMeltingMinC && mpHeaterTempC <= yieldResult.observedMeltingMaxC;
                  return (
                    <div
                      className={`w-full rounded-b transition-all duration-300 ${
                        isSolid
                          ? 'h-16 bg-white/90 border border-white shadow-sm'
                          : isTransition
                          ? 'h-14 bg-amber-200/60 border border-amber-300 animate-pulse'
                          : 'h-12 bg-cyan-200/30 border border-cyan-300/40'
                      }`}
                    >
                      <div className="text-[8px] font-mono text-center text-obsidian font-bold pt-1">
                        {isSolid ? 'Rắn' : isTransition ? 'Nóng chảy' : 'Lỏng'}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Crosshair guidelines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-px bg-white" />
                <div className="h-full w-px bg-white absolute" />
              </div>
            </div>

            <div className="text-xs font-mono text-center text-ivory-muted mt-3">
              Khoảng nóng chảy chuẩn: <strong>{substance.meltingPointPureMinC} - {substance.meltingPointPureMaxC} °C</strong> (ΔT ≤ 0.5 °C).
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MIXED MELTING POINT PURITY VERIFICATION                           */}
      {/* ========================================================================= */}
      {activeTab === 'mixed_mp' && (
        <div className="space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
          <div>
            <h3 className="text-sm font-bold text-white">Thử Nghiệm Nhiệt Độ Nóng Chảy Hỗn Hợp (Mixed Melting Point)</h3>
            <p className="text-xs text-ivory-muted">
              Phương pháp định danh chắc chắn chất rắn hữu cơ mà không cần máy quang phổ đắt tiền.
              Trộn mẫu chưa biết với chất chuẩn đã biết theo tỷ lệ 1 : 1:
              Nếu cùng là một chất, điểm nóng chảy không đổi. Nếu khác chất, điểm nóng chảy hạ sâu và khoảng nóng chảy dãn rộng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40">
              <span className="text-xs text-ivory-muted block mb-1">Mẫu thử nghiệm A:</span>
              <div className="font-bold text-white text-sm">{substance.nameVI} ({substance.meltingPointPureMinC} °C)</div>
            </div>

            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40">
              <span className="text-xs text-ivory-muted block mb-1">Trộn với chất chuẩn B (50 : 50):</span>
              <select
                value={mixedSampleBId}
                onChange={(e) => setMixedSampleBId(e.target.value)}
                className="w-full bg-obsidian border border-navy-light rounded px-2.5 py-1 text-xs text-white"
              >
                {Object.values(RECRYSTALLIZATION_SUBSTANCES).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameVI} ({s.meltingPointPureMinC} °C)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mixed MP Result Box */}
          <div
            className={`p-4 rounded-xl border space-y-1.5 ${
              mixedMpResult.areIdentical
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span>KẾT QUẢ ĐO NÓNG CHẢY HỖN HỢP:</span>
              <span className="text-lg">
                T_m = {mixedMpResult.expectedMeltingPointC} °C (ΔT = {mixedMpResult.meltingRangeC} °C)
              </span>
            </div>
            <div className="text-xs font-semibold">{mixedMpResult.verdictVI}</div>
          </div>
        </div>
      )}
    </div>
  );
};
