import React, { useEffect, useState } from 'react';
import './index.css';
import BoostsPage from './BoostsPage';
import FrensPage from './FrensPage';
import Loader from './Loader';
import QRCode from 'qrcode.react';

const App: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [pointsPerTap, setPointsPerTap] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFarming, setIsFarming] = useState<boolean>(false);
  const [farmingStartTime, setFarmingStartTime] = useState<number | null>(null);
  const [farmingPoints, setFarmingPoints] = useState<number>(0);

  const FARMING_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/users/username');
        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isFarming && farmingStartTime !== null) {
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - farmingStartTime;
        if (elapsedTime >= FARMING_DURATION) {
          setIsFarming(false);
          setFarmingPoints(pointsPerTap * (FARMING_DURATION / 1000)); // Points based on duration
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isFarming, farmingStartTime, pointsPerTap]);

  const handleStartFarming = () => {
    setIsFarming(true);
    setFarmingStartTime(Date.now());
    setFarmingPoints(0);
  };

  const handleClaimFarming = () => {
    setPoints((prevPoints) => prevPoints + farmingPoints);
    setFarmingPoints(0);
  };

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    return (
      <div className="pc-restriction">
        <h1>Mobile gaming is best</h1>
        <p>Please access this app on your mobile device.</p>
        <QRCode value="https://t.me/proofcoin_bot/PROOFCOIN" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <Loader />
        </div>
      )}

      {currentPage === 'main' && (
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
            <div className="w-full cursor-pointer">
              <div className="bg-[#2b2d42] text-center py-2 rounded-xl">
                <p className="text-lg">
                  Coming soon
                </p>
              </div>
            </div>
            <div className="mt-12 text-5xl font-bold flex items-center">
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
            <div className="w-full flex justify-between gap-2">
              <div className="flex-grow flex items-center max-w-60 text-sm">
                <div className="w-full bg-[#2f5a69] py-4 rounded-2xl flex justify-around">
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('frens')}>
                    <span>Frens</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#ee9b00]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('main')}>
                    <span>Earn</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#ee9b00]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('boosts')}>
                    <span>Boosts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center">
            {!isFarming ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleStartFarming}
              >
                Start Farming
              </button>
            ) : (
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClaimFarming}
              >
                Claim {farmingPoints} Points
              </button>
            )}
          </div>
        </div>
      )}

      {currentPage === 'boosts' && (
        <BoostsPage
          onBack={handleBack}
          energyExtent={0}
          setEnergyExtent={() => {}}
          points={points}
          setPoints={setPoints}
          setPointsPerTap={setPointsPerTap}
          pointsPerTap={pointsPerTap}
        />
      )}

      {currentPage === 'frens' && (
        <FrensPage onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
