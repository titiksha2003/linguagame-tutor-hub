
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { getLessonById, getSkillById } from '../data/lessons';
import QuestionCard from '../components/QuestionCard';
import Header from '../components/Header';
import { ArrowLeft, CheckCircle, Heart, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const Lesson = () => {
  const { languageId, lessonId } = useParams();
  const { user } = useAuth();
  const { completeLesson } = useProgress();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);
  
  if (!languageId || !lessonId) {
    return <div>Lesson not found</div>;
  }
  
  const language = languages.find(lang => lang.id === languageId);
  const lesson = getLessonById(lessonId);
  
  if (!language || !lesson) {
    return <div>Lesson not found</div>;
  }
  
  const skill = getSkillById(lesson.skillId);
  
  const handleAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
      if (hearts <= 1) {
        // Out of hearts
        toast.error("You've run out of hearts! Try again.");
        setTimeout(() => {
          navigate(`/course/${languageId}/${lesson.skillId}`);
        }, 2000);
        return;
      }
    }
    
    // Move to next question or complete lesson
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate XP earned based on correct answers
      const earnedXP = Math.round((correctAnswers / lesson.questions.length) * lesson.xpReward);
      setXpEarned(earnedXP);
      
      // Complete the lesson
      completeLesson(languageId, lessonId, earnedXP);
      setIsLessonCompleted(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Lesson progress */}
          {!isLessonCompleted && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/course/${languageId}/${lesson.skillId}`)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Exit Lesson
                </Button>
                
                <div className="flex items-center space-x-2">
                  {[...Array(hearts)].map((_, i) => (
                    <Heart key={i} className="h-5 w-5 text-red-500 fill-red-500" />
                  ))}
                  {[...Array(3 - hearts)].map((_, i) => (
                    <Heart key={i + hearts} className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Question {currentQuestionIndex + 1} of {lesson.questions.length}
                </span>
                <Badge variant="outline">
                  {lesson.xpReward} XP
                </Badge>
              </div>
              
              <Progress 
                value={(currentQuestionIndex / lesson.questions.length) * 100} 
                className="h-2"
              />
            </div>
          )}
          
          {/* Question card or completion screen */}
          <AnimatePresence mode="wait">
            {!isLessonCompleted ? (
              <QuestionCard 
                key={`question-${currentQuestionIndex}`}
                question={lesson.questions[currentQuestionIndex]} 
                onAnswered={handleAnswered}
              />
            ) : (
              <motion.div
                key="lesson-complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse" />
                    <div className="relative bg-green-100 dark:bg-green-900/30 rounded-full p-6">
                      <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Lesson Complete!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Great job! You've completed the {lesson.title} lesson.
                </p>
                
                <div className="mb-8 space-y-4">
                  <div className="flex items-center justify-center">
                    <Badge className="bg-brand-blue px-3 py-1 text-base">
                      +{xpEarned} XP
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center space-x-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {lesson.questions.length - correctAnswers} mistakes
                    </span>
                  </div>
                  
                  <div className="flex justify-center space-x-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {correctAnswers} correct answers
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/course/${languageId}/${lesson.skillId}`)}
                  >
                    Back to Skill
                  </Button>
                  
                  <Button
                    className="button-shadow"
                    onClick={() => {
                      if (skill && skill.unlocks.length > 0) {
                        navigate(`/course/${languageId}/${skill.unlocks[0]}`);
                      } else {
                        navigate(`/course/${languageId}`);
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Lesson;
