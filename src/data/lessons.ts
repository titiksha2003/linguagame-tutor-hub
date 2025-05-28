export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  skillId: string;
  xpReward: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  position: { x: number; y: number };
  languageId: string;
  lessons: Lesson[];
  unlocks: string[];  // skill IDs that this skill unlocks
  requiredSkills: string[];  // skill IDs required to unlock this skill
}

// Spanish skills and lessons (keeping original)
export const spanishSkills: Skill[] = [
  {
    id: "spanish-basics",
    name: "Basics",
    description: "Learn essential Spanish phrases and basic vocabulary",
    level: "beginner",
    icon: "👋",
    position: { x: 50, y: 10 },
    languageId: "spanish",
    unlocks: ["spanish-phrases", "spanish-greetings"],
    requiredSkills: [],
    lessons: [
      {
        id: "spanish-intro",
        title: "Introduction & Alphabet",
        description: "Learn the Spanish alphabet, pronunciation basics, and introducing yourself.",
        level: "beginner",
        skillId: "spanish-basics",
        xpReward: 10,
        questions: [
          {
            id: "s-intro-q1",
            question: "What is the Spanish word for 'Hello'?",
            options: ["Hola", "Bonjour", "Ciao", "Hello"],
            correctAnswer: 0,
            hint: "It's the most common greeting in Spanish."
          },
          {
            id: "s-intro-q2",
            question: "Which of the following is a letter in the Spanish alphabet?",
            options: ["Ñ", "Ü", "Ł", "Đ"],
            correctAnswer: 0,
            hint: "This letter is unique to Spanish and sounds like 'ny'."
          },
          {
            id: "s-intro-q3",
            question: "How do you say 'My name is Maria' in Spanish?",
            options: ["Me llamo Maria", "Je m'appelle Maria", "Io sono Maria", "Ich heiße Maria"],
            correctAnswer: 0,
            hint: "'Me llamo' literally means 'I call myself.'"
          },
          {
            id: "s-intro-q4",
            question: "Choose the correct pronunciation for the letter 'J' in Spanish:",
            options: ["Like 'H' in 'hello'", "Like 'J' in 'jungle'", "Like 'S' in 'sun'", "Like 'Y' in 'yes'"],
            correctAnswer: 0,
            hint: "'José' is pronounced 'Hosé.'"
          },
          {
            id: "s-intro-q5",
            question: "What is the correct response to 'Hola'?",
            options: ["Hola", "Adiós", "Merci", "Guten Tag"],
            correctAnswer: 0,
            hint: "A greeting often mirrors the greeting given."
          }
        ]
      }
    ]
  },
  {
    id: "spanish-greetings",
    name: "Greetings",
    description: "Learn common greetings and expressions in Spanish",
    level: "beginner",
    icon: "🤝",
    position: { x: 30, y: 25 },
    languageId: "spanish",
    unlocks: ["spanish-numbers"],
    requiredSkills: ["spanish-basics"],
    lessons: [
      {
        id: "spanish-basic-greetings",
        title: "Basic Greetings & Expressions",
        description: "Learn common greetings, farewells, polite expressions like 'please,' 'thank you,' etc.",
        level: "beginner",
        skillId: "spanish-greetings",
        xpReward: 10,
        questions: [
          {
            id: "s-greet-q1",
            question: "How do you say 'Good morning' in Spanish?",
            options: ["Buenos días", "Buenas noches", "Buongiorno", "Guten Morgen"],
            correctAnswer: 0,
            hint: "'Días' means days."
          },
          {
            id: "s-greet-q2",
            question: "What does 'Gracias' mean?",
            options: ["Thank you", "Please", "Hello", "Goodbye"],
            correctAnswer: 0,
            hint: "You use this word when someone helps you."
          },
          {
            id: "s-greet-q3",
            question: "How do you say 'Please' in Spanish?",
            options: ["Por favor", "Danke", "S'il vous plaît", "Arigato"],
            correctAnswer: 0,
            hint: "Two words: 'For favor.'"
          },
          {
            id: "s-greet-q4",
            question: "What is the polite way to say 'You're welcome' in Spanish?",
            options: ["De nada", "Bienvenido", "Ciao", "Gracias"],
            correctAnswer: 0,
            hint: "Literally means 'It's nothing.'"
          },
          {
            id: "s-greet-q5",
            question: "How do you say 'Goodbye' in Spanish?",
            options: ["Adiós", "Au revoir", "Sayonara", "Tschüss"],
            correctAnswer: 0,
            hint: "Used when parting ways."
          }
        ]
      }
    ]
  },
  {
    id: "spanish-phrases",
    name: "Phrases",
    description: "Learn useful everyday phrases in Spanish",
    level: "beginner",
    icon: "💬",
    position: { x: 70, y: 25 },
    languageId: "spanish",
    unlocks: ["spanish-numbers"],
    requiredSkills: ["spanish-basics"],
    lessons: [
      {
        id: "spanish-common-phrases",
        title: "Common Phrases",
        description: "Learn useful everyday Spanish phrases",
        level: "beginner",
        skillId: "spanish-phrases",
        xpReward: 10,
        questions: [
          {
            id: "s-phrase-q1",
            question: "How do you say 'I don't understand' in Spanish?",
            options: ["No entiendo", "No hablo", "No sé", "No quiero"],
            correctAnswer: 0,
            hint: "From the verb 'entender' (to understand)"
          },
          {
            id: "s-phrase-q2",
            question: "What does 'Por supuesto' mean?",
            options: ["Of course", "Maybe", "Sometimes", "Never"],
            correctAnswer: 0,
            hint: "It's a strong affirmative expression."
          },
          {
            id: "s-phrase-q3",
            question: "How do you ask 'Where is the bathroom?' in Spanish?",
            options: ["¿Dónde está el baño?", "¿Qué hora es?", "¿Cómo estás?", "¿Cuánto cuesta?"],
            correctAnswer: 0,
            hint: "'Dónde' means 'where' and 'baño' means 'bathroom'"
          },
          {
            id: "s-phrase-q4",
            question: "What does '¿Cómo estás?' mean?",
            options: ["How are you?", "What is your name?", "Where are you from?", "How old are you?"],
            correctAnswer: 0,
            hint: "A common greeting asking about someone's state."
          },
          {
            id: "s-phrase-q5",
            question: "How do you say 'I'm sorry' in Spanish?",
            options: ["Lo siento", "Perdón", "Disculpe", "All of the above"],
            correctAnswer: 3,
            hint: "All three expressions can be used to apologize."
          }
        ]
      }
    ]
  },
  {
    id: "spanish-numbers",
    name: "Numbers",
    description: "Learn to count and use numbers in Spanish",
    level: "beginner",
    icon: "🔢",
    position: { x: 50, y: 40 },
    languageId: "spanish",
    unlocks: ["spanish-family", "spanish-food"],
    requiredSkills: ["spanish-greetings", "spanish-phrases"],
    lessons: [
      {
        id: "spanish-numbers-dates",
        title: "Numbers, Dates & Time",
        description: "Learn numbers 1–100, telling time, days of the week, months, and talking about dates.",
        level: "beginner",
        skillId: "spanish-numbers",
        xpReward: 10,
        questions: [
          {
            id: "s-num-q1",
            question: "What is 'one' in Spanish?",
            options: ["Uno", "Un", "Eins", "Ichi"],
            correctAnswer: 0,
            hint: "Sounds like 'uno' in card games."
          },
          {
            id: "s-num-q2",
            question: "How do you say 'ten' in Spanish?",
            options: ["Diez", "Deci", "Ten", "Zehn"],
            correctAnswer: 0,
            hint: "Common in countdowns."
          },
          {
            id: "s-num-q3",
            question: "What day of the week is 'miércoles'?",
            options: ["Wednesday", "Monday", "Friday", "Sunday"],
            correctAnswer: 0,
            hint: "It's the middle of the week."
          },
          {
            id: "s-num-q4",
            question: "How do you ask 'What time is it?' in Spanish?",
            options: ["¿Qué hora es?", "¿Dónde estás?", "¿Qué día es?", "¿Qué tiempo hace?"],
            correctAnswer: 0,
            hint: "Think 'hour.'"
          },
          {
            id: "s-num-q5",
            question: "What is 'January' in Spanish?",
            options: ["Enero", "Julio", "Junio", "Decembre"],
            correctAnswer: 0,
            hint: "First month of the year."
          }
        ]
      }
    ]
  },
  {
    id: "spanish-family",
    name: "Family",
    description: "Learn vocabulary related to family members and relationships",
    level: "beginner",
    icon: "👪",
    position: { x: 30, y: 55 },
    languageId: "spanish",
    unlocks: ["spanish-checkpoint-1"],
    requiredSkills: ["spanish-numbers"],
    lessons: [
      {
        id: "spanish-family-relations",
        title: "Family & Relationships",
        description: "Learn vocabulary for family members and relationships in Spanish",
        level: "beginner",
        skillId: "spanish-family",
        xpReward: 10,
        questions: [
          {
            id: "s-fam-q1",
            question: "What is the Spanish word for 'mother'?",
            options: ["Madre", "Padre", "Hermana", "Tía"],
            correctAnswer: 0,
            hint: "This is a common word used for mom."
          },
          {
            id: "s-fam-q2",
            question: "How do you say 'brother' in Spanish?",
            options: ["Hermano", "Primo", "Tío", "Sobrino"],
            correctAnswer: 0,
            hint: "It starts with an H, just like in English."
          },
          {
            id: "s-fam-q3",
            question: "What does 'Estoy casado' mean?",
            options: ["I am married", "I am tired", "I am happy", "I am single"],
            correctAnswer: 0,
            hint: "'Casado' means married."
          },
          {
            id: "s-fam-q4",
            question: "What is the word for 'uncle' in Spanish?",
            options: ["Tío", "Abuelo", "Hermano", "Primo"],
            correctAnswer: 0,
            hint: "This is your parent's brother."
          },
          {
            id: "s-fam-q5",
            question: "How do you say 'My sister's name is Ana'?",
            options: ["Mi hermana se llama Ana", "Ana es mi hermana", "Me llamo Ana", "Hermana mi Ana"],
            correctAnswer: 0,
            hint: "This structure means 'My [relation] is called...'"
          }
        ]
      }
    ]
  },
  {
    id: "spanish-food",
    name: "Food",
    description: "Learn vocabulary related to food, drinks, and dining",
    level: "beginner",
    icon: "🍽️",
    position: { x: 70, y: 55 },
    languageId: "spanish",
    unlocks: ["spanish-checkpoint-1"],
    requiredSkills: ["spanish-numbers"],
    lessons: [
      {
        id: "spanish-food-dining",
        title: "Food & Dining",
        description: "Learn vocabulary related to food, restaurants, and eating in Spanish",
        level: "beginner",
        skillId: "spanish-food",
        xpReward: 10,
        questions: [
          {
            id: "s-food-q1",
            question: "What does 'comida' mean?",
            options: ["Food", "Drink", "Snack", "Fruit"],
            correctAnswer: 0,
            hint: "You eat this every day."
          },
          {
            id: "s-food-q2",
            question: "How do you say 'I like apples' in Spanish?",
            options: ["Me gustan las manzanas", "Me gusta manzanas", "Yo gusta manzanas", "Yo gustan manzanas"],
            correctAnswer: 0,
            hint: "Pay attention to singular/plural form."
          },
          {
            id: "s-food-q3",
            question: "What is 'restaurante'?",
            options: ["Restaurant", "Grocery store", "Market", "Café"],
            correctAnswer: 0,
            hint: "Think where people eat food outside."
          },
          {
            id: "s-food-q4",
            question: "Which of these means 'I am hungry'?",
            options: ["Tengo hambre", "Estoy sed", "Estoy hambre", "Tengo sed"],
            correctAnswer: 0,
            hint: "Literal translation is 'I have hunger'."
          },
          {
            id: "s-food-q5",
            question: "How would you say 'Can I see the menu, please?'",
            options: ["¿Puedo ver el menú, por favor?", "¿Tienes la carta?", "¿Dónde está la comida?", "¿Puedo comer el menú?"],
            correctAnswer: 0,
            hint: "It's a polite question to a waiter."
          }
        ]
      }
    ]
  },
  {
    id: "spanish-checkpoint-1",
    name: "Checkpoint",
    description: "Test your knowledge of basic Spanish",
    level: "beginner",
    icon: "🏁",
    position: { x: 50, y: 70 },
    languageId: "spanish",
    unlocks: [],
    requiredSkills: ["spanish-family", "spanish-food"],
    lessons: [
      {
        id: "spanish-checkpoint-1-test",
        title: "Beginner Checkpoint",
        description: "Test your knowledge of basic Spanish vocabulary and phrases",
        level: "beginner",
        skillId: "spanish-checkpoint-1",
        xpReward: 20,
        questions: [
          {
            id: "s-check-q1",
            question: "How do you introduce yourself in Spanish?",
            options: ["Me llamo...", "Je m'appelle...", "Mi nombre es...", "Both A and C"],
            correctAnswer: 3,
            hint: "There are multiple ways to say this in Spanish."
          },
          {
            id: "s-check-q2",
            question: "What is the correct translation of 'I have two brothers and one sister'?",
            options: ["Tengo dos hermanos y una hermana", "Yo tengo dos hermanos y uno hermana", "Tengo dos hermano y una hermana", "Yo tiene dos hermanos y una hermana"],
            correctAnswer: 0,
            hint: "Pay attention to numbers and gender agreement."
          },
          {
            id: "s-check-q3",
            question: "How would you order food in a restaurant?",
            options: ["Quisiera..., por favor", "Yo quiero...", "Dame...", "All of the above"],
            correctAnswer: 3,
            hint: "All are valid ways to order, with varying levels of politeness."
          },
          {
            id: "s-check-q4",
            question: "How do you say 'The restaurant is open from Monday to Friday'?",
            options: ["El restaurante está abierto de lunes a viernes", "El restaurante es abierto desde lunes hasta viernes", "El restaurante abre lunes a viernes", "El restaurante está abierto lunes por viernes"],
            correctAnswer: 0,
            hint: "'De... a...' means 'from... to...'"
          },
          {
            id: "s-check-q5",
            question: "What is the correct way to say '45 minutes past 6'?",
            options: ["Las seis y cuarenta y cinco", "Seis y cuarenta y cinco", "Cuarenta y cinco después de seis", "Las seis cuarenta y cinco"],
            correctAnswer: 0,
            hint: "In Spanish time, 'y' is used for minutes past the hour."
          }
        ]
      }
    ]
  }
];

