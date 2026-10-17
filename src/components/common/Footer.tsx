"use client";

import Link from "next/link";
import { useDemographic } from "@/context/DemographicContext";
import {
  Shield,
  PhoneCall,
  Heart,
  ShieldCheck,
  Mail,
  MapPin,
  ArrowRight,
  Lock,
  Gamepad2,
  Bot,
  BookOpen,
} from "lucide-react";

/**
 * 1. ElderlyFooter: Dành cho Chế độ Người Cao Tuổi & Gia Đình
 * Chuẩn mực, trang trọng, đầy đủ 100% thông tin theo yêu cầu thiết kế:
 * Slogan & Triết lý cốt lõi, Giới thiệu dự án KHKT, Danh mục liên kết tra cứu,
 * Đường dây nóng cơ quan chức năng (113, 156), Tác giả đề tài & Thông tin liên hệ, Bản quyền.
 */
function ElderlyFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Slogan & Educational Philosophy Banner */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400 text-blue-300 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Xây dựng phản xạ số — Giữ an toàn tài sản và gia đình trên không gian mạng
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                Quy trình ứng phó 4 bước an toàn:{" "}
                <strong className="text-sky-300">
                  1. Dừng lại ➔ 2. Kiểm tra ➔ 3. Xác minh ➔ 4. Mới hành động
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-slate-200 shrink-0">
            <Heart className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              Triết lý giáo dục: <strong className="text-white">Đồng cảm & Không đổ lỗi nạn nhân</strong>
            </span>
          </div>
        </div>

        {/* 2. 4 Columns: Về Dự Án, Khám Phá Nền Tảng, Đường Dây Nóng Khẩn Cấp, Tác Giả & Liên Hệ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-sm">
          {/* Cột 1: Về Dự Án */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">CyberSafe Quest</span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">
                  Cổng Thông Tin & An Toàn Số
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Nền tảng giáo dục tương tác cộng đồng hỗ trợ người cao tuổi và gia đình rèn luyện kỹ năng nhận diện, phòng tránh các thủ đoạn lừa đảo công nghệ cao.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Đề tài Nghiên cứu Khoa học Kỹ thuật (KHKT)</span>
            </div>
          </div>

          {/* Cột 2: Khám Phá Nền Tảng */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Khám Phá Nền Tảng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Phòng Luyện Tập (39 Tình Huống)
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Kiểm Tra Tin Nhắn Nghi Ngờ (Trợ Lý AI)
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Cẩm Nang Phòng Ngừa Lừa Đảo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Quản Trị & Số Liệu Nghiên Cứu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Đường Dây Nóng Khẩn Cấp */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Đường Dây Nóng Hỗ Trợ 24/7
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">Tổng đài 113</span>
                  <a href="tel:113" className="text-xs text-rose-300 hover:underline font-semibold">
                    Gọi ngay
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cảnh sát phản ứng nhanh tiếp nhận tố giác tội phạm lừa đảo tài sản khẩn cấp.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400">Tổng đài 156</span>
                  <a href="tel:156" className="text-xs text-sky-300 hover:underline font-semibold">
                    Gọi ngay
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cục An toàn thông tin tiếp nhận phản ánh cuộc gọi và tin nhắn lừa đảo.
                </p>
              </div>
            </div>
          </div>

          {/* Cột 4: Tác Giả & Thông Tin Liên Hệ */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Tác Giả & Liên Hệ
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                Tác giả: <strong className="text-white">Nhóm Nghiên Cứu Đề Tài CyberSafe Quest</strong>
              </p>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>hotro@cybersafe-quest.edu.vn</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline: 113 / 156 (Miễn phí)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Phục vụ cộng đồng công dân số Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Cam kết */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <div>
            © 2026 CyberSafe Quest. Dự án nghiên cứu khoa học kỹ thuật hỗ trợ an toàn số cộng đồng. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Phiên bản 2.0</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Phi thương mại & Bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * 2. ChildFooter: Dành cho Học sinh & Trẻ em
 */
function ChildFooter() {
  return (
    <footer className="border-t-4 border-indigo-800 bg-slate-950 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Mascot Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-sky-900 to-blue-900 border-2 border-sky-400 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/30 border-2 border-sky-300 flex items-center justify-center text-3xl shadow-md shrink-0">
              🛡️
            </div>
            <div>
              <div className="text-xs font-black uppercase text-amber-300 tracking-wider">
                BẢN QUYỀN HIỆP SĨ SỐ NHÍ
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Cùng Phá Án & Giữ Không Gian Mạng Xanh Sạch!
              </h3>
              <p className="text-xs text-sky-200 font-semibold mt-1">
                Hoàn thành 39 ải thử thách để tích lũy XP và leo Top 1 Thám Tử Toàn Quốc.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/play"
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm shadow-md border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-amber-300" />
              <span>Vào Vượt Ải Ngay</span>
            </Link>
          </div>
        </div>

        {/* Quest Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-bold text-slate-300 pt-4 border-t border-white/10">
          <div>
            <h4 className="text-sm font-black text-amber-400 uppercase mb-3">Vùng Đất Ải</h4>
            <ul className="space-y-2">
              <li><Link href="/play" className="hover:text-sky-400">Ải Giả Mạo Công Quyền</Link></li>
              <li><Link href="/play" className="hover:text-sky-400">Ải Giả Mạo Ngân Hàng</Link></li>
              <li><Link href="/play" className="hover:text-sky-400">Ải Bẫy Game & Nạp VIP</Link></li>
              <li><Link href="/play" className="hover:text-sky-400">Ải Deepfake Video Call</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black text-sky-400 uppercase mb-3">Vũ Khí Hiệp Sĩ</h4>
            <ul className="space-y-2">
              <li><Link href="/chatbot" className="hover:text-sky-400">Trợ Lý AI CyberGuard</Link></li>
              <li><Link href="/guide" className="hover:text-sky-400">Cẩm Nang 4 Bước An Toàn</Link></li>
              <li><Link href="/play" className="hover:text-sky-400">Bảng Xếp Hạng Top 10</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black text-emerald-400 uppercase mb-3">Hỗ Trợ Nhanh</h4>
            <ul className="space-y-2">
              <li className="text-white">Hotline: 111 (Bảo vệ trẻ em)</li>
              <li className="text-white">Hotline: 156 (Chống lừa đảo)</li>
              <li className="text-white">Bảo mật thông tin 100%</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black text-purple-400 uppercase mb-3">Tác Giả & Đề Tài</h4>
            <p className="text-slate-400 leading-relaxed font-normal">
              Đề tài Nghiên cứu Khoa Học Kỹ Thuật (KHKT) CyberSafe Quest.
              <br />
              Email: hotro@cybersafe-quest.edu.vn
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-white/10 font-normal">
          <div>
            © 2026 CyberSafe Quest. Sáng kiến Giáo dục An toàn số vì cộng đồng. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Phiên bản 2.0</span>
            <span>•</span>
            <span className="text-sky-400 font-bold">100% Phi thương mại</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main Footer Component
 */
export function Footer() {
  const { userRole } = useDemographic();

  if (userRole === "elderly") {
    return <ElderlyFooter />;
  }

  return <ChildFooter />;
}
