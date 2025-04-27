"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Download, Share2 } from "lucide-react"
import Checkout from "./Checkout"

interface MusicSnippetProps {
  snippet: {
    _id: string
    title: string
    content: string
    duration: string
    createdAt: string
    updatedAt: string
    file: string
    userId: string
  }
}

export function MusicSnippetCard({ snippet, mongoUser }: any) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  // Update currentTime while playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
    }

    const setMetadata = () => {
      setAudioDuration(audio.duration)
    }

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
        <CardTitle className="text-base">{snippet.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
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
        {/* Hidden audio element */}
        <audio 
          ref={audioRef} 
          src={snippet.file} 
          onEnded={handleEnded}
        />
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <span>{formatTime(currentTime)} / {formatTime(audioDuration)}</span>
        </div>
        <div className="flex items-center gap-1">
          <a  href={snippet.file} download target="_blank" rel="noopener noreferrer">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          </a>
          <Checkout snippet={snippet} userId={mongoUser}/>
        </div>
      </CardFooter>
    </Card>
  )
}