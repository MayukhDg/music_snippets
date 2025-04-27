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
import { addSnippet } from "@/lib/actions/snippet.actions"


interface UploadFormProps {
  mongoUser: any; // Replace 'any' with the appropriate type if known
}

const UploadForm: React.FC<UploadFormProps> = ({ mongoUser }) => {
  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const [selectedFile, setSelectedFile] = useState<ClientUploadedFileData<{ uploadedBy: string }> | null>(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [price, setPrice] = useState("")
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
       setIsSubmitting(true)
        try {
          const snippetData = {
            title,
            content,
            author: mongoUser._id,
            price: parseFloat(price),
            file: selectedFile?.ufsUrl || "", // Provide a default value
          }

          const uploadedSnippet =  await addSnippet(snippetData)
          if(uploadedSnippet) {
            toast({
              title: "Snippet uploaded",
              description: "Your snippet has been successfully uploaded",
            })
            setIsSubmitting(false)
            router.push("/dashboard")
          }

       } catch (error) {
        console.error("Error uploading snippet:", error)
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
              <Input value={title} onChange={e=>setTitle(e.target.value)} id="title" placeholder="Enter a title for your snippet" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input value={price} onChange={e=>setPrice(e.target.value)} id="price"  placeholder="Enter a price for your snippet" required />
              </div>
            <div className="space-y-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                value={content} 
                onChange={e=>setContent(e.target.value)}
                id="content"
                placeholder="Describe your music snippet (genre, mood, instruments, etc.)"
                className="min-h-[100px]"
              />
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
