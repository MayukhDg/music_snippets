
import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Upload, LogInIcon } from "lucide-react"
import { getUserByClerkId } from "@/lib/actions/user.actions"
import { fetchAllSnippets } from "@/lib/actions/snippet.actions"

export default async function HomePage() {
  const user = await currentUser()
  const mongoUser = await getUserByClerkId(user?.id as string)
  const allSnippets = await fetchAllSnippets();
  console.log("All Snippets:", allSnippets)
  
  function canBuySnippet(currentSnippet:any) {
    if(mongoUser?.downloadedSnippets?.some((snippet:any) => snippet._id === currentSnippet._id) || !mongoUser?._id || !user?.id ||
    mongoUser?._id === currentSnippet?.author) {
      return false
    } else {
      return true
    }
  }  
  
  return (
    <div className="grid gap-6 p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{user? `Welcome back, ${mongoUser?.firstName || mongoUser?.username}`:"Welcome to SoundBite"}</h1>
        <p className="text-muted-foreground">Upload and share your music snippets with the world.</p>
        <p className="text-muted-foreground">Explore and download snippets from other artists.</p>
        </div>
        { mongoUser?._id ? <Link href="/dashboard/upload">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload New Snippet
          </Button>
        </Link>:
        <Link href="/sign-in">
        <Button className="gap-2 ml-3">
          <LogInIcon className="h-4 w-4" />
          Log In 
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
            {
              allSnippets?.map((snippet:any) => {
                
                const userCanBuySnippet = canBuySnippet(snippet)

                return (
                  <MusicSnippetCard userCanBuySnippet={userCanBuySnippet} mongoUser={mongoUser?._id} key={snippet?._id} snippet={snippet} />
                )
              })
              }
        

            </div>
          </CardContent> 
        </Card>
      </div>
    </div>
  )
}
