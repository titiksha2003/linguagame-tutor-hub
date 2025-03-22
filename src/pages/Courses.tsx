import { motion } from 'framer-motion';
import { languages } from '../data/languages';
import LanguageCard from '../components/LanguageCard';
import Header from '../components/Header';
import { ArrowLeft, Play, CheckSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter user's languages if logged in
  const userLanguages = user 
    ? languages.filter(lang => user.languages.some(ul => ul.id === lang.id)) 
    : [];
  
  // Other languages
  const otherLanguages = user 
    ? languages.filter(lang => !user.languages.some(ul => ul.id === lang.id))
    : languages;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {user && userLanguages.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Languages you're learning
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {userLanguages.map((language, index) => (
                  <motion.div 
                    key={language.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div 
                      className="group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
                      style={{ borderTopColor: language.color, borderTopWidth: '4px' }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-3 items-center">
                            <span className="text-3xl">{language.flag}</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {language.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {language.nativeName}
                              </p>
                            </div>
                          </div>
                          
                          {user?.languages.some(l => l.id === language.id) && (
                            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              Level {user.languages.find(l => l.id === language.id)?.level || 1}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex flex-col space-y-2">
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/videos/${language.id}`);
                            }}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video Lessons
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/course/${language.id}`);
                            }}
                          >
                            <CheckSquare className="mr-2 h-4 w-4" />
                            Practice Tests
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {user && userLanguages.length > 0 ? 'Start a new language' : 'Choose a language'}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherLanguages.map((language, index) => (
              <LanguageCard key={language.id} language={language} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
