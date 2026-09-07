## Daftar Isi

1. [Setup git di project](#Setup-git-di-project)
2. [Unstaged vs Staged vs Commited](#Unstaged-vs-Staged-vs-Commited)
3. [Ignored Flag](#Ignored-Flag)
4. [Commit](#Commit)
5. [Branching & Merging](#Branching-&-Merging)
6. [#Push ke GitHub](#Push-ke-GitHub)
7. [Glosarium Command](#Glosarium-Command)

---

## Setup git di project

Untuk menggunakan git, pastikan directory / folder projectnya telah terinisialisasi git, jikalau belum ada bisa menggunakan command berikut. SILAHKAN MENGGUNAKAN GIT BASH / UNIX TERMINAL UNTUK MEMPERMUDAH DALAM MENGGUNAKAN COMMAND2 NYA

```bash
git init # initialisasi git ke current path
git status # cek inisialisasi berhasil dengan command berikut
```

---

## Unstaged vs Staged vs Commited

File & Directory yang ada di dalam directory yang terinisialisasi git pada dasarnya memiliki 3 tipe, unstaged, staged, dan commited. Gampangnya alurnya adalah berikut:

![[git-unstaged-staged-commit-diagram.png]]

Bisa dilihat antara unstaged dan staged itu bi-directional, dimana misal suatu file, kita bisa dengan mudah merubah status nya dari unstaged ke staged dan sebaliknya. Berbeda dengan commit yang harus berasal dari status staged. **Hanya file dan directory yang telah di staged yang bisa di commit.** Berikut beberapa git command yang related terkait tiga hal ini:

```bash
# menambahkan ke git (unstaged ke staged)
git add file.txt # contoh untuk file
git add directory/ # contoh untuk directory
git add file.txt file2.txt directory/ # contoh untuk multiple type
git add . # staged semua yang ada di path sekarang

# dari staged ke unstaged
git rm --cached file.txt # contoh untuk file
git rm --cached -r directory/ # contoh untuk directory
git rm --cached -r . # unstaged semua file dan directory di current path
```

---

## Ignored Flag

Kenapa kita tidak membuat semua file dan directory yang ada di project kita staged (add ke git) dan kita commit semua? Jawabannya ada di keamanan dan efisiensi. Best practice dan wajib, file seperti `.env` haram untuk di commit karena ia berisi data sensitif (API key, password database, secret token) yang bisa berbahaya kalau orang lain mengetahuinya. Selain itu folder seperti `node_modules/` juga tidak perlu kita commit karena ukurannya besar dan bisa selalu di-generate ulang secara otomatis di awal project (`npm install`).

Kasus-kasus seperti `.env` dan `node_modules/` ini sudah terselesaikan dengan adanya fitur **ignored**.

Ignored adalah flag yang bisa kita tambahkan ke tiap file maupun directory yang ada di project kita. Ini merupakan fitur bawaan git yang mempermudah kita agar tidak secara tidak sengaja meng-`git add` hal-hal yang seharusnya tidak kita tambahkan. Kita cukup membuat sebuah file bernama `.gitignore` di root project, sejajar dengan folder `.git` berada (`.git` adalah hidden directory, harus di-_show_ dahulu agar terlihat).

Dengan kita men-setup `.gitignore` ini, kita membuat file dan directory yang kita lampirkan tidak akan ter-staged, sehingga tidak akan tercommit pula. Pada framework-framework modern (React, Laravel, dll), `.gitignore` secara default telah tersetup otomatis saat inisialisasi project.

### Pattern yang bisa digunakan di `.gitignore`

|Pattern|Arti|
|---|---|
|`nama_file.txt`|ignore file spesifik dengan nama tersebut|
|`folder/`|ignore seluruh isi folder tersebut|
|`*.log`|ignore semua file berekstensi `.log` (wildcard)|
|`.*.sql`|ignore semua file yang polanya cocok, contoh `backup.sql`|
|`**/temp/`|ignore folder `temp/` di manapun letaknya (nested)|
|`!penting.log`|pengecualian (negation), file ini TETAP di-track walau pattern di atasnya meng-ignore|

Contoh `.gitignore` yang umum dipakai:

```gitignore
.env
.env*
.*.sql
node_modules/
dist/
.DS_Store
```

Jika sebuah file sudah kadung ter-commit sebelum ditambahkan ke `.gitignore`, menambahkannya ke `.gitignore` saja tidak cukup — file tersebut harus di-_untrack_ dulu:

```bash
git rm --cached file.txt # untrack file yang sudah terlanjur ter-commit
```

---

## Commit

Commit adalah proses menyimpan snapshot dari perubahan yang ada di staged area ke dalam riwayat (history) project. Setiap commit wajib disertai pesan (commit message) yang menjelaskan perubahan apa yang dilakukan.

```bash
git commit -m "pesan commit" # commit file yang sudah di staged
git commit -am "pesan commit" # shortcut: staged semua file yang sudah pernah di-track, lalu langsung commit (tidak berlaku untuk file baru)
git commit --amend -m "pesan baru" # revisi pesan/isi commit terakhir (sebelum di push)
```

### Best practice commit message

Commit message yang baik membantu tim (dan diri sendiri di masa depan) memahami histori perubahan tanpa perlu membaca ulang kode. Format yang umum digunakan adalah **Conventional Commits**, dengan struktur lengkap sebagai berikut:

```
<type>(<scope>): <deskripsi singkat>

<body>
```

Hanya baris pertama (header) yang wajib. Body dan footer bersifat opsional, dipakai kalau perubahannya cukup kompleks untuk dijelaskan lebih detail.

#### 1. Header — `<type>(<scope>): <deskripsi singkat>`

|Type|Kapan digunakan|
|---|---|
|`feat`|menambahkan fitur baru|
|`fix`|memperbaiki bug|
|`docs`|perubahan dokumentasi saja|
|`style`|perubahan format (spasi, indentasi), tidak mengubah logic|
|`refactor`|restrukturisasi kode tanpa mengubah behavior|
|`perf`|perubahan yang meningkatkan performa|
|`test`|menambah/memperbaiki test|
|`chore`|perubahan tooling, config, dependency, dll|
|`ci`|perubahan konfigurasi CI/CD|
|`revert`|membatalkan (revert) commit sebelumnya|

`scope` bersifat opsional, menunjukkan bagian project mana yang terdampak, contoh `feat(auth): ...` atau `fix(navbar): ...`. Jika perubahan tidak spesifik ke satu bagian, scope boleh dihilangkan.

Aturan header:

- Gunakan kalimat perintah/imperative ("tambah fitur", bukan "menambahkan fitur" atau "sudah menambah fitur").
- Huruf kecil semua di deskripsi singkat, tanpa titik di akhir.
- Idealnya di bawah 50-72 karakter agar tetap terbaca utuh di `git log --oneline`.

#### 2. Body — penjelasan detail (opsional)

Dipisahkan dari header dengan satu baris kosong. Body menjelaskan **apa** yang berubah dan **kenapa** perubahan itu dilakukan (bukan sekadar mengulang kode dalam bentuk kalimat). Berguna untuk perubahan yang tidak self-explanatory hanya dari headernya saja.

```
fix(auth): perbaiki token expired lebih cepat dari seharusnya

Sebelumnya expiry time dihitung dalam detik tapi dibandingkan
dengan value dalam milidetik, menyebabkan token expired 1000x
lebih cepat dari yang seharusnya. Sekarang keduanya dikonversi
ke satuan yang sama sebelum dibandingkan.
```

#### Contoh commit sederhana (tanpa body)

```bash
git commit -m "feat: tambah fitur login dengan google"
git commit -m "fix(form): perbaiki validasi form register"
git commit -m "docs: update readme instalasi"
```

#### Contoh commit dengan body (multi-line)

```bash
git commit -m "fix(auth): perbaiki token expired lebih cepat dari seharusnya" -m "Sebelumnya expiry time dihitung dalam detik tapi dibandingkan dengan value dalam milidetik. Sekarang keduanya dikonversi ke satuan yang sama."
```

Aturan tambahan:

- Satu commit sebaiknya mewakili satu perubahan logis (atomic commit) — jangan menggabungkan banyak fitur berbeda dalam satu commit.
- Jangan campur `type` yang berbeda dalam satu commit (misal `feat` dan `fix` sekaligus) — pisah jadi commit terpisah.
- Konsisten dalam satu project/tim, baik bahasa (Indonesia/Inggris) maupun format yang dipakai.

---

## Branching & Merging

Salah satu momok dari git adalah merge conflict. Hal ini dapat kita minimalisir (bahkan kita hindari) jika kita menerapkan branching dalam project kita. Logikanya sederhana, branch `main` kita biarkan sebagai versi stabil dari project kita sekarang dan development kita kerjakan di branch lain.

Misal kita akan mengerjakan 3 fitur (A, B, dan C). Tiap fiturnya kita buat branch baru. Setelah development-nya selesai, baru kita merge satu-satu ke branch main. Flow ini memudahkan kita untuk men-solve merge conflict dan memungkinkan untuk secara paralel (dalam tim) mengerjakan project-nya.

![[git-branching-strategi-diagram.png]]

Perhatikan Fitur B yang merupakan branch dari Fitur A. Ini bisa dan boleh selama kalian paham apa yang kalian lakukan (misal Fitur B memang butuh kode dari Fitur A yang belum di-merge ke main).

### Naming convention untuk branch

|Prefix|Kegunaan|Contoh|
|---|---|---|
|`feature/`|mengerjakan fitur baru|`feature/login-page`|
|`fix/`|memperbaiki bug non-urgent|`fix/navbar-overflow`|
|`hotfix/`|memperbaiki bug urgent di production|`hotfix/payment-error`|
|`release/`|mempersiapkan rilis versi tertentu|`release/v1.2.0`|
|`chore/`|pekerjaan non-fitur (config, dependency)|`chore/update-dependencies`|

### Command untuk branching

```bash
git branch # lihat daftar branch yang ada, tanda * menunjukkan branch aktif
git branch nama-branch # membuat branch baru tanpa berpindah ke branch tersebut
git checkout -b feature/login-page # membuat branch baru sekaligus berpindah ke branch tersebut
git switch -c feature/login-page # alternatif modern dari command di atas
git checkout nama-branch # berpindah ke branch yang sudah ada
git switch nama-branch # alternatif modern dari command di atas
git branch -d nama-branch # hapus branch yang sudah selesai di-merge
git branch -D nama-branch # paksa hapus branch walau belum di-merge
```

### Command untuk merging

Setelah development di suatu branch selesai, kita merge branch tersebut ke branch tujuan (biasanya `main`). Pastikan kita berada di branch tujuan sebelum menjalankan `git merge`.

```bash
git checkout main # pindah dulu ke branch tujuan
git merge feature/login-page # merge branch feature/login-page ke branch main
```

### Menangani merge conflict

![[git-merge-conflict-ilustrasi.png]]

Conflict terjadi ketika git tidak bisa otomatis menggabungkan perubahan, biasanya karena baris kode yang sama diubah secara berbeda di kedua branch. Git akan menandai bagian yang konflik di dalam file dengan format berikut:

```
<<<<<<< HEAD
kode di branch main
=======
kode di branch feature/login-page
>>>>>>> feature/login-page
```

Langkah menyelesaikannya:

1. Buka file yang konflik, tentukan kode mana yang dipertahankan (bisa salah satu, bisa gabungan keduanya).
2. Hapus tanda `<<<<<<<`, `=======`, dan `>>>>>>>` setelah selesai memilih.
3. Staged dan commit hasil resolusinya.

```bash
git add file-yang-konflik.txt # tandai konflik sudah diselesaikan
git commit -m "fix: resolve merge conflict di file-yang-konflik.txt" # selesaikan proses merge
```

---

## Push ke GitHub

Setelah repository lokal siap, kita perlu menghubungkannya ke repository remote (GitHub) agar bisa diakses/dibagikan secara online.

```bash
git remote add origin https://github.com/username/nama-repo.git # menghubungkan repo lokal ke repo remote di GitHub
git remote -v # cek remote yang sudah terhubung
git push -u origin main # push branch main ke remote untuk pertama kali (-u menyimpan koneksi default)
git push # push perubahan setelahnya, cukup command ini karena sudah tersambung dengan -u sebelumnya
git push origin feature/login-page # push branch selain main
```

Untuk mengambil perubahan dari GitHub ke repo lokal:

```bash
git clone https://github.com/username/nama-repo.git # menyalin repo dari GitHub ke lokal (dipakai sekali di awal)
git pull # mengambil sekaligus menggabungkan perubahan terbaru dari remote ke branch lokal aktif
git fetch # hanya mengambil data terbaru dari remote tanpa menggabungkannya (aman untuk dicek dulu)
```

> Jika repo di GitHub sudah punya isi (misal README) sementara repo lokal juga sudah punya history sendiri, `git push` bisa ditolak. Jalankan `git pull origin main --allow-unrelated-histories` untuk menggabungkan kedua history tersebut sebelum push.

---

## Glosarium Command

| Command                                     | Fungsi                                                   |
| ------------------------------------------- | -------------------------------------------------------- |
| `git init`                                  | inisialisasi git di directory saat ini                   |
| `git status`                                | cek status file (unstaged/staged) dan info branch        |
| `git add <file/directory>`                  | pindahkan file/directory dari unstaged ke staged         |
| `git add .`                                 | staged semua perubahan di path saat ini                  |
| `git rm --cached <file>`                    | pindahkan file dari staged kembali ke unstaged (untrack) |
| `git commit -m "pesan"`                     | commit file yang sudah staged dengan pesan tertentu      |
| `git commit -am "pesan"`                    | staged file yang sudah pernah di-track lalu commit       |
| `git commit --amend`                        | revisi commit terakhir                                   |
| `git branch`                                | lihat daftar branch                                      |
| `git branch <nama>`                         | buat branch baru                                         |
| `git checkout -b <nama>`                    | buat branch baru sekaligus pindah ke sana                |
| `git switch -c <nama>`                      | alternatif modern dari `checkout -b`                     |
| `git checkout <nama>` / `git switch <nama>` | pindah ke branch yang sudah ada                          |
| `git branch -d <nama>`                      | hapus branch yang sudah di-merge                         |
| `git branch -D <nama>`                      | paksa hapus branch                                       |
| `git merge <nama>`                          | gabungkan branch tertentu ke branch aktif                |
| `git remote add origin <url>`               | hubungkan repo lokal ke repo remote                      |
| `git remote -v`                             | cek daftar remote yang terhubung                         |
| `git push -u origin main`                   | push pertama kali ke remote sekaligus set default        |
| `git push`                                  | push perubahan ke remote                                 |
| `git clone <url>`                           | salin repo dari remote ke lokal                          |
| `git pull`                                  | ambil dan gabungkan perubahan dari remote                |
| `git fetch`                                 | ambil data terbaru dari remote tanpa digabung            |
