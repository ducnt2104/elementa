// src/components/CreativeWorkshopTab.tsx
// Comprehensive Crafting Workshop with 3 Internal Tabs:
// Tab 1: Sáng Tạo Kỹ Năng & Thẻ Bài (3-Layer AI Guardrails, Canvas Drawing, IUPAC RAG)
// Tab 2: Phòng Thí Nghiệm Phản Ứng (Reaction Sandbox, Thermochemistry, Le Chatelier, pH)
// Tab 3: Kho Kỹ Năng & Thẻ Tự Tạo (Custom Creations Repository & Deck Integration)

import React, { useState, useRef, useEffect } from 'react';
import { PlayerProfile, CreativeSkillSubmission } from '../domain/types';
import { CORE_MVP_ELEMENTS } from '../data/elementsData';
import { AiGuardrailService, AiReviewOutput } from '../domain/aiGuardrails';
import { ReactionSandboxTab } from './sandbox/ReactionSandboxTab';
import { sound } from '../audio/soundEngine';
import {
  Palette,
  ShieldCheck,
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  Save,
  BookOpen,
  Atom,
  Flame,
  Zap,
  Box,
  Beaker,
  FlaskConical,
  FolderKanban,
  ArrowRight
} from 'lucide-react';

interface CreativeWorkshopTabProps {
  profile: PlayerProfile;
  onSaveSkill: (skill: CreativeSkillSubmission) => void;
  savedSkills: CreativeSkillSubmission[];
}

