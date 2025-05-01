import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "../app/globals.css"
import Navbar from "@/components/shared/Navbar"
import { AudioWaveformIcon as Waveform } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SoundBite - Share Music Snippets",
  description: "Upload and share music snippets for podcast integration",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            
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
              <div className="flex">
              <Navbar/>
            <main>
             {children}  
            </main>
              </div>
            
                 </body>
      </html>
    </ClerkProvider>
  )
}
