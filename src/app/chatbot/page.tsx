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
    <div className="min-h-screen bg-amber-50/20 text-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header khung to rõ */}
        <div className="rounded-3xl bg-amber-50 border-4 border-amber-300 p-8 sm:p-10 shadow-md text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-200 text-amber-950 font-black text-base sm:text-lg">
            <span>👴</span>
            <span>CÔNG CỤ KIỂM TRA DÀNH CHO BÁC</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            KIỂM TRA AN TOÀN TIN NHẮN & SỐ LẠ
          </h1>

          <p className="text-xl sm:text-2xl text-slate-900 font-bold max-w-2xl mx-auto leading-relaxed">
            Bác nhận được tin nhắn hay cuộc gọi nghi ngờ? Bác chỉ cần dán hoặc gõ nội dung vào ô bên dưới để hệ thống kiểm tra ngay:
          </p>
        </div>

        {/* 4 Nút tình huống mẫu to đùng */}
        <div className="space-y-3">
          <span className="text-base sm:text-lg font-black text-slate-800 block">
            Hoặc Bác bấm thử một tình huống mẫu thường gặp:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleElderlyQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(item.text);
                  setResult(null);
                }}
                className="p-4 rounded-2xl bg-white hover:bg-amber-100 border-2 border-slate-300 hover:border-amber-500 text-left text-base sm:text-lg font-black text-slate-900 shadow-xs cursor-pointer transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ô nhập text khổng lồ */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Bác hãy nhập nội dung tin nhắn hoặc số điện thoại lạ vào đây..."
              className="w-full p-6 sm:p-7 rounded-3xl border-4 border-slate-400 focus:border-blue-700 bg-white text-slate-950 text-xl sm:text-2xl font-bold leading-relaxed shadow-md focus:outline-none placeholder:text-slate-400 min-h-[180px]"
            />
          </div>

          {/* Nút bấm kiểm tra siêu to khổng lồ */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleInspect}
              disabled={!inputText.trim() || isAnalyzing}
              className="w-full sm:flex-1 py-5 sm:py-6 rounded-3xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all border-b-8 border-blue-950 active:border-b-0 active:translate-y-2 min-h-[76px]"
            >
              <Search className="w-8 h-8 text-white" />
              <span>{isAnalyzing ? "Đang kiểm tra cho Bác..." : "BẤM VÀO ĐÂY ĐỂ KIỂM TRA NGAY"}</span>
            </button>

            {inputText && (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-5 rounded-3xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-400 font-black text-xl shadow-xs cursor-pointer min-h-[76px]"
              >
                Xóa làm lại
              </button>
            )}
          </div>
        </div>

        {/* KẾT QUẢ TRẢ VỀ: TEXT SIÊU LỚN, GẠCH ĐẦU DÒNG RÕ RÀNG */}
        {result && (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-4 border-slate-400 shadow-xl space-y-8 animate-in fade-in duration-200">
            {/* 1. NGUY CƠ GÌ? */}
            <div className="space-y-3 pb-6 border-b-2 border-slate-200">
              <span className="text-base uppercase font-black px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 border-2 border-rose-300 inline-block">
                1. KẾT QUẢ PHÂN TÍCH: NGUY CƠ GÌ?
              </span>
              <div className="flex items-center gap-3 pt-1">
                <AlertTriangle className="w-9 h-9 text-rose-600 shrink-0" />
                <h3 className="text-3xl sm:text-4xl font-black text-rose-800">
                  {result.risk_level === "high" || result.risk_level === "emergency"
                    ? "CẢNH BÁO: ĐÂY LÀ CHIÊU TRÒ LỪA ĐẢO NGUY HIỂM!"
                    : "CẢNH BÁO: CÓ DẤU HIỆU ĐÁNG NGỜ!"}
                </h3>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* 2. CẦN LÀM GÌ TIẾP THEO? */}
            <div className="space-y-4">
              <span className="text-base uppercase font-black px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 border-2 border-emerald-300 inline-block">
                2. BÁC CẦN LÀM GÌ TIẾP THEO?
              </span>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-rose-50 border-3 border-rose-400 flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-rose-950">
                    CÚP MÁY NGAY LẬP TỨC. Tuyệt đối không nghe theo lời hăm dọa hay giục giã.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border-3 border-amber-400 flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xl shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-amber-950">
                    GỌI ĐIỆN CHO CON CHÁU hoặc Công an xã/phường gần nhà để xác minh lại sự việc.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50 border-3 border-emerald-400 flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-emerald-950">
                    GIỮ CHẶT TIỀN. Công an thật KHÔNG BAO GIỜ yêu cầu Bác chuyển tiền qua điện thoại!
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
      text: "Yo Hiệp Sĩ Số! Tớ là CyberGuard AI 🛡️ Bạn nhận được link lạ hay tin nhắn nghi ngờ? Ném vào đây hoặc bấm các nút chip bên dưới để tớ quét mã độc và bóc mẽ kẻ gian ngay!",
      timestamp: "AI Guardian",
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
        text: `🛡️ Đã quét xong dữ liệu! Mức độ rủi ro: ${analysis.risk_level.toUpperCase()}. +20 XP Khám Phá!`,
        analysis,
        timestamp: "CyberGuard Bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Gaming */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 to-sky-900 border-2 border-sky-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/30 border-2 border-sky-300 flex items-center justify-center text-3xl shadow-inner shrink-0 animate-bounce">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  AI ASSISTANT V2.0
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Trực Tuyến
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Trợ Lý Soi Bẫy Lừa Đảo CyberGuard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2 rounded-2xl border border-white/20">
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
