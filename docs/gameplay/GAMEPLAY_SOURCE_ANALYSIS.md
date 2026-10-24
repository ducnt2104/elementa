# ELEMENTA — PHÂN TÍCH VÀ TÁI DỰNG THIẾT KẾ GAMEPLAY GỐC (GAMEPLAY SOURCE ANALYSIS)

**Tài liệu tham chiếu tối thượng:**
1. *Official Yu-Gi-Oh! TRADING CARD GAME Rulebook Version 10* (Konami Digital Entertainment).
2. *Cẩm Nang Toàn Diện Cơ Chế Gameplay Yu-Gi-Oh! (Master Rule 2020/2021 Update, 10 Summoning Mechanics, Fast Effect Timing, Damage Step 5 Substeps & PSCT Grammar)* do người dùng cung cấp trực tiếp.
3. *Đặc tả Thiết Kế & Hóa Học Độc Bản ELEMENTA* (`docs/CARD_BATTLE_RULES.md`, `docs/CARD_SYSTEM.md`, `docs/MOBA_GAMEPLAY_SPEC.md`, `docs/CHEMISTRY_DATA.md`).

**Ngày khởi tạo:** 2026-10-22T12:47:52+07:00  
**Tình trạng:** Nguồn yêu cầu chuẩn mực cho toàn bộ chiến dịch tái thiết lập và nâng cấp sâu 10 giờ.

---

## 1. TẦM NHÌN VÀ BẢN SẮC GAMEPLAY (GAMEPLAY VISION & IDENTITY)

ELEMENTA là sự kết hợp mang tính đột phá giữa **chiều sâu chiến thuật đối kháng đỉnh cao của TCG (Yu-Gi-Oh! Master Rule v10 / 2020/2021)** và **tính tất định, chuẩn xác tuyệt đối của Khoa học Hóa học Thực nghiệm (GDPT 2018 / IUPAC)**.

Khác với các tựa game MOBA hay thẻ bài giả tưởng thông thường, nơi sát thương và bùa lợi chỉ là những con số trừu tượng do nhà phát triển tùy tiện gán ghép:
1. **Linh hồn Thẻ bài là Nguyên tố & Hợp chất thực:** Mỗi quái thú nguyên tố mang số hiệu nguyên tử $Z$, khối lượng nguyên tử $M$, cấu hình electron và độ âm điện thực tế.
2. **Quy tắc Master Rule v10 chuẩn xác:** Trò chơi áp dụng trọn vẹn bộ khung luật thi đấu quốc tế: Bàn đấu 5 Main Monster Zones + 2 Extra Monster Zones (EMZ), 5 Spell & Trap Zones tích hợp 2 Pendulum Zones, 1 Field Zone, Graveyard và Banished Zone; cấu trúc 6 Pha của lượt đấu; chuỗi phản ứng (Chains) phân cấp theo 3 bậc Tốc độ Phép (Spell Speed 1, 2, 3) với nguyên lý giải quyết ngược (LIFO); 5 mốc thời gian vi mô trong Damage Step; và cú pháp thẻ bài chuẩn hóa PSCT (Problem-Solving Card Text).
3. **Phản ứng Hóa học là Cơ chế Triệu hồi & Kích hoạt Thẻ:**
   - **Fusion / Compound Synthesis:** Đòi hỏi đúng tỷ lệ phân tử các nguyên tố trên sân và điều kiện nhiệt độ/môi trường ($2H_2 + O_2 \xrightarrow{t^\circ} 2H_2O$).
   - **Link Summoning:** Dựa trên hóa trị liên kết cộng hóa trị (Covalent Link) và liên kết phối trí.
   - **Xyz Summoning:** Ghép các nguyên tố cùng chu kỳ hoặc cùng trạng thái số oxi hóa thành phức chất đa nhân (Overlaying Valence Clusters).
   - **Synchro Summoning:** Tương tác giữa 1 hạt kích hoạt (Tuner Catalyst) và các chất nền (Non-Tuner Substrates) có tổng mức năng lượng hạt/Level khớp chính xác.
   - **Pendulum Summoning:** Thiết lập khoảng pH hoặc thế điện cực giữa 2 điện cực/thang đo Pendulum để phóng thích hàng loạt ion từ tay và Extra Deck.

---

