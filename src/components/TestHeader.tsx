
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Language } from '../data/languages';

interface TestHeaderProps {
  language: Language | undefined;
  level: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  progressValue: number;
  onBack: () => void;
}

const TestHeader = ({
  language,
  level,
  currentQuestionIndex,
  totalQuestions,
  progressValue,
  onBack
}: TestHeaderProps) => {
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
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Practice Tests
      </Button>
      
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{language?.flag}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language?.name} - {getLevelDescription(level)} Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>
      </div>
      
      <div className="mb-8 w-full">
        <Progress value={progressValue} className="h-2" />
      </div>
    </>
  );
};

export default TestHeader;
