# ELEMENTA — CHIẾN LƯỢC KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG (QA STRATEGY)
**Phiên bản:** 2.0.0-RELEASE  
**Phạm vi:** Kiểm thử Đa Tầng (Multi-Tier Automated Testing) • Zero-Regressions Policy  

---

## 1. NGUYÊN TẮC QUẢN LÝ CHẤT LƯỢNG

1. **Test-Driven & Verification First:** Mọi thay đổi mã nguồn logic, dữ liệu hóa học hoặc thuật toán cân bằng đều phải đi kèm bài kiểm tra tự động.
2. **Không che giấu lỗi:** Tuyệt đối không tắt cảnh báo, không xóa test thất bại, không ẩn console errors. Phát hiện lỗi phải truy tìm nguyên nhân gốc rễ (Root Cause Analysis) và khắc phục triệt để.
3. **Phân loại lỗi theo mức độ nghiêm trọng (Bug Severity Tiers):**
   - **`P0` (Blocker / Khẩn cấp):** Game không thể khởi động, ứng dụng bị crash trắng trang, mất dữ liệu người chơi, vòng lặp game loop bị nghẽn (freeze). *Chính sách: Khắc phục ngay lập tức, cấm release khi còn P0.*
   - **`P1` (Critical / Nghiêm trọng):** Chức năng cốt lõi không thể sử dụng (ví dụ: tướng không thể tung chiêu, không thể kích hoạt phản ứng hóa học, dữ liệu nguyên tố bị sai lệch, phương trình không cân bằng nguyên tử). *Chính sách: Khắc phục trước khi chuyển sang tính năng mới.*
   - **`P2` (Major / Đáng kể):** Chức năng phụ bị ảnh hưởng hoặc suy giảm hiệu năng (giảm khung hình dưới 45 FPS, lệch vị trí giao diện ở một số kích thước màn hình). *Chính sách: Lập danh sách, sửa chữa và đo lường tác động.*
   - **`P3` (Minor / Cải tiến):** Lỗi nhỏ về hiển thị chữ, căn chỉnh lề nhẹ, cải thiện hiệu ứng thị giác.

---

## 2. CẤU TRÚC BỘ KIỂM THỬ ĐA TẦNG (TESTING SUITES)

```
                       [ Tầng 4: End-to-End User Journeys ]
                                      ▲
                       [ Tầng 3: Visual & Performance Tests ]
                                      ▲
                       [ Tầng 2: Game Integration Tests ]
                         - test-moba.mjs (114+ tests)
                         - test-card-battle.mjs (New)
                                      ▲
                       [ Tầng 1: Scientific & Unit Tests ]
                         - test-engine.mjs (41 tests)
                         - test-chemistry-calculator.mjs (62 tests)
                         - test-chemistry-data.mjs (New: 118 elems, 300+ subs, 300+ rx)
```

### Chi tiết các bộ test tự động:
1. **`test-engine.mjs`:**
   - Kiểm tra ánh xạ chỉ số game từ dữ liệu hóa học (Table 3 IUPAC).
   - Kiểm tra phân giải cấu tử hóa học và bộ phân tích cú pháp ngăn xếp (Stack Parser).
   - Kiểm tra động cơ DCSM và hệ thống ôn tập thích ứng CA-SRS.
2. **`test-moba.mjs`:**
   - Kiểm tra thông số 12 tướng nguyên tố (HP, Mana, Giáp, Tốc độ, 4 chiêu thức).
   - Mô phỏng va chạm địa hình AABB, sương mù Fog of War, đợt lính 3 đường, quái rừng aggro, Boss Giám Hộ Xúc Tác.
   - Kiểm tra AI Bot MOBA ở 3 mức độ khó (Novice, Standard, Challenger).
3. **`test-chemistry-calculator.mjs`:**
   - Kiểm tra tính toán số mol, thể tích khí (chuẩn GDPT 2018: 24.79L), nồng độ dung dịch.
   - Kiểm tra động cơ Oxi hóa - Khử, Enthalpy nhiệt hóa học và động học phản ứng.
   - Kiểm tra động cơ ô lượng tử orbital và phân loại liên kết hóa học Pauling.
4. **`test-chemistry-data.mjs` (Mới):**
   - Duyệt qua toàn bộ 118 nguyên tố: đảm bảo $Z \in [1, 118]$ duy nhất, đầy đủ symbol, IUPAC name, tiếng Việt, cấu hình e, khối lượng.
   - Duyệt qua $\ge 300$ chất trong catalog: đảm bảo công thức hóa học được Stack Parser phân tích thành công, khối lượng mol tính toán chính xác.
   - Duyệt qua $\ge 300$ phản ứng: đảm bảo bảo toàn 100% nguyên tử và điện tích giữa hai vế phương trình.
5. **`test-card-battle.mjs` (Mới):**
   - Mô phỏng một ván đấu thẻ bài hoàn chỉnh: Rút bài -> Triển khai -> Combo -> Sát thương -> AI phản hồi -> Kết thúc trận đấu.

---

## 3. CÁC CỔNG NGHIỆM THU CHÍNH THỨC (GATES A - F)

- **Gate A (Build & Runtime):** `npm run build` thành công, 0 lỗi TypeScript, khởi chạy mượt mà.
- **Gate B (Chemistry Completeness):** Đủ 118 nguyên tố, $\ge 300$ chất, $\ge 300$ phản ứng bảo toàn nguyên tử, bộ cân bằng thuật toán chính xác.
- **Gate C (Arena Playable):** Đủ 12 tướng có thể chơi, AI bot 3 cấp độ, bản đồ 3 đường 2400x2400, điều kiện thắng thua hoàn chỉnh.
- **Gate D (Card Battle Playable):** Đấu bài 10 lá, quản lý mana, chuỗi phản ứng, AI tự chơi, điều kiện thắng thua.
- **Gate E (Visual Quality):** Đồ họa 2.5D có chiều sâu, particle engine 350 hạt, bảng tuần hoàn 18 cột chuẩn đẹp mắt, huy hiệu SVG độc bản.
- **Gate F (Quality Assurance):** 100% test pass, 0 lỗi P0/P1, kiểm thử lưu trữ profile, báo cáo hiệu năng và báo cáo cân bằng đầy đủ.
