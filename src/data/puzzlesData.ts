// src/data/puzzlesData.ts
// Chemical Environment Tactical Puzzle Challenges (GDPT 2018 & IUPAC Compliant)

export interface ChemicalPuzzleOption {
  id: string;
  label: string;
  reagentFormula: string;
  conditionChoice?: string;
  isCorrect: boolean;
  scientificOutcomeVI: string;
}

export interface ChemicalPuzzle {
  id: string;
  title: string;
  difficulty: 'CƠ BẢN' | 'TRUNG CẤP' | 'NÂNG CAO';
  environmentContext: {
    initialPh: number;
    initialTemp: number; // Celsius
    initialPressure: number; // atm
    scenarioVI: string;
  };
  goalVI: string;
  options: ChemicalPuzzleOption[];
  explanationVI: string;
  iupacCurriculumStandard: string;
  reward: {
    knowledgeTokens: number;
    elementalShards: number;
  };
}

export const PUZZLES: ChemicalPuzzle[] = [
  {
    id: 'puzzle_1_acid_lake',
    title: 'Câu Đố 1: Trung Hòa Hồ Nước Nhiễm Mưa Axit',
    difficulty: 'CƠ BẢN',
    environmentContext: {
      initialPh: 2.8,
      initialTemp: 22,
      initialPressure: 1.0,
      scenarioVI: 'Một hồ nước sinh thái bị ảnh hưởng nặng nề bởi mưa axit (chứa axit H₂SO₄ loãng và HNO₃), đẩy độ pH giảm sâu xuống 2.8, đe dọa toàn bộ động thực vật thủy sinh.'
    },
    goalVI: 'Đưa pH của hồ nước về vùng an toàn sinh thái (pH 6.5 - 7.5) một cách ôn hòa, tiết kiệm và không gây nổ hay độc hại.',
    options: [
      {
        id: 'opt_1a',
        label: 'Rắc bột đá vôi mịn CaCO₃ (Canxi cacbonat)',
        reagentFormula: 'CaCO₃',
        isCorrect: true,
        scientificOutcomeVI: 'CaCO₃ ít tan, phản ứng chậm với axit: CaCO₃ + 2H⁺ → Ca²⁺ + CO₂↑ + H₂O. pH nâng dần đều lên mức 6.8 - 7.2 mà không gây sốc pH dư bazơ!'
      },
      {
        id: 'opt_1b',
        label: 'Thả mẩu kim loại Natri Na(s) nguyên chất xuống hồ',
        reagentFormula: 'Na',
        isCorrect: false,
        scientificOutcomeVI: 'Natri phản ứng mãnh liệt với nước sinh nhiệt cực lớn làm nổ khí H₂, đồng thời tạo xút NaOH cực mạnh đẩy pH vọt lên 13.5 gây chết hàng loạt sinh vật!'
      },
      {
        id: 'opt_1c',
        label: 'Sục khí CO₂ áp suất cao xuống hồ',
        reagentFormula: 'CO₂',
        isCorrect: false,
        scientificOutcomeVI: 'Khí CO₂ tan trong nước tạo axit cacbonic H₂CO₃ càng làm nước thêm tính axit (pH tiếp tục giảm), không giải quyết được vấn đề!'
      }
    ],
    explanationVI: 'Trong thực tiễn môi trường, bột đá vôi CaCO₃ là hóa chất tối ưu nhất để xử lý hồ bị chua vì tính đệm tự nhiên: khi hết axit dư, CaCO₃ không tan thêm nữa, giúp pH tự động giữ ở ngưỡng 7.0 an toàn.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 11: Sự điện li, pH của dung dịch và ứng dụng thực tiễn của muối cacbonat.',
    reward: {
      knowledgeTokens: 100,
      elementalShards: 50
    }
  },
  {
    id: 'puzzle_2_haber_yield',
    title: 'Câu Đố 2: Tối Ưu Hóa Áp Suất Tháp Haber-Bosch',
    difficulty: 'TRUNG CẤP',
    environmentContext: {
      initialPh: 7.0,
      initialTemp: 450,
      initialPressure: 1.0,
      scenarioVI: 'Phản ứng tổng hợp: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH° = -92.2 kJ/mol). Ở áp suất thường 1 atm, hiệu suất chỉ đạt dưới 2% do cân bằng dịch chuyển bất lợi.'
    },
    goalVI: 'Chọn điều kiện áp suất và xúc tác tối ưu để đẩy hiệu suất tổng hợp lên trên 40% theo nguyên lý Le Chatelier.',
    options: [
      {
        id: 'opt_2a',
        label: 'Tăng áp suất lên 200 atm + sử dụng xúc tác Sắt [Fe] hoạt hóa',
        reagentFormula: 'P = 200 atm + Fe',
        isCorrect: true,
        scientificOutcomeVI: 'Tăng áp suất làm giảm từ 4 mol khí xuống 2 mol khí, dịch chuyển cân bằng thuận; xúc tác Fe hạ thấp Ea giúp phản ứng nhanh đạt cân bằng!'
      },
      {
        id: 'opt_2b',
        label: 'Hạ áp suất xuống 0.2 atm để các phân tử khí tự do hơn',
        reagentFormula: 'P = 0.2 atm',
        isCorrect: false,
        scientificOutcomeVI: 'Hạ áp suất khiến cân bằng chuyển dịch theo chiều làm tăng số mol khí (nghịch), phân hủy amoniac về N₂ và H₂, hiệu suất rơi về 0%!'
      },
      {
        id: 'opt_2c',
        label: 'Tăng nhiệt độ lên 1500°C ở 1 atm',
        reagentFormula: 'T = 1500°C',
        isCorrect: false,
        scientificOutcomeVI: 'Vì phản ứng tỏa nhiệt (ΔH < 0), tăng nhiệt độ quá cao khiến cân bằng dịch chuyển nghịch theo Van \'t Hoff, đồng thời phá hủy phân tử NH₃!'
      }
    ],
    explanationVI: 'Nguyên lý Le Chatelier: "Khi một hệ đang ở trạng thái cân bằng bị thay đổi một trong các thông số (nhiệt độ, áp suất, nồng độ), cân bằng sẽ chuyển dịch theo chiều chống lại sự thay đổi đó". Chiều thuận làm giảm 4 mol khí thành 2 mol khí, do đó tăng áp suất cực mạnh đẩy cân bằng sang phải.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 10 & 11: Cân bằng hóa học, nguyên lý Le Chatelier và ứng dụng công nghiệp phân bón.',
    reward: {
      knowledgeTokens: 150,
      elementalShards: 75
    }
  },
  {
    id: 'puzzle_3_thermite_barrier',
    title: 'Câu Đố 3: Công Phá Hàng Rào Kim Loại Bằng Phản Ứng Tỏa Nhiệt',
    difficulty: 'TRUNG CẤP',
    environmentContext: {
      initialPh: 7.0,
      initialTemp: 15,
      initialPressure: 1.0,
      scenarioVI: 'Cần cắt đứt một thanh dầm đường ray thép hợp kim đặc dày trong tình huống cứu hộ khẩn cấp mà không có nguồn điện lưới cắm máy hàn.'
    },
    goalVI: 'Khởi động phản ứng luyện kim tại chỗ giải phóng nhiệt năng cục bộ trên 2500°C để nung chảy tức thì thanh thép.',
    options: [
      {
        id: 'opt_3a',
        label: 'Hỗn hợp Nhiệt Nhôm (Thermite): Bột Al + Bột quặng Fe₂O₃ mồi dây Magie',
        reagentFormula: '2Al + Fe₂O₃',
        isCorrect: true,
        scientificOutcomeVI: 'Phản ứng tỏa ra nhiệt lượng khổng lồ ΔH = -851.5 kJ/mol, nhiệt độ vọt lên gần 3000°C làm sắt nóng chảy lỏng rót xuyên qua thanh thép dầm!'
      },
      {
        id: 'opt_3b',
        label: 'Đổ dung dịch axit loãng HCl 0.1M lên bề mặt thanh dầm',
        reagentFormula: 'HCl (aq)',
        isCorrect: false,
        scientificOutcomeVI: 'Phản ứng ăn mòn sắt xảy ra rất chậm chạp, chỉ tạo bọt khí H₂ li ti mất hàng tuần mới phá hủy được lớp kim loại dày!'
      },
      {
        id: 'opt_3c',
        label: 'Rắc muối ăn NaCl khô lên vết nứt',
        reagentFormula: 'NaCl (s)',
        isCorrect: false,
        scientificOutcomeVI: 'Muối ăn rắn không có khả năng sinh nhiệt hay phản ứng cắt đứt kim loại!'
      }
    ],
    explanationVI: 'Phản ứng nhiệt nhôm 2Al + Fe₂O₃ → Al₂O₃ + 2Fe giải phóng lượng nhiệt khủng khiếp đủ để biến sản phẩm sắt thành thể lỏng (nóng chảy ở 1538°C), là nguyên lý then chốt của hàn đường ray tại chỗ trong công nghiệp hỏa xa.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 12: Đại cương về kim loại, tính chất của nhôm và phương pháp nhiệt luyện kim.',
    reward: {
      knowledgeTokens: 150,
      elementalShards: 75
    }
  },
  {
    id: 'puzzle_4_buffer_capacity',
    title: 'Câu Đố 4: Cơ Chế Đệm Ổn Định pH Trong Máu Người',
    difficulty: 'NÂNG CAO',
    environmentContext: {
      initialPh: 7.4,
      initialTemp: 37,
      initialPressure: 1.0,
      scenarioVI: 'Trong khi vận động viên chạy nước rút, cơ bắp tích tụ lượng lớn Axit Lactic (H⁺). Máu cần phải duy trì ổn định trong khoảng cực kỳ ngặt nghèo pH 7.35 - 7.45 để cơ thể không bị nhiễm toan nguy kịch.'
    },
    goalVI: 'Kích hoạt thành phần đệm sinh lý hấp thụ ion H⁺ dư thừa hiệu quả nhất.',
    options: [
      {
        id: 'opt_4a',
        label: 'Ion Bicarbonate HCO₃⁻ liên kết ion H⁺ tạo H₂CO₃ rồi phân ly thành CO₂ thở ra ngoài',
        reagentFormula: 'HCO₃⁻ + H⁺ ⇌ H₂CO₃ ⇌ CO₂↑ + H₂O',
        isCorrect: true,
        scientificOutcomeVI: 'Hệ đệm bicarbonate hấp phụ toàn bộ H⁺ thừa; phổi tăng tần số thở đẩy CO₂ ra ngoài, giữ cho pH máu nằm yên tại mức 7.40 hoàn hảo!'
      },
      {
        id: 'opt_4b',
        label: 'Bơm trực tiếp dung dịch kiềm mạnh KOH vào lòng mạch',
        reagentFormula: 'KOH (aq)',
        isCorrect: false,
        scientificOutcomeVI: 'Kiềm mạnh làm biến tính protein màng tế bào và gây tan máu cục bộ nguy hiểm đến tính mạng!'
      },
      {
        id: 'opt_4c',
        label: 'Uống dung dịch giấm ăn CH₃COOH nồng độ cao',
        reagentFormula: 'CH₃COOH',
        isCorrect: false,
        scientificOutcomeVI: 'Bổ sung thêm axit hữu cơ làm tăng tải lượng H⁺, đẩy cơ thể vào trạng thái toan chuyển hóa trầm trọng hơn!'
      }
    ],
    explanationVI: 'Phương trình Henderson-Hasselbalch mô tả hệ đệm máu: pH = pKa + log([HCO₃⁻]/[H₂CO₃]). Khí CO₂ do hệ đệm sinh ra được đào thải tức thì qua phế nang phổi, tạo thành một hệ đệm mở độc đáo bậc nhất của cơ thể sống.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học & Sinh Học 11: Cân bằng acid-base và cơ chế điều hòa hằng định nội môi.',
    reward: {
      knowledgeTokens: 200,
      elementalShards: 100
    }
  },
  {
    id: 'puzzle_5_selective_redox',
    title: 'Câu Đố 5: Tách Đồng Ra Khỏi Dung Dịch Tạp Chất',
    difficulty: 'NÂNG CAO',
    environmentContext: {
      initialPh: 5.5,
      initialTemp: 25,
      initialPressure: 1.0,
      scenarioVI: 'Một dung dịch nước thải công nghiệp chứa đồng thời ion Cu²⁺ (cần thu hồi làm kim loại quý) và ion Zn²⁺ (không muốn kết tủa lẫn).'
    },
    goalVI: 'Chọn chất có thế khử chuẩn phù hợp để đẩy chọn lọc hoàn toàn Cu²⁺ thành kim loại mà không làm ảnh hưởng đến Zn²⁺.',
    options: [
      {
        id: 'opt_5a',
        label: 'Cho mẩu kim loại Sắt Fe(s) vào dung dịch',
        reagentFormula: 'Fe(s)',
        isCorrect: true,
        scientificOutcomeVI: 'Thế điện cực E°: Zn²⁺/Zn (-0.76V) < Fe²⁺/Fe (-0.44V) < Cu²⁺/Cu (+0.34V). Sắt khử được Cu²⁺ thành Cu đỏ bám ngoài thanh sắt, nhưng không thể khử Zn²⁺!'
      },
      {
        id: 'opt_5b',
        label: 'Cho thanh Vàng Au(s) vào dung dịch',
        reagentFormula: 'Au(s)',
        isCorrect: false,
        scientificOutcomeVI: 'Vàng là kim loại rất trơ (E° Au³⁺/Au = +1.50V), không thể khử ion Cu²⁺!'
      },
      {
        id: 'opt_5c',
        label: 'Sục khí clo Cl₂(g) vào dung dịch',
        reagentFormula: 'Cl₂',
        isCorrect: false,
        scientificOutcomeVI: 'Khí clo là chất oxi hóa mạnh, không có khả năng khử cation kim loại thành dạng đơn chất!'
      }
    ],
    explanationVI: 'Quy tắc alpha (α) và dãy điện hóa IUPAC: Chất oxi hóa của cặp có thế điện cực lớn hơn sẽ tác dụng với chất khử của cặp có thế điện cực nhỏ hơn. Vì E° Fe²⁺/Fe (-0.44V) nằm giữa Zn²⁺/Zn (-0.76V) và Cu²⁺/Cu (+0.34V), Fe đẩy được Cu nhưng không phản ứng với Zn²⁺.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 12: Dãy điện hóa kim loại, pin điện hóa và ăn mòn điện hóa học.',
    reward: {
      knowledgeTokens: 200,
      elementalShards: 100
    }
  },
  {
    id: 'puzzle_6_esterification_yield',
    title: 'Câu Đố 6: Tối Ưu Cân Bằng Phản Ứng Este Hóa Fischer',
    difficulty: 'TRUNG CẤP',
    environmentContext: {
      initialPh: 3.0,
      initialTemp: 80,
      initialPressure: 1.0,
      scenarioVI: 'Trong phòng thí nghiệm, phản ứng điều chế este mùi chuối chín Isoamyl axetat: CH₃COOH + (CH₃)₂CH-CH₂-CH₂OH ⇌ CH₃COOCH₂-CH₂-CH(CH₃)₂ + H₂O (phản ứng thuận nghịch, xúc tác axit). Ở điều kiện thông thường, cân bằng este hóa dừng lại ở hiệu suất ~66% do nước sinh ra liên tục thủy phân trở lại este.'
    },
    goalVI: 'Đẩy chuyển dịch cân bằng theo chiều thuận để đạt hiệu suất trên 92% mà không làm phá hủy các phân tử chất hữu cơ.',
    options: [
      {
        id: 'opt_6a',
        label: 'Dùng H₂SO₄ đặc làm xúc tác đồng thời hút nước + đun hồi lưu cách thủy',
        reagentFormula: 'H₂SO₄ đặc + đun cách thủy',
        isCorrect: true,
        scientificOutcomeVI: 'H₂SO₄ đặc vừa là xúc tác axit cung cấp proton H⁺, vừa có tính háo nước cực mạnh liên tục loại bỏ H₂O khỏi hệ phản ứng, ép cân bằng dịch chuyển mạnh theo chiều thuận nâng hiệu suất lên trên 95%!'
      },
      {
        id: 'opt_6b',
        label: 'Thêm dung dịch kiềm mạnh NaOH đặc làm xúc tác thay thế',
        reagentFormula: 'NaOH (đặc)',
        isCorrect: false,
        scientificOutcomeVI: 'Kiềm mạnh trung hòa mất axit axetic, đồng thời xà phòng hóa phân hủy tức thì este vừa hình thành về muối axetat và ancol, làm thất bại hoàn toàn quá trình tổng hợp!'
      },
      {
        id: 'opt_6c',
        label: 'Đổ thêm nhiều nước cất H₂O vào bình phản ứng để làm mát',
        reagentFormula: 'H₂O (dư)',
        isCorrect: false,
        scientificOutcomeVI: 'Theo nguyên lý Le Chatelier, tăng nồng độ sản phẩm H₂O sẽ làm cân bằng chuyển dịch theo chiều nghịch, este bị thủy phân mạnh mẽ làm hiệu suất tụt dốc thảm hại!'
      }
    ],
    explanationVI: 'Phản ứng este hóa Fischer là cân bằng thuận nghịch có hằng số cân bằng Kc ≈ 4. Để nâng cao hiệu suất phản ứng este hóa theo nguyên lý Le Chatelier: (1) Dùng dư một trong hai chất phản ứng ban đầu (axit hoặc ancol); (2) Tách nước ra khỏi hệ bằng chất hút nước như H₂SO₄ đặc hoặc thiết bị bẫy nước Dean-Stark.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 12 (GDPT 2018): Este - Lipit, cơ chế este hóa Fischer và nguyên lý chuyển dịch cân bằng hóa học.',
    reward: {
      knowledgeTokens: 175,
      elementalShards: 85
    }
  },
  {
    id: 'puzzle_7_cathodic_protection',
    title: 'Câu Đố 7: Bảo Vệ Vỏ Tàu Biển Khỏi Ăn Mòn Bằng Phương Pháp Điện Hóa',
    difficulty: 'NÂNG CAO',
    environmentContext: {
      initialPh: 8.1,
      initialTemp: 20,
      initialPressure: 1.0,
      scenarioVI: 'Vỏ tàu viễn dương chế tạo bằng thép hợp kim (thành phần chủ đạo là Sắt Fe chứa tạp chất Cacbon C) hoạt động liên tục trong môi trường nước biển giàu ion dẫn điện Cl⁻, Na⁺, Mg²⁺ và oxy hòa tan O₂, tạo thành vô số pin điện hóa ăn mòn phá hủy kim loại nghiêm trọng.'
    },
    goalVI: 'Áp dụng phương pháp bảo vệ điện hóa catot (vật hi sinh) để giữ nguyên vẹn vỏ tàu thép mà không cần dùng nguồn điện ngoài.',
    options: [
      {
        id: 'opt_7a',
        label: 'Hàn các khối kim loại Kẽm (Zn) hoặc Magie (Mg) áp sát vào mạn ngoài vỏ tàu ngập trong nước biển',
        reagentFormula: 'Khối Zn/Mg (Vật hi sinh)',
        isCorrect: true,
        scientificOutcomeVI: 'Thế điện cực: E°(Zn²⁺/Zn) = -0.76V < E°(Fe²⁺/Fe) = -0.44V. Kẽm có tính khử mạnh hơn sắt nên đóng vai trò là Anot bị oxi hóa mòn dần hi sinh (Zn → Zn²⁺ + 2e), trong khi vỏ thép Fe nhận electron trở thành Catot được bảo vệ tuyệt đối không bị han gỉ!'
      },
      {
        id: 'opt_7b',
        label: 'Hàn các tấm kim loại Đồng (Cu) nguyên chất áp sát vào vỏ tàu',
        reagentFormula: 'Tấm Cu',
        isCorrect: false,
        scientificOutcomeVI: 'Đồng Cu có thế điện cực dương hơn Sắt (E° Cu²⁺/Cu = +0.34V > -0.44V). Khi tiếp xúc Cu-Fe trong nước biển, Sắt trở thành Anot bị oxy hóa phá hủy cực kỳ dữ dội gấp hàng chục lần so với thông thường!'
      },
      {
        id: 'opt_7c',
        label: 'Phun axit photphoric H₃PO₄ đặc đều đặn xuống nước biển quanh thân tàu',
        reagentFormula: 'H₃PO₄',
        isCorrect: false,
        scientificOutcomeVI: 'Axit hóa môi trường nước biển xung quanh sẽ hòa tan vỏ thép với tốc độ thảm họa, giải phóng khí H₂ và hủy hoại toàn bộ sinh thái biển!'
      }
    ],
    explanationVI: 'Phương pháp bảo vệ catot bằng kim loại hi sinh (Sacrificial Anode Cathodic Protection - SACP): Gắn kim loại có tính khử mạnh hơn (thế khử chuẩn âm hơn như Zn, Mg, Al) vào kim loại cần bảo vệ. Kim loại hi sinh bị ăn mòn trước và định kỳ được thay thế, bảo vệ an toàn tuyệt đối cho công trình ngầm, giàn khoan và tàu biển.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 12 (GDPT 2018): Đại cương kim loại, cơ chế ăn mòn điện hóa học và các phương pháp chống ăn mòn kim loại.',
    reward: {
      knowledgeTokens: 200,
      elementalShards: 100
    }
  },
  {
    id: 'puzzle_8_flue_gas_desulfurization',
    title: 'Câu Đố 8: Xử Lý Khí Thải Lò Nung Sunfua (FGD) Tạo Thạch Cao Xây Dựng',
    difficulty: 'TRUNG CẤP',
    environmentContext: {
      initialPh: 4.0,
      initialTemp: 120,
      initialPressure: 1.2,
      scenarioVI: 'Khí thải từ lò luyện quặng sắt pirit (FeS₂) chứa nồng độ khí độc lưu huỳnh đioxit (SO₂) vượt ngưỡng cho phép 15 lần. Nếu xả ra môi trường, SO₂ kết hợp hơi ẩm và O₂ tạo ra axit H₂SO₄ gây mưa axit tàn phá mùa màng.'
    },
    goalVI: 'Thu giữ và chuyển hóa triệt để 99% lượng khí SO₂ thành thạch cao CaSO₄·2H₂O có giá trị thương mại cho ngành vật liệu xây dựng.',
    options: [
      {
        id: 'opt_8a',
        label: 'Sục khí thải qua tháp hấp thụ chứa huyền phù đá vôi CaCO₃ kết hợp sục khí oxy O₂ liên tục',
        reagentFormula: 'CaCO₃(s) + H₂O + O₂',
        isCorrect: true,
        scientificOutcomeVI: 'Khí SO₂ phản ứng với CaCO₃ tạo canxi sunfit: SO₂ + CaCO₃ → CaSO₃ + CO₂↑. Khí O₂ tiếp tục oxi hóa: 2CaSO₃ + O₂ + 4H₂O → 2(CaSO₄·2H₂O)↓ tạo thạch cao xây dựng sạch, loại bỏ hoàn toàn khí SO₂ độc hại!'
      },
      {
        id: 'opt_8b',
        label: 'Dẫn khí thải qua dung dịch axit clohiđric HCl 37% đậm đặc',
        reagentFormula: 'HCl (37%)',
        isCorrect: false,
        scientificOutcomeVI: 'SO₂ là oxit axit không phản ứng với HCl; môi trường axit mạnh làm độ tan của khí càng giảm khiến toàn bộ khí SO₂ bay thẳng ra khí quyển kèm theo hơi axit HCl độc hại!'
      },
      {
        id: 'opt_8c',
        label: 'Sục khí SO₂ vào bể chứa bột than hoạt tính ở 800°C không có oxy',
        reagentFormula: 'C + không có O₂',
        isCorrect: false,
        scientificOutcomeVI: 'Than hoạt tính ở nhiệt độ cao không oxi hóa được SO₂ thành thạch cao canxi, phương án tốn kém năng lượng mà không giải quyết được vấn đề tạo sản phẩm xây dựng!'
      }
    ],
    explanationVI: 'Công nghệ khử lưu huỳnh khí thải (Flue-Gas Desulfurization - FGD) ướt bằng đá vôi là công nghệ xanh kinh điển trong công nghiệp nhiệt điện và luyện kim. Phản ứng tổng quát: 2SO₂ + 2CaCO₃ + O₂ + 4H₂O → 2(CaSO₄·2H₂O) + 2CO₂. Vừa bảo vệ bầu khí quyển khỏi mưa axit, vừa tạo thạch cao thương phẩm.',
    iupacCurriculumStandard: 'Chương Trình Hóa Học 10 & 11 (GDPT 2018): Nguyên tố nhóm VIA, Sulfur & hợp chất của sulfur, hóa học xanh và bảo vệ môi trường.',
    reward: {
      knowledgeTokens: 180,
      elementalShards: 90
    }
  }
];

