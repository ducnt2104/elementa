# ELEMENTA — NHẬT KÝ KỸ THUẬT & TIẾN ĐỘ THỰC THI (ENGINEERING WORK LOG)
## Chế độ: Autonomous Long-Running Engineering
**Khởi tạo:** 2026-10-20  
**Tần suất cập nhật:** Sau mỗi chu trình hoàn thành một tính năng có kiểm chứng

---

### [CYCLE 001] — XÂY DỰNG NỀN TẢNG MOBA ARENA & HỆ THỐNG PHẢN ỨNG THỜI GIAN THỰC
- **Mục tiêu:** Chuyển đổi từ mô hình đấu thẻ bài theo lượt sang Đấu trường MOBA thời gian thực 2D 60 FPS với 3 đường, lính, trụ, căn cứ và tích hợp phản ứng hóa học trực tiếp trong combat.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/game/types.ts`: Toàn bộ cấu trúc kiểu dữ liệu MOBA (Vector2D, HeroDefinition, MinionEntity, TurretEntity, ElementalCoreEntity, ProjectileEntity, AreaOfEffectEntity, ChemicalItem, MobaMatchDebrief).
  - `src/game/data/heroesData.ts`: 8 vị tướng nguyên bản với đầy đủ chỉ số, 4 chiêu thức + nội tại, nguyên lý hóa học và dữ kiện IUPAC.
  - `src/game/data/itemsData.ts`: 11 trang bị hóa học trong Cửa hàng MOBA (Bauxit, Pt, BaSO₄, Fe₃O₄, NaOH...).
  - `src/game/maps/periodicRiftMap.ts`: Bản đồ 2400x2400, 3 đường Top/Mid/Bot waypoints, 12 trụ tháp, 2 Core, sông H₂O, bụi rậm, đá cản.
  - `src/game/engine/mobaEngine.ts`: Vòng lặp mô phỏng 60 Hz, kinematics, đợt lính mỗi 25s, quét laser trụ tháp, phát hiện phản ứng trên sông H₂O, điều kiện thắng thua.
  - `src/game/ai/mobaBotAi.ts`: Utility AI cho 9 bot (farm lính, né chiêu, kéo lùi kiting, combo, rút lui khi < 28% máu).
  - `src/game/rendering/mobaRenderer.ts`: Canvas 2D engine độ phân giải cao, camera lerp mượt mà, vẽ địa hình, minimap tương tác, thanh máu/năng lượng, floating damage text.
  - `src/components/moba/MobaArenaTab.tsx`: Giao diện đấu trường hoàn chỉnh với Top bar, Bottom ability HUD, phím tắt Q/W/E/R/D/F/B/P/Tab/Space, minimap, sandbox cheats.
  - `src/components/moba/HeroSelectModal.tsx`: Màn hình draft chọn 8 tướng, tùy chọn 5 chế độ chơi và 3 mức độ khó AI.
  - `src/components/moba/MobaDebriefModal.tsx`: Màn hình tổng kết KDA, thống kê các phản ứng kích hoạt trong trận và nạp tự động vào CA-SRS.
  - `src/components/TeacherDashboardTab.tsx`: Bảng điều khiển sư phạm phân tích điểm nóng hiểu lầm, so sánh Pre/Post test, xuất CSV & JSON.
  - `src/components/TutorialLabTab.tsx`: Phòng thực hành huấn luyện thao tác và 4 thí nghiệm thực nghiệm.
  - `src/components/ReactionCompendiumModal.tsx`: Tra cứu Cẩm Nang Phản Ứng Hóa Học (Phần I - VI).
  - `src/audio/soundEngine.ts`: Bổ sung bộ tổng hợp âm thanh `playTurretShot`, `playSpellCast`, `playReactionSuccess`.
  - `src/App.tsx` & `src/components/Navbar.tsx`: Tích hợp toàn diện 10 phân hệ màn hình.
- **Bằng chứng kiểm thử:**
  - `test-engine.mjs`: 41/41 test pass.
  - `test-moba.mjs`: 96/96 test pass.
  - `npm run build`: 1613 modules compiled cleanly, 0 lỗi TypeScript.
  - Dev server chạy thành công tại `http://localhost:3000/` (HTTP 200 OK).

---

