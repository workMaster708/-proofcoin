import React from 'react';
import { bear } from './images';

interface FrensPageProps {
  handleBack: () => void; // Define handleBack as a prop
}

const FrensPage: React.FC<FrensPageProps> = ({ handleBack }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Frens Page</h1>
      <div className="flex items-center gap-4">
        <img src={bear} width={48} height={48} alt="bear" />
        <p className="text-lg">Frens content goes here...</p>
      </div>
      <button onClick={handleBack} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Back
      </button>
    </div>
  );
};

export default FrensPage;
