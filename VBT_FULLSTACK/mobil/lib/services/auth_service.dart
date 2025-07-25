// Yazar: BUĞRA ÇETİNKAYA | github.com/bugractnky
import 'package:http/http.dart' as http;
import 'dart:convert';
// AuthService: Giriş ve kayıt işlemlerini yöneten servis katmanı.
// Gerçek API ve mock desteği içerir.
//
// Token'ı güvenli saklamak için flutter_secure_storage kullanılabilir:
// import 'package:flutter_secure_storage/flutter_secure_storage.dart';
// final secureStorage = FlutterSecureStorage();
// await secureStorage.write(key: 'token', value: token);
// String? token = await secureStorage.read(key: 'token');

class AuthService {
  // Gerçek API için base URL
  static const String baseUrl = 'http://10.0.2.2:5083/auth';

  /// Kullanıcı girişi (gerçek API)
  Future<String> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'passwordHash': password}),
    );
    print('Login response status: ${response.statusCode}');
    print('Login response body: ${response.body}');
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      // İstersen burada kullanıcı adını da döndürebilirsin: data['user']['name']
      return data['token'];
    } else {
      final data = jsonDecode(response.body);
      throw Exception(data['message'] ?? 'Giriş başarısız');
    }
  }

  /// Kullanıcı kayıt işlemi (isim, email ve şifre ile gerçek API)
  Future<void> registerWithName(String name, String email, String password) async {
    // --- GERÇEK API ENTEGRASYONU ---
    final response = await http.post(
      Uri.parse('$baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'passwordHash': password, 'name': name}),
    );
    print('Register response status: ${response.statusCode}');
    print('Register response body: ${response.body}');
    if (response.statusCode != 200 && response.statusCode != 201) {
      final data = jsonDecode(response.body);
      throw Exception(data['message'] ?? 'Kayıt başarısız');
    }
  }
} 