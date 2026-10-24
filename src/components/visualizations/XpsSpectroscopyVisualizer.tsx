// src/components/visualizations/XpsSpectroscopyVisualizer.tsx
// Milestone 53: X-Ray Photoelectron Spectroscopy (XPS / ESCA) & Auger Electron Spectroscopy (AES) Visualizer
// Standards: Nobel Prize in Physics 1981 (Kai Siegbahn) & Nobel Prize in Physics 1921 (Albert Einstein)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Năng lượng ion hóa; Hóa học 11: Số oxi hóa & Liên kết cộng hóa trị; Hóa học 12: Hóa học bề mặt)

import React, { useState, useMemo } from 'react';
import {
  XPS_CATALOG,
  XRAY_SOURCE_ENERGIES_EV,
  STANDARD_SPECTROMETER_WORK_FUNCTION_EV,
  C1S_ADVENTITIOUS_CARBON_STANDARD_EV,
  XpsXRaySource,
  simulateXpsSpectrum,
  calculateKineticEnergy,
  calculateBindingEnergy
} from '../../domain/xpsSpectroscopyEngine';
import { sound } from '../../audio/soundEngine';
import {
  Zap,
  Activity,
  Layers,
  Award,
  Sparkles,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
  Flame,
  ShieldAlert,
  Compass,
  Eye
} from 'lucide-react';

export interface XpsSpectroscopyVisualizerProps {
  initialSampleId?: string;
}

