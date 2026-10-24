// src/components/OnboardingModal.tsx
import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import {
  Sparkles,
  Layers,
  Sword,
  Clock,
  Palette,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '1. Danh Pháp Kép & Thuộc Tính Chuẩn IUPAC',
      icon: <Sparkles className="w-8 h-8 text-cyan-ion" />,
      content:
        'Chào mừng đến với ELEMENTA! Mỗi thẻ bài đồng bộ 3 hệ quy chiếu: Kí hiệu Latinh (Na, Fe, Cu), Danh pháp chuẩn quốc tế tiếng Anh (Sodium, Iron, Copper) và Tên tiếng Việt truyền thống. Chỉ số ATK_ox, ATK_red và DEF_stab được tính toán trực tiếp từ Độ âm điện Pauling χ và Năng lượng ion hóa I₁ sơ cấp của IUPAC.',
      tip: 'Nhìn vào Nhóm (IA, IIA, VIIA, VIIIA) để dự đoán vai trò chiến thuật của bất kỳ nguyên tố nào.'
    },
    {
      title: '2. Tối Ưu Hóa Kho Đồ Chiến Thuật 10 Ô',
      icon: <Layers className="w-8 h-8 text-copper" />,
      content:
        'Bạn được chọn tối đa 10 thẻ vào bộ bài. Hãy tuân thủ tỉ lệ vàng: khoảng 4 nguyên tố tấn công chủ lực (Na, K, Cl), 3 thẻ điều kiện môi trường (H₂O, O₂, t°) và 3 nguyên tố phòng thủ/hóa giải (He, Fe, Cu, NaOH). Nếu không mang thẻ môi trường, bạn sẽ không thể kích hoạt bất kỳ Combo nào!',
      tip: 'Bộ bài 10 ô tạo ra hơn 13.1 triệu biến thể chiến thuật không bao giờ nhàm chán.'
    },
    {
      title: '3. Chiến Đấu Bằng Phản Ứng Hóa Học Thật (DCSM)',
      icon: <Sword className="w-8 h-8 text-coral-reaction" />,
      content:
        'Trên sàn đấu, việc ghép các thẻ không phải là phép cộng số học ngẫu nhiên! Bạn phải đưa Chất tham gia + Tác nhân điều kiện cần thiết lên sàn đấu rồi nhấn "Kích Hoạt Combo". Ví dụ: Natri (Na) + Nước (H₂O) tạo bùng nổ nhiệt R01; Sắt (Fe) + Oxy (O₂) + Nước (H₂O) tạo gỉ sắt ăn mòn DoT R02.',
      tip: 'Thử-sai tùy tiện sẽ bị phạt Mana và hiển thị lý do khoa học tức thời!'
    },
    {
      title: '4. Thử Sai An Toàn & Ôn Tập Ngắt Quãng (CA-SRS)',
      icon: <Clock className="w-8 h-8 text-lime-mineral" />,
      content:
        'Nếu bạn ghép sai bản chất (như cho Đồng Cu tác dụng với dung dịch HCl loãng), hệ thống sẽ vô hiệu hóa đòn đánh và giải thích: "Cu đứng sau H trong dãy hoạt động hóa học". Lỗi này lập tức được đưa vào thuật toán CA-SRS để nhắc lại theo chu kỳ giãn cách 1 - 3 - 7 - 14 ngày, biến sai sót thành trí nhớ bền vững.',
      tip: 'Không cần ghi nhớ máy móc: trải nghiệm trong game tự khắc ghi kiến thức vào phản xạ.'
    },
    {
      title: '5. Tự Thiết Kế Kỹ Năng Tại Xưởng Sáng Tạo AI',
      icon: <Palette className="w-8 h-8 text-cyan-ion" />,
      content:
        'Khi thăng cấp, bạn được tự vẽ biểu tượng và viết mô tả chiêu thức dựa trên tính chất nguyên tố. Hệ thống AI 3 lớp (Delimiter Sandboxing + Local RAG + Hard-Capped JSON Schema) sẽ đối chiếu với cơ sở dữ liệu IUPAC, chấm điểm khoa học và kẹp trần chỉ số cân bằng, đảm bảo 0% ảo giác và 0% gian lận.',
      tip: 'Hãy chứng minh bạn là một nhà giả kim hiện đại am hiểu khoa học!'
    }
  ];

  const handleNext = () => {
    sound.playUiClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    sound.playUiClick();
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const active = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-navy to-obsidian border border-navy-light rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playUiClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Progress Dots */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStep ? 'w-8 bg-cyan-ion' : 'w-2 bg-navy-light'
              }`}
            />
          ))}
        </div>

        {/* Card Content */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-obsidian border border-navy-light flex items-center justify-center mx-auto shadow-lg shadow-cyan-ion/10">
            {active.icon}
          </div>

          <h3 className="font-serif text-xl font-bold text-ivory">
            {active.title}
          </h3>

          <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed max-w-md mx-auto">
            {active.content}
          </p>

          <div className="p-3 rounded-xl bg-navy-light/40 border border-copper/30 text-xs text-copper text-left font-mono">
            <strong>Mẹo chiến thuật: </strong>
            {active.tip}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-navy-light/40 pt-4">
          <button
            disabled={currentStep === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-navy-light/60 hover:bg-navy-light text-ivory text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay Lại</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="text-xs text-ivory-muted hover:text-ivory transition-colors"
          >
            Bỏ qua hướng dẫn
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2 rounded-xl bg-cyan-ion text-obsidian text-xs font-bold transition-all hover:scale-105"
          >
            <span>{currentStep === steps.length - 1 ? 'Bắt Đầu Ngay' : 'Tiếp Theo'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
