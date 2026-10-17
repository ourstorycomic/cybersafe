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
  Gamepad2,
  Bot,
  Zap,
} from "lucide-react";

/**
 * 1. ElderlyFooter: Dành cho Chế độ Người Cao Tuổi & Gia Đình
 * Thuần Theme Trắng (Pure White Theme) — Trang trọng, thanh lịch, độ tương phản cao, dễ đọc.
 * Đầy đủ 100% thông tin chuẩn: Slogan & Triết lý, Về dự án KHKT, Danh mục liên kết,
 * Đường dây nóng chính thống (113, 156), Tác giả đề tài, Email & Bản quyền.
 */
function ElderlyFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Slogan & Educational Philosophy Banner (Nền trắng / xám nhạt dịu mắt) */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Xây dựng phản xạ số — Giữ an toàn tài sản và gia đình trên không gian mạng
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                Quy trình ứng phó 4 bước an toàn:{" "}
                <strong className="text-blue-800">
                  1. Dừng lại ➔ 2. Kiểm tra ➔ 3. Xác minh ➔ 4. Mới hành động
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 shadow-2xs shrink-0">
            <Heart className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              Triết lý giáo dục: <strong className="text-slate-900">Đồng cảm & Không đổ lỗi nạn nhân</strong>
            </span>
          </div>
        </div>

        {/* 2. 4 Columns: Về Dự Án, Khám Phá Nền Tảng, Đường Dây Nóng Khẩn Cấp, Tác Giả & Liên Hệ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-200 text-sm">
          {/* Cột 1: Về Dự Án */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-800 text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900">CyberSafe Quest</span>
                <span className="text-[11px] text-slate-500 block -mt-0.5 font-medium">
                  Cổng Thông Tin & An Toàn Số
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Nền tảng giáo dục tương tác cộng đồng hỗ trợ người cao tuổi và gia đình rèn luyện kỹ năng nhận diện, phòng tránh các thủ đoạn lừa đảo công nghệ cao.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đề tài Nghiên cứu Khoa học Kỹ thuật (KHKT)</span>
            </div>
          </div>

          {/* Cột 2: Khám Phá Nền Tảng */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Khám Phá Nền Tảng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-slate-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-700" /> Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-slate-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-700" /> Phòng Luyện Tập (39 Tình Huống)
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-slate-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-700" /> Kiểm Tra Tin Nhắn Nghi Ngờ (Trợ Lý AI)
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-slate-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-700" /> Cẩm Nang Phòng Ngừa Lừa Đảo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-slate-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-700" /> Quản Trị & Số Liệu Nghiên Cứu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Đường Dây Nóng Khẩn Cấp (Cơ quan chức năng chính thống) */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Đường Dây Nóng 24/7
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700">Tổng đài 113</span>
                  <a href="tel:113" className="text-xs text-rose-700 hover:underline font-bold">
                    Gọi 113
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Cảnh sát phản ứng nhanh tiếp nhận tố giác tội phạm lừa đảo tài sản khẩn cấp.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-800">Tổng đài 156</span>
                  <a href="tel:156" className="text-xs text-blue-800 hover:underline font-bold">
                    Gọi 156
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Cục An toàn thông tin tiếp nhận phản ánh cuộc gọi và tin nhắn lừa đảo.
                </p>
              </div>
            </div>
          </div>

          {/* Cột 4: Tác Giả & Thông Tin Liên Hệ */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Tác Giả & Liên Hệ
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                Tác giả: <strong className="text-slate-900 font-semibold">Nhóm Nghiên Cứu Đề Tài CyberSafe Quest</strong>
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span className="text-slate-700">hotro@cybersafe-quest.edu.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-slate-700">Hotline: 113 / 156 (Miễn phí)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">Phục vụ cộng đồng công dân số Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Cam kết */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <div>
            © 2026 CyberSafe Quest. Dự án nghiên cứu khoa học kỹ thuật hỗ trợ an toàn số cộng đồng. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span>Phiên bản 2.0</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">100% Phi thương mại & Bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * 2. ChildFooter: Dành cho Học sinh & Trẻ em (Thuần Theme Trắng)
 */
function ChildFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 border border-sky-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                NỀN TẢNG AN TOÀN SỐ DÀNH CHO HỌC SINH
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Chung Tay Xây Dựng Không Gian Mạng An Toàn & Lành Mạnh
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Rèn luyện 39 tình huống thực tế để nhận diện nguy cơ và bảo vệ tài khoản cá nhân an toàn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/play"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-white" />
              <span>Vào Luyện Tập Ngay</span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Chủ Đề Rèn Luyện</h4>
            <ul className="space-y-2">
              <li><Link href="/play" className="hover:text-blue-700">Tình Huống Giả Mạo Cơ Quan</Link></li>
              <li><Link href="/play" className="hover:text-blue-700">Tình Huống Giả Mạo Ngân Hàng</Link></li>
              <li><Link href="/play" className="hover:text-blue-700">Tình Huống Mạng Xã Hội & Game</Link></li>
              <li><Link href="/play" className="hover:text-blue-700">Cảnh Giác Deepfake Video</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Công Cụ Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li><Link href="/chatbot" className="hover:text-blue-700">Trợ Lý AI CyberGuard</Link></li>
              <li><Link href="/guide" className="hover:text-blue-700">Cẩm Nang 4 Bước An Toàn</Link></li>
              <li><Link href="/play" className="hover:text-blue-700">Bảng Vàng Chiến Tích</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Hỗ Trợ Nhanh</h4>
            <ul className="space-y-2">
              <li>Hotline: 111 (Bảo vệ trẻ em)</li>
              <li>Hotline: 156 (Chống lừa đảo)</li>
              <li>Bảo mật thông tin 100%</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Tác Giả & Đề Tài</h4>
            <p className="text-slate-600 leading-relaxed font-normal">
              Đề tài Nghiên cứu Khoa Học Kỹ Thuật (KHKT) CyberSafe Quest.
              <br />
              Email: hotro@cybersafe-quest.edu.vn
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100 font-normal">
          <div>
            © 2026 CyberSafe Quest. Sáng kiến Giáo dục An toàn số vì cộng đồng. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span>Phiên bản 2.0</span>
            <span>•</span>
            <span className="text-blue-700 font-bold">100% Phi thương mại</span>
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
