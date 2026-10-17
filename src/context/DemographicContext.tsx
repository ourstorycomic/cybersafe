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
    // Typography: Cỡ chữ tiêu chuẩn, rõ ràng, thoáng đãng, chỉn chu (không phóng to quá lố kiểu trẻ con)
    bodyText: "text-base sm:text-lg font-normal text-slate-800 leading-relaxed",
    subText: "text-sm sm:text-base font-normal text-slate-600 leading-normal",
    headingText: "text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug",
    cardTitleText: "text-lg sm:text-xl font-bold text-slate-900 leading-snug",
    // Nút bấm trang nhã, kích thước chuẩn công sở/chính thống, không bo tròn bong bóng
    btnPrimary:
      "px-6 py-3.5 text-base sm:text-lg font-semibold bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-xl shadow-xs transition-colors cursor-pointer text-center",
    btnSecondary:
      "px-5 py-3 text-base font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-300 transition-colors cursor-pointer text-center",
    optionCard:
      "p-4 sm:p-5 rounded-xl border border-slate-300 bg-white hover:bg-blue-50/40 hover:border-blue-600 transition-all cursor-pointer shadow-xs",
    badgeStyle:
      "px-3 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200 font-semibold text-xs uppercase tracking-wide",
    // Giao diện trung tính, tương phản cao, trang nhã
    pageBg: "bg-slate-50",
    cardBg: "bg-white",
    cardBorder: "border border-slate-200 shadow-xs",
    roleName: "Người Cao Tuổi & Gia Đình",
    roleIcon: "🛡️",
    mascotGreeting: "Kính chào Quý độc giả! Hệ thống hỗ trợ tra cứu và hướng dẫn nhận diện các thủ đoạn lừa đảo qua mạng.",
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
  const [userRole, setUserRoleState] = useState<UserRole>("elderly");
  const [hasInitialized, setHasInitialized] = useState(false);

  // 1. Tải trạng thái từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("cybersafe_user_role");
      if (savedRole === "child" || savedRole === "elderly") {
        setUserRoleState(savedRole);
      } else {
        // Mặc định ban đầu: Người cao tuổi
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
