// src/domain/seawaterUraniumExtractionEngine.ts
// ============================================================================
// SEAWATER URANIUM EXTRACTION & PULSED ELECTROCHEMICAL ELUTION (MARINE MINING)
// Conforming to IUPAC Marine Inorganic Chemistry, Uranyl Chelation Kinetics,
// and Ocean Nuclear Fuel Sustainability Standards (ORNL & PNNL Benchmarks)
// ============================================================================

export interface AdsorbentFiberSpecs {
  id: 'Braided_Amidoxime_PE' | 'Graphene_Amidoxime' | 'MOF_Nanofiber' | 'Bacterial_Cellulose_Amidoxime';
  name: string;
  functionalGroup: string;
  basePolymer: string;
  surfaceAreaM2G: number;               // m²/g (e.g. 120 - 350 m²/g)
  equilibriumCapacityMgUG: number;      // mg U / g adsorbent (typically 6.5 - 12.0 mg/g)
  adsorptionHalfLifeDays: number;       // days (typically 14 - 21 days)
  regenerationCyclesLifetime: number;   // number of marine deployment cycles (e.g. 30 - 60)
  elutionMethod: 'Pulsed_Electrochemical' | 'Mild_Bicarbonate' | 'Dilute_HCl_Stripping';
}

export interface MarineHarvestSpecs {
  adsorbentBraidsTotalTons: number;     // tons of adsorbent deployed at sea (e.g. 500 tons)
  oceanCurrentVelocityMS: number;       // m/s (e.g. 0.25 - 0.75 m/s passive Kuroshio or Gulf Stream flow)
  seawaterTemperatureC: number;         // typically 18 - 26°C
  immersionDurationDays: number;        // marine immersion period (typically 30 - 60 days)
  selectedAdsorbentId: 'Braided_Amidoxime_PE' | 'Graphene_Amidoxime' | 'MOF_Nanofiber' | 'Bacterial_Cellulose_Amidoxime';
  desorptionPulseVoltageV: number;      // pulsed potential (-0.50 to -0.85 V vs Ag/AgCl)
}

export interface UraniumExtractionResults {
  uraniumHarvestedPerCycleKg: number;   // kg U per deployment cycle
  annualUraniumHarvestTons: number;     // tons U / year
  seawaterFilteredEquivalentKm3: number;// equivalent ocean volume passed across braids (km³)
  elutionRecoveryPercent: number;       // electrochemical elution efficiency (> 95 - 98%)
  adsorbentDegradationPerCyclePercent: number; // loss per cycle (e.g. < 0.8% with electrochemical elution)
  yellowcakeProductKgYear: number;      // kg (NH4)2U2O7 or UO4 (Yellowcake equivalent)
  nuclearElectricityPotentialTWhYear: number; // TWh generated in nuclear reactors from this uranium
  productionCostDollarPerKgU: number;   // $/kg U (benchmark target: $180 - $280/kg U)
  avoidedMiningTailingsTonsYear: number; // avoided toxic terrestrial mine tailings
  globalMarineUraniumReserveGt: number; // 4.5 billion tons (Gt) in world oceans
}

export interface TerrestrialVsMarineBenchmark {
  source: string;
  vietnameseName: string;
  reserveTonnes: number;
  gradePpm: number;
  environmentalFootprint: string;
  tailingsWasteTonsPerKgU: number;
  longevityYears: number;
}

// Physical & Chemical Constants (IUPAC & Marine Chemistry)
export const SEAWATER_URANIUM_CONCENTRATION_PPB = 3.30; // 3.3 ppb (µg/L) dissolved as [UO2(CO3)3]4-
export const GLOBAL_OCEAN_VOLUME_KM3 = 1.332e9;         // 1.332 billion km³
export const GLOBAL_OCEAN_URANIUM_TONS = 4.5e9;         // 4.5 billion tons of Uranium dissolved in seawater
export const MOLAR_MASS_U = 0.23803;                    // kg / mol Uranium
export const ENERGY_DENSITY_U_NATURAL_MWH_KG = 60000;  // kWh electrical / kg U in thermal PWR (60 MWh/kg U, 3,000x coal)
export const TAILINGS_PER_KG_TERRESTRIAL_U = 1800;      // kg solid tailings per kg U from 0.1% ore

