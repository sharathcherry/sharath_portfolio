import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

import { GoogleGenerativeAI } from "@google/generative-ai";

// Portfolio knowledge base for the AI
const PORTFOLIO_CONTEXT = `
You are the AI assistant for Katukojwala Sharath Chandra's portfolio. 
Sharath Chandra is an AI Engineer and Full-Stack Developer based in Hyderabad, India.

Key Information:
- Name: Katukojwala Sharath Chandra
- Education: B.Tech in CSE (AIML) at Malla Reddy University (2022-2026)
- Role: AI Engineer & Full-Stack Developer
- Contact: ksharathchandrawork@gmail.com, linkedin.com/in/sharathchandra2005, github.com/sharathcherry

Technical Skills:
- Languages: Python, Java, JavaScript, TypeScript, SQL, C/C++
- AI / LLMOps: LangChain, LangGraph, Qdrant, ChromaDB, Ollama, vLLM, FastEmbed, OpenAI API, Gemini API, Whisper, RAG architectures
- Backend: FastAPI, Streamlit, Node.js, Express, PostgreSQL, MongoDB, Docker
- Frontend: React, Vite, Next.js, Tailwind CSS, Framer Motion
- Automation: n8n, GitHub Actions, Linux/Bash

Flagship Projects:
1. FrugalRoute — Semantic Cache & LLM Router:
   - Dynamic prompt complexity classifier routing between local open-weight SLMs (vLLM/Ollama) and frontier cloud models (GPT-4o/Claude/Gemini).
   - Fast semantic vector caching with Qdrant + FastEmbed achieving <15ms cache hits.
   - Slashes cloud API token costs by up to 68% and P95 latency by 45%.
   - GitHub: https://github.com/sharathcherry/frugalroute

2. Vani — Jan Sahayak:
   - Multilingual offline-capable voice-first RAG helpline delivering 500+ Indian government schemes to rural citizens.
   - Sub-second offline STT via Whisper-base, hybrid dense vector retrieval with ChromaDB, and Indic-TTS synthesis.
   - Deployed on Streamlit Cloud: https://vani-jan-sahayaka-demo.streamlit.app/
   - GitHub: https://github.com/sharathcherry/vani-jan-sahayak

3. Multiple Disease Prediction System (mdpcb):
   - Clinical decision support web system predicting 21 diseases (Diabetes, Heart Disease, Parkinson's, Cancer, etc.) using trained ML models (SVM, Random Forest, XGBoost) with 95%+ accuracy.
   - Integrated NVIDIA-powered LLM generating customized dietary and medical care plans.
   - Deployed on Streamlit Cloud: https://mdpcb123.streamlit.app/
   - GitHub: https://github.com/sharathcherry/mdpcb

4. MindWell — AI Mental Wellness Companion:
   - Empathetic AI mental health companion offering adaptive conversational support, daily mood tracking, and lifestyle reports.
   - Built with React, Vite, Node.js, and Vercel serverless functions with Google Gemini API.
   - Deployed on Vercel: https://mindwell-gold.vercel.app/
   - GitHub: https://github.com/sharathcherry/mindwell

Experience:
1. AI Engineer Intern at One Tapp Consulting (Jan 2026 - Present):
   - Developed complex n8n automation workflows, reducing manual tasks by 80%.
   - Integrated APIs like OpenAI, Gemini, and Slack.
2. Full Stack Developer Intern at Spotmies LLP (Jun 2025 - Sep 2025):
   - Built RESTful APIs and React modules.
   - Deployed containerized microservices with Docker.
3. AI Developer Intern at VISWAM.AI (Apr 2025 - Jun 2025):
   - Developed AI chatbots and agents using LangChain and LLM APIs.
   - Improved response accuracy by 18%.
4. Active Member at Google Developer Groups (GDG) & Open Source Contributor at SSOC (15+ PRs merged).

Achievements:
- 100+ DSA problems solved on LeetCode/GFG.
- State-Level Buildathon selection by NxtWave (top ~1,000 from 60,000).

Guidelines:
- Be professional, helpful, and friendly.
- Keep responses concise and focused on Sharath's portfolio, skills, and projects.
- Always provide clear, formatted markdown responses.
`;

