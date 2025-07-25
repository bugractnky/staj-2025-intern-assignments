# 📱 Mobil Uygulama (Flutter) – **Logify**

Bu dizin, Logify projesinin Flutter ile geliştirilmiş mobil uygulama kısmını içerir. Uygulama, kullanıcı kimlik doğrulama işlemlerini gerçekleştiren modern ve çok katmanlı bir yapıya sahiptir.

---

## 🚀 Başlangıç

### 🧰 Gereksinimler

- Flutter SDK (>=3.4.4 <4.0.0)
- Dart SDK
- Android Studio veya VSCode (Flutter eklentisiyle)
- Android/iOS fiziksel cihaz veya simülatör

### ⚙️ Kurulum Adımları

1. Gerekli bağımlılıkları yükleyin:

   ```bash
   flutter pub get
   ```

2. Uygulamayı çalıştırın:

   ```bash
   flutter run
   ```

---

## 🗂️ Proje Yapısı

```text
lib/
├── main.dart            # Uygulama giriş noktası, tema ayarları
├── screens/             # Login, register, home gibi sayfalar
├── providers/           # State management (ör. AuthProvider)
├── services/            # API istekleri ve iş mantığı (ör. AuthService)
├── models/              # Veri modelleri (ör. User, AuthResponse)
├── widgets/             # Özel widget'lar (ör. CustomButton, CustomTextField)
assets/
└── logo.png             # Uygulama görselleri
```

---

## 🔑 Temel Özellikler

- ✅ Kullanıcı girişi ve kayıt işlemleri
- 🔄 Provider ile state management
- 🔐 Shared Preferences ile oturum yönetimi
- 🌙 Koyu tema tasarımı
- 📡 HTTP üzerinden backend API ile haberleşme

---

## 📦 Kullanılan Paketler

| Paket | Açıklama |
|-------|----------|
| [provider](https://pub.dev/packages/provider) | Durum yönetimi |
| [shared_preferences](https://pub.dev/packages/shared_preferences) | Oturum/local storage yönetimi |
| [http](https://pub.dev/packages/http) | API haberleşmesi |
| [cupertino_icons](https://pub.dev/packages/cupertino_icons) | iOS tarzı ikonlar |

---

## 🧪 Testler

Birimi testleri ve widget testlerini çalıştırmak için:

```bash
flutter test
```

Örnek test dosyaları:
- `test/auth_provider_test.dart`: AuthProvider için birim testler
- `test/widget_test.dart`: Widget davranış testi örneği

---

## 📝 Notlar

- Uygulama, backend API ile haberleşmek için HTTP kullanır.
- Oturum bilgileri cihazda `Shared Preferences` ile saklanır.
- `test/` klasörü birim testleri yazmak ve çalıştırmak için kullanılabilir.
- Proje açıklaması ve meta veriler için `pubspec.yaml` dosyasını inceleyebilirsiniz.

---

## 📚 Kaynaklar

- [Flutter Resmi Dokümantasyonu](https://docs.flutter.dev/)
- [Provider Paketi – pub.dev](https://pub.dev/packages/provider)
- [Flutter Widget Catalog](https://docs.flutter.dev/ui/widgets)

---

## ✨ Katkı

Pull request'ler ve öneriler memnuniyetle karşılanır. Lütfen katkıda bulunmadan önce bir issue açmayı unutmayın. Kod katkılarınızda test eklemeye ve kod standartlarına uymaya özen gösteriniz.
---
Not: Bu README dosyası, proje dokümantasyonu amacıyla Buğra Çetinkaya tarafından hazırlanmıştır.