export const ADSORBENT_CATALOG: AdsorbentFiberSpecs[] = [
  {
    id: 'Braided_Amidoxime_PE',
    name: 'Polyethylene Braided Amidoxime Fiber (PNNL/ORNL Standard)',
    functionalGroup: 'Amidoxime (-C(NH2)=N-OH) & Carboxylate (-COO-)',
    basePolymer: 'High-Surface Area Hollow Gear Polyethylene',
    surfaceAreaM2G: 185,
    equilibriumCapacityMgUG: 8.50,
    adsorptionHalfLifeDays: 18.0,
    regenerationCyclesLifetime: 45,
    elutionMethod: 'Pulsed_Electrochemical'
  },
  {
    id: 'Graphene_Amidoxime',
    name: '3D Macroporous Graphene-Amidoxime Aerogel',
    functionalGroup: 'Chelating Bis-Amidoxime & Hydroxyurea',
    basePolymer: 'Reduced Graphene Oxide (rGO) Aerogel',
    surfaceAreaM2G: 340,
    equilibriumCapacityMgUG: 12.20,
    adsorptionHalfLifeDays: 12.5,
    regenerationCyclesLifetime: 60,
    elutionMethod: 'Pulsed_Electrochemical'
  },
  {
    id: 'MOF_Nanofiber',
    name: 'UiO-66-AO Metal-Organic Framework Nanofiber',
    functionalGroup: 'Zirconium Metal Nodes with Amidoxime Linkers',
    basePolymer: 'Electrospun Polyacrylonitrile (PAN)',
    surfaceAreaM2G: 290,
    equilibriumCapacityMgUG: 10.40,
    adsorptionHalfLifeDays: 15.0,
    regenerationCyclesLifetime: 35,
    elutionMethod: 'Mild_Bicarbonate'
  },
  {
    id: 'Bacterial_Cellulose_Amidoxime',
    name: 'Bio-Derived Bacterial Cellulose Amidoxime (Green Marine)',
    functionalGroup: 'Bio-Chelating Amidoxime Chains',
    basePolymer: 'Biodegradable Acetobacter Xylinum Cellulose',
    surfaceAreaM2G: 150,
    equilibriumCapacityMgUG: 7.10,
    adsorptionHalfLifeDays: 20.0,
    regenerationCyclesLifetime: 25,
    elutionMethod: 'Mild_Bicarbonate'
  }
];

export const TERRESTRIAL_VS_MARINE_COMPARISON: TerrestrialVsMarineBenchmark[] = [
  {
    source: 'Seawater_Extraction',
    vietnameseName: 'Khai Thác Urani Từ Nước Biển (Thụ Động)',
    reserveTonnes: 4500000000,
    gradePpm: 0.0033, // 3.3 ppb
    environmentalFootprint: 'Không đào bới mỏ, không đập quặng đuôi, 100% dòng hải lưu tự nhiên',
    tailingsWasteTonsPerKgU: 0,
    longevityYears: 100000
  },
  {
    source: 'Conventional_Terrestrial_Mines',
    vietnameseName: 'Mỏ Urani Trên Đất Liền (Mỏ Hở & Mỏ Ngầm)',
    reserveTonnes: 6500000, // ~6.5 million tons economically recoverable
    gradePpm: 1500, // 0.15% U3O8
    environmentalFootprint: 'Phá hủy cảnh quan, phát thải khí phóng xạ Radon-222, nguy cơ vỡ đập bùn',
    tailingsWasteTonsPerKgU: 1800,
    longevityYears: 80
  }
];

export class SeawaterUraniumExtractionEngine {
  /**
   * Calculate pseudo-second-order uranyl adsorption kinetics onto amidoxime braids:
   * q_t = (q_e * k2 * t) / (1 + q_e * k2 * t)
   */
  public static calculateAdsorptionUptake(
    adsorbent: AdsorbentFiberSpecs,
    immersionDays: number,
    oceanVelocityMS: number = 0.50,
    tempC: number = 22.0
  ): {
    uptakeMgUG: number;
    fractionOfEquilibrium: number;
    effectiveCapacityKgUPerTonFiber: number;
  } {
    // Temperature and velocity enhancement factors:
    // Uranyl chelation is endothermic (ΔH > 0), higher seawater temp boosts uptake (~ +1.8%/°C above 20°C)
    const tempFactor = 1 + 0.018 * (tempC - 20.0);
    // Boundary layer mass transfer enhancement from ocean velocity:
    const velocityFactor = Math.min(1.25, Math.max(0.85, 0.70 + 0.60 * Math.sqrt(oceanVelocityMS)));

    const effectiveQe = adsorbent.equilibriumCapacityMgUG * tempFactor * velocityFactor;
    
    // Pseudo-second-order kinetic uptake:
    // When t = tHalf, q_t = 0.5 * q_e.
    const tHalf = adsorbent.adsorptionHalfLifeDays;
    const fraction = immersionDays / (tHalf + immersionDays);
    const qT = effectiveQe * fraction;
    const kgUPerTonFiber = qT; // 1 mg/g = 1 kg/ton

    return {
      uptakeMgUG: Number(qT.toFixed(2)),
      fractionOfEquilibrium: Number(fraction.toFixed(3)),
      effectiveCapacityKgUPerTonFiber: Number(kgUPerTonFiber.toFixed(2))
    };
  }

