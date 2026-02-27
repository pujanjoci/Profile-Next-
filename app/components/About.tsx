import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export interface AboutProps {
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
  name = "Pujan",
  bio = "I'm a passionate full‑stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me reading sci‑fi, or experimenting with new technologies.",
  skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma'],
  profileImage = "/Pujan(ghandruk-sitting).png",
  themeColors = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-amber-400/20 to-pink-400/20"
  }
}: AboutProps) {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const shapeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* CSS-based Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Right Shape */}
        <motion.div 
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-bl-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl transform rotate-12"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {/* Bottom Left Shape */}
        <motion.div 
          className={`absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-tr-full bg-gradient-to-tr ${themeColors.secondary} dark:from-amber-900/20 dark:to-pink-900/20 blur-3xl transform -rotate-12`}
           variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
         {/* Center subtle grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Profile Image - Mobile First: Stacked at top */}
          <motion.div 
            className="w-full max-w-sm md:max-w-md lg:w-1/2 lg:max-w-none flex justify-center order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem]">
               {/* Decorative border/glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 rounded-3xl transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-l from-amber-400/20 to-pink-500/20 dark:from-amber-400/10 dark:to-pink-500/10 rounded-3xl transform -rotate-3 scale-105 group-hover:-rotate-6 transition-transform duration-500 blur-sm" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-xl">
                 <Image
                  src={profileImage}
                  alt={`${name} Profile`}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 448px, 512px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>

               {/* Decorative Badge */}
              {/* <motion.div 
                className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-xl border border-white/50 dark:border-neutral-700 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
              >
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Available for work</span>
                 </div>
              </motion.div> */}
              <motion.div 
                className="absolute md:hidden right-4 sm:-bottom-6 sm:-right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-xl border border-white/50 dark:border-neutral-700 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
              >
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Available for work</span>
                 </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content & Skills - Mobile First: Below image */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-2 space-y-6 sm:space-y-8"
            variants={containerVariants}
          >
            {/* Header / Intro */}
            <motion.div variants={itemVariants} className="space-y-4 w-full">
              <span className="inline-block text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-400 tracking-wide uppercase">
                Hi, I am
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {name}
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants}>
               <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                 {bio}
               </p>
            </motion.div>

             {/* Dynamic Line Separator */}
            <motion.div 
              variants={itemVariants} 
              className={`w-24 h-1.5 bg-gradient-to-r ${themeColors.primary} rounded-full lg:mx-0`} 
            />

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="w-full pt-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center lg:justify-start gap-3">
                 <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${themeColors.primary}`} />
                 Skills & Technologies
              </h3>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    custom={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: (idx) => ({
                        opacity: 1,
                        scale: 1,
                        transition: { delay: idx * 0.05, duration: 0.4, type: "spring", stiffness: 100 }
                      })
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md rounded-xl text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200/50 dark:border-neutral-700/50 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}