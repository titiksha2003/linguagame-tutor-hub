
import { useState, useEffect } from 'react';

// Interface for chat messages
export interface ChatMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// System prompt for the language tutor
const SYSTEM_PROMPT = `You are a friendly and knowledgeable spoken language tutor. Your role is to assist users in learning and practicing any language. You should be able to:

Answer questions related to grammar, vocabulary, pronunciation, and language usage.

Identify and correct mistakes in the user's spoken or written input.

Provide clear explanations, examples, and feedback to help users improve.

Support learners at any proficiency level, from beginner to advanced. Be encouraging, patient, and adaptable to different learning styles.`;

// Groq API configuration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = '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';
const MODEL = 'mixtral-8x7b-32768';

/**
 * Send a message to the Groq API and get a response
 */
export const sendMessageToGroq = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Format messages for Groq API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Always include system message as the first message
    if (!formattedMessages.some(msg => msg.role === 'system')) {
      formattedMessages.unshift({
        role: 'system',
        content: SYSTEM_PROMPT
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message to Groq:', error);
    throw error;
  }
};

/**
 * Custom hook to manage chat messages and Groq API communication
 */
export const useGroqChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your language learning assistant powered by Groq. How can I help you today? Feel free to ask me about grammar, vocabulary, or any language-related questions!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      // Add user message to the chat
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Send message to Groq API
      const updatedMessages = [...messages, userMessage];
      const response = await sendMessageToGroq(updatedMessages);

      // Add Groq's response to the chat
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Oops! Something went wrong with the Groq API. Please try again later.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hi there! I'm your language learning assistant powered by Groq. How can I help you today? Feel free to ask me about grammar, vocabulary, or any language-related questions!",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
};
