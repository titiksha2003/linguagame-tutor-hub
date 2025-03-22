
import React, { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  startTime?: number;
}

const VideoPlayer = ({ videoId, title, startTime = 0 }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {title && (
        <h3 className="p-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      )}
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?start=${startTime}`}
          title={title || "Language lesson video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
