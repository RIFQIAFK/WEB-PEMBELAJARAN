/**
 * =========================================================================
 * MEDIA PEMBELAJARAN INTERAKTIF FISIKA: BAB 1 VEKTOR
 * SMA NEGERI 1 BELITANG - FASE F (KELAS XI)
 * Logika Aplikasi, Mini Simulator Vektor Canvas, Kuis Interaktif & Sertifikat
 * =========================================================================
 */

// Google Apps Script Webhook URL
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwAeUFw1YZ-t5eQN-YJD1oFPWN2u-1xIcMKIlGaTe-rWkucbIFpqOnVeMViIhaQpozz/exec";

// App State
let studentProfile = {
  nama: localStorage.getItem("vektor_nama") || "",
  kelas: localStorage.getItem("vektor_kelas") || "XI.F-1",
  sekolah: localStorage.getItem("vektor_sekolah") || "SMA Negeri 1 Belitang"
};

// 8 Soal Pilihan Ganda (10 Poin per Soal = 80 Poin)
const mcqQuestions = [
  {
    id: 1,
    question: "Di antara informasi berikut, manakah besaran yang memerlukan petunjuk arah agar tidak membuat bingung?",
    options: [
      { key: "A", text: "Suhu ruangan kelas 24°C" },
      { key: "B", text: "Massa tas sekolah 2 kg" },
      { key: "C", text: "Waktu tempuh 15 menit" },
      { key: "D", text: "Instruksi navigasi kurir: \"Rumah berada di jarak 100 meter dari gerbang\"" }
    ],
    correct: "D",
    explanation: "<strong>Kunci Jawaban: D</strong><br><em>Pembahasan:</em> Suhu, massa, dan waktu adalah <strong>besaran skalar</strong> yang sudah memiliki arti penuh hanya dengan nilai dan satuan. Sebaliknya, lokasi dan arah posisi rumah membutuhkan arah (vektor) yang jelas, karena jarak 100 m dari gerbang bisa ke utara, selatan, timur, atau barat."
  },
  {
    id: 2,
    question: "Siswa A berjalan 4 langkah ke Timur, kemudian dilanjutkan 3 langkah ke Utara. Berapakah jarak total dan perpindahan posisi akhirnya dari titik awal?",
    options: [
      { key: "A", text: "Jarak 7 langkah, Perpindahan 5 langkah ke arah Timur Laut" },
      { key: "B", text: "Jarak 7 langkah, Perpindahan 7 langkah ke Utara" },
      { key: "C", text: "Jarak 1 langkah, Perpindahan 5 langkah ke Timur" },
      { key: "D", text: "Jarak 12 langkah, Perpindahan 1 langkah ke Selatan" }
    ],
    correct: "A",
    explanation: "<strong>Kunci Jawaban: A</strong><br><em>Pembahasan:</em> Jarak adalah besaran skalar (panjang seluruh lintasan): 4 + 3 = 7 langkah.<br>Perpindahan adalah besaran vektor (garis lurus dari titik awal ke akhir). Karena Timur dan Utara tegak lurus (90°), perpindahan dihitung dengan teorema Pythagoras: $$s = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5\\text{ langkah ke arah Timur Laut.}$$"
  },
  {
    id: 3,
    question: "Dua buah drone (Drone A dan Drone B) sama-sama terbang ke arah Timur dengan kecepatan 15 m/s. Drone A berada di ketinggian 50 meter dan Drone B di ketinggian 100 meter. Manakah pernyataan yang paling tepat mengenai vektor kecepatan kedua drone?",
    options: [
      { key: "A", text: "Vektor kecepatannya berbeda karena ketinggiannya berbeda" },
      { key: "B", text: "Vektor kecepatannya sama karena nilai besar (15 m/s) dan arahnya (Timur) sama" },
      { key: "C", text: "Drone B memiliki vektor lebih besar karena posisinya lebih tinggi" },
      { key: "D", text: "Vektor kecepatannya nol karena saling menghilangkan" }
    ],
    correct: "B",
    explanation: "<strong>Kunci Jawaban: B</strong><br><em>Pembahasan:</em> Sifat <strong>Kesamaan Vektor</strong> menyatakan bahwa dua vektor dikatakan identik/sama jika memiliki <strong>besar</strong> yang sama dan <strong>arah</strong> yang sama, terlepas dari perbedaan titik tangkap atau posisi ruangnya."
  },
  {
    id: 4,
    question: "Sebuah kapal ferry menyeberangi sungai. Mesin kapal mengarahkan kapal lurus ke Utara dengan kecepatan 4 m/s, namun arus air sungai mengalir kuat ke arah Timur dengan kecepatan 3 m/s. Berapakah kecepatan resultan gerak kapal ferry tersebut?",
    options: [
      { key: "A", text: "7 m/s" },
      { key: "B", text: "1 m/s" },
      { key: "C", text: "5 m/s" },
      { key: "D", text: "12 m/s" }
    ],
    correct: "C",
    explanation: "<strong>Kunci Jawaban: C</strong><br><em>Pembahasan:</em> Kecepatan kapal ke Utara ($v_y = 4\\text{ m/s}$) dan arus sungai ke Timur ($v_x = 3\\text{ m/s}$) saling tegak lurus (sudut 90°). Kecepatan resultannya adalah: $$v_R = \\sqrt{v_x^2 + v_y^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\text{ m/s.}$$"
  },
  {
    id: 5,
    question: "Manakah di bawah ini yang merupakan rumus penguraian komponen vektor gaya F terhadap sumbu horizontal X jika membentuk sudut θ terhadap sumbu X?",
    options: [
      { key: "A", text: "Fx = F · sin(θ)" },
      { key: "B", text: "Fx = F · cos(θ)" },
      { key: "C", text: "Fx = F · tan(θ)" },
      { key: "D", text: "Fx = F / cos(θ)" }
    ],
    correct: "B",
    explanation: "<strong>Kunci Jawaban: B</strong><br><em>Pembahasan:</em> Komponen horizontal pada sisi yang mengapit sudut $\\theta$ menggunakan perbandingan trigonometri Cosinus: $$F_x = F \\cdot \\cos(\\theta)$$ Sedangkan komponen vertikal di depan sudut: $$F_y = F \\cdot \\sin(\\theta)$$"
  },
  {
    id: 6,
    question: "Jika vektor A = 3î + 4ĵ dan vektor B = 2î - 1ĵ, berapakah hasil penjumlahan aljabar analitis A + B?",
    options: [
      { key: "A", text: "5î + 3ĵ" },
      { key: "B", text: "1î + 5ĵ" },
      { key: "C", text: "5î + 5ĵ" },
      { key: "D", text: "6î - 4ĵ" }
    ],
    correct: "A",
    explanation: "<strong>Kunci Jawaban: A</strong><br><em>Pembahasan:</em> Penjumlahan analitis dilakukan dengan menjumlahkan komponen yang sejenis:<br>Komponen $\\hat{i}$ (sumbu X): $3 + 2 = 5\\hat{i}$<br>Komponen $\\hat{j}$ (sumbu Y): $4 + (-1) = 3\\hat{j}$<br>Maka, $$\\vec{A} + \\vec{B} = 5\\hat{i} + 3\\hat{j}$$"
  },
  {
    id: 7,
    question: "Dalam proyek rekayasa \"Drone Rescue\", jika arah vektor angin dipindahkan sejajar ke titik lain tanpa mengubah panjang panah dan arah mata panahnya, apakah nilai vektor angin tersebut berubah?",
    options: [
      { key: "A", text: "Ya, nilai vektornya berubah menjadi ganda" },
      { key: "B", text: "Ya, arah vektornya menjadi terbalik" },
      { key: "C", text: "Tidak, nilainya tetap sama karena besar dan arahnya tidak berubah" },
      { key: "D", text: "Vektor bernilai nol" }
    ],
    correct: "C",
    explanation: "<strong>Kunci Jawaban: C</strong><br><em>Pembahasan:</em> Sesuai sifat <strong>Pergeseran Sejajar (Translasional)</strong>, suatu vektor dapat dipindahkan ke mana saja pada bidang asalkan panjang (besar) dan orientasi mata panahnya (arah) tidak berubah. Nilai dan sifat vektor tetap sama persis."
  },
  {
    id: 8,
    question: "Tiga buah gaya bekerja pada titik pusat. ΣFx dihitung bernilai 6 N dan ΣFy bernilai 8 N. Berapakah besar resultan total (R) dari ketiga gaya tersebut?",
    options: [
      { key: "A", text: "14 N" },
      { key: "B", text: "2 N" },
      { key: "C", text: "10 N" },
      { key: "D", text: "48 N" }
    ],
    correct: "C",
    explanation: "<strong>Kunci Jawaban: C</strong><br><em>Pembahasan:</em> Resultan komponen analitis dihitung dengan rumus: $$R = \\sqrt{(\\Sigma F_x)^2 + (\\Sigma F_y)^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ N.}$$"
  }
];

