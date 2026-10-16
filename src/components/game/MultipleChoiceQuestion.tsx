"use client";

import { useState } from "react";
import { Scenario, MultipleChoiceOption } from "@/types/scenario";
import { parseScenarioStory } from "@/utils/scenarioStoryParser";
import { HighlightKeywords } from "@/utils/textHighlighter";
import { useDemographic } from "@/context/DemographicContext";
import {
  getDemographicButton,
  getDemographicMascotMessage,
} from "@/utils/dynamicDemographicUI";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  Check,
  Shield,
  Heart,
} from "lucide-react";

interface MultipleChoiceQuestionProps {
  scenario: Scenario;
  onFinish: (passed: boolean, earnedScore: number) => void;
  onNextQuestion?: () => void;
  hasNext?: boolean;
}

export function MultipleChoiceQuestion({
  scenario,
  onFinish,
  onNextQuestion,
  hasNext = true,
}: MultipleChoiceQuestionProps) {
  const { userRole, isElderly, isChild } = useDemographic();
  const options: MultipleChoiceOption[] = scenario.options.multiple_choice || [];
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const story = parseScenarioStory(scenario);
  const mascotInfo = getDemographicMascotMessage(userRole, "quiz_prompt");

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    const chosen = options.find((opt) => opt.id === selectedOptionId);
    const isCorrect = chosen?.is_correct || false;
    onFinish(isCorrect, isCorrect ? 100 : 30);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Dynamic Action Prompt - Tối ưu riêng biệt cho Trẻ em (Mascot 3D) và Người lớn tuổi (Rõ ràng, trang trọng, tương phản cao) */}
      <div
        className={`rounded-2xl border transition-all ${
          isElderly
            ? "p-4 sm:p-5 bg-blue-50/50 border border-blue-200 space-y-2 shadow-2xs"
            : "p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-300 space-y-2 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={isElderly ? "text-lg" : "text-xl sm:text-2xl"}>{mascotInfo.avatarEmoji}</span>
            <span
              className={`font-bold uppercase tracking-wider ${
                isElderly
                  ? "text-xs sm:text-sm text-blue-900"
                  : "text-xs sm:text-sm text-sky-800 font-black"
              }`}
            >
              {mascotInfo.title}
            </span>
          </div>

          <span
            className={`font-semibold uppercase tracking-wide rounded-full px-3 py-1 ${
              isElderly
                ? "bg-blue-100 text-blue-900 text-xs border border-blue-200"
                : "bg-sky-200 text-sky-900 text-[10px] border border-sky-300 font-black"
            }`}
          >
            {isElderly ? "Giao diện Dễ đọc" : "Chế độ Trò Chơi"}
          </span>
        </div>

        <h3
          className={`leading-snug ${
            isElderly
              ? "text-lg sm:text-xl lg:text-2xl font-bold text-slate-900"
              : "text-base sm:text-lg font-black text-slate-900"
          }`}
        >
          {story.questionPrompt}
        </h3>

        <p
          className={`${
            isElderly
              ? "text-sm sm:text-base font-normal text-slate-700"
              : "text-xs sm:text-sm font-bold text-slate-600"
          }`}
        >
          {mascotInfo.message}
        </p>
      </div>

      {/* Options List - Tự động thay đổi kích thước & độ tương phản theo đối tượng */}
      <div className="space-y-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          let containerStyle = isElderly
            ? "bg-white border border-slate-300 hover:bg-blue-50/40 hover:border-blue-600 text-slate-900 shadow-2xs"
            : "bg-white border-2 border-sky-200 border-b-4 border-sky-300 hover:bg-sky-50/50 hover:border-sky-500 text-slate-900 shadow-2xs";

          if (isSubmitted) {
            if (opt.is_correct) {
              containerStyle = isElderly
                ? "bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-bold shadow-xs"
                : "bg-emerald-50 border-2 border-emerald-500 border-b-6 border-emerald-700 text-emerald-950 font-black";
            } else if (isSelected && !opt.is_correct) {
              containerStyle = isElderly
                ? "bg-rose-50 border-2 border-rose-600 text-rose-950 font-bold shadow-xs"
                : "bg-rose-50 border-2 border-rose-500 border-b-6 border-rose-700 text-rose-950 font-black";
            } else {
              containerStyle = "bg-slate-100 border border-slate-200 text-slate-400 opacity-50";
            }
          } else if (isSelected) {
            containerStyle = isElderly
              ? "bg-blue-50/90 border-2 border-blue-700 text-blue-950 font-bold shadow-xs ring-2 ring-blue-100"
              : "bg-sky-50 border-2 border-blue-600 border-b-6 border-blue-800 text-blue-950 font-black shadow-sm scale-[1.01]";
          }

          const letter = String.fromCharCode(65 + idx);
          const cleanText = opt.label.replace(/^[A-Da-d][.):\s-]+/, "").trim();

          return (
            <div
              key={opt.id}
              onClick={() => {
                if (!isSubmitted) setSelectedOptionId(opt.id);
              }}
              className={`transition-all cursor-pointer flex flex-col gap-2 ${
                isElderly ? "p-4 sm:p-5 rounded-xl" : "p-3.5 sm:p-4 rounded-2xl"
              } ${containerStyle}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 w-full">
                  <div
                    className={`flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                      isElderly
                        ? "w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-sm sm:text-base font-bold"
                        : "w-8 h-8 rounded-xl text-sm font-black"
                    } ${
                      isSelected
                        ? "bg-blue-700 text-white border-blue-900 shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-300"
                    }`}
                  >
                    {isSubmitted && opt.is_correct ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isSubmitted && isSelected && !opt.is_correct ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    ) : (
                      letter
                    )}
                  </div>
                  <span
                    className={`leading-relaxed pt-0.5 ${
                      isElderly
                        ? "text-base sm:text-lg text-slate-900 font-semibold"
                        : "text-sm sm:text-base text-slate-900 font-black"
                    }`}
                  >
                    <HighlightKeywords text={cleanText} />
                  </span>
                </div>
              </div>

              {/* In-line explanation if submitted */}
              {isSubmitted && (isSelected || opt.is_correct) && (
                <div
                  className={`mt-2 p-3 sm:p-4 rounded-xl border leading-relaxed ${
                    opt.is_correct
                      ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                      : "bg-rose-50/90 border-rose-300 text-rose-950"
                  } ${isElderly ? "text-sm sm:text-base font-medium" : "text-xs sm:text-sm font-bold"}`}
                >
                  <strong className="font-bold">Giải thích an toàn: </strong>
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          onClick={handleReset}
          className={`rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300 ${
            isElderly ? "py-3 px-5 text-sm" : "py-2.5 px-4 text-xs"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isElderly ? "Chọn lại phương án khác" : "Làm lại câu này"}</span>
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={
              isElderly
                ? `py-3.5 px-7 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all ${
                    selectedOptionId
                      ? "bg-blue-700 hover:bg-blue-800 text-white shadow-sm border border-blue-900 cursor-pointer active:scale-98"
                      : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                  }`
                : `py-4 px-8 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all ${
                    selectedOptionId
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-b-6 border-blue-800 active:border-b-0 active:translate-y-1 shadow-lg cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`
            }
          >
            <Check className={isElderly ? "w-5 h-5" : "w-5 h-5"} />
            <span>{isElderly ? "Xác nhận câu trả lời" : "Xác Nhận Lựa Chọn"}</span>
            <ArrowRight className={isElderly ? "w-5 h-5" : "w-5 h-5"} />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {onNextQuestion && hasNext && (
              <button
                onClick={onNextQuestion}
                className={
                  isElderly
                    ? "w-full sm:w-auto py-3.5 px-7 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base sm:text-lg border border-emerald-900 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    : "w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse"
                }
              >
                <span>{isElderly ? "Tiếp tục sang tình huống tiếp theo" : "Qua Câu Tiếp Theo"}</span>
                <ArrowRight className={isElderly ? "w-5 h-5" : "w-5 h-5"} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
