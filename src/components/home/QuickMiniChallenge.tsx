"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemographic } from "@/context/DemographicContext";
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, PhoneCall, HelpCircle, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { playClickBeep, playSuccessChime, playWarningBlip } from "@/utils/gameAudio";

export function QuickMiniChallenge() {
  const { isElderly, isChild } = useDemographic();
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Câu hỏi: Công an yêu cầu chuyển tiền vào tài khoản tạm giữ qua điện thoại có đúng quy định không?
  // Đáp án đúng: SAI (KHÔNG ĐÚNG)
  const isCorrect = selectedAnswer === false;

  const handleChoose = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === false) {
      playSuccessChime();
    } else {
      playWarningBlip();
    }
  };

  const handleReset = () => {
    playClickBeep();
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <section
      id={isElderly ? "luyen-tap-cup-may" : "mini-challenge"}
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 scroll-mt-20"
    >
      <div className={`max-w-5xl mx-auto space-y-6 ${
        isElderly
          ? "p-6 sm:p-8 rounded-xl bg-white border border-slate-300 shadow-xs"
          : "p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
      }`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 font-bold ${
                isElderly
                  ? "bg-slate-100 text-slate-800 border-slate-300"
                  : "bg-amber-100 text-amber-900 border-amber-300"
              }`}>
                {isElderly ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-700" />
                )}
                <span>{isElderly ? "KHẢO SÁT TÌNH HUỐNG THỰC TẾ" : "Thử Thách Phản Xạ Nhanh 30 Giây"}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isChild ? "CÚP MÁY HAY CHUYỂN TIỀN? BẮT BẪY NGAY!" : "Phương Án Xử Lý Khi Nhận Cuộc Gọi Báo Tin Cấp Cứu"}
            </h2>
          </div>

          {showFeedback && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isElderly ? "Thực hiện lại tình huống" : "Thử lại câu này"}</span>
            </button>
          )}
        </div>

        {/* Question Content */}
        <div className="space-y-6">
          <div className={`text-slate-900 flex flex-col md:flex-row items-start md:items-center gap-4 ${
            isElderly
              ? "p-5 rounded-lg bg-slate-50 border border-slate-200"
              : "p-5 sm:p-7 rounded-3xl bg-slate-50 border-2 border-slate-200 text-slate-800"
          }`}>
            <div className={`shrink-0 flex items-center justify-center ${
              isElderly
                ? "w-11 h-11 rounded-lg bg-rose-50 text-rose-800 border border-rose-200"
                : "w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200 animate-pulse"
            }`}>
              <PhoneCall className={isElderly ? "w-5 h-5" : "w-7 h-7"} />
            </div>

            <div className="space-y-1.5 flex-1">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">
                {isElderly ? "Tình huống giả định:" : "Tình huống thực tế:"}
              </span>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-900">
                {isElderly ? (
                  <>
                    Người gọi đến tự xưng là nhân viên bệnh viện, thông báo người thân trong gia đình vừa gặp tai nạn giao thông nghiêm trọng đang cấp cứu và yêu cầu chuyển tiền tạm ứng viện phí gấp vào số tài khoản cá nhân để tiến hành phẫu thuật. Phương án xử lý đúng đắn và an toàn nhất là gì?
                  </>
                ) : (
                  <>
                    Một người gọi điện thoại tự xưng là cán bộ Công an điều tra, thông báo số CCCD của bạn liên quan đường dây tội phạm. Họ yêu cầu bạn{" "}
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      chuyển ngay tiền tiết kiệm vào “Tài khoản tạm giữ của Tòa án”
                    </span>{" "}
                    để thanh tra chứng minh vô tội. Điều này có đúng quy định pháp luật Việt Nam không?
                  </>
                )}
              </p>
            </div>
          </div>

          {/* 2 Choice Buttons */}
          {!showFeedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option B (Đúng / An toàn) */}
              <button
                onClick={() => handleChoose(false)}
                className={`transition-all flex items-center gap-3 cursor-pointer text-left ${
                  isElderly
                    ? "p-4 sm:p-5 rounded-lg font-bold text-base bg-white hover:bg-blue-50/50 text-slate-900 border border-slate-300 hover:border-blue-700 shadow-2xs"
                    : "p-5 rounded-2xl font-extrabold text-base sm:text-lg justify-center bg-blue-800 hover:bg-blue-900 text-white shadow-sm border-2 border-blue-900 text-center"
                }`}
              >
                {isElderly && (
                  <span className="w-7 h-7 rounded-md bg-blue-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    A
                  </span>
                )}
                <span>{isElderly ? "Dứt khoát ngắt máy, giữ bình tĩnh và liên hệ trực tiếp đến số điện thoại của người thân hoặc gia đình để kiểm chứng." : "B. SAI — Đây là hành vi mạo danh lừa đảo!"}</span>
              </button>

              {/* Option A (Sai / Nguy hiểm) */}
              <button
                onClick={() => handleChoose(true)}
                className={`transition-all flex items-center gap-3 cursor-pointer text-left ${
                  isElderly
                    ? "p-4 sm:p-5 rounded-lg font-bold text-base bg-white hover:bg-rose-50/40 text-slate-900 border border-slate-300 hover:border-rose-600 shadow-2xs"
                    : "p-5 rounded-2xl font-bold text-base sm:text-lg justify-center bg-white text-slate-800 border-2 border-slate-300 border-b-5 border-slate-400 active:border-b-2 active:translate-y-1 shadow-xs hover:bg-slate-50 text-center"
                }`}
              >
                {isElderly && (
                  <span className="w-7 h-7 rounded-md bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                    B
                  </span>
                )}
                <span>{isElderly ? "Vì quá hoang mang lo sợ cho tính mạng người thân nên lập tức chuyển tiền theo yêu cầu của đối tượng gọi đến." : "A. ĐÚNG — Chuyển tiền để hợp tác điều tra"}</span>
              </button>
            </div>
          ) : (
            /* Instant Feedback Card */
            <div
              className={`p-5 sm:p-6 rounded-lg border transition-all space-y-3 ${
                isElderly
                  ? isCorrect
                    ? "bg-slate-50 border-emerald-600 text-slate-900"
                    : "bg-slate-50 border-rose-600 text-slate-900"
                  : isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 rounded-2xl border-2 space-y-4"
                    : "bg-rose-50 border-rose-300 text-rose-900 rounded-2xl border-2 space-y-4"
              }`}
            >
              <div className="flex items-start gap-3.5">
                {isCorrect ? (
                  <CheckCircle2 className={`text-emerald-700 shrink-0 mt-0.5 ${isElderly ? "w-6 h-6" : "w-8 h-8"}`} />
                ) : (
                  <AlertTriangle className={`text-rose-700 shrink-0 mt-0.5 ${isElderly ? "w-6 h-6" : "w-8 h-8"}`} />
                )}

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}
                    >
                      {isCorrect ? (isElderly ? "Khuyến nghị xử lý chính xác" : "Chính xác tuyệt đối!") : (isElderly ? "Cảnh báo rủi ro cao" : "Rủi ro cảnh báo!")}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isCorrect
                      ? (isElderly ? "Xử lý chính xác: Không chuyển tiền theo yêu cầu khẩn cấp của người lạ" : "Bạn đã xử lý hoàn toàn chính xác!")
                      : (isElderly ? "Nguy cơ bị chiếm đoạt tài sản: Tuyệt đối không chuyển tiền" : "Cảnh báo: Bạn có thể đã rơi vào bẫy lừa đảo!")}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                    {isCorrect ? (
                      isElderly ? (
                        "Đây là thủ đoạn lừa đảo phổ biến nhằm thao túng tâm lý hoảng loạn của người thân. Theo quy chế của Bộ Y tế, các bệnh viện luôn ưu tiên cứu chữa người bệnh trong tình trạng cấp cứu khẩn cấp và không bao giờ yêu cầu chuyển tiền viện phí qua số tài khoản cá nhân qua điện thoại. Việc bình tĩnh ngắt máy và gọi lại số người thân sẽ lập tức làm sáng tỏ thông tin."
                      ) : (
                        "Cơ quan điều tra Công an, Viện kiểm sát và Tòa án KHÔNG BAO GIỜ làm việc qua điện thoại và TUYỆT ĐỐI KHÔNG yêu cầu người dân chuyển tiền vào bất kỳ tài khoản nào để chứng minh vô tội."
                      )
                    ) : (
                      isElderly ? (
                        "Tuyệt đối không chuyển tiền trong tình huống này. Kẻ gian thường lợi dụng tình cảm gia đình để ép buộc nạn nhân chuyển tiền trong vòng 10-15 phút. Quý vị cần dứt khoát ngắt máy và kiểm tra lại thông tin với người nhà trước khi thực hiện bất kỳ giao dịch nào."
                      ) : (
                        "Cơ quan công an TUYỆT ĐỐI KHÔNG BAO GIỜ yêu cầu người dân chuyển tiền vào bất kỳ tài khoản nào qua điện thoại. Mọi hoạt động tố tụng đều có giấy triệu tập trực tiếp tại trụ sở."
                      )
                    )}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-blue-900" />
                      Quy tắc an toàn: Dứt khoát ngắt máy • Gọi trực tiếp số người thân • Không chuyển tiền cho số lạ
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Next */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600">
                  {isElderly ? "Xem thêm các bài luyện tập tình huống thực tế khác:" : "Rèn luyện thêm 39 kịch bản thực tế có trong hệ thống"}
                </span>
                <Link
                  href="/play"
                  className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>{isElderly ? "Vào Phòng Luyện Tập" : "Khám phá 39 ải luyện tập"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
