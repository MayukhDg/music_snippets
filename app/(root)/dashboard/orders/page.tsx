import { getUserOrdersWithUniqueSnippets } from '@/lib/actions/order.actions'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { MusicSnippetCard } from '@/components/shared/music-snippet-card'

const Orders = async () => {
 
  const user = await currentUser()
    const mongoUser = await getUserByClerkId(user?.id as string)
   const uniqueOrders = (await getUserOrdersWithUniqueSnippets(mongoUser._id.toString())) ?? []

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
              {uniqueOrders.map((order:any) => (
                <MusicSnippetCard mongoUser={mongoUser?._id} key={order?._id.toString()} snippet={order.snippetId} />
              ))}
            </div>
          </CardContent> 
        </Card>
      </div>
      </div>
  )
}

export default Orders