"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  Download,
  RefreshCw,
  ArrowLeft,
  Database,
  ShieldCheck,
  Search,
  MessageSquare,
  Lock,
  ShieldAlert,
  LogIn,
  LogOut,
  UserCheck,
  ChevronRight,
  Award,
  GraduationCap,
  X,
  FileSpreadsheet,
} from "lucide-react";

interface UserProgressRecord {
  id?: string;
  user_id?: string;
  scenario_id: string;
  score: number;
  passed_safely: boolean;
  attempts: number;
  completed_at: string;
}

interface ChatbotRecord {
  id?: string;
  user_id?: string;
  input_text: string;
  risk_level: string;
  risk_score: number;
  analysis_summary: string;
  created_at?: string;
}

interface UserProfileRecord {
  id: string;
  display_name: string;
  avatar_id?: string;
  target_group?: string;
  total_score?: number;
  streak_days?: number;
  role?: string;
  badges?: any[];
  pretest_score?: number;
  pretest_level?: string;
  pretest_completed?: boolean;
  needs_improvement?: string[];
  created_at?: string;
}

export interface PreTestReportRecord {
  id: string;
  userId: string;
  displayName: string;
  targetGroup: string;
  score: number;
  totalQuestions: number;
  percent: number;
  competencyLevel: string;
  needsImprovement: string[];
  testType: string;
  completedAt: string;
}

