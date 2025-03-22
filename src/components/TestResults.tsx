
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Language } from '../data/languages';
import Header from './Header';

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
  const percentage = Math.round((score / questionCount) * 100);
  
  const getLevelDescription = (level: number) => {
    switch(level) {
      case 1: return "Beginner (A1)";
      case 2: return "Elementary (A2)";
      case 3: return "Intermediate (B1)";
      case 4: return "Upper Intermediate (B2)";
      case 5: return "Advanced (C1-C2)";
      default: return `Level ${level}`;
    }
  };

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
            Back to Practice Tests
          </Button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 max-w-xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Trophy className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language?.name} - {getLevelDescription(level)} Test Completed!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {percentage >= 80 ? "Great job! You've mastered this level!" : 
               percentage >= 60 ? "Good effort! You're progressing well." : 
               "Keep practicing! You'll improve with time."}
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
              <Progress value={percentage} className="h-3 w-full" />
            </div>
            
            {percentage >= 80 && level === userLevel && (
              <p className="text-green-600 dark:text-green-400 mb-6">
                You're ready to advance to the next level!
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tests
              </Button>
              
              <Button onClick={onRetry}>
                <Check className="mr-2 h-4 w-4" />
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
