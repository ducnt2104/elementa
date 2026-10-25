// src/components/visualizations/SodiumSulfurBatteryVisualizer.tsx
// Interactive Visualizer: High-Temperature Solid-State Sodium-Sulfur (Na-S) Battery
// Standards: NGK Utility Grid Benchmarks, Sodium Beta''-Alumina Solid Electrolyte (BASE), Polysulfide Phase Equilibria & IUPAC

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  ShieldCheck,
  Activity,
  TrendingUp,
  RotateCcw,
  Gauge,
  Layers,
  Factory,
  Sun,
  ThermometerSun,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import {
  BASE_ELECTROLYTES,
  BaseElectrolyteType,
  SodiumSulfurBatteryEngine
} from '../../domain/sodiumSulfurBatteryEngine';
import { sound } from '../../audio/soundEngine';

type NaSTabMode =
  | 'BASE_SOLID_ELECTROLYTE_PERCOLATION'
  | 'POLYSULFIDE_PHASE_EQUILIBRIA'
  | 'UTILITY_GRID_ENERGY_STORAGE';

export const SodiumSulfurBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<NaSTabMode>('POLYSULFIDE_PHASE_EQUILIBRIA');

  // Interactive controls
  const [electrolyteType, setElectrolyteType] = useState<BaseElectrolyteType>('BASE_TUBULAR_STANDARD');
  const [operatingTempC, setOperatingTempC] = useState<number>(320);
  const [stateOfChargePercent, setStateOfChargePercent] = useState<number>(75);
  const [currentDensityMaPerCm2, setCurrentDensityMaPerCm2] = useState<number>(120);
  const [dischargeMode, setDischargeMode] = useState<'DISCHARGE' | 'CHARGE'>('DISCHARGE');
  const [ambientTempC, setAmbientTempC] = useState<number>(25);

  // Utility plant sizing
  const [plantRatedPowerMw, setPlantRatedPowerMw] = useState<number>(10);
  const [durationHours, setDurationHours] = useState<number>(6);

  const currentElectrolyte = BASE_ELECTROLYTES[electrolyteType];

  // Cell performance calculation
  const perfResult = useMemo(() => {
    return SodiumSulfurBatteryEngine.calculateCellPerformance({
      electrolyteType,
      operatingTempC,
      stateOfChargePercent,
      currentDensityMaPerCm2,
      dischargeMode,
      ambientTempC
    });
  }, [electrolyteType, operatingTempC, stateOfChargePercent, currentDensityMaPerCm2, dischargeMode, ambientTempC]);

  // Utility plant calculation
  const plantResult = useMemo(() => {
    return SodiumSulfurBatteryEngine.calculateUtilityPlant(plantRatedPowerMw, durationHours);
  }, [plantRatedPowerMw, durationHours]);

  const handleModeChange = (mode: NaSTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectrolyteType('BASE_TUBULAR_STANDARD');
    setOperatingTempC(320);
    setStateOfChargePercent(75);
    setCurrentDensityMaPerCm2(120);
    setDischargeMode('DISCHARGE');
    setAmbientTempC(25);
    setPlantRatedPowerMw(10);
    setDurationHours(6);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-yellow-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Pin Thể Rắn Nhiệt Cao (High-Temperature Solid-State)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Hiệu Suất Coulomb 100% Tuyệt Đối
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Pin Natri - Lưu Huỳnh Nhiệt Cao (Sodium-Sulfur Na-S Battery)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Gốm rắn Beta''-Alumina (BASE) dẫn ion Na⁺ ở 300-350°C • Không tự phóng điện • Tích trữ lưới điện quy mô Multi-Megawatt
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('POLYSULFIDE_PHASE_EQUILIBRIA')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'POLYSULFIDE_PHASE_EQUILIBRIA'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Cân Bằng Pha Polysunfua</span>
          </button>

          <button
            onClick={() => handleModeChange('BASE_SOLID_ELECTROLYTE_PERCOLATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'BASE_SOLID_ELECTROLYTE_PERCOLATION'
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25 ring-1 ring-yellow-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gốm Rắn BASE & Cân Bằng Nhiệt</span>
          </button>

          <button
            onClick={() => handleModeChange('UTILITY_GRID_ENERGY_STORAGE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'UTILITY_GRID_ENERGY_STORAGE'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Trạm Lưu Trữ Lưới Điện Multi-MW</span>
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
        {/* Electrolyte Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Ống Gốm Rắn Điện Phân (BASE):
          </label>
          <select
            value={electrolyteType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrolyteType(e.target.value as BaseElectrolyteType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(BASE_ELECTROLYTES).map((elec) => (
              <option key={elec.id} value={elec.id}>
                {elec.name} ({elec.wallThicknessMm} mm)
              </option>
            ))}
          </select>
        </div>

        {/* Operating Temperature Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <ThermometerSun className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Vận Hành (T_cell):
            </span>
            <span className="font-mono font-bold text-rose-400">{operatingTempC}°C</span>
          </div>
          <input
            type="range"
            min={290}
            max={360}
            step={5}
            value={operatingTempC}
            onChange={(e) => setOperatingTempC(Number(e.target.value))}
            className="accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>290°C (Nóng chảy)</span>
            <span>Độ dẫn Na⁺: {perfResult.baseIonicConductivitySPerCm.toFixed(3)} S/cm</span>
            <span>360°C</span>
          </div>
        </div>

        {/* Current Density Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Mật Độ Dòng Điện j (mA/cm²):
            </span>
            <span className="font-mono font-bold text-yellow-400">{currentDensityMaPerCm2} mA/cm²</span>
          </div>
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={currentDensityMaPerCm2}
            onChange={(e) => setCurrentDensityMaPerCm2(Number(e.target.value))}
            className="accent-yellow-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>50 mA/cm²</span>
            <span>Tự giữ nhiệt Joule: {perfResult.thermalSelfSustaining ? 'ĐẠT' : 'CẦN SƯỞI'}</span>
            <span>300 mA/cm²</span>
          </div>
        </div>

        {/* Discharge / Charge Mode Toggle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400">Chế Độ Hoạt Động:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.playUiClick();
                setDischargeMode('DISCHARGE');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                dischargeMode === 'DISCHARGE'
                  ? 'bg-amber-500 text-slate-950 shadow ring-1 ring-amber-300'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Phóng Điện (Discharge)
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setDischargeMode('CHARGE');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                dischargeMode === 'CHARGE'
                  ? 'bg-sky-500 text-slate-950 shadow ring-1 ring-sky-300'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Nạp Điện (Charge)
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: POLYSULFIDE PHASE EQUILIBRIA */}
      {activeMode === 'POLYSULFIDE_PHASE_EQUILIBRIA' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Visualizer & Cell Schematic */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Cân Bằng Pha Natri Polysunfua &amp; Điện Áp Tế Bào
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30">
                Pha: {perfResult.polysulfideCompositionFormula}
              </span>
            </div>

            {/* SOC Slider */}
            <div className="flex flex-col gap-1.5 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Trạng Thái Nạp Điện (State of Charge - SOC):</span>
                <span className="font-mono font-bold text-amber-400">{stateOfChargePercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={stateOfChargePercent}
                onChange={(e) => setStateOfChargePercent(Number(e.target.value))}
                className="accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% (Xả tới hạn Na₂S₃)</span>
                <span>Vùng 2 Pha: 57% - 100% SOC (2.076 V)</span>
                <span>100% (Lưu huỳnh S nguyên chất)</span>
              </div>
            </div>

            {/* Output Meters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-amber-400">Điện Thế Hở Mạch (OCV)</span>
                <span className="text-xl font-black font-mono text-white">
                  {perfResult.openCircuitVoltageV.toFixed(3)} <span className="text-xs font-normal text-slate-400">V</span>
                </span>
                <span className="text-[10px] text-slate-400">{perfResult.polysulfidePhase === 'TWO_PHASE_S_NA2S5' ? 'Vùng cao nguyên 2 pha' : 'Vùng phân rã 1 pha'}</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-yellow-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-yellow-400">Điện Áp Hoạt Động (V_cell)</span>
                <span className="text-xl font-black font-mono text-white">
                  {perfResult.operatingCellVoltageV.toFixed(3)} <span className="text-xs font-normal text-slate-400">V</span>
                </span>
                <span className="text-[10px] text-slate-400">{dischargeMode === 'DISCHARGE' ? 'Đang xả điện' : 'Đang nạp điện'}</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-emerald-400">Hiệu Suất Coulombic</span>
                <span className="text-xl font-black font-mono text-emerald-400">
                  {perfResult.coulombicEfficiencyPercent.toFixed(1)} <span className="text-xs font-normal text-slate-400">%</span>
                </span>
                <span className="text-[10px] text-slate-400">Gốm BASE chặn 100% e⁻</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-cyan-400">Năng Lượng Khối Lượng</span>
                <span className="text-xl font-black font-mono text-white">
                  {perfResult.cellSpecificEnergyWhPerKg.toFixed(1)} <span className="text-xs font-normal text-slate-400">Wh/kg</span>
                </span>
                <span className="text-[10px] text-slate-400">{perfResult.cellVolumetricEnergyWhPerL.toFixed(0)} Wh/L thể tích</span>
              </div>
            </div>

            {/* Dynamic SVG Schematic of Tubular Cell */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mặt Cắt Ống Tế Bào Natri-Lưu Huỳnh (Tubular Na-S Cell Cross-Section):
              </span>
              <svg viewBox="0 0 750 200" className="w-full h-auto rounded-lg bg-slate-950">
                <defs>
                  <linearGradient id="sodiumLiquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient id="ceramicBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                  <linearGradient id="sulfurLiquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>

                {/* VACUUM THERMAL INSULATION CASING (OUTER) */}
                <rect x="30" y="20" width="690" height="160" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" strokeDasharray="8,4" />
                <text x="375" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  VỎ CÁCH NHIỆT CHÂN KHÔNG MLI (Vacuum Insulation Enclosure - T_ngoài = {ambientTempC}°C)
                </text>

                {/* POSITIVE CATHODE COMPARTMENT (MOLTEN SULFUR / POLYSULFIDE IN GRAPHITE FELT) */}
                <rect x="50" y="35" width="650" height="130" rx="8" fill="url(#sulfurLiquidGrad)" opacity="0.85" />
                <text x="120" y="55" fill="#fef3c7" fontWeight="bold" fontSize="11">
                  CỰC DƯƠNG CATHODE (Khối Nỉ Graphit Tẩm S Lỏng)
                </text>
                <text x="120" y="75" fill="#fde68a" fontSize="10" fontFamily="monospace">
                  5S + 2Na⁺ + 2e⁻ ⇌ Na₂S₅ ➔ Na₂S₃ (E⁰ = 2.08V)
                </text>
                <text x="120" y="145" fill="#fef08a" fontSize="10">
                  Thành phần hiện tại: {perfResult.polysulfideCompositionFormula}
                </text>

                {/* SOLID BETA''-ALUMINA CERAMIC TUBE (BASE) */}
                <rect x="260" y="30" width="230" height="140" rx="6" fill="url(#ceramicBaseGrad)" stroke="#eab308" strokeWidth="2" />
                <text x="375" y="50" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="11">
                  ỐNG GỐM RẮN BETA''-ALUMINA ({currentElectrolyte.wallThicknessMm} mm)
                </text>
                <text x="375" y="155" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">
                  DẪN ION Na⁺ (100% CÁCH ĐIỆN)
                </text>

                {/* LIQUID SODIUM ANODE CORE (INNER) */}
                <rect x="290" y="55" width="170" height="90" rx="4" fill="url(#sodiumLiquidGrad)" />
                <text x="375" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  NATRI NÓNG CHẢY (Na Lỏng)
                </text>
                <text x="375" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontFamily="monospace">
                  2Na ⇌ 2Na⁺ + 2e⁻ (E⁰ = -2.71 V)
                </text>
                <text x="375" y="125" textAnchor="middle" fill="#bae6fd" fontSize="9">
                  Cực Âm Anode Tâm Ống
                </text>

                {/* ION MIGRATION ARROWS */}
                <path d="M 290 100 L 250 100" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="4,2" />
                <path d="M 460 100 L 500 100" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="4,2" />
                <text x="210" y="104" fill="#fef08a" fontSize="10" fontWeight="bold">
                  Na⁺ ➔
                </text>
                <text x="505" y="104" fill="#fef08a" fontSize="10" fontWeight="bold">
                  ➔ Na⁺
                </text>
              </svg>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Đặc Thù Hóa Học Vùng Pha
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Vùng Cao Nguyên Hai Pha (57% - 100% SOC):</span>
                  Lưu huỳnh lỏng không tan trong natri pentasunfua (Na₂S₅). Hai chất lỏng cùng tồn tại ở trạng thái cân bằng nhiệt động, giữ điện áp không đổi ở 2.076 V.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-yellow-300 block mb-1">Giới Hạn Xả An Toàn Na₂S₃ (0% SOC):</span>
                  Pin luôn dừng xả ở mức Na₂S₃ (1.78 V) để ngăn chặn tạo thành Na₂S₂ có điểm nóng chảy cao (475°C) gây kết tủa chất rắn làm hỏng tế bào.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BASE SOLID ELECTROLYTE & THERMAL BALANCE */}
      {activeMode === 'BASE_SOLID_ELECTROLYTE_PERCOLATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Thermal & Electrolyte Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-yellow-400" />
                Độ Dẫn Ion Của Gốm Rắn BASE &amp; Cân Bằng Nhiệt Tự Duy Trì
              </h3>
              <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border ${
                perfResult.thermalSelfSustaining
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {perfResult.thermalSelfSustaining ? 'TỰ DUY TRÌ NHIỆT (Joule ≥ Thất Thoát)' : 'CẦN BẬT SƯỞI NGOÀI'}
              </span>
            </div>

            {/* Thermal Meters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-yellow-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-yellow-400">Nhiệt Sinh Nội Tại (Joule Heat)</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.jouleHeatGenerationWattsPerCell.toFixed(2)} <span className="text-sm font-normal text-slate-400">W/cell</span>
                </span>
                <span className="text-xs text-slate-400">I²·R_int khi nạp/xả {currentDensityMaPerCm2} mA/cm²</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-rose-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-rose-400">Tốc Độ Thoát Nhiệt Vỏ</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.heatLossRateWattsPerCell.toFixed(2)} <span className="text-sm font-normal text-slate-400">W/cell</span>
                </span>
                <span className="text-xs text-slate-400">Chênh nhiệt {operatingTempC - ambientTempC}°C</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-cyan-400">Độ Dẫn Ion BASE</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.baseIonicConductivitySPerCm.toFixed(3)} <span className="text-sm font-normal text-slate-400">S/cm</span>
                </span>
                <span className="text-xs text-slate-400">ASR_BASE = {(currentElectrolyte.wallThicknessMm * 0.1 / perfResult.baseIonicConductivitySPerCm).toFixed(3)} Ω·cm²</span>
              </div>
            </div>

            {/* Thermal Sustainability Comparison Card */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Cơ Chế Tự Cung Cấp Nhiệt Lượng (Thermal Self-Sustenance):
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhờ lớp cách nhiệt chân không nhiều lớp (MLI) siêu việt, nhiệt Joule sinh ra do nội trở tế bào trong chu kỳ phóng/nạp ban ngày hoàn toàn bù đắp lượng nhiệt thất thoát ra môi trường. Pin giữ nhiệt độ 320°C liên tục 24/7 mà không tốn thêm bất kỳ kWh điện sưởi phụ trợ nào khi vận hành đều đặn.
              </p>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-yellow-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Cấu Trúc Tinh Thể Beta''-Alumina
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Mặt Phẳng Dẫn Ion 2D:</span>
                  Khối spinel Al-O ngăn cách bởi các lớp dẫn ion Na⁺ mật độ cao. Ion natri di chuyển gần như tự do không có rào cản năng lượng ở 320°C (E_a = {currentElectrolyte.activationEnergyEv} eV).
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Cách Điện Tuyệt Đối:</span>
                  Độ dẫn điện tử nhỏ hơn 10⁻¹⁰ S/cm, đảm bảo 0.0% tự phóng điện khi để chờ trong nhiều tháng.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UTILITY GRID ENERGY STORAGE */}
      {activeMode === 'UTILITY_GRID_ENERGY_STORAGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Grid Plant Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-400" />
                Quy Hoạch Trạm Lưu Trữ Lưới Điện Quốc Gia ({plantResult.plantRatedPowerMw} MW / {plantResult.totalEnergyMwh} MWh)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
                Thời Lượng: {plantResult.durationHours} Giờ Xả
              </span>
            </div>

            {/* Sizing Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Công Suất Phát Điện Lưới (MW):</span>
                  <span className="font-mono font-bold text-emerald-400">{plantRatedPowerMw} MW</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={plantRatedPowerMw}
                  onChange={(e) => setPlantRatedPowerMw(Number(e.target.value))}
                  className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Thời Lượng Xả Định Mức (Giờ):</span>
                  <span className="font-mono font-bold text-emerald-400">{durationHours} Giờ</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={10}
                  step={1}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Plant Capacity & Material Output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-emerald-400">Tổng Vốn Đầu Tư (CapEx)</span>
                <span className="text-2xl font-black font-mono text-white">
                  ${plantResult.totalCapExMillionDollars.toFixed(1)} <span className="text-sm font-normal text-slate-400">Triệu USD</span>
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  ${plantResult.capitalCostDollarsPerKwh} / kWh trọn gói
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-400">Khối Lượng Hoạt Chất</span>
                <span className="text-xl font-black font-mono text-white">
                  {plantResult.totalMoltenSodiumTons.toFixed(1)} <span className="text-xs font-normal text-slate-400">tấn Na</span> / {plantResult.totalSulfurTons.toFixed(1)} <span className="text-xs font-normal text-slate-400">tấn S</span>
                </span>
                <span className="text-xs text-slate-400">Số tế bào: {plantResult.totalCellCount.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-cyan-400">Diện Tích Chiếm Đất</span>
                <span className="text-2xl font-black font-mono text-white">
                  {plantResult.footprintSquareMeters} <span className="text-sm font-normal text-slate-400">m²</span>
                </span>
                <span className="text-xs text-slate-400">Thiết kế container mô đun</span>
              </div>
            </div>

            {/* Guarantee and Application Badges */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300">Chi Phí Lưu Trữ Đơn Vị (LCOS):</span>
                <span className="text-base font-black font-mono text-emerald-400">
                  ${plantResult.annualLevelizedCostDollarsPerKwhCycle} / kWh-chu kỳ
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 leading-relaxed">
                  Bảo hành vận hành thương mại <strong>{plantResult.calendarLifeYearsGuaranteed} năm liên tục</strong> (hơn 5,500 chu kỳ nạp/xả sâu 100% DOD); công nghệ đã được chứng minh qua hơn 4 GWh lắp đặt thực tế trên toàn cầu.
                </span>
              </div>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Factory className="w-4 h-4" />
                Ứng Dụng Lưới Điện Quốc Gia
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Cắt Đỉnh Tải Giờ Cao Điểm:</span>
                  Nạp điện vào ban đêm khi thừa điện gió giá rẻ, phát công suất lớn suốt 6-8 giờ cao điểm buổi tối giúp giảm áp lực đầu tư đường dây truyền tải.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Lưới Điện Đảo Cô Lập:</span>
                  Giải pháp năng lượng nền hoàn hảo cho các hải đảo và vùng sâu, thay thế hoàn toàn các tổ máy diesel phát điện đắt đỏ và ô nhiễm.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