## 2. VÒNG LẶP CHƠI CHÍNH (CORE GAMEPLAY LOOP)

Vòng lặp chơi cốt lõi (Core Loop) diễn ra qua 5 mắt xích khép kín:
```
[1. Khảo sát & Rút Bài (Draw / Resource Phase)]
                 │
                 ▼
[2. Chuẩn bị Môi Trường & Hiệu Ứng Bắt Buộc (Standby Phase / Field Hazards)]
                 │
                 ▼
[3. Triển khai Chiến thuật (Main Phase 1: Normal/Special/Extra Deck Summons, Set Spell/Trap)]
                 │
                 ▼
[4. Giao chiến & Phản ứng Chuỗi (Battle Phase: Start -> Battle Step <-> Damage Step 5 Substeps -> End)]
                 │
                 ▼
[5. Củng cố Thế trận & Kiểm soát Giới hạn (Main Phase 2 -> End Phase: Hand Size Limit 6)]
```

- **Mục tiêu trước mắt:** Kiểm soát bàn đấu, bảo vệ điểm gốc LP (8,000), loại bỏ quái thú đối phương, thiết lập bẫy bí mật (Set Traps).
- **Mục tiêu dài hạn:** Tập hợp đủ chuỗi nguyên liệu hóa học để kích hoạt siêu phản ứng (Thermite 3,000°C, Haber-Bosch 200 atm, Aqua Regia hòa tan kim loại quý) hoặc triệu hồi các Quái thú Hợp chất / Extra Deck tối thượng để dứt điểm trận đấu.

---

## 3. CÁC CHẾ ĐỘ CHƠI (GAME MODES)

1. **Chiến Trường Đối Kháng Thẻ Bài TCG (Tactical Duel Arena):** Chế độ đấu thẻ bài 1v1 chuẩn quốc tế (Player vs AI / PvP) với đầy đủ 8,000 LP, 6 Phases, Extra Monster Zones, Chuỗi Chain Spell Speed 1-3, Fast Effect Timing Boxes A-E, và hệ thống xếp hạng Elo.
2. **Chiến Dịch Thủ Lĩnh Môi Trường (Campaign Boss Battles):** 5 chương tương ứng với 5 môi trường phản ứng khắc nghiệt (Mưa Axit $pH=2.8$, Núi lửa Nhiệt Nhôm $900\text{ K}$, Lãnh địa Hàn Băng $240\text{ K}$, Phòng thí nghiệm Cao áp Haber 200 atm, Thánh địa Đệm Sinh học $pH=7.4$).
3. **Câu Đố Hóa Học Chiến Thuật (Environment Puzzles):** Các kịch bản thử thách đòi hỏi người chơi giải quyết khủng hoảng môi trường bằng đúng một tổ hợp phản ứng trong 1 lượt duy nhất.
4. **Hệ Thống Đấu Giải 16 Đấu Thủ (Single-Elimination Tournament Bracket):** 16 nhà hóa học huyền thoại (Mendeleev, Lavoisier, Curie, Dalton, v.v.) thi đấu phân định ngôi vô địch với thuật toán Elo FIDE.
5. **Đấu Trường MOBA 2D/2.5D Hóa Học Thời Gian Thực (ELEMENTA MOBA Arena):** Điều khiển tướng nguyên tố di chuyển thời gian thực, thi triển chiêu thức kỹ năng nguyên tố, kết hợp phản ứng hóa học AoE trên bản đồ, hạ gục trụ và căn cứ đối phương.

---

## 4. ĐIỀU KIỆN BẮT ĐẦU VÀ KẾT THÚC (START & END CONDITIONS)

### 4.1. Điều kiện Bắt đầu (Preparation)
- Mỗi người chơi sở hữu Main Deck từ **40 đến 60 lá**, Extra Deck tối đa **15 lá**, Side Deck tối đa **15 lá**.
- Giới hạn tối đa **3 bản sao** cho mỗi lá bài trùng tên trên toàn bộ 3 bộ bài cộng lại.
- Mỗi bên khởi đầu với **8,000 LP**.
- Rút **5 lá bài khởi điểm** (Starting Hand) từ đỉnh Main Deck.
- Xác định người đi trước / đi sau bằng tung đồng xu hoặc oẳn tù tì.
- **Quy tắc Lượt 1 Đặc biệt:** Người đi đầu tiên ở Lượt 1 (Turn 1) **KHÔNG ĐƯỢC rút bài** trong Draw Phase và **KHÔNG ĐƯỢC tiến hành Battle Phase**.

