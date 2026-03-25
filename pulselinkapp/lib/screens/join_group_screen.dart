import 'dart:ui';
import 'package:flutter/material.dart';
import 'app_shell.dart';

class JoinGroupScreen extends StatefulWidget {
  const JoinGroupScreen({super.key});

  @override
  State<JoinGroupScreen> createState() => _JoinGroupScreenState();
}

class _JoinGroupScreenState extends State<JoinGroupScreen> {
  final _codeController = TextEditingController();
  int? _selectedGroupIndex;

  static const _groups = [
    _GroupInfo(
      name: 'Crimson Chapter',
      members: 12,
      city: 'Bengaluru',
      badge: 'CC',
    ),
    _GroupInfo(
      name: 'Red Shield Squad',
      members: 8,
      city: 'Mumbai',
      badge: 'RS',
    ),
    _GroupInfo(
      name: 'Lifeline Warriors',
      members: 21,
      city: 'Delhi',
      badge: 'LW',
    ),
    _GroupInfo(
      name: 'Scarlet Donors',
      members: 5,
      city: 'Hyderabad',
      badge: 'SD',
    ),
  ];

  @override
  void dispose() {
    _codeController.dispose();
    super.dispose();
  }

  void _showComingSoon() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text(
          '🚧 Coming soon — backend not wired yet!',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color(0xFF3D0000),
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  void _proceed() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const AppShell()),
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
                padding: const EdgeInsets.symmetric(
                    horizontal: 24, vertical: 24),
                child: ConstrainedBox(
                  constraints:
                      BoxConstraints(minHeight: constraints.maxHeight - 48),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // ── Header ──
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Container(
                              width: 44,
                              height: 44,
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
                                    blurRadius: 12,
                                  ),
                                ],
                              ),
                              child: const Icon(Icons.favorite_rounded,
                                  color: Colors.white, size: 22),
                            ),
                            const SizedBox(width: 12),
                            const Text(
                              'PulseLink',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 36),

                        const Text(
                          'Join a Group',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Connect with your team to track donations together.',
                          style: TextStyle(color: Colors.white38, fontSize: 14),
                        ),

                        const SizedBox(height: 32),

                        // ── Option A: Browse list ──
                        _sectionLabel('BROWSE GROUPS'),
                        const SizedBox(height: 12),

                        ..._groups.asMap().entries.map((e) {
                          final i = e.key;
                          final g = e.value;
                          final selected = _selectedGroupIndex == i;
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: GestureDetector(
                              onTap: () =>
                                  setState(() => _selectedGroupIndex = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 16, vertical: 14),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(16),
                                  color: selected
                                      ? const Color(0xFFE53935)
                                          .withValues(alpha: 0.12)
                                      : Colors.white.withValues(alpha: 0.04),
                                  border: Border.all(
                                    color: selected
                                        ? const Color(0xFFEF5350)
                                            .withValues(alpha: 0.5)
                                        : Colors.white.withValues(alpha: 0.07),
                                    width: selected ? 1.5 : 1,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    // Badge
                                    Container(
                                      width: 42,
                                      height: 42,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        gradient: LinearGradient(
                                          colors: selected
                                              ? [
                                                  const Color(0xFFE53935),
                                                  const Color(0xFF8B0000),
                                                ]
                                              : [
                                                  Colors.white
                                                      .withValues(alpha: 0.12),
                                                  Colors.white
                                                      .withValues(alpha: 0.06),
                                                ],
                                        ),
                                      ),
                                      child: Center(
                                        child: Text(
                                          g.badge,
                                          style: TextStyle(
                                            color: selected
                                                ? Colors.white
                                                : Colors.white54,
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 14),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            g.name,
                                            style: TextStyle(
                                              color: selected
                                                  ? Colors.white
                                                  : Colors.white70,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                          const SizedBox(height: 3),
                                          Text(
                                            '${g.members} members  •  ${g.city}',
                                            style: const TextStyle(
                                              color: Colors.white38,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    AnimatedOpacity(
                                      opacity: selected ? 1.0 : 0.0,
                                      duration:
                                          const Duration(milliseconds: 200),
                                      child: const Icon(
                                        Icons.check_circle_rounded,
                                        color: Color(0xFFEF5350),
                                        size: 22,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        }),

                        // Join selected group button
                        if (_selectedGroupIndex != null) ...[
                          const SizedBox(height: 4),
                          GestureDetector(
                            onTap: _showComingSoon,
                            child: Container(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 14),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(14),
                                gradient: const LinearGradient(
                                  colors: [
                                    Color(0xFFE53935),
                                    Color(0xFFB71C1C)
                                  ],
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(0xFFE53935)
                                        .withValues(alpha: 0.3),
                                    blurRadius: 12,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Text(
                                'Join ${_groups[_selectedGroupIndex!].name}',
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],

                        const SizedBox(height: 28),

                        // ── Divider ──
                        Row(
                          children: [
                            Expanded(
                                child: Divider(
                                    color:
                                        Colors.white.withValues(alpha: 0.08))),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 12),
                              child: Text(
                                'OR',
                                style: TextStyle(
                                  color: Colors.white.withValues(alpha: 0.25),
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: 1,
                                ),
                              ),
                            ),
                            Expanded(
                                child: Divider(
                                    color:
                                        Colors.white.withValues(alpha: 0.08))),
                          ],
                        ),

                        const SizedBox(height: 28),

                        // ── Option B: Join by code ──
                        _sectionLabel('JOIN BY INVITE CODE'),
                        const SizedBox(height: 12),

                        ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: BackdropFilter(
                            filter:
                                ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(14),
                                color: Colors.white.withValues(alpha: 0.05),
                                border: Border.all(
                                    color:
                                        Colors.white.withValues(alpha: 0.08)),
                              ),
                              child: TextField(
                                controller: _codeController,
                                textCapitalization:
                                    TextCapitalization.characters,
                                textAlign: TextAlign.center,
                                maxLength: 8,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 8,
                                ),
                                decoration: const InputDecoration(
                                  hintText: 'XXXXXX',
                                  hintStyle: TextStyle(
                                    color: Colors.white12,
                                    fontSize: 22,
                                    letterSpacing: 8,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  counterText: '',
                                  border: InputBorder.none,
                                  contentPadding: EdgeInsets.symmetric(
                                      horizontal: 20, vertical: 18),
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                        GestureDetector(
                          onTap: _showComingSoon,
                          child: Container(
                            padding:
                                const EdgeInsets.symmetric(vertical: 14),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(14),
                              color: Colors.white.withValues(alpha: 0.06),
                              border: Border.all(
                                  color: Colors.white.withValues(alpha: 0.08)),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.qr_code_scanner_rounded,
                                    color: Colors.white54, size: 18),
                                SizedBox(width: 8),
                                Text(
                                  'Join with Code',
                                  style: TextStyle(
                                    color: Colors.white54,
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        const Spacer(),
                        const SizedBox(height: 28),

                        // ── Skip ──
                        GestureDetector(
                          onTap: _proceed,
                          child: const Padding(
                            padding: EdgeInsets.symmetric(vertical: 10),
                            child: Text(
                              'Skip for now →',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.white24,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
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

  Widget _sectionLabel(String text) => Text(
        text,
        style: const TextStyle(
          color: Colors.white24,
          fontSize: 11,
          fontWeight: FontWeight.w700,
          letterSpacing: 1.5,
        ),
      );
}

class _GroupInfo {
  final String name;
  final int members;
  final String city;
  final String badge;
  const _GroupInfo({
    required this.name,
    required this.members,
    required this.city,
    required this.badge,
  });
}
