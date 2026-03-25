import 'dart:ui';
import 'package:flutter/material.dart';
import 'join_group_screen.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _goHome() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const JoinGroupScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0D0D0D),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1A0A0A), Color(0xFF0D0D0D)],
          ),
        ),
        child: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              return SingleChildScrollView(
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                child: ConstrainedBox(
                  constraints:
                      BoxConstraints(minHeight: constraints.maxHeight - 64),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // ── Back button + Title ──
                        Row(
                          children: [
                            GestureDetector(
                              onTap: () => Navigator.pop(context),
                              child: Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Colors.white.withValues(alpha: 0.06),
                                  border: Border.all(
                                      color:
                                          Colors.white.withValues(alpha: 0.08)),
                                ),
                                child: const Icon(Icons.arrow_back_rounded,
                                    color: Colors.white70, size: 20),
                              ),
                            ),
                            const SizedBox(width: 16),
                            const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Create Account',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  'Join the PulseLink community',
                                  style: TextStyle(
                                      color: Colors.white38, fontSize: 13),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 40),

                        // ── Fields ──
                        _buildInputField(
                          controller: _nameController,
                          hint: 'Full Name',
                          icon: Icons.badge_outlined,
                        ),
                        const SizedBox(height: 14),
                        _buildInputField(
                          controller: _emailController,
                          hint: 'Email Address',
                          icon: Icons.email_outlined,
                          keyboardType: TextInputType.emailAddress,
                        ),
                        const SizedBox(height: 14),
                        _buildInputField(
                          controller: _usernameController,
                          hint: 'Username',
                          icon: Icons.person_outline_rounded,
                        ),
                        const SizedBox(height: 14),
                        _buildInputField(
                          controller: _passwordController,
                          hint: 'Password',
                          icon: Icons.lock_outline_rounded,
                          isPassword: true,
                          obscureText: _obscurePassword,
                          onTogglePassword: () => setState(
                              () => _obscurePassword = !_obscurePassword),
                        ),
                        const SizedBox(height: 8),

                        // ── Terms note ──
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 8),
                          child: Text(
                            'By signing up you agree to our Terms of Service and Privacy Policy.',
                            textAlign: TextAlign.center,
                            style:
                                TextStyle(color: Colors.white24, fontSize: 11),
                          ),
                        ),
                        const SizedBox(height: 20),

                        // ── Sign Up Button ──
                        GestureDetector(
                          onTap: _goHome,
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(16),
                              gradient: const LinearGradient(
                                colors: [Color(0xFFE53935), Color(0xFFB71C1C)],
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: const Color(0xFFE53935)
                                      .withValues(alpha: 0.35),
                                  blurRadius: 16,
                                  offset: const Offset(0, 6),
                                ),
                              ],
                            ),
                            child: const Center(
                              child: Text(
                                'Create Account',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),

                        // ── OR Divider ──
                        Row(
                          children: [
                            Expanded(
                                child: Divider(
                                    color:
                                        Colors.white.withValues(alpha: 0.1))),
                            const Padding(
                              padding: EdgeInsets.symmetric(horizontal: 16),
                              child: Text(
                                'OR',
                                style: TextStyle(
                                    color: Colors.white24,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600),
                              ),
                            ),
                            Expanded(
                                child: Divider(
                                    color:
                                        Colors.white.withValues(alpha: 0.1))),
                          ],
                        ),
                        const SizedBox(height: 24),

                        // ── Continue with Google ──
                        GestureDetector(
                          onTap: _goHome,
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(16),
                            child: BackdropFilter(
                              filter:
                                  ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                              child: Container(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 16),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(16),
                                  color: Colors.white.withValues(alpha: 0.05),
                                  border: Border.all(
                                      color: Colors.white
                                          .withValues(alpha: 0.1)),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(4),
                                      decoration: const BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: Colors.white,
                                      ),
                                      child: const Text(
                                        'G',
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w900,
                                          fontSize: 14,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    const Text(
                                      'Continue with Google',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 36),

                        // ── Already have account ──
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              'Already have an account? ',
                              style: TextStyle(
                                  color: Colors.white54, fontSize: 14),
                            ),
                            GestureDetector(
                              onTap: () => Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (_) => const LoginScreen()),
                              ),
                              child: const Text(
                                'Log In',
                                style: TextStyle(
                                  color: Color(0xFFEF5350),
                                  fontSize: 14,
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
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildInputField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool isPassword = false,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
    VoidCallback? onTogglePassword,
  }) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            color: Colors.white.withValues(alpha: 0.05),
            border:
                Border.all(color: Colors.white.withValues(alpha: 0.08)),
          ),
          child: TextField(
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            style: const TextStyle(color: Colors.white, fontSize: 15),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle:
                  const TextStyle(color: Colors.white24, fontSize: 15),
              prefixIcon: Icon(icon, color: Colors.white38, size: 20),
              suffixIcon: isPassword
                  ? IconButton(
                      icon: Icon(
                        obscureText
                            ? Icons.visibility_off_outlined
                            : Icons.visibility_outlined,
                        color: Colors.white38,
                        size: 20,
                      ),
                      onPressed: onTogglePassword,
                    )
                  : null,
              contentPadding: const EdgeInsets.symmetric(vertical: 18),
              border: InputBorder.none,
            ),
          ),
        ),
      ),
    );
  }
}
