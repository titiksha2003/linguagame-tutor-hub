
import React, { useEffect } from 'react';
import StaticBirdLogo from './StaticBirdLogo';

/**
 * This component can be used to dynamically generate a favicon.
 * It doesn't render anything visible, but creates a favicon from the StaticBirdLogo.
 * Useful for theming or dynamically changing the favicon.
 */
const FaviconGenerator = () => {
  useEffect(() => {
    // This runs only on the client
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      // Render the favicon to the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // We would need to manually draw our logo here
        // For now, we'll just create a placeholder
        // In a real implementation, you'd need to convert our React component to canvas operations
        
        // Convert to data URL and set as favicon
        const dataUrl = canvas.toDataURL('image/png');
        
        // Find existing favicon or create a new one
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        
        // Update favicon
        link.href = dataUrl;
      }
    }
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default FaviconGenerator;
