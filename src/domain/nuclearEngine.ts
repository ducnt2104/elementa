// src/domain/nuclearEngine.ts
// Comprehensive Nuclear Chemistry, Radioactivity & Half-Life Decay Engine
// Conforming to Vietnam GDPT 2018 (Hóa học 10 Chương 1, Vật lý 12 Chương Hạt Nhân) & IUPAC Standards

export type NuclearDecayMode =
  | 'ALPHA'
  | 'BETA_MINUS'
  | 'BETA_PLUS'
  | 'GAMMA'
  | 'ELECTRON_CAPTURE'
  | 'FISSION';

export type RadiationShieldingType =
  | 'PAPER_SKIN'
  | 'ALUMINUM_SHEET'
  | 'LEAD_CONCRETE';

export interface NuclideInfo {
  symbol: string;
  nameVI: string;
  atomicNumberZ: number;
  massNumberA: number;
}

export interface RadioisotopeDef {
  id: string;
  nameVI: string;
  parentNuclide: NuclideInfo;
  decayMode: NuclearDecayMode;
  daughterNuclide: NuclideInfo;
  emittedParticleVI: string;
  halfLifeSeconds: number;
  halfLifeDisplayVI: string;
  decayEquationVI: string;
  decayEnergyMeV: number; // Q-value
  shieldingRequired: RadiationShieldingType;
  biologicalEffectVI: string;
  practicalApplicationVI: string;
  pedagogicalInsightVI: string;
  curriculumGrade: 'HOA_10' | 'HOA_12' | 'VAT_LY_12';
}

// Fundamental physical constants (CODATA 2018 / IUPAC)
export const PROTON_MASS_AMU = 1.007276466621;
export const NEUTRON_MASS_AMU = 1.00866491588;
export const AMU_TO_MEV = 931.502; // 1 amu = 931.502 MeV/c²
export const AVOGADRO_CONSTANT = 6.02214076e23;
export const BECQUEREL_PER_CURIE = 3.7e10; // 1 Ci = 3.7 × 10¹⁰ Bq

