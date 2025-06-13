"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showDestruction, setShowDestruction] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowDestruction(true)

    // After animation completes, redirect to signup
    setTimeout(() => {
      window.location.href = "/signup"
    }, 4500) // Reduced from 5500ms to 4500ms
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">DeleteDrew.Net</span>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  DeleteDrew.Net
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  There is a world of information at your finger tips. Just $0.99/month for unlimited access.
                </p>
              </div>

              {/* Search Demo Section */}
              <div className="w-full max-w-2xl space-y-4 mt-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Try a sample search</h3>
                  <p className="text-sm text-gray-500">Enter a topic to see how our platform works</p>
                </div>

                <div className="relative">
                  {/* Main search container */}
                  <div className={`search-container ${showDestruction ? "animate-epic-destruction" : ""}`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        className="search-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="e.g., How does photosynthesis work?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSearching}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="search-button w-full sm:w-1/2"
                        variant="outline"
                        onClick={handleSearch}
                        disabled={isSearching || !searchQuery.trim()}
                      >
                        {isSearching ? "Searching..." : "Teach Me"}
                      </Button>
                      <Button
                        className="search-button w-full sm:w-1/2"
                        variant="outline"
                        onClick={handleSearch}
                        disabled={isSearching || !searchQuery.trim()}
                      >
                        {isSearching ? "Searching..." : "Visual Learner"}
                      </Button>
                    </div>
                  </div>

                  {/* Particle effects overlay */}
                  {showDestruction && (
                    <div className="particle-container">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`particle particle-${i}`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Explosion effect */}
                  {showDestruction && (
                    <div className="explosion-container">
                      <div className="explosion-ring ring-1" />
                      <div className="explosion-ring ring-2" />
                      <div className="explosion-ring ring-3" />
                    </div>
                  )}
                </div>

                {!showDestruction && (
                  <p className="text-xs text-center text-gray-500">Sign up for full access to our learning tools</p>
                )}
              </div>

              <div className="space-x-4 mt-8">
                <Link href="/signup">
                  <Button className="px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Simple, affordable pricing for unlimited learning
                </p>
              </div>
              <div className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col items-center space-y-2">
                  <h3 className="text-2xl font-bold">Monthly Subscription</h3>
                  <div className="text-4xl font-bold">$0.99</div>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
                <ul className="my-6 space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Unlimited AI explanations</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Unlimited video recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Access on all devices</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full">
                  <Button className="w-full">Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} DeleteDrew.Net. All rights reserved.</p>
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
