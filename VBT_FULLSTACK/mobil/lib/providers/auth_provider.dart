// Yazar: BUĞRA ÇETİNKAYA | github.com/bugractnky
// Authentication işlemlerini yöneten Provider sınıfı
// Giriş, kayıt, çıkış, token yönetimi ve durum yönetimi içerir.
//
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/auth_service.dart';

/// Uygulamanın authentication (giriş/kayıt/çıkış) işlemlerini yöneten provider
class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();

  String? _token;
  bool _loginLoading = false;
  bool _registerLoading = false;
  String? _userEmail;
  String? _userName;

  /// Kullanıcıya ait token (giriş yapıldıysa)
  String? get token => _token;
  /// Giriş işlemi sırasında yükleniyor mu?
  bool get loginLoading => _loginLoading;
  /// Kayıt işlemi sırasında yükleniyor mu?
  bool get registerLoading => _registerLoading;
  String? get userEmail => _userEmail;
  String? get userName => _userName;

  /// Kullanıcı girişi işlemi
  /// [email] ve [password] ile giriş yapar, başarılıysa token kaydeder ve yönlendirir.
  Future<void> login(String email, String password, BuildContext context) async {
    _loginLoading = true;
    notifyListeners();

    try {
      final receivedToken = await _authService.login(email, password);
      _token = receivedToken;
      _userEmail = email;
      // Gerçek API'den kullanıcı adı dönerse burada set edilebilir

      // Token'ı localde sakla
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      await prefs.setString('userEmail', email);

      // Başarılı giriş sonrası ana ekrana yönlendir
      Navigator.pushReplacementNamed(context, '/home');
    } catch (e) {
      // Backend'den dönen hata mesajını doğrudan göster
      String msg = e.toString();
      if (msg.startsWith('Exception: ')) {
        msg = msg.replaceFirst('Exception: ', '');
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(msg)),
      );
    } finally {
      _loginLoading = false;
      notifyListeners();
    }
  }

  /// Kullanıcı kayıt işlemi (isim, email ve şifre ile)
  Future<void> registerWithName(String name, String email, String password) async {
    _registerLoading = true;
    notifyListeners();

    try {
      await _authService.registerWithName(name, email, password);
      _userEmail = email;
      _userName = name;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('userEmail', email);
      await prefs.setString('userName', name);
    } catch (e) {
      throw e;
    } finally {
      _registerLoading = false;
      notifyListeners();
    }
  }

  /// Kullanıcı kayıt işlemi
  /// [email] ve [password] ile kayıt olur, başarılıysa bilgi verir ve login ekranına döner.
  Future<void> register(String name, String email, String password, BuildContext context) async {
    _registerLoading = true;
    notifyListeners();

    try {
      await _authService.registerWithName(name, email, password);
      _userEmail = email;
      _userName = name;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('userEmail', email);
      await prefs.setString('userName', name);

      // Kayıt başarılı mesajı göster
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Kayıt başarılı, giriş yapabilirsiniz.')),
      );

      // Kayıt sonrası login ekranına dön
      Navigator.pop(context);
    } catch (e) {
      // Backend'den dönen hata mesajını doğrudan göster
      String msg = e.toString();
      if (msg.startsWith('Exception: ')) {
        msg = msg.replaceFirst('Exception: ', '');
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(msg)),
      );
    } finally {
      _registerLoading = false;
      notifyListeners();
    }
  }

  /// Uygulama açıldığında otomatik giriş kontrolü (token varsa)
  /// Token varsa provider'a yükler.
  Future<void> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('token')) return;

    _token = prefs.getString('token');
    _userEmail = prefs.getString('userEmail');
    notifyListeners();
  }

  /// Kullanıcı çıkış işlemi
  /// Token'ı temizler, kullanıcıyı login ekranına yönlendirir ve bilgi verir.
  Future<void> logout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear(); // Tüm local verileri temizle
    _token = null;
    _userEmail = null;
    _userName = null;
    notifyListeners();

    // Çıkış sonrası kullanıcıya bilgi ver
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Çıkış yapıldı.')),
    );
    // Çıkış sonrası login ekranına yönlendir
    Navigator.of(context, rootNavigator: true).pushReplacementNamed('/');
  }

  /// Token'ın süresi dolduysa otomatik logout veya refresh işlemi için altyapı
  /// Gerçek JWT ile backend'den expire bilgisi alınarak kullanılabilir.
  Future<void> checkTokenValidity(BuildContext context) async {
    // Örnek: Token decode edilip süresi kontrol edilebilir
    // Eğer token expired ise logout(context) çağrılabilir
    // Eğer refresh token varsa, burada yenileme işlemi yapılabilir
  }
}
