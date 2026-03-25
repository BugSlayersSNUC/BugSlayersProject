import 'dart:math';
import 'package:flutter/material.dart';

/// A beating heart widget with configurable pulse rate, blood fill level,
/// and a donation count displayed at its centre.
///
/// Usage:
/// ```dart
/// BeatingHeart(
///   bpm: 72,            // beats per minute
///   fillLevel: 0.65,    // 0.0 (empty) → 1.0 (full)
///   donationCount: 42,  // shown in white at the heart centre
/// )
/// ```
class BeatingHeart extends StatefulWidget {
  /// Heart‐beat frequency in beats per minute.
  final double bpm;

  /// Blood fill from 0.0 (empty) to 1.0 (full), filled bottom → top.
  final double fillLevel;

  /// The number displayed at the centre of the heart.
  final int donationCount;

  /// Diameter of the heart widget (logical pixels).
  final double size;

  const BeatingHeart({
    super.key,
    this.bpm = 72,
    this.fillLevel = 0.5,
    this.donationCount = 0,
    this.size = 250,
  });

  @override
  State<BeatingHeart> createState() => _BeatingHeartState();
}

class _BeatingHeartState extends State<BeatingHeart>
    with TickerProviderStateMixin {
  late AnimationController _beatController;
  late Animation<double> _beatAnimation;
  late AnimationController _waveController;

  @override
  void initState() {
    super.initState();
    _setupBeatAnimation();
    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  void _setupBeatAnimation() {
    final beatDuration = Duration(
      milliseconds: (60000 / widget.bpm).round(),
    );

    _beatController = AnimationController(
      vsync: this,
      duration: beatDuration,
    )..repeat();

    // Two-pulse heartbeat: quick pump → small pump → rest
    _beatAnimation = TweenSequence<double>([
      // First strong beat
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 1.15).chain(CurveTween(curve: Curves.easeOut)), weight: 12),
      TweenSequenceItem(tween: Tween(begin: 1.15, end: 1.0).chain(CurveTween(curve: Curves.easeIn)), weight: 10),
      // Second softer beat
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 1.08).chain(CurveTween(curve: Curves.easeOut)), weight: 10),
      TweenSequenceItem(tween: Tween(begin: 1.08, end: 1.0).chain(CurveTween(curve: Curves.easeIn)), weight: 8),
      // Rest
      TweenSequenceItem(tween: ConstantTween(1.0), weight: 60),
    ]).animate(_beatController);
  }

  @override
  void didUpdateWidget(covariant BeatingHeart oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.bpm != widget.bpm) {
      _beatController.dispose();
      _setupBeatAnimation();
    }
  }

  @override
  void dispose() {
    _beatController.dispose();
    _waveController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_beatAnimation, _waveController]),
      builder: (context, child) {
        return Transform.scale(
          scale: _beatAnimation.value,
          child: SizedBox(
            width: widget.size,
            height: widget.size,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Heart + blood fill
                CustomPaint(
                  size: Size(widget.size, widget.size),
                  painter: _HeartPainter(
                    fillLevel: widget.fillLevel,
                    wavePhase: _waveController.value * 2 * pi,
                  ),
                ),
                // Glow effect behind heart
                CustomPaint(
                  size: Size(widget.size, widget.size),
                  painter: _HeartGlowPainter(
                    opacity: (_beatAnimation.value - 1.0) * 3.0,
                  ),
                ),
                // Donation count text
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '${widget.donationCount}',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: widget.size * 0.22,
                        fontWeight: FontWeight.bold,
                        shadows: const [
                          Shadow(
                            color: Colors.black54,
                            blurRadius: 8,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      'pts',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: widget.size * 0.07,
                        fontWeight: FontWeight.w500,
                        letterSpacing: 2,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Heart Custom Painter
// ────────────────────────────────────────────────────────────────────────────

class _HeartPainter extends CustomPainter {
  final double fillLevel; // 0.0 → 1.0
  final double wavePhase;

  _HeartPainter({required this.fillLevel, required this.wavePhase});

  /// Builds a heart-shaped path centred in [size].
  Path _heartPath(Size size) {
    final w = size.width;
    final h = size.height;

    // Scale & translate so the heart sits nicely in the box
    final path = Path();
    final cx = w / 2;
    final top = h * 0.25;
    final bottom = h * 0.88;

    path.moveTo(cx, bottom);

    // Left half
    path.cubicTo(
      cx - w * 0.45, h * 0.68,
      cx - w * 0.48, h * 0.32,
      cx - w * 0.26, h * 0.22,
    );
    path.cubicTo(
      cx - w * 0.10, h * 0.14,
      cx, top,
      cx, h * 0.35,
    );

    // Right half (mirror)
    path.moveTo(cx, bottom);
    path.cubicTo(
      cx + w * 0.45, h * 0.68,
      cx + w * 0.48, h * 0.32,
      cx + w * 0.26, h * 0.22,
    );
    path.cubicTo(
      cx + w * 0.10, h * 0.14,
      cx, top,
      cx, h * 0.35,
    );

    path.close();
    return path;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final heart = _heartPath(size);
    final bounds = heart.getBounds();

    // ── Outer heart (dark outline / shadow) ──
    final outlinePaint = Paint()
      ..color = const Color(0xFF8B0000)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0;

    // ── Heart base fill (dark maroon) ──
    final basePaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          const Color(0xFF3D0000),
          const Color(0xFF1A0000),
        ],
      ).createShader(bounds)
      ..style = PaintingStyle.fill;

    canvas.drawPath(heart, basePaint);

    // ── Blood fill ──
    if (fillLevel > 0) {
      canvas.save();
      canvas.clipPath(heart);

      final fillTop = bounds.bottom - (bounds.height * fillLevel);

      // Wave path for liquid surface
      final wavePath = Path();
      final waveHeight = 4.0;
      wavePath.moveTo(bounds.left - 10, size.height + 10);
      wavePath.lineTo(bounds.left - 10, fillTop);

      for (double x = bounds.left - 10; x <= bounds.right + 10; x += 1) {
        final y = fillTop +
            sin((x / bounds.width * 4 * pi) + wavePhase) * waveHeight +
            sin((x / bounds.width * 2 * pi) + wavePhase * 0.7) * waveHeight * 0.5;
        wavePath.lineTo(x, y);
      }

      wavePath.lineTo(bounds.right + 10, size.height + 10);
      wavePath.close();

      final bloodPaint = Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            const Color(0xFFE53935), // bright red at top of fill
            const Color(0xFFB71C1C), // darker red at bottom
            const Color(0xFF880E0E),
          ],
          stops: const [0.0, 0.5, 1.0],
        ).createShader(Rect.fromLTRB(bounds.left, fillTop, bounds.right, bounds.bottom))
        ..style = PaintingStyle.fill;

      canvas.drawPath(wavePath, bloodPaint);

      // Subtle specular highlight on the fill surface
      final highlightPaint = Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Colors.white.withValues(alpha: 0.18),
            Colors.transparent,
          ],
        ).createShader(Rect.fromLTRB(bounds.left, fillTop, bounds.right, fillTop + 20))
        ..style = PaintingStyle.fill;

      canvas.drawRect(
        Rect.fromLTRB(bounds.left, fillTop - 2, bounds.right, fillTop + 18),
        highlightPaint,
      );

      canvas.restore();
    }

    // ── Heart stroke ──
    canvas.drawPath(heart, outlinePaint);

    // ── Glossy highlight on top-left of heart ──
    canvas.save();
    canvas.clipPath(heart);
    final glossPaint = Paint()
      ..shader = RadialGradient(
        center: const Alignment(-0.35, -0.5),
        radius: 0.5,
        colors: [
          Colors.white.withValues(alpha: 0.13),
          Colors.transparent,
        ],
      ).createShader(bounds);
    canvas.drawRect(bounds, glossPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _HeartPainter oldDelegate) =>
      oldDelegate.fillLevel != fillLevel || oldDelegate.wavePhase != wavePhase;
}

// ────────────────────────────────────────────────────────────────────────────
// Heart Glow Painter — subtle red glow that intensifies on each beat
// ────────────────────────────────────────────────────────────────────────────

class _HeartGlowPainter extends CustomPainter {
  final double opacity;

  _HeartGlowPainter({required this.opacity});

  @override
  void paint(Canvas canvas, Size size) {
    if (opacity <= 0) return;

    final center = Offset(size.width / 2, size.height / 2);
    final paint = Paint()
      ..shader = RadialGradient(
        colors: [
          const Color(0xFFE53935).withValues(alpha: opacity.clamp(0.0, 1.0) * 0.35),
          Colors.transparent,
        ],
        stops: const [0.3, 1.0],
      ).createShader(
        Rect.fromCircle(center: center, radius: size.width * 0.6),
      );

    canvas.drawCircle(center, size.width * 0.6, paint);
  }

  @override
  bool shouldRepaint(covariant _HeartGlowPainter oldDelegate) =>
      oldDelegate.opacity != opacity;
}
