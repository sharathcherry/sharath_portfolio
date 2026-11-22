import { useState, useEffect } from 'react';
import ThemeToggle from '../components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Tech', href: '#tech' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-[rgb(var(--color-background-dark)/0.8)] backdrop-blur-md border-b border-[rgb(var(--color-primary-400)/0.2)]'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="group flex items-center gap-2 no-underline">
              <motion.div
                className="relative w-9 h-9 flex items-center justify-center"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
              >
                {/* Glowing border */}
                <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[rgb(var(--color-primary-400)/0.2)] to-[rgb(var(--color-secondary-500)/0.2)] border border-[rgb(var(--color-primary-400)/0.2)] group-hover:border-[rgb(var(--color-primary-400)/0.4)] transition-colors duration-300" />
                <span className="relative text-[rgb(var(--color-text-primary))] font-black text-sm tracking-tight z-10">SC</span>
              </motion.div>
              <motion.span
                className="text-white/0 group-hover:text-white/60 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 overflow-hidden max-w-0 group-hover:max-w-[120px]"
                style={{ whiteSpace: 'nowrap' }}
              >
                Sharath Chandra
              </motion.span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="relative text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] text-sm uppercase tracking-[0.1em] font-medium transition-colors duration-300 group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--color-primary-400))] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              {/* Resume CTA */}
              <motion.a
                href="mailto:ksharathchandrawork@gmail.com"
                className="px-4 py-1.5 border border-[rgb(var(--color-primary-400)/0.3)] text-[rgb(var(--color-text-secondary))] text-xs uppercase tracking-[0.15em] font-medium hover:border-[rgb(var(--color-primary-400))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-primary-400)/0.1)] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me
              </motion.a>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[rgb(var(--color-primary-400))] z-50 origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white text-2xl uppercase tracking-[0.2em] font-medium cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="mailto:ksharathchandrawork@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 border border-white/30 text-white text-sm uppercase tracking-[0.2em]"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
