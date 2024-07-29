import React, { useState, useEffect } from 'react';
import { bear } from './images';

interface FrensPageProps {
  handleBack: () => void; // Define handleBack as a prop
}

const FrensPage: React.FC<FrensPageProps> = ({ handleBack }) => {
  const [referralLink, setReferralLink] = useState<string>('');

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        // Replace with actual user ID logic
        const userId = 'currentUserId';
        const response = await fetch(`/api/referrals/${userId}`);
        const data = await response.json();
        setReferralLink(`${window.location.origin}/referral?code=${data.referralCode}`);
      } catch (error) {
        console.error('Error fetching referral link:', error);
      }
    };

    // Call the function to fetch referral link when component mounts
    fetchReferralLink();
  }, []);

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
      </div>
      <div className="mt-4 flex flex-col items-center">
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
