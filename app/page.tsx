
import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Upload, LogIn, LogInIcon } from "lucide-react"
import { getUserByClerkId } from "@/lib/actions/user.actions"
import { fetchAllSnippets } from "@/lib/actions/snippet.actions"

export default async function HomePage() {
  const user = await currentUser()
  const mongoUser = await getUserByClerkId(user?.id as string)
  const allSnippets = await fetchAllSnippets();
  
  
  
  return (
    <div className="grid gap-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{user? `Welcome back, ${user?.firstName}`:"Welcome to SoundBite"}</h1>
        { mongoUser?._id ? <Link href="/dashboard/upload">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload New Snippet
          </Button>
        </Link>:
        <Link href="/sign-in">
        <Button className="gap-2">
          <LogInIcon className="h-4 w-4" />
          Upload New Snippet
        </Button>
      </Link>
        }
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Snippets</CardTitle>
            <CardDescription>Recently uploaded music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allSnippets.length > 0 ? allSnippets.map((snippet:any) => (
                <MusicSnippetCard mongoUser={mongoUser?._id} key={snippet?._id} snippet={snippet} />
              )): (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-gray-500">No snippets available</p>
                </div>
              )}
            </div>
          </CardContent> 
        </Card>
      </div>
    </div>
  )
}
