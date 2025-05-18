"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Download, Trash } from "lucide-react"
import Checkout from "./Checkout"
import { deleteSnippet } from "@/lib/actions/snippet.actions"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface MusicSnippetProps {
  snippet: {
    _id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    file: string
    author: string
    downloadCount: number
    price: number
    description?: string
  }
  mongoUser?: string
  userCanBuySnippet?: boolean
  currUser?:any
}

export function MusicSnippetCard({ snippet, mongoUser, userCanBuySnippet, currUser }: MusicSnippetProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleDeleteSnippet = async (id: string) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this snippet?")
      if (confirmed) {
        await deleteSnippet(id)
        alert("Snippet deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting snippet:", error)
      alert("Failed to delete snippet")
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setCurrentTime(audio.currentTime)
    const setMetadata = () => setAudioDuration(audio.duration)

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", setMetadata)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", setMetadata)
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercent = audioDuration ? (currentTime / audioDuration) * 100 : 0

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{snippet.title}</CardTitle>
            <p className="text-sm text-gray-500">₹{snippet.price.toFixed(2)}</p>
          </div>
          <Link href={`/profile/${snippet?.author}`}>
            <Avatar className="w-10 h-10 border-4 border-background bg-slate-700 ml-3">
              <AvatarImage src={"/placeholder.svg"} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        {snippet.content && (
          <p className="text-sm text-gray-700 dark:text-gray-300">{snippet.content}</p>
        )}

        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center relative">
          <div className="w-full px-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={snippet.file} onEnded={handleEnded} />
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <span>{formatTime(currentTime)} / {formatTime(audioDuration)}</span>
        </div>
        <div className="flex items-center gap-1">
          {!userCanBuySnippet && mongoUser &&( 
            <a href={snippet.file} download target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </a>
          )}
          {mongoUser === snippet?.author &&
            <Button onClick={() => handleDeleteSnippet(snippet._id)} size="icon" variant="ghost" className="h-8 w-8">
              <Trash className="h-4 w-4" />
            </Button>
          }
          {userCanBuySnippet && <Checkout snippet={snippet} userId={mongoUser} />}
        </div>
      </CardFooter>
    </Card>
  )
}
