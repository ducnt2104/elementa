// src/data/cards/index.ts
// Comprehensive 7,200 Batch Card Catalog Aggregator for ELEMENTA Tactical TCG
// (Core 129 + 7,200 Batch Cards = 7,329 Total Verified Playable Cards)

import { PlayableCardDef } from '../../domain/cardGameTypes';

import { BATCH_01_CARDS } from './batches/batch_01_monsters_main_alkali_earth';
import { BATCH_02_CARDS } from './batches/batch_02_monsters_main_transition_metals';
import { BATCH_03_CARDS } from './batches/batch_03_monsters_main_halogens_chalcogens';
import { BATCH_04_CARDS } from './batches/batch_04_monsters_main_noble_pnictogens';
import { BATCH_05_CARDS } from './batches/batch_05_monsters_main_organic_hydrocarbons';
import { BATCH_06_CARDS } from './batches/batch_06_monsters_main_biomolecules_polymers';
import { BATCH_07_CARDS } from './batches/batch_07_monsters_main_acids_bases_salts';
import { BATCH_08_CARDS } from './batches/batch_08_monsters_main_catalysts_allotropes';
import { BATCH_09_CARDS } from './batches/batch_09_monsters_main_scientific_entities';
import { BATCH_10_CARDS } from './batches/batch_10_monsters_main_elemental_guardians';
import { BATCH_11_CARDS } from './batches/batch_11_extra_deck_fusion_compounds';
import { BATCH_12_CARDS } from './batches/batch_12_extra_deck_synchro_catalysis';
import { BATCH_13_CARDS } from './batches/batch_13_extra_deck_xyz_coordination';
import { BATCH_14_CARDS } from './batches/batch_14_extra_deck_link_valences';
import { BATCH_15_CARDS } from './batches/batch_15_spells_normal_reactions';
import { BATCH_16_CARDS } from './batches/batch_16_spells_continuous_kinetics';
import { BATCH_17_CARDS } from './batches/batch_17_spells_equip_catalysts';
import { BATCH_18_CARDS } from './batches/batch_18_spells_field_environments';
import { BATCH_19_CARDS } from './batches/batch_19_spells_quickplay_lechatelier';
import { BATCH_20_CARDS } from './batches/batch_20_spells_ritual_crystallization';
import { BATCH_21_CARDS } from './batches/batch_21_traps_normal_countermeasures';
import { BATCH_22_CARDS } from './batches/batch_22_traps_continuous_corrosion';
import { BATCH_23_CARDS } from './batches/batch_23_traps_counter_equilibrium';
import { BATCH_24_CARDS } from './batches/batch_24_traps_titration_passivation';

// 25 NEW INDUSTRIAL-GRADE BATCHES (BATCH 25 TO 49: 5,000 CARDS)
import { BATCH_25_CARDS } from './batches/batch_25_monsters_main_lanthanides_rare_earths';
import { BATCH_26_CARDS } from './batches/batch_26_monsters_main_actinides_nuclear';
import { BATCH_27_CARDS } from './batches/batch_27_monsters_main_superheavy_transactinides';
import { BATCH_28_CARDS } from './batches/batch_28_monsters_main_covalent_hydrides';
import { BATCH_29_CARDS } from './batches/batch_29_monsters_main_metal_halides';
import { BATCH_30_CARDS } from './batches/batch_30_monsters_main_interhalogens';
import { BATCH_31_CARDS } from './batches/batch_31_monsters_main_silicates_zeolites';
import { BATCH_32_CARDS } from './batches/batch_32_monsters_main_chalcogenides_pyrites';
import { BATCH_33_CARDS } from './batches/batch_33_monsters_main_carbon_nano_allotropes';
import { BATCH_34_CARDS } from './batches/batch_34_monsters_main_organic_radicals';
import { BATCH_35_CARDS } from './batches/batch_35_extra_deck_fusion_metalloenzymes';
import { BATCH_36_CARDS } from './batches/batch_36_extra_deck_xyz_chelates';
import { BATCH_37_CARDS } from './batches/batch_37_extra_deck_synchro_metallocenes';
import { BATCH_38_CARDS } from './batches/batch_38_extra_deck_link_polymers';
import { BATCH_39_CARDS } from './batches/batch_39_extra_deck_supramolecular_mofs';
import { BATCH_40_CARDS } from './batches/batch_40_spells_normal_redox_titration';
import { BATCH_41_CARDS } from './batches/batch_41_spells_equip_catalysts';
import { BATCH_42_CARDS } from './batches/batch_42_spells_quickplay_photochemistry';
import { BATCH_43_CARDS } from './batches/batch_43_spells_field_environments';
import { BATCH_44_CARDS } from './batches/batch_44_spells_continuous_electrochemistry';
import { BATCH_45_CARDS } from './batches/batch_45_spells_quickplay_buffer_solutions';
import { BATCH_46_CARDS } from './batches/batch_46_traps_normal_colloidal_coagulation';
import { BATCH_47_CARDS } from './batches/batch_47_traps_continuous_passivation_armor';
import { BATCH_48_CARDS } from './batches/batch_48_traps_normal_gravimetric_precipitation';
import { BATCH_49_CARDS } from './batches/batch_49_traps_counter_equilibrium_lechatelier';

