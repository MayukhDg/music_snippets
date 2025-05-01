import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center h-[100vh] py-12">
      <SignIn  />
    </main>
  )
}
