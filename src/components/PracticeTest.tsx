import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { getSkillsByLanguage } from '../data/lessons';
import { useToast } from '../hooks/use-toast';
import Header from './Header';
import TestQuestion from './TestQuestion';
import { shuffleQuestionOptions } from '../utils/shuffleOptions';
import TestLoading from './TestLoading';
import TestResults from './TestResults';
import TestControls from './TestControls';
import TestHeader from './TestHeader';

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
    
    const levelToFilter = (() => {
      if (level <= 2) return 'beginner';
      if (level <= 4) return 'intermediate';
      return 'advanced';
    })();
    
    const levelSkills = skills.filter(skill => {
      return skill.level === levelToFilter;
    });
    
    if (level === 1) {
      const checkpointSkill = skills.find(skill => skill.id === `${languageId}-checkpoint-1`);
      if (checkpointSkill && checkpointSkill.lessons[0]) {
        testQuestions = checkpointSkill.lessons[0].questions.map(q => ({
          ...q,
          ...shuffleQuestionOptions(q)
        }));
      }
    } else {
      const allQuestions = levelSkills.flatMap(skill => 
        skill.lessons.flatMap(lesson => lesson.questions)
      );
      
      const questionCount = Math.min(10 + level * 2, allQuestions.length);
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      testQuestions = shuffledQuestions.slice(0, questionCount).map(q => ({
        ...q,
        ...shuffleQuestionOptions(q)
      }));
    }
    
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
      const userLevel = user?.languages.find(l => l.id === languageId)?.level;
      
      if (user) {
        completeLesson(`${languageId}-test-level-${level}-${Date.now()}`, Math.round((finalScore / questions.length) * 100 * level * 50));
        
        toast({
          title: "Test Completed!",
          description: `You earned ${Math.round((finalScore / questions.length) * 100 * level * 50)} XP!`,
        });
      }
    }
  };

  const handleRetry = () => {
    setQuestions(questions.map(q => ({...q, ...shuffleQuestionOptions(q)})));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setScore(0);
    setTestCompleted(false);
  };

  if (questions.length === 0) {
    return <TestLoading />;
  }

  if (testCompleted) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const userLevel = user?.languages.find(l => l.id === languageId)?.level;
    
    return (
      <TestResults 
        language={language}
        level={level}
        score={finalScore}
        questionCount={questions.length}
        userLevel={userLevel}
        onBack={onBack}
        onRetry={handleRetry}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TestHeader 
            language={language}
            level={level}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            progressValue={progressValue}
            onBack={onBack}
          />
          
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
          
          <TestControls
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            isAnswered={isAnswered}
            showHint={showHint}
            onToggleHint={() => setShowHint(true)}
            onNext={handleNext}
          />
        </div>
      </main>
    </div>
  );
};

export default PracticeTest;
