import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950/40 dark:border-slate-900 dark:bg-slate-950/40 light:border-slate-100 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copy text */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-slate-350 dark:text-slate-350 light:text-slate-800">
            Kumar Aditya
          </p>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Tech message */}
        <div className="text-xs text-slate-500 text-center">
          Built with React, Vite &amp; Tailwind CSS. Inspired by Stripe &amp; Apple.
        </div>

        {/* Back to top activator */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer hover:scale-105 transition-all dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200"
          aria-label="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
