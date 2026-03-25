import 'dart:ui';
import 'package:flutter/material.dart';

/// Leaderboard screen — groups/communities compete against each other based
/// on total points accumulated by all their members.
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
              _buildPodium(),
              const SizedBox(height: 16),
              _buildListHeader(),
              Expanded(child: _buildRankingList()),
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
                style: TextStyle(
                  color: Colors.white38,
                  fontSize: 12,
                ),
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
                color: const Color(0xFFE53935).withValues(alpha: 0.3),
              ),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.calendar_month_rounded, size: 14, color: Color(0xFFEF5350)),
                SizedBox(width: 4),
                Text(
                  'This Month',
                  style: TextStyle(
                    color: Color(0xFFEF5350),
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Top 3 Podium ──
  Widget _buildPodium() {
    final top3 = _sampleGroups().take(3).toList();
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(child: _PodiumCard(group: top3[1], rank: 2, height: 138)),
          const SizedBox(width: 10),
          Expanded(child: _PodiumCard(group: top3[0], rank: 1, height: 170)),
          const SizedBox(width: 10),
          Expanded(child: _PodiumCard(group: top3[2], rank: 3, height: 115)),
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
          Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.07))),
        ],
      ),
    );
  }

  Widget _buildRankingList() {
    final groups = _sampleGroups().skip(3).toList();
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      itemCount: groups.length,
      separatorBuilder: (context, index) => const SizedBox(height: 8),
      itemBuilder: (context, index) =>
          _RankRow(group: groups[index], rank: index + 4),
    );
  }

  List<_GroupData> _sampleGroups() {
    return const [
      _GroupData(name: 'Crimson Chapter', points: 3120, members: 78),
      _GroupData(name: 'The Red Brigade', points: 2870, members: 64),
      _GroupData(name: 'Lifeline Collective', points: 2410, members: 92),
      _GroupData(name: 'Scarlet Guardians', points: 1980, members: 55),
      _GroupData(name: 'BloodBound Society', points: 1750, members: 48),
      _GroupData(name: 'Pulse Alliance', points: 1630, members: 61),
      _GroupData(name: 'Vein of Hope', points: 1400, members: 37),
    ];
  }
}

// ── Data model ──

class _GroupData {
  final String name;
  final int points;
  final int members;

  const _GroupData({
    required this.name,
    required this.points,
    required this.members,
  });
}

// ── Podium card ──

class _PodiumCard extends StatelessWidget {
  final _GroupData group;
  final int rank;
  final double height;

  const _PodiumCard({
    required this.group,
    required this.rank,
    required this.height,
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
    return ClipRRect(
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
              Text(_medal, style: TextStyle(fontSize: rank == 1 ? 26 : 20)),
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
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                '${group.members} members',
                style: const TextStyle(
                  color: Colors.white24,
                  fontSize: 10,
                ),
              ),
            ],
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

  const _RankRow({required this.group, required this.rank});

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
              // Rank
              SizedBox(
                width: 28,
                child: Text(
                  '#$rank',
                  style: const TextStyle(
                    color: Colors.white24,
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              // Initials avatar
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFFE53935).withValues(alpha: 0.12),
                ),
                child: Center(
                  child: Text(
                    // First letter of each word, max 2
                    group.name
                        .split(' ')
                        .take(2)
                        .map((w) => w[0])
                        .join()
                        .toUpperCase(),
                    style: const TextStyle(
                      color: Color(0xFFEF5350),
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // Group name + member count
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      group.name,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      '${group.members} members',
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
                    '${group.points}',
                    style: const TextStyle(
                      color: Color(0xFFEF5350),
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text(
                    'pts',
                    style: TextStyle(color: Colors.white24, fontSize: 10),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
