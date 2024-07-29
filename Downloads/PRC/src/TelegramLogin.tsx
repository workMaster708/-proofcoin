import React, { useEffect } from 'react';

const TelegramLogin: React.FC = () => {
  useEffect(() => {
    // Append the Telegram login script to the body
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.async = true;
    script.setAttribute('data-telegram-login', '@proofcoin_bot'); // Replace with your bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'http://localhost:3000/auth/telegram'); // Replace with your auth URL
    script.setAttribute('data-request-access', 'write');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="telegram-login-container"></div>;
};

export default TelegramLogin;
