import React, { useState } from 'react';
import { ChemicalEnvironmentState, ChemicalEnvironmentEngine, UniversalIndicatorData } from '../../domain/chemicalEnvironment';
import { Droplets, Flame, Gauge, Shield, Zap, ChevronDown, ChevronUp, Info, Wind } from 'lucide-react';

interface ChemicalEnvironmentHudProps {
  environment: ChemicalEnvironmentState;
}

export const ChemicalEnvironmentHud: React.FC<ChemicalEnvironmentHudProps> = ({ environment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const indicator: UniversalIndicatorData = ChemicalEnvironmentEngine.getUniversalIndicatorData(environment.ph);

  const tempCelsius = (environment.temperature - 273.15).toFixed(1);
  const pressureMpa = (environment.pressure * 0.101325).toFixed(2);

  // Temperature color logic
  let tempColor = 'text-emerald-400';
  let tempBg = 'bg-emerald-950/60 border-emerald-500/50';
  if (environment.temperature > 500) {
    tempColor = 'text-rose-400';
    tempBg = 'bg-rose-950/60 border-rose-500/50 animate-pulse';
  } else if (environment.temperature > 320) {
    tempColor = 'text-amber-400';
    tempBg = 'bg-amber-950/60 border-amber-500/50';
  } else if (environment.temperature < 273.15) {
    tempColor = 'text-cyan-400';
    tempBg = 'bg-cyan-950/60 border-cyan-500/50';
  }

  // Pressure color logic
  let pressColor = 'text-emerald-400';
  let pressBg = 'bg-emerald-950/60 border-emerald-500/50';
  if (environment.pressure > 10) {
    pressColor = 'text-purple-400';
    pressBg = 'bg-purple-950/60 border-purple-500/50';
  } else if (environment.pressure < 0.8) {
    pressColor = 'text-blue-400';
    pressBg = 'bg-blue-950/60 border-blue-500/50';
  }

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl transition-all">
      {/* Top Main Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Environment Title & Field Card */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
            <Wind className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">MÔI TRƯỜNG ĐẤU TRƯỜNG</span>
              {environment.environmentCardName && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950 border border-cyan-500/60 text-cyan-300">
                  {environment.environmentCardName}
                  {environment.turnsRemaining !== undefined ? ` (${environment.turnsRemaining}T)` : ''}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Đo lường nhiệt động học, pH & động hóa học theo chuẩn IUPAC</p>
          </div>
        </div>

        {/* 3 Main Meters (pH, Temperature, Pressure) */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* pH Indicator Meter */}
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${indicator.bgClass}`}
            style={{ boxShadow: `0 0 10px ${indicator.glowHex}` }}
            title={indicator.description}
          >
            <Droplets className="w-3.5 h-3.5" style={{ color: indicator.hex }} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-black" style={{ color: indicator.hex }}>
                  pH {environment.ph.toFixed(1)}
                </span>
                <span className="text-[10px] opacity-90 font-medium">({indicator.label.split(' ')[0]})</span>
              </div>
            </div>
          </div>

          {/* Temperature Meter */}
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${tempBg}`}
            title={`Nhiệt độ hiện tại: ${tempCelsius}°C (${environment.temperature.toFixed(1)} K). Ảnh hưởng đến động học Van 't Hoff.`}
          >
            <Flame className={`w-3.5 h-3.5 ${tempColor}`} />
            <span className={`font-mono font-black ${tempColor}`}>
              {tempCelsius}°C
            </span>
            <span className="text-[10px] text-slate-400">({environment.temperature.toFixed(0)}K)</span>
          </div>

          {/* Pressure Meter */}
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${pressBg}`}
            title={`Áp suất: ${environment.pressure.toFixed(1)} atm (${pressureMpa} MPa). Áp dụng nguyên lý Le Chatelier.`}
          >
            <Gauge className={`w-3.5 h-3.5 ${pressColor}`} />
            <span className={`font-mono font-black ${pressColor}`}>
              {environment.pressure.toFixed(1)} atm
            </span>
          </div>

          {/* Buffer Capacity Tag */}
          {environment.bufferCapacity > 0 && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-950/70 border border-teal-500/50 text-[11px] text-teal-300 font-medium"
              title={`Hệ đệm chủ động: ${environment.bufferType}. Hấp thụ biến thiên pH (${environment.bufferCapacity} lượt bảo vệ)`}
            >
              <Shield className="w-3 h-3 text-teal-400" />
              <span>Đệm: {environment.bufferCapacity}</span>
            </div>
          )}

          {/* Catalysts Badges */}
          {environment.activeCatalysts.length > 0 && (
            <div className="flex items-center gap-1">
              {environment.activeCatalysts.map(cat => (
                <span 
                  key={cat} 
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 border border-amber-500/60 text-amber-300 flex items-center gap-0.5"
                  title={`Xúc tác hoạt hóa ${cat}: Giảm năng lượng hoạt hóa Ea, tăng +150 ATK`}
                >
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Expand Details Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Chi tiết nhiệt động học môi trường"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded IUPAC Thermodynamic & Kinetic Inspector */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* pH & Universal Indicator Scale */}
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1.5">
              <span>Thang Chỉ Thị Vạn Năng (Universal Indicator)</span>
              <span className="font-mono font-black" style={{ color: indicator.hex }}>pH {environment.ph.toFixed(2)}</span>
            </div>
            {/* Visual gradient bar */}
            <div className="relative h-2 w-full rounded-full overflow-hidden bg-gradient-to-r from-red-600 via-amber-400 via-emerald-400 via-cyan-400 to-purple-600 mb-1.5">
              <div 
                className="absolute top-0 bottom-0 w-2 -ml-1 bg-white border border-black shadow"
                style={{ left: `${Math.min(100, Math.max(0, (environment.ph / 14) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 mb-1">
              <span>0 (Acid)</span>
              <span>7 (Neutral)</span>
              <span>14 (Alkali)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{indicator.description}</p>
          </div>

          {/* Le Chatelier & Van 't Hoff Kinetics */}
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cân Bằng & Động Hóa Học</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300">
              <li>
                <span className="text-slate-400">Le Chatelier (Áp suất):</span>{' '}
                {environment.pressure > 5.0 ? (
                  <span className="text-purple-300 font-medium">Áp suất cao ưu tiên chiều giảm số mol khí (Haber +45% yield)</span>
                ) : environment.pressure < 0.8 ? (
                  <span className="text-blue-300 font-medium">Hạ áp dịch chuyển chiều phân ly khí tăng số mol</span>
                ) : (
                  <span className="text-emerald-300 font-medium">Áp suất chuẩn SATP 1.0 atm ổn định</span>
                )}
              </li>
              <li>
                <span className="text-slate-400">Van 't Hoff (Nhiệt độ):</span>{' '}
                {environment.temperature > 400 ? (
                  <span className="text-rose-300 font-medium">Tỏa nhiệt bị ức chế; Phản ứng thu nhiệt (ΔH &gt; 0) được kích hoạt</span>
                ) : environment.temperature < 273.15 ? (
                  <span className="text-cyan-300 font-medium">Lạnh đông: Năng lượng kích hoạt Ea cao, tốc độ phản ứng giảm</span>
                ) : (
                  <span className="text-emerald-300 font-medium">Nhiệt độ phòng (25°C), vận tốc phản ứng chuẩn</span>
                )}
              </li>
            </ul>
          </div>

          {/* Combat Buffs & Resistances in Active Environment */}
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Hiệu Ứng Chiến Đấu Môi Trường</span>
            </div>
            <div className="space-y-1 text-[11px]">
              {environment.ph < 4.0 && (
                <div className="text-red-300 flex items-center justify-between">
                  <span>Axit mạnh: Kim loại kiềm/kiềm thổ</span>
                  <span className="font-bold text-red-400">+300 ATK / -200 DEF</span>
                </div>
              )}
              {environment.ph > 9.0 && (
                <div className="text-cyan-300 flex items-center justify-between">
                  <span>Môi trường kiềm: Lưỡng tính (Al, Zn)</span>
                  <span className="font-bold text-cyan-400">+400 ATK</span>
                </div>
              )}
              {environment.temperature > 500 && (
                <div className="text-rose-300 flex items-center justify-between">
                  <span>Nhiệt độ cực cao (&gt;500K): Quái PYRO</span>
                  <span className="font-bold text-rose-400">+350 ATK</span>
                </div>
              )}
              {environment.temperature < 273.15 && (
                <div className="text-cyan-300 flex items-center justify-between">
                  <span>Băng giá đóng băng: Quái AQUA</span>
                  <span className="font-bold text-cyan-400">+400 DEF</span>
                </div>
              )}
              {environment.activeCatalysts.length > 0 && (
                <div className="text-amber-300 flex items-center justify-between">
                  <span>Xúc tác hoạt động ({environment.activeCatalysts.join(', ')}):</span>
                  <span className="font-bold text-amber-400">+{environment.activeCatalysts.length * 150} ATK</span>
                </div>
              )}
              {environment.ph >= 4.0 && environment.ph <= 9.0 && environment.temperature <= 500 && environment.temperature >= 273.15 && environment.activeCatalysts.length === 0 && (
                <div className="text-slate-400 italic">Môi trường ổn định, không có đột biến công/thủ nguyên tố.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
