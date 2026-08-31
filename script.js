/**
 * Sistem Pendaftaran Praktikum
 * JavaScript utama
 */

document.addEventListener("DOMContentLoaded", function () {
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
