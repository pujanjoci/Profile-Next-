import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Database, 
  Palette, 
  Code2
} from 'lucide-react';

export interface AboutProps {
  id?: string;
  name: string;
  bio: string;
  skills: string[];
  profileImage: string;
  themeColors?: {
    primary: string;
    secondary: string;
  };
}

export default function About({
  id = "about",
  name = "Pujan",
  bio = "I'm a passionate full‑stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me reading sci‑fi, or experimenting with new technologies.",
  skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop'],
  profileImage = "/Pujan(ghandruk-sitting)-profile.webp",
}: AboutProps) {

  // Dynamically categorize skills to present a highly structured and professional layout
  const categorizedSkills = (() => {
    const frontend = skills.filter(s => 
      ['react', 'next.js', 'typescript', 'tailwind css', 'framer motion', 'three.js', 'html', 'css', 'javascript', 'js', 'vite', 'ui/ux'].includes(s.toLowerCase())
    );
    const backend = skills.filter(s => 
      ['node.js', 'express', 'socket.io', 'postgresql', 'mysql', 'supabase', 'prisma', 'mongodb', 'rest apis', 'json api', 'stripe api', 'algorithms', 'database'].includes(s.toLowerCase())
    );
    const tools = skills.filter(s => 
      !['react', 'next.js', 'typescript', 'tailwind css', 'framer motion', 'three.js', 'html', 'css', 'javascript', 'js', 'vite', 'ui/ux',
        'node.js', 'express', 'socket.io', 'postgresql', 'mysql', 'supabase', 'prisma', 'mongodb', 'rest apis', 'json api', 'stripe api', 'algorithms', 'database'].includes(s.toLowerCase())
    );

    return [
      {
        title: 'Frontend Architecture',
        icon: <Cpu className="w-5 h-5 text-orange-400" />,
        list: frontend.length > 0 ? frontend : ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
      },
      {
        title: 'Backend & Database',
        icon: <Database className="w-5 h-5 text-amber-400" />,
        list: backend.length > 0 ? backend : ['Node.js', 'PostgreSQL', 'Prisma', 'Socket.io']
      },
      {
        title: 'Creative & Tools',
        icon: <Palette className="w-5 h-5 text-pink-400" />,
        list: tools.length > 0 ? tools : ['Figma', 'Git/GitHub', 'Web Performance', 'SEO']
      }
    ];
  })();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const shapeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 text-slate-950 py-24 transition-colors duration-300 dark:bg-neutral-950 dark:text-white sm:py-32"
    >
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[10%] -right-[5%] w-[45vw] h-[45vw] rounded-full bg-orange-500/5 blur-[120px]"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.div 
          className="absolute -bottom-[10%] -left-[5%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[140px]"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Subtle dot grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-70 dark:bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Profile Image & Stats Card Column (Left Side) */}
          <motion.div 
            className="w-full max-w-md lg:w-5/12 flex flex-col items-center gap-8 order-2 lg:order-1"
            variants={itemVariants}
          >
            {/* Elegant Glowing Profile Frame */}
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Outer brand glows */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2.5rem] transform rotate-3 scale-[1.03] group-hover:rotate-6 group-hover:scale-[1.05] transition-all duration-500 blur-md" />
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/15 to-blue-500/15 rounded-[2.5rem] transform -rotate-3 scale-[1.03] group-hover:-rotate-6 group-hover:scale-[1.05] transition-all duration-500 blur-md" />

              {/* Clean Image Container */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900">
                <Image
                  src={profileImage}
                  alt={`${name} Profile`}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 400px"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                
                {/* Visual overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-80 dark:from-neutral-950/60" />
              </div>

              {/* Pulsing Availability Status Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-slate-200 flex items-center gap-2.5 whitespace-nowrap dark:border-white/10 dark:bg-neutral-900/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wider text-slate-700 uppercase dark:text-slate-300">Available for work</span>
              </div>
            </div>

            {/* Premium Highlights / Performance Stats Panel */}
            <div className="w-full mt-6 grid grid-cols-3 gap-4 p-5 rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:border-white/5 dark:bg-neutral-900/30 dark:shadow-none">
              <div className="text-center border-r border-slate-200 dark:border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">5+</div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1.5">Years Experience</div>
              </div>
              <div className="text-center border-r border-slate-200 dark:border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">22</div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1.5">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">10+</div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1.5">Technologies</div>
              </div>
            </div>
          </motion.div>

          {/* Description & Structured Tech Stack Column (Right Side) */}
          <motion.div 
            className="w-full lg:w-7/12 flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-2 space-y-8"
            variants={containerVariants}
          >
            {/* Header Badge & Title */}
            <motion.div variants={itemVariants} className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-bold text-orange-400 tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight dark:text-white">
                About{' '}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  {name}
                </span>
              </h2>
            </motion.div>

            {/* Professional Bio */}
            <motion.div variants={itemVariants} className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl dark:text-slate-300">
              <p>
                {bio}
              </p>
              <p>
                My focus lies in building high-performance web systems, retro game simulations, real-time multiplayer applications, and polished corporate interfaces. I bridge the gap between creative visual designs and robust frontend-to-backend engineering.
              </p>
            </motion.div>

            {/* Orange Accent Line */}
            <motion.div 
              variants={itemVariants} 
              className="w-20 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" 
            />

            {/* Categorized Skills Panels */}
            <motion.div variants={itemVariants} className="w-full pt-2">
              <h3 className="text-lg font-bold tracking-widest uppercase text-slate-500 mb-6 flex items-center justify-center lg:justify-start gap-2.5 dark:text-slate-400">
                <Code2 className="w-4 h-4 text-orange-500" />
                <span>Professional Core Capabilities</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {categorizedSkills.map((category) => (
                  <div 
                    key={category.title}
                    className="p-5 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl hover:border-slate-300 transition-all duration-300 flex flex-col gap-4 text-left group shadow-lg shadow-slate-200/40 dark:border-white/5 dark:bg-neutral-900/30 dark:hover:border-white/10 dark:shadow-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-orange-500/10 group-hover:scale-105 transition-all duration-300 dark:bg-white/5">
                        {category.icon}
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">{category.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {category.list.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-orange-500/5 hover:text-orange-500 hover:border-orange-500/20 transition-all duration-300 cursor-default dark:bg-white/[0.03] dark:border-white/5 dark:text-slate-400 dark:hover:text-orange-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
