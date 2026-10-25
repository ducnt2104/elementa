// src/components/PeriodicCodexTab.tsx
// Comprehensive Periodic Codex & Chemistry Database for ELEMENTA
// Conforms strictly to IUPAC standards & Vietnamese GDPT 2018 curriculum.
// Includes 18-Column Interactive Grid, Dual-Profile Inspector, 326 Substance Catalog & Side-by-Side Element Comparison.

import React, { useState, useMemo } from 'react';
import { ALL_ELEMENTS } from '../data/elementsData';
import { ALL_SUBSTANCES, ChemicalSubstance, SubstanceCategory } from '../data/substancesData';
import { ElementData, ElementCategory } from '../domain/types';
import { AtomDiagram } from './visualizations/AtomDiagram';
import { OrbitalBoxDiagram } from './visualizations/OrbitalBoxDiagram';
import { FlameTestVisualizer } from './visualizations/FlameTestVisualizer';
import { PeriodicTrendChart } from './visualizations/PeriodicTrendChart';
import { ChemicalEquilibriumVisualizer } from './visualizations/ChemicalEquilibriumVisualizer';
import { GalvanicCellVisualizer } from './visualizations/GalvanicCellVisualizer';
import { TitrationCurveVisualizer } from './visualizations/TitrationCurveVisualizer';
import { BufferCapacityVisualizer } from './visualizations/BufferCapacityVisualizer';
import { EsterLipidVisualizer } from './visualizations/EsterLipidVisualizer';
import { CarbohydrateVisualizer } from './visualizations/CarbohydrateVisualizer';
import { AmineAminoAcidVisualizer } from './visualizations/AmineAminoAcidVisualizer';
import { MetallurgyCorrosionVisualizer } from './visualizations/MetallurgyCorrosionVisualizer';
import { AlkaliHardWaterVisualizer } from './visualizations/AlkaliHardWaterVisualizer';
import { TransitionMetalsVisualizer } from './visualizations/TransitionMetalsVisualizer';
import { AlcoholPhenolVisualizer } from './visualizations/AlcoholPhenolVisualizer';
import { CarbonylCarboxylicVisualizer } from './visualizations/CarbonylCarboxylicVisualizer';
import { NitrogenSulfurVisualizer } from './visualizations/NitrogenSulfurVisualizer';
import { HydrocarbonVisualizer } from './visualizations/HydrocarbonVisualizer';
import { HalogenDerivativesVisualizer } from './visualizations/HalogenDerivativesVisualizer';
import { ChemicalEnergeticsVisualizer } from './visualizations/ChemicalEnergeticsVisualizer';
import { ChemicalKineticsVisualizer } from './visualizations/ChemicalKineticsVisualizer';
import { HalogensRedoxVisualizer } from './visualizations/HalogensRedoxVisualizer';
import { RedoxReactionsVisualizer } from './visualizations/RedoxReactionsVisualizer';
import { PeriodicTrendsOctetVisualizer } from './visualizations/PeriodicTrendsOctetVisualizer';
import { CurriculumMasteryVisualizer } from './visualizations/CurriculumMasteryVisualizer';
import { TournamentChampionshipVisualizer } from './visualizations/TournamentChampionshipVisualizer';
import { SaltHydrolysisVisualizer } from './visualizations/SaltHydrolysisVisualizer';
import { ForensicChemistryVisualizer } from './visualizations/ForensicChemistryVisualizer';
import { PharmacokineticsVisualizer } from './visualizations/PharmacokineticsVisualizer';
import { FoodChemistryVisualizer } from './visualizations/FoodChemistryVisualizer';
import { ChiralStereochemistryVisualizer } from './visualizations/ChiralStereochemistryVisualizer';
import { BiopolymerBiodegradationVisualizer } from './visualizations/BiopolymerBiodegradationVisualizer';
import { IndustrialElectrochemicalVisualizer } from './visualizations/IndustrialElectrochemicalVisualizer';
import { SoilFertilizerVisualizer } from './visualizations/SoilFertilizerVisualizer';
import { DyeChemistryVisualizer } from './visualizations/DyeChemistryVisualizer';
import { PetroleumRefiningVisualizer } from './visualizations/PetroleumRefiningVisualizer';
import { AtmosphericPhotochemistryVisualizer } from './visualizations/AtmosphericPhotochemistryVisualizer';
import { RadiometricDatingShellVisualizer } from './visualizations/RadiometricDatingShellVisualizer';
import { QuantumDotsVisualizer } from './visualizations/QuantumDotsVisualizer';
import { MetalOrganicFrameworksVisualizer } from './visualizations/MetalOrganicFrameworksVisualizer';
import { PhotocatalyticEnergyVisualizer } from './visualizations/PhotocatalyticEnergyVisualizer';
import { SupercapacitorAerogelVisualizer } from './visualizations/SupercapacitorAerogelVisualizer';
import { SolidStateBatteryVisualizer } from './visualizations/SolidStateBatteryVisualizer';
import { NanogeneratorEnergyVisualizer } from './visualizations/NanogeneratorEnergyVisualizer';
import { ThermoelectricVisualizer } from './visualizations/ThermoelectricVisualizer';
import { MicrobialFuelCellVisualizer } from './visualizations/MicrobialFuelCellVisualizer';
import { HydrogenFuelCellVisualizer } from './visualizations/HydrogenFuelCellVisualizer';
import { RedoxFlowBatteryVisualizer } from './visualizations/RedoxFlowBatteryVisualizer';
import { SodiumIonBatteryVisualizer } from './visualizations/SodiumIonBatteryVisualizer';
import { LithiumSulfurBatteryVisualizer } from './visualizations/LithiumSulfurBatteryVisualizer';
import { MetalAirBatteryVisualizer } from './visualizations/MetalAirBatteryVisualizer';
import { BetavoltaicBatteryVisualizer } from './visualizations/BetavoltaicBatteryVisualizer';
import { PerovskiteSolarVisualizer } from './visualizations/PerovskiteSolarVisualizer';
import { SolidOxideElectrolyzerVisualizer } from './visualizations/SolidOxideElectrolyzerVisualizer';
import { AnionExchangeElectrolyzerVisualizer } from './visualizations/AnionExchangeElectrolyzerVisualizer';
import { DirectAirCaptureVisualizer } from './visualizations/DirectAirCaptureVisualizer';
import { IodineSulfurCycleVisualizer } from './visualizations/IodineSulfurCycleVisualizer';
import { DirectLithiumExtractionVisualizer } from './visualizations/DirectLithiumExtractionVisualizer';
import { SupercriticalWaterOxidationVisualizer } from './visualizations/SupercriticalWaterOxidationVisualizer';
import { SalinityGradientOsmoticVisualizer } from './visualizations/SalinityGradientOsmoticVisualizer';
import { OceanThermalEnergyVisualizer } from './visualizations/OceanThermalEnergyVisualizer';
import { MoltenSaltReactorVisualizer } from './visualizations/MoltenSaltReactorVisualizer';
import { TokamakFusionVisualizer } from './visualizations/TokamakFusionVisualizer';
import { MetalHydrideStorageVisualizer } from './visualizations/MetalHydrideStorageVisualizer';
import { PhotocatalyticArtificialPhotosynthesisVisualizer } from './visualizations/PhotocatalyticArtificialPhotosynthesisVisualizer';
import { GeothermalMineralExtractionVisualizer } from './visualizations/GeothermalMineralExtractionVisualizer';
import { CuClThermochemicalVisualizer } from './visualizations/CuClThermochemicalVisualizer';
import { SmesCryogenicVisualizer } from './visualizations/SmesCryogenicVisualizer';
import { MicrochannelFischerTropschVisualizer } from './visualizations/MicrochannelFischerTropschVisualizer';
import { MembraneMethaneAromatizationVisualizer } from './visualizations/MembraneMethaneAromatizationVisualizer';
import { MicrobialElectrosynthesisVisualizer } from './visualizations/MicrobialElectrosynthesisVisualizer';
import { MetalHydrideThermalStorageVisualizer } from './visualizations/MetalHydrideThermalStorageVisualizer';
import { PhotoelectrochemicalTandemVisualizer } from './visualizations/PhotoelectrochemicalTandemVisualizer';
import { LithiumMediatedAmmoniaVisualizer } from './visualizations/LithiumMediatedAmmoniaVisualizer';
import { ThermophotovoltaicGridStorageVisualizer } from './visualizations/ThermophotovoltaicGridStorageVisualizer';
import { DeepSeaBioleachingVisualizer } from './visualizations/DeepSeaBioleachingVisualizer';
import { IndustrialSynthesisVisualizer } from './visualizations/IndustrialSynthesisVisualizer';
import { CoordinationComplexVisualizer } from './visualizations/CoordinationComplexVisualizer';
import { VseprVisualizer } from './visualizations/VseprVisualizer';
import { SolubilityPrecipitationVisualizer } from './visualizations/SolubilityPrecipitationVisualizer';
import { ElectrolysisVisualizer } from './visualizations/ElectrolysisVisualizer';
import { OrganicMechanismsVisualizer } from './visualizations/OrganicMechanismsVisualizer';
import { PolymerVisualizer } from './visualizations/PolymerVisualizer';
import { NuclearDecayVisualizer } from './visualizations/NuclearDecayVisualizer';
import { GreenChemistryVisualizer } from './visualizations/GreenChemistryVisualizer';
import { CrystallographyVisualizer } from './visualizations/CrystallographyVisualizer';
import { ColloidSurfaceVisualizer } from './visualizations/ColloidSurfaceVisualizer';
import { SpectrophotometryVisualizer } from './visualizations/SpectrophotometryVisualizer';
import { MassSpectrometryVisualizer } from './visualizations/MassSpectrometryVisualizer';
import { InfraredSpectroscopyVisualizer } from './visualizations/InfraredSpectroscopyVisualizer';
import { NmrSpectroscopyVisualizer } from './visualizations/NmrSpectroscopyVisualizer';
import { StructuralElucidationVisualizer } from './visualizations/StructuralElucidationVisualizer';
import { PhaseEquilibriaVisualizer } from './visualizations/PhaseEquilibriaVisualizer';
import { ExtractionPartitionVisualizer } from './visualizations/ExtractionPartitionVisualizer';
import { ChromatographyVisualizer } from './visualizations/ChromatographyVisualizer';
import { RecrystallizationVisualizer } from './visualizations/RecrystallizationVisualizer';
import { FunctionalGroupReactionsVisualizer } from './visualizations/FunctionalGroupReactionsVisualizer';
import { GasLawsKineticVisualizer } from './visualizations/GasLawsKineticVisualizer';
import { OsmosisColligativeVisualizer } from './visualizations/OsmosisColligativeVisualizer';
import { NuclearShellVisualizer } from './visualizations/NuclearShellVisualizer';
import { CrystalFieldTheoryVisualizer } from './visualizations/CrystalFieldTheoryVisualizer';
import { EnzymeKineticsVisualizer } from './visualizations/EnzymeKineticsVisualizer';
import { QuantumHallVisualizer } from './visualizations/QuantumHallVisualizer';
import { OzonePhotochemistryVisualizer } from './visualizations/OzonePhotochemistryVisualizer';
import { SuperconductivityVisualizer } from './visualizations/SuperconductivityVisualizer';
import { FuelCellVisualizer } from './visualizations/FuelCellVisualizer';
import { BatteryIntercalationVisualizer } from './visualizations/BatteryIntercalationVisualizer';
import { PcrElectrophoresisVisualizer } from './visualizations/PcrElectrophoresisVisualizer';
import { CrisprCas9Visualizer } from './visualizations/CrisprCas9Visualizer';
import { ThermalAnalysisVisualizer } from './visualizations/ThermalAnalysisVisualizer';
import { ElectronMicroscopyVisualizer } from './visualizations/ElectronMicroscopyVisualizer';
import { XpsSpectroscopyVisualizer } from './visualizations/XpsSpectroscopyVisualizer';
import { AfmCantileverVisualizer } from './visualizations/AfmCantileverVisualizer';
import { SurfacePlasmonVisualizer } from './visualizations/SurfacePlasmonVisualizer';
import { DynamicLightScatteringVisualizer } from './visualizations/DynamicLightScatteringVisualizer';
import { CircularDichroismVisualizer } from './visualizations/CircularDichroismVisualizer';
import { ThermalShiftVisualizer } from './visualizations/ThermalShiftVisualizer';
import { SaxsScatteringVisualizer } from './visualizations/SaxsScatteringVisualizer';
import { CryoEmVisualizer } from './visualizations/CryoEmVisualizer';
import { SolidStateNmrVisualizer } from './visualizations/SolidStateNmrVisualizer';
import { StoppedFlowVisualizer } from './visualizations/StoppedFlowVisualizer';
import { DualPolarizationVisualizer } from './visualizations/DualPolarizationVisualizer';
import { QcmdVisualizer } from './visualizations/QcmdVisualizer';
import { OpticalTweezersVisualizer } from './visualizations/OpticalTweezersVisualizer';
import { MagneticTweezersVisualizer } from './visualizations/MagneticTweezersVisualizer';
import { CapillaryElectrophoresisVisualizer } from './visualizations/CapillaryElectrophoresisVisualizer';
import { PetRadiochemistryVisualizer } from './visualizations/PetRadiochemistryVisualizer';
import { StmVisualizer } from './visualizations/StmVisualizer';
import { FemtosecondPumpProbeVisualizer } from './visualizations/FemtosecondPumpProbeVisualizer';
import { SimsVisualizer } from './visualizations/SimsVisualizer';
import { MossbauerVisualizer } from './visualizations/MossbauerVisualizer';
import { XafsVisualizer } from './visualizations/XafsVisualizer';
import { DmaVisualizer } from './visualizations/DmaVisualizer';
import { ItcVisualizer } from './visualizations/ItcVisualizer';
import { EsiMassSpecVisualizer } from './visualizations/EsiMassSpecVisualizer';
import { SfcVisualizer } from './visualizations/SfcVisualizer';
import { NtaVisualizer } from './visualizations/NtaVisualizer';
import { MstVisualizer } from './visualizations/MstVisualizer';
import { BliVisualizer } from './visualizations/BliVisualizer';
import { RmmVisualizer } from './visualizations/RmmVisualizer';
import { DscVisualizer } from './visualizations/DscVisualizer';
import { PpcVisualizer } from './visualizations/PpcVisualizer';
import { SecMalsVisualizer } from './visualizations/SecMalsVisualizer';
import { AucVisualizer } from './visualizations/AucVisualizer';
import { Af4Visualizer } from './visualizations/Af4Visualizer';
import { TdaVisualizer } from './visualizations/TdaVisualizer';
import { FcsVisualizer } from './visualizations/FcsVisualizer';
import { FlimVisualizer } from './visualizations/FlimVisualizer';
import { SmFretVisualizer } from './visualizations/SmFretVisualizer';
import { sound } from '../audio/soundEngine';
import {
  Search,
  X,
  Zap,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Layers,
  Sparkles,
  Info,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Trophy,
  Swords,
  Table as TableIcon,
  LayoutGrid,
  ArrowRightLeft,
  FlaskConical,
  Filter,
  CheckCircle2,
  Droplets,
  Flame,
  Scale,
  Battery,
  Database,
  Factory,
  Compass,
  Palette,
  Fuel,
  Radiation,
  Recycle,
  Sprout,
  Gem,
  Sun,
  Eye,
  Activity,
  Pill,
  Utensils,
  Waves,
  Radio,
  Dna,
  Thermometer,
  Sliders,
  Pipette,
  Wind,
  Scissors,
  Microscope,
  MoveVertical,
  Atom,
  Box,
  Scan,
  Snowflake,
  Timer,
  Gauge,
  Crosshair,
  Magnet,
  Leaf,
  RotateCcw,
  GitCommit,
  Focus,
  Clock,
  BatteryCharging,
  Plane
} from 'lucide-react';

