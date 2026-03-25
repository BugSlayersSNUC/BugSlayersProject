import 'dart:ui';
import 'package:flutter/material.dart';

class RewardsScreen extends StatelessWidget {
  const RewardsScreen({super.key});

  // ── Hardcoded team points (same as Home screen) ──
  static const int _teamPoints = 3120;
  static const String _teamName = 'Crimson Chapter';

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
              _buildPointsCard(),
              const SizedBox(height: 16),
              _buildSectionLabel(),
              Expanded(child: _buildRewardsList()),
            ],
          ),
        ),
      ),
    );
  }

  // ── Top Header ──
  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
      child: Row(
        children: [
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Rewards',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Claim rewards with your team points',
                style: TextStyle(color: Colors.white38, fontSize: 12),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ── Team Points Summary Card ──
  Widget _buildPointsCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: LinearGradient(
                colors: [
                  const Color(0xFFE53935).withValues(alpha: 0.18),
                  Colors.white.withValues(alpha: 0.04),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              border: Border.all(
                color: const Color(0xFFE53935).withValues(alpha: 0.3),
              ),
            ),
            child: Row(
              children: [
                // Team initial avatar
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      colors: [Color(0xFFE53935), Color(0xFF8B0000)],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFE53935).withValues(alpha: 0.35),
                        blurRadius: 10,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: Center(
                    child: Text(
                      _teamName.split(' ').take(2).map((w) => w[0]).join(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    _teamName,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '$_teamPoints',
                      style: const TextStyle(
                        color: Color(0xFFEF5350),
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      'pts',
                      style: TextStyle(color: Colors.white24, fontSize: 11),
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

  Widget _buildSectionLabel() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: Row(
        children: [
          const Text(
            'AVAILABLE REWARDS',
            style: TextStyle(
              color: Colors.white24,
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.07))),
        ],
      ),
    );
  }

  Widget _buildRewardsList() {
    final rewards = _rewards();
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
      itemCount: rewards.length,
      separatorBuilder: (context, index) => const SizedBox(height: 10),
      itemBuilder: (context, index) {
        final reward = rewards[index];
        final unlocked = _teamPoints >= reward.requiredPts;
        return _RewardCard(reward: reward, unlocked: unlocked);
      },
    );
  }

  List<_RewardData> _rewards() => [
    const _RewardData(
      title: 'Blood Donor Certificate',
      description:
          'Official certificate recognising your team\'s contribution to saving lives.',
      requiredPts: 500,
      icon: Icons.workspace_premium_rounded,
    ),
    const _RewardData(
      title: 'PulseLink Sticker Pack',
      description:
          'Exclusive digital and physical sticker pack with the PulseLink blood drop designs.',
      requiredPts: 1000,
      icon: Icons.star_rounded,
    ),
    const _RewardData(
      title: 'Priority Camp Registration',
      description:
          'Skip the queue — your team gets reserved slots at the next blood donation camp.',
      requiredPts: 1500,
      icon: Icons.event_available_rounded,
    ),
    const _RewardData(
      title: 'Community Spotlight',
      description:
          'Your team is featured in the PulseLink monthly newsletter and social media post.',
      requiredPts: 2000,
      icon: Icons.campaign_rounded,
    ),
    const _RewardData(
      title: 'Team Merchandise Kit',
      description:
          'Custom branded T-shirts, water bottles, and tote bags for the whole team.',
      requiredPts: 2500,
      icon: Icons.redeem_rounded,
    ),
    const _RewardData(
      title: 'Hospital Partnership Badge',
      description:
          'Your team earns an official partnership status with a local hospital network.',
      requiredPts: 3000,
      icon: Icons.local_hospital_rounded,
    ),
    const _RewardData(
      title: 'Annual Gala Invitation',
      description:
          'VIP invitation to the annual PulseLink Heroes Gala — dinner, awards, and networking.',
      requiredPts: 4000,
      icon: Icons.celebration_rounded,
    ),
    const _RewardData(
      title: 'Legacy Wall of Fame',
      description:
          'Your team\'s name engraved on the PulseLink Hall of Fame, permanently recognising your impact.',
      requiredPts: 5000,
      icon: Icons.military_tech_rounded,
    ),
  ];
}

// ────────────────────────────────────────────────────────────────────────────
// Data model
// ────────────────────────────────────────────────────────────────────────────

class _RewardData {
  final String title;
  final String description;
  final int requiredPts;
  final IconData icon;

  const _RewardData({
    required this.title,
    required this.description,
    required this.requiredPts,
    required this.icon,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Reward card widget
// ────────────────────────────────────────────────────────────────────────────

class _RewardCard extends StatelessWidget {
  final _RewardData reward;
  final bool unlocked;

  const _RewardCard({required this.reward, required this.unlocked});

  static const _accent = Color(0xFFEF5350);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            color: Colors.white.withValues(alpha: 0.04),
            border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
          ),
          child: Row(
            children: [
              // Icon badge
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _accent.withValues(alpha: 0.12),
                  border: Border.all(color: _accent.withValues(alpha: 0.25)),
                ),
                child: Icon(reward.icon, color: _accent, size: 24),
              ),
              const SizedBox(width: 14),
              // Text content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      reward.title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      reward.description,
                      style: const TextStyle(
                        color: Colors.white54,
                        fontSize: 11,
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Points cost + optional Claim button
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            color: _accent.withValues(alpha: 0.10),
                            border: Border.all(
                              color: _accent.withValues(alpha: 0.25),
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(
                                Icons.toll_rounded,
                                size: 12,
                                color: _accent,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '${reward.requiredPts} pts',
                                style: const TextStyle(
                                  color: _accent,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Spacer(),
                        if (unlocked)
                          GestureDetector(
                            onTap: () => _showClaimDialog(context),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 14,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                gradient: const LinearGradient(
                                  colors: [
                                    Color(0xFFE53935),
                                    Color(0xFFB71C1C),
                                  ],
                                ),
                              ),
                              child: const Text(
                                'Claim',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
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
    );
  }

  void _showClaimDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: Colors.transparent,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: const Color(0xFF1A0A0A).withValues(alpha: 0.97),
                border: Border.all(
                  color: const Color(0xFFE53935).withValues(alpha: 0.35),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(
                    Icons.check_circle_outline_rounded,
                    color: Color(0xFFEF5350),
                    size: 48,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    reward.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    "Your claim has been submitted!\nAn admin will contact your team shortly.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white54,
                      fontSize: 13,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 24),
                  GestureDetector(
                    onTap: () => Navigator.pop(ctx),
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        gradient: const LinearGradient(
                          colors: [Color(0xFFE53935), Color(0xFFB71C1C)],
                        ),
                      ),
                      child: const Center(
                        child: Text(
                          'Got it!',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
