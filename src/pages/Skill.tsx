
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { getSkillById } from '../data/lessons';
import LessonCard from '../components/LessonCard';
import Header from '../components/Header';
import { ArrowLeft, BookOpen, Check, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Skill = () => {
  const { languageId, skillId } = useParams();
  const { user } = useAuth();
  const { progress, isLessonCompleted } = useProgress();
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Calculate completion percentage
    if (skillId) {
      const skill = getSkillById(skillId);
      if (skill) {
        const totalLessons = skill.lessons.length;
        const completedLessons = skill.lessons.filter(lesson => 
          isLessonCompleted(lesson.id)
        ).length;
        
        const percentage = totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100) 
          : 0;
        
        setCompletionPercentage(percentage);
      }
    }
  }, [user, skillId, navigate, isLessonCompleted]);
  
  if (!languageId || !skillId) {
    return <div>Skill not found</div>;
  }
  
  const language = languages.find(lang => lang.id === languageId);
  const skill = getSkillById(skillId);
  
  if (!language || !skill) {
    return <div>Skill not found</div>;
  }
  
  // Check if all lessons are completed
  const isSkillCompleted = skill.lessons.every(lesson => 
    isLessonCompleted(lesson.id)
  );
  
  // Find the next skill in the learning path
  const nextSkill = skill.unlocks.length > 0 ? getSkillById(skill.unlocks[0]) : null;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Skill header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(`/course/${languageId}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-2xl mr-4 shadow-sm">
                  {skill.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {skill.name}
                    </h1>
                    {isSkillCompleted && (
                      <div className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {completionPercentage}%
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </div>
          
          {/* Lessons list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-brand-blue" />
              Lessons
            </h2>
            
            <div className="space-y-4">
              {skill.lessons.map((lesson, index) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  index={index}
                  languageId={languageId}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Next skill */}
          {isSkillCompleted && nextSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 bg-gradient-to-r from-brand-blue/10 to-green-500/10 dark:from-brand-blue/20 dark:to-green-500/20 rounded-xl border border-brand-blue/20 dark:border-brand-blue/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full mr-4">
                    <Sparkles className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Skill Completed!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You've unlocked the next skill: {nextSkill.name}
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={() => navigate(`/course/${languageId}/${nextSkill.id}`)}
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Skill;
