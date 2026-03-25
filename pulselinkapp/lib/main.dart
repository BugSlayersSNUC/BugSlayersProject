import 'package:flutter/material.dart';
import 'screens/app_shell.dart';

void main() {
  runApp(const PulseLinkApp());
}

class PulseLinkApp extends StatelessWidget {
  const PulseLinkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PulseLink',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0D0D0D),
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFFE53935),
          secondary: const Color(0xFFB71C1C),
          surface: const Color(0xFF1A1A1A),
        ),
        fontFamily: 'Roboto',
      ),
      home: const AppShell(),
    );
  }
}
