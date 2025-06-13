import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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

// Google Gemini (FREE - 1,500 requests per day!) - FIXED VERSION
async function searchWithGemini(query: string): Promise<string> {
  try {
    const API_KEY = process.env.GEMINI_API_KEY

    if (!API_KEY) {
      throw new Error("No Gemini API key found")
    }

    // Updated to use the correct model name and API version
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful educational assistant. Provide clear, concise, and accurate information about: ${query}. Format your response using markdown with headers, bullet points, and examples where appropriate. Make it educational and easy to understand.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API Error Response:", errorText)
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Gemini API Response:", JSON.stringify(data, null, 2))

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Invalid Gemini response structure:", data)
      throw new Error("Invalid response from Gemini API")
    }

    const content = data.candidates[0].content.parts[0].text
    console.log("Gemini response content:", content)
    return content
  } catch (error) {
    console.error("Gemini search error:", error)
    throw error
  }
}

// Hugging Face (FREE with rate limits)
async function searchWithHuggingFace(query: string): Promise<string> {
  try {
    const API_KEY = process.env.HUGGINGFACE_API_KEY

    if (!API_KEY) {
      throw new Error("No Hugging Face API key found")
    }

    // Using a better model for text generation
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Educational question: ${query}\n\nProvide a clear, educational explanation with examples:`,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          do_sample: true,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Hugging Face API Error:", errorText)
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Hugging Face response:", data)

    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return data[0].generated_text
    }

    throw new Error("Invalid response from Hugging Face API")
  } catch (error) {
    console.error("Hugging Face search error:", error)
    throw error
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
- Get your free key: https://aistudio.google.com/app/apikey
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
