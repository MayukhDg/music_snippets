import { getUserOrdersWithUniqueSnippets } from '@/lib/actions/order.actions'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { MusicSnippetCard } from '@/components/shared/music-snippet-card'

const Orders = async () => {
 
  const user = await currentUser()
    const mongoUser = await getUserByClerkId(user?.id as string)
    
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
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Purchased Snippets</CardTitle>
            <CardDescription>Recently purchased music snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mongoUser?.downloadedSnippets?.map((snippet:any) => {
                
                const userCanBuySnippet = canBuySnippet(snippet)

                return (
                  (
                    <MusicSnippetCard userCanBuySnippet={userCanBuySnippet} mongoUser={mongoUser?._id} key={snippet?._id.toString()} snippet={snippet} />
                  )
                )
              })}
            </div>
          </CardContent> 
        </Card>
      </div>
      </div>
  )
}

export default Orders