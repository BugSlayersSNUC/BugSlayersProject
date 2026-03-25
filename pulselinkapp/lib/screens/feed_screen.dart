import 'dart:ui';
import 'package:flutter/material.dart';

/// Reddit-style community feed screen for blood donation posts.
class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0D0D0D),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF1A0A0A),
              Color(0xFF0D0D0D),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              _buildSortBar(),
              Expanded(child: _buildFeed()),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return const Padding(
      padding: EdgeInsets.fromLTRB(20, 16, 20, 8),
      child: Row(
        children: [
          Text(
            'Community Feed',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          Spacer(),
          Icon(Icons.search_rounded, color: Colors.white54, size: 24),
        ],
      ),
    );
  }

  Widget _buildSortBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(
        children: [
          _SortChip(label: 'Hot', icon: Icons.local_fire_department_rounded, isSelected: true),
          const SizedBox(width: 8),
          _SortChip(label: 'New', icon: Icons.access_time_rounded, isSelected: false),
          const SizedBox(width: 8),
          _SortChip(label: 'Top', icon: Icons.trending_up_rounded, isSelected: false),
        ],
      ),
    );
  }

  Widget _buildFeed() {
    final posts = _samplePosts();
    return ListView.separated(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: posts.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) => _PostCard(post: posts[index]),
    );
  }

  List<_PostData> _samplePosts() {
    return [
      _PostData(
        community: 'r/BloodHeroes',
        author: 'donor_king',
        timeAgo: '2h',
        title: '🎉 Just completed my 50th donation today!',
        body: 'Started donating 8 years ago after my father needed a transfusion. '
            'Never looked back. If you\'re on the fence — just do it. You\'ll save lives.',
        upvotes: 342,
        comments: 47,
        tag: 'Milestone',
        tagColor: const Color(0xFFFFB300),
      ),
      _PostData(
        community: 'r/BloodDonation',
        author: 'med_student22',
        timeAgo: '5h',
        title: 'Blood drive at City Medical College — March 30',
        body: 'We\'re organising a blood drive next Saturday. All blood types needed, '
            'especially O− and AB+. Walk-ins welcome from 9 AM to 4 PM.',
        upvotes: 189,
        comments: 23,
        tag: 'Event',
        tagColor: const Color(0xFF42A5F5),
      ),
      _PostData(
        community: 'r/BloodHeroes',
        author: 'sarah_gives',
        timeAgo: '8h',
        title: 'Tip: hydrate well 24 hours before donating',
        body: 'I used to feel dizzy after every session until a nurse told me to drink '
            'at least 2L of water the day before. Game changer!',
        upvotes: 128,
        comments: 15,
        tag: 'Tips',
        tagColor: const Color(0xFF66BB6A),
      ),
      _PostData(
        community: 'r/BloodDonation',
        author: 'night_owl_donor',
        timeAgo: '12h',
        title: 'Anyone else get a tiny adrenaline rush from donating?',
        body: 'There\'s something about knowing your blood is going straight to saving '
            'someone. I always leave the centre feeling on top of the world.',
        upvotes: 97,
        comments: 31,
        tag: null,
        tagColor: null,
      ),
      _PostData(
        community: 'r/BloodHeroes',
        author: 'platelet_pro',
        timeAgo: '1d',
        title: 'Platelet vs whole blood — what\'s your go-to?',
        body: 'I recently switched to platelet donations. Takes longer but the need '
            'is huge. Curious what others prefer and why.',
        upvotes: 76,
        comments: 42,
        tag: 'Discussion',
        tagColor: const Color(0xFFAB47BC),
      ),
    ];
  }
}

// ── Sort chip ──

class _SortChip extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isSelected;

  const _SortChip({
    required this.label,
    required this.icon,
    required this.isSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: isSelected
            ? const Color(0xFFE53935).withValues(alpha: 0.2)
            : Colors.white.withValues(alpha: 0.05),
        border: Border.all(
          color: isSelected
              ? const Color(0xFFE53935).withValues(alpha: 0.5)
              : Colors.white.withValues(alpha: 0.08),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 14,
            color: isSelected ? const Color(0xFFE53935) : Colors.white38,
          ),
          const SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              color: isSelected ? const Color(0xFFEF5350) : Colors.white38,
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

// ── Post data model ──

class _PostData {
  final String community;
  final String author;
  final String timeAgo;
  final String title;
  final String body;
  final int upvotes;
  final int comments;
  final String? tag;
  final Color? tagColor;

  const _PostData({
    required this.community,
    required this.author,
    required this.timeAgo,
    required this.title,
    required this.body,
    required this.upvotes,
    required this.comments,
    this.tag,
    this.tagColor,
  });
}

// ── Reddit-style post card ──

class _PostCard extends StatelessWidget {
  final _PostData post;
  const _PostCard({required this.post});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            color: Colors.white.withValues(alpha: 0.05),
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.07),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ── Header: community · author · time ──
              Row(
                children: [
                  Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        colors: [Color(0xFFE53935), Color(0xFFB71C1C)],
                      ),
                    ),
                    child: const Icon(Icons.water_drop, color: Colors.white, size: 12),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    post.community,
                    style: const TextStyle(
                      color: Color(0xFFEF5350),
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    '  ·  u/${post.author}  ·  ${post.timeAgo}',
                    style: const TextStyle(
                      color: Colors.white24,
                      fontSize: 11,
                    ),
                  ),
                  const Spacer(),
                  if (post.tag != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(6),
                        color: post.tagColor!.withValues(alpha: 0.15),
                      ),
                      child: Text(
                        post.tag!,
                        style: TextStyle(
                          color: post.tagColor,
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 12),

              // ── Title ──
              Text(
                post.title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  height: 1.3,
                ),
              ),
              const SizedBox(height: 8),

              // ── Body ──
              Text(
                post.body,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: Colors.white54,
                  fontSize: 13,
                  height: 1.45,
                ),
              ),
              const SizedBox(height: 14),

              // ── Action bar ──
              Row(
                children: [
                  // Upvote
                  _actionButton(Icons.arrow_upward_rounded, '${post.upvotes}', const Color(0xFFEF5350)),
                  const SizedBox(width: 20),
                  // Comments
                  _actionButton(Icons.chat_bubble_outline_rounded, '${post.comments}', Colors.white38),
                  const SizedBox(width: 20),
                  // Share
                  _actionButton(Icons.share_outlined, 'Share', Colors.white38),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _actionButton(IconData icon, String label, Color color) {
    return Row(
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            color: color,
            fontSize: 12,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
