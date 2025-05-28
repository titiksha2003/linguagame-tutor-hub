import React, { createContext, useContext, useState, ReactNode } from 'react';
import { languages } from '../data/languages';

interface TranslationExample {
  source: string;
  target: string;
  language: string;
}

interface GrammarRule {
  language: string;
  title: string;
  explanation: string;
  example: string;
}

interface PronunciationTip {
  language: string;
  sound: string;
  explanation: string;
  example: string;
}

interface CulturalTip {
  language: string;
  title: string;
  explanation: string;
}

interface LanguageTutorContextType {
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string | null) => void;
  translations: TranslationExample[];
  grammarRules: GrammarRule[];
  pronunciationTips: PronunciationTip[];
  culturalTips: CulturalTip[];
  getTranslations: (text: string, targetLanguage: string) => Promise<string>;
  getGrammarExplanation: (concept: string, language: string) => Promise<GrammarRule | null>;
  getPronunciationHelp: (sound: string, language: string) => Promise<PronunciationTip | null>;
  getCulturalTips: (language: string) => Promise<CulturalTip[]>;
}

// Dummy data for initial context values
const defaultTranslations: TranslationExample[] = [
  { source: "Hello", target: "Hola", language: "spanish" },
  { source: "Goodbye", target: "Adiós", language: "spanish" },
  { source: "Thank you", target: "Gracias", language: "spanish" },
  { source: "Hello", target: "Bonjour", language: "french" },
  { source: "Goodbye", target: "Au revoir", language: "french" },
  { source: "Thank you", target: "Merci", language: "french" },
  { source: "Hello", target: "Ciao", language: "italian" },
  { source: "Goodbye", target: "Arrivederci", language: "italian" },
  { source: "Thank you", target: "Grazie", language: "italian" },
  { source: "Hello", target: "Hallo", language: "german" },
  { source: "Goodbye", target: "Auf Wiedersehen", language: "german" },
  { source: "Thank you", target: "Danke", language: "german" },
  { source: "Hello", target: "こんにちは (Konnichiwa)", language: "japanese" },
  { source: "Goodbye", target: "さようなら (Sayōnara)", language: "japanese" },
  { source: "Thank you", target: "ありがとう (Arigatō)", language: "japanese" },
  { source: "Hello", target: "你好 (Nǐ hǎo)", language: "chinese" },
  { source: "Goodbye", target: "再见 (Zàijiàn)", language: "chinese" },
  { source: "Thank you", target: "谢谢 (Xièxiè)", language: "chinese" },
  { source: "Hello", target: "안녕하세요 (Annyeonghaseyo)", language: "korean" },
  { source: "Goodbye", target: "안녕히 가세요 (Annyeonghi gaseyo)", language: "korean" },
  { source: "Thank you", target: "감사합니다 (Gamsahamnida)", language: "korean" }
];

const defaultGrammarRules: GrammarRule[] = [
  {
    language: "spanish",
    title: "Ser vs Estar",
    explanation: "In Spanish, there are two verbs for 'to be': 'ser' and 'estar'. 'Ser' is used for permanent attributes, while 'estar' is used for temporary states.",
    example: "Soy alto (I am tall - permanent) vs. Estoy cansado (I am tired - temporary)"
  },
  {
    language: "french",
    title: "Articles in French",
    explanation: "French uses different articles based on gender and number: 'le' (masculine), 'la' (feminine), and 'les' (plural).",
    example: "Le livre (the book), La table (the table), Les livres (the books)"
  },
  {
    language: "italian",
    title: "Italian Plurals",
    explanation: "In Italian, most nouns ending in -o change to -i in plural (masculine), and nouns ending in -a change to -e (feminine).",
    example: "Libro → Libri (book → books), Casa → Case (house → houses)"
  },
  {
    language: "german",
    title: "German Cases",
    explanation: "German has four cases: nominative (subject), accusative (direct object), dative (indirect object), and genitive (possession).",
    example: "Der Mann (nom.), den Mann (acc.), dem Mann (dat.), des Mannes (gen.)"
  },
  {
    language: "japanese",
    title: "Japanese Particles",
    explanation: "Japanese uses particles to mark grammatical functions: 'は' (wa) for topic, 'が' (ga) for subject, 'を' (wo) for object.",
    example: "私は本を読みます (Watashi wa hon wo yomimasu - I read a book)"
  },
  {
    language: "chinese",
    title: "Chinese Measure Words",
    explanation: "Chinese uses measure words between numbers and nouns. Different objects use different measure words.",
    example: "三本书 (sān běn shū - three books), 一杯茶 (yī bēi chá - one cup of tea)"
  },
  {
    language: "korean",
    title: "Korean Honorifics",
    explanation: "Korean has different speech levels depending on the social relationship between speakers.",
    example: "안녕하세요 (formal greeting) vs 안녕 (informal greeting)"
  }
];

