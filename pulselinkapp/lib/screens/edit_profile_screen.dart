import 'dart:ui';
import 'package:flutter/material.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final _nameController = TextEditingController(text: 'Vishal K.');
  final _usernameController = TextEditingController(text: 'vishal_k');
  final _emailController =
      TextEditingController(text: 'vishal@example.com');
  final _phoneController = TextEditingController(text: '+91 98765 43210');
  String _selectedBloodGroup = 'O+';
  bool _saved = false;

  final List<String> _bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _usernameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _save() {
    setState(() => _saved = true);
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) Navigator.pop(context);
    });
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
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: ConstrainedBox(
                  constraints:
                      BoxConstraints(minHeight: constraints.maxHeight - 40),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // ── Header ──
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
                                      color: Colors.white
                                          .withValues(alpha: 0.08)),
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
                                  'Edit Profile',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  'Update your personal details',
                                  style: TextStyle(
                                      color: Colors.white38, fontSize: 12),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 32),

                        // ── Avatar ──
                        Center(
                          child: Stack(
                            children: [
                              Container(
                                width: 80,
                                height: 80,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  gradient: const LinearGradient(
                                    colors: [
                                      Color(0xFFE53935),
                                      Color(0xFF8B0000)
                                    ],
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                      color: const Color(0xFFE53935)
                                          .withValues(alpha: 0.4),
                                      blurRadius: 16,
                                      offset: const Offset(0, 4),
                                    )
                                  ],
                                ),
                                child: const Center(
                                  child: Text(
                                    'VK',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 26,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                              Positioned(
                                right: 0,
                                bottom: 0,
                                child: Container(
                                  padding: const EdgeInsets.all(6),
                                  decoration: const BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: Color(0xFFE53935),
                                  ),
                                  child: const Icon(Icons.edit_rounded,
                                      color: Colors.white, size: 14),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 32),

                        // ── Fields ──
                        _buildLabel('Full Name'),
                        const SizedBox(height: 8),
                        _buildField(
                            controller: _nameController,
                            hint: 'Full Name',
                            icon: Icons.person_outline_rounded),
                        const SizedBox(height: 16),

                        _buildLabel('Username'),
                        const SizedBox(height: 8),
                        _buildField(
                            controller: _usernameController,
                            hint: 'Username',
                            icon: Icons.alternate_email_rounded),
                        const SizedBox(height: 16),

                        _buildLabel('Email Address'),
                        const SizedBox(height: 8),
                        _buildField(
                            controller: _emailController,
                            hint: 'Email',
                            icon: Icons.email_outlined,
                            keyboardType: TextInputType.emailAddress),
                        const SizedBox(height: 16),

                        _buildLabel('Phone Number'),
                        const SizedBox(height: 8),
                        _buildField(
                            controller: _phoneController,
                            hint: 'Phone',
                            icon: Icons.phone_outlined,
                            keyboardType: TextInputType.phone),
                        const SizedBox(height: 16),

                        // ── Blood Group picker ──
                        _buildLabel('Blood Group'),
                        const SizedBox(height: 8),
                        _buildBloodGroupPicker(),

                        const SizedBox(height: 32),

                        // ── Save Button ──
                        GestureDetector(
                          onTap: _saved ? null : _save,
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(16),
                              gradient: LinearGradient(
                                colors: _saved
                                    ? [
                                        Colors.green.withValues(alpha: 0.7),
                                        Colors.green.withValues(alpha: 0.5),
                                      ]
                                    : [
                                        const Color(0xFFE53935),
                                        const Color(0xFFB71C1C),
                                      ],
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: (_saved ? Colors.green : const Color(0xFFE53935))
                                      .withValues(alpha: 0.3),
                                  blurRadius: 14,
                                  offset: const Offset(0, 5),
                                ),
                              ],
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  _saved
                                      ? Icons.check_circle_rounded
                                      : Icons.save_rounded,
                                  color: Colors.white,
                                  size: 18,
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  _saved ? 'Saved!' : 'Save Changes',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
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

  Widget _buildLabel(String text) => Text(
        text,
        style: const TextStyle(
          color: Colors.white54,
          fontSize: 11,
          fontWeight: FontWeight.w600,
          letterSpacing: 1,
        ),
      );

  Widget _buildField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
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
            keyboardType: keyboardType,
            style: const TextStyle(color: Colors.white, fontSize: 15),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle:
                  const TextStyle(color: Colors.white24, fontSize: 15),
              prefixIcon: Icon(icon, color: Colors.white38, size: 20),
              contentPadding: const EdgeInsets.symmetric(vertical: 18),
              border: InputBorder.none,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBloodGroupPicker() {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: _bloodGroups.map((bg) {
        final selected = bg == _selectedBloodGroup;
        return GestureDetector(
          onTap: () => setState(() => _selectedBloodGroup = bg),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              color: selected
                  ? const Color(0xFFE53935).withValues(alpha: 0.2)
                  : Colors.white.withValues(alpha: 0.05),
              border: Border.all(
                color: selected
                    ? const Color(0xFFEF5350).withValues(alpha: 0.6)
                    : Colors.white.withValues(alpha: 0.08),
              ),
            ),
            child: Text(
              bg,
              style: TextStyle(
                color: selected ? const Color(0xFFEF5350) : Colors.white54,
                fontSize: 14,
                fontWeight: selected ? FontWeight.bold : FontWeight.w400,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}
