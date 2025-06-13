// Free AI service implementations

// 1. Google Gemini (FREE - 1,500 requests per day!)
export async function searchWithGemini(query: string): Promise<string> {
  try {
    const API_KEY = process.env.GEMINI_API_KEY

    if (!API_KEY) {
      throw new Error("No Gemini API key found")
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
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
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 1000,
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
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API")
    }

    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Gemini search error:", error)
    throw error
  }
}

// 2. Hugging Face (FREE with rate limits)
export async function searchWithHuggingFace(query: string): Promise<string> {
  try {
    const API_KEY = process.env.HUGGINGFACE_API_KEY

    if (!API_KEY) {
      throw new Error("No Hugging Face API key found")
    }

    // Using Microsoft's DialoGPT model (free)
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
      throw new Error(`Hugging Face API error: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return data[0].generated_text
    }

    throw new Error("Invalid response from Hugging Face API")
  } catch (error) {
    console.error("Hugging Face search error:", error)
    throw error
  }
}

// 3. Cohere (100 free requests per month)
export async function searchWithCohere(query: string): Promise<string> {
  try {
    const API_KEY = process.env.COHERE_API_KEY

    if (!API_KEY) {
      throw new Error("No Cohere API key found")
    }

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `You are a helpful educational assistant. Provide a clear, educational explanation about: ${query}\n\nExplanation:`,
        max_tokens: 500,
        temperature: 0.5,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      }),
    })

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`)
    }

    const data = await response.json()
    return data.generations[0].text.trim()
  } catch (error) {
    console.error("Cohere search error:", error)
    throw error
  }
}