export const CURRICULUM_RADIOISOTOPES: Record<string, RadioisotopeDef> = {
  carbon_14: {
    id: 'carbon_14',
    nameVI: 'Cacbon-14 (Định Tuổi Khảo Cổ Học)',
    parentNuclide: {
      symbol: '¹⁴₆C',
      nameVI: 'Cacbon-14',
      atomicNumberZ: 6,
      massNumberA: 14
    },
    decayMode: 'BETA_MINUS',
    daughterNuclide: {
      symbol: '¹⁴₇N',
      nameVI: 'Nitơ-14',
      atomicNumberZ: 7,
      massNumberA: 14
    },
    emittedParticleVI: 'Hạt β⁻ (electron phân rã ⁰₋₁e) + Phản nơtrino electron (ν̄ₑ)',
    halfLifeSeconds: 5730 * 365.25 * 86400, // 5,730 years
    halfLifeDisplayVI: '5,730 năm',
    decayEquationVI: '¹⁴₆C ⎯⎯→ ¹⁴₇N + ⁰₋₁e + ν̄ₑ  (E = 0.156 MeV)',
    decayEnergyMeV: 0.156,
    shieldingRequired: 'ALUMINUM_SHEET',
    biologicalEffectVI: 'Bức xạ beta mềm, ít xuyên thấu cơ thể ngoài da nhưng nguy hiểm nếu hít/nuốt phải bụi cacbon.',
    practicalApplicationVI: 'Phương pháp định tuổi Cacbon-14 (Willard Libby - Nobel Hóa học 1960) xác định niên đại hóa thạch, gỗ cổ, vải liệm Turin, cổ vật lịch sử có nguồn gốc hữu cơ đến 50,000 năm.',
    pedagogicalInsightVI: 'Trong cơ thể sinh vật sống, tỉ lệ ¹⁴C/¹²C không đổi nhờ trao đổi chất liên tục với khí quyển. Khi sinh vật chết đi, quá trình nạp ¹⁴C dừng lại, lượng ¹⁴C suy giảm theo đúng định luật phân rã phóng xạ.',
    curriculumGrade: 'HOA_10'
  },

  uranium_238: {
    id: 'uranium_238',
    nameVI: 'Uranium-238 (Đồng Vị Phóng Xạ Nguyên Thủy)',
    parentNuclide: {
      symbol: '²³⁸₉₂U',
      nameVI: 'Uranium-238',
      atomicNumberZ: 92,
      massNumberA: 238
    },
    decayMode: 'ALPHA',
    daughterNuclide: {
      symbol: '²³⁴₉₀Th',
      nameVI: 'Thori-234',
      atomicNumberZ: 90,
      massNumberA: 234
    },
    emittedParticleVI: 'Hạt α (hạt nhân Heli ⁴₂He²⁺)',
    halfLifeSeconds: 4.468e9 * 365.25 * 86400, // 4.468 billion years
    halfLifeDisplayVI: '4.468 tỷ năm',
    decayEquationVI: '²³⁸₉₂U ⎯⎯→ ²³⁴₉₀Th + ⁴₂He  (E = 4.27 MeV)',
    decayEnergyMeV: 4.27,
    shieldingRequired: 'PAPER_SKIN',
    biologicalEffectVI: 'Bức xạ alpha có ion hóa cực mạnh, bị chặn bởi tờ giấy hoặc lớp da ngoài, nhưng cực kỳ độc hại và gây ung thư nếu tích tụ trong phổi hoặc xương.',
    practicalApplicationVI: 'Định tuổi địa chất khoáng vật đá và xác định tuổi của Trái Đất (~4.54 tỷ năm); nguyên liệu để hấp thụ nơtron tái sinh Plutoni-239 trong lò phản ứng nhiệt hạch mồi (Breeder reactor).',
    pedagogicalInsightVI: 'Uranium-238 là khởi đầu của chuỗi phóng xạ tự nhiên 4n+2 kết thúc ở chì bền ²⁰⁶₈₂Pb qua 8 lần phân rã alpha và 6 lần phân rã beta trừ.',
    curriculumGrade: 'HOA_10'
  },

  uranium_235_fission: {
    id: 'uranium_235_fission',
    nameVI: 'Uranium-235 (Phân Hạch Hạt Nhân Tỏa Năng Lượng)',
    parentNuclide: {
      symbol: '²³⁵₉₂U',
      nameVI: 'Uranium-235',
      atomicNumberZ: 92,
      massNumberA: 235
    },
    decayMode: 'FISSION',
    daughterNuclide: {
      symbol: '¹⁴¹₅₆Ba + ⁹²₃₆Kr',
      nameVI: 'Bari-141 & Krypton-92',
      atomicNumberZ: 92,
      massNumberA: 233
    },
    emittedParticleVI: '3 nơtron nhanh (³₀¹n) + Bức xạ gamma (γ) năng lượng cực lớn',
    halfLifeSeconds: 7.04e8 * 365.25 * 86400, // 704 million years
    halfLifeDisplayVI: '704 triệu năm (Tự phát) / Tức thời khi bắt nơtron',
    decayEquationVI: '²³⁵₉₂U + ¹₀n ⎯⎯→ ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n + 200 MeV',
    decayEnergyMeV: 200.0,
    shieldingRequired: 'LEAD_CONCRETE',
    biologicalEffectVI: 'Bức xạ gamma và nơtron tự do có khả năng đâm xuyên sâu, phá hủy DNA tế bào và gây nhiễm độc phóng xạ cấp tính nếu không có vỏ bọc bê tông nặng/chì.',
    practicalApplicationVI: 'Nhiên liệu hạt nhân chính trong các nhà máy điện nguyên tử thương mại (NPP) và tàu ngầm hạt nhân thế hệ mới.',
    pedagogicalInsightVI: '1 gram Uranium-235 phân hạch giải phóng năng lượng tương đương với việc đốt cháy khoảng 2.5 tấn than đá hoặc 2,000 lít dầu mỏ tiêu chuẩn.',
    curriculumGrade: 'VAT_LY_12'
  },

  iodine_131: {
    id: 'iodine_131',
    nameVI: 'Iot-131 (Xạ Trị Tuyến Giáp Nhắm Đích)',
    parentNuclide: {
      symbol: '¹³¹₅₃I',
      nameVI: 'Iot-131',
      atomicNumberZ: 53,
      massNumberA: 131
    },
    decayMode: 'BETA_MINUS',
    daughterNuclide: {
      symbol: '¹³¹₅₄Xe',
      nameVI: 'Xenon-131',
      atomicNumberZ: 54,
      massNumberA: 131
    },
    emittedParticleVI: 'Hạt β⁻ (electron) + Tia gamma (γ 364 keV)',
    halfLifeSeconds: 8.02 * 86400, // 8.02 days
    halfLifeDisplayVI: '8.02 ngày',
    decayEquationVI: '¹³¹₅₃I ⎯⎯→ ¹³¹₅₄Xe + ⁰₋₁e + γ + ν̄ₑ  (E = 0.971 MeV)',
    decayEnergyMeV: 0.971,
    shieldingRequired: 'LEAD_CONCRETE',
    biologicalEffectVI: 'Tập trung chọn lọc tại mô tuyến giáp; phát tia beta phá hủy tế bào ung thư ác tính khu trú tại chỗ trong bán kính vài milimet.',
    practicalApplicationVI: 'Điều trị ung thư tuyến giáp biệt hóa, bướu cổ cường giáp Basedow; đồng vị giám sát phát thải sau các sự cố hạt nhân môi trường.',
    pedagogicalInsightVI: 'Tuyến giáp không phân biệt được iod phóng xạ ¹³¹I và iod bền ¹²⁷I, do đó nuốt viên iod phóng xạ là ví dụ kinh điển về liệu pháp xạ trị phóng xạ nhắm trúng đích.',
    curriculumGrade: 'HOA_12'
  },

  technetium_99m: {
    id: 'technetium_99m',
    nameVI: 'Tecneti-99m (Ngôi Sao Chẩn Đoán SPECT Y Học)',
    parentNuclide: {
      symbol: '⁹⁹ᵐ₄₃Tc',
      nameVI: 'Tecneti-99m (Đồng phân hạt nhân)',
      atomicNumberZ: 43,
      massNumberA: 99
    },
    decayMode: 'GAMMA',
    daughterNuclide: {
      symbol: '⁹⁹₄₃Tc',
      nameVI: 'Tecneti-99 (Trạng thái cơ bản)',
      atomicNumberZ: 43,
      massNumberA: 99
    },
    emittedParticleVI: 'Tia gamma đơn sắc γ (E = 140.5 keV)',
    halfLifeSeconds: 6.01 * 3600, // 6.01 hours
    halfLifeDisplayVI: '6.01 giờ',
    decayEquationVI: '⁹⁹ᵐ₄₃Tc ⎯⎯→ ⁹⁹₄₃Tc + γ (140.5 keV)',
    decayEnergyMeV: 0.141,
    shieldingRequired: 'LEAD_CONCRETE',
    biologicalEffectVI: 'Phát tia gamma năng lượng vừa phải, không phát hạt mang điện (không có alpha hay beta), hạn chế tối đa liều chiếu hấp thụ vào cơ thể bệnh nhân.',
    practicalApplicationVI: 'Chiếm hơn 80% mọi quy trình xạ hình y học hạt nhân toàn cầu (chụp cắt lớp SPECT đánh giá tưới máu cơ tim, xạ hình xương, não, thận).',
    pedagogicalInsightVI: 'Ký tự "m" là metastable (trạng thái siêu bền kích thích). Chu kỳ bán rã 6 giờ lý tưởng: vừa đủ thời gian ghi hình chẩn đoán, vừa phân rã sạch trong 24 giờ.',
    curriculumGrade: 'HOA_10'
  },

  fluorine_18: {
    id: 'fluorine_18',
    nameVI: 'Flo-18 (Chụp Cắt Lớp Positron PET-CT)',
    parentNuclide: {
      symbol: '¹⁸₉F',
      nameVI: 'Flo-18',
      atomicNumberZ: 9,
      massNumberA: 18
    },
    decayMode: 'BETA_PLUS',
    daughterNuclide: {
      symbol: '¹⁸₈O',
      nameVI: 'Oxi-18',
      atomicNumberZ: 8,
      massNumberA: 18
    },
    emittedParticleVI: 'Hạt β⁺ (positron/phản electron ⁰₊₁e) + Nơtrino electron (νₑ)',
    halfLifeSeconds: 109.7 * 60, // 109.7 minutes
    halfLifeDisplayVI: '109.7 phút',
    decayEquationVI: '¹⁸₉F ⎯⎯→ ¹⁸₈O + ⁰₊₁e + νₑ  (Positron hủy hạt: e⁺ + e⁻ ⎯→ 2γ 511 keV)',
    decayEnergyMeV: 0.633,
    shieldingRequired: 'LEAD_CONCRETE',
    biologicalEffectVI: 'Positron phát ra đi được ~1 mm trong mô rồi gặp electron tự do để hủy hạt (annihilation), sinh ra 2 tia gamma 511 keV bay ngược chiều 180°.',
    practicalApplicationVI: 'Gắn vào phân tử đường glucose tạo thành dược chất ¹⁸F-FDG dùng trong máy quét PET-CT chẩn đoán sớm khối u ác tính đang tiêu thụ nhiều đường.',
    pedagogicalInsightVI: 'PET (Positron Emission Tomography) là ứng dụng y khoa trực tiếp của phản vật chất (antimatter - positron).',
    curriculumGrade: 'HOA_12'
  },

  cobalt_60: {
    id: 'cobalt_60',
    nameVI: 'Coban-60 (Dao Mổ Xạ Phẫu Gamma Knife)',
    parentNuclide: {
      symbol: '⁶⁰₂₇Co',
      nameVI: 'Coban-60',
      atomicNumberZ: 27,
      massNumberA: 60
    },
    decayMode: 'BETA_MINUS',
    daughterNuclide: {
      symbol: '⁶⁰₂₈Ni',
      nameVI: 'Niken-60',
      atomicNumberZ: 28,
      massNumberA: 60
    },
    emittedParticleVI: 'Hạt β⁻ + 2 tia gamma năng lượng cao (1.17 MeV & 1.33 MeV)',
    halfLifeSeconds: 5.271 * 365.25 * 86400, // 5.271 years
    halfLifeDisplayVI: '5.27 năm',
    decayEquationVI: '⁶⁰₂₇Co ⎯⎯→ ⁶⁰₂₈Ni + ⁰₋₁e + 2γ (1.17 & 1.33 MeV)',
    decayEnergyMeV: 2.82,
    shieldingRequired: 'LEAD_CONCRETE',
    biologicalEffectVI: 'Tia gamma cứng xuyên thấu cực mạnh, tiêu diệt tế bào sống, phá hủy vi khuẩn, nấm mốc và ADN sâu trong mô.',
    practicalApplicationVI: 'Nguồn phóng xạ chuẩn trong hệ thống dao Gamma phẫu thuật não không xâm lấn; máy chiếu xạ khử trùng dụng cụ y tế và chiếu xạ thanh trùng nông sản xuất khẩu.',
    pedagogicalInsightVI: 'Coban-60 không có trong tự nhiên mà được kích hoạt nhân tạo bằng cách bắn phá nơtron vào tấm coban-59 bền trong lò phản ứng hạt nhân.',
    curriculumGrade: 'HOA_10'
  },

  radium_226: {
    id: 'radium_226',
    nameVI: 'Radi-226 (Di Sản Nobel Của Marie Curie)',
    parentNuclide: {
      symbol: '²²⁶₈₈Ra',
      nameVI: 'Radi-226',
      atomicNumberZ: 88,
      massNumberA: 226
    },
    decayMode: 'ALPHA',
    daughterNuclide: {
      symbol: '²²²₈₆Rn',
      nameVI: 'Radon-222 (Khí phóng xạ trơ)',
      atomicNumberZ: 86,
      massNumberA: 222
    },
    emittedParticleVI: 'Hạt α (⁴₂He) + Tia gamma yếu',
    halfLifeSeconds: 1600 * 365.25 * 86400, // 1600 years
    halfLifeDisplayVI: '1,600 năm',
    decayEquationVI: '²²⁶₈₈Ra ⎯⎯→ ²²²₈₆Rn + ⁴₂He + γ  (E = 4.87 MeV)',
    decayEnergyMeV: 4.87,
    shieldingRequired: 'PAPER_SKIN',
    biologicalEffectVI: 'Đồng vị hóa học tương tự Canxi, tích tụ sâu trong xương tủy gây thoái hóa xương và ung thư máu nếu cơ thể hấp thụ.',
    practicalApplicationVI: 'Được Pierre & Marie Curie tách chiết từ quặng uraninit (pechblend) năm 1898; từng dùng làm sơn dạ quang và mở ra kỷ nguyên nghiên cứu vật lý hạt nhân.',
    pedagogicalInsightVI: 'Sản phẩm phân rã của Radi-226 là khí Radon-222, một khí hiếm phóng xạ có thể rò rỉ qua vết nứt móng nhà và tích tụ trong các tầng hầm kín gió.',
    curriculumGrade: 'HOA_10'
  },

  tritium_3h: {
    id: 'tritium_3h',
    nameVI: 'Triti (Hydro-3 - Nhiên Liệu Nhiệt Hạch)',
    parentNuclide: {
      symbol: '³₁H',
      nameVI: 'Triti (Hydro-3)',
      atomicNumberZ: 1,
      massNumberA: 3
    },
    decayMode: 'BETA_MINUS',
    daughterNuclide: {
      symbol: '³₂He',
      nameVI: 'Heli-3',
      atomicNumberZ: 2,
      massNumberA: 3
    },
    emittedParticleVI: 'Hạt β⁻ siêu mềm (E_max = 18.6 keV)',
    halfLifeSeconds: 12.32 * 365.25 * 86400, // 12.32 years
    halfLifeDisplayVI: '12.32 năm',
    decayEquationVI: '³₁H ⎯⎯→ ³₂He + ⁰₋₁e + ν̄ₑ  (E = 0.0186 MeV)',
    decayEnergyMeV: 0.0186,
    shieldingRequired: 'PAPER_SKIN',
    biologicalEffectVI: 'Tia beta có năng lượng cực thấp (không xuyên qua nổi lớp tế bào chết bên ngoài da người); an toàn khi chứa kín trong ống thủy tinh dạ quang.',
    practicalApplicationVI: 'Nhiên liệu phối hợp cùng Đơteri (D-T) trong phản ứng nhiệt hạch tổng hợp hạt nhân tạo năng lượng sạch tương lai (dự án lò Tokamak ITER quốc tế); đèn thoát hiểm tự phát sáng trong máy bay.',
    pedagogicalInsightVI: 'Hạt nhân triti gồm 1 proton và 2 nơtron. Do tỷ lệ n/p = 2 quá cao đối với hạt nhân nhẹ (vùng bền n/p ≈ 1), triti tự phát biến đổi nơtron thành proton để tạo Heli-3.',
    curriculumGrade: 'HOA_10'
  },

  potassium_40: {
    id: 'potassium_40',
    nameVI: 'Kali-40 (Nguồn Phóng Xạ Nội Sinh Cơ Thể Người)',
    parentNuclide: {
      symbol: '⁴⁰₁₉K',
      nameVI: 'Kali-40',
      atomicNumberZ: 19,
      massNumberA: 40
    },
    decayMode: 'BETA_MINUS',
    daughterNuclide: {
      symbol: '⁴⁰₂₀Ca',
      nameVI: 'Canxi-40',
      atomicNumberZ: 20,
      massNumberA: 40
    },
    emittedParticleVI: 'Hạt β⁻ (89.3%) hoặc Bắt electron tạo ⁴⁰₁₈Ar (10.7%)',
    halfLifeSeconds: 1.248e9 * 365.25 * 86400, // 1.248 billion years
    halfLifeDisplayVI: '1.248 tỷ năm',
    decayEquationVI: '⁴⁰₁₉K ⎯⎯→ ⁴⁰₂₀Ca + ⁰₋₁e + ν̄ₑ (89.3%)  /  ⁴⁰₁₉K + ⁰₋₁e ⎯→ ⁴⁰₁₈Ar + νₑ (10.7%)',
    decayEnergyMeV: 1.31,
    shieldingRequired: 'ALUMINUM_SHEET',
    biologicalEffectVI: 'Đóng góp khoảng 0.39 mSv/năm liều bức xạ tự nhiên bên trong cơ thể con người từ thực phẩm giàu kali (chuối, khoai tây, các loại đậu).',
    practicalApplicationVI: 'Phương pháp định tuổi Kali - Agon (K-Ar) trong địa chất học xác định niên đại của đá magma và tro núi lửa từ vài triệu đến hàng tỷ năm tuổi.',
    pedagogicalInsightVI: 'Mỗi giây trong cơ thể một người trưởng thành nặng 70 kg có khoảng 4,400 nguyên tử Kali-40 tự phát phân rã phóng xạ hoàn toàn tự nhiên vô hại.',
    curriculumGrade: 'HOA_10'
  }
};

