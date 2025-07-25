# VBT Login Uygulaması

Bu proje, kullanıcı kaydı ve girişi için modern bir web arayüzü sunar. Frontend React ile geliştirilmiş olup, .NET Core Web API backend'i ile entegre çalışacak şekilde tasarlanmıştır.

## Özellikler

- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- Sosyal medya ile giriş (Facebook, Apple, Google)
- Responsive tasarım
- Modern UI/UX

## Teknolojiler

- React (Vite ile)
- Context API (Auth durumu için)
- Tailwind CSS
- Axios (API istekleri için)
- JWT (JSON Web Tokens)

## Kurulum

### Ön Koşullar

- Node.js (v14 veya üzeri)
- npm veya yarn

### Frontend Kurulumu

1. Projeyi klonlayın:
   ```bash
   git clone <repo-url>
   cd vbt
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. .env dosyasını düzenleyin:
   ```
   VITE_API_URL=http://localhost:5000/auth
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

### Backend Entegrasyonu

Backend API'si aşağıdaki endpoint'leri sağlamalıdır:

- `POST /auth/register`: Yeni kullanıcı kaydı
- `POST /auth/login`: Kullanıcı girişi ve token üretimi
- `POST /auth/logout`: (İsteğe bağlı) Oturumu sonlandırma

Backend, başarılı giriş sonrası JWT (JSON Web Token) döndürmelidir.

## API İstekleri

### Kayıt İsteği

```json
POST /auth/register
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

### Giriş İsteği

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Beklenen Yanıt

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "username": "username"
  }
}
```

## Geliştirme

- `src/services/api.js`: API istekleri için Axios yapılandırması
- `src/context/AuthContext.jsx`: Kimlik doğrulama durumu yönetimi
- `src/components/LoginForm/LoginForm.jsx`: Giriş formu bileşeni
- `src/page/SignUpPage.tsx`: Kayıt sayfası bileşeni

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.