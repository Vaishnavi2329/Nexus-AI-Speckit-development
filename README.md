# Nexus AI Landing Page

A modern, high-performance landing page for Nexus AI - an AI-powered productivity platform. Built with Next.js 16, TypeScript, Tailwind CSS, and cutting-edge web technologies.

> **🎓 Learning Project**: This project was developed as part of an internship to learn and demonstrate proficiency with **Speckit** - a modern development workflow and tooling system. The implementation showcases advanced React patterns, TypeScript best practices, and modern web development techniques.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Tubelight Navigation**: Unique glowing navigation effect
- **Smokey Cursor Effect**: Interactive WebGL particle system (desktop only)

### 🚀 **Performance Optimized**
- **Next.js 16**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **Lazy Loading**: Optimized component loading with intersection observers
- **Bundle Optimization**: Automatic code splitting and optimization
- **WebGL Shaders**: Hardware-accelerated visual effects

### 🛠 **Technology Stack**

#### **Frontend Framework**
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Static type checking

#### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library built on Radix UI
- **Framer Motion 12.35.0** - Animation library
- **Lucide React** - Beautiful icon library

#### **Form Handling**
- **React Hook Form 7.71.2** - Performant forms
- **Zod 4.3.6** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

#### **Development Tools**
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing
- **Babel React Compiler** - Experimental React optimizations

### 📱 **Page Sections**

1. **Hero Section** - Eye-catching landing with rotating keywords
2. **Problem Statement** - Addressing productivity challenges
3. **Features** - Showcase of AI capabilities
4. **Testimonials** - Social proof and customer stories
5. **How It Works** - Step-by-step process explanation
6. **Integrations** - Third-party service connections
7. **Demo** - Interactive product demonstration
8. **Pricing** - Tiered pricing plans with billing toggle
9. **FAQ** - Common questions and answers
10. **Contact** - Get in touch form
11. **Footer** - Comprehensive site navigation

### 🎯 **Interactive Elements**

#### **Visual Effects**
- **WebGL Shader Loaders** - Hardware-accelerated loading animations
- **CSS Fallbacks** - Graceful degradation for unsupported browsers
- **Particle Systems** - Dynamic cursor effects
- **Smooth Scrolling** - Enhanced navigation experience

#### **Speckit Integration**
- **Modern Development Workflow** - Demonstrates Speckit best practices
- **Component Architecture** - Modular, reusable component patterns
- **Type Safety** - Comprehensive TypeScript implementation
- **Performance Patterns** - Optimized rendering and state management

#### **User Interactions**
- **Theme Toggle** - Dark/light mode switching
- **Mobile Menu** - Responsive navigation drawer
- **Hover Effects** - Micro-interactions on all interactive elements
- **Loading States** - Optimistic UI with loading indicators

### 🔧 **Development Setup**

#### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

#### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd nexus-ai-landing

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

#### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

#### **Running Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 📦 **Available Scripts**

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### 🏗 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── shaders/            # WebGL shader pages
├── components/             # React components
│   ├── sections/          # Page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   └── ...
│   └── ui/                # UI components
│       ├── button.tsx
│       ├── navbar.tsx
│       ├── loading-*.tsx
│       └── ...
├── lib/                   # Utility functions
│   ├── analytics.ts       # Analytics tracking
│   ├── animations.ts      # Animation configurations
│   ├── utils.ts          # Helper functions
│   └── ...
└── hooks/                 # Custom React hooks
```

### 🎨 **Component Library**

The project uses **Shadcn/ui** components with custom configurations:

- **Buttons** - Multiple variants and sizes
- **Navigation** - Tubelight effect navbar
- **Loading States** - Various loading animations
- **Forms** - Input components with validation
- **Error Boundaries** - Graceful error handling

### 🌐 **Browser Support**

- **Chrome/Chromium** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### 📊 **Performance Features**

#### **Optimization Techniques**
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Next.js Font optimization
- **Bundle Analysis** - Built-in bundle analyzer
- **Caching Strategy** - Optimized caching headers

#### **WebGL Features**
- **Smart Detection** - Automatic WebGL capability detection
- **Graceful Fallbacks** - CSS alternatives for unsupported browsers
- **Performance Monitoring** - FPS and performance tracking
- **Resource Management** - Proper cleanup and memory management

### 🔒 **Security Features**

- **Type Safety** - Full TypeScript coverage
- **Input Validation** - Zod schema validation
- **XSS Protection** - Built-in Next.js security
- **CSRF Protection** - SameSite cookie policies

### 📱 **Mobile Optimization**

- **Touch Support** - Optimized touch interactions
- **Responsive Design** - Mobile-first approach
- **Performance** - Optimized for mobile networks
- **Accessibility** - WCAG 2.1 AA compliance

### 🎯 **Analytics & Tracking**

- **User Engagement** - Interaction tracking
- **Conversion Events** - Goal completion tracking
- **Performance Metrics** - Core Web Vitals monitoring
- **Error Tracking** - Automatic error reporting

### 🚀 **Deployment**

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### **Other Platforms**
The application can be deployed to any platform supporting Next.js:

- **Netlify**
- **AWS Amplify**
- **Google Cloud**
- **DigitalOcean**
- **Railway**

### 🎓 **Project Context & Learning Goals**

This project serves as a comprehensive learning experience for mastering **Speckit** - a modern development workflow and tooling system. Throughout this internship project, the following concepts and skills were demonstrated:

#### **Speckit Workflow Mastery**
- **Component-Driven Development** - Building reusable, composable UI components
- **Modern TypeScript Patterns** - Advanced type safety and generic implementations
- **Performance Optimization** - Efficient rendering, lazy loading, and bundle optimization
- **State Management** - React hooks, context providers, and local state patterns
- **API Integration** - Mock data structures and future API integration patterns

#### **Technical Skills Demonstrated**
- **WebGL Programming** - Custom shader implementations and particle systems
- **Animation Systems** - Framer Motion integration and custom animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG compliance and semantic HTML
- **Testing Strategies** - Component testing and error boundary implementation

#### **Professional Development**
- **Code Organization** - Scalable project structure and naming conventions
- **Documentation** - Comprehensive README and inline documentation
- **Version Control** - Git best practices and commit hygiene
- **Performance Monitoring** - Analytics integration and user behavior tracking

### 🤝 **Contributing**

This project welcomes contributions, especially those that demonstrate Speckit best practices:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Please ensure contributions follow Speckit patterns and maintain the learning project standards.**

### 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🆘 **Support**

For support and questions:

- 📧 Email: support@nexus-ai.com
- 💬 Discord: [Join our community](https://discord.gg/nexus-ai)
- 📖 Documentation: [docs.nexus-ai.com](https://docs.nexus-ai.com)

### 🌟 **Acknowledgments**

- **Next.js Team** - For the amazing framework
- **Vercel** - For the hosting platform
- **Shadcn/ui** - For the beautiful component library
- **Framer Motion** - For the smooth animations
- **Tailwind CSS** - For the utility-first CSS framework

---

**🎓 Internship Learning Project** - Developed as part of a Speckit learning internship to demonstrate modern web development proficiency and best practices.
