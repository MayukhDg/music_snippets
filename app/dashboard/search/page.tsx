"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MusicSnippetCard } from "@/components/music-snippet-card"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock data for demonstration
  const allSnippets = [
    { id: "1", title: "Jazz Intro", duration: "0:15", createdAt: "2 days ago" },
    { id: "2", title: "Rock Outro", duration: "0:20", createdAt: "1 week ago" },
    { id: "3", title: "Ambient Background", duration: "0:30", createdAt: "2 weeks ago" },
    { id: "4", title: "Electronic Beat", duration: "0:25", createdAt: "3 days ago" },
    { id: "5", title: "Classical Piano", duration: "0:40", createdAt: "5 days ago" },
    { id: "6", title: "Hip Hop Loop", duration: "0:18", createdAt: "1 day ago" },
    { id: "7", title: "Acoustic Guitar", duration: "0:22", createdAt: "4 days ago" },
    { id: "8", title: "Drum Solo", duration: "0:12", createdAt: "3 weeks ago" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([])
      } else {
        const results = allSnippets.filter((snippet) => snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
        setSearchResults(results)
      }
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Search Music Snippets</h1>

      <Card>
        <CardHeader>
          <CardTitle>Find the perfect sound</CardTitle>
          <CardDescription>Search for music snippets by title, genre, or mood</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search music snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.length} snippet{searchResults.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((snippet) => (
                <MusicSnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Popular Searches</CardTitle>
          <CardDescription>Trending music snippets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allSnippets.slice(0, 6).map((snippet) => (
              <MusicSnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
