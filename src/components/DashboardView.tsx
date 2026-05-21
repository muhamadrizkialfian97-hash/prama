import React from 'react';
import { Division, DivisionId } from '../types';
import { DIVISIONS } from '../data';
import PancaranLogo from './PancaranLogo';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldAlert, 
  ClipboardCheck, 
  ArrowRight, 
  LogOut, 
  HelpCircle, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

interface DashboardViewProps {
  userEmail: string;
  onSelectDivision: (id: DivisionId) => void;
  onLogout: () => void;
  onOpenGlobalExporter: () => void;
}

// Statically resolves Lucide Icon Components
const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp,
  Users,
  DollarSign,
  ShieldAlert,
  ClipboardCheck
};

export default function DashboardView({ 
  userEmail, 
  onSelectDivision, 
  onLogout,
  onOpenGlobalExporter
}: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" id="dashboard-wrapper">
      
      {/* Top Professional Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <PancaranLogo className="h-10 sm:h-12" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Export Hub Shortcut */}
            <button
              onClick={onOpenGlobalExporter}
              className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 py-2 px-3.5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              <FileText className="h-4 w-4 text-pancaran-light" />
              Hub Ekspor Template
            </button>

            {/* User Badge */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-500">Karyawan Aktif</span>
              <span className="text-xs font-bold text-pancaran-dark font-mono">{userEmail}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors border border-slate-200 hover:border-red-100 cursor-pointer"
              title="Keluar dari portal"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-pancaran-dark to-slate-800 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-10 relative overflow-hidden" id="hero-banner">
          {/* Subtle backdrop curves */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_bottom_right,var(--color-pancaran-light),transparent)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-pancaran-light/20 text-pancaran-light border border-pancaran-light/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              PRAMA AI Analitik Terintegrasi
            </div>
            <h1 className="font-display text-2xl sm:text-3.5xl font-extrabold tracking-tight leading-tight">
              Kecerdasan Buatan Terpadu untuk Proyek & Operasional Pancaran Group
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Halo Rekan Pancaran. Selamat datang di portal <strong>PRAMA</strong> (Project Management Analytics).
              AI Chatbot kami siap membantu menyusun draf proposal, audit operasional, analisis hukum logistik,
              serta perhitungan keuangan dan pengunduhan template instan.
            </p>
          </div>
        </section>

        {/* Division Selection Hub Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-pancaran-light" />
              Pilih Divisi Operasional
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Setiap divisi dibekali engine kustomisasi logika AI untuk mempermudah perumusan template perhitungan operasional Anda.
            </p>
          </div>
          <button 
            onClick={onOpenGlobalExporter}
            className="md:hidden flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-pancaran-light" />
            Buka Hub Ekspor Template
          </button>
        </div>

        {/* Grid Box Divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="divisions-grid-container">
          {DIVISIONS.map((div: Division) => {
            const IconComponent = iconMap[div.iconName] || HelpCircle;
            
            return (
              <div
                key={div.id}
                onClick={() => onSelectDivision(div.id)}
                className={`bg-white border text-left p-6 sm:p-7 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between ${div.bgGradient}`}
                id={`division-card-${div.id}`}
              >
                <div>
                  
                  {/* Division Badge & Icon */}
                  <div className="flex items-center justify-between mb-4.5">
                    <div className={`p-3 rounded-2xl bg-white border shadow-sm ${div.accentColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-white/80 border border-slate-100 text-slate-400 px-2 py-1 rounded-md">
                      {div.id} info
                    </span>
                  </div>

                  {/* Division Name */}
                  <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                    {div.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 block mb-3">
                    {div.fullName}
                  </span>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                    {div.description}
                  </p>

                </div>

                {/* Card Action footer layout */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 font-medium">
                    {div.samplePrompts.length} Preset Perhitungan
                  </span>
                  <div className="flex items-center gap-1 text-pancaran-dark group">
                    <span>Masuk Analitik</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Branding Area */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-xs mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Pancaran Group Indonesia. Logistik Terintegrasi Terpercaya.
          </div>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>Hubungi IT Support: support@pancaran-group.co.id</span>
            <span>&bull;</span>
            <span>PRAMA v1.0.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
