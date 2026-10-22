"use client";

import { useDemographic } from "@/context/DemographicContext";
import { HeroSection } from "@/components/home/HeroSection";
import { DemoQuizSection } from "@/components/home/DemoQuizSection";
import { QuickMiniChallenge } from "@/components/home/QuickMiniChallenge";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SkillProgressDashboard } from "@/components/home/SkillProgressDashboard";
import { PlatformIntroSection } from "@/components/home/PlatformIntroSection";

import Link from "next/link";
import { PhoneCall, ShieldCheck, Bot, HeartHandshake, ArrowRight } from "lucide-react";

/**
 * Khối Tiếp Nhận Thông Tin & Đường Dây Nóng Hỗ Trợ Khẩn Cấp
 */
function ElderlySupportHotlineBanner() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/80 border-b border-slate-300">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-900" />
            <span>KÊNH TIẾP NHẬN PHẢN ÁNH & HỖ TRỢ NGƯỜI DÂN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Đầu Mối Liên Hệ & Tiếp Nhận Thông Tin Tội Phạm
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Khi phát hiện các dấu hiệu đe dọa, nghi vấn lừa đảo hoặc đã phát sinh giao dịch tài chính bất thường, người dân cần chủ động liên hệ ngay các đầu mối sau:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hotline 113 */}
          <div className="p-6 rounded-xl bg-white border border-slate-300 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-200">
                  Trực ban 24/7
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Tổng Đài Cảnh Sát 113
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Tiếp nhận tin báo khẩn cấp khi người dân bị đe dọa bắt giữ, tống tiền, ép buộc chuyển nhượng tài sản hoặc đối tượng lạ tiếp cận nơi cư trú.
              </p>
            </div>
            <a
              href="tel:113"
              className="w-full py-2.5 px-4 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi 113 (Miễn phí cước)</span>
            </a>
          </div>

          {/* Hotline 156 */}
          <div className="p-6 rounded-xl bg-white border border-slate-300 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  Bộ TT&TT
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Tổng Đài Phản Ánh 156
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Tiếp nhận tra cứu và phản ánh các số điện thoại rác, cuộc gọi giả mạo danh xưng cơ quan nhà nước, ngân hàng và tổ chức tín dụng.
              </p>
            </div>
            <a
              href="tel:156"
              className="w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi 156 (Miễn phí cước)</span>
            </a>
          </div>

          {/* Chatbot Kiểm Tra Tin Nhắn */}
          <div className="p-6 rounded-xl bg-white border border-slate-300 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  Công cụ số
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Hệ Thống Phân Tích Tin Nhắn
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Hỗ trợ phân tích cấu trúc tin nhắn SMS, đường dẫn liên kết (link) hoặc số tài khoản ngân hàng để cảnh báo nguy cơ độc hại.
              </p>
            </div>
            <Link
              href="/chatbot"
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Kiểm tra dữ liệu nghi vấn</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Khuyến nghị nghiệp vụ */}
        <div className="p-4 rounded-lg bg-white border border-slate-300 text-sm text-slate-700 leading-relaxed font-normal">
          <strong>Khuyến cáo từ cơ quan chức năng:</strong> Mọi công dân khi phát hiện dấu hiệu lừa đảo, chiếm đoạt tài sản cần chủ động thông báo cho cơ quan Công an nơi gần nhất hoặc liên hệ Tổng đài 113 để được hướng dẫn giải quyết theo quy định của pháp luật.
        </div>
      </div>
    </section>
  );
}

/**
 * 1. ElderlyHomeView: Dành riêng cho Người Cao Tuổi & Gia Đình
 * Thiết kế tinh giản, ấm cúng, chữ to, không rườm rà, loại bỏ thuật ngữ kỹ thuật
 */
function ElderlyHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-slate-900">
      {/* 1. Header Hero: Slogan, Cỡ chữ, Hotline khẩn cấp, 3 Ô hành động, Mô phỏng cuộc gọi & 4 lời dặn vàng */}
      <HeroSection />

      {/* 2. Thử thách phản xạ nhanh 1 phút: Tình huống cấp cứu con cháu */}
      <QuickMiniChallenge />

      {/* 3. Sổ tay 6 chiêu thức kẻ xấu hay nhắm vào người cao tuổi */}
      <CategoryGrid />

      {/* 4. Sổ ghi nhớ 4 thói quen phòng thủ an tâm tuyệt đối */}
      <SkillProgressDashboard />

      {/* 5. Khối Đồng Hành & Đường Dây Nóng Hỗ Trợ Dành Riêng Cho Bác */}
      <ElderlySupportHotlineBanner />
    </div>
  );
}

/**
 * 2. ChildHomeView: Dành riêng cho Học sinh & Trẻ em (Thuần Theme Trắng)
 */
function ChildHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-sky-200 selection:text-blue-900">
      {/* 1. Hero Section Gamified */}
      <HeroSection />

      {/* 2. Interactive Demo Questions - Đặt ngay phía trên theo chuẩn wireframe (Demo quiz, Intro) */}
      <div className="bg-white text-slate-900">
        <DemoQuizSection />
      </div>

      {/* 3. Platform Intro: Goals, Target Audience, 4 Core Features */}
      <PlatformIntroSection />

      {/* 4. 11 Scam Categories Grid */}
      <div className="bg-white text-slate-900">
        <CategoryGrid />
      </div>

      {/* 5. Interactive Mini-challenge */}
      <div className="bg-white text-slate-900">
        <QuickMiniChallenge />
      </div>

      {/* 6. Skill Matrix & Competency Progress Dashboard */}
      <div className="bg-white text-slate-900">
        <SkillProgressDashboard />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { userRole } = useDemographic();

  if (userRole === "elderly") {
    return <ElderlyHomeView />;
  }

  return <ChildHomeView />;
}