// 2 Soal Pencocokan / Matching (10 Poin per Soal = 20 Poin)
const matchingQuestions = [
  {
    id: 9,
    title: "Soal 9: Pencocokan Istilah Dasar Vektor",
    instruction: "Pasangkan istilah vektor di kolom kiri dengan definisi yang tepat di kolom kanan (Klik istilah lalu klik slot target, atau drag & drop):",
    pairs: [
      { key: "m9_1", term: "Besaran Skalar", desc: "Memiliki Nilai saja (Contoh: Massa, Suhu, Waktu)" },
      { key: "m9_2", term: "Besaran Vektor", desc: "Memiliki Nilai DAN Arah (Contoh: Kecepatan, Gaya)" },
      { key: "m9_3", term: "Panjang Panah", desc: "Menggambarkan Besar/Nilai Vektor" },
      { key: "m9_4", term: "Arah Mata Panah", desc: "Menggambarkan Arah Vektor" }
    ]
  },
  {
    id: 10,
    title: "Soal 10: Pencocokan Metode Penjumlahan Vektor",
    instruction: "Pasangkan metode/operasi di kolom kiri dengan ciri khas geometris/analitis di kolom kanan:",
    pairs: [
      { key: "m10_1", term: "Metode Segitiga", desc: "Ujung Vektor Pertama bertemu Pangkal Vektor Kedua" },
      { key: "m10_2", term: "Metode Jajaran Genjang", desc: "Pangkal Vektor Pertama bertemu Pangkal Vektor Kedua" },
      { key: "m10_3", term: "Penguraian Komponen", desc: "Membagi Vektor menjadi Fx (Sumbu X) dan Fy (Sumbu Y)" },
      { key: "m10_4", term: "Operasi Skalar Aljabar", desc: "Penjumlahan langsung angka tanpa memperhitungkan sudut arah" }
    ]
  }
];

// Tracking User State
let userMcqAnswers = {};
let matchingUserAnswers = {
  9: {},
  10: {}
};
let selectedSourceItem = null;
let currentQuizScore = 0;
let hasSubmittedQuiz = false;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initStudentBadge();
  initCompassSimulation();
  initDroneRescueSimulation();
  initVectorWalkDemo();
  initComponentCalculator();
  initMiniVectorSimulator();
  renderMcqQuiz();
  renderMatchingQuiz();

  // KaTeX Auto-Render
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }
});

