"use server"

import { searchYouTube } from "@/lib/youtube"
import { generateAIResponse } from "@/lib/ai"

export async function searchVideos(query: string) {
  try {
    const videos = await searchYouTube(query)
    return { success: true, data: videos }
  } catch (error) {
    console.error("Video search error:", error)
    return { success: false, error: "Failed to search videos" }
  }
}

export async function searchAI(query: string) {
  try {
    const response = await generateAIResponse(query)
    return { success: true, data: response }
  } catch (error) {
    console.error("AI search error:", error)
    return { success: false, error: "Failed to generate AI response" }
  }
}
