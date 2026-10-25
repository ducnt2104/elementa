// src/components/visualizations/DirectFormicAcidSolidOxideVisualizer.tsx
// Interactive Visualizer: Direct Formic Acid Solid Oxide Fuel Cell (DFA-SOFC) Intermediate-Temperature Co-Generation
// Standards: IUPAC Electrochemistry, Protonic Ceramic Fuel Cells (PCFC), GDPT 2018 Chemistry & Combined Heat and Power (CHP)

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Gauge,
  Layers,
  Activity,
  Sparkles,
  TrendingUp,
  Droplets,
  ShieldCheck,
  RotateCcw,
  Factory,
  ThermometerSun,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Wind
} from 'lucide-react';
import {
  DFA_SOFC_ELECTROLYTES,
  DFA_SOFC_ANODES,
  DfaSofcElectrolyteType,
  DfaSofcAnodeType,
  DirectFormicAcidSolidOxideEngine
} from '../../domain/directFormicAcidSolidOxideEngine';
import { sound } from '../../audio/soundEngine';

type DfaSofcTabMode =
  | 'INTERNAL_REFORMING_EQUILIBRIUM'
  | 'PROFOUND_POLARIZATION_CURVE'
  | 'CHP_COGENERATION_MICROGRID';

export const DirectFormicAcidSolidOxideVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<DfaSofcTabMode>('INTERNAL_REFORMING_EQUILIBRIUM');

  // Interactive controls
  const [electrolyteType, setElectrolyteType] = useState<DfaSofcElectrolyteType>('BZCY_PROTONIC');
  const [anodeType, setAnodeType] = useState<DfaSofcAnodeType>('NI_BZCY');
  const [temperatureC, setTemperatureC] = useState<number>(600);
  const [steamRatio, setSteamRatio] = useState<number>(0.3);
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(0.8);
  const [formicAcidConcentrationPercent, setFormicAcidConcentrationPercent] = useState<number>(95);

  // Stack parameters for CHP mode
  const [stackAreaCm2, setStackAreaCm2] = useState<number>(300);
  const [numCells, setNumCells] = useState<number>(80);

  const currentElectrolyte = DFA_SOFC_ELECTROLYTES[electrolyteType];
  const currentAnode = DFA_SOFC_ANODES[anodeType];

  // Reforming calculations
  const reformingResult = useMemo(() => {
    return DirectFormicAcidSolidOxideEngine.calculateDecompositionEquilibrium(
      temperatureC,
      steamRatio,
      currentAnode
    );
  }, [temperatureC, steamRatio, currentAnode]);

  // Polarization calculations
  const polarizationResult = useMemo(() => {
    return DirectFormicAcidSolidOxideEngine.calculateCellPolarization({
      electrolyteType,
      anodeType,
      temperatureC,
      steamToFormicAcidRatio: steamRatio,
      currentDensityAcm2,
      formicAcidConcentrationPercent
    });
  }, [electrolyteType, anodeType, temperatureC, steamRatio, currentDensityAcm2, formicAcidConcentrationPercent]);

  // CHP System calculations
  const chpResult = useMemo(() => {
    return DirectFormicAcidSolidOxideEngine.calculateChpSystemPerformance(
      {
        electrolyteType,
        anodeType,
        temperatureC,
        steamToFormicAcidRatio: steamRatio,
        currentDensityAcm2,
        formicAcidConcentrationPercent
      },
      stackAreaCm2,
      numCells
    );
  }, [electrolyteType, anodeType, temperatureC, steamRatio, currentDensityAcm2, formicAcidConcentrationPercent, stackAreaCm2, numCells]);

  const handleModeChange = (mode: DfaSofcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectrolyteType('BZCY_PROTONIC');
    setAnodeType('NI_BZCY');
    setTemperatureC(600);
    setSteamRatio(0.3);
    setCurrentDensityAcm2(0.8);
    setFormicAcidConcentrationPercent(95);
    setStackAreaCm2(300);
    setNumCells(80);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Pin Nhiên Liệu Gốm Oxide Rắn Nhiệt Trung (IT-SOFC & PCFC)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Đồng Phát Điện - Nhiệt CHP
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Pin Nhiên Liệu Axit Fomic Thể Rắn (Direct Formic Acid SOFC)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tự cải tạo phân ly HCOOH nội bào tại 500-650°C • Gốm dẫn Proton BZCY tạo CO₂ tinh khiết • Đồng phát nhiệt cao cấp η_CHP &gt; 85%
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('INTERNAL_REFORMING_EQUILIBRIUM')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'INTERNAL_REFORMING_EQUILIBRIUM'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Phân Ly & Cải Tạo Nội Bào</span>
          </button>

          <button
            onClick={() => handleModeChange('PROFOUND_POLARIZATION_CURVE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'PROFOUND_POLARIZATION_CURVE'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 ring-1 ring-orange-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Đặc Tính Điện Hóa I-V & Công Suất</span>
          </button>

          <button
            onClick={() => handleModeChange('CHP_COGENERATION_MICROGRID')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'CHP_COGENERATION_MICROGRID'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Đồng Phát Điện - Nhiệt (CHP Microgrid)</span>
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
            Màng Gốm Điện Phân:
          </label>
          <select
            value={electrolyteType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrolyteType(e.target.value as DfaSofcElectrolyteType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(DFA_SOFC_ELECTROLYTES).map((elec) => (
              <option key={elec.id} value={elec.id}>
                {elec.name} ({elec.chargeCarrier})
              </option>
            ))}
          </select>
        </div>

        {/* Anode Catalyst Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            Chất Xúc Tác Cực Anode:
          </label>
          <select
            value={anodeType}
            onChange={(e) => {
              sound.playUiClick();
              setAnodeType(e.target.value as DfaSofcAnodeType);
            }}
            className="bg-slate-800 text-xs font-bold text-orange-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            {Object.values(DFA_SOFC_ANODES).map((ano) => (
              <option key={ano.id} value={ano.id}>
                {ano.name} ({ano.cokingResistance})
              </option>
            ))}
          </select>
        </div>

        {/* Temperature Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <ThermometerSun className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Vận Hành:
            </span>
            <span className="font-mono font-bold text-rose-400">{temperatureC}°C</span>
          </div>
          <input
            type="range"
            min={currentElectrolyte.minTempC}
            max={currentElectrolyte.maxTempC}
            step={10}
            value={temperatureC}
            onChange={(e) => {
              setTemperatureC(Number(e.target.value));
            }}
            className="accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>{currentElectrolyte.minTempC}°C</span>
            <span>{currentElectrolyte.maxTempC}°C</span>
          </div>
        </div>

        {/* Steam-to-Fuel Ratio Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              Tỉ Lệ Hơi Nước S/C (H₂O/HCOOH):
            </span>
            <span className="font-mono font-bold text-cyan-400">{steamRatio.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.0}
            max={1.5}
            step={0.05}
            value={steamRatio}
            onChange={(e) => {
              setSteamRatio(Number(e.target.value));
            }}
            className="accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0.0 (Thuần khiết)</span>
            <span>1.5 (Ngăn muội than)</span>
          </div>
        </div>
      </div>

      {/* TAB 1: INTERNAL REFORMING EQUILIBRIUM */}
      {activeMode === 'INTERNAL_REFORMING_EQUILIBRIUM' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Reaction Mechanics & Schemes */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Cơ Chế Phân Ly & Cải Tạo Xúc Tác Axit Fomic Tại Cực Anode
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30">
                T = {temperatureC}°C ({reformingResult.temperatureK.toFixed(1)} K)
              </span>
            </div>

            {/* Reaction Equations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400">Phản Ứng Khử Carboxyl (Dehydrogenation)</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {reformingResult.dehydrogenationRatioPercent.toFixed(1)}% Chọn lọc
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg font-mono text-xs text-amber-300 text-center font-bold">
                  HCOOH (hơi) ➔ H₂ + CO₂ (khí)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ΔH° = +31.2 kJ/mol (Thu nhiệt nhẹ). Phản ứng sinh ra hỗn hợp đồng phân tử H₂ và CO₂ lý tưởng cho pin nhiên liệu gốm.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-400">Phản Ứng Khử Nước (Decarbonylation)</span>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    {reformingResult.decarbonylationRatioPercent.toFixed(1)}% Nhánh phụ
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg font-mono text-xs text-rose-300 text-center font-bold">
                  HCOOH (hơi) ➔ CO + H₂O (hơi)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ΔH° = +26.0 kJ/mol. Nhánh phụ tạo CO. CO sau đó chuyển dịch khí-nước (WGS) tạo thêm H₂ khi có hơi nước.
                </p>
              </div>
            </div>

            {/* Gas Composition Bar Chart */}
            <div className="flex flex-col gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Thành Phần Cân Bằng Khí Nhiên Liệu Tại Cực Anode (% Thể Tích):
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-sky-500/30 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-sky-400">Hydro (H₂)</span>
                  <span className="text-xl font-black font-mono text-white">
                    {(reformingResult.equilibriumH2MolarFraction * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full"
                      style={{ width: `${reformingResult.equilibriumH2MolarFraction * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-emerald-400">Cacbon Dioxit (CO₂)</span>
                  <span className="text-xl font-black font-mono text-white">
                    {(reformingResult.equilibriumCo2MolarFraction * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full"
                      style={{ width: `${reformingResult.equilibriumCo2MolarFraction * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-amber-400">Cacbon Monoxit (CO)</span>
                  <span className="text-xl font-black font-mono text-white">
                    {(reformingResult.equilibriumCoMolarFraction * 100).toFixed(2)}%
                  </span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${reformingResult.equilibriumCoMolarFraction * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-blue-500/30 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-blue-400">Hơi Nước (H₂O)</span>
                  <span className="text-xl font-black font-mono text-white">
                    {(reformingResult.equilibriumH2oMolarFraction * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full"
                      style={{ width: `${reformingResult.equilibriumH2oMolarFraction * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coking Tendency & Anode Catalyst Shield */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Chỉ Số Nguy Cơ Lắng Đọng Muội Than (Boudouard Coking Index):
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  reformingResult.cokingTendencyIndex < 0.05
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {reformingResult.cokingTendencyIndex < 0.05 ? 'AN TOÀN TUYỆT ĐỐI' : 'CÓ NGUY CƠ BÁM MUỘI'}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    reformingResult.cokingTendencyIndex < 0.05 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, reformingResult.cokingTendencyIndex * 500)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {currentAnode.vietnameseFeature} Khi bổ sung hơi nước S/C ≥ 0.3, phản ứng Boudouard (2CO ➔ C + CO₂) bị triệt tiêu hoàn toàn, bảo vệ cực anode bền bỉ trên 40,000 giờ.
              </p>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Ưu Thế Cốt Lõi Của SOFC Axit Fomic</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-amber-300 block mb-1">Nhiên Liệu Lỏng An Toàn:</span>
                  Axit fomic (HCOOH) là chất lỏng ở nhiệt độ phòng, không cháy nổ nguy hiểm như H₂ áp suất cao 700 bar, tích trữ 53 g H₂/L.
                </div>

                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-emerald-300 block mb-1">Không Bị Đầu Độc CO:</span>
                  Ở 600°C, CO không đầu độc xúc tác như pin màng PEM nhiệt độ thấp (&lt;80°C) mà đóng vai trò nhiên liệu điện hóa quý giá.
                </div>

                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-sky-300 block mb-1">Thu Hồi CO₂ Tinh Khiết:</span>
                  Với màng gốm dẫn proton BZCY, nước sinh ra tại cực cathode oxy, khí thải tại anode là CO₂ khô 100%, sẵn sàng tái chế tuần hoàn thành HCOOH mới.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFOUND POLARIZATION CURVE */}
      {activeMode === 'PROFOUND_POLARIZATION_CURVE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Visualization & Polarization Chart */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Đường Cong Phân Cực Điện Hóa (Polarization I-V & Power Curve)
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Mật độ dòng:</span>
                <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                  {currentDensityAcm2.toFixed(2)} A/cm²
                </span>
              </div>
            </div>

            {/* Current Density Slider */}
            <div className="flex flex-col gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-orange-400" />
                  Điều Chỉnh Mật Độ Dòng Điện Vận Hành j (A/cm²):
                </span>
                <span className="font-mono font-bold text-orange-400">{currentDensityAcm2.toFixed(2)} A/cm²</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={2.0}
                step={0.05}
                value={currentDensityAcm2}
                onChange={(e) => setCurrentDensityAcm2(Number(e.target.value))}
                className="accent-orange-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.05 A/cm² (Tải nhẹ)</span>
                <span>1.0 A/cm² (Điểm tối ưu)</span>
                <span>2.0 A/cm² (Tải đỉnh)</span>
              </div>
            </div>

            {/* Key Operating Output Meters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-amber-400">Điện Thế OCV Nernst</span>
                <span className="text-xl font-black font-mono text-white">
                  {polarizationResult.reversibleNernstVoltageV.toFixed(3)} <span className="text-xs font-normal text-slate-400">V</span>
                </span>
                <span className="text-[10px] text-slate-400">ΔG° nhiệt động học</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-orange-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-orange-400">Điện Áp Tế Bào (V_cell)</span>
                <span className="text-xl font-black font-mono text-white">
                  {polarizationResult.operatingCellVoltageV.toFixed(3)} <span className="text-xs font-normal text-slate-400">V</span>
                </span>
                <span className="text-[10px] text-slate-400">Tại {currentDensityAcm2.toFixed(2)} A/cm²</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-emerald-400">Mật Độ Công Suất</span>
                <span className="text-xl font-black font-mono text-white">
                  {polarizationResult.powerDensityWPerCm2.toFixed(3)} <span className="text-xs font-normal text-slate-400">W/cm²</span>
                </span>
                <span className="text-[10px] text-slate-400">Đỉnh &gt; 0.70 W/cm²</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-cyan-400">Trở Kháng Ohmic ASR</span>
                <span className="text-xl font-black font-mono text-white">
                  {polarizationResult.areaSpecificOhmicResistanceOhmCm2.toFixed(3)} <span className="text-xs font-normal text-slate-400">Ω·cm²</span>
                </span>
                <span className="text-[10px] text-slate-400">Màng gốm {currentElectrolyte.standardThicknessUm} µm</span>
              </div>
            </div>

            {/* Dynamic SVG Schematic of Ceramic Cell Cross Section */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mô Phỏng Mặt Cắt Cấu Trúc Tế Bào Gốm PCFC / IT-SOFC:
              </span>
              <svg viewBox="0 0 750 200" className="w-full h-auto rounded-lg bg-slate-950">
                <defs>
                  <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="electrolyteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <linearGradient id="cathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>

                {/* ANODE LAYER */}
                <rect x="40" y="30" width="180" height="140" rx="8" fill="url(#anodeGrad)" opacity="0.9" />
                <text x="130" y="55" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="12">
                  CỰC ÂM ANODE (Ni-BZCY)
                </text>
                <text x="130" y="75" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">
                  HCOOH ➔ 2H⁺ + CO₂ + 2e⁻
                </text>
                <text x="130" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                  Khí Thải: CO₂ khô 100%
                </text>
                <text x="130" y="145" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  Phân Ly Nội Bào
                </text>

                {/* ELECTROLYTE LAYER */}
                <rect x="235" y="25" width="160" height="150" rx="8" fill="url(#electrolyteGrad)" opacity="0.85" />
                <text x="315" y="55" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  {currentElectrolyte.chargeCarrier === 'H+' ? 'GỐM DẪN PROTON (PCFC)' : 'GỐM DẪN O²⁻ (SOFC)'}
                </text>
                <text x="315" y="75" textAnchor="middle" fill="#e0f2fe" fontSize="10">
                  {currentElectrolyte.chemicalFormula}
                </text>
                <text x="315" y="115" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="bold">
                  {currentElectrolyte.chargeCarrier === 'H+' ? 'Dòng H⁺ ➔ Cathode' : 'Dòng O²⁻ ➔ Anode'}
                </text>
                <text x="315" y="140" textAnchor="middle" fill="#bae6fd" fontSize="9">
                  Độ dày: {currentElectrolyte.standardThicknessUm} µm
                </text>

                {/* CATHODE LAYER */}
                <rect x="410" y="30" width="180" height="140" rx="8" fill="url(#cathodeGrad)" opacity="0.9" />
                <text x="500" y="55" textAnchor="middle" fill="#ffe4e6" fontWeight="bold" fontSize="12">
                  CỰC DƯƠNG CATHODE (PBSCF)
                </text>
                <text x="500" y="75" textAnchor="middle" fill="#fecdd3" fontSize="10" fontFamily="monospace">
                  ½O₂ + 2H⁺ + 2e⁻ ➔ H₂O
                </text>
                <text x="500" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                  Nguồn Oxy: Không khí sạch
                </text>
                <text x="500" y="145" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">
                  Sinh Hơi Nước &amp; Nhiệt Cao
                </text>

                {/* EXTERNAL CIRCUIT & ELECTRONS */}
                <path d="M 130 30 L 130 10 L 500 10 L 500 30" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6,4" />
                <circle cx="315" cy="10" r="12" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                <text x="315" y="14" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  e⁻
                </text>

                {/* FUEL INLET & EXHAUST ARROWS */}
                <text x="15" y="105" fill="#f59e0b" fontSize="11" fontWeight="bold">
                  HCOOH ➔
                </text>
                <text x="600" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  ➔ H₂O + Khí Nóng
                </text>
              </svg>
            </div>
          </div>

          {/* Loss Breakdown & Technical Info */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Phân Rã Tổn Thất Điện Áp
              </span>

              <div className="space-y-3">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Tổn Thất Kích Hoạt (η_act):</span>
                    <span className="font-mono font-bold text-amber-400">
                      {(polarizationResult.activationOverpotentialV * 1000).toFixed(1)} mV
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Động học chuyển điện tích Butler-Volmer tại biên ba pha TPB anode và cathode.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Tổn Thất Điện Trở (η_ohm):</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {((polarizationResult.operatingCellVoltageV ? (currentDensityAcm2 * polarizationResult.areaSpecificOhmicResistanceOhmCm2) : 0) * 1000).toFixed(1)} mV
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Trở kháng dẫn truyền ion qua màng gốm theo định luật Arrhenius.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Tổn Thất Khuếch Tán (η_conc):</span>
                    <span className="font-mono font-bold text-rose-400">
                      {(polarizationResult.concentrationOverpotentialV * 1000).toFixed(1)} mV
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Trở lực khuếch tán khí trong cấu trúc xốp cermet tại dòng điện cao.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHP COGENERATION MICROGRID */}
      {activeMode === 'CHP_COGENERATION_MICROGRID' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main CHP Microgrid Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-400" />
                Hệ Thống Đồng Phát Điện - Nhiệt Sạch (Combined Heat & Power CHP)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
                Hiệu Suất Tổng η_CHP = {chpResult.combinedChpEfficiencyPercent.toFixed(1)}%
              </span>
            </div>

            {/* Stack Configuration Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Số Lượng Tế Bào Gốm (Cells):</span>
                  <span className="font-mono font-bold text-emerald-400">{numCells} Cells</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={120}
                  step={10}
                  value={numCells}
                  onChange={(e) => setNumCells(Number(e.target.value))}
                  className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Diện Tích Mỗi Tế Bào (cm²):</span>
                  <span className="font-mono font-bold text-emerald-400">{stackAreaCm2} cm²</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={500}
                  step={50}
                  value={stackAreaCm2}
                  onChange={(e) => setStackAreaCm2(Number(e.target.value))}
                  className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Power & Heat Generation Balance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Công Suất Điện (P_e)
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {chpResult.electricalPowerKw.toFixed(1)} <span className="text-sm font-normal text-slate-400">kW_e</span>
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  η_điện: {chpResult.electricalEfficiencyLhvPercent.toFixed(1)}% (LHV)
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-rose-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Nhiệt Cấp Cao Thu Hồi (Q_th)
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {chpResult.highGradeThermalPowerKw.toFixed(1)} <span className="text-sm font-normal text-slate-400">kW_th</span>
                </span>
                <span className="text-xs text-rose-300 font-mono">
                  Khí thải: {chpResult.exhaustTemperatureC.toFixed(0)}°C
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tổng Công Suất Tiện Ích
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {chpResult.totalCombinedPowerKw.toFixed(1)} <span className="text-sm font-normal text-slate-400">kW</span>
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  η_tổng CHP: {chpResult.combinedChpEfficiencyPercent.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Fuel Consumption & Environmental Balance */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Định Mức Nhiên Liệu Axit Fomic &amp; Cắt Giảm Phát Thải CO₂:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 flex flex-col gap-1">
                  <span className="text-xs text-slate-400">Tiêu Thụ Axit Fomic (HCOOH 95%):</span>
                  <span className="text-xl font-black font-mono text-amber-300">
                    {chpResult.formicAcidConsumptionLitersPerHour.toFixed(1)} <span className="text-xs text-slate-400">L/giờ</span>
                    <span className="text-xs font-normal text-slate-500 ml-2">({chpResult.formicAcidConsumptionKgPerHour.toFixed(1)} kg/h)</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Lưu trữ thể lỏng, tương thích bồn chứa nhựa thông thường.
                  </span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/40 flex flex-col gap-1">
                  <span className="text-xs text-emerald-400 font-semibold">Cắt Giảm Phát Thải CO₂ Hàng Năm:</span>
                  <span className="text-xl font-black font-mono text-emerald-300">
                    {chpResult.annualAvoidedCo2Tons.toFixed(1)} <span className="text-xs text-slate-400">tấn CO₂/năm</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Thay thế lưới điện hóa thạch và lò hơi khí đốt công nghiệp.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Microgrid Archetypes */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Factory className="w-4 h-4" />
                Kịch Bản Ứng Dụng Thực Tiễn
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Trạm Viễn Thông Vùng Xa (Telecom 5G):</span>
                  Thay thế máy phát điện diesel ồn ào; bồn 1,000L HCOOH cấp điện liên tục 30 ngày tự động không cần người vận hành, nhiệt dư sưởi ấm thiết bị mùa đông.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Bệnh Viện &amp; Trung Tâm Dữ Liệu Xanh:</span>
                  Nguồn điện liên tục dự phòng không phát thải khói bụi hay SOx/NOx, khí thải nhiệt 550°C dùng chạy máy lạnh hấp thụ (Trigeneration CCHP).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
