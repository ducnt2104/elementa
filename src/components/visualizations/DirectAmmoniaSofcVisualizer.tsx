// src/components/visualizations/DirectAmmoniaSofcVisualizer.tsx
// Interactive Visualizer: Direct Ammonia Solid Oxide Fuel Cell (DA-SOFC) for Maritime Propulsion
// Standards: In-situ Catalytic NH3 Cracking, IUPAC Physical Chemistry & IMO 2050 Net-Zero Maritime Decarbonization

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
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
  Wind,
  CheckCircle2,
  Anchor,
  Compass,
  Ship
} from 'lucide-react';
import {
  calculateDaSofcKinetics,
  calculateMaritimeDaSofcPerformance,
  MARITIME_VESSEL_CATALOG,
  MaritimePropulsionSpec
} from '../../domain/directAmmoniaSofcEngine';
import { sound } from '../../audio/soundEngine';

type DaSofcTabMode =
  | 'IN_SITU_CRACKING_AND_CELL_FLOW'
  | 'ELECTROCHEMICAL_KINETICS_AND_POLARIZATION'
  | 'MARITIME_DECARBONIZATION_AND_BUNKERING';

export const DirectAmmoniaSofcVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<DaSofcTabMode>('IN_SITU_CRACKING_AND_CELL_FLOW');

  // Interactive Controls
  const [temperatureC, setTemperatureC] = useState<number>(750.0);
  const [currentDensityAcm2, setCurrentDensityAcm2] = useState<number>(0.75);
  const [fuelUtilization, setFuelUtilization] = useState<number>(0.85);
  const [selectedVesselClass, setSelectedVesselClass] = useState<string>('CONTAINER_20000_TEU');
  const [inspectedZone, setInspectedZone] = useState<'CRACKING_ANODE' | 'CERAMIC_MEMBRANE' | 'CATHODE_AIR' | 'HEAT_BALANCE'>('CRACKING_ANODE');

  // Calculations
  const kinetics = useMemo(() => {
    return calculateDaSofcKinetics({
      temperatureC,
      operatingPressureBar: 1.2,
      currentDensityAcm2,
      fuelUtilizationRatio: fuelUtilization,
      areaSpecificResistanceOhmCm2: 0.22
    });
  }, [temperatureC, currentDensityAcm2, fuelUtilization]);

  const shipPerf = useMemo(() => {
    return calculateMaritimeDaSofcPerformance(
      selectedVesselClass,
      temperatureC,
      currentDensityAcm2,
      fuelUtilization
    );
  }, [selectedVesselClass, temperatureC, currentDensityAcm2, fuelUtilization]);

  const handleModeChange = (mode: DaSofcTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setTemperatureC(750.0);
    setCurrentDensityAcm2(0.75);
    setFuelUtilization(0.85);
    setSelectedVesselClass('CONTAINER_20000_TEU');
    setInspectedZone('CRACKING_ANODE');
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
            <Ship className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Pin Nhiên Liệu SOFC Amoniac Trực Tiếp (DA-SOFC)
              </span>
              <span className="text-xs text-slate-400">Zero-Carbon Hải Quân & Hàng Hải 60 MW</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Pin Nhiên Liệu DA-SOFC 750°C Tự Cracking Không Phát Thải Carbon
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Mặc Định
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        <button
          onClick={() => handleModeChange('IN_SITU_CRACKING_AND_CELL_FLOW')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'IN_SITU_CRACKING_AND_CELL_FLOW'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          1. Động Học Tự Cracking & Tế Bào
        </button>

        <button
          onClick={() => handleModeChange('ELECTROCHEMICAL_KINETICS_AND_POLARIZATION')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'ELECTROCHEMICAL_KINETICS_AND_POLARIZATION'
              ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-lg shadow-amber-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          2. Đường Cong Phân Cực & Hiệu Suất 56.5%
        </button>

        <button
          onClick={() => handleModeChange('MARITIME_DECARBONIZATION_AND_BUNKERING')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'MARITIME_DECARBONIZATION_AND_BUNKERING'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Anchor className="w-4 h-4" />
          3. Động Cơ Tàu Thủy 20,000 TEU & IMO 2050
        </button>
      </div>

      {/* MODE 1: IN SITU CRACKING & FLOW */}
      {activeMode === 'IN_SITU_CRACKING_AND_CELL_FLOW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main SVG Schematic */}
          <div className="lg:col-span-8 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Cơ Chế Phản Ứng In-Situ Cracking Trong Ngăn Anode SOFC
              </h3>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                Tự Làm Mát Bằng Nhiệt Thu Cracking
              </span>
            </div>

            <div className="w-full bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 760 380" className="w-full h-auto max-h-[380px]">
                {/* Guidelines */}
                <rect x="10" y="10" width="740" height="360" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

                {/* 1. LIQUID AMMONIA BUNKER TANK (Left) */}
                <rect x="40" y="70" width="130" height="240" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="105" y="105" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Kho Bunkering</text>
                <text x="105" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Amoniac Lỏng (NH₃)</text>
                <text x="105" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">-33°C (8.5 bar)</text>
                <text x="105" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Mật độ năng lượng:</text>
                <text x="105" y="195" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">12.7 MJ / Lít</text>
                <rect x="55" y="220" width="100" height="70" rx="6" fill="#38bdf8" fillOpacity="0.1" />
                <text x="105" y="245" textAnchor="middle" fill="#93c5fd" fontSize="9">Gấp 1.5x lần</text>
                <text x="105" y="265" textAnchor="middle" fill="#93c5fd" fontSize="9">Hydro Lỏng (-253°C)</text>

                {/* Feed Line from Tank to DA-SOFC */}
                <path d="M 170 190 L 250 190" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="250,190 242,186 242,194" fill="#38bdf8" />
                <text x="210" y="180" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">NH₃ Lỏng</text>

                {/* 2. DA-SOFC SINGLE CELL STRUCTURE */}
                {/* Anode Chamber (Left Side of Cell) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedZone('CRACKING_ANODE'); }}
                >
                  <rect
                    x="250"
                    y="50"
                    width="150"
                    height="280"
                    rx="10"
                    fill={inspectedZone === 'CRACKING_ANODE' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedZone === 'CRACKING_ANODE' ? '#f59e0b' : '#334155'}
                    strokeWidth={inspectedZone === 'CRACKING_ANODE' ? 2.5 : 1.5}
                  />
                  <text x="325" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">ANODE (Ni-YSZ)</text>
                  <text x="325" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Tự Cracking Nhiệt Xúc Tác:</text>
                  <rect x="260" y="115" width="130" height="24" rx="4" fill="#f59e0b" fillOpacity="0.15" />
                  <text x="325" y="131" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">2NH₃ ➔ N₂ + 3H₂</text>
                  <text x="325" y="160" textAnchor="middle" fill="#ef4444" fontSize="9">ΔH = +46.2 kJ/mol (Thu nhiệt)</text>
                  <text x="325" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Oxy hóa Điện Hóa:</text>
                  <text x="325" y="215" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">H₂ + O²⁻ ➔ H₂O + 2e⁻</text>
                  <text x="325" y="270" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Thoát N₂ + H₂O(g)</text>
                  <text x="325" y="295" textAnchor="middle" fill="#10b981" fontSize="9">0% CO₂ | 0% SOx</text>
                </g>

                {/* YSZ Solid Ceramic Electrolyte (Middle Strip) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedZone('CERAMIC_MEMBRANE'); }}
                >
                  <rect
                    x="405"
                    y="50"
                    width="40"
                    height="280"
                    rx="4"
                    fill={inspectedZone === 'CERAMIC_MEMBRANE' ? '#0284c7' : '#0369a1'}
                    stroke={inspectedZone === 'CERAMIC_MEMBRANE' ? '#38bdf8' : '#0284c7'}
                    strokeWidth={2}
                  />
                  <text x="425" y="120" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" transform="rotate(90 425 120)">YSZ / ScSZ (O²⁻)</text>
                  <text x="425" y="220" textAnchor="middle" fill="#e0f2fe" fontSize="9" transform="rotate(90 425 220)">Dẫn Ion Oxy</text>
                  {/* O2- transport arrows */}
                  <path d="M 440 180 L 410 180" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
                  <polygon points="410,180 416,177 416,183" fill="#ffffff" />
                </g>

                {/* Cathode Air Chamber (Right Side) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { sound.playUiClick(); setInspectedZone('CATHODE_AIR'); }}
                >
                  <rect
                    x="450"
                    y="50"
                    width="150"
                    height="280"
                    rx="10"
                    fill={inspectedZone === 'CATHODE_AIR' ? '#1e293b' : '#0f172a'}
                    stroke={inspectedZone === 'CATHODE_AIR' ? '#38bdf8' : '#334155'}
                    strokeWidth={inspectedZone === 'CATHODE_AIR' ? 2.5 : 1.5}
                  />
                  <text x="525" y="80" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">CATHODE (LSCF)</text>
                  <text x="525" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Khử Khí Oxy Từ Không Khí:</text>
                  <rect x="460" y="125" width="130" height="24" rx="4" fill="#38bdf8" fillOpacity="0.15" />
                  <text x="525" y="141" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">1/2 O₂ + 2e⁻ ➔ O²⁻</text>
                  <text x="525" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Cấp Gió Không Khí:</text>
                  <text x="525" y="200" textAnchor="middle" fill="#e2e8f0" fontSize="10">Không Khí Biển Tươi</text>
                  <rect x="460" y="240" width="130" height="40" rx="6" fill="#38bdf8" fillOpacity="0.1" />
                  <text x="525" y="258" textAnchor="middle" fill="#38bdf8" fontSize="9">Nhiệt Độ: {temperatureC}°C</text>
                  <text x="525" y="272" textAnchor="middle" fill="#38bdf8" fontSize="9">Dòng: {currentDensityAcm2} A/cm²</text>
                </g>

                {/* 3. ELECTRICITY OUTPUT TO PROPULSION MOTOR */}
                {/* Electrical Circuit */}
                <path d="M 325 50 L 325 25 L 670 25 L 670 140" fill="none" stroke="#eab308" strokeWidth="2.5" />
                <path d="M 525 50 L 525 35 L 670 35 L 670 240" fill="none" stroke="#eab308" strokeWidth="2.5" />

                <circle cx="670" cy="190" r="45" fill="#1e293b" stroke="#eab308" strokeWidth="2.5" />
                <text x="670" y="180" textAnchor="middle" fill="#eab308" fontSize="11" fontWeight="bold">ĐỘNG CƠ TÀU</text>
                <text x="670" y="198" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">{shipPerf.powerOutputMW} MW</text>
                <text x="670" y="215" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Hiệu suất {shipPerf.electricalEfficiencyPercent}%</text>

                {/* Freshwater Condenser Out */}
                <path d="M 325 330 L 325 365" stroke="#38bdf8" strokeWidth="2.5" />
                <polygon points="325,365 321,357 329,357" fill="#38bdf8" />
                <text x="325" y="356" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">↓ {shipPerf.pureWaterProductKgPerHour.toLocaleString()} kg/h Nước Ngọt</text>
              </svg>
            </div>

            {/* Zone Detail Card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/60 flex flex-col gap-2">
              {inspectedZone === 'CRACKING_ANODE' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-amber-300">
                      Cực Anode Ni-YSZ Tự Cracking Amoniac (In-Situ Endothermic)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Hiệu suất phân hủy: {kinetics.ammoniaCrackingConversionPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Khác với các hệ thống pin nhiên liệu thông thường cần máy phân tách hydro bên ngoài cồng kềnh, DA-SOFC đưa trực tiếp amoniac vào ngăn anode. Ở 750°C trên nền xúc tác cermet niken, amoniac phân hủy tức thời thành hỗn hợp H₂ và N₂ mà không tạo muội than.
                  </p>
                  <div className="flex gap-4 text-xs text-slate-400 pt-1">
                    <span>Nhiệt thu tự làm mát: <strong className="text-amber-300">{kinetics.heatAbsorptionFromCrackingKWPerMW} kW / MW điện</strong></span>
                    <span>Hấp thụ nhiệt Joule nội: <strong className="text-emerald-400">100% Cân Bằng Nhiệt</strong></span>
                  </div>
                </>
              )}

              {inspectedZone === 'CERAMIC_MEMBRANE' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-cyan-300">
                      Màng Điện Phân Gốm Rắn YSZ / ScSZ Mỏng (10 μm)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      ASR = 0.22 Ω·cm²
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Màng oxit gốm rắn ScSZ dẫn truyền ion oxy O²⁻ ở nhiệt độ cao với điện trở ohmic cực thấp, cho phép đạt mật độ dòng điện cao {currentDensityAcm2} A/cm² và mật độ công suất {kinetics.powerDensityWcm2} W/cm².
                  </p>
                </>
              )}

              {inspectedZone === 'CATHODE_AIR' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-blue-300">
                      Cực Cathode LSCF Khử Khí Oxy Từ Không Khí Tươi
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      OCV = {kinetics.openCircuitVoltageV} V
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Không khí môi trường biển được thổi qua cathode, oxy phân tử nhận điện tử chuyển thành ion O²⁻ thấm qua màng gốm. Nước sản phẩm sinh ra ở cực anode thay vì cực cathode, giúp việc ngưng tụ và thu hồi nước ngọt trên tàu cực kỳ dễ dàng.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Metrics & Highlights Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Ưu Điểm Vượt Trội Cho Hàng Hải
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-1">Mật Độ Năng Lượng Gấp 1.5x Hydro Lỏng</div>
                  <p className="text-slate-300">
                    Amoniac hóa lỏng ở -33°C (hoặc 8.5 bar áp suất nhẹ), đạt 12.7 MJ/L. Hydro lỏng cần -253°C cực đoan nhưng chỉ đạt 8.5 MJ/L, chiếm gấp rưỡi thể tích khoang chứa hàng của tàu.
                  </p>
                </div>

                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="font-bold text-blue-300 mb-1">Tự Cung Cấp Toàn Bộ Nước Sinh Hoạt</div>
                  <p className="text-slate-300">
                    Phản ứng sinh ra {shipPerf.pureWaterProductKgPerHour.toLocaleString()} kg nước tinh khiết mỗi giờ ({((shipPerf.pureWaterProductKgPerHour * 24) / 1000).toFixed(0)} tấn/ngày), thừa thãi cho toàn bộ thủy thủ đoàn và hệ thống làm mát.
                  </p>
                </div>

                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="font-bold text-purple-300 mb-1">Loại Bỏ 100% Phát Thải Lưu Huỳnh (SOx)</div>
                  <p className="text-slate-300">
                    Nhiên liệu Amoniac tinh khiết hoàn toàn không chứa lưu huỳnh, tuân thủ tuyệt đối quy định IMO MARPOL Annex VI mà không cần máy rửa khí lưu huỳnh đắt tiền (Scrubber).
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Consumption Card */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mức Tiêu Thụ Hàng Ngày (24h)</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-amber-400">{shipPerf.ammoniaConsumptionTonsPerDay}</div>
                  <div className="text-[10px] text-slate-400">Tấn NH₃ / ngày</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-cyan-400">{shipPerf.ammoniaVolumeM3PerDay}</div>
                  <div className="text-[10px] text-slate-400">m³ NH₃ / ngày</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                <span>Điện áp vận hành tế bào:</span>
                <span className="font-bold text-white font-mono">{kinetics.cellOperatingVoltageV} V</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Mật độ công suất đỉnh:</span>
                <span className="font-bold text-emerald-400 font-mono">{kinetics.powerDensityWcm2} W/cm²</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: KINETICS & POLARIZATION */}
      {activeMode === 'ELECTROCHEMICAL_KINETICS_AND_POLARIZATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-5 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Động Học Điện Hóa & Tổn Thất Phân Cực
            </h3>

            {/* Slider: Operating Temperature */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Nhiệt Độ Hoạt Động Ngăn SOFC (°C)</label>
                <span className="text-sm font-mono font-bold text-amber-400">{temperatureC}°C</span>
              </div>
              <input
                type="range"
                min="650"
                max="800"
                step="5"
                value={temperatureC}
                onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>650°C (Bắt đầu tự cracking)</span>
                <span>750°C (Điểm làm việc tối ưu)</span>
                <span>800°C (Mật độ dòng tối đa)</span>
              </div>
            </div>

            {/* Slider: Current Density */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Mật Độ Dòng Điện (A/cm²)</label>
                <span className="text-sm font-mono font-bold text-emerald-400">{currentDensityAcm2.toFixed(2)} A/cm²</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="1.20"
                step="0.05"
                value={currentDensityAcm2}
                onChange={(e) => setCurrentDensityAcm2(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.30 A/cm² (Hiệu suất đỉnh 62%)</span>
                <span>0.75 A/cm² (Chuẩn thiết kế hàng hải)</span>
                <span>1.20 A/cm² (Tải tối đa khi tăng tốc)</span>
              </div>
            </div>

            {/* Polarization readouts */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Thế Nernst Mạch Hở</span>
                <span className="text-lg font-black text-cyan-400 font-mono">{kinetics.openCircuitVoltageV} V</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Điện Áp Làm Việc</span>
                <span className="text-lg font-black text-amber-400 font-mono">{kinetics.cellOperatingVoltageV} V</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Hiệu Suất Điện Năng</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{kinetics.electricalEfficiencyLhvPercent}%</span>
              </div>
            </div>
          </div>

          {/* Thermal Balance & Self Cooling */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400" />
              Cân Bằng Nhiệt Nội & Tự Làm Mát
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Nhiệt thu cracking amoniac:</span>
                <span className="font-bold text-amber-400 font-mono">+{kinetics.heatAbsorptionFromCrackingKWPerMW} kW / MW</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Nhiệt Joule tỏa ra do điện trở:</span>
                <span className="font-bold text-rose-400 font-mono">-{(currentDensityAcm2 * 0.22 * 1000).toFixed(0)} kW / MW</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300 font-bold">
                <span>Hiệu ứng triệt tiêu nhiệt:</span>
                <span>Tự Điều Nhiệt Hoàn Hảo</span>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300">Đột Phá Kỹ Thuật: </strong>
              Trong pin SOFC chạy hydro thông thường, nhiệt Joule tỏa ra rất lớn buộc phải dùng quạt thổi lượng không khí dư thừa gấp 5 - 8 lần để làm mát cathode, tiêu tốn 4 - 6% công suất phụ tải. Với DA-SOFC, phản ứng thu nhiệt cracking amoniac hấp thụ tới 60 - 80% nhiệt thừa ngay tại chỗ, giúp hệ thống vận hành êm ái với lưu lượng khí tối thiểu.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: MARITIME PROPULSION */}
      {activeMode === 'MARITIME_DECARBONIZATION_AND_BUNKERING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vessel Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Ship className="w-5 h-5 text-emerald-400" />
              Lựa Chọn Hạm Đội Tàu Biển Hàng Hải
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {Object.values(MARITIME_VESSEL_CATALOG).map((vessel) => (
                <div
                  key={vessel.vesselClass}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedVesselClass(vessel.vesselClass);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedVesselClass === vessel.vesselClass
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-emerald-300">{vessel.vietnameseName}</span>
                    <span className="text-xs font-mono font-bold text-amber-400">{vessel.propulsionPowerMW} MW</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>Tốc độ: {vessel.serviceSpeedKnots} knots</span>
                    <span>Dầu HFO gốc: {vessel.baselineHfoConsumptionTonsPerDay} tấn/ngày</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Avoided Emissions & Voyage Cost Parity */}
          <div className="lg:col-span-6 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Kinh Tế Tuyến Hải Trình & Thuế Carbon EU ETS
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Giảm phát thải CO₂ hàng năm:</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{shipPerf.annualAvoidedCO2Tons.toLocaleString()} tấn/năm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Triệt tiêu hoàn toàn khí độc SOx:</span>
                <span className="font-bold text-cyan-400 font-mono">{shipPerf.annualAvoidedSOxTons.toLocaleString()} tấn/năm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Nước ngọt đồng phát (25 ngày hải trình):</span>
                <span className="font-bold text-white font-mono">{((shipPerf.pureWaterProductKgPerHour * 24 * 25) / 1000).toLocaleString()} tấn nước</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 pt-2 border-t border-slate-800">
                <span>Tiền phạt thuế carbon EU ETS tránh được:</span>
                <span className="font-bold text-amber-400 font-mono">
                  ${((shipPerf.annualAvoidedCO2Tons * 100) / 1e6).toFixed(2)} Triệu USD / năm
                </span>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">Đạt Chuẩn IMO Net-Zero 2050: </strong>
              Hệ thống pin nhiên liệu DA-SOFC trên tàu 20,000 TEU giúp các hãng vận tải biển toàn cầu (Maersk, MSC, CMA CGM) hoàn toàn tránh được rủi ro bị cấm cập cảng châu Âu theo quy chuẩn FuelEU Maritime và thoát khỏi các khoản phạt thuế carbon hàng chục triệu đô la mỗi năm.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
