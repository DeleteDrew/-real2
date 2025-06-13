// YouTube API implementation - Server-side only
export async function searchYouTube(query: string): Promise<any[]> {
  try {
    // This function should only be called from server-side code
    const API_KEY = process.env.YOUTUBE_API_KEY

    if (!API_KEY) {
      console.log("No YouTube API key found, using mock data")
      return getMockYouTubeResults(query)
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
    }))
  } catch (error) {
    console.error("YouTube search error:", error)
    return getMockYouTubeResults(query)
  }
}

// Improved mock implementation with more realistic results
function getMockYouTubeResults(query: string): any[] {
  const mockVideos = [
    {
      id: "mock1",
      title: `${query} - Complete Tutorial`,
      description: `Learn everything about ${query} in this comprehensive tutorial.`,
      thumbnail: `https://picsum.photos/320/180?random=1&text=${encodeURIComponent(query)}`,
      channel: "EduTech Academy",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+tutorial`,
      publishedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "mock2",
      title: `Understanding ${query} for Beginners`,
      description: `A beginner-friendly guide to ${query} with step-by-step explanations.`,
      thumbnail: `https://picsum.photos/320/180?random=2&text=${encodeURIComponent(query)}`,
      channel: "Learning Made Simple",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+beginners`,
      publishedAt: "2024-01-10T14:30:00Z",
    },
    {
      id: "mock3",
      title: `${query} Explained in 10 Minutes`,
      description: `Quick and easy explanation of ${query} concepts.`,
      thumbnail: `https://picsum.photos/320/180?random=3&text=${encodeURIComponent(query)}`,
      channel: "Quick Learn",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+explained`,
      publishedAt: "2024-01-08T09:15:00Z",
    },
    {
      id: "mock4",
      title: `Advanced ${query} Techniques`,
      description: `Deep dive into advanced ${query} concepts and applications.`,
      thumbnail: `https://picsum.photos/320/180?random=4&text=${encodeURIComponent(query)}`,
      channel: "Pro Academy",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+advanced`,
      publishedAt: "2024-01-05T16:45:00Z",
    },
    {
      id: "mock5",
      title: `${query} - Real World Examples`,
      description: `See how ${query} is applied in real-world scenarios.`,
      thumbnail: `https://picsum.photos/320/180?random=5&text=${encodeURIComponent(query)}`,
      channel: "Practical Learning",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+examples`,
      publishedAt: "2024-01-03T11:20:00Z",
    },
    {
      id: "mock6",
      title: `${query} Tips and Tricks`,
      description: `Essential tips and tricks for mastering ${query}.`,
      thumbnail: `https://picsum.photos/320/180?random=6&text=${encodeURIComponent(query)}`,
      channel: "Tips & Tricks Hub",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+tips`,
      publishedAt: "2024-01-01T13:10:00Z",
    },
  ]

  return mockVideos
}
