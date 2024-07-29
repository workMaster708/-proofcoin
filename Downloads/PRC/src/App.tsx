import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { coin, highVoltage, notcoin, rocket, trophy, bear } from './images';
import Rank from './Rank';
import BoostsPage from './BoostsPage';
import FrensPage from './FrensPage';
import Loader from './Loader'; // Import Loader component
import QRCode from 'qrcode.react'; // Import QRCode component

const App: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(500);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [pointsPerTap, setPointsPerTap] = useState<number>(1);
  const [energyLimit, setEnergyLimit] = useState<number>(500);
  const [loading, setLoading] = useState<boolean>(false); // State for loader
  const [referralLink, setReferralLink] = useState<string>(''); // State for referral link

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loader
      try {
        const response = await fetch('/api/users/username'); // replace 'username' with actual username
        const data = await response.json();
        setPoints(data.points);
        setEnergy(data.energy);

        // Generate referral link for the current user
        const userId = data.userId; // Adjust this if necessary
        const referralResponse = await fetch(`/api/referrals/${userId}`);
        const referralData = await referralResponse.json();
        setReferralLink(`https://t.me/proofcoin_bot/referral?user=${referralData.referralCode}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, energyLimit));
    }, 1000);

    return () => clearInterval(interval);
  }, [energyLimit]);

  const handleTouchClick = useCallback(
    (e: React.TouchEvent<HTMLDivElement>): void => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      Array.from(e.changedTouches).forEach(({ clientX, clientY }) => {
        handleClick(clientX, clientY, rect);
      });
    },
    [energy, pointsPerTap]
  );

  const handleClick = (clientX: number, clientY: number, rect: DOMRect): void => {
    if (energy < pointsPerTap) {
      return; // Return early if energy is not sufficient for points per tap
    }

    const x: number = clientX - rect.left;
    const y: number = clientY - rect.top;

    setPoints((prevPoints) => prevPoints + pointsPerTap);
    setEnergy((prevEnergy) => prevEnergy - pointsPerTap); // Reduce energy by pointsPerTap
    setClicks((prevClicks) => [
      ...prevClicks,
      { id: Date.now(), x, y },
    ]);
  };

  useEffect(() => {
    const updateData = async () => {
      try {
        await fetch('/api/users/username', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points, energy }),
        });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };
    updateData();
  }, [points, energy]);

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
        <QRCode value="https://t.me/proofcoin_bot" />
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
                  Coming soon<Arrow size={18} className="ml-0 mb-1 inline-block" />
                </p>
              </div>
            </div>
            <div className="mt-12 text-5xl font-bold flex items-center">
              <img src={coin} width={44} height={44} alt="coin" />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
            <div className="text-base mt-2 flex items-center">
              <img src={trophy} width={24} height={24} alt="trophy" />
              <Rank points={points} />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
            <div className="w-full flex justify-between gap-2">
              <div className="w-1/3 flex items-center justify-start max-w-32">
                <div className="flex items-center justify-center">
                  <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                  <div className="ml-2 text-left">
                    <span className="text-white text-2xl font-bold block">{energy}</span>
                    <span className="text-white text-large opacity-75">/ {energyLimit}</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex items-center max-w-60 text-sm">
                <div className="w-full bg-[#2f5a69] py-4 rounded-2xl flex justify-around">
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('frens')}>
                    <img src={bear} width={24} height={24} alt="bear" />
                    <span>Frens</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#ee9b00]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('main')}>
                    <img src={coin} width={24} height={24} alt="coin" />
                    <span>Earn</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#ee9b00]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleMenuClick('boosts')}>
                    <img src={rocket} width={24} height={24} alt="rocket" />
                    <span>Boosts</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#f9c035] rounded-full mt-4">
              <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / energyLimit) * 100}%` }}></div>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="relative mt-4" onTouchStart={handleTouchClick}>
              <img src={notcoin} width={256} height={256} alt="notcoin" />
              {clicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-5xl font-bold float-animation"
                  style={{
                    top: `${click.y - 42}px`,
                    left: `${click.x - 28}px`,
                  }}
                  onAnimationEnd={() => setClicks((prevClicks) => prevClicks.filter((c) => c.id !== click.id))}
                >
                  +{pointsPerTap}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'boosts' && (
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <button onClick={handleBack} className="absolute top-4 left-4 text-white bg-[#2f5a69] py-2 px-4 rounded-lg">
            Back
          </button>
          <BoostsPage
            energyExtent={energyLimit}
            setEnergyExtent={setEnergyLimit}
            points={points}
            setPoints={setPoints}
            setPointsPerTap={setPointsPerTap}
            pointsPerTap={pointsPerTap}
          />
        </div>
      )}

      {currentPage === 'frens' && (
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <button onClick={handleBack} className="absolute top-4 left-4 text-white bg-[#2f5a69] py-2 px-4 rounded-lg">
            Back
          </button>
          <FrensPage handleBack={handleBack} />
          <div className="w-full max-w-xs mt-4">
            <h2 className="text-lg font-bold mb-2">Share Your Referral Link</h2>
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
            /></div>
        </div>
      )}
    </div>
  );
};

export default App;
