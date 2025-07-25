import React from "react";
import authService from "../../services/api";

const user = authService.getCurrentUser() || { email: "", name: "" };

function todayString() {
  const now = new Date();
  return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
}

const stats = [
  {
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
    ),
    label: "Toplam Giriş",
    value: "1",
    color: "bg-green-400/20 border-green-400"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    label: "Bugün",
    value: todayString(),
    color: "bg-orange-400/20 border-orange-400"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ),
    label: "Demo",
    value: "Aktif",
    color: "bg-blue-400/20 border-blue-400"
  }
];

export default function HomePage() {
  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#232B3E] to-[#4B6DD1]">
      {/* AppBar */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-bold text-lg tracking-wide">LOGIFY</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-[#4B6DD1] text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-blue-700 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Logout
        </button>
      </div>
      {/* Content */}
      <div className="flex flex-col items-center w-full max-w-xl mx-auto mt-8">
        {/* Avatar */}
        <div className="rounded-full bg-white flex items-center justify-center w-24 h-24 shadow-lg">
          <svg className="w-16 h-16 text-[#4B6DD1]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25V19.5z" /></svg>
        </div>
        <div className="mt-6 text-center">
          <div className="text-white text-2xl font-bold">Hoş geldin, {user.name || user.email}!</div>
          <div className="text-white/70 text-base mt-1">{user.email}</div>
        </div>
        {/* Stat Cards */}
        <div className="flex flex-row gap-4 mt-8 w-full justify-center">
          {stats.map((stat, i) => (
            <div key={i} className={`border ${stat.color} rounded-xl px-4 py-3 flex flex-col items-center w-28`}>
              {stat.icon}
              <div className="font-bold mt-2 text-sm" style={{color: stat.color.split(' ')[1].replace('border-', '').replace('-400', '')}}>{stat.value}</div>
              <div className="text-white text-xs mt-1 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Demo Message */}
        <div className="mt-10 bg-white/10 rounded-xl px-6 py-5 text-white/80 text-center text-base max-w-md">
          Bu ekran demo amaçlıdır. Gerçek veriler ve özellikler için backend entegrasyonu gereklidir.
        </div>
      </div>
    </div>
  );
} 