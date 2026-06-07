import React, { useState } from 'react';
import { Mail, Award, Briefcase, Code, ChevronRight } from 'lucide-react';
import { playClickSound } from '../utils/audio';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const MobilePortfolio: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const skills = ['C++', 'Python', 'Java', 'JS/TS', 'React', 'Node', 'PostgreSQL', 'Streamlit'];

  const projects = [
    {
      title: 'Quant Risk Portfolio',
      subtitle: 'ARIMA / GARCH / VaR',
      description: 'Quantitative risk management tool utilizing statistical financial forecasting. Simulates Portfolio Value-at-Risk using historical stock data, ARIMA models, and GARCH volatility estimation.',
      tech: 'C++ · Python · Streamlit',
      imgId: '10'
    },
    {
      title: 'MF Portfolio Pro',
      subtitle: 'Streamlit Analytics',
      description: 'Comprehensive Mutual Fund tracking dashboard providing rolling returns, tracking error, XIRR calculations, asset allocations, and sector concentration analytics.',
      tech: 'Python · Streamlit · PostgreSQL',
      imgId: '48'
    },
    {
      title: 'Travel Buddy',
      subtitle: 'MUJ Carpooling Solution',
      description: 'A custom campus commute platform for Manipal University Jaipur students. Helps car poolers share rides, coordinate split fares, and find campus commuters.',
      tech: 'React · TS · Node · PostgreSQL',
      imgId: '64'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-zinc-800 flex flex-col font-retro-mono px-4 py-8 select-text overflow-y-auto">
      {/* Mobile Top Header */}
      <header className="border-2 border-zinc-800 p-5 bg-[#F1ECE1] retro-border-shadow text-center mb-8">
        <div className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center font-retro-serif text-2xl font-bold mx-auto mb-3">
          SD
        </div>
        <h1 className="font-retro-serif text-2xl font-bold text-zinc-900">Shashwat Shikhar Dwivedi</h1>
        <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">CS Undergrad MUJ 2024–2028 · CGPA 8.56</p>
        <div className="h-[2px] bg-zinc-800 my-3" />
        <p className="text-xs text-zinc-700 leading-relaxed font-retro-serif italic">
          "Software Developer Intern at SDC, specializing in quantitative models, Streamlit analytical portals, and React development."
        </p>
      </header>

      {/* Navigation Quick Anchors */}
      <nav className="grid grid-cols-3 gap-2 mb-8 text-center text-xs">
        <a href="#about" className="border-2 border-zinc-800 bg-[#F1ECE1] py-1.5 font-bold retro-border-shadow hover:bg-zinc-200">
          About
        </a>
        <a href="#projects" className="border-2 border-zinc-800 bg-[#F1ECE1] py-1.5 font-bold retro-border-shadow hover:bg-zinc-200">
          Projects
        </a>
        <a href="#contact" className="border-2 border-zinc-800 bg-[#F1ECE1] py-1.5 font-bold retro-border-shadow hover:bg-zinc-200">
          Contact
        </a>
      </nav>

      {/* Main content body */}
      <main className="space-y-12">
        
        {/* ABOUT ME SECTION */}
        <section id="about" className="space-y-4 scroll-mt-6">
          <div className="border-b-2 border-zinc-800 pb-1.5">
            <h2 className="font-retro-serif text-lg font-bold text-zinc-900 flex items-center gap-2">
              <ChevronRight size={18} />
              <span>About Me</span>
            </h2>
          </div>

          <div className="space-y-4">
            {/* Education Info */}
            <div className="border-2 border-zinc-800 bg-[#fbfaf7] p-4 retro-border-shadow">
              <h3 className="font-retro-serif text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                <Award size={14} className="text-zinc-800" />
                <span>Education Registry</span>
              </h3>
              <p className="font-bold text-zinc-900">B.Tech in Computer Science</p>
              <p className="text-xs text-zinc-700 mt-0.5">Manipal University Jaipur (2024–2028)</p>
              <p className="text-[10px] text-zinc-500 mt-1">Current Academic Rating: <span className="font-bold text-zinc-900 bg-[#F1ECE1] px-1 border border-zinc-800">CGPA 8.56</span></p>
            </div>

            {/* Experience Info */}
            <div className="border-2 border-zinc-800 bg-[#fbfaf7] p-4 retro-border-shadow">
              <h3 className="font-retro-serif text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                <Briefcase size={14} className="text-zinc-800" />
                <span>Experience Node</span>
              </h3>
              <p className="font-bold text-zinc-900">Software Developer Intern</p>
              <p className="text-xs text-zinc-700 mt-0.5">Software Development Cell (SDC)</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Developing utility dashboards, campus network management apps, and optimizing web experiences.
              </p>
            </div>

            {/* Core Skills Badges */}
            <div className="border-2 border-zinc-800 bg-[#fbfaf7] p-4 retro-border-shadow space-y-2">
              <h3 className="font-retro-serif text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
                <Code size={14} className="text-zinc-800" />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-[#F1ECE1] border border-zinc-800 text-[10px] font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-4 scroll-mt-6">
          <div className="border-b-2 border-zinc-800 pb-1.5">
            <h2 className="font-retro-serif text-lg font-bold text-zinc-900 flex items-center gap-2">
              <ChevronRight size={18} />
              <span>Projects Grid</span>
            </h2>
          </div>

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="border-2 border-zinc-800 bg-[#fbfaf7] retro-border-shadow flex flex-col overflow-hidden">
                <div className="h-40 bg-zinc-200 overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/id/${project.imgId}/400/200`} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-95"
                  />
                  <div className="absolute top-2 right-2 bg-zinc-900 text-white text-[8px] px-1.5 py-0.5 rounded border border-zinc-700">
                    CARD {idx + 1}
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <h4 className="font-retro-serif text-sm font-bold text-zinc-900">{project.title}</h4>
                  <p className="text-[9px] font-bold text-sky-700 uppercase tracking-wide">{project.subtitle}</p>
                  <p className="text-zinc-600 leading-relaxed text-[11px]">{project.description}</p>
                  <div className="h-[1px] bg-zinc-200 my-2" />
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-semibold">Tech: {project.tech}</span>
                    <a href="https://github.com/Shashwat-deb" target="_blank" rel="noreferrer" className="underline font-bold text-[#28509c]">
                      source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="space-y-4 scroll-mt-6">
          <div className="border-b-2 border-zinc-800 pb-1.5">
            <h2 className="font-retro-serif text-lg font-bold text-zinc-900 flex items-center gap-2">
              <ChevronRight size={18} />
              <span>Contact Station</span>
            </h2>
          </div>

          <div className="border-2 border-zinc-800 bg-[#fbfaf7] p-5 retro-border-shadow space-y-4">
            {status === 'success' ? (
              <div className="border-2 border-emerald-800 bg-[#e6f4ea] p-4 text-center space-y-1 rounded">
                <p className="font-retro-serif font-bold text-emerald-800 text-sm">✓ Sent Successfully</p>
                <p className="text-[10px] text-zinc-600">Message sent to shashwatshikhard@gmail.com.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-zinc-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#fcfaf7] border-2 border-zinc-800 p-2 text-xs focus:outline-none"
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-zinc-500 uppercase">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#fcfaf7] border-2 border-zinc-800 p-2 text-xs focus:outline-none"
                    placeholder="Enter your email" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-zinc-500 uppercase">Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#fcfaf7] border-2 border-zinc-800 p-2 text-xs focus:outline-none"
                    placeholder="Type your message details..." 
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-[#28509c] text-white font-bold retro-border-shadow hover:bg-blue-800">
                  SUBMIT MESSAGE
                </button>
              </form>
            )}

            <div className="h-[2px] bg-zinc-800 my-4" />

            <div className="space-y-2 text-[11px] font-semibold">
              <a href="mailto:shashwatshikhard@gmail.com" className="flex items-center gap-2.5 text-[#28509c] hover:underline">
                <Mail size={16} className="text-zinc-800" />
                <span>shashwatshikhard@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/shashwat-shikhar-d" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-[#28509c] hover:underline">
                <LinkedinIcon size={16} className="text-zinc-800" />
                <span>linkedin.com/in/shashwat-shikhar-d</span>
              </a>
              <a href="https://github.com/Shashwat-deb" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-[#28509c] hover:underline">
                <GithubIcon size={16} className="text-zinc-800" />
                <span>github.com/Shashwat-deb</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="text-center text-[9px] text-zinc-400 mt-12 pt-4 border-t border-zinc-200">
        <p>© 2026 Shashwat Shikhar Dwivedi. All Rights Reserved.</p>
        <p className="mt-0.5">Designed with retro styling.</p>
      </footer>
    </div>
  );
};
