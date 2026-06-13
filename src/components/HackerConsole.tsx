import React, { useState, useEffect } from 'react';

export const HackerConsole: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'hacking' | 'revealed'>('hacking');
  
  const hackingScript = [
    "Initializing decrypter v0.8.2...",
    "Bypassing security protocols...",
    "Target: shashwat_core_facts.dat",
    "Downloading encrypted packets...",
    "[##                  ] 10%",
    "[######              ] 30%",
    "[##########          ] 50%",
    "[##############      ] 70%",
    "[####################] 100%",
    "Packet download complete.",
    "Decrypting payload with private key...",
    "Access Granted. Outputting decrypted files...",
    "==========================================="
  ];
  
  const funFacts = [
    "🚀 FUN FACTS UNLOCKED:",
    "• I built this portfolio to blend modern React with retro Mac OS 9 design.",
    "• Outside of coding, I'm deeply interested in quantitative finance models.",
    "• I can write clean code in C, C++, Java, Python, and TypeScript.",
    "• I'm a student at Manipal University Jaipur, graduating in 2028.",
    "• Easter Egg: You triggered this console via a secret shortcut!"
  ];
  
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < hackingScript.length) {
        setLines(prev => [...prev, hackingScript[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('revealed');
          let factIdx = 0;
          const factInterval = setInterval(() => {
            if (factIdx < funFacts.length) {
              setLines(prev => [...prev, funFacts[factIdx]]);
              factIdx++;
            } else {
              clearInterval(factInterval);
            }
          }, 350);
        }, 400);
      }
    }, 200);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="w-full h-full bg-black text-[#39ff14] font-mono text-[11px] p-4 overflow-y-auto no-scrollbar space-y-1 select-text">
      {lines.map((l, idx) => (
        <div key={idx} className={l.startsWith('🚀') || l.startsWith('•') ? 'text-cyan-400 font-semibold' : ''}>
          {l}
        </div>
      ))}
      {phase === 'revealed' && lines.length >= hackingScript.length + funFacts.length && (
        <div className="text-zinc-500 text-[10px] mt-4 animate-pulse">
          Console idle. Press window close button to exit.
        </div>
      )}
    </div>
  );
};
