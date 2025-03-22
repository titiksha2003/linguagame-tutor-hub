
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: number | null;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswer: number;
  hint: string;
  showHint: boolean;
  onSelectAnswer: (index: number) => void;
  onToggleHint: () => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  isAnswered,
  isCorrect,
  correctAnswer,
  hint,
  showHint,
  onSelectAnswer,
  onToggleHint
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {question}
      </h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            disabled={isAnswered}
            className={cn(
              "w-full text-left p-4 rounded-lg border transition-all",
              "flex items-center justify-between",
              isAnswered && index === selectedAnswer && isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : isAnswered && index === selectedAnswer && !isCorrect
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : isAnswered && index === correctAnswer
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : isAnswered
                ? "border-gray-200 dark:border-gray-700 opacity-70"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
          >
            <span className={cn(
              "text-base",
              isAnswered && index === selectedAnswer && isCorrect
                ? "text-green-700 dark:text-green-300"
                : isAnswered && index === selectedAnswer && !isCorrect
                ? "text-red-700 dark:text-red-300"
                : isAnswered && index === correctAnswer
                ? "text-green-700 dark:text-green-300"
                : "text-gray-700 dark:text-gray-300"
            )}>
              {option}
            </span>
            
            {isAnswered && index === selectedAnswer && isCorrect && (
              <Check className="h-5 w-5 text-green-500" />
            )}
            
            {isAnswered && index === selectedAnswer && !isCorrect && (
              <X className="h-5 w-5 text-red-500" />
            )}
            
            {isAnswered && index !== selectedAnswer && index === correctAnswer && (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </button>
        ))}
      </div>
      
      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <span className="font-medium">Hint:</span> {hint}
            </p>
          </div>
        </motion.div>
      )}
      
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "mt-6 p-4 rounded-lg border flex items-start",
            isCorrect
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          )}
        >
          {isCorrect ? (
            <>
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
              <p className="text-green-800 dark:text-green-300 text-sm">
                Correct! Great job.
              </p>
            </>
          ) : (
            <>
              <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
              <p className="text-red-800 dark:text-red-300 text-sm">
                Incorrect. The correct answer is <span className="font-medium">{options[correctAnswer]}</span>.
              </p>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TestQuestion;
