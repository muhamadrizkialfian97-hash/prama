import React, { useEffect, useState } from 'react';
import PancaranLogo from './PancaranLogo';
import { Play, Shield, Globe, Ship, Truck, Cpu, Activity, ArrowRight, User } from 'lucide-react';

interface LandingPageProps {
  savedUserEmail: string | null;
  onProceed: () => void;
  onQuickProceedAsUser?: () => void;
}

export default function LandingPage({ savedUserEmail, onProceed, onQuickProceedAsUser }: LandingPageProps) {
  const [telemetryTime, setTelemetryTime] = useState<string>('');
  const [activeSignal, setActiveSignal] = useState(true);

  // Update animated telemetry info
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTime(new Date().toLocaleTimeString('id-ID'));
      setActiveSignal(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between overflow-hidden font-sans" id="landing-page-container">
      
      {/* 1. HTML5 Cinematic Loop Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
          id="landing-bg-video"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-docked-at-a-port-terminal-aerial-view-41485-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-large-cargo-ship-docked-at-a-port-41484-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Deep blue color grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2C56]/80 via-slate-950/80 to-slate-950" />
        {/* Animated Digital Grid Overlay to resemble video's matrix effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      </div>

      {/* 2. Top Hud System Nav */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/95 p-2 rounded-xl shadow-lg border border-white/20">
            <PancaranLogo className="h-8" />
          </div>
          <div>
            <span className="text-xs font-black text-[#00A4E4] font-display uppercase tracking-widest block">Pancaran Group</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider block">INTEGRATED LOGISTICS SOLUTION</span>
          </div>
        </div>

        {/* Live status telemetry widget */}
        <div className="flex items-center gap-4 text-slate-305 font-mono text-[10px]">
          <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${activeSignal ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-emerald-600'} transition-all`} />
            <span className="text-slate-300">PRAMA DIRECT-LINK SECURE</span>
          </div>
          <div className="bg-slate-900/60 border border-white/5 rounded-lg px-3 py-1.5 backdrop-blur-sm hidden md:block text-slate-300">
            TIME: <span className="text-[#00A4E4] font-bold">{telemetryTime || new Date().toLocaleTimeString('id-ID')}</span>
          </div>
        </div>
      </header>

      {/* 3. Main Center Welcome Showcase Box */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full text-center">
        
        {/* Animated Greeting Label Badge */}
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 backdrop-blur-md text-sky-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse" id="greeting-badge">
          <Activity className="h-4 w-4 text-sky-400" />
          <span>Sistem Robotik Kecerdasan Buatan Terpadu</span>
        </div>

        {/* Cinematic Title Area */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase drop-shadow-md">
          PRAMA <span className="text-[#00A4E4] font-extrabold relative">SYSTEM</span>
        </h1>
        <p className="font-display text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-300 mt-2.5">
          Project Management Analitic &mdash; Pancaran Group Indonesia
        </p>

        {/* Core Description with logistics bullets */}
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mt-6 leading-relaxed">
          Platform penunjang keputusan komersial, operasional, & akurasi keuangan. Ditenagai asisten AI penasihat khusus untuk pilar divisi komersial logistik darat & laut Pancaran Group.
        </p>

        {/* Interconnected Tech Badges representing the video content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mt-8">
          <div className="bg-slate-900/50 border border-white/5 p-3 rounded-2xl backdrop-blur-sm flex items-center gap-2 text-left">
            <div className="p-2 bg-[#00A4E4]/10 text-[#00A4E4] rounded-lg">
              <Ship className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">ARMADA LAUT</span>
              <span className="text-xs font-bold font-sans">Tugboat & Barge</span>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-3 rounded-2xl backdrop-blur-sm flex items-center gap-2 text-left">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">ARMADA DARAT</span>
              <span className="text-xs font-bold font-sans">Trailer Logistics</span>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-3 rounded-2xl backdrop-blur-sm flex items-center gap-2 text-left">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">CAKUPAN RUTE</span>
              <span className="text-xs font-bold font-sans">Nasional Indonesia</span>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-3 rounded-2xl backdrop-blur-sm flex items-center gap-2 text-left">
            <div className="p-2 bg-[#0B2C56]/20 text-sky-400 rounded-lg">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-mono">TEKNOLOGI AI</span>
              <span className="text-xs font-bold font-sans">PRAMA Analitic</span>
            </div>
          </div>
        </div>

        {/* 4. Action Buttons (Central Landing Clickers) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
          {savedUserEmail ? (
            // If already logged in, offer bypass click representing natural enter
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onProceed}
                className="w-full bg-[#00A4E4] hover:bg-[#008fca] text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#00A4E4]/25 hover:shadow-[#00A4E4]/40 text-sm tracking-wide uppercase flex items-center justify-center gap-2 font-display"
                id="landing-btn-enter"
              >
                <span>Masuk Portal PRAMA</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={onQuickProceedAsUser}
                className="w-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2.5 px-5 rounded-2xl transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 text-xs backdrop-blur-sm cursor-pointer"
                id="landing-btn-user"
              >
                <User className="h-4 w-4 text-[#00A4E4]" />
                <span>Lanjut Sebagai {savedUserEmail.split('@')[0].toUpperCase()}</span>
              </button>
            </div>
          ) : (
            // Standard click to login screen
            <button
              onClick={onProceed}
              className="w-full bg-[#00A4E4] hover:bg-[#008fca] text-white font-extrabold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#00A4E4]/30 hover:shadow-[#00A4E4]/50 text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 font-display"
              id="landing-btn-login-gate"
            >
              <span>Klik Menuju Menu Login</span>
              <ArrowRight className="h-5 w-5 text-white animate-bounce-horizontal" />
            </button>
          )}
        </div>

      </main>

      {/* 5. Telemetry Footing HUD */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-mono text-center">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>&copy; {new Date().getFullYear()} PANCARAN GROUP INDONESIA</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>SISTEM INFORMASI LOGISTIK TERPADU</span>
        </div>
        
        <div className="flex gap-4">
          <span className="text-emerald-400">● SAT_CONN_STABLE</span>
          <span>SECURE DESKTOP SHELL</span>
          <span className="text-[#00A4E4]">v1.0.0</span>
        </div>
      </footer>

      {/* Tiny CSS injection for slide-in animation specifically for landing arrow */}
      <style>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s infinite;
        }
      `}</style>
    </div>
  );
}
