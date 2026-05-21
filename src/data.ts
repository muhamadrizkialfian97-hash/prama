import { Division } from './types';

export const DIVISIONS: Division[] = [
  {
    id: 'comercial',
    name: 'Comercial',
    fullName: 'Comercial & Business Development',
    shortDescription: 'Manajemen Penawaran, Bidding Logistik, & Kontrak Bisnis',
    description: 'Fokus pada analisis tarif logistik darat & laut, pembuatan simulasi bidding proyek tambang/kargo, estimasi profitabilitas rute armada, serta pemeliharaan kontrak klien strategis Pancaran Group.',
    iconName: 'TrendingUp',
    accentColor: 'border-emerald-500 text-emerald-600',
    bgGradient: 'from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-100',
    samplePrompts: [
      "Buat simulasi rekap komparasi tarif logistik darat rute Jakarta-Surabaya menggunakan tipe armada CDD vs Fuso.",
      "Tulis draf Executive Summary proposal tender pengangkutan batu bara jalur laut Pancaran Group wilayah Kalimantan Barat.",
      "Hitung proyeksi pendapatan tahunan jika target shipment batubara adalah 1.500.000 ton dengan tarif Rp 85.000 per ton.",
      "Buat template perhitungan BEP (Break Even Point) penyewaan armada Tug & Barge ukuran 300 kaki."
    ]
  },
  {
    id: 'hca',
    name: 'HCA',
    fullName: 'Human Capital & Affairs',
    shortDescription: 'SDM, HRD, Rekrutmen, & Manajemen Kinerja Karyawan',
    description: 'Fokus pada desain matriks kompetensi awak kapal dan pengemudi truk, perumusan Key Performance Indicators (KPI) supir logistik, sistem shift kerja, draf form Penilaian Kinerja Tahunan (Appraisal Form), serta regulasi lingkungan kerja (HRD).',
    iconName: 'Users',
    accentColor: 'border-sky-500 text-sky-600',
    bgGradient: 'from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 border-sky-100',
    samplePrompts: [
      "Buat matriks penilaian kompetensi (HCA Mastery Matrix) untuk Pengemudi Truk Trailer B-Double.",
      "Tulis rumusan Key Performance Indicators (KPI) dan indikator keberhasilan bagi Head of Maintenance Armada Darat.",
      "Desain tabel lembar penilaian kinerja tahunan (Appraisal Template) komprehensif bagi Staff Administrasi Logistik.",
      "Buat draf kebijakan program Kesejahteraan Driver (Driver Welfare Program) untuk menekan angka turnover driver logistik."
    ]
  },
  {
    id: 'fina',
    name: 'FINA',
    fullName: 'Finance, Administration & Accounting',
    shortDescription: 'Anggaran, Cash Flow, Estimasi P&L, & Manajemen Pajak',
    description: 'Fokus pada perencanaan anggaran operasional dwi-mingguan, perhitungan depresiasi armada truk trailer & tongkang, rancangan simulasi Rugi Laba (P&L) unit logistik, optimalisasi biaya bahan bakar (BBM), serta rekonsiliasi faktur.',
    iconName: 'DollarSign',
    accentColor: 'border-amber-500 text-amber-600',
    bgGradient: 'from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-100',
    samplePrompts: [
      "Susun simulasi anggaran operational expense (OPEX) bulanan untuk 50 unit truk trailer Hino500.",
      "Hitung depresiasi aset kapal tongkang seharga Rp 22 Miliar dengan metode garis lurus selama masa manfaat 10 tahun.",
      "Buat visualisasi rancangan Profit & Loss (Rugi Laba) sederhana untuk proyek logistik pengangkutan kelapa sawit (CPO).",
      "Buat draf cash flow forecast mingguan dengan input penerimaan piutang Rp 4 Miliar dan pengeluaran bahan bakar Rp 2,1 Miliar."
    ]
  },
  {
    id: 'lga',
    name: 'LGA',
    fullName: 'Legal & Governance Affairs',
    shortDescription: 'Kepatuhan Hukum, GCG, Tinjauan Kontrak, & Perizinan',
    description: 'Membantu draf klausul alternatif untuk Memorandum of Understanding (MoU), pemenuhan lisensi operasional transportasi laut/darat Republik Indonesia, tinjauan resiko hukum (ODOL compliance), hingga pilar pengelolaan Good Corporate Governance.',
    iconName: 'ShieldAlert',
    accentColor: 'border-violet-500 text-violet-600',
    bgGradient: 'from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 border-violet-100',
    samplePrompts: [
      "Tuliskan draf klausul Pembatasan Tanggung Jawab (Limitation of Liability) yang tangguh dalam kontrak pengiriman laut Pancaran Group.",
      "Buat daftar periksa kepatuhan hukum (Regulatory Compliance Checklist) bagi pendirian kantor cabang logistik baru di luar pulau Jawa.",
      "Tulis draf MoU (Nota Kesepahaman) kerja sama subkontraktor angkutan logistik rute Sumatera-Jawa.",
      "Susun matriks tata kelola manajemen risiko (Risk Registry Matrix) untuk mengantisipasi keterlambatan rute laut akibat cuaca ekstrem."
    ]
  },
  {
    id: 'spia',
    name: 'SPIA',
    fullName: 'Satuan Pengawasan Intern / Internal Audit',
    shortDescription: 'Audit Internal, Pengendalian Risiko, & Deteksi Fraud',
    description: 'Mengatasi audit kepatuhan pengeluaran bahan bakar solar (mencegah fraud solar), penyusunan Kertas Kerja Audit (Working Paper) rute truk, evaluasi keandalan SOP gudang sparepart, serta pelacakan Corrective Action Plan (CAP).',
    iconName: 'ClipboardCheck',
    accentColor: 'border-rose-500 text-rose-600',
    bgGradient: 'from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border-rose-100',
    samplePrompts: [
      "Desain formulir Kertas Kerja Audit (Audit Working Paper Template) untuk mengaudit pemakaian BBM solar kapal Tugboat.",
      "Buat daftar periksa audit (Internal Audit Checklist) untuk memverifikasi kepatuhan sistem penggajian upah driver logistik.",
      "Susun template Rencana Aksi Korektif (Corrective Action Plan Form) pasca temuan selisih stok ban cadangan gudang.",
      "Bagaimana cara mengidentifikasi anomali/fraud BBM pada sistem operasional logistik darat logis? Berikan indikator audit pertamanya."
    ]
  }
];
