"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldAlert,
  CreditCard,
  Gift,
  Briefcase,
  HeartHandshake,
  Video,
  Smartphone,
  Plane,
  Package,
  UserCheck,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

export interface CategoryMeta {
  id: string;
  code: string;
  name: string;
  scenariosCount: number;
  vulnerableTarget: string;
  warningNote: string;
  imageUrl: string;
}

export const CATEGORIES_DATA: CategoryMeta[] = [
  {
    id: "fake_police_authority",
    code: "N01",
    name: "Giả mạo Công an / Viện kiểm sát / Tòa án",
    scenariosCount: 4,
    vulnerableTarget: "Người cao tuổi",
    warningNote: "Dọa bắt giam, dọa rửa tiền, ép chuyển tiền vào tài khoản tạm giữ",
    imageUrl: "/images/fake police.png",
  },
  {
    id: "bank_otp_fraud",
    code: "N02",
    name: "Giả mạo ngân hàng / Chiếm đoạt mã OTP",
    scenariosCount: 5,
    vulnerableTarget: "Mọi đối tượng",
    warningNote: "Tin nhắn SMS mạo danh, gửi link giả mạo đánh cắp mã OTP và mật khẩu",
    imageUrl: "/images/fake mobile banking.png",
  },
  {
    id: "lottery_reward_trap",
    code: "N03",
    name: "Lừa đảo trúng thưởng / Quà tri ân 0 đồng",
    scenariosCount: 3,
    vulnerableTarget: "Người lớn tuổi & Nội trợ",
    warningNote: "Thông báo trúng thưởng lớn, yêu cầu đóng thuế hoặc cọc trước",
    imageUrl: "/images/fake lottery prize trap.png",
  },
  {
    id: "easy_job_high_pay",
    code: "N04",
    name: "Việc nhẹ lương cao / Cộng tác viên Shopee, TikTok",
    scenariosCount: 4,
    vulnerableTarget: "Học sinh, sinh viên",
    warningNote: "Nhiệm vụ xem video giật đơn, nạp tiền nhỏ rút được tiền lớn bị khóa",
    imageUrl: "/images/fake job scam trap.png",
  },
  {
    id: "romance_investment_pig",
    code: "N05",
    name: "Bẫy tình cảm / Đầu tư sàn tài chính ảo",
    scenariosCount: 3,
    vulnerableTarget: "Thanh niên & Người độc thân",
    warningNote: "Làm quen thân mật, rủ rê nạp tiền sàn đầu tư ảo rồi chiếm đoạt",
    imageUrl: "/images/falling stock chart scam.png",
  },
  {
    id: "deepfake_video_call",
    code: "N06",
    name: "Deepfake khuôn mặt & Giọng nói người thân",
    scenariosCount: 4,
    vulnerableTarget: "Phụ huynh & Người già",
    warningNote: "Cuộc gọi video ngắn mờ ảo mượn tiền gấp vì tai nạn cấp cứu",
    imageUrl: "/images/imposter wearing face mask phone call.png",
  },
  {
    id: "malicious_app_link",
    code: "N07",
    name: "Mã độc dịch vụ công / Cài file .APK giả",
    scenariosCount: 4,
    vulnerableTarget: "Người dùng điện thoại Android",
    warningNote: "Link mạo danh VNeID/Thuế cài file .apk chiếm quyền điều khiển điện thoại",
    imageUrl: "/images/hacker.png",
  },
  {
    id: "travel_ticket_scam",
    code: "N08",
    name: "Vé máy bay giá rẻ / Combo du lịch ảo",
    scenariosCount: 3,
    vulnerableTarget: "Gia đình đi nghỉ hè",
    warningNote: "Fanpage giả mạo hãng lữ hành, nhận tiền cọc vé rồi chặn liên lạc",
    imageUrl: "/images/romance scam.png",
  },
  {
    id: "ecommerce_fake_shipper",
    code: "N09",
    name: "Giả danh shipper giao hàng / Đơn 0 đồng",
    scenariosCount: 3,
    vulnerableTarget: "Người hay mua online",
    warningNote: "Giao bưu kiện không đặt, hối thúc chuyển khoản tiền hàng gấp",
    imageUrl: "/images/qr scam.png",
  },
  {
    id: "social_account_takeover",
    code: "N10",
    name: "Hack tài khoản mạng xã hội / Mượn tiền khẩn cấp",
    scenariosCount: 3,
    vulnerableTarget: "Bạn bè & Người thân",
    warningNote: "Chiếm quyền Zalo/Facebook, nhắn tin hỏi vay tiền vì đang kẹt gấp",
    imageUrl: "/images/hacker stealing social media profile.png",
  },
  {
    id: "fake_scholarship_course",
    code: "N11",
    name: "Khóa học hè / Học bổng trại hè quốc tế giả",
    scenariosCount: 3,
    vulnerableTarget: "Phụ huynh có con nhỏ",
    warningNote: "Mạo danh ban tổ chức trại hè uy tín, yêu cầu đóng lệ phí khảo sát lớn",
    imageUrl: "/images/false rumor fake news.png",
  },
];

