"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { UploadButton } from "@/lib/uploadthing/utils"
import { ClientUploadedFileData } from "uploadthing/types"


interface UploadFormProps {
  mongoUser: any; // Replace 'any' with the appropriate type if known
}

const UploadForm: React.FC<UploadFormProps> = ({ mongoUser }) => {
  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const [selectedFile, setSelectedFile] = useState<ClientUploadedFileData<{ uploadedBy: string }> | null>(null)
    console.log("Selected file:", selectedFile)
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
       setIsSubmitting(true)
        try {
        
       } catch (error) {
        
       }
    }
  
    return (
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

        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
         if(res){
          setSelectedFile(res[0])
          toast({
            title: "Upload successful",
            description: "Your music snippet has been uploaded",
          })
          setIsSubmitting(false)
         }      
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload Snippet"}
            </Button>
          </CardFooter>
        </form>
  )
}

export default UploadForm