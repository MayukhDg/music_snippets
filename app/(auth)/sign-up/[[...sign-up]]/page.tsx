import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen py-12">
      <SignUp />
    </main>
  )
}
