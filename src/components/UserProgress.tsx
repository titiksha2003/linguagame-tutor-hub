
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import { Flame, Star, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProgress = () => {
  const { user } = useAuth();
  const { progress } = useProgress();
  
  if (!user) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-green-500 rounded-lg p-2 mr-3">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-green-700 dark:text-green-300">Daily Streak</p>
              <p className="text-xl font-bold text-green-800 dark:text-green-200">{progress.streakCount} days</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-blue-500 rounded-lg p-2 mr-3">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-700 dark:text-blue-300">Total XP</p>
              <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{user.xp} points</p>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-purple-500 rounded-lg p-2 mr-3">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-purple-700 dark:text-purple-300">Lessons Completed</p>
              <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{progress.completedLessons.length}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-amber-500 rounded-lg p-2 mr-3">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-amber-700 dark:text-amber-300">Languages</p>
              <p className="text-xl font-bold text-amber-800 dark:text-amber-200">{user.languages.length}</p>
            </div>
          </div>
        </div>
        
        <h3 className="mt-6 mb-3 text-lg font-medium text-gray-900 dark:text-white">Your Languages</h3>
        
        <div className="space-y-3">
          {user.languages.length > 0 ? (
            user.languages.map(lang => {
              const language = languages.find(l => l.id === lang.id);
              if (!language) return null;
              
              return (
                <Link 
                  key={lang.id}
                  to={`/course/${lang.id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{language.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Level {lang.level} • {lang.xp} XP</p>
                    </div>
                  </div>
                  
                  <div className="h-1.5 w-24 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-blue rounded-full"
                      style={{ width: `${Math.min((lang.xp % 100) / 100 * 100, 100)}%` }}
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
              <p className="text-gray-500 dark:text-gray-400">You haven't started any language courses yet.</p>
              <Link to="/courses" className="mt-2 inline-block text-sm text-brand-blue hover:underline">
                Browse available courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProgress;
