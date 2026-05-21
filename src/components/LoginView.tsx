import React, { useState } from 'react';
import PancaranLogo from './PancaranLogo';
import { Shield, Key, Mail, Lock, ArrowRight, UserCheck, ArrowLeft } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  onBackToLanding?: () => void;
}

export default function LoginView({ onLoginSuccess, onBackToLanding }: LoginViewProps) {
  const [email, setEmail] = useState('prama@pancaran-group.co.id');
  const [password, setPassword] = useState('pancaranprama');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulated corporate backend checks
    setTimeout(() => {
      if (email.trim() === 'prama@pancaran-group.co.id' && password === 'pancaranprama') {
        onLoginSuccess('prama@pancaran-group.co.id');
      } else if (email.includes('@') && password.length >= 6) {
        onLoginSuccess(email);
      } else {
        setError('Email atau password tidak sesuai. Silakan gunakan kredensial demo di bawah.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess('prama@pancaran-group.co.id');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 relative overflow-hidden" id="login-container">
      {/* Background elegant corporate curves */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00A4E4]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[#0B2C56]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Center Cards */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto my-8 relative z-10 animate-fade-in">
        
        {/* Brand Header */}
        <div className="mb-6 text-center" id="brand-header">
          <div className="bg-white rounded-2xl p-4 shadow-md inline-block border border-slate-200/80 mb-3 hover:scale-105 transition-transform duration-300">
            <PancaranLogo className="h-12" />
          </div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight">
            PRAMA SYSTEM
          </h1>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mt-1">
            Project Management Analytics — Corporate AI Bot
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl w-full" id="login-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#00A4E4]" />
              Portal Masuk Karyawan
            </h2>
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors text-xs font-semibold cursor-pointer"
                title="Kembali ke beranda video"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Alamat Email Kantor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A4E4] focus:ring-1 focus:ring-[#00A4E4] text-sm transition-all shadow-inner"
                  placeholder="name@pancaran-group.co.id"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A4E4] focus:ring-1 focus:ring-[#00A4E4] text-sm transition-all shadow-inner"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-xs py-2 px-3 text-center bg-red-50 border border-red-100 rounded-lg font-medium">
                {error}
              </p>
            )}

            {/* Action Buttons */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A4E4] hover:bg-[#008fca] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-sm mt-6 flex items-center justify-center gap-2"
              id="btn-login-submit"
            >
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memverifikasi...
                </div>
              ) : (
                <>
                  Masuk ke Dashboard PRAMA
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bypass Button */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleDemoLogin}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-850 border border-slate-200 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-sm"
              id="btn-demo-bypass"
            >
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Masuk Instan dengan Akun Demo
            </button>
          </div>
        </div>

        {/* Credentials hints card for developers */}
        <div className="mt-4 bg-white border border-slate-200/80 rounded-xl p-3.5 w-full text-center shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
            <Key className="inline-block h-3.5 w-3.5 mr-1 text-amber-500" /> Kredensial Akses Internal
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-slate-600 text-left">
              <span className="text-slate-400 block font-sans font-bold text-[9px] uppercase">User Email:</span> prama@pancaran-group.co.id
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-slate-600 text-left">
              <span className="text-slate-400 block font-sans font-bold text-[9px] uppercase">Password:</span> pancaranprama
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branded Line */}
      <div className="text-center text-slate-400 text-xs py-4" id="login-footer">
        &copy; {new Date().getFullYear()} Pancaran Group Indonesia. All rights reserved. <br/>
        <span className="text-[10px] text-slate-400 font-mono">PRAMA BOT v1.0.0 &bull; Secure Corporate Channel</span>
      </div>
    </div>
  );
}