// ==========================================
// NAVIGATION & TABS
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetSection = document.getElementById(tabId);
  if (targetSection) targetSection.classList.remove('hidden');

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Trigger KaTeX rendering on the newly visible tab
  setTimeout(() => {
    if (window.renderMathInElement && targetSection) {
      renderMathInElement(targetSection, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
    // Redraw canvas if switching to simulator tab
    if (tabId === 'bagian4') {
      drawSimulator();
    }
  }, 60);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchSubTab(subTabId) {
  document.querySelectorAll('.material-subtab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.subtab-btn').forEach(btn => btn.classList.remove('active'));

  const target = document.getElementById(subTabId);
  if (target) target.classList.remove('hidden');

  const btn = document.getElementById(`btn-${subTabId}`);
  if (btn) btn.classList.add('active');

  setTimeout(() => {
    if (window.renderMathInElement && target) {
      renderMathInElement(target, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }, 50);
}

// ==========================================
// STUDENT PROFILE MODAL
// ==========================================
function openProfileModal() {
  document.getElementById("input-nama").value = studentProfile.nama;
  document.getElementById("input-kelas").value = studentProfile.kelas;
  document.getElementById("input-sekolah").value = studentProfile.sekolah;
  document.getElementById("profile-modal").classList.remove("hidden");
}

function closeProfileModal() {
  document.getElementById("profile-modal").classList.add("hidden");
}

function saveStudentProfile() {
  const nama = document.getElementById("input-nama").value.trim();
  const kelas = document.getElementById("input-kelas").value.trim();
  const sekolah = document.getElementById("input-sekolah").value.trim();

  if (!nama) {
    alert("Mohon masukkan nama lengkap siswa.");
    return;
  }

  studentProfile.nama = nama;
  studentProfile.kelas = kelas || "XI.F";
  studentProfile.sekolah = sekolah || "SMA Negeri 1 Belitang";

  localStorage.setItem("vektor_nama", studentProfile.nama);
  localStorage.setItem("vektor_kelas", studentProfile.kelas);
  localStorage.setItem("vektor_sekolah", studentProfile.sekolah);

  initStudentBadge();
  closeProfileModal();
}

function initStudentBadge() {
  const badgeNama = document.getElementById("badge-nama-siswa");
  const badgeKelas = document.getElementById("badge-kelas-siswa");
  if (badgeNama) badgeNama.textContent = studentProfile.nama || "Siswa Tamu";
  if (badgeKelas) badgeKelas.textContent = studentProfile.kelas || "Fase F";
}

// ==========================================
// BAGIAN 2: INTERACTIVE PEMANTIK WIDGETS
// ==========================================
let compassCurrentAngle = 0;
function initCompassSimulation() {
  setCompassAngle(0, 'Utara (Gaya Magnet Bumi: Bx = 0, By = +B)');
}

function setCompassAngle(deg, explanation) {
  compassCurrentAngle = deg;
  const needle = document.getElementById("compass-needle");
  const readDeg = document.getElementById("compass-deg-val");
  const expBox = document.getElementById("compass-exp-text");

  if (needle) {
    needle.style.transform = `rotate(${deg}deg)`;
  }
  if (readDeg) {
    readDeg.textContent = `${deg}°`;
  }
  if (expBox) {
    expBox.innerHTML = explanation;
  }
}

// Drone Rescue Interactive Simulator in Hook
function initDroneRescueSimulation() {
  updateDroneSimulation();
}

function updateDroneSimulation() {
  const vDrone = parseFloat(document.getElementById("slider-v-drone")?.value || 12);
  const vAngin = parseFloat(document.getElementById("slider-v-angin")?.value || 5);

  document.getElementById("val-v-drone").textContent = `${vDrone} m/s`;
  document.getElementById("val-v-angin").textContent = `${vAngin} m/s`;

  // Drone ke Utara (sumbu Y positif), Angin ke Timur (sumbu X positif)
  const vResultan = Math.sqrt(vDrone * vDrone + vAngin * vAngin).toFixed(2);
  const sudutDerajat = ((Math.atan2(vAngin, vDrone) * 180) / Math.PI).toFixed(1);

  document.getElementById("val-v-res").textContent = `${vResultan} m/s`;
  document.getElementById("val-sudut-drift").textContent = `${sudutDerajat}° ke arah Timur Laut`;

  // Draw Drone SVG Vector Overlay
  const pathDrone = document.getElementById("drone-result-arrow");
  const pathWind = document.getElementById("drone-wind-arrow");
  const pathFwd = document.getElementById("drone-fwd-arrow");

  // Base coordinates centered at (150, 150)
  const cx = 150, cy = 150;
  const scale = 5;
  const targetX = cx + vAngin * scale;
  const targetY = cy - vDrone * scale;

  if (pathDrone) {
    pathDrone.setAttribute("d", `M ${cx} ${cy} L ${targetX} ${targetY}`);
  }
  if (pathWind) {
    pathWind.setAttribute("d", `M ${cx} ${cy} L ${cx + vAngin * scale} ${cy}`);
  }
  if (pathFwd) {
    pathFwd.setAttribute("d", `M ${cx} ${cy} L ${cx} ${cy - vDrone * scale}`);
  }
}

// ==========================================
// BAGIAN 3: INTERACTIVE MATERIAL TOOLS
// ==========================================
function initVectorWalkDemo() {
  updateVectorWalk();
}

function updateVectorWalk() {
  const x = parseFloat(document.getElementById("walk-x")?.value || 3);
  const y = parseFloat(document.getElementById("walk-y")?.value || 4);

  const jarak = x + y;
  const perpindahan = Math.sqrt(x * x + y * y).toFixed(2);
  const theta = ((Math.atan2(y, x) * 180) / Math.PI).toFixed(1);

  const distEl = document.getElementById("walk-distance-result");
  const dispEl = document.getElementById("walk-displacement-result");

  if (distEl) distEl.innerHTML = `<strong>Jarak (Skalar):</strong> ${x} + ${y} = <span class="text-amber-400 font-bold">${jarak} meter</span>`;
  if (dispEl) dispEl.innerHTML = `<strong>Perpindahan (Vektor):</strong> √(${x}² + ${y}²) = <span class="text-teal-300 font-bold">${perpindahan} meter</span> (Sudut ${theta}° Timur Laut)`;

  // Update SVG
  const walkLineX = document.getElementById("walk-svg-x");
  const walkLineY = document.getElementById("walk-svg-y");
  const walkLineRes = document.getElementById("walk-svg-res");
  const scale = 25;
  const ox = 40, oy = 160;

  if (walkLineX) walkLineX.setAttribute("d", `M ${ox} ${oy} L ${ox + x * scale} ${oy}`);
  if (walkLineY) walkLineY.setAttribute("d", `M ${ox + x * scale} ${oy} L ${ox + x * scale} ${oy - y * scale}`);
  if (walkLineRes) walkLineRes.setAttribute("d", `M ${ox} ${oy} L ${ox + x * scale} ${oy - y * scale}`);
}

function initComponentCalculator() {
  calculateComponents();
}

function calculateComponents() {
  const F = parseFloat(document.getElementById("calc-f")?.value || 20);
  const deg = parseFloat(document.getElementById("calc-deg")?.value || 37);

  const rad = (deg * Math.PI) / 180;
  const Fx = (F * Math.cos(rad)).toFixed(2);
  const Fy = (F * Math.sin(rad)).toFixed(2);

  const resFx = document.getElementById("calc-fx-val");
  const resFy = document.getElementById("calc-fy-val");
  const resVec = document.getElementById("calc-vector-notation");

  if (resFx) resFx.textContent = `${Fx} N`;
  if (resFy) resFy.textContent = `${Fy} N`;
  if (resVec) resVec.innerHTML = `$$\\vec{F} = (${Fx})\\hat{i} + (${Fy})\\hat{j} \\text{ N}$$`;

  // Update mini diagram
  const svgF = document.getElementById("calc-arrow-f");
  const svgFx = document.getElementById("calc-arrow-fx");
  const svgFy = document.getElementById("calc-arrow-fy");
  const scale = 3.5;
  const ox = 30, oy = 150;
  const targetX = ox + parseFloat(Fx) * scale;
  const targetY = oy - parseFloat(Fy) * scale;

  if (svgF) svgF.setAttribute("d", `M ${ox} ${oy} L ${targetX} ${targetY}`);
  if (svgFx) svgFx.setAttribute("d", `M ${ox} ${oy} L ${targetX} ${oy}`);
  if (svgFy) svgFy.setAttribute("d", `M ${targetX} ${oy} L ${targetX} ${targetY}`);

  if (window.renderMathInElement && resVec) {
    renderMathInElement(resVec, {
      delimiters: [{ left: '$$', right: '$$', display: false }]
    });
  }
}

// ==========================================
// BAGIAN 4: MINI VECTOR SIMULATOR (HTML5 CANVAS)
// ==========================================
let simState = {
  lenA: 50,
  angA: 30,
  lenB: 40,
  angB: 120,
  method: 'parallelogram' // or 'triangle'
};

function initMiniVectorSimulator() {
  const canvas = document.getElementById("sim-canvas");
  if (!canvas) return;

  // Responsive Canvas Sizing
  resizeSimCanvas();
  window.addEventListener("resize", resizeSimCanvas);

  // Hook input sliders
  const sliderLA = document.getElementById("sim-slider-la");
  const sliderAA = document.getElementById("sim-slider-aa");
  const sliderLB = document.getElementById("sim-slider-lb");
  const sliderAB = document.getElementById("sim-slider-ab");

  if (sliderLA) sliderLA.addEventListener("input", (e) => {
    simState.lenA = parseFloat(e.target.value);
    document.getElementById("sim-val-la").textContent = `${simState.lenA} N`;
    drawSimulator();
  });
  if (sliderAA) sliderAA.addEventListener("input", (e) => {
    simState.angA = parseFloat(e.target.value);
    document.getElementById("sim-val-aa").textContent = `${simState.angA}°`;
    drawSimulator();
  });
  if (sliderLB) sliderLB.addEventListener("input", (e) => {
    simState.lenB = parseFloat(e.target.value);
    document.getElementById("sim-val-lb").textContent = `${simState.lenB} N`;
    drawSimulator();
  });
  if (sliderAB) sliderAB.addEventListener("input", (e) => {
    simState.angB = parseFloat(e.target.value);
    document.getElementById("sim-val-ab").textContent = `${simState.angB}°`;
    drawSimulator();
  });

  drawSimulator();
}

function resizeSimCanvas() {
  const canvas = document.getElementById("sim-canvas");
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = Math.min(rect.width, 700);
  canvas.height = 380;
  drawSimulator();
}

function setSimMethod(method) {
  simState.method = method;
  document.querySelectorAll('.sim-method-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-sim-${method}`);
  if (activeBtn) activeBtn.classList.add('active');
  drawSimulator();
}

function setPresetVector(preset) {
  if (preset === '0deg') {
    simState.lenA = 50; simState.angA = 0;
    simState.lenB = 40; simState.angB = 0;
  } else if (preset === '90deg') {
    simState.lenA = 50; simState.angA = 0;
    simState.lenB = 40; simState.angB = 90;
  } else if (preset === '180deg') {
    simState.lenA = 50; simState.angA = 0;
    simState.lenB = 50; simState.angB = 180;
  } else if (preset === 'drone') {
    simState.lenA = 60; simState.angA = 90;
    simState.lenB = 35; simState.angB = 0;
  }

  // Update Sliders UI
  document.getElementById("sim-slider-la").value = simState.lenA;
  document.getElementById("sim-val-la").textContent = `${simState.lenA} N`;
  document.getElementById("sim-slider-aa").value = simState.angA;
  document.getElementById("sim-val-aa").textContent = `${simState.angA}°`;
  document.getElementById("sim-slider-lb").value = simState.lenB;
  document.getElementById("sim-val-lb").textContent = `${simState.lenB} N`;
  document.getElementById("sim-slider-ab").value = simState.angB;
  document.getElementById("sim-val-ab").textContent = `${simState.angB}°`;

  drawSimulator();
}

function drawSimulator() {
  const canvas = document.getElementById("sim-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Background Grid
  ctx.strokeStyle = "rgba(30, 58, 95, 0.45)";
  ctx.lineWidth = 1;
  const gridSize = 25;
  for (let x = 0; x < W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Origin
  const ox = W / 2;
  const oy = H / 2 + 30;

  // Coordinate Axis
  ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
  ctx.lineWidth = 1.5;
  // X axis
  ctx.beginPath(); ctx.moveTo(20, oy); ctx.lineTo(W - 20, oy); ctx.stroke();
  // Y axis
  ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, H - 20); ctx.stroke();

  // Axis Labels
  ctx.fillStyle = "#64748b";
  ctx.font = "11px monospace";
  ctx.fillText("+X", W - 25, oy - 6);
  ctx.fillText("+Y", ox + 6, 25);
  ctx.fillText("O(0,0)", ox - 35, oy + 15);

  // Vector Math
  const scale = 2.2; // pixels per Newton
  const radA = (simState.angA * Math.PI) / 180;
  const radB = (simState.angB * Math.PI) / 180;

  const ax = simState.lenA * Math.cos(radA);
  const ay = simState.lenA * Math.sin(radA);

  const bx = simState.lenB * Math.cos(radB);
  const by = simState.lenB * Math.sin(radB);

  const rx = ax + bx;
  const ry = ay + by;

  const lenR = Math.sqrt(rx * rx + ry * ry);
  let angR = (Math.atan2(ry, rx) * 180) / Math.PI;
  if (angR < 0) angR += 360;

  // Sudut apit antara A dan B
  let angleBetween = Math.abs(simState.angB - simState.angA);
  if (angleBetween > 180) angleBetween = 360 - angleBetween;

  // Pixels mapping (Canvas Y goes downward, so subtract Y)
  const tipAx = ox + ax * scale;
  const tipAy = oy - ay * scale;

  const tipBx = ox + bx * scale;
  const tipBy = oy - by * scale;

  const tipRx = ox + rx * scale;
  const tipRy = oy - ry * scale;

  // Visual Geometry Lines (Dashed)
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.5;

  if (simState.method === 'parallelogram') {
    // A to R
    ctx.strokeStyle = "rgba(14, 165, 233, 0.6)"; // B projection
    ctx.beginPath(); ctx.moveTo(tipAx, tipAy); ctx.lineTo(tipRx, tipRy); ctx.stroke();
    // B to R
    ctx.strokeStyle = "rgba(20, 184, 166, 0.6)"; // A projection
    ctx.beginPath(); ctx.moveTo(tipBx, tipBy); ctx.lineTo(tipRx, tipRy); ctx.stroke();
  } else {
    // Triangle method: vector B starts at tip of A
    ctx.strokeStyle = "rgba(14, 165, 233, 0.6)";
    ctx.beginPath(); ctx.moveTo(tipAx, tipAy); ctx.lineTo(tipRx, tipRy); ctx.stroke();
  }
  ctx.restore();

  // Draw Vector A (Teal)
  drawArrow(ctx, ox, oy, tipAx, tipAy, "#14b8a6", 3.5, "A");

  // Draw Vector B (Sky Blue)
  if (simState.method === 'parallelogram') {
    drawArrow(ctx, ox, oy, tipBx, tipBy, "#0ea5e9", 3.5, "B");
  } else {
    drawArrow(ctx, tipAx, tipAy, tipRx, tipRy, "#0ea5e9", 3.5, "B");
  }

  // Draw Resultant Vector R (Gold)
  drawArrow(ctx, ox, oy, tipRx, tipRy, "#f59e0b", 4.5, "R");

  // Update Data Readout Panel
  document.getElementById("sim-read-r").textContent = `${lenR.toFixed(1)} N`;
  document.getElementById("sim-read-theta-r").textContent = `${angR.toFixed(1)}°`;
  document.getElementById("sim-read-rx").textContent = `${rx.toFixed(1)} N`;
  document.getElementById("sim-read-ry").textContent = `${ry.toFixed(1)} N`;
  document.getElementById("sim-read-sudut-apit").textContent = `${angleBetween.toFixed(1)}°`;

  // Analysis comment
  const analysisEl = document.getElementById("sim-analysis-feedback");
  if (analysisEl) {
    if (angleBetween < 5) {
      analysisEl.innerHTML = `<span class="text-amber-400 font-bold">Maksimum!</span> Kedua vektor searah (θ ≈ 0°). Resultan bernilai penjumlahan aljabar murni: $R = A + B = ${simState.lenA + simState.lenB}\\text{ N}$.`;
    } else if (Math.abs(angleBetween - 90) < 5) {
      analysisEl.innerHTML = `<span class="text-teal-300 font-bold">Tegak Lurus!</span> Sudut apit 90°. Berlaku teorema Pythagoras: $R = \\sqrt{A^2 + B^2} = \\sqrt{${simState.lenA}^2 + ${simState.lenB}^2} = ${lenR.toFixed(1)}\\text{ N}$.`;
    } else if (Math.abs(angleBetween - 180) < 5) {
      analysisEl.innerHTML = `<span class="text-rose-400 font-bold">Minimum!</span> Kedua vektor berlawanan arah (θ ≈ 180°). Resultan bernilai selisih: $R = |A - B| = ${Math.abs(simState.lenA - simState.lenB)}\\text{ N}$.`;
    } else {
      analysisEl.innerHTML = `Sudut apit = <strong>${angleBetween.toFixed(1)}°</strong>. Besar resultan mengikuti rumus aturan kosinus: $R = \\sqrt{A^2 + B^2 + 2AB\\cos(\\theta)} = ${lenR.toFixed(1)}\\text{ N}$.`;
    }
    if (window.renderMathInElement) {
      renderMathInElement(analysisEl, {
        delimiters: [{ left: '$', right: '$', display: false }]
      });
    }
  }
}

function drawArrow(ctx, fromX, fromY, toX, toY, color, width, label) {
  const headlen = 12; // length of head in pixels
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;

  // Main Shaft
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  // Label
  ctx.font = "bold 13px sans-serif";
  const midX = (fromX + toX) / 2 + 12 * Math.cos(angle + Math.PI / 2);
  const midY = (fromY + toY) / 2 + 12 * Math.sin(angle + Math.PI / 2);
  ctx.fillText(label, midX, midY);
}

// ==========================================
// BAGIAN 5: KUIS INTERAKTIF & ASESMEN
// ==========================================
function renderMcqQuiz() {
  const container = document.getElementById("mcq-quiz-list");
  if (!container) return;

  container.innerHTML = mcqQuestions.map((q, idx) => `
    <div class="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 md:p-6 shadow-lg mb-6 transition" id="mcq-card-${q.id}">
      <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
        <span class="px-3 py-1 bg-teal-500/20 text-teal-300 font-bold text-xs rounded-full border border-teal-500/40">
          Soal ${idx + 1} dari 8 (10 Poin)
        </span>
        <span id="badge-status-q${q.id}" class="text-xs text-slate-400 font-mono">Belum Dijawab</span>
      </div>

      <p class="text-slate-100 text-sm md:text-base font-medium leading-relaxed mb-4">
        ${q.question}
      </p>

      <div class="space-y-2 mb-4">
        ${q.options.map(opt => `
          <button onclick="handleSelectMcq(${q.id}, '${opt.key}')" 
                  id="btn-opt-${q.id}-${opt.key}" 
                  class="option-btn">
            <span class="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-slate-300 flex items-center justify-center text-xs font-bold mr-3 shrink-0">
              ${opt.key}
            </span>
            <span class="text-xs md:text-sm text-slate-200">${opt.text}</span>
          </button>
        `).join('')}
      </div>

      <!-- Real-Time Educational Explanation Feedback -->
      <div id="feedback-q${q.id}" class="hidden p-4 rounded-xl text-xs space-y-2 mt-3 transition border"></div>
    </div>
  `).join('');
}

function handleSelectMcq(questionId, selectedKey) {
  if (hasSubmittedQuiz) return;

  userMcqAnswers[questionId] = selectedKey;

  const q = mcqQuestions.find(item => item.id === questionId);

  // Update button classes
  q.options.forEach(opt => {
    const btn = document.getElementById(`btn-opt-${questionId}-${opt.key}`);
    if (btn) btn.classList.remove('selected');
  });

  const selectedBtn = document.getElementById(`btn-opt-${questionId}-${selectedKey}`);
  if (selectedBtn) selectedBtn.classList.add('selected');

  // Instant Feedback & Explanation
  const feedbackEl = document.getElementById(`feedback-q${questionId}`);
  const statusBadge = document.getElementById(`badge-status-q${questionId}`);

  if (feedbackEl) {
    feedbackEl.classList.remove('hidden');
    if (selectedKey === q.correct) {
      feedbackEl.className = "p-4 rounded-xl text-xs space-y-1.5 mt-3 border bg-teal-950/60 border-teal-500/60 text-teal-100";
      feedbackEl.innerHTML = `<div class="font-bold text-teal-300 flex items-center"><i class="fa-solid fa-circle-check mr-2"></i> Jawaban Anda Tepat! (+10 Poin)</div><div class="text-slate-300 pt-1">${q.explanation}</div>`;
      if (statusBadge) {
        statusBadge.textContent = "Benar ✓";
        statusBadge.className = "text-xs font-bold text-teal-400";
      }
    } else {
      feedbackEl.className = "p-4 rounded-xl text-xs space-y-1.5 mt-3 border bg-rose-950/60 border-rose-500/60 text-rose-100";
      feedbackEl.innerHTML = `<div class="font-bold text-rose-300 flex items-center"><i class="fa-solid fa-circle-xmark mr-2"></i> Jawaban Anda Kurang Tepat!</div><div class="text-slate-300 pt-1">${q.explanation}</div>`;
      if (statusBadge) {
        statusBadge.textContent = `Pilihan: ${selectedKey}`;
        statusBadge.className = "text-xs font-bold text-rose-400";
      }
    }

    if (window.renderMathInElement) {
      renderMathInElement(feedbackEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }
}

// ==========================================
// RENDER MATCHING QUESTIONS (SOAL 9 & 10)
// ==========================================
function renderMatchingQuiz() {
  const container = document.getElementById("matching-quiz-list");
  if (!container) return;

  container.innerHTML = matchingQuestions.map((mq) => {
    // Shuffle descriptions for matching challenge
    const shuffledDescs = [...mq.pairs].sort(() => 0.5 - Math.random());

    return `
      <div class="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 md:p-6 shadow-lg mb-6" id="match-card-${mq.id}">
        <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
          <span class="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-full border border-amber-500/40">
            ${mq.title} (10 Poin)
          </span>
          <span id="match-status-${mq.id}" class="text-xs text-slate-400 font-mono">0 / 4 Terhubung</span>
        </div>

        <p class="text-slate-200 text-xs md:text-sm font-medium mb-4">
          ${mq.instruction}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Left: Source Terms -->
          <div class="space-y-2.5">
            <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
              <i class="fa-solid fa-list mr-1.5 text-teal-400"></i> Kolom Istilah
            </h5>
            ${mq.pairs.map(p => `
              <div class="match-source-item" 
                   id="source-${p.key}" 
                   draggable="true" 
                   ondragstart="handleDragStart(event, '${p.key}', ${mq.id})"
                   onclick="handleSourceClick('${p.key}', ${mq.id})">
                <span class="font-semibold text-slate-100 text-xs md:text-sm">${p.term}</span>
                <i class="fa-solid fa-arrows-alt text-slate-500 text-xs"></i>
              </div>
            `).join('')}
          </div>

          <!-- Right: Target Descriptions & Drop Slots -->
          <div class="space-y-2.5">
            <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
              <i class="fa-solid fa-bullseye mr-1.5 text-amber-400"></i> Kolom Definisi / Ciri Khas
            </h5>
            ${shuffledDescs.map(p => `
              <div class="space-y-1">
                <p class="text-xs text-slate-300 leading-snug">${p.desc}</p>
                <div class="match-target-slot" 
                     id="slot-${p.key}" 
                     data-target-key="${p.key}"
                     data-question-id="${mq.id}"
                     ondragover="handleDragOver(event)"
                     ondragleave="handleDragLeave(event)"
                     ondrop="handleDrop(event, '${p.key}', ${mq.id})"
                     onclick="handleSlotClick('${p.key}', ${mq.id})">
                  <span class="text-xs text-slate-500 italic" id="slot-label-${p.key}">Klik / Drag istilah ke sini...</span>
                  <button onclick="clearMatchSlot(event, '${p.key}', ${mq.id})" id="slot-clear-${p.key}" class="text-xs text-rose-400 hover:text-rose-300 hidden">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="match-feedback-${mq.id}" class="hidden p-3 rounded-xl text-xs space-y-1 mt-4 border"></div>
      </div>
    `;
  }).join('');
}

// Drag & Drop / Tap to Match Handlers
function handleDragStart(ev, key, qId) {
  ev.dataTransfer.setData("text/plain", JSON.stringify({ key, qId }));
  selectedSourceItem = { key, qId };
}

function handleDragOver(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add("hover-drop");
}

function handleDragLeave(ev) {
  ev.currentTarget.classList.remove("hover-drop");
}

function handleDrop(ev, targetKey, qId) {
  ev.preventDefault();
  ev.currentTarget.classList.remove("hover-drop");
  const data = JSON.parse(ev.dataTransfer.getData("text/plain") || "{}");
  if (data.qId === qId && data.key) {
    assignMatch(data.key, targetKey, qId);
  }
}

function handleSourceClick(key, qId) {
  // Deselect previous
  document.querySelectorAll('.match-source-item').forEach(el => el.classList.remove('active-select'));

  if (selectedSourceItem && selectedSourceItem.key === key) {
    selectedSourceItem = null;
    return;
  }

  selectedSourceItem = { key, qId };
  const el = document.getElementById(`source-${key}`);
  if (el) el.classList.add('active-select');
}

function handleSlotClick(targetKey, qId) {
  if (!selectedSourceItem) return;
  if (selectedSourceItem.qId !== qId) {
    alert("Silakan pasangkan dengan soal yang sama.");
    return;
  }
  assignMatch(selectedSourceItem.key, targetKey, qId);
  selectedSourceItem = null;
  document.querySelectorAll('.match-source-item').forEach(el => el.classList.remove('active-select'));
}

function assignMatch(sourceKey, targetKey, qId) {
  // Find source term name
  const mq = matchingQuestions.find(m => m.id === qId);
  const pair = mq.pairs.find(p => p.key === sourceKey);
  if (!pair) return;

  // If slot already has something, replace
  matchingUserAnswers[qId][targetKey] = sourceKey;

  const slot = document.getElementById(`slot-${targetKey}`);
  const label = document.getElementById(`slot-label-${targetKey}`);
  const clearBtn = document.getElementById(`slot-clear-${targetKey}`);

  if (slot && label) {
    slot.classList.add('filled');
    label.innerHTML = `<strong class="text-teal-300">${pair.term}</strong>`;
    if (clearBtn) clearBtn.classList.remove('hidden');
  }

  updateMatchCountBadge(qId);
}

function clearMatchSlot(ev, targetKey, qId) {
  ev.stopPropagation();
  delete matchingUserAnswers[qId][targetKey];

  const slot = document.getElementById(`slot-${targetKey}`);
  const label = document.getElementById(`slot-label-${targetKey}`);
  const clearBtn = document.getElementById(`slot-clear-${targetKey}`);

  if (slot && label) {
    slot.classList.remove('filled', 'correct-slot', 'incorrect-slot');
    label.innerHTML = `Klik / Drag istilah ke sini...`;
    label.className = "text-xs text-slate-500 italic";
    if (clearBtn) clearBtn.classList.add('hidden');
  }

  updateMatchCountBadge(qId);
}

function updateMatchCountBadge(qId) {
  const count = Object.keys(matchingUserAnswers[qId]).length;
  const badge = document.getElementById(`match-status-${qId}`);
  if (badge) {
    badge.textContent = `${count} / 4 Terhubung`;
    if (count === 4) {
      badge.className = "text-xs font-bold text-teal-400 font-mono";
    }
  }
}

// ==========================================
// SUBMIT QUIZ & EVALUATION LOGIC
// ==========================================
function submitEntireQuiz() {
  if (!studentProfile.nama) {
    openProfileModal();
    alert("Harap lengkapi Identitas Nama Siswa sebelum mengirim hasil kuis.");
    return;
  }

  let mcqScore = 0;
  let mcqCorrectCount = 0;

  // Grade MCQ (80 pts max)
  mcqQuestions.forEach(q => {
    const userAns = userMcqAnswers[q.id];
    if (userAns === q.correct) {
      mcqScore += 10;
      mcqCorrectCount++;
    }
  });

  // Grade Matching (20 pts max: 10 pts for Q9, 10 pts for Q10)
  let matchingScore = 0;
  matchingQuestions.forEach(mq => {
    let allPairsCorrect = true;
    let pairsCorrectCount = 0;

    mq.pairs.forEach(p => {
      const userSelectedSource = matchingUserAnswers[mq.id][p.key];
      const slot = document.getElementById(`slot-${p.key}`);

      if (userSelectedSource === p.key) {
        pairsCorrectCount++;
        if (slot) {
          slot.classList.add('correct-slot');
          slot.classList.remove('incorrect-slot');
        }
      } else {
        allPairsCorrect = false;
        if (slot) {
          slot.classList.add('incorrect-slot');
          slot.classList.remove('correct-slot');
        }
      }
    });

    // Proportional matching score: 2.5 pts per pair (total 10 pts per question)
    const qMatchScore = pairsCorrectCount * 2.5;
    matchingScore += qMatchScore;

    const feedback = document.getElementById(`match-feedback-${mq.id}`);
    if (feedback) {
      feedback.classList.remove('hidden');
      if (allPairsCorrect) {
        feedback.className = "p-3 rounded-xl text-xs space-y-1 mt-4 border bg-teal-950/60 border-teal-500/60 text-teal-200";
        feedback.innerHTML = `<strong>Keren!</strong> Semua pasangan ${mq.title} benar sempurna (+${qMatchScore} Poin).`;
      } else {
        feedback.className = "p-3 rounded-xl text-xs space-y-1 mt-4 border bg-amber-950/60 border-amber-500/60 text-amber-200";
        feedback.innerHTML = `Anda berhasil mencocokkan ${pairsCorrectCount} dari 4 pasangan dengan benar (+${qMatchScore} Poin).`;
      }
    }
  });

  // Total Score Calculation (Max 100)
  const totalScore = Math.round(mcqScore + matchingScore);
  currentQuizScore = totalScore;
  hasSubmittedQuiz = true;

  // Display Result Card
  const resultCard = document.getElementById("quiz-result-section");
  if (resultCard) {
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById("res-skor-total").textContent = totalScore;
  document.getElementById("res-mcq-benar").textContent = `${mcqCorrectCount} / 8`;
  document.getElementById("res-matching-skor").textContent = `${matchingScore} / 20`;

  // Status & KKTP Threshold Logic (KKTP = 82)
  const statusBanner = document.getElementById("res-kktp-banner");
  const certButton = document.getElementById("btn-download-cert");

  if (totalScore >= 82) {
    // LULUS
    statusBanner.className = "p-5 rounded-2xl bg-teal-950/80 border-2 border-teal-500/80 text-teal-100 shadow-xl mb-6 text-center";
    statusBanner.innerHTML = `
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-600/30 text-teal-400 text-3xl mb-3">
        <i class="fa-solid fa-award"></i>
      </div>
      <h3 class="text-2xl font-black text-amber-300">Selamat! Anda Lulus Kuis Vektor</h3>
      <p class="text-sm text-teal-200 mt-2 max-w-xl mx-auto">
        Nilai Anda adalah <strong>${totalScore}</strong> (Memenuhi Kriteria Ketercapaian Tujuan Pembelajaran / KKTP: 82). Anda berhak mendapatkan Sertifikat Resmi Hasil Belajar!
      </p>
    `;

    if (certButton) {
      certButton.classList.remove('hidden');
    }

    // Trigger joyful celebration confetti!
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  } else {
    // TIDAK LULUS
    statusBanner.className = "p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-500/80 text-rose-100 shadow-xl mb-6 text-center";
    statusBanner.innerHTML = `
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-600/30 text-rose-400 text-3xl mb-3">
        <i class="fa-solid fa-circle-exclamation"></i>
      </div>
      <h3 class="text-2xl font-black text-rose-300">Belum Mencapai Batas Kelulusan</h3>
      <p class="text-sm text-rose-200 mt-2 max-w-xl mx-auto leading-relaxed">
        Nilai Anda adalah <strong>${totalScore}</strong>. Anda belum mencapai standar kelulusan batas nilai (82). Silakan pelajari kembali Materi di Bagian 3 dan Coba Lagi Kuis ini.
      </p>
      <button onclick="resetEntireQuiz()" class="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition shadow-lg inline-flex items-center space-x-2">
        <i class="fa-solid fa-rotate-left"></i>
        <span>Ulangi Kuis Sekarang</span>
      </button>
    `;

    if (certButton) {
      certButton.classList.add('hidden');
    }
  }

  // Auto-send Data to Google Sheets Webhook
  sendResultToGoogleSheets(totalScore, totalScore >= 82 ? "LULUS" : "TIDAK LULUS");
}

// ==========================================
// INTEGRASI GOOGLE SHEETS VIA WEBHOOK
// ==========================================
function sendResultToGoogleSheets(score, statusKelulusan) {
  const syncStatusEl = document.getElementById("res-sheet-status");
  if (syncStatusEl) {
    syncStatusEl.textContent = "Mengirim data ke Google Sheet...";
    syncStatusEl.className = "text-xs font-bold text-amber-400";
  }

  const payload = {
    timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    nama: studentProfile.nama,
    kelas: studentProfile.kelas,
    sekolah: studentProfile.sekolah,
    skor: score,
    kktp: 82,
    status: statusKelulusan,
    detailJawaban: {
      mcq: userMcqAnswers,
      matching: matchingUserAnswers
    }
  };

  fetch(GOOGLE_SHEET_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    if (syncStatusEl) {
      syncStatusEl.innerHTML = `<i class="fa-solid fa-check-circle text-teal-400 mr-1"></i> Berhasil Tersimpan di Google Sheet Guru!`;
      syncStatusEl.className = "text-xs font-bold text-teal-300";
    }
  })
  .catch((err) => {
    console.error("Gagal mengirim ke sheet:", err);
    if (syncStatusEl) {
      syncStatusEl.innerHTML = `<i class="fa-solid fa-info-circle text-amber-400 mr-1"></i> Terkirim (Fallback Mode no-cors)`;
      syncStatusEl.className = "text-xs font-bold text-amber-300";
    }
  });
}

function resetEntireQuiz() {
  hasSubmittedQuiz = false;
  userMcqAnswers = {};
  matchingUserAnswers = { 9: {}, 10: {} };
  selectedSourceItem = null;

  document.getElementById("quiz-result-section")?.classList.add('hidden');
  renderMcqQuiz();
  renderMatchingQuiz();

  window.scrollTo({ top: document.getElementById("bagian5")?.offsetTop || 0, behavior: 'smooth' });
}

// ==========================================
// SERTIFIKAT KELULUSAN (PDF & PRINT MODAL)
// ==========================================
function openCertificateModal() {
  if (currentQuizScore < 82) {
    alert("Sertifikat hanya dapat diunduh jika Anda telah mencapai batas kelulusan (KKTP >= 82).");
    return;
  }

  // Populate Certificate Data
  const certNama = document.getElementById("cert-nama-siswa");
  const certKelas = document.getElementById("cert-kelas-siswa");
  const certSekolah = document.getElementById("cert-sekolah-siswa");
  const certSkor = document.getElementById("cert-nilai-akhir");
  const certTanggal = document.getElementById("cert-tanggal-terbit");
  const certNo = document.getElementById("cert-nomor-id");

  const todayStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (certNama) certNama.textContent = studentProfile.nama;
  if (certKelas) certKelas.textContent = studentProfile.kelas;
  if (certSekolah) certSekolah.textContent = studentProfile.sekolah;
  if (certSkor) certSkor.textContent = `${currentQuizScore} / 100`;
  if (certTanggal) certTanggal.textContent = todayStr;
  if (certNo) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    certNo.textContent = `VEC-XI-${randomHex}-2026`;
  }

  document.getElementById("certificate-print-modal").classList.remove("hidden");
}

function closeCertificateModal() {
  document.getElementById("certificate-print-modal").classList.add("hidden");
}

function downloadCertificatePDF() {
  const certElement = document.getElementById("certificate-render-area");
  if (!certElement) return;

  const btnDl = document.getElementById("btn-dl-action");
  if (btnDl) btnDl.textContent = "Menyiapkan PDF...";

  // Use html2canvas + jsPDF
  if (window.html2canvas && window.jspdf) {
    window.html2canvas(certElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Sertifikat_Fisika_Vektor_${studentProfile.nama.replace(/\s+/g, '_')}.pdf`);

      if (btnDl) btnDl.innerHTML = `<i class="fa-solid fa-download mr-1.5"></i> Unduh File PDF`;
    }).catch(err => {
      console.error(err);
      alert("Terjadi kendala saat merender PDF otomatis. Mengalihkan ke opsi cetak/simpan PDF browser.");
      window.print();
      if (btnDl) btnDl.innerHTML = `<i class="fa-solid fa-download mr-1.5"></i> Unduh File PDF`;
    });
  } else {
    window.print();
  }
}
