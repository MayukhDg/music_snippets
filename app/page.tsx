
import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Upload, LogIn } from "lucide-react"
import { getUserByClerkId } from "@/lib/actions/user.actions"
import { fetchAllSnippets } from "@/lib/actions/snippet.actions"

export default async function HomePage() {
  const user = await currentUser()
  const mongoUser = await getUserByClerkId(user?.id as string)
  const allSnippets = await fetchAllSnippets();
  
  
  
  return (
    <div className="grid gap-6 px-4 py-6">
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
          <LogIn className="h-4 w-4" />
          Sign In 
        </Button>
      </Link>
        }
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Snippets</CardTitle>
            <CardDescription>Your uploaded music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
          </CardContent>
        </Card>
        <div className="grid gap-6">

        
        <Card>
          <CardHeader>
            <CardTitle>Popular Snippets</CardTitle>
            <CardDescription>Most played music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mongoUser?._id ? (
                mongoUser.uploadedSnippets?.length > 0 ? (
                  mongoUser.uploadedSnippets.map((snippet: any) => (
                    <MusicSnippetCard key={snippet._id} snippet={snippet} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">You haven't uploaded any snippets yet.</p>
                )
              ) : allSnippets?.length > 0 ? (
                allSnippets.map((snippet: any) => (
                  <MusicSnippetCard key={snippet._id} snippet={snippet} />
                ))
              ) : (
                <p className="text-center text-muted-foreground">No snippets available.</p>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
