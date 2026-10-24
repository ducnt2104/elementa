// src/domain/characterQuips.ts
// Character Combat Quips & Pedagogical Dialogue Engine for ELEMENTA

export type ChemistPersona = 'MENDELEEV' | 'CURIE' | 'LAVOISIER' | 'ALPHA' | 'BETA';

export type QuipTriggerEvent =
  | 'MATCH_START'
  | 'SYNCHRO_SUMMON'
  | 'XYZ_SUMMON'
  | 'PENDULUM_SUMMON'
  | 'RITUAL_SUMMON'
  | 'FUSION_SUMMON'
  | 'LINK_SUMMON'
  | 'HABER_ACTIVATION'
  | 'THERMITE_ACTIVATION'
  | 'LOW_LIFE_POINTS'
  | 'DIRECT_ATTACK'
  | 'VICTORY'
  | 'DEFEAT'
  | 'SURRENDER'
  | 'REACTION';

export interface CharacterQuip {
  speaker: string;
  title: string;
  persona: ChemistPersona;
  quoteVI: string;
  quoteEN: string;
  scientificContextVI: string;
}

const QUIP_DATABASE: Record<ChemistPersona, Partial<Record<QuipTriggerEvent, CharacterQuip[]>>> = {
  MENDELEEV: {
    MATCH_START: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Cha Đẻ Bảng Tuần Hoàn (1869)',
        persona: 'MENDELEEV',
        quoteVI: 'Bản chất của vạn vật tuân theo trật tự tuần hoàn của khối lượng và điện tích hạt nhân. Hãy cho ta thấy chiến thuật của ngươi!',
        quoteEN: 'The properties of the elements are in periodic dependence on their atomic weights. Show me your strategy!',
        scientificContextVI: 'Dmitri Mendeleev sắp xếp 63 nguyên tố đầu tiên theo khối lượng nguyên tử và dự đoán chuẩn xác tính chất của các nguyên tố chưa được phát hiện (Ga, Sc, Ge).'
      }
    ],
    SYNCHRO_SUMMON: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Cộng Hưởng Đồng Bộ',
        persona: 'MENDELEEV',
        quoteVI: 'Bạch kim xúc tác đã đẩy phản ứng vượt ngưỡng hoạt hóa! Lò Chuyển Hóa Khí Thải xuất trận!',
        quoteEN: 'Platinum catalysis has driven the reaction over the activation barrier! Synchro Converter emerges!',
        scientificContextVI: 'Xúc tác dị thể Pt làm giảm năng lượng hoạt hóa Ea, cho phép phản ứng đồng bộ diễn ra ở tốc độ cực đại.'
      }
    ],
    XYZ_SUMMON: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Phức Chất Bát Diện Khóa Khí',
        persona: 'MENDELEEV',
        quoteVI: 'Phức chất phối trí bát diện Cobalt đã khóa chặt sân đấu! Các phối tử NH₃ bảo vệ tuyệt đối!',
        quoteEN: 'Octahedral Cobalt coordination complex locks the battlefield! Ammine ligands provide absolute ward!',
        scientificContextVI: 'Cấu trúc phức chất bát diện Alfred Werner Nobel 1913 giải thích liên kết phối trí bền vững giữa cation kim loại chuyển tiếp và phân tử phối tử.'
      }
    ],
    PENDULUM_SUMMON: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Dao Động Lưỡng Tính Zwitterion',
        persona: 'MENDELEEV',
        quoteVI: 'Thang đo acid amin đã mở cổng điện trường đẳng điện! Quái thú nguyên tố, hãy tràn ngập trận địa!',
        quoteEN: 'The amino acid scale unlocks the isoelectric field gate! Elemental forces, swarm the board!',
        scientificContextVI: 'Điểm đẳng điện pI cho phép ion lưỡng cực của acid amin dẫn truyền và định hình cấu trúc cân bằng lưỡng tính.'
      }
    ],
    RITUAL_SUMMON: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Đại Cầu Buckyball C₆₀',
        persona: 'MENDELEEV',
        quoteVI: 'Từ hơi carbon quá bão hòa, lồng Fullerene C₆₀ icosahedron hoàn hảo giáng lâm!',
        quoteEN: 'From supersaturated carbon vapor, the perfect C₆₀ icosahedral cage descends!',
        scientificContextVI: 'Khối cầu Buckminsterfullerene gồm 12 ngũ giác và 20 lục giác đối xứng cụm Ih, đạt giải Nobel Hóa học 1996.'
      }
    ],
    HABER_ACTIVATION: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Buồng Áp Suất Haber-Bosch',
        persona: 'MENDELEEV',
        quoteVI: 'Áp suất 200 atm và 450°C! Theo nguyên lý Le Chatelier, cân bằng chuyển dịch hoàn toàn về phía tổng hợp!',
        quoteEN: '200 atm and 450°C! By Le Chatelier’s principle, the equilibrium shifts irreversibly toward synthesis!',
        scientificContextVI: 'Phản ứng tỏa nhiệt tổng hợp amoniac N2 + 3H2 ⇌ 2NH3 chuyển dịch thuận khi tăng áp suất (4 mol khí -> 2 mol khí).'
      }
    ],
    LOW_LIFE_POINTS: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Trơ Bền Nguyên Tử',
        persona: 'MENDELEEV',
        quoteVI: 'Dù Life Points cạn kiệt, hạt nhân nguyên tử vẫn bất biến! Cuộc phản công bắt đầu ngay bây giờ!',
        quoteEN: 'Though Life Points dwindle, the atomic nucleus remains invariant! The counterattack begins now!',
        scientificContextVI: 'Năng lượng liên kết hạt nhân giữ cho trạng thái proton và neutron bền vững vượt trên mọi biến thiên hóa học.'
      }
    ],
    VICTORY: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Định Luật Vĩnh Cửu',
        persona: 'MENDELEEV',
        quoteVI: 'Chiến thắng đã được định đoạt bởi Quy luật Tuần hoàn! Ngươi đã chiến đấu rất kiên cường.',
        quoteEN: 'Victory was dictated by the Periodic Law! You fought with commendable honor.',
        scientificContextVI: 'Bảng tuần hoàn Mendeleev là nền móng vĩ đại nhất của hóa học hiện đại.'
      }
    ],
    SURRENDER: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Đầu Hàng Danh Dự',
        persona: 'MENDELEEV',
        quoteVI: 'Định luật tuần hoàn đã chỉ rõ kết cục tất yếu! Thế trận của ngươi quá áp đảo, ta xin đầu hàng trong sự khâm phục.',
        quoteEN: 'The periodic law makes the outcome inevitable! Your board is insurmountable, I concede with honor.',
        scientificContextVI: 'Quy tắc đầu hàng danh dự bảo toàn tính khoa học và tinh thần thượng võ trong thi đấu đối kháng.'
      }
    ],
    REACTION: [
      {
        speaker: 'Đại Sư Hóa Học Mendeleev',
        title: 'Phản Ứng Tương Tác Hóa Học',
        persona: 'MENDELEEV',
        quoteVI: 'Liên kết hóa học đã hình thành chuẩn xác theo cấu hình electron lớp ngoài cùng! Một đòn giáng uy lực tuyệt đối!',
        quoteEN: 'Chemical bonds have formed precisely according to the valence electron configuration! An absolute strategic strike!',
        scientificContextVI: 'Các phản ứng hóa học diễn ra để các nguyên tử đạt cấu hình electron bền vững của khí hiếm theo quy tắc Octet.'
      }
    ]
  },
  CURIE: {
    MATCH_START: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Người Tiên Phong Phóng Xạ (Nobel Vật Lý 1903 & Hóa Học 1911)',
        persona: 'CURIE',
        quoteVI: 'Không có gì trong cuộc sống là đáng sợ, nó chỉ cần được thấu hiểu. Hãy cùng khám phá năng lượng bức xạ nguyên tử!',
        quoteEN: 'Nothing in life is to be feared, it is only to be understood. Let us unveil atomic radiation!',
        scientificContextVI: 'Marie Curie là nhà khoa học duy nhất trong lịch sử giành 2 giải Nobel ở hai ngành khoa học tự nhiên khác nhau.'
      }
    ],
    SYNCHRO_SUMMON: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Gia Tốc Hạt Bức Xạ',
        persona: 'CURIE',
        quoteVI: 'Chùm hạt phát xạ alpha và beta đã kích hoạt bộ cộng hưởng đồng bộ! Khí thải bị tiêu diệt hoàn toàn!',
        quoteEN: 'Alpha and beta emissions have ignited the synchro resonance! All exhaust emissions are purified!',
        scientificContextVI: 'Bức xạ hạt mang năng lượng cao ion hóa các phân tử khí độc, hỗ trợ quá trình phân hủy xúc tác.'
      }
    ],
    XYZ_SUMMON: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Chiết Tách Phức Chất Tinh Thể',
        persona: 'CURIE',
        quoteVI: 'Phương pháp kết tinh phân đoạn đã cô lập thành công phức chất tinh thể siêu bền!',
        quoteEN: 'Fractional crystallization has successfully isolated an ultra-resilient coordination complex!',
        scientificContextVI: 'Marie Curie tinh chế hàng tấn quặng pitchblende bằng phương pháp kết tinh phân đoạn để tìm ra Polonium và Radium.'
      }
    ],
    PENDULUM_SUMMON: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Cực Tính Ion Hóa',
        persona: 'CURIE',
        quoteVI: 'Cường độ phóng xạ mở ra trường ion lưỡng cực! Toàn bộ nguồn nguyên tố hãy tiến vào!',
        quoteEN: 'Radiation intensity opens the dipole ion field! Let every elemental force charge forth!',
        scientificContextVI: 'Khả năng ion hóa chất khí của tia phóng xạ là cơ sở để phát hiện và đo lường cường độ hoạt độ phóng xạ.'
      }
    ],
    RITUAL_SUMMON: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Tinh Thể Lồng Buckyball',
        persona: 'CURIE',
        quoteVI: 'Lồng carbon đã giam hãm mọi phân rã phóng xạ bên trong mạng lưới icosahedron!',
        quoteEN: 'The carbon cage entraps all radioactive decay inside its icosahedral matrix!',
        scientificContextVI: 'Phân tử Endohedral Fullerene có thể lưu giữ các nguyên tử kim loại phóng xạ bên trong lồng C60 phục vụ y học hạt nhân.'
      }
    ],
    HABER_ACTIVATION: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Nhiệt Hạch Phân Hạch',
        persona: 'CURIE',
        quoteVI: 'Nhiệt lượng tỏa ra dữ dội như một thanh nhiên liệu phản ứng! Bảo vệ các vị trí quan trọng!',
        quoteEN: 'Intense thermal energy radiates like a reactor fuel rod! Safeguard vital positions!',
        scientificContextVI: 'Năng lượng phân rã tự nhiên chuyển hóa thành nhiệt năng liên tục qua thời gian bán rã.'
      }
    ],
    LOW_LIFE_POINTS: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Ánh Sáng Huỳnh Quang Trong Đêm',
        persona: 'CURIE',
        quoteVI: 'Chính trong bóng tối sâu thẳm nhất, ánh sáng huỳnh quang xanh lục của Radium mới rực rỡ nhất!',
        quoteEN: 'It is in the deepest darkness that the green luminescence of Radium shines most brilliantly!',
        scientificContextVI: 'Muối Radium phát quang tự nhiên trong bóng tối do quá trình kích thích bức xạ phosphor.'
      }
    ],
    VICTORY: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Kỷ Nguyên Hạt Nhân',
        persona: 'CURIE',
        quoteVI: 'Bức xạ chân lý khoa học đã chiếu rọi trận đấu này! Cảm ơn ngươi vì một cuộc so tài xuất sắc.',
        quoteEN: 'The radiation of scientific truth has illuminated this duel! Thank you for a magnificent contest.',
        scientificContextVI: 'Khám phá về tính phóng xạ đã mở ra kỷ nguyên vật lý và hóa học hạt nhân của nhân loại.'
      }
    ],
    SURRENDER: [
      {
        speaker: 'Nhà Nữ Bác Học Marie Curie',
        title: 'Đầu Hàng Danh Dự (Rulebook v10 tr. 33)',
        persona: 'CURIE',
        quoteVI: 'Năng lượng phản ứng trên sân đấu đã vượt tầm kiểm soát nhiệt động học. Ta xin nhận thua trước trí tuệ của ngươi.',
        quoteEN: 'The reaction energy on the field exceeds all thermodynamic limits. I concede before your brilliance.',
        scientificContextVI: 'Marie Curie luôn đặt tính chính xác thực nghiệm và sự thấu hiểu giới hạn phản ứng lên trên hết.'
      }
    ]
  },
  LAVOISIER: {
    MATCH_START: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Cha Đẻ Hóa Học Hiện Đại (1789)',
        persona: 'LAVOISIER',
        quoteVI: 'Không có gì tự nhiên sinh ra, không có gì tự nhiên mất đi, tất cả chỉ chuyển hóa từ dạng này sang dạng khác!',
        quoteEN: 'Nothing is lost, nothing is created, everything is transformed!',
        scientificContextVI: 'Định luật bảo toàn khối lượng (Conservation of Mass) do Lavoisier phát biểu là tiền đề cơ bản của phương trình hóa học.'
      }
    ],
    SYNCHRO_SUMMON: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Bảo Toàn Phản Ứng Đốt Cháy',
        persona: 'LAVOISIER',
        quoteVI: 'Oxy hóa hoàn toàn carbon monoxide thành carbon dioxide! Khí thải quy phục trật tự!',
        quoteEN: 'Total oxidation of carbon monoxide into carbon dioxide! Emissions yield to stoichiometry!',
        scientificContextVI: 'Lavoisier bác bỏ thuyết phlogiston và chứng minh quá trình cháy thực chất là sự kết hợp với khí Oxy.'
      }
    ],
    XYZ_SUMMON: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Cân Bằng Phối Trí',
        persona: 'LAVOISIER',
        quoteVI: 'Khối lượng và điện tích của các phối tử được bảo toàn tuyệt đối quanh nguyên tử trung tâm!',
        quoteEN: 'Mass and charge of the ligands are strictly conserved around the coordination center!',
        scientificContextVI: 'Nguyên lý bảo toàn điện tích và nguyên tử chi phối toàn bộ phản ứng tạo phức.'
      }
    ],
    PENDULUM_SUMMON: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Chuyển Dịch Lưỡng Cực',
        persona: 'LAVOISIER',
        quoteVI: 'Các liên kết peptide và carboxyl cân bằng hoàn hảo! Toàn bộ đội hình hãy nhập cuộc!',
        quoteEN: 'Peptide bonds and carboxyl groups achieve perfect equilibrium! Full line-up, advance!',
        scientificContextVI: 'Acid amin bảo toàn thành phần nguyên tố khi chuyển dịch giữa dạng phân tử và dạng ion lưỡng cực.'
      }
    ],
    RITUAL_SUMMON: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Đồng Hình Khối Cầu',
        persona: 'LAVOISIER',
        quoteVI: '60 nguyên tử carbon tái cấu trúc từ thể khí thành lồng Buckyball! Khối lượng bảo toàn tuyệt đối!',
        quoteEN: '60 carbon atoms restructure from vapor into a Buckyball cage! Mass strictly conserved!',
        scientificContextVI: 'Hiện tượng thù hình của carbon (kim cương, than chì, fullerene) chỉ là sự sắp xếp khác nhau của cùng một nguyên tố.'
      }
    ],
    HABER_ACTIVATION: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Định Lượng Thể Tích Khí',
        persona: 'LAVOISIER',
        quoteVI: 'Tỷ lệ 1 thể tích Nitơ và 3 thể tích Hydro! Phản ứng diễn ra theo đúng định luật tỷ lệ bội!',
        quoteEN: 'Ratio of 1 volume Nitrogen to 3 volumes Hydrogen! The reaction follows the law of definite proportions!',
        scientificContextVI: 'Định luật tỷ lệ thể tích khí Gay-Lussac và tỷ lệ bội là bước phát triển tiếp nối công trình của Lavoisier.'
      }
    ],
    LOW_LIFE_POINTS: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Bảo Toàn Ý Chí',
        persona: 'LAVOISIER',
        quoteVI: 'Năng lượng chỉ chuyển hóa, không hề suy suyển! Ta sẽ lật ngược thế trận bằng chiếc cân chuẩn xác!',
        quoteEN: 'Energy only transforms, it never wanes! I shall turn the tide with analytical precision!',
        scientificContextVI: 'Lavoisier sử dụng cân đo phân tích có độ chính xác cao nhất thời bấy giờ để thực hiện thí nghiệm.'
      }
    ],
    VICTORY: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Khải Hoàn Thực Nghiệm',
        persona: 'LAVOISIER',
        quoteVI: 'Phương trình đã cân bằng hoàn toàn ở vế chiến thắng! Ngươi là một đối thủ đáng kính.',
        quoteEN: 'The equation balances cleanly in victory! You are an honorable opponent.',
        scientificContextVI: 'Hóa học thực nghiệm định lượng chính thức thay thế hoàn toàn thuật giả kim thần bí.'
      }
    ],
    SURRENDER: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Đầu Hàng Danh Dự',
        persona: 'LAVOISIER',
        quoteVI: 'Không có gì tự sinh ra hay mất đi, nhưng lực lượng của ngươi đã áp đảo toàn bộ hệ thống! Ta thừa nhận thất bại.',
        quoteEN: 'Nothing is created, nothing is lost, yet your force overwhelms the entire system! I concede.',
        scientificContextVI: 'Định luật bảo toàn khối lượng và năng lượng của Antoine Lavoisier (1789) đặt nền móng cho hóa học định lượng.'
      }
    ],
    REACTION: [
      {
        speaker: 'Antoine Lavoisier',
        title: 'Bảo Toàn Khối Lượng & Năng Lượng',
        persona: 'LAVOISIER',
        quoteVI: 'Rien ne se perd, rien ne se crée, tout se transforme! Phản ứng giải phóng năng lượng đã xoay chuyển cục diện!',
        quoteEN: 'Nothing is lost, nothing is created, everything is transformed! The reaction energy transforms the match!',
        scientificContextVI: 'Định luật bảo toàn khối lượng (1789): Tổng khối lượng của các chất phản ứng luôn bằng tổng khối lượng của các sản phẩm tạo thành.'
      }
    ]
  },
  ALPHA: {
    MATCH_START: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Tân Binh Phòng Thí Nghiệm',
        persona: 'ALPHA',
        quoteVI: 'Tôi đã ôn kỹ toàn bộ tính chất bảng tuần hoàn! Xin được thỉnh giáo!',
        quoteEN: 'I reviewed the entire periodic table! Let’s have a great match!',
        scientificContextVI: 'Học sinh nắm vững các khái niệm cơ bản về bảng tuần hoàn và liên kết hóa học.'
      }
    ],
    SYNCHRO_SUMMON: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Triệu Hồi Thành Công!',
        persona: 'ALPHA',
        quoteVI: 'Tuyệt vời! Tuner Bạch kim cộng với Sắt Cấp 4 vừa đúng 7 sao cho Lò Chuyển Hóa!',
        quoteEN: 'Awesome! Platinum Tuner plus Level 4 Iron equals exact 7 stars for the Converter!',
        scientificContextVI: 'Triệu hồi Đồng bộ đòi hỏi phép cộng đại số chính xác cấp độ của Tuner và Non-Tuner.'
      }
    ],
    XYZ_SUMMON: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Ghép Lớp Xyz!',
        persona: 'ALPHA',
        quoteVI: 'Hai quái thú cùng Cấp 4 đã xếp chồng thành Phức chất Cobalt Hexammine!',
        quoteEN: 'Two Level 4 monsters stacked into Hexammine Cobalt Complex!',
        scientificContextVI: 'Triệu hồi Xyz yêu cầu số lượng quái thú cùng Cấp làm vật liệu xếp chồng.'
      }
    ],
    PENDULUM_SUMMON: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Mở Thang Đo Dao Động!',
        persona: 'ALPHA',
        quoteVI: 'Scale 1 và Scale 8 đã sáng! Tôi triệu hồi toàn bộ quái thú Cấp 2 đến Cấp 7!',
        quoteEN: 'Scale 1 and 8 are active! I summon all monsters from Level 2 to 7!',
        scientificContextVI: 'Khoảng triệu hồi Pendulum nằm giữa hai thang đo (Scale L < Cấp < Scale R).'
      }
    ],
    RITUAL_SUMMON: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Khai Mở Lò Buckyball!',
        persona: 'ALPHA',
        quoteVI: 'Mầm kết tinh đã hội tụ đủ 8 sao hiến tế! Đại Cầu Buckyball xuất trận!',
        quoteEN: 'Crystallization seed gathered 8 tribute stars! Buckyball joins the fray!',
        scientificContextVI: 'Triệu hồi Nghi thức cần đủ sao hiến tế tương ứng với Cấp của quái thú Nghi thức.'
      }
    ],
    LOW_LIFE_POINTS: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Không Bỏ Cuộc',
        persona: 'ALPHA',
        quoteVI: 'Chỉ còn ít máu nhưng phản ứng dây chuyền vẫn có thể lật kèo!',
        quoteEN: 'Low HP, but a chain reaction can still flip the game!',
        scientificContextVI: 'Trong đấu bài Yu-Gi-Oh!/ELEMENTA, chỉ cần 1 LP còn lại là còn cơ hội chiến thắng.'
      }
    ],
    VICTORY: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Điểm 10 Hóa Học!',
        persona: 'ALPHA',
        quoteVI: 'Tôi đã làm được rồi! Cảm ơn vì trận đấu tuyệt vời!',
        quoteEN: 'I did it! Thanks for the wonderful duel!',
        scientificContextVI: 'Kiến thức khoa học kết hợp chiến thuật đấu bài tạo nên thắng lợi vang dội.'
      }
    ],
    SURRENDER: [
      {
        speaker: 'Học Viên Giả Kim Alpha',
        title: 'Đầu Hàng Danh Dự (Rulebook v10 tr. 33)',
        persona: 'ALPHA',
        quoteVI: 'Thế trận của bạn quá mạnh mẽ! Mình xin đầu hàng để học hỏi thêm các chuỗi phản ứng phối hợp của bạn.',
        quoteEN: 'Your board is unstoppable! I concede to study and learn from your brilliant combination strategies.',
        scientificContextVI: 'Quy tắc đầu hàng danh dự (Rulebook v10 tr. 33) thể hiện tinh thần thượng võ và học hỏi không ngừng.'
      }
    ]
  },
  BETA: {
    MATCH_START: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Chuyên Gia Tác Chiến Dung Dịch',
        persona: 'BETA',
        quoteVI: 'Nồng độ mol và nhiệt độ đã sẵn sàng. Ta sẽ làm tiêu biến toàn bộ sân của ngươi!',
        quoteEN: 'Molar concentration and temperature ready. I will dissolve your field!',
        scientificContextVI: 'Chiến thuật phản ứng hóa học dựa trên việc kiểm soát pH, nồng độ và nhiệt độ.'
      }
    ],
    SYNCHRO_SUMMON: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Xúc Tác Đột Phá',
        persona: 'BETA',
        quoteVI: 'Đồng bộ xúc tác tốc độ cao! Quái thú của ngươi không kịp trở tay!',
        quoteEN: 'High-speed catalytic synchro! Your monsters have no time to react!',
        scientificContextVI: 'Xúc tác dị thể gia tốc phản ứng nhanh gấp hàng triệu lần.'
      }
    ],
    XYZ_SUMMON: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Xếp Chồng Năng Lượng',
        persona: 'BETA',
        quoteVI: 'Vật liệu Xyz xếp chồng! Khiên phối trí đã kích hoạt!',
        quoteEN: 'Xyz overlay activated! Coordination shield online!',
        scientificContextVI: 'Khiên bảo vệ phối trí hấp thụ sát thương chiến đấu.'
      }
    ],
    PENDULUM_SUMMON: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Càn Quét Trận Địa',
        persona: 'BETA',
        quoteVI: 'Triệu hồi dao động diện rộng! Sân đấu này là của ta!',
        quoteEN: 'Wide-area pendulum summon! This field is mine!',
        scientificContextVI: 'Khả năng swarm diện rộng của Pendulum tạo áp lực chiến thuật khổng lồ.'
      }
    ],
    RITUAL_SUMMON: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Quả Cầu Bọc Thép',
        persona: 'BETA',
        quoteVI: 'Lồng Fullerene bất khả xâm phạm! Bẫy của ngươi hoàn toàn vô hiệu!',
        quoteEN: 'Impenetrable Fullerene cage! Your traps are rendered useless!',
        scientificContextVI: 'Cấu trúc cầu khép kín miễn nhiễm hoàn toàn hiệu ứng bẫy.'
      }
    ],
    LOW_LIFE_POINTS: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Bền Gan Vững Chí',
        persona: 'BETA',
        quoteVI: 'Thử thách chỉ làm phản ứng thêm mãnh liệt! Lên nào!',
        quoteEN: 'Adversity only intensifies the reaction! Come on!',
        scientificContextVI: 'Áp lực và nhiệt độ cao là điều kiện cần thiết để kích hoạt các phản ứng khó.'
      }
    ],
    VICTORY: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Phản Ứng Hoàn Tất',
        persona: 'BETA',
        quoteVI: 'Sản phẩm phản ứng đã đạt hiệu suất 100%! Trận đấu kết thúc!',
        quoteEN: 'Reaction yield reached 100%! Duel concluded!',
        scientificContextVI: 'Hiệu suất phản ứng phản ánh mức độ tối ưu hóa quá trình hóa học.'
      }
    ],
    SURRENDER: [
      {
        speaker: 'Chiến Binh Phản Ứng Beta',
        title: 'Đầu Hàng Danh Dự (Rulebook v10 tr. 33)',
        persona: 'BETA',
        quoteVI: 'Xác suất đảo ngược thế cờ đã tiệm cận 0.00%. Tối ưu hóa thời gian thi đấu, ta tuyên bố đầu hàng.',
        quoteEN: 'Reversal probability approaches 0.00%. To optimize match time, I submit my forfeiture.',
        scientificContextVI: 'Phân tích xác suất và thống kê trong thi đấu thể thao điện tử và cờ chiến thuật.'
      }
    ]
  }
};