### 4.2. Ba Điều Kiện Chiến Thắng Tuyệt Đối (Victory Conditions)
1. **Triệt tiêu LP đối phương về 0:** Đưa LP đối thủ từ 8,000 về 0 thông qua sát thương chiến đấu hoặc sát thương hiệu ứng.
2. **Xử thua do Hết bài (Deck-out):** Khi đến thời điểm bắt buộc phải rút bài mà Main Deck không còn bài để rút, đấu thủ đó lập tức bị xử thua ván đấu.
3. **Chiến thắng bằng Hiệu ứng Đặc biệt (Special Card Effect):** Thỏa mãn điều kiện chiến thắng đặc biệt được quy định trên lá bài (như tổng hợp đủ tổ hợp vật chất đặc thù).
- **Hòa Trận (Draw):** Khi cả hai đấu thủ cùng bị giảm về 0 LP tại cùng một thời điểm.

---

## 5. LUẬT ĐIỀU KHIỂN & VÙNG BÀN ĐẤU (GAME MAT & CONTROL RULES)

Bàn đấu chuẩn hóa gồm 2 nửa sân đối xứng (Mỗi bên quản lý các vùng sau):
- **5 Main Monster Zones:** Đặt quái thú ở 3 tư thế:
  1. *Ngửa Tấn công (Face-up Attack):* Đặt dọc, ngửa mặt.
  2. *Ngửa Phòng thủ (Face-up Defense):* Đặt ngang, ngửa mặt.
  3. *Úp Phòng thủ (Face-down Defense):* Đặt ngang, úp mặt.
  *(Tuyệt đối cấm đặt quái thú ở tư thế Úp Tấn công).*
- **2 Extra Monster Zones (EMZ - Nằm ở ranh giới giữa 2 sân):** 
  - Mỗi đấu thủ bình thường chỉ được chiếm 1 trong 2 ô EMZ.
  - Quái thú Link và Pendulum Monster triệu hồi từ Extra Deck bắt buộc phải đặt vào EMZ hoặc vào ô Main Monster Zone có mũi tên đỏ của Link Monster chỉ tới (Linked Zone).
  - Quái thú Fusion, Synchro, Xyz theo Master Rule 2020/2021 được tự do triệu hồi vào EMZ hoặc bất kỳ Main Monster Zone nào còn trống.
- **5 Spell & Trap Zones:**
  - Ô số 0 (ngoài cùng bên trái) và Ô số 4 (ngoài cùng bên phải) kiêm nhiệm chức năng **Pendulum Zones** khi kích hoạt lá bài Pendulum Monster vào đó dưới dạng Spell.
- **1 Field Zone:** Nơi đặt Phép Môi Trường (Field Spell).
- **Graveyard (GY) & Banished Zone:** Vùng công khai (Public Knowledge). Không được xáo trộn thứ tự bài trong GY.
- **Extra Deck Zone:** Chứa quái thú Fusion, Synchro, Xyz, Link (úp) và Pendulum Monster trở về từ sân (ngửa mặt).

---

## 6. HỆ THỐNG NHÂN VẬT & QUÁI THÚ (MONSTER SYSTEM)

