# Starter Template

Starter Template untuk pengembangan sistem berbasis **Node.js**, **TypeScript**, dan **Prisma ORM**.

---

## 🚀 Teknologi yang Digunakan

- **Node.js**: Runtime environment untuk menjalankan JavaScript di server.
- **Express.js**: Web framework minimalis untuk Node.js.
- **TypeScript**: Bahasa pemrograman berbasis JavaScript dengan dukungan tipe statis.
- **Prisma ORM**: Alat untuk interaksi database secara efisien.
- **Redis**: (Opsional) Untuk caching dan manajemen session.
- **AWS SDK**: (Opsional) Untuk upload file ke S3.

---

## ⚙️ Prasyarat (Prerequisites)

Pastikan Anda telah menginstal:

- **Node.js**: Versi 16.x atau lebih baru.
- **npm**: Versi terbaru.
- **Database**: PostgreSQL (disarankan) atau MySQL.
- **Redis**: (Opsional) untuk session/caching.
- **AWS Account**: (Opsional) jika menggunakan upload file.

---

## 📦 Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/NewusTech/nama_repo.git
cd nama_repo
```

### 2. Instal Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

- Buat file `.env` di root project.
- Salin dari `.env.example`:

```dotenv
# Server
PORT=3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nama_db

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Redis (Opsional)
REDIS_URL=redis://localhost:6379

# AWS S3 (Opsional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Environment
NODE_ENV=development
```

### 4. Migrasi Database

```bash
npx prisma migrate dev
```

### 5. Seeder Database (Opsional)

```bash
npm run db:seed
```

### 6. Build Project

```bash
npm run build
```

### 7. Menjalankan Server

Untuk mode development:

```bash
npm run dev
```

Untuk mode production:

```bash
npm start
```

Server akan berjalan di:

```
http://localhost:3000
```

---

## 👢 Struktur Folder

```plaintext
nama_repo/
├── app.ts
├── db.log
├── error.log
├── info.log
├── package.json
├── package-lock.json
├── tsconfig.json
├── readme.md
├── CHANGELOG.md
├── .env.example
├── prisma/
│   ├── migrations/
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public/
│   └── uploads/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   └── utils/
```

---

## 📜 Script NPM

| Script | Fungsi |
|:---|:---|
| `npm run dev` | Menjalankan server di mode development. |
| `npm run build` | Compile TypeScript ke JavaScript. |
| `npm start` | Menjalankan server di mode production. |
| `npm run migrate` | Migrasi database menggunakan Prisma. |
| `npm run db:seed` | Menjalankan seeder database. |
| `npm run lint` | Cek format dan style kode. |
| `npm run lint:fix` | Perbaiki otomatis format kode. |
| `npm run release` | Membuat release baru (bump version + changelog). |
| `npm run commit` | Membuat commit message dengan Commitizen. |

---

## 📋 Cara Release Versi Baru

1. Pastikan semua fitur sudah selesai dan di-commit dengan format **Conventional Commits**.
2. Jalankan build dan linting:

```bash
npm run build
npm run lint
```

3. Bump versi dan generate changelog:

```bash
npm run release
```

4. Push perubahan dan tag ke remote:

```bash
git push --follow-tags
```

> Cek `CHANGELOG.md` dan publish tag baru di GitHub.

---

## 🧮 Contribution Guide

### Langkah Singkat:

1. Fork repository.
2. Buat branch baru:

```bash
git checkout -b feature/your-feature-name
```

3. Commit perubahan menggunakan:

```bash
npm run commit
```

4. Push branch:

```bash
git push origin feature/your-feature-name
```

5. Buat Pull Request ke `main`.

### Format Commit (Conventional Commits)

```plaintext
<type>(scope?): <description>
```

Contoh:

- `feat(auth): add JWT login`
- `fix(api): correct status code on error`
- `chore: update dependencies`

---

## 💍 Release Notes

Release Notes akan dibuat otomatis di `CHANGELOG.md` setiap kali menjalankan `npm run release`.

Format Versi:

- **Major** (`X.0.0`): Breaking changes.
- **Minor** (`1.X.0`): Fitur baru yang tidak breaking.
- **Patch** (`1.0.X`): Bugfix kecil.

---

# 📏 Badge (Opsional)

```markdown
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)
![License](https://img.shields.io/badge/license-ISC-blue)
```

