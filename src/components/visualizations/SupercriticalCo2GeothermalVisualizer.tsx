// src/components/visualizations/SupercriticalCo2GeothermalVisualizer.tsx
// Interactive Visualizer: Supercritical Carbon Dioxide (sCO2) Closed-Loop Geothermal Power Cycle
// Standards: IUPAC Physical Chemistry, Supercritical Fluid Thermodynamics (NIST REFPROP sCO2), GDPT 2018 Chemistry & EGS Geothermal

import React, { useState, useMemo } from 'react';
import {
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
  Mountain,
  Compass,
  ArrowDownUp,
  DollarSign,
  Leaf
} from 'lucide-react';
import {
  GEOTHERMAL_ROCKS,
  SCO2_TURBINE_CYCLES,
  GeothermalReservoirRockType,
  Sco2SurfaceTurbineCycle,
  calculateThermosiphonBuoyancy,
  calculateSco2TurbinePowerAndEfficiency,
  calculateGeothermalPlantEconomicsAndCarbonStorage
} from '../../domain/supercriticalCo2GeothermalEngine';
import { sound } from '../../audio/soundEngine';

type Sco2GeoTabMode =
  | 'THERMOSIPHON_BUOYANCY_CIRCUIT'
  | 'COMPACT_SCO2_TURBOMACHINERY'
  | 'GEO_CARBON_MINERALIZATION';