Mỗi Quái thú được xác định bởi các thuộc tính:
- **Tên bài (Name) & Tên tiếng Anh (Name EN)**
- **Số hiệu Nguyên tử (Atomic Number Z) / Công thức Hóa học (Formula)**
- **Thuộc tính (Attribute):** PYRO (Hỏa/Nhiệt), AQUA (Thủy/Dung dịch), TERRA (Thổ/Chất rắn/Kết tủa), AERO (Phong/Khí), ELECTRO (Lôi/Điện thế), ACID_DARK (Acid/Ăn mòn), NOBLE_VOID (Khí hiếm/Bền vững trơ).
- **Cấp độ (Level 1–10) / Hạng (Xyz Rank) / Cấp Liên Kết (Link Rating 1–6)**
- **Chỉ số ATK (Công) & DEF (Thủ):** (Lưu ý: Quái thú Link KHÔNG CÓ chỉ số DEF).
- **4 Phân Nhóm Hiệu Ứng Quái Thú (Effect Categories):**
  1. *Continuous Effect (Hiệu ứng Duy trì):* Tự động kích hoạt khi ngửa trên sân, chấm dứt ngay khi rời sân, không tạo Chain.
  2. *Ignition Effect (Hiệu ứng Khởi động):* Tuyên bố kích hoạt trong Main Phase (Open Game State), Spell Speed 1, thường có chi phí (Cost).
  3. *Trigger Effect / Flip Effect (Hiệu ứng Kích hoạt / Hiệu ứng Lật):* Tự động kích hoạt khi có sự kiện xảy ra, Spell Speed 1, kích hoạt được trong cả lượt đối phương theo cơ chế SEGOC.
  4. *Quick Effect (Hiệu ứng Nhanh):* Có từ khóa `(Quick Effect):`, Spell Speed 2, kích hoạt được ở mọi Phase và nối trực tiếp vào Chain.

---

## 7. HỆ THỐNG CHIẾN ĐẤU & GIAO CHIẾN (COMBAT SYSTEM)

### 7.1. Cấu trúc 4 Bước của Battle Phase
```
[Start Step] ──> [Battle Step] <─── Replay (nếu số lượng quái đối phương thay đổi)
                       │
                       ▼
                 [Damage Step] (5 Mốc thời gian vi mô)
                       │
                       ▼
                 [End Step]
```

### 7.2. Giải phẫu 5 Mốc Thời gian trong Damage Step (Damage Step Rules)
1. **Mốc 1: Start of the Damage Step (Đầu Damage Step):**
   - Rời khỏi Battle Step, cửa sổ Replay chính thức đóng hoàn toàn.
   - Kích hoạt các hiệu ứng ghi rõ "at the start of the Damage Step".
   - Cho phép các Fast Effect cộng/trừ ATK/DEF trực tiếp.
2. **Mốc 2: Before Damage Calculation (Trước khi tính sát thương):**
   - Quái thú bị tấn công nếu đang Úp Phòng thủ sẽ **LẬT NGỬA LÊN** ngay tại đây (Hiệu ứng Continuous có tác dụng, nhưng FLIP chưa kích hoạt).
   - **HẠN CHÓT CUỐI CÙNG** để kích hoạt các Fast Effect thay đổi ATK/DEF (Forbidden Droplet, v.v.).
3. **Mốc 3: Perform Damage Calculation (Thực hiện tính sát thương):**
   - Chỉ cho phép hiệu ứng ghi đích danh "during damage calculation" hoặc Counter Trap phủ nhận kích hoạt.
   - So sánh ATK vs ATK (hoặc ATK vs DEF), trừ LP ngay lập tức.
   - Đánh dấu xác định quái thú bị tiêu diệt bởi chiến đấu (nhưng chưa gửi xuống GY).
4. **Mốc 4: After Damage Calculation (Sau khi tính sát thương):**
   - Kích hoạt và giải quyết **Hiệu ứng FLIP** và các hiệu ứng "when this card is flipped face-up".
   - Kích hoạt hiệu ứng "when this card battles" hoặc "when battle damage is inflicted".
5. **Mốc 5: End of the Damage Step (Cuối Damage Step):**
   - Gửi quái thú bị đánh dấu tiêu diệt xuống GY.
   - Kích hoạt các Trigger Effects "when a monster is destroyed by battle and sent to the GY".

### 7.3. Quy tắc Tính Sát Thương Chiến Đấu (Battle Damage)
- Tấn công quái thú Tư thế Tấn công:
  - $ATK_{công} > ATK_{thủ}$: Quái thủ bị tiêu diệt, đối phương mất LP $= ATK_{công} - ATK_{thủ}$.
  - $ATK_{công} = ATK_{thủ}$: Cả hai quái thú cùng bị tiêu diệt, không ai mất LP (Ngoại lệ: Nếu cả hai có 0 ATK, không quái thú nào bị tiêu diệt).
  - $ATK_{công} < ATK_{thủ}$: Quái công bị tiêu diệt, bạn mất LP $= ATK_{thủ} - ATK_{công}$.
