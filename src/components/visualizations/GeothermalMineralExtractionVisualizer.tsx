// src/components/visualizations/GeothermalMineralExtractionVisualizer.tsx
// Interactive Visualizer: Geothermal Thermochemical Brine & Direct Mineral Extraction Engine
// Conforms to: GEA / IGA Geothermal Standards, Direct Lithium Extraction (DLE), Fournie & Marshall Silica Kinetics & Vietnam GDPT 2018

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Sparkles,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Car,
  Leaf,
  Sliders,
  BarChart3,
  TrendingDown,
  RefreshCw,
  Gauge,
  Factory
} from 'lucide-react';
import {
  GeothermalSiteId,
  GeothermalCycleType,
  GEOTHERMAL_SITES_CATALOG,
  calculateSilicaSolubilityPpm,
  evaluateSilicaScalingRisk,
  calculateGeothermalPower,
  calculateDirectMineralExtraction,
  calculateGeothermalDesalination,
  LITHIUM_MINING_BENCHMARKS
} from '../../domain/geothermalMineralExtractionEngine';
import { sound } from '../../audio/soundEngine';

type GeothermalTabMode =
  | 'GEOTHERMAL_PLANT_FLOWSHEET'
  | 'DLE_MINERAL_YIELD_SIMULATOR'
  | 'SILICA_SCALING_AND_GREEN_MINING_BENCHMARK';

export const GeothermalMineralExtractionVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GeothermalTabMode>('GEOTHERMAL_PLANT_FLOWSHEET');

  // Mode 1 state: Site & Power Cycle
  const [selectedSiteId, setSelectedSiteId] = useState<GeothermalSiteId>('SALTON_SEA_USA');
  const [cycleType, setCycleType] = useState<GeothermalCycleType>('DOUBLE_FLASH');

  // Mode 2 state: DLE Yield Simulator
  const [flowRateKgS, setFlowRateKgS] = useState<number>(450);
  const [lithiumPpm, setLithiumPpm] = useState<number>(240);
  const [dleEfficiencyPct, setDleEfficiencyPct] = useState<number>(90.0);
  const [operatingHours, setOperatingHours] = useState<number>(8000);

  // Mode 3 state: Silica Scaling Kinetics
  const [silicaPpmInput, setSilicaPpmInput] = useState<number>(550);
  const [exitTempCInput, setExitTempCInput] = useState<number>(75);

  const selectedSite = useMemo(() => {
    return GEOTHERMAL_SITES_CATALOG[selectedSiteId] || GEOTHERMAL_SITES_CATALOG.SALTON_SEA_USA;
  }, [selectedSiteId]);

  // Sync inputs when site changes
  const handleSiteSelect = (siteId: GeothermalSiteId) => {
    sound.playUiClick();
    setSelectedSiteId(siteId);
    const site = GEOTHERMAL_SITES_CATALOG[siteId];
    if (site) {
      setFlowRateKgS(site.typicalFlowRateKgPerSec);
      setLithiumPpm(site.lithiumPpm);
      setSilicaPpmInput(site.silicaPpm);
    }
  };

  const handleModeSwitch = (mode: GeothermalTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  // Calculations for Mode 1
  const plantPower = useMemo(() => {
    return calculateGeothermalPower(flowRateKgS, selectedSite.temperatureC, cycleType);
  }, [flowRateKgS, selectedSite, cycleType]);

  // Calculations for Mode 2
  const dleYield = useMemo(() => {
    return calculateDirectMineralExtraction(
      flowRateKgS,
      lithiumPpm,
      selectedSite.rubidiumPpm,
      selectedSite.cesiumPpm,
      dleEfficiencyPct,
      operatingHours
    );
  }, [flowRateKgS, lithiumPpm, selectedSite, dleEfficiencyPct, operatingHours]);

  const medDesal = useMemo(() => {
    return calculateGeothermalDesalination(plantPower.thermalPowerAvailableMWth, 8.5);
  }, [plantPower]);

  // Calculations for Mode 3
  const silicaScaling = useMemo(() => {
    return evaluateSilicaScalingRisk(silicaPpmInput, exitTempCInput);
  }, [silicaPpmInput, exitTempCInput]);

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-emerald-500/20 text-orange-400 border border-orange-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Địa Nhiệt Siêu Nóng & Chiết Xuất Khoáng Sản Trực Tiếp (DLE)
              </h2>
              <p className="text-xs text-slate-400">
                Tích hợp phát điện địa nhiệt, chiết xuất Lithium sạch cho pin xe điện, khử mặn MED & kiểm soát đóng cặn Silica
              </p>
            </div>
          </div>
        </div>

        {/* Tab Mode Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeSwitch('GEOTHERMAL_PLANT_FLOWSHEET')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'GEOTHERMAL_PLANT_FLOWSHEET'
                ? 'bg-orange-600/30 border border-orange-500 text-orange-300 shadow-md shadow-orange-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Sơ Đồ Dây Chuyền & Phát Điện
          </button>
          <button
            onClick={() => handleModeSwitch('DLE_MINERAL_YIELD_SIMULATOR')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'DLE_MINERAL_YIELD_SIMULATOR'
                ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            Mô Phỏng Lithium & Pin EV
          </button>
          <button
            onClick={() => handleModeSwitch('SILICA_SCALING_AND_GREEN_MINING_BENCHMARK')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'SILICA_SCALING_AND_GREEN_MINING_BENCHMARK'
                ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Đóng Cặn Silica & Khai Thác Xanh
          </button>
        </div>
      </div>

      {/* MODE 1: GEOTHERMAL PLANT FLOWSHEET */}
      {activeMode === 'GEOTHERMAL_PLANT_FLOWSHEET' && (
        <div className="space-y-6">
          {/* Site Selector & Cycle Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Chọn Mỏ Địa Nhiệt Toàn Cầu:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {(Object.keys(GEOTHERMAL_SITES_CATALOG) as GeothermalSiteId[]).map(sId => {
                  const s = GEOTHERMAL_SITES_CATALOG[sId];
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSiteSelect(s.id)}
                      className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                        selectedSiteId === s.id
                          ? 'bg-orange-950/40 border-orange-500 text-orange-200'
                          : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-[13px]">{s.name.split('(')[0].trim()}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {s.temperatureC}°C | <span className="text-emerald-400 font-semibold">{s.lithiumPpm} mg/L Li⁺</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cycle Selector */}
            <div className="space-y-3 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Chu Trình Nhiệt Điện:
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'SINGLE_FLASH', label: 'Chớp Hơi Đơn Cấp (Single-Flash)' },
                    { id: 'DOUBLE_FLASH', label: 'Chớp Hơi Hai Cấp (Double-Flash)' },
                    { id: 'BINARY_ORC', label: 'Chu Trình Nhị Phân (Binary ORC)' },
                    { id: 'COMBINED_FLASH_BINARY', label: 'Lai Ghép Flash + Binary' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        sound.playUiClick();
                        setCycleType(c.id as GeothermalCycleType);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all border ${
                        cycleType === c.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                Hiệu suất Carnot: <b className="text-amber-400">{plantPower.carnotEfficiencyPct}%</b>
              </div>
            </div>
          </div>

          {/* Plant Flowsheet Diagram (SVG) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 px-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-orange-400" />
                Sơ Đồ Dây Chuyền Khép Kín: Giếng Khai Thác → Tua-bin Phát Điện → Trạm DLE → Hoàn Lưu Vỉa Ngầm
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Hoàn lưu 98.5% vỉa chứa ngầm (Zero-Surface Waste)
              </span>
            </div>

            <div className="relative overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-64 select-none">
                <defs>
                  <linearGradient id="brineHeatGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                  <linearGradient id="dleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Subterranean Magma / Reservoir */}
                <rect x="20" y="210" width="800" height="60" fill="#450a0a" stroke="#7f1d1d" rx="6" />
                <text x="420" y="235" fill="#fca5a5" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Vỉa Nước Nóng Địa Nhiệt Sâu ({selectedSite.wellDepthM}m) • Nhiệt độ vỉa: {selectedSite.temperatureC}°C • TDS: {selectedSite.tdsPpm.toLocaleString()} mg/L
                </text>
                <text x="420" y="255" fill="#f87171" fontSize="10" textAnchor="middle">
                  Dòng nước muối siêu bão hòa khoáng chất (Li⁺, Rb⁺, Cs⁺, K⁺, SiO₂)
                </text>

                {/* Production Well (Upward pipe) */}
                <rect x="80" y="100" width="24" height="110" fill="url(#brineHeatGrad)" stroke="#b91c1c" strokeWidth="1.5" />
                <text x="92" y="155" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(-90 92 155)" fontWeight="bold">
                  Giếng Khai Thác ({flowRateKgS} kg/s)
                </text>

                {/* Flash Separator / Turbine */}
                <g transform="translate(140, 40)">
                  <rect x="0" y="0" width="130" height="110" fill="#1e293b" stroke="#f97316" strokeWidth="2" rx="8" />
                  <text x="65" y="24" fill="#fb923c" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Tua-Bin & Máy Phát
                  </text>
                  <text x="65" y="42" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="black">
                    {plantPower.netExportPowerMWe} MWe
                  </text>
                  <text x="65" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    Điện Sạch Xuất Lưới
                  </text>
                  <rect x="15" y="72" width="100" height="25" fill="#0f172a" rx="4" />
                  <text x="65" y="88" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Tự cấp 100% điện DLE
                  </text>
                </g>

                {/* Pipe from Well to Turbine */}
                <path d="M 104 110 L 140 110" fill="none" stroke="#f97316" strokeWidth="4" />

                {/* Pipe from Turbine to DLE Plant */}
                <path d="M 270 110 L 330 110" fill="none" stroke="#f97316" strokeWidth="4" />

                {/* DLE Plant Unit */}
                <g transform="translate(330, 30)">
                  <rect x="0" y="0" width="160" height="130" fill="#064e3b" stroke="#10b981" strokeWidth="2" rx="8" />
                  <text x="80" y="24" fill="#6ee7b7" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Trạm DLE Hấp Phụ Ion
                  </text>
                  <text x="80" y="40" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                    Rây Titanat Li₂TiO₃ / MnO₂
                  </text>
                  <rect x="15" y="52" width="130" height="32" fill="#022c22" rx="4" />
                  <text x="80" y="68" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
                    +{dleYield.annualLceMetricTons.toLocaleString()} tấn LCE/năm
                  </text>
                  <text x="80" y="79" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                    Đủ cho {dleYield.equivalentEvBatteriesCount.toLocaleString()} xe điện EV
                  </text>
                  <text x="80" y="104" fill="#e2e8f0" fontSize="9" textAnchor="middle">
                    Thu hồi Li⁺: <b className="text-emerald-400">{dleEfficiencyPct}%</b>
                  </text>
                  <text x="80" y="118" fill="#fcd34d" fontSize="9" textAnchor="middle">
                    +Rb ({dleYield.annualRubidiumKg.toLocaleString()} kg) & Cs
                  </text>
                </g>

                {/* Pipe to MED Desalination Unit */}
                <path d="M 490 110 L 540 110" fill="none" stroke="#38bdf8" strokeWidth="4" />

                {/* MED Desalination & Heat Recovery Unit */}
                <g transform="translate(540, 40)">
                  <rect x="0" y="0" width="130" height="110" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" rx="8" />
                  <text x="65" y="24" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Khử Mặn MED Nước Ngọt
                  </text>
                  <text x="65" y="44" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="black">
                    {medDesal.freshwaterDailyM3.toLocaleString()} m³/ngày
                  </text>
                  <text x="65" y="62" fill="#bae6fd" fontSize="9" textAnchor="middle">
                    Nước siêu sạch TDS 5 ppm
                  </text>
                  <rect x="15" y="74" width="100" height="24" fill="#082f49" rx="4" />
                  <text x="65" y="90" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                    Cấp điện phân H₂ xanh
                  </text>
                </g>

                {/* Pipe to Reinjection Well */}
                <path d="M 670 110 L 730 110" fill="none" stroke="#0284c7" strokeWidth="4" />

                {/* Reinjection Well */}
                <rect x="730" y="100" width="24" height="110" fill="#0369a1" stroke="#0284c7" strokeWidth="1.5" />
                <text x="742" y="155" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(-90 742 155)" fontWeight="bold">
                  Giếng Bơm Ép Hoàn Lưu
                </text>
              </svg>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Công suất phát điện ròng:</span>
                <span className="font-bold text-amber-400 text-sm">{plantPower.netExportPowerMWe} MWe</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Nhiệt thải cấp DLE & MED:</span>
                <span className="font-bold text-orange-400 text-sm">{plantPower.thermalPowerAvailableMWth} MWth</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tự dùng bơm ép & quạt:</span>
                <span className="font-bold text-slate-300 text-sm">{plantPower.parasiticPumpingPowerMWe} MWe</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Nhiệt độ nước xả hoàn lưu:</span>
                <span className="font-bold text-cyan-400 text-sm">{plantPower.brineExitTemperatureC}°C</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: DLE MINERAL YIELD SIMULATOR */}
      {activeMode === 'DLE_MINERAL_YIELD_SIMULATOR' && (
        <div className="space-y-6">
          {/* Sliders for flow, Li concentration, efficiency, hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Lưu Lượng Nước Muối:</span>
                <span className="text-amber-400 font-bold">{flowRateKgS} kg/s</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={flowRateKgS}
                onChange={e => {
                  sound.playUiClick();
                  setFlowRateKgS(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>50 kg/s (1 giếng)</span>
                <span>800 kg/s (Cụm mỏ)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Nồng Độ Li⁺ (mg/L):</span>
                <span className="text-emerald-400 font-bold">{lithiumPpm} mg/L</span>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={lithiumPpm}
                onChange={e => {
                  sound.playUiClick();
                  setLithiumPpm(parseFloat(e.target.value));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>45 mg/L (Bình Châu)</span>
                <span>240 mg/L (Salton)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Hiệu Suất Hấp Phụ DLE:</span>
                <span className="text-cyan-400 font-bold">{dleEfficiencyPct}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                step="1"
                value={dleEfficiencyPct}
                onChange={e => {
                  sound.playUiClick();
                  setDleEfficiencyPct(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>75% (Tiêu chuẩn)</span>
                <span>95%+ (Công nghệ cao)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Thời Gian Vận Hành:</span>
                <span className="text-rose-400 font-bold">{operatingHours} h/năm</span>
              </div>
              <input
                type="range"
                min="6000"
                max="8760"
                step="200"
                value={operatingHours}
                onChange={e => {
                  sound.playUiClick();
                  setOperatingHours(parseFloat(e.target.value));
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>7,000 h (Bảo dưỡng)</span>
                <span>8,760 h (24/7/365)</span>
              </div>
            </div>
          </div>

          {/* DLE Metrics Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Sản Lượng LCE (Li₂CO₃)</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {dleYield.annualLceMetricTons.toLocaleString()} <span className="text-sm font-normal text-emerald-400">tấn/năm</span>
              </div>
              <div className="text-xs text-slate-400">
                Tương đương <span className="text-slate-200 font-semibold">{dleYield.annualLiOhMonohydrateTons.toLocaleString()} tấn</span> LiOH·H₂O pin
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Cung Ứng Pin Xe Điện EV</span>
                <Car className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">
                {dleYield.equivalentEvBatteriesCount.toLocaleString()} <span className="text-sm font-normal text-amber-400">bộ/năm</span>
              </div>
              <div className="text-xs text-slate-400">
                Dựa trên định mức 55 kg LCE cho pack 75 kWh (Tesla/VinFast)
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Khử Mặn Nước Ngọt MED</span>
                <Droplets className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {medDesal.freshwaterDailyM3.toLocaleString()} <span className="text-sm font-normal text-cyan-400">m³/ngày</span>
              </div>
              <div className="text-xs text-slate-400">
                Đạt <span className="text-cyan-200 font-semibold">{medDesal.freshwaterAnnualM3.toLocaleString()} m³/năm</span> nước siêu tinh khiết
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Khoáng Sản Chiến Lược Phụ</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-300">
                {dleYield.annualRubidiumKg.toLocaleString()} <span className="text-sm font-normal text-purple-400">kg Rb</span>
              </div>
              <div className="text-xs text-slate-400">
                Đồng sinh <span className="text-purple-200 font-semibold">{dleYield.annualCesiumKg.toLocaleString()} kg</span> Cesium cho quang học
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SILICA SCALING & GREEN MINING BENCHMARK */}
      {activeMode === 'SILICA_SCALING_AND_GREEN_MINING_BENCHMARK' && (
        <div className="space-y-6">
          {/* Interactive Silica Scaling Kinetics */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-400" />
              Động Học Cân Bằng Hòa Tan & Nguy Cơ Đóng Cặn Silica (Fournie & Marshall 1982)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nồng độ SiO₂ hòa tan:</span>
                  <span className="text-amber-400 font-bold">{silicaPpmInput} mg/L</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="700"
                  step="25"
                  value={silicaPpmInput}
                  onChange={e => {
                    sound.playUiClick();
                    setSilicaPpmInput(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Nhiệt độ nước xả đáy:</span>
                  <span className="text-cyan-400 font-bold">{exitTempCInput}°C</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="5"
                  value={exitTempCInput}
                  onChange={e => {
                    sound.playUiClick();
                    setExitTempCInput(parseFloat(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Silica Assessment Result */}
            <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
              silicaScaling.scalingRiskCategory === 'SAFE_SUBSATURATED'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : silicaScaling.scalingRiskCategory === 'MODERATE_METASTABLE'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              {silicaScaling.scalingRiskCategory === 'SAFE_SUBSATURATED' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <div className="flex justify-between items-center font-bold text-sm">
                  <span>
                    Chỉ Số Bão Hòa Silica (SSI):{' '}
                    <span className="text-base">{silicaScaling.silicaSaturationIndex}</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-slate-900 border border-slate-700">
                    {silicaScaling.scalingRiskCategory}
                  </span>
                </div>
                <div>{silicaScaling.mitigationAction}</div>
                <div className="flex flex-wrap gap-4 text-[11px] pt-1 text-slate-300">
                  <span>Độ tan bão hòa C_sat(SiO₂): <b>{silicaScaling.equilibriumSilicaSolubilityPpm} mg/L</b></span>
                  {silicaScaling.recommendedAcidDosingPpm > 0 && (
                    <span className="text-amber-300">
                      Lượng axit châm khuyến nghị: <b>{silicaScaling.recommendedAcidDosingPpm} ppm</b>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Mining Comparison Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              Ma Trận So Sánh Tác Động Môi Trường 3 Phương Pháp Khai Thác Lithium
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {LITHIUM_MINING_BENCHMARKS.map(bench => (
                <div
                  key={bench.methodName}
                  className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-sm text-emerald-300">{bench.methodName}</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Phát thải carbon CO₂:</span>
                        <span className="font-bold text-rose-400">{bench.co2EmissionsKgPerKgLiOH} kg CO₂/kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tiêu thụ nước sạch:</span>
                        <span className="font-bold text-cyan-400">{bench.waterConsumedM3PerTonLce} m³/tấn LCE</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Thời gian chiết xuất:</span>
                        <span className="font-semibold text-amber-300">{bench.extractionCycleTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tỷ lệ thu hồi quặng:</span>
                        <span className="font-semibold text-emerald-300">{bench.recoveryYieldPct}%</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                      {bench.description}
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-700/50 pt-2 italic">
                    Diện tích chiếm dụng: {bench.landUseM2PerTonLce} m²/tấn LCE
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
