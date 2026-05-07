# AirMack

Apple mahsulotlari uchun zamonaviy e-commerce platformasi.

## Xususiyatlar

- 🛍️ Mahsulotlar katalogi
- 👤 Foydalanuvchilar tizimi (ro'yxatdan o'tish va kirish)
- 🔐 Admin panel (mahsulotlarni boshqarish)
- 📱 Telegram bot integratsiyasi (buyurtmalar uchun)
- 🌙 Tungi/Tongi rejim
- 🇺🇿 O'zbek tili

## Texnologiyalar

- React 19
- TypeScript
- TanStack Router
- Tailwind CSS
- Vite
- Shadcn/ui

## O'rnatish

```bash
# Dependencies o'rnatish
npm install

# Development server ishga tushirish
npm run dev

# Production build
npm run build
```

## Telegram Bot Sozlash

1. `.env` faylini yarating
2. Telegram bot token va chat ID ni qo'shing:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
```

## Admin Panel

Default admin:
- Login: `admin`
- Parol: `admin123`

## Litsenziya

MIT
