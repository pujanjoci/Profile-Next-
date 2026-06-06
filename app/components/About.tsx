import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';


export interface AboutProps {
  id?: string;
  name: string;
  bio: string;
  skills: string[];
  profileImage: string;
}

export default function About({
  id = "about",
  name = "Pujan",
  bio,
  skills = [],
  profileImage = "/Pujan(ghandruk-sitting)-profile.webp",
}: AboutProps) {

  // Dynamically categorize skills to present a highly structured and professional layout
  const categories = [
    {
      title: 'Core Stack',
      items: skills.filter(s => 
        ['react', 'next.js', 'typescript', 'tailwind css', 'javascript', 'js', 'html', 'css'].includes(s.toLowerCase())
      )
    },
    {
      title: 'Backend & Database',
      items: skills.filter(s => 
        ['node.js', 'express', 'mysql', 'supabase', 'postgresql', 'prisma', 'mongodb', 'rest apis', 'socket.io', 'json api'].includes(s.toLowerCase())
      )
    },
    {
      title: 'Design & Tools',
      items: skills.filter(s => 
        !['react', 'next.js', 'typescript', 'tailwind css', 'javascript', 'js', 'html', 'css',
          'node.js', 'express', 'mysql', 'supabase', 'postgresql', 'prisma', 'mongodb', 'rest apis', 'socket.io', 'json api'].includes(s.toLowerCase())
      )
    }
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      } 
    },
  };

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-100 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Asymmetric Editorial Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                01 / Profile
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white font-sans">
                About {name} Joshi
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="text-slate-600 dark:text-slate-300 space-y-6 text-base leading-relaxed font-normal">
              <p>
                {bio || "I am a web developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."}
              </p>
              <p>
                I specialize in Next.js, React, and Tailwind CSS. Over the years, I have built interactive web simulations (like a web-based Windows 11 desktop), multiplayer deduction games, and highly responsive web platforms for corporate clients. I prioritize writing clean, semantic code and approaching every project with design-system thinking.
              </p>
              <p>
                I believe that a great website must be fast, beautiful, and accessible. Rather than relying on generic templates, I design bespoke digital experiences tailored specifically to the problem at hand, ensuring every micro-interaction and spacing decision is purposeful.
              </p>
            </motion.div>

            {/* Clean Stats Row */}
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-white/5"
            >
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">5+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Years Coding</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">20+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Projects Built</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">Based in</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Nepal</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Frame & Tech Stack (5 Cols) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Minimalist Profile Picture Frame */}
            <motion.div variants={itemVariants} className="relative group w-full aspect-square max-w-[380px] mx-auto lg:mx-0">
              <div className="absolute inset-0 border border-slate-200 dark:border-white/10 rounded-2xl transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 duration-300" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Image
                  src={profileImage}
                  alt={`${name} Joshi`}
                  fill
                  sizes="(max-width: 640px) 320px, 380px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Minimal Status Badge */}
              <div className="absolute -bottom-3 left-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Floating Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full flex items-center gap-2"
            >
              <a
                href="/resume/Resume_Pujan-Joshi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium transition-all hover:bg-slate-800 dark:hover:bg-slate-100 gap-2 text-sm shadow-sm"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Structured Tech Stack Groupings */}
            <motion.div variants={itemVariants} className="space-y-6 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Core Competencies
              </h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  category.items.length > 0 && (
                    <div key={category.title} className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {category.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-slate-50 dark:bg-white/5 border border-slate-250/60 dark:border-white/5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-orange-500/30 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 cursor-default"
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

