// Giriş ekranı (LoginScreen)
import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  // Email ve şifre için controller'lar
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  String? emailError;
  String? passwordError;

  /// Email formatı kontrolü
  bool isEmailValid(String email) {
    return RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(email);
  }

  /// Şifremi unuttum diyalogu
  void showForgotPasswordDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Forgot Password'),
        content: const Text('Password recovery is not implemented yet.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final containerWidth = screenWidth > 400 ? 400 : screenWidth * 0.9;
    final isLoading = context.watch<AuthProvider>().loginLoading;

    return Scaffold(
      backgroundColor: const Color(0xFF1A1F29),
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
                // Uygulama logosu
                Image.asset('assets/logo.png', width: 80, height: 80),
                const SizedBox(height: 20),

                // Başlık
                Text('LOGIFY',
                    style: Theme.of(context).textTheme.headlineLarge),
                const SizedBox(height: 40),

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

                // Şifremi unuttum butonu
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: showForgotPasswordDialog,
                    child: const Text(
                      'Forgot password?',
                      style: TextStyle(color: Color(0xFF4B6DD1)),
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Giriş butonu (Provider ile login)
                CustomButton(
                  text: 'Login',
                  isLoading: isLoading,
                  onPressed: () {
                    context.read<AuthProvider>().login(
                      emailController.text.trim(),
                      passwordController.text.trim(),
                      context,
                    );
                  },
                ),
                const SizedBox(height: 24),

                // Kayıt ekranına yönlendirme
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Don't have an account? ",
                      style: TextStyle(color: Colors.white70),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/register');
                      },
                      child: const Text(
                        'Sign Up',
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
