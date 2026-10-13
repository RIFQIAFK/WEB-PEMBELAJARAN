# Media Pembelajaran Interaktif Fisika SMA (Fase F - Kelas XI)
## Topik: Hukum Newton tentang Gravitasi & Hukum Kepler
**Pendekatan:** Problem-Based Learning (PBL) & Deep Learning (Mindful, Meaningful, & Joyful Learning)

---

### 📂 Struktur Workspace Files:
1. `index.html` - Aplikasi media pembelajaran interaktif berbasis web.
2. `style.css` - Custom styling UI (Glassmorphism & Dark Mode modern).
3. `app.js` - Logika interaktif kuis, phet simulation embed, & koneksi API Google Spreadsheet.
4. `google-apps-script.gs` - Kode backend Google Apps Script untuk Google Sheets.

---

### 🚀 Cara Menjalankan Media Pembelajaran:
1. Buka file `index.html` langsung dengan mengklik dua kali (double click) di File Explorer atau menggunakan Web Browser (Google Chrome / Edge / Firefox).
2. Anda juga dapat menggunakan live server lokal (misalnya VS Code Live Server atau Extension).

---

### 📊 Cara Menyambungkan ke Google Spreadsheet (Integrasi Direct):
1. **Buka Google Sheets:**
   - Buat Spreadsheet baru di Google Drive Anda.
   - Beri nama (misal: `Hasil Kuis Fisika Gravitasi`).
2. **Buka Apps Script:**
   - Di Google Sheets, klik menu **Extensions (Ekstensi)** > **Apps Script**.
   - Hapus semua kode default, lalu salin (copy) seluruh isi file `google-apps-script.gs` dan tempel (paste) di sana.
3. **Deploy (Terapkan) sebagai Web App:**
   - Klik tombol **Deploy** di pojok kanan atas > **New deployment**.
   - Pilih jenis deployment: **Web app**.
   - Atur **Execute as:** `Me (Email Anda)`.
   - Atur **Who has access:** `Anyone` (Siapa saja).
   - Klik **Deploy**, lalu berikan izin otorisasi (Authorize access).
4. **Salin Web App URL & Tempel di Web Media:**
   - Salin **Web App URL** (berakhir dengan `/exec`).
   - Di web media (`index.html`), klik tombol **Status Google Sheet** di pojok kanan atas.
   - Tempelkan URL tersebut ke kolom **URL Google Apps Script Web App**, lalu klik **Simpan Pengaturan**.
5. **Selesai!** Setiap siswa yang mengerjakan kuis di Bagian 5, nilainya akan **langsung terkirim secara real-time** ke Google Spreadsheet Anda.
# PEMBELAJARAN-FISIKA
