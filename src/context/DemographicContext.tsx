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

export type FontSize = "normal" | "large" | "huge";

interface DemographicContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isElderly: boolean;
  isChild: boolean;
  theme: DemographicThemeConfig;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const DemographicContext = createContext<DemographicContextType | undefined>(undefined);

export const THEME_CONFIGS: Record<UserRole, DemographicThemeConfig> = {
  elderly: {
    role: "elderly",
    // Typography: Cỡ chữ to rõ ràng, độ tương phản cao, êm mắt cho người lớn tuổi
    bodyText: "text-lg sm:text-xl font-medium text-slate-900 leading-relaxed",
    subText: "text-base sm:text-lg font-normal text-slate-700 leading-normal",
    headingText: "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug",
    cardTitleText: "text-xl sm:text-2xl font-bold text-slate-900 leading-snug",
    // Nút bấm lớn, vững chãi, dễ chạm bấm
    btnPrimary:
      "px-7 py-4 text-base sm:text-lg font-bold bg-blue-900 hover:bg-blue-950 text-white rounded-2xl shadow-sm border-2 border-blue-950 transition-colors cursor-pointer text-center",
    btnSecondary:
      "px-6 py-3.5 text-base sm:text-lg font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl border-2 border-slate-300 transition-colors cursor-pointer text-center",
    optionCard:
      "p-5 sm:p-6 rounded-2xl border-2 border-slate-300 bg-white hover:bg-blue-50/60 hover:border-blue-700 transition-all cursor-pointer shadow-xs",
    badgeStyle:
      "px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 font-bold text-xs uppercase tracking-wide",
    // Nền kem ấm dễ chịu cho mắt người cao tuổi
    pageBg: "bg-[#FAF8F5]",
    cardBg: "bg-white",
    cardBorder: "border-2 border-slate-200 shadow-xs",
    roleName: "Người Cao Tuổi & Gia Đình",
    roleIcon: "🛡️",
    mascotGreeting: "Kính chào các Bác, Cô Chú và Gia đình! CyberSafe sẵn sàng đồng hành hỗ trợ Bác nhận diện và phòng ngừa các thủ đoạn lừa đảo.",
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
  const { user, profile } = useAuth();
  const [userRole, setUserRoleState] = useState<UserRole>("elderly");
  const [fontSize, setFontSizeState] = useState<FontSize>("large");
  const [hasInitialized, setHasInitialized] = useState(false);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("cybersafe_user_role", role);
      document.documentElement.setAttribute("data-user-role", role);
    }
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    if (typeof window !== "undefined") {
      localStorage.setItem("cybersafe_font_size", size);
      document.documentElement.setAttribute("data-font-size", size);
    }
  };

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

      const savedFontSize = localStorage.getItem("cybersafe_font_size") as FontSize;
      if (savedFontSize === "normal" || savedFontSize === "large" || savedFontSize === "huge") {
        setFontSizeState(savedFontSize);
        document.documentElement.setAttribute("data-font-size", savedFontSize);
      } else {
        document.documentElement.setAttribute("data-font-size", "large");
      }

      setHasInitialized(true);
    }
  }, []);

  // 2. Đồng bộ tự động với hồ sơ đăng nhập của người dùng:
  // Đăng nhập tài khoản nào thì lập tức chuyển sang giao diện chuẩn của tài khoản đó
  useEffect(() => {
    if (!hasInitialized) return;

    if (profile) {
      if (typeof profile.age === "number" && !isNaN(profile.age)) {
        setUserRole(profile.age >= 50 ? "elderly" : "child");
        return;
      }
      if (profile.target_group === "elder") {
        setUserRole("elderly");
        return;
      }
      if (profile.target_group === "student") {
        setUserRole("child");
        return;
      }
    }

    if (user) {
      const meta = (user.user_metadata as any) || {};
      if (typeof meta.age === "number" && !isNaN(meta.age)) {
        setUserRole(meta.age >= 50 ? "elderly" : "child");
        return;
      }
      if (meta.target_group === "elder") {
        setUserRole("elderly");
        return;
      }
      if (meta.target_group === "student") {
        setUserRole("child");
        return;
      }
    }
  }, [profile, user, hasInitialized]);

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
        fontSize,
        setFontSize,
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
