import { motion } from 'framer-motion';
import { Award, Code, Users, Calendar, ShieldCheck } from 'lucide-react';
import MouseGlow from './MouseGlow';

const TIMELINE_EVENTS = [
  {
    title: 'Vice President (Tech Lead)',
    organization: 'Galgotias Tech Council',
    period: '2024',
    icon: <Users size={20} className="text-violet-400" />,
    description: 'Elected to represent the premier technology council of Galgotias University. Spearheading tech events, guiding 200+ student developers, designing technical architectures, and managing cross-disciplinary developer cohorts.',
    colorClass: 'from-violet-500 to-indigo-500'
  },
  {
    title: 'Smart India Hackathon Participant',
    organization: 'Ministry of Education, Govt. of India',
    period: '2024',
    icon: <Code size={20} className="text-cyan-400" />,
    description: 'Participated in the prestigious national-level hackathon. Formed a development squad to model and code digital tools solving real-world government and industrial pain points under timed constraints.',
    colorClass: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Active LeetCode Problem Solver',
    organization: 'LeetCode Platform',
    period: 'Ongoing',
    icon: <Award size={20} className="text-amber-400" />,
    description: 'Practiced logical reasoning and complex data structures daily. Successfully resolved algorithmic hurdles on arrays, dynamic programming, and binary search trees to sharpen analytical capabilities.',
    colorClass: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Software Engineering Certification',
    organization: 'NPTEL (Swayam / IIT Kharagpur)',
    period: '2023',
    icon: <ShieldCheck size={20} className="text-emerald-400" />,
    description: 'Earned professional certification in core Software Engineering methodologies. Achieved deep mastery over agile lifecycles, project management matrices, testing paradigms, and unified modeling languages (UML).',
    colorClass: 'from-emerald-500 to-teal-500'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-white dark:text-white light:text-slate-900"
          >
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Activities</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative pl-10 md:pl-0">
          {/* Vertical central timeline line */}
          <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 pointer-events-none transform -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                  {/* Timeline dot icon inside the central track */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="absolute left-[2px] md:left-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center z-10 transform -translate-x-1/2 dark:bg-slate-950 dark:border-slate-800 light:bg-white light:border-slate-350 shadow-md shadow-violet-500/10"
                  >
                    {event.icon}
                  </motion.div>

                  {/* Left / Right content wrappers */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12 md:order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className="w-full"
                    >
                      <MouseGlow className="glass-card rounded-3xl p-6 md:p-8 hover:border-violet-500/30 transition-all duration-300">
                        {/* Period tag */}
                        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                          <Calendar size={12} />
                          <span>{event.period}</span>
                        </div>

                        {/* Title and Org */}
                        <h3 className="text-xl font-bold font-display text-white dark:text-white light:text-slate-850">
                          {event.title}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-semibold mb-4">
                          {event.organization}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-650 leading-relaxed">
                          {event.description}
                        </p>
                      </MouseGlow>
                    </motion.div>
                  </div>

                  {/* Empty Spacer side to balance layout on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
