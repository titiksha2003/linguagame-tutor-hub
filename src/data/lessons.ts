
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

// Example Spanish skills and lessons
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

// Create French skills by duplicating Spanish skills and changing IDs and language reference
export const frenchSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'french'),
  languageId: 'french',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'french')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'french')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'french'),
    skillId: skill.id.replace('spanish', 'french')
  }))
}));

// Create Japanese skills
export const japaneseSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'japanese'),
  languageId: 'japanese',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'japanese')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'japanese')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'japanese'),
    skillId: skill.id.replace('spanish', 'japanese')
  }))
}));

// Create German skills
export const germanSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'german'),
  languageId: 'german',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'german')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'german')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'german'),
    skillId: skill.id.replace('spanish', 'german')
  }))
}));

// Create Italian skills
export const italianSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'italian'),
  languageId: 'italian',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'italian')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'italian')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'italian'),
    skillId: skill.id.replace('spanish', 'italian')
  }))
}));

// Create Portuguese skills
export const portugueseSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'portuguese'),
  languageId: 'portuguese',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'portuguese')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'portuguese')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'portuguese'),
    skillId: skill.id.replace('spanish', 'portuguese')
  }))
}));

// Create Hindi skills
export const hindiSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'hindi'),
  languageId: 'hindi',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'hindi')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'hindi')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'hindi'),
    skillId: skill.id.replace('spanish', 'hindi')
  }))
}));

// Create English skills
export const englishSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'english'),
  languageId: 'english',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'english')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'english')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'english'),
    skillId: skill.id.replace('spanish', 'english')
  }))
}));

// Create Korean skills
export const koreanSkills: Skill[] = spanishSkills.map(skill => ({
  ...skill,
  id: skill.id.replace('spanish', 'korean'),
  languageId: 'korean',
  unlocks: skill.unlocks.map(unlock => unlock.replace('spanish', 'korean')),
  requiredSkills: skill.requiredSkills.map(req => req.replace('spanish', 'korean')),
  lessons: skill.lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.replace('spanish', 'korean'),
    skillId: skill.id.replace('spanish', 'korean')
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