export interface StudentReport {
  userId: string;
  displayName: string;
  targetGroup: string;
  completedCount: number;
  safeCount: number;
  safeRate: number;
  avgScore: number;
  avgAttempts: string;
  detScore: number;
  verScore: number;
  accScore: number;
  resScore: number;
  classification: string;
  lastCompleted: string;
  records: UserProgressRecord[];
  pretestScore?: number;
  pretestLevel?: string;
  needsImprovement?: string[];
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressList, setProgressList] = useState<UserProgressRecord[]>([]);
  const [chatbotList, setChatbotList] = useState<ChatbotRecord[]>([]);
  const [profilesList, setProfilesList] = useState<UserProfileRecord[]>([]);
  const [pretestResultsList, setPretestResultsList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"students" | "progress" | "chatbot" | "profiles" | "pretest">("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentReport | null>(null);

  const { user, profile, isAdmin, isLoading: authLoading, openAuthModal, signOut } = useAuth();

  const loadData = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        // 1. Fetch user progress trực tiếp từ bảng user_progress
        const { data: pData, error: pErr } = await supabase
          .from("user_progress")
          .select("*")
          .order("completed_at", { ascending: false })
          .limit(200);

        if (!pErr && pData) {
          setProgressList(pData);
        } else {
          setProgressList([]);
        }

        // 2. Fetch chatbot queries trực tiếp từ bảng chatbot_consultations
        const { data: cData, error: cErr } = await supabase
          .from("chatbot_consultations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);

        if (!cErr && cData) {
          setChatbotList(cData);
        } else {
          setChatbotList([]);
        }

        // 3. Fetch hồ sơ học viên trực tiếp từ bảng user_profiles
        const { data: uData, error: uErr } = await supabase
          .from("user_profiles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);

        if (!uErr && uData) {
          setProfilesList(uData);
        } else {
          setProfilesList([]);
        }

        // 4. Fetch bài kiểm tra đầu vào trực tiếp từ bảng pretest_results (nếu có)
        try {
          const { data: preData, error: preErr } = await supabase
            .from("pretest_results")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

          if (!preErr && preData) {
            setPretestResultsList(preData);
          } else {
            setPretestResultsList([]);
          }
        } catch {
          setPretestResultsList([]);
        }
      } else {
        setProgressList([]);
        setChatbotList([]);
        setProfilesList([]);
        setPretestResultsList([]);
      }
    } catch (err) {
      console.warn("Lỗi tải dữ liệu quản trị từ Supabase:", err);
      setProgressList([]);
      setChatbotList([]);
      setProfilesList([]);
      setPretestResultsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleString("vi-VN");
    } catch {
      return dateStr;
    }
  };

  // Compute metrics từ database thật
  const totalSubmissions = progressList.length;
  const safeCount = progressList.filter((p) => p.passed_safely).length;
  const safeRate = totalSubmissions > 0 ? Math.round((safeCount / totalSubmissions) * 100) : 0;
  const avgScore =
    totalSubmissions > 0
      ? Math.round(progressList.reduce((acc, cur) => acc + (cur.score || 0), 0) / totalSubmissions)
      : 0;

  // Tổng hợp dữ liệu theo từng Học viên (1 dòng = 1 Học viên / 1 Đối tượng nghiên cứu KHKT)
  const studentReports: StudentReport[] = useMemo(() => {
    const userMap = new Map<string, UserProgressRecord[]>();

    progressList.forEach((p) => {
      const uid = p.user_id || "guest";
      if (!userMap.has(uid)) {
        userMap.set(uid, []);
      }
      userMap.get(uid)!.push(p);
    });

    const reports: StudentReport[] = [];
    for (const [uid, records] of userMap.entries()) {
      const prof = profilesList.find((pr) => pr.id === uid);
      const displayName =
        prof?.display_name ||
        (uid === "guest" ? "Khách trải nghiệm ẩn danh" : `Học viên (${uid.slice(0, 8)}...)`);
      const targetGroup =
        prof?.target_group === "student"
          ? "Học sinh - Sinh viên"
          : prof?.target_group === "elder"
          ? "Người cao tuổi"
          : "Người dùng phổ thông";

      const completedCount = records.length;
      const safeCount = records.filter((r) => r.passed_safely).length;
      const safeRate = completedCount > 0 ? Math.round((safeCount / completedCount) * 100) : 0;
      const avgScore =
        completedCount > 0
          ? Math.round(records.reduce((a, b) => a + (b.score || 0), 0) / completedCount)
          : 0;
      const avgAttempts =
        completedCount > 0
          ? (records.reduce((a, b) => a + (b.attempts || 1), 0) / completedCount).toFixed(1)
          : "1.0";

      const detScore = Math.min(100, Math.round(safeRate * 0.95 + 5));
      const verScore = Math.min(100, Math.round(safeRate * 0.9 + (avgScore > 80 ? 10 : 0)));
      const accScore = Math.min(100, Math.round(safeRate * 0.85 + (avgScore > 90 ? 15 : 5)));
      const resScore = Math.min(100, Math.round(safeRate * 0.92 + 8));

      let classification = "Cần rèn luyện thêm";
      if (safeRate >= 90 && avgScore >= 85) classification = "Xuất sắc (Phản xạ tốt)";
      else if (safeRate >= 75 && avgScore >= 70) classification = "Đạt chuẩn Khá";
      else if (safeRate >= 60) classification = "Trung bình";

      let pretestScore: number | undefined = prof?.pretest_score;
      let pretestLevel: string | undefined = prof?.pretest_level;
      let needsImprovement: string[] | undefined = prof?.needs_improvement;

      if (pretestScore === undefined && Array.isArray(prof?.badges)) {
        const preBadge = prof.badges.find(
          (b: any) => b && typeof b === "object" && b.id === "badge_pretest"
        );
        if (preBadge) {
          pretestScore = preBadge.score;
          pretestLevel = preBadge.level;
          needsImprovement = preBadge.needs_improvement;
        }
      }

      const matchedPre = pretestResultsList.find((p) => p.user_id === uid);
      if (matchedPre) {
        pretestScore = matchedPre.score;
        pretestLevel = matchedPre.competency_level;
        needsImprovement = matchedPre.needs_improvement;
      }

      reports.push({
        userId: uid,
        displayName,
        targetGroup,
        completedCount,
        safeCount,
        safeRate,
        avgScore,
        avgAttempts,
        detScore,
        verScore,
        accScore,
        resScore,
        classification,
        lastCompleted: records[0]?.completed_at || "",
        records,
        pretestScore,
        pretestLevel,
        needsImprovement,
      });
    }

    // Bổ sung các học viên có trong profilesList nhưng chưa làm ải nào (ví dụ mới làm bài pretest)
    profilesList.forEach((prof) => {
      if (!userMap.has(prof.id)) {
        let pretestScore: number | undefined = prof.pretest_score;
        let pretestLevel: string | undefined = prof.pretest_level;
        let needsImprovement: string[] | undefined = prof.needs_improvement;

        if (pretestScore === undefined && Array.isArray(prof.badges)) {
          const preBadge = prof.badges.find(
            (b: any) => b && typeof b === "object" && b.id === "badge_pretest"
          );
          if (preBadge) {
            pretestScore = preBadge.score;
            pretestLevel = preBadge.level;
            needsImprovement = preBadge.needs_improvement;
          }
        }
        const matchedPre = pretestResultsList.find((p) => p.user_id === prof.id);
        if (matchedPre) {
          pretestScore = matchedPre.score;
          pretestLevel = matchedPre.competency_level;
          needsImprovement = matchedPre.needs_improvement;
        }

        reports.push({
          userId: prof.id,
          displayName: prof.display_name,
          targetGroup:
            prof.target_group === "student"
              ? "Học sinh - Sinh viên"
              : prof.target_group === "elder"
              ? "Người cao tuổi"
              : "Người dùng phổ thông",
          completedCount: 0,
          safeCount: 0,
          safeRate: 0,
          avgScore: 0,
          avgAttempts: "0.0",
          detScore: 0,
          verScore: 0,
          accScore: 0,
          resScore: 0,
          classification: pretestLevel ? "Đã làm khảo sát đầu vào" : "Chưa làm bài",
          lastCompleted: prof.created_at || "",
          records: [],
          pretestScore,
          pretestLevel,
          needsImprovement,
        });
      }
    });

    return reports;
  }, [progressList, profilesList, pretestResultsList]);

  // Tổng hợp dữ liệu Pre-Test / Re-test
  const pretestReports: PreTestReportRecord[] = useMemo(() => {
    const list: PreTestReportRecord[] = [];

    // 1. Thêm từ bảng pretestResultsList nếu có
    pretestResultsList.forEach((r) => {
      const prof = profilesList.find((p) => p.id === r.user_id);
      list.push({
        id: r.id || `${r.user_id}-${r.created_at}`,
        userId: r.user_id,
        displayName: prof?.display_name || `Học viên (${r.user_id.slice(0, 8)}...)`,
        targetGroup:
          prof?.target_group === "student"
            ? "Học sinh"
            : prof?.target_group === "elder"
            ? "Người cao tuổi"
            : "Phổ thông",
        score: r.score,
        totalQuestions: r.total_questions || 10,
        percent: Math.round((r.score / (r.total_questions || 10)) * 100),
        competencyLevel: r.competency_level || "Chưa phân hạng",
        needsImprovement: Array.isArray(r.needs_improvement) ? r.needs_improvement : [],
        testType: r.test_type === "retest" ? "Re-test" : "Pre-test",
        completedAt: r.created_at,
      });
    });

    // 2. Thêm hoặc bổ sung từ profilesList nếu chưa có trong list
    profilesList.forEach((prof) => {
      const alreadyInList = list.some((item) => item.userId === prof.id);
      if (alreadyInList) return;

      let score: number | undefined = prof.pretest_score;
      let level: string | undefined = prof.pretest_level;
      let needs: string[] = prof.needs_improvement || [];
      let completedAt: string = prof.created_at || new Date().toISOString();

      if (score === undefined && Array.isArray(prof.badges)) {
        const preBadge = prof.badges.find(
          (b: any) => b && typeof b === "object" && b.id === "badge_pretest"
        );
        if (preBadge) {
          score = preBadge.score;
          level = preBadge.level;
          needs = preBadge.needs_improvement || [];
          if (preBadge.completed_at) completedAt = preBadge.completed_at;
        }
      }

      if (score !== undefined) {
        list.push({
          id: `profile-pretest-${prof.id}`,
          userId: prof.id,
          displayName: prof.display_name,
          targetGroup:
            prof.target_group === "student"
              ? "Học sinh"
              : prof.target_group === "elder"
              ? "Người cao tuổi"
              : "Phổ thông",
          score,
          totalQuestions: 10,
          percent: Math.round((score / 10) * 100),
          competencyLevel: level || "Chưa phân hạng",
          needsImprovement: needs,
          testType: "Pre-test",
          completedAt,
        });
      }
    });

    return list.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }, [pretestResultsList, profilesList]);

  // Xuất file CSV kết quả Pre-test
  const exportPreTestCSV = () => {
    const headers = [
      "STT",
      "Mã Học Viên",
      "Tên Học Viên",
      "Nhóm Đối Tượng",
      "Loại Bài Thi",
      "Điểm Số (Số Câu Đúng)",
      "Tổng Số Câu",
      "Tỷ Lệ Chính Xác (%)",
      "Bậc Năng Lực Được Đánh Giá",
      "Các Chủ Đề Cần Cải Thiện",
      "Thời Gian Hoàn Thành",
    ];

    const rows = pretestReports.map((item, idx) => [
      idx + 1,
      item.userId,
      `"${item.displayName}"`,
      `"${item.targetGroup}"`,
      `"${item.testType}"`,
      item.score,
      item.totalQuestions,
      `${item.percent}%`,
      `"${item.competencyLevel}"`,
      `"${item.needsImprovement.join("; ")}"`,
      formatDate(item.completedAt),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao_cao_KHKT_Danh_gia_Nang_luc_Pretest_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export CSV tổng hợp theo Học Viên (Mỗi học viên = 1 dòng, dùng cho SPSS / Excel báo cáo KHKT)
  const exportStudentReportsCSV = () => {
    const headers = [
      "STT",
      "Mã Học Viên (UUID)",
      "Tên Học Viên",
      "Nhóm Đối Tượng",
      "Số Ải Hoàn Thành",
      "Điểm Số Trung Bình",
      "Tỷ Lệ Xử Lý An Toàn (%)",
      "Số Lần Thử TB / Ải",
      "Năng Lực Nhận Diện (%)",
      "Năng Lực Kiểm Chứng (%)",
      "Năng Lực Bảo Vệ TK (%)",
      "Năng Lực Ứng Phó (%)",
      "Xếp Loại Khoa Học",
      "Lần Hoạt Động Gần Nhất",
    ];

    const rows = studentReports.map((s, idx) => [
      idx + 1,
      s.userId,
      `"${s.displayName}"`,
      `"${s.targetGroup}"`,
      `${s.completedCount}/39`,
      s.avgScore,
      `${s.safeRate}%`,
      s.avgAttempts,
      `${s.detScore}%`,
      `${s.verScore}%`,
      `${s.accScore}%`,
      `${s.resScore}%`,
      `"${s.classification}"`,
      formatDate(s.lastCompleted),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao_cao_KHKT_Tong_hop_Hoc_vien_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV export raw progress
  const exportProgressCSV = () => {
    const headers = ["STT", "Thời gian", "Mã ải", "Điểm số", "Kết quả an toàn", "Số lần thử", "User ID"];
    const rows = progressList.map((p, idx) => [
      idx + 1,
      formatDate(p.completed_at),
      p.scenario_id || "N/A",
      p.score || 0,
      p.passed_safely ? "Đạt an toàn" : "Rơi vào bẫy",
      p.attempts || 1,
      p.user_id || "Ẩn danh",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao_cao_KHKT_Nhat_ky_tung_ai_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = studentReports.filter(
    (s) =>
      s.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProgress = progressList.filter((p) =>
    (p.scenario_id || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChatbot = chatbotList.filter(
    (c) =>
      (c.input_text || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.risk_level || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProfiles = profilesList.filter(
    (pr) =>
      (pr.display_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.target_group || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPretest = pretestReports.filter(
    (pt) =>
      pt.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.competencyLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.targetGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 1. Loading State
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-600 font-medium bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-xs">
          <RefreshCw className="w-5 h-5 animate-spin text-sky-600" />
          <span>Đang kiểm tra quyền truy cập Quản Trị Viên...</span>
        </div>
      </div>
    );
  }

  // 2. Chưa đăng nhập -> Yêu cầu đăng nhập Admin
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 uppercase">
              Admin Gateway
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Khu Vực Quản Trị Viên
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Trang này chứa dữ liệu thu thập thực nghiệm KHKT và quản trị cơ sở dữ liệu. Bạn cần đăng nhập bằng tài khoản Quản Trị Viên để tiếp tục.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal("signin")}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng Nhập Tài Khoản Admin</span>
            </button>

            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors inline-block"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
              <span>Quay Lại Trang Chủ</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Đã đăng nhập nhưng không phải Admin -> Báo 403 Forbidden
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-200 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 uppercase">
              403 • Truy Cập Bị Từ Chối
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Không Có Quyền Quản Trị
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Tài khoản hiện tại <strong className="text-slate-900">({user.email})</strong> là tài khoản Học Viên / Người Dùng thông thường, không có đặc quyền Quản Trị Viên (Admin).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-600">
            <div className="font-semibold text-slate-800">Hướng dẫn cấp quyền Admin:</div>
            <div>• Đăng nhập bằng tài khoản có email chứa tiền tố <code className="text-sky-600 font-bold">admin@...</code> hoặc</div>
            <div>• Trong Supabase SQL: <code className="text-slate-800 bg-slate-200 px-1 rounded">UPDATE user_profiles SET role = &apos;admin&apos; WHERE id = &apos;{user.id.slice(0, 8)}...&apos;;</code></div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                signOut().then(() => openAuthModal("signin"));
              }}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng Xuất & Đổi Tài Khoản Admin</span>
            </button>

            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors inline-block"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
              <span>Quay Lại Trang Chủ</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Đã xác thực quyền Admin -> Render Full Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Quay lại trang chủ"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                ADMIN • RESEARCH HUB
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Supabase Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trung Tâm Quản Trị & Thu Thập Dữ Liệu Nghiên Cứu KHKT
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Dữ liệu thời gian thực được đồng bộ trực tiếp từ Supabase Database cho đề tài nghiên cứu giáo dục an toàn số.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Làm mới DB</span>
            </button>

            <button
              onClick={exportStudentReportsCSV}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
              title="Xuất bảng số liệu tổng hợp mỗi học viên 1 dòng dùng cho SPSS, Excel và Báo cáo KHKT"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo Học Viên (KHKT)</span>
            </button>

            <button
              onClick={exportPreTestCSV}
              className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              title="Xuất bảng điểm đánh giá năng lực đầu vào và phân loại rủi ro của từng học viên"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo Pre-Test</span>
            </button>

            <button
              onClick={exportProgressCSV}
              className="px-3 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              title="Xuất nhật ký từng ải riêng lẻ"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Nhật Ký Ải</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards từ Database Thật */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Mẫu Học Viên Nghiên Cứu</span>
              <GraduationCap className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{studentReports.length} Học Viên</div>
            <p className="text-[11px] text-slate-400">{totalSubmissions} lượt làm bài tổng cộng</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Tỷ Lệ Vượt Ải An Toàn</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{safeRate}%</div>
            <p className="text-[11px] text-slate-400">{safeCount} lượt xử lý an toàn</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Điểm Số Trung Bình</span>
              <BarChart3 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{avgScore} / 100</div>
            <p className="text-[11px] text-slate-400">Đánh giá trên thang điểm 100</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Tin Nhắn Đã Tra Cứu</span>
              <MessageSquare className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{chatbotList.length}</div>
            <p className="text-[11px] text-slate-400">Bảng chatbot_consultations</p>
          </div>
        </div>

        {/* Tab Controls & Search */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Tab switch */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab("students")}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "students"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Báo Cáo Theo Học Viên ({studentReports.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("pretest")}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pretest"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Đánh Giá Năng Lực Pre-Test ({pretestReports.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === "progress"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nhật Ký Từng Ải ({progressList.length})
              </button>
              <button
                onClick={() => setActiveTab("chatbot")}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === "chatbot"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tin Nhắn Nghi Vấn ({chatbotList.length})
              </button>
              <button
                onClick={() => setActiveTab("profiles")}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === "profiles"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tài Khoản Đăng Ký ({profilesList.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm dữ liệu..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* TAB 1: BÁO CÁO TỔNG HỢP THEO HỌC VIÊN (1 Học Viên = 1 Dòng Chuẩn Nghiên Cứu KHKT) */}
          {activeTab === "students" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-3">Học viên & Nhóm đối tượng</th>
                    <th className="py-3 px-3 text-center">Đầu Vào (Pre-Test)</th>
                    <th className="py-3 px-3 text-center">Tiến độ 39 Ải</th>
                    <th className="py-3 px-3 text-center">Điểm TB</th>
                    <th className="py-3 px-3 text-center">Tỷ lệ An Toàn</th>
                    <th className="py-3 px-3">4 Trụ Cột Năng Lực</th>
                    <th className="py-3 px-3">Xếp loại</th>
                    <th className="py-3 px-3 text-right">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400 space-y-2">
                        <GraduationCap className="w-8 h-8 mx-auto text-slate-300" />
                        <div className="text-sm font-semibold text-slate-600">
                          Chưa có dữ liệu học viên thực nghiệm
                        </div>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          Khi học viên hoàn thành các ải, hệ thống tự động gom nhóm toàn bộ 39 ải thành một hồ sơ tổng hợp hoàn chỉnh cho báo cáo khoa học.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-900 text-sm">{st.displayName}</div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span className="font-mono text-slate-400">
                                {st.userId === "guest" ? "Khách ẩn danh" : `${st.userId.slice(0, 8)}...`}
                              </span>
                              <span>•</span>
                              <span className="font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                                {st.targetGroup}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          {st.pretestScore !== undefined ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-xs">
                                {st.pretestScore}/10 ({st.pretestScore * 10}%)
                              </span>
                              {st.pretestLevel && (
                                <span className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]" title={st.pretestLevel}>
                                  {st.pretestLevel.split(":")[0]}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Chưa làm</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <div className="inline-flex flex-col items-center gap-1">
                            <span className="font-mono font-bold text-xs text-slate-800">
                              {st.completedCount}/39 Ải
                            </span>
                            <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-indigo-600 h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, (st.completedCount / 39) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <span className="font-black text-slate-900 text-sm">{st.avgScore}</span>
                          <span className="text-[10px] text-slate-400">/100</span>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                              st.safeRate >= 80
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : st.safeRate >= 50
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {st.safeRate}%
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                            <span className="text-slate-500">
                              Nhận diện: <strong className="text-sky-700 font-bold">{st.detScore}%</strong>
                            </span>
                            <span className="text-slate-500">
                              Kiểm chứng: <strong className="text-emerald-700 font-bold">{st.verScore}%</strong>
                            </span>
                            <span className="text-slate-500">
                              Bảo vệ TK: <strong className="text-amber-700 font-bold">{st.accScore}%</strong>
                            </span>
                            <span className="text-slate-500">
                              Ứng phó: <strong className="text-indigo-700 font-bold">{st.resScore}%</strong>
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-bold inline-block">
                            {st.classification}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setSelectedStudent(st)}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1 border border-indigo-200"
                          >
                            <span>Xem {st.completedCount} Ải</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table 2: User Progress (Database thật) */}
          {activeTab === "progress" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-3">Thời gian</th>
                    <th className="py-3 px-3">Mã ải</th>
                    <th className="py-3 px-3">Kết quả</th>
                    <th className="py-3 px-3">Điểm</th>
                    <th className="py-3 px-3">Số lần thử</th>
                    <th className="py-3 px-3">Mã học viên (UUID)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProgress.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 space-y-2">
                        <Database className="w-8 h-8 mx-auto text-slate-300" />
                        <div className="text-sm font-semibold text-slate-600">
                          Chưa có lượt làm bài nào trong bảng user_progress
                        </div>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          Khi học viên đăng nhập tài khoản và hoàn thành các ải thử thách, kết quả sẽ tự động được ghi nhận và hiển thị ngay tại đây.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredProgress.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                          {formatDate(row.completed_at)}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          {row.scenario_id || "N/A"}
                        </td>
                        <td className="py-3 px-3">
                          {row.passed_safely ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Đạt An Toàn
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold border border-rose-200 text-[11px]">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              Bị Lừa / Rủi Ro
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">{row.score ?? 0}</td>
                        <td className="py-3 px-3 text-slate-600">{row.attempts || 1}</td>
                        <td className="py-3 px-3 font-mono text-slate-400">
                          {row.user_id ? `${String(row.user_id).slice(0, 8)}...` : "Khách ẩn danh"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table 2: Chatbot Queries (Database thật) */}
          {activeTab === "chatbot" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-3">Thời gian</th>
                    <th className="py-3 px-3">Nội dung tin nhắn người dùng nhập</th>
                    <th className="py-3 px-3">Mức độ rủi ro</th>
                    <th className="py-3 px-3">Điểm</th>
                    <th className="py-3 px-3">Tóm tắt phân tích</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredChatbot.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 space-y-2">
                        <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                        <div className="text-sm font-semibold text-slate-600">
                          Chưa có tin nhắn nào trong bảng chatbot_consultations
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredChatbot.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-medium max-w-sm truncate">
                          &ldquo;{row.input_text}&rdquo;
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              row.risk_level === "emergency" || row.risk_level === "high"
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : row.risk_level === "check_required"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {(row.risk_level || "low").toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">{row.risk_score || 0}/100</td>
                        <td className="py-3 px-3 text-slate-600 max-w-md line-clamp-2">
                          {row.analysis_summary}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table 3: User Profiles (Database thật) */}
          {activeTab === "profiles" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-3">Mã User</th>
                    <th className="py-3 px-3">Tên hiển thị</th>
                    <th className="py-3 px-3">Nhóm đối tượng</th>
                    <th className="py-3 px-3">Điểm tích lũy XP</th>
                    <th className="py-3 px-3">Chuỗi ngày</th>
                    <th className="py-3 px-3">Vai trò</th>
                    <th className="py-3 px-3">Ngày đăng ký</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProfiles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                        <UserCheck className="w-8 h-8 mx-auto text-slate-300" />
                        <div className="text-sm font-semibold text-slate-600">
                          Chưa có tài khoản nào trong bảng user_profiles
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProfiles.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono text-slate-400">
                          {row.id ? `${row.id.slice(0, 8)}...` : "N/A"}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {row.display_name}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            {row.target_group === "student"
                              ? "Học sinh"
                              : row.target_group === "elder"
                              ? "Người cao tuổi"
                              : "Phổ thông"}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-sky-600">
                          {row.total_score || 0} XP
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {row.streak_days || 1} ngày
                        </td>
                        <td className="py-3 px-3">
                          {row.role === "admin" ? (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-[10px]">
                              ADMIN
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                              Học Viên
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                          {formatDate(row.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: BÁO CÁO & QUẢN LÝ ĐÁNH GIÁ NĂNG LỰC ĐẦU VÀO (PRE-TEST & RE-TEST) */}
          {activeTab === "pretest" && (
            <div className="space-y-6">
              {/* Thống kê nhanh Pre-Test */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                  <span className="text-xs font-bold text-indigo-900 uppercase">Tổng Lượt Đánh Giá</span>
                  <div className="text-2xl font-black text-indigo-900">{pretestReports.length} Lượt</div>
                  <p className="text-[11px] text-slate-500">Khảo sát năng lực đầu vào & re-test</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <span className="text-xs font-bold text-emerald-900 uppercase">Điểm Trung Bình Khảo Sát</span>
                  <div className="text-2xl font-black text-emerald-900">
                    {pretestReports.length > 0
                      ? (pretestReports.reduce((a, b) => a + b.score, 0) / pretestReports.length).toFixed(1)
                      : "0.0"} / 10
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Tương đương {pretestReports.length > 0
                      ? Math.round((pretestReports.reduce((a, b) => a + b.percent, 0) / pretestReports.length))
                      : 0}% tỷ lệ xử lý an toàn
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="text-xs font-bold text-amber-900 uppercase">Nhóm Cần Hỗ Trợ (Bậc 1-3)</span>
                  <div className="text-2xl font-black text-amber-900">
                    {pretestReports.filter((p) => p.score < 7).length} Học Viên
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {pretestReports.length > 0
                      ? Math.round((pretestReports.filter((p) => p.score < 7).length / pretestReports.length) * 100)
                      : 0}% học viên có nguy cơ rủi ro số
                  </p>
                </div>
              </div>

              {/* Bảng danh sách Pre-Test */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider">
                      <th className="py-3 px-3">Học Viên</th>
                      <th className="py-3 px-3">Nhóm Đối Tượng</th>
                      <th className="py-3 px-3 text-center">Loại Bài Khảo Sát</th>
                      <th className="py-3 px-3 text-center">Điểm Đạt Được</th>
                      <th className="py-3 px-3">Bậc Năng Lực Chuẩn Đoán</th>
                      <th className="py-3 px-3">Chủ Đề Cần Cải Thiện</th>
                      <th className="py-3 px-3 text-right">Ngày Hoàn Thành</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredPretest.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                          <ShieldCheck className="w-8 h-8 mx-auto text-slate-300" />
                          <div className="text-sm font-semibold text-slate-600">
                            Chưa có dữ liệu bài khảo sát năng lực đầu vào
                          </div>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Khi học viên vào trang Luyện Tập và làm 10 câu trắc nghiệm thực tế, kết quả đánh giá năng lực và các chủ đề yếu sẽ được tự động lưu trữ và hiển thị tại đây.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredPretest.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{row.displayName}</div>
                            <div className="font-mono text-[10px] text-slate-400">
                              {row.userId.slice(0, 8)}...
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              {row.targetGroup}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              row.testType === "Re-test"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}>
                              {row.testType}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="font-black text-slate-900 text-sm">
                              {row.score} / {row.totalQuestions}
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({row.percent}%)
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-block ${
                              row.score >= 9
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : row.score >= 7
                                ? "bg-blue-50 text-blue-800 border border-blue-200"
                                : row.score >= 4
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-rose-50 text-rose-800 border border-rose-200"
                            }`}>
                              {row.competencyLevel}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {row.needsImprovement.length === 0 ? (
                              <span className="text-emerald-600 font-semibold text-[11px]">
                                Không có chủ đề yếu
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {row.needsImprovement.map((topic, ti) => (
                                  <span
                                    key={ti}
                                    className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right text-slate-500 whitespace-nowrap">
                            {formatDate(row.completedAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modal Xem Chi Tiết Toàn Bộ Ải Của 1 Học Viên Được Chọn */}
          {selectedStudent && (
            <div
              onClick={() => setSelectedStudent(null)}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-xs">
                        {selectedStudent.targetGroup}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {selectedStudent.userId === "guest" ? "Khách ẩn danh" : selectedStudent.userId}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      Chi Tiết Kết Quả: {selectedStudent.displayName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs">
                    <div>
                      <span className="text-slate-500 font-medium">Đã Hoàn Thành</span>
                      <div className="font-black text-slate-900 text-base">{selectedStudent.completedCount}/39 Ải</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Điểm Số TB</span>
                      <div className="font-black text-slate-900 text-base">{selectedStudent.avgScore} / 100</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Tỷ Lệ An Toàn</span>
                      <div className="font-black text-emerald-600 text-base">{selectedStudent.safeRate}%</div>
                    </div>
                  </div>

                  {/* Khối đánh giá năng lực đầu vào Pre-Test */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-900 uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Đánh Giá Năng Lực Đầu Vào (Pre-Test)</span>
                      </span>
                      {selectedStudent.pretestScore !== undefined ? (
                        <span className="font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                          {selectedStudent.pretestScore} / 10 Điểm ({selectedStudent.pretestScore * 10}%)
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Chưa thực hiện</span>
                      )}
                    </div>
                    {selectedStudent.pretestLevel && (
                      <div className="font-bold text-slate-800">
                        {selectedStudent.pretestLevel}
                      </div>
                    )}
                    {selectedStudent.needsImprovement && selectedStudent.needsImprovement.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[11px] text-slate-500 font-semibold">Chủ đề yếu cần củng cố:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedStudent.needsImprovement.map((topic, ti) => (
                            <span key={ti} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      Danh Sách Từng Ải Đã Làm ({selectedStudent.records.length} Bản Ghi)
                    </h4>
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                      {selectedStudent.records.map((r, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white hover:bg-slate-50/50">
                          <div className="space-y-0.5">
                            <div className="font-mono font-bold text-slate-900">Mã ải: {r.scenario_id}</div>
                            <div className="text-[11px] text-slate-400">{formatDate(r.completed_at)}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500">Thử: <strong>{r.attempts || 1} lần</strong></span>
                            <span className="font-bold text-slate-900">{r.score || 0}đ</span>
                            {r.passed_safely ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                                Đạt An Toàn
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px]">
                                Bị Lừa
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
