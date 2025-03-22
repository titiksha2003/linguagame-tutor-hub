
export interface Language {
  id: string;
  name: string;
  flag: string;
  nativeName: string;
  description: string;
  learnerCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
}

export const languages: Language[] = [
  {
    id: "spanish",
    name: "Spanish",
    flag: "🇪🇸",
    nativeName: "Español",
    description: "Learn one of the world's most spoken languages, opening doors to connect with over 460 million native speakers across Spain and the Americas.",
    learnerCount: 34000000,
    difficulty: "easy",
    color: "#FF4B4B"
  },
  {
    id: "french",
    name: "French",
    flag: "🇫🇷",
    nativeName: "Français",
    description: "Master the language of love, art, and diplomacy spoken by over 275 million people worldwide.",
    learnerCount: 27000000,
    difficulty: "medium",
    color: "#58CC02"
  },
  {
    id: "japanese",
    name: "Japanese",
    flag: "🇯🇵",
    nativeName: "日本語",
    description: "Discover the language of Japan, unlocking a rich culture of anime, manga, and technology innovation.",
    learnerCount: 18000000,
    difficulty: "hard",
    color: "#CE82FF"
  },
  {
    id: "german",
    name: "German",
    flag: "🇩🇪",
    nativeName: "Deutsch",
    description: "Learn the language of philosophers, scientists, and Europe's largest economy.",
    learnerCount: 22000000,
    difficulty: "medium",
    color: "#FF9600"
  },
  {
    id: "italian",
    name: "Italian",
    flag: "🇮🇹",
    nativeName: "Italiano",
    description: "Immerse yourself in the language of food, art, and culture that shaped Western civilization.",
    learnerCount: 14000000,
    difficulty: "easy",
    color: "#FF4B4B"
  },
  {
    id: "portuguese",
    name: "Portuguese",
    flag: "🇵🇹",
    nativeName: "Português",
    description: "Learn the global language that connects Brazil, Portugal, and communities across four continents.",
    learnerCount: 9000000,
    difficulty: "medium",
    color: "#58CC02"
  },
  {
    id: "hindi",
    name: "Hindi",
    flag: "🇮🇳",
    nativeName: "हिन्दी",
    description: "Explore one of India's official languages spoken by over 600 million people worldwide.",
    learnerCount: 7000000,
    difficulty: "medium",
    color: "#CE82FF"
  },
  {
    id: "english",
    name: "English",
    flag: "🇬🇧",
    nativeName: "English",
    description: "Master the global lingua franca of business, science, and international communication.",
    learnerCount: 175000000,
    difficulty: "easy",
    color: "#FF9600"
  },
  {
    id: "korean",
    name: "Korean",
    flag: "🇰🇷",
    nativeName: "한국어",
    description: "Learn the language of K-pop, K-dramas, and a vibrant technological powerhouse.",
    learnerCount: 12000000,
    difficulty: "hard",
    color: "#FF4B4B"
  }
];
