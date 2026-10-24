// src/components/visualizations/PhaseEquilibriaVisualizer.tsx
// ============================================================================
// ELEMENTA PHASE EQUILIBRIA, VAPOR PRESSURE & DISTILLATION THERMODYNAMICS VISUALIZER
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 Chemistry 10 & 11
// Covers: Vapor-Liquid Equilibrium (VLE) T-x-y Boiling Diagrams, Raoult & Dalton Laws,
// McCabe-Thiele Theoretical Plates, Minimum Azeotropes, and Steam Distillation of Essential Oils.
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  BINARY_DISTILLATION_SYSTEMS,
  BinarySystemDef,
  calculateIdealBinaryVLE,
  calculateBoilingPointIdealMixtureCelsius,
  generateVLEBoilingCurvePoints,
  calculateFenskeMinimumPlates,
  calculateSteamDistillationParameters,
  calculateClausiusClapeyronVaporPressureMmHg,
} from '../../domain/phaseEquilibriaEngine';
import { sound } from '../../audio/soundEngine';

export interface PhaseEquilibriaVisualizerProps {
  initialSystemId?: string;
}

export const PhaseEquilibriaVisualizer: React.FC<PhaseEquilibriaVisualizerProps> = ({
  initialSystemId,
}) => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>(initialSystemId || 'benzene_toluene');
  const [liquidMoleFractionA, setLiquidMoleFractionA] = useState<number>(0.40); // 40% more volatile A
  const [activeTab, setActiveTab] = useState<'vle' | 'distillation' | 'steam' | 'clausius'>('vle');
  const [isBoilingSimActive, setIsBoilingSimActive] = useState<boolean>(false);

  // Custom Clausius-Clapeyron inputs
  const [customTempC, setCustomTempC] = useState<number>(60.0);

  const system: BinarySystemDef = BINARY_DISTILLATION_SYSTEMS[selectedSystemId] || BINARY_DISTILLATION_SYSTEMS.benzene_toluene;

  // VLE curve points
  const curvePoints = useMemo(() => {
    return generateVLEBoilingCurvePoints(system, 25);
  }, [system]);

  // Current boiling point and equilibrium vapor composition
  const currentBoilingData = useMemo(() => {
    if (system.isSteamDistillation) {
      return null;
    }
    const tBoil = calculateBoilingPointIdealMixtureCelsius(liquidMoleFractionA, system.componentA, system.componentB);
    const vle = calculateIdealBinaryVLE(liquidMoleFractionA, tBoil, system.componentA, system.componentB);
    return { tBoil, vle };
  }, [system, liquidMoleFractionA]);

  // Steam distillation parameters (if active)
  const steamData = useMemo(() => {
    if (!system.isSteamDistillation) return null;
    return calculateSteamDistillationParameters(system.componentB);
  }, [system]);

  // Minimum plates (Fenske)
  const fenskePlates = useMemo(() => {
    const avgAlpha = currentBoilingData?.vle.relativeVolatility || 2.4;
    return calculateFenskeMinimumPlates(0.98, 0.05, avgAlpha);
  }, [currentBoilingData]);

  // SVG dimensions for VLE plot
  const svgWidth = 560;
  const svgHeight = 260;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 25;
  const padBottom = 35;

  const minT = 70.0;
  const maxT = 115.0;

  const mapX = (x: number) => padLeft + x * (svgWidth - padLeft - padRight);
  const mapY = (t: number) => padTop + ((maxT - t) / (maxT - minT)) * (svgHeight - padTop - padBottom);

  const handleSimulateBoil = () => {
    setIsBoilingSimActive(true);
    sound.playBoilingBubbleSim?.();
    setTimeout(() => {
      sound.playDistillationCondensateDrip?.();
      setIsBoilingSimActive(false);
    }, 400);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              IUPAC & GDPT 2018 Chemistry
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Cân Bằng Pha & Chưng Cất Phân Đoạn
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ln(P₂/P₁) = -ΔHvap/R (1/T₂ - 1/T₁)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            🌡️ Giản Đồ Cân Bằng Lỏng - Hơi & Nhiệt Động Học Chưng Cất
          </h2>
          <p className="text-xs text-slate-400">
            Khảo sát định luật Raoult, Dalton, giản đồ pha T-x-y, số đĩa lý thuyết Fenske, điểm đẳng phí azeotrope và chưng cất lôi cuốn hơi nước tinh dầu.
          </p>
        </div>

        {/* SIMULATE BOIL BUTTON */}
        <button
          onClick={handleSimulateBoil}
          disabled={isBoilingSimActive}
          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
            isBoilingSimActive
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20'
          }`}
        >
          <span>🔥</span>
          <span>{isBoilingSimActive ? 'Đang Đun Sôi & Ngưng Tụ...' : 'Đun Sôi Bình Cất'}</span>
        </button>
      </div>

      {/* SYSTEM SELECTOR & CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Hệ Chưng Cất / Tách Biệt:
          </label>
          <select
            value={selectedSystemId}
            onChange={(e) => {
              setSelectedSystemId(e.target.value);
              sound.playPhotodetectorBeep?.();
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
          >
            {Object.values(BINARY_DISTILLATION_SYSTEMS).map((s) => (
              <option key={s.id} value={s.id}>
                {s.nameVI}
              </option>
            ))}
          </select>
        </div>

        {!system.isSteamDistillation ? (
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Phần mol lỏng cấu tử dễ bay hơi (x_A):</span>
              <span className="font-mono text-cyan-300 font-bold">
                {(liquidMoleFractionA * 100).toFixed(1)}% {system.componentA.name}
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.02"
              value={liquidMoleFractionA}
              onChange={(e) => setLiquidMoleFractionA(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>0% (Nguyên chất {system.componentB.name})</span>
              <span>100% (Nguyên chất {system.componentA.name})</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-center">
            <span className="text-[11px] text-slate-400">Phương pháp chưng cất:</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5">
              Chưng cất lôi cuốn hơi nước (Steam Distillation)
            </span>
          </div>
        )}

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-center">
          <div className="text-[11px] text-slate-400">Trạng Thái Điểm Sôi (P = 1 atm):</div>
          {!system.isSteamDistillation && currentBoilingData ? (
            <div className="text-base font-mono font-bold text-amber-400 flex items-baseline gap-2 mt-0.5">
              <span>T_sôi = {currentBoilingData.tBoil.toFixed(1)} °C</span>
              <span className="text-xs text-slate-300 font-normal">
                y_A = {(currentBoilingData.vle.yA * 100).toFixed(1)}% (hơi)
              </span>
            </div>
          ) : steamData ? (
            <div className="text-base font-mono font-bold text-emerald-400 flex items-baseline gap-2 mt-0.5">
              <span>T_hỗn hợp = {steamData.distillationTempC.toFixed(1)} °C</span>
              <span className="text-xs text-slate-400 font-normal">(&lt; 100 °C)</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* VLE PLOT CANVAS (FOR LIQUID-VAPOR EQUILIBRIUM SYSTEMS) */}
      {!system.isSteamDistillation && currentBoilingData && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              📊 Giản Đồ Pha Nhiệt Độ Sôi - Thành Phần (T-x-y) Ở 1.0 atm (760 mmHg)
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-blue-400"></span>
                <span>Đường điểm sôi (Bubble point - Lỏng)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-rose-400"></span>
                <span>Đường điểm sương (Dew point - Hơi)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-amber-400 border border-amber-400"></span>
                <span>Đường gióng đẳng nhiệt (Tie-line)</span>
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full min-w-[500px] h-[260px] bg-slate-950 rounded-lg select-none"
            >
              {/* Axes Grid */}
              {Array.from({ length: 6 }).map((_, i) => {
                const fraction = i / 5;
                const xPos = mapX(fraction);
                const tVal = minT + fraction * (maxT - minT);
                const yPos = mapY(tVal);
                return (
                  <g key={`grid-${i}`}>
                    {/* Vertical grid line */}
                    <line x1={xPos} y1={padTop} x2={xPos} y2={svgHeight - padBottom} stroke="#1e293b" strokeDasharray="2,2" />
                    <text x={xPos} y={svgHeight - padBottom + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {(fraction * 100).toFixed(0)}%
                    </text>
                    {/* Horizontal grid line */}
                    <line x1={padLeft} y1={yPos} x2={svgWidth - padRight} y2={yPos} stroke="#1e293b" strokeDasharray="2,2" />
                    <text x={padLeft - 8} y={yPos + 3} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                      {tVal.toFixed(0)}°C
                    </text>
                  </g>
                );
              })}

              {/* Axes lines */}
              <line x1={padLeft} y1={padTop} x2={padLeft} y2={svgHeight - padBottom} stroke="#475569" strokeWidth="1.5" />
              <line x1={padLeft} y1={svgHeight - padBottom} x2={svgWidth - padRight} y2={svgHeight - padBottom} stroke="#475569" strokeWidth="1.5" />
              <text x={svgWidth - padRight} y={svgHeight - padBottom + 16} fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                x_A, y_A (Phần mol)
              </text>
              <text x={padLeft} y={padTop - 8} fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                T (°C)
              </text>

              {/* Bubble Point Curve (Liquid phase - Blue) */}
              <path
                d={curvePoints
                  .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.xA)} ${mapY(p.tBoilC)}`)
                  .join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />

              {/* Dew Point Curve (Vapor phase - Rose) */}
              <path
                d={curvePoints
                  .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.yA)} ${mapY(p.tBoilC)}`)
                  .join(' ')}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />

              {/* Current Operating Tie-Line */}
              <line
                x1={mapX(liquidMoleFractionA)}
                y1={mapY(currentBoilingData.tBoil)}
                x2={mapX(currentBoilingData.vle.yA)}
                y2={mapY(currentBoilingData.tBoil)}
                stroke="#f59e0b"
                strokeWidth="2"
              />

              {/* Liquid state marker */}
              <circle cx={mapX(liquidMoleFractionA)} cy={mapY(currentBoilingData.tBoil)} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

              {/* Vapor equilibrium marker */}
              <circle cx={mapX(currentBoilingData.vle.yA)} cy={mapY(currentBoilingData.tBoil)} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />

              {/* Labels on Tie-line */}
              <text
                x={mapX(liquidMoleFractionA)}
                y={mapY(currentBoilingData.tBoil) + 16}
                fill="#38bdf8"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Lỏng (x_A = {liquidMoleFractionA.toFixed(2)})
              </text>
              <text
                x={mapX(currentBoilingData.vle.yA)}
                y={mapY(currentBoilingData.tBoil) - 8}
                fill="#f43f5e"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Hơi (y_A = {currentBoilingData.vle.yA.toFixed(2)})
              </text>

              {/* Two-phase coexistence label */}
              <text x={svgWidth / 2} y={svgHeight / 2} fill="#64748b" opacity="0.4" fontSize="12" fontWeight="bold" textAnchor="middle">
                Vùng Cân Bằng Hai Pha (Lỏng + Hơi)
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* PEDAGOGICAL TABS */}
      <div className="space-y-4">
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          {[
            { id: 'vle', label: '📊 Định Luật Raoult & Đĩa Fenske', icon: '📐' },
            { id: 'distillation', label: '🧪 Cấu Tạo Cột Chưng Cất Phân Đoạn', icon: '🌡️' },
            { id: 'steam', label: '🌿 Chưng Cất Lôi Cuốn Hơi Nước', icon: '💧' },
            { id: 'clausius', label: '🧮 Máy Tính Hơi Clausius-Clapeyron', icon: '⚡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playPhotodetectorBeep?.();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-300 bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: RAOULT & FENSKE PLATES */}
        {activeTab === 'vle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                📐 Định Luật Raoult & Dalton Cho Dung Dịch Lý Tưởng
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Áp suất riêng phần của cấu tử trong pha hơi tỉ lệ thuận với phần mol của nó trong pha lỏng:
              </p>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
                <div>P_A = x_A · P_A*(T)</div>
                <div>P_B = (1 - x_A) · P_B*(T)</div>
                <div>P_total = P_A + P_B = 760 mmHg (1 atm)</div>
                <div>y_A = P_A / P_total (Độ giàu cấu tử A trong pha hơi)</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Do cấu tử A có nhiệt độ sôi thấp hơn nên áp suất hơi bão hòa luôn lớn hơn (P_A* &gt; P_B*), dẫn tới y_A &gt; x_A. Pha hơi luôn giàu cấu tử dễ bay hơi hơn pha lỏng ban đầu!
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                🔢 Số Đĩa Lý Thuyết Fenske (Độ Tinh Khiết Sản Phẩm Đỉnh)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Độ Bay Hơi Tương Đối (α):</span>
                  <span className="text-lg font-mono font-bold text-amber-400">
                    {currentBoilingData?.vle.relativeVolatility || 2.4}
                  </span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Số Đĩa Lý Thuyết Tối Thiểu (N_min):</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">
                    {fenskePlates} Đĩa
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800 leading-relaxed">
                💡 <strong>Phương trình Fenske:</strong> Để chưng cất tách hỗn hợp thu được sản phẩm đỉnh đạt 98% và đáy còn 5% cần tối thiểu <strong>{fenskePlates} đĩa lý thuyết</strong>. Cột chưng cất Vigreux có gai nhọn bên trong đóng vai trò làm tăng diện tích tiếp xúc lỏng - hơi, tương đương với nhiều đĩa chưng cất đơn giản nối tiếp nhau.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DISTILLATION APPARATUS & AZEOTROPE */}
        {activeTab === 'distillation' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-lg font-bold">
                🌡️
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Quy Trình Chưng Cất Phân Đoạn & Bí Ẩn Điểm Đẳng Phí (Azeotrope)
                </h3>
                <p className="text-xs text-slate-400">
                  Ứng dụng trong chưng cất dầu mỏ, tinh chế cồn thực phẩm và tách dung môi hữu cơ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-cyan-300">1. Bình Cầu Đáy Tròn & Đá Bọt:</span>
                <p className="text-slate-400 leading-relaxed">
                  Đá bọt (hoặc bi thủy tinh) có các vi lỗ xốp chứa không khí giúp bọt khí hình thành êm dịu, chống hiện tượng quá nhiệt đột ngột gây sôi trào nguy hiểm.
                </p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-rose-300">2. Cột Chưng Cất Vigreux:</span>
                <p className="text-slate-400 leading-relaxed">
                  Hơi bốc lên gặp các ngạnh thủy tinh bị ngưng tụ một phần rồi lại bốc hơi bởi dòng hơi nóng đi sau, liên tục làm giàu cấu tử có nhiệt độ sôi thấp hơn về phía đỉnh cột.
                </p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-emerald-300">3. Ống Sinh Hàn Liebig:</span>
                <p className="text-slate-400 leading-relaxed">
                  Nguyên tắc chuẩn kỹ thuật GDPT: nước làm mát luôn chảy vào từ <strong>đầu dưới</strong> và thoát ra ở <strong>đầu trên</strong> để áo sinh hàn luôn ngập đầy nước làm mát.
                </p>
              </div>
            </div>

            {system.isAzeotropic && system.azeotropeData && (
              <div className="bg-rose-950/40 p-3.5 rounded-lg border border-rose-500/40 text-xs space-y-2">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <span>⚠️ Giới Hạn Của Điểm Đẳng Phí Sôi Cực Tiểu (Azeotrope):</span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Tại điểm đẳng phí ({system.azeotropeData.massFractionA * 100}% Etanol ở {system.azeotropeData.boilingPointC} °C), thành phần pha hơi hoàn toàn giống hệt pha lỏng (y_A = x_A). Do đó dù có tăng thêm bao nhiêu đĩa lý thuyết đi nữa, <strong>chưng cất phân đoạn thông thường không thể nâng độ cồn vượt quá 95.6%</strong>!
                </p>
                <p className="text-slate-400 text-[11px]">
                  Để điều chế cồn tuyệt đối 99.5%, các nhà hóa học dùng phương pháp chưng cất đẳng phí ba cấu tử với benzen hoặc dùng chất hút nước chọn lọc (rây phân tử Zeolite).
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STEAM DISTILLATION */}
        {activeTab === 'steam' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-lg font-bold">
                🌿
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Chưng Cất Lôi Cuốn Hơi Nước (Steam Distillation) Chiết Xuất Tinh Dầu
                </h3>
                <p className="text-xs text-slate-400">
                  Giải pháp đỉnh cao tách các hợp chất hữu cơ dễ bị phân hủy ở nhiệt độ cao mà không tan trong nước.
                </p>
              </div>
            </div>

            {steamData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Nhiệt Độ Sôi Của Hỗn Hợp</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                    {steamData.distillationTempC} °C
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Thấp hơn điểm sôi của nước!</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Nhiệt Độ Tránh Bị Phân Hủy (ΔT)</div>
                  <div className="text-xl font-mono font-bold text-cyan-400 mt-1">
                    -{steamData.waterSavedFromOverheatingC} °C
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Không bị cháy khét hương liệu</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Tỉ Lệ Tinh Dầu Trong Nước Ngưng</div>
                  <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                    {steamData.organicPercentInDistillate}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Tách dễ dàng bằng phễu chiết</div>
                </div>
              </div>
            )}

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-emerald-300">✨ Nguyên lý nhiệt động học bất biến:</span>
              <p className="leading-relaxed">
                Do tinh dầu (như limonen sôi ở 176 °C hay eugenol sôi ở 254 °C) hoàn toàn không tan trong nước, áp suất hơi của chúng độc lập hoàn toàn với nước. Hỗn hợp sôi khi tổng áp suất:
                <span className="font-mono text-cyan-300 block my-1">P_total = P_nước*(T) + P_dầu*(T) = 760 mmHg</span>
                Vì P_nước*(100°C) đã bằng 760 mmHg, nên chỉ cần nhiệt độ khoảng <strong>97 - 99 °C</strong> là tổng áp suất đã đạt 1 atm! Nhờ đó tinh dầu bay hơi sang ống ngưng ở nhiệt độ rất thấp mà không bị biến tính.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: CLAUSIUS-CLAPEYRON CALCULATOR */}
        {activeTab === 'clausius' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                🧮 Máy Tính Áp Suất Hơi Bão Hòa Clausius-Clapeyron
              </h3>
              <p className="text-xs text-slate-400">
                Tính toán áp suất hơi bão hòa P*(T) của các dung môi hữu cơ tại nhiệt độ bất kỳ theo phương trình nhiệt động Clausius-Clapeyron.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 block uppercase">Thông số đầu vào:</span>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nhiệt độ khảo sát (°C):</label>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="1"
                    value={customTempC}
                    onChange={(e) => setCustomTempC(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-300 mt-1">
                    <span>20 °C</span>
                    <span className="text-amber-400 font-bold">{customTempC} °C</span>
                    <span>120 °C</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Dung môi đang chọn: <strong className="text-white">{system.componentA.name} ({system.componentA.vietnameseName})</strong>
                  <div className="font-mono text-[11px] text-slate-500 mt-1">
                    T_b = {system.componentA.normalBoilingPointC} °C | ΔHvap = {system.componentA.deltaHvapKjPerMol} kJ/mol
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-center">
                <span className="text-xs font-bold text-cyan-400 block uppercase">Kết quả tính toán nhiệt động:</span>
                {(() => {
                  const tk = customTempC + 273.15;
                  const tbk = system.componentA.normalBoilingPointC + 273.15;
                  const deltaH_J = system.componentA.deltaHvapKjPerMol * 1000;
                  const pCc = calculateClausiusClapeyronVaporPressureMmHg(tk, tbk, deltaH_J);
                  const pAtm = pCc / 760.0;
                  return (
                    <div className="space-y-2">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <div className="text-[11px] text-slate-400">Áp suất hơi bão hòa P*:</div>
                        <div className="text-2xl font-mono font-bold text-cyan-400">
                          {pCc.toFixed(1)} <span className="text-xs text-slate-400">mmHg</span>
                        </div>
                        <div className="text-xs font-mono text-slate-400 mt-0.5">
                          = {pAtm.toFixed(3)} atm ({((pAtm * 101.325)).toFixed(1)} kPa)
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 italic">
                        {pCc >= 760 ? '🔥 Nhiệt độ này đã vượt quá nhiệt độ sôi ở áp suất khí quyển!' : '💧 Chất lỏng đang ở trạng thái chưa sôi dưới áp suất khí quyển.'}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
