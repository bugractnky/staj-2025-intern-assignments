// Yazar: BUĞRA ÇETİNKAYA
// AuthResponse model sınıfı
class AuthResponse {
  final String token;
  final String? message;

  AuthResponse({required this.token, this.message});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      token: json['token'] as String,
      message: json['message'] as String?,
    );
  }
} 