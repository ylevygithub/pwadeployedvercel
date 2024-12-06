import { useState, useEffect } from 'react';
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <WifiOff className="w-5 h-5" />
        <span>You're offline. Some features may be limited.</span>
      </div>
    </div>
  );
};

export default OfflineAlert;