export const XpsSpectroscopyVisualizer: React.FC<XpsSpectroscopyVisualizerProps> = ({
  initialSampleId
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(initialSampleId || 'graphene_oxide_sheet');
  const [xraySource, setXraySource] = useState<XpsXRaySource>('AL_KA');
  const [takeOffAngleDeg, setTakeOffAngleDeg] = useState<number>(0); // 0° = normal, 60° = grazing
  const [activeTab, setActiveTab] = useState<'deconvolution_peaks' | 'photoelectric_augereffect' | 'arxps_imfp_depth' | 'nobel_curriculum_gdpt'>('deconvolution_peaks');
  const [hoveredEnergyIndex, setHoveredEnergyIndex] = useState<number | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const simResult = useMemo(() => {
    return simulateXpsSpectrum(
      selectedSampleId,
      xraySource,
      takeOffAngleDeg,
      STANDARD_SPECTROMETER_WORK_FUNCTION_EV
    );
  }, [selectedSampleId, xraySource, takeOffAngleDeg]);

  const { sample, photonEnergyEv, spectrum, imfpNm, samplingDepthNm } = simResult;

  const handleSampleChange = (id: string) => {
    setSelectedSampleId(id);
    setSelectedComponentId(null);
    sound.playUiClick();
    sound.playXpsPhotonFlash();
  };

  const handleXRaySourceChange = (src: XpsXRaySource) => {
    setXraySource(src);
    sound.playUiClick();
    sound.playXpsPhotonFlash();
  };

  const handleAngleChange = (angle: number) => {
    setTakeOffAngleDeg(angle);
    sound.playUiClick();
  };

  // Dimensions for high-res SVG spectrum
  const svgWidth = 840;
  const svgHeight = 360;
  const padLeft = 70;
  const padRight = 40;
  const padTop = 45;
  const padBottom = 55;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const [minEb, maxEb] = sample.highResRange;
  const maxIntensity = Math.max(...spectrum.totalIntensity) * 1.12;

  // Scale functions (Note: Binding Energy is displayed high-to-low from left to right)
  const getX = (eb: number) => {
    const fraction = (maxEb - eb) / (maxEb - minEb);
    return padLeft + fraction * plotWidth;
  };

  const getY = (val: number) => {
    const fraction = val / maxIntensity;
    return padTop + plotHeight - fraction * plotHeight;
  };

  // SVG path strings
  const totalPath = useMemo(() => {
    return spectrum.bindingEnergies
      .map((eb, i) => `${i === 0 ? 'M' : 'L'} ${getX(eb).toFixed(1)} ${getY(spectrum.totalIntensity[i]).toFixed(1)}`)
      .join(' ');
  }, [spectrum, maxEb, minEb, maxIntensity]);

  return (
    <div className="bg-navy-light/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header & Nobel Citations */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Milestone 53 • IUPAC Surface Analysis & ESCA
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              hν = {photonEnergyEv} eV
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ivory tracking-wide flex items-center gap-2 mt-1">
            <Radio className="w-6 h-6 text-amber-400" />
            Quang Phổ Quang Điện Tử Tia X (XPS / ESCA) & Hiệu Ứng Auger (AES)
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Nobel Vật Lý 1981 (Kai Siegbahn - Phân tích hóa học ESCA) & Nobel Vật Lý 1921 (Albert Einstein - Hiệu ứng quang điện)
          </p>
        </div>

        {/* Quick Instrument Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-right">
          <div className="bg-navy-dark/70 border border-amber-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Năng Lượng Tia X</span>
            <span className="text-xs font-black text-amber-300">{photonEnergyEv} eV</span>
          </div>
          <div className="bg-navy-dark/70 border border-cyan-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Công Thoát Φ</span>
            <span className="text-xs font-black text-cyan-300">{STANDARD_SPECTROMETER_WORK_FUNCTION_EV} eV</span>
          </div>
          <div className="bg-navy-dark/70 border border-emerald-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Độ Sâu IMFP (λ)</span>
            <span className="text-xs font-black text-emerald-300">{imfpNm} nm</span>
          </div>
          <div className="bg-navy-dark/70 border border-purple-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Độ Sâu Lấy Mẫu (3λ)</span>
            <span className="text-xs font-black text-purple-300">{samplingDepthNm} nm</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-navy-dark/60 border border-white/5 rounded-xl p-4">
        {/* Sample Selection */}
        <div>
          <label className="text-xs font-bold text-amber-300 block mb-1.5 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" />
            Mẫu Vật Liệu Bề Mặt ({sample.coreOrbital}):
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(XPS_CATALOG).map((sp) => (
              <button
                key={sp.id}
                onClick={() => handleSampleChange(sp.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                  selectedSampleId === sp.id
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory hover:bg-navy-light/70'
                }`}
              >
                <div className="font-bold truncate">{sp.name.split('(')[0]}</div>
                <div className="text-[10px] text-ivory-muted font-mono">{sp.coreOrbital}</div>
              </button>
            ))}
          </div>
        </div>

        {/* X-Ray Source Selection */}
        <div>
          <label className="text-xs font-bold text-cyan-300 block mb-1.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Nguồn Tia X Kích Thích (Anode):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['AL_KA', 'MG_KA'] as XpsXRaySource[]).map((src) => {
              const info = XRAY_SOURCE_ENERGIES_EV[src];
              return (
                <button
                  key={src}
                  onClick={() => handleXRaySourceChange(src)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                    xraySource === src
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-md'
                      : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                  }`}
                >
                  <div className="font-bold">{src === 'AL_KA' ? 'Al Kα' : 'Mg Kα'}</div>
                  <div className="text-[10px] text-cyan-300 font-mono">{info.energyEv} eV</div>
                  <div className="text-[9px] text-ivory-muted">ΔE ~ {info.naturalLinewidthEv} eV</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Takeoff Angle (ARXPS) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Góc Thoát ARXPS (θ_takeoff):
            </label>
            <span className="text-xs font-mono font-bold text-purple-200">{takeOffAngleDeg}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={65}
            step={5}
            value={takeOffAngleDeg}
            onChange={(e) => handleAngleChange(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted mt-1 font-mono">
            <span>0° (Pháp tuyến, 3λ = {sample.coreOrbital === 'C 1s' ? '8.2' : samplingDepthNm} nm)</span>
            <span>60° (Góc tà, bề mặt cực nông ~ 2 nm)</span>
          </div>
          <p className="text-[10px] text-purple-200/80 mt-1 italic">
            {takeOffAngleDeg >= 45
              ? '⚡ Chế độ siêu nhạy bề mặt: khuếch đại đỉnh nhóm chức ngoài cùng!'
              : '⚡ Chế độ đâm xuyên chuẩn: đo đồng thời bề mặt và thể tích khối (bulk).'}
          </p>
        </div>
      </div>

      {/* 3. Main High-Resolution Core-Level Spectrum (Interactive SVG) */}
      <div className="bg-obsidian/90 border border-amber-500/30 rounded-2xl p-4 shadow-inner relative overflow-hidden">
        {/* Spectrum Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-amber-200">{sample.nameVI}</span>
            <span className="text-[11px] text-ivory-muted font-mono">({sample.chemicalFormula})</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-cyan-300">
              E_kin = {sample.coreOrbital} :{' '}
              {calculateKineticEnergy((minEb + maxEb) / 2, xraySource, STANDARD_SPECTROMETER_WORK_FUNCTION_EV).toFixed(1)} eV
            </span>
            <span className="text-amber-300">
              Chuẩn C 1s = {C1S_ADVENTITIOUS_CARBON_STANDARD_EV} eV
            </span>
          </div>
        </div>

        {/* SVG Core-Level Deconvolution Plot */}
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
            {/* Background Grid Lines */}
            {[0.25, 0.5, 0.75, 1.0].map((frac) => {
              const y = padTop + plotHeight * (1 - frac);
              return (
                <line
                  key={frac}
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotWidth}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity="0.07"
                  strokeDasharray="3 3"
                />
              );
            })}

            {/* Deconvoluted Component Fill Areas */}
            {spectrum.componentIntensities.map((comp) => {
              const compPath = spectrum.bindingEnergies
                .map((eb, i) => `${i === 0 ? 'M' : 'L'} ${getX(eb).toFixed(1)} ${getY(comp.intensities[i] + 40).toFixed(1)}`)
                .join(' ');
              const baselineY = getY(40);
              const areaPath = `${compPath} L ${getX(spectrum.bindingEnergies[spectrum.bindingEnergies.length - 1])} ${baselineY} L ${getX(spectrum.bindingEnergies[0])} ${baselineY} Z`;

              const isSelected = selectedComponentId === comp.id;

              return (
                <g key={comp.id}>
                  <path
                    d={areaPath}
                    fill={comp.color}
                    fillOpacity={isSelected ? 0.45 : 0.22}
                    className="transition-opacity duration-200"
                  />
                  <path
                    d={compPath}
                    fill="none"
                    stroke={comp.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray={isSelected ? 'none' : '4 2'}
                  />
                </g>
              );
            })}

            {/* Total Envelope Curve */}
            <path
              d={totalPath}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))"
            />

            {/* Baseline Shirley/Linear Background */}
            <line
              x1={getX(maxEb)}
              y1={getY(40)}
              x2={getX(minEb)}
              y2={getY(40 + 12)}
              stroke="#64748b"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Centerline Markers for Components */}
            {sample.components.map((comp) => {
              const cx = getX(comp.centerBindingEnergyEv);
              const cy = getY(comp.areaPercentage * 8 + 40);
              const isSelected = selectedComponentId === comp.id;

              return (
                <g
                  key={comp.id}
                  onClick={() => {
                    setSelectedComponentId(comp.id);
                    sound.playCoreLevelPeakLockTone();
                  }}
                  className="cursor-pointer group"
                >
                  <line
                    x1={cx}
                    y1={padTop}
                    x2={cx}
                    y2={padTop + plotHeight}
                    stroke={comp.colorHex}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 6 : 4}
                    fill={comp.colorHex}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform"
                  />
                  <text
                    x={cx}
                    y={padTop + 14}
                    fill={comp.colorHex}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {comp.centerBindingEnergyEv} eV
                  </text>
                </g>
              );
            })}

            {/* X-Axis (Bottom: Binding Energy Eb, reversed) */}
            <line
              x1={padLeft}
              y1={padTop + plotHeight}
              x2={padLeft + plotWidth}
              y2={padTop + plotHeight}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {Array.from({ length: 9 }).map((_, idx) => {
              const eb = maxEb - idx * ((maxEb - minEb) / 8);
              const x = getX(eb);
              return (
                <g key={idx}>
                  <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                  <text
                    x={x}
                    y={padTop + plotHeight + 20}
                    fill="#cbd5e1"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {eb.toFixed(1)}
                  </text>
                </g>
              );
            })}
            <text
              x={padLeft + plotWidth / 2}
              y={padTop + plotHeight + 42}
              fill="#fbbf24"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              Năng Lượng Liên Kết E_binding (eV) → Chiều Năng Lượng Giảm Dần
            </text>

            {/* Top X-Axis (Kinetic Energy Ek) */}
            <line x1={padLeft} y1={padTop} x2={padLeft + plotWidth} y2={padTop} stroke="#38bdf8" strokeWidth="1" />
            {Array.from({ length: 9 }).map((_, idx) => {
              const eb = maxEb - idx * ((maxEb - minEb) / 8);
              const ek = calculateKineticEnergy(eb, xraySource, STANDARD_SPECTROMETER_WORK_FUNCTION_EV);
              const x = getX(eb);
              return (
                <g key={idx}>
                  <line x1={x} y1={padTop} x2={x} y2={padTop - 5} stroke="#38bdf8" />
                  <text
                    x={x}
                    y={padTop - 8}
                    fill="#38bdf8"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {ek.toFixed(0)}
                  </text>
                </g>
              );
            })}
            <text
              x={padLeft + plotWidth / 2}
              y={padTop - 24}
              fill="#38bdf8"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              Động Năng Đo Được E_kinetic (eV) = hν - E_b - Φ_analyzer
            </text>

            {/* Y-Axis (Intensity) */}
            <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
            <text
              x={-(padTop + plotHeight / 2)}
              y={padLeft - 45}
              fill="#fbbf24"
              fontSize="11"
              fontWeight="bold"
              transform="rotate(-90)"
              textAnchor="middle"
            >
              Cường Độ Tín Hiệu (Counts / s)
            </text>
          </svg>
        </div>

        {/* Legend for Deconvoluted Chemical States */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-amber-400 rounded" />
            <span className="font-bold text-amber-300">Phổ Tổng Thể Thực Nghiệm</span>
          </div>
          {sample.components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedComponentId(comp.id);
                sound.playCoreLevelPeakLockTone();
              }}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all ${
                selectedComponentId === comp.id
                  ? 'border-white bg-white/10 scale-105'
                  : 'border-transparent hover:border-white/30'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comp.colorHex }} />
              <span className="font-medium" style={{ color: comp.colorHex }}>
                {comp.label} ({comp.centerBindingEnergyEv} eV • {comp.areaPercentage}%)
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tab Navigation for Deep Analysis */}
      <div className="flex border-b border-amber-500/20 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('deconvolution_peaks')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'deconvolution_peaks'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Giải Chập Đỉnh & Chuyển Dịch Hóa Học
        </button>

        <button
          onClick={() => setActiveTab('photoelectric_augereffect')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'photoelectric_augereffect'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Định Luật Einstein - Siegbahn & Quá Trình Auger
        </button>

        <button
          onClick={() => setActiveTab('arxps_imfp_depth')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'arxps_imfp_depth'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          ARXPS Góc Thoát & Độ Sâu Thâm Nhập IMFP
        </button>

        <button
          onClick={() => setActiveTab('nobel_curriculum_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_curriculum_gdpt'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nobel Vật Lý, Chuẩn IUPAC & GDPT 2018
        </button>
      </div>

      {/* 5. Tab Content Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Tab Content */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'deconvolution_peaks' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Bảng Giải Chập Đỉnh Phổ Phân Giải Cao & Chuyển Dịch Hóa Học ({sample.coreOrbital})
                </h4>
                <p className="text-xs text-ivory-muted mt-1">{sample.descriptionVI}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-ivory-muted font-mono uppercase text-[10px]">
                      <th className="py-2 px-2">Nhóm Chức / Vạch</th>
                      <th className="py-2 px-2">E_b (eV)</th>
                      <th className="py-2 px-2">FWHM (eV)</th>
                      <th className="py-2 px-2">% Diện Tích</th>
                      <th className="py-2 px-2">Số Oxi Hóa</th>
                      <th className="py-2 px-2">Trạng Thái Hóa Học</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {sample.components.map((comp) => {
                      const isSelected = selectedComponentId === comp.id;
                      return (
                        <tr
                          key={comp.id}
                          onClick={() => {
                            setSelectedComponentId(comp.id);
                            sound.playCoreLevelPeakLockTone();
                          }}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-amber-500/20 text-white font-bold' : 'hover:bg-white/5'
                          }`}
                        >
                          <td className="py-2.5 px-2 flex items-center gap-1.5 font-sans">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comp.colorHex }} />
                            <span>{comp.label}</span>
                          </td>
                          <td className="py-2.5 px-2 text-amber-300 font-bold">{comp.centerBindingEnergyEv}</td>
                          <td className="py-2.5 px-2 text-cyan-300">{comp.fwhmEv}</td>
                          <td className="py-2.5 px-2 text-purple-300">{comp.areaPercentage}%</td>
                          <td className="py-2.5 px-2 text-emerald-300">{comp.oxidationState}</td>
                          <td className="py-2.5 px-2 font-sans text-ivory-muted text-[11px] max-w-xs truncate">
                            {comp.chemicalStateVI}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Detailed Component Inspector */}
              {selectedComponentId && (
                <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl space-y-1.5 text-xs animate-fadeIn">
                  {(() => {
                    const comp = sample.components.find((c) => c.id === selectedComponentId);
                    if (!comp) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comp.colorHex }} />
                            {comp.label} • Năng Lượng Liên Kết {comp.centerBindingEnergyEv} eV
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300">
                            Số oxi hóa: {comp.oxidationState}
                          </span>
                        </div>
                        <p className="text-ivory-muted text-[11px]">{comp.descriptionVI}</p>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {activeTab === 'photoelectric_augereffect' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Cơ Chế Bức Xạ Quang Điện Einstein & Quá Trình Không Bức Xạ Auger
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-navy-light/40 border border-cyan-500/20 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />
                    1. Phát Xạ Quang Điện Tử (XPS Photoemission)
                  </div>
                  <div className="p-2 bg-navy-dark/70 rounded border border-cyan-500/30 font-mono text-center text-cyan-200">
                    E_kinetic = hν - E_binding - Φ_analyzer
                  </div>
                  <p className="text-ivory-muted text-[11px]">
                    Photon tia X (hν = {photonEnergyEv} eV) va chạm trực tiếp với electron orbital lõi ({sample.coreOrbital}), truyền toàn bộ năng lượng để electron thoát khỏi thế hút hạt nhân và bề mặt mẫu với động năng đo được.
                  </p>
                </div>

                <div className="p-3.5 bg-navy-light/40 border border-purple-500/20 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    2. Thư Giãn Auger (Auger Electron Spectroscopy - AES)
                  </div>
                  <div className="p-2 bg-navy-dark/70 rounded border border-purple-500/30 font-mono text-center text-purple-200">
                    E_Auger = E_K - E_L1 - E_L2,3
                  </div>
                  <p className="text-ivory-muted text-[11px]">
                    Lỗ trống orbital lõi được lấp đầy bởi electron từ mức năng lượng cao hơn. Thay vì phát xạ tia X huỳnh quang, năng lượng dư thừa được truyền không bức xạ để đánh bật electron thứ ba (Auger electron).
                  </p>
                </div>
              </div>

              {/* Auger Peaks for this Sample */}
              <div className="p-3 bg-navy-light/30 border border-white/5 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-purple-300 block">Các Vạch Điện Tử Auger Đặc Trưng Trong Phổ:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sample.augerTransitions.map((aug, idx) => (
                    <div key={idx} className="p-2 bg-navy-dark/80 rounded border border-purple-500/20 text-[11px]">
                      <div className="flex justify-between font-mono font-bold text-purple-200">
                        <span>{aug.label}</span>
                        <span>E_kin = {aug.kineticEnergyEv} eV</span>
                      </div>
                      <div className="text-[10px] text-ivory-muted mt-0.5">{aug.descriptionVI}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'arxps_imfp_depth' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Độ Sâu Thâm Nhập Bề Mặt IMFP & Kỹ Thuật ARXPS Phân Giải Chiều Sâu
              </h4>

              <div className="p-3.5 bg-navy-light/40 border border-purple-500/20 rounded-xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-200">Định Luật Seah & Dench (Universal Inelastic Mean Free Path Curve):</span>
                  <span className="font-mono text-purple-300 font-bold">λ = {imfpNm} nm</span>
                </div>
                <div className="p-2 bg-navy-dark/80 rounded border border-purple-500/30 font-mono text-center text-purple-200">
                  d_sampling = 3 · λ_IMFP · cos(θ_takeoff) = {samplingDepthNm} nm
                </div>
                <p className="text-ivory-muted text-[11px] leading-relaxed">
                  Tại góc pháp tuyến θ = 0°, chùm electron thu thập thông tin từ lớp bề mặt sâu đến {samplingDepthNm} nm (khoảng 25-30 lớp đơn nguyên tử). Khi nghiêng mẫu sang góc tà θ = 60°, quãng đường electron phải vượt qua môi trường tăng gấp đôi (1/cos 60° = 2), khiến độ sâu lấy mẫu co lại chỉ còn {(samplingDepthNm / 2).toFixed(1)} nm, cho phép phát hiện lớp màng mỏng oxit và nhóm chức hóa học ngoài cùng mà không cần bắn phá chùm ion Ar⁺ làm hỏng mẫu.
                </p>
              </div>

              {/* Angle Slider inside Tab */}
              <div className="p-3 bg-navy-light/30 border border-white/5 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-amber-300">Mô Phỏng Độ Sâu Khảo Sát Theo Góc Thoát:</span>
                  <span className="font-mono text-cyan-300">{takeOffAngleDeg}° → d = {samplingDepthNm} nm</span>
                </div>
                <div className="w-full h-4 bg-navy-dark rounded-full overflow-hidden flex border border-white/10">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-purple-500 h-full transition-all duration-300"
                    style={{ width: `${Math.max(15, (samplingDepthNm / 12) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                  <span>0 nm (Mặt ngoài cùng)</span>
                  <span>10 nm (Lớp chất nền sâu)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nobel_curriculum_gdpt' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Vinh Danh Nobel Vật Lý & Tích Hợp Chương Trình Hóa Học GDPT 2018
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-navy-light/40 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Nobel Vật Lý 1981 - Kai M. Siegbahn (Đại học Uppsala, Thụy Điển)
                  </div>
                  <p className="text-ivory-muted text-[11px] leading-relaxed">
                    Được vinh danh nhờ công trình tiên phong phát triển phương pháp quang phổ điện tử phân giải cao (ESCA - Electron Spectroscopy for Chemical Analysis). Siegbahn đã biến hiện tượng quang điện thành công cụ xác định cấu trúc hóa học và phân định các trạng thái oxi hóa bề mặt của mọi nguyên tố trong Bảng tuần hoàn.
                  </p>
                </div>

                <div className="p-3 bg-navy-light/40 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="font-bold text-cyan-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Chương Trình GDPT 2018 (Hóa Học 10, 11 & 12)
                  </div>
                  <ul className="text-ivory-muted text-[11px] space-y-1 list-disc list-inside">
                    <li>
                      <strong className="text-white">Hóa học 10 (Chủ đề Cấu tạo nguyên tử):</strong> Năng lượng ion hóa liên tiếp (I₁, I₂, I₃) và năng lượng liên kết orbital lõi (1s, 2s, 2p).
                    </li>
                    <li>
                      <strong className="text-white">Hóa học 11 (Liên kết hóa học & Cân bằng):</strong> Hiệu ứng chuyển dịch hóa học do độ âm điện (χ) và sự phân cực electron trong liên kết C-C, C-O, C=O.
                    </li>
                    <li>
                      <strong className="text-white">Hóa học 12 (Vật liệu Polymer & Pin điện hóa):</strong> Phân tích bề mặt điện cực pin Li-ion (màng SEI), xúc tác dị thể và vật liệu nano bán dẫn vi mạch.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 span): Pedagogical Commentary & Theory Card */}
        <div className="space-y-4">
          <div className="bg-navy-dark/90 border border-amber-500/30 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              Báo Cáo Phân Tích Thực Nghiệm IUPAC
            </h4>
            <div className="p-3 bg-obsidian/70 rounded-lg border border-white/5 font-mono text-[11px] leading-relaxed text-amber-100/90 max-h-80 overflow-y-auto">
              {simResult.pedagogicalAnalysisVI}
            </div>
          </div>

          <div className="bg-navy-dark/90 border border-cyan-500/30 rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-cyan-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Quy Chuẩn Hiệu Chuẩn Bề Mặt (Adventitious C)
            </h4>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Mọi mẫu tiếp xúc khí quyển đều có một lớp hydrocacbon hấp phụ tự nhiên. Theo quy chuẩn IUPAC và ASTM, đỉnh vạch C-C/C-H sp³ của carbon này luôn được cố định ở <strong className="text-white">284.8 eV</strong> để bù trừ hiện tượng tích điện tĩnh bề mặt (Sample Charging Effect).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
