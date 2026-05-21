import { DivisionKpiData } from '../types';

export const INITIAL_KPI_PRESETS: Record<string, DivisionKpiData> = {
  comercial: {
    divisionId: 'comercial',
    kpis: [
      {
        id: 'com-kpi-1',
        name: 'Volume Bidding Kontrak Baru Rute Jakarta-Surabaya',
        target: 1200000,
        actual: 1150000,
        unit: 'Ton/Tahun',
        weight: 30,
        direction: 'higher_better',
        description: 'Target volume pengiriman barang kargo/tambang komitmen baru tahun operasional berjalan.'
      },
      {
        id: 'com-kpi-2',
        name: 'Rasio Utilisasi Armada Tug & Barge Operasional',
        target: 95,
        actual: 89,
        unit: '%',
        weight: 25,
        direction: 'higher_better',
        description: 'Persentase hari operasional kapal tongkang ditarik tugboat dibandingkan kapasitas tersedia.'
      },
      {
        id: 'com-kpi-3',
        name: 'Tingkat Kemenangan Tender Proyek Logistik (Win-Rate)',
        target: 75,
        actual: 68,
        unit: '%',
        weight: 20,
        direction: 'higher_better',
        description: 'Jumlah tender komersial yang berhasil dimenangkan Pancaran Group dari total bidding yang diajukan.'
      },
      {
        id: 'com-kpi-4',
        name: 'Tingkat Kemitraan Retensi Kontrak Pelanggan Utama',
        target: 90,
        actual: 93,
        unit: '%',
        weight: 25,
        direction: 'higher_better',
        description: 'Persentase perpanjangan kontrak corporate accounts atau repeat orders jangka panjang.'
      }
    ]
  },
  hca: {
    divisionId: 'hca',
    kpis: [
      {
        id: 'hca-kpi-1',
        name: 'Rasio Retensi Pengemudi Truk Trailer Logistik Darat',
        target: 95,
        actual: 91,
        unit: '%',
        weight: 30,
        direction: 'higher_better',
        description: 'Tingkat kenyamanan driver untuk menekan turnover pengemudi logistik agar utilisasi truk optimal.'
      },
      {
        id: 'hca-kpi-2',
        name: 'Sertifikasi Defensive Driving & Keselamatan Kru',
        target: 90,
        actual: 86,
        unit: '%',
        weight: 25,
        direction: 'higher_better',
        description: 'Persentase driver logistik darat yang mengantongi sertifikat mengemudi aman (zero-accident mindset).'
      },
      {
        id: 'hca-kpi-3',
        name: 'Kecepatan Pemenuhan SLA Rekrutmen Awak/Kru Kapal',
        target: 15,
        actual: 19,
        unit: 'Hari',
        weight: 20,
        direction: 'lower_better',
        description: 'Rata-rata waktu pemenuhan kru kapal yang berlisensi dari permintaan masuk sampai sign-on.'
      },
      {
        id: 'hca-kpi-4',
        name: 'Skor Evaluasi Kompetensi & Penilaian Kerja Staf (Appraisal)',
        target: 85,
        actual: 87.5,
        unit: 'Skor',
        weight: 25,
        direction: 'higher_better',
        description: 'Nilasi rata-rata performa kinerja staff administrasi, operasional, dan teknis logistik.'
      }
    ]
  },
  fina: {
    divisionId: 'fina',
    kpis: [
      {
        id: 'fina-kpi-1',
        name: 'Persentase Presisi Anggaran Bulanan (Keakuratan OPEX)',
        target: 97,
        actual: 94.5,
        unit: '%',
        weight: 30,
        direction: 'higher_better',
        description: 'Selisih antara proyeksi biaya operasional kapal & truk di awal bulan dengan realisasi kas akhir.'
      },
      {
        id: 'fina-kpi-2',
        name: 'Turnaround Time Rekonsiliasi Invoice Pelanggan B2B',
        target: 5,
        actual: 7.2,
        unit: 'Hari',
        weight: 25,
        direction: 'lower_better',
        description: 'Durasi dari penyerahan berkas surat jalan lengkap hingga terbit berkas invoice resmi tertagih.'
      },
      {
        id: 'fina-kpi-3',
        name: 'Margin EBITDA Sektor Armada Logistik Marine & Land',
        target: 22,
        actual: 21.4,
        unit: '%',
        weight: 25,
        direction: 'higher_better',
        description: 'Tingkat profitabilitas operasional riil sebelum bunga, pajak, depresiasi, dan amortisasi.'
      },
      {
        id: 'fina-kpi-4',
        name: 'Stabilitas Arus Kas Operasional Bersih Akhir Bulan',
        target: 5.5,
        actual: 5.9,
        unit: 'Miliar Rp',
        weight: 20,
        direction: 'higher_better',
        description: 'Arus uang kas bersih dari bisnis logistik setelah menutup seluruh biaya solar, gaji, dan tol.'
      }
    ]
  },
  lga: {
    divisionId: 'lga',
    kpis: [
      {
        id: 'lga-kpi-1',
        name: 'Rasio Kepatuhan Standar Anti-ODOL Truk Logistik Darat',
        target: 100,
        actual: 97.5,
        unit: '%',
        weight: 30,
        direction: 'higher_better',
        description: 'Kepatuhan unit armada darat terhadap regulasi Over Dimension & Over Loading Kementerian Perhubungan.'
      },
      {
        id: 'lga-kpi-2',
        name: 'Durasi Tinjauan Kontrak Kerja Sama Mitra Bisnis Baru',
        target: 48,
        actual: 45,
        unit: 'Jam',
        weight: 25,
        direction: 'lower_better',
        description: 'Kecepatan draf review serta pemberian masukan legalitas dari draf masuk sampai disetujui.'
      },
      {
        id: 'lga-kpi-3',
        name: 'Penyelesaian Perizinan Operasional Kapal Tongkang Baru',
        target: 30,
        actual: 34,
        unit: 'Hari',
        weight: 20,
        direction: 'lower_better',
        description: 'Durasi pendaftaran, inspeksi keselamatan pelayaran, hingga keluarnya sertifikat laut.'
      },
      {
        id: 'lga-kpi-4',
        name: 'Rasio Kejadian Sengketa Hukum Aktif / Litigasi Bisnis',
        target: 0,
        actual: 0,
        unit: 'Kasus',
        weight: 25,
        direction: 'lower_better',
        description: 'Jumlah kasus persidangan atau sengketa wanprestasi aktif yang melibatkan Pancaran Group.'
      }
    ]
  },
  spia: {
    divisionId: 'spia',
    kpis: [
      {
        id: 'spia-kpi-1',
        name: 'Penekanan Selisih Konsumsi Solar Armada (Fuel Loss Ratio)',
        target: 1.0,
        actual: 1.35,
        unit: '%',
        weight: 35,
        direction: 'lower_better',
        description: 'Perbandingan antara volume solar keluar dari depo internal Merak / bunker dengan rekaman GPS trip.'
      },
      {
        id: 'spia-kpi-2',
        name: 'SLA Penyelesaian & Penyusunan Kertas Kerja Audit (KKA)',
        target: 7,
        actual: 5.5,
        unit: 'Hari',
        weight: 20,
        direction: 'lower_better',
        description: 'Kecepatan menyusun draf temuan audit lapangan pasca selesainya investigasi fisik lapangan.'
      },
      {
        id: 'spia-kpi-3',
        name: 'Persentase Penyelesaian Rencana Aksi Korektif (CAP)',
        target: 90,
        actual: 83,
        unit: '%',
        weight: 25,
        direction: 'higher_better',
        description: 'Tingkat eksekusi perbaikan oleh auditee terhadap temuan-temuan penyimpangan operasional.'
      },
      {
        id: 'spia-kpi-4',
        name: 'Rasio Cakupan Audit Tahunan Depo Transit & Bengkel',
        target: 100,
        actual: 95,
        unit: '%',
        weight: 20,
        direction: 'higher_better',
        description: 'Persentase depo logistik dan galangan kapal yang sukses diinspeksi dalam periode tahun berjalan.'
      }
    ]
  }
};