  /**
   * Complete simulation of marine uranium extraction campaign.
   */
  public static simulateCampaign(specs: MarineHarvestSpecs): UraniumExtractionResults {
    const adsorbent = ADSORBENT_CATALOG.find(a => a.id === specs.selectedAdsorbentId) || ADSORBENT_CATALOG[0];
    const uptake = this.calculateAdsorptionUptake(adsorbent, specs.immersionDurationDays, specs.oceanCurrentVelocityMS, specs.seawaterTemperatureC);

    // Harvest per marine deployment cycle:
    const uraniumHarvestedPerCycleKg = specs.adsorbentBraidsTotalTons * uptake.effectiveCapacityKgUPerTonFiber;

    // Cycles per year: (365 days / (immersionDays + 7 days recovery & electrochemical elution))
    const cycleDurationTotal = specs.immersionDurationDays + 7;
    const cyclesPerYear = 365 / cycleDurationTotal;
    const annualUraniumHarvestTons = (uraniumHarvestedPerCycleKg * cyclesPerYear) / 1000;

    // Equivalent ocean volume filtered: (mass of U / 3.3 µg/L = 3.3e-6 kg/m³ = 3.3e-9 kg/L = 3.3e-6 kg/m³ = 3300 kg/km³)
    const seawaterFilteredKm3 = (annualUraniumHarvestTons * 1000) / 3300;

    // Pulsed Electrochemical Elution:
    // Operating at -0.65 V shifts uranyl reduction/chelation equilibrium, achieving 97.5% recovery
    const elutionRecoveryPercent = 97.5;
    const recoveredUraniumKgYear = (annualUraniumHarvestTons * 1000) * (elutionRecoveryPercent / 100);

    // Yellowcake conversion: Ammonium Diuranate (NH4)2U2O7 (Molar mass ~ 624.1 g/mol, U content ~ 76.3%)
    const yellowcakeProductKgYear = recoveredUraniumKgYear / 0.763;

    // Nuclear Electricity Potential: 1 kg natural U in standard light water reactors produces ~ 60,000 kWh = 60 MWh = 0.060 GWh
    const nuclearElectricityTWh = (recoveredUraniumKgYear * 0.060) / 1000;

    // Production cost modeling ($/kg U):
    // Adsorbent capital cost: ~$15/kg fiber = $15,000/ton. Amortized over 45 cycles:
    const fiberCostPerKgU = 15000 / (uptake.effectiveCapacityKgUPerTonFiber * adsorbent.regenerationCyclesLifetime);
    const marineOperationsPerKgU = 110.0; // boat deployment, retrieval, mooring
    const electrochemicalElutionPerKgU = 28.0; // electricity for pulsed potential + sodium carbonate buffer
    const chemicalProcessingPerKgU = 18.0; // yellowcake precipitation & drying
    const totalCostPerKgU = fiberCostPerKgU + marineOperationsPerKgU + electrochemicalElutionPerKgU + chemicalProcessingPerKgU;

    // Environmental benefits:
    const avoidedTailingsTons = (recoveredUraniumKgYear * TAILINGS_PER_KG_TERRESTRIAL_U) / 1000;

    return {
      uraniumHarvestedPerCycleKg: Number(uraniumHarvestedPerCycleKg.toFixed(1)),
      annualUraniumHarvestTons: Number(annualUraniumHarvestTons.toFixed(2)),
      seawaterFilteredEquivalentKm3: Number(seawaterFilteredKm3.toFixed(2)),
      elutionRecoveryPercent,
      adsorbentDegradationPerCyclePercent: 0.65, // < 1% per cycle with pulsed electrochemistry
      yellowcakeProductKgYear: Number(yellowcakeProductKgYear.toFixed(0)),
      nuclearElectricityPotentialTWhYear: Number(nuclearElectricityTWh.toFixed(2)),
      productionCostDollarPerKgU: Number(totalCostPerKgU.toFixed(2)),
      avoidedMiningTailingsTonsYear: Number(avoidedTailingsTons.toFixed(0)),
      globalMarineUraniumReserveGt: 4.5
    };
  }
}
