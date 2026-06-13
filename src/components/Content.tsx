import React, { useState } from 'react';
import { Mail, Code, Award, Briefcase, MapPin } from 'lucide-react';
import { playClickSound, playOpenSound } from '../utils/audio';

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

/* ==========================================================================
   ABOUT WINDOW CONTENT
   ========================================================================== */
export const AboutContent: React.FC = () => {
  const skills = ['C', 'C++', 'Java', 'Python', 'JS/TS', 'SQL', 'React.js', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Quant Finance', 'Git'];

  return (
    <div className="font-retro-mono text-xs text-zinc-800 space-y-6 max-w-full select-text py-2">
      {/* Bio Summary Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b-2 border-zinc-800 pb-4">
        {/* Mock Avatar */}
        <div className="w-16 h-16 border-2 border-zinc-800 bg-[#e5dfd5] text-zinc-900 flex items-center justify-center font-retro-serif text-3xl font-bold retro-border-shadow flex-shrink-0">
          SD
        </div>
        <div>
          <h3 className="font-retro-serif text-base font-bold text-zinc-900">Shashwat Shikhar Dwivedi</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Software Developer & Student</p>
          <div className="flex items-center gap-1.5 mt-1 text-zinc-600">
            <MapPin size={12} />
            <span>Jaipur, Rajasthan, India</span>
          </div>
        </div>
      </div>

      {/* Grid of Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Card */}
        <div className="border-2 border-zinc-800 bg-[#f4efeb] p-3 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-retro-serif font-bold text-sm text-zinc-900 border-b border-zinc-400 pb-1 mb-2">
            <Award size={14} />
            <span>Education</span>
          </div>
          <p className="font-semibold text-zinc-900">Manipal University Jaipur</p>
          <p className="text-[10px] text-zinc-600">B.Tech in Computer Science</p>
          <p className="text-[10px] text-zinc-500 mt-1">Class of 2024 – 2028</p>
          <div className="mt-2 text-[10px] bg-zinc-800 text-white px-1.5 py-0.5 inline-block rounded">
            CGPA: 8.56
          </div>
        </div>

        {/* Experience Card */}
        <div className="border-2 border-zinc-800 bg-[#f4efeb] p-3 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-retro-serif font-bold text-sm text-zinc-900 border-b border-zinc-400 pb-1 mb-2">
            <Briefcase size={14} />
            <span>Experience</span>
          </div>
          <p className="font-semibold text-zinc-900">SDC (Software Dev Cell)</p>
          <p className="text-[10px] text-zinc-600">Software Developer Intern</p>
          <p className="text-[10px] text-zinc-500 mt-1">Contributing to open source campus tools and internal university portals.</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 font-retro-serif font-bold text-sm text-zinc-900 border-b border-zinc-800 pb-1">
          <Code size={14} />
          <span>Core Skillset</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="px-2.5 py-1 bg-[#fbfaf7] border border-zinc-800 font-semibold text-zinc-800 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-[10px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Retro system logs details */}
      <div className="border-2 border-zinc-800 bg-zinc-900 text-green-400 p-3 rounded font-mono text-[10px] leading-relaxed shadow-inner">
        <p className="text-zinc-400">$ system_status --check</p>
        <p>• Shashwat-Core: ONLINE [MUJ_CLIENT_1.0]</p>
        <p>• Node Version: v20.15.0 (Vite Ready)</p>
        <p>• Portfolio Build: Compiled and rendering inside CRT Container successfully.</p>
      </div>
    </div>
  );
};

/* ==========================================================================
   PROJECTS WINDOW CONTENT (CARDS GRID)
   ========================================================================== */
export const ProjectsContent: React.FC = () => {
  const projects = [
    {
      title: 'Quant Risk Portfolio',
      subtitle: 'ARIMA / GARCH / VaR',
      description: 'Quantitative risk management tool utilizing statistical financial forecasting. Simulates Portfolio Value-at-Risk using historical stock data, ARIMA models, and GARCH volatility estimation.',
      tech: 'C++ · Python · Streamlit',
      imgId: '10' // Picsum ID
    },
    {
      title: 'MF Portfolio Pro',
      subtitle: 'Streamlit Analytics',
      description: 'Comprehensive Mutual Fund tracking dashboard providing rolling returns, tracking error, XIRR calculations, asset allocations, and sector concentration analytics.',
      tech: 'Python · Streamlit · PostgreSQL',
      imgId: '48' // Picsum ID
    },
    {
      title: 'Travel Buddy',
      subtitle: 'MUJ Carpooling Solution',
      description: 'A custom campus commute platform for Manipal University Jaipur students. Helps car poolers share rides, coordinate split fares, and find campus commuters.',
      tech: 'React · TS · Node · PostgreSQL',
      imgId: '64' // Picsum ID
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
      {projects.map((project, idx) => (
        <div 
          key={idx} 
          className="border-2 border-zinc-800 bg-[#fbfaf7] retro-border-shadow flex flex-col overflow-hidden"
        >
          {/* Card Image header */}
          <div className="h-32 border-b-2 border-zinc-800 bg-zinc-200 overflow-hidden relative">
            <img 
              src={`https://picsum.photos/id/${project.imgId}/400/200`} 
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-95 sepia-[20%] contrast-[1.05]"
            />
            <div className="absolute top-2 right-2 bg-zinc-950 text-white font-retro-mono text-[8px] px-1.5 py-0.5 rounded border border-zinc-700">
              CARD {idx + 1}
            </div>
          </div>

          {/* Card Info */}
          <div className="p-3.5 flex-grow flex flex-col justify-between font-retro-mono text-zinc-800 text-xs">
            <div>
              <h4 className="font-retro-serif text-sm font-bold text-zinc-900">{project.title}</h4>
              <p className="text-[9px] font-bold text-sky-700 uppercase tracking-wider mt-0.5">{project.subtitle}</p>
              <p className="text-[10px] text-zinc-600 mt-2 leading-relaxed select-text">{project.description}</p>
            </div>
            
            <div className="mt-4 border-t border-zinc-300 pt-2 flex items-center justify-between text-[9px]">
              <span className="font-semibold text-zinc-500">Tech: {project.tech}</span>
              <a 
                href="https://github.com/Shashwat-deb" 
                target="_blank" 
                rel="noreferrer"
                onClick={playClickSound}
                className="font-bold underline text-[#28509c] hover:text-blue-900 cursor-pointer"
              >
                view source
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ==========================================================================
   CONTACT FORM CONTENT
   ========================================================================== */
export const ContactContent: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'shashwatshikhard@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="font-retro-mono text-xs text-zinc-800 space-y-5 select-text py-1">
      <div className="border-b-2 border-zinc-800 pb-3">
        <h3 className="font-retro-serif text-base font-bold text-zinc-900">Establish Connection</h3>
        <p className="text-[10px] text-zinc-500 mt-0.5">Send a message directly to Shashwat's workstation.</p>
      </div>

      {status === 'success' ? (
        <div className="border-2 border-zinc-800 bg-[#e6f4ea] p-4 text-center space-y-2 retro-border-shadow">
          <p className="font-retro-serif font-bold text-emerald-800 text-sm">✓ Message Dispatched Successfully</p>
          <p className="text-[10px] text-zinc-600">Transmission received at <span className="underline font-semibold">shashwatshikhard@gmail.com</span>.</p>
        </div>
      ) : status === 'error' ? (
        <div className="border-2 border-zinc-800 bg-[#fde8e8] p-4 text-center space-y-2 retro-border-shadow">
          <p className="font-retro-serif font-bold text-red-800 text-sm">✗ Transmission Failed</p>
          <p className="text-[10px] text-zinc-600">Could not reach server. Try emailing directly at <span className="underline font-semibold">shashwatshikhard@gmail.com</span>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-zinc-600 uppercase">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#fbfaf7] border-2 border-zinc-800 p-2 text-xs font-retro-mono focus:outline-none focus:bg-[#f1ece1] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-zinc-600 uppercase">Your Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#fbfaf7] border-2 border-zinc-800 p-2 text-xs font-retro-mono focus:outline-none focus:bg-[#f1ece1] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"
                placeholder="e.g. name@email.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-zinc-600 uppercase">Message Body</label>
            <textarea 
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#fbfaf7] border-2 border-zinc-800 p-2 text-xs font-retro-mono focus:outline-none focus:bg-[#f1ece1] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"
              placeholder="Write your transmission details here..."
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-2 bg-[#28509c] hover:bg-blue-800 disabled:opacity-60 disabled:cursor-wait text-white font-bold retro-border-shadow retro-border-shadow-hover cursor-pointer"
          >
            {status === 'sending' ? '⏳ TRANSMITTING...' : 'DISPATCH TRANSMISSION'}
          </button>
        </form>
      )}

      {/* Social Network Node Links */}
      <div className="pt-2 border-t-2 border-zinc-800 space-y-2">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Alternate Channels (System Registry)</p>
        <div className="flex flex-col md:flex-row gap-4">
          <a 
            href="mailto:shashwatshikhard@gmail.com"
            onClick={playClickSound}
            className="flex items-center gap-2 hover:underline text-[#28509c] font-semibold cursor-pointer"
          >
            <Mail size={14} className="text-zinc-800" />
            <span>shashwatshikhard@gmail.com</span>
          </a>
          <a 
            href="https://linkedin.com/in/shashwat-shikhar-d" 
            target="_blank" 
            rel="noreferrer"
            onClick={playClickSound}
            className="flex items-center gap-2 hover:underline text-[#28509c] font-semibold cursor-pointer"
          >
            <LinkedinIcon size={14} className="text-zinc-800" />
            <span>linkedin.com/in/shashwat-shikhar-d</span>
          </a>
          <a 
            href="https://github.com/Shashwat-deb" 
            target="_blank" 
            rel="noreferrer"
            onClick={playClickSound}
            className="flex items-center gap-2 hover:underline text-[#28509c] font-semibold cursor-pointer"
          >
            <GithubIcon size={14} className="text-zinc-800" />
            <span>github.com/Shashwat-deb</span>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   FOLDER DIRECTORY NAVIGATION
   ========================================================================== */
interface FolderContentProps {
  onOpenWork: () => void;
  onOpenContact: () => void;
}

export const FolderContent: React.FC<FolderContentProps> = ({ onOpenWork, onOpenContact }) => {
  const handleItemClick = (type: 'work' | 'contact') => {
    playOpenSound();
    if (type === 'work') onOpenWork();
    else onOpenContact();
  };

  return (
    <div className="w-full h-full flex items-start justify-start gap-12 p-6 font-retro-mono">
      {/* WORK FOLDER */}
      <button 
        onClick={() => handleItemClick('work')}
        className="flex flex-col items-center gap-2 cursor-pointer group text-zinc-800 hover:text-blue-700"
      >
        <div className="w-16 h-16 flex items-center justify-center p-1 rounded group-hover:bg-[#28509c]/10">
          <img src="/icons/diskutility.png" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" alt="WORK" />
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase bg-[#fbfaf7] border border-zinc-800 px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          WORK
        </span>
      </button>

      {/* CONTACT FILE */}
      <button 
        onClick={() => handleItemClick('contact')}
        className="flex flex-col items-center gap-2 cursor-pointer group text-zinc-800 hover:text-blue-700"
      >
        <div className="w-16 h-16 flex items-center justify-center p-1 rounded group-hover:bg-[#28509c]/10">
          <img src="/icons/ichat.png" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" alt="CONTACT" />
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase bg-[#fbfaf7] border border-zinc-800 px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          CONTACT
        </span>
      </button>
    </div>
  );
};