export function getPuzzlesByDifficulty(difficulty: 'CƠ BẢN' | 'TRUNG CẤP' | 'NÂNG CAO'): ChemicalPuzzle[] {
  return PUZZLES.filter((p) => p.difficulty === difficulty);
}

export function getTotalPossiblePuzzleRewards(): { knowledgeTokens: number; elementalShards: number } {
  return PUZZLES.reduce(
    (acc, p) => ({
      knowledgeTokens: acc.knowledgeTokens + p.reward.knowledgeTokens,
      elementalShards: acc.elementalShards + p.reward.elementalShards
    }),
    { knowledgeTokens: 0, elementalShards: 0 }
  );
}

export function getPuzzleById(id: string): ChemicalPuzzle | undefined {
  return PUZZLES.find((p) => p.id === id);
}

export function validatePuzzleSolution(
  puzzleId: string,
  optionId: string
): { isCorrect: boolean; outcomeVI: string; explanationVI: string; reward?: { knowledgeTokens: number; elementalShards: number } } {
  const puzzle = getPuzzleById(puzzleId);
  if (!puzzle) {
    return {
      isCorrect: false,
      outcomeVI: 'Không tìm thấy câu đố tương ứng.',
      explanationVI: ''
    };
  }

  const option = puzzle.options.find((o) => o.id === optionId);
  if (!option) {
    return {
      isCorrect: false,
      outcomeVI: 'Không tìm thấy phương án được chọn.',
      explanationVI: puzzle.explanationVI
    };
  }

  return {
    isCorrect: option.isCorrect,
    outcomeVI: option.scientificOutcomeVI,
    explanationVI: puzzle.explanationVI,
    reward: option.isCorrect ? puzzle.reward : undefined
  };
}
