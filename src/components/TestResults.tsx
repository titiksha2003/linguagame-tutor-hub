
import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Language } from '../data/languages';
import Header from './Header';
import { useToast } from '../hooks/use-toast';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';

interface TestResultsProps {
  language: Language | undefined;
  level: number;
  score: number;
  questionCount: number;
  userLevel: number | undefined;
  onBack: () => void;
  onRetry: () => void;
}

const TestResults = ({ 
  language, 
  level, 
  score, 
  questionCount,
  userLevel,
  onBack, 
  onRetry 
}: TestResultsProps) => {
  const { toast } = useToast();
  const { user, updateUserLevel } = useAuth();
  const { completeLesson } = useProgress();
  const percentage = Math.round((score / questionCount) * 100);
  
  const getLevelDescription = (level: number) => {
    switch(level) {
      case 1: return "Introduction & Alphabet";
      case 2: return "Basic Greetings & Expressions";
      case 3: return "Numbers, Dates & Time";
      case 4: return "Personal Information";
      case 5: return "Family & Relationships";
      case 6: return "Daily Routine & Activities";
      case 7: return "Food & Dining";
      case 8: return "Directions & Transportation";
      case 9: return "Shopping & Currency";
      case 10: return "Basic Grammar Essentials";
      case 11: return "Describing People & Places";
      case 12: return "Health & Emergencies";
      case 13: return "Weather & Seasons";
      case 14: return "Hobbies & Free Time";
      case 15: return "Work & School Life";
      case 16: return "Making Plans & Invitations";
      case 17: return "Pronouns & Tenses";
      case 18: return "Debate & Opinion";
      case 19: return "News & Current Events";
      case 20: return "Complex Grammar Structures";
      case 21: return "Idioms & Expressions";
      case 22: return "Storytelling & Narration";
      case 23: return "Professional Conversations";
      case 24: return "Professional Writing";
      case 25: return "Exam & Certification Prep";
      default: return `Level ${level}`;
    }
  };

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "Great job! You've done well on this level!";
    } else if (percentage >= 60) {
      return "Good effort! You're making progress.";
    } else {
      return "Keep practicing! You'll improve with time.";
    }
  };

  React.useEffect(() => {
    if (user && language) {
      const testCompletionId = `${language?.id}-test-level-${level}-${Date.now()}`;
      const xpEarned = Math.round((percentage / 100) * level * 50);
      completeLesson(testCompletionId, xpEarned);
      
      toast({
        title: "Test Completed!",
        description: `You earned ${xpEarned} XP!`,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Path
          </Button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 max-w-xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                percentage >= 80 
                  ? "bg-green-50 dark:bg-green-900/30" 
                  : percentage >= 60 
                    ? "bg-blue-50 dark:bg-blue-900/30" 
                    : "bg-amber-50 dark:bg-amber-900/30"
              }`}>
                <Trophy className={`h-12 w-12 ${
                  percentage >= 80 
                    ? "text-green-500" 
                    : percentage >= 60 
                      ? "text-blue-500" 
                      : "text-amber-500"
                }`} />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Level {level}: {getLevelDescription(level)} Completed!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {getResultMessage()}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-4xl font-bold text-blue-500">
                {score}
              </div>
              <div className="text-xl text-gray-500 dark:text-gray-400">
                out of
              </div>
              <div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                {questionCount}
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Score: {percentage}%
              </p>
              <Progress value={percentage} className={`h-3 w-full ${
                percentage >= 80 
                  ? "bg-green-100 text-green-500" 
                  : percentage >= 60 
                    ? "bg-blue-100 text-blue-500" 
                    : "bg-amber-100 text-amber-500"
              }`} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning Path
              </Button>
              
              <Button onClick={onRetry}>
                Try Again
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TestResults;
