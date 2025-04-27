
import { Card } from "@/components/ui/card"
import UploadForm from "@/components/shared/UploadForm"
import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "@/lib/actions/user.actions";


export default async function UploadPage() {
   
  const user = await currentUser();
  const mongoUser = await getUserByClerkId(user?.id as string);
  
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Upload Music Snippet</h1>
<Card>
        <UploadForm mongoUser={mongoUser}/>
      </Card>
    </div>
  )
}