const defaultPronunciationTips: PronunciationTip[] = [
  {
    language: "spanish",
    sound: "ñ",
    explanation: "The Spanish 'ñ' is pronounced like the 'ny' in 'canyon'.",
    example: "Mañana (tomorrow)"
  },
  {
    language: "french",
    sound: "r",
    explanation: "The French 'r' is produced in the back of the throat, unlike the English 'r'.",
    example: "Paris, rouge (red)"
  },
  {
    language: "italian",
    sound: "gn",
    explanation: "The Italian 'gn' combination is pronounced like the Spanish 'ñ' or the 'ny' in English 'canyon'.",
    example: "Gnocchi, signore (sir)"
  },
  {
    language: "german",
    sound: "ch",
    explanation: "The German 'ch' after 'a', 'o', 'u' sounds like the 'ch' in Scottish 'loch'; after 'e', 'i', 'ä', 'ö', 'ü' it's softer.",
    example: "Buch (book), ich (I)"
  },
  {
    language: "japanese",
    sound: "r",
    explanation: "The Japanese 'r' is a sound between the English 'r', 'l', and 'd'. The tongue briefly touches the roof of the mouth.",
    example: "りんご (ringo - apple)"
  },
  {
    language: "chinese",
    sound: "Tones",
    explanation: "Mandarin Chinese has four tones: high level (1st), rising (2nd), falling-rising (3rd), falling (4th), plus neutral. The tone changes the meaning of a word.",
    example: "mā (mom), má (hemp), mǎ (horse), mà (scold)"
  },
  {
    language: "korean",
    sound: "ㄹ (rieul)",
    explanation: "The Korean ㄹ (rieul) sounds like 'r' at the beginning of a syllable and like 'l' at the end.",
    example: "라면 (ramyeon - ramen), 달 (dal - moon)"
  }
];

const defaultCulturalTips: CulturalTip[] = [
  {
    language: "spanish",
    title: "Greetings with Kisses",
    explanation: "In Spanish-speaking countries, it's common to greet friends with one or two kisses on the cheek, depending on the region."
  },
  {
    language: "french",
    title: "Tu vs Vous",
    explanation: "In French, 'tu' is the informal 'you', used with friends and family, while 'vous' is formal, used with strangers and superiors."
  },
  {
    language: "italian",
    title: "Aperitivo Culture",
    explanation: "In Italy, 'aperitivo' is a pre-dinner ritual where drinks are served with small snacks, often becoming a social event."
  },
  {
    language: "german",
    title: "Punctuality",
    explanation: "In German culture, punctuality is highly valued. Being late, even by a few minutes, can be considered disrespectful."
  },
  {
    language: "japanese",
    title: "Bowing",
    explanation: "In Japan, bowing is a common greeting. The depth and duration of the bow indicate the level of respect."
  },
  {
    language: "chinese",
    title: "Lucky Numbers",
    explanation: "In Chinese culture, 8 is a lucky number because it sounds like 'prosperity', while 4 is avoided because it sounds like 'death'."
  },
  {
    language: "korean",
    title: "Age Hierarchy",
    explanation: "Korean society places great importance on age hierarchy. People often ask age early in conversation to establish the proper level of speech."
  }
];

// Create context with default values
const LanguageTutorContext = createContext<LanguageTutorContextType | undefined>(undefined);

export const LanguageTutorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [translations] = useState<TranslationExample[]>(defaultTranslations);
  const [grammarRules] = useState<GrammarRule[]>(defaultGrammarRules);
  const [pronunciationTips] = useState<PronunciationTip[]>(defaultPronunciationTips);
  const [culturalTips] = useState<CulturalTip[]>(defaultCulturalTips);

  // In a real app, this would connect to translation APIs or databases
  const getTranslations = async (text: string, targetLanguage: string): Promise<string> => {
    const translation = translations.find(
      t => t.source.toLowerCase() === text.toLowerCase() && t.language.toLowerCase() === targetLanguage.toLowerCase()
    );
    
    return translation ? translation.target : `Translation not found for "${text}" in ${targetLanguage}`;
  };

  const getGrammarExplanation = async (concept: string, language: string): Promise<GrammarRule | null> => {
    return grammarRules.find(
      rule => rule.language.toLowerCase() === language.toLowerCase() && 
              rule.title.toLowerCase().includes(concept.toLowerCase())
    ) || null;
  };

  const getPronunciationHelp = async (sound: string, language: string): Promise<PronunciationTip | null> => {
    return pronunciationTips.find(
      tip => tip.language.toLowerCase() === language.toLowerCase() && 
             tip.sound.toLowerCase().includes(sound.toLowerCase())
    ) || null;
  };

  const getCulturalTips = async (language: string): Promise<CulturalTip[]> => {
    return culturalTips.filter(tip => tip.language.toLowerCase() === language.toLowerCase());
  };

  return (
    <LanguageTutorContext.Provider 
      value={{ 
        selectedLanguage,
        setSelectedLanguage,
        translations, 
        grammarRules, 
        pronunciationTips, 
        culturalTips,
        getTranslations,
        getGrammarExplanation,
        getPronunciationHelp,
        getCulturalTips
      }}
    >
      {children}
    </LanguageTutorContext.Provider>
  );
};

export const useLanguageTutor = () => {
  const context = useContext(LanguageTutorContext);
  if (context === undefined) {
    throw new Error('useLanguageTutor must be used within a LanguageTutorProvider');
  }
  return context;
};

export default LanguageTutorContext;
