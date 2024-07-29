import React, { useState, useEffect } from 'react';
import { bear } from './images';

interface FrensPageProps {
  handleBack: () => void;
}

const FrensPage: React.FC<FrensPageProps> = ({ handleBack }) => {
  const [referralLink, setReferralLink] = useState<string>('');
  const [referrals, setReferrals] = useState<string[]>([]); // State for list of referrals

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        // Replace with actual user ID logic
        const userId = 'currentUserId';
        const response = await fetch(`/api/referrals/${userId}`);
        const data = await response.json();
        setReferralLink(`${window.location.origin}/referral?code=${data.referralCode}`);
        setReferrals(data.referrals); // Set the list of referrals
      } catch (error) {
        console.error('Error fetching referral link:', error);
      }
    };

    fetchReferralLink();
  }, []);

  // Copy the referral link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert('Referral link copied to clipboard!');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Frens Page</h1>
      <div className="flex items-center gap-2 mb-4">
        <img src={bear} width={40} height={40} alt="bear" />
      </div>
      <div className="w-full max-w-md bg-gray-700 p-4 rounded-lg">
        {referralLink && (
          <div className="flex flex-col items-center mb-4">
            <p className="text-white text-center mb-2">{referralLink}</p>
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Copy Referral Link
            </button>
          </div>
        )}
      </div>
      <div className="w-full max-w-md mt-4 bg-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-2">People Referred</h2>
        {referrals.length > 0 ? (
          <ul className="list-disc list-inside text-white">
            {referrals.map((referral, index) => (
              <li key={index}>{referral}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No referrals yet.</p>
        )}
      </div>
      <button
        onClick={handleBack}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default FrensPage;
