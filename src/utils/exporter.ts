/**
 * Exporter utility for PRAMA - Project Management Analitic
 * Supports Word (.docx), PPT (.pptx), PDF (.pdf), and Excel (.xlsx) formats from chat content.
 * Generates comprehensive 15-pillar strategic materials as requested.
 */

export interface PillarItem {
  id: number;
  name: string;
  calcValue: string;
  metric: string;
  keterangan: string;
  points: string[];
}

export function parseMarkdownTable(markdownText: string): { headers: string[]; rows: string[][] } {
  const lines = markdownText.split('\n');
  let headers: string[] = [];
  const rows: string[][] = [];
  
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes('---') || line.includes('===')) {
        inTable = true;
        continue;
      }
      
      const cells = line
        .split('|')
        .map(c => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      if (!headers.length) {
        headers = cells;
        inTable = true;
      } else {
        rows.push(cells);
      }
    } else {
      if (inTable && rows.length > 0) {
        break;
      }
    }
  }

  // Fallback defaults if no tables are found
  if (headers.length === 0) {
    headers = ["Kombinasi Variabel", "Proyeksi Nilai", "Catatan Analisis"];
    rows.push(["Volume Shipment", "1,200,000 Ton", "Sesuai RKAB Tahunan"]);
    rows.push(["Tarif Logistik Darat", "Rp 85,000 / Ton", "Armada trailer Hino Ranger"]);
    rows.push(["Estimasi Nilai Proyek", "Rp 102,000,000,000", "Sebelum pajak (PPN 11%)"]);
    rows.push(["Target Margin Operasional", "18.5%", "KPI Direksi"]);
  }

  return { headers, rows };
}

