export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  languageId: string;
  order: number;
}

interface LanguageVideos {
  languageId: string;
  playlistUrl: string;
  videos: VideoLesson[];
}

export const videoLessons: LanguageVideos[] = [
  {
    languageId: "spanish",
    playlistUrl: "https://www.youtube.com/watch?v=kJQjXAVEWt0&list=PLv63dFTP4Sjq6knRsZQI-bTnRE38cZZoy",
    videos: [
      {
        id: "spanish-video-1",
        title: "Spanish Lesson 1 - Introduction and Basics",
        description: "Learn the essentials of Spanish including greetings, introductions, and basic phrases.",
        videoId: "kJQjXAVEWt0",
        languageId: "spanish",
        order: 1
      },
      {
        id: "spanish-video-2",
        title: "Spanish Lesson 2 - Counting in Spanish",
        description: "Learn how to count and use numbers in Spanish.",
        videoId: "qIyhRvk7qlk",
        languageId: "spanish",
        order: 2
      },
      {
        id: "spanish-video-3",
        title: "Spanish Lesson 3 - Tool For Learning Spanish",
        description: "Learn how to count and use numbers in Spanish.",
        videoId: "FRV9fvWjMHA",
        languageId: "spanish",
        order: 3
      },
      {
        id: "spanish-video-4",
        title: "Spanish Lesson 4 - How to Spell in Spanish",
        description: "Learn how to spell words and use the Spanish alphabet.",
        videoId: "lbDxhlPSMxs",
        languageId: "spanish",
        order: 4
      },
      {
        id: "spanish-video-5",
        title: "Spanish Lesson 5 - Colors in Spanish",
        description: "Learn the names of colors in Spanish.",
        videoId: "K6NSvBvQYBY",
        languageId: "spanish",
        order: 5
      },
      {
        id: "spanish-video-6",
        title: "Spanish Lesson 6 - Days of the Week",
        description: "Learn vocabulary for days of the week in Spanish.",
        videoId: "wwZgwnTIb58",
        languageId: "spanish",
        order: 6
      },
      {
        id: "spanish-video-7",
        title: "Spanish Lesson 7 - Dates for Beginners",
        description: "Learn food vocabulary and phrases for ordering in restaurants.",
        videoId: "fVNMU4xj9Nk",
        languageId: "spanish",
        order: 7
      },
      {
        id: "spanish-video-8",
        title: "Spanish Lesson 8 - How to Greet in Spanish",
        description: "Learn to talk about weather and seasons in Spanish.",
        videoId: "AqfQQZVmTUw",
        languageId: "spanish",
        order: 8
      },
      {
        id: "spanish-video-9",
        title: "Spanish Lesson 9 - Verb SER in Spanish",
        description: "Learn how to tell time in Spanish.",
        videoId: "bmpPhSNt1J4",
        languageId: "spanish",
        order: 9
      },
      {
        id: "spanish-video-10",
        title: "Spanish Lesson 10 - Adjectives to use with SER",
        description: "Learn to use adjectives with the verb SER in Spanish.",
        videoId: "MGOvu-0gGXk",
        languageId: "spanish",
        order: 10
      },
      {
        id: "spanish-video-11",
        title: "Spanish Lesson 11 - Using Like in Spanish",
        description: "Learn how to express likes and preferences in Spanish.",
        videoId: "uLr3ognAdjA",
        languageId: "spanish",
        order: 11
      },
      {
        id: "spanish-video-12",
        title: "Spanish Lesson 12 - Definite and Indefinite Articles",
        description: "Learn about definite and indefinite articles in Spanish.",
        videoId: "YeTIwDcKwZ4",
        languageId: "spanish",
        order: 12
      },
      {
        id: "spanish-video-13",
        title: "Spanish Lesson 13 - How to Use 'Estar'",
        description: "Learn how to correctly use the verb 'estar' in Spanish.",
        videoId: "9ovM6bntSlw",
        languageId: "spanish",
        order: 13
      },
      {
        id: "spanish-video-14",
        title: "Spanish Lesson 14 - AR Verbs in Spanish",
        description: "Learn how to conjugate and use AR verbs in Spanish.",
        videoId: "TF71Ca3def8",
        languageId: "spanish",
        order: 14
      },
      {
        id: "spanish-video-15",
        title: "Spanish Lesson 15 - Most Effective Learning Technique",
        description: "Learn the most effective techniques for mastering Spanish.",
        videoId: "xY820GPbDOs",
        languageId: "spanish",
        order: 15
      },
      {
        id: "spanish-video-16",
        title: "Spanish Lesson 16 - Telling Time in Spanish",
        description: "Learn how to tell time in Spanish.",
        videoId: "_FRiRJz_r4g",
        languageId: "spanish",
        order: 16
      },
      {
        id: "spanish-video-17",
        title: "Spanish Lesson 17 - Understanding Time",
        description: "Learn concepts of time and how to discuss timing in Spanish.",
        videoId: "ouYnBFwTCKQ",
        languageId: "spanish",
        order: 17
      },
      {
        id: "spanish-video-18",
        title: "Spanish Lesson 18 - Spanish Contractions AL and DEL",
        description: "Learn about Spanish contractions AL and DEL and how to use them correctly.",
        videoId: "nWPZZWIwWxg",
        languageId: "spanish",
        order: 18
      },
      {
        id: "spanish-video-19",
        title: "Spanish Lesson 19 - Verbs: \"IR\" (To Go)",
        description: "Learn how to use the important Spanish verb IR (to go) in different contexts.",
        videoId: "bebEA8RMgus",
        languageId: "spanish",
        order: 19
      },
      {
        id: "spanish-video-20",
        title: "Spanish Lesson 20 - School Supplies Vocabulary",
        description: "Learn vocabulary for school supplies and classroom items in Spanish.",
        videoId: "oiIvAyX8PEg",
        languageId: "spanish",
        order: 20
      }
    ]
  },
  {
    languageId: "french",
    playlistUrl: "https://www.youtube.com/watch?v=-JhOFyw2WlI&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3",
    videos: [
      {
        id: "french-video-1",
        title: "French Lesson 1 - Introduction",
        description: "Learn the basics of French language with this introductory lesson.",
        videoId: "-JhOFyw2WlI",
        languageId: "french",
        order: 1
      },
      {
        id: "french-video-2",
        title: "French Lesson 2 - Pronounce Words in French",
        description: "Learn how to pronounce French words correctly.",
        videoId: "tG2ae8mZmic",
        languageId: "french",
        order: 2
      },
      {
        id: "french-video-3",
        title: "French Lesson 3 - Greetings in French",
        description: "Master essential French greetings and phrases for beginners.",
        videoId: "qvI_7St3mBk",
        languageId: "french",
        order: 3
      },
      {
        id: "french-video-4",
        title: "French Lesson 4 - Conjugate the Verb Être",
        description: "Learn how to conjugate the essential French verb 'être' (to be).",
        videoId: "0HoMvKbZTjs",
        languageId: "french",
        order: 4
      },
      {
        id: "french-video-5",
        title: "French Lesson 5 - How to Use Articles",
        description: "Learn how to use French articles correctly.",
        videoId: "RO4d-3Pmg3k",
        languageId: "french",
        order: 5
      },
      {
        id: "french-video-6",
        title: "French Lesson 6 - Counting",
        description: "Learn to count in French.",
        videoId: "DGCB0ySwfok",
        languageId: "french",
        order: 6
      },
      {
        id: "french-video-7",
        title: "French Lesson 7 - Using C'est",
        description: "Learn how to use the French expression 'C'est'.",
        videoId: "JIEcdhvb5BQ",
        languageId: "french",
        order: 7
      },
      {
        id: "french-video-8",
        title: "French Lesson 8 - Using Aller",
        description: "Learn how to use the French verb 'aller' (to go).",
        videoId: "hDclZCWmweY",
        languageId: "french",
        order: 8
      },
      {
        id: "french-video-9",
        title: "French Lesson 9 - How to Use Chez",
        description: "Learn how to use the French preposition 'chez'.",
        videoId: "6fEkyrS5woA",
        languageId: "french",
        order: 9
      },
      {
        id: "french-video-10",
        title: "French Lesson 10 - Avoir (To Have)",
        description: "Learn how to use the French verb 'avoir' (to have).",
        videoId: "82Y04729kA0",
        languageId: "french",
        order: 10
      },
      {
        id: "french-video-11",
        title: "French Lesson 11 - Questions",
        description: "Learn how to ask questions in French.",
        videoId: "SaPiL5DByqk",
        languageId: "french",
        order: 11
      },
      {
        id: "french-video-12",
        title: "French Lesson 12 - ER Verbs",
        description: "Learn French -ER verb conjugation.",
        videoId: "QA0Fti2Tvyk",
        languageId: "french",
        order: 12
      },
      {
        id: "french-video-13",
        title: "French Lesson 13 - Possessive Adjectives",
        description: "Learn French possessive adjectives.",
        videoId: "uyPpd_vPQGY",
        languageId: "french",
        order: 13
      },
      {
        id: "french-video-14",
        title: "French Lesson 14 - Family Words",
        description: "Learn vocabulary for family members in French.",
        videoId: "FV4d5X4RT4o",
        languageId: "french",
        order: 14
      },
      {
        id: "french-video-15",
        title: "French Lesson 15 - Negative Words",
        description: "Learn how to use negative expressions in French.",
        videoId: "PtmLdHlRwWc",
        languageId: "french",
        order: 15
      },
      {
        id: "french-video-16",
        title: "French Lesson 16 - Prepositions",
        description: "Learn French prepositions and how to use them.",
        videoId: "x9jhGBpiZMA",
        languageId: "french",
        order: 16
      },
      {
        id: "french-video-17",
        title: "French Lesson 17 - Days and Dates",
        description: "Learn days of the week and how to express dates in French.",
        videoId: "GTuObDSZkRA",
        languageId: "french",
        order: 17
      },
      {
        id: "french-video-18",
        title: "French Lesson 18 - Clothing",
        description: "Learn vocabulary for clothing and fashion in French.",
        videoId: "lfH_-ZcseIE",
        languageId: "french",
        order: 18
      },
      {
        id: "french-video-19",
        title: "French Lesson 19 - Weather and Seasons",
        description: "Learn to talk about weather and seasons in French.",
        videoId: "hF7alkCUtCY",
        languageId: "french",
        order: 19
      },
      {
        id: "french-video-20",
        title: "French Lesson 20 - Colors",
        description: "Learn the colors in French.",
        videoId: "Wzz80FJFyzg",
        languageId: "french",
        order: 20
      }
    ]
  },
  {
    languageId: "japanese",
    playlistUrl: "https://www.youtube.com/watch?v=rGrBHiuPlT0&list=PL4071737C12790477",
    videos: [
      {
        id: "japanese-video-1",
        title: "Japanese Lesson 1 - Introduction to Japanese",
        description: "Begin your journey learning Japanese with this introductory lesson.",
        videoId: "rGrBHiuPlT0",
        languageId: "japanese",
        order: 1
      },
      {
        id: "japanese-video-2",
        title: "Japanese Lesson 2 - Hiragana Introduction",
        description: "Learn the basics of hiragana, the Japanese phonetic alphabet.",
        videoId: "70j4JXRoRY4",
        languageId: "japanese",
        order: 2
      },
      {
        id: "japanese-video-3",
        title: "Japanese Lesson 3 - Basic Greetings",
        description: "Essential greetings and expressions in Japanese.",
        videoId: "7UZTBS5Y2kI",
        languageId: "japanese",
        order: 3
      },
      {
        id: "japanese-video-4",
        title: "Japanese Lesson 4 - Numbers and Counting",
        description: "Learn to count in Japanese.",
        videoId: "CeY5YpZLHS0",
        languageId: "japanese",
        order: 4
      },
      {
        id: "japanese-video-5",
        title: "Japanese Lesson 5 - Basic Phrases",
        description: "Common phrases for everyday situations.",
        videoId: "WlacJg0Ptlk",
        languageId: "japanese",
        order: 5
      },
      {
        id: "japanese-video-6",
        title: "Japanese Lesson 6 - Katakana Basics",
        description: "Introduction to katakana, used primarily for foreign words.",
        videoId: "s6DKnJPX6u4",
        languageId: "japanese",
        order: 6
      },
      {
        id: "japanese-video-7",
        title: "Japanese Lesson 7 - Self Introduction",
        description: "Learn how to introduce yourself in Japanese.",
        videoId: "pn32Ij_8EQE",
        languageId: "japanese",
        order: 7
      },
      {
        id: "japanese-video-8",
        title: "Japanese Lesson 8 - Food and Restaurants",
        description: "Vocabulary for dining and food in Japanese.",
        videoId: "x6iDxffO8N0",
        languageId: "japanese",
        order: 8
      },
      {
        id: "japanese-video-9",
        title: "Japanese Lesson 9 - Basic Verbs",
        description: "Essential verbs and their usage in Japanese.",
        videoId: "3y6pKpjAx2c",
        languageId: "japanese",
        order: 9
      },
      {
        id: "japanese-video-10",
        title: "Japanese Lesson 10 - Time and Calendar",
        description: "Learn to talk about time and dates in Japanese.",
        videoId: "DFj6xAaGz-4",
        languageId: "japanese",
        order: 10
      },
      {
        id: "japanese-video-11",
        title: "Japanese Lesson 11 - Basic Particles",
        description: "Understanding particles in Japanese sentences.",
        videoId: "5sFWlsOIDH4",
        languageId: "japanese",
        order: 11
      },
      {
        id: "japanese-video-12",
        title: "Japanese Lesson 12 - Directions",
        description: "Asking for and giving directions in Japanese.",
        videoId: "GQRlPFWjDo4",
        languageId: "japanese",
        order: 12
      },
      {
        id: "japanese-video-13",
        title: "Japanese Lesson 13 - Shopping Phrases",
        description: "Useful phrases for shopping in Japanese.",
        videoId: "xEcvUYuTZl8",
        languageId: "japanese",
        order: 13
      },
      {
        id: "japanese-video-14",
        title: "Japanese Lesson 14 - Travel Vocabulary",
        description: "Essential words and phrases for traveling in Japan.",
        videoId: "ZV9Cxv_Pgq0",
        languageId: "japanese",
        order: 14
      },
      {
        id: "japanese-video-15",
        title: "Japanese Lesson 15 - Describing People",
        description: "Adjectives and phrases for describing people.",
        videoId: "2zQ3a7OykL4",
        languageId: "japanese",
        order: 15
      },
      {
        id: "japanese-video-16",
        title: "Japanese Lesson 16 - Weather Expressions",
        description: "Talking about weather in Japanese.",
        videoId: "KnXmBQBm3SI",
        languageId: "japanese",
        order: 16
      },
      {
        id: "japanese-video-17",
        title: "Japanese Lesson 17 - Family Terms",
        description: "Vocabulary for family members in Japanese.",
        videoId: "QSBZRg1Y6OA",
        languageId: "japanese",
        order: 17
      },
      {
        id: "japanese-video-18",
        title: "Japanese Lesson 18 - Hobbies and Interests",
        description: "Talking about hobbies and interests in Japanese.",
        videoId: "ZPEy4YGXHP0",
        languageId: "japanese",
        order: 18
      },
      {
        id: "japanese-video-19",
        title: "Japanese Lesson 19 - Basic Kanji Introduction",
        description: "Getting started with basic kanji characters.",
        videoId: "mQw_2KQxYs4",
        languageId: "japanese",
        order: 19
      },
      {
        id: "japanese-video-20",
        title: "Japanese Lesson 20 - Everyday Conversations",
        description: "Practice common conversation scenarios in Japanese.",
        videoId: "MoRe5PM5FpI",
        languageId: "japanese",
        order: 20
      }
    ]
  },
  {
    languageId: "italian",
    playlistUrl: "https://www.youtube.com/watch?v=EG9x0eevbV4&list=PLUcDBadaP5IUJYW6qn2jTH0Ik2EMvAPze",
    videos: [
      {
        id: "italian-video-1",
        title: "Italian Lesson 1 - Basics",
        description: "Start learning Italian with these essential phrases and vocabulary.",
        videoId: "EG9x0eevbV4",
        languageId: "italian",
        order: 1
      },
      {
        id: "italian-video-2",
        title: "Italian Lesson 2 - Greetings",
        description: "Learn common greetings and introductions in Italian.",
        videoId: "8ZDOdIglvUo",
        languageId: "italian",
        order: 2
      },
      {
        id: "italian-video-3",
        title: "Italian Lesson 3 - Numbers",
        description: "Count from 1 to 100 in Italian.",
        videoId: "jk_D7kfJ0E4",
        languageId: "italian",
        order: 3
      },
      {
        id: "italian-video-4",
        title: "Italian Lesson 4 - Days and Months",
        description: "Learn the days of the week and months in Italian.",
        videoId: "vk3VgflCcN8",
        languageId: "italian",
        order: 4
      },
      {
        id: "italian-video-5",
        title: "Italian Lesson 5 - Colors",
        description: "Learn the colors in Italian.",
        videoId: "_j_G-Wjmvco",
        languageId: "italian",
        order: 5
      },
      {
        id: "italian-video-6",
        title: "Italian Lesson 6 - Family Members",
        description: "Vocabulary for family relationships in Italian.",
        videoId: "JVnQwpnSHjE",
        languageId: "italian",
        order: 6
      },
      {
        id: "italian-video-7",
        title: "Italian Lesson 7 - Food and Dining",
        description: "Essential food vocabulary and restaurant phrases.",
        videoId: "l-1Dz4T5CrQ",
        languageId: "italian",
        order: 7
      },
      {
        id: "italian-video-8",
        title: "Italian Lesson 8 - Basic Conversations",
        description: "Simple conversation scenarios in Italian.",
        videoId: "Cm3U-NgStvs",
        languageId: "italian",
        order: 8
      },
      {
        id: "italian-video-9",
        title: "Italian Lesson 9 - Telling Time",
        description: "How to tell time in Italian.",
        videoId: "6kOQF3-hZI4",
        languageId: "italian",
        order: 9
      },
      {
        id: "italian-video-10",
        title: "Italian Lesson 10 - Weather Expressions",
        description: "Talk about the weather in Italian.",
        videoId: "NQBjmnvkSO8",
        languageId: "italian",
        order: 10
      },
      {
        id: "italian-video-11",
        title: "Italian Lesson 11 - Present Tense Verbs",
        description: "Italian present tense verb conjugation.",
        videoId: "vQhB3Bb6UWo",
        languageId: "italian",
        order: 11
      },
      {
        id: "italian-video-12",
        title: "Italian Lesson 12 - Travel Phrases",
        description: "Essential phrases for traveling in Italy.",
        videoId: "S7R9l0tFDpk",
        languageId: "italian",
        order: 12
      },
      {
        id: "italian-video-13",
        title: "Italian Lesson 13 - Shopping Vocabulary",
        description: "Words and phrases for shopping in Italian.",
        videoId: "VmrZY_vp-cU",
        languageId: "italian",
        order: 13
      },
      {
        id: "italian-video-14",
        title: "Italian Lesson 14 - Body Parts",
        description: "Names of body parts in Italian.",
        videoId: "YGQYoYPYnsM",
        languageId: "italian",
        order: 14
      },
      {
        id: "italian-video-15",
        title: "Italian Lesson 15 - Describing People",
        description: "Adjectives and phrases for describing people in Italian.",
        videoId: "B1sRljn6HTo",
        languageId: "italian",
        order: 15
      },
      {
        id: "italian-video-16",
        title: "Italian Lesson 16 - Directions",
        description: "Asking for and giving directions in Italian.",
        videoId: "u1FcR4VzJ2s",
        languageId: "italian",
        order: 16
      },
      {
        id: "italian-video-17",
        title: "Italian Lesson 17 - Hobbies and Activities",
        description: "Talk about hobbies and leisure activities in Italian.",
        videoId: "nNRDj0whfxU",
        languageId: "italian",
        order: 17
      },
      {
        id: "italian-video-18",
        title: "Italian Lesson 18 - Past Tense Introduction",
        description: "Introduction to past tense in Italian.",
        videoId: "0Py3aM6Oeps",
        languageId: "italian",
        order: 18
      },
      {
        id: "italian-video-19",
        title: "Italian Lesson 19 - Future Tense",
        description: "Expressing future actions in Italian.",
        videoId: "eILyJUF_6N0",
        languageId: "italian",
        order: 19
      },
      {
        id: "italian-video-20",
        title: "Italian Lesson 20 - Common Expressions",
        description: "Common idiomatic expressions in Italian.",
        videoId: "IkX1qGHnOMY",
        languageId: "italian",
        order: 20
      }
    ]
  },
  {
    languageId: "german",
    playlistUrl: "https://www.youtube.com/watch?v=RuGmc662HDg&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW",
    videos: [
      {
        id: "german-video-1",
        title: "German Lesson 1 - Introduction",
        description: "Learn the basics of German language in this first lesson.",
        videoId: "RuGmc662HDg",
        languageId: "german",
        order: 1
      },
      {
        id: "german-video-2",
        title: "German Lesson 2 - Common Phrases",
        description: "Learn essential common phrases in German.",
        videoId: "S8ukFF6SdGk",
        languageId: "german",
        order: 2
      },
      {
        id: "german-video-3",
        title: "German Lesson 3 - Numbers 0-20",
        description: "Learn to count from 0 to 20 in German.",
        videoId: "d54ioeKA-jc",
        languageId: "german",
        order: 3
      },
      {
        id: "german-video-4",
        title: "German Lesson 4 - Numbers 21-100",
        description: "Learn to count from 21 to 100 in German.",
        videoId: "IaerX0Y6wmE",
        languageId: "german",
        order: 4
      },
      {
        id: "german-video-5",
        title: "German Lesson 5 - Alphabets",
        description: "Learn the German alphabet and pronunciation.",
        videoId: "HCytWm3RC9g",
        languageId: "german",
        order: 5
      },
      {
        id: "german-video-6",
        title: "German Lesson 6 - sich vorstellen",
        description: "Learn how to introduce yourself in German.",
        videoId: "RElBVZ1Wke0",
        languageId: "german",
        order: 6
      },
      {
        id: "german-video-7",
        title: "German Lesson 7 - jemanden kennenlernen",
        description: "Learn how to get to know someone in German.",
        videoId: "KDkQOXcEr4o",
        languageId: "german",
        order: 7
      },
      {
        id: "german-video-8",
        title: "German Lesson 8 - Wie geht's?",
        description: "Learn how to ask and respond to 'How are you?' in German.",
        videoId: "iWyOKwIf_94",
        languageId: "german",
        order: 8
      },
      {
        id: "german-video-9",
        title: "German Lesson 9 - Satzstruktur",
        description: "Learn about German sentence structure.",
        videoId: "n6db5VSUm2o",
        languageId: "german",
        order: 9
      },
      {
        id: "german-video-10",
        title: "German Lesson 10 - Satzstruktur (Part 2)",
        description: "Continue learning German sentence structure.",
        videoId: "ZNc0y2Dy5N8",
        languageId: "german",
        order: 10
      },
      {
        id: "german-video-11",
        title: "German Lesson 11 - Personalpronomen",
        description: "Learn German personal pronouns.",
        videoId: "hY4lHC6YZuQ",
        languageId: "german",
        order: 11
      },
      {
        id: "german-video-12",
        title: "German Lesson 12 - haben und sein",
        description: "Learn the German verbs 'haben' (to have) and 'sein' (to be).",
        videoId: "xy4a1c7W7k0",
        languageId: "german",
        order: 12
      },
      {
        id: "german-video-13",
        title: "German Lesson 13 - Was ist ein Verb?",
        description: "Learn what verbs are in German.",
        videoId: "07WCBZRchY0",
        languageId: "german",
        order: 13
      },
      {
        id: "german-video-14",
        title: "German Lesson 14 - Regelmäßige Verben",
        description: "Learn regular verbs in German.",
        videoId: "IowuDehrLFk",
        languageId: "german",
        order: 14
      },
      {
        id: "german-video-15",
        title: "German Lesson 15 - Unregelmäßige Verben",
        description: "Learn irregular verbs in German.",
        videoId: "15hmmpt15ag",
        languageId: "german",
        order: 15
      },
      {
        id: "german-video-16",
        title: "German Lesson 16 - Numbers above 100 in German",
        description: "Learn numbers above 100 in German.",
        videoId: "BISRFfjDKfY",
        languageId: "german",
        order: 16
      },
      {
        id: "german-video-17",
        title: "German Lesson 17 - Adjectives and Opposites",
        description: "Learn adjectives and their opposites in German.",
        videoId: "PARun113NuA",
        languageId: "german",
        order: 17
      },
      {
        id: "german-video-18",
        title: "German Lesson 18 - Introducing someone in German",
        description: "Learn how to introduce someone else in German.",
        videoId: "zNh1CmEP-B0",
        languageId: "german",
        order: 18
      },
      {
        id: "german-video-19",
        title: "German Lesson 19 - Articles in German",
        description: "Learn German articles (der, die, das).",
        videoId: "b2feLAJX9gI",
        languageId: "german",
        order: 19
      },
      {
        id: "german-video-20",
        title: "German Lesson 20 - Indefinite Articles",
        description: "Learn German indefinite articles (ein, eine).",
        videoId: "4M6PN4yfwgI",
        languageId: "german",
        order: 20
      }
    ]
  },
  {
    languageId: "portuguese",
    playlistUrl: "https://www.youtube.com/watch?v=7WrtBmnodlo&list=PL7QIUM3uxovago7rPhCzvMUBuFtKxS0JU",
    videos: [
      {
        id: "portuguese-video-1",
        title: "Portuguese Lesson 1 - Getting Started",
        description: "Begin your Portuguese language journey with these first steps.",
        videoId: "7WrtBmnodlo",
        languageId: "portuguese",
        order: 1
      },
      {
        id: "portuguese-video-2",
        title: "Portuguese Lesson 2 - Greetings and Basics",
        description: "Learn essential greetings and phrases in Portuguese.",
        videoId: "8TUgvtp91cw",
        languageId: "portuguese",
        order: 2
      },
      {
        id: "portuguese-video-3",
        title: "Portuguese Lesson 3 - Numbers",
        description: "Learn to count in Portuguese.",
        videoId: "T4cVQBmQNHQ",
        languageId: "portuguese",
        order: 3
      },
      {
        id: "portuguese-video-4",
        title: "Portuguese Lesson 4 - Basic Phrases",
        description: "Common phrases for everyday situations.",
        videoId: "Z2Y6V1vpFgM",
        languageId: "portuguese",
        order: 4
      },
      {
        id: "portuguese-video-5",
        title: "Portuguese Lesson 5 - Days and Months",
        description: "Learn the days of the week and months in Portuguese.",
        videoId: "pXt8oEO5mIU",
        languageId: "portuguese",
        order: 5
      },
      {
        id: "portuguese-video-6",
        title: "Portuguese Lesson 6 - Colors and Adjectives",
        description: "Learn colors and basic adjectives in Portuguese.",
        videoId: "mX1lLVCxeRc",
        languageId: "portuguese",
        order: 6
      },
      {
        id: "portuguese-video-7",
        title: "Portuguese Lesson 7 - Family Members",
        description: "Vocabulary for family relations in Portuguese.",
        videoId: "sM3VVVpTBpE",
        languageId: "portuguese",
        order: 7
      },
      {
        id: "portuguese-video-8",
        title: "Portuguese Lesson 8 - Food and Dining",
        description: "Essential food vocabulary in Portuguese.",
        videoId: "Hk_h8wGwsLg",
        languageId: "portuguese",
        order: 8
      },
      {
        id: "portuguese-video-9",
        title: "Portuguese Lesson 9 - Telling Time",
        description: "Learn to tell time in Portuguese.",
        videoId: "YqHPE-nEYxU",
        languageId: "portuguese",
        order: 9
      },
      {
        id: "portuguese-video-10",
        title: "Portuguese Lesson 10 - Basic Conversations",
        description: "Simple conversations in Portuguese.",
        videoId: "9N-E8WlWEB4",
        languageId: "portuguese",
        order: 10
      },
      {
        id: "portuguese-video-11",
        title: "Portuguese Lesson 11 - Present Tense Verbs",
        description: "Learn present tense conjugation in Portuguese.",
        videoId: "G-0LjYcbxBc",
        languageId: "portuguese",
        order: 11
      },
      {
        id: "portuguese-video-12",
        title: "Portuguese Lesson 12 - Weather Expressions",
        description: "Talk about the weather in Portuguese.",
        videoId: "tNcXZJ8y5N8",
        languageId: "portuguese",
        order: 12
      },
      {
        id: "portuguese-video-13",
        title: "Portuguese Lesson 13 - Shopping Vocabulary",
        description: "Words and phrases for shopping in Portuguese.",
        videoId: "CcqUSYOGSVQ",
        languageId: "portuguese",
        order: 13
      },
      {
        id: "portuguese-video-14",
        title: "Portuguese Lesson 14 - Travel Phrases",
        description: "Essential travel vocabulary in Portuguese.",
        videoId: "LZZFtAXtTm0",
        languageId: "portuguese",
        order: 14
      },
      {
        id: "portuguese-video-15",
        title: "Portuguese Lesson 15 - Describing People",
        description: "Vocabulary for describing people in Portuguese.",
        videoId: "u8d21Nrslys",
        languageId: "portuguese",
        order: 15
      },
      {
        id: "portuguese-video-16",
        title: "Portuguese Lesson 16 - Directions",
        description: "Asking for and giving directions in Portuguese.",
        videoId: "0sEXeULhxUg",
        languageId: "portuguese",
        order: 16
      },
      {
        id: "portuguese-video-17",
        title: "Portuguese Lesson 17 - Hobbies",
        description: "Talk about hobbies and activities in Portuguese.",
        videoId: "Pj2lMF5rEsA",
        languageId: "portuguese",
        order: 17
      },
      {
        id: "portuguese-video-18",
        title: "Portuguese Lesson 18 - Past Tense",
        description: "Introduction to past tense in Portuguese.",
        videoId: "Zb20ypjISzA",
        languageId: "portuguese",
        order: 18
      },
      {
        id: "portuguese-video-19",
        title: "Portuguese Lesson 19 - Future Tense",
        description: "Express future actions in Portuguese.",
        videoId: "YvRUVyt1vAo",
        languageId: "portuguese",
        order: 19
      },
      {
        id: "portuguese-video-20",
        title: "Portuguese Lesson 20 - Common Expressions",
        description: "Common idiomatic expressions in Portuguese.",
        videoId: "rHwNPzyHVQw",
        languageId: "portuguese",
        order: 20
      }
    ]
  },
  {
    languageId: "hindi",
    playlistUrl: "https://www.youtube.com/watch?v=ctq6UQ5RRjk&list=PLOZKbRUo1Hv_05LhV58HOZgSLrClIvQwm",
    videos: [
      {
        id: "hindi-video-1",
        title: "Hindi Lesson 1 - Introduction to Hindi",
        description: "Learn the basics of Hindi language with this introductory lesson.",
        videoId: "ctq6UQ5RRjk",
        languageId: "hindi",
        order: 1
      },
      {
        id: "hindi-video-2",
        title: "Hindi Lesson 2 - Devanagari Script Basics",
        description: "Learn the fundamentals of the Devanagari script used in Hindi.",
        videoId: "5wdH6WxF7X4",
        languageId: "hindi",
        order: 2
      },
      {
        id: "hindi-video-3",
        title: "Hindi Lesson 3 - Common Greetings",
        description: "Learn essential greetings and phrases in Hindi.",
        videoId: "xQZQ6is7SuU",
        languageId: "hindi",
        order: 3
      },
      {
        id: "hindi-video-4",
        title: "Hindi Lesson 4 - Numbers and Counting",
        description: "Learn to count and use numbers in Hindi.",
        videoId: "-DGCrffTDp0",
        languageId: "hindi",
        order: 4
      },
      {
        id: "hindi-video-5",
        title: "Hindi Lesson 5 - Basic Phrases",
        description: "Learn common phrases for everyday situations in Hindi.",
        videoId: "Z18R6u97vqY",
        languageId: "hindi",
        order: 5
      },
      {
        id: "hindi-video-6",
        title: "Hindi Lesson 6 - Family Vocabulary",
        description: "Learn words for family members in Hindi.",
        videoId: "0cHV8D7FypU",
        languageId: "hindi",
        order: 6
      },
      {
        id: "hindi-video-7",
        title: "Hindi Lesson 7 - Food and Dining",
        description: "Essential food vocabulary and dining phrases in Hindi.",
        videoId: "KdmkCvG4PuU",
        languageId: "hindi",
        order: 7
      },
      {
        id: "hindi-video-8",
        title: "Hindi Lesson 8 - Days and Months",
        description: "Learn days of the week and months in Hindi.",
        videoId: "9svwAhZ_TPA",
        languageId: "hindi",
        order: 8
      },
      {
        id: "hindi-video-9",
        title: "Hindi Lesson 9 - Telling Time",
        description: "Learn how to tell time in Hindi.",
        videoId: "e17YhTlVxKM",
        languageId: "hindi",
        order: 9
      },
      {
        id: "hindi-video-10",
        title: "Hindi Lesson 10 - Basic Conversations",
        description: "Practice simple conversations in Hindi.",
        videoId: "N7D4aFfHsP0",
        languageId: "hindi",
        order: 10
      },
      {
        id: "hindi-video-11",
        title: "Hindi Lesson 11 - Verbs and Actions",
        description: "Learn common verbs and action words in Hindi.",
        videoId: "MRG3lctIhKs",
        languageId: "hindi",
        order: 11
      },
      {
        id: "hindi-video-12",
        title: "Hindi Lesson 12 - Weather Expressions",
        description: "Talk about weather in Hindi.",
        videoId: "pQXpQfm1mHE",
        languageId: "hindi",
        order: 12
      },
      {
        id: "hindi-video-13",
        title: "Hindi Lesson 13 - Shopping Vocabulary",
        description: "Essential shopping vocabulary in Hindi.",
        videoId: "JDaZgZVOLLs",
        languageId: "hindi",
        order: 13
      },
      {
        id: "hindi-video-14",
        title: "Hindi Lesson 14 - Travel Phrases",
        description: "Learn useful travel phrases in Hindi.",
        videoId: "p8PqHIPJ4pA",
        languageId: "hindi",
        order: 14
      },
      {
        id: "hindi-video-15",
        title: "Hindi Lesson 15 - Describing People",
        description: "Learn to describe people in Hindi.",
        videoId: "uEFUnb5S4Zo",
        languageId: "hindi",
        order: 15
      },
      {
        id: "hindi-video-16",
        title: "Hindi Lesson 16 - Directions",
        description: "Asking for and giving directions in Hindi.",
        videoId: "LJ4jbwxGIUg",
        languageId: "hindi",
        order: 16
      },
      {
        id: "hindi-video-17",
        title: "Hindi Lesson 17 - Hobbies and Interests",
        description: "Discussing hobbies and interests in Hindi.",
        videoId: "6yIGJGMPeMM",
        languageId: "hindi",
        order: 17
      },
      {
        id: "hindi-video-18",
        title: "Hindi Lesson 18 - Simple Past Tense",
        description: "Learn about past tense in Hindi.",
        videoId: "0PxaE_WyI_I",
        languageId: "hindi",
        order: 18
      },
      {
        id: "hindi-video-19",
        title: "Hindi Lesson 19 - Future Tense",
        description: "Express future actions in Hindi.",
        videoId: "qXc184AQt4k",
        languageId: "hindi",
        order: 19
      },
      {
        id: "hindi-video-20",
        title: "Hindi Lesson 20 - Common Expressions",
        description: "Learn common expressions and idioms in Hindi.",
        videoId: "Y6wZ-s1UASs",
        languageId: "hindi",
        order: 20
      }
    ]
  },
  {
    languageId: "english",
    playlistUrl: "https://www.youtube.com/watch?v=juKd26qkNAw&list=PL55B3H6jTZKUQh_GrrOcKLqCY8q2tYiKM",
    videos: [
      {
        id: "english-video-1",
        title: "English Lesson 1 - Introduction for Beginners",
        description: "Start your journey to English fluency with this introductory lesson.",
        videoId: "juKd26qkNAw",
        languageId: "english",
        order: 1
      },
      {
        id: "english-video-2",
        title: "English Lesson 2 - Greetings and Introductions",
        description: "Learn common greetings and how to introduce yourself in English.",
        videoId: "xkQ3M6UjCsE",
        languageId: "english",
        order: 2
      },
      {
        id: "english-video-3",
        title: "English Lesson 3 - Basic Conversations",
        description: "Practice basic conversation patterns in English.",
        videoId: "NMzC0-y4oXE",
        languageId: "english",
        order: 3
      },
      {
        id: "english-video-4",
        title: "English Lesson 4 - Numbers and Counting",
        description: "Learn to count and use numbers in English.",
        videoId: "zbhK8LgH-lQ",
        languageId: "english",
        order: 4
      },
      {
        id: "english-video-5",
        title: "English Lesson 5 - Present Simple Tense",
        description: "Learn the present simple tense in English grammar.",
        videoId: "VbA-xYptgU0",
        languageId: "english",
        order: 5
      },
      {
        id: "english-video-6",
        title: "English Lesson 6 - Family Vocabulary",
        description: "Learn vocabulary for family relationships in English.",
        videoId: "FSwfN-Fo2Fc",
        languageId: "english",
        order: 6
      },
      {
        id: "english-video-7",
        title: "English Lesson 7 - Food and Dining",
        description: "Essential food vocabulary and restaurant phrases in English.",
        videoId: "ZA64QaiE9Hk",
        languageId: "english",
        order: 7
      },
      {
        id: "english-video-8",
        title: "English Lesson 8 - Days, Months, and Seasons",
        description: "Learn days, months, and seasons in English.",
        videoId: "nnLR5hcBMQY",
        languageId: "english",
        order: 8
      },
      {
        id: "english-video-9",
        title: "English Lesson 9 - Telling Time",
        description: "Learn how to tell time in English.",
        videoId: "h8Q7MAKdc3A",
        languageId: "english",
        order: 9
      },
      {
        id: "english-video-10",
        title: "English Lesson 10 - Present Continuous Tense",
        description: "Learn the present continuous tense in English.",
        videoId: "D1LcnUv6NbM",
        languageId: "english",
        order: 10
      },
      {
        id: "english-video-11",
        title: "English Lesson 11 - Common Verbs",
        description: "Learn common verbs and their usage in English.",
        videoId: "vJQb-jNRsnY",
        languageId: "english",
        order: 11
      },
      {
        id: "english-video-12",
        title: "English Lesson 12 - Weather Expressions",
        description: "Talk about the weather in English.",
        videoId: "KazVQfP4MK0",
        languageId: "english",
        order: 12
      },
      {
        id: "english-video-13",
        title: "English Lesson 13 - Shopping Vocabulary",
        description: "Essential shopping vocabulary in English.",
        videoId: "qKJl11EZT8g",
        languageId: "english",
        order: 13
      },
      {
        id: "english-video-14",
        title: "English Lesson 14 - Past Simple Tense",
        description: "Learn the past simple tense in English.",
        videoId: "gdnSsimcJNE",
        languageId: "english",
        order: 14
      },
      {
        id: "english-video-15",
        title: "English Lesson 15 - Describing People",
        description: "Learn to describe people's appearance and personality in English.",
        videoId: "gVaW4KEZgDU",
        languageId: "english",
        order: 15
      },
      {
        id: "english-video-16",
        title: "English Lesson 16 - Asking for Directions",
        description: "Learn to ask for and give directions in English.",
        videoId: "PWSx0NUBYpw",
        languageId: "english",
        order: 16
      },
      {
        id: "english-video-17",
        title: "English Lesson 17 - Hobbies and Free Time",
        description: "Discuss hobbies and leisure activities in English.",
        videoId: "NF5EcHtPqdU",
        languageId: "english",
        order: 17
      },
      {
        id: "english-video-18",
        title: "English Lesson 18 - Future Tense",
        description: "Learn to talk about future plans in English.",
        videoId: "9sWKK6diJH4",
        languageId: "english",
        order: 18
      },
      {
        id: "english-video-19",
        title: "English Lesson 19 - Modal Verbs",
        description: "Learn modal verbs like can, could, must in English.",
        videoId: "ko6CktOUOXI",
        languageId: "english",
        order: 19
      },
      {
        id: "english-video-20",
        title: "English Lesson 20 - Common Phrases and Idioms",
        description: "Learn everyday expressions and idioms in English.",
        videoId: "8H-lRgE2NVY",
        languageId: "english",
        order: 20
      }
    ]
  },
  {
    languageId: "korean",
    playlistUrl: "https://www.youtube.com/watch?v=N8mXasK3Yww&list=PLxL_SuFq4-Y_IdIFUMH8_XJQoXUeOH37v",
    videos: [
      {
        id: "korean-video-1",
        title: "Korean Lesson 1 - Introduction to Korean",
        description: "Begin your journey learning Korean with this introductory lesson.",
        videoId: "N8mXasK3Yww",
        languageId: "korean",
        order: 1
      },
      {
        id: "korean-video-2",
        title: "Korean Lesson 2 - Hangul Alphabet Basics",
        description: "Learn the Korean alphabet (Hangul) fundamentals.",
        videoId: "PukQI54JWoI",
        languageId: "korean",
        order: 2
      },
      {
        id: "korean-video-3",
        title: "Korean Lesson 3 - Basic Greetings",
        description: "Learn essential greetings in Korean.",
        videoId: "YzXKZd5r5zs",
        languageId: "korean",
        order: 3
      },
      {
        id: "korean-video-4",
        title: "Korean Lesson 4 - Self Introduction",
        description: "Learn how to introduce yourself in Korean.",
        videoId: "g7xz5wgiwAQ",
        languageId: "korean",
        order: 4
      },
      {
        id: "korean-video-5",
        title: "Korean Lesson 5 - Numbers in Korean",
        description: "Learn how to count in Korean (both native and Sino-Korean numbers).",
        videoId: "uFMV_iZKvso",
        languageId: "korean",
        order: 5
      },
      {
        id: "korean-video-6",
        title: "Korean Lesson 6 - Basic Phrases",
        description: "Learn useful everyday expressions in Korean.",
        videoId: "ZEFgsNr5hfA",
        languageId: "korean",
        order: 6
      },
      {
        id: "korean-video-7",
        title: "Korean Lesson 7 - Food and Restaurants",
        description: "Learn vocabulary for food and dining in Korean.",
        videoId: "oKW7TlxLM8I",
        languageId: "korean",
        order: 7
      },
      {
        id: "korean-video-8",
        title: "Korean Lesson 8 - Time and Calendar",
        description: "Learn to express time, days, and dates in Korean.",
        videoId: "vBjVuwgn9ZQ",
        languageId: "korean",
        order: 8
      },
      {
        id: "korean-video-9",
        title: "Korean Lesson 9 - Basic Verbs",
        description: "Learn essential verbs in Korean.",
        videoId: "A3h-yk8DxJw",
        languageId: "korean",
        order: 9
      },
      {
        id: "korean-video-10",
        title: "Korean Lesson 10 - Particles in Korean",
        description: "Learn about particles (markers) in Korean grammar.",
        videoId: "iJtF9OLsAws",
        languageId: "korean",
        order: 10
      },
      {
        id: "korean-video-11",
        title: "Korean Lesson 11 - Family Terms",
        description: "Learn vocabulary for family members in Korean.",
        videoId: "pV4gcGQ6dO0",
        languageId: "korean",
        order: 11
      },
      {
        id: "korean-video-12",
        title: "Korean Lesson 12 - Weather Expressions",
        description: "Talk about weather in Korean.",
        videoId: "qxAymS_BvFY",
        languageId: "korean",
        order: 12
      },
      {
        id: "korean-video-13",
        title: "Korean Lesson 13 - Shopping Vocabulary",
        description: "Essential shopping vocabulary in Korean.",
        videoId: "Q-AWZZOb4Vw",
        languageId: "korean",
        order: 13
      },
      {
        id: "korean-video-14",
        title: "Korean Lesson 14 - Travel Phrases",
        description: "Learn useful travel phrases in Korean.",
        videoId: "k6sHSDxKc8I",
        languageId: "korean",
        order: 14
      },
      {
        id: "korean-video-15",
        title: "Korean Lesson 15 - Past Tense",
        description: "Learn to express past actions in Korean.",
        videoId: "5h4CqXZKCpI",
        languageId: "korean",
        order: 15
      },
      {
        id: "korean-video-16",
        title: "Korean Lesson 16 - Future Tense",
        description: "Express future actions in Korean.",
        videoId: "PwrW9V-aG8M",
        languageId: "korean",
        order: 16
      },
      {
        id: "korean-video-17",
        title: "Korean Lesson 17 - Hobbies and Interests",
        description: "Talk about hobbies and interests in Korean.",
        videoId: "OlOG9i_BP_o",
        languageId: "korean",
        order: 17
      },
      {
        id: "korean-video-18",
        title: "Korean Lesson 18 - Describing People",
        description: "Learn to describe people in Korean.",
        videoId: "8H5UiUZq5X0",
        languageId: "korean",
        order: 18
      },
      {
        id: "korean-video-19",
        title: "Korean Lesson 19 - Honorifics in Korean",
        description: "Understanding the honorific system in Korean.",
        videoId: "wTVfbl1jKmA",
        languageId: "korean",
        order: 19
      },
      {
        id: "korean-video-20",
        title: "Korean Lesson 20 - Common Expressions",
        description: "Learn common idiomatic expressions in Korean.",
        videoId: "8XnvAa9Ooec",
        languageId: "korean",
        order: 20
      }
    ]
  }
];

// Helper function to get videos by language
export const getVideosByLanguage = (languageId: string): VideoLesson[] => {
  const language = videoLessons.find(l => l.languageId === languageId);
  return language ? language.videos : [];
};
