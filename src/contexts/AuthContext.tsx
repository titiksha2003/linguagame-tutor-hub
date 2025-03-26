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
  addLanguage: (languageId: string, level: number, xp: number) => void;
  removeLanguage: (languageId: string) => void;
  updateUserLevel: (languageId: string, newLevel: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Database to store all users
interface UserDatabase {
  [email: string]: {
    password: string;
    userData: User;
  };
}

// Load users from localStorage or initialize empty database
const loadUserDatabase = (): UserDatabase => {
  const storedUsers = localStorage.getItem('linguaGameUserDatabase');
  return storedUsers ? JSON.parse(storedUsers) : {};
};

// Save users to localStorage
const saveUserDatabase = (database: UserDatabase) => {
  localStorage.setItem('linguaGameUserDatabase', JSON.stringify(database));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userDatabase, setUserDatabase] = useState<UserDatabase>(loadUserDatabase());

  useEffect(() => {
    const storedUser = localStorage.getItem('linguaGameUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('linguaGameUser', JSON.stringify(user));
    }
  }, [user]);

  // Save user database whenever it changes
  useEffect(() => {
    saveUserDatabase(userDatabase);
  }, [userDatabase]);

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (userDatabase[email]) {
        throw new Error('User with this email already exists');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s/g, '')}&backgroundColor=c0aede,f9d1a2,fada5e`,
        xp: 0,
        streak: 0,
        dailyGoal: 20,
        languages: []
      };
      
      // Add user to database
      setUserDatabase(prev => ({
        ...prev,
        [email]: {
          password,
          userData: newUser
        }
      }));
      
      // Set current user
      setUser(newUser);
      toast.success('Account created successfully!');
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if demo account
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser&backgroundColor=c0aede,f9d1a2,fada5e`,
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
      } 
      // Check if user exists in database
      else if (userDatabase[email]) {
        if (userDatabase[email].password === password) {
          setUser(userDatabase[email].userData);
          toast.success('Welcome back!');
        } else {
          throw new Error('Invalid password');
        }
      } else {
        throw new Error('User not found. Please sign up first.');
      }
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
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update user in database if not demo account
      if (user.email !== 'demo@example.com' && userDatabase[user.email]) {
        setUserDatabase(prev => ({
          ...prev,
          [user.email]: {
            ...prev[user.email],
            userData: updatedUser
          }
        }));
      }
    }
  };

  const addCompletedLesson = (languageId: string, lessonId: string, xp: number) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;

      const updatedLanguages = [...prevUser.languages];
      const languageIndex = updatedLanguages.findIndex(lang => lang.id === languageId);

      if (languageIndex >= 0) {
        const updatedLanguage = { ...updatedLanguages[languageIndex] };
        
        if (!updatedLanguage.completedLessons.includes(lessonId)) {
          updatedLanguage.completedLessons = [...updatedLanguage.completedLessons, lessonId];
          updatedLanguage.xp += xp;
          
          updatedLanguage.level = Math.floor(updatedLanguage.xp / 100) + 1;
          
          updatedLanguages[languageIndex] = updatedLanguage;
        }
      } else {
        updatedLanguages.push({
          id: languageId,
          level: 1,
          xp,
          completedLessons: [lessonId]
        });
      }

      const totalXp = updatedLanguages.reduce((sum, lang) => sum + lang.xp, 0);

      toast.success(`+${xp} XP earned!`);

      const updatedUser = {
        ...prevUser,
        languages: updatedLanguages,
        xp: totalXp
      };
      
      // Update user in database if not demo account
      if (prevUser.email !== 'demo@example.com' && userDatabase[prevUser.email]) {
        setUserDatabase(prev => ({
          ...prev,
          [prevUser.email]: {
            ...prev[prevUser.email],
            userData: updatedUser
          }
        }));
      }

      return updatedUser;
    });
  };

  const addLanguage = (languageId: string, level: number, xp: number) => {
    setUser(prev => {
      if (!prev) return prev;
      
      const updatedLanguages = [...prev.languages];
      const languageIndex = updatedLanguages.findIndex(lang => lang.id === languageId);

      if (languageIndex >= 0) {
        updatedLanguages[languageIndex].level = level;
        updatedLanguages[languageIndex].xp = xp;
      } else {
        updatedLanguages.push({
          id: languageId,
          level,
          xp,
          completedLessons: []
        });
      }

      const updatedUser = {
        ...prev,
        languages: updatedLanguages
      };
      
      // Update user in database if not demo account
      if (prev.email !== 'demo@example.com' && userDatabase[prev.email]) {
        setUserDatabase(prevDb => ({
          ...prevDb,
          [prev.email]: {
            ...prevDb[prev.email],
            userData: updatedUser
          }
        }));
      }

      return updatedUser;
    });
  };

  const removeLanguage = (languageId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      
      const updatedLanguages = prev.languages.filter(lang => lang.id !== languageId);
      
      const updatedUser = {
        ...prev,
        languages: updatedLanguages
      };
      
      // Update user in database if not demo account
      if (prev.email !== 'demo@example.com' && userDatabase[prev.email]) {
        setUserDatabase(prevDb => ({
          ...prevDb,
          [prev.email]: {
            ...prevDb[prev.email],
            userData: updatedUser
          }
        }));
      }

      return updatedUser;
    });
  };

  const updateUserLevel = (languageId: string, newLevel: number) => {
    setUser(prev => {
      if (!prev) return prev;
      
      const updatedLanguages = prev.languages.map(lang => {
        if (lang.id === languageId) {
          return { ...lang, level: newLevel };
        }
        return lang;
      });
      
      const updatedUser = {
        ...prev,
        languages: updatedLanguages
      };
      
      // Update user in database if not demo account
      if (prev.email !== 'demo@example.com' && userDatabase[prev.email]) {
        setUserDatabase(prevDb => ({
          ...prevDb,
          [prev.email]: {
            ...prevDb[prev.email],
            userData: updatedUser
          }
        }));
      }

      return updatedUser;
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
    addCompletedLesson,
    addLanguage,
    removeLanguage,
    updateUserLevel
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
