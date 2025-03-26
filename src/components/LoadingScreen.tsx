
import React from 'react';
import StaticBirdLogo from './logo/StaticBirdLogo';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 z-50">
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <StaticBirdLogo variant="loading" size={120} />
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
            <div className="absolute top-0 left-0 h-full bg-brand-blue rounded-full animate-pulse-gentle" style={{ width: '70%' }} />
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
