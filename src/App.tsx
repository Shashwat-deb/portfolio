import { useState, useEffect } from 'react';
import { CRTContainer } from './components/CRTContainer';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';
import { MobilePortfolio } from './components/MobilePortfolio';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Resize listener to toggle mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return (
    <CRTContainer>
      {!isLoggedIn ? (
        <BootScreen onLoginCompleted={() => setIsLoggedIn(true)} />
      ) : (
        <Desktop onLogout={() => setIsLoggedIn(false)} />
      )}
    </CRTContainer>
  );
}

export default App;
