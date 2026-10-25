// src/components/visualizations/DirectEthanolSolidOxideVisualizer.tsx
// Interactive Visualizer: Direct Ethanol Solid Oxide Fuel Cell (DE-SOFC) Carbon-Neutral Biofuel Co-Generation
// Standards: IUPAC Electrochemistry, Intermediate-Temperature SOFC (IT-SOFC / PCFC), GDPT 2018 Chemistry & Agricultural Biomass CHP

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
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Sprout,
  DollarSign
} from 'lucide-react';
import {
  DE_SOFC_ELECTROLYTES,
  DE_SOFC_ANODES,
  DeSofcElectrolyteType,
  DeSofcAnodeType,
  calculateEthanolReformingEquilibrium,
  generateDESOFCPolarizationCurve,
  calculateDESOFCOperatingPerformance,
  sizeRuralAgriculturalMicrogrid
} from '../../domain/directEthanolSolidOxideEngine';
import { sound } from '../../audio/soundEngine';

type DeSofcTabMode =
  | 'INTERNAL_REFORMING_EQUILIBRIUM'
  | 'PROFOUND_POLARIZATION_CURVE'
  | 'RURAL_BIOMASS_MICROGRID';

export const DirectEthanolSolidOxideVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<DeSofcTabMode>('INTERNAL_REFORMING_EQUILIBRIUM');

  // Interactive controls
  const [electrolyteType, setElectrolyteType] = useState<DeSofcElectrolyteType>('BZCY_PROTONIC');
  const [anodeType, setAnodeType] = useState<DeSofcAnodeType>('SFMO_DOUBLE_PEROVSKITE');
  const [temperatureC, setTemperatureC] = useState<number>(650);
  const [steamToCarbonRatio, setSteamToCarbonRatio] = useState<number>(1.5);
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(0.8);
  const [targetMicrogridKW, setTargetMicrogridKW] = useState<number>(25);

  const currentElectrolyte = DE_SOFC_ELECTROLYTES[electrolyteType];
  const currentAnode = DE_SOFC_ANODES[anodeType];

  // Reforming equilibrium
  const reformingResult = useMemo(() => {
    return calculateEthanolReformingEquilibrium({
      temperatureC,
      steamToCarbonRatio,
      anodeType,
      ethanolFeedLph: 5.0
    });
  }, [temperatureC, steamToCarbonRatio, anodeType]);

  // Polarization curve
  const polarizationCurve = useMemo(() => {
    return generateDESOFCPolarizationCurve(
      {
        cellCount: 60,
        cellActiveAreaCm2: 120,
        electrolyteType,
        anodeType
      },
      {
        temperatureC,
        steamToCarbonRatio,
        anodeType,
        ethanolFeedLph: 5.0
      },
      25
    );
  }, [electrolyteType, anodeType, temperatureC, steamToCarbonRatio]);

  // Stack Operating Performance
  const stackPerformance = useMemo(() => {
    return calculateDESOFCOperatingPerformance(
      {
        cellCount: 60,
        cellActiveAreaCm2: 120,
        electrolyteType,
        anodeType
      },
      {
        temperatureC,
        steamToCarbonRatio,
        anodeType,
        ethanolFeedLph: 5.0
      },
      currentDensityAcm2
    );
  }, [electrolyteType, anodeType, temperatureC, steamToCarbonRatio, currentDensityAcm2]);

  // Microgrid sizing
  const microgridResult = useMemo(() => {
    return sizeRuralAgriculturalMicrogrid(
      targetMicrogridKW,
      electrolyteType,
      anodeType
    );
  }, [targetMicrogridKW, electrolyteType, anodeType]);

  const handleModeChange = (mode: DeSofcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setElectrolyteType('BZCY_PROTONIC');
    setAnodeType('SFMO_DOUBLE_PEROVSKITE');
    setTemperatureC(650);
    setSteamToCarbonRatio(1.5);
    setCurrentDensityAcm2(0.8);
    setTargetMicrogridKW(25);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/30 rounded-2xl border border-emerald-500/40 text-emerald-400">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Pin Nhiên Liệu Gốm Oxide Rắn Trực Tiếp Cồn Sinh Học (DE-SOFC)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Tuần Hoàn Carbon 0 Phát Thải
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Direct Ethanol Solid Oxide Fuel Cell (DE-SOFC)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cải tạo nội bào C₂H₅OH tại 550-750°C • Anode Double Perovskite SFMO chống muội than • Đồng phát điện-nhiệt CHP nông nghiệp vi lưới
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('INTERNAL_REFORMING_EQUILIBRIUM')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'INTERNAL_REFORMING_EQUILIBRIUM'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Cải Tạo & Khử Muội Than</span>
          </button>

          <button
            onClick={() => handleModeChange('PROFOUND_POLARIZATION_CURVE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'PROFOUND_POLARIZATION_CURVE'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Đặc Tính Điện Hóa I-V</span>
          </button>

          <button
            onClick={() => handleModeChange('RURAL_BIOMASS_MICROGRID')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'RURAL_BIOMASS_MICROGRID'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 ring-1 ring-teal-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Vi Lưới Sinh Khối Nông Nghiệp</span>
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
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Màng Gốm Điện Phân:
          </label>
          <select
            value={electrolyteType}
            onChange={(e) => {
              sound.playUiClick();
              setElectrolyteType(e.target.value as DeSofcElectrolyteType);
            }}
            className="bg-slate-800 text-xs font-bold text-emerald-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {Object.values(DE_SOFC_ELECTROLYTES).map((elec) => (
              <option key={elec.id} value={elec.id}>
                {elec.name} ({elec.chargeCarrier})
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            {currentElectrolyte.waterFormationSide === 'CATHODE'
              ? 'Dẫn Proton H+: Nước ở Cathode, CO2 thuần khiết ở Anode'
              : 'Dẫn Oxy O2-: Nước pha loãng tạo tại Anode'}
          </span>
        </div>

        {/* Anode Catalyst Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Vật Liệu Cực Anode:
          </label>
          <select
            value={anodeType}
            onChange={(e) => {
              sound.playUiClick();
              setAnodeType(e.target.value as DeSofcAnodeType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(DE_SOFC_ANODES).map((ano) => (
              <option key={ano.id} value={ano.id}>
                {ano.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400">
            Kháng muội than: <strong className="text-emerald-400">{currentAnode.cokingResistanceRating}</strong> (S/C an toàn ≥ {currentAnode.minSafeSteamCarbonRatio})
          </span>
        </div>

        {/* Temperature Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Vận Hành:
            </span>
            <span className="text-rose-300 font-mono font-bold">{temperatureC} °C</span>
          </div>
          <input
            type="range"
            min={550}
            max={750}
            step={10}
            value={temperatureC}
            onChange={(e) => setTemperatureC(Number(e.target.value))}
            className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>550°C</span>
            <span>650°C (Tối ưu IT)</span>
            <span>750°C</span>
          </div>
        </div>

        {/* Steam-to-Carbon (S/C) Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              Tỉ Lệ Hơi Nước S/C:
            </span>
            <span className="text-cyan-300 font-mono font-bold">{steamToCarbonRatio.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0.8}
            max={3.0}
            step={0.1}
            value={steamToCarbonRatio}
            onChange={(e) => setSteamToCarbonRatio(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.8 (Đậm cồn)</span>
            <span>1.5 (Tối ưu SFMO)</span>
            <span>3.0 (Dư hơi)</span>
          </div>
        </div>
      </div>

      {/* MODE 1: INTERNAL REFORMING & COKING SUPPRESSION */}
      {activeMode === 'INTERNAL_REFORMING_EQUILIBRIUM' && (
        <div className="flex flex-col gap-6">
          {/* Reaction Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phản Ứng Cải Tạo Hơi Nước Toàn Phần</span>
              <div className="text-sm font-mono text-emerald-300 font-bold mt-2">
                C₂H₅OH + 3 H₂O ➔ 2 CO₂ + 6 H₂
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                ΔH° = +174 kJ/mol (Thu nhiệt mạnh). Sinh 6 mol H₂ trên 1 mol ethanol, hiệu suất chuyển hóa nội bào {reformingResult.internalReformingFraction * 100}%.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chỉ Số Kháng Muội Than (Coking Resistance)</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {reformingResult.cokingResistancePercent.toFixed(1)}%
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  reformingResult.carbonDepositionRisk === 'VERY_LOW'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : reformingResult.carbonDepositionRisk === 'LOW'
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}>
                  Nguy cơ: {reformingResult.carbonDepositionRisk}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {currentAnode.vietnameseFeature}
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cơ Chế Phản Ứng Bề Mặt Xúc Tác</span>
              <div className="text-xs font-semibold text-cyan-300 mt-2">
                {currentAnode.catalyticMechanism}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tránh hiện tượng bám sợi graphite Boudouard: 2CO ⇋ C(s) + CO₂ và Methane Cracking: CH₄ ⇋ C(s) + 2H₂.
              </p>
            </div>
          </div>

          {/* Equilibrium Gas Composition Bars */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-emerald-400" />
                Thành Phần Khí Cải Tạo Cân Bằng Tại Anode ({temperatureC}°C, S/C = {steamToCarbonRatio.toFixed(1)})
              </h3>
              <span className="text-xs text-slate-400 font-mono">Cơ sở khí khô (Dry Basis)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>Hydro (H₂)</span>
                  <span className="text-emerald-400 font-mono font-bold">{reformingResult.equilibriumH2Percent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${reformingResult.equilibriumH2Percent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Nhiên liệu chính cho phản ứng điện hóa</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>Cacbon Monoxit (CO)</span>
                  <span className="text-amber-400 font-mono font-bold">{reformingResult.equilibriumCOPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${reformingResult.equilibriumCOPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Được oxy hóa tiếp hoặc chuyển dịch WGS</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>Cacbon Dioxit (CO₂)</span>
                  <span className="text-cyan-400 font-mono font-bold">{reformingResult.equilibriumCO2Percent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${reformingResult.equilibriumCO2Percent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">100% sinh học, sẵn sàng tuần hoàn cây trồng</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>Metan dư (CH₄)</span>
                  <span className="text-purple-400 font-mono font-bold">{reformingResult.equilibriumCH4Percent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, reformingResult.equilibriumCH4Percent * 10)}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Tàn dư phân cắt ethanol ở nhiệt trung</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ELECTROCHEMICAL POLARIZATION I-V CURVE */}
      {activeMode === 'PROFOUND_POLARIZATION_CURVE' && (
        <div className="flex flex-col gap-6">
          {/* Operating Point & Polarization Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Hở Mạch (OCV)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {polarizationCurve[0].cellVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Thế nhiệt động Nernst 12 electron (C₂H₅OH + 3O₂ ➔ 2CO₂ + 3H₂O, n = 12).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điện Áp Tế Bào @ {currentDensityAcm2.toFixed(2)} A/cm²</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {stackPerformance.cellVoltageV.toFixed(3)} V
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Điện áp Stack ({stackPerformance.stackVoltageV.toFixed(1)} V trên 60 tế bào mắc nối tiếp).
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mật Độ Công Suất Tế Bào</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {(currentDensityAcm2 * stackPerformance.cellVoltageV).toFixed(3)} W/cm²
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Công suất điện stack: <strong className="text-white">{stackPerformance.stackElectricPowerKW.toFixed(2)} kW</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiệu Suất Điện Hóa (LHV)</span>
              <div className="text-2xl font-black text-teal-400 font-mono mt-1">
                {stackPerformance.electricalEfficiencyLHVPercent.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hiệu suất điện trực tiếp cao gấp đôi động cơ diesel nông nghiệp (~28%).
              </p>
            </div>
          </div>

          {/* Current Density Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-amber-400" />
                Mật Độ Dòng Điện Vận Hành (j):
              </span>
              <span className="text-amber-300 font-mono font-bold text-sm">{currentDensityAcm2.toFixed(2)} A/cm²</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1.5}
              step={0.05}
              value={currentDensityAcm2}
              onChange={(e) => setCurrentDensityAcm2(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.10 A/cm² (Tải thấp)</span>
              <span>0.80 A/cm² (Điểm làm việc danh định)</span>
              <span>1.50 A/cm² (Đỉnh tải)</span>
            </div>
          </div>

          {/* SVG Diagram: DE-SOFC Cell Cross-Section */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Sơ Đồ Tế Bào Gốm Oxide Rắn DE-SOFC ({currentElectrolyte.name})
            </h3>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950/80 p-2 border border-slate-800">
                {/* Fuel Anode Layer */}
                <rect x="50" y="30" width="200" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <text x="150" y="55" fill="#f59e0b" textAnchor="middle" fontSize="13" fontWeight="bold">Anode: {currentAnode.chemicalComposition.split(' ')[0]}</text>
                <text x="150" y="80" fill="#94a3b8" textAnchor="middle" fontSize="10">Nạp C₂H₅OH + H₂O</text>
                <text x="150" y="105" fill="#10b981" textAnchor="middle" fontSize="11" fontWeight="bold">C₂H₅OH ➔ 2CO₂ + 6H₂</text>
                <text x="150" y="130" fill="#38bdf8" textAnchor="middle" fontSize="10">6H₂ ➔ 12H⁺ + 12e⁻</text>
                <text x="150" y="155" fill="#f59e0b" textAnchor="middle" fontSize="11" fontWeight="bold">e⁻ ➔ Tải Ngoài</text>
                <text x="150" y="180" fill="#cbd5e1" textAnchor="middle" fontSize="10">Khí thải: CO₂ khô</text>

                {/* Electrolyte Membrane */}
                <rect x="290" y="30" width="220" height="180" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                <text x="400" y="55" fill="#10b981" textAnchor="middle" fontSize="13" fontWeight="bold">{currentElectrolyte.chemicalFormula}</text>
                <text x="400" y="80" fill="#6ee7b7" textAnchor="middle" fontSize="11">
                  Màng {currentElectrolyte.chargeCarrier === 'H+' ? 'Gốm Dẫn Proton (H⁺)' : 'Gốm Dẫn Ion Oxy (O²⁻)'}
                </text>
                <text x="400" y="110" fill="#cbd5e1" textAnchor="middle" fontSize="12" fontWeight="bold">
                  {currentElectrolyte.chargeCarrier === 'H+' ? '➔ ➔ 12 H⁺ Di Chuyển ➔ ➔' : '⬅ ⬅ 6 O²⁻ Di Chuyển ⬅ ⬅'}
                </text>
                <text x="400" y="140" fill="#94a3b8" textAnchor="middle" fontSize="10">
                  Độ dày: {currentElectrolyte.standardThicknessUm} µm
                </text>
                <text x="400" y="165" fill="#94a3b8" textAnchor="middle" fontSize="10">
                  ASR: ~{((currentElectrolyte.standardThicknessUm * 1e-4) / 0.15).toFixed(3)} Ω·cm² @ {temperatureC}°C
                </text>

                {/* Air Cathode Layer */}
                <rect x="550" y="30" width="200" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="650" y="55" fill="#38bdf8" textAnchor="middle" fontSize="13" fontWeight="bold">Cathode: LSCF-GDC</text>
                <text x="650" y="80" fill="#94a3b8" textAnchor="middle" fontSize="10">Nạp Không Khí (O₂)</text>
                <text x="650" y="110" fill="#38bdf8" textAnchor="middle" fontSize="11" fontWeight="bold">3 O₂ + 12e⁻ + 12H⁺ ➔ 6 H₂O</text>
                <text x="650" y="140" fill="#10b981" textAnchor="middle" fontSize="11" fontWeight="bold">Nước H₂O Thoát Cathode</text>
                <text x="650" y="170" fill="#94a3b8" textAnchor="middle" fontSize="10">Không làm loãng CO₂ Anode</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: RURAL BIOMASS MICROGRID & CHP COGENERATION */}
      {activeMode === 'RURAL_BIOMASS_MICROGRID' && (
        <div className="flex flex-col gap-6">
          {/* Target Power Slider */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-teal-400" />
                Quy Mô Công Suất Vi Lưới Điện Nông Nghiệp:
              </span>
              <span className="text-teal-300 font-mono font-bold text-sm">{targetMicrogridKW} kW_e</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={targetMicrogridKW}
              onChange={(e) => setTargetMicrogridKW(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 kW (Trại nhỏ)</span>
              <span>25 kW (Chế biến nông sản & kho lạnh)</span>
              <span>100 kW (Hợp tác xã nông thôn tập trung)</span>
            </div>
          </div>

          {/* Sizing & Economic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  Tiêu Thụ Cồn Sinh Học Hằng Ngày
                </span>
                <div className="text-3xl font-black text-white font-mono mt-2">
                  {microgridResult.dailyBioEthanolConsumptionLiters.toFixed(1)} L/ngày
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Sản sinh <strong className="text-emerald-400">{microgridResult.dailyElectricOutputKWh.toFixed(0)} kWh/ngày</strong> điện sạch liên tục 24/7.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Nguồn sinh khối: Cần <strong>{microgridResult.agriculturalWasteFeedstockTonsPerYear.toFixed(1)} tấn/năm</strong> bã mía hoặc rơm rạ khô.
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-teal-950/40 to-slate-900/80 rounded-2xl border border-teal-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  Đồng Phát Nhiệt Hơi Nước CHP
                </span>
                <div className="text-3xl font-black text-teal-300 font-mono mt-2">
                  {(microgridResult.dailyThermalHeatMJ / 1000).toFixed(1)} GJ/ngày
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Nhiệt khí xả ở ~585°C cấp hơi sấy nông sản, chưng cất tinh dầu và thanh trùng sữa.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Hiệu suất tổng CHP đạt <strong>{stackPerformance.chpTotalEfficiencyPercent.toFixed(1)}%</strong>.
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900/80 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Tiết Kiệm Chi Phí Dầu Diesel
                </span>
                <div className="text-3xl font-black text-amber-300 font-mono mt-2">
                  ${microgridResult.annualAvoidedDieselCostUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}/năm
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Giảm <strong>{microgridResult.annualAvoidedCO2Tons.toFixed(1)} tấn CO₂/năm</strong> độc hại phát thải cục bộ.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                Phát thải vòng đời ròng: <strong className="text-emerald-400">0.0 kg CO₂/kWh</strong>.
              </div>
            </div>
          </div>

          {/* Stacks Configuration Table */}
          <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              Cấu Hình Cụm Module DE-SOFC Vi Lưới ({targetMicrogridKW} kW)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block">Số Lượng Stack Module:</span>
                <span className="text-white font-bold text-lg">{microgridResult.stackCount} stacks</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block">Tổng Số Tế Bào (Cells):</span>
                <span className="text-emerald-400 font-bold text-lg">{microgridResult.totalCells} cells</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block">Công Suất Điện Thực Tế:</span>
                <span className="text-cyan-400 font-bold text-lg">{(microgridResult.stackCount * stackPerformance.stackElectricPowerKW).toFixed(2)} kW_e</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block">Công Suất Nhiệt Thực Tế:</span>
                <span className="text-amber-400 font-bold text-lg">{(microgridResult.stackCount * stackPerformance.exhaustThermalPowerKW).toFixed(2)} kW_th</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
