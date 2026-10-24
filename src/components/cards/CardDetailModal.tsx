// src/components/cards/CardDetailModal.tsx
// High-Craft Interactive Card Detail & Scientific Inspection Modal for ELEMENTA
// Integrates 3D Holographic Foil Display, Yu-Gi-Oh! Master Rule Dossier,
// IUPAC Quantum Orbital Diagrams (Hund/Pauli), and Chemical Reaction Network

import React, { useState, useMemo, useEffect } from 'react';
import { PlayableCardDef } from '../../domain/cardGameTypes';
import { ChemicalCardView } from './ChemicalCardView';
import { OrbitalBoxDiagram } from '../visualizations/OrbitalBoxDiagram';
import { BondingVisualizerModal } from '../visualizations/BondingVisualizerModal';
import { FlameTestVisualizer, FLAME_TEST_CATALOG } from '../visualizations/FlameTestVisualizer';
import { ChemicalEquilibriumVisualizer } from '../visualizations/ChemicalEquilibriumVisualizer';
import { GalvanicCellVisualizer } from '../visualizations/GalvanicCellVisualizer';
import { TitrationCurveVisualizer, TITRATION_SCENARIO_PRESETS } from '../visualizations/TitrationCurveVisualizer';
import { IndustrialSynthesisVisualizer } from '../visualizations/IndustrialSynthesisVisualizer';
import { CoordinationComplexVisualizer } from '../visualizations/CoordinationComplexVisualizer';
import { VseprVisualizer } from '../visualizations/VseprVisualizer';
import { VSEPR_BENCHMARK_PRESETS } from '../../domain/vseprEngine';
import { SolubilityPrecipitationVisualizer } from '../visualizations/SolubilityPrecipitationVisualizer';
import { CURRICULUM_SPARINGLY_SOLUBLE_SALTS } from '../../domain/solubilityEngine';
import { ElectrolysisVisualizer } from '../visualizations/ElectrolysisVisualizer';
import { ELECTROLYSIS_SCENARIOS, ElectrolysisScenario } from '../../domain/electrolysisEngine';
import { OrganicMechanismsVisualizer } from '../visualizations/OrganicMechanismsVisualizer';
import { CURRICULUM_GEOMETRIC_ISOMERS, CURRICULUM_ORGANIC_TESTS } from '../../domain/organicMechanismsEngine';
import { PolymerVisualizer } from '../visualizations/PolymerVisualizer';
import { CURRICULUM_POLYMERS, PolymerDefinition } from '../../domain/polymerEngine';
import { NuclearDecayVisualizer } from '../visualizations/NuclearDecayVisualizer';
import { CURRICULUM_RADIOISOTOPES, RadioisotopeDef } from '../../domain/nuclearEngine';
import { GreenChemistryVisualizer } from '../visualizations/GreenChemistryVisualizer';
import { getMatchingGreenChemistryConcept } from '../../domain/greenChemistryEngine';
import { CrystallographyVisualizer } from '../visualizations/CrystallographyVisualizer';
import { getMatchingCrystalPreset, UnitCellPresetDef } from '../../domain/crystallographyEngine';
import { ColloidSurfaceVisualizer } from '../visualizations/ColloidSurfaceVisualizer';
import { getMatchingColloidSurfaceConcept } from '../../domain/colloidSurfaceEngine';
import { SpectrophotometryVisualizer } from '../visualizations/SpectrophotometryVisualizer';
import { getMatchingSpectrophotometryConcept, SpectroStandard } from '../../domain/spectrophotometryEngine';
import { MassSpectrometryVisualizer } from '../visualizations/MassSpectrometryVisualizer';
import { getMatchingMassSpecConcept, MassSpecCompound } from '../../domain/massSpectrometryEngine';
import { InfraredSpectroscopyVisualizer } from '../visualizations/InfraredSpectroscopyVisualizer';
import { getMatchingIRConcept, IRCompound } from '../../domain/infraredSpectroscopyEngine';
import { NmrSpectroscopyVisualizer } from '../visualizations/NmrSpectroscopyVisualizer';
import { getMatchingNMRConcept, NMRCompound } from '../../domain/nmrSpectroscopyEngine';
import { ExtractionPartitionVisualizer } from '../visualizations/ExtractionPartitionVisualizer';
import { getMatchingExtractionSolute, ExtractedSolute } from '../../domain/extractionPartitionEngine';
import { ChromatographyVisualizer } from '../visualizations/ChromatographyVisualizer';
import { getMatchingChromatographyMixture, ChromatographyMixture } from '../../domain/chromatographyEngine';
import { RecrystallizationVisualizer } from '../visualizations/RecrystallizationVisualizer';
import { getMatchingRecrystallizationSubstance, RecrystallizationSubstance } from '../../domain/recrystallizationEngine';
import { FunctionalGroupReactionsVisualizer } from '../visualizations/FunctionalGroupReactionsVisualizer';
import { getMatchingFunctionalGroupSubstance, OrganicSubstance as FunctionalGroupSubstance } from '../../domain/functionalGroupReactionsEngine';
import { GasLawsKineticVisualizer } from '../visualizations/GasLawsKineticVisualizer';
import { getMatchingGasSpecies, GasSpecies } from '../../domain/gasLawsKineticEngine';
import { OsmosisColligativeVisualizer } from '../visualizations/OsmosisColligativeVisualizer';
import { getMatchingOsmosisSolute, ColligativeSolute } from '../../domain/osmosisColligativeEngine';
import { NuclearShellVisualizer } from '../visualizations/NuclearShellVisualizer';
import { getMatchingNuclearIsotope, NuclearIsotope } from '../../domain/nuclearShellEngine';
import { CrystalFieldTheoryVisualizer } from '../visualizations/CrystalFieldTheoryVisualizer';
import { getMatchingCoordinationCard } from '../../domain/crystalFieldTheoryEngine';
import { EnzymeKineticsVisualizer } from '../visualizations/EnzymeKineticsVisualizer';
import { getMatchingEnzymeSpec, EnzymeBenchmarkSpec } from '../../domain/enzymeKineticsEngine';
import { QuantumHallVisualizer } from '../visualizations/QuantumHallVisualizer';
import { getMatchingQuantumHallCard, TwoDeeMaterialPreset } from '../../domain/quantumHallEngine';
import { OzonePhotochemistryVisualizer } from '../visualizations/OzonePhotochemistryVisualizer';
import { getMatchingAtmosphericSpecies } from '../../domain/ozonePhotochemistryEngine';
import { SuperconductivityVisualizer } from '../visualizations/SuperconductivityVisualizer';
import { getMatchingSuperconductorCard, SuperconductorSpec } from '../../domain/superconductivityEngine';
import { FuelCellVisualizer } from '../visualizations/FuelCellVisualizer';
import { getMatchingFuelCellCard, FuelCellSpec } from '../../domain/fuelCellEngine';
import { BatteryIntercalationVisualizer } from '../visualizations/BatteryIntercalationVisualizer';
import { getMatchingBatteryCard, BatteryChemistrySpec } from '../../domain/batteryIntercalationEngine';
import { PcrElectrophoresisVisualizer } from '../visualizations/PcrElectrophoresisVisualizer';
import { getMatchingPcrCard, PcrAmpliconSpec } from '../../domain/pcrElectrophoresisEngine';
import { CrisprCas9Visualizer } from '../visualizations/CrisprCas9Visualizer';
import { getMatchingCrisprCard, CrisprTargetSpec } from '../../domain/crisprCas9Engine';
import { ThermalAnalysisVisualizer } from '../visualizations/ThermalAnalysisVisualizer';
import { getMatchingThermalAnalysisCard, ThermalSampleSpec } from '../../domain/thermalAnalysisEngine';
import { ElectronMicroscopyVisualizer } from '../visualizations/ElectronMicroscopyVisualizer';
import { getMatchingMicroscopyCard, NanomaterialSpecimen } from '../../domain/electronMicroscopyEngine';
import { XpsSpectroscopyVisualizer } from '../visualizations/XpsSpectroscopyVisualizer';
import { getMatchingXpsCard, XpsSampleProfile } from '../../domain/xpsSpectroscopyEngine';
import { AfmCantileverVisualizer } from '../visualizations/AfmCantileverVisualizer';
import { getMatchingAfmCard, AfmSampleProfile } from '../../domain/afmCantileverEngine';
import { SurfacePlasmonVisualizer } from '../visualizations/SurfacePlasmonVisualizer';
import { getMatchingSprCard, SprInteractionPair } from '../../domain/surfacePlasmonEngine';
import { DynamicLightScatteringVisualizer } from '../visualizations/DynamicLightScatteringVisualizer';
import { getMatchingDlsCard, DlsSampleStandard } from '../../domain/dynamicLightScatteringEngine';
import { CircularDichroismVisualizer } from '../visualizations/CircularDichroismVisualizer';
import { getMatchingCdCard, CdProteinStandard } from '../../domain/circularDichroismEngine';
import { ThermalShiftVisualizer } from '../visualizations/ThermalShiftVisualizer';
import { getMatchingDsfCard, DsfAssayStandard } from '../../domain/thermalShiftEngine';
import { SaxsScatteringVisualizer } from '../visualizations/SaxsScatteringVisualizer';
import { getMatchingSaxsCard, SaxsProteinStandard } from '../../domain/saxsScatteringEngine';
import { CryoEmVisualizer } from '../visualizations/CryoEmVisualizer';
import { getMatchingCryoEmCard, CryoEmSpecimenStandard } from '../../domain/cryoEmEngine';
import { SolidStateNmrVisualizer } from '../visualizations/SolidStateNmrVisualizer';
import { getMatchingSolidStateNmrCard, SolidStateNmrSpecimen } from '../../domain/solidStateNmrEngine';
import { StoppedFlowVisualizer } from '../visualizations/StoppedFlowVisualizer';
import { getMatchingStoppedFlowCard, StoppedFlowSpecimenStandard } from '../../domain/stoppedFlowEngine';
import { DualPolarizationVisualizer } from '../visualizations/DualPolarizationVisualizer';
import { getMatchingDpiCard, DpiSpecimenStandard } from '../../domain/dualPolarizationEngine';
import { QcmdVisualizer } from '../visualizations/QcmdVisualizer';
import { getMatchingQcmdCard, QcmdSpecimenStandard } from '../../domain/qcmdEngine';
import { OpticalTweezersVisualizer } from '../visualizations/OpticalTweezersVisualizer';
import { getMatchingOpticalTweezersCard, OpticalTweezersSpecimenStandard } from '../../domain/opticalTweezersEngine';
import { MagneticTweezersVisualizer } from '../visualizations/MagneticTweezersVisualizer';
import { getMatchingMagneticTweezersCard, MagneticTweezersSpecimenStandard } from '../../domain/magneticTweezersEngine';
import { CapillaryElectrophoresisVisualizer } from '../visualizations/CapillaryElectrophoresisVisualizer';
import { getMatchingCapillaryElectrophoresisCard, CapillaryElectrophoresisSpecimenStandard } from '../../domain/capillaryElectrophoresisEngine';
import { PetRadiochemistryVisualizer } from '../visualizations/PetRadiochemistryVisualizer';
import { getMatchingPetCard, PetSpecimenStandard } from '../../domain/petRadiochemistryEngine';
import { StmVisualizer } from '../visualizations/StmVisualizer';
import { getMatchingStmCard, StmSpecimenStandard } from '../../domain/stmEngine';
import { FemtosecondPumpProbeVisualizer } from '../visualizations/FemtosecondPumpProbeVisualizer';
import { getMatchingPumpProbeCard, PumpProbeStandard } from '../../domain/femtosecondPumpProbeEngine';
import { SimsVisualizer } from '../visualizations/SimsVisualizer';
import { getMatchingSimsCard, SimsStandard } from '../../domain/simsEngine';
import { MossbauerVisualizer } from '../visualizations/MossbauerVisualizer';
import { getMatchingMossbauerCard, MossbauerStandard } from '../../domain/mossbauerEngine';
import { XafsVisualizer } from '../visualizations/XafsVisualizer';
import { getMatchingXafsCard, XafsStandard } from '../../domain/xafsEngine';
import { DmaVisualizer } from '../visualizations/DmaVisualizer';
import { getMatchingDmaCard, DmaStandard } from '../../domain/dmaEngine';
import { ItcVisualizer } from '../visualizations/ItcVisualizer';
import { getMatchingItcCard, ItcStandard } from '../../domain/itcEngine';
import { EsiMassSpecVisualizer } from '../visualizations/EsiMassSpecVisualizer';
import { getMatchingEsiCard, EsiStandard } from '../../domain/esiMassSpecEngine';
import { SfcVisualizer } from '../visualizations/SfcVisualizer';
import { getMatchingSfcCard, SfcStandard } from '../../domain/sfcEngine';
import { NtaVisualizer } from '../visualizations/NtaVisualizer';
import { getMatchingNtaCard, NtaStandard } from '../../domain/ntaEngine';
import { MstVisualizer } from '../visualizations/MstVisualizer';
import { getMatchingMstCard, MstStandard } from '../../domain/mstEngine';
import { BliVisualizer } from '../visualizations/BliVisualizer';
import { getMatchingBliCard, BliStandard } from '../../domain/bliEngine';
import { RmmVisualizer } from '../visualizations/RmmVisualizer';
import { getMatchingRmmCard, RmmStandard } from '../../domain/rmmEngine';
import { DscVisualizer } from '../visualizations/DscVisualizer';
import { getMatchingDscCard, DscStandard } from '../../domain/dscEngine';
import { PpcVisualizer } from '../visualizations/PpcVisualizer';
import { getMatchingPpcCard, PpcStandard } from '../../domain/ppcEngine';
import { SecMalsVisualizer } from '../visualizations/SecMalsVisualizer';
import { getMatchingSecMalsCard, SecMalsStandard } from '../../domain/secMalsEngine';
import { AucVisualizer } from '../visualizations/AucVisualizer';
import { getMatchingAucCard, AucStandard } from '../../domain/aucEngine';
import { Af4Visualizer } from '../visualizations/Af4Visualizer';
import { getMatchingAf4Card, Af4Standard } from '../../domain/af4Engine';
import { TdaVisualizer } from '../visualizations/TdaVisualizer';
import { getMatchingTdaCard, TdaStandard } from '../../domain/tdaEngine';
import { FcsVisualizer } from '../visualizations/FcsVisualizer';
import { getMatchingFcsCard, FcsStandard } from '../../domain/fcsEngine';
import { FlimVisualizer } from '../visualizations/FlimVisualizer';
import { getMatchingFlimCard, FlimStandard } from '../../domain/flimEngine';
import { SmFretVisualizer } from '../visualizations/SmFretVisualizer';
import { getMatchingSmFretCard, SmFretStandard } from '../../domain/smFretEngine';
import { CURRICULUM_EQUILIBRIUM_REACTIONS, EquilibriumReactionDef } from '../../domain/equilibriumEngine';
import { getCoupleByElementSymbol, GALVANIC_CELL_PRESETS } from '../../domain/electrochemistryEngine';
import { INDUSTRIAL_PROCESSES, IndustrialProcessDef } from '../../domain/industrialReactorEngine';
import { CURRICULUM_COORDINATION_COMPLEXES, CoordinationComplexDef } from '../../domain/coordinationComplexEngine';
import { getRelatedCards, RelatedCardLink } from '../../domain/relatedCardsService';
import { computeElectronStructure, getShellElectrons } from '../../domain/orbitalEngine';
import { parseFormulaAtoms } from '../../domain/equationBalancer';
import { ALL_ELEMENTS } from '../../data/elementsData';
import { sound } from '../../audio/soundEngine';
import {
  X,
  Atom,
  Scan,
  Sparkles,
  BookOpen,
  Layers,
  Shield,
  Sword,
  Zap,
  CheckCircle2,
  Plus,
  Hammer,
  Gem,
  Activity,
  Compass,
  Radiation,
  Sun,
  Flame,
  Scale,
  Leaf,
  Battery,
  FlaskConical,
  Droplets,
  ArrowRight,
  Info,
  Network,
  Factory,
  Sprout,
  Eye,
  Waves,
  Radio,
  Filter,
  Sliders,
  Pipette,
  Wind,
  Dna,
  Scissors,
  Microscope,
  MoveVertical,
  Snowflake,
  Timer,
  Gauge,
  Crosshair,
  Magnet,
  RotateCcw,
  GitCommit,
  Focus,
  Clock
} from 'lucide-react';

