# GitHub ga Push qilish yo'riqnomasi

## 1. Git o'rnatilganligini tekshiring

Agar git o'rnatilmagan bo'lsa, quyidagi havoladan yuklab oling:
https://git-scm.com/download/win

## 2. Git Bash yoki PowerShell da quyidagi buyruqlarni bajaring:

### Loyihani Git repository ga aylantirish
```bash
git init
```

### Barcha fayllarni staging ga qo'shish
```bash
git add .
```

### Birinchi commit
```bash
git commit -m "first commit"
```

### Main branch yaratish
```bash
git branch -M main
```

### Remote repository qo'shish
```bash
git remote add origin https://github.com/alisherelmurodov201-crypto/AirMack.git
```

### GitHub ga push qilish
```bash
git push -u origin main
```

## Muhim eslatmalar:

1. ✅ `.env` fayli `.gitignore` da - xavfsiz
2. ✅ `node_modules` `.gitignore` da - xavfsiz
3. ✅ `dist` papka `.gitignore` da - xavfsiz
4. ✅ README.md yaratildi

## Agar xato yuz bersa:

### Agar remote allaqachon mavjud bo'lsa:
```bash
git remote remove origin
git remote add origin https://github.com/alisherelmurodov201-crypto/AirMack.git
```

### Agar push rad etilsa (repository bo'sh emas):
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## GitHub repository sozlamalari:

Repository URL: https://github.com/alisherelmurodov201-crypto/AirMack.git

Repository yaratilganligiga ishonch hosil qiling:
1. GitHub ga kiring
2. Repositories bo'limiga o'ting
3. "AirMack" nomli repository mavjudligini tekshiring