- Tấn công quái thú Tư thế Phòng thủ:
  - $ATK_{công} > DEF_{thủ}$: Quái thủ bị tiêu diệt, không bên nào mất LP (trừ khi có hiệu ứng Xuyên giáp Piercing).
  - $ATK_{công} = DEF_{thủ}$: Không quái nào bị tiêu diệt, 0 sát thương.
  - $ATK_{công} < DEF_{thủ}$: Không quái nào bị tiêu diệt, bạn mất LP $= DEF_{thủ} - ATK_{công}$.
- Tấn công Trực diện (Direct Attack): Đối phương không có quái thú (kể cả ở EMZ), mất toàn bộ LP bằng $ATK_{công}$.

---

## 8. HỆ THỐNG KỸ NĂNG, BÃY & PHÉP (SPELL & TRAP SYSTEM)

- **Phép Thường (Normal Spell - SS1):** Kích hoạt trong Main Phase, giải quyết xong gửi xuống GY.
- **Phép Trang Bị (Equip Spell - SS1):** Gắn vào 1 quái thú ngửa trên sân, chiếm 1 ô Spell & Trap. Khi quái thú rời sân hoặc bị úp, Equip Spell tự động bị tiêu diệt.
- **Phép Môi Trường (Field Spell - SS1):** Nằm ở Field Zone, duy trì ảnh hưởng toàn sân. Kích hoạt Field Spell mới sẽ gửi Field Spell cũ xuống GY (không tính là Destroy).
- **Phép Nhanh (Quick-Play Spell - SS2):** Kích hoạt trực tiếp từ tay ở mọi Phase trong lượt mình. Nếu Set úp xuống sân, không được kích hoạt trong lượt Set, nhưng từ lượt sau kích hoạt được trong cả lượt đối phương.
- **Bẫy Thường (Normal Trap - SS2):** Bắt buộc phải Set úp trước 1 lượt, kích hoạt được ở mọi Phase từ lượt tiếp theo.
- **Bẫy Vĩnh Cửu (Continuous Trap - SS2):** Duy trì trên sân sau khi kích hoạt. Nếu bị bắn nổ trước khi mắt xích giải quyết, hiệu ứng sẽ giải quyết vô hiệu.
- **Bẫy Phản Công (Counter Trap - SS3):** Tốc độ cao nhất (Spell Speed 3), chuyên phủ nhận việc kích hoạt hoặc phủ nhận triệu hồi. Chỉ có Counter Trap khác mới Chain được vào Counter Trap.

---

## 9. AI VÀ HÀNH VI ĐỐI THỦ (DUEL & MOBA AI ARCHITECTURE)

- **4 Cấp Độ Đấu Sĩ AI (Novice, Adept, Expert, Grandmaster Mendeleev):**
  - Đánh giá bàn đấu theo Utility AI: So sánh tổng ATK/DEF trên sân, số lá bài trên tay, đếm nguyên liệu Extra Deck.
  - Chuyển đổi tư thế chiến đấu thông minh: Tự động chuyển quái thú chỉ số DEF cao (như Khí hiếm He, Ne) sang Face-up Defense, và chuyển quái thú chỉ số ATK cao sang Face-up Attack.
  - Quản lý Chain phản hồi: Giữ Counter Trap và Quick-Play Spell trong trạng thái Set để ngắt combo đối phương tại thời điểm vàng.
  - Tuân thủ nghiêm ngặt giới hạn tài nguyên và tầm nhìn, không gian lận đọc bài úp.

---

## 10. BẢN ĐỒ VÀ MỤC TIÊU CHIẾN LƯỢC (MAP & OBJECTIVES)

- **TCG Arena:** Bàn đấu Master Rule 2020/2021 đối xứng, tương tác với các bùa lợi môi trường từ Field Spells (Nhiệt độ $T$, Áp suất $P$, Độ $pH$).
- **MOBA Battlefield:** Bản đồ đối xứng 2 đường (Lanes), rừng (Jungle), căn cứ (Base Core), trụ bảo vệ (Turrets), bụi cỏ tàng hình (Bushes), và bãi quái hóa học trung lập (Buffer Golem, Thermite Drake).

---

## 11. HỆ THỐNG TÀI NGUYÊN (RESOURCES: MANA, CARDS & MATERIALS)

