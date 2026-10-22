"use client";

import React, { useState, useEffect } from "react";
import { useAuth, AuthTabType } from "@/context/AuthContext";
import { useDemographic, UserRole } from "@/context/DemographicContext";
import { AVATAR_OPTIONS } from "@/data/avatars";
import {
  X,
  Mail,
  Phone,
  Lock,
  User,
  Shield,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  UserCheck,
  KeyRound,
  Calendar,
} from "lucide-react";

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalTab,
    openAuthModal,
    closeAuthModal,
    signIn,
    signUp,
    resetPassword,
  } = useAuth();
  const { userRole, setUserRole } = useDemographic();

  const [identifier, setIdentifier] = useState(""); // SĐT hoặc Email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [targetGroup, setTargetGroup] = useState<"student" | "elder" | "general">(
    userRole === "elderly" ? "elder" : "student"
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState("guardian");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Tự động tính tuổi và cấu hình giao diện khi người dùng chọn ngày sinh
  const handleDobChange = (dateVal: string) => {
    setDob(dateVal);
    setFieldErrors((prev) => ({ ...prev, dob: "" }));
    if (!dateVal) {
      setAge("");
      return;
    }
    const today = new Date();
    const birthDate = new Date(dateVal);
    if (isNaN(birthDate.getTime())) {
      setAge("");
      return;
    }
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    if (calculatedAge < 6 || calculatedAge > 120) {
      setAge(calculatedAge);
      setFieldErrors((prev) => ({
        ...prev,
        dob: "Độ tuổi hợp lệ từ 6 đến 120 tuổi. Vui lòng kiểm tra lại ngày sinh.",
      }));
      return;
    }

    setAge(calculatedAge);
    if (calculatedAge >= 50) {
      setTargetGroup("elder");
      setUserRole("elderly");
    } else {
      setTargetGroup("student");
      setUserRole("child");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      if (authModalTab === "signin") {
        const errors: Record<string, string> = {};
        if (!identifier.trim()) {
          errors.identifier = "Vui lòng nhập Số điện thoại hoặc Email của bạn.";
        }
        if (!password) {
          errors.password = "Vui lòng nhập mật khẩu tài khoản.";
        }
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setIsSubmitting(false);
          return;
        }

        const res = await signIn(identifier, password);
        if (!res.success) {
          const err = res.error || "Đăng nhập thất bại.";
          if (
            err.includes("không chính xác") ||
            err.includes("credentials") ||
            err.includes("Invalid login")
          ) {
            setFieldErrors({
              identifier: "Số điện thoại / Email hoặc mật khẩu không chính xác.",
              password: "Vui lòng kiểm tra lại mật khẩu.",
            });
          } else {
            setErrorMessage(err);
          }
        }
      } else if (authModalTab === "signup") {
        const errors: Record<string, string> = {};
        if (!displayName.trim()) {
          errors.displayName = "Vui lòng nhập họ và tên hoặc biệt danh của bạn.";
        }
        if (!identifier.trim()) {
          errors.identifier = "Vui lòng nhập Số điện thoại hoặc Email để làm tên đăng nhập.";
        }
        if (!dob) {
          errors.dob = "Vui lòng chọn ngày tháng năm sinh của bạn.";
        } else if (age === "" || Number(age) < 6 || Number(age) > 120) {
          errors.dob = "Độ tuổi tính toán không hợp lệ (hỗ trợ từ 6 đến 120 tuổi).";
        }
        if (password.length < 8) {
          errors.password = "Mật khẩu bảo mật phải có tối thiểu 8 ký tự.";
        }
        if (password !== confirmPassword) {
          errors.confirmPassword = "Mật khẩu xác nhận không khớp. Vui lòng nhập lại chính xác.";
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setIsSubmitting(false);
          return;
        }

        const userAge = Number(age);
        const resolvedGroup = userAge >= 50 ? "elder" : "student";
        const resolvedRole = userAge >= 50 ? "elderly" : "child";
        setUserRole(resolvedRole);

        const res = await signUp({
          identifier,
          pass: password,
          displayName,
          age: userAge,
          dob,
          targetGroup: resolvedGroup,
          avatarId: selectedAvatarId,
        });

        if (!res.success) {
          const err = res.error || "Đăng ký thất bại.";
          if (err.includes("đã được đăng ký") || err.includes("already registered")) {
            setFieldErrors({
              identifier: "Số điện thoại hoặc Email này đã tồn tại trên hệ thống. Vui lòng chuyển sang tab Đăng Nhập.",
            });
          } else {
            setErrorMessage(err);
          }
        } else {
          setSuccessMessage("Đăng ký tài khoản thành công! Đang đăng nhập...");
        }
      } else if (authModalTab === "forgot") {
        if (!identifier.trim()) {
          setFieldErrors({
            identifier: "Vui lòng nhập Số điện thoại hoặc Email đã đăng ký để khôi phục mật khẩu.",
          });
          setIsSubmitting(false);
          return;
        }
        const res = await resetPassword(identifier);
        if (res.success) {
          setSuccessMessage(res.message || "Yêu cầu khôi phục mật khẩu đã được gửi thành công!");
        } else {
          setErrorMessage(res.error || "Không thể gửi yêu cầu khôi phục.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-slate-200 shadow-2xl p-6 sm:p-8 my-6 text-slate-900 flex flex-col gap-5 max-h-[92vh] overflow-y-auto cursor-default"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-center sm:text-left pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold font-mono uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Nền Tảng Trò Chơi An Toàn Số</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {authModalTab === "signin" && "Đăng Nhập Tài Khoản"}
            {authModalTab === "signup" && "Đăng Ký Tài Khoản Mới"}
            {authModalTab === "forgot" && "Khôi Phục Mật Khẩu"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {authModalTab === "signin" && "Sử dụng SĐT hoặc Email để đăng nhập vào làm 39 ải thử thách và dùng trợ lý CyberGuardBot."}
            {authModalTab === "signup" && "Sử dụng SĐT hoặc Email làm tên đăng nhập trực tiếp. Nhập độ tuổi để cá nhân hóa giao diện và theo dõi thang đo năng lực."}
            {authModalTab === "forgot" && "Nhập SĐT hoặc Email bạn đã đăng ký để nhận mã OTP hoặc đường dẫn đặt lại mật khẩu mới."}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              openAuthModal("signin");
            }}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authModalTab === "signin"
                ? "bg-white text-slate-900 font-black shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Đăng Nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              openAuthModal("signup");
            }}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authModalTab === "signup"
                ? "bg-white text-slate-900 font-black shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Đăng Ký</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              openAuthModal("forgot");
            }}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authModalTab === "forgot"
                ? "bg-white text-slate-900 font-black shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Quên MK</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">


          {/* Display Name (Only for signup) */}
          {authModalTab === "signup" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Họ và Tên hoặc Biệt Danh</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    if (fieldErrors.displayName) setFieldErrors((p) => ({ ...p, displayName: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all ${
                    fieldErrors.displayName
                      ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              {fieldErrors.displayName && (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.displayName}</span>
                </p>
              )}
            </div>
          )}

          {/* SĐT hoặc Email (Identifier chung cho tất cả các tab) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Số điện thoại hoặc Email</span>
              <span className="text-[11px] font-normal text-slate-500">Dùng làm tên đăng nhập</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-slate-300">/</span>
                <Mail className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                required
                placeholder="0912345678 hoặc name@example.com"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (fieldErrors.identifier) setFieldErrors((p) => ({ ...p, identifier: "" }));
                }}
                className={`w-full pl-14 pr-4 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all ${
                  fieldErrors.identifier
                    ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
            </div>
            {fieldErrors.identifier && (
              <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.identifier}</span>
              </p>
            )}
          </div>

          {/* Ngày sinh (Bắt buộc khi đăng ký - dùng để tính tuổi và cấu hình giao diện chuẩn) */}
          {authModalTab === "signup" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Ngày sinh của bạn</label>
                <span className="text-[11px] text-blue-600 font-semibold">Tự tính tuổi & đổi giao diện</span>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  required
                  value={dob}
                  onChange={(e) => handleDobChange(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all ${
                    fieldErrors.dob
                      ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-rose-950"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>

              {fieldErrors.dob && (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.dob}</span>
                </p>
              )}

              {dob && age !== "" && !isNaN(Number(age)) && !fieldErrors.dob && (
                <div
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    Number(age) >= 50
                      ? "bg-amber-50 border-amber-300 text-amber-950"
                      : "bg-sky-50 border-sky-300 text-sky-950"
                  }`}
                >
                  <span className="text-xl shrink-0">{Number(age) >= 50 ? "👴" : "🧒"}</span>
                  <div>
                    <span className="font-bold">Độ tuổi tính toán: {age} tuổi.</span>{" "}
                    <span className="font-normal block text-[11px] leading-relaxed">
                      {Number(age) >= 50
                        ? "Hệ thống tự động kích hoạt Giao diện Người Cao Tuổi (Chữ to rõ, màu sắc ấm áp, phòng ngừa lừa đảo gia đình)."
                        : "Hệ thống tự động kích hoạt Giao diện Học Sinh & Trẻ Em."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Password (Chỉ cho signin và signup) */}
          {authModalTab !== "forgot" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Mật Khẩu Bảo Mật</label>
                {authModalTab === "signin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setSuccessMessage(null);
                      setFieldErrors({});
                      openAuthModal("forgot");
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Tối thiểu 8 ký tự bảo mật"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
                  }}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all ${
                    fieldErrors.password
                      ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password ? (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.password}</span>
                </p>
              ) : authModalTab === "signup" ? (
                <span className="text-[11px] text-slate-500 font-medium block">
                  Quy định bảo mật: Mật khẩu tối thiểu 8 ký tự.
                </span>
              ) : null}
            </div>
          )}

          {/* Confirm Password (Chỉ khi Sign Up) */}
          {authModalTab === "signup" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Xác Nhận Lại Mật Khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Nhập lại mật khẩu vừa đặt"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) setFieldErrors((p) => ({ ...p, confirmPassword: "" }));
                  }}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all ${
                    fieldErrors.confirmPassword
                      ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.confirmPassword}</span>
                </p>
              )}
            </div>
          )}

          {/* Avatar Selection (Chỉ khi Sign Up) */}
          {authModalTab === "signup" && (
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Chọn Huy Hiệu Đại Diện
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatarId(av.id)}
                      className={`p-2 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        selectedAvatarId === av.id
                          ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-300 shadow-xs"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${av.bgGradient} text-white flex items-center justify-center font-black text-xs shadow-xs`}
                      >
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                        {av.title.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <span>
                {authModalTab === "signin" && "Đăng Nhập Vào Hệ Thống"}
                {authModalTab === "signup" && "Hoàn Tất Đăng Ký Tài Khoản"}
                {authModalTab === "forgot" && "Gửi Yêu Cầu Khôi Phục Mật Khẩu"}
              </span>
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
          {authModalTab === "signin" && (
            <p>
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  openAuthModal("signup");
                }}
                className="text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
              >
                Đăng ký bằng SĐT hoặc Email
              </button>
            </p>
          )}
          {authModalTab === "signup" && (
            <p>
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  openAuthModal("signin");
                }}
                className="text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </p>
          )}
          {authModalTab === "forgot" && (
            <p>
              Nhớ mật khẩu rồi?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  openAuthModal("signin");
                }}
                className="text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
              >
                Quay lại đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
