// src/components/visualizations/ElectrostaticSupercapacitorVisualizer.tsx
// Interactive Visualizer: Electrostatic Supercapacitor Energy Storage with Graphene Hybrid Electrodes
// Standards: IUPAC Electrochemistry, Helmholtz Double-Layer & Pseudocapacitance, GDPT 2018 Physics & Fast Pulse Power

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Gauge,
  Layers,
  Activity,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Factory,
  Timer,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Flame,
  DollarSign,
  Compass,
  TrainTrack
} from 'lucide-react';
import {
  SUPERCAPACITOR_ELECTROLYTES,
  SUPERCAPACITOR_ELECTRODES,
  SupercapacitorElectrolyteType,
  SupercapacitorElectrodeType,
  calculateRagonePerformance,
  sizeRegenerativeBrakingSystem
} from '../../domain/electrostaticSupercapacitorEngine';
import { sound } from '../../audio/soundEngine';

type ScTabMode =
  | 'RAGONE_ENERGY_POWER_MAP'
  | 'PULSE_POWER_ELECTRODYNAMICS'
  | 'REGENERATIVE_BRAKING_TRANSIT';

export const ElectrostaticSupercapacitorVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ScTabMode>('RAGONE_ENERGY_POWER_MAP');

  // Interactive controls
  const [electrodeType, setElectrodeType] = useState<SupercapacitorElectrodeType>('HIERARCHICAL_GRAPHENE');
  const [electrolyteType, setElectrolyteType] = useState<SupercapacitorElectrolyteType>('ORGANIC_ACN_TEABF4');
  const [dischargeTimeSeconds, setDischargeTimeSeconds] = useState<number>(5.0);
  const [transitVehicle, setTransitVehicle] = useState<'METRO_TRAIN' | 'HIGH_SPEED_RAIL' | 'ELECTRIC_BUS'>('METRO_TRAIN');

  const currentElectrode = SUPERCAPACITOR_ELECTRODES[electrodeType];
  const currentElectrolyte = SUPERCAPACITOR_ELECTROLYTES[electrolyteType];

  // Ragone performance calculation
  const ragoneResult = useMemo(() => {
    return calculateRagonePerformance(
      electrodeType,
      electrolyteType,
      dischargeTimeSeconds
    );
  }, [electrodeType, electrolyteType, dischargeTimeSeconds]);

  // Regenerative braking sizing
  const brakingResult = useMemo(() => {
    return sizeRegenerativeBrakingSystem(
      transitVehicle,
      electrodeType,
      electrolyteType
    );
  }, [transitVehicle, electrodeType, electrolyteType]);

  const handleModeChange = (mode: ScTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectrodeType('HIERARCHICAL_GRAPHENE');
    setElectrolyteType('ORGANIC_ACN_TEABF4');
    setDischargeTimeSeconds(5.0);
    setTransitVehicle('METRO_TRAIN');
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-yellow-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Siêu Tụ Điện Tĩnh Điện &amp; Điện Dung Giả (Supercapacitor EDLC)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                &gt; 100 kW/kg Công Suất Xung • 1.000.000 Chu Kỳ
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Graphene Electrostatic Supercapacitor Energy Storage
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Lớp điện kép Helmholtz &amp; Graphene xốp đa cấp 3D • Phóng nạp xung mili-giây • Thu hồi năng lượng hãm phanh tàu điện Metro &amp; xe Bus
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('RAGONE_ENERGY_POWER_MAP')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'RAGONE_ENERGY_POWER_MAP'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Bản Đồ Ragone Năng Lượng</span>
          </button>

          <button
            onClick={() => handleModeChange('PULSE_POWER_ELECTRODYNAMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'PULSE_POWER_ELECTRODYNAMICS'
                ? 'bg-yellow-600 text-obsidian shadow-lg shadow-yellow-600/25 ring-1 ring-yellow-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Xung Điện Công Suất Cực Đại</span>
          </button>

          <button
            onClick={() => handleModeChange('REGENERATIVE_BRAKING_TRANSIT')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'REGENERATIVE_BRAKING_TRANSIT'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Thu Hồi Phanh Tàu Điện (Transit)</span>
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
        {/* Electrode Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Vật Liệu Cực Graphene / Carbon:
          </label>
          <select
            value={electrodeType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrodeType(e.target.value as SupercapacitorElectrodeType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(SUPERCAPACITOR_ELECTRODES).map((elec) => (
              <option key={elec.id} value={elec.id}>
                {elec.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Diện tích riêng BET: <strong className="text-emerald-400">{currentElectrode.betSurfaceAreaM2PerG} m²/g</strong> ({currentElectrode.gravimetricCapacitanceFPerG} F/g)
          </span>
        </div>

        {/* Electrolyte Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-yellow-400" />
            Dung Dịch Điện Ly (Electrolyte):
          </label>
          <select
            value={electrolyteType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrolyteType(e.target.value as SupercapacitorElectrolyteType);
            }}
            className="bg-slate-800 text-xs font-bold text-yellow-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
          >
            {Object.values(SUPERCAPACITOR_ELECTROLYTES).map((ely) => (
              <option key={ely.id} value={ely.id}>
                {ely.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Điện áp danh định: <strong className="text-cyan-400">{currentElectrolyte.nominalCellVoltageV} V</strong> (Độ dẫn: {currentElectrolyte.ionicConductivityMsPerCm} mS/cm)
          </span>
        </div>

        {/* Discharge Time Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              Thời Gian Phóng Điện (Xả):
            </span>
            <span className="text-cyan-300 font-mono font-bold">{dischargeTimeSeconds.toFixed(1)} giây</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={30.0}
            step={0.1}
            value={dischargeTimeSeconds}
            onChange={(e) => setDischargeTimeSeconds(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.1s (Xung cực nhanh)</span>
            <span>5.0s (Chuẩn hãm phanh)</span>
            <span>30.0s (Xả êm)</span>
          </div>
        </div>

        {/* Transit Vehicle Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            Phương Tiện Giao Thông Ứng Dụng:
          </label>
          <select
            value={transitVehicle}
            onChange={(e) => {
              sound.playUiClick();
              setTransitVehicle(e.target.value as any);
            }}
            className="bg-slate-800 text-xs font-bold text-emerald-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="METRO_TRAIN">Tàu Điện Ngầm Metro (220 tấn, 80 km/h)</option>
            <option value="HIGH_SPEED_RAIL">Đường Sắt Cao Tốc HSR (420 tấn, 160 km/h)</option>
            <option value="ELECTRIC_BUS">Xe Bus Điện Đô Thị (18 tấn, 50 km/h)</option>
          </select>
          <span className="text-[10px] text-slate-400">
            Tuổi thọ: <strong className="text-emerald-400">{currentElectrode.cycleLifeMillionCycles} triệu chu kỳ</strong> (&gt; 90% dung lượng)
          </span>
        </div>
      </div>

      {/* MODE 1: RAGONE ENERGY-POWER MAP */}
      {activeMode === 'RAGONE_ENERGY_POWER_MAP' && (
        <div className="flex flex-col gap-6">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mật Độ Năng Lượng Đóng Gói</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {ragoneResult.specificEnergyWhPerKg.toFixed(1)} Wh/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                E = (1/2)·C·V² với điện áp làm việc {currentElectrolyte.nominalCellVoltageV} V.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mật Độ Công Suất Xả ({dischargeTimeSeconds}s)</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {ragoneResult.specificPowerKWPerKg.toFixed(1)} kW/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Cao gấp 20 lần pin Lithium-ion tiêu chuẩn (~0.8 kW/kg).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công Suất Phối Trở Tối Đa (Matched)</span>
              <div className="text-2xl font-black text-yellow-400 font-mono mt-1">
                {ragoneResult.maxMatchedImpedancePowerKWPerKg.toFixed(0)} kW/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                P_max = V² / (4·ESR) với điện trở nội cực thấp ({currentElectrolyte.internalResistanceEsrMilliohms} mΩ).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tuổi Thọ Chu Kỳ Phóng Nạp</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {currentElectrode.cycleLifeMillionCycles.toFixed(1)} Triệu
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Lưu trữ tĩnh điện không biến đổi pha, tuổi thọ gấp 500 lần pin Lithium.
              </p>
            </div>
          </div>

          {/* SVG Diagram: Helmholtz Double Layer Schematic */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Cơ Chế Lớp Điện Kép Helmholtz &amp; Graphene Xốp Đa Cấp ({currentElectrode.materialComposition})
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Positive Current Collector & Electrode */}
                <rect x="50" y="30" width="220" height="160" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="160" y="55" fill="#f59e0b" textAnchor="middle" fontSize="13" fontWeight="bold">Cực Dương: {currentElectrode.name.split(' ')[0]}</text>
                <text x="160" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="10">Hấp phụ tĩnh điện Anion (BF₄⁻ / TFSI⁻)</text>
                <text x="160" y="110" fill="#fde68a" textAnchor="middle" fontSize="11" fontWeight="bold">Khoảng cách lớp kép: d ~ 0.5 - 1.0 nm</text>
                <text x="160" y="135" fill="#94a3b8" textAnchor="middle" fontSize="10">Điện trường: E ~ 10⁹ V/m</text>
                <text x="160" y="165" fill="#f59e0b" textAnchor="middle" fontSize="11" fontWeight="bold">Điện tích dương (+) trên mạng carbon</text>

                {/* Electrolyte & Separator */}
                <rect x="290" y="30" width="220" height="160" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="400" y="55" fill="#38bdf8" textAnchor="middle" fontSize="12" fontWeight="bold">{currentElectrolyte.chemicalFormula}</text>
                <text x="400" y="80" fill="#bae6fd" textAnchor="middle" fontSize="10">Dung Dịch Điện Ly Siêu Dẫn</text>
                <text x="400" y="110" fill="#fde68a" textAnchor="middle" fontSize="13" fontWeight="bold">BF₄⁻ ➔ ➔ ➔ | ⬅ ⬅ ⬅ TEA⁺</text>
                <text x="400" y="140" fill="#cbd5e1" textAnchor="middle" fontSize="10">Độ dẫn ion: {currentElectrolyte.ionicConductivityMsPerCm} mS/cm</text>
                <text x="400" y="165" fill="#94a3b8" textAnchor="middle" fontSize="10">Không xảy ra phản ứng hóa học pha rắn</text>

                {/* Negative Current Collector & Electrode */}
                <rect x="530" y="30" width="220" height="160" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="640" y="55" fill="#34d399" textAnchor="middle" fontSize="13" fontWeight="bold">Cực Âm: {currentElectrode.name.split(' ')[0]}</text>
                <text x="640" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="10">Hấp phụ tĩnh điện Cation (TEA⁺ / Na⁺)</text>
                <text x="640" y="110" fill="#6ee7b7" textAnchor="middle" fontSize="11" fontWeight="bold">Lớp kép Helmholtz Helmholtz Layer</text>
                <text x="640" y="135" fill="#94a3b8" textAnchor="middle" fontSize="10">Điện trở nối tiếp ESR: {currentElectrolyte.internalResistanceEsrMilliohms} mΩ</text>
                <text x="640" y="165" fill="#34d399" textAnchor="middle" fontSize="11" fontWeight="bold">Điện tích âm (-) trên mạng carbon</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: PULSE POWER ELECTRODYNAMICS */}
      {activeMode === 'PULSE_POWER_ELECTRODYNAMICS' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công Suất Xung Cực Hạn (0.1 giây)</span>
              <div className="text-3xl font-black text-rose-400 font-mono mt-1">
                {(ragoneResult.specificEnergyWhPerKg * 36.0).toFixed(0)} kW/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Dòng xả cực đại &gt; 1,500 Ampe trong chớp mắt mà không làm tăng nhiệt độ cell.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thời Gian Phản Hồi Điện Động Học</span>
              <div className="text-3xl font-black text-cyan-400 font-mono mt-1">
                &lt; 1.2 ms
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Nhanh gấp 10,000 lần phản ứng hóa học trong pin Li-ion (hàng chục giây).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Vòng Lặp Xung Điện (RTE)</span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {ragoneResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hầu như toàn bộ điện năng phóng ra được hoàn trả trọn vẹn, tổn hao Joule tối thiểu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: REGENERATIVE BRAKING TRANSIT */}
      {activeMode === 'REGENERATIVE_BRAKING_TRANSIT' && (
        <div className="flex flex-col gap-6">
          {/* Transit Sizing Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Động Năng Hãm Phanh Cần Thu Hồi</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {brakingResult.kineticEnergyKWh.toFixed(1)} kWh
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tương đương {brakingResult.kineticEnergyRecoverableMJ.toFixed(1)} MJ động năng từ vận tốc {brakingResult.initialSpeedKmh} km/h.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công Suất Hãm Phanh Đỉnh</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {brakingResult.peakBrakingPowerKW.toFixed(0)} kW
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hấp thụ trọn vẹn trong thời gian phanh ngắn ngủi {brakingResult.brakingTimeSeconds} giây.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dung Lượng Khối Siêu Tụ Cần Lắp</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {brakingResult.supercapacitorBankCapacitanceF.toFixed(1)} Farad
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Khối lượng khối tụ: <strong className="text-white">{brakingResult.supercapacitorBankMassKg.toFixed(0)} kg</strong> (chỉ chiếm ~0.25% trọng lượng đoàn tàu).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiền Điện Tiết Kiệm Hằng Năm</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                ${brakingResult.annualElectricityCostSavedUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}/năm
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Thu hồi {brakingResult.annualElectricitySavedKWh.toLocaleString('en-US', { maximumFractionDigits: 0 })} kWh/năm và giảm {brakingResult.annualAvoidedCO2Tons.toFixed(1)} tấn CO₂/năm.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
