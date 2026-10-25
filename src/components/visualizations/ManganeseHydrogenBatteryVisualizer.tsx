// src/components/visualizations/ManganeseHydrogenBatteryVisualizer.tsx
// Interactive Visualizer: Aqueous Manganese-Hydrogen (Mn-H2) Gas-Liquid Hybrid Battery
// Standards: IUPAC Electrochemistry, Dissolution-Deposition Redox Reactions, GDPT 2018 Chemistry & Long-Duration Energy Storage (LDES)

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Gauge,
  Layers,
  Activity,
  Sparkles,
  Droplets,
  ShieldCheck,
  RotateCcw,
  Factory,
  Boxes,
  Timer,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Wind,
  DollarSign
} from 'lucide-react';
import {
  MN_H2_CATALYSTS,
  MN_H2_SUBSTRATES,
  MnH2CatalystType,
  MnH2SubstrateType,
  calculateMnH2NernstPotential,
  calculateMnH2Polarization,
  sizeMnH2GridStoragePlant
} from '../../domain/manganeseHydrogenBatteryEngine';
import { sound } from '../../audio/soundEngine';

type MnH2TabMode =
  | 'DISSOLUTION_DEPOSITION_CHEMISTRY'
  | 'POLARIZATION_AND_EFFICIENCY'
  | 'LONG_DURATION_GRID_ECONOMICS';

