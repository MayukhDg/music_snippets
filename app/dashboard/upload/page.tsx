"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Music } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // In a real app, this would upload to Vercel Blob or another storage service
    // and save the metadata to your database

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload successful",
        description: "Your music snippet has been uploaded",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Upload Music Snippet</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Snippet</CardTitle>
            <CardDescription>Upload a new music snippet to share with others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a title for your snippet" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your music snippet (genre, mood, instruments, etc.)"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" placeholder="jazz, intro, upbeat" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Audio File</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                {selectedFile ? (
                  <div className="flex items-center gap-2">
                    <Music className="h-6 w-6 text-purple-500" />
                    <span>{selectedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">Drag and drop your audio file here or click to browse</p>
                  </>
                )}
                <Input id="file" type="file" accept="audio/*" className="hidden" onChange={handleFileChange} required />
                <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
                  Select File
                </Button>
                <p className="text-xs text-gray-500 mt-2">Supported formats: MP3, WAV, OGG, M4A (Max 10MB)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Snippet"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
