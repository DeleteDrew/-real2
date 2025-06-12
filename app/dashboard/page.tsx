"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Search, LogOut, User, Settings } from "lucide-react"
import { searchYouTube } from "@/lib/youtube"
import { generateAIResponse } from "@/lib/ai"

// Add this function to convert markdown to HTML
function markdownToHtml(markdown: string) {
  // Very simple markdown parser for demonstration
  // Replace headers
  const html = markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>')
    // Replace lists
    .replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$1. $2</li>')
    // Replace paragraphs
    .replace(/^(?!<[hl]|<li|\s*$)(.*$)/gm, '<p class="my-2">$1</p>')
    // Replace bold and italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Replace code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>')
    // Replace inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')

  return html
}

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAIResponse] = useState("")
  const [videoResults, setVideoResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("teach")
  const { toast } = useToast()

  const handleSearch = async (type: "teach" | "visual") => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a search term",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setActiveTab(type)

    try {
      if (type === "teach") {
        const response = await generateAIResponse(query)
        setAIResponse(response)
        setVideoResults([])
      } else {
        const videos = await searchYouTube(query)
        setVideoResults(videos)
        setAIResponse("")
      }
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      })

      // Set a fallback response if the AI response fails
      if (type === "teach") {
        setAIResponse("Sorry, I couldn't generate a response at this time. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Learn</span>
            <span>AI</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/account" className="text-sm font-medium hover:underline flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:underline flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What would you like to learn today?
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Enter your question below and choose how you want to learn
              </p>
            </div>
            <div className="w-full max-w-2xl space-y-2">
              <div className="flex w-full items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="e.g., How does photosynthesis work?"
                    className="w-full pl-8"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch("teach")
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:w-1/2" onClick={() => handleSearch("teach")} disabled={isLoading}>
                  {isLoading && activeTab === "teach" ? "Loading..." : "Teach Me"}
                </Button>
                <Button
                  className="w-full sm:w-1/2"
                  variant="outline"
                  onClick={() => handleSearch("visual")}
                  disabled={isLoading}
                >
                  {isLoading && activeTab === "visual" ? "Loading..." : "Visual Learner"}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="teach">AI Explanation</TabsTrigger>
                <TabsTrigger value="visual">Video Tutorials</TabsTrigger>
              </TabsList>
              <TabsContent value="teach" className="mt-6">
                {aiResponse ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="prose max-w-none">
                        <div
                          dangerouslySetInnerHTML={{ __html: markdownToHtml(aiResponse) }}
                          className="markdown-content"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {isLoading
                      ? "Generating response..."
                      : 'Enter a question and click "Teach Me" to get an AI explanation'}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="visual" className="mt-6">
                {videoResults.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {videoResults.map((video, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video w-full">
                          <img
                            src={`/placeholder.svg?height=180&width=320&text=Video+${index + 1}`}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{video.channel}</p>
                          <Button className="w-full mt-4" variant="outline" asChild>
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              Watch Video
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {isLoading
                      ? "Searching for videos..."
                      : 'Enter a question and click "Visual Learner" to find video tutorials'}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} LearnAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
