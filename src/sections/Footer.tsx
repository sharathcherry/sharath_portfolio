import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowUp, Heart } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Tech', href: '#tech' },
  { name: 'Contact', href: '#contact' },
];

const socials = [
  { icon: <Github size={16} />, href: 'https://github.com/sharathcherry', label: 'GitHub' },
  { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/sharathchandra2005', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Left — Logo + Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-sm">
                <span className="text-white font-black text-xs tracking-tight">SC</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">Sharath Chandra</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs">
              AI-integrated full-stack developer building intelligent products that matter.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group w-8 h-8 border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white/50 group-hover:text-white transition-colors">
                    {s.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Center — Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] font-medium">Navigation</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-white/50 hover:text-white text-sm uppercase tracking-[0.1em] transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Built with + Back to top */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <span>Built with</span>
              <span className="text-white/60">React</span>
              <span>·</span>
              <span className="text-white/60">Tailwind</span>
              <span>·</span>
              <span className="text-white/60">Framer Motion</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-[0.1em]">Back to Top</span>
              <div className="w-7 h-7 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
                <ArrowUp size={12} />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-xs">
            © 2025 Katukojwala Sharath Chandra. All rights reserved.
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1">
            Made with <Heart size={10} className="text-red-400/60" /> in Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
