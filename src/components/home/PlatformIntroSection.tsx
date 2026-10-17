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
      icon: HeartHandshake,
      highlight: "Giao diện to, rõ, dễ thao tác",
    },
    {
      role: "Trẻ em, Học sinh & Sinh viên",
      desc: "Hóa thân Hiệp sĩ số phá bẫy hack tài khoản game, lừa đảo skin súng/robux, bẫy 'việc nhẹ lương cao' và thói quen bảo vệ dữ liệu cá nhân trên mạng xã hội.",
      icon: Gamepad2,
      highlight: "Trải nghiệm Game tương tác sinh động",
    },
    {
      role: "Cộng đồng Công dân số",
      desc: "Nâng cao nhận thức bảo mật, chuẩn hóa quy trình xác minh số lạ, kiểm tra liên kết độc hại và phòng ngừa các thủ đoạn lừa đảo công nghệ cao mới nhất.",
      icon: ShieldCheck,
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          {/* Header chuẩn mực, thanh lịch */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs sm:text-sm font-bold">
              <Target className="w-4 h-4 text-blue-700" />
              <span>Giới Thiệu Nền Tảng An Toàn Số</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Mục Tiêu, Đối Tượng & Chức Năng Của Hệ Thống
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Nền tảng hỗ trợ cộng đồng phòng ngừa các thủ đoạn lừa đảo công nghệ cao, bảo vệ an toàn tài chính cho người lớn tuổi và các gia đình Việt Nam.
            </p>
          </div>

          {/* 1. Mục tiêu cốt lõi */}
          <div className="p-6 sm:p-7 rounded-2xl bg-blue-50/50 border border-blue-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                  Mục tiêu đề tài
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Phát hiện & Phòng ngừa các hình thức lừa đảo trực tuyến
                </h3>
              </div>
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed pl-0 sm:pl-13">
              Hỗ trợ người cao tuổi và gia đình rèn luyện phản xạ nhận diện các bẫy tâm lý mạo danh cơ quan nhà nước, cuộc gọi dọa nạt và liên kết độc hại, giúp bảo vệ an toàn tài sản tích lũy và thông tin cá nhân.
            </p>
          </div>

          {/* 2. Đối tượng phục vụ */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Users className="w-6 h-6 text-blue-700" />
              <span>Đối Tượng Phục Vụ Trọng Tâm</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {targetAudiences.map((target, idx) => {
                const TargetIcon = target.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                          <TargetIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {target.highlight}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {target.role}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {target.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. 4 Chức năng chính */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <span>4 Chức Năng Cốt Lõi Của Nền Tảng</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {coreFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {idx + 1}. {feat.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
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

  // Child / Standard View — Trẻ trung, năng động, phong cách Trạm Huấn Luyện Hiệp Sĩ Số
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
        {/* Header Gaming */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            <span>Trạm Chỉ Huy Hiệp Sĩ Số • Sứ Mệnh Bảo Vệ Mạng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Học Thật Vui — <span className="text-sky-600">Bắt Bẫy Thật Chuẩn!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
            Nền tảng trang bị siêu năng lực nhận diện lừa đảo, rèn phản xạ tự bảo vệ bản thân và gia đình trước kẻ gian công nghệ cao.
          </p>
        </div>

        {/* 3 Biệt Đội Bảo Vệ (Target Audiences) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <span>3 Biệt Đội Bảo Vệ Trọng Tâm</span>
            </h3>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
              Phục vụ cộng đồng số
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {targetAudiences.map((target, idx) => {
              const TargetIcon = target.icon;
              const squadThemes = [
                { bg: "bg-sky-50 border-sky-300 text-sky-700", chip: "Gamer & Học sinh", emoji: "🎮" },
                { bg: "bg-emerald-50 border-emerald-300 text-emerald-700", chip: "Gia đình an toàn", emoji: "👨‍👩‍👧" },
                { bg: "bg-amber-50 border-amber-300 text-amber-700", chip: "Trợ thủ ông bà", emoji: "👴" },
              ][idx] || { bg: "bg-blue-50 border-blue-300 text-blue-700", chip: target.highlight, emoji: "🛡️" };

              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-sky-400 hover:shadow-lg space-y-4 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${squadThemes.bg} border-2 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform`}>
                        <span>{squadThemes.emoji}</span>
                      </div>
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {target.highlight}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                      {target.role}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {target.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Nhiệm vụ: {squadThemes.chip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Siêu Năng Lực Nền Tảng (Core Features) */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span>4 Siêu Năng Lực Hiệp Sĩ Nền Tảng</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Full tính năng mở khóa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              const cardIcons = [
                { color: "text-sky-600 bg-sky-50 border-sky-300", badge: "39 Ải Thử Thách", perk: "+500 XP Leo Rank" },
                { color: "text-purple-600 bg-purple-50 border-purple-300", badge: "Trợ Lý AI Siêu Tốc", perk: "Soi bẫy 3s" },
                { color: "text-emerald-600 bg-emerald-50 border-emerald-300", badge: "11 Bí Kíp Phòng Vệ", perk: "Dữ liệu thực tế" },
                { color: "text-amber-600 bg-amber-50 border-amber-300", badge: "Bảng Vàng Chiến Tích", perk: "Chứng chỉ KHKT" },
              ][idx] || { color: "text-blue-600 bg-blue-50 border-blue-300", badge: feat.badge, perk: "Tính năng" };

              return (
                <div
                  key={feat.id}
                  className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${cardIcons.color} border-2 flex items-center justify-center font-bold shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {cardIcons.perk}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {feat.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
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