export const SupercriticalCo2GeothermalVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Sco2GeoTabMode>('THERMOSIPHON_BUOYANCY_CIRCUIT');

  // Interactive controls
  const [rockType, setRockType] = useState<GeothermalReservoirRockType>('BASALT_FLOOD');
  const [cycleType, setCycleType] = useState<Sco2SurfaceTurbineCycle>('RECUPERATED_BRAYTON');
  const [reservoirDepthM, setReservoirDepthM] = useState<number>(3500);
  const [productionTempC, setProductionTempC] = useState<number>(200);
  const [massFlowRateKgPerS, setMassFlowRateKgPerS] = useState<number>(180);
  const [plantPowerMW, setPlantPowerMW] = useState<number>(25);

  const currentRock = GEOTHERMAL_ROCKS[rockType];
  const currentCycle = SCO2_TURBINE_CYCLES[cycleType];

  // Buoyancy calculations
  const buoyancyResult = useMemo(() => {
    return calculateThermosiphonBuoyancy(
      reservoirDepthM,
      35,
      productionTempC,
      0.25
    );
  }, [reservoirDepthM, productionTempC]);

  // Turbomachinery calculations
  const turbineResult = useMemo(() => {
    return calculateSco2TurbinePowerAndEfficiency(
      productionTempC,
      cycleType,
      massFlowRateKgPerS
    );
  }, [productionTempC, cycleType, massFlowRateKgPerS]);

  // Economics & Carbon mineralization
  const plantResult = useMemo(() => {
    return calculateGeothermalPlantEconomicsAndCarbonStorage(
      plantPowerMW,
      rockType,
      0.94
    );
  }, [plantPowerMW, rockType]);

  const handleModeChange = (mode: Sco2GeoTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setRockType('BASALT_FLOOD');
    setCycleType('RECUPERATED_BRAYTON');
    setReservoirDepthM(3500);
    setProductionTempC(200);
    setMassFlowRateKgPerS(180);
    setPlantPowerMW(25);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-rose-500/20 to-orange-600/30 rounded-2xl border border-rose-500/40 text-rose-400">
            <Mountain className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/30">
                Địa Nhiệt Tăng Cường CO₂ Siêu Tới Hạn (sCO₂-EGS)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Tuần Hoàn Đối Lưu 0 Bơm • Khoáng Hóa Đá Basalt
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Supercritical CO₂ Geothermal Power Cycle (sCO₂-EGS)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tự vận hành đối lưu trọng lực Thermosiphon • Tuabin sCO₂ siêu nhỏ gọn (giảm 85% thể tích) • Tiêu thụ 0 Lít nước &amp; khóa CO₂ vĩnh viễn
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('THERMOSIPHON_BUOYANCY_CIRCUIT')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'THERMOSIPHON_BUOYANCY_CIRCUIT'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-1 ring-rose-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ArrowDownUp className="w-4 h-4" />
            <span>Đối Lưu Trọng Lực Thermosiphon</span>
          </button>

          <button
            onClick={() => handleModeChange('COMPACT_SCO2_TURBOMACHINERY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'COMPACT_SCO2_TURBOMACHINERY'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 ring-1 ring-orange-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tuabin sCO₂ Siêu Nhỏ Gọn</span>
          </button>

          <button
            onClick={() => handleModeChange('GEO_CARBON_MINERALIZATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GEO_CARBON_MINERALIZATION'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Khoáng Hóa &amp; Kinh Tế Nhà Máy</span>
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
        {/* Rock Reservoir Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            Tầng Địa Chất Hầm Chứa:
          </label>
          <select
            value={rockType}
            onChange={(e) => {
              sound.playUiClick();
              setRockType(e.target.value as GeothermalReservoirRockType);
            }}
            className="bg-slate-800 text-xs font-bold text-rose-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          >
            {Object.values(GEOTHERMAL_ROCKS).map((rock) => (
              <option key={rock.id} value={rock.id}>
                {rock.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Khoáng hóa: <strong className="text-emerald-400">{currentRock.mineralCarbonationReactivity}</strong> ({currentRock.carbonationMinerals.split('➔')[1] || currentRock.carbonationMinerals})
          </span>
        </div>

        {/* Turbine Cycle Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-orange-400" />
            Chu Trình Mặt Đất:
          </label>
          <select
            value={cycleType}
            onChange={(e) => {
              sound.playUiClick();
              setCycleType(e.target.value as Sco2SurfaceTurbineCycle);
            }}
            className="bg-slate-800 text-xs font-bold text-orange-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            {Object.values(SCO2_TURBINE_CYCLES).map((cyc) => (
              <option key={cyc.id} value={cyc.id}>
                {cyc.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Áp suất: <strong className="text-cyan-400">{currentCycle.maxPressureMpa} MPa</strong> (Nhỏ hơn {currentCycle.turbomachineryFootprintReductionPercent}% so với hơi)
          </span>
        </div>

        {/* Depth Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Độ Sâu Giếng Khoan:
            </span>
            <span className="text-amber-300 font-mono font-bold">{(reservoirDepthM / 1000).toFixed(1)} km</span>
          </div>
          <input
            type="range"
            min={1500}
            max={5000}
            step={100}
            value={reservoirDepthM}
            onChange={(e) => setReservoirDepthM(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>1.5 km (Nông)</span>
            <span>3.5 km (Tiêu chuẩn EGS)</span>
            <span>5.0 km (Cực sâu)</span>
          </div>
        </div>

        {/* Production Temp Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Khai Thác:
            </span>
            <span className="text-rose-300 font-mono font-bold">{productionTempC} °C</span>
          </div>
          <input
            type="range"
            min={120}
            max={250}
            step={5}
            value={productionTempC}
            onChange={(e) => setProductionTempC(Number(e.target.value))}
            className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>120°C (Nhiệt thấp)</span>
            <span>200°C (Tiêu chuẩn)</span>
            <span>250°C (Nhiệt cực cao)</span>
          </div>
        </div>
      </div>

      {/* MODE 1: THERMOSIPHON BUOYANCY CIRCUIT */}
      {activeMode === 'THERMOSIPHON_BUOYANCY_CIRCUIT' && (
        <div className="flex flex-col gap-6">
          {/* Buoyancy Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Áp Suất Đẩy Đối Lưu (Buoyant Head)</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {buoyancyResult.buoyantPressureHeadMpa.toFixed(2)} MPa
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Chênh lệch trọng lượng cột CO₂ lạnh (giếng bơm: {buoyancyResult.injectionDensityKgPerM3.toFixed(0)} kg/m³) và CO₂ nóng (giếng khai thác: {buoyancyResult.productionDensityKgPerM3.toFixed(0)} kg/m³).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng Thái Tuần Hoàn</span>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {buoyancyResult.thermosiphonStatus === 'SELF_SUSTAINING'
                  ? 'TỰ DUY TRÌ 100% (Không Cần Bơm)'
                  : 'TRỢ LỰC BƠM PHỤ'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Công suất bơm bề mặt ký sinh: <strong className="text-emerald-400">{buoyancyResult.parasiticPumpingPowerFractionPercent.toFixed(1)}%</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lưu Lượng Đối Lưu Tự Nhiên</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {buoyancyResult.naturalCirculationFlowRateKgPerS.toFixed(1)} kg/s
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Độ nhớt sCO₂ thấp gấp 3 lần nước nóng giúp vận tốc xuyên qua vi khe nứt đạt tối đa.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nguy Cơ Đóng Cặn Silica</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                0.0% (Trơ Hoàn Toàn)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                sCO₂ là môi chất phi dung môi không hòa tan muối khoáng, loại trừ tắc nghẽn đường ống.
              </p>
            </div>
          </div>

          {/* SVG Diagram: Subsurface Closed Loop Geothermal Circuit */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              Sơ Đồ Chu Trình Đối Lưu sCO₂ Kín Trong Lòng Đất ({currentRock.name})
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 280" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Surface Plant */}
                <rect x="50" y="20" width="700" height="40" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="400" y="45" fill="#f43f5e" textAnchor="middle" fontSize="13" fontWeight="bold">
                  Nhà Máy Điện Mặt Đất sCO₂: Tuabin Xuyên Tới Hạn + Bình Làm Mát Đối Lưu ({currentCycle.name.split('(')[0]})
                </text>

                {/* Injection Well (Cold dense sCO2) */}
                <rect x="150" y="60" width="30" height="150" fill="#0284c7" />
                <text x="165" y="140" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" transform="rotate(-90 165 140)">
                  Giếng Bơm CO₂ Lạnh (35°C, 930 kg/m³)
                </text>
                <path d="M 165 80 L 165 190" stroke="#bae6fd" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Production Well (Hot buoyant sCO2) */}
                <rect x="620" y="60" width="30" height="150" fill="#e11d48" />
                <text x="635" y="140" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" transform="rotate(-90 635 140)">
                  Giếng Khai Thác CO₂ Nóng ({productionTempC}°C, 395 kg/m³)
                </text>
                <path d="M 635 190 L 635 80" stroke="#fecdd3" strokeWidth="3" />

                {/* Deep Geothermal Fractured Rock Reservoir */}
                <rect x="100" y="210" width="600" height="55" rx="8" fill="#451a03" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2" />
                <text x="400" y="235" fill="#fbbf24" textAnchor="middle" fontSize="13" fontWeight="bold">
                  Tầng Đá Nóng Sâu {(reservoirDepthM / 1000).toFixed(1)} km ({currentRock.name.split('(')[0]})
                </text>
                <text x="400" y="255" fill="#fde68a" textAnchor="middle" fontSize="10">
                  {currentRock.carbonationMinerals} • Áp suất đẩy nổi: {buoyancyResult.buoyantPressureHeadMpa.toFixed(1)} MPa
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: COMPACT SCO2 TURBOMACHINERY */}
      {activeMode === 'COMPACT_SCO2_TURBOMACHINERY' && (
        <div className="flex flex-col gap-6">
          {/* Mass Flow Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-orange-400" />
                Lưu Lượng Khối sCO₂ Đi Vào Tuabin:
              </span>
              <span className="text-orange-300 font-mono font-bold text-sm">{massFlowRateKgPerS} kg/s</span>
            </div>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={massFlowRateKgPerS}
              onChange={(e) => setMassFlowRateKgPerS(Number(e.target.value))}
              className="w-full accent-orange-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50 kg/s (Module nhỏ)</span>
              <span>180 kg/s (Tiêu chuẩn 10-15 MW)</span>
              <span>300 kg/s (Cụm lớn 25 MW)</span>
            </div>
          </div>

          {/* Turbomachinery Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công Suất Điện Ròng (Net Power)</span>
              <div className="text-2xl font-black text-orange-400 font-mono mt-1">
                {turbineResult.netElectricPowerMW.toFixed(2)} MW_e
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tổng công suất turbine: {turbineResult.grossTurbinePowerMW.toFixed(2)} MW_e.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Nhiệt Chu Trình</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {turbineResult.cycleThermalEfficiencyPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {currentCycle.vietnameseFeature}
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đường Kính Cánh Tuabin sCO₂</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {turbineResult.turbineRotorDiameterMeters.toFixed(2)} mét
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Siêu nhỏ gọn nhờ mật độ dòng khí sCO₂ cao &gt; 350 kg/m³.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">So Với Tuabin Hơi Tương Đương</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {turbineResult.equivalentSteamTurbineDiameterMeters.toFixed(2)} mét
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Nhỏ hơn <strong>5.5 lần</strong> đường kính, giảm 85% diện tích mặt bằng xây dựng nhà máy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GEO CARBON MINERALIZATION & PLANT ECONOMICS */}
      {activeMode === 'GEO_CARBON_MINERALIZATION' && (
        <div className="flex flex-col gap-6">
          {/* Capacity Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-emerald-400" />
                Quy Mô Công Suất Nhà Máy Địa Nhiệt:
              </span>
              <span className="text-emerald-300 font-mono font-bold text-sm">{plantPowerMW} MW_e</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={plantPowerMW}
              onChange={(e) => setPlantPowerMW(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 MW (Thử nghiệm công nghiệp)</span>
              <span>25 MW (Nhà máy điện thương mại EGS)</span>
              <span>100 MW (Trung tâm điện địa nhiệt vùng)</span>
            </div>
          </div>

          {/* Economics & Mineralization Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" />
                  Lượng CO₂ Khoáng Hóa Vĩnh Viễn Vào Đá
                </span>
                <div className="text-3xl font-black text-white font-mono mt-2">
                  {plantResult.annualMineralizedCarbonSequestrationTons.toLocaleString()} tấn CO₂/năm
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Phản ứng tạo đá Magnesite (MgCO₃) và Calcite (CaCO₃) bền vững hàng triệu năm.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Cơ chế: {currentRock.carbonationMinerals}
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-cyan-950/40 to-slate-900/80 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  Tiêu Thụ Nước Làm Mát
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono mt-2">
                  0.0 Lít / MWh
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  100% vòng lặp sCO₂ kín hoàn toàn, giải quyết bài toán cạn kiệt nước ngầm ở vùng khô hạn.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Sản lượng điện liên tục 24/7: <strong>{plantResult.annualElectricityGenerationGWh.toFixed(1)} GWh/năm</strong> (Hệ số tải 94%).
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900/80 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Giá Thành Điện San Bằng (LCOE)
                </span>
                <div className="text-3xl font-black text-amber-300 font-mono mt-2">
                  ${plantResult.levelizedCostOfElectricityUSDPerMWh}/MWh
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Rẻ hơn điện gió ngoài khơi ($85/MWh) và than đá gắn CCS ($110/MWh).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Giảm phát thải khí nhà kính: <strong>{plantResult.annualAvoidedCO2EmissionsTons.toLocaleString()} tấn CO₂/năm</strong>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