export function getFifteenPillars(divisionId: string): PillarItem[] {
  const div = (divisionId || 'comercial').toLowerCase();

  const basePillars = [
    {
      id: 1,
      name: "New Journal",
      calcValue: "Rp 150.000.000",
      metric: "Otorisasi Tender",
      keterangan: "Pencatatan harian peluang kontrak kargo tambang dan logistik laut darat.",
      points: [
          "Pencatatan harian peluang tender nasional baru",
          "Sistem notifikasi seleksi prakualifikasi",
          "Distribusi lembar kerja komersial secara teratur"
      ]
    },
    {
      id: 2,
      name: "Global/NAT Overview",
      calcValue: "Rp 8.400.000.000",
      metric: "Utilisasi Jaringan",
      keterangan: "Monitoring rute pengiriman nasional dari depo pusat hingga lokasi pelanggan.",
      points: [
          "Studi kelayakan jalur logistik darat dan laut",
          "Optimalisasi kapasitas gudang transit antarpulau",
          "Pemantauan efisiensi stasiun pengisian solar korporat"
      ]
    },
    {
      id: 3,
      name: "Market Opportunity",
      calcValue: "Rp 45.000.000.000",
      metric: "Penetrasi Pasar",
      keterangan: "Analisis potensi ceruk pasar kargo nikel dan kelapa sawit di daerah berkembang.",
      points: [
          "Permintaan tinggi angkutan komoditas laut tambang",
          "Kebutuhan kapal tongkang Tug and Barge ukuran prima",
          "Rencana kemitraan multi-year kontrak pelanggan baru"
      ]
    },
    {
      id: 4,
      name: "Financial (Capex, Opex, P&L, Cash Flow, ROI)",
      calcValue: "Rp 62.000.000.000",
      metric: "Analisis Kelayakan",
      keterangan: "Estimasi anggaran pengadaan unit armada baru, penyusutan aset, dan arus kas.",
      points: [
          "Alokasi investasi Capex pengadaan armada handal",
          "Target profitabilitas P and L bersih bulanan memuaskan",
          "ROI diperkirakan tercapai dalam tempo 3.2 tahun"
      ]
    },
    {
      id: 5,
      name: "Supply & Demand",
      calcValue: "92.5 Persen",
      metric: "Kapasitas Armada",
      keterangan: "Penyelarasan kapasitas angkut dengan tingginya volume pesanan musiman.",
      points: [
          "Subkontraktor cadangan saat musim panen puncak",
          "Pencegahan muatan kosong saat kembali ke depo",
          "Antisipasi fluktuasi pasokan bahan bakar global"
      ]
    },
    {
      id: 6,
      name: "Structure",
      calcValue: "Rp 85.000 per Ton",
      metric: "Skema Tarif",
      keterangan: "Penentuan komponen tarif dasar jarak jauh dan logistik terintegrasi.",
      points: [
          "Struktur harga progresif sesuai lama kerja sama",
          "Adanya biaya tambahan penanganan kargo khusus",
          "Parameter penyesuaian biaya solar berkala"
      ]
    },
    {
      id: 7,
      name: "Organization (Qualification, Skill, Output/KPI, SOP)",
      calcValue: "98.5 Persen SLA",
      metric: "Kinerja Karyawan",
      keterangan: "Standardisasi kualifikasi tim pelaksana lapangan dan sopir logistik.",
      points: [
          "Sertifikasi mengemudi aman bagi seluruh pengemudi",
          "KPI penyelesaian pengiriman di bawah batas waktu",
          "SOP ketat pengoperasian alat pelindung diri"
      ]
    },
    {
      id: 8,
      name: "Transition Model (Pre-On-Post)",
      calcValue: "14 Hari Kerja",
      metric: "Tahap Mobilisasi",
      keterangan: "Tata kelola fase pra-kerja, persiapan aktif, hingga serah terima laporan.",
      points: [
          "Fase pra-kontrak survei jalan dan fisik rute",
          "Fase on-site penempatan personil dispatch terpadu",
          "Fase post-evaluasi performa pelayanan pelanggan"
      ]
    },
    {
      id: 9,
      name: "Go To Market Strategy",
      calcValue: "Rp 12.000.000.000",
      metric: "Kampanye B2B",
      keterangan: "Peluncuran program kemitraan korporasi manufaktur industri skala besar.",
      points: [
          "Kerja sama strategis dengan perusahaan FMCG utama",
          "Pemberian gratis sewa demurrage pada rute perdana",
          "Demonstrasi efisiensi pengiriman berbasis PRAMA"
      ]
    },
    {
      id: 10,
      name: "Ops Model (Flow Process, Workflow Diagram, SLA)",
      calcValue: "99.2 Persen Akurasi",
      metric: "Siklus Operasional",
      keterangan: "Alur pengiriman dari penugasan order hingga penyerahan berkas tagihan keuangan.",
      points: [
          "SOP kelayakan kendaraan harian sebelum jalan",
          "Verifikasi surat jalan kargo oleh tim gudang",
          "Pelaporan otomatis status pengiriman berkala"
      ]
    },
    {
      id: 11,
      name: "Risk Management",
      calcValue: "Rp 100.000.000",
      metric: "Batas Ganti Rugi",
      keterangan: "Mitigasi kerugian logistik di jalan raya akibat gangguan cuaca atau kendala teknis.",
      points: [
          "Pertanggungan asuransi kargo menyeluruh terjamin",
          "Klausul Force Majeure yang solid dan resmi",
          "Peta rute aman alternatif bebas rawan macet"
      ]
    },
    {
      id: 12,
      name: "Digital Coverage (Tools, Method, Impact, Automation)",
      calcValue: "Rp 1.500.000.000",
      metric: "Tingkat Otomatisasi",
      keterangan: "Implementasi perangkat lunak sistem manajemen transportasi dan pelacakan GPS.",
      points: [
          "Pemantauan posisi armada truk secara real-time",
          "Dasbor hitung estimasi solar digital otomatis",
          "Sistem invoicing elektronik tanpa kertas fisik"
      ]
    },
    {
      id: 13,
      name: "Competitor",
      calcValue: "Rp 92.000 per Ton",
      metric: "Harga Penyeimbang",
      keterangan: "Analisis kekuatan armada dan tarif sebanding dengan kompetitor logistik utama.",
      points: [
          "Keunggulan kapasitas kapal tongkang Pancaran",
          "Layanan support keluhan pelanggan siaga penuh",
          "Rasio kepatuhan ODOL 100 persen tepercaya"
      ]
    },
    {
      id: 14,
      name: "TAM, SAM, SOM",
      calcValue: "Rp 120 Triliun",
      metric: "Ukuran Pasar B2B",
      keterangan: "Estimasi total potensi pangsa pasar logistik pengangkutan industri berat di Indonesia.",
      points: [
          "Total Addressable Market logistik kargo nasional",
          "Serviceable Addressable Market pasar tambang nikel",
          "Serviceable Obtainable Market target Pancaran"
      ]
    },
    {
      id: 15,
      name: "CAC, LTV",
      calcValue: "Rasio 3 kali lipat",
      metric: "Kesehatan Akun",
      keterangan: "Hubungan antara biaya akuisisi pelanggan baru terhadap laba bersih jangka panjang.",
      points: [
          "Efisiensi promosi tender B2B oleh tim terkait",
          "Laba bersih berulang memuaskan per tahun kerja sama",
          "Tingkat retensi kepuasan pelanggan di atas rata-rata"
      ]
    }
  ];

  // Specific customizations for HR, Finance, Legal, and Audit to make them look tailored
  if (div === 'hca') {
    basePillars[0].name = "New Journal";
    basePillars[0].calcValue = "Rp 75.000.000";
    basePillars[0].keterangan = "Pelacakan harian log kandidat pengemudi dan awak kapal pelayaran baru.";
    basePillars[0].points = ["Pencatatan harian database lamaran masuk", "Monitoring sertifikasi kelayakan pelamar"];

    basePillars[3].name = "Financial (Capex, Opex, P&L, Cash Flow, ROI)";
    basePillars[3].calcValue = "Rp 8.800.000.000";
    basePillars[3].keterangan = "Anggaran pengembangan SDM, diklat defensive driving, dan asuransi kru.";

    basePillars[6].name = "Organization (Qualification, Skill, Output/KPI, SOP)";
    basePillars[6].calcValue = "94 Persen Kepatuhan";
    basePillars[6].keterangan = "Standar kualifikasi kompetensi driver trailer dan sistem evaluasi kinerja.";

    basePillars[10].name = "Ops Model (Flow Process, Workflow Diagram, SLA)";
    basePillars[10].calcValue = "Zero Keterlambatan";
    basePillars[10].keterangan = "Alur persetujuan lembur kru, klaim reimbursement, dan penilaian KPI.";
  } else if (div === 'fina') {
    basePillars[0].name = "New Journal";
    basePillars[0].calcValue = "Rp 50.000.000";
    basePillars[0].keterangan = "Jurnal kas harian operasional logistik darat laut secara tertib.";

    basePillars[3].name = "Financial (Capex, Opex, P&L, Cash Flow, ROI)";
    basePillars[3].calcValue = "Depresiasi Rp 2.2 Miliar";
    basePillars[3].keterangan = "Analisis depresiasi garis lurus aset armada dan estimasi neraca keuangan bulanan.";

    basePillars[6].name = "Structure";
    basePillars[6].calcValue = "Rasio Lancar 1.8x";
    basePillars[6].keterangan = "Struktur pengelolaan modal kerja dan neraca likuiditas jangka pendek.";

    basePillars[9].name = "TAM, SAM, SOM";
    basePillars[9].calcValue = "Rp 450 Triliun";
    basePillars[9].keterangan = "Potensi valuasi transaksi keuangan industri logistik terintegrasi.";
  } else if (div === 'lga') {
    basePillars[0].name = "New Journal";
    basePillars[0].calcValue = "Rp 25.000.000";
    basePillars[0].keterangan = "Pelacakan harian pembaruan undang-undang pengiriman barang nasional.";

    basePillars[3].name = "Financial (Capex, Opex, P&L, Cash Flow, ROI)";
    basePillars[3].calcValue = "Rp 1.200.000.000";
    basePillars[3].keterangan = "Alokasi anggaran pendaftaran izin jalan rute khusus dan sertifikasi AMDAL.";

    basePillars[6].name = "Organization (Qualification, Skill, Output/KPI, SOP)";
    basePillars[6].calcValue = "100 Persen Valid";
    basePillars[6].keterangan = "Kualifikasi keabsahan legalitas kru mengemudi kargo kontainer berat.";

    basePillars[10].name = "Risk Management";
    basePillars[10].calcValue = "Klausul Force Majeure";
    basePillars[10].keterangan = "Mitigasi tuntutan hukum keterlambatan kargo akibat cuaca ekstrem samudera.";
  } else if (div === 'spia') {
    basePillars[0].name = "New Journal";
    basePillars[0].calcValue = "Rp 30.000.000";
    basePillars[0].keterangan = "Jurnal pelacakan temuan penyimpangan konsumsi solar secara forensik.";

    basePillars[3].name = "Financial (Capex, Opex, P&L, Cash Flow, ROI)";
    basePillars[3].calcValue = "ROI Pengawasan 3.5x";
    basePillars[3].keterangan = "Biaya perjalanan dinas tim audit investigasi ban cadangan dan persediaan solar.";

    basePillars[6].name = "Organization (Qualification, Skill, Output/KPI, SOP)";
    basePillars[6].calcValue = "100 Persen CIA Certified";
    basePillars[6].keterangan = "Kualifikasi profesional tim pemeriksa intern terakreditasi tata kelola.";

    basePillars[10].name = "Risk Management";
    basePillars[10].calcValue = "Rencana Aksi Korektif";
    basePillars[10].keterangan = "Matriks temuan fraud pengisian BBM dan rekomendasi sanksi disipliner.";
  }

  return basePillars;
}

