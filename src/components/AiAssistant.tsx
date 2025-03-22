
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

// Enhanced language-specific responses for common questions
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
    please: "Please in French is 'S'il vous plaît' (formal, pronounced: seel voo pleh) or 'S'il te plaît' (casual, pronounced: seel tuh pleh).",
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
    howareyou: "How are you in Italian is 'Come stai?' (pronounced: koh-meh stai) for informal or 'Come sta?' (koh-meh stah) for formal situations.",
    love: "Love in Italian is 'Amore' (pronounced: ah-mor-eh). To say 'I love you', use 'Ti amo' (tee ah-mo) for romantic relationships or 'Ti voglio bene' (tee vol-yo beh-neh) for family and friends.",
    yes: "Yes in Italian is 'Sì' (pronounced: see).",
    no: "No in Italian is 'No' (pronounced: noh).",
    introduction: "To introduce yourself in Italian, say 'Mi chiamo [your name]' (mee kee-ah-mo), or 'Sono [your name]' (so-no), which both mean 'I am [your name]'.",
    please: "Please in Italian is 'Per favore' (pronounced: pehr fah-vor-eh) or simply 'Per piacere' (pehr pya-cheh-reh).",
    excuse: "Excuse me in Italian is 'Scusi' (pronounced: skoo-zee) or 'Mi scusi' (mee skoo-zee).",
    time: "To ask for the time in Italian, say 'Che ora è?' (pronounced: keh or-ah eh).",
    help: "Help in Italian is 'Aiuto' (pronounced: ah-yoo-toh). To ask for help, say 'Può aiutarmi?' (pwoh ah-yoo-tar-mee) which means 'Can you help me?'.",
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

