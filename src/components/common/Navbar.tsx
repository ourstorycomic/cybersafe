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
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";

/**
 * 1. ElderlyNavbar: Dành riêng cho Người Cao Tuổi
 * Triết lý: Tối giản tuyệt đối, chỉ giữ Logo to, chế độ chữ to và Nút Đăng xuất / Đăng nhập to rõ ràng.
 * Ẩn sạch mọi menu con rườm rà, thuật ngữ công nghệ, không gian thoáng đãng.
 */
function ElderlyNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, openAuthModal, signOut } = useAuth();
  const { setUserRole } = useDemographic();

  const elderlyLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/play", label: "Luyện Tập" },
    { href: "/chatbot", label: "Kiểm Tra Tin Nhắn" },
    { href: "/guide", label: "Cẩm Nang" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16 sm:h-18">
          {/* Logo trang trọng cho người lớn tuổi */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1">
                CyberSafe <span className="text-blue-800">Quest</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium block -mt-1 hidden sm:block">
                Cổng Phòng Chống Lừa Đảo Số
              </span>
            </div>
          </Link>

          {/* Menu điều hướng rõ ràng cho người lớn tuổi */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {elderlyLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-blue-900 border border-blue-200 font-bold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Cụm chức năng: Đổi chế độ + Đăng nhập/Đăng xuất trang nhã */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Nút chuyển sang chế độ Trẻ em */}
            <button
              type="button"
              onClick={() => setUserRole("child")}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Chuyển sang giao diện Trẻ em / Học sinh"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden xl:inline">Chế độ: Học Sinh & Trẻ Em</span>
              <span className="xl:hidden">Trẻ Em</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden xl:inline text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
                  {profile?.display_name || user.email?.split("@")[0] || "Học Viên"}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs shadow-xs cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5 text-white" />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Đăng Nhập</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle cho Elderly */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setUserRole("child")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold"
              title="Chuyển sang Chế độ Trẻ Em"
            >
              <Gamepad2 className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Elderly */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg">
          {elderlyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200">
            {user ? (
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs transition-colors"
              >
                Đăng Xuất
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors"
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
 * 2. ChildNavbar: Dành riêng cho Học sinh & Trẻ em
 * Giao diện thoáng đãng, các mục điều hướng súc tích, co dãn mượt mà trên mọi độ phân giải.
 */
function ChildNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, openAuthModal, signOut } = useAuth();
  const { setUserRole } = useDemographic();

  const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Gamepad2 },
    { href: "/play", label: "Luyện Tập", icon: Sword },
    { href: "/chatbot", label: "Trợ Lý AI", icon: Bot },
    { href: "/guide", label: "Cẩm Nang", icon: Zap },
    ...(isAdmin ? [{ href: "/admin", label: "Quản Trị", isAdminOnly: true }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 text-slate-800 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16 sm:h-18">
          {/* Gaming Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1">
                CyberSafe <span className="text-blue-700">Quest</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 block -mt-1 tracking-wider uppercase">
                Hiệp Sĩ Số Nhí
              </span>
            </div>
          </Link>

          {/* Gamified Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-blue-800 shadow-2xs border border-blue-200"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-blue-600 shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Gamification Stats: XP, Streak, Avatar & Mode Switcher */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Gamified Stats Badges: Full badges on xl, compact on lg */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 whitespace-nowrap shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md border border-orange-200 shrink-0">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 shrink-0" />
                <span>3 Ngày</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span>250 XP</span>
              </div>
            </div>

            {/* Compact stats pill for medium/lg screens */}
            <div className="flex xl:hidden items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold shrink-0">
              <span className="flex items-center gap-0.5 text-orange-600" title="Chuỗi 3 ngày">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                3
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-0.5 text-amber-600" title="250 XP">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                250
              </span>
            </div>

            {/* Quick Switch to Elderly Mode (Responsive text) */}
            <button
              type="button"
              onClick={() => setUserRole("elderly")}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Chuyển sang giao diện Người Cao Tuổi"
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden xl:inline">Chế độ Cao Tuổi</span>
              <span className="xl:hidden">Cao Tuổi</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-1.5 xl:gap-2 bg-slate-100 py-1.5 px-2.5 xl:px-3 rounded-xl border border-slate-200 shrink-0">
                <span className="text-xs font-bold text-slate-800 max-w-[80px] xl:max-w-[120px] truncate">
                  {profile?.display_name || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-xs border-b-2 border-emerald-700 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>Vào Game</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setUserRole("elderly")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold"
              title="Chuyển sang Chế độ Cao Tuổi"
            >
              <Users className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            {user ? (
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors"
              >
                Đăng Xuất
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors"
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
