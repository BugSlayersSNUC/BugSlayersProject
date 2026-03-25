import 'dart:ui';
import 'package:flutter/material.dart';

/// Inter-group leaderboard screen. Tapping any group opens a detail sheet
/// showing each member and their individual points.
class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

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
          child: Column(
            children: [
              _buildHeader(),
              const SizedBox(height: 8),
              _buildPodium(context),
              const SizedBox(height: 16),
              _buildListHeader(),
              Expanded(child: _buildRankingList(context)),
            ],
          ),
        ),
      ),
    );
  }

  // ── Header ──
  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
      child: Row(
        children: [
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Leaderboard',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Groups ranked by total points',
                style: TextStyle(color: Colors.white38, fontSize: 12),
              ),
            ],
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: const Color(0xFFE53935).withValues(alpha: 0.15),
              border: Border.all(
                  color: const Color(0xFFE53935).withValues(alpha: 0.3)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.calendar_month_rounded,
                    size: 14, color: Color(0xFFEF5350)),
                SizedBox(width: 4),
                Text(
                  'This Month',
                  style: TextStyle(
                      color: Color(0xFFEF5350),
                      fontSize: 12,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Top 3 Podium ──
  Widget _buildPodium(BuildContext context) {
    final top3 = _sampleGroups().take(3).toList();
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
              child: _PodiumCard(
                  group: top3[1], rank: 2, height: 138, context: context)),
          const SizedBox(width: 10),
          Expanded(
              child: _PodiumCard(
                  group: top3[0], rank: 1, height: 170, context: context)),
          const SizedBox(width: 10),
          Expanded(
              child: _PodiumCard(
                  group: top3[2], rank: 3, height: 115, context: context)),
        ],
      ),
    );
  }

  Widget _buildListHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: Row(
        children: [
          const Text(
            'OTHER GROUPS',
            style: TextStyle(
              color: Colors.white24,
              fontSize: 11,
              fontWeight: FontWeight.w600,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
              child: Divider(color: Colors.white.withValues(alpha: 0.07))),
        ],
      ),
    );
  }

  Widget _buildRankingList(BuildContext context) {
    final groups = _sampleGroups().skip(3).toList();
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      itemCount: groups.length,
      separatorBuilder: (context, index) => const SizedBox(height: 8),
      itemBuilder: (context, index) =>
          _RankRow(group: groups[index], rank: index + 4, context: context),
    );
  }

  List<_GroupData> _sampleGroups() {
    return const [
      _GroupData(
        name: 'Crimson Chapter',
        points: 3120,
        members: [
          _MemberEntry(name: 'Vishal K.', pts: 320, donations: 4),
          _MemberEntry(name: 'Ananya S.', pts: 288, donations: 3),
          _MemberEntry(name: 'Rohan M.', pts: 264, donations: 3),
          _MemberEntry(name: 'Preethi K.', pts: 216, donations: 2),
          _MemberEntry(name: 'Kiran R.', pts: 176, donations: 2),
          _MemberEntry(name: 'Divya N.', pts: 144, donations: 2),
        ],
      ),
      _GroupData(
        name: 'The Red Brigade',
        points: 2870,
        members: [
          _MemberEntry(name: 'Aditya R.', pts: 512, donations: 6),
          _MemberEntry(name: 'Sneha P.', pts: 440, donations: 5),
          _MemberEntry(name: 'Nikhil B.', pts: 380, donations: 4),
          _MemberEntry(name: 'Meera T.', pts: 296, donations: 3),
          _MemberEntry(name: 'Sai K.', pts: 200, donations: 2),
          _MemberEntry(name: 'Priya V.', pts: 160, donations: 2),
        ],
      ),
      _GroupData(
        name: 'Lifeline Collective',
        points: 2410,
        members: [
          _MemberEntry(name: 'Rahul G.', pts: 480, donations: 5),
          _MemberEntry(name: 'Kavya N.', pts: 400, donations: 4),
          _MemberEntry(name: 'Vivek S.', pts: 320, donations: 4),
          _MemberEntry(name: 'Pooja M.', pts: 240, donations: 3),
          _MemberEntry(name: 'Aryan C.', pts: 240, donations: 3),
          _MemberEntry(name: 'Lakshmi S.', pts: 160, donations: 2),
          _MemberEntry(name: 'Tarun H.', pts: 160, donations: 2),
          _MemberEntry(name: 'Isha P.', pts: 80, donations: 1),
        ],
      ),
      _GroupData(
        name: 'Scarlet Guardians',
        points: 1980,
        members: [
          _MemberEntry(name: 'Deepak J.', pts: 600, donations: 7),
          _MemberEntry(name: 'Shreya L.', pts: 480, donations: 6),
          _MemberEntry(name: 'Mohan D.', pts: 360, donations: 4),
          _MemberEntry(name: 'Nandini A.', pts: 280, donations: 3),
          _MemberEntry(name: 'Suresh B.', pts: 180, donations: 2),
          _MemberEntry(name: 'Ritu C.', pts: 80, donations: 1),
        ],
      ),
      _GroupData(
        name: 'BloodBound Society',
        points: 1750,
        members: [
          _MemberEntry(name: 'Kartik M.', pts: 560, donations: 7),
          _MemberEntry(name: 'Swati R.', pts: 420, donations: 5),
          _MemberEntry(name: 'Arnav S.', pts: 350, donations: 4),
          _MemberEntry(name: 'Jyoti V.', pts: 280, donations: 3),
          _MemberEntry(name: 'Ritesh K.', pts: 140, donations: 2),
        ],
      ),
      _GroupData(
        name: 'Pulse Alliance',
        points: 1630,
        members: [
          _MemberEntry(name: 'Aarav N.', pts: 480, donations: 6),
          _MemberEntry(name: 'Simran D.', pts: 400, donations: 5),
          _MemberEntry(name: 'Yash P.', pts: 320, donations: 4),
          _MemberEntry(name: 'Trisha M.', pts: 240, donations: 3),
          _MemberEntry(name: 'Dev S.', pts: 160, donations: 2),
          _MemberEntry(name: 'Anjali T.', pts: 80, donations: 1),
        ],
      ),
      _GroupData(
        name: 'Vein of Hope',
        points: 1400,
        members: [
          _MemberEntry(name: 'Kalyan R.', pts: 560, donations: 7),
          _MemberEntry(name: 'Mythili S.', pts: 420, donations: 5),
          _MemberEntry(name: 'Harish B.', pts: 280, donations: 3),
          _MemberEntry(name: 'Gayathri N.', pts: 140, donations: 2),
        ],
      ),
    ];
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Data models
// ────────────────────────────────────────────────────────────────────────────

class _MemberEntry {
  final String name;
  final int pts;
  final int donations;
  const _MemberEntry(
      {required this.name, required this.pts, required this.donations});
}

class _GroupData {
  final String name;
  final int points;
  final List<_MemberEntry> members;
  const _GroupData(
      {required this.name, required this.points, required this.members});
}

// ────────────────────────────────────────────────────────────────────────────
// Shared: show team detail bottom sheet
// ────────────────────────────────────────────────────────────────────────────

void _showTeamDetail(BuildContext context, _GroupData group) {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (_) => _TeamDetailSheet(group: group),
  );
}

