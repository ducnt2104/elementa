// src/components/visualizations/PolymerVisualizer.tsx
// Interactive Polymerization, Macromolecules & Condensation Kinetics Visualizer
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chương 4: Polime và Vật liệu Polime) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Atom,
  Scissors,
  Flame,
  Info,
  Shield,
  Activity,
  Droplets,
  ExternalLink,
  Cpu,
  GraduationCap
} from 'lucide-react';
import {
  CURRICULUM_POLYMERS,
  PolymerDefinition,
  PolymerizationType,
  PolymerSpatialStructure,
  PolymerApplicationCategory,
  calculateDegreeOfPolymerization,
  calculateElementPercentage,
  calculateChainLengthNanometers
} from '../../domain/polymerEngine';
import { sound } from '../../audio/soundEngine';

export interface PolymerVisualizerProps {
  initialPolymerId?: string;
  className?: string;
}

export const PolymerVisualizer: React.FC<PolymerVisualizerProps> = ({
  initialPolymerId = 'polyethylene',
  className = ''
}) => {
  const [selectedPolymerId, setSelectedPolymerId] = useState<string>(initialPolymerId);
  const [degreeOfPolymerizationN, setDegreeOfPolymerizationN] = useState<number>(100);
  const [filterType, setFilterType] = useState<PolymerizationType | 'ALL'>('ALL');
  const [filterCategory, setFilterCategory] = useState<PolymerApplicationCategory | 'ALL'>('ALL');
  const [isVulcanized, setIsVulcanized] = useState<boolean>(false); // For Buna / Rubber crosslinking

  const polymer: PolymerDefinition = useMemo(() => {
    return CURRICULUM_POLYMERS[selectedPolymerId] || CURRICULUM_POLYMERS.polyethylene;
  }, [selectedPolymerId]);

  const filteredPolymers = useMemo(() => {
    return Object.values(CURRICULUM_POLYMERS).filter(p => {
      const matchType = filterType === 'ALL' || p.polymerizationType === filterType;
      const matchCat = filterCategory === 'ALL' || p.applicationCategory === filterCategory;
      return matchType && matchCat;
    });
  }, [filterType, filterCategory]);

  // Derived metrics
  const totalMolarMass = useMemo(() => {
    return Math.round(polymer.repeatingUnitMolarMass * degreeOfPolymerizationN * 10) / 10;
  }, [polymer, degreeOfPolymerizationN]);

  const chainLengthNm = useMemo(() => {
    return calculateChainLengthNanometers(degreeOfPolymerizationN, 2);
  }, [degreeOfPolymerizationN]);

  // Element percentages
  const characteristicElementPercentage = useMemo(() => {
    if (polymer.id === 'polyvinyl_chloride') {
      return { element: 'Clo (Cl)', percent: calculateElementPercentage(35.45, 1, polymer.repeatingUnitMolarMass) };
    }
    if (polymer.id === 'teflon_ptfe') {
      return { element: 'Flo (F)', percent: calculateElementPercentage(19.0, 4, polymer.repeatingUnitMolarMass) };
    }
    if (polymer.id === 'nitron_olon') {
      return { element: 'Nitơ (N)', percent: calculateElementPercentage(14.01, 1, polymer.repeatingUnitMolarMass) };
    }
    if (polymer.id === 'nylon_66') {
      return { element: 'Nitơ (N)', percent: calculateElementPercentage(14.01, 2, polymer.repeatingUnitMolarMass) };
    }
    return null;
  }, [polymer]);

  const handleSelectPolymer = (id: string) => {
    setSelectedPolymerId(id);
    setIsVulcanized(id === 'vulcanized_rubber');
    sound.playPolymerChainLink();
  };

  const handleToggleVulcanization = () => {
    const nextState = !isVulcanized;
    setIsVulcanized(nextState);
    if (nextState) {
      sound.playVulcanizationSizzle();
    } else {
      sound.playDomainSnap?.();
    }
  };

  return (
    <div className={`flex flex-col bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans ${className}`}>
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Mô Phỏng Trùng Hợp, Trùng Ngưng & Polime
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono font-medium">
                  GDPT 2018 · Hóa 12
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Vật liệu polime: Chất dẻo, Tơ sợi, Cao su & Keo dán · Mạng không gian lưu hóa
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-medium">
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setFilterType('ALL'); sound.playDomainSnap?.(); }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'ALL' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả (10)
            </button>
            <button
              onClick={() => { setFilterType('ADDITION'); sound.playDomainSnap?.(); }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'ADDITION' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trùng Hợp
            </button>
            <button
              onClick={() => { setFilterType('CONDENSATION'); sound.playDomainSnap?.(); }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'CONDENSATION' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trùng Ngưng
            </button>
          </div>
        </div>
      </div>

      {/* 2. Polymer Selection Strip */}
      <div className="flex gap-2 p-3 bg-slate-900/50 border-b border-slate-800/60 overflow-x-auto no-scrollbar">
        {filteredPolymers.map(item => {
          const isSelected = item.id === selectedPolymerId;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectPolymer(item.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${
                isSelected
                  ? 'bg-indigo-500/15 border-indigo-500/50 text-white shadow-md shadow-indigo-950/30'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold">
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
                <span>{item.nameVI}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  {item.polymerizationType === 'ADDITION' ? 'Trùng hợp' : 'Trùng ngưng'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                {item.repeatingUnitFormula}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
        {/* Left Column: Interactive Macromolecule Chain SVG & Structural Display (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative bg-slate-900/60 rounded-2xl border border-slate-800/90 p-5 flex flex-col items-center overflow-hidden">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <span className="font-bold text-indigo-400 font-mono">
                {polymer.reactionEquationVI}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Cấu trúc: {polymer.spatialStructure === 'LINEAR' ? 'Mạch thẳng' : polymer.spatialStructure === 'BRANCHED' ? 'Mạch phân nhánh' : 'Mạng không gian 3D'}
              </span>
            </div>

            {/* SVG Molecular Chain Visualizer */}
            <div className="my-4 w-full flex justify-center">
              <svg viewBox="0 0 520 200" className="w-full max-w-[480px] select-none overflow-visible">
                {/* Polymer Backbone Chain 1 */}
                <path
                  d="M 20 60 Q 60 40 100 60 T 180 60 T 260 60 T 340 60 T 420 60 T 500 60"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeDasharray={polymer.spatialStructure === 'NETWORK_3D' ? 'none' : 'none'}
                />

                {/* Repeating Unit Nodes along Chain 1 */}
                {[60, 140, 220, 300, 380, 460].map((cx, idx) => (
                  <g key={idx}>
                    <circle cx={cx} cy={cx % 160 === 60 ? 55 : 65} r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x={cx} y={(cx % 160 === 60 ? 55 : 65) + 4} textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="bold">
                      {idx % 2 === 0 ? 'C' : 'C'}
                    </text>
                  </g>
                ))}

                {/* If 3D Network or Rubber Vulcanization: Second Chain and Disulfide Bridges */}
                {(polymer.spatialStructure === 'NETWORK_3D' || isVulcanized) && (
                  <>
                    {/* Polymer Backbone Chain 2 */}
                    <path
                      d="M 20 140 Q 60 160 100 140 T 180 140 T 260 140 T 340 140 T 420 140 T 500 140"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="4"
                    />

                    {[60, 140, 220, 300, 380, 460].map((cx, idx) => (
                      <g key={`c2-${idx}`}>
                        <circle cx={cx} cy={cx % 160 === 60 ? 145 : 135} r="14" fill="#1e293b" stroke="#818cf8" strokeWidth="2.5" />
                        <text x={cx} y={(cx % 160 === 60 ? 145 : 135) + 4} textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">
                          C
                        </text>
                      </g>
                    ))}

                    {/* Sulfur Disulfide Cross-Link Bridges (-S-S-) */}
                    <g className="cursor-pointer" onClick={handleToggleVulcanization}>
                      <line x1="140" y1="65" x2="140" y2="135" stroke="#facc15" strokeWidth="3" strokeDasharray="3,2" />
                      <circle cx="140" cy="90" r="9" fill="#854d0e" stroke="#facc15" strokeWidth="2" />
                      <text x="140" y="94" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">S</text>
                      <circle cx="140" cy="110" r="9" fill="#854d0e" stroke="#facc15" strokeWidth="2" />
                      <text x="140" y="114" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">S</text>

                      <line x1="380" y1="65" x2="380" y2="135" stroke="#facc15" strokeWidth="3" strokeDasharray="3,2" />
                      <circle cx="380" cy="90" r="9" fill="#854d0e" stroke="#facc15" strokeWidth="2" />
                      <text x="380" y="94" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">S</text>
                      <circle cx="380" cy="110" r="9" fill="#854d0e" stroke="#facc15" strokeWidth="2" />
                      <text x="380" y="114" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">S</text>
                    </g>
                  </>
                )}

                {/* Repeating Unit Bracket */}
                <rect x="180" y="25" width="160" height="70" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,4" rx="6" />
                <text x="345" y="100" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  n = {degreeOfPolymerizationN}
                </text>
              </svg>
            </div>

            {/* Quick Metrics Bar */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-center text-xs">
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Khối Lượng Mol (M):</span>
                <span className="font-bold text-indigo-400 font-mono">
                  {totalMolarMass.toLocaleString()} g/mol
                </span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Chiều Dài Mạch:</span>
                <span className="font-bold text-sky-400 font-mono">
                  ~{chainLengthNm.toFixed(1)} nm
                </span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Mắt Xích (Monomer):</span>
                <span className="font-bold text-emerald-400 font-mono truncate block">
                  {polymer.monomers[0]?.nameVI.split('(')[0]}
                </span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Phân Loại:</span>
                <span className="font-bold text-purple-400 font-mono">
                  {polymer.applicationCategory === 'PLASTIC' ? 'Chất dẻo' : polymer.applicationCategory === 'FIBER_TEXTILE' ? 'Tơ sợi' : 'Cao su'}
                </span>
              </div>
            </div>
          </div>

          {/* Monomers & Chemical Reaction Specs */}
          <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Atom className="w-4 h-4 text-indigo-400" />
              Các Monome Tham Gia Phản Ứng:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {polymer.monomers.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{m.nameVI}</span>
                    <span className="text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded">
                      {m.molarMass} g/mol
                    </span>
                  </div>
                  <span className="text-amber-300 font-semibold">{m.formula}</span>
                  <span className="text-[11px] text-slate-400">{m.reactiveGroupVI}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Degree of Polymerization Slider, % Elements & Properties (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Degree of Polymerization Controller */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Hệ Số Trùng Hợp (n)
              </span>
              <span className="font-mono font-bold text-indigo-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 text-xs">
                n = {degreeOfPolymerizationN}
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={degreeOfPolymerizationN}
              onChange={e => setDegreeOfPolymerizationN(parseInt(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>n = 10 (Oligome)</span>
              <span>n = 500</span>
              <span>n = 1,000</span>
              <span>n = 2,000 (Đại phân tử)</span>
            </div>

            {characteristicElementPercentage && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between font-mono">
                <span className="text-slate-300">% Khối lượng {characteristicElementPercentage.element}:</span>
                <span className="font-bold text-amber-400 text-sm">
                  {characteristicElementPercentage.percent}%
                </span>
              </div>
            )}

            {/* Special Vulcanization Toggle for Rubber */}
            {polymer.applicationCategory === 'RUBBER' && (
              <div className="pt-2">
                <button
                  onClick={handleToggleVulcanization}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    isVulcanized
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {isVulcanized ? 'Đã Lưu Hóa: Cầu Nối Đisunfua (-S-S-) Hoạt Hóa' : 'Kích Hoạt Quá Trình Lưu Hóa Bằng Lưu Huỳnh (140°C)'}
                </button>
              </div>
            )}
          </div>

          {/* Physical & Chemical Properties */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Tính Chất Vật Lý & Ứng Dụng Đời Sống
            </h4>

            <div className="space-y-1.5 text-xs text-slate-300">
              <span className="font-semibold text-sky-400">Đặc tính cơ lý:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 leading-relaxed text-[11px]">
                {polymer.keyPhysicalPropertiesVI.map((prop, idx) => (
                  <li key={idx}>{prop}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1">
              <span className="font-bold text-emerald-400">Ứng dụng thực tiễn trong công nghiệp:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 leading-relaxed text-[11px]">
                {polymer.industrialApplicationsVI.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs flex flex-col gap-1">
              <span className="font-bold text-indigo-300">Điểm sư phạm GDPT 2018 trọng tâm:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 leading-relaxed text-[11px]">
                {polymer.pedagogicalKeyPointsVI.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
