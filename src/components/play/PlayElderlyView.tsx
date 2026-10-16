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
  userDisplayName = "học viên",
}: PlayElderlyViewProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. LỜI CHÀO TRANG TRỌNG & THÔNG TIN CHUYÊN MỤC */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>CHUYÊN ĐỀ DÀNH CHO NGƯỜI LỚN TUỔI & GIA ĐÌNH</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          Chào mừng {userDisplayName} đến với Phòng Luyện Tập.
        </h1>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-3xl">
          Chuyên trang tổng hợp các bài tập nhận diện tình huống thực tế, giúp người dùng dễ dàng phát hiện các chiêu thức lừa đảo qua điện thoại, tin nhắn giả mạo và bảo vệ trọn vẹn an toàn tài sản của bản thân cùng người thân.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-sm sm:text-base font-medium text-slate-700 border-t border-slate-100">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Nội dung hoàn toàn miễn phí & an toàn
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-600" />
            Có chỉ dẫn chi tiết từng tình huống
          </span>
        </div>
      </div>

      {/* 2. DANH SÁCH CÁC CHỦ ĐỀ HỌC TẬP */}
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Danh Sách Các Bài Luyện Tập Thực Tế:
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Chọn một chuyên đề bên dưới để bắt đầu xem tình huống và phương án xử lý:
          </p>
        </div>

        <div className="space-y-4">
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
                className="rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col md:flex-row items-center gap-5 sm:gap-6 group"
              >
                {/* Ảnh minh họa rõ ràng */}
                <div className="w-full md:w-48 h-40 sm:h-44 bg-slate-50 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-200 shrink-0">
                  <img
                    src={encodeURI(chapter.imageUrl)}
                    alt={chapter.title}
                    className="w-full h-full object-contain filter drop-shadow-xs select-none"
                  />
                </div>

                {/* Nội dung bài học */}
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      Chuyên đề {idx + 1}
                    </span>
                    {isDone && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ Đã hoàn thành chuyên đề này
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {chapter.title}
                  </h3>

                  <p className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                    {chapter.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {chapter.description}
                  </p>

                  {/* Nút vào bài */}
                  <div className="pt-2">
                    <Link
                      href={`/play/${chapter.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-sm border border-blue-900 transition-colors cursor-pointer"
                    >
                      <span>Vào học chuyên đề này</span>
                      <ArrowRight className="w-4 h-4 text-white" />
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
