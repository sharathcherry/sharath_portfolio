import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

// Animated background particles
const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-[rgb(var(--color-primary-400))/10]"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      willChange: 'transform, opacity'
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);



export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[rgb(var(--color-background-dark))] overflow-hidden flex items-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--color-primary-400), 0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(var(--color-secondary-500), 0.06) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            willChange: 'background-position'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={4} />
      <FloatingParticle delay={1} x="85%" y="15%" size={3} />
      <FloatingParticle delay={2} x="70%" y="60%" size={5} />
      <FloatingParticle delay={0.5} x="20%" y="70%" size={3} />
      <FloatingParticle delay={1.5} x="90%" y="80%" size={4} />
      <FloatingParticle delay={2.5} x="50%" y="30%" size={2} />

      {/* Decorative Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-32 bottom-0 w-[500px] h-[500px] border border-white/10 rounded-full"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/30 rounded-full -translate-x-1/2" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-16 bottom-16 w-[400px] h-[400px] border border-white/5 rounded-full"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full -translate-x-1/2" />
        </motion.div>
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Title with ultra-fast animations */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'opacity, transform' }}
                className="text-[rgb(var(--color-text-primary))] text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight"
              >
                Hello.
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'opacity, transform' }}
                className="text-[rgb(var(--color-text-primary))] text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight"
              >
                I am
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'opacity, transform' }}
                className="text-[rgb(var(--color-text-primary))] text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight"
              >
                Sharath Chandra
              </motion.h1>
            </div>

            {/* Roles with Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDownRight className="w-8 h-8 text-white mt-1" strokeWidth={1.5} />
              </motion.div>
              <div className="space-y-2">
                <motion.p
                  className="text-[rgb(var(--color-text-secondary))] text-lg font-medium hover:text-[rgb(var(--color-text-primary))] transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  🤖 AI Developer
                </motion.p>
                <motion.p
                  className="text-[rgb(var(--color-text-secondary))] text-lg font-medium hover:text-[rgb(var(--color-text-primary))] transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  💻 Full-Stack Engineer
                </motion.p>
                <motion.p
                  className="text-[rgb(var(--color-text-secondary))] text-lg font-medium hover:text-[rgb(var(--color-text-primary))] transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  🚀 Freelance
                </motion.p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/60 text-base leading-relaxed max-w-md"
            >
              I am an AI-integrated Full-Stack Developer based in Hyderabad, India.
              I architect scalable AI solutions that transform complex workflows into
              effortless automation, specializing in LangChain, n8n, and AI Agents.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-[rgb(var(--color-primary-400))] text-[rgb(var(--color-text-dark))] text-sm uppercase tracking-[0.1em] font-medium hover:bg-[rgb(var(--color-primary-500))] transition-colors duration-200"
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                style={{ willChange: 'transform' }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#projects"
                className="inline-flex items-center px-6 py-3 border border-[rgb(var(--color-primary-400)/0.3)] text-[rgb(var(--color-text-primary))] text-sm uppercase tracking-[0.1em] font-medium hover:border-[rgb(var(--color-primary-400))] hover:bg-[rgb(var(--color-primary-400)/0.1)] transition-all duration-200"
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                style={{ willChange: 'transform' }}
              >
                View Work
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Optimized Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ willChange: 'opacity, transform' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] h-10 bg-[rgb(var(--color-primary-400))] rounded-full"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[rgb(var(--color-text-secondary))] text-xs uppercase tracking-[0.2em] font-medium"
        >
          Scroll Down
        </motion.p>
      </motion.div>
    </section>
  );
}
