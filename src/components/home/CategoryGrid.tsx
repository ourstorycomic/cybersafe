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
  Star,
  Sword,
  Sparkles,
  Zap,
} from "lucide-react";
import { playClickBeep } from "@/utils/gameAudio";

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
    <section
      id="so-tay-lua-dao"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
            isElderly ? "bg-slate-100 text-slate-800 border-slate-300" : "text-amber-900 bg-amber-100 border-amber-300"
          }`}>
            {isElderly ? "CẨM NANG NGHIỆP VỤ NHẬN DIỆN THỦ ĐOẠN" : "Bản Đồ 11 Nhóm Chiêu Thức Lừa Đảo Phổ Biến"}
          </span>
          <h2 className={
            isElderly
              ? "text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              : "text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
          }>
            {isElderly ? "6 Phương Thức Lừa Đảo Phổ Biến Nhằm Vào Người Cao Tuổi" : "11 Tình Huống Cảnh Giác Cần Nhận Biết"}
          </h2>
          <p className={
            isElderly
              ? "text-base text-slate-600 font-normal leading-relaxed"
              : "text-sm sm:text-base text-slate-600 font-semibold leading-relaxed"
          }>
            {isElderly
              ? "Tổng hợp các phương thức, thủ đoạn tội phạm công nghệ cao thường sử dụng đối với người lớn tuổi tại Việt Nam và khuyến cáo phòng ngừa:"
              : "Tổng hợp các chiêu trò lừa đảo mạo danh, bẫy liên kết độc hại và đánh cắp tài khoản để học sinh chủ động phòng ngừa:"}
          </p>
        </div>

        {/* Grid Cards: Elderly mode has clean, authoritative cards; Child mode has illustrated game cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.slice(0, isElderly ? 6 : CATEGORIES_DATA.length).map((cat, idx) => {
            const iconConfig = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
            const Icon = iconConfig.icon;

            if (isElderly) {
              const elderlySummaries: Record<number, { warning: string; action: string }> = {
                0: { warning: "Dọa bắt giam, dính líu vụ án rửa tiền xuyên quốc gia, ép chuyển tiền trong 30 phút.", action: "Ngắt máy ngay lập tức! Cơ quan Công an chỉ làm việc trực tiếp tại trụ sở, không yêu cầu chuyển tiền qua điện thoại." },
                1: { warning: "Mạo danh nhân viên y tế báo người thân tai nạn, yêu cầu chuyển tiền viện phí cấp cứu gấp.", action: "Bình tĩnh ngắt máy và liên hệ trực tiếp đến số điện thoại của người thân hoặc gia đình để kiểm chứng." },
                2: { warning: "Thông báo trúng thưởng quà tặng có giá trị cao, yêu cầu nộp lệ phí hoặc tiền thuế trước.", action: "Không tin các chương trình trúng thưởng qua mạng. Tuyệt đối không chuyển tiền đặt cọc nhận quà." },
                3: { warning: "Mạo danh cán bộ BHXH hoặc Công an yêu cầu cài đặt ứng dụng Dịch vụ công qua đường link lạ.", action: "Không bấm vào đường link lạ. Mọi thủ tục hành chính chỉ thực hiện tại cơ quan có thẩm quyền hoặc cổng gov.vn." },
                4: { warning: "Lôi kéo tham gia các sàn đầu tư tài chính ảo hoặc gửi tiết kiệm với lãi suất cao bất thường.", action: "Cảnh giác với bẫy tài chính đa cấp. Chỉ gửi tiền tiết kiệm tại các tổ chức tín dụng được cấp phép." },
                5: { warning: "Tin nhắn giả mạo ngân hàng thông báo khóa tài khoản, yêu cầu truy cập liên kết nhập mã OTP.", action: "Không truy cập liên kết trong tin nhắn. Ngân hàng không bao giờ yêu cầu khách hàng cung cấp mã OTP." },
              };
              const summary = elderlySummaries[idx] || {
                warning: cat.warningNote,
                action: "Chủ động ngắt kết nối và trao đổi với người thân trong gia đình trước khi thực hiện.",
              };

              return (
                <div
                  key={cat.id}
                  className="rounded-xl p-6 bg-white border border-slate-300 hover:border-blue-900 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-800">
                        <Icon className="w-5 h-5 text-slate-800" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Phương thức 0{idx + 1}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      Nguy cơ cao
                    </span>
                  </div>

                  {/* Title & Short Bullet Points */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {cat.name}
                    </h3>

                    <div className="space-y-2.5 text-sm bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <div>
                        <span className="font-bold text-rose-800 block text-xs uppercase tracking-wider">Đặc điểm nhận diện:</span>
                        <p className="text-slate-700 leading-relaxed font-normal mt-0.5">{summary.warning}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">Khuyến cáo phòng ngừa:</span>
                        <p className="text-slate-800 leading-relaxed font-medium mt-0.5">{summary.action}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Action Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 font-medium">
                      {cat.scenariosCount} tình huống phân tích
                    </span>

                    <Link
                      href={`/play/chuong-${idx + 1}`}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                className="rounded-3xl p-5 sm:p-6 bg-white border-2 border-slate-200 hover:border-sky-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                {/* Card Top: Boss Badge & XP reward */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
                      Ải #{cat.code}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: Math.min(3, Math.max(1, (idx % 3) + 1)) }).map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>+100 XP</span>
                  </span>
                </div>

                {/* Full Uncropped Illustration Image Display for Child Mode */}
                <div className="w-full h-40 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 flex items-center justify-center group-hover:scale-102 transition-transform">
                  <img
                    src={encodeURI(cat.imageUrl)}
                    alt={cat.name}
                    className="w-full h-full object-contain drop-shadow-xs select-none"
                  />
                </div>

                {/* Title & Warning */}
                <div className="space-y-2.5 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {cat.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Dấu hiệu: {cat.warningNote}</span>
                  </div>
                </div>

                {/* Bottom Target & 3D Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[140px]">
                    Bẫy nhắm vào: <strong className="text-slate-700">{cat.vulnerableTarget}</strong>
                  </span>

                  <Link
                    href={`/play/chuong-${idx + 1}`}
                    onClick={() => playClickBeep()}
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs sm:text-sm border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Sword className="w-4 h-4" />
                    <span>Vào Thử Thách</span>
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
