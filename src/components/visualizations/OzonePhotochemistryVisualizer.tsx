// src/components/visualizations/OzonePhotochemistryVisualizer.tsx
// Milestone 45: Atmospheric Photochemistry & Chapman Ozone Cycle Visualizer
// Standards: Nobel Prize in Chemistry 1995 (Molina, Rowland, Crutzen) & Montreal Protocol on Substances that Deplete the Ozone Layer
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Oxi - Ozon; Hóa học 12: Hóa học môi trường - Thủng tầng ozon & Khí làm lạnh CFC)

import React, { useState } from 'react';
import {
  ATMOSPHERIC_LAYERS,
  OzoneCatalyticCycle,
  calculateOzonePhotochemistry,
} from '../../domain/ozonePhotochemistryEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sun,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  CloudSun
} from 'lucide-react';

export interface OzonePhotochemistryVisualizerProps {
  initialAltitudeKm?: number;
  initialCycle?: OzoneCatalyticCycle;
}

export const OzonePhotochemistryVisualizer: React.FC<OzonePhotochemistryVisualizerProps> = ({
  initialAltitudeKm,
  initialCycle,
}) => {
  const [altitudeKm, setAltitudeKm] = useState<number>(initialAltitudeKm || 22.0); // 22 km (Ozone Peak)
  const [catalyticCycle, setCatalyticCycle] = useState<OzoneCatalyticCycle>(initialCycle || 'CHAPMAN_NATURAL');
  const [halogenPptv, setHalogenPptv] = useState<number>(0.0); // 0 pptv
  const [activeTab, setActiveTab] = useState<'altitude_profile' | 'chapman_cycle' | 'catalytic_depletion' | 'dobson_shield'>('altitude_profile');

  const ozoneResult = calculateOzonePhotochemistry(
    altitudeKm,
    catalyticCycle,
    halogenPptv
  );

  const handleCycleChange = (cycle: OzoneCatalyticCycle) => {
    setCatalyticCycle(cycle);
    if (cycle !== 'CHAPMAN_NATURAL' && halogenPptv === 0) {
      setHalogenPptv(25.0); // Default to 25 pptv when halogen cycle selected
      sound.playOzoneDepletionAlarmWhoosh();
    } else {
      sound.playUvPhotonAbsorptionChime();
    }
  };

  const handleAltitudeChange = (val: number) => {
    setAltitudeKm(val);
    if (val >= 18 && val <= 26) {
      sound.playUvPhotonAbsorptionChime();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-sky-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel 1995 & GDPT 2018 Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Sun className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Quang Hóa Khí Quyển & Chu Trình Ozon Chapman
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-mono">
                Hóa 10 & 12 GDPT • Nobel 1995
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Quang phân tia cực tím Hartley, Cân bằng quang hóa O3/O2, Chu trình xúc tác hủy diệt gốc Clo (CFC) & Đơn vị Dobson (DU).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-sky-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-mono">
            {ozoneResult.totalColumnDobsonUnits.toFixed(0)} DU • {ozoneResult.isOzoneHoleCondition ? 'LỖ THỦNG OZON' : 'LÁ CHẮN AN TOÀN'}
          </span>
        </div>
      </div>

      {/* 2. Catalytic Mechanism Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ivory-muted uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-sky-400" />
          Chọn Cơ Chế Quang Hóa & Chu Trình Xúc Tác:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'CHAPMAN_NATURAL', name: '1. Chu Trình Tự Nhiên', sub: 'Chapman (1930) Thuần Khiết', color: 'sky' },
            { id: 'CHLORINE_CFC', name: '2. Xúc Tác Gốc Clo (CFC)', sub: 'Molina & Rowland (Nobel 1995)', color: 'rose' },
            { id: 'BROMINE_HALON', name: '3. Xúc Tác Brom (Halon)', sub: 'Hoạt tính x45 lần Clo', color: 'amber' },
            { id: 'NITROGEN_OXIDES', name: '4. Oxit Nitơ (NOx)', sub: 'Paul Crutzen (Khí thải Concorde)', color: 'purple' },
            { id: 'HYDROXYL_RADICAL', name: '5. Gốc Hydroxyl (HOx)', sub: 'Hơi nước & O(1D) kích thích', color: 'teal' },
          ].map((item) => {
            const isSelected = catalyticCycle === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleCycleChange(item.id as OzoneCatalyticCycle)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg ring-1 ring-sky-500/30'
                    : 'bg-navy-dark/40 border-navy-light/40 text-ivory hover:border-sky-500/40 hover:bg-navy-dark/70'
                }`}
              >
                <div className="text-xs font-bold truncate">{item.name}</div>
                <div className="text-[9px] text-sky-300 truncate mt-0.5">{item.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-3">
        {[
          { id: 'altitude_profile', label: '1. Phân Bố Ozon Theo Độ Cao (0 - 50 km)', icon: TrendingUp },
          { id: 'chapman_cycle', label: '2. Chu Trình 4 Bước Chapman', icon: Layers },
          { id: 'catalytic_depletion', label: '3. Phản Ứng Dây Chuyền Gốc Tự Do', icon: Zap },
          { id: 'dobson_shield', label: '4. Cột Dobson & Lá Chắn Tia UV-B', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playUvPhotonAbsorptionChime();
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-500 text-navy-dark font-bold shadow-md shadow-sky-500/20'
                  : 'bg-navy-dark/50 text-ivory-muted hover:text-white hover:bg-navy-dark/80 border border-navy-light/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Main Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Graph / Atmosphere Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            {activeTab === 'altitude_profile' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-sky-400">
                    Mật Độ Nồng Độ Ozon [O3] (Xanh Lam) & Bức Xạ UV Thâm Nhập (Vàng) Theo Độ Cao
                  </span>
                  <span className="font-mono text-ivory-muted">
                    z = {altitudeKm.toFixed(1)} km • {ozoneResult.layer.nameVI}
                  </span>
                </div>

                {/* SVG Atmospheric Profile */}
                <div className="relative h-64 w-full bg-navy/60 rounded-xl border border-navy-light/40 p-2">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="50" y1="20" x2="50" y2="210" stroke="#334155" strokeWidth="1.5" />
                    <line x1="50" y1="210" x2="480" y2="210" stroke="#334155" strokeWidth="1.5" />

                    {/* Stratospheric Ozone Layer Peak Band (15 to 30 km) */}
                    <rect x="50" y="80" width="430" height="75" fill="#0284c7" fillOpacity="0.12" />
                    <text x="320" y="98" fill="#38bdf8" fontSize="10" fontStyle="italic">
                      Tầng Bình Lưu (Ozone Peak: 15 - 30 km)
                    </text>

                    {/* Ozone Concentration Profile Curve (peaks at ~22 km) */}
                    <path
                      d={(() => {
                        let path = 'M 50 210';
                        for (let z = 0; z <= 50; z += 1.0) {
                          const peakZ = 22.0;
                          const spread = 6.5;
                          const weight = Math.exp(-Math.pow((z - peakZ) / spread, 2));
                          const density = 4.8 * weight / ozoneResult.ozoneDestructionAmplificationFactor;
                          const x = 50 + (density / 5.2) * 400;
                          const y = 210 - (z / 50) * 190;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />

                    {/* UV Penetration Curve (decreases sharply around 20-25 km) */}
                    <path
                      d={(() => {
                        let path = 'M 450 20';
                        for (let z = 50; z >= 0; z -= 1.0) {
                          const factor = 1.0 / (1.0 + Math.exp(-(z - 22) / 3.0));
                          const x = 50 + factor * 400;
                          const y = 210 - (z / 50) * 190;
                          path += ` L ${x} ${y}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="1.8"
                      strokeDasharray="4 4"
                    />

                    {/* Current Altitude Indicator */}
                    {(() => {
                      const y = 210 - (altitudeKm / 50) * 190;
                      return (
                        <g>
                          <line x1="50" y1={y} x2="480" y2={y} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx="50" cy={y} r="4" fill="#f43f5e" />
                          <text x="55" y={y - 5} fill="#f43f5e" fontSize="10" fontWeight="bold">
                            z = {altitudeKm.toFixed(1)} km
                          </text>
                        </g>
                      );
                    })()}

                    {/* Axis Labels */}
                    <text x="400" y="225" fill="#94a3b8" fontSize="10">[O3] (10¹² phân tử/cm³)</text>
                    <text x="15" y="30" fill="#94a3b8" fontSize="10">Độ cao (km)</text>
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'chapman_cycle' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-sky-400">
                    Bốn Bước Cân Bằng Quang Hóa Chapman (Sydney Chapman 1930)
                  </span>
                  <span className="font-mono text-ivory-muted">Quang phổ hấp thụ dải Hartley (UV-B)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                    <div className="font-bold text-sky-300 flex items-center justify-between">
                      <span>1. Sinh nguyên tử O (Quang phân O2)</span>
                      <span className="font-mono text-[10px] text-ivory-muted">λ &lt; 242 nm</span>
                    </div>
                    <div className="font-mono text-xs text-white bg-navy-dark/70 p-2 rounded border border-navy-light/30">
                      O₂ + hν (UV-C) → 2 O(³P)
                    </div>
                    <p className="text-[10px] text-ivory-muted">
                      Tia cực tím UV-C năng lượng cao từ Mặt Trời bẻ gãy liên kết đôi O=O bền vững (498 kJ/mol).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center justify-between">
                      <span>2. Tổng hợp Ozon O3</span>
                      <span className="font-mono text-[10px] text-ivory-muted">Va chạm 3 vật thể</span>
                    </div>
                    <div className="font-mono text-xs text-white bg-navy-dark/70 p-2 rounded border border-navy-light/30">
                      O(³P) + O₂ + M → O₃ + M
                    </div>
                    <p className="text-[10px] text-ivory-muted">
                      Phân tử thứ ba M (N₂ hoặc O₂) mang đi phần động năng dư thừa để ổn định phân tử O₃ vừa tạo thành.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                    <div className="font-bold text-amber-300 flex items-center justify-between">
                      <span>3. Lá chắn Hartley (Quang phân O3)</span>
                      <span className="font-mono text-[10px] text-ivory-muted">200 &lt; λ &lt; 310 nm</span>
                    </div>
                    <div className="font-mono text-xs text-white bg-navy-dark/70 p-2 rounded border border-navy-light/30">
                      O₃ + hν (UV-B) → O₂ + O(¹D)
                    </div>
                    <p className="text-[10px] text-ivory-muted">
                      Phản ứng sinh học sống còn: O₃ hấp thụ 99% tia UV-B nguy hiểm, bảo vệ ADN tế bào và sinh quyển.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                    <div className="font-bold text-rose-300 flex items-center justify-between">
                      <span>4. Tái hợp Odd-Oxygen</span>
                      <span className="font-mono text-[10px] text-ivory-muted">Thu hồi O2</span>
                    </div>
                    <div className="font-mono text-xs text-white bg-navy-dark/70 p-2 rounded border border-navy-light/30">
                      O₃ + O → 2 O₂
                    </div>
                    <p className="text-[10px] text-ivory-muted">
                      Phản ứng phân hủy ozon tự nhiên rất chậm (năng lượng hoạt hóa cao ~17 kJ/mol).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'catalytic_depletion' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-rose-400">
                    Cơ Chế Phá Hủy Dây Chuyền Của Gốc Tự Do (Molina & Rowland - Nobel 1995)
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                    Hệ số khuếch đại: ×{ozoneResult.ozoneDestructionAmplificationFactor.toFixed(1)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3">
                  <div className="font-mono text-xs space-y-1.5 text-ivory">
                    <div className="text-amber-300 font-bold">1. Phản ứng khơi mào (Quang phân khí CFC tại tầng bình lưu):</div>
                    <div className="pl-4 text-white">CF₂Cl₂ + hν (UV-C) → ·CF₂Cl + Cl·</div>

                    <div className="text-rose-400 font-bold mt-2">2. Chu trình dây chuyền xúc tác hủy diệt (Catalytic Cycle):</div>
                    <div className="pl-4 text-rose-200">Cl· + O₃ → ClO· + O₂</div>
                    <div className="pl-4 text-rose-200">ClO· + O → Cl· + O₂</div>
                    <div className="pl-4 text-emerald-400 font-semibold border-t border-navy-light/30 pt-1">
                      Tổng hợp ròng: O₃ + O → 2 O₂ (Gốc Cl· được hoàn nguyên!)
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-200 leading-relaxed">
                    Một nguyên tử Clo đơn lẻ có thể phá hủy tới <strong>100.000 phân tử Ozon</strong> trước khi bị vô hiệu hóa thành các hợp chất kho chứa như HCl hoặc ClONO₂. Đây là cơ sở khoa học dẫn đến <strong>Nghị định thư Montreal 1987</strong> cấm hoàn toàn sản xuất CFC trên toàn cầu.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dobson_shield' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-sky-400">
                    Mức Cột Ozon Tổng Cộng (Dobson Units) & Độ Che Chắn Tia UV-B
                  </span>
                  <span className="font-mono text-ivory-muted">
                    1 DU = 0.01 mm O3 ở điều kiện chuẩn STP (0 °C, 1 atm)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dobson Gauge Card */}
                  <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-ivory-muted font-mono">Bề dày cột khí quyển nén STP:</div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">
                        {ozoneResult.totalColumnDobsonUnits.toFixed(0)} DU
                        <span className="text-xs text-ivory-muted font-normal ml-2">
                          (= {(ozoneResult.totalColumnDobsonUnits * 0.01).toFixed(2)} mm)
                        </span>
                      </div>
                    </div>

                    {/* Visual Threshold Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-rose-400 font-bold">Lỗ thủng (&lt; 220 DU)</span>
                        <span className="text-emerald-400 font-bold">An toàn (~300 - 400 DU)</span>
                      </div>
                      <div className="w-full h-3 bg-navy-dark rounded-full overflow-hidden border border-navy-light/40 flex">
                        <div className="h-full bg-rose-500 w-[45%]"></div>
                        <div className="h-full bg-emerald-500 w-[55%]"></div>
                      </div>
                    </div>

                    {ozoneResult.isOzoneHoleCondition ? (
                      <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        Trạng thái Lỗ Thủng Tầng Ozon (Nguy cơ ung thư da cao)
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-1.5 font-bold">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        Tầng Ozon Đạt Chuẩn Bảo Vệ Sinh Quyển An Toàn
                      </div>
                    )}
                  </div>

                  {/* UV-B Shielding Card */}
                  <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/40 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-ivory-muted font-mono">Hiệu suất hấp thụ tia UV-B:</div>
                      <div className="text-2xl font-bold font-mono text-sky-300 mt-1">
                        {ozoneResult.uvBShieldingEfficiencyPercent.toFixed(1)}%
                      </div>
                    </div>

                    <p className="text-[11px] text-ivory-muted leading-relaxed">
                      Định luật Beer-Lambert: Cường độ tia UV-B thâm nhập xuống mặt đất phụ thuộc hàm mũ âm vào bề dày cột ozon I = I₀ exp(-σ·Column).
                    </p>

                    <div className="text-[10px] text-emerald-300 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tia UV-C (λ &lt; 280 nm) bị chặn 100% hoàn toàn.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Commentary Banner */}
          <div className="bg-navy-dark/60 border border-sky-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed text-ivory-light">
              <span className="font-semibold text-sky-300">Nhận định sư phạm GDPT 2018: </span>
              {ozoneResult.pedagogicalInsightVI}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Real-Time Quantitative Readouts */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-navy-light/50 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-navy-light/40 pb-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              Điều Khiển Tầng Khí Quyển
            </h3>

            {/* Altitude Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Độ cao khí quyển (z):</span>
                <span className="font-mono text-sky-400 font-bold">{altitudeKm.toFixed(1)} km</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={altitudeKm}
                onChange={(e) => handleAltitudeChange(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Halogen Radicals Slider (when catalytic cycle active) */}
            {catalyticCycle !== 'CHAPMAN_NATURAL' && (
              <div className="space-y-1.5 pt-2 border-t border-navy-light/30">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Nồng độ gốc Halogen (ClO/BrO):</span>
                  <span className="font-mono text-rose-400 font-bold">{halogenPptv.toFixed(1)} pptv</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={halogenPptv}
                  onChange={(e) => setHalogenPptv(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            )}

            {/* Real-Time Quantitative Atmospheric Cards */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-light/30 text-xs">
              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Nồng độ [O3]</div>
                <div className="text-sm font-bold text-sky-400 font-mono">
                  {(ozoneResult.steadyStateOzoneNumberDensityCm3 / 1e12).toFixed(2)}
                  <span className="text-[9px] text-ivory-muted ml-0.5">×10¹² cm⁻³</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Tỷ lệ trộn (Mixing)</div>
                <div className="text-sm font-bold text-white font-mono">
                  {ozoneResult.steadyStateOzonePpmv.toFixed(2)} ppmv
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Áp suất khí quyển</div>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  {ozoneResult.pressureHPa.toFixed(1)} hPa
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy/60 border border-navy-light/40">
                <div className="text-[10px] text-ivory-muted">Nhiệt độ (T)</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {ozoneResult.temperatureKelvin.toFixed(1)} K
                </div>
              </div>
            </div>

            {/* Montreal Protocol Protection Banner */}
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-[11px] text-sky-200 flex items-start gap-2">
              <CloudSun className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                Nghị định thư Montreal 1987 là hiệp ước môi trường thành công nhất lịch sử nhân loại, giúp tầng ozon phục hồi dần về mức trước năm 1980.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
