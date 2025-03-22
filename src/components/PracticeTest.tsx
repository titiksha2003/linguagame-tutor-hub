
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { getSkillsByLanguage } from '../data/lessons';
import { useToast } from '../hooks/use-toast';
import Header from './Header';
import TestQuestion from './TestQuestion';
import { shuffleQuestionOptions } from '../utils/shuffleOptions';
import { ArrowLeft, Check, ChevronRight, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PracticeTestProps {
  languageId: string;
  level: number;
  onBack: () => void;
}

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  originalIndex?: number[];
}

const PracticeTest = ({ languageId, level, onBack }: PracticeTestProps) => {
  const { user } = useAuth();
  const { completeLesson } = useProgress();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  
  const language = languages.find(lang => lang.id === languageId);
  
  useEffect(() => {
    const skills = getSkillsByLanguage(languageId);
    let testQuestions: TestQuestion[] = [];
    
    // Filter skills based on level
    const levelToFilter = (() => {
      if (level <= 2) return 'beginner';
      if (level <= 4) return 'intermediate';
      return 'advanced';
    })();
    
    // Get all skills for the selected level
    const levelSkills = skills.filter(skill => {
      return skill.level === levelToFilter;
    });
    
    // For level 1 checkpoint test
    if (level === 1) {
      const checkpointSkill = skills.find(skill => skill.id === `${languageId}-checkpoint-1`);
      if (checkpointSkill && checkpointSkill.lessons[0]) {
        testQuestions = checkpointSkill.lessons[0].questions.map(q => ({
          ...q,
          ...shuffleQuestionOptions(q)
        }));
      }
    } else {
      // For higher levels, extract questions according to level
      // Get all questions from the skills at this level
      const allQuestions = levelSkills.flatMap(skill => 
        skill.lessons.flatMap(lesson => lesson.questions)
      );
      
      // Shuffle and pick questions based on level (more questions for higher levels)
      const questionCount = Math.min(10 + level * 2, allQuestions.length);
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      testQuestions = shuffledQuestions.slice(0, questionCount).map(q => ({
        ...q,
        ...shuffleQuestionOptions(q)
      }));
    }
    
    // If no questions were found (unlikely), use backup from any level
    if (testQuestions.length === 0) {
      const allQuestions = skills.flatMap(skill => 
        skill.lessons.flatMap(lesson => lesson.questions)
      );
      
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      testQuestions = shuffledQuestions.slice(0, 10).map(q => ({
        ...q,
        ...shuffleQuestionOptions(q)
      }));
    }
    
    setQuestions(testQuestions);
  }, [languageId, level]);

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    const isAnswerCorrect = index === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setTestCompleted(true);
      
      const finalScore = score + (isCorrect ? 1 : 0);
      const percentage = Math.round((finalScore / questions.length) * 100);
      
      // Calculate XP based on level and score percentage
      const xpEarned = Math.round((percentage / 100) * level * 50);
      
      // Create a unique lesson ID for this test completion
      const testLessonId = `${languageId}-test-level-${level}-${Date.now()}`;
      
      if (user) {
        completeLesson(testLessonId, xpEarned);
        
        toast({
          title: "Test Completed!",
          description: `You earned ${xpEarned} XP!`,
        });
      }
    }
  };

  // Generate level description based on level number
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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading test questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);
    
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
                  {finalScore}
                </div>
                <div className="text-xl text-gray-500 dark:text-gray-400">
                  out of
                </div>
                <div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                  {questions.length}
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Score: {percentage}%
                </p>
                <Progress value={percentage} className="h-3 w-full" />
              </div>
              
              {percentage >= 80 && level === user?.languages.find(l => l.id === languageId)?.level && (
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
                
                <Button onClick={() => {
                  setQuestions(questions.map(q => ({...q, ...shuffleQuestionOptions(q)})));
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setIsCorrect(false);
                  setShowHint(false);
                  setScore(0);
                  setTestCompleted(false);
                }}>
                  <Check className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex) / questions.length) * 100;
  
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
          
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{language?.flag}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language?.name} - {getLevelDescription(level)} Test
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          
          <div className="mb-8 w-full">
            <Progress value={progressValue} className="h-2" />
          </div>
          
          <TestQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            correctAnswer={currentQuestion.correctAnswer}
            hint={currentQuestion.hint}
            showHint={showHint}
            onSelectAnswer={handleAnswerSelect}
            onToggleHint={() => setShowHint(!showHint)}
          />
          
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowHint(true)}
              disabled={showHint || !isAnswered}
            >
              Show Hint
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Complete Test
                  <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeTest;