export interface CardDetailModalProps {
  card: PlayableCardDef | null;
  isOpen: boolean;
  onClose: () => void;
  cardCollection?: Record<string, number>;
  onSelectCard?: (card: PlayableCardDef) => void;
  onAddCardToDeck?: (card: PlayableCardDef) => void;
  onOpenCrafting?: (card: PlayableCardDef) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  cardCollection = {},
  onSelectCard,
  onAddCardToDeck,
  onOpenCrafting
}) => {
  const [activeTab, setActiveTab] = useState<'DOSSIER' | 'QUANTUM' | 'REACTIONS'>('DOSSIER');
  const [showBondingModal, setShowBondingModal] = useState<boolean>(false);
  const [showEquilibriumModal, setShowEquilibriumModal] = useState<boolean>(false);
  const [showGalvanicModal, setShowGalvanicModal] = useState<boolean>(false);
  const [showTitrationModal, setShowTitrationModal] = useState<boolean>(false);
  const [showIndustrialModal, setShowIndustrialModal] = useState<boolean>(false);
  const [showComplexModal, setShowComplexModal] = useState<boolean>(false);
  const [showVseprModal, setShowVseprModal] = useState<boolean>(false);
  const [showSolubilityModal, setShowSolubilityModal] = useState<boolean>(false);
  const [showElectrolysisModal, setShowElectrolysisModal] = useState<boolean>(false);
  const [showOrganicModal, setShowOrganicModal] = useState<boolean>(false);
  const [showPolymerModal, setShowPolymerModal] = useState<boolean>(false);
  const [showNuclearModal, setShowNuclearModal] = useState<boolean>(false);
  const [showGreenModal, setShowGreenModal] = useState<boolean>(false);
  const [showCrystalModal, setShowCrystalModal] = useState<boolean>(false);
  const [showColloidModal, setShowColloidModal] = useState<boolean>(false);
  const [showSpectroModal, setShowSpectroModal] = useState<boolean>(false);
  const [showMassSpecModal, setShowMassSpecModal] = useState<boolean>(false);
  const [showIRModal, setShowIRModal] = useState<boolean>(false);
  const [showNMRModal, setShowNMRModal] = useState<boolean>(false);
  const [showExtractionModal, setShowExtractionModal] = useState<boolean>(false);
  const [showChromatographyModal, setShowChromatographyModal] = useState<boolean>(false);
  const [showRecrystallizationModal, setShowRecrystallizationModal] = useState<boolean>(false);
  const [showFunctionalGroupModal, setShowFunctionalGroupModal] = useState<boolean>(false);
  const [showGasLawsModal, setShowGasLawsModal] = useState<boolean>(false);
  const [showOsmosisModal, setShowOsmosisModal] = useState<boolean>(false);
  const [showNuclearShellModal, setShowNuclearShellModal] = useState<boolean>(false);
  const [showCrystalFieldModal, setShowCrystalFieldModal] = useState<boolean>(false);
  const [showEnzymeKineticsModal, setShowEnzymeKineticsModal] = useState<boolean>(false);
  const [showQuantumHallModal, setShowQuantumHallModal] = useState<boolean>(false);
  const [showOzoneModal, setShowOzoneModal] = useState<boolean>(false);
  const [showSuperconductivityModal, setShowSuperconductivityModal] = useState<boolean>(false);
  const [showFuelCellModal, setShowFuelCellModal] = useState<boolean>(false);
  const [showBatteryModal, setShowBatteryModal] = useState<boolean>(false);
  const [showPcrModal, setShowPcrModal] = useState<boolean>(false);
  const [showCrisprModal, setShowCrisprModal] = useState<boolean>(false);
  const [showThermalAnalysisModal, setShowThermalAnalysisModal] = useState<boolean>(false);
  const [showMicroscopyModal, setShowMicroscopyModal] = useState<boolean>(false);
  const [showXpsModal, setShowXpsModal] = useState<boolean>(false);
  const [showAfmModal, setShowAfmModal] = useState<boolean>(false);
  const [showSprModal, setShowSprModal] = useState<boolean>(false);
  const [showDlsModal, setShowDlsModal] = useState<boolean>(false);
  const [showCdModal, setShowCdModal] = useState<boolean>(false);
  const [showDsfModal, setShowDsfModal] = useState<boolean>(false);
  const [showSaxsModal, setShowSaxsModal] = useState<boolean>(false);
  const [showCryoEmModal, setShowCryoEmModal] = useState<boolean>(false);
  const [showSsNmrModal, setShowSsNmrModal] = useState<boolean>(false);
  const [showStoppedFlowModal, setShowStoppedFlowModal] = useState<boolean>(false);
  const [showDpiModal, setShowDpiModal] = useState<boolean>(false);
  const [showQcmdModal, setShowQcmdModal] = useState<boolean>(false);
  const [showOpticalTweezersModal, setShowOpticalTweezersModal] = useState<boolean>(false);
  const [showMagneticTweezersModal, setShowMagneticTweezersModal] = useState<boolean>(false);
  const [showCapillaryElectrophoresisModal, setShowCapillaryElectrophoresisModal] = useState<boolean>(false);
  const [showPetModal, setShowPetModal] = useState<boolean>(false);
  const [showStmModal, setShowStmModal] = useState<boolean>(false);
  const [showPumpProbeModal, setShowPumpProbeModal] = useState<boolean>(false);
  const [showSimsModal, setShowSimsModal] = useState<boolean>(false);
  const [showMossbauerModal, setShowMossbauerModal] = useState<boolean>(false);
  const [showXafsModal, setShowXafsModal] = useState<boolean>(false);
  const [showDmaModal, setShowDmaModal] = useState<boolean>(false);
  const [showItcModal, setShowItcModal] = useState<boolean>(false);
  const [showEsiModal, setShowEsiModal] = useState<boolean>(false);
  const [showSfcModal, setShowSfcModal] = useState<boolean>(false);
  const [showNtaModal, setShowNtaModal] = useState<boolean>(false);
  const [showMstModal, setShowMstModal] = useState<boolean>(false);
  const [showBliModal, setShowBliModal] = useState<boolean>(false);
  const [showRmmModal, setShowRmmModal] = useState<boolean>(false);
  const [showDscModal, setShowDscModal] = useState<boolean>(false);
  const [showPpcModal, setShowPpcModal] = useState<boolean>(false);
  const [showSecMalsModal, setShowSecMalsModal] = useState<boolean>(false);
  const [showAucModal, setShowAucModal] = useState<boolean>(false);
  const [showAf4Modal, setShowAf4Modal] = useState<boolean>(false);
  const [showTdaModal, setShowTdaModal] = useState<boolean>(false);
  const [showFcsModal, setShowFcsModal] = useState<boolean>(false);
  const [showFlimModal, setShowFlimModal] = useState<boolean>(false);
  const [showSmFretModal, setShowSmFretModal] = useState<boolean>(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute related cards dynamically from chemistry and tactical rules
  const relatedLinks: RelatedCardLink[] = useMemo(() => {
    if (!card) return [];
    return getRelatedCards(card, cardCollection);
  }, [card, cardCollection]);

  // Compute electron structure if card has atomic number
  const electronStructure = useMemo(() => {
    if (card?.atomicNumber && card.atomicNumber > 0) {
      try {
        return computeElectronStructure(card.atomicNumber, card.chemicalFormula || 'X');
      } catch {
        return null;
      }
    }
    return null;
  }, [card?.atomicNumber, card?.chemicalFormula]);

  const shellElectrons = useMemo(() => {
    if (card?.atomicNumber && card.atomicNumber > 0) {
      try {
        return getShellElectrons(card.atomicNumber, card.chemicalFormula);
      } catch {
        return [];
      }
    }
    return [];
  }, [card?.atomicNumber, card?.chemicalFormula]);

  // Detect flame test candidate for elements or compounds containing flame-active cations
  const flameCandidate = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim();
    if (!formula) return null;

    // 1. Direct match on FLAME_TEST_CATALOG (e.g. Na, K, Ca, Ba, Cu, etc.)
    if (FLAME_TEST_CATALOG[formula]) {
      const elem = ALL_ELEMENTS.find(e => e.symbol === formula);
      return {
        symbol: formula,
        nameVi: elem?.name_vi || formula,
        isCompound: false
      };
    }

    // 2. Element card via atomicNumber
    if (card.atomicNumber && card.atomicNumber > 0) {
      const elem = ALL_ELEMENTS.find(e => e.z === card.atomicNumber);
      if (elem && FLAME_TEST_CATALOG[elem.symbol]) {
        return {
          symbol: elem.symbol,
          nameVi: elem.name_vi,
          isCompound: false
        };
      }
    }

    // 3. Compound parsing: check if any constituent element is in FLAME_TEST_CATALOG
    try {
      const atomCounts = parseFormulaAtoms(formula);
      const flamePriority = ['Na', 'K', 'Li', 'Sr', 'Ca', 'Ba', 'Cu', 'B', 'In', 'Tl', 'Mg', 'Fe', 'Rb', 'Cs', 'Pb', 'Zn'];
      for (const sym of flamePriority) {
        if (atomCounts[sym] && FLAME_TEST_CATALOG[sym]) {
          const elem = ALL_ELEMENTS.find(e => e.symbol === sym);
          return {
            symbol: sym,
            nameVi: elem?.name_vi || sym,
            isCompound: true
          };
        }
      }
    } catch {
      // non-formula strings ignored safely
    }

    return null;
  }, [card]);

  // Detect if card is involved in any GDPT 2018 chemical equilibrium reaction
  const matchingEquilibrium = useMemo<EquilibriumReactionDef | null>(() => {
    if (!card) return null;
    const formula = card.chemicalFormula;
    if (!formula) return null;

    return (
      CURRICULUM_EQUILIBRIUM_REACTIONS.find(
        eq =>
          eq.reactants.some(r => r.formula === formula) ||
          eq.products.some(p => p.formula === formula) ||
          (card.id && eq.id.toLowerCase().includes(card.id.toLowerCase()))
      ) || null
    );
  }, [card]);

  // Detect if card is involved in any Galvanic cell redox couple (e.g. Zn, Cu, Ag, Fe, Mg, Al, Pb)
  const matchingGalvanic = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim();
    if (!formula) return null;

    const symList = [formula];
    if (card.atomicNumber && card.atomicNumber > 0) {
      const elem = ALL_ELEMENTS.find(e => e.z === card.atomicNumber);
      if (elem) symList.push(elem.symbol);
    }
    try {
      const atoms = parseFormulaAtoms(formula);
      symList.push(...Object.keys(atoms));
    } catch {}

    for (const sym of symList) {
      const couple = getCoupleByElementSymbol(sym);
      if (couple) {
        const preset =
          GALVANIC_CELL_PRESETS.find(
            p => p.anodeCoupleId === couple.id || p.cathodeCoupleId === couple.id
          ) || GALVANIC_CELL_PRESETS[0];
        return {
          symbol: sym,
          couple,
          preset
        };
      }
    }
    return null;
  }, [card]);

  // Detect if card is involved in any Acid-Base Titration scenario (HCl, CH3COOH, NaOH, NH3, HNO3, KOH)
  const matchingTitration = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'HCL' || formula === 'NAOH' || name.includes('CLOHIDRIC') || name.includes('NATRI HIDROXIT')) {
      return TITRATION_SCENARIO_PRESETS.find(s => s.id === 'hcl_naoh') || TITRATION_SCENARIO_PRESETS[0];
    }
    if (formula === 'CH3COOH' || formula === 'C2H4O2' || name.includes('AXETIC') || name.includes('GIẤM')) {
      return TITRATION_SCENARIO_PRESETS.find(s => s.id === 'ch3cooh_naoh') || TITRATION_SCENARIO_PRESETS[1];
    }
    if (formula === 'NH3' || name.includes('AMONIAC') || name.includes('AMMONIA')) {
      return TITRATION_SCENARIO_PRESETS.find(s => s.id === 'nh3_hcl') || TITRATION_SCENARIO_PRESETS[2];
    }
    if (formula === 'HNO3' || formula === 'KOH' || name.includes('NITRIC') || name.includes('KALI HIDROXIT')) {
      return TITRATION_SCENARIO_PRESETS.find(s => s.id === 'hno3_koh') || TITRATION_SCENARIO_PRESETS[3];
    }
    if (card.attribute === 'ACID_DARK') {
      return TITRATION_SCENARIO_PRESETS[0];
    }
    return null;
  }, [card]);

  // Detect if card is involved in any Industrial Gas Synthesis process (Haber-Bosch, Contact, Syngas, Ostwald)
  const matchingIndustrial = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (
      formula === 'N2' ||
      formula === 'H2' ||
      formula === 'NH3' ||
      name.includes('AMONIAC') ||
      name.includes('AMMONIA') ||
      name.includes('NITƠ') ||
      name.includes('HIĐRO')
    ) {
      return INDUSTRIAL_PROCESSES.find(p => p.id === 'haber_bosch') || INDUSTRIAL_PROCESSES[0];
    }
    if (
      formula === 'SO2' ||
      formula === 'SO3' ||
      formula === 'H2SO4' ||
      name.includes('SUNFURIC') ||
      name.includes('SUNFUA') ||
      name.includes('LƯU HUỲNH')
    ) {
      return INDUSTRIAL_PROCESSES.find(p => p.id === 'contact_so3') || INDUSTRIAL_PROCESSES[1];
    }
    if (
      formula === 'CH4' ||
      formula === 'CO' ||
      name.includes('METAN') ||
      name.includes('SYNGAS') ||
      name.includes('KHÍ TỔNG HỢP')
    ) {
      return INDUSTRIAL_PROCESSES.find(p => p.id === 'steam_methane_reforming') || INDUSTRIAL_PROCESSES[2];
    }
    if (
      formula === 'NO' ||
      formula === 'HNO3' ||
      name.includes('NITRIC') ||
      name.includes('OSTWALD')
    ) {
      return INDUSTRIAL_PROCESSES.find(p => p.id === 'ostwald_oxidation') || INDUSTRIAL_PROCESSES[3];
    }
    return null;
  }, [card]);

  // Detect if card is involved in any Coordination Complex scenario (Cu, Fe, Co, Ag, Ni, Pt, NH3, SCN)
  const matchingComplex = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'CU' || formula === 'CUSO4' || name.includes('ĐỒNG') || name.includes('COPPER')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_cu_nh3') || CURRICULUM_COORDINATION_COMPLEXES[0];
    }
    if (formula === 'FE' || formula === 'FECL3' || name.includes('SẮT') || name.includes('IRON') || name.includes('THIOCYANATE')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_fe_scn') || CURRICULUM_COORDINATION_COMPLEXES[1];
    }
    if (formula === 'CO' || formula === 'COCL2' || name.includes('COBALT') || name.includes('COBAN')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_co_cl') || CURRICULUM_COORDINATION_COMPLEXES[2];
    }
    if (formula === 'AG' || formula === 'AGNO3' || name.includes('BẠC') || name.includes('SILVER') || name.includes('TOLLENS')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_ag_nh3') || CURRICULUM_COORDINATION_COMPLEXES[3];
    }
    if (formula === 'NI' || formula === 'NISO4' || name.includes('NIKEN') || name.includes('NICKEL')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_ni_nh3') || CURRICULUM_COORDINATION_COMPLEXES[4];
    }
    if (formula === 'PT' || name.includes('BẠCH KIM') || name.includes('PLATIN') || name.includes('CISPLATIN')) {
      return CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === 'complex_pt_cisplatin') || CURRICULUM_COORDINATION_COMPLEXES[5];
    }
    return null;
  }, [card]);

  // Detect if card is involved in any VSEPR molecular geometry scenario (H2O, NH3, CH4, BF3, SO2, CO2, PCl5, SF4, ClF3, SF6, XeF4)
  const matchingVsepr = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'H2O' || name.includes('NƯỚC') || name.includes('WATER')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_h2o') || VSEPR_BENCHMARK_PRESETS[0];
    }
    if (formula === 'NH3' || name.includes('AMMONIA')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_nh3') || VSEPR_BENCHMARK_PRESETS[1];
    }
    if (formula === 'CH4' || name.includes('METHANE')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_ch4') || VSEPR_BENCHMARK_PRESETS[2];
    }
    if (formula === 'BF3' || name.includes('BORON TRIFLUORIDE')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_bf3') || VSEPR_BENCHMARK_PRESETS[3];
    }
    if (formula === 'SO2' || name.includes('SULFUR DIOXIDE')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_so2') || VSEPR_BENCHMARK_PRESETS[4];
    }
    if (formula === 'CO2' || name.includes('CARBON DIOXIDE')) {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_co2') || VSEPR_BENCHMARK_PRESETS[5];
    }
    if (formula === 'PCL5') {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_pcl5') || VSEPR_BENCHMARK_PRESETS[6];
    }
    if (formula === 'SF4') {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_sf4') || VSEPR_BENCHMARK_PRESETS[7];
    }
    if (formula === 'CLF3') {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_clf3') || VSEPR_BENCHMARK_PRESETS[8];
    }
    if (formula === 'SF6') {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_sf6') || VSEPR_BENCHMARK_PRESETS[9];
    }
    if (formula === 'XEF4') {
      return VSEPR_BENCHMARK_PRESETS.find(p => p.id === 'vsepr_xef4') || VSEPR_BENCHMARK_PRESETS[10];
    }
    return null;
  }, [card]);

  // Detect if card is involved in any sparingly soluble precipitation equilibrium (AgCl, AgBr, AgI, BaSO4, CaCO3, Al(OH)3, Zn(OH)2, Fe(OH)3, PbI2)
  const matchingSalt = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'AGCL' || (formula === 'AG' && name.includes('CLORUA')) || name.includes('BẠC CLORUA')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_agcl') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[0];
    }
    if (formula === 'AGBR' || name.includes('BẠC BROMUA')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_agbr') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[1];
    }
    if (formula === 'AGI' || name.includes('BẠC IODUA')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_agi') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[2];
    }
    if (formula === 'BASO4' || formula === 'BA' || name.includes('BARI') || name.includes('BARIUM')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_baso4') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[3];
    }
    if (formula === 'CACO3' || formula === 'CA' || name.includes('ĐÁ VÔI') || name.includes('CALCIUM CARBONATE')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_caco3') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[4];
    }
    if (formula === 'AL(OH)3' || formula === 'AL' || name.includes('NHÔM') || name.includes('ALUMINUM')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_al_oh3') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[5];
    }
    if (formula === 'ZN(OH)2' || formula === 'ZN' || name.includes('KẼM') || name.includes('ZINC')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_zn_oh2') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[6];
    }
    if (formula === 'FE(OH)3' || (formula === 'FE' && name.includes('HYDROXIT')) || name.includes('SẮT(III) HYDROXIT')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_fe_oh3') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[7];
    }
    if (formula === 'PBI2' || formula === 'PB' || name.includes('CHÌ') || name.includes('LEAD')) {
      return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => s.id === 'salt_pbi2') || CURRICULUM_SPARINGLY_SOLUBLE_SALTS[8];
    }
    return null;
  }, [card]);

  // Detect if card is involved in any Electrolysis scenario (NaCl, Na, Cl2, Al, Al2O3, Cu, CuSO4, H2O, H2, O2, NaOH)
  const matchingElectrolysis = useMemo<ElectrolysisScenario | null>(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'NACL' || name.includes('NATRI CHLORIDE') || name.includes('MUỐI ĂN')) {
      return ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
    }
    if (formula === 'NA' || name.includes('NATRI') || name.includes('SODIUM')) {
      return ELECTROLYSIS_SCENARIOS.molten_nacl;
    }
    if (formula === 'AL2O3' || formula === 'AL' || name.includes('NHÔM') || name.includes('ALUMINIUM') || name.includes('BAUXIT')) {
      return ELECTROLYSIS_SCENARIOS.hall_heroult_al2o3;
    }
    if (formula === 'CU' || formula === 'CUSO4' || name.includes('ĐỒNG') || name.includes('COPPER')) {
      return ELECTROLYSIS_SCENARIOS.copper_electroplating;
    }
    if (formula === 'H2O' || formula === 'H2' || formula === 'O2' || name.includes('NƯỚC') || name.includes('HIĐRO') || name.includes('OXI')) {
      return ELECTROLYSIS_SCENARIOS.water_splitting_acidic;
    }
    if (formula === 'NAOH' || name.includes('XÚT') || name.includes('SODIUM HYDROXIDE')) {
      return ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
    }
    if (formula === 'CL2' || formula === 'CL' || name.includes('CLO') || name.includes('CHLORINE')) {
      return ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
    }
    return null;
  }, [card]);

  // Detect if card is involved in any Organic Chemistry mechanism or diagnostic test
  const matchingOrganic = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (
      formula === 'C4H8' ||
      formula === 'C3H6' ||
      formula === 'C2H4' ||
      name.includes('BUTEN') ||
      name.includes('PROPEN') ||
      name.includes('ETILEN') ||
      name.includes('ALKENE')
    ) {
      return {
        id: 'organic_alkene',
        titleVI: 'Anken, Đồng Phân Hình Học (Cis/Trans) & Quy Tắc Maccopnhicop',
        mode: 'CIS_TRANS' as const,
        descriptionVI: 'Khảo sát cấu trúc liên kết đôi C=C, điều kiện đồng phân hình học và phản ứng cộng electrophile.'
      };
    }

    if (
      formula === 'C3H6O3' ||
      formula === 'C3H7NO2' ||
      name.includes('LACTIC') ||
      name.includes('ALANIN') ||
      name.includes('AMINO AXIT') ||
      name.includes('CHIRAL')
    ) {
      return {
        id: 'organic_chiral',
        titleVI: 'Đồng Phân Quang Học & Carbon Bất Đối Xứng (C*)',
        mode: 'CHIRAL' as const,
        descriptionVI: 'Khảo sát tâm chiral C* gắn với 4 nhóm thế phân biệt, đối quang D/L và hoạt tính sinh học dược phẩm.'
      };
    }

    if (
      formula === 'C6H12O6' ||
      formula === 'C3H8O3' ||
      formula === 'C2H5OH' ||
      formula === 'CH3CHO' ||
      formula === 'CH3COCH3' ||
      name.includes('GLUCOZ') ||
      name.includes('GLIXEROL') ||
      name.includes('ANĐEHIT') ||
      name.includes('XETON') ||
      name.includes('ALCOHOL')
    ) {
      return {
        id: 'organic_diagnostic',
        titleVI: 'Thuốc Thử Đặc Trưng Hóa Hữu Cơ (Tollens, Cu(OH)₂, Iodoform)',
        mode: 'DIAGNOSTIC_TESTS' as const,
        descriptionVI: 'Mô phỏng ống nghiệm tráng bạc gương kim loại, phức xanh thẫm polyol và kết tủa iodoform vàng.'
      };
    }

    return null;
  }, [card]);

  // Detect if card is involved in Polymerization, Macromolecules & Materials (Hóa 12)
  const matchingPolymer: PolymerDefinition | null = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'C2H4' || name.includes('ETILEN') || name.includes('POLYETHYLENE') || name.includes('PE') || name.includes('POLIETILEN')) {
      return CURRICULUM_POLYMERS.polyethylene;
    }
    if (formula === 'C2H3CL' || name.includes('VINYL CLORUA') || name.includes('PVC') || name.includes('CHLOROETHENE')) {
      return CURRICULUM_POLYMERS.polyvinyl_chloride;
    }
    if (formula === 'C2F4' || name.includes('TEFLON') || name.includes('PTFE') || name.includes('TETRAFLOETILEN')) {
      return CURRICULUM_POLYMERS.teflon_ptfe;
    }
    if (formula === 'C5H8O2' || name.includes('PLEXIGLAS') || name.includes('PMMA') || name.includes('METACRYLAT') || name.includes('THỦY TINH HỮU CƠ')) {
      return CURRICULUM_POLYMERS.pmma_plexiglas;
    }
    if (name.includes('NILON') || name.includes('NYLON') || name.includes('ADIPIC') || name.includes('HEXAMETHYLENEDIAMINE')) {
      return CURRICULUM_POLYMERS.nylon_66;
    }
    if (name.includes('LAPSAN') || name.includes('TEREPHTHALIC') || name.includes('PET') || name.includes('POLYESTER')) {
      return CURRICULUM_POLYMERS.terylene_lapsan;
    }
    if (name.includes('BUNA') || formula === 'C4H6' || name.includes('BUTA-1,3') || name.includes('BUTADIEN')) {
      return CURRICULUM_POLYMERS.buna_rubber;
    }
    if (name.includes('LƯU HÓA') || name.includes('VULCANIZ') || name.includes('LỐP XE')) {
      return CURRICULUM_POLYMERS.vulcanized_rubber;
    }
    if (formula === 'C3H3N' || name.includes('NITRON') || name.includes('OLON') || name.includes('ACRILONITRIN')) {
      return CURRICULUM_POLYMERS.nitron_olon;
    }
    if (name.includes('BAKELITE') || name.includes('REZIT') || name.includes('PHENOL-FOMANĐEHIT')) {
      return CURRICULUM_POLYMERS.bakelite_rezit;
    }
    return null;
  }, [card]);

  // Detect if card is involved in Nuclear Chemistry & Radioactivity (Hóa 10 & Vật Lý 12)
  const matchingNuclear: RadioisotopeDef | null = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim().toUpperCase();
    const name = card.name?.toUpperCase() || '';
    if (!formula && !name) return null;

    if (formula === 'U' || name.includes('URANIUM') || name.includes('PHÂN HẠCH') || name.includes('FISSION')) {
      return CURRICULUM_RADIOISOTOPES.uranium_238;
    }
    if (name.includes('CACBON-14') || name.includes('CARBON-14') || name.includes('KHẢO CỔ')) {
      return CURRICULUM_RADIOISOTOPES.carbon_14;
    }
    if (formula === 'I' || formula === 'I2' || name.includes('IOT') || name.includes('IODINE') || name.includes('TUYẾN GIÁP')) {
      return CURRICULUM_RADIOISOTOPES.iodine_131;
    }
    if (formula === 'CO' || name.includes('COBALT') || name.includes('COBAN') || name.includes('GAMMA KNIFE')) {
      return CURRICULUM_RADIOISOTOPES.cobalt_60;
    }
    if (formula === 'RA' || name.includes('RADIUM') || name.includes('RADI') || name.includes('CURIE')) {
      return CURRICULUM_RADIOISOTOPES.radium_226;
    }
    if (formula === 'F' || formula === 'F2' || name.includes('FLO') || name.includes('FLUORINE') || name.includes('PET-CT')) {
      return CURRICULUM_RADIOISOTOPES.fluorine_18;
    }
    if (name.includes('TRITI') || name.includes('TRITIUM') || name.includes('NHIỆT HẠCH') || name.includes('ITER')) {
      return CURRICULUM_RADIOISOTOPES.tritium_3h;
    }
    if (formula === 'K' || name.includes('KALI') || name.includes('POTASSIUM')) {
      return CURRICULUM_RADIOISOTOPES.potassium_40;
    }
    if (formula === 'TC' || name.includes('TECNETI') || name.includes('TECHNETIUM') || name.includes('SPECT')) {
      return CURRICULUM_RADIOISOTOPES.technetium_99m;
    }
    if (name.includes('PHÓNG XẠ') || name.includes('HẠT NHÂN') || name.includes('RADIOACTIVE') || name.includes('NUCLEAR')) {
      return CURRICULUM_RADIOISOTOPES.carbon_14;
    }
    return null;
  }, [card]);

  // Detect if card is involved in Green Chemistry, Acid Rain, or Greenhouse Gas concepts
  const matchingGreen = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim() || '';
    const name = card.name || '';
    return getMatchingGreenChemistryConcept(formula) || getMatchingGreenChemistryConcept(name);
  }, [card]);

  // Detect if card corresponds to a Crystallography Unit Cell preset (Cu, Fe, Po, C, NaCl, CsCl, ZnS, CaF2)
  const matchingCrystal: UnitCellPresetDef | null = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim() || '';
    const name = card.name || '';
    return getMatchingCrystalPreset(formula) || getMatchingCrystalPreset(name);
  }, [card]);

  // Detect if card corresponds to a Colloid, Surfactant, or Surface Chemistry concept
  const matchingColloid = useMemo(() => {
    if (!card) return null;
    const formula = card.chemicalFormula?.trim() || '';
    const name = card.name || '';
    return getMatchingColloidSurfaceConcept(formula) || getMatchingColloidSurfaceConcept(name);
  }, [card]);

  // Detect if card corresponds to a Spectrophotometry / Beer-Lambert standard
  const matchingSpectro: SpectroStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSpectrophotometryConcept(card);
  }, [card]);

  // Detect if card corresponds to a Mass Spectrometry / Isotope Cluster compound
  const matchingMassSpec: MassSpecCompound | null = useMemo(() => {
    if (!card) return null;
    return getMatchingMassSpecConcept(card);
  }, [card]);

  // Detect if card corresponds to an Infrared Spectroscopy / Functional Group compound
  const matchingIR: IRCompound | null = useMemo(() => {
    if (!card) return null;
    return getMatchingIRConcept(card);
  }, [card]);

  // Detect if card corresponds to a Nuclear Magnetic Resonance (NMR) compound
  const matchingNMR: NMRCompound | null = useMemo(() => {
    if (!card) return null;
    return getMatchingNMRConcept(card);
  }, [card]);

  // Detect if card corresponds to a Liquid-Liquid Extraction solute
  const matchingExtraction: ExtractedSolute | null = useMemo(() => {
    if (!card) return null;
    return getMatchingExtractionSolute(card);
  }, [card]);

  // Detect if card corresponds to a Thin-Layer / Column Chromatography mixture
  const matchingChromatography: ChromatographyMixture | null = useMemo(() => {
    if (!card) return null;
    return getMatchingChromatographyMixture(card);
  }, [card]);

  // Detect if card corresponds to a Recrystallization substance
  const matchingRecrystallization: RecrystallizationSubstance | null = useMemo(() => {
    if (!card) return null;
    return getMatchingRecrystallizationSubstance(card);
  }, [card]);

  // Detect if card corresponds to an Organic Functional Group substance
  const matchingFunctionalGroup: FunctionalGroupSubstance | null = useMemo(() => {
    if (!card) return null;
    return getMatchingFunctionalGroupSubstance(card);
  }, [card]);

  // Detect if card corresponds to a Gas species
  const matchingGasSpecies: GasSpecies | null = useMemo(() => {
    if (!card) return null;
    return getMatchingGasSpecies(card);
  }, [card]);

  // Detect if card corresponds to a Colligative Solute
  const matchingOsmosisSolute: ColligativeSolute | null = useMemo(() => {
    if (!card) return null;
    return getMatchingOsmosisSolute(card);
  }, [card]);

  // Detect if card corresponds to a Nuclear Isotope
  const matchingNuclearIsotope: NuclearIsotope | null = useMemo(() => {
    if (!card) return null;
    return getMatchingNuclearIsotope(card);
  }, [card]);

  // Detect if card corresponds to a Transition Metal Coordination Complex for CFT
  const matchingCoordinationComplex = useMemo(() => {
    if (!card) return null;
    return getMatchingCoordinationCard(card);
  }, [card]);

  // Detect if card corresponds to an Enzyme / Biological Catalyst
  const matchingEnzyme: EnzymeBenchmarkSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingEnzymeSpec(card);
  }, [card]);

  // Detect if card corresponds to a 2D Topological / Quantum Hall material
  const matchingQuantumHallMaterial: TwoDeeMaterialPreset | null = useMemo(() => {
    if (!card) return null;
    return getMatchingQuantumHallCard(card);
  }, [card]);

  // Detect if card corresponds to an Atmospheric / Ozone Photochemical species
  const matchingOzoneSpecies = useMemo(() => {
    if (!card) return null;
    return getMatchingAtmosphericSpecies(card);
  }, [card]);

  // Detect if card corresponds to a Superconductor / Meissner levitation material
  const matchingSuperconductor: SuperconductorSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSuperconductorCard(card);
  }, [card]);

  // Detect if card corresponds to a Fuel Cell / Green Hydrogen technology
  const matchingFuelCell: FuelCellSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingFuelCellCard(card);
  }, [card]);

  // Detect if card corresponds to Lithium-Ion Battery intercalation technology
  const matchingBattery: BatteryChemistrySpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingBatteryCard(card);
  }, [card]);

  // Detect if card corresponds to PCR amplicon / nucleic acid target
  const matchingPcr: PcrAmpliconSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingPcrCard(card);
  }, [card]);

  // Detect if card corresponds to CRISPR-Cas9 target / gene editing
  const matchingCrispr: CrisprTargetSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingCrisprCard(card);
  }, [card]);

  // Detect if card corresponds to thermal analysis / decomposition sample
  const matchingThermalAnalysis: ThermalSampleSpec | null = useMemo(() => {
    if (!card) return null;
    return getMatchingThermalAnalysisCard(card);
  }, [card]);

  // Detect if card corresponds to electron microscopy nanomaterial specimen
  const matchingMicroscopy: NanomaterialSpecimen | null = useMemo(() => {
    if (!card) return null;
    return getMatchingMicroscopyCard(card);
  }, [card]);

  // Detect if card corresponds to XPS / ESCA surface analysis sample
  const matchingXps: XpsSampleProfile | null = useMemo(() => {
    if (!card) return null;
    return getMatchingXpsCard(card);
  }, [card]);

  // Detect if card corresponds to AFM cantilever mechanics / biomolecule sample
  const matchingAfm: AfmSampleProfile | null = useMemo(() => {
    if (!card) return null;
    return getMatchingAfmCard(card);
  }, [card]);

  // Detect if card corresponds to SPR biomolecular interaction pair
  const matchingSpr: SprInteractionPair | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSprCard(card);
  }, [card]);

  // Detect if card corresponds to DLS / Zeta colloidal nanoparticle standard
  const matchingDls: DlsSampleStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingDlsCard(card);
  }, [card]);

  // Detect if card corresponds to Circular Dichroism (CD) protein standard
  const matchingCd: CdProteinStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingCdCard(card);
  }, [card]);

  // Detect if card corresponds to DSF / Protein Thermal Shift Assay standard
  const matchingDsf: DsfAssayStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingDsfCard(card);
  }, [card]);

  // Detect if card corresponds to SAXS / Small-Angle X-Ray Scattering standard
  const matchingSaxs: SaxsProteinStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSaxsCard(card);
  }, [card]);

  // Detect if card corresponds to Cryo-EM / Single-Particle Reconstruction standard
  const matchingCryoEm: CryoEmSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingCryoEmCard(card);
  }, [card]);

  // Detect if card corresponds to Solid-State NMR (ssNMR) / MAS standard
  const matchingSsNmr: SolidStateNmrSpecimen | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSolidStateNmrCard(card);
  }, [card]);

  // Detect if card corresponds to Stopped-Flow / Rapid Pre-Steady-State Kinetics standard
  const matchingStoppedFlow: StoppedFlowSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingStoppedFlowCard(card);
  }, [card]);

  // Detect if card corresponds to DPI / Dual-Polarization Interferometry standard
  const matchingDpi: DpiSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingDpiCard(card);
  }, [card]);

  // Detect if card corresponds to QCM-D / Quartz Crystal Microbalance standard
  const matchingQcmd: QcmdSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingQcmdCard(card);
  }, [card]);

  // Detect if card corresponds to Optical Tweezers single-molecule standard
  const matchingOpticalTweezers: OpticalTweezersSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingOpticalTweezersCard(card);
  }, [card]);

  // Detect if card corresponds to Magnetic Tweezers supercoiling standard
  const matchingMagneticTweezers: MagneticTweezersSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingMagneticTweezersCard(card);
  }, [card]);

  // Detect if card corresponds to Capillary Electrophoresis standard
  const matchingCapillaryElectrophoresis: CapillaryElectrophoresisSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingCapillaryElectrophoresisCard(card);
  }, [card]);

  // Detect if card corresponds to PET Radiochemistry standard
  const matchingPet: PetSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingPetCard(card);
  }, [card]);

  // Detect if card corresponds to Scanning Tunneling Microscopy (STM) standard
  const matchingStm: StmSpecimenStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingStmCard(card);
  }, [card]);

  // Detect if card corresponds to Femtosecond Pump-Probe Spectroscopy standard
  const matchingPumpProbe: PumpProbeStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingPumpProbeCard(card);
  }, [card]);

  // Detect if card corresponds to Secondary Ion Mass Spectrometry (SIMS) standard
  const matchingSims: SimsStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSimsCard(card);
  }, [card]);

  // Detect if card corresponds to Mössbauer Spectroscopy standard
  const matchingMossbauer: MossbauerStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingMossbauerCard(card);
  }, [card]);

  // Detect if card corresponds to X-ray Absorption Fine Structure (XAFS) standard
  const matchingXafs: XafsStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingXafsCard(card);
  }, [card]);

  // Detect if card corresponds to Dynamic Mechanical Analysis (DMA) standard
  const matchingDma: DmaStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingDmaCard(card);
  }, [card]);

  // Detect if card corresponds to Isothermal Titration Calorimetry (ITC) standard
  const matchingItc: ItcStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingItcCard(card);
  }, [card]);

  // Detect if card corresponds to Electrospray Ionization Mass Spectrometry (ESI-MS) standard
  const matchingEsi: EsiStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingEsiCard(card);
  }, [card]);

  // Detect if card corresponds to Supercritical Fluid Chromatography (SFC) standard
  const matchingSfc: SfcStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSfcCard(card);
  }, [card]);

  // Detect if card corresponds to Nanoparticle Tracking Analysis (NTA) standard
  const matchingNta: NtaStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingNtaCard(card);
  }, [card]);

  // Detect if card corresponds to Microscale Thermophoresis (MST) standard
  const matchingMst: MstStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingMstCard(card);
  }, [card]);

  // Detect if card corresponds to Bio-Layer Interferometry (BLI) standard
  const matchingBli: BliStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingBliCard(card);
  }, [card]);

  // Detect if card corresponds to Resonant Mass Measurement (RMM) standard
  const matchingRmm: RmmStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingRmmCard(card);
  }, [card]);

  // Detect if card corresponds to Differential Scanning Calorimetry (DSC) standard
  const matchingDsc: DscStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingDscCard(card);
  }, [card]);

  // Detect if card corresponds to Pressure Perturbation Calorimetry (PPC) standard
  const matchingPpc: PpcStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingPpcCard(card);
  }, [card]);

  // Detect if card corresponds to SEC-MALS light scattering standard
  const matchingSecMals: SecMalsStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSecMalsCard(card);
  }, [card]);

  // Detect if card corresponds to Analytical Ultracentrifugation (AUC) standard
  const matchingAuc: AucStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingAucCard(card);
  }, [card]);

  // Detect if card corresponds to Asymmetrical Flow Field-Flow Fractionation (AF4) standard
  const matchingAf4: Af4Standard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingAf4Card(card);
  }, [card]);

  // Detect if card corresponds to Taylor Dispersion Analysis (TDA) standard
  const matchingTda: TdaStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingTdaCard(card);
  }, [card]);

  // Detect if card corresponds to Fluorescence Correlation Spectroscopy (FCS) standard
  const matchingFcs: FcsStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingFcsCard(card);
  }, [card]);

  // Detect if card corresponds to Fluorescence Lifetime Imaging Microscopy (FLIM) standard
  const matchingFlim: FlimStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingFlimCard(card);
  }, [card]);

  // Detect if card corresponds to Single-Molecule FRET (smFRET / ALEX) standard
  const matchingSmFret: SmFretStandard | null = useMemo(() => {
    if (!card) return null;
    return getMatchingSmFretCard(card);
  }, [card]);

  if (!isOpen || !card) return null;

  const countOwned = cardCollection[card.id] || 0;

  // Attribute styling & badges
  const getAttributeBadge = () => {
    switch (card.attribute) {
      case 'PYRO': return { name: 'HỎA (PYRO)', color: 'text-orange-400 border-orange-500/40 bg-orange-950/40' };
      case 'AQUA': return { name: 'THỦY (AQUA)', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' };
      case 'TERRA': return { name: 'ĐỊA (TERRA)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' };
      case 'AERO': return { name: 'PHONG (AERO)', color: 'text-sky-300 border-sky-500/40 bg-sky-950/40' };
      case 'ELECTRO': return { name: 'ĐIỆN (ELECTRO)', color: 'text-amber-300 border-amber-500/40 bg-amber-950/40' };
      case 'ACID_DARK': return { name: 'AXIT ÁM (ACID)', color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' };
      case 'NOBLE_VOID': return { name: 'KHÍ HIẾM TRƠ (NOBLE)', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/40' };
      default: return { name: 'VÔ CƠ', color: 'text-slate-400 border-slate-600 bg-slate-900' };
    }
  };

  const attrBadge = getAttributeBadge();

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    const tabs: ('DOSSIER' | 'QUANTUM' | 'REACTIONS')[] = ['DOSSIER', 'QUANTUM', 'REACTIONS'];
    const currentIdx = tabs.indexOf(activeTab);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextTab = tabs[(currentIdx + 1) % tabs.length];
      setActiveTab(nextTab);
      sound.playUiClick();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevTab = tabs[(currentIdx - 1 + tabs.length) % tabs.length];
      setActiveTab(prevTab);
      sound.playUiClick();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-obsidian/85 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-navy via-slate-950 to-obsidian border-2 border-navy-light/80 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-ion border border-cyan-500/40 flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="card-detail-title" className="text-lg sm:text-xl font-bold font-sans text-ivory flex items-center gap-2">
                  {card.name}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${attrBadge.color}`}>
                  {attrBadge.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                {card.name_en && <span className="italic">{card.name_en}</span>}
                {card.chemicalFormula && (
                  <span className="text-teal-400 font-bold">[{card.chemicalFormula}]</span>
                )}
                {card.atomicNumber && card.atomicNumber > 0 && (
                  <span className="text-cyan-400">Z = {card.atomicNumber}</span>
                )}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
            title="Đóng (ESC)"
            aria-label="Đóng cửa sổ chi tiết lá bài (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-ion/40">
          {/* Left Column (5 cols): 3D Card Hologram & Action Controls */}
          <div className="md:col-span-5 flex flex-col items-center gap-4">
            {/* 3D Holographic Card View */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shadow-xl flex justify-center items-center">
              <ChemicalCardView card={card} size="detail" disableHoverZoom={false} />
            </div>

            {/* Ownership Status & Quantity Pill */}
            <div className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between text-xs font-mono" aria-label={`Sở hữu: ${countOwned} bản sao`}>
              <span className="text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${countOwned > 0 ? 'text-emerald-400' : 'text-slate-600'}`} />
                Trạng thái sở hữu:
              </span>
              <span className={`font-bold px-2 py-0.5 rounded ${countOwned > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                {countOwned > 0 ? `${countOwned} Bản sao` : 'Chưa sở hữu'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              {onAddCardToDeck && countOwned > 0 && (
                <button
                  onClick={() => {
                    sound.playUiClick();
                    onAddCardToDeck(card);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-obsidian font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
                >
                  <Plus className="w-4 h-4" /> Thêm Vào Bộ Bài (+1)
                </button>
              )}

              {onOpenCrafting && (
                <button
                  onClick={() => {
                    sound.playUiClick();
                    onOpenCrafting(card);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-cyan-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
                >
                  <Hammer className="w-4 h-4 text-amber-400" /> Chế Tạo & Phân Rã Shards
                </button>
              )}
            </div>
          </div>

          {/* Right Column (7 cols): Navigation Tabs & Deep Dossier Content */}
          <div className="md:col-span-7 flex flex-col gap-3">
            {/* Navigation Tabs Header */}
            <div
              role="tablist"
              aria-label="Điều hướng hồ sơ chi tiết lá bài"
              onKeyDown={handleTabKeyDown}
              className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono"
            >
              <button
                role="tab"
                id="tab-dossier"
                aria-controls="panel-dossier"
                aria-selected={activeTab === 'DOSSIER'}
                onClick={() => {
                  sound.playUiClick();
                  setActiveTab('DOSSIER');
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none ${
                  activeTab === 'DOSSIER'
                    ? 'bg-cyan-ion text-obsidian shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hồ Sơ Thẻ Bài</span>
              </button>

              <button
                role="tab"
                id="tab-quantum"
                aria-controls="panel-quantum"
                aria-selected={activeTab === 'QUANTUM'}
                onClick={() => {
                  sound.playUiClick();
                  setActiveTab('QUANTUM');
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none ${
                  activeTab === 'QUANTUM'
                    ? 'bg-cyan-ion text-obsidian shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>Kính Hiển Vi & Quang Phổ</span>
              </button>

              <button
                role="tab"
                id="tab-reactions"
                aria-controls="panel-reactions"
                aria-selected={activeTab === 'REACTIONS'}
                onClick={() => {
                  sound.playUiClick();
                  setActiveTab('REACTIONS');
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none ${
                  activeTab === 'REACTIONS'
                    ? 'bg-cyan-ion text-obsidian shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Mạng Phản Ứng ({relatedLinks.length})</span>
              </button>
            </div>

            {/* Tab 1: Tactical Dossier & Master Rule Mechanics */}
            {activeTab === 'DOSSIER' && (
              <div role="tabpanel" id="panel-dossier" aria-labelledby="tab-dossier" className="flex flex-col gap-3 animate-fadeIn">
                {/* Combat Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-xl bg-navy/60 border border-navy-light/40 font-mono text-center">
                  {card.atk !== undefined && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-red-500/20">
                      <div className="text-[10px] text-red-400 flex items-center justify-center gap-1 font-bold">
                        <Sword className="w-3.5 h-3.5" /> SỨC TẤN CÔNG (ATK)
                      </div>
                      <div className="text-base font-bold text-red-200">{card.atk}</div>
                    </div>
                  )}

                  {card.def !== undefined && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-blue-500/20">
                      <div className="text-[10px] text-blue-400 flex items-center justify-center gap-1 font-bold">
                        <Shield className="w-3.5 h-3.5" /> PHÒNG THỦ (DEF)
                      </div>
                      <div className="text-base font-bold text-blue-200">{card.def}</div>
                    </div>
                  )}

                  {card.level !== undefined && card.cardType !== 'XYZ_MONSTER' && card.cardType !== 'LINK_MONSTER' && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-amber-500/20">
                      <div className="text-[10px] text-amber-400 font-bold">CẤP ĐỘ (LEVEL)</div>
                      <div className="text-base font-bold text-amber-300">⭐ {card.level}★</div>
                    </div>
                  )}

                  {card.xyzRank !== undefined && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-amber-500/40">
                      <div className="text-[10px] text-amber-400 font-bold">XYZ RANK</div>
                      <div className="text-base font-bold text-amber-200">⯁ {card.xyzRank}</div>
                    </div>
                  )}

                  {card.linkRating !== undefined && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-cyan-500/40">
                      <div className="text-[10px] text-cyan-400 font-bold">LINK RATING</div>
                      <div className="text-base font-bold text-cyan-300">LINK-{card.linkRating}</div>
                    </div>
                  )}

                  {card.pendulumScale !== undefined && (
                    <div className="p-1.5 rounded-lg bg-black/40 border border-teal-500/40">
                      <div className="text-[10px] text-teal-400 font-bold">THANG ĐO SCALE</div>
                      <div className="text-base font-bold text-teal-300">💎 Scale {card.pendulumScale}</div>
                    </div>
                  )}

                  <div className="p-1.5 rounded-lg bg-black/40 border border-purple-500/20">
                    <div className="text-[10px] text-purple-300 flex items-center justify-center gap-1 font-bold">
                      <Zap className="w-3.5 h-3.5" /> TIÊU HAO MANA
                    </div>
                    <div className="text-base font-bold text-purple-200">{card.manaCost}</div>
                  </div>
                </div>

                {/* Effect Text Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>HIỆU ỨNG THẺ BÀI CHIẾN THUẬT (TACTICAL EFFECT)</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans bg-black/50 p-2.5 rounded-lg border border-white/5">
                    {card.effectText || card.scientificLore || 'Thẻ bài nguyên tố cơ bản, không có hiệu ứng kích hoạt đặc biệt.'}
                  </p>
                </div>

                {/* Chemical Principle & Scientific Lore */}
                {card.scientificLore && (
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-purple-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>NGUYÊN LÝ HÓA HỌC & ĐẶC TÍNH IUPAC</span>
                    </div>
                    <p className="text-xs text-purple-100/90 leading-relaxed italic bg-black/40 p-2.5 rounded-lg border border-purple-500/20">
                      "{card.scientificLore}"
                    </p>
                  </div>
                )}

                {/* Balanced Chemical Equation if available */}
                {card.relatedEquation && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono space-y-1">
                    <span className="text-emerald-400 font-bold block">⚛️ Phương trình hóa học bảo toàn:</span>
                    <div className="p-2 rounded bg-black/50 text-emerald-200 font-bold tracking-wide">
                      {card.relatedEquation}
                    </div>
                  </div>
                )}

                {/* Flame Test Quick Indicator Badge */}
                {flameCandidate && FLAME_TEST_CATALOG[flameCandidate.symbol] && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setActiveTab('QUANTUM');
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 hover:border-amber-400 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/50 group"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Thử màu ngọn lửa {flameCandidate.isCompound ? `(${flameCandidate.symbol})` : ''}:{' '}
                        <strong style={{ color: FLAME_TEST_CATALOG[flameCandidate.symbol].colorHex }}>
                          {FLAME_TEST_CATALOG[flameCandidate.symbol].colorNameVI}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Xem thí nghiệm & quang phổ →
                    </span>
                  </div>
                )}

                {/* Equilibrium Le Chatelier Quick Indicator Badge */}
                {matchingEquilibrium && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowEquilibriumModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cân bằng hóa học (GDPT 2018):{' '}
                        <strong className="text-white">{matchingEquilibrium.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Khảo sát Le Chatelier ⚖️ →
                    </span>
                  </div>
                )}

                {/* Galvanic Electrochemical Cell Quick Indicator Badge */}
                {matchingGalvanic && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowGalvanicModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Pin điện hóa (GDPT 2018):{' '}
                        <strong className="text-white">{matchingGalvanic.preset.nameVi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mô phỏng Nernst ⚡ →
                    </span>
                  </div>
                )}

                {/* Acid-Base Titration Quick Indicator Badge */}
                {matchingTitration && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowTitrationModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-pink-950/40 border border-pink-500/40 hover:border-pink-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-pink-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-pink-200 font-mono">
                        Chuẩn độ pH (GDPT 2018):{' '}
                        <strong className="text-white">{matchingTitration.nameVi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-pink-300 underline flex items-center gap-1">
                      Đường cong pH 🧪 →
                    </span>
                  </div>
                )}

                {/* Industrial Gas Synthesis Reactor Quick Indicator Badge */}
                {matchingIndustrial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowIndustrialModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-500/40 hover:border-orange-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-orange-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                      <span className="text-orange-200 font-mono">
                        Lò khí công nghiệp (GDPT 2018):{' '}
                        <strong className="text-white">{matchingIndustrial.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-300 underline flex items-center gap-1">
                      Haber-Bosch 🏭 →
                    </span>
                  </div>
                )}

                {/* Coordination Complex Quick Indicator Badge */}
                {matchingComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowComplexModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Phức chất (Hóa 12):{' '}
                        <strong className="text-white">{matchingComplex.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Thuyết CFT ✨ →
                    </span>
                  </div>
                )}

                {/* VSEPR 3D Molecular Geometry Quick Indicator Badge */}
                {matchingVsepr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowVseprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Hình học VSEPR (Hóa 10):{' '}
                        <strong className="text-white">{matchingVsepr.name_vi} ({matchingVsepr.formulaAXE})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô hình 3D 🧭 →
                    </span>
                  </div>
                )}

                {/* Solubility Product & Precipitation Quick Indicator Badge */}
                {matchingSalt && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowSolubilityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tích số tan (K_sp):{' '}
                        <strong className="text-white">{matchingSalt.name_vi} ({matchingSalt.formula}↓)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Kết tủa ⚗️ →
                    </span>
                  </div>
                )}

                {/* Electrolysis & Faraday Simulation Quick Indicator Badge */}
                {matchingElectrolysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowElectrolysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Điện phân & Faraday (Hóa 12):{' '}
                        <strong className="text-white">{matchingElectrolysis.nameEN}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Điện phân ⚡ →
                    </span>
                  </div>
                )}

                {/* Organic Chemistry Mechanism & Stereoisomerism Quick Indicator Badge */}
                {matchingOrganic && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowOrganicModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Hữu Cơ & Đồng Phân:{' '}
                        <strong className="text-white">{matchingOrganic.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hữu cơ 🧪 →
                    </span>
                  </div>
                )}

                {/* Polymer & Macromolecules Quick Indicator Badge */}
                {matchingPolymer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowPolymerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Polime & Vật Liệu:{' '}
                        <strong className="text-white">{matchingPolymer.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Polime 🧪 →
                    </span>
                  </div>
                )}

                {/* Nuclear Chemistry & Radioactivity Quick Indicator Badge */}
                {matchingNuclear && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowNuclearModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phóng Xạ & Hạt Nhân:{' '}
                        <strong className="text-white">{matchingNuclear.parentNuclide.symbol} ({matchingNuclear.nameVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Hạt nhân ☢️ →
                    </span>
                  </div>
                )}

                {/* Green Chemistry & Environmental Sustainability Quick Indicator Badge */}
                {matchingGreen && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowGreenModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Học Xanh & Môi Trường:{' '}
                        <strong className="text-white">
                          {matchingGreen.principle?.titleVI || matchingGreen.gas?.nameVI || matchingGreen.damageTarget?.targetNameVI || 'Bền Vững'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hóa học xanh 🌱 →
                    </span>
                  </div>
                )}

                {/* Crystallography & Unit Cell Quick Indicator Badge */}
                {matchingCrystal && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowCrystalModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gem className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Mạng Tinh Thể (Hóa 10):{' '}
                        <strong className="text-white">{matchingCrystal.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Tinh thể học 💎 →
                    </span>
                  </div>
                )}

                {/* Colloids, Interfaces & Surface Chemistry Quick Indicator Badge */}
                {matchingColloid && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowColloidModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Hóa Keo & Bề Mặt (Hóa 10-11):{' '}
                        <strong className="text-white">
                          {matchingColloid.dispersedSystem?.nameVI || matchingColloid.surfactant?.nameVI || 'Hệ Keo'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Hóa keo 🫧 →
                    </span>
                  </div>
                )}

                {/* Spectrophotometry & Beer-Lambert Law Quick Indicator Badge */}
                {matchingSpectro && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSpectroLampShutter();
                      setShowSpectroModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Quang Phổ Hấp Thụ (Hóa 10-12):{' '}
                        <strong className="text-white">{matchingSpectro.vietnameseName}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Beer-Lambert 🌈 →
                    </span>
                  </div>
                )}

                {/* Mass Spectrometry & Isotope Cluster Quick Indicator Badge */}
                {matchingMassSpec && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMassSpecIonTrapHum();
                      setShowMassSpecModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Phổ Khối Lượng MS (Hóa 10-11):{' '}
                        <strong className="text-white">{matchingMassSpec.vietnameseName} (M = {matchingMassSpec.nominalMass})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ khối m/z 📊 →
                    </span>
                  </div>
                )}

                {/* Infrared Spectroscopy (IR) Quick Indicator Badge */}
                {matchingIR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playInfraredLaserChirp();
                      setShowIRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Phổ Hồng Ngoại IR (Hóa 11):{' '}
                        <strong className="text-white">{matchingIR.vietnameseName} ({matchingIR.functionalGroupVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Phổ IR 🌊 →
                    </span>
                  </div>
                )}

                {/* Nuclear Magnetic Resonance (NMR) Quick Indicator Badge */}
                {matchingNMR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNmrRfPulseBip();
                      setShowNMRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng Từ NMR (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingNMR.vietnameseName} ({matchingNMR.protonSignals.length} mũi ¹H)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Phổ NMR 📡 →
                    </span>
                  </div>
                )}

                {/* Liquid-Liquid Extraction Quick Indicator Badge */}
                {matchingExtraction && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSeparatoryFunnelShake?.();
                      setShowExtractionModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chiết Lỏng - Lỏng (Hóa 11):{' '}
                        <strong className="text-white">{matchingExtraction.vietnameseName} (Hệ số K_D = {matchingExtraction.kd_etherWater})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Phễu Chiết 🧪 →
                    </span>
                  </div>
                )}

                {/* Thin-Layer & Column Chromatography Quick Indicator Badge */}
                {matchingChromatography && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEluentFlowHum?.();
                      setShowChromatographyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Kí TLC / Cột (Hóa 11):{' '}
                        <strong className="text-white">{matchingChromatography.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Sắc Kí Bản Mỏng 🔬 →
                    </span>
                  </div>
                )}

                {/* Recrystallization & Melting Point Quick Indicator Badge */}
                {matchingRecrystallization && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrystalGrowthChime?.();
                      setShowRecrystallizationModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Kết Tinh Lại & Nóng Chảy (Hóa 11):{' '}
                        <strong className="text-white">{matchingRecrystallization.nameVI} ({matchingRecrystallization.meltingPointPureMinC} °C)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Kết Tinh 💎 →
                    </span>
                  </div>
                )}

                {/* Qualitative Organic Functional Group Quick Indicator Badge */}
                {matchingFunctionalGroup && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPrecipitateFormChime?.();
                      setShowFunctionalGroupModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Pipette className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhận Biết Nhóm Chức (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingFunctionalGroup.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Thuốc Thử 🧪 →
                    </span>
                  </div>
                )}

                {/* Gas Laws & Kinetic Molecular Quick Indicator Badge */}
                {matchingGasSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGasPistonCompressionWhoosh?.();
                      setShowGasLawsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Định Luật Chất Khí & Động Học Phân Tử:{' '}
                        <strong className="text-white">{matchingGasSpecies.nameVI} ({matchingGasSpecies.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Mô Phỏng P-V-T 💨 →
                    </span>
                  </div>
                )}

                {/* Osmosis & Colligative Properties Quick Indicator Badge */}
                {matchingOsmosisSolute && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOsmoticFlowTrickle?.();
                      setShowOsmosisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Áp Suất Thẩm Thấu & Tính Chất Nồng Độ:{' '}
                        <strong className="text-white">{matchingOsmosisSolute.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô Phỏng Thẩm Thấu 💧 →
                    </span>
                  </div>
                )}

                {/* Nuclear Shell & Binding Energy Quick Indicator Badge */}
                {matchingNuclearIsotope && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNuclearResonanceHum?.();
                      setShowNuclearShellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Vỏ Hạt Nhân & Năng Lượng Liên Kết:{' '}
                        <strong className="text-white">{matchingNuclearIsotope.nameVI} ({matchingNuclearIsotope.symbol})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mô Phỏng Hạt Nhân ⚛️ →
                    </span>
                  </div>
                )}

                {/* Transition Metal Crystal Field Theory Quick Indicator Badge */}
                {matchingCoordinationComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCoordinationColorShiftChime?.();
                      setShowCrystalFieldModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Thuyết Trường Tinh Thể (CFT):{' '}
                        <strong className="text-white">{matchingCoordinationComplex.metal.symbol} + {matchingCoordinationComplex.ligand.formula}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mô Phỏng Phức Chất 🔮 →
                    </span>
                  </div>
                )}

                {matchingEnzyme && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEnzymeSubstrateLockChime?.();
                      setShowEnzymeKineticsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Xúc Tác Enzyme:{' '}
                        <strong className="text-white">{matchingEnzyme.name} ({matchingEnzyme.ecNumber})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Động Học Michaelis 🧪 →
                    </span>
                  </div>
                )}

                {matchingQuantumHallMaterial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQuantumHallPlateauLockBeep?.();
                      setShowQuantumHallModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Vật Liệu Tô Pô:{' '}
                        <strong className="text-white">{matchingQuantumHallMaterial.name}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Hall Lượng Tử 🌀 →
                    </span>
                  </div>
                )}

                {matchingOzoneSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUvPhotonAbsorptionChime?.();
                      setShowOzoneModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Quang Hóa Khí Quyển:{' '}
                        <strong className="text-white">{matchingOzoneSpecies.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Tầng Ozon ☀️ →
                    </span>
                  </div>
                )}

                {matchingSuperconductor && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSuperconductingMeissnerLevitateHum?.();
                      setShowSuperconductivityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Vật Liệu Siêu Dẫn:{' '}
                        <strong className="text-white">{matchingSuperconductor.name} ({matchingSuperconductor.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Đệm Từ Meissner ⚡ →
                    </span>
                  </div>
                )}

                {matchingFuelCell && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFuelCellProtonFlowHum?.();
                      setShowFuelCellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Pin Nhiên Liệu Hydro:{' '}
                        <strong className="text-white">{matchingFuelCell.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Đặc Tuyến V(j) ⚡ →
                    </span>
                  </div>
                )}

                {matchingBattery && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBatteryIntercalationZip?.();
                      setShowBatteryModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Pin Lithium-Ion:{' '}
                        <strong className="text-white">{matchingBattery.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Xen Phủ Li⁺ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPcr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPcrThermalStepChime?.();
                      setShowPcrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Dna className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Nhân Bản Gen PCR:{' '}
                        <strong className="text-white">{matchingPcr.targetGene} ({matchingPcr.ampliconLengthBp} bp)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Điện Di Gel ⚡ →
                    </span>
                  </div>
                )}

                {matchingCrispr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrisprCas9DsbSnip?.();
                      setShowCrisprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chỉnh Sửa Gen CRISPR:{' '}
                        <strong className="text-white">{matchingCrispr.targetGene} (PAM: {matchingCrispr.pamSequence})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Cắt DSB ⚡ →
                    </span>
                  </div>
                )}

                {matchingThermalAnalysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalFurnaceRampHum?.();
                      setShowThermalAnalysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phân Tích Nhiệt TGA/DSC:{' '}
                        <strong className="text-white">{matchingThermalAnalysis.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Đường TGA ⚡ →
                    </span>
                  </div>
                )}

                {matchingMicroscopy && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playElectronBeamSweepScan?.();
                      setShowMicroscopyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi SEM/TEM:{' '}
                        <strong className="text-white">{matchingMicroscopy.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Quét Chùm Điện Tử 🔬 →
                    </span>
                  </div>
                )}

                {matchingXps && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playXpsPhotonFlash?.();
                      setShowXpsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quang Phổ XPS/ESCA:{' '}
                        <strong className="text-white">{matchingXps.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Chùm Tia X hν ⚡ →
                    </span>
                  </div>
                )}

                {matchingAfm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAfmTipApproachSnap?.();
                      setShowAfmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MoveVertical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi AFM:{' '}
                        <strong className="text-white">{matchingAfm.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ Lực F(z) ⚡ →
                    </span>
                  </div>
                )}

                {matchingSpr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSprResonanceDipSweep?.();
                      setShowSprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng SPR:{' '}
                        <strong className="text-white">{matchingSpr.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sensorgram R(t) ⚡ →
                    </span>
                  </div>
                )}

                {matchingDls && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDlsLaserScatteringPulse?.();
                      setShowDlsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Tán Xạ DLS & Zeta:{' '}
                        <strong className="text-white">{matchingDls.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Cỡ Hạt d_h ⚡ →
                    </span>
                  </div>
                )}

                {matchingCd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCircularDichroismChiralHum?.();
                      setShowCdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Phổ CD Protein:{' '}
                        <strong className="text-white">{matchingCd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Cấu Trúc Bậc II ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsf && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalShiftPeakTone?.();
                      setShowDsfModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Sàng Lọc DSF & ΔTm:{' '}
                        <strong className="text-white">{matchingDsf.targetProteinName.split(' (')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Độ Bền Nhiệt ΔTm ⚡ →
                    </span>
                  </div>
                )}

                {matchingSaxs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGuinierFitLockTone?.();
                      setShowSaxsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scan className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Tán Xạ Tia X SAXS:{' '}
                        <strong className="text-white">{matchingSaxs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Bán Kính Rg & Kratky ⚡ →
                    </span>
                  </div>
                )}

                {matchingCryoEm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFscResolutionLockTone?.();
                      setShowCryoEmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Cryo-EM 3D:{' '}
                        <strong className="text-white">{matchingCryoEm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      FSC 0.143 & Thon Rings ⚡ →
                    </span>
                  </div>
                )}

                {matchingSsNmr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHartmannHahnResonanceLockTone?.();
                      setShowSsNmrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        ssNMR MAS:{' '}
                        <strong className="text-white">{matchingSsNmr.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Góc 54.74° & CP-MAS ⚡ →
                    </span>
                  </div>
                )}

                {matchingStoppedFlow && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playKineticBurstDetectionTone?.();
                      setShowStoppedFlowModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Stopped-Flow:{' '}
                        <strong className="text-white">{matchingStoppedFlow.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Pha Nổ Burst & t_dead ⚡ →
                    </span>
                  </div>
                )}

                {matchingDpi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDeFeijterMassResolvedChime?.();
                      setShowDpiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        DPI Bề Dày:{' '}
                        <strong className="text-white">{matchingDpi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      0.1Å & De Feijter ⚡ →
                    </span>
                  </div>
                )}

                {matchingQcmd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQcmdQuartzResonancePing?.(3);
                      setShowQcmdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        QCM-D Khối Lượng:{' '}
                        <strong className="text-white">{matchingQcmd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sauerbrey & Voigt ⚡ →
                    </span>
                  </div>
                )}

                {matchingOpticalTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOpticalTrapCaptureTone?.(100);
                      setShowOpticalTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Bẫy Quang Học Laser:{' '}
                        <strong className="text-white">{matchingOpticalTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ Lực ⚡ →
                    </span>
                  </div>
                )}

                {matchingMagneticTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMagneticBeadRotationTone?.(0);
                      setShowMagneticTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Magnet className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Bẫy Từ Siêu Xoắn ADN:{' '}
                        <strong className="text-white">{matchingMagneticTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mở Siêu Xoắn ⚡ →
                    </span>
                  </div>
                )}

                {matchingCapillaryElectrophoresis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCapillaryHighVoltageHum?.(20);
                      setShowCapillaryElectrophoresisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Điện Di Mao Quản CE:{' '}
                        <strong className="text-white">{matchingCapillaryElectrophoresis.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Sắc Ký Đồ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPet && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPetPositronAnnihilationPing?.(511);
                      setShowPetModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Hóa Phóng Xạ PET:{' '}
                        <strong className="text-white">{matchingPet.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Vành Trùng Phùng 511 keV ⚡ →
                    </span>
                  </div>
                )}

                {matchingStm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playStmQuantumTunnelingHum?.(1.5);
                      setShowStmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Hiển Vi Xuyên Ngầm STM:{' '}
                        <strong className="text-white">{matchingStm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Quét Xuyên Ngầm Ångström ⚡ →
                    </span>
                  </div>
                )}

                {matchingPumpProbe && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFemtosecondPumpLaserTone?.();
                      setShowPumpProbeModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Bơm-Dò Femtosecond:{' '}
                        <strong className="text-white">{matchingPumpProbe.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Động Học Trạng Thái Chuyển Tiếp ⚡ →
                    </span>
                  </div>
                )}

                {matchingSims && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSimsPrimaryIonSputterTone?.();
                      setShowSimsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Khối Phổ SIMS:{' '}
                        <strong className="text-white">{matchingSims.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Bóc Mòn Phân Tích Độ Sâu ⚡ →
                    </span>
                  </div>
                )}

                {matchingMossbauer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMossbauerDopplerDriveHum?.(0.0);
                      setShowMossbauerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Quang Phổ Mössbauer:{' '}
                        <strong className="text-white">{matchingMossbauer.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Tách Mức Siêu Tinh Vi ⁵⁷Fe ⚡ →
                    </span>
                  </div>
                )}

                {matchingXafs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSynchrotronMonochromatorEnergySweep?.(matchingXafs.xanes.edgeEnergyE0Ev);
                      setShowXafsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Quang Phổ Hấp Thụ XAFS:{' '}
                        <strong className="text-white">{matchingXafs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ XANES / EXAFS ⚡ →
                    </span>
                  </div>
                )}

                {matchingDma && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDmaOscillationFrequencyHum?.(1.0);
                      setShowDmaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Cơ Học Động DMA:{' '}
                        <strong className="text-white">{matchingDma.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Phân Tích Tg & Modulus ⚡ →
                    </span>
                  </div>
                )}

                {matchingItc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCalorimetricHeatExothermHiss?.(matchingItc.bindingEnthalpyDeltaHKjPerMol);
                      setShowItcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhiệt Lượng Kế ITC:{' '}
                        <strong className="text-white">{matchingItc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Đo Nhiệt Enthalpy ΔH° ⚡ →
                    </span>
                  </div>
                )}

                {matchingEsi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTaylorConeHighVoltageHum?.(3.5);
                      setShowEsiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Khối Phổ ESI-MS:{' '}
                        <strong className="text-white">{matchingEsi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ ESI-MS & Đa Tích Điện ⚡ →
                    </span>
                  </div>
                )}

                {matchingSfc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSupercriticalFluidBprPressureHiss?.(150);
                      setShowSfcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký SFC:{' '}
                        <strong className="text-white">{matchingSfc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Tách Chiral CO₂ Siêu Tới Hạn ⚡ →
                    </span>
                  </div>
                )}

                {matchingNta && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHydrodynamicModeDiameterBeep?.(matchingNta.trueModeDiameterNm);
                      setShowNtaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Bám Vết NTA:{' '}
                        <strong className="text-white">{matchingNta.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Kính NTA & Chuyển Động Brown ⚡ →
                    </span>
                  </div>
                )}

                {matchingMst && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermophoreticDepletionPing?.(matchingMst.trueKdMolar);
                      setShowMstModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Nhiệt Di Chuyển MST:{' '}
                        <strong className="text-white">{matchingMst.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Đo Ái Lực Kd & Soret ⚡ →
                    </span>
                  </div>
                )}

                {matchingBli && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBliDipAndReadChime?.();
                      setShowBliModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Giao Thoa BLI:{' '}
                        <strong className="text-white">{matchingBli.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Động Học kon/koff Octet ⚡ →
                    </span>
                  </div>
                )}

                {matchingRmm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playResonatorCantileverTransitBlip?.();
                      setShowRmmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Cộng Hưởng RMM:{' '}
                        <strong className="text-white">{matchingRmm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở SMR Ác-si-mét USP &lt;1788&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playProteinDenaturationTmPeakChime?.();
                      setShowDscModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quét Nhiệt DSC:{' '}
                        <strong className="text-white">{matchingDsc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Độ Ổn Định Protein Tm/Cp ⚡ →
                    </span>
                  </div>
                )}

                {matchingPpc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPpcPressureJumpHiss?.();
                      setShowPpcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Nhiễu Loạn Áp Suất PPC:{' '}
                        <strong className="text-white">{matchingPpc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Độ Nở Nhiệt α IUPAC ⚡ →
                    </span>
                  </div>
                )}

                {matchingSecMals && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playZimmPlotMolarMassChime?.();
                      setShowSecMalsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Tán Xạ SEC-MALS:{' '}
                        <strong className="text-white">{matchingSecMals.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Zimm Plot Mw USP &lt;129&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingAuc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUltracentrifugeRotorHum?.();
                      setShowAucModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Siêu Ly Tâm AUC:{' '}
                        <strong className="text-white">{matchingAuc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mở Svedberg c(s) ⚡ →
                    </span>
                  </div>
                )}

                {matchingAf4 && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAf4CrossFlowChannelHiss?.();
                      setShowAf4Modal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký Dòng AF4:{' '}
                        <strong className="text-white">{matchingAf4.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Fractogram ISO ⚡ →
                    </span>
                  </div>
                )}

                {matchingTda && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTdaCapillaryFlowWhistle?.();
                      setShowTdaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tán Xạ Mao Quản TDA:{' '}
                        <strong className="text-white">{matchingTda.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Taylorgram Đo Kép ⚡ →
                    </span>
                  </div>
                )}

                {matchingFcs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAutocorrelationDiffusionChime?.();
                      setShowFcsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Focus className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Quang Phổ FCS:{' '}
                        <strong className="text-white">{matchingFcs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Mở Confocal G(τ) ⚡ →
                    </span>
                  </div>
                )}

                {matchingFlim && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNanosecondDecayPhasorChime?.();
                      setShowFlimModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Thời Gian Sống FLIM:{' '}
                        <strong className="text-white">{matchingFlim.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở TCSPC Phasor ⚡ →
                    </span>
                  </div>
                )}

                {matchingSmFret && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSmFretLaserAlternationClick?.();
                      setShowSmFretModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        smFRET Đơn Phân Tử:{' '}
                        <strong className="text-white">{matchingSmFret.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở ALEX 2D E-S ⚡ →
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Quantum Orbitals & Bohr Atomic Shells */}
            {activeTab === 'QUANTUM' && (
              <div role="tabpanel" id="panel-quantum" aria-labelledby="tab-quantum" className="flex flex-col gap-3 animate-fadeIn">
                {card.atomicNumber && card.atomicNumber > 0 ? (
                  <>
                    {/* SVG Bohr-Rutherford Shells */}
                    {shellElectrons.length > 0 && (
                      <div className="p-3 rounded-xl bg-black/70 border border-cyan-500/30 flex flex-col items-center gap-2">
                        <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                            <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '14s' }} />
                            MÔ HÌNH NGUYÊN TỬ BOHR (LỚP ELECTRON K, L, M, N...)
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold">
                            Z = {card.atomicNumber} ({card.chemicalFormula})
                          </span>
                        </div>

                        <svg viewBox="-90 -90 180 180" className="w-48 h-48 drop-shadow-lg">
                          <defs>
                            <radialGradient id="modalNucleusGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#0284c7" />
                              <stop offset="100%" stopColor="#0c4a6e" />
                            </radialGradient>
                          </defs>

                          {/* Central Nucleus */}
                          <circle cx="0" cy="0" r="17" fill="url(#modalNucleusGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                          <text cx="0" cy="-2" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            {card.chemicalFormula}
                          </text>
                          <text cx="0" cy="8" textAnchor="middle" dominantBaseline="middle" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">
                            +{card.atomicNumber}
                          </text>

                          {/* Electron Rings */}
                          {shellElectrons.map((electronCount, shellIdx) => {
                            const radius = 28 + shellIdx * 14;
                            const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
                            const shellName = shellNames[shellIdx] || `n=${shellIdx + 1}`;

                            return (
                              <g key={shellIdx}>
                                <circle
                                  cx="0"
                                  cy="0"
                                  r={radius}
                                  fill="none"
                                  stroke="rgba(56, 189, 248, 0.28)"
                                  strokeWidth="0.8"
                                  strokeDasharray="2,2"
                                />
                                <text x={radius} y="-2" fill="rgba(148, 163, 184, 0.65)" fontSize="5" fontFamily="monospace">
                                  {shellName}
                                </text>
                                {Array.from({ length: electronCount }).map((_, eIdx) => {
                                  const angle = (2 * Math.PI * eIdx) / electronCount;
                                  const ex = radius * Math.cos(angle);
                                  const ey = radius * Math.sin(angle);
                                  return (
                                    <circle
                                      key={eIdx}
                                      cx={ex}
                                      cy={ey}
                                      r="2.5"
                                      fill="#38bdf8"
                                      stroke="#ffffff"
                                      strokeWidth="0.6"
                                      className="drop-shadow-sm"
                                    />
                                  );
                                })}
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    )}

                    {/* Quantum Orbital Box Diagram (GDPT 2018) */}
                    <OrbitalBoxDiagram z={card.atomicNumber} symbol={card.chemicalFormula || 'X'} />

                    {/* Flame Test Spectroscopy (if element has characteristic flame) */}
                    {flameCandidate && (
                      <div className="mt-2">
                        <FlameTestVisualizer
                          symbol={flameCandidate.symbol}
                          nameVi={flameCandidate.nameVi}
                          contextFormula={flameCandidate.isCompound ? card.chemicalFormula : undefined}
                          contextName={card.name}
                        />
                      </div>
                    )}
                  </>
                ) : flameCandidate ? (
                  <div className="flex flex-col gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-400" />
                        QUANG PHỔ PHÁT XẠ NGỌN LỬA CATION {flameCandidate.symbol} (MẪU {card.chemicalFormula})
                      </span>
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-black/50 border border-cyan-500/20">
                        Hóa Phân Tích GDPT 2018
                      </span>
                    </div>

                    <FlameTestVisualizer
                      symbol={flameCandidate.symbol}
                      nameVi={flameCandidate.nameVi}
                      contextFormula={card.chemicalFormula}
                      contextName={card.name}
                    />

                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowBondingModal(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-md group active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-ion group-hover:rotate-45 transition-transform" />
                      MÔ PHỎNG LIÊN KẾT HÓA HỌC & CẤU TRÚC VSEPR 3D 🔬
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-3">
                    <Atom className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-bold text-slate-300">Thẻ Hợp Chất / Phép / Bẫy Phức Tạp</p>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Kính hiển vi nguyên tử Bohr & Ô orbital áp dụng cho các nguyên tố đơn chất (Z = 1 đến 118).
                      Thẻ bài này là hợp chất liên kết hóa trị/ion hoặc thẻ chiến thuật môi trường.
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowBondingModal(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-md group active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-ion group-hover:rotate-45 transition-transform" />
                      MÔ PHỎNG LIÊN KẾT HÓA HỌC & CẤU TRÚC VSEPR 3D 🔬
                    </button>
                  </div>
                )}

                {/* Industrial Gas Synthesis Reactor Quick Indicator Badge */}
                {matchingIndustrial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowIndustrialModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-500/40 hover:border-orange-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-orange-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                      <span className="text-orange-200 font-mono">
                        Lò khí công nghiệp (GDPT 2018):{' '}
                        <strong className="text-white">{matchingIndustrial.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-300 underline flex items-center gap-1">
                      Haber-Bosch 🏭 →
                    </span>
                  </div>
                )}

                {/* Coordination Complex Quick Indicator Badge */}
                {matchingComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowComplexModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Phức chất (Hóa 12):{' '}
                        <strong className="text-white">{matchingComplex.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Thuyết CFT ✨ →
                    </span>
                  </div>
                )}

                {/* VSEPR 3D Molecular Geometry Quick Indicator Badge */}
                {matchingVsepr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowVseprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Hình học VSEPR (Hóa 10):{' '}
                        <strong className="text-white">{matchingVsepr.name_vi} ({matchingVsepr.formulaAXE})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô hình 3D 🧭 →
                    </span>
                  </div>
                )}

                {/* Solubility Product & Precipitation Quick Indicator Badge */}
                {matchingSalt && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowSolubilityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tích số tan (K_sp):{' '}
                        <strong className="text-white">{matchingSalt.name_vi} ({matchingSalt.formula}↓)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Kết tủa ⚗️ →
                    </span>
                  </div>
                )}

                {/* Electrolysis & Faraday Simulation Quick Indicator Badge */}
                {matchingElectrolysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowElectrolysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Điện phân & Faraday (Hóa 12):{' '}
                        <strong className="text-white">{matchingElectrolysis.nameEN}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Điện phân ⚡ →
                    </span>
                  </div>
                )}

                {/* Organic Chemistry Mechanism & Stereoisomerism Quick Indicator Badge */}
                {matchingOrganic && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowOrganicModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Hữu Cơ & Đồng Phân:{' '}
                        <strong className="text-white">{matchingOrganic.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hữu cơ 🧪 →
                    </span>
                  </div>
                )}

                {/* Polymer & Macromolecules Quick Indicator Badge */}
                {matchingPolymer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowPolymerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Polime & Vật Liệu:{' '}
                        <strong className="text-white">{matchingPolymer.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Polime 🧪 →
                    </span>
                  </div>
                )}

                {/* Nuclear Chemistry & Radioactivity Quick Indicator Badge */}
                {matchingNuclear && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowNuclearModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phóng Xạ & Hạt Nhân:{' '}
                        <strong className="text-white">{matchingNuclear.parentNuclide.symbol} ({matchingNuclear.nameVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Hạt nhân ☢️ →
                    </span>
                  </div>
                )}

                {/* Green Chemistry & Environmental Sustainability Quick Indicator Badge */}
                {matchingGreen && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowGreenModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Học Xanh & Môi Trường:{' '}
                        <strong className="text-white">
                          {matchingGreen.principle?.titleVI || matchingGreen.gas?.nameVI || matchingGreen.damageTarget?.targetNameVI || 'Bền Vững'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hóa học xanh 🌱 →
                    </span>
                  </div>
                )}

                {/* Crystallography & Unit Cell Quick Indicator Badge */}
                {matchingCrystal && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowCrystalModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gem className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Mạng Tinh Thể (Hóa 10):{' '}
                        <strong className="text-white">{matchingCrystal.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Tinh thể học 💎 →
                    </span>
                  </div>
                )}

                {/* Colloids, Interfaces & Surface Chemistry Quick Indicator Badge */}
                {matchingColloid && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowColloidModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Hóa Keo & Bề Mặt (Hóa 10-11):{' '}
                        <strong className="text-white">
                          {matchingColloid.dispersedSystem?.nameVI || matchingColloid.surfactant?.nameVI || 'Hệ Keo'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Hóa keo 🫧 →
                    </span>
                  </div>
                )}

                {/* Spectrophotometry & Beer-Lambert Law Quick Indicator Badge */}
                {matchingSpectro && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSpectroLampShutter();
                      setShowSpectroModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Quang Phổ Hấp Thụ (Hóa 10-12):{' '}
                        <strong className="text-white">{matchingSpectro.vietnameseName}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Beer-Lambert 🌈 →
                    </span>
                  </div>
                )}

                {/* Mass Spectrometry & Isotope Cluster Quick Indicator Badge */}
                {matchingMassSpec && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMassSpecIonTrapHum();
                      setShowMassSpecModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Phổ Khối Lượng MS (Hóa 10-11):{' '}
                        <strong className="text-white">{matchingMassSpec.vietnameseName} (M = {matchingMassSpec.nominalMass})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ khối m/z 📊 →
                    </span>
                  </div>
                )}

                {/* Infrared Spectroscopy (IR) Quick Indicator Badge */}
                {matchingIR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playInfraredLaserChirp();
                      setShowIRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Phổ Hồng Ngoại IR (Hóa 11):{' '}
                        <strong className="text-white">{matchingIR.vietnameseName} ({matchingIR.functionalGroupVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Phổ IR 🌊 →
                    </span>
                  </div>
                )}

                {/* Nuclear Magnetic Resonance (NMR) Quick Indicator Badge */}
                {matchingNMR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNmrRfPulseBip();
                      setShowNMRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng Từ NMR (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingNMR.vietnameseName} ({matchingNMR.protonSignals.length} mũi ¹H)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Phổ NMR 📡 →
                    </span>
                  </div>
                )}

                {/* Liquid-Liquid Extraction Quick Indicator Badge */}
                {matchingExtraction && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSeparatoryFunnelShake?.();
                      setShowExtractionModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chiết Lỏng - Lỏng (Hóa 11):{' '}
                        <strong className="text-white">{matchingExtraction.vietnameseName} (Hệ số K_D = {matchingExtraction.kd_etherWater})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Phễu Chiết 🧪 →
                    </span>
                  </div>
                )}

                {/* Thin-Layer & Column Chromatography Quick Indicator Badge */}
                {matchingChromatography && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEluentFlowHum?.();
                      setShowChromatographyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Kí TLC / Cột (Hóa 11):{' '}
                        <strong className="text-white">{matchingChromatography.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Sắc Kí Bản Mỏng 🔬 →
                    </span>
                  </div>
                )}

                {/* Recrystallization & Melting Point Quick Indicator Badge */}
                {matchingRecrystallization && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrystalGrowthChime?.();
                      setShowRecrystallizationModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Kết Tinh Lại & Nóng Chảy (Hóa 11):{' '}
                        <strong className="text-white">{matchingRecrystallization.nameVI} ({matchingRecrystallization.meltingPointPureMinC} °C)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Kết Tinh 💎 →
                    </span>
                  </div>
                )}

                {/* Qualitative Organic Functional Group Quick Indicator Badge */}
                {matchingFunctionalGroup && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPrecipitateFormChime?.();
                      setShowFunctionalGroupModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Pipette className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhận Biết Nhóm Chức (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingFunctionalGroup.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Thuốc Thử 🧪 →
                    </span>
                  </div>
                )}

                {/* Gas Laws & Kinetic Molecular Quick Indicator Badge */}
                {matchingGasSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGasPistonCompressionWhoosh?.();
                      setShowGasLawsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Định Luật Chất Khí & Động Học Phân Tử:{' '}
                        <strong className="text-white">{matchingGasSpecies.nameVI} ({matchingGasSpecies.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Mô Phỏng P-V-T 💨 →
                    </span>
                  </div>
                )}

                {/* Osmosis & Colligative Properties Quick Indicator Badge */}
                {matchingOsmosisSolute && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOsmoticFlowTrickle?.();
                      setShowOsmosisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Áp Suất Thẩm Thấu & Tính Chất Nồng Độ:{' '}
                        <strong className="text-white">{matchingOsmosisSolute.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô Phỏng Thẩm Thấu 💧 →
                    </span>
                  </div>
                )}

                {/* Nuclear Shell & Binding Energy Quick Indicator Badge */}
                {matchingNuclearIsotope && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNuclearResonanceHum?.();
                      setShowNuclearShellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Vỏ Hạt Nhân & Năng Lượng Liên Kết:{' '}
                        <strong className="text-white">{matchingNuclearIsotope.nameVI} ({matchingNuclearIsotope.symbol})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mô Phỏng Hạt Nhân ⚛️ →
                    </span>
                  </div>
                )}

                {/* Transition Metal Crystal Field Theory Quick Indicator Badge */}
                {matchingCoordinationComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCoordinationColorShiftChime?.();
                      setShowCrystalFieldModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Thuyết Trường Tinh Thể (CFT):{' '}
                        <strong className="text-white">{matchingCoordinationComplex.metal.symbol} + {matchingCoordinationComplex.ligand.formula}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mô Phỏng Phức Chất 🔮 →
                    </span>
                  </div>
                )}

                {matchingEnzyme && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEnzymeSubstrateLockChime?.();
                      setShowEnzymeKineticsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Xúc Tác Enzyme:{' '}
                        <strong className="text-white">{matchingEnzyme.name} ({matchingEnzyme.ecNumber})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Động Học Michaelis 🧪 →
                    </span>
                  </div>
                )}

                {matchingQuantumHallMaterial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQuantumHallPlateauLockBeep?.();
                      setShowQuantumHallModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Vật Liệu Tô Pô:{' '}
                        <strong className="text-white">{matchingQuantumHallMaterial.name}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Hall Lượng Tử 🌀 →
                    </span>
                  </div>
                )}

                {matchingOzoneSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUvPhotonAbsorptionChime?.();
                      setShowOzoneModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Quang Hóa Khí Quyển:{' '}
                        <strong className="text-white">{matchingOzoneSpecies.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Tầng Ozon ☀️ →
                    </span>
                  </div>
                )}

                {matchingSuperconductor && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSuperconductingMeissnerLevitateHum?.();
                      setShowSuperconductivityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Vật Liệu Siêu Dẫn:{' '}
                        <strong className="text-white">{matchingSuperconductor.name} ({matchingSuperconductor.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Đệm Từ Meissner ⚡ →
                    </span>
                  </div>
                )}

                {matchingFuelCell && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFuelCellProtonFlowHum?.();
                      setShowFuelCellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Pin Nhiên Liệu Hydro:{' '}
                        <strong className="text-white">{matchingFuelCell.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Đặc Tuyến V(j) ⚡ →
                    </span>
                  </div>
                )}

                {matchingBattery && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBatteryIntercalationZip?.();
                      setShowBatteryModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Pin Lithium-Ion:{' '}
                        <strong className="text-white">{matchingBattery.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Xen Phủ Li⁺ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPcr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPcrThermalStepChime?.();
                      setShowPcrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Dna className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Nhân Bản Gen PCR:{' '}
                        <strong className="text-white">{matchingPcr.targetGene} ({matchingPcr.ampliconLengthBp} bp)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Điện Di Gel ⚡ →
                    </span>
                  </div>
                )}

                {matchingCrispr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrisprCas9DsbSnip?.();
                      setShowCrisprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chỉnh Sửa Gen CRISPR:{' '}
                        <strong className="text-white">{matchingCrispr.targetGene} (PAM: {matchingCrispr.pamSequence})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Cắt DSB ⚡ →
                    </span>
                  </div>
                )}

                {matchingThermalAnalysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalFurnaceRampHum?.();
                      setShowThermalAnalysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phân Tích Nhiệt TGA/DSC:{' '}
                        <strong className="text-white">{matchingThermalAnalysis.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Đường TGA ⚡ →
                    </span>
                  </div>
                )}

                {matchingMicroscopy && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playElectronBeamSweepScan?.();
                      setShowMicroscopyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi SEM/TEM:{' '}
                        <strong className="text-white">{matchingMicroscopy.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Quét Chùm Điện Tử 🔬 →
                    </span>
                  </div>
                )}

                {matchingXps && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playXpsPhotonFlash?.();
                      setShowXpsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quang Phổ XPS/ESCA:{' '}
                        <strong className="text-white">{matchingXps.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Chùm Tia X hν ⚡ →
                    </span>
                  </div>
                )}

                {matchingAfm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAfmTipApproachSnap?.();
                      setShowAfmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MoveVertical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi AFM:{' '}
                        <strong className="text-white">{matchingAfm.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ Lực F(z) ⚡ →
                    </span>
                  </div>
                )}

                {matchingSpr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSprResonanceDipSweep?.();
                      setShowSprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng SPR:{' '}
                        <strong className="text-white">{matchingSpr.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sensorgram R(t) ⚡ →
                    </span>
                  </div>
                )}

                {matchingDls && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDlsLaserScatteringPulse?.();
                      setShowDlsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Tán Xạ DLS & Zeta:{' '}
                        <strong className="text-white">{matchingDls.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Cỡ Hạt d_h ⚡ →
                    </span>
                  </div>
                )}

                {matchingCd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCircularDichroismChiralHum?.();
                      setShowCdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Phổ CD Protein:{' '}
                        <strong className="text-white">{matchingCd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Cấu Trúc Bậc II ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsf && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalShiftPeakTone?.();
                      setShowDsfModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Sàng Lọc DSF & ΔTm:{' '}
                        <strong className="text-white">{matchingDsf.targetProteinName.split(' (')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Độ Bền Nhiệt ΔTm ⚡ →
                    </span>
                  </div>
                )}

                {matchingSaxs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGuinierFitLockTone?.();
                      setShowSaxsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scan className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Tán Xạ Tia X SAXS:{' '}
                        <strong className="text-white">{matchingSaxs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Bán Kính Rg & Kratky ⚡ →
                    </span>
                  </div>
                )}

                {matchingCryoEm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFscResolutionLockTone?.();
                      setShowCryoEmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Cryo-EM 3D:{' '}
                        <strong className="text-white">{matchingCryoEm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      FSC 0.143 & Thon Rings ⚡ →
                    </span>
                  </div>
                )}

                {matchingSsNmr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHartmannHahnResonanceLockTone?.();
                      setShowSsNmrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        ssNMR MAS:{' '}
                        <strong className="text-white">{matchingSsNmr.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Góc 54.74° & CP-MAS ⚡ →
                    </span>
                  </div>
                )}

                {matchingStoppedFlow && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playKineticBurstDetectionTone?.();
                      setShowStoppedFlowModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Stopped-Flow:{' '}
                        <strong className="text-white">{matchingStoppedFlow.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Pha Nổ Burst & t_dead ⚡ →
                    </span>
                  </div>
                )}

                {matchingDpi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDeFeijterMassResolvedChime?.();
                      setShowDpiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        DPI Bề Dày:{' '}
                        <strong className="text-white">{matchingDpi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      0.1Å & De Feijter ⚡ →
                    </span>
                  </div>
                )}

                {matchingQcmd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQcmdQuartzResonancePing?.(3);
                      setShowQcmdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        QCM-D Khối Lượng:{' '}
                        <strong className="text-white">{matchingQcmd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sauerbrey & Voigt ⚡ →
                    </span>
                  </div>
                )}

                {matchingOpticalTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOpticalTrapCaptureTone?.(100);
                      setShowOpticalTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Bẫy Quang Học Laser:{' '}
                        <strong className="text-white">{matchingOpticalTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ Lực ⚡ →
                    </span>
                  </div>
                )}

                {matchingMagneticTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMagneticBeadRotationTone?.(0);
                      setShowMagneticTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Magnet className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Bẫy Từ Siêu Xoắn ADN:{' '}
                        <strong className="text-white">{matchingMagneticTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mở Siêu Xoắn ⚡ →
                    </span>
                  </div>
                )}

                {matchingCapillaryElectrophoresis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCapillaryHighVoltageHum?.(20);
                      setShowCapillaryElectrophoresisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Điện Di Mao Quản CE:{' '}
                        <strong className="text-white">{matchingCapillaryElectrophoresis.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Sắc Ký Đồ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPet && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPetPositronAnnihilationPing?.(511);
                      setShowPetModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Hóa Phóng Xạ PET:{' '}
                        <strong className="text-white">{matchingPet.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Vành Trùng Phùng 511 keV ⚡ →
                    </span>
                  </div>
                )}

                {matchingStm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playStmQuantumTunnelingHum?.(1.5);
                      setShowStmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Hiển Vi Xuyên Ngầm STM:{' '}
                        <strong className="text-white">{matchingStm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Quét Xuyên Ngầm Ångström ⚡ →
                    </span>
                  </div>
                )}

                {matchingPumpProbe && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFemtosecondPumpLaserTone?.();
                      setShowPumpProbeModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Bơm-Dò Femtosecond:{' '}
                        <strong className="text-white">{matchingPumpProbe.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Động Học Trạng Thái Chuyển Tiếp ⚡ →
                    </span>
                  </div>
                )}

                {matchingSims && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSimsPrimaryIonSputterTone?.();
                      setShowSimsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Khối Phổ SIMS:{' '}
                        <strong className="text-white">{matchingSims.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Bóc Mòn Phân Tích Độ Sâu ⚡ →
                    </span>
                  </div>
                )}

                {matchingMossbauer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMossbauerDopplerDriveHum?.(0.0);
                      setShowMossbauerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Quang Phổ Mössbauer:{' '}
                        <strong className="text-white">{matchingMossbauer.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Tách Mức Siêu Tinh Vi ⁵⁷Fe ⚡ →
                    </span>
                  </div>
                )}

                {matchingXafs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSynchrotronMonochromatorEnergySweep?.(matchingXafs.xanes.edgeEnergyE0Ev);
                      setShowXafsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Quang Phổ Hấp Thụ XAFS:{' '}
                        <strong className="text-white">{matchingXafs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ XANES / EXAFS ⚡ →
                    </span>
                  </div>
                )}

                {matchingDma && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDmaOscillationFrequencyHum?.(1.0);
                      setShowDmaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Cơ Học Động DMA:{' '}
                        <strong className="text-white">{matchingDma.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Phân Tích Tg & Modulus ⚡ →
                    </span>
                  </div>
                )}

                {matchingItc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCalorimetricHeatExothermHiss?.(matchingItc.bindingEnthalpyDeltaHKjPerMol);
                      setShowItcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhiệt Lượng Kế ITC:{' '}
                        <strong className="text-white">{matchingItc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Đo Nhiệt Enthalpy ΔH° ⚡ →
                    </span>
                  </div>
                )}

                {matchingEsi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTaylorConeHighVoltageHum?.(3.5);
                      setShowEsiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Khối Phổ ESI-MS:{' '}
                        <strong className="text-white">{matchingEsi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ ESI-MS & Đa Tích Điện ⚡ →
                    </span>
                  </div>
                )}

                {matchingSfc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSupercriticalFluidBprPressureHiss?.(150);
                      setShowSfcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký SFC:{' '}
                        <strong className="text-white">{matchingSfc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Tách Chiral CO₂ Siêu Tới Hạn ⚡ →
                    </span>
                  </div>
                )}

                {matchingNta && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHydrodynamicModeDiameterBeep?.(matchingNta.trueModeDiameterNm);
                      setShowNtaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Bám Vết NTA:{' '}
                        <strong className="text-white">{matchingNta.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Kính NTA & Chuyển Động Brown ⚡ →
                    </span>
                  </div>
                )}

                {matchingMst && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermophoreticDepletionPing?.(matchingMst.trueKdMolar);
                      setShowMstModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Nhiệt Di Chuyển MST:{' '}
                        <strong className="text-white">{matchingMst.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Đo Ái Lực Kd & Soret ⚡ →
                    </span>
                  </div>
                )}

                {matchingBli && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBliDipAndReadChime?.();
                      setShowBliModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Giao Thoa BLI:{' '}
                        <strong className="text-white">{matchingBli.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Động Học kon/koff Octet ⚡ →
                    </span>
                  </div>
                )}

                {matchingRmm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playResonatorCantileverTransitBlip?.();
                      setShowRmmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Cộng Hưởng RMM:{' '}
                        <strong className="text-white">{matchingRmm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở SMR Ác-si-mét USP &lt;1788&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playProteinDenaturationTmPeakChime?.();
                      setShowDscModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quét Nhiệt DSC:{' '}
                        <strong className="text-white">{matchingDsc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Độ Ổn Định Protein Tm/Cp ⚡ →
                    </span>
                  </div>
                )}

                {matchingPpc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPpcPressureJumpHiss?.();
                      setShowPpcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Nhiễu Loạn Áp Suất PPC:{' '}
                        <strong className="text-white">{matchingPpc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Độ Nở Nhiệt α IUPAC ⚡ →
                    </span>
                  </div>
                )}

                {matchingSecMals && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playZimmPlotMolarMassChime?.();
                      setShowSecMalsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Tán Xạ SEC-MALS:{' '}
                        <strong className="text-white">{matchingSecMals.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Zimm Plot Mw USP &lt;129&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingAuc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUltracentrifugeRotorHum?.();
                      setShowAucModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Siêu Ly Tâm AUC:{' '}
                        <strong className="text-white">{matchingAuc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mở Svedberg c(s) ⚡ →
                    </span>
                  </div>
                )}

                {matchingAf4 && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAf4CrossFlowChannelHiss?.();
                      setShowAf4Modal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký Dòng AF4:{' '}
                        <strong className="text-white">{matchingAf4.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Fractogram ISO ⚡ →
                    </span>
                  </div>
                )}

                {matchingTda && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTdaCapillaryFlowWhistle?.();
                      setShowTdaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tán Xạ Mao Quản TDA:{' '}
                        <strong className="text-white">{matchingTda.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Taylorgram Đo Kép ⚡ →
                    </span>
                  </div>
                )}

                {matchingFcs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAutocorrelationDiffusionChime?.();
                      setShowFcsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Focus className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Quang Phổ FCS:{' '}
                        <strong className="text-white">{matchingFcs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Mở Confocal G(τ) ⚡ →
                    </span>
                  </div>
                )}

                {matchingFlim && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNanosecondDecayPhasorChime?.();
                      setShowFlimModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Thời Gian Sống FLIM:{' '}
                        <strong className="text-white">{matchingFlim.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở TCSPC Phasor ⚡ →
                    </span>
                  </div>
                )}

                {matchingSmFret && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSmFretLaserAlternationClick?.();
                      setShowSmFretModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        smFRET Đơn Phân Tử:{' '}
                        <strong className="text-white">{matchingSmFret.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở ALEX 2D E-S ⚡ →
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Chemical Reaction Network & Synergistic Cards */}
            {activeTab === 'REACTIONS' && (
              <div role="tabpanel" id="panel-reactions" aria-labelledby="tab-reactions" className="flex flex-col gap-2.5 animate-fadeIn">
                {/* Le Chatelier Equilibrium Card if applicable */}
                {matchingEquilibrium && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-cyan-ion" />
                        <span className="text-xs font-bold text-cyan-200">
                          CÂN BẰNG THUẬN NGHỊCH & NGUYÊN LÝ LE CHATELIER
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                        GDPT 2018 HÓA 11
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingEquilibrium.equation} (ΔᵣH°₂₉₈ = {matchingEquilibrium.delta_r_H298_kJ} kJ)
                    </div>
                    <p className="text-[11px] text-cyan-100/80 leading-snug">
                      {matchingEquilibrium.pedagogicalRationaleVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowEquilibriumModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Scale className="w-3.5 h-3.5 text-cyan-ion" />
                      MÔ PHỎNG NGUYÊN LÝ CHUYỂN DỊCH CÂN BẰNG LE CHATELIER ⚖️
                    </button>
                  </div>
                )}

                {/* Galvanic Electrochemical Cell Card if applicable */}
                {matchingGalvanic && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/70 to-orange-950/70 border border-amber-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-200">
                          PIN ĐIỆN HÓA & PHƯƠNG TRÌNH NERNST
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                        GDPT 2018 HÓA 12
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingGalvanic.preset.nameVi} (E° = +{matchingGalvanic.preset.standardPotentialE0.toFixed(2)} V)
                    </div>
                    <p className="text-[11px] text-amber-100/80 leading-snug">
                      {matchingGalvanic.preset.descriptionVi}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowGalvanicModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs font-mono font-bold text-amber-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      MÔ PHỎNG PIN ĐIỆN HÓA, VOLTMETER & PHƯƠNG TRÌNH NERNST ⚡
                    </button>
                  </div>
                )}

                {/* Acid-Base Titration Card if applicable */}
                {matchingTitration && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-pink-950/70 to-purple-950/70 border border-pink-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-pink-400" />
                        <span className="text-xs font-bold text-pink-200">
                          CHUẨN ĐỘ AXIT - BAZƠ & ĐƯỜNG CONG pH
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono font-bold">
                        GDPT 2018 HÓA 11
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingTitration.nameVi}
                    </div>
                    <p className="text-[11px] text-pink-100/80 leading-snug">
                      {matchingTitration.descriptionVi}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowTitrationModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/50 text-xs font-mono font-bold text-pink-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <FlaskConical className="w-3.5 h-3.5 text-pink-400" />
                      MÔ PHỎNG BURET, BÌNH TAM GIÁC & ĐƯỜNG CONG pH 🧪
                    </button>
                  </div>
                )}

                {/* Industrial Gas Synthesis Reactor Card if applicable */}
                {matchingIndustrial && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-orange-950/70 to-amber-950/70 border border-orange-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-bold text-orange-200">
                          TỔNG HỢP KHÍ CÔNG NGHIỆP & BÀI TOÁN THỎA HIỆP
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono font-bold">
                        GDPT 2018 HÓA 11 & 12
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingIndustrial.name_vi} ({matchingIndustrial.equation})
                    </div>
                    <p className="text-[11px] text-orange-100/80 leading-snug">
                      {matchingIndustrial.pedagogicalRationaleVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowIndustrialModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/50 text-xs font-mono font-bold text-orange-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Factory className="w-3.5 h-3.5 text-orange-400" />
                      MÔ PHỎNG LÒ PHẢN ỨNG, LE CHATELIER & VÒNG TUẦN HOÀN 🏭
                    </button>
                  </div>
                )}

                {/* Coordination Complex Card if applicable */}
                {matchingComplex && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border border-purple-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-200">
                          HÓA HỌC PHỨC CHẤT & THUYẾT TRƯỜNG TINH THỂ
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
                        GDPT 2018 HÓA 12
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingComplex.name_vi} ({matchingComplex.formula})
                    </div>
                    <p className="text-[11px] text-purple-100/80 leading-snug">
                      {matchingComplex.pedagogicalRationaleVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowComplexModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-xs font-mono font-bold text-purple-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      MÔ PHỎNG PHỨC CHẤT, THẾ PHỐI TỬ & TRƯỜNG TINH THỂ ✨
                    </button>
                  </div>
                )}

                {/* VSEPR 3D Molecular Geometry Card if applicable */}
                {matchingVsepr && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-cyan-200">
                          HÌNH HỌC PHÂN TỬ VSEPR & LỰC ĐẨY CẶP E TỰ DO
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                        GDPT 2018 HÓA 10
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingVsepr.name_vi} ({matchingVsepr.formula} • {matchingVsepr.formulaAXE})
                    </div>
                    <p className="text-[11px] text-cyan-100/80 leading-snug">
                      {matchingVsepr.descriptionVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowVseprModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      MÔ PHỎNG VSEPR 3D, BIẾN DẠNG GÓC & LAI HÓA 🧭
                    </button>
                  </div>
                )}

                {/* Solubility Product & Precipitation Card if applicable */}
                {matchingSalt && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-teal-950/70 to-emerald-950/70 border border-teal-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-bold text-teal-200">
                          CÂN BẰNG TÍCH SỐ TAN & KẾT TỦA (K_sp)
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono font-bold">
                        {matchingSalt.curriculumBenchmarkVI}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingSalt.name_vi} ({matchingSalt.formula}↓ • K_sp ≈ {matchingSalt.ksp.toExponential(1)})
                    </div>
                    <p className="text-[11px] text-teal-100/80 leading-snug">
                      {matchingSalt.appearanceVI} • {matchingSalt.solubilityInAcidVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowSolubilityModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/50 text-xs font-mono font-bold text-teal-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Droplets className="w-3.5 h-3.5 text-teal-400" />
                      MÔ PHỎNG TÍCH SỐ TAN, ION CHUNG & PHÂN ĐOẠN ⚗️
                    </button>
                  </div>
                )}

                {/* Electrolysis & Faraday's Laws Card if applicable */}
                {matchingElectrolysis && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/70 to-yellow-950/70 border border-amber-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-200">
                          ĐIỆN PHÂN & ĐỊNH LUẬT FARADAY (HÓA 12)
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                        {matchingElectrolysis.medium === 'MOLTEN' ? 'NÓNG CHẢY' : 'DUNG DỊCH'}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingElectrolysis.nameVI}
                    </div>
                    <p className="text-[11px] text-amber-100/80 leading-snug">
                      {matchingElectrolysis.overallEquation}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowElectrolysisModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs font-mono font-bold text-amber-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      MÔ PHỎNG ĐIỆN PHÂN, TÍNH TOÁN FARADAY & SƠ ĐỒ ĐIỆN CỰC ⚡
                    </button>
                  </div>
                )}

                {/* Organic Chemistry Mechanisms & Stereoisomerism Card if applicable */}
                {matchingOrganic && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-200">
                          HÓA HỌC HỮU CƠ & ĐỒNG PHÂN (HÓA 11-12)
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        GDPT 2018
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingOrganic.titleVI}
                    </div>
                    <p className="text-[11px] text-emerald-100/80 leading-snug">
                      {matchingOrganic.descriptionVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowOrganicModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-xs font-mono font-bold text-emerald-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                      MÔ PHỎNG ĐỒNG PHÂN (CIS/TRANS, C*), CƠ CHẾ & THUỐC THỬ 🧪
                    </button>
                  </div>
                )}

                {/* Polymerization & Macromolecules Interactive Launch Card */}
                {matchingPolymer && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> Polime & Vật Liệu Polime (Hóa 12)
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        {matchingPolymer.polymerizationType === 'ADDITION' ? 'Trùng Hợp' : 'Trùng Ngưng'}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingPolymer.nameVI}
                    </div>
                    <p className="text-[11px] text-cyan-100/80 leading-snug">
                      Công thức mắt xích: {matchingPolymer.repeatingUnitFormula} • Phản ứng: {matchingPolymer.reactionEquationVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowPolymerModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      MÔ PHỎNG MẠCH POLIME, MẠNG 3D & LƯU HÓA CAO SU 🧪
                    </button>
                  </div>
                )}

                {/* Nuclear Chemistry & Radioactivity Interactive Launch Card */}
                {matchingNuclear && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/70 to-orange-950/70 border border-amber-500/50 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                        <Radiation className="w-3.5 h-3.5" /> Hạt Nhân & Phóng Xạ (Hóa 10 & Vật Lý 12)
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                        {matchingNuclear.decayMode}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/95 bg-black/50 p-2 rounded border border-white/10 font-bold">
                      {matchingNuclear.parentNuclide.symbol} ({matchingNuclear.nameVI})
                    </div>
                    <p className="text-[11px] text-amber-100/80 leading-snug">
                      Phương trình: {matchingNuclear.decayEquationVI} • Chu kỳ bán rã t₁/₂: {matchingNuclear.halfLifeDisplayVI}
                    </p>
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        setShowNuclearModal(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs font-mono font-bold text-amber-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Radiation className="w-3.5 h-3.5 text-amber-400" />
                      MÔ PHỎNG BÁN RÃ, ĐỊNH TUỔI ¹⁴C & NĂNG LƯỢNG LIÊN KẾT ☢️
                    </button>
                  </div>
                )}

                <div className="text-xs font-mono text-slate-400">
                  Các thẻ bài có phản ứng hóa học hoặc phối hợp chiến thuật với <strong className="text-cyan-300">{card.name}</strong>:
                </div>

                {relatedLinks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
                    {relatedLinks.map((link, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (onSelectCard) {
                            sound.playUiClick();
                            onSelectCard(link.targetCard);
                          }
                        }}
                        className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-ion/50 cursor-pointer transition-all flex flex-col gap-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-cyan-200 group-hover:text-cyan-ion transition-colors">
                            {link.targetCard.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 font-mono">
                            {link.relationLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                          {link.reason}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-slate-400">
                          <span>Sở hữu: {link.ownedCount} bản sao</span>
                          <span className="text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            Khảo sát <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-900/60 border border-white/10 text-center space-y-2">
                    <Network className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-bold text-slate-300">Chưa có liên kết phản ứng trực tiếp</p>
                    <p className="text-xs text-slate-400">
                      Thẻ bài này hoạt động độc lập hoặc thuộc nhóm khí hiếm/chất trơ đặc biệt.
                    </p>
                  </div>
                )}

                {/* Industrial Gas Synthesis Reactor Quick Indicator Badge */}
                {matchingIndustrial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowIndustrialModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-500/40 hover:border-orange-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-orange-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                      <span className="text-orange-200 font-mono">
                        Lò khí công nghiệp (GDPT 2018):{' '}
                        <strong className="text-white">{matchingIndustrial.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-300 underline flex items-center gap-1">
                      Haber-Bosch 🏭 →
                    </span>
                  </div>
                )}

                {/* Coordination Complex Quick Indicator Badge */}
                {matchingComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowComplexModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Phức chất (Hóa 12):{' '}
                        <strong className="text-white">{matchingComplex.name_vi}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Thuyết CFT ✨ →
                    </span>
                  </div>
                )}

                {/* VSEPR 3D Molecular Geometry Quick Indicator Badge */}
                {matchingVsepr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowVseprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Hình học VSEPR (Hóa 10):{' '}
                        <strong className="text-white">{matchingVsepr.name_vi} ({matchingVsepr.formulaAXE})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô hình 3D 🧭 →
                    </span>
                  </div>
                )}

                {/* Solubility Product & Precipitation Quick Indicator Badge */}
                {matchingSalt && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowSolubilityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tích số tan (K_sp):{' '}
                        <strong className="text-white">{matchingSalt.name_vi} ({matchingSalt.formula}↓)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Kết tủa ⚗️ →
                    </span>
                  </div>
                )}

                {/* Electrolysis & Faraday Simulation Quick Indicator Badge */}
                {matchingElectrolysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowElectrolysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Điện phân & Faraday (Hóa 12):{' '}
                        <strong className="text-white">{matchingElectrolysis.nameEN}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Điện phân ⚡ →
                    </span>
                  </div>
                )}

                {/* Organic Chemistry Mechanism & Stereoisomerism Quick Indicator Badge */}
                {matchingOrganic && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowOrganicModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Hữu Cơ & Đồng Phân:{' '}
                        <strong className="text-white">{matchingOrganic.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hữu cơ 🧪 →
                    </span>
                  </div>
                )}

                {/* Polymer & Macromolecules Quick Indicator Badge */}
                {matchingPolymer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowPolymerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Polime & Vật Liệu:{' '}
                        <strong className="text-white">{matchingPolymer.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Polime 🧪 →
                    </span>
                  </div>
                )}

                {/* Nuclear Chemistry & Radioactivity Quick Indicator Badge */}
                {matchingNuclear && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowNuclearModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phóng Xạ & Hạt Nhân:{' '}
                        <strong className="text-white">{matchingNuclear.parentNuclide.symbol} ({matchingNuclear.nameVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Hạt nhân ☢️ →
                    </span>
                  </div>
                )}

                {/* Green Chemistry & Environmental Sustainability Quick Indicator Badge */}
                {matchingGreen && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowGreenModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Hóa Học Xanh & Môi Trường:{' '}
                        <strong className="text-white">
                          {matchingGreen.principle?.titleVI || matchingGreen.gas?.nameVI || matchingGreen.damageTarget?.targetNameVI || 'Bền Vững'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Hóa học xanh 🌱 →
                    </span>
                  </div>
                )}

                {/* Crystallography & Unit Cell Quick Indicator Badge */}
                {matchingCrystal && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowCrystalModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gem className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Mạng Tinh Thể (Hóa 10):{' '}
                        <strong className="text-white">{matchingCrystal.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Tinh thể học 💎 →
                    </span>
                  </div>
                )}

                {/* Colloids, Interfaces & Surface Chemistry Quick Indicator Badge */}
                {matchingColloid && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      setShowColloidModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Hóa Keo & Bề Mặt (Hóa 10-11):{' '}
                        <strong className="text-white">
                          {matchingColloid.dispersedSystem?.nameVI || matchingColloid.surfactant?.nameVI || 'Hệ Keo'}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Hóa keo 🫧 →
                    </span>
                  </div>
                )}

                {/* Spectrophotometry & Beer-Lambert Law Quick Indicator Badge */}
                {matchingSpectro && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSpectroLampShutter();
                      setShowSpectroModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Quang Phổ Hấp Thụ (Hóa 10-12):{' '}
                        <strong className="text-white">{matchingSpectro.vietnameseName}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Beer-Lambert 🌈 →
                    </span>
                  </div>
                )}

                {/* Mass Spectrometry & Isotope Cluster Quick Indicator Badge */}
                {matchingMassSpec && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMassSpecIonTrapHum();
                      setShowMassSpecModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Phổ Khối Lượng MS (Hóa 10-11):{' '}
                        <strong className="text-white">{matchingMassSpec.vietnameseName} (M = {matchingMassSpec.nominalMass})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ khối m/z 📊 →
                    </span>
                  </div>
                )}

                {/* Infrared Spectroscopy (IR) Quick Indicator Badge */}
                {matchingIR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playInfraredLaserChirp();
                      setShowIRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Phổ Hồng Ngoại IR (Hóa 11):{' '}
                        <strong className="text-white">{matchingIR.vietnameseName} ({matchingIR.functionalGroupVI})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Phổ IR 🌊 →
                    </span>
                  </div>
                )}

                {/* Nuclear Magnetic Resonance (NMR) Quick Indicator Badge */}
                {matchingNMR && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNmrRfPulseBip();
                      setShowNMRModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng Từ NMR (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingNMR.vietnameseName} ({matchingNMR.protonSignals.length} mũi ¹H)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Phổ NMR 📡 →
                    </span>
                  </div>
                )}

                {/* Liquid-Liquid Extraction Quick Indicator Badge */}
                {matchingExtraction && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSeparatoryFunnelShake?.();
                      setShowExtractionModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chiết Lỏng - Lỏng (Hóa 11):{' '}
                        <strong className="text-white">{matchingExtraction.vietnameseName} (Hệ số K_D = {matchingExtraction.kd_etherWater})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Phễu Chiết 🧪 →
                    </span>
                  </div>
                )}

                {/* Thin-Layer & Column Chromatography Quick Indicator Badge */}
                {matchingChromatography && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEluentFlowHum?.();
                      setShowChromatographyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Kí TLC / Cột (Hóa 11):{' '}
                        <strong className="text-white">{matchingChromatography.titleVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Sắc Kí Bản Mỏng 🔬 →
                    </span>
                  </div>
                )}

                {/* Recrystallization & Melting Point Quick Indicator Badge */}
                {matchingRecrystallization && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrystalGrowthChime?.();
                      setShowRecrystallizationModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Kết Tinh Lại & Nóng Chảy (Hóa 11):{' '}
                        <strong className="text-white">{matchingRecrystallization.nameVI} ({matchingRecrystallization.meltingPointPureMinC} °C)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Kết Tinh 💎 →
                    </span>
                  </div>
                )}

                {/* Qualitative Organic Functional Group Quick Indicator Badge */}
                {matchingFunctionalGroup && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPrecipitateFormChime?.();
                      setShowFunctionalGroupModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Pipette className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhận Biết Nhóm Chức (Hóa 11-12):{' '}
                        <strong className="text-white">{matchingFunctionalGroup.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Thuốc Thử 🧪 →
                    </span>
                  </div>
                )}

                {/* Gas Laws & Kinetic Molecular Quick Indicator Badge */}
                {matchingGasSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGasPistonCompressionWhoosh?.();
                      setShowGasLawsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Định Luật Chất Khí & Động Học Phân Tử:{' '}
                        <strong className="text-white">{matchingGasSpecies.nameVI} ({matchingGasSpecies.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Mô Phỏng P-V-T 💨 →
                    </span>
                  </div>
                )}

                {/* Osmosis & Colligative Properties Quick Indicator Badge */}
                {matchingOsmosisSolute && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOsmoticFlowTrickle?.();
                      setShowOsmosisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Áp Suất Thẩm Thấu & Tính Chất Nồng Độ:{' '}
                        <strong className="text-white">{matchingOsmosisSolute.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mô Phỏng Thẩm Thấu 💧 →
                    </span>
                  </div>
                )}

                {/* Nuclear Shell & Binding Energy Quick Indicator Badge */}
                {matchingNuclearIsotope && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNuclearResonanceHum?.();
                      setShowNuclearShellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Vỏ Hạt Nhân & Năng Lượng Liên Kết:{' '}
                        <strong className="text-white">{matchingNuclearIsotope.nameVI} ({matchingNuclearIsotope.symbol})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mô Phỏng Hạt Nhân ⚛️ →
                    </span>
                  </div>
                )}

                {/* Transition Metal Crystal Field Theory Quick Indicator Badge */}
                {matchingCoordinationComplex && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCoordinationColorShiftChime?.();
                      setShowCrystalFieldModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Thuyết Trường Tinh Thể (CFT):{' '}
                        <strong className="text-white">{matchingCoordinationComplex.metal.symbol} + {matchingCoordinationComplex.ligand.formula}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mô Phỏng Phức Chất 🔮 →
                    </span>
                  </div>
                )}

                {matchingEnzyme && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playEnzymeSubstrateLockChime?.();
                      setShowEnzymeKineticsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Xúc Tác Enzyme:{' '}
                        <strong className="text-white">{matchingEnzyme.name} ({matchingEnzyme.ecNumber})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Động Học Michaelis 🧪 →
                    </span>
                  </div>
                )}

                {matchingQuantumHallMaterial && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQuantumHallPlateauLockBeep?.();
                      setShowQuantumHallModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Vật Liệu Tô Pô:{' '}
                        <strong className="text-white">{matchingQuantumHallMaterial.name}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Hall Lượng Tử 🌀 →
                    </span>
                  </div>
                )}

                {matchingOzoneSpecies && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUvPhotonAbsorptionChime?.();
                      setShowOzoneModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Quang Hóa Khí Quyển:{' '}
                        <strong className="text-white">{matchingOzoneSpecies.nameVI}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Tầng Ozon ☀️ →
                    </span>
                  </div>
                )}

                {matchingSuperconductor && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSuperconductingMeissnerLevitateHum?.();
                      setShowSuperconductivityModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Vật Liệu Siêu Dẫn:{' '}
                        <strong className="text-white">{matchingSuperconductor.name} ({matchingSuperconductor.formula})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Đệm Từ Meissner ⚡ →
                    </span>
                  </div>
                )}

                {matchingFuelCell && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFuelCellProtonFlowHum?.();
                      setShowFuelCellModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 hover:border-sky-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-sky-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sky-200 font-mono">
                        Pin Nhiên Liệu Hydro:{' '}
                        <strong className="text-white">{matchingFuelCell.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 underline flex items-center gap-1">
                      Đặc Tuyến V(j) ⚡ →
                    </span>
                  </div>
                )}

                {matchingBattery && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBatteryIntercalationZip?.();
                      setShowBatteryModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Pin Lithium-Ion:{' '}
                        <strong className="text-white">{matchingBattery.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Xen Phủ Li⁺ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPcr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPcrThermalStepChime?.();
                      setShowPcrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Dna className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Nhân Bản Gen PCR:{' '}
                        <strong className="text-white">{matchingPcr.targetGene} ({matchingPcr.ampliconLengthBp} bp)</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Điện Di Gel ⚡ →
                    </span>
                  </div>
                )}

                {matchingCrispr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCrisprCas9DsbSnip?.();
                      setShowCrisprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Chỉnh Sửa Gen CRISPR:{' '}
                        <strong className="text-white">{matchingCrispr.targetGene} (PAM: {matchingCrispr.pamSequence})</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Cắt DSB ⚡ →
                    </span>
                  </div>
                )}

                {matchingThermalAnalysis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalFurnaceRampHum?.();
                      setShowThermalAnalysisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Phân Tích Nhiệt TGA/DSC:{' '}
                        <strong className="text-white">{matchingThermalAnalysis.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Đường TGA ⚡ →
                    </span>
                  </div>
                )}

                {matchingMicroscopy && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playElectronBeamSweepScan?.();
                      setShowMicroscopyModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi SEM/TEM:{' '}
                        <strong className="text-white">{matchingMicroscopy.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Quét Chùm Điện Tử 🔬 →
                    </span>
                  </div>
                )}

                {matchingXps && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playXpsPhotonFlash?.();
                      setShowXpsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quang Phổ XPS/ESCA:{' '}
                        <strong className="text-white">{matchingXps.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Chùm Tia X hν ⚡ →
                    </span>
                  </div>
                )}

                {matchingAfm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAfmTipApproachSnap?.();
                      setShowAfmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MoveVertical className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Kính Hiển Vi AFM:{' '}
                        <strong className="text-white">{matchingAfm.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Phổ Lực F(z) ⚡ →
                    </span>
                  </div>
                )}

                {matchingSpr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSprResonanceDipSweep?.();
                      setShowSprModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Cộng Hưởng SPR:{' '}
                        <strong className="text-white">{matchingSpr.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sensorgram R(t) ⚡ →
                    </span>
                  </div>
                )}

                {matchingDls && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDlsLaserScatteringPulse?.();
                      setShowDlsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Tán Xạ DLS & Zeta:{' '}
                        <strong className="text-white">{matchingDls.nameVI.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Cỡ Hạt d_h ⚡ →
                    </span>
                  </div>
                )}

                {matchingCd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCircularDichroismChiralHum?.();
                      setShowCdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Phổ CD Protein:{' '}
                        <strong className="text-white">{matchingCd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Cấu Trúc Bậc II ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsf && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermalShiftPeakTone?.();
                      setShowDsfModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Sàng Lọc DSF & ΔTm:{' '}
                        <strong className="text-white">{matchingDsf.targetProteinName.split(' (')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Độ Bền Nhiệt ΔTm ⚡ →
                    </span>
                  </div>
                )}

                {matchingSaxs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playGuinierFitLockTone?.();
                      setShowSaxsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scan className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Tán Xạ Tia X SAXS:{' '}
                        <strong className="text-white">{matchingSaxs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Bán Kính Rg & Kratky ⚡ →
                    </span>
                  </div>
                )}

                {matchingCryoEm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFscResolutionLockTone?.();
                      setShowCryoEmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Cryo-EM 3D:{' '}
                        <strong className="text-white">{matchingCryoEm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      FSC 0.143 & Thon Rings ⚡ →
                    </span>
                  </div>
                )}

                {matchingSsNmr && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHartmannHahnResonanceLockTone?.();
                      setShowSsNmrModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        ssNMR MAS:{' '}
                        <strong className="text-white">{matchingSsNmr.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Góc 54.74° & CP-MAS ⚡ →
                    </span>
                  </div>
                )}

                {matchingStoppedFlow && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playKineticBurstDetectionTone?.();
                      setShowStoppedFlowModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Stopped-Flow:{' '}
                        <strong className="text-white">{matchingStoppedFlow.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Pha Nổ Burst & t_dead ⚡ →
                    </span>
                  </div>
                )}

                {matchingDpi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDeFeijterMassResolvedChime?.();
                      setShowDpiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        DPI Bề Dày:{' '}
                        <strong className="text-white">{matchingDpi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      0.1Å & De Feijter ⚡ →
                    </span>
                  </div>
                )}

                {matchingQcmd && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playQcmdQuartzResonancePing?.(3);
                      setShowQcmdModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        QCM-D Khối Lượng:{' '}
                        <strong className="text-white">{matchingQcmd.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Sauerbrey & Voigt ⚡ →
                    </span>
                  </div>
                )}

                {matchingOpticalTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playOpticalTrapCaptureTone?.(100);
                      setShowOpticalTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Bẫy Quang Học Laser:{' '}
                        <strong className="text-white">{matchingOpticalTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ Lực ⚡ →
                    </span>
                  </div>
                )}

                {matchingMagneticTweezers && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMagneticBeadRotationTone?.(0);
                      setShowMagneticTweezersModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-purple-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Magnet className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-200 font-mono">
                        Bẫy Từ Siêu Xoắn ADN:{' '}
                        <strong className="text-white">{matchingMagneticTweezers.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 underline flex items-center gap-1">
                      Mở Siêu Xoắn ⚡ →
                    </span>
                  </div>
                )}

                {matchingCapillaryElectrophoresis && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCapillaryHighVoltageHum?.(20);
                      setShowCapillaryElectrophoresisModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Điện Di Mao Quản CE:{' '}
                        <strong className="text-white">{matchingCapillaryElectrophoresis.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Sắc Ký Đồ ⚡ →
                    </span>
                  </div>
                )}

                {matchingPet && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPetPositronAnnihilationPing?.(511);
                      setShowPetModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radiation className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Hóa Phóng Xạ PET:{' '}
                        <strong className="text-white">{matchingPet.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Vành Trùng Phùng 511 keV ⚡ →
                    </span>
                  </div>
                )}

                {matchingStm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playStmQuantumTunnelingHum?.(1.5);
                      setShowStmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Hiển Vi Xuyên Ngầm STM:{' '}
                        <strong className="text-white">{matchingStm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Quét Xuyên Ngầm Ångström ⚡ →
                    </span>
                  </div>
                )}

                {matchingPumpProbe && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playFemtosecondPumpLaserTone?.();
                      setShowPumpProbeModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Bơm-Dò Femtosecond:{' '}
                        <strong className="text-white">{matchingPumpProbe.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Động Học Trạng Thái Chuyển Tiếp ⚡ →
                    </span>
                  </div>
                )}

                {matchingSims && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSimsPrimaryIonSputterTone?.();
                      setShowSimsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Khối Phổ SIMS:{' '}
                        <strong className="text-white">{matchingSims.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Bóc Mòn Phân Tích Độ Sâu ⚡ →
                    </span>
                  </div>
                )}

                {matchingMossbauer && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playMossbauerDopplerDriveHum?.(0.0);
                      setShowMossbauerModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Quang Phổ Mössbauer:{' '}
                        <strong className="text-white">{matchingMossbauer.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Tách Mức Siêu Tinh Vi ⁵⁷Fe ⚡ →
                    </span>
                  </div>
                )}

                {matchingXafs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSynchrotronMonochromatorEnergySweep?.(matchingXafs.xanes.edgeEnergyE0Ev);
                      setShowXafsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Quang Phổ Hấp Thụ XAFS:{' '}
                        <strong className="text-white">{matchingXafs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ XANES / EXAFS ⚡ →
                    </span>
                  </div>
                )}

                {matchingDma && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playDmaOscillationFrequencyHum?.(1.0);
                      setShowDmaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Cơ Học Động DMA:{' '}
                        <strong className="text-white">{matchingDma.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Phân Tích Tg & Modulus ⚡ →
                    </span>
                  </div>
                )}

                {matchingItc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playCalorimetricHeatExothermHiss?.(matchingItc.bindingEnthalpyDeltaHKjPerMol);
                      setShowItcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-rose-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span className="text-rose-200 font-mono">
                        Nhiệt Lượng Kế ITC:{' '}
                        <strong className="text-white">{matchingItc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 underline flex items-center gap-1">
                      Mở Đo Nhiệt Enthalpy ΔH° ⚡ →
                    </span>
                  </div>
                )}

                {matchingEsi && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTaylorConeHighVoltageHum?.(3.5);
                      setShowEsiModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Khối Phổ ESI-MS:{' '}
                        <strong className="text-white">{matchingEsi.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Phổ ESI-MS & Đa Tích Điện ⚡ →
                    </span>
                  </div>
                )}

                {matchingSfc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSupercriticalFluidBprPressureHiss?.(150);
                      setShowSfcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký SFC:{' '}
                        <strong className="text-white">{matchingSfc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Tách Chiral CO₂ Siêu Tới Hạn ⚡ →
                    </span>
                  </div>
                )}

                {matchingNta && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playHydrodynamicModeDiameterBeep?.(matchingNta.trueModeDiameterNm);
                      setShowNtaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-indigo-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-indigo-200 font-mono">
                        Bám Vết NTA:{' '}
                        <strong className="text-white">{matchingNta.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 underline flex items-center gap-1">
                      Mở Kính NTA & Chuyển Động Brown ⚡ →
                    </span>
                  </div>
                )}

                {matchingMst && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playThermophoreticDepletionPing?.(matchingMst.trueKdMolar);
                      setShowMstModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Nhiệt Di Chuyển MST:{' '}
                        <strong className="text-white">{matchingMst.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Đo Ái Lực Kd & Soret ⚡ →
                    </span>
                  </div>
                )}

                {matchingBli && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playBliDipAndReadChime?.();
                      setShowBliModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-cyan-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-cyan-200 font-mono">
                        Giao Thoa BLI:{' '}
                        <strong className="text-white">{matchingBli.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 underline flex items-center gap-1">
                      Mở Động Học kon/koff Octet ⚡ →
                    </span>
                  </div>
                )}

                {matchingRmm && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playResonatorCantileverTransitBlip?.();
                      setShowRmmModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Cộng Hưởng RMM:{' '}
                        <strong className="text-white">{matchingRmm.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở SMR Ác-si-mét USP &lt;1788&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingDsc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playProteinDenaturationTmPeakChime?.();
                      setShowDscModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Quét Nhiệt DSC:{' '}
                        <strong className="text-white">{matchingDsc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở Độ Ổn Định Protein Tm/Cp ⚡ →
                    </span>
                  </div>
                )}

                {matchingPpc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playPpcPressureJumpHiss?.();
                      setShowPpcModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Nhiễu Loạn Áp Suất PPC:{' '}
                        <strong className="text-white">{matchingPpc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Độ Nở Nhiệt α IUPAC ⚡ →
                    </span>
                  </div>
                )}

                {matchingSecMals && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playZimmPlotMolarMassChime?.();
                      setShowSecMalsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/40 hover:border-violet-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-violet-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="text-violet-200 font-mono">
                        Tán Xạ SEC-MALS:{' '}
                        <strong className="text-white">{matchingSecMals.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-300 underline flex items-center gap-1">
                      Mở Zimm Plot Mw USP &lt;129&gt; ⚡ →
                    </span>
                  </div>
                )}

                {matchingAuc && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playUltracentrifugeRotorHum?.();
                      setShowAucModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-blue-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-200 font-mono">
                        Siêu Ly Tâm AUC:{' '}
                        <strong className="text-white">{matchingAuc.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 underline flex items-center gap-1">
                      Mở Svedberg c(s) ⚡ →
                    </span>
                  </div>
                )}

                {matchingAf4 && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAf4CrossFlowChannelHiss?.();
                      setShowAf4Modal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        Sắc Ký Dòng AF4:{' '}
                        <strong className="text-white">{matchingAf4.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở Fractogram ISO ⚡ →
                    </span>
                  </div>
                )}

                {matchingTda && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playTdaCapillaryFlowWhistle?.();
                      setShowTdaModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-teal-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span className="text-teal-200 font-mono">
                        Tán Xạ Mao Quản TDA:{' '}
                        <strong className="text-white">{matchingTda.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-300 underline flex items-center gap-1">
                      Mở Taylorgram Đo Kép ⚡ →
                    </span>
                  </div>
                )}

                {matchingFcs && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playAutocorrelationDiffusionChime?.();
                      setShowFcsModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 hover:border-fuchsia-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-fuchsia-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Focus className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="text-fuchsia-200 font-mono">
                        Quang Phổ FCS:{' '}
                        <strong className="text-white">{matchingFcs.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300 underline flex items-center gap-1">
                      Mở Confocal G(τ) ⚡ →
                    </span>
                  </div>
                )}

                {matchingFlim && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playNanosecondDecayPhasorChime?.();
                      setShowFlimModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:border-amber-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-amber-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-amber-200 font-mono">
                        Thời Gian Sống FLIM:{' '}
                        <strong className="text-white">{matchingFlim.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 underline flex items-center gap-1">
                      Mở TCSPC Phasor ⚡ →
                    </span>
                  </div>
                )}

                {matchingSmFret && (
                  <div
                    onClick={() => {
                      sound.playUiClick();
                      sound.playSmFretLaserAlternationClick?.();
                      setShowSmFretModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-300 flex items-center justify-between text-xs cursor-pointer transition-all hover:bg-emerald-950/60 group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-emerald-200 font-mono">
                        smFRET Đơn Phân Tử:{' '}
                        <strong className="text-white">{matchingSmFret.vietnameseName.split('(')[0]}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 underline flex items-center gap-1">
                      Mở ALEX 2D E-S ⚡ →
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded VSEPR Bonding Visualizer Modal */}
      <BondingVisualizerModal
        isOpen={showBondingModal}
        onClose={() => setShowBondingModal(false)}
      />

      {/* Interactive Chemical Equilibrium Le Chatelier Modal */}
      {showEquilibriumModal && matchingEquilibrium && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-ion/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowEquilibriumModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ cân bằng hóa học"
            >
              <X className="w-5 h-5" />
            </button>
            <ChemicalEquilibriumVisualizer initialReactionId={matchingEquilibrium.id} />
          </div>
        </div>
      )}

      {/* Interactive Galvanic Electrochemical Cell & Nernst Modal */}
      {showGalvanicModal && matchingGalvanic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-ion/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowGalvanicModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ pin điện hóa"
            >
              <X className="w-5 h-5" />
            </button>
            <GalvanicCellVisualizer initialPresetId={matchingGalvanic.preset.id} />
          </div>
        </div>
      )}

      {/* Interactive Acid-Base Titration Curve Modal */}
      {showTitrationModal && matchingTitration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-pink-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowTitrationModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ chuẩn độ axit - bazơ"
            >
              <X className="w-5 h-5" />
            </button>
            <TitrationCurveVisualizer initialScenarioId={matchingTitration.id} />
          </div>
        </div>
      )}

      {/* Interactive Industrial Gas Synthesis Reactor Modal */}
      {showIndustrialModal && matchingIndustrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-orange-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowIndustrialModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ lò phản ứng công nghiệp"
            >
              <X className="w-5 h-5" />
            </button>
            <IndustrialSynthesisVisualizer initialProcessId={matchingIndustrial.id} />
          </div>
        </div>
      )}

      {/* Interactive Coordination Complex & Crystal Field Splitting Modal */}
      {showComplexModal && matchingComplex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-purple-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowComplexModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ phức chất"
            >
              <X className="w-5 h-5" />
            </button>
            <CoordinationComplexVisualizer initialComplexId={matchingComplex.id} />
          </div>
        </div>
      )}

      {/* Interactive 3D VSEPR Molecular Geometry & Gillespie-Nyholm Modal */}
      {showVseprModal && matchingVsepr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-ion/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowVseprModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ VSEPR 3D"
            >
              <X className="w-5 h-5" />
            </button>
            <VseprVisualizer initialPresetId={matchingVsepr.id} />
          </div>
        </div>
      )}

      {/* Interactive Solubility Product (K_sp), Precipitation & Amphoteric Modal */}
      {showSolubilityModal && matchingSalt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSolubilityModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ tích số tan và kết tủa"
            >
              <X className="w-5 h-5" />
            </button>
            <SolubilityPrecipitationVisualizer initialSaltId={matchingSalt.id} />
          </div>
        </div>
      )}

      {/* Interactive Electrolysis & Faraday's Laws Simulation Modal */}
      {showElectrolysisModal && matchingElectrolysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowElectrolysisModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Điện Phân Faraday"
            >
              <X className="w-5 h-5" />
            </button>
            <ElectrolysisVisualizer initialScenarioId={matchingElectrolysis.id} />
          </div>
        </div>
      )}

      {/* Interactive Organic Chemistry Mechanism & Stereoisomerism Modal */}
      {showOrganicModal && matchingOrganic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowOrganicModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hóa Hữu Cơ"
            >
              <X className="w-5 h-5" />
            </button>
            <OrganicMechanismsVisualizer initialMode={matchingOrganic.mode} />
          </div>
        </div>
      )}

      {/* Interactive Polymerization, Macromolecules & Condensation Kinetics Modal */}
      {showPolymerModal && matchingPolymer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowPolymerModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Polime"
            >
              <X className="w-5 h-5" />
            </button>
            <PolymerVisualizer initialPolymerId={matchingPolymer.id} />
          </div>
        </div>
      )}

      {/* Interactive Nuclear Chemistry, Radioactivity & Half-Life Decay Modal */}
      {showNuclearModal && matchingNuclear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowNuclearModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hạt Nhân Phóng Xạ"
            >
              <X className="w-5 h-5" />
            </button>
            <NuclearDecayVisualizer initialIsotopeId={matchingNuclear.id} />
          </div>
        </div>
      )}

      {/* Interactive Green Chemistry, Acid Rain & CCUS Modal */}
      {showGreenModal && matchingGreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowGreenModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hóa Học Xanh"
            >
              <X className="w-5 h-5" />
            </button>
            <GreenChemistryVisualizer
              initialTab={
                matchingGreen.damageTarget
                  ? 'ACID_RAIN'
                  : matchingGreen.gas || matchingGreen.captureMethod
                  ? 'CCUS'
                  : matchingGreen.benchmark
                  ? 'SYNTHESIS'
                  : 'PRINCIPLES'
              }
            />
          </div>
        </div>
      )}

      {/* Interactive Crystallography, Unit Cells & Solid-State Chemistry Modal */}
      {showCrystalModal && matchingCrystal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCrystalModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Tinh Thể Học"
            >
              <X className="w-5 h-5" />
            </button>
            <CrystallographyVisualizer initialPresetId={matchingCrystal.id} />
          </div>
        </div>
      )}

      {/* Interactive Colloids, Interfaces & Surface Chemistry Modal */}
      {showColloidModal && matchingColloid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowColloidModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hóa Keo & Bề Mặt"
            >
              <X className="w-5 h-5" />
            </button>
            <ColloidSurfaceVisualizer
              initialSystemId={matchingColloid.dispersedSystem?.id || 'fe_oh_3_sol'}
            />
          </div>
        </div>
      )}

      {/* Interactive Spectrophotometry & Beer-Lambert Law Modal */}
      {showSpectroModal && matchingSpectro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSpectroModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ & Beer-Lambert"
            >
              <X className="w-5 h-5" />
            </button>
            <SpectrophotometryVisualizer
              initialStandardId={matchingSpectro.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Mass Spectrometry (MS) & Isotope Patterns Modal */}
      {showMassSpecModal && matchingMassSpec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowMassSpecModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phổ Khối Lượng MS"
            >
              <X className="w-5 h-5" />
            </button>
            <MassSpectrometryVisualizer
              initialCompoundId={matchingMassSpec.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Infrared Spectroscopy (IR) & Molecular Vibration Modal */}
      {showIRModal && matchingIR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-rose-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowIRModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phổ Hồng Ngoại IR"
            >
              <X className="w-5 h-5" />
            </button>
            <InfraredSpectroscopyVisualizer
              initialCompoundId={matchingIR.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Nuclear Magnetic Resonance (¹H & ¹³C NMR) Modal */}
      {showNMRModal && matchingNMR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowNMRModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phổ NMR"
            >
              <X className="w-5 h-5" />
            </button>
            <NmrSpectroscopyVisualizer
              initialCompoundId={matchingNMR.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Liquid-Liquid Extraction & Separatory Funnel Modal */}
      {showExtractionModal && matchingExtraction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowExtractionModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Chiết Lỏng - Lỏng"
            >
              <X className="w-5 h-5" />
            </button>
            <ExtractionPartitionVisualizer
              initialSoluteId={matchingExtraction.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Thin-Layer & Column Chromatography Modal */}
      {showChromatographyModal && matchingChromatography && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowChromatographyModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Sắc Kí Bản Mỏng"
            >
              <X className="w-5 h-5" />
            </button>
            <ChromatographyVisualizer
              initialMixtureId={matchingChromatography.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Recrystallization & Melting Point Purity Modal */}
      {showRecrystallizationModal && matchingRecrystallization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowRecrystallizationModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Kết Tinh Lại"
            >
              <X className="w-5 h-5" />
            </button>
            <RecrystallizationVisualizer
              initialSubstanceId={matchingRecrystallization.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Qualitative Organic Functional Group Modal */}
      {showFunctionalGroupModal && matchingFunctionalGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-rose-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowFunctionalGroupModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Nhận Biết Nhóm Chức"
            >
              <X className="w-5 h-5" />
            </button>
            <FunctionalGroupReactionsVisualizer
              initialSubstanceId={matchingFunctionalGroup.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Gas Laws & Kinetic Molecular Modal */}
      {showGasLawsModal && matchingGasSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-sky-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowGasLawsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Định Luật Chất Khí"
            >
              <X className="w-5 h-5" />
            </button>
            <GasLawsKineticVisualizer
              initialGasId={matchingGasSpecies.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Osmosis & Colligative Properties Modal */}
      {showOsmosisModal && matchingOsmosisSolute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowOsmosisModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Áp Suất Thẩm Thấu"
            >
              <X className="w-5 h-5" />
            </button>
            <OsmosisColligativeVisualizer
              initialSoluteId={matchingOsmosisSolute.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Nuclear Shell & Binding Energy Modal */}
      {showNuclearShellModal && matchingNuclearIsotope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-purple-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowNuclearShellModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Vỏ Hạt Nhân"
            >
              <X className="w-5 h-5" />
            </button>
            <NuclearShellVisualizer
              initialIsotopeId={matchingNuclearIsotope.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Crystal Field Theory & Optical Spectroscopy Modal */}
      {showCrystalFieldModal && matchingCoordinationComplex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCrystalFieldModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Thuyết Trường Tinh Thể"
            >
              <X className="w-5 h-5" />
            </button>
            <CrystalFieldTheoryVisualizer
              initialMetalId={matchingCoordinationComplex.metal.id}
              initialLigandId={matchingCoordinationComplex.ligand.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Enzyme Kinetics & Michaelis-Menten Modal */}
      {showEnzymeKineticsModal && matchingEnzyme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowEnzymeKineticsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Động Học Enzyme"
            >
              <X className="w-5 h-5" />
            </button>
            <EnzymeKineticsVisualizer
              initialEnzymeId={matchingEnzyme.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Quantum Hall Effect & Topological Matter Modal */}
      {showQuantumHallModal && matchingQuantumHallMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowQuantumHallModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hiệu Ứng Hall Lượng Tử"
            >
              <X className="w-5 h-5" />
            </button>
            <QuantumHallVisualizer
              initialMaterialId={matchingQuantumHallMaterial.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Atmospheric Photochemistry & Chapman Ozone Cycle Modal */}
      {showOzoneModal && matchingOzoneSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-sky-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowOzoneModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Hóa Ozon"
            >
              <X className="w-5 h-5" />
            </button>
            <OzonePhotochemistryVisualizer
              initialCycle={matchingOzoneSpecies.cycle}
            />
          </div>
        </div>
      )}

      {/* Interactive Superconductivity & Meissner Levitation Modal */}
      {showSuperconductivityModal && matchingSuperconductor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSuperconductivityModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Vật Lý Siêu Dẫn"
            >
              <X className="w-5 h-5" />
            </button>
            <SuperconductivityVisualizer
              initialMaterialId={matchingSuperconductor.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Fuel Cells & Butler-Volmer Kinetics Modal */}
      {showFuelCellModal && matchingFuelCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-sky-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowFuelCellModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Pin Nhiên Liệu Hydro"
            >
              <X className="w-5 h-5" />
            </button>
            <FuelCellVisualizer
              initialCellId={matchingFuelCell.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Lithium-Ion Battery & Intercalation Modal */}
      {showBatteryModal && matchingBattery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowBatteryModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Pin Lithium-Ion"
            >
              <X className="w-5 h-5" />
            </button>
            <BatteryIntercalationVisualizer
              initialChemistryId={matchingBattery.id}
            />
          </div>
        </div>
      )}

      {/* Interactive PCR Amplification & Agarose Gel Electrophoresis Modal */}
      {showPcrModal && matchingPcr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-fuchsia-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowPcrModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Nhân Bản Gen PCR"
            >
              <X className="w-5 h-5" />
            </button>
            <PcrElectrophoresisVisualizer
              initialAmpliconId={matchingPcr.id}
            />
          </div>
        </div>
      )}

      {/* Interactive CRISPR-Cas9 Gene Editing & DSB Repair Modal */}
      {showCrisprModal && matchingCrispr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCrisprModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Chỉnh Sửa Gen CRISPR-Cas9"
            >
              <X className="w-5 h-5" />
            </button>
            <CrisprCas9Visualizer
              initialTargetId={matchingCrispr.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Thermogravimetric Analysis (TGA) & DSC Modal */}
      {showThermalAnalysisModal && matchingThermalAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowThermalAnalysisModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phân Tích Nhiệt TGA"
            >
              <X className="w-5 h-5" />
            </button>
            <ThermalAnalysisVisualizer
              initialSampleId={matchingThermalAnalysis.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Scanning & Transmission Electron Microscopy (SEM/TEM) Modal */}
      {showMicroscopyModal && matchingMicroscopy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowMicroscopyModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Kính Hiển Vi Điện Tử SEM/TEM"
            >
              <X className="w-5 h-5" />
            </button>
            <ElectronMicroscopyVisualizer
              initialSpecimenId={matchingMicroscopy.id}
            />
          </div>
        </div>
      )}

      {/* Interactive X-Ray Photoelectron Spectroscopy (XPS / ESCA) Modal */}
      {showXpsModal && matchingXps && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowXpsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ XPS/ESCA"
            >
              <X className="w-5 h-5" />
            </button>
            <XpsSpectroscopyVisualizer
              initialSampleId={matchingXps.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Atomic Force Microscopy (AFM) Modal */}
      {showAfmModal && matchingAfm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowAfmModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Kính Hiển Vi AFM"
            >
              <X className="w-5 h-5" />
            </button>
            <AfmCantileverVisualizer
              initialSampleId={matchingAfm.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Surface Plasmon Resonance (SPR) Modal */}
      {showSprModal && matchingSpr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSprModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Cộng Hưởng Plasmon SPR"
            >
              <X className="w-5 h-5" />
            </button>
            <SurfacePlasmonVisualizer
              initialInteractionId={matchingSpr.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Dynamic Light Scattering (DLS) & Zeta Potential Modal */}
      {showDlsModal && matchingDls && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowDlsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Tán Xạ Ánh Sáng DLS"
            >
              <X className="w-5 h-5" />
            </button>
            <DynamicLightScatteringVisualizer
              initialSampleId={matchingDls.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Circular Dichroism (CD) & Protein Secondary Structure Modal */}
      {showCdModal && matchingCd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCdModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phổ CD Protein"
            >
              <X className="w-5 h-5" />
            </button>
            <CircularDichroismVisualizer
              initialProteinId={matchingCd.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Differential Scanning Fluorimetry (DSF) & Thermal Shift Modal */}
      {showDsfModal && matchingDsf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowDsfModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Sàng Lọc DSF"
            >
              <X className="w-5 h-5" />
            </button>
            <ThermalShiftVisualizer
              initialAssayId={matchingDsf.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Small-Angle X-Ray Scattering (SAXS) & Kratky Modal */}
      {showSaxsModal && matchingSaxs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSaxsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Tán Xạ Tia X SAXS"
            >
              <X className="w-5 h-5" />
            </button>
            <SaxsScatteringVisualizer
              initialProteinId={matchingSaxs.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Cryogenic Electron Microscopy (Cryo-EM) & 3D Reconstruction Modal */}
      {showCryoEmModal && matchingCryoEm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCryoEmModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Cryo-EM"
            >
              <X className="w-5 h-5" />
            </button>
            <CryoEmVisualizer
              initialSpecimenId={matchingCryoEm.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Solid-State NMR (ssNMR) & Magic-Angle Spinning (MAS) Modal */}
      {showSsNmrModal && matchingSsNmr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSsNmrModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ ssNMR MAS"
            >
              <X className="w-5 h-5" />
            </button>
            <SolidStateNmrVisualizer
              initialSpecimenId={matchingSsNmr.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Stopped-Flow Pre-Steady-State Kinetics & Flash Photolysis Modal */}
      {showStoppedFlowModal && matchingStoppedFlow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowStoppedFlowModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Stopped-Flow"
            >
              <X className="w-5 h-5" />
            </button>
            <StoppedFlowVisualizer
              initialSpecimenId={matchingStoppedFlow.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Dual-Polarization Interferometry (DPI) & De Feijter Modal */}
      {showDpiModal && matchingDpi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowDpiModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ DPI"
            >
              <X className="w-5 h-5" />
            </button>
            <DualPolarizationVisualizer
              initialSpecimenId={matchingDpi.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Quartz Crystal Microbalance with Dissipation (QCM-D) Modal */}
      {showQcmdModal && matchingQcmd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowQcmdModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ QCM-D"
            >
              <X className="w-5 h-5" />
            </button>
            <QcmdVisualizer
              initialSpecimenId={matchingQcmd.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Optical Tweezers & Single-Molecule Force Spectroscopy Modal */}
      {showOpticalTweezersModal && matchingOpticalTweezers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowOpticalTweezersModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Bẫy Quang Học"
            >
              <X className="w-5 h-5" />
            </button>
            <OpticalTweezersVisualizer
              initialSpecimenId={matchingOpticalTweezers.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Magnetic Tweezers & DNA Plectonemic Supercoiling Modal */}
      {showMagneticTweezersModal && matchingMagneticTweezers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-purple-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowMagneticTweezersModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Bẫy Từ Siêu Xoắn"
            >
              <X className="w-5 h-5" />
            </button>
            <MagneticTweezersVisualizer
              initialSpecimenId={matchingMagneticTweezers.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Capillary Electrophoresis & Chiral Resolution Modal */}
      {showCapillaryElectrophoresisModal && matchingCapillaryElectrophoresis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowCapillaryElectrophoresisModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Điện Di Mao Quản"
            >
              <X className="w-5 h-5" />
            </button>
            <CapillaryElectrophoresisVisualizer
              initialSpecimenId={matchingCapillaryElectrophoresis.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Positron Emission Tomography (PET) Radiochemistry Modal */}
      {showPetModal && matchingPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-rose-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowPetModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hóa Phóng Xạ PET"
            >
              <X className="w-5 h-5" />
            </button>
            <PetRadiochemistryVisualizer
              initialSpecimenId={matchingPet.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Scanning Tunneling Microscopy (STM) Modal */}
      {showStmModal && matchingStm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowStmModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Hiển Vi Xuyên Ngầm STM"
            >
              <X className="w-5 h-5" />
            </button>
            <StmVisualizer
              initialSpecimenId={matchingStm.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Femtosecond Pump-Probe Spectroscopy Modal */}
      {showPumpProbeModal && matchingPumpProbe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowPumpProbeModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ Bơm - Dò Femtosecond"
            >
              <X className="w-5 h-5" />
            </button>
            <FemtosecondPumpProbeVisualizer
              initialStandardId={matchingPumpProbe.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Secondary Ion Mass Spectrometry (SIMS) Modal */}
      {showSimsModal && matchingSims && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSimsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Khối Phổ Ion Thứ Cấp SIMS"
            >
              <X className="w-5 h-5" />
            </button>
            <SimsVisualizer
              initialStandardId={matchingSims.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Mössbauer Spectroscopy Modal */}
      {showMossbauerModal && matchingMossbauer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-violet-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowMossbauerModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ Mössbauer"
            >
              <X className="w-5 h-5" />
            </button>
            <MossbauerVisualizer
              initialStandardId={matchingMossbauer.id}
            />
          </div>
        </div>
      )}

      {/* Interactive XAFS Spectroscopy Modal */}
      {showXafsModal && matchingXafs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowXafsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ XAFS"
            >
              <X className="w-5 h-5" />
            </button>
            <XafsVisualizer
              initialStandardId={matchingXafs.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Dynamic Mechanical Analysis (DMA) Modal */}
      {showDmaModal && matchingDma && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowDmaModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Phân Tích DMA"
            >
              <X className="w-5 h-5" />
            </button>
            <DmaVisualizer
              initialStandardId={matchingDma.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Isothermal Titration Calorimetry (ITC) Modal */}
      {showItcModal && matchingItc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-rose-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowItcModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Nhiệt Lượng Kế ITC"
            >
              <X className="w-5 h-5" />
            </button>
            <ItcVisualizer
              initialStandardId={matchingItc.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Electrospray Ionization Mass Spectrometry (ESI-MS) Modal */}
      {showEsiModal && matchingEsi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowEsiModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Khối Phổ ESI-MS"
            >
              <X className="w-5 h-5" />
            </button>
            <EsiMassSpecVisualizer
              initialStandardId={matchingEsi.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Supercritical Fluid Chromatography (SFC) Modal */}
      {showSfcModal && matchingSfc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSfcModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Sắc Ký SFC"
            >
              <X className="w-5 h-5" />
            </button>
            <SfcVisualizer
              initialStandardId={matchingSfc.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Nanoparticle Tracking Analysis (NTA) Modal */}
      {showNtaModal && matchingNta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowNtaModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Bám Vết NTA"
            >
              <X className="w-5 h-5" />
            </button>
            <NtaVisualizer
              initialStandardId={matchingNta.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Microscale Thermophoresis (MST) Modal */}
      {showMstModal && matchingMst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowMstModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Nhiệt Di Chuyển MST"
            >
              <X className="w-5 h-5" />
            </button>
            <MstVisualizer
              initialStandardId={matchingMst.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Bio-Layer Interferometry (BLI) Modal */}
      {showBliModal && matchingBli && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowBliModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Giao Thoa BLI"
            >
              <X className="w-5 h-5" />
            </button>
            <BliVisualizer
              initialStandardId={matchingBli.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Resonant Mass Measurement (RMM) Modal */}
      {showRmmModal && matchingRmm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowRmmModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Cộng Hưởng RMM"
            >
              <X className="w-5 h-5" />
            </button>
            <RmmVisualizer
              initialStandardId={matchingRmm.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Differential Scanning Calorimetry (DSC) Modal */}
      {showDscModal && matchingDsc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowDscModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quét Nhiệt DSC"
            >
              <X className="w-5 h-5" />
            </button>
            <DscVisualizer
              initialStandardId={matchingDsc.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Pressure Perturbation Calorimetry (PPC) Modal */}
      {showPpcModal && matchingPpc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowPpcModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Nhiễu Loạn Áp Suất PPC"
            >
              <X className="w-5 h-5" />
            </button>
            <PpcVisualizer
              initialStandardId={matchingPpc.id}
            />
          </div>
        </div>
      )}

      {/* Interactive SEC-MALS Multi-Angle Light Scattering Modal */}
      {showSecMalsModal && matchingSecMals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-violet-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSecMalsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Tán Xạ SEC-MALS"
            >
              <X className="w-5 h-5" />
            </button>
            <SecMalsVisualizer
              initialStandardId={matchingSecMals.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Analytical Ultracentrifugation (AUC) Modal */}
      {showAucModal && matchingAuc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowAucModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Siêu Ly Tâm AUC"
            >
              <X className="w-5 h-5" />
            </button>
            <AucVisualizer
              initialStandardId={matchingAuc.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Asymmetrical Flow Field-Flow Fractionation (AF4) Modal */}
      {showAf4Modal && matchingAf4 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowAf4Modal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Sắc Ký Dòng Kênh AF4"
            >
              <X className="w-5 h-5" />
            </button>
            <Af4Visualizer
              initialStandardId={matchingAf4.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Taylor Dispersion Analysis (TDA) Modal */}
      {showTdaModal && matchingTda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-teal-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowTdaModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Tán Xạ Mao Quản TDA"
            >
              <X className="w-5 h-5" />
            </button>
            <TdaVisualizer
              initialStandardId={matchingTda.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Fluorescence Correlation Spectroscopy (FCS) Modal */}
      {showFcsModal && matchingFcs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-fuchsia-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowFcsModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Quang Phổ FCS"
            >
              <X className="w-5 h-5" />
            </button>
            <FcsVisualizer
              initialStandardId={matchingFcs.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Fluorescence Lifetime Imaging Microscopy (FLIM) Modal */}
      {showFlimModal && matchingFlim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowFlimModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ Kính Hiển Vi FLIM"
            >
              <X className="w-5 h-5" />
            </button>
            <FlimVisualizer
              initialStandardId={matchingFlim.id}
            />
          </div>
        </div>
      )}

      {/* Interactive Single-Molecule FRET & ALEX Modal */}
      {showSmFretModal && matchingSmFret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-navy/95 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-ivory">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSmFretModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors z-10"
              aria-label="Đóng cửa sổ smFRET ALEX"
            >
              <X className="w-5 h-5" />
            </button>
            <SmFretVisualizer
              initialStandardId={matchingSmFret.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};
