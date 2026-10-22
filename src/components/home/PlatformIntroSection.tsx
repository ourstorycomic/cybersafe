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
  Zap,
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
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {/* Header ân cần, súc tích */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs sm:text-sm font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Lời Dặn An Toàn Dành Cho Bác & Gia Đình</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              3 Nguyên Tắc Vàng & 3 Công Cụ Hỗ Trợ Bác
            </h2>
            <p className="text-base text-slate-700 font-normal">
              Ghi nhớ 3 điều không làm và sử dụng các công cụ bên dưới để an tâm dùng mạng mỗi ngày:
            </p>
          </div>

          {/* 1. 3 Điều KHÔNG LÀM (To, rõ ràng) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-black text-xl flex items-center justify-center border border-rose-200">
                ❌
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                1. Không Tin Cuộc Gọi Dọa Nạt
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Công an, Viện kiểm sát thật <strong>không bao giờ</strong> gọi điện thoại làm việc hay yêu cầu Bác chuyển tiền.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-black text-xl flex items-center justify-center border border-rose-200">
                ❌
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                2. Không Gửi Mã OTP & Mật Khẩu
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Mã OTP gửi về điện thoại giống như chìa khóa tủ tiền. Tuyệt đối không đọc cho bất kỳ ai.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-black text-xl flex items-center justify-center border border-rose-200">
                ❌
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                3. Không Bấm Vào Link Nhận Quà
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Tin nhắn báo trúng thưởng, tặng quà tri ân đều là bẫy để lừa Bác bấm vào cài đặt mã độc.
              </p>
            </div>
          </div>

          {/* 2. 3 Công cụ sẵn có giúp Bác */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <span>3 Tiện Ích Giúp Bác Luyện Tập & Phòng Tránh:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-blue-700" />
                  <span>Bài Luyện Tập Tình Huống</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Xem các mẫu cuộc gọi, tin nhắn lừa đảo quen thuộc để tập phản xạ cúp máy dứt khoát.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-700" />
                  <span>Trợ Lý Kiểm Tra Tin Nhắn</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Bác chỉ cần dán tin nhắn hoặc số lạ vào, trợ lý sẽ kiểm tra và cảnh báo có an toàn hay không.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Cẩm Nang Bỏ Túi</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Tổng hợp ngắn gọn các chiêu trò lừa đảo thường gặp nhất tại Việt Nam kèm số điện thoại khẩn cấp.
                </p>
              </div>
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
        {/* Header Gaming / Child */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-300 text-sky-900 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Khung Năng Lực Số • Dành Cho Học Sinh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Học Trực Quan — <span className="text-sky-600">Phản Xạ An Toàn Trên Không Gian Mạng</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
            Mô phỏng các tình huống thực tế giúp học sinh tự trang bị kỹ năng nhận diện nguy cơ, bảo vệ tài khoản cá nhân và dữ liệu riêng tư.
          </p>
        </div>

        {/* 3 Biệt Đội Bảo Vệ (Target Audiences) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              <span>3 Nhóm Người Dùng Trọng Tâm Của Đề Tài</span>
            </h3>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
              Phục vụ cộng đồng số
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {targetAudiences.map((target, idx) => {
              const squadThemes = [
                { bg: "bg-sky-50 border-sky-300 text-sky-700", chip: "Học sinh & Thanh thiếu niên", icon: Gamepad2 },
                { bg: "bg-emerald-50 border-emerald-300 text-emerald-700", chip: "Gia đình an toàn", icon: Users },
                { bg: "bg-amber-50 border-amber-300 text-amber-700", chip: "Người cao tuổi", icon: HeartHandshake },
              ][idx] || { bg: "bg-blue-50 border-blue-300 text-blue-700", chip: target.highlight, icon: ShieldCheck };
              const SquadIcon = squadThemes.icon;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-sky-400 hover:shadow-lg space-y-4 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${squadThemes.bg} border-2 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                        <SquadIcon className="w-6 h-6" />
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
                    <span>Đối tượng: {squadThemes.chip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Tính Năng Hỗ Trợ Học Tập Cốt Lõi (Core Features) */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>4 Tính Năng Hỗ Trợ Học Tập Cốt Lõi</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Hệ thống tích hợp đầy đủ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              const cardIcons = [
                { color: "text-sky-600 bg-sky-50 border-sky-300", badge: "39 Ải Tình Huống", perk: "Học qua tương tác" },
                { color: "text-purple-600 bg-purple-50 border-purple-300", badge: "Trợ Lý Phân Tích AI", perk: "Phát hiện rủi ro" },
                { color: "text-emerald-600 bg-emerald-50 border-emerald-300", badge: "11 Cẩm Nang Phòng Vệ", perk: "Dữ liệu thực tế" },
                { color: "text-amber-600 bg-amber-50 border-amber-300", badge: "Đánh Giá Năng Lực", perk: "Chứng chỉ KHKT" },
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
