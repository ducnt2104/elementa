// src/components/visualizations/SulfurIodineCycleVisualizer.tsx
// Interactive Visualizer: Concentrated Solar & HTGR Sulfur-Iodine (S-I) Thermochemical Water-Splitting Cycle
// Standards: IUPAC Chemical Thermodynamics, General Atomics S-I Cycle, GDPT 2018 Chemistry & Industrial Green Hydrogen

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Sun,
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
  Atom,
  Wind,
  ArrowRight
} from 'lucide-react';
import {
  SI_HEAT_SOURCES,
  HeatSourcePrimaryType,
  calculateSulfurIodineCyclePerformance
} from '../../domain/sulfurIodineCycleEngine';
import { sound } from '../../audio/soundEngine';

type SiTabMode =
  | 'THREE_SECTION_LOOP_FLOW'
  | 'HEAT_SOURCE_THERMAL_EFFICIENCY'
  | 'GIGA_SCALE_H2_ECONOMICS';

export const SulfurIodineCycleVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SiTabMode>('THREE_SECTION_LOOP_FLOW');

  // Interactive Controls
  const [heatSourceType, setHeatSourceType] = useState<HeatSourcePrimaryType>('CONCENTRATED_SOLAR_TOWER');
  const [thermalPowerMWth, setThermalPowerMWth] = useState<number>(100.0);
  const [sulfuricDecompTempC, setSulfuricDecompTempC] = useState<number>(900.0);
  const [hiConversionEnhancement, setHiConversionEnhancement] = useState<number>(0.88);

  const currentHeatSource = SI_HEAT_SOURCES[heatSourceType];

  // Calculations
  const performance = useMemo(() => {
    return calculateSulfurIodineCyclePerformance(
      heatSourceType,
      thermalPowerMWth,
      sulfuricDecompTempC,
      hiConversionEnhancement
    );
  }, [heatSourceType, thermalPowerMWth, sulfuricDecompTempC, hiConversionEnhancement]);

  const handleModeChange = (mode: SiTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setHeatSourceType('CONCENTRATED_SOLAR_TOWER');
    setThermalPowerMWth(100.0);
    setSulfuricDecompTempC(900.0);
    setHiConversionEnhancement(0.88);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-purple-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Atom className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Chu Trình Nhiệt Hóa Lưu Huỳnh - Iốt (S-I Thermochemical Cycle)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Hiệu Suất Nhiệt &gt; 50% • Tuần Hoàn 100% S &amp; I • Cấp Gigawatt
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Sulfur-Iodine Thermochemical Water-Splitting Cycle
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chu trình 3 bước General Atomics • Kết hợp tháp mặt trời 900°C hoặc lò hạt nhân HTGR • Sản xuất hydro sạch quy mô công nghiệp lớn nhất hành tinh
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('THREE_SECTION_LOOP_FLOW')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'THREE_SECTION_LOOP_FLOW'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sơ Đồ 3 Phân Đoạn (Bunsen - H₂SO₄ - HI)</span>
          </button>

          <button
            onClick={() => handleModeChange('HEAT_SOURCE_THERMAL_EFFICIENCY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'HEAT_SOURCE_THERMAL_EFFICIENCY'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 ring-1 ring-purple-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Nguồn Nhiệt &amp; Hiệu Suất &gt; 50%</span>
          </button>

          <button
            onClick={() => handleModeChange('GIGA_SCALE_H2_ECONOMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GIGA_SCALE_H2_ECONOMICS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Kinh Tế Hydro Gigawatt ($2.3/kg)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: 3-SECTION CLOSED-LOOP FLOW */}
      {activeMode === 'THREE_SECTION_LOOP_FLOW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Reaction Summary */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Atom className="w-4 h-4 text-amber-400" />
                Chu Trình 3 Phản Ứng Khép Kín
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Reaction 1 Card */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-amber-400 block mb-1">
                Phân Đoạn 1: Phản Ứng Bunsen (120 °C)
              </span>
              <div className="font-mono text-[11px] text-slate-200 bg-slate-900 p-2 rounded border border-slate-800">
                I₂ + SO₂ + 2H₂O ➔ 2HI + H₂SO₄
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Tự động tách 2 pha lỏng: Pha nặng HIx và pha nhẹ H₂SO₄.
              </span>
            </div>

            {/* Reaction 2 Card */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-red-400 block mb-1">
                Phân Đoạn 2: Phân Hủy H₂SO₄ (900 °C)
              </span>
              <div className="font-mono text-[11px] text-slate-200 bg-slate-900 p-2 rounded border border-slate-800">
                H₂SO₄ ➔ H₂O + SO₂ + ½ O₂ ↑
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Thu nhiệt cực đại từ tháp mặt trời hoặc lò HTGR, giải phóng khí O₂ tinh khiết và tuần hoàn lại SO₂.
              </span>
            </div>

            {/* Reaction 3 Card */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-emerald-400 block mb-1">
                Phân Đoạn 3: Phân Hủy HI (450 °C)
              </span>
              <div className="font-mono text-[11px] text-slate-200 bg-slate-900 p-2 rounded border border-slate-800">
                2HI ➔ H₂ ↑ + I₂
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Thu hydro thương phẩm (H₂) tinh khiết và tuần hoàn hoàn toàn Iốt (I₂) về phân đoạn Bunsen.
              </span>
            </div>

            <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">Bảo Toàn Hóa Chất 100%:</span>
              Chất phản ứng duy nhất đưa vào hệ thống là NƯỚC (H₂O) và NHIỆT LƯỢNG; sản phẩm thoát ra duy nhất là H₂ và O₂. Toàn bộ các nguyên tố S và I được tuần hoàn khép kín vĩnh cửu, không tạo ra bất kỳ chất thải độc hại nào.
            </div>
          </div>

          {/* SVG 3-Loop Flow Schematic */}
          <div className="lg:col-span-2 flex flex-col gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 justify-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                Vòng Tuần Hoàn Nhiệt Hóa Lưu Huỳnh - Iốt
              </span>
              <span className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30 font-bold">
                Hiệu Suất: {performance.thermalEfficiencyPercent.toFixed(1)}% • Đạt {performance.hourlyHydrogenProductionKg.toFixed(0)} kg H₂/h
              </span>
            </div>

            {/* SVG Schematic */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 720 340" className="w-full h-auto max-h-[320px]">
                <defs>
                  <linearGradient id="gradBunsen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradSulfur" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradHi" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* REACTOR 1: BUNSEN (CENTER LEFT) */}
                <rect x="90" y="110" width="130" height="110" rx="12" fill="url(#gradBunsen)" stroke="#fbbf24" strokeWidth="2.5" />
                <text x="155" y="138" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">BUNSEN REACTOR</text>
                <text x="155" y="158" fill="#fef3c7" fontSize="10" textAnchor="middle">T = 120 °C (393 K)</text>
                <text x="155" y="178" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Tách 2 Pha Lỏng</text>
                <text x="155" y="198" fill="#fef3c7" fontSize="9" textAnchor="middle">H₂SO₄ &amp; HIx</text>

                {/* Water H2O Input into Bunsen */}
                <path d="M 20 165 L 90 165" fill="none" stroke="#06b6d4" strokeWidth="4" />
                <polygon points="90,165 80,160 80,170" fill="#06b6d4" />
                <text x="50" y="152" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">H₂O Nạp Vào</text>

                {/* Stream 1: H2SO4 to Sulfuric Acid Decomposer (Top Right) */}
                <path d="M 155 110 L 155 60 L 440 60" fill="none" stroke="#ef4444" strokeWidth="3" />
                <polygon points="440,60 430,55 430,65" fill="#ef4444" />
                <text x="280" y="50" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Dòng H₂SO₄ Loãng</text>

                {/* REACTOR 2: SULFURIC ACID DECOMPOSER (TOP RIGHT) */}
                <rect x="440" y="20" width="160" height="90" rx="12" fill="url(#gradSulfur)" stroke="#f87171" strokeWidth="2.5" />
                <text x="520" y="48" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">H₂SO₄ DECOMPOSER</text>
                <text x="520" y="68" fill="#fee2e2" fontSize="11" fontWeight="bold" textAnchor="middle">
                  T = {performance.sulfuricDecompTempC} °C 🔥
                </text>
                <text x="520" y="88" fill="#fca5a5" fontSize="9" textAnchor="middle">Xúc Tác SiC / Pt / Fe₂O₃</text>

                {/* Oxygen Gas Exit */}
                <path d="M 600 65 L 680 65" fill="none" stroke="#38bdf8" strokeWidth="4" />
                <polygon points="685,65 675,60 675,70" fill="#38bdf8" />
                <text x="640" y="52" fill="#7dd3fc" fontSize="11" fontWeight="bold">O₂ Xả Ra</text>

                {/* SO2 Recycle back to Bunsen */}
                <path d="M 520 110 L 520 145 L 220 145" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,4" />
                <polygon points="220,145 230,140 230,150" fill="#f59e0b" />
                <text x="350" y="138" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Tuần Hoàn Khí SO₂ (Khép Kín)
                </text>

                {/* Stream 2: HI to HI Decomposer (Bottom Right) */}
                <path d="M 155 220 L 155 260 L 440 260" fill="none" stroke="#10b981" strokeWidth="3" />
                <polygon points="440,260 430,255 430,265" fill="#10b981" />
                <text x="280" y="278" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Dòng Pha Nặng HIx</text>

                {/* REACTOR 3: HI DECOMPOSER (BOTTOM RIGHT) */}
                <rect x="440" y="215" width="160" height="90" rx="12" fill="url(#gradHi)" stroke="#34d399" strokeWidth="2.5" />
                <text x="520" y="242" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">HI DECOMPOSER</text>
                <text x="520" y="262" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">T = 450 °C (723 K)</text>
                <text x="520" y="282" fill="#a7f3d0" fontSize="9" textAnchor="middle">Chưng Cất Phản Ứng Tách H₂</text>

                {/* Pure Hydrogen H2 Output */}
                <path d="M 600 260 L 680 260" fill="none" stroke="#4ade80" strokeWidth="5" />
                <polygon points="685,260 675,253 675,267" fill="#4ade80" />
                <text x="640" y="248" fill="#4ade80" fontSize="12" fontWeight="bold">H₂ HYDRO</text>

                {/* I2 Recycle back to Bunsen */}
                <path d="M 520 215 L 520 185 L 220 185" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,4" />
                <polygon points="220,185 230,180 230,190" fill="#a855f7" />
                <text x="350" y="178" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Tuần Hoàn Iốt I₂ (Khép Kín)
                </text>
              </svg>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Sản lượng hydro sạch:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {performance.hourlyHydrogenProductionKg.toFixed(0)} kg H₂/giờ
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Hiệu suất nhiệt-đến-H₂:</span>
                <span className="font-bold text-amber-400 font-mono text-sm">
                  {performance.thermalEfficiencyPercent.toFixed(1)} %
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Giá thành sản xuất:</span>
                <span className="font-bold text-cyan-400 font-mono text-sm">
                  ${performance.levelizedCostOfHydrogenUSDPerKg.toFixed(2)} / kg H₂
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: HEAT SOURCE & THERMAL EFFICIENCY */}
      {activeMode === 'HEAT_SOURCE_THERMAL_EFFICIENCY' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-purple-400" />
              Nguồn Nhiệt &amp; Điều Khiển
            </h3>

            {/* Heat Source Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-semibold">Nguồn nhiệt cực hạn sơ cấp:</label>
              <select
                value={heatSourceType}
                onChange={(e) => setHeatSourceType(e.target.value as HeatSourcePrimaryType)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {Object.values(SI_HEAT_SOURCES).map((hs) => (
                  <option key={hs.id} value={hs.id}>
                    {hs.name} ({hs.peakOperatingTempC}°C)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {currentHeatSource.vietnameseDescription}
              </p>
            </div>

            {/* Thermal Capacity */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất nhiệt sơ cấp:</span>
                <span className="font-mono text-purple-400 font-bold">{thermalPowerMWth.toFixed(0)} MWth</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={thermalPowerMWth}
                onChange={(e) => setThermalPowerMWth(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Sulfuric Acid Decomp Temp */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ phân hủy H₂SO₄:</span>
                <span className="font-mono text-red-400 font-bold">{sulfuricDecompTempC.toFixed(0)} °C</span>
              </div>
              <input
                type="range"
                min="820"
                max="950"
                step="5"
                value={sulfuricDecompTempC}
                onChange={(e) => setSulfuricDecompTempC(parseFloat(e.target.value))}
                className="w-full accent-red-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* HI Conversion Enhancement */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hiệu quả màng lọc / chưng cất tách HI:</span>
                <span className="font-mono text-emerald-400 font-bold">{(hiConversionEnhancement * 100).toFixed(0)} %</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="0.95"
                step="0.01"
                value={hiConversionEnhancement}
                onChange={(e) => setHiConversionEnhancement(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Efficiency Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Hiệu Suất Nhiệt Động Lực Học Vượt Trội
            </h3>

            {/* Big Progress Bar */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">Hiệu Suất Nhiệt Chuyển Thành Năng Lượng Hydro (HHV):</span>
                <span className="font-mono text-2xl font-black text-amber-400">
                  {performance.thermalEfficiencyPercent.toFixed(1)} %
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${performance.thermalEfficiencyPercent * 1.8}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-slate-400">
                Cao hơn 2.5 lần so với đường vòng: Nhiệt ➔ Tuabin hơi phát điện (35%) ➔ Điện phân nước (70%) = 24.5%!
              </span>
            </div>

            {/* Ceramics & Materials */}
            <div className="p-4 bg-purple-950/20 rounded-xl border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-purple-400 block mb-1">
                Vật Liệu Gốm Chịu Ăn Mòn Axit Cực Hạn (SiC Ceramic):
              </span>
              Hỗn hợp sôi H₂SO₄ ở 900°C và HIx ăn mòn hầu hết mọi kim loại thông thường như inox thép không gỉ. Chu trình S-I hiện đại ứng dụng bộ trao đổi nhiệt bằng gốm Silicon Carbide thiêu kết (SSiC) và lớp lót kim loại quý Tantalum, đảm bảo tuổi thọ thiết bị vận hành liên tục &gt; 30 năm trong môi trường axit cực hạn.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GIGA SCALE H2 ECONOMICS */}
      {activeMode === 'GIGA_SCALE_H2_ECONOMICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Chỉ Số Kinh Tế Hydro S-I
            </h3>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Giá Thành Sản Xuất LCOH</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${performance.levelizedCostOfHydrogenUSDPerKg.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ kg H₂</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Quy mô công nghiệp 100+ MWth
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Sản Lượng Hydro Mỗi Ngày</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {performance.dailyHydrogenProductionTons.toFixed(1)} <span className="text-xs font-normal text-slate-400">tấn H₂/ngày</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Đủ nhiên liệu vận hành hàng nghìn xe buýt hydro
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Giảm Phát Thải CO₂ Hàng Năm</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {performance.annualAvoidedCO2Tons.toFixed(0)} <span className="text-xs font-normal text-slate-400">tấn/năm</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Tránh xả thải từ nhà máy hóa chất phân bón đạm
              </span>
            </div>
          </div>

          {/* Strategic Industrial Applications */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Factory className="w-4 h-4 text-emerald-400" />
              Ứng Dụng Quy Mô Siêu Lớn Của Hydro Chu Trình S-I
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
                <span className="font-bold text-emerald-400">Sản Xuất Thép Xanh Bằng Hydro (H₂-DRI):</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Thay thế than cốc trong lò cao luyện thép bằng hydro nhiệt hóa S-I, khử trực tiếp quặng sắt oxit Fe₂O₃ thành sắt xốp Fe kim loại mà sản phẩm phụ chỉ là hơi nước H₂O, loại bỏ ngành công nghiệp phát thải carbon lớn nhất hành tinh.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
                <span className="font-bold text-cyan-400">Tổng Hợp Phân Bón Amoniac Xanh (Haber-Bosch):</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Cung cấp nguồn hydro sạch giá rẻ &lt; $2.5/kg cho nhà máy tổng hợp phân bón NH₃ và phân đạm Ure, chấm dứt phụ thuộc vào khí tự nhiên nhập khẩu và bảo đảm an ninh lương thực quốc gia bền vững.
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">
                Con Đường Tiến Tới Nền Kinh Tế Hydro Thực Thụ:
              </span>
              Điện phân nước quy mô nhỏ có vai trò quan trọng ở vi lưới cục bộ, nhưng để khử carbon hoàn toàn cho ngành luyện kim, hóa dầu, và hàng hải toàn cầu cần hàng trăm triệu tấn hydro mỗi năm. Chu trình nhiệt hóa Sulfur-Iodine tích hợp năng lượng hạt nhân Gen-IV và tháp mặt trời chính là công nghệ sản xuất hydro tập trung duy nhất trên thế giới có khả năng đáp ứng quy mô khổng lồ này.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
