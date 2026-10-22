"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";
import {
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Lock,
  Sparkles,
  Trophy,
} from "lucide-react";
import { playClickBeep, playSuccessChime, playWarningBlip } from "@/utils/gameAudio";

export function DemoQuizSection() {
  const { openAuthModal } = useAuth();
  const { userRole, isElderly, isChild } = useDemographic();
  const [activeDemoIdx, setActiveDemoIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);

  const demoScenarios = [
    {
      id: "demo-1",
      badge: "Câu hỏi Demo 1 / 2",
      type: "Cuộc gọi mạo danh",
      title: "Cuộc gọi tự xưng 'Cán bộ điều tra Bộ Công an'",
      stimulus: {
        caller: "089.882.19xx (Mạo danh Công an)",
        content:
          "Chào anh/chị, tôi là Trung úy Nguyễn Tuấn Anh thuộc Cục CSĐT Tội phạm kinh tế. Số CMND của anh/chị đang dính líu vào đường dây rửa tiền xuyên quốc gia trị giá 12 tỷ đồng. Yêu cầu anh/chị hợp tác điều tra, chuyển toàn bộ 50 triệu tiền tiết kiệm vào tài khoản giám định của cơ quan chúng tôi trong vòng 30 phút để phục vụ thanh tra, nếu không sẽ bị bắt tạm giam ngay trong ngày!",
      },
      question: "Bạn đang nhận được cuộc gọi gây sức ép trên. Hành vi an toàn đúng đắn nhất là gì?",
      options: [
        {
          text: "Chuyển ngay 50 triệu vì sợ bị bắt giam và để chứng minh mình trong sạch.",
          isCorrect: false,
          explanation: "Sai lầm nguy hiểm: Nếu chuyển tiền, kẻ gian sẽ tẩu tán ngay lập tức qua nhiều tầng tài khoản ảo và bạn sẽ mất trắng toàn bộ tài sản.",
        },
        {
          text: "Giữ bình tĩnh, dứt khoát không chuyển tiền; cơ quan Công an Việt Nam KHÔNG BAO GIỜ làm việc hay yêu cầu chuyển tiền qua điện thoại.",
          isCorrect: true,
          explanation: "Chính xác! Công an, Viện kiểm sát và Tòa án tại Việt Nam chỉ làm việc trực tiếp tại trụ sở qua giấy triệu tập bằng văn bản. Mọi yêu cầu chuyển tiền qua điện thoại đều là lừa đảo 100%.",
        },
        {
          text: "Xin kết bạn Zalo với cán bộ để gửi ảnh căn cước công dân và thương lượng giảm tiền đặt cọc.",
          isCorrect: false,
          explanation: "Không an toàn: Gửi ảnh CCCD sẽ khiến bạn bị lộ thông tin cá nhân và bị kẻ gian dùng để đăng ký vay nợ tín chấp trực tuyến.",
        },
        {
          text: "Cung cấp mã OTP ngân hàng để người gọi tự truy cập kiểm tra tài khoản giúp mình.",
          isCorrect: false,
          explanation: "Cực kỳ nguy hiểm: Mã OTP là chìa khóa rút tiền. Cung cấp OTP đồng nghĩa với việc bạn tự mở cửa cho kẻ gian rút sạch tiền.",
        },
      ],
    },
    {
      id: "demo-2",
      badge: "Câu hỏi Demo 2 / 2",
      type: "Tin nhắn giả mạo (Phishing)",
      stimulus: {
        caller: "SMS Brandname: NGAN_HANG_ABC",
        content:
          "Canh bao: Tai khoan quy khach se bi TAM KHOA sau 24h do chua cap nhat sinh trac hoc theo Quyet dinh 2345/QD-NHNN. Vui long truy cap ngay vao https://vietcom-capnhat-sinhtrachoc.top de xac thuc tranh gian doan giao dich.",
      },
      question: "Quan sát tin nhắn trên, dấu hiệu lừa đảo rõ ràng nhất là gì?",
      options: [
        {
          text: "Đường link có tên miền đuôi lạ '.top' (không phải website chính thức có đuôi .com.vn hoặc .vn của ngân hàng tại Việt Nam).",
          isCorrect: true,
          explanation: "Chính xác! Kẻ lừa đảo sử dụng tên miền quốc tế giá rẻ (.top, .xyz, .cc, .vip) để dựng website giả mạo. Các ngân hàng lớn tại Việt Nam chỉ sử dụng tên miền chính thống như vietcombank.com.vn hoặc mbbank.com.vn.",
        },
        {
          text: "Tin nhắn không có dấu tiếng Việt.",
          isCorrect: false,
          explanation: "Nhiều tin nhắn SMS viễn thông thông thường cũng không dấu để tiết kiệm ký tự, đây không phải dấu hiệu quyết định.",
        },
        {
          text: "Tin nhắn gửi vào buổi tối.",
          isCorrect: false,
          explanation: "Hệ thống tin nhắn tự động của ngân hàng có thể gửi 24/7, thời gian gửi không phải căn cứ nhận diện.",
        },
        {
          text: "Có nhắc đến Quyết định 2345/QĐ-NHNN.",
          isCorrect: false,
          explanation: "Kẻ gian thường lấy số hiệu văn bản pháp luật có thật để tạo vẻ uy tín giả mạo, ru ngủ người đọc.",
        },
      ],
    },
  ];

  const currentScenario = demoScenarios[activeDemoIdx];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    playClickBeep();
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      const isRight = currentScenario.options[selectedOption].isCorrect;
      if (isRight) {
        setEarnedXp(50);
        playSuccessChime();
      } else {
        setEarnedXp(null);
        playWarningBlip();
      }
    }
  };

  const handleSwitchQuestion = (idx: number) => {
    playClickBeep();
    setActiveDemoIdx(idx);
    setSelectedOption(null);
    setSubmitted(false);
    setEarnedXp(null);
  };

  return (
    <section id="demo-quiz" className={`py-12 sm:py-16 border-b ${
      isElderly ? "bg-white border-slate-200" : "bg-white border-slate-200"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-blue-50 border-blue-200 text-blue-900">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>{isElderly ? "Tập Nhận Diện Tình Huống Thực Tế" : "Trải Nghiệm Thử Ngay (Không Cần Đăng Nhập)"}</span>
          </div>
          <h2 className={
            isElderly 
              ? "text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              : "text-3xl sm:text-4xl font-black text-slate-900 tracking-tight"
          }>
            {isElderly ? "Bác Hãy Thử Xử Lý Tình Huống Thực Tế Này" : "2 Câu Hỏi Thử Thách Phá Án Demo"}
          </h2>
          <p className={
            isElderly 
              ? "text-base text-slate-700 font-normal leading-relaxed"
              : "text-sm sm:text-base text-slate-600 font-medium"
          }>
            {isElderly 
              ? "Bác hãy quan sát mẫu điện thoại bên trái và chọn cách ứng xử an toàn nhất ở bên phải:"
              : "Thử tài nhận diện bẫy thao túng tâm lý và dấu hiệu lừa đảo phổ biến trước khi vào trọn bộ 39 ải:"}
          </p>

          {/* Toggle between 2 demo questions */}
          <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-100 border border-slate-200 gap-2 pt-1.5">
            {demoScenarios.map((demo, idx) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleSwitchQuestion(idx)}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer text-xs sm:text-sm ${
                  activeDemoIdx === idx
                    ? "bg-white text-blue-800 shadow-xs border border-slate-200 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isElderly
                  ? idx === 0
                    ? "Tình huống 1: Giả danh Công an"
                    : "Tình huống 2: Giả tin nhắn Ngân hàng"
                  : demo.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Child Mascot Dialogue Banner */}
        {isChild && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-sky-800 tracking-wide">Hiệp Sĩ Số Gợi Ý:</span>
              <p className="text-sm font-semibold text-slate-800">
                Hãy đọc kỹ tin nhắn bên trái rồi chọn xem đáp án nào giúp giữ an toàn nhé!
              </p>
            </div>
          </div>
        )}

        {/* Demo Stage: Left Scenario + Right Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start rounded-2xl p-5 sm:p-7 shadow-xs border border-slate-200 bg-white">
          {/* Left: Device Simulator Mockup */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="uppercase font-semibold text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Tình huống giả định</span>
            </div>

            <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
              {/* Phone Header */}
              <div className="bg-slate-100 px-4 py-2 text-xs font-mono text-slate-700 border-b border-slate-200 flex items-center justify-between font-bold">
                <span>09:41</span>
                <span>{currentScenario.type}</span>
              </div>

              {/* Message Content */}
              <div className="p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
                  {activeDemoIdx === 0 ? (
                    <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {currentScenario.stimulus.caller}
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm sm:text-base font-normal leading-relaxed">
                  {currentScenario.stimulus.content}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Question & Options - Wireframe layout: Header (Câu hỏi + Time), Lựa chọn, [Pre Next Nộp] */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top row: Câu hỏi on left + [Time] box on top-right */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200 uppercase tracking-wider inline-block px-2.5 py-0.5 rounded-md">
                    {currentScenario.title}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ({activeDemoIdx + 1}/{demoScenarios.length})
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentScenario.question}
                </h3>
              </div>

              {/* [Time] badge as explicitly specified in wireframe top-right */}
              <div
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold shadow-2xs"
                title="Thời gian làm bài"
              >
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>{isElderly ? "Thong thả suy xét" : "01:30"}</span>
              </div>
            </div>

            {/* Options List (Lựa chọn) */}
            <div className="space-y-2.5">
              {currentScenario.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const letter = String.fromCharCode(65 + oIdx);

                let optStyle = "border-slate-200 bg-white hover:border-slate-300 text-slate-800";

                if (isSelected && !submitted) {
                  optStyle = "border-blue-700 bg-blue-50/70 text-slate-900 font-semibold ring-2 ring-blue-200";
                } else if (submitted) {
                  if (opt.isCorrect) {
                    optStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold";
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through opacity-75";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left rounded-xl transition-all cursor-pointer flex items-start gap-3 p-3.5 sm:p-4 border ${optStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed text-slate-800 font-normal">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Toolbar: [Pre] [Next] [Nộp] exactly as drawn in wireframe */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 italic font-normal">
                {isElderly
                  ? "* Chọn phương án và nhấn 'Nộp bài' để xem phân tích chi tiết & khuyến nghị an toàn."
                  : "* Nộp xong mới xem được đáp án và giải thích"}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  disabled={activeDemoIdx === 0}
                  onClick={() => handleSwitchQuestion(activeDemoIdx - 1)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
                  title="Tình huống trước (Pre)"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isElderly ? "Trước" : "Pre"}</span>
                </button>

                <button
                  type="button"
                  disabled={activeDemoIdx === demoScenarios.length - 1}
                  onClick={() => handleSwitchQuestion(activeDemoIdx + 1)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
                  title="Tình huống tiếp theo (Next)"
                >
                  <span>{isElderly ? "Tiếp" : "Next"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  disabled={selectedOption === null || submitted}
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  title="Nộp bài và kiểm tra"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isElderly ? "Nộp bài & Xem giải thích" : "Nộp"}</span>
                </button>
              </div>
            </div>

            {/* Result & Explanation (Revealed only after clicking [Nộp]) */}
            {submitted && selectedOption !== null && (
              <div className="p-4 sm:p-5 rounded-2xl border-2 bg-slate-50 border-slate-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                    {currentScenario.options[selectedOption].isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        Lựa chọn chính xác và an toàn!
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        Lưu ý rủi ro trong phương án này:
                      </span>
                    )}
                  </div>

                  {earnedXp && isChild && (
                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs flex items-center gap-1.5 animate-bounce">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>+{earnedXp} XP Hiệp Sĩ!</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                  {currentScenario.options[selectedOption].explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to action for full 39 levels & chatbot */}
        <div className="p-6 sm:p-8 rounded-2xl border bg-slate-50 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isElderly 
                ? "Luyện tập trọn bộ 39 tình huống thực tế cùng nền tảng" 
                : "Muốn chinh phục trọn bộ 39 ải và đồng hành cùng CyberGuardBot?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {isElderly 
                ? "Đăng ký miễn phí bằng Số điện thoại hoặc Email để lưu lại tiến trình, kiểm tra thang đo năng lực và sử dụng trợ lý an toàn số."
                : "Đăng nhập miễn phí bằng SĐT hoặc Email để rèn luyện kịch bản phân nhánh (Branching), khoanh vùng đáng ngờ (Hotspot) và lưu thang đo năng lực."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openAuthModal("signup")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-sm hover-lift flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <span>Đăng ký tham gia miễn phí</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

