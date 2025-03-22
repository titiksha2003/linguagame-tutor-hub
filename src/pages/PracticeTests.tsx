
import { useState } from 'react';
import { motion } from 'framer-motion';
import { languages } from '../data/languages';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, CheckSquare, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PracticeTest from '../components/PracticeTest';

const PracticeTests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Filter user's languages if logged in
  const userLanguages = user 
    ? languages.filter(lang => user.languages.some(ul => ul.id === lang.id)) 
    : [];
  
  // Other languages
  const otherLanguages = user 
    ? languages.filter(lang => !user.languages.some(ul => ul.id === lang.id))
    : languages;

  // If language and level selected, show test
  if (selectedLanguage && selectedLevel !== null) {
    return (
      <PracticeTest 
        languageId={selectedLanguage} 
        level={selectedLevel} 
        onBack={() => {
          setSelectedLevel(null);
        }}
      />
    );
  }

  // If only language selected, show level selection
  if (selectedLanguage) {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const userLevel = user?.languages.find(l => l.id === selectedLanguage)?.level || 1;
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        
        <main className="flex-grow pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              onClick={() => setSelectedLanguage(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Languages
            </Button>
            
            <div className="flex items-center mb-8">
              <span className="text-3xl mr-3">{language?.flag}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {language?.name} Practice Tests
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.div 
                  key={level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: level * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedLevel(level)}
                >
                  <div 
                    className={`group overflow-hidden rounded-xl ${level <= userLevel ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'} border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow ${level > userLevel + 1 ? 'opacity-60 cursor-not-allowed' : ''}`}
                    style={{ borderTopColor: language?.color, borderTopWidth: '4px' }}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Level {level} {level === 1 ? '(Beginner)' : level === 2 ? '(Elementary)' : level === 3 ? '(Intermediate)' : level === 4 ? '(Advanced)' : '(Fluent)'}
                      </h3>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {level === 1 ? 'Basic vocabulary and phrases' : 
                         level === 2 ? 'Simple conversations and grammar' :
                         level === 3 ? 'Complex sentences and expressions' :
                         level === 4 ? 'Advanced topics and idioms' :
                         'Native-like fluency test'}
                      </p>
                      
                      {level <= userLevel + 1 ? (
                        <Button 
                          className="w-full" 
                          size="sm"
                          disabled={level > userLevel + 1}
                        >
                          <CheckSquare className="mr-2 h-4 w-4" />
                          {level <= userLevel ? 'Practice Again' : 'Take Test'}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">
                          Complete Level {level - 1} to unlock
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Default view - language selection
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
            Practice Tests
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
                    onClick={() => setSelectedLanguage(language.id)}
                  >
                    <div 
                      className="group overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
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
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {user && userLanguages.length > 0 ? "Languages to Discover" : "Available Languages"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherLanguages.map((language, index) => (
              <motion.div 
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setSelectedLanguage(language.id)}
              >
                <div 
                  className="group overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
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
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Practice Tests
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

export default PracticeTests;
