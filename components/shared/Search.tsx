"use client"
import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Search } from "lucide-react"


export default function SearchComponent({allSnippets}: { allSnippets: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  
const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    
      if (searchQuery.trim() === "") {
        setSearchResults([])
      } else {
        const results = allSnippets.filter((snippet) => snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
        || snippet.content.toLowerCase().includes(searchQuery.toLowerCase())
     )
        setSearchResults(results)
      }
      setIsSearching(false)
    }
    
    return (
        <div>
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
         {searchResults.length > 0 ? (
            <div className="grid gap-4 mt-4">
              {searchResults.map((snippet) => (
                <MusicSnippetCard key={snippet._id} snippet={snippet} />
              ))}
            </div>
          ):
          <p>No Results Yet</p>
          }
          
        </div>

        
)   
 }

