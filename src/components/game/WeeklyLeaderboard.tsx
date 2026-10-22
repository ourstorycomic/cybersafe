"use client";

import { useState, useEffect } from "react";
import { Trophy, Flame, Award, Medal, Shield, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  group: "student" | "elder" | "general";
  score: number;
  streakDays: number;
  badgeCount: number;
}

export function WeeklyLeaderboard() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<"week" | "topic">("week");
  const [dbUsers, setDbUsers] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tải danh sách học viên THỰC TẾ từ Supabase Database
  const fetchLeaderboard = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("id, display_name, target_group, total_score, streak_days, badges")
        .order("total_score", { ascending: false })
        .limit(20);

      if (!error && data) {
        const mapped: LeaderboardEntry[] = data.map((item, idx) => ({
          rank: idx + 1,
          id: item.id,
          name: item.display_name || "Học Viên",
          group: (item.target_group as any) || "student",
          score: item.total_score || 0,
          streakDays: item.streak_days || 1,
          badgeCount: Array.isArray(item.badges) ? item.badges.length : 0,
        }));
        setDbUsers(mapped);
      }
    } catch (e) {
      console.warn("Lỗi tải bảng xếp hạng từ Supabase:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [profile?.total_score]);

  // Hợp nhất dữ liệu học viên thực tế từ hồ sơ (profile) với danh sách từ Supabase
  const combinedList = [...dbUsers];
  if (profile) {
    const existingIndex = combinedList.findIndex(
      (item) => item.id === profile.id
    );
    const userEntry: LeaderboardEntry = {
      rank: 0,
      id: profile.id,
      name: profile.display_name || "Bạn (Học Viên)",
      group: profile.target_group || "student",
      score: profile.total_score || 0,
      streakDays: profile.streak_days || 1,
      badgeCount: Array.isArray(profile.badges) ? profile.badges.length : 0,
    };

    if (existingIndex >= 0) {
      combinedList[existingIndex] = {
        ...combinedList[existingIndex],
        ...userEntry,
      };
    } else {
      combinedList.push(userEntry);
    }
  }

  // Sắp xếp chuẩn xác theo điểm XP giảm dần
  combinedList.sort((a, b) => b.score - a.score);

  // Đánh lại số thứ hạng thực tế
  const rankedList = combinedList.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  const displayList = rankedList.slice(0, 10);
  const currentUserRanked = profile
    ? rankedList.find((item) => item.id === profile.id)
    : null;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-xs p-5 sm:p-7 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Vinh Danh Xuất Sắc</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Bảng Xếp Hạng Top 10 Tuần
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab("week")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              tab === "week"
                ? "bg-white text-blue-900 font-black shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Toàn Tuần
          </button>
          <button
            type="button"
            onClick={() => setTab("topic")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              tab === "topic"
                ? "bg-white text-blue-900 font-black shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Theo Nhóm
          </button>
          <button
            type="button"
            onClick={fetchLeaderboard}
            title="Làm mới bảng xếp hạng từ cơ sở dữ liệu"
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-blue-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold">
              <th className="py-2.5 px-3">Hạng</th>
              <th className="py-2.5 px-3">Học Viên</th>
              <th className="py-2.5 px-3">Nhóm</th>
              <th className="py-2.5 px-3 text-center">Chuỗi Ngày</th>
              <th className="py-2.5 px-3 text-center">Huy Hiệu</th>
              <th className="py-2.5 px-3 text-right">Tổng Điểm XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                  <span className="text-xs font-semibold">Đang tải bảng xếp hạng thực tế từ máy chủ Supabase...</span>
                </td>
              </tr>
            ) : displayList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  <Shield className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <span className="text-xs font-semibold">Chưa có dữ liệu học viên trong bảng xếp hạng.</span>
                </td>
              </tr>
            ) : (
              displayList.map((item) => {
                const isCurrentUser =
                  profile && (profile.id === item.id || profile.display_name === item.name);
              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isCurrentUser ? "bg-blue-50/70 font-bold" : "hover:bg-slate-50/70"
                  }`}
                >
                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.rank === 1 && (
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs inline-flex items-center justify-center shadow-xs">
                        1
                      </span>
                    )}
                    {item.rank === 2 && (
                      <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black text-xs inline-flex items-center justify-center shadow-xs">
                        2
                      </span>
                    )}
                    {item.rank === 3 && (
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs inline-flex items-center justify-center shadow-xs">
                        3
                      </span>
                    )}
                    {item.rank > 3 && (
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs inline-flex items-center justify-center">
                        {item.rank}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{item.name}</span>
                      {isCurrentUser && (
                        <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-md">
                          Bạn
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.group === "student" && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        Học sinh
                      </span>
                    )}
                    {item.group === "elder" && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        Người cao tuổi
                      </span>
                    )}
                    {item.group === "general" && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        Phổ thông
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-rose-600">
                      <Flame className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{item.streakDays} ngày</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.badgeCount} / 7</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap font-mono font-black text-blue-700">
                    {item.score.toLocaleString()} XP
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>

      {/* Vị trí của người dùng hiện tại nếu nằm ngoài Top 10 */}
      {currentUserRanked && currentUserRanked.rank > 10 && (
        <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-700 text-white font-black text-xs inline-flex items-center justify-center shadow-xs">
              #{currentUserRanked.rank}
            </span>
            <div>
              <span className="font-bold text-slate-900">{currentUserRanked.name}</span>
              <span className="text-[11px] text-blue-700 font-semibold ml-2 bg-blue-100 px-2 py-0.5 rounded-md">
                Vị trí hiện tại của bạn
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:justify-end">
            <span className="inline-flex items-center gap-1 font-bold text-rose-600">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              <span>{currentUserRanked.streakDays} ngày</span>
            </span>
            <span className="font-mono font-black text-blue-700 text-sm">
              {currentUserRanked.score.toLocaleString()} XP
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
