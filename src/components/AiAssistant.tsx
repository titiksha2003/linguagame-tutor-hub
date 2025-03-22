import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mic, Send, BotIcon, Loader2, VolumeX, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Language-specific responses for common questions
const languageResponses = {
  french: {
    hello: "Hello in French is 'Bonjour' (pronounced: bon-zhoor)",
    goodbye: "Goodbye in French is 'Au revoir' (pronounced: oh ruh-vwahr)",
    thankyou: "Thank you in French is 'Merci' (pronounced: mehr-see)",
    howareyou: "How are you in French is 'Comment allez-vous?' (pronounced: koh-mahn tah-lay voo)",
    love: "Love in French is 'Amour' (pronounced: ah-moor)",
    yes: "Yes in French is 'Oui' (pronounced: wee)",
    no: "No in French is 'Non' (pronounced: nohn)",
  },
  spanish: {
    hello: "Hello in Spanish is 'Hola' (pronounced: oh-lah)",
    goodbye: "Goodbye in Spanish is 'Adiós' (pronounced: ah-dee-ohs)",
    thankyou: "Thank you in Spanish is 'Gracias' (pronounced: grah-see-ahs)",
    howareyou: "How are you in Spanish is '¿Cómo estás?' (pronounced: koh-moh eh-stahs)",
    love: "Love in Spanish is 'Amor' (pronounced: ah-mor)",
    yes: "Yes in Spanish is 'Sí' (pronounced: see)",
    no: "No in Spanish is 'No' (pronounced: noh)",
  },
  japanese: {
    hello: "Hello in Japanese is 'Konnichiwa' (こんにちは, pronounced: kon-nee-chee-wah)",
    goodbye: "Goodbye in Japanese is 'Sayonara' (さようなら, pronounced: sah-yoh-nah-rah)",
    thankyou: "Thank you in Japanese is 'Arigatou' (ありがとう, pronounced: ah-ree-gah-toh)",
    howareyou: "How are you in Japanese is 'Ogenki desu ka?' (お元気ですか？ pronounced: oh-gen-kee des-kah)",
    love: "Love in Japanese is 'Ai' (愛, pronounced: eye)",
    yes: "Yes in Japanese is 'Hai' (はい, pronounced: high)",
    no: "No in Japanese is 'Iie' (いいえ, pronounced: ee-eh)",
  },
  german: {
    hello: "Hello in German is 'Hallo' (pronounced: hah-loh)",
    goodbye: "Goodbye in German is 'Auf Wiedersehen' (pronounced: owf vee-der-zayn)",
    thankyou: "Thank you in German is 'Danke' (pronounced: dahn-kuh)",
    howareyou: "How are you in German is 'Wie geht es dir?' (pronounced: vee gayt es deer)",
    love: "Love in German is 'Liebe' (pronounced: lee-buh)",
    yes: "Yes in German is 'Ja' (pronounced: yah)",
    no: "No in German is 'Nein' (pronounced: nine)",
  },
  italian: {
    hello: "Hello in Italian is 'Ciao' (pronounced: chow)",
    goodbye: "Goodbye in Italian is 'Arrivederci' (pronounced: ah-ree-veh-dehr-chee)",
    thankyou: "Thank you in Italian is 'Grazie' (pronounced: grah-tsee-eh)",
    howareyou: "How are you in Italian is 'Come stai?' (pronounced: koh-meh stai)",
    love: "Love in Italian is 'Amore' (pronounced: ah-mor-eh)",
    yes: "Yes in Italian is 'Sì' (pronounced: see)",
    no: "No in Italian is 'No' (pronounced: noh)",
  },
  korean: {
    hello: "Hello in Korean is 'Annyeonghaseyo' (안녕하세요, pronounced: ahn-nyong-ha-seh-yo)",
    goodbye: "Goodbye in Korean is 'Annyeonghi gaseyo' (안녕히 가세요, pronounced: ahn-nyong-hee gah-seh-yo)",
    thankyou: "Thank you in Korean is 'Gamsahamnida' (감사합니다, pronounced: gahm-sah-hahm-nee-dah)",
    howareyou: "How are you in Korean is 'Eotteoke jineseoyo?' (어떻게 지내세요?, pronounced: uh-ttuh-keh jee-neh-seh-yo)",
    love: "Love in Korean is 'Sarang' (사랑, pronounced: sah-rahng)",
    yes: "Yes in Korean is 'Ne' (네, pronounced: neh)",
    no: "No in Korean is 'Aniyo' (아니요, pronounced: ah-nee-yo)",
  },
  portuguese: {
    hello: "Hello in Portuguese is 'Olá' (pronounced: oh-lah)",
    goodbye: "Goodbye in Portuguese is 'Adeus' (pronounced: ah-day-oosh)",
    thankyou: "Thank you in Portuguese is 'Obrigado/a' (pronounced: oh-bree-gah-doo/dah)",
    howareyou: "How are you in Portuguese is 'Como está?' (pronounced: koh-moh esh-tah)",
    love: "Love in Portuguese is 'Amor' (pronounced: ah-mor)",
    yes: "Yes in Portuguese is 'Sim' (pronounced: seem)",
    no: "No in Portuguese is 'Não' (pronounced: now)",
  },
  hindi: {
    hello: "Hello in Hindi is 'Namaste' (नमस्ते, pronounced: nuh-muh-stay)",
    goodbye: "Goodbye in Hindi is 'Alvida' (अलविदा, pronounced: al-vee-dah)",
    thankyou: "Thank you in Hindi is 'Dhanyavaad' (धन्यवाद, pronounced: dhuhn-yuh-vahd)",
    howareyou: "How are you in Hindi is 'Aap kaise hain?' (आप कैसे हैं?, pronounced: aap kay-say hain)",
    love: "Love in Hindi is 'Pyaar' (प्यार, pronounced: pyaar)",
    yes: "Yes in Hindi is 'Haan' (हां, pronounced: haan)",
    no: "No in Hindi is 'Nahin' (नहीं, pronounced: nuh-heen)",
  },
  english: {
    hello: "Hello in English is 'Hello' (pronounced: heh-loh)",
    goodbye: "Goodbye in English is 'Goodbye' (pronounced: good-bye)",
    thankyou: "Thank you in English is 'Thank you' (pronounced: thank-you)",
    howareyou: "How are you in English is 'How are you?' (pronounced: how-are-you)",
    love: "Love in English is 'Love' (pronounced: luhv)",
    yes: "Yes in English is 'Yes' (pronounced: yes)",
    no: "No in English is 'No' (pronounced: no)",
  }
};