- **LP (Life Points):** 8,000 điểm khởi đầu.
- **Mana Tinh Thể Hóa Học:** Khởi đầu 1 Mana, tăng trưởng mỗi lượt tối đa 10 Mana.
- **Tài nguyên Thẻ Bài:** Tối đa 6 lá trên tay ở End Phase.
- **Vật liệu Triệu Hồi (Materials):** Tributes trên sân, Tuners/Non-Tuners, Xyz Materials gắn dưới bài, Link Materials gửi xuống GY, và Thang đo Pendulum.

---

## 12. HỆ THỐNG 10 PHƯƠNG THỨC TRIỆU HỒI QUÁI THÚ (10 SUMMONING MECHANICS)

1. **Normal Summon:** Cấp 1–4, từ tay, Ngửa Tấn công (tối đa 1 lần/lượt cùng với Tribute Summon).
2. **Normal Set:** Cấp 1–4, từ tay, Úp Phòng thủ (không tính là Summon, dùng chung lượt Normal Summon).
3. **Tribute Summon & Tribute Set:** Cấp 5–6 cần hiến tế 1 quái; Cấp 7+ cần hiến tế 2 quái.
4. **Flip Summon:** Lật thủ công quái thú Úp Phòng thủ sang Ngửa Tấn công (không được lật quái vừa Set trong cùng lượt).
5. **Special Summon (Inherent & Card Effect):** Gọi quái không giới hạn số lần thỏa mãn điều kiện.
6. **Ritual Summon:** Phép Nghi thức + Hiến tế quái trên tay/sân đủ Cấp độ.
7. **Fusion Summon / Compound Synthesis:** Dùng đúng nguyên liệu hóa học ghi trên bài + Phép Dung hợp hoặc Contact Fusion.
8. **Synchro Summon:** Gửi 1 Tuner + 1 hoặc nhiều Non-Tuner từ sân xuống GY có tổng Level bằng đúng Level Synchro.
9. **Xyz Summon:** Xếp chồng 2+ quái thú cùng Level làm Xyz Materials bên dưới Xyz Monster. Khi dùng hiệu ứng, "Detach" vật liệu xuống GY.
10. **Pendulum Summon:** 2 thẻ Pendulum ở ô 0 và ô 4. Triệu hồi đồng loạt quái thú từ tay và quái Pendulum ngửa từ Extra Deck có Level nằm giữa 2 chỉ số Scale (1 lần/lượt).
11. **Link Summon:** Gửi quái thú có tổng giá trị Link bằng đúng Link Rating vào ô EMZ hoặc Linked Zone (quái Link không có DEF).

---

## 13. HÓA HỌC, NGUYÊN TỐ & ĐỊNH LUẬT BẢO TOÀN (CHEMISTRY & STOICHIOMETRY)

- **Định luật Bảo toàn Khối lượng & Nguyên tố:** Mọi phản ứng tạo quái thú hợp chất phải bảo toàn số lượng nguyên tử mỗi bên.
- **Độ âm điện & Liên kết:** Hiệu độ âm điện $\Delta \chi$ quyết định bản chất liên kết (Cộng hóa trị không cực, có cực, hoặc Ion).
- **Nhiệt Hóa Học ($\Delta_r H^\circ_{298}$):** Phản ứng tỏa nhiệt giải phóng năng lượng gia tăng ATK hoặc gây sát thương thiêu đốt; phản ứng thu nhiệt đóng băng Mana đối phương.
- **Điện Hóa Học & Cặp Oxi Hóa - Khử:** Kim loại có thế điện cực chuẩn $E^\circ$ nhỏ hơn đẩy kim loại có $E^\circ$ lớn hơn ra khỏi dung dịch muối.

---

## 14. TƯƠNG TÁC GIỮA CÁC HỆ THỐNG (SYSTEM INTERACTIONS & CHAINS)

