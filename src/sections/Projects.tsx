import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Multiple Disease Prediction System',
    description: 'A Streamlit web app that predicts 21 diseases (Diabetes, Heart Disease, Cancer, Parkinson\'s, Alzheimer\'s & more) using trained ML models. Features an NVIDIA-powered LLM that generates structured care plans with dietary advice, medications, and doctor recommendations.',
    tags: ['Python', 'Streamlit', 'scikit-learn', 'NVIDIA LLM', 'OpenAI API'],
    impact: '21 Disease Predictions',
    category: 'AI / ML',
    // A representative screenshot color palette for the card preview
    previewGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    previewAccent: '#3B82F6',
    previewLabel: 'Disease Prediction Dashboard',
    previewStats: ['21 Diseases', '95%+ Accuracy', 'AI Care Plans'],
    links: {
      github: 'https://github.com/sharathcherry/mdpcb',
      live: 'https://mdpcb123.streamlit.app/'
    }
  },
  {
    title: 'Vani — Jan Sahayak',
    description: 'A multilingual AI voice helpline that lets citizens query 500+ Indian government welfare schemes via phone call or WhatsApp in their native language – bridging the digital literacy gap.',
    tags: ['AWS Bedrock', 'AWS Lambda', 'Qdrant', 'Twilio', 'Streamlit'],
    impact: 'Voice AI for 2000+ Govt Schemes',
    category: 'AI / Voice Apps',
    previewGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    previewAccent: '#10B981',
    previewLabel: 'Vani Voice AI Platform',
    previewStats: ['500+ Schemes', 'Multilingual', 'WhatsApp + Call'],
    links: {
      github: 'https://github.com/sharathcherry/vani-jan-sahayak',
      live: 'https://vani-jan-sahayaka-demo.streamlit.app/'
    }
  },
  {
    title: 'MindWell',
    description: 'A mental wellness platform with AI chat, therapy/lifestyle report generation, and voice input support. Frontend is deployed on Vercel with serverless API routes and an audio proxy for external speech processing services.',
    tags: ['React', 'Vite', 'Node.js', 'Vercel', 'AI API'],
    impact: 'AI Mental Wellness App',
    category: 'Full Stack / AI',
    previewGradient: 'from-purple-950 via-slate-900 to-violet-950',
    previewAccent: '#A855F7',
    previewLabel: 'MindWell Wellness Platform',
    previewStats: ['AI Therapy Chat', 'Voice Input', 'Reports'],
    links: {
      github: 'https://github.com/sharathcherry/mindwell',
      live: 'https://mindwell-gold.vercel.app/'
    }
  },
  {
    title: 'FrugalRoute — Semantic Cache & LLM Router',
    description: 'A local-first hybrid routing engine and semantic vector cache that dynamically profiles prompt complexity to route queries between local open-source models (vLLM/Ollama) and cloud APIs, slashing compute expenses by 68%.',
    tags: ['Python', 'FastAPI', 'Qdrant', 'vLLM / Ollama', 'Semantic Cache'],
    impact: '68% Cost Cut · <15ms Cache',
    category: 'AI Infrastructure / LLMOps',
    previewGradient: 'from-amber-950 via-slate-900 to-orange-950',
    previewAccent: '#F59E0B',
    previewLabel: 'FrugalRoute Cache & Router',
    previewStats: ['<15ms Cache Hit', '68% Cost Reduction', 'Hybrid vLLM/Cloud'],
    links: {
      github: 'https://github.com/sharathcherry/frugalroute',
      live: 'https://github.com/sharathcherry/frugalroute'
    }
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
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
    <section id="projects" className="relative bg-black py-32 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating glow */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
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
          className="mb-16"
        >
          <motion.p
            className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium mb-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Selected
          </motion.p>
          <h2 className="text-white text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
            Work
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            High-impact solutions solving complex problems with AI and Automation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 0 0 0 rgba(255,255,255,0)',
              }}
              onHoverStart={(e) => {
                const el = e.target as HTMLElement;
                el?.closest('article')?.setAttribute('style', `box-shadow: 0 20px 60px -10px ${project.previewAccent}22`);
              }}
              onHoverEnd={(e) => {
                const el = e.target as HTMLElement;
                el?.closest('article')?.setAttribute('style', 'box-shadow: 0 0 0 0 rgba(255,255,255,0)');
              }}
            >
              {/* Category Badge */}
              <motion.div
                className="absolute top-4 left-4 z-10"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs uppercase tracking-[0.1em]">
                  {project.category}
                </span>
              </motion.div>

              {/* Impact Badge */}
              <motion.div
                className="absolute top-4 right-4 z-10"
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <span className="px-3 py-1 bg-white text-black text-xs font-medium">
                  {project.impact}
                </span>
              </motion.div>

              {/* Content */}
              <div className="p-8 pt-20 space-y-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + tagIndex * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                      className="px-3 py-1 border border-white/20 text-white/60 text-xs font-mono transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2">
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>

                {/* Static App Preview Card — replaces broken iframes */}
                <motion.div
                  className="mt-4 rounded-xl overflow-hidden border border-white/15 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  {/* Browser Chrome */}
                  <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-3 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-black/40 rounded-md px-3 py-1 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                      <span className="text-white/40 text-xs font-mono truncate">
                        {project.links.live.replace('https://', '').replace(/\/$/, '')}
                      </span>
                    </div>
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-white/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      title="Open in new tab"
                    >
                      <ExternalLink size={13} />
                    </motion.a>
                  </div>

                  {/* Static Visual Preview */}
                  <motion.a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block h-48 bg-gradient-to-br ${project.previewGradient} overflow-hidden cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background grid */}
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                      }}
                    />

                    {/* Glow orb */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: project.previewAccent }}
                    />

                    {/* UI mock elements */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                      {/* Title label */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.previewAccent }} />
                        <span className="text-white/80 text-sm font-semibold tracking-wide">{project.previewLabel}</span>
                      </div>

                      {/* Stat pills */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.previewStats.map((stat) => (
                          <span
                            key={stat}
                            className="px-3 py-1 text-xs font-medium rounded-full border"
                            style={{
                              color: project.previewAccent,
                              borderColor: `${project.previewAccent}40`,
                              backgroundColor: `${project.previewAccent}10`
                            }}
                          >
                            {stat}
                          </span>
                        ))}
                      </div>

                      {/* Mock bar chart */}
                      <div className="flex items-end gap-1.5 h-10 mt-2">
                        {[40, 65, 50, 80, 55, 75, 60, 90, 70, 85].map((h, i) => (
                          <motion.div
                            key={i}
                            className="w-2 rounded-sm opacity-60"
                            style={{ height: `${h}%`, backgroundColor: project.previewAccent }}
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ delay: 0.8 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <ExternalLink size={14} className="text-white" />
                        <span className="text-white text-xs font-medium">Open Live Demo</span>
                      </div>
                    </div>
                  </motion.a>
                </motion.div>
              </div>

              {/* Hover Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Corner accent */}
              <motion.div
                className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/0 group-hover:border-white/20 transition-all duration-500"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://github.com/sharathcherry/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.1em] font-medium hover:border-white hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} />
            View Full Portfolio on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
