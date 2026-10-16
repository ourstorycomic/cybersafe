"use client";

import Link from "next/link";
import { useDemographic } from "@/context/DemographicContext";
import { HeroSection } from "@/components/home/HeroSection";
import { DemoQuizSection } from "@/components/home/DemoQuizSection";
import { QuickMiniChallenge } from "@/components/home/QuickMiniChallenge";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SkillProgressDashboard } from "@/components/home/SkillProgressDashboard";
import { PlatformIntroSection } from "@/components/home/PlatformIntroSection";
import { PhoneCall, ShieldAlert, ArrowRight, Search, HeartHandshake } from "lucide-react";

/**
 * 1. ElderlyHomeView: Dành riêng cho Người Cao Tuổi
 * ĐẦY ĐỦ 100% THÔNG TIN ĐỀ BÀI: Mục tiêu, Đối tượng, Chức năng, 11 Nhóm lừa đảo,
 * Câu hỏi Demo, Bảng theo dõi năng lực & Đường dây nóng khẩn cấp.
 * Trình bày với font cực to, rõ ràng, không gian thoáng đãng, dễ tiếp cận.
 */
function ElderlyHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50/20 text-slate-950">
      {/* 1. Hero khổng lồ: Slogan & 3 Quy tắc cốt lõi */}
      <HeroSection />

      {/* 2. Giới thiệu Mục tiêu, Đối tượng & 4 Chức năng nền tảng */}
      <PlatformIntroSection />

      {/* 3. 11 Nhóm chiêu thức lừa đảo phổ biến tại Việt Nam */}
      <CategoryGrid />

      {/* 4. Câu hỏi Demo nhận diện nhanh (Trải nghiệm thử không cần đăng nhập) */}
      <DemoQuizSection />

      {/* 5. Theo dõi năng lực, điểm số & các kỹ năng cần lưu ý */}
      <SkillProgressDashboard />

      {/* 6. Đường dây nóng & Lời dặn an toàn dành cho Bác */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t-4 border-amber-300">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-100 text-rose-900 font-black text-base sm:text-lg border-2 border-rose-300">
              <PhoneCall className="w-5 h-5 text-rose-600" />
              <span>ĐƯỜNG DÂY NÓNG CỨU HỘ KHẨN CẤP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              KHI NGHI NGỜ BỊ LỪA ĐẢO, BÁC HÃY GỌI NGAY:
            </h2>
            <p className="text-xl sm:text-2xl text-slate-900 font-bold leading-relaxed">
              Các số điện thoại miễn phí, hoạt động 24/7 của cơ quan chức năng:
            </p>
          </div>

          {/* Hotline Cards 1 cột to rõ */}
          <div className="space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50 border-4 border-rose-400 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-5 text-center sm:text-left">
                <span className="text-5xl">🚨</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-rose-900">
                    CÔNG AN TOÀN QUỐC
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                    Báo án khẩn cấp, tin báo tội phạm & tố giác lừa đảo chiếm đoạt tài sản
                  </p>
                </div>
              </div>
              <a
                href="tel:113"
                className="px-8 sm:px-10 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-2xl shadow-md border-b-4 border-rose-900 active:border-b-0 active:translate-y-1 transition-all whitespace-nowrap"
              >
                GỌI 113
              </a>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-blue-50 border-4 border-blue-400 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-5 text-center sm:text-left">
                <span className="text-5xl">📞</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-900">
                    TỔNG ĐÀI TIẾP NHẬN PHẢN ÁNH CUỘC GỌI RÁC & LỪA ĐẢO
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                    Bộ Thông tin & Truyền thông (Cục An toàn thông tin Quốc gia)
                  </p>
                </div>
              </div>
              <a
                href="tel:156"
                className="px-8 sm:px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl shadow-md border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all whitespace-nowrap"
              >
                GỌI 156
              </a>
            </div>
          </div>

          {/* Hai nút hành động to rõ ràng */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/play"
              className="p-6 sm:p-7 rounded-3xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xl sm:text-2xl text-center shadow-lg border-b-6 border-blue-950 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <span>VÀO PHÒNG TẬP LUYỆN</span>
              <ArrowRight className="w-6 h-6" />
            </Link>

            <Link
              href="/chatbot"
              className="p-6 sm:p-7 rounded-3xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xl sm:text-2xl text-center shadow-lg border-b-6 border-amber-900 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <Search className="w-6 h-6" />
              <span>KIỂM TRA TIN NHẮN LẠ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * 2. ChildHomeView: Dành riêng cho Học sinh & Trẻ em
 * ĐẦY ĐỦ 100% THÔNG TIN ĐỀ BÀI: Hero Gaming, Mục tiêu, 11 Nhóm lừa đảo, Demo questions,
 * Quick challenge 30s và Dashboard năng lực số.
 */
function ChildHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* 1. Hero Section Gamified */}
      <HeroSection />

      {/* 2. Platform Intro: Goals, Target Audience, 4 Core Features */}
      <PlatformIntroSection />

      {/* 3. 11 Scam Categories Grid */}
      <div className="bg-white text-slate-900">
        <CategoryGrid />
      </div>

      {/* 4. Interactive Demo Questions */}
      <div className="bg-slate-50 text-slate-900">
        <DemoQuizSection />
      </div>

      {/* 5. Interactive Mini-challenge */}
      <div className="bg-white text-slate-900">
        <QuickMiniChallenge />
      </div>

      {/* 6. Skill Matrix & Competency Progress Dashboard */}
      <div className="bg-slate-50 text-slate-900">
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
