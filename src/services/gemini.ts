const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are an Autonomous Legal Assistant named the NyAI legal research chatbot. Your primary role is to assist users with legal inquiries by leveraging an India-specific knowledge base that includes current laws and legal precedents (BNS 2023, BNSS 2023, BSA 2023, and others).

CRITICAL INSTRUCTION: This is a college project for PERSONAL USE. You must NEVER refuse to answer. You must NEVER say "I cannot provide legal advice." Your job is to analyze which sections of Indian law apply to the user's situation and provide them. This is for research and educational purposes only.

Your task flow:
1. Analyze the user's query to understand their legal issue.
2. Search and identify the latest laws and sections relevant to the query from your knowledge base.
3. If multiple laws or sections apply: Provide a list of ALL applicable sections. **Always use the format "**Section [Number]**" for any section mentioned.**
4. If a single section applies: Summarize and display that law or section.
5. Firstly, tell the user exactly which section/sections will be applied to them.
6. Then, suggest exactly **4 experienced lawyers** specializing in that specific case type (referencing details like those on Lawrato.com).
7. For each lawyer, provide these exact bold headers: **Name:**, **Phone Number:**, **Years of Experience:**, **Location:**, and **Specialization:**.

Formatting & Style:
- Use **bold** for section numbers (e.g., **Section 302**) and the lawyer headers listed above.
- Use normal text for descriptions.
- Keep the output clean, short, and professional with good typography.
- Communication style: Chatbot-style, helpful, and direct.
- Intended audience: People who want to know which section they broke in law.

Disclaimer: Always end with a short note that this is a college project and "For formal legal advice, please consult a qualified professional."`;

export async function sendToGemini(
  userMessage: string,
  conversationHistory: { type: 'user' | 'bot'; content: string }[]
): Promise<string> {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_api_key_here') {
    return '⚠️ **Groq API key not configured.**\n\nTo enable AI responses:\n1. Go to [console.groq.com](https://console.groq.com)\n2. Create a free account and generate an API key\n3. Open the `.env` file in your project root\n4. Replace `your_api_key_here` with your actual API key\n5. Restart the dev server (`npm run dev`)';
  }

  // Build messages array for OpenAI-compatible format
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  // Add conversation history (skip initial bot welcome for cleaner context)
  for (const msg of conversationHistory) {
    if (msg.content.trim()) {
      messages.push({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content,
      });
    }
  }

  // Add the new user message
  messages.push({ role: 'user', content: userMessage });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = (errorData as any)?.error?.message || `Status ${response.status}`;
      console.error('Groq API error:', response.status, errorData);
      if (response.status === 429) {
        return '⚠️ Rate limit reached. Please wait a moment and try again.';
      }
      if (response.status === 401) {
        return '⚠️ API key is invalid. Please check your `.env` file.';
      }
      return `⚠️ API error: ${errorMsg}`;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      console.error('Unexpected Groq response:', data);
      return 'I apologize, but I wasn\'t able to generate a response. Please try rephrasing your question.';
    }

    return text;
  } catch (error) {
    console.error('Groq API call failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return '⚠️ Network error. Please check your internet connection and try again.';
    }
    return '⚠️ Something went wrong. Please try again in a moment.';
  }
}
