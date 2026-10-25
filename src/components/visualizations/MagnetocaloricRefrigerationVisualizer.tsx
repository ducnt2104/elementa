// src/components/visualizations/MagnetocaloricRefrigerationVisualizer.tsx
// Interactive Visualizer: Magnetocaloric Refrigeration & Magnetic Heat Pump (MCE)
// Standards: IUPAC Physical Chemistry, Active Magnetic Regenerator (AMR) Thermodynamics, GDPT 2018 Physics & Zero-GWP Cooling

import React, { useState, useMemo } from 'react';
import {
  Snowflake,
  Flame,
  Zap,
  Gauge,
  Layers,
  Activity,
  Sparkles,
  Droplets,
  ShieldCheck,
  RotateCcw,
  Factory,
  Compass,
  ArrowRightLeft,
  Timer,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Leaf,
  DollarSign
} from 'lucide-react';
import {
  MCE_MATERIALS,
  MCE_FLUIDS,
  MceMaterialType,
  MceFluidType,
  calculateMceThermodynamicProperties,
  calculateAmrCyclePerformance,
  calculateEnvironmentalSavings
} from '../../domain/magnetocaloricRefrigerationEngine';
import { sound } from '../../audio/soundEngine';

type MceTabMode =
  | 'GIANT_MCE_PHYSICS'
  | 'ACTIVE_MAGNETIC_REGENERATOR'
  | 'ZERO_GWP_ENVIRONMENTAL';

export const MagnetocaloricRefrigerationVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MceTabMode>('GIANT_MCE_PHYSICS');

  // Interactive controls
  const [materialType, setMaterialType] = useState<MceMaterialType>('LA_FE_SI_HYDRIDE');
  const [fluidType, setFluidType] = useState<MceFluidType>('PURE_WATER');
  const [magneticFieldTesla, setMagneticFieldTesla] = useState<number>(1.5);
  const [operatingTempC, setOperatingTempC] = useState<number>(22);
  const [hotSinkTempC, setHotSinkTempC] = useState<number>(32);
  const [coldLoadTempC, setColdLoadTempC] = useState<number>(18);
  const [acCapacityKW, setAcCapacityKW] = useState<number>(3.5);

  const currentMaterial = MCE_MATERIALS[materialType];
  const currentFluid = MCE_FLUIDS[fluidType];

  // Thermodynamic MCE properties
  const mceProps = useMemo(() => {
    return calculateMceThermodynamicProperties(
      materialType,
      magneticFieldTesla,
      operatingTempC
    );
  }, [materialType, magneticFieldTesla, operatingTempC]);

  // AMR cycle performance
  const amrResult = useMemo(() => {
    return calculateAmrCyclePerformance(
      materialType,
      fluidType,
      magneticFieldTesla,
      hotSinkTempC,
      coldLoadTempC,
      8.0,
      2.0
    );
  }, [materialType, fluidType, magneticFieldTesla, hotSinkTempC, coldLoadTempC]);

  // Environmental savings
  const envResult = useMemo(() => {
    return calculateEnvironmentalSavings(
      acCapacityKW,
      2500
    );
  }, [acCapacityKW]);

  const handleModeChange = (mode: MceTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setMaterialType('LA_FE_SI_HYDRIDE');
    setFluidType('PURE_WATER');
    setMagneticFieldTesla(1.5);
    setOperatingTempC(22);
    setHotSinkTempC(32);
    setColdLoadTempC(18);
    setAcCapacityKW(3.5);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <Snowflake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30">
                Làm Lạnh &amp; Bơm Nhiệt Từ Tính Không Máy Nén (Magnetocaloric MCE)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                100% Zero-GWP (Không Môi Chất HFC) • Êm Tuyệt Đối
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Magnetocaloric Refrigeration &amp; Heat Pump
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hiệu ứng từ nhiệt khổng lồ (Giant MCE) gần nhiệt độ Curie • Chu trình hồi nhiệt từ tính AMR 4 bước • Nước tinh khiết GWP = 0 thay thế gas lạnh R410A
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('GIANT_MCE_PHYSICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GIANT_MCE_PHYSICS'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Vật Lý Hiệu Ứng Từ Nhiệt (MCE)</span>
          </button>

          <button
            onClick={() => handleModeChange('ACTIVE_MAGNETIC_REGENERATOR')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'ACTIVE_MAGNETIC_REGENERATOR'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Chu Trình Hồi Nhiệt AMR 4 Bước</span>
          </button>

          <button
            onClick={() => handleModeChange('ZERO_GWP_ENVIRONMENTAL')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'ZERO_GWP_ENVIRONMENTAL'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Điều Hòa Xanh Zero-GWP</span>
          </button>

          <button
            onClick={resetDefaults}
            title="Khôi phục mặc định"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GLOBAL CONTROLS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
        {/* Material Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Hợp Kim Từ Nhiệt (Magnetocaloric):
          </label>
          <select
            value={materialType}
            onChange={(e) => {
              sound.playUiClick();
              setMaterialType(e.target.value as MceMaterialType);
            }}
            className="bg-slate-800 text-xs font-bold text-cyan-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {Object.values(MCE_MATERIALS).map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Nhiệt độ Curie: <strong className="text-emerald-400">{currentMaterial.curieTemperatureC}°C</strong> (Chuyển pha: {currentMaterial.transitionType})
          </span>
        </div>

        {/* Fluid Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            Môi Chất Lỏng Truyền Nhiệt:
          </label>
          <select
            value={fluidType}
            onChange={(e) => {
              sound.playUiClick();
              setFluidType(e.target.value as MceFluidType);
            }}
            className="bg-slate-800 text-xs font-bold text-blue-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {Object.values(MCE_FLUIDS).map((flu) => (
              <option key={flu.id} value={flu.id}>
                {flu.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Tiềm năng nóng lên toàn cầu: <strong className="text-emerald-400">GWP = {currentFluid.globalWarmingPotentialGWP}</strong>
          </span>
        </div>

        {/* Magnetic Field Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              Cường Độ Từ Trường (B):
            </span>
            <span className="text-purple-300 font-mono font-bold">{magneticFieldTesla.toFixed(1)} Tesla</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.1}
            value={magneticFieldTesla}
            onChange={(e) => setMagneticFieldTesla(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.5 T (Nam châm vĩnh cửu nhỏ)</span>
            <span>1.5 T (Nam châm Halbach tối ưu)</span>
            <span>2.5 T (Nam châm siêu dẫn)</span>
          </div>
        </div>

        {/* Operating Temp Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Nhiệt Độ Vận Hành Trung Bình:
            </span>
            <span className="text-amber-300 font-mono font-bold">{operatingTempC}°C</span>
          </div>
          <input
            type="range"
            min={10}
            max={35}
            step={1}
            value={operatingTempC}
            onChange={(e) => setOperatingTempC(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>10°C (Lạnh)</span>
            <span>{currentMaterial.curieTemperatureC}°C (Đỉnh Curie)</span>
            <span>35°C (Nóng)</span>
          </div>
        </div>
      </div>

      {/* MODE 1: GIANT MCE PHYSICS */}
      {activeMode === 'GIANT_MCE_PHYSICS' && (
        <div className="flex flex-col gap-6">
          {/* MCE Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Biến Thiên Entropy Từ (ΔS_mag)</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {mceProps.isothermalEntropyChangeJPerKgK.toFixed(1)} J/(kg·K)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hệ thức Maxwell: (∂S/∂H)_T = (∂M/∂T)_H. Độ trật tự spin điện tử cực đại khi đặt trong từ trường.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Thay Đổi Nhiệt Đoạn Nhiệt (ΔT_ad)</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                ±{mceProps.adiabaticTemperatureChangeDeltaTK.toFixed(1)} K
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Nóng lên khi từ hóa (+ΔT_ad) và lạnh đi sâu khi khử từ (-ΔT_ad) trong một chu kỳ đơn.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổn Thất Trễ Từ (Hysteresis Loss)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {currentMaterial.hysteresisLossJPerKg.toFixed(1)} J/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Trễ từ cực thấp giúp chu kỳ xoay chiều đạt hiệu suất năng lượng cao không sinh nhiệt vô ích.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Ồn Cơ Khí Vận Hành</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                &lt; 32 dB
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Không có piston nén khí áp suất cao, êm hơn tiếng lá rơi trong phòng ngủ.
              </p>
            </div>
          </div>

          {/* Dynamic SVG: Magnetocaloric Spin Alignment Schematic */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Cơ Chế Vi Mô: Định Hướng Spin Điện Tử Dưới Từ Trường {magneticFieldTesla} Tesla
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Left: Demagnetized State (B = 0) */}
                <rect x="50" y="30" width="320" height="160" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="210" y="55" fill="#94a3b8" textAnchor="middle" fontSize="13" fontWeight="bold">Trạng Thái Khử Từ (B = 0 Tesla)</text>
                <text x="210" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="11">Các mô-men từ (Spin) hỗn loạn ngẫu nhiên</text>
                <text x="210" y="110" fill="#38bdf8" textAnchor="middle" fontSize="12" fontWeight="bold">Entropy từ tính cực đại (S_mag cao)</text>
                <text x="210" y="135" fill="#38bdf8" textAnchor="middle" fontSize="11">Hút nhiệt từ mạng tinh thể ➔ Làm lạnh sâu</text>
                <text x="210" y="165" fill="#a5f3fc" textAnchor="middle" fontSize="11" fontWeight="bold">Nhiệt độ giảm: -{mceProps.adiabaticTemperatureChangeDeltaTK.toFixed(1)} K</text>

                {/* Arrow Transition */}
                <path d="M 385 110 L 415 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="400" y="95" fill="#f59e0b" textAnchor="middle" fontSize="10" fontWeight="bold">Từ hóa B</text>

                {/* Right: Magnetized State (B = 1.5 T) */}
                <rect x="430" y="30" width="320" height="160" rx="8" fill="#311019" stroke="#f43f5e" strokeWidth="2" />
                <text x="590" y="55" fill="#fb7185" textAnchor="middle" fontSize="13" fontWeight="bold">Trạng Thái Từ Hóa (B = {magneticFieldTesla} Tesla)</text>
                <text x="590" y="80" fill="#fecdd3" textAnchor="middle" fontSize="11">Các spin thẳng hàng song song trật tự cao</text>
                <text x="590" y="110" fill="#f43f5e" textAnchor="middle" fontSize="12" fontWeight="bold">Entropy từ tính giảm mạnh (ΔS_mag &lt; 0)</text>
                <text x="590" y="135" fill="#f43f5e" textAnchor="middle" fontSize="11">Truyền nhiệt vào mạng tinh thể ➔ Tỏa nhiệt nóng</text>
                <text x="590" y="165" fill="#fda4af" textAnchor="middle" fontSize="11" fontWeight="bold">Nhiệt độ tăng: +{mceProps.adiabaticTemperatureChangeDeltaTK.toFixed(1)} K</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ACTIVE MAGNETIC REGENERATOR (AMR) */}
      {activeMode === 'ACTIVE_MAGNETIC_REGENERATOR' && (
        <div className="flex flex-col gap-6">
          {/* Temperature Span Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-400" />
                  Nhiệt Độ Đầu Thải Nóng (Hot Sink):
                </span>
                <span className="text-rose-300 font-mono font-bold text-sm">{hotSinkTempC}°C</span>
              </div>
              <input
                type="range"
                min={25}
                max={45}
                step={1}
                value={hotSinkTempC}
                onChange={(e) => setHotSinkTempC(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>25°C (Mát)</span>
                <span>32°C (Tiêu chuẩn ngày hè)</span>
                <span>45°C (Nắng gắt)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Snowflake className="w-4 h-4 text-cyan-400" />
                  Nhiệt Độ Tải Lạnh (Cold Load):
                </span>
                <span className="text-cyan-300 font-mono font-bold text-sm">{coldLoadTempC}°C</span>
              </div>
              <input
                type="range"
                min={4}
                max={24}
                step={1}
                value={coldLoadTempC}
                onChange={(e) => setColdLoadTempC(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>4°C (Tủ lạnh bảo quản thực phẩm)</span>
                <span>18°C (Điều hòa không khí phòng)</span>
                <span>24°C (Làm mát nhẹ)</span>
              </div>
            </div>
          </div>

          {/* AMR Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công Suất Làm Lạnh (Cooling Power)</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {(amrResult.coolingCapacityWatts / 1000).toFixed(2)} kW
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Từ 8 kg hạt xốp từ nhiệt quay tần số 2.0 Hz.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hệ Số Hiệu Quả Làm Lạnh (COP)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {amrResult.copCooling.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Cao hơn 30% so với máy nén hơi thông thường (~3.2).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Chênh Nhiệt Phục Hồi (Span)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {amrResult.temperatureSpanK.toFixed(1)} K
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Gấp 3 lần ΔT_ad đơn nhờ cơ chế hồi nhiệt dòng nước đối lưu.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Định Luật II (Carnot)</span>
              <div className="text-2xl font-black text-teal-400 font-mono mt-1">
                {amrResult.secondLawEfficiencyPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Carnot COP lý thuyết: {amrResult.carnotCop.toFixed(2)}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: ZERO-GWP ENVIRONMENTAL */}
      {activeMode === 'ZERO_GWP_ENVIRONMENTAL' && (
        <div className="flex flex-col gap-6">
          {/* AC Capacity Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 text-emerald-400" />
                Quy Mô Công Suất Điều Hòa Dân Dụng / Thương Mại:
              </span>
              <span className="text-emerald-300 font-mono font-bold text-sm">{acCapacityKW} kW ({((acCapacityKW * 3412) / 12000).toFixed(1)} HP / Tấn lạnh)</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={15.0}
              step={0.5}
              value={acCapacityKW}
              onChange={(e) => setAcCapacityKW(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1.0 kW (Phòng nhỏ)</span>
              <span>3.5 kW (Chuẩn 1.5 HP gia đình)</span>
              <span>15.0 kW (Văn phòng thương mại)</span>
            </div>
          </div>

          {/* Environmental Savings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" />
                  Triệt Tiêu Hoàn Toàn Gas Lạnh HFC (GWP = 0)
                </span>
                <div className="text-3xl font-black text-white font-mono mt-2">
                  {envResult.refrigerantMassKgSaved.toFixed(1)} kg R410A
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Loại bỏ nguy cơ rò rỉ khí nhà kính fluorinated độc hại (R410A có GWP gấp 2.088 lần CO₂).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Môi chất thay thế: <strong>100% Nước tự nhiên</strong> (GWP = 0, ODP = 0).
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-cyan-950/40 to-slate-900/80 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Tiết Kiệm Điện Năng Hằng Năm
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono mt-2">
                  {envResult.annualElectricitySavedKWh.toFixed(0)} kWh/năm
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Giảm <strong>33% hóa đơn tiền điện</strong> nhờ COP đạt 4.8 so với máy nén hơi 3.2.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Tiết kiệm tương đương ~<strong>$120 - $180 USD/năm</strong> cho mỗi hộ gia đình.
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-blue-950/40 to-slate-900/80 rounded-2xl border border-blue-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Tổng Phát Thải CO₂e Tránh Được
                </span>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-2">
                  {envResult.totalAnnualAvoidedCO2eTons.toFixed(2)} tấn CO₂e/năm
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Bao gồm phát thải trực tiếp (rò rỉ gas: {envResult.avoidedDirectGwpTonsCO2e.toFixed(2)} tấn) và gián tiếp ({envResult.avoidedIndirectElectricityCO2eTons.toFixed(2)} tấn điện lưới).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Đạt chứng nhận Net-Zero Thermal Comfort của Liên Hợp Quốc.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