// Common grammar explanations for each language
const grammarExplanations = {
  french: [
    "In French, nouns have genders (masculine or feminine). Articles change based on the gender: 'le' (masculine) and 'la' (feminine).",
    "French adjectives usually come after the noun and must agree in gender and number.",
    "French verb conjugation depends on the subject pronoun and the tense. For example, 'je parle' (I speak), 'tu parles' (you speak).",
    "Question formation in French can be done by inverting the verb and subject: 'Parles-tu français?' (Do you speak French?)"
  ],
  spanish: [
    "In Spanish, nouns have genders (masculine or feminine). Masculine nouns often end in -o, feminine nouns in -a.",
    "Spanish adjectives usually come after the noun and must agree in gender and number.",
    "Spanish uses two forms of 'to be': 'ser' for permanent traits and 'estar' for temporary states.",
    "Spanish verbs are conjugated based on the subject and tense. For example: 'yo hablo' (I speak), 'tú hablas' (you speak)."
  ],
  japanese: [
    "Japanese sentences follow a Subject-Object-Verb order, unlike English's Subject-Verb-Object.",
    "Japanese nouns don't have gender or plural forms.",
    "Japanese uses particles (は, が, を, etc.) to mark the grammatical function of words.",
    "Japanese verbs change form based on politeness level and tense, not on the subject."
  ],
  // Add grammar explanations for other languages...
};

