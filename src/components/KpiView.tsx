import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Download, 
  Award, 
  FileText, 
  RefreshCw, 
  Sliders, 
  Calendar, 
  ChevronRight, 
  Percent, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  Settings,
  Flame,
  HelpCircle
} from 'lucide-react';
import { DivisionKpiData, KpiItem, DivisionId } from '../types';
import { DIVISIONS } from '../data';
import { 
  INITIAL_KPI_PRESETS, 
  calculateKpiAchievement, 
  calculateOverallScore, 
  getKpiGrade 
} from '../utils/kpiPresets';
import { exportKpiToPDF } from '../utils/exporter';

interface KpiViewProps {
  onBackToDashboard?: () => void;
}

export default function KpiView({ onBackToDashboard }: KpiViewProps) {
  // Load or initialize all KPI data per division
  const [allKpis, setAllKpis] = useState<Record<string, DivisionKpiData>>(() => {
    const saved = localStorage.getItem('prama_kpi_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Make sure all divisions are loaded
        const merged = { ...INITIAL_KPI_PRESETS };
        Object.keys(parsed).forEach(key => {
          if (parsed[key] && parsed[key].kpis) {
            merged[key] = parsed[key];
          }
        });
        return merged;
      } catch (e) {
        console.error("Gagal mendecode simpanan KPI lokal:", e);
      }
    }
    return { ...INITIAL_KPI_PRESETS };
  });

  const [activeDivisionId, setActiveDivisionId] = useState<DivisionId>('comercial');
  const [editingKpiId, setEditingKpiId] = useState<string | null>(null);
  
  // States representing the KPI form
  const [formName, setFormName] = useState('');
  const [formTarget, setFormTarget] = useState<number>(100);
  const [formActual, setFormActual] = useState<number>(0);
  const [formUnit, setFormUnit] = useState('%');
  const [formWeight, setFormWeight] = useState<number>(25);
  const [formDirection, setFormDirection] = useState<'higher_better' | 'lower_better'>('higher_better');
  const [formDescription, setFormDescription] = useState('');

  // AI loading and notifications
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem('prama_kpi_data', JSON.stringify(allKpis));
  }, [allKpis]);

  const activeDivision = DIVISIONS.find(d => d.id === activeDivisionId) || DIVISIONS[0];
  const activeDivisionData = allKpis[activeDivisionId] || { divisionId: activeDivisionId, kpis: [] };

  // Calculate current scores
  const currentKpis = activeDivisionData.kpis;
  const overallScore = calculateOverallScore(currentKpis);
  const gradeCategory = getKpiGrade(overallScore);

  // Trigger brief alert messages
  const showAlert = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Start editing mode
  const handleStartEdit = (kpi: KpiItem) => {
    setEditingKpiId(kpi.id);
    setFormName(kpi.name);
    setFormTarget(kpi.target);
    setFormActual(kpi.actual);
    setFormUnit(kpi.unit);
    setFormWeight(kpi.weight);
    setFormDirection(kpi.direction);
    setFormDescription(kpi.description || '');
  };

  // Save the edited KPI
  const handleSaveKpiEdit = (id: string) => {
    if (!formName.trim()) {
      alert("Nama KPI tidak boleh kosong.");
      return;
    }
    if (formWeight <= 0) {
      alert("Bobot harus bernilai positif.");
      return;
    }

    const updatedKpis = currentKpis.map(k => {
      if (k.id === id) {
        return {
          ...k,
          name: formName,
          target: Number(formTarget),
          actual: Number(formActual),
          unit: formUnit,
          weight: Number(formWeight),
          direction: formDirection,
          description: formDescription
        };
      }
      return k;
    });

    setAllKpis({
      ...allKpis,
      [activeDivisionId]: {
        ...activeDivisionData,
        kpis: updatedKpis
      }
    });

    setEditingKpiId(null);
    showAlert("Indikator KPI berhasil disupervisi!");
  };

  // Add new Custom KPI
  const handleAddNewKpi = () => {
    const newId = `custom-kpi-${Date.now()}`;
    const newKpiItem: KpiItem = {
      id: newId,
      name: 'Indikator KPI Kerja Baru Baru',
      target: 100,
      actual: 85,
      unit: '%',
      weight: 20,
      direction: 'higher_better',
      description: 'Deskripsikan parameter pengukuran audit khusus fungsional divisi di sini.'
    };

    const updatedKpis = [...currentKpis, newKpiItem];

    setAllKpis({
      ...allKpis,
      [activeDivisionId]: {
        ...activeDivisionData,
        kpis: updatedKpis
      }
    });

    // Automatically transition into editing on creation
    handleStartEdit(newKpiItem);
    showAlert("KPI Kustom ditambahkan! Isilah nilainya.");
  };

  // Delete KPI Item
  const handleDeleteKpi = (id: string) => {
    if (currentKpis.length <= 1) {
      alert("Minimal harus menyisakan 1 Indikator KPI kerja.");
      return;
    }
    if (!confirm("Apakah Anda yakin ingin menghapus indikator KPI ini dari daftar audit?")) {
      return;
    }

    const updatedKpis = currentKpis.filter(k => k.id !== id);
    setAllKpis({
      ...allKpis,
      [activeDivisionId]: {
        ...activeDivisionData,
        kpis: updatedKpis
      }
    });
    setEditingKpiId(null);
    showAlert("Indikator KPI berhasil dihapus.");
  };

  // Reset current division to pristine preset template
  const handleResetToPresets = () => {
    if (!confirm(`Konfirmasi reset KPI divisi ${activeDivision.fullName} kembali ke cetakan awal? Seluruh perubahan kustom akan terhapus.`)) {
      return;
    }
    setAllKpis({
      ...allKpis,
      [activeDivisionId]: { ...INITIAL_KPI_PRESETS[activeDivisionId] }
    });
    setEditingKpiId(null);
    showAlert("Metrik divisi berhasil dikembalikan ke standar awal Pancaran.");
  };

  // Gemini AI Analysis API Trigger
  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const response = await fetch('/api/kpi/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          division: activeDivision.fullName,
          kpis: currentKpis,
          overallScore,
          grade: gradeCategory
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Gagal menghubungi mesin audit AI.");
      }

      setAllKpis(prev => ({
        ...prev,
        [activeDivisionId]: {
          ...prev[activeDivisionId],
          overallScore,
          grade: gradeCategory,
          analysisReport: result.text,
          analyzedAt: new Date().toLocaleString('id-ID')
        }
      }));

      showAlert("Analisis Audit AI PRAMA Berhasil Dimutakhirkan!");
    } catch (err: any) {
      console.error("KPI UI API Error:", err);
      setAnalysisError(err.message || "Gagal menjalankan asisten performa.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Local triggering for PDF Exporter
  const handleExportPdf = () => {
    if (!activeDivisionData.analysisReport) {
      // Trigger a raw prompt warning or run the audit simulation automatically
      alert("Silakan klik 'Mulai Analisis AI PRAMA' terlebih dahulu untuk menyusun analisis kualitatif sebelum melakukan cetak PDF.");
      return;
    }
    exportKpiToPDF(
      activeDivision.name,
      activeDivision.fullName,
      currentKpis,
      overallScore,
      gradeCategory,
      activeDivisionData.analysisReport
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" id="prama-kpi-workspace">
      {/* Upper Navigation Title Card */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs tracking-wider uppercase mb-1">
            <Award size={14} className="animate-pulse" />
            <span>Project Management Analytics Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Dashboard Pelaporan Kinerja & berbasis KPI
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Supervisi, ubah bobot sasaran capaian divisi, kumpulkan laporan analitis eksekutif terarah berbasis data kuantitatif secara instan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToPresets}
            className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg text-xs font-semibold transition"
            title="Reset to initial Pancaran templates"
          >
            <RefreshCw size={13} />
            <span>Reset Standar</span>
          </button>
          
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold transition shadow-sm"
            >
              Kembali ke Dashboard Utama
            </button>
          )}
        </div>
      </div>

      {/* Floating Alert Alert */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald-600 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-500"
          >
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Structural Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Division Navigation Rail */}
        <div className="lg:col-span-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-2">
              Daftar Divisi Pancaran
            </h2>
            <div className="space-y-1">
              {DIVISIONS.map(div => {
                const isSelected = activeDivisionId === div.id;
                const score = calculateOverallScore(allKpis[div.id]?.kpis || []);
                const devGrade = getKpiGrade(score).split(' ')[0]; // E.g. "A"
                
                return (
                  <button
                    key={div.id}
                    onClick={() => {
                      setActiveDivisionId(div.id as DivisionId);
                      setEditingKpiId(null);
                    }}
                    className={`w-full text-left rounded-xl p-3 border transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-800 border-slate-900 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-extrabold text-sm truncate flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${score >= 90 ? 'bg-emerald-500' : score >= 80 ? 'bg-sky-500' : 'bg-rose-500'}`} />
                        {div.name}
                      </div>
                      <div className={`text-2xs truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {div.fullName}
                      </div>
                    </div>
                    <div className={`flex flex-col items-end shrink-0 pl-1`}>
                      <span className={`text-sm font-black ${isSelected ? 'text-sky-300' : 'text-slate-800'}`}>
                        {score}%
                      </span>
                      <span className={`text-3xs px-1 py-0.5 rounded uppercase font-mono ${
                        isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Grade {devGrade}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 px-2">
              <h3 className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                <Info size={13} className="text-sky-500" />
                <span>Format Rekapitulasi</span>
              </h3>
              <p className="text-4xs text-slate-500 mt-1 leading-normal">
                Skor Tertimbang dihitung menggunakan formula: <br/>
                <code className="bg-slate-100 px-1 rounded text-slate-600">Sum(Pencapaian % &times; Bobot / 100)</code>.<br/>
                Arah metric higher_better menggunakan ratio <code className="bg-slate-100 px-1 font-mono">Actual/Target</code> sedangkan lower_better menggunakan rasio <code className="bg-slate-100 px-1 font-mono">Target/Actual</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Active Workspace */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active Division Summary Segment */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div>
                <span className="bg-slate-700 text-slate-300 font-mono text-2xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                  Divisi Terpilih
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {activeDivision.fullName}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {activeDivision.description}
                </p>
              </div>

              {/* Massive Score Gauge widget */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-start">
                <div>
                  <span className="text-3xs uppercase font-mono font-bold tracking-widest text-slate-400 block">
                    Skor Akhir Tertimbang
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-sky-400 tracking-tight">{overallScore}%</span>
                  </div>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-3xs uppercase font-mono font-bold tracking-widest text-slate-400 block">
                    Kualifikasi
                  </span>
                  <span className="inline-block mt-1 font-bold text-xs bg-sky-500 text-slate-950 px-2 py-0.5 rounded text-center">
                    {gradeCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Header Controls Segment */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sliders size={18} className="text-sky-600" />
                  <span>Daftar Parameter Indikator KPI</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Definisikan dan sesuaikan formulasi target, bobot pencapaian, serta arah target kerja.
                </p>
              </div>
              <button
                onClick={handleAddNewKpi}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow"
              >
                <Plus size={14} />
                <span>+ Definisikan KPI Kustom</span>
              </button>
            </div>

            {/* Main Interactive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="kpi-parameters-table">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-2xs uppercase tracking-wider">
                    <th className="py-3 px-3 text-center w-[5%]">No</th>
                    <th className="py-3 px-3 w-[45%]">Nama KPI & Penjelasan</th>
                    <th className="py-3 px-3 text-right w-[15%]">Sasaran (Target)</th>
                    <th className="py-3 px-3 text-right w-[15%]">Aktual (Realisasi)</th>
                    <th className="py-3 px-3 text-center w-[10%]">Bobot</th>
                    <th className="py-3 px-3 text-right w-[10%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentKpis.map((kpi, idx) => {
                    const achievement = calculateKpiAchievement(kpi.actual, kpi.target, kpi.direction);
                    const achievementColor = achievement >= 100 ? 'text-emerald-600 bg-emerald-50' : achievement >= 85 ? 'text-sky-600 bg-sky-50' : 'text-rose-600 bg-rose-50';
                    const isEditing = editingKpiId === kpi.id;

                    if (isEditing) {
                      return (
                        <tr key={kpi.id} className="bg-slate-50/80">
                          <td className="py-4 px-3 text-center text-xs font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-4 px-3 space-y-2">
                            <input
                              type="text"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Ketik nama indikator..."
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                            <textarea
                              rows={2}
                              value={formDescription}
                              onChange={(e) => setFormDescription(e.target.value)}
                              placeholder="Deskripsikan cara pengukuran..."
                              className="w-full px-3 py-1 bg-white border border-slate-300 rounded-lg text-3xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                            <div className="flex gap-4 items-center">
                              <label className="text-3xs text-slate-500 font-medium">Arah Pengukuran:</label>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setFormDirection('higher_better')}
                                  className={`px-2 py-0.5 text-4xs rounded font-bold uppercase transition ${
                                    formDirection === 'higher_better'
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                  }`}
                                >
                                  Makin Tinggi Makin Baik
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setFormDirection('lower_better')}
                                  className={`px-2 py-0.5 text-4xs rounded font-bold uppercase transition ${
                                    formDirection === 'lower_better'
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                  }`}
                                >
                                  Makin Rendah Makin Baik
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex flex-col items-end gap-1">
                              <input
                                type="number"
                                step="any"
                                value={formTarget}
                                onChange={(e) => setFormTarget(Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded text-right text-xs font-bold"
                              />
                              <input
                                type="text"
                                value={formUnit}
                                onChange={(e) => setFormUnit(e.target.value)}
                                placeholder="Unit"
                                className="w-16 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-center text-4xs"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex flex-col items-end gap-1">
                              <input
                                type="number"
                                step="any"
                                value={formActual}
                                onChange={(e) => setFormActual(Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded text-right text-xs font-bold"
                              />
                              <span className="text-4xs font-mono text-slate-400">Realisasi Kerja</span>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number"
                                value={formWeight}
                                onChange={(e) => setFormWeight(Number(e.target.value))}
                                className="w-12 px-1.5 py-1 bg-white border border-slate-300 rounded text-center text-xs font-bold"
                              />
                              <span className="text-xs text-slate-400">%</span>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex flex-col gap-1 items-end">
                              <button
                                onClick={() => handleSaveKpiEdit(kpi.id)}
                                className="w-full px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-4xs font-bold rounded"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setEditingKpiId(null)}
                                className="w-full px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-4xs font-medium rounded"
                              >
                                Batal
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={kpi.id} className="hover:bg-slate-50/50 group transition duration-150">
                        <td className="py-4 px-3 text-center text-xs font-semibold text-slate-400">{idx + 1}</td>
                        <td className="py-4 px-3">
                          <div className="font-extrabold text-sm text-slate-700">{kpi.name}</div>
                          {kpi.description && (
                            <div className="text-3xs text-slate-400 mt-0.5 leading-relaxed">{kpi.description}</div>
                          )}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-4xs px-1.5 py-0.5 rounded font-bold uppercase ${
                              kpi.direction === 'higher_better' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {kpi.direction === 'higher_better' ? 'Higher is Better' : 'Lower is Better'}
                            </span>
                            <span className={`text-4xs px-2 py-0.5 rounded-full font-bold ${achievementColor}`}>
                              Capaian: {achievement}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-right">
                          <span className="text-xs font-bold text-slate-600">{kpi.target.toLocaleString('id-ID')}</span>
                          <span className="text-3xs text-slate-400 ml-1">{kpi.unit}</span>
                        </td>
                        <td className="py-4 px-3 text-right font-mono">
                          <span className="text-xs font-extrabold text-slate-850">{kpi.actual.toLocaleString('id-ID')}</span>
                          <span className="text-3xs text-slate-400 ml-1">{kpi.unit}</span>
                        </td>
                        <td className="py-4 px-3 text-center">
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                            {kpi.weight}%
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleStartEdit(kpi)}
                              className="p-1 text-slate-400 hover:text-sky-600 hover:bg-slate-100 rounded transition"
                              title="Edit indikator"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteKpi(kpi.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition"
                              title="Hapus indikator"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Budget Warning Alert */}
            {currentKpis.reduce((acc, k) => acc + k.weight, 0) !== 100 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-center gap-2.5 text-2xs font-semibold">
                <AlertCircle size={14} className="shrink-0" />
                <span>
                  Perhatian: Total berat indikator saat ini adalah <strong>{currentKpis.reduce((acc, k) => acc + k.weight, 0)}%</strong>. Untuk penilaian audit formal disarankan total bobot bernilai genap <strong>100%</strong>.
                </span>
              </div>
            )}
          </div>

          {/* AI Performance Analysis & PDF Exporting Dock */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles size={18} className="text-sky-600" />
                  <span>Asisten Audit Kinerja AI PRAMA</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Konsolidasikan laporan, biarkan asisten virtual merumuskan interpretasi kualitatif dan opsi rekomendasi manajemen taktis.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleRunAiAnalysis}
                  disabled={isAnalyzing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                    isAnalyzing 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                  id="run-kpi-ai-analysis-btn"
                >
                  <Sparkles size={13} className={isAnalyzing ? 'animate-spin' : ''} />
                  <span>{isAnalyzing ? 'Mengevaluasi...' : 'Mulai Analisis AI PRAMA'}</span>
                </button>

                <button
                  onClick={handleExportPdf}
                  disabled={!activeDivisionData.analysisReport || isAnalyzing}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-extrabold transition shadow-sm ${
                    !activeDivisionData.analysisReport 
                      ? 'border-slate-250 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                  title={!activeDivisionData.analysisReport ? 'Analisis kinerja belum dibentuk' : 'Export and print audit PDF'}
                  id="export-kpi-report-pdf-btn"
                >
                  <Download size={13} />
                  <span>Ekspor Laporan PDF</span>
                </button>
              </div>
            </div>

            {/* Error alerts */}
            {analysisError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2 text-2xs font-semibold">
                <AlertCircle size={14} />
                <span>{analysisError}</span>
              </div>
            )}

            {/* Main analysis display portal */}
            <div className="bg-slate-850 text-slate-300 rounded-xl border border-slate-800 p-5 font-sans leading-relaxed text-xs relative min-h-[160px] max-h-[500px] overflow-y-auto shadow-inner">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-3 rounded-xl backdrop-blur-3xs"
                  >
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-3xs font-mono text-slate-400 tracking-widest uppercase">
                      Memformulasikan Evaluasi Kualitatif Kinerja...
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {activeDivisionData.analysisReport ? (
                <div className="space-y-4">
                  {/* Stamp Info */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-3xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText size={11} className="text-sky-500" />
                      METODE AUDIT: GENERATIVE AI INTERPRETATION REGISTRY
                    </span>
                    <span>DIANALISIS PADA: {activeDivisionData.analyzedAt || 'TIDAK TERDAFTAR'}</span>
                  </div>

                  {/* Render analysis report with elegant layout selectors */}
                  <div className="text-slate-300 space-y-4 font-sans antialiased text-xs">
                    {activeDivisionData.analysisReport.split('\n').map((p, pIdx) => {
                      const trimmed = p.trim();
                      if (!trimmed) return null;

                      // Headers
                      if (
                        trimmed.startsWith('RINGKASAN EKSEKUTIF') || 
                        trimmed.startsWith('EXECUTIVE SUMMARY') ||
                        trimmed.startsWith('DETAIL EVALUASI INDIKATOR') || 
                        trimmed.startsWith('PERFORMANCE EVALUATION') ||
                        trimmed.startsWith('REKOMENDASI TAKTIS MANAJEMEN') || 
                        trimmed.startsWith('MANAGEMENT RECOMMENDATIONS') ||
                        trimmed.startsWith('ANALISIS RISIKO') || 
                        trimmed.startsWith('RISK APPRAISAL')
                      ) {
                        return (
                          <h4 
                            key={pIdx} 
                            className="text-white font-extrabold text-sm tracking-wide border-l-2 border-sky-400 pl-2 mt-4 pt-1 text-slate-105"
                          >
                            {trimmed}
                          </h4>
                        );
                      }

                      // Bullet points
                      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                        return (
                          <div key={pIdx} className="flex items-start gap-2 text-slate-350 pl-3">
                            <span className="text-sky-400 mt-1 shrink-0">&bull;</span>
                            <span>{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }

                      // Standard paragraph
                      return (
                        <p key={pIdx} className="text-slate-300 leading-normal text-justify">
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="p-3 bg-slate-800 rounded-full text-slate-600 border border-slate-700">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-bold text-xs">Laporan Kualitatif Kinerja Belum Disusun</h4>
                    <p className="text-3xs text-slate-500 max-w-sm mt-1 mx-auto leading-normal">
                      Tekan & klik panel tombol <strong>"Mulai Analisis AI PRAMA"</strong> di atas. PRAMA AI Engine akan segera mengekstrak data KPI kuantitatif di atas untuk membuat ulasan audit formal.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
