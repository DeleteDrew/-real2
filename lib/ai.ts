import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { searchWithGemini, searchWithHuggingFace } from "./ai-alternatives"

export async function generateAIResponse(query: string): Promise<string> {
  try {
    // Try Google Gemini first (FREE!)
    if (process.env.GEMINI_API_KEY) {
      console.log("Using Google Gemini (Free)")
      return await searchWithGemini(query)
    }

    // Try Hugging Face second (FREE!)
    if (process.env.HUGGINGFACE_API_KEY) {
      console.log("Using Hugging Face (Free)")
      return await searchWithHuggingFace(query)
    }

    // Try OpenAI if available (Paid)
    if (process.env.OPENAI_API_KEY) {
      console.log("Using OpenAI")
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: query,
        system:
          "You are a helpful educational assistant. Provide clear, concise, and accurate information about the topic. Format your response in a way that's easy to understand, using paragraphs, bullet points, and examples where appropriate.",
      })
      return text
    }

    // Fall back to mock if no API keys available
    console.log("No AI API keys found, using mock response")
    return generateMockResponse(query)
  } catch (error) {
    console.error("Error generating AI response:", error)
    return generateMockResponse(query)
  }
}

// Mock implementation that doesn't require an API key
function generateMockResponse(query: string): string {
  return `# ${query}

Thank you for your question about "${query}". 

## 🆓 Get FREE AI Responses!

To enable real AI responses, set up one of these **FREE** API keys:

### 1. Google Gemini (Recommended - Completely Free!)
- **15 requests/minute, 1,500/day** - Perfect for your needs!
- Get your free key: https://makersuite.google.com/app/apikey
- Add to .env.local: \`GEMINI_API_KEY=your_key_here\`

### 2. Hugging Face (Free Tier)
- Access to thousands of AI models
- Get your free key: https://huggingface.co/settings/tokens
- Add to .env.local: \`HUGGINGFACE_API_KEY=your_key_here\`

### 3. OpenAI ($5 free credits)
- Best quality but costs money after free credits
- Get key: https://platform.openai.com/api-keys
- Add to .env.local: \`OPENAI_API_KEY=your_key_here\`

**Just add any of these keys to your .env.local file and restart your server!**

For now, you can try the "Visual Learner" option to find relevant YouTube videos about this topic.`
}