export class CharacterQuipEngine {
  /**
   * Retrieves a thematic quip matching the duelist persona and gameplay trigger event
   */
  public static getQuip(persona: ChemistPersona, event: QuipTriggerEvent): CharacterQuip {
    const personaBank = QUIP_DATABASE[persona] || QUIP_DATABASE.MENDELEEV;
    const quipList = personaBank[event] || personaBank.MATCH_START || QUIP_DATABASE.MENDELEEV.MATCH_START!;
    const randomIndex = Math.floor(Math.random() * quipList.length);
    return quipList[randomIndex];
  }

  /**
   * Maps AI Level to corresponding chemist persona
   */
  public static mapAiLevelToPersona(aiLevel: string, opponentName?: string): ChemistPersona {
    if (opponentName?.includes('Mendeleev') || aiLevel === 'MENDELEEV') return 'MENDELEEV';
    if (opponentName?.includes('Curie')) return 'CURIE';
    if (opponentName?.includes('Lavoisier')) return 'LAVOISIER';
    if (aiLevel === 'EXPERT') return 'BETA';
    return 'ALPHA';
  }

  /**
   * Numeric priority tier for quip events (higher = more urgent)
   * 3: Match resolution & game-ending events (DEFEAT, VICTORY, SURRENDER)
   * 2: High-impact summon & tactical milestones (SYNCHRO, XYZ, PENDULUM, RITUAL, LINK, LOW_LP, DIRECT_ATTACK, HABER, THERMITE)
   * 1: Routine battle interactions (MATCH_START, REACTION)
   */
  public static getEventPriority(event: QuipTriggerEvent): number {
    switch (event) {
      case 'DEFEAT':
      case 'VICTORY':
      case 'SURRENDER':
        return 3;
      case 'LOW_LIFE_POINTS':
      case 'SYNCHRO_SUMMON':
      case 'XYZ_SUMMON':
      case 'PENDULUM_SUMMON':
      case 'RITUAL_SUMMON':
      case 'FUSION_SUMMON':
      case 'LINK_SUMMON':
      case 'HABER_ACTIVATION':
      case 'THERMITE_ACTIVATION':
      case 'DIRECT_ATTACK':
        return 2;
      case 'MATCH_START':
      case 'REACTION':
      default:
        return 1;
    }
  }

