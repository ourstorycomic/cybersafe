"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Flame,
  Star,
  Zap,
  Sword,
  Bot,
  Gamepad2,
  HeartHandshake,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";

/**
 * 1. ElderlyNavbar: Dành riêng cho Người Cao Tuổi
 * Triết lý: Tối giản tuyệt đối, chỉ giữ Logo to, chế độ chữ to và Nút Đăng xuất / Đăng nhập to rõ ràng.
 * Ẩn sạch mọi menu con rườm rà, thuật ngữ công nghệ, không gian thoáng đãng.
 */
function ElderlyNavbar() {
  const { user, profile, openAuthModal, signOut } = useAuth();
  const { setUserRole } = useDemographic();

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-amber-300 bg-amber-50/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo khổng lồ cho người lớn tuổi */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <span className="font-black text-2xl sm:text-3xl text-slate-950 tracking-tight flex items-center gap-1.5">
                CyberSafe <span className="text-amber-800">Quest</span>
              </span>
              <span className="text-sm sm:text-base text-amber-950 font-black block -mt-1">
                Chế độ Dễ Dùng Cho Bác
              </span>
            </div>
          </Link>

          {/* Cụm chức năng tối giản: Đổi chế độ + Đăng xuất / Đăng nhập to rõ */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Nút chuyển sang chế độ Trẻ em nếu cần */}
            <button
              type="button"
              onClick={() => setUserRole("child")}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 text-xs sm:text-sm font-black shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
              title="Bấm vào đây để chuyển sang giao diện Trẻ em / Học sinh"
            >
              <span>🧒</span>
              <span className="hidden sm:inline">Chuyển sang</span> <span>Trẻ em</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden md:inline text-base font-black text-slate-950 bg-amber-100/90 px-3.5 py-2 rounded-xl border border-amber-300">
                  {profile?.display_name || user.email?.split("@")[0] || "Học Viên"}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base sm:text-lg shadow-md cursor-pointer transition-all flex items-center gap-2 border-b-4 border-rose-900 active:border-b-0 active:translate-y-1"
                >
                  <LogOut className="w-5 h-5 text-white" />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-lg sm:text-xl shadow-lg cursor-pointer transition-all flex items-center gap-2 border-b-4 border-blue-950 active:border-b-0 active:translate-y-1"
              >
                <LogIn className="w-6 h-6 text-white" />
                <span>Đăng Nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * 2. ChildNavbar: Dành riêng cho Học sinh & Trẻ em
 * Triết lý: Gaming Dashboard rực rỡ, hiển thị nổi bật 3D thanh XP, Chuỗi lửa Streak, Cấp bậc,
 * Nút hành động Duolingo 3D, thanh menu game sống động.
 */
function ChildNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, openAuthModal, signOut } = useAuth();
  const { setUserRole } = useDemographic();

  const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Gamepad2 },
    { href: "/play", label: "Phòng Huấn Luyện", icon: Sword },
    { href: "/chatbot", label: "Trợ Lý An Toàn", icon: Bot },
    { href: "/guide", label: "Bí Kíp Phá Án", icon: Zap },
    ...(isAdmin ? [{ href: "/admin", label: "Quản Trị", isAdminOnly: true }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-indigo-700 bg-slate-900/95 text-white backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Gaming Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-md border-2 border-sky-300 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1">
                CyberSafe <span className="text-amber-400">Quest</span>
              </span>
              <span className="text-[11px] font-black text-sky-300 block -mt-1 tracking-wider uppercase">
                🛡️ Hiệp Sĩ Số Nhí
              </span>
            </div>
          </Link>

          {/* Gamified Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-amber-300 shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Gamification Stats: XP, Streak, Avatar & Mode Switcher */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Gamified Stats Badges */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/15 whitespace-nowrap shrink-0">
              <div className="flex items-center gap-1 text-xs font-black text-orange-400 bg-orange-950/50 px-2 py-0.5 rounded-md border border-orange-500/30 shrink-0">
                <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400 shrink-0" />
                <span>3 Ngày</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-yellow-300 bg-yellow-950/50 px-2 py-0.5 rounded-md border border-yellow-500/30 shrink-0">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                <span>250 XP</span>
              </div>
            </div>

            {/* Quick Switch to Elderly Mode (Non-wrapping pill) */}
            <button
              type="button"
              onClick={() => setUserRole("elderly")}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Chuyển sang giao diện Người Cao Tuổi"
            >
              <span>👴</span>
              <span className="whitespace-nowrap">Chế độ Cao Tuổi</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/10 py-1.5 px-3 rounded-xl border border-white/20 shrink-0">
                <span className="text-xs font-black text-amber-300 max-w-[100px] truncate">
                  {profile?.display_name || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-md border-b-2 border-emerald-700 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>Vào Game</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setUserRole("elderly")}
              className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black"
            >
              👴
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white border border-white/20"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-slate-900 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-black text-slate-200 hover:text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            {user ? (
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-black text-xs"
              >
                Đăng Xuất
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs"
              >
                Đăng Nhập
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Main Navbar Component
 * Quyết định render ElderlyNavbar hay ChildNavbar dựa trên userRole từ Context
 */
export function Navbar() {
  const { userRole } = useDemographic();

  if (userRole === "elderly") {
    return <ElderlyNavbar />;
  }

  return <ChildNavbar />;
}
