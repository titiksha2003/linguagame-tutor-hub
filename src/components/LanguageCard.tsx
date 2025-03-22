
import { motion } from 'framer-motion';
import { Language } from '../data/languages';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';

interface LanguageCardProps {
  language: Language;
  index: number;
}

const LanguageCard = ({ language, index }: LanguageCardProps) => {
  const navigate = useNavigate();
  const { setCurrentLanguage } = useProgress();
  const { user } = useAuth();
  
  // Find user's progress in this language
  const userLanguageProgress = user?.languages.find(lang => lang.id === language.id);
  
  const handleSelectLanguage = () => {
    setCurrentLanguage(language.id);
    navigate(`/language/${language.id}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group cursor-pointer hover-scale"
      onClick={handleSelectLanguage}
    >
      <div 
        className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
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
            
            {userLanguageProgress && (
              <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                Level {userLanguageProgress.level}
              </div>
            )}
          </div>
          
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {language.description}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language.difficulty}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {(language.learnerCount / 1000000).toFixed(1)}M learners
            </div>
          </div>
          
          {userLanguageProgress && (
            <div className="mt-4">
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-blue rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((userLanguageProgress.xp % 100) / 100 * 100, 100)}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>{userLanguageProgress.xp} XP</span>
                <span>{100 - (userLanguageProgress.xp % 100)} XP to next level</span>
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-transparent to-black/10 dark:to-black/30 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};

export default LanguageCard;