function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("frugal") || q.includes("route") || q.includes("cache") || q.includes("router")) {
    return `### ⚡ FrugalRoute — Semantic Cache & LLM Router
**FrugalRoute** is a local-first hybrid routing engine and semantic vector cache built with **Python, FastAPI, Qdrant, and vLLM/Ollama**.

- **Key Highlights:**
  - Evaluates prompt complexity in real-time to route queries between local open-weight SLMs and frontier cloud APIs.
  - Achieves **<15ms semantic cache hits** using cosine similarity on embeddings (>0.88 threshold).
  - Cuts API compute costs by up to **68%** and slashes P95 latency by **45%**.
  - **GitHub:** [github.com/sharathcherry/frugalroute](https://github.com/sharathcherry/frugalroute)`;
  }

  if (q.includes("vani") || q.includes("sahayak") || q.includes("voice") || q.includes("govt") || q.includes("scheme")) {
    return `### 🎙️ Vani — Jan Sahayak
**Vani** is an offline-capable, multilingual voice-first RAG assistant designed to bridge the digital literacy divide for rural citizens.

- **Key Highlights:**
  - Queries **500+ Indian government schemes** in regional languages.
  - Sub-second offline STT with Whisper, dense vector retrieval with ChromaDB, and natural speech synthesis via Indic-TTS.
  - **Live Demo:** [vani-jan-sahayaka-demo.streamlit.app](https://vani-jan-sahayaka-demo.streamlit.app/)
  - **GitHub:** [github.com/sharathcherry/vani-jan-sahayak](https://github.com/sharathcherry/vani-jan-sahayak)`;
  }

  if (q.includes("disease") || q.includes("prediction") || q.includes("medical") || q.includes("health") || q.includes("mdpcb")) {
    return `### 🩺 Multiple Disease Prediction System
A clinical decision support platform predicting 21 diseases (Diabetes, Heart Disease, Parkinson's, Cancer, etc.) using trained machine learning models.

- **Key Highlights:**
  - Employs SVM, Random Forest, and XGBoost achieving **95%+ diagnostic accuracy**.
  - Generates personalized AI care plans, dietary advice, and clinical referral notes.
  - **Live Demo:** [mdpcb123.streamlit.app](https://mdpcb123.streamlit.app/)
  - **GitHub:** [github.com/sharathcherry/mdpcb](https://github.com/sharathcherry/mdpcb)`;
  }

  if (q.includes("mindwell") || q.includes("mental") || q.includes("wellness")) {
    return `### 🧠 MindWell — AI Mental Wellness Platform
A full-stack mental health companion offering adaptive empathetic therapy conversations, daily mood tracking, and lifestyle reports.

- **Key Highlights:**
  - Built with React, Vite, Node.js, and Vercel serverless functions with Google Gemini API.
  - Features real-time voice input workflows and secure sentiment trend logs.
  - **Live Demo:** [mindwell-gold.vercel.app](https://mindwell-gold.vercel.app/)
  - **GitHub:** [github.com/sharathcherry/mindwell](https://github.com/sharathcherry/mindwell)`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
    return `### 🚀 Sharath's Flagship Projects:
1. **FrugalRoute**: Semantic vector cache & LLM hybrid router slashing cloud API expenses by 68%.
2. **Vani — Jan Sahayak**: Multilingual voice RAG helpline for 500+ government schemes in rural India.
3. **Multiple Disease Prediction System**: Clinical ML diagnostic suite with 95%+ accuracy for 21 conditions.
4. **MindWell**: AI-powered mental wellness companion with voice journaling and emotional trend analysis.

Feel free to ask about any specific project for architecture details!`;
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    return `### 🛠️ Technical Skills
- **Languages:** Python, TypeScript, JavaScript, Java, SQL, C/C++
- **AI / LLMOps:** LangChain, LangGraph, Qdrant, ChromaDB, Ollama, vLLM, FastEmbed, OpenAI API, Gemini API, Whisper
- **Backend & Cloud:** FastAPI, Streamlit, Node.js, Express, PostgreSQL, MongoDB, Docker, Vercel
- **Frontend:** React, Next.js, Vite, Tailwind CSS, Framer Motion
- **Automation & Tools:** n8n, Git, GitHub Actions, Linux/Bash`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
    return `### 📬 Connect with Sharath:
- **Email:** [ksharathchandrawork@gmail.com](mailto:ksharathchandrawork@gmail.com)
- **LinkedIn:** [linkedin.com/in/sharathchandra2005](https://linkedin.com/in/sharathchandra2005)
- **GitHub:** [github.com/sharathcherry](https://github.com/sharathcherry)
- **Location:** Hyderabad, India`;
  }

  if (q.includes("experience") || q.includes("intern") || q.includes("job") || q.includes("company")) {
    return `### 💼 Experience & Roles
- **AI Engineer Intern** @ *One Tapp Consulting* (Jan 2026 – Present) — Built automated multi-agent and n8n workflows integrating OpenAI, Gemini, and enterprise tooling.
- **Full Stack Developer Intern** @ *Spotmies LLP* (Jun 2025 – Sep 2025) — Built REST APIs, React frontend modules, and Dockerized microservices.
- **AI Developer Intern** @ *VISWAM.AI* (Apr 2025 – Jun 2025) — Built LangChain agents and conversational systems with 18% improved accuracy.
- **Active Member** @ *Google Developer Groups (GDG)* & Contributor @ *SSOC* (15+ PRs merged).`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree")) {
    return `### 🎓 Education
- **B.Tech in Computer Science and Engineering (AIML)**
- **Malla Reddy University**, Hyderabad, India (2022 – 2026)
- **Academic Focus:** Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Distributed Systems.`;
  }

  return `### 👋 Hi there! I'm Sharath's Portfolio Assistant.
Katukojwala Sharath Chandra is an **AI Engineer & Full-Stack Developer** based in Hyderabad, specializing in LLM systems, semantic vector caching, multilingual voice agents, and clinical ML.

You can ask me about:
- **Projects:** *FrugalRoute*, *Vani Jan Sahayak*, *Multiple Disease Prediction*, *MindWell*
- **Technical Skills:** AI/ML frameworks, vector databases, full-stack technologies
- **Experience & Education:** Internships, degrees, and community contributions
- **Contact:** How to get in touch with Sharath`;
}

async function generateAIResponse(history: Message[], userInput: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return getLocalFallbackResponse(userInput);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: PORTFOLIO_CONTEXT
    });

    // Map the UI history to Gemini format (user -> user, assistant -> model)
    const mappedHistory = history.slice(1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history: mappedHistory });
    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("AI Error:", error);
    // Graceful fallback to local response engine on any API failure
    return getLocalFallbackResponse(userInput);
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m Sharath\'s portfolio assistant. Ask me anything about his skills, projects, experience, or achievements!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    // Simulate typing delay
    const response = await generateAIResponse(messages, userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        type="button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={24} />
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-48px)] bg-black border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Portfolio Assistant</p>
                <p className="text-white/40 text-xs">Ask about Sharath</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm ${message.role === 'user'
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white border border-white/10'
                      }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/10 p-3 flex gap-1">
                    <motion.span
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-3 py-2 bg-transparent border border-white/20 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-3 py-2 bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

