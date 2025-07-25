


          
# VBT Login Uygulaması - Backend Entegrasyonu Dokümantasyonu

## Proje Genel Bakış

Bu proje, modern ve responsive bir kullanıcı kaydı ve giriş arayüzü sunan bir React uygulamasıdır. Frontend, .NET Core Web API backend'i ile entegre çalışacak şekilde düzenlenmiştir.

## Yapılan Değişiklikler

### 1. Bağımlılıklar

- **Axios**: API istekleri için HTTP istemcisi eklendi
  ```bash
  npm install axios
  ```

### 2. Servis Katmanı

#### API Servisi (`src/services/api.js`)

- Backend ile iletişim kurmak için Axios tabanlı bir servis oluşturuldu
- JWT token yönetimi için interceptor'lar eklendi
- Aşağıdaki fonksiyonlar eklendi:
  - `register`: Kullanıcı kaydı
  - `login`: Kullanıcı girişi
  - `logout`: Kullanıcı çıkışı
  - `getCurrentUser`: Mevcut kullanıcı bilgilerini alma
  - `isAuthenticated`: Token kontrolü

```javascript
// API temel URL'si - .env dosyasından alınır
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/auth';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### 3. Context API

#### Auth Context (`src/context/AuthContext.jsx`)

- Kullanıcı kimlik doğrulama durumunu yönetmek için Context API kullanıldı
- Aşağıdaki state'ler ve fonksiyonlar eklendi:
  - `currentUser`: Mevcut kullanıcı bilgileri
  - `loading`: Yükleme durumu
  - `error`: Hata durumu
  - `register`: Kayıt işlemi
  - `login`: Giriş işlemi
  - `socialLogin`: Sosyal medya ile giriş
  - `logout`: Çıkış işlemi
  - `isAuthenticated`: Kimlik doğrulama kontrolü

```jsx
// Auth Context hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 4. Bileşen Güncellemeleri

#### App.jsx

- AuthProvider ile sarmalandı
- Sayfa yönlendirme mantığı güncellendi

```jsx
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
```

#### LoginForm.jsx

- useAuth hook'u eklendi
- Simüle edilmiş giriş yerine gerçek API çağrıları yapacak şekilde güncellendi
- Hata yönetimi iyileştirildi

```jsx
const { login, socialLogin, error: authError, loading: authLoading } = useAuth();

// Giriş işlemi
try {
  // Gerçek API çağrısı
  await login({
    email: formData.email,
    password: formData.password
  });
  
  console.log('Login successful');
} catch (error) {
  setErrors({ 
    general: error.message || 'Giriş başarısız oldu. Lütfen tekrar deneyin.' 
  });
}
```

#### SignUpPage.tsx

- useAuth hook'u eklendi
- Kayıt işlemi için API entegrasyonu eklendi
- Form doğrulama ve hata gösterimi iyileştirildi
- Yükleme durumu gösterimi eklendi

```typescript
const { register } = useAuth();
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// API'ye kayıt isteği gönder
await register(userData);
```

#### SocialLogin.jsx

- useAuth hook'u eklendi
- Sosyal medya girişi için AuthContext entegrasyonu yapıldı

```jsx
const { socialLogin } = useAuth();

// AuthContext içindeki socialLogin fonksiyonunu çağır
await socialLogin(provider, socialUser);
```

#### Dashboard.jsx

- useAuth hook'u eklendi
- Kullanıcı bilgilerini AuthContext'ten alacak şekilde güncellendi

```jsx
const { currentUser, logout } = useAuth();

// Token bilgisi gösterimi
<p><strong>Token:</strong> {localStorage.getItem('token') ? 'Mevcut' : 'Yok'}</p>
```

### 5. Yapılandırma Dosyaları

#### .env

- API URL'si için ortam değişkenleri eklendi

```
VITE_API_URL=http://localhost:5000/auth
VITE_APP_NAME=VBT Login
```

#### README.md

- Proje kurulumu ve kullanımı için dokümantasyon oluşturuldu

## API Entegrasyonu

### Beklenen Backend Endpoint'leri

1. **Kayıt İşlemi**
   - Endpoint: `POST /auth/register`
   - İstek Gövdesi:
     ```json
     {
       "email": "user@example.com",
       "username": "username",
       "password": "password123"
     }
     ```

2. **Giriş İşlemi**
   - Endpoint: `POST /auth/login`
   - İstek Gövdesi:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Beklenen Yanıt:
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

3. **Çıkış İşlemi** (İsteğe bağlı)
   - Endpoint: `POST /auth/logout`

## Kullanım

1. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda http://localhost:5173/ adresine gidin

3. Kayıt olmak için "Register here!" bağlantısına tıklayın

4. Giriş yapmak için email ve şifrenizi girin

## Notlar

- Backend henüz hazır olmadığı için, uygulama şu anda simüle edilmiş API yanıtlarıyla çalışıyor
- Gerçek backend hazır olduğunda, `.env` dosyasındaki `VITE_API_URL` değişkenini güncelleyin
- JWT token'ları localStorage'da saklanıyor, daha güvenli bir yaklaşım için HttpOnly çerezler kullanılabilir

## İleriki Geliştirmeler

- Şifre sıfırlama özelliği
- Email doğrulama
- Profil sayfası
- Kullanıcı ayarları
- Daha gelişmiş hata yönetimi
- Birim testleri

Bu dokümantasyon, projenin mevcut durumunu ve backend entegrasyonu için yapılan değişiklikleri kapsamlı bir şekilde açıklamaktadır. Backend geliştirme ekibi, bu dokümantasyonu kullanarak frontend ile entegrasyonu kolayca sağlayabilir.
        