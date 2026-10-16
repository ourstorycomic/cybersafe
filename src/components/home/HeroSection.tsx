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
  Sparkles,
  Octagon,
  Search,
  PhoneForwarded,
  Info,
  PhoneCall,
  Flame,
  CheckCircle2,
  Gamepad2,
  HeartHandshake,
} from "lucide-react";

export function HeroSection() {
  const { user, openAuthModal } = useAuth();
  const { userRole, isElderly, isChild } = useDemographic();
  const router = useRouter();

  // Active Hotspot on Phone Mockup
  const [activeHotspot, setActiveHotspot] = useState<number>(1);

  const handleStartTraining = () => {
    if (!user) {
      openAuthModal("signin");
    } else {
      router.push("/play");
    }
  };

  const hotspots = [
    {
      id: 1,
      title: "Mạo danh số gọi",
      badge: "Hotspot 1",
      detail: isElderly
        ? "Số lạ mạo danh Công an / Tòa án. Công an thật không bao giờ gọi điện đòi tiền!"
        : "Số điện thoại lạ mạo danh Viện kiểm sát / Công an. Cơ quan điều tra không bao giờ làm việc qua điện thoại.",
      color: "bg-rose-500",
    },
    {
      id: 2,
      title: "Áp lực thời gian",
      badge: "Hotspot 2",
      detail: isElderly
        ? "Bắt chuyển tiền gấp trong 30 phút để Bác hoảng sợ, không kịp hỏi con cháu!"
        : "Ép buộc xử lý trong 30 phút - chiêu trò thao túng tâm lý sợ hãi để nạn nhân không kịp hỏi ý kiến người thân.",
      color: "bg-amber-500",
    },
    {
      id: 3,
      title: "Đòi chuyển tiền",
      badge: "Hotspot 3",
      detail: isElderly
        ? "Bác tuyệt đối KHÔNG chuyển tiền vào bất kỳ tài khoản cá nhân nào!"
        : "Yêu cầu chuyển 50 triệu vào 'Tài khoản tạm giữ'. Pháp luật Việt Nam KHÔNG CÓ tài khoản tạm giữ qua chuyển khoản cá nhân.",
      color: "bg-rose-600",
    },
  ];

  return (
    <section className={`relative overflow-hidden border-b py-12 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isElderly 
        ? "bg-amber-50/40 border-amber-200 text-slate-950" 
        : "bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white border-slate-200 text-slate-900"
    }`}>
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Main Grid: Value Proposition + Realistic Simulation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mascot Banner for Child or Trust Badge for Elderly */}
            {isChild ? (
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-300 shadow-xs">
                <span className="text-2xl animate-bounce">🛡️</span>
                <span className="text-sm font-black text-amber-900">
                  Hiệp Sĩ Số ơi: Cùng giải cứu không gian mạng khỏi kẻ gian!
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-950 text-sm font-black">
                <HeartHandshake className="w-5 h-5 text-amber-700" />
                <span>Chế độ chữ to, rõ ràng dành cho Bác & Gia đình</span>
              </div>
            )}

            {/* Main Headline */}
            <div className="space-y-4">
              {isElderly ? (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.2]">
                    Phòng Ngừa Lừa Đảo,{" "}
                    <span className="text-blue-700 underline decoration-amber-400 decoration-wavy">
                      Bảo Vệ Tiền Tiết Kiệm
                    </span>{" "}
                    Của Bác.
                  </h1>
                  <p className="text-xl sm:text-2xl text-slate-900 font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Chỉ dẫn ngắn gọn, dễ hiểu giúp Bác nhận diện ngay các cuộc gọi mạo danh và tin nhắn lừa đảo.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
                    Hóa thân Hiệp sĩ số,{" "}
                    <span className="text-blue-600">
                      phá vỡ 39 cạm bẫy
                    </span>{" "}
                    kẻ gian trên mạng!
                  </h1>
                  <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Trải nghiệm game nhập vai phá án cực cuốn, giúp bạn nhận diện các chiêu trò lừa đảo qua mạng, nạp game ảo và tin nhắn giả mạo.
                  </p>
                </>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleStartTraining}
                className={
                  isElderly
                    ? "w-full sm:w-auto px-10 py-5 sm:py-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 min-h-[72px]"
                    : "w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-lg flex items-center justify-center gap-2.5 cursor-pointer transition-all border-b-6 border-blue-800 active:border-b-0 active:translate-y-1.5 hover:scale-[1.02]"
                }
              >
                <span>{isElderly ? "BẮT ĐẦU LUYỆN TẬP NGAY" : "🎮 BẮT ĐẦU PHÁ ÁN NGAY"}</span>
                <ArrowRight className={isElderly ? "w-7 h-7 text-white" : "w-5 h-5 text-blue-100"} />
              </button>

              <button
                onClick={() => router.push("/about")}
                className={
                  isElderly
                    ? "w-full sm:w-auto px-8 py-5 rounded-2xl bg-white hover:bg-amber-100 text-slate-900 border-2 border-slate-400 font-black text-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[72px]"
                    : "w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-bold text-base shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                }
              >
                <span>{isElderly ? "Xem Hướng Dẫn" : "Tìm Hiểu Thêm"}</span>
              </button>
            </div>

            {/* Trust Assurance */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 ${
              isElderly ? "text-base font-bold text-slate-900" : "text-xs font-semibold text-slate-600"
            }`}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className={isElderly ? "w-6 h-6 text-emerald-700" : "w-4 h-4 text-emerald-600"} />
                100% Miễn phí & Tuyệt đối bảo mật
              </span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <Lock className={isElderly ? "w-6 h-6 text-blue-700" : "w-4 h-4 text-blue-600"} />
                Không bao giờ hỏi mật khẩu của Bác
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Phone Mockup with Visual Illustration & Hotspot Pins */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl bg-white border-2 border-slate-300 shadow-xl overflow-hidden">
              {/* Phone Status Bar */}
              <div className="bg-slate-100 text-slate-700 px-5 py-2.5 flex items-center justify-between text-[11px] font-mono border-b border-slate-200">
                <span className="font-bold">09:41</span>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Message Header */}
              <div className="px-5 py-3 border-b border-rose-100 bg-rose-50/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center font-bold text-xs animate-pulse">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <span>CẢNH BÁO: Cuộc gọi mạo danh</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Số máy lạ • Giả danh cơ quan điều tra</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Rủi ro cao
                </span>
              </div>

              {/* Visual Illustration & Interactive Hotspots */}
              <div className="p-5 space-y-4 bg-slate-50/50">
                {/* Illustration with Hotspot Pins Overlay */}
                <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-3 flex flex-col items-center">
                  <div className="w-full h-36 relative flex items-center justify-center">
                    <img
                      src="/images/fake police.png"
                      alt="Minh họa giả danh công an"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />

                    {/* Hotspot Pin 1: Caller ID */}
                    <button
                      onClick={() => setActiveHotspot(1)}
                      className={`absolute top-2 left-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md transition-transform cursor-pointer ${
                        activeHotspot === 1
                          ? "bg-rose-600 text-white ring-4 ring-rose-200 scale-110"
                          : "bg-white text-slate-700 border border-slate-300 hover:scale-105"
                      }`}
                      title="Bấm xem điểm bất thường 1"
                    >
                      1
                    </button>

                    {/* Hotspot Pin 2: Urgent 30 minutes */}
                    <button
                      onClick={() => setActiveHotspot(2)}
                      className={`absolute top-1/2 right-4 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md transition-transform cursor-pointer ${
                        activeHotspot === 2
                          ? "bg-amber-600 text-white ring-4 ring-amber-200 scale-110"
                          : "bg-white text-slate-700 border border-slate-300 hover:scale-105"
                      }`}
                      title="Bấm xem điểm bất thường 2"
                    >
                      2
                    </button>

                    {/* Hotspot Pin 3: Bank transfer request */}
                    <button
                      onClick={() => setActiveHotspot(3)}
                      className={`absolute bottom-2 left-6 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md transition-transform cursor-pointer ${
                        activeHotspot === 3
                          ? "bg-rose-600 text-white ring-4 ring-rose-200 scale-110"
                          : "bg-white text-slate-700 border border-slate-300 hover:scale-105"
                      }`}
                      title="Bấm xem điểm bất thường 3"
                    >
                      3
                    </button>
                  </div>

                  {/* Hotspots Bar */}
                  <div className="w-full flex items-center justify-around gap-2 pt-2 border-t border-slate-200 text-[11px] font-bold">
                    {hotspots.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setActiveHotspot(h.id)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                          activeHotspot === h.id
                            ? "bg-blue-600 text-white shadow-xs font-bold"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                          {h.id}
                        </span>
                        <span>{h.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Explanation Card Based on Active Hotspot */}
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-800 space-y-1.5 transition-all">
                  <div className="flex items-center gap-1.5 text-blue-700 font-black uppercase text-[11px] tracking-wider">
                    <Info className="w-4 h-4" />
                    <span>Bóc tách bẫy lừa đảo (Điểm #{activeHotspot}):</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 font-medium">
                    {hotspots.find((h) => h.id === activeHotspot)?.detail}
                  </p>
                </div>

                {/* Accuracy Stat Footer */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium">Hiệu quả rèn luyện:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    94.8% người học nhận diện đúng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Core Response Framework */}
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-sm space-y-6 sm:space-y-8 ${
          isElderly ? "bg-white border-2 border-slate-400" : "bg-white border-slate-200"
        }`}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className={`text-xs uppercase font-black tracking-widest px-3.5 py-1 rounded-full border ${
              isElderly 
                ? "bg-amber-100 text-amber-950 border-amber-300 text-sm" 
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {isElderly ? "BẢN GHI NHỚ DÀNH CHO BÁC" : "⚔️ BÍ KÍP 4 BƯỚC HIỆP SĨ SỐ"}
            </span>
            <h2 className={
              isElderly 
                ? "text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
                : "text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
            }>
              {isElderly ? "4 Điều Nhất Quyết Phải Làm Khi Có Số Lạ Gọi Đến" : "4 Chiêu Thức Phản Xạ Đánh Bại Mọi Cạm Bẫy"}
            </h2>
            <p className={
              isElderly
                ? "text-lg sm:text-xl text-slate-800 font-bold"
                : "text-sm sm:text-base text-slate-600 font-medium"
            }>
              {isElderly 
                ? "Bác hãy ghi nhớ 4 bước này trước khi bấm vào bất cứ tin nhắn hay nghe lời ai đó qua điện thoại:"
                : "Tuyệt chiêu nhận diện và tự bảo vệ tài khoản khi lướt mạng xã hội và chơi game:"}
            </p>
          </div>

          {/* Sơ đồ khối SmartArt có mũi tên liên kết từ trái sang phải */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Step 1 */}
            <div className={`relative p-5 sm:p-6 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-4 transition-all ${
              isElderly 
                ? "bg-rose-50 border-rose-400" 
                : "bg-rose-50/60 border-rose-200 hover:border-rose-300"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono font-black px-3 py-1 rounded-lg bg-rose-600 text-white shadow-xs ${
                    isElderly ? "text-sm" : "text-xs"
                  }`}>
                    Bước 01
                  </span>
                  <Octagon className={isElderly ? "w-8 h-8 text-rose-700" : "w-7 h-7 text-rose-600"} />
                </div>
                <h3 className={`font-black text-slate-950 mb-1.5 ${isElderly ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                  DỪNG LẠI
                </h3>
                <p className={`font-semibold leading-relaxed ${isElderly ? "text-lg text-slate-950" : "text-xs sm:text-sm text-slate-700"}`}>
                  {isElderly 
                    ? "Không nghe theo lời giục giã. Không vội chuyển tiền. Bác hãy cúp máy ngay!" 
                    : "Không click link lạ, không gửi mã thẻ game, không đọc mã OTP cho ai."}
                </p>
              </div>
              <div className={`font-bold p-2.5 rounded-xl text-center border ${
                isElderly 
                  ? "text-base font-black text-rose-950 bg-rose-200 border-rose-300" 
                  : "text-xs text-rose-800 bg-rose-100 border-rose-200"
              }`}>
                🛑 Cúp máy / Dừng lại ngay
              </div>
            </div>

            {/* Step 2 */}
            <div className={`relative p-5 sm:p-6 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-4 transition-all ${
              isElderly 
                ? "bg-amber-50 border-amber-400" 
                : "bg-amber-50/60 border-amber-200 hover:border-amber-300"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono font-black px-3 py-1 rounded-lg bg-amber-600 text-white shadow-xs ${
                    isElderly ? "text-sm" : "text-xs"
                  }`}>
                    Bước 02
                  </span>
                  <Search className={isElderly ? "w-8 h-8 text-amber-700" : "w-7 h-7 text-amber-600"} />
                </div>
                <h3 className={`font-black text-slate-950 mb-1.5 ${isElderly ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                  KIỂM TRA
                </h3>
                <p className={`font-semibold leading-relaxed ${isElderly ? "text-lg text-slate-950" : "text-xs sm:text-sm text-slate-700"}`}>
                  {isElderly 
                    ? "Công an thật không làm việc qua điện thoại. Mọi người đòi tiền đều là kẻ gian." 
                    : "Soi kỹ tên trang web lạ, nick giả mạo bạn bè và link tặng quà 0 đồng."}
                </p>
              </div>
              <div className={`font-bold p-2.5 rounded-xl text-center border ${
                isElderly 
                  ? "text-base font-black text-amber-950 bg-amber-200 border-amber-300" 
                  : "text-xs text-amber-800 bg-amber-100 border-amber-200"
              }`}>
                🔍 Kiểm tra số điện thoại lạ
              </div>
            </div>

            {/* Step 3 */}
            <div className={`relative p-5 sm:p-6 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-4 transition-all ${
              isElderly 
                ? "bg-sky-50 border-sky-400" 
                : "bg-sky-50/60 border-sky-200 hover:border-sky-300"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono font-black px-3 py-1 rounded-lg bg-sky-600 text-white shadow-xs ${
                    isElderly ? "text-sm" : "text-xs"
                  }`}>
                    Bước 03
                  </span>
                  <PhoneForwarded className={isElderly ? "w-8 h-8 text-sky-700" : "w-7 h-7 text-sky-600"} />
                </div>
                <h3 className={`font-black text-slate-950 mb-1.5 ${isElderly ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                  HỎI Ý KIẾN
                </h3>
                <p className={`font-semibold leading-relaxed ${isElderly ? "text-lg text-slate-950" : "text-xs sm:text-sm text-slate-700"}`}>
                  {isElderly 
                    ? "Gọi điện ngay cho con cháu hoặc Công an xã/phường gần nhà để hỏi lại." 
                    : "Hỏi ngay bố mẹ, thầy cô hoặc anh chị trước khi làm theo chỉ dẫn của người lạ."}
                </p>
              </div>
              <div className={`font-bold p-2.5 rounded-xl text-center border ${
                isElderly 
                  ? "text-base font-black text-sky-950 bg-sky-200 border-sky-300" 
                  : "text-xs text-sky-800 bg-sky-100 border-sky-200"
              }`}>
                📞 Gọi cho người thân ngay
              </div>
            </div>

            {/* Step 4 */}
            <div className={`relative p-5 sm:p-6 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-4 transition-all ${
              isElderly 
                ? "bg-emerald-50 border-emerald-400" 
                : "bg-emerald-50/60 border-emerald-200 hover:border-emerald-300"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono font-black px-3 py-1 rounded-lg bg-emerald-600 text-white shadow-xs ${
                    isElderly ? "text-sm" : "text-xs"
                  }`}>
                    Bước 04
                  </span>
                  <ShieldCheck className={isElderly ? "w-8 h-8 text-emerald-700" : "w-7 h-7 text-emerald-600"} />
                </div>
                <h3 className={`font-black text-slate-950 mb-1.5 ${isElderly ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                  AN TOÀN
                </h3>
                <p className={`font-semibold leading-relaxed ${isElderly ? "text-lg text-slate-950" : "text-xs sm:text-sm text-slate-700"}`}>
                  {isElderly 
                    ? "Giữ chặt tiền trong sổ tiết kiệm. Bác đã an toàn không bị kẻ xấu lừa!" 
                    : "Chúc mừng bạn đã bảo vệ an toàn danh tính số và tài khoản của mình!"}
                </p>
              </div>
              <div className={`font-bold p-2.5 rounded-xl text-center border ${
                isElderly 
                  ? "text-base font-black text-emerald-950 bg-emerald-200 border-emerald-300" 
                  : "text-xs text-emerald-800 bg-emerald-100 border-emerald-200"
              }`}>
                🛡️ Tiền an toàn 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

