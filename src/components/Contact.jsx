import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Download } from 'lucide-react';
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

const LinkedinIcon = ({ size = 20, className = "" }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setStatus('loading');
    
    // To receive real email alerts:
    // 1. Go to https://web3forms.com/ and submit your email to get a free Access Key.
    // 2. Paste your Access Key below (replace "YOUR_WEB3FORMS_ACCESS_KEY" with it).
    const WEB3FORMS_ACCESS_KEY = "a8d59de6-2184-43d3-b92b-652229df34d8";
    
    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      // Simulation Mode fallback
      setTimeout(() => {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, 1500);
      return;
    }
    
    // Real Email Mode using Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "Portfolio Contact Form Message",
          message: formState.message
        })
      });
      
      const resData = await response.json();
      if (resData.success) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-4 text-white dark:text-white light:text-slate-900"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
          />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Details - 5 Columns */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <MouseGlow className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full hover:border-violet-500/20 transition-all">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-white dark:text-white light:text-slate-800">
                      Let&apos;s build something great.
                    </h3>
                    <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                      I am actively seeking software engineering roles and internships. If you have an opportunity or want to discuss my projects, drop a message!
                    </p>
                  </div>

                  {/* Icon details */}
                  <div className="space-y-6">
                    <a
                      href="mailto:kumaraditya007376@gmail.com"
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-100 hover:bg-slate-200/50 border border-slate-200 hover:border-cyan-500/30 transition-all group duration-300 w-full cursor-pointer dark:bg-slate-900/40 dark:border-slate-800/80 dark:hover:bg-slate-900/60"
                    >
                      <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Email Me</span>
                        <span className="text-sm text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-450 transition-colors font-semibold font-display">
                          kumaraditya007376@gmail.com
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center space-x-4">
                      <div className="p-3.5 rounded-2xl bg-violet-500/10 text-violet-400">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Location</span>
                        <span className="text-sm text-slate-200 font-semibold dark:text-slate-200 light:text-slate-750">
                          Greater Noida, Uttar Pradesh, India
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Download Action */}
                <div className="pt-8 border-t border-slate-900 dark:border-slate-900 light:border-slate-100 flex flex-col gap-4 mt-8">
                  <a
                    href="/Aditya_Resume.pdf"
                    download="Kumar_Aditya_Resume.pdf"
                    className="flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 text-white font-semibold text-sm shadow-lg shadow-violet-500/10 transition-all cursor-pointer"
                  >
                    <Download size={18} />
                    <span>Download Official Resume</span>
                  </a>

                  {/* Social Buttons */}
                  <div className="flex justify-center space-x-4 mt-2">
                    <a
                      href="https://github.com/KumarAditya77"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-750 transition-all dark:bg-slate-900 dark:border-slate-800 light:bg-slate-100 light:border-slate-200"
                    >
                      <GithubIcon size={18} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kumar-aditya-a04063272/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-slate-750 transition-all dark:bg-slate-900 dark:border-slate-800 light:bg-slate-100 light:border-slate-200"
                    >
                      <LinkedinIcon size={18} />
                    </a>
                  </div>
                </div>
              </MouseGlow>
            </motion.div>
          </div>

          {/* Form - 7 Columns */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-6 h-full hover:border-violet-500/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-violet-500/80 transition-all dark:bg-slate-900/40 dark:border-slate-800/80 light:bg-slate-100 light:border-slate-200 light:text-slate-800"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-violet-500/80 transition-all dark:bg-slate-900/40 dark:border-slate-800/80 light:bg-slate-100 light:border-slate-200 light:text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Opportunity details..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-violet-500/80 transition-all dark:bg-slate-900/40 dark:border-slate-800/80 light:bg-slate-100 light:border-slate-200 light:text-slate-800"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Hi Aditya, I would love to talk about..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-violet-500/80 transition-all resize-none dark:bg-slate-900/40 dark:border-slate-800/80 light:bg-slate-100 light:border-slate-200 light:text-slate-800"
                    />
                  </div>
                </div>

                {/* Submit / Status Button */}
                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center space-x-2 font-medium"
                      >
                        <CheckCircle size={18} />
                        <span>Message Sent Successfully!</span>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full py-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center space-x-2 font-medium dark:text-rose-400"
                      >
                        <span>Failed to send email. Check API key.</span>
                      </motion.div>
                    )}
                    {(status === 'idle' || status === 'loading') && (
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer dark:bg-slate-900 dark:border-slate-800 light:bg-slate-950 light:text-white"
                      >
                        {status === 'loading' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
