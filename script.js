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

  const dataFakultas = [
    { id: "fti", nama: "Fakultas Teknologi Informasi" },
    { id: "feb", nama: "Fakultas Ekonomi dan Bisnis" },
    { id: "fh", nama: "Fakultas Hukum" },
  ];

  const dataProdi = {
    fti: [
      { id: "ti", nama: "Teknik Informatika" },
      { id: "si", nama: "Sistem Informasi" },
      { id: "ti2", nama: "Teknologi Informasi" },
    ],
    feb: [
      { id: "ak", nama: "Akuntansi" },
      { id: "mba", nama: "Manajemen Bisnis" },
      { id: "ep", nama: "Ekonomi Pembangunan" },
    ],
    fh: [
      { id: "ih", nama: "Ilmu Hukum" },
      { id: "hn", nama: "Hukum Notariat" },
      { id: "hi", nama: "Hukum Internasional" },
    ],
  };

  // Isi dropdown fakultas
  dataFakultas.forEach(function (fakultas) {
    const option = document.createElement("option");
    option.value = fakultas.id;
    option.textContent = fakultas.nama;
    fakultasSelect.appendChild(option);
  });

  // SRS-003: populate prodi when fakultas changes
  function populateProdi(fakultasId) {
    // Clear existing options
    prodiSelect.innerHTML = "";

    // Add default placeholder
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "-- Pilih Program Studi --";
    prodiSelect.appendChild(placeholder);

    if (!fakultasId || !dataProdi[fakultasId]) {
      prodiSelect.disabled = true;
      return;
    }

    // Add prodi options from mapping
    dataProdi[fakultasId].forEach(function (prodi) {
      const option = document.createElement("option");
      option.value = prodi.id;
      option.textContent = prodi.nama;
      prodiSelect.appendChild(option);
    });

    prodiSelect.disabled = false;
  }

  fakultasSelect.addEventListener("change", function () {
    populateProdi(this.value);
  });

  // SRS-004: validasi real-time nama & NIM
  // Catatan: validasi ini hanya client-side (UX), bukan pengganti validasi server
  var namaInput = document.getElementById("nama");
  var nimInput = document.getElementById("nim");
  var namaError = document.getElementById("nama-error");
  var nimError = document.getElementById("nim-error");

  function validateNama(value) {
    if (!value || value.trim() === "") {
      return "Nama wajib diisi";
    }
    if (value.trim().length < 2) {
      return "Nama minimal 2 karakter";
    }
    return "";
  }

  function validateNim(value) {
    if (!value || value.trim() === "") {
      return "NIM wajib diisi";
    }
    if (!/^\d+$/.test(value.trim())) {
      return "NIM harus berupa angka";
    }
    if (value.trim().length < 8) {
      return "NIM minimal 8 digit";
    }
    return "";
  }

  function showError(inputEl, errorEl, message) {
    if (message) {
      errorEl.textContent = message;
      inputEl.classList.add("error");
    } else {
      errorEl.textContent = "";
      inputEl.classList.remove("error");
    }
  }

  namaInput.addEventListener("input", function () {
    showError(namaInput, namaError, validateNama(namaInput.value));
  });

  nimInput.addEventListener("input", function () {
    showError(nimInput, nimError, validateNim(nimInput.value));
  });
});
