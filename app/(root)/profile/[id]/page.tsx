import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Settings } from "lucide-react"
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions"
import { fetchUserSnippets } from "@/lib/actions/snippet.actions"
import { getUserDownloadCount } from "@/lib/actions/order.actions"
import Pagination from "@/components/shared/Pagination"


interface SearchParamProps {
  searchParams?: { [key: string]: string | string[] | undefined };
  params?: { [key: string]: string | undefined };
}

export default async function ProfilePage({ searchParams, params }: SearchParamProps) {
  const user = await currentUser() 

  const mongoUser = await getUserById(params?.id as string)
   const page = Number(searchParams?.page) || 1;
   const userSnippets = await fetchUserSnippets(         
    { userId: mongoUser?._id, page, limit: 3 })
    const userDownloadCount  = await getUserDownloadCount(mongoUser?._id)
    console.log(user)
  
    function canBuySnippet(currentSnippet:any) {
      if(mongoUser?.downloadedSnippets?.some((snippet:any) => snippet._id === currentSnippet._id) || !mongoUser?._id || 
      mongoUser?._id === currentSnippet?.author) {
        return false
      } else {
        return true
      }
    }  
  

  return (
    <div className="grid gap-2 p-5">
      <h1 className="text-3xl font-bold tracking-tight">{user?.id === mongoUser?.clerkId?.toString() ? `Your Profile` : `${mongoUser?.username}'s Profile`}</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={mongoUser?.photo || "/placeholder.svg"} alt={mongoUser?.firstName || "User"} />
              <AvatarFallback>{mongoUser?.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-bold">
                {mongoUser?.firstName} {mongoUser?.lastName}
              </h2>
              <p className="text-gray-500">@{mongoUser?.username || mongoUser?.firstName?.toLowerCase()}</p>
              <p className="text-sm">Member since {new Date().toLocaleDateString()}</p>
            </div>
            { /*
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
            */}      
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profile Stats</CardTitle>
          <CardDescription>{user?.id === mongoUser?.clerkId?.toString() ? `Your` : `${mongoUser?.username}'s Profile`} activity on SoundBite</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{userSnippets?.data?.length}</div>
              <div className="text-sm text-gray-500">Total Snippets</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{userDownloadCount}</div>
              <div className="text-sm text-gray-500">Downloads</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{user?.id === mongoUser?.clerkId?.toString() ? `Your` : `${mongoUser?.username}'s`} Music Snippets</CardTitle>
       </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userSnippets?.data?.map((snippet:any) => {
              
              const userCanBuySnippet = canBuySnippet(snippet)
              return (
                (
                  <MusicSnippetCard userCanBuySnippet={userCanBuySnippet} mongoUser={mongoUser?._id} key={snippet._id} snippet={snippet} />
                )
              )
            })}
          </div>
        </CardContent>
      </Card>

      
       <Pagination page={page} totalPages={userSnippets?.totalPages || 0}  />
    </div>
  )
}
