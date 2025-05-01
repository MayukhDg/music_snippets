import React from 'react'
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { AudioWaveformIcon as Waveform, Search, Upload, User, Home } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "@/lib/actions/user.actions"


const Navbar = async() => {

    const user = await currentUser()
    const mongoUser = await getUserByClerkId(user?.id as string)

  return (
     <React.Fragment>
      
      <div className="flex">
        <aside className="hidden w-64 border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/upload"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Upload className="h-5 w-5" />
              Upload
            </Link>
            <Link
              href="/dashboard/search"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Search className="h-5 w-5" />
              Search
            </Link>
            <Link
              href={`/profile/${mongoUser?._id}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
          
          </div>
          
        </aside> 
      </div>
     </React.Fragment>
      
   
  )
}

export default Navbar