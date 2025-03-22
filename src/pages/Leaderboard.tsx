
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award, Star, Users, Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

// Mock data for leaderboard - in a real app, this would come from your API
const mockLeaderboardData = [
  { id: 1, username: "LinguaMaster", score: 9850, language: "Japanese", avatar: "/avatar-1.png", badge: "gold" },
  { id: 2, username: "WordWizard", score: 9720, language: "Spanish", avatar: "/avatar-2.png", badge: "gold" },
  { id: 3, username: "PolyglotPro", score: 9340, language: "French", avatar: "/avatar-3.png", badge: "gold" },
  { id: 4, username: "LanguageLegend", score: 8950, language: "German", avatar: "/avatar-4.png", badge: "silver" },
  { id: 5, username: "SyntaxSage", score: 8740, language: "Italian", avatar: "/avatar-5.png", badge: "silver" },
  { id: 6, username: "GrammarGuru", score: 8320, language: "Portuguese", avatar: "/avatar-6.png", badge: "silver" },
  { id: 7, username: "VerbVirtuoso", score: 7980, language: "Korean", avatar: "/avatar-7.png", badge: "bronze" },
  { id: 8, username: "PhraseFinder", score: 7650, language: "Hindi", avatar: "/avatar-8.png", badge: "bronze" },
  { id: 9, username: "AccentAce", score: 7340, language: "English", avatar: "/avatar-9.png", badge: "bronze" },
  { id: 10, username: "DialogueDuke", score: 7120, language: "Spanish", avatar: "/avatar-10.png", badge: "bronze" },
];

// Mock user rank data - would be calculated on the server
const mockUserRank = {
  rank: 42,
  score: 3250,
  badge: "bronze",
};

interface LeaderboardEntryProps {
  rank: number;
  username: string;
  score: number;
  language: string;
  avatar?: string;
  badge: "gold" | "silver" | "bronze";
  isCurrentUser?: boolean;
}

const LeaderboardEntry = ({ rank, username, score, language, avatar, badge, isCurrentUser = false }: LeaderboardEntryProps) => {
  // Helper to determine badge icon
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "gold":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "silver":
        return <Medal className="h-5 w-5 text-gray-400" />;
      case "bronze":
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return <Star className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      className={`p-4 rounded-lg mb-3 flex items-center ${
        isCurrentUser
          ? "bg-primary/10 border border-primary/30"
          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="w-8 font-bold text-center text-gray-500 dark:text-gray-400">
        {rank}
      </div>
      
      <Avatar className="h-10 w-10 mx-3">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback className="bg-primary/20 text-primary">
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium text-gray-900 dark:text-white">
              {username} {isCurrentUser && <span className="text-xs text-primary">(You)</span>}
            </span>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Learning {language}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1 px-2">
              {getBadgeIcon(badge)}
              <span>{score} points</span>
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState<"daily" | "weekly" | "alltime">("alltime");
  
  // In a real app, you would fetch different data based on the timeFilter
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Trophy className="h-7 w-7 mr-3 text-amber-500" />
              Leaderboard
            </h1>
            
            <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as any)} className="w-[400px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="daily" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="alltime" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  All-Time
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* User's current rank */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Your Ranking
            </h2>
            
            <LeaderboardEntry
              rank={mockUserRank.rank}
              username={user?.name || "Current User"}
              score={mockUserRank.score}
              language={user?.languages[0]?.id || "Spanish"}
              badge={mockUserRank.badge as "gold" | "silver" | "bronze"}
              isCurrentUser={true}
            />
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
              Keep practicing to improve your rank and earn rewards!
            </p>
          </div>
          
          {/* Top 10 leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              Top 10 Learners
            </h2>
            
            <div className="space-y-1">
              {mockLeaderboardData.map((entry, index) => (
                <LeaderboardEntry
                  key={entry.id}
                  rank={index + 1}
                  username={entry.username}
                  score={entry.score}
                  language={entry.language}
                  avatar={entry.avatar}
                  badge={entry.badge as "gold" | "silver" | "bronze"}
                  isCurrentUser={user?.id === entry.id.toString()}
                />
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-primary font-medium">
                Top scorers get bonus content and shoutouts!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
