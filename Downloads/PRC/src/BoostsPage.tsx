import React, { useState, useEffect } from 'react';
import './BoostsPage.css';
import Loader from './Loader'; // Import Loader component

interface BoostsPageProps {
  energyExtent: number;
  setEnergyExtent: React.Dispatch<React.SetStateAction<number>>;
  setPointsPerTap: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  pointsPerTap: number; // Added pointsPerTap as a prop
}

const BoostsPage: React.FC<BoostsPageProps> = ({
  energyExtent,
  setEnergyExtent,
  setPointsPerTap,
  points,
  setPoints,
  pointsPerTap // Destructuring pointsPerTap
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust this timeout to match your actual loading scenario

    return () => clearTimeout(timer);
  }, []);

  const upgradeCosts = {
    pointsPerTap: 10, // Cost for points per tap upgrade
    energyExtent: 50, // Cost for energy extent upgrade
  };

  const handleUpgradePointsPerTap = () => {
    if (points >= upgradeCosts.pointsPerTap) {
      setPointsPerTap((prevPointsPerTap) => prevPointsPerTap + 1);
      setPoints((prevPoints) => prevPoints - upgradeCosts.pointsPerTap);
    } else {
      alert('Not enough points to upgrade Points Per Tap!');
    }
  };

  const handleUpgradeEnergyExtent = () => {
    if (points >= upgradeCosts.energyExtent) {
      setEnergyExtent((prevEnergyExtent) => prevEnergyExtent + 500);
      setPoints((prevPoints) => prevPoints - upgradeCosts.energyExtent);
    } else {
      alert('Not enough points to upgrade Energy Extent!');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="boosts-page-container">
      <h2 className="boosts-page-title">Boosts Page</h2>
      <div className="cards">
        <div
          className={`card ${points < upgradeCosts.energyExtent ? 'disabled' : 'green'}`}
          onClick={handleUpgradeEnergyExtent}
        >
          <p className="tip">Upgrade Energy Limit</p>
          <p className="second-text">Current: {energyExtent}</p>
          <p className="cost">Cost: {upgradeCosts.energyExtent} points</p>
        </div>
        <div
          className={`card ${points < upgradeCosts.pointsPerTap ? 'disabled' : 'blue'}`}
          onClick={handleUpgradePointsPerTap}
        >
          <p className="tip">Upgrade Points Per Tap</p>
          <p className="second-text">Current: {pointsPerTap}</p>
          <p className="cost">Cost: {upgradeCosts.pointsPerTap} points</p>
        </div>
      </div>
      <p className="current-points">Current Points: {points}</p>
    </div>
  );
};

export default BoostsPage;
