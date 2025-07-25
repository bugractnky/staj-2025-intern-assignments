// Kayıt ekranı (RegisterScreen)
import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  // Kullanıcı adı, email ve şifre için controller'lar
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  String? nameError;
  String? emailError;
  String? passwordError;
  String? successMessage;
  String? errorMessage;

  /// Email formatı kontrolü
  bool isEmailValid(String email) {
    return RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(email);
  }

  /// Kayıt formu validasyonu ve provider ile kayıt işlemi
  void validateAndRegister() async {
    setState(() {
      nameError = null;
      emailError = null;
      passwordError = null;
      successMessage = null;
      errorMessage = null;
    });

    final name = nameController.text.trim();
    final email = emailController.text.trim();
    final password = passwordController.text;

    bool valid = true;

    if (name.isEmpty) {
      nameError = 'Name cannot be empty';
      valid = false;
    }

    if (email.isEmpty) {
      emailError = 'Email cannot be empty';
      valid = false;
    } else if (!isEmailValid(email)) {
      emailError = 'Enter a valid email';
      valid = false;
    }

    if (password.isEmpty) {
      passwordError = 'Password cannot be empty';
      valid = false;
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
      valid = false;
    }

    if (valid) {
      try {
        await context.read<AuthProvider>().register(
          nameController.text.trim(),
          emailController.text.trim(),
          passwordController.text.trim(),
          context,
        );
        setState(() {
          successMessage = 'Kayıt başarılı, giriş yapabilirsiniz.';
        });
      } catch (e) {
        setState(() {
          errorMessage = e.toString().replaceFirst('Exception: ', '');
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final containerWidth = screenWidth > 400 ? 400 : screenWidth * 0.9;
    final isLoading = context.watch<AuthProvider>().registerLoading;

    return Scaffold(
      backgroundColor:
          Theme.of(context).scaffoldBackgroundColor, // Tema rengini kullan
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: containerWidth.toDouble(),
            padding: const EdgeInsets.all(30),
            decoration: BoxDecoration(
              color: const Color(0xFF232B3E),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Başlık
                Text('SIGN UP',
                    style: Theme.of(context).textTheme.headlineLarge),
                const SizedBox(height: 40),
                // İsim input
                CustomTextField(
                  controller: nameController,
                  hintText: 'Name',
                  keyboardType: TextInputType.name,
                  errorText: nameError,
                ),
                // Email input
                CustomTextField(
                  controller: emailController,
                  hintText: 'Email address',
                  keyboardType: TextInputType.emailAddress,
                  errorText: emailError,
                ),
                // Şifre input
                CustomTextField(
                  controller: passwordController,
                  hintText: 'Password',
                  obscureText: true,
                  errorText: passwordError,
                ),
                const SizedBox(height: 30),
                // Kayıt butonu
                CustomButton(
                  text: 'Register',
                  isLoading: isLoading,
                  onPressed: validateAndRegister,
                ),
                const SizedBox(height: 20),
                // Kaydın başarılı veya hatalı olduğuna dair mesajlar
                if (successMessage != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: Text(successMessage!, style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                  ),
                if (errorMessage != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: Text(errorMessage!, style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                  ),
                // Giriş ekranına yönlendirme
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Already have an account? ",
                        style: TextStyle(color: Colors.white70)),
                    GestureDetector(
                      onTap: () {
                        Navigator.pop(context); // Giriş ekranına geri dön
                      },
                      child: const Text(
                        'Login',
                        style: TextStyle(
                          color: Color(0xFF4B6DD1),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
