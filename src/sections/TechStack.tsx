import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Bot, BookOpen, Database, Network, LineChart } from 'lucide-react';

const TechIcon = ({ src, className = "w-6 h-6 object-contain" }: { src: string, className?: string }) => (
  <img src={src} alt="Tech logo" className={className} />
);

const techCategories = [
  {
    name: 'AI & Machine Learning',
    items: [
      { name: 'Python', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" /> },
      { name: 'OpenAI API', icon: <TechIcon src="https://cdn.simpleicons.org/openai/white" /> },
      { name: 'NVIDIA API', icon: <TechIcon src="https://cdn.simpleicons.org/nvidia/76B900" /> },
      { name: 'LangChain', icon: <TechIcon src="https://avatars.githubusercontent.com/u/126732356?s=200&v=4" className="w-6 h-6 object-contain rounded-full p-0.5 bg-white" /> },
      { name: 'Machine Learning', icon: <Brain className="w-6 h-6 text-purple-400" /> },
      { name: 'LLM', icon: <Bot className="w-6 h-6 text-emerald-400" /> },
      { name: 'RAG', icon: <BookOpen className="w-6 h-6 text-amber-400" /> },
    ]
  },
  {
    name: 'Backend & APIs',
    items: [
      { name: 'Node.js', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" /> },
      { name: 'FastAPI', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" /> },
      { name: 'REST APIs', icon: <Network className="w-6 h-6 text-gray-400" /> },
      { name: 'yfinance', icon: <LineChart className="w-6 h-6 text-green-500" /> },
    ]
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> },
      { name: 'TypeScript', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> },
      { name: 'Tailwind CSS', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" /> },
      { name: 'Vite', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" /> },
    ]
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" /> },
      { name: 'MongoDB', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" /> },
      { name: 'Redis', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" /> },
      { name: 'Qdrant', icon: <TechIcon src="https://avatars.githubusercontent.com/u/74641973?s=200&v=4" className="w-6 h-6 object-contain rounded-full" /> },
      { name: 'FAISS', icon: <TechIcon src="https://cdn.simpleicons.org/meta/0668E1" /> },
    ]
  },
  {
    name: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS', icon: <TechIcon src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" className="w-8 h-8 object-contain filter invert opacity-90 brightness-200" /> },
      { name: 'Azure', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" /> },
      { name: 'Docker', icon: <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" /> },
    ]
  }
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="tech" className="relative bg-black py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 text-center"
        >
          <motion.p
            className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium mb-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Tech
          </motion.p>
          <h2 className="text-white text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
            Stack
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto">
            The technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Categories */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {techCategories.map((category, catIndex) => (
            <motion.div key={category.name} variants={categoryVariants}>
              {/* Category Title */}
              <motion.h3
                className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium mb-6"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: catIndex * 0.2 }}
              >
                {category.name}
              </motion.h3>

              {/* Tech Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.3 + index * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -6,
                      borderColor: "rgba(255,255,255,0.4)",
                      backgroundColor: "rgba(255,255,255,0.05)"
                    }}
                    className="group flex items-center gap-3 p-4 border border-white/10 transition-all duration-300 cursor-default"
                  >
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-white/80 text-sm font-mono group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
