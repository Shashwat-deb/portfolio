import { useState, useEffect } from 'react';
import { CRTContainer } from './components/CRTContainer';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';
import { MobilePortfolio } from './components/MobilePortfolio';
import { RetroConfetti } from './components/RetroConfetti';
import { IdleCursor } from './components/IdleCursor';
import { playClickSound, playOpenSound } from './utils/audio';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNameAlert, setShowNameAlert] = useState(false);

  // Resize listener to toggle mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard combos listener
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let typedString = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Konami code
      if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
          playOpenSound();
          setIsLoggedIn(true);
          setTimeout(() => {
            window.dispatchEvent(new Event('trigger-konami'));
          }, 150);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = e.key === konami[0] ? 1 : 0;
      }

      // 2. Secret keyboard shortcuts (Ctrl + ` or Ctrl + Alt + T or Ctrl + Shift + H)
      if (
        (e.ctrlKey && e.key === '`') || 
        (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h')
      ) {
        e.preventDefault();
        playOpenSound();
        setIsLoggedIn(true);
        setTimeout(() => {
          window.dispatchEvent(new Event('trigger-hacker'));
        }, 150);
      }

      // 3. Plain word typing (hire me, shashwat)
      if (e.key.length === 1) {
        typedString = (typedString + e.key).slice(-20);
        
        if (typedString.toLowerCase().endsWith('hire me')) {
          setShowConfetti(true);
          typedString = '';
        }
        if (typedString.toLowerCase().endsWith('shashwat')) {
          playOpenSound();
          setShowNameAlert(true);
          typedString = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to standard custom event for confetti
  useEffect(() => {
    const handleConfettiTrigger = () => {
      setShowConfetti(true);
    };
    window.addEventListener('trigger-confetti', handleConfettiTrigger);
    return () => window.removeEventListener('trigger-confetti', handleConfettiTrigger);
  }, []);



  if (isMobile) {
    return <MobilePortfolio />;
  }

  return (
    <>
      <CRTContainer>
        {!isLoggedIn ? (
          <BootScreen onLoginCompleted={() => setIsLoggedIn(true)} />
        ) : (
          <Desktop onLogout={() => setIsLoggedIn(false)} />
        )}
      </CRTContainer>

      {/* Confetti Explosion overlay */}
      <RetroConfetti active={showConfetti} onClose={() => setShowConfetti(false)} />



      {/* Custom Idle watch cursor */}
      <IdleCursor />

      {/* Secret Name Alert Modal */}
      {showNameAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] select-none font-retro-mono">
          <div className="bg-[#fbfaf7] border-2 border-zinc-800 p-6 retro-border-shadow w-[360px] flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center text-4xl">
              🍪
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-retro-serif font-bold text-sm text-zinc-900">SYSTEM REGISTRY MATCHED</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Shashwat Dwivedi's secret signature sequence matched. Thank you for scanning the system registry!
              </p>
            </div>
            
            <div className="flex justify-center mt-2">
              <button 
                onClick={() => { playClickSound(); setShowNameAlert(false); }}
                className="px-6 py-1.5 bg-[#28509c] hover:bg-blue-800 text-white font-bold text-xs border-2 border-zinc-800 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                ACCEPT COOKIE 🍪
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
