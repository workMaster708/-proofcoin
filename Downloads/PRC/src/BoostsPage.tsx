import React from 'react';

interface BoostsPageProps {
  onBack: () => void;
  energyExtent: number;
  setEnergyExtent: (value: number) => void;
  points: number;
  setPoints: (value: number) => void;
  setPointsPerTap: (value: number) => void;
  pointsPerTap: number;
}

const BoostsPage: React.FC<BoostsPageProps> = ({
  onBack,
}) => {
  return (
    <div>
      <button onClick={onBack} className="absolute top-4 left-4 text-white bg-[#2f5a69] py-2 px-4 rounded-lg">
        Back
      </button>
      {/* Your BoostsPage content here */}
    </div>
  );
};

export default BoostsPage;
