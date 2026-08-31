/**
 * Sistem Pendaftaran Praktikum
 * JavaScript utama
 */

// ============================================================
// SRS-002: Jam berjalan & info browser
// ============================================================

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

// ============================================================
// Inisialisasi & deklarasi elemen shared
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // SRS-002: jam berjalan & info browser
  updateJam();
  setInterval(updateJam, 1000);
  detectBrowser();

  const form = document.getElementById("form-daftar");
  const fakultasSelect = document.getElementById("fakultas");
  const prodiSelect = document.getElementById("prodi");

  // SRS-007: flag untuk beforeunload warning
  var formSubmitted = false;

  // ============================================================
  // SRS-003: Dropdown fakultas → program studi
  // ============================================================

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

  // Populate prodi saat fakultas berubah
  function populateProdi(fakultasId) {
    prodiSelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "-- Pilih Program Studi --";
    prodiSelect.appendChild(placeholder);

    if (!fakultasId || !dataProdi[fakultasId]) {
      prodiSelect.disabled = true;
      return;
    }

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

  // ============================================================
  // SRS-004: Validasi real-time nama & NIM
  // Catatan: validasi ini hanya client-side (UX), bukan
  // pengganti validasi server.
  // ============================================================

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

  // ============================================================
  // SRS-005: Tambah & hapus mata kuliah praktikum
  // ============================================================

  var mkSelect = document.getElementById("mk");
  var btnTambahMk = document.getElementById("btn-tambah-mk");
  var daftarMk = document.getElementById("daftar-mk");
  var jumlahMk = document.getElementById("jumlah-mk");
  var selectedMk = [];

  var dataMk = [
    { id: "prak-pemweb", nama: "Praktikum Pemrograman Web" },
    { id: "prak-basisdata", nama: "Praktikum Basis Data" },
    { id: "prak-jarkom", nama: "Praktikum Jaringan Komputer" },
    { id: "prak-rpl", nama: "Praktikum Rekayasa Perangkat Lunak" },
  ];

  // Populate MK dropdown
  dataMk.forEach(function (mk) {
    var option = document.createElement("option");
    option.value = mk.id;
    option.textContent = mk.nama;
    mkSelect.appendChild(option);
  });

  function updateJumlahMk() {
    jumlahMk.textContent = selectedMk.length;
  }

  function tambahMk() {
    var mkId = mkSelect.value;
    if (!mkId) return;

    var sudahAda = selectedMk.some(function (item) {
      return item.id === mkId;
    });
    if (sudahAda) {
      alert("Mata kuliah sudah dipilih!");
      return;
    }

    var mkData = dataMk.find(function (item) {
      return item.id === mkId;
    });
    if (!mkData) return;

    selectedMk.push(mkData);
    renderDaftarMk();
    mkSelect.value = "";
  }

  function hapusMk(mkId) {
    selectedMk = selectedMk.filter(function (item) {
      return item.id !== mkId;
    });
    renderDaftarMk();
  }

  function renderDaftarMk() {
    daftarMk.innerHTML = "";
    selectedMk.forEach(function (mk) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.textContent = mk.nama;
      var btnHapus = document.createElement("button");
      btnHapus.type = "button";
      btnHapus.textContent = "Hapus";
      btnHapus.addEventListener("click", function () {
        hapusMk(mk.id);
      });
      li.appendChild(span);
      li.appendChild(btnHapus);
      daftarMk.appendChild(li);
    });
    updateJumlahMk();
  }

  btnTambahMk.addEventListener("click", tambahMk);

  // ============================================================
  // SRS-006: Submit form & ringkasan pendaftaran
  // ============================================================

  var ringkasanDiv = document.getElementById("ringkasan");
  var btnDaftarUlang = document.getElementById("btn-daftar-ulang");
  var fakultasError = document.getElementById("fakultas-error");
  var prodiError = document.getElementById("prodi-error");
  var mkError = document.getElementById("mk-error");

  function getSelectText(selectEl) {
    if (selectEl.selectedIndex < 0) return "";
    return selectEl.options[selectEl.selectedIndex].text;
  }

  function clearAllErrors() {
    showError(namaInput, namaError, "");
    showError(nimInput, nimError, "");
    fakultasError.textContent = "";
    prodiError.textContent = "";
    mkError.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors();

    var hasError = false;

    var namaMsg = validateNama(namaInput.value);
    if (namaMsg) {
      showError(namaInput, namaError, namaMsg);
      hasError = true;
    }

    var nimMsg = validateNim(nimInput.value);
    if (nimMsg) {
      showError(nimInput, nimError, nimMsg);
      hasError = true;
    }

    if (!fakultasSelect.value) {
      fakultasError.textContent = "Fakultas wajib dipilih";
      hasError = true;
    }

    if (!prodiSelect.value) {
      prodiError.textContent = "Program Studi wajib dipilih";
      hasError = true;
    }

    if (selectedMk.length === 0) {
      mkError.textContent = "Pilih minimal 1 mata kuliah";
      hasError = true;
    }

    if (hasError) return;

    // Isi ringkasan
    document.getElementById("ring-nama").textContent = namaInput.value.trim();
    document.getElementById("ring-nim").textContent = nimInput.value.trim();
    document.getElementById("ring-fakultas").textContent = getSelectText(fakultasSelect);
    document.getElementById("ring-prodi").textContent = getSelectText(prodiSelect);

    var ringMk = document.getElementById("ring-mk");
    ringMk.innerHTML = "";
    selectedMk.forEach(function (mk) {
      var li = document.createElement("li");
      li.textContent = mk.nama;
      ringMk.appendChild(li);
    });

    // Sembunyikan form, tampilkan ringkasan
    form.style.display = "none";
    ringkasanDiv.style.display = "block";

    // Tandai form sudah dikirim
    formSubmitted = true;
  });

  btnDaftarUlang.addEventListener("click", function () {
    ringkasanDiv.style.display = "none";
    form.style.display = "block";
    form.reset();

    formSubmitted = false;
    prodiSelect.disabled = true;
    prodiSelect.innerHTML = '<option value="">-- Pilih Program Studi --</option>';
    selectedMk = [];
    renderDaftarMk();
    namaError.textContent = "";
    nimError.textContent = "";
    fakultasError.textContent = "";
    prodiError.textContent = "";
    mkError.textContent = "";
    namaInput.classList.remove("error");
    nimInput.classList.remove("error");
  });

  // ============================================================
  // SRS-007: Peringatan sebelum tutup tab jika form belum dikirim
  // ============================================================

  window.addEventListener("beforeunload", function (e) {
    if (!formSubmitted) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
});
