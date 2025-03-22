
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Lesson, Skill, getSkillById } from '../data/lessons';

interface Progress {
  completedLessons: string[];
  completedSkills: string[];
  unlockedSkills: string[];
  currentLanguage: string;
  currentSkill: string | null;
  currentLesson: string | null;
  streakCount: number;
  lastActivity: string | null;
}

interface ProgressContextType {
  progress: Progress;
  setCurrentLanguage: (languageId: string) => void;
  setCurrentSkill: (skillId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  isSkillUnlocked: (skillId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: Progress = {
  completedLessons: [],
  completedSkills: [],
  unlockedSkills: ['spanish-basics'],  // Start with Spanish basics unlocked
  currentLanguage: 'spanish',
  currentSkill: null,
  currentLesson: null,
  streakCount: 0,
  lastActivity: null
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const { user, addCompletedLesson } = useAuth();
  
  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('linguaGameProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('linguaGameProgress', JSON.stringify(progress));
  }, [progress]);
  
  // Update streak count
  useEffect(() => {
    if (!progress.lastActivity) return;
    
    const lastDate = new Date(progress.lastActivity);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if the last activity was yesterday
    if (lastDate.toDateString() === yesterday.toDateString()) {
      // Update streak
      setProgress(prev => ({
        ...prev,
        streakCount: prev.streakCount + 1,
        lastActivity: today.toISOString()
      }));
    } 
    // Check if the last activity was earlier than yesterday
    else if (lastDate < yesterday) {
      // Reset streak
      setProgress(prev => ({
        ...prev,
        streakCount: 1,
        lastActivity: today.toISOString()
      }));
    }
  }, [progress.lastActivity]);
  
  const setCurrentLanguage = (languageId: string) => {
    setProgress(prev => ({
      ...prev,
      currentLanguage: languageId
    }));
  };
  
  const setCurrentSkill = (skillId: string | null) => {
    setProgress(prev => ({
      ...prev,
      currentSkill: skillId
    }));
  };
  
  const setCurrentLesson = (lessonId: string | null) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: lessonId
    }));
  };
  
  const completeLesson = (lessonId: string, xp: number) => {
    setProgress(prev => {
      // Only add if not already completed
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      
      const updatedCompletedLessons = [...prev.completedLessons, lessonId];
      const today = new Date();
      
      // Find the skill this lesson belongs to
      let skillToCheck: Skill | undefined = undefined;
      for (const skillId of [...prev.completedSkills, ...prev.unlockedSkills]) {
        const skill = getSkillById(skillId);
        if (skill && skill.lessons.some(lesson => lesson.id === lessonId)) {
          skillToCheck = skill;
          break;
        }
      }
      
      // Check if all lessons in the skill are completed
      let updatedCompletedSkills = [...prev.completedSkills];
      let updatedUnlockedSkills = [...prev.unlockedSkills];
      
      if (skillToCheck) {
        const allLessonsInSkillCompleted = skillToCheck.lessons.every(
          lesson => updatedCompletedLessons.includes(lesson.id)
        );
        
        // If all lessons are completed, mark skill as completed and unlock next skills
        if (allLessonsInSkillCompleted && !updatedCompletedSkills.includes(skillToCheck.id)) {
          updatedCompletedSkills = [...updatedCompletedSkills, skillToCheck.id];
          
          // Unlock next skills
          skillToCheck.unlocks.forEach(skillId => {
            if (!updatedUnlockedSkills.includes(skillId) && !updatedCompletedSkills.includes(skillId)) {
              updatedUnlockedSkills = [...updatedUnlockedSkills, skillId];
            }
          });
        }
      }
      
      // Update user XP in AuthContext if logged in
      if (user) {
        addCompletedLesson(prev.currentLanguage, lessonId, xp);
      }
      
      return {
        ...prev,
        completedLessons: updatedCompletedLessons,
        completedSkills: updatedCompletedSkills,
        unlockedSkills: updatedUnlockedSkills,
        lastActivity: today.toISOString()
      };
    });
  };
  
  const isSkillUnlocked = (skillId: string): boolean => {
    return progress.unlockedSkills.includes(skillId) || progress.completedSkills.includes(skillId);
  };
  
  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };
  
  const value = {
    progress,
    setCurrentLanguage,
    setCurrentSkill,
    setCurrentLesson,
    completeLesson,
    isSkillUnlocked,
    isLessonCompleted
  };
  
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
