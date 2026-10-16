"use client";

import { useState } from "react";
import Link from "next/link";
import { PUZZLE_CHAPTERS } from "@/data/puzzleChapters";
import { Scenario, PlayerProfile } from "@/types/scenario";
import { PlayerHeaderBar } from "@/components/game/PlayerHeaderBar";
import { WeeklyLeaderboard } from "@/components/game/WeeklyLeaderboard";
import {
  Star,
  Sword,
  Target,
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Lock,
  CheckCircle,
} from "lucide-react";

interface PlayChildViewProps {
  allScenarios: Scenario[];
  completedLevels: Record<number, { score: number; stars: number; passedSafely: boolean }>;
  unlockedLevelIndex: number;
  totalXp: number;
  streakDays: number;
  completedCount: number;
  progressPercent: number;
  rankTitle: string;
  rankColor: string;
  isJuryUnlockedAll: boolean;
  profile: PlayerProfile;
  supabaseStatus?: { connected: boolean; scenarioCount: number; message: string };
  authProfile?: any;
  viewMode: "map" | "list";
  onToggleViewMode: (mode: "map" | "list") => void;
  onToggleJuryMode: () => void;
  onUpdateProfile: (name: string, avatarId: string) => void;
  onResetJourney: () => void;
  onContinueActiveLevel: () => void;
  onOpenDatabaseInfo: () => void;
  onSelectLevel: (levelIndex: number) => void;
}

/**
 * PlayChildView: Dành riêng cho Học sinh & Trẻ em
 * Nguyên tắc: Gaming Dashboard, Game hóa cực mạnh (Gamification)
 * - Nổi bật XP, Chuỗi lửa Streak, Cấp bậc hiệp sĩ với hiệu ứng 3D hover.
 * - Danh sách nhiệm vụ dạng Grid nhiều cột.
 * - Sao vàng nổi bật (⭐ 0/9).
 * - Nút bấm 3D chunky Duolingo: "Nhận Nhiệm Vụ", "Vượt Ải Ngay".
 * - Pre-test hiển thị dạng "Nhiệm Vụ Bí Mật Cần Khắc Phục".
 */
