// src/components/visualizations/NuclearShellVisualizer.tsx
// Milestone 41: Nuclear Shell Model, Magic Numbers, Binding Energy per Nucleon & Aston Packing Fraction Visualizer
// Standards: IUPAC Gold Book, CODATA 2018, Nobel Prize in Physics 1963 & Vietnam GDPT 2018 (Hóa 10 & Vật lí 12: Hạt nhân nguyên tử)

import React, { useState } from 'react';
import {
  NUCLEAR_ISOTOPES,
  NuclearIsotope,
  MAGIC_NUMBERS,
  SUPERHEAVY_MAGIC_NUMBERS,
  evaluateNuclearMagicStability,
  calculateMassDefectAndBindingEnergy,
  calculateSemiEmpiricalMassFormula,
  simulateDTFusionReaction,
  simulateU235FissionReaction,
} from '../../domain/nuclearShellEngine';
import { sound } from '../../audio/soundEngine';
import {
  Radiation,
  Zap,
  Sparkles,
  Layers,
  Scale,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Activity
} from 'lucide-react';

export interface NuclearShellVisualizerProps {
  initialIsotopeId?: string;
}

export const NuclearShellVisualizer: React.FC<NuclearShellVisualizerProps> = ({
  initialIsotopeId,
}) => {
  const [selectedIsotopeId, setSelectedIsotopeId] = useState<string>(initialIsotopeId || 'ni62');
  const [activeTab, setActiveTab] = useState<'binding_energy' | 'nuclear_shell' | 'semi_empirical' | 'reactions'>('binding_energy');

  // Interactive custom Z and N
  const [customZ, setCustomZ] = useState<number>(28);
  const [customN, setCustomN] = useState<number>(34);
  const [useCustomNuclide, setUseCustomNuclide] = useState<boolean>(false);

  const selectedPreset: NuclearIsotope = NUCLEAR_ISOTOPES[selectedIsotopeId] || NUCLEAR_ISOTOPES.ni62;

  const currentZ = useCustomNuclide ? customZ : selectedPreset.atomicNumberZ;
  const currentN = useCustomNuclide ? customN : selectedPreset.neutronNumberN;
  const currentA = currentZ + currentN;

  const stabilityInfo = evaluateNuclearMagicStability(currentZ, currentN);
  const bindingData = calculateMassDefectAndBindingEnergy(
    currentZ,
    currentN,
    useCustomNuclide ? undefined : selectedPreset.exactMassU
  );
  const semfData = calculateSemiEmpiricalMassFormula(currentZ, currentA);

  const dtFusion = simulateDTFusionReaction();
  const u235Fission = simulateU235FissionReaction();

  const getMagicStatusBadge = () => {
    switch (stabilityInfo.magicStatus) {
      case 'DOUBLY_MAGIC':
        return {
          label: 'HẠT NHÂN MA THUẬT KÉP (DOUBLY MAGIC)',
          bg: 'bg-amber-950/70 border-amber-500/70 text-amber-300',
          icon: <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        };
      case 'PROTON_MAGIC':
        return {
          label: `MA THUẬT PROTON (Z = ${currentZ})`,
          bg: 'bg-emerald-950/70 border-emerald-500/70 text-emerald-300',
          icon: <Shield className="w-4 h-4 text-emerald-400" />
        };
      case 'NEUTRON_MAGIC':
        return {
          label: `MA THUẬT NEUTRON (N = ${currentN})`,
          bg: 'bg-cyan-950/70 border-cyan-500/70 text-cyan-300',
          icon: <Shield className="w-4 h-4 text-cyan-400" />
        };
      case 'NON_MAGIC':
        return {
          label: 'VỎ HẠT NHÂN MỞ (NON-MAGIC)',
          bg: 'bg-navy-light/40 border-white/20 text-ivory-muted',
          icon: <Activity className="w-4 h-4 text-ivory-muted" />
        };
    }
  };

  const magicBadge = getMagicStatusBadge();

  return (
    <div className="w-full bg-navy/90 border border-purple-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Prize 1963 & GDPT 2018 badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <Radiation className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Mô Hình Vỏ Hạt Nhân & Đường Cong Năng Lượng Liên Kết
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono">
                Nobel 1963
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Khám phá Số Ma Thuật ({MAGIC_NUMBERS.join(', ')}), Đỉnh B/A ở Niken-62 & Sắt-56, Công thức Bethe-Weizsäcker & Phân hạch/Nhiệt hạch.
          </p>
        </div>

        {/* Global Isotope Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-ivory-muted font-mono whitespace-nowrap">Đồng vị:</span>
          <select
            value={useCustomNuclide ? 'custom' : selectedIsotopeId}
            onChange={(e) => {
              sound.playUiClick();
              if (e.target.value === 'custom') {
                setUseCustomNuclide(true);
              } else {
                setUseCustomNuclide(false);
                setSelectedIsotopeId(e.target.value);
                const iso = NUCLEAR_ISOTOPES[e.target.value];
                if (iso && (iso.magicStatus === 'DOUBLY_MAGIC' || iso.magicStatus === 'PROTON_MAGIC')) {
                  sound.playNuclearResonanceHum?.();
                } else {
                  sound.playNuclearDecayClick?.();
                }
              }
            }}
            className="w-full sm:w-64 bg-navy-light/60 border border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
          >
            {Object.values(NUCLEAR_ISOTOPES).map((iso) => (
              <option key={iso.id} value={iso.id} className="bg-navy text-white">
                {iso.symbol} - {iso.nameVI} ({iso.magicStatus === 'DOUBLY_MAGIC' ? '★ Ma thuật kép' : iso.bindingEnergyPerNucleonMeV > 8.7 ? '★ Đỉnh B/A' : ''})
              </option>
            ))}
            <option value="custom" className="bg-navy text-amber-300">
              🛠️ Tùy biến (Custom Z & N)
            </option>
          </select>
        </div>
      </div>

      {/* 2. Magic Numbers Key Bar */}
      <div className="p-3.5 rounded-xl bg-navy-light/30 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-purple-300 font-bold">Các số ma thuật (Magic Numbers):</span>
          <div className="flex gap-1.5">
            {MAGIC_NUMBERS.map((m) => (
              <span
                key={m}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  currentZ === m || currentN === m
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/50 scale-110 font-extrabold'
                    : 'bg-navy-light/60 text-purple-200 border border-purple-500/30'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Magic Status Pill */}
        <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 font-bold text-xs ${magicBadge.bg}`}>
          {magicBadge.icon}
          <span>{magicBadge.label}</span>
        </div>
      </div>

      {/* 3. Sub-tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('binding_energy');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'binding_energy'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Đường Cong B/A vs Số Khối A (Fusion vs Fission)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            sound.playNuclearResonanceHum?.();
            setActiveTab('nuclear_shell');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'nuclear_shell'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mô Hình Phân Lớp Vỏ Hạt Nhân (Goeppert Mayer)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('semi_empirical');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'semi_empirical'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Công Thức Bethe-Weizsäcker (Giọt Chất Lỏng SEMF)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('reactions');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reactions'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Năng Lượng Phản Ứng (D-T Nhiệt Hạch & U-235 Phân Hạch)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BINDING ENERGY PER NUCLEON (B/A) CURVE SVG                         */}
      {/* ========================================================================= */}
      {activeTab === 'binding_energy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Custom Nuclide Sliders if enabled */}
          {useCustomNuclide && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-purple-500/20">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ivory-muted">Số proton (Z):</span>
                  <span className="text-purple-300 font-bold">{customZ}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="118"
                  value={customZ}
                  onChange={(e) => setCustomZ(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ivory-muted">Số neutron (N):</span>
                  <span className="text-cyan-300 font-bold">{customN}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="184"
                  value={customN}
                  onChange={(e) => setCustomN(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Interactive Binding Energy per Nucleon Chart SVG */}
          <div className="p-4 rounded-xl bg-black/60 border border-purple-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 gap-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Đường Cong Năng Lượng Liên Kết Riêng (B/A theo Số Khối A)</span>
              </div>
              <div className="text-xs font-mono text-purple-300">
                Đỉnh tuyệt đối: <strong className="text-white">62Ni (8.795 MeV)</strong> & <strong className="text-white">56Fe (8.790 MeV)</strong>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 760 300" className="w-full max-w-4xl h-auto font-mono">
                {/* Background Grid */}
                <line x1="60" y1="20" x2="60" y2="250" stroke="#334155" strokeWidth="1.5" />
                <line x1="60" y1="250" x2="720" y2="250" stroke="#334155" strokeWidth="1.5" />

                {/* Y-axis ticks (0 to 10 MeV) */}
                {[0, 2, 4, 6, 8, 10].map((mev) => {
                  const y = 250 - (mev / 10) * 220;
                  return (
                    <g key={mev}>
                      <line x1="55" y1={y} x2="720" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x="45" y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
                        {mev}
                      </text>
                    </g>
                  );
                })}
                <text x="20" y="140" textAnchor="middle" fill="#c084fc" fontSize="11" transform="rotate(-90 20 140)">
                  B/A (MeV / nucleon)
                </text>

                {/* X-axis ticks (A from 0 to 240) */}
                {[0, 40, 80, 120, 160, 200, 240].map((a) => {
                  const x = 60 + (a / 240) * 640;
                  return (
                    <g key={a}>
                      <line x1={x} y1="250" x2={x} y2="255" stroke="#94a3b8" />
                      <text x={x} y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {a}
                      </text>
                    </g>
                  );
                })}
                <text x="390" y="290" textAnchor="middle" fill="#94a3b8" fontSize="11">
                  Số khối A (Số Nucleon)
                </text>

                {/* Fusion Region Shading (A < 56) */}
                <rect x="60" y="30" width="150" height="220" fill="#f97316" fillOpacity="0.08" />
                <text x="135" y="55" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">
                  VÙNG NHIỆT HẠCH (FUSION)
                </text>
                <text x="135" y="70" textAnchor="middle" fill="#fdba74" fontSize="9">
                  Hợp hạt nhân nhẹ tỏa năng lượng
                </text>

                {/* Fission Region Shading (A > 56) */}
                <rect x="210" y="30" width="490" height="220" fill="#38bdf8" fillOpacity="0.06" />
                <text x="450" y="55" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  VÙNG PHÂN HẠCH (FISSION)
                </text>
                <text x="450" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="9">
                  Phân rã hạt nhân nặng tỏa năng lượng
                </text>

                {/* Smooth B/A Curve Line */}
                <path
                  d="M 60 250 Q 75 90 90 94 T 120 78 T 167 57 T 215 56 T 380 72 T 610 82 T 695 85"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="3"
                />

                {/* Plotted Benchmark Nuclei */}
                {Object.values(NUCLEAR_ISOTOPES).map((iso) => {
                  if (iso.massNumberA > 240) return null;
                  const x = 60 + (iso.massNumberA / 240) * 640;
                  const y = 250 - (iso.bindingEnergyPerNucleonMeV / 10) * 220;
                  const isCurrent = currentZ === iso.atomicNumberZ && currentN === iso.neutronNumberN;

                  return (
                    <g key={iso.id} className="cursor-pointer" onClick={() => setSelectedIsotopeId(iso.id)}>
                      {isCurrent && (
                        <circle cx={x} cy={y} r="9" fill="none" stroke="#facc15" strokeWidth="2.5" className="animate-ping" />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? '#facc15' : iso.magicStatus === 'DOUBLY_MAGIC' ? '#fbbf24' : '#c084fc'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        fill={isCurrent ? '#facc15' : '#ffffff'}
                        fontSize={isCurrent ? '11' : '9'}
                        fontWeight={isCurrent ? 'bold' : 'normal'}
                      >
                        {iso.symbol}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Current Isotope Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-navy-light/40 border border-white/10">
                <span className="text-[10px] text-ivory-muted">Năng lượng liên kết riêng:</span>
                <div className="text-lg font-bold text-amber-300">
                  {bindingData.bindingEnergyPerNucleonMeV} MeV
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-light/40 border border-white/10">
                <span className="text-[10px] text-ivory-muted">Tổng năng lượng liên kết:</span>
                <div className="text-lg font-bold text-white">
                  {bindingData.bindingEnergyTotalMeV} MeV
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-light/40 border border-white/10">
                <span className="text-[10px] text-ivory-muted">Độ hụt khối (Δm):</span>
                <div className="text-lg font-bold text-cyan-300">
                  {bindingData.massDefectU} u
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-light/40 border border-white/10">
                <span className="text-[10px] text-ivory-muted">Hệ số xếp chặt Aston (f):</span>
                <div className="text-lg font-bold text-purple-300">
                  {bindingData.astonPackingFraction} ×10⁻⁴
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: NUCLEAR SHELL MODEL & ENERGY LEVELS (GOEPPERT MAYER)              */}
      {/* ========================================================================= */}
      {activeTab === 'nuclear_shell' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Mô Hình Vỏ Hạt Nhân với Tương Tác Spin-Quỹ Đạo (l·s)
              </span>
              <span className="text-xs font-mono text-ivory-muted">
                Maria Goeppert Mayer & J. Hans D. Jensen (Nobel Vật lí 1963)
              </span>
            </div>

            {/* Nuclear Shell Levels Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Proton Shell (Z) */}
              <div className="p-3 rounded-xl bg-navy/80 border border-purple-500/30 space-y-3">
                <div className="flex justify-between text-xs font-mono border-b border-white/10 pb-1.5">
                  <span className="text-purple-300 font-bold">Lớp vỏ Proton (Z = {currentZ})</span>
                  <span className={stabilityInfo.isProtonMagic ? 'text-amber-400 font-bold' : 'text-ivory-muted'}>
                    {stabilityInfo.isProtonMagic ? '★ VỎ ĐÓNG KÍN (MA THUẬT)' : 'Vỏ hở'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  {[
                    { shell: '3s1/2, 2d3/2, 1h11/2', cap: 82, magic: 82 },
                    { shell: '1g7/2, 2d5/2, 1h9/2', cap: 50, magic: 50 },
                    { shell: '1f7/2', cap: 28, magic: 28 },
                    { shell: '1d3/2, 2s1/2', cap: 20, magic: 20 },
                    { shell: '1p1/2, 1p3/2', cap: 8, magic: 8 },
                    { shell: '1s1/2', cap: 2, magic: 2 },
                  ].map((lvl) => {
                    const isClosed = currentZ >= lvl.magic;
                    const isExact = currentZ === lvl.magic;
                    return (
                      <div
                        key={lvl.magic}
                        className={`p-2 rounded-lg flex items-center justify-between border ${
                          isExact
                            ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold shadow'
                            : isClosed
                            ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
                            : 'bg-navy-light/20 border-white/5 text-ivory-muted'
                        }`}
                      >
                        <span>{lvl.shell}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40">
                            Ngưỡng: {lvl.magic}
                          </span>
                          {isExact && <span className="text-amber-400">★ Ma thuật</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Neutron Shell (N) */}
              <div className="p-3 rounded-xl bg-navy/80 border border-cyan-500/30 space-y-3">
                <div className="flex justify-between text-xs font-mono border-b border-white/10 pb-1.5">
                  <span className="text-cyan-300 font-bold">Lớp vỏ Neutron (N = {currentN})</span>
                  <span className={stabilityInfo.isNeutronMagic ? 'text-amber-400 font-bold' : 'text-ivory-muted'}>
                    {stabilityInfo.isNeutronMagic ? '★ VỎ ĐÓNG KÍN (MA THUẬT)' : 'Vỏ hở'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  {[
                    { shell: '3p1/2, 2f5/2, 1i13/2', cap: 126, magic: 126 },
                    { shell: '3s1/2, 2d3/2, 1h11/2', cap: 82, magic: 82 },
                    { shell: '1g7/2, 2d5/2', cap: 50, magic: 50 },
                    { shell: '1f7/2', cap: 28, magic: 28 },
                    { shell: '1d3/2, 2s1/2', cap: 20, magic: 20 },
                    { shell: '1p1/2, 1p3/2', cap: 8, magic: 8 },
                    { shell: '1s1/2', cap: 2, magic: 2 },
                  ].map((lvl) => {
                    const isClosed = currentN >= lvl.magic;
                    const isExact = currentN === lvl.magic;
                    return (
                      <div
                        key={lvl.magic}
                        className={`p-2 rounded-lg flex items-center justify-between border ${
                          isExact
                            ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold shadow'
                            : isClosed
                            ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200'
                            : 'bg-navy-light/20 border-white/5 text-ivory-muted'
                        }`}
                      >
                        <span>{lvl.shell}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40">
                            Ngưỡng: {lvl.magic}
                          </span>
                          {isExact && <span className="text-amber-400">★ Ma thuật</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-ivory-muted leading-relaxed bg-navy-light/20 p-3 rounded-lg border border-white/5">
              {stabilityInfo.descriptionVI}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BETHE-WEIZSÄCKER SEMI-EMPIRICAL MASS FORMULA (SEMF)              */}
      {/* ========================================================================= */}
      {activeTab === 'semi_empirical' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Mô Hình Giọt Chất Lỏng (Liquid Drop Model - SEMF)
              </span>
              <span className="text-xs font-mono text-emerald-200">
                B(A, Z) = av·A - as·A^(2/3) - ac·Z(Z-1)/A^(1/3) - aa·(A-2Z)²/A + δ
              </span>
            </div>

            {/* 5-Term Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[10px] text-ivory-muted">1. Năng lượng thể tích (av·A):</span>
                <div className="text-base font-bold text-emerald-300">+{semfData.volumeTermMeV} MeV</div>
                <span className="text-[10px] text-emerald-200/70">Lực hạt nhân mạnh bão hòa</span>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40">
                <span className="text-[10px] text-ivory-muted">2. Năng lượng bề mặt (-as·A^2/3):</span>
                <div className="text-base font-bold text-rose-300">{semfData.surfaceTermMeV} MeV</div>
                <span className="text-[10px] text-rose-200/70">Nucleon ở bề mặt thiếu láng giềng</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <span className="text-[10px] text-ivory-muted">3. Đẩy Coulomb (-ac·Z²/A^1/3):</span>
                <div className="text-base font-bold text-amber-300">{semfData.coulombTermMeV} MeV</div>
                <span className="text-[10px] text-amber-200/70">Lực đẩy tĩnh điện giữa các proton</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40">
                <span className="text-[10px] text-ivory-muted">4. Năng lượng bất đối xứng:</span>
                <div className="text-base font-bold text-blue-300">{semfData.asymmetryTermMeV} MeV</div>
                <span className="text-[10px] text-blue-200/70">Nguyên lý Pauli phạt N ≠ Z</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40">
                <span className="text-[10px] text-ivory-muted">5. Năng lượng ghép đôi (+δ):</span>
                <div className="text-base font-bold text-purple-300">{semfData.pairingTermMeV > 0 ? `+${semfData.pairingTermMeV}` : semfData.pairingTermMeV} MeV</div>
                <span className="text-[10px] text-purple-200/70">Cặp spin ngược chiều hút mạnh</span>
              </div>
            </div>

            {/* SEMF Result Comparison */}
            <div className="p-3 rounded-xl bg-navy-light/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-ivory-muted">Dự đoán SEMF Bethe-Weizsäcker: </span>
                <strong className="text-emerald-300">{semfData.totalBindingEnergyMeV} MeV</strong> ({semfData.bindingEnergyPerNucleonMeV} MeV/nucleon)
              </div>
              <div>
                <span className="text-ivory-muted">Thực nghiệm (Experimental): </span>
                <strong className="text-white">{bindingData.bindingEnergyTotalMeV} MeV</strong> ({bindingData.bindingEnergyPerNucleonMeV} MeV/nucleon)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: NUCLEAR REACTIONS (FUSION VS FISSION ENERGETICS)                  */}
      {/* ========================================================================= */}
      {activeTab === 'reactions' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* D-T Nuclear Fusion */}
            <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/40 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> {dtFusion.reactionNameVI}
                </span>
                <span className="text-xs font-mono text-orange-300 font-bold">
                  Q = +{dtFusion.qValueMeV} MeV
                </span>
              </div>

              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-white text-center">
                ²H + ³H ➔ ⁴He (3.5 MeV) + ¹n (14.1 MeV) + 17.59 MeV
              </div>

              <div className="text-xs font-mono text-orange-200">
                Năng lượng trên mỗi gram nhiên liệu: <strong className="text-white">{dtFusion.energyPerGramJoules} J/g</strong>
              </div>

              <p className="text-xs text-ivory-muted leading-relaxed">
                {dtFusion.pedagogicalAnalysisVI}
              </p>
            </div>

            {/* U-235 Nuclear Fission */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <Radiation className="w-4 h-4" /> {u235Fission.reactionNameVI}
                </span>
                <span className="text-xs font-mono text-purple-300 font-bold">
                  Q = +{u235Fission.qValueMeV} MeV
                </span>
              </div>

              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-white text-center">
                ²³⁵U + ¹n (nhiệt) ➔ ¹⁴¹Ba + ⁹²Kr + 3 ¹n + 200 MeV
              </div>

              <div className="text-xs font-mono text-purple-200">
                Năng lượng trên mỗi gram nhiên liệu: <strong className="text-white">{u235Fission.energyPerGramJoules} J/g</strong>
              </div>

              <p className="text-xs text-ivory-muted leading-relaxed">
                {u235Fission.pedagogicalAnalysisVI}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
