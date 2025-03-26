import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mic, Send, BotIcon, Loader2, VolumeX, Volume2, BookOpen, Award, Trophy, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  correction?: string;
  explanation?: string;
  followUp?: string;
}

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  commonMistakes: string[];
  achievements: string[];
  language: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: 'MCQ' | 'FillInBlanks' | 'CorrectSentence';
}

const languageResponses = {
  french: {
    hello: "Hello in French is 'Bonjour' (pronounced: bon-zhoor). You can also use 'Salut' (sah-loo) in casual settings.",
    goodbye: "Goodbye in French is 'Au revoir' (pronounced: oh ruh-vwahr). For a more casual goodbye, you can say 'Salut' or 'À bientôt' (ah bee-en-toh) which means 'see you soon'.",
    thankyou: "Thank you in French is 'Merci' (pronounced: mehr-see). For 'thank you very much', say 'Merci beaucoup' (mehr-see boh-koo).",
    howareyou: "How are you in French is 'Comment allez-vous?' (pronounced: koh-mahn tah-lay voo) for formal settings, or 'Comment ça va?' (koh-mahn sah vah) for casual conversations.",
    love: "Love in French is 'Amour' (pronounced: ah-moor). To say 'I love you', use 'Je t'aime' (zhuh tem).",
    yes: "Yes in French is 'Oui' (pronounced: wee). For emphasis, you can say 'Oui, absolument' (wee, ab-so-lu-mahn).",
    no: "No in French is 'Non' (pronounced: nohn).",
    introduction: "To introduce yourself in French, say 'Je m'appelle [your name]' (zhuh mah-pel), which means 'My name is [your name]'.",
    please: "Please in French is 'S'il vous plaît' (formal, pronounced: seel vou pleh) or 'S'il te plaît' (casual, pronounced: seel tuh pleh).",
    excuse: "Excuse me in French is 'Excusez-moi' (pronounced: ex-kew-zay mwah).",
    time: "To ask for the time in French, say 'Quelle heure est-il?' (pronounced: kel uhr eh-teel).",
    help: "Help in French is 'Aide' (pronounced: ed). To ask for help, say 'Pouvez-vous m'aider?' (poo-vay voo may-day) which means 'Can you help me?'.",
    understand: "I understand in French is 'Je comprends' (pronounced: zhuh kom-prahn). I don't understand is 'Je ne comprends pas' (zhuh nuh kom-prahn pah).",
    food: "Some essential food-related French words include: restaurant (pronounced similarly to English), café (kah-fay), menu (muh-new), l'addition (bill, pronounced: lah-dee-see-ohn)."
  },
  spanish: {
    hello: "Hello in Spanish is 'Hola' (pronounced: oh-lah). This works for any time of day and any level of formality.",
    goodbye: "Goodbye in Spanish is 'Adiós' (pronounced: ah-dee-ohs). You can also say 'Hasta luego' (ah-stah loo-eh-go) which means 'see you later'.",
    thankyou: "Thank you in Spanish is 'Gracias' (pronounced: grah-see-ahs). For 'thank you very much', say 'Muchas gracias' (moo-chahs grah-see-ahs).",
    howareyou: "How are you in Spanish is '¿Cómo estás?' (pronounced: koh-moh eh-stahs) for informal situations, or '¿Cómo está usted?' (koh-moh eh-stah oo-sted) for formal situations.",
    love: "Love in Spanish is 'Amor' (pronounced: ah-mor). To say 'I love you', use 'Te quiero' (teh kee-eh-ro) for friends and family, or 'Te amo' (teh ah-mo) for romantic relationships.",
    yes: "Yes in Spanish is 'Sí' (pronounced: see). For emphasis, you can say 'Sí, claro' (see, klah-ro) which means 'Yes, of course'.",
    no: "No in Spanish is 'No' (pronounced: noh), which is very similar to English.",
    introduction: "To introduce yourself in Spanish, say 'Me llamo [your name]' (meh yah-mo) or 'Soy [your name]' (soy), which both mean 'My name is [your name]'.",
    please: "Please in Spanish is 'Por favor' (pronounced: por fah-vor).",
    excuse: "Excuse me in Spanish is 'Perdón' (pronounced: pehr-dohn) or 'Disculpe' (dees-kool-peh).",
    time: "To ask for the time in Spanish, say '¿Qué hora es?' (pronounced: keh oh-rah es).",
    help: "Help in Spanish is 'Ayuda' (pronounced: ah-yoo-dah). To ask for help, say '¿Puede ayudarme?' (poo-eh-deh ah-yoo-dar-meh) which means 'Can you help me?'.",
    understand: "I understand in Spanish is 'Entiendo' (pronounced: en-tee-en-do). I don't understand is 'No entiendo' (no en-tee-en-do).",
    food: "Some essential food-related Spanish words include: restaurante (restaurant, pronounced: res-tau-ran-teh), café (kah-feh), menú (meh-noo), la cuenta (bill, pronounced: lah kwen-tah)."
  },
  japanese: {
    hello: "Hello in Japanese is 'Konnichiwa' (こんにちは, pronounced: kon-nee-chee-wah). In the morning, use 'Ohayou gozaimasu' (おはようございます, oh-hah-yoh go-zai-mahs), and in the evening, use 'Konbanwa' (こんばんは, kon-ban-wah).",
    goodbye: "Goodbye in Japanese is 'Sayonara' (さようなら, pronounced: sah-yoh-nah-rah) for longer partings. For casual 'see you later', use 'Ja ne' (じゃね, jah neh) or 'Mata ne' (またね, mah-tah neh).",
    thankyou: "Thank you in Japanese is 'Arigatou' (ありがとう, pronounced: ah-ree-gah-toh). For more politeness, say 'Arigatou gozaimasu' (ありがとうございます, ah-ree-gah-toh go-zai-mahs).",
    howareyou: "How are you in Japanese is 'Ogenki desu ka?' (お元気ですか？ pronounced: oh-gen-kee des-kah). To respond that you're fine, say 'Genki desu' (元気です, gen-kee des).",
    love: "Love in Japanese is 'Ai' (愛, pronounced: eye). To say 'I love you', use 'Aishiteru' (愛してる, eye-sh-teh-roo), though this phrase is used less frequently than in Western cultures.",
    yes: "Yes in Japanese is 'Hai' (はい, pronounced: high). In casual speech, 'Un' (うん, oon) can also mean yes.",
    no: "No in Japanese is 'Iie' (いいえ, pronounced: ee-eh). In casual speech, 'Uun' (ううん, oo-oon) can also mean no.",
    introduction: "To introduce yourself in Japanese, say 'Watashi wa [your name] desu' (私は[your name]です, wah-tah-she wah [your name] des), which means 'I am [your name]'.",
    please: "Please in Japanese is 'Onegai shimasu' (お願いします, pronounced: oh-neh-gai she-mahs).",
    excuse: "Excuse me in Japanese is 'Sumimasen' (すみません, pronounced: soo-mee-mah-sen).",
    time: "To ask for the time in Japanese, say 'Ima nanji desu ka?' (今何時ですか？ pronounced: ee-mah nan-jee des kah).",
    help: "Help in Japanese is 'Tasukete' (助けて, pronounced: tah-soo-keh-teh). To ask for help politely, say 'Tasukete kudasai' (助けてください, tah-soo-keh-teh koo-dah-sai).",
    understand: "I understand in Japanese is 'Wakarimasu' (分かります, pronounced: wah-kah-ree-mahs). I don't understand is 'Wakarimasen' (分かりません, wah-kah-ree-mah-sen).",
    food: "Some essential food-related Japanese words include: resutoran (レストラン, restaurant), kafe (カフェ, café), menyuu (メニュー, menu), okaikei (お会計, bill, pronounced: oh-kai-kei)."
  },
  german: {
    hello: "Hello in German is 'Hallo' (pronounced: hah-loh). 'Guten Morgen' (goo-ten mor-gen) means 'Good morning', 'Guten Tag' (goo-ten tahk) means 'Good day', and 'Guten Abend' (goo-ten ah-bent) means 'Good evening'.",
    goodbye: "Goodbye in German is 'Auf Wiedersehen' (pronounced: owf vee-der-zayn). For a more casual goodbye, you can say 'Tschüss' (choos) or 'Bis später' (bis shpay-ter) which means 'see you later'.",
    thankyou: "Thank you in German is 'Danke' (pronounced: dahn-kuh). For 'thank you very much', say 'Vielen Dank' (fee-len dahnk).",
    howareyou: "How are you in German is 'Wie geht es dir?' (pronounced: vee gayt es deer) for informal or 'Wie geht es Ihnen?' (vee gayt es ee-nen) for formal situations.",
    love: "Love in German is 'Liebe' (pronounced: lee-buh). To say 'I love you', use 'Ich liebe dich' (ikh lee-buh dikh).",
    yes: "Yes in German is 'Ja' (pronounced: yah).",
    no: "No in German is 'Nein' (pronounced: nine).",
    introduction: "To introduce yourself in German, say 'Ich heiße [your name]' (ikh hai-suh), or 'Ich bin [your name]' (ikh bin), which both mean 'I am [your name]'.",
    please: "Please in German is 'Bitte' (pronounced: bit-tuh), which also means 'you're welcome' when responding to thanks.",
    excuse: "Excuse me in German is 'Entschuldigung' (pronounced: ent-shool-di-goong).",
    time: "To ask for the time in German, say 'Wie spät ist es?' (pronounced: vee shpayt ist es) or 'Wie viel Uhr ist es?' (vee feel oor ist es).",
    help: "Help in German is 'Hilfe' (pronounced: hil-fuh). To ask for help, say 'Können Sie mir helfen?' (kur-nen zee meer hel-fen) which means 'Can you help me?'.",
    understand: "I understand in German is 'Ich verstehe' (pronounced: ikh fair-shtey-uh). I don't understand is 'Ich verstehe nicht' (ikh fair-shtey-uh nikht).",
    food: "Some essential food-related German words include: Restaurant (pronounced: res-to-rahnt), Café (kah-fay), Speisekarte (menu, pronounced: shpy-zuh-kar-tuh), die Rechnung (bill, pronounced: dee rekh-noong)."
  },
  italian: {
    hello: "Hello in Italian is 'Ciao' (pronounced: chow) for casual greetings. 'Buongiorno' (bwon-jor-no) means 'Good morning/day', and 'Buonasera' (bwon-ah-seh-rah) means 'Good evening'.",
    goodbye: "Goodbye in Italian is 'Arrivederci' (pronounced: ah-ree-veh-dehr-chee). For a more casual goodbye, you can use 'Ciao' again, as it works for both hello and goodbye.",
    thankyou: "Thank you in Italian is 'Grazie' (pronounced: grah-tsee-eh). For 'thank you very much', say 'Grazie mille' (grah-tsee-eh mee-leh).",
    howareyou: "How are you in Italian is 'Come stai?' (pronounced: koh-meh stai) for informal or 'Come sta?' (pronounced: koh-meh stah) for formal situations.",
    love: "Love in Italian is 'Amore' (pronounced: ah-mor-eh). To say 'I love you', use 'Ti amo' (tee ah-mo) for romantic relationships or 'Ti voglio bene' (tee vol-yo beh-neh) for family and friends.",
    yes: "Yes in Italian is 'Sì' (pronounced: see).",
    no: "No in Italian is 'No' (pronounced: noh).",
    introduction: "To introduce yourself in Italian, say 'Mi chiamo [your name]' (mee kee-ah-mo), or 'Sono [your name]' (so-no), which both mean 'I am [your name]'.",
    please: "Please in Italian is 'Per favore' (pronounced: pehr fah-vor-eh) or simply 'Per piacere' (pehr pya-cheh-reh).",
    excuse: "Excuse me in Italian is 'Scusi' (pronounced: scusi) or 'Mi scusi' (mee scusi).",
    time: "To ask for the time in Italian, say 'Che ora è?' (pronounced: keh or-ah eh).",
    help: "Help in Italian is 'Aiuto' (pronounced: ah-yoo-toh). To ask for help, say 'Può aiutarmi?' (poh-jee mee ah-zhoo-dar-mee) which means 'Can you help me?'.",
    understand: "I understand in Italian is 'Capisco' (pronounced: kah-pee-sko). I don't understand is 'Non capisco' (non kah-pee-sko).",
    food: "Some essential food-related Italian words include: ristorante (restaurant, pronounced: ree-stor-ahn-teh), caffè (kaf-feh), menù (meh-noo), il conto (bill, pronounced: eel kon-toh)."
  },
  korean: {
    hello: "Hello in Korean is 'Annyeonghaseyo' (안녕하세요, pronounced: ahn-nyong-ha-seh-yo). For a more casual greeting among friends, you can say 'Annyeong' (안녕, ahn-nyong).",
    goodbye: "Goodbye in Korean is 'Annyeonghi gaseyo' (안녕히 가세요, pronounced: ahn-nyong-hee gah-seh-yo) when the other person is leaving. If you're leaving, say 'Annyeonghi gyeseyo' (안녕히 계세요, ahn-nyong-hee gye-seh-yo).",
    thankyou: "Thank you in Korean is 'Gamsahamnida' (감사합니다, pronounced: gahm-sah-hahm-nee-dah). For a more casual thanks, you can say 'Gomawo' (고마워, go-mah-woh).",
    howareyou: "How are you in Korean is 'Eotteoke jineseoyo?' (어떻게 지내세요?, pronounced: uh-ttuh-keh jee-neh-seh-yo). A common response is 'Jal jinaego isseumnida' (잘 지내고 있습니다, jal jee-neh-go iss-seum-nee-dah) which means 'I'm doing well'.",
    love: "Love in Korean is 'Sarang' (사랑, pronounced: sah-rahng). To say 'I love you', use 'Saranghaeyo' (사랑해요, sah-rahng-heh-yo).",
    yes: "Yes in Korean is 'Ne' (네, pronounced: neh) or 'Ye' (예, yeh).",
    no: "No in Korean is 'Aniyo' (아니요, pronounced: ah-nee-yo).",
    introduction: "To introduce yourself in Korean, say 'Jeo-neun [your name] imnida' (저는 [your name] 입니다, chuh-neun [your name] im-nee-dah), which means 'I am [your name]'.",
    please: "Please in Korean is 'Juseyo' (주세요, pronounced: joo-seh-yo), which is often attached to the end of requests.",
    excuse: "Excuse me in Korean is 'Joesonghabnida' (죄송합니다, pronounced: jweh-song-hahm-nee-dah).",
    time: "To ask for the time in Korean, say 'Jigeum myeot si-eyo?' (지금 몇 시예요?, pronounced: jee-geum myeot shi-eh-yo).",
    help: "Help in Korean is 'Dowajuseyo' (도와주세요, pronounced: do-wah-joo-seh-yo) which directly means 'Please help me'.",
    understand: "I understand in Korean is 'Ihaehabnida' (이해합니다, pronounced: ee-heh-hahm-nee-dah). I don't understand is 'Ihae mothaeyo' (이해 못해요, ee-heh moht-heh-yo).",
    food: "Some essential food-related Korean words include: sikdang (식당, restaurant, pronounced: shik-dahng), kape (카페, café, pronounced: kah-peh), menyu (메뉴, menu, pronounced: meh-nyoo), gyesanseyo (계산세요, bill please, pronounced: gye-sahn-seh-yo)."
  },
  portuguese: {
    hello: "Hello in Portuguese is 'Olá' (pronounced: oh-lah). 'Bom dia' (bohm dee-ah) means 'Good morning', 'Boa tarde' (bo-ah tar-jee) means 'Good afternoon', and 'Boa noite' (bo-ah noy-chee) means 'Good evening/night'.",
    goodbye: "Goodbye in Portuguese is 'Adeus' (pronounced: ah-day-oosh) for longer partings. For 'see you later', use 'Até logo' (ah-teh lo-go) or 'Tchau' (chow) for a casual goodbye.",
    thankyou: "Thank you in Portuguese is 'Obrigado' (pronounced: oh-bree-gah-doo) if you're male or 'Obrigada' (oh-bree-gah-dah) if you're female. For 'thank you very much', say 'Muito obrigado/a' (moo-ee-too oh-bree-gah-doo/dah).",
    howareyou: "How are you in Portuguese is 'Como está?' (pronounced: koh-moh esh-tah) or 'Tudo bem?' (too-doo behng) which literally means 'Everything good?'.",
    love: "Love in Portuguese is 'Amor' (pronounced: ah-mor). To say 'I love you', use 'Eu te amo' (eh-oo chee ah-moo).",
    yes: "Yes in Portuguese is 'Sim' (pronounced: seem).",
    no: "No in Portuguese is 'Não' (pronounced: now).",
    introduction: "To introduce yourself in Portuguese, say 'Eu me chamo [your name]' (eh-oo mee shah-moo), or 'Eu sou [your name]' (eh-oo so), which both mean 'I am [your name]'.",
    please: "Please in Portuguese is 'Por favor' (pronounced: por fah-vor).",
    excuse: "Excuse me in Portuguese is 'Desculpe' (pronounced: desh-kool-pee) or 'Com licença' (kohm lee-sen-sah).",
    time: "To ask for the time in Portuguese, say 'Que horas são?' (pronounced: kee or-ahsh sow).",
    help: "Help in Portuguese is 'Ajuda' (pronounced: ah-zhoo-dah). To ask for help, say 'Pode me ajudar?' (poh-jee mee ah-zhoo-dar) which means 'Can you help me?'.",
    understand: "I understand in Portuguese is 'Eu entendo' (pronounced: eh-oo en-ten-doo). I don't understand is 'Eu não entendo' (eh-oo now en-ten-doo).",
    food: "Some essential food-related Portuguese words include: restaurante (restaurant, pronounced: heh-stow-rahn-chee), café (kah-feh), cardápio (menu, pronounced: kar-dah-pee-oo), a conta (bill, pronounced: ah kon-tah)."
  },
  hindi: {
    hello: "Hello in Hindi is 'Namaste' (नमस्ते, pronounced: nuh-muh-stay) with palms together in front of your chest. It works for any time of day and any level of formality.",
    goodbye: "Goodbye in Hindi is 'Alvida' (अलविदा, pronounced: al-vee-dah), although 'Namaste' is also commonly used when parting. You can also say 'Phir milenge' (फिर मिलेंगे, fir mi-len-gay) which means 'See you again'.",
    thankyou: "Thank you in Hindi is 'Dhanyavaad' (धन्यवाद, pronounced: dhuhn-yuh-vahd). For 'thank you very much', say 'Bahut dhanyavaad' (बहुत धन्यवाद, buh-hoot dhuhn-yuh-vahd).",
    howareyou: "How are you in Hindi is 'Aap kaise hain?' (आप कैसे हैं?, pronounced: aap kay-say hain) for formal or 'Tum kaise ho?' (तुम कैसे हो?, tum kay-say ho) for informal situations.",
    love: "Love in Hindi is 'Pyaar' (प्यार, pronounced: pyaar). To say 'I love you', use 'Main tumse pyaar karta hoon' (मैं तुमसे प्यार करता हूँ, main tum-say pyaar kar-taa hoon) for males or 'Main tumse pyaar karti hoon' (मैं तुमसे प्यार करती हूँ, main tum-say pyaar kar-tee hoon) for females.",
    yes: "Yes in Hindi is 'Haan' (हां, pronounced: haan) or 'Ji haan' (जी हां, jee haan) for a more polite affirmation.",
    no: "No in Hindi is 'Nahin' (नहीं, pronounced: nuh-heen) or 'Ji nahin' (जी नहीं, jee nuh-heen) for a more polite negation.",
    introduction: "To introduce yourself in Hindi, say 'Mera naam [your name] hai' (मेरा नाम [your name] है, may-raa naam [your name] hai), which means 'My name is [your name]'.",
    please: "Please in Hindi is 'Kripya' (कृपया, pronounced: krip-yaa).",
    excuse: "Excuse me in Hindi is 'Maaf kijiye' (माफ़ कीजिये, pronounced: maaf kee-jee-yay).",
    time: "To ask for the time in Hindi, say 'Kitne baje hain?' (कितने बजे हैं?, pronounced: kit-nay buh-jay hain).",
    help: "Help in Hindi is 'Madad' (मदद, pronounced: muh-duhd). To ask for help, say 'Kya aap meri madad kar sakte hain?' (क्या आप मेरी मदद कर सकते हैं?, kyaa aap may-ree muh-duhd kur suk-tay hain) which means 'Can you help me?'.",
    understand: "I understand in Hindi is 'Main samajhta hoon' (मैं समझता हूँ, pronounced: main sum-ujh-taa hoon) for males or 'Main samajhti hoon' (मैं समझती हूँ, main sum-ujh-tee hoon) for females. I don't understand is 'Main nahin samajhta/samajhti' (मैं नहीं समझता/समझती, main nuh-heen sum-ujh-taa/tee).",
    food: "Some essential food-related Hindi words include: restoraan (रेस्तरां, restaurant), kafe (कैफे, café), menu (मेन्यू, pronounced similar to English), bil (बिल, bill)."
  },
  english: {
    hello: "Hello is a common English greeting used throughout the day. Alternatives include 'Hi', 'Hey', 'Good morning', 'Good afternoon', and 'Good evening', depending on the time of day.",
    goodbye: "Goodbye is a formal English farewell. Casual alternatives include 'Bye', 'See you later', 'Take care', 'Catch you later', or 'See you soon'.",
    thankyou: "Thank you is the standard way to express gratitude in English. You can also say 'Thanks', 'Thanks a lot', 'Thank you very much', or 'I appreciate it'.",
    howareyou: "How are you? is a common greeting question in English. Alternatives include 'How's it going?', 'How are you doing?', 'What's up?', or 'How have you been?'",
    love: "Love in English refers to a deep affection or strong emotional attachment. To express this feeling, you can say 'I love you', 'I adore you', or 'You mean the world to me'.",
    yes: "Yes is the standard affirmative response in English. Alternatives include 'Yeah', 'Yep', 'Sure', 'Absolutely', or 'Definitely'.",
    no: "No is the standard negative response in English. Alternatives include 'Nope', 'Not really', 'I'm afraid not', or 'Unfortunately not'.",
    introduction: "To introduce yourself in English, you can say 'My name is [your name]', 'I'm [your name]', or in more formal situations, 'I'd like to introduce myself, I'm [your name]'.",
    please: "Please is used when making requests or asking for something. It makes your request more polite, as in 'Please pass the salt' or 'Could you please help me?'",
    excuse: "Excuse me is used to get someone's attention politely or to apologize for a minor inconvenience. For example, 'Excuse me, could you tell me the time?' or 'Excuse me for interrupting.'",
    time: "To ask for the time in English, you can say 'What time is it?', 'Do you have the time?', or 'Could you tell me what time it is, please?'",
    help: "Help is both a noun and verb in English. To ask for assistance, you can say 'Can you help me, please?', 'I need some help', or 'Would you mind giving me a hand?'",
    understand: "I understand shows comprehension in English. To express lack of understanding, say 'I don't understand', 'I'm confused', or 'Could you please explain that again?'",
    food: "Some essential food-related English words include: restaurant, café, menu, bill or check (in American English), waiter/waitress, reservation, and tip."
  }
};

