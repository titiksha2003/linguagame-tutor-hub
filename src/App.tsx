import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Skill from "./pages/Skill";
import Lesson from "./pages/Lesson";
import VideoLessons from "./pages/VideoLessons";
import VideoLessonsOverview from "./pages/VideoLessonsOverview";
import PracticeTests from "./pages/PracticeTests";
import LanguageDetails from "./pages/LanguageDetails";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import AiAssistant from "./components/AiAssistant";
import { LanguageTutorProvider } from "./contexts/LanguageTutorContext";

const queryClient = new QueryClient();

const App = () => {
  // Update document title
  useEffect(() => {
    document.title = "Wizenko";
  }, []);

  // Check for theme preference
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || 
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <ProgressProvider>
              <LanguageTutorProvider>
                {/* Move toasters inside BrowserRouter since they may use hooks that need router context */}
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:languageId" element={<Course />} />
                  <Route path="/course/:languageId/:skillId" element={<Skill />} />
                  <Route path="/lesson/:languageId/:lessonId" element={<Lesson />} />
                  <Route path="/videos" element={<VideoLessonsOverview />} />
                  <Route path="/videos/:languageId" element={<VideoLessons />} />
                  <Route path="/practice-tests" element={<PracticeTests />} />
                  <Route path="/language/:languageId" element={<LanguageDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <AiAssistant />
              </LanguageTutorProvider>
            </ProgressProvider>
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
