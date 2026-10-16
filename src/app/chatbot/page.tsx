"use client";

import { useState } from "react";
import { analyzeRisk } from "@/utils/riskAnalyzer";
import { RiskAnalysisResult } from "@/types/scenario";
import { RiskAnalysisCard } from "@/components/chat/RiskAnalysisCard";
import { useDemographic } from "@/context/DemographicContext";
import {
  Bot,
  Send,
  RotateCcw,
  User,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Zap,
  Sword,
  Search,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  analysis?: RiskAnalysisResult;
  timestamp: string;
}

/**
 * 1. ElderlyChatbotView: Dành riêng cho Người Cao Tuổi
 * Triết lý: BỎ HOÀN TOÀN chat bong bóng rườm rà.
 * Thay bằng Form kiểm tra an toàn 1 cột siêu to:
 * - Ô nhập text khổng lồ.
 * - Nút "Kiểm tra an toàn ngay" siêu to.
 * - Kết quả trả về chữ siêu lớn: "1. NGUY CƠ GÌ? 2. CẦN LÀM GÌ TIẾP THEO?".
 */
function ElderlyChatbotView() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<RiskAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleElderlyQueries = [
    {
      label: "Ví dụ: Con đang cấp cứu chuyển tiền gấp",
      text: "Con đang bị tai nạn nguy kịch cấp cứu ở bệnh viện, mẹ chuyển gấp 50 triệu vào số tài khoản bác sĩ 104882xxxx để mổ gấp!",
    },
    {
      label: "Ví dụ: Công an dọa bắt chuyển tiền tạm giữ",
      text: "Tôi là cán bộ công an điều tra, tài khoản ông đang dính đường dây ma túy, yêu cầu chuyển 50 triệu vào tài khoản thanh tra ngay trong 30 phút.",
    },
    {
      label: "Ví dụ: Lỗi VNeID bấm vào link lạ",
      text: "Hồ sơ định danh VNeID của ông bị lỗi, hãy bấm vào link vneid-capnhat.top để tải ứng dụng cài đặt gấp.",
    },
    {
      label: "Ví dụ: Trúng thưởng xe máy nộp phí",
      text: "Chúc mừng Bác đã trúng xe máy SH 0 đồng, vui lòng chuyển khoản trước 2 triệu tiền phí vận chuyển để nhận xe.",
    },
  ];

  const handleInspect = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeRisk(inputText);
      setResult(res);
    } catch {
      // Fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header khung trang nhã, tương phản cao */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 font-bold text-xs sm:text-sm border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>CHUYÊN MỤC KIỂM TRA AN TOÀN SỐ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Kiểm Tra An Toàn Tin Nhắn & Số Điện Thoại Lạ
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Khi nhận được tin nhắn hay cuộc gọi nghi vấn, quý độc giả hãy dán hoặc gõ nội dung vào ô bên dưới để trợ lý phân tích và hướng dẫn các bước xử lý an toàn:
          </p>
        </div>

        {/* 4 Nút tình huống mẫu rõ ràng */}
        <div className="space-y-2.5">
          <span className="text-sm sm:text-base font-bold text-slate-800 block">
            Hoặc chọn một tình huống mẫu thường gặp để xem cách phân tích:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleElderlyQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(item.text);
                  setResult(null);
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-500 text-left text-sm sm:text-base font-medium text-slate-800 shadow-2xs cursor-pointer transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ô nhập văn bản */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập hoặc dán nội dung tin nhắn, lời thoại cuộc gọi lạ vào đây..."
              className="w-full p-4 sm:p-5 rounded-xl border border-slate-300 focus:border-blue-700 bg-white text-slate-900 text-base sm:text-lg font-normal leading-relaxed shadow-2xs focus:outline-none placeholder:text-slate-400 min-h-[140px]"
            />
          </div>

          {/* Nút bấm kiểm tra chuẩn giao diện */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleInspect}
              disabled={!inputText.trim() || isAnalyzing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-base sm:text-lg shadow-sm flex items-center justify-center gap-2.5 cursor-pointer transition-colors border border-blue-900 active:scale-98"
            >
              <Search className="w-5 h-5 text-white" />
              <span>{isAnalyzing ? "Đang phân tích dữ liệu..." : "Kiểm tra độ an toàn"}</span>
            </button>

            {inputText && (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-base transition-colors cursor-pointer"
              >
                Xóa làm lại
              </button>
            )}
          </div>
        </div>

        {/* KẾT QUẢ TRẢ VỀ: RÕ RÀNG, CHUẨN TỶ LỆ, DỄ TIẾP CẬN */}
        {result && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* 1. NGUY CƠ GÌ? */}
            <div className="space-y-2.5 pb-5 border-b border-slate-200">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 inline-block">
                1. KẾT QUẢ PHÂN TÍCH: NGUY CƠ GÌ?
              </span>
              <div className="flex items-center gap-2.5 pt-1">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-rose-800">
                  {result.risk_level === "high" || result.risk_level === "emergency"
                    ? "Cảnh báo: Đây là chiêu trò lừa đảo nguy hiểm!"
                    : "Cảnh báo: Có dấu hiệu đáng ngờ!"}
                </h3>
              </div>
              <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* 2. CẦN LÀM GÌ TIẾP THEO? */}
            <div className="space-y-3.5">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                2. HƯỚNG DẪN ỨNG PHÓ AN TOÀN
              </span>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-rose-950 leading-relaxed">
                    Dừng cuộc gọi và không làm theo. Giữ bình tĩnh, tuyệt đối không chuyển tiền hoặc cung cấp mã OTP theo lời giục giã hay hăm dọa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-amber-950 leading-relaxed">
                    Chủ động liên hệ người thân hoặc cơ quan chức năng địa phương để kiểm chứng lại tính xác thực của sự việc.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-emerald-950 leading-relaxed">
                    Nguyên tắc bất di bất dịch: Cơ quan công an và viện kiểm sát KHÔNG BAO GIỜ yêu cầu chuyển tiền hay làm việc qua điện thoại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 2. ChildChatbotView: Dành riêng cho Học sinh & Trẻ em
 * Triết lý: Gaming Assistant ngầu lòi phong cách Discord / Sci-fi Pastel.
 * - Nút "Gợi ý nhanh" dạng Chip để bấm luôn không cần gõ.
 * - Chat feed sinh động với Mascot CyberGuard Bot.
 * - Thưởng XP sau mỗi lần phát hiện bẫy lừa đảo.
 */
function ChildChatbotView() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "bot",
      text: "Chào Hiệp Sĩ Số! Tớ là CyberGuard 🛡️ Bạn vừa gặp phải link lạ, tin nhắn dọa nạt hay cuộc gọi mờ ám? Hãy dán nội dung vào đây hoặc bấm các gợi ý bên dưới để cùng tớ bóc tách dấu hiệu lừa đảo nhé!",
      timestamp: "CyberGuard",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const quickPromptChips = [
    {
      label: "🎮 Link tặng skin / robux miễn phí",
      text: "Nhận 10.000 Robux và skin súng Free Fire 0 đồng tại https://nhanquafree-game2026.vip! Đăng nhập nick và mật khẩu ngay.",
    },
    {
      label: "⚠️ Dọa khóa acc trong 24h",
      text: "Cảnh báo: Tài khoản của bạn bị tố cáo gian lận. Truy cập https://hotro-khoa-acc.top để xác thực nếu không sẽ bị xóa vĩnh viễn.",
    },
    {
      label: "💸 Bạn quen mượn tiền nạp thẻ",
      text: "Ê bạn ơi, tớ đang bị kẹt chuyển tiền mua thẻ game, bạn chuyển khoản giúp tớ 200k vào số tk này tí tớ trả lại gấp đôi nhé!",
    },
    {
      label: "📦 Shipper giả đòi chuyển cọc",
      text: "Bạn có đơn hàng Shopee 0 đồng trúng thưởng xe máy, chuyển trước 500k phí ship vào stk cá nhân để bưu tá giao hàng.",
    },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isAnalyzing) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: query,
      timestamp: "Bạn",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsAnalyzing(true);

    try {
      const analysis = await analyzeRisk(query);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: `🛡️ Đã phân tích xong! Mức độ rủi ro: ${analysis.risk_level.toUpperCase()}. +20 XP Khám Phá!`,
        analysis,
        timestamp: "CyberGuard",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Gaming Clean */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-13 h-13 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-black uppercase text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  TRỢ LÝ AN TOÀN SỐ
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Trực Tuyến
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Trợ Lý Soi Bẫy Lừa Đảo CyberGuard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black text-amber-300">+20 XP mỗi lần phát hiện</span>
          </div>
        </div>

        {/* Quick Prompt Chips (Bấm luôn không cần gõ) */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-sky-300 tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Gợi ý tình huống nhanh (Click để thử ngay):</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPromptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.text)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-sky-400 text-xs font-bold text-sky-200 hover:text-white transition-all cursor-pointer shadow-xs hover:scale-102"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Conversation Box (Discord / Game Style) */}
        <div className="rounded-3xl bg-slate-900/90 border-2 border-white/20 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-lg shrink-0 shadow-md">
                    🛡️
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-3 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
                      : "bg-white/10 backdrop-blur-md border border-white/20 text-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 pb-1 border-b border-white/10">
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="text-sm leading-relaxed">{msg.text}</p>

                  {/* Hiển thị thẻ phân tích rủi ro nếu có */}
                  {msg.analysis && (
                    <div className="pt-2">
                      <RiskAnalysisCard analysis={msg.analysis} />
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shrink-0 shadow-md">
                    BẠN
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input & 3D Send Button Bar */}
          <div className="p-3 sm:p-4 bg-slate-950/80 border-t border-white/15 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Dán link lạ hoặc tin nhắn đáng ngờ vào đây để CyberGuard soi..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isAnalyzing}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-black text-xs sm:text-sm shadow-md border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Quét Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main ChatbotPage
 * Render ElderlyChatbotView hoặc ChildChatbotView dựa trên userRole từ Context
 */
export default function ChatbotPage() {
  const { userRole } = useDemographic();

  if (userRole === "elderly") {
    return <ElderlyChatbotView />;
  }

  return <ChildChatbotView />;
}
