"use client";

import Link from "next/link";
import { useDemographic } from "@/context/DemographicContext";
import { Users, Award, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sword, Sparkles } from "lucide-react";
import { playClickBeep } from "@/utils/gameAudio";

export function SkillProgressDashboard() {
  const { isElderly } = useDemographic();
  const competencies = [
    {
      name: "1. Năng lực Nhận diện",
      desc: "Phát hiện link lạ (.cc, .top), tệp cài đặt đuôi .apk, tin nhắn mạo danh công an đòi chuyển tiền.",
      score: 85,
      level: "Tốt",
      barColor: "bg-sky-500",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
    },
    {
      name: "2. Năng lực Kiểm chứng",
      desc: "Biết tra cứu cổng dịch vụ công (.gov.vn), số hotline ngân hàng in trên thẻ ATM, gọi điện xác minh.",
      score: 92,
      level: "Xuất sắc",
      barColor: "bg-emerald-500",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
    },
    {
      name: "3. Năng lực Bảo vệ Tài khoản",
      desc: "Tuyệt đối không gửi mã OTP cho bất kỳ ai, không cài app ngoài cửa hàng CH Play / App Store.",
      score: 78,
      level: "Khá",
      barColor: "bg-amber-500",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
    },
    {
      name: "4. Năng lực Ứng phó Sự cố",
      desc: "Biết bật chế độ máy bay khi lỡ bấm link, khóa thẻ ngân hàng trên ứng dụng, báo Công an 113.",
      score: 80,
      level: "Tốt",
      barColor: "bg-indigo-500",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
    },
  ];

  const badges = [
    { name: "Kỹ năng Soi Link", desc: "Phát hiện thành công 10 link mạo danh đuôi .cc, .top" },
    { name: "Bảo Vệ Mã OTP", desc: "Không bao giờ để lộ mã OTP trong mọi tình huống" },
    { name: "Nhận Diện Deepfake", desc: "Phát hiện cuộc gọi video giả mạo của đối tượng" },
    { name: "Xử Lý Quyết Đoán", desc: "Cúp máy dứt khoát trước đe dọa của đối tượng mạo danh" },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className={`max-w-6xl mx-auto space-y-8 ${
        isElderly
          ? "p-6 sm:p-8 rounded-xl bg-white border border-slate-300 shadow-xs"
          : "p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm"
      }`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1.5">
            <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-md border ${
              isElderly ? "bg-slate-100 text-slate-800 border-slate-300" : "bg-amber-100 text-amber-900 border-amber-300"
            }`}>
              {isElderly ? "ĐÁNH GIÁ NĂNG LỰC PHÒNG VỆ SỐ" : "🏅 BẢNG CHIẾN TÍCH HIỆP SĨ SỐ • 4 SIÊU NĂNG LỰC"}
            </span>
            <h2 className={
              isElderly
                ? "text-2xl sm:text-3xl font-extrabold text-slate-900"
                : "text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight"
            }>
              {isElderly ? "Khung Tiêu Chuẩn An Toàn Thông Tin Dành Cho Người Cao Tuổi" : "Bảng Vàng Năng Lực & Thăng Cấp Hiệp Sĩ"}
            </h2>
          </div>

          <div className={`p-4 rounded-xl border text-left md:text-right ${
            isElderly ? "bg-slate-50 border-slate-200" : "bg-blue-50 border-2 border-blue-200 shadow-2xs"
          }`}>
            <div className="font-semibold text-xs text-slate-600">
              {isElderly ? "Mức độ an toàn thông tin cá nhân" : "Chỉ Số Năng Lực Tổng Hợp"}
            </div>
            <div className="font-extrabold text-xl sm:text-2xl text-slate-900 flex items-center gap-2 justify-start md:justify-end mt-0.5">
              <span>85%</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                Đạt Tiêu Chuẩn
              </span>
            </div>
          </div>
        </div>

        {/* 4 Competency Bars */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isElderly ? "4 Trụ Cột Kỹ Năng Phòng Thủ Quan Trọng:" : "Đánh giá 4 trụ cột năng lực cốt lõi:"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {competencies.map((comp, idx) => {
              // Văn phong mộc mạc cho người lớn tuổi
              const elderlyCompTitles: Record<number, { name: string; desc: string }> = {
                0: { name: "1. Nhận Biết Cuộc Gọi Giả Danh Công An", desc: "Cúp máy dứt khoát, không để kẻ gian dọa nạt, ép chuyển tiền." },
                1: { name: "2. Cảnh Giác Với Tin Nhắn Trúng Thưởng & Link Lạ", desc: "Không bấm vào đường link nhận quà hay thông báo khóa tài khoản." },
                2: { name: "3. Giữ Kín Mã OTP & Mật Khẩu Ngân Hàng", desc: "Tuyệt đối không đọc mã gửi về máy cho bất kỳ người lạ nào." },
                3: { name: "4. Thói Quen Hỏi Con Cháu Khi Nghi Ngờ", desc: "Luôn bình tĩnh trao đổi với con cháu hoặc công an trước khi làm theo." },
              };

              const compName = isElderly ? (elderlyCompTitles[idx]?.name || comp.name) : comp.name;
              const compDesc = isElderly ? (elderlyCompTitles[idx]?.desc || comp.desc) : comp.desc;

              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between gap-3 transition-all hover:border-blue-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900">
                        {compName}
                      </h3>
                      <span className="font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md border bg-slate-50 text-slate-800 border-slate-200">
                        {comp.score}% • {isElderly ? "Đạt Tốt" : comp.level}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {compDesc}
                    </p>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full overflow-hidden h-2.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${comp.barColor}`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Indicators */}
        <div className="space-y-4 pt-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isElderly ? "4 Cam Kết An Toàn Bác Đã Nắm Rõ:" : "Huy hiệu kỹ năng đã kiểm chứng đạt chuẩn:"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((b, idx) => {
              if (isElderly) {
                const elderlyIcons = [
                  { icon: ShieldCheck, color: "text-blue-700", bg: "bg-blue-50", title: "Bảo Vệ Tiền Tiết Kiệm", sub: "Không chuyển tiền theo lệnh gọi điện thoại." },
                  { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-50", title: "Cúp Máy Dứt Khoát", sub: "Không hoảng sợ trước lời dọa bắt giam." },
                  { icon: AlertTriangle, color: "text-amber-700", bg: "bg-amber-50", title: "Giữ Kín Mã OTP", sub: "Bảo vệ tài khoản ngân hàng an toàn tuyệt đối." },
                  { icon: Users, color: "text-indigo-700", bg: "bg-indigo-50", title: "Có Con Cháu Đồng Hành", sub: "Luôn hỏi ý kiến người thân trước khi giao dịch." },
                ];
                const cur = elderlyIcons[idx % elderlyIcons.length];
                const IconComp = cur.icon;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-1">
                      <div className={`w-8 h-8 rounded-lg ${cur.bg} ${cur.color} flex items-center justify-center shrink-0`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Đạt chuẩn
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-snug">{cur.title}</div>
                      <div className="text-xs text-slate-600 leading-relaxed mt-1 font-normal">{cur.sub}</div>
                    </div>
                  </div>
                );
              }

              const badgeImages = [
                { img: "/images/qr scam.png" },
                { img: "/images/stealing OTP.png" },
                { img: "/images/imposter wearing face mask phone call.png" },
                { img: "/images/cybersecurity.png" },
              ];
              const curImg = badgeImages[idx];

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 space-y-3 shadow-xs hover-tilt transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Đạt chuẩn
                    </span>
                    <span className="text-xs font-mono text-slate-400">#TC0{idx + 1}</span>
                  </div>

                  <div className="w-16 h-16 mx-auto my-1 flex items-center justify-center">
                    <img
                      src={curImg.img}
                      alt={b.name}
                      className="w-full h-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <div className="font-bold text-sm text-slate-900 leading-snug">{b.name}</div>
                    <div className="text-xs text-slate-600 leading-relaxed mt-0.5">{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quy trình ứng phó cốt lõi (SmartArt Flowchart) */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <span className="text-xs uppercase font-black text-blue-700 tracking-wider">
              QUY TRÌNH ỨNG PHÓ CỐT LÕI
            </span>
            <span className="text-xs text-slate-500 font-semibold italic">
              Triết lý giáo dục: Đồng cảm & Không đổ lỗi nạn nhân. Hướng dẫn kỹ năng thực tế bảo vệ gia đình trên không gian số.
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-white border-2 border-rose-200 shadow-xs">
              <span className="font-black text-rose-700 text-sm sm:text-base block">1. DỪNG LẠI</span>
              <span className="text-[11px] text-slate-500 font-medium">Bình tĩnh 30 giây</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border-2 border-amber-200 shadow-xs">
              <span className="font-black text-amber-700 text-sm sm:text-base block">2. KIỂM TRA</span>
              <span className="text-[11px] text-slate-500 font-medium">Soi kỹ thông tin lạ</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border-2 border-sky-200 shadow-xs">
              <span className="font-black text-sky-700 text-sm sm:text-base block">3. XÁC MINH</span>
              <span className="text-[11px] text-slate-500 font-medium">Gọi người thân / Tổng đài</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs">
              <span className="font-black text-emerald-700 text-sm sm:text-base block">4. HÀNH ĐỘNG</span>
              <span className="text-[11px] text-slate-500 font-medium">Xử lý an toàn dứt khoát</span>
            </div>
          </div>
        </div>

        {/* Note & Child CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200">
          <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
            <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ý nghĩa rèn luyện: </strong>
              {isElderly
                ? "Bảng theo dõi giúp người học và gia đình xác định nhóm kỹ năng cần cải thiện để tập trung luyện tập, từ đó hình thành phản xạ tự vệ số bền vững."
                : "Hoàn thành các ải thử thách để tích lũy XP, tăng chỉ số phòng thủ và thăng hạng Hiệp Sĩ Số Xuất Sắc!"}
            </div>
          </div>

          {!isElderly && (
            <Link
              href="/play"
              onClick={() => playClickBeep()}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs sm:text-sm border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Sword className="w-4 h-4 text-amber-200" />
              <span>Vào Đấu Trường Luyện Tập (+250 XP)</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
