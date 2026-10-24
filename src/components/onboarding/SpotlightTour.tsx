// src/components/onboarding/SpotlightTour.tsx
// Interactive Spotlight Onboarding Tour with Dynamic Cutout Mask, Floating Tooltips & Auto-Alignment
// Based on ELEMENTA Project Specification Phase B & Section 5

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  HelpCircle,
  Sword,
  Flame,
  Layers,
  BookOpen,
  Award,
  Zap
} from 'lucide-react';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
  positionPreference?: 'top' | 'bottom' | 'left' | 'right';
}

interface SpotlightTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  steps?: TourStep[];
}

const DEFAULT_TOUR_STEPS: TourStep[] = [
  {
    id: 'step_play_modes',
    targetSelector: '[data-tour="play-center"]',
    title: '1. Chọn Cách Chơi: TCG & MOBA',
    content: 'ELEMENTA cung cấp hai trải nghiệm cốt lõi: Đấu bài chiến thuật TCG 8000 LP theo luật Yu-Gi-Oh! và Đấu trường MOBA 60 FPS thời gian thực.',
    icon: <Sword className="w-5 h-5 text-amber-400" />,
    positionPreference: 'bottom'
  },
  {
    id: 'step_tcg_moba_buttons',
    targetSelector: '[data-tour="duel-cta"]',
    title: '2. Đấu Bài Chiến Thuật TCG (8000 LP)',
    content: 'Tham gia các ván đấu 8000 LP cân não. Triệu hồi quái thú nguyên tố, kích hoạt chuỗi phản ứng Chain và tận dụng phản ứng hóa học thật để tạo combo tối thượng.',
    icon: <Zap className="w-5 h-5 text-cyan-ion" />,
    positionPreference: 'bottom'
  },
  {
    id: 'step_quests_progress',
    targetSelector: '[data-tour="quests-section"]',
    title: '3. Nhiệm Vụ Tân Thủ & Ôn Tập CA-SRS',
    content: 'Hoàn thành các nhiệm vụ 10-15 phút mỗi ngày để nhận điểm kinh nghiệm XP và gói thẻ. Lỗi sai trong trận đấu sẽ tự động đưa vào lịch ôn tập giãn cách 1-3-7-14 ngày.',
    icon: <Award className="w-5 h-5 text-emerald-400" />,
    positionPreference: 'top'
  },
  {
    id: 'step_collection_deck',
    targetSelector: '[data-tour="collection-zone"]',
    title: '4. Kho Thẻ Đồ Sộ & Xây Dựng Deck',
    content: 'Khám phá kho hàng nghìn thẻ bài nguyên tố, hợp chất, xúc tác và môi trường chuẩn IUPAC. Tự do tùy biến bộ bài chiến thuật 10 ô hoặc Main Deck 40 lá.',
    icon: <Layers className="w-5 h-5 text-cyan-ion" />,
    positionPreference: 'top'
  },
  {
    id: 'step_knowledge_lab',
    targetSelector: '[data-tour="knowledge-lab"]',
    title: '5. Phòng Thí Nghiệm & Bảng Tuần Hoàn',
    content: 'Tra cứu 118 nguyên tố, sử dụng máy tính dung dịch & pH, và tự thiết kế kỹ năng nguyên tố tại Xưởng Sáng Tạo dưới sự thẩm định của AI Guardrails.',
    icon: <BookOpen className="w-5 h-5 text-yellow-400" />,
    positionPreference: 'top'
  },
  {
    id: 'step_unified_resources',
    targetSelector: '[data-tour="compendium-btn"]',
    title: '6. Cẩm Nang & Tài Nguyên Hợp Nhất',
    content: 'Bấm nút "Cẩm Nang & Tài Nguyên" bất kỳ lúc nào để tra cứu hơn 100 phản ứng kinh điển, xem hình học phân tử VSEPR và tài liệu chuẩn GDPT 2018.',
    icon: <Sparkles className="w-5 h-5 text-cyan-ion" />,
    positionPreference: 'bottom'
  }
];

export const SpotlightTour: React.FC<SpotlightTourProps> = ({
  isOpen,
  onClose,
  onComplete,
  steps = DEFAULT_TOUR_STEPS
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Recalculate target element position
  const updateSpotlightPosition = useCallback(() => {
    if (!isOpen || !currentStep) return;
    const element = document.querySelector(currentStep.targetSelector);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
      // Smooth scroll if element is out of viewport
      if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Fallback: center in screen if target not found
      setTargetRect(null);
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    updateSpotlightPosition();
    const handleResizeOrScroll = () => {
      updateSpotlightPosition();
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playUiClick();
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, true);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentStepIndex, updateSpotlightPosition]);

  if (!isOpen) return null;

  const handleNext = () => {
    sound.playUiClick();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    sound.playUiClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    sound.playUiClick();
    onClose();
  };

  // Compute tooltip coordinates dynamically
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      // Centered fallback
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed'
      };
    }

    const margin = 16;
    const tooltipWidth = 360;
    const tooltipHeight = 220;

    let top = targetRect.bottom + margin;
    let left = targetRect.left + (targetRect.width - tooltipWidth) / 2;

    // Check bottom overflow
    if (top + tooltipHeight > window.innerHeight - 20) {
      // Place above target
      top = Math.max(20, targetRect.top - tooltipHeight - margin);
    }

    // Check horizontal bounds
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      position: 'fixed',
      width: `${tooltipWidth}px`
    };
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto select-none animate-fadeIn">
      {/* Dark Backdrop SVG Mask */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="spotlight-mask">
            {/* White covers entire screen */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cutout over target element */}
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="14"
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* Semi-transparent dark overlay through the mask */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(4, 7, 16, 0.82)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Target Element Glowing Border */}
      {targetRect && (
        <div
          className="fixed pointer-events-none rounded-2xl border-2 border-cyan-ion shadow-[0_0_24px_rgba(87,200,200,0.6)] animate-pulse"
          style={{
            top: `${targetRect.top - 8}px`,
            left: `${targetRect.left - 8}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
            transition: 'all 0.25s ease-out'
          }}
        />
      )}

      {/* Floating Interactive Tooltip */}
      <div
        ref={tooltipRef}
        style={getTooltipStyle()}
        className="bg-navy/95 border border-cyan-ion/60 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-ivory flex flex-col gap-3 transition-all duration-200"
      >
        {/* Header with Step indicator */}
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-ion/15 text-cyan-ion">
              {currentStep.icon || <Sparkles className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-cyan-ion tracking-wider">
                Hướng Dẫn Tân Thủ
              </span>
              <h3 className="font-serif font-black text-sm text-ivory leading-tight">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="p-1 rounded-md text-ivory-muted hover:text-ivory hover:bg-navy-light/50 transition-colors"
            title="Đóng hướng dẫn (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <p className="text-xs text-ivory-muted leading-relaxed">
          {currentStep.content}
        </p>

        {/* Footer controls & progress */}
        <div className="flex items-center justify-between pt-2 border-t border-navy-light/40 text-xs">
          {/* Progress dots / numbers */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-5 bg-cyan-ion'
                    : idx < currentStepIndex
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-navy-light'
                }`}
              />
            ))}
            <span className="text-[10px] font-mono text-ivory-muted ml-1">
              {currentStepIndex + 1}/{steps.length}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-navy hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light/60 text-xs transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Trước</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-ion to-teal-400 text-obsidian font-bold text-xs shadow-md shadow-cyan-ion/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Bắt Đầu Ngay' : 'Tiếp Theo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