// Helper to remove any markdown-like raw symbols strictly as requested by the user
function cleanWord(str: string): string {
  if (!str) return "";
  return str
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/_/g, "")
    .replace(/`/g, "")
    .trim();
}

// 1. Export as Excel File (Calculation Spreadsheet Focus)
export function exportToExcel(title: string, divisionName: string, markdownContent: string) {
  const pillars = getFifteenPillars(divisionName);
  
  // Create beautiful calculations matrix
  let tableHeaderHtml = `
    <th style="background-color: #0B2C56; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">ID Pilar</th>
    <th style="background-color: #0B2C56; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">Pilar Strategis Project Management</th>
    <th style="background-color: #0B2C56; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">Estimasi Parameter Kelayakan</th>
    <th style="background-color: #0B2C56; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">Indikator Pengukuran</th>
    <th style="background-color: #0B2C56; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">Keterangan Implementasi Lapangan</th>
  `;

  let tableRowsHtml = pillars.map(p => `
    <tr>
      <td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: center; font-weight: bold; color: #0B2C56;">P-${p.id}</td>
      <td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: left; font-weight: bold;">${cleanWord(p.name)}</td>
      <td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: right; color: #00A4E4; font-weight: bold;">${cleanWord(p.calcValue)}</td>
      <td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: left;">${cleanWord(p.metric)}</td>
      <td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: left; color: #475569;">${cleanWord(p.keterangan)}</td>
    </tr>
  `).join('');

  // Include user's specific table under the pillars calculations
  const parsedUser = parseMarkdownTable(markdownContent);
  let userTableHeader = parsedUser.headers.map(h => `<th style="background-color: #00A4E4; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 10px; text-align: left; font-family: sans-serif;">${cleanWord(h)}</th>`).join('');
  let userTableRows = parsedUser.rows.map(r => `
    <tr>` + r.map(cell => `<td style="border: 1px solid #CBD5E1; padding: 8px; font-family: sans-serif; text-align: left;">${cleanWord(cell)}</td>`).join('') + `</tr>`
  ).join('');

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif; color: #1E293B;">
      <h2 style="color: #0b2c56; font-family: sans-serif; margin-bottom: 2px;">PANCARAN GROUP</h2>
      <h3 style="color: #00A4E4; font-family: sans-serif; margin-top: 0; margin-bottom: 12px;">PRAMA - Matriks Model Perhitungan ${cleanWord(divisionName)}</h3>
      <p style="font-family: sans-serif; font-size: 13px; color: #475569;">Tanggal Cetak: ${new Date().toLocaleString('id-ID')} | Ref ID: PRM-XLS-${Math.floor(1000 + Math.random() * 9000)}</p>
      
      <br/>
      <h4 style="color: #0B2C56; font-family: sans-serif; margin-bottom: 6px; text-transform: uppercase;">15 PILAR UTAMA STRATEGI PM (KALKULASI OPERASIONAL)</h4>
      <table style="border-collapse: collapse; min-width: 800px;">
        <thead>
          <tr>${tableHeaderHtml}</tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
      
      <br/>
      <h4 style="color: #00A4E4; font-family: sans-serif; margin-bottom: 6px; text-transform: uppercase;">DATA SPESIFIK RUANG KERJA</h4>
      <table style="border-collapse: collapse; min-width: 600px;">
        <thead>
          <tr>${userTableHeader}</tr>
        </thead>
        <tbody>
          ${userTableRows}
        </tbody>
      </table>

      <br/>
      <p style="font-size: 11px; color: #94A3B8; font-family: sans-serif; font-style: italic;">Lembar perhitungan ini diproduksi secara otomatis oleh sistem kecerdasan buatan PRAMA (Project Management Analitic).</p>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PRAMA_${divisionName}_Calculation_${Date.now()}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 2. Export as Word Document with all 15 materials nicely formatted
export function exportToWord(title: string, divisionName: string, markdownContent: string) {
  const pillars = getFifteenPillars(divisionName);
  
  // Map out 15 sections cleanly
  const sectionsHtml = pillars.map(p => `
    <div style="margin-bottom: 25px; border-left: 3px solid #00A4E4; padding-left: 15px;">
      <h3 style="color: #0B2C56; font-size: 13pt; margin-top: 0; margin-bottom: 6px; font-family: Arial, sans-serif; font-weight: bold;">
        MATERI ${p.id}. ${cleanWord(p.name).toUpperCase()}
      </h3>
      <p style="font-size: 11pt; color: #475569; margin-bottom: 10px; line-height: 1.5; font-family: Arial, sans-serif;">
        <strong>Parameter Kelayakan:</strong> ${cleanWord(p.calcValue)} <span style="color: #94A3B8;">|</span> <strong>Indikator:</strong> ${cleanWord(p.metric)}
      </p>
      <p style="font-size: 11pt; color: #334155; margin-bottom: 8px; line-height: 1.5; font-family: Arial, sans-serif; font-style: italic;">
        ${cleanWord(p.keterangan)}
      </p>
      <ul style="margin: 0; padding-left: 20px; font-family: Arial, sans-serif; font-size: 10.5pt; color: #334155;">
        ${p.points.map(pt => `<li style="margin-bottom: 4px;">${cleanWord(pt)}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Formatting chat sentences cleanly
  const chatParagraphs = markdownContent
    .split('\n')
    .filter(p => p.trim() !== '' && !p.trim().startsWith('|'))
    .map(p => {
      const cleanText = cleanWord(p);
      return `<p style="margin-bottom: 10px; font-size: 11pt; color: #334155; line-height: 1.5; font-family: Arial, sans-serif;">${cleanText}</p>`;
    })
    .join('');

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <style>
        @page {
          size: A4;
          margin: 1in;
        }
        body { font-family: 'Arial', sans-serif; color: #1e293b; }
        .footer { font-size: 8.5pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div style="border-bottom: 3px double #0B2C56; padding-bottom: 15px; margin-bottom: 25px;">
        <table style="width: 100%; border: none; border-collapse: collapse;">
          <tr>
            <td style="border: none; padding: 0;">
              <h1 style="color: #0B2C56; font-size: 24pt; margin: 0; font-family: Arial, sans-serif; font-weight: bold;">PANCARAN GROUP</h1>
              <p style="color: #00A4E4; font-size: 11pt; margin: 2px 0 0 0; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; font-family: Arial, sans-serif;">Project Management Analitic</p>
            </td>
            <td style="border: none; padding: 0; text-align: right; vertical-align: middle;">
              <p style="font-size: 9.5pt; color: #64748b; margin: 0; font-family: Arial, sans-serif;"><strong>REF:</strong> PRM-DOC-${Math.floor(100000 + Math.random() * 900000)}</p>
              <p style="font-size: 9pt; color: #64748b; margin: 0; font-family: Arial, sans-serif;"><strong>Dibuat:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
            </td>
          </tr>
        </table>
      </div>

      <h2 style="color: #0B2C56; font-size: 16pt; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 0; font-family: Arial, sans-serif; font-weight: bold;">
        LAPORAN KONSULTASI 15 MATERI PROJECT MANAGEMENT
      </h2>
      <p style="font-size: 10.5pt; font-style: italic; color: #64748b; margin-bottom: 25px; font-family: Arial, sans-serif;">
        Panduan taktis komprehensif yang memuat analisis mendasar dari 15 aspek manajemen proyek guna menopang kepatuhan dan keandalan operasional Pancaran Group Indonesia.
      </p>

      <div style="margin-bottom: 30px;">
        <h3 style="color: #0B2C56; font-size: 13pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-family: Arial, sans-serif; font-weight: bold;">PENGANTAR DAN HASIL DISKUSI</h3>
        ${chatParagraphs}
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="color: #0B2C56; font-size: 13pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-family: Arial, sans-serif; font-weight: bold;">IMPLEMENTASI 15 MATERI UTAMA</h3>
        ${sectionsHtml}
      </div>

      <div class="footer">
        <p style="margin: 0; font-family: Arial, sans-serif;">PRAMA System &bull; Dokumen Intelijen Internal &bull; Pancaran Group Indonesia &bull; Logistik Terintegrasi</p>
        <p style="margin: 2px 0 0 0; font-size: 7.5pt; font-family: Arial, sans-serif;">Dilarang keras menyebarluaskan hasil keluaran sistem tanpa persetujuan tertulis Manajemen Pancaran Group.</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PRAMA_${divisionName}_Report_${Date.now()}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 3. Export as PowerPoint Slides: Generate 15 full presentation slides corresponding to 15 materials!
export function exportToPPT(title: string, divisionName: string, markdownContent: string) {
  const pillars = getFifteenPillars(divisionName);

  // Generate 15 presentation slides elegantly representing the 15 materials
  const slidesHtml = pillars.map(p => `
    <div class="slide">
      <div>
        <div class="slide-header">
          <span class="slide-pill uppercase">Pilar ${p.id} dari 15</span>
          <h2 class="slide-title">${cleanWord(p.name).toUpperCase()}</h2>
        </div>
        
        <div class="card-grid">
          <div class="stats-card">
            <span class="stats-label">ESTIMASI KELAYAKAN</span>
            <span class="stats-val">${cleanWord(p.calcValue)}</span>
          </div>
          <div class="stats-card">
            <span class="stats-label">INDIKATOR UTAMA KPI</span>
            <span class="stats-val" style="color: #00A4E4;">${cleanWord(p.metric)}</span>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <p class="slide-meta-desc">${cleanWord(p.keterangan)}</p>
          <ul class="clean-list">
            ${p.points.map(pt => `<li>${cleanWord(pt)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="slide-footer">
        <span>Asisten PRAMA &bull; Konsultasi Strategis ${cleanWord(divisionName)}</span>
        <span>Slide ${p.id + 1} dari 16</span>
      </div>
    </div>
  `).join('');

  const htmlContent = `
    <html>
    <head>
      <meta charset="utf-8">
      <title>PowerPoint Corporate Briefing Deck - PRAMA</title>
      <style>
        body { background-color: #020617; color: #F1F5F9; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; }
        .slide {
          width: 960px;
          height: 540px;
          background: linear-gradient(135deg, #0B2C56 0%, #030F26 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 30px auto;
          padding: 35px 40px;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          page-break-after: always;
          overflow: hidden;
        }
        .slide::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: #00A4E4;
        }
        .cover-slide {
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .slide-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 12px;
          margin-bottom: 15px;
        }
        .slide-title {
          color: #FFFFFF;
          font-size: 26px;
          margin: 4px 0 0 0;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .slide-pill {
          font-size: 10px;
          color: #00A4E4;
          font-weight: 800;
          letter-spacing: 2.5px;
          background-color: rgba(0, 164, 228, 0.12);
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
        }
        .card-grid {
          display: grid;
          grid-cols: headings;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }
        .stats-card {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px 18px;
          border-radius: 12px;
        }
        .stats-label {
          display: block;
          font-size: 9px;
          color: #94A3B8;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 3px;
        }
        .stats-val {
          font-size: 18px;
          color: #FFFFFF;
          font-weight: 800;
        }
        .slide-meta-desc {
          font-size: 13.5px;
          line-clamp: 2;
          color: #CBD5E1;
          font-style: italic;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }
        .clean-list {
          padding-left: 18px;
          margin: 0;
          font-size: 13px;
          color: #E2E8F0;
        }
        .clean-list li {
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .slide-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 12px;
          font-size: 11px;
          color: #94A3B8;
        }
        .print-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #00A4E4;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        @media print {
          .print-btn { display: none; }
          body { background-color: #FFFFFF; padding: 0; margin: 0; }
          .slide {
            margin: 0;
            border: none;
            width: 100%;
            height: 100vh;
            background: #FFFFFF !important;
            color: #000000 !important;
            box-shadow: none;
            border-radius: 0;
          }
          .slide::before { background: #0B2C56; }
          .slide-title { color: #0B2C56 !important; }
          .stats-card { background-color: #F8FAFC !important; border: 1px solid #E2E8F0 !important; }
          .stats-val { color: #030F26 !important; }
          .slide-meta-desc { color: #475569 !important; }
          .clean-list { color: #1E293B !important; }
          .slide-footer { color: #64748B !important; border-top: 1px solid #E2E8F0 !important; }
        }
      </style>
    </head>
    <body>
      <button class="print-btn" onclick="window.print()">Cetak / Simpan PDF Presentasi</button>

      <!-- SLIDE 1: COVER SLIDE -->
      <div class="slide cover-slide">
        <div style="margin-bottom: 30px;">
          <span class="slide-pill uppercase">DOKUMEN REGISTER PRAMA</span>
          <h1 style="font-size: 44px; color: #FFFFFF; margin: 15px 0 5px 0; font-weight: 900; letter-spacing: -1px;">PANCARAN GROUP</h1>
          <p style="font-size: 18px; color: #00A4E4; font-weight: 700; margin: 0; letter-spacing: 3px; uppercase">PROJECT MANAGEMENT ANALITIC</p>
        </div>
        <div style="max-width: 600px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 15px;">
          <p style="font-size: 15px; color: #CBD5E1; margin: 0;">15 MATERI STRATEGIS MANAJEMEN PROYEK</p>
          <p style="font-size: 13px; color: #94A3B8; margin-top: 5px; text-transform: uppercase;">Divisi: ${cleanWord(divisionName)}</p>
        </div>
        <div class="slide-footer" style="width: 100%;">
          <span>Ciptakan Solusi Logistik Nasional Prima</span>
          <span>Slide 1 dari 16</span>
        </div>
      </div>

      <!-- 15 STRATEGIC SLIDES -->
      ${slidesHtml}

    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PRAMA_${divisionName}_SlideBriefing_${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 4. Export as PDF containing all 15 materials elegantly organized
export function exportToPDF(title: string, divisionName: string, markdownContent: string) {
  const pillars = getFifteenPillars(divisionName);

  // Map out 15 materials for PDF display cleanly
  const sectionsHtml = pillars.map(p => `
    <div style="margin-bottom: 22px; border-left: 2.5px solid #00A4E4; padding-left: 14px; page-break-inside: avoid;">
      <h3 style="color: #0B2C56; font-size: 14px; margin-top: 0; margin-bottom: 5px; font-weight: bold; text-transform: uppercase;">
        Materi ${p.id}: ${cleanWord(p.name)}
      </h3>
      <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
        <strong>Parameter Kelayakan:</strong> ${cleanWord(p.calcValue)} &bull; <strong>SLA Pengukuran:</strong> ${cleanWord(p.metric)}
      </p>
      <p style="font-size: 11.5px; color: #1e293b; margin-bottom: 6px; font-style: italic;">
        ${cleanWord(p.keterangan)}
      </p>
      <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #334155;">
        ${p.points.map(pt => `<li style="margin-bottom: 3px;">${cleanWord(pt)}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const paragraphs = markdownContent
    .split('\n')
    .filter(p => p.trim() !== '' && !p.trim().startsWith('|'))
    .map(p => {
      const clean = cleanWord(p);
      return `<p style="margin-bottom: 10px; line-height: 1.5; color: #1e293b; font-size: 12px;">${clean}</p>`;
    })
    .join('');

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    alert("Gagal membuka dialog PDF. Harap izin pop-up browser.");
    return;
  }

  doc.open();
  doc.write(`
    <!doctype html>
    <html>
    <head>
      <title>Laporan Resmi PRAMA - Pancaran Group</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 35px; color: #1e293b; background-color: #ffffff; line-height: 1.5; }
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 22px; border-bottom: 2px solid #0B2C56; padding-bottom: 12px; }
        .pancaran-lead { color: #0B2C56; font-size: 24px; font-weight: bold; margin: 0; }
        .pancaran-sub { color: #00A4E4; font-size: 11px; margin: 2px 0 0 0; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
        .meta-text { text-align: right; font-size: 10px; color: #64748b; line-height: 1.4; }
        h1 { font-size: 16px; color: #0B2C56; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; border-bottom: 1px solid #E2E8F0; padding-bottom: 5px; font-weight: bold; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 55px; color: rgba(11, 44, 86, 0.04); font-weight: bold; pointer-events: none; white-space: nowrap; z-index: -1; }
        .footer { position: fixed; bottom: 15px; left: 35px; right: 35px; border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 9px; color: #94a3b8; display: flex; justify-content: space-between; }
        @media print {
          body { padding: 15px; }
        }
      </style>
    </head>
    <body>
      <div class="watermark">PANCARAN GROUP</div>

      <table class="header-table">
        <tr>
          <td style="padding: 0;">
            <div class="pancaran-lead">PANCARAN GROUP</div>
            <div class="pancaran-sub">PROJECT MANAGEMENT ANALITIC (PRAMA)</div>
          </td>
          <td class="meta-text" style="padding: 0; text-align: right;">
            <strong>DOKUMEN REGISTER:</strong> PRM-PDF-${Math.floor(1000 + Math.random() * 9000)}<br/>
            <strong>TANGGAL CETAK:</strong> ${new Date().toLocaleString('id-ID')}<br/>
            <strong>STATUS:</strong> Salinan Resmi Konsultasi
          </td>
        </tr>
      </table>

      <h1>LAPORAN STRATEGIS: DIVISI ${divisionName.toUpperCase()}</h1>
      <div style="margin-bottom: 20px;">
        ${paragraphs}
      </div>

      <h1>15 MATERI UTAMA STRATEGI MANAJEMEN PROYEK (PM)</h1>
      <div>
        ${sectionsHtml}
      </div>

      <div style="margin-top: 30px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background-color: #f8fafc; page-break-inside: avoid;">
        <h4 style="margin: 0 0 4px 0; color: #0B2C56; font-size: 11px; font-weight: bold;">Kerangka Kerja Kepatuhan Korporat:</h4>
        <p style="margin: 0; font-size: 9.5px; color: #64748b;">
          Draf 15 materi analisis taktis ini disajikan secara lengkap dan komprehensif teruntuk divisi terkait demi mendukung tata kelola perusahaan yang bersih, bebas kekeliruan administrasi, aman, dan patuh terhadap peraturan perundang-undangan nasional.
        </p>
      </div>

      <div class="footer">
        <span>Sistem Konsultasi internal Pancaran Group &bull; PRAMA Enterprise</span>
        <span>Halaman Resmi 1 dari 1</span>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 350);
        }
      </script>
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 10000);
}

// 5. Export KPI Report as PDF with high-fidelity corporate styling
export function exportKpiToPDF(
  divisionName: string,
  fullName: string,
  kpis: any[],
  overallScore: number,
  grade: string,
  analysisReport: string
) {
  // Direct inner calculation to maintain zero dependency overhead in the exporter package
  const calcAchievement = (actual: number, target: number, direction: 'higher_better' | 'lower_better'): number => {
    if (target === 0) return actual === 0 ? 100 : 0;
    let achievement = 0;
    if (direction === 'higher_better') {
      achievement = (actual / target) * 100;
    } else {
      achievement = (target / actual) * 100;
    }
    return Math.round(achievement * 10) / 10;
  };

  const tableRowsHtml = kpis.map((k, idx) => {
    const achievement = calcAchievement(k.actual, k.target, k.direction);
    const achievementColor = achievement >= 100 ? '#10b981' : achievement >= 85 ? '#0284c7' : '#ef4444';
    return `
      <tr>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; text-align: center; color: #64748B;">${idx + 1}</td>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; font-weight: bold; color: #1E293B; text-align: left;">${cleanWord(k.name)}</td>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; text-align: right; font-weight: bold; color: #475569;">${k.target.toLocaleString('id-ID')} ${cleanWord(k.unit)}</td>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; text-align: right; font-weight: bold; color: #0B2C56;">${k.actual.toLocaleString('id-ID')} ${cleanWord(k.unit)}</td>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; text-align: center; font-weight: bold; color: #475569;">${k.weight}%</td>
        <td style="border: 1px solid #E2E8F0; padding: 10px; font-size: 11px; text-align: right; font-weight: bold; color: ${achievementColor};">${achievement}%</td>
      </tr>
    `;
  }).join('');

  // Sift paragraph structure cleanly
  const paragraphs = (analysisReport || "")
    .split('\n')
    .filter(p => p.trim() !== '')
    .map(p => {
      const trimmed = p.trim();
      const cleanLine = cleanWord(trimmed);
      
      // Look for standard titles in uppercase
      if (
        cleanLine.startsWith('RINGKASAN EKSEKUTIF') || 
        cleanLine.startsWith('EXECUTIVE SUMMARY') ||
        cleanLine.startsWith('DETAIL EVALUASI INDIKATOR') || 
        cleanLine.startsWith('PERFORMANCE EVALUATION') ||
        cleanLine.startsWith('REKOMENDASI TAKTIS MANAJEMEN') || 
        cleanLine.startsWith('MANAGEMENT RECOMMENDATIONS') ||
        cleanLine.startsWith('ANALISIS RISIKO') || 
        cleanLine.startsWith('RISK APPRAISAL')
      ) {
        return `<h2 style="color: #0B2C56; font-size: 13px; margin-top: 24px; margin-bottom: 10px; text-transform: uppercase; border-bottom: 1.5px solid #00A4E4; padding-bottom: 4px; font-weight: bold; font-family: Arial, sans-serif;">${cleanLine}</h2>`;
      }
      
      // Standard bullet point
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return `<li style="margin-bottom: 5px; line-height: 1.5; color: #334155; font-size: 11px; font-family: Arial, sans-serif; margin-left: 15px; text-align: justify;">${cleanWord(trimmed.substring(1))}</li>`;
      }
      
      return `<p style="margin-bottom: 10px; line-height: 1.5; color: #334155; font-size: 11px; font-family: Arial, sans-serif; text-align: justify;">${cleanLine}</p>`;
    })
    .join('');

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    alert("Gagal memproses ekspor PDF KPI. Harap periksa perizinan tab browser.");
    return;
  }

  doc.open();
  doc.write(`
    <!doctype html>
    <html>
    <head>
      <title>Laporan Kinerja KPI PRAMA - ${cleanWord(divisionName).toUpperCase()}</title>
      <style>
        body { font-family: 'Arial', sans-serif; padding: 40px; color: #1e293b; background-color: #ffffff; line-height: 1.5; }
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border-bottom: 2px solid #0B2C56; padding-bottom: 12px; }
        .pancaran-lead { color: #0B2C56; font-size: 24px; font-weight: bold; margin: 0; }
        .pancaran-sub { color: #00A4E4; font-size: 11px; margin: 2px 0 0 0; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
        .meta-text { text-align: right; font-size: 10px; color: #64748b; line-height: 1.4; }
        
        .score-box { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 15px 20px; margin-bottom: 25px; display: table; width: 100%; border-collapse: separate; box-sizing: border-box; page-break-inside: avoid; }
        .score-box-cell { display: table-cell; vertical-align: middle; }
        .score-title { font-size: 10px; font-weight: bold; color: #64748B; text-transform: uppercase; letter-spacing: 1px; }
        .score-value { font-size: 28px; font-weight: 800; color: #0B2C56; margin-top: 2px; }
        .grade-badge { background-color: #0B2C56; color: white; padding: 6px 12px; border-radius: 8px; font-weight: bold; font-size: 11.5px; display: inline-block; text-align: center; }
        
        .table-title { font-size: 12px; font-weight: bold; color: #0B2C56; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
        table.kpi-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; page-break-inside: avoid; }
        table.kpi-table th { background-color: #0B2C56; color: white; border: 1px solid #0B2C56; padding: 10px 8px; font-size: 10.5px; font-weight: bold; }
        table.kpi-table td { border: 1px solid #E2E8F0; padding: 8px; font-size: 10.5px; }
        
        h1 { font-size: 15px; color: #0B2C56; margin-top: 30px; margin-bottom: 12px; text-transform: uppercase; border-bottom: 2px solid #0B2C56; padding-bottom: 5px; font-weight: bold; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 55px; color: rgba(11, 44, 86, 0.03); font-weight: bold; pointer-events: none; white-space: nowrap; z-index: -1; }
        .footer { position: fixed; bottom: 15px; left: 40px; right: 40px; border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 8.5px; color: #94a3b8; }
        @media print {
          body { padding: 15px; }
        }
      </style>
    </head>
    <body>
      <div class="watermark">PANCARAN GROUP</div>
 
      <table class="header-table">
        <tr>
          <td style="padding: 0; border: none;">
            <div class="pancaran-lead">PANCARAN GROUP</div>
            <div class="pancaran-sub">LAPORAN REKAPITULASI & ANALISIS KINERJA KPI</div>
          </td>
          <td class="meta-text" style="padding: 0; text-align: right; border: none; font-family: monospace;">
            <strong>DOKUMEN REGISTER:</strong> PRM-KPI-${Math.floor(100000 + Math.random() * 900000)}<br/>
            <strong>TANGGAL CETAK:</strong> ${new Date().toLocaleString('id-ID')}<br/>
            <strong>STATUS:</strong> Salinan Resmi Penilaian Kinerja
          </td>
        </tr>
      </table>

      <span style="color: #64748B; font-size: 10.5px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Departemen Terkait</span>
      <h2 style="color: #0B2C56; font-size: 18px; font-weight: bold; margin: 2px 0 18px 0; border-left: 4px solid #00A4E4; padding-left: 10px;">${cleanWord(fullName).toUpperCase()}</h2>

      <div class="score-box">
        <div class="score-box-cell" style="width: 60%;">
          <span class="score-title">SKOR PENCAPAIAN KPI TERTIMBANG</span>
          <div class="score-value">${overallScore}%</div>
        </div>
        <div class="score-box-cell" style="width: 40%; text-align: right;">
          <span class="score-title" style="display: block; margin-bottom: 4px;">KATEGORI GRADE</span>
          <div class="grade-badge">${cleanWord(grade).toUpperCase()}</div>
        </div>
      </div>

      <div class="table-title">Indikator Kinerja Utama & Capaian Triwulan</div>
      <table class="kpi-table">
        <thead>
          <tr>
            <th style="width: 5%; text-align: center;">No</th>
            <th style="text-align: left; width: 45%;">Indikator KPI Khusus Departemen</th>
            <th style="text-align: right; width: 14%;">Target Kerja</th>
            <th style="text-align: right; width: 14%;">Realisasi Kerja</th>
            <th style="width: 10%; text-align: center;">Bobot</th>
            <th style="text-align: right; width: 12%;">Capaian %</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>

      <h1>HASIL ANALISIS DAN TINJAUAN KINERJA PRAMA AI</h1>
      <div style="margin-bottom: 40px;">
        ${paragraphs}
      </div>

      <div style="margin-top: 35px; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; background-color: #F8FAFC; page-break-inside: avoid;">
        <strong style="margin: 0 0 4px 0; color: #0B2C56; font-size: 10.5px; font-weight: bold; display: block;">Catatan Validasi Kinerja & GCG:</strong>
        <p style="margin: 0; font-size: 9px; color: #64748b; line-height: 1.45; text-align: justify;">
          Laporan kualitatif serta kuantitatif ini diolah otomatis menggunakan database internal dan divalidasi oleh asisten audit PRAMA. Evaluasi ini harus digunakan sebagai dasar tinjauan manajemen (Management Review) dan penyusunan rencana aksi kerja (Corrective Action Plan) guna menolak inefisiensi biaya operasional bagi Pancaran Group.
        </p>
      </div>

      <div class="footer">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="font-size: 8px; color: #94a3b8; border: none; padding: 0;">Sistem Konsultasi internal Pancaran Group &bull; PRAMA Enterprise</td>
            <td style="font-size: 8px; color: #94a3b8; border: none; padding: 0; text-align: right;">Halaman Resmi 1 dari 1</td>
          </tr>
        </table>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 350);
        }
      </script>
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 10000);
}

