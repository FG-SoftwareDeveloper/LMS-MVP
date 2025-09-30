// Flutter Mobile Development course content
export const flutterContent: { [key: string]: any } = {
  "flutter-introduction": {
    id: "flutter-introduction",
    title: "Introduction to Flutter",
    type: "text",
    duration: 20,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to Flutter Development!",
        content: "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. With Flutter, you can create stunning apps that work seamlessly across platforms."
      },
      {
        id: "what-is-flutter",
        type: "text",
        title: "What is Flutter?",
        content: "Flutter offers powerful advantages for mobile development:\n\n📱 **Cross-Platform**: One codebase for iOS, Android, web, and desktop\n⚡ **Fast Development**: Hot reload for instant updates\n🎨 **Beautiful UIs**: Rich set of widgets and animations\n🚀 **High Performance**: Compiled to native ARM code\n💼 **Industry Adoption**: Used by Google, Alibaba, BMW, and more\n🔧 **Rich Ecosystem**: Thousands of packages and plugins\n\n**Flutter vs Native Development:**\n• Faster development cycle\n• Consistent UI across platforms\n• Single team can build for multiple platforms\n• Shared business logic and state management"
      },
      {
        id: "basic-app",
        type: "code",
        title: "Your First Flutter App",
        language: "dart",
        content: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'My First Flutter App',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      home: HomePage(),\n    );\n  }\n}\n\nclass HomePage extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Welcome to Flutter'),\n        backgroundColor: Colors.blue,\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Icon(\n              Icons.flutter_dash,\n              size: 100,\n              color: Colors.blue,\n            ),\n            SizedBox(height: 20),\n            Text(\n              'Hello, Flutter!',\n              style: TextStyle(\n                fontSize: 24,\n                fontWeight: FontWeight.bold,\n              ),\n            ),\n            SizedBox(height: 10),\n            Text(\n              'Your first cross-platform app',\n              style: TextStyle(\n                fontSize: 16,\n                color: Colors.grey[600],\n              ),\n            ),\n          ],\n        ),\n      ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: () {\n          print('Button pressed!');\n        },\n        child: Icon(Icons.add),\n      ),\n    );\n  }\n}"
      },
      {
        id: "why-flutter",
        type: "text",
        title: "Why Choose Flutter?",
        content: "**Flutter Advantages:**\n\n🔥 **Hot Reload**: See changes instantly without losing app state\n🎯 **Single Codebase**: Write once, run everywhere\n💰 **Cost Effective**: Reduce development time and team size\n🎨 **Custom UI**: Create pixel-perfect designs\n📈 **Growing Ecosystem**: 20,000+ packages on pub.dev\n\n**Popular Apps Built with Flutter:**\n• Google Ads\n• Alibaba Xianyu\n• BMW ConnectedDrive\n• eBay Motors\n• Reflectly\n• Hamilton Musical\n\n**Career Opportunities:**\n• Flutter Developer\n• Mobile App Developer\n• Cross-Platform Developer\n• UI/UX Developer\n• Full-Stack Mobile Developer\n\nFlutter developers are in high demand with excellent salary prospects!"
      }
    ]
  },
  "widgets-and-layouts": {
    id: "widgets-and-layouts",
    title: "Widgets and Layouts",
    type: "text",
    duration: 30,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Understanding Flutter Widgets",
        content: "In Flutter, everything is a widget. Widgets are the building blocks of Flutter apps - from layout structures like rows and columns to interactive elements like buttons and text fields."
      },
      {
        id: "basic-widgets",
        type: "code",
        title: "Essential Flutter Widgets",
        language: "dart",
        content: "import 'package:flutter/material.dart';\n\nclass WidgetShowcase extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Flutter Widgets'),\n      ),\n      body: SingleChildScrollView(\n        padding: EdgeInsets.all(16),\n        child: Column(\n          crossAxisAlignment: CrossAxisAlignment.start,\n          children: [\n            // Text Widgets\n            Text(\n              'Welcome to Flutter!',\n              style: TextStyle(\n                fontSize: 24,\n                fontWeight: FontWeight.bold,\n                color: Colors.blue,\n              ),\n            ),\n            SizedBox(height: 16),\n            \n            // Container with decoration\n            Container(\n              width: double.infinity,\n              padding: EdgeInsets.all(16),\n              decoration: BoxDecoration(\n                color: Colors.blue[50],\n                borderRadius: BorderRadius.circular(12),\n                border: Border.all(color: Colors.blue, width: 2),\n              ),\n              child: Text('This is a decorated container'),\n            ),\n            SizedBox(height: 16),\n            \n            // Row with icons\n            Row(\n              mainAxisAlignment: MainAxisAlignment.spaceEvenly,\n              children: [\n                Icon(Icons.home, size: 40, color: Colors.green),\n                Icon(Icons.star, size: 40, color: Colors.orange),\n                Icon(Icons.favorite, size: 40, color: Colors.red),\n              ],\n            ),\n            SizedBox(height: 16),\n            \n            // Elevated Button\n            ElevatedButton(\n              onPressed: () {\n                print('Button pressed!');\n              },\n              style: ElevatedButton.styleFrom(\n                backgroundColor: Colors.purple,\n                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),\n              ),\n              child: Text('Tap Me'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}"
      }
    ]
  }
};

// Function to get Flutter course content
export const getFlutterContent = () => flutterContent;