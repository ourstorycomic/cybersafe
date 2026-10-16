"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDemographic } from "@/context/DemographicContext";
import {
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Lock,
} from "lucide-react";

export function DemoQuizSection() {
  const { openAuthModal } = useAuth();
  const { userRole, isElderly, isChild } = useDemographic();
  const [activeDemoIdx, setActiveDemoIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
    }
  };

  const handleSwitchQuestion = (idx: number) => {
    setActiveDemoIdx(idx);
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <section id="demo-quiz" className={`py-12 sm:py-20 border-b ${
      isElderly ? "bg-amber-50/20 border-amber-200" : "bg-white border-slate-200"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono border ${
            isElderly ? "bg-amber-100 text-amber-950 border-amber-300" : "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Trải Nghiệm Thử Ngay (Không Cần Đăng Nhập)</span>
          </div>
          <h2 className={
            isElderly 
              ? "text-3xl sm:text-5xl font-black text-slate-950 tracking-tight"
              : "text-3xl sm:text-4xl font-black text-slate-900 tracking-tight"
          }>
            {isElderly ? "Thử Thách Nhận Diện Nhanh Cho Bác" : "2 Câu Hỏi Thử Thách Phá Án Demo"}
          </h2>
          <p className={
            isElderly 
              ? "text-lg sm:text-xl text-slate-900 font-bold"
              : "text-sm sm:text-base text-slate-600 font-medium"
          }>
            {isElderly 
              ? "Bác hãy bấm chọn đáp án đúng nhất để kiểm tra khả năng phòng ngừa bẫy lừa đảo:"
              : "Thử tài nhận diện bẫy thao túng tâm lý và dấu hiệu lừa đảo phổ biến trước khi vào trọn bộ 39 ải:"}
          </p>

          {/* Toggle between 2 demo questions */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-300 gap-2 pt-2">
            {demoScenarios.map((demo, idx) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleSwitchQuestion(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isElderly ? "text-base font-black" : "text-xs font-bold"
                } ${
                  activeDemoIdx === idx
                    ? isElderly
                      ? "bg-blue-700 text-white shadow-md font-black"
                      : "bg-white text-blue-700 shadow-xs border border-slate-200 font-black"
                    : "text-slate-700 hover:text-slate-950"
                }`}
              >
                {demo.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Child Mascot Dialogue Banner */}
        {isChild && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-200">
            <span className="text-3xl animate-bounce">🛡️</span>
            <div>
              <span className="text-xs font-black uppercase text-sky-800">Hiệp Sĩ Số mách bạn:</span>
              <p className="text-sm font-bold text-slate-800">
                Hãy đọc kỹ tin nhắn bên trái rồi chọn xem đáp án nào giúp giữ an toàn nhé!
              </p>
            </div>
          </div>
        )}

        {/* Demo Stage: Left Scenario + Right Interaction */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start rounded-3xl p-5 sm:p-8 shadow-sm border-2 ${
          isElderly ? "bg-white border-slate-300" : "bg-slate-50 border-slate-200"
        }`}>
          {/* Left: Device Simulator Mockup */}
          <div className="lg:col-span-5 space-y-3">
            <div className={`uppercase font-black flex items-center gap-1.5 ${
              isElderly ? "text-sm text-slate-900" : "text-xs text-slate-500"
            }`}>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Tình huống giả định</span>
            </div>

            <div className="rounded-2xl bg-white border-2 border-slate-300 shadow-sm overflow-hidden">
              {/* Phone Header */}
              <div className="bg-slate-100 px-4 py-2 text-xs font-mono text-slate-700 border-b border-slate-200 flex items-center justify-between font-bold">
                <span>09:41</span>
                <span>{currentScenario.type}</span>
              </div>

              {/* Message Content */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
                  {activeDemoIdx === 0 ? (
                    <PhoneCall className="w-5 h-5 text-rose-600 shrink-0" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
                  )}
                  <span className={isElderly ? "text-base font-black" : "text-xs font-bold"}>
                    {currentScenario.stimulus.caller}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border leading-relaxed font-semibold ${
                  isElderly 
                    ? "bg-amber-50/70 border-amber-300 text-slate-950 text-lg sm:text-xl font-bold" 
                    : "bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800 font-medium"
                }`}>
                  {currentScenario.stimulus.content}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Question & Options */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <span className={`uppercase font-bold tracking-wider inline-block px-2.5 py-0.5 rounded-md border ${
                isElderly 
                  ? "text-sm font-black text-blue-900 bg-blue-100 border-blue-300" 
                  : "text-[11px] font-bold text-blue-700 bg-blue-50 border-blue-200"
              }`}>
                {currentScenario.title}
              </span>
              <h3 className={
                isElderly
                  ? "text-xl sm:text-2xl font-black text-slate-950 leading-snug"
                  : "text-sm sm:text-base font-black text-slate-900 leading-snug"
              }>
                {currentScenario.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentScenario.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const letter = String.fromCharCode(65 + oIdx);

                let optStyle = isElderly
                  ? "border-2 border-slate-300 bg-white hover:border-blue-600 text-slate-950"
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-800";

                if (isSelected && !submitted) {
                  optStyle = isElderly
                    ? "border-blue-700 bg-blue-50 text-slate-950 font-black ring-4 ring-blue-200"
                    : "border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-200";
                } else if (submitted) {
                  if (opt.isCorrect) {
                    optStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-black";
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through opacity-75";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left rounded-2xl transition-all cursor-pointer flex items-start gap-4 ${
                      isElderly ? "p-5 sm:p-6" : "p-3.5"
                    } ${isChild ? "border-b-4 hover:-translate-y-0.5" : "border-2"} ${optStyle}`}
                  >
                    <span
                      className={`font-black flex items-center justify-center shrink-0 ${
                        isElderly ? "w-10 h-10 text-lg rounded-xl" : "w-6 h-6 text-xs rounded-lg mt-0.5"
                      } ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className={`leading-relaxed ${
                      isElderly ? "text-lg sm:text-xl font-bold text-slate-950" : "text-xs sm:text-sm"
                    }`}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Submit or Explanation */}
            {!submitted ? (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleSubmit}
                  className={
                    isElderly
                      ? "w-full py-5 rounded-2xl bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white font-black text-2xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-3 min-h-[68px]"
                      : isChild
                      ? "w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-base shadow-lg cursor-pointer transition-all border-b-6 border-blue-800 active:border-b-0 active:translate-y-1.5 flex items-center justify-center gap-2"
                      : "w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                  }
                >
                  <CheckCircle className={isElderly ? "w-7 h-7" : "w-4 h-4"} />
                  <span>{isElderly ? "XÁC NHẬN CÂU TRẢ LỜI" : "Xác Nhận Đáp Án"}</span>
                </button>
              </div>
            ) : (
              <div className={`p-5 rounded-2xl border space-y-2 animate-in fade-in duration-200 ${
                isElderly ? "bg-amber-50/80 border-2 border-amber-300" : "bg-white border border-slate-200"
              }`}>
                <div className="flex items-center gap-2 font-black uppercase tracking-wider">
                  {currentScenario.options[selectedOption!].isCorrect ? (
                    <span className={`text-emerald-800 flex items-center gap-1.5 ${isElderly ? "text-xl" : "text-xs"}`}>
                      <ShieldCheck className={isElderly ? "w-6 h-6 text-emerald-700" : "w-4 h-4 text-emerald-600"} />
                      {isElderly ? "Bác đã trả lời rất chuẩn xác!" : "Phản xạ chính xác!"}
                    </span>
                  ) : (
                    <span className={`text-rose-800 flex items-center gap-1.5 ${isElderly ? "text-xl" : "text-xs"}`}>
                      <AlertTriangle className={isElderly ? "w-6 h-6 text-rose-700" : "w-4 h-4 text-rose-600"} />
                      {isElderly ? "Bác cần đặc biệt cảnh giác điểm này:" : "Cần lưu ý điểm này!"}
                    </span>
                  )}
                </div>
                <p className={`leading-relaxed font-semibold ${
                  isElderly ? "text-lg sm:text-xl text-slate-950" : "text-xs sm:text-sm text-slate-700 font-medium"
                }`}>
                  {currentScenario.options[selectedOption!].explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to action for full 39 levels & chatbot */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isElderly 
            ? "bg-amber-100/70 border-amber-300" 
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
        }`}>
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className={
              isElderly 
                ? "text-2xl sm:text-3xl font-black text-slate-950"
                : "text-lg sm:text-xl font-black text-slate-900"
            }>
              {isElderly 
                ? "Bác muốn luyện tập trọn bộ 39 tình huống thực tế?" 
                : "Muốn chinh phục trọn bộ 39 ải và đồng hành cùng CyberGuardBot?"}
            </h3>
            <p className={
              isElderly 
                ? "text-lg font-bold text-slate-900"
                : "text-xs sm:text-sm text-slate-600 font-medium"
            }>
              {isElderly 
                ? "Đăng ký hoàn toàn miễn phí bằng Số điện thoại để tự tin tránh xa mọi cạm bẫy lừa đảo."
                : "Đăng nhập miễn phí bằng SĐT hoặc Email để rèn luyện kịch bản phân nhánh (Branching), khoanh vùng đáng ngờ (Hotspot) và lưu thang đo năng lực."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openAuthModal("signup")}
            className={
              isElderly
                ? "w-full sm:w-auto px-8 py-5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xl shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all shrink-0 min-h-[64px]"
                : "w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md hover-lift flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
            }
          >
            <span>{isElderly ? "ĐĂNG KÝ HỌC MIỄN PHÍ" : "Tạo Tài Khoản Rèn Luyện Ngay"}</span>
            <ArrowRight className={isElderly ? "w-6 h-6" : "w-4 h-4"} />
          </button>
        </div>
      </div>
    </section>
  );
}

