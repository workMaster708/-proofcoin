import React, { useState, useEffect } from 'react';
import { bear } from './images';

interface FrensPageProps {
  handleBack: () => void; // Define handleBack as a prop
}

const FrensPage: React.FC<FrensPageProps> = ({ handleBack }) => {
  const [referralLink, setReferralLink] = useState<string>('');

  useEffect(() => {
    // Fetch referral link for the current user on component mount
    const fetchReferralLink = async () => {
      try {
        const userId = 'currentUserId'; // Replace with actual user ID logic
        const response = await fetch(`/api/referrals/${userId}`);
        const data = await response.json();
        setReferralLink(`${window.location.origin}/referral?code=${data.referralCode}`);
      } catch (error) {
        console.error('Error fetching referral link:', error);
      }
    };

    fetchReferralLink();
  }, []);

  // Generate a referral link (replace with your actual link generation logic)
  const generateReferralLink = async () => {
    try {
      const userId = 'currentUserId'; // Replace with actual user ID logic
      const response = await fetch('/api/referrals/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setReferralLink(`${window.location.origin}/referral?code=${data.referralCode}`);
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
