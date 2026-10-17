"use client";

import { useDemographic } from "@/context/DemographicContext";
import { HeroSection } from "@/components/home/HeroSection";
import { DemoQuizSection } from "@/components/home/DemoQuizSection";
import { QuickMiniChallenge } from "@/components/home/QuickMiniChallenge";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SkillProgressDashboard } from "@/components/home/SkillProgressDashboard";
import { PlatformIntroSection } from "@/components/home/PlatformIntroSection";

/**
 * 1. ElderlyHomeView: Dành riêng cho Người Cao Tuổi & Gia Đình
 * ĐẦY ĐỦ 100% THÔNG TIN ĐỀ BÀI THEO CHUẨN GITHUB & WIREFRAME:
 * - 1. HeroSection: Slogan, 2 Nút hành động, Mô phỏng điện thoại bóc tách bẫy & Sơ đồ 4 bước an toàn số
 * - 2. DemoQuizSection: Bài tập thực hành mẫu theo đúng bản vẽ chuẩn (Demo quiz, Intro)
 * - 3. PlatformIntroSection: Giới thiệu mục tiêu đề tài, đối tượng phục vụ & 4 chức năng cốt lõi
 * - 4. QuickMiniChallenge: Thử thách phản xạ an toàn số 30 giây
 * - 5. CategoryGrid: 11 Nhóm chiêu thức lừa đảo phổ biến tại Việt Nam
 * - 6. SkillProgressDashboard: Bảng theo dõi và đánh giá 4 trụ cột năng lực số
 */
function ElderlyHomeView() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* 1. Header Hero: Slogan, CTAs, Mô phỏng tương tác & Quy trình 4 bước */}
      <HeroSection />

      {/* 2. Demo Quiz: Bài tập thực hành mẫu theo đúng bản vẽ chuẩn (Demo quiz, Intro) */}
      <div className="bg-white border-b border-slate-200">
        <DemoQuizSection />
      </div>

      {/* 3. Giới thiệu Mục tiêu, Đối tượng & 4 Chức năng nền tảng */}
      <PlatformIntroSection />

      {/* 4. Thử thách phản xạ nhanh 30 giây */}
      <QuickMiniChallenge />

      {/* 5. 11 Nhóm chiêu thức lừa đảo phổ biến tại Việt Nam */}
      <CategoryGrid />

      {/* 6. Bảng theo dõi năng lực số & tiêu chuẩn đạt chuẩn */}
      <SkillProgressDashboard />
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
