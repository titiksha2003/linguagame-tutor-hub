
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import VideoPlayer from './VideoPlayer';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Share2, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

interface VideoLessonProps {
  videoId: string;
  title: string;
  description?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  languageId: string;
}

const VideoLesson = ({ 
  videoId, 
  title, 
  description, 
  onPrevious, 
  onNext,
  hasPrevious = false,
  hasNext = true,
  languageId
}: VideoLessonProps) => {
  const navigate = useNavigate();
  const { user, addCompletedLesson } = useAuth();
  const { markVideoAsWatched, isVideoWatched } = useProgress();
  
  const isCompleted = isVideoWatched(videoId);
  
  const handlePracticeTestClick = () => {
    // Navigate to the practice-tests page and set the specific language
    navigate(`/practice-tests`, { state: { selectedLanguage: languageId } });
  };
  
  const handleShareVideo = () => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this ${title} video lesson!`,
        url: videoUrl,
      })
      .then(() => toast.success("Video shared successfully!"))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(videoUrl)
        .then(() => toast.success("Video link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };
  
  const handleMarkComplete = () => {
    // Mark video as watched in progress context
    markVideoAsWatched(videoId);
    
    // If user is logged in, also add completed lesson with some XP
    if (user) {
      addCompletedLesson(languageId, videoId, 10);
    }
    
    toast.success("Lesson marked as complete!");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden w-full"
    >
      <VideoPlayer videoId={videoId} />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        )}
        
        <div className="flex flex-wrap gap-3 justify-between mb-4">
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
            variant="outline"
            onClick={handlePracticeTestClick}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:hover:bg-amber-800/30 dark:text-amber-300 dark:border-amber-700"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Practice Tests
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
        
        <div className="flex flex-wrap gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareVideo}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Lesson
          </Button>
          
          <Button
            variant={isCompleted ? "default" : "outline"}
            size="sm"
            onClick={handleMarkComplete}
            className={isCompleted 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
            }
            disabled={isCompleted}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {isCompleted ? "Completed" : "Mark Complete"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoLesson;
