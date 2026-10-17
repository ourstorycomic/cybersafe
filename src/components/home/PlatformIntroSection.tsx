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

  // Child / Standard View (Pure White Theme)
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4 text-blue-700" />
            <span>Mục Tiêu & Sứ Mệnh Nền Tảng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Nền Tảng Trò Chơi Hỗ Trợ Cộng Đồng
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Phát hiện và phòng ngừa các hình thức lừa đảo trực tuyến tại Việt Nam — Xây dựng năng lực số thông qua trải nghiệm tình huống thực tế và trợ lý AI Scaffolding.
          </p>
        </div>

        {/* 3 Đối tượng phục vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targetAudiences.map((target, idx) => {
            const TargetIcon = target.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md space-y-4 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 group-hover:scale-105 transition-transform text-blue-700">
                    <TargetIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {target.highlight}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {target.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-2">
                    {target.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Chức năng cốt lõi */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>4 Chức Năng Nền Tảng Toàn Diện</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
