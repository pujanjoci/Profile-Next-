export interface ProjectDetail {
  role: string
  whatWasBuilt: string
  problemSolved: string
  features: string[]
}

export const customDetails: Record<string, ProjectDetail> = {
  "Modern E-Commerce": {
    role: "Full-Stack Developer & UI Designer",
    whatWasBuilt: "A custom high-performance e-commerce shopping storefront. The frontend is built using Next.js App Router and Tailwind CSS, featuring smooth client transitions, lazy-loaded product directories, a dynamic cart drawer, and user profile management. The database is integrated using Prisma ORM with PostgreSQL, and payments are handled securely using Stripe API integrations.",
    problemSolved: "E-commerce sites often suffer from sluggish rendering and delayed load times, which increase user bounce rates. By migrating database queries to Next.js server components and employing static optimization alongside incremental static regeneration, this storefront achieves a near-instantaneous load time, delivering a mobile-first fluid checkout flow.",
    features: [
      "Secure Stripe API checkout flow",
      "Dynamic responsive shopping cart state",
      "Fast product search and multi-layer categorization filters",
      "Prisma PostgreSQL schema modeling",
      "Fully accessible and responsive grid layouts"
    ]
  },
  "Windows 11 Simulation": {
    role: "Frontend Engineer & Interface Architect",
    whatWasBuilt: "An interactive, fully functional browser replication of the Windows 11 operating system environment. Features custom draggable and resizable windows, a fully simulated Start Menu, active system applications (e.g. VS Code, retro games, notepad, calculator), theme settings (dark/light), and custom desktop wallpapers.",
    problemSolved: "Static portfolio structures can struggle to hold recruiter engagement. Creating an operating system environment inside the browser showcases deep mastery of state synchronization (utilizing Zustand), framer-motion UI transitions, absolute element coordinate tracking, and performance optimization for heavy canvas elements.",
    features: [
      "Responsive absolute window layout manager",
      "Simulated VS Code, terminal, and browser web components",
      "Zustand global desktop state store",
      "Elegant dark and light theme toggles",
      "Keyboard shortcuts and folder navigation support"
    ]
  },
  "Personal Portfolio": {
    role: "Lead Frontend Developer",
    whatWasBuilt: "A retro developer command-line terminal theme portfolio. Users interact with the website by typing terminal commands (like cat, help, ls, clear) to browse portfolio sections, load ascii artwork, retrieve contact coordinates, and explore hidden easter egg minigames.",
    problemSolved: "Recruiters scan hundreds of standard resume sites daily, leading to screening fatigue. This gamified, terminal interface provides a memorable screening experience for technical recruiters while highlighting console execution logic, command parsing, and custom styling systems.",
    features: [
      "Realistic CLI input command parsing",
      "Simulated file system directories",
      "Interactive retro CRT scanline animations",
      "Easter egg mini-games hidden in shell commands",
      "Fully keyboard-interactive command history tracking"
    ]
  },
  "House Locator": {
    role: "Frontend Developer & UI/UX Designer",
    whatWasBuilt: "A real estate finder and property locator dashboard. Integrates search filter tools, property details preview blocks, map markers, and contact forms for interested buyers.",
    problemSolved: "Property lists often display cluttered layouts that load slowly. This locator simplifies browsing through high-speed client-side filtering, grid layout optimizations, and structured cards.",
    features: [
      "Interactive map pin visualizations",
      "Advanced search and price range filters",
      "Clean slide-in properties detail panels",
      "Mobile-optimized list-to-grid controls"
    ]
  },
  "Imposter Game": {
    role: "Lead Game Developer",
    whatWasBuilt: "A suspenseful real-time multiplayer social deduction web game. Built with Socket.io on the backend and React on the frontend, users are placed in game lobbies to vote out the hidden imposter.",
    problemSolved: "Low-latency multiplayer synchronization on the web is complex. This project showcases stable Socket.io server connection management, game lobby state syncing, and animated voting screens.",
    features: [
      "Real-time WebSocket multiplayer game loop",
      "Custom game lobby matching and player avatars",
      "Fluid voting screens and lobby chat tools",
      "Mobile-friendly gameplay controls"
    ]
  },
  "Novel Editor": {
    role: "Frontend Developer",
    whatWasBuilt: "A beautiful, Notion-style WYSIWYG rich text editor with AI-powered autocomplete assistance, slash command inputs, and inline bubble menus for streamlined formatting.",
    problemSolved: "Writing online can feel fragmented. This editor compiles tiptap extensions with Vercel AI SDK to create a writing dashboard that autocomplete lines in real-time.",
    features: [
      "Notion-style slash commands menu",
      "Tiptap rich text content parsing",
      "Vercel AI SDK text completion integration",
      "Bubble formatting toolbar panels"
    ]
  },
  "Developer Blog": {
    role: "Web Designer & Content Developer",
    whatWasBuilt: "A sleek, lightweight developer blog platform highlighting technical articles and markdown code guides, built using Next.js static site generation and MDX.",
    problemSolved: "Bloated blog templates load slow. This blog renders markdown as static HTML directly, achieving perfect Core Web Vitals and PageSpeed scores.",
    features: [
      "MDX custom text styling integration",
      "Static site generation (SSG) for instant page load",
      "Tailwind typography styles",
      "Descriptive search filters and article tags"
    ]
  },
  "Digital Wedding Invitation": {
    role: "Frontend Developer",
    whatWasBuilt: "A premium, highly interactive digital wedding invitation with elegant transitions, RSVPs, map integrations, and immersive custom typography.",
    problemSolved: "Standard cards are static and hard to share. This digital version features personalized maps and animated timelines to streamline details for guests.",
    features: [
      "Immersive Framer Motion scroll indicators",
      "Integrated RSVP details database form",
      "Google Maps location pins",
      "Premium typographic styling"
    ]
  },
  "Archio Designs": {
    role: "Full-Stack Developer & UI/UX Designer",
    whatWasBuilt: "A modern architectural and interior design showcase platform featuring high-resolution portfolio galleries, project case studies, and interactive design services.",
    problemSolved: "Architectural portfolios require showcasing heavy visual media without sacrificing load speed or responsive aesthetics. Built with Next.js and Tailwind CSS to deliver fast page loads, fluid image galleries, and elegant typography.",
    features: [
      "High-resolution interactive image galleries",
      "Clean responsive architectural layout",
      "Case study detail pages for design projects",
      "Lightweight fast-loading page transitions",
      "Mobile-optimized showcase design"
    ]
  }
}

export function getProjectDetail(title: string, description: string): ProjectDetail {
  if (customDetails[title]) {
    return customDetails[title]
  }
  // Dynamic high-quality fallback details
  return {
    role: "Lead Developer & Web Designer",
    whatWasBuilt: `A comprehensive custom-designed implementation of "${title}". Built using a responsive stack, the platform incorporates ${description.toLowerCase()} with clean semantic code principles.`,
    problemSolved: "Replacing legacy, slow-loading templates with modern, search-ranking-friendly web platforms that load in milliseconds, prioritize mobile readability, and capture user conversions.",
    features: [
      "Fully responsive and mobile-friendly layouts",
      "Clean CSS-first styling implementations",
      "SEO semantic structures and descriptive metadata tags",
      "High loading speed optimizations"
    ]
  }
}
