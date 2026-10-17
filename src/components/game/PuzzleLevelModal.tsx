"use client";

import { Scenario } from "@/types/scenario";
import { StimulusSimulator } from "@/components/game/StimulusSimulator";
import { BranchingScenarioQuestion } from "@/components/game/BranchingScenarioQuestion";
import { HotspotQuestion } from "@/components/game/HotspotQuestion";
import { MultipleChoiceQuestion } from "@/components/game/MultipleChoiceQuestion";
import { EducationalFeedbackModal } from "@/components/game/EducationalFeedbackModal";
import { useDemographic } from "@/context/DemographicContext";
import { X, ArrowLeft, Shield, Award, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface PuzzleLevelModalProps {
  scenario: Scenario;
  levelIndex: number; // 0-indexed
  totalLevels: number;
  isOpen: boolean;
  onClose: () => void;
  onCompleteLevel: (levelIndex: number, scenarioId: string, passed: boolean, score: number) => void;
  onNextLevel: () => void;
  onPrevLevel?: () => void;
  hasNext: boolean;
  hasPrev?: boolean;
}

export function PuzzleLevelModal({
  scenario,
  levelIndex,
  totalLevels,
  isOpen,
  onClose,
  onCompleteLevel,
  onNextLevel,
  onPrevLevel,
  hasNext,
  hasPrev = false,
}: PuzzleLevelModalProps) {
  const { userRole, isElderly, isChild } = useDemographic();
  const [modalFeedbackState, setModalFeedbackState] = useState<{
    isOpen: boolean;
    passedSafely: boolean;
    earnedScore: number;
  }>({
    isOpen: false,
    passedSafely: false,
    earnedScore: 0,
  });

  // Key để reset lại câu hỏi khi người dùng bấm Thử lại
  const [questionAttemptKey, setQuestionAttemptKey] = useState<number>(0);
  // Đếm ngược thời gian làm bài (90 giây) theo wireframe
  const [secondsLeft, setSecondsLeft] = useState<number>(90);

  useEffect(() => {
    if (!isOpen || modalFeedbackState.isOpen) return;
    setSecondsLeft(90);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, scenario.scenario_id, questionAttemptKey, modalFeedbackState.isOpen]);

  if (!isOpen) return null;

  const levelNum = levelIndex + 1;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const handleFinishQuestion = (passedSafely: boolean, earnedScore: number) => {
    // Record to parent
    onCompleteLevel(levelIndex, scenario.scenario_id, passedSafely, earnedScore);

    // Open educational feedback
    setModalFeedbackState({
      isOpen: true,
      passedSafely,
      earnedScore,
    });
  };

  const handleModalNextQuestion = () => {
    setModalFeedbackState({ isOpen: false, passedSafely: false, earnedScore: 0 });
    onNextLevel();
  };

  const handleRetryQuestion = () => {
    setModalFeedbackState({ isOpen: false, passedSafely: false, earnedScore: 0 });
    setQuestionAttemptKey((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !modalFeedbackState.isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, modalFeedbackState.isOpen, onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-2xl p-4 sm:p-6 my-2 flex flex-col gap-4 max-h-[95vh] overflow-y-auto cursor-default"
      >
        {/* Top Header Bar - STICKY TOP */}
        <div className={`sticky -top-4 sm:-top-6 -mt-2 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-3 pb-3 backdrop-blur-md border-b z-40 flex items-center justify-between gap-3 shadow-2xs ${
          isElderly ? "bg-amber-50/95 border-amber-300" : "bg-slate-50/95 border-slate-200"
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`rounded-xl border transition-colors cursor-pointer flex items-center gap-2 font-black ${
                isElderly 
                  ? "p-3 sm:px-4 sm:py-2.5 bg-white hover:bg-amber-100 border-slate-400 text-slate-950 text-base" 
                  : "p-2 sm:px-3 sm:py-1.5 bg-white hover:bg-slate-100 border-slate-300 text-slate-700 text-xs"
              }`}
            >
              <ArrowLeft className={isElderly ? "w-6 h-6 text-slate-950" : "w-4 h-4"} />
              <span className="hidden sm:inline">{isElderly ? "Quay lại bản đồ" : "Trở lại bản đồ"}</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full font-mono font-black ${
                  isElderly
                    ? "px-3 py-1 bg-blue-700 text-white text-sm"
                    : "px-2.5 py-0.5 bg-blue-600 text-white text-xs"
                }`}>
                  ẢI {levelNum} / {totalLevels}
                </span>
                <span className={`uppercase font-bold ${
                  isElderly ? "text-sm text-slate-700" : "text-xs text-slate-500"
                }`}>
                  {scenario.scenario_id}
                </span>
              </div>
              <h3 className={`font-black text-slate-950 leading-snug line-clamp-1 ${
                isElderly ? "text-lg sm:text-2xl" : "text-sm sm:text-lg"
              }`}>
                {scenario.category_name_vi}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Countdown Timer Widget */}
            <div
              className={`flex items-center gap-1.5 rounded-xl border shadow-2xs font-mono font-black ${
                isElderly ? "px-4 py-2 text-base border-2" : "px-3 py-1.5 text-xs sm:text-sm"
              } ${
                secondsLeft <= 15
                  ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
                  : "bg-white border-slate-300 text-slate-800"
              }`}
              title="Thời gian thực hiện câu hỏi"
            >
              <Clock className={isElderly ? "w-5 h-5 text-amber-600" : "w-4 h-4 text-amber-600"} />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={onClose}
              className={`rounded-xl bg-white hover:bg-slate-100 transition-colors cursor-pointer border shrink-0 ${
                isElderly ? "p-2.5 border-slate-300 text-slate-800 hover:text-slate-950" : "p-1.5 border-slate-200 text-slate-500 hover:text-slate-900"
              }`}
              title="Đóng ải (Trở lại)"
            >
              <X className={isElderly ? "w-6 h-6" : "w-5 h-5"} />
            </button>
          </div>
        </div>

        {/* Challenge Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Device Simulator */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Tình huống trên điện thoại</span>
            </div>
            <StimulusSimulator
              stimulus={scenario.stimulus}
              contextText={scenario.context}
              scenario={scenario}
            />
          </div>

          {/* Right: Question Interaction */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Lựa chọn cách xử lý của bạn</span>
            </div>

            {scenario.question_type === "branching_scenario" && (
              <BranchingScenarioQuestion
                key={`${scenario.scenario_id}_${questionAttemptKey}`}
                scenario={scenario}
                onFinish={handleFinishQuestion}
                onNextQuestion={handleModalNextQuestion}
                hasNext={hasNext}
              />
            )}

            {scenario.question_type === "hotspot" && (
              <HotspotQuestion
                key={`${scenario.scenario_id}_${questionAttemptKey}`}
                scenario={scenario}
                onFinish={handleFinishQuestion}
                onNextQuestion={handleModalNextQuestion}
                hasNext={hasNext}
              />
            )}

            {scenario.question_type === "multiple_choice" && (
              <MultipleChoiceQuestion
                key={`${scenario.scenario_id}_${questionAttemptKey}`}
                scenario={scenario}
                onFinish={handleFinishQuestion}
                onNextQuestion={handleModalNextQuestion}
                onPrevQuestion={onPrevLevel}
                hasNext={hasNext}
                hasPrev={hasPrev}
              />
            )}
          </div>
        </div>

        {/* Educational Feedback Modal */}
        <EducationalFeedbackModal
          isOpen={modalFeedbackState.isOpen}
          onClose={() =>
            setModalFeedbackState((prev) => ({ ...prev, isOpen: false }))
          }
          scenario={scenario}
          passedSafely={modalFeedbackState.passedSafely}
          earnedScore={modalFeedbackState.earnedScore}
          onNextQuestion={handleModalNextQuestion}
          onRetry={handleRetryQuestion}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
}
