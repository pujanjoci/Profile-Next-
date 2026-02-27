# Personal Portfolio - Next.js & Tailwind CSS

A modern, responsive personal portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Features a dynamic typing effect, dark mode support, and a clean, professional design to showcase your work, skills, and contact information.

![Portfolio Preview](public/preview.png) <!-- Replace with actual screenshot -->

## ✨ Features

- **Dynamic Typing Effect** – Cycles through roles like "Web Designer", "Web Developer", etc.
- **Fully Responsive** – Optimized for all devices (mobile, tablet, desktop).
- **Dark / Light Mode** – Automatically respects user preference with a toggle option.
- **Smooth Animations** – Powered by Framer Motion for engaging transitions.
- **Optimized Images** – Uses Next.js Image component for automatic optimization.
- **SEO Friendly** – Built-in meta tags and semantic HTML.
- **Contact Section** – Integrated with a form or links to social profiles.
- **Project Showcase** – Grid layout to display your work with live/preview links.

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) – Animations
- [TypeScript](https://www.typescriptlang.org/) (optional, but recommended)
- [Lucide Icons](https://lucide.dev/) – Clean, consistent icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   Install dependencies:
   ```

bash
npm install

# or

yarn install

# or

pnpm install
Run the development server:

bash
npm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
text
├── public/ # Static assets (images, favicon, etc.)
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── layout.tsx # Root layout (includes metadata, fonts)
│ │ ├── page.tsx # Home page (Hero, About, Projects, Contact)
│ │ └── globals.css # Global Tailwind imports
│ ├── components/ # Reusable components
│ │ ├── Hero.tsx # Hero section with typing effect
│ │ ├── About.tsx # About me section
│ │ ├── Projects.tsx # Project cards grid
│ │ ├── Contact.tsx # Contact form / links
│ │ └── ThemeToggle.tsx # Dark mode toggle
│ └── styles/ # Additional CSS (if needed)
├── tailwind.config.ts # Tailwind configuration
├── next.config.js # Next.js configuration
├── tsconfig.json # TypeScript config
└── package.json
🎨 Customization

1. Update Personal Information
   Edit the data files or directly in components:

Hero: Change name, roles, and profile picture in components/Hero.tsx.

About: Write your bio and add skills in components/About.tsx.

Projects: Modify the projects array in components/Projects.tsx with your own project details (title, description, image, links).

Contact: Update social links and email in components/Contact.tsx.

2. Colors & Styling
   Primary color (orange) is used throughout. You can change it in tailwind.config.ts under theme.extend.colors.

Dark mode colors are handled via Tailwind’s dark: variant.

3. Typing Effect
   The typing effect cycles through a list of roles. To modify them, locate the roles array inside Hero.tsx:

tsx
const roles = ['Web Designer', 'Web Developer', 'Graphic Designer', 'Gamer']
Adjust the list to your preference.

4. Add More Sections
   You can easily add new sections (e.g., Blog, Resume) by creating a new component and importing it into src/app/page.tsx.

📦 Build for Production
bash
npm run build
npm start
The static export can be generated with next build && next export (if configured).

🌐 Deployment
Deploy on Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the Vercel Platform.

Push your code to a GitHub repository.

Import the project into Vercel.

It will automatically detect Next.js and deploy.

Other Platforms
Netlify: Use npm run build as the build command and set publish directory to out (if using static export).

GitHub Pages: Configure next.config.js with basePath and export static files.

📄 License
This project is open-source and available under the MIT License.

🙌 Acknowledgements
Next.js Documentation

Tailwind CSS Documentation

Framer Motion Examples

Icons by Lucide

Made with ❤️ by Pujan

This README is comprehensive and can be adapted to your actual project details. Make sure to replace placeholders like `yourusername`, `Your Name`, and add a real screenshot. If your project uses specific features or a different structure, modify accordingly.