export const ManganeseHydrogenBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MnH2TabMode>('DISSOLUTION_DEPOSITION_CHEMISTRY');

  // Interactive controls
  const [catalystType, setCatalystType] = useState<MnH2CatalystType>('NI_MO_PGM_FREE');
  const [substrateType, setSubstrateType] = useState<MnH2SubstrateType>('CARBON_FELT');
  const [currentDensityMaCm2, setCurrentDensityMaCm2] = useState<number>(40);
  const [mnConcentrationM, setMnConcentrationM] = useState<number>(1.5);
  const [h2PressureBar, setH2PressureBar] = useState<number>(20);
  const [storageDurationHours, setStorageDurationHours] = useState<number>(24);
  const [targetPowerMW, setTargetPowerMW] = useState<number>(10);

  const currentCatalyst = MN_H2_CATALYSTS[catalystType];
  const currentSubstrate = MN_H2_SUBSTRATES[substrateType];

  // Nernst calculation
  const nernstResult = useMemo(() => {
    return calculateMnH2NernstPotential(
      mnConcentrationM,
      1.8,
      h2PressureBar,
      25.0
    );
  }, [mnConcentrationM, h2PressureBar]);

  // Polarization calculation
  const polResult = useMemo(() => {
    return calculateMnH2Polarization(
      currentDensityMaCm2,
      catalystType,
      substrateType,
      25.0
    );
  }, [currentDensityMaCm2, catalystType, substrateType]);

  // Grid plant sizing
  const gridResult = useMemo(() => {
    return sizeMnH2GridStoragePlant(
      targetPowerMW,
      storageDurationHours,
      catalystType
    );
  }, [targetPowerMW, storageDurationHours, catalystType]);

  const handleModeChange = (mode: MnH2TabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setCatalystType('NI_MO_PGM_FREE');
    setSubstrateType('CARBON_FELT');
    setCurrentDensityMaCm2(40);
    setMnConcentrationM(1.5);
    setH2PressureBar(20);
    setStorageDurationHours(24);
    setTargetPowerMW(10);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-blue-600/30 rounded-2xl border border-indigo-500/40 text-indigo-400">
            <Boxes className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/30">
                Pin Lai Khí - Lỏng Mangan - Hydro Dung Dịch Nước (Aqueous Mn-H₂)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Lưu Trữ Lưới Đa Ngày &lt; $30/kWh • 20.000 Chu Kỳ
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Aqueous Manganese-Hydrogen (Mn-H₂) Battery
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cơ chế chuyển pha hòa tan - lắng đọng Mn²⁺ ⇋ MnO₂ không mỏi mạng tinh thể • Xúc tác Ni-Mo 0% Bạch Kim (PGM-Free) • An toàn tuyệt đối chống cháy nổ
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('DISSOLUTION_DEPOSITION_CHEMISTRY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'DISSOLUTION_DEPOSITION_CHEMISTRY'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-indigo-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Hòa Tan - Lắng Đọng MnO₂</span>
          </button>

          <button
            onClick={() => handleModeChange('POLARIZATION_AND_EFFICIENCY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'POLARIZATION_AND_EFFICIENCY'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Đặc Tính Phóng Nạp &amp; RTE</span>
          </button>

          <button
            onClick={() => handleModeChange('LONG_DURATION_GRID_ECONOMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'LONG_DURATION_GRID_ECONOMICS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Lưu Trữ Lưới Điện Đa Giờ (LDES)</span>
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
        {/* Catalyst Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Xúc Tác Điện Cực Khí Hydro (GDE):
          </label>
          <select
            value={catalystType}
            onChange={(e) => {
              sound.playUiClick();
              setCatalystType(e.target.value as MnH2CatalystType);
            }}
            className="bg-slate-800 text-xs font-bold text-indigo-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {Object.values(MN_H2_CATALYSTS).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Tải kim loại quý: <strong className="text-emerald-400">{currentCatalyst.pgmLoadingMgPerCm2} mg/cm²</strong> (${currentCatalyst.catalystCostUSDPerM2}/m²)
          </span>
        </div>

        {/* Substrate Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Giá Thể Bám MnO₂ Cực Dương:
          </label>
          <select
            value={substrateType}
            onChange={(e) => {
              sound.playUiClick();
              setSubstrateType(e.target.value as MnH2SubstrateType);
            }}
            className="bg-slate-800 text-xs font-bold text-blue-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {Object.values(MN_H2_SUBSTRATES).map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Dung lượng diện tích: <strong className="text-cyan-400">{currentSubstrate.arealCapacityMaxMahPerCm2} mAh/cm²</strong>
          </span>
        </div>

        {/* Mn Concentration Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-purple-400" />
              Nồng Độ Dung Dịch MnSO₄:
            </span>
            <span className="text-purple-300 font-mono font-bold">{mnConcentrationM.toFixed(1)} M</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={3.0}
            step={0.1}
            value={mnConcentrationM}
            onChange={(e) => setMnConcentrationM(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.5 M</span>
            <span>1.5 M (Chuẩn)</span>
            <span>3.0 M (Đậm đặc)</span>
          </div>
        </div>

        {/* H2 Pressure Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              Áp Suất Bình Khí Hydro:
            </span>
            <span className="text-cyan-300 font-mono font-bold">{h2PressureBar} bar</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={h2PressureBar}
            onChange={(e) => setH2PressureBar(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>5 bar (Xả sâu)</span>
            <span>20 bar (Vận hành)</span>
            <span>50 bar (Đầy nạp)</span>
          </div>
        </div>
      </div>

      {/* MODE 1: DISSOLUTION-DEPOSITION CHEMISTRY */}
      {activeMode === 'DISSOLUTION_DEPOSITION_CHEMISTRY' && (
        <div className="flex flex-col gap-6">
          {/* Reaction Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cực Dương (Cathode Mangan)</span>
              <div className="text-sm font-mono text-indigo-300 font-bold mt-2">
                Mn²⁺(aq) + 2H₂O ⇋ MnO₂(s) + 4H⁺ + 2e⁻
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                E° = +1.23 V vs SHE. Nạp: Mn²⁺ hòa tan kết tủa thành MnO₂. Xả: MnO₂ tan hoàn toàn trở lại thành dung dịch Mn²⁺, loại trừ nứt gãy mạng tinh thể!
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cực Âm (Anode Khí Hydro)</span>
              <div className="text-sm font-mono text-cyan-300 font-bold mt-2">
                2H⁺ + 2e⁻ ⇋ H₂(g) ↑
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                E° = 0.00 V vs SHE. Xúc tác Ni-Mo PGM-free khử proton thành khí H₂ sạch nén vào bình chứa; không sinh dendrite kim loại nguy hiểm.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Hở Mạch Toàn Phần (OCV)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {nernstResult.cellOpenCircuitVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                E_cath ({nernstResult.cathodePotentialVvsSHE.toFixed(2)} V) - E_anode ({nernstResult.anodePotentialVvsSHE.toFixed(2)} V).
              </p>
            </div>
          </div>

          {/* SVG Diagram: Mn-H2 Gas-Liquid Cell Schematic */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Sơ Đồ Ngăn Điện Hóa Lai Khí - Lỏng Mn-H₂ ({currentSubstrate.name})
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Cathode Chamber (Liquid MnSO4 + 3D Carbon Felt) */}
                <rect x="50" y="30" width="300" height="180" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="200" y="55" fill="#a5b4fc" textAnchor="middle" fontSize="13" fontWeight="bold">Cathode Mangan: {currentSubstrate.material}</text>
                <text x="200" y="80" fill="#cbd5e1" textAnchor="middle" fontSize="10">Dung dịch nước {mnConcentrationM} M MnSO₄</text>
                <text x="200" y="110" fill="#818cf8" textAnchor="middle" fontSize="12" fontWeight="bold">Mn²⁺(aq) ➔ MnO₂(rắn) + 2e⁻ (Nạp)</text>
                <text x="200" y="135" fill="#38bdf8" textAnchor="middle" fontSize="11" fontWeight="bold">MnO₂(rắn) ➔ Mn²⁺(aq) (Xả sạch 100%)</text>
                <text x="200" y="165" fill="#94a3b8" textAnchor="middle" fontSize="10">Không tích lũy ứng suất cơ học</text>
                <text x="200" y="185" fill="#34d399" textAnchor="middle" fontSize="10">Tuổi thọ vô hạn: 20.000 chu kỳ</text>

                {/* Proton Permeable Separator */}
                <rect x="380" y="30" width="40" height="180" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                <text x="400" y="125" fill="#34d399" textAnchor="middle" fontSize="11" fontWeight="bold" transform="rotate(-90 400 125)">
                  Màng Phân Cách H⁺
                </text>

                {/* Anode Chamber (Gas Diffusion Electrode + H2 Gas Vessel) */}
                <rect x="450" y="30" width="300" height="180" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="600" y="55" fill="#7dd3fc" textAnchor="middle" fontSize="13" fontWeight="bold">Anode Khí Hydro: {currentCatalyst.name.split('(')[0]}</text>
                <text x="600" y="80" fill="#bae6fd" textAnchor="middle" fontSize="10">Bình áp suất khí H₂ ({h2PressureBar} bar)</text>
                <text x="600" y="110" fill="#38bdf8" textAnchor="middle" fontSize="12" fontWeight="bold">2H⁺ + 2e⁻ ➔ H₂(k) ↑ (Nạp khí)</text>
                <text x="600" y="135" fill="#34d399" textAnchor="middle" fontSize="11" fontWeight="bold">H₂(k) ➔ 2H⁺ + 2e⁻ (Oxy hóa HOR)</text>
                <text x="600" y="165" fill="#94a3b8" textAnchor="middle" fontSize="10">Xúc tác: {currentCatalyst.chemicalFormula}</text>
                <text x="600" y="185" fill="#38bdf8" textAnchor="middle" fontSize="10">0g Bạch kim • Quá thế HOR &lt; 50 mV</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: POLARIZATION AND EFFICIENCY */}
      {activeMode === 'POLARIZATION_AND_EFFICIENCY' && (
        <div className="flex flex-col gap-6">
          {/* Current Density Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-400" />
                Mật Độ Dòng Điện Phóng / Nạp (j):
              </span>
              <span className="text-blue-300 font-mono font-bold text-sm">{currentDensityMaCm2} mA/cm²</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={currentDensityMaCm2}
              onChange={(e) => setCurrentDensityMaCm2(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10 mA/cm² (Tải chậm 24h)</span>
              <span>40 mA/cm² (Điểm làm việc danh định)</span>
              <span>100 mA/cm² (Công suất cao)</span>
            </div>
          </div>

          {/* Polarization Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Nạp (V_charge)</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {polResult.chargeVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Thấp hơn giới hạn phân hủy nước (1.80 V), ngăn ngừa tạo khí oxy.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Xả (V_discharge)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {polResult.dischargeVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hiệu suất điện áp: <strong className="text-white">{polResult.voltageEfficiencyPercent.toFixed(1)}%</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Vòng Lặp (RTE)</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {polResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hiệu suất Coulomb: <strong className="text-emerald-400">{polResult.coulombicEfficiencyPercent.toFixed(1)}%</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổn Thất Quá Thế Toàn Phần</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {(polResult.ohmicLossMv + polResult.mno2OverpotentialMv + polResult.hydrogenOverpotentialMv).toFixed(0)} mV
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Ohmic: {polResult.ohmicLossMv.toFixed(0)} mV • MnO₂: {polResult.mno2OverpotentialMv.toFixed(0)} mV • H₂: {polResult.hydrogenOverpotentialMv.toFixed(0)} mV.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: LONG DURATION GRID ECONOMICS */}
      {activeMode === 'LONG_DURATION_GRID_ECONOMICS' && (
        <div className="flex flex-col gap-6">
          {/* Sliders: Storage Duration and Power */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  Thời Lượng Xả Lưu Trữ (Hours):
                </span>
                <span className="text-emerald-300 font-mono font-bold text-sm">{storageDurationHours} Giờ</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={2}
                value={storageDurationHours}
                onChange={(e) => setStorageDurationHours(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10 Giờ (Qua đêm)</span>
                <span>24 Giờ (Đa ngày)</span>
                <span>100 Giờ (Tuần dự phòng)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-cyan-400" />
                  Công Suất Trạm Biến Áp (MW):
                </span>
                <span className="text-cyan-300 font-mono font-bold text-sm">{targetPowerMW} MW</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={targetPowerMW}
                onChange={(e) => setTargetPowerMW(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5 MW</span>
                <span>10 MW (Tiêu chuẩn trạm)</span>
                <span>50 MW (Quy mô vùng)</span>
              </div>
            </div>
          </div>

          {/* Sizing & Economic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Chi Phí Đầu Tư Cực Hạn (CapEx)
                </span>
                <div className="text-3xl font-black text-white font-mono mt-2">
                  ${gridResult.cellCapExUSDPerKWh.toFixed(2)}/kWh
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tổng mức đầu tư cho trạm {gridResult.totalEnergyMWh} MWh: <strong className="text-emerald-400">${(gridResult.totalPlantCapExUSD / 1e6).toFixed(2)} Triệu USD</strong>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Rẻ hơn <strong>4 lần</strong> so với Lithium-ion ($120/kWh) nhờ muối Mangan ($0.35/kg).
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-950/40 to-slate-900/80 rounded-2xl border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Boxes className="w-4 h-4" />
                  Vật Tư Lưu Trữ Dung Dịch &amp; Bình Khí
                </span>
                <div className="text-2xl font-black text-indigo-300 font-mono mt-2">
                  {gridResult.totalElectrolyteVolumeM3.toLocaleString()} m³ MnSO₄
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Cần <strong>{gridResult.manganeseSulfateMassTons.toLocaleString()} tấn</strong> muối MnSO₄ và bồn chứa khí H₂ <strong>{gridResult.h2GasTankVolumeM3At30Bar.toFixed(0)} m³</strong> @ 30 bar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Dung dịch nước tuần hoàn 100% trong bồn nhựa HDPE thông thường.
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-blue-950/40 to-slate-900/80 rounded-2xl border border-blue-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Tuổi Thọ Vận Hành &amp; Chi Phí LCOS
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono mt-2">
                  ${gridResult.levelizedCostOfStorageLCOSUSDPerMWh}/MWh
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Đảm bảo <strong>{gridResult.cycleLifeCount.toLocaleString()} chu kỳ</strong> (tương đương <strong>{gridResult.calendarLifeYears} năm</strong> vận hành liên tục).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Không suy hao dung lượng do nứt vỡ tinh thể rắn.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