// Comprehensive grammar explanations for each language
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
    "Question formation in Italian is often done by changing the intonation of a statement or by using question words (chi, cosa, quando, dove, perché, come).",
    "Italian uses prepositions combined with articles (preposizioni articolate). For example, 'di' (of) + 'il' (the) becomes 'del': 'il libro del ragazzo' (the boy's book).",
    "Italian has several past tenses. The passato prossimo is used for completed actions, formed with avere/essere plus past participles: 'Ho mangiato' (I ate). The imperfetto is used for ongoing past actions: 'Mangiavo' (I was eating)."
  ],
  korean: [
    "Korean sentence structure follows a Subject-Object-Verb order, similar to Japanese. For example: '나는 사과를 먹습니다' (Na-neun sagwa-reul meomnida) means 'I apple eat' or 'I eat an apple'.",
    "Korean uses particles (은/는, 이/가, 을/를, etc.) attached to nouns to mark their grammatical function. For example, 은/는 (eun/neun) marks the topic, 이/가 (i/ga) marks the subject, 을/를 (eul/reul) marks the object.",
    "Korean verbs don't change form based on the subject (no conjugation for I, you, he, etc.), but they do change based on tense, formality level, and sentence type.",
    "Korean has a complex system of speech levels that reflect the relationship between the speaker, listener, and subject. The polite formal ending -습니다 (-seumnida) is commonly used in formal settings.",
    "Korean doesn't use articles like 'a' or 'the'. Context usually clarifies whether a noun is definite or indefinite.",
    "Korean uses honorifics to show respect, especially when referring to or addressing someone of higher social status or age. The suffix -님 (-nim) is added to titles and sometimes names.",
    "Counter words in Korean are used after numbers when counting objects, similar to Japanese. Different counters are used for different types of objects."
  ],
  portuguese: [
    "In Portuguese, nouns have genders (masculine or feminine). Articles are 'o' (masculine), 'a' (feminine), 'os' (masculine plural), and 'as' (feminine plural).",
    "Portuguese adjectives must agree in gender and number with the noun they modify and typically follow the noun. For example: 'uma casa bonita' (a beautiful house) vs 'um livro bonito' (a beautiful book).",
    "Portuguese verb conjugation is quite complex, with different endings for each person and tense. The main subject pronouns are eu (I), tu/você (you, informal), ele/ela (he/she), nós (we), vós/vocês (you, plural), and eles/elas (they).",
    "Brazilian Portuguese and European Portuguese have some differences in vocabulary, pronunciation, and grammar. For example, the pronoun 'você' is common in Brazil, while 'tu' is more common in Portugal.",
    "Question formation in Portuguese is often done by changing the intonation of a statement or by using question words (quem, o que, quando, onde, por que, como).",
    "Like Spanish, Portuguese uses two main verbs for 'to be': 'ser' for permanent traits and 'estar' for temporary states and locations.",
    "Contractions are common in Portuguese, where prepositions combine with articles or pronouns. For example, 'de' (of) + 'o' (the) becomes 'do': 'o livro do menino' (the boy's book)."
  ],
  hindi: [
    "Hindi sentences typically follow a Subject-Object-Verb order. For example: 'मैं सेब खाता हूँ' (Main seb khata hoon) means 'I apple eat' or 'I eat an apple'.",
    "Hindi nouns have two genders (masculine and feminine) and can be singular or plural. Articles like 'a' or 'the' don't exist in Hindi.",
    "Hindi verbs change form based on the gender and number of the subject, as well as tense and aspect. For instance, 'khata hoon' (खाता हूँ) for male speakers and 'khati hoon' (खाती हूँ) for female speakers, both meaning 'I eat'.",
    "Postpositions in Hindi follow nouns (unlike English prepositions which come before nouns). For example, 'on the table' would be 'mez par' (मेज़ पर) where 'par' (on) comes after 'mez' (table).",
    "Hindi has formal and informal forms of 'you': 'aap' (आप) for formal or respectful address, 'tum' (तुम) for informal, and 'tu' (तू) for very informal or intimate relationships.",
    "Hindi uses the Devanagari script, which is an abugida where each character represents a consonant with an inherent vowel, and other vowels are indicated with diacritical marks.",
    "Word order in Hindi is more flexible than in English, with emphasis often indicated by placement within the sentence rather than by stress or intonation."
  ],
  english: [
    "English follows a Subject-Verb-Object word order in most sentences. For example: 'I eat an apple' not 'I an apple eat'.",
    "English uses articles ('a', 'an', 'the') before nouns. 'The' is the definite article used for specific items, while 'a/an' are indefinite articles used for non-specific items.",
    "English nouns generally form plurals by adding -s or -es, with some irregular exceptions (child/children, foot/feet).",
    "English verbs change form based on tense and the subject (primarily in third person singular present tense: he/she/it walks vs. I/you/we/they walk).",
    "Question formation in English often involves auxiliary verbs ('do', 'does', 'did') or inverting the subject and verb: 'Do you speak English?' or 'Are you happy?'",
    "English has 12 major tenses combining aspects (simple, continuous, perfect) with time (past, present, future).",
    "English is considered a Germanic language but has been heavily influenced by Latin, French, and many other languages, resulting in a rich and diverse vocabulary."
  ]
};

