import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Currency, Upload } from "lucide-react"

export default async function HomePage() {
  const user = await currentUser()
  

  // This would be replaced with actual data from your database
  const recentSnippets = [
    { id: "1", title: "Jazz Intro", duration: "0:15", createdAt: "2 days ago" },
    { id: "2", title: "Rock Outro", duration: "0:20", createdAt: "1 week ago" },
    { id: "3", title: "Ambient Background", duration: "0:30", createdAt: "2 weeks ago" },
  ]

  const popularSnippets = [
    { id: "4", title: "Electronic Beat", duration: "0:25", createdAt: "3 days ago" },
    { id: "5", title: "Classical Piano", duration: "0:40", createdAt: "5 days ago" },
    { id: "6", title: "Hip Hop Loop", duration: "0:18", createdAt: "1 day ago" },
  ]

  return (
    <div className="grid gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{user? `Welcome back, ${user?.firstName}`:"Welcome to SoundBite"}</h1>
        <Link href="/dashboard/upload">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload New Snippet
          </Button>
        </Link>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Plays</CardTitle>
            <CardDescription>Number of times your snippets were played</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Downloads</CardTitle>
            <CardDescription>Number of times your snippets were downloaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Snippets</CardTitle>
            <CardDescription>Recently uploaded music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentSnippets.map((snippet) => (
                <MusicSnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Snippets</CardTitle>
            <CardDescription>Most played music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popularSnippets.map((snippet) => (
                <MusicSnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