export function PlayChildView({
  allScenarios,
  completedLevels,
  unlockedLevelIndex,
  totalXp,
  streakDays,
  completedCount,
  progressPercent,
  rankTitle,
  rankColor,
  isJuryUnlockedAll,
  profile,
  supabaseStatus,
  authProfile,
  viewMode,
  onToggleViewMode,
  onToggleJuryMode,
  onUpdateProfile,
  onResetJourney,
  onContinueActiveLevel,
  onOpenDatabaseInfo,
  onSelectLevel,
}: PlayChildViewProps) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const filteredBank = allScenarios.filter((s) => {
    if (selectedCategoryFilter === "all") return true;
    return s.category === selectedCategoryFilter;
  });

  return (
    <div className="space-y-8">
      {/* 1. GAMING DASHBOARD: STATUS BAR & 3D HOVER PROFILE */}
      <div className="transform hover:-translate-y-0.5 transition-transform duration-200">
        <PlayerHeaderBar
          profile={profile}
          totalXp={totalXp}
          streakDays={streakDays}
          completedCount={completedCount}
          progressPercent={progressPercent}
          unlockedLevelIndex={unlockedLevelIndex}
          rankTitle={rankTitle}
          rankColor={rankColor}
          isJuryUnlockedAll={isJuryUnlockedAll}
          viewMode={viewMode}
          supabaseStatus={supabaseStatus}
          onToggleViewMode={onToggleViewMode}
          onToggleJuryMode={onToggleJuryMode}
          onUpdateProfile={onUpdateProfile}
          onResetJourney={onResetJourney}
          onContinueActiveLevel={onContinueActiveLevel}
          onOpenDatabaseInfo={onOpenDatabaseInfo}
        />
      </div>

      {/* 2. NHIỆM VỤ BÍ MẬT CẦN KHẮC PHỤC (DIAGNOSTIC PRE-TEST AS QUEST) */}
      {authProfile?.needs_improvement && authProfile.needs_improvement.length > 0 && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border-2 border-amber-300 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wide">
              <span className="p-1 rounded-lg bg-amber-400 text-slate-950">
                <Target className="w-3.5 h-3.5" />
              </span>
              <span>Nhiệm vụ bí mật cần củng cố (Theo kết quả Khảo sát đầu vào):</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {authProfile.needs_improvement.map((topic: string, i: number) => (
                <span
                  key={i}
                  className="text-xs font-black px-3 py-1.5 rounded-xl bg-white border-2 border-amber-300 text-amber-950 shadow-2xs hover:scale-105 transition-transform"
                >
                  ⚔️ {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black text-amber-900 bg-amber-200 px-3.5 py-1.5 rounded-xl border border-amber-400 shadow-2xs">
              Điểm năng lực: {authProfile.pretest_score ?? 0}/10
            </span>
          </div>
        </div>
      )}

      {/* 3. BẢN ĐỒ CÁC VÙNG ĐẤT THỬ THÁCH (CHỦ ĐỀ DẠNG GRID GAMING) */}
      {viewMode === "map" ? (
        <div className="space-y-6">
          {/* Header Introduction */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-mono font-black text-sky-800 tracking-wider bg-sky-100 px-3.5 py-1 rounded-full border border-sky-300 inline-block">
              🌟 11 VÙNG ĐẤT THÁM TỬ NHÍ & TRỌN BỘ 39 ẢI PHÁ ÁN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Chọn Hành Trình Vượt Ải Hiệp Sĩ
            </h2>
            <p className="text-sm font-medium text-slate-600">
              Hoàn thành từng ải để nhận trọn vẹn 3 sao ⭐ và mở khóa các ải tiếp theo. Không thể bỏ qua (skip)!
            </p>
          </div>

          {/* Grid of Topics / Chapters (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PUZZLE_CHAPTERS.map((chapter) => {
              const chapterScenarios = chapter.scenarioIds
                .map((id) => allScenarios.find((s) => s.scenario_id === id))
                .filter(Boolean);

              const completedInChapter = chapterScenarios.filter((s) => {
                const gIdx = allScenarios.findIndex((all) => all.scenario_id === s?.scenario_id);
                return completedLevels[gIdx]?.passedSafely;
              }).length;

              const starsInChapter = chapterScenarios.reduce((acc, s) => {
                const gIdx = allScenarios.findIndex((all) => all.scenario_id === s?.scenario_id);
                return acc + (completedLevels[gIdx]?.stars || 0);
              }, 0);

              const totalStarsPossible = chapterScenarios.length * 3;
              const isCompleted = completedInChapter === chapterScenarios.length && chapterScenarios.length > 0;
              const chapterPercent = Math.round((completedInChapter / chapterScenarios.length) * 100);

              return (
                <div
                  key={chapter.id}
                  className="rounded-3xl bg-white border-2 border-sky-200 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
                >
                  {/* Top Badge: Topic Code & High-contrast Stars Counter */}
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-mono text-xs font-black px-3 py-1 rounded-xl bg-sky-100 text-sky-800 border border-sky-300">
                      {chapter.topicCode} • {chapterScenarios.length} Ải
                    </span>

                    {/* Glowing Stars Badge */}
                    <div className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300 shadow-2xs">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>
                        {starsInChapter}/{totalStarsPossible}★
                      </span>
                    </div>
                  </div>

                  {/* 3D Illustration Display */}
                  <div className="w-full h-48 sm:h-52 bg-slate-50/80 rounded-2xl overflow-hidden p-2.5 flex items-center justify-center border border-slate-100 group-hover:border-sky-300 group-hover:bg-sky-50/30 transition-all">
                    <img
                      src={encodeURI(chapter.imageUrl)}
                      alt={chapter.title}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 select-none"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-1">
                      {chapter.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 line-clamp-1">
                      {chapter.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Progress & Duolingo 3D Chunky Action Button */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-black text-slate-600">
                        <span>
                          Tiến trình: <strong>{completedInChapter}/{chapterScenarios.length} Ải</strong>
                        </span>
                        <span className={isCompleted ? "text-emerald-700" : "text-sky-700"}>
                          {isCompleted ? "CHIẾN THẮNG 🏆" : `${chapterPercent}%`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted
                              ? "bg-emerald-500 shadow-xs"
                              : "bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600"
                          }`}
                          style={{ width: `${Math.max(5, chapterPercent)}%` }}
                        />
                      </div>
                    </div>

                    {/* 3D Chunky Game Button */}
                    <Link
                      href={`/play/${chapter.id}`}
                      className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1"
                      }`}
                    >
                      <Sword className="w-4 h-4 text-amber-300" />
                      <span>{isCompleted ? "Xem Lại Bản Đồ Đề Tài" : "Nhận Nhiệm Vụ Ngay"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Alternative Filtered List View */
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Tất Cả 39 Ải" },
              { id: "fake_police_authority", label: "Mạo Danh Công Quyền" },
              { id: "fake_brand_bank", label: "Giả Mạo Ngân Hàng" },
              { id: "online_employment", label: "Lừa Đảo Việc Làm" },
              { id: "deepfake_multimedia", label: "Deepfake & AI" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategoryFilter === tab.id
                    ? "bg-blue-600 text-white shadow-md border-b-2 border-blue-900"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBank.map((scenario) => {
              const globalIdx = allScenarios.findIndex((all) => all.scenario_id === scenario.scenario_id);
              const isPassed = completedLevels[globalIdx]?.passedSafely;
              const isUnlocked = isJuryUnlockedAll || globalIdx <= unlockedLevelIndex;

              return (
                <div
                  key={scenario.scenario_id}
                  onClick={() => isUnlocked && onSelectLevel(globalIdx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isPassed
                      ? "bg-emerald-50/70 border-emerald-300 hover:border-emerald-500"
                      : isUnlocked
                      ? "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md"
                      : "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {scenario.scenario_id}
                    </span>
                    {isPassed ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-black">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Đã Vượt Qua
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-blue-600 font-black">Sẵn Sàng</span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Khóa
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-1">
                      {scenario.category_name_vi}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {scenario.stimulus?.content || scenario.context}
                    </p>
                  </div>
                  <button
                    disabled={!isUnlocked}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Vượt Ải Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      <WeeklyLeaderboard />
    </div>
  );
}
