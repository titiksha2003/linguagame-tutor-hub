import { useState, useEffect, useRef } from 'react';
import { queryAI } from '../services/groqService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Spinner } from './ui/spinner';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatProps {
  languageId?: string;
  context?: string;
}

const AIChat = ({ languageId, context }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    handleInitialGreeting();
  }, [languageId]);

  const handleInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const response = await queryAI(
        'Introduce yourself as a language learning assistant and ask how you can help.',
        `You are a ${languageId || 'language'} learning assistant. Be concise and friendly.`,
        languageId
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
        content: `Hi! I'm your ${languageId ? `${languageId} language` : 'language learning'} assistant. How can I help you today?`,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversationHistory = (newMessage: Message) => {
    const lastMessages = [...messages.slice(-3), newMessage]
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');
    setConversationHistory(lastMessages);
    return lastMessages;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = updateConversationHistory(userMessage);
      const enhancedContext = `${context || ''}\nConversation history:\n${history}`;
      
      const response = await queryAI(
        input,
        enhancedContext,
        languageId
      );
      
      if (response.error) {
        throw new Error(response.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      updateConversationHistory(aiMessage);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'I apologize, but I encountered an error. Please try asking again.',
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <Spinner />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about learning this language..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;