### [CYCLE 002] — BỘ MÁY TÍNH HÓA HỌC, CÂN BẰNG HÓA LƯỢNG & OXI HÓA KHỬ
- **Mục tiêu:** Cung cấp công cụ tính toán hóa học khoa học tuân thủ chuẩn GDPT 2018 ($V = n \times 24.79\text{ L}$ ở 25°C, 1 bar) và IUPAC, giải quyết bài toán chất hết/chất dư và phân tích bán phản ứng oxi hóa - khử.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/domain/chemicalCalculator.ts`: Bộ tính khối lượng mol nguyên tử/phân tử (IUPAC), chuyển đổi mol $n = m/M$, thể tích khí ($24.79\text{ L}$ vs $22.4\text{ L}$), nồng độ mol $C_M$, nồng độ phần trăm $C\%$, và giải toán chất phản ứng hết/chất dư có kiểm tra phương trình bảo toàn.
  - `src/domain/redoxEngine.ts`: Gán số oxi hóa chuẩn, xác định chất khử (nhường electron) và chất oxi hóa (thu electron), biểu diễn bán phản ứng nửa cặp (half-reactions) cho học sinh lớp 10.
  - `src/components/chemistry/ChemicalCalculatorModal.tsx`: Giao diện tương tác 4 tab (Khối Lượng & Mol, Nồng Độ Dung Dịch, Cân Bằng Hóa Lượng, Phân Tích Oxi Hóa - Khử).
  - `src/components/Navbar.tsx` & `src/App.tsx`: Tích hợp nút mở Máy Tính Hóa Học trên thanh điều hướng toàn cầu.
  - `test-chemistry-calculator.mjs`: Bộ kiểm thử 21 trường hợp xác minh toàn bộ các công thức hóa học và thuật toán va chạm AABB.
- **Bằng chứng kiểm thử:**
  - `test-chemistry-calculator.mjs`: 21/21 test pass.

---

### [CYCLE 003] — SƯƠNG MÙ CHIẾN TRANH (FOG OF WAR), TẦM NHÌN BỤI RẬM & QUÁI RỪNG TƯƠNG TÁC
- **Mục tiêu:** Hiện thực hóa cơ chế tầm nhìn chiến thuật (Fog of War & Brush Concealment), hiệu ứng nhận diện đồ họa đặc trưng cho 8 tướng nguyên tố, và hệ thống quái rừng AI có phản công, kéo về hồi máu (leashing), và thưởng bùa lợi hóa học toàn đội.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/game/engine/mobaEngine.ts`:
    - Bổ sung `getBrushAt(pos)` và `isEntityVisibleToTeam(pos, targetTeam, observerTeam)` kiểm tra tầm nhìn chính xác: đồng minh luôn thấy nhau; bụi rậm che khuất tầm nhìn trừ khi đồng minh vào cùng bụi rậm, tiếp cận cận chiến $\le 110$ đơn vị, hoặc trong tầm quét True Sight của trụ tháp ($\le 350$ đơn vị).
    - Sửa thuật toán va chạm AABB (`resolveCircleAabbCollision`) xử lý trường hợp tâm vòng tròn nằm sâu bên trong khối cản bằng cách đẩy ra cạnh gần nhất.
    - Phát triển vòng lặp AI cho quái rừng (`updateMonsters`): nhận diện tướng vào chu vi đe dọa, đuổi theo tấn công, cơ chế leashing nếu bị kéo xa $> 420$ đơn vị từ ổ quái thì tự quay về và hồi máu nhanh.
    - Cơ chế kỹ năng quái: Boss Giám Hộ Xúc Tác quét xung lực nổ hóa học diện rộng; Thằn Lằn Axit gây DoT ăn mòn axit $Cl^-$; Người Đá Tinh Thể gây làm chậm lắng đọng $BaSO_4$.
    - Phân phối bùa lợi khi hạ quái: `CATALYST_BUFF` (+30% AP, giảm hồi chiêu, tăng sát thương phản ứng) cho toàn đội khi hạ Boss; `ACID_AURA` và `CRYSTAL_ARMOR` (+250 máu ảo, +20 giáp) cho người hạ quái.
  - `src/game/rendering/mobaRenderer.ts`:
    - Tạo lớp phủ bóng tối Sương mù Chiến tranh (Fog of War ambient shroud) bằng kỹ thuật Canvas 2D offscreen `destination-out`, khoét lỗ sáng mượt mà xung quanh tướng, trụ và lính đồng minh.
    - Ẩn tướng địch, lính địch và quái rừng trên cả màn hình chiến đấu lẫn trên bản đồ mini (Minimap) khi ngoài tầm nhìn.
    - Vẽ hiệu ứng quỹ đạo nguyên tố đặc trưng (`drawHeroSignatureAura`): Tia lửa điện Na, 4 lưỡi kiếm sắt từ tính Fe, khói khí Clo $Cl_2$, vòng dẫn điện Đồng Cu, khiên oxit lục giác Nhôm $Al_2O_3$, 3 quả cầu lửa Oxi/Ozon $O_3$, luồng phản lực Hiđro H, vòng hào quang BaSO₄ của Bari Ba.
    - Hiển thị nhãn trạng thái `🌿 ẨN BỤI` trên đầu tướng khi đang nấp trong bụi rậm.
  - `src/game/ai/mobaBotAi.ts`: Tích hợp bộ lọc tầm nhìn `visibilityChecker` vào AI bot, ngăn bot gian lận nhắm mục tiêu vào kẻ địch đang ẩn trong bụi hoặc ngoài tầm nhìn.
  - `test-moba.mjs`: Mở rộng thêm 18 bài test tự động cho Sương Mù Chiến Tranh, Bụi Rậm, True Sight, và Quái Rừng AI (tổng cộng 114 test pass).
