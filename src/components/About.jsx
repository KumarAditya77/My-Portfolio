import { motion } from 'framer-motion';
import { Award, GraduationCap, MapPin, Code2, Users } from 'lucide-react';
import MouseGlow from './MouseGlow';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-slate-900 dark:text-white"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Bio Card - 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              variants={itemVariants}
              className="glass-card rounded-3xl p-8 md:p-10 flex flex-col space-y-6"
            >
              <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-white">
                A passionate software developer building impactful solutions.
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I am currently a Computer Science & Engineering undergraduate at Galgotias University. Over the course of my academic journey, I have cultivated a deep fascination with frontend systems, full-stack architectures, and practical machine learning applications.
              </p>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                As a developer, I believe in learning by doing. Instead of just studying theories, I challenge myself by building real-world projects like <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Kheti-Badi</span>, an AI Smart Farming Platform, and <span className="text-violet-650 dark:text-violet-400 font-semibold">Ashraye</span>, a complete hotel reservation system. I am driven by curiosity, constantly mastering new technologies, and refining my engineering skills.
              </p>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Aside from coding, I am heavily involved in leadership. Serving as the Vice President & Tech Lead of the <span className="text-violet-650 dark:text-violet-400 font-semibold">Galgotias Tech Council</span>, I have organized technical events, guided peers, and collaborated in team environments, preparing myself for industry roles.
              </p>

              {/* Decorative key takeaways */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Code2 size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Focused</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Users size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Collaborative Leader</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Highlights Cards - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Picture Card */}
            <motion.div variants={itemVariants}>
              <MouseGlow className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-xl shadow-violet-500/10 overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Kumar Aditya"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-display text-slate-800 dark:text-white">Kumar Aditya</h4>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                    Galgotias University CSE
                  </p>
                </div>
              </MouseGlow>
            </motion.div>

            {/* Education Card */}
            <motion.div variants={itemVariants}>
              <MouseGlow className="glass-card rounded-3xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Education</span>
                    <h4 className="text-xl font-bold font-display text-slate-800 dark:text-white">Galgotias University</h4>
                    <p className="text-sm text-slate-650 dark:text-slate-400">B.Tech in Computer Science Engineering</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-sm font-semibold text-indigo-600 dark:text-cyan-400 border border-slate-250 dark:border-slate-700/60">
                      CGPA: 7.5
                    </div>
                  </div>
                </div>
              </MouseGlow>
            </motion.div>

            {/* Location Card */}
            <motion.div variants={itemVariants}>
              <MouseGlow className="glass-card rounded-3xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400">
                    <MapPin size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">Location</span>
                    <h4 className="text-xl font-bold font-display text-slate-800 dark:text-white">Greater Noida</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Uttar Pradesh, India</p>
                  </div>
                </div>
              </MouseGlow>
            </motion.div>

            {/* Fast Stats Card */}
            <motion.div variants={itemVariants}>
              <MouseGlow className="glass-card rounded-3xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                    <Award size={24} />
                  </div>
                  <div className="space-y-3 w-full">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Profile Stats</span>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50">
                        <div className="text-2xl font-bold text-slate-800 dark:text-white font-display">3+</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-450 uppercase tracking-wider">Projects</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50">
                        <div className="text-2xl font-bold text-slate-800 dark:text-white font-display">10+</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-450 uppercase tracking-wider">Tech Stack</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MouseGlow>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
