# Sistem Pendaftaran Praktikum

Sistem pendaftaran praktikum berbasis web yang memungkinkan mahasiswa mendaftar mata kuliah praktikum secara online. Sistem ini menyediakan form interaktif dengan validasi real-time, dropdown dependen fakultas-prodi, serta ringkasan pendaftaran.

## User Story

Sebagai mahasiswa, saya ingin mendaftar praktikum secara online melalui formulir web yang mudah digunakan, sehingga saya dapat memilih mata kuliah praktikum yang sesuai tanpa perlu mengisi formulir kertas.

## Menjalankan Proyek

Buka file `index.html` di browser modern (Chrome/Firefox/Edge). Tidak ada build tool atau dependencies yang diperlukan.

```
# Clone repository, lalu buka:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Struktur Folder

```
pertemuan1/
├── index.html      # Halaman utama
├── style.css       # Gaya tampilan
├── script.js       # Logika aplikasi
├── .gitignore      # File yang di-ignor oleh Git
└── README.md       # Dokumentasi proyek
```

## Daftar SRS

| Kode    | Deskripsi | Acceptance Criteria |
|---------|-----------|---------------------|
| SRS-001 | Struktur halaman & scaffold dasar (HTML/CSS kosong, header, footer). | - `index.html` memiliki elemen `<header>`, `<main>`, `<footer>` secara semantik<br>- Form pendaftaran ada di `<main>` dengan field placeholder<br>- `style.css` menerapkan layout flexbox<br>- Halaman bisa dibuka tanpa error console |
| SRS-002 | Menampilkan jam berjalan & info browser di header (BOM). | - Jam di header update setiap detik tanpa reload<br>- Format jam: `HH:MM:SS` (24 jam)<br>- Info browser ditampilkan di header<br>- Tidak ada error di console |
| SRS-003 | Dropdown Program Studi menyesuaikan otomatis saat Fakultas dipilih. | - Dropdown Fakultas berisi minimal 3 opsi<br>- Saat Fakultas dipilih, Prodi terisi otomatis sesuai mapping<br>- Opsi Prodi di-generate via `createElement` |
| SRS-004 | Validasi Nama & NIM secara real-time saat mahasiswa mengetik. | - Error muncul saat Nama kosong atau < 2 karakter<br>- Error muncul saat NIM kosong, bukan numerik, atau < 8 digit<br>- Error hilang real-time saat input diperbaiki<br>- Validasi hanya client-side (UX) |
| SRS-005 | Menambah dan menghapus mata kuliah praktikum dari daftar pilihan. | - Dropdown MK berisi minimal 3 mata kuliah<br>- Tombol "Tambah" memindahkan MK ke daftar pilihan<br>- Duplikat MK tidak bisa ditambahkan<br>- Setiap item punya tombol "Hapus" |
| SRS-006 | Submit form menampilkan ringkasan pendaftaran tanpa reload halaman. | - Tombol Submit ada di form<br>- Setelah submit, form disembunyikan dan ringkasan ditampilkan<br>- Ringkasan menampilkan: Nama, NIM, Fakultas, Prodi, daftar MK<br>- Halaman tidak reload |
| SRS-007 | Peringatan ke pengguna sebelum menutup tab jika form belum dikirim. | - Saat form belum dikirim, browser tampilkan dialog konfirmasi tutup tab<br>- Setelah submit berhasil, dialog tidak muncul lagi<br>- Flag `formSubmitted` digunakan sebagai penanda |
