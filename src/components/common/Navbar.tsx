"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, openAuthModal, signOut } = useAuth();
  const { userRole, setUserRole, isElderly } = useDemographic();

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/play", label: "Sản phẩm" },
    { href: "/about", label: "Về chúng tôi" },
    { href: "/guide", label: "Cẩm Nang An Toàn" },
    ...(isAdmin ? [{ href: "/admin", label: "Quản Trị KHKT", isAdminOnly: true }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform ${isElderly ? "bg-amber-600" : "bg-blue-600"}`}>
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1">
                CyberSafe <span className={isElderly ? "text-amber-700" : "text-blue-600"}>Quest</span>
              </span>
              <span className="hidden sm:block text-[11px] text-slate-500 font-medium -mt-0.5">
                {isElderly ? "Chế độ giao diện Người Cao Tuổi" : "Chế độ Trẻ Em & Học Sinh"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              const isAdminLink = (link as any).isAdminOnly;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isAdminLink
                      ? isActive
                        ? "text-indigo-700 bg-indigo-50 font-bold border border-indigo-200 shadow-xs"
                        : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/60 font-semibold border border-indigo-100"
                      : isActive
                      ? isElderly
                        ? "text-amber-950 bg-amber-100 border border-amber-300 font-black shadow-xs"
                        : "text-blue-700 bg-blue-50 border border-blue-200 font-bold shadow-xs"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Demographic Switcher (Trẻ Em vs Người Cao Tuổi) + Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Demographic Mode Switcher */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setUserRole("child")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  userRole === "child"
                    ? "bg-sky-500 text-white shadow-xs scale-102 border-b-2 border-sky-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Chuyển sang giao diện Trẻ Em & Học Sinh: Sinh động, phong cách trò chơi, mascot chỉ dẫn"
              >
                <span>🧒</span>
                <span>Trẻ em</span>
              </button>
              <button
                type="button"
                onClick={() => setUserRole("elderly")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  userRole === "elderly"
                    ? "bg-amber-600 text-white shadow-xs scale-102 border-b-2 border-amber-800 font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Chuyển sang giao diện Người Cao Tuổi: Chữ to rõ, nút bấm khổng lồ, giảm thiểu rối mắt"
              >
                <span>👴</span>
                <span>Người cao tuổi</span>
              </button>
            </div>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2.5 bg-slate-50 py-1 px-2.5 rounded-xl border border-slate-200">
                <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs ${isAdmin ? "bg-indigo-600" : isElderly ? "bg-amber-600" : "bg-blue-600"}`}>
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 max-w-[120px] truncate leading-tight">
                    {profile?.display_name || user.email?.split("@")[0]}
                  </div>
                  <div className={`text-[10px] font-medium ${isAdmin ? "text-indigo-600 font-bold" : "text-emerald-600"}`}>
                    {isAdmin ? "Quản Trị Viên" : isElderly ? "Chế độ Cao Tuổi" : "Chế độ Trẻ Em"}
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className={`px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${isElderly ? "bg-amber-700 hover:bg-amber-800" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                <LogIn className="w-3.5 h-3.5 text-white/90" />
                <span>Đăng Nhập</span>
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Đăng Nhập
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer"
              aria-label="Mở Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
