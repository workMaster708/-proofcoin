import React, { useState, useEffect } from 'react';

// Constants
const COOLDOWN_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

const App: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [lastFarmingTime, setLastFarmingTime] = useState<number | null>(null);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [canClaim, setCanClaim] = useState<boolean>(false);

  useEffect(() => {
    const checkCooldown = () => {
      if (lastFarmingTime) {
        const now = new Date().getTime();
        const elapsed = now - lastFarmingTime;
        if (elapsed < COOLDOWN_DURATION) {
          setIsCooldown(true);
          const remainingTime = COOLDOWN_DURATION - elapsed;
          setTimeout(() => {
            setIsCooldown(false);
            setCanClaim(true);
          }, remainingTime);
        } else {
          setIsCooldown(false);
          setCanClaim(true);
        }
      } else {
        setCanClaim(false);
      }
    };
    checkCooldown();
  }, [lastFarmingTime]);

  const handleStartFarming = () => {
    if (!isCooldown) {
      setLastFarmingTime(new Date().getTime());
      setIsCooldown(true);
      setCanClaim(false);
    }
  };

  const handleClaimPoints = () => {
    if (canClaim) {
      setPoints(points + 1); // Increment points when claiming
      setLastFarmingTime(null); // Reset last farming time
      setCanClaim(false); // Reset claim status
      setIsCooldown(false); // Reset cooldown
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getCooldownTime = () => {
    if (lastFarmingTime) {
      const now = new Date().getTime();
      const elapsed = now - lastFarmingTime;
      const remainingTime = COOLDOWN_DURATION - elapsed;
      return formatTime(remainingTime);
    }
    return 'Ready to farm';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#f8d7da', padding: '10px', textAlign: 'center', color: '#721c24' }}>
        <strong>Note:</strong> The game is currently updating. Please check back shortly.
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Point Farming Game</h1>
        <p>Points: {points}</p>
        {isCooldown ? (
          <button disabled>{`Cooldown: ${getCooldownTime()}`}</button>
        ) : canClaim ? (
          <button onClick={handleClaimPoints}>Claim Points</button>
        ) : (
          <button onClick={handleStartFarming}>Start Farming</button>
        )}
      </div>
      <FooterMenu />
    </div>
  );
};

const FooterMenu: React.FC = () => {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <button>Home</button>
      <button>Task</button>
      <button>Frens</button>
      <button>Wallet</button>
    </footer>
  );
};

export default App;
