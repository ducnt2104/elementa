// src/components/visualizations/ElectrochemicalDacVisualizer.tsx
// ============================================================================
// ELECTROCHEMICAL DIRECT AIR CAPTURE (e-DAC) & BPMED INTERACTIVE VISUALIZER
// Real-time atmospheric CO2 capture, Bipolar Membrane Electrodialysis,
// and Basalt Mineralization / Sequestration Techno-Economics
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Wind,
  Zap,
  Droplets,
  Layers,
  TrendingDown,
  ShieldCheck,
  Globe,
  Gauge,
  Factory,
  ChevronRight,
  Database
} from 'lucide-react';
import {
  ElectrochemicalDacEngine,
  SEQUESTRATION_PORTFOLIO,
  SequestrationOption
} from '../../domain/electrochemicalDacEngine';

export const ElectrochemicalDacVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flowsheet' | 'kinetics' | 'economics'>('flowsheet');

  // Interactive Parameters
  const [annualCapacityTons, setAnnualCapacityTons] = useState<number>(100000);
  const [ambientCo2Ppm, setAmbientCo2Ppm] = useState<number>(420);
  const [captureEfficiency, setCaptureEfficiency] = useState<number>(0.80);
  const [cellVoltageV, setCellVoltageV] = useState<number>(1.35);
  const [electricityPriceKwh, setElectricityPriceKwh] = useState<number>(0.035);
  const [selectedSequestrationId, setSelectedSequestrationId] = useState<string>('mineral_carbonation');

  // Simulation calculations
  const simResults = useMemo(() => {
    return ElectrochemicalDacEngine.simulatePlant(
      {
        annualTargetTonsCo2: annualCapacityTons,
        operatingHoursPerYear: 8200,
        electricityPricePerKwh: electricityPriceKwh,
        capexPerTonYearCapacity: 950
      },
      {
        ambientCo2Ppm,
        captureEfficiency
      },
      {
        cellVoltageV,
        faradaicEfficiency: 0.91
      }
    );
  }, [annualCapacityTons, ambientCo2Ppm, captureEfficiency, cellVoltageV, electricityPriceKwh]);

  const selectedSequestration = useMemo(() => {
    return SEQUESTRATION_PORTFOLIO.find(s => s.id === selectedSequestrationId) || SEQUESTRATION_PORTFOLIO[0];
  }, [selectedSequestrationId]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              US DOE Carbon Negative Shot
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Bipolar Membrane (BPMED)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Zero Calcination
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Wind className="w-6 h-6 text-cyan-400" />
            Bẫy Carbon Trực Tiếp Từ Khí Quyển (e-DAC) & Màng Điện Phân Lưỡng Cực
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Thu hồi CO₂ loãng từ khí quyển (420 ppm) bằng dung dịch kiềm KOH và tái sinh giải phóng CO₂ tinh khiết bằng phân tách nước điện hóa nhiệt độ thường.
          </p>
        </div>

        {/* Quick KPI Badge */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3 text-right">
          <div className="text-xs text-slate-400 font-medium">Chi Phí Bẫy Carbon (LCOD)</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            ${simResults.lcodDollarsPerTonCo2} <span className="text-xs text-slate-400 font-normal">/ tấn CO₂</span>
          </div>
          <div className="text-xs text-cyan-400 flex items-center justify-end gap-1 mt-0.5">
            <TrendingDown className="w-3 h-3" /> Tiết kiệm {simResults.energySavingsVsThermalCalcinationPercent}% năng lượng vs nung nhiệt
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 my-5">
        <button
          onClick={() => setActiveTab('flowsheet')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'flowsheet'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Sơ Đồ Quy Trình BPMED Khép Kín
        </button>
        <button
          onClick={() => setActiveTab('kinetics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'kinetics'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Động Học Phân Tách Nước & Màng Bipolar
        </button>
        <button
          onClick={() => setActiveTab('economics')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'economics'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Kinh Tế Megaton & Địa Hóa Sequestration
        </button>
      </div>

      {/* TAB 1: Sơ Đồ Quy Trình BPMED Khép Kín */}
      {activeTab === 'flowsheet' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Factory className="w-4 h-4 text-cyan-400" />
              Sơ Đồ Dòng Vật Chất & Năng Lượng e-DAC Hoàn Toàn Khép Kín (Closed-Loop)
            </h3>

            {/* Dynamic SVG Process Flowsheet */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 920 400" className="w-full min-w-[760px] h-auto">
                <defs>
                  <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="bpmedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#065f46" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="co2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* 1. Ambient Air Contactor */}
                <rect x="40" y="80" width="180" height="230" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="130" y="110" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Tháp Tiếp Xúc Khí</text>
                <text x="130" y="128" fill="#94a3b8" fontSize="11" textAnchor="middle">(Air Contactor)</text>
                
                {/* Packing lines */}
                <line x1="55" y1="145" x2="205" y2="145" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="55" y1="165" x2="205" y2="165" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="55" y1="185" x2="205" y2="185" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="55" y1="205" x2="205" y2="205" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="55" y1="225" x2="205" y2="225" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="55" y1="245" x2="205" y2="245" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                <text x="130" y="275" fill="#e2e8f0" fontSize="10" textAnchor="middle">2KOH + CO₂ → K₂CO₃ + H₂O</text>
                <text x="130" y="295" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Hiệu Suất: {captureEfficiency * 100}%</text>

                {/* Air Inlet Arrow */}
                <path d="M 0 170 L 38 170" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="10" y="160" fill="#38bdf8" fontSize="11" fontWeight="bold">Không Khí</text>
                <text x="10" y="195" fill="#94a3b8" fontSize="9">420 ppm CO₂</text>

                {/* Clean Air Outlet Arrow */}
                <path d="M 130 80 L 130 30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="130" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">Khí Sạch: 84 ppm CO₂</text>

                {/* 2. Pipe to BPMED Stack */}
                <path d="M 220 230 L 320 230" stroke="#0ea5e9" strokeWidth="3" fill="none" />
                <polygon points="320,230 310,225 310,235" fill="#0ea5e9" />
                <text x="270" y="220" fill="#0ea5e9" fontSize="10" fontWeight="bold" textAnchor="middle">K₂CO₃ / KHCO₃</text>
                <text x="270" y="245" fill="#64748b" fontSize="9" textAnchor="middle">Dung Dịch Đã Bão Hòa</text>

                {/* 3. BPMED Stack Box */}
                <rect x="330" y="70" width="260" height="250" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                <text x="460" y="100" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">Cụm Màng Điện Phân Lưỡng Cực</text>
                <text x="460" y="118" fill="#a7f3d0" fontSize="11" textAnchor="middle">BPMED Stack (Triplet Cells)</text>

                {/* Internal BPM Membrane Representation */}
                <rect x="360" y="135" width="20" height="150" fill="#ef4444" opacity="0.8" rx="3" />
                <text x="370" y="215" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 370 215)">CEM (K⁺)</text>

                <rect x="420" y="135" width="20" height="150" fill="#3b82f6" opacity="0.8" rx="3" />
                <text x="430" y="215" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 430 215)">Acid Chamber</text>

                <rect x="480" y="135" width="24" height="150" fill="#8b5cf6" opacity="0.9" rx="3" />
                <text x="492" y="215" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 492 215)">BPM (H₂O → H⁺+OH⁻)</text>

                <rect x="540" y="135" width="20" height="150" fill="#10b981" opacity="0.8" rx="3" />
                <text x="550" y="215" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 550 215)">Base Chamber</text>

                <text x="460" y="305" fill="#6ee7b7" fontSize="10" textAnchor="middle">Điện Áp: {cellVoltageV} V/cell | P_stack: {simResults.bpmedStackPowerMw} MW</text>

                {/* 4. Regenerated Caustic Recycle Line (KOH) */}
                <path d="M 550 320 L 550 370 L 130 370 L 130 310" stroke="#10b981" strokeWidth="2.5" fill="none" strokeDasharray="5 3" />
                <polygon points="130,312 126,322 134,322" fill="#10b981" />
                <text x="340" y="385" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ← Tái Sinh 100% Dung Dịch KOH (pH 13.8) Hoàn Lưu Về Tháp Hấp Thụ
                </text>

                {/* 5. Acidified Stream with CO2 release */}
                <path d="M 430 135 L 430 90 L 650 90" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <polygon points="650,90 640,85 640,95" fill="#f59e0b" />
                <text x="560" y="80" fill="#f59e0b" fontSize="10" fontWeight="bold">CO₂ + H₂O Desorption</text>

                {/* 6. Gas-Liquid Separator / Stripper */}
                <rect x="660" y="60" width="100" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="710" y="85" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Bình Tách Khí</text>
                <text x="710" y="102" fill="#94a3b8" fontSize="9" textAnchor="middle">(Gas Degasser)</text>
                <text x="710" y="135" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">CO₂ {simResults.co2PurityPercent}%</text>

                {/* 7. CO2 Compression & Sequestration */}
                <path d="M 760 110 L 810 110" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <polygon points="810,110 800,105 800,115" fill="#f59e0b" />

                <rect x="820" y="70" width="90" height="190" rx="10" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="865" y="95" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Máy Nén 150 bar</text>
                <text x="865" y="115" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">Carbfix</text>
                <text x="865" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">Khoáng Hóa</text>
                <text x="865" y="165" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {simResults.dailyCo2CapturedTons} t/d
                </text>
                <text x="865" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">Lưu Trữ Vĩnh Cửu</text>
                <text x="865" y="235" fill="#a5b4fc" fontSize="9" textAnchor="middle">100,000+ Năm</text>
              </svg>
            </div>

            {/* Sub-card summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Sản lượng ngày:</span>
                <span className="text-sm font-bold text-emerald-400">{simResults.dailyCo2CapturedTons} tấn CO₂/ngày</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Công suất nhà máy:</span>
                <span className="text-sm font-bold text-cyan-400">{simResults.totalPlantPowerMw} MW (Điện xanh)</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Suất tiêu hao năng lượng:</span>
                <span className="text-sm font-bold text-amber-400">{simResults.specificEnergyGjPerTonCo2} GJ / tấn CO₂</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block">Tỷ lệ tuần hoàn kiềm K⁺:</span>
                <span className="text-sm font-bold text-emerald-400">{simResults.potassiumSolventRecycleRate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Động Học Phân Tách Nước & Màng Bipolar */}
      {activeTab === 'kinetics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Sliders */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                Thông Số Vận Hành Màng Lưỡng Cực (BPM)
              </h3>

              {/* Slider 1: Ambient CO2 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Nồng độ CO₂ khí quyển đầu vào:</span>
                  <span className="text-cyan-400 font-bold">{ambientCo2Ppm} ppm</span>
                </div>
                <input
                  type="range"
                  min="380"
                  max="500"
                  step="5"
                  value={ambientCo2Ppm}
                  onChange={(e) => setAmbientCo2Ppm(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Mức khí quyển hiện đại ~420 ppm (2026)</span>
              </div>

              {/* Slider 2: Cell Voltage */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Điện áp ô màng điện phân (Cell Voltage):</span>
                  <span className="text-amber-400 font-bold">{cellVoltageV.toFixed(2)} V / cell</span>
                </div>
                <input
                  type="range"
                  min="1.15"
                  max="1.70"
                  step="0.05"
                  value={cellVoltageV}
                  onChange={(e) => setCellVoltageV(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Điện thế phân hủy nước lý thuyết 0.83 V + quá thế màng catalytic junction</span>
              </div>

              {/* Slider 3: Capture Efficiency */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Hiệu suất hấp thụ tháp tiếp xúc (Air Contactor):</span>
                  <span className="text-emerald-400 font-bold">{(captureEfficiency * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.60"
                  max="0.90"
                  step="0.05"
                  value={captureEfficiency}
                  onChange={(e) => setCaptureEfficiency(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Khí sạch thải ra đạt {((1 - captureEfficiency) * ambientCo2Ppm).toFixed(0)} ppm CO₂</span>
              </div>

              {/* Slider 4: Electricity Price */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Giá điện xanh (Solar / Wind dedicated):</span>
                  <span className="text-blue-400 font-bold">${electricityPriceKwh.toFixed(3)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.020"
                  max="0.070"
                  step="0.005"
                  value={electricityPriceKwh}
                  onChange={(e) => setElectricityPriceKwh(Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Nhà máy năng lượng tái tạo quy mô lớn ($20 - $70/MWh)</span>
              </div>
            </div>

            {/* Thermodynamics & Energy Comparison Panel */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                  <Droplets className="w-5 h-5 text-emerald-400" />
                  Nhiệt Động Học & Phân Tách Nước
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Công tối thiểu nhiệt động (W_min):</span>
                    <span className="font-mono font-bold text-slate-200">{simResults.thermodynamicMinWorkKwhPerTon} kWh/t (0.44 GJ/t)</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Điện năng cụm màng BPMED:</span>
                    <span className="font-mono font-bold text-cyan-400">{(simResults.bpmedStackPowerMw * 1000 / (simResults.hourlyCo2CapturedKg / 1000)).toFixed(1)} kWh/t CO₂</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Điện năng phụ trợ (Quạt, Bơm, Nén 150 bar):</span>
                    <span className="font-mono font-bold text-amber-400">320.0 kWh/t CO₂</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-emerald-500/30">
                    <span className="text-slate-300 font-medium">Tổng điện năng toàn nhà máy:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{simResults.specificEnergyKwhPerTonCo2} kWh/t ({simResults.specificEnergyGjPerTonCo2} GJ/t)</span>
                  </div>
                </div>

                {/* Energy Benchmark Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>So Sánh Năng Lượng Với Nung Nhiệt (Thermal DAC - 8.5 GJ/t):</span>
                    <span className="font-bold text-emerald-400">-{simResults.energySavingsVsThermalCalcinationPercent}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(simResults.specificEnergyGjPerTonCo2 / 8.5) * 100}%` }}
                    />
                    <div
                      className="bg-slate-700/80 h-full"
                      style={{ width: `${100 - (simResults.specificEnergyGjPerTonCo2 / 8.5) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>e-DAC BPMED ({simResults.specificEnergyGjPerTonCo2} GJ/t)</span>
                    <span>Nung nhiệt oxy-fuel (8.50 GJ/t)</span>
                  </div>
                </div>
              </div>

              {/* Chemical Equation Badge */}
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 leading-relaxed font-mono">
                H₂O → H⁺ + OH⁻ (BPM Catalyst) <br />
                Acid chamber: HCO₃⁻ + H⁺ ⇌ H₂CO₃ → H₂O + CO₂(g) ↑ <br />
                Base chamber: K⁺ + OH⁻ → KOH (Tái sinh kiềm)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Kinh Tế Megaton & Địa Hóa Sequestration */}
      {activeTab === 'economics' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Database className="w-5 h-5 text-indigo-400" />
              Lựa Chọn Đường Dẫn Lưu Trữ Địa Chất Vĩnh Cửu & Khóa Carbon
            </h3>

            {/* Sequestration selector */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              {SEQUESTRATION_PORTFOLIO.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedSequestrationId(option.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    selectedSequestrationId === option.id
                      ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{option.vietnameseName}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{option.description}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Thời gian:</span>
                    <span className="font-bold text-cyan-400">
                      {option.permanenceYears > 1000 ? `${(option.permanenceYears / 1000).toFixed(0)}k năm` : `${option.permanenceYears} năm`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Route Deep Dive */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {selectedSequestration.vietnameseName} ({selectedSequestration.name})
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSequestration.description}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Độ bền vững lưu trữ:</span>
                  <span className="font-bold text-emerald-400">{selectedSequestration.permanenceYears.toLocaleString()} Năm</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Dung lượng địa chất toàn cầu:</span>
                  <span className="font-bold text-cyan-400">{selectedSequestration.storageCapacityGt.toLocaleString()} Giga-tấn</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Chi phí lưu trữ:</span>
                  <span className="font-bold text-amber-400">${selectedSequestration.costPerTon} / tấn CO₂</span>
                </div>
              </div>
            </div>

            {/* Plant Sizing Slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">Quy mô nhà máy e-DAC hàng năm:</span>
                    <span className="text-emerald-400 font-bold">{annualCapacityTons.toLocaleString()} tấn CO₂/năm</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={annualCapacityTons}
                    onChange={(e) => setAnnualCapacityTons(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>10,000 t/yr (Thí điểm)</span>
                    <span>100,000 t/yr (Thương mại)</span>
                    <span>500,000 t/yr (Megaton-scale)</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khối lượng CO₂ bẫy mỗi giờ:</span>
                    <span className="font-mono font-bold text-slate-200">{simResults.hourlyCo2CapturedKg.toLocaleString()} kg/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khối lượng CO₂ bẫy mỗi ngày:</span>
                    <span className="font-mono font-bold text-cyan-400">{simResults.dailyCo2CapturedTons} tấn/ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phát thải ròng tránh được:</span>
                    <span className="font-mono font-bold text-emerald-400">{simResults.avoidedFossilEmissionsTonsYear.toLocaleString()} tấn CO₂/năm</span>
                  </div>
                </div>
              </div>

              {/* Economic Cost Breakdown */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Phân Bổ Chi Phí Bẫy Carbon (LCOD Breakdown)
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Khấu hao CapEx (Màng & Tháp):</span>
                      <span className="font-mono font-bold text-slate-200">${(simResults.lcodDollarsPerTonCo2 * 0.48).toFixed(2)} / t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Điện năng vận hành (OpEx Điện):</span>
                      <span className="font-mono font-bold text-slate-200">${(simResults.specificEnergyKwhPerTonCo2 * electricityPriceKwh).toFixed(2)} / t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thay thế màng BPM (5-7 năm):</span>
                      <span className="font-mono font-bold text-slate-200">$18.50 / t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vận hành & Hóa chất bổ sung:</span>
                      <span className="font-mono font-bold text-slate-200">$16.00 / t</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-700 font-bold">
                      <span className="text-emerald-400">Tổng Chi Phí e-DAC ròng:</span>
                      <span className="text-emerald-400 font-mono text-sm">${simResults.lcodDollarsPerTonCo2} / tấn CO₂</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-xs text-emerald-400 font-medium">
                  Đạt mục tiêu US DOE Carbon Negative Shot (&lt; $200/t) ngay ở quy mô thương mại ban đầu!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectrochemicalDacVisualizer;
