
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { languages } from '../data/languages';
import { getSkillsByLanguage } from '../data/lessons';
import Header from '../components/Header';
import { ArrowLeft, Play, CheckSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';

const LanguageDetails = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const language = languages.find(lang => lang.id === languageId);
  const skills = getSkillsByLanguage(languageId || '');
  
  // Get user's progress in this language
  const userLanguageProgress = user?.languages.find(lang => lang.id === languageId);
  
  if (!language) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p>Language not found</p>
          </div>
        </main>
      </div>
    );
  }
  
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
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-5xl">{language.flag}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{language.name}</h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400">{language.nativeName}</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">{language.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  Difficulty: {language.difficulty}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {(language.learnerCount / 1000000).toFixed(1)}M learners
                </div>
                {userLanguageProgress && (
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    Level {userLanguageProgress.level}
                  </div>
                )}
              </div>
              
              {userLanguageProgress && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your progress</p>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills you'll learn</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {skills.slice(0, 6).map((skill) => (
                  <div key={skill.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{skill.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate(`/videos/${language.id}`)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Video Lessons
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate(`/course/${language.id}`)}
                >
                  <CheckSquare className="mr-2 h-5 w-5" />
                  Practice Tests
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LanguageDetails;
