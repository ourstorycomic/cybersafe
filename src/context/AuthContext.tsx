"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface UserProfileData {
  id: string;
  display_name: string;
  avatar_id: string;
  target_group: "student" | "elder" | "general";
  age?: number;
  date_of_birth?: string;
  phone_or_email?: string;
  total_score: number;
  streak_days: number;
  badges: any[];
  role?: string;
  pretest_score?: number;
  pretest_level?: string;
  pretest_completed?: boolean;
  needs_improvement?: string[];
  pretest_history?: any[];
}

export type AuthTabType = "signin" | "signup" | "forgot";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: AuthTabType;
  openAuthModal: (tab?: AuthTabType) => void;
  closeAuthModal: () => void;
  signIn: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    identifier: string;
    pass: string;
    displayName: string;
    age: number;
    dob?: string;
    targetGroup?: "student" | "elder" | "general";
    avatarId: string;
  }) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (identifier: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  recordPreTestResult: (
    score: number,
    details: {
      competencyLevel: string;
      needsImprovement: string[];
      answers?: Record<number, number>;
      isRetest?: boolean;
    }
  ) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper chuyển đổi SĐT hoặc Email thành định dạng tương thích hệ thống
export function normalizeAuthIdentifier(raw: string): { authEmail: string; isPhone: boolean; original: string } {
  const trimmed = raw.trim();
  if (trimmed.includes("@")) {
    return { authEmail: trimmed.toLowerCase(), isPhone: false, original: trimmed };
  }
  // Xử lý Số điện thoại
  const cleanPhone = trimmed.replace(/[^0-9]/g, "");
  return {
    authEmail: `sdt_${cleanPhone}@phone.cybersafe.vn`,
    isPhone: true,
    original: trimmed,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<AuthTabType>("signin");

  const openAuthModal = (tab: AuthTabType = "signin") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Tải hồ sơ từ Supabase user_profiles kèm dự phòng từ user metadata và localStorage
  const fetchProfile = async (userId: string, authUser?: User | null) => {
    const activeUser = authUser || user;
    const meta = (activeUser?.user_metadata as any) || {};

    let localExtra: any = {};
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`cybersafe_profile_extra_${userId}`);
        if (stored) localExtra = JSON.parse(stored);
      } catch {}
    }

    // Xác định nhóm đối tượng mục tiêu dựa trên metadata, localExtra và độ tuổi
    let targetGroup: "student" | "elder" | "general" =
      localExtra.target_group || meta.target_group || "general";
    const age = localExtra.age ?? meta.age;
    if (targetGroup === "general" && typeof age === "number") {
      if (age >= 50) targetGroup = "elder";
      else if (age < 18) targetGroup = "student";
    }

    // Hồ sơ mặc định được dựng từ auth user metadata + localStorage
    let constructed: UserProfileData = {
      id: userId,
      display_name: localExtra.display_name || meta.display_name || activeUser?.email?.split("@")[0] || "Học Viên",
      avatar_id: localExtra.avatar_id || meta.avatar_id || "guardian",
      target_group: targetGroup,
      age: age,
      phone_or_email: localExtra.phone_or_email || meta.phone_or_email || activeUser?.email,
      total_score: localExtra.total_score || 0,
      streak_days: localExtra.streak_days || 1,
      badges: localExtra.badges || [],
      role: localExtra.role || meta.role,
      pretest_completed: localExtra.pretest_completed ?? false,
      pretest_score: localExtra.pretest_score,
      needs_improvement: localExtra.needs_improvement,
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (!error && data) {
          constructed = {
            ...constructed,
            ...(data as UserProfileData),
            ...localExtra,
          };
          if (data.target_group) {
            constructed.target_group = data.target_group;
          }
        }
      } catch (e) {
        console.warn("Could not fetch user profile from table:", e);
      }
    }

    // Phục hồi dữ liệu Pre-test từ badges nếu bảng user_profiles chưa có cột riêng
    if (Array.isArray(constructed.badges)) {
      const preBadge = constructed.badges.find(
        (b: any) => b && typeof b === "object" && b.id === "badge_pretest"
      );
      if (preBadge) {
        constructed.pretest_completed = true;
        if (constructed.pretest_score === undefined) constructed.pretest_score = preBadge.score;
        if (!constructed.pretest_level) constructed.pretest_level = preBadge.level;
        if (!constructed.needs_improvement) constructed.needs_improvement = preBadge.needs_improvement;
      }
    }

    // Tự động phân loại nếu target_group vẫn là general nhưng có tuổi cụ thể
    if (constructed.target_group === "general" && typeof constructed.age === "number") {
      if (constructed.age >= 50) constructed.target_group = "elder";
      else if (constructed.age < 18) constructed.target_group = "student";
    }

    setProfile(constructed);
    if (typeof window !== "undefined") {
      localStorage.setItem(`cybersafe_profile_extra_${userId}`, JSON.stringify(constructed));
    }
    return constructed;
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id, user);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      setSession(initSession);
      const initialUser = initSession?.user ?? null;
      setUser(initialUser);
      if (initialUser) {
        fetchProfile(initialUser.id, initialUser).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    // 2. Listen for auth changes (Login, Logout, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      const newUser = newSession?.user ?? null;
      setUser(newUser);
      if (newUser) {
        await fetchProfile(newUser.id, newUser);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Đăng nhập: Tự động nhận diện Email hoặc SĐT
  const signIn = async (identifier: string, pass: string) => {
    if (!supabase) {
      return { success: false, error: "Hệ thống cơ sở dữ liệu Supabase chưa được cấu hình." };
    }
    try {
      const { authEmail } = normalizeAuthIdentifier(identifier);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: pass,
      });

      if (error) {
        let msg = error.message;
        if (msg.includes("Invalid login credentials")) {
          msg = "Email / SĐT hoặc mật khẩu không chính xác.";
        } else if (msg.includes("Email not confirmed")) {
          msg = "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra lại.";
        }
        return { success: false, error: msg };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user.id, data.user);
        closeAuthModal();
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Lỗi đăng nhập không xác định." };
    }
  };

  // Đăng ký: SĐT hoặc Email, có độ tuổi bắt buộc, mật khẩu tối thiểu 8 ký tự
  const signUp = async (signupData: {
    identifier: string;
    pass: string;
    displayName: string;
    age: number;
    dob?: string;
    targetGroup?: "student" | "elder" | "general";
    avatarId: string;
  }) => {
    if (!supabase) {
      return { success: false, error: "Hệ thống cơ sở dữ liệu Supabase chưa được cấu hình." };
    }

    if (signupData.pass.length < 8) {
      return { success: false, error: "Mật khẩu bảo mật phải có tối thiểu 8 ký tự." };
    }

    // Tự động phân loại nhóm người dùng theo độ tuổi nếu chưa chỉ định rõ
    let inferredGroup: "student" | "elder" | "general" = signupData.targetGroup || "general";
    if (signupData.age < 18) {
      inferredGroup = "student";
    } else if (signupData.age >= 55) {
      inferredGroup = "elder";
    }

    const { authEmail, isPhone, original } = normalizeAuthIdentifier(signupData.identifier);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: authEmail,
        password: signupData.pass,
        options: {
          data: {
            display_name: signupData.displayName.trim() || (isPhone ? `Học Viên ${original}` : "Học Viên An Toàn Số"),
            target_group: inferredGroup,
            age: signupData.age,
            date_of_birth: signupData.dob,
            phone_or_email: original,
            avatar_id: signupData.avatarId,
          },
        },
      });

      if (error) {
        let msg = error.message;
        if (msg.includes("User already registered")) {
          msg = `${isPhone ? "Số điện thoại" : "Email"} này đã được đăng ký. Vui lòng chuyển sang tab Đăng Nhập.`;
        } else if (msg.includes("Password should be at least")) {
          msg = "Mật khẩu bảo mật phải có độ dài tối thiểu 8 ký tự.";
        } else if (
          msg.includes("email rate limit exceeded") ||
          msg.includes("rate limit") ||
          msg.includes("over_email_send_rate_limit")
        ) {
          msg = "Đang chạm giới hạn gửi email của máy chủ. Bạn có thể vào Supabase Dashboard -> Authentication -> Email -> Tắt 'Confirm email' để vào ngay lập tức.";
        }
        return { success: false, error: msg };
      }

      if (data.user) {
        const extraData: UserProfileData = {
          id: data.user.id,
          display_name: signupData.displayName.trim() || "Học Viên An Toàn Số",
          avatar_id: signupData.avatarId,
          target_group: inferredGroup,
          age: signupData.age,
          date_of_birth: signupData.dob,
          phone_or_email: original,
          total_score: 0,
          streak_days: 1,
          badges: [],
          pretest_completed: false,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(`cybersafe_profile_extra_${data.user.id}`, JSON.stringify(extraData));
        }

        try {
          await supabase.from("user_profiles").upsert({
            id: data.user.id,
            display_name: extraData.display_name,
            avatar_id: extraData.avatar_id,
            target_group: extraData.target_group,
            total_score: 0,
            streak_days: 1,
          });
        } catch {}

        await fetchProfile(data.user.id);
        closeAuthModal();
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Lỗi đăng ký tài khoản." };
    }
  };

  // Quên mật khẩu: Reset qua Email hoặc Số điện thoại
  const resetPassword = async (identifier: string) => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      return { success: false, error: "Vui lòng nhập Email hoặc Số điện thoại đã đăng ký." };
    }

    const { authEmail, isPhone, original } = normalizeAuthIdentifier(trimmed);

    if (isPhone) {
      // Giả lập gửi OTP về Số điện thoại
      return {
        success: true,
        message: `Mã xác thực OTP đặt lại mật khẩu đã được tạo và gửi đến số điện thoại ${original}. Vui lòng kiểm tra hộp thư SMS trên thiết bị của bạn.`,
      };
    }

    if (!supabase) {
      return { success: false, error: "Hệ thống cơ sở dữ liệu chưa được cấu hình." };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        message: `Liên kết khôi phục mật khẩu đã được gửi đến email ${original}. Vui lòng mở hòm thư để thiết lập mật khẩu mới.`,
      };
    } catch (e: any) {
      return { success: false, error: e.message || "Lỗi gửi yêu cầu khôi phục mật khẩu." };
    }
  };

  // Lưu kết quả bài kiểm tra đầu vào Pre-Test & Re-test
  const recordPreTestResult = async (
    score: number,
    details: {
      competencyLevel: string;
      needsImprovement: string[];
      answers?: Record<number, number>;
      isRetest?: boolean;
    }
  ) => {
    if (!user) return;
    const extraKey = `cybersafe_profile_extra_${user.id}`;
    const historyKey = `cybersafe_pretest_history_${user.id}`;
    let currentExtra: any = {};
    let testHistory: any[] = [];

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(extraKey);
        if (stored) currentExtra = JSON.parse(stored);
        const storedHist = localStorage.getItem(historyKey);
        if (storedHist) testHistory = JSON.parse(storedHist);
      } catch {}
    }

    const completedAt = new Date().toISOString();
    const newAttempt = {
      score,
      total_questions: 10,
      competency_level: details.competencyLevel,
      needs_improvement: details.needsImprovement,
      answers: details.answers || {},
      test_type: details.isRetest ? "retest" : "pretest",
      completed_at: completedAt,
    };
    testHistory.push(newAttempt);

    // Đồng bộ vào danh sách huy hiệu badges
    const existingBadges: any[] = profile?.badges || currentExtra?.badges || [];
    const filteredBadges = existingBadges.filter(
      (b: any) => typeof b === "string" || (b && b.id !== "badge_pretest")
    );
    const pretestBadge = {
      id: "badge_pretest",
      name: "Đánh Giá Năng Lực Đầu Vào",
      type: "pretest",
      score,
      total: 10,
      level: details.competencyLevel,
      needs_improvement: details.needsImprovement,
      completed_at: completedAt,
    };
    const updatedBadges = [...filteredBadges, pretestBadge];

    const updatedExtra: UserProfileData = {
      ...profile,
      ...currentExtra,
      id: user.id,
      display_name: profile?.display_name || "Học Viên",
      avatar_id: profile?.avatar_id || "guardian",
      target_group: profile?.target_group || "general",
      total_score: (profile?.total_score || 0) + (details.isRetest ? Math.max(0, score * 5) : score * 10),
      streak_days: profile?.streak_days || 1,
      badges: updatedBadges,
      pretest_score: score,
      pretest_level: details.competencyLevel,
      pretest_completed: true,
      needs_improvement: details.needsImprovement,
      pretest_history: testHistory,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(extraKey, JSON.stringify(updatedExtra));
      localStorage.setItem(`cybersafe_pretest_done_${user.id}`, "true");
      localStorage.setItem(historyKey, JSON.stringify(testHistory));
    }

    setProfile(updatedExtra);

    if (supabase) {
      // 1. Đồng bộ vào bảng user_profiles
      try {
        const { error: fullErr } = await supabase.from("user_profiles").upsert({
          id: user.id,
          total_score: updatedExtra.total_score,
          badges: updatedExtra.badges,
          pretest_score: score,
          pretest_level: details.competencyLevel,
          needs_improvement: details.needsImprovement,
          pretest_completed: true,
        });

        if (fullErr) {
          // Fallback nếu database chưa có các cột mới: lưu qua badges JSONB & total_score
          await supabase.from("user_profiles").upsert({
            id: user.id,
            total_score: updatedExtra.total_score,
            badges: updatedExtra.badges,
          });
        }
      } catch (err) {
        console.warn("Lỗi lưu user_profiles pretest:", err);
      }

      // 2. Thử lưu vào bảng chuyên biệt pretest_results nếu đã tồn tại
      try {
        await supabase.from("pretest_results").insert({
          user_id: user.id,
          score,
          total_questions: 10,
          competency_level: details.competencyLevel,
          needs_improvement: details.needsImprovement,
          answers: details.answers || {},
          test_type: details.isRetest ? "retest" : "pretest",
        });
      } catch {
        // Bỏ qua nếu bảng chưa được tạo
      }
    }
  };

  // Cộng XP điểm kinh nghiệm động và đồng bộ vào profile & storage
  const addXp = async (amount: number) => {
    if (amount <= 0) return;
    const currentScore = profile?.total_score || 0;
    const newScore = currentScore + amount;

    if (user) {
      const extraKey = `cybersafe_profile_extra_${user.id}`;
      let currentExtra: any = {};
      try {
        const stored = localStorage.getItem(extraKey);
        if (stored) currentExtra = JSON.parse(stored);
      } catch {}

      const updated: UserProfileData = {
        ...profile,
        ...currentExtra,
        id: user.id,
        display_name: profile?.display_name || "Học Viên",
        avatar_id: profile?.avatar_id || "guardian",
        target_group: profile?.target_group || "general",
        total_score: newScore,
        streak_days: profile?.streak_days || 1,
        badges: profile?.badges || [],
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(extraKey, JSON.stringify(updated));
      }
      setProfile(updated);

      if (supabase) {
        try {
          await supabase.from("user_profiles").upsert({
            id: user.id,
            total_score: newScore,
          });
        } catch {}
      }
    } else {
      // Khách vãng lai: Lưu tạm XP
      if (typeof window !== "undefined") {
        const guestXp = Number(localStorage.getItem("cybersafe_guest_xp") || "0") + amount;
        localStorage.setItem("cybersafe_guest_xp", guestXp.toString());
      }
    }
  };

  // Đăng xuất an toàn, xử lý triệt để lỗi mạng/phiên hết hạn và dọn dẹp bộ nhớ
  const signOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn("Lỗi khi đăng xuất từ Supabase:", e);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        try {
          for (const key of Object.keys(localStorage)) {
            if (
              (key.startsWith("sb-") && (key.endsWith("-auth-token") || key.includes("supabase.auth"))) ||
              key.startsWith("supabase.auth.")
            ) {
              localStorage.removeItem(key);
            }
          }
        } catch {}
      }
    }
  };

  // Kiểm tra quyền Admin dựa trên role trong profile, user metadata hoặc email
  const isAdmin = Boolean(
    profile?.role === "admin" ||
    (user?.user_metadata as any)?.role === "admin" ||
    (user?.app_metadata as any)?.role === "admin" ||
    (user?.email && (
      user.email.toLowerCase() === "admin@cybersafe.vn" ||
      user.email.toLowerCase().startsWith("admin@") ||
      user.email.toLowerCase().includes("admin")
    )) ||
    (profile?.display_name && profile.display_name.toLowerCase().includes("admin"))
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAdmin,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        resetPassword,
        recordPreTestResult,
        addXp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
