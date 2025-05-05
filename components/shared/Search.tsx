"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import Pagination from "./Pagination"


export default function SearchComponent({ allSnippets, page, totalPages, mongoUser }: { allSnippets: any[], 
  page: number, 
  totalPages: number,
  mongoUser:any 
}){
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  function canBuySnippet(currentSnippet:any) {
    if(mongoUser?.downloadedSnippets?.some((snippet:any) => snippet._id === currentSnippet._id) || !mongoUser?._id || 
    mongoUser?._id === currentSnippet?.author) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])  
    
    return (
        <div>
            <Card>
        <CardHeader>
          <CardTitle>Find the perfect sound</CardTitle>
          <CardDescription>Search for music snippets by title, genre, or mood</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2">
            <Input
              placeholder="Search music snippets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
          </form>
        </CardContent>
      </Card>
         {allSnippets.length > 0 ? (
            <div className="grid gap-4 mt-4">
              {allSnippets.map((snippet) => {
                
                const userCanBuySnippet = canBuySnippet(snippet)
                return (
                  (
                    <MusicSnippetCard userCanBuySnippet={userCanBuySnippet} mongoUser={mongoUser?._id.toString()} key={snippet._id} snippet={snippet} />
                  )
                )
              })}
            </div>
          ):
          <p className="mt-3">No Results Yet</p>
          }

          <Pagination totalPages={totalPages} page={page}/>
          
        </div>

        
)   
 }

