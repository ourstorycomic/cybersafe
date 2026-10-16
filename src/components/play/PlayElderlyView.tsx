"use client";

import Link from "next/link";
import { PUZZLE_CHAPTERS } from "@/data/puzzleChapters";
import { Scenario } from "@/types/scenario";
import { ArrowRight, ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";

interface PlayElderlyViewProps {
  allScenarios: Scenario[];
  completedLevels: Record<number, { score: number; stars: number; passedSafely: boolean }>;
  userDisplayName?: string;
}

/**
 * PlayElderlyView: Dành riêng cho Người Cao Tuổi
 * Nguyên tắc: Tối giản 100%. Không có bất kỳ yếu tố Game hóa (Gamification) nào.
 * Ẩn sạch: XP, Streak, Level Progress, Sao vàng, Supabase tag, Tab chuyển đổi rườm rà.
 * Header: Khung lời chào trang trọng, font chữ cực to.
 * Layout: Danh sách 1 cột căn giữa thoáng đãng, dễ đọc.
 * Nút bấm: "Bắt đầu học cách phòng tránh" siêu to, rõ ràng.
 */
export function PlayElderlyView({
  allScenarios,
  completedLevels,
  userDisplayName = "Bác",
}: PlayElderlyViewProps) {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* 1. LỜI CHÀO TRANG TRỌNG (HEADER CỰC TO, RÕ RÀNG) */}
      <div className="rounded-3xl bg-amber-50/90 border-4 border-amber-300 p-8 sm:p-10 shadow-md space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-200/90 border-2 border-amber-400 text-amber-950 font-black text-base sm:text-lg">
          <HeartHandshake className="w-6 h-6 text-amber-800" />
          <span>CHƯƠNG TRÌNH DÀNH RIÊNG CHO BÁC & GIA ĐÌNH</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Kính chào {userDisplayName}.
        </h1>

        <p className="text-xl sm:text-2xl text-slate-900 font-bold leading-relaxed max-w-3xl">
          Dưới đây là các bài tập thực hành tình huống giúp Bác dễ dàng nhận biết cuộc gọi lừa đảo, tin nhắn giả mạo và bảo vệ trọn vẹn tiền tiết kiệm của gia đình.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-base sm:text-lg font-bold text-slate-950 border-t-2 border-amber-200">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            100% Miễn phí & An toàn
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-blue-700" />
            Có chỉ dẫn chi tiết từng tình huống
          </span>
        </div>
      </div>

      {/* 2. DANH SÁCH CÁC CHỦ ĐỀ: BỐ CỤC 1 CỘT TO RÕ, KHÔNG GAMIFICATION */}
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Danh Sách Các Bài Luyện Tập:
          </h2>
          <p className="text-lg font-bold text-slate-700">
            Bác hãy bấm vào nút màu xanh của bất kỳ bài nào dưới đây để bắt đầu học:
          </p>
        </div>

        <div className="space-y-6">
          {PUZZLE_CHAPTERS.map((chapter, idx) => {
            const chapterScenarios = chapter.scenarioIds
              .map((id) => allScenarios.find((s) => s.scenario_id === id))
              .filter(Boolean);

            const completedInChapter = chapterScenarios.filter((s) => {
              const gIdx = allScenarios.findIndex((all) => all.scenario_id === s?.scenario_id);
              return completedLevels[gIdx]?.passedSafely;
            }).length;

            const isDone = completedInChapter === chapterScenarios.length && chapterScenarios.length > 0;

            return (
              <div
                key={chapter.id}
                className="rounded-3xl bg-white border-4 border-slate-300 hover:border-blue-700 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 group"
              >
                {/* Ảnh minh họa to, rõ ràng */}
                <div className="w-full md:w-56 h-48 sm:h-52 bg-slate-50 rounded-2xl overflow-hidden p-3 flex items-center justify-center border-2 border-slate-200 shrink-0">
                  <img
                    src={encodeURI(chapter.imageUrl)}
                    alt={chapter.title}
                    className="w-full h-full object-contain filter drop-shadow-sm select-none"
                  />
                </div>

                {/* Nội dung bài học */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
                      Bài {idx + 1}
                    </span>
                    {isDone && (
                      <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300">
                        ✓ Bác đã hoàn thành bài này
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                    {chapter.title}
                  </h3>

                  <p className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                    {chapter.subtitle}
                  </p>

                  <p className="text-base text-slate-700 font-semibold leading-relaxed line-clamp-2">
                    {chapter.description}
                  </p>

                  {/* Nút bấm siêu to khổng lồ */}
                  <div className="pt-2">
                    <Link
                      href={`/play/${chapter.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xl sm:text-2xl shadow-lg border-b-6 border-blue-950 active:border-b-0 active:translate-y-1.5 transition-all cursor-pointer min-h-[64px]"
                    >
                      <span>Bắt đầu học cách phòng tránh</span>
                      <ArrowRight className="w-6 h-6 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
