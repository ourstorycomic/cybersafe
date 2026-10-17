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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Header Hero: Slogan & 3 Quy tắc an toàn cốt lõi */}
      <HeroSection />

      {/* 2. Demo Quiz: Bài tập thực hành mẫu theo đúng bản vẽ chuẩn (Demo quiz, Intro) */}
      <DemoQuizSection />

      {/* 3. Giới thiệu Mục tiêu, Đối tượng & 4 Chức năng nền tảng */}
      <PlatformIntroSection />

      {/* 4. 11 Nhóm chiêu thức lừa đảo phổ biến tại Việt Nam */}
      <CategoryGrid />

      {/* 5. Theo dõi năng lực, điểm số & các kỹ năng cần lưu ý */}
      <SkillProgressDashboard />

      {/* 6. Đường dây nóng & Kênh cứu hộ khẩn cấp */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-xs sm:text-sm border border-rose-200">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>ĐƯỜNG DÂY NÓNG HỖ TRỢ KHẨN CẤP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Khi nghi ngờ bị lừa đảo, hãy liên hệ ngay:
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Các số điện thoại miễn phí cước gọi, hoạt động 24/7 của các cơ quan chức năng:
            </p>
          </div>

          {/* Hotline Cards */}
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Tổng đài Cảnh sát phản ứng nhanh 113
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                    Tiếp nhận tin báo tội phạm, tố giác hành vi lừa đảo chiếm đoạt tài sản khẩn cấp.
                  </p>
                </div>
              </div>
              <a
                href="tel:113"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base shadow-sm border border-rose-900 active:scale-98 transition-all text-center shrink-0"
              >
                Gọi 113
              </a>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Tổng đài Tiếp nhận phản ánh cuộc gọi & tin nhắn rác 156
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                    Bộ Thông tin & Truyền thông (Cục An toàn thông tin Quốc gia)
                  </p>
                </div>
              </div>
              <a
                href="tel:156"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-sm border border-blue-900 active:scale-98 transition-all text-center shrink-0"
              >
                Gọi 156
              </a>
            </div>
          </div>

          {/* Hai nút hành động chuẩn giao diện */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/play"
              className="p-4 sm:p-5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base sm:text-lg text-center shadow-sm border border-blue-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Vào Phòng Luyện Tập</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/chatbot"
              className="p-4 sm:p-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-base sm:text-lg text-center border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-700" />
              <span>Kiểm Tra Tin Nhắn Nghi Ngờ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * 2. ChildHomeView: Dành riêng cho Học sinh & Trẻ em
 * ĐẦY ĐỦ 100% THÔNG TIN ĐỀ BÀI: Hero Gaming, Demo questions, Mục tiêu, 11 Nhóm lừa đảo,
 * Quick challenge 30s và Dashboard năng lực số.
 */
function ChildHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
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
