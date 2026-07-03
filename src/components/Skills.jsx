import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import MouseGlow from './MouseGlow';

const SKILLS_DATA = [
  // Frontend
  { name: 'HTML5', category: 'Frontend', level: '90%', icon: '🌐' },
  { name: 'CSS3', category: 'Frontend', level: '85%', icon: '🎨' },
  { name: 'JavaScript', category: 'Frontend & Languages', level: '88%', icon: '💛' },
  { name: 'React.js', category: 'Frontend', level: '85%', icon: '⚛️' },
  { name: 'Tailwind CSS', category: 'Frontend', level: '90%', icon: '💨' },
  { name: 'Bootstrap', category: 'Frontend', level: '80%', icon: '💜' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', level: '78%', icon: '🟢' },
  { name: 'Express.js', category: 'Backend', level: '75%', icon: '🚂' },
  { name: 'Flask', category: 'Backend', level: '70%', icon: '🌶️' },

  // Programming
  { name: 'Java', category: 'Languages', level: '80%', icon: '☕' },
  { name: 'Python', category: 'Languages', level: '78%', icon: '🐍' },
  { name: 'SQL', category: 'Languages & Databases', level: '82%', icon: '📊' },

  // Database
  { name: 'MongoDB', category: 'Databases', level: '78%', icon: '🍃' },
  { name: 'MySQL', category: 'Databases', level: '80%', icon: '🐬' },

  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML', level: '65%', icon: '🧠' },
  { name: 'Keras', category: 'AI/ML', level: '60%', icon: '🤖' },

  // Tools
  { name: 'Git', category: 'Tools', level: '85%', icon: '🐙' },
  { name: 'GitHub', category: 'Tools', level: '88%', icon: '💻' },
  { name: 'Docker', category: 'Tools', level: '65%', icon: '🐳' },
  { name: 'VS Code', category: 'Tools', level: '90%', icon: '📝' },
  { name: 'Eclipse', category: 'Tools', level: '70%', icon: '🌌' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Languages', 'Databases', 'AI/ML', 'Tools'];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter skills based on tab and search query
  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      skill.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-violet-500/2 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-cyan-500/2 dark:bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-slate-900 dark:text-white"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 w-full">
          {/* Categories Tab selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800/80 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs md:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-500/80 transition-all dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-100"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <MouseGlow className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center h-32 group hover:border-violet-500/50 transition-colors duration-300">
                  <span className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 font-display">
                    {skill.name}
                  </span>
                  
                  {/* Skill Category Small Tag */}
                  <span className="text-[10px] text-slate-500 mt-1 dark:text-slate-500">
                    {skill.category.split(' & ')[0]}
                  </span>
                </MouseGlow>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state search result */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-500"
          >
            No skills found matching &quot;{searchQuery}&quot;
          </motion.div>
        )}
      </div>
    </section>
  );
}
