// src/data/curriculumDiagnosticData.ts
// Standardized GDPT 2018 Chemistry Diagnostic Assessment Question Bank
// Spans KHTN 8, KHTN 9, Hóa học 10, Hóa học 11-12 with Bloom Cognitive Taxonomy Weighting

import { CognitiveErrorLevel } from '../domain/types';

export type CurriculumGrade = 'KHTN_8' | 'KHTN_9' | 'HOA_10' | 'HOA_11_12';

export interface DiagnosticQuestion {
  id: string;
  grade: CurriculumGrade;
  gradeNameVI: string;
  topicVI: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanationVI: string;
  errorLevel: CognitiveErrorLevel; // 1: Nhận biết, 2: Thông hiểu, 3: Vận dụng
  targetSymbolOrReaction: string;
  pedagogicalTipVI: string;
}

export const DIAGNOSTIC_QUESTION_BANK: DiagnosticQuestion[] = [
  // --- KHTN 8 (LỚP 8) ---
  {
    id: 'diag_khtn8_01',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Định luật bảo toàn khối lượng',
    question: 'Đun nóng 12 gam Carbon (C) với 32 gam Khí Oxygen (O₂) trong một bình kín không có không khí lọt vào. Sau phản ứng hoàn toàn, khối lượng khí Cacbonic (CO₂) thu được là bao nhiêu?',
    options: ['44 gam', '24 gam', '32 gam', '20 gam'],
    correctAnswer: '44 gam',
    explanationVI: 'Theo Định luật bảo toàn khối lượng (Lomonosov & Lavoisier): Tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất tham gia: m_CO2 = m_C + m_O2 = 12 + 32 = 44 gam.',
    errorLevel: 1,
    targetSymbolOrReaction: 'C+O2',
    pedagogicalTipVI: 'Trong bình kín, nguyên tử chỉ tái sắp xếp liên kết chứ không tự sinh ra hoặc mất đi.'
  },
  {
    id: 'diag_khtn8_02',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Phản ứng kim loại với Axit',
    question: 'Khi thả một mẩu Kẽm (Zn) vào ống nghiệm chứa dung dịch Axit clohiđric (HCl), hiện tượng quan sát được bằng mắt thường là gì?',
    options: [
      'Mẩu Zn tan dần, có bọt khí không màu thoát ra mãnh liệt',
      'Mẩu Zn không tan, dung dịch lập tức chuyển sang màu đỏ',
      'Xuất hiện kết tủa màu xanh lam lắng xuống đáy',
      'Không có hiện tượng gì xảy ra'
    ],
    correctAnswer: 'Mẩu Zn tan dần, có bọt khí không màu thoát ra mãnh liệt',
    explanationVI: 'Kẽm đứng trước hiđro trong dãy hoạt động hóa học, khử ion H⁺ trong axit: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑. Khí H₂ thoát ra dưới dạng bọt khí sủi mãnh liệt.',
    errorLevel: 2,
    targetSymbolOrReaction: 'Zn+HCl',
    pedagogicalTipVI: 'Khí hiđro nhẹ hơn không khí và không màu, không mùi.'
  },
  {
    id: 'diag_khtn8_03',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Chỉ thị màu Axit - Bazơ',
    question: 'Dung dịch nào sau đây làm giấy quỳ tím chuyển sang màu đỏ đặc trưng?',
    options: [
      'Dung dịch Axit clohiđric (HCl)',
      'Dung dịch Natri hiđroxit (NaOH)',
      'Nước cất tinh khiết (H₂O)',
      'Dung dịch Muối ăn (NaCl)'
    ],
    correctAnswer: 'Dung dịch Axit clohiđric (HCl)',
    explanationVI: 'Dung dịch axit (chứa ion H⁺ dư) làm quỳ tím chuyển sang màu đỏ hoặc hồng. Dung dịch kiềm (NaOH) làm quỳ tím chuyển xanh. Nước cất và dung dịch NaCl trung tính giữ nguyên màu tím.',
    errorLevel: 1,
    targetSymbolOrReaction: 'HCl',
    pedagogicalTipVI: 'Ghi nhớ: Axit đỏ - Bazơ xanh - Trung tính giữ nguyên.'
  },
  {
    id: 'diag_khtn8_04',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Độ tan của chất rắn',
    question: 'Đối với phần lớn các chất rắn thông thường (như đường saccarozơ, muối ăn NaCl, muối kali nitrat KNO₃), khi tăng nhiệt độ của nước thì độ tan của chúng sẽ:',
    options: [
      'Tăng lên',
      'Giảm đi rõ rệt',
      'Luôn luôn giữ nguyên không đổi',
      'Biến thiên ngẫu nhiên không dự đoán được'
    ],
    correctAnswer: 'Tăng lên',
    explanationVI: 'Quá trình hòa tan đa số chất rắn trong nước là quá trình thu nhiệt (ΔH_sol > 0). Khi tăng nhiệt độ, theo nguyên lý Le Chatelier, cân bằng hòa tan dịch chuyển theo chiều hấp thụ nhiệt, làm tăng độ tan của chất rắn.',
    errorLevel: 2,
    targetSymbolOrReaction: 'KNO3',
    pedagogicalTipVI: 'Nước nóng hòa tan được nhiều đường hoặc muối hơn nước lạnh.'
  },
  {
    id: 'diag_khtn8_05',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Phân biệt hiện tượng vật lí và hiện tượng hóa học',
    question: 'Trong các quá trình sau đây, quá trình nào là hiện tượng hóa học (có sự biến đổi chất này thành chất khác)?',
    options: [
      'Cồn (ethanol) cháy trong không khí tạo ra khí cacbonic và hơi nước',
      'Cồn để trong lọ hở miệng bị bay hơi dần',
      'Nước đá tan chảy thành nước lỏng ở nhiệt độ phòng',
      'Hòa tan đường vào cốc nước tạo thành nước đường trong suốt'
    ],
    correctAnswer: 'Cồn (ethanol) cháy trong không khí tạo ra khí cacbonic và hơi nước',
    explanationVI: 'Hiện tượng hóa học là hiện tượng có sự tạo thành chất mới. Khi cồn cháy: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O có liên kết bị bẻ gãy và chất mới CO₂, H₂O được tạo thành. Các quá trình còn lại chỉ là sự thay đổi trạng thái hoặc hòa tan cơ học (hiện tượng vật lí).',
    errorLevel: 1,
    targetSymbolOrReaction: 'C2H5OH+O2',
    pedagogicalTipVI: 'Dấu hiệu then chốt của hiện tượng hóa học: Có chất mới sinh ra (đổi màu, sinh khí, tạo kết tủa, tỏa nhiệt phát sáng).'
  },
  {
    id: 'diag_khtn8_06',
    grade: 'KHTN_8',
    gradeNameVI: 'KHTN Lớp 8',
    topicVI: 'Thành phần phần trăm khối lượng nguyên tố',
    question: 'Thành phần phần trăm theo khối lượng của nguyên tố Oxy (O = 16) trong hợp chất Đá vôi Canxi cacbonat (CaCO₃, biết Ca = 40, C = 12, O = 16) là bao nhiêu?',
    options: ['48%', '40%', '12%', '16%'],
    correctAnswer: '48%',
    explanationVI: 'Khối lượng mol của CaCO₃: M = 40 + 12 + 16*3 = 100 g/mol. Khối lượng của nguyên tố Oxy trong 1 mol hợp chất là: 16 * 3 = 48 gam. Phần trăm khối lượng của Oxy: %m_O = (48 / 100) * 100% = 48%.',
    errorLevel: 3,
    targetSymbolOrReaction: 'CaCO3',
    pedagogicalTipVI: 'Tính khối lượng mol phân tử trước, sau đó lấy tổng khối lượng nguyên tố cần tìm chia cho khối lượng mol.'
  },

  // --- KHTN 9 (LỚP 9) ---
  {
    id: 'diag_khtn9_01',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Dãy hoạt động hóa học của kim loại (Bẫy nhận thức)',
    question: 'Cho một lá Đồng kim loại (Cu) màu đỏ vào ống nghiệm chứa dung dịch Axit clohiđric (HCl) loãng ở nhiệt độ phòng. Hiện tượng gì xảy ra?',
    options: [
      'Lá đồng không tan, dung dịch không đổi màu, không có bọt khí',
      'Lá đồng tan nhanh, sủi bọt khí H₂ mãnh liệt',
      'Dung dịch chuyển sang màu xanh lam và có khí Clo mùi hắc thoát ra',
      'Lá đồng bốc cháy sáng rực'
    ],
    correctAnswer: 'Lá đồng không tan, dung dịch không đổi màu, không có bọt khí',
    explanationVI: 'CẠM BẪY KHOA HỌC KINH ĐIỂN: Đồng (Cu) đứng SAU hiđro (H) trong dãy hoạt động hóa học (thế khử chuẩn E° Cu²⁺/Cu = +0.34V > E° 2H⁺/H₂ = 0.00V). Ion H⁺ không đủ thế oxi hóa kim loại đồng!',
    errorLevel: 3,
    targetSymbolOrReaction: 'Cu+HCl',
    pedagogicalTipVI: 'Khi nào may áo giáp sắt nhớ sang phố hỏi CỬA (Cu) hàng (Hg) á (Ag) phi (Pt) âu (Au).'
  },
  {
    id: 'diag_khtn9_02',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Axit Sunfuric đặc háo nước',
    question: 'Khi nhỏ vài giọt dung dịch Axit sunfuric đặc (H₂SO₄ đặc) vào đĩa sứ chứa một thìa đường ăn saccarozơ (C₁₂H₂₂O₁₁), hiện tượng kỳ thú nào xuất hiện?',
    options: [
      'Đường chuyển từ trắng sang vàng, hóa than đen xốp và dâng trào lên miệng đĩa',
      'Đường tan trong suốt không màu và nhiệt độ giảm sâu',
      'Đường phát quang màu tím huỳnh quang',
      'Đường kết tinh thành các khối tinh thể màu xanh ngọc'
    ],
    correctAnswer: 'Đường chuyển từ trắng sang vàng, hóa than đen xốp và dâng trào lên miệng đĩa',
    explanationVI: 'H₂SO₄ đặc có tính háo nước cực kỳ mãnh liệt, cướp các nguyên tố H và O trong phân tử đường theo tỉ lệ 2:1 của nước, để lại carbon nguyên tố màu đen: C₁₂H₂₂O₁₁ → 12C + 11H₂O. Sau đó một phần C bị H₂SO₄ đặc oxi hóa sinh ra khí CO₂ và SO₂ đẩy cột than dâng trào lên.',
    errorLevel: 2,
    targetSymbolOrReaction: 'H2SO4+C12H22O11',
    pedagogicalTipVI: 'Tuyệt đối cẩn trọng khi thao tác với H₂SO₄ đặc; không bao giờ đổ nước vào axit đặc!'
  },
  {
    id: 'diag_khtn9_03',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Nhận biết ion Sunfat (SO₄²⁻)',
    question: 'Để phân biệt hai lọ dung dịch mất nhãn chứa Natri sunfat (Na₂SO₄) và Natri clorua (NaCl), hóa chất thuốc thử tối ưu nhất là gì?',
    options: [
      'Dung dịch Bari clorua (BaCl₂)',
      'Dung dịch Axit clohiđric (HCl)',
      'Quỳ tím',
      'Dung dịch Nước vôi trong Ca(OH)₂'
    ],
    correctAnswer: 'Dung dịch Bari clorua (BaCl₂)',
    explanationVI: 'Ion Ba²⁺ kết hợp với ion SO₄²⁻ tạo ra kết tủa trắng Bari sunfat (BaSO₄) không tan trong cả axit mạnh: Ba²⁺ + SO₄²⁻ → BaSO₄↓ trắng. Với NaCl thì không xảy ra phản ứng.',
    errorLevel: 1,
    targetSymbolOrReaction: 'BaCl2+Na2SO4',
    pedagogicalTipVI: 'Kết tủa BaSO₄ bền vững không tan ngay cả trong dung dịch axit HCl hay HNO₃ nóng.'
  },
  {
    id: 'diag_khtn9_04',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Phản ứng muối Cacbonat với Axit',
    question: 'Khi đổ giấm ăn (chứa axit axetic CH₃COOH) vào bột đá vôi (thành phần chính là canxi cacbonat CaCO₃), khí sinh ra làm đục nước vôi trong là khí nào?',
    options: [
      'Khí Cacbonic (CO₂)',
      'Khí Hiđro (H₂)',
      'Khí Oxi (O₂)',
      'Khí Sunfurơ (SO₂)'
    ],
    correctAnswer: 'Khí Cacbonic (CO₂)',
    explanationVI: 'Axit axetic là axit mạnh hơn axit cacbonic, đẩy axit cacbonic yếu không bền ra khỏi muối: 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + CO₂↑ + H₂O. Khí CO₂ tạo kết tủa trắng với Ca(OH)₂: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O.',
    errorLevel: 2,
    targetSymbolOrReaction: 'CaCO3+CH3COOH',
    pedagogicalTipVI: 'Ứng dụng trong đời sống: Dùng giấm ăn hoặc chanh để tẩy cặn ấm đun nước.'
  },
  {
    id: 'diag_khtn9_05',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Phản ứng kim loại đẩy kim loại ra khỏi muối',
    question: 'Nhúng một đinh Sắt (Fe) sạch vào cốc chứa dung dịch Đồng sunfat (CuSO₄) màu xanh lam. Sau một thời gian, hiện tượng nào sau đây được quan sát thấy?',
    options: [
      'Đinh sắt có lớp kim loại đồng màu đỏ bám ngoài, màu xanh lam của dung dịch nhạt dần',
      'Đinh sắt tan hết ngay lập tức, dung dịch chuyển sang màu tím',
      'Không có hiện tượng gì xảy ra vì đồng mạnh hơn sắt',
      'Xuất hiện bọt khí thoát ra sủi bọt mãnh liệt như đun sôi'
    ],
    correctAnswer: 'Đinh sắt có lớp kim loại đồng màu đỏ bám ngoài, màu xanh lam của dung dịch nhạt dần',
    explanationVI: 'Sắt đứng trước đồng trong dãy hoạt động hóa học nên đẩy được đồng ra khỏi dung dịch muối: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓. Kim loại Cu màu đỏ sinh ra bám ngoài đinh sắt, nồng độ ion Cu²⁺ (xanh lam) giảm dần làm dung dịch nhạt màu.',
    errorLevel: 2,
    targetSymbolOrReaction: 'Fe+CuSO4',
    pedagogicalTipVI: 'Kim loại đứng trước (trừ Na, K, Ba, Ca vì tác dụng với nước trước) đẩy được kim loại đứng sau ra khỏi dung dịch muối.'
  },
  {
    id: 'diag_khtn9_06',
    grade: 'KHTN_9',
    gradeNameVI: 'KHTN Lớp 9',
    topicVI: 'Hiđrocacbon: Phản ứng cháy của Metan',
    question: 'Đốt cháy hoàn toàn 1 thể tích khí Metan (CH₄) trong khí oxy ở cùng điều kiện nhiệt độ và áp suất. Thể tích khí Oxy (O₂) cần dùng vừa đủ để phản ứng cháy xảy ra hoàn toàn là bao nhiêu thể tích?',
    options: ['2 thể tích O₂', '1 thể tích O₂', '3 thể tích O₂', '0.5 thể tích O₂'],
    correctAnswer: '2 thể tích O₂',
    explanationVI: 'Phương trình hóa học phản ứng cháy của metan: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) (t°). Theo định luật Avogadro, ở cùng điều kiện T và P, tỉ lệ thể tích khí bằng tỉ lệ số mol. Do đó 1 thể tích CH₄ cần đúng 2 thể tích O₂.',
    errorLevel: 2,
    targetSymbolOrReaction: 'CH4+O2',
    pedagogicalTipVI: 'Hỗn hợp nổ nguy hiểm nhất trong hầm lò khai thác than là hỗn hợp gồm 1 thể tích CH₄ và 2 thể tích O₂.'
  },

  // --- HÓA HỌC 10 (LỚP 10) ---
  {
    id: 'diag_hoa10_01',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Cấu hình electron nguyên tử & Nguyên lý Aufbau',
    question: 'Nguyên tử Kali có số hiệu nguyên tử Z = 19. Cấu hình electron theo mức năng lượng tăng dần (quy tắc Klechkowski/Madelung) của Kali là gì?',
    options: [
      '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
      '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹',
      '1s² 2s² 2p⁶ 3s² 3d⁷',
      '1s² 2s² 2p⁶ 3s² 3p⁵ 4s²'
    ],
    correctAnswer: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
    explanationVI: 'Theo nguyên lý vững bền Aufbau, phân lớp 4s có mức năng lượng thấp hơn phân lớp 3d (n+l: 4s = 4+0 = 4 < 3d = 3+2 = 5). Electron thứ 19 điền vào phân lớp 4s trước khi điền vào 3d.',
    errorLevel: 2,
    targetSymbolOrReaction: 'K',
    pedagogicalTipVI: 'Dãy năng lượng: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p...'
  },
  {
    id: 'diag_hoa10_02',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Quy luật biến thiên tuần hoàn',
    question: 'Trong cùng một chu kỳ của bảng tuần hoàn, đi từ trái sang phải theo chiều tăng dần của điện tích hạt nhân (Z), bán kính nguyên tử và độ âm điện biến thiên như thế nào?',
    options: [
      'Bán kính nguyên tử giảm dần, độ âm điện tăng dần',
      'Bán kính nguyên tử tăng dần, độ âm điện giảm dần',
      'Cả bán kính và độ âm điện đều tăng dần',
      'Cả bán kính và độ âm điện đều giảm dần'
    ],
    correctAnswer: 'Bán kính nguyên tử giảm dần, độ âm điện tăng dần',
    explanationVI: 'Đi từ trái sang phải trong chu kỳ: Số lớp electron không đổi nhưng điện tích hạt nhân Z tăng, lực hút của hạt nhân với electron lớp ngoài cùng tăng làm bán kính co lại; khả năng hút electron (độ âm điện) tăng dần.',
    errorLevel: 2,
    targetSymbolOrReaction: 'PERIODIC_TRENDS',
    pedagogicalTipVI: 'Góc dưới bên trái (Fr/Cs) có bán kính lớn nhất, góc trên bên phải (F) có độ âm điện lớn nhất.'
  },
  {
    id: 'diag_hoa10_03',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Phản ứng Oxi hóa - Khử',
    question: 'Trong phản ứng: Zn + CuSO₄ → ZnSO₄ + Cu, chất nào đóng vai trò là chất khử?',
    options: [
      'Zn (Kẽm kim loại)',
      'CuSO₄ (Đồng sunfat)',
      'ZnSO₄ (Kẽm sunfat)',
      'Cu (Đồng kim loại)'
    ],
    correctAnswer: 'Zn (Kẽm kim loại)',
    explanationVI: 'Số oxi hóa của Zn tăng từ 0 lên +2 (Zn → Zn²⁺ + 2e), Zn nhường electron nên là chất khử. Ion Cu²⁺ trong CuSO₄ nhận 2e (Cu²⁺ + 2e → Cu), số oxi hóa giảm từ +2 xuống 0 nên là chất oxi hóa. Khử cho - O nhận.',
    errorLevel: 1,
    targetSymbolOrReaction: 'Zn+CuSO4',
    pedagogicalTipVI: 'Khẩu quyết: "Khử cho, O nhận; Khử tăng, O giảm".'
  },
  {
    id: 'diag_hoa10_04',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Động hóa học & Năng lượng hoạt hóa',
    question: 'Chất xúc tác làm tăng tốc độ của phản ứng hóa học chủ yếu dựa trên cơ chế nào sau đây?',
    options: [
      'Làm giảm năng lượng hoạt hóa (Ea) của phản ứng bằng cách mở ra con đường phản ứng mới',
      'Làm tăng biến thiên enthalpy ΔH của phản ứng',
      'Làm thay đổi hằng số cân bằng hóa học Kc',
      'Làm tăng nhiệt độ tức thời của môi trường phản ứng'
    ],
    correctAnswer: 'Làm giảm năng lượng hoạt hóa (Ea) của phản ứng bằng cách mở ra con đường phản ứng mới',
    explanationVI: 'Theo phương trình Arrhenius k = A * exp(-Ea / RT), chất xúc tác cung cấp cơ chế phản ứng thay thế có năng lượng hoạt hóa Ea thấp hơn nhiều, làm tăng số va chạm hiệu quả giữa các phân tử mà không bị tiêu hao sau phản ứng.',
    errorLevel: 3,
    targetSymbolOrReaction: 'CATALYST_ARRHENIUS',
    pedagogicalTipVI: 'Chất xúc tác KHÔNG làm thay đổi biến thiên enthalpy ΔH và KHÔNG làm thay đổi hằng số cân bằng Kc.'
  },
  {
    id: 'diag_hoa10_05',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Liên kết hiđro & Tính chất vật lí bất thường của Nước',
    question: 'Nước (H₂O, M = 18) có nhiệt độ sôi cao bất thường (100°C) so với hiđro sunfua (H₂S, M = 34, sôi ở -60°C) dù H₂S có phân tử khối lớn hơn gần gấp đôi. Nguyên nhân căn bản của hiện tượng này là gì?',
    options: [
      'Giữa các phân tử nước hình thành mạng lưới liên kết hiđro liên phân tử bền vững',
      'Liên kết cộng hóa trị O–H trong phân tử nước bền hơn liên kết S–H',
      'Nước có khối lượng riêng lớn hơn khí hiđro sunfua',
      'Oxy có bán kính nguyên tử lớn hơn lưu huỳnh'
    ],
    correctAnswer: 'Giữa các phân tử nước hình thành mạng lưới liên kết hiđro liên phân tử bền vững',
    explanationVI: 'Nguyên tử Oxy có độ âm điện lớn (3.44) và bán kính nhỏ, làm cho liên kết O–H phân cực mạnh. Giữa nguyên tử H mang điện tích dương của phân tử nước này với cặp electron tự do trên nguyên tử O của phân tử nước khác tạo nên mạng lưới liên kết hiđro liên phân tử bền chắc, đòi hỏi cung cấp nhiều nhiệt lượng mới làm bay hơi được.',
    errorLevel: 3,
    targetSymbolOrReaction: 'HYDROGEN_BONDING',
    pedagogicalTipVI: 'Liên kết hiđro liên phân tử làm tăng đáng kể nhiệt độ sôi và độ tan trong nước của các chất.'
  },
  {
    id: 'diag_hoa10_06',
    grade: 'HOA_10',
    gradeNameVI: 'Hóa Học 10',
    topicVI: 'Tính oxi hóa của Halogen (Nhóm VIIA)',
    question: 'Khi sục khí Clo (Cl₂) vào dung dịch Natri bromua (NaBr) không màu, dung dịch dần chuyển sang màu vàng nâu. Phản ứng này chứng minh điều gì về tính chất của các halogen?',
    options: [
      'Clo có tính oxi hóa mạnh hơn Brom, đẩy được ion Br⁻ ra khỏi dung dịch muối',
      'Brom có tính oxi hóa mạnh hơn Clo',
      'Ion Cl⁻ có tính khử mạnh hơn ion Br⁻',
      'Khí Clo bị Brom khử thành axit clohiđric'
    ],
    correctAnswer: 'Clo có tính oxi hóa mạnh hơn Brom, đẩy được ion Br⁻ ra khỏi dung dịch muối',
    explanationVI: 'Phương trình phản ứng: Cl₂ + 2NaBr → 2NaCl + Br₂. Khí Clo (chất oxi hóa mạnh hơn) oxi hóa ion Br⁻ thành Brom đơn chất Br₂ tan trong nước có màu vàng nâu. Trong nhóm halogen, tính oxi hóa giảm dần từ trên xuống dưới: F₂ > Cl₂ > Br₂ > I₂.',
    errorLevel: 2,
    targetSymbolOrReaction: 'Cl2+2NaBr',
    pedagogicalTipVI: 'Halogen đứng trên đẩy được halogen đứng dưới (dạng ion halogenua X⁻) ra khỏi dung dịch muối (trừ F₂ vì phản ứng mãnh liệt với nước).'
  },

  // --- HÓA HỌC 11 - 12 (LỚP 11 & 12) ---
  {
    id: 'diag_hoa11_01',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Cân bằng hóa học & Nguyên lý Le Chatelier',
    question: 'Xét phản ứng tổng hợp amoniac trong công nghiệp (Haber-Bosch): N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH° = -92.2 kJ). Biện pháp nào sau đây giúp chuyển dịch cân bằng theo chiều thuận để tăng hiệu suất sinh ra NH₃?',
    options: [
      'Tăng áp suất chung của hệ và hạ nhiệt độ thích hợp',
      'Giảm áp suất và tăng nhiệt độ thật cao',
      'Tăng thể tích bình phản ứng',
      'Chỉ cần thêm chất xúc tác bột sắt (Fe)'
    ],
    correctAnswer: 'Tăng áp suất chung của hệ và hạ nhiệt độ thích hợp',
    explanationVI: 'Phản ứng thuận tỏa nhiệt (ΔH < 0), hạ nhiệt độ dịch chuyển cân bằng theo chiều tỏa nhiệt (chiều thuận). Phản ứng thuận làm giảm số mol khí (4 mol → 2 mol), tăng áp suất dịch chuyển cân bằng theo chiều giảm áp suất (chiều thuận).',
    errorLevel: 3,
    targetSymbolOrReaction: 'N2+3H2',
    pedagogicalTipVI: 'Nguyên lý Le Chatelier: Khi chịu tác động ngoài, cân bằng tự dịch chuyển theo chiều chống lại tác động đó.'
  },
  {
    id: 'diag_hoa11_02',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Đo độ pH & Dung dịch Axit - Bazơ',
    question: 'Trộn 100 mL dung dịch HCl 0.1 M với 100 mL dung dịch NaOH 0.1 M. Giá trị pH của dung dịch thu được ở 25°C là bao nhiêu?',
    options: [
      'pH = 7.0',
      'pH = 1.0',
      'pH = 13.0',
      'pH = 0.0'
    ],
    correctAnswer: 'pH = 7.0',
    explanationVI: 'Số mol H⁺ = 0.1 * 0.1 = 0.01 mol. Số mol OH⁻ = 0.1 * 0.1 = 0.01 mol. H⁺ phản ứng vừa đủ với OH⁻ tạo H₂O: H⁺ + OH⁻ → H₂O. Dung dịch sau phản ứng là muối NaCl trung tính không bị thủy phân, ở 25°C có pH = 7.0.',
    errorLevel: 2,
    targetSymbolOrReaction: 'HCl+NaOH',
    pedagogicalTipVI: 'Trung hòa axit mạnh và bazơ mạnh vừa đủ ở 25°C luôn cho dung dịch có pH = 7.0.'
  },
  {
    id: 'diag_hoa12_01',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Hóa học hữu cơ: Phản ứng Este hóa',
    question: 'Để điều chế este etyl axetat (CH₃COOC₂H₅) tỏa mùi thơm hoa quả trong phòng thí nghiệm, người ta đun nóng axit axetic với ancol etylic với sự có mặt của hóa chất nào vừa làm xúc tác vừa hút nước chuyển dịch cân bằng?',
    options: [
      'Axit sunfuric đặc (H₂SO₄ đặc)',
      'Dung dịch Axit clohiđric loãng (HCl loãng)',
      'Bột đồng kim loại (Cu)',
      'Natri hiđroxit rắn (NaOH)'
    ],
    correctAnswer: 'Axit sunfuric đặc (H₂SO₄ đặc)',
    explanationVI: 'Phản ứng este hóa là phản ứng thuận nghịch: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. H₂SO₄ đặc đóng vai trò kép: xúc tác proton hóa nhóm cacboxyl và hút nước mãnh liệt làm chuyển dịch cân bằng mạnh sang chiều tạo este.',
    errorLevel: 2,
    targetSymbolOrReaction: 'C2H5OH+CH3COOH',
    pedagogicalTipVI: 'Este nhẹ hơn nước và ít tan trong nước, thường nổi lên thành lớp váng có mùi thơm đặc trưng.'
  },
  {
    id: 'diag_hoa12_02',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Cacbohiđrat & Phản ứng Tráng Bạc',
    question: 'Dung dịch Glucozơ (C₆H₁₂O₆) đun nóng với thuốc thử Tollens [Ag(NH₃)₂]OH tạo thành lớp kim loại bạc (Ag) sáng loáng bám vào thành ống nghiệm (phản ứng tráng gương). Phản ứng này chứng minh trong phân tử glucozơ có chứa nhóm chức nào?',
    options: [
      'Nhóm chức Anđehit (–CH=O)',
      'Nhóm chức Axit cacboxylic (–COOH)',
      'Nhóm chức Este (–COO–)',
      'Nhóm chức Ete (–O–)'
    ],
    correctAnswer: 'Nhóm chức Anđehit (–CH=O)',
    explanationVI: 'Ở dạng mạch hở, glucozơ chứa 1 nhóm anđehit –CH=O có tính khử mạnh, khử phức chất [Ag(NH₃)₂]⁺ thành bạc kim loại Ag(0) kết tủa đều đặc bám dính mịn trên thành thủy tinh tạo thành gương soi.',
    errorLevel: 1,
    targetSymbolOrReaction: 'AgNO3+C6H12O6',
    pedagogicalTipVI: 'Mỗi phân tử glucozơ dạng anđehit khi phản ứng tráng gương hoàn toàn cho tỉ lệ mol: 1 Glucozơ → 2 Ag.'
  },
  {
    id: 'diag_hoa11_03',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Số oxi hóa của Nitơ & Tính chất hóa học',
    question: 'Số oxi hóa của nguyên tố Nitơ (N) trong các chất: NH₃, N₂, NO, HNO₃ lần lượt là những giá trị nào sau đây?',
    options: [
      '-3, 0, +2, +5',
      '+3, 0, +2, +5',
      '-3, 0, +4, +5',
      '-1, 0, +1, +3'
    ],
    correctAnswer: '-3, 0, +2, +5',
    explanationVI: 'Trong NH₃ (H có số oxh +1): x + 3*(+1) = 0 => x = -3. Trong đơn chất N₂: số oxh = 0. Trong NO (O có số oxh -2): x + (-2) = 0 => x = +2. Trong HNO₃ (H: +1, O: -2): (+1) + x + 3*(-2) = 0 => x = +5.',
    errorLevel: 1,
    targetSymbolOrReaction: 'NITROGEN_OXIDATION_STATES',
    pedagogicalTipVI: 'Các số oxi hóa thường gặp của Nitơ: -3 (thấp nhất, chỉ có tính khử), 0, +1, +2, +3, +4, +5 (cao nhất, chỉ có tính oxi hóa mạnh).'
  },
  {
    id: 'diag_hoa12_03',
    grade: 'HOA_11_12',
    gradeNameVI: 'Hóa Học 11 - 12',
    topicVI: 'Phản ứng màu Biure nhận biết Peptit và Protein',
    question: 'Hợp chất nào sau đây KHÔNG cho phản ứng màu biure (tạo phức chất màu tím đặc trưng với Cu(OH)₂ trong môi trường kiềm)?',
    options: [
      'Đipeptit Gly-Ala (chỉ có 1 liên kết peptit)',
      'Tripeptit Gly-Ala-Val (có 2 liên kết peptit)',
      'Lòng trắng trứng (chứa protein albumin)',
      'Dung dịch huyết thanh máu (chứa protein)'
    ],
    correctAnswer: 'Đipeptit Gly-Ala (chỉ có 1 liên kết peptit)',
    explanationVI: 'CẠM BẪY ĐIỂN HÌNH HÓA 12: Điều kiện để xảy ra phản ứng màu biure là phân tử peptit phải có từ 2 liên kết peptit trở lên (tức là từ tripeptit trở lên hoặc protein). Đipeptit chỉ có đúng 1 liên kết peptit (–CO–NH–) nên KHÔNG phản ứng với Cu(OH)₂ tạo màu tím.',
    errorLevel: 3,
    targetSymbolOrReaction: 'BIURET_TEST',
    pedagogicalTipVI: 'Ghi nhớ quy tắc: Đipeptit KHÔNG có phản ứng màu biure!'
  }
];
