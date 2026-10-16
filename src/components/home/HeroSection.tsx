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

          {/* Chunky 3D Duolingo-style Action Button */}
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
            {/* Top Game Stage Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-black uppercase text-amber-300 border border-slate-700">
                Ải 1: Cuộc Gọi Bí Mật
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <Trophy className="w-3.5 h-3.5" />
                +100 XP
              </span>
            </div>

            {/* Mascot Center Illustration */}
            <div className="relative w-full h-40 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center p-3 overflow-hidden">
              <img
                src="/images/cybersecurity.png"
                alt="CyberGuard Mascot"
                className="w-28 h-28 object-contain drop-shadow-md"
              />

              {/* Hot Badge */}
              <div className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>HOT</span>
              </div>
            </div>

            {/* Quest Briefing Card */}
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
