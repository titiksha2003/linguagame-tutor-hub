
import { useState } from 'react';
import { motion } from 'framer-motion';
import { languages } from '../data/languages';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, BookOpen, Check, CheckSquare, ChevronRight, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PracticeTest from '../components/PracticeTest';
import { cn } from '@/lib/utils';

// Define level data structure with titles and descriptions
const levelData = [
  { id: 1, title: "Introduction & Alphabet", description: "Learn the alphabet, pronunciation basics, and introducing yourself" },
  { id: 2, title: "Basic Greetings & Expressions", description: "Common greetings, farewells, and polite expressions" },
  { id: 3, title: "Numbers, Dates & Time", description: "Numbers 1-100, telling time, days of the week, and months" },
  { id: 4, title: "Personal Information", description: "Talk about name, age, nationality, occupation, and address" },
  { id: 5, title: "Family & Relationships", description: "Vocabulary related to family members and relationships" },
  { id: 6, title: "Daily Routine & Activities", description: "Talk about everyday activities and habits" },
  { id: 7, title: "Food & Dining", description: "Vocabulary for food, restaurants, and eating" },
  { id: 8, title: "Directions & Transportation", description: "Ask for directions and talk about getting around" },
  { id: 9, title: "Shopping & Currency", description: "Vocabulary for shopping, money, and prices" },
  { id: 10, title: "Basic Grammar Essentials", description: "Articles, verb conjugation, and sentence structure" },
  { id: 11, title: "Describing People & Places", description: "Adjectives to describe people, places, and things" },
  { id: 12, title: "Health & Emergencies", description: "Talk about health issues and emergency situations" },
  { id: 13, title: "Weather & Seasons", description: "Weather vocabulary and seasonal activities" },
  { id: 14, title: "Hobbies & Free Time", description: "Talk about interests, hobbies, and leisure activities" },
  { id: 15, title: "Work & School Life", description: "Vocabulary for workplace and educational environments" },
  { id: 16, title: "Making Plans & Invitations", description: "How to make arrangements and extend invitations" },
  { id: 17, title: "Pronouns & Tenses", description: "Intermediate grammar with pronouns and verb tenses" },
  { id: 18, title: "Debate & Opinion", description: "Express and discuss opinions in a structured way" },
  { id: 19, title: "News & Current Events", description: "Understanding and discussing current affairs" },
  { id: 20, title: "Complex Grammar Structures", description: "Advanced grammar concepts and patterns" },
  { id: 21, title: "Idioms & Expressions", description: "Common sayings and idiomatic expressions" },
  { id: 22, title: "Storytelling & Narration", description: "Techniques for constructing cohesive narratives" },
  { id: 23, title: "Professional Conversations", description: "Formal language for business and professional settings" },
  { id: 24, title: "Professional Writing", description: "Emails, reports, and formal written communication" },
  { id: 25, title: "Exam & Certification Prep", description: "Final review and test-taking strategies" }
];

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

  // If only language selected, show level selection (learning path)
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
                {language?.name} Learning Path
              </h1>
            </div>

            <div className="relative max-w-5xl mx-auto pb-20">
              {/* Path connector line */}
              <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 z-0"></div>
              
              {levelData.map((level, index) => {
                const isCompleted = userLevel > level.id;
                const isCurrent = userLevel === level.id;
                const isLocked = level.id > userLevel;
                
                return (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "relative z-10 mb-8 flex items-center",
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    {/* Level marker */}
                    <div 
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center shadow-md border-4 transition-colors",
                        isCompleted ? "bg-green-500 border-green-200 text-white" : 
                        isCurrent ? "bg-blue-500 border-blue-200 text-white" : 
                        "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : (
                        <span className="text-lg font-bold">{level.id}</span>
                      )}
                    </div>
                    
                    {/* Level content */}
                    <div 
                      className={cn(
                        "w-[calc(50%-3.5rem)] mx-4 p-4 rounded-lg shadow-sm transition-colors cursor-pointer",
                        isCompleted ? "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800" :
                        isCurrent ? "bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 ring-2 ring-blue-500/20" :
                        isLocked ? "bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 opacity-60" :
                        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                      )}
                      onClick={() => {
                        if (!isLocked) {
                          setSelectedLevel(level.id);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={cn(
                            "font-semibold",
                            isLocked ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"
                          )}>
                            Level {level.id}: {level.title}
                          </h3>
                          <p className={cn(
                            "text-sm mt-1",
                            isLocked ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"
                          )}>
                            {level.description}
                          </p>
                        </div>
                        {(isCompleted || isCurrent) && (
                          <Button
                            size="sm" 
                            variant={isCompleted ? "outline" : "default"}
                            className={isCompleted ? "border-green-200 text-green-700 hover:bg-green-50" : ""}
                          >
                            {isCompleted ? (
                              <>
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </>
                            ) : (
                              <>
                                <BookOpen className="h-3 w-3 mr-1" /> Start Test
                              </>
                            )}
                          </Button>
                        )}
                        {isLocked && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Lock className="h-3 w-3 mr-1" /> 
                            <span>Complete Level {level.id - 1}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
                            Continue Learning
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
                        Start Learning
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
