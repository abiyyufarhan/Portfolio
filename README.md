<div align="center">

# 🚀 Abiyyu Farhan — Portfolio

### Data Science & AI Enthusiast

Situs portofolio pribadi bertema *cyber dark* dengan visualisasi 3D interaktif, dibangun untuk menampilkan proyek, keahlian, dan pengalaman di bidang **Data Science, Machine Learning, dan Data Engineering**.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](#-lisensi)

[Lihat Demo](#-demo) · [Fitur](#-fitur) · [Tumpukan Teknologi](#-tumpukan-teknologi) · [Instalasi](#-instalasi--menjalankan-secara-lokal) · [Kontak](#-kontak)

</div>

---

## 📖 Tentang Proyek

Repositori ini berisi kode sumber **website portofolio pribadi** milik **Abiyyu Farhan**, seorang *Data Scientist* dengan fokus pada *machine learning*, pemodelan statistik, dan rekayasa data. Situs ini dirancang sebagai *single-page application* statis (tanpa framework backend) dengan tampilan gelap ala *terminal/cyber* yang modern, lengkap dengan visualisasi 3D interaktif berupa "data pipeline" yang merespons pergerakan kursor pengguna.

Website ini mencakup ringkasan diri, daftar proyek unggulan, keahlian teknis, serta panel resume/CV yang dapat dipratinjau dan diunduh langsung dari halaman.

## ✨ Fitur

- **🧊 Visualisasi 3D Interaktif** — Ilustrasi *data pipeline/server rack* 3D real-time menggunakan Three.js pada bagian hero, yang bereaksi terhadap gerakan mouse pengguna.
- **📱 Desain Responsif** — Tampilan menyesuaikan dengan baik di perangkat desktop, tablet, maupun mobile, termasuk menu hamburger untuk layar kecil.
- **🎬 Animasi Scroll (Reveal on Scroll)** — Elemen-elemen muncul dengan animasi *fade-in-up* saat pengguna melakukan scroll.
- **🗂️ Showcase Proyek** — Kartu proyek unggulan yang terhubung langsung ke masing-masing repositori GitHub.
- **🧠 Bagian Keahlian & Tech Stack** — Dikelompokkan berdasarkan kategori: Programming & Libraries, Machine Learning & AI, Data Engineering, serta Visualization & Tools.
- **📄 Modal Pratinjau Resume** — Resume/CV (PDF) dapat dipratinjau langsung dalam modal *iframe*, dibuka di tab baru, atau diunduh langsung tanpa meninggalkan halaman.
- **🎨 Desain System Kustom** — Palet warna "Cyber Dark" (`#0B1120`, `#38BDF8`, dst.) dikonfigurasi khusus melalui `tailwind.config.js`.
- **⚡ Navbar Dinamis** — Navbar berubah tampilan (blur/border) saat halaman di-scroll, dengan tautan *smooth scroll* ke setiap bagian.

## 🖥️ Demo

Proyek ini adalah situs statis murni (HTML/CSS/JS) sehingga dapat langsung dijalankan tanpa proses build. Lihat bagian [Instalasi](#-instalasi--menjalankan-secara-lokal) untuk menjalankannya secara lokal, atau deploy dalam hitungan menit menggunakan **GitHub Pages**, **Netlify**, atau **Vercel**.

## 🧰 Tumpukan Teknologi

| Kategori | Teknologi |
|---|---|
| **Markup & Styling** | HTML5, [Tailwind CSS](https://tailwindcss.com/) (via CDN + konfigurasi kustom), CSS3 |
| **Interaktivitas** | Vanilla JavaScript (ES6+) |
| **Grafis 3D** | [Three.js](https://threejs.org/) `v0.160.0` |
| **Tipografi** | [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) |
| **Tanpa Build Tool** | Tidak memerlukan Node.js, bundler, maupun package manager untuk dijalankan |

## 📁 Struktur Proyek

```
1.-PORTOFOLIO/
├── index.html                              # Halaman utama portofolio (landing page)
├── resume.html                             # Konten resume yang dirender di dalam modal
├── script.js                               # Logika interaktif: navbar, menu mobile,
│                                            #   scene 3D Three.js, modal resume, animasi reveal
├── styles.css                              # Styling tambahan pelengkap Tailwind
├── tailwind.config.js                      # Konfigurasi tema Tailwind (palet "Cyber Dark")
├── resume.pdf                              # Berkas resume (versi umum)
└── Resume - Abiyyu Farhan (Data Science).pdf  # Berkas resume yang diunduh dari modal
```

## 🚀 Instalasi & Menjalankan Secara Lokal

Karena proyek ini adalah situs statis, tidak ada dependensi yang perlu diinstal. Ikuti langkah berikut:

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/abiyyufarhan/1.-PORTOFOLIO.git
   cd 1.-PORTOFOLIO
   ```

2. **Jalankan dengan local server** (disarankan, agar iframe resume dan font/CDN dimuat dengan sempurna)
   ```bash
   # Menggunakan Python
   python -m http.server 8000

   # Atau menggunakan Node.js (npx)
   npx serve .
   ```

3. **Buka di browser**
   ```
   http://localhost:8000
   ```

   Alternatifnya, `index.html` juga dapat dibuka langsung dengan mengklik dua kali (mode `file://`), meski sebagian browser dapat membatasi pemuatan `iframe` resume pada mode ini.

## ☁️ Deployment

Karena bersifat statis, proyek ini bisa langsung di-deploy secara gratis melalui:

- **GitHub Pages** — Settings → Pages → pilih branch `main` sebagai sumber.
- **Netlify** / **Vercel** — Hubungkan repositori ini, atur *build command* kosong dan *publish directory* ke `/` (root).

## 🌟 Proyek Unggulan yang Ditampilkan

Situs ini menyorot tiga proyek *data science* utama, masing-masing tertaut ke repositori terpisah:

| Proyek | Deskripsi Singkat | Tools |
|---|---|---|
| [**Sentiment Analysis**](https://github.com/abiyyufarhan/Sentiment_Analysis) | Pipeline NLP untuk analisis sentimen ulasan pengguna Honor of Kings dari Google Play Store, meliputi *web scraping*, *lexicon-based labeling*, ekstraksi fitur TF-IDF, dan perbandingan model ML. | Python, scikit-learn, NLP |
| [**Clustering & Classification**](https://github.com/abiyyufarhan/Clustering_Classification) | Proyek *unsupervised & supervised learning* pada data penjualan minuman — segmentasi pelanggan dengan K-Means dan prediksi pola penjualan. | Python, scikit-learn, Pandas |
| [**Credit Risk Scoring**](https://github.com/abiyyufarhan/Credit_Score) | Pemodelan risiko kredit *end-to-end* pada data Home Credit (300K+ baris) untuk membangun *scorecard* bergaya FICO (300–850) menggunakan Logistic Regression dan XGBoost. | Python, scikit-learn, XGBoost |

## 👤 Tentang Saya

Data Scientist dengan pengalaman 1+ tahun dalam *machine learning*, pemodelan statistik, dan rekayasa data — menjembatani teori analitis dengan sistem produksi dunia nyata, mulai dari eksplorasi data hingga *deployment* model.

## 📬 Kontak

- **Email:** [abiyyufarhann@gmail.com](mailto:abiyyufarhann@gmail.com)
- **Lokasi:** Banda Aceh, Indonesia
- **GitHub:** [@abiyyufarhan](https://github.com/abiyyufarhan)
- **LinkedIn:** [abiyyu-farhannn](https://www.linkedin.com/in/abiyyu-farhannn/)

> 💼 Status: *Open to opportunities*

## 📄 Lisensi

Proyek ini didistribusikan untuk keperluan portofolio pribadi. Jika Anda ingin menggunakan struktur atau desainnya sebagai referensi, silakan cantumkan atribusi ke repositori ini. Tambahkan berkas `LICENSE` (misalnya [MIT](https://choosealicense.com/licenses/mit/)) apabila ingin menetapkan lisensi terbuka secara resmi.

---

<div align="center">

Dibuat dengan ❤️ menggunakan HTML, Tailwind CSS & Three.js

</div>
