"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";
import {
  ArrowRight,
  ShieldCheck,
  Flame,
  Star,
  Sword,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

/**
 * 1. Chế độ Người Cao Tuổi (ElderlyHero)
 * Triết lý: Tối giản tuyệt đối, to, rõ, loại bỏ mọi sự phân tâm.
 * Bố cục: 1 cột (One-column) căn giữa màn hình.
 * Bỏ hẳn cụm mô phỏng điện thoại rắc rối bên phải.
 * 3 quy tắc an toàn font cực to, nút bấm duy nhất siêu to khổng lồ.
 */
function ElderlyHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-amber-50/60 border-b-4 border-amber-300 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-slate-950">
      <div className="max-w-4xl mx-auto text-center space-y-10 sm:space-y-12">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-base sm:text-lg shadow-xs">
          <span className="text-2xl">👴</span>
          <span>DÀNH RIÊNG CHO BÁC & GIA ĐÌNH</span>
        </div>

        {/* Giant Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.15]">
            BÁC CÓ NHẬN RA{" "}
            <span className="text-rose-700 underline decoration-amber-500 decoration-wavy">
              CÚ LỪA
            </span>{" "}
            KHÔNG?
          </h1>
          <p className="text-2xl sm:text-3xl text-slate-900 font-bold max-w-2xl mx-auto leading-relaxed">
            Kẻ gian gọi điện dọa nạt, mạo danh Công an, giục chuyển tiền. Bác chỉ cần nhớ 3 điều:
          </p>
        </div>

        {/* 3 Quy tắc an toàn - Gạch đầu dòng cực to & rõ ràng */}
        <div className="space-y-5 text-left max-w-2xl mx-auto">
          {/* Rule 1 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-4 border-rose-500 shadow-md flex items-center gap-5 sm:gap-6">
            <span className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-sm">
              1
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-800 mb-1">
                🛑 DỪNG LẠI
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Không nghe lời giục giã, không bấm vào link lạ gửi tới.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-4 border-amber-500 shadow-md flex items-center gap-5 sm:gap-6">
            <span className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-sm">
              2
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-800 mb-1">
                📞 GỌI NGƯỜI THÂN
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Cúp máy ngay! Gọi ngay cho con cháu hoặc Công an xã/phường.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-4 border-emerald-500 shadow-md flex items-center gap-5 sm:gap-6">
            <span className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-sm">
              3
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 mb-1">
                🛡️ KHÔNG CHUYỂN TIỀN
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Công an thật KHÔNG BAO GIỜ yêu cầu Bác chuyển tiền qua điện thoại!
              </p>
            </div>
          </div>
        </div>

        {/* Nút bấm duy nhất, siêu to khổng lồ nằm ngay giữa màn hình */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-12 sm:px-16 py-6 sm:py-7 rounded-3xl bg-blue-700 hover:bg-blue-800 text-white font-black text-2xl sm:text-3xl shadow-2xl flex items-center justify-center gap-4 cursor-pointer transition-all border-b-8 border-blue-950 active:border-b-0 active:translate-y-2 min-h-[84px]"
          >
            <span>BẤM VÀO ĐÂY ĐỂ LUYỆN TẬP</span>
            <ArrowRight className="w-8 h-8 text-white" />
          </button>

          <p className="text-lg sm:text-xl font-bold text-slate-800 flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            100% Miễn phí • Tuyệt đối không yêu cầu mật khẩu của Bác
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. Chế độ Trẻ Em (ChildHero)
 * Triết lý: Gamification, sinh động, giống màn hình vào game (Play screen).
 * Bố cục: Bất đối xứng, nhiều hình khối nổi 3D, có nhân vật Mascot.
 * Hội thoại bong bóng, thanh XP/Badge, nút bấm Duolingo 3D chunky với hiệu ứng pulse.
 */
function ChildHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-sky-900 to-blue-950 text-white border-b-4 border-indigo-700 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#38bdf8 2px, transparent 2px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Mascot Speech Bubble & 3D Gamified Call to Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Mascot Speech Bubble Header */}
          <div className="relative inline-block text-left">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black px-5 py-3 rounded-2xl rounded-bl-none shadow-lg border-2 border-yellow-200 text-base sm:text-lg flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">🛡️</span>
              <span>Nhiệm vụ hôm nay: Săn lùng kẻ mạo danh!</span>
            </div>
            {/* Speech bubble tail pointer */}
            <div className="w-0 h-0 border-t-[10px] border-t-yellow-300 border-r-[10px] border-r-transparent ml-2" />
          </div>

          {/* Game Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight uppercase drop-shadow-md">
              Hóa Thân <span className="text-amber-400">Hiệp Sĩ Số</span>, Phá 39 Bẫy Kẻ Gian!
            </h1>
            <p className="text-base sm:text-lg text-sky-200 font-semibold leading-relaxed max-w-xl">
              Cùng CyberGuard thâm nhập các phòng chat lừa đảo, phát hiện chiêu trò hack acc game và giải cứu thế giới số!
            </p>
          </div>

          {/* Gamification Status Bar (XP & Streak Badges) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-xl max-w-lg space-y-3">
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
            <div className="w-full h-3.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 transition-all duration-1000 shadow-sm"
                style={{ width: "50%" }}
              />
            </div>
          </div>

          {/* Chunky 3D Duolingo-style Action Button with Pulse Glow */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onStart}
              className="group relative w-full sm:w-auto px-10 py-5 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl sm:text-2xl shadow-2xl transition-all border-b-8 border-emerald-700 active:border-b-0 active:translate-y-2 cursor-pointer flex items-center justify-center gap-3 animate-pulse hover:animate-none"
            >
              <Sword className="w-7 h-7 text-yellow-300 group-hover:rotate-12 transition-transform" />
              <span>BẮT ĐẦU NHIỆM VỤ!</span>
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: Asymmetric 3D Game Island with Mascot & Quest Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Asymmetric 3D Game Stage Card */}
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-sky-400 to-indigo-600 p-6 border-4 border-sky-300 shadow-2xl space-y-5 transform hover:rotate-1 transition-transform">
            {/* Top Game Stage Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-black/30 backdrop-blur-md text-xs font-black uppercase text-amber-300 border border-white/20">
                Ải 1: Cuộc Gọi Bí Mật
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                <Trophy className="w-3.5 h-3.5" />
                +100 XP
              </span>
            </div>

            {/* Mascot Center Illustration */}
            <div className="relative w-full h-44 rounded-2xl bg-sky-950/50 border-2 border-white/30 flex items-center justify-center p-3 overflow-hidden">
              <img
                src="/images/cybersecurity.png"
                alt="CyberGuard Mascot"
                className="w-32 h-32 object-contain drop-shadow-xl animate-bounce"
              />

              {/* Floating Star Badge */}
              <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>HOT</span>
              </div>
            </div>

            {/* Quest Briefing Card */}
            <div className="bg-white/95 text-slate-900 rounded-2xl p-4 space-y-1.5 shadow-md">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-700">
                <Target className="w-4 h-4" />
                <span>Mục tiêu nhiệm vụ:</span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-snug">
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
 * Quyết định render ElderlyHero hay ChildHero dựa trên userRole từ DemographicContext
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
