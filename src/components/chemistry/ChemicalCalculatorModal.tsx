// src/components/chemistry/ChemicalCalculatorModal.tsx
// Interactive Chemical Calculator & Stoichiometry Workspace for ELEMENTA

import React, { useState } from 'react';
import {
  calculateMoles,
  calculateMass,
  calculateGasVolume,
  calculateMolarity,
  calculateMassPercentage,
  calculateReactionStoichiometry,
  calculateSolutionDilution,
  convertDensityAndConcentration,
  calculateTitrationCurve,
  GasStandardCondition,
  TitrationCurveResult,
  SolutionDilutionResult,
  DensityConcentrationConversionResult
} from '../../domain/chemicalCalculator';
import { VERIFIED_REDOX_DATABASE } from '../../domain/redoxEngine';
import {
  ThermochemistryEngine,
  CURRICULUM_THERMO_REACTIONS,
  CURRICULUM_BOND_ENTHALPY_REACTIONS
} from '../../domain/thermochemistryEngine';
import {
  STANDARD_REDUCTION_POTENTIALS,
  simulateGalvanicCell,
  calculateElectrolysis,
  GalvanicCellResult,
  ElectrolysisCalculationResult,
  ElectrolysisScenario
} from '../../domain/electrochemistryEngine';
import { sound } from '../../audio/soundEngine';
import {
  Calculator,
  X,
  Sparkles,
  FlaskConical,
  Flame,
  Droplets,
  Layers,
  ArrowRight,
  CheckCircle2,
  Info,
  Battery,
  Zap,
  Sliders,
  Eye,
  RefreshCw
} from 'lucide-react';