const grammarExplanations = {
  french: [
    "In French, nouns have genders (masculine or feminine). Articles change based on the gender: 'le' (masculine) and 'la' (feminine), or 'l'' before vowels. For plural, use 'les' regardless of gender.",
    "French adjectives usually come after the noun and must agree in gender and number with the noun they modify. For example: 'une voiture rouge' (a red car) vs 'un livre rouge' (a red book).",
    "French verb conjugation depends on the subject pronoun and the tense. The main subject pronouns are je (I), tu (you, informal), il/elle (he/she), nous (we), vous (you, formal or plural), and ils/elles (they).",
    "Question formation in French can be done by inverting the verb and subject, as in 'Parles-tu français?' (Do you speak French?), or by keeping the statement structure and adding 'est-ce que' at the beginning: 'Est-ce que tu parles français?'",
    "Negation in French typically uses 'ne...pas' around the conjugated verb: 'Je ne parle pas français' (I don't speak French). In casual speech, the 'ne' is often dropped.",
    "French has several past tenses. The passé composé is used for completed actions, formed with having/being auxiliary verbs plus past participles: 'J'ai mangé' (I ate). The imparfait is used for ongoing past actions: 'Je mangeais' (I was eating)."
  ],
  spanish: [
    "In Spanish, nouns have genders (masculine or feminine). Masculine nouns often end in -o, feminine nouns in -a, though there are many exceptions. Articles are 'el' (masculine), 'la' (feminine), 'los' (masculine plural), and 'las' (feminine plural).",
    "Spanish adjectives usually come after the noun and must agree in gender and number with the noun. For example: 'la casa blanca' (the white house) vs 'el coche blanco' (the white car).",
    "Spanish uses two forms of 'to be': 'ser' for permanent traits, origin, profession, and time, while 'estar' is used for temporary states, locations, and ongoing actions.",
    "Spanish verbs are conjugated based on the subject and tense. The main subject pronouns are yo (I), tú (you, informal), él/ella (he/she), nosotros/as (we), vosotros/as (you, plural, Spain), ustedes (you, plural, Latin America), and ellos/ellas (they).",
    "Question formation in Spanish is often done by simply changing the intonation of a statement, or by inverting the subject and verb. Questions are also marked with inverted question marks at the beginning: '¿Hablas español?' (Do you speak Spanish?)",
    "Negation in Spanish puts 'no' directly before the verb: 'No hablo español' (I don't speak Spanish).",
    "Spanish has several past tenses. The preterite (pretérito) is used for completed actions: 'Comí' (I ate). The imperfect (imperfecto) is used for habitual actions or ongoing situations in the past: 'Comía' (I used to eat/I was eating)."
  ],
  japanese: [
    "Japanese sentences follow a Subject-Object-Verb order, unlike English's Subject-Verb-Object. For example: 'Watashi wa ringo o tabemasu' (私はりんごを食べます) means 'I apple eat' or 'I eat an apple'.",
    "Japanese nouns don't have gender or plural forms. Context usually indicates plurality, although counters or words like 'many' can be added for clarity.",
    "Japanese uses particles (は, が, を, に, etc.) to mark the grammatical function of words. For example, は (wa) marks the topic, が (ga) marks the subject, を (o) marks the direct object.",
    "Japanese verbs change form based on politeness level and tense, not on the subject. The polite form ends in -masu (食べます, tabemasu), while the plain form is used in casual settings (食べる, taberu).",
    "Verb negation in polite form adds -masen (食べません, tabemasen) and in plain form changes the ending to -nai (食べない, tabenai).",
    "Japanese doesn't use articles like 'a' or 'the'. Context usually clarifies whether a noun is definite or indefinite.",
    "Japanese uses a system of honorifics (san, kun, chan, sama, etc.) after names to show respect or indicate relationships. For example, 'Tanaka-san' is a respectful way to refer to someone named Tanaka."
  ],
  german: [
    "German nouns have three genders: masculine, feminine, and neuter. The definite articles are 'der' (masculine), 'die' (feminine), and 'das' (neuter). In plural, all nouns use 'die' regardless of gender.",
    "German has four cases: nominative (subject), accusative (direct object), dative (indirect object), and genitive (possession). The articles and adjective endings change based on the case.",
    "German word order typically puts the conjugated verb in the second position in main clauses: 'Ich gehe heute ins Kino' (I'm going to the movies today). In subordinate clauses, the verb moves to the end: 'Ich weiß, dass er heute ins Kino geht' (I know that he's going to the movies today).",
    "German capitalizes all nouns, not just proper nouns as in English.",
    "In German, verb conjugation depends on the subject. The main subject pronouns are ich (I), du (you, informal), er/sie/es (he/she/it), wir (we), ihr (you, plural informal), Sie (you, formal, singular or plural), and sie (they).",
    "German has compound words that combine two or more words together, sometimes creating very long words. For example, 'Freundschaftsbeziehung' (friendship relationship) or 'Donaudampfschifffahrtsgesellschaftskapitän' (Danube steamship company captain).",
    "Question formation in German involves inverting the subject and verb: 'Sprichst du Deutsch?' (Do you speak German?)."
  ],
  italian: [
    "In Italian, nouns have genders (masculine or feminine). Masculine nouns often end in -o, feminine nouns in -a, though there are exceptions. Articles are 'il/lo/l'' (masculine), 'la/l'' (feminine), 'i/gli' (masculine plural), and 'le' (feminine plural).",
    "Italian adjectives usually agree in gender and number with the noun they modify and typically follow the noun. For example: 'una casa bella' (a beautiful house) vs 'un libro bello' (a beautiful book).",
    "Italian verb conjugation depends on the subject. The main subject pronouns are io (I), tu (you, informal), lui/lei (he/she), noi (we), voi (you, plural), and loro (they).",
    "In Italian, subject pronouns are often omitted because the verb ending already indicates the person: 'Parlo italiano' (I speak Italian) instead of 'Io parlo italiano'.",
    "Question formation in Italian is often done by changing the intonation of a statement or by using question words (chi - who, cosa - what, come - how, dove - where, quando - when, perché - why) to construct interrogative sentences.",
    "The word order in Italian questions remains similar to statements, with the question word placed at the beginning or integrated into the sentence."
  ]
};

const AiAssistant = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button size="icon" variant="default" className="rounded-full shadow-lg">
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AiAssistant;
