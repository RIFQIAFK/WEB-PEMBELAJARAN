/**
 * GOOGLE APPS SCRIPT FOR MEDIA PEMBELAJARAN FISIKA INTERAKTIF
 * Topik: Hukum Newton tentang Gravitasi & Hukum Kepler
 * 
 * Petunjuk Penggunaan:
 * 1. Buka Google Sheets baru di Google Drive Anda.
 * 2. Beri nama Spreadsheet, misalnya: "Hasil Kuis Fisika Gravitasi & Kepler".
 * 3. Baris pertama (Header) di Sheet1 akan dibuat otomatis oleh script ini jika belum ada.
 * 4. Klik menu Extensions (Ekstensi) > Apps Script.
 * 5. Hapus kode default, lalu Paste seluruh kode ini.
 * 6. Klik Deploy (Terapkan) > New deployment (Terapkan baru).
 * 7. Pilih type: Web app.
 * 8. Execute as: Me (Email Anda).
 * 9. Who has access: Anyone (Siapa saja).
 * 10. Klik Deploy, berikan izin akses (Authorize access).
 * 11. Salin "Web App URL" dan tempelkan ke variabel `GOOGLE_SHEET_URL` di file `app.js`.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Jika sheet masih kosong, buat Header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Waktu Input",
        "Nama Siswa",
        "Kelas",
        "Sekolah / Instansi",
        "Skor Total",
        "Jumlah Benar",
        "Jumlah Soal",
        "Persentase (%)",
        "Jawaban Soal 1",
        "Jawaban Soal 2",
        "Jawaban Soal 3",
        "Jawaban Soal 4",
        "Jawaban Soal 5",
        "Refleksi / Catatan Siswa"
      ]);
      // Format header agar rapi
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#4F46E5");
      headerRange.setFontColor("#FFFFFF");
    }

    // Ambil data JSON yang dikirim dari Web App
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    var rowData = [
      formattedDate,
      data.nama || "Anonim",
      data.kelas || "-",
      data.instansi || "-",
      data.skor || 0,
      data.jumlahBenar || 0,
      data.totalSoal || 5,
      data.persentase || "0%",
      data.jawaban ? (data.jawaban[0] || "-") : "-",
      data.jawaban ? (data.jawaban[1] || "-") : "-",
      data.jawaban ? (data.jawaban[2] || "-") : "-",
      data.jawaban ? (data.jawaban[3] || "-") : "-",
      data.jawaban ? (data.jawaban[4] || "-") : "-",
      data.catatan || "-"
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "row": sheet.getLastRow(),
      "message": "Data berhasil disimpan ke Google Spreadsheet!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script Endpoint Media Pembelajaran Fisika Aktif!");
}
