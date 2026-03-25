import 'dart:ui';
import 'package:flutter/material.dart';
import 'post_detail_screen.dart';
import 'create_post_screen.dart';

/// Reddit-style community feed screen for blood donation posts.
class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final posts = _samplePosts();
    return Scaffold(
      backgroundColor: const Color(0xFF0D0D0D),
      floatingActionButton: _buildFAB(context),
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
              Expanded(
                child: ListView.separated(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
                  itemCount: posts.length,
                  separatorBuilder: (context, index) =>
                      const SizedBox(height: 12),
                  itemBuilder: (context, index) =>
                      _PostCard(post: posts[index]),
                ),
              ),
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

  Widget _buildFAB(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const CreatePostScreen()),
      ),
      child: Container(
        padding:
            const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(28),
          gradient: const LinearGradient(
            colors: [Color(0xFFE53935), Color(0xFFB71C1C)],
          ),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFE53935).withValues(alpha: 0.4),
              blurRadius: 16,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.edit_rounded, color: Colors.white, size: 18),
            SizedBox(width: 8),
            Text(
              'New Post',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<_PostData> _samplePosts() {
    return [
      _PostData(
        community: 'r/BloodHeroes',
        author: 'donor_king',
        timeAgo: '2h',
        title: '🎉 Just completed my 50th donation today!',
        body:
            'Started donating 8 years ago after my father needed a transfusion. '
            "Never looked back. If you're on the fence — just do it. You'll save lives. "
            'Every single donation feels like a gift you give to a stranger who will never know your name, '
            'but whose life you changed forever.',
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
        body:
            "We're organising a blood drive next Saturday. All blood types needed, "
            'especially O− and AB+. Walk-ins welcome from 9 AM to 4 PM. '
            'Refreshments will be provided. Bring your ID and stay hydrated the night before!',
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
        body:
            'I used to feel dizzy after every session until a nurse told me to drink '
            "at least 2L of water the day before. Game changer! "
            'Also eating a proper meal 2 hours before makes a huge difference. Avoid fatty foods though.',
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
        body:
            "There's something about knowing your blood is going straight to saving "
            'someone. I always leave the centre feeling on top of the world. '
            "It's become my favourite ritual every three months.",
        upvotes: 97,
        comments: 31,
        tag: null,
        tagColor: null,
      ),
      _PostData(
        community: 'r/BloodHeroes',
        author: 'platelet_pro',
        timeAgo: '1d',
        title: "Platelet vs whole blood — what's your go-to?",
        body:
            'I recently switched to platelet donations. Takes longer but the need '
            'is huge. Curious what others prefer and why. '
            'Platelets are especially needed for cancer patients undergoing chemo.',
        upvotes: 76,
        comments: 42,
        tag: 'Discussion',
        tagColor: const Color(0xFFAB47BC),
      ),
    ];
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

  void _openDetail(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => PostDetailScreen(
          community: post.community,
          author: post.author,
          timeAgo: post.timeAgo,
          title: post.title,
          body: post.body,
          upvotes: post.upvotes,
          comments: post.comments,
          tag: post.tag,
          tagColor: post.tagColor,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _openDetail(context),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: Colors.white.withValues(alpha: 0.05),
              border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  children: [
                    Container(
                      width: 24,
                      height: 24,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [Color(0xFFE53935), Color(0xFFB71C1C)],
                        ),
                      ),
                      child: const Icon(Icons.water_drop,
                          color: Colors.white, size: 12),
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
                          color: Colors.white24, fontSize: 11),
                    ),
                    const Spacer(),
                    if (post.tag != null)
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 3),
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
                // Title
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
                // Body preview
                Text(
                  post.body,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      color: Colors.white54, fontSize: 13, height: 1.45),
                ),
                const SizedBox(height: 14),
                // Action bar
                Row(
                  children: [
                    _actionButton(Icons.arrow_upward_rounded,
                        '${post.upvotes}', const Color(0xFFEF5350)),
                    const SizedBox(width: 20),
                    _actionButton(Icons.chat_bubble_outline_rounded,
                        '${post.comments}', Colors.white38),
                    const SizedBox(width: 20),
                    _actionButton(
                        Icons.share_outlined, 'Share', Colors.white38),
                    const Spacer(),
                    const Icon(Icons.arrow_forward_ios_rounded,
                        color: Colors.white12, size: 13),
                  ],
                ),
              ],
            ),
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
        Text(label,
            style: TextStyle(
                color: color, fontSize: 12, fontWeight: FontWeight.w500)),
      ],
    );
  }
}
