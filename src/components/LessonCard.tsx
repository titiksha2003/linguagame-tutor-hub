
import { motion } from 'framer-motion';
import { Lesson } from '../data/lessons';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Check, Crown, Star } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  languageId: string;
}

const LessonCard = ({ lesson, index, languageId }: LessonCardProps) => {
  const { isLessonCompleted, setCurrentLesson } = useProgress();
  const navigate = useNavigate();
  const isCompleted = isLessonCompleted(lesson.id);
  
  const handleSelectLesson = () => {
    setCurrentLesson(lesson.id);
    navigate(`/lesson/${languageId}/${lesson.id}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full"
    >
      <button 
        onClick={handleSelectLesson}
        className={`w-full text-left p-4 rounded-xl border ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        } transition-all duration-200 hover-scale`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-blue text-white'
            }`}>
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lesson.questions.length} questions • {lesson.xpReward} XP
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(Math.min(lesson.level === 'beginner' ? 1 : lesson.level === 'intermediate' ? 2 : 3, 3))].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
              <Crown className="mr-1 h-3 w-3" />
              Completed
            </span>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleSelectLesson();
              }}
              className="text-xs font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              Practice Again
            </button>
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default LessonCard;