/**
 * 1. Calculate remaining fraction of radioisotope after elapsed time t
 * N(t) / N0 = (1/2)^(t / t_half)
 */
export function calculateRemainingFraction(
  elapsedTime: number,
  halfLife: number
): number {
  if (halfLife <= 0 || elapsedTime < 0) return 1.0;
  return Math.pow(0.5, elapsedTime / halfLife);
}

/**
 * 2. Calculate remaining mass of radioisotope
 * m(t) = m0 * (1/2)^(t / t_half)
 */
export function calculateRemainingMass(
  initialMassGrams: number,
  elapsedTime: number,
  halfLife: number
): number {
  if (initialMassGrams <= 0) return 0;
  const fraction = calculateRemainingFraction(elapsedTime, halfLife);
  return Math.round(initialMassGrams * fraction * 1e6) / 1e6;
}

/**
 * 3. Calculate radioactive decay constant lambda (λ = ln(2) / t_half)
 */
export function calculateDecayConstant(halfLifeSeconds: number): number {
  if (halfLifeSeconds <= 0) return 0;
  return Math.LN2 / halfLifeSeconds;
}

/**
 * 4. Calculate radioactivity in Becquerel (Bq = decays / second)
 * Activity A = λ * N = (ln(2) / t_half) * (mass / molarMass * N_A)
 */