// German skills with German questions
export const germanSkills: Skill[] = [
  {
    id: "german-basics",
    name: "Basics",
    description: "Learn essential German phrases and basic vocabulary",
    level: "beginner",
    icon: "👋",
    position: { x: 50, y: 10 },
    languageId: "german",
    unlocks: ["german-phrases", "german-greetings"],
    requiredSkills: [],
    lessons: [
      {
        id: "german-intro",
        title: "Introduction & Alphabet",
        description: "Learn the German alphabet, pronunciation basics, and introducing yourself.",
        level: "beginner",
        skillId: "german-basics",
        xpReward: 10,
        questions: [
          {
            id: "g-intro-q1",
            question: "What is the German word for 'Hello'?",
            options: ["Hallo", "Bonjour", "Ciao", "Hello"],
            correctAnswer: 0,
            hint: "Es ist die gebräuchlichste Begrüßung auf Deutsch."
          },
          {
            id: "g-intro-q2",
            question: "Which of the following is a letter in the German alphabet?",
            options: ["Ñ", "Ü", "Ł", "Đ"],
            correctAnswer: 1,
            hint: "Dieser Buchstabe kommt auch im Deutschen vor."
          },
          {
            id: "g-intro-q3",
            question: "How do you say 'My name is Maria' in German?",
            options: ["Me llamo Maria", "Je m'appelle Maria", "Ich heiße Maria", "Io sono Maria"],
            correctAnswer: 2,
            hint: "'Ich heiße' bedeutet wörtlich 'ich heiße'."
          },
          {
            id: "g-intro-q4",
            question: "Choose the correct pronunciation for the letter 'J' in German:",
            options: ["Like 'H' in 'hello'", "Like 'J' in 'jungle'", "Like 'S' in 'sun'", "Like 'Y' in 'yes'"],
            correctAnswer: 1,
            hint: "'Ja' wird wie 'ya' ausgesprochen."
          },
          {
            id: "g-intro-q5",
            question: "What is the correct response to 'Hallo'?",
            options: ["Hallo", "Auf Wiedersehen", "Danke", "Guten Tag"],
            correctAnswer: 0,
            hint: "Eine Begrüßung spiegelt oft die gegebene Begrüßung wider."
          }
        ]
      }
    ]
  },
  {
    id: "german-greetings",
    name: "Greetings",
    description: "Learn common greetings and expressions in German",
    level: "beginner",
    icon: "🤝",
    position: { x: 30, y: 25 },
    languageId: "german",
    unlocks: ["german-numbers"],
    requiredSkills: ["german-basics"],
    lessons: [
      {
        id: "german-basic-greetings",
        title: "Basic Greetings & Expressions",
        description: "Learn common greetings, farewells, polite expressions like 'please,' 'thank you,' etc.",
        level: "beginner",
        skillId: "german-greetings",
        xpReward: 10,
        questions: [
          {
            id: "g-greet-q1",
            question: "How do you say 'Good morning' in German?",
            options: ["Buenos días", "Buenas noches", "Buongiorno", "Guten Morgen"],
            correctAnswer: 3,
            hint: "'Morgen' bedeutet Morgen."
          },
          {
            id: "g-greet-q2",
            question: "What does 'Danke' mean?",
            options: ["Thank you", "Please", "Hello", "Goodbye"],
            correctAnswer: 0,
            hint: "Sie verwenden dieses Wort, wenn Ihnen jemand hilft."
          },
          {
            id: "g-greet-q3",
            question: "How do you say 'Please' in German?",
            options: ["Por favor", "Bitte", "S'il vous plaît", "Arigato"],
            correctAnswer: 1,
            hint: "Ein Wort: 'Bitte'."
          },
          {
            id: "g-greet-q4",
            question: "What is the polite way to say 'You're welcome' in German?",
            options: ["De nada", "Gern geschehen", "Ciao", "Gracias"],
            correctAnswer: 1,
            hint: "Bedeutet wörtlich 'Gerne geschehen'."
          },
          {
            id: "g-greet-q5",
            question: "How do you say 'Goodbye' in German?",
            options: ["Adiós", "Au revoir", "Sayonara", "Auf Wiedersehen"],
            correctAnswer: 3,
            hint: "Wird beim Abschied verwendet."
          }
        ]
      }
    ]
  },
  {
    id: "german-phrases",
    name: "Phrases",
    description: "Learn useful everyday phrases in German",
    level: "beginner",
    icon: "💬",
    position: { x: 70, y: 25 },
    languageId: "german",
    unlocks: ["german-numbers"],
    requiredSkills: ["german-basics"],
    lessons: [
      {
        id: "german-common-phrases",
        title: "Common Phrases",
        description: "Learn useful everyday German phrases",
        level: "beginner",
        skillId: "german-phrases",
        xpReward: 10,
        questions: [
          {
            id: "g-phrase-q1",
            question: "How do you say 'I don't understand' in German?",
            options: ["Ich verstehe nicht", "Ich spreche nicht", "Ich weiß nicht", "Ich will nicht"],
            correctAnswer: 0,
            hint: "From the verb 'verstehen' (to understand)"
          },
          {
            id: "g-phrase-q2",
            question: "What does 'Natürlich' mean?",
            options: ["Of course", "Maybe", "Sometimes", "Never"],
            correctAnswer: 0,
            hint: "It's a strong affirmative expression."
          },
          {
            id: "g-phrase-q3",
            question: "How do you ask 'Where is the bathroom?' in German?",
            options: ["Wo ist das Badezimmer?", "Wie spät ist es?", "Wie geht es dir?", "Wie viel kostet das?"],
            correctAnswer: 0,
            hint: "'Wo' means 'where' and 'Badezimmer' means 'bathroom'"
          },
          {
            id: "g-phrase-q4",
            question: "What does 'Wie geht es dir?' mean?",
            options: ["How are you?", "What is your name?", "Where are you from?", "How old are you?"],
            correctAnswer: 0,
            hint: "A common greeting asking about someone's state."
          },
          {
            id: "g-phrase-q5",
            question: "How do you say 'I'm sorry' in German?",
            options: ["Es tut mir leid", "Entschuldigung", "Verzeihung", "All of the above"],
            correctAnswer: 3,
            hint: "All three expressions can be used to apologize."
          }
        ]
      }
    ]
  },
  {
    id: "german-numbers",
    name: "Numbers",
    description: "Learn to count and use numbers in German",
    level: "beginner",
    icon: "🔢",
    position: { x: 50, y: 40 },
    languageId: "german",
    unlocks: ["german-family", "german-food"],
    requiredSkills: ["german-greetings", "german-phrases"],
    lessons: [
      {
        id: "german-numbers-dates",
        title: "Numbers, Dates & Time",
        description: "Learn numbers 1–100, telling time, days of the week, months, and talking about dates.",
        level: "beginner",
        skillId: "german-numbers",
        xpReward: 10,
        questions: [
          {
            id: "g-num-q1",
            question: "What is 'one' in German?",
            options: ["Uno", "Un", "Eins", "Ichi"],
            correctAnswer: 2,
            hint: "Klingt ähnlich wie 'eins'."
          },
          {
            id: "g-num-q2",
            question: "How do you say 'ten' in German?",
            options: ["Diez", "Deci", "Ten", "Zehn"],
            correctAnswer: 3,
            hint: "Häufig bei Countdowns."
          },
          {
            id: "g-num-q3",
            question: "What day of the week is 'Mittwoch'?",
            options: ["Wednesday", "Monday", "Friday", "Sunday"],
            correctAnswer: 0,
            hint: "Es ist die Mitte der Woche."
          },
          {
            id: "g-num-q4",
            question: "How do you ask 'What time is it?' in German?",
            options: ["¿Qué hora es?", "¿Dónde estás?", "¿Qué día es?", "Wie spät ist es?"],
            correctAnswer: 3,
            hint: "Denken Sie an 'Uhrzeit'."
          },
          {
            id: "g-num-q5",
            question: "What is 'January' in German?",
            options: ["Enero", "Julio", "Januar", "Dezember"],
            correctAnswer: 2,
            hint: "Erster Monat des Jahres."
          }
        ]
      }
    ]
  },
  {
    id: "german-family",
    name: "Family",
    description: "Learn vocabulary related to family members and relationships",
    level: "beginner",
    icon: "👪",
    position: { x: 30, y: 55 },
    languageId: "german",
    unlocks: ["german-checkpoint-1"],
    requiredSkills: ["german-numbers"],
    lessons: [
      {
        id: "german-family-relations",
        title: "Family & Relationships",
        description: "Learn vocabulary for family members and relationships in German",
        level: "beginner",
        skillId: "german-family",
        xpReward: 10,
        questions: [
          {
            id: "g-fam-q1",
            question: "What is the German word for 'mother'?",
            options: ["Madre", "Vater", "Schwester", "Mutter"],
            correctAnswer: 3,
            hint: "Dies ist ein gebräuchliches Wort für Mutter."
          },
          {
            id: "g-fam-q2",
            question: "How do you say 'brother' in German?",
            options: ["Hermano", "Primo", "Bruder", "Sobrino"],
            correctAnswer: 2,
            hint: "Es beginnt mit einem B."
          },
          {
            id: "g-fam-q3",
            question: "What does 'Ich bin verheiratet' mean?",
            options: ["I am married", "I am tired", "I am happy", "I am single"],
            correctAnswer: 0,
            hint: "'Verheiratet' bedeutet verheiratet."
          },
          {
            id: "g-fam-q4",
            question: "What is the word for 'uncle' in German?",
            options: ["Onkel", "Großvater", "Bruder", "Cousin"],
            correctAnswer: 0,
            hint: "Dies ist der Bruder Ihrer Eltern."
          },
          {
            id: "g-fam-q5",
            question: "How do you say 'My sister's name is Ana'?",
            options: ["Mi hermana se llama Ana", "Ana es mi hermana", "Meine Schwester heißt Ana", "Hermana mi Ana"],
            correctAnswer: 2,
            hint: "Diese Struktur bedeutet 'Meine [Beziehung] heißt...'."
          }
        ]
      }
    ]
  },
  {
    id: "german-food",
    name: "Food",
    description: "Learn vocabulary related to food, drinks, and dining",
    level: "beginner",
    icon: "🍽️",
    position: { x: 70, y: 55 },
    languageId: "german",
    unlocks: ["german-checkpoint-1"],
    requiredSkills: ["german-numbers"],
    lessons: [
      {
        id: "german-food-dining",
        title: "Food & Dining",
        description: "Learn vocabulary related to food, restaurants, and eating in German",
        level: "beginner",
        skillId: "german-food",
        xpReward: 10,
        questions: [
          {
            id: "g-food-q1",
            question: "What does 'Essen' mean?",
            options: ["Drink", "Snack", "Food", "Fruit"],
            correctAnswer: 2,
            hint: "Das isst man jeden Tag."
          },
          {
            id: "g-food-q2",
            question: "How do you say 'I like apples' in German?",
            options: ["Mir schmeckt Äpfel", "Mir schmecken Äpfel", "Ich mag Äpfel", "Ich schmecken Äpfel"],
            correctAnswer: 1,
            hint: "Achten Sie auf die Singular-/Pluralform."
          },
          {
            id: "g-food-q3",
            question: "What is 'Restaurant'?",
            options: ["Grocery store", "Market", "Restaurant", "Café"],
            correctAnswer: 2,
            hint: "Denken Sie daran, wo Leute außerhalb essen."
          },
          {
            id: "g-food-q4",
            question: "Which of these means 'I am hungry'?",
            options: ["Ich bin durstig", "Ich habe Hunger", "Ich bin Hunger", "Ich habe Durst"],
            correctAnswer: 1,
            hint: "Wörtliche Übersetzung ist 'Ich habe Hunger'."
          },
          {
            id: "g-food-q5",
            question: "How would you say 'Can I see the menu, please?'",
            options: ["Kann ich die Speisekarte sehen, bitte?", "Haben Sie die Karte?", "Wo ist das Essen?", "Kann ich die Speisekarte essen?"],
            correctAnswer: 0,
            hint: "Es ist eine höfliche Frage an einen Kellner."
          }
        ]
      }
    ]
  },
  {
    id: "german-checkpoint-1",
    name: "Checkpoint",
    description: "Test your knowledge of basic German",
    level: "beginner",
    icon: "🏁",
    position: { x: 50, y: 70 },
    languageId: "german",
    unlocks: [],
    requiredSkills: ["german-family", "german-food"],
    lessons: [
      {
        id: "german-checkpoint-1-test",
        title: "Beginner Checkpoint",
        description: "Test your knowledge of basic German vocabulary and phrases",
        level: "beginner",
        skillId: "german-checkpoint-1",
        xpReward: 20,
        questions: [
          {
            id: "g-check-q1",
            question: "How do you introduce yourself in German?",
            options: ["Ich heiße...", "Je m'appelle...", "Mein Name ist...", "Both A and C"],
            correctAnswer: 3,
            hint: "There are multiple ways to say this in German."
          },
          {
            id: "g-check-q2",
            question: "What is the correct translation of 'I have two brothers and one sister'?",
            options: ["Ich habe zwei Brüder und eine Schwester", "Ich haben zwei Brüder und eine Schwester", "Ich habe zwei Bruder und eine Schwester", "Ich hat zwei Brüder und eine Schwester"],
            correctAnswer: 0,
            hint: "Pay attention to numbers and gender agreement."
          },
          {
            id: "g-check-q3",
            question: "How would you order food in a restaurant?",
            options: ["Ich hätte gerne..., bitte", "Ich will...", "Gib mir...", "All of the above"],
            correctAnswer: 3,
            hint: "All are valid ways to order, with varying levels of politeness."
          },
          {
            id: "g-check-q4",
            question: "How do you say 'The restaurant is open from Monday to Friday'?",
            options: ["Das Restaurant ist von Montag bis Freitag geöffnet", "Das Restaurant ist offen seit Montag bis Freitag", "Das Restaurant öffnet Montag bis Freitag", "Das Restaurant ist geöffnet Montag für Freitag"],
            correctAnswer: 0,
            hint: "'Von... bis...' means 'from... to...'"
          },
          {
            id: "g-check-q5",
            question: "What is the correct way to say '45 minutes past 6'?",
            options: ["Sechs Uhr fünfundvierzig", "Sechs und fünfundvierzig", "Fünfundvierzig nach sechs", "Sechs fünfundvierzig"],
            correctAnswer: 0,
            hint: "In German time, full minutes are often stated with 'Uhr'."
          }
        ]
      }
    ]
  }
];