  /**
   * Determines whether an incoming quip should immediately preempt, queue, or be ignored
   */
  public static evaluateQuipDispatch(
    currentEvent: QuipTriggerEvent | null,
    incomingEvent: QuipTriggerEvent,
    elapsedSinceCurrentMs: number,
    minQuipDisplayMs: number = 2500
  ): 'DISPATCH' | 'QUEUE' | 'IGNORE' {
    if (!currentEvent || elapsedSinceCurrentMs >= minQuipDisplayMs) {
      return 'DISPATCH';
    }

    const currentPriority = this.getEventPriority(currentEvent);
    const incomingPriority = this.getEventPriority(incomingEvent);

    // Urgent game resolution immediately preempts everything
    if (incomingPriority === 3 && currentPriority < 3) {
      return 'DISPATCH';
    }

    // High impact events preempt routine battle dialogue after brief 1s reading window
    if (incomingPriority > currentPriority && elapsedSinceCurrentMs >= 1000) {
      return 'DISPATCH';
    }

    // If incoming event is high or medium priority, queue it to show once current quip completes
    if (incomingPriority >= 2) {
      return 'QUEUE';
    }

    // Routine lower-priority events are skipped during high-intensity moments
    return 'IGNORE';
  }
}

/**
 * Robust Quip Queue Manager for fast multi-chain cascades and pedagogical dialogue
 */
