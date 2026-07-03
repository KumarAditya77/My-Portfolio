import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, X, Sparkles, MapPin, CloudSun, Calendar, ShieldCheck, Sliders } from 'lucide-react';
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

const PROJECTS_DATA = [
  {
    id: 'kheti-badi',
    title: 'Kheti-Badi',
    subtitle: 'AI-Powered Smart Farming Platform',
    category: 'AI / ML & Full Stack',
    tech: ['React', 'Flask', 'TensorFlow', 'Node.js', 'Bootstrap', 'Google Maps API'],
    description: 'Developed a full-stack AI platform that helps farmers optimize crop yields, predict weather patterns, and detect crop diseases using deep learning classifiers.',
    summary: 'A revolutionary smart agricultural tool bridging machine learning with daily farming. Solves crop yield deficits by diagnosing diseases via leaf photographs, forecasting seasonal weather, mapping historical outbreaks via Google Maps, and recommending watering schedules through a 5-week smart planner.',
    features: [
      'AI Crop Disease Detection: Uses CNN models to identify leaf infections.',
      'Gemini AI Chatbot: Resolves agricultural queries on crop health and fertilizers.',
      'Weather Forecasting: Multi-day predictive dashboards.',
      'Google Maps Disease Tracking: Heatmaps showing regional disease outbreaks.',
      '5-Week Irrigation Planner: Automated schedules depending on soil and heat metrics.',
      'Crop Profit Predictor: Interactive yield valuation calculator.'
    ],
    github: 'https://github.com/KumarAditya77/Kheti-Badi',
    live: 'https://github.com/KumarAditya77/Kheti-Badi',
  },
  {
    id: 'ashraye',
    title: 'Ashraye',
    subtitle: 'Luxury Hotel Booking Platform',
    category: 'Full Stack',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    description: 'A full-stack booking application with secure authentication, room availability engines, payment widgets, and custom admin analytics dashboards.',
    summary: 'A comprehensive travel reservation system designed with minimalist Stripe-like aesthetics. Includes customer profiles, granular filters (price range, ratings, luxury class), reservation validation, and a dashboard for hotel managers to update room inventories.',
    features: [
      'Flexible Hotel Room Search: Dynamic filtering based on room class, beds, and availability.',
      'Secure User Authentication: JSON Web Tokens (JWT) for customer logins.',
      'State-managed Booking flow: Holds dates and calculates tax metrics in real-time.',
      'Granular Admin Dashboard: Managers can oversee reservations, revenue metrics, and user feedback.',
      'Responsive Mobile Interface: Tailored viewport layouts for smartphones.'
    ],
    github: 'https://github.com/KumarAditya77/Ashraye-Hotel-Booking',
    live: 'https://github.com/KumarAditya77/Ashraye-Hotel-Booking',
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast',
    subtitle: 'Interactive Climate Widget',
    category: 'Frontend',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Weather API'],
    description: 'Clean responsive weather dashboard using browser APIs to pull live global meteorological indicators, air quality indexes, and wind forecasts.',
    summary: 'A lightweight and beautiful weather application built with raw ES6 JavaScript and CSS. Integrates OpenWeather API to render real-time conditions based on user geographic search queries with fluid transition effects.',
    features: [
      'Live Weather data: Current temperature, barometric pressure, wind speeds, and UV logs.',
      'City Search lookup: Global city parsing.',
      'Adaptive UI backgrounds: Dynamically shifts themes depending on local daylight and weather status (rain, snow, sun).',
      'Fully Mobile Optimized: Clean flexbox layouts.'
    ],
    github: 'https://github.com/KumarAditya77/Weather-Forecasting',
    live: 'https://kumaraditya77.github.io/Weather-Forecasting/',
  }
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  // Kheti Badi Simulator state
  const [kbCrop, setKbCrop] = useState('Tomato');
  const [kbLoading, setKbLoading] = useState(false);
  const [kbResult, setKbResult] = useState(null);

  // Weather Widget state
  const [weatherQuery, setWeatherQuery] = useState('Noida');
  const [weatherData, setWeatherData] = useState({
    temp: '32°C',
    condition: 'Sunny',
    humidity: '62%',
    wind: '12 km/h'
  });

  const runKhetiBadiSimulation = () => {
    setKbLoading(true);
    setKbResult(null);
    setTimeout(() => {
      setKbLoading(false);
      if (kbCrop === 'Tomato') {
        setKbResult({
          disease: 'Tomato Early Blight (Alternaria solani)',
          confidence: '94.2%',
          recommendation: 'Apply copper-based fungicides. Prune lower leaves to enhance air circulation and prevent soil splashing.',
          status: 'Treatable'
        });
      } else if (kbCrop === 'Potato') {
        setKbResult({
          disease: 'Potato Late Blight (Phytophthora infestans)',
          confidence: '97.5%',
          recommendation: 'Remove infected foliage immediately. Spray chlorothalonil fungicide. Keep tubers covered with dry soil.',
          status: 'Critical Alert'
        });
      } else {
        setKbResult({
          disease: 'Wheat Leaf Rust (Puccinia triticina)',
          confidence: '89.7%',
          recommendation: 'Sow rust-resistant seed cultivars. Apply triazole fungicide in early growth stage.',
          status: 'Treatable'
        });
      }
    }, 1500);
  };

  const handleWeatherSearch = (e) => {
    e.preventDefault();
    const city = weatherQuery.trim();
    if (!city) return;
    
    // Simple simulated weather responses
    const temps = ['24°C', '35°C', '18°C', '29°C', '40°C'];
    const conditions = ['Clear Sky', 'Scattered Clouds', 'Light Rain', 'Heavy Thunderstorm', 'Dust Storm'];
    const humidities = ['45%', '72%', '90%', '55%', '30%'];
    const winds = ['8 km/h', '15 km/h', '24 km/h', '5 km/h', '30 km/h'];
    
    const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setWeatherData({
      temp: temps[hash % temps.length],
      condition: conditions[hash % conditions.length],
      humidity: humidities[hash % humidities.length],
      wind: winds[hash % winds.length]
    });
  };

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'AI / ML') return p.category.includes('AI');
    if (selectedFilter === 'Full Stack') return p.category.includes('Full Stack') && !p.category.includes('AI');
    if (selectedFilter === 'Frontend') return p.category.includes('Frontend');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-white dark:text-white light:text-slate-900"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {['All', 'AI / ML', 'Full Stack', 'Frontend'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 text-xs md:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-slate-800 border border-slate-700 text-cyan-400 dark:bg-slate-850 dark:border-slate-700 light:bg-slate-200 light:border-slate-350 light:text-indigo-600'
                  : 'text-slate-400 hover:text-slate-100 dark:text-slate-400 dark:hover:text-slate-100 light:text-slate-600 light:hover:text-slate-950 border border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MouseGlow className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between h-[420px] hover:border-violet-500/30 transition-colors duration-300">
                  <div className="space-y-4">
                    {/* Category Label */}
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full dark:bg-cyan-950/30 light:bg-cyan-50 light:text-cyan-600">
                      {project.category}
                    </span>

                    {/* Titles */}
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold font-display text-white dark:text-white light:text-slate-850">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-650 line-clamp-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-hidden">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 dark:bg-slate-900 dark:border-slate-800 light:bg-slate-100 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-600">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 text-slate-500 dark:text-slate-500 light:text-slate-400 font-medium">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA button */}
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full flex items-center justify-between py-2 text-xs font-semibold tracking-wide text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
                    >
                      <span>View Case Study & Interactive Demo</span>
                      <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </MouseGlow>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Sliding Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Slider Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-slate-950 border-l border-slate-900 shadow-2xl z-50 p-6 md:p-8 overflow-y-auto pointer-events-auto dark:bg-slate-950 dark:border-slate-900 light:bg-white light:border-slate-200"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-900 dark:border-slate-900 light:border-slate-100">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                  Case Study
                </span>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer dark:bg-slate-900 dark:hover:bg-slate-800 light:bg-slate-100 light:hover:bg-slate-250 light:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="space-y-6 pt-6">
                <div>
                  <h3 className="text-3xl font-bold font-display text-white dark:text-white light:text-slate-850">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-cyan-400 font-semibold mt-1">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  {activeProject.summary}
                </p>

                {/* Tech stack row */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 dark:bg-slate-900 dark:border-slate-800 light:bg-slate-100 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Features */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Key Features</h4>
                  <ul className="space-y-2.5">
                    {activeProject.features.map((feat, i) => {
                      const [label, desc] = feat.split(': ');
                      return (
                        <li key={i} className="flex items-start text-sm text-slate-450 dark:text-slate-400 light:text-slate-650">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 mr-2.5 shrink-0" />
                          <div>
                            <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{label}:</strong> {desc}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-950 text-white transition-all dark:bg-slate-900 dark:border-slate-800 light:bg-slate-100 light:border-slate-200 light:text-slate-700"
                  >
                    <GithubIcon size={16} />
                    <span>View Repository</span>
                  </a>
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 text-white transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>

                {/* INTERACTIVE SIMULATORS PANEL */}
                <div className="pt-6 border-t border-slate-900 dark:border-slate-900 light:border-slate-100 space-y-4">
                  <div className="flex items-center space-x-2 text-violet-400">
                    <Sparkles size={18} />
                    <h4 className="text-sm font-bold font-display uppercase tracking-widest">Interactive Component Demo</h4>
                  </div>

                  {/* Kheti Badi Sim */}
                  {activeProject.id === 'kheti-badi' && (
                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-850 dark:bg-slate-900/50 dark:border-slate-850 light:bg-slate-50 light:border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-650">Select Crop Leaf Sample:</span>
                        <div className="flex space-x-2">
                          {['Tomato', 'Potato', 'Wheat'].map((c) => (
                            <button
                              key={c}
                              onClick={() => setKbCrop(c)}
                              className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                kbCrop === c
                                  ? 'bg-violet-600 border-violet-500 text-white'
                                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white dark:bg-slate-900/50 dark:border-slate-800 light:bg-white light:border-slate-200 light:text-slate-500'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={runKhetiBadiSimulation}
                        disabled={kbLoading}
                        className="w-full flex items-center justify-center py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {kbLoading ? 'RUNNING DEEP LEARNING CLASSIFIER...' : `ANALYZE ${kbCrop.toUpperCase()} LEAF IMAGE`}
                      </button>

                      {kbLoading && (
                        <div className="flex justify-center py-4">
                          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      {kbResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 dark:bg-slate-950/80 dark:border-slate-800 light:bg-white light:border-slate-200 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">Disease Classification:</span>
                            <span className="text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 uppercase tracking-wider">{kbResult.status}</span>
                          </div>
                          <p className="text-slate-350 dark:text-slate-300 light:text-slate-650"><strong className="text-cyan-400">Diagnosis:</strong> {kbResult.disease}</p>
                          <p className="text-slate-350 dark:text-slate-300 light:text-slate-650"><strong className="text-cyan-400">Confidence Score:</strong> {kbResult.confidence}</p>
                          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 leading-relaxed"><strong className="text-violet-400">Treatment Plan:</strong> {kbResult.recommendation}</p>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Ashraye Booking Simulator */}
                  {activeProject.id === 'ashraye' && (
                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-850 dark:bg-slate-900/50 dark:border-slate-850 light:bg-slate-50 light:border-slate-200 space-y-3">
                      <h5 className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-850 flex items-center space-x-1.5">
                        <ShieldCheck size={14} className="text-cyan-400" />
                        <span>Manager Admin Console Mockup</span>
                      </h5>
                      <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 dark:bg-slate-950 dark:border-slate-900 light:bg-white light:border-slate-200 space-y-1">
                          <span className="text-slate-500">Active Bookings</span>
                          <p className="text-base font-bold text-emerald-400">48 / 60 Rooms</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 dark:bg-slate-950 dark:border-slate-900 light:bg-white light:border-slate-200 space-y-1">
                          <span className="text-slate-500">Monthly Revenue</span>
                          <p className="text-base font-bold text-violet-400">$18,450</p>
                        </div>
                      </div>
                      
                      {/* Active Bookings Log list */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 dark:bg-slate-950 dark:border-slate-900 light:bg-white light:border-slate-200 space-y-2 text-[10px] font-mono">
                        <span className="text-slate-500 block border-b border-slate-900 pb-1">Incoming Bookings Logs</span>
                        <div className="flex justify-between text-slate-300 dark:text-slate-350 light:text-slate-600">
                          <span>User #1042 - Suite 402</span>
                          <span className="text-emerald-400">PAID</span>
                        </div>
                        <div className="flex justify-between text-slate-300 dark:text-slate-350 light:text-slate-600">
                          <span>User #0981 - Deluxe 208</span>
                          <span className="text-emerald-400">PAID</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weather Forecast Simulator */}
                  {activeProject.id === 'weather-app' && (
                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-850 dark:bg-slate-900/50 dark:border-slate-850 light:bg-slate-50 light:border-slate-200 space-y-4">
                      <form onSubmit={handleWeatherSearch} className="flex gap-2">
                        <input
                          type="text"
                          value={weatherQuery}
                          onChange={(e) => setWeatherQuery(e.target.value)}
                          placeholder="Enter city..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none dark:bg-slate-950 dark:border-slate-850 light:bg-white light:border-slate-250 light:text-slate-800"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs cursor-pointer"
                        >
                          Search
                        </button>
                      </form>

                      {/* Display Results */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between dark:bg-slate-950 dark:border-slate-850 light:bg-white light:border-slate-200">
                        <div className="flex items-center space-x-3">
                          <CloudSun size={32} className="text-amber-400 animate-pulse-slow" />
                          <div>
                            <h6 className="text-sm font-bold text-white dark:text-white light:text-slate-800">{weatherQuery}</h6>
                            <p className="text-[10px] text-slate-500 uppercase">{weatherData.condition}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold font-display text-white dark:text-white light:text-slate-800">{weatherData.temp}</span>
                          <p className="text-[9px] text-slate-500">Humidity: {weatherData.humidity} | Wind: {weatherData.wind}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
