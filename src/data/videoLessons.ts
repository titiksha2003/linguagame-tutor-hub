
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
        title: "Spanish Lesson 20 - Common Expressions",
        description: "Common idiomatic expressions in Spanish.",
        videoId: "4n1SiCoJoVQ",
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
        title: "French Lesson 2 - Greetings and Basics",
        description: "Master essential French greetings and phrases for beginners.",
        videoId: "aeUQGz7Nldo",
        languageId: "french",
        order: 2
      },
      {
        id: "french-video-3",
        title: "French Lesson 3 - Numbers",
        description: "Learn how to count in French.",
        videoId: "WM5Fz5ZX2pQ",
        languageId: "french",
        order: 3
      },
      {
        id: "french-video-4",
        title: "French Lesson 4 - Days and Months",
        description: "Learn the days of the week and months in French.",
        videoId: "Lpje6slHHnM",
        languageId: "french",
        order: 4
      },
      {
        id: "french-video-5",
        title: "French Lesson 5 - Colors",
        description: "Learn the colors in French.",
        videoId: "acJRaM9UNv8",
        languageId: "french",
        order: 5
      },
      {
        id: "french-video-6",
        title: "French Lesson 6 - Family Members",
        description: "Learn vocabulary for family members in French.",
        videoId: "5jrWiYQaKDQ",
        languageId: "french",
        order: 6
      },
      {
        id: "french-video-7",
        title: "French Lesson 7 - Food and Dining",
        description: "Learn food vocabulary and dining phrases.",
        videoId: "8KvAbl-GWjs",
        languageId: "french",
        order: 7
      },
      {
        id: "french-video-8",
        title: "French Lesson 8 - Weather and Seasons",
        description: "Learn to discuss weather and seasons in French.",
        videoId: "G9jZM_NRwAI",
        languageId: "french",
        order: 8
      },
      {
        id: "french-video-9",
        title: "French Lesson 9 - Telling Time",
        description: "Learn how to tell time in French.",
        videoId: "Q4vpHRmXO4Q",
        languageId: "french",
        order: 9
      },
      {
        id: "french-video-10",
        title: "French Lesson 10 - Basic Conversations",
        description: "Practice basic conversations in French.",
        videoId: "I8gCpkSVBiA",
        languageId: "french",
        order: 10
      },
      {
        id: "french-video-11",
        title: "French Lesson 11 - Present Tense Verbs",
        description: "Learn present tense verb conjugation in French.",
        videoId: "KdQreU1ggKQ",
        languageId: "french",
        order: 11
      },
      {
        id: "french-video-12",
        title: "French Lesson 12 - Travel Phrases",
        description: "Essential travel vocabulary and phrases in French.",
        videoId: "Lr6C2MnbLYk",
        languageId: "french",
        order: 12
      },
      {
        id: "french-video-13",
        title: "French Lesson 13 - Shopping Vocabulary",
        description: "Learn vocabulary for shopping in French.",
        videoId: "qD6MbP5Obv0",
        languageId: "french",
        order: 13
      },
      {
        id: "french-video-14",
        title: "French Lesson 14 - Body Parts",
        description: "Learn the names of body parts in French.",
        videoId: "vSGxF_ESQn4",
        languageId: "french",
        order: 14
      },
      {
        id: "french-video-15",
        title: "French Lesson 15 - Describing People",
        description: "Learn to describe people's appearances in French.",
        videoId: "MP_wMz-CLXI",
        languageId: "french",
        order: 15
      },
      {
        id: "french-video-16",
        title: "French Lesson 16 - Directions",
        description: "Learn to ask for and give directions in French.",
        videoId: "FGgPLW2fz-E",
        languageId: "french",
        order: 16
      },
      {
        id: "french-video-17",
        title: "French Lesson 17 - Hobbies and Activities",
        description: "Vocabulary for hobbies and leisure activities in French.",
        videoId: "yiF9tsmIMkw",
        languageId: "french",
        order: 17
      },
      {
        id: "french-video-18",
        title: "French Lesson 18 - Past Tense Introduction",
        description: "Introduction to past tense in French.",
        videoId: "KdQreU1ggKQ",
        languageId: "french",
        order: 18
      },
      {
        id: "french-video-19",
        title: "French Lesson 19 - Future Tense",
        description: "How to express future actions in French.",
        videoId: "XlNWG78-xuY",
        languageId: "french",
        order: 19
      },
      {
        id: "french-video-20",
        title: "French Lesson 20 - Common Expressions",
        description: "Common idiomatic expressions in French.",
        videoId: "ND8SMO-OZXc",
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
        title: "German Lesson 2 - Basic Greetings",
        description: "Learn essential greetings in German.",
        videoId: "rWNzYBSnlcA",
        languageId: "german",
        order: 2
      },
      {
        id: "german-video-3",
        title: "German Lesson 3 - Numbers and Counting",
        description: "Learn to count in German.",
        videoId: "kcBXDwogAMU",
        languageId: "german",
        order: 3
      },
      {
        id: "german-video-4",
        title: "German Lesson 4 - Days and Months",
        description: "Learn days of the week and months in German.",
        videoId: "B5OeKK2f86g",
        languageId: "german",
        order: 4
      },
      {
        id: "german-video-5",
        title: "German Lesson 5 - Self-Introduction",
        description: "Learn to introduce yourself in German.",
        videoId: "8QPnqcyoQGo",
        languageId: "german",
        order: 5
      },
      {
        id: "german-video-6",
        title: "German Lesson 6 - Colors",
        description: "Learn colors in German.",
        videoId: "oUSW3cTWl_A",
        languageId: "german",
        order: 6
      },
      {
        id: "german-video-7",
        title: "German Lesson 7 - Family Members",
        description: "Vocabulary for family relationships in German.",
        videoId: "NwZTJYCXr4c",
        languageId: "german",
        order: 7
      },
      {
        id: "german-video-8",
        title: "German Lesson 8 - Food and Restaurants",
        description: "Essential vocabulary for dining in German.",
        videoId: "ZiN2_Hp_4DQ",
        languageId: "german",
        order: 8
      },
      {
        id: "german-video-9",
        title: "German Lesson 9 - Telling Time",
        description: "How to tell time in German.",
        videoId: "kgtzQMdARrU",
        languageId: "german",
        order: 9
      },
      {
        id: "german-video-10",
        title: "German Lesson 10 - Basic Conversations",
        description: "Simple conversation scenarios in German.",
        videoId: "zt5iFxDW9PQ",
        languageId: "german",
        order: 10
      },
      {
        id: "german-video-11",
        title: "German Lesson 11 - Present Tense Verbs",
        description: "German present tense verb conjugation.",
        videoId: "UR2WFa7n-zI",
        languageId: "german",
        order: 11
      },
      {
        id: "german-video-12",
        title: "German Lesson 12 - Weather Expressions",
        description: "Talk about the weather in German.",
        videoId: "jkRPrQQvN1k",
        languageId: "german",
        order: 12
      },
      {
        id: "german-video-13",
        title: "German Lesson 13 - Shopping Vocabulary",
        description: "Words and phrases for shopping in German.",
        videoId: "3_FG9PnbOnI",
        languageId: "german",
        order: 13
      },
      {
        id: "german-video-14",
        title: "German Lesson 14 - Travel Phrases",
        description: "Essential phrases for traveling in German-speaking countries.",
        videoId: "fMXn9J2qjCs",
        languageId: "german",
        order: 14
      },
      {
        id: "german-video-15",
        title: "German Lesson 15 - Directions",
        description: "Asking for and giving directions in German.",
        videoId: "ZYM-4ABh_7w",
        languageId: "german",
        order: 15
      },
      {
        id: "german-video-16",
        title: "German Lesson 16 - Body Parts",
        description: "Names of body parts in German.",
        videoId: "gCedx3I9g64",
        languageId: "german",
        order: 16
      },
      {
        id: "german-video-17",
        title: "German Lesson 17 - Describing People",
        description: "Adjectives and phrases for describing people in German.",
        videoId: "5vPzvxfAxVQ",
        languageId: "german",
        order: 17
      },
      {
        id: "german-video-18",
        title: "German Lesson 18 - Hobbies and Activities",
        description: "Talk about hobbies and leisure activities in German.",
        videoId: "GlP_B-O9xMY",
        languageId: "german",
        order: 18
      },
      {
        id: "german-video-19",
        title: "German Lesson 19 - Past Tense Introduction",
        description: "Introduction to past tense in German.",
        videoId: "XzLFXugXP_I",
        languageId: "german",
        order: 19
      },
      {
        id: "german-video-20",
        title: "German Lesson 20 - Common Expressions",
        description: "Common idiomatic expressions in German.",
        videoId: "Vc8FQGqUgfY",
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
        title: "Portuguese Lesson 13 - Shopping",
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
  }
];

// Helper function to get videos by language
export const getVideosByLanguage = (languageId: string): VideoLesson[] => {
  const language = videoLessons.find(l => l.languageId === languageId);
  return language ? language.videos : [];
};
