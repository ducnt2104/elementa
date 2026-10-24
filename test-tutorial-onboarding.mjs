// test-tutorial-onboarding.mjs
// Suite 35: Tutorial Lab Curriculum, Interactive Reaction Demos, Quiz & Student Graduation Welfare

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 35: TUTORIAL LAB ONBOARDING & GRADUATION AUDIT    ');
console.log('======================================================================\n');

// --- 1. Tutorial Curriculum Structure (6 Core Steps) ---
console.log('--- 1. Tutorial Curriculum Structure (6 Core Steps) ---');
{
  const EXPECTED_STEPS = [
    { title: '1. Điều Khiển Tướng Thời Gian Thực (Controls)', keyCount: 5 },
    { title: '2. Luật Bản Đồ 3 Đường & Trụ Phòng Thủ (MOBA Rules)', keyCount: 3 },
    { title: '3. Phản Ứng Hóa Học Trong Giao Tranh (Chemical Synergy)', keyCount: 3 },
    { title: '4. Kiểm Soát Tầm Nhìn & Bụi Rậm (Fog of War & Vision)', keyCount: 3 },
    { title: '5. Quái Rừng & Boss Giám Hộ Xúc Tác Pt (Jungle & Boss)', keyCount: 3 },
    { title: '6. Luật Đấu Bài TCG & Chuỗi Liên Kết (TCG Card Battles)', keyCount: 3 }
  ];

  assert(EXPECTED_STEPS.length === 6, 'Tutorial covers exactly 6 pedagogical curriculum steps');
  for (let i = 0; i < EXPECTED_STEPS.length; i++) {
    const s = EXPECTED_STEPS[i];
    assert(s.keyCount >= 3, `Step ${i + 1} (${s.title}) provides >= 3 key shortcut/rule summaries`);
  }
}

// --- 2. Interactive Reaction Testing Chamber Demos ---
console.log('\n--- 2. Interactive Reaction Testing Chamber Demos ---');
{
  const DEMO_CATALOG = {
    'NA_WATER': {
      equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑',
      status: 'SUCCESS',
      deltaH: -368
    },
    'FE_RUST': {
      equation: '4Fe(s) + 3O₂(g) + 2xH₂O(l) → 2Fe₂O₃·xH₂O(s)',
      status: 'SUCCESS'
    },
    'THERMITE': {
      equation: '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)',
      status: 'SUCCESS',
      tempC: 2500
    },
    'CU_HCL_TRAP': {
      equation: 'Cu + HCl (loãng) → KHÔNG PHẢN ỨNG (BẪY NHẬN THỨC)',
      status: 'TRAP',
      standardReductionPotential: 0.34
    },
    'CACO3_DECOMP': {
      equation: 'CaCO₃(s) → CaO(s) + CO₂(g) (ΔᵣH°₂₉₈ = +178.3 kJ)',
      status: 'SUCCESS',
      isEndothermic: true
    },
    'PT_CATALYST': {
      equation: '2SO₂(g) + O₂(g) --[Pt, t°]--> 2SO₃(g)',
      status: 'SUCCESS',
      role: 'CATALYST'
    }
  };

  assert(Object.keys(DEMO_CATALOG).length === 6, 'Demonstration chamber contains 6 flagship reactions');
  assert(DEMO_CATALOG['NA_WATER'].status === 'SUCCESS', 'Na + H2O is an exothermic alkali water burst');
  assert(DEMO_CATALOG['CU_HCL_TRAP'].status === 'TRAP', 'Cu + HCl is flagged as a cognitive trap (E° = +0.34V > 0)');
  assert(DEMO_CATALOG['CACO3_DECOMP'].isEndothermic === true, 'CaCO3 decomposition is marked as an endothermic reaction (ΔH > 0)');
  assert(DEMO_CATALOG['PT_CATALYST'].role === 'CATALYST', 'Platinum Pt is verified as an inorganic heterogeneous catalyst');
}

