
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { getSkillsByLanguage } from '../data/lessons';
import SkillTree from '../components/SkillTree';
import Header from '../components/Header';
import { ArrowLeft, BookOpen, Check, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  const { languageId } = useParams();
  const { user } = useAuth();
  const { progress, setCurrentLanguage } = useProgress();
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Set the current language in the progress context
    if (languageId) {
      setCurrentLanguage(languageId);
    }
    
    // Calculate completion percentage
    if (languageId) {
      const skills = getSkillsByLanguage(languageId);
      const totalLessons = skills.reduce((sum, skill) => sum + skill.lessons.length, 0);
      
      // Find all completed lessons for this language
      const completedLessonsForLanguage = skills.flatMap(skill => 
        skill.lessons.filter(lesson => progress.completedLessons.includes(lesson.id))
      );
      
      const percentage = totalLessons > 0 
        ? Math.round((completedLessonsForLanguage.length / totalLessons) * 100) 
        : 0;
      
      setCompletionPercentage(percentage);
    }
  }, [user, languageId, navigate, progress.completedLessons, setCurrentLanguage]);
  
  if (!languageId) {
    return <div>Language not found</div>;
  }
  
  const language = languages.find(lang => lang.id === languageId);
  const userLanguageProgress = user?.languages.find(lang => lang.id === languageId);
  
  if (!language) {
    return <div>Language not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Language header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-4xl mr-4">{language.flag}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {language.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language.nativeName}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {userLanguageProgress ? (
                  <div className="flex flex-col items-end">
                    <Badge className="mb-2 bg-blue-500">
                      Level {userLanguageProgress.level}
                    </Badge>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                        Course completion:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completionPercentage}%
                      </span>
                    </div>
                    <div className="w-48 mt-2">
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-brand-blue mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Start learning {language.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Language skill tree */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 overflow-x-auto"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Path
            </h2>
            
            <SkillTree languageId={languageId} />
          </motion.div>
          
          {/* Course information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Beginner-friendly</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start from scratch with basic vocabulary, phrases, and simple conversations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">25 Skills to Master</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Progress through interactive lessons covering essential topics for everyday communication.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Unlock Achievements</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn XP, maintain streaks, and gain crowns as you advance through the course.
              </p>
            </motion.div>
          </div>
          
          {/* Quick start button */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="button-shadow"
              onClick={() => {
                const skills = getSkillsByLanguage(languageId);
                if (skills.length > 0) {
                  const firstSkill = skills[0];
                  navigate(`/course/${languageId}/${firstSkill.id}`);
                }
              }}
            >
              Start Learning {language.name}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Course;
