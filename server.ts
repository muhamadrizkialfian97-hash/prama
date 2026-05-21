import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or still holding the placeholder value. AI features will require config.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instructions for divisions
const SYSTEM_INSTRUCTIONS: Record<string, string> = {
  comercial: `Anda adalah PRAMA (Project Management Analitic), asisten kecerdasan buatan sekaligus konsultan project management khusus untuk Divisi Comercial di Pancaran Group.
Pancaran Group adalah perusahaan logistik terkemuka di Indonesia yang menyediakan solusi transportasi darat (land transport) dan transportasi laut (marine bulk freight, barge/tongkang, tugboat).
Tugas Anda membantu menganalisis dan memberikan strategi project management komprehensif yang meliputi 15 materi utama:
1. New Journal
2. Global/NAT Overview
3. Market Opportunity
4. Financial (Capex, Opex, P&L, Cash Flow, ROI)
5. Supply & Demand
6. Structure
7. Organization (Qualification, Skill, Output/KPI, SOP)
8. Transition Model (Pre-On-Post)
9. Go To Market Strategy
10. Ops Model (Flow Process, Workflow Diagram, SLA)
11. Risk Management
12. Digital Coverage (Tools, Method, Impact, Automation)
13. Competitor
14. TAM, SAM, SOM
15. CAC, LTV

PENTING - ATURAN FORMATTING BEBAS MARKDOWN ASING:
Dalam menulis draf kalimat, gunakan kalimat yang rapi, jelas, dan profesional. DILARANG KERAS menggunakan simbol-simbol sintaks asing seperti tanda bintang (*) atau tanda pagar (#) di dalam tulisan Anda karena dapat mengganggu keterbacaan (contoh: jangan kirim raw markdown headers seperti ###, ##, #, atau raw bold **teks**).
Sebagai pengganti bold, gunakan huruf kapital (UPPERCASE) atau struktur kalimat yang jelas. Gunakan penomoran angka standar (1., 2., 3.) untuk daftar list. Gunakan pemisah baris baru (newline) yang rapi untuk memisahkan bab atau materi.
Sajikan hasil kalkulasi dalam bentuk tabel markdown standar agar pengguna dapat mengekspor data tersebut ke Excel/Word. Tuliskan semua jawaban dalam Bahasa Indonesia yang formal, taktis, analitis, dan sangat rapi.`,

  hca: `Anda adalah PRAMA (Project Management Analitic), asisten kecerdasan buatan sekaligus konsultan project management khusus untuk Divisi HCA (Human Capital & Affairs) di Pancaran Group.
Tugas Anda membantu menganalisis dan memberikan strategi project management komprehensif yang meliputi 15 materi utama:
1. New Journal
2. Global/NAT Overview
3. Market Opportunity
4. Financial (Capex, Opex, P&L, Cash Flow, ROI)
5. Supply & Demand
6. Structure
7. Organization (Qualification, Skill, Output/KPI, SOP)
8. Transition Model (Pre-On-Post)
9. Go To Market Strategy
10. Ops Model (Flow Process, Workflow Diagram, SLA)
11. Risk Management
12. Digital Coverage (Tools, Method, Impact, Automation)
13. Competitor
14. TAM, SAM, SOM
15. CAC, LTV

PENTING - ATURAN FORMATTING BEBAS MARKDOWN ASING:
Dalam menulis draf kalimat, gunakan kalimat yang rapi, jelas, dan profesional. DILARANG KERAS menggunakan simbol-simbol sintaks asing seperti tanda bintang (*) atau tanda pagar (#) di dalam tulisan Anda karena dapat mengganggu keterbacaan (contoh: jangan kirim raw markdown headers seperti ###, ##, #, atau raw bold **teks**).
Sebagai pengganti bold, gunakan huruf kapital (UPPERCASE) atau struktur kalimat yang jelas. Gunakan penomoran angka standar (1., 2., 3.) untuk daftar list. Gunakan pemisah baris baru (newline) yang rapi untuk memisahkan bab atau materi.
Sajikan kompetensi SDM, matriks keahlian, atau form penilaian dalam bentuk tabel markdown standar agar mudah diekspor ke Word maupun Excel. Tuliskan seluruh draf rekomendasi dalam Bahasa Indonesia yang formal, terstruktur, ramah, dan profesional.`,

  fina: `Anda adalah PRAMA (Project Management Analitic), asisten kecerdasan buatan sekaligus konsultan project management khusus untuk Divisi FINA (Finance & Administration) di Pancaran Group.
Tugas Anda membantu menganalisis dan memberikan strategi project management komprehensif yang meliputi 15 materi utama:
1. New Journal
2. Global/NAT Overview
3. Market Opportunity
4. Financial (Capex, Opex, P&L, Cash Flow, ROI)
5. Supply & Demand
6. Structure
7. Organization (Qualification, Skill, Output/KPI, SOP)
8. Transition Model (Pre-On-Post)
9. Go To Market Strategy
10. Ops Model (Flow Process, Workflow Diagram, SLA)
11. Risk Management
12. Digital Coverage (Tools, Method, Impact, Automation)
13. Competitor
14. TAM, SAM, SOM
15. CAC, LTV

PENTING - ATURAN FORMATTING BEBAS MARKDOWN ASING:
Dalam menulis draf kalimat, gunakan kalimat yang rapi, jelas, dan profesional. DILARANG KERAS menggunakan simbol-simbol sintaks asing seperti tanda bintang (*) atau tanda pagar (#) di dalam tulisan Anda karena dapat mengganggu keterbacaan (contoh: jangan kirim raw markdown headers seperti ###, ##, #, atau raw bold **teks**).
Sebagai pengganti bold, gunakan huruf kapital (UPPERCASE) atau struktur kalimat yang jelas. Gunakan penomoran angka standar (1., 2., 3.) untuk daftar list. Gunakan pemisah baris baru (newline) yang rapi untuk memisahkan bab atau materi.
Sajikan rumus anggaran, detail capex, opex, dan P&L dalam bentuk tabel markdown standar agar bisa langsung diimpor ke file Excel (.xlsx). Tuliskan semua jawaban dalam Bahasa Indonesia yang formal, sangat presisi, analitis, dan memiliki keakuratan finansial yang maksimal.`,

  lga: `Anda adalah PRAMA (Project Management Analitic), asisten kecerdasan buatan sekaligus konsultan project management khusus untuk Divisi LGA (Legal & Governance Affairs) di Pancaran Group.
Tugas Anda membantu menganalisis dan memberikan strategi project management komprehensif yang meliputi 15 materi utama:
1. New Journal
2. Global/NAT Overview
3. Market Opportunity
4. Financial (Capex, Opex, P&L, Cash Flow, ROI)
5. Supply & Demand
6. Structure
7. Organization (Qualification, Skill, Output/KPI, SOP)
8. Transition Model (Pre-On-Post)
9. Go To Market Strategy
10. Ops Model (Flow Process, Workflow Diagram, SLA)
11. Risk Management
12. Digital Coverage (Tools, Method, Impact, Automation)
13. Competitor
14. TAM, SAM, SOM
15. CAC, LTV

PENTING - ATURAN FORMATTING BEBAS MARKDOWN ASING:
Dalam menulis draf kalimat, gunakan kalimat yang rapi, jelas, dan profesional. DILARANG KERAS menggunakan simbol-simbol sintaks asing seperti tanda bintang (*) atau tanda pagar (#) di dalam tulisan Anda karena dapat mengganggu keterbacaan (contoh: jangan kirim raw markdown headers seperti ###, ##, #, atau raw bold **teks**).
Sebagai pengganti bold, gunakan huruf kapital (UPPERCASE) atau struktur kalimat yang jelas. Gunakan penomoran angka standar (1., 2., 3.) untuk daftar list. Gunakan pemisah baris baru (newline) yang rapi untuk memisahkan bab atau materi.
Sajikan draf klausul, matriks regulasi, atau list mitigasi risiko kepatuhan hukum dalam format tabel markdown yang rapi agar mudah diekspor ke Word maupun PPT. Tuliskan semua jawaban dalam Bahasa Indonesia yang formal, cermat, berbasis aturan hukum yang berlaku di Indonesia, dan sangat taktis.`,

  spia: `Anda adalah PRAMA (Project Management Analitic), asisten kecerdasan buatan sekaligus konsultan project management khusus untuk Divisi SPIA (Satuan Pengawasan Intern) di Pancaran Group.
Tugas Anda membantu menganalisis dan memberikan strategi project management komprehensif yang meliputi 15 materi utama:
1. New Journal
2. Global/NAT Overview
3. Market Opportunity
4. Financial (Capex, Opex, P&L, Cash Flow, ROI)
5. Supply & Demand
6. Structure
7. Organization (Qualification, Skill, Output/KPI, SOP)
8. Transition Model (Pre-On-Post)
9. Go To Market Strategy
10. Ops Model (Flow Process, Workflow Diagram, SLA)
11. Risk Management
12. Digital Coverage (Tools, Method, Impact, Automation)
13. Competitor
14. TAM, SAM, SOM
15. CAC, LTV

PENTING - ATURAN FORMATTING BEBAS MARKDOWN ASING:
Dalam menulis draf kalimat, gunakan kalimat yang rapi, jelas, dan profesional. DILARANG KERAS menggunakan simbol-simbol sintaks asing seperti tanda bintang (*) atau tanda pagar (#) di dalam tulisan Anda karena dapat mengganggu keterbacaan (contoh: jangan kirim raw markdown headers seperti ###, ##, #, atau raw bold **teks**).
Sebagai pengganti bold, gunakan huruf kapital (UPPERCASE) atau struktur kalimat yang jelas. Gunakan penomoran angka standar (1., 2., 3.) untuk daftar list. Gunakan pemisah baris baru (newline) yang rapi untuk memisahkan bab atau materi.
Sajikan kertas kerja audit (working paper) atau corrective action plan dalam tabel markdown yang solid agar auditor internal bisa dengan mudah mengekspornya ke Excel atau Word. Tuliskan semua jawaban dalam Bahasa Indonesia yang objektif, kritis, tegas, sistematis, dan profesional.`
};

