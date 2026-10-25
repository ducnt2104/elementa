// src/components/visualizations/SoecSabatierPowerToGasVisualizer.tsx
// Interactive Visualizer: SOEC-Sabatier Power-to-Gas (PtG) & Carbon Circularity System
// Standards: High-Temperature Steam Electrolysis (SOEC 800°C), Catalytic Sabatier Methanation, IUPAC Physical Chemistry

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Gauge,
  Factory,
  Droplets,
  Wind,
  CheckCircle2,
  RefreshCw,
  Sun
} from 'lucide-react';
import {
  calculateSoecStackMetrics,
  calculatePtGPlantPerformance,
  getPtGTechnologyComparisons,
  CO2_SOURCE_CATALOG
} from '../../domain/soecSabatierPowerToGasEngine';
import { sound } from '../../audio/soundEngine';

type PtGTabMode =
  | 'SOEC_SABATIER_THERMAL_COUPLING_FLOW'
  | 'ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION'
  | 'CARBON_CIRCULARITY_AND_GRID_INJECTION';

export const SoecSabatierPowerToGasVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PtGTabMode>('SOEC_SABATIER_THERMAL_COUPLING_FLOW');

  // Interactive Controls
  const [electricalInputMWe, setElectricalInputMWe] = useState<number>(10.0);
  const [soecTemperatureC, setSoecTemperatureC] = useState<number>(800.0);
  const [sabatierPressureBar, setSabatierPressureBar] = useState<number>(15.0);
  const [heatRecoveryEffectiveness, setHeatRecoveryEffectiveness] = useState<number>(0.88);
  const [co2SourceKey, setCo2SourceKey] = useState<keyof typeof CO2_SOURCE_CATALOG>('BIOGAS_UPGRADING');
  const [inspectedUnit, setInspectedUnit] = useState<'SOEC_STACK' | 'SABATIER_REACTOR' | 'HEAT_RECUPERATOR' | 'GAS_SEPARATOR'>('SOEC_STACK');

  // Performance calculations
  const performance = useMemo(() => {
    return calculatePtGPlantPerformance({
      electricalInputMWe,
      soecTemperatureC,
      sabatierPressureBar,
      heatRecoveryEffectiveness,
      co2SourceType: co2SourceKey
    });
  }, [electricalInputMWe, soecTemperatureC, sabatierPressureBar, heatRecoveryEffectiveness, co2SourceKey]);

  const soecMetrics = useMemo(() => {
    return calculateSoecStackMetrics(soecTemperatureC, 1.28);
  }, [soecTemperatureC]);

  const benchmarks = useMemo(() => {
    return getPtGTechnologyComparisons();
  }, []);

  const handleModeChange = (mode: PtGTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectricalInputMWe(10.0);
    setSoecTemperatureC(800.0);
    setSabatierPressureBar(15.0);
    setHeatRecoveryEffectiveness(0.88);
    setCo2SourceKey('BIOGAS_UPGRADING');
    setInspectedUnit('SOEC_STACK');
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Công Nghệ Power-to-Gas (PtG) Đỉnh Cao
              </span>
              <span className="text-xs text-slate-400">Hiệu Suất &gt; 80% (Nhiệt Tích Hợp)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Hệ Thống Điện Phân SOEC 800°C Tích Hợp Sabatier Tổng Hợp e-Metan
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Mặc Định
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        <button
          onClick={() => handleModeChange('SOEC_SABATIER_THERMAL_COUPLING_FLOW')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'SOEC_SABATIER_THERMAL_COUPLING_FLOW'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          1. Sơ Đồ Khép Kín Tích Hợp Nhiệt
        </button>

        <button
          onClick={() => handleModeChange('ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          2. Hiệu Suất PtG 80.6% & Năng Lượng
        </button>

        <button
          onClick={() => handleModeChange('CARBON_CIRCULARITY_AND_GRID_INJECTION')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'CARBON_CIRCULARITY_AND_GRID_INJECTION'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Wind className="w-4 h-4" />
          3. Kinh Tế Carbon & Lưới Khí e-CH₄
        </button>
      </div>

      {/* MODE 1: SOEC SABATIER FLOWSHEET */}
      {activeMode === 'SOEC_SABATIER_THERMAL_COUPLING_FLOW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main SVG Flowsheet */}
          <div className="lg:col-span-8 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Dây Chuyền Tích Hợp Nhiệt Tự Cấp (Sabatier Exothermic ➔ SOEC Steam)
              </h3>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                Tự Cấp 100% Nhiệt Bay Hơi Nước
              </span>
            </div>

            <div className="w-full bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 760 380" className="w-full h-auto max-h-[380px]">
                {/* Guidelines */}
                <rect x="10" y="10" width="740" height="360" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

                {/* 1. SOEC ELECTROLYZER STACK */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setInspectedUnit('SOEC_STACK'); }}
                >
                  <rect
                    x="50"
                    y="50"
                    width="260"
                    height="130"
                    rx="12"
                    fill={inspectedUnit === 'SOEC_STACK' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedUnit === 'SOEC_STACK' ? '#10b981' : '#334155'}
                    strokeWidth={inspectedUnit === 'SOEC_STACK' ? 2.5 : 1.5}
                  />
                  <circle cx="80" cy="80" r="14" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                  <text x="80" y="85" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">1</text>
                  <text x="105" y="80" fill="#ffffff" fontSize="13" fontWeight="bold">Điện Phân SOEC ({soecTemperatureC}°C)</text>
                  <text x="105" y="100" fill="#94a3b8" fontSize="10">H₂O(g) → H₂(g) + 1/2 O₂(g)</text>
                  <text x="105" y="120" fill="#10b981" fontSize="9" fontWeight="bold">Thế nhiệt trung hòa: 1.28 V</text>
                  <rect x="65" y="135" width="230" height="20" rx="4" fill="#10b981" fillOpacity="0.1" />
                  <text x="180" y="148" textAnchor="middle" fill="#34d399" fontSize="9">Hiệu suất điện năng stack: 98% LHV</text>
                </g>

                {/* Pure Oxygen stream out of SOEC */}
                <path d="M 180 50 L 180 20" stroke="#38bdf8" strokeWidth="2.5" />
                <polygon points="180,20 176,28 184,28" fill="#38bdf8" />
                <text x="190" y="32" fill="#38bdf8" fontSize="10" fontWeight="bold">↑ Khí Oxy (O₂) Tinh Khiết</text>

                {/* 2. CATALYTIC SABATIER REACTOR */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setInspectedUnit('SABATIER_REACTOR'); }}
                >
                  <rect
                    x="450"
                    y="50"
                    width="260"
                    height="130"
                    rx="12"
                    fill={inspectedUnit === 'SABATIER_REACTOR' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedUnit === 'SABATIER_REACTOR' ? '#f59e0b' : '#334155'}
                    strokeWidth={inspectedUnit === 'SABATIER_REACTOR' ? 2.5 : 1.5}
                  />
                  <circle cx="480" cy="80" r="14" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="480" y="85" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">2</text>
                  <text x="505" y="80" fill="#ffffff" fontSize="13" fontWeight="bold">Phản Ứng Sabatier (340°C)</text>
                  <text x="505" y="100" fill="#94a3b8" fontSize="10">CO₂ + 4H₂ ⇌ CH₄ + 2H₂O</text>
                  <text x="505" y="120" fill="#f59e0b" fontSize="9" fontWeight="bold">ΔH = -165 kJ/mol (Tỏa nhiệt mạnh)</text>
                  <rect x="465" y="135" width="230" height="20" rx="4" fill="#f59e0b" fillOpacity="0.1" />
                  <text x="580" y="148" textAnchor="middle" fill="#fbbf24" fontSize="9">Áp suất: {sabatierPressureBar} bar | Xúc tác Ni-Ru</text>
                </g>

                {/* CO2 Ingestion Feed to Sabatier */}
                <path d="M 580 20 L 580 50" stroke="#a78bfa" strokeWidth="2.5" />
                <polygon points="580,50 576,42 584,42" fill="#a78bfa" />
                <text x="590" y="32" fill="#c084fc" fontSize="10" fontWeight="bold">↓ Khí CO₂ Thu Hồi</text>

                {/* Flow from SOEC H2 to Sabatier */}
                <path d="M 310 115 L 450 115" stroke="#10b981" strokeWidth="3" />
                <polygon points="450,115 442,111 442,119" fill="#10b981" />
                <text x="380" y="108" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">H₂ (Khí Hydro)</text>

                {/* 3. HEAT RECUPERATOR (EXOTHERMIC RETURN) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setInspectedUnit('HEAT_RECUPERATOR'); }}
                >
                  <rect
                    x="250"
                    y="220"
                    width="260"
                    height="110"
                    rx="12"
                    fill={inspectedUnit === 'HEAT_RECUPERATOR' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedUnit === 'HEAT_RECUPERATOR' ? '#ef4444' : '#334155'}
                    strokeWidth={inspectedUnit === 'HEAT_RECUPERATOR' ? 2.5 : 1.5}
                  />
                  <circle cx="280" cy="250" r="14" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="280" y="255" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">3</text>
                  <text x="305" y="250" fill="#ffffff" fontSize="13" fontWeight="bold">Bộ Thu Hồi Nhiệt Sabatier</text>
                  <text x="305" y="270" fill="#94a3b8" fontSize="10">Tái sinh {performance.heatRecuperatedFromSabatierMWth} MWth nhiệt tỏa</text>
                  <text x="305" y="290" fill="#ef4444" fontSize="9" fontWeight="bold">Cấp 100% hơi nước 250°C cho SOEC</text>
                  <rect x="265" y="300" width="230" height="18" rx="4" fill="#ef4444" fillOpacity="0.1" />
                  <text x="380" y="312" textAnchor="middle" fill="#f87171" fontSize="9">Nhiệt ngoài cần bổ sung: 0 MWth</text>
                </g>

                {/* Exothermic Heat Return Loop from Sabatier to Recuperator */}
                <path d="M 580 180 L 580 275 L 510 275" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                <polygon points="510,275 518,271 518,279" fill="#ef4444" />
                <text x="590" y="235" fill="#f87171" fontSize="9" fontWeight="bold">Nhiệt tỏa (-165 kJ/mol)</text>

                {/* Steam Generation Flow from Recuperator to SOEC */}
                <path d="M 250 275 L 180 275 L 180 180" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <polygon points="180,180 176,188 184,188" fill="#06b6d4" />
                <text x="140" y="235" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Hơi Nước Quá Nhiệt (Feed)</text>

                {/* 4. GAS SEPARATOR & DRYER (Bottom Right) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setInspectedUnit('GAS_SEPARATOR'); }}
                >
                  <rect
                    x="560"
                    y="220"
                    width="150"
                    height="110"
                    rx="12"
                    fill={inspectedUnit === 'GAS_SEPARATOR' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedUnit === 'GAS_SEPARATOR' ? '#84cc16' : '#334155'}
                    strokeWidth={inspectedUnit === 'GAS_SEPARATOR' ? 2.5 : 1.5}
                  />
                  <text x="635" y="250" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Tách Ẩm & Khí</text>
                  <text x="635" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">Ngưng tụ H₂O</text>
                  <text x="635" y="290" textAnchor="middle" fill="#84cc16" fontSize="10" fontWeight="bold">CH₄ &gt; 98%</text>
                  <rect x="575" y="300" width="120" height="18" rx="4" fill="#84cc16" fillOpacity="0.1" />
                  <text x="635" y="312" textAnchor="middle" fill="#a3e635" fontSize="9">Chuẩn Lưới Khí</text>
                </g>

                {/* Flow from Sabatier to Separator */}
                <path d="M 680 180 L 680 220" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="680,220 676,212 684,212" fill="#f59e0b" />

                {/* Pure Synthetic Natural Gas (e-Methane) Out to Grid */}
                <path d="M 635 330 L 635 365" stroke="#84cc16" strokeWidth="3" />
                <polygon points="635,365 631,357 639,357" fill="#84cc16" />
                <text x="635" y="356" textAnchor="middle" fill="#84cc16" fontSize="11" fontWeight="bold">↓ e-Metan Bơm Lưới (CH₄)</text>
              </svg>
            </div>

            {/* Inspection Detail Card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/60 flex flex-col gap-2">
              {inspectedUnit === 'SOEC_STACK' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-emerald-300">
                      Ngăn Điện Phân Hơi Nước Nhiệt Độ Cao (SOEC 800°C)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      YSZ Electrolyte (O²⁻ transport)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ở 800°C, năng lượng tự do Gibbs (ΔG) giảm mạnh so với điện phân nước thường, cho phép một phần lớn năng lượng phân ly liên kết H-O được cung cấp bởi nhiệt năng. Hiệu suất điện năng của stack đạt gần 100% LHV.
                  </p>
                  <div className="flex gap-4 text-xs text-slate-400 pt-1">
                    <span>Điện thế tế bào: <strong className="text-slate-100">1.28 V</strong></span>
                    <span>Suất tiêu thụ điện: <strong className="text-slate-100">{soecMetrics.specificElectricityKWhPerNm3H2} kWh/Nm³ H₂</strong></span>
                  </div>
                </>
              )}

              {inspectedUnit === 'SABATIER_REACTOR' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-amber-300">
                      Lò Phản Ứng Metan Hóa Xúc Tác Sabatier (340°C, {sabatierPressureBar} bar)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Xúc Tác Ni-Ru / γ-Al₂O₃
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Phản ứng phát nhiệt cực mạnh (ΔH = -165 kJ/mol). Áp suất 15 bar thúc đẩy cân bằng hóa học theo nguyên lý Le Chatelier chuyển dịch hoàn toàn về phía tạo sản phẩm metan với độ chọn lọc &gt; 99.2%.
                  </p>
                  <div className="flex gap-4 text-xs text-slate-400 pt-1">
                    <span>Tốc độ sinh CH₄: <strong className="text-slate-100">{performance.methaneProductionKgPerHour} kg/h ({performance.methaneProductionNm3PerHour} Nm³/h)</strong></span>
                    <span>Tốc độ tiêu thụ CO₂: <strong className="text-slate-100">{performance.co2ConsumptionKgPerHour} kg/h</strong></span>
                  </div>
                </>
              )}

              {inspectedUnit === 'HEAT_RECUPERATOR' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-rose-300">
                      Thiết Bị Trao Đổi Nhiệt Tích Hợp Exothermic (Tự Cấp Nhiệt)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Pinch Heat Exchanger ({performance.heatRecuperatedFromSabatierMWth} MWth)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Điểm mấu chốt kỹ thuật: Thay vì thải bỏ nhiệt tỏa của phản ứng Sabatier ra tháp làm mát như ở công nghệ PEM cũ, nhiệt tỏa này được thu hồi ở 340°C để tạo hơi nước quá nhiệt cung cấp trực tiếp cho SOEC, triệt tiêu hoàn toàn nhu cầu dùng điện đun nước.
                  </p>
                </>
              )}

              {inspectedUnit === 'GAS_SEPARATOR' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-lime-300">
                      Ngăn Ngưng Tụ Nước & Kiểm Soát Chuẩn Lưới Khí Đốt
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      EN 16726 Standard Compliant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Khí metan tổng hợp sau khi ngưng tụ tách nước đạt độ tinh khiết {performance.methanePurityVolPercent}%, chỉ số Wobbe {performance.wobbeIndexMJPerNm3} MJ/Nm³, sẵn sàng bơm thẳng vào đường ống khí đốt quốc gia mà không cần cải tạo hạ tầng.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Metrics Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Chỉ Số Vận Hành Trạm {electricalInputMWe} MWe
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-1">Hiệu Suất Hệ Thống: {performance.powerToGasEfficiencyLhvPercent}% LHV</div>
                  <p className="text-slate-300">
                    Vượt xa các công nghệ PEM-PtG (57%) và Alkaline-PtG (53%) nhờ cơ chế tận dụng triệt để nhiệt tỏa Sabatier.
                  </p>
                </div>

                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <div className="font-bold text-cyan-300 mb-1">Sản Lượng e-Metan: {performance.methaneProductionTonsPerYear.toLocaleString()} tấn/năm</div>
                  <p className="text-slate-300">
                    Tương đương {((performance.methaneProductionNm3PerHour * 8000) / 1e6).toFixed(2)} triệu m³ khí thiên nhiên thay thế hóa thạch mỗi năm.
                  </p>
                </div>

                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="font-bold text-purple-300 mb-1">Hấp Thụ Carbon: {performance.co2ConsumptionTonsPerYear.toLocaleString()} tấn CO₂/năm</div>
                  <p className="text-slate-300">
                    Khép kín vòng tuần hoàn carbon bền vững không gia tăng nồng độ khí nhà kính.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Injection Spec Box */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tiêu Chuẩn Lưới Khí EN 16726</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-emerald-400">{performance.methanePurityVolPercent}%</div>
                  <div className="text-[10px] text-slate-400">Độ Tinh Khiết CH₄</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-amber-400">{performance.wobbeIndexMJPerNm3}</div>
                  <div className="text-[10px] text-slate-400">Wobbe (MJ/Nm³)</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                <span>Nhiệt trị cao (HHV):</span>
                <span className="font-bold text-cyan-400">{performance.higherHeatingValueMJPerNm3} MJ/Nm³</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Tương thích đường ống:</span>
                <span className="font-bold text-emerald-400">100% Drop-In Gas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: EFFICIENCY & HEAT INTEGRATION */}
      {activeMode === 'ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-5 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Điều Chỉnh Công Suất & Nhiệt Độ Vận Hành
            </h3>

            {/* Slider: Electrical Input Power */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Công Suất Điện Cấp Cho Trạm (MWe)</label>
                <span className="text-sm font-mono font-bold text-emerald-400">{electricalInputMWe} MWe</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={electricalInputMWe}
                onChange={(e) => setElectricalInputMWe(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 MWe (Mô-đun thí nghiệm)</span>
                <span>10 MWe (Thương mại công nghiệp)</span>
                <span>50 MWe (Cụm nhà máy khu vực)</span>
              </div>
            </div>

            {/* Slider: SOEC Operating Temperature */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Nhiệt Độ Hoạt Động Stack SOEC (°C)</label>
                <span className="text-sm font-mono font-bold text-amber-400">{soecTemperatureC}°C</span>
              </div>
              <input
                type="range"
                min="750"
                max="850"
                step="5"
                value={soecTemperatureC}
                onChange={(e) => setSoecTemperatureC(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>750°C (Tuổi thọ màng cao)</span>
                <span>800°C (Chuẩn tối ưu)</span>
                <span>850°C (Mật độ dòng tối đa)</span>
              </div>
            </div>

            {/* Efficiency Comparison Bar Chart */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-300">So Sánh Hiệu Suất Hệ Thống Power-to-Gas (PtG):</span>

              <div className="space-y-3">
                {benchmarks.map((b, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={b.technologyName.includes('SOEC') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        {b.vietnameseName}
                      </span>
                      <span className="font-mono font-bold text-slate-200">{b.systemEfficiencyPtGPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          b.technologyName.includes('SOEC') ? 'bg-emerald-500' : 'bg-slate-600'
                        }`}
                        style={{ width: `${b.systemEfficiencyPtGPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Details Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              Chi Tiết Kỹ Thuật Công Nghệ So Sánh
            </h3>

            <div className="space-y-3 text-xs">
              {benchmarks.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border ${
                    b.technologyName.includes('SOEC')
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-300">{b.technologyName}</span>
                    <span className="font-mono text-emerald-400 font-bold">{b.systemEfficiencyPtGPercent}% PtG</span>
                  </div>
                  <div className="text-slate-400 text-[11px] space-y-1 mt-1">
                    <div>Nhu cầu hơi nước ngoài: <span className="text-slate-200">{b.externalSteamHeatRequired}</span></div>
                    <div>Chất lượng khí: <span className="text-slate-200">{b.productGasQuality}</span></div>
                    <div>Suất đầu tư CapEx: <span className="text-slate-200">${b.capitalCostUSDPerKWe}/kWe</span></div>
                    <div>Giá thành e-metan quy dẫn: <span className="text-emerald-400 font-bold">${b.levelizedCostOfMethaneUSDPerMWh}/MWh</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: CARBON CIRCULARITY & GRID INJECTION */}
      {activeMode === 'CARBON_CIRCULARITY_AND_GRID_INJECTION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CO2 Sources Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wind className="w-5 h-5 text-purple-400" />
              Nguồn Cung Cấp CO₂ Thu Hồi (Carbon Capture)
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {(Object.keys(CO2_SOURCE_CATALOG) as (keyof typeof CO2_SOURCE_CATALOG)[]).map((key) => {
                const src = CO2_SOURCE_CATALOG[key];
                return (
                  <div
                    key={key}
                    onClick={() => {
                      sound.playUiClick();
                      setCo2SourceKey(key);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      co2SourceKey === key
                        ? 'bg-purple-500/15 border-purple-500 text-white shadow-md shadow-purple-950/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-purple-300">{src.vietnameseName}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">${src.captureCostUSDPerTon}/t CO₂</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                      <span>Nguồn: {src.source}</span>
                      <span className="text-purple-300 font-semibold">Tương thích trực tiếp</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-purple-300">Tác Động Giảm Phát Thải: </strong>
              Khi kết hợp với thu hồi trực tiếp từ khí quyển (DAC) hoặc khí thải sinh học (Biogas), e-metan tạo thành là nhiên liệu trung hòa carbon 100%, cho phép lưu trữ năng lượng tái tạo theo mùa (hàng tháng trời) mà pin Lithium không thể đáp ứng.
            </div>
          </div>

          {/* Infrastructure Compatibility & Gas Grid */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Factory className="w-5 h-5 text-emerald-400" />
              Lợi Thế Drop-In Hạ Tầng So Với Hydro Nguyên Chất
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="font-bold text-emerald-300 mb-1">Mật Độ Năng Lượng Thể Tích Gấp 3 Lần Hydro</div>
                <p className="text-slate-300 leading-relaxed">
                  Metan (CH₄) có nhiệt trị thể tích 35.8 MJ/Nm³, cao gấp hơn 3 lần so với Hydro (10.8 MJ/Nm³), cho phép vận chuyển gấp 3 lần năng lượng trên cùng một đường ống khí đốt hiện hữu.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="font-bold text-amber-300 mb-1">Không Giòn Kim Loại & Không Rò Rỉ Mối Nối</div>
                <p className="text-slate-300 leading-relaxed">
                  Phân tử Hydro siêu nhỏ dễ thâm nhập mạng tinh thể thép gây giòn nứt (hydrogen embrittlement). Phân tử e-Metan tương thích 100% với toàn bộ mạng lưới đường ống, máy nén khí, và hang muối ngầm ngàn tỷ đô la sẵn có.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="font-bold text-cyan-300 mb-1">Tích Trữ Năng Lượng Liên Mùa (TWh Scale)</div>
                <p className="text-slate-300 leading-relaxed">
                  e-Metan tổng hợp vào mùa hè từ điện mặt trời dư thừa có thể bơm xuống các mỏ khí cạn kiệt hoặc hang muối ngầm để dùng phát điện vào mùa đông lạnh giá, giải quyết trọn vẹn bài toán gián đoạn năng lượng tái tạo dài hạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