// Advanced language learning tips
const learningTips = {
  general: [
    "Regular, short practice sessions are more effective than occasional long ones. Try to practice at least 15-20 minutes every day.",
    "Immerse yourself in the language by watching movies, TV shows, or YouTube videos in your target language. Start with subtitles in your native language, then switch to subtitles in the target language.",
    "Listen to podcasts or music in your target language during commutes or while doing chores.",
    "Language exchange apps like Tandem or HelloTalk can connect you with native speakers for conversation practice.",
    "Set realistic goals and track your progress. Celebrate small victories along the way.",
    "Focus on the most common 1000 words first - they make up about 80% of everyday conversations.",
    "Use spaced repetition systems like Anki for vocabulary review.",
    "Don't be afraid to make mistakes! They're an essential part of the learning process.",
    "Try the shadowing technique: listen to a native speaker and repeat what they say immediately, mimicking their pronunciation and intonation.",
    "Context-based learning is more effective than memorizing isolated words. Learn phrases and sentences rather than individual vocabulary items."
  ],
  pronunciation: [
    "Practice with tongue twisters in your target language to improve pronunciation of difficult sounds.",
    "Record yourself speaking and compare it to native speakers to identify areas for improvement.",
    "Pay attention to the rhythm and intonation patterns of the language, not just individual sounds.",
    "Learn the International Phonetic Alphabet (IPA) symbols for your target language to understand pronunciation guides.",
    "Watch mouth movement tutorials for sounds that don't exist in your native language."
  ],
  grammar: [
    "Focus on understanding grammar patterns rather than memorizing rules.",
    "Learn one grammar concept at a time and practice it extensively before moving on.",
    "Compare grammar structures to those in your native language to understand similarities and differences.",
    "Use color coding to visualize different parts of speech or grammatical functions.",
    "Create your own example sentences using new grammar patterns."
  ],
  vocabulary: [
    "Group vocabulary by themes or topics rather than alphabetically.",
    "Use mnemonic devices or visual associations to remember challenging words.",
    "Create physical or digital flashcards with the word on one side and the definition, usage example, or image on the other.",
    "Label objects in your home with their names in the target language.",
    "Keep a vocabulary notebook and review it regularly.",
    "Learn vocabulary in context rather than as isolated words."
  ]
};

