
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { Flame, Home, Trophy, User, LogOut, BookOpen, Play, CheckSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { languages } from '../data/languages';
import WizenkoLogo from './WizenkoLogo';

const Header = () => {
  const { user, logout } = useAuth();
  const { progress } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Determine current language from URL or progress
  const currentLanguageId = (() => {
    const match = location.pathname.match(/\/course\/([^\/]+)/);
    if (match) return match[1];
    
    const videoMatch = location.pathname.match(/\/videos\/([^\/]+)/);
    if (videoMatch) return videoMatch[1];
    
    const languageMatch = location.pathname.match(/\/language\/([^\/]+)/);
    if (languageMatch) return languageMatch[1];
    
    return progress.currentLanguage;
  })();
  
  const currentLanguage = languages.find(lang => lang.id === currentLanguageId);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <WizenkoLogo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/dashboard" 
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      location.pathname === '/dashboard' 
                        ? 'bg-gray-100 dark:bg-gray-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Home className={`h-5 w-5 ${
                      location.pathname === '/dashboard' 
                        ? 'text-primary'
                        : 'text-gray-700 dark:text-gray-300'
                    }`} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/courses" 
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      location.pathname === '/courses' 
                        ? 'bg-gray-100 dark:bg-gray-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <BookOpen className={`h-5 w-5 ${
                      location.pathname === '/courses' 
                        ? 'text-primary'
                        : 'text-gray-700 dark:text-gray-300'
                    }`} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Languages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/videos" 
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      location.pathname.startsWith('/videos') 
                        ? 'bg-gray-100 dark:bg-gray-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Play className={`h-5 w-5 ${
                      location.pathname.startsWith('/videos') 
                        ? 'text-primary'
                        : 'text-gray-700 dark:text-gray-300'
                    }`} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video Lessons</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/practice-tests" 
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      location.pathname.startsWith('/practice-tests') || (location.pathname.startsWith('/course/') && !location.pathname.startsWith('/courses')) 
                        ? 'bg-gray-100 dark:bg-gray-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <CheckSquare className={`h-5 w-5 ${
                      location.pathname.startsWith('/practice-tests') || (location.pathname.startsWith('/course/') && !location.pathname.startsWith('/courses')) 
                        ? 'text-primary'
                        : 'text-gray-700 dark:text-gray-300'
                    }`} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Practice Tests</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/leaderboard" 
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Trophy className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Leaderboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {user && (
              <div className="flex items-center space-x-3">
                <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center space-x-1 py-1">
                  <Flame className="h-3.5 w-3.5" />
                  <span>{progress.streakCount}</span>
                </Badge>
                
                <Badge className="bg-indigo-500 hover:bg-indigo-600">
                  {user.xp} XP
                </Badge>
                
                {currentLanguage && (
                  <Badge className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                    <span className="mr-1">{currentLanguage.flag}</span>
                    {currentLanguage.name}
                  </Badge>
                )}
              </div>
            )}
          </nav>

          {/* User section */}
          <div className="flex items-center">
            {user ? (
              <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0 overflow-hidden">
                    <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-105">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 animate-scale-in" align="end">
                  <div className="flex flex-col space-y-1">
                    <div className="px-2 py-1.5 mb-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center px-2 py-1.5 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="text-sm">Log out</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button size="sm" onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