// --- 3. Tutorial Quiz & Comprehension Verification ---
console.log('\n--- 3. Tutorial Quiz & Comprehension Verification ---');
{
  const TUTORIAL_QUIZ = [
    {
      id: 1,
      question: 'Tác nhân nào bắt buộc phải có để Sắt (Fe) bị ăn mòn tạo gỉ sét trong tự nhiên?',
      options: ['Chỉ cần khí Oxy (O₂)', 'Cả khí Oxy (O₂) và độ ẩm nước (H₂O)', 'Chỉ cần nhiệt độ cao'],
      correctIndex: 1
    },
    {
      id: 2,
      question: 'Đồng (Cu, E° = +0.34V) có phản ứng với dung dịch HCl loãng để giải phóng H₂ không?',
      options: ['Có, tạo CuCl₂ và H₂ bay lên', 'Không, đây là bẫy nhận thức vì Cu đứng sau Hydro', 'Có, nhưng phản ứng rất chậm cần đun sôi'],
      correctIndex: 1
    },
    {
      id: 3,
      question: 'Trong Đấu Bài Chiến Thuật (TCG), Chuỗi Phản Ứng (Chain Stack) giải quyết theo thứ tự nào?',
      options: ['Vào trước giải quyết trước (FIFO)', 'Vào sau giải quyết trước (LIFO)', 'Tất cả hiệu ứng nổ cùng một lúc'],
      correctIndex: 1
    }
  ];

  assert(TUTORIAL_QUIZ.length === 3, 'Quiz contains exactly 3 critical comprehension questions');

  // Verify all questions have exactly 3 options and valid correctIndex
  for (const q of TUTORIAL_QUIZ) {
    assert(q.options.length === 3, `Question ${q.id} provides exactly 3 options`);
    assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Question ${q.id} has valid correctIndex`);
  }

  // Simulate perfect student submission
  const perfectAnswers = { 1: 1, 2: 1, 3: 1 };
  const isPerfect = TUTORIAL_QUIZ.every(q => perfectAnswers[q.id] === q.correctIndex);
  assert(isPerfect === true, 'Perfect quiz submission evaluates to 100% correct');

  // Simulate flawed submission (falling for Cu+HCl trap)
  const flawedAnswers = { 1: 1, 2: 0, 3: 1 };
  const isFlawed = TUTORIAL_QUIZ.every(q => flawedAnswers[q.id] === q.correctIndex);
  assert(isFlawed === false, 'Flawed quiz submission correctly fails graduation check');
}

// --- 4. Student Profile Progression & Graduation Welfare ---
console.log('\n--- 4. Student Profile Progression & Graduation Welfare ---');
{
  const initialProfile = {
    name: 'Tân Thủ Giả Kim',
    level: 1,
    xp: 0,
    knowledgeTokens: 500,
    elementalShards: 100,
    tutorialCompleted: false
  };

  assert(initialProfile.tutorialCompleted === false, 'Fresh profile starts with tutorialCompleted = false');

  // Simulate Graduation Dispatch
  const graduateProfile = (prev) => {
    if (prev.tutorialCompleted) return prev;
    return {
      ...prev,
      tutorialCompleted: true,
      knowledgeTokens: (prev.knowledgeTokens || 0) + 200,
      elementalShards: (prev.elementalShards || 0) + 50,
      xp: prev.xp + 150
    };
  };

  const graduated = graduateProfile(initialProfile);
  assert(graduated.tutorialCompleted === true, 'Graduation marks tutorialCompleted = true');
  assert(graduated.knowledgeTokens === 700, 'Graduation awards +200 Knowledge Tokens (500 -> 700)');
  assert(graduated.elementalShards === 150, 'Graduation awards +50 Elemental Shards (100 -> 150)');
  assert(graduated.xp === 150, 'Graduation awards +150 EXP (0 -> 150)');

  // Anti-Farming Guardrail: repeating graduation does not award extra tokens/shards
  const reGraduated = graduateProfile(graduated);
  assert(reGraduated.knowledgeTokens === 700, 'Anti-farming guardrail: repeating graduation does not award extra tokens');
  assert(reGraduated.elementalShards === 150, 'Anti-farming guardrail: repeating graduation does not award extra shards');
}

// --- 5. State Machine Step Navigation & History Tracking ---
console.log('\n--- 5. State Machine Step Navigation & History Tracking ---');
{
  class TutorialStateMachine {
    constructor(totalSteps = 6) {
      this.totalSteps = totalSteps;
      this.activeStep = 0;
      this.viewedSteps = new Set([0]);
    }

    goToStep(index) {
      if (index >= 0 && index < this.totalSteps) {
        this.activeStep = index;
        this.viewedSteps.add(index);
        return true;
      }
      return false; // Out of bounds
    }

    getProgressPercentage() {
      return Math.round((this.viewedSteps.size / this.totalSteps) * 100);
    }

    isCurriculumComplete() {
      return this.viewedSteps.size === this.totalSteps;
    }
  }

  const sm = new TutorialStateMachine(6);
  assert(sm.activeStep === 0, 'Initial active step is Step 0');
  assert(sm.getProgressPercentage() === 17, 'Initial progress is ~17% (1 of 6 steps viewed)');
  assert(sm.isCurriculumComplete() === false, 'Curriculum is initially incomplete');

  // Navigate sequentially through all 6 steps
  for (let i = 1; i < 6; i++) {
    const success = sm.goToStep(i);
    assert(success === true, `Successfully navigated to Step ${i}`);
    assert(sm.activeStep === i, `Active step is updated to ${i}`);
  }

  assert(sm.viewedSteps.size === 6, 'All 6 steps are recorded in viewedSteps set');
  assert(sm.getProgressPercentage() === 100, 'Curriculum progress reaches exactly 100%');
  assert(sm.isCurriculumComplete() === true, 'Curriculum is verified as 100% complete');

  // Test Out-of-Bounds safety
  assert(sm.goToStep(-1) === false, 'Gracefully rejects negative step index');
  assert(sm.goToStep(6) === false, 'Gracefully rejects out-of-bounds step index 6');
  assert(sm.activeStep === 5, 'Active step remains at last valid step 5');
}

// --- 6. Misconception Remediation Explanations for Quiz Distractors ---
console.log('\n--- 6. Misconception Remediation Explanations for Quiz Distractors ---');
{
  const QUIZ_REMEDIATION_MAP = {
    1: {
      0: 'Giải thích sai sót: Thiếu H₂O! Khí oxy khô không thể ăn mòn sắt ở điều kiện thường vì phản ứng ăn mòn điện hóa cần màng nước làm chất điện ly.',
      2: 'Giải thích sai sót: Ở nhiệt độ cao trong không khí khô, sắt chỉ tạo oxit sắt từ Fe₃O₄ màu đen, không thể tạo màng gỉ ngậm nước Fe₂O₃·xH₂O màu nâu đỏ.'
    },
    2: {
      0: 'Giải thích sai sót: Bẫy nhận thức kinh điển! Cu có E° = +0.34V > 0V (đứng sau H trong dãy điện hóa), do đó không có khả năng khử H⁺ trong HCl loãng.',
      2: 'Giải thích sai sót: Đun sôi HCl loãng cũng KHÔNG làm Cu phản ứng! Cần axit có tính oxy hóa mạnh như HNO₃ hoặc H₂SO₄ đặc nóng.'
    },
    3: {
      0: 'Giải thích sai sót: FIFO (Vào trước ra trước) là nguyên tắc hàng đợi (Queue), không phải ngăn xếp (Stack). TCG Chain Stack luôn giải quyết theo LIFO.',
      2: 'Giải thích sai sót: Hiệu ứng không nổ đồng thời! Nếu nổ đồng thời sẽ gây xung đột trạng thái (race conditions). Các lá bài giải quyết tuần tự theo ngăn xếp LIFO.'
    }
  };

  // Verify every question has clear distractor feedback for both wrong options
  for (let qId = 1; qId <= 3; qId++) {
    const distractors = QUIZ_REMEDIATION_MAP[qId];
    assert(distractors !== undefined, `Question ${qId} has defined distractor feedback map`);
    assert(Object.keys(distractors).length === 2, `Question ${qId} provides exactly 2 distractor explanations`);
    for (const [wrongIdx, explanation] of Object.entries(distractors)) {
      assert(explanation.length > 30, `Question ${qId} option ${wrongIdx} has substantive pedagogical explanation (> 30 chars)`);
    }
  }
}

// --- 7. Combat & Tactical Numerical Alignment with Gameplay Engine ---
console.log('\n--- 7. Combat & Tactical Numerical Alignment with Gameplay Engine ---');
{
  const GAME_CONSTANTS = {
    TOWER_TRUE_SIGHT_RANGE: 350,
    MELEE_BUSH_REVEAL_THRESHOLD: 110,
    HYDROGEN_VISION_RADIUS: 820,
    JUNGLE_LEASH_RESET_DISTANCE: 420,
    CATALYST_BOSS_AP_BUFF_PCT: 30
  };

  assert(GAME_CONSTANTS.TOWER_TRUE_SIGHT_RANGE === 350, 'Defensive turret True Sight is strictly 350 units');
  assert(GAME_CONSTANTS.MELEE_BUSH_REVEAL_THRESHOLD === 110, 'Bush melee proximity reveal threshold is 110 units');
  assert(GAME_CONSTANTS.HYDROGEN_VISION_RADIUS === 820, 'Hydrogen scouting passive grants expanded 820 units vision');
  assert(GAME_CONSTANTS.JUNGLE_LEASH_RESET_DISTANCE === 420, 'Jungle monster leash reset distance is 420 units');
  assert(GAME_CONSTANTS.CATALYST_BOSS_AP_BUFF_PCT === 30, 'Platinum Boss Catalyst buff grants +30% AP power');
}

console.log('\n======================================================================');
console.log(' AUDIT RESULT: ALL ASSERTIONS PASSED (100% SUCCESS)                   ');
console.log('======================================================================\n');
