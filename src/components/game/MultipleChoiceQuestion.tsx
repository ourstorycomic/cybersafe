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
      {/* Dynamic Action Prompt - Tối ưu riêng biệt cho Trẻ em (Mascot 3D) và Người cao tuổi (Chữ to, giản lược rối mắt) */}
      <div
        className={`rounded-3xl border shadow-sm transition-all ${
          isElderly
            ? "p-5 sm:p-6 bg-amber-50/70 border-3 border-amber-300 space-y-3"
            : "p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-300 space-y-2"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{mascotInfo.avatarEmoji}</span>
            <span
              className={`font-black uppercase tracking-wider ${
                isElderly
                  ? "text-sm sm:text-base text-amber-950"
                  : "text-xs sm:text-sm text-sky-800"
              }`}
            >
              {mascotInfo.title}
            </span>
          </div>

          <span
            className={`font-black uppercase tracking-wide rounded-full px-3 py-1 ${
              isElderly
                ? "bg-amber-200 text-amber-950 text-xs border border-amber-400"
                : "bg-sky-200 text-sky-900 text-[10px] border border-sky-300"
            }`}
          >
            {isElderly ? "Cỡ chữ lớn • Thân thiện" : "Chế độ Trò Chơi"}
          </span>
        </div>

        <h3
          className={`font-black leading-snug ${
            isElderly
              ? "text-xl sm:text-2xl lg:text-3xl text-slate-950"
              : "text-base sm:text-lg text-slate-900"
          }`}
        >
          {story.questionPrompt}
        </h3>

        <p
          className={`font-bold ${
            isElderly
              ? "text-base sm:text-lg text-amber-950"
              : "text-xs sm:text-sm text-slate-600"
          }`}
        >
          {isElderly
            ? "👉 Bác hãy chọn 1 ô chữ to bên dưới rồi bấm nút NỘP BÀI."
            : mascotInfo.message}
        </p>
      </div>

      {/* Options List - Tự động thay đổi kích thước & độ tương phản theo đối tượng */}
      <div className="space-y-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          let containerStyle = isElderly
            ? "bg-white border-3 border-slate-400 hover:bg-amber-50/60 hover:border-blue-700 text-slate-950 shadow-sm"
            : "bg-white border-2 border-sky-200 border-b-4 border-sky-300 hover:bg-sky-50/50 hover:border-sky-500 text-slate-900 shadow-2xs";

          if (isSubmitted) {
            if (opt.is_correct) {
              containerStyle = isElderly
                ? "bg-emerald-50 border-3 border-emerald-700 text-emerald-950 font-black shadow-md ring-2 ring-emerald-300"
                : "bg-emerald-50 border-2 border-emerald-500 border-b-6 border-emerald-700 text-emerald-950 font-black";
            } else if (isSelected && !opt.is_correct) {
              containerStyle = isElderly
                ? "bg-rose-50 border-3 border-rose-700 text-rose-950 font-black shadow-md"
                : "bg-rose-50 border-2 border-rose-500 border-b-6 border-rose-700 text-rose-950 font-black";
            } else {
              containerStyle = "bg-slate-100 border-2 border-slate-200 text-slate-400 opacity-50";
            }
          } else if (isSelected) {
            containerStyle = isElderly
              ? "bg-blue-50 border-3 border-blue-700 text-blue-950 font-black shadow-md ring-4 ring-blue-200 scale-[1.01]"
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
                isElderly ? "p-5 sm:p-6 rounded-3xl" : "p-3.5 sm:p-4 rounded-2xl"
              } ${containerStyle}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4 w-full">
                  <div
                    className={`flex items-center justify-center font-black shrink-0 mt-0.5 transition-colors border ${
                      isElderly
                        ? "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl text-xl sm:text-2xl border-2"
                        : "w-8 h-8 rounded-xl text-sm"
                    } ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-800 shadow-sm"
                        : "bg-slate-100 text-slate-700 border-slate-300"
                    }`}
                  >
                    {isSubmitted && opt.is_correct ? (
                      <CheckCircle2 className={isElderly ? "w-7 h-7 text-emerald-600" : "w-5 h-5 text-emerald-600"} />
                    ) : isSubmitted && isSelected && !opt.is_correct ? (
                      <XCircle className={isElderly ? "w-7 h-7 text-rose-600" : "w-5 h-5 text-rose-600"} />
                    ) : (
                      letter
                    )}
                  </div>
                  <span
                    className={`font-black leading-relaxed pt-0.5 ${
                      isElderly ? "text-lg sm:text-xl lg:text-2xl text-slate-950" : "text-sm sm:text-base text-slate-900"
                    }`}
                  >
                    <HighlightKeywords text={cleanText} />
                  </span>
                </div>
              </div>

              {/* In-line explanation if submitted */}
              {isSubmitted && (isSelected || opt.is_correct) && (
                <div
                  className={`mt-2 p-3 sm:p-4 rounded-2xl border text-slate-950 font-bold leading-relaxed ${
                    opt.is_correct
                      ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                      : "bg-rose-50/90 border-rose-300 text-rose-950"
                  } ${isElderly ? "text-base sm:text-lg" : "text-xs sm:text-sm"}`}
                >
                  <strong className="font-black">Giải thích an toàn: </strong>
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
          className={`rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300 ${
            isElderly ? "py-4 px-6 text-base" : "py-2.5 px-4 text-xs"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isElderly ? "Chọn Lại Phương Án Khác" : "Làm lại câu này"}</span>
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={
              isElderly
                ? `py-5 sm:py-6 px-10 rounded-3xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 transition-all ${
                    selectedOptionId
                      ? "bg-blue-700 hover:bg-blue-800 text-white shadow-xl border-3 border-blue-950 cursor-pointer active:scale-98"
                      : "bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed"
                  }`
                : `py-4 px-8 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all ${
                    selectedOptionId
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-b-6 border-blue-800 active:border-b-0 active:translate-y-1 shadow-lg cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`
            }
          >
            <Check className={isElderly ? "w-7 h-7" : "w-5 h-5"} />
            <span>{isElderly ? "NỘP BÀI XÁC NHẬN" : "Xác Nhận Lựa Chọn"}</span>
            <ArrowRight className={isElderly ? "w-6 h-6" : "w-5 h-5"} />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {onNextQuestion && hasNext && (
              <button
                onClick={onNextQuestion}
                className={
                  isElderly
                    ? "w-full sm:w-auto py-5 sm:py-6 px-10 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl sm:text-2xl border-3 border-emerald-950 shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all"
                    : "w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse"
                }
              >
                <span>{isElderly ? "SANG ẢI TIẾP THEO" : "Qua Câu Tiếp Theo"}</span>
                <ArrowRight className={isElderly ? "w-6 h-6" : "w-5 h-5"} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
