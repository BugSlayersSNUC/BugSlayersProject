import 'dart:ui';
import 'package:flutter/material.dart';
import '../widgets/heart_painter.dart';
import 'qr_scanner_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  // ──────────────────────────────────────────────
  // Group-level configurable values
  // ──────────────────────────────────────────────
  static const double heartBpm = 72;
  static const double bloodFillLevel = 0.72;
  static const int groupTotalPoints = 3120;

  @override
  Widget build(BuildContext context) {
    final members = _groupMembers();

    return Scaffold(
      backgroundColor: const Color(0xFF0D0D0D),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1A0A0A), Color(0xFF0D0D0D), Color(0xFF0A0505)],
            stops: [0.0, 0.5, 1.0],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // ── Top Bar ──
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 10, 20, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    _DonateTopButton(),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              // ── Fixed top: heart + label ──
              _buildHeart(),
              _buildSubLabel(),
              const SizedBox(height: 24),

              // ── Section header (fixed) ──
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  children: [
                    const Text(
                      'GROUP MEMBERS',
                      style: TextStyle(
                        color: Colors.white24,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.5,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Divider(
                        color: Colors.white.withValues(alpha: 0.07),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),

              // ── Scrollable member list only ──
              Expanded(
                child: ListView.separated(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                  itemCount: members.length,
                  separatorBuilder: (context, index) =>
                      const SizedBox(height: 10),
                  itemBuilder: (context, index) =>
                      _MemberCard(member: members[index], rank: index + 1),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeart() {
    return const Center(
      child: BeatingHeart(
        bpm: heartBpm,
        fillLevel: bloodFillLevel,
        donationCount: groupTotalPoints,
        size: 300,
      ),
    );
  }

  Widget _buildSubLabel() {
    return const Column(
      children: [
        Text(
          'POINTS',
          style: TextStyle(
            color: Colors.white38,
            fontSize: 13,
            fontWeight: FontWeight.w600,
            letterSpacing: 3.0,
          ),
        ),
        SizedBox(height: 4),
        Text(
          'by Crimson Chapter',
          style: TextStyle(
            color: Colors.white24,
            fontSize: 11,
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }

  List<_MemberData> _groupMembers() {
    return const [
      _MemberData(
        name: 'Vishal K.',
        bloodType: 'O+',
        isMe: true,
        points: 320,
        donationCount: 4,
        streakMonths: 8,
        nextEligible: '8 Jun 2026',
        donations: [
          _DonationRecord(
            date: '12 Mar 2026',
            location: 'City Blood Bank, Sector 12',
            pts: 8,
          ),
          _DonationRecord(
            date: '18 Dec 2025',
            location: 'Apollo Hospital Camp',
            pts: 8,
          ),
          _DonationRecord(
            date: '02 Sep 2025',
            location: 'Red Cross Drive, Hall 4',
            pts: 8,
          ),
          _DonationRecord(
            date: '05 Jun 2025',
            location: 'District Medical Centre',
            pts: 8,
          ),
        ],
      ),
      _MemberData(
        name: 'Ananya S.',
        bloodType: 'A+',
        isMe: false,
        points: 288,
        donationCount: 3,
        streakMonths: 6,
        nextEligible: '10 Jun 2026',
        donations: [
          _DonationRecord(
            date: '10 Mar 2026',
            location: 'Apollo Hospital Camp',
            pts: 8,
          ),
          _DonationRecord(
            date: '15 Nov 2025',
            location: 'City Blood Bank, Sector 12',
            pts: 8,
          ),
          _DonationRecord(
            date: '20 Aug 2025',
            location: 'NSS Medical Drive',
            pts: 8,
          ),
        ],
      ),
      _MemberData(
        name: 'Rohan M.',
        bloodType: 'B+',
        isMe: false,
        points: 264,
        donationCount: 3,
        streakMonths: 5,
        nextEligible: '07 Jun 2026',
        donations: [
          _DonationRecord(
            date: '07 Mar 2026',
            location: 'Red Cross Drive, Hall 4',
            pts: 8,
          ),
          _DonationRecord(
            date: '10 Oct 2025',
            location: 'District Medical Centre',
            pts: 8,
          ),
          _DonationRecord(
            date: '14 Jul 2025',
            location: 'City Blood Bank, Sector 12',
            pts: 8,
          ),
        ],
      ),
      _MemberData(
        name: 'Preethi K.',
        bloodType: 'AB-',
        isMe: false,
        points: 216,
        donationCount: 2,
        streakMonths: 4,
        nextEligible: '02 Jun 2026',
        donations: [
          _DonationRecord(
            date: '02 Mar 2026',
            location: 'District Medical Centre',
            pts: 8,
          ),
          _DonationRecord(
            date: '05 Sep 2025',
            location: 'Apollo Hospital Camp',
            pts: 8,
          ),
        ],
      ),
      _MemberData(
        name: 'Kiran R.',
        bloodType: 'O-',
        isMe: false,
        points: 176,
        donationCount: 2,
        streakMonths: 3,
        nextEligible: '25 May 2026',
        donations: [
          _DonationRecord(
            date: '25 Feb 2026',
            location: 'NSS Medical Drive',
            pts: 8,
          ),
          _DonationRecord(
            date: '28 Aug 2025',
            location: 'Red Cross Drive, Hall 4',
            pts: 8,
          ),
        ],
      ),
      _MemberData(
        name: 'Divya N.',
        bloodType: 'A-',
        isMe: false,
        points: 144,
        donationCount: 2,
        streakMonths: 2,
        nextEligible: '18 May 2026',
        donations: [
          _DonationRecord(
            date: '18 Feb 2026',
            location: 'City Blood Bank, Sector 12',
            pts: 8,
          ),
          _DonationRecord(
            date: '02 Nov 2025',
            location: 'Apollo Hospital Camp',
            pts: 8,
          ),
        ],
      ),
    ];
  }
}

// ── Donate Blood button ──

class _DonateTopButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const QrScannerScreen()),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            colors: [Color(0xFFE53935), Color(0xFF8B0000)],
          ),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFE53935).withValues(alpha: 0.4),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.volunteer_activism_rounded, color: Colors.white, size: 18),
            SizedBox(width: 8),
            Text(
              'Donate Blood',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Data models
// ────────────────────────────────────────────────────────────────────────────

class _DonationRecord {
  final String date;
  final String location;
  final int pts;
  const _DonationRecord({
    required this.date,
    required this.location,
    required this.pts,
  });
}

class _MemberData {
  final String name;
  final String bloodType;
  final bool isMe;
  final int points;
  final int donationCount;
  final int streakMonths;
  final String nextEligible;
  final List<_DonationRecord> donations;

  const _MemberData({
    required this.name,
    required this.bloodType,
    required this.isMe,
    required this.points,
    required this.donationCount,
    required this.streakMonths,
    required this.nextEligible,
    required this.donations,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Member card (compact row, tappable)
// ────────────────────────────────────────────────────────────────────────────

class _MemberCard extends StatelessWidget {
  final _MemberData member;
  final int rank;

  const _MemberCard({required this.member, required this.rank});

  void _showHistory(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => _MemberHistorySheet(member: member),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _showHistory(context),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: member.isMe
                  ? const Color(0xFFE53935).withValues(alpha: 0.08)
                  : Colors.white.withValues(alpha: 0.04),
              border: Border.all(
                color: member.isMe
                    ? const Color(0xFFE53935).withValues(alpha: 0.22)
                    : Colors.white.withValues(alpha: 0.06),
              ),
            ),
            child: Row(
              children: [
                // Rank
                SizedBox(
                  width: 26,
                  child: Text(
                    '#$rank',
                    style: TextStyle(
                      color: rank == 1
                          ? const Color(0xFFFFD700)
                          : Colors.white24,
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                // Avatar
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: member.isMe
                        ? const Color(0xFFE53935).withValues(alpha: 0.2)
                        : Colors.white.withValues(alpha: 0.07),
                  ),
                  child: Center(
                    child: Text(
                      member.isMe ? '♥' : member.name[0],
                      style: TextStyle(
                        color: member.isMe
                            ? const Color(0xFFE53935)
                            : Colors.white54,
                        fontSize: member.isMe ? 17 : 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                // Name + donations
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            member.name,
                            style: TextStyle(
                              color: member.isMe
                                  ? const Color(0xFFEF5350)
                                  : Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          if (member.isMe) ...[
                            const SizedBox(width: 6),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 6,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(4),
                                color: const Color(
                                  0xFFE53935,
                                ).withValues(alpha: 0.15),
                              ),
                              child: const Text(
                                'YOU',
                                style: TextStyle(
                                  color: Color(0xFFEF5350),
                                  fontSize: 9,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                      Text(
                        '${member.donationCount} donation${member.donationCount == 1 ? '' : 's'}  ·  ${member.bloodType}',
                        style: const TextStyle(
                          color: Colors.white24,
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                ),
                // Points
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${member.points}',
                      style: const TextStyle(
                        color: Color(0xFFEF5350),
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      'pts',
                      style: TextStyle(color: Colors.white24, fontSize: 10),
                    ),
                  ],
                ),
                const SizedBox(width: 6),
                const Icon(
                  Icons.chevron_right_rounded,
                  color: Colors.white12,
                  size: 18,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Member history bottom sheet — styled like profile screen
// ────────────────────────────────────────────────────────────────────────────

class _MemberHistorySheet extends StatelessWidget {
  final _MemberData member;
  const _MemberHistorySheet({required this.member});

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.72,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      builder: (context, scrollController) {
        return ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(24),
                ),
                color: const Color(0xFF120808).withValues(alpha: 0.97),
                border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
              ),
              child: ListView(
                controller: scrollController,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  // Handle
                  const SizedBox(height: 12),
                  Center(
                    child: Container(
                      width: 36,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // ── Profile card (mirrors Profile screen) ──
                  ClipRRect(
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
                            color: const Color(
                              0xFFE53935,
                            ).withValues(alpha: 0.2),
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
                                  colors: [
                                    Color(0xFFE53935),
                                    Color(0xFF8B0000),
                                  ],
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(
                                      0xFFE53935,
                                    ).withValues(alpha: 0.35),
                                    blurRadius: 14,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Center(
                                child: Text(
                                  member.isMe
                                      ? '♥'
                                      : member.name
                                            .split(' ')
                                            .map((w) => w[0])
                                            .take(2)
                                            .join(),
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: member.isMe ? 26 : 20,
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
                                  Text(
                                    member.name,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'Crimson Chapter  ·  ${member.bloodType}',
                                    style: const TextStyle(
                                      color: Colors.white38,
                                      fontSize: 13,
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  Wrap(
                                    spacing: 6,
                                    runSpacing: 6,
                                    children: [
                                      _statPill('${member.points} pts'),
                                      _statPill(
                                        '${member.donationCount} donations',
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // ── History section label ──
                  const Text(
                    'DONATION HISTORY',
                    style: TextStyle(
                      color: Colors.white24,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 12),

                  // ── History items (Profile-style) ──
                  ...member.donations.asMap().entries.map(
                    (e) => Padding(
                      padding: EdgeInsets.only(
                        bottom: e.key < member.donations.length - 1 ? 8 : 0,
                      ),
                      child: _HistoryCard(record: e.value),
                    ),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        );
      },
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
}

// ── History card — matches Profile screen style ──

class _HistoryCard extends StatelessWidget {
  final _DonationRecord record;
  const _HistoryCard({required this.record});

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
                      record.location,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      record.date,
                      style: const TextStyle(
                        color: Colors.white24,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 5,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: Text(
                  '+${record.pts} pts',
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
