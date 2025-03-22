
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
        title: "Spanish Lesson 2 - Common Phrases",
        description: "Master everyday Spanish phrases that will help you in common situations.",
        videoId: "9lqk66jtMfU",
        languageId: "spanish",
        order: 2
      },
      {
        id: "spanish-video-3",
        title: "Spanish Lesson 3 - Numbers and Counting",
        description: "Learn how to count and use numbers in Spanish.",
        videoId: "AH5Q2lvWEzc",
        languageId: "spanish",
        order: 3
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
      }
    ]
  },
  {
    languageId: "hindi",
    playlistUrl: "https://www.youtube.com/watch?v=XunD5fk8wr4&list=PLt0oEzsnHGgL8Sncvj-CXnJhg5EvTcEyg",
    videos: [
      {
        id: "hindi-video-1",
        title: "Hindi Lesson 1 - Introduction to Hindi",
        description: "Start your journey learning Hindi with this introductory lesson.",
        videoId: "XunD5fk8wr4",
        languageId: "hindi",
        order: 1
      }
    ]
  },
  {
    languageId: "english",
    playlistUrl: "https://www.youtube.com/watch?v=CbPy_CjJR90&list=PL2IkMHFHWdEqi0jiLXTEakULNDXGc-q_B",
    videos: [
      {
        id: "english-video-1",
        title: "English Lesson 1 - Basics for Beginners",
        description: "Learn the fundamentals of English language with this introductory lesson.",
        videoId: "CbPy_CjJR90", 
        languageId: "english",
        order: 1
      }
    ]
  },
  {
    languageId: "korean",
    playlistUrl: "https://www.youtube.com/watch?v=sx0yyQqkpqo&list=PLbFrQnW0BNMUkAFj4MjYauXBPtO3I9O_k",
    videos: [
      {
        id: "korean-video-1",
        title: "Korean Lesson 1 - Introduction to Korean",
        description: "Begin learning Korean with this first introductory lesson.",
        videoId: "sx0yyQqkpqo",
        languageId: "korean",
        order: 1
      }
    ]
  }
];

export function getVideosByLanguage(languageId: string): VideoLesson[] {
  const languageVideos = videoLessons.find(item => item.languageId === languageId);
  return languageVideos ? languageVideos.videos : [];
}

export function getVideoById(videoId: string): VideoLesson | undefined {
  for (const language of videoLessons) {
    const video = language.videos.find(v => v.id === videoId);
    if (video) return video;
  }
  return undefined;
}