export const PeriodicCodexTab: React.FC = () => {
  // Navigation & Sub-tabs
  const [activeMainTab, setActiveMainTab] = useState<'PERIODIC_TABLE' | 'SUBSTANCES' | 'COMPARISON' | 'EQUILIBRIUM' | 'GALVANIC_CELL' | 'TITRATION' | 'BUFFER_CAPACITY' | 'ESTER_LIPID_SAPONIFICATION' | 'CARBOHYDRATE_BIOCHEMISTRY' | 'AMINES_AMINO_ACIDS_PEPTIDES' | 'METALLURGY_CORROSION' | 'ALKALI_HARD_WATER' | 'TRANSITION_METALS_COMPLEXES' | 'ALCOHOL_PHENOL_REACTIONS' | 'CARBONYL_CARBOXYLIC_ACID' | 'NITROGEN_SULFUR_COMPOUNDS' | 'HYDROCARBONS_REACTIONS' | 'HALOGEN_DERIVATIVES' | 'CHEMICAL_ENERGETICS' | 'CHEMICAL_KINETICS' | 'HALOGENS_REDOX' | 'REDOX_REACTIONS' | 'PERIODIC_TRENDS_OCTET' | 'CURRICULUM_MASTERY' | 'TOURNAMENT_CHAMPIONSHIP' | 'SALT_HYDROLYSIS' | 'FORENSIC_CHEMISTRY' | 'PHARMACOKINETICS_ADME' | 'FOOD_CHEMISTRY' | 'CHIRAL_STEREOCHEMISTRY' | 'BIOPOLYMERS_BIODEGRADATION' | 'INDUSTRIAL_ELECTROCHEMICAL_REFINING' | 'SOIL_FERTILIZER_CHEMISTRY' | 'DYES_AZO_CHEMISTRY' | 'PETROLEUM_REFINING_OCTANE' | 'ATMOSPHERIC_PHOTOCHEMISTRY' | 'RADIOMETRIC_DATING_NUCLEAR' | 'QUANTUM_DOTS_NANOTECH' | 'MOF_CARBON_CAPTURE' | 'PHOTOCATALYTIC_SOLAR_ENERGY' | 'SUPERCAPACITOR_AEROGEL' | 'SOLID_STATE_BATTERY' | 'NANOGENERATOR_PENG_TENG' | 'THERMOELECTRIC_ENERGY' | 'MICROBIAL_FUEL_CELL' | 'HYDROGEN_FUEL_CELL' | 'REDOX_FLOW_BATTERY' | 'SODIUM_ION_BATTERY' | 'LITHIUM_SULFUR_BATTERY' | 'METAL_AIR_BATTERY' | 'BETAVOLTAIC_NUCLEAR_BATTERY' | 'PEROVSKITE_SOLAR_CELL' | 'SOLID_OXIDE_ELECTROLYZER' | 'ANION_EXCHANGE_ELECTROLYZER' | 'DIRECT_AIR_CAPTURE' | 'IODINE_SULFUR_CYCLE' | 'DIRECT_LITHIUM_EXTRACTION' | 'SUPERCRITICAL_WATER_OXIDATION' | 'SALINITY_GRADIENT_OSMOTIC' | 'OCEAN_THERMAL_ENERGY' | 'MOLTEN_SALT_REACTOR' | 'TOKAMAK_FUSION' | 'METAL_HYDRIDE_STORAGE' | 'PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS' | 'GEOTHERMAL_MINERAL_EXTRACTION' | 'CU_CL_THERMOCHEMICAL_CYCLE' | 'SMES_CRYOGENIC_STORAGE' | 'MICROCHANNEL_FISCHER_TROPSCH' | 'MEMBRANE_METHANE_AROMATIZATION' | 'MICROBIAL_ELECTROSYNTHESIS_MES' | 'METAL_HYDRIDE_THERMAL_STORAGE' | 'PHOTOELECTROCHEMICAL_TANDEM' | 'LITHIUM_MEDIATED_AMMONIA' | 'THERMOPHOTOVOLTAIC_GRID_STORAGE' | 'DEEP_SEA_BIOLEACHING' | 'INDUSTRIAL_REACTOR' | 'COORDINATION_COMPLEX' | 'VSEPR_BONDING' | 'SOLUBILITY_PRECIPITATION' | 'ELECTROLYSIS_FARADAY' | 'ORGANIC_MECHANISMS' | 'POLYMERS_MACROMOLECULES' | 'NUCLEAR_RADIOACTIVITY' | 'GREEN_CHEMISTRY' | 'CRYSTALLOGRAPHY' | 'COLLOIDS_SURFACE' | 'SPECTROPHOTOMETRY' | 'MASS_SPECTROMETRY' | 'INFRARED_SPECTROSCOPY' | 'NMR_SPECTROSCOPY' | 'STRUCTURAL_ELUCIDATION' | 'PHASE_EQUILIBRIA' | 'EXTRACTION_PARTITION' | 'CHROMATOGRAPHY' | 'RECRYSTALLIZATION' | 'FUNCTIONAL_GROUP_REACTIONS' | 'GAS_LAWS_KINETIC' | 'OSMOSIS_COLLIGATIVE' | 'NUCLEAR_SHELL' | 'CRYSTAL_FIELD_THEORY' | 'ENZYME_KINETICS' | 'QUANTUM_HALL' | 'OZONE_PHOTOCHEMISTRY' | 'SUPERCONDUCTIVITY' | 'FUEL_CELLS' | 'BATTERY_INTERCALATION' | 'PCR_ELECTROPHORESIS' | 'CRISPR_CAS9' | 'THERMAL_ANALYSIS' | 'ELECTRON_MICROSCOPY' | 'XPS_SPECTROSCOPY' | 'AFM_CANTILEVER' | 'SURFACE_PLASMON' | 'DYNAMIC_LIGHT_SCATTERING' | 'CIRCULAR_DICHROISM' | 'THERMAL_SHIFT_ASSAY' | 'SAXS_SCATTERING' | 'CRYO_ELECTRON_MICROSCOPY' | 'SOLID_STATE_NMR' | 'STOPPED_FLOW_KINETICS' | 'DUAL_POLARIZATION_INTERFEROMETRY' | 'QCMD_MICROBALANCE' | 'OPTICAL_TWEEZERS' | 'MAGNETIC_TWEEZERS' | 'CAPILLARY_ELECTROPHORESIS' | 'PET_RADIOCHEMISTRY' | 'SCANNING_TUNNELING_MICROSCOPY' | 'FEMTOSECOND_PUMP_PROBE' | 'SECONDARY_ION_MASS_SPECTROMETRY' | 'MOSSBAUER_SPECTROSCOPY' | 'XAFS_SPECTROSCOPY' | 'DMA_VISCOELASTICITY' | 'ISOTHERMAL_TITRATION_CALORIMETRY' | 'ELECTROSPRAY_IONIZATION_MASS_SPEC' | 'SUPERCRITICAL_FLUID_CHROMATOGRAPHY' | 'NANOPARTICLE_TRACKING_ANALYSIS' | 'MICROSCALE_THERMOPHORESIS' | 'BIO_LAYER_INTERFEROMETRY' | 'RESONANT_MASS_MEASUREMENT' | 'DIFFERENTIAL_SCANNING_CALORIMETRY' | 'PRESSURE_PERTURBATION_CALORIMETRY' | 'SEC_MALS_LIGHT_SCATTERING' | 'ANALYTICAL_ULTRACENTRIFUGATION' | 'ASYMMETRICAL_FLOW_FIELD_FLOW_FRACTIONATION' | 'TAYLOR_DISPERSION_ANALYSIS' | 'FLUORESCENCE_CORRELATION_SPECTROSCOPY' | 'FLUORESCENCE_LIFETIME_IMAGING_MICROSCOPY' | 'SINGLE_MOLECULE_FRET_ALEX'>('PERIODIC_TABLE');
  const [tableLayoutMode, setTableLayoutMode] = useState<'18_COLUMN' | 'GRID'>('18_COLUMN');
  
  // Element Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'ALL'>('ALL');
  const [inspectingElement, setInspectingElement] = useState<ElementData | null>(null);
  const [inspectProfileTab, setInspectProfileTab] = useState<'SCIENCE' | 'BATTLE'>('SCIENCE');
  const [showTrendChart, setShowTrendChart] = useState(false);
  const [displayProperty, setDisplayProperty] = useState<'WEIGHT' | 'ELECTRONEGATIVITY' | 'IE1' | 'MANA'>('WEIGHT');
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Substance Catalog State
  const [substanceSearch, setSubstanceSearch] = useState('');
  const [substanceCategory, setSubstanceCategory] = useState<SubstanceCategory | 'ALL'>('ALL');
  const [inspectingSubstance, setInspectingSubstance] = useState<ChemicalSubstance | null>(null);

  // Comparison State
  const [compareElemA, setCompareElemA] = useState<ElementData>(ALL_ELEMENTS[10]); // Sodium (Na)
  const [compareElemB, setCompareElemB] = useState<ElementData>(ALL_ELEMENTS[16]); // Chlorine (Cl)

  const categories: { key: ElementCategory | 'ALL'; label: string; color: string }[] = [
    { key: 'ALL', label: 'Tất cả (118)', color: 'border-ivory-muted text-ivory' },
    { key: 'ALKALI_METAL', label: 'Kim loại kiềm (IA)', color: 'border-coral-reaction/60 text-coral-reaction' },
    { key: 'ALKALINE_EARTH', label: 'Kim loại kiềm thổ (IIA)', color: 'border-copper/60 text-copper' },
    { key: 'TRANSITION_METAL', label: 'Kim loại chuyển tiếp (Nhóm B)', color: 'border-cyan-ion/60 text-cyan-ion' },
    { key: 'POST_TRANSITION', label: 'Kim loại sau chuyển tiếp', color: 'border-blue-400/60 text-blue-400' },
    { key: 'METALLOID', label: 'Bán kim (Á kim)', color: 'border-emerald-400/60 text-emerald-400' },
    { key: 'NONMETAL', label: 'Phi kim', color: 'border-yellow-400/60 text-yellow-400' },
    { key: 'HALOGEN', label: 'Halogen (VIIA)', color: 'border-purple-400/60 text-purple-400' },
    { key: 'NOBLE_GAS', label: 'Khí hiếm (VIIIA)', color: 'border-teal-300/60 text-teal-300' },
    { key: 'LANTHANIDE', label: 'Họ Lantan', color: 'border-pink-400/60 text-pink-400' },
    { key: 'ACTINIDE', label: 'Họ Actini', color: 'border-rose-400/60 text-rose-400' },
  ];

  const substanceCategories: { key: SubstanceCategory | 'ALL'; label: string }[] = [
    { key: 'ALL', label: 'Tất cả (326)' },
    { key: 'OXIDE', label: 'Oxit (Oxide)' },
    { key: 'ACID', label: 'Axit (Acid)' },
    { key: 'BASE', label: 'Bazơ (Base)' },
    { key: 'SALT', label: 'Muối (Salt)' },
    { key: 'HYDROCARBON', label: 'Hiđrocacbon' },
    { key: 'ORGANIC_DERIVATIVE', label: 'Dẫn xuất hữu cơ' },
    { key: 'ELEMENT', label: 'Đơn chất' },
  ];

  const filteredElements = useMemo(() => {
    return ALL_ELEMENTS.filter(elem => {
      const matchesCategory = selectedCategory === 'ALL' || elem.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        elem.symbol.toLowerCase().includes(query) ||
        elem.name_iupac.toLowerCase().includes(query) ||
        elem.name_vi.toLowerCase().includes(query) ||
        elem.z.toString() === query;

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const filteredSubstances = useMemo(() => {
    return ALL_SUBSTANCES.filter(sub => {
      const matchesCat = substanceCategory === 'ALL' || sub.category === substanceCategory;
      const q = substanceSearch.trim().toLowerCase();
      if (!q) return matchesCat;

      const matchesQuery =
        sub.formula.toLowerCase().includes(q) ||
        sub.formula_display.toLowerCase().includes(q) ||
        sub.name_vi.toLowerCase().includes(q) ||
        sub.name_iupac.toLowerCase().includes(q) ||
        sub.common_names_vi.some(cn => cn.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [substanceSearch, substanceCategory]);

  const handleCardClick = (elem: ElementData) => {
    sound.playCardSelect();
    setInspectingElement(elem);
  };

  const getCategoryColor = (cat: ElementCategory): string => {
    switch (cat) {
      case 'ALKALI_METAL': return 'bg-coral-reaction/20 border-coral-reaction/60 text-coral-reaction hover:bg-coral-reaction/30';
      case 'ALKALINE_EARTH': return 'bg-copper/20 border-copper/60 text-copper hover:bg-copper/30';
      case 'TRANSITION_METAL': return 'bg-cyan-ion/15 border-cyan-ion/50 text-cyan-ion hover:bg-cyan-ion/25';
      case 'POST_TRANSITION': return 'bg-blue-500/15 border-blue-500/50 text-blue-400 hover:bg-blue-500/25';
      case 'METALLOID': return 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/25';
      case 'NONMETAL': return 'bg-yellow-500/15 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/25';
      case 'HALOGEN': return 'bg-purple-500/15 border-purple-500/50 text-purple-400 hover:bg-purple-500/25';
      case 'NOBLE_GAS': return 'bg-teal-400/20 border-teal-400/60 text-teal-300 hover:bg-teal-400/30';
      case 'LANTHANIDE': return 'bg-pink-500/15 border-pink-500/50 text-pink-400 hover:bg-pink-500/25';
      case 'ACTINIDE': return 'bg-rose-500/15 border-rose-500/50 text-rose-400 hover:bg-rose-500/25';
      default: return 'bg-navy-light/40 border-navy-light text-ivory';
    }
  };

  // 18-Column IUPAC Layout Groups & Metadata
  const IUPAC_GROUPS = [
    { num: 1, classic: 'IA', name: 'Kim loại kiềm' },
    { num: 2, classic: 'IIA', name: 'Kim loại kiềm thổ' },
    { num: 3, classic: 'IIIB', name: 'Nhóm 3 (Sc, Y, La*, Ac**)' },
    { num: 4, classic: 'IVB', name: 'Nhóm 4 (Ti, Zr, Hf, Rf)' },
    { num: 5, classic: 'VB', name: 'Nhóm 5 (V, Nb, Ta, Db)' },
    { num: 6, classic: 'VIB', name: 'Nhóm 6 (Cr, Mo, W, Sg)' },
    { num: 7, classic: 'VIIB', name: 'Nhóm 7 (Mn, Tc, Re, Bh)' },
    { num: 8, classic: 'VIIIB', name: 'Nhóm 8 (Fe, Ru, Os, Hs)' },
    { num: 9, classic: 'VIIIB', name: 'Nhóm 9 (Co, Rh, Ir, Mt)' },
    { num: 10, classic: 'VIIIB', name: 'Nhóm 10 (Ni, Pd, Pt, Ds)' },
    { num: 11, classic: 'IB', name: 'Nhóm 11 (Cu, Ag, Au, Rg)' },
    { num: 12, classic: 'IIB', name: 'Nhóm 12 (Zn, Cd, Hg, Cn)' },
    { num: 13, classic: 'IIIA', name: 'Nhóm Bo (B, Al, Ga, In, Tl, Nh)' },
    { num: 14, classic: 'IVA', name: 'Nhóm Cacbon (C, Si, Ge, Sn, Pb, Fl)' },
    { num: 15, classic: 'VA', name: 'Nhóm Nitơ (N, P, As, Sb, Bi, Mc)' },
    { num: 16, classic: 'VIA', name: 'Nhóm Chalcogen (O, S, Se, Te, Po, Lv)' },
    { num: 17, classic: 'VIIA', name: 'Halogen (F, Cl, Br, I, At, Ts)' },
    { num: 18, classic: 'VIIIA', name: 'Khí hiếm (He, Ne, Ar, Kr, Xe, Rn, Og)' },
  ];

  const getDisplayPropertyValue = (elem: ElementData): string => {
    switch (displayProperty) {
      case 'WEIGHT':
        return elem.atomic_weight.toFixed(1);
      case 'ELECTRONEGATIVITY':
        return elem.electronegativity !== null ? elem.electronegativity.toFixed(2) : '—';
      case 'IE1':
        return `${Math.round(elem.first_ionization_energy)}`;
      case 'MANA':
        return `⚡${elem.stats.mana_cost}`;
      default:
        return elem.atomic_weight.toFixed(1);
    }
  };

  // 18-Column IUPAC Layout Mapping
  const mainGridElements = useMemo(() => {
    // Map keyed by `${period}-${group}`
    const map: Record<string, ElementData> = {};
    ALL_ELEMENTS.forEach(elem => {
      // Exclude Lanthanides (57-71) and Actinides (89-103) from main grid
      if (elem.category !== 'LANTHANIDE' && elem.category !== 'ACTINIDE') {
        map[`${elem.period}-${elem.group}`] = elem;
      }
    });
    return map;
  }, []);

  const lanthanides = useMemo(() => ALL_ELEMENTS.filter(e => e.category === 'LANTHANIDE'), []);
  const actinides = useMemo(() => ALL_ELEMENTS.filter(e => e.category === 'ACTINIDE'), []);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header & Main Mode Navigation */}
      <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/60 backdrop-blur space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ivory flex items-center gap-2">
              <span>Bách Khoa Hóa Học & Bảng Tuần Hoàn</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40">
                118 Nguyên Tố • 326 Hợp Chất • 312 Phản Ứng
              </span>
            </h2>
            <p className="text-xs text-ivory-muted mt-1">
              Tra cứu chuẩn hóa GDPT 2018 & IUPAC: Cấu hình electron, χ Pauling, I₁, trạng thái, liên kết, và thông số chiến thuật.
            </p>
          </div>

          {/* Main Tab Switches */}
          <div className="flex items-center gap-2 bg-obsidian/60 p-1.5 rounded-xl border border-navy-light/50">
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PERIODIC_TABLE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PERIODIC_TABLE'
                  ? 'bg-cyan-ion text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Bảng Tuần Hoàn</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SUBSTANCES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SUBSTANCES'
                  ? 'bg-copper text-white shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Kho Hợp Chất ({ALL_SUBSTANCES.length})</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('COMPARISON');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'COMPARISON'
                  ? 'bg-purple-500 text-white shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>So Sánh Nguyên Tố</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('EQUILIBRIUM');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'EQUILIBRIUM'
                  ? 'bg-emerald-500 text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Cân Bằng Hóa Học</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('GALVANIC_CELL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'GALVANIC_CELL'
                  ? 'bg-cyan-ion text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Battery className="w-4 h-4 text-cyan-ion" />
              <span>Pin Điện Hóa (Nernst)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('TITRATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'TITRATION'
                  ? 'bg-pink-500 text-obsidian shadow'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-pink-400" />
              <span>Chuẩn Độ pH (Acid-Base)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('BUFFER_CAPACITY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'BUFFER_CAPACITY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Dung Dịch Đệm (Henderson)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ESTER_LIPID_SAPONIFICATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ESTER_LIPID_SAPONIFICATION'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Este - Lipit - Xà Phòng</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CARBOHYDRATE_BIOCHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CARBOHYDRATE_BIOCHEMISTRY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-emerald-400" />
              <span>Cacbohiđrat (Đường & Tinh Bột)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('AMINES_AMINO_ACIDS_PEPTIDES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'AMINES_AMINO_ACIDS_PEPTIDES'
                  ? 'bg-purple-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Amin - Amino Axit - Peptit</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('METALLURGY_CORROSION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'METALLURGY_CORROSION'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Đại Cương Kim Loại & Ăn Mòn</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ALKALI_HARD_WATER');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ALKALI_HARD_WATER'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-amber-400" />
              <span>Kiềm, Kiềm Thổ & Nước Cứng</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('TRANSITION_METALS_COMPLEXES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'TRANSITION_METALS_COMPLEXES'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Gem className="w-4 h-4 text-cyan-400" />
              <span>Kim Loại Chuyển Tiếp & Phức Chất</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ALCOHOL_PHENOL_REACTIONS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ALCOHOL_PHENOL_REACTIONS'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>Ancol - Phenol & Phản Ứng Đặc Trưng</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CARBONYL_CARBOXYLIC_ACID');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CARBONYL_CARBOXYLIC_ACID'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Carbonyl (Anđehit/Xeton) & Axit Cacboxylic</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('NITROGEN_SULFUR_COMPOUNDS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NITROGEN_SULFUR_COMPOUNDS'
                  ? 'bg-sky-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Wind className="w-4 h-4 text-sky-400" />
              <span>Nitrogen, Sulfur & Mưa Axit</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('HYDROCARBONS_REACTIONS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'HYDROCARBONS_REACTIONS'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Hydrocarbon (Ankan, Anken, Ankin, Arene)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('HALOGEN_DERIVATIVES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'HALOGEN_DERIVATIVES'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-teal-400" />
              <span>Dẫn Xuất Halogen & Cơ Chế (SN/E)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CHEMICAL_ENERGETICS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CHEMICAL_ENERGETICS'
                  ? 'bg-orange-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Activity className="w-4 h-4 text-orange-400" />
              <span>Năng Lượng Hóa Học & Định Luật Hess</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CHEMICAL_KINETICS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CHEMICAL_KINETICS'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Tốc Độ Phản Ứng & Động Hóa Học</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('HALOGENS_REDOX');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'HALOGENS_REDOX'
                  ? 'bg-amber-400 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-amber-300" />
              <span>Nhóm Halogen & Nước Javel</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('REDOX_REACTIONS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'REDOX_REACTIONS'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Phản Ứng Oxi Hóa - Khử</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PERIODIC_TRENDS_OCTET');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PERIODIC_TRENDS_OCTET'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-cyan-300" />
              <span>Biến Đổi Tuần Hoàn & Octet</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CURRICULUM_MASTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CURRICULUM_MASTERY'
                  ? 'bg-emerald-400 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-300" />
              <span>Ma Trận GDPT 2018 (Lớp 10-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('TOURNAMENT_CHAMPIONSHIP');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'TOURNAMENT_CHAMPIONSHIP'
                  ? 'bg-yellow-400 text-obsidian shadow font-extrabold ring-2 ring-yellow-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>Giải Đấu 16 Tuyển Thủ</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SALT_HYDROLYSIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SALT_HYDROLYSIS'
                  ? 'bg-blue-500 text-obsidian shadow font-extrabold ring-2 ring-blue-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-blue-300" />
              <span>Thủy Phân Muối & Phèn Chua</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('FORENSIC_CHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FORENSIC_CHEMISTRY'
                  ? 'bg-indigo-500 text-obsidian shadow font-extrabold ring-2 ring-indigo-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-indigo-300" />
              <span>Hóa Học Pháp Y & Độc Chất</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PHARMACOKINETICS_ADME');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PHARMACOKINETICS_ADME'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-2 ring-rose-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Pill className="w-4 h-4 text-rose-300" />
              <span>Dược Động Học & Cửa Sổ Trị Liệu</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('FOOD_CHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FOOD_CHEMISTRY'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-300" />
              <span>Hóa Học Thực Phẩm & An Toàn</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CHIRAL_STEREOCHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CHIRAL_STEREOCHEMISTRY'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-2 ring-teal-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-teal-300" />
              <span>Hóa Lập Thể & Phân Cực Kế (R/S)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('BIOPOLYMERS_BIODEGRADATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'BIOPOLYMERS_BIODEGRADATION'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Recycle className="w-4 h-4 text-emerald-300" />
              <span>Biopolymer & Phân Hủy Sinh Học</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('INDUSTRIAL_ELECTROCHEMICAL_REFINING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'INDUSTRIAL_ELECTROCHEMICAL_REFINING'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold ring-2 ring-cyan-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Điện Phân Xút - Clo & Luyện Đồng</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SOIL_FERTILIZER_CHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SOIL_FERTILIZER_CHEMISTRY'
                  ? 'bg-lime-500 text-obsidian shadow font-extrabold ring-2 ring-lime-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sprout className="w-4 h-4 text-lime-300" />
              <span>Hóa Học Đất & Phân Bón</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('DYES_AZO_CHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DYES_AZO_CHEMISTRY'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-2 ring-rose-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Palette className="w-4 h-4 text-rose-300" />
              <span>Phẩm Nhuộm & Ghép Đôi Azo</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PETROLEUM_REFINING_OCTANE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PETROLEUM_REFINING_OCTANE'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Fuel className="w-4 h-4 text-amber-300" />
              <span>Lọc Dầu, Cracking & Xăng E5</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ATMOSPHERIC_PHOTOCHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ATMOSPHERIC_PHOTOCHEMISTRY'
                  ? 'bg-sky-500 text-obsidian shadow font-extrabold ring-2 ring-sky-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Wind className="w-4 h-4 text-sky-300" />
              <span>Quang Hóa Khí Quyển & Môi Trường</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('RADIOMETRIC_DATING_NUCLEAR');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'RADIOMETRIC_DATING_NUCLEAR'
                  ? 'bg-indigo-500 text-obsidian shadow font-extrabold ring-2 ring-indigo-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-indigo-300" />
              <span>Vỏ Hạt Nhân & Định Tuổi Phóng Xạ</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('QUANTUM_DOTS_NANOTECH');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'QUANTUM_DOTS_NANOTECH'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-2 ring-teal-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Chấm Lượng Tử &amp; Màn Hình QLED</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MOF_CARBON_CAPTURE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MOF_CARBON_CAPTURE'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Box className="w-4 h-4 text-emerald-300" />
              <span>Khung Kim Loại - Hữu Cơ (MOFs)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PHOTOCATALYTIC_SOLAR_ENERGY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PHOTOCATALYTIC_SOLAR_ENERGY'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Quang Xúc Tác & Pin Tandem</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SUPERCAPACITOR_AEROGEL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SUPERCAPACITOR_AEROGEL'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-300" />
              <span>Siêu Tụ Điện & Khí Gel Graphene</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SOLID_STATE_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SOLID_STATE_BATTERY'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold ring-2 ring-cyan-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <BatteryCharging className="w-4 h-4 text-cyan-300" />
              <span>Pin Toàn Rắn (ASSB)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('NANOGENERATOR_PENG_TENG');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NANOGENERATOR_PENG_TENG'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Máy Phát Điện Nano (PENG & TENG)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('THERMOELECTRIC_ENERGY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'THERMOELECTRIC_ENERGY'
                  ? 'bg-orange-500 text-obsidian shadow font-extrabold ring-2 ring-orange-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-300" />
              <span>Nhiệt Điện (Seebeck & Peltier)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MICROBIAL_FUEL_CELL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MICROBIAL_FUEL_CELL'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-emerald-300" />
              <span>Pin Nhiên Liệu Vi Sinh (MFC)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('HYDROGEN_FUEL_CELL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'HYDROGEN_FUEL_CELL'
                  ? 'bg-sky-500 text-obsidian shadow font-extrabold ring-2 ring-sky-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-sky-300" />
              <span>Pin Nhiên Liệu Hydro (PEMFC & SOFC)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('REDOX_FLOW_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'REDOX_FLOW_BATTERY'
                  ? 'bg-violet-500 text-obsidian shadow font-extrabold ring-2 ring-violet-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Database className="w-4 h-4 text-violet-300" />
              <span>Pin Dòng Chảy (VRFB & LDES)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SODIUM_ION_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SODIUM_ION_BATTERY'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Pin Natri-ion (Na-ion & PBA)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('LITHIUM_SULFUR_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'LITHIUM_SULFUR_BATTERY'
                  ? 'bg-yellow-500 text-obsidian shadow font-extrabold ring-2 ring-yellow-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>Pin Lithi - Lưu Huỳnh (Li-S & MXene)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('METAL_AIR_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'METAL_AIR_BATTERY'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-2 ring-teal-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Wind className="w-4 h-4 text-teal-300" />
              <span>Pin Kim Loại - Không Khí (Metal-Air)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('BETAVOLTAIC_NUCLEAR_BATTERY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'BETAVOLTAIC_NUCLEAR_BATTERY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-300" />
              <span>Pin Hạt Nhân (Betavoltaic & C-14)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PEROVSKITE_SOLAR_CELL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PEROVSKITE_SOLAR_CELL'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Pin Mặt Trời Perovskite & Tandem</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SOLID_OXIDE_ELECTROLYZER');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SOLID_OXIDE_ELECTROLYZER'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-2 ring-rose-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Factory className="w-4 h-4 text-rose-300" />
              <span>Điện Phân Oxit Rắn (SOEC & Syngas)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ANION_EXCHANGE_ELECTROLYZER');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ANION_EXCHANGE_ELECTROLYZER'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-2 ring-teal-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-teal-300" />
              <span>Điện Phân Màng Anion (AEMWE & NiFe)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('DIRECT_AIR_CAPTURE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DIRECT_AIR_CAPTURE'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold ring-2 ring-cyan-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Wind className="w-4 h-4 text-cyan-300" />
              <span>Thu Hút CO₂ Khí Quyển (DAC & TVSA)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('IODINE_SULFUR_CYCLE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'IODINE_SULFUR_CYCLE'
                  ? 'bg-purple-500 text-obsidian shadow font-extrabold ring-2 ring-purple-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-purple-300" />
              <span>Chu Trình Nhiệt Hóa Iod - Lưu Huỳnh (S-I)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('DIRECT_LITHIUM_EXTRACTION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DIRECT_LITHIUM_EXTRACTION'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Khai Thác Liti Địa Nhiệt (DLE & Sàng Ion)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SUPERCRITICAL_WATER_OXIDATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SUPERCRITICAL_WATER_OXIDATION'
                  ? 'bg-orange-500 text-obsidian shadow font-extrabold ring-2 ring-orange-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Oxi Hóa Nước Siêu Tới Hạn (SCWO & PFAS)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SALINITY_GRADIENT_OSMOTIC');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SALINITY_GRADIENT_OSMOTIC'
                  ? 'bg-blue-500 text-obsidian shadow font-extrabold ring-2 ring-blue-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-blue-300" />
              <span>Năng Lượng Thẩm Thấu Lam (PRO & RED)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('OCEAN_THERMAL_ENERGY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'OCEAN_THERMAL_ENERGY'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold ring-2 ring-cyan-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-cyan-300" />
              <span>Nhiệt Năng Đại Dương (OTEC & NH₃)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MOLTEN_SALT_REACTOR');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MOLTEN_SALT_REACTOR'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Lò Muối Lỏng Thori (LFTR & sCO₂)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('TOKAMAK_FUSION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'TOKAMAK_FUSION'
                  ? 'bg-purple-500 text-obsidian shadow font-extrabold ring-2 ring-purple-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-purple-300" />
              <span>Nhiệt Hạch Tokamak (D-T & REBCO)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('METAL_HYDRIDE_STORAGE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'METAL_HYDRIDE_STORAGE'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Hydro Thể Rắn (Metal Hydride)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Quang Phân Tách Nước (Z-Scheme)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('GEOTHERMAL_MINERAL_EXTRACTION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'GEOTHERMAL_MINERAL_EXTRACTION'
                  ? 'bg-orange-500 text-obsidian shadow font-extrabold ring-2 ring-orange-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-300" />
              <span>Địa Nhiệt & Chiết Xuất Lithium (DLE)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CU_CL_THERMOCHEMICAL_CYCLE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CU_CL_THERMOCHEMICAL_CYCLE'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-2 ring-rose-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-300" />
              <span>Nhiệt Hóa Đồng-Clo (Cu-Cl 530°C)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SMES_CRYOGENIC_STORAGE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SMES_CRYOGENIC_STORAGE'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold ring-2 ring-cyan-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Lưu Trữ Siêu Dẫn (SMES & LH₂)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MICROCHANNEL_FISCHER_TROPSCH');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MICROCHANNEL_FISCHER_TROPSCH'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold ring-2 ring-emerald-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Plane className="w-4 h-4 text-emerald-300" />
              <span>Fischer-Tropsch Vi Kênh (SAF)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MEMBRANE_METHANE_AROMATIZATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MEMBRANE_METHANE_AROMATIZATION'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold ring-2 ring-amber-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-amber-300" />
              <span>Lò Phản Ứng Màng MDA (H₂ & C₆H₆)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('MICROBIAL_ELECTROSYNTHESIS_MES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MICROBIAL_ELECTROSYNTHESIS_MES'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold ring-2 ring-teal-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Dna className="w-4 h-4 text-teal-300" />
              <span>Điện Hóa Sinh Học MES (CO₂ → Axetat)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('METAL_HYDRIDE_THERMAL_STORAGE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'METAL_HYDRIDE_THERMAL_STORAGE'
                  ? 'bg-rose-500 text-obsidian shadow font-extrabold ring-2 ring-rose-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-300" />
              <span>Lưu Trữ Nhiệt Hydrit (TCS & MgH₂)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('PHOTOELECTROCHEMICAL_TANDEM');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PHOTOELECTROCHEMICAL_TANDEM'
                  ? 'bg-amber-400 text-obsidian shadow font-extrabold ring-2 ring-amber-200'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Quang Điện Hóa Tandem (PEC H₂)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('LITHIUM_MEDIATED_AMMONIA');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'LITHIUM_MEDIATED_AMMONIA'
                  ? 'bg-teal-400 text-obsidian shadow font-extrabold ring-2 ring-teal-200'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-teal-300" />
              <span>Tổng Hợp Amoniac Liti (Li-NRR)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('THERMOPHOTOVOLTAIC_GRID_STORAGE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'THERMOPHOTOVOLTAIC_GRID_STORAGE'
                  ? 'bg-orange-500 text-obsidian shadow font-extrabold ring-2 ring-orange-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-300" />
              <span>Pin Nhiệt Quang Điện (TPV Grid)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('DEEP_SEA_BIOLEACHING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DEEP_SEA_BIOLEACHING'
                  ? 'bg-blue-500 text-obsidian shadow font-extrabold ring-2 ring-blue-300'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-blue-300" />
              <span>Hòa Tách Khoáng Biển Sâu (NMC-811)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('INDUSTRIAL_REACTOR');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'INDUSTRIAL_REACTOR'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Factory className="w-4 h-4 text-amber-400" />
              <span>Lò Khí Công Nghiệp (Haber-Bosch)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('COORDINATION_COMPLEX');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'COORDINATION_COMPLEX'
                  ? 'bg-purple-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Phức Chất & CFT (Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('VSEPR_BONDING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'VSEPR_BONDING'
                  ? 'bg-cyan-ion text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-300" />
              <span>Mô Hình VSEPR 3D (Hóa 10)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('SOLUBILITY_PRECIPITATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SOLUBILITY_PRECIPITATION'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-teal-300" />
              <span>Tích Số Tan & Kết Tủa (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ELECTROLYSIS_FARADAY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ELECTROLYSIS_FARADAY'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Điện Phân & Faraday (Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('ORGANIC_MECHANISMS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ORGANIC_MECHANISMS'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-emerald-300" />
              <span>Hóa Hữu Cơ & Đồng Phân (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('POLYMERS_MACROMOLECULES');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'POLYMERS_MACROMOLECULES'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>Polime & Vật Liệu (Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('NUCLEAR_RADIOACTIVITY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NUCLEAR_RADIOACTIVITY'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radiation className="w-4 h-4 text-amber-300" />
              <span>Hạt Nhân & Phóng Xạ (Hóa 10 & Lý 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('GREEN_CHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'GREEN_CHEMISTRY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>Hóa Học Xanh & Môi Trường (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('CRYSTALLOGRAPHY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CRYSTALLOGRAPHY'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Gem className="w-4 h-4 text-cyan-300" />
              <span>Tinh Thể & Ô Mạng Cơ Sở (Hóa 10)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                setActiveMainTab('COLLOIDS_SURFACE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'COLLOIDS_SURFACE'
                  ? 'bg-blue-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-blue-300" />
              <span>Hóa Keo & Bề Mặt (Hóa 10-11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSpectroLampShutter();
                setActiveMainTab('SPECTROPHOTOMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SPECTROPHOTOMETRY'
                  ? 'bg-indigo-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Eye className="w-4 h-4 text-indigo-300" />
              <span>Quang Phổ & Beer-Lambert (Hóa 10-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playMassSpecIonTrapHum();
                setActiveMainTab('MASS_SPECTROMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MASS_SPECTROMETRY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>Phổ Khối Lượng MS (Hóa 10-11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playInfraredLaserChirp();
                setActiveMainTab('INFRARED_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'INFRARED_SPECTROSCOPY'
                  ? 'bg-rose-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-rose-300" />
              <span>Phổ Hồng Ngoại IR (Hóa 11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playNmrRfPulseBip();
                setActiveMainTab('NMR_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NMR_SPECTROSCOPY'
                  ? 'bg-cyan-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radio className="w-4 h-4 text-cyan-300" />
              <span>Cộng Hưởng Từ NMR (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playAnalyticalDeductionSuccess?.();
                setActiveMainTab('STRUCTURAL_ELUCIDATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'STRUCTURAL_ELUCIDATION'
                  ? 'bg-purple-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Dna className="w-4 h-4 text-purple-300" />
              <span>Giải Đoán Đa Phổ (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playBoilingBubbleSim?.();
                setActiveMainTab('PHASE_EQUILIBRIA');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PHASE_EQUILIBRIA'
                  ? 'bg-amber-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Thermometer className="w-4 h-4 text-amber-300" />
              <span>Cân Bằng Pha & Chưng Cất (Hóa 10-11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSeparatoryFunnelShake?.();
                setActiveMainTab('EXTRACTION_PARTITION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'EXTRACTION_PARTITION'
                  ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Filter className="w-4 h-4 text-teal-300" />
              <span>Chiết & Phân Bố Pha (Hóa 11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playEluentFlowHum?.();
                setActiveMainTab('CHROMATOGRAPHY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CHROMATOGRAPHY'
                  ? 'bg-emerald-500 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sliders className="w-4 h-4 text-emerald-300" />
              <span>Sắc Kí TLC & Cột (Hóa 11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCrystalGrowthChime?.();
                setActiveMainTab('RECRYSTALLIZATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'RECRYSTALLIZATION'
                  ? 'bg-amber-400 text-obsidian shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Kết Tinh Lại & Nóng Chảy (Hóa 11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playPrecipitateFormChime?.();
                setActiveMainTab('FUNCTIONAL_GROUP_REACTIONS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FUNCTIONAL_GROUP_REACTIONS'
                  ? 'bg-rose-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Pipette className="w-4 h-4 text-rose-300" />
              <span>Nhận Biết Nhóm Chức (Hóa 11-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playGasPistonCompressionWhoosh?.();
                setActiveMainTab('GAS_LAWS_KINETIC');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'GAS_LAWS_KINETIC'
                  ? 'bg-sky-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Wind className="w-4 h-4 text-sky-300" />
              <span>Định Luật Chất Khí & Động Học Phân Tử (Hóa 10-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playOsmoticFlowTrickle?.();
                setActiveMainTab('OSMOSIS_COLLIGATIVE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'OSMOSIS_COLLIGATIVE'
                  ? 'bg-cyan-500 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Droplets className="w-4 h-4 text-cyan-300" />
              <span>Áp Suất Thẩm Thấu & Tính Chất Nồng Độ (Hóa 10-12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playNuclearResonanceHum?.();
                setActiveMainTab('NUCLEAR_SHELL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NUCLEAR_SHELL'
                  ? 'bg-purple-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radiation className="w-4 h-4 text-purple-300" />
              <span>Mô Hình Vỏ Hạt Nhân & Năng Lượng Liên Kết (Nobel 1963)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCoordinationColorShiftChime?.();
                setActiveMainTab('CRYSTAL_FIELD_THEORY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CRYSTAL_FIELD_THEORY'
                  ? 'bg-blue-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-300" />
              <span>Thuyết Trường Tinh Thể & Phổ Hấp Thụ Phức Chất (Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playEnzymeSubstrateLockChime?.();
                setActiveMainTab('ENZYME_KINETICS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ENZYME_KINETICS'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>Động Học Xúc Tác Enzyme & Michaelis-Menten (Sinh 10 & Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playQuantumHallPlateauLockBeep?.();
                setActiveMainTab('QUANTUM_HALL');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'QUANTUM_HALL'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-300" />
              <span>Hiệu Ứng Hall Lượng Tử & Vật Liệu Tô Pô (Vật lí 12 Chuyên đề & Nobel 1985/2016)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playUvPhotonAbsorptionChime?.();
                setActiveMainTab('OZONE_PHOTOCHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'OZONE_PHOTOCHEMISTRY'
                  ? 'bg-sky-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-sky-300" />
              <span>Quang Hóa Khí Quyển & Chu Trình Ozon Chapman (Hóa 10 & 12 • Nobel 1995)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSuperconductingMeissnerLevitateHum?.();
                setActiveMainTab('SUPERCONDUCTIVITY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SUPERCONDUCTIVITY'
                  ? 'bg-blue-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-blue-300" />
              <span>Vật Lý Siêu Dẫn & Đệm Từ Meissner (Vật lí 12 Chuyên đề & Nobel 1972/1987)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playFuelCellProtonFlowHum?.();
                setActiveMainTab('FUEL_CELLS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FUEL_CELLS'
                  ? 'bg-sky-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-sky-300" />
              <span>Pin Nhiên Liệu Hydro & Động Học Butler-Volmer (Hóa học 12 GDPT • Net-Zero 2050)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playBatteryIntercalationZip?.();
                setActiveMainTab('BATTERY_INTERCALATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'BATTERY_INTERCALATION'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Battery className="w-4 h-4 text-emerald-300" />
              <span>Pin Lithium-Ion & Động Học Xen Phủ (Nobel Hóa Học 2019 • Hóa học 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playPcrThermalStepChime?.();
                setActiveMainTab('PCR_ELECTROPHORESIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PCR_ELECTROPHORESIS'
                  ? 'bg-fuchsia-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Dna className="w-4 h-4 text-fuchsia-300" />
              <span>Nhân Bản Gen PCR & Điện Di Agarose (Nobel Hóa Học 1993 • Sinh & Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCrisprCas9DsbSnip?.();
                setActiveMainTab('CRISPR_CAS9');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CRISPR_CAS9'
                  ? 'bg-teal-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Scissors className="w-4 h-4 text-teal-300" />
              <span>Chỉnh Sửa Gen CRISPR-Cas9 (Nobel Hóa Học 2020 • Sinh & Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playThermalFurnaceRampHum?.();
                setActiveMainTab('THERMAL_ANALYSIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'THERMAL_ANALYSIS'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-300" />
              <span>Phân Tích Nhiệt TGA / DTG / DSC (Chuẩn ICTAC • Hóa học 10, 11 & 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playElectronBeamSweepScan?.();
                setActiveMainTab('ELECTRON_MICROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ELECTRON_MICROSCOPY'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Microscope className="w-4 h-4 text-emerald-300" />
              <span>Kính Hiển Vi Điện Tử SEM / TEM & Sóng De Broglie (Nobel Vật Lý 1929, 1986 & Hóa 10)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playXpsPhotonFlash?.();
                setActiveMainTab('XPS_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'XPS_SPECTROSCOPY'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radio className="w-4 h-4 text-amber-300" />
              <span>Quang Phổ Quang Điện Tử XPS / ESCA & Auger AES (Nobel Vật Lý 1981, 1921 & Hóa 10, 11)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playAfmTipApproachSnap?.();
                setActiveMainTab('AFM_CANTILEVER');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'AFM_CANTILEVER'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <MoveVertical className="w-4 h-4 text-emerald-300" />
              <span>Kính Hiển Vi Lực Nguyên Tử AFM & Phổ Lennard-Jones (Nobel Vật Lý 1986 & Vật Lý 10, 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSprResonanceDipSweep?.();
                setActiveMainTab('SURFACE_PLASMON');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SURFACE_PLASMON'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-cyan-300" />
              <span>Cộng Hưởng Plasmon Bề Mặt SPR & Động Học Phân Tử Sinh Học (Kretschmann & Hóa 10, 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playDlsLaserScatteringPulse?.();
                setActiveMainTab('DYNAMIC_LIGHT_SCATTERING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DYNAMIC_LIGHT_SCATTERING'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Tán Xạ Ánh Sáng Động DLS & Điện Thế Zeta (Nobel Vật Lý 1926 & Hóa 10, 11, 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCircularDichroismChiralHum?.();
                setActiveMainTab('CIRCULAR_DICHROISM');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CIRCULAR_DICHROISM'
                  ? 'bg-indigo-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-indigo-300" />
              <span>Phổ Lưỡng Sắc Tròn CD & Cấu Trúc Bậc II Protein (Cotton 1896 & Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playThermalShiftPeakTone?.();
                setActiveMainTab('THERMAL_SHIFT_ASSAY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'THERMAL_SHIFT_ASSAY'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Huỳnh Quang Quét Vi Sai DSF & Sàng Lọc Thuốc (Schellman & Hóa 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playGuinierFitLockTone?.();
                setActiveMainTab('SAXS_SCATTERING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SAXS_SCATTERING'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Scan className="w-4 h-4 text-cyan-300" />
              <span>Tán Xạ Tia X Góc Nhỏ SAXS & Kratky (Guinier 1939 & Vật Lý 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playFscResolutionLockTone?.();
                setActiveMainTab('CRYO_ELECTRON_MICROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CRYO_ELECTRON_MICROSCOPY'
                  ? 'bg-blue-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Snowflake className="w-4 h-4 text-blue-300" />
              <span>Kính Hiển Vi Điện Tử Lạnh Cryo-EM & Tái Tạo 3D (Nobel 2017 & GDPT 2018)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playHartmannHahnResonanceLockTone?.();
                setActiveMainTab('SOLID_STATE_NMR');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SOLID_STATE_NMR'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-300" />
              <span>Cộng Hưởng Từ Hạt Nhân Rắn ssNMR & MAS (Góc 54.74° & Vật Lý 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playKineticBurstDetectionTone?.();
                setActiveMainTab('STOPPED_FLOW_KINETICS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'STOPPED_FLOW_KINETICS'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Timer className="w-4 h-4 text-amber-300" />
              <span>Động Học Nhanh Stopped-Flow & Flash Photolysis (Nobel 1967 & Hóa 10)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playDeFeijterMassResolvedChime?.();
                setActiveMainTab('DUAL_POLARIZATION_INTERFEROMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DUAL_POLARIZATION_INTERFEROMETRY'
                  ? 'bg-teal-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-teal-300" />
              <span>Giao Thoa Phân Cực Kép DPI & De Feijter (Bề Dày 0.1Å & Vật Lý 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playQcmdQuartzResonancePing?.(3);
                setActiveMainTab('QCMD_MICROBALANCE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'QCMD_MICROBALANCE'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Gauge className="w-4 h-4 text-cyan-300" />
              <span>Cân Vi Lượng Thạch Anh QCM-D & Voigt (Sauerbrey 1959 & Vật Lý 12)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playOpticalTrapCaptureTone?.(100);
                setActiveMainTab('OPTICAL_TWEEZERS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'OPTICAL_TWEEZERS'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Crosshair className="w-4 h-4 text-cyan-300" />
              <span>Bẫy Quang Học Laser & Phổ Lực Đơn Phân Tử (Ashkin 2018 & Marko-Siggia)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playMagneticBeadRotationTone?.(0);
                setActiveMainTab('MAGNETIC_TWEEZERS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MAGNETIC_TWEEZERS'
                  ? 'bg-purple-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Magnet className="w-4 h-4 text-purple-300" />
              <span>Bẫy Từ Vi Lưu & Siêu Xoắn ADN Plectoneme (Strick 1996 & Topoisomerase)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCapillaryHighVoltageHum?.(20);
                setActiveMainTab('CAPILLARY_ELECTROPHORESIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'CAPILLARY_ELECTROPHORESIS'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-300" />
              <span>Điện Di Mao Quản CE & Dòng Thẩm Thấu EOF (Tiselius 1948 & Chiral)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playPetPositronAnnihilationPing?.(511);
                setActiveMainTab('PET_RADIOCHEMISTRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PET_RADIOCHEMISTRY'
                  ? 'bg-rose-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radiation className="w-4 h-4 text-rose-300" />
              <span>Hóa Phóng Xạ PET & Hủy Cặp Positron 511 keV (Warburg & FDG)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playStmQuantumTunnelingHum?.(1.5);
                setActiveMainTab('SCANNING_TUNNELING_MICROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SCANNING_TUNNELING_MICROSCOPY'
                  ? 'bg-indigo-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Crosshair className="w-4 h-4 text-indigo-300" />
              <span>Hiển Vi Quét Xuyên Ngầm STM & Mật Độ Trạng Thái LDOS (Binnig 1986 & Tersoff)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playFemtosecondPumpLaserTone?.();
                setActiveMainTab('FEMTOSECOND_PUMP_PROBE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FEMTOSECOND_PUMP_PROBE'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Quang Phổ Bơm - Dò Femtosecond & Trạng Thái Chuyển Tiếp (Zewail 1999)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSimsPrimaryIonSputterTone?.();
                setActiveMainTab('SECONDARY_ION_MASS_SPECTROMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SECONDARY_ION_MASS_SPECTROMETRY'
                  ? 'bg-teal-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Atom className="w-4 h-4 text-teal-300" />
              <span>Khối Phổ Ion Thứ Cấp SIMS & Phân Tích Độ Sâu Đồng Vị (Sigmund 1969)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playMossbauerDopplerDriveHum?.(0.0);
                setActiveMainTab('MOSSBAUER_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MOSSBAUER_SPECTROSCOPY'
                  ? 'bg-violet-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Radio className="w-4 h-4 text-violet-300" />
              <span>Quang Phổ Mössbauer & Cộng Hưởng Hạt Nhân ⁵⁷Fe (Nobel 1961)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSynchrotronMonochromatorEnergySweep?.(8979.0);
                setActiveMainTab('XAFS_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'XAFS_SPECTROSCOPY'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Quang Phổ Hấp Thụ Tia X XAFS (XANES / EXAFS & Synchrotron)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playDmaOscillationFrequencyHum?.(1.0);
                setActiveMainTab('DMA_VISCOELASTICITY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DMA_VISCOELASTICITY'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Activity className="w-4 h-4 text-amber-300" />
              <span>Phân Tích Cơ Học Động DMA & Hóa Thủy Tinh Tg (ISO 6721)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playCalorimetricHeatExothermHiss?.(-25.5);
                setActiveMainTab('ISOTHERMAL_TITRATION_CALORIMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ISOTHERMAL_TITRATION_CALORIMETRY'
                  ? 'bg-rose-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-300" />
              <span>Nhiệt Lượng Kế Chuẩn Độ ITC & Enthalpy Liên Kết (Wiseman 1989)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playTaylorConeHighVoltageHum?.(3.5);
                setActiveMainTab('ELECTROSPRAY_IONIZATION_MASS_SPEC');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ELECTROSPRAY_IONIZATION_MASS_SPEC'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Khối Phổ Phun Mù Điện ESI-MS & Đa Tích Điện (Nobel 2002)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSupercriticalFluidBprPressureHiss?.(150);
                setActiveMainTab('SUPERCRITICAL_FLUID_CHROMATOGRAPHY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SUPERCRITICAL_FLUID_CHROMATOGRAPHY'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>Sắc Ký Siêu Tới Hạn SFC & Đối Quang Chiral (Green CO2)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playHydrodynamicModeDiameterBeep?.(100);
                setActiveMainTab('NANOPARTICLE_TRACKING_ANALYSIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'NANOPARTICLE_TRACKING_ANALYSIS'
                  ? 'bg-indigo-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Microscope className="w-4 h-4 text-indigo-300" />
              <span>Bám Vết Hạt Nano NTA & Chuyển Động Brown (ISO 19430)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playMstIrLaserHeatingHum?.(40);
                setActiveMainTab('MICROSCALE_THERMOPHORESIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'MICROSCALE_THERMOPHORESIS'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Nhiệt Di Chuyển Vi Mô MST & Ái Lực Kd (Soret 1879)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playBliDipAndReadChime?.();
                setActiveMainTab('BIO_LAYER_INTERFEROMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'BIO_LAYER_INTERFEROMETRY'
                  ? 'bg-cyan-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Waves className="w-4 h-4 text-cyan-300" />
              <span>Giao Thoa Lớp Sinh Học BLI & Động Học kon/koff (Octet)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playResonatorCantileverTransitBlip?.();
                setActiveMainTab('RESONANT_MASS_MEASUREMENT');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'RESONANT_MASS_MEASUREMENT'
                  ? 'bg-teal-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Scale className="w-4 h-4 text-teal-300" />
              <span>Đo Khối Lượng Cộng Hưởng RMM & Lực Đẩy Ác-si-mét (SMR USP &lt;1788&gt;)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playProteinDenaturationTmPeakChime?.();
                setActiveMainTab('DIFFERENTIAL_SCANNING_CALORIMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'DIFFERENTIAL_SCANNING_CALORIMETRY'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Nhiệt Lượng Quét Vi Sai DSC & Độ Ổn Định Protein (Tm / Cp)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playPpcPressureJumpHiss?.();
                setActiveMainTab('PRESSURE_PERTURBATION_CALORIMETRY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'PRESSURE_PERTURBATION_CALORIMETRY'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Gauge className="w-4 h-4 text-emerald-300" />
              <span>Nhiệt Lượng Nhiễu Loạn Áp Suất PPC & Độ Nở Nhiệt (α IUPAC)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playZimmPlotMolarMassChime?.();
                setActiveMainTab('SEC_MALS_LIGHT_SCATTERING');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SEC_MALS_LIGHT_SCATTERING'
                  ? 'bg-violet-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Compass className="w-4 h-4 text-violet-300" />
              <span>Sắc Ký Loại Trừ & Tán Xạ Ánh Sáng SEC-MALS (Zimm Mw)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playUltracentrifugeRotorHum?.();
                setActiveMainTab('ANALYTICAL_ULTRACENTRIFUGATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ANALYTICAL_ULTRACENTRIFUGATION'
                  ? 'bg-blue-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-blue-300" />
              <span>Siêu Ly Tâm Phân Tích AUC & Svedberg (c(s) 1926-2026)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playAf4CrossFlowChannelHiss?.();
                setActiveMainTab('ASYMMETRICAL_FLOW_FIELD_FLOW_FRACTIONATION');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'ASYMMETRICAL_FLOW_FIELD_FLOW_FRACTIONATION'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-300" />
              <span>Sắc Ký Dòng Chảy Trường AF4 (Giddings FFF & Nanoparticles)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playTdaCapillaryFlowWhistle?.();
                setActiveMainTab('TAYLOR_DISPERSION_ANALYSIS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'TAYLOR_DISPERSION_ANALYSIS'
                  ? 'bg-teal-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <GitCommit className="w-4 h-4 text-teal-300" />
              <span>Tán Xạ Mao Quản Taylor (TDA Đo Kép Không Hiệu Chuẩn)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playAutocorrelationDiffusionChime?.();
                setActiveMainTab('FLUORESCENCE_CORRELATION_SPECTROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FLUORESCENCE_CORRELATION_SPECTROSCOPY'
                  ? 'bg-fuchsia-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Focus className="w-4 h-4 text-fuchsia-300" />
              <span>Quang Phổ Tương Quan Huỳnh Quang FCS (Femtoliter Đơn Phân Tử)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playNanosecondDecayPhasorChime?.();
                setActiveMainTab('FLUORESCENCE_LIFETIME_IMAGING_MICROSCOPY');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'FLUORESCENCE_LIFETIME_IMAGING_MICROSCOPY'
                  ? 'bg-amber-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Kính Hiển Vi Đo Thời Gian Sống FLIM & TCSPC (Phasor Plot & FRET)</span>
            </button>
            <button
              onClick={() => {
                sound.playUiClick();
                sound.playSmFretLaserAlternationClick?.();
                setActiveMainTab('SINGLE_MOLECULE_FRET_ALEX');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'SINGLE_MOLECULE_FRET_ALEX'
                  ? 'bg-emerald-600 text-white shadow font-extrabold'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>FRET Đơn Phân Tử smFRET & Kích Thích Xen Kẽ ALEX (E-S Diagram & HMM)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PERIODIC TABLE VIEW                                             */}
      {/* ========================================================================= */}
      {activeMainTab === 'PERIODIC_TABLE' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Controls Bar: Layout Mode, Property Display, Trend Chart, Search */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-navy/60 p-3.5 rounded-xl border border-navy-light/40">
            <div className="flex items-center gap-2">
              <span className="text-xs text-ivory-muted font-mono flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Bố cục:
              </span>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setTableLayoutMode('18_COLUMN');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                  tableLayoutMode === '18_COLUMN'
                    ? 'bg-cyan-ion/20 text-cyan-ion border-cyan-ion font-bold'
                    : 'bg-obsidian text-ivory-muted border-navy-light hover:text-ivory'
                }`}
              >
                18 Cột Chuẩn IUPAC
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setTableLayoutMode('GRID');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                  tableLayoutMode === 'GRID'
                    ? 'bg-cyan-ion/20 text-cyan-ion border-cyan-ion font-bold'
                    : 'bg-obsidian text-ivory-muted border-navy-light hover:text-ivory'
                }`}
              >
                Lưới Thẻ Trực Quan
              </button>
            </div>

            {/* Property Display Toggle (Active in 18-column mode) */}
            {tableLayoutMode === '18_COLUMN' && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-ivory-muted font-mono hidden md:inline">Hiển thị:</span>
                <div className="flex items-center bg-obsidian rounded-lg border border-navy-light p-0.5 text-[11px] font-mono">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setDisplayProperty('WEIGHT');
                    }}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      displayProperty === 'WEIGHT' ? 'bg-cyan-ion text-obsidian font-bold' : 'text-ivory-muted hover:text-ivory'
                    }`}
                    title="Khối lượng nguyên tử tương đối (u)"
                  >
                    Khối Lượng (u)
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setDisplayProperty('ELECTRONEGATIVITY');
                    }}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      displayProperty === 'ELECTRONEGATIVITY' ? 'bg-cyan-ion text-obsidian font-bold' : 'text-ivory-muted hover:text-ivory'
                    }`}
                    title="Độ âm điện theo thang Pauling (χ)"
                  >
                    Độ Âm Điện (χ)
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setDisplayProperty('IE1');
                    }}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      displayProperty === 'IE1' ? 'bg-cyan-ion text-obsidian font-bold' : 'text-ivory-muted hover:text-ivory'
                    }`}
                    title="Năng lượng ion hóa thứ nhất (kJ/mol)"
                  >
                    Năng Lượng I₁
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setDisplayProperty('MANA');
                    }}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      displayProperty === 'MANA' ? 'bg-cyan-ion text-obsidian font-bold' : 'text-ivory-muted hover:text-ivory'
                    }`}
                    title="Chi phí Mana chiến thuật trong ELEMENTA"
                  >
                    Mana Game
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Trend Chart Toggle */}
              <button
                onClick={() => {
                  sound.playUiClick();
                  setShowTrendChart(!showTrendChart);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showTrendChart
                    ? 'bg-cyan-ion text-obsidian border-cyan-ion font-bold'
                    : 'bg-navy hover:bg-navy-light text-ivory border-navy-light'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{showTrendChart ? 'Ẩn Đồ Thị' : 'Đồ Thị Xu Hướng'}</span>
              </button>

              {/* Search Input */}
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm Kí hiệu, Tên, Z..."
                  className="w-full bg-obsidian border border-navy-light rounded-xl pl-9 pr-4 py-1.5 text-xs text-ivory placeholder:text-ivory-muted/60 focus:outline-none focus:border-cyan-ion transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-ivory p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Trend Chart (Collapsible) */}
          {showTrendChart && <PeriodicTrendChart />}

          {/* Category Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  sound.playUiClick();
                  setSelectedCategory(cat.key);
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-mono border transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-ivory text-obsidian font-bold border-ivory shadow-sm'
                    : `bg-navy/50 hover:bg-navy-light/40 ${cat.color}`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 18-COLUMN AUTHENTIC IUPAC VIEW */}
          {tableLayoutMode === '18_COLUMN' && (() => {
            const specimenElem = hoveredElement || inspectingElement || ALL_ELEMENTS[25]; // Default Fe (Z=26)
            return (
              <div className="overflow-x-auto pb-6">
                <div className="min-w-[1260px] bg-navy/40 p-4 rounded-2xl border border-navy-light/50 space-y-3">
                  {/* Table Subtitle & Quick Stats */}
                  <div className="flex items-center justify-between text-xs font-mono text-ivory-muted/70 px-1">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-ion font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> BẢNG TUẦN HOÀN NGUYÊN TỐ HÓA HỌC (CHUẨN QUỐC TẾ IUPAC)
                      </span>
                      <span className="text-ivory-muted/30">•</span>
                      <span>118 Nguyên tố</span>
                      <span className="text-ivory-muted/30">•</span>
                      <span>7 Chu kỳ</span>
                      <span className="text-ivory-muted/30">•</span>
                      <span>18 Cột nhóm (1 - 18)</span>
                    </div>
                    <div className="text-[11px] text-ivory-muted/60 italic">
                      * Rê chuột để xem nhanh thông tin ô • Nhấn vào ô để mở mô phỏng Bohr 3D
                    </div>
                  </div>

                  {/* Main IUPAC Unified Grid: 1 Col for Period, 18 Cols for Groups */}
                  <div
                    className="grid gap-1.5"
                    style={{
                      gridTemplateColumns: '36px repeat(18, minmax(62px, 1fr))',
                      gridAutoRows: 'minmax(66px, auto)',
                    }}
                  >
                    {/* Row 1, Col 1: Corner Header */}
                    <div
                      style={{ gridColumn: 1, gridRow: 1 }}
                      className="flex flex-col items-center justify-center font-mono text-[9px] font-bold text-ivory-muted/60 pb-1 border-b border-navy-light/40"
                      title="Chu kỳ (Hàng dọc) \ Nhóm IUPAC (Cột ngang)"
                    >
                      <span>CK</span>
                      <span className="text-[8px] text-ivory-muted/40">Nhóm</span>
                    </div>

                    {/* Row 1, Cols 2-19: Group Headers (1 to 18) */}
                    {IUPAC_GROUPS.map(g => (
                      <div
                        key={`group-${g.num}`}
                        style={{ gridColumn: g.num + 1, gridRow: 1 }}
                        className="text-center font-mono pb-1 border-b border-navy-light/40 select-none group/col cursor-default"
                        title={`${g.name} (Nhóm ${g.num} - Cổ điển: ${g.classic})`}
                      >
                        <div className="font-bold text-xs text-ivory group-hover/col:text-cyan-ion transition-colors">
                          {g.num}
                        </div>
                        <div className="text-[9px] text-cyan-ion/70 font-semibold leading-none">
                          {g.classic}
                        </div>
                      </div>
                    ))}

                    {/* Col 1, Rows 2-8: Period Indicators (1 to 7) */}
                    {Array.from({ length: 7 }, (_, i) => i + 1).map(p => (
                      <div
                        key={`period-${p}`}
                        style={{ gridColumn: 1, gridRow: p + 1 }}
                        className="flex flex-col items-center justify-center font-mono text-xs font-bold text-ivory-muted/80 bg-navy/60 border border-navy-light/40 rounded-lg select-none hover:text-cyan-ion hover:border-cyan-ion/50 transition-colors"
                        title={`Chu kỳ ${p} (${p <= 3 ? 'Chu kỳ nhỏ' : 'Chu kỳ lớn'})`}
                      >
                        <span className="text-[8px] text-ivory-muted/40 font-normal">CK</span>
                        <span>{p}</span>
                      </div>
                    ))}

                    {/* Center Specimen Box (Cols 4 to 14, Rows 2 to 5 -> Empty space of Periods 1-3) */}
                    <div
                      style={{ gridColumn: '4 / 14', gridRow: '2 / 5' }}
                      className="rounded-xl border border-cyan-ion/40 bg-gradient-to-br from-navy/95 via-obsidian/95 to-navy/90 p-3 flex gap-3.5 shadow-xl backdrop-blur-md relative overflow-hidden"
                    >
                      {/* Subtle background decoration */}
                      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-ion/5 rounded-full blur-2xl pointer-events-none" />

                      {/* Left: Specimen Element Card */}
                      <div
                        onClick={() => handleCardClick(specimenElem)}
                        className={`w-36 shrink-0 rounded-xl border p-2 flex flex-col justify-between cursor-pointer transition-transform hover:scale-105 shadow-lg select-none ${getCategoryColor(specimenElem.category)}`}
                        title="Nhấn để mở Hồ Sơ Khoa Học Toàn Diện"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono leading-none">
                          <span className="font-bold text-xs" title="Số hiệu nguyên tử Z">{specimenElem.z}</span>
                          <span className="text-[9px] opacity-80" title="Nguyên tử khối (u)">{specimenElem.atomic_weight.toFixed(2)}</span>
                        </div>
                        <div className="text-center my-0.5">
                          <div className="font-serif font-black text-3xl tracking-tight leading-none text-ivory">
                            {specimenElem.symbol}
                          </div>
                          <div className="text-[11px] font-bold text-ivory mt-0.5 truncate">
                            {specimenElem.name_vi}
                          </div>
                          <div className="text-[9px] opacity-75 truncate">
                            {specimenElem.name_iupac}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[8.5px] font-mono border-t border-current/20 pt-1 leading-none opacity-85">
                          <span>χ: {specimenElem.electronegativity ?? '—'}</span>
                          <span>{specimenElem.standard_state === 'SOLID' ? 'Rắn' : specimenElem.standard_state === 'LIQUID' ? 'Lỏng' : 'Khí'}</span>
                        </div>
                      </div>

                      {/* Right: Specimen Details & IUPAC Guide */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 text-xs">
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-navy-light/40 pb-1">
                            <div className="flex items-center gap-1.5 truncate">
                              <Sparkles className="w-3.5 h-3.5 text-cyan-ion shrink-0" />
                              <span className="font-serif font-bold text-ivory text-xs truncate">
                                {hoveredElement ? 'Xem Nhanh Nguyên Tố' : 'Ô Mẫu Chuẩn IUPAC & GDPT 2018'}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/15 text-cyan-ion border border-cyan-ion/30 font-bold shrink-0">
                              CK {specimenElem.period} • Nhóm {specimenElem.group}
                            </span>
                          </div>

                          {/* Configuration & Oxidation */}
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1.5 text-[10.5px] font-mono text-ivory-muted">
                            <div className="truncate">
                              Cấu hình: <strong className="text-cyan-ion">{specimenElem.electron_config}</strong>
                            </div>
                            <div className="truncate">
                              Số oxi hóa: <strong className="text-ivory">{specimenElem.oxidation_states.join(', ')}</strong>
                            </div>
                            <div className="truncate">
                              Năng lượng I₁: <strong className="text-copper">{specimenElem.first_ionization_energy} kJ/mol</strong>
                            </div>
                            <div className="truncate">
                              Độ âm điện: <strong className="text-yellow-400">{specimenElem.electronegativity ?? 'Không có (Khí hiếm)'}</strong>
                            </div>
                          </div>

                          {/* Educational Fact / Application */}
                          <p className="text-[10px] text-ivory/80 line-clamp-2 mt-1 leading-relaxed bg-obsidian/40 p-1.5 rounded border border-navy-light/30">
                            💡 <span className="font-semibold text-cyan-ion">{specimenElem.name_vi}:</span> {specimenElem.facts_vi[0] || specimenElem.apps_vi}
                          </p>
                        </div>

                        {/* Bottom Game Combat Stats & Action Hint */}
                        <div className="flex items-center justify-between pt-1 border-t border-navy-light/30 text-[9.5px] font-mono">
                          <div className="flex items-center gap-2 text-ivory-muted">
                            <span title="Tấn công Oxi hóa">ATK_ox: <strong className="text-coral-reaction">{specimenElem.stats.atk_ox}</strong></span>
                            <span title="Tấn công Khử">ATK_red: <strong className="text-cyan-ion">{specimenElem.stats.atk_red}</strong></span>
                            <span title="Độ bền ổn định">DEF: <strong className="text-lime-mineral">{specimenElem.stats.def_stab}</strong></span>
                            <span title="Mana sử dụng">Mana: <strong className="text-yellow-400">⚡{specimenElem.stats.mana_cost}</strong></span>
                          </div>
                          <button
                            onClick={() => handleCardClick(specimenElem)}
                            className="text-[9.5px] text-cyan-ion hover:text-white hover:underline flex items-center gap-1 font-sans font-semibold"
                          >
                            <span>Hồ Sơ Chi Tiết</span>
                            <Info className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Main Grid Elements (88 elements) */}
                    {Object.values(mainGridElements).map(elem => {
                      const isFiltered = filteredElements.some(e => e.z === elem.z);
                      const catClass = getCategoryColor(elem.category);
                      return (
                        <div
                          key={elem.z}
                          style={{
                            gridColumn: elem.group + 1,
                            gridRow: elem.period + 1,
                          }}
                          onClick={() => handleCardClick(elem)}
                          onMouseEnter={() => setHoveredElement(elem)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={`h-[66px] rounded-lg border p-1 cursor-pointer transition-all hover:scale-110 hover:z-30 hover:shadow-2xl flex flex-col justify-between select-none ${catClass} ${
                            !isFiltered ? 'opacity-25 grayscale hover:opacity-100 hover:grayscale-0' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                            <span className="font-bold opacity-80">{elem.z}</span>
                            <span className="text-[8px] opacity-70 truncate max-w-[32px]">
                              {getDisplayPropertyValue(elem)}
                            </span>
                          </div>
                          <div className="text-center font-serif font-black text-base tracking-tight leading-none text-ivory">
                            {elem.symbol}
                          </div>
                          <div className="text-[8.5px] truncate text-center opacity-90 leading-none font-medium">
                            {elem.name_vi}
                          </div>
                        </div>
                      );
                    })}

                    {/* Lanthanide Placeholder at Period 6, Group 3 (col 4, row 7) */}
                    <div
                      key="lanthanide-slot"
                      style={{ gridColumn: 4, gridRow: 7 }}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedCategory(selectedCategory === 'LANTHANIDE' ? 'ALL' : 'LANTHANIDE');
                      }}
                      className={`h-[66px] rounded-lg border border-pink-500/50 bg-pink-500/15 p-1 flex flex-col justify-center items-center text-center cursor-pointer transition-all hover:scale-105 hover:bg-pink-500/25 select-none ${
                        selectedCategory === 'LANTHANIDE' ? 'ring-2 ring-pink-400 bg-pink-500/30' : ''
                      }`}
                      title="Họ Lantan (57-71) — Nhấn để lọc"
                    >
                      <span className="text-[9px] font-mono text-pink-400 font-bold">* 57-71</span>
                      <span className="text-[12px] font-bold text-pink-300">La-Lu</span>
                      <span className="text-[8px] text-pink-400/90 font-medium">Lantan</span>
                    </div>

                    {/* Actinide Placeholder at Period 7, Group 3 (col 4, row 8) */}
                    <div
                      key="actinide-slot"
                      style={{ gridColumn: 4, gridRow: 8 }}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedCategory(selectedCategory === 'ACTINIDE' ? 'ALL' : 'ACTINIDE');
                      }}
                      className={`h-[66px] rounded-lg border border-rose-500/50 bg-rose-500/15 p-1 flex flex-col justify-center items-center text-center cursor-pointer transition-all hover:scale-105 hover:bg-rose-500/25 select-none ${
                        selectedCategory === 'ACTINIDE' ? 'ring-2 ring-rose-400 bg-rose-500/30' : ''
                      }`}
                      title="Họ Actini (89-103) — Nhấn để lọc"
                    >
                      <span className="text-[9px] font-mono text-rose-400 font-bold">** 89-103</span>
                      <span className="text-[12px] font-bold text-rose-300">Ac-Lr</span>
                      <span className="text-[8px] text-rose-400/90 font-medium">Actini</span>
                    </div>

                    {/* Divider Row (Row 9) */}
                    <div
                      style={{ gridColumn: '1 / 20', gridRow: 9 }}
                      className="pt-3 pb-1 flex items-center justify-between border-t border-navy-light/40 text-[11px] font-mono text-ivory-muted"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-pink-400 font-bold">* Họ Lantan (57–71)</span>
                        <span className="text-ivory-muted/40">•</span>
                        <span className="text-rose-400 font-bold">** Họ Actini (89–103)</span>
                        <span className="text-ivory-muted/60 text-[10px] hidden sm:inline">— Các nguyên tố phân lớp f được tách thành 2 hàng riêng bên dưới theo quy ước chuẩn IUPAC</span>
                      </div>
                      <div className="text-[10px] text-ivory-muted/60">
                        15 Cột (tương ứng từ Nhóm 3 đến Nhóm 17)
                      </div>
                    </div>

                    {/* Row 10: Lanthanides Header (Cols 2-3) */}
                    <div
                      style={{ gridColumn: '2 / 4', gridRow: 10 }}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedCategory(selectedCategory === 'LANTHANIDE' ? 'ALL' : 'LANTHANIDE');
                      }}
                      className="h-[64px] rounded-lg border border-pink-500/40 bg-pink-500/10 p-1 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-pink-500/20 transition-all select-none"
                      title="Nhấn để lọc họ Lantan"
                    >
                      <span className="text-[10px] font-mono text-pink-400 font-bold">* Họ Lantan</span>
                      <span className="text-[9px] text-pink-300">57 – 71</span>
                      <span className="text-[8px] text-pink-400/70">Lanthanoids</span>
                    </div>

                    {/* Row 10: 15 Lanthanide Elements (Cols 4-18) */}
                    {lanthanides.map((elem, idx) => {
                      const isFiltered = filteredElements.some(e => e.z === elem.z);
                      const catClass = getCategoryColor(elem.category);
                      return (
                        <div
                          key={elem.z}
                          style={{ gridColumn: 4 + idx, gridRow: 10 }}
                          onClick={() => handleCardClick(elem)}
                          onMouseEnter={() => setHoveredElement(elem)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={`h-[64px] rounded-lg border p-1 cursor-pointer transition-all hover:scale-110 hover:z-30 hover:shadow-2xl flex flex-col justify-between select-none ${catClass} ${
                            !isFiltered ? 'opacity-25 grayscale hover:opacity-100 hover:grayscale-0' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                            <span className="font-bold opacity-80">{elem.z}</span>
                            <span className="text-[8px] opacity-70 truncate max-w-[28px]">
                              {getDisplayPropertyValue(elem)}
                            </span>
                          </div>
                          <div className="text-center font-serif font-black text-sm tracking-tight leading-none text-ivory">
                            {elem.symbol}
                          </div>
                          <div className="text-[8px] truncate text-center opacity-85 leading-none">
                            {elem.name_vi}
                          </div>
                        </div>
                      );
                    })}

                    {/* Row 11: Actinides Header (Cols 2-3) */}
                    <div
                      style={{ gridColumn: '2 / 4', gridRow: 11 }}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedCategory(selectedCategory === 'ACTINIDE' ? 'ALL' : 'ACTINIDE');
                      }}
                      className="h-[64px] rounded-lg border border-rose-500/40 bg-rose-500/10 p-1 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-rose-500/20 transition-all select-none"
                      title="Nhấn để lọc họ Actini"
                    >
                      <span className="text-[10px] font-mono text-rose-400 font-bold">** Họ Actini</span>
                      <span className="text-[9px] text-rose-300">89 – 103</span>
                      <span className="text-[8px] text-rose-400/70">Actinoids</span>
                    </div>

                    {/* Row 11: 15 Actinide Elements (Cols 4-18) */}
                    {actinides.map((elem, idx) => {
                      const isFiltered = filteredElements.some(e => e.z === elem.z);
                      const catClass = getCategoryColor(elem.category);
                      return (
                        <div
                          key={elem.z}
                          style={{ gridColumn: 4 + idx, gridRow: 11 }}
                          onClick={() => handleCardClick(elem)}
                          onMouseEnter={() => setHoveredElement(elem)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={`h-[64px] rounded-lg border p-1 cursor-pointer transition-all hover:scale-110 hover:z-30 hover:shadow-2xl flex flex-col justify-between select-none ${catClass} ${
                            !isFiltered ? 'opacity-25 grayscale hover:opacity-100 hover:grayscale-0' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                            <span className="font-bold opacity-80">{elem.z}</span>
                            <span className="text-[8px] opacity-70 truncate max-w-[28px]">
                              {getDisplayPropertyValue(elem)}
                            </span>
                          </div>
                          <div className="text-center font-serif font-black text-sm tracking-tight leading-none text-ivory">
                            {elem.symbol}
                          </div>
                          <div className="text-[8px] truncate text-center opacity-85 leading-none">
                            {elem.name_vi}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* RESPONSIVE CARD GRID VIEW */}
          {tableLayoutMode === 'GRID' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5">
              {filteredElements.map(elem => {
                const catClass = getCategoryColor(elem.category);
                return (
                  <div
                    key={elem.z}
                    onClick={() => handleCardClick(elem)}
                    className={`relative rounded-xl border p-2.5 cursor-pointer transition-all hover:scale-105 hover:shadow-lg select-none group flex flex-col justify-between h-[105px] ${catClass}`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                      <span className="font-bold">{elem.z}</span>
                      <span>CK{elem.period}</span>
                    </div>

                    <div className="text-center my-0.5">
                      <span className="font-serif font-black text-2xl tracking-tight block group-hover:scale-110 transition-transform text-ivory">
                        {elem.symbol}
                      </span>
                      <span className="text-[10px] font-semibold truncate block max-w-full">
                        {elem.name_iupac}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono border-t border-current/20 pt-1">
                      <span className="truncate max-w-[55%]">{elem.name_vi}</span>
                      <span className="font-bold">M:{elem.stats.mana_cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CHEMICAL SUBSTANCES CATALOG (326 SUBSTANCES)                    */}
      {/* ========================================================================= */}
      {activeMainTab === 'SUBSTANCES' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Controls Bar: Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-navy/60 p-4 rounded-xl border border-navy-light/40">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
              {substanceCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    sound.playUiClick();
                    setSubstanceCategory(cat.key);
                  }}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    substanceCategory === cat.key
                      ? 'bg-copper text-white font-bold border-copper shadow'
                      : 'bg-obsidian/70 hover:bg-navy-light/40 text-ivory-muted border-navy-light'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[260px] w-full md:w-auto">
              <Search className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={substanceSearch}
                onChange={(e) => setSubstanceSearch(e.target.value)}
                placeholder="Tìm công thức (H2SO4), tên gọi..."
                className="w-full bg-obsidian border border-navy-light rounded-xl pl-9 pr-4 py-2 text-xs text-ivory placeholder:text-ivory-muted/60 focus:outline-none focus:border-copper transition-colors"
              />
              {substanceSearch && (
                <button
                  onClick={() => setSubstanceSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-ivory p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Substances Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredSubstances.map(sub => (
              <div
                key={sub.id}
                onClick={() => {
                  sound.playCardSelect();
                  setInspectingSubstance(sub);
                }}
                className="bg-navy/50 hover:bg-navy border border-navy-light/60 hover:border-copper/70 rounded-xl p-3.5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between space-y-2.5 select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-copper/20 text-copper border border-copper/40 font-bold">
                    {sub.category}
                  </span>
                  <span className="text-[10px] font-mono text-ivory-muted">
                    M = {sub.molar_mass.toFixed(2)}
                  </span>
                </div>

                <div>
                  <div className="font-serif font-black text-xl text-ivory tracking-wide">
                    {sub.formula_display}
                  </div>
                  <div className="text-xs font-semibold text-copper mt-0.5 truncate">
                    {sub.name_vi}
                  </div>
                  <div className="text-[11px] text-ivory-muted truncate">
                    {sub.name_iupac}
                  </div>
                </div>

                <div className="border-t border-navy-light/40 pt-2 flex items-center justify-between text-[10px] text-ivory-muted">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-cyan-ion" />
                    <span className="truncate max-w-[110px]">{sub.solubility_water_vi}</span>
                  </span>
                  <span className="font-mono text-cyan-ion font-bold">
                    {sub.standard_state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: SIDE-BY-SIDE ELEMENT COMPARISON                                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'COMPARISON' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Element Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-navy/60 p-4 rounded-xl border border-navy-light/40">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-cyan-ion flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Chọn Nguyên Tố Thứ Nhất (A):
              </label>
              <select
                value={compareElemA.z}
                onChange={(e) => {
                  const found = ALL_ELEMENTS.find(el => el.z === Number(e.target.value));
                  if (found) setCompareElemA(found);
                }}
                className="w-full bg-obsidian border border-navy-light rounded-xl px-3 py-2 text-xs text-ivory focus:outline-none focus:border-cyan-ion font-mono"
              >
                {ALL_ELEMENTS.map(el => (
                  <option key={el.z} value={el.z}>
                    Z={el.z} • {el.symbol} — {el.name_vi} ({el.name_iupac})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-copper flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Chọn Nguyên Tố Thứ Hai (B):
              </label>
              <select
                value={compareElemB.z}
                onChange={(e) => {
                  const found = ALL_ELEMENTS.find(el => el.z === Number(e.target.value));
                  if (found) setCompareElemB(found);
                }}
                className="w-full bg-obsidian border border-navy-light rounded-xl px-3 py-2 text-xs text-ivory focus:outline-none focus:border-copper font-mono"
              >
                {ALL_ELEMENTS.map(el => (
                  <option key={el.z} value={el.z}>
                    Z={el.z} • {el.symbol} — {el.name_vi} ({el.name_iupac})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards & Metric Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A */}
            <div className="bg-navy/70 border border-cyan-ion/40 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-navy-light/50 pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold">
                    Z = {compareElemA.z} • Nhóm {compareElemA.group} • Chu kỳ {compareElemA.period}
                  </span>
                  <h3 className="font-serif text-3xl font-black text-ivory mt-1">
                    {compareElemA.symbol}
                    <span className="text-lg font-sans font-semibold text-cyan-ion ml-2">
                      {compareElemA.name_vi}
                    </span>
                  </h3>
                </div>
                <div className="text-right font-mono text-xs text-ivory-muted">
                  <div>NTK: <strong className="text-ivory">{compareElemA.atomic_weight.toFixed(3)} u</strong></div>
                  <div>Trạng thái: <strong className="text-cyan-ion">{compareElemA.standard_state}</strong></div>
                </div>
              </div>

              {/* Combat Stats Bars */}
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-purple-400">ATK Oxi Hóa (χ = {compareElemA.electronegativity ?? 'N/A'}):</span>
                    <strong className="text-purple-400">{compareElemA.stats.atk_ox} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all" style={{ width: `${compareElemA.stats.atk_ox}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-coral-reaction">ATK Khử (I₁ = {compareElemA.first_ionization_energy} kJ/mol):</span>
                    <strong className="text-coral-reaction">{compareElemA.stats.atk_red} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-coral-reaction h-full transition-all" style={{ width: `${compareElemA.stats.atk_red}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-cyan-ion">DEF Độ Bền (Ổn định):</span>
                    <strong className="text-cyan-ion">{compareElemA.stats.def_stab} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-ion h-full transition-all" style={{ width: `${compareElemA.stats.def_stab}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian/60 border border-navy-light/40 space-y-1.5 text-xs font-mono">
                <div>Cấu hình e: <span className="text-cyan-ion">{compareElemA.electron_config}</span></div>
                <div>Số oxi hóa: <span className="text-ivory">{compareElemA.oxidation_states.join(', ')}</span></div>
                <div>Chi phí Mana: <span className="text-yellow-400 font-bold">{compareElemA.stats.mana_cost}</span></div>
              </div>
            </div>

            {/* Card B */}
            <div className="bg-navy/70 border border-copper/40 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-navy-light/50 pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-copper/20 text-copper border border-copper/40 font-bold">
                    Z = {compareElemB.z} • Nhóm {compareElemB.group} • Chu kỳ {compareElemB.period}
                  </span>
                  <h3 className="font-serif text-3xl font-black text-ivory mt-1">
                    {compareElemB.symbol}
                    <span className="text-lg font-sans font-semibold text-copper ml-2">
                      {compareElemB.name_vi}
                    </span>
                  </h3>
                </div>
                <div className="text-right font-mono text-xs text-ivory-muted">
                  <div>NTK: <strong className="text-ivory">{compareElemB.atomic_weight.toFixed(3)} u</strong></div>
                  <div>Trạng thái: <strong className="text-copper">{compareElemB.standard_state}</strong></div>
                </div>
              </div>

              {/* Combat Stats Bars */}
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-purple-400">ATK Oxi Hóa (χ = {compareElemB.electronegativity ?? 'N/A'}):</span>
                    <strong className="text-purple-400">{compareElemB.stats.atk_ox} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all" style={{ width: `${compareElemB.stats.atk_ox}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-coral-reaction">ATK Khử (I₁ = {compareElemB.first_ionization_energy} kJ/mol):</span>
                    <strong className="text-coral-reaction">{compareElemB.stats.atk_red} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-coral-reaction h-full transition-all" style={{ width: `${compareElemB.stats.atk_red}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-cyan-ion">DEF Độ Bền (Ổn định):</span>
                    <strong className="text-cyan-ion">{compareElemB.stats.def_stab} / 100</strong>
                  </div>
                  <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-ion h-full transition-all" style={{ width: `${compareElemB.stats.def_stab}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian/60 border border-navy-light/40 space-y-1.5 text-xs font-mono">
                <div>Cấu hình e: <span className="text-copper">{compareElemB.electron_config}</span></div>
                <div>Số oxi hóa: <span className="text-ivory">{compareElemB.oxidation_states.join(', ')}</span></div>
                <div>Chi phí Mana: <span className="text-yellow-400 font-bold">{compareElemB.stats.mana_cost}</span></div>
              </div>
            </div>
          </div>

          {/* Chemical Interaction Analysis */}
          <div className="bg-navy/50 border border-navy-light/50 rounded-2xl p-5 space-y-3">
            <h4 className="font-serif text-base font-bold text-ivory flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-ion" />
              <span>Phân Tích Liên Kết & Khả Năng Tương Tác Hóa Học:</span>
            </h4>
            {(() => {
              const chiA = compareElemA.electronegativity;
              const chiB = compareElemB.electronegativity;
              if (chiA !== null && chiB !== null) {
                const deltaChi = Math.abs(chiA - chiB);
                let bondType = 'Liên kết cộng hóa trị không cực';
                if (deltaChi >= 1.7) bondType = 'Liên kết ion mạnh';
                else if (deltaChi >= 0.4) bondType = 'Liên kết cộng hóa trị có cực';

                return (
                  <p className="text-xs text-ivory-muted leading-relaxed">
                    Hiệu độ âm điện giữa <strong className="text-cyan-ion">{compareElemA.symbol}</strong> (χ={chiA}) và{' '}
                    <strong className="text-copper">{compareElemB.symbol}</strong> (χ={chiB}) là{' '}
                    <strong className="text-ivory">Δχ = {deltaChi.toFixed(2)}</strong>. Dự đoán bản chất liên kết theo quy tắc GDPT 2018:{' '}
                    <span className="font-bold text-cyan-ion">{bondType}</span>.
                  </p>
                );
              }
              return (
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Một trong hai nguyên tố thuộc nhóm khí hiếm hoặc chưa xác định giá trị độ âm điện chuẩn Pauling; tương tác chủ yếu là lực van der Waals yếu.
                </p>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: CHEMICAL EQUILIBRIUM & LE CHATELIER VISUALIZER                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'EQUILIBRIUM' && (
        <div className="space-y-6 animate-fadeIn">
          <ChemicalEquilibriumVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: GALVANIC ELECTROCHEMICAL CELL & NERNST EQUATION                */}
      {/* ========================================================================= */}
      {activeMainTab === 'GALVANIC_CELL' && (
        <div className="space-y-6 animate-fadeIn">
          <GalvanicCellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: ACID-BASE TITRATION CURVE & INDICATOR VISUALIZER               */}
      {/* ========================================================================= */}
      {activeMainTab === 'TITRATION' && (
        <div className="space-y-6 animate-fadeIn">
          <TitrationCurveVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6B: BUFFER SOLUTION & HENDERSON-HASSELBALCH EQUATION              */}
      {/* ========================================================================= */}
      {activeMainTab === 'BUFFER_CAPACITY' && (
        <div className="space-y-6 animate-fadeIn">
          <BufferCapacityVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6C: ESTERIFICATION, LIPID SAPONIFICATION & SALTING-OUT            */}
      {/* ========================================================================= */}
      {activeMainTab === 'ESTER_LIPID_SAPONIFICATION' && (
        <div className="space-y-6 animate-fadeIn">
          <EsterLipidVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6D: CARBOHYDRATE BIOCHEMISTRY, MUTAROTATION & DIAGNOSTIC TESTS     */}
      {/* ========================================================================= */}
      {activeMainTab === 'CARBOHYDRATE_BIOCHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <CarbohydrateVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6E: AMINES, AMINO ACIDS, PEPTIDES & PROTEIN BIOCHEMISTRY          */}
      {/* ========================================================================= */}
      {activeMainTab === 'AMINES_AMINO_ACIDS_PEPTIDES' && (
        <div className="space-y-6 animate-fadeIn">
          <AmineAminoAcidVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6F: METALLURGY, ELECTROCHEMICAL SERIES & CORROSION PROTECTION     */}
      {/* ========================================================================= */}
      {activeMainTab === 'METALLURGY_CORROSION' && (
        <div className="space-y-6 animate-fadeIn">
          <MetallurgyCorrosionVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6G: ALKALI METALS (IA), ALKALINE EARTH (IIA) & HARD WATER         */}
      {/* ========================================================================= */}
      {activeMainTab === 'ALKALI_HARD_WATER' && (
        <div className="space-y-6 animate-fadeIn">
          <AlkaliHardWaterVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6H: TRANSITION METALS 3D SERIES & COORDINATION COMPLEXES (HÓA 12)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'TRANSITION_METALS_COMPLEXES' && (
        <div className="space-y-6 animate-fadeIn">
          <TransitionMetalsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6I: ALCOHOLS, PHENOLS & REACTION SPECIFICITY (HÓA 11)              */}
      {/* ========================================================================= */}
      {activeMainTab === 'ALCOHOL_PHENOL_REACTIONS' && (
        <div className="space-y-6 animate-fadeIn">
          <AlcoholPhenolVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6J: CARBONYL COMPOUNDS & CARBOXYLIC ACIDS (HÓA 11)                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'CARBONYL_CARBOXYLIC_ACID' && (
        <div className="space-y-6 animate-fadeIn">
          <CarbonylCarboxylicVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6K: NITROGEN, SULFUR, FOUNTAIN & ACID RAIN (HÓA 11)                */}
      {/* ========================================================================= */}
      {activeMainTab === 'NITROGEN_SULFUR_COMPOUNDS' && (
        <div className="space-y-6 animate-fadeIn">
          <NitrogenSulfurVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HYDROCARBONS (ALKANES, ALKENES, ALKYNES & ARENES)               */}
      {/* ========================================================================= */}
      {activeMainTab === 'HYDROCARBONS_REACTIONS' && (
        <div className="space-y-6 animate-fadeIn">
          <HydrocarbonVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HALOGEN DERIVATIVES & REACTION MECHANISMS (SN1/SN2/E1/E2)        */}
      {/* ========================================================================= */}
      {activeMainTab === 'HALOGEN_DERIVATIVES' && (
        <div className="space-y-6 animate-fadeIn">
          <HalogenDerivativesVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CHEMICAL ENERGETICS, FORMATION ENTHALPY & HESS'S LAW             */}
      {/* ========================================================================= */}
      {activeMainTab === 'CHEMICAL_ENERGETICS' && (
        <div className="space-y-6 animate-fadeIn">
          <ChemicalEnergeticsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CHEMICAL REACTION KINETICS & RATES (VAN 'T HOFF / ARRHENIUS)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'CHEMICAL_KINETICS' && (
        <div className="space-y-6 animate-fadeIn">
          <ChemicalKineticsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: GROUP VIIA HALOGENS & REDOX DISPLACEMENT (JAVEL / BLEACHING)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'HALOGENS_REDOX' && (
        <div className="space-y-6 animate-fadeIn">
          <HalogensRedoxVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: REDOX REACTIONS, OXIDATION STATES & ELECTRON BALANCE            */}
      {/* ========================================================================= */}
      {activeMainTab === 'REDOX_REACTIONS' && (
        <div className="space-y-6 animate-fadeIn">
          <RedoxReactionsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PERIODIC TRENDS, PERIOD 3 ACID-BASE & OCTET EXCEPTIONS           */}
      {/* ========================================================================= */}
      {activeMainTab === 'PERIODIC_TRENDS_OCTET' && (
        <div className="space-y-6 animate-fadeIn">
          <PeriodicTrendsOctetVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: GDPT 2018 CURRICULUM MASTERY MATRIX & DIAGNOSTICS                */}
      {/* ========================================================================= */}
      {activeMainTab === 'CURRICULUM_MASTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <CurriculumMasteryVisualizer onNavigateToTab={(tab: any) => setActiveMainTab(tab)} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: 16-PLAYER CHEMISTRY TOURNAMENT CHAMPIONSHIP & ELO                */}
      {/* ========================================================================= */}
      {activeMainTab === 'TOURNAMENT_CHAMPIONSHIP' && (
        <div className="space-y-6 animate-fadeIn">
          <TournamentChampionshipVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SALT HYDROLYSIS & ALUM WATER CLARIFICATION                       */}
      {/* ========================================================================= */}
      {activeMainTab === 'SALT_HYDROLYSIS' && (
        <div className="space-y-6 animate-fadeIn">
          <SaltHydrolysisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: FORENSIC CHEMISTRY & TOXICOLOGY (LUMINOL, BREATHALYZER, MARSH)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'FORENSIC_CHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <ForensicChemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PHARMACOKINETICS, DRUG IONIZATION & THERAPEUTIC WINDOW (ADME)    */}
      {/* ========================================================================= */}
      {activeMainTab === 'PHARMACOKINETICS_ADME' && (
        <div className="space-y-6 animate-fadeIn">
          <PharmacokineticsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: FOOD CHEMISTRY, MAILLARD BROWNING & BORAX TESTING                */}
      {/* ========================================================================= */}
      {activeMainTab === 'FOOD_CHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <FoodChemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CHIRAL STEREOCHEMISTRY, CIP RULES (R/S) & POLARIMETRY (BIOT)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'CHIRAL_STEREOCHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <ChiralStereochemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: BIOPOLYMERS & BIODEGRADATION KINETICS (ISO 14855 / GDPT 2018)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'BIOPOLYMERS_BIODEGRADATION' && (
        <div className="space-y-6 animate-fadeIn">
          <BiopolymerBiodegradationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: INDUSTRIAL MEMBRANE CHLOR-ALKALI & COPPER REFINING               */}
      {/* ========================================================================= */}
      {activeMainTab === 'INDUSTRIAL_ELECTROCHEMICAL_REFINING' && (
        <div className="space-y-6 animate-fadeIn">
          <IndustrialElectrochemicalVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SOIL CHEMISTRY, FERTILIZERS & NITRATE LEACHING                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'SOIL_FERTILIZER_CHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <SoilFertilizerVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SYNTHETIC DYES, AZO COUPLING & FENTON DECOLORIZATION             */}
      {/* ========================================================================= */}
      {activeMainTab === 'DYES_AZO_CHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <DyeChemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PETROLEUM REFINING, FCC CRACKING & OCTANE BLENDING (E5/E10)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'PETROLEUM_REFINING_OCTANE' && (
        <div className="space-y-6 animate-fadeIn">
          <PetroleumRefiningVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: ATMOSPHERIC PHOTOCHEMISTRY, OZONE, SMOG & ACID RAIN / FGD        */}
      {/* ========================================================================= */}
      {activeMainTab === 'ATMOSPHERIC_PHOTOCHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <AtmosphericPhotochemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: NUCLEAR SHELL MODEL, SPIN J^P & RADIOMETRIC DATING (C-14, U-Pb)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'RADIOMETRIC_DATING_NUCLEAR' && (
        <div className="space-y-6 animate-fadeIn">
          <RadiometricDatingShellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: QUANTUM DOTS, BRUS CONFINEMENT & QLED TV DISPLAYS (NOBEL 2023)   */}
      {/* ========================================================================= */}
      {activeMainTab === 'QUANTUM_DOTS_NANOTECH' && (
        <div className="space-y-6 animate-fadeIn">
          <QuantumDotsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: METAL-ORGANIC FRAMEWORKS, CARBON CAPTURE & WATER HARVESTING      */}
      {/* ========================================================================= */}
      {activeMainTab === 'MOF_CARBON_CAPTURE' && (
        <div className="space-y-6 animate-fadeIn">
          <MetalOrganicFrameworksVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PHOTOCATALYTIC WATER SPLITTING, Z-SCHEME & TANDEM SOLAR CELLS    */}
      {/* ========================================================================= */}
      {activeMainTab === 'PHOTOCATALYTIC_SOLAR_ENERGY' && (
        <div className="space-y-6 animate-fadeIn">
          <PhotocatalyticEnergyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SUPERCAPACITORS, PSEUDOCAPACITANCE & GRAPHENE AEROGELS           */}
      {/* ========================================================================= */}
      {activeMainTab === 'SUPERCAPACITOR_AEROGEL' && (
        <div className="space-y-6 animate-fadeIn">
          <SupercapacitorAerogelVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SOLID-STATE BATTERIES, DENDRITE PREVENT & FAST ION CONDUCTION    */}
      {/* ========================================================================= */}
      {activeMainTab === 'SOLID_STATE_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <SolidStateBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PIEZOELECTRIC & TRIBOELECTRIC NANOGENERATORS (PENG & TENG)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'NANOGENERATOR_PENG_TENG' && (
        <div className="space-y-6 animate-fadeIn">
          <NanogeneratorEnergyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THERMOELECTRIC SEEBECK & PELTIER MODULES (ZT > 2.5)              */}
      {/* ========================================================================= */}
      {activeMainTab === 'THERMOELECTRIC_ENERGY' && (
        <div className="space-y-6 animate-fadeIn">
          <ThermoelectricVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: BIOELECTROCHEMICAL MICROBIAL FUEL CELLS (MFCs) & QCVN 40         */}
      {/* ========================================================================= */}
      {activeMainTab === 'MICROBIAL_FUEL_CELL' && (
        <div className="space-y-6 animate-fadeIn">
          <MicrobialFuelCellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HYDROGEN FUEL CELLS (PEMFC & SOFC) & FCEV VEHICLE STACKS         */}
      {/* ========================================================================= */}
      {activeMainTab === 'HYDROGEN_FUEL_CELL' && (
        <div className="space-y-6 animate-fadeIn">
          <HydrogenFuelCellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: REDOX FLOW BATTERIES (VRFB & AORFB) & GRID-SCALE LDES            */}
      {/* ========================================================================= */}
      {activeMainTab === 'REDOX_FLOW_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <RedoxFlowBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SODIUM-ION (Na-ion) BATTERIES, PBA & HARD CARBON ANODES           */}
      {/* ========================================================================= */}
      {activeMainTab === 'SODIUM_ION_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <SodiumIonBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: LITHIUM-SULFUR (Li-S) BATTERIES, SHUTTLE EFFECT & 2D MXENE       */}
      {/* ========================================================================= */}
      {activeMainTab === 'LITHIUM_SULFUR_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <LithiumSulfurBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: METAL-AIR BATTERIES (ZINC-AIR & LI-AIR) & BREATHING GDE          */}
      {/* ========================================================================= */}
      {activeMainTab === 'METAL_AIR_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <MetalAirBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: BETAVOLTAIC NUCLEAR BATTERIES & DIAMOND C-14                     */}
      {/* ========================================================================= */}
      {activeMainTab === 'BETAVOLTAIC_NUCLEAR_BATTERY' && (
        <div className="space-y-6 animate-fadeIn">
          <BetavoltaicBatteryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PEROVSKITE SOLAR CELLS & TANDEM SILICON 33.9% PCE                */}
      {/* ========================================================================= */}
      {activeMainTab === 'PEROVSKITE_SOLAR_CELL' && (
        <div className="space-y-6 animate-fadeIn">
          <PerovskiteSolarVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SOLID OXIDE ELECTROLYZER CELLS (SOEC) & GREEN SYNGAS             */}
      {/* ========================================================================= */}
      {activeMainTab === 'SOLID_OXIDE_ELECTROLYZER' && (
        <div className="space-y-6 animate-fadeIn">
          <SolidOxideElectrolyzerVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: ANION EXCHANGE MEMBRANE ELECTROLYZER (AEMWE)                     */}
      {/* ========================================================================= */}
      {activeMainTab === 'ANION_EXCHANGE_ELECTROLYZER' && (
        <div className="space-y-6 animate-fadeIn">
          <AnionExchangeElectrolyzerVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DIRECT AIR CAPTURE (DAC) & SEPARATION THERMODYNAMICS              */}
      {/* ========================================================================= */}
      {activeMainTab === 'DIRECT_AIR_CAPTURE' && (
        <div className="space-y-6 animate-fadeIn">
          <DirectAirCaptureVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: IODINE-SULFUR (IS / S-I) THERMOCHEMICAL WATER-SPLITTING CYCLE     */}
      {/* ========================================================================= */}
      {activeMainTab === 'IODINE_SULFUR_CYCLE' && (
        <div className="space-y-6 animate-fadeIn">
          <IodineSulfurCycleVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DIRECT LITHIUM EXTRACTION (DLE) & GEOTHERMAL ION SIEVES           */}
      {/* ========================================================================= */}
      {activeMainTab === 'DIRECT_LITHIUM_EXTRACTION' && (
        <div className="space-y-6 animate-fadeIn">
          <DirectLithiumExtractionVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SUPERCRITICAL WATER OXIDATION (SCWO) & PFAS DESTRUCTION           */}
      {/* ========================================================================= */}
      {activeMainTab === 'SUPERCRITICAL_WATER_OXIDATION' && (
        <div className="space-y-6 animate-fadeIn">
          <SupercriticalWaterOxidationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SALINITY GRADIENT ENERGY & OSMOTIC POWER (PRO & RED)              */}
      {/* ========================================================================= */}
      {activeMainTab === 'SALINITY_GRADIENT_OSMOTIC' && (
        <div className="space-y-6 animate-fadeIn">
          <SalinityGradientOsmoticVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OCEAN THERMAL ENERGY CONVERSION (OTEC) & DEEP-SEA AMMONIA ENGINE  */}
      {/* ========================================================================= */}
      {activeMainTab === 'OCEAN_THERMAL_ENERGY' && (
        <div className="space-y-6 animate-fadeIn">
          <OceanThermalEnergyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: MOLTEN SALT NUCLEAR REACTOR (MSR) & THORIUM FUEL CYCLE            */}
      {/* ========================================================================= */}
      {activeMainTab === 'MOLTEN_SALT_REACTOR' && (
        <div className="space-y-6 animate-fadeIn">
          <MoltenSaltReactorVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: TOKAMAK MAGNETIC CONFINEMENT FUSION & PLASMA CHEMISTRY            */}
      {/* ========================================================================= */}
      {activeMainTab === 'TOKAMAK_FUSION' && (
        <div className="space-y-6 animate-fadeIn">
          <TokamakFusionVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: METAL-HYDRIDE SOLID-STATE HYDROGEN STORAGE & THERMOCHEMICAL SYSTEM */}
      {/* ========================================================================= */}
      {activeMainTab === 'METAL_HYDRIDE_STORAGE' && (
        <div className="space-y-6 animate-fadeIn">
          <MetalHydrideStorageVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PHOTOCATALYTIC ARTIFICIAL PHOTOSYNTHESIS & Z-SCHEME WATER SPLITTING */}
      {/* ========================================================================= */}
      {activeMainTab === 'PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS' && (
        <div className="space-y-6 animate-fadeIn">
          <PhotocatalyticArtificialPhotosynthesisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: GEOTHERMAL BRINE & DIRECT MINERAL EXTRACTION (DLE)                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'GEOTHERMAL_MINERAL_EXTRACTION' && (
        <div className="space-y-6 animate-fadeIn">
          <GeothermalMineralExtractionVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: COPPER-CHLORINE (Cu-Cl) THERMOCHEMICAL WATER-SPLITTING CYCLE       */}
      {/* ========================================================================= */}
      {activeMainTab === 'CU_CL_THERMOCHEMICAL_CYCLE' && (
        <div className="space-y-6 animate-fadeIn">
          <CuClThermochemicalVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SUPERCONDUCTING MAGNETIC ENERGY STORAGE (SMES) & LH2 HYBRID        */}
      {/* ========================================================================= */}
      {activeMainTab === 'SMES_CRYOGENIC_STORAGE' && (
        <div className="space-y-6 animate-fadeIn">
          <SmesCryogenicVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: MICROCHANNEL FISCHER-TROPSCH & SUSTAINABLE AVIATION FUEL (SAF)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'MICROCHANNEL_FISCHER_TROPSCH' && (
        <div className="space-y-6 animate-fadeIn">
          <MicrochannelFischerTropschVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: MEMBRANE METHANE NON-OXIDATIVE DEHYDROAROMATIZATION (MDA)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'MEMBRANE_METHANE_AROMATIZATION' && (
        <div className="space-y-6 animate-fadeIn">
          <MembraneMethaneAromatizationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: MICROBIAL ELECTROSYNTHESIS (MES) & BIOCATHODE CO2 VALORIZATION   */}
      {/* ========================================================================= */}
      {activeMainTab === 'MICROBIAL_ELECTROSYNTHESIS_MES' && (
        <div className="space-y-6 animate-fadeIn">
          <MicrobialElectrosynthesisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: METAL HYDRIDE THERMOCHEMICAL THERMAL STORAGE (TCS) & HEAT PUMP   */}
      {/* ========================================================================= */}
      {activeMainTab === 'METAL_HYDRIDE_THERMAL_STORAGE' && (
        <div className="space-y-6 animate-fadeIn">
          <MetalHydrideThermalStorageVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PHOTOELECTROCHEMICAL (PEC) SOLAR TANDEM & WATER SPLITTING HUB   */}
      {/* ========================================================================= */}
      {activeMainTab === 'PHOTOELECTROCHEMICAL_TANDEM' && (
        <div className="space-y-6 animate-fadeIn">
          <PhotoelectrochemicalTandemVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: LITHIUM-MEDIATED ELECTROCHEMICAL AMMONIA SYNTHESIS (LI-NRR) HUB  */}
      {/* ========================================================================= */}
      {activeMainTab === 'LITHIUM_MEDIATED_AMMONIA' && (
        <div className="space-y-6 animate-fadeIn">
          <LithiumMediatedAmmoniaVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THERMOPHOTOVOLTAIC (TPV) GRID THERMAL BATTERY & EMITTER HUB      */}
      {/* ========================================================================= */}
      {activeMainTab === 'THERMOPHOTOVOLTAIC_GRID_STORAGE' && (
        <div className="space-y-6 animate-fadeIn">
          <ThermophotovoltaicGridStorageVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEEP-SEA NODULE BIOLEACHING & BATTERY PRECURSORS REFINERY HUB    */}
      {/* ========================================================================= */}
      {activeMainTab === 'DEEP_SEA_BIOLEACHING' && (
        <div className="space-y-6 animate-fadeIn">
          <DeepSeaBioleachingVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 7: INDUSTRIAL GAS SYNTHESIS REACTOR (HABER-BOSCH & CONTACT)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'INDUSTRIAL_REACTOR' && (
        <div className="space-y-6 animate-fadeIn">
          <IndustrialSynthesisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 8: COORDINATION COMPLEX & CRYSTAL FIELD SPLITTING (HÓA HỌC 12)    */}
      {/* ========================================================================= */}
      {activeMainTab === 'COORDINATION_COMPLEX' && (
        <div className="space-y-6 animate-fadeIn">
          <CoordinationComplexVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 9: 3D VSEPR & GILLESPIE-NYHOLM LONE PAIR REPULSION (HÓA HỌC 10)   */}
      {/* ========================================================================= */}
      {activeMainTab === 'VSEPR_BONDING' && (
        <div className="space-y-6 animate-fadeIn">
          <VseprVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 10: SOLUBILITY PRODUCT (K_sp), PRECIPITATION & AMPHOTERIC (HÓA 11) */}
      {/* ========================================================================= */}
      {activeMainTab === 'SOLUBILITY_PRECIPITATION' && (
        <div className="space-y-6 animate-fadeIn">
          <SolubilityPrecipitationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 11: ELECTROLYSIS & FARADAY'S LAWS SIMULATION (HÓA HỌC 12)          */}
      {/* ========================================================================= */}
      {activeMainTab === 'ELECTROLYSIS_FARADAY' && (
        <div className="space-y-6 animate-fadeIn">
          <ElectrolysisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 12: ORGANIC MECHANISMS & STEREOISOMERISM (HÓA HỌC 11-12)           */}
      {/* ========================================================================= */}
      {activeMainTab === 'ORGANIC_MECHANISMS' && (
        <div className="space-y-6 animate-fadeIn">
          <OrganicMechanismsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 13: POLYMERS, MACROMOLECULES & CONDENSATION (HÓA HỌC 12)          */}
      {/* ========================================================================= */}
      {activeMainTab === 'POLYMERS_MACROMOLECULES' && (
        <div className="space-y-6 animate-fadeIn">
          <PolymerVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 14: NUCLEAR CHEMISTRY & RADIOACTIVITY (HÓA 10 & VẬT LÝ 12)        */}
      {/* ========================================================================= */}
      {activeMainTab === 'NUCLEAR_RADIOACTIVITY' && (
        <div className="space-y-6 animate-fadeIn">
          <NuclearDecayVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 15: GREEN CHEMISTRY & SUSTAINABILITY (HÓA 11 & HÓA 12)            */}
      {/* ========================================================================= */}
      {activeMainTab === 'GREEN_CHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <GreenChemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 16: CRYSTALLOGRAPHY, UNIT CELLS & SOLID STATE (HÓA 10)            */}
      {/* ========================================================================= */}
      {activeMainTab === 'CRYSTALLOGRAPHY' && (
        <div className="space-y-6 animate-fadeIn">
          <CrystallographyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 17: COLLOIDS, INTERFACES & SURFACE CHEMISTRY (HÓA 10 & 11)        */}
      {/* ========================================================================= */}
      {activeMainTab === 'COLLOIDS_SURFACE' && (
        <div className="space-y-6 animate-fadeIn">
          <ColloidSurfaceVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 18: SPECTROPHOTOMETRY & BEER-LAMBERT LAW (HÓA 10, 11 & 12)        */}
      {/* ========================================================================= */}
      {activeMainTab === 'SPECTROPHOTOMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <SpectrophotometryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 19: MASS SPECTROMETRY (MS) & ISOTOPE PATTERNS (HÓA 10 & 11)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'MASS_SPECTROMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <MassSpectrometryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 20: INFRARED SPECTROSCOPY (IR) & MOLECULAR VIBRATION (HÓA 11)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'INFRARED_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <InfraredSpectroscopyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 21: NUCLEAR MAGNETIC RESONANCE (¹H & ¹³C NMR) (HÓA 11 - 12)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'NMR_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <NmrSpectroscopyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 22: MULTI-SPECTROSCOPIC ELUCIDATION & ISOMER DISCRIMINATION       */}
      {/* ========================================================================= */}
      {activeMainTab === 'STRUCTURAL_ELUCIDATION' && (
        <div className="space-y-6 animate-fadeIn">
          <StructuralElucidationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 23: PHASE EQUILIBRIA, VLE & DISTILLATION THERMODYNAMICS (HÓA 10-11)*/}
      {/* ========================================================================= */}
      {activeMainTab === 'PHASE_EQUILIBRIA' && (
        <div className="space-y-6 animate-fadeIn">
          <PhaseEquilibriaVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 24: LIQUID-LIQUID EXTRACTION & SEPARATORY FUNNEL (HÓA 11)         */}
      {/* ========================================================================= */}
      {activeMainTab === 'EXTRACTION_PARTITION' && (
        <div className="space-y-6 animate-fadeIn">
          <ExtractionPartitionVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 25: THIN-LAYER & COLUMN CHROMATOGRAPHY (HÓA 11)                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'CHROMATOGRAPHY' && (
        <div className="space-y-6 animate-fadeIn">
          <ChromatographyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 26: RECRYSTALLIZATION & MELTING POINT PURITY (HÓA 11)             */}
      {/* ========================================================================= */}
      {activeMainTab === 'RECRYSTALLIZATION' && (
        <div className="space-y-6 animate-fadeIn">
          <RecrystallizationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 27: QUALITATIVE ORGANIC FUNCTIONAL GROUP IDENTIFICATION (HÓA 11)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'FUNCTIONAL_GROUP_REACTIONS' && (
        <div className="space-y-6 animate-fadeIn">
          <FunctionalGroupReactionsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 28: GAS LAWS & KINETIC MOLECULAR THEORY (HÓA 10-12)              */}
      {/* ========================================================================= */}
      {activeMainTab === 'GAS_LAWS_KINETIC' && (
        <div className="space-y-6 animate-fadeIn">
          <GasLawsKineticVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 29: OSMOSIS & COLLIGATIVE PROPERTIES (HÓA 10-12)                  */}
      {/* ========================================================================= */}
      {activeMainTab === 'OSMOSIS_COLLIGATIVE' && (
        <div className="space-y-6 animate-fadeIn">
          <OsmosisColligativeVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 30: NUCLEAR SHELL MODEL & BINDING ENERGY (NOBEL 1963)             */}
      {/* ========================================================================= */}
      {activeMainTab === 'NUCLEAR_SHELL' && (
        <div className="space-y-6 animate-fadeIn">
          <NuclearShellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 31: CRYSTAL FIELD THEORY & OPTICAL ABSORPTION (HÓA 12)            */}
      {/* ========================================================================= */}
      {activeMainTab === 'CRYSTAL_FIELD_THEORY' && (
        <div className="space-y-6 animate-fadeIn">
          <CrystalFieldTheoryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 32: ENZYME KINETICS & MICHAELIS-MENTEN CATALYSIS (SINH 10 & HÓA 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'ENZYME_KINETICS' && (
        <div className="space-y-6 animate-fadeIn">
          <EnzymeKineticsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 33: QUANTUM HALL EFFECT, TOPOLOGICAL MATTER & BERRY PHASE (VẬT LÍ 12 & HÓA 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'QUANTUM_HALL' && (
        <div className="space-y-6 animate-fadeIn">
          <QuantumHallVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 34: ATMOSPHERIC PHOTOCHEMISTRY & OZONE CHAPMAN CYCLE (HÓA 10 & 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'OZONE_PHOTOCHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <OzonePhotochemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 35: SUPERCONDUCTIVITY, MEISSNER LEVITATION & BCS PAIRS (VẬT LÍ 12 & HÓA 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'SUPERCONDUCTIVITY' && (
        <div className="space-y-6 animate-fadeIn">
          <SuperconductivityVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 36: FUEL CELLS, BUTLER-VOLMER KINETICS & CLEAN HYDROGEN (HÓA 10 & 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'FUEL_CELLS' && (
        <div className="space-y-6 animate-fadeIn">
          <FuelCellVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 37: LITHIUM-ION BATTERY INTERCALATION & SEI AGING (NOBEL 2019 & HÓA 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'BATTERY_INTERCALATION' && (
        <div className="space-y-6 animate-fadeIn">
          <BatteryIntercalationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 38: PCR THERMAL CYCLING & AGAROSE GEL ELECTROPHORESIS (NOBEL 1993 & SINH 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'PCR_ELECTROPHORESIS' && (
        <div className="space-y-6 animate-fadeIn">
          <PcrElectrophoresisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 39: CRISPR-CAS9 GENE EDITING & DSB REPAIR (NOBEL 2020 & SINH 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'CRISPR_CAS9' && (
        <div className="space-y-6 animate-fadeIn">
          <CrisprCas9Visualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 40: THERMOGRAVIMETRIC ANALYSIS (TGA/DTG) & DSC (ICTAC & HÓA 10, 11, 12) */}
      {/* ========================================================================= */}
      {activeMainTab === 'THERMAL_ANALYSIS' && (
        <div className="space-y-6 animate-fadeIn">
          <ThermalAnalysisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 41: SCANNING & TRANSMISSION ELECTRON MICROSCOPY (SEM/TEM & DE BROGLIE) */}
      {/* ========================================================================= */}
      {activeMainTab === 'ELECTRON_MICROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <ElectronMicroscopyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 42: X-RAY PHOTOELECTRON SPECTROSCOPY (XPS / ESCA) & AUGER (AES)   */}
      {/* ========================================================================= */}
      {activeMainTab === 'XPS_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <XpsSpectroscopyVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 43: ATOMIC FORCE MICROSCOPY (AFM) & LENNARD-JONES FORCE SPECTRUM  */}
      {/* ========================================================================= */}
      {activeMainTab === 'AFM_CANTILEVER' && (
        <div className="space-y-6 animate-fadeIn">
          <AfmCantileverVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 44: SURFACE PLASMON RESONANCE (SPR) & KRETSCHMANN KINETICS        */}
      {/* ========================================================================= */}
      {activeMainTab === 'SURFACE_PLASMON' && (
        <div className="space-y-6 animate-fadeIn">
          <SurfacePlasmonVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 45: DYNAMIC LIGHT SCATTERING (DLS) & ZETA POTENTIAL               */}
      {/* ========================================================================= */}
      {activeMainTab === 'DYNAMIC_LIGHT_SCATTERING' && (
        <div className="space-y-6 animate-fadeIn">
          <DynamicLightScatteringVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 46: CIRCULAR DICHROISM (CD) & PROTEIN SECONDARY STRUCTURE         */}
      {/* ========================================================================= */}
      {activeMainTab === 'CIRCULAR_DICHROISM' && (
        <div className="space-y-6 animate-fadeIn">
          <CircularDichroismVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 47: DIFFERENTIAL SCANNING FLUORIMETRY (DSF) & THERMAL SHIFT ASSAY */}
      {/* ========================================================================= */}
      {activeMainTab === 'THERMAL_SHIFT_ASSAY' && (
        <div className="space-y-6 animate-fadeIn">
          <ThermalShiftVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 48: SMALL-ANGLE X-RAY SCATTERING (SAXS) & KRATKY PLOT             */}
      {/* ========================================================================= */}
      {activeMainTab === 'SAXS_SCATTERING' && (
        <div className="space-y-6 animate-fadeIn">
          <SaxsScatteringVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 49: CRYOGENIC ELECTRON MICROSCOPY (CRYO-EM) & 3D RECONSTRUCTION   */}
      {/* ========================================================================= */}
      {activeMainTab === 'CRYO_ELECTRON_MICROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <CryoEmVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 50: SOLID-STATE NMR (ssNMR) & MAGIC-ANGLE SPINNING (MAS)           */}
      {/* ========================================================================= */}
      {activeMainTab === 'SOLID_STATE_NMR' && (
        <div className="space-y-6 animate-fadeIn">
          <SolidStateNmrVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 51: STOPPED-FLOW PRE-STEADY-STATE KINETICS & FLASH PHOTOLYSIS       */}
      {/* ========================================================================= */}
      {activeMainTab === 'STOPPED_FLOW_KINETICS' && (
        <div className="space-y-6 animate-fadeIn">
          <StoppedFlowVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 52: DUAL-POLARIZATION INTERFEROMETRY (DPI) & DE FEIJTER INVERSION   */}
      {/* ========================================================================= */}
      {activeMainTab === 'DUAL_POLARIZATION_INTERFEROMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <DualPolarizationVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 53: QUARTZ CRYSTAL MICROBALANCE (QCM-D) & VISCOELASTIC VOIGT       */}
      {/* ========================================================================= */}
      {activeMainTab === 'QCMD_MICROBALANCE' && (
        <div className="space-y-6 animate-fadeIn">
          <QcmdVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 54: OPTICAL TWEEZERS & SINGLE-MOLECULE FORCE SPECTROSCOPY         */}
      {/* ========================================================================= */}
      {activeMainTab === 'OPTICAL_TWEEZERS' && (
        <div className="space-y-6 animate-fadeIn">
          <OpticalTweezersVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 55: MAGNETIC TWEEZERS & DNA PLECTONEMIC SUPERCOILING               */}
      {/* ========================================================================= */}
      {activeMainTab === 'MAGNETIC_TWEEZERS' && (
        <div className="space-y-6 animate-fadeIn">
          <MagneticTweezersVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 56: CAPILLARY ELECTROPHORESIS & CHIRAL RESOLUTION                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'CAPILLARY_ELECTROPHORESIS' && (
        <div className="space-y-6 animate-fadeIn">
          <CapillaryElectrophoresisVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 57: POSITRON EMISSION TOMOGRAPHY (PET) & ANNIHILATION             */}
      {/* ========================================================================= */}
      {activeMainTab === 'PET_RADIOCHEMISTRY' && (
        <div className="space-y-6 animate-fadeIn">
          <PetRadiochemistryVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 58: SCANNING TUNNELING MICROSCOPY (STM) & TERSOFF-HAMANN LDOS      */}
      {/* ========================================================================= */}
      {activeMainTab === 'SCANNING_TUNNELING_MICROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <StmVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 59: FEMTOSECOND PUMP-PROBE SPECTROSCOPY & REACTION DYNAMICS        */}
      {/* ========================================================================= */}
      {activeMainTab === 'FEMTOSECOND_PUMP_PROBE' && (
        <div className="space-y-6 animate-fadeIn">
          <FemtosecondPumpProbeVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 60: SECONDARY ION MASS SPECTROMETRY (SIMS) & DEPTH PROFILING       */}
      {/* ========================================================================= */}
      {activeMainTab === 'SECONDARY_ION_MASS_SPECTROMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <SimsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 61: MÖSSBAUER SPECTROSCOPY & NUCLEAR GAMMA RESONANCE               */}
      {/* ========================================================================= */}
      {activeMainTab === 'MOSSBAUER_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <MossbauerVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 62: X-RAY ABSORPTION FINE STRUCTURE (XAFS, XANES & EXAFS)         */}
      {/* ========================================================================= */}
      {activeMainTab === 'XAFS_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <XafsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 63: DYNAMIC MECHANICAL ANALYSIS (DMA & VISCOELASTICITY)           */}
      {/* ========================================================================= */}
      {activeMainTab === 'DMA_VISCOELASTICITY' && (
        <div className="space-y-6 animate-fadeIn">
          <DmaVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 64: ISOTHERMAL TITRATION CALORIMETRY (ITC & BINDING ENTHALPY)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'ISOTHERMAL_TITRATION_CALORIMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <ItcVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 65: ELECTROSPRAY IONIZATION MASS SPECTROMETRY (ESI-MS)             */}
      {/* ========================================================================= */}
      {activeMainTab === 'ELECTROSPRAY_IONIZATION_MASS_SPEC' && (
        <div className="space-y-6 animate-fadeIn">
          <EsiMassSpecVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 66: SUPERCRITICAL FLUID CHROMATOGRAPHY (SFC & GREEN SOLVENTS)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'SUPERCRITICAL_FLUID_CHROMATOGRAPHY' && (
        <div className="space-y-6 animate-fadeIn">
          <SfcVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 67: NANOPARTICLE TRACKING ANALYSIS (NTA & BROWNIAN DIFFUSION)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'NANOPARTICLE_TRACKING_ANALYSIS' && (
        <div className="space-y-6 animate-fadeIn">
          <NtaVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 68: MICROSCALE THERMOPHORESIS (MST & SORET EFFECT)                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'MICROSCALE_THERMOPHORESIS' && (
        <div className="space-y-6 animate-fadeIn">
          <MstVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 69: BIO-LAYER INTERFEROMETRY (BLI & REAL-TIME KINETICS)            */}
      {/* ========================================================================= */}
      {activeMainTab === 'BIO_LAYER_INTERFEROMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <BliVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 70: RESONANT MASS MEASUREMENT (RMM & SMR ARCHIMEDES BUOYANCY)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'RESONANT_MASS_MEASUREMENT' && (
        <div className="space-y-6 animate-fadeIn">
          <RmmVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 71: DIFFERENTIAL SCANNING CALORIMETRY (DSC & PROTEIN STABILITY)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'DIFFERENTIAL_SCANNING_CALORIMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <DscVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 72: PRESSURE PERTURBATION CALORIMETRY (PPC & THERMAL EXPANSION)    */}
      {/* ========================================================================= */}
      {activeMainTab === 'PRESSURE_PERTURBATION_CALORIMETRY' && (
        <div className="space-y-6 animate-fadeIn">
          <PpcVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 73: SIZE EXCLUSION CHROMATOGRAPHY & LIGHT SCATTERING (SEC-MALS)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'SEC_MALS_LIGHT_SCATTERING' && (
        <div className="space-y-6 animate-fadeIn">
          <SecMalsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 74: ANALYTICAL ULTRACENTRIFUGATION (AUC & SVEDBERG COEFFICIENTS)   */}
      {/* ========================================================================= */}
      {activeMainTab === 'ANALYTICAL_ULTRACENTRIFUGATION' && (
        <div className="space-y-6 animate-fadeIn">
          <AucVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 75: ASYMMETRICAL FLOW FIELD-FLOW FRACTIONATION (AF4)               */}
      {/* ========================================================================= */}
      {activeMainTab === 'ASYMMETRICAL_FLOW_FIELD_FLOW_FRACTIONATION' && (
        <div className="space-y-6 animate-fadeIn">
          <Af4Visualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 76: TAYLOR DISPERSION ANALYSIS (TDA)                              */}
      {/* ========================================================================= */}
      {activeMainTab === 'TAYLOR_DISPERSION_ANALYSIS' && (
        <div className="space-y-6 animate-fadeIn">
          <TdaVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 77: FLUORESCENCE CORRELATION SPECTROSCOPY (FCS)                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'FLUORESCENCE_CORRELATION_SPECTROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <FcsVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 78: FLUORESCENCE LIFETIME IMAGING MICROSCOPY (FLIM / TCSPC)        */}
      {/* ========================================================================= */}
      {activeMainTab === 'FLUORESCENCE_LIFETIME_IMAGING_MICROSCOPY' && (
        <div className="space-y-6 animate-fadeIn">
          <FlimVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 79: SINGLE-MOLECULE FRET & ALTERNATING-LASER EXCITATION (ALEX)    */}
      {/* ========================================================================= */}
      {activeMainTab === 'SINGLE_MOLECULE_FRET_ALEX' && (
        <div className="space-y-6 animate-fadeIn">
          <SmFretVisualizer />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: DUAL-PROFILE ELEMENT INSPECTOR MODAL                             */}
      {/* ========================================================================= */}
      {inspectingElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-navy to-obsidian border border-navy-light rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playUiClick();
                setInspectingElement(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header: Atom Diagram & Dual-Nomenclature */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-navy-light/40 pb-4">
              <div className="flex-shrink-0">
                <AtomDiagram element={inspectingElement} size={150} animated={true} />
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40">
                  {inspectingElement.category.replace('_', ' ')} • Chu kỳ {inspectingElement.period} • Nhóm {inspectingElement.group}
                </div>
                <h3 className="font-serif text-2xl font-black text-ivory">
                  {inspectingElement.name_iupac}
                  <span className="text-copper text-lg font-sans font-semibold ml-2">
                    ({inspectingElement.name_vi})
                  </span>
                </h3>
                <p className="text-xs font-mono text-ivory-muted">
                  Kí hiệu: <strong className="text-cyan-ion text-sm">{inspectingElement.symbol}</strong> • Số hiệu nguyên tử:{' '}
                  <strong className="text-ivory">Z = {inspectingElement.z}</strong>
                </p>
                <p className="text-xs font-mono text-ivory-muted">
                  Nguyên tử khối: <strong className="text-ivory">{inspectingElement.atomic_weight.toFixed(3)} u</strong>
                </p>
                <p className="text-xs font-mono text-ivory-muted">
                  Cấu hình electron: <strong className="text-cyan-ion">{inspectingElement.electron_config}</strong>
                </p>
              </div>
            </div>

            {/* Dual Profile Switcher Tabs */}
            <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2">
              <button
                onClick={() => {
                  sound.playUiClick();
                  setInspectProfileTab('SCIENCE');
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  inspectProfileTab === 'SCIENCE'
                    ? 'bg-cyan-ion text-obsidian shadow'
                    : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Hồ Sơ Khoa Học (IUPAC Ground Truth)</span>
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setInspectProfileTab('BATTLE');
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  inspectProfileTab === 'BATTLE'
                    ? 'bg-copper text-white shadow'
                    : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Hồ Sơ Chiến Đấu ELEMENTA</span>
              </button>
            </div>

            {/* TAB CONTENT: SCIENCE GROUND TRUTH */}
            {inspectProfileTab === 'SCIENCE' && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                    <span className="text-[10px] text-ivory-muted block">Độ âm điện χ:</span>
                    <strong className="text-cyan-ion text-sm">{inspectingElement.electronegativity ?? 'N/A (Khí hiếm)'}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                    <span className="text-[10px] text-ivory-muted block">Năng lượng I₁:</span>
                    <strong className="text-copper text-sm">{inspectingElement.first_ionization_energy} kJ/mol</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                    <span className="text-[10px] text-ivory-muted block">Số oxi hóa:</span>
                    <strong className="text-ivory text-sm">{inspectingElement.oxidation_states.join(', ')}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                    <span className="text-[10px] text-ivory-muted block">Trạng thái (25°C):</span>
                    <strong className="text-lime-mineral text-sm">{inspectingElement.standard_state}</strong>
                  </div>
                </div>

                {/* Interactive Orbital Box Diagram (GDPT 2018 Grade 10) */}
                <OrbitalBoxDiagram z={inspectingElement.z} symbol={inspectingElement.symbol} />

                {/* Interactive Flame Test Spectroscopy (GDPT 2018 Flame Emission) */}
                <FlameTestVisualizer
                  symbol={inspectingElement.symbol}
                  nameVi={inspectingElement.name_vi}
                />

                <div>
                  <h4 className="font-semibold text-ivory flex items-center gap-1.5 mb-1 text-copper">
                    <Sparkles className="w-4 h-4 text-copper" />
                    <span>Ứng Dụng Thực Tiễn Đời Sống & Công Nghệ:</span>
                  </h4>
                  <p className="text-ivory-muted bg-navy/40 p-3 rounded-lg border border-navy-light/30 leading-relaxed">
                    {inspectingElement.apps_vi}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-ivory flex items-center gap-1.5 mb-1 text-cyan-ion">
                    <Info className="w-4 h-4 text-cyan-ion" />
                    <span>Dữ Kiện & Quy Luật Hóa Học Cốt Lõi (GDPT 2018):</span>
                  </h4>
                  <ul className="space-y-1.5 bg-navy/40 p-3 rounded-lg border border-navy-light/30">
                    {inspectingElement.facts_vi.map((fact, idx) => (
                      <li key={idx} className="text-ivory-muted flex items-start gap-2">
                        <span className="text-cyan-ion font-bold">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BATTLE STATS PROFILE */}
            {inspectProfileTab === 'BATTLE' && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <div className="bg-navy-dark/90 rounded-xl p-4 border border-navy-light/50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-copper border-b border-navy-light/40 pb-1">
                    <span>MÔ THỨC CHIẾN THUẬT: {inspectingElement.role}</span>
                    <span className="font-mono text-[10px] text-ivory-muted">Chi phí Mana: {inspectingElement.stats.mana_cost}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-navy/60 border border-purple-500/30">
                      <span className="text-[10px] text-ivory-muted block">ATK Oxi Hóa (Lũy thừa χ)</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono text-lg font-bold text-purple-400">{inspectingElement.stats.atk_ox}</span>
                        <span className="text-[10px] text-ivory-muted font-mono">/ 100</span>
                      </div>
                      <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-purple-500 h-full" style={{ width: `${inspectingElement.stats.atk_ox}%` }} />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-navy/60 border border-coral-reaction/30">
                      <span className="text-[10px] text-ivory-muted block">ATK Khử (Logarithm I₁)</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono text-lg font-bold text-coral-reaction">{inspectingElement.stats.atk_red}</span>
                        <span className="text-[10px] text-ivory-muted font-mono">/ 100</span>
                      </div>
                      <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-coral-reaction h-full" style={{ width: `${inspectingElement.stats.atk_red}%` }} />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-navy/60 border border-cyan-ion/30">
                      <span className="text-[10px] text-ivory-muted block">DEF Độ Bền (+β_inert)</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono text-lg font-bold text-cyan-ion">{inspectingElement.stats.def_stab}</span>
                        <span className="text-[10px] text-ivory-muted font-mono">/ 100</span>
                      </div>
                      <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-cyan-ion h-full" style={{ width: `${inspectingElement.stats.def_stab}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Model Disclaimer */}
                <div className="p-3 rounded-xl bg-copper/10 border border-copper/30 text-[11px] text-ivory-muted space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-copper">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Lưu ý Sư phạm về Mô hình Quy đổi:</span>
                  </div>
                  <p className="leading-relaxed">
                    Các chỉ số ATK, DEF, Mana là tham số cân bằng trò chơi được tính toán phi tuyến từ đại lượng vật lý thực tế. Không được hiểu lầm chỉ số game là đại lượng vật lý tiêu chuẩn trong phòng thí nghiệm.
                  </p>
                </div>
              </div>
            )}

            {/* Source Provenance Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3">
              <span>Nguồn: IUPAC Commission on Isotopic Abundances & CIAAW (2022)</span>
              <span className="text-lime-mineral font-semibold">ĐÃ XÁC MINH SƠ CẤP</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SUBSTANCE DETAIL INSPECTOR MODAL                                  */}
      {/* ========================================================================= */}
      {inspectingSubstance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-gradient-to-b from-navy to-obsidian border border-copper/40 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                sound.playUiClick();
                setInspectingSubstance(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-navy-light/40 pb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-copper/20 text-copper border border-copper/40 font-bold">
                {inspectingSubstance.category} • {inspectingSubstance.curriculum}
              </span>
              <h3 className="font-serif text-3xl font-black text-ivory mt-1.5">
                {inspectingSubstance.formula_display}
                <span className="text-lg font-sans font-semibold text-copper ml-2">
                  {inspectingSubstance.name_vi}
                </span>
              </h3>
              <p className="text-xs font-mono text-ivory-muted mt-1">
                Tên IUPAC: <strong className="text-ivory">{inspectingSubstance.name_iupac}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                <span className="text-[10px] text-ivory-muted block">Khối lượng mol M:</span>
                <strong className="text-copper text-sm">{inspectingSubstance.molar_mass.toFixed(2)} g/mol</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50">
                <span className="text-[10px] text-ivory-muted block">Trạng thái (25°C):</span>
                <strong className="text-cyan-ion text-sm">{inspectingSubstance.standard_state}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-obsidian border border-navy-light/50 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-ivory-muted block">Màu sắc:</span>
                <strong className="text-ivory text-sm truncate block">{inspectingSubstance.color_vi}</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-semibold text-ivory flex items-center gap-1.5 mb-1 text-cyan-ion">
                  <Droplets className="w-4 h-4 text-cyan-ion" />
                  <span>Độ Tan & Tính Chất Nước:</span>
                </h4>
                <p className="text-ivory-muted bg-navy/40 p-3 rounded-lg border border-navy-light/30">
                  {inspectingSubstance.solubility_water_vi}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-ivory flex items-center gap-1.5 mb-1 text-copper">
                  <Info className="w-4 h-4 text-copper" />
                  <span>Đặc Điểm & Bản Chất Hóa Học:</span>
                </h4>
                <p className="text-ivory-muted bg-navy/40 p-3 rounded-lg border border-navy-light/30 leading-relaxed">
                  {inspectingSubstance.description_vi}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-ivory flex items-center gap-1.5 mb-1 text-lime-mineral">
                  <Sparkles className="w-4 h-4 text-lime-mineral" />
                  <span>Ứng Dụng Đời Sống & Kỹ Thuật:</span>
                </h4>
                <ul className="space-y-1 bg-navy/40 p-3 rounded-lg border border-navy-light/30">
                  {inspectingSubstance.applications_vi.map((app, idx) => (
                    <li key={idx} className="text-ivory-muted flex items-start gap-2">
                      <span className="text-lime-mineral font-bold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[10px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-3 flex justify-between">
              <span>Định danh ID: {inspectingSubstance.id}</span>
              <span className="text-copper font-semibold">GDPT 2018 AUDITED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
