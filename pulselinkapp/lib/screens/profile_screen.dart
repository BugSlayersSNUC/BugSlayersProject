import 'dart:ui';
import 'package:flutter/material.dart';

/// Profile screen with donation history, settings, and logout.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

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
          child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            children: [
              const SizedBox(height: 20),
              _buildProfileCard(),
              const SizedBox(height: 24),
              _buildSectionTitle('Donation History'),
              const SizedBox(height: 12),
              ..._buildHistoryItems(),
              const SizedBox(height: 24),
              _buildSectionTitle('Settings'),
              const SizedBox(height: 12),
              _buildSettingsGroup(),
              const SizedBox(height: 24),
              _buildLogoutButton(),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  // ── Profile card ──
  Widget _buildProfileCard() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                const Color(0xFFE53935).withValues(alpha: 0.12),
                Colors.white.withValues(alpha: 0.04),
              ],
            ),
            border: Border.all(
              color: const Color(0xFFE53935).withValues(alpha: 0.2),
            ),
          ),
          child: Row(
            children: [
              // Avatar
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [Color(0xFFE53935), Color(0xFF8B0000)],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFE53935).withValues(alpha: 0.35),
                      blurRadius: 14,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: const Center(
                  child: Text(
                    'VK',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              // Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Vishal K.',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      'Crimson Chapter  •  O+',
                      style: TextStyle(color: Colors.white38, fontSize: 13),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        _statPill('42 pts'),
                        const SizedBox(width: 8),
                        _statPill('6 donations'),
                        const SizedBox(width: 8),
                        _statPill('Next: 8 Jun'),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _statPill(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: Colors.white.withValues(alpha: 0.07),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.white60,
          fontSize: 10,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  // ── Section title ──
  Widget _buildSectionTitle(String title) {
    return Text(
      title.toUpperCase(),
      style: const TextStyle(
        color: Colors.white24,
        fontSize: 11,
        fontWeight: FontWeight.w700,
        letterSpacing: 1.5,
      ),
    );
  }

  // ── Donation history ──
  List<Widget> _buildHistoryItems() {
    final items = [
      _HistoryEntry(date: '12 Mar 2026', location: 'City Blood Bank, Sector 12', pts: 8),
      _HistoryEntry(date: '18 Dec 2025', location: 'Apollo Hospital Camp', pts: 8),
      _HistoryEntry(date: '02 Sep 2025', location: 'Red Cross Drive, Hall 4', pts: 8),
      _HistoryEntry(date: '05 Jun 2025', location: 'District Medical Centre', pts: 8),
    ];
    return items
        .asMap()
        .entries
        .map((e) => Padding(
              padding: EdgeInsets.only(bottom: e.key < items.length - 1 ? 8 : 0),
              child: _HistoryCard(entry: e.value, index: e.key),
            ))
        .toList();
  }

  // ── Settings group ──
  Widget _buildSettingsGroup() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            color: Colors.white.withValues(alpha: 0.04),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Column(
            children: [
              _settingsRow(Icons.notifications_none_rounded, 'Notifications', showDivider: true),
              _settingsRow(Icons.lock_outline_rounded, 'Privacy & Security', showDivider: true),
              _settingsRow(Icons.group_outlined, 'My Group — Crimson Chapter', showDivider: true),
              _settingsRow(Icons.help_outline_rounded, 'Help & Support', showDivider: true),
              _settingsRow(Icons.info_outline_rounded, 'About PulseLink', showDivider: false),
            ],
          ),
        ),
      ),
    );
  }

  Widget _settingsRow(IconData icon, String label, {required bool showDivider}) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, color: Colors.white38, size: 20),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  label,
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ),
              const Icon(Icons.chevron_right_rounded, color: Colors.white24, size: 20),
            ],
          ),
        ),
        if (showDivider)
          Divider(
            height: 1,
            indent: 50,
            color: Colors.white.withValues(alpha: 0.06),
          ),
      ],
    );
  }

  // ── Logout ──
  Widget _buildLogoutButton() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            color: const Color(0xFFE53935).withValues(alpha: 0.08),
            border: Border.all(
              color: const Color(0xFFE53935).withValues(alpha: 0.18),
            ),
          ),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.logout_rounded, color: Color(0xFFEF5350), size: 18),
              SizedBox(width: 8),
              Text(
                'Log Out',
                style: TextStyle(
                  color: Color(0xFFEF5350),
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Data + widgets for history ──

class _HistoryEntry {
  final String date;
  final String location;
  final int pts;
  const _HistoryEntry({required this.date, required this.location, required this.pts});
}

class _HistoryCard extends StatelessWidget {
  final _HistoryEntry entry;
  final int index;
  const _HistoryCard({required this.entry, required this.index});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.white.withValues(alpha: 0.04),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Row(
            children: [
              // Timeline indicator
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: const Icon(
                  Icons.water_drop_outlined,
                  color: Color(0xFFEF5350),
                  size: 18,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      entry.location,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      entry.date,
                      style: const TextStyle(color: Colors.white24, fontSize: 11),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: Text(
                  '+${entry.pts} pts',
                  style: const TextStyle(
                    color: Color(0xFFEF5350),
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
