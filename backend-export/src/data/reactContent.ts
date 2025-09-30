// React Development Masterclass lesson content
export const reactContent: { [key: string]: any } = {
  "what-is-react": {
    id: "what-is-react",
    title: "What is React?",
    type: "text",
    duration: 20,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to React Development!",
        content: "React is a powerful JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta) in 2013, React has revolutionized front-end development and become one of the most popular frameworks in the world."
      },
      {
        id: "what-is-react",
        type: "text",
        title: "What is React?",
        content: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Key features include:\n\n• **Component-Based Architecture**: Build encapsulated components that manage their own state\n• **Virtual DOM**: Efficient re-rendering through a virtual representation of the DOM\n• **Declarative Programming**: Describe what your UI should look like, React handles the how\n• **Learn Once, Write Anywhere**: Use React for web, mobile (React Native), and even desktop apps\n\nReact makes it painless to create interactive UIs by updating and rendering components efficiently when data changes."
      },
      {
        id: "example",
        type: "code",
        title: "Your First React Component",
        language: "jsx",
        content: "// A simple React functional component\nimport React from 'react';\n\nfunction Welcome({ name }) {\n  return (\n    <div className=\"welcome-container\">\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to the world of React development!</p>\n    </div>\n  );\n}\n\n// Using the component\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Developer\" />\n      <Welcome name=\"React Learner\" />\n    </div>\n  );\n}\n\nexport default App;"
      },
      {
        id: "why-learn",
        type: "text",
        title: "Why Learn React?",
        content: "React opens up incredible opportunities in modern web development:\n\n🚀 **Industry Standard**: Used by top companies like Facebook, Netflix, Airbnb, and Uber\n⚡ **High Performance**: Virtual DOM ensures fast and efficient updates\n🔧 **Rich Ecosystem**: Massive community with thousands of libraries and tools\n📱 **Cross-Platform**: React skills transfer to React Native for mobile development\n💼 **Career Growth**: High demand for React developers with excellent salary potential\n🎯 **Modern Development**: Component-based thinking improves code organization and reusability\n\nMaster React and become a sought-after front-end developer in today's tech landscape!"
      }
    ]
  },
  "react-setup": {
    id: "react-setup",
    title: "Setting Up Your React Development Environment",
    type: "text",
    duration: 25,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Getting Your React Environment Ready",
        content: "Before diving into React development, let's set up a professional development environment. We'll cover everything from Node.js installation to creating your first React application."
      },
      {
        id: "prerequisites",
        type: "text",
        title: "Prerequisites",
        content: "To develop with React, you'll need:\n\n• **Node.js** (version 14 or higher) - JavaScript runtime for running development tools\n• **npm or yarn** - Package managers (npm comes with Node.js)\n• **Code Editor** - VS Code is highly recommended\n• **Modern Browser** - Chrome, Firefox, or Edge with developer tools"
      },
      {
        id: "node-install",
        type: "text",
        title: "Installing Node.js",
        content: "1. Visit [nodejs.org](https://nodejs.org/)\n2. Download the LTS (Long Term Support) version\n3. Run the installer and follow the setup wizard\n4. Verify installation by opening terminal and running:\n\n```\nnode --version\nnpm --version\n```\n\nYou should see version numbers for both commands."
      },
      {
        id: "create-app",
        type: "code",
        title: "Creating Your First React App",
        language: "bash",
        content: "# Create a new React application\nnpx create-react-app my-react-app\n\n# Navigate to the project directory\ncd my-react-app\n\n# Start the development server\nnpm start\n\n# Your app will open at http://localhost:3000"
      },
      {
        id: "project-structure",
        type: "text",
        title: "Understanding the Project Structure",
        content: "Your new React app comes with this structure:\n\n```\nmy-react-app/\n├── public/\n│   ├── index.html          # Main HTML file\n│   └── favicon.ico         # App icon\n├── src/\n│   ├── App.js              # Main component\n│   ├── App.css             # App styles\n│   ├── index.js            # Entry point\n│   └── index.css           # Global styles\n├── package.json            # Dependencies and scripts\n└── README.md               # Project documentation\n```\n\nThe `src` folder is where you'll spend most of your time writing React code!"
      },
      {
        id: "dev-tools",
        type: "text",
        title: "Essential Development Tools",
        content: "**VS Code Extensions for React:**\n• ES7+ React/Redux/React-Native snippets\n• Bracket Pair Colorizer\n• Auto Rename Tag\n• Prettier - Code formatter\n• Thunder Client (for API testing)\n\n**Browser Extensions:**\n• React Developer Tools (Chrome/Firefox)\n• Redux DevTools (for state management)\n\nThese tools will dramatically improve your React development experience!"
      }
    ]
  },
  "components-and-jsx": {
    id: "components-and-jsx",
    title: "Components and JSX",
    type: "text",
    duration: 30,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Understanding React Components",
        content: "Components are the building blocks of React applications. Think of them as custom HTML elements that you can create, reuse, and compose together to build complex user interfaces. Every React app is essentially a tree of components."
      },
      {
        id: "jsx-intro",
        type: "text",
        title: "What is JSX?",
        content: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code inside your JavaScript files. It makes React components more readable and easier to write.\n\n**Key JSX Rules:**\n• Must return a single parent element (or Fragment)\n• Use `className` instead of `class`\n• Use camelCase for HTML attributes (e.g., `onClick`, `onChange`)\n• Self-closing tags must end with `/` (e.g., `<img />`, `<br />`)\n• JavaScript expressions go inside curly braces `{}`"
      },
      {
        id: "functional-component",
        type: "code",
        title: "Functional Components",
        language: "jsx",
        content: "// Modern React uses functional components\nimport React from 'react';\n\n// Simple functional component\nfunction Greeting() {\n  return <h1>Hello, World!</h1>;\n}\n\n// Component with props\nfunction UserCard({ name, email, avatar }) {\n  return (\n    <div className=\"user-card\">\n      <img src={avatar} alt={`${name}'s avatar`} />\n      <h2>{name}</h2>\n      <p>{email}</p>\n    </div>\n  );\n}\n\n// Arrow function component\nconst Button = ({ text, onClick, variant = 'primary' }) => {\n  return (\n    <button \n      className={`btn btn-${variant}`}\n      onClick={onClick}\n    >\n      {text}\n    </button>\n  );\n};\n\nexport { Greeting, UserCard, Button };"
      },
      {
        id: "jsx-expressions",
        type: "code",
        title: "JavaScript Expressions in JSX",
        language: "jsx",
        content: "import React from 'react';\n\nfunction ExpressionExamples() {\n  const user = {\n    name: 'Sarah Connor',\n    age: 35,\n    isActive: true\n  };\n  \n  const items = ['React', 'Vue', 'Angular'];\n  \n  return (\n    <div>\n      {/* Variables */}\n      <h1>Welcome, {user.name}!</h1>\n      \n      {/* Expressions */}\n      <p>You are {user.age >= 18 ? 'an adult' : 'a minor'}</p>\n      \n      {/* Conditional rendering */}\n      {user.isActive && <span className=\"active-badge\">Online</span>}\n      \n      {/* Lists */}\n      <ul>\n        {items.map((item, index) => (\n          <li key={index}>{item}</li>\n        ))}\n      </ul>\n      \n      {/* Function calls */}\n      <p>Current time: {new Date().toLocaleTimeString()}</p>\n    </div>\n  );\n}\n\nexport default ExpressionExamples;"
      },
      {
        id: "component-composition",
        type: "code",
        title: "Component Composition",
        language: "jsx",
        content: "import React from 'react';\n\n// Child components\nfunction Header({ title }) {\n  return (\n    <header className=\"app-header\">\n      <h1>{title}</h1>\n    </header>\n  );\n}\n\nfunction Sidebar({ links }) {\n  return (\n    <aside className=\"sidebar\">\n      <nav>\n        {links.map(link => (\n          <a key={link.id} href={link.url}>\n            {link.text}\n          </a>\n        ))}\n      </nav>\n    </aside>\n  );\n}\n\nfunction MainContent({ children }) {\n  return (\n    <main className=\"main-content\">\n      {children}\n    </main>\n  );\n}\n\n// Parent component composing children\nfunction App() {\n  const navigationLinks = [\n    { id: 1, url: '/home', text: 'Home' },\n    { id: 2, url: '/about', text: 'About' },\n    { id: 3, url: '/contact', text: 'Contact' }\n  ];\n  \n  return (\n    <div className=\"app\">\n      <Header title=\"My React App\" />\n      <div className=\"app-body\">\n        <Sidebar links={navigationLinks} />\n        <MainContent>\n          <h2>Welcome to React!</h2>\n          <p>This content is passed as children.</p>\n        </MainContent>\n      </div>\n    </div>\n  );\n}\n\nexport default App;"
      },
      {
        id: "best-practices",
        type: "text",
        title: "Component Best Practices",
        content: "**Naming Conventions:**\n• Component names must start with a capital letter\n• Use PascalCase for component names (e.g., `UserProfile`, `ShoppingCart`)\n• Use descriptive names that explain what the component does\n\n**Component Structure:**\n• Keep components small and focused on a single responsibility\n• Extract logic into custom hooks when components get complex\n• Use props to make components reusable\n• Avoid deep nesting - flatten your component tree when possible\n\n**File Organization:**\n• One component per file\n• Name files after the component (e.g., `UserCard.jsx`)\n• Group related components in folders\n• Use index.js files for cleaner imports"
      }
    ]
  }
};

// Function to get React course content
export const getReactContent = () => reactContent;