// French skills with French questions
export const frenchSkills: Skill[] = [
  {
    id: "french-basics",
    name: "Basics",
    description: "Learn essential French phrases and basic vocabulary",
    level: "beginner",
    icon: "👋",
    position: { x: 50, y: 10 },
    languageId: "french",
    unlocks: ["french-phrases", "french-greetings"],
    requiredSkills: [],
    lessons: [
      {
        id: "french-intro",
        title: "Introduction & Alphabet",
        description: "Learn the French alphabet, pronunciation basics, and introducing yourself.",
        level: "beginner",
        skillId: "french-basics",
        xpReward: 10,
        questions: [
          {
            id: "f-intro-q1",
            question: "What is the French word for 'Hello'?",
            options: ["Hola", "Bonjour", "Ciao", "Hello"],
            correctAnswer: 1,
            hint: "C'est la salutation la plus courante en français."
          },
          {
            id: "f-intro-q2",
            question: "Which of the following is a letter in the French alphabet?",
            options: ["Ñ", "Ü", "Ł", "A"],
            correctAnswer: 3,
            hint: "Cette lettre est fondamentale en français."
          },
          {
            id: "f-intro-q3",
            question: "How do you say 'My name is Maria' in French?",
            options: ["Me llamo Maria", "Je m'appelle Maria", "Io sono Maria", "Ich heiße Maria"],
            correctAnswer: 1,
            hint: "'Je m'appelle' signifie littéralement 'je m'appelle'."
          },
          {
            id: "f-intro-q4",
            question: "Choose the correct pronunciation for the letter 'J' in French:",
            options: ["Like 'H' in 'hello'", "Like 'J' in 'jungle'", "Like 'S' in 'sun'", "Like 'Y' in 'yes'"],
            correctAnswer: 1,
            hint: "'Journal' est prononcé avec le son 'J' doux."
          },
          {
            id: "f-intro-q5",
            question: "What is the correct response to 'Bonjour'?",
            options: ["Bonjour", "Adiós", "Merci", "Guten Tag"],
            correctAnswer: 0,
            hint: "Une salutation reflète souvent la salutation donnée."
          }
        ]
      }
    ]
  },
  {
    id: "french-greetings",
    name: "Greetings",
    description: "Learn common greetings and expressions in French",
    level: "beginner",
    icon: "🤝",
    position: { x: 30, y: 25 },
    languageId: "french",
    unlocks: ["french-numbers"],
    requiredSkills: ["french-basics"],
    lessons: [
      {
        id: "french-basic-greetings",
        title: "Basic Greetings & Expressions",
        description: "Learn common greetings, farewells, polite expressions like 'please,' 'thank you,' etc.",
        level: "beginner",
        skillId: "french-greetings",
        xpReward: 10,
        questions: [
          {
            id: "f-greet-q1",
            question: "How do you say 'Good morning' in French?",
            options: ["Buenos días", "Buenas noches", "Buongiorno", "Bonjour"],
            correctAnswer: 3,
            hint: "C'est aussi utilisé pour 'bonjour'."
          },
          {
            id: "f-greet-q2",
            question: "What does 'Merci' mean?",
            options: ["Thank you", "Please", "Hello", "Goodbye"],
            correctAnswer: 0,
            hint: "Vous utilisez ce mot quand quelqu'un vous aide."
          },
          {
            id: "f-greet-q3",
            question: "How do you say 'Please' in French?",
            options: ["Por favor", "Danke", "S'il vous plaît", "Arigato"],
            correctAnswer: 2,
            hint: "Trois mots : 'S'il vous plaît'."
          },
          {
            id: "f-greet-q4",
            question: "What is the polite way to say 'You're welcome' in French?",
            options: ["De nada", "De rien", "Ciao", "Gracias"],
            correctAnswer: 1,
            hint: "Signifie littéralement 'ce n'est rien'."
          },
          {
            id: "f-greet-q5",
            question: "How do you say 'Goodbye' in French?",
            options: ["Adiós", "Au revoir", "Sayonara", "Tschüss"],
            correctAnswer: 1,
            hint: "Utilisé quand on se quitte."
          }
        ]
      }
    ]
  },
  {
    id: "french-phrases",
    name: "Phrases",
    description: "Learn useful everyday phrases in French",
    level: "beginner",
    icon: "💬",
    position: { x: 70, y: 25 },
    languageId: "french",
    unlocks: ["french-numbers"],
    requiredSkills: ["french-basics"],
    lessons: [
      {
        id: "french-common-phrases",
        title: "Common Phrases",
        description: "Learn useful everyday French phrases",
        level: "beginner",
        skillId: "french-phrases",
        xpReward: 10,
        questions: [
          {
            id: "f-phrase-q1",
            question: "How do you say 'I don't understand' in French?",
            options: ["Je ne comprends pas", "Je ne parle pas", "Je ne sais pas", "Je ne veux pas"],
            correctAnswer: 0,
            hint: "From the verb 'comprendre' (to understand)"
          },
          {
            id: "f-phrase-q2",
            question: "What does 'Bien sûr' mean?",
            options: ["Of course", "Maybe", "Sometimes", "Never"],
            correctAnswer: 0,
            hint: "It's a strong affirmative expression."
          },
          {
            id: "f-phrase-q3",
            question: "How do you ask 'Where is the bathroom?' in French?",
            options: ["Où sont les toilettes?", "Quelle heure est-il?", "Comment allez-vous?", "Combien ça coûte?"],
            correctAnswer: 0,
            hint: "'Où' means 'where' and 'toilettes' means 'bathroom'"
          },
          {
            id: "f-phrase-q4",
            question: "What does 'Comment ça va?' mean?",
            options: ["How are you?", "What is your name?", "Where are you from?", "How old are you?"],
            correctAnswer: 0,
            hint: "A common greeting asking about someone's state."
          },
          {
            id: "f-phrase-q5",
            question: "How do you say 'I'm sorry' in French?",
            options: ["Je suis désolé(e)", "Pardon", "Excusez-moi", "All of the above"],
            correctAnswer: 3,
            hint: "All three expressions can be used to apologize."
          }
        ]
      }
    ]
  },
  {
    id: "french-numbers",
    name: "Numbers",
    description: "Learn to count and use numbers in French",
    level: "beginner",
    icon: "🔢",
    position: { x: 50, y: 40 },
    languageId: "french",
    unlocks: ["french-family", "french-food"],
    requiredSkills: ["french-greetings", "french-phrases"],
    lessons: [
      {
        id: "french-numbers-dates",
        title: "Numbers, Dates & Time",
        description: "Learn numbers 1–100, telling time, days of the week, months, and talking about dates.",
        level: "beginner",
        skillId: "french-numbers",
        xpReward: 10,
        questions: [
          {
            id: "f-num-q1",
            question: "What is 'one' in French?",
            options: ["Uno", "Un", "Eins", "Ichi"],
            correctAnswer: 1,
            hint: "Le mot pour le chiffre un."
          },
          {
            id: "f-num-q2",
            question: "How do you say 'ten' in French?",
            options: ["Diez", "Deci", "Dix", "Zehn"],
            correctAnswer: 2,
            hint: "Courant dans les décomptes."
          },
          {
            id: "f-num-q3",
            question: "What day of the week is 'mercredi'?",
            options: ["Wednesday", "Monday", "Friday", "Sunday"],
            correctAnswer: 0,
            hint: "C'est le milieu de la semaine."
          },
          {
            id: "f-num-q4",
            question: "How do you ask 'What time is it?' in French?",
            options: ["¿Qué hora es?", "¿Dónde estás?", "Quelle heure est-il ?", "¿Qué tiempo hace?"],
            correctAnswer: 2,
            hint: "Pensez 'heure'."
          },
          {
            id: "f-num-q5",
            question: "What is 'January' in French?",
            options: ["Enero", "Juillet", "Janvier", "Décembre"],
            correctAnswer: 2,
            hint: "Premier mois de l'année."
          }
        ]
      }
    ]
  },
  {
    id: "french-family",
    name: "Family",
    description: "Learn vocabulary related to family members and relationships",
    level: "beginner",
    icon: "👪",
    position: { x: 30, y: 55 },
    languageId: "french",
    unlocks: ["french-checkpoint-1"],
    requiredSkills: ["french-numbers"],
    lessons: [
      {
        id: "french-family-relations",
        title: "Family & Relationships",
        description: "Learn vocabulary for family members and relationships in French",
        level: "beginner",
        skillId: "french-family",
        xpReward: 10,
        questions: [
          {
            id: "f-fam-q1",
            question: "What is the French word for 'mother'?",
            options: ["Madre", "Père", "Sœur", "Mère"],
            correctAnswer: 3,
            hint: "C'est un mot courant pour maman."
          },
          {
            id: "f-fam-q2",
            question: "How do you say 'brother' in French?",
            options: ["Hermano", "Cousin", "Frère", "Neveu"],
            correctAnswer: 2,
            hint: "Ça commence par un F."
          },
          {
            id: "f-fam-q3",
            question: "What does 'Je suis marié(e)' mean?",
            options: ["I am married", "I am tired", "I am happy", "I am single"],
            correctAnswer: 0,
            hint: "'Marié(e)' signifie marié(e)."
          },
          {
            id: "f-fam-q4",
            question: "What is the word for 'uncle' in French?",
            options: ["Oncle", "Grand-père", "Frère", "Cousin"],
            correctAnswer: 0,
            hint: "C'est le frère de vos parents."
          },
          {
            id: "f-fam-q5",
            question: "How do you say 'My sister's name is Ana'?",
            options: ["Mi hermana se llama Ana", "Ana es mi hermana", "Ma sœur s'appelle Ana", "Hermana mi Ana"],
            correctAnswer: 2,
            hint: "Cette structure signifie 'Ma [relation] s'appelle...'."
          }
        ]
      }
    ]
  },
  {
    id: "french-food",
    name: "Food",
    description: "Learn vocabulary related to food, drinks, and dining",
    level: "beginner",
    icon: "🍽️",
    position: { x: 70, y: 55 },
    languageId: "french",
    unlocks: ["french-checkpoint-1"],
    requiredSkills: ["french-numbers"],
    lessons: [
      {
        id: "french-food-dining",
        title: "Food & Dining",
        description: "Learn vocabulary related to food, restaurants, and eating in French",
        level: "beginner",
        skillId: "french-food",
        xpReward: 10,
        questions: [
          {
            id: "f-food-q1",
            question: "What does 'nourriture' mean?",
            options: ["Boisson", "Collation", "Food", "Fruit"],
            correctAnswer: 2,
            hint: "Vous mangez cela tous les jours."
          },
          {
            id: "f-food-q2",
            question: "How do you say 'I like apples' in French?",
            options: ["J'aime pomme", "J'aime les pommes", "Moi aime pommes", "Moi aiment pommes"],
            correctAnswer: 1,
            hint: "Faites attention à la forme singulier/pluriel."
          },
          {
            id: "f-food-q3",
            question: "What is 'restaurant'?",
            options: ["Épicerie", "Marché", "Restaurant", "Café"],
            correctAnswer: 2,
            hint: "Pensez à l'endroit où les gens mangent dehors."
          },
          {
            id: "f-food-q4",
            question: "Which of these means 'I am hungry'?",
            options: ["J'ai soif", "J'ai faim", "Je suis faim", "J'ai soif"],
            correctAnswer: 1,
            hint: "La traduction littérale est 'J'ai faim'."
          },
          {
            id: "f-food-q5",
            question: "How would you say 'Can I see the menu, please?'",
            options: ["Puis-je voir le menu, s'il vous plaît ?", "Avez-vous la carte ?", "Où est la nourriture ?", "Puis-je manger le menu ?"],
            correctAnswer: 0,
            hint: "C'est une question polie à un serveur."
          }
        ]
      }
    ]
  },
  {
    id: "french-checkpoint-1",
    name: "Checkpoint",
    description: "Test your knowledge of basic French",
    level: "beginner",
    icon: "🏁",
    position: { x: 50, y: 70 },
    languageId: "french",
    unlocks: [],
    requiredSkills: ["french-family", "french-food"],
    lessons: [
      {
        id: "french-checkpoint-1-test",
        title: "Beginner Checkpoint",
        description: "Test your knowledge of basic French vocabulary and phrases",
        level: "beginner",
        skillId: "french-checkpoint-1",
        xpReward: 20,
        questions: [
          {
            id: "f-check-q1",
            question: "How do you introduce yourself in French?",
            options: ["Je m'appelle...", "Je suis...", "Mon nom est...", "Both A and C"],
            correctAnswer: 3,
            hint: "There are multiple ways to say this in French."
          },
          {
            id: "f-check-q2",
            question: "What is the correct translation of 'I have two brothers and one sister'?",
            options: ["J'ai deux frères et une sœur", "Je ai deux frères et une sœur", "J'ai deux frère et une sœur", "Je as deux frères et une sœur"],
            correctAnswer: 0,
            hint: "Pay attention to numbers and gender agreement."
          },
          {
            id: "f-check-q3",
            question: "How would you order food in a restaurant?",
            options: ["Je voudrais..., s'il vous plaît", "Je veux...", "Donnez-moi...", "All of the above"],
            correctAnswer: 3,
            hint: "All are valid ways to order, with varying levels of politeness."
          },
          {
            id: "f-check-q4",
            question: "How do you say 'The restaurant is open from Monday to Friday'?",
            options: ["Le restaurant est ouvert du lundi au vendredi", "Le restaurant est ouvert depuis lundi jusqu'à vendredi", "Le restaurant ouvre lundi à vendredi", "Le restaurant est ouvert lundi pour vendredi"],
            correctAnswer: 0,
            hint: "'Du... au...' means 'from... to...'"
          },
          {
            id: "f-check-q5",
            question: "What is the correct way to say '45 minutes past 6'?",
            options: ["Six heures quarante-cinq", "Six et quarante-cinq", "Quarante-cinq après six", "Six quarante-cinq"],
            correctAnswer: 0,
            hint: "In French time, minutes are often stated as 'heures + minutes'."
          }
        ]
      }
    ]
  }
];

