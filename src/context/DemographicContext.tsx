"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export type UserRole = "child" | "elderly";

export interface DemographicThemeConfig {
  role: UserRole;
  // Typography
  bodyText: string;
  subText: string;
  headingText: string;
  cardTitleText: string;
  // Button sizes & styles
  btnPrimary: string;
  btnSecondary: string;
  optionCard: string;
  badgeStyle: string;
  // Container & background contrast
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  // Helper labels
  roleName: string;
  roleIcon: string;
  mascotGreeting: string;
}

interface DemographicContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isElderly: boolean;
  isChild: boolean;
  theme: DemographicThemeConfig;
}

const DemographicContext = createContext<DemographicContextType | undefined>(undefined);

export const THEME_CONFIGS: Record<UserRole, DemographicThemeConfig> = {
  elderly: {
    role: "elderly",
    // Typography: Phóng to toàn bộ font chữ, tối thiểu text-lg cho body, text-3xl/4xl cho heading
    bodyText: "text-lg sm:text-xl font-bold text-slate-950 leading-relaxed",
    subText: "text-base sm:text-lg font-semibold text-slate-800 leading-normal",
    headingText: "text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight",
    cardTitleText: "text-xl sm:text-2xl font-black text-slate-950 leading-snug",
    // Nút bấm khổng lồ, cao, dễ bấm, tương phản siêu cao
    btnPrimary:
      "py-5 px-8 text-xl sm:text-2xl font-black bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-3xl shadow-lg border-2 border-blue-900 hover:scale-[1.01] transition-transform cursor-pointer",
    btnSecondary:
      "py-4 px-6 text-lg sm:text-xl font-extrabold bg-amber-100 hover:bg-amber-200 text-slate-950 rounded-2xl border-2 border-amber-400 cursor-pointer transition-colors",
    optionCard:
      "p-5 sm:p-6 rounded-3xl border-3 border-slate-400 bg-white hover:bg-amber-50 hover:border-blue-600 transition-all cursor-pointer shadow-sm",
    badgeStyle:
      "px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 border-2 border-amber-300 font-black text-sm uppercase tracking-wide",
    // Tương phản cao: Nền dịu mắt, chữ đen đậm
    pageBg: "bg-amber-50/20",
    cardBg: "bg-white",
    cardBorder: "border-2 border-slate-300 shadow-md",
    roleName: "Người Cao Tuổi",
    roleIcon: "👴",
    mascotGreeting: "Kính chào Bác! Cháu là CyberSafe. Bác hãy chọn nút bấm to bên dưới để cháu hướng dẫn từng bước an toàn nhé.",
  },
  child: {
    role: "child",
    // Typography: Năng động, rõ ràng, phong cách game
    bodyText: "text-base sm:text-lg font-bold text-slate-900 leading-normal",
    subText: "text-xs sm:text-sm font-semibold text-slate-700",
    headingText: "text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight",
    cardTitleText: "text-lg sm:text-xl font-black text-blue-950",
    // Nút bấm 3D phong cách trò chơi (chunky game buttons)
    btnPrimary:
      "py-4 px-7 text-base sm:text-lg font-black bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl shadow-md border-b-6 border-blue-800 active:border-b-0 active:translate-y-1.5 transition-all cursor-pointer",
    btnSecondary:
      "py-3 px-5 text-sm sm:text-base font-black bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all cursor-pointer",
    optionCard:
      "p-4 sm:p-5 rounded-2xl border-2 border-sky-200 bg-white hover:border-sky-500 hover:bg-sky-50/50 hover:scale-[1.01] transition-all cursor-pointer shadow-sm border-b-4 border-sky-300",
    badgeStyle:
      "px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300 font-black text-xs uppercase tracking-wide",
    // Màu sắc sinh động, pastel đậm
    pageBg: "bg-gradient-to-b from-sky-50/60 via-indigo-50/30 to-white",
    cardBg: "bg-white",
    cardBorder: "border-2 border-sky-200 shadow-sm",
    roleName: "Trẻ Em & Học Sinh",
    roleIcon: "🧒",
    mascotGreeting: "Chào bạn nhỏ dũng cảm! Kẻ xấu đang giăng bẫy số trên mạng đấy, cùng Hiệp Sĩ CyberGuard truy tìm dấu vết lừa đảo nhé!",
  },
};

export function DemographicProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const [userRole, setUserRoleState] = useState<UserRole>("child");
  const [hasInitialized, setHasInitialized] = useState(false);

  // 1. Tải trạng thái từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("cybersafe_user_role");
      if (savedRole === "child" || savedRole === "elderly") {
        setUserRoleState(savedRole);
      } else {
        // Mặc định ban đầu
        setUserRoleState("elderly");
      }
      setHasInitialized(true);
    }
  }, []);

  // 2. Đồng bộ tự động với hồ sơ đăng nhập của người dùng nếu có
  useEffect(() => {
    if (!hasInitialized || !profile) return;
    if (profile.target_group === "elder") {
      setUserRoleState("elderly");
      if (typeof window !== "undefined") localStorage.setItem("cybersafe_user_role", "elderly");
    } else if (profile.target_group === "student") {
      setUserRoleState("child");
      if (typeof window !== "undefined") localStorage.setItem("cybersafe_user_role", "child");
    }
  }, [profile, hasInitialized]);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("cybersafe_user_role", role);
      // Gắn class data-role trên <html> để tiện cho CSS toàn cục nếu cần
      document.documentElement.setAttribute("data-user-role", role);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-user-role", userRole);
    }
  }, [userRole]);

  const theme = THEME_CONFIGS[userRole];

  return (
    <DemographicContext.Provider
      value={{
        userRole,
        setUserRole,
        isElderly: userRole === "elderly",
        isChild: userRole === "child",
        theme,
      }}
    >
      {children}
    </DemographicContext.Provider>
  );
}

export function useDemographic() {
  const context = useContext(DemographicContext);
  if (!context) {
    throw new Error("useDemographic must be used within a DemographicProvider");
  }
  return context;
}