export class QuipQueueManager {
  private activeQuip: CharacterQuip | null = null;
  private activeEvent: QuipTriggerEvent | null = null;
  private activeStartTime: number = 0;
  private pendingQueue: { persona: ChemistPersona; event: QuipTriggerEvent }[] = [];
  private maxQueueLength: number = 3;

  public requestQuip(
    persona: ChemistPersona,
    event: QuipTriggerEvent,
    now: number = Date.now()
  ): { action: 'DISPATCH' | 'QUEUED' | 'DROPPED'; quip?: CharacterQuip } {
    const elapsed = this.activeQuip ? now - this.activeStartTime : Infinity;
    const decision = CharacterQuipEngine.evaluateQuipDispatch(this.activeEvent, event, elapsed);

    if (decision === 'DISPATCH') {
      const quip = CharacterQuipEngine.getQuip(persona, event);
      this.activeQuip = quip;
      this.activeEvent = event;
      this.activeStartTime = now;
      return { action: 'DISPATCH', quip };
    } else if (decision === 'QUEUE') {
      if (this.pendingQueue.length < this.maxQueueLength) {
        this.pendingQueue.push({ persona, event });
        return { action: 'QUEUED' };
      }
      return { action: 'DROPPED' };
    }

    return { action: 'DROPPED' };
  }

  public advanceQueue(now: number = Date.now()): CharacterQuip | null {
    if (this.pendingQueue.length === 0) {
      this.activeQuip = null;
      this.activeEvent = null;
      return null;
    }

    const next = this.pendingQueue.shift()!;
    const quip = CharacterQuipEngine.getQuip(next.persona, next.event);
    this.activeQuip = quip;
    this.activeEvent = next.event;
    this.activeStartTime = now;
    return quip;
  }

  public getActiveQuip(): CharacterQuip | null {
    return this.activeQuip;
  }

  public getQueueLength(): number {
    return this.pendingQueue.length;
  }

  public clear(): void {
    this.activeQuip = null;
    this.activeEvent = null;
    this.activeStartTime = 0;
    this.pendingQueue = [];
  }
}
