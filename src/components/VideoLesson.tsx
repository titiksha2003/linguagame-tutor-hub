
import React from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoLessonProps {
  videoId: string;
  title: string;
  description?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const VideoLesson = ({ 
  videoId, 
  title, 
  description, 
  onPrevious, 
  onNext,
  hasPrevious = false,
  hasNext = true
}: VideoLessonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      <VideoPlayer videoId={videoId} />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        )}
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={!hasPrevious ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Lesson
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className={!hasNext ? "opacity-50 cursor-not-allowed" : ""}
          >
            Next Lesson
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoLesson;
