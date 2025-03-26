
import React from 'react';
import StaticBirdLogo from './logo/StaticBirdLogo';

interface SocialSharePreviewProps {
  showBorder?: boolean;
  className?: string;
}

const SocialSharePreview = ({ showBorder = true, className = '' }: SocialSharePreviewProps) => {
  return (
    <div className={`${className} ${showBorder ? 'border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm' : ''} overflow-hidden`}>
      <StaticBirdLogo variant="social" size={600} />
    </div>
  );
};

export default SocialSharePreview;
