import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineAlert = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-white p-2 text-center z-50 animate-slide-down">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="w-5 h-5" />
        <span>You're currently offline. Some features may be limited.</span>
      </div>
    </div>
  );
};

export default OfflineAlert;