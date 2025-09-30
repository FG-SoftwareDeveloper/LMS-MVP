// CSS Mastery course content
export const cssContent: { [key: string]: any } = {
  "css-fundamentals": {
    id: "css-fundamentals",
    title: "CSS Fundamentals and Syntax",
    type: "text",
    duration: 20,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to CSS Mastery!",
        content: "CSS (Cascading Style Sheets) is the language that brings websites to life with colors, layouts, animations, and responsive designs. Mastering CSS is essential for creating beautiful, professional web interfaces that work across all devices and browsers."
      },
      {
        id: "what-is-css",
        type: "text",
        title: "What is CSS?",
        content: "CSS is a stylesheet language used to describe the presentation of HTML documents. Key concepts include:\n\n🎨 **Styling**: Colors, fonts, spacing, and visual effects\n📐 **Layout**: Positioning elements with flexbox, grid, and floats\n📱 **Responsive Design**: Adapting to different screen sizes\n✨ **Animations**: Smooth transitions and interactive effects\n🎯 **Selectors**: Targeting specific HTML elements\n📦 **Box Model**: Understanding margins, padding, borders, and content\n\nCSS transforms plain HTML into stunning user interfaces!"
      },
      {
        id: "basic-syntax",
        type: "code",
        title: "CSS Syntax and Selectors",
        language: "css",
        content: "/* Basic CSS syntax structure */\nselector {\n    property: value;\n    another-property: another-value;\n}\n\n/* Element selectors */\nh1 {\n    color: #2563eb;\n    font-size: 2rem;\n    font-weight: bold;\n}\n\np {\n    color: #374151;\n    line-height: 1.6;\n    margin-bottom: 1rem;\n}\n\n/* Class selectors (reusable) */\n.button {\n    background-color: #3b82f6;\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.button:hover {\n    background-color: #2563eb;\n}\n\n/* ID selectors (unique) */\n#header {\n    background-color: #f8fafc;\n    padding: 1rem;\n    border-bottom: 1px solid #e5e7eb;\n}\n\n/* Descendant selectors */\n.card p {\n    color: #6b7280;\n    font-size: 0.9rem;\n}\n\n/* Multiple selectors */\nh1, h2, h3 {\n    font-family: 'Arial', sans-serif;\n    color: #1f2937;\n}"
      },
      {
        id: "css-properties",
        type: "code",
        title: "Essential CSS Properties",
        language: "css",
        content: "/* Text and Typography */\n.typography-example {\n    font-family: 'Helvetica Neue', Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    line-height: 1.5;\n    letter-spacing: 0.5px;\n    text-align: center;\n    text-decoration: underline;\n    text-transform: uppercase;\n}\n\n/* Colors and Backgrounds */\n.color-example {\n    color: #ffffff;\n    background-color: #3b82f6;\n    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    background-size: cover;\n    background-position: center;\n}\n\n/* Spacing (Box Model) */\n.spacing-example {\n    margin: 20px;           /* Space outside the element */\n    padding: 15px;          /* Space inside the element */\n    border: 2px solid #e5e7eb;\n    width: 300px;\n    height: 200px;\n    box-sizing: border-box; /* Include padding and border in width/height */\n}\n\n/* Display and Positioning */\n.layout-example {\n    display: block;         /* block, inline, inline-block, flex, grid */\n    position: relative;     /* static, relative, absolute, fixed, sticky */\n    top: 10px;\n    left: 20px;\n    z-index: 100;\n}\n\n/* Flexbox (Modern Layout) */\n.flex-container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-direction: row;\n    gap: 1rem;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n    .responsive-text {\n        font-size: 14px;\n        padding: 10px;\n    }\n}"
      }
    ]
  },
  "flexbox-layouts": {
    id: "flexbox-layouts",
    title: "Mastering Flexbox Layouts",
    type: "text",
    duration: 30,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Introduction to Flexbox",
        content: "Flexbox (Flexible Box Layout) is a powerful CSS layout method that makes it easy to align and distribute space among items in a container. It's perfect for creating responsive designs and solving common layout challenges that were difficult with older methods."
      },
      {
        id: "flex-basics",
        type: "code",
        title: "Flexbox Fundamentals",
        language: "css",
        content: "/* Basic Flexbox Setup */\n.flex-container {\n    display: flex;\n    /* This makes the container a flex container */\n}\n\n/* Flex Direction - controls the main axis */\n.row-layout {\n    display: flex;\n    flex-direction: row;        /* Default: left to right */\n}\n\n.column-layout {\n    display: flex;\n    flex-direction: column;     /* Top to bottom */\n}\n\n.row-reverse {\n    display: flex;\n    flex-direction: row-reverse; /* Right to left */\n}\n\n/* Justify Content - alignment along main axis */\n.space-between {\n    display: flex;\n    justify-content: space-between; /* Items spread out */\n}\n\n.center-items {\n    display: flex;\n    justify-content: center;    /* Items centered */\n}\n\n.space-around {\n    display: flex;\n    justify-content: space-around; /* Equal space around items */\n}\n\n/* Align Items - alignment along cross axis */\n.vertical-center {\n    display: flex;\n    align-items: center;        /* Vertically center items */\n    height: 100vh;              /* Full viewport height */\n}\n\n.stretch-items {\n    display: flex;\n    align-items: stretch;       /* Items stretch to fill container */\n}"
      },
      {
        id: "flex-items",
        type: "code",
        title: "Controlling Flex Items",
        language: "css",
        content: "/* Flex Item Properties */\n\n/* Flex Grow - how much an item should grow */\n.flex-item-grow {\n    flex-grow: 1;              /* Takes up available space */\n}\n\n.flex-item-grow-2 {\n    flex-grow: 2;              /* Takes twice as much space */\n}\n\n/* Flex Shrink - how much an item should shrink */\n.no-shrink {\n    flex-shrink: 0;            /* Never shrink below its base size */\n}\n\n/* Flex Basis - initial size before growing/shrinking */\n.flex-basis-example {\n    flex-basis: 200px;         /* Start at 200px width */\n}\n\n/* Flex Shorthand - grow, shrink, basis */\n.flex-item-1 {\n    flex: 1;                   /* Equivalent to: flex: 1 1 0% */\n}\n\n.flex-item-auto {\n    flex: auto;                /* Equivalent to: flex: 1 1 auto */\n}\n\n.flex-item-none {\n    flex: none;                /* Equivalent to: flex: 0 0 auto */\n}\n\n/* Align Self - override container's align-items for individual item */\n.align-self-start {\n    align-self: flex-start;    /* Align to start of cross axis */\n}\n\n.align-self-center {\n    align-self: center;        /* Center on cross axis */\n}\n\n/* Order - change visual order without changing HTML */\n.order-first {\n    order: -1;                 /* Appears first */\n}\n\n.order-last {\n    order: 999;                /* Appears last */\n}"
      },
      {
        id: "practical-layouts",
        type: "code",
        title: "Common Flexbox Layout Patterns",
        language: "css",
        content: "/* 1. Navigation Bar */\n.navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 1rem 2rem;\n    background-color: #ffffff;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.nav-links {\n    display: flex;\n    gap: 2rem;\n    list-style: none;\n}\n\n/* 2. Card Layout */\n.card-container {\n    display: flex;\n    flex-wrap: wrap;           /* Allow items to wrap */\n    gap: 1.5rem;\n    padding: 2rem;\n}\n\n.card {\n    flex: 1 1 300px;          /* Grow, shrink, min-width 300px */\n    background: white;\n    border-radius: 8px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}\n\n/* 3. Sidebar Layout */\n.main-layout {\n    display: flex;\n    min-height: 100vh;\n}\n\n.sidebar {\n    flex: 0 0 250px;          /* Fixed width sidebar */\n    background-color: #f3f4f6;\n    padding: 1rem;\n}\n\n.main-content {\n    flex: 1;                   /* Takes remaining space */\n    padding: 2rem;\n}\n\n/* 4. Centered Content */\n.hero-section {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n    text-align: center;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n/* 5. Footer with Sticky Behavior */\n.page-container {\n    display: flex;\n    flex-direction: column;\n    min-height: 100vh;\n}\n\n.footer {\n    margin-top: auto;          /* Pushes footer to bottom */\n    background-color: #374151;\n    color: white;\n    padding: 2rem;\n}"
      },
      {
        id: "responsive-flexbox",
        type: "text",
        title: "Responsive Flexbox Design",
        content: "**Making Flexbox Responsive:**\n\n📱 **Mobile-First Approach**\n```css\n/* Mobile: Stack items vertically */\n.responsive-container {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}\n\n/* Tablet and up: Horizontal layout */\n@media (min-width: 768px) {\n    .responsive-container {\n        flex-direction: row;\n        align-items: center;\n    }\n}\n```\n\n🔧 **Flex Wrap for Dynamic Layouts**\n```css\n.flexible-grid {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n\n.flexible-grid > * {\n    flex: 1 1 calc(33.333% - 1rem);\n    min-width: 250px;\n}\n```\n\n✨ **Pro Tips:**\n• Use `flex-wrap: wrap` for responsive card grids\n• Combine `min-width` with `flex-basis` for better control\n• Use `gap` property instead of margins for spacing\n• Test on real devices, not just browser dev tools\n• Consider accessibility - ensure logical tab order\n\n**Common Flexbox Use Cases:**\n🧭 Navigation bars and menus\n📄 Form layouts and input groups\n🏪 Product grids and galleries\n📰 Article layouts with sidebars\n👥 Profile cards and user lists"
      }
    ]
  },
  "css-grid": {
    id: "css-grid",
    title: "CSS Grid for Complex Layouts",
    type: "text",
    duration: 35,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Introduction to CSS Grid",
        content: "CSS Grid is the most powerful layout system in CSS. It's a 2-dimensional system, meaning it can handle both columns and rows simultaneously. Grid is perfect for complex layouts, dashboards, and any design that requires precise control over both horizontal and vertical alignment."
      },
      {
        id: "grid-basics",
        type: "code",
        title: "CSS Grid Fundamentals",
        language: "css",
        content: "/* Basic Grid Setup */\n.grid-container {\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;    /* 3 columns: 1:2:1 ratio */\n    grid-template-rows: auto 1fr auto;     /* Header, content, footer */\n    gap: 1rem;                             /* Space between grid items */\n    min-height: 100vh;\n}\n\n/* Alternative column definitions */\n.three-column-fixed {\n    display: grid;\n    grid-template-columns: 200px 1fr 150px; /* Fixed-Flexible-Fixed */\n}\n\n.four-column-equal {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);   /* 4 equal columns */\n}\n\n.responsive-columns {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    /* Responsive: min 250px, fills available space */\n}\n\n/* Named Grid Lines */\n.named-grid {\n    display: grid;\n    grid-template-columns: \n        [sidebar-start] 250px \n        [sidebar-end main-start] 1fr \n        [main-end];\n    grid-template-rows:\n        [header-start] 60px\n        [header-end content-start] 1fr\n        [content-end footer-start] 50px\n        [footer-end];\n}\n\n/* Grid Areas (Template) */\n.layout-grid {\n    display: grid;\n    grid-template-areas:\n        \"header header header\"\n        \"sidebar main aside\"\n        \"footer footer footer\";\n    grid-template-columns: 200px 1fr 150px;\n    grid-template-rows: auto 1fr auto;\n    gap: 1rem;\n    min-height: 100vh;\n}"
      },
      {
        id: "grid-items",
        type: "code",
        title: "Positioning Grid Items",
        language: "css",
        content: "/* Grid Item Positioning */\n\n/* Using Line Numbers */\n.header {\n    grid-column: 1 / 4;        /* Span from column 1 to 4 */\n    grid-row: 1;               /* First row */\n    background-color: #3b82f6;\n    color: white;\n    padding: 1rem;\n}\n\n.sidebar {\n    grid-column: 1;            /* First column */\n    grid-row: 2;               /* Second row */\n    background-color: #f3f4f6;\n    padding: 1rem;\n}\n\n.main-content {\n    grid-column: 2 / 4;        /* Span columns 2-3 */\n    grid-row: 2;\n    padding: 2rem;\n}\n\n/* Using Span */\n.wide-item {\n    grid-column: span 2;       /* Span 2 columns */\n    grid-row: span 3;          /* Span 3 rows */\n}\n\n/* Using Named Areas */\n.grid-header {\n    grid-area: header;\n    background-color: #1f2937;\n    color: white;\n    display: flex;\n    align-items: center;\n    padding: 0 2rem;\n}\n\n.grid-sidebar {\n    grid-area: sidebar;\n    background-color: #f9fafb;\n    padding: 1rem;\n}\n\n.grid-main {\n    grid-area: main;\n    padding: 2rem;\n    background-color: white;\n}\n\n.grid-aside {\n    grid-area: aside;\n    background-color: #f3f4f6;\n    padding: 1rem;\n}\n\n.grid-footer {\n    grid-area: footer;\n    background-color: #374151;\n    color: white;\n    padding: 1rem;\n    text-align: center;\n}\n\n/* Auto-placement */\n.auto-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 1rem;\n    grid-auto-rows: 200px;     /* Auto-generated rows are 200px */\n}"
      },
      {
        id: "advanced-grid",
        type: "code",
        title: "Advanced Grid Techniques",
        language: "css",
        content: "/* 1. Card Gallery with Auto-fit */\n.photo-gallery {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 2rem;\n    padding: 2rem;\n}\n\n.photo-card {\n    background: white;\n    border-radius: 12px;\n    overflow: hidden;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    transition: transform 0.3s ease;\n}\n\n.photo-card:hover {\n    transform: translateY(-4px);\n}\n\n/* 2. Dashboard Layout */\n.dashboard {\n    display: grid;\n    grid-template-columns: 250px 1fr;\n    grid-template-rows: 60px 1fr;\n    height: 100vh;\n    grid-template-areas:\n        \"nav header\"\n        \"nav main\";\n}\n\n.dashboard-nav {\n    grid-area: nav;\n    background: #1e293b;\n    color: white;\n}\n\n.dashboard-header {\n    grid-area: header;\n    background: white;\n    border-bottom: 1px solid #e2e8f0;\n    display: flex;\n    align-items: center;\n    padding: 0 2rem;\n}\n\n.dashboard-main {\n    grid-area: main;\n    background: #f8fafc;\n    padding: 2rem;\n    overflow-y: auto;\n}\n\n/* 3. Magazine-style Layout */\n.magazine-layout {\n    display: grid;\n    grid-template-columns: repeat(6, 1fr);\n    grid-template-rows: repeat(4, 200px);\n    gap: 1rem;\n}\n\n.featured-article {\n    grid-column: 1 / 4;        /* Spans first 3 columns */\n    grid-row: 1 / 3;           /* Spans first 2 rows */\n    background: linear-gradient(45deg, #667eea, #764ba2);\n    color: white;\n}\n\n.secondary-article {\n    grid-column: 4 / 7;        /* Last 3 columns */\n    grid-row: 1;\n    background: #f8fafc;\n}\n\n.sidebar-content {\n    grid-column: 4 / 7;\n    grid-row: 2 / 4;\n    background: white;\n    border: 1px solid #e2e8f0;\n}\n\n/* 4. Responsive Grid */\n@media (max-width: 768px) {\n    .dashboard {\n        grid-template-columns: 1fr;\n        grid-template-rows: 60px auto 1fr;\n        grid-template-areas:\n            \"header\"\n            \"nav\"\n            \"main\";\n    }\n    \n    .dashboard-nav {\n        display: flex;\n        overflow-x: auto;\n        padding: 0.5rem;\n    }\n    \n    .magazine-layout {\n        grid-template-columns: 1fr;\n        grid-template-rows: auto;\n    }\n    \n    .featured-article,\n    .secondary-article,\n    .sidebar-content {\n        grid-column: 1;\n        grid-row: auto;\n    }\n}"
      },
      {
        id: "grid-vs-flexbox",
        type: "text",
        title: "Grid vs Flexbox: When to Use Each",
        content: "**CSS Grid vs Flexbox Decision Guide:**\n\n🏗️ **Use CSS Grid When:**\n• Creating complex, 2-dimensional layouts\n• Building dashboard interfaces\n• Designing magazine-style layouts\n• You need precise control over rows AND columns\n• Creating responsive galleries with varying item sizes\n• Building full page layouts\n\n🧩 **Use Flexbox When:**\n• Creating 1-dimensional layouts (navigation bars, button groups)\n• Aligning content within components\n• Building card layouts with equal heights\n• Centering content vertically and horizontally\n• Creating responsive navigation menus\n• Simple component layouts\n\n⚡ **Pro Tips:**\n• **Combine Both**: Use Grid for page layout, Flexbox for components\n• **Start with Grid**: For complex layouts, begin with Grid structure\n• **Mobile First**: Design for mobile, then enhance for larger screens\n• **Use Firefox DevTools**: Best grid debugging tools available\n\n**Common Patterns:**\n```css\n/* Page layout: Grid */\n.page {\n    display: grid;\n    grid-template-areas: \"header\" \"main\" \"footer\";\n}\n\n/* Component layout: Flexbox */\n.card {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n}\n```\n\n**Remember**: There's no wrong choice - both are powerful tools that can often achieve similar results!"
      }
    ]
  }
};

// Function to get CSS course content
export const getCSSContent = () => cssContent;