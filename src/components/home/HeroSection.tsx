"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Search,
  PhoneCall,
  Info,
  Octagon,
  PhoneForwarded,
  Sparkles,
  Flame,
  Star,
  Sword,
  Target,
  Trophy,
  Zap,
  CheckCircle2,
  Crosshair,
  ShieldAlert,
  Gift,
  CreditCard,
  Timer,
  AlertCircle,
  Play,
} from "lucide-react";
import { playClickBeep, playSuccessChime, playWarningBlip } from "@/utils/gameAudio";

/**
 * 1. Chế độ Người Cao Tuổi & Gia Đình (ElderlyHero)
 * Đầy đủ 100% cấu trúc, chức năng mô phỏng tương tác và quy trình 4 bước chuẩn quốc gia.
 * Thiết kế trang trọng, độ tương phản cao, dễ đọc, không dùng font chữ hay hình vẽ trẻ con.
 */
function ElderlyHero({ onStart }: { onStart: () => void }) {
  const router = useRouter();
  const [activeHotspot, setActiveHotspot] = useState<number>(1);

  const hotspots = [
    {
      id: 1,
      title: "Mạo danh số gọi",
      badge: "Điểm 1",
      detail:
        "Số điện thoại lạ mạo danh Viện kiểm sát / Công an. Cơ quan điều tra tại Việt Nam không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại.",
    },
    {
      id: 2,
      title: "Áp lực thời gian",
      badge: "Điểm 2",
      detail:
        "Ép buộc xử lý gấp trong 30 phút — đây là chiêu trò thao túng tâm lý sợ hãi để nạn nhân hoảng loạn, không kịp hỏi ý kiến con cháu.",
    },
    {
      id: 3,
      title: "Đòi chuyển tiền & OTP",
      badge: "Điểm 3",
      detail:
        "Yêu cầu chuyển 50 triệu vào 'Tài khoản tạm giữ'. Pháp luật Việt Nam KHÔNG CÓ tài khoản tạm giữ qua chuyển khoản cá nhân.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Main Grid: Value Proposition + Realistic Simulation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & 2 Action Buttons */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-semibold text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Cổng Thông Tin & Thực Hành Phòng Chống Lừa Đảo Trực Tuyến</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                Xây dựng phản xạ số,{" "}
                <span className="text-blue-800">
                  nâng cao nhận thức & năng lực phòng ngừa
                </span>{" "}
                trên không gian mạng.
              </h1>
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Nền tảng thực hành tình huống tương tác thực tế, hỗ trợ người cao tuổi và các gia đình chủ động nhận diện bẫy thao túng tâm lý, bảo vệ an toàn tài sản số.
              </p>
            </div>

            {/* 2 Big CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold text-base shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Vào Phòng Luyện Tập</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => router.push("/chatbot")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-base shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Search className="w-4 h-4 text-slate-600" />
                <span>Kiểm Tra Tin Nhắn Nghi Ngờ</span>
              </button>
            </div>

            {/* Trust Assurance */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-600 pt-2 font-normal">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Miễn phí & Không yêu cầu thông tin ngân hàng
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Lock className="w-4 h-4 text-blue-600" />
                Tuyệt đối bảo mật dữ liệu công dân
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Phone Mockup with Hotspot Analysis */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl bg-white border border-slate-300 shadow-md overflow-hidden">
              {/* Phone Status Bar */}
              <div className="bg-slate-100 text-slate-700 px-4 py-2 flex items-center justify-between text-xs font-mono border-b border-slate-200 font-semibold">
                <span>09:41</span>
                <span>Cuộc gọi đến</span>
              </div>

              {/* Call Content */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <PhoneCall className="w-4 h-4 text-rose-600" />
                    <span>089.882.19xx (Mạo danh Công an)</span>
                  </div>
                  <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                    Rủi ro cao
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  “Chào anh/chị, tôi là cán bộ Cơ quan Điều tra. Số CCCD của anh/chị đang dính líu vào đường dây rửa tiền 12 tỷ. Yêu cầu chuyển ngay 50 triệu vào tài khoản tạm giữ trong 30 phút để thanh tra chứng minh vô tội, nếu không sẽ bị bắt tạm giam!”
                </div>

                {/* Hotspot Selector Tabs */}
                <div className="w-full flex items-center justify-around gap-1.5 pt-1 border-t border-slate-100 text-xs font-semibold">
                  {hotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h.id)}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                        activeHotspot === h.id
                          ? "bg-blue-800 text-white font-bold"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                        {h.id}
                      </span>
                      <span>{h.title}</span>
                    </button>
                  ))}
                </div>

                {/* Dynamic Explanation Card Based on Active Hotspot */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold uppercase text-[11px]">
                    <Info className="w-3.5 h-3.5 text-blue-700" />
                    <span>Phân tích bẫy lừa đảo (#{activeHotspot}):</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 font-normal">
                    {hotspots.find((h) => h.id === activeHotspot)?.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Core Response Framework - Sơ Đồ Khối Chuẩn Quốc Gia */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs uppercase font-bold text-blue-800 tracking-wider px-3 py-0.5 bg-blue-50 rounded-full border border-blue-200">
              QUY TRÌNH ỨNG PHÓ CHUẨN QUỐC GIA
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              4 Bước Phản Xạ An Toàn Số Cho Mọi Tình Huống
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Ghi nhớ quy tắc 4 bước theo trình tự trước khi thực hiện bất kỳ thao tác hay giao dịch nào
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-700 text-white">
                    Bước 01
                  </span>
                  <Octagon className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">DỪNG LẠI</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Không hoảng sợ, không bấm link, không chuyển tiền, không đọc mã OTP khi đang bị hối thúc.
                </p>
              </div>
              <div className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 p-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                <Octagon className="w-3.5 h-3.5 text-rose-600" />
                <span>Bình tĩnh 30 giây</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                    Bước 02
                  </span>
                  <Search className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">KIỂM TRA</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Soi kỹ tên miền (.gov.vn, .com.vn), tệp đính kèm (.apk) và số điện thoại người gọi.
                </p>
              </div>
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>Soi kỹ chi tiết lạ</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    Bước 03
                  </span>
                  <PhoneForwarded className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">XÁC MINH</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Cúp máy ngay. Gọi điện thoại trực tiếp cho con cháu hoặc gọi hotline chính thức của cơ quan.
                </p>
              </div>
              <div className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 p-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                <PhoneForwarded className="w-3.5 h-3.5 text-blue-600" />
                <span>Kênh độc lập</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-700 text-white">
                    Bước 04
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">HÀNH ĐỘNG</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Chỉ thực hiện thao tác khi đã xác thực 100% người liên hệ là đúng sự thật.
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>An toàn tài sản số</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. Chế độ Trẻ Em (ChildHero) — Trẻ trung, năng động, gamified phong cách Duolingo & Roblox
 */
function ChildHero({ onStart }: { onStart: () => void }) {
  const { profile, addXp } = useAuth();
  const [activeTrapIdx, setActiveTrapIdx] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState<boolean>(true);
  const [scannedTrapIds, setScannedTrapIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cybersafe_scanned_traps");
        return saved ? JSON.parse(saved) : ["trap-robux"];
      } catch {
        return ["trap-robux"];
      }
    }
    return ["trap-robux"];
  });

  const demoTraps = [
    {
      id: "trap-robux",
      label: "Bẫy nhận quà & Nạp vật phẩm 0 đồng",
      icon: Gift,
      iconColor: "text-purple-600",
      sender: "Tin nhắn tự động lạ",
      message: "Chúc mừng! Bạn đã nhận được gói quà tặng 10.000 vật phẩm game miễn phí. Bấm vào liên kết nhanqua-game.vip và nhập tài khoản + mật khẩu để nhận ngay!",
      redFlag: "Liên kết giả mạo (.vip), đòi hỏi nhập MẬT KHẨU tài khoản cá nhân!",
      solution: "Bẫy lừa đảo chiếm đoạt tài khoản (Phishing)! Tuyệt đối KHÔNG nhập mật khẩu vào trang web lạ.",
      xpReward: 50,
      badgeColor: "bg-rose-500",
    },
    {
      id: "trap-ban",
      label: "Tin nhắn đe dọa khóa tài khoản khẩn cấp",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      sender: "Kẻ mạo danh Quản trị viên",
      message: "Cảnh báo khẩn: Tài khoản của bạn bị tố cáo vi phạm. Hãy truy cập hotro-xacminh.top trong 15 phút để xác nhận, nếu không tài khoản sẽ bị xóa vĩnh viễn!",
      redFlag: "Tạo áp lực tâm lý hoang mang, hối thúc thời gian gấp để nạn nhân mất bình tĩnh!",
      solution: "Ban quản trị chính thống KHÔNG BAO GIỜ yêu cầu gửi mật khẩu hay xác minh qua tin nhắn riêng.",
      xpReward: 50,
      badgeColor: "bg-amber-500",
    },
    {
      id: "trap-money",
      label: "Tin nhắn mượn tiền từ tài khoản bạn bè bị hack",
      icon: CreditCard,
      iconColor: "text-emerald-600",
      sender: "Tài khoản mạng xã hội của bạn bè (bị chiếm quyền)",
      message: "Cậu ơi, tài khoản của tớ đang bị kẹt tiền, cậu chuyển khoản giúp tớ 100k vào số này nhé, lát tớ gửi lại ngay!",
      redFlag: "Tài khoản bạn bè bị kẻ gian chiếm quyền điều khiển để nhắn tin vay mượn tiền hàng loạt!",
      solution: "Luôn gọi điện thoại trực tiếp hoặc gặp mặt trực tiếp để xác minh trước khi gửi tiền hay chuyển khoản.",
      xpReward: 50,
      badgeColor: "bg-purple-500",
    },
  ];

  const currentTrap = demoTraps[activeTrapIdx];

  // Chỉ cộng XP lần đầu tiên học sinh khám phá tình huống đó
  const handleSelectTrap = (idx: number) => {
    playClickBeep();
    setActiveTrapIdx(idx);
    setHasScanned(true);

    const trap = demoTraps[idx];
    if (!scannedTrapIds.includes(trap.id)) {
      const updated = [...scannedTrapIds, trap.id];
      setScannedTrapIds(updated);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cybersafe_scanned_traps", JSON.stringify(updated));
        } catch {}
      }
      addXp(trap.xpReward);
      playSuccessChime();
    }
  };

  const totalTraps = demoTraps.length;
  const scannedCount = scannedTrapIds.length;
  const isAllScanned = scannedCount >= totalTraps;

  // Tính toán chỉ số chuẩn luồng từ profile người dùng
  const totalXp = profile?.total_score || 0;
  const streakDays = profile?.streak_days || 1;
  const levelNumber = Math.max(1, Math.floor(totalXp / 100) + 1);
  const levelTitle =
    levelNumber === 1
      ? "Hiệp Sĩ Tập Sự"
      : levelNumber === 2
      ? "Vệ Binh Số"
      : levelNumber === 3
      ? "Hiệp Sĩ Tinh Nhuệ"
      : "Đại Hiệp Sĩ An Toàn";
  const xpInCurrentLevel = totalXp % 100;
  const progressPercent = Math.min(100, Math.max(0, xpInCurrentLevel));

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 border-b border-slate-200 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Gamified Call to Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Mission Tag Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-300 text-sky-900 font-bold text-xs sm:text-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Nền tảng rèn luyện an toàn số • Dành cho học sinh</span>
          </div>

          {/* Game Title: Punchy & Bold */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase text-slate-900">
              Rèn Luyện Bản Lĩnh Số, <span className="text-sky-600">Bảo Vệ Tài Khoản</span> & Vượt 39 Thử Thách!
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              Học cách nhận diện liên kết độc hại, chiêu trò đánh cắp mật khẩu và tin nhắn lừa đảo mượn tiền qua các tình huống tương tác thực tế.
            </p>
          </div>

          {/* Gamification Stats Strip - Động theo Profile học viên */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-xs max-w-lg mx-auto lg:mx-0 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-black shadow-xs">
                  LV{levelNumber}
                </span>
                <span className="text-slate-800">{levelTitle}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl">
                  <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>{streakDays} Ngày Streak</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{totalXp} XP</span>
                </span>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1">
              <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-700 ${
                    progressPercent === 0 ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-500 px-0.5">
                <span>Cấp độ hiện tại: {xpInCurrentLevel}/100 XP</span>
                <span>Mục tiêu tiếp theo: LV{levelNumber + 1}</span>
              </div>
            </div>
          </div>

          {/* Chunky 3D Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base sm:text-lg shadow-lg border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1.5 transition-all cursor-pointer flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>BẮT ĐẦU VƯỢT ẢI (+100 XP)</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <a
              href="#mini-challenge"
              onClick={() => playClickBeep()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border-2 border-slate-300 border-b-4 border-slate-400 active:border-b-2 active:translate-y-0.5 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Timer className="w-4 h-4 text-amber-600" />
              <span>Thử Thách Phản Xạ 30s</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Live Trap Scanner Widget */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 sm:p-6 border-2 border-sky-300 shadow-xl space-y-4 relative">
            {/* Scanner Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-sky-700" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">
                    Mô Phỏng Nhận Diện Tình Huống
                  </h3>
                  <span className="text-[11px] text-sky-700 font-bold">
                    Khám phá 3 bẫy lừa đảo mạng phổ biến:
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 border ${
                isAllScanned
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-amber-100 text-amber-800 border-amber-300"
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAllScanned ? "Đã soi 3/3 bẫy" : `Đã soi ${scannedCount}/${totalTraps}`}</span>
              </span>
            </div>

            {/* 3 Clickable Trap Buttons */}
            <div className="grid grid-cols-1 gap-2">
              {demoTraps.map((trap, idx) => {
                const TrapIcon = trap.icon;
                const isSelected = activeTrapIdx === idx;
                const isScanned = scannedTrapIds.includes(trap.id);
                return (
                  <button
                    key={trap.id}
                    onClick={() => handleSelectTrap(idx)}
                    className={`p-2.5 rounded-xl text-left font-bold text-xs sm:text-sm transition-all border-2 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-sky-50 border-sky-500 text-sky-950 shadow-xs scale-101"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <TrapIcon className={`w-4 h-4 ${trap.iconColor} shrink-0`} />
                      <span>{trap.label}</span>
                    </span>
                    {isSelected ? (
                      <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                        Đang soi
                      </span>
                    ) : isScanned ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Đã xong ✓
                      </span>
                    ) : (
                      <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        +{trap.xpReward} XP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Simulated Chat Bubble on Device */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-slate-200 pb-1.5">
                <span>Người gửi: {currentTrap.sender}</span>
                <span className="text-rose-600 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Nghi vấn
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                &ldquo;{currentTrap.message}&rdquo;
              </p>
            </div>

            {/* Instant Scanner Result Card */}
            {hasScanned && (
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-slate-900 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Dấu hiệu bẫy phát hiện:</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-rose-950 leading-relaxed">
                  {currentTrap.redFlag}
                </p>
                <div className="pt-1 border-t border-rose-200/80 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{currentTrap.solution}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main HeroSection
 */
export function HeroSection() {
  const { user, openAuthModal } = useAuth();
  const { userRole } = useDemographic();
  const router = useRouter();

  const handleStartTraining = () => {
    if (!user) {
      openAuthModal("signin");
    } else {
      router.push("/play");
    }
  };

  if (userRole === "elderly") {
    return <ElderlyHero onStart={handleStartTraining} />;
  }

  return <ChildHero onStart={handleStartTraining} />;
}
