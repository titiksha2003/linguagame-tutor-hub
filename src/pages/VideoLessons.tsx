
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import { getVideosByLanguage, VideoLesson as VideoLessonType } from '../data/videoLessons';
import VideoLessonComponent from '../components/VideoLesson';
import { languages } from '../data/languages';

const VideoLessons = () => {
  const { languageId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [videos, setVideos] = useState<VideoLessonType[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoLessonType | null>(null);
  
  useEffect(() => {
    if (!languageId) return;
    
    const languageVideos = getVideosByLanguage(languageId);
    setVideos(languageVideos);
    
    // Select the first video by default
    if (languageVideos.length > 0 && !selectedVideo) {
      setSelectedVideo(languageVideos[0]);
    }
  }, [languageId, selectedVideo]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!languageId) {
    return <div>Language not found</div>;
  }
  
  const language = languages.find(lang => lang.id === languageId);
  
  if (!language) {
    return <div>Language not found</div>;
  }
  
  const handleVideoSelect = (video: VideoLessonType) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNextVideo = () => {
    if (!selectedVideo) return;
    
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex < videos.length - 1) {
      setSelectedVideo(videos[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePreviousVideo = () => {
    if (!selectedVideo) return;
    
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex > 0) {
      setSelectedVideo(videos[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center mb-8">
            <span className="text-3xl mr-3">{language.flag}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {language.name} Video Lessons
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - Selected video */}
            <div className="lg:col-span-2">
              {selectedVideo ? (
                <VideoLessonComponent
                  key={selectedVideo.id}
                  videoId={selectedVideo.videoId}
                  title={selectedVideo.title}
                  description={selectedVideo.description}
                  onNext={handleNextVideo}
                  onPrevious={handlePreviousVideo}
                  hasPrevious={videos.indexOf(selectedVideo) !== 0}
                  hasNext={videos.indexOf(selectedVideo) !== videos.length - 1}
                  languageId={languageId}
                />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    No videos available. Please select a language with video lessons.
                  </p>
                </div>
              )}
            </div>
            
            {/* Sidebar - Video list and language selector */}
            <div className="space-y-6">
              {/* Language selector */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    All Languages
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  {languages.map((lang) => (
                    <Link
                      key={lang.id}
                      to={`/videos/${lang.id}`}
                      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                        lang.id === languageId 
                          ? 'bg-primary/10 border border-primary/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{lang.flag}</span>
                      <span className="text-xs text-center font-medium text-gray-900 dark:text-white">
                        {lang.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Video list */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    All Lessons
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                  {videos.length > 0 ? (
                    videos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          selectedVideo?.id === video.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No lessons available for this language yet.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Ready to test your knowledge?
                </h3>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/course/${languageId}`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Go to Practice Tests
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoLessons;
