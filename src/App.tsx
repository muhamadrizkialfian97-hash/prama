import React, { useState, useEffect, useRef } from 'react';
import { DIVISIONS } from './data';
import { DivisionId, ChatMessage } from './types';
import LoginView from './components/LoginView';
import LandingPage from './components/LandingPage';
import PancaranLogo from './components/PancaranLogo';
import KpiView from './components/KpiView';
import { 
  exportToWord, 
  exportToExcel, 
  exportToPPT, 
  exportToPDF 
} from './utils/exporter';
import { 
  Send, 
  FileText, 
  Layers, 
  LogOut, 
  RefreshCw, 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldAlert, 
  ClipboardCheck, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  Download,
  Info,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Activity,
  Calendar,
  Lock
} from 'lucide-react';

type ViewMode = 'landing' | 'login' | 'dashboard' | 'chat' | 'kpi';

// Maps division icons dynamically
const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp,
  Users,
  DollarSign,
  ShieldAlert,
  ClipboardCheck
};

const INITIAL_CHATS: Record<DivisionId, ChatMessage[]> = {
  comercial: [
    {
      id: 'com-init-1',
      role: 'assistant',
      content: `Selamat datang di modul **PRAMA Comercial & Business Development**. Saya siap membantu menyusun draf proposal tender, simulasi perhitungan biaya logistik (fleet-bidding), serta profitabilitas rute armada Pancaran Group.

Sebagai bahan evaluasi rute logistik darat utama kami, berikut adalah **Simulasi Perbandingan Tarif Logistik rute Jakarta - Surabaya**:

| Tipe Armada | Kapasitas Tonase | Tarif Standard (Rp) | Komponen BBM Solar (Ltr) | Estimasi Margin Bersih |
| :--- | :--- | :--- | :--- | :--- |
| Colt Diesel Double (CDD) | 4 Ton | Rp 5.000.000 | 120 Liter | 14.5% |
| Fuso Medium Ranger | 8 Ton | Rp 8.800.000 | 210 Liter | 18.2% |
| Tronton Wingbox Hino | 15 Ton | Rp 14.200.000 | 330 Liter | 21.0% |
| Trailer 40 Feet Flatbed | 25 Ton | Rp 19.500.000 | 480 Liter | 23.5% |

Anda dapat langsung mengekspor tabel simulasi tarif komersial di atas ke format **Excel, Word, PPT, atau PDF** menggunakan tombol ekspor di bawah untuk kebutuhan presentasi manajemen Pancaran Group.`,
      timestamp: new Date()
    }
  ],
  hca: [
    {
      id: 'hca-init-1',
      role: 'assistant',
      content: `Selamat datang di modul **PRAMA Human Capital & Affairs / Human Capital Assurance**. Saya siap mendukung Anda dalam penyusunan Key Performance Indicators (KPI) awak kapal & supir logistik darat, matriks kompetensi HRD, serta draf penilaian kinerja karyawan Pancaran Group.

Berikut adalah draf formulir **Matriks Penilaian Kompetensi Crew Logistik Darat (HCA Mastery Matrix)** untuk tahun buku berjalan:

| Kategori Kompetensi | Bobot Penilaian | Indikator Keberhasilan (SLA) | Skor Minimum Regulasi | Sertifikasi Pendukung |
| :--- | :--- | :--- | :--- | :--- |
| Keamanan & Defensive Driving | 30% | Zero-Accident dalam 12 bulan operasional | 85 / 100 | SIO Teraktif & Lisensi B2 |
| Ketepatan Waktu Bongkar/Muat | 25% | Keterlambatan rute kurang dari 2% total trip | 90 / 100 | Sertifikat Operasional GPS |
| Pemeliharaan Teknis Ringan | 20% | Pengecekan harian unit (Pre-checks) rutin | 80 / 100 | Diklat Mekanik Dasar |
| Sikap Kerja & Integritas | 25% | Bebas komplain dari Client & Unit Logistik | 85 / 100 | Surat Rekomendasi HRD |

Silakan ekspor matriks kompetensi SDM di atas dengan menekan menu ekspor di bawah.`,
      timestamp: new Date()
    }
  ],
  fina: [
    {
      id: 'fina-init-1',
      role: 'assistant',
      content: `Selamat datang di modul **PRAMA Finance & Administration**. Saya siap membantu Anda menyusun estimasi Operational Expense (OPEX), perhitungan rate depresiasi armada logistik darat & armada laut, serta rancangan simulasi Profit & Loss (P&L) triwulanan Pancaran Group.

Berikut adalah rancangan anggaran **Operational Expense (OPEX) bulanan untuk estimasi 50 unit armada truk trailer Hino500**:

| Komponen Anggaran | Alokasi per Unit (Rp) | Frekuensi | Total Anggaran bulanan (Rp) | Persentase Budget |
| :--- | :--- | :--- | :--- | :--- |
| Bahan Bakar Solar subsidi/non | Rp 18.000.000 | Setiap bulan | Rp 900.000.000 | 48.5% |
| Gaji & Uang Makan Driver | Rp 8.500.000 | Setiap bulan | Rp 425.000.000 | 22.9% |
| Maintenance & Suku Cadang Ban | Rp 4.200.000 | Setiap bulan | Rp 210.000.000 | 11.3% |
| Asuransi & Pajak Tahunan | Rp 1.500.000 | Setiap bulan | Rp 75.000.000 | 4.0% |
| Biaya Tol & Administrasi Jalan | Rp 5.000.000 | Setiap bulan | Rp 250.000.000 | 13.3% |

Anda bisa langsung mengirimkan file template kalkulasi budget operasional logistik ini agar diunduh ke Excel (.xlsx) atau PDF untuk diajukan ke CFO.`,
      timestamp: new Date()
    }
  ],
  lga: [
    {
      id: 'lga-init-1',
      role: 'assistant',
      content: `Selamat datang di modul **PRAMA Legal & Governance Affairs**. Saya siap membantu pengkajian klausul kontrak (Contract Review), kepatuhan regulasi logistik darat (Over Dimension Over Loading - ODOL), perizinan operasional pelayaran (barge/tongkang), serta GCG Pancaran Group.

Berikut adalah draf alternatif untuk **Klausul Pembatasan Tanggung Jawab (Limitation of Liability)** untuk melisensi kargo muatan bernilai tinggi:

| Klasifikasi Risiko | Penanggung Jawab | Batas Maksimum Ganti Rugi | Regulasi Pendukung | Status Kepatuhan |
| :--- | :--- | :--- | :--- | :--- |
| Kerusakan Barang Kargo | Pihak Ketiga Logistik | Selisih Premi Asuransi s.d Rp 100 Juta | UU Perkeretaapian & UU Pelayaran | Patuh (Compliant) |
| Keterlambatan Cuaca Laut | Force Majeure (Bebas klaim) | Tanpa ganti rugi (Reschedule gratis) | Pasal 1244 & 1245 KUHPerdata | Terverifikasi |
| Kehilangan Unit di Jalan Raya | Asuransi Jiwa & Fisik Sopir | Dilunasi Asuransi s.d Rp 350 Juta | Permenhub No. PM 60 Tahun 2019 | Patuh (Compliant) |
| Keretakan Struktural Lambung | Vendor Galangan Kapal | Biaya Perbaikan (Dry-dock) 100% | Peraturan BKI (Biro Klasifikasi Ind) | Terverifikasi |

Gunakan tombol di bawah untuk menginstruksikan ekspor draf klasifikasi klausul hukum ini ke format dokumen Word (.doc) atau PDF.`,
      timestamp: new Date()
    }
  ],
  spia: [
    {
      id: 'spia-init-1',
      role: 'assistant',
      content: `Selamat datang di modul **PRAMA Satuan Pengawasan Intern (SPIA)**. Saya siap membantu menyusun Kertas Kerja Audit (Audit Working Paper), check-list audit konsumsi BBM solar kapal & truk, mitigasi anomali/fraud operasional, serta pemantauan aksi korektif.

Berikut adalah **Formulir Kertas Kerja Audit (Audit Working Paper Template) BBM Solar Armada Tugboat**:

| Parameter Audit | Volume Standard | Realisasi Lapangan | Tingkat Selisih / Variansi | Klasifikasi Tingkat Risiko |
| :--- | :--- | :--- | :--- | :--- |
| Konsumsi Solar rute Kalimantan | 15.000 Liter | 15.420 Liter | +2.8% (Dalam batas wajar) | Rendah (Low Risk) |
| Konsumsi Solar rute Selat Sunda | 12.000 Liter | 13.250 Liter | +10.4% (Anomali transfer solar) | Tinggi (High Risk / Fraud Check) |
| Pengisian Depo Internal Merak | 80.000 Liter | 79.950 Liter | -0.06% (Sesuai tera teraan) | Sangat Rendah |
| Kalibrasi flow-meter digital | Sesuai SOP Tahunan | Terlambat 3 bulan | Belum dikalibrasi ulang | Sedang (Medium Risk) |

Rekomendasi audit ini bisa diekspor ke Microsoft Excel atau PDF sebagai lampiran laporan audit internal resmi tim SPIA Pancaran Group.`,
      timestamp: new Date()
    }
  ]
};

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeDivisionId, setActiveDivisionId] = useState<DivisionId>('comercial');
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [chats, setChats] = useState<Record<DivisionId, ChatMessage[]>>(INITIAL_CHATS);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemAlert, setSystemAlert] = useState<{ type: 'info' | 'warning' | 'success', text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on start
  useEffect(() => {
    const savedUser = localStorage.getItem('prama_user_email');
    if (savedUser) {
      setUserEmail(savedUser);
    }

    // Always start with fresh chat templates to comply with "selalu baru" requirement
    setChats(JSON.parse(JSON.stringify(INITIAL_CHATS)));

    // Check backend health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (!data.aiConfigured) {
          setSystemAlert({
            type: 'warning',
            text: 'Mode Simulasi Aktif: GEMINI_API_KEY server belum dikonfigurasi. Anda tetap dapat mengoperasikan chatbot dengan fallback simulasi dan fitur ekspor Word, Excel, PDF, dan PPT secara utuh hari ini.'
          });
        } else {
          setSystemAlert({
            type: 'success',
            text: 'PRAMA AI Engine terhubung sempurna. Respons chatbot ditenagai kecerdasan buatan Gemini 3.5 Flash secara real-time.'
          });
        }
      })
      .catch(err => {
        console.error("Health check error:", err);
      });
  }, []);

  // Save chats to localStorage on update
  const saveChatsToStorage = (updatedChats: Record<DivisionId, ChatMessage[]>) => {
    localStorage.setItem('prama_chats_data', JSON.stringify(updatedChats));
  };

  // Scroll to bottom helper
  useEffect(() => {
    if (currentView === 'chat') {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [chats, activeDivisionId, isLoading, currentView]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setCurrentView('dashboard');
    localStorage.setItem('prama_user_email', email);
    // Restart chats completely clean on login
    setChats(JSON.parse(JSON.stringify(INITIAL_CHATS)));
    localStorage.removeItem('prama_chats_data');
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari PRAMA?")) {
      setUserEmail(null);
      setCurrentView('landing');
      // Reset chatbot memory to clean state on logout
      setChats(JSON.parse(JSON.stringify(INITIAL_CHATS)));
      localStorage.removeItem('prama_user_email');
      localStorage.removeItem('prama_chats_data');
    }
  };

  const activeDivision = DIVISIONS.find(d => d.id === activeDivisionId) || DIVISIONS[0];
  const activeMessages = chats[activeDivisionId] || [];

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const promptToSend = (customText || inputText).trim();
    if (!promptToSend) return;

    if (!customText) {
      setInputText('');
    }

    // Append user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: promptToSend,
      timestamp: new Date()
    };

    const updatedDivisionMsgs = [...activeMessages, userMsg];
    const newChats = {
      ...chats,
      [activeDivisionId]: updatedDivisionMsgs
    };
    setChats(newChats);
    saveChatsToStorage(newChats);

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: promptToSend,
          division: activeDivisionId,
          history: updatedDivisionMsgs.slice(-8) // Send recent context
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Gagal mendapat balasan dari PRAMA.");
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.text,
        timestamp: new Date()
      };

      const finalChats = {
        ...chats,
        [activeDivisionId]: [...updatedDivisionMsgs, aiMsg]
      };
      setChats(finalChats);
      saveChatsToStorage(finalChats);

    } catch (err: any) {
      console.warn("AI error, running fallback simulation response:", err);
      
      // Fallback response for offline / simulated environment
      let customFallbackAnswer = `Saya mencatat permintaan Anda mengenai "${promptToSend}". Berikut adalah kerangka kerja simulasi perhitungan yang siap diekspor berdasarkan database Pancaran Group:

### Rekomendasi Templat Taktis - ${activeDivision.name} (Offline Simulasi)

| Indikator Proyek | Parameter Nilai | Estimasi Toleransi | Penanggung Jawab | Catatan Tambahan Pemenuhan |
| :--- | :--- | :--- | :--- | :--- |
| Total Biaya Distribusi | Rp 1.420.000.000 | +/- 5% deviasi | Divisi ${activeDivision.name} | Berdasarkan indeks BBM Solar terbaru |
| Target Efisiensi Fleet | 92.5% Optimal | Batas minimum 88% | Fleet Scheduler | Monitor berkala via GPS Telematic |
| Durasi Penyelesaian | 14 Hari Kerja | Max 18 Hari | Ops Manager | Sanksi keterlambatan 1‰ per hari |
| Tingkat Keamanan | Zero Accident | Mutlak | Team HSSE & HCA | Dikawal program induksi keselamatan |

Silakan gunakan tombol ekspor di bawah untuk mengambil template kalkulasi rancangan ini dalam format Word, PPT, PDF, atau Excel!`;

      // Simulating realistic delay
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: `ai-fallback-${Date.now()}`,
          role: 'assistant',
          content: customFallbackAnswer,
          timestamp: new Date()
        };
        const finalChats = {
          ...chats,
          [activeDivisionId]: [...updatedDivisionMsgs, fallbackMsg]
        };
        setChats(finalChats);
        saveChatsToStorage(finalChats);
        setIsLoading(false);
      }, 1000);

      return;
    }

    setIsLoading(false);
  };

  const handleClearHistory = () => {
    if (confirm(`Apakah Anda yakin ingin mengatur ulang riwayat chat untuk Divisi ${activeDivision.name}?`)) {
      const resetChats = {
        ...chats,
        [activeDivisionId]: INITIAL_CHATS[activeDivisionId]
      };
      setChats(resetChats);
      saveChatsToStorage(resetChats);
    }
  };

  // 1. Landing view (Video Welcome Page)
  if (currentView === 'landing') {
    return (
      <LandingPage
        savedUserEmail={userEmail}
        onProceed={() => {
          if (userEmail) {
            setCurrentView('dashboard');
          } else {
            setCurrentView('login');
          }
        }}
        onQuickProceedAsUser={() => {
          if (userEmail) {
            setCurrentView('dashboard');
          }
        }}
      />
    );
  }

  // 2. Login view (Sign-in form view with capability to head back to visual landing page)
  if (currentView === 'login' || (!userEmail && currentView !== 'landing')) {
    return (
      <LoginView
        onLoginSuccess={handleLogin}
        onBackToLanding={() => {
          setCurrentView('landing');
        }}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans overflow-x-hidden antialiased" id="prama-panel-root">
      
      {/* Top Navbar: Shared by both views but optimized for a clean, bright appearance */}
      <nav className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-8 shrink-0 relative z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="w-10 h-10 bg-[#00A4E4] hover:bg-[#008fca] rounded-xl flex items-center justify-center shadow-sm shadow-[#00A4E4]/20 transition-all cursor-pointer"
            title="Kembali ke Dashboard Utama"
          >
            <span className="text-white font-display font-black text-xl tracking-wider">P</span>
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 font-display">PRAMA SYSTEM</h1>
              <span className="text-[9px] bg-[#00A4E4]/10 border border-[#00A4E4]/25 text-[#00A4E4] font-bold px-1.5 py-0.5 rounded leading-none">Enterprise</span>
            </div>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5 font-mono">Project Management Analytics</p>
          </div>
        </div>

        {/* Global Navigation Tabs inside top Navbar */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-xl shadow-xs">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-150 flex items-center gap-1.5 tracking-tight cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-white text-slate-800 border border-slate-200/50 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <span>Dashboard Utama</span>
          </button>
          
          <button
            onClick={() => setCurrentView('kpi')}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-150 flex items-center gap-1.5 tracking-tight cursor-pointer ${
              currentView === 'kpi'
                ? 'bg-sky-600 text-white shadow shadow-sky-600/25 border border-sky-600'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
            }`}
            id="nav-kpi-btn"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Manajemen KPI & Kinerja</span>
          </button>
        </div>

        {/* Global Connection / System Alerts Header Info (Light themed styling) */}
        {systemAlert && (
          <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-4 py-1.5 max-w-xl text-[11px] text-slate-600">
            {systemAlert.type === 'warning' ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span className="truncate"><strong>Status:</strong> Mode Simulasi Terjamin. Klik Hub Divisi untuk Mulai.</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#00A4E4] shrink-0 animate-pulse" />
                <span className="truncate text-slate-700 font-medium">Konektivitas Enkripsi Korporat Aktif Nyata.</span>
              </>
            )}
          </div>
        )}

        {/* Right side user details log block */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-none">{userEmail.split('@')[0].toUpperCase()}</p>
              <p className="text-[9px] text-emerald-600 font-semibold mt-1 select-none flex items-center gap-1 justify-end uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Pancaran Staff
              </p>
            </div>
            
            {/* Round Avatar badge using first letters */}
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden font-display font-bold text-xs text-[#0B2C56] shadow-sm select-none">
              {userEmail.substring(0, 2).toUpperCase()}
            </div>

            {/* Logout Trigger button */}
            <button 
              onClick={handleLogout}
              className="p-1 px-2 border border-slate-200 rounded-lg hover:border-red-300 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all text-xs flex items-center gap-1 cursor-pointer"
              title="Keluar dari sistem"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* VIEW PANEL 1: DETAILED CORPORATE DASHBOARD GRID & ONBOARDING HUB */}
      {currentView === 'dashboard' && (
        <div className="flex-1 overflow-y-auto" id="dashboard-view-panel">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
            
            {/* Header Hero Banner with ambient video and glowing shadow reflections */}
            <section className="relative rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,164,228,0.25)] border border-white/10 hover:shadow-[0_25px_60px_rgba(0,164,228,0.35)] transition-all duration-500 overflow-hidden bg-slate-950">
              
              {/* Cinematic Looping Background Video for Dashboard */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-50 scale-102 filter brightness-[0.45] contrast-105"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-docked-at-a-port-terminal-aerial-view-41485-large.mp4" type="video/mp4" />
                </video>
                {/* Visual blue overlay gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B2C56]/90 via-indigo-950/80 to-slate-950/90 mix-blend-multiply" />
                {/* Tech digital sweep effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00A4E4]/10 to-transparent" />
              </div>

              {/* Glowing Ambient Glow 'Shadows' representing the video reflection */}
              <div className="absolute -bottom-8 left-12 right-12 h-6 bg-[#00A4E4] opacity-35 blur-[35px] rounded-full pointer-events-none animate-pulse" />
              <div className="absolute -bottom-8 left-1/3 w-1/3 h-6 bg-amber-500 opacity-20 blur-[25px] rounded-full pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-200 w-fit mb-4">
                  <Activity className="h-4 w-4 text-sky-200 animate-pulse" />
                  Pancaran Live Hub &bull; Fleet Monitoring
                </div>
                <h2 className="font-display text-2xl sm:text-3.5xl font-black tracking-tight leading-none">
                  PRAMA Enterprise AI Hub
                </h2>
                <p className="text-sky-100 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  Selamat bekerja, Rekan <strong>{userEmail}</strong>. Sistem PRAMA mengaktivasi koneksi asisten AI divisi komersial & operasional Pancaran Group. Silakan pilih hub divisi di bawah untuk merumuskan draf penugasan instan.
                </p>
                
                {/* Immediate Access Button for new KPI Workspace */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setCurrentView('kpi')}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 border border-sky-500 text-white font-extrabold rounded-xl text-xs transition duration-150 cursor-pointer shadow-md shadow-sky-600/20 active:scale-[0.98]"
                    id="hero-go-kpi-btn"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Supervisi Laporan Kinerja & KPI Divisi</span>
                  </button>
                </div>
                
                {/* Embedded quick search summary metrics widgets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs text-slate-100 font-medium">
                  <div>
                    <span className="text-sky-300 font-mono text-[10px] block font-bold uppercase">DIVISI AKTIF</span>
                    <strong className="text-sm sm:text-base font-display">5 Departemen</strong>
                  </div>
                  <div>
                    <span className="text-sky-300 font-mono text-[10px] block font-bold uppercase">FLEET REGISTRY</span>
                    <strong className="text-sm sm:text-base font-display">Marine & Land</strong>
                  </div>
                  <div>
                    <span className="text-sky-300 font-mono text-[10px] block font-bold uppercase">DOKUMEN EKSPOR</span>
                    <strong className="text-sm sm:text-base font-display">Word, Excel, PDF, PPT</strong>
                  </div>
                  <div>
                    <span className="text-sky-300 font-mono text-[10px] block font-bold uppercase">KONEKSI MODEL</span>
                    <strong className="text-sm sm:text-base font-display font-mono">Gemini 3.5 Flash</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Division Hub Grid Segment */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
                    <Layers className="h-5 w-5 text-[#00A4E4]" />
                    Pilih Hub Divisi Khusus
                  </h3>
                  <p className="text-xs text-slate-500">Klik salah satu divisi di bawah untuk memproses instruksi analisa di ruang obrolan cerdas.</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Sesi: {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                </div>
              </div>

              {/* Grid Cards Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="dashboard-grid-container">
                {DIVISIONS.map((div) => {
                  const IconComponent = iconMap[div.iconName] || HelpCircle;
                  return (
                    <div
                      key={div.id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                      id={`div-card-${div.id}`}
                    >
                      {/* Top Accent Color strip indicating division category */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-[#00A4E4]/40 group-hover:bg-[#00A4E4] transition-colors`} />

                      {/* Card Content block */}
                      <div>
                        {/* Shorthand line */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-slate-50 text-[#0B2C56] border border-slate-100 rounded-xl group-hover:scale-105 transition-transform duration-300">
                            <IconComponent className="h-5 w-5 text-[#00A4E4]" />
                          </div>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                            {div.id}
                          </span>
                        </div>

                        {/* Title descriptions */}
                        <h4 className="text-slate-900 font-black text-base tracking-wide group-hover:text-[#00A4E4] transition-colors">
                          {div.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 font-display">
                          {div.fullName}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {div.shortDescription}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">PROFIL ANALISIS</span>
                          <p className="text-xs text-slate-600 line-clamp-3 italic leading-relaxed">
                            "{div.description}"
                          </p>
                        </div>
                      </div>

                      {/* Primary Navigation button to push to Stage 2 Chat page directly */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            // Deep clone the clean initial greeting for this division to ensure the chat is always fresh on entering!
                            const freshGreeting = JSON.parse(JSON.stringify(INITIAL_CHATS[div.id]));
                            setChats(prev => ({
                              ...prev,
                              [div.id]: freshGreeting
                            }));
                            setActiveDivisionId(div.id);
                            setCurrentView('chat');
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-3 bg-[#00A4E4] hover:bg-[#008fca] text-white font-bold rounded-xl text-xs transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
                          id={`btn-proceed-${div.id}`}
                        >
                          <span>Masuk Tahap Analisis AI</span>
                          <ArrowRight className="h-3.5 w-3.5 text-white" />
                        </button>
                        
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                          <span>{div.samplePrompts.length} Preset Perhitungan</span>
                          <span className="text-emerald-600 font-bold select-none uppercase tracking-wider">Ready • Online</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick guide box displayed perfectly under light theme */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 mb-4">
                <div className="p-1.5 bg-slate-100 rounded-lg text-[#00A4E4]">
                  <Info className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0B2C56] font-display">
                  SOP Standar Operasional PRAMA Enterprise Assistant
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[#00A4E4] font-bold text-sm block mb-1">01. Tentukan Bidang</span>
                  <p>Tentukan analisis yang dibutuhkan berdasarkan 5 pilar departemen Pancaran Group: Komersial, Kepegawaian (HCA), Finansial (FINA), Legalitas (LGA), atau Kertas Kerja Audit (SPIA).</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[#00A4E4] font-bold text-sm block mb-1">02. Buka Ruang Chat Khusus</span>
                  <p>Klik tombol <strong>"Masuk Tahap Analisis AI"</strong> pada salah satu kartu departemen untuk berpindah ke halaman program khusus asisten AI yang membawa preset memori bidang tersebut.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[#00A4E4] font-bold text-sm block mb-1">03. Hitung & Ekspor Berkas</span>
                  <p>Ketik perintah atau gunakan saran preset. AI akan mengkalkulasi tabel data. Anda bisa langsung mengunduh hasil dalam format Word, Excel, PowerPoint, atau cetak lembar PDF instan.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      )}

      {/* VIEW PANEL 2: COMPREHENSIVE AI CHAT WORKSPACE (DEDICATED FULL SCREEN WITH BACK CONTROLLER) */}
      {currentView === 'chat' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative" id="chat-view-panel">
          
          {/* Quick-switch Mini Sidebar: Allows high portability between rooms directly inside the light-themed chat page */}
          <div className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col py-4 px-3 shrink-0">
            <span className="text-[10px] font-bold tracking-widest text-[#0B2C56] uppercase block mb-3 px-2 font-mono">
              Hub Navigasi Pintar
            </span>
            
            {/* Quick Switch Button elements */}
            <div className="space-y-1.5 flex-1">
              {DIVISIONS.map((div) => {
                const IconComponent = iconMap[div.iconName] || HelpCircle;
                const isSelected = activeDivisionId === div.id;
                return (
                  <button
                    key={div.id}
                    onClick={() => {
                      // Deep clone the clean initial greeting to ensure the chat starts fresh
                      const freshGreeting = JSON.parse(JSON.stringify(INITIAL_CHATS[div.id]));
                      setChats(prev => ({
                        ...prev,
                        [div.id]: freshGreeting
                      }));
                      setActiveDivisionId(div.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#0004E4]/5 border-[#00A4E4]/30 text-[#00A4E4] font-bold shadow-sm' 
                        : 'bg-white border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#00A4E4]/10 text-[#00A4E4]' : 'bg-slate-50 text-slate-500'}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <span className="block font-bold">{div.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono leading-none">{div.id} unit</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back bottom trigger in sidebar */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mt-auto w-full py-2.5 border border-slate-200 hover:border-[#00A4E4] bg-slate-50 hover:bg-[#00A4E4]/5 text-slate-700 hover:text-[#00A4E4] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Dashboard</span>
            </button>
          </div>

          {/* Core Chat Module block take remaining width */}
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
            
            {/* Active AI Room Metadata Sub-Header */}
            <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 shadow-sm">
              <div className="flex items-center gap-3">
                
                {/* Back Button for smaller/mid devices and fast navigation */}
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="p-2 border border-slate-200 hover:border-[#008fca] bg-slate-100 hover:bg-[#00A4E4]/10 text-slate-600 hover:text-[#00A4E4] rounded-xl transition-all cursor-pointer"
                  title="Kembali ke Dashboard Hub"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="w-8 h-8 rounded-xl bg-[#00A4E4]/10 text-[#00A4E4] border border-[#00A4E4]/20 flex items-center justify-center shadow-inner">
                  {React.createElement(iconMap[activeDivision.iconName] || HelpCircle, { className: 'h-4 w-4 text-[#00A4E4]' })}
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    Asisten PRAMA &bull; {activeDivision.name}
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold">{activeDivision.fullName}</p>
                </div>
              </div>

              {/* Functional helpers and connection alerts */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleClearHistory}
                  className="p-1 px-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Seka ucal data percakapan divisi ini"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset Saluran</span>
                </button>
                <span className="flex items-center gap-1 text-[9px] text-emerald-700 uppercase font-bold tracking-wider bg-emerald-50 border border-emerald-100 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready
                </span>
              </div>
            </div>

            {/* Chat Timeline (Scroll Box) */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 custom-scrollbar scrollbar-thin">
              
              {/* Informative system banner at top of messages */}
              <div className="bg-[#00A4E4]/5 border border-[#00A4E4]/20 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
                <Info className="h-4 w-4 text-[#00A4E4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Ruang Obrolan Model AI Khusus: {activeDivision.fullName}</p>
                  <p className="mt-1">
                    Ajukan dokumen penugasan atau hitungan operasional logistik di bawah. Apabila AI merumuskan tabel matriks, gunakan portal premium unduhan di bawah bubble obrolan untuk mengotomatisasi dokumen siap saji.
                  </p>
                </div>
              </div>

              {/* Loaded message bubbles */}
              {activeMessages.map((msg, idx) => {
                const isAi = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id || idx}
                    className={`flex flex-col gap-2 max-w-[92%] sm:max-w-[85%] ${isAi ? 'self-start' : 'self-end'}`}
                  >
                    <div className={`p-4 sm:p-5 rounded-2xl relative shadow-sm border ${
                      isAi 
                        ? 'bg-white border-slate-200 text-slate-800 rounded-tl-none' 
                        : 'bg-[#00A4E4]/10 border-[#00A4E4]/20 text-[#0B2C56] rounded-tr-none'
                    }`}>
                      {/* Bubble role label & timestamp */}
                      <div className="flex items-center gap-1.5 mb-2.5 text-[10px] font-mono font-bold text-slate-400">
                        <span className={isAi ? 'text-[#00A4E4]' : 'text-[#0B2C56]'}>
                          {isAi ? `PRAMA AI (DIVISI ${activeDivision.name.toUpperCase()})` : 'STAFF PANCARAN'}
                        </span>
                        <span>&bull;</span>
                        <span>
                          {(() => {
                            try {
                              const d = typeof msg.timestamp === 'string' || typeof msg.timestamp === 'number'
                                ? new Date(msg.timestamp)
                                : msg.timestamp;
                              return d instanceof Date && !isNaN(d.getTime())
                                ? d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                                : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                            } catch (e) {
                              return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                            }
                          })()}
                        </span>
                      </div>
                      {/* Content block with beautiful markdown simulated table rules */}
                      <div className="text-xs sm:text-[13px] leading-relaxed space-y-3 whitespace-pre-wrap font-sans text-slate-700">
                        {msg.content.split('\n').map((line, lIdx) => {
                          const trimmed = line.trim();
                          
                          // Table row formatting (Designed highly for light bright corporate UI)
                          if (trimmed.startsWith('|')) {
                            const cells = line.split('|').map(c => c.trim()).filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
                            if (line.includes('---')) {
                              return null; // Skip markdown line dividers
                            }
                            
                            // Guess if first line or contains bold titles indicating it's a table header card
                            const isHeading = lIdx === 1 || msg.content.split('\n')[lIdx - 1]?.includes('---') || msg.content.split('\n')[lIdx - 2]?.includes('---');
                            
                            return (
                              <div 
                                key={lIdx} 
                                className={`grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2 py-2 px-3 border-b border-slate-200 font-sans text-[11px] sm:text-xs ${
                                  isHeading 
                                    ? 'bg-[#0B2C56] text-white border-b-2 border-[#00A4E4] font-bold rounded-t-lg' 
                                    : 'bg-white text-slate-800 hover:bg-slate-50'
                                }`}
                              >
                                {cells.map((cell, cIdx) => {
                                  const cellClean = cell.replace(/\*/g, '').replace(/#/g, '');
                                  return <span key={cIdx} className="truncate font-semibold" title={cellClean}>{cellClean}</span>;
                                })}
                              </div>
                            );
                          }

                          // Heading parser (Strip hashtags and asterisks cleanly for professional view)
                          if (trimmed.startsWith('###')) {
                            const headerText = trimmed.replace(/#/g, '').replace(/\*/g, '').trim();
                            return (
                              <h4 key={lIdx} className="text-[#0B2C56] font-black font-display text-sm sm:text-base mt-4 mb-1.5 flex items-center gap-1.5 border-b border-slate-100 pb-1">
                                <Sparkles className="h-4 w-4 text-[#00A4E4] shrink-0" />
                                {headerText}
                              </h4>
                            );
                          }
                          if (trimmed.startsWith('##')) {
                            const headerText = trimmed.replace(/#/g, '').replace(/\*/g, '').trim();
                            return (
                              <h3 key={lIdx} className="text-[#0B2C56] font-display font-black text-base mt-5 mb-2 border-l-4 border-[#00A4E4] pl-2.5">
                                {headerText}
                              </h3>
                            );
                          }
                          if (trimmed.startsWith('#')) {
                            const headerText = trimmed.replace(/#/g, '').replace(/\*/g, '').trim();
                            return (
                              <h2 key={lIdx} className="text-[#0B2C56] font-display font-black text-lg mt-5 mb-2">
                                {headerText}
                              </h2>
                            );
                          }

                          // Lists parser (Standard beautiful indentation bullet, strip leading - or * and stray symbols)
                          if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                            const listText = trimmed.substring(1).replace(/\*/g, '').replace(/#/g, '').trim();
                            return (
                              <div key={lIdx} className="flex gap-2 pl-2 text-slate-600 font-semibold my-1">
                                <span className="text-[#00A4E4] font-bold">&bull;</span>
                                <span>{listText}</span>
                              </div>
                            );
                          }

                          // Bold words parser (**text** style) but stripped of actual '*'
                          let renderedPhrase: React.ReactNode = line;
                          if (line.includes('**')) {
                            const parts = line.split('**');
                            renderedPhrase = parts.map((chunk, cIdx) => 
                              cIdx % 2 === 1 
                                ? <strong key={cIdx} className="text-[#0B2C56] bg-slate-100 px-1 py-0.5 rounded font-black font-sans">{chunk.replace(/\*/g, '').replace(/#/g, '')}</strong> 
                                : chunk.replace(/\*/g, '').replace(/#/g, '')
                            );
                          } else {
                            renderedPhrase = line.replace(/\*/g, '').replace(/#/g, '');
                          }

                          return <p key={lIdx} className="mb-1 leading-relaxed text-slate-600 font-medium">{renderedPhrase}</p>;
                        })}
                      </div>
                    </div>

                    {/* Integrated file exporter controller block directly under the AI bubble */}
                    {isAi && (
                      <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl rounded-tr-xl p-4 flex flex-col gap-3 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            Kalkulasi Valid. Siap diubah ke dokumen resmi.
                          </span>
                          <span className="text-[9px] text-[#00A4E4] font-extrabold select-none uppercase tracking-widest bg-[#00A4E4]/10 border border-[#00A4E4]/15 px-2 py-0.5 rounded font-mono w-fit">
                            INTEGRATED EXPORTER
                          </span>
                        </div>
                        
                        {/* Exporter buttons grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <button 
                            onClick={() => exportToWord("PRAMA Template", activeDivision.name, msg.content)}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-[#0010E4]/5 border border-slate-200 hover:border-[#00A4E4] text-slate-700 hover:text-slate-900 rounded-xl text-[11px] font-bold cursor-pointer transition-all active:scale-[0.97]"
                          >
                            <span className="text-blue-500 font-bold text-[9px] uppercase font-mono bg-blue-50 px-1.5 rounded leading-none border border-blue-200">Word</span>
                            <span>.doc</span>
                          </button>

                          <button 
                            onClick={() => exportToPPT("PRAMA Template", activeDivision.name, msg.content)}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-orange-500/5 border border-slate-200 hover:border-orange-500 text-slate-700 hover:text-slate-900 rounded-xl text-[11px] font-bold cursor-pointer transition-all active:scale-[0.97]"
                          >
                            <span className="text-orange-600 font-bold text-[9px] uppercase font-mono bg-orange-50 px-1.5 rounded leading-none border border-orange-200">PPT</span>
                            <span>.html</span>
                          </button>

                          <button 
                            onClick={() => exportToPDF("PRAMA Template", activeDivision.name, msg.content)}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-red-500/5 border border-slate-200 hover:border-red-500 text-slate-700 hover:text-slate-900 rounded-xl text-[11px] font-bold cursor-pointer transition-all active:scale-[0.97]"
                          >
                            <span className="text-red-600 font-bold text-[9px] uppercase font-mono bg-red-50 px-1.5 rounded leading-none border border-red-200">PDF</span>
                            <span>.pdf</span>
                          </button>

                          <button 
                            onClick={() => exportToExcel("PRAMA Template", activeDivision.name, msg.content)}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-emerald-500/5 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-slate-900 rounded-xl text-[11px] font-bold cursor-pointer transition-all active:scale-[0.97]"
                          >
                            <span className="text-emerald-700 font-bold text-[9px] uppercase font-mono bg-emerald-50 px-1.5 rounded leading-none border border-emerald-200">Excel</span>
                            <span>.xls</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing simulation bubble */}
              {isLoading && (
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none max-w-[80%] self-start flex flex-col gap-1.5 shadow-sm">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-[#00A4E4] animate-pulse" />
                    PRAMA Sedikit Mengevaluasi Matriks Data...
                  </span>
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-2.5 h-2.5 bg-[#00A4E4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2.5 h-2.5 bg-[#00A4E4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2.5 h-2.5 bg-[#00A4E4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Float quick-switch prompt presets block directly on chat UI bottom */}
            <div className="px-4 py-3 border-t border-slate-200 bg-white relative z-10 shadow-inner">
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase block mb-2 flex items-center gap-1 select-none">
                <Sparkles className="h-3.5 w-3.5 text-[#00A4E4]" />
                Saran Pertanyaan Preset (Klik Untuk Mengisi Form)
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar scrollbar-thin">
                {activeDivision.samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(p);
                    }}
                    className="flex-none bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#00A4E4] text-slate-600 hover:text-slate-800 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer transition-all max-w-xs truncate"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Message input composer controller */}
            <div className="p-4 border-t border-slate-200 bg-white relative z-10">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  required
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Konsultasikan draf proposal / audit perhitungan divisi ${activeDivision.name}...`}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00A4E4] rounded-2xl pl-4 pr-12 py-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00A4E4] transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2.5 top-2.5 p-2.5 bg-[#00A4E4] hover:bg-[#008fca] disabled:bg-slate-100 text-white disabled:text-slate-400 rounded-xl transition-all cursor-pointer shadow-sm shadow-[#00A4E4]/10"
                  title="Kirim Instruksi"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* VIEW PANEL 3: COMPREHENSIVE KPI & PERFORMANCE ANALYTICS WORKSPACE */}
      {currentView === 'kpi' && (
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <KpiView onBackToDashboard={() => setCurrentView('dashboard')} />
        </div>
      )}

      {/* Corporate bottom layout footer bar */}
      <footer className="h-8 border-t border-slate-200 bg-white flex items-center justify-between px-4 sm:px-8 shrink-0 relative z-30 select-none text-[9px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00A4E4]"></span> System ID: Pancaran-PRM-0092X</span>
          <span className="hidden sm:inline">Koneksi Enkripsi Korporat Aman</span>
        </div>
        <p className="truncate">&copy; 2026 PRAMA AI &bull; Pancaran Group Indonesia &bull; Logistik Terpadu</p>
      </footer>
    </div>
  );
}
