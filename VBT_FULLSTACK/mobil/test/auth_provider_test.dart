import 'package:flutter_test/flutter_test.dart';
import 'package:login_app/providers/auth_provider.dart';
import 'package:flutter/material.dart';

void main() {
  group('AuthProvider', () {
    late AuthProvider authProvider;
    final BuildContext? mockContext = null; // Gerçek context gerekmediği için null

    setUp(() {
      authProvider = AuthProvider();
    });

    test('Başlangıçta token null olmalı', () {
      expect(authProvider.token, isNull);
    });

    test('Login işlemi sonrası token atanmalı (mock)', () async {
      await authProvider.login('test@test.com', '123456', mockContext!);
      expect(authProvider.token, isNotNull);
    }, skip: 'Context gerektiriyor, widget testte çalıştırılmalı');

    test('Logout sonrası token null olmalı', () async {
      await authProvider.logout(mockContext!);
      expect(authProvider.token, isNull);
    }, skip: 'Context gerektiriyor, widget testte çalıştırılmalı');
  });
} 