export function calculateActivityBecquerel(
  massGrams: number,
  molarMassAmu: number,
  halfLifeSeconds: number
): number {
  if (massGrams <= 0 || molarMassAmu <= 0 || halfLifeSeconds <= 0) return 0;
  const numAtoms = (massGrams / molarMassAmu) * AVOGADRO_CONSTANT;
  const lambda = calculateDecayConstant(halfLifeSeconds);
  const activityBq = lambda * numAtoms;
  return activityBq;
}

/**
 * 5. Convert Becquerel to Curie (1 Ci = 3.7 × 10¹⁰ Bq)
 */
export function convertBqToCurie(activityBq: number): number {
  if (activityBq <= 0) return 0;
  return activityBq / BECQUEREL_PER_CURIE;
}

/**
 * 6. Radiocarbon Archaeological Dating Calculator
 * t = - (t_half / ln(2)) * ln(currentActivityRatio)
 * where t_half = 5730 years for Carbon-14
 */
export function calculateCarbon14AgeYears(
  remainingPercentageOfLivingBioActivity: number
): {
  estimatedAgeYears: number;
  uncertaintyYears: number;
  remainingFraction: number;
  pedagogicalInterpretationVI: string;
} {
  const c14HalfLife = 5730;
  if (remainingPercentageOfLivingBioActivity <= 0 || remainingPercentageOfLivingBioActivity > 100) {
    return {
      estimatedAgeYears: 0,
      uncertaintyYears: 0,
      remainingFraction: 0,
      pedagogicalInterpretationVI: 'Phần trăm hoạt độ phóng xạ phải nằm trong khoảng (0%, 100%].'
    };
  }

  const fraction = remainingPercentageOfLivingBioActivity / 100;
  // t = - 5730 * ln(fraction) / ln(2)
  const age = -c14HalfLife * (Math.log(fraction) / Math.LN2);
  const roundedAge = Math.round(age) === 0 ? 0 : Math.round(age);
  const uncertainty = Math.round(Math.max(30, roundedAge * 0.015)); // typical ±1.5% analytical margin

  let interpretation = '';
  if (roundedAge < 100) {
    interpretation = 'Cổ vật thời kỳ cận hiện đại (thế kỷ 20-21).';
  } else if (roundedAge < 2000) {
    interpretation = 'Cổ vật thời kỳ Trung đại hoặc phong kiến lịch sử.';
  } else if (roundedAge < 10000) {
    interpretation = 'Di chỉ văn hóa thời kỳ Đồ Đá Mới / sơ kỳ kim khí.';
  } else if (roundedAge <= 50000) {
    interpretation = 'Mẫu vật thời kỳ Đồ Đá Cũ (Paleolithic).';
  } else {
    interpretation = 'Vượt quá giới hạn đo chính xác của phương pháp Cacbon-14 (>50,000 năm).';
  }

  return {
    estimatedAgeYears: roundedAge,
    uncertaintyYears: uncertainty,
    remainingFraction: Math.round(fraction * 10000) / 10000,
    pedagogicalInterpretationVI: interpretation
  };
}

