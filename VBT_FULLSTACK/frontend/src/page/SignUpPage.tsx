import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./index.css";

// Reusable components
interface LogoSectionProps {
  onBackToLogin: () => void;
}

const LogoSection = ({ onBackToLogin }: LogoSectionProps) => (
  <div className="flex flex-col items-start mt-10 mr-[130px]">
    <img src="/logo.png" alt="Logo" className="w-12 h-12 mb-[71px]" />
    <div className="flex flex-col items-start ml-[81px]">
      <div className="flex flex-col items-start mb-[52px]">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-black text-base">If you already have an account register</span>
          <span className="text-black text-base">
            You can <span className="text-blue-900 font-bold cursor-pointer" onClick={onBackToLogin}>Login here !</span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

const InputField = ({ label, iconSrc, placeholder, borderColor, width = 429, value, onChange }: {
  label: string;
  iconSrc: string;
  placeholder: string;
  borderColor: string;
  width?: number;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col items-start mb-10">
    <span className="text-gray-400 text-sm font-bold mb-2.5" style={{ width: "auto" }}>{label}</span>
    <div className="flex items-center mb-1.75 gap-2.5 w-full">
      <img src={iconSrc} className="w-4 h-4 object-cover" />
      <input
        type="text"
        className="outline-none text-black text-base w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    <div className="w-full h-0.5" style={{ backgroundColor: borderColor }} />
  </div>
);

const PasswordField = ({ label, iconSrc, placeholder, borderColor, width = 429, value, onChange, marginRight = 0 }: {
  label: string;
  iconSrc: string;
  placeholder: string;
  borderColor: string;
  width?: number;
  value: string;
  onChange: (value: string) => void;
  marginRight?: number;
}) => (
  <div className="flex flex-col items-start mb-14 w-full">
    <span className="text-gray-400 text-sm font-bold mb-2.5" style={{ width: "auto" }}>{label}</span>
    <div className="flex items-center mb-2 w-full justify-between">
      <div className="flex items-center gap-2.5 flex-1">
        <img src={iconSrc} className="w-4 h-4 object-cover" />
        <input
          type="password"
          className="outline-none text-black text-base w-full"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/nCh1rvTPsB/ckd318od_expires_30_days.png" className="w-3.5 h-3.5 object-cover ml-2" />
    </div>
    <div className="w-full h-0.5" style={{ backgroundColor: borderColor }} />
  </div>
);

const RegisterButton = ({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) => (
  <button
    className={`flex justify-center items-center bg-blue-900 rounded-full px-10 py-3 shadow-lg w-full ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className="text-white text-lg font-bold">Register</span>
  </button>
);

// This component is not used in the current implementation
const BottomRightInfo = () => (
  <div className="flex flex-col items-start bg-blue-900 rounded-xl pt-6 pb-24 px-6 gap-4">
    <div className="flex items-center pr-0.5 mr-8 gap-1.5">
      <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/xrzm6vno_expires_30_days.png" className="w-3.5 h-3.5 object-cover" />
      <span className="text-white text-sm w-28">+94 0116 789 754</span>
    </div>
    <div className="flex flex-col items-start mx-24">
      <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/ykzas9uq_expires_30_days.png" className="w-[521px] h-[521px] mb-21 ml-6 object-cover" />
      <div className="flex flex-col items-start gap-1">
        <span className="text-white text-4xl font-bold">Sign Up to name</span>
        <span className="text-white text-xl">Lorem Ipsum is simply</span>
      </div>
    </div>
  </div>
);

type SignUpPageProps = { onBackToLogin: () => void };

const SignUpPage = ({ onBackToLogin }: SignUpPageProps) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async () => {
    setSuccess(null);
    // Form doğrulama
    if (!email || !username || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Kullanıcı verilerini hazırla
      const userData = {
        email: email,
        name: username,
        password: password,
      };
      
      // API'ye kayıt isteği gönder
      await register(userData);
      
      // Başarılı kayıt sonrası
      setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
      // Formu sıfırla
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      // Giriş sayfasına yönlendir
      // onBackToLogin(); // Otomatik yönlendirme kaldırıldı, kullanıcıya bırakıldı
    } catch (err: any) {
      setError(err.message || "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Top section */}
      <div className="flex-1 flex flex-col items-stretch bg-white">
        <div className="flex items-start mt-5 mb-5 ml-10">
          <LogoSection onBackToLogin={onBackToLogin} />
          <div className="flex flex-col items-start ml-20">
            {/* Info and inputs */}
            <div className="flex flex-col items-start mb-8">
              <div className="flex flex-col items-start mb-8">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-black text-base">If you already have an account register</span>
                  <span className="text-black text-base">You can Login here !</span>
                </div>
              </div>
              <InputField
                label="Email"
                iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/6la19f06_expires_30_days.png"
                placeholder="Enter your email address"
                borderColor="#000741"
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Username"
                iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/ab88ijbc_expires_30_days.png"
                placeholder="Enter your User name"
                borderColor="#999999"
                value={username}
                onChange={setUsername}
              />
              <PasswordField
                label="Password"
                iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/jfd9w6vx_expires_30_days.png"
                placeholder="Enter your Password"
                borderColor="#999999"
                value={password}
                onChange={setPassword}
              />
              <PasswordField
                label="Confrim Password"
                iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/i3s0bjkx_expires_30_days.png"
                placeholder="Confrim your Password"
                borderColor="#999999"
                value={confirmPassword}
                onChange={setConfirmPassword}
                marginRight={202}
              />
              <div className="mt-4 w-full max-w-[429px]">
                {success && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                <RegisterButton 
                  onClick={handleRegister} 
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="mt-2 text-center text-gray-600">
                    İşleminiz gerçekleştiriliyor...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex-1 flex flex-col items-stretch bg-[#000741] rounded-t-xl pt-6 pb-24 px-6 gap-4">
        <div className="flex items-center justify-end gap-1.5 mb-4">
          <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/xrzm6vno_expires_30_days.png" className="w-3.5 h-3.5 object-cover" />
          <span className="text-white text-sm">+94 0116 789 754</span>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center gap-8">
            <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/nCh1rvTPsB/ykzas9uq_expires_30_days.png" className="w-64 h-64 object-contain" />
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-white text-4xl font-bold">Sign Up to VBT</span>
              <span className="text-white text-xl">Create your account now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;