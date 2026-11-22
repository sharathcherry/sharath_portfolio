import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Portfolio knowledge base for the AI model
const PORTFOLIO_CONTEXT = `
You are Cherry, the personal AI assistant for Katukojwala Sharath Chandra's portfolio.
You are warm, intelligent, technically savvy, witty, and concise.
Sharath Chandra is an AI Engineer and Full-Stack Developer based in Hyderabad, India.

Key Information:
- Name: Katukojwala Sharath Chandra
- Education: B.Tech in CSE (AIML) at Malla Reddy University (2022-2026), CGPA: 8.5
- Role: AI Engineer & Full-Stack Developer
- Contact: ksharathchandrawork@gmail.com, linkedin.com/in/sharathchandra2005, github.com/sharathcherry
- Moniker: Sharath goes by 'sharathcherry' online, which is why your name is Cherry!

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

Technical Skills:
- Languages: Python, Java, JavaScript, TypeScript, SQL, C/C++
- AI / LLMOps: LangChain, LangGraph, Qdrant, ChromaDB, Ollama, vLLM, FastEmbed, OpenAI API, Gemini API, Whisper, RAG architectures
- Backend: FastAPI, Streamlit, Node.js, Express, PostgreSQL, MongoDB, Docker
- Frontend: React, Vite, Next.js, Tailwind CSS, Framer Motion
- Automation: n8n, GitHub Actions, Linux/Bash

Experience:
- AI Engineer Intern at One Tapp Consulting (Jan 2026 - Present): n8n automation, API integrations.
- Full Stack Developer Intern at Spotmies LLP (Jun 2025 - Sep 2025): RESTful microservices, React.js.
- AI Developer Intern at VISWAM.AI (Apr 2025 - Jun 2025): LangChain chatbots & agents.
- Google Developer Groups (GDG) active member & SSOC contributor (15+ PRs merged).

Guidelines:
- Identify yourself as Cherry. Do NOT use cherry fruit emojis.
- Keep responses friendly, conversational, concise, and formatted with clean markdown.
`;