interface ChemicalCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChemicalCalculatorModal: React.FC<ChemicalCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'MOLES' | 'CONCENTRATION' | 'TITRATION' | 'STOICHIOMETRY' | 'REDOX' | 'THERMO' | 'ELECTROCHEM'>('MOLES');

  // Tab 1: Moles State
  const [formulaInput, setFormulaInput] = useState('H2SO4');
  const [massInput, setMassInput] = useState('98');
  const [moleOutput, setMoleOutput] = useState<any>(null);
  const [gasMolesInput, setGasMolesInput] = useState('0.5');
  const [gasCondition, setGasCondition] = useState<GasStandardCondition>('STANDARD_2018');
  const [gasOutput, setGasOutput] = useState<any>(null);

  // Tab 2: Concentration State
  const [concMoles, setConcMoles] = useState('0.2');
  const [concVolume, setConcVolume] = useState('0.5'); // L
  const [molarityOutput, setMolarityOutput] = useState<any>(null);
  const [pctSolute, setPctSolute] = useState('10'); // g
  const [pctSolution, setPctSolution] = useState('100'); // g
  const [massPctOutput, setMassPctOutput] = useState<any>(null);
  const [dilutionC1, setDilutionC1] = useState('2.0');
  const [dilutionV1, setDilutionV1] = useState('0.1'); // L
  const [dilutionC2, setDilutionC2] = useState('0.5');
  const [dilutionOutput, setDilutionOutput] = useState<SolutionDilutionResult | null>(null);

  // Tab 3: Titration State
  const [titrationMode, setTitrationMode] = useState<'ACID_BY_BASE' | 'BASE_BY_ACID'>('ACID_BY_BASE');
  const [selectedAcidSpecies, setSelectedAcidSpecies] = useState<'HCL' | 'CH3COOH' | 'HCOOH'>('HCL');
  const [selectedBaseSpecies, setSelectedBaseSpecies] = useState<'NAOH' | 'NH3'>('NAOH');
  const [titrationAcidMolarity, setTitrationAcidMolarity] = useState('0.1');
  const [titrationAcidVolumeMl, setTitrationAcidVolumeMl] = useState('25.0');
  const [titrationBaseMolarity, setTitrationBaseMolarity] = useState('0.1');
  const [titrationBaseVolumeMl, setTitrationBaseVolumeMl] = useState('25.0');
  const [titrationOutput, setTitrationOutput] = useState<TitrationCurveResult | null>(null);
  const [activeIndicator, setActiveIndicator] = useState<'PHENO' | 'BTB' | 'METHYL_RED' | 'METHYL_ORANGE'>('PHENO');
  const [showIndicatorBands, setShowIndicatorBands] = useState(true);
  const [scrubbedVolume, setScrubbedVolume] = useState<number | null>(null);

  // Tab 4: Stoichiometry State (e.g. 2Al + Fe2O3 -> Al2O3 + 2Fe)
  const [stoichReactant1Moles, setStoichReactant1Moles] = useState('2');
  const [stoichReactant2Moles, setStoichReactant2Moles] = useState('1.5');
  const [stoichOutput, setStoichOutput] = useState<any>(null);

  // Tab 5: Redox State
  const [selectedRedoxKey, setSelectedRedoxKey] = useState<string>('Na_H2O');

  // Tab 6: Thermochemistry & Kinetics State
  const [thermoCalcMethod, setThermoCalcMethod] = useState<'FORMATION' | 'BOND_ENERGY'>('FORMATION');
  const [selectedThermoId, setSelectedThermoId] = useState('thermite_rx');
  const [selectedBondThermoId, setSelectedBondThermoId] = useState('methane_combustion_bond_rx');
  const [t1Input, setT1Input] = useState('25');
  const [t2Input, setT2Input] = useState('55');
  const [gammaInput, setGammaInput] = useState('2.5');
  const [eaOrigInput, setEaOrigInput] = useState('75');
  const [eaCatInput, setEaCatInput] = useState('45');

  // Tab 7: Electrochemistry State
  const [electroMode, setElectroMode] = useState<'GALVANIC' | 'ELECTROLYSIS'>('GALVANIC');
  const [coupleAId, setCoupleAId] = useState('Zn2_Zn');
  const [coupleBId, setCoupleBId] = useState('Cu2_Cu');
  const [concAInput, setConcAInput] = useState('1.0');
  const [concBInput, setConcBInput] = useState('1.0');
  const [galvanicOutput, setGalvanicOutput] = useState<GalvanicCellResult | null>(null);

  const [electrolysisScenario, setElectrolysisScenario] = useState<ElectrolysisScenario>('CUSO4_AQUEOUS');
  const [currentInput, setCurrentInput] = useState('2.0');
  const [timeInput, setTimeInput] = useState('1930');
  const [electrolysisOutput, setElectrolysisOutput] = useState<ElectrolysisCalculationResult | null>(null);

  if (!isOpen) return null;

  // Handlers
  const handleCalculateMoles = () => {
    sound.playUiClick();
    try {
      const res = calculateMoles(parseFloat(massInput) || 0, formulaInput.trim());
      setMoleOutput(res);
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateGas = () => {
    sound.playUiClick();
    try {
      const res = calculateGasVolume(parseFloat(gasMolesInput) || 0, gasCondition);
      setGasOutput(res);
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateMolarity = () => {
    sound.playUiClick();
    try {
      const res = calculateMolarity(parseFloat(concMoles) || 0, parseFloat(concVolume) || 1);
      setMolarityOutput(res);
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateMassPct = () => {
    sound.playUiClick();
    try {
      const res = calculateMassPercentage(parseFloat(pctSolute) || 0, parseFloat(pctSolution) || 100);
      setMassPctOutput(res);
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateDilution = () => {
    sound.playUiClick();
    try {
      const res = calculateSolutionDilution({
        initialConcentration: parseFloat(dilutionC1) || 2.0,
        initialVolumeLiters: parseFloat(dilutionV1) || 0.1,
        targetConcentration: parseFloat(dilutionC2) || 0.5
      });
      setDilutionOutput(res);
      sound.playVolumetricPouring('aqueous');
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateTitration = () => {
    sound.playUiClick();
    try {
      if (titrationMode === 'ACID_BY_BASE') {
        const isWeak = selectedAcidSpecies !== 'HCL';
        const pKa = selectedAcidSpecies === 'HCOOH' ? 3.75 : 4.76;
        const res = calculateTitrationCurve({
          titrationMode: 'ACID_BY_BASE',
          acidType: isWeak ? 'WEAK' : 'STRONG',
          acidMolarity: parseFloat(titrationAcidMolarity) || 0.1,
          acidVolumeMl: parseFloat(titrationAcidVolumeMl) || 25.0,
          baseMolarity: parseFloat(titrationBaseMolarity) || 0.1,
          pKa: isWeak ? pKa : undefined
        });
        setTitrationOutput(res);
        setScrubbedVolume(res.equivalenceVolumeMl);
      } else {
        const isWeak = selectedBaseSpecies === 'NH3';
        const res = calculateTitrationCurve({
          titrationMode: 'BASE_BY_ACID',
          baseType: isWeak ? 'WEAK' : 'STRONG',
          acidType: 'STRONG',
          baseMolarity: parseFloat(titrationBaseMolarity) || 0.1,
          baseVolumeMl: parseFloat(titrationBaseVolumeMl) || 25.0,
          acidMolarity: parseFloat(titrationAcidMolarity) || 0.1,
          acidVolumeMl: parseFloat(titrationBaseVolumeMl) || 25.0,
          pKb: isWeak ? 4.75 : undefined
        });
        setTitrationOutput(res);
        setScrubbedVolume(res.equivalenceVolumeMl);
      }
      sound.playReactionSuccess();
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateStoich = () => {
    sound.playUiClick();
    try {
      const res = calculateReactionStoichiometry(
        [
          { formula: 'Al', coefficient: 2, givenMoles: parseFloat(stoichReactant1Moles) || 0 },
          { formula: 'Fe2O3', coefficient: 1, givenMoles: parseFloat(stoichReactant2Moles) || 0 }
        ],
        [
          { formula: 'Al2O3', coefficient: 1 },
          { formula: 'Fe', coefficient: 2 }
        ]
      );
      setStoichOutput(res);
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleSimulateGalvanic = () => {
    sound.playUiClick();
    try {
      const res = simulateGalvanicCell({
        coupleAId,
        coupleBId,
        concentrationA: parseFloat(concAInput) || 1.0,
        concentrationB: parseFloat(concBInput) || 1.0
      });
      setGalvanicOutput(res);
      sound.playReactionSuccess();
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  const handleCalculateElectrolysis = () => {
    sound.playUiClick();
    try {
      const res = calculateElectrolysis({
        scenario: electrolysisScenario,
        currentAmperes: parseFloat(currentInput) || 2.0,
        timeSeconds: parseFloat(timeInput) || 1930
      });
      setElectrolysisOutput(res);
      sound.playReactionSuccess();
    } catch (err: any) {
      sound.playErrorFizzle();
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-navy border border-navy-light/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-ion to-coral-reaction p-0.5 flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5 text-obsidian" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-ivory tracking-wide flex items-center gap-2">
                MÁY TÍNH HÓA HỌC & CÂN BẰNG HÓA LƯỢNG
                <span className="px-2 py-0.5 rounded-full bg-cyan-ion/20 text-cyan-ion font-mono text-[10px] border border-cyan-ion/30">
                  GDPT 2018 (24.79L)
                </span>
              </h2>
              <p className="text-xs text-ivory-muted">Giải toán số mol, nồng độ dung dịch, chất giới hạn và phản ứng oxi hóa - khử</p>
            </div>
          </div>

          <button onClick={onClose} className="text-ivory-muted hover:text-ivory">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-obsidian/60 p-1 rounded-xl border border-navy-light/60 overflow-x-auto">
          {[
            { key: 'MOLES', label: '1. Mol & Thể Tích Khí' },
            { key: 'CONCENTRATION', label: '2. Nồng Độ & Pha Loãng' },
            { key: 'TITRATION', label: '3. Chuẩn Độ Axit - Bazơ' },
            { key: 'STOICHIOMETRY', label: '4. Toán Chất Dư (Hóa Lượng)' },
            { key: 'REDOX', label: '5. Bán Phản Ứng Oxi Hóa - Khử' },
            { key: 'THERMO', label: '6. Nhiệt Hóa & Động Học' },
            { key: 'ELECTROCHEM', label: '7. Pin Điện & Điện Phân' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { sound.playUiClick(); setActiveTab(tab.key as any); }}
              className={`flex-1 py-1.5 px-2 whitespace-nowrap rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-cyan-ion text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {/* TAB 1: MOLES & GAS VOLUME */}
          {activeTab === 'MOLES' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Part A: n = m / M */}
              <div className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-cyan-ion font-mono flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4" />
                  Tính Số Mol từ Khối Lượng (n = m / M)
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Công Thức Chất:</label>
                    <input
                      type="text"
                      value={formulaInput}
                      onChange={(e) => setFormulaInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      placeholder="e.g. H2SO4, CaCO3"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Khối Lượng m (gam):</label>
                    <input
                      type="number"
                      value={massInput}
                      onChange={(e) => setMassInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculateMoles}
                  className="py-1.5 rounded-lg bg-cyan-ion text-obsidian font-bold text-xs shadow hover:scale-[1.02] transition-all"
                >
                  Tính Số Mol (n)
                </button>

                {moleOutput && (
                  <div className="p-3 rounded-lg bg-navy/80 border border-cyan-ion/40 text-xs font-mono flex flex-col gap-1">
                    <span className="text-yellow-400 font-bold">Kết quả: n = {moleOutput.moles} mol</span>
                    {moleOutput.stepByStepExplanationVI.map((step: string, i: number) => (
                      <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Part B: V = n * 24.79 */}
              <div className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-coral-reaction font-mono flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  Tính Thể Tích Khí (V = n × 24.79 L)
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Số Mol Khí n (mol):</label>
                    <input
                      type="number"
                      value={gasMolesInput}
                      onChange={(e) => setGasMolesInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Quy Chuẩn Điều Kiện:</label>
                    <select
                      value={gasCondition}
                      onChange={(e) => setGasCondition(e.target.value as GasStandardCondition)}
                      className="w-full px-2 py-1.5 rounded-lg bg-navy border border-navy-light text-[11px] font-mono text-ivory"
                    >
                      <option value="STANDARD_2018">GDPT 2018 (25°C, 24.79 L)</option>
                      <option value="CLASSICAL_STP">Cũ (0°C, 1 atm, 22.4 L)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleCalculateGas}
                  className="py-1.5 rounded-lg bg-coral-reaction text-white font-bold text-xs shadow hover:scale-[1.02] transition-all"
                >
                  Tính Thể Tích Khí (V)
                </button>

                {gasOutput && (
                  <div className="p-3 rounded-lg bg-navy/80 border border-coral-reaction/40 text-xs font-mono flex flex-col gap-1">
                    <span className="text-cyan-300 font-bold">Kết quả: V = {gasOutput.volumeLiters} Lít</span>
                    {gasOutput.stepByStepExplanationVI.map((step: string, i: number) => (
                      <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CONCENTRATION */}
          {activeTab === 'CONCENTRATION' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Part A: Molarity CM */}
              <div className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-cyan-ion font-mono">Nồng Độ Mol (C_M = n / V_dd)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Số Mol Chất Tan (mol):</label>
                    <input
                      type="number"
                      value={concMoles}
                      onChange={(e) => setConcMoles(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Thể Tích Dung Dịch V (L):</label>
                    <input
                      type="number"
                      value={concVolume}
                      onChange={(e) => setConcVolume(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculateMolarity}
                  className="py-1.5 rounded-lg bg-cyan-ion text-obsidian font-bold text-xs shadow"
                >
                  Tính Nồng Độ Mol (C_M)
                </button>

                {molarityOutput && (
                  <div className="p-3 rounded-lg bg-navy/80 border border-cyan-ion/40 text-xs font-mono flex flex-col gap-1">
                    <span className="text-yellow-400 font-bold">Kết quả: C_M = {molarityOutput.molarityCM} M</span>
                    {molarityOutput.stepByStepExplanationVI.map((step: string, i: number) => (
                      <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Part B: Mass percentage C% */}
              <div className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-emerald-400 font-mono">Nồng Độ Phần Trăm (C% = m_ct / m_dd × 100%)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Khối Lượng Chất Tan m_ct (g):</label>
                    <input
                      type="number"
                      value={pctSolute}
                      onChange={(e) => setPctSolute(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Khối Lượng Dung Dịch m_dd (g):</label>
                    <input
                      type="number"
                      value={pctSolution}
                      onChange={(e) => setPctSolution(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculateMassPct}
                  className="py-1.5 rounded-lg bg-emerald-400 text-obsidian font-bold text-xs shadow"
                >
                  Tính Nồng Độ Phần Trăm (C%)
                </button>

                {massPctOutput && (
                  <div className="p-3 rounded-lg bg-navy/80 border border-emerald-400/40 text-xs font-mono flex flex-col gap-1">
                    <span className="text-emerald-300 font-bold">Kết quả: C% = {massPctOutput.percentageC}%</span>
                    {massPctOutput.stepByStepExplanationVI.map((step: string, i: number) => (
                      <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Part C: Dilution C1*V1 = C2*V2 */}
              <div className="col-span-1 md:col-span-2 p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-cyan-ion font-mono flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Pha Loãng Dung Dịch (Định Luật Bảo Toàn Số Mol: C₁ · V₁ = C₂ · V₂)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Nồng Độ Đầu C₁ (M):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={dilutionC1}
                      onChange={(e) => setDilutionC1(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Thể Tích Lấy V₁ (L):</label>
                    <input
                      type="number"
                      step="0.05"
                      value={dilutionV1}
                      onChange={(e) => setDilutionV1(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory-muted block mb-1">Nồng Độ Cần Đạt C₂ (M):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={dilutionC2}
                      onChange={(e) => setDilutionC2(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculateDilution}
                  className="py-1.5 rounded-lg bg-cyan-ion text-obsidian font-bold text-xs shadow hover:scale-[1.01] transition-all"
                >
                  Tính Lượng Nước Cần Thêm (Pha Loãng)
                </button>

                {dilutionOutput && (
                  <div className="p-3 rounded-lg bg-navy/80 border border-cyan-400/40 text-xs font-mono flex flex-col gap-1.5">
                    <div className="flex flex-wrap gap-4 text-emerald-300 font-bold">
                      <span>Thể tích cuối V₂: {dilutionOutput.v2Liters} L</span>
                      <span>Nước cần thêm: {dilutionOutput.waterAddedLiters} L ({Math.round(dilutionOutput.waterAddedLiters * 1000)} mL)</span>
                      <span>Hệ số pha loãng: {(dilutionOutput.c1 / dilutionOutput.c2).toFixed(1)}x</span>
                    </div>
                    {dilutionOutput.stepByStepExplanationVI.map((step, i) => (
                      <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TITRATION (CHUẨN ĐỘ AXIT - BAZƠ & ĐỒ THỊ SVG) */}
          {activeTab === 'TITRATION' && (
            <div className="p-5 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-4">
              {/* Header with Title and Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center shadow">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-serif font-bold text-ivory tracking-wide flex items-center gap-1.5">
                      MÔ PHỎNG ĐƯỜNG CONG CHUẨN ĐỘ AXIT - BAZƠ &amp; CHỈ THỊ MÀU
                    </h3>
                    <p className="text-[10px] text-ivory-muted font-mono">
                      Chuẩn độ thể tích GDPT 2018 Hóa học 11 — Bước nhảy pH, Vùng đệm &amp; Thủy phân
                    </p>
                  </div>
                </div>

                {/* Titration Mode Pill Selector */}
                <div className="flex items-center gap-1 bg-obsidian p-1 rounded-xl border border-navy-light/60 text-[11px] font-mono font-bold">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setTitrationMode('ACID_BY_BASE');
                      setTitrationOutput(null);
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      titrationMode === 'ACID_BY_BASE'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    1. Axit chuẩn bằng Bazơ (NaOH)
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setTitrationMode('BASE_BY_ACID');
                      setTitrationOutput(null);
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      titrationMode === 'BASE_BY_ACID'
                        ? 'bg-gradient-to-r from-cyan-ion to-blue-600 text-obsidian shadow'
                        : 'text-ivory-muted hover:text-ivory'
                    }`}
                  >
                    2. Bazơ chuẩn bằng Axit (HCl)
                  </button>
                </div>
              </div>

              {/* Input Parameters Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-navy/60 p-4 rounded-xl border border-navy-light/60">
                {titrationMode === 'ACID_BY_BASE' ? (
                  <>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">
                        Axit Cần Chuẩn Độ (Bình Tam Giác):
                      </label>
                      <select
                        value={selectedAcidSpecies}
                        onChange={(e) => setSelectedAcidSpecies(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      >
                        <option value="HCL">HCl (Axit Clohiđric — Mạnh)</option>
                        <option value="CH3COOH">CH₃COOH (Axit Axetic — pKa = 4.76)</option>
                        <option value="HCOOH">HCOOH (Axit Fomic — pKa = 3.75)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Nồng Độ Axit C_A (M):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={titrationAcidMolarity}
                        onChange={(e) => setTitrationAcidMolarity(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Thể Tích Axit V_A (mL):</label>
                      <input
                        type="number"
                        step="5"
                        value={titrationAcidVolumeMl}
                        onChange={(e) => setTitrationAcidVolumeMl(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Bazơ Chuẩn Trên Burette (C_B):</label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-1.5 bg-obsidian rounded-lg border border-navy-light">
                          NaOH
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={titrationBaseMolarity}
                          onChange={(e) => setTitrationBaseMolarity(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                          placeholder="0.1 M"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">
                        Bazơ Cần Chuẩn Độ (Bình Tam Giác):
                      </label>
                      <select
                        value={selectedBaseSpecies}
                        onChange={(e) => setSelectedBaseSpecies(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      >
                        <option value="NH3">NH₃ (Amoniac — Yếu, pKb = 4.75)</option>
                        <option value="NAOH">NaOH (Natri Hiđroxit — Mạnh)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Nồng Độ Bazơ C_B (M):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={titrationBaseMolarity}
                        onChange={(e) => setTitrationBaseMolarity(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Thể Tích Bazơ V_B (mL):</label>
                      <input
                        type="number"
                        step="5"
                        value={titrationBaseVolumeMl}
                        onChange={(e) => setTitrationBaseVolumeMl(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Axit Chuẩn Trên Burette (C_A):</label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-pink-300 font-bold px-2 py-1.5 bg-obsidian rounded-lg border border-navy-light">
                          HCl
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={titrationAcidMolarity}
                          onChange={(e) => setTitrationAcidMolarity(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                          placeholder="0.1 M"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Execution Action Button */}
              <button
                onClick={handleCalculateTitration}
                className="py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-ion text-white font-serif font-black text-xs tracking-wider shadow-lg shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <FlaskConical className="w-4 h-4" />
                VẼ ĐỒ THỊ CHUẨN ĐỘ pH &amp; KHUYẾN NGHỊ CHỈ THỊ MÀU
              </button>

              {titrationOutput && (() => {
                const pts = titrationOutput.curvePoints && titrationOutput.curvePoints.length > 0
                  ? titrationOutput.curvePoints
                  : titrationOutput.dataPoints;
                const V_max = Math.max(titrationOutput.equivalenceVolumeMl * 1.3, 1);

                // Coordinate transform helpers (viewBox: 0 0 680 300)
                const toX = (v: number) => 55 + (Math.max(0, Math.min(v, V_max)) / V_max) * 590;
                const toY = (pH: number) => 25 + ((14 - Math.max(0, Math.min(pH, 14))) / 14) * 230;

                const pathD = pts.map((p, idx) => {
                  const v = p.volumeTitrantAddedMl ?? p.volumeBaseAddedMl;
                  return `${idx === 0 ? 'M' : 'L'} ${toX(v).toFixed(1)} ${toY(p.pH).toFixed(1)}`;
                }).join(' ');

                const lastPt = pts[pts.length - 1];
                const lastV = lastPt.volumeTitrantAddedMl ?? lastPt.volumeBaseAddedMl;
                const areaD = `${pathD} L ${toX(lastV).toFixed(1)} ${toY(0).toFixed(1)} L ${toX(0).toFixed(1)} ${toY(0).toFixed(1)} Z`;

                const eqX = toX(titrationOutput.equivalenceVolumeMl);
                const eqY = toY(titrationOutput.equivalencePH);

                const hasHalfEq = titrationOutput.halfEquivalencePH !== undefined;
                const halfV = titrationOutput.equivalenceVolumeMl * 0.5;
                const halfX = toX(halfV);
                const halfY = hasHalfEq ? toY(titrationOutput.halfEquivalencePH!) : 0;

                const currentV = scrubbedVolume !== null ? scrubbedVolume : titrationOutput.equivalenceVolumeMl;
                const closestPoint = pts.reduce((prev, curr) => {
                  const currDist = Math.abs((curr.volumeTitrantAddedMl ?? curr.volumeBaseAddedMl) - currentV);
                  const prevDist = Math.abs((prev.volumeTitrantAddedMl ?? prev.volumeBaseAddedMl) - currentV);
                  return currDist < prevDist ? curr : prev;
                }, pts[0]);

                const currentPH = closestPoint.pH;
                const currX = toX(currentV);
                const currY = toY(currentPH);

                const getSolutionVisual = (pH: number, ind: typeof activeIndicator) => {
                  if (ind === 'PHENO') {
                    if (pH < 8.2) return { fill: 'rgba(224, 242, 254, 0.25)', border: '#38bdf8', label: 'Không màu (Trong suốt)', badgeClass: 'bg-sky-500/20 text-sky-200 border-sky-400/40' };
                    if (pH < 9.0) return { fill: 'rgba(244, 114, 182, 0.6)', border: '#f472b6', label: 'Hồng nhạt (Chớm chuyển màu)', badgeClass: 'bg-pink-500/20 text-pink-300 border-pink-400/40' };
                    return { fill: 'rgba(236, 72, 153, 0.95)', border: '#ec4899', label: 'Hồng cánh sen rực rỡ', badgeClass: 'bg-pink-600/30 text-pink-200 border-pink-500' };
                  } else if (ind === 'BTB') {
                    if (pH < 6.0) return { fill: 'rgba(234, 179, 8, 0.85)', border: '#eab308', label: 'Vàng chanh (Môi trường Axit)', badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40' };
                    if (pH <= 7.6) return { fill: 'rgba(16, 185, 129, 0.85)', border: '#10b981', label: 'Xanh lục (Trung tính pH ~ 7)', badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' };
                    return { fill: 'rgba(59, 130, 246, 0.9)', border: '#3b82f6', label: 'Xanh lam (Môi trường Kiềm)', badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-400/40' };
                  } else if (ind === 'METHYL_ORANGE') {
                    if (pH < 3.1) return { fill: 'rgba(239, 68, 68, 0.9)', border: '#ef4444', label: 'Đỏ tươi (Axit mạnh)', badgeClass: 'bg-red-500/20 text-red-300 border-red-400/40' };
                    if (pH <= 4.4) return { fill: 'rgba(249, 115, 22, 0.9)', border: '#f97316', label: 'Da cam (Khoảng chuyển màu)', badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-400/40' };
                    return { fill: 'rgba(234, 179, 8, 0.85)', border: '#eab308', label: 'Vàng da cam (Bazơ/Trung tính)', badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40' };
                  } else {
                    if (pH < 4.4) return { fill: 'rgba(239, 68, 68, 0.9)', border: '#ef4444', label: 'Đỏ (Axit)', badgeClass: 'bg-red-500/20 text-red-300 border-red-400/40' };
                    if (pH <= 6.2) return { fill: 'rgba(249, 115, 22, 0.85)', border: '#f97316', label: 'Cam (Vùng chuyển màu)', badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-400/40' };
                    return { fill: 'rgba(234, 179, 8, 0.85)', border: '#eab308', label: 'Vàng (Bazơ)', badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40' };
                  }
                };

                const visualState = getSolutionVisual(currentPH, activeIndicator);

                return (
                  <div className="flex flex-col gap-4 font-mono text-xs">
                    {/* Summary Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-3 rounded-xl bg-navy/80 border border-navy-light/80 shadow-sm flex flex-col">
                        <span className="text-[10px] text-ivory-muted block">V_tương đương (V_eq):</span>
                        <span className="text-base font-bold text-cyan-300">{titrationOutput.equivalenceVolumeMl} mL</span>
                        <span className="text-[9px] text-ivory-muted">Điểm kết thúc phản ứng</span>
                      </div>
                      <div className="p-3 rounded-xl bg-navy/80 border border-navy-light/80 shadow-sm flex flex-col">
                        <span className="text-[10px] text-ivory-muted block">pH điểm tương đương:</span>
                        <span className="text-base font-bold text-emerald-400">{titrationOutput.equivalencePH}</span>
                        <span className="text-[9px] text-ivory-muted">
                          {titrationOutput.equivalencePH === 7 ? 'Trung tính (NaCl)' : titrationOutput.equivalencePH > 7 ? 'Bazơ nhẹ (Thủy phân)' : 'Axit nhẹ (Thủy phân)'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-navy/80 border border-navy-light/80 shadow-sm flex flex-col">
                        <span className="text-[10px] text-ivory-muted block">pH nửa tương đương:</span>
                        <span className="text-base font-bold text-pink-300">
                          {titrationOutput.halfEquivalencePH ? titrationOutput.halfEquivalencePH.toFixed(2) : 'N/A (Mạnh)'}
                        </span>
                        <span className="text-[9px] text-ivory-muted">
                          {hasHalfEq ? (titrationMode === 'ACID_BY_BASE' ? 'pH = pKa (Đệm)' : 'pH = 14 - pKb (Đệm)') : 'Không tạo dung dịch đệm'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-navy/80 border border-navy-light/80 shadow-sm flex flex-col">
                        <span className="text-[10px] text-ivory-muted block">Chỉ thị màu tối ưu:</span>
                        <span className="text-base font-bold text-yellow-300 truncate">
                          {titrationOutput.indicators.find(i => i.isSuitable)?.name.split(' (')[0] || 'Phenolphthalein'}
                        </span>
                        <span className="text-[9px] text-emerald-300 font-bold">Khuyến nghị GDPT 2018</span>
                      </div>
                    </div>

                    {/* INTERACTIVE SVG TITRATION CHART */}
                    <div className="p-4 rounded-xl bg-obsidian border border-navy-light flex flex-col gap-3 shadow-xl">
                      {/* Chart Toolbars & Legend */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ivory font-serif flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-ion animate-ping" />
                            Đồ Thị Chuẩn Độ Thể Tích (pH vs. V_{titrationMode === 'ACID_BY_BASE' ? 'NaOH' : 'HCl'})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px]">
                          <button
                            onClick={() => setShowIndicatorBands(!showIndicatorBands)}
                            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
                              showIndicatorBands
                                ? 'bg-purple-500/20 text-purple-200 border-purple-500/40'
                                : 'bg-navy text-ivory-muted border-navy-light hover:text-ivory'
                            }`}
                            title="Bật/tắt các dải chuyển màu chỉ thị"
                          >
                            <Eye className="w-3 h-3" />
                            {showIndicatorBands ? 'Ẩn Dải Chỉ Thị' : 'Hiện Dải Chỉ Thị'}
                          </button>

                          <div className="flex items-center gap-1 bg-navy/80 px-2 py-0.5 rounded-lg border border-navy-light">
                            <span className="text-ivory-muted">Chỉ thị xem màu:</span>
                            {[
                              { key: 'PHENO', label: 'Phenolphthalein' },
                              { key: 'BTB', label: 'Bromothymol Xanh' },
                              { key: 'METHYL_ORANGE', label: 'Methyl Da Cam' },
                              { key: 'METHYL_RED', label: 'Methyl Đỏ' }
                            ].map(ind => (
                              <button
                                key={ind.key}
                                onClick={() => setActiveIndicator(ind.key as any)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                                  activeIndicator === ind.key
                                    ? 'bg-cyan-ion text-obsidian shadow'
                                    : 'text-ivory-muted hover:text-ivory'
                                }`}
                              >
                                {ind.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SVG Canvas */}
                      <div className="relative w-full overflow-hidden">
                        <svg
                          viewBox="0 0 680 300"
                          className="w-full h-auto select-none"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = ((e.clientX - rect.left) / rect.width) * 680;
                            if (clickX >= 55 && clickX <= 645) {
                              const fraction = (clickX - 55) / 590;
                              const scrubV = Math.round(fraction * V_max * 10) / 10;
                              setScrubbedVolume(scrubV);
                            }
                          }}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = ((e.clientX - rect.left) / rect.width) * 680;
                            if (clickX >= 55 && clickX <= 645) {
                              const fraction = (clickX - 55) / 590;
                              const scrubV = Math.round(fraction * V_max * 10) / 10;
                              setScrubbedVolume(scrubV);
                              sound.playUiClick();
                            }
                          }}
                        >
                          <defs>
                            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#38bdf8" />
                              <stop offset="50%" stopColor="#a855f7" />
                              <stop offset="100%" stopColor="#f43f5e" />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>

                          {/* Background Grid */}
                          <rect x="55" y="25" width="590" height="230" fill="#0b1120" rx="4" />

                          {/* Horizontal pH Grid Lines (pH = 0, 2, 4, 6, 7, 8, 10, 12, 14) */}
                          {[0, 2, 4, 6, 7, 8, 10, 12, 14].map(pH => {
                            const y = toY(pH);
                            const isNeutral = pH === 7;
                            return (
                              <g key={pH}>
                                <line
                                  x1="55"
                                  y1={y}
                                  x2="645"
                                  y2={y}
                                  stroke={isNeutral ? '#10b981' : '#1e293b'}
                                  strokeWidth={isNeutral ? 1.5 : 1}
                                  strokeDasharray={isNeutral ? '4 3' : '2 2'}
                                  strokeOpacity={isNeutral ? 0.8 : 0.6}
                                />
                                <text
                                  x="48"
                                  y={y + 3.5}
                                  textAnchor="end"
                                  fill={isNeutral ? '#34d399' : '#94a3b8'}
                                  fontSize="9"
                                  fontFamily="monospace"
                                  fontWeight={isNeutral ? 'bold' : 'normal'}
                                >
                                  {pH}
                                </text>
                              </g>
                            );
                          })}

                          {/* Vertical Volume Grid Lines */}
                          {[0, 0.25, 0.5, 0.75, 1.0, 1.25].map(frac => {
                            const v = Math.round(titrationOutput.equivalenceVolumeMl * frac * 10) / 10;
                            const x = toX(v);
                            const isEq = frac === 1.0;
                            return (
                              <g key={frac}>
                                <line
                                  x1={x}
                                  y1="25"
                                  x2={x}
                                  y2="255"
                                  stroke={isEq ? '#38bdf8' : '#1e293b'}
                                  strokeWidth={isEq ? 1.5 : 1}
                                  strokeDasharray={isEq ? '4 3' : '2 2'}
                                  strokeOpacity={isEq ? 0.8 : 0.5}
                                />
                                <text
                                  x={x}
                                  y="272"
                                  textAnchor="middle"
                                  fill={isEq ? '#38bdf8' : '#94a3b8'}
                                  fontSize="9"
                                  fontFamily="monospace"
                                  fontWeight={isEq ? 'bold' : 'normal'}
                                >
                                  {v}
                                </text>
                              </g>
                            );
                          })}

                          {/* Indicator Transition Bands */}
                          {showIndicatorBands && (
                            <>
                              {/* Phenolphthalein: 8.2 - 10.0 (Pink) */}
                              <g opacity={activeIndicator === 'PHENO' ? 0.85 : 0.45}>
                                <rect
                                  x="55"
                                  y={toY(10.0)}
                                  width="590"
                                  height={toY(8.2) - toY(10.0)}
                                  fill="rgba(244, 114, 182, 0.16)"
                                  stroke="#f472b6"
                                  strokeWidth="0.8"
                                  strokeDasharray="3 3"
                                />
                                <text x="640" y={toY(9.1) + 3} textAnchor="end" fill="#f472b6" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  Phenolphthalein (8.2 – 10.0)
                                </text>
                              </g>

                              {/* Bromothymol Blue: 6.0 - 7.6 (Green) */}
                              <g opacity={activeIndicator === 'BTB' ? 0.85 : 0.35}>
                                <rect
                                  x="55"
                                  y={toY(7.6)}
                                  width="590"
                                  height={toY(6.0) - toY(7.6)}
                                  fill="rgba(16, 185, 129, 0.14)"
                                  stroke="#10b981"
                                  strokeWidth="0.8"
                                  strokeDasharray="3 3"
                                />
                                <text x="640" y={toY(6.8) + 3} textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  Bromothymol Xanh (6.0 – 7.6)
                                </text>
                              </g>

                              {/* Methyl Red: 4.4 - 6.2 (Red) */}
                              <g opacity={activeIndicator === 'METHYL_RED' ? 0.85 : 0.25}>
                                <rect
                                  x="55"
                                  y={toY(6.2)}
                                  width="590"
                                  height={toY(4.4) - toY(6.2)}
                                  fill="rgba(239, 68, 68, 0.12)"
                                  stroke="#ef4444"
                                  strokeWidth="0.8"
                                  strokeDasharray="3 3"
                                />
                                <text x="640" y={toY(5.3) + 3} textAnchor="end" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  Methyl Đỏ (4.4 – 6.2)
                                </text>
                              </g>

                              {/* Methyl Orange: 3.1 - 4.4 (Orange) */}
                              <g opacity={activeIndicator === 'METHYL_ORANGE' ? 0.85 : 0.35}>
                                <rect
                                  x="55"
                                  y={toY(4.4)}
                                  width="590"
                                  height={toY(3.1) - toY(4.4)}
                                  fill="rgba(249, 115, 22, 0.15)"
                                  stroke="#f97316"
                                  strokeWidth="0.8"
                                  strokeDasharray="3 3"
                                />
                                <text x="640" y={toY(3.75) + 3} textAnchor="end" fill="#fb923c" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  Methyl Da Cam (3.1 – 4.4)
                                </text>
                              </g>
                            </>
                          )}

                          {/* Area Under Curve Fill */}
                          <path d={areaD} fill="url(#areaGradient)" />

                          {/* Titration Curve Main Path */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke="url(#curveGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Half-Equivalence Point Marker (Buffer Midpoint) */}
                          {hasHalfEq && (
                            <g>
                              <circle cx={halfX} cy={halfY} r="5" fill="#f472b6" stroke="#ffffff" strokeWidth="1.5" />
                              <line x1={halfX} y1={halfY} x2={halfX} y2="255" stroke="#f472b6" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
                              <rect x={halfX - 42} y={halfY - 20} width="84" height="15" rx="3" fill="#1e1b4b" stroke="#f472b6" strokeWidth="0.8" />
                              <text x={halfX} y={halfY - 9} textAnchor="middle" fill="#f472b6" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                Nửa TĐ: pH={titrationOutput.halfEquivalencePH!.toFixed(2)}
                              </text>
                            </g>
                          )}

                          {/* Equivalence Point Milestone Marker */}
                          <g>
                            <circle cx={eqX} cy={eqY} r="9" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" className="animate-pulse" />
                            <circle cx={eqX} cy={eqY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                            <line x1={eqX} y1={eqY} x2={eqX} y2="255" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                            <line x1="55" y1={eqY} x2={eqX} y2={eqY} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />

                            {/* Equivalence Pill Label */}
                            <g transform={`translate(${eqX > 400 ? eqX - 145 : eqX + 12}, ${eqY > 200 ? eqY - 26 : eqY - 14})`}>
                              <rect x="0" y="0" width="135" height="24" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" opacity="0.95" />
                              <text x="6" y="11" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                                ĐIỂM TƯƠNG ĐƯƠNG (V_eq)
                              </text>
                              <text x="6" y="20" fill="#f8fafc" fontSize="8" fontFamily="monospace">
                                V = {titrationOutput.equivalenceVolumeMl} mL | pH = {titrationOutput.equivalencePH}
                              </text>
                            </g>
                          </g>

                          {/* Dynamic User Scrub / Hover Crosshair Marker */}
                          {scrubbedVolume !== null && (
                            <g>
                              <line x1={currX} y1="25" x2={currX} y2="255" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
                              <circle cx={currX} cy={currY} r="6" fill={visualState.border} stroke="#ffffff" strokeWidth="2" />
                              {/* Floating Tooltip */}
                              <g transform={`translate(${currX > 500 ? currX - 110 : currX + 10}, ${currY < 60 ? currY + 15 : currY - 25})`}>
                                <rect x="0" y="0" width="100" height="22" rx="4" fill="#020617" stroke="#94a3b8" strokeWidth="1" opacity="0.9" />
                                <text x="5" y="10" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  V = {currentV.toFixed(1)} mL
                                </text>
                                <text x="5" y="19" fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="bold">
                                  pH = {currentPH.toFixed(2)}
                                </text>
                              </g>
                            </g>
                          )}

                          {/* Axis Titles */}
                          <text x="350" y="292" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                            Thể tích {titrationMode === 'ACID_BY_BASE' ? 'NaOH' : 'HCl'} thêm vào (mL)
                          </text>
                          <text x="16" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" transform="rotate(-90 16 140)">
                            pH Dung Dịch (0 – 14)
                          </text>
                        </svg>
                      </div>

                      {/* Interactive Scrub Slider & Live Reaction Flask Preview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-navy/60 p-3.5 rounded-xl border border-navy-light/60">
                        {/* Column 1 & 2: Volumetric Burette Dropper Scrubber */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-ivory flex items-center gap-1.5 font-mono">
                              <Sliders className="w-3.5 h-3.5 text-cyan-ion" />
                              Mô Phỏng Nhỏ Giọt Burette: <span className="text-cyan-300 font-bold">{currentV.toFixed(1)} mL</span>
                            </span>
                            <span className="text-[10px] text-ivory-muted font-mono">
                              pH hiện tại: <span className="text-yellow-300 font-bold">{currentPH.toFixed(2)}</span>
                            </span>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max={V_max}
                            step="0.1"
                            value={currentV}
                            onChange={(e) => setScrubbedVolume(parseFloat(e.target.value))}
                            className="w-full accent-cyan-ion cursor-pointer"
                          />

                          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono">
                            <button
                              onClick={() => {
                                sound.playUiClick();
                                setScrubbedVolume(0);
                              }}
                              className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-ivory-muted border border-navy-light"
                            >
                              0 mL (Bắt Đầu)
                            </button>
                            <button
                              onClick={() => {
                                sound.playUiClick();
                                setScrubbedVolume(Math.max(0, currentV - 0.5));
                              }}
                              className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-ivory border border-navy-light"
                            >
                              -0.5 mL (Giọt)
                            </button>
                            <button
                              onClick={() => {
                                sound.playUiClick();
                                setScrubbedVolume(Math.min(V_max, currentV + 0.5));
                              }}
                              className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-cyan-300 border border-cyan-ion/40"
                            >
                              +0.5 mL (Giọt)
                            </button>
                            <button
                              onClick={() => {
                                sound.playUiClick();
                                setScrubbedVolume(Math.min(V_max, currentV + 2.0));
                              }}
                              className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-cyan-300 border border-cyan-ion/40"
                            >
                              +2.0 mL
                            </button>
                            <button
                              onClick={() => {
                                sound.playUiClick();
                                setScrubbedVolume(titrationOutput.equivalenceVolumeMl);
                              }}
                              className="px-2.5 py-1 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/50 font-bold ml-auto"
                            >
                              Nhảy Tới Điểm Tương Đương (V_eq)
                            </button>
                          </div>
                        </div>

                        {/* Column 3: Live Solution Color & Visual Flask Preview */}
                        <div className="flex items-center gap-3 bg-obsidian/80 p-3 rounded-xl border border-navy-light/80">
                          {/* Visual Flask Icon with Dynamic Liquid Fill */}
                          <div className="relative w-12 h-14 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 40 48" className="w-12 h-14">
                              {/* Flask Neck and Body Outline */}
                              <path
                                d="M16 4 L24 4 L24 16 L35 38 C37 42 34 46 30 46 L10 46 C6 46 3 42 5 38 L16 16 Z"
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="2"
                                strokeLinejoin="round"
                              />
                              {/* Dynamic Liquid Level & Color */}
                              <path
                                d="M10 28 L30 28 L34 38 C35.5 41 33 44 30 44 L10 44 C7 44 4.5 41 6 38 Z"
                                fill={visualState.fill}
                                stroke={visualState.border}
                                strokeWidth="1"
                                className="transition-all duration-300"
                              />
                              {/* Meniscus wave */}
                              <line x1="10" y1="28" x2="30" y2="28" stroke={visualState.border} strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>

                          {/* Color Description & Scientific State */}
                          <div className="flex flex-col gap-1 text-[11px] leading-tight overflow-hidden">
                            <span className="text-[10px] text-ivory-muted uppercase">Hiện Tượng Chỉ Thị:</span>
                            <span className={`font-bold px-2 py-0.5 rounded border text-[10px] truncate ${visualState.badgeClass}`}>
                              {visualState.label}
                            </span>
                            <span className="text-[10px] text-ivory-muted">
                              Vùng: <span className="text-cyan-300 font-bold">{closestPoint.region}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Indicator suitability panel */}
                    <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/80 flex flex-col gap-2.5">
                      <span className="text-xs font-bold text-ivory flex items-center gap-1.5 font-serif">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ĐÁNH GIÁ TÍNH PHÙ HỢP CỦA CÁC CHẤT CHỈ THỊ MÀU (GDPT 2018)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {titrationOutput.indicators.map((ind, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all ${
                              ind.isSuitable
                                ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200 shadow-sm'
                                : 'bg-red-950/20 border-red-500/30 text-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs">{ind.name} (pH {ind.pHRange})</span>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                  ind.isSuitable ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/30 text-rose-300 border border-red-500/40'
                                }`}
                              >
                                {ind.isSuitable ? '✓ PHÙ HỢP' : '✗ KHÔNG PHÙ HỢP'}
                              </span>
                            </div>
                            <span className="text-[10px] opacity-90 font-mono">
                              Đổi màu: {ind.colorChangeVI}
                            </span>
                            <span className="text-[10px] opacity-80 leading-relaxed">
                              {ind.scientificReasonVI}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected points table */}
                    <div className="p-3.5 rounded-xl bg-obsidian/80 border border-navy-light/60 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ivory font-serif">
                          Bảng Dữ Liệu Các Mốc Chuẩn Độ Tiêu Biểu:
                        </span>
                        <span className="text-[10px] text-ivory-muted font-mono">10 Điểm Chuẩn Thể Tích</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left">
                          <thead>
                            <tr className="border-b border-navy-light/60 text-ivory-muted">
                              <th className="py-1.5">V_thêm (mL)</th>
                              <th className="py-1.5">% V_eq</th>
                              <th className="py-1.5">pH</th>
                              <th className="py-1.5">Trạng Thái / Vùng Phản Ứng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {titrationOutput.dataPoints.map((pt, idx) => {
                              const v = pt.volumeTitrantAddedMl ?? pt.volumeBaseAddedMl;
                              const pct = Math.round((v / titrationOutput.equivalenceVolumeMl) * 100);
                              const isEq = Math.abs(v - titrationOutput.equivalenceVolumeMl) < 0.01;
                              return (
                                <tr
                                  key={idx}
                                  onClick={() => {
                                    sound.playUiClick();
                                    setScrubbedVolume(v);
                                  }}
                                  className={`border-b border-navy-light/30 text-ivory hover:bg-navy/50 cursor-pointer transition-colors ${
                                    isEq ? 'bg-cyan-ion/10 font-bold text-cyan-300' : ''
                                  }`}
                                >
                                  <td className="py-1.5 font-mono">{v.toFixed(1)}</td>
                                  <td className="py-1.5 font-mono text-ivory-muted">{pct}%</td>
                                  <td className="py-1.5 font-mono font-bold text-cyan-300">{pt.pH.toFixed(2)}</td>
                                  <td className="py-1.5 text-ivory-muted text-[10px] font-mono">{pt.region}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pedagogical Step-by-Step Curriculum Explanation */}
                    {titrationOutput.stepByStepExplanationVI && titrationOutput.stepByStepExplanationVI.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-ivory font-serif flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-cyan-ion" />
                          Các Bước Tính Toán Lý Thuyết &amp; Cơ Chế Hóa Học:
                        </span>
                        {titrationOutput.stepByStepExplanationVI.map((step, idx) => (
                          <div key={idx} className="text-[11px] text-ivory-muted leading-relaxed font-mono">
                            {step}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: STOICHIOMETRY (TOÁN CHẤT DƯ) */}
          {activeTab === 'STOICHIOMETRY' && (
            <div className="p-5 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-navy-light/50 pb-2">
                <span className="text-xs font-bold text-ivory flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Mô Phỏng Phản Ứng: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe (Nhiệt Nhôm)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                  Phản Ứng Tỏa Nhiệt &gt; 2500°C
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-ivory-muted block mb-1">Số Mol Al Đưa Vào (mol):</label>
                  <input
                    type="number"
                    value={stoichReactant1Moles}
                    onChange={(e) => setStoichReactant1Moles(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-ivory-muted block mb-1">Số Mol Fe₂O₃ Đưa Vào (mol):</label>
                  <input
                    type="number"
                    value={stoichReactant2Moles}
                    onChange={(e) => setStoichReactant2Moles(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateStoich}
                className="py-2 rounded-xl bg-gradient-to-r from-cyan-ion to-coral-reaction text-obsidian font-bold text-xs shadow hover:scale-[1.01] transition-all"
              >
                Giải Bài Toán Chất Giới Hạn & Lượng Sản Phẩm
              </button>

              {stoichOutput && (
                <div className="p-4 rounded-xl bg-navy/80 border border-cyan-ion/40 text-xs font-mono flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Chất phản ứng hết (Chất giới hạn): {stoichOutput.limitingReactant}</span>
                  </div>

                  {stoichOutput.excessReactant && (
                    <span className="text-orange-400">
                      Chất dư: {stoichOutput.excessReactant} (còn dư {stoichOutput.excessMolesRemaining} mol)
                    </span>
                  )}

                  <div className="pt-2 border-t border-navy-light/40 flex flex-col gap-1 text-ivory-muted">
                    {stoichOutput.stepsVI.map((s: string, idx: number) => (
                      <span key={idx}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REDOX HALF-REACTIONS */}
          {activeTab === 'REDOX' && (
            <div className="p-5 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-ion">
                  Chọn Phản Ứng Oxi Hóa - Khử Mẫu Để Phân Tích:
                </span>
                <select
                  value={selectedRedoxKey}
                  onChange={(e) => setSelectedRedoxKey(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory max-w-md truncate"
                >
                  {Object.values(VERIFIED_REDOX_DATABASE).map((rx) => (
                    <option key={rx.reactionKey} value={rx.reactionKey}>
                      {rx.equation} — {rx.titleVI}
                    </option>
                  ))}
                </select>
              </div>

              {(() => {
                const redox = VERIFIED_REDOX_DATABASE[selectedRedoxKey];
                if (!redox) return null;
                return (
                  <div className="p-4 rounded-xl bg-navy/80 border border-cyan-ion/40 text-xs font-mono flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 rounded bg-obsidian border border-emerald-500/30">
                        <span className="text-emerald-400 font-bold block mb-1">Chất Khử (Số oxi hóa tăng):</span>
                        <span className="text-ivory">{redox.reducingAgent}</span>
                      </div>
                      <div className="p-2.5 rounded bg-obsidian border border-coral-reaction/30">
                        <span className="text-coral-reaction font-bold block mb-1">Chất Oxi Hóa (Số oxi hóa giảm):</span>
                        <span className="text-ivory">{redox.oxidizingAgent}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2 border-t border-navy-light/50">
                      <span className="text-cyan-300 font-bold">1. {redox.oxidationProcessVI}</span>
                      <span className="text-cyan-300 font-bold">2. {redox.reductionProcessVI}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-300 pt-1 border-t border-navy-light/40">
                      <span>Tổng electron trao đổi (thăng bằng e): <strong>{redox.totalElectronsTransferred}e⁻</strong></span>
                      <span className="text-purple-300 text-[10px]">{redox.curriculumStandardVI}</span>
                    </div>

                    <p className="text-ivory-muted text-[11px] leading-relaxed pt-1 border-t border-navy-light/40 italic">
                      {redox.pedagogicalExplanationVI}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 5: THERMOCHEMISTRY & REACTION KINETICS */}
          {activeTab === 'THERMO' && (
            <div className="flex flex-col gap-5 p-5 rounded-xl bg-obsidian/60 border border-navy-light/60">
              {/* Part A: Reaction Enthalpy Calculation (Methods 1 & 2) */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Biến Thiên Enthalpy Chuẩn ΔᵣH°₂₉₈ (GDPT 2018):
                    </span>
                    {/* Method Toggle */}
                    <div className="flex items-center rounded-lg bg-navy/90 p-0.5 border border-navy-light text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setThermoCalcMethod('FORMATION')}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          thermoCalcMethod === 'FORMATION'
                            ? 'bg-orange-500 text-obsidian font-bold shadow'
                            : 'text-ivory-muted hover:text-ivory'
                        }`}
                      >
                        Nhiệt Tạo Thành (Δ_f H°)
                      </button>
                      <button
                        type="button"
                        onClick={() => setThermoCalcMethod('BOND_ENERGY')}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          thermoCalcMethod === 'BOND_ENERGY'
                            ? 'bg-amber-500 text-obsidian font-bold shadow'
                            : 'text-ivory-muted hover:text-ivory'
                        }`}
                      >
                        Năng Lượng Liên Kết (E_b)
                      </button>
                    </div>
                  </div>

                  {thermoCalcMethod === 'FORMATION' ? (
                    <select
                      value={selectedThermoId}
                      onChange={(e) => setSelectedThermoId(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-navy border border-navy-light text-xs font-mono text-ivory max-w-xs"
                    >
                      {CURRICULUM_THERMO_REACTIONS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name_vi}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={selectedBondThermoId}
                      onChange={(e) => setSelectedBondThermoId(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-navy border border-amber-500/40 text-xs font-mono text-amber-200 max-w-xs"
                    >
                      {CURRICULUM_BOND_ENTHALPY_REACTIONS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name_vi}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {thermoCalcMethod === 'FORMATION' ? (
                  (() => {
                    const currentRx = CURRICULUM_THERMO_REACTIONS.find((r) => r.id === selectedThermoId) || CURRICULUM_THERMO_REACTIONS[0];
                    const res = ThermochemistryEngine.calculateEnthalpyFromFormation(currentRx);
                    return (
                      <div className="p-4 rounded-xl bg-navy/80 border border-orange-500/30 flex flex-col gap-3 font-mono text-xs">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-sm font-bold text-ivory">{currentRx.equation}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              res.isExothermic
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            ΔᵣH°₂₉₈ = {res.delta_r_H298 > 0 ? '+' : ''}{res.delta_r_H298} kJ ({res.reactionTypeVI})
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-obsidian/70 border border-navy-light/40 flex flex-col gap-1 text-[11px] text-ivory-muted">
                          {res.stepExplanationVI.map((s, idx) => (
                            <span key={idx} className={idx === res.stepExplanationVI.length - 1 ? 'text-yellow-400 font-bold' : ''}>
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 p-2.5 rounded bg-orange-950/30 border border-orange-500/30 text-[11px] text-orange-200">
                          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                          <span>
                            <strong>Hiệu ứng MOBA Gameplay:</strong> {currentRx.notesVI} (Tăng tốc di chuyển +{res.gameplayModifier.movementBonusPct}%, sát thương nổ diện rộng +{res.gameplayModifier.areaDamageBonusPct}%).
                          </span>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  (() => {
                    const currentBondRx = CURRICULUM_BOND_ENTHALPY_REACTIONS.find((r) => r.id === selectedBondThermoId) || CURRICULUM_BOND_ENTHALPY_REACTIONS[0];
                    const res = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(currentBondRx);
                    return (
                      <div className="p-4 rounded-xl bg-navy/80 border border-amber-500/30 flex flex-col gap-3 font-mono text-xs">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-sm font-bold text-amber-200">{currentBondRx.equation}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              res.isExothermic
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            ΔᵣH°₂₉₈ = {res.delta_r_H298 > 0 ? '+' : ''}{res.delta_r_H298} kJ ({res.reactionTypeVI})
                          </span>
                        </div>

                        {/* Bond energy summary boxes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 rounded bg-obsidian/60 border border-amber-500/20 flex flex-col gap-1">
                            <span className="text-amber-400 font-bold">Chất đầu (Liên kết bị phá vỡ):</span>
                            <div className="flex flex-wrap gap-1.5 text-ivory-muted">
                              {currentBondRx.reactantBonds.map((b, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-navy border border-navy-light text-[10px]">
                                  {b.count} × {b.bond}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-ivory mt-1">∑ E_b(chất đầu) = {res.sumReactantsEb} kJ</span>
                          </div>

                          <div className="p-2.5 rounded bg-obsidian/60 border border-emerald-500/20 flex flex-col gap-1">
                            <span className="text-emerald-400 font-bold">Sản phẩm (Liên kết hình thành):</span>
                            <div className="flex flex-wrap gap-1.5 text-ivory-muted">
                              {currentBondRx.productBonds.map((b, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-navy border border-navy-light text-[10px]">
                                  {b.count} × {b.bond}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-ivory mt-1">∑ E_b(sản phẩm) = {res.sumProductsEb} kJ</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-obsidian/70 border border-navy-light/40 flex flex-col gap-1 text-[11px] text-ivory-muted">
                          {res.stepExplanationVI.map((s, idx) => (
                            <span key={idx} className={idx === res.stepExplanationVI.length - 1 ? 'text-amber-300 font-bold' : ''}>
                              {s}
                            </span>
                          ))}
                        </div>

                        {currentBondRx.notesVI && (
                          <div className="flex items-center gap-2 p-2.5 rounded bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>
                              <strong>Ý nghĩa GDPT 2018 & MOBA:</strong> {currentBondRx.notesVI}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Part B: Chemical Kinetics (Van 't Hoff & Arrhenius Catalyst) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-navy-light/50">
                {/* B1. Van 't Hoff Rule */}
                <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/50 flex flex-col gap-2.5 text-xs font-mono">
                  <span className="text-cyan-ion font-bold flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    Quy Tắc Van 't Hoff (Nhiệt Độ & Tốc Độ)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-ivory-muted block mb-1">T₁ (°C)</span>
                      <input
                        type="number"
                        value={t1Input}
                        onChange={(e) => setT1Input(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory-muted block mb-1">T₂ (°C)</span>
                      <input
                        type="number"
                        value={t2Input}
                        onChange={(e) => setT2Input(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory-muted block mb-1">Hệ số γ</span>
                      <input
                        type="number"
                        step="0.1"
                        value={gammaInput}
                        onChange={(e) => setGammaInput(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                      />
                    </div>
                  </div>
                  {(() => {
                    const t1 = parseFloat(t1Input) || 20;
                    const t2 = parseFloat(t2Input) || 40;
                    const g = parseFloat(gammaInput) || 2;
                    const vRes = ThermochemistryEngine.calculateVanTHoffRateIncrease(t1, t2, g);
                    return (
                      <p className="text-[11px] text-emerald-300 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                        {vRes.explanationVI}
                      </p>
                    );
                  })()}
                </div>

                {/* B2. Catalyst Activation Energy (Arrhenius) */}
                <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/50 flex flex-col gap-2.5 text-xs font-mono">
                  <span className="text-yellow-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Cơ Chế Xúc Tác Bạch Kim Pt (Giảm Eₐ)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-ivory-muted block mb-1">Eₐ thường (kJ)</span>
                      <input
                        type="number"
                        value={eaOrigInput}
                        onChange={(e) => setEaOrigInput(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory-muted block mb-1">Eₐ có xúc tác (kJ)</span>
                      <input
                        type="number"
                        value={eaCatInput}
                        onChange={(e) => setEaCatInput(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                      />
                    </div>
                  </div>
                  {(() => {
                    const orig = parseFloat(eaOrigInput) || 75;
                    const cat = parseFloat(eaCatInput) || 45;
                    const catRes = ThermochemistryEngine.calculateCatalystSpeedup(orig, cat);
                    return (
                      <p className="text-[11px] text-cyan-300 bg-cyan-950/20 p-2 rounded border border-cyan-500/20">
                        {catRes.explanationVI}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ELECTROCHEMISTRY & FARADAY ELECTROLYSIS */}
          {activeTab === 'ELECTROCHEM' && (
            <div className="p-5 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-navy-light/50 pb-2">
                <span className="font-bold text-ivory flex items-center gap-2">
                  <Battery className="w-4 h-4 text-cyan-ion" />
                  Pin Điện Hóa (Galvanic / Voltaic) &amp; Bình Điện Phân (Faraday)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  GDPT 2018 Hóa Học 12 - Chuyên Đề Điện Hóa
                </span>
              </div>

              {/* Sub-mode Switcher */}
              <div className="flex items-center gap-2 bg-navy/80 p-1 rounded-lg border border-navy-light/60 w-fit">
                <button
                  onClick={() => { sound.playUiClick(); setElectroMode('GALVANIC'); }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    electroMode === 'GALVANIC'
                      ? 'bg-cyan-ion text-obsidian shadow'
                      : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  1. Pin Điện Hóa (Daniell &amp; Nernst)
                </button>
                <button
                  onClick={() => { sound.playUiClick(); setElectroMode('ELECTROLYSIS'); }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    electroMode === 'ELECTROLYSIS'
                      ? 'bg-coral-reaction text-white shadow'
                      : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  2. Định Luật Điện Phân Faraday
                </button>
              </div>

              {/* MODE 1: GALVANIC CELLS */}
              {electroMode === 'GALVANIC' && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Half-cell A */}
                    <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/60 flex flex-col gap-2">
                      <span className="font-bold text-cyan-300">Bán Pin 1 (Điện Cực A):</span>
                      <select
                        value={coupleAId}
                        onChange={(e) => setCoupleAId(e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-obsidian border border-navy-light text-ivory text-xs"
                      >
                        {Object.values(STANDARD_REDUCTION_POTENTIALS).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.halfReactionVI} (E° = {c.standardPotentialE0 > 0 ? `+${c.standardPotentialE0}` : c.standardPotentialE0} V)
                          </option>
                        ))}
                      </select>
                      <div>
                        <label className="text-[10px] text-ivory-muted block mb-1">Nồng Độ Ion [M₁] (M):</label>
                        <input
                          type="number"
                          step="0.1"
                          value={concAInput}
                          onChange={(e) => setConcAInput(e.target.value)}
                          className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                        />
                      </div>
                    </div>

                    {/* Half-cell B */}
                    <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/60 flex flex-col gap-2">
                      <span className="font-bold text-amber-300">Bán Pin 2 (Điện Cực B):</span>
                      <select
                        value={coupleBId}
                        onChange={(e) => setCoupleBId(e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-obsidian border border-navy-light text-ivory text-xs"
                      >
                        {Object.values(STANDARD_REDUCTION_POTENTIALS).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.halfReactionVI} (E° = {c.standardPotentialE0 > 0 ? `+${c.standardPotentialE0}` : c.standardPotentialE0} V)
                          </option>
                        ))}
                      </select>
                      <div>
                        <label className="text-[10px] text-ivory-muted block mb-1">Nồng Độ Ion [M₂] (M):</label>
                        <input
                          type="number"
                          step="0.1"
                          value={concBInput}
                          onChange={(e) => setConcBInput(e.target.value)}
                          className="w-full px-2 py-1 rounded bg-obsidian border border-navy-light text-xs text-ivory"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateGalvanic}
                    className="py-2 rounded-lg bg-cyan-ion text-obsidian font-bold shadow hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Mô Phỏng Pin Điện Hóa &amp; Tính Sức Điện Động (E° &amp; E_Nernst)
                  </button>

                  {galvanicOutput && (
                    <div className="flex flex-col gap-3">
                      {/* Metric summary */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">E°_pin (Chuẩn):</span>
                          <span className="text-base font-bold text-cyan-300">+{galvanicOutput.standardCellPotentialE0} V</span>
                        </div>
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">E_pin (Nernst 25°C):</span>
                          <span className="text-base font-bold text-emerald-400">+{galvanicOutput.nonStandardCellPotentialE} V</span>
                        </div>
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">Biến thiên Gibbs ΔG°:</span>
                          <span className="text-base font-bold text-amber-300">{galvanicOutput.gibbsFreeEnergyDeltaG0Kj} kJ/mol</span>
                        </div>
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">Số mol electron n:</span>
                          <span className="text-base font-bold text-purple-300">{galvanicOutput.electronsTransferred} mol e⁻</span>
                        </div>
                      </div>

                      {/* INTERACTIVE SVG GALVANIC CELL SCHEMATIC */}
                      <div className="p-4 rounded-xl bg-obsidian border border-navy-light flex flex-col gap-2.5 shadow-xl select-none">
                        <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
                          <span className="text-xs font-serif font-bold text-ivory flex items-center gap-1.5">
                            <Battery className="w-3.5 h-3.5 text-cyan-ion" />
                            Sơ Đồ Pin Điện Hóa Daniell &amp; Chiều Dòng Điện Tự Diễn Biến
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                            ΔG° = {galvanicOutput.gibbsFreeEnergyDeltaG0Kj} kJ/mol (Tự phát)
                          </span>
                        </div>

                        <div className="relative w-full overflow-hidden">
                          <svg viewBox="0 0 620 230" className="w-full h-auto">
                            <defs>
                              <linearGradient id="anodeLiquid" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
                              </linearGradient>
                              <linearGradient id="cathodeLiquid" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#d97706" stopOpacity="0.45" />
                              </linearGradient>
                            </defs>

                            {/* Left Beaker (Anode Compartment) */}
                            <rect x="65" y="90" width="130" height="110" rx="6" fill="#030712" stroke="#475569" strokeWidth="2" />
                            <rect x="68" y="115" width="124" height="82" rx="4" fill="url(#anodeLiquid)" />
                            {/* Anode Electrode Bar */}
                            <rect x="118" y="55" width="24" height="115" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
                            <text x="130" y="48" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">
                              Anot (-) [{galvanicOutput.anode.couple.reducedForm}]
                            </text>
                            <text x="130" y="155" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                              {galvanicOutput.anode.couple.oxidizedForm} ({galvanicOutput.anode.concentrationM} M)
                            </text>

                            {/* Right Beaker (Cathode Compartment) */}
                            <rect x="425" y="90" width="130" height="110" rx="6" fill="#030712" stroke="#475569" strokeWidth="2" />
                            <rect x="428" y="115" width="124" height="82" rx="4" fill="url(#cathodeLiquid)" />
                            {/* Cathode Electrode Bar */}
                            <rect x="478" y="55" width="24" height="115" rx="3" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="490" y="48" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                              Catot (+) [{galvanicOutput.cathode.couple.reducedForm}]
                            </text>
                            <text x="490" y="155" textAnchor="middle" fill="#fbbf24" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                              {galvanicOutput.cathode.couple.oxidizedForm} ({galvanicOutput.cathode.concentrationM} M)
                            </text>

                            {/* Inverted U-tube Salt Bridge */}
                            <path
                              d="M 175 145 L 175 75 Q 175 55 195 55 L 425 55 Q 445 55 445 75 L 445 145"
                              fill="none"
                              stroke="#334155"
                              strokeWidth="18"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 175 145 L 175 75 Q 175 55 195 55 L 425 55 Q 445 55 445 75 L 445 145"
                              fill="none"
                              stroke="#64748b"
                              strokeWidth="14"
                              strokeLinecap="round"
                              opacity="0.8"
                            />
                            {/* Salt bridge badge */}
                            <rect x="250" y="44" width="120" height="22" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
                            <text x="310" y="58" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                              CẦU MUỐI (KNO₃)
                            </text>
                            {/* Salt bridge ion arrows */}
                            <text x="215" y="75" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold">
                              ← NO₃⁻ (Về Anot)
                            </text>
                            <text x="405" y="75" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
                              K⁺ (Về Catot) →
                            </text>

                            {/* External Wire */}
                            <path
                              d="M 130 55 L 130 22 L 490 22 L 490 55"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2.5"
                              strokeDasharray="6 3"
                            />

                            {/* Electron Flow Annotation */}
                            <text x="210" y="16" fill="#facc15" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                              Dòng e⁻: Anot ⟶ Catot ⟶
                            </text>
                            <text x="410" y="16" fill="#facc15" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                              ⟶
                            </text>

                            {/* Digital Voltmeter Gauge */}
                            <g transform="translate(310, 22)">
                              <circle cx="0" cy="0" r="24" fill="#090d16" stroke="#38bdf8" strokeWidth="2" className="shadow-lg" />
                              <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" className="animate-pulse" />
                              <text x="0" y="-3" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="black">
                                +{galvanicOutput.nonStandardCellPotentialE} V
                              </text>
                              <text x="0" y="8" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="monospace">
                                VOLTMETER
                              </text>
                            </g>

                            {/* Base Platform */}
                            <rect x="40" y="200" width="540" height="6" rx="3" fill="#1e293b" />
                          </svg>
                        </div>
                      </div>

                      {/* Electrodes Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col gap-1">
                          <span className="font-bold text-emerald-300">Cực Catot (+) — Cực Dương:</span>
                          <span className="text-[11px] text-ivory">{galvanicOutput.cathode.halfReaction}</span>
                          <span className="text-[10px] text-emerald-400/80">Xảy ra sự khử chất có thế điện cực cao hơn</span>
                        </div>
                        <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 flex flex-col gap-1">
                          <span className="font-bold text-rose-300">Cực Anot (-) — Cực Âm:</span>
                          <span className="text-[11px] text-ivory">{galvanicOutput.anode.halfReaction}</span>
                          <span className="text-[10px] text-rose-400/80">Xảy ra sự oxi hóa chất có thế điện cực thấp hơn</span>
                        </div>
                      </div>

                      {/* Mechanism banner */}
                      <div className="p-3 rounded-lg bg-obsidian border border-navy-light/60 flex flex-col gap-1.5 text-[11px]">
                        <p className="text-cyan-200">⚡ {galvanicOutput.electronFlowVI}</p>
                        <p className="text-amber-200">🧪 {galvanicOutput.saltBridgeIonsMigrationVI}</p>
                      </div>

                      {/* Detailed Steps */}
                      <div className="p-3 rounded-lg bg-navy/40 border border-navy-light/40 flex flex-col gap-1">
                        <span className="font-bold text-ivory-muted mb-1">Các Bước Tính Toán Chi Tiết:</span>
                        {galvanicOutput.stepByStepExplanationVI.map((step, i) => (
                          <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: FARADAY ELECTROLYSIS */}
              {electroMode === 'ELECTROLYSIS' && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="text-[10px] text-ivory-muted block mb-1">Mô Hình Điện Phân:</label>
                      <select
                        value={electrolysisScenario}
                        onChange={(e) => setElectrolysisScenario(e.target.value as any)}
                        className="w-full px-2 py-1.5 rounded bg-obsidian border border-navy-light text-ivory text-xs"
                      >
                        <option value="CUSO4_AQUEOUS">CuSO₄ dd (Catot: Cu, Anot: O₂)</option>
                        <option value="NACL_AQUEOUS_DIAPHRAGM">NaCl dd có màng ngăn (Sản xuất xút NaOH, Cl₂, H₂)</option>
                        <option value="NACL_AQUEOUS_NO_DIAPHRAGM">NaCl dd không màng ngăn (Nước Javel NaClO)</option>
                        <option value="NACL_MOLTEN">NaCl nóng chảy (Sản xuất Na kim loại &amp; Cl₂)</option>
                        <option value="AL2O3_MOLTEN_CRYOLITE">Al₂O₃ nóng chảy criolit (Sản xuất nhôm Al)</option>
                        <option value="AGNO3_AQUEOUS">AgNO₃ dd (Catot: Ag, Anot: O₂)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-ivory-muted block mb-1">Cường Độ Dòng Điện I (Ampe):</label>
                      <input
                        type="number"
                        step="0.5"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-obsidian border border-navy-light text-ivory text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-ivory-muted block mb-1">Thời Gian Điện Phân t (Giây):</label>
                      <input
                        type="number"
                        step="100"
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-obsidian border border-navy-light text-ivory text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCalculateElectrolysis}
                    className="py-2 rounded-lg bg-coral-reaction text-white font-bold shadow hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Tính Toán Sản Phẩm Điện Phân Theo Định Luật Faraday (m &amp; V_khí)
                  </button>

                  {electrolysisOutput && (
                    <div className="flex flex-col gap-3">
                      {/* Metric cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">Điện Lượng Q (I · t):</span>
                          <span className="text-base font-bold text-cyan-300">{electrolysisOutput.totalChargeCoulombs} C</span>
                        </div>
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light">
                          <span className="text-[10px] text-ivory-muted block">Số Mol Electron n_e (Q/F):</span>
                          <span className="text-base font-bold text-amber-300">{electrolysisOutput.electronsTransferredMoles} mol e⁻</span>
                        </div>
                        <div className="p-3 rounded-lg bg-navy/80 border border-navy-light col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-ivory-muted block">Xu Hướng pH Dung Dịch:</span>
                          <span className="text-sm font-bold text-emerald-400">{electrolysisOutput.solutionPhTrend}</span>
                        </div>
                      </div>

                      {/* INTERACTIVE SVG ELECTROLYSIS CELL SCHEMATIC */}
                      <div className="p-4 rounded-xl bg-obsidian border border-navy-light flex flex-col gap-2.5 shadow-xl select-none">
                        <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
                          <span className="text-xs font-serif font-bold text-ivory flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-coral-reaction" />
                            Sơ Đồ Bình Điện Phân Dòng Một Chiều (DC Electrolytic Cell)
                          </span>
                          <span className="text-[10px] font-mono text-coral-reaction bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                            I = {electrolysisOutput.currentAmperes} A | t = {electrolysisOutput.timeSeconds} s
                          </span>
                        </div>

                        <div className="relative w-full overflow-hidden">
                          <svg viewBox="0 0 620 230" className="w-full h-auto">
                            <defs>
                              <linearGradient id="bathLiquid" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
                              </linearGradient>
                            </defs>

                            {/* Electrolysis Bath Container */}
                            <rect x="150" y="75" width="320" height="125" rx="8" fill="#030712" stroke="#475569" strokeWidth="2" />
                            <rect x="154" y="95" width="312" height="101" rx="6" fill="url(#bathLiquid)" />
                            <text x="310" y="190" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
                              Dung dịch điện phân: {electrolysisOutput.electrolyteFormula}
                            </text>

                            {/* Left Electrode: Catot (-) */}
                            <rect x="210" y="55" width="24" height="115" rx="3" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                            <text x="222" y="48" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold">
                              Catot (-) [Cực Âm DC]
                            </text>
                            {/* Cathode product annotation */}
                            <rect x="165" y="115" width="114" height="20" rx="3" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.8" opacity="0.9" />
                            <text x="222" y="128" textAnchor="middle" fill="#93c5fd" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                              {electrolysisOutput.cathodeProduct.substance} ({electrolysisOutput.cathodeProduct.massGrams !== undefined ? `${electrolysisOutput.cathodeProduct.massGrams}g` : `${electrolysisOutput.cathodeProduct.volumeLiters}L`})
                            </text>

                            {/* Right Electrode: Anot (+) */}
                            <rect x="386" y="55" width="24" height="115" rx="3" fill="#eab308" stroke="#fde047" strokeWidth="1.5" />
                            <text x="398" y="48" textAnchor="middle" fill="#facc15" fontSize="9" fontFamily="monospace" fontWeight="bold">
                              Anot (+) [Cực Dương DC]
                            </text>
                            {/* Anode product annotation */}
                            <rect x="341" y="115" width="114" height="20" rx="3" fill="#0f172a" stroke="#eab308" strokeWidth="0.8" opacity="0.9" />
                            <text x="398" y="128" textAnchor="middle" fill="#fde047" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                              {electrolysisOutput.anodeProduct.substance} ({electrolysisOutput.anodeProduct.volumeLiters !== undefined ? `${electrolysisOutput.anodeProduct.volumeLiters}L` : `${electrolysisOutput.anodeProduct.massGrams}g`})
                            </text>

                            {/* Gas Bubbles at Anode / Cathode */}
                            <circle cx="392" cy="145" r="3" fill="#ffffff" opacity="0.7" />
                            <circle cx="404" cy="155" r="2.5" fill="#ffffff" opacity="0.6" />
                            <circle cx="396" cy="165" r="3.5" fill="#ffffff" opacity="0.5" />

                            {/* External Wires connected to DC Power Source */}
                            <path d="M 222 55 L 222 22 L 285 22" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="5 3" />
                            <path d="M 335 22 L 398 22 L 398 55" fill="none" stroke="#f87171" strokeWidth="2.5" strokeDasharray="5 3" />

                            {/* DC Power Source Box */}
                            <g transform="translate(310, 22)">
                              <rect x="-30" y="-16" width="60" height="32" rx="5" fill="#020617" stroke="#f43f5e" strokeWidth="1.5" />
                              <text x="-16" y="5" textAnchor="middle" fill="#60a5fa" fontSize="13" fontFamily="monospace" fontWeight="black">-</text>
                              <text x="16" y="5" textAnchor="middle" fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="black">+</text>
                              <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold">DC</text>
                            </g>

                            {/* Electron Flow and Current arrows */}
                            <text x="245" y="15" fill="#93c5fd" fontSize="8" fontFamily="monospace">
                              e⁻ ⟶ (về Catot)
                            </text>
                            <text x="345" y="15" fill="#f87171" fontSize="8" fontFamily="monospace">
                              ⟶ e⁻ (về nguồn)
                            </text>

                            {/* Base Platform */}
                            <rect x="120" y="200" width="380" height="6" rx="3" fill="#1e293b" />
                          </svg>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 flex flex-col gap-1">
                          <span className="font-bold text-cyan-300">Sản Phẩm Tại Catot (-):</span>
                          <span className="text-xs text-ivory font-bold">{electrolysisOutput.cathodeProduct.substance}</span>
                          <span className="text-[10px] text-ivory-muted">{electrolysisOutput.cathodeProduct.halfReactionVI}</span>
                          {electrolysisOutput.cathodeProduct.massGrams !== undefined && (
                            <span className="text-xs text-emerald-300 font-bold">Khối lượng bám: {electrolysisOutput.cathodeProduct.massGrams} g</span>
                          )}
                          {electrolysisOutput.cathodeProduct.volumeLiters !== undefined && (
                            <span className="text-xs text-cyan-300 font-bold">Thể tích khí: {electrolysisOutput.cathodeProduct.volumeLiters} L</span>
                          )}
                        </div>

                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 flex flex-col gap-1">
                          <span className="font-bold text-amber-300">Sản Phẩm Tại Anot (+):</span>
                          <span className="text-xs text-ivory font-bold">{electrolysisOutput.anodeProduct.substance}</span>
                          <span className="text-[10px] text-ivory-muted">{electrolysisOutput.anodeProduct.halfReactionVI}</span>
                          {electrolysisOutput.anodeProduct.volumeLiters !== undefined && (
                            <span className="text-xs text-yellow-300 font-bold">Thể tích khí: {electrolysisOutput.anodeProduct.volumeLiters} L</span>
                          )}
                          {electrolysisOutput.anodeProduct.massGrams !== undefined && (
                            <span className="text-xs text-emerald-300 font-bold">Khối lượng: {electrolysisOutput.anodeProduct.massGrams} g</span>
                          )}
                        </div>
                      </div>

                      {/* Overall Reaction */}
                      <div className="p-3 rounded-lg bg-navy/80 border border-navy-light flex items-center justify-between text-xs">
                        <span className="text-ivory-muted">Phương Trình Tổng Quát:</span>
                        <span className="font-bold text-cyan-200">{electrolysisOutput.overallEquationVI}</span>
                      </div>

                      {/* Detailed Steps */}
                      <div className="p-3 rounded-lg bg-navy/40 border border-navy-light/40 flex flex-col gap-1">
                        <span className="font-bold text-ivory-muted mb-1">Các Bước Tính Toán Theo Faraday:</span>
                        {electrolysisOutput.stepByStepExplanationVI.map((step, i) => (
                          <span key={i} className="text-ivory-muted text-[11px]">{step}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
