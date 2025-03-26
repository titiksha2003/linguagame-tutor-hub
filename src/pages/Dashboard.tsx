
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/languages';
import LanguageCard from '../components/LanguageCard';
import UserProgress from '../components/UserProgress';
import Header from '../components/Header';
import { ArrowRight, Flame, Trophy, Play, CheckSquare, BookOpen, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  // Filter user's languages
  const userLanguages = languages.filter(language => 
    user.languages.some(lang => lang.id === language.id)
  );
  
  // Other languages (not yet started)
  const otherLanguages = languages.filter(language => 
    !user.languages.some(lang => lang.id === language.id)
  );
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - User progress */}
            <div className="md:w-1/3">
              <UserProgress />
              
              {userLanguages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-brand-blue" />
                      Continue Learning
                    </h2>
                    
                    <div className="mt-4 space-y-3">
                      {userLanguages.slice(0, 1).map(language => {
                        const userLang = user.languages.find(l => l.id === language.id);
                        return (
                          <div key={language.id}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="text-xl mr-2">{language.flag}</span>
                                <span className="font-medium">{language.name}</span>
                              </div>
                              <span className="text-sm bg-blue-100 dark:bg-blue-900/20 px-2 py-0.5 rounded-full text-blue-800 dark:text-blue-300">
                                Level {userLang?.level || 1}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full flex items-center justify-center"
                                onClick={() => navigate(`/videos/${language.id}`)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Video Lessons
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full flex items-center justify-center"
                                onClick={() => navigate(`/course/${language.id}`)}
                              >
                                <CheckSquare className="h-4 w-4 mr-1" />
                                Practice Tests
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {userLanguages.length > 1 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mt-4 w-full"
                        onClick={() => navigate('/courses')}
                      >
                        View all your languages
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Flame className="mr-2 h-5 w-5 text-brand-orange" />
                    Daily Goal
                  </h2>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {user.xp} / {user.dailyGoal} XP
                      </span>
                      <span className="text-sm font-medium text-brand-blue">
                        {Math.min(Math.round((user.xp / user.dailyGoal) * 100), 100)}%
                      </span>
                    </div>
                    
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-blue rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((user.xp / user.dailyGoal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-4 button-shadow"
                    onClick={() => navigate(`/course/${user.languages[0]?.id || 'spanish'}`)}
                  >
                    Continue Learning
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                    Leaderboard
                  </h2>
                  
                  <div className="mt-4 space-y-3">
                    {[
                      { name: 'Sofia Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaGarcia&backgroundColor=c0aede,f9d1a2,fada5e', xp: 450 },
                      { name: 'Demo User', avatar: user.avatar, xp: user.xp, isCurrentUser: true },
                      { name: 'Alex Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKim&backgroundColor=c0aede,f9d1a2,fada5e', xp: 320 },
                      { name: 'Maria Lopez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaLopez&backgroundColor=c0aede,f9d1a2,fada5e', xp: 180 },
                      { name: 'John Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnSmith&backgroundColor=c0aede,f9d1a2,fada5e', xp: 150 }
                    ].sort((a, b) => b.xp - a.xp).map((leader, index) => (
                      <div 
                        key={index}
                        className={`flex items-center p-2 rounded-lg ${
                          leader.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="w-6 text-center font-medium text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </div>
                        
                        <img 
                          src={leader.avatar} 
                          alt={leader.name} 
                          className="w-8 h-8 rounded-full mx-3"
                        />
                        
                        <div className="mr-auto">
                          <p className={`font-medium ${
                            leader.isCurrentUser ? 'text-brand-blue' : 'text-gray-900 dark:text-white'
                          }`}>
                            {leader.name} {leader.isCurrentUser && '(You)'}
                          </p>
                        </div>
                        
                        <div className="font-medium text-gray-900 dark:text-white">
                          {leader.xp} XP
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => navigate('/leaderboard')}
                  >
                    View Full Leaderboard
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Right column - Language cards */}
            <div className="md:w-2/3">
              {userLanguages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Currently Learning
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userLanguages.map((language, index) => (
                      <LanguageCard key={language.id} language={language} index={index} />
                    ))}
                  </div>
                  
                  {otherLanguages.length > 0 && <Separator className="my-8" />}
                </div>
              )}
              
              {otherLanguages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    {userLanguages.length > 0 ? 'Available Languages' : 'Choose a language to learn'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherLanguages.slice(0, 6).map((language, index) => (
                      <LanguageCard key={language.id} language={language} index={index} />
                    ))}
                  </div>
                  
                  {otherLanguages.length > 6 && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/courses')}
                      >
                        View all languages
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
