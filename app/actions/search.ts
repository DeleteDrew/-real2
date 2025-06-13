"use server"

import { searchYouTube } from "@/lib/youtube"
import { generateAIResponse } from "@/lib/ai"

export async function searchVideos(query: string) {
  try {
    console.log("Searching videos for:", query)
    const videos = await searchYouTube(query)
    console.log("Found videos:", videos.length)
    return { success: true, data: videos }
  } catch (error) {
    console.error("Video search error:", error)
    return { success: false, error: "Failed to search videos" }
  }
}

export async function searchAI(query: string) {
  try {
    console.log("Searching AI for:", query)
    console.log("Available environment variables:", {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasGemini: !!process.env.GEMINI_API_KEY,
      hasHuggingFace: !!process.env.HUGGINGFACE_API_KEY,
    })

    const response = await generateAIResponse(query)
    console.log("AI response generated successfully")
    return { success: true, data: response }
  } catch (error) {
    console.error("AI search error:", error)
    return {
      success: false,
      error: "Failed to generate AI response",
      details: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