// Cherry's Built-In Conversational Engine
function getCherryResponse(userInput: string, _history: Message[]): string {
  const q = userInput.toLowerCase().trim();

  // 1. Casual Greetings & Hello
  if (/^(hi|hello|hey|heya|yo|sup|howdy|hola|namaste|greetings)\b/i.test(q) || q === "hi" || q === "hello") {
    return `Hey there! 👋 I'm **Cherry**, Sharath's AI assistant.

Great to have you here! How can I help you today? You can ask me about:
- ⚡ **Flagship Projects** (*FrugalRoute*, *Vani*, *Multiple Disease Prediction*, *MindWell*)
- 🛠️ **Technical Skills** (*FastAPI, Python, Qdrant, React, vLLM*)
- 💼 **Experience & Education**
- 📬 **Getting in touch with Sharath**`;
  }

  // 2. "How are you" / "What's up"
  if (
    q.includes("how are you") ||
    q.includes("how are u") ||
    q.includes("how r u") ||
    q.includes("hows it going") ||
    q.includes("how's it going") ||
    q.includes("whats up") ||
    q.includes("what's up") ||
    q.includes("how do you do")
  ) {
    return `I'm doing wonderful, thanks for asking! Ready to show you around Sharath's engineering work.

Are you looking to explore his **LLM caching & routing engine (FrugalRoute)**, his **voice RAG platform (Vani)**, or are you interested in hiring him for an AI role?`;
  }

  // 3. Name & Identity ("Who are you", "What is your name")
  if (
    q.includes("who are you") ||
    q.includes("who r u") ||
    q.includes("what is your name") ||
    q.includes("whats your name") ||
    q.includes("what's your name") ||
    q.includes("your name") ||
    q === "cherry"
  ) {
    return `I'm **Cherry**!

I'm Sharath Chandra's personal portfolio AI assistant, named after his developer handle, **sharathcherry**.

I can give you deep technical dives into his projects, explain his architectures, or connect you directly with him!`;
  }

  // 4. "Why Cherry"
  if (q.includes("why cherry") || q.includes("why are you called cherry") || q.includes("name cherry")) {
    return `Sharath's GitHub handle and community alias is **[sharathcherry](https://github.com/sharathcherry)**!

When he designed me to represent his portfolio, he named me **Cherry** after his handle.`;
  }

  // 5. "Who is Sharath" / Bio / About him
  if (
    q.includes("who is sharath") ||
    q.includes("about sharath") ||
    q.includes("tell me about sharath") ||
    q.includes("who is he") ||
    q.includes("about him") ||
    q.includes("tell me about yourself") ||
    q.includes("bio") ||
    q.includes("background")
  ) {
    return `**Katukojwala Sharath Chandra** is an **AI Engineer & Full-Stack Developer** based in Hyderabad, India.

He specializes in:
- ⚡ **LLMOps & High-Performance Routing:** Building dynamic SLM/cloud routing engines and semantic vector caches (**FrugalRoute**).
- 🎙️ **Multilingual Voice RAG:** Offline-first voice assistants for public welfare schemes (**Vani — Jan Sahayak**).
- 🩺 **Clinical ML Systems:** High-accuracy diagnostic suites for multi-disease prediction.
- 💻 **Modern Full-Stack:** FastAPI, React, Next.js, Qdrant, Docker, and PostgreSQL.

He's currently pursuing his B.Tech in CSE (AIML) at Malla Reddy University (CGPA: 8.5) and is actively open to AI Engineering and ML roles!`;
  }

  // 6. Hiring, Job, Availability & Contact
  if (
    q.includes("hire") ||
    q.includes("job") ||
    q.includes("freelance") ||
    q.includes("available") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("phone") ||
    q.includes("resume")
  ) {
    return `### 📬 Connect with Sharath:
Sharath is actively open to **AI Engineer**, **ML Engineer**, and **Full-Stack Developer** opportunities (both full-time and freelance projects)!

- 📧 **Email:** [ksharathchandrawork@gmail.com](mailto:ksharathchandrawork@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/sharathchandra2005](https://linkedin.com/in/sharathchandra2005)
- 💻 **GitHub:** [github.com/sharathcherry](https://github.com/sharathcherry)
- 📍 **Location:** Hyderabad, India

Feel free to send him an email or reach out on LinkedIn!`;
  }

  // 7. FrugalRoute
  if (
    q.includes("frugal") ||
    q.includes("route") ||
    q.includes("router") ||
    q.includes("cache") ||
    q.includes("caching") ||
    q.includes("cost") ||
    q.includes("saving") ||
    q.includes("vllm") ||
    q.includes("ollama")
  ) {
    return `### ⚡ FrugalRoute — Semantic Cache & LLM Router
**FrugalRoute** is Sharath's hybrid AI routing engine and semantic vector cache built with **Python, FastAPI, Qdrant, and vLLM/Ollama**.

- **The Problem:** Cloud LLM APIs (GPT-4o, Claude) are slow and expensive for repetitive or straightforward queries.
- **The Solution:**
  1. **Semantic Vector Cache:** Computes dense embeddings with FastEmbed and checks Qdrant with cosine similarity (>0.88 threshold) for **sub-15ms cache hits**.
  2. **Complexity Routing:** Light tasks route to local quantized SLMs (DeepSeek-R1-Distill-Qwen on vLLM/Ollama).
  3. **Cloud Escalation:** Complex multi-step reasoning routes to frontier cloud models.
- **Results:** Slashes API costs by up to **68%** and cuts P95 latency by **45%**.
- **GitHub:** [github.com/sharathcherry/frugalroute](https://github.com/sharathcherry/frugalroute)`;
  }

  // 8. Vani — Jan Sahayak
  if (
    q.includes("vani") ||
    q.includes("sahayak") ||
    q.includes("voice") ||
    q.includes("govt") ||
    q.includes("scheme") ||
    q.includes("rural") ||
    q.includes("indic") ||
    q.includes("whisper")
  ) {
    return `### 🎙️ Vani — Jan Sahayak
**Vani** is an offline-capable, multilingual voice-first RAG assistant designed to bridge the digital literacy divide for rural Indian citizens.

- **The Problem:** 500+ government schemes exist, but rural citizens face language and literacy barriers when trying to access them.
- **How It Works:**
  - Ingests audio queries via phone call or WhatsApp.
  - Sub-second speech-to-text via **Whisper-base**.
  - Hybrid dense vector search using **ChromaDB/Qdrant** with cross-encoder reranking.
  - Synthesizes spoken answers in 10+ regional Indian languages using **Indic-TTS**.
- **Live Demo:** [vani-jan-sahayaka-demo.streamlit.app](https://vani-jan-sahayaka-demo.streamlit.app/)
- **GitHub:** [github.com/sharathcherry/vani-jan-sahayak](https://github.com/sharathcherry/vani-jan-sahayak)`;
  }

  // 9. Multiple Disease Prediction System
  if (
    q.includes("disease") ||
    q.includes("prediction") ||
    q.includes("medical") ||
    q.includes("health") ||
    q.includes("mdpcb") ||
    q.includes("clinical") ||
    q.includes("diabetes") ||
    q.includes("heart") ||
    q.includes("parkinson")
  ) {
    return `### 🩺 Multiple Disease Prediction System
A clinical decision support platform predicting 21 diseases (Diabetes, Heart Disease, Parkinson's, Cancer, etc.) using trained machine learning models.

- **Diagnostics:** Employs optimized SVM, Random Forest, and XGBoost models achieving **95%+ diagnostic accuracy** with cross-validation.
- **AI Care Plans:** Uses an LLM pipeline to synthesize structured care recommendations, dietary advice, and clinical referral notes based on user biomarker inputs.
- **Stack:** Python, Scikit-learn, Streamlit, Pandas, NumPy, Joblib.
- **Live Demo:** [mdpcb123.streamlit.app](https://mdpcb123.streamlit.app/)
- **GitHub:** [github.com/sharathcherry/mdpcb](https://github.com/sharathcherry/mdpcb)`;
  }

  // 10. MindWell
  if (
    q.includes("mindwell") ||
    q.includes("mental") ||
    q.includes("wellness") ||
    q.includes("therapy") ||
    q.includes("mood") ||
    q.includes("journal")
  ) {
    return `### 🧠 MindWell — AI Mental Wellness Platform
A full-stack mental health companion offering adaptive empathetic therapy conversations, daily mood tracking, and lifestyle reports.

- **Highlights:**
  - Built with React, Vite, Node.js, and Vercel serverless functions with Google Gemini API.
  - Features real-time voice input workflows and secure sentiment trend logs.
- **Live Demo:** [mindwell-gold.vercel.app](https://mindwell-gold.vercel.app/)
- **GitHub:** [github.com/sharathcherry/mindwell](https://github.com/sharathcherry/mindwell)`;
  }

  // 11. Projects in General
  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("apps")
  ) {
    return `### 🚀 Sharath's Flagship Projects:
1. **[FrugalRoute](https://github.com/sharathcherry/frugalroute)** — Semantic vector cache & LLM router slashing cloud API expenses by 68%.
2. **[Vani — Jan Sahayak](https://vani-jan-sahayaka-demo.streamlit.app/)** — Multilingual voice RAG helpline for 500+ Indian welfare schemes.
3. **[Multiple Disease Prediction](https://mdpcb123.streamlit.app/)** — Clinical ML diagnostic suite with 95%+ accuracy for 21 conditions.
4. **[MindWell](https://mindwell-gold.vercel.app/)** — Empathetic AI mental wellness companion with voice journaling.

Which one would you like to explore deeper?`;
  }

  // 12. Technical Skills & Stack
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("python") ||
    q.includes("react")
  ) {
    return `### 🛠️ Sharath's Technical Stack:
- **Languages:** Python, TypeScript, JavaScript, Java, SQL, C/C++
- **AI & LLMOps:** LangChain, LangGraph, Qdrant, ChromaDB, Ollama, vLLM, FastEmbed, OpenAI API, Gemini API, Whisper, RAG Architectures
- **Backend & Cloud:** FastAPI, Streamlit, Node.js, Express, PostgreSQL, MongoDB, Docker, Vercel
- **Frontend:** React, Next.js, Vite, Tailwind CSS, Framer Motion
- **Automation & Tools:** n8n, Git, GitHub Actions, Linux/Bash`;
  }

  // 13. Education
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("degree") ||
    q.includes("cgpa") ||
    q.includes("gpa") ||
    q.includes("malla reddy")
  ) {
    return `### 🎓 Education:
- **Degree:** B.Tech in Computer Science and Engineering (AIML)
- **Institution:** Malla Reddy University, Hyderabad, India (2022 – 2026)
- **Academic Standing:** CGPA: 8.5
- **Core Coursework:** Machine Learning, Deep Learning, Data Structures & Algorithms, Distributed Systems, Database Management.`;
  }

  // 14. Experience & Internships
  if (
    q.includes("experience") ||
    q.includes("intern") ||
    q.includes("company") ||
    q.includes("one tapp") ||
    q.includes("spotmies") ||
    q.includes("viswam") ||
    q.includes("gdg") ||
    q.includes("ssoc")
  ) {
    return `### 💼 Experience & Roles:
- **AI Engineer Intern** @ *One Tapp Consulting* (Jan 2026 – Present) — Built automated multi-agent and n8n workflows integrating OpenAI, Gemini, and enterprise tooling.
- **Full Stack Developer Intern** @ *Spotmies LLP* (Jun 2025 – Sep 2025) — Built REST APIs, React frontend modules, and Dockerized microservices.
- **AI Developer Intern** @ *VISWAM.AI* (Apr 2025 – Jun 2025) — Built LangChain agents and conversational systems with 18% improved accuracy.
- **Active Member** @ *Google Developer Groups (GDG)* & Contributor @ *SSOC* (15+ PRs merged).`;
  }

  // 15. Humor / Jokes
  if (q.includes("joke") || q.includes("funny") || q.includes("laugh")) {
    return `Why did the neural network go to school?
Because it wanted to be a **deep learner**! 🧠😄

Speaking of deep learning, would you like to see how Sharath implements semantic embeddings in **FrugalRoute**?`;
  }

  // 16. Gratitude & Pleasantries
  if (q.includes("thank") || q.includes("thanks") || q.includes("thx") || q.includes("appreciate")) {
    return `You're very welcome! Feel free to ask if there's anything else you'd like to discover about Sharath's projects or skills.`;
  }

  if (q.includes("cool") || q.includes("awesome") || q.includes("great") || q.includes("nice") || q.includes("good")) {
    return `Thanks! Sharath takes a lot of pride in building production-grade AI systems. Let me know if you want to inspect any code repositories or talk about a collaboration!`;
  }

  if (q.includes("bye") || q.includes("goodbye") || q.includes("see ya") || q.includes("cya")) {
    return `Thanks for stopping by Sharath's portfolio! Have an amazing day ahead, and don't hesitate to connect on [LinkedIn](https://linkedin.com/in/sharathchandra2005) or via [Email](mailto:ksharathchandrawork@gmail.com). 👋`;
  }

  // 17. Conversational Fallback
  return `I'm **Cherry**, Sharath's AI companion! While I might not have a direct answer for "${userInput.slice(0, 50)}", I know everything about Sharath's work.

Here are a few things you can ask me:
- *"Tell me about FrugalRoute"*
- *"How does Vani Jan Sahayak work?"*
- *"What is Sharath's tech stack?"*
- *"How can I contact Sharath?"*`;
}

