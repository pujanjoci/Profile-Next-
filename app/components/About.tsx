import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Star } from 'lucide-react';
import Link from 'next/link';
import defaultProfileImage from '@/public/chatgpt-headshot.webp';

export interface AboutProps {
  id?: string;
  name?: string;
  bio?: string;
  skills?: string[];
  profileImage?: any;
}

export default function About({
  id = "about",
  name = "Pujan",
  bio,
  skills = [],
  profileImage = defaultProfileImage,
}: AboutProps) {
  const defaultSkills = skills.length > 0 ? skills : [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS',
    'MySQL', 'Supabase', 'Node.js', 'Git/GitHub', 'Figma', 'Canva', 'Photoshop'
  ];

  // Dynamically categorize skills to present a structured and clean view
  const categories = [
    {
      title: 'Frontend Expertise',
      items: defaultSkills.filter(s => 
        ['react', 'next.js', 'typescript', 'tailwind css', 'javascript', 'js', 'html', 'css', 'html5', 'css3'].includes(s.toLowerCase())
      )
    },
    {
      title: 'Backend & Database',
      items: defaultSkills.filter(s => 
        ['node.js', 'express', 'mysql', 'supabase', 'postgresql', 'prisma', 'mongodb', 'rest apis', 'json apis', 'socket.io', 'json api', 'git/github'].includes(s.toLowerCase())
      )
    },
    {
      title: 'Design & Tools',
      items: defaultSkills.filter(s => 
        !['react', 'next.js', 'typescript', 'tailwind css', 'javascript', 'js', 'html', 'css', 'html5', 'css3',
          'node.js', 'express', 'mysql', 'supabase', 'postgresql', 'prisma', 'mongodb', 'rest apis', 'json apis', 'socket.io', 'json api', 'git/github'].includes(s.toLowerCase())
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-100 dark:border-white/5"
    >
      {/* Decorative gradient glow blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-500/5 dark:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Editorial Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Visual Photo, Philosophy & Resume CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Glowing Profile Image Frame */}
            <motion.div variants={itemVariants} className="relative group w-full aspect-square max-w-[380px] mx-auto lg:mx-0">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10">
                <Image
                  src={profileImage}
                  alt="Pujan Joshi web designer and developer portfolio"
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  priority
                />
              </div>

              {/* Status Indicator Badge */}
              <div className="absolute -bottom-3 left-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Following a <span className="text-emerald-500">Growth Mindset</span>
                </span>
              </div>
            </motion.div>

            {/* Philosophy Card */}
            <motion.div 
              variants={itemVariants} 
              className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-neutral-900/30 backdrop-blur-md shadow-sm max-w-[380px] mx-auto lg:mx-0"
            >
              <h3 className="font-bold mb-3 text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                <Star size={16} className="text-orange-500 fill-orange-500" />
                My Philosophy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed font-normal">
                I believe that a great website must be fast, beautiful, and accessible. Rather than relying on generic templates, I design bespoke digital experiences tailored specifically to the problem at hand, ensuring every micro-interaction and spacing decision is purposeful.
              </p>
            </motion.div>

            {/* Resume Button */}
            <motion.div variants={itemVariants} className="max-w-[380px] mx-auto lg:mx-0">
              <Link
                href="/resume"
                className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold rounded-xl shadow-md dark:shadow-none transition-all duration-300 gap-2 text-sm cursor-pointer"
              >
                <FileText size={16} />
                View Resume
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Bio & Skills list (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 block mb-2">
                01 / ABOUT ME
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white font-sans">
                My Journey
              </h2>
              <div className="h-1 w-20 bg-orange-500 mt-4 rounded-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-slate-600 dark:text-slate-300 space-y-5 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                {bio || "I am a web developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."}
              </p>
              <p>
                I specialize in Next.js, React, and Tailwind CSS. Over the years, I have built interactive web simulations (like a web-based Windows 11 desktop), multiplayer deduction games, and highly responsive web platforms for corporate clients. I prioritize writing clean, semantic code and approaching every project with design-system thinking.
              </p>
            </motion.div>

            {/* Categorized Skills section */}
            <motion.div variants={itemVariants} className="space-y-6 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Skills & Tech Stack
              </h3>
              
              <div className="space-y-5">
                {categories.map((category) => (
                  category.items.length > 0 && (
                    <div key={category.title} className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest">
                        {category.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 dark:bg-neutral-900/40 dark:border-white/5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 hover:border-orange-500/30 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-200 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