// ── Podium card ──

class _PodiumCard extends StatelessWidget {
  final _GroupData group;
  final int rank;
  final double height;
  final BuildContext context;

  const _PodiumCard({
    required this.group,
    required this.rank,
    required this.height,
    required this.context,
  });

  Color get _rankColor => switch (rank) {
        1 => const Color(0xFFFFD700),
        2 => const Color(0xFFC0C0C0),
        _ => const Color(0xFFCD7F32),
      };

  String get _medal => switch (rank) {
        1 => '🥇',
        2 => '🥈',
        _ => '🥉',
      };

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _showTeamDetail(context, group),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            height: height,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  _rankColor.withValues(alpha: 0.14),
                  Colors.white.withValues(alpha: 0.04),
                ],
              ),
              border: Border.all(color: _rankColor.withValues(alpha: 0.28)),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(_medal,
                    style: TextStyle(fontSize: rank == 1 ? 26 : 20)),
                const SizedBox(height: 6),
                Text(
                  group.name,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                  ),
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  maxLines: 2,
                ),
                const SizedBox(height: 5),
                Text(
                  '${group.points} pts',
                  style: TextStyle(
                      color: _rankColor,
                      fontSize: 13,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  '${group.members.length} members',
                  style: const TextStyle(color: Colors.white24, fontSize: 10),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ── Rank row for #4 onwards ──

class _RankRow extends StatelessWidget {
  final _GroupData group;
  final int rank;
  final BuildContext context;

  const _RankRow(
      {required this.group, required this.rank, required this.context});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _showTeamDetail(context, group),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
          child: Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              color: Colors.white.withValues(alpha: 0.04),
              border:
                  Border.all(color: Colors.white.withValues(alpha: 0.06)),
            ),
            child: Row(
              children: [
                SizedBox(
                  width: 28,
                  child: Text(
                    '#$rank',
                    style: const TextStyle(
                        color: Colors.white24,
                        fontSize: 14,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color:
                        const Color(0xFFE53935).withValues(alpha: 0.12),
                  ),
                  child: Center(
                    child: Text(
                      group.name.split(' ').take(2).map((w) => w[0]).join(),
                      style: const TextStyle(
                          color: Color(0xFFEF5350),
                          fontWeight: FontWeight.bold,
                          fontSize: 13),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        group.name,
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w500),
                      ),
                      Text(
                        '${group.members.length} members',
                        style: const TextStyle(
                            color: Colors.white24, fontSize: 11),
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${group.points}',
                      style: const TextStyle(
                          color: Color(0xFFEF5350),
                          fontSize: 16,
                          fontWeight: FontWeight.bold),
                    ),
                    const Text('pts',
                        style:
                            TextStyle(color: Colors.white24, fontSize: 10)),
                  ],
                ),
                const SizedBox(width: 6),
                const Icon(Icons.chevron_right_rounded,
                    color: Colors.white12, size: 18),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Team detail bottom sheet
// ────────────────────────────────────────────────────────────────────────────

class _TeamDetailSheet extends StatelessWidget {
  final _GroupData group;
  const _TeamDetailSheet({required this.group});

  @override
  Widget build(BuildContext context) {
    final sorted = [...group.members]
      ..sort((a, b) => b.pts.compareTo(a.pts));
    return DraggableScrollableSheet(
      initialChildSize: 0.65,
      minChildSize: 0.45,
      maxChildSize: 0.92,
      builder: (context, scrollController) {
        return ClipRRect(
          borderRadius:
              const BorderRadius.vertical(top: Radius.circular(24)),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Container(
              decoration: BoxDecoration(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(24)),
                color: const Color(0xFF120808).withValues(alpha: 0.97),
                border:
                    Border.all(color: Colors.white.withValues(alpha: 0.07)),
              ),
              child: Column(
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
                  const SizedBox(height: 16),
                  // Group header
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: const LinearGradient(
                              colors: [Color(0xFFE53935), Color(0xFF8B0000)],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFE53935)
                                    .withValues(alpha: 0.35),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              group.name
                                  .split(' ')
                                  .take(2)
                                  .map((w) => w[0])
                                  .join(),
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                group.name,
                                style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold),
                              ),
                              Text(
                                '${group.points} pts  ·  ${group.members.length} members',
                                style: const TextStyle(
                                    color: Colors.white38, fontSize: 13),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                  Divider(color: Colors.white.withValues(alpha: 0.07)),
                  // Padding for section label
                  Padding(
                    padding: const EdgeInsets.fromLTRB(24, 10, 24, 8),
                    child: Row(
                      children: [
                        const Text(
                          'MEMBERS',
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
                              color: Colors.white.withValues(alpha: 0.07)),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: ListView.separated(
                      controller: scrollController,
                      padding:
                          const EdgeInsets.fromLTRB(20, 0, 20, 24),
                      itemCount: sorted.length,
                      separatorBuilder: (context2, i) =>
                          const SizedBox(height: 8),
                      itemBuilder: (context, index) =>
                          _MemberRow(member: sorted[index], rank: index + 1),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

// ── Member row inside the team sheet ──

class _MemberRow extends StatelessWidget {
  final _MemberEntry member;
  final int rank;
  const _MemberRow({required this.member, required this.rank});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: Colors.white.withValues(alpha: 0.04),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 26,
            child: Text(
              '#$rank',
              style: TextStyle(
                color: rank == 1 ? const Color(0xFFFFD700) : Colors.white24,
                fontSize: 13,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: const Color(0xFFE53935).withValues(alpha: 0.12),
            ),
            child: Center(
              child: Text(
                member.name[0],
                style: const TextStyle(
                    color: Color(0xFFEF5350),
                    fontWeight: FontWeight.bold,
                    fontSize: 15),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(member.name,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w500)),
                Text(
                  '${member.donations} donation${member.donations == 1 ? '' : 's'}',
                  style:
                      const TextStyle(color: Colors.white24, fontSize: 11),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text('${member.pts}',
                  style: const TextStyle(
                      color: Color(0xFFEF5350),
                      fontSize: 16,
                      fontWeight: FontWeight.bold)),
              const Text('pts',
                  style: TextStyle(color: Colors.white24, fontSize: 10)),
            ],
          ),
        ],
      ),
    );
  }
}