// Create Japanese skills with Japanese questions
export const japaneseSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'japanese'),
  languageId: 'japanese',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'japanese')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'japanese')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'japanese'),
    skillId: skill.id.replace('spanish', 'japanese'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'j-'),
      question: `Japanese question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is a Japanese hint"
    }))
  }))
}));

// Create Italian skills with Italian questions
export const italianSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'italian'),
  languageId: 'italian',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'italian')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'italian')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'italian'),
    skillId: skill.id.replace('spanish', 'italian'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'i-'),
      question: `Italian question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is an Italian hint"
    }))
  }))
}));

// Create Portuguese skills with Portuguese questions
export const portugueseSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'portuguese'),
  languageId: 'portuguese',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'portuguese')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'portuguese')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'portuguese'),
    skillId: skill.id.replace('spanish', 'portuguese'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'p-'),
      question: `Portuguese question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is a Portuguese hint"
    }))
  }))
}));

// Create Hindi skills with Hindi questions
export const hindiSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'hindi'),
  languageId: 'hindi',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'hindi')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'hindi')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'hindi'),
    skillId: skill.id.replace('spanish', 'hindi'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'h-'),
      question: `Hindi question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is a Hindi hint"
    }))
  }))
}));

// Create English skills with English questions
export const englishSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'english'),
  languageId: 'english',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'english')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'english')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'english'),
    skillId: skill.id.replace('spanish', 'english'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'e-'),
      question: `English question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is an English hint"
    }))
  }))
}));

// Create Korean skills with Korean questions
export const koreanSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'korean'),
  languageId: 'korean',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'korean')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'korean')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'korean'),
    skillId: skill.id.replace('spanish', 'korean'),
    questions: lesson.questions.map((q, index) => ({
      ...q,
      id: q.id.replace('s-', 'k-'),
      question: `Korean question ${index + 1} for ${lesson.title}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "This is a Korean hint"
    }))
  }))
}));

// Add all skills to allSkills array
export const allSkills: Skill[] = [
  ...spanishSkills,
  ...frenchSkills,
  ...japaneseSkills,
  ...germanSkills,
  ...italianSkills,
  ...portugueseSkills,
  ...hindiSkills,
  ...englishSkills,
  ...koreanSkills
];

// Helper function to find a skill by ID
export function getSkillById(skillId: string): Skill | undefined {
  return allSkills.find(skill => skill.id === skillId);
}

// Helper function to get all skills for a language
export function getSkillsByLanguage(languageId: string): Skill[] {
  return allSkills.filter(skill => skill.languageId === languageId);
}

// Helper function to get a lesson by ID
export function getLessonById(lessonId: string): Lesson | undefined {
  for (const skill of allSkills) {
    const lesson = skill.lessons.find(lesson => lesson.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}
