// This is a mock implementation for demonstration purposes
// In a real application, you would use the YouTube API

export async function searchYouTube(query: string): Promise<any[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response data
  return [
    {
      id: "video1",
      title: `Learn about: ${query} - Comprehensive Guide`,
      description: "This video explains the topic in detail with clear examples.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+1",
      channel: "Educational Channel",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    },
    {
      id: "video2",
      title: `${query} Explained for Beginners`,
      description: "A beginner-friendly introduction to the topic.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+2",
      channel: "Simple Learning",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+for+beginners`,
    },
    {
      id: "video3",
      title: `Advanced ${query} - Deep Dive`,
      description: "An in-depth exploration of the advanced concepts.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+3",
      channel: "Expert Academy",
      url: `https://www.youtube.com/results?search_query=advanced+${encodeURIComponent(query)}`,
    },
    {
      id: "video4",
      title: `${query} in Real Life - Practical Applications`,
      description: "See how this concept is applied in real-world scenarios.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+4",
      channel: "Practical Learning",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+practical+applications`,
    },
    {
      id: "video5",
      title: `${query} - Visual Explanation`,
      description: "Visual animations and graphics to help understand the concept.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+5",
      channel: "Visual Academy",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+visual+explanation`,
    },
    {
      id: "video6",
      title: `${query} - Quick Tutorial`,
      description: "A quick 5-minute tutorial on the essential concepts.",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Video+6",
      channel: "Quick Learning",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+quick+tutorial`,
    },
  ]
}
