import 'dart:ui';
import 'package:flutter/material.dart';

class DonationHistoryScreen extends StatelessWidget {
  const DonationHistoryScreen({super.key});


  static final List<_DonationEntry> _entries = [
    _DonationEntry(date: '12 Mar 2026', location: 'City Blood Bank, Sector 12', pts: 8),
    _DonationEntry(date: '18 Dec 2025', location: 'Apollo Hospital Camp', pts: 8),
    _DonationEntry(date: '02 Sep 2025', location: 'Red Cross Drive, Hall 4', pts: 8),
    _DonationEntry(date: '05 Jun 2025', location: 'District Medical Centre', pts: 8),
  ];

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
          child: CustomScrollView(
            slivers: [
              // ── AppBar ──
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
                  child: Row(
                    children: [
                      GestureDetector(
                        onTap: () => Navigator.pop(context),
                        child: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white.withValues(alpha: 0.06),
                            border: Border.all(
                                color: Colors.white.withValues(alpha: 0.08)),
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
                            'Donation History',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'Your lifetime donation activity',
                            style: TextStyle(color: Colors.white38, fontSize: 12),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 24)),

              // ── Stats row ──
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Row(
                    children: [
                      _statCard('Total Donations', '${_entries.length}',
                          Icons.water_drop_rounded),
                      const SizedBox(width: 12),
                      _statCard('Total Points', '${_entries.length * 8} pts',
                          Icons.toll_rounded),
                      const SizedBox(width: 12),
                      _statCard('Last Donated', 'Mar 2026',
                          Icons.calendar_today_rounded),
                    ],
                  ),
                ),
              ),

              // ── Log list ──
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: _sectionLabel('DONATION LOG'),
                ),
              ),
              const SliverToBoxAdapter(child: SizedBox(height: 10)),

              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (ctx, i) {
                    final e = _entries[i];
                    return Padding(
                      padding: EdgeInsets.fromLTRB(
                          20, 0, 20, i < _entries.length - 1 ? 10 : 24),
                      child: _DonationLogCard(entry: e, index: i),
                    );
                  },
                  childCount: _entries.length,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _statCard(String label, String value, IconData icon) {
    return Expanded(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(14),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: Colors.white.withValues(alpha: 0.04),
              border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(icon, color: const Color(0xFFEF5350), size: 16),
                const SizedBox(height: 8),
                Text(value,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold)),
                const SizedBox(height: 2),
                Text(label,
                    style: const TextStyle(color: Colors.white38, fontSize: 9)),
              ],
            ),
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

// ── Data ──

class _DonationEntry {
  final String date;
  final String location;
  final int pts;
  const _DonationEntry(
      {required this.date, required this.location, required this.pts});
}

// ── Log card ──

class _DonationLogCard extends StatelessWidget {
  final _DonationEntry entry;
  final int index;
  const _DonationLogCard({required this.entry, required this.index});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            color: Colors.white.withValues(alpha: 0.04),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Row(
            children: [
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: const Icon(Icons.water_drop_outlined,
                    color: Color(0xFFEF5350), size: 18),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(entry.location,
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: FontWeight.w500)),
                    const SizedBox(height: 3),
                    Text(entry.date,
                        style: const TextStyle(
                            color: Colors.white24, fontSize: 11)),
                  ],
                ),
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: Text(
                  '+${entry.pts} pts',
                  style: const TextStyle(
                      color: Color(0xFFEF5350),
                      fontSize: 12,
                      fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
