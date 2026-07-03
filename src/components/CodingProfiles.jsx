import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, GitFork, Star, Eye } from 'lucide-react';
import MouseGlow from './MouseGlow';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Generates simulated Github contributions (7 days * 25 weeks)
const generateMockContributions = () => {
  const contributions = [];
  const levels = [0, 1, 2, 3, 4];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let w = 0; w < 28; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      // Pick a random level, biased towards low but with regular active commits
      const levelIdx = Math.floor(Math.random() * 10);
      let level = 0;
      if (levelIdx > 8) level = 4;
      else if (levelIdx > 6) level = 3;
      else if (levelIdx > 4) level = 2;
      else if (levelIdx > 2) level = 1;
      
      const commits = level === 0 ? 0 : Math.floor(Math.random() * 6) + 1;
      week.push({ level, commits });
    }
    contributions.push(week);
  }
  return contributions;
};

export default function CodingProfiles() {
  const [contributions] = useState(generateMockContributions());
  const [activeSquare, setActiveSquare] = useState(null);

  // LeetCode metrics
  const leetcodeSolved = 342;
  const leetcodeTotal = 3000;
  const leetcodePercentage = (leetcodeSolved / leetcodeTotal) * 100;

  return (
    <section id="profiles" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-white dark:text-white light:text-slate-900"
          >
            Coding & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Activity Profiles</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* GitHub Activity Matrix - 7 Columns */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <MouseGlow className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full hover:border-cyan-500/20 transition-all">
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 dark:border-slate-900 light:border-slate-100">
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <GithubIcon size={20} />
                      <h3 className="text-lg font-bold font-display text-white dark:text-white light:text-slate-800">
                        GitHub Contributions
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-900 dark:bg-slate-900 light:bg-slate-100 px-2.5 py-1 rounded-full dark:text-slate-500 light:text-slate-650">
                      @kumar-aditya
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Continuous learning tracked in commits. Interactive heat-map illustrating mock/simulated project check-ins over the past six months.
                  </p>

                  {/* Heatmap Grid Wrapper */}
                  <div className="py-4 overflow-x-auto">
                    <div className="flex gap-[3px] min-w-[450px]">
                      {contributions.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.map((day, dIdx) => {
                            let color = 'bg-slate-900 dark:bg-slate-900 light:bg-slate-100'; // level 0
                            if (day.level === 1) color = 'bg-emerald-900/50 dark:bg-emerald-950 light:bg-emerald-100';
                            if (day.level === 2) color = 'bg-emerald-700/60 dark:bg-emerald-800 light:bg-emerald-300';
                            if (day.level === 3) color = 'bg-emerald-500 dark:bg-emerald-500 light:bg-emerald-500';
                            if (day.level === 4) color = 'bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600';

                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={() => setActiveSquare({ week: wIdx, day: dIdx, commits: day.commits })}
                                onMouseLeave={() => setActiveSquare(null)}
                                className={`w-3.5 h-3.5 rounded-[2px] cursor-pointer transition-all duration-100 hover:scale-125 hover:ring-1 hover:ring-white/50 ${color}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grid tooltip display details */}
                  <div className="h-6 flex items-center justify-between text-[10px] text-slate-550 dark:text-slate-500 light:text-slate-450 font-mono">
                    <div className="flex items-center space-x-1">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-slate-900 dark:bg-slate-900 light:bg-slate-100" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-900/50 dark:bg-emerald-950 light:bg-emerald-100" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-700/60 dark:bg-emerald-800 light:bg-emerald-300" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-500 dark:bg-emerald-500 light:bg-emerald-500" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600" />
                      <span>More</span>
                    </div>

                    {activeSquare ? (
                      <span className="text-cyan-400 font-semibold animate-pulse">
                        {activeSquare.commits === 0 ? 'No' : activeSquare.commits} commits on this day
                      </span>
                    ) : (
                      <span>Hover grid blocks for daily commit metrics</span>
                    )}
                  </div>
                </div>

                {/* GitHub stats numbers */}
                <div className="grid grid-cols-3 gap-4 pt-4 mt-6 border-t border-slate-900 dark:border-slate-900 light:border-slate-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white dark:text-white light:text-slate-800">12+</div>
                    <div className="text-[10px] text-slate-500 uppercase">Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white dark:text-white light:text-slate-800">450+</div>
                    <div className="text-[10px] text-slate-500 uppercase">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white dark:text-white light:text-slate-800">15+</div>
                    <div className="text-[10px] text-slate-500 uppercase">Stars Earned</div>
                  </div>
                </div>
              </MouseGlow>
            </motion.div>
          </div>

          {/* LeetCode stats panel - 5 columns */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <MouseGlow className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full hover:border-violet-500/20 transition-all">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 dark:border-slate-900 light:border-slate-100">
                    <div className="flex items-center space-x-2 text-violet-400">
                      <Code size={20} />
                      <h3 className="text-lg font-bold font-display text-white dark:text-white light:text-slate-800">
                        LeetCode Metrics
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-900 dark:bg-slate-900 light:bg-slate-100 px-2.5 py-1 rounded-full dark:text-slate-500 light:text-slate-650">
                      Active Solver
                    </span>
                  </div>

                  {/* Leetcode Circular layout and counts */}
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                    {/* circular progress svg */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="52"
                          stroke="rgba(30, 41, 59, 0.5)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="52"
                          stroke="url(#leetcodeGradient)"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 52}
                          strokeDashoffset={2 * Math.PI * 52 * (1 - leetcodePercentage / 100)}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="leetcodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-bold font-display text-white dark:text-white light:text-slate-800">{leetcodeSolved}</span>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Solved</p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 font-display w-full sm:w-auto">
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded bg-green-500" />
                          <span className="text-xs text-slate-300 dark:text-slate-350 light:text-slate-600 font-semibold w-16">Easy</span>
                        </div>
                        <span className="text-xs font-bold text-white dark:text-white light:text-slate-800">178 Solved</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded bg-yellow-500" />
                          <span className="text-xs text-slate-300 dark:text-slate-350 light:text-slate-600 font-semibold w-16">Medium</span>
                        </div>
                        <span className="text-xs font-bold text-white dark:text-white light:text-slate-800">142 Solved</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                          <span className="text-xs text-slate-300 dark:text-slate-350 light:text-slate-600 font-semibold w-16">Hard</span>
                        </div>
                        <span className="text-xs font-bold text-white dark:text-white light:text-slate-800">22 Solved</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 dark:border-slate-900 light:border-slate-100">
                  <a
                    href="https://leetcode.com/u/kumarAditya_7"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs font-semibold text-white tracking-wide transition-all dark:bg-slate-900 dark:border-slate-850 light:bg-slate-100 light:border-slate-200 light:text-slate-700"
                  >
                    <span>View LeetCode Profile</span>
                  </a>
                </div>
              </MouseGlow>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
