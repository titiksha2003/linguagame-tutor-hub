
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useProgress } from './contexts/ProgressContext';
import { useLanguageTutor } from './contexts/LanguageTutorContext';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Skill from './pages/Skill';
import Lesson from './pages/Lesson';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import LanguageDetails from './pages/LanguageDetails';
import Leaderboard from './pages/Leaderboard';
import PracticeTests from './pages/PracticeTests';
import VideoLessons from './pages/VideoLessons';
import VideoLessonsOverview from './pages/VideoLessonsOverview';
import AiAssistant from './components/AiAssistant';
import GroqChatAssistant from './components/GroqChatAssistant';

function App() {
  const { progress } = useProgress();
  const initialized = progress !== undefined;

  // Wait for context initialization
  if (!initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/skill/:id" element={<Skill />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/languages/:id" element={<LanguageDetails />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/practice-tests" element={<PracticeTests />} />
        <Route path="/video-lessons" element={<VideoLessons />} />
        <Route path="/video-lessons-overview" element={<VideoLessonsOverview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Choose one of the AI assistants to display - 
          You can use AiAssistant (original) or GroqChatAssistant (new Groq-powered version) */}
      {/* <AiAssistant /> */}
      <GroqChatAssistant />
    </>
  );
}

export default App;
