// src/components/visualizations/MetalOrganicFrameworksVisualizer.tsx
// Interactive Visualizer: Metal-Organic Frameworks (MOFs), Carbon Capture & Desert Water Harvesting
// Standards: IUPAC Reticular Chemistry (Omar Yaghi) & Vietnam GDPT 2018 (Vật liệu xốp tiên tiến)

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Wind,
  Droplets,
  Sliders,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Factory,
  Sun,
  Flame,
  Activity,
  RefreshCw,
  Box
} from 'lucide-react';
import {
  MOF_CATALOG,
  simulateMofAdsorption,
  simulateAtmosphericWaterHarvesting,
  MofProfile
} from '../../domain/metalOrganicFrameworksEngine';
import { sound } from '../../audio/soundEngine';

type MofTabMode = 'PORE_LATTICE_ADSORPTION' | 'INDUSTRIAL_CARBON_CAPTURE' | 'DESERT_WATER_HARVESTER';

export const MetalOrganicFrameworksVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MofTabMode>('PORE_LATTICE_ADSORPTION');

  // Mode 1: Lattice & Adsorption State
  const [selectedMofId, setSelectedMofId] = useState<string>('MOF_74_MG');
  const [gasPressureBar, setGasPressureBar] = useState<number>(1.0);
  const [gasTempKelvin, setGasTempKelvin] = useState<number>(298);

  // Mode 2: Carbon Capture State
  const [flueGasCo2Percent, setFlueGasCo2Percent] = useState<number>(15); // Standard 15% CO2 coal flue gas

  // Mode 3: Desert Water Harvester State
  const [desertRhPercent, setDesertRhPercent] = useState<number>(20); // 20% RH
  const [ambientTempC, setAmbientTempC] = useState<number>(28);

  // Calculations
  const activeMof: MofProfile = useMemo(() => {
    return MOF_CATALOG[selectedMofId] || MOF_CATALOG.MOF_74_MG;
  }, [selectedMofId]);

  const adsorptionResult = useMemo(() => {
    return simulateMofAdsorption(selectedMofId, gasPressureBar, gasTempKelvin);
  }, [selectedMofId, gasPressureBar, gasTempKelvin]);

  const waterResult = useMemo(() => {
    return simulateAtmosphericWaterHarvesting(desertRhPercent, ambientTempC);
  }, [desertRhPercent, ambientTempC]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-700/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Box className="w-4 h-4 text-emerald-400" />
              <span>Chuyên Đề GDPT 2018 · Hóa Học Mạng Lưới Phối Trí (Reticular Chemistry &amp; MOFs)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-ivory tracking-tight">
              Khung Hữu Cơ - Kim Loại (MOFs), Bẫy Khí Nhà Kính CO₂ &amp; Thu Nước Sa Mạc
            </h2>
            <p className="text-sm text-ivory-muted mt-1 max-w-3xl">
              Khám phá cấu trúc siêu xốp diện tích bề mặt kỷ lục (&gt; 3,000 m²/g), cơ chế hấp phụ vật lý chọn lọc CO₂/N₂
              tiết kiệm &gt; 50% năng lượng tái sinh so với dung dịch amin MEA, và máy thu nước uống từ không khí khô hạn (MOF-303).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-emerald-500/30">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('PORE_LATTICE_ADSORPTION');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'PORE_LATTICE_ADSORPTION'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Lồng Xốp &amp; Hấp Phụ Khí</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('INDUSTRIAL_CARBON_CAPTURE');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'INDUSTRIAL_CARBON_CAPTURE'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>Thu Gom CO₂ Công Nghiệp</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setActiveTab('DESERT_WATER_HARVESTER');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'DESERT_WATER_HARVESTER'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-ivory-muted hover:text-ivory hover:bg-slate-700/50'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Thu Nước Sa Mạc (MOF-303)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: NANOPOROUS LATTICE CAGE & GAS UPTAKE SIMULATOR                    */}
      {/* ========================================================================= */}
      {activeTab === 'PORE_LATTICE_ADSORPTION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: 3D-perspective Nanoporous Cage SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-ivory text-base">
                    Lồng Tinh Thể Siêu Xốp &amp; Phân Tử Khí Hấp Phụ Trong Khoang
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                  activeMof.hydrothermalStability === 'RECORD' || activeMof.hydrothermalStability === 'EXCELLENT'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                }`}>
                  ĐỘ BỀN THỦY NHIỆT: {activeMof.hydrothermalStability}
                </span>
              </div>

              {/* Porous Cage SVG */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <svg viewBox="0 0 600 300" className="w-full h-auto max-h-[300px]">
                  {/* Outer Perspective Cube / Cage Lines */}
                  {/* Back face */}
                  <rect x="200" y="50" width="200" height="150" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Connecting struts */}
                  <line x1="130" y1="100" x2="200" y2="50" stroke="#475569" strokeWidth="2.5" />
                  <line x1="330" y1="100" x2="400" y2="50" stroke="#475569" strokeWidth="2.5" />
                  <line x1="130" y1="250" x2="200" y2="200" stroke="#475569" strokeWidth="2.5" />
                  <line x1="330" y1="250" x2="400" y2="200" stroke="#475569" strokeWidth="2.5" />
                  {/* Front face */}
                  <rect x="130" y="100" width="200" height="150" fill="none" stroke="#10b981" strokeWidth="3" />

                  {/* SBU Metal Nodes (Vertices) */}
                  {[
                    { cx: 130, cy: 100 },
                    { cx: 330, cy: 100 },
                    { cx: 130, cy: 250 },
                    { cx: 330, cy: 250 },
                    { cx: 200, cy: 50 },
                    { cx: 400, cy: 50 },
                    { cx: 200, cy: 200 },
                    { cx: 400, cy: 200 }
                  ].map((node, i) => (
                    <circle key={i} cx={node.cx} cy={node.cy} r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  ))}

                  {/* Adsorbed Gas Molecules inside the pore cage */}
                  {/* CO2 molecules (Linear O=C=O in emerald) */}
                  <g>
                    <ellipse cx="230" cy="140" rx="14" ry="7" fill="#10b981" />
                    <text x="230" y="144" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CO₂</text>
                  </g>
                  <g>
                    <ellipse cx="290" cy="170" rx="14" ry="7" fill="#10b981" />
                    <text x="290" y="174" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CO₂</text>
                  </g>
                  <g>
                    <ellipse cx="260" cy="115" rx="14" ry="7" fill="#10b981" />
                    <text x="260" y="119" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CO₂</text>
                  </g>

                  {/* Open Metal Site Coordination Lines */}
                  <line x1="200" y1="50" x2="230" y2="135" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="175" y="40" fill="#fde047" fontSize="10" fontWeight="bold">Tâm kim loại hở (Open Metal Site)</text>

                  {/* Telemetry Labels */}
                  <text x="50" y="70" fill="#94a3b8" fontSize="11">Đường kính lỗ xốp:</text>
                  <text x="50" y="90" fill="#34d399" fontSize="15" fontWeight="bold">{activeMof.poreDiameterNm} nm</text>

                  <text x="460" y="70" fill="#94a3b8" fontSize="11">Diện tích BET:</text>
                  <text x="460" y="90" fill="#38bdf8" fontSize="15" fontWeight="bold">{activeMof.betSurfaceAreaM2PerG} m²/g</text>

                  <text x="300" y="285" textAnchor="middle" fill="#a7f3d0" fontSize="11">
                    1 gram {activeMof.chemicalFormula} có diện tích bề mặt trải rộng bằng cả sân bóng đá!
                  </text>
                </svg>
              </div>
            </div>

            {/* Real-time Adsorption Capacity Summary */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Dung lượng CO₂</span>
                <span className="font-extrabold text-emerald-400 text-lg mt-0.5 block">
                  {adsorptionResult.co2UptakeMmolPerG} mmol/g
                </span>
                <span className="text-[10px] text-ivory-muted">({adsorptionResult.co2UptakeWeightPercent} wt%)</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Độ Chọn Lọc CO₂/N₂</span>
                <span className="font-extrabold text-teal-400 text-lg mt-0.5 block">
                  {adsorptionResult.co2OverN2Selectivity}
                </span>
                <span className="text-[10px] text-ivory-muted">Khí thải 15% CO₂</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Năng Lượng Tái Sinh</span>
                <span className="font-extrabold text-amber-400 text-lg mt-0.5 block">
                  {adsorptionResult.regenerationEnergyKjPerKgCo2} kJ/kg
                </span>
                <span className="text-[10px] text-emerald-400">Tiết kiệm &gt; 50% vs MEA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parameters & MOF Materials Selector */}
          <div className="lg:col-span-5 space-y-4">
            {/* MOF Catalog Cards */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Thư Viện Vật Liệu MOF Điển Hình</span>
              </h4>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {Object.values(MOF_CATALOG).map((mof) => (
                  <div
                    key={mof.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMofId(mof.id);
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all text-xs space-y-1 ${
                      selectedMofId === mof.id
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md ring-1 ring-emerald-400'
                        : 'bg-slate-950/80 border-slate-800 text-ivory-muted hover:text-ivory hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-ivory font-mono text-sm">{mof.chemicalFormula}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold">
                        {mof.betSurfaceAreaM2PerG} m²/g
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory-subtle line-clamp-1">{mof.nameVi}</p>
                  </div>
                ))}
              </div>

              {/* Pressure & Temperature Sliders */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ivory-muted">Áp suất khí P:</span>
                    <span className="font-bold text-emerald-400 font-mono">{gasPressureBar.toFixed(1)} bar</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={gasPressureBar}
                    onChange={(e) => setGasPressureBar(+e.target.value)}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ivory-muted">Nhiệt độ T:</span>
                    <span className="font-bold text-amber-400 font-mono">{gasTempKelvin} K ({gasTempKelvin - 273}°C)</span>
                  </div>
                  <input
                    type="range"
                    min="273"
                    max="350"
                    step="1"
                    value={gasTempKelvin}
                    onChange={(e) => setGasTempKelvin(+e.target.value)}
                    className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reticular Chemistry Insights Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">Đặc Điểm Khung &amp; Ứng Dụng:</span>
              <p className="text-ivory-muted leading-relaxed">
                {activeMof.industrialRoleVi}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-ivory-subtle space-y-1">
                <div>Nút vô cơ SBU: <strong className="text-ivory">{activeMof.metalSbu}</strong></div>
                <div>Cầu nối hữu cơ Linker: <strong className="text-ivory">{activeMof.organicLinker}</strong></div>
                <div>Nhiệt hấp phụ Qst: <strong className="text-amber-400">{activeMof.isostericHeatQstKjPerMol} kJ/mol</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INDUSTRIAL POST-COMBUSTION CARBON CAPTURE COMPARISON               */}
      {/* ========================================================================= */}
      {activeTab === 'INDUSTRIAL_CARBON_CAPTURE' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                  <Factory className="w-5 h-5 text-teal-400" />
                  <span>Bẫy CO₂ Khí Thải Công Nghiệp: Hấp Phụ Rắn MOF vs Dung Dịch Amin Lỏng MEA</span>
                </h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Khí thải nhà máy nhiệt điện chứa ~15% CO₂ và 85% N₂. Quá trình hấp phụ vật lý (Physisorption) trong MOFs
                  loại bỏ hoàn toàn vấn đề ăn mòn thiết bị và giảm tổn thất năng lượng ký sinh (parasitic energy loss) của nhà máy.
                </p>
              </div>

              {/* Energy savings badge */}
              <div className="bg-slate-950 p-3 rounded-xl border border-teal-500/40 text-right">
                <span className="text-[10px] text-ivory-subtle uppercase block font-mono">Giảm Năng Lượng Tái Sinh</span>
                <span className="text-2xl font-extrabold text-teal-400">&gt; 55%</span>
                <span className="text-[10px] text-emerald-300 block">So với Amin lỏng 30% MEA</span>
              </div>
            </div>

            {/* Industrial Comparison Table */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-ivory border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 font-bold">Chỉ Tiêu Đánh Giá Kỹ Thuật</th>
                    <th className="p-3.5 font-bold text-emerald-400">Công Nghệ Hấp Phụ Rắn MOF (Mg-MOF-74)</th>
                    <th className="p-3.5 font-bold text-rose-400">Dung Dịch Amin Truyền Thống (MEA 30%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-ivory-muted">
                  <tr>
                    <td className="p-3 font-medium text-ivory">Cơ chế giữ CO₂</td>
                    <td className="p-3 text-emerald-300 font-mono">Hấp phụ vật lý (Physisorption) trên tâm Mg²⁺</td>
                    <td className="p-3 text-rose-300 font-mono">Phản ứng hóa học (Chemisorption) tạo carbamate</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-ivory">Nhiệt hấp phụ (Qst)</td>
                    <td className="p-3 font-bold text-emerald-400 font-mono">25 - 45 kJ/mol</td>
                    <td className="p-3 font-bold text-rose-400 font-mono">85 - 100 kJ/mol (Rất cao)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-ivory">Nhiệt độ giải hấp tái sinh</td>
                    <td className="p-3 font-bold text-emerald-400">70 - 80°C (Dùng nhiệt dư công nghiệp)</td>
                    <td className="p-3 font-bold text-rose-400">120 - 140°C (Cần trích hơi nước lò hơi)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-ivory">Năng lượng tiêu hao tái sinh</td>
                    <td className="p-3 text-emerald-300 font-mono">~1,500 kJ / kg CO₂</td>
                    <td className="p-3 text-rose-300 font-mono">~3,800 - 4,200 kJ / kg CO₂</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-ivory">Nguy cơ ăn mòn &amp; Phân hủy</td>
                    <td className="p-3 text-emerald-300">Không ăn mòn, chất rắn trơ bền vững</td>
                    <td className="p-3 text-rose-300">Ăn mòn đường ống thép dữ dội, tạo sol khí độc</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-ivory-muted italic bg-slate-950 p-3 rounded-xl border border-slate-800">
              {adsorptionResult.comparisonWithMeaAmineVi}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: DESERT WATER HARVESTER FROM ARID AIR (MOF-303)                    */}
      {/* ========================================================================= */}
      {activeTab === 'DESERT_WATER_HARVESTER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Atmospheric Water Harvester Device SVG */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ivory text-base flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <span>Thiết Bị Thu Nước Uống Không Khí Sa Mạc (MOF-303 Harvester)</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50">
                Science 2018 / Nature 2020
              </span>
            </div>

            {/* Water Harvester Device SVG */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 540 280" className="w-full h-auto max-h-[280px]">
                {/* Solar Glass Box Enclosure */}
                <polygon points="120,70 420,70 460,110 80,110" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                <rect x="80" y="110" width="380" height="110" fill="#0f172a" stroke="#475569" strokeWidth="2" rx="4" />

                {/* Sunlight Rays heating the box */}
                <line x1="270" y1="15" x2="270" y2="60" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
                <line x1="220" y1="20" x2="240" y2="60" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="320" y1="20" x2="300" y2="60" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                <text x="270" y="45" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">Nhiệt quang mặt trời (65°C)</text>

                {/* Porous MOF-303 Granule Bed in Center */}
                <rect x="120" y="130" width="300" height="35" fill="#047857" rx="4" stroke="#10b981" strokeWidth="1.5" />
                <text x="270" y="152" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                  Lớp Hạt MOF-303 (Al-PZDC) Hấp Phụ Phân Tử Nước
                </text>

                {/* Condensed Water Droplets dripping down */}
                <circle cx="210" cy="180" r="4" fill="#38bdf8" />
                <circle cx="270" cy="190" r="5" fill="#38bdf8" />
                <circle cx="330" cy="180" r="4" fill="#38bdf8" />

                {/* Pure Drinking Water Beaker at bottom */}
                <path d="M240 220 L240 260 L300 260 L300 220 Z" fill="#0284c7" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />
                <text x="270" y="275" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">
                  Nước uống tinh khiết: {waterResult.dailyWaterYieldLitersPerKgMof} L/ngày
                </text>
              </svg>
            </div>

            <p className="text-xs text-ivory-muted bg-slate-950 p-3 rounded-xl border border-slate-800">
              {waterResult.desertViabilityVi}
            </p>
          </div>

          {/* Right Column: Desert Weather Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h4 className="font-bold text-ivory text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Điều Kiện Khí Hậu Sa Mạc Mô Phỏng</span>
              </h4>

              {/* Slider 1: Relative Humidity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Độ ẩm tương đối (RH):</span>
                  <span className="font-bold text-cyan-400 font-mono">{desertRhPercent}% RH</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={desertRhPercent}
                  onChange={(e) => setDesertRhPercent(+e.target.value)}
                  className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ivory-subtle font-mono">
                  <span>5% (Cực khô)</span>
                  <span>20% (Sa mạc Death Valley)</span>
                  <span>50% (Đô thị)</span>
                </div>
              </div>

              {/* Slider 2: Ambient Temperature */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Nhiệt độ môi trường:</span>
                  <span className="font-bold text-amber-400 font-mono">{ambientTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  step="1"
                  value={ambientTempC}
                  onChange={(e) => setAmbientTempC(+e.target.value)}
                  className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Solar Desorption Feasibility Check */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs">
                {waterResult.isDesorptionFeasibleWithSunlight ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-ivory-muted">
                  Giải hấp bằng ánh nắng mặt trời: <strong className="text-ivory">{waterResult.isDesorptionFeasibleWithSunlight ? 'Khả thi (Nhiệt buồng > 60°C)' : 'Cần thấu kính hội tụ'}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
