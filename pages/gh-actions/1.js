import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Play, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Layers, 
  Box, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Info,
  Lock,
  Server,
  Workflow
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600" />
            {title}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const sections = [
    { id: 'overview', label: 'What is it?', icon: <Github className="w-4 h-4" /> },
    { id: 'features', label: 'Top Features', icon: <Zap className="w-4 h-4" /> },
    { id: 'components', label: 'Core Components', icon: <Layers className="w-4 h-4" /> },
    { id: 'tutorial', label: 'Quick Start', icon: <Terminal className="w-4 h-4" /> },
    { id: 'best-practices', label: 'Best Practices', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing & Limits', icon: <DollarSign className="w-4 h-4" /> },
  ];

  const NavItem = ({ section }) => (
    <button
      onClick={() => {
        setActiveTab(section.id);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full ${
        activeTab === section.id 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {section.icon}
      <span className="font-medium">{section.label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'core'} 
        onClose={() => setActiveModal(null)}
        title="Deep Dive: Core Capabilities"
      >
        <div className="space-y-4">
          <p className="text-slate-600">GitHub Actions provides advanced orchestration beyond simple scripts:</p>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
              <Workflow className="w-5 h-5 text-indigo-600 mt-1" />
              <div>
                <span className="font-bold block">Matrix Strategy</span>
                <span className="text-sm text-slate-600">Run jobs across dozens of OS and language versions simultaneously using a single definition.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
              <Layers className="w-5 h-5 text-indigo-600 mt-1" />
              <div>
                <span className="font-bold block">Environment Protection</span>
                <span className="text-sm text-slate-600">Set required reviewers, wait timers, and deployment branches for production environments.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
              <Box className="w-5 h-5 text-indigo-600 mt-1" />
              <div>
                <span className="font-bold block">Artifact & Cache Management</span>
                <span className="text-sm text-slate-600">Store binaries for 90 days or cache `node_modules` to speed up subsequent runs by 80%.</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'runner'} 
        onClose={() => setActiveModal(null)}
        title="Architecture: Runner Types"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-indigo-600 flex items-center gap-2 mb-2">
                <Server className="w-4 h-4" /> GitHub-hosted Runners
              </h4>
              <p className="text-sm text-slate-600">Managed VMs (Ubuntu, Windows, macOS) provided by GitHub. They are fresh for every job, ensuring no side effects, but have limited hardware specs.</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-emerald-600 flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4" /> Self-hosted Runners
              </h4>
              <p className="text-sm text-slate-600">Your own infrastructure (On-prem or Cloud). Ideal for specific hardware requirements (GPUs), private network access, or large disk space needs.</p>
            </div>
          </div>
          <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs">
            # Example: Targeting a specific runner<br/>
            runs-on: [self-hosted, linux, x64, gpu-enabled]
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'security'} 
        onClose={() => setActiveModal(null)}
        title="Reference: Security Hardening"
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-amber-900 mb-1">Principle of Least Privilege</p>
              <p className="text-amber-800 leading-relaxed">By default, `GITHUB_TOKEN` has broad permissions. Always restrict them in your YAML file to prevent lateral movement in case of a breach.</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800">Key Security Controls:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Pinning actions to 40-character commit SHAs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Using OpenID Connect (OIDC) for Cloud Auth
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Secret masking in runner logs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                CodeQL scanning integrated via Actions
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Github className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-lg">Actions Guide</span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky lg:top-0 h-screen w-64 bg-white border-r border-slate-200 p-6 z-40 transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="hidden lg:flex items-center gap-2 mb-10 px-2">
            <Github className="w-8 h-8 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight">GitHub Actions</span>
          </div>
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Documentation</p>
            {sections.map(s => <NavItem key={s.id} section={s} />)}
          </nav>
          
          <div className="absolute bottom-8 left-6 right-6">
            <div className="bg-slate-900 rounded-xl p-4 text-white text-xs">
              <p className="font-bold mb-1">Part of CI/CD Series</p>
              <p className="text-slate-400 mb-3">Extensive guides about automation workflows.</p>
              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Learn more <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 lg:p-12 max-w-4xl">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-extrabold mb-6">What is GitHub Actions?</h1>
              <div className="prose prose-slate max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  GitHub Actions is an automation framework built into GitHub, designed to help developers automate workflows across the software development lifecycle (SDLC).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-indigo-600">
                      <Layout className="w-5 h-5" /> Massive Scale
                    </h3>
                    <p className="text-slate-600">Over 100 million users make it one of the most accessible automation options globally.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-indigo-600">
                      <Terminal className="w-5 h-5" /> YAML Syntax
                    </h3>
                    <p className="text-slate-600">Define pipelines using version-controlled, repeatable, and maintainable YAML directly in your repos.</p>
                  </div>
                </div>

                {/* Core Capability Section with Popup */}
                <div className="bg-indigo-600 rounded-2xl p-8 text-white mb-12 shadow-lg relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Core Capabilities</h3>
                    <p className="text-indigo-100 mb-6 max-w-lg">GitHub Actions goes beyond simple automation. It handles complex multi-stage workflows, environment-specific deployments, and matrix builds.</p>
                    <button 
                      onClick={() => setActiveModal('core')}
                      className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    >
                      Explore Capabilities <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <Workflow className="absolute -right-10 -bottom-10 w-64 h-64 text-indigo-500 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-2xl mb-8">
                  <p className="text-indigo-900 italic">
                    "GitHub Actions integrates with GitHub’s APIs, repositories, and issues... automating everything from testing and building to deploying applications."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-8">Top 5 Features</h2>
              <div className="space-y-4">
                {[
                  { title: "Workflow automation", desc: "Automates CI/CD, testing, and deployment via YAML files.", icon: <Play className="text-blue-500" /> },
                  { title: "Event-driven triggers", desc: "Trigger on commits, PRs, or issue updates automatically.", icon: <Zap className="text-amber-500" /> },
                  { title: "Reusable actions", desc: "Large library of pre-built marketplace actions for modularity.", icon: <Box className="text-purple-500" /> },
                  { title: "GitHub Ecosystem", desc: "Deep integration with APIs, issues, and project management.", icon: <Github className="text-slate-800" /> },
                  { title: "Custom runners", desc: "Run jobs on your own hardware for tailored environments.", icon: <Cpu className="text-emerald-500" /> },
                ].map((f, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-slate-50 rounded-lg">{f.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{f.title}</h4>
                      <p className="text-slate-600">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-8">Core Components</h2>
              <div className="grid gap-8">
                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-600">
                    <Layers className="w-5 h-5" /> Workflows & Events
                  </h3>
                  <p className="text-slate-600 mb-4">Workflows reside in <code className="bg-slate-100 px-1 rounded">.github/workflows</code> and respond to events like push or merge.</p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <span className="text-pink-400">on:</span> [push, pull_request]
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-600">
                    <Box className="w-5 h-5" /> Jobs & Actions
                  </h3>
                  <p className="text-slate-600 mb-4">Jobs run in isolated environments and contain steps which use Actions (reusable scripts).</p>
                  <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-sm text-slate-600">
                    <strong>Note:</strong> Jobs can run concurrently to optimize CI/CD speed.
                  </div>
                </section>

                {/* Runner Architecture Section with Popup */}
                <section className="bg-white border border-slate-200 p-8 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600">
                      <Cpu className="w-5 h-5" /> Runner Architecture
                    </h3>
                    <button 
                      onClick={() => setActiveModal('runner')}
                      className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                    >
                      Full Details <Info className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-600 mb-6">Runners are the servers that execute your code. GitHub provides flexible options for both managed and self-hosted environments.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Hosted</p>
                      <p className="text-sm font-medium">Standard VMs</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Self-Hosted</p>
                      <p className="text-sm font-medium">Custom Hardware</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'tutorial' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-4">First Workflow Tutorial</h2>
              <p className="text-slate-600 mb-8 font-medium">Follow these steps to launch your first automation.</p>
              
              <div className="space-y-12">
                <div className="relative pl-8 border-l-2 border-indigo-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white" />
                  <h4 className="font-bold text-lg mb-2">1. Create a workflow file</h4>
                  <p className="text-slate-600 mb-4">Add <code className="bg-slate-100 px-1 rounded">.github/workflows/demo-github-actions-workflow.yml</code> to your repo.</p>
                  <pre className="bg-slate-900 rounded-lg p-6 text-indigo-300 text-xs overflow-x-auto">
{`name: Demo GitHub Actions Workflow
on: [push]
jobs:
  Discover-GitHub-Actions-Workflows:
    runs-on: ubuntu-latest
    steps:
      - run: echo "\${{ github.event_name }} event triggered."
      - name: Checking out code
        uses: actions/checkout@v3
      - run: ls \${{ github.workspace }}`}
                  </pre>
                </div>

                <div className="relative pl-8 border-l-2 border-indigo-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white" />
                  <h4 className="font-bold text-lg mb-2">2. View workflow results</h4>
                  <p className="text-slate-600 mb-4">Navigate to the <strong>Actions</strong> tab on GitHub. Click your workflow name to see detailed logs for every step executed.</p>
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-emerald-800 text-sm font-medium">Success! Your workflow is now live.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'best-practices' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold">Best Practices</h2>
                <button 
                  onClick={() => setActiveModal('security')}
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors"
                >
                  <Lock className="w-4 h-4" /> Security Hardening Ref
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Set Timeouts", body: "Avoid stuck jobs by setting timeout-minutes (default is 6h).", icon: <Clock /> },
                  { title: "Concurrency", body: "Cancel in-progress jobs on new pushes to save resources.", icon: <Zap /> },
                  { title: "Least Privilege", body: "Limit permissions to read-only where possible.", icon: <ShieldCheck /> },
                  { title: "Pin SHAs", body: "Reference specific commit SHAs for actions instead of tags.", icon: <Box /> },
                  { title: "Trusted Sources", body: "Evaluate third-party actions carefully before use.", icon: <Github /> },
                  { title: "Cache Dependencies", body: "Use actions/cache to speed up builds significantly.", icon: <Layers /> },
                ].map((bp, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                    <div className="text-indigo-600 mb-3">{bp.icon}</div>
                    <h5 className="font-bold mb-1">{bp.title}</h5>
                    <p className="text-sm text-slate-500">{bp.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-6">Pricing & Allowances</h2>
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-slate-600">Plan</th>
                      <th className="p-4 font-semibold text-slate-600">Storage</th>
                      <th className="p-4 font-semibold text-slate-600">Minutes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="p-4 font-medium">GitHub Free</td><td className="p-4">500 MB</td><td className="p-4">2,000</td></tr>
                    <tr><td className="p-4 font-medium text-indigo-600">GitHub Pro</td><td className="p-4">1 GB</td><td className="p-4">3,000</td></tr>
                    <tr><td className="p-4 font-medium">GitHub Team</td><td className="p-4">2 GB</td><td className="p-4">3,000</td></tr>
                    <tr className="bg-indigo-50/50"><td className="p-4 font-bold">Enterprise</td><td className="p-4">50 GB</td><td className="p-4">50,000</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <h4 className="flex items-center gap-2 text-red-700 font-bold mb-4">
                    <AlertTriangle className="w-5 h-5" /> Limitations
                  </h4>
                  <ul className="space-y-2 text-sm text-red-600 list-disc pl-4">
                    <li>Complexity can be overwhelming for new users.</li>
                    <li>Limited free tier for private projects.</li>
                    <li>"Shadow CD" risk: creating unmanageable script layers.</li>
                    <li>Inconsistent deployment times on small apps.</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="flex items-center gap-2 text-blue-700 font-bold mb-4">
                    <DollarSign className="w-5 h-5" /> OS Multipliers
                  </h4>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex justify-between"><span>Linux</span><span className="font-bold">$0.008/min</span></div>
                    <div className="flex justify-between"><span>Windows (2x)</span><span className="font-bold">$0.016/min</span></div>
                    <div className="flex justify-between"><span>macOS (10x)</span><span className="font-bold">$0.080/min</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub Actions Guide for Developers</span>
          </div>
          <div className="flex gap-8 text-slate-400 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">CI/CD Guide</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Marketplace</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Official Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;