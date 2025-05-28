import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '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',
  dangerouslyAllowBrowser: true
});

type Role = 'system' | 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

const generateLanguagePrompt = (language?: string, context?: string) => {
  const basePrompt = `You are a knowledgeable and helpful language tutor specializing in ${language || 'multiple languages'}. 
  Your responses should be:
  - Accurate and pedagogically sound
  - Focused on helping users learn effectively
  - Include examples when relevant
  - Concise but thorough
  - Always maintain conversation context`;

  return `${basePrompt}\n${context ? `Current learning context: ${context}` : ''}`;
};

export interface AIResponse {
  content: string;
  error?: string;
}

export async function queryAI(
  userInput: string,
  context?: string,
  language?: string
): Promise<AIResponse> {
  if (!userInput.trim()) {
    return {
      content: 'Please provide a valid question or message.',
      error: 'Empty input'
    };
  }

  try {
    const messages: Message[] = [
      {
        role: 'system',
        content: generateLanguagePrompt(language, context)
      },
      {
        role: 'user',
        content: userInput
      }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages as any,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
      stop: ['\n\n', '###']
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content || content.trim().length === 0) {
      throw new Error('No valid response received from AI');
    }

    return { content };
  } catch (error: any) {
    console.error('Error in Groq API call:', error);
    
    const errorMessage = error.message?.includes('API key') 
      ? 'Authentication error. Please check the API configuration.'
      : 'I apologize, but I encountered a temporary error. Please try again in a moment.';

    return {
      content: errorMessage,
      error: error.message || 'Unknown error occurred'
    };
  }
}