- **Chuỗi Phản Ứng (Chain Stack):** Áp dụng nghiêm ngặt nguyên lý LIFO (Last In, First Out). Mắt xích sau phải có Spell Speed $\ge$ mắt xích trước.
- **Fast Effect Timing (Boxes A-E):** Luồng ưu tiên chuẩn mực Konami giữa Turn Player và Opponent.
- **SEGOC (Simultaneous Effects Go On Chain):** Xếp các Trigger Effects kích hoạt đồng thời theo 4 tầng: (1) Bắt buộc của Turn Player $\to$ (2) Bắt buộc của Đối thủ $\to$ (3) Tùy chọn của Turn Player $\to$ (4) Tùy chọn của Đối thủ (kỹ thuật Chain Blocking).
- **Cú pháp PSCT:** 
  - Điều kiện : Thủ tục kích hoạt (Cost/Target) ; Giải quyết hiệu ứng.
  - 4 Liên từ: `then` (tuần tự, A cần cho B, B là sự kiện cuối), `and if you do` (đồng thời, A cần cho B, cả hai là sự kiện cuối), `also` (đồng thời, độc lập), `and` (đồng thời, all-or-nothing).

---

## 15. GIAO DIỆN & PHẢN HỒI CHO NGƯỜI CHƠI (UI/UX & GAMEPLAY FEEDBACK)

- **Bàn đấu Game Mat HUD:** Thể hiện rõ ràng 5 Main Monster Zones, 2 Extra Monster Zones trung tâm, 5 Spell/Trap Zones với ký hiệu Pendulum Scale tại ô 0 và 4, Field Zone, GY và Banished.
- **Damage Step Visual Indicators:** Hiển thị rõ các mốc 1-5, lật bài úp và trừ điểm sinh mệnh động.
- **Chain Stack Visualizer:** Hộp thoại hiển thị từng mắt xích Chain Link 1, 2, 3 với hiệu ứng giải quyết ngược sống động.

---

## 16. TIẾN TRÌNH VÀ PHẦN THƯỞNG (PROGRESSION & REWARDS)

- **Hệ thống Xếp hạng Rank MMR & Elo:** Phân cấp từ Bronze, Silver, Gold, Platinum đến Mendeleev Grandmaster.
- **Kinh tế Gacha Gói Bài (Booster Packs):** Tỷ lệ trúng bài minh bạch, bảo hiểm lá Rare ở slot 4, tái chế mảnh bài trùng lặp.
- **CA-SRS (Spaced Repetition Flashcards):** Tự động tổng hợp các lỗi sai nhận thức hóa học thành thẻ ghi nhớ ôn tập ngắt quãng.

---

## 17. NGOẠI LỆ VÀ TRƯỜNG HỢP BIÊN (EXCEPTIONS & EDGE CASES)

1. **Quy tắc Properly Special Summoned First:** Quái thú Extra Deck hoặc Ritual nếu bị gửi trực tiếp từ Extra Deck hoặc Tay xuống GY mà chưa từng được triệu hồi đúng chuẩn thì KHÔNG ĐƯỢC phép hồi sinh bằng Monster Reborn.
2. **Bản chất Xyz Materials:** Xyz Materials nằm dưới quái thú không được tính là "lá bài trên sân". Khi Detach xuống GY không kích hoạt hiệu ứng "leaves the field".
3. **Quy tắc Pendulum rơi sân:** Lá bài Pendulum trên sân khi bị phá hủy hoặc làm nguyên liệu sẽ đi ngửa lên Extra Deck thay vì xuống GY.
4. **Quái thú 0 ATK:** Hai quái thú cùng có 0 ATK tấn công lẫn nhau thì KHÔNG quái thú nào bị tiêu diệt.
5. **Cơ chế Lỡ Nhịp (Missing the Timing):** Hiệu ứng `When...: You can...` sẽ bị lỡ nhịp nếu điều kiện xảy ra ở Chain Link 2+ hoặc trước liên từ `then`.

---

## 18. CÁC CƠ CHẾ NÂNG CẤP BỔ SUNG TRONG CHIẾN DỊCH NÀY (PROPOSED EXTENSIONS)

- Bổ sung cấu trúc dữ liệu `extraMonsterZones` (2 ô trung tâm) và `pendulumZones` vào `DuelistState`.
- Bổ sung các phương thức triệu hồi chuẩn Master Rule: `xyzSummon`, `synchroSummon`, `pendulumSummon`, `ritualSummon`.
- Tinh chỉnh `declareAttack` để tích hợp đầy đủ 5 bước Damage Step và cơ chế Replay khi đối phương thay đổi số quái thú trên sân.
- Cập nhật luồng Chain Resolver hỗ trợ SEGOC và nhận diện liên từ PSCT.
- Nâng cấp bộ test suite tự động kiểm chứng 100% các luật chơi mới.
