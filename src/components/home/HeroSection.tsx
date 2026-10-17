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
} from "lucide-react";

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
    <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
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
                  &quot;Chào anh/chị, tôi là cán bộ Cơ quan Điều tra. Số CCCD của anh/chị đang dính líu vào đường dây rửa tiền 12 tỷ. Yêu cầu chuyển ngay 50 triệu vào tài khoản tạm giữ trong 30 phút để thanh tra chứng minh vô tội, nếu không sẽ bị bắt tạm giam!&quot;
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
              <div className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 p-2 rounded-lg text-center">
                🛑 Bình tĩnh 30 giây
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
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg text-center">
                🔍 Soi kỹ chi tiết lạ
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
              <div className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 p-2 rounded-lg text-center">
                📞 Kênh độc lập
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
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-center">
                🛡️ An toàn tài sản số
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. Chế độ Trẻ Em (ChildHero)
 */
function ChildHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Soft ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Mascot Speech Bubble & 3D Gamified Call to Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Mission Tag Header */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-md">
            <span>🛡️</span>
            <span>Nhiệm vụ hôm nay: Săn lùng kẻ mạo danh!</span>
          </div>

          {/* Game Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
              Hóa Thân <span className="text-amber-400">Hiệp Sĩ Số</span>, Phá 39 Bẫy Kẻ Gian!
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              Cùng CyberGuard thâm nhập các phòng chat lừa đảo, phát hiện chiêu trò hack acc game và giải cứu thế giới số!
            </p>
          </div>

          {/* Gamification Status Bar (XP & Streak Badges) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg max-w-lg mx-auto lg:mx-0 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  LV1
                </span>
                <span className="text-amber-300">Thám Tử Tập Sự</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-orange-400 font-black">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  3 Ngày
                </span>
                <span className="flex items-center gap-1 text-yellow-300 font-black">
                  <Star className="w-4 h-4 fill-yellow-300" />
                  250 / 500 XP
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 transition-all duration-1000 shadow-sm"
                style={{ width: "50%" }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onStart}
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg sm:text-xl shadow-xl transition-all border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 cursor-pointer flex items-center justify-center gap-3"
            >
              <Sword className="w-6 h-6 text-yellow-300 group-hover:rotate-12 transition-transform" />
              <span>BẮT ĐẦU NHIỆM VỤ!</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: Sleek 3D Game Stage Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-800/90 p-5 sm:p-6 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-black uppercase text-amber-300 border border-slate-700">
                Ải 1: Cuộc Gọi Bí Mật
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <Trophy className="w-3.5 h-3.5" />
                +100 XP
              </span>
            </div>

            <div className="relative w-full h-40 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center p-3 overflow-hidden">
              <img
                src="/images/cybersecurity.png"
                alt="CyberGuard Mascot"
                className="w-28 h-28 object-contain drop-shadow-md"
              />

              <div className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>HOT</span>
              </div>
            </div>

            <div className="bg-slate-900/90 text-white rounded-2xl p-4 space-y-1.5 border border-slate-700/80">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-sky-400">
                <Target className="w-4 h-4" />
                <span>Mục tiêu nhiệm vụ:</span>
              </div>
              <p className="text-xs font-bold text-slate-300 leading-snug">
                Phát hiện kẻ gian giả mạo Cán bộ điều tra đang dọa khóa tài khoản!
              </p>
            </div>
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
