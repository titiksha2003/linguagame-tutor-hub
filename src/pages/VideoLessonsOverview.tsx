import { useState } from 'react';
import { motion } from 'framer-motion';
import { languages } from '../data/languages';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VideoLessonsOverview = () => {
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
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Video Lessons
          </h1>
          
          {user && userLanguages.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Languages You're Learning
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {userLanguages.map((language, index) => (
                  <motion.div 
                    key={language.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => navigate(`/videos/${language.id}`)}
                  >
                    <div 
                      className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
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
                        
                        <div className="mt-4">
                          <Button 
                            className="w-full" 
                            size="sm"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video Lessons
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Languages
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherLanguages.map((language, index) => (
              <motion.div 
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => navigate(`/videos/${language.id}`)}
              >
                <div 
                  className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
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
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        className="w-full" 
                        size="sm"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video Lessons
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoLessonsOverview;