// Common conversation topics with phrases
const conversationTopics = {
  greetings: {
    french: ["Bonjour! (Hello!)", "Comment allez-vous? (How are you?)", "Enchanté(e). (Pleased to meet you.)", "À plus tard! (See you later!)"],
    spanish: ["¡Hola! (Hello!)", "¿Cómo estás? (How are you?)", "Mucho gusto. (Nice to meet you.)", "¡Hasta luego! (See you later!)"],
    japanese: ["こんにちは！ (Konnichiwa! - Hello!)", "お元気ですか？ (Ogenki desu ka? - How are you?)", "はじめまして。(Hajimemashite. - Nice to meet you.)", "また後で！ (Mata ato de! - See you later!)"],
    german: ["Hallo! (Hello!)", "Wie geht es dir? (How are you?)", "Freut mich, dich kennenzulernen. (Nice to meet you.)", "Bis später! (See you later!)"],
    italian: ["Ciao! (Hello!)", "Come stai? (How are you?)", "Piacere di conoscerti. (Nice to meet you.)", "A più tardi! (See you later!)"],
    korean: ["안녕하세요! (Annyeonghaseyo! - Hello!)", "어떻게 지내세요? (Eotteoke jineseoyo? - How are you?)", "만나서 반갑습니다. (Mannaseo bangapseumnida. - Nice to meet you.)", "나중에 봐요! (Najunge bwayo! - See you later!)"],
    portuguese: ["Olá! (Hello!)", "Como está? (How are you?)", "Prazer em conhecê-lo(a). (Nice to meet you.)", "Até logo! (See you later!)"],
    hindi: ["नमस्ते! (Namaste! - Hello!)", "आप कैसे हैं? (Aap kaise hain? - How are you?)", "आपसे मिलकर खुशी हुई। (Aapse milkar khushi hui. - Nice to meet you.)", "फिर मिलेंगे! (Phir milenge! - See you later!)"]
  },
  dining: {
    french: ["Je voudrais réserver une table. (I would like to reserve a table.)", "L'addition, s'il vous plaît. (The bill, please.)", "C'est délicieux! (This is delicious!)", "Qu'est-ce que vous recommandez? (What do you recommend?)"],
    spanish: ["Quisiera reservar una mesa. (I would like to reserve a table.)", "La cuenta, por favor. (The bill, please.)", "¡Está delicioso! (This is delicious!)", "¿Qué recomienda? (What do you recommend?)"],
    japanese: ["予約をしたいです。 (Yoyaku o shitai desu. - I would like to make a reservation.)", "お会計をお願いします。 (Okaikei o onegai shimasu. - The bill, please.)", "美味しいです！ (Oishii desu! - This is delicious!)", "おすすめは何ですか？ (Osusume wa nan desu ka? - What do you recommend?)"],
    german: ["Ich möchte einen Tisch reservieren. (I would like to reserve a table.)", "Die Rechnung, bitte. (The bill, please.)", "Das ist köstlich! (This is delicious!)", "Was empfehlen Sie? (What do you recommend?)"],
    italian: ["Vorrei prenotare un tavolo. (I would like to reserve a table.)", "Il conto, per favore. (The bill, please.)", "È delizioso! (This is delicious!)", "Cosa consiglia? (What do you recommend?)"],
    korean: ["예약하고 싶습니다. (Yeyakago sipseumnida. - I would like to make a reservation.)", "계산서 주세요. (Gyesanseo juseyo. - The bill, please.)", "맛있어요! (Mashisseoyo! - This is delicious!)", "추천하시는 것이 있나요? (Chucheonhasineun geosi issnayo? - What do you recommend?)"],
    portuguese: ["Eu gostaria de reservar uma mesa. (I would like to reserve a table.)", "A conta, por favor. (The bill, please.)", "Está delicioso! (This is delicious!)", "O que você recomenda? (What do you recommend?)"],
    hindi: ["मैं एक टेबल आरक्षित करना चाहूंगा/चाहूंगी। (Main ek table aarakshit karna chahunga/chahungi. - I would like to reserve a table.)", "बिल, कृपया। (Bill, kripya. - The bill, please.)", "यह स्वादिष्ट है! (Yah svaadisht hai! - This is delicious!)", "आप क्या अनुशंसा करते हैं? (Aap kya anushansa karte hain? - What do you recommend?)"]
  },
  shopping: {
    french: ["Combien ça coûte? (How much does this cost?)", "Je cherche... (I'm looking for...)", "C'est trop cher. (That's too expensive.)", "Avez-vous ceci en une autre taille/couleur? (Do you have this in another size/color?)"],
    spanish: ["¿Cuánto cuesta esto? (How much does this cost?)", "Estoy buscando... (I'm looking for...)", "Es demasiado caro. (That's too expensive.)", "¿Tiene esto en otro tamaño/color? (Do you have this in another size/color?)"],
    japanese: ["これはいくらですか？ (Kore wa ikura desu ka? - How much does this cost?)", "～を探しています。 (~ o sagashite imasu. - I'm looking for...)", "それは高すぎます。 (Sore wa takasugimasu. - That's too expensive.)", "これは別のサイズ／色がありますか？ (Kore wa betsu no saizu/iro ga arimasu ka? - Do you have this in another size/color?)"],
    german: ["Wie viel kostet das? (How much does this cost?)", "Ich suche... (I'm looking for...)", "Das ist zu teuer. (That's too expensive.)", "Haben Sie das in einer anderen Größe/Farbe? (Do you have this in another size/color?)"],
    italian: ["Quanto costa questo? (How much does this cost?)", "Sto cercando... (I'm looking for...)", "È troppo costoso. (That's too expensive.)", "Avete questo in un'altra taglia/colore? (Do you have this in another size/color?)"],
    korean: ["이거 얼마예요? (Igeo eolmayeyo? - How much does this cost?)", "저는 ...을/를 찾고 있어요. (Jeoneun ...eul/reul chatgo isseoyo. - I'm looking for...)", "너무 비싸요. (Neomu bissayo. - That's too expensive.)", "이것 다른 사이즈/색상 있어요? (Igeot dareun saijeu/saeksang isseoyo? - Do you have this in another size/color?)"],
    portuguese: ["Quanto custa isto? (How much does this cost?)", "Estou procurando... (I'm looking for...)", "É muito caro. (That's too expensive.)", "Tem isto em outro tamanho/cor? (Do you have this in another size/color?)"],
    hindi: ["यह कितने का है? (Yeh kitne ka hai? - How much does this cost?)", "मैं ... ढूंढ रहा/रही हूं। (Main ... dhoondh raha/rahi hoon. - I'm looking for...)", "यह बहुत महंगा है। (Yeh bahut mehnga hai. - That's too expensive.)", "क्या आपके पास यह दूसरे आकार/रंग में है? (Kya aapke paas yeh doosre aakar/rang mein hai? - Do you have this in another size/color?)"]
  },
  directions: {
    french: ["Où est...? (Where is...?)", "Tournez à gauche/droite. (Turn left/right.)", "Allez tout droit. (Go straight ahead.)", "C'est loin d'ici? (Is it far from here?)"],
    spanish: ["¿Dónde está...? (Where is...?)", "Gire a la izquierda/derecha. (Turn left/right.)", "Siga recto. (Go straight ahead.)", "¿Está lejos de aquí? (Is it far from here?)"],
    japanese: ["～はどこですか？ (~ wa doko desu ka? - Where is...?)", "左/右に曲がってください。 (Hidari/migi ni magatte kudasai. - Turn left/right.)", "まっすぐ行ってください。 (Massugu itte kudasai. - Go straight ahead.)", "ここから遠いですか？ (Koko kara tooi desu ka? - Is it far from here?)"],
    german: ["Wo ist...? (Where is...?)", "Biegen Sie links/rechts ab. (Turn left/right.)", "Gehen Sie geradeaus. (Go straight ahead.)", "Ist es weit von hier? (Is it far from here?)"],
    italian: ["Dov'è...? (Where is...?)", "Giri a sinistra/destra. (Turn left/right.)", "Vada dritto. (Go straight ahead.)", "È lontano da qui? (Is it far from here?)"],
    korean: ["...이/가 어디에 있어요? (...i/ga eodie isseoyo? - Where is...?)", "왼쪽/오른쪽으로 돌아가세요. (Oenjjok/oreunjjogeuro doragaseyo. - Turn left/right.)", "직진하세요. (Jikjinhaseyo. - Go straight ahead.)", "여기서 멀어요? (Yeogiseo meoreoyo? - Is it far from here?)"],
    portuguese: ["Onde está...? (Where is...?)", "Vire à esquerda/direita. (Turn left/right.)", "Siga em frente. (Go straight ahead.)", "É longe daqui? (Is it far from here?)"],
    hindi: ["... कहां है? (... kahaan hai? - Where is...?)", "बाएं/दाएं मुड़ें। (Baayen/daayen muden. - Turn left/right.)", "सीधे जाएं। (Seedhe jaayen. - Go straight ahead.)", "क्या यह यहां से दूर है? (Kya yeh yahaan se door hai? - Is it far from here?)"]
  },
  emergencies: {
    french: ["Au secours! (Help!)", "J'ai besoin d'un médecin. (I need a doctor.)", "Appelez une ambulance! (Call an ambulance!)", "Où est l'hôpital le plus proche? (Where is the nearest hospital?)"],
    spanish: ["¡Socorro! (Help!)", "Necesito un médico. (I need a doctor.)", "¡Llame a una ambulancia! (Call an ambulance!)", "¿Dónde está el hospital más cercano? (Where is the nearest hospital?)"],
    japanese: ["助けて！ (Tasukete! - Help!)", "医者が必要です。 (Isha ga hitsuyou desu. - I need a doctor.)", "救急車を呼んでください！ (Kyuukyuusha o yonde kudasai! - Call an ambulance!)", "最寄りの病院はどこですか？ (Moyori no byouin wa doko desu ka? - Where is the nearest hospital?)"],
    german: ["Hilfe! (Help!)", "Ich brauche einen Arzt. (I need a doctor.)", "Rufen Sie einen Krankenwagen! (Call an ambulance!)", "Wo ist das nächste Krankenhaus? (Where is the nearest hospital?)"],
    italian: ["Aiuto! (Help!)", "Ho bisogno di un medico. (I need a doctor.)", "Chiami un'ambulanza! (Call an ambulance!)", "Dov'è l'ospedale più vicino? (Where is the nearest hospital?)"],
    korean: ["도와주세요! (Dowajuseyo! - Help!)", "의사가 필요해요. (Uisaga pilyohaeyo. - I need a doctor.)", "구급차를 불러주세요! (Gugeupchareul bulleojuseyo! - Call an ambulance!)", "가장 가까운 병원이 어디예요? (Gajang gakkaun byeongwoni eodiyeyo? - Where is the nearest hospital?)"],
    portuguese: ["Socorro! (Help!)", "Preciso de um médico. (I need a doctor.)", "Chame uma ambulância! (Call an ambulance!)", "Onde é o hospital mais próximo? (Where is the nearest hospital?)"],
    hindi: ["बचाओ! (Bachao! - Help!)", "मुझे एक डॉक्टर की जरूरत है। (Mujhe ek doctor ki zaroorat hai. - I need a doctor.)", "एम्बुलेंस बुलाओ! (Ambulance bulao! - Call an ambulance!)", "निकटतम अस्पताल कहां है? (Nikatam aspatal kahaan hai? - Where is the nearest hospital?)"]
  }
};

