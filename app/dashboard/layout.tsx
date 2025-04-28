import type React from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { AudioWaveformIcon as Waveform, Search, Upload, User, Home } from "lucide-react"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Waveform className="h-6 w-6" />
            <span>SoundBite</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
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
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
