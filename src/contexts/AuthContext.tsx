
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  streak: number;
  dailyGoal: number;
  languages: { 
    id: string; 
    level: number; 
    xp: number; 
    completedLessons: string[];
  }[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addCompletedLesson: (languageId: string, lessonId: string, xp: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('linguaGameUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('linguaGameUser', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`,
          xp: 120,
          streak: 5,
          dailyGoal: 20,
          languages: [
            { 
              id: 'spanish', 
              level: 2, 
              xp: 120,
              completedLessons: ['spanish-intro', 'spanish-basic-greetings'] 
            }
          ]
        };
        setUser(mockUser);
        toast.success('Welcome back!');
      } else {
        // Demo credentials
        throw new Error('Invalid credentials. Try demo@example.com / password');
      }
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`,
        xp: 0,
        streak: 0,
        dailyGoal: 20,
        languages: []
      };
      
      setUser(newUser);
      toast.success('Account created successfully!');
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('linguaGameUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const addCompletedLesson = (languageId: string, lessonId: string, xp: number) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;

      const updatedLanguages = [...prevUser.languages];
      const languageIndex = updatedLanguages.findIndex(lang => lang.id === languageId);

      if (languageIndex >= 0) {
        // Language exists, update it
        const updatedLanguage = { ...updatedLanguages[languageIndex] };
        
        // Add lesson if not already completed
        if (!updatedLanguage.completedLessons.includes(lessonId)) {
          updatedLanguage.completedLessons = [...updatedLanguage.completedLessons, lessonId];
          updatedLanguage.xp += xp;
          
          // Update language level based on XP
          updatedLanguage.level = Math.floor(updatedLanguage.xp / 100) + 1;
          
          updatedLanguages[languageIndex] = updatedLanguage;
        }
      } else {
        // Language doesn't exist, add it
        updatedLanguages.push({
          id: languageId,
          level: 1,
          xp,
          completedLessons: [lessonId]
        });
      }

      // Update total XP
      const totalXp = updatedLanguages.reduce((sum, lang) => sum + lang.xp, 0);

      toast.success(`+${xp} XP earned!`);

      return {
        ...prevUser,
        languages: updatedLanguages,
        xp: totalXp
      };
    });
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateUser,
    addCompletedLesson
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