async function generateAIResponse(history: Message[], userInput: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return getCherryResponse(userInput, history);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: PORTFOLIO_CONTEXT
    });

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
    return getCherryResponse(userInput, history);
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm **Cherry**, Sharath's AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '⚡ FrugalRoute', query: 'Tell me about FrugalRoute' },
    { label: '🎙️ Vani Voice RAG', query: 'How does Vani Jan Sahayak work?' },
    { label: '🛠️ Skills', query: 'What is your technical stack?' },
    { label: '📬 Contact', query: 'How can I contact Sharath?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;
    const userMessage = queryText.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Realistic micro-delay so response feels natural
    setTimeout(async () => {
      const response = await generateAIResponse(messages, userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 450);
  };

  const handleSend = () => {
    sendQuery(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Cherry Chat" : "Open Cherry Chat"}
        type="button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-white/90 transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
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
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <MessageCircle size={24} />
              {/* Pulsing indicator */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-36px)] bg-[#0d1117] border border-white/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shadow-inner">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-sm font-bold tracking-wide">Cherry</p>
                    <span className="px-1.5 py-0.2 bg-white/10 text-white/80 text-[10px] font-medium rounded-full border border-white/15">
                      AI
                    </span>
                  </div>
                  <p className="text-white/40 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Sharath's Assistant · Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-white text-black font-medium rounded-br-xs shadow-md'
                        : 'bg-white/10 text-white/95 border border-white/10 rounded-bl-xs'
                    }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none break-words leading-relaxed">
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
                  <div className="bg-white/10 border border-white/10 px-4 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                    <span className="text-xs text-white/50 mr-1 flex items-center gap-1">
                      <Sparkles size={12} className="text-white/70 animate-spin" />
                      Cherry is thinking
                    </span>
                    <motion.span
                      className="w-1.5 h-1.5 bg-white/60 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-1.5 h-1.5 bg-white/60 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.span
                      className="w-1.5 h-1.5 bg-white/60 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 border-t border-white/5 bg-white/[0.02] flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickPrompts.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => sendQuery(chip.query)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/40 text-white/70 hover:text-white text-xs transition-all duration-200"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-[#0d1117]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Cherry about projects, skills..."
                  className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-white text-black rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
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
