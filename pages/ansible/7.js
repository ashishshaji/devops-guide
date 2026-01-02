import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Box, 
  Rocket, 
  Copy, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Github,
  Linkedin,
  X
} from 'lucide-react';

// Configuration
const apiKey = ""; 
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, msg: "", type: "info" });
  const [explanation, setExplanation] = useState(null);

  // Smooth Reveal Logic
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const showToast = (msg, type = "info") => {
    setToast({ visible: true, msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const callGemini = async (userPrompt, systemInstruction) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      } catch (error) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
      }
    }
    return "Failed to connect to AI service. Please try again later.";
  };

  const generatePlaybook = async () => {
    if (!prompt.trim()) {
      showToast("Please enter a description first!", "warn");
      return;
    }

    setIsLoading(true);
    setAiOutput("");

    const systemMsg = `You are an Ansible automation expert. 
    Generate valid, well-commented YAML playbooks based on user requests. 
    Always use modern 'ansible.builtin' namespaces. 
    Include 'become: true' if the tasks likely require root. 
    Output ONLY the YAML code, no conversational filler.`;

    const result = await callGemini(prompt, systemMsg);
    const cleanResult = result.replace(/```yaml/g, '').replace(/```/g, '').trim();
    
    setAiOutput(cleanResult);
    setIsLoading(false);
  };

  const explainLogic = async (context) => {
    showToast("✨ Gemini is analyzing code logic...", "info");
    
    const systemMsg = `You are a DevOps mentor. Explain the provided Ansible task briefly (3 sentences max). 
    Focus on what it does, why it's used, and the benefit of its parameters. 
    Be encouraging and clear.`;

    const result = await callGemini(`Explain this task: ${context}`, systemMsg);
    setExplanation(result);
  };

  const copyToClipboard = () => {
    if (!aiOutput) return;
    const textArea = document.createElement("textarea");
    textArea.value = aiOutput;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast("Playbook copied to clipboard!", "success");
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Fira+Code:wght@400;500&display=swap');
        .font-code { font-family: 'Fira Code', monospace; }
        .gradient-text {
          background: linear-gradient(135deg, #0f172a 0%, #326CE5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .neo-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 2rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .neo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
          border-color: #326CE5;
        }
        .ai-shimmer {
          background: linear-gradient(90deg, #326CE5, #a855f7, #326CE5);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-[100] px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#EE0000] w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
              <span className="font-black text-xl">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-none">Ansible</p>
              <p className="font-extrabold text-slate-800 tracking-tight">Mastery Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <button onClick={() => scrollTo('structure')} className="hover:text-blue-600 transition-colors hidden md:block">Structure</button>
            <button onClick={() => scrollTo('modules')} className="hover:text-blue-600 transition-colors hidden md:block">Modules</button>
            <button onClick={() => scrollTo('ai-tools')} className="text-blue-600 flex items-center gap-1"><Sparkles size={14} /> AI Tools</button>
            <button onClick={() => scrollTo('execution')} className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all">Execute</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Infrastructure as Code</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.05] gradient-text">
              Automate <br />Everything.
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mb-10 mx-auto lg:mx-0 leading-relaxed">
              Master the "Agentless" engine. Use our AI Playground to generate playbooks from natural language.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => scrollTo('ai-tools')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center gap-2">
                <Sparkles size={18} /> AI Playbook Generator
              </button>
              <button onClick={() => scrollTo('demo')} className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Manual Guide
              </button>
            </div>
          </div>

          <div className="relative animate-float reveal-on-scroll">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800 px-4 py-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="p-8 font-code text-sm leading-relaxed">
                <p className="text-slate-500"># Initializing automation engine...</p>
                <p className="text-blue-400">$ ansible-playbook -i prod deploy.yml</p>
                <div className="mt-4 space-y-1">
                  <p className="text-emerald-400">PLAY [Configure Web Servers] ***********</p>
                  <p className="text-slate-300">TASK [Gathering Facts] ................ ok</p>
                  <p className="text-amber-400">TASK [Install Apache] .................. changed</p>
                  <p className="text-emerald-400">TASK [Start Service] .................. ok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Playground */}
      <section id="ai-tools" className="max-w-7xl mx-auto px-6 py-32 reveal-on-scroll">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight flex items-center gap-3">
              <Sparkles className="text-blue-600" /> AI Automation Playground
            </h2>
            <p className="text-slate-500">Generate complex Ansible playbooks or explain snippets instantly.</p>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Powered by Gemini 2.5 Flash
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="neo-card p-8 border-blue-100 bg-blue-50/30">
              <h3 className="font-bold text-lg mb-4">Describe Your Goal</h3>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Install Nginx on Ubuntu, copy a config file, and ensure service is restarted'..." 
                className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm mb-4"
              />
              <button 
                onClick={generatePlaybook}
                disabled={isLoading}
                className="w-full py-4 ai-shimmer text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? "Generating..." : <><Sparkles size={18} /> Generate Playbook</>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-900 rounded-2xl h-full flex flex-col shadow-2xl overflow-hidden border border-white/5">
              <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Generated Content</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-2"
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
              <div className="p-8 font-code text-sm text-slate-300 whitespace-pre overflow-auto max-h-[500px] flex-grow">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                ) : aiOutput || <span className="text-slate-500 italic">Playbook output will appear here...</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="structure" className="max-w-7xl mx-auto px-6 py-32 reveal-on-scroll">
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Playbook Architecture</h2>
          <p className="text-slate-500">A Playbook is a collection of "plays" targeting your fleet.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "The Play", icon: <Layers />, desc: "Defines activities for specific host groups like DB or Web.", color: "blue" },
            { title: "Privilege", icon: <ShieldCheck />, desc: "Setting 'become: true' allows execution with root/sudo privileges.", color: "amber" },
            { title: "Facts", icon: <Cpu />, desc: "Implicitly collects system info before running logic.", color: "emerald" }
          ].map((item, i) => (
            <div key={i} className="neo-card p-10 flex flex-col">
              <div className={`w-14 h-14 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center text-2xl mb-8`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-4">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-32 reveal-on-scroll">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-8 leading-tight">Understanding <br /><span className="text-blue-400">Modules</span></h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Modules are the workhorses that perform the execution—installing databases, starting services, or managing files.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><BookOpen size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Official Documentation</h4>
                    <p className="text-sm text-slate-500">Use official docs to find syntax rather than memorizing it.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Box size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">ansible.builtin</h4>
                    <p className="text-sm text-slate-500">Vast library including apt, service, and copy.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "apt", label: "Package Mgmt", color: "blue" },
                { name: "copy", label: "File Transfer", color: "emerald" },
                { name: "service", label: "State Control", color: "amber" },
                { name: "user", label: "IAM Roles", color: "purple" }
              ].map((m, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <p className={`text-${m.color}-400 font-code text-xs mb-2`}>ansible.builtin.{m.name}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section id="demo" className="max-w-4xl mx-auto px-6 py-32 reveal-on-scroll">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Step-by-Step Walkthrough</span>
          <h2 className="text-4xl font-extrabold mt-4">Deploying a Web Server</h2>
        </div>

        <div className="space-y-12">
          {[
            { 
              step: 1, 
              title: "Install Apache", 
              module: "apt module", 
              code: "- name: Install Apache\n  apt:\n    name: apache2\n    state: present" 
            },
            { 
              step: 2, 
              title: "Deploy HTML", 
              module: "copy module", 
              code: "- name: Copy index page\n  copy:\n    src: index.html\n    dest: /var/www/html/index.html" 
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-10">
              <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 text-white flex-shrink-0 flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="neo-card flex-1 p-8">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold">{item.title} <span className="text-slate-400 text-xs font-code ml-2">{item.module}</span></h4>
                  <button 
                    onClick={() => explainLogic(item.code)}
                    className="text-[10px] text-blue-600 font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                  >
                    <Sparkles size={10} /> Explain Logic
                  </button>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl font-code text-xs text-slate-600 whitespace-pre">
                  {item.code}
                </div>
              </div>
            </div>
          ))}

          {/* Execution Block */}
          <div id="execution" className="flex gap-10 reveal-on-scroll">
            <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-500 text-white flex-shrink-0 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30">
              <Rocket size={18} />
            </div>
            <div className="bg-slate-900 text-white flex-1 p-8 rounded-[2rem] shadow-2xl">
              <h4 className="font-bold mb-4">Execution Command</h4>
              <p className="text-sm text-slate-400 mb-6 italic">"Trigger the orchestration across your fleet."</p>
              <div className="bg-black/50 p-6 rounded-2xl font-code text-sm text-emerald-400 border border-white/5">
                ansible-playbook -i inventory.ini webserver.yml
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
              <Terminal size={20} />
            </div>
            <span className="font-bold tracking-tight">Ansible Learning Hub</span>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            &copy; 2026 DevOps Operations • Agentless Architecture
          </p>
          <div className="flex gap-6">
            <Github className="text-slate-400 hover:text-blue-600 cursor-pointer" size={20} />
            <Linkedin className="text-slate-400 hover:text-blue-600 cursor-pointer" size={20} />
          </div>
        </div>
      </footer>

      {/* Explanation Modal */}
      {explanation && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[210] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-blue-600 mb-4 text-2xl flex justify-between">
              <Sparkles size={24} />
              <button onClick={() => setExplanation(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <h3 className="font-extrabold text-xl mb-3 leading-tight">Concept Analysis</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{explanation}</p>
            <button 
              onClick={() => setExplanation(null)} 
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Close Insight
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-10 right-10 z-[200] transition-all duration-500 transform ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
          <div className="text-blue-400">
            {toast.type === "success" && <CheckCircle size={20} className="text-emerald-400" />}
            {toast.type === "warn" && <AlertTriangle size={20} className="text-amber-400" />}
            {toast.type === "info" && <Info size={20} className="text-blue-400" />}
          </div>
          <p className="text-sm font-bold">{toast.msg}</p>
        </div>
      </div>
    </div>
  );
};

export default App;