"use client";

import { useDemographic } from "@/context/DemographicContext";
import {
  ShieldCheck,
  Target,
  Users,
  Gamepad2,
  Bot,
  BookOpen,
  BarChart3,
  Sparkles,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export function PlatformIntroSection() {
  const { isElderly } = useDemographic();

  const targetAudiences = [
    {
      role: "Người cao tuổi & Gia đình",
      desc: "Trang bị phản xạ nhận diện các cuộc gọi giả mạo Công an/Viện kiểm sát, tin nhắn lừa đảo cấp cứu, bẫy trúng thưởng quà 0 đồng và bảo vệ tài sản tích lũy an toàn.",
      icon: "👴",
      highlight: "Giao diện to, rõ, dễ thao tác",
    },
    {
      role: "Trẻ em, Học sinh & Sinh viên",
      desc: "Hóa thân Hiệp sĩ số phá bẫy hack tài khoản game, lừa đảo skin súng/robux, bẫy 'việc nhẹ lương cao' và thói quen bảo vệ dữ liệu cá nhân trên mạng xã hội.",
      icon: "🧒",
      highlight: "Trải nghiệm Game tương tác sinh động",
    },
    {
      role: "Cộng đồng Công dân số",
      desc: "Nâng cao nhận thức bảo mật, chuẩn hóa quy trình xác minh số lạ, kiểm tra liên kết độc hại và phòng ngừa các thủ đoạn lừa đảo công nghệ cao mới nhất.",
      icon: "🛡️",
      highlight: "Khung năng lực số chuẩn hóa",
    },
  ];

  const coreFeatures = [
    {
      id: "game",
      title: "Trò Chơi Tình Huống Thực Tế",
      desc: "Hơn 39 ải mô phỏng đa dạng: Phân nhánh quyết định (Branching Scenario), Khoanh vùng bất thường (Hotspot), Tìm lỗi giả mạo (Spot the Scam) và Mô phỏng tương tác thực tế.",
      icon: Gamepad2,
      badge: "Học Qua Tương Tác",
      color: "blue",
    },
    {
      id: "bot",
      title: "Trợ Lý Phân Tích Rủi Ro CyberGuardBot",
      desc: "Ứng dụng kỹ thuật Scaffolding sư phạm: Nhập tin nhắn, đường link hoặc số điện thoại lạ để nhận phân tích dấu hiệu, đánh giá mức độ rủi ro và hướng dẫn xử lý trước khi hành động.",
      icon: Bot,
      badge: "Hỗ Trợ Ra Quyết Định",
      color: "emerald",
    },
    {
      id: "guide",
      title: "Cẩm Nang An Toàn & Đường Dây Nóng",
      desc: "Thư viện tổng hợp 11 nhóm chiêu thức lừa đảo điển hình tại Việt Nam, quy trình 5 bước xử lý khi đã lỡ chuyển tiền/lộ mật khẩu và kết nối trực tiếp với các số hotline khẩn cấp.",
      icon: BookOpen,
      badge: "Thư Viện Tra Cứu",
      color: "amber",
    },
    {
      id: "eval",
      title: "Đánh Giá Năng Lực & Theo Dõi Tiến Bộ",
      desc: "Bài kiểm tra Pre-test 10 câu hỏi chuẩn hóa đầu vào, theo dõi thang đo năng lực nhận diện rủi ro và đo lường sự tiến bộ trước - sau khi rèn luyện trên nền tảng.",
      icon: BarChart3,
      badge: "Thang Đo Năng Lực",
      color: "purple",
    },
  ];

  if (isElderly) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-amber-50/40 border-b-4 border-amber-300">
        <div className="max-w-4xl mx-auto space-y-14">
          {/* Header 1 cột to rõ */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-200 text-amber-950 font-black text-base sm:text-lg border-2 border-amber-400">
              <Target className="w-5 h-5 text-amber-800" />
              <span>GIỚI THIỆU VỀ NỀN TẢNG AN TOÀN SỐ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              MỤC TIÊU, ĐỐI TƯỢNG & CHỨC NĂNG
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed max-w-3xl mx-auto">
              Nền tảng học tập cộng đồng vì một không gian mạng an toàn cho người cao tuổi, học sinh và mọi gia đình Việt Nam.
            </p>
          </div>

          {/* 1. Mục tiêu cốt lõi */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-4 border-blue-600 shadow-md space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black shrink-0">
                🎯
              </span>
              <div>
                <span className="text-sm font-black uppercase text-blue-800 tracking-wider">
                  MỤC TIÊU CỐT LÕI
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Phát hiện & Phòng ngừa các hình thức lừa đảo trực tuyến
                </h3>
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed pl-2 sm:pl-18">
              Giúp Bác và người thân trong gia đình nâng cao cảnh giác, xây dựng phản xạ an toàn, nhận biết các chiêu trò giả mạo tinh vi qua điện thoại, tin nhắn để tuyệt đối không bị mất tiền và lộ thông tin cá nhân.
            </p>
          </div>

          {/* 2. Đối tượng phục vụ */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 text-center flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-amber-700" />
              <span>NỀN TẢNG PHỤC VỤ AI?</span>
            </h3>

            <div className="space-y-4">
              {targetAudiences.map((target, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white border-3 border-amber-300 shadow-sm flex items-start gap-5"
                >
                  <span className="text-4xl shrink-0 p-2 rounded-2xl bg-amber-100 border border-amber-300">
                    {target.icon}
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-950">
                        {target.role}
                      </h4>
                      <span className="text-sm font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                        {target.highlight}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-slate-900 leading-relaxed">
                      {target.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 4 Chức năng hỗ trợ Bác */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 text-center flex items-center justify-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-700" />
              <span>4 CHỨC NĂNG CHÍNH CỦA HỆ THỐNG</span>
            </h3>

            <div className="space-y-4">
              {coreFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-slate-300 hover:border-blue-500 shadow-sm space-y-3 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs sm:text-sm font-black uppercase text-blue-700 tracking-wider">
                          {feat.badge}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black text-slate-950">
                          {feat.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-slate-900 leading-relaxed pl-2 sm:pl-16">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Child / Standard View
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 font-black text-xs uppercase tracking-wider">
            <Target className="w-4 h-4 text-sky-400" />
            <span>Mục Tiêu & Sứ Mệnh Nền Tảng</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nền Tảng Trò Chơi Hỗ Trợ Cộng Đồng
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Phát hiện và phòng ngừa các hình thức lừa đảo trực tuyến tại Việt Nam — Xây dựng năng lực số thông qua trải nghiệm tình huống thực tế và trợ lý AI Scaffolding.
          </p>
        </div>

        {/* 3 Đối tượng phục vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targetAudiences.map((target, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 hover:border-sky-400/60 shadow-xl space-y-4 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl p-3 rounded-2xl bg-slate-900 border border-slate-700 group-hover:scale-110 transition-transform">
                  {target.icon}
                </span>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {target.highlight}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {target.role}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mt-2">
                  {target.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Chức năng cốt lõi */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>4 Chức Năng Nền Tảng Toàn Diện</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