// Function to generate a more comprehensive response based on detected keywords in the user message
const generateResponse = (message: string): string => {
  // Converting to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Detect language
  let language = "english"; // Default
  if (lowerMessage.includes("french") || lowerMessage.includes("france")) {
    language = "french";
  } else if (lowerMessage.includes("spanish") || lowerMessage.includes("spain") || lowerMessage.includes("español")) {
    language = "spanish";
  } else if (lowerMessage.includes("japanese") || lowerMessage.includes("japan") || lowerMessage.includes("nihongo")) {
    language = "japanese";
  } else if (lowerMessage.includes("german") || lowerMessage.includes("germany") || lowerMessage.includes("deutsch")) {
    language = "german";
  } else if (lowerMessage.includes("italian") || lowerMessage.includes("italy") || lowerMessage.includes("italiano")) {
    language = "italian";
  } else if (lowerMessage.includes("korean") || lowerMessage.includes("korea") || lowerMessage.includes("hangul")) {
    language = "korean";
  } else if (lowerMessage.includes("portuguese") || lowerMessage.includes("portugal") || lowerMessage.includes("brazil") || lowerMessage.includes("português")) {
    language = "portuguese";
  } else if (lowerMessage.includes("hindi") || lowerMessage.includes("india") || lowerMessage.includes("urdu")) {
    language = "hindi";
  }
  
  // Check for language learning tips
  if (lowerMessage.includes("tip") || lowerMessage.includes("advice") || lowerMessage.includes("suggestion") || lowerMessage.includes("how to learn") || lowerMessage.includes("how can i learn")) {
    if (lowerMessage.includes("pronunciation") || lowerMessage.includes("accent") || lowerMessage.includes("sound") || lowerMessage.includes("speak")) {
      return `Here's some advice for improving your ${language} pronunciation: ${learningTips.pronunciation[Math.floor(Math.random() * learningTips.pronunciation.length)]}`;
    } else if (lowerMessage.includes("grammar") || lowerMessage.includes("structure") || lowerMessage.includes("syntax")) {
      return `Here's a grammar learning tip for ${language}: ${learningTips.grammar[Math.floor(Math.random() * learningTips.grammar.length)]}`;
    } else if (lowerMessage.includes("vocabulary") || lowerMessage.includes("words") || lowerMessage.includes("phrases")) {
      return `Here's a vocabulary learning tip for ${language}: ${learningTips.vocabulary[Math.floor(Math.random() * learningTips.vocabulary.length)]}`;
    } else {
      return `Here's a general language learning tip: ${learningTips.general[Math.floor(Math.random() * learningTips.general.length)]}`;
    }
  }
  
  // Check for conversation topics
  if (lowerMessage.includes("conversation") || lowerMessage.includes("talk about") || lowerMessage.includes("speak about") || lowerMessage.includes("discuss")) {
    if (lowerMessage.includes("greet") || lowerMessage.includes("introduction") || lowerMessage.includes("meet")) {
      const phrases = conversationTopics.greetings[language as keyof typeof conversationTopics.greetings] || conversationTopics.greetings.english;
      return `Here are some common greeting phrases in ${language}:\n\n${phrases.join("\n")}`;
    } else if (lowerMessage.includes("restaurant") || lowerMessage.includes("food") || lowerMessage.includes("eat") || lowerMessage.includes("dining")) {
      const phrases = conversationTopics.dining[language as keyof typeof conversationTopics.dining] || conversationTopics.dining.english;
      return `Here are some useful dining phrases in ${language}:\n\n${phrases.join("\n")}`;
    } else if (lowerMessage.includes("shop") || lowerMessage.includes("buy") || lowerMessage.includes("store") || lowerMessage.includes("market")) {
      const phrases = conversationTopics.shopping[language as keyof typeof conversationTopics.shopping] || conversationTopics.shopping.english;
      return `Here are some useful shopping phrases in ${language}:\n\n${phrases.join("\n")}`;
    } else if (lowerMessage.includes("direction") || lowerMessage.includes("way") || lowerMessage.includes("lost") || lowerMessage.includes("map")) {
      const phrases = conversationTopics.directions[language as keyof typeof conversationTopics.directions] || conversationTopics.directions.english;
      return `Here are some useful phrases for asking directions in ${language}:\n\n${phrases.join("\n")}`;
    } else if (lowerMessage.includes("emergency") || lowerMessage.includes("help") || lowerMessage.includes("hospital") || lowerMessage.includes("doctor")) {
      const phrases = conversationTopics.emergencies[language as keyof typeof conversationTopics.emergencies] || conversationTopics.emergencies.english;
      return `Here are some crucial emergency phrases in ${language}:\n\n${phrases.join("\n")}`;
    }
  }
  
  // Detect word/phrase using enhanced responses
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
  } else if (lowerMessage.includes("introduce") || lowerMessage.includes("introduction") || lowerMessage.includes("myself")) {
    return (responses as any).introduction || "To introduce yourself, start with a greeting and then say your name.";
  } else if (lowerMessage.includes("please")) {
    return (responses as any).please || "The word 'please' is essential for polite communication.";
  } else if (lowerMessage.includes("excuse")) {
    return (responses as any).excuse || "Knowing how to say 'excuse me' is important for polite interruptions or getting attention.";
  } else if (lowerMessage.includes("time") && (lowerMessage.includes("ask") || lowerMessage.includes("what"))) {
    return (responses as any).time || "Asking for the time is a common and useful phrase to know.";
  } else if (lowerMessage.includes("help")) {
    return (responses as any).help || "Knowing how to ask for help is essential, especially in emergency situations.";
  } else if (lowerMessage.includes("understand")) {
    return (responses as any).understand || "Expressing whether you understand something is key for effective communication.";
  } else if (lowerMessage.includes("food") || lowerMessage.includes("restaurant") || lowerMessage.includes("eat")) {
    return (responses as any).food || "Food vocabulary is essential for travelers and language learners alike.";
  } else if (lowerMessage.includes("grammar")) {
    const grammarInfo = grammarExplanations[language as keyof typeof grammarExplanations];
    if (grammarInfo && grammarInfo.length > 0) {
      return grammarInfo[Math.floor(Math.random() * grammarInfo.length)];
    }
  }
  
  // General responses if no keyword match
  const generalResponses = [
    `I can help with ${language} vocabulary, grammar, and pronunciation. What specific word or phrase would you like to learn?`,
    `For better ${language} learning, try practicing with short dialogues. Would you like an example conversation?`,
    `In ${language}, pronunciation is key. Would you like me to help you with a specific sound or word?`,
    `I can translate simple phrases to ${language}. What would you like to know how to say?`,
    `${language} has some fascinating cultural aspects that affect the language. Would you like to learn about any cultural context?`
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your language learning assistant. How can I help you today? Ask me about grammar, vocabulary, pronunciation, or anything language-related!",
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
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if SpeechRecognition is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                     (window as any).webkitSpeechRecognition;
        
        recognitionRef.current = new SpeechRecognitionAPI();
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          
          recognitionRef.current.onresult = (event: any) => {
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
