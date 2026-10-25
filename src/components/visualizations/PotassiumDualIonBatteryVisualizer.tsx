// src/components/visualizations/PotassiumDualIonBatteryVisualizer.tsx
// Interactive Visualizer: Dual-Ion Potassium-Graphite Battery (K-DIB) Ultra-Fast Grid Balancing
// Standards: IUPAC Electrochemistry, Anion Intercalation Graphite Chemistry, GDPT 2018 Chemistry & Fast Frequency Regulation

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
  Radio,
  Timer,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Flame,
  DollarSign
} from 'lucide-react';
import {
  K_DIB_ELECTROLYTES,
  K_DIB_CATHODES,
  K_DIB_ANODES,
  KDibElectrolyteType,
  KDibCathodeCarbonType,
  KDibAnodeCarbonType,
  calculateKDibCellVoltages,
  generateKDibRateCapability,
  sizeKDibFrequencyRegulationSystem
} from '../../domain/potassiumDualIonBatteryEngine';
import { sound } from '../../audio/soundEngine';

type KDibTabMode =
  | 'DUAL_ION_INTERCALATION_MECHANISM'
  | 'ULTRA_FAST_RATE_CAPABILITY'
  | 'GRID_FREQUENCY_REGULATION';

export const PotassiumDualIonBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<KDibTabMode>('DUAL_ION_INTERCALATION_MECHANISM');

  // Interactive controls
  const [electrolyteType, setElectrolyteType] = useState<KDibElectrolyteType>('FLUORINATED_CARBONATE');
  const [cathodeType, setCathodeType] = useState<KDibCathodeCarbonType>('EXPANDED_GRAPHITE');
  const [anodeType, setAnodeType] = useState<KDibAnodeCarbonType>('HARD_CARBON');
  const [socPercent, setSocPercent] = useState<number>(80);
  const [cRate, setCRate] = useState<number>(20);
  const [targetGridMW, setTargetGridMW] = useState<number>(20);

  const currentElectrolyte = K_DIB_ELECTROLYTES[electrolyteType];
  const currentCathode = K_DIB_CATHODES[cathodeType];
  const currentAnode = K_DIB_ANODES[anodeType];

  // Cell voltage calculations
  const cellVoltages = useMemo(() => {
    return calculateKDibCellVoltages(
      socPercent,
      electrolyteType,
      cathodeType,
      anodeType
    );
  }, [socPercent, electrolyteType, cathodeType, anodeType]);

  // Rate capability points
  const ratePoints = useMemo(() => {
    return generateKDibRateCapability(
      electrolyteType,
      cathodeType,
      [1, 2, 5, 10, 20, 30, 40, 60]
    );
  }, [electrolyteType, cathodeType]);

  const currentRatePoint = useMemo(() => {
    return generateKDibRateCapability(
      electrolyteType,
      cathodeType,
      [cRate]
    )[0];
  }, [electrolyteType, cathodeType, cRate]);

  // Frequency regulation sizing
  const freqResult = useMemo(() => {
    return sizeKDibFrequencyRegulationSystem(
      targetGridMW,
      15.0,
      electrolyteType,
      cathodeType
    );
  }, [targetGridMW, electrolyteType, cathodeType]);

  const handleModeChange = (mode: KDibTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectrolyteType('FLUORINATED_CARBONATE');
    setCathodeType('EXPANDED_GRAPHITE');
    setAnodeType('HARD_CARBON');
    setSocPercent(80);
    setCRate(20);
    setTargetGridMW(20);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-600/30 rounded-2xl border border-violet-500/40 text-violet-400">
            <Radio className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/30">
                Pin Lưỡng Ion Kali - Graphite Điện Áp Siêu Cao (K-DIB)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                0% Kim Loại Hiếm (Không Co / Ni)
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Potassium Dual-Ion Battery (K-DIB)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cơ chế xen kẽ đồng thời Anion PF₆⁻ (Cathode) &amp; Cation K⁺ (Anode) • Điện áp làm việc 4.2 - 4.8 V • Sạc siêu tốc 60C (1 phút) cân bằng tần số lưới điện
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('DUAL_ION_INTERCALATION_MECHANISM')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'DUAL_ION_INTERCALATION_MECHANISM'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25 ring-1 ring-violet-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Cơ Chế Xen Kẽ Lưỡng Ion</span>
          </button>

          <button
            onClick={() => handleModeChange('ULTRA_FAST_RATE_CAPABILITY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'ULTRA_FAST_RATE_CAPABILITY'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 ring-1 ring-purple-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Sạc Siêu Tốc (1C - 60C)</span>
          </button>

          <button
            onClick={() => handleModeChange('GRID_FREQUENCY_REGULATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GRID_FREQUENCY_REGULATION'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Cân Bằng Tần Số Lưới (PJM RegD)</span>
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
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            Dung Dịch Điện Ly Cao Thế:
          </label>
          <select
            value={electrolyteType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrolyteType(e.target.value as KDibElectrolyteType);
            }}
            className="bg-slate-800 text-xs font-bold text-violet-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            {Object.values(K_DIB_ELECTROLYTES).map((elec) => (
              <option key={elec.id} value={elec.id}>
                {elec.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Cửa sổ thế an toàn: <strong className="text-cyan-400">{currentElectrolyte.electrochemicalStabilityWindowV} V</strong> ({currentElectrolyte.flammability})
          </span>
        </div>

        {/* Cathode Carbon Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            Graphite Cực Dương (Cathode):
          </label>
          <select
            value={cathodeType}
            onChange={(e) => {
              sound.playUiClick();
              setCathodeType(e.target.value as KDibCathodeCarbonType);
            }}
            className="bg-slate-800 text-xs font-bold text-purple-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {Object.values(K_DIB_CATHODES).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Khoảng cách d(002): <strong className="text-emerald-400">{currentCathode.interlayerSpacingD002Angstrom} Å</strong> (Tối đa {currentCathode.maxChargeRateC}C)
          </span>
        </div>

        {/* Anode Carbon Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            Carbon Cực Âm (Anode):
          </label>
          <select
            value={anodeType}
            onChange={(e) => {
              sound.playUiClick();
              setAnodeType(e.target.value as KDibAnodeCarbonType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(K_DIB_ANODES).map((ano) => (
              <option key={ano.id} value={ano.id}>
                {ano.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Hợp chất Kali: <strong className="text-amber-400">{currentAnode.potassiumIntercalationCompound}</strong> ({currentAnode.intercalationPotentialVvsK} V vs K/K+)
          </span>
        </div>

        {/* State of Charge (SOC) Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              Mức Nạp Pin (SOC):
            </span>
            <span className="text-emerald-300 font-mono font-bold">{socPercent}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={socPercent}
            onChange={(e) => setSocPercent(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0% (Xả hết)</span>
            <span>50%</span>
            <span>100% (Đầy điện)</span>
          </div>
        </div>
      </div>

      {/* MODE 1: DUAL-ION INTERCALATION MECHANISM */}
      {activeMode === 'DUAL_ION_INTERCALATION_MECHANISM' && (
        <div className="flex flex-col gap-6">
          {/* Voltage & Staging Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Tế Bào (OCV)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {cellVoltages.cellOpenCircuitVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                V_cell = V_cathode ({cellVoltages.cathodePotentialVvsK.toFixed(2)} V) - V_anode ({cellVoltages.anodePotentialVvsK.toFixed(2)} V).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bậc Xen Kẽ Graphite</span>
              <div className="text-xs font-bold text-violet-300 font-mono mt-2">
                {cellVoltages.intercalationStage}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Anion PF₆⁻ (bán kính 2.54 Å) chèn vào các lớp carbon xen kẽ tuần tự.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nồng Độ Muối Điện Ly Còn Lại</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {cellVoltages.residualElectrolyteConcentrationM.toFixed(2)} M
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tiêu thụ muối từ dung dịch điện phân ({currentElectrolyte.saltConcentrationInitialM.toFixed(1)} M ban đầu) vào 2 điện cực.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hàm Lượng Kim Loại Chiến Lược</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                0.0 gam (Co/Ni)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                100% nguyên liệu carbon graphite và kali dồi dào, không phụ thuộc chuỗi cung ứng Cobalt/Niken.
              </p>
            </div>
          </div>

          {/* SVG Diagram: K-DIB Dual-Ion Intercalation Cross-Section */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Sơ Đồ Tế Bào Xen Kẽ Lưỡng Ion K-DIB (Quá Trình Nạp Điện)
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Anode Layer: K+ Intercalation */}
                <rect x="50" y="30" width="220" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="160" y="55" fill="#f59e0b" textAnchor="middle" fontSize="13" fontWeight="bold">Anode: {currentAnode.name.split(' ')[0]}</text>
                <text x="160" y="80" fill="#94a3b8" textAnchor="middle" fontSize="10">Xen kẽ Cation Kali (K⁺)</text>
                <text x="160" y="110" fill="#f59e0b" textAnchor="middle" fontSize="12" fontWeight="bold">Cₘ + y K⁺ + y e⁻ ➔ KC₈</text>
                <text x="160" y="140" fill="#cbd5e1" textAnchor="middle" fontSize="10">Điện thế: {cellVoltages.anodePotentialVvsK.toFixed(2)} V vs K/K⁺</text>
                <text x="160" y="170" fill="#34d399" textAnchor="middle" fontSize="11" fontWeight="bold">⬅ Hút Cation K⁺ từ điện ly</text>

                {/* Electrolyte Reservoir */}
                <rect x="295" y="30" width="210" height="180" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
                <text x="400" y="55" fill="#a78bfa" textAnchor="middle" fontSize="12" fontWeight="bold">{currentElectrolyte.chemicalFormula}</text>
                <text x="400" y="80" fill="#c4b5fd" textAnchor="middle" fontSize="10">Dung Dịch Điện Ly Muối KPF₆</text>
                <text x="400" y="115" fill="#f59e0b" textAnchor="middle" fontSize="13" fontWeight="bold">⬅ ⬅ K⁺ (Cation) | PF₆⁻ (Anion) ➔ ➔</text>
                <text x="400" y="145" fill="#cbd5e1" textAnchor="middle" fontSize="11">
                  Nồng độ muối hiện tại: <tspan fill="#38bdf8" fontWeight="bold">{cellVoltages.residualElectrolyteConcentrationM.toFixed(2)} M</tspan>
                </text>
                <text x="400" y="170" fill="#94a3b8" textAnchor="middle" fontSize="10">Độ dẫn ion: {currentElectrolyte.ionicConductivityMsPerCm} mS/cm</text>

                {/* Cathode Layer: PF6- Anion Intercalation */}
                <rect x="530" y="30" width="220" height="180" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="640" y="55" fill="#a78bfa" textAnchor="middle" fontSize="13" fontWeight="bold">Cathode: {currentCathode.name.split(' ')[0]}</text>
                <text x="640" y="80" fill="#94a3b8" textAnchor="middle" fontSize="10">Xen kẽ Anion Hexafluorophosphate</text>
                <text x="640" y="110" fill="#a78bfa" textAnchor="middle" fontSize="12" fontWeight="bold">Cₙ + x PF₆⁻ ➔ Cₙ[PF₆] + x e⁻</text>
                <text x="640" y="140" fill="#cbd5e1" textAnchor="middle" fontSize="10">Điện thế: {cellVoltages.cathodePotentialVvsK.toFixed(2)} V vs K/K⁺</text>
                <text x="640" y="170" fill="#38bdf8" textAnchor="middle" fontSize="11" fontWeight="bold">Hút Anion PF₆⁻ từ điện ly ➔</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ULTRA-FAST RATE CAPABILITY (1C TO 60C) */}
      {activeMode === 'ULTRA_FAST_RATE_CAPABILITY' && (
        <div className="flex flex-col gap-6">
          {/* C-Rate Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-purple-400" />
                Tốc Độ Sạc / Xả (C-Rate):
              </span>
              <span className="text-purple-300 font-mono font-bold text-sm">{cRate}C</span>
            </div>
            <input
              type="range"
              min={1}
              max={60}
              step={1}
              value={cRate}
              onChange={(e) => setCRate(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1C (60 phút)</span>
              <span>10C (6 phút)</span>
              <span>30C (2 phút)</span>
              <span>60C (1 phút sạc siêu tốc)</span>
            </div>
          </div>

          {/* Current Rate Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thời Gian Sạc Đầy (100%)</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {currentRatePoint.chargeTimeMinutes.toFixed(1)} phút
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tốc độ nạp nhanh gấp 60 lần pin Li-ion tiêu chuẩn 1C.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dung Lượng Giữ Lại @ {cRate}C</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {currentRatePoint.capacityRetentionPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Dung lượng xả: <strong className="text-white">{currentRatePoint.dischargeCapacityMahPerG.toFixed(1)} mAh/g</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mật Độ Công Suất Riêng</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {currentRatePoint.specificPowerWPerKg.toLocaleString('en-US', { maximumFractionDigits: 0 })} W/kg
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Cao gấp 10 lần pin Lithium NMC truyền thống (~1,500 W/kg).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Vòng Lặp (RTE)</span>
              <div className="text-2xl font-black text-teal-400 font-mono mt-1">
                {currentRatePoint.roundTripEnergyEfficiencyPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hiệu suất điện năng cao nhờ động học xen kẽ không biến đổi pha.
              </p>
            </div>
          </div>

          {/* Rate Curve Table */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Bảng Động Học Phóng Nạp Siêu Tốc (1C đến 60C)
            </h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300 font-mono">
                <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Tốc độ C-Rate</th>
                    <th className="p-2.5">Thời Gian Nạp</th>
                    <th className="p-2.5">Dung Lượng Giữ Lại</th>
                    <th className="p-2.5">Điện Áp Làm Việc</th>
                    <th className="p-2.5">Công Suất Riêng</th>
                    <th className="p-2.5">Hiệu Suất RTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ratePoints.map((pt) => (
                    <tr key={pt.cRate} className={pt.cRate === cRate ? 'bg-purple-950/40 text-purple-200 font-bold' : ''}>
                      <td className="p-2.5">{pt.cRate}C</td>
                      <td className="p-2.5">{pt.chargeTimeMinutes.toFixed(1)} phút</td>
                      <td className="p-2.5 text-emerald-400">{pt.capacityRetentionPercent.toFixed(1)}%</td>
                      <td className="p-2.5">{pt.operatingVoltageV.toFixed(2)} V</td>
                      <td className="p-2.5 text-amber-400">{pt.specificPowerWPerKg.toFixed(0)} W/kg</td>
                      <td className="p-2.5 text-cyan-400">{pt.roundTripEnergyEfficiencyPercent.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GRID FREQUENCY REGULATION */}
      {activeMode === 'GRID_FREQUENCY_REGULATION' && (
        <div className="flex flex-col gap-6">
          {/* Target MW Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                Quy Mô Công Suất Trạm Cân Bằng Tần Số Lưới:
              </span>
              <span className="text-cyan-300 font-mono font-bold text-sm">{targetGridMW} MW</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={targetGridMW}
              onChange={(e) => setTargetGridMW(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 MW (Trạm biến áp phân phối)</span>
              <span>20 MW (Chuẩn PJM RegD Fast Frequency)</span>
              <span>100 MW (Nhà máy điện gió/mặt trời tập trung)</span>
            </div>
          </div>

          {/* Sizing & Economic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-cyan-950/40 to-slate-900/80 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Timer className="w-4 h-4" />
                  Thời Gian Phản Hồi Tức Thì
                </span>
                <div className="text-3xl font-black text-white font-mono mt-2">
                  {freqResult.systemResponseTimeMs} ms
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Nhanh gấp 100 lần turbine khí Peaker (~30 giây) để chặn sụt tần số lưới 50/60 Hz.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Dung lượng lưu trữ: <strong>{freqResult.packEnergyMWh.toFixed(1)} MWh</strong> ({freqResult.totalCellCount.toLocaleString()} cells).
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-violet-950/40 to-slate-900/80 rounded-2xl border border-violet-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Chi Phí Đầu Tư Cực Thấp (CapEx)
                </span>
                <div className="text-3xl font-black text-violet-300 font-mono mt-2">
                  ${freqResult.cellCapExUSDPerKWh}/kWh
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Rẻ hơn 30% so với LFP ($95/kWh) và 50% so với NMC ($130/kWh) nhờ dùng than chì tự nhiên.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Tuổi thọ: <strong>{freqResult.cycleLifeYearsAt20CyclesPerDay.toFixed(1)} năm</strong> (20 chu kỳ sạc-xả/ngày).
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Doanh Thu Dịch Vụ Phụ Trợ Lưới
                </span>
                <div className="text-3xl font-black text-emerald-300 font-mono mt-2">
                  ${(freqResult.annualGridAncillaryRevenueUSD / 1e6).toFixed(2)}M/năm
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tham gia thị trường điều tần cao tốc PJM RegD Mileage &amp; Capacity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Kim loại hiếm Co/Ni: <strong className="text-emerald-400">0.0 gam</strong>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
