import { currentUser } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicSnippetCard } from "@/components/shared/music-snippet-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Upload } from "lucide-react"
import { getUserByClerkId } from "@/lib/actions/user.actions"
import { fetchUserSnippets } from "@/lib/actions/snippet.actions"
import Pagination from "@/components/shared/Pagination"
import { getUserDownloadCount } from "@/lib/actions/order.actions"

interface SearchParamProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({ searchParams }: SearchParamProps) {
  const user = await currentUser()
 const mongoUser = await getUserByClerkId(user?.id as string)
 const page = Number(searchParams?.page) || 1;
 const userSnippets = await fetchUserSnippets(         
  { userId: mongoUser?._id, page, limit: 3 })
  const userDownloadCount  = await getUserDownloadCount(mongoUser?._id)
  console.log("mongoUser", mongoUser  )

  function canBuySnippet(currentSnippet:any) {
    if(mongoUser?.downloadedSnippets?.some((snippet:any) => snippet._id === currentSnippet._id) || !mongoUser?._id || 
    mongoUser?._id === currentSnippet?.author) {
      return false
    } else {
      return true
    }
  }
  return (
    <div className="grid gap-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName || user?.username}</h1>
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
            <div className="text-3xl font-bold">{mongoUser?.uploadedSnippets?.length}</div>
            </CardContent> 
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Downloads</CardTitle>
            <CardDescription>Number of times your snippets were downloaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userDownloadCount}</div>
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
              {
              userSnippets?.data?.map((snippet:any) => {
                
                const userCanBuySnippet = canBuySnippet(snippet)

                return (
                  <MusicSnippetCard userCanBuySnippet={userCanBuySnippet} mongoUser={mongoUser?._id} key={snippet?._id} snippet={snippet} />
                )
              })
              }
        
            </div>
          </CardContent> 
        </Card>
        <Pagination page={page} totalPages={userSnippets?.totalPages || 0}  />
      </div>
    </div>
  )
}
