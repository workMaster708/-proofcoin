import React, { useState, useEffect } from 'react';
import { bear } from './images';
import './FrensPage.css'; // Import the CSS file

interface FrensPageProps {
  handleBack: () => void;
}

const FrensPage: React.FC<FrensPageProps> = ({ }) => {
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
    <div className="frens-page">
      <h1>Frens Page</h1>
      <div className="bear-icon">
        <img src={bear} alt="bear" />
      </div>
      <div className="referral-container">
        {referralLink && (
          <div className="flex flex-col items-center mb-4">
            <p>{referralLink}</p>
            <button onClick={copyToClipboard} className="custom-btn btn-1">
              Copy Referral Link
            </button>
          </div>
        )}
      </div>
      <div className="referrals-list">
        <h2>People Referred</h2>
        {referrals.length > 0 ? (
          <ul>
            {referrals.map((referral, index) => (
              <li key={index}>{referral}</li>
            ))}
          </ul>
        ) : (
          <p>No referrals yet.</p>
        )}
      </div></div>
  );
};

export default FrensPage;
