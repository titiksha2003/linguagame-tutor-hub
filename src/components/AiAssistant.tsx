
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mic, Send, BotIcon, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your language learning assistant. How can I help you today? Ask me about grammar, vocabulary, or anything language-related!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "I'd be happy to help with that! What specific aspect would you like to know more about?",
        "That's a great question! In language learning, practice is key. Try using this phrase in different contexts.",
        "The correct grammar form would be '[example correction]'. Remember that rule applies when you're talking about past events.",
        "That word means '[example definition]' in English. It's commonly used in conversations about [topic].",
        "For pronunciation, try breaking that word into syllables: [example]. Focus on the stress on the second syllable.",
        "A helpful memory technique for vocabulary is to create associations. For this word, you might think of [example]."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast("Speech recognition stopped", {
        description: "Voice input feature coming soon!",
      });
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        toast("Speech recognition not available yet", {
          description: "This feature will be available in a future update.",
        });
      }, 2000);
    }
  };
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-primary/10 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatar-bot.png" alt="AI Assistant" />
                  <AvatarFallback className="bg-primary text-white">
                    <BotIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">Language Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask about grammar, vocab, etc.</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`rounded-full ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
                onClick={toggleRecording}
              >
                <Mic className="h-5 w-5" />
              </Button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask something about language learning..."
                className="flex-grow mx-2 p-2 bg-transparent border-none focus:outline-none text-sm"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="rounded-full text-primary"
                disabled={!inputText.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-8 h-14 w-14 rounded-full bg-primary shadow-lg flex items-center justify-center z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen ? "0px 0px 0px rgba(0, 0, 0, 0.2)" : "0px 0px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>
    </>
  );
};

export default AiAssistant;