export {
  BATCH_01_CARDS,
  BATCH_02_CARDS,
  BATCH_03_CARDS,
  BATCH_04_CARDS,
  BATCH_05_CARDS,
  BATCH_06_CARDS,
  BATCH_07_CARDS,
  BATCH_08_CARDS,
  BATCH_09_CARDS,
  BATCH_10_CARDS,
  BATCH_11_CARDS,
  BATCH_12_CARDS,
  BATCH_13_CARDS,
  BATCH_14_CARDS,
  BATCH_15_CARDS,
  BATCH_16_CARDS,
  BATCH_17_CARDS,
  BATCH_18_CARDS,
  BATCH_19_CARDS,
  BATCH_20_CARDS,
  BATCH_21_CARDS,
  BATCH_22_CARDS,
  BATCH_23_CARDS,
  BATCH_24_CARDS,
  BATCH_25_CARDS,
  BATCH_26_CARDS,
  BATCH_27_CARDS,
  BATCH_28_CARDS,
  BATCH_29_CARDS,
  BATCH_30_CARDS,
  BATCH_31_CARDS,
  BATCH_32_CARDS,
  BATCH_33_CARDS,
  BATCH_34_CARDS,
  BATCH_35_CARDS,
  BATCH_36_CARDS,
  BATCH_37_CARDS,
  BATCH_38_CARDS,
  BATCH_39_CARDS,
  BATCH_40_CARDS,
  BATCH_41_CARDS,
  BATCH_42_CARDS,
  BATCH_43_CARDS,
  BATCH_44_CARDS,
  BATCH_45_CARDS,
  BATCH_46_CARDS,
  BATCH_47_CARDS,
  BATCH_48_CARDS,
  BATCH_49_CARDS
};

/**
 * All 7,200 batch cards aggregated into a single high-performance array.
 */
export const BATCH_CARDS: PlayableCardDef[] = [
  ...BATCH_01_CARDS,
  ...BATCH_02_CARDS,
  ...BATCH_03_CARDS,
  ...BATCH_04_CARDS,
  ...BATCH_05_CARDS,
  ...BATCH_06_CARDS,
  ...BATCH_07_CARDS,
  ...BATCH_08_CARDS,
  ...BATCH_09_CARDS,
  ...BATCH_10_CARDS,
  ...BATCH_11_CARDS,
  ...BATCH_12_CARDS,
  ...BATCH_13_CARDS,
  ...BATCH_14_CARDS,
  ...BATCH_15_CARDS,
  ...BATCH_16_CARDS,
  ...BATCH_17_CARDS,
  ...BATCH_18_CARDS,
  ...BATCH_19_CARDS,
  ...BATCH_20_CARDS,
  ...BATCH_21_CARDS,
  ...BATCH_22_CARDS,
  ...BATCH_23_CARDS,
  ...BATCH_24_CARDS,
  ...BATCH_25_CARDS,
  ...BATCH_26_CARDS,
  ...BATCH_27_CARDS,
  ...BATCH_28_CARDS,
  ...BATCH_29_CARDS,
  ...BATCH_30_CARDS,
  ...BATCH_31_CARDS,
  ...BATCH_32_CARDS,
  ...BATCH_33_CARDS,
  ...BATCH_34_CARDS,
  ...BATCH_35_CARDS,
  ...BATCH_36_CARDS,
  ...BATCH_37_CARDS,
  ...BATCH_38_CARDS,
  ...BATCH_39_CARDS,
  ...BATCH_40_CARDS,
  ...BATCH_41_CARDS,
  ...BATCH_42_CARDS,
  ...BATCH_43_CARDS,
  ...BATCH_44_CARDS,
  ...BATCH_45_CARDS,
  ...BATCH_46_CARDS,
  ...BATCH_47_CARDS,
  ...BATCH_48_CARDS,
  ...BATCH_49_CARDS
];

export const TOTAL_BATCH_CARD_COUNT = BATCH_CARDS.length;