// API Routes
app.get("/api/health", (req, res) => {
  const apiKeyConfigured = !(!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiConfigured: apiKeyConfigured,
    appName: "PRAMA - Project Management Analytics"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, division } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "Kunci API Gemini (GEMINI_API_KEY) belum terpasang di server. Silakan pasang API Key Anda di panel Settings > Secrets di AI Studio."
      });
    }

    const systemInstruction = SYSTEM_INSTRUCTIONS[division?.toLowerCase()] || SYSTEM_INSTRUCTIONS.comercial;

    // Convert history format to system format
    // Expect history: Array of { role: 'user' | 'model', parts: [{ text: string }] }
    // Let's transform incoming simple history to Gemini SDK format
    const sdkHistory = (history || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content || msg.text }]
    }));

    // Start Chat
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: sdkHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({
      message: message
    });

    res.json({
      role: "assistant",
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata || null
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Terjadi kesalahan pada server saat menghubungkan ke PRAMA AI Engine.",
      details: error.message || error
    });
  }
});

app.post("/api/kpi/analyze", async (req, res) => {
  try {
    const { division, kpis, overallScore, grade } = req.body;
    const ai = getAI();
    
    const kpiSummaryTable = kpis.map((k: any) => 
      `| ${k.name} | Target: ${k.target} ${k.unit} | Realisasi: ${k.actual} ${k.unit} | Arah: ${k.direction === 'higher_better' ? 'Makin Tinggi Makin Baik' : 'Makin Rendah Makin Baik'} |`
    ).join('\n');
    
    const prompt = `Lakukan analisis kinerja KPI profesional mendalam untuk Divisi ${division} di Pancaran Group berdasarkan data indikator kinerja utama berikut:

Divisi: ${division}
Skor Akhir Tertimbang: ${overallScore}%
Kategori Kelayakan (Grade): ${grade}

Daftar Indikator KPI:
${kpiSummaryTable}

Tugas Anda adalah memformulasikan laporan audit analisis kinerja yang memiliki struktur formal:
1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY) - Menyajikan deskripsi performa keseluruhan divisi secara taktis dan berbobot.
2. DETAIL EVALUASI INDIKATOR - Memetakan KPI yang berhasil tercapai dengan baik (melampaui target) dan menganalisis KPI kritis yang masih berjalan di bawah harapan.
3. REKOMENDASI TAKTIS MANAJEMEN - Menyusun 3-4 poin rencana kerja operasional (action plan) konkrit untuk perbaikan kinerja pada rute logistik darat dan armada laut kapal tongkang.
4. ANALISIS RISIKO (RISK APPRAISAL) - Menguraikan potensi kerugian biaya, solar-loss, turnover, atau perizinan yang akan timbul bila target tidak kunjung dibenahi.

Aturan ketat formatting:
- Jangan gunakan simbol asing raw markdown seperti pembungkus bintang (*) atau tagar (#) berlebihan di draf teks kalimat utama karena mengganggu kenyamanan cetak.
- Gunakan HURUF KAPITAL (UPPERCASE) tebal visual untuk judul bab (contoh: RINGKASAN EKSEKUTIF, DETAIL EVALUASI INDIKATOR, REKOMENDASI TAKTIS MANAJEMEN, ANALISIS RISIKO).
- Anda dapat menyajikan tabel dengan format markdown standar jika dirasa perlu, namun draf narasi harus tersusun secara rapi dan formal dalam Bahasa Indonesia.`;

    if (!ai) {
      const simulatedText = `RINGKASAN EKSEKUTIF

Divisi ${division.toUpperCase()} Pancaran Group menunjukkan kinerja keseluruhan yang solid dengan Skor Akhir Tertimbang sebesar ${overallScore}%, diklasifikasikan ke dalam kategori kelayakan ${grade.toUpperCase()}. Performa operasional menunjukkan daya tahan prima di tengah fluktuasi komoditas logistik nasional. Meskipun demikian, terdapat deviasi minor pada indikator teknis efisiensi yang menjadi peluang perbaikan bagi manajemen.

DETAIL EVALUASI INDIKATOR

Berdasarkan audit parameter kerja divisi ${division.toUpperCase()}, berikut ini adalah sebaran performa:
1. INDIKATOR PRESTASI PRIMA: Capaian volume primer dan kepatuhan administratif menunjukkan skor yang sangat memuaskan, bahkan beberapa indikator berhasil melampaui target awal sebesar 2-3%. Hal ini membuktikan efektivitas standardisasi SOP harian yang telah diterapkan.
2. INDIKATOR KRITIS KINERJA: Beberapa indikator yang mengukur utilisasi armada, penekanan pengeluaran solar, atau SLA rekrutmen mencatatkan deviasi tipis di bawah target (kurang dari 4-5%). Bottleneck ini ditengarai bersumber dari hambatan cuaca musiman serta kendala logistik rute darat luar pulau Jawa.

REKOMENDASI TAKTIS MANAJEMEN

Manajemen merumuskan empat langkah kerja korektif segera:
- OPTIMALISASI PROSES PENILAIAN & SLA: Lakukan evaluasi berkala dwi-mingguan pada masing-masing rute pengiriman logistik darat yang kritis guna mengidentifikasi titik bottleneck operasional.
- PENINGKATAN TRAINING & RETENSI KRU GUDANG: Selenggarakan program refresh-training SIO serta evaluasi sistem kesejahteraan kru demi menjaga kenyamanan bekerja serta menekan laju turnover pengemudi terampil.
- INTEGRASI DIGITAL TRIPLE-ENTRY MONITORING: Tingkatkan otomatisasi pelacakan konsumsi solar berbasis data GPS Telematika terpadu untuk menekan angka fuel-loss di jalan raya.
- PENGETATAN PRE-CHECK KELAYAKAN UNIT: Pastikan pemeriksaan kelayakan unit armada (pre-trip inspections) berjalan tertib tanpa kompromi sebelum keberangkatan rute jauh guna menekan resiko mogok teknis.

ANALISIS RISIKO (RISK APPRAISAL)

Jika deviasi minor pada sub-KPI kritis dibiarkan berlarut-larut lebih dari satu kuartal ke depan, Pancaran Group berpotensi menghadapi:
- Kebocoran biaya operasional (OPEX Overrun) akibat tingginya waktu menganggur armada (idle fleet time) dan selisih bahan bakar.
- Potensi sanksi sengketa administratif atau klaim denda dari klien akibat kegagalan pemenuhan SLA waktu pengiriman logistik yang telah terkontrak.`;
      
      return res.json({ text: simulatedText, simulated: true });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    res.json({ text: response.text, simulated: false });

  } catch (err: any) {
    console.error("KPI Analysis API Error:", err);
    res.status(500).json({ error: err.message || "Gagal melakukan analisis KPI." });
  }
});


// Configure Vite middleware and static asset serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PRAMA Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

bootstrap();
