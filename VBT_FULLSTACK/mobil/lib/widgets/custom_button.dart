// Uygulama genelinde kullanılan özel buton widget'ı
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text; // Buton üzerindeki yazı
  final VoidCallback onPressed; // Butona tıklanınca çalışacak fonksiyon
  final bool isLoading; // Yükleniyor mu?
  final String? semanticLabel; // Erişilebilirlik için açıklama

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isLoading = false,
    this.semanticLabel,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Semantics(
        button: true,
        label: semanticLabel ?? text,
        child: ElevatedButton(
          onPressed: isLoading ? null : onPressed, // Yükleniyorsa tıklanamaz
          child: isLoading
              ? const SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    strokeWidth: 3,
                  ),
                )
              : Text(text), // Buton metni
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF4B6DD1), // Arka plan rengi
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16), // Köşe yuvarlaklığı
            ),
            minimumSize: const Size.fromHeight(50), // Yükseklik
            textStyle: const TextStyle(fontSize: 18), // Yazı stili
          ),
        ),
      ),
    );
  }
}
