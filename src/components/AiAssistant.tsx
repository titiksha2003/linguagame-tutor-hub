import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, Send, BotIcon, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguageTutor } from '../contexts/LanguageTutorContext';
import { queryAI } from '../services/groqService';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  correction?: string;
  explanation?: string;
}

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedLanguage } = useLanguageTutor();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleInitialGreeting();
    }
  }, [isOpen, messages.length]);

  const handleInitialGreeting = async () => {
    setIsProcessing(true);
    try {
      const response = await queryAI(
        'Introduce yourself as a language learning assistant and ask how you can help.',
        `You are a ${selectedLanguage || 'language'} learning assistant. Be concise and friendly.`,
        selectedLanguage
      );
      
      setMessages([{
        id: Date.now().toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Greeting error:', error);
      setMessages([{
        id: Date.now().toString(),
        content: `Hi! I'm your ${selectedLanguage ? `${selectedLanguage} language` : 'language learning'} assistant. How can I help you today?`,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateConversationHistory = (newMessage: Message) => {
    const lastMessages = [...messages.slice(-3), newMessage]
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');
    setConversationHistory(lastMessages);
    return lastMessages;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    try {
      const history = updateConversationHistory(userMessage);
      const enhancedContext = `Current language: ${selectedLanguage || 'not specified'}
Conversation history:
${history}`;

      const response = await queryAI(
        inputMessage,
        enhancedContext,
        selectedLanguage
      );
      
      if (response.error) {
        toast.error(response.error);
        throw new Error(response.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content || 'I apologize, but I could not generate a response. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      updateConversationHistory(aiMessage);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Voice recognition activated');
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage('How do you say hello in Spanish?');
        toast.success('Voice input received');
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        size="icon" 
        variant="default" 
        className="rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <BotIcon className="h-5 w-5 text-primary" />
              Language Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={`message-${message.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {!message.role && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    {message.correction && (
                      <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900 rounded text-xs">
                        <p className="font-medium">Correction:</p>
                        <p>{message.correction}</p>
                      </div>
                    )}
                    {message.explanation && (
                      <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 rounded text-xs">
                        <p className="font-medium">Explanation:</p>
                        <p>{message.explanation}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything about languages..."
                className="flex-1 bg-muted rounded-md px-3 py-2 text-sm focus:outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                size="icon" 
                variant="default" 
                className="rounded-full"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AiAssistant;