export const CreativeWorkshopTab: React.FC<CreativeWorkshopTabProps> = ({
  profile,
  onSaveSkill,
  savedSkills
}) => {
  // Internal Tabs: CREATOR, LAB, REPOSITORY
  const [internalTab, setInternalTab] = useState<'CREATOR' | 'LAB' | 'REPOSITORY'>('CREATOR');

  const [selectedSymbol, setSelectedSymbol] = useState<string>('Na');
  const [skillName, setSkillName] = useState<string>('Thủy Kích Kiềm');
  const [description, setDescription] = useState<string>(
    'Khi ném Natri vào vùng nước của đối thủ, tạo vụ nổ nhiệt khí H₂ và sinh ra dung dịch kiềm NaOH làm ăn mòn giáp.'
  );
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<AiReviewOutput | null>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState<string>('#57C8C8'); // Ion cyan

  useEffect(() => {
    if (internalTab === 'CREATOR') {
      initCanvas();
    }
  }, [internalTab]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#10131B';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw frame motif
        ctx.strokeStyle = '#233348';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    sound.playUiClick();
    initCanvas();
  };

  // Quick Vector Stamp Presets
  const applyStamp = (type: 'atom' | 'flask' | 'flame' | 'crystal' | 'spark') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    sound.playCardSelect();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.fillStyle = penColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (type) {
      case 'atom': {
        // Nucleus
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        // Orbit 1: horizontal ellipse
        ctx.beginPath();
        ctx.ellipse(cx, cy, 50, 18, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Orbit 2: 60 deg ellipse
        ctx.beginPath();
        ctx.ellipse(cx, cy, 50, 18, Math.PI / 3, 0, Math.PI * 2);
        ctx.stroke();

        // Orbit 3: -60 deg ellipse
        ctx.beginPath();
        ctx.ellipse(cx, cy, 50, 18, -Math.PI / 3, 0, Math.PI * 2);
        ctx.stroke();

        // Electrons
        const electrons = [
          { x: cx + 50, y: cy },
          { x: cx - 25, y: cy + 43 },
          { x: cx - 25, y: cy - 43 }
        ];
        electrons.forEach(el => {
          ctx.beginPath();
          ctx.arc(el.x, el.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }

      case 'flask': {
        // Erlenmeyer Flask Outline
        ctx.beginPath();
        ctx.moveTo(cx - 14, cy - 50);
        ctx.lineTo(cx + 14, cy - 50);
        ctx.moveTo(cx - 10, cy - 50);
        ctx.lineTo(cx - 10, cy - 25);
        ctx.lineTo(cx - 45, cy + 45);
        ctx.quadraticCurveTo(cx, cy + 52, cx + 45, cy + 45);
        ctx.lineTo(cx + 10, cy - 25);
        ctx.lineTo(cx + 10, cy - 50);
        ctx.stroke();

        // Liquid line inside
        ctx.beginPath();
        ctx.moveTo(cx - 32, cy + 20);
        ctx.quadraticCurveTo(cx, cy + 26, cx + 32, cy + 20);
        ctx.stroke();

        // Bubbles
        ctx.beginPath();
        ctx.arc(cx - 10, cy + 32, 3, 0, Math.PI * 2);
        ctx.arc(cx + 12, cy + 28, 4, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy + 12, 2.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }

      case 'flame': {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 55);
        ctx.bezierCurveTo(cx + 25, cy - 30, cx + 45, cy + 5, cx + 40, cy + 35);
        ctx.bezierCurveTo(cx + 35, cy + 55, cx + 15, cy + 55, cx, cy + 55);
        ctx.bezierCurveTo(cx - 15, cy + 55, cx - 35, cy + 55, cx - 40, cy + 35);
        ctx.bezierCurveTo(cx - 45, cy + 5, cx - 25, cy - 30, cx, cy - 55);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy - 15);
        ctx.bezierCurveTo(cx + 15, cy + 5, cx + 20, cy + 25, cx + 18, cy + 42);
        ctx.bezierCurveTo(cx + 15, cy + 50, cx - 15, cy + 50, cx - 18, cy + 42);
        ctx.bezierCurveTo(cx - 20, cy + 25, cx - 15, cy + 5, cx, cy - 15);
        ctx.stroke();
        break;
      }

      case 'crystal': {
        const r = 40;
        const pts: [number, number][] = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6;
          pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle) - 5]);
        }

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(cx, cy - 5);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(pts[4][0], pts[4][1]);
        ctx.stroke();
        break;
      }

      case 'spark': {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 50);
        ctx.quadraticCurveTo(cx + 5, cy - 10, cx + 45, cy);
        ctx.quadraticCurveTo(cx + 5, cy + 10, cx, cy + 50);
        ctx.quadraticCurveTo(cx - 5, cy + 10, cx - 45, cy);
        ctx.quadraticCurveTo(cx - 5, cy - 10, cx, cy - 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 18, cy - 18);
        ctx.lineTo(cx + 18, cy + 18);
        ctx.moveTo(cx + 18, cy - 18);
        ctx.lineTo(cx - 18, cy + 18);
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  };

  const handleEvaluate = async () => {
    if (!description.trim() || !skillName.trim()) return;
    sound.playUiClick();
    setIsEvaluating(true);

    try {
      const result = await AiGuardrailService.evaluateSkill(selectedSymbol, skillName, description);
      setEvaluationResult(result);
      if (result.isScientificallyValid) {
        sound.playVictory();
      } else {
        sound.playErrorFizzle();
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSaveToDeck = () => {
    if (!evaluationResult || !evaluationResult.isScientificallyValid) return;
    sound.playCardSelect();

    const canvas = canvasRef.current;
    const iconDataUrl = canvas ? canvas.toDataURL() : undefined;

    const submission: CreativeSkillSubmission = {
      id: `skill_${Date.now()}`,
      elementSymbol: selectedSymbol,
      skillName,
      description,
      iconCanvasDataUrl: iconDataUrl,
      submittedAt: new Date().toISOString(),
      validation: evaluationResult
    };

    onSaveSkill(submission);
    setInternalTab('REPOSITORY');
  };

  // Handler when user exports a successful reaction from Lab into Creator
  const handleExportFromLab = (rx: { equation: string; name: string; notes: string; reactants: string[] }) => {
    sound.playVictory();
    setSkillName(rx.name);
    setDescription(`Phản ứng hóa học: ${rx.equation}.\nHiện tượng thực tế: ${rx.notes}`);

    // Try to match symbol
    if (rx.reactants.length > 0) {
      const cleanSym = rx.reactants[0].replace(/[^A-Za-z]/g, '');
      const matched = CORE_MVP_ELEMENTS.find(e => e.symbol.toLowerCase() === cleanSym.toLowerCase());
      if (matched) {
        setSelectedSymbol(matched.symbol);
      }
    }

    setInternalTab('CREATOR');
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-12 select-none">
      {/* Top Header: Workshop Brand & Internal Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy/80 p-5 rounded-2xl border border-navy-light/60 backdrop-blur shadow-xl">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ivory flex items-center gap-2">
            <span>Xưởng Sáng Tạo & Phòng Thí Nghiệm Phản Ứng</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold">
              3 Lớp Kiểm Duyệt AI
            </span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1">
            Thiết kế kỹ năng và thẻ bài mới, làm thí nghiệm phản ứng hóa học ảo, đối chiếu với cơ sở dữ liệu IUPAC.
          </p>
        </div>

        {/* 3 Internal Tabs Navigation */}
        <div className="flex items-center gap-1 bg-obsidian/80 p-1 rounded-xl border border-navy-light shrink-0">
          <button
            onClick={() => {
              sound.playUiClick();
              setInternalTab('CREATOR');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              internalTab === 'CREATOR'
                ? 'bg-cyan-ion text-obsidian shadow-sm shadow-cyan-ion/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Sáng Tạo Thẻ</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setInternalTab('LAB');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              internalTab === 'LAB'
                ? 'bg-teal-400 text-obsidian shadow-sm shadow-teal-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Phản Ứng</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setInternalTab('REPOSITORY');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              internalTab === 'REPOSITORY'
                ? 'bg-purple-400 text-obsidian shadow-sm shadow-purple-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Kho Tự Tạo ({savedSkills.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CREATOR (SKILL & CARD BUILDER WITH 3-LAYER AI GUARDRAILS) */}
      {internalTab === 'CREATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Left Column: Drawing Canvas & Skill Formulation */}
          <div className="bg-navy/70 rounded-2xl border border-navy-light/60 p-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-copper uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-copper" />
              <span>1. Vẽ Biểu Tượng & Khởi Tạo Cơ Chế Kỹ Năng</span>
            </h3>

            {/* Canvas & Color Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-ivory-muted">Màu bút vẽ:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { color: '#57C8C8', name: 'Cyan' },
                    { color: '#C67A45', name: 'Đồng' },
                    { color: '#F06A55', name: 'San hô' },
                    { color: '#B4CD70', name: 'Lime' },
                    { color: '#E8E0D1', name: 'Ivory' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setPenColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-4 h-4 rounded-full border ${penColor === c.color ? 'border-white scale-125' : 'border-black/40'} transition-all`}
                      title={c.name}
                    />
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="ml-2 text-[10px] text-ivory-muted hover:text-ivory flex items-center gap-0.5"
                  >
                    <RotateCcw className="w-3 h-3" /> Xóa
                  </button>
                </div>
              </div>

              {/* Quick Scientific Stamp Presets */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono bg-obsidian/90 p-2 rounded-xl border border-navy-light/50">
                <span className="text-ivory-muted text-[10px] mr-1">Con Dấu Nhanh:</span>
                <button
                  type="button"
                  onClick={() => applyStamp('atom')}
                  className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-cyan-ion flex items-center gap-1 border border-cyan-ion/30 transition-all hover:scale-105"
                  title="Đóng dấu cấu trúc nguyên tử Bohr"
                >
                  <Atom className="w-3.5 h-3.5" />
                  <span>Nguyên tử</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStamp('flask')}
                  className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-lime-mineral flex items-center gap-1 border border-lime-mineral/30 transition-all hover:scale-105"
                  title="Đóng dấu bình tam giác Erlenmeyer"
                >
                  <Beaker className="w-3.5 h-3.5" />
                  <span>Bình cầu</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStamp('flame')}
                  className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-coral-reaction flex items-center gap-1 border border-coral-reaction/30 transition-all hover:scale-105"
                  title="Đóng dấu ngọn lửa nhiệt độ"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Ngọn lửa</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStamp('crystal')}
                  className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-copper flex items-center gap-1 border border-copper/30 transition-all hover:scale-105"
                  title="Đóng dấu mạng tinh thể lục giác"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Tinh thể</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStamp('spark')}
                  className="px-2 py-1 rounded bg-navy hover:bg-navy-light text-ivory flex items-center gap-1 border border-ivory/30 transition-all hover:scale-105"
                  title="Đóng dấu tia lửa ion"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tia sét</span>
                </button>
              </div>

              <div className="flex justify-center bg-obsidian/70 rounded-xl p-3 border border-navy-light/40">
                <canvas
                  ref={canvasRef}
                  width={180}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={draw}
                  className="rounded-lg cursor-crosshair border border-navy-light shadow-inner"
                />
              </div>
            </div>

            {/* Element Selection */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-ivory-muted block">Nguyên tố chủ đạo:</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full bg-obsidian border border-navy-light rounded-xl px-3 py-2 text-xs text-ivory focus:outline-none focus:border-cyan-ion font-mono"
              >
                {CORE_MVP_ELEMENTS.map((elem) => (
                  <option key={elem.z} value={elem.symbol}>
                    {elem.symbol} — {elem.name_iupac} ({elem.name_vi}) [Nhóm {elem.group}, Chu kỳ {elem.period}]
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Name */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-ivory-muted block">Tên chiêu thức / thẻ bài:</label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Ví dụ: Thủy Kích Kiềm, Khiên Trơ Heli..."
                className="w-full bg-obsidian border border-navy-light rounded-xl px-3 py-2 text-xs text-ivory focus:outline-none focus:border-cyan-ion"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-ivory-muted block">
                Mô tả cơ chế hoạt động (Dựa trên tính chất hóa lý thật hoặc xuất từ Lab):
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả hiện tượng và quy luật hóa học thật sự diễn ra khi thi triển kỹ năng..."
                className="w-full bg-obsidian border border-navy-light rounded-xl p-3 text-xs text-ivory focus:outline-none focus:border-cyan-ion resize-none leading-relaxed"
              />
            </div>

            {/* Evaluate Action */}
            <button
              disabled={isEvaluating || !skillName.trim() || !description.trim()}
              onClick={handleEvaluate}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-ion via-navy-light to-copper text-obsidian font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-ion/20 hover:scale-102 active:scale-98 disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Đang thẩm định qua 3 lớp AI...' : 'THẨM ĐỊNH KHOA HỌC (3-LỚP AI + RAG)'}</span>
            </button>
          </div>

          {/* Right Column: 3-Layer AI Guardrails Output Inspector */}
          <div className="bg-navy/70 rounded-2xl border border-navy-light/60 p-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-cyan-ion uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-ion" />
              <span>2. Quy Trình Thẩm Định & Khóa Trần Chỉ Số</span>
            </h3>

            {!evaluationResult ? (
              <div className="h-full min-h-[300px] rounded-xl border border-dashed border-navy-light/50 bg-obsidian/40 flex flex-col items-center justify-center p-6 text-center text-ivory-muted space-y-2">
                <Cpu className="w-10 h-10 text-navy-light" />
                <p className="text-xs font-mono">Chưa gửi yêu cầu thẩm định.</p>
                <p className="text-[11px] max-w-xs">
                  Hãy viết mô tả kỹ năng bên trái hoặc dùng con dấu nhanh, sau đó nhấn nút thẩm định để quan sát hệ thống phòng thủ 3 lớp hoạt động.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                {/* Layer 1: Context Isolation */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-navy-light/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-ivory">LỚP 1: CÁCH LY NGỮ CẢNH & AN TOÀN HỌC ĐƯỜNG</span>
                    <span className="text-lime-mineral font-semibold">ĐẠT CHUẨN</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted font-mono bg-navy/60 p-2 rounded">
                    &lt;student_submission&gt;{description}&lt;/student_submission&gt;
                  </p>
                  <span className="text-[10px] text-ivory-muted/70 block">
                    Đã khóa cứng System Prompt chống mọi nguy cơ Jailbreak / Thao túng câu lệnh.
                  </span>
                </div>

                {/* Layer 2: RAG Ground-Truth Verification */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-navy-light/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-ivory">LỚP 2: ĐỐI CHIẾU DỮ LIỆU CHUẨN IUPAC (RAG)</span>
                    <span className={evaluationResult.isScientificallyValid ? 'text-lime-mineral font-bold' : 'text-coral-reaction font-bold'}>
                      {evaluationResult.isScientificallyValid ? 'HỢP LỆ KHOA HỌC' : 'TỪ CHỐI (SAI BẢN CHẤT)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="text-center font-mono bg-navy p-2 rounded border border-navy-light/40">
                      <span className="text-[10px] text-ivory-muted block">Độ Chính Xác</span>
                      <span className={`text-lg font-bold ${evaluationResult.accuracyScore >= 75 ? 'text-lime-mineral' : 'text-coral-reaction'}`}>
                        {evaluationResult.accuracyScore}/100
                      </span>
                    </div>
                    <div className="flex-1 text-[11px] text-ivory leading-relaxed font-sans bg-navy/40 p-2 rounded">
                      <strong>Nhận xét sư phạm: </strong>
                      {evaluationResult.pedagogicalFeedbackVi}
                    </div>
                  </div>
                </div>

                {/* Layer 3: Hard-Capped JSON Schema */}
                <div className="p-3.5 rounded-xl bg-obsidian border border-navy-light/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-ivory">LỚP 3: ÉP KIỂU JSON & KẸP TRẦN CHỈ SỐ</span>
                    <span className="text-cyan-ion font-mono">HARD-CAP ENFORCED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                      <span className="text-[10px] text-ivory-muted block">Mô Thức Hiệu Ứng:</span>
                      <span className="text-cyan-ion font-bold">{evaluationResult.effectArchetype}</span>
                    </div>
                    <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                      <span className="text-[10px] text-ivory-muted block">Sát Thương (≤ 120):</span>
                      <span className="text-copper font-bold">{evaluationResult.basePower} Điểm</span>
                    </div>
                    <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                      <span className="text-[10px] text-ivory-muted block">Hồi Chiêu (≥ 8s):</span>
                      <span className="text-ivory font-bold">{evaluationResult.cooldownSeconds} Giây</span>
                    </div>
                    <div className="p-2 rounded bg-navy/60 border border-navy-light/40">
                      <span className="text-[10px] text-ivory-muted block">Tham Chiếu:</span>
                      <span className="text-lime-mineral text-[10px] truncate block">IUPAC CIAAW</span>
                    </div>
                  </div>

                  {evaluationResult.isScientificallyValid && (
                    <button
                      onClick={handleSaveToDeck}
                      className="w-full mt-2 py-2 rounded-xl bg-lime-mineral/20 hover:bg-lime-mineral/30 text-lime-mineral border border-lime-mineral/50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>LƯU THẺ BÀI / KỸ NĂNG VÀO KHO TỰ TẠO</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LAB (EMBEDDED REACTION SANDBOX WITH ONE-CLICK EXPORT TO WORKSHOP) */}
      {internalTab === 'LAB' && (
        <div className="animate-fadeIn">
          <ReactionSandboxTab onExportToWorkshop={handleExportFromLab} />
        </div>
      )}

      {/* TAB 3: REPOSITORY (SAVED CUSTOM SKILLS & CARDS) */}
      {internalTab === 'REPOSITORY' && (
        <div className="bg-navy/60 rounded-2xl border border-navy-light/60 p-5 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-ivory flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-purple-400" />
                <span>Kho Thẻ Bài & Kỹ Năng Tự Tạo ({savedSkills.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các sáng tạo do bạn tự thiết kế và đã vượt qua hội đồng thẩm định AI 3 lớp.
              </p>
            </div>

            <button
              onClick={() => setInternalTab('CREATOR')}
              className="px-3 py-1.5 rounded-lg bg-cyan-ion text-obsidian font-mono text-xs font-bold shadow hover:bg-cyan-300 transition-all flex items-center gap-1.5"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tạo Thẻ Mới</span>
            </button>
          </div>

          {savedSkills.length === 0 ? (
            <div className="py-16 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-2">
              <Beaker className="w-10 h-10 text-slate-600 mb-1" />
              <span>Chưa có thẻ bài hoặc kỹ năng tự tạo nào.</span>
              <button
                onClick={() => setInternalTab('CREATOR')}
                className="mt-2 text-cyan-ion hover:underline text-xs"
              >
                Nhấp vào đây để bắt đầu sáng tạo thẻ đầu tiên của bạn!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedSkills.map((sk) => (
                <div key={sk.id} className="p-4 rounded-xl border border-navy-light bg-navy/80 space-y-2.5 text-xs shadow-md hover:border-purple-400 transition-all">
                  <div className="flex items-center gap-3">
                    {sk.iconCanvasDataUrl ? (
                      <img src={sk.iconCanvasDataUrl} alt="Icon" className="w-11 h-11 rounded-lg border border-cyan-ion/40 object-cover shadow" />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-obsidian border border-navy-light flex items-center justify-center font-serif font-black text-copper text-lg shadow">
                        {sk.elementSymbol}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-ivory text-sm leading-tight">{sk.skillName}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-cyan-ion font-bold">[{sk.elementSymbol}]</span>
                        <span className="text-[10px] font-mono text-emerald-400">Score: {sk.validation.accuracyScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-ivory-muted line-clamp-3 leading-relaxed bg-black/40 p-2 rounded border border-white/5">
                    {sk.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono border-t border-navy-light/40 pt-2 text-ivory-muted">
                    <span className="text-amber-300 font-bold">⚡ Power: {sk.validation.basePower}</span>
                    <span className="text-cyan-300">⏳ CD: {sk.validation.cooldownSeconds}s</span>
                    <span className="text-slate-400">{new Date(sk.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
