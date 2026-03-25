import 'package:flutter_test/flutter_test.dart';
import 'package:pulselinkapp/main.dart';

void main() {
  testWidgets('PulseLink app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const PulseLinkApp());
    // Verify the app renders the PulseLink title
    expect(find.text('PulseLink'), findsOneWidget);
  });
}
