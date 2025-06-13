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
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
    {
      id: "video2",
      title: `${query} Explained for Beginners`,
      description: "A beginner-friendly introduction to the topic.",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Simple Learning",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
    {
      id: "video3",
      title: `Advanced ${query} - Deep Dive`,
      description: "An in-depth exploration of the advanced concepts.",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Expert Academy",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
    {
      id: "video4",
      title: `${query} in Real Life - Practical Applications`,
      description: "See how this concept is applied in real-world scenarios.",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Practical Learning",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
    {
      id: "video5",
      title: `${query} - Visual Explanation`,
      description: "Visual animations and graphics to help understand the concept.",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Visual Academy",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
    {
      id: "video6",
      title: `${query} - Quick Tutorial`,
      description: "A quick 5-minute tutorial on the essential concepts.",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      channel: "Quick Learning",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    },
  ]
}
