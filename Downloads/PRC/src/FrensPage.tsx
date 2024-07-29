import React, { useState } from 'react';
import { bear } from './images';

interface FrensPageProps {
  handleBack: () => void; // Define handleBack as a prop
}

const FrensPage: React.FC<FrensPageProps> = ({ handleBack }) => {
  const [referralLink, setReferralLink] = useState<string>('');

  // Fetch referral link from backend
  const generateReferralLink = async () => {
    try {
      const userId = 'currentUserId'; // Replace with logic to get the actual user ID
      const response = await fetch(`/api/users/referral-link/${userId}`);
      const data = await response.json();
      setReferralLink(data.referralLink);
    } catch (error) {
      console.error('Error generating referral link:', error);
    }
  };

  // Copy the referral link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert('Referral link copied to clipboard!');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Frens Page</h1>
      <div className="flex items-center gap-4">
        <img src={bear} width={48} height={48} alt="bear" />
        <p className="text-lg">Frens content goes here...</p>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={generateReferralLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Generate Referral Link
        </button>
        {referralLink && (
          <div className="flex flex-col items-center">
            <p className="mb-2">{referralLink}</p>
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Copy Referral Link
            </button>
          </div>
        )}
      </div>
      <button
        onClick={handleBack}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default FrensPage;