export function calculateKpiAchievement(actual: number, target: number, direction: 'higher_better' | 'lower_better'): number {
  if (target === 0) {
    return actual === 0 ? 100 : 0;
  }
  let achievement = 0;
  if (direction === 'higher_better') {
    achievement = (actual / target) * 100;
  } else {
    // lower is better (e.g. target 15 days, actual 19 days -> achievement is (15 / 19) * 100 = 78.9%)
    // or target 1.0% fuel loss is better than actual 1.35% fuel loss -> (1.0 / 1.35) * 100 = 74.1%
    achievement = (target / actual) * 100;
  }
  return Math.round(achievement * 10) / 10;
}

export function calculateOverallScore(kpis: any[]): number {
  let totalWeight = 0;
  let weightedAchievementSum = 0;
  kpis.forEach(k => {
    const achievement = calculateKpiAchievement(k.actual, k.target, k.direction);
    weightedAchievementSum += (achievement * k.weight);
    totalWeight += k.weight;
  });
  if (totalWeight === 0) return 0;
  return Math.round((weightedAchievementSum / totalWeight) * 10) / 10;
}

export function getKpiGrade(score: number): string {
  if (score >= 95) return 'A (Sangat Baik / Gold)';
  if (score >= 85) return 'B (Baik / Silver)';
  if (score >= 70) return 'C (Cukup / Bronze)';
  return 'D (Butuh Perhatian / Red Alert)';
}
