// Uygulama genelinde kullanılan özel textfield widget'ı
import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller; // Input kontrolü için controller
  final String hintText; // Placeholder metni
  final bool obscureText; // Şifre alanı mı?
  final TextInputType keyboardType; // Klavye tipi
  final String? errorText; // Hata mesajı

  const CustomTextField({
    Key? key,
    required this.controller,
    required this.hintText,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.errorText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: TextField(
        controller: controller, // Kullanıcıdan veri almak için
        obscureText: obscureText, // Şifre alanı ise gizle
        keyboardType: keyboardType, // Klavye tipi
        style: const TextStyle(color: Colors.white), // Yazı rengi
        decoration: InputDecoration(
          hintText: hintText, // Placeholder
          errorText: errorText, // Hata mesajı
          filled: true,
          fillColor: const Color(0xFF2C3750), // Arka plan rengi
          prefixIconColor: Colors.grey,
          // İkonu input tipine göre belirle
          prefixIcon: hintText.toLowerCase().contains('email')
              ? const Icon(Icons.email)
              : hintText.toLowerCase().contains('password')
                  ? const Icon(Icons.lock)
                  : hintText.toLowerCase().contains('name')
                      ? const Icon(Icons.person)
                      : null,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16), // Köşe yuvarlaklığı
            borderSide: BorderSide.none,
          ),
          hintStyle: const TextStyle(color: Colors.grey), // Placeholder rengi
        ),
      ),
    );
  }
}
