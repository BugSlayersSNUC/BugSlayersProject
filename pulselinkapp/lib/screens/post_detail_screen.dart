import 'dart:ui';
import 'package:flutter/material.dart';

/// Full-screen post detail page.
class PostDetailScreen extends StatelessWidget {
  final String community;
  final String author;
  final String timeAgo;
  final String title;
  final String body;
  final int upvotes;
  final int comments;
  final String? tag;
  final Color? tagColor;

  const PostDetailScreen({
    super.key,
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
              // ── Top bar ──
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: Container(
                        width: 38,
                        height: 38,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white.withValues(alpha: 0.06),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                        ),
                        child: const Icon(Icons.arrow_back_rounded,
                            color: Colors.white54, size: 20),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        community,
                        style: const TextStyle(
                          color: Color(0xFFEF5350),
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    if (tag != null)
                      Container(
                        padding:
                            const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: tagColor!.withValues(alpha: 0.15),
                        ),
                        child: Text(
                          tag!,
                          style: TextStyle(
                            color: tagColor,
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                  ],
                ),
              ),

              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 8),
                      // Author + time
                      Text(
                        'u/$author  ·  $timeAgo',
                        style: const TextStyle(color: Colors.white24, fontSize: 12),
                      ),
                      const SizedBox(height: 12),
                      // Title
                      Text(
                        title,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          height: 1.3,
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Divider
                      Divider(color: Colors.white.withValues(alpha: 0.07)),
                      const SizedBox(height: 14),
                      // Body text
                      Text(
                        body,
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 15,
                          height: 1.6,
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Action row
                      ClipRRect(
                        borderRadius: BorderRadius.circular(14),
                        child: BackdropFilter(
                          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 14),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(14),
                              color: Colors.white.withValues(alpha: 0.05),
                              border: Border.all(
                                  color: Colors.white.withValues(alpha: 0.07)),
                            ),
                            child: Row(
                              children: [
                                _actionChip(
                                  Icons.arrow_upward_rounded,
                                  '$upvotes',
                                  const Color(0xFFEF5350),
                                ),
                                const SizedBox(width: 20),
                                _actionChip(
                                  Icons.chat_bubble_outline_rounded,
                                  '$comments comments',
                                  Colors.white38,
                                ),
                                const Spacer(),
                                _actionChip(
                                  Icons.share_outlined,
                                  'Share',
                                  Colors.white38,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Comments placeholder
                      _sectionLabel('COMMENTS  ($comments)'),
                      const SizedBox(height: 12),
                      ..._placeholderComments().map(
                        (c) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: _CommentCard(comment: c),
                        ),
                      ),
                      const SizedBox(height: 80),
                    ],
                  ),
                ),
              ),

              // ── Reply bar ──
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(28),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 18, vertical: 12),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(28),
                        color: Colors.white.withValues(alpha: 0.06),
                        border: Border.all(
                            color: Colors.white.withValues(alpha: 0.08)),
                      ),
                      child: Row(
                        children: [
                          const Expanded(
                            child: Text(
                              'Add a comment…',
                              style: TextStyle(
                                  color: Colors.white24, fontSize: 14),
                            ),
                          ),
                          Icon(Icons.send_rounded,
                              color: const Color(0xFFEF5350).withValues(alpha: 0.7),
                              size: 20),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
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

  Widget _actionChip(IconData icon, String label, Color color) {
    return Row(
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: 5),
        Text(label,
            style: TextStyle(
                color: color, fontSize: 13, fontWeight: FontWeight.w500)),
      ],
    );
  }

  List<_CommentData> _placeholderComments() => [
        _CommentData(
            author: 'ravi_42',
            text: 'Absolutely inspiring! Congratulations on this milestone 🎉',
            time: '1h'),
        _CommentData(
            author: 'nisha_drops',
            text: 'Your father must be so proud. Keep going!',
            time: '45m'),
        _CommentData(
            author: 'blood_warrior',
            text: 'Hit 50 last year myself. The feeling is unreal.',
            time: '30m'),
      ];
}

class _CommentData {
  final String author;
  final String text;
  final String time;
  const _CommentData(
      {required this.author, required this.text, required this.time});
}

class _CommentCard extends StatelessWidget {
  final _CommentData comment;
  const _CommentCard({required this.comment});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: Colors.white.withValues(alpha: 0.04),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 26,
                height: 26,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFFE53935).withValues(alpha: 0.15),
                ),
                child: Center(
                  child: Text(
                    comment.author[0].toUpperCase(),
                    style: const TextStyle(
                        color: Color(0xFFEF5350),
                        fontSize: 12,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text('u/${comment.author}',
                  style: const TextStyle(
                      color: Colors.white60,
                      fontSize: 12,
                      fontWeight: FontWeight.w600)),
              const Spacer(),
              Text(comment.time,
                  style:
                      const TextStyle(color: Colors.white24, fontSize: 11)),
            ],
          ),
          const SizedBox(height: 8),
          Text(comment.text,
              style: const TextStyle(
                  color: Colors.white70, fontSize: 13, height: 1.4)),
        ],
      ),
    );
  }
}