- **Bằng chứng kiểm thử:**
  - `test-engine.mjs`: 41/41 test pass.
  - `test-moba.mjs`: 114/114 test pass.
  - `test-chemistry-calculator.mjs`: 21/21 test pass.
  - Tổng số test tự động: **176/176 PASS (0 FAILED)**.
  - `npm run build`: 1617 modules compiled cleanly, 0 lỗi TypeScript.
  - PWA Manifest và Service Worker đã cấu hình sẵn sàng cho trải nghiệm offline.

---

### [CYCLE 004] — NHIỆT HÓA HỌC, ĐỘNG HỌC PHẢN ỨNG & HIỆU ỨNG RUNG CHẤN (SCREEN SHAKE / JUICE VFX)
- **Mục tiêu:** Tích hợp phân hệ Nhiệt hóa học (Enthalpy tạo thành $\Delta_f H^0_{298}$, biến thiên enthalpy phản ứng $\Delta_r H^0_{298}$) và Động học (Quy tắc Van 't Hoff, hạ năng lượng hoạt hóa $E_a$ của chất xúc tác Arrhenius) chuẩn GDPT 2018 Hóa học 10, kết hợp hiệu ứng chiến đấu rung chấn màn hình (Camera Screen Shake) và vệt đường đạn rực rỡ.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/domain/thermochemistryEngine.ts`: Cơ sở dữ liệu nhiệt tạo thành chuẩn cho 19 chất/hợp chất, thuật toán tính enthalpy phản ứng $\Delta_r H^0_{298} = \sum \nu_p \Delta_f H^0_{298}(\text{sản phẩm}) - \sum \nu_r \Delta_f H^0_{298}(\text{chất đầu})$, phân loại phản ứng tỏa nhiệt (Exothermic, $\Delta_r H < 0$) vs thu nhiệt (Endothermic, $\Delta_r H > 0$), tính toán tốc độ phản ứng theo quy tắc kinh nghiệm Van 't Hoff ($v_{T_2} / v_{T_1} = \gamma^{\frac{T_2 - T_1}{10}}$), và hệ số tăng tốc độ nhờ xúc tác theo phương trình Arrhenius ($k_{cat} / k_{orig} = e^{\Delta E_a / RT}$).
  - `src/components/chemistry/ChemicalCalculatorModal.tsx`: Bổ sung Tab thứ 5 "Nhiệt Hóa & Động Học" với máy tính enthalpy thời gian thực cho 6 phản ứng tiêu chuẩn giáo khoa, bộ tính hệ số nhiệt độ Van 't Hoff và mô phỏng hạ năng lượng hoạt hóa của xúc tác Pt.
  - `src/game/engine/mobaEngine.ts`: Thêm hệ thống chấn thương màn hình `screenShakeTrauma`, hàm `triggerScreenShake()` kích hoạt khi xảy ra phản ứng hóa học (trauma 8), hủy diệt trụ (trauma 14), hạ gục Boss trung lập (trauma 12), và sóng chấn động AoE của Boss (trauma 6).
  - `src/game/rendering/mobaRenderer.ts`: Xử lý độ lệch camera rung chấn ngẫu nhiên với tốc độ suy giảm mượt mà, gợn sóng nước sin động trên lòng sông H₂O, đường dẫn năng lượng phát sáng dọc tâm 3 đường lính, vệt khói và tia lửa điện định hướng theo vận tốc của đạn bay.
  - `src/components/TutorialLabTab.tsx`: Nâng cấp giao diện 5 bước hướng dẫn (Controls, MOBA Rules, Fog of War, Reactions, Thermochemistry & Catalyst) và 6 nút thí nghiệm trực quan trong buồng phản ứng.
  - `test-chemistry-calculator.mjs`: Bổ sung kiểm thử tự động cho enthalpy nhiệt nhôm, nung vôi, tổng hợp nước, quy tắc Van 't Hoff và gia tốc xúc tác.
- **Bằng chứng kiểm thử:**
  - `test-chemistry-calculator.mjs`: Đạt 29/29 test pass.

---

### [CYCLE 005] — CẤU TRÚC LƯỢNG TỬ ORBITAL, QUY TẮC HUND, ÂM THANH NÂNG CAO & ĐIỀU KHIỂN MOBA HOÀN THIỆN
- **Mục tiêu:** Xây dựng động cơ cấu hình electron và ô lượng tử orbital ($\uparrow\downarrow$) theo nguyên lý vững bền Klechkowski, nguyên lý loại trừ Pauli và quy tắc Hund; mở rộng bộ âm thanh Web Audio tổng hợp không dùng file ngoài; nâng cấp cơ chế điều khiển MOBA (Right-click Attack Command) và PWA Dynamic Cache 100% offline.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/domain/orbitalEngine.ts`:
    - Giải thuật phân bố electron theo nguyên lý vững bền Aufbau/Klechkowski ($1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...$).
    - Xử lý các trường hợp ngoại lệ bán bão hòa ($Cr: 3d^5 4s^1, Mo: 4d^5 5s^1$) và bão hòa hoàn toàn ($Cu: 3d^{10} 4s^1, Ag: 4d^{10} 5s^1, Au: 5d^{10} 6s^1$).
    - Thuật toán điền ô lượng tử tuân thủ nghiêm ngặt Quy tắc Hund (electron phân bố đơn độc spin-up $\uparrow$ trước để đạt độ bội cực đại, sau đó mới ghép đôi spin-down $\downarrow$).
    - Tự động nhận diện số electron hóa trị, electron độc thân, phân loại Kim loại / Phi kim / Khí hiếm / Bán kim, và dự đoán xu hướng hóa học (nhường/nhận e) cho học sinh lớp 10.
  - `src/components/visualizations/OrbitalBoxDiagram.tsx`: Giao diện trực quan hiển thị từng phân lớp orbital dưới dạng ô vuông với mũi tên electron $\uparrow\downarrow$, viền phát sáng phân lớp hóa trị ngoài cùng, badge số e độc thân và diễn giải sư phạm.
  - `src/components/PeriodicCodexTab.tsx`: Tích hợp Sơ đồ ô orbital lượng tử vào Tab Hồ Sơ Khoa Học khi tra cứu bất kỳ nguyên tố nào trong bảng tuần hoàn.
  - `src/audio/soundEngine.ts`:
    - Thêm `playChemicalDetonation(isExothermic)`: Âm trầm sub-bass rền rĩ 180Hz $\rightarrow$ 32Hz kết hợp luồng khí nén noise bùng nổ cho phản ứng tỏa nhiệt; hợp âm pha lê tinh thể băng cho phản ứng thu nhiệt.
    - Thêm `playTurretLaserSweep()`, `playNeutralMonsterRoar()`, `playLevelUp()`, `playRecall()`.
  - `src/game/engine/mobaEngine.ts`: Tích hợp âm thanh nổ phản ứng theo nhiệt hóa học, tiếng gầm quái rừng, tiếng lên cấp, và âm thanh biến về; bổ sung cơ chế tự động đuổi theo mục tiêu vào tầm đánh khi có lệnh tấn công.
  - `src/components/moba/MobaArenaTab.tsx`: Cải tiến chuột phải: nhấp chuột phải vào tướng địch, lính địch, trụ hoặc quái rừng sẽ chuyển thành Lệnh Tấn Công (Attack Command), hiển thị nhãn 'TẤN CÔNG!' và tiếp cận xả chiêu/đánh thường.
  - `public/sw.js`: Nâng cấp Service Worker với bộ nhớ đệm động (Dynamic Runtime Cache-First Strategy) tự động lưu trữ mọi gói script và style khi tải lần đầu, đảm bảo chơi offline 100% trong phòng học máy tính.
  - `test-chemistry-calculator.mjs`: Bổ sung Phần 9 kiểm thử cấu hình electron H, He, N (Hund 3e độc thân), Na, Cl, ngoại lệ Cr, Fe, Cu.
- **Bằng chứng kiểm thử:**
  - `test-engine.mjs`: 41/41 test pass.
  - `test-moba.mjs`: 114/114 test pass.
  - `test-chemistry-calculator.mjs`: 45/45 test pass.
  - Tổng số test tự động: **200/200 PASS (0 FAIL)**.
  - `npm run build`: 1620 modules compiled cleanly, 0 lỗi TypeScript.
  - Dev server HTTP 200 OK tại `http://localhost:3000/`.

---

### [CYCLE 006] — ĐỘNG CƠ LIÊN KẾT HÓA HỌC, THANG ĐỘ ÂM ĐIỆN PAULING & PHÒNG THÍ NGHIỆM MÔ HÌNH PHÂN TỬ SVG
- **Mục tiêu:** Hiện thực hóa trọn vẹn Chương 3 Hóa học 10 & KHTN 7 (Liên kết Hóa học): phân loại liên kết theo hiệu độ âm điện Pauling ($\Delta\chi$), cấu trúc Lewis, mô hình hình học phân tử và hoạt ảnh SVG động về sự hình thành liên kết ion và liên kết cộng hóa trị.
- **Các tệp đã tạo/chỉnh sửa:**
  - `src/domain/bondingEngine.ts`:
    - Cơ sở dữ liệu 10 chất/hợp chất kinh điển GDPT 2018 ($NaCl, MgO, H_2, O_2, N_2, HCl, H_2O, CO_2, NH_3, CH_4$).
    - Thuật toán phân loại theo thang Pauling: $\Delta\chi < 0.4$ (Cộng hóa trị không cực), $0.4 \le \Delta\chi < 1.7$ (Cộng hóa trị có cực), $\Delta\chi \ge 1.7$ (Liên kết ion).
    - Biểu diễn công thức Lewis, xác định số cặp electron liên kết, cặp electron tự do (lone pairs), bậc liên kết (Đơn, Đôi, Ba như $N\equiv N$ với năng lượng $945\text{ kJ/mol}$).
    - Hình học không gian phân tử: Tuyến tính $180^\circ$, Góc cong $104.5^\circ$ ($H_2O$), Chóp tam giác $107^\circ$ ($NH_3$), Tứ diện đều $109.5^\circ$ ($CH_4$).
    - Bùa lợi chiến thuật gameplay MOBA gắn liền với tính chất liên kết (Khiên tinh thể ion, Kháng khống chế liên kết ba, Mạng lưới liên kết hydrogen phục hồi máu trên sông).
  - `src/components/visualizations/BondingVisualizerModal.tsx`:
    - Hoạt ảnh SVG liên kết ion: Cation bán kính co lại, Anion nở rộng với đủ 8 electron octet, đường hồ quang chuyển dịch electron $e^-$ và sóng tĩnh điện dao động giữa hai ion trái dấu.
    - Hoạt ảnh SVG liên kết cộng hóa trị: Vùng xen phủ orbital với các cặp electron dùng chung phát sáng (1 đôi cho $H_2, HCl$; 2 đôi cho $O_2, CO_2$; 3 đôi cho $N_2$), ký hiệu điện tích riêng phần $\delta^+$ và $\delta^-$.
    - Thanh đo hiệu độ âm điện Pauling đồ họa trực quan với con trỏ định vị động theo giá trị $\Delta\chi$.
  - `src/components/Navbar.tsx` & `src/App.tsx`: Tích hợp nút mở nhanh "Liên Kết" trên thanh điều hướng toàn cầu.
  - `test-chemistry-calculator.mjs`: Bổ sung 17 bài test tự động cho Phần 10 kiểm chứng các quy tắc $\Delta\chi$, công thức Lewis, góc liên kết và tính khả thi ion.
- **Bằng chứng kiểm thử:**
  - `test-engine.mjs`: 41/41 test pass.
  - `test-moba.mjs`: 114/114 test pass.
  - `test-chemistry-calculator.mjs`: 62/62 test pass.
  - Tổng số test tự động: **217/217 PASS (0 FAIL)**.
  - `npm run build`: 1622 modules compiled cleanly, 0 lỗi TypeScript.
  - Dev server HTTP 200 OK tại `http://localhost:3000/`.

---

### [CYCLE 007] — CHIẾN DỊCH ĐẠI TU ĐỒ HỌA TOÀN DIỆN (EXTREME VISUAL OVERHAUL)
- **Mục tiêu:** Chuyển đổi toàn diện trải nghiệm hình ảnh của ELEMENTA từ các vòng tròn hình học cơ bản sang tiêu chuẩn MOBA hành động hiện đại: bộ nhận diện vector nguyên bản cho 8 tướng, bộ máy hạt VFX không cấp phát bộ nhớ (Zero-allocation Particle Engine), đệm địa hình Offscreen Canvas, hoạt ảnh gợn sóng khúc xạ lòng sông H₂O, bụi rậm sinh học đa tầng, mô hình quái rừng/trụ tháp/căn cứ đặc trưng, HUD chiến thuật hiển thị mục tiêu chi tiết, quét hồi chiêu vòng tròn SVG, và hồ sơ cấu hình đồ họa thích ứng (Ultra / Balanced / Performance / Reduced Motion).
- **Các tệp đã tạo/chỉnh sửa:**
  - `.agents/skills/elementa-*/SKILL.md`: 5 kỹ năng chuyên sâu về đồ họa và kiểm thử game:
    - `elementa-art-direction`: Ngôn ngữ thiết kế, bảng màu 8 nguyên tố, phân cấp Z-index.
    - `elementa-moba-environment-art`: Bản đồ 2.5D, đệm địa hình, nước khúc xạ, bụi rậm đa tầng.
    - `elementa-game-vfx`: Vòng lặp VFX (Telegraph $\rightarrow$ Flight $\rightarrow$ Burst $\rightarrow$ Detonation), mảng hạt tĩnh.
    - `elementa-svg-illustration`: Chuẩn hóa vector, viewBox, mô hình orbital và biểu tượng hóa học.
    - `elementa-rendering-performance`: Ngân sách 16.6ms cho 60 FPS, culling, cấu hình chất lượng.
  - `src/game/rendering/particleEngine.ts`: Động cơ VFX 350 hạt tiền phân bổ với 7 loại hạt (`SPARK`, `SHARD`, `VAPOR`, `FLAME`, `BUBBLE`, `CRYSTAL`, `SHOCKWAVE`), vận tốc kéo giãn theo gia tốc, tự động điều chỉnh ngân sách hạt theo cấu hình phần cứng.
  - `src/game/rendering/mobaRenderer.ts`:
    - Khởi tạo đệm `terrainCacheCanvas` (2400x2400) vẽ sẵn hoa văn lát đá hex và đường viền 3 làn lính, triệt tiêu hàng nghìn lệnh vẽ primitive mỗi khung hình.
    - Hiệu ứng sóng nước lòng sông $H_2O$ sin-wave và đường dẫn năng lượng nhấp nháy dọc các trục đường.
    - Bụi rậm đa khóm lá cây sinh học với bóng đổ mờ và độ lệch dao động theo gió.
    - Vật cản đá khoáng 3D nhiều mặt cắt với bóng tiếp xúc và vân tinh thể phát sáng.
    - Trụ tháp con quay hồi chuyển vũ trụ xoay tròn (`setLineDash`), lõi thạch anh lơ lửng, tia laser khóa mục tiêu, mảnh vỡ đá tảng khi bị phá hủy.
    - Căn cứ đại nguyên tố khối bát diện phát quang lơ lửng với hào quang runic.
    - Tạo hình lính chuyên biệt theo lớp: Melee (người máy giáp titan vòm khiên trước), Caster (drone lơ lửng 2 cánh năng lượng), Siege (cỗ máy 4 chân đại bác gia tốc).
    - Quái rừng độc bản: Thằn Lằn Axit ($Cl^-$) gai góc có đuôi và lỗ thông hơi khói xanh; Người Đá Tinh Thể ($BaSO_4$) khối ngọc lục bảo; Boss Giám Hộ Xúc Tác ($Pt$) chimera 4 cánh năng lượng.
    - Vệt hạt nguyên tố rực rỡ bám theo tướng khi di chuyển và quầng nổ phản ứng hóa học hoành tráng khi kích hoạt phản ứng.
  - `src/assets/svg/ElementalCrests.tsx`: 8 biểu tượng vector huy hiệu nguyên bản cho 8 tướng (Na, Fe, Cl, Cu, Al, O, H, Ba) thể hiện cấu trúc lớp vỏ electron Bohr, phân lớp hóa trị, spin diradical và xu hướng phản ứng.
  - `src/assets/svg/SkillGlyphs.tsx`: Bộ biểu tượng chiêu thức vector hóa học (Thủy Kích, Khiên Xút NaOH, Gỉ Sét Fe₂O₃, Khí Độc Cl₂, Nhiệt Nhôm, Phóng Điện Cu, Tốc Biến, Hồi Phục, Biến Về) và các huy hiệu trạng thái phản ứng.
  - `src/components/moba/TargetFrame.tsx`: Khung soi mục tiêu thời gian thực hiển thị tên, sinh lực, giáp, sát thương, công thức phân tử và điểm yếu hóa học sư phạm.
  - `src/components/moba/MobaArenaTab.tsx`: Nâng cấp HUD: hiển thị huy hiệu nguyên tố của tướng, thanh bùa lợi hóa học thời gian thực, quét hồi chiêu vòng tròn SVG mượt mà, nút chuyển đổi nhanh cấu hình đồ họa (VFX: Ultra/Balanced/Performance).
  - `src/components/moba/HeroSelectModal.tsx`: Sử dụng huy hiệu vector `ElementalCrest` trong màn hình chọn tướng và bảng chi tiết anh hùng.
  - `src/storage/localStore.ts` & `src/components/SettingsModal.tsx`: Tích hợp cài đặt cấu hình chất lượng đồ họa 3 mức (`ULTRA` / `BALANCED` / `PERFORMANCE`) và chế độ `reducedMotion` triệt tiêu rung chấn màn hình.
  - `docs/ELEMENTA_VISUAL_DESIGN_BIBLE.md`, `docs/VISUAL_AUDIT.md`, `docs/PERFORMANCE_BASELINE.md`, `docs/GRAPHICS_BACKLOG.md`: Hoàn thiện bộ hồ sơ thiết kế đồ họa và kiểm toán hiệu năng.
- **Bằng chứng kiểm thử:**
  - `test-engine.mjs`: 41/41 test pass.
  - `test-moba.mjs`: 114/114 test pass.
  - `test-chemistry-calculator.mjs`: 62/62 test pass.
  - Tổng số test tự động: **217/217 PASS (0 FAIL)**.
  - `npm run build`: 1626 modules compiled cleanly, 0 lỗi TypeScript, bundle gzip JS 181.3 kB, CSS 8.8 kB.
  - Dev server HTTP 200 OK tại `http://localhost:3000/`.

---

### [CYCLE 008] — KẾ HOẠCH TRIỂN KHAI TIẾP THEO
- **Nhiệm vụ 1:** Tích hợp Mini-Quiz nhận biết liên kết và số oxi hóa trước trận MOBA để người chơi nhận bùa lợi nguyên tố khởi đầu.
- **Nhiệm vụ 2:** Bổ sung mô hình mạng tinh thể lập phương tâm khối và tâm diện 3D/Isometric SVG cho các kim loại kiềm và kiềm thổ.
- **Nhiệm vụ 3:** Cân bằng chỉ số năng lượng hồi phục và sát thương phản ứng của 8 tướng trên đấu trường.
