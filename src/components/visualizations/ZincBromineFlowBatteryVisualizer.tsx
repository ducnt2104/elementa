// src/components/visualizations/ZincBromineFlowBatteryVisualizer.tsx
// Interactive Visualizer: Zinc-Bromine Redox Flow Battery (Zn-Br / ZBB) Two-Phase Polybromide Complexation System
// Standards: IUPAC Electrochemistry, Sand's Transition Time & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  Factory,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Gauge,
  Droplets,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Wind,
  Coins,
  Cpu,
  Flame,
  Thermometer,
  Layers2,
  RefreshCw
} from 'lucide-react';
import {
  ZN_BR_COMPLEXING_AGENTS,
  ZnBrComplexingAgentType,
  ZincBromineFlowBatteryEngine
} from '../../domain/zincBromineFlowBatteryEngine';
import { sound } from '../../audio/soundEngine';

type ZnBrTabMode =
  | 'POLYBROMIDE_PHASE_COMPLEXATION'
  | 'ZINC_DENDRITE_AND_STRIPPING'
  | 'SUBSTATION_GRID_PLANT';

export const ZincBromineFlowBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ZnBrTabMode>('POLYBROMIDE_PHASE_COMPLEXATION');

  // Interactive controls
  const [selectedAgent, setSelectedAgent] = useState<ZnBrComplexingAgentType>('MEP_BROMIDE');
  const [stateOfCharge, setStateOfCharge] = useState<number>(0.65); // 5% to 95%
  const [temperatureC, setTemperatureC] = useState<number>(25.0); // 15°C to 45°C
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(50.0); // 20 to 120 mA/cm2
  const [flowRateLMin, setFlowRateLMin] = useState<number>(4.0); // 1.0 to 10.0 L/min
  const [znBr2ConcM, setZnBr2ConcM] = useState<number>(2.5); // 2.0 to 3.5 M

  // Substation Plant Sizing
  const [plantPowerKw, setPlantPowerKw] = useState<number>(500.0); // 100 to 2,000 kW
  const [storageHours, setStorageHours] = useState<number>(4.0); // 2 to 12 h

  const currentAgent = ZN_BR_COMPLEXING_AGENTS[selectedAgent];

  // Engine Computations
  const operatingConditions = useMemo(() => ({
    complexingAgent: selectedAgent,
    stateOfCharge,
    temperatureC,
    currentDensityMaPerCm2: currentDensityMaCm2,
    electrolyteFlowRateLMin: flowRateLMin,
    znBr2SaltConcentrationMolar: znBr2ConcM,
    electrodeAreaCm2: 1000.0,
    membraneTypeVi: 'Daramic Microporous Polyolefin'
  }), [selectedAgent, stateOfCharge, temperatureC, currentDensityMaCm2, flowRateLMin, znBr2ConcM]);

  const electroResult = useMemo(() => {
    return ZincBromineFlowBatteryEngine.calculateElectrochemicalPerformance(operatingConditions);
  }, [operatingConditions]);

  const plantResult = useMemo(() => {
    return ZincBromineFlowBatteryEngine.designSubstationStoragePlant(
      plantPowerKw,
      storageHours,
      selectedAgent
    );
  }, [plantPowerKw, storageHours, selectedAgent]);

  // Polarization Curve Points (20 to 120 mA/cm2)
  const polarizationPoints = useMemo(() => {
    const points = [];
    for (let j = 20; j <= 120; j += 10) {
      const cond = { ...operatingConditions, currentDensityMaPerCm2: j };
      const res = ZincBromineFlowBatteryEngine.calculateElectrochemicalPerformance(cond);
      points.push({
        currentDensity: j,
        vDis: res.operatingDischargeVoltageV,
        vChg: res.operatingChargeVoltageV
      });
    }
    return points;
  }, [operatingConditions]);

  const handleModeChange = (mode: ZnBrTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const handleAgentSelect = (agent: ZnBrComplexingAgentType) => {
    sound.playUiClick();
    setSelectedAgent(agent);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-red-500/30 text-white shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-xl">
            <Droplets className="w-7 h-7 text-red-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                Pin Dòng Kẽm-Brom (Zn-Br / ZBB)
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono">
                Two-Phase Polybromide
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Phức chất dầu polybromide tỷ trọng cao (Q-Br), điện thế 1.84V và chu trình xả kiệt phục hồi gai kẽm 100% (GDPT 2018)
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => handleModeChange('POLYBROMIDE_PHASE_COMPLEXATION')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'POLYBROMIDE_PHASE_COMPLEXATION'
                ? 'bg-red-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Tạo Phức Dầu Polybromide</span>
          </button>
          <button
            onClick={() => handleModeChange('ZINC_DENDRITE_AND_STRIPPING')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'ZINC_DENDRITE_AND_STRIPPING'
                ? 'bg-red-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Mạ Kẽm & Chu Trình Stripping</span>
          </button>
          <button
            onClick={() => handleModeChange('SUBSTATION_GRID_PLANT')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeMode === 'SUBSTATION_GRID_PLANT'
                ? 'bg-red-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Trạm Lưu Trữ Phân Phối (500 kW)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Two-Phase Polybromide Complexation & Density Separation */}
      {activeMode === 'POLYBROMIDE_PHASE_COMPLEXATION' && (
        <div className="space-y-6">
          {/* Complexation Advantage Banner */}
          <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-red-200">
              <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong className="text-white">Cơ Chế Khóa Brom Độc Đáo:</strong> Brom lỏng tự do (Br₂) bốc khói độc hại được giữ chặt bởi muối amoni bậc 4 ({currentAgent.nameVi}), tạo pha dầu polybromide đỏ sẫm tỷ trọng cao ({currentAgent.polybromideOilDensityGPerCm3} g/cm³) tự chìm xuống đáy bể, giữ nồng độ Br₂ tự do trong nước &lt; {currentAgent.aqueousFreeBr2Ppm} ppm!
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[11px] shrink-0">
              Khóa &gt;{currentAgent.complexationEfficiencyPercent}% Br₂
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-red-400" />
                  Chất Tạo Phức & Mức Nạp
                </span>
                <span className="text-xs text-red-400 font-mono">SOC: {(stateOfCharge * 100).toFixed(0)}%</span>
              </div>

              {/* Complexing Agent Selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Hợp Chất Amoni Bậc 4 Tạo Phức (Q-Br)</label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(ZN_BR_COMPLEXING_AGENTS) as ZnBrComplexingAgentType[]).map((aKey) => {
                    const a = ZN_BR_COMPLEXING_AGENTS[aKey];
                    const isSelected = selectedAgent === aKey;
                    return (
                      <button
                        key={aKey}
                        onClick={() => handleAgentSelect(aKey)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'bg-red-950/60 border-red-500 text-red-200 shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{a.nameVi}</span>
                          <span className="font-mono text-[11px] text-red-400">
                            {a.complexationEfficiencyPercent}% Khóa Br₂
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {a.primaryAdvantagesVi}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SOC Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Trạng Thái Nạp Điện (SOC)</span>
                  <span className="font-semibold text-slate-200">{(stateOfCharge * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={stateOfCharge}
                  onChange={(e) => setStateOfCharge(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5% (Xả kiệt)</span>
                  <span>50% (Danh định)</span>
                  <span>95% (Nạp tối đa)</span>
                </div>
              </div>

              {/* Salt Concentration */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Nồng Độ Muối ZnBr₂ (M)</span>
                  <span className="font-semibold text-slate-200">{znBr2ConcM.toFixed(1)} M</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="3.5"
                  step="0.1"
                  value={znBr2ConcM}
                  onChange={(e) => setZnBr2ConcM(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Phase Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Tỷ Lệ Thể Tích Dầu Đỏ</div>
                  <div className="text-base font-bold font-mono text-red-400 mt-1">
                    {electroResult.polybromidePhaseSeparation.oilPhaseVolumePercent}%
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Br₂ Tự Do Trong Nước</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {electroResult.polybromidePhaseSeparation.aqueousFreeBromineConcentrationPpm} ppm
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic SVG Two-Phase Tank & Cell */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  Sơ Đồ Tuần Hoàn 2 Pha & Ngăn Pin Kẽm-Brom
                </span>
                <span className="text-xs font-mono text-red-300">
                  E°_cell = 1.84 V | OCV = {electroResult.openCircuitVoltageV.toFixed(3)} V
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 520 250" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Negative Anode Zinc Plating Tank */}
                  <rect x="25" y="45" width="85" height="150" rx="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
                  <text x="67" y="32" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="bold">Bể Kẽm (Zn²⁺)</text>
                  <text x="67" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                    Dung dịch ZnBr₂
                  </text>
                  <text x="67" y="132" textAnchor="middle" fill="#94A3B8" fontSize="9">Trong suốt</text>

                  {/* Positive Cathode Tank with 2-Phase Stratification */}
                  <rect x="410" y="45" width="85" height="150" rx="8" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
                  <text x="452" y="32" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontWeight="bold">Bể Brom (Q-Br)</text>

                  {/* Upper Aqueous Phase in Positive Tank */}
                  <rect x="412" y="47" width="81" height={146 - (electroResult.polybromidePhaseSeparation.oilPhaseVolumePercent * 1.2)} rx="6" fill="#F97316" opacity="0.65" />
                  <text x="452" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="9">Pha Nước</text>
                  <text x="452" y="105" textAnchor="middle" fill="#FEF08A" fontSize="8">&lt; 100 ppm Br₂</text>

                  {/* Bottom Dense Red Polybromide Oil Phase */}
                  {(() => {
                    const oilHeight = Math.max(15, electroResult.polybromidePhaseSeparation.oilPhaseVolumePercent * 1.2);
                    const oilY = 193 - oilHeight;
                    return (
                      <g>
                        <rect x="412" y={oilY} width="81" height={oilHeight} rx="4" fill="#991B1B" opacity="0.95" />
                        <text x="452" y={oilY + Math.min(20, oilHeight / 2 + 4)} textAnchor="middle" fill="#FECACA" fontSize="9" fontWeight="bold">
                          Dầu Polybromide
                        </text>
                        <text x="452" y={oilY + Math.min(32, oilHeight / 2 + 15)} textAnchor="middle" fill="#FCA5A5" fontSize="8">
                          (ρ = 2.38 g/cm³)
                        </text>
                      </g>
                    );
                  })()}

                  {/* Cell Stack in Center */}
                  <rect x="175" y="45" width="170" height="150" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                  
                  {/* Carbon Plastic Zinc Anode with plated layer */}
                  <rect x="185" y="55" width="15" height="130" fill="#475569" stroke="#94A3B8" />
                  <rect x="200" y="55" width={Math.max(4, stateOfCharge * 12)} height="130" fill="#E2E8F0" stroke="#94A3B8" />
                  <text x="210" y="125" textAnchor="middle" fill="#0F172A" fontSize="9" fontWeight="bold" transform="rotate(-90 210 125)">
                    Lớp Mạ Kẽm Zn⁰
                  </text>

                  {/* Microporous Daramic Membrane */}
                  <rect x="255" y="50" width="10" height="140" fill="#FBBF24" rx="1" />
                  <text x="260" y="40" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">Màng Daramic</text>

                  {/* Porous Carbon Felt Bromine Cathode */}
                  <rect x="280" y="55" width="55" height="130" fill="#7C2D12" opacity="0.85" stroke="#EA580C" strokeDasharray="3,3" />
                  <text x="307" y="125" textAnchor="middle" fill="#FED7AA" fontSize="10">Nỉ Carbon Br₂/Br⁻</text>

                  {/* Fluid circulation lines */}
                  <path d="M 110 80 L 185 80" stroke="#94A3B8" strokeWidth="3" fill="none" strokeDasharray="4,2" />
                  <path d="M 185 160 L 110 160" stroke="#94A3B8" strokeWidth="3" fill="none" strokeDasharray="4,2" />

                  <path d="M 410 160 L 335 160" stroke="#DC2626" strokeWidth="3" fill="none" strokeDasharray="4,2" />
                  <path d="M 335 80 L 410 80" stroke="#DC2626" strokeWidth="3" fill="none" strokeDasharray="4,2" />

                  {/* External Circuit */}
                  <path d="M 192 55 L 192 18 L 307 18 L 307 55" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  <circle cx="250" cy="18" r="10" fill="#0F172A" stroke="#FBBF24" strokeWidth="2" />
                  <text x="250" y="22" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">e⁻</text>
                </svg>
              </div>

              {/* Chemical Equations Card */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Cực Âm (-):</span>
                  <span>Zn²⁺ + 2e⁻ ⇌ Zn⁰(s) (E° = -0.76 V vs SHE)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-red-400">Cực Dương (+):</span>
                  <span>2 Br⁻ ⇌ Br₂ + 2e⁻ + Q⁺ → Q[Br₃]⁻ (E° = +1.08 V vs SHE)</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1 flex justify-between items-center text-emerald-300 font-bold">
                  <span>Toàn Phần:</span>
                  <span>Zn²⁺ + 2 Br⁻ ⇌ Zn(s) + Br₂ (E° = 1.84 V)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Zinc Electrodeposition, Sand's Time & 100% DOD Stripping */}
      {activeMode === 'ZINC_DENDRITE_AND_STRIPPING' && (
        <div className="space-y-6">
          {/* Dendrite Safety Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'SAFE_FLAT_PLATING'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'MILD_ROUGHNESS'
                ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                : 'bg-rose-950/60 border-rose-500 text-rose-200'
            }`}
          >
            {electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'SAFE_FLAT_PLATING' ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'MILD_ROUGHNESS' ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'SAFE_FLAT_PLATING'
                    ? 'BỀ MẶT MẠ KẼM PHẲNG MỊN AN TOÀN (SAFE FLAT PLATING)'
                    : electroResult.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'MILD_ROUGHNESS'
                    ? 'CẢNH BÁO BẮT ĐẦU NHÁM BỀ MẶT KẼM'
                    : 'NGUY CƠ ĐÂM XUYÊN MÀNG DO GAI NHỌN (DENDRITE ALERT)'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono">
                  Thời Gian Chuyển Tiếp Sand: τ = {electroResult.zincMorphologyAndDendriteSafety.sandsTransitionTimeSeconds} s
                </span>
              </div>
              <p className="text-xs opacity-90">
                Quy trình hồi sinh 100% DOD: Cứ sau {electroResult.zincMorphologyAndDendriteSafety.recommendedRejuvenationStrippingIntervalCycles} chu kỳ, hệ thống tự động xả kiệt hoàn toàn về 0V (Stripping Cycle) để hòa tan 100% lượng kẽm còn sót lại, đưa tế bào về trạng thái mới ban đầu và triệt tiêu vĩnh viễn nguy cơ tích tụ gai nhọn!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-red-400" />
                  Mật Độ Dòng & Vận Tốc Dòng Chảy
                </span>
                <span className="text-xs text-red-400 font-mono">
                  {electroResult.powerDensityMwPerCm2} mW/cm²
                </span>
              </div>

              {/* Current Density */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mật Độ Dòng Điện (mA/cm²)</span>
                  <span className="font-semibold text-slate-200">{currentDensityMaCm2.toFixed(0)} mA/cm²</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={currentDensityMaCm2}
                  onChange={(e) => setCurrentDensityMaCm2(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>20 mA/cm² (An toàn tuyệt đối)</span>
                  <span>50 mA/cm² (Danh định)</span>
                  <span>120 mA/cm² (Nguy cơ gai)</span>
                </div>
              </div>

              {/* Flow Rate */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Lưu Lượng Tuần Hoàn Điện Giải (L/phút)</span>
                  <span className="font-semibold text-slate-200">{flowRateLMin.toFixed(1)} L/min</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={flowRateLMin}
                  onChange={(e) => setFlowRateLMin(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Readouts */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Điện Áp Xả (V_dis)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {electroResult.operatingDischargeVoltageV} V
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Điện Áp Nạp (V_chg)</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {electroResult.operatingChargeVoltageV} V
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Dòng Giới Hạn (J_lim)</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-1">
                    {electroResult.zincMorphologyAndDendriteSafety.limitingCurrentDensityMaPerCm2} mA/cm²
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Hiệu Suất Vòng Lặp (RTE)</div>
                  <div className="text-base font-bold font-mono text-red-400 mt-1">
                    {electroResult.roundTripEfficiencyPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: V-I Curve */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  Đường Cong Nạp - Xả (Charge / Discharge Voltage)
                </span>
                <span className="text-xs font-mono text-red-400 font-semibold">
                  ΔV = {(electroResult.operatingChargeVoltageV - electroResult.operatingDischargeVoltageV).toFixed(3)} V
                </span>
              </div>

              {/* SVG Curve */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto rounded-xl bg-slate-950/70 p-2 border border-slate-800">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />

                  {/* Y Axis labels (Voltage V) */}
                  <text x="42" y="25" textAnchor="end" fill="#EF4444" fontSize="10">2.2 V (Nạp)</text>
                  <text x="42" y="90" textAnchor="end" fill="#FBBF24" fontSize="10">1.84 V (OCV)</text>
                  <text x="42" y="150" textAnchor="end" fill="#10B981" fontSize="10">1.5 V (Xả)</text>

                  {/* X Axis labels (Current Density mA/cm2) */}
                  <text x="50" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">20</text>
                  <text x="190" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">50</text>
                  <text x="330" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">80</text>
                  <text x="460" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">120 mA/cm²</text>

                  {/* Generate Paths */}
                  {(() => {
                    const minV = 1.30;
                    const maxV = 2.30;
                    const minJ = 20;
                    const maxJ = 120;

                    const getX = (j: number) => 50 + ((j - minJ) / (maxJ - minJ)) * 410;
                    const getY = (v: number) => 180 - ((v - minV) / (maxV - minV)) * 160;

                    const pathDis = polarizationPoints
                      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.currentDensity)} ${getY(p.vDis)}`)
                      .join(' ');

                    const pathChg = polarizationPoints
                      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.currentDensity)} ${getY(p.vChg)}`)
                      .join(' ');

                    const currentX = getX(currentDensityMaCm2);

                    return (
                      <g>
                        {/* Charge Curve */}
                        <path d={pathChg} fill="none" stroke="#EF4444" strokeWidth="2.5" />
                        {/* Discharge Curve */}
                        <path d={pathDis} fill="none" stroke="#10B981" strokeWidth="2.5" />

                        {/* Current Points */}
                        <circle cx={currentX} cy={getY(electroResult.operatingChargeVoltageV)} r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx={currentX} cy={getY(electroResult.operatingDischargeVoltageV)} r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                        <line x1={currentX} y1="20" x2={currentX} y2="180" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3,3" />

                        <text x={currentX + 8} y={getY(electroResult.operatingChargeVoltageV) - 6} fill="#FCA5A5" fontSize="9" fontWeight="bold">
                          {electroResult.operatingChargeVoltageV} V (Nạp)
                        </text>
                        <text x={currentX + 8} y={getY(electroResult.operatingDischargeVoltageV) + 14} fill="#A7F3D0" fontSize="9" fontWeight="bold">
                          {electroResult.operatingDischargeVoltageV} V (Xả)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-red-400">Động Học Kẽm:</span> Quá thế chuyển điện tích cực kẽm rất nhỏ (j₀ ≈ 15 mA/cm²). Việc kiểm soát lưu lượng dòng chảy trên 3 L/phút loại bỏ vùng nghèo ion Zn²⁺ sát bề mặt điện cực, giữ dòng thực tế luôn thấp hơn dòng giới hạn Limiting Current.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Commercial Substation LDES Plant */}
      {activeMode === 'SUBSTATION_GRID_PLANT' && (
        <div className="space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quy Mô Trạm Phân Phối ZBB:</span>
            {[
              { label: '250 kW / 1 MWh (4h Cụm Công Nghiệp)', kw: 250, h: 4 },
              { label: '500 kW / 2 MWh (4h Trạm Biến Áp Chuẩn)', kw: 500, h: 4 },
              { label: '1,000 kW / 6 MWh (6h Peaker Tối)', kw: 1000, h: 6 },
              { label: '2,000 kW / 16 MWh (8h Lưới Đảo Độc Lập)', kw: 2000, h: 8 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  sound.playUiClick();
                  setPlantPowerKw(preset.kw);
                  setStorageHours(preset.h);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  plantPowerKw === preset.kw && storageHours === preset.h
                    ? 'bg-red-500/20 border-red-500 text-red-300 font-semibold'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders */}
            <div className="lg:col-span-5 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-red-400" />
                  Dung Lượng Trạm Zn-Br
                </span>
                <span className="text-xs text-red-400 font-mono">
                  {plantResult.totalCapacityKwh} kWh
                </span>
              </div>

              {/* Power Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Công Suất Danh Định (kW)</span>
                  <span className="font-semibold text-slate-200">{plantPowerKw} kW</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={plantPowerKw}
                  onChange={(e) => setPlantPowerKw(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Duration Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Thời Gian Xả Sâu (Giờ)</span>
                  <span className="font-semibold text-slate-200">{storageHours} Giờ</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={storageHours}
                  onChange={(e) => setStorageHours(parseFloat(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Economics */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Suất Đầu Tư (CapEx / kWh):</span>
                  <span className="font-bold font-mono text-emerald-400">${plantResult.capitalCostPerKwhUsd} / kWh</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Số Cụm Module Stack:</span>
                  <span className="font-mono text-slate-300">{plantResult.stackModuleCount} Cụm</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tuổi Thọ Vòng Lặp (Có Stripping):</span>
                  <span className="font-mono text-emerald-400">&gt; {plantResult.cycleLifeWithStrippingLimit.toLocaleString()} chu kỳ</span>
                </div>
                <div className="border-t border-slate-700/60 pt-1.5 flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Tổng Vốn Đầu Tư (CapEx):</span>
                  <span className="font-mono text-cyan-400">${(plantResult.totalCapExUsd / 1000).toFixed(0)}k USD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Inventory & Decarbonization */}
            <div className="lg:col-span-7 bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-400" />
                  Định Mức Kẽm, Brom & Giảm CO₂
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
                  RTE: {plantResult.systemRoundTripEfficiencyPercent}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Khối Lượng Kẽm Hoạt Tính</div>
                  <div className="text-lg font-bold font-mono text-slate-300 mt-1">
                    {plantResult.totalZincInventoryKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Kim loại giá rẻ</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Khối Lượng Brom</div>
                  <div className="text-lg font-bold font-mono text-red-400 mt-1">
                    {plantResult.totalBromineInventoryKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Khóa trong pha dầu</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Thể Tích Dung Dịch ZnBr₂</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                    {plantResult.totalElectrolyteVolumeLiters.toLocaleString()} L
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Bể nhựa HDPE</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 sm:col-span-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Giảm Phát Thải CO₂ Thay Thế Điện Khí Peaker</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        {plantResult.avoidedPeakerCo2TonsPerYear.toLocaleString()} tấn CO₂/năm
                      </div>
                    </div>
                    <div className="p-2.5 bg-red-500/20 rounded-xl border border-red-500/40">
                      <Wind className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Longevity & Safety Highlights */}
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="font-semibold text-red-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Ưu Điểm Của Pin Dòng Kẽm-Brom (Redflow ZBM3):
                </div>
                <p>
                  1. <span className="font-semibold text-white">Xả Sâu 100% DOD Không Hại Pin:</span> Khác với Lithium-ion (suy giảm khi xả kiệt), pin Zn-Br đòi hỏi phải xả kiệt về 0V định kỳ để hòa tan sạch lớp mạ kẽm, tự làm mới bề mặt điện cực 100%.
                </p>
                <p>
                  2. <span className="font-semibold text-white">An Toàn Cháy Nổ Gốc Nước:</span> Dung dịch điện giải nước kẽm bromua không bắt lửa, thích hợp đặt cạnh các trạm viễn thông hoặc trạm điện phân phối nội đô.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