const CATEGORY_ICONS = [
  { icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
  { icon: CreditCard, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
  { icon: Gift, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { icon: HeartHandshake, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  { icon: Video, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" },
  { icon: Smartphone, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  { icon: Plane, color: "text-teal-600", bg: "bg-teal-50 border-teal-200" },
  { icon: Package, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { icon: GraduationCap, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
];

import { useDemographic } from "@/context/DemographicContext";

export function CategoryGrid() {
  const { isElderly } = useDemographic();

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isElderly ? "bg-blue-50 text-blue-900 border-blue-200" : "text-blue-700 bg-blue-50 border-blue-200"
          }`}>
            Kho Dữ Liệu Đời Thực Tại Việt Nam
          </span>
          <h2 className={
            isElderly
              ? "text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              : "text-3xl sm:text-4xl font-black text-slate-900 tracking-tight"
          }>
            {isElderly ? "11 Nhóm Chiêu Thức Lừa Đảo Thường Gặp & Cách Nhận Diện" : "11 Nhóm Chiêu Thức Thường Gặp"}
          </h2>
          <p className={
            isElderly
              ? "text-base sm:text-lg text-slate-600 font-medium leading-relaxed"
              : "text-base sm:text-lg text-slate-600 font-medium leading-relaxed"
          }>
            {isElderly
              ? "Được tổng hợp từ các vụ việc thực tế để Quý độc giả và gia đình dễ dàng đối chiếu, nhận diện và chủ động phòng ngừa:"
              : "Được tổng hợp từ các vụ việc thực tế tại Việt Nam, phân loại chi tiết giúp người học dễ dàng nhận diện và phòng ngừa."}
          </p>
        </div>

        {/* Grid Cards: Elderly mode has dignified advisory cards; Child mode has illustrated game cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => {
            const iconConfig = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
            const Icon = iconConfig.icon;

            if (isElderly) {
              return (
                <div
                  key={cat.id}
                  className="rounded-xl p-5 bg-white border border-slate-200 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  {/* Top Bar: Code & Severity */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-800" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        Chuyên mục {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                      Cảnh báo rủi ro
                    </span>
                  </div>

                  {/* Title & Warning Bullet Points */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {cat.name}
                    </h3>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-rose-700 shrink-0">Thủ đoạn:</span>
                        <span className="text-slate-700 leading-relaxed font-normal">{cat.warningNote}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-xs">
                        <span className="font-semibold text-slate-500">Đối tượng nhắm tới:</span>
                        <span className="font-medium text-slate-800">{cat.vulnerableTarget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Count & Action Button */}
                  <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 font-medium">
                      {cat.scenariosCount} tình huống mẫu
                    </span>

                    <Link
                      href={`/play/chuong-${idx + 1}`}
                      className="px-3.5 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                    >
                      <span>Xem hướng dẫn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                className="rounded-2xl p-5 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs"
              >
                {/* Card Top: Icon & Count */}
                <div className="flex items-center justify-between pb-1">
                  <div className={`w-9 h-9 rounded-xl ${iconConfig.bg} border flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconConfig.color}`} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {cat.scenariosCount} tình huống
                  </span>
                </div>

                {/* Full Uncropped Illustration Image Display for Child Mode */}
                <div className="w-full h-40 rounded-xl bg-slate-50 border border-slate-100 p-2.5 flex items-center justify-center group-hover:bg-blue-50/20 transition-all">
                  <img
                    src={encodeURI(cat.imageUrl)}
                    alt={cat.name}
                    className="w-full h-full object-contain drop-shadow-xs select-none"
                  />
                </div>

                {/* Title & Warning */}
                <div className="space-y-2.5 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {cat.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{cat.warningNote}</span>
                  </div>
                </div>

                {/* Bottom Target & Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-medium truncate max-w-[190px]">
                    Nhóm nguy cơ: <strong className="text-slate-800">{cat.vulnerableTarget}</strong>
                  </span>

                  <Link
                    href={`/play/chuong-${idx + 1}`}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all shrink-0 cursor-pointer"
                  >
                    <span>Xem bài tập</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