/**
 * 7. Mass defect Δm = [Z * m_p + (A - Z) * m_n] - M_actual (amu)
 */
export function calculateMassDefectAmu(
  protonsZ: number,
  massNumberA: number,
  actualNuclearMassAmu: number
): number {
  if (protonsZ < 0 || massNumberA <= 0 || actualNuclearMassAmu <= 0) return 0;
  const neutronsN = massNumberA - protonsZ;
  if (neutronsN < 0) return 0;
  const totalConstituentMass = protonsZ * PROTON_MASS_AMU + neutronsN * NEUTRON_MASS_AMU;
  const deltaM = totalConstituentMass - actualNuclearMassAmu;
  return Math.round(deltaM * 1e6) / 1e6;
}

/**
 * 8. Nuclear Binding Energy E_b = Δm * 931.5 MeV
 */
export function calculateBindingEnergyMeV(massDefectAmu: number): number {
  if (massDefectAmu <= 0) return 0;
  return Math.round(massDefectAmu * AMU_TO_MEV * 100) / 100;
}

/**
 * 9. Binding energy per nucleon E_b / A
 */
export function calculateBindingEnergyPerNucleon(
  massDefectAmu: number,
  massNumberA: number
): number {
  if (massDefectAmu <= 0 || massNumberA <= 0) return 0;
  const eb = massDefectAmu * AMU_TO_MEV;
  return Math.round((eb / massNumberA) * 1000) / 1000;
}
