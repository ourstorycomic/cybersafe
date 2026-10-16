import { UserRole } from "@/context/DemographicContext";

/**
 * Tiện ích tạo class Tailwind động và định hình nội dung theo 2 luồng:
 * - 'elderly' (Người cao tuổi): Phóng to font, tương phản cao, ẩn bớt rườm rà, nút bấm khổng lồ.
 * - 'child' (Trẻ em): Màu sắc sinh động, nút bấm 3D game quest, câu thoại mascot ngắn gọn, icon lớn.
 */

export function getDemographicHeading(role: UserRole, customExtra: string = ""): string {
  if (role === "elderly") {
    return `text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-snug ${customExtra}`;
  }
  return `text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight ${customExtra}`;
}

export function getDemographicBody(role: UserRole, customExtra: string = ""): string {
  if (role === "elderly") {
    return `text-lg sm:text-xl font-bold text-slate-950 leading-relaxed ${customExtra}`;
  }
  return `text-sm sm:text-base font-semibold text-slate-800 leading-normal ${customExtra}`;
}

export function getDemographicSubText(role: UserRole, customExtra: string = ""): string {
  if (role === "elderly") {
    return `text-base sm:text-lg font-bold text-slate-800 leading-normal ${customExtra}`;
  }
  return `text-xs sm:text-sm font-medium text-slate-600 leading-normal ${customExtra}`;
}

export function getDemographicButton(
  role: UserRole,
  variant: "primary" | "secondary" | "danger" = "primary"
): string {
  if (role === "elderly") {
    if (variant === "primary") {
      return "py-5 sm:py-6 px-8 sm:px-10 rounded-3xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-black text-xl sm:text-2xl shadow-xl border-3 border-blue-950 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] transition-all";
    }
    if (variant === "secondary") {
      return "py-4 sm:py-5 px-6 sm:px-8 rounded-3xl bg-amber-100 hover:bg-amber-200 text-slate-950 font-black text-lg sm:text-xl border-3 border-amber-400 flex items-center justify-center gap-2.5 cursor-pointer transition-colors";
    }
    return "py-5 px-8 rounded-3xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xl border-3 border-rose-950 flex items-center justify-center gap-3 cursor-pointer";
  }

  // Child: 3D chunky game buttons with playful active bounce
  if (variant === "primary") {
    return "py-4 sm:py-4.5 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-base sm:text-lg shadow-md border-b-6 border-blue-800 active:border-b-0 active:translate-y-1.5 flex items-center justify-center gap-2.5 cursor-pointer transition-all";
  }
  if (variant === "secondary") {
    return "py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer transition-all";
  }
  return "py-3.5 px-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm sm:text-base border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer";
}

export function getDemographicCard(role: UserRole, customExtra: string = ""): string {
  if (role === "elderly") {
    return `rounded-3xl bg-white border-3 border-slate-400 p-6 sm:p-8 shadow-md text-slate-950 ${customExtra}`;
  }
  return `rounded-3xl bg-white border-2 border-sky-200 p-5 sm:p-6 shadow-sm border-b-4 border-sky-300 text-slate-900 ${customExtra}`;
}

export function getDemographicPageBackground(role: UserRole): string {
  if (role === "elderly") {
    return "bg-amber-50/30 text-slate-950";
  }
  return "bg-gradient-to-b from-sky-50/50 via-white to-blue-50/40 text-slate-900";
}

/**
 * Trợ lý Mascot hội thoại cho Trẻ Em vs Hướng dẫn lớn cho Người Cao Tuổi
 */
export function getDemographicMascotMessage(
  role: UserRole,
  context: "quiz_prompt" | "danger_warning" | "level_passed"
): { avatarEmoji: string; title: string; message: string } {
  if (role === "elderly") {
    switch (context) {
      case "quiz_prompt":
        return {
          avatarEmoji: "👵",
          title: "HƯỚNG DẪN DÀNH CHO BÁC",
          message: "Bác hãy nhìn kỹ tình huống bên trái, sau đó chọn 1 ô chữ to bên phải mà Bác thấy an toàn nhất.",
        };
      case "danger_warning":
        return {
          avatarEmoji: "⚠️",
          title: "CẢNH BÁO NGUY HIỂM",
          message: "Tuyệt đối không chuyển tiền và không cung cấp mật khẩu, mã OTP cho bất kỳ ai gọi điện thoại.",
        };
      case "level_passed":
        return {
          avatarEmoji: "✅",
          title: "BÁC ĐÃ XỬ LÝ RẤT CHUẨN XÁC!",
          message: "Chúc mừng Bác đã bảo vệ thành công an toàn tài sản và không bị kẻ gian thao túng.",
        };
    }
  }

  // Child mode: Game quest detective mascot
  switch (context) {
    case "quiz_prompt":
      return {
        avatarEmoji: "🛡️",
        title: "NHIỆM VỤ PHÁ ÁN CỦA HIỆP SĨ SỐ",
        message: "Phát hiện bẫy lừa đảo của kẻ gian! Bạn hãy chọn chiêu thức phòng thủ thông minh nhất nhé!",
      };
    case "danger_warning":
      return {
        avatarEmoji: "🚨",
        title: "BÁO ĐỘNG ĐỎ: BẪY NGUY HIỂM!",
        message: "Kẻ xấu đang cố lừa bạn đấy! Đừng bấm link lạ hay nghe lời người lạ trên mạng nhé!",
      };
    case "level_passed":
      return {
        avatarEmoji: "⭐",
        title: "CHIẾN THẮNG THỬ THÁCH!",
        message: "Bạn vừa ghi thêm điểm kinh nghiệm và thu thập huy hiệu Hiệp Sĩ Số xuất sắc!",
      };
  }
}
