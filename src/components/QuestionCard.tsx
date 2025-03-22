
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../data/lessons';
import { Button } from "@/components/ui/button";
import { AlertCircle, CornerDownRight, Lightbulb } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { shuffleQuestionOptions } from '../utils/shuffleOptions';

interface QuestionCardProps {
  question: Question;
  onAnswered: (isCorrect: boolean) => void;
}

const QuestionCard = ({ question, onAnswered }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledQuestion, setShuffledQuestion] = useState(() => shuffleQuestionOptions(question));
  
  useEffect(() => {
    // Reset state when new question is loaded
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setIsCorrect(false);
    setShuffledQuestion(shuffleQuestionOptions(question));
  }, [question]);
  
  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === shuffledQuestion.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    // Delay moving to next question to show feedback
    setTimeout(() => {
      onAnswered(correct);
    }, 2000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {shuffledQuestion.question}
        </h3>
        
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Select the correct answer
          </span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-amber-500 hover:text-amber-600 p-1 h-auto"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show hint</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  {shuffledQuestion.hint}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="space-y-3">
        {shuffledQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg border ${
              selectedOption === index
                ? isSubmitted
                  ? index === shuffledQuestion.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-500/50'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500/50'
                  : 'bg-primary-foreground border-primary ring-2 ring-primary/20'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-all duration-200`}
            onClick={() => handleOptionSelect(index)}
            disabled={isSubmitted}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                selectedOption === index
                  ? isSubmitted
                    ? index === shuffledQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              } font-medium`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className={`${
                selectedOption === index && isSubmitted
                  ? index === shuffledQuestion.correctAnswer
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {option}
              </span>
            </div>
            
            {isSubmitted && selectedOption === index && selectedOption !== shuffledQuestion.correctAnswer && (
              <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 mr-1" />
                Incorrect
              </div>
            )}
            
            {isSubmitted && index === shuffledQuestion.correctAnswer && (
              <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                <CornerDownRight className="h-4 w-4 mr-1" />
                Correct answer
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <Button
          className={`w-full font-medium text-base button-shadow ${
            isSubmitted 
              ? isCorrect 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
              : selectedOption === null 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' 
                : 'bg-brand-blue hover:bg-brand-blue/90'
          }`}
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitted}
        >
          {isSubmitted 
            ? isCorrect ? 'Correct! Moving to next question...' : 'Incorrect. Moving to next question...'
            : 'Check Answer'
          }
        </Button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
