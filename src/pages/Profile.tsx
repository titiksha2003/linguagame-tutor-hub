
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { languages } from '../data/languages';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Upload, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const { progress } = useProgress();
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, [user, navigate]);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // For this demo, we'll just create a data URL from the file
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && user) {
        updateUser({
          ...user,
          avatar: reader.result
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  if (!user) return null;
  
  // Find user's primary language
  const currentLanguage = languages.find(lang => 
    lang.id === progress.currentLanguage
  );
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Profile
              </h1>
              
              <div className="space-y-6">
                {/* Avatar section */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative group">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-opacity duration-200">
                      <label htmlFor="avatar-upload" className="cursor-pointer p-2 rounded-full bg-white text-gray-700">
                        <Upload className="h-5 w-5" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={user.name} readOnly />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} readOnly />
                    </div>
                  </div>
                </div>
                
                {/* Stats section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.xp}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.streakCount}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Languages</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.languages.length}</p>
                  </div>
                </div>
                
                {/* Language preference */}
                {currentLanguage && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Current Language
                    </h2>
                    
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-3xl mr-3">{currentLanguage.flag}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{currentLanguage.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage.nativeName}</p>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => navigate('/courses')}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Theme toggle */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Appearance
                  </h2>
                  
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                    <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {isDarkMode ? 'Dark mode' : 'Light mode'}
                    </span>
                  </div>
                </div>
                
                {/* Logout button */}
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