// Function to generate a typical response based on detected keywords in the user message
const generateResponse = (message: string): string => {
  // Converting to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Detect language
  let language = "english"; // Default
  if (lowerMessage.includes("french") || lowerMessage.includes("france")) {
    language = "french";
  } else if (lowerMessage.includes("spanish") || lowerMessage.includes("spain")) {
    language = "spanish";
  } else if (lowerMessage.includes("japanese") || lowerMessage.includes("japan")) {
    language = "japanese";
  } else if (lowerMessage.includes("german") || lowerMessage.includes("germany")) {
    language = "german";
  } else if (lowerMessage.includes("italian") || lowerMessage.includes("italy")) {
    language = "italian";
  } else if (lowerMessage.includes("korean") || lowerMessage.includes("korea")) {
    language = "korean";
  } else if (lowerMessage.includes("portuguese") || lowerMessage.includes("portugal") || lowerMessage.includes("brazil")) {
    language = "portuguese";
  } else if (lowerMessage.includes("hindi") || lowerMessage.includes("india")) {
    language = "hindi";
  }
  
  // Detect word/phrase
  const responses = languageResponses[language as keyof typeof languageResponses];
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage.includes("greet")) {
    return responses.hello;
  } else if (lowerMessage.includes("goodbye") || lowerMessage.includes("bye")) {
    return responses.goodbye;
  } else if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
    return responses.thankyou;
  } else if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you say how are you")) {
    return responses.howareyou;
  } else if (lowerMessage.includes("love")) {
    return responses.love;
  } else if (lowerMessage.includes("yes") && !lowerMessage.includes("yesterday")) {
    return responses.yes;
  } else if (lowerMessage.includes(" no ") || lowerMessage.endsWith(" no") || lowerMessage === "no") {
    return responses.no;
  } else if (lowerMessage.includes("grammar")) {
    const grammarInfo = grammarExplanations[language as keyof typeof grammarExplanations];
    if (grammarInfo && grammarInfo.length > 0) {
      return grammarInfo[Math.floor(Math.random() * grammarInfo.length)];
    }
  }
  
  // General responses if no keyword match
  const generalResponses = [
    `I can help with ${language} vocabulary, grammar, and pronunciation. What specific word or phrase would you like to learn?`,
    `For better ${language} learning, try practicing with short dialogues. Would you like an example?`,
    `In ${language}, pronunciation is key. Would you like me to help you with a specific sound or word?`,
    `I can translate simple phrases to ${language}. What would you like to know?`
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Web Speech API recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Check if SpeechRecognition is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        try {
          recognitionRef.current = new SpeechRecognitionAPI();
          if (recognitionRef.current) {
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            
            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
              const transcript = event.results[0][0].transcript;
              setInputText(transcript);
              setIsRecording(false);
              
              // Automatically submit after voice input
              setTimeout(() => {
                handleSubmitWithText(transcript);
              }, 500);
            };
            
            recognitionRef.current.onerror = (event: Event) => {
              console.error('Speech recognition error', event);
              setIsRecording(false);
              toast.error("Voice recognition error. Please try again or type your message.");
            };
            
            recognitionRef.current.onend = () => {
              setIsRecording(false);
            };
          }
        } catch (err) {
          console.error('Error initializing speech recognition:', err);
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (err) {
          console.error('Error aborting speech recognition:', err);
        }
      }
    };
  }, []);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    handleSubmitWithText(inputText);
  };
  
  const handleSubmitWithText = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    
    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(text);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Speak the response if audio is enabled
      if (audioEnabled) {
        speakText(aiResponse);
      }
    }, 1000);
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for language learning
      utterance.pitch = 1;
      
      // Get available voices and try to select a good one
      const voices = window.speechSynthesis.getVoices();
      
      // Wait for voices to be loaded if they're not available yet
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          const voice = updatedVoices.find(voice => voice.lang.includes('en') && voice.name.includes('Female'));
          if (voice) utterance.voice = voice;
          
          setIsSpeaking(true);
          window.speechSynthesis.speak(utterance);
        };
      } else {
        // Try to find a female English voice
        const voice = voices.find(voice => voice.lang.includes('en') && voice.name.includes('Female'));
        if (voice) utterance.voice = voice;
        
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      toast("Speech synthesis not supported by your browser", {
        description: "Try using Chrome or Edge for text-to-speech functionality.",
      });
    }
  };
  
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported by your browser");
      return;
    }
    
    if (isRecording) {
      try {
        recognitionRef.current.abort();
      } catch (err) {
        console.error('Error stopping speech recognition:', err);
      }
      setIsRecording(false);
    } else {
      try {
        setIsRecording(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsRecording(false);
        toast.error("Could not start voice recognition. Please try again.");
      }
    }
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    toast(audioEnabled ? "Voice responses disabled" : "Voice responses enabled");
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
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={toggleAudio}
                  title={audioEnabled ? "Disable voice responses" : "Enable voice responses"}
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
