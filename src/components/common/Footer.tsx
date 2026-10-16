"use client";

import Link from "next/link";
import { useDemographic } from "@/context/DemographicContext";
import {
  Shield,
  PhoneCall,
  Heart,
  ShieldCheck,
  Sword,
  Sparkles,
  Gamepad2,
  Bot,
  Star,
} from "lucide-react";

/**
 * 1. ElderlyFooter: Dành riêng cho Người Cao Tuổi
 * Triết lý: 1 Cột duy nhất, tối giản 100%, không menu link phức tạp.
 * Hiển thị số điện thoại đường dây nóng khẩn cấp siêu to, lời dặn dò an toàn.
 */
function ElderlyFooter() {
  return (
    <footer className="border-t-4 border-amber-300 bg-amber-50/70 text-slate-950 py-12 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        {/* Hotline khẩn cấp khổng lồ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-rose-500 shadow-md space-y-3">
          <span className="text-sm sm:text-base font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full inline-block">
            🚨 ĐƯỜNG DÂY NÓNG HỖ TRỢ KHẨN CẤP KHI NGHI BỊ LỪA ĐẢO
          </span>

          <h3 className="text-2xl sm:text-4xl font-black text-slate-950">
            Bác hãy gọi ngay cho cơ quan chức năng:
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2">
            <a
              href="tel:113"
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xl sm:text-2xl flex items-center gap-3 shadow-md border-b-4 border-rose-900"
            >
              <PhoneCall className="w-6 h-6" />
              <span>113 (Công An)</span>
            </a>

            <a
              href="tel:156"
              className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xl sm:text-2xl flex items-center gap-3 shadow-md border-b-4 border-blue-950"
            >
              <PhoneCall className="w-6 h-6" />
              <span>156 (Chống Lừa Đảo Viễn Thông)</span>
            </a>
          </div>
        </div>

        {/* Lời dặn dò an toàn cho người lớn tuổi */}
        <div className="space-y-2 text-slate-900 font-bold text-lg sm:text-xl leading-relaxed">
          <p>
            🛡️ <strong>Ghi nhớ an toàn:</strong> Không chuyển tiền qua điện thoại • Không bấm vào link lạ • Luôn hỏi ý kiến con cháu.
          </p>
          <p className="text-base text-slate-700">
            Nền tảng CyberSafe Quest — Phục vụ cộng đồng người cao tuổi Việt Nam an toàn trên không gian số.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * 2. ChildFooter: Dành riêng cho Học sinh & Trẻ em
 * Triết lý: Gamification, Mascot, Sci-fi pastel styling, danh hiệu thám tử.
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
              <Sword className="w-4 h-4 text-amber-300" />
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
            <h4 className="text-sm font-black text-purple-400 uppercase mb-3">Hệ Thống</h4>
            <p className="text-slate-400 leading-relaxed font-normal">
              Dự án Khoa Học Kỹ Thuật (KHKT) rèn luyện năng lực phản xạ an toàn số cho học sinh Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main Footer Component
 * Render ElderlyFooter hoặc ChildFooter dựa trên userRole từ Context
 */
export function Footer() {
  const { userRole } = useDemographic();

  if (userRole === "elderly") {
    return <ElderlyFooter />;
  }

  return <ChildFooter />;
}
