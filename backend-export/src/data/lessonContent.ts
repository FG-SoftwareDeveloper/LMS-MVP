// Sample lesson content for JavaScript Fundamentals course
export const lessonContent: { [key: string]: any } = {
  "what-is-javascript": {
    id: "what-is-javascript",
    title: "What is JavaScript?",
    type: "text",
    duration: 15,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to JavaScript!",
        content: "JavaScript is one of the most popular and versatile programming languages in the world. Originally created in 1995 by Brendan Eich at Netscape, JavaScript has evolved from a simple scripting language for web pages into a powerful, full-stack programming language."
      },
      {
        id: "what-is-js",
        type: "text",
        title: "What is JavaScript?",
        content: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's characterized by:\n\n• Dynamic typing\n• First-class functions\n• Prototype-based object-orientation\n• Event-driven programming\n\nToday, JavaScript runs everywhere - in web browsers, on servers (Node.js), in mobile apps, desktop applications, and even in IoT devices."
      },
      {
        id: "example",
        type: "code",
        title: "Your First JavaScript Code",
        language: "javascript",
        content: "// This is a simple JavaScript example\nconsole.log('Hello, World!');\n\n// Variables and basic operations\nlet name = 'JavaScript';\nlet year = 2023;\nlet message = `Welcome to ${name} programming!`;\n\nconsole.log(message);"
      },
      {
        id: "why-learn",
        type: "text",
        title: "Why Learn JavaScript?",
        content: "Learning JavaScript opens up incredible opportunities:\n\n🌐 **Web Development**: Build interactive websites and web applications\n🖥️ **Backend Development**: Create servers and APIs with Node.js\n📱 **Mobile Apps**: Develop cross-platform mobile apps with React Native\n🖨️ **Desktop Apps**: Build desktop applications with Electron\n🤖 **Automation**: Automate tasks and build bots\n\nWith JavaScript, you can become a full-stack developer with just one language!"
      }
    ]
  },
  "setup-environment": {
    id: "setup-environment",
    title: "Setting Up Your Development Environment",
    type: "text",
    duration: 20,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Getting Ready to Code",
        content: "Before we start writing JavaScript, let's set up a proper development environment. You'll need a few essential tools to become productive."
      },
      {
        id: "browser",
        type: "text",
        title: "1. A Modern Web Browser",
        content: "Any modern browser works: Chrome, Firefox, Safari, or Edge. We recommend Chrome or Firefox for their excellent developer tools."
      },
      {
        id: "code-editor",
        type: "text",
        title: "2. A Code Editor",
        content: "While you can write JavaScript in any text editor, a dedicated code editor makes your life much easier. We strongly recommend Visual Studio Code (VS Code) - it's free, powerful, and has excellent JavaScript support."
      },
      {
        id: "browser-devtools",
        type: "text",
        title: "3. Browser Developer Tools",
        content: "Every modern browser includes powerful developer tools that let you run JavaScript, debug code, and inspect web pages. Let's learn how to access them."
      },
      {
        id: "devtools-demo",
        type: "code",
        title: "Try This: Open Developer Tools",
        language: "javascript",
        content: "// 1. Open your browser\n// 2. Press F12 (or Ctrl+Shift+I on Windows, Cmd+Option+I on Mac)\n// 3. Click on the 'Console' tab\n// 4. Type this code and press Enter:\n\nconsole.log('Hello from the browser console!');\n\n// You should see the message appear in the console!"
      }
    ]
  },
  "first-program": {
    id: "first-program",
    title: "Your First JavaScript Program",
    type: "text",
    duration: 25,
    content: [
      {
        id: "intro",
        type: "text",
        title: "The Traditional 'Hello, World!' Program",
        content: "Every programming journey begins with a 'Hello, World!' program. It's a simple program that displays the text 'Hello, World!' - proving that you can write and run code successfully."
      },
      {
        id: "basic-syntax",
        type: "code",
        title: "Basic JavaScript Syntax",
        language: "javascript",
        content: "// This is a comment - it's ignored by JavaScript\n// Comments help explain what your code does\n\n// Display a message in the browser console\nconsole.log('Hello, World!');\n\n// Display a popup alert\nalert('Hello, World!');\n\n// You can also store messages in variables\nvar message = 'Hello, JavaScript!';\nconsole.log(message);"
      },
      {
        id: "syntax-rules",
        type: "text",
        title: "JavaScript Syntax Rules",
        content: "JavaScript has some important syntax rules:\n\n• Statements usually end with semicolons (;)\n• Strings (text) must be enclosed in quotes\n• JavaScript is case-sensitive (hello ≠ Hello)\n• Use // for single-line comments\n• Use /* */ for multi-line comments"
      },
      {
        id: "variables",
        type: "code",
        title: "Working with Variables",
        language: "javascript",
        content: "// Variables store data for later use\n// There are three ways to declare variables in JavaScript:\n\n// let - for variables that can change\nlet userName = 'Alice';\nlet age = 25;\n\n// const - for values that won't change\nconst pi = 3.14159;\nconst siteName = 'My Awesome Website';\n\n// var - older way (still works, but let is preferred)\nvar oldStyle = 'This works but use let instead';\n\n// Display the variables\nconsole.log('User:', userName);\nconsole.log('Age:', age);\nconsole.log('Pi:', pi);"
      },
      {
        id: "workspace",
        type: "text",
        title: "Launch Your Coding Workspace",
        content: "Use the \"Launch coding workspace\" panel below to open a ready-to-run StackBlitz project for this assignment. Follow the checklist in TASKS.md, run npm test to watch the Vitest suite, and push your finished work to GitHub when everything passes."
      }
    ]
  },
  "variables-and-types": {
    id: "variables-and-types",
    title: "Variables and Types",
    type: "text",
    duration: 25,
    content: [
      {
        id: "variables-overview",
        type: "text",
        title: "Declaring Variables with let and const",
        content: "Use const for values that never change and let for values that do. Avoid var in modern JavaScript because it ignores block scope and can introduce bugs."
      },
      {
        id: "variables-example",
        type: "code",
        title: "Variables in Practice",
        language: "javascript",
        content: "const platformName = 'LearnHub';\nlet enrolledStudents = 1200;\n\nenrolledStudents += 45; // student count updates\n\nconsole.log(platformName, enrolledStudents);"
      },
      {
        id: "types-overview",
        type: "text",
        title: "Understanding JavaScript Types",
        content: "Primitive types include string, number, boolean, null, undefined, symbol, and bigint. Non-primitive types such as objects, arrays, and functions hold references and can store complex data."
      }
    ]
  },
  "operators-and-expressions": {
    id: "operators-and-expressions",
    title: "Operators and Expressions",
    type: "text",
    duration: 20,
    content: [
      {
        id: "operators-overview",
        type: "text",
        title: "Operator Categories",
        content: "JavaScript offers arithmetic (+, -, *, /, %), assignment (=, +=, -=), comparison (===, !==, >, <), logical (&&, ||, !), and nullish coalescing (??) operators." 
      },
      {
        id: "expressions-example",
        type: "code",
        title: "Expressions in Action",
        language: "javascript",
        content: "const completionRate = completedLessons / totalLessons;\nconst isPassing = completionRate >= 0.7;\nconst status = isPassing ? 'On Track' : 'Needs Review';\n\nconsole.log({ completionRate, isPassing, status });"
      },
      {
        id: "equality",
        type: "text",
        title: "Strict Equality",
        content: "Always prefer === and !== for equality checks. They compare both value and type, preventing unexpected coercion." 
      }
    ]
  },
  "statements-and-control-flow": {
    id: "statements-and-control-flow",
    title: "Statements and Control Flow",
    type: "text",
    duration: 25,
    content: [
      {
        id: "control-flow-overview",
        type: "text",
        title: "Directing Program Execution",
        content: "Statements execute instructions while control-flow statements such as if/else, switch, for, while, and break/continue determine how code runs."
      },
      {
        id: "control-flow-example",
        type: "code",
        title: "Control Flow Examples",
        language: "javascript",
        content: "if (score >= 80) {\n  console.log('Gold Badge');\n} else if (score >= 50) {\n  console.log('Silver Badge');\n} else {\n  console.log('Keep practicing');\n}\n\nfor (const lesson of modules) {\n  console.log(lesson.title);\n}\n\nlet attempts = 0;\nwhile (attempts < 3) {\n  reviewLesson();\n  attempts++;\n}"
      },
      {
        id: "switch-overview",
        type: "text",
        title: "Using switch",
        content: "Use switch when comparing the same value against many discrete options. Always provide a default case."
      }
    ]
  },
  "scope-and-hoisting": {
    id: "scope-and-hoisting",
    title: "Scope and Hoisting",
    type: "text",
    duration: 20,
    content: [
      {
        id: "scope-overview",
        type: "text",
        title: "Block and Function Scope",
        content: "let and const are block scoped, meaning they exist only within the nearest set of braces. Functions introduce a new scope; variables declared inside are hidden from the outside."
      },
      {
        id: "scope-example",
        type: "code",
        title: "Scope in Practice",
        language: "javascript",
        content: "function enrollStudent() {\n  const status = 'enrolled';\n  if (status === 'enrolled') {\n    let message = 'Welcome to the course!';\n    console.log(message);\n  }\n  // message is not defined out here\n}\n\nlet count = 1;\n{\n  let count = 2; // different variable\n}\n\nconsole.log(count); // 1"
      },
      {
        id: "hoisting-overview",
        type: "text",
        title: "Understanding Hoisting",
        content: "Declarations are hoisted to the top of their scope. let and const are hoisted but remain in the temporal dead zone until initialized; accessing them beforehand throws a ReferenceError."
      }
    ]
  },
  "strict-mode": {
    id: "strict-mode",
    title: "Strict Mode",
    type: "text",
    duration: 15,
    content: [
      {
        id: "strict-mode-intro",
        type: "text",
        title: "Why Strict Mode Matters",
        content: "Strict mode opts into a safer subset of JavaScript. It prevents accidental globals, disallows duplicate parameter names, and throws errors for silent failures."
      },
      {
        id: "strict-mode-example",
        type: "code",
        title: "Enabling Strict Mode",
        language: "javascript",
        content: "'use strict';\n\nfunction startCourse() {\n  courseTitle = 'JavaScript Fundamentals'; // ReferenceError in strict mode\n}\n\nconst courseConfig = Object.freeze({ title: 'JS Fundamentals' });\n// courseConfig.title = 'New Title'; // TypeError"
      },
      {
        id: "strict-mode-notes",
        type: "text",
        title: "Module Behavior",
        content: "ES modules run in strict mode by default. You can enable strict mode per file or per function in classic scripts by placing 'use strict'; at the top."
      }
    ]
  },
  "closures-in-practice": {
    id: "closures-in-practice",
    title: "Closures & Private State Patterns",
    type: "text",
    duration: 25,
    content: [
      {
        id: "closure-concept",
        type: "text",
        title: "How Closures Work",
        content: "Closures capture variables from their lexical scope, letting inner functions remember and access outer-scope variables even after the outer function has finished executing."
      },
      {
        id: "closure-example",
        type: "code",
        title: "Module Pattern with Closures",
        language: "javascript",
        content: "function createCounter() {\n  let value = 0;\n  return {\n    increment() {\n      value++;\n      return value;\n    },\n    reset() {\n      value = 0;\n    }\n  };\n}\n\nconst counter = createCounter();\ncounter.increment(); // 1\ncounter.increment(); // 2\n// value is private — only accessible through the returned methods"
      },
      {
        id: "closure-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "React hooks (useState, useReducer) rely on closures to hold component state across renders. Middleware libraries also use closures to keep configuration and share it across invocations."
      }
    ]
  },
  "prototypes-and-this": {
    id: "prototypes-and-this",
    title: "Prototypal Inheritance & this Binding",
    type: "text",
    duration: 25,
    content: [
      {
        id: "prototype-overview",
        type: "text",
        title: "Delegation Through Prototypes",
        content: "Every object has an internal prototype pointer (\"[[Prototype]]\") that enables property lookup delegation. Constructor functions and classes set up prototype chains for shared behavior."
      },
      {
        id: "this-binding",
        type: "code",
        title: "this in Practice",
        language: "javascript",
        content: "const course = {\n  title: 'JavaScript Fundamentals',\n  getTitle() {\n    return this.title;\n  }\n};\n\nconst loose = course.getTitle;\nconsole.log(loose()); // undefined (this is window/global)\nconsole.log(loose.call(course)); // 'JavaScript Fundamentals'\n\nconst arrow = {\n  title: 'Arrow Example',\n  get: () => this.title\n};\nconsole.log(arrow.get()); // inherits this from surrounding scope"
      },
      {
        id: "prototype-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Understanding prototypes clarifies how frameworks extend built-ins (e.g., Express response objects) and how class-based components in React function under the hood."
      }
    ]
  },
  "event-loop-basics": {
    id: "event-loop-basics",
    title: "Event Loop, Call Stack & Async Foundations",
    type: "text",
    duration: 30,
    content: [
      {
        id: "event-loop-overview",
        type: "text",
        title: "Visualizing the Event Loop",
        content: "The JavaScript runtime executes synchronously on the call stack and processes asynchronous work using task queues. Microtasks (Promises) run before the browser repaints, while macrotasks (setTimeout) run afterward."
      },
      {
        id: "event-loop-demo",
        type: "code",
        title: "Ordering Example",
        language: "javascript",
        content: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n// Output: A, D, C, B"
      },
      {
        id: "event-loop-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Understanding the event loop helps debug UI updates, API race conditions, and performance issues in single-page apps."
      }
    ]
  },
  "higher-order-functions": {
    id: "higher-order-functions",
    title: "Higher-Order Functions & Array Utilities",
    type: "text",
    duration: 25,
    content: [
      {
        id: "hof-overview",
        type: "text",
        title: "Functions as Values",
        content: "Higher-order functions accept functions as arguments or return them. The array trio — map, filter, reduce — form the foundation of functional pipelines."
      },
      {
        id: "hof-example",
        type: "code",
        title: "Transforming Data",
        language: "javascript",
        content: "const lessons = [\n  { title: 'Closures', duration: 20 },\n  { title: 'Async', duration: 30 }\n];\n\nconst overTwenty = lessons\n  .filter(lesson => lesson.duration > 20)\n  .map(lesson => lesson.title.toUpperCase());\n\nconst total = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);\nconsole.log({ overTwenty, total });"
      },
      {
        id: "hof-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Redux reducers and RxJS streams rely heavily on higher-order functions, as do data transformation layers in analytics dashboards."
      }
    ]
  },
  "modern-es-features": {
    id: "modern-es-features",
    title: "Modern ES6+ Features",
    type: "text",
    duration: 25,
    content: [
      {
        id: "es6-overview",
        type: "text",
        title: "Language Enhancements",
        content: "Destructuring, spread/rest operators, template literals, optional chaining, and modules simplify state updates and API responses."
      },
      {
        id: "es6-example",
        type: "code",
        title: "Practical ES6",
        language: "javascript",
        content: "const course = { title: 'JS Fundamentals', stats: { rating: 4.8, students: 1500 } };\nconst { title, stats: { rating } } = course;\n\nconst tags = ['javascript', 'frontend'];\nconst extended = [...tags, 'career'];\n\nconst message = `${title} has a rating of ${rating}`;\nconsole.log({ extended, message });"
      },
      {
        id: "es6-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Modern frameworks, lint rules, and interview questions assume proficiency with ES6+ syntax to keep code concise and maintainable."
      }
    ]
  },
  "callbacks-and-promises": {
    id: "callbacks-and-promises",
    title: "Callbacks, Promises & async/await",
    type: "text",
    duration: 30,
    content: [
      {
        id: "async-patterns",
        type: "text",
        title: "Evolution of Async Patterns",
        content: "Callbacks execute after asynchronous work completes, Promises formalize success/failure channels, and async/await offers synchronous-style syntax on top of Promises."
      },
      {
        id: "async-example",
        type: "code",
        title: "Refactoring to async/await",
        language: "javascript",
        content: "function fetchCourse(id) {\n  return fetch(`/api/courses/${id}`).then(res => res.json());\n}\n\nasync function loadCourse(id) {\n  try {\n    const course = await fetchCourse(id);\n    console.log(course.title);\n  } catch (err) {\n    console.error('Failed to load course', err);\n  }\n}"
      },
      {
        id: "async-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Interviewers often evaluate whether you can reason about callback hell, promise chaining, and async/await conversions without blocking the event loop."
      }
    ]
  },
  "async-error-handling": {
    id: "async-error-handling",
    title: "Error Handling in Async Code",
    type: "text",
    duration: 25,
    content: [
      {
        id: "error-strategies",
        type: "text",
        title: "Strategies for Reliability",
        content: "Combine try/catch with re-throws, .catch handlers, and fallback values so network failures or timeouts degrade gracefully."
      },
      {
        id: "error-example",
        type: "code",
        title: "Centralized Error Wrapper",
        language: "javascript",
        content: "const withErrorBoundary = handler => async (...args) => {\n  try {\n    return await handler(...args);\n  } catch (error) {\n    console.error('Async failure', error);\n    throw error;\n  }\n};\n\nconst fetchProfile = withErrorBoundary(async userId => {\n  const res = await fetch(`/api/users/${userId}`);\n  if (!res.ok) throw new Error('Network error');\n  return res.json();\n});"
      },
      {
        id: "error-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Robust async error handling prevents blank screens when APIs fail and is critical in Node services where unhandled rejections crash processes."
      }
    ]
  },
  "parallel-vs-sequential": {
    id: "parallel-vs-sequential",
    title: "Parallel vs Sequential Execution",
    type: "text",
    duration: 25,
    content: [
      {
        id: "parallel-overview",
        type: "text",
        title: "Coordinating Promises",
        content: "Promise.all runs tasks in parallel and rejects fast, allSettled waits for every outcome, race resolves the first settled promise, and any succeeds on the first fulfillment."
      },
      {
        id: "parallel-example",
        type: "code",
        title: "Fetching Resources Together",
        language: "javascript",
        content: "async function loadDashboard() {\n  const [profile, courses] = await Promise.all([\n    fetch('/api/profile').then(r => r.json()),\n    fetch('/api/courses').then(r => r.json())\n  ]);\n  return { profile, courses };\n}\n\nasync function loadWithFallback() {\n  const result = await Promise.any([\n    fetch('/api/cache').then(r => r.json()),\n    fetch('/api/live').then(r => r.json())\n  ]);\n  return result;\n}"
      },
      {
        id: "parallel-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Front-end dashboards often fetch multiple widgets simultaneously. Knowing the difference between parallel and sequential flows prevents unnecessary latency."
      }
    ]
  },
  "dom-manipulation": {
    id: "dom-manipulation",
    title: "DOM Selection & Manipulation",
    type: "text",
    duration: 25,
    content: [
      {
        id: "dom-overview",
        type: "text",
        title: "Finding Elements",
        content: "Use querySelector/querySelectorAll for CSS-style selection, and manipulate textContent, innerHTML, and classList to update the UI."
      },
      {
        id: "dom-example",
        type: "code",
        title: "Reusable Render Function",
        language: "javascript",
        content: "function renderNotification(message) {\n  const container = document.querySelector('#notifications');\n  const item = document.createElement('li');\n  item.classList.add('notification');\n  item.textContent = message;\n  container.appendChild(item);\n}\n\nrenderNotification('Welcome back!');"
      },
      {
        id: "dom-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Direct DOM work remains essential for progressive enhancement, browser extensions, and understanding how frameworks diff and update the DOM."
      }
    ]
  },
  "dom-events": {
    id: "dom-events",
    title: "Event Handling & Delegation",
    type: "text",
    duration: 25,
    content: [
      {
        id: "events-overview",
        type: "text",
        title: "Event Propagation",
        content: "Events flow from capture to target to bubble. Event delegation attaches one listener to a parent and inspects event.target for efficiency."
      },
      {
        id: "events-example",
        type: "code",
        title: "Delegated Click Handler",
        language: "javascript",
        content: "document.querySelector('#course-list').addEventListener('click', event => {\n  if (!event.target.matches('[data-course-id]')) return;\n  const id = event.target.dataset.courseId;\n  console.log('Open course', id);\n});"
      },
      {
        id: "events-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Event delegation keeps large lists responsive (e.g., chat apps, notifications) without attaching thousands of listeners."
      }
    ]
  },
  "web-storage": {
    id: "web-storage",
    title: "LocalStorage, SessionStorage & Cookies",
    type: "text",
    duration: 20,
    content: [
      {
        id: "storage-overview",
        type: "text",
        title: "Choosing a Storage Mechanism",
        content: "localStorage persists indefinitely, sessionStorage clears per tab session, and cookies support server access with expiration and secure flags."
      },
      {
        id: "storage-example",
        type: "code",
        title: "Persisting Preferences",
        language: "javascript",
        content: "const THEME_KEY = 'learnhub-theme';\n\nexport function saveTheme(theme) {\n  localStorage.setItem(THEME_KEY, theme);\n}\n\nexport function loadTheme() {\n  return localStorage.getItem(THEME_KEY) ?? 'light';\n}"
      },
      {
        id: "storage-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Persisting auth tokens, dark mode preferences, and onboarding checklists relies on choosing the right browser storage API."
      }
    ]
  },
  "fetch-and-xhr": {
    id: "fetch-and-xhr",
    title: "Networking with Fetch & XHR",
    type: "text",
    duration: 25,
    content: [
      {
        id: "fetch-overview",
        type: "text",
        title: "Modern HTTP Requests",
        content: "fetch returns Promises and supports streaming, AbortController cancellation, and JSON handling. XMLHttpRequest still powers legacy integrations and progress tracking."
      },
      {
        id: "fetch-example",
        type: "code",
        title: "Abortable Fetch",
        language: "javascript",
        content: "const controller = new AbortController();\nconst { signal } = controller;\n\nfetch('/api/search?q=javascript', { signal })\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(error => {\n    if (error.name === 'AbortError') {\n      console.log('Request cancelled');\n    } else {\n      console.error('Request failed', error);\n    }\n  });\n\nsetTimeout(() => controller.abort(), 50);"
      },
      {
        id: "fetch-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Dashboard widgets, autocomplete search, and analytics beacons rely on Fetch APIs. Aborting unused requests prevents slow devices from lagging."
      }
    ]
  },
  "object-oriented-js": {
    id: "object-oriented-js",
    title: "Object-Oriented JavaScript",
    type: "text",
    duration: 25,
    content: [
      {
        id: "oo-overview",
        type: "text",
        title: "Classes and Constructors",
        content: "ES6 classes provide syntactic sugar over prototypes. Constructors initialize state, while extends and super enable inheritance hierarchies."
      },
      {
        id: "oo-example",
        type: "code",
        title: "Component Style Class",
        language: "javascript",
        content: "class DashboardWidget {\n  constructor(type) {\n    this.type = type;\n    this.visible = true;\n  }\n\n  toggle() {\n    this.visible = !this.visible;\n  }\n}\n\nclass CourseList extends DashboardWidget {\n  constructor(courses) {\n    super('courses');\n    this.courses = courses;\n  }\n}\n\nconst widget = new CourseList(['JS', 'React']);\nwidget.toggle();"
      },
      {
        id: "oo-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Legacy React components, UI libraries, and many interview whiteboard questions expect fluency with classes and inheritance."
      }
    ]
  },
  "functional-patterns": {
    id: "functional-patterns",
    title: "Functional Programming Concepts",
    type: "text",
    duration: 25,
    content: [
      {
        id: "fp-overview",
        type: "text",
        title: "Immutability & Pure Functions",
        content: "Pure functions avoid side effects and always return the same output for the same input. Immutability prevents accidental state mutation."
      },
      {
        id: "fp-example",
        type: "code",
        title: "Composing Helpers",
        language: "javascript",
        content: "const toUpper = str => str.toUpperCase();\nconst exclaim = str => `${str}!`;\nconst compose = (...fns) => input => fns.reduceRight((acc, fn) => fn(acc), input);\n\nconst hype = compose(exclaim, toUpper);\nconsole.log(hype('javascript fundamentals'));"
      },
      {
        id: "fp-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Redux reducers, RxJS observables, and functional utility libraries (Ramda, lodash/fp) all encourage immutable patterns for predictable state updates."
      }
    ]
  },
  "arrays-techniques": {
    id: "arrays-techniques",
    title: "Array Patterns & Performance",
    type: "text",
    duration: 25,
    content: [
      {
        id: "array-patterns",
        type: "text",
        title: "Common Techniques",
        content: "Master sliding window, two-pointer, and partitioning patterns to solve interview-style problems efficiently."
      },
      {
        id: "array-example",
        type: "code",
        title: "Sliding Window Maximum",
        language: "javascript",
        content: "function maxSubarray(nums, windowSize) {\n  let best = -Infinity;\n  let current = 0;\n\n  for (let i = 0; i < nums.length; i++) {\n    current += nums[i];\n    if (i >= windowSize) {\n      current -= nums[i - windowSize];\n    }\n    if (i >= windowSize - 1) {\n      best = Math.max(best, current);\n    }\n  }\n\n  return best;\n}"
      },
      {
        id: "array-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Filtering product catalogs, analyzing telemetry streams, and handling time-series data all rely on efficient array traversal."
      }
    ]
  },
  "string-processing": {
    id: "string-processing",
    title: "Working with Strings",
    type: "text",
    duration: 20,
    content: [
      {
        id: "string-overview",
        type: "text",
        title: "Parsing & Transforming",
        content: "Use template literals, regex, split/join, and localeCompare to handle user input, URLs, and formatting."
      },
      {
        id: "string-example",
        type: "code",
        title: "Slugify Helper",
        language: "javascript",
        content: "export function slugify(title) {\n  return title\n    .trim()\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/(^-|-$)/g, '');\n}\n\nslugify('Intro to Closures!'); // 'intro-to-closures'"
      },
      {
        id: "string-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Parsing API payloads, generating slugs, and cleaning CSV imports are day-to-day coding tasks solved with string utilities."
      }
    ]
  },
  "maps-and-sets": {
    id: "maps-and-sets",
    title: "Objects vs Maps vs Sets",
    type: "text",
    duration: 20,
    content: [
      {
        id: "mapset-overview",
        type: "text",
        title: "Choosing the Right Structure",
        content: "Objects suit JSON-like data, Maps maintain insertion order and allow any key type, Sets handle uniqueness, and WeakMap/WeakSet enable memory-safe caches."
      },
      {
        id: "mapset-example",
        type: "code",
        title: "Tracking Online Learners",
        language: "javascript",
        content: "const onlineUsers = new Set();\nonlineUsers.add('sara');\nonlineUsers.add('lee');\nonlineUsers.add('sara');\n\nconst courseLookup = new Map([['js-fundamentals', { title: 'JS Fundamentals' }]]);\n\nconsole.log(onlineUsers.size); // 2\nconsole.log(courseLookup.get('js-fundamentals'));"
      },
      {
        id: "mapset-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Caching API results, deduplicating analytics events, and modeling relationships frequently leverage Maps and Sets."
      }
    ]
  },
  "recursion-and-trees": {
    id: "recursion-and-trees",
    title: "Recursion & Tree Traversal",
    type: "text",
    duration: 25,
    content: [
      {
        id: "recursion-overview",
        type: "text",
        title: "Breaking Problems Down",
        content: "Recursive functions call themselves with smaller inputs until reaching base cases. Tree traversal (pre/post/in-order) applies recursion to hierarchical data."
      },
      {
        id: "recursion-example",
        type: "code",
        title: "Searching a Menu Tree",
        language: "javascript",
        content: "function findItem(tree, id) {\n  for (const node of tree) {\n    if (node.id === id) return node;\n    if (node.children) {\n      const found = findItem(node.children, id);\n      if (found) return found;\n    }\n  }\n  return null;\n}"
      },
      {
        id: "recursion-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "DOM traversal, sitemap generation, and permissions inheritance all benefit from recursive patterns."
      }
    ]
  },
  "sync-vs-async": {
    id: "sync-vs-async",
    title: "Synchronous vs Asynchronous Execution",
    type: "text",
    duration: 20,
    content: [
      {
        id: "sync-overview",
        type: "text",
        title: "Recognizing Blocking Code",
        content: "Long-running loops and synchronous XHR calls block the event loop, freezing UI. Break up work with requestAnimationFrame, setTimeout, or Web Workers."
      },
      {
        id: "sync-example",
        type: "code",
        title: "Chunking Heavy Work",
        language: "javascript",
        content: "function processInChunks(items, chunkSize = 100) {\n  function work(start) {\n    const slice = items.slice(start, start + chunkSize);\n    slice.forEach(processItem);\n    if (start + chunkSize < items.length) {\n      setTimeout(() => work(start + chunkSize), 0);\n    }\n  }\n  work(0);\n}"
      },
      {
        id: "sync-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Understanding sync vs async keeps UI responsive when processing CSV imports or rendering large tables."
      }
    ]
  },
  "macro-vs-microtasks": {
    id: "macro-vs-microtasks",
    title: "Macro vs Microtasks",
    type: "text",
    duration: 25,
    content: [
      {
        id: "task-queues",
        type: "text",
        title: "Scheduling Nuances",
        content: "Microtasks (Promise callbacks, MutationObserver) run before the next repaint. Macrotasks (setTimeout, setInterval, message events) run afterward."
      },
      {
        id: "task-example",
        type: "code",
        title: "Demonstrating Order",
        language: "javascript",
        content: "setTimeout(() => console.log('macro'), 0);\nPromise.resolve().then(() => console.log('micro'));\nqueueMicrotask(() => console.log('queueMicrotask'));\nconsole.log('sync');\n// Output: sync, micro, queueMicrotask, macro"
      },
      {
        id: "task-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Coordinating animation frames, state updates, and batched DOM work requires understanding task ordering to avoid flickers and race conditions."
      }
    ]
  },
  "node-concurrency": {
    id: "node-concurrency",
    title: "Node.js Concurrency & the Event Loop",
    type: "text",
    duration: 30,
    content: [
      {
        id: "node-loop",
        type: "text",
        title: "How Node Handles Work",
        content: "Node uses libuv to manage an event loop, a thread pool for I/O, and worker threads for CPU-heavy tasks."
      },
      {
        id: "node-example",
        type: "code",
        title: "Offloading CPU Work",
        language: "javascript",
        content: "import { Worker } from 'node:worker_threads';\n\nexport function runWorker(script, data) {\n  return new Promise((resolve, reject) => {\n    const worker = new Worker(script, { workerData: data });\n    worker.once('message', resolve);\n    worker.once('error', reject);\n    worker.once('exit', code => {\n      if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));\n    });\n  });\n}"
      },
      {
        id: "node-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Designing high-throughput APIs requires balancing async I/O with worker threads so CPU work (encryption, PDF generation) doesn't block other requests."
      }
    ]
  },
  "error-handling-patterns": {
    id: "error-handling-patterns",
    title: "Error Handling Patterns",
    type: "text",
    duration: 20,
    content: [
      {
        id: "error-overview",
        type: "text",
        title: "Crafting Useful Errors",
        content: "Throw Error subclasses with meaningful messages, attach metadata, and surface user-friendly notifications without leaking implementation details."
      },
      {
        id: "error-example",
        type: "code",
        title: "Custom Error Type",
        language: "javascript",
        content: "class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\nfunction requireEmail(value) {\n  if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {\n    throw new ValidationError('Invalid email', 'email');\n  }\n}"
      },
      {
        id: "error-pattern-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Graceful error handling keeps forms usable, preserves analytics, and makes observability tooling (Sentry) far more actionable."
      }
    ]
  },
  "debugging-toolkit": {
    id: "debugging-toolkit",
    title: "Debugging with DevTools & Logging",
    type: "text",
    duration: 25,
    content: [
      {
        id: "debug-overview",
        type: "text",
        title: "Breakpoint Mastery",
        content: "Use conditional breakpoints, watches, and step-through debugging in Chrome DevTools and VS Code to inspect app state."
      },
      {
        id: "debug-example",
        type: "code",
        title: "Structured Logging",
        language: "javascript",
        content: "const logger = (scope) => ({\n  info: (message, meta = {}) => console.log(`[${scope}]`, message, meta),\n  error: (message, meta = {}) => console.error(`[${scope}]`, message, meta),\n});\n\nconst authLog = logger('auth');\nauthLog.info('Login attempt', { userId: '123' });"
      },
      {
        id: "debug-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Debugging minified builds with sourcemaps and using structured logging accelerates incident resolution in production systems."
      }
    ]
  },
  "framework-ecosystem": {
    id: "framework-ecosystem",
    title: "React, Vue & Angular Overview",
    type: "text",
    duration: 25,
    content: [
      {
        id: "framework-overview",
        type: "text",
        title: "Comparing Frameworks",
        content: "React focuses on JSX and hooks, Vue emphasizes reactivity and single-file components, and Angular delivers a batteries-included solution with DI and TypeScript."
      },
      {
        id: "framework-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Most front-end roles require awareness of multiple frameworks. Recruiters look for how you evaluate trade-offs around state management, typing, and performance."
      }
    ]
  },
  "node-backend-overview": {
    id: "node-backend-overview",
    title: "Node.js & Express Essentials",
    type: "text",
    duration: 25,
    content: [
      {
        id: "node-backend-overview",
        type: "text",
        title: "Building APIs",
        content: "Express provides routing, middleware, and request/response helpers. Combine with databases (MongoDB, Postgres) for full-stack capability."
      },
      {
        id: "node-backend-example",
        type: "code",
        title: "Minimal Express Server",
        language: "javascript",
        content: "import express from 'express';\n\nconst app = express();\napp.use(express.json());\n\napp.get('/health', (_req, res) => res.json({ status: 'ok' }));\n\napp.listen(3000, () => console.log('Server listening'));"
      },
      {
        id: "node-backend-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Full-stack interviews often evaluate whether you understand Express middleware order, async route handlers, and performance tuning."
      }
    ]
  },
  "unit-testing-jest": {
    id: "unit-testing-jest",
    title: "Unit Testing with Jest & Friends",
    type: "text",
    duration: 25,
    content: [
      {
        id: "testing-overview",
        type: "text",
        title: "Testing Mindset",
        content: "Write fast, isolated tests that cover happy paths and edge cases. Use describe/it blocks and matchers to express intent clearly."
      },
      {
        id: "testing-example",
        type: "code",
        title: "Sample Jest Test",
        language: "javascript",
        content: "import { slugify } from '../slugify';\n\ndescribe('slugify', () => {\n  it('removes punctuation and lowercases text', () => {\n    expect(slugify('Hello JS!')).toBe('hello-js');\n  });\n});"
      },
      {
        id: "testing-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "CI pipelines rely on solid unit tests to prevent regressions. Developers who write tests earn trust and ship faster."
      }
    ]
  },
  "linting-and-formatting": {
    id: "linting-and-formatting",
    title: "Linting & Formatting Workflows",
    type: "text",
    duration: 20,
    content: [
      {
        id: "linting-overview",
        type: "text",
        title: "Static Analysis",
        content: "ESLint enforces code quality rules, while Prettier standardizes formatting. Run them via npm scripts and editor integrations."
      },
      {
        id: "linting-example",
        type: "code",
        title: "package.json Scripts",
        language: "json",
        content: "{\n  \"scripts\": {\n    \"lint\": \"eslint src --max-warnings=0\",\n    \"format\": \"prettier --write \"src/**/*.{ts,tsx,js}\"\"\n  }\n}"
      },
      {
        id: "linting-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Consistent linting prevents stylistic debates and catches bugs early (unused variables, accidental globals) before code review."
      }
    ]
  },
  "build-tools": {
    id: "build-tools",
    title: "Build Tools & Bundlers",
    type: "text",
    duration: 25,
    content: [
      {
        id: "build-overview",
        type: "text",
        title: "Modern Tooling",
        content: "Webpack, Rollup, and Vite bundle modules, transpile TypeScript, and optimize assets. npm scripts orchestrate common tasks."
      },
      {
        id: "build-example",
        type: "code",
        title: "Vite Config Snippet",
        language: "javascript",
        content: "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  build: {\n    sourcemap: true,\n  },\n});"
      },
      {
        id: "build-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Understanding build tools helps debug bundle size issues, configure fast refresh, and ship performant production builds."
      }
    ]
  },
  "tensorflow-js-intro": {
    id: "tensorflow-js-intro",
    title: "TensorFlow.js Fundamentals",
    type: "text",
    duration: 35,
    content: [
      {
        id: "tfjs-overview",
        type: "text",
        title: "What is TensorFlow.js?",
        content: "TensorFlow.js brings machine learning to JavaScript, running entirely in browsers and Node.js. Load pre-trained models, train new ones, or convert existing Python models—all without server dependencies."
      },
      {
        id: "tfjs-setup",
        type: "code",
        title: "Getting Started with TensorFlow.js",
        language: "html",
        content: "<!DOCTYPE html>\n<html>\n<head>\n  <script src=\"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest\"></script>\n</head>\n<body>\n  <script>\n    // Check if TensorFlow.js loaded\n    console.log('TensorFlow.js version:', tf.version.tfjs);\n    \n    // Create a simple tensor\n    const tensor = tf.tensor2d([[1, 2], [3, 4]]);\n    tensor.print(); // [[1, 2], [3, 4]]\n    \n    // Clean up memory\n    tensor.dispose();\n  </script>\n</body>\n</html>"
      },
      {
        id: "pretrained-models",
        type: "code",
        title: "Loading Pre-trained Models",
        language: "javascript",
        content: "// Load MobileNet for image classification\nasync function loadModel() {\n  const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1', {fromTFHub: true});\n  return model;\n}\n\n// Make predictions\nasync function classifyImage(imageElement) {\n  const model = await loadModel();\n  \n  // Preprocess image\n  const tensor = tf.browser.fromPixels(imageElement)\n    .resizeNearestNeighbor([224, 224])\n    .expandDims(0)\n    .div(255.0);\n  \n  // Get predictions\n  const predictions = await model.predict(tensor).data();\n  \n  // Clean up\n  tensor.dispose();\n  model.dispose();\n  \n  return predictions;\n}"
      },
      {
        id: "tfjs-ecosystem",
        type: "text",
        title: "TensorFlow.js Ecosystem",
        content: "Explore the ecosystem: @tensorflow/tfjs-core (low-level ops), @tensorflow/tfjs-layers (high-level API), @tensorflow/tfjs-models (pre-trained models), @tensorflow/tfjs-vis (visualization), @tensorflow/tfjs-node (server-side), @tensorflow/tfjs-react-native (mobile)."
      }
    ]
  },
  "computer-vision-browser": {
    id: "computer-vision-browser",
    title: "Computer Vision in the Browser",
    type: "text",
    duration: 40,
    content: [
      {
        id: "cv-overview",
        type: "text",
        title: "Browser-Based Computer Vision",
        content: "Build powerful computer vision apps that run entirely in the browser. No server required—process images and video in real-time using WebGL acceleration and pre-trained models."
      },
      {
        id: "image-classification",
        type: "code",
        title: "Real-time Image Classification",
        language: "javascript",
        content: "import * as tf from '@tensorflow/tfjs';\nimport '@tensorflow/tfjs-backend-webgl';\n\nclass ImageClassifier {\n  constructor() {\n    this.model = null;\n    this.labels = [];\n  }\n\n  async init() {\n    // Load MobileNet model\n    this.model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');\n    \n    // Load ImageNet labels\n    const response = await fetch('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/labels.json');\n    this.labels = await response.json();\n  }\n\n  async classifyImage(imageElement) {\n    const tensor = tf.browser.fromPixels(imageElement)\n      .resizeNearestNeighbor([224, 224])\n      .expandDims(0)\n      .div(255.0);\n\n    const predictions = await this.model.predict(tensor).data();\n    tensor.dispose();\n\n    // Get top 3 predictions\n    const top3 = Array.from(predictions)\n      .map((prob, index) => ({ label: this.labels[index], probability: prob }))\n      .sort((a, b) => b.probability - a.probability)\n      .slice(0, 3);\n\n    return top3;\n  }\n\n  // Real-time video classification\n  async startVideoClassification(videoElement, callback) {\n    const classify = async () => {\n      if (videoElement.videoWidth > 0) {\n        const predictions = await this.classifyImage(videoElement);\n        callback(predictions);\n      }\n      requestAnimationFrame(classify);\n    };\n    classify();\n  }\n}"
      },
      {
        id: "object-detection",
        type: "code",
        title: "Object Detection with COCO-SSD",
        language: "javascript",
        content: "import * as cocoSsd from '@tensorflow-models/coco-ssd';\n\nclass ObjectDetector {\n  constructor() {\n    this.model = null;\n  }\n\n  async init() {\n    this.model = await cocoSsd.load();\n  }\n\n  async detectObjects(imageElement) {\n    const predictions = await this.model.detect(imageElement);\n    return predictions;\n  }\n\n  drawBoundingBoxes(canvas, predictions) {\n    const ctx = canvas.getContext('2d');\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    predictions.forEach(prediction => {\n      const [x, y, width, height] = prediction.bbox;\n      const { class: className, score } = prediction;\n\n      // Draw bounding box\n      ctx.strokeStyle = '#FF0000';\n      ctx.lineWidth = 2;\n      ctx.strokeRect(x, y, width, height);\n\n      // Draw label\n      ctx.fillStyle = '#FF0000';\n      ctx.font = '16px Arial';\n      ctx.fillText(`${className} (${(score * 100).toFixed(1)}%)`, x, y - 5);\n    });\n  }\n}"
      },
      {
        id: "pose-estimation",
        type: "text",
        title: "Pose Estimation & Hand Tracking",
        content: "Implement human pose estimation using PoseNet, hand tracking with MediaPipe, and face mesh detection. Perfect for fitness apps, gesture controls, and AR experiences—all running in real-time without servers."
      },
      {
        id: "cv-performance",
        type: "text",
        title: "Performance Optimization",
        content: "Optimize computer vision apps: Use WebGL backend for GPU acceleration, implement frame skipping for smooth UI, batch process multiple images, cache models in IndexedDB, and use Web Workers for background processing."
      }
    ]
  },
  "nlp-text-processing": {
    id: "nlp-text-processing",
    title: "Natural Language Processing",
    type: "text",
    duration: 35,
    content: [
      {
        id: "nlp-overview",
        type: "text",
        title: "Browser-Based NLP",
        content: "Process text directly in the browser with sentiment analysis, text classification, language detection, and even small language models—no API keys or server calls required."
      },
      {
        id: "sentiment-analysis",
        type: "code",
        title: "Sentiment Analysis Implementation",
        language: "javascript",
        content: "import * as tf from '@tensorflow/tfjs';\nimport * as toxicity from '@tensorflow-models/toxicity';\n\nclass SentimentAnalyzer {\n  constructor() {\n    this.toxicityModel = null;\n    this.sentimentModel = null;\n  }\n\n  async init() {\n    // Load toxicity detection model\n    this.toxicityModel = await toxicity.load(0.7);\n    \n    // Load custom sentiment model\n    this.sentimentModel = await tf.loadLayersModel('/models/sentiment/model.json');\n  }\n\n  async analyzeToxicity(texts) {\n    const predictions = await this.toxicityModel.classify(texts);\n    return predictions;\n  }\n\n  // Simple sentiment scoring\n  analyzeSentiment(text) {\n    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect'];\n    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible'];\n    \n    const words = text.toLowerCase().split(/\\W+/);\n    let score = 0;\n    \n    words.forEach(word => {\n      if (positiveWords.includes(word)) score += 1;\n      if (negativeWords.includes(word)) score -= 1;\n    });\n    \n    return {\n      score,\n      label: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral',\n      confidence: Math.abs(score) / words.length\n    };\n  }\n\n  // Real-time text analysis\n  setupRealtimeAnalysis(textElement, callback) {\n    let timeout;\n    textElement.addEventListener('input', () => {\n      clearTimeout(timeout);\n      timeout = setTimeout(() => {\n        const sentiment = this.analyzeSentiment(textElement.value);\n        callback(sentiment);\n      }, 300);\n    });\n  }\n}"
      },
      {
        id: "text-embedding",
        type: "code",
        title: "Text Embeddings & Similarity",
        language: "javascript",
        content: "import * as use from '@tensorflow-models/universal-sentence-encoder';\n\nclass TextSimilarity {\n  constructor() {\n    this.model = null;\n  }\n\n  async init() {\n    this.model = await use.load();\n  }\n\n  async getEmbeddings(texts) {\n    const embeddings = await this.model.embed(texts);\n    return embeddings;\n  }\n\n  // Calculate cosine similarity\n  cosineSimilarity(vecA, vecB) {\n    const dotProduct = tf.sum(tf.mul(vecA, vecB));\n    const normA = tf.norm(vecA);\n    const normB = tf.norm(vecB);\n    return tf.div(dotProduct, tf.mul(normA, normB));\n  }\n\n  async findSimilarTexts(query, documents, threshold = 0.5) {\n    const allTexts = [query, ...documents];\n    const embeddings = await this.getEmbeddings(allTexts);\n    \n    const queryEmbedding = embeddings.slice([0, 0], [1, -1]);\n    const docEmbeddings = embeddings.slice([1, 0], [-1, -1]);\n    \n    const similarities = [];\n    for (let i = 0; i < documents.length; i++) {\n      const docEmbedding = docEmbeddings.slice([i, 0], [1, -1]);\n      const similarity = await this.cosineSimilarity(queryEmbedding, docEmbedding).data();\n      similarities.push({ text: documents[i], similarity: similarity[0] });\n    }\n    \n    return similarities\n      .filter(item => item.similarity > threshold)\n      .sort((a, b) => b.similarity - a.similarity);\n  }\n}"
      },
      {
        id: "language-detection",
        type: "text",
        title: "Language Detection & Translation",
        content: "Implement language detection using character n-grams and frequency analysis. While full translation requires larger models, you can build language switchers, content routing, and basic text preprocessing entirely in JavaScript."
      }
    ]
  },
  "ml-training-browser": {
    id: "ml-training-browser",
    title: "Training Models in the Browser",
    type: "text",
    duration: 45,
    content: [
      {
        id: "transfer-learning",
        type: "text",
        title: "Transfer Learning Basics",
        content: "Train custom models in the browser using transfer learning. Start with pre-trained models like MobileNet, freeze base layers, and retrain the classifier with your own data—all without sending data to servers."
      },
      {
        id: "image-classifier-training",
        type: "code",
        title: "Custom Image Classifier",
        language: "javascript",
        content: "import * as tf from '@tensorflow/tfjs';\nimport { MobileNet } from '@tensorflow-models/mobilenet';\n\nclass CustomImageClassifier {\n  constructor() {\n    this.baseModel = null;\n    this.model = null;\n    this.classes = [];\n    this.trainingData = [];\n  }\n\n  async init(classNames) {\n    this.classes = classNames;\n    \n    // Load pre-trained MobileNet\n    this.baseModel = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/feature_vector/3/default/1', {fromTFHub: true});\n    \n    // Create custom classifier head\n    this.model = tf.sequential({\n      layers: [\n        tf.layers.dense({\n          inputShape: [1280], // MobileNet feature vector size\n          units: 128,\n          activation: 'relu'\n        }),\n        tf.layers.dropout({ rate: 0.5 }),\n        tf.layers.dense({\n          units: classNames.length,\n          activation: 'softmax'\n        })\n      ]\n    });\n\n    this.model.compile({\n      optimizer: tf.train.adam(0.001),\n      loss: 'categoricalCrossentropy',\n      metrics: ['accuracy']\n    });\n  }\n\n  async addTrainingImage(imageElement, classIndex) {\n    // Extract features using base model\n    const features = await this.extractFeatures(imageElement);\n    const label = tf.oneHot(classIndex, this.classes.length);\n    \n    this.trainingData.push({ features, label });\n  }\n\n  async extractFeatures(imageElement) {\n    const tensor = tf.browser.fromPixels(imageElement)\n      .resizeNearestNeighbor([224, 224])\n      .expandDims(0)\n      .div(255.0);\n    \n    const features = this.baseModel.predict(tensor);\n    tensor.dispose();\n    \n    return features;\n  }\n\n  async train(epochs = 10) {\n    if (this.trainingData.length === 0) {\n      throw new Error('No training data available');\n    }\n\n    // Prepare training data\n    const features = tf.concat(this.trainingData.map(item => item.features));\n    const labels = tf.concat(this.trainingData.map(item => item.label));\n\n    // Train the model\n    const history = await this.model.fit(features, labels, {\n      epochs,\n      batchSize: 32,\n      validationSplit: 0.2,\n      callbacks: {\n        onEpochEnd: (epoch, logs) => {\n          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);\n        }\n      }\n    });\n\n    // Clean up\n    features.dispose();\n    labels.dispose();\n\n    return history;\n  }\n\n  async predict(imageElement) {\n    const features = await this.extractFeatures(imageElement);\n    const prediction = this.model.predict(features);\n    const probabilities = await prediction.data();\n    \n    features.dispose();\n    prediction.dispose();\n\n    return this.classes.map((className, index) => ({\n      class: className,\n      probability: probabilities[index]\n    })).sort((a, b) => b.probability - a.probability);\n  }\n}"
      },
      {
        id: "data-collection",
        type: "code",
        title: "Interactive Data Collection",
        language: "javascript",
        content: "class DataCollector {\n  constructor(classifier) {\n    this.classifier = classifier;\n    this.videoElement = null;\n    this.canvas = null;\n    this.isCollecting = false;\n  }\n\n  setupCamera() {\n    return new Promise((resolve, reject) => {\n      this.videoElement = document.createElement('video');\n      this.canvas = document.createElement('canvas');\n      \n      navigator.mediaDevices.getUserMedia({ video: true })\n        .then(stream => {\n          this.videoElement.srcObject = stream;\n          this.videoElement.onloadedmetadata = () => {\n            this.canvas.width = this.videoElement.videoWidth;\n            this.canvas.height = this.videoElement.videoHeight;\n            resolve();\n          };\n          this.videoElement.play();\n        })\n        .catch(reject);\n    });\n  }\n\n  startCollecting(className, interval = 500) {\n    const classIndex = this.classifier.classes.indexOf(className);\n    if (classIndex === -1) {\n      throw new Error(`Class ${className} not found`);\n    }\n\n    this.isCollecting = true;\n    const collect = async () => {\n      if (!this.isCollecting) return;\n      \n      // Capture frame from video\n      const ctx = this.canvas.getContext('2d');\n      ctx.drawImage(this.videoElement, 0, 0);\n      \n      // Add to training data\n      await this.classifier.addTrainingImage(this.canvas, classIndex);\n      \n      setTimeout(collect, interval);\n    };\n    \n    collect();\n  }\n\n  stopCollecting() {\n    this.isCollecting = false;\n  }\n\n  getTrainingStats() {\n    const stats = {};\n    this.classifier.classes.forEach(className => {\n      stats[className] = 0;\n    });\n    \n    this.classifier.trainingData.forEach(item => {\n      const classIndex = item.label.argMax().dataSync()[0];\n      const className = this.classifier.classes[classIndex];\n      stats[className]++;\n    });\n    \n    return stats;\n  }\n}"
      },
      {
        id: "model-persistence",
        type: "text",
        title: "Model Saving & Loading",
        content: "Save trained models to browser storage or export them for sharing. Use IndexedDB for local persistence, export to files for backup, or save to cloud storage. Models trained in one session can be loaded and used across browser sessions."
      }
    ]
  },
  "edge-ai-optimization": {
    id: "edge-ai-optimization",
    title: "Edge AI & Performance Optimization",
    type: "text",
    duration: 30,
    content: [
      {
        id: "performance-overview",
        type: "text",
        title: "Optimizing AI for Edge Devices",
        content: "Make AI models run efficiently on mobile devices and low-power hardware. Techniques include model quantization, pruning, knowledge distillation, and smart caching strategies."
      },
      {
        id: "model-optimization",
        type: "code",
        title: "Model Quantization & Compression",
        language: "javascript",
        content: "import * as tf from '@tensorflow/tfjs';\n\nclass ModelOptimizer {\n  // Convert model to 8-bit quantization\n  static async quantizeModel(model) {\n    const quantizedModel = await tf.quantization.quantize(model, {\n      weightQuantizationBytes: 1, // 8-bit quantization\n      activationQuantizationBytes: 1\n    });\n    \n    return quantizedModel;\n  }\n\n  // Prune model weights\n  static pruneModel(model, sparsity = 0.5) {\n    const prunedModel = tf.sequential();\n    \n    model.layers.forEach(layer => {\n      if (layer.getWeights().length > 0) {\n        const weights = layer.getWeights();\n        const prunedWeights = weights.map(weight => {\n          const threshold = tf.util.quantile(weight.abs().flatten(), sparsity);\n          return tf.where(weight.abs().greater(threshold), weight, tf.zerosLike(weight));\n        });\n        \n        // Create new layer with pruned weights\n        const newLayer = tf.layers[layer.getClassName()](layer.getConfig());\n        prunedModel.add(newLayer);\n        newLayer.setWeights(prunedWeights);\n      } else {\n        prunedModel.add(layer);\n      }\n    });\n    \n    return prunedModel;\n  }\n\n  // Check model size and performance\n  static async benchmarkModel(model, inputShape, iterations = 100) {\n    const dummyInput = tf.randomNormal(inputShape);\n    \n    // Warmup\n    await model.predict(dummyInput);\n    \n    // Benchmark\n    const start = performance.now();\n    for (let i = 0; i < iterations; i++) {\n      const prediction = model.predict(dummyInput);\n      prediction.dispose();\n    }\n    const end = performance.now();\n    \n    dummyInput.dispose();\n    \n    return {\n      averageInferenceTime: (end - start) / iterations,\n      modelSize: model.countParams(),\n      memoryUsage: tf.memory()\n    };\n  }\n}"
      },
      {
        id: "caching-strategies",
        type: "code",
        title: "Smart Caching & Offline Support",
        language: "javascript",
        content: "class AICache {\n  constructor() {\n    this.predictionCache = new Map();\n    this.modelCache = new Map();\n    this.maxCacheSize = 1000;\n  }\n\n  // Cache predictions with hash-based keys\n  cacheKey(input) {\n    // Simple hash function for input tensors\n    return input.dataSync().reduce((hash, val) => {\n      return ((hash << 5) - hash + val) & 0xffffffff;\n    }, 0).toString();\n  }\n\n  async getCachedPrediction(model, input) {\n    const key = this.cacheKey(input);\n    if (this.predictionCache.has(key)) {\n      return this.predictionCache.get(key);\n    }\n\n    const prediction = await model.predict(input);\n    const result = await prediction.data();\n    prediction.dispose();\n\n    // Store in cache with LRU eviction\n    if (this.predictionCache.size >= this.maxCacheSize) {\n      const firstKey = this.predictionCache.keys().next().value;\n      this.predictionCache.delete(firstKey);\n    }\n    this.predictionCache.set(key, result);\n\n    return result;\n  }\n\n  // Preload models for offline use\n  async preloadModel(modelUrl, modelName) {\n    try {\n      const model = await tf.loadLayersModel(modelUrl);\n      this.modelCache.set(modelName, model);\n      \n      // Store in IndexedDB for persistence\n      await model.save(`indexeddb://${modelName}`);\n      \n      return model;\n    } catch (error) {\n      console.error(`Failed to preload model ${modelName}:`, error);\n      throw error;\n    }\n  }\n\n  async getModel(modelName, fallbackUrl) {\n    // Try cache first\n    if (this.modelCache.has(modelName)) {\n      return this.modelCache.get(modelName);\n    }\n\n    // Try IndexedDB\n    try {\n      const model = await tf.loadLayersModel(`indexeddb://${modelName}`);\n      this.modelCache.set(modelName, model);\n      return model;\n    } catch (error) {\n      // Fallback to network\n      return this.preloadModel(fallbackUrl, modelName);\n    }\n  }\n}"
      },
      {
        id: "progressive-loading",
        type: "text",
        title: "Progressive Model Loading",
        content: "Implement progressive loading strategies: Load lightweight models first for immediate feedback, stream larger models in the background, use model cascades (fast model → accurate model), and implement graceful degradation when resources are limited."
      },
      {
        id: "webworker-inference",
        type: "text",
        title: "Web Workers for Background Processing",
        content: "Offload AI inference to Web Workers to keep the main thread responsive. Implement message passing for prediction requests, batch multiple requests for efficiency, and maintain worker pools for concurrent processing."
      }
    ]
  },
  "ai-project-workshop": {
    id: "ai-project-workshop",
    title: "AI Project Workshop",
    type: "assessment",
    duration: 60,
    content: [
      {
        id: "project-options",
        type: "text",
        title: "Project Options",
        content: "Choose one of these AI-powered projects: Smart Photo Organizer (computer vision + clustering), Voice-Controlled Task Manager (speech recognition + NLP), Real-time Language Translator (NLP + audio), Gesture-Based Game Controller (pose estimation), or Smart Content Moderator (text + image analysis)."
      },
      {
        id: "architecture-planning",
        type: "text",
        title: "System Architecture",
        content: "Design your AI application architecture: Choose appropriate pre-trained models, plan data flow and state management, design user interaction patterns, implement error handling and fallbacks, plan for offline functionality, and consider performance optimization strategies."
      },
      {
        id: "implementation-guide",
        type: "code",
        title: "Implementation Framework",
        language: "javascript",
        content: "// AI Application Framework\nclass AIApplication {\n  constructor(config) {\n    this.models = new Map();\n    this.cache = new AICache();\n    this.ui = new UIManager();\n    this.config = config;\n  }\n\n  async initialize() {\n    // Load required models\n    for (const [name, url] of Object.entries(this.config.models)) {\n      await this.loadModel(name, url);\n    }\n    \n    // Setup UI event handlers\n    this.ui.setupEventHandlers(this.handleUserInput.bind(this));\n    \n    // Initialize camera/microphone if needed\n    if (this.config.useCamera) await this.setupCamera();\n    if (this.config.useMicrophone) await this.setupMicrophone();\n  }\n\n  async loadModel(name, url) {\n    try {\n      const model = await this.cache.getModel(name, url);\n      this.models.set(name, model);\n      this.ui.updateLoadingStatus(name, 'loaded');\n    } catch (error) {\n      this.ui.updateLoadingStatus(name, 'error');\n      throw error;\n    }\n  }\n\n  async handleUserInput(inputType, data) {\n    try {\n      this.ui.showLoading();\n      \n      let results;\n      switch (inputType) {\n        case 'image':\n          results = await this.processImage(data);\n          break;\n        case 'text':\n          results = await this.processText(data);\n          break;\n        case 'audio':\n          results = await this.processAudio(data);\n          break;\n      }\n      \n      this.ui.displayResults(results);\n    } catch (error) {\n      this.ui.displayError(error.message);\n    } finally {\n      this.ui.hideLoading();\n    }\n  }\n\n  async processImage(imageElement) {\n    // Implement based on your chosen project\n    const model = this.models.get('vision');\n    return await this.cache.getCachedPrediction(model, imageElement);\n  }\n\n  // Add cleanup methods\n  dispose() {\n    this.models.forEach(model => model.dispose());\n    this.cache.clear();\n  }\n}"
      },
      {
        id: "testing-validation",
        type: "text",
        title: "Testing & Validation",
        content: "Test your AI application thoroughly: Validate model accuracy with test datasets, test edge cases and error conditions, measure performance on different devices, implement A/B testing for model comparisons, gather user feedback for improvements, and monitor real-world usage patterns."
      },
      {
        id: "deployment-sharing",
        type: "text",
        title: "Deployment & Sharing",
        content: "Deploy your AI application: Optimize for production (minification, compression), implement proper error tracking, add analytics for usage insights, create user documentation, deploy to GitHub Pages or Netlify, and share your project with the community for feedback and learning."
      }
    ]
  },
  "web-security-basics": {
    id: "web-security-basics",
    title: "XSS & CSRF Essentials",
    type: "text",
    duration: 25,
    content: [
      {
        id: "security-xss",
        type: "text",
        title: "Cross-Site Scripting",
        content: "XSS occurs when untrusted input is injected into the DOM. Use output encoding, Content Security Policy, and sanitization libraries to mitigate."
      },
      {
        id: "security-csrf",
        type: "text",
        title: "Cross-Site Request Forgery",
        content: "CSRF tricks authenticated users into performing actions. Use same-site cookies, CSRF tokens, and double-submit cookies for defense."
      },
      {
        id: "security-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Preventing XSS and CSRF stops attackers from hijacking sessions, stealing tokens, or posting malicious content."
      }
    ]
  },
  "input-validation-sanitization": {
    id: "input-validation-sanitization",
    title: "Input Validation & Sanitization",
    type: "text",
    duration: 20,
    content: [
      {
        id: "validation-overview",
        type: "text",
        title: "Trust Nothing",
        content: "Validate input on both client and server. Use schema validators (Yup, Zod) to reject malformed data before it reaches critical systems."
      },
      {
        id: "validation-example",
        type: "code",
        title: "Form Validation",
        language: "javascript",
        content: "import * as yup from 'yup';\n\nconst schema = yup.object({\n  email: yup.string().email().required(),\n  password: yup.string().min(8).matches(/[A-Z]/).required(),\n});\n\nexport async function validate(formData) {\n  return schema.validate(formData, { abortEarly: false });\n}"
      },
      {
        id: "validation-real-world",
        type: "text",
        title: "Real-World Impact",
        content: "Rigorous validation protects APIs from injection attacks and ensures analytics pipelines ingest clean, trustworthy data."
      }
    ]
  },
  "capstone-planning": {
    id: "capstone-planning",
    title: "Project Planning & Architecture",
    type: "text",
    duration: 30,
    content: [
      {
        id: "project-overview",
        type: "text",
        title: "Capstone Project: Task Management App",
        content: "Build a full-featured task management application that demonstrates your JavaScript mastery. The app will include user authentication, real-time updates, data persistence, comprehensive testing, and production deployment."
      },
      {
        id: "requirements",
        type: "text",
        title: "Core Requirements",
        content: "Your application must include: User registration/login with JWT authentication, CRUD operations for tasks and projects, Real-time collaboration features, Client-side routing and state management, Input validation and error handling, Unit and integration tests, Security best practices (XSS/CSRF protection), Production deployment with CI/CD pipeline."
      },
      {
        id: "architecture-diagram",
        type: "text",
        title: "System Architecture",
        content: "Design a three-tier architecture: Frontend (Vanilla JS with modules), Backend API (Node.js/Express), Database (MongoDB or PostgreSQL). Plan your data models, API endpoints, authentication flow, and deployment strategy before coding."
      },
      {
        id: "tech-stack",
        type: "code",
        title: "Recommended Tech Stack",
        language: "json",
        content: "{\n  \"frontend\": {\n    \"core\": \"Vanilla JavaScript (ES6+)\",\n    \"bundler\": \"Vite or Webpack\",\n    \"testing\": \"Jest + Testing Library\",\n    \"styling\": \"CSS3 + CSS Variables\"\n  },\n  \"backend\": {\n    \"runtime\": \"Node.js\",\n    \"framework\": \"Express.js\",\n    \"database\": \"MongoDB or PostgreSQL\",\n    \"auth\": \"JWT + bcrypt\",\n    \"testing\": \"Jest + Supertest\"\n  },\n  \"deployment\": {\n    \"frontend\": \"Netlify or Vercel\",\n    \"backend\": \"Railway or Render\",\n    \"database\": \"MongoDB Atlas or Supabase\"\n  }\n}"
      }
    ]
  },
  "capstone-frontend": {
    id: "capstone-frontend",
    title: "Frontend Implementation",
    type: "assessment",
    duration: 90,
    content: [
      {
        id: "ui-components",
        type: "text",
        title: "Component Architecture",
        content: "Build reusable UI components using JavaScript modules and classes. Implement a task card component, project sidebar, user profile modal, and notification system. Use event delegation and custom events for component communication."
      },
      {
        id: "state-management",
        type: "code",
        title: "State Management Pattern",
        language: "javascript",
        content: "class AppState {\n  constructor() {\n    this.state = { user: null, tasks: [], projects: [], notifications: [] };\n    this.listeners = new Map();\n  }\n\n  subscribe(event, callback) {\n    if (!this.listeners.has(event)) this.listeners.set(event, []);\n    this.listeners.get(event).push(callback);\n  }\n\n  setState(updates) {\n    const prevState = { ...this.state };\n    this.state = { ...this.state, ...updates };\n    this.notifyListeners('stateChange', { prevState, newState: this.state });\n  }\n\n  notifyListeners(event, data) {\n    const callbacks = this.listeners.get(event) || [];\n    callbacks.forEach(callback => callback(data));\n  }\n}\n\nexport const appState = new AppState();"
      },
      {
        id: "dom-manipulation",
        type: "text",
        title: "Advanced DOM Techniques",
        content: "Implement efficient DOM updates using DocumentFragment for batch operations, IntersectionObserver for infinite scrolling, drag-and-drop for task reordering, and virtual scrolling for large task lists. Use CSS-in-JS for dynamic styling."
      },
      {
        id: "async-operations",
        type: "text",
        title: "Async Data Handling",
        content: "Implement loading states, error boundaries, retry mechanisms, and optimistic updates. Use AbortController for request cancellation and implement client-side caching with expiration policies."
      }
    ]
  },
  "capstone-backend": {
    id: "capstone-backend",
    title: "Backend API Development",
    type: "assessment",
    duration: 90,
    content: [
      {
        id: "api-design",
        type: "text",
        title: "RESTful API Design",
        content: "Design RESTful endpoints following best practices: /api/auth/login, /api/users/profile, /api/projects, /api/tasks. Implement proper HTTP status codes, consistent error responses, API versioning, and comprehensive OpenAPI documentation."
      },
      {
        id: "authentication",
        type: "code",
        title: "JWT Authentication Middleware",
        language: "javascript",
        content: "import jwt from 'jsonwebtoken';\n\nexport const authenticateToken = (req, res, next) => {\n  const authHeader = req.headers['authorization'];\n  const token = authHeader && authHeader.split(' ')[1];\n\n  if (!token) {\n    return res.status(401).json({ error: 'Access token required' });\n  }\n\n  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {\n    if (err) return res.status(403).json({ error: 'Invalid token' });\n    req.user = user;\n    next();\n  });\n};\n\nexport const generateTokens = (userId) => {\n  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });\n  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });\n  return { accessToken, refreshToken };\n};"
      },
      {
        id: "data-validation",
        type: "text",
        title: "Input Validation & Sanitization",
        content: "Implement comprehensive input validation using Joi or Yup schemas. Sanitize user input, validate file uploads, implement rate limiting, and add request/response logging. Use parameterized queries to prevent SQL injection."
      },
      {
        id: "real-time",
        type: "text",
        title: "Real-time Features",
        content: "Implement WebSocket connections for real-time task updates, user presence indicators, and collaborative editing. Handle connection drops gracefully and implement message queuing for offline users."
      }
    ]
  },
  "capstone-testing": {
    id: "capstone-testing",
    title: "Testing & Quality Assurance",
    type: "assessment",
    duration: 60,
    content: [
      {
        id: "testing-strategy",
        type: "text",
        title: "Comprehensive Testing Strategy",
        content: "Implement a multi-layer testing approach: Unit tests for utilities and business logic (80% coverage), Integration tests for API endpoints, End-to-end tests for critical user flows, Performance tests for load handling, Security tests for vulnerability scanning."
      },
      {
        id: "unit-testing",
        type: "code",
        title: "Unit Test Examples",
        language: "javascript",
        content: "import { describe, it, expect, beforeEach } from '@jest/globals';\nimport { TaskManager } from '../src/TaskManager.js';\n\ndescribe('TaskManager', () => {\n  let taskManager;\n\n  beforeEach(() => {\n    taskManager = new TaskManager();\n  });\n\n  it('should create a task with valid data', () => {\n    const task = taskManager.createTask({\n      title: 'Test Task',\n      description: 'Test Description',\n      priority: 'high'\n    });\n\n    expect(task).toHaveProperty('id');\n    expect(task.title).toBe('Test Task');\n    expect(task.status).toBe('pending');\n  });\n\n  it('should validate required fields', () => {\n    expect(() => {\n      taskManager.createTask({ description: 'Missing title' });\n    }).toThrow('Title is required');\n  });\n});"
      },
      {
        id: "integration-testing",
        type: "text",
        title: "API Integration Tests",
        content: "Test API endpoints with different authentication states, test database transactions and rollbacks, validate error handling and edge cases, and ensure proper HTTP status codes and response formats."
      },
      {
        id: "test-automation",
        type: "text",
        title: "CI/CD Integration",
        content: "Set up automated testing in GitHub Actions: Run tests on pull requests, generate coverage reports, perform security scans, and deploy only when tests pass. Include performance budgets and accessibility checks."
      }
    ]
  },
  "capstone-deployment": {
    id: "capstone-deployment",
    title: "Deployment & Performance",
    type: "assessment",
    duration: 45,
    content: [
      {
        id: "production-build",
        type: "text",
        title: "Production Optimization",
        content: "Optimize your application for production: Bundle and minify JavaScript/CSS, implement code splitting and lazy loading, optimize images and assets, set up CDN for static files, enable gzip compression, and configure caching headers."
      },
      {
        id: "deployment-config",
        type: "code",
        title: "Docker Configuration",
        language: "dockerfile",
        content: "FROM node:18-alpine\n\nWORKDIR /app\n\n# Copy package files\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Copy source code\nCOPY . .\n\n# Create non-root user\nRUN addgroup -g 1001 -S nodejs\nRUN adduser -S nodeuser -u 1001\n\n# Set permissions\nUSER nodeuser\n\nEXPOSE 3000\n\nCMD [\"npm\", \"start\"]"
      },
      {
        id: "monitoring",
        type: "text",
        title: "Monitoring & Analytics",
        content: "Implement application monitoring: Error tracking with Sentry, Performance monitoring with Web Vitals, User analytics with privacy-focused tools, Health checks and uptime monitoring, Log aggregation and alerting."
      }
    ]
  },
  "capstone-presentation": {
    id: "capstone-presentation",
    title: "Project Presentation & Code Review",
    type: "assessment",
    duration: 30,
    content: [
      {
        id: "presentation-prep",
        type: "text",
        title: "Presentation Structure",
        content: "Prepare a 10-minute presentation covering: Problem statement and solution overview, Technical architecture and key decisions, Code walkthrough of interesting features, Challenges faced and how you solved them, Performance metrics and test results, Future improvements and lessons learned."
      },
      {
        id: "demo-script",
        type: "text",
        title: "Live Demo Guidelines",
        content: "Practice your live demo: Prepare test data and user accounts, Have a backup plan if live demo fails, Highlight key features and user interactions, Show mobile responsiveness, Demonstrate error handling, Walk through admin/user different perspectives."
      },
      {
        id: "code-review",
        type: "text",
        title: "Code Review Best Practices",
        content: "Participate in peer code reviews: Review others' code constructively, Focus on logic, security, and maintainability, Suggest improvements with explanations, Ask questions to understand design decisions, Learn from different implementation approaches."
      }
    ]
  },
  "technical-interviews": {
    id: "technical-interviews",
    title: "Technical Interview Preparation",
    type: "text",
    duration: 40,
    content: [
      {
        id: "interview-formats",
        type: "text",
        title: "Common Interview Formats",
        content: "Prepare for different interview types: Phone/video screening with basic JS questions, Live coding sessions with algorithm problems, Take-home assignments with real-world scenarios, System design discussions for senior roles, Pair programming exercises, Code review sessions."
      },
      {
        id: "coding-challenges",
        type: "code",
        title: "Essential Coding Patterns",
        language: "javascript",
        content: "// Two Pointers Pattern\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\n// Sliding Window Pattern\nfunction maxSubarraySum(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  \n  // Calculate sum of first window\n  for (let i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  maxSum = windowSum;\n  \n  // Slide the window\n  for (let i = k; i < arr.length; i++) {\n    windowSum = windowSum - arr[i - k] + arr[i];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  \n  return maxSum;\n}"
      },
      {
        id: "behavioral-questions",
        type: "text",
        title: "Behavioral Interview Prep",
        content: "Use the STAR method (Situation, Task, Action, Result) for behavioral questions: Describe a challenging bug you fixed, Explain how you learned a new technology quickly, Share how you handled conflicting requirements, Discuss a time you mentored a junior developer, Detail how you improved team processes or code quality."
      },
      {
        id: "communication-tips",
        type: "text",
        title: "Communication During Coding",
        content: "Practice thinking out loud: Clarify requirements before coding, Explain your approach and trade-offs, Walk through test cases, Ask questions when stuck, Explain time/space complexity, Discuss potential optimizations and edge cases."
      }
    ]
  },
  "portfolio-development": {
    id: "portfolio-development",
    title: "Building Your Developer Portfolio",
    type: "text",
    duration: 35,
    content: [
      {
        id: "portfolio-strategy",
        type: "text",
        title: "Portfolio Strategy",
        content: "Build a portfolio that tells your story: 3-5 quality projects over quantity, Show progression from beginner to advanced, Include diverse project types (frontend, backend, full-stack), Demonstrate different skills and technologies, Make code easily accessible on GitHub, Include live demos when possible."
      },
      {
        id: "project-presentation",
        type: "code",
        title: "README Template",
        language: "markdown",
        content: "# Project Name\n\n## Overview\nBrief description of what the project does and why it's valuable.\n\n## Technologies Used\n- Frontend: JavaScript, HTML5, CSS3\n- Backend: Node.js, Express\n- Database: MongoDB\n- Testing: Jest, Supertest\n- Deployment: Heroku, Netlify\n\n## Features\n- ✅ User authentication\n- ✅ Real-time updates\n- ✅ Responsive design\n- ✅ Comprehensive testing\n\n## Installation\n```bash\ngit clone [repo-url]\nnpm install\nnpm start\n```\n\n## Demo\n[Live Demo](https://your-app.herokuapp.com)\n\n## Screenshots\n![App Screenshot](./screenshots/main.png)\n\n## Challenges & Solutions\nDescribe technical challenges you overcame and your problem-solving approach.\n\n## Future Improvements\nList planned enhancements to show forward thinking."
      },
      {
        id: "github-optimization",
        type: "text",
        title: "GitHub Profile Optimization",
        content: "Optimize your GitHub presence: Write a compelling profile README, Pin your best repositories, Use descriptive commit messages, Include comprehensive documentation, Add topics and tags to repositories, Contribute to open source projects, Show consistent activity with green squares."
      },
      {
        id: "online-presence",
        type: "text",
        title: "Professional Online Presence",
        content: "Build your developer brand: Create a personal website/blog, Write technical articles, Participate in developer communities, Speak at meetups or conferences, Maintain active LinkedIn profile, Share knowledge on Twitter/Dev.to, Build a network of developer contacts."
      }
    ]
  },
  "code-review-skills": {
    id: "code-review-skills",
    title: "Code Review & Collaboration",
    type: "text",
    duration: 25,
    content: [
      {
        id: "review-process",
        type: "text",
        title: "Effective Code Review Process",
        content: "Master the code review workflow: Understand the context and requirements, Check for logical errors and edge cases, Review for security vulnerabilities, Ensure code follows team standards, Test the changes locally when needed, Provide constructive, specific feedback, Approve with confidence or request changes clearly."
      },
      {
        id: "giving-feedback",
        type: "text",
        title: "Giving Constructive Feedback",
        content: "Provide valuable feedback: Focus on the code, not the person, Explain the 'why' behind suggestions, Offer alternative solutions, Highlight both issues and good practices, Use collaborative language ('we could', 'consider'), Link to documentation or examples, Balance criticism with positive recognition."
      },
      {
        id: "receiving-feedback",
        type: "text",
        title: "Receiving Feedback Gracefully",
        content: "Handle feedback professionally: Don't take criticism personally, Ask questions for clarity, Implement suggested changes promptly, Explain your reasoning when appropriate, Thank reviewers for their time, Learn from experienced developers, Use feedback to improve future code."
      }
    ]
  },
  "industry-trends": {
    id: "industry-trends",
    title: "JavaScript Ecosystem & Trends",
    type: "text",
    duration: 30,
    content: [
      {
        id: "current-trends",
        type: "text",
        title: "Current JavaScript Trends",
        content: "Stay current with the ecosystem: Server-side rendering with Next.js/Nuxt, Edge computing and serverless functions, WebAssembly integration, AI/ML with TensorFlow.js, Progressive Web Apps (PWAs), Micro-frontends architecture, TypeScript adoption, Modern build tools (Vite, esbuild)."
      },
      {
        id: "learning-resources",
        type: "text",
        title: "Continuous Learning Resources",
        content: "Build a learning routine: Follow JavaScript Weekly newsletter, Read MDN documentation regularly, Watch conference talks (JSConf, React Conf), Follow key developers on Twitter, Join developer Discord/Slack communities, Participate in coding challenges, Experiment with new frameworks in side projects."
      },
      {
        id: "career-paths",
        type: "text",
        title: "JavaScript Career Paths",
        content: "Explore specialization options: Frontend Developer (React, Vue, Angular), Full-Stack Developer (MEAN, MERN, JAMstack), Backend Developer (Node.js, serverless), Mobile Developer (React Native, Ionic), DevOps Engineer (CI/CD, containerization), Technical Lead/Architect, Developer Advocate, Freelance/Consultant."
      }
    ]
  },
  "salary-negotiation": {
    id: "salary-negotiation",
    title: "Salary Negotiation & Career Growth",
    type: "text",
    duration: 25,
    content: [
      {
        id: "market-research",
        type: "text",
        title: "Researching Your Market Value",
        content: "Know your worth: Use Glassdoor, Levels.fyi, PayScale for salary data, Consider location, experience, and company size, Research specific companies and their compensation, Network with other developers, Understand total compensation (salary, equity, benefits), Factor in remote work opportunities."
      },
      {
        id: "negotiation-strategy",
        type: "text",
        title: "Negotiation Best Practices",
        content: "Negotiate effectively: Don't accept the first offer immediately, Focus on your value and contributions, Be prepared to walk away, Negotiate the entire package, not just salary, Consider non-monetary benefits, Get offers in writing, Be professional and collaborative, Practice your pitch beforehand."
      },
      {
        id: "career-planning",
        type: "text",
        title: "Long-term Career Planning",
        content: "Plan your career growth: Set short and long-term goals, Identify skills gaps and create learning plans, Seek mentorship and mentoring opportunities, Build a strong professional network, Consider lateral moves for growth, Plan for leadership transitions, Stay adaptable to industry changes, Balance technical and soft skill development."
      }
    ]
  }
};

// Function to get JavaScript course content
export const getJavaScriptContent = () => lessonContent;