import React from 'react';

interface FrensPageProps {
  onBack: () => void;
}

const FrensPage: React.FC<FrensPageProps> = ({ onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="absolute top-4 left-4 text-white bg-[#2f5a69] py-2 px-4 rounded-lg">
        Back
      </button>
      {/* Your FrensPage content here */}
    </div>
  );
};

export default FrensPage;
