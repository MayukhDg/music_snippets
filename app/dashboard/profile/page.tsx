import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Settings } from "lucide-react"

export default async function ProfilePage() {
  const user = await currentUser()

  // This would be replaced with actual data from your database
  const userSnippets = [
    { id: "1", title: "Jazz Intro", duration: "0:15", createdAt: "2 days ago" },
    { id: "2", title: "Rock Outro", duration: "0:20", createdAt: "1 week ago" },
    { id: "3", title: "Ambient Background", duration: "0:30", createdAt: "2 weeks ago" },
    { id: "4", title: "Electronic Beat", duration: "0:25", createdAt: "3 days ago" },
    { id: "5", title: "Classical Piano", duration: "0:40", createdAt: "5 days ago" },
    { id: "6", title: "Hip Hop Loop", duration: "0:18", createdAt: "1 day ago" },
  ]

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt={user?.firstName || "User"} />
              <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">@{user?.username || user?.firstName?.toLowerCase()}</p>
              <p className="text-sm">Member since {new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Music Snippets</CardTitle>
          <CardDescription>All the music snippets you've uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userSnippets.map((snippet) => (
              <MusicSnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Stats</CardTitle>
          <CardDescription>Your activity on SoundBite</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{userSnippets.length}</div>
              <div className="text-sm text-gray-500">Total Snippets</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">128</div>
              <div className="text-sm text-gray-500">Total Plays</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-gray-500">Downloads</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
