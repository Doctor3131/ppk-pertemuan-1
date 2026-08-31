/**
 * Sistem Pendaftaran Praktikum
 * JavaScript utama
 */

function updateJam() {
  const jamEl = document.getElementById("jam");
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  jamEl.textContent = hh + ":" + mm + ":" + ss;
}

function detectBrowser() {
  const browserEl = document.getElementById("browser-info");
  const ua = navigator.userAgent;
  let browser = "Browser Tidak Diketahui";

  if (ua.indexOf("Firefox") !== -1) {
    browser = "Firefox";
  } else if (ua.indexOf("Edg") !== -1) {
    browser = "Edge";
  } else if (ua.indexOf("Chrome") !== -1) {
    browser = "Chrome";
  } else if (ua.indexOf("Safari") !== -1) {
    browser = "Safari";
  }

  browserEl.textContent = browser;
}

document.addEventListener("DOMContentLoaded", function () {
  // SRS-002: jam berjalan & info browser
  updateJam();
  setInterval(updateJam, 1000);
  detectBrowser();

  const form = document.getElementById("form-daftar");
  const fakultasSelect = document.getElementById("fakultas");
  const prodiSelect = document.getElementById("prodi");

  // Placeholder: data akan diisi di SRS-003
  const dataFakultas = [
    { id: "fti", nama: "Fakultas Teknologi Informasi" },
    { id: "feb", nama: "Fakultas Ekonomi dan Bisnis" },
    { id: "fh", nama: "Fakultas Hukum" },
  ];

  // Isi dropdown fakultas
  dataFakultas.forEach(function (fakultas) {
    const option = document.createElement("option");
    option.value = fakultas.id;
    option.textContent = fakultas.nama;
    fakultasSelect.appendChild(option);
